export default function TaskCompletionMark({ completed }: { completed: boolean }) {
  return (
    <span className="task-status-mark" data-completed={completed} role="img" aria-label={completed ? 'Completada' : 'Pendiente'}>
      {completed && (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="m5 12 4.5 4.5L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </span>
  )
}
