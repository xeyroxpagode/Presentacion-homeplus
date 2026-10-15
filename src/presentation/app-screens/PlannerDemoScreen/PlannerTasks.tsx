import HomeIcon from '../HomeDemoScreen/HomeIcon'
import TaskCompletionMark from '../HomeDemoScreen/TaskCompletionMark'
import type { PlannerTask } from './plannerData'

export default function PlannerTasks({ tasks, emphasized }: { tasks: readonly PlannerTask[]; emphasized: boolean }) {
  return (
    <div className="planner-tasks" data-emphasized={emphasized}>
      <h2 className="planner-section-label">{tasks.every(task => task.completed) ? 'Completadas' : 'Tareas'}</h2>
      <div className="planner-card">
        {tasks.map(task => (
          <div key={task.id} className="planner-task-row" data-task-id={task.id} data-completed={Boolean(task.completed)}>
            <span className="planner-check-zone"><TaskCompletionMark completed={Boolean(task.completed)} /></span>
            <div className="planner-row-copy">
              <p className="planner-row-title">{task.title}</p>
              <p className="planner-row-meta">
                {task.completed ? <span className="task-completion-label">Completada</span> : `${task.assignee} · ${task.dueLabel}`}
              </p>
            </div>
            <span className="planner-chevron"><HomeIcon name="right" size={16} /></span>
          </div>
        ))}
      </div>
    </div>
  )
}
