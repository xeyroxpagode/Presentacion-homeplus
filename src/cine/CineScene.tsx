import C43Surface from './C43Surface'
import FinanceAppBeats from './FinanceAppBeats'
import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
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
import InventoryDemoScreen from '../presentation/app-screens/InventoryDemoScreen'
import InventoryNavigation from '../presentation/app-screens/InventoryDemoScreen/InventoryNavigation'
import { shoppingSummary } from '../presentation/app-screens/InventoryDemoScreen/inventoryData'
import mapArtwork from '../presentation/assets/illustrations/family-neighborhood-map.svg'
import ps5Console from '../../assets/ps5-transparent.png'
import birthdayMemoryPhoto from '../presentation/assets/illustrations/homecloud-birthday-memory-family.jpg'
import vacationMemoryPhoto from '../presentation/assets/illustrations/homecloud-vacation-memory.jpg'
import FinanceNavigation from '../presentation/app-screens/FinanceDemoScreen/FinanceNavigation'
import AssetsNavigation from '../presentation/app-screens/AssetsDemoScreen/AssetsNavigation'
import HomeCloudNavigation from '../presentation/app-screens/HomeCloudDemoScreen/HomeCloudNavigation'
import { financeCategories, financeHero, financePayments, financeTabs } from '../presentation/app-screens/FinanceDemoScreen/financeData'
import { financeStory } from '../presentation/app-screens/FinanceDemoScreen/financeStoryData'
import { homeAssets, ps5Documents, ps5Invoice, ps5Warranty } from '../presentation/app-screens/AssetsDemoScreen/assetsData'
import { cloudAlbumsRow, cloudDocuments, cloudMemories, cloudVoiceNote } from '../presentation/app-screens/HomeCloudDemoScreen/homecloudData'
import birthdayCakeArtwork from '../presentation/assets/illustrations/homeplus-birthday-cake-2d.svg'
import giftBoxArtwork from '../presentation/assets/illustrations/homeplus-gift-box-2d.svg'
import giftBowArtwork from '../presentation/assets/illustrations/homeplus-gift-bow-2d.svg'
import candlesArtwork from '../presentation/assets/illustrations/homeplus-candles-2d.svg'
import drinksArtwork from '../presentation/assets/illustrations/homeplus-drinks-2d.svg'
import milkArtwork from '../presentation/assets/illustrations/inventory-milk.png'
import coffeeArtwork from '../presentation/assets/illustrations/inventory-coffee.png'
import breadArtwork from '../presentation/assets/illustrations/inventory-bread.png'
import detergentArtwork from '../presentation/assets/illustrations/inventory-detergent.png'
import paperArtwork from '../presentation/assets/illustrations/inventory-paper.svg'
import napkinsArtwork from '../presentation/assets/illustrations/homeplus-napkins-2d.svg'
import { D0_LABEL } from '../presentation/slides/homi-cinema-v8/homiV8Data'
import type { CineHandoff, FamilyHandoff } from '../presentation/presentationTypes'
import '../presentation/app-screens/HomeDemoScreen/home-screen.css'
import '../presentation/app-screens/PlannerDemoScreen/planner-screen.css'
import '../presentation/app-screens/FamilyDemoScreen/family-screen.css'
import './family-v3.css'
import './s08-v3.css'
import './s10-v21.css'

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
  /** `beat` is the S04 visual beat index (null outside the Home block). */
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
// S04 HOME — 4 manual beats with an internal 7-state visual build.
// Errata: audit/11_S04_SURFACE_ERRATA.md §2-§3.
//
// Manual 0 blanco · 1 Juli · 2 Home completo · 3 puente a Planner.
// `CineRun` replays the approved construction inside manual beat 2:
//
//  2 shell    the app shell, navigation and sections arrive; Juli takes the
//             account slot. Juli's three needs are NOT on screen yet
//  3/4/5     Educación Física, autorización and Matemática each arrive in
//             their own internal state, as real rows inside the attention card
//  6         the three needs integrate into HOY (2 tasks) and MAÑANA (1
//             event). The Home ends complete, balanced and fully legible —
//             nothing stays permanently dimmed
//
// Those internal states are not manual advances: one press from Juli runs the
// whole build. Geometry lives in the 1280×720 master. The three needs are the
// existing travelers, so they keep their identity into the Planner morph (S05).
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
const PAPA_CHAT_MESSAGE = 'Yo te paso a buscar a la salida.'

type FamilyChatPhase = 'idle' | 'typing-tomi' | 'sending-tomi' | 'tomi-sent' | 'reply-waiting' | 'reply-typing' | 'complete'
type FamilyChatState = { phase: FamilyChatPhase; tomi: number; papa: number }

/**
 * Ported one-to-one from the approved V3 preview:
 *   620ms hold → type Tomi at 18ms/char → 280ms send → 340ms hold →
 *   680ms Papa typing dots → type Papa at 23ms/char → settled.
 * The timers are owned by this effect, so a fast advance cancels them and F06
 * always receives the settled conversation instead of a truncated one.
 */
function useFamilyChat(phase: number, snap: boolean): FamilyChatState {
  const [chat, setChat] = useState<FamilyChatState>({ phase: 'idle', tomi: 0, papa: 0 })
  const previousPhase = useRef(phase)

  useEffect(() => {
    const from = previousPhase.current
    previousPhase.current = phase
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const timers: number[] = []
    const intervals: number[] = []
    const after = (callback: () => void, delay: number) => {
      timers.push(window.setTimeout(callback, delay))
    }
    const type = (text: string, key: 'tomi' | 'papa', done: () => void, speed: number) => {
      let count = 0
      const interval = window.setInterval(() => {
        count += 1
        setChat((current) => ({ ...current, [key]: count }))
        if (count >= text.length) {
          window.clearInterval(interval)
          const index = intervals.indexOf(interval)
          if (index >= 0) intervals.splice(index, 1)
          done()
        }
      }, speed)
      intervals.push(interval)
    }
    const complete = () => setChat({
      phase: 'complete',
      tomi: TOMI_CHAT_MESSAGE.length,
      papa: PAPA_CHAT_MESSAGE.length,
    })

    if (phase < 4) {
      setChat({ phase: 'idle', tomi: 0, papa: 0 })
    } else if (phase >= 5 || snap || reduced || from >= phase) {
      // F06, a direct dev link, reduced motion or a reverse approach all land
      // on the finished conversation; no half-typed bubble is ever shown.
      complete()
    } else {
      setChat({ phase: 'typing-tomi', tomi: 0, papa: 0 })
      after(() => {
        type(TOMI_CHAT_MESSAGE, 'tomi', () => {
          setChat((current) => ({ ...current, phase: 'sending-tomi' }))
          after(() => {
            setChat((current) => ({ ...current, phase: 'tomi-sent' }))
            after(() => {
              setChat((current) => ({ ...current, phase: 'reply-waiting' }))
              after(() => {
                setChat((current) => ({ ...current, phase: 'reply-typing', papa: 0 }))
                type(PAPA_CHAT_MESSAGE, 'papa', complete, 23)
              }, 680)
            }, 340)
          }, 280)
        }, 18)
      }, 620)
    }

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer))
      intervals.forEach((timer) => window.clearInterval(timer))
    }
  }, [phase, snap])

  return chat
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

/**
 * V3 birthday → plans → inventory → shopping sequence.
 * A single cake node is repositioned between the birthday and plan cards;
 * the two shortage illustrations are likewise shared between inventory and
 * list positions. The local beat axis is owned by S08 and never auto-advances.
 */
const inventoryProducts = [
  { id: 'drinks', label: 'Bebidas', place: 'Heladera', quantity: '6 u', status: 'Disponible', tone: 'ok', image: drinksArtwork },
  { id: 'napkins', label: 'Servilletas', place: 'Cocina', quantity: '4 u', status: 'Stock bajo', tone: 'low', image: napkinsArtwork, buy: '1 paquete' },
  { id: 'candles', label: 'Velas', place: 'Cocina', quantity: '0 u', status: 'Sin stock', tone: 'empty', image: candlesArtwork, buy: '1 paquete' },
  { id: 'milk', label: 'Leche', place: 'Heladera', quantity: '2 L', status: 'Stock bajo', tone: 'low', image: milkArtwork, buy: '3 L' },
  { id: 'coffee', label: 'Café', place: 'Alacena', quantity: '0 g', status: 'Sin stock', tone: 'empty', image: coffeeArtwork, buy: '200 g' },
  { id: 'rice', label: 'Arroz', place: 'Alacena', quantity: '1.500 g', status: 'Disponible', tone: 'ok' },
  { id: 'paper', label: 'Papel higiénico', place: 'Baño', quantity: '4 u', status: 'Stock bajo', tone: 'low', buy: '2 u', image: paperArtwork },
  { id: 'detergent', label: 'Detergente', place: 'Cocina', quantity: '3 u', status: 'Disponible', tone: 'ok', image: detergentArtwork },
] as const
const shoppingProducts = [
  ...inventoryProducts.filter(item => 'buy' in item),
  { id: 'bread', label: 'Pan', buy: '1 u', status: 'Agregado manualmente', tone: 'manual', image: breadArtwork },
] as const

function InventoryProductArt({ image }: { image?: string }) {
  return image ? <img src={image} alt="" draggable={false} /> : (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" aria-hidden="true">
      <path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Zm0 9 8-4.5M12 12 4 7.5m8 4.5v9" />
    </svg>
  )
}

function BirthdayPlansV3({ beat, financeEntry = false, bridgePlaying = false }: { beat: number | null; financeEntry?: boolean; bridgePlaying?: boolean }) {
  const active = beat !== null || financeEntry
  // Keep the same mounted S08 list node at S09.0; the parent only changes its
  // layout mode. A direct S09.0 entry starts in the destination geometry.
  const [trackedBeat, setTrackedBeat] = useState(beat)
  const [openingInventory, setOpeningInventory] = useState(false)
  if (trackedBeat !== beat) {
    setTrackedBeat(beat)
    setOpeningInventory(trackedBeat === 3 && beat === 4 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }
  useEffect(() => {
    if (!openingInventory) return
    const timer = window.setTimeout(() => setOpeningInventory(false), 740)
    return () => window.clearTimeout(timer)
  }, [openingInventory])
  const state = beat === null ? (financeEntry ? 4 : 5) : openingInventory ? 2 : [0, 1, 2, 2, 3, 3, 4][beat]
  const stockFocus = beat === 5
  const stockFlightLayer = useRef<HTMLDivElement>(null)
  const previousStockBeat = useRef(beat)
  const birthdayArtOrigins = useRef(new Map<string, Keyframe>())

  useLayoutEffect(() => {
    const previous = previousStockBeat.current
    previousStockBeat.current = beat
    const layer = stockFlightLayer.current
    const story = layer?.parentElement
    if (!story || !layer ||
        window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const bounds = layer.getBoundingClientRect()
    if (!bounds.width || !bounds.height) return
    const scaleX = layer.clientWidth / bounds.width
    const scaleY = layer.clientHeight / bounds.height
    const position = (element: Element) => {
      const rect = element.getBoundingClientRect()
      return {
        left: `${(rect.left - bounds.left) * scaleX}px`,
        top: `${(rect.top - bounds.top) * scaleY}px`,
        width: `${rect.width * scaleX}px`,
        height: `${rect.height * scaleY}px`,
      }
    }

    const birthdayItems = ['napkins', 'candles']
    if (beat === 6) {
      birthdayArtOrigins.current.clear()
      for (const id of birthdayItems) {
        const row = story.querySelector(`.s08-v3-list [data-stock-art="${id}"]`)?.parentElement
        if (row) birthdayArtOrigins.current.set(id, position(row))
      }
      const panel = story.querySelector('.s08-v3-list')
      if (panel) birthdayArtOrigins.current.set('panel', position(panel))
    }
    const toFinance = previous === 6 && financeEntry
    if (!(previous === 5 && beat === 6) && !toFinance) return
    const items = toFinance ? birthdayItems : shoppingProducts.map(item => item.id)
    const cleanups = items.flatMap((id, index) => {
      const source = story.querySelector(`.s08-stock-focus [data-stock-art="${id}"]`) ??
        story.querySelector(`.s08-v3-inventory [data-stock-art="${id}"]`)
      const targetArt = story.querySelector(`.s08-v3-list [data-stock-art="${id}"]`)
      const target = toFinance ? targetArt?.parentElement : targetArt
      const origin = toFinance ? birthdayArtOrigins.current.get(id) : source && position(source)
      if (!origin || !target) return []

      const traveler = target.cloneNode(true) as HTMLElement
      if (toFinance) traveler.classList.add('s08-finance-row-flight')
      layer.append(traveler)
      const delay = 65 * index
      const duration = toFinance ? 850 : 670
      const flight = traveler.animate([origin, position(target)], {
        delay, duration, easing: 'cubic-bezier(.22,1,.36,1)', fill: 'both',
      })
      const conceal = target.animate([{ opacity: 0 }, { opacity: 0 }], { duration: delay + duration })
      flight.onfinish = () => traveler.remove()
      return [() => {
        flight.cancel()
        conceal.cancel()
        traveler.remove()
      }]
    })
    if (toFinance) {
      const panel = story.querySelector<HTMLElement>('.s08-v3-list')
      const origin = birthdayArtOrigins.current.get('panel')
      if (panel && origin) {
        const shell = document.createElement('div')
        shell.className = 's08-finance-panel-flight'
        layer.prepend(shell)
        const shrink = shell.animate([origin, position(panel)], {
          duration: 850, easing: 'cubic-bezier(.22,1,.36,1)', fill: 'both',
        })
        panel.dataset.panelFlight = 'true'
        const restore = () => {
          shell.remove()
          delete panel.dataset.panelFlight
        }
        shrink.onfinish = restore
        cleanups.push(() => { shrink.cancel(); restore() })
      }
    }
    return () => cleanups.forEach(cleanup => cleanup())
  }, [beat, financeEntry])

  return (
    <section className="s08-v3-story" data-on={active} data-state={state} data-finance-bridge={financeEntry || undefined} data-bridge-playing={bridgePlaying || undefined} aria-hidden={!active} style={homeVariables}>
      <HomeHeader showJuli />
      <h1 className="s08-v3-title" data-inventory-title={state >= 3 || state === 5}>
        {state >= 3 ? 'Inventario' : 'Planner'}
      </h1>
      <div className="s08-v3-planner-tabs" aria-hidden={state !== 2}>
        <span>Tareas</span><span>Calendario</span><span aria-current="true">Planes</span>
      </div>

      <section className="s08-v3-editorial" aria-label="Organizar una casa no es solo resolver lo que pasa hoy">
        <p>ORGANIZACIÓN DEL HOGAR</p>
        <h2>Organizar una casa<br />no es solo resolver<br /><em>lo que pasa hoy.</em></h2>
        <span />
      </section>

      <article className="s08-v3-event">
        <div className="s08-v3-event-copy">
          <p>EVENTO FAMILIAR</p><h2>Cumpleaños</h2><span>Sábado</span><small>Un momento para compartir.</small>
        </div>
      </article>

      <article className="s08-v3-plan">
        <header className="s08-v3-plan-heading">
          <div><h2>{birthdayPlan.title}</h2><p>Sábado 22 de agosto</p></div>
        </header>
        <p className="s08-v3-plan-label">PREPARATIVOS</p>
        <div className="s08-v3-plan-task" data-task="share"><span className="s08-v3-task-done" aria-hidden="true">✓</span><HomeIcon name="family" size={22}/><span>Confirmar invitados<small>Mamá</small></span></div>
        <div className="s08-v3-plan-task" data-task="prepare"><span className="s08-v3-empty"/><HomeIcon name="calendar" size={22}/><span>Preparar la mesa<small>Juli y Tomi</small></span></div>
      </article>
      <aside className="s08-v3-plan-summary" aria-hidden={state !== 2}>
        <h3>Avance del plan</h3>
        <progress aria-label="Pasos completados" value={1} max={3} />
        <p>Un paso listo, dos por hacer</p>
        <div><strong>Evento vinculado</strong><small>Cumpleaños · Sábado 22 de agosto</small></div>
      </aside>
      <div className="s08-v3-plan-task s08-v3-buy" data-task="buy"><span className="s08-v3-empty"/><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="9" cy="20" r="1.2"/><circle cx="18" cy="20" r="1.2"/><path d="M2 4h3l2.4 11h11l2-7H6"/></svg><span>Comprar lo que falta<small>Papá</small></span><b>›</b></div>

      {(state === 3 || state === 4) && !financeEntry && <div className="s08-stock-tabs">
        <span aria-current={state === 3 ? 'true' : undefined}>Productos</span>
        <span aria-current={state === 4 ? 'true' : undefined}>Lista de compras</span>
        <strong>{state === 4 ? `${shoppingProducts.length} pendientes` : 'Familia García'}</strong>
      </div>}

      <section className="s08-v3-inventory" aria-label="Inventario de la familia" aria-hidden={state !== 3 || stockFocus}>
        {inventoryProducts.map(item => (
          <div className="s08-stock-row" key={item.id}>
            <span className="s08-stock-art" data-stock-art={item.id}><InventoryProductArt image={'image' in item ? item.image : undefined} /></span>
            <div><strong>{item.label}</strong><small>{item.place}</small></div>
            <strong className="s08-stock-quantity">{item.quantity}</strong>
            <span className="s08-stock-status" data-tone={item.tone}>{item.status}</span>
          </div>
        ))}
      </section>
      {(stockFocus || beat === 6) && <section className="s08-stock-focus" aria-hidden={!stockFocus} aria-label="Estados de stock">
        <div className="s08-stock-focus-content">
          <h2>¿Qué hay en casa?</h2>
          <div className="s08-stock-cards">
            {inventoryProducts.filter(item => ['drinks', 'milk', 'coffee'].includes(item.id)).map(item => (
              <article key={item.id}>
                <span className="s08-stock-art" data-stock-art={item.id}><InventoryProductArt image={'image' in item ? item.image : undefined} /></span>
                <h3>{item.label}</h3>
                <strong className="s08-stock-quantity">{item.quantity}</strong>
                <span className="s08-stock-status" data-tone={item.tone}>{item.status}</span>
              </article>
            ))}
          </div>
        </div>
      </section>}

      <article className="s08-v3-list">
        <p className="s08-v3-eyebrow">{financeEntry ? 'FALTANTES DEL CUMPLEAÑOS' : 'FAMILIA GARCÍA'}</p>
        <h2><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 6h13M8 12h13M8 18h13"/><circle cx="3.5" cy="6" r="1"/><circle cx="3.5" cy="12" r="1"/><circle cx="3.5" cy="18" r="1"/></svg>Lista de compras</h2>
        {shoppingProducts.map(item => (
          <div className="s08-v3-list-row" data-birthday={item.id === 'napkins' || item.id === 'candles'} key={item.id}>
            <span className="s08-v3-empty" aria-hidden="true" />
            <span className="s08-stock-art" data-stock-art={item.id}><InventoryProductArt image={'image' in item ? item.image : undefined} /></span>
            <div><strong>{item.label}</strong><small>{item.buy}</small></div>
            <span className="s08-stock-status" data-tone={item.tone}>{item.status}</span>
          </div>
        ))}
        <p className="s08-v3-list-foot">Los faltantes se suman desde Inventario.</p>
      </article>
      <div ref={stockFlightLayer} className="s08-stock-flight" aria-hidden="true" />
      {(beat === 3 || openingInventory) && (
        <div className="s08-v3-question" data-opening={openingInventory}>
          <h2>¿Qué falta en casa?</h2>
        </div>
      )}

      <img className="s08-v3-cake" src={birthdayCakeArtwork} alt="Torta de cumpleaños" draggable={false}/>
      <div className="s08-v3-nav s08-v3-nav-planner" aria-hidden={state === 0}>
        <PlannerNavigation />
      </div>
      <div className="s08-v3-nav s08-v3-nav-inventory" aria-hidden={state < 3 || state === 5}>
        <InventoryNavigation />
      </div>
    </section>
  )
}

function FinanceStory({ step, beat, onAdvance, sharedShoppingList = false, bridgePlaying = false }: { step: number; beat: number; onAdvance?: () => void; sharedShoppingList?: boolean; bridgePlaying?: boolean }) {
  const active = step >= 27 && step <= 28
  const storyRef = useRef<HTMLElement | null>(null)
  const previousCard = useRef<{ beat: number; rect: DOMRect } | null>(null)

  useLayoutEffect(() => {
    const story = storyRef.current
    const previous = previousCard.current
    previousCard.current = null
    if (!active || !story || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const selector = beat === 0 ? '.cine-fin-shared-ledger' : '.s09-app-card'
    const card = story.querySelector<HTMLElement>(selector)
    if (!card) return

    const rect = card.getBoundingClientRect()
    previousCard.current = { beat, rect }
    const fromReceipt = previous?.beat === 0 && beat === 1
    const fromLimit = previous?.beat === 4 && beat === 5
    if (!previous || (!fromReceipt && !fromLimit) || !rect.width || !rect.height) return
    const scale = story.getBoundingClientRect().width / story.offsetWidth || 1
    const x = (previous.rect.left - rect.left) / scale
    const y = (previous.rect.top - rect.top) / scale
    const duration = fromReceipt ? 780 : 570
    const morph = card.animate([
      { transformOrigin: 'top left', transform: `translate(${x}px, ${y}px) scale(${previous.rect.width / rect.width}, ${previous.rect.height / rect.height})` },
      { transformOrigin: 'top left', transform: 'none' },
    ], { duration, easing: 'cubic-bezier(.22,1,.36,1)' })
    const reveal = Array.from(card.children, child => child.animate(
      [{ opacity: 0.15, transform: 'translateY(7px)' }, { opacity: 1, transform: 'none' }],
      { delay: duration * .22, duration: duration * .65, fill: 'backwards', easing: 'ease-out' },
    ))
    if (fromReceipt) {
      const chrome = story.querySelectorAll('.home-top-bar, .s09-app > header, .s09-app-tabs, .s09-app-tools, .s09-app-note')
      chrome.forEach((element, index) => reveal.push(element.animate(
        [{ opacity: 0, transform: 'translateY(6px)' }, { opacity: 1, transform: 'none' }],
        { delay: 70 + index * 85, duration: 330, fill: 'backwards', easing: 'ease-out' },
      )))
    }
    return () => {
      morph.cancel()
      reveal.forEach(animation => animation.cancel())
    }
  }, [active, beat])

  useEffect(() => {
    if (beat !== 0 || !bridgePlaying || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const story = storyRef.current
    if (!story) return
    let timer = 0
    let animation: Animation | null = null
    let source: HTMLElement | null = null
    let target: HTMLElement | null = null
    let traveler: HTMLElement | null = null
    const startFlight = () => {
      const total = story.querySelector<HTMLElement>('.cine-fin-ticket-total strong')
      const amount = story.querySelector<HTMLElement>('.cine-fin-move-amount')
      if (!total || !amount) return
      const rootRect = story.getBoundingClientRect()
      // The presentation canvas is scaled to the viewport; Web Animations
      // transforms are in local CSS pixels, so convert measured screen pixels
      // back into the CineScene coordinate space (notably at 1600×900).
      const scale = rootRect.width / story.offsetWidth || 1
      const from = total.getBoundingClientRect()
      const to = amount.getBoundingClientRect()
      source = total
      target = amount
      total.classList.add('is-flight-origin')
      amount.classList.remove('show')
      const flight = document.createElement('span')
      flight.className = 'cine-fin-amount-flight'
      flight.textContent = financeStory.purchase.totalLabel
      Object.assign(flight.style, {
        left: `${(from.left - rootRect.left) / scale}px`,
        top: `${(from.top - rootRect.top) / scale}px`,
        width: `${from.width / scale}px`,
        height: `${from.height / scale}px`,
      })
      story.appendChild(flight)
      traveler = flight
      const dx = (to.left - from.left) / scale
      const dy = (to.top - from.top) / scale
      animation = flight.animate([
        { transform: 'translate(0, 0) scale(1)', opacity: 1, offset: 0 },
        { transform: `translate(${dx * 0.65}px, ${dy * 0.75 - 16}px) scale(.83)`, opacity: 1, offset: 0.65 },
        { transform: `translate(${dx}px, ${dy}px) scale(.7)`, opacity: 0.08, offset: 1 },
      ], { duration: 870, fill: 'forwards', easing: 'cubic-bezier(.2,.75,.2,1)' })
      animation.onfinish = () => {
        source?.classList.remove('is-flight-origin')
        target?.classList.add('show')
        flight.remove()
        traveler = null
        animation = null
      }
    }
    timer = window.setTimeout(startFlight, 2180)
    return () => {
      window.clearTimeout(timer)
      if (animation) animation.cancel()
      source?.classList.remove('is-flight-origin')
      target?.classList.remove('show')
      traveler?.remove()
    }
  }, [beat, bridgePlaying])
  const itemImage: Record<string, string> = { bebidas: drinksArtwork, servilletas: napkinsArtwork, velas: candlesArtwork }
  return (
    <section ref={storyRef} className="cine-finance-story" data-on={active} data-beat={beat} data-shared-bridge={sharedShoppingList || undefined} data-bridge-playing={bridgePlaying || undefined} aria-hidden={!active} style={homeVariables}>
      {!sharedShoppingList && <HomeHeader showJuli />}

      {beat > 0 ? <FinanceAppBeats beat={beat} onAdvance={onAdvance} /> : <>
        <div className="cine-fin-story-heading">
          <div className="cine-fin-title-group" data-active="true">
            <h1>De la compra al gasto</h1>
            <p>Una misma compra conecta organización y dinero.</p>
          </div>
        </div>

      <div className="cine-fin-c36" aria-hidden={beat !== 0}>
        {!sharedShoppingList && <article className="cine-fin-list-card">
          <header>
            <FinIcon name="list" size={22} />
            <div>
              <h2>{financeStory.list.title}</h2>
              <p>{financeStory.list.subtitle}</p>
            </div>
          </header>
          <div className="cine-fin-list-rows">
            {financeStory.list.items.map((item) => (
              <div key={item.id} className="cine-fin-list-row" data-fin-item={item.id}>
                <span className="cine-fin-check" aria-hidden="true" />
                <img src={itemImage[item.id]} alt="" draggable={false} />
                <p>{item.name}</p>
              </div>
            ))}
          </div>
          <p className="cine-fin-list-footer">{financeStory.list.footer}</p>
        </article>}

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

      </div>

      {/* One persistent surface and first row morph from the C36 card into C37. */}
      <article className="cine-fin-shared-ledger" data-beat={beat} aria-hidden={beat > 1}>
        <header className="cine-fin-ledger-compact-heading">
          <span className="cine-fin-round-icon"><FinIcon name="receipt" size={20} /></span>
          <h2>Finanzas</h2>
        </header>
        <p className="cine-fin-ledger-compact-label">Movimientos recientes</p>
        <header className="cine-fin-ledger-expanded-heading">
          <FinIcon name="receipt" size={24} />
          <h2>Movimientos recientes</h2>
          <span>Ver todos</span>
        </header>
        <div className="cine-fin-shared-row" data-first="true">
          <span className="cine-fin-row-icon"><FinIcon name="cart" size={22} /></span>
          <div>
            <strong>{financeStory.recent[0].title}</strong>
            <p className="cine-fin-shared-meta"><span className="cine-fin-compact-meta">{financeStory.purchase.movementMeta}</span><span className="cine-fin-expanded-meta">{financeStory.recent[0].meta}</span></p>
          </div>
          <p className="cine-fin-move-amount cine-fin-shared-amount">{financeStory.recent[0].amount}</p>
        </div>
        <div className="cine-fin-ledger-secondary-rows">
          {financeStory.recent.slice(1).map((row, index) => (
            <div key={row.id} className="cine-fin-movement" data-ledger-row={index + 2}>
              <span className="cine-fin-row-icon"><FinIcon name={index === 0 ? 'receipt' : 'card'} size={22} /></span>
              <div><strong>{row.title}</strong><p>{row.meta}</p></div>
              <p className="cine-fin-move-amount">{row.amount}</p>
            </div>
          ))}
        </div>
        <p className="cine-fin-ledger-footer"><FinIcon name="card" size={18} /> Cuentas y tarjetas asociadas a los movimientos</p>
        <p className="cine-fin-note cine-fin-compact-note">Importes de demostración</p>
      </article>

      <p className="cine-fin-demo-note">{financeStory.note}</p>
      </>}
      {!sharedShoppingList && <FinanceNavigation />}
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

function FamilyStory({ step, familyHandoff, snap = false }: { step: number; familyHandoff: FamilyHandoff; snap?: boolean }) {
  const active = step >= 16 && step <= 21
  // 16..21 → F01..F06 (phase 0..5). S07 fades this same F06 composition.
  const phase = active ? Math.min(5, step - 16) : 0
  const chat = useFamilyChat(active ? phase : -1, snap)

  const typingTomi = chat.phase === 'typing-tomi'
  const sendingTomi = chat.phase === 'sending-tomi'
  const tomiSent = chat.phase === 'tomi-sent' || chat.phase === 'reply-waiting'
    || chat.phase === 'reply-typing' || chat.phase === 'complete'
  const replyVisible = phase >= 5 || chat.phase === 'reply-waiting'
    || chat.phase === 'reply-typing' || chat.phase === 'complete'

  const draft = typingTomi
    ? TOMI_CHAT_MESSAGE.slice(0, chat.tomi)
    : sendingTomi ? TOMI_CHAT_MESSAGE : ''

  const replyText = chat.phase === 'reply-typing'
    ? PAPA_CHAT_MESSAGE.slice(0, chat.papa)
    : PAPA_CHAT_MESSAGE

  return (
    <div className="cine-family-bridge" data-on={active} data-v3="true" data-phase={phase}
      data-chat={chat.phase} data-family-handoff={familyHandoff ?? undefined}
      aria-hidden={!active} style={homeVariables}>
      <HomeHeader showJuli />
      <h2 className="cine-family-screen-title f3-heading" data-present={phase === 0}>Familia</h2>

      <section className="f3-family-cards" aria-label="Familia García">
        <article className="f3-member-card f3-panel">
          <span className="family-avatar family-avatar-mom f3-avatar" aria-hidden="true">M</span>
          <h3>Mamá</h3>
          <p>Familia García</p>
          <small>Casa</small>
        </article>
        <article className="f3-member-card f3-member-card-tomi f3-panel">
          <h3>Tomi</h3>
          <p>16 años</p>
          <small>Colegio · Entrenamiento</small>
        </article>
        <article className="f3-member-card f3-panel">
          <span className="family-avatar family-avatar-dad f3-avatar" aria-hidden="true">P</span>
          <h3>Papá</h3>
          <p>Familia García</p>
          <small>Trabajo</small>
        </article>
      </section>

      <div className="f3-tomi-traveler" aria-hidden="true">T</div>
      <div className="f3-identity"><h2>Tomi</h2><p>16 años · Hoy</p></div>

      <article className="f3-school-card f3-panel">
        <div className="f3-mini">PRIMERO</div>
        <h3>Colegio</h3>
        <p>Salida de clases</p>
      </article>
      <div className="f3-timeline-connector" aria-hidden="true" />

      <article className="f3-training-card f3-panel"
        aria-label="Entrenamiento: el horario previsto de las 17:00 se extendió una hora hasta las 18:00">
        <div className="f3-eyebrow">DESPUÉS · CLUB</div>
        <h3>Entrenamiento</h3>
        <div className="f3-finish-label">Horario previsto</div>
        <div className="f3-time-container">
          <span className="f3-time-label">Termina</span>
          <div className="f3-odo">
            <span className="f3-static-digit">1</span>
            <span className="f3-reel-window">
              <span className="f3-reel-strip"><span>7</span><span>8</span></span>
            </span>
            <span className="f3-colon">:</span>
            <span className="f3-static-digit">0</span>
            <span className="f3-static-digit">0</span>
          </div>
        </div>
        <div className="f3-delta">Se extendió una hora <b>+1 h</b></div>
      </article>

      <article className="f3-mama-obstacle f3-panel">
        <div className="f3-obstacle-top">
          <span className="family-avatar family-avatar-mom f3-avatar f3-avatar-small" aria-hidden="true">M</span>
          <div><strong>Mamá</strong><p>Coordinación familiar</p></div>
        </div>
        <p className="f3-obstacle-message">
          <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="m8 8 8 8" /></svg>
          No puede buscarlo.
        </p>
      </article>

      <div className="f3-question">¿Quién puede ir al club?</div>
      <div className="f3-map-head">¿Quién está cerca del club?</div>

      <div className="f3-mapframe">
        <img src={mapArtwork} alt="Mapa ilustrado del barrio de Tomi" draggable={false} />
        <div className="f3-map-pin f3-map-pin-school"><span className="f3-map-dot">⌂</span><strong>Colegio</strong></div>
        <div className="f3-map-pin f3-map-pin-papa"><span className="f3-map-dot">P</span><strong>Papá · cerca</strong></div>
      </div>

      <div className="f3-club-token"><span className="f3-pin-dot">●</span><strong>Club de Tomi</strong></div>
      <div className="f3-map-context">
        <span className="f3-tiny-p">P</span>
        <span><strong>Papá está cerca.</strong> Todavía hay que coordinar.</span>
      </div>

      <div className="f3-chat-heading">Mensajes</div>
      <section className="f3-chat-panel f3-panel" aria-label="Conversación familiar">
        <header className="f3-chat-top">
          <span className="f3-mini-avatars" aria-hidden="true"><b>T</b><b>P</b></span>
          <strong>Coordinar la salida</strong>
          <small>Familia García</small>
        </header>
        <div className="f3-chat-history" aria-live="polite">
          <article className="f3-chat-tomi" data-sent={tomiSent} aria-hidden={!tomiSent}>
            <strong>Tomi</strong>
            <span>{TOMI_CHAT_MESSAGE}</span>
          </article>
        </div>
        <div className="f3-composer" data-sending={sendingTomi}>
          <span className={`f3-draft${typingTomi || sendingTomi ? '' : ' f3-draft-placeholder'}`} role="textbox" aria-readonly="true" aria-label="Mensaje en redacción">
            {draft || 'Escribí un mensaje…'}
            {typingTomi && <span className="f3-caret" aria-hidden="true" />}
          </span>
          <span className="f3-send" aria-hidden="true">
            <svg viewBox="0 0 24 24"><path d="m3.5 11 16-7-6.8 16-2.1-6.3L3.5 11Z" /><path d="m10.6 13.7 4.1-4.2" /></svg>
          </span>
        </div>
      </section>

      <article className="f3-reply-card" data-visible={replyVisible} aria-hidden={!replyVisible}
        aria-live={chat.phase === 'reply-typing' || chat.phase === 'reply-waiting' ? 'polite' : undefined}>
        <header className="f3-reply-header">
          <span className="family-avatar family-avatar-dad f3-avatar" aria-hidden="true">P</span>
          <div><strong>Papá</strong><div className="f3-time">Familia García · Ahora</div></div>
        </header>
        <p className="f3-reply-text">
          {chat.phase === 'reply-waiting' ? (
            <span className="f3-typing-dots" aria-label="Papá está escribiendo"><i /><i /><i /></span>
          ) : replyText}
        </p>
      </article>

      {(active || familyHandoff === 'family-to-planner') && <FamilyNavigation />}
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

function WarrantyShield() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 2 20 6v5c0 5-3.5 8.5-8 11-4.5-2.5-8-6-8-11V6z" />
      <path d="m8.5 12 2.5 2.6 4.8-5.2" />
    </svg>
  )
}

/**
 * C39–C40. One PS5 and one set of cards are reused between the orbital and
 * grouped states: the image and every card stay mounted while only their
 * geometry changes.
 */
function AssetsSurface({ step, bridge }: { step: number; bridge: 'cloud' | 'assets' | null }) {
  const active = step === 29 || step === 30
  const ps5 = homeAssets[0]
  return (
    <div className="cine-assets-surface cine-s10-assets" data-on={active} data-view={step === 29 ? 'orbit' : 'grouped'} data-bridge={bridge ?? undefined} aria-hidden={!active} style={homeVariables}>
      <HomeHeader showJuli />
      <main className="cine-s10-workspace">
        <header className="cine-s10-heading"><h1>Activos</h1></header>
        <span className="cine-s10-panel" aria-hidden="true" />
        <span className="cine-s10-glow" aria-hidden="true" />
        <span className="cine-s10-ps5" aria-hidden="true">
          <img src={ps5Console} alt="" draggable={false} />
          <span className="cine-s10-ps5-shadow" />
        </span>
        <p className="cine-s10-ps5-caption"><b>{ps5.name}</b><span>Activo del hogar</span></p>

        <article className="cine-s10-card" data-card="warranty">
          <span className="cine-s10-tile cine-s10-warranty-tile" aria-hidden="true"><WarrantyShield /></span>
          <div className="cine-s10-copy">
            <strong className="cine-s10-warranty-title">
              <span className="cine-s10-detail-only">{ps5Warranty.title}</span>
              <span className="cine-s10-mini-only">Garantía PS5</span>
            </strong>
            <small data-s10-meta className="cine-s10-warranty-meta cine-s10-warranty-status cine-s10-detail-only">● {ps5Warranty.status}</small>
            <small data-s10-meta className="cine-s10-warranty-meta">{ps5Warranty.expiresLabel}</small>
            <small data-s10-meta className="cine-s10-warranty-meta cine-s10-warranty-expiry">{ps5Warranty.expires}</small>
          </div>
          <span className="cine-s10-chev" aria-hidden="true">›</span>
        </article>

        <article className="cine-s10-card" data-card="manual">
          <span className="cine-s10-tile" aria-hidden="true">▤</span>
          <div className="cine-s10-copy">
            <strong>{ps5Documents[1].title}</strong>
            <small>PDF · Oficial</small>
          </div>
          <span className="cine-s10-chev" aria-hidden="true">›</span>
        </article>

        <article className="cine-s10-card" data-card="invoice">
          <span className="cine-s10-tile" aria-hidden="true">▤</span>
          <div className="cine-s10-copy">
            <strong className="cine-s10-split-title">
              <span className="cine-s10-detail-only">{ps5Invoice.title}</span>
              <span className="cine-s10-mini-only">Factura PS5</span>
            </strong>
            <small>{ps5Invoice.meta}</small>
          </div>
          <span className="cine-s10-chev" aria-hidden="true">›</span>
        </article>

        <article className="cine-s10-card" data-card="serial">
          <span className="cine-s10-tile" aria-hidden="true">▥</span>
          <div className="cine-s10-copy">
            <strong>N.º de serie</strong>
            <small>{ps5Warranty.serial}</small>
          </div>
        </article>

        <article className="cine-s10-card" data-card="value">
          <span className="cine-s10-tile" aria-hidden="true">▤</span>
          <div className="cine-s10-copy">
            <strong>Valor de compra</strong>
            <small>{ps5Warranty.value}</small>
          </div>
        </article>

        <div className="cine-s10-group-meta">
          <div className="cine-s10-meta-row">
            <span className="cine-s10-badge" aria-hidden="true">▦</span>
            <span><b>Comprada</b><small>{ps5Warranty.purchased}</small></span>
            <span className="cine-s10-usage"><b>{ps5Warranty.usageLabel}</b><small>{ps5Warranty.usage}</small></span>
          </div>
        </div>
      </main>
      <AssetsNavigation />
    </div>
  )
}

type S10Rect = { left: number; top: number; width: number; height: number }
type S10Meta = { rect: S10Rect; text: string; color: string; font: string; weight: string }
type S10Endpoint = {
  card: S10Rect
  title: S10Rect
  tile: S10Rect
  font: number
  weight: string
  color: string
  metas: S10Meta[]
}

/**
 * Layout rect in the 1280×720 cine coordinate space.
 *
 * Uses the offsetParent chain instead of getBoundingClientRect so an ancestor
 * that is currently translating/scaling (the HomeCloud surface entering, the
 * Recuerdos crossfade) cannot contaminate the endpoint. Transforms are applied
 * after layout, so offsets always describe the settled card position.
 */
function s10MeasureRect(element: HTMLElement, scene: HTMLElement): S10Rect {
  let left = 0
  let top = 0
  let node: HTMLElement | null = element
  while (node && node !== scene) {
    left += node.offsetLeft
    top += node.offsetTop
    node = node.offsetParent as HTMLElement | null
  }
  return {
    left,
    top,
    width: element.offsetWidth,
    height: element.offsetHeight,
  }
}

function s10MeasureEndpoint(card: HTMLElement, title: HTMLElement, tile: HTMLElement, scene: HTMLElement): S10Endpoint {
  const titleStyle = getComputedStyle(title)
  return {
    card: s10MeasureRect(card, scene),
    title: s10MeasureRect(title, scene),
    tile: s10MeasureRect(tile, scene),
    font: Number.parseFloat(titleStyle.fontSize),
    weight: titleStyle.fontWeight,
    color: titleStyle.color,
    metas: Array.from(card.querySelectorAll<HTMLElement>('[data-s10-meta]'))
      .filter((meta) => getComputedStyle(meta).display !== 'none' && Boolean(meta.textContent?.trim()))
      .map((meta) => {
        const style = getComputedStyle(meta)
        return {
          rect: s10MeasureRect(meta, scene),
          text: meta.textContent ?? '',
          color: style.color,
          font: style.fontSize,
          weight: style.fontWeight,
        }
      }),
  }
}

function s10Part(scene: HTMLElement, className: string, css: Record<string, string>, html?: string) {
  const element = document.createElement('div')
  element.className = className
  element.style.cssText = Object.entries(css).map(([key, value]) => `${key}:${value}`).join(';')
  if (html) element.innerHTML = html
  scene.appendChild(element)
  return element
}

function s10RectFrames(from: S10Rect, to: S10Rect, first: Record<string, string> = {}, last: Record<string, string> = {}): Keyframe[] {
  return [
    { left: `${from.left}px`, top: `${from.top}px`, width: `${from.width}px`, height: `${from.height}px`, ...first },
    { left: `${to.left}px`, top: `${to.top}px`, width: `${to.width}px`, height: `${to.height}px`, ...last },
  ]
}

/**
 * C40 → C41 and its reverse. One composed warranty flies over the bridge while
 * the source and destination cards stay mounted. Endpoints are read from the
 * layout offset chain, so an entering surface's translate/scale can never move
 * the target; the cards are hidden only while the traveler exists.
 */
function WarrantyTraveler({ step }: { step: number }) {
  const previous = useRef(step)
  const cleanupRef = useRef<(() => void) | null>(null)

  useLayoutEffect(() => {
    const fromStep = previous.current
    previous.current = step
    const forward = fromStep === 30 && step === 31
    const reverse = fromStep === 31 && step === 30
    if (!forward && !reverse) return

    const scene = document.querySelector<HTMLElement>('.cine-scene')
    const sourceCard = document.querySelector<HTMLElement>(forward ? '.cine-s10-assets [data-card="warranty"]' : '.cine-s10-cloud [data-doc="garantia-ps5"]')
    const targetCard = document.querySelector<HTMLElement>(forward ? '.cine-s10-cloud [data-doc="garantia-ps5"]' : '.cine-s10-assets [data-card="warranty"]')
    if (!scene || !sourceCard || !targetCard) return

    const sourceTitle = sourceCard.querySelector<HTMLElement>(forward ? '.cine-s10-warranty-title' : '.cine-s10-doc-title')
    const targetTitle = targetCard.querySelector<HTMLElement>(forward ? '.cine-s10-doc-title' : '.cine-s10-warranty-title')
    const sourceTile = sourceCard.querySelector<HTMLElement>(forward ? '.cine-s10-warranty-tile' : '.cine-s10-doc-tile')
    const targetTile = targetCard.querySelector<HTMLElement>(forward ? '.cine-s10-doc-tile' : '.cine-s10-warranty-tile')
    if (!sourceTitle || !targetTitle || !sourceTile || !targetTile) return

    // Both endpoints are read with layout offsets, so the entering surface's
    // translate/scale (and its opacity transition) never affects the rects.
    const origin = s10MeasureEndpoint(sourceCard, sourceTitle, sourceTile, scene)
    const destination = s10MeasureEndpoint(targetCard, targetTitle, targetTile, scene)

    const sourceVisibility = sourceCard.style.visibility
    const targetVisibility = targetCard.style.visibility
    sourceCard.style.visibility = 'hidden'
    targetCard.style.visibility = 'hidden'

    const shell = s10Part(scene, 'cine-s10-flight-shell', {
      left: `${origin.card.left}px`,
      top: `${origin.card.top}px`,
      width: `${origin.card.width}px`,
      height: `${origin.card.height}px`,
    })
    const title = s10Part(scene, 'cine-s10-flight-title', {
      left: `${origin.title.left}px`,
      top: `${origin.title.top}px`,
      width: `${origin.title.width}px`,
      height: `${origin.title.height}px`,
      'font-size': `${origin.font}px`,
      'font-weight': origin.weight,
      color: origin.color,
    })
    title.textContent = ps5Warranty.title

    const symbol = s10Part(scene, 'cine-s10-flight-symbol', {
      left: `${origin.tile.left}px`,
      top: `${origin.tile.top}px`,
      width: `${origin.tile.width}px`,
      height: `${origin.tile.height}px`,
    })
    const shield = s10Part(symbol, 'cine-s10-flight-symbol-content', {}, '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2 20 6v5c0 5-3.5 8.5-8 11-4.5-2.5-8-6-8-11V6z"/><path d="m8.5 12 2.5 2.6 4.8-5.2"/></svg>')
    const pdf = s10Part(symbol, 'cine-s10-flight-symbol-content', {}, 'PDF')
    shield.style.zIndex = '1'
    pdf.style.zIndex = '1'

    const extras: HTMLElement[] = []
    origin.metas.forEach((meta) => {
      const extra = s10Part(scene, 'cine-s10-flight-extra', {
        left: `${meta.rect.left}px`,
        top: `${meta.rect.top}px`,
        width: `${meta.rect.width}px`,
        height: `${meta.rect.height}px`,
        color: meta.color,
        'font-size': meta.font,
        'font-weight': meta.weight,
      })
      extra.textContent = meta.text
      extras.push(extra)
    })
    destination.metas.forEach((meta) => {
      const extra = s10Part(scene, 'cine-s10-flight-extra', {
        left: `${meta.rect.left}px`,
        top: `${meta.rect.top}px`,
        width: `${meta.rect.width}px`,
        height: `${meta.rect.height}px`,
        color: meta.color,
        opacity: '0',
        'font-size': meta.font,
        'font-weight': meta.weight,
      })
      extra.textContent = meta.text
      extras.push(extra)
    })

    const parts = [shell, title, symbol, ...extras]
    const spec: KeyframeAnimationOptions = { duration: 1120, easing: 'cubic-bezier(.42,0,.20,1)', fill: 'forwards' }
    const animations: Animation[] = [
      shell.animate(s10RectFrames(origin.card, destination.card), spec),
      title.animate(
        s10RectFrames(origin.title, destination.title, { 'font-size': `${origin.font}px` }, { 'font-size': `${destination.font}px` }),
        spec,
      ),
      symbol.animate(s10RectFrames(origin.tile, destination.tile), spec),
    ]

    const shieldVisible = forward
    shield.style.opacity = shieldVisible ? '1' : '0'
    pdf.style.opacity = shieldVisible ? '0' : '1'
    animations.push(shield.animate([
      { opacity: shieldVisible ? 1 : 0, offset: 0 },
      { opacity: shieldVisible ? 1 : 0, offset: 0.28 },
      { opacity: shieldVisible ? 0 : 1, offset: 0.67 },
      { opacity: shieldVisible ? 0 : 1, offset: 1 },
    ], spec))
    animations.push(pdf.animate([
      { opacity: shieldVisible ? 0 : 1, offset: 0 },
      { opacity: shieldVisible ? 0 : 1, offset: 0.28 },
      { opacity: shieldVisible ? 1 : 0, offset: 0.67 },
      { opacity: shieldVisible ? 1 : 0, offset: 1 },
    ], spec))

    extras.forEach((extra, index) => {
      if (index < origin.metas.length) {
        const meta = origin.metas[index]
        extra.animate([
          { opacity: 1, left: `${meta.rect.left}px`, top: `${meta.rect.top}px`, offset: 0 },
          { opacity: 1, left: `${meta.rect.left}px`, top: `${meta.rect.top}px`, offset: 0.12 },
          {
            opacity: 0,
            left: `${meta.rect.left + (destination.title.left - origin.title.left) * 0.42}px`,
            top: `${meta.rect.top + (destination.title.top - origin.title.top) * 0.42}px`,
            offset: 0.58,
          },
          { opacity: 0, offset: 1 },
        ], spec)
      } else {
        const meta = destination.metas[index - origin.metas.length]
        extra.animate([
          { opacity: 0, top: `${meta.rect.top + 9}px`, offset: 0 },
          { opacity: 0, top: `${meta.rect.top + 9}px`, offset: 0.53 },
          { opacity: 1, top: `${meta.rect.top}px`, offset: 0.88 },
          { opacity: 1, top: `${meta.rect.top}px`, offset: 1 },
        ], spec)
      }
    })

    let cancelled = false
    const cleanup = () => {
      cancelled = true
      animations.forEach((animation) => {
        try { animation.cancel() } catch { /* already cancelled */ }
      })
      parts.forEach((part) => part.remove())
      sourceCard.style.visibility = sourceVisibility
      targetCard.style.visibility = targetVisibility
      cleanupRef.current = null
    }
    cleanupRef.current = cleanup

    void Promise.allSettled(animations.map((animation) => animation.finished)).then(() => {
      if (cancelled) return
      // Handoff in the same frame: the destination appears only once the
      // traveler is exactly aligned, so there is never a gap or a duplicate.
      targetCard.style.visibility = targetVisibility
      sourceCard.style.visibility = sourceVisibility
      parts.forEach((part) => part.remove())
      cleanupRef.current = null
    })

    return cleanup
  }, [step])

  return null
}

const cloudGridDocuments = [
  ...cloudDocuments,
  { id: 'garantia-heladera', title: 'Garantía heladera', meta: 'PDF · 4 nov' },
  { id: 'manual-lavarropas', title: 'Manual lavarropas', meta: 'PDF · 2 nov' },
  { id: 'factura-tv', title: 'Factura del TV', meta: 'PDF · 28 oct' },
  { id: 'seguro-hogar', title: 'Seguro del hogar', meta: 'PDF · 20 oct' },
  { id: 'service-auto', title: 'Service del auto', meta: 'PDF · 15 oct' },
  { id: 'manual-microondas', title: 'Manual microondas', meta: 'PDF · 8 oct' },
]

function CloudSurface({ step, bridge, c43Active }: { step: number; bridge: 'cloud' | 'assets' | null; c43Active: boolean }) {
  // C43 keeps the HomeCloud shell mounted so the same fullscreen photo can
  // darken across the slide boundary; the finale view hides every shell item.
  const active = step >= 31 && step <= 34
  const view = step >= 33 ? 'finale' : step >= 32 ? 'memories' : 'documents'
  const tab = step >= 32 ? 'memories' : 'documents'
  return (
    <div className="cine-cloud-surface cine-s10-cloud" data-on={active} data-view={view} data-tab={tab} data-bridge={bridge ?? undefined} aria-hidden={!active} style={homeVariables}>
      <HomeHeader showJuli />
      <main className="cine-s10-workspace">
        <header className="cine-s10-heading"><h1>HomeCloud</h1></header>
        <div className="cine-s10-tabs" role="tablist" aria-label="Secciones de HomeCloud">
          <span className="cine-s10-tab-pill" aria-hidden="true" />
          <span className="cine-s10-tab-label" data-tab="documents" role="tab" aria-selected={tab === 'documents'}>Documentos</span>
          <span className="cine-s10-tab-label" data-tab="memories" role="tab" aria-selected={tab === 'memories'}>Recuerdos</span>
        </div>

        <section className="cine-s10-docs" aria-label="Documentos recientes">
          <p className="cine-s10-kicker">Recientes</p>
          <div className="cine-s10-doc-grid">
          {cloudGridDocuments.map((doc) => (
            <div key={doc.id} className="cine-s10-doc" data-doc={doc.id} data-current={doc.id === 'garantia-ps5'}>
              <span className="cine-s10-doc-tile" aria-hidden="true">PDF</span>
              <div className="cine-s10-doc-copy">
                <p className="cine-s10-doc-title">{doc.title}</p>
                <p data-s10-meta className="cine-s10-doc-meta">{doc.meta}</p>
              </div>
              {doc.id === 'garantia-ps5' ? <span className="cine-s10-linked">♢ De tus activos</span> : <span className="cine-s10-chev" aria-hidden="true">›</span>}
            </div>
          ))}
          </div>
        </section>

        <section className="cine-s10-memories" aria-label="Recuerdos">
          <div className="cine-s10-memory-grid">
            {cloudMemories.map((memory) => (
              <article key={memory.id} className="cine-s10-memory" data-memory={memory.id}>
                <span className="cine-s10-memory-cover">
                  {memory.id === 'cumple' && <img src={birthdayMemoryPhoto} alt="" draggable={false} />}
                  {memory.id === 'vacaciones' && <img src={vacationMemoryPhoto} alt="" draggable={false} />}
                </span>
                <p className="cine-s10-memory-title"><b>{memory.title}</b><span>▧ {memory.id === 'cumple' ? '24 fotos' : '12 fotos'}</span></p>
                <p className="cine-s10-memory-date">{memory.date}</p>
              </article>
            ))}
          </div>
          <div className="cine-s10-memory-row">
            <span className="cine-s10-memory-disk" aria-hidden="true">◖</span>
            <div><p className="cine-s10-memory-row-title">{cloudVoiceNote.title}</p><p className="cine-s10-memory-row-meta">{cloudVoiceNote.meta}</p></div>
            <span className="cine-s10-chev" aria-hidden="true">›</span>
          </div>
          <div className="cine-s10-memory-row">
            <span className="cine-s10-memory-disk" aria-hidden="true">▧</span>
            <div><p className="cine-s10-memory-row-title">{cloudAlbumsRow.title}</p><p className="cine-s10-memory-row-meta">{cloudAlbumsRow.meta}</p></div>
            <span className="cine-s10-chev" aria-hidden="true">›</span>
          </div>
        </section>
      </main>
      <HomeCloudNavigation />
      <MemoryPhotoJourney step={step} c43Active={c43Active} />
    </div>
  )
}

/**
 * C42. The same birthday photograph leaves the album card and becomes the
 * full-stage image in one continuous flight. The hold is the end state of
 * this animation, not a sixth beat; the reverse flight restores the album.
 */
function MemoryPhotoJourney({ step, c43Active }: { step: number; c43Active: boolean }) {
  const rootRef = useRef<HTMLDivElement>(null)
  const previous = useRef(step)

  useLayoutEffect(() => {
    const fromStep = previous.current
    previous.current = step
    const root = rootRef.current
    const scene = document.querySelector<HTMLElement>('.cine-scene')
    if (!root || !scene) return

    const cover = document.querySelector<HTMLElement>('.cine-s10-memory[data-memory="cumple"] .cine-s10-memory-cover')
    const cardPhoto = cover?.querySelector<HTMLImageElement>('img')
    const full: S10Rect = { left: 0, top: 0, width: scene.offsetWidth, height: scene.offsetHeight }
    let animation: Animation | null = null
    let cancelled = false

    const setRect = (rect: S10Rect, radius: number) => {
      root.style.left = `${rect.left}px`
      root.style.top = `${rect.top}px`
      root.style.width = `${rect.width}px`
      root.style.height = `${rect.height}px`
      root.style.borderRadius = `${radius}px`
    }
    const show = () => { root.dataset.visible = 'true' }
    const hide = () => { root.dataset.visible = 'false' }
    const hideCard = () => { if (cardPhoto) cardPhoto.style.visibility = 'hidden' }
    const restoreCard = () => { if (cardPhoto) cardPhoto.style.visibility = '' }
    // The album section keeps `transform: none` in both views, so its cover
    // is already at its settled position while the crossfade runs.
    const cardRect = () => (cover ? s10MeasureRect(cover, scene) : null)

    if (step === 33) {
      hideCard()
      if (fromStep === 32) {
        const origin = cardRect()
        if (origin) {
          setRect(origin, 12)
          show()
          animation = root.animate([
            { left: `${origin.left}px`, top: `${origin.top}px`, width: `${origin.width}px`, height: `${origin.height}px`, borderRadius: '12px' },
            { left: '0px', top: '0px', width: `${full.width}px`, height: `${full.height}px`, borderRadius: '0px' },
          ], { duration: 1170, easing: 'cubic-bezier(.22,1,.36,1)', fill: 'forwards' })
          void Promise.allSettled([animation.finished]).then(() => {
            if (cancelled) return
            setRect(full, 0)
            show()
          })
        } else {
          setRect(full, 0)
          show()
        }
      } else {
        setRect(full, 0)
        show()
      }
    } else if (step === 32) {
      if (fromStep === 33) {
        // The card image is restored by the previous effect's cleanup; hide it
        // again for the reverse flight so only the traveler photo is visible.
        hideCard()
        const destination = cardRect()
        show()
        if (destination) {
          setRect(full, 0)
          animation = root.animate([
            { left: '0px', top: '0px', width: `${full.width}px`, height: `${full.height}px`, borderRadius: '0px' },
            { left: `${destination.left}px`, top: `${destination.top}px`, width: `${destination.width}px`, height: `${destination.height}px`, borderRadius: '12px' },
          ], { duration: 1170, easing: 'cubic-bezier(.22,1,.36,1)', fill: 'forwards' })
          void Promise.allSettled([animation.finished]).then(() => {
            if (cancelled) return
            hide()
            restoreCard()
          })
        } else {
          hide()
          restoreCard()
        }
      } else {
        hide()
        restoreCard()
      }
    } else if (step === 34) {
      hideCard()
      setRect(full, 0)
      show()
    } else {
      hide()
      restoreCard()
    }

    return () => {
      cancelled = true
      animation?.cancel()
      restoreCard()
    }
  }, [step])

  return (
    <div ref={rootRef} className="cine-s10-photo" data-visible="false" data-closing={step === 34 && c43Active ? 'true' : undefined} aria-hidden="true">
      <img src={birthdayMemoryPhoto} alt="" draggable={false} />
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

export default function CineScene({ step, onAdvance, beat = null, s08Beat = null, s09Beat = null, c43Beat = null, c43Exit = false, cineHandoff = null, familyHandoff = null, directSnapshot = false, familyTomiProfile = false }: { step: number; onAdvance?: () => void; beat?: number | null; s08Beat?: number | null; s09Beat?: number | null; c43Beat?: number | null; c43Exit?: boolean; cineHandoff?: CineHandoff; familyHandoff?: FamilyHandoff; directSnapshot?: boolean; familyTomiProfile?: boolean }) {
  const home = step >= 8
  const homeBeat = beat
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const financeIntro = step === 27 && s09Beat === 0
  const previousS08Beat = useRef<number | null>(s08Beat)
  const bridgeTimer = useRef<number | null>(null)
  const [bridgePlaying, setBridgePlaying] = useState(false)
  // Derived during render so the bridge transition is already attached in the
  // same commit that activates the next surface. Adding it later (in a layout
  // effect) would let the base 700ms entrance transition start first.
  const [s10Bridge, setS10Bridge] = useState<'cloud' | 'assets' | null>(null)
  const [s10TrackedStep, setS10TrackedStep] = useState(step)
  if (s10TrackedStep !== step) {
    const from = s10TrackedStep
    setS10TrackedStep(step)
    setS10Bridge(from === 30 && step === 31 ? 'cloud' : from === 31 && step === 30 ? 'assets' : null)
  }
  useEffect(() => {
    if (!s10Bridge) return
    const timer = window.setTimeout(() => setS10Bridge(null), 1250)
    return () => window.clearTimeout(timer)
  }, [s10Bridge])
  useLayoutEffect(() => {
    const previous = previousS08Beat.current
    previousS08Beat.current = s08Beat
    if (bridgeTimer.current !== null) window.clearTimeout(bridgeTimer.current)
    if (financeIntro && previous === 6 && !reducedMotion) {
      setBridgePlaying(true)
      bridgeTimer.current = window.setTimeout(() => setBridgePlaying(false), 3100)
    } else {
      setBridgePlaying(false)
    }
    return () => {
      if (bridgeTimer.current !== null) window.clearTimeout(bridgeTimer.current)
    }
  }, [financeIntro, reducedMotion, s08Beat])
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
      <FamilyStory step={step} familyHandoff={familyHandoff} snap={directSnapshot} tomiProfile={familyTomiProfile} />
      <BirthdayPlanNode step={step} familyHandoff={familyHandoff} />
      {s08Beat === null && <BirthdayBridge step={step} />}
      {s08Beat === null && <InventoryStory step={step} beat={-1} />}
      {(s08Beat !== null || financeIntro) && <BirthdayPlansV3 beat={s08Beat} financeEntry={financeIntro} bridgePlaying={bridgePlaying} />}
      <ShoppingAnchor step={step} enabled={s08Beat === null} />
      <InventorySurface step={step} enabled={s08Beat === null} />
      <FinanceStory onAdvance={onAdvance} step={step} beat={s09Beat ?? 0} sharedShoppingList={financeIntro} bridgePlaying={bridgePlaying} />
      <FinanceSurface step={step} enabled={s09Beat === null} />
      <AssetsSurface step={step} bridge={s10Bridge} />
      <WarrantyTraveler step={step} />
      <CloudSurface step={step} bridge={s10Bridge} c43Active={c43Beat !== null} />
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
