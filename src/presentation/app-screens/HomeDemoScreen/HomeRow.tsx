import HomeIcon from './HomeIcon'
import TaskCompletionMark from './TaskCompletionMark'

type HomeRowProps = {
  id: 'educationPhysical' | 'authorization' | 'schoolTask'
  title: string
  kind: 'event' | 'task'
  attention: boolean
  complete: boolean
  completed?: boolean
  focused?: boolean
}

export default function HomeRow({ id, title, kind, attention, complete, completed = false, focused = false }: HomeRowProps) {
  const taskCompleted = kind === 'task' && completed
  return (
    <div className="home-demo-row" data-home-item={id} data-kind={kind} data-attention={attention}
      data-complete={complete} data-completed={taskCompleted} data-focused={focused}>
      <span className="home-completion-feedback" aria-hidden="true" />
      <div className="home-row-lead">
        {kind === 'event' ? <span className="home-event-date">Mañana</span> : <TaskCompletionMark completed={taskCompleted} />}
      </div>
      <div className="home-row-copy">
        <p className="home-row-title">{title}</p>
        {kind === 'task' && (
          <p className="home-row-subtitle">
            {taskCompleted ? <span className="task-completion-label">Completada</span> : 'Juli'}
          </p>
        )}
      </div>
      <span className="home-row-chevron"><HomeIcon name="right" size={16} /></span>
    </div>
  )
}
