// HOMIE V7 — Superficies Gaby (G14–G27).
// Reutilización nativa: HomeDemoScreen, FinanceDemoScreen,
// InventoryDemoScreen, PlannerDemoScreen + identidad Homi. Sin pantallas
// ficticias. El viewport contextual (G15–G17) es UNA sola región que
// sustituye únicamente su contenido.

import homiMark from '../../assets/illustrations/homi-mark.svg'
import HomeDemoScreen from '../../app-screens/HomeDemoScreen'
import FinanceDemoScreen from '../../app-screens/FinanceDemoScreen'
import InventoryDemoScreen from '../../app-screens/InventoryDemoScreen'
import PlannerDemoScreen from '../../app-screens/PlannerDemoScreen'
import '../../app-screens/HomeDemoScreen/home-screen.css'
import '../../app-screens/HomiDemoScreen/homi-screen.css'
import '../../app-screens/PlannerDemoScreen/planner-screen.css'
import '../../app-screens/FinanceDemoScreen/finance-screen.css'
import '../../app-screens/InventoryDemoScreen/inventory-screen.css'
import { PLANNER_AFTER_CONFIRM, PROFILE_ANSWERS, TOMORROW_QUESTION, type ProfileAnswer } from './homiV7Data'

/** G14/G18: identidad Homi + composer de consulta vacío. */
export function V7HomiIdentity() {
  return (
    <div className="v7-identity" role="img" aria-label="Homi">
      <img src={homiMark} alt="" aria-hidden="true" draggable={false} />
      <p>Homi</p>
    </div>
  )
}

export function V7QueryComposer({ mini = false }: { mini?: boolean }) {
  return (
    <div className="homi-composer v7-query-composer" data-mini={mini} aria-hidden="true">
      <span className="homi-composer-hint">Preguntale algo a Homi…</span>
      <span className="homi-send" />
    </div>
  )
}

export type ContextModuleKind = 'planner' | 'finance' | 'inventory'

/**
 * G15–G17: UN único viewport contextual. Solo el contenido interior se
 * sustituye (Planner → Finance → Inventory); el marco exterior es inmóvil.
 * `module` es el único contenido montado: sin tres teléfonos, sin columnas
 * simultáneas, sin contenido ilegible.
 */
export function V7ContextViewport({ module }: { module: ContextModuleKind }) {
  return (
    <div className="v7-viewport" data-module={module} role="img" aria-label={`Contexto: ${module}`}>
      <div key={module} className="v7-viewport-swap" data-module={module}>
        {module === 'planner' && (
          <PlannerDemoScreen view="tasks" tasks={PLANNER_AFTER_CONFIRM} emphasizeTasks settled={false} />
        )}
        {module === 'finance' && <FinanceDemoScreen />}
        {module === 'inventory' && <InventoryDemoScreen />}
      </div>
    </div>
  )
}

/** G18: indicadores editoriales compactos de las tres fuentes (no tarjetas). */
export function V7SourceChips() {
  return (
    <div className="v7-source-chips" aria-label="Fuentes: tareas, gastos, compras">
      {[
        { id: 'tareas', label: 'Tareas' },
        { id: 'gastos', label: 'Gastos' },
        { id: 'compras', label: 'Compras' },
      ].map(chip => (
        <span key={chip.id} className="v7-source-chip" data-source={chip.id}>{chip.label}</span>
      ))}
    </div>
  )
}

/** G19–G22: pregunta fija en región superior. Una sola copia. */
export function V7QuestionBar() {
  return (
    <div className="v7-question" role="img" aria-label={TOMORROW_QUESTION}>
      <p>{TOMORROW_QUESTION}</p>
    </div>
  )
}

/** Tarjeta de respuesta personal (G20–G22). Sin edición, sin mutación. */
export function V7ProfileCard({ answer }: { answer: ProfileAnswer }) {
  return (
    <article className="v7-profile" data-profile={answer.id} aria-label={`${answer.name}: ${answer.summary}`}>
      <header className="v7-profile-head">
        <span className="v7-profile-avatar" style={{ background: answer.color }} aria-hidden="true">{answer.initial}</span>
        <div className="v7-profile-id">
          <p className="v7-profile-name">{answer.name}</p>
          <p className="v7-profile-tag">{answer.tag}</p>
        </div>
      </header>
      <p className="v7-profile-when">{answer.whenRef}</p>
      <p className="v7-profile-summary">{answer.summary}</p>
      <ul className="v7-profile-records">
        {answer.records.map(record => (
          <li key={record.title} className="v7-profile-record">
            <p className="v7-profile-record-title">{record.title}</p>
            <p className="v7-profile-record-meta">{record.meta}</p>
          </li>
        ))}
      </ul>
    </article>
  )
}

export function profileById(id: ProfileAnswer['id']): ProfileAnswer {
  const found = PROFILE_ANSWERS.find(answer => answer.id === id)
  if (!found) throw new Error(`Perfil desconocido: ${id}`)
  return found
}

/**
 * G23–G27: Home canónico (HomeDemoScreen nativo). Foco editorial por
 * regiones mediante overlay no destructivo; nunca muta el layout.
 */
export function V7HomeFinal({ focus, dimChrome = false }: {
  focus?: 'reminder' | 'authorization' | null
  dimChrome?: boolean
}) {
  const focusProp = focus === 'reminder' ? 'educationPhysical' as const : focus === 'authorization' ? 'authorization' as const : null
  return (
    <div className="v7-home" data-focus={focus ?? 'none'} data-dim-chrome={dimChrome} data-homi-v7-ready="true">
      <HomeDemoScreen
        showJuli
        educationPhysical={focus === 'reminder'}
        authorization={focus === 'authorization'}
        focus={focusProp}
      />
      <div className="v7-home-spot" aria-hidden="true" />
    </div>
  )
}
