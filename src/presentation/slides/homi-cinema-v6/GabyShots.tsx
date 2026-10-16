// HOMI V6 — Superficies Gaby (P20–P38).
// Reutilización nativa: HomeDemoScreen, FinanceDemoScreen,
// InventoryDemoScreen, PlannerDemoScreen + identidad Homi. Sin pantallas
// ficticias: los recortes de convergencia citan datos de los fixtures.

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
import { PLANNER_AFTER_CONFIRM, PROFILE_ANSWERS, TOMORROW_QUESTION, type ProfileAnswer } from './homiV6Data'

/** P20: identidad Homi + composer de consulta vacío. */
export function V6HomiIdentity() {
  return (
    <div className="v6-identity" role="img" aria-label="Homi">
      <img src={homiMark} alt="" aria-hidden="true" draggable={false} />
      <p>Homi</p>
    </div>
  )
}

export function V6QueryComposer({ mini = false }: { mini?: boolean }) {
  return (
    <div className="homi-composer v6-query-composer" data-mini={mini} aria-hidden="true">
      <span className="homi-composer-hint">Preguntale algo a Homi…</span>
      <span className="homi-send" />
    </div>
  )
}

type ModuleKind = 'planner' | 'finance' | 'inventory'

/** P21–P24: superficies auténticas con foco editorial por módulo. */
export function V6ContextModules({ focus }: { focus: ModuleKind | null }) {
  return (
    <div className="v6-modules" data-focus={focus ?? 'none'}>
      <div className="v6-module" data-module="planner" data-active={focus === 'planner'} aria-label="Planner: pendientes">
        <PlannerDemoScreen view="tasks" tasks={PLANNER_AFTER_CONFIRM} emphasizeTasks settled={false} />
      </div>
      <div className="v6-module" data-module="finance" data-active={focus === 'finance'} aria-label="Finanzas: gastos">
        <FinanceDemoScreen />
      </div>
      <div className="v6-module" data-module="inventory" data-active={focus === 'inventory'} aria-label="Inventario: faltantes">
        <InventoryDemoScreen />
      </div>
    </div>
  )
}

/** Recortes de convergencia P25: datos consistentes con los fixtures. */
export const V6_CLIPPINGS = [
  { id: 'clip-planner', from: 'planner' as ModuleKind, title: 'Educación Física', meta: 'Lunes 17 · Mañana' },
  { id: 'clip-finance', from: 'finance' as ModuleKind, title: 'Seguro del auto', meta: 'En 6 días · $62.800' },
  { id: 'clip-inventory', from: 'inventory' as ModuleKind, title: 'Lista de compras', meta: '8 para comprar' },
] as const

/** P27–P32: pregunta fija en región superior. */
export function V6QuestionBar() {
  return (
    <div className="v6-question" role="img" aria-label={TOMORROW_QUESTION}>
      <p>{TOMORROW_QUESTION}</p>
    </div>
  )
}

/** Tarjeta de respuesta personal (P28–P32). Sin edición, sin mutación. */
export function V6ProfileCard({ answer, layout }: { answer: ProfileAnswer; layout: 'center' | 'left' | 'right' | 'trio' }) {
  return (
    <article className="v6-profile" data-profile={answer.id} data-layout={layout} aria-label={`${answer.name}: ${answer.summary}`}>
      <header className="v6-profile-head">
        <span className="v6-profile-avatar" style={{ background: answer.color }} aria-hidden="true">{answer.initial}</span>
        <div className="v6-profile-id">
          <p className="v6-profile-name">{answer.name}</p>
          <p className="v6-profile-tag">{answer.tag}</p>
        </div>
      </header>
      <p className="v6-profile-when">{answer.whenRef}</p>
      <p className="v6-profile-summary">{answer.summary}</p>
      <ul className="v6-profile-records">
        {answer.records.map(record => (
          <li key={record.title} className="v6-profile-record">
            <p className="v6-profile-record-title">{record.title}</p>
            <p className="v6-profile-record-meta">{record.meta}</p>
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
 * P33–P38: Home auténtico (HomeDemoScreen nativo). Foco editorial por
 * regiones mediante overlay no destructivo; nunca muta el layout.
 */
export function V6HomeFinal({ focus, dimChrome = false }: {
  focus?: 'reminder' | 'authorization' | null
  dimChrome?: boolean
}) {
  const focusProp = focus === 'reminder' ? 'educationPhysical' as const : focus === 'authorization' ? 'authorization' as const : null
  return (
    <div className="v6-home" data-focus={focus ?? 'none'} data-dim-chrome={dimChrome} data-homi-v6-ready="true">
      <HomeDemoScreen
        showJuli
        educationPhysical={focus === 'reminder'}
        authorization={focus === 'authorization'}
        focus={focusProp}
      />
      <div className="v6-home-spot" aria-hidden="true" />
    </div>
  )
}
