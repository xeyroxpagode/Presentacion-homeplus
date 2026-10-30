import { useCallback, useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import HomePlusLogo from '../presentation/components/HomePlusLogo'
import HomeIcon from '../presentation/app-screens/HomeDemoScreen/HomeIcon'
import HomeHeader from '../presentation/app-screens/HomeDemoScreen/HomeHeader'
import { homeVariables } from '../presentation/app-screens/HomeDemoScreen/homeTokens'
import PlannerNavigation from '../presentation/app-screens/PlannerDemoScreen/PlannerNavigation'
import PlannerCalendar from '../presentation/app-screens/PlannerDemoScreen/PlannerCalendar'
import PlannerPlans from '../presentation/app-screens/PlannerDemoScreen/PlannerPlans'
import PlannerTabs from '../presentation/app-screens/PlannerDemoScreen/PlannerTabs'
import { birthdayPlan, juliTasks, schoolEvent, type PlannerTab } from '../presentation/app-screens/PlannerDemoScreen/plannerData'
import FamilyNavigation from '../presentation/app-screens/FamilyDemoScreen/FamilyNavigation'
import HomeNavigation from '../presentation/app-screens/HomeDemoScreen/HomeNavigation'
import MapDemoScreen from '../presentation/app-screens/MapDemoScreen'
import InventoryDemoScreen from '../presentation/app-screens/InventoryDemoScreen'
import InventoryNavigation from '../presentation/app-screens/InventoryDemoScreen/InventoryNavigation'
import { shoppingSummary } from '../presentation/app-screens/InventoryDemoScreen/inventoryData'
import ps5Console from '../../assets/ps5-transparent.png'
import birthdayMemoryPhoto from '../presentation/assets/illustrations/homecloud-birthday-memory-family.jpg'
import vacationMemoryPhoto from '../presentation/assets/illustrations/homecloud-vacation-memory.jpg'
import FinanceNavigation from '../presentation/app-screens/FinanceDemoScreen/FinanceNavigation'
import AssetsNavigation from '../presentation/app-screens/AssetsDemoScreen/AssetsNavigation'
import HomeCloudNavigation from '../presentation/app-screens/HomeCloudDemoScreen/HomeCloudNavigation'
import { financeCategories, financeHero, financePayments, financeTabs } from '../presentation/app-screens/FinanceDemoScreen/financeData'
import { financeStory } from '../presentation/app-screens/FinanceDemoScreen/financeStoryData'
import { homeAssets, ps5Documents } from '../presentation/app-screens/AssetsDemoScreen/assetsData'
import { cloudAlbumsRow, cloudDocuments, cloudMemories, cloudVoiceNote } from '../presentation/app-screens/HomeCloudDemoScreen/homecloudData'
import birthdayCakeArtwork from '../presentation/assets/illustrations/homeplus-birthday-cake-2d.svg'
import giftBoxArtwork from '../presentation/assets/illustrations/homeplus-gift-box-2d.svg'
import giftBowArtwork from '../presentation/assets/illustrations/homeplus-gift-bow-2d.svg'
import candlesArtwork from '../presentation/assets/illustrations/homeplus-candles-2d.svg'
import drinksArtwork from '../presentation/assets/illustrations/homeplus-drinks-2d.svg'
import napkinsArtwork from '../presentation/assets/illustrations/homeplus-napkins-2d.svg'
import { D0_LABEL } from '../presentation/slides/homi-cinema-v8/homiV8Data'
import type { CineHandoff, FamilyHandoff } from '../presentation/presentationTypes'
import '../presentation/app-screens/HomeDemoScreen/home-screen.css'
import '../presentation/app-screens/PlannerDemoScreen/planner-screen.css'
import '../presentation/app-screens/FamilyDemoScreen/family-screen.css'

/* Analytic placement: every step is a fixed {x, y, scale} per node, so the
   journey is pure compositor transform — no measuring, no teleports. */
type Place = { x: number; y: number; s: number; o: 0 | 1 }
type TravelerDef = {
  id: string
  w: number
  h: number
  homeW?: number
  homeH?: number
  spotlightW?: number
  spotlightH?: number
  plannerW?: number
  plannerH?: number
  p03W?: number
  p03H?: number
  p04W?: number
  p04H?: number
  p05W?: number
  p05H?: number
  p06W?: number
  p06H?: number
  delay: number
  at: Place[]
  body: ReactNode
  /** `beat` is the S04 local beat index (null outside the Home block). */
  renderBody?: (step: number, beat: number | null, handoff: CineHandoff) => ReactNode
}

const C = (x: number, y: number, s: number, o: 0 | 1): Place => ({ x, y, s, o })

function JuliBody() {
  return (
    <div className="cine-juli">
      <div className="cine-juli-tile">J</div>
      <p className="cine-juli-name">Juli</p>
      <p className="cine-juli-age">10 años</p>
    </div>
  )
}

// ---------------------------------------------------------------------------
// S04 HOME — local beat axis (7 beats).
// Errata: audit/11_S04_SURFACE_ERRATA.md §2-§3.
//
//  0 blanco   the surface holds the white the S03 zoom ended on
//  1 Juli     Juli enters centred, on the white, carrying her age
//  2 Home     the app shell, navigation and sections arrive; Juli takes the
//             account slot. Juli's three needs are NOT on screen yet
//  3/4/5     Educación Física, autorización and Matemática each arrive in
//             their own beat, as real rows inside the attention card
//  6         the three needs integrate into HOY (2 tasks) and MAÑANA (1
//             event). The Home ends complete, balanced and fully legible —
//             nothing stays permanently dimmed
//
// Geometry lives in the 1280×720 master. The three needs are the existing
// travelers, so they keep their identity into the Planner morph (S05).
// ---------------------------------------------------------------------------

const HOME_X = 80
const HOME_W = 1120
const HOME_ROW_H = 92
const HOME_CARD_TOP = 228
const HOME_MAÑANA_TOP = 476
/** Juli's tile → the account slot of the top bar (44 px avatar). */
const HOME_ACCOUNT = { x: 80, y: 16, s: 0.22 }
/** Juli centred on the white surface, at scene scale. */
const HOME_JULI_STAGE = { x: 490, y: 180, s: 1.5 }
/** Height of the HOY card per beat (attention card → HOY card). */
const HOME_CARD_H = [0, 0, 92, 92, 184, 276, 184]
/** Height of the MAÑANA card per beat. */
const HOME_MANANA_CARD_H = [0, 0, 0, 0, 0, 0, 92]

type HomeSlot = { x: number; y: number; s: number; o: 0 | 1; w: number; h: number }

function homeSlot(node: string, beat: number): HomeSlot {
  if (node === 'juli') {
    if (beat <= 0) return { x: 0, y: 0, s: 1, o: 0, w: 200, h: 200 }
    if (beat === 1) return { x: HOME_JULI_STAGE.x, y: HOME_JULI_STAGE.y, s: HOME_JULI_STAGE.s, o: 1, w: 200, h: 200 }
    return { x: HOME_ACCOUNT.x, y: HOME_ACCOUNT.y, s: HOME_ACCOUNT.s, o: 1, w: 200, h: 200 }
  }
  if (node === 'ef') {
    if (beat <= 2) return { x: HOME_X, y: HOME_CARD_TOP, s: 1, o: 0, w: HOME_W, h: HOME_ROW_H }
    if (beat <= 5) return { x: HOME_X, y: HOME_CARD_TOP, s: 1, o: 1, w: HOME_W, h: HOME_ROW_H }
    return { x: HOME_X, y: HOME_MAÑANA_TOP, s: 1, o: 1, w: HOME_W, h: HOME_ROW_H }
  }
  if (node === 'auth') {
    if (beat <= 3) return { x: HOME_X, y: HOME_CARD_TOP + HOME_ROW_H, s: 1, o: 0, w: HOME_W, h: HOME_ROW_H }
    if (beat <= 5) return { x: HOME_X, y: HOME_CARD_TOP + HOME_ROW_H, s: 1, o: 1, w: HOME_W, h: HOME_ROW_H }
    return { x: HOME_X, y: HOME_CARD_TOP, s: 1, o: 1, w: HOME_W, h: HOME_ROW_H }
  }
  if (node === 'task') {
    if (beat <= 4) return { x: HOME_X, y: HOME_CARD_TOP + HOME_ROW_H * 2, s: 1, o: 0, w: HOME_W, h: HOME_ROW_H }
    if (beat === 5) return { x: HOME_X, y: HOME_CARD_TOP + HOME_ROW_H * 2, s: 1, o: 1, w: HOME_W, h: HOME_ROW_H }
    return { x: HOME_X, y: HOME_CARD_TOP + HOME_ROW_H, s: 1, o: 1, w: HOME_W, h: HOME_ROW_H }
  }
  return { x: 0, y: 0, s: 1, o: 0, w: HOME_W, h: HOME_ROW_H }
}

/**
 * Beat 6 integrates the three needs in two phases so that at most two
 * semantic objects are in flight at once (motion budget CINE-04).
 *   phase 1  0–500 ms    Educación Física leaves the attention card
 *   phase 2  460–1000 ms the two tasks rise into their HOY slots
 */
function homeDelay(node: string, beat: number): string {
  if (beat !== 6) return '0ms'
  if (node === 'auth') return '460ms'
  if (node === 'task') return '500ms'
  return '0ms'
}

const plannerMathTask = { ...juliTasks.find((task) => task.id === 'schoolTask')!, completed: false }

function ItemBody({ title, meta, status, kind = 'task' }: { title: string; meta: string; status?: string; kind?: 'task' | 'event' }) {
  return (
    <div className={`cine-card cine-card-${kind}`}>
      <div className="cine-card-heading">
        <span className="cine-card-dot" aria-hidden="true" />
        <div className="cine-card-copy">
          <p className="cine-card-title">{title}</p>
          <p className="cine-card-meta">{meta}</p>
        </div>
      </div>
      <div className="cine-card-footer">
        {status && <span className="cine-card-status">{status}</span>}
        <span className="cine-card-chevron" aria-hidden="true"><HomeIcon name="right" size={24} /></span>
      </div>
    </div>
  )
}

const HIDDEN: Place = { x: 0, y: 0, s: 1, o: 0 }

/**
 * A row of Juli's Home. Same anatomy as the app row (lead · copy · state ·
 * chevron), authored at the 16:9 scale. `arrive` plays the `enter 320` rise
 * exactly once, on the beat where the need reaches the screen.
 */
function HomeNeedBody({ kind, title, meta, status, arrive }: {
  kind: 'event' | 'task'
  title: string
  meta: string
  status?: string
  arrive: boolean
}) {
  return (
    <div className="cine-home-row" data-kind={kind} data-arrive={arrive ? 'true' : 'false'}>
      <span className="cine-home-row-lead" aria-hidden="true" />
      <div className="cine-home-row-copy">
        <p className="cine-home-row-title">{title}</p>
        <p className="cine-home-row-meta">{meta}</p>
      </div>
      {status && <span className="cine-home-row-status">{status}</span>}
      <span className="cine-home-row-chevron" aria-hidden="true"><HomeIcon name="right" size={22} /></span>
    </div>
  )
}

const TRAVELERS: TravelerDef[] = [
  {
    id: 'juli', w: 360, h: 344, delay: 0, body: <JuliBody />,
    renderBody: (step, beat, handoff) => (
      beat !== null || (step === 11 && handoff === 'home-to-planner')
        ? <div className="cine-home-juli-tile">J</div>
        : <JuliBody />
    ),
    at: [
      { ...C(460, 132, 1, 0) }, { ...C(460, 132, 1, 0) }, { ...C(460, 132, 1, 0) }, { ...C(460, 132, 1, 0) },
      { ...C(460, 40, 1, 1) }, { ...C(460, 40, 1, 1) }, { ...C(460, 40, 1, 1) }, { ...C(460, 40, 1, 1) },
      { ...C(54.4, 54, 0.32, 1) }, { ...C(54.4, 54, 0.32, 1) },
      { ...C(54.4, 54, 0.32, 1) }, { ...C(54.4, 54, 0.32, 1) },
      { ...HIDDEN }, { ...HIDDEN }, { ...HIDDEN }, { ...HIDDEN },
      { ...HIDDEN }, { ...HIDDEN }, { ...HIDDEN }, { ...HIDDEN }, { ...HIDDEN }, { ...HIDDEN },
      { ...HIDDEN }, { ...HIDDEN }, { ...HIDDEN }, { ...HIDDEN }, { ...HIDDEN },
      { ...HIDDEN }, { ...HIDDEN }, { ...HIDDEN }, { ...HIDDEN }, { ...HIDDEN }, { ...HIDDEN },
      { ...HIDDEN }, { ...HIDDEN }, { ...HIDDEN }, { ...HIDDEN }, { ...HIDDEN }, { ...HIDDEN },
      { ...HIDDEN }, { ...HIDDEN }, { ...HIDDEN }, { ...HIDDEN }, { ...HIDDEN }, { ...HIDDEN },
    ],
  },
  {
    id: 'ef', w: 350, h: 190, homeW: 357.33, homeH: 176,
    p04W: 520, p04H: 100, p05W: 800, p05H: 54, p06W: 800, p06H: 54, delay: 120,
    body: <ItemBody title="Educación Física" meta="Mañana · Colegio" kind="event" />,
    renderBody: (step, beat, handoff) => (beat !== null || (step === 11 && handoff === 'home-to-planner')
      ? <HomeNeedBody
          kind="event"
          title={schoolEvent.title}
          meta={schoolEvent.dateLabel}
          arrive={beat === 3}
        />
      : <ItemBody title="Educación Física" meta="Mañana · Colegio" kind="event" />),
    at: [
      { ...HIDDEN }, { ...HIDDEN }, { ...HIDDEN }, { ...HIDDEN }, { ...HIDDEN }, { ...HIDDEN },
      { ...C(465, 414, 1, 1) }, { ...C(465, 414, 1, 1) },
      { ...C(461.33, 220, 1, 1) }, { ...C(461.33, 220, 1, 1) },
      { ...C(461.33, 220, 1, 1) }, { ...C(461.33, 220, 1, 1) },
      { ...C(80, 516, 1, 0) }, { ...C(80, 516, 1, 1) }, { ...C(240, 250, 1, 1) }, { ...C(240, 250, 1, 1) },
      { ...HIDDEN }, { ...HIDDEN }, { ...HIDDEN }, { ...HIDDEN }, { ...HIDDEN }, { ...HIDDEN },
      { ...HIDDEN }, { ...HIDDEN }, { ...HIDDEN }, { ...HIDDEN }, { ...HIDDEN },
      { ...HIDDEN }, { ...HIDDEN }, { ...HIDDEN }, { ...HIDDEN }, { ...HIDDEN }, { ...HIDDEN },
      { ...HIDDEN }, { ...HIDDEN }, { ...HIDDEN }, { ...HIDDEN }, { ...HIDDEN }, { ...HIDDEN },
      { ...HIDDEN }, { ...HIDDEN }, { ...HIDDEN }, { ...HIDDEN }, { ...HIDDEN }, { ...HIDDEN },
    ],
  },
  {
    id: 'auth', w: 350, h: 190, homeW: 357.33, homeH: 176,
    p03W: 520, p03H: 144, p04W: 520, p04H: 100, delay: 240,
    body: <ItemBody title="Llevar autorización" meta="Para mañana" status="Pendiente" />,
    renderBody: (step, beat, handoff) => (beat !== null || (step === 11 && handoff === 'home-to-planner')
      ? <HomeNeedBody
          kind="task"
          title={juliTasks[0].title}
          meta={`${juliTasks[0].assignee} · ${juliTasks[0].dueLabel}`}
          status="Pendiente"
          arrive={beat === 4}
        />
      : <ItemBody title="Llevar autorización" meta="Para mañana" status="Pendiente" />),
    at: [
      { ...HIDDEN }, { ...HIDDEN }, { ...HIDDEN }, { ...HIDDEN }, { ...HIDDEN }, { ...HIDDEN }, { ...HIDDEN },
      { ...C(843, 414, 1, 1) },
      { ...C(842.67, 220, 1, 1) }, { ...C(842.67, 220, 1, 1) },
      { ...C(842.67, 220, 1, 1) }, { ...C(842.67, 220, 1, 1) },
      { ...C(680, 326, 1, 1) }, { ...C(680, 516, 1, 1) }, { ...HIDDEN }, { ...HIDDEN },
      { ...HIDDEN }, { ...HIDDEN }, { ...HIDDEN }, { ...HIDDEN }, { ...HIDDEN }, { ...HIDDEN },
      { ...HIDDEN }, { ...HIDDEN }, { ...HIDDEN }, { ...HIDDEN }, { ...HIDDEN },
      { ...HIDDEN }, { ...HIDDEN }, { ...HIDDEN }, { ...HIDDEN }, { ...HIDDEN }, { ...HIDDEN },
      { ...HIDDEN }, { ...HIDDEN }, { ...HIDDEN }, { ...HIDDEN }, { ...HIDDEN }, { ...HIDDEN },
      { ...HIDDEN }, { ...HIDDEN }, { ...HIDDEN }, { ...HIDDEN }, { ...HIDDEN }, { ...HIDDEN },
    ],
  },
  {
    id: 'task', w: 350, h: 190, homeW: 357.33, homeH: 176,
    spotlightW: 760, spotlightH: 220, plannerW: 1120, plannerH: 144,
    p03W: 520, p03H: 144, delay: 0,
    body: <ItemBody title="Tarea de Matemática" meta="Hoy · Juli" status="Pendiente" />,
    renderBody: (step, beat, handoff) => (
      beat !== null || (step === 11 && handoff === 'home-to-planner')
        ? <HomeNeedBody
            kind="task"
            title={plannerMathTask.title}
            meta={`${plannerMathTask.assignee} · ${plannerMathTask.dueLabel}`}
            status="Pendiente"
            arrive={beat === 5}
          />
        : <ItemBody
            title={plannerMathTask.title}
            meta={step >= 11 ? `${plannerMathTask.assignee} · ${plannerMathTask.dueLabel}` : 'Hoy · Juli'}
            status={plannerMathTask.completed ? 'Completada' : 'Pendiente'}
          />
    ),
    at: [
      { ...HIDDEN }, { ...HIDDEN }, { ...HIDDEN }, { ...HIDDEN }, { ...HIDDEN },
      { ...C(87, 414, 1, 1) }, { ...C(87, 414, 1, 1) }, { ...C(87, 414, 1, 1) },
      { ...C(80, 220, 1, 1) }, { ...C(80, 220, 1, 1) },
      { ...C(260, 250, 1, 1) }, { ...C(80, 326, 1, 1) },
      { ...C(80, 326, 1, 1) }, { ...HIDDEN }, { ...HIDDEN }, { ...HIDDEN },
      { ...HIDDEN }, { ...HIDDEN }, { ...HIDDEN }, { ...HIDDEN }, { ...HIDDEN }, { ...HIDDEN },
      { ...HIDDEN }, { ...HIDDEN }, { ...HIDDEN }, { ...HIDDEN }, { ...HIDDEN },
      { ...HIDDEN }, { ...HIDDEN }, { ...HIDDEN }, { ...HIDDEN }, { ...HIDDEN }, { ...HIDDEN },
      { ...HIDDEN }, { ...HIDDEN }, { ...HIDDEN }, { ...HIDDEN }, { ...HIDDEN }, { ...HIDDEN },
      { ...HIDDEN }, { ...HIDDEN }, { ...HIDDEN }, { ...HIDDEN }, { ...HIDDEN }, { ...HIDDEN },
    ],
  },
]

const ZOOM_SCALE = [1, 6.2, 38, 38, 38, 38, 38, 38, 38, 38]

const WEEK: Array<[string, number, boolean]> = [
  ['L', 17, true], ['M', 18, false], ['X', 19, false], ['J', 20, false],
  ['V', 21, false], ['S', 22, false], ['D', 23, false],
]

const NAV_ICONS = ['home', 'family', 'add', 'calendar', 'more'] as const

const TOMI_CHAT_MESSAGE = 'El entrenamiento se retrasó una hora. ¿Quién puede buscarme?'
const MAMA_CHAT_MESSAGE = 'Yo te paso a buscar a la salida.'
type FamilyMessagePhase = 'idle' | 'intro' | 'typing-tomi' | 'sending-tomi' | 'first-sent' | 'typing-mama' | 'sending-mama' | 'complete'

function FamilyMessageSequence({ active }: { active: boolean }) {
  const [phase, setPhase] = useState<FamilyMessagePhase>('idle')
  const [tomiCharacters, setTomiCharacters] = useState(0)
  const [mamaCharacters, setMamaCharacters] = useState(0)

  useEffect(() => {
    if (!active) {
      setPhase('idle')
      setTomiCharacters(0)
      setMamaCharacters(0)
      return
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setTomiCharacters(TOMI_CHAT_MESSAGE.length)
      setMamaCharacters(MAMA_CHAT_MESSAGE.length)
      setPhase('complete')
      return
    }

    let timeouts: number[] = []
    let intervals: number[] = []
    const after = (callback: () => void, delay: number) => {
      timeouts.push(window.setTimeout(callback, delay))
    }
    const type = (text: string, update: (count: number) => void, done: () => void) => {
      let count = 0
      const interval = window.setInterval(() => {
        count += 1
        update(count)
        if (count >= text.length) {
          window.clearInterval(interval)
          intervals = intervals.filter((timer) => timer !== interval)
          done()
        }
      }, 18)
      intervals.push(interval)
    }

    setPhase('intro')
    setTomiCharacters(0)
    setMamaCharacters(0)
    after(() => {
      setPhase('typing-tomi')
      type(TOMI_CHAT_MESSAGE, setTomiCharacters, () => {
        setPhase('sending-tomi')
        after(() => {
          setPhase('first-sent')
          after(() => {
            setPhase('typing-mama')
            type(MAMA_CHAT_MESSAGE, setMamaCharacters, () => {
              setPhase('sending-mama')
              after(() => setPhase('complete'), 280)
            })
          }, 120)
        }, 280)
      })
    }, 220)

    return () => {
      timeouts.forEach((timer) => window.clearTimeout(timer))
      intervals.forEach((timer) => window.clearInterval(timer))
      timeouts = []
      intervals = []
    }
  }, [active])

  const tomiWriting = phase === 'typing-tomi' || phase === 'sending-tomi'
  const mamaWriting = phase === 'typing-mama' || phase === 'sending-mama'
  const tomiSent = phase === 'first-sent' || phase === 'typing-mama' || phase === 'sending-mama' || phase === 'complete'
  const mamaSent = phase === 'complete'
  const draft = tomiWriting ? TOMI_CHAT_MESSAGE.slice(0, tomiCharacters)
    : mamaWriting ? MAMA_CHAT_MESSAGE.slice(0, mamaCharacters) : ''
  const sending = phase === 'sending-tomi' || phase === 'sending-mama'
  const composerVisible = phase !== 'idle' && phase !== 'intro'

  return (
    <section className="cine-family-messages" data-present={active} aria-hidden={!active}>
      <h2>Mensajes</h2>
      <div className="cine-family-conversation" data-phase={phase}>
        <div className="cine-message-history" data-scrolled={phase === 'typing-mama' || phase === 'sending-mama' || phase === 'complete'} data-reply-entered={mamaSent} aria-live="polite">
          {tomiSent && (
            <article className="cine-chat-message cine-chat-message-tomi" data-arrive="true">
              <header className="cine-chat-author">
                <span className="family-avatar family-avatar-tomi" aria-hidden="true">T</span>
                <div><strong>Tomi</strong><p>Familia García · Ahora</p></div>
              </header>
              <p className="cine-chat-copy">{TOMI_CHAT_MESSAGE}</p>
            </article>
          )}
          {mamaSent && (
            <article className="cine-chat-message cine-chat-message-mama" data-arrive="true">
              <header className="cine-chat-author">
                <span className="family-avatar family-avatar-mom" aria-hidden="true">M</span>
                <div><strong>Mamá</strong><p>Familia García · Ahora</p></div>
              </header>
              <p className="cine-chat-copy">{MAMA_CHAT_MESSAGE}</p>
            </article>
          )}
        </div>
        <div className="cine-message-composer" data-visible={composerVisible} data-sending={sending}>
          <div className="cine-message-draft" role="textbox" aria-readonly="true" aria-label="Mensaje en redacción">
            <span className={`cine-message-draft-text${sending ? ' cine-message-in-flight' : ''}`}>
              {draft || <span className="cine-message-placeholder">Escribe un mensaje…</span>}
            </span>
            {tomiWriting || mamaWriting ? <span className="cine-message-caret" aria-hidden="true" /> : null}
          </div>
          <button className="cine-message-send" type="button" aria-label="Enviar mensaje" disabled={!sending}>
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m3.5 11 16-7-6.8 16-2.1-6.3L3.5 11Z"/><path d="m10.6 13.7 4.1-4.2"/></svg>
          </button>
        </div>
      </div>
      <p className="cine-coordination-principle">Coordinar no significa vigilar.</p>
    </section>
  )
}

function HomeHeaderCopy() {
  return (
    <div className="cine-home-header-copy">
      <div className="cine-home-name-row">
        <h1>Hola, Juli</h1>
        <span>10 años</span>
      </div>
      <p>Domingo, 16 de agosto</p>
    </div>
  )
}

function Chrome({ show, className, children, delay = 0 }: { show: boolean; className: string; children: ReactNode; delay?: number }) {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return (
    <div className={`cine-chrome ${className}`} data-on={show} aria-hidden={!show} style={{ transitionDelay: show && !reducedMotion ? `${delay}ms` : '0ms' }}>
      {children}
    </div>
  )
}

function PlannerSurface({ step, handoff, familyHandoff }: { step: number; handoff: CineHandoff; familyHandoff: FamilyHandoff }) {
  const active = step >= 11 && step <= 15
  const view: PlannerTab = step === 13 ? 'calendar' : step >= 14 ? 'plans' : 'tasks'
  const showCalendar = step >= 13 && step <= 14
  const compactCalendar = step === 14
  return (
    <div className="cine-planner-surface" data-on={active} data-view={view} data-p01-handoff={handoff ?? undefined} data-family-handoff={familyHandoff ?? undefined} aria-hidden={!active} style={homeVariables}>
      <HomeHeader showJuli />
      <main className="cine-planner-workspace">
        <header className="planner-heading cine-planner-heading">
          <h1>Planner</h1>
          <span aria-label="Crear" role="img"><HomeIcon name="add" size={26} /></span>
        </header>
        <PlannerTabs selected={view} settled />
        {step <= 12 && (
          <h2 className="planner-section-label cine-planner-section-label">
            {step === 12 ? 'Tareas y responsabilidades' : 'Tareas'}
          </h2>
        )}
      </main>
      <div
        className={`cine-calendar-module${compactCalendar ? ' cine-calendar-mini' : ' cine-calendar-full'}`}
        data-present={showCalendar}
        aria-hidden={!showCalendar}
      >
        <PlannerCalendar event={schoolEvent} showEventRow={false} />
      </div>
      {compactCalendar && <h2 className="cine-planner-schedule-label">Horarios</h2>}
      <PlannerNavigation />
    </div>
  )
}

function BirthdayPlanNode({ step, familyHandoff }: { step: number; familyHandoff: FamilyHandoff }) {
  const active = step === 14 || step === 15
  return (
    <section className="cine-shared-birthday-plan" data-on={active} data-mode="planner" data-bridge={false} data-family-handoff={familyHandoff ?? undefined} aria-hidden={!active} style={homeVariables}>
      {(step === 14 || step === 15) && <h2 className="cine-planner-plan-label">Planes</h2>}
      <PlannerPlans plan={birthdayPlan} />
    </section>
  )
}

function BirthdayBridge({ step, beat = 0 }: { step: number; beat?: number }) {
  const active = step === 22
  const questionBeat = beat >= 1
  const [questionSeen, setQuestionSeen] = useState(false)
  const [questionZoomed, setQuestionZoomed] = useState(false)
  useEffect(() => {
    if (questionBeat) setQuestionSeen(true)
  }, [questionBeat])
  useEffect(() => {
    if (beat >= 2) setQuestionZoomed(true)
  }, [beat])
  return (
    <section className="cine-birthday-bridge" data-on={active} data-beat={questionBeat ? '1' : '0'} data-local-beat={beat} data-revisit={questionSeen} data-zoomed={questionZoomed} aria-hidden={!active} style={homeVariables}>
      <HomeHeader showJuli />
      <h2 className="cine-birthday-title">Planes</h2>
      <main className="cine-birthday-composition">
        <div className="cine-birthday-illustration" aria-hidden="true">
          <div className="cine-birthday-cake-wrap">
            <img className="cine-birthday-cake" src={birthdayCakeArtwork} alt="" draggable={false} />
            <span className="cine-birthday-flame" data-candle="1"><span className="cine-birthday-flame-core" /></span>
            <span className="cine-birthday-flame" data-candle="2"><span className="cine-birthday-flame-core" /></span>
            <span className="cine-birthday-flame" data-candle="3"><span className="cine-birthday-flame-core" /></span>
          </div>
          <div className="cine-birthday-gift">
            <img className="cine-birthday-gift-box" src={giftBoxArtwork} alt="" draggable={false} />
            <img className="cine-birthday-bow" src={giftBowArtwork} alt="" draggable={false} />
          </div>
        </div>

        <div className="cine-birthday-plan-card">
          <PlannerPlans plan={birthdayPlan} />
        </div>

        <div className="cine-birthday-c32">
          <div className="cine-birthday-c32-card" aria-hidden="true" />

          <div className="cine-birthday-task">
            <span className="planner-unchecked" aria-hidden="true" />
            <svg className="cine-birthday-task-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="9" cy="20" r="1.4" />
              <circle cx="18" cy="20" r="1.4" />
              <path d="M3 4h2.2l2.1 10.2a1.5 1.5 0 0 0 1.5 1.2h8.5a1.5 1.5 0 0 0 1.5-1.2L20.5 8H6" />
            </svg>
            <p>Comprar lo que falta</p>
          </div>

          <div className="cine-birthday-question">
            <h1>
              <span>¿Qué falta</span>
              <span className="cine-birthday-accent">en casa?</span>
            </h1>
          </div>

          <div className="cine-birthday-objects" aria-label="Objetos ilustrativos para el cumpleaños">
            <figure className="cine-birthday-object" data-object="drinks">
              <img src={drinksArtwork} alt="" draggable={false} />
              <figcaption>Bebidas</figcaption>
            </figure>
            <figure className="cine-birthday-object" data-object="napkins">
              <img src={napkinsArtwork} alt="" draggable={false} />
              <figcaption>Servilletas</figcaption>
            </figure>
            <figure className="cine-birthday-object" data-object="candles">
              <img src={candlesArtwork} alt="" draggable={false} />
              <figcaption>Velas</figcaption>
            </figure>
          </div>

          <p className="cine-birthday-disclaimer">Los objetos son ilustrativos; no representan cantidades reales del inventario.</p>
        </div>
      </main>
      <PlannerNavigation />
    </section>
  )
}

const INVENTORY_STORY_ITEMS = [
  { id: 'drinks', name: 'Bebidas', note: 'Para los preparativos', status: 'Disponible', tone: 'ok', image: drinksArtwork, available: true },
  { id: 'napkins', name: 'Servilletas', note: 'Necesitan atención', status: 'Por reponer', tone: 'low', image: napkinsArtwork, available: false },
  { id: 'candles', name: 'Velas', note: 'Necesitan atención', status: 'Por reponer', tone: 'low', image: candlesArtwork, available: false },
] as const

function InventoryStory({ step, beat }: { step: number; beat: number }) {
  const active = step >= 23 && step <= 25
  const [entered, setEntered] = useState(false)
  useEffect(() => {
    if (!active) {
      setEntered(false)
      return
    }
    const frame = window.requestAnimationFrame(() => setEntered(true))
    return () => window.cancelAnimationFrame(frame)
  }, [active])
  const shortageItems = INVENTORY_STORY_ITEMS.filter(item => !item.available)
  return (
    <section className="cine-inventory-story" data-on={active} data-beat={beat} data-ready={entered} aria-hidden={!active} style={homeVariables}>
      <HomeHeader showJuli />
      <h2 className="cine-inventory-title">Inventario</h2>
      <p className="cine-inventory-disclaimer" role="note">Vista ilustrativa · sin cantidades reales</p>

      <div className="cine-inventory-board">
        <p className="cine-inventory-eyebrow">Inventario de la familia</p>
        <h3 className="cine-inventory-heading">Lo que tenemos en casa</h3>
        <p className="cine-inventory-desc">Consultar lo disponible y detectar lo que hace falta.</p>
        <div className="cine-inventory-cards">
          {INVENTORY_STORY_ITEMS.map(item => (
            <article key={item.id} className="cine-inventory-card" data-item={item.id} data-available={item.available}>
              <div className="cine-inventory-card-art"><img src={item.image} alt="" draggable={false} /></div>
              <div className="cine-inventory-card-copy">
                <div>
                  <h4>{item.name}</h4>
                  <p>{item.note}</p>
                </div>
                <span className="cine-inventory-pill" data-tone={item.tone}>{item.status}</span>
              </div>
            </article>
          ))}
        </div>
        <div className="cine-inventory-footer">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M8 6h12M8 12h12M8 18h12" />
            <circle cx="3.5" cy="6" r="1" fill="currentColor" stroke="none" />
            <circle cx="3.5" cy="12" r="1" fill="currentColor" stroke="none" />
            <circle cx="3.5" cy="18" r="1" fill="currentColor" stroke="none" />
          </svg>
          <p>Lo que falta puede pasar a la lista de compras.</p>
        </div>
      </div>

      <div className="cine-shopping-board">
        <section className="cine-shopping-source">
          <p className="cine-inventory-eyebrow">Desde inventario</p>
          <h3 className="cine-shopping-heading">Productos por reponer</h3>
          <div className="cine-shopping-source-rows">
            {shortageItems.map(item => (
              <div key={item.id} className="cine-shopping-source-row" data-item={item.id}>
                <img src={item.image} alt="" draggable={false} />
                <p>{item.name}</p>
                <span aria-hidden="true">→</span>
              </div>
            ))}
          </div>
        </section>
        <article className="cine-shopping-card">
          <header>
            <svg className="cine-shopping-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M8 6h12M8 12h12M8 18h12" />
              <circle cx="3.5" cy="6" r="1" fill="currentColor" stroke="none" />
              <circle cx="3.5" cy="12" r="1" fill="currentColor" stroke="none" />
              <circle cx="3.5" cy="18" r="1" fill="currentColor" stroke="none" />
            </svg>
            <div>
              <p className="cine-inventory-eyebrow">En casa</p>
              <h3>Lista de compras</h3>
            </div>
          </header>
          <div className="cine-shopping-list">
            {shortageItems.map(item => (
              <div key={item.id} className="cine-shopping-list-row" data-item={item.id}>
                <span className="cine-shopping-check" aria-hidden="true" />
                <img src={item.image} alt="" draggable={false} />
                <p>{item.name}</p>
              </div>
            ))}
          </div>
          <p className="cine-shopping-note">Lista preparada para la próxima compra.</p>
        </article>
      </div>

      <InventoryNavigation />
    </section>
  )
}

function FinanceStory({ step, beat }: { step: number; beat: number }) {
  const active = step >= 27 && step <= 28
  const itemImage: Record<string, string> = { bebidas: drinksArtwork, servilletas: napkinsArtwork, velas: candlesArtwork }
  const titles = ['De la compra al gasto', 'Finanzas', 'Resumen y análisis'] as const
  const subtitles = [
    'Una misma compra conecta organización y dinero.',
    'Movimientos, pagos y límites en un mismo lugar.',
    'Entender en qué gastamos es tan importante como registrarlo.',
  ] as const
  return (
    <section className="cine-finance-story" data-on={active} data-beat={beat} aria-hidden={!active} style={homeVariables}>
      <HomeHeader showJuli />

      <div className="cine-fin-story-heading">
        {titles.map((title, i) => (
          <div key={title} className="cine-fin-title-group" data-active={beat === i}>
            <h1>{title}</h1>
            <p>{subtitles[i]}</p>
          </div>
        ))}
      </div>

      <div className="cine-fin-c36" aria-hidden={beat !== 0}>
        <article className="cine-fin-list-card">
          <header>
            <FinIcon name="list" size={22} />
            <div>
              <h2>{financeStory.list.title}</h2>
              <p>{financeStory.list.subtitle}</p>
            </div>
          </header>
          <div className="cine-fin-list-rows">
            {financeStory.list.items.map((item) => (
              <div key={item.id} className="cine-fin-list-row">
                <span className="cine-fin-check" aria-hidden="true" />
                <img src={itemImage[item.id]} alt="" draggable={false} />
                <p>{item.name}</p>
              </div>
            ))}
          </div>
          <p className="cine-fin-list-footer">{financeStory.list.footer}</p>
        </article>

        <span className="cine-fin-connector" data-connector="1" aria-hidden="true">
          <svg viewBox="0 0 28 18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 9h22M18 3l6 6-6 6" />
          </svg>
        </span>

        <article className="cine-fin-ticket">
          <header>
            <FinIcon name="receipt" size={22} />
            <p className="cine-fin-eyebrow">Compra</p>
          </header>
          <h2>{financeStory.purchase.title}</h2>
          <p className="cine-fin-sub">{financeStory.purchase.subtitle}</p>
          <div className="cine-fin-ticket-rows">
            {financeStory.list.items.map((item) => (
              <div key={item.id} className="cine-fin-ticket-row">
                <span>{item.name}</span>
                <strong>{item.label}</strong>
              </div>
            ))}
          </div>
          <div className="cine-fin-ticket-total">
            <span>Total</span>
            <strong>{financeStory.purchase.totalLabel}</strong>
          </div>
        </article>

        <span className="cine-fin-connector" data-connector="2" aria-hidden="true">
          <svg viewBox="0 0 28 18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 9h22M18 3l6 6-6 6" />
          </svg>
        </span>

        <article className="cine-fin-move-card">
          <header>
            <span className="cine-fin-round-icon">
              <FinIcon name="receipt" size={20} />
            </span>
            <h2>Finanzas</h2>
          </header>
          <p className="cine-fin-label">Movimientos recientes</p>
          <div className="cine-fin-move-row">
            <span className="cine-fin-row-icon">
              <FinIcon name="cart" size={22} />
            </span>
            <div>
              <strong>{financeStory.purchase.title}</strong>
              <p>{financeStory.purchase.movementMeta}</p>
            </div>
            <p className="cine-fin-move-amount">{financeStory.purchase.movementAmount}</p>
          </div>
          <p className="cine-fin-note">Importes de demostración</p>
        </article>
      </div>

      <div className="cine-fin-c37" aria-hidden={beat !== 1}>
        <article className="cine-fin-movements-card">
          <header>
            <FinIcon name="receipt" size={24} />
            <h2>Movimientos recientes</h2>
            <span>Ver todos</span>
          </header>
          <div className="cine-fin-movements-rows">
            {financeStory.recent.map((row, i) => (
              <div key={row.id} className="cine-fin-movement" data-first={i === 0 || undefined}>
                <span className="cine-fin-row-icon">
                  <FinIcon name={i === 0 ? 'cart' : i === 1 ? 'receipt' : 'card'} size={22} />
                </span>
                <div>
                  <strong>{row.title}</strong>
                  <p>{row.meta}</p>
                </div>
                <p className="cine-fin-move-amount">{row.amount}</p>
              </div>
            ))}
          </div>
          <p className="cine-fin-card-footer">
            <FinIcon name="card" size={18} />
            Cuentas y tarjetas asociadas a los movimientos
          </p>
        </article>

        <article className="cine-fin-pagos-card">
          <header>
            <span className="cine-fin-round-icon">
              <HomeIcon name="calendar" size={22} />
            </span>
            <h2>{financeStory.payments.title}</h2>
          </header>
          <p className="cine-fin-sub">{financeStory.payments.subtitle}</p>
          <div className="cine-fin-pagos-row">
            {financeStory.payments.items.map((item) => <span key={item}>{item}</span>)}
          </div>
        </article>

        <article className="cine-fin-limits-card">
          <header>
            <span className="cine-fin-round-icon">
              <FinIcon name="chart" size={22} />
            </span>
            <h2>{financeStory.limits.title}</h2>
          </header>
          <p className="cine-fin-sub">{financeStory.limits.subtitle}</p>
          <div className="cine-fin-limit-bar" aria-hidden="true">
            <span style={{ width: `${financeStory.limits.pct}%` }} />
          </div>
          <p className="cine-fin-note">{financeStory.limits.note}</p>
        </article>
      </div>

      <div className="cine-fin-c38" aria-hidden={beat !== 2}>
        <article className="cine-fin-chart-card">
          <header>
            <FinIcon name="chart" size={24} />
            <h2>{financeStory.summary.title}</h2>
          </header>
          <p className="cine-fin-sub">{financeStory.summary.subtitle}</p>
          <div className="cine-fin-bars">
            {financeStory.summary.categories.map((category, i) => (
              <div key={category.id} className="cine-fin-bar-row" data-featured={i === 0 || undefined}>
                <p>{category.name}</p>
                <div className="cine-fin-bar-track">
                  <span
                    className="cine-fin-bar-fill"
                    style={{ '--bar-w': `${category.pct}%`, '--row-delay': `${220 + i * 100}ms`, '--bar-delay': `${380 + i * 100}ms` } as CSSProperties}
                  />
                </div>
                <p className="cine-fin-bar-amount">{category.label}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="cine-fin-highlight-card">
          <p className="cine-fin-eyebrow">Categoría destacada</p>
          <header>
            <span className="cine-fin-round-icon">
              <FinIcon name="cart" size={24} />
            </span>
            <h2>{financeStory.summary.featured}</h2>
          </header>
          <div className="cine-fin-divider" />
          <p className="cine-fin-highlight-amount">{financeStory.summary.featuredLabel}</p>
          <p className="cine-fin-highlight-caption">{financeStory.summary.featuredCaption}</p>
          <div className="cine-fin-divider" />
          <p className="cine-fin-highlight-total">Total del ejemplo: <strong>{financeStory.summary.totalLabel}</strong></p>
        </article>
      </div>

      <p className="cine-fin-demo-note">{financeStory.note}</p>
      <FinanceNavigation />
    </section>
  )
}

function FinIcon({ name, size = 22 }: { name: 'list' | 'receipt' | 'cart' | 'card' | 'chart'; size?: number }) {
  if (name === 'list') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M8 6h12M8 12h12M8 18h12" />
        <circle cx="3.5" cy="6" r="1" fill="currentColor" stroke="none" />
        <circle cx="3.5" cy="12" r="1" fill="currentColor" stroke="none" />
        <circle cx="3.5" cy="18" r="1" fill="currentColor" stroke="none" />
      </svg>
    )
  }
  if (name === 'cart') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="9" cy="20" r="1.4" />
        <circle cx="18" cy="20" r="1.4" />
        <path d="M3 4h2.2l2.1 10.2a1.5 1.5 0 0 0 1.5 1.2h8.5a1.5 1.5 0 0 0 1.5-1.2L20.5 8H6" />
      </svg>
    )
  }
  if (name === 'card') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="6" width="18" height="13" rx="3" />
        <path d="M3 10h18M7 15h4" />
      </svg>
    )
  }
  if (name === 'chart') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />
      </svg>
    )
  }
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 3h12a1 1 0 0 1 1 1v17l-3-2-2 2-2-2-2 2-2-2-3 2V4a1 1 0 0 1 1-1Z" />
      <path d="M9 8h6M9 12h6" />
    </svg>
  )
}

function ShoppingAnchor({ step, enabled = true }: { step: number; enabled?: boolean }) {
  const active = enabled && step >= 23 && step <= 26
  const mode = step === 26 ? 'expense-bridge' : 'shopping'
  return (
    <section className="cine-shopping-anchor" data-on={active} data-mode={mode} aria-hidden={!active}>
      <div className="cine-shopping-anchor-copy">
        <h2>{shoppingSummary.title}</h2>
        <p>{shoppingSummary.subtitle.replace(String(shoppingSummary.count), '').trim()}</p>
      </div>
      <span className="cine-shopping-anchor-count" aria-label={shoppingSummary.subtitle}>{shoppingSummary.count}</span>
      {step === 26 && <p className="cine-expense-next">Después de comprar, registrar el gasto.</p>}
    </section>
  )
}

function InventorySurface({ step, enabled = true }: { step: number; enabled?: boolean }) {
  const active = enabled && step >= 23 && step <= 26
  return (
    <div className="cine-inventory-surface" data-on={active} data-step={step} data-inventory-focus={step >= 24} aria-hidden={!active} style={homeVariables}>
      <InventoryDemoScreen focusShortages={step >= 24} showShoppingSummary={false} showAvailableStatus />
    </div>
  )
}

function FamilyStory({ step, familyHandoff }: { step: number; familyHandoff: FamilyHandoff }) {
  const active = step >= 16 && step <= 21
  const phase = step === 16 ? 'family-context' : step === 17 ? 'family-tomi' : step === 18 ? 'situation' : step === 19 ? 'map' : step === 21 ? 'closure' : 'messages'
  return (
    <div className="cine-family-bridge" data-on={active} data-phase={phase} data-family-handoff={familyHandoff ?? undefined} aria-hidden={!active} style={homeVariables}>
      <HomeHeader showJuli />
      <h2 className="cine-family-screen-title" data-present={(step >= 16 && step <= 18) || step === 21}>
        {step === 18 ? 'Una actividad cambió' : 'Familia'}
      </h2>
      <main className="cine-family-bridge-main" data-phase={phase}>
        <section className="cine-family-person" data-person="tomi">
          <span className="family-avatar family-avatar-tomi">T</span>
          <div><h1>Tomi</h1><p>{step >= 16 ? '16 años · Colegio' : 'Colegio'}</p></div>
        </section>
        <section className="cine-family-parent cine-family-mom" data-present={step >= 16 && step <= 17}>
          <span className="family-avatar family-avatar-mom">M</span>
          <div><h2>Mamá</h2><p>Casa</p></div>
        </section>
        <section className="cine-family-parent cine-family-dad" data-present={step >= 16 && step <= 17}>
          <span className="family-avatar family-avatar-dad">P</span>
          <div><h2>Papá</h2><p>Trabajo</p></div>
        </section>
        <section className="cine-family-agenda" data-present={step === 15}>
          <span className="cine-family-agenda-dot" aria-hidden="true" />
          <div>
            <h2>Entrenamiento</h2>
            <p className="cine-family-time">Hoy · 17 h</p>
            <p className="cine-family-pickup">Mamá te pasa a buscar a la salida.</p>
          </div>
        </section>
        <section className="cine-family-situation" data-present={step === 18}>
          <p className="cine-family-situation-context">A la salida del colegio</p>
          <h2>Entrenamiento</h2>
          <strong>+1 h</strong>
          <p>¿Quién lo busca?</p>
        </section>
      </main>
      <div className="cine-map-stage" data-present={step >= 18 && step <= 21} data-map-size={step === 19 ? 'full' : step >= 20 ? 'mini' : 'preview'}>
        <MapDemoScreen showSchool showClub highlightClub={step >= 19} />
      </div>
      <FamilyMessageSequence active={step === 20} />
      {step === 21 && (
        <section className="cine-family-closure" data-present="true" aria-label="Respuesta de Mamá">
          <article className="cine-family-closure-card">
            <header className="cine-chat-author">
              <span className="family-avatar family-avatar-mom" aria-hidden="true">M</span>
              <div><strong>Mamá</strong><p>Familia García · Ahora</p></div>
            </header>
            <p>Yo te paso a buscar a la salida.</p>
          </article>
        </section>
      )}
      {(step >= 16 && step <= 21 || familyHandoff === 'family-to-planner') && <FamilyNavigation />}
    </div>
  )
}

function FinanceSurface({ step, enabled = true }: { step: number; enabled?: boolean }) {
  const active = enabled && (step === 27 || step === 28)
  const focus = step === 27 ? 'intent' : 'summary'
  return (
    <div className="cine-finance-surface" data-on={active} data-focus={focus} aria-hidden={!active} style={homeVariables}>
      <HomeHeader showJuli />
      <main className="cine-finance-workspace">
        <header className="cine-module-heading">
          <h1>Finanzas</h1>
          <span className="cine-module-add" role="img" aria-label="Crear"><HomeIcon name="add" size={26} /></span>
        </header>
        <div className="cine-finance-tabs" role="tablist" aria-label="Secciones de Finanzas">
          {financeTabs.map((tab) => (
            <span key={tab} className="cine-finance-tab" role="tab" aria-selected={tab === 'Resumen'}>
              {tab}
            </span>
          ))}
        </div>
        <section className="cine-finance-hero">
          <p className="cine-finance-scope">{financeHero.scope}</p>
          <p className="cine-finance-balance">{financeHero.balance}</p>
          <p className="cine-finance-baseline">{financeHero.baseline}</p>
        </section>
        <p className="cine-finance-note" data-present={focus === 'intent'}>
          La lista propone la intención; el gasto se registra aparte.
        </p>
        <div className="cine-finance-swap">
          <div className="cine-finance-pane" data-present={focus !== 'summary'}>
            <h2 className="cine-finance-label">Movimientos</h2>
            <div className="cine-finance-card">
              {financePayments.map((payment) => (
                <div key={payment.id} className="cine-finance-row" data-paid={payment.paid}>
                  <div className="cine-finance-copy">
                    <p className="cine-finance-title">{payment.title}</p>
                    <p className="cine-finance-meta">{payment.dueLabel}</p>
                  </div>
                  <p className="cine-finance-amount">{payment.amount}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="cine-finance-pane" data-present={focus === 'summary'}>
            <h2 className="cine-finance-label">Por categoría</h2>
            <div className="cine-finance-cats">
              {financeCategories.map((category) => (
                <div key={category.id} className="cine-finance-cat">
                  <div className="cine-finance-cat-head">
                    <p className="cine-finance-title">{category.name}</p>
                    <p className="cine-finance-amount">{category.amount}</p>
                  </div>
                  <div className="cine-finance-bar" aria-hidden="true"><span style={{ width: `${category.pct}%` }} /></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <FinanceNavigation />
    </div>
  )
}

function AssetsSurface({ step }: { step: number }) {
  const active = step === 29 || step === 30
  const ps5 = homeAssets[0]
  return (
    <div className="cine-assets-surface" data-on={active} data-view={step === 29 ? 'orbit' : 'grouped'} aria-hidden={!active} style={homeVariables}>
      <HomeHeader showJuli />
      <main className="cine-assets-workspace">
        <header className="cine-module-heading"><h1>Activos</h1></header>
        <section className="cine-asset-hero">
          <span className="cine-ps5" aria-hidden="true">
            <img src={ps5Console} alt="" draggable={false} />
            <span className="cine-ps5-shadow" />
          </span>
          <div>
            <p className="cine-asset-name">{ps5.name}</p>
            <p className="cine-asset-detail">{ps5.detail}</p>
          </div>
        </section>
        <div className="cine-asset-orbit" aria-label="Documentos y datos del activo">
          <article className="cine-asset-fact" data-fact="warranty"><span className="cine-asset-fact-icon" data-glyph="check" aria-hidden="true">✓</span><div><strong>{ps5Documents[0].title}</strong><small>{ps5Documents[0].meta}</small></div></article>
          <article className="cine-asset-fact" data-fact="manual"><span className="cine-asset-fact-icon" data-glyph="pdf" aria-hidden="true">PDF</span><div><strong>{ps5Documents[1].title}</strong><small>{ps5Documents[1].meta}</small></div></article>
          <article className="cine-asset-fact" data-fact="invoice"><span className="cine-asset-fact-icon" data-glyph="pdf" aria-hidden="true">PDF</span><div><strong>{cloudDocuments[2].title}</strong><small>{cloudDocuments[2].meta}</small></div></article>
          <article className="cine-asset-fact" data-fact="serial"><span className="cine-asset-fact-icon" data-glyph="serial" aria-hidden="true">#</span><div><strong>N.º de serie</strong></div></article>
          <article className="cine-asset-fact" data-fact="value"><span className="cine-asset-fact-icon" data-glyph="value" aria-hidden="true">$</span><div><strong>Valor de compra</strong></div></article>
        </div>
        <div className="cine-assets-docs">
          <h2 className="cine-assets-label">Documentos</h2>
          <div className="cine-assets-card">
            {ps5Documents.map((doc) => (
              <div key={doc.id} className="cine-assets-doc" data-doc={doc.id} data-current={doc.id === 'garantia'}>
                <span className="cine-assets-doc-tile" aria-hidden="true">PDF</span>
                <div>
                  <p className="cine-assets-doc-title">{doc.title}</p>
                  <p className="cine-assets-doc-meta">{doc.meta}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="cine-assets-others">
          <h2 className="cine-assets-label">En casa</h2>
          <div className="cine-assets-card">
            {homeAssets.slice(1).map((asset) => (
              <div key={asset.id} className="cine-assets-row">
                <span className="cine-assets-mini-tile" aria-hidden="true">{asset.name.charAt(0)}</span>
                <div>
                  <p className="cine-assets-row-title">{asset.name}</p>
                  <p className="cine-assets-row-meta">{asset.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <AssetsNavigation />
    </div>
  )
}

function WarrantyTransfer({ step }: { step: number }) {
  const active = step === 31
  const [flight, setFlight] = useState<CSSProperties>({ '--warranty-left': '0px', '--warranty-top': '0px', '--warranty-width': '0px', '--warranty-height': '0px', '--warranty-dx': '0px', '--warranty-dy': '0px', '--warranty-sx': '1', '--warranty-sy': '1' } as CSSProperties)
  const [measured, setMeasured] = useState(false)
  useLayoutEffect(() => {
    if (!active) { setMeasured(false); return }
    let frame = 0
    const measure = () => {
      const scene = document.querySelector<HTMLElement>('.cine-scene')
      const origin = document.querySelector<HTMLElement>(".cine-assets-surface [data-fact='warranty']")
      const destination = document.querySelector<HTMLElement>(".cine-cloud-surface [data-doc='garantia-ps5']")
      const sceneRect = scene?.getBoundingClientRect(), from = origin?.getBoundingClientRect(), to = destination?.getBoundingClientRect()
      if (!scene || !sceneRect?.width || !from?.width || !to?.width) { frame = requestAnimationFrame(measure); return }
      const sx = sceneRect.width / scene.offsetWidth, sy = sceneRect.height / scene.offsetHeight
      const left = (from.left - sceneRect.left) / sx, top = (from.top - sceneRect.top) / sy
      const endLeft = (to.left - sceneRect.left) / sx, endTop = (to.top - sceneRect.top) / sy
      setFlight({ '--warranty-left': `${left}px`, '--warranty-top': `${top}px`, '--warranty-width': `${from.width / sx}px`, '--warranty-height': `${from.height / sy}px`, '--warranty-dx': `${endLeft - left}px`, '--warranty-dy': `${endTop - top}px`, '--warranty-sx': `${to.width / from.width}`, '--warranty-sy': `${to.height / from.height}` } as CSSProperties)
      setMeasured(true)
    }
    frame = requestAnimationFrame(measure)
    return () => cancelAnimationFrame(frame)
  }, [active])
  return (
    <div className="cine-warranty-transfer" data-on={active && measured} aria-hidden="true" style={flight}>
      <span className="cine-cloud-doc-tile">PDF</span>
      <div><p className="cine-cloud-doc-title">{ps5Documents[0].title}</p><p className="cine-cloud-doc-meta">{ps5Documents[0].meta}</p></div>
    </div>
  )
}

function CloudSurface({ step, c43Active }: { step: number; c43Active: boolean }) {
  // C43 keeps the HomeCloud shell mounted so the same fullscreen photo can
  // darken across the slide boundary; the finale view hides every shell item.
  const active = step === 31 || step === 32 || step === 33 || step === 34
  const view = step >= 34 ? 'finale' : step >= 32 ? 'memories' : 'documents'
  return (
    <div className="cine-cloud-surface" data-on={active} data-view={view} data-photo-zoom={step === 33 ? 'true' : undefined} aria-hidden={!active} style={homeVariables}>
      <HomeHeader showJuli />
      <main className="cine-cloud-workspace">
        <header className="cine-module-heading"><h1>HomeCloud</h1></header>
        <div className="cine-cloud-tabs" role="tablist" aria-label="Secciones de HomeCloud">
          <span className="cine-cloud-tab" data-tab="documents" role="tab" aria-selected={step === 31}>Documentos</span>
          <span className="cine-cloud-tab" data-tab="memories" role="tab" aria-selected={step === 32 || step === 33}>Recuerdos</span>
        </div>
        <section className="cine-cloud-documents" aria-label="Documentos recientes">
          <div className="cine-cloud-recent-block">
            <h2 className="cine-cloud-label">Recientes</h2>
            <div className="cine-cloud-document-rows">
            {cloudDocuments.map((doc) => (
              <div key={doc.id} className="cine-cloud-doc" data-doc={doc.id} data-current={doc.id === 'garantia-ps5'}>
                <span className="cine-cloud-doc-tile" aria-hidden="true">PDF</span>
                <div>
                  <p className="cine-cloud-doc-title">{doc.title}</p>
                  <p className="cine-cloud-doc-meta">{doc.meta}</p>
                </div>
              </div>
            ))}
            </div>
          </div>
          <p className="cine-cloud-note">El mismo documento de la PlayStation 5, ahora en la nube.</p>
        </section>
        <section className="cine-cloud-memories" aria-label="Recuerdos">
          <div className="cine-memory-cards">
            {cloudMemories.map((memory) => (
              <article key={memory.id} className="cine-memory" data-memory={memory.id}>
                <div className="cine-memory-thumb" data-memory-photo={memory.id} aria-hidden="true">
                  {memory.id === 'cumple' && <img src={birthdayMemoryPhoto} alt="" draggable={false} />}
                  {memory.id === 'vacaciones' && <img src={vacationMemoryPhoto} alt="" draggable={false} />}
                </div>
                <p className="cine-memory-title">{memory.title}</p>
                <p className="cine-memory-date">{memory.date}</p>
              </article>
            ))}
          </div>
          <div className="cine-memory-voice"><span className="cine-memory-play" aria-hidden="true" /><div><p className="cine-memory-voice-title">{cloudVoiceNote.title}</p><p className="cine-memory-voice-meta">{cloudVoiceNote.meta}</p></div></div>
          <div className="cine-memory-album"><div><p className="cine-memory-album-title">{cloudAlbumsRow.title}</p><p className="cine-memory-album-meta">{cloudAlbumsRow.meta}</p></div></div>
        </section>
      </main>
      <HomeCloudNavigation />
      <MemoryPhotoJourney step={step} c43Active={c43Active} />
    </div>
  )
}

function MemoryPhotoJourney({ step, c43Active }: { step: number; c43Active: boolean }) {
  const active = step === 33 || step === 34
  const [ready, setReady] = useState(false)
  const [stage, setStage] = useState<'card' | 'fullscreen' | 'closing'>('card')
  const [origin, setOrigin] = useState<CSSProperties>({ '--memory-photo-left': '0px', '--memory-photo-top': '0px', '--memory-photo-width': '0px', '--memory-photo-height': '0px' } as CSSProperties)

  useLayoutEffect(() => {
    if (!active) { setReady(false); setStage('card'); return }
    let frame = 0
    const measure = () => {
      const cardPhoto = document.querySelector<HTMLElement>('.cine-cloud-surface .cine-memory-thumb[data-memory-photo="cumple"]')
      const rect = cardPhoto?.getBoundingClientRect()
      const stage = document.querySelector<HTMLElement>('.cine-scene')
      const stageRect = stage?.getBoundingClientRect()
      if (!rect?.width || !rect.height || !stage || !stageRect?.width || !stageRect.height) {
        frame = requestAnimationFrame(measure)
        return
      }
      const scaleX = stageRect.width / stage.offsetWidth
      const scaleY = stageRect.height / stage.offsetHeight
      setOrigin({
        '--memory-photo-left': `${(rect.left - stageRect.left) / scaleX}px`,
        '--memory-photo-top': `${(rect.top - stageRect.top) / scaleY}px`,
        '--memory-photo-width': `${rect.width / scaleX}px`,
        '--memory-photo-height': `${rect.height / scaleY}px`,
      } as CSSProperties)
      setReady(true)
    }
    frame = requestAnimationFrame(measure)
    return () => cancelAnimationFrame(frame)
  }, [active, step])

  useLayoutEffect(() => {
    if (step === 34) { setStage(c43Active ? 'closing' : 'fullscreen'); return }
    if (step !== 33 || !ready || stage === 'fullscreen') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setStage('fullscreen')
      return
    }
    setStage('card')
    const timer = window.setTimeout(() => setStage('fullscreen'), 1150)
    return () => window.clearTimeout(timer)
  }, [step, ready, c43Active, stage])

  return (
    <div className="cine-memory-photo-journey" data-on={active && ready} data-stage={stage} aria-hidden="true" style={origin}>
      <img className="cine-memory-photo-strip" src={birthdayMemoryPhoto} alt="" draggable={false} />
      <img className="cine-memory-photo-full" src={birthdayMemoryPhoto} alt="" draggable={false} />
    </div>
  )
}

const C43_LINE_SCALE = 0.43

/**
 * C43 — Continuidad de Colo.
 *
 * The two lines of the first phrase are the SAME two DOM nodes from state C
 * to state D: they never unmount, never duplicate and never change font. The
 * phase keyframes in `cine.css` move them from two stacked lines into one
 * small grey line, while the hero enters below. `--end-x` is measured from
 * the real rendered widths so the two segments meet around the centre without
 * colliding.
 */
function C43Surface({ active, beat, exit }: { active: boolean; beat: number; exit: boolean }) {
  const rootRef = useRef<HTMLDivElement>(null)
  const lineARef = useRef<HTMLSpanElement>(null)
  const lineBRef = useRef<HTMLSpanElement>(null)
  const [endX, setEndX] = useState({ a: 0, b: 0 })
  const prevBeat = useRef(beat)
  const [reverse, setReverse] = useState(false)

  const measure = useCallback(() => {
    const a = lineARef.current
    const b = lineBRef.current
    const root = rootRef.current
    if (!a || !b || !root) return
    const wA = a.offsetWidth
    const wB = b.offsetWidth
    if (!wA || !wB) return
    const gap = Math.max(10, root.offsetWidth * 0.009)
    setEndX({
      a: -((wB * C43_LINE_SCALE + gap) / 2),
      b: (wA * C43_LINE_SCALE + gap) / 2,
    })
  }, [])

  useLayoutEffect(() => {
    if (!active) return
    measure()
    if (document.fonts?.ready) void document.fonts.ready.then(measure)
    const onResize = () => measure()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [active, measure])

  // Direction is decided in a layout effect so the reverse keyframes apply
  // before the browser paints the D → C frame.
  useLayoutEffect(() => {
    setReverse(beat === 1 && prevBeat.current === 2)
    prevBeat.current = beat
  }, [beat])

  return (
    <div
      ref={rootRef}
      className="cine-c43"
      data-on={active}
      data-beat={beat}
      data-reverse={reverse ? 'true' : undefined}
      data-exit={exit ? 'true' : undefined}
      aria-hidden={!active}
    >
      <div className="cine-c43-veil" aria-hidden="true" />
      <div className="cine-c43-copy">
        <span
          ref={lineARef}
          className="cine-c43-line cine-c43-line-a"
          style={{ '--end-x': `${endX.a}px` } as CSSProperties}
        >
          La vida no pasa
        </span>{' '}
        <span
          ref={lineBRef}
          className="cine-c43-line cine-c43-line-b"
          style={{ '--end-x': `${endX.b}px` } as CSSProperties}
        >
          por módulos.
        </span>{' '}
        <p className="cine-c43-hero"><span>HomePlus</span>{' '}<span>los conecta.</span></p>
      </div>
    </div>
  )
}

function MemoriesSurface({ step }: { step: number }) {
  const active = step === 32
  return (
    <div className="cine-memories-surface" data-on={active} aria-hidden={!active} style={homeVariables}>
      <HomeHeader showJuli />
      <main className="cine-memories-workspace">
        <header className="cine-module-heading"><h1>Recuerdos</h1></header>
        <div className="cine-memories-photos">
          {cloudMemories.map((memory) => (
            <div key={memory.id} className="cine-memory" data-memory={memory.id}>
              <span className="cine-memory-thumb" aria-hidden="true" />
              <p className="cine-memory-title">{memory.title}</p>
              <p className="cine-memory-date">{memory.date}</p>
            </div>
          ))}
        </div>
        <div className="cine-memory-voice">
          <span className="cine-memory-play" aria-hidden="true" />
          <div>
            <p className="cine-memory-voice-title">{cloudVoiceNote.title}</p>
            <p className="cine-memory-voice-meta">{cloudVoiceNote.meta}</p>
          </div>
        </div>
        <div className="cine-memory-album">
          <div>
            <p className="cine-memory-album-title">{cloudAlbumsRow.title}</p>
            <p className="cine-memory-album-meta">{cloudAlbumsRow.meta}</p>
          </div>
        </div>
      </main>
      <HomeCloudNavigation />
    </div>
  )
}

const STACK_FRONT = [
  { name: 'React Native', role: 'Interfaz móvil' },
  { name: 'Expo', role: 'Build y preview' },
]

const STACK_BACK = [
  { name: 'Node.js', role: 'API y lógica' },
  { name: 'Supabase', role: 'Auth y datos' },
  { name: 'PostgreSQL', role: 'Base de datos' },
]

function StackSurface({ step }: { step: number }) {
  const active = step === 35
  return (
    <div className="cine-stack-surface" data-on={active} aria-hidden={!active} style={homeVariables}>
      <HomeHeader showJuli />
      <main className="cine-stack-workspace">
        <section className="cine-stack-panel" aria-label="Frontend">
          <h1>Frontend</h1>
          <p className="cine-stack-desc">La app que usás</p>
          <ul className="cine-stack-tech">
            {STACK_FRONT.map((tech) => (
              <li key={tech.name}><span>{tech.name}</span><em>{tech.role}</em></li>
            ))}
          </ul>
        </section>
        <div className="cine-stack-center" aria-hidden="true">
          <p><span>Figma</span><em>Diseño</em></p>
          <p><span>IA</span></p>
        </div>
        <section className="cine-stack-panel" aria-label="Backend">
          <h1>Backend</h1>
          <p className="cine-stack-desc">Datos y servicios</p>
          <ul className="cine-stack-tech">
            {STACK_BACK.map((tech) => (
              <li key={tech.name}><span>{tech.name}</span><em>{tech.role}</em></li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  )
}

const BARRIER_ROUTES = [
  { id: 'tareas', nodes: ['Home', 'Planner', 'Tareas', '+'] },
  { id: 'documentos', nodes: ['Home', 'Assets', 'PlayStation 5', 'Documentos'] },
]

function BarrierSurface({ step }: { step: number }) {
  const active = step === 36
  return (
    <div className="cine-barrier-surface" data-on={active} aria-hidden={!active} style={homeVariables}>
      <HomeHeader showJuli />
      <main className="cine-barrier-workspace">
        <div className="cine-barrier-routes">
          {BARRIER_ROUTES.map((route, index) => (
            <div key={route.id} className="cine-barrier-route" style={{ transitionDelay: `${index * 150}ms` }}>
              {route.nodes.map((node, i) => (
                <span key={node} className="cine-barrier-step">
                  {i > 0 && <span className="cine-barrier-arrow" aria-hidden="true">→</span>}
                  <span className={node === '+' ? 'cine-barrier-node cine-barrier-action' : 'cine-barrier-node'}>{node}</span>
                </span>
              ))}
            </div>
          ))}
        </div>
        <p className="cine-barrier-question">
          <span>¿Y si ni siquiera</span>
          <span className="cine-barrier-quiet">tuviéramos que saber cómo?</span>
        </p>
      </main>
    </div>
  )
}

const CLOSING_TEAM = [
  { name: 'Bernardo Gimenez', initials: 'BG' },
  { name: 'Benjamin Duarte', initials: 'BD' },
  { name: 'Gabriel Bazan', initials: 'GB' },
  { name: 'Maximo Echezarreta', initials: 'ME' },
]

function ClosingSurface({ step }: { step: number }) {
  const active = step === 37
  return (
    <div className="cine-closing-surface" data-on={active} aria-hidden={!active} style={homeVariables}>
      <main className="cine-closing-workspace">
        <div className="cine-closing-brand">
          <HomePlusLogo size={120} />
          <p className="cine-closing-wordmark">HomePlus</p>
        </div>
        <div className="cine-closing-team">
          {CLOSING_TEAM.map((member, index) => (
            <div key={member.name} className="cine-closing-member" style={{ transitionDelay: `${index * 90}ms` }}>
              <span className="cine-closing-avatar" aria-hidden="true">{member.initials}</span>
              <p className="cine-closing-name">{member.name}</p>
            </div>
          ))}
        </div>
        <p className="cine-closing-thanks">Muchas gracias.</p>
      </main>
    </div>
  )
}

/**
 * The S04 Home surface. Real app anatomy at the 16:9 scale: top bar, greeting,
 * section headings, the section cards and the bottom navigation. Juli's three
 * needs are NOT here — they live in the travelers and arrive in beats 3-5.
 */
function HomeSurface({ beat, outro = false, handoff = null }: { beat: number; outro?: boolean; handoff?: CineHandoff }) {
  const cardH = HOME_CARD_H[beat] ?? 0
  const mananaH = HOME_MANANA_CARD_H[beat] ?? 0
  return (
    <div className="cine-home-surface" data-home-beat={beat} data-outro={outro ? 'true' : 'false'} data-p01-handoff={handoff ?? undefined} style={homeVariables} aria-hidden={beat === 0}>
      <div className="cine-home-topbar" data-on={beat >= 2}>
        <span className="cine-home-user">Juli</span>
        <span className="cine-home-household">Familia García<HomeIcon name="down" size={18} /></span>
        <span className="cine-home-action" role="img" aria-label="Buscar"><HomeIcon name="search" size={26} /></span>
        <span className="cine-home-action" role="img" aria-label="Avisos"><HomeIcon name="bell" size={26} /></span>
      </div>
      <div className="cine-home-greeting" data-on={beat >= 2}>
        <div className="cine-home-greeting-row">
          <h1>Hola, Juli</h1>
          <span className="cine-home-age">10 años</span>
        </div>
        <p>{D0_LABEL}</p>
      </div>
      <div className="cine-home-figure" data-on={beat === 1}>
        <p className="cine-home-figure-name">Juli</p>
        <p className="cine-home-figure-age">10 años</p>
      </div>
      <h2 className="cine-home-heading" data-variant="attention">NECESITA ATENCIÓN</h2>
      <h2 className="cine-home-heading" data-variant="hoy">HOY</h2>
      <h2 className="cine-home-heading" data-variant="manana">MAÑANA</h2>
      <div className="cine-home-card" data-variant="hoy" style={{ height: cardH }}>
        {cardH > HOME_ROW_H && <span className="cine-home-divider" style={{ top: HOME_ROW_H }} />}
        {cardH > HOME_ROW_H * 2 && <span className="cine-home-divider" style={{ top: HOME_ROW_H * 2 }} />}
      </div>
      <div className="cine-home-card" data-variant="manana" style={{ height: mananaH }} />
      <div className="cine-home-nav" data-on={beat >= 2}>
        <HomeNavigation />
      </div>
    </div>
  )
}

export default function CineScene({ step, beat = null, s08Beat = null, s09Beat = null, c43Beat = null, c43Exit = false, cineHandoff = null, familyHandoff = null }: { step: number; beat?: number | null; s08Beat?: number | null; s09Beat?: number | null; c43Beat?: number | null; c43Exit?: boolean; cineHandoff?: CineHandoff; familyHandoff?: FamilyHandoff }) {
  const home = step >= 8
  const homeBeat = beat
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return (
    <>
      {step <= 2 && (
        <div
          className="cine-zoom"
          style={{ transform: `scale(${ZOOM_SCALE[step]})` }}
          aria-hidden="true"
        >
          <HomePlusLogo size={440} />
        </div>
      )}
      <div className="cine-logo-glow" data-on={step === 0} aria-hidden="true" />

      <PlannerSurface step={step} handoff={cineHandoff} familyHandoff={familyHandoff} />
      <FamilyStory step={step} familyHandoff={familyHandoff} />
      <BirthdayPlanNode step={step} familyHandoff={familyHandoff} />
      <BirthdayBridge step={step} beat={s08Beat ?? 0} />
      <InventoryStory step={step} beat={s08Beat ?? -1} />
      <ShoppingAnchor step={step} enabled={s08Beat === null} />
      <InventorySurface step={step} enabled={s08Beat === null} />
      <FinanceStory step={step} beat={s09Beat ?? 0} />
      <FinanceSurface step={step} enabled={s09Beat === null} />
      <AssetsSurface step={step} />
      <WarrantyTransfer step={step} />
      <CloudSurface step={step} c43Active={c43Beat !== null} />
      <C43Surface active={step === 34 && c43Beat !== null} beat={c43Beat ?? 0} exit={c43Exit} />
      <StackSurface step={step} />
      <BarrierSurface step={step} />
      <ClosingSurface step={step} />

      {homeBeat !== null && <HomeSurface beat={homeBeat} handoff={cineHandoff} />}
      {homeBeat === null && step === 11 && cineHandoff === 'home-to-planner' && (
        <HomeSurface beat={6} outro handoff={cineHandoff} />
      )}

      {TRAVELERS.map((t) => {
        const legacy = t.at[step] ?? HIDDEN
        // During the Home block the local beat axis owns the placement: the
        // global step is pinned so S05-S13 keep their numbering.
        const p01JuliShell = t.id === 'juli' && step === 11 && cineHandoff === 'home-to-planner'
        const hs = homeBeat === null
          ? p01JuliShell ? homeSlot('juli', 6) : null
          : homeSlot(t.id, homeBeat)
        const p = hs ?? legacy
        const taskFocus = t.id === 'task' && step === 10
        const taskPlanner = t.id === 'task' && step >= 11 && step <= 12
        const plannerRow = taskPlanner || (t.id === 'auth' && step >= 12 && step <= 13) || (t.id === 'ef' && step >= 13 && step <= 15)
        const p01MathTravel = t.id === 'task' && (
          (step === 11 && cineHandoff === 'home-to-planner') ||
          (homeBeat === 6 && cineHandoff === 'planner-to-home')
        )
        const p01SecondaryExit = step === 11 && cineHandoff === 'home-to-planner' && t.id !== 'task'
        const p02EventTravel = t.id === 'ef' && step === 14
        const p02EventExit = t.id === 'ef' && step === 15
        const width = hs ? hs.w
          : step === 10 && t.spotlightW ? t.spotlightW
          : step === 11 && t.plannerW ? t.plannerW
            : step === 12 && t.p03W ? t.p03W
                : step === 13 && t.p04W ? t.p04W
                  : step === 14 && t.p05W ? t.p05W
                    : step === 15 && t.p06W ? t.p06W
                      : home && t.homeW ? t.homeW : t.w
        const height = hs ? hs.h
          : step === 10 && t.spotlightH ? t.spotlightH
          : step === 11 && t.plannerH ? t.plannerH
            : step === 12 && t.p03H ? t.p03H
                : step === 13 && t.p04H ? t.p04H
                  : step === 14 && t.p05H ? t.p05H
                    : step === 15 && t.p06H ? t.p06H
                      : home && t.homeH ? t.homeH : t.h
        const style: CSSProperties = {
          width,
          height,
          transform: `translate(${p.x}px, ${p.y}px) scale(${p.s})`,
          transitionDelay: reducedMotion
            ? '0ms'
            : p01SecondaryExit
              ? undefined
              : p01MathTravel
                ? '160ms'
                : p02EventTravel
                  ? '160ms'
                  : p02EventExit
                    ? undefined
                    : hs
                      ? homeDelay(t.id, homeBeat!)
                      : step === 12 && t.id === 'auth' ? '900ms' : `${t.delay}ms`,
        }
        return (
          <div key={t.id} className="cine-traveler" data-present={p.o === 1} data-node={t.id} data-focus={taskFocus} data-planner={plannerRow} style={style}>
            {t.renderBody ? t.renderBody(step, homeBeat, cineHandoff) : t.body}
          </div>
        )
      })}

      <Chrome show={homeBeat === null && step >= 8 && step <= 10} className="cine-home-header" delay={520}><HomeHeaderCopy /></Chrome>
      <Chrome show={homeBeat === null && step >= 8 && step <= 10} className="cine-pill" delay={620}><span className="cine-pill-count">2</span><span>tareas pendientes</span></Chrome>
      <Chrome show={homeBeat === null && step >= 8 && step <= 10} className="cine-label cine-label-hoy" delay={620}>Hoy</Chrome>
      <Chrome show={homeBeat === null && step >= 8 && step <= 10} className="cine-label cine-label-prox" delay={620}>Mañana</Chrome>
      <Chrome show={homeBeat === null && step >= 8 && step <= 10} className="cine-strip" delay={820}>
        <div className="cine-strip-week">
        <p className="cine-strip-month">Agosto</p>
        <div className="cine-strip-days">
          {WEEK.map(([d, n, today]) => (
            <span key={d} className="cine-strip-day" data-today={today}>
              <span>{d}</span>
              <strong>{n}</strong>
            </span>
          ))}
        </div>
        </div>
      </Chrome>
      <Chrome show={homeBeat === null && step >= 8 && step <= 10} className="cine-nav" delay={1000}>
        {NAV_ICONS.map((name, i) => (
          <span key={name} className={`cine-nav-item${i === 0 ? ' cine-nav-active' : ''}`}>
            <HomeIcon name={name} size={25} />
          </span>
        ))}
      </Chrome>
    </>
  )
}
