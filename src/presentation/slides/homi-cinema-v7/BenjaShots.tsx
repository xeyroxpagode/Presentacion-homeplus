// HOMIE V7 — Superficies Benja (B01–B13).
// Adaptadores de sólo presentación: reutilizan anatomía y clases nativas
// (.homi-*, PlannerDemoScreen, FrictionEcho) sin alterar producción.
// Toda amplificación tipográfica vive bajo el scope `.v7-stage`.

import type { CSSProperties, ReactNode } from 'react'
import homiMark from '../../assets/illustrations/homi-mark.svg'
import { homeVariables } from '../../app-screens/HomeDemoScreen/homeTokens'
import PlannerDemoScreen from '../../app-screens/PlannerDemoScreen'
import '../../app-screens/HomeDemoScreen/home-screen.css'
import '../../app-screens/HomiDemoScreen/homi-screen.css'
import '../../app-screens/PlannerDemoScreen/planner-screen.css'
import {
  COCA_GROUPS, COCA_MESSAGE_FULL, COCA_OP_KIND, COCA_TASK_TITLE, D1_SHORT,
  PLANNER_AFTER_CONFIRM,
} from './homiV7Data'

// Escala editorial por superficie (amplificación sin deformar: solo tokens).
function surfaceVars(title: string, secondary: string, mark: string): CSSProperties {
  return {
    ...homeVariables,
    '--home-title-size': title,
    '--home-secondary-size': secondary,
    '--task-mark-size': mark,
  } as CSSProperties
}

export const V7_HOMI_VARS = surfaceVars('27px', '21px', '30px')
export const V7_PLANNER_VARS = surfaceVars('26px', '20px', '28px')

function HomiShell({ label, vars, wide = false, children, composer }: {
  label: string
  vars?: CSSProperties
  wide?: boolean
  children: ReactNode
  composer?: ReactNode
}) {
  return (
    <div
      className="home-demo-screen homi-demo-screen v7-homi-surface"
      style={vars ?? V7_HOMI_VARS}
      data-wide={wide}
      aria-label={label}
    >
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
    <div className="homi-user-bubble v7-present" data-compact={compact} aria-label={text}>
      <p>{text}</p>
    </div>
  )
}

function ProposalCard() {
  return (
    <div className="homi-proposal v7-present v7-proposal" aria-label={`${COCA_OP_KIND}: ${COCA_TASK_TITLE}, ${D1_SHORT}`}>
      <p className="v7-proposal-kicker">{COCA_OP_KIND}</p>
      <span className="v7-proposal-divider" aria-hidden="true" />
      <p className="v7-proposal-title">{COCA_TASK_TITLE}</p>
      <p className="v7-proposal-date">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x="3" y="5" width="18" height="16" rx="3" stroke="currentColor" strokeWidth="2" />
          <path d="M3 10h18M8 3v4M16 3v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <span>{D1_SHORT} · <span className="v7-proposal-date-sub">lun 17 de agosto</span></span>
      </p>
    </div>
  )
}

function DecisionRow({ pressed = false }: { pressed?: boolean }) {
  return (
    <div className="homi-decision-row v7-present" data-pressed={pressed}>
      <button type="button" className="homi-dismiss" tabIndex={-1}>Cancelar</button>
      <button type="button" className="homi-confirm homi-decision-confirm" data-pressable={pressed} tabIndex={-1}>Confirmar</button>
    </div>
  )
}

/** B01: Homi compacto neutral (el formulario de Fricción sale en la composición). */
export function V7HomiReady() {
  return (
    <HomiShell label="Homi, asistente de HomePlus">
      <div className="homi-greeting v7-present">
        <p>¿En qué te ayudo?</p>
      </div>
    </HomiShell>
  )
}

/** B02: composer con foco + cursor visual, sin mensajes nuevos. */
export function V7HomiFocused() {
  return (
    <HomiShell
      label="Homi, asistente de HomePlus"
      composer={(
        <div className="homi-composer v7-composer-focus" aria-hidden="true">
          <span className="homi-composer-hint">Pedile algo a Homi…</span>
          <span className="v7-caret" />
          <span className="homi-send" />
        </div>
      )}
    >
      <div className="homi-greeting v7-present">
        <p>¿En qué te ayudo?</p>
      </div>
    </HomiShell>
  )
}

/** B03: mensaje Coca enviado como burbuja del hilo; el composer queda vacío. */
export function V7HomiRequest() {
  return (
    <HomiShell label={COCA_MESSAGE_FULL} wide>
      <div className="v7-sent-bubble" aria-label={COCA_MESSAGE_FULL}>
        <div className="homi-user-bubble v7-present">
          <p>{COCA_MESSAGE_FULL}</p>
        </div>
      </div>
    </HomiShell>
  )
}

/** Texto del composer B03 animado por grupos (hermanos del hilo, no duplican). */
export function V7ComposerTyping() {
  return (
    <div className="homi-composer v7-composer-typing" aria-hidden="true">
      <span className="v7-typing-text">
        {COCA_GROUPS.map((group, i) => (
          <span key={group} className="v7-typing-group" data-group={i}>{group}{(i < COCA_GROUPS.length - 1) ? ' ' : ''}</span>
        ))}
      </span>
      <span className="v7-caret" />
      <span className="homi-send" />
    </div>
  )
}

/** B04: mensaje + propuesta completa con ambos botones. Nada se pulsa. */
export function V7HomiProposal({ decided = false }: { decided?: boolean }) {
  return (
    <HomiShell label={`${COCA_OP_KIND}: ${COCA_TASK_TITLE}, ${D1_SHORT}`} wide>
      <div className="v7-message-zone" aria-label={COCA_MESSAGE_FULL}>
        <UserBubble text={COCA_MESSAGE_FULL} compact />
      </div>
      <ProposalCard />
      {!decided && <DecisionRow />}
      {decided && <DecisionRow pressed />}
    </HomiShell>
  )
}

/** B05: presión de Confirmar + feedback de operación aceptada (sin Planner). */
export function V7HomiConfirmed() {
  return (
    <HomiShell label="Homi: tarea confirmada" wide>
      <div className="v7-message-zone">
        <UserBubble text={COCA_MESSAGE_FULL} compact />
      </div>
      <div className="v7-confirmed-card" aria-label={`Confirmado: ${COCA_TASK_TITLE}, ${D1_SHORT}`}>
        <p className="v7-proposal-kicker">{COCA_OP_KIND}</p>
        <span className="v7-proposal-divider" aria-hidden="true" />
        <p className="v7-proposal-title">{COCA_TASK_TITLE}</p>
        <p className="v7-proposal-date"><span>{D1_SHORT} · <span className="v7-proposal-date-sub">lun 17 de agosto</span></span></p>
        <div className="homi-done v7-present">
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

/** Planner nativo con la fila Coca integrada (B06+). Una sola Coca. */
export function V7PlannerAfterConfirm({ wide = false, focusControl = false, compare = false }: {
  wide?: boolean
  focusControl?: boolean
  compare?: boolean
}) {
  return (
    <div className="v7-planner-native" data-wide={wide} data-focus-control={focusControl} data-compare={compare}>
      <PlannerDemoScreen view="tasks" tasks={PLANNER_AFTER_CONFIRM} emphasizeTasks settled={false} />
    </div>
  )
}

/**
 * Acceso contextual a Homi dentro del sistema unificado (B07/B11).
 * Capa escénica (`data-scenic`): el producto actual no expone un punto de
 * acceso nativo a Homi en Planner; no se presenta como botón nativo ni
 * intercepta eventos.
 */
export function V7HomiAccess({ active = false }: { active?: boolean }) {
  return (
    <div className="v7-homi-access" data-active={active} data-scenic="true" role="img" aria-label="Homi dentro de HomePlus (capa editorial)">
      <img src={homiMark} alt="" aria-hidden="true" width={40} height={40} draggable={false} />
      <span>Homi</span>
    </div>
  )
}

/** B12: evidencia de control humano — recuerdo editorial congelado, no operativo. */
export function V7FrozenMemory() {
  return (
    <div className="v7-frozen" role="img" aria-label={`Registro confirmado: ${COCA_TASK_TITLE} (no operativo)`}>
      <div className="v7-frozen-inner" aria-hidden="true">
        <p className="v7-proposal-kicker">{COCA_OP_KIND}</p>
        <span className="v7-proposal-divider" />
        <p className="v7-proposal-title">{COCA_TASK_TITLE}</p>
        <p className="v7-proposal-date"><span>{D1_SHORT} · lun 17 de agosto</span></p>
        <div className="v7-frozen-done">
          <span className="homi-check" aria-hidden="true" />
          <span>Confirmada por vos · En Planner</span>
        </div>
      </div>
    </div>
  )
}
