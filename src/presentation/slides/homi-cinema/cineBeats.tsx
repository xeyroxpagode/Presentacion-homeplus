import CinePlanner, { CineTaskGroup, dualVariables } from './CinePlanner'
import {
  CHANGE_EVENT, CHANGE_REQUEST, COCA_TASK, PROPOSAL_TASK_DATE, PROPOSAL_TASK_TITLE,
  REQUEST_FULL, REQUEST_SEGMENTS, TODAY_TASKS,
} from './homiCinemaData'
import '../HomiDemoScreen/homi-screen.css'
import '../HomiDecisionDemoScreen/decision-screen.css'

// Piezas nombradas del contrato cinematográfico V3.1.
// Cada pieza renderiza su estado final estable; la coreografía de entrada
// vive en homi-cinema.css como animaciones `both` sobre el montaje.

export function HomiIdentity({ variant }: { variant: 'hero' | 'corner' }) {
  return (
    <div className="cine-identity" data-variant={variant} aria-label="Homi">
      <p className="cine-identity-word">Homi</p>
    </div>
  )
}

export function RequestFocus() {
  return (
    <div className="cine-request" aria-label={REQUEST_FULL}>
      <p className="cine-request-text">
        <span className="cine-seg-mask"><span className="cine-seg" data-seg="a">{REQUEST_SEGMENTS.conversational}&nbsp;</span></span>
        <span className="cine-seg-mask"><span className="cine-seg" data-seg="b">{REQUEST_SEGMENTS.connector} {REQUEST_SEGMENTS.dateWord}&nbsp;</span></span>
        <span className="cine-seg-mask"><span className="cine-seg" data-seg="c">{REQUEST_SEGMENTS.action}</span></span>
      </p>
    </div>
  )
}

// I04: la solicitud se transforma en propuesta (los datos viajan, lo
// conversacional se disuelve). Termina en la propuesta I05.
export function SemanticTextMorph() {
  return (
    <div className="cine-morph" aria-label={`Crear tarea: ${PROPOSAL_TASK_TITLE}, ${PROPOSAL_TASK_DATE}`}>
      <div className="cine-morph-container" aria-hidden="true" />
      <p className="cine-morph-conv" aria-hidden="true">{REQUEST_SEGMENTS.conversational} de</p>
      <p className="cine-morph-fly" data-fly="action" aria-hidden="true">{REQUEST_SEGMENTS.action.replace(/\.$/, '')}</p>
      <p className="cine-morph-fly" data-fly="date" aria-hidden="true">
        <span className="cine-morph-date-lower">{REQUEST_SEGMENTS.dateWord}</span>
        <span className="cine-morph-date-upper">{PROPOSAL_TASK_DATE}</span>
      </p>
      <ProposalFocus animated />
    </div>
  )
}

export function ProposalFocus({ animated = false }: { animated?: boolean }) {
  return (
    <div className="cine-proposal" data-animated={animated}>
      <p className="cine-proposal-header" data-part="header">Crear tarea</p>
      <span className="cine-proposal-divider" data-part="divider" aria-hidden="true" />
      <p className="cine-proposal-title" data-part="title">{PROPOSAL_TASK_TITLE}</p>
      <p className="cine-proposal-date" data-part="date">
        <svg className="cine-date-icon" data-part="date-icon" width="30" height="30" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x="3" y="5" width="18" height="16" rx="3" stroke="currentColor" strokeWidth="2" />
          <path d="M3 10h18M8 3v4M16 3v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <span data-part="date-text">{PROPOSAL_TASK_DATE}</span>
      </p>
      <div className="cine-proposal-actions" data-part="actions">
        <button type="button" className="homi-dismiss cine-btn" tabIndex={-1}>Cancelar</button>
        <button type="button" className="homi-confirm homi-decision-confirm cine-btn cine-btn-confirm" data-pressable tabIndex={-1}>Confirmar</button>
      </div>
    </div>
  )
}

// I06: confirmación + SharedTaskMorph + PlannerReveal en una sola secuencia.
export function ConfirmationBeat() {
  return (
    <div className="cine-hero" aria-label={`Confirmado: ${PROPOSAL_TASK_TITLE} en Planner`}>
      <div className="cine-hero-planner">
        <PlannerReveal focus="coca" reserveCoca animated />
      </div>
      <div className="cine-hero-proposal" aria-hidden="true">
        <ProposalFocus />
      </div>
      <div className="cine-shared" aria-hidden="true">
        <span className="cine-shared-check" />
        <span className="cine-shared-copy">
          <span className="cine-shared-title">{PROPOSAL_TASK_TITLE}</span>
          <span className="cine-shared-date">{PROPOSAL_TASK_DATE}</span>
        </span>
        <span className="cine-shared-chevron" />
      </div>
    </div>
  )
}

export function SharedTaskMorph() {
  return <ConfirmationBeat />
}

export function PlannerReveal({ focus, reserveCoca = false, animated = false, dimmed = false }: {
  focus: 'all' | 'today' | 'tomorrow' | 'coca'
  reserveCoca?: boolean
  animated?: boolean
  dimmed?: boolean
}) {
  return (
    <div className="cine-planner-frame" data-animated={animated}>
      <CinePlanner
        today={TODAY_TASKS}
        tomorrow={[COCA_TASK]}
        focus={focus}
        dimmed={dimmed}
        hiddenRowId={reserveCoca ? COCA_TASK.id : undefined}
      />
    </div>
  )
}

// I08: la interfaz visual sigue siendo valiosa (mirar → comparar → control).
export function PlannerFocusCamera() {
  return (
    <div className="cine-window" aria-label="Planner: mirar, comparar, control visual">
      <div className="cine-window-inner">
        <PlannerReveal focus="all" />
      </div>
      <span className="cine-camera-focus" data-lane="today" aria-hidden="true" />
      <span className="cine-camera-focus" data-lane="tomorrow" aria-hidden="true" />
    </div>
  )
}

// I09: dos formas de interactuar con el mismo sistema (mismo dato).
export function DualInteractionComposition() {
  return (
    <div className="cine-dual" aria-label="Dos formas de interactuar con el mismo sistema">
      <p className="cine-dual-tag">Homi</p>
      <div className="cine-dual-message">
        <p>“{REQUEST_FULL}”</p>
      </div>
      <p className="cine-dual-tag">Planner</p>
      <div className="cine-dual-row">
        <CineTaskGroup label="" tasks={[COCA_TASK]} variables={dualVariables} />
      </div>
    </div>
  )
}

export function ChangeComparison({ dimmed = false }: { dimmed?: boolean }) {
  return (
    <div className="cine-change" data-dimmed={dimmed} aria-label={`${CHANGE_EVENT.title}: actual ${CHANGE_EVENT.currentDay}, propuesto ${CHANGE_EVENT.proposedDay}`}>
      <div className="cine-change-body">
        <p className="cine-change-header">{CHANGE_EVENT.title}</p>
        <div className="cine-change-cols">
          <div className="cine-change-col" data-side="current">
            <p className="cine-change-kicker">Actual</p>
            <p className="cine-change-day">{CHANGE_EVENT.currentDay}</p>
            <p className="cine-change-hour">{CHANGE_EVENT.hour}</p>
          </div>
          <div className="cine-change-col" data-side="proposed">
            <p className="cine-change-kicker">Propuesto</p>
            <p className="cine-change-day">{CHANGE_EVENT.proposedDay}</p>
            <p className="cine-change-hour">{CHANGE_EVENT.hour}</p>
          </div>
        </div>
      </div>
      <div className="cine-change-actions">
        <button type="button" className="homi-dismiss cine-btn" tabIndex={-1}>Cancelar</button>
        <button type="button" className="homi-confirm homi-decision-confirm cine-btn" tabIndex={-1}>Confirmar</button>
      </div>
    </div>
  )
}

// I10: segunda intención (preparación breve, sin morph palabra por palabra).
export function ChangeRequest() {
  return (
    <div className="cine-request cine-request-change" aria-label={CHANGE_REQUEST}>
      <p className="cine-request-text">{CHANGE_REQUEST}</p>
    </div>
  )
}

// I12: control humano — el cuerpo pierde presencia, los botones no.
export function HumanDecisionFocus() {
  return <ChangeComparison dimmed />
}

export function BlackHandoff() {
  return <div className="cine-black" aria-label="Fin de la intervención" />
}
