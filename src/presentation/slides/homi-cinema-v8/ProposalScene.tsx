// HOMIE V8 — Propuestas dentro de Homi (P05, P06, P14).
// Nivel A (UI auténtica): decision-row nativa de Homi para ambas propuestas.
// La propuesta financiera adopta la claridad estructural de un resumen de
// cambios verificable (sin consola, sin diff de código, sin GitHub).
// Nada se ejecuta: Confirmar nunca se presiona en la propuesta financiera.

import bankIcon from '../../assets/app-icons/bank.svg'
import documentIcon from '../../assets/illustrations/insurance-document.svg'
import {
  COCA_OP_KIND,
  COCA_TASK_TITLE,
  COCA_TIME,
  D1_SHORT,
  FIN_CHANGES,
  FIN_OP_KIND,
  FIN_OP_SUB,
  FIN_STATUS,
} from './homiV8Data'

const ACTION_ICONS = { Ingreso: bankIcon, Pago: documentIcon } as const

function DecisionRow({ pressed = false }: { pressed?: boolean }) {
  return (
    <div className="homi-decision-row v8-present" data-pressed={pressed}>
      <button type="button" className="homi-dismiss" tabIndex={-1}>Cancelar</button>
      <button type="button" className="homi-confirm homi-decision-confirm" data-pressable={pressed} tabIndex={-1}>Confirmar</button>
    </div>
  )
}

/**
 * P05: propuesta Coca completa (título + fecha/hora + controles).
 * P06: la misma composición con Confirmar presionado una sola vez.
 * `pressed` renderiza el estado posterior a la confirmación lógica.
 */
export function V8ProposalCoca({ pressed = false }: { pressed?: boolean }) {
  return (
    <div className="homi-proposal v8-present v8-proposal" data-pressed={pressed} aria-label={`${COCA_OP_KIND}: ${COCA_TASK_TITLE}, ${D1_SHORT} · ${COCA_TIME}`}>
      <p className="v8-proposal-kicker">{COCA_OP_KIND}</p>
      <span className="v8-proposal-divider" aria-hidden="true" />
      <p className="v8-proposal-title">{COCA_TASK_TITLE}</p>
      <p className="v8-proposal-meta">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x="3" y="5" width="18" height="16" rx="3" stroke="currentColor" strokeWidth="2" />
          <path d="M3 10h18M8 3v4M16 3v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <span>{D1_SHORT} · {COCA_TIME}</span>
      </p>
      {!pressed && <DecisionRow />}
    </div>
  )
}

/**
 * P14: propuesta de múltiples cambios (resumen verificable pendiente de
 * decisión humana). Sin importes, vencimientos ni ejecución bancaria.
 */
export function V8ProposalFinance() {
  return (
    <div className="v8-fin-proposal v8-present" aria-label={`${FIN_OP_KIND}: ${FIN_OP_SUB}, ${FIN_STATUS}`}>
      <header className="v8-fin-head">
        <p className="v8-fin-kicker">{FIN_OP_KIND}</p>
        <p className="v8-fin-sub">{FIN_OP_SUB}</p>
      </header>
      <ul className="v8-fin-list">
        {FIN_CHANGES.map((change, i) => (
          <li key={change.title} className="v8-fin-row" data-i={i}>
            <span className="v8-fin-icon" aria-hidden="true">
              <img src={ACTION_ICONS[change.kind]} alt="" width={22} height={22} draggable={false} />
            </span>
            <span className="v8-fin-kind">{change.kind}</span>
            <span className="v8-fin-copy">
              <span className="v8-fin-title">{change.title}</span>
              <span className="v8-fin-detail">{change.detail}</span>
            </span>
            <span className="v8-fin-state">{change.state}</span>
          </li>
        ))}
      </ul>
      <footer className="v8-fin-foot">
        <span className="v8-fin-status">{FIN_STATUS}</span>
        <DecisionRow />
      </footer>
    </div>
  )
}
