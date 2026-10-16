// HOMI V4.2 — PlannerShots: reutilización directa de la anatomía de Planner.
// Nativos reutilizados sin alterar apariencia ni romper usos actuales:
//   PlannerTasks (filas .planner-task-row auténticas: control de completar,
//   título, metadatos, chevron), PlannerTabs, TaskCompletionMark, HomeIcon,
//   planner-screen.css + tokens reales.
// Sin agrupaciones inventadas: la lista actual muestra fechas en metadatos
// y el foco editorial compara Hoy/Mañana sobre esos metadatos. Coca aparece
// una sola vez, integrada en la lista — nunca aislada sobre negro.

import type { CSSProperties } from 'react'
import HomeIcon from '../../app-screens/HomeDemoScreen/HomeIcon'
import { homeVariables } from '../../app-screens/HomeDemoScreen/homeTokens'
import PlannerTabs from '../../app-screens/PlannerDemoScreen/PlannerTabs'
import PlannerTasks from '../../app-screens/PlannerDemoScreen/PlannerTasks'
import '../../app-screens/HomeDemoScreen/home-screen.css'
import '../../app-screens/PlannerDemoScreen/planner-screen.css'
import { COCA_TASK, TODAY_TASKS } from './homiV4Data'

// Ampliación proporcional del contenido real dentro del encuadre (sin
// scaleX/scaleY, sin deformación): solo tokens tipográficos.
const resultVars = {
  ...homeVariables,
  '--home-title-size': '32px',
  '--home-secondary-size': '20px',
  '--task-mark-size': '30px',
  '--home-card-radius': '22px',
} as CSSProperties

const wideVars = {
  ...homeVariables,
  '--home-title-size': '30px',
  '--home-secondary-size': '19px',
  '--task-mark-size': '28px',
  '--home-card-radius': '22px',
} as CSSProperties

const glimpseVars = {
  ...homeVariables,
  '--home-title-size': '28px',
  '--home-secondary-size': '18px',
  '--task-mark-size': '26px',
  '--home-card-radius': '20px',
} as CSSProperties

function PlannerShell({ vars, label, tasks, focusCoca = false, compare = false }: {
  vars: CSSProperties
  label: string
  tasks: readonly typeof COCA_TASK[]
  focusCoca?: boolean
  compare?: boolean
}) {
  return (
    <div className="home-demo-screen planner-demo-screen h4-planner-surface" style={vars}
      data-focus-coca={focusCoca} data-compare={compare} aria-label={label}>
      <header className="planner-heading">
        <h1>Tareas</h1>
        <span aria-label="Crear" role="img"><HomeIcon name="add" size={30} /></span>
      </header>
      <div className="h4-tabs-scale">
        <PlannerTabs selected="tasks" settled={false} />
      </div>
      <div className="planner-workspace">
        <div className="h4-tasks-scale">
          <PlannerTasks tasks={tasks} emphasized={false} />
        </div>
      </div>
    </div>
  )
}

// T06 — resultado dentro de Planner: Coca integrada en la lista auténtica.
export function PlannerResult() {
  return (
    <PlannerShell vars={resultVars} label="Planner: tarea creada" focusCoca
      tasks={[...TODAY_TASKS, COCA_TASK]} />
  )
}

// T07 — Planner amplio: mirar (conjunto), comparar (Hoy/Mañana), control
// visual (controles auténticos). Sin ejecutar filtros ni completar Coca.
export function PlannerWide() {
  return (
    <PlannerShell vars={wideVars} label="Planner: mirar, comparar, control visual" compare
      tasks={[...TODAY_TASKS, COCA_TASK]} />
  )
}

// T09 derecha — recorte auténtico: módulo + Mañana + TaskRow Coca.
export function PlannerGlimpse() {
  return (
    <PlannerShell vars={glimpseVars} label="Planner: tarea de mañana" tasks={[COCA_TASK]} />
  )
}
