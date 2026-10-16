import type { CSSProperties, ReactNode } from 'react'
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
import MapDemoScreen from '../presentation/app-screens/MapDemoScreen'
import FeedDemoScreen from '../presentation/app-screens/FeedDemoScreen'
import InventoryDemoScreen from '../presentation/app-screens/InventoryDemoScreen'
import InventoryNavigation from '../presentation/app-screens/InventoryDemoScreen/InventoryNavigation'
import { shoppingSummary } from '../presentation/app-screens/InventoryDemoScreen/inventoryData'
import ps5Console from '../../assets/ps5-transparent.png'
import FinanceNavigation from '../presentation/app-screens/FinanceDemoScreen/FinanceNavigation'
import AssetsNavigation from '../presentation/app-screens/AssetsDemoScreen/AssetsNavigation'
import HomeCloudNavigation from '../presentation/app-screens/HomeCloudDemoScreen/HomeCloudNavigation'
import { financeCategories, financeHero, financePayments, financeTabs } from '../presentation/app-screens/FinanceDemoScreen/financeData'
import { homeAssets, ps5Documents } from '../presentation/app-screens/AssetsDemoScreen/assetsData'
import { cloudAlbumsRow, cloudDocuments, cloudMemories, cloudVoiceNote } from '../presentation/app-screens/HomeCloudDemoScreen/homecloudData'
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
  delay: number
  at: Place[]
  body: ReactNode
  renderBody?: (step: number) => ReactNode
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

const TRAVELERS: TravelerDef[] = [
  {
    id: 'juli', w: 360, h: 344, delay: 0, body: <JuliBody />,
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
    p04W: 520, p04H: 100, p05W: 520, p05H: 104, delay: 120,
    body: <ItemBody title="Educación Física" meta="Mañana · Colegio" kind="event" />,
    at: [
      { ...HIDDEN }, { ...HIDDEN }, { ...HIDDEN }, { ...HIDDEN }, { ...HIDDEN }, { ...HIDDEN },
      { ...C(465, 414, 1, 1) }, { ...C(465, 414, 1, 1) },
      { ...C(461.33, 220, 1, 1) }, { ...C(461.33, 220, 1, 1) },
      { ...C(461.33, 220, 1, 1) }, { ...C(461.33, 220, 1, 1) },
      { ...C(80, 516, 1, 0) }, { ...C(80, 516, 1, 1) }, { ...C(80, 486, 1, 1) }, { ...HIDDEN },
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
    renderBody: (step) => (
      <ItemBody
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

function PlannerSurface({ step }: { step: number }) {
  const active = step >= 11 && step <= 15
  const view: PlannerTab = step === 13 ? 'calendar' : step >= 14 ? 'plans' : 'tasks'
  const showCalendar = step >= 13 && step <= 15
  const compactCalendar = step >= 14
  return (
    <div className="cine-planner-surface" data-on={active} data-view={view} aria-hidden={!active} style={homeVariables}>
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

function BirthdayPlanNode({ step }: { step: number }) {
  const active = step === 14 || step === 15 || step === 21
  return (
    <section className="cine-shared-birthday-plan" data-on={active} data-mode={step === 21 ? 'birthday' : 'planner'} data-bridge={step === 15} aria-hidden={!active} style={homeVariables}>
      {(step === 14 || step === 15) && <h2 className="cine-planner-plan-label">Planes</h2>}
      <PlannerPlans plan={birthdayPlan} />
    </section>
  )
}

function ShoppingAnchor({ step }: { step: number }) {
  const active = step >= 21 && step <= 26
  const mode = step === 21 ? 'question' : step === 26 ? 'expense-bridge' : 'shopping'
  return (
    <section className="cine-shopping-anchor" data-on={active} data-mode={mode} aria-hidden={!active}>
      {step === 21 ? (
        <>
          <p>PREPARATIVOS DEL CUMPLEAÑOS</p>
          <h2>¿Qué falta en casa?</h2>
        </>
      ) : (
        <>
          <div className="cine-shopping-anchor-copy">
            <h2>{shoppingSummary.title}</h2>
            <p>{shoppingSummary.subtitle.replace(String(shoppingSummary.count), '').trim()}</p>
          </div>
          <span className="cine-shopping-anchor-count" aria-label={shoppingSummary.subtitle}>{shoppingSummary.count}</span>
          {step === 26 && <p className="cine-expense-next">Después de comprar, registrar el gasto.</p>}
        </>
      )}
    </section>
  )
}

function InventorySurface({ step }: { step: number }) {
  const active = step >= 22 && step <= 26
  return (
    <div className="cine-inventory-surface" data-on={active} data-step={step} data-inventory-focus={step >= 24} aria-hidden={!active} style={homeVariables}>
      <InventoryDemoScreen focusShortages={step >= 24} showShoppingSummary={false} showAvailableStatus />
    </div>
  )
}

function FamilyStory({ step }: { step: number }) {
  const active = step >= 16 && step <= 20
  const phase = step === 16 ? 'family-context' : step === 17 ? 'family-tomi' : step === 18 ? 'situation' : step === 19 ? 'map' : 'messages'
  return (
    <div className="cine-family-bridge" data-on={active} data-phase={phase} aria-hidden={!active} style={homeVariables}>
      <HomeHeader showJuli />
      <h2 className="cine-family-screen-title" data-present={step >= 16 && step <= 18}>
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
      <div className="cine-map-stage" data-present={step >= 18 && step <= 20} data-map-size={step === 19 ? 'full' : step === 20 ? 'mini' : 'preview'}>
        <MapDemoScreen showSchool showClub showPeople={false} showDelay={step >= 19} />
      </div>
      <section className="cine-family-messages" data-present={step === 20}>
        <h2>Mensajes</h2>
        <FeedDemoScreen
          author="Tomi"
          authorInitial="T"
          authorAvatar="tomi"
          message="El entrenamiento se retrasó una hora. ¿Quién puede buscarme?"
          question=""
        />
        <article className="feed-household-post cine-family-reply">
          <header className="feed-author">
            <span className="family-avatar family-avatar-mom" aria-hidden="true">M</span>
            <div><strong>Mamá</strong><p>Familia García · Ahora</p></div>
          </header>
          <p className="feed-message">Yo te paso a buscar a la salida.</p>
        </article>
        <p className="cine-coordination-principle">Coordinar no significa vigilar.</p>
      </section>
      {step >= 16 && step <= 20 && <FamilyNavigation />}
    </div>
  )
}

function FinanceSurface({ step }: { step: number }) {
  const active = step === 27 || step === 28
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
    <div className="cine-assets-surface" data-on={active} data-view={step === 29 ? 'hero' : 'ficha'} aria-hidden={!active} style={homeVariables}>
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

function CloudSurface({ step }: { step: number }) {
  const active = step === 31
  return (
    <div className="cine-cloud-surface" data-on={active} aria-hidden={!active} style={homeVariables}>
      <HomeHeader showJuli />
      <main className="cine-cloud-workspace">
        <header className="cine-module-heading"><h1>HomeCloud</h1></header>
        <div className="cine-cloud-tabs" role="tablist" aria-label="Secciones de HomeCloud">
          <span className="cine-cloud-tab" role="tab" aria-selected="true">Documentos</span>
          <span className="cine-cloud-tab" role="tab" aria-selected="false">Recuerdos</span>
        </div>
        <h2 className="cine-cloud-label">Recientes</h2>
        <div className="cine-cloud-card">
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
        <p className="cine-cloud-note">El mismo documento de la PlayStation 5, ahora en la nube.</p>
      </main>
      <HomeCloudNavigation />
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

const CONTINUITY_ITEMS = [
  { id: 'tarea', top: 'Tarea de Matemática', sub: 'Juli · Hoy' },
  { id: 'tomi', top: 'Tomi · Club', sub: 'Entrenamiento +1 h' },
  { id: 'cumple', top: 'Cumpleaños', sub: 'Sábado · 3 pasos' },
  { id: 'gasto', top: 'Lista de compras', sub: '8 para comprar' },
  { id: 'activo', top: 'Garantía PlayStation 5', sub: 'PDF · HomeCloud' },
  { id: 'recuerdo', top: 'Cumpleaños', sub: '24 fotos' },
]

function ContinuitySurface({ step }: { step: number }) {
  const active = step === 33
  return (
    <div className="cine-continuity-surface" data-on={active} aria-hidden={!active} style={homeVariables}>
      <HomeHeader showJuli />
      <main className="cine-continuity-workspace">
        <div className="cine-continuity-grid">
          {CONTINUITY_ITEMS.map((item, index) => (
            <div key={item.id} className="cine-continuity-chip" style={{ transitionDelay: `${index * 120}ms` }}>
              <p className="cine-continuity-top">{item.top}</p>
              <p className="cine-continuity-sub">{item.sub}</p>
            </div>
          ))}
        </div>
        <p className="cine-continuity-statement">
          <span>La vida no pasa por módulos.</span>
          <span className="cine-continuity-resolution">HomePlus los conecta.</span>
        </p>
      </main>
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
  const active = step === 34
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
  const active = step === 35
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
  const active = step === 36
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

export default function CineScene({ step }: { step: number }) {
  const home = step >= 8
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

      <PlannerSurface step={step} />
      <FamilyStory step={step} />
      <BirthdayPlanNode step={step} />
      <ShoppingAnchor step={step} />
      <InventorySurface step={step} />
      <FinanceSurface step={step} />
      <AssetsSurface step={step} />
      <CloudSurface step={step} />
      <MemoriesSurface step={step} />
      <ContinuitySurface step={step} />
      <StackSurface step={step} />
      <BarrierSurface step={step} />
      <ClosingSurface step={step} />

      {TRAVELERS.map((t) => {
        const p = t.at[step] ?? HIDDEN
        const taskFocus = t.id === 'task' && step === 10
        const taskPlanner = t.id === 'task' && step >= 11 && step <= 12
        const plannerRow = taskPlanner || (t.id === 'auth' && step >= 12 && step <= 13) || (t.id === 'ef' && step >= 13 && step <= 14)
        const width = step === 10 && t.spotlightW ? t.spotlightW
          : step === 11 && t.plannerW ? t.plannerW
            : step === 12 && t.p03W ? t.p03W
              : step === 13 && t.p04W ? t.p04W
                : step === 14 && t.p05W ? t.p05W
                  : home && t.homeW ? t.homeW : t.w
        const height = step === 10 && t.spotlightH ? t.spotlightH
          : step === 11 && t.plannerH ? t.plannerH
            : step === 12 && t.p03H ? t.p03H
              : step === 13 && t.p04H ? t.p04H
                : step === 14 && t.p05H ? t.p05H
                  : home && t.homeH ? t.homeH : t.h
        const style: CSSProperties = {
          width,
          height,
          transform: `translate(${p.x}px, ${p.y}px) scale(${p.s})`,
          transitionDelay: reducedMotion ? '0ms' : step === 12 && t.id === 'auth' ? '900ms' : `${t.delay}ms`,
        }
        return (
          <div key={t.id} className="cine-traveler" data-present={p.o === 1} data-node={t.id} data-focus={taskFocus} data-planner={plannerRow} style={style}>
            {t.renderBody ? t.renderBody(step) : t.body}
          </div>
        )
      })}

      <Chrome show={step >= 8 && step <= 10} className="cine-home-header" delay={520}><HomeHeaderCopy /></Chrome>
      <Chrome show={step >= 8 && step <= 10} className="cine-pill" delay={620}><span className="cine-pill-count">2</span><span>tareas pendientes</span></Chrome>
      <Chrome show={step >= 8 && step <= 10} className="cine-label cine-label-hoy" delay={620}>Hoy</Chrome>
      <Chrome show={step >= 8 && step <= 10} className="cine-label cine-label-prox" delay={620}>Mañana</Chrome>
      <Chrome show={step >= 8 && step <= 10} className="cine-strip" delay={820}>
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
      <Chrome show={step >= 8 && step <= 10} className="cine-nav" delay={1000}>
        {NAV_ICONS.map((name, i) => (
          <span key={name} className={`cine-nav-item${i === 0 ? ' cine-nav-active' : ''}`}>
            <HomeIcon name={name} size={25} />
          </span>
        ))}
      </Chrome>
    </>
  )
}
