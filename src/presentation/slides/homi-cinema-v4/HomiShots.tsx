// HOMI V4.2 — HomiShots: adaptación escénica de los componentes de demo de Homi.
// Nativos reutilizados (sin cambios de anatomía, tokens, iconografía):
//   HomeHeader (oculto por homi-screen.css como en el producto demo),
//   homi-mark.svg, .homi-assistant-bar, .homi-thread, .homi-user-bubble,
//   .homi-proposal, .homi-decision-row, .homi-confirm, .homi-dismiss,
//   .homi-done, .homi-composer.
// Adaptación escénica (documentada, no es un componente funcional de producción):
//   el contenido de propuesta de creación de tarea (Coca) y de modificación
//   (Cumple de Juli) se parametriza dentro de esas piezas. El proyecto solo
//   contiene demos con el entrenamiento de Tomi; ese mensaje no se reutiliza.

import type { CSSProperties, ReactNode } from 'react'
import homiMark from '../../assets/illustrations/homi-mark.svg'
import { homeVariables } from '../../app-screens/HomeDemoScreen/homeTokens'
import '../../app-screens/HomeDemoScreen/home-screen.css'
import '../../app-screens/HomiDemoScreen/homi-screen.css'
import '../../app-screens/HomiDecisionDemoScreen/decision-screen.css'
import { CHANGE_EVENT, CHANGE_REQUEST, PROPOSAL_TASK_DATE, PROPOSAL_TASK_TITLE, REQUEST_FULL } from './homiV4Data'

function HomiShell({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="home-demo-screen homi-demo-screen h4-homi-surface" style={homeVariables} aria-label={label}>
      <div className="homi-assistant-bar">
        <img src={homiMark} alt="" aria-hidden="true" width={40} height={40} draggable={false} />
        <div className="homi-assistant-copy">
          <p className="homi-assistant-name">Homi</p>
          <p className="homi-assistant-sub">Asistente del hogar</p>
        </div>
      </div>
      <div className="homi-thread">{children}</div>
      <div className="homi-composer" aria-hidden="true">
        <span className="homi-composer-hint">Pedile algo a Homi…</span>
        <span className="homi-send" />
      </div>
    </div>
  )
}

function UserBubble({ text, compact = false }: { text: string; compact?: boolean }) {
  return (
    <div className="homi-user-bubble h4-always" data-present="true" data-compact={compact} aria-label={text}>
      <p>{text}</p>
    </div>
  )
}

function DecisionRow() {
  return (
    <div className="homi-decision-row h4-always" data-present="true">
      <button type="button" className="homi-dismiss" tabIndex={-1}>Cancelar</button>
      <button type="button" className="homi-confirm homi-decision-confirm" data-pressable tabIndex={-1}>Confirmar</button>
    </div>
  )
}

// T01 — identidad hero, 84px, nada más.
export function HomiHero() {
  return (
    <div className="h4-hero" aria-label="Homi">
      <p className="h4-hero-word">Homi</p>
    </div>
  )
}

// T03 — Homi preparado: estado neutral auténtico, sin Coca todavía.
export function HomiReady() {
  return (
    <HomiShell label="Homi, asistente de HomePlus">
      <div className="homi-greeting h4-always" data-present="true">
        <p>¿En qué te ayudo?</p>
      </div>
    </HomiShell>
  )
}

// T04 — solicitud natural protagonista dentro de la conversación.
export function HomiRequest() {
  return (
    <HomiShell label={REQUEST_FULL}>
      <UserBubble text={REQUEST_FULL} />
    </HomiShell>
  )
}

// T05 — solicitud reencuadrada + propuesta pendiente (nada confirmado).
export function HomiProposalCoca() {
  return (
    <HomiShell label={`Crear tarea: ${PROPOSAL_TASK_TITLE}, ${PROPOSAL_TASK_DATE}`}>
      <UserBubble text={REQUEST_FULL} compact />
      <div className="homi-proposal h4-always h4-proposal-coca" data-present="true">
        <p className="h4-proposal-kicker">Crear tarea</p>
        <span className="h4-proposal-divider" aria-hidden="true" />
        <p className="h4-proposal-title">{PROPOSAL_TASK_TITLE}</p>
        <p className="h4-proposal-date">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <rect x="3" y="5" width="18" height="16" rx="3" stroke="currentColor" strokeWidth="2" />
            <path d="M3 10h18M8 3v4M16 3v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <span>{PROPOSAL_TASK_DATE}</span>
        </p>
      </div>
      <DecisionRow />
    </HomiShell>
  )
}

// T08 — regreso posterior a la confirmación: la propuesta ya no está
// pendiente, no se reactiva Confirmar ni se reenvía la solicitud.
export function HomiAfterConfirm() {
  return (
    <HomiShell label="Homi: tarea confirmada en Planner">
      <UserBubble text={REQUEST_FULL} compact />
      <div className="homi-done h4-always" data-present="true">
        <span className="homi-check" aria-hidden="true" />
        <div className="homi-done-copy">
          <p className="homi-done-title">Confirmado</p>
          <p className="homi-done-sub">Tarea creada en Planner · Mañana</p>
        </div>
      </div>
    </HomiShell>
  )
}

// T09 izquierda — recorte conversacional sin botones pendientes.
export function HomiGlimpse() {
  return (
    <HomiShell label="Homi: conversación original">
      <UserBubble text={REQUEST_FULL} compact />
      <div className="homi-done h4-always" data-present="true">
        <span className="homi-check" aria-hidden="true" />
        <div className="homi-done-copy">
          <p className="homi-done-title">Confirmado</p>
          <p className="homi-done-sub">Tarea creada en Planner · Mañana</p>
        </div>
      </div>
    </HomiShell>
  )
}

// T10 — nueva solicitud importante, sin propuesta todavía.
export function HomiImportantRequest() {
  return (
    <HomiShell label={CHANGE_REQUEST}>
      <UserBubble text={CHANGE_REQUEST} />
    </HomiShell>
  )
}

// T11 — propuesta importante pendiente: actual y propuesto coexisten,
// ninguna acción se ejecuta.
export function HomiImportantProposal() {
  return (
    <HomiShell label={`${CHANGE_EVENT.title}: actual ${CHANGE_EVENT.currentDay}, propuesto ${CHANGE_EVENT.proposedDay}`}>
      <UserBubble text={CHANGE_REQUEST} compact />
      <div className="homi-proposal h4-always h4-change" data-present="true">
        <p className="h4-proposal-kicker">{CHANGE_EVENT.title}</p>
        <span className="h4-proposal-divider" aria-hidden="true" />
        <div className="h4-change-cols">
          <div className="h4-change-col" data-side="current">
            <p className="h4-change-kicker">Actual</p>
            <p className="h4-change-day">{CHANGE_EVENT.currentDay}</p>
            <p className="h4-change-hour">{CHANGE_EVENT.hour}</p>
          </div>
          <div className="h4-change-col" data-side="proposed">
            <p className="h4-change-kicker">Propuesto</p>
            <p className="h4-change-day">{CHANGE_EVENT.proposedDay}</p>
            <p className="h4-change-hour">{CHANGE_EVENT.hour}</p>
          </div>
        </div>
      </div>
      <DecisionRow />
    </HomiShell>
  )
}

export const homiSurfaceStyle = (extra?: CSSProperties): CSSProperties => ({ ...homeVariables, ...extra })
