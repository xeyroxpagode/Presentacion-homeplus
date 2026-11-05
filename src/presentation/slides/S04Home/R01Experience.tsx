import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import './r01-experience.css'
import { birthdayPlan, plannerWeek, schoolEvent } from '../../app-screens/PlannerDemoScreen/plannerData'
// Reuse the exact HomePlus brand asset already used in S03; no fake icon or base64.
import homePlusOriginalLogo from '../../../../assets/07a9c99e-dd9f-4b8b-a7dc-2453e6935ca2.png'

type IconName = 'home' | 'family' | 'calendar' | 'chat' | 'bell' | 'down' | 'right' | 'plus' | 'more' | 'bag' | 'check' | 'repeat' | 'clock' | 'flag'

function Icon({ name, className = '' }: { name: IconName; className?: string }) {
  const paths: Record<IconName, ReactNode> = {
    home: <path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z" />,
    family: <><circle cx="9" cy="8" r="3" /><path d="M3 20v-2a6 6 0 0 1 12 0v2M17 5a3 3 0 0 1 0 6M18 14a5 5 0 0 1 4 5v1" /></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M7 3v4M17 3v4M3 10h18" /></>,
    chat: <path d="M21 11.5a8.5 8.5 0 0 1-8.5 8.5H5l-2 2v-7.5A8.5 8.5 0 1 1 21 11.5z" />,
    bell: <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4" />,
    down: <path d="m6 9 6 6 6-6" />,
    right: <path d="m9 5 7 7-7 7" />,
    plus: <path d="M12 5v14M5 12h14" />,
    more: <><circle cx="5" cy="12" r="1" fill="currentColor" /><circle cx="12" cy="12" r="1" fill="currentColor" /><circle cx="19" cy="12" r="1" fill="currentColor" /></>,
    bag: <path d="M4 8h16l-1 13H5L4 8zM9 9V6a3 3 0 0 1 6 0v3" />,
    check: <><rect x="3" y="3" width="18" height="18" rx="4" /><path d="m7.5 12 3 3 6-6" /></>,
    repeat: <path d="m17 2 4 4-4 4M3 11V9a3 3 0 0 1 3-3h15M7 22l-4-4 4-4M21 13v2a3 3 0 0 1-3 3H3" />,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    flag: <path d="M5 21V4M5 5c5-4 9 4 15 0v11c-6 4-10-4-15 0" />,
  }
  return <svg className={`r01-icon ${className}`} viewBox="0 0 24 24" aria-hidden="true">{paths[name]}</svg>
}

type RowData = {
  title: string
  detail: string
  kind?: 'task' | 'event'
  status?: string
}

function RowBody({ data }: { data: RowData }) {
  return <>
    {data.kind === 'event' ? <span className="r01-eventmark" /> : <span className="r01-check" />}
    <span className="r01-item-copy"><strong>{data.title}</strong><small>{data.detail}</small></span>
    {data.status && <span className="r01-status">{data.status}</span>}
    <Icon name="right" className="r01-chevron" />
  </>
}

function PairRow({ general, personal, delay = 0, focusRef }: { general: RowData; personal: RowData; delay?: number; focusRef?: (el: HTMLDivElement | null) => void }) {
  return <div className="r01-pair" ref={focusRef}>
    <div className="r01-variant r01-general" style={{ '--r01-delay': `${delay}ms` } as CSSProperties}><RowBody data={general} /></div>
    <div className="r01-variant r01-personal" style={{ '--r01-delay': `${delay}ms` } as CSSProperties}><RowBody data={personal} /></div>
  </div>
}

function CompactBody({ icon, title, subtitle }: { icon: IconName; title: string; subtitle: string }) {
  return <><span className="r01-mini-icon"><Icon name={icon} /></span><span className="r01-item-copy"><strong>{title}</strong><small>{subtitle}</small></span><Icon name="right" className="r01-chevron" /></>
}

function PairCompact({ icon, general, personal, delay }: { icon: IconName; general: [string,string]; personal: [string,string]; delay: number }) {
  return <div className="r01-pair r01-mini-pair">
    <div className="r01-variant r01-general" style={{ '--r01-delay': `${delay}ms` } as CSSProperties}><CompactBody icon={icon} title={general[0]} subtitle={general[1]} /></div>
    <div className="r01-variant r01-personal" style={{ '--r01-delay': `${delay}ms` } as CSSProperties}><CompactBody icon={icon} title={personal[0]} subtitle={personal[1]} /></div>
  </div>
}

const FOCUS_DATA: Record<number, RowData> = {
  2: { title: 'Educación Física', detail: 'Lunes 17 · Mañana', kind: 'event' },
  3: { title: 'Llevar autorización', detail: 'Juli · Hoy', status: 'Pendiente' },
  4: { title: 'Tarea de Matemática', detail: 'Juli · Hoy', status: 'Pendiente' },
}

const SCRIPT_BEATS = [
  '00 · Home general',
  '01 · Juli, 10 años',
  '02 · Educación Física',
  '03 · Llevar autorización',
  '04 · Tarea de Matemática',
  '05 · Conclusión de Juli',
  '06 · Entrada a Planner',
] as const

/**
 * R01 V9 — approved manual beats, self-contained at the existing 1280×720 stage.
 * Navigation is owned by Presentation; this component never registers keys or
 * auto-advances. All three focus spots are fixed in place and use independent
 * opacity / scale / glow, not a translating spotlight.
 */
export default function R01Experience({ beat, plannerView }: { beat: number; plannerView?: number }) {
  const [shownPlannerView, setShownPlannerView] = useState(plannerView)
  const [plannerFocused, setPlannerFocused] = useState(false)
  const visiblePlannerView = plannerView === undefined ? undefined : shownPlannerView ?? plannerView

  useEffect(() => {
    setPlannerFocused(false)
    if (plannerView === undefined || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShownPlannerView(plannerView)
      setPlannerFocused(plannerView !== undefined)
      return
    }

    // Let the old card settle, then give the new view time at full scale.
    const zoomOutMs = 320
    const overviewMs = 480
    const changeView = window.setTimeout(() => setShownPlannerView(plannerView), zoomOutMs)
    const focusCard = window.setTimeout(() => setPlannerFocused(true), zoomOutMs + overviewMs)
    return () => {
      window.clearTimeout(changeView)
      window.clearTimeout(focusCard)
    }
  }, [plannerView])

  const root = useRef<HTMLDivElement | null>(null)
  // Entry plays once per mount (S03 → S04.00), never on later internal beats.
  const entryAtMount = useRef(beat === 0)
  const focusSources = useRef<Record<number, HTMLDivElement | null>>({})
  const spots = useRef<Record<number, HTMLDivElement | null>>({})
  const previousBeat = useRef(beat)
  const [heroLeaving, setHeroLeaving] = useState(false)
  const [illuminated, setIlluminated] = useState<number | null>(beat >= 2 && beat <= 4 ? beat : null)
  const [heroLive, setHeroLive] = useState(beat === 1)

  useLayoutEffect(() => {
    const stage = root.current
    if (!stage) return

    // Layout offsets instead of client rects: `PresentationFrame` mounts with
    // scale(0) and only sets the real scale in its own layout effect, so a
    // cold load would otherwise measure every card as 0×0.
    const withinStage = (el: HTMLElement) => {
      let x = 0
      let y = 0
      let node: HTMLElement | null = el
      while (node && node !== stage) {
        x += node.offsetLeft
        y += node.offsetTop
        node = node.offsetParent as HTMLElement | null
      }
      if (node === stage) return { x, y, w: el.offsetWidth, h: el.offsetHeight }
      // Fallback for an offsetParent chain that leaves the stage.
      const base = stage.getBoundingClientRect()
      const scale = base.width / 1280 || 1
      const r = el.getBoundingClientRect()
      return {
        x: (r.left - base.left) / scale,
        y: (r.top - base.top) / scale,
        w: r.width / scale,
        h: r.height / scale,
      }
    }

    const moveToSources = () => {
      for (const id of [2,3,4]) {
        const source = focusSources.current[id]
        const target = spots.current[id]
        if (!source || !target) continue
        const r = withinStage(source)
        if (!r.w || !r.h) continue
        target.style.left = `${r.x - 2}px`
        target.style.top = `${r.y - 2}px`
        target.style.width = `${r.w + 4}px`
        target.style.height = `${r.h + 4}px`
      }
    }

    moveToSources()
    // Re-measure once the presentation frame has applied its scale, and again
    // when the DM Sans face finishes loading (text metrics can shift).
    const raf = window.requestAnimationFrame(moveToSources)
    document.fonts?.ready.then(moveToSources).catch(() => {})
    window.addEventListener('resize', moveToSources)
    return () => {
      window.cancelAnimationFrame(raf)
      window.removeEventListener('resize', moveToSources)
    }
  }, [])

  useEffect(() => {
    const previous = previousBeat.current
    previousBeat.current = beat
    const timers: number[] = []
    if (beat === 1) {
      setIlluminated(null)
      setHeroLeaving(false)
      setHeroLive(true)
    } else if (previous === 1 && beat >= 2 && beat <= 5) {
      // First restore Juli to her header slot, then let the selected card glow.
      setHeroLeaving(true)
      setIlluminated(null)
      timers.push(window.setTimeout(() => setHeroLive(false), 590))
      if (beat >= 2 && beat <= 4) timers.push(window.setTimeout(() => setIlluminated(beat), 470))
    } else {
      setHeroLeaving(false)
      setHeroLive(false)
      // A short, deliberate darkness-to-light crossfade between independent cards.
      if (beat >= 2 && beat <= 4 && previous >= 2 && previous <= 4 && previous !== beat) {
        setIlluminated(null)
        timers.push(window.setTimeout(() => setIlluminated(beat), 150))
      } else {
        setIlluminated(beat >= 2 && beat <= 4 ? beat : null)
      }
    }
    return () => timers.forEach(timer => window.clearTimeout(timer))
  }, [beat])

  const personalized = beat >= 1
  const plannerActive = beat === 6
  const plannerTab = visiblePlannerView === undefined || visiblePlannerView < 2 ? 'Tareas' : visiblePlannerView < 4 ? 'Calendario' : 'Planes'
  const focusActive = beat >= 2 && beat <= 4

  return <div
    className={`r01-stage${personalized ? ' r01-personalized' : ''}${plannerActive ? ' r01-planner-active' : ''}${entryAtMount.current ? ' r01-entry-reveal' : ''}`}
    data-r01-beat={beat}
    ref={root}
    role="group"
    aria-label={plannerView === undefined ? `HomePlus R01: ${SCRIPT_BEATS[beat] ?? SCRIPT_BEATS[0]}` : 'HomePlus Planner'}
  >
    <header className="r01-topbar">
      <div className="r01-identity">
        <div className="r01-identity-row r01-general"><img className="r01-brand-logo" src={homePlusOriginalLogo} alt="" aria-hidden="true" /><strong>HomePlus</strong></div>
        <div className="r01-identity-row r01-personal"><span className="r01-j-avatar">J</span><strong>Juli</strong></div>
      </div>
      <div className="r01-family-name">Familia García <Icon name="down" /></div>
      <div className="r01-top-actions"><Icon name="chat" /><Icon name="bell" /></div>
    </header>

    <main className="r01-home" aria-hidden={plannerActive}>
      <div className="r01-hello">
        <div className="r01-hello-variant r01-general"><strong>Hola, familia</strong><span>Bienvenidos a casa</span></div>
        <div className="r01-hello-variant r01-personal"><strong>Hola, Juli</strong><span>10 años</span></div>
      </div>
      <div className="r01-date">Domingo 16 de agosto</div>
      <div className="r01-columns">
        <div className="r01-stack">
          <section>
            <h2 className="r01-section-label">NECESITA ATENCIÓN</h2>
            <div className="r01-card">
              <PairRow
                general={{ title: 'Confirmar turno médico', detail: 'Familia · Hoy', status: 'Pendiente' }}
                personal={FOCUS_DATA[3]}
                delay={90}
                focusRef={el => {focusSources.current[3] = el}}
              />
              <PairRow
                general={{ title: 'Revisar compras pendientes', detail: 'Hogar · Hoy', status: 'Pendiente' }}
                personal={FOCUS_DATA[4]}
                delay={160}
                focusRef={el => {focusSources.current[4] = el}}
              />
            </div>
          </section>
          <section>
            <h2 className="r01-section-label">PRÓXIMAMENTE</h2>
            <div className="r01-card">
              <PairRow
                general={{ title: 'Reunión del colegio', detail: 'Lunes 17 · Familia', kind: 'event' }}
                personal={FOCUS_DATA[2]}
                delay={230}
                focusRef={el => {focusSources.current[2] = el}}
              />
            </div>
          </section>
        </div>
        <div className="r01-stack">
          <section>
            <h2 className="r01-section-label">HOY</h2>
            <div className="r01-card"><PairCompact icon="calendar" general={['4 actividades del hogar','Para organizar entre todos']} personal={['2 actividades del hogar','Organizadas para hoy']} delay={140} /></div>
          </section>
          <section>
            <h2 className="r01-section-label">COMPRAS</h2>
            <div className="r01-card"><PairCompact icon="bag" general={['Lista compartida','3 productos por comprar']} personal={['Lista de compras','3 productos pendientes']} delay={210} /></div>
          </section>
          <section>
            <h2 className="r01-section-label">QUÉ CAMBIÓ</h2>
            <div className="r01-card"><PairCompact icon="bell" general={['Se actualizó un horario','Actividad de la familia']} personal={['Se agregó una tarea','Hoy · Familia García']} delay={290} /></div>
          </section>
        </div>
      </div>
    </main>

    <main className="r01-planner" data-sequence={visiblePlannerView !== undefined} data-spotlight={visiblePlannerView !== undefined && plannerFocused} aria-hidden={!plannerActive}>
      <div className="r01-planner-heading"><Icon name="calendar" /><strong>Planner</strong></div>
      <div className="r01-tabs" data-section={plannerTab}>
        {([['check','Tareas'],['calendar','Calendario'],['flag','Planes']] as const).map(([icon,label])=>
          <div key={label} className={`r01-tab${label === plannerTab ? ' r01-tab-active' : ''}`} aria-current={label === plannerTab ? 'true' : undefined}><Icon name={icon} />{label}</div>
        )}
      </div>
      {plannerTab !== 'Planes' && (
        <div className="r01-planner-subviews" aria-label={`Vistas de ${plannerTab}`}>
          {(plannerTab === 'Tareas' ? ['Pendientes', 'Responsabilidades'] : ['Eventos', 'Horarios']).map((label, index) =>
            <span key={label} aria-current={index === (visiblePlannerView ?? 0) % 2 ? 'true' : undefined}>{label}</span>
          )}
        </div>
      )}
      {visiblePlannerView === undefined || visiblePlannerView === 0 ? <div className="r01-planner-grid">
        <section className="r01-planner-card">
          <div className="r01-planner-card-head"><strong>Tareas pendientes</strong><span className="r01-count">2 pendientes</span></div>
          {([FOCUS_DATA[3],FOCUS_DATA[4]]).map(data=><div className="r01-planner-row" key={data.title}><span className="r01-check" /><span className="r01-item-copy"><strong>{data.title}</strong><small>Asignada a Juli · Hoy</small></span><span className="r01-status">Pendiente</span></div>)}
        </section>
        <section className="r01-planner-card">
          <div className="r01-planner-card-head"><strong>Próximamente</strong><span className="r01-count">Mañana</span></div>
          <div className="r01-planner-row"><span className="r01-eventmark"/><span className="r01-item-copy"><strong>Educación Física</strong><small>Lunes 17 de agosto · Colegio</small></span><Icon name="right" className="r01-chevron" /></div>
          <div className="r01-planner-note"><Icon name="calendar" />Tareas, eventos y rutinas en un mismo lugar.</div>
        </section>
      </div> : <PlannerView key={visiblePlannerView} view={visiblePlannerView} />}
    </main>

    <nav className="r01-nav" aria-label="Navegación representada de HomePlus">
      <span className={`r01-nav-item${!plannerActive?' r01-nav-active':''}`}><Icon name="home" /></span>
      <span className="r01-nav-item"><Icon name="family" /></span>
      <span className="r01-nav-item r01-nav-plus"><Icon name="plus" /></span>
      <span className={`r01-nav-item${plannerActive?' r01-nav-active':''}`}><Icon name="calendar" /></span>
      <span className="r01-nav-item"><Icon name="more" /></span>
    </nav>

    <div className={`r01-global-dim${focusActive ? ' r01-is-dim' : ''}`} aria-hidden="true" />
    <div className="r01-spot-layer" aria-hidden="true">
      {([2,3,4] as const).map(id=><div
        data-spot={id}
        className={`r01-spot${illuminated===id?' r01-lit':''}`}
        key={id}
        ref={el=>{spots.current[id]=el}}
      ><div className="r01-spot-face"><div className="r01-spot-content"><RowBody data={FOCUS_DATA[id]}/></div></div></div>)}
    </div>
    <div className={`r01-hero-dim${heroLive && !heroLeaving?' r01-hero-on':''}`} aria-hidden="true" />
    {heroLive && <div className={`r01-hero${heroLeaving?' r01-hero-leaving':' r01-hero-on'}`} aria-hidden="true">
      <div className="r01-hero-j">J</div>
      <div className="r01-hero-label"><strong>Juli</strong><span>10 años</span></div>
    </div>}
  </div>
}

function PlannerCard({ title, badge, children }: { title: string; badge: string; children: ReactNode }) {
  return <section className="r01-planner-card">
    <div className="r01-planner-card-head"><strong>{title}</strong><span className="r01-count">{badge}</span></div>
    {children}
  </section>
}

function PlannerRow({ icon, title, detail, badge }: { icon: IconName; title: string; detail: string; badge?: string }) {
  return <div className="r01-planner-row">
    <span className="r01-mini-icon"><Icon name={icon} /></span>
    <span className="r01-item-copy"><strong>{title}</strong><small>{detail}</small></span>
    {badge && <span className="r01-status">{badge}</span>}
  </div>
}

function PlannerView({ view }: { view: number }) {
  const weekdays = view === 3
  const week = <div className="r01-planner-week" aria-label={weekdays ? 'De lunes a viernes' : 'Semana del 17 al 23 de agosto'}>
    {plannerWeek.map(({ number }, index) => <div key={number} data-highlight={weekdays ? index < 5 : number === schoolEvent.day}>
      <span>{['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'][index]}</span>
      <strong>{weekdays ? (index < 5 ? '✓' : '—') : number}</strong>
    </div>)}
  </div>

  return <div className="r01-planner-grid r01-planner-content" data-focus-side={weekdays ? 'right' : 'left'}>
    {view === 1 && <>
      <PlannerCard title="Responsabilidades de Juli" badge="2 rutinas">
        <PlannerRow icon="repeat" title="Preparar la mochila" detail="Juli · Antes de ir al colegio" badge="Lun a vie" />
        <PlannerRow icon="repeat" title="Poner la mesa" detail="Juli · Antes de cenar" badge="Cada día" />
      </PlannerCard>
      <PlannerCard title="Cómo se repiten" badge="Semana">
        <PlannerRow icon="calendar" title="Preparar la mochila" detail="Lunes, martes, miércoles, jueves y viernes" />
        <PlannerRow icon="clock" title="Poner la mesa" detail="De lunes a domingo" />
      </PlannerCard>
    </>}
    {(view === 2 || view === 3) && <>
      <PlannerCard title={weekdays ? 'Semana habitual' : 'Calendario semanal'} badge={weekdays ? 'Lun a vie' : '17–23 ago'}>
        {week}
        <PlannerRow icon={weekdays ? 'repeat' : 'calendar'} title={weekdays ? 'Colegio' : schoolEvent.title}
          detail={weekdays ? 'Juli · 07:30–13:30' : 'Juli · Colegio'} badge={weekdays ? 'Semanal' : 'Lun 17'} />
      </PlannerCard>
      {weekdays ? <PlannerCard title="Horarios del hogar" badge="Recurrentes">
        <PlannerRow icon="clock" title="Colegio" detail="Juli · 07:30–13:30" badge="Lun a vie" />
        <PlannerRow icon="clock" title="Trabajo" detail="Papá · 09:00–17:00" badge="Lun a vie" />
      </PlannerCard> : <PlannerCard title="Agenda familiar" badge="Esta semana">
        <PlannerRow icon="calendar" title={schoolEvent.title} detail="Juli · Colegio" badge="Lun 17" />
        <PlannerRow icon="calendar" title={birthdayPlan.title} detail="Familia · En casa" badge="Sáb 22" />
      </PlannerCard>}
    </>}
    {view === 4 && <>
      <PlannerCard title={birthdayPlan.title} badge="Sáb 22">
        <PlannerRow icon="check" title="Confirmar invitados" detail="Mamá" badge="Listo" />
        <PlannerRow icon="flag" title="Preparar la mesa" detail="Juli y Tomi" badge="Pendiente" />
        <PlannerRow icon="bag" title="Comprar lo que falta" detail="Papá" badge="Pendiente" />
      </PlannerCard>
      <PlannerCard title="Avance del plan" badge="1 de 3">
        <div className="r01-plan-progress">
          <progress aria-label="Pasos completados" value={1} max={3} />
          <strong>Un paso listo, dos por hacer</strong>
        </div>
        <PlannerRow icon="calendar" title="Evento vinculado" detail="Cumpleaños · Sábado 22 de agosto" />
      </PlannerCard>
    </>}
  </div>
}
