import HomeIcon from '../HomeDemoScreen/HomeIcon'
import { plannerWeek, type PlannerEvent } from './plannerData'

export default function PlannerCalendar({ event, showEventRow = true }: { event: PlannerEvent; showEventRow?: boolean }) {
  return (
    <div className="planner-calendar">
      <div className="planner-card planner-week">
        <div className="planner-week-range">
          <span className="planner-week-previous"><HomeIcon name="right" size={18} /></span>
          <p>17–23 AGO</p>
          <span><HomeIcon name="right" size={18} /></span>
        </div>
        <div className="planner-week-days" aria-label="Semana del 17 al 23 de agosto de 2026">
          {plannerWeek.map(date => (
            <div key={date.number} className="planner-week-day" data-selected={date.number === event.day}
              aria-current={date.number === event.day ? 'date' : undefined}>
              <span>{date.day}</span><strong>{date.number}</strong>
            </div>
          ))}
        </div>
      </div>
      <h2 className="planner-section-label planner-event-label">{event.dateLabel}</h2>
      {showEventRow && (
        <div className="planner-card planner-event-row">
          <span className="planner-event-dot" aria-hidden="true" />
          <div className="planner-row-copy">
            <p className="planner-row-title">{event.title}</p>
            <p className="planner-row-meta">{event.context}</p>
          </div>
          <span className="planner-chevron"><HomeIcon name="right" size={16} /></span>
        </div>
      )}
    </div>
  )
}
