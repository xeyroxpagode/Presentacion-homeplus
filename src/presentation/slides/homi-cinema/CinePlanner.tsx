import type { CSSProperties } from 'react'
import HomeIcon from '../../app-screens/HomeDemoScreen/HomeIcon'
import TaskCompletionMark from '../../app-screens/HomeDemoScreen/TaskCompletionMark'
import PlannerTabs from '../../app-screens/PlannerDemoScreen/PlannerTabs'
import type { PlannerTask } from '../../app-screens/PlannerDemoScreen/plannerData'
import { homeVariables } from '../../app-screens/HomeDemoScreen/homeTokens'
import '../../app-screens/PlannerDemoScreen/planner-screen.css'

// Superficie auténtica de Planner reorganizada editorialmente.
// Reutiliza stylesheet real, PlannerTabs real, TaskCompletionMark real y el
// mismo DOM de TaskRow (planner-task-row). Solo cambia la escala editorial
// mediante tokens (sin scaleX ni deformación).

// Escala editorial (k = 2/3 del spec): mismos tokens, valores ampliados,
// sin deformación. El DOM y las clases son los auténticos de Planner.
const cineVariables = {
  ...homeVariables,
  '--home-screen-padding': '0px',
  '--home-title-size': '31px',
  '--home-secondary-size': '19px',
  '--task-mark-size': '30px',
  '--home-card-radius': '22px',
} as CSSProperties

const dualVariables = {
  ...cineVariables,
  '--home-title-size': '30px',
} as CSSProperties

export { dualVariables }
export function CineTaskGroup({ label, tasks, dimmed = false, hiddenRowId, variables }: {
  label: string
  tasks: readonly PlannerTask[]
  dimmed?: boolean
  hiddenRowId?: string
  variables?: CSSProperties
}) {
  return (
    <div className="cine-group" data-dimmed={dimmed} style={variables}>
      <h2 className="planner-section-label cine-group-label">{label}</h2>
      <div className="planner-card">
        {tasks.map(task => (
          <div
            key={task.id}
            className="planner-task-row cine-row"
            data-task-id={task.id}
            data-completed={Boolean(task.completed)}
            data-reserved={hiddenRowId === task.id}
            aria-label={`${task.title}, ${task.dueLabel}`}
          >
            <span className="planner-check-zone">
              <TaskCompletionMark completed={Boolean(task.completed)} />
            </span>
            <div className="planner-row-copy">
              <p className="planner-row-title">{task.title}</p>
              <p className="planner-row-meta">
                {task.completed
                  ? <span className="task-completion-label">Completada</span>
                  : `${task.assignee} · ${task.dueLabel}`}
              </p>
            </div>
            <span className="planner-chevron"><HomeIcon name="right" size={20} /></span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function CinePlanner({ today, tomorrow, focus, dimmed = false, hiddenRowId }: {
  today: readonly PlannerTask[]
  tomorrow: readonly PlannerTask[]
  focus: 'all' | 'today' | 'tomorrow' | 'coca'
  dimmed?: boolean
  hiddenRowId?: string
}) {
  return (
    <div className="cine-planner" style={cineVariables} data-focus={focus} data-dimmed={dimmed} aria-label="Planner">
      <header className="planner-heading cine-planner-heading">
        <h1>Tareas</h1>
        <span aria-label="Crear" role="img"><HomeIcon name="add" size={30} /></span>
      </header>
      <div className="cine-tabs-scale">
        <PlannerTabs selected="tasks" settled={false} />
      </div>
      <div className="cine-groups" data-focus={focus}>
        <div className="cine-group-slot" data-group="today">
          <CineTaskGroup label="Hoy" tasks={today} hiddenRowId={hiddenRowId} />
        </div>
        <div className="cine-group-slot" data-group="tomorrow">
          <CineTaskGroup label="Mañana" tasks={tomorrow} hiddenRowId={hiddenRowId} />
        </div>
      </div>
    </div>
  )
}
