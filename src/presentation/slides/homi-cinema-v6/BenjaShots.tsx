// HOMI V6 — Superficies Benja (P01–P19).
// Adaptadores de sólo presentación: reutilizan anatomía y clases nativas
// (.homi-*, PlannerDemoScreen, FrictionEcho) sin alterar producción.
// Toda ampliación tipográfica vive bajo el scope `.v6-stage`.

import homiMark from '../../assets/illustrations/homi-mark.svg'
import { homeVariables } from '../../app-screens/HomeDemoScreen/homeTokens'
import PlannerDemoScreen from '../../app-screens/PlannerDemoScreen'
import '../../app-screens/HomeDemoScreen/home-screen.css'
import '../../app-screens/HomiDemoScreen/homi-screen.css'
import '../../app-screens/HomiDecisionDemoScreen/decision-screen.css'
import '../../app-screens/PlannerDemoScreen/planner-screen.css'
import FrictionEcho from '../homi-cinema-v4/FrictionEcho'
import {
  COCA_GROUPS, COCA_MESSAGE_FULL, COCA_OP_KIND, COCA_TASK_TITLE, D1_LABEL, D1_SHORT,
  PLANNER_AFTER_CONFIRM,
} from './homiV6Data'
import type { CSSProperties, ReactNode } from 'react'

export { FrictionEcho }

// Escala editorial por superficie (amplificación sin deformar: solo tokens).
function surfaceVars(title: string, secondary: string, mark: string): CSSProperties {
  return {
    ...homeVariables,
    '--home-title-size': title,
    '--home-secondary-size': secondary,
    '--task-mark-size': mark,
  } as CSSProperties
}

export const V6_HOMI_VARS = surfaceVars('27px', '21px', '30px')
export const V6_PLANNER_VARS = surfaceVars('26px', '20px', '28px')

function HomiShell({ label, vars, children, composer }: {
  label: string
  vars?: CSSProperties
  children: ReactNode
  composer?: ReactNode
}) {
  return (
    <div className="home-demo-screen homi-demo-screen v6-homi-surface" style={vars ?? V6_HOMI_VARS} aria-label={label}>
      <div className="homi-assistant-bar">
        <img src={homiMark} alt="" aria-hidden="true" width={40} height={40} draggable={false} />
        <div className="homi-assistant-copy">
          <p className="homi-assistant-name">Homi</p>
          <p className="homi-assistant-sub">Asistente del hogar</p>
        </div>
      </div>
      <div className="homi-thread">{children}</div>
      {composer ?? (
        <div className="homi-composer" aria-hidden="true">
          <span className="homi-composer-hint">Pedile algo a Homi…</span>
          <span className="homi-send" />
        </div>
      )}
    </div>
  )
}

function UserBubble({ text, compact = false }: { text: string; compact?: boolean }) {
  return (
    <div className="homi-user-bubble v6-present" data-compact={compact} aria-label={text}>
      <p>{text}</p>
    </div>
  )
}

function ProposalCard() {
  return (
    <div className="homi-proposal v6-present v6-proposal" aria-label={`${COCA_OP_KIND}: ${COCA_TASK_TITLE}, ${D1_SHORT}`}>
      <p className="v6-proposal-kicker">{COCA_OP_KIND}</p>
      <span className="v6-proposal-divider" aria-hidden="true" />
      <p className="v6-proposal-title">{COCA_TASK_TITLE}</p>
      <p className="v6-proposal-date">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x="3" y="5" width="18" height="16" rx="3" stroke="currentColor" strokeWidth="2" />
          <path d="M3 10h18M8 3v4M16 3v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <span>{D1_SHORT} · <span className="v6-proposal-date-sub">lun 17 de agosto</span></span>
      </p>
    </div>
  )
}

function DecisionRow({ pressed = false }: { pressed?: boolean }) {
  return (
    <div className="homi-decision-row v6-present" data-pressed={pressed}>
      <button type="button" className="homi-dismiss" tabIndex={-1}>Cancelar</button>
      <button type="button" className="homi-confirm homi-decision-confirm" data-pressable={pressed} tabIndex={-1}>Confirmar</button>
    </div>
  )
}

/** P01: Homi centrado, estado neutral. El formulario sale en la composición. */
export function V6HomiReady() {
  return (
    <HomiShell label="Homi, asistente de HomePlus">
      <div className="homi-greeting v6-present">
        <p>¿En qué te ayudo?</p>
      </div>
    </HomiShell>
  )
}

/** P03: composer con foco + cursor visual, sin mensajes nuevos. */
export function V6HomiFocused() {
  return (
    <HomiShell
      label="Homi, asistente de HomePlus"
      composer={(
        <div className="homi-composer v6-composer-focus" aria-hidden="true">
          <span className="homi-composer-hint">Pedile algo a Homi…</span>
          <span className="v6-caret" />
          <span className="homi-send" />
        </div>
      )}
    >
      <div className="homi-greeting v6-present">
        <p>¿En qué te ayudo?</p>
      </div>
    </HomiShell>
  )
}

/** P04: pedido Coca por grupos en el composer; la burbuja enviada sube al hilo. */
export function V6HomiRequest() {
  return (
    <HomiShell label={COCA_MESSAGE_FULL}>
      <div className="v6-sent-bubble" aria-label={COCA_MESSAGE_FULL}>
        <div className="homi-user-bubble v6-present">
          <p>{COCA_MESSAGE_FULL}</p>
        </div>
      </div>
    </HomiShell>
  )
}

/** Texto del composer P04 animado por grupos (hermanos del hilo, no duplican). */
export function V6ComposerTyping() {
  return (
    <div className="homi-composer v6-composer-typing" aria-hidden="true">
      <span className="v6-typing-text">
        {COCA_GROUPS.map((group, i) => (
          <span key={group} className="v6-typing-group" data-group={i}>{group}{(i < COCA_GROUPS.length - 1) ? ' ' : ''}</span>
        ))}
      </span>
      <span className="v6-caret" />
      <span className="homi-send" />
    </div>
  )
}

/** P05–P06: mensaje + propuesta emergente por etapas. */
export function V6HomiProposal({ decided = false }: { decided?: boolean }) {
  return (
    <HomiShell label={`${COCA_OP_KIND}: ${COCA_TASK_TITLE}, ${D1_SHORT}`}>
      <div className="v6-message-zone" aria-label={COCA_MESSAGE_FULL}>
        <UserBubble text={COCA_MESSAGE_FULL} compact />
      </div>
      <ProposalCard />
      {!decided && <DecisionRow />}
      {decided && <DecisionRow pressed />}
    </HomiShell>
  )
}

/** P08: presión de Confirmar + feedback de operación aceptada (sin Planner). */
export function V6HomiConfirmed() {
  return (
    <HomiShell label="Homi: tarea confirmada">
      <div className="v6-message-zone">
        <UserBubble text={COCA_MESSAGE_FULL} compact />
      </div>
      <div className="v6-confirmed-card" aria-label={`Confirmado: ${COCA_TASK_TITLE}, ${D1_LABEL}`}>
        <p className="v6-proposal-kicker">{COCA_OP_KIND}</p>
        <span className="v6-proposal-divider" aria-hidden="true" />
        <p className="v6-proposal-title">{COCA_TASK_TITLE}</p>
        <p className="v6-proposal-date"><span>{D1_SHORT} · <span className="v6-proposal-date-sub">lun 17 de agosto</span></span></p>
        <div className="homi-done v6-present">
          <span className="homi-check" aria-hidden="true" />
          <div className="homi-done-copy">
            <p className="homi-done-title">Confirmado</p>
            <p className="homi-done-sub">Tarea creada en Planner · {D1_SHORT}</p>
          </div>
        </div>
      </div>
    </HomiShell>
  )
}

/** Planner nativo con la fila Coca integrada (P09+). Una sola Coca. */
export function V6PlannerAfterConfirm({ wide = false, focusControl = false }: {
  wide?: boolean
  focusControl?: boolean
}) {
  return (
    <div className="v6-planner-native" data-wide={wide} data-focus-control={focusControl}>
      <PlannerDemoScreen view="tasks" tasks={PLANNER_AFTER_CONFIRM} emphasizeTasks settled={false} />
    </div>
  )
}

/**
 * Acceso editorial a Homi (P10/P15). Restricción documentada: el producto
 * actual no expone un punto de acceso nativo a Homi en Home/Planner, por lo
 * que se usa la identidad Homi como capa escénica (`data-scenic`). No se
 * presenta como botón nativo ni intercepta eventos.
 */
export function V6HomiAccess({ active = false }: { active?: boolean }) {
  return (
    <div className="v6-homi-access" data-active={active} data-scenic="true" role="img" aria-label="Acceso a Homi (capa editorial)">
      <img src={homiMark} alt="" aria-hidden="true" width={40} height={40} draggable={false} />
      <span>Homi</span>
    </div>
  )
}

/** Recuerdo editorial congelado (P17–P18): propuesta Coca no operativa. */
export function V6FrozenMemory() {
  return (
    <div className="v6-frozen" role="img" aria-label={`Recuerdo no operativo: propuesta ${COCA_TASK_TITLE}`}>
      <div className="v6-frozen-inner" aria-hidden="true">
        <p className="v6-proposal-kicker">{COCA_OP_KIND}</p>
        <span className="v6-proposal-divider" />
        <p className="v6-proposal-title">{COCA_TASK_TITLE}</p>
        <p className="v6-proposal-date"><span>{D1_SHORT} · lun 17 de agosto</span></p>
        <div className="v6-frozen-row">
          <span className="v6-frozen-btn">Cancelar</span>
          <span className="v6-frozen-btn v6-frozen-btn-primary">Confirmar</span>
        </div>
      </div>
    </div>
  )
}
