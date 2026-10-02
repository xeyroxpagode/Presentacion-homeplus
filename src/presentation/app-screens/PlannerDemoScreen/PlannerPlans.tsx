import HomeIcon from '../HomeDemoScreen/HomeIcon'
import type { PlannerPlan } from './plannerData'

export default function PlannerPlans({ plan }: { plan: PlannerPlan }) {
  return (
    <div className="planner-plans">
      <div className="planner-card planner-plan">
        <div className="planner-plan-heading">
          <div><h2>{plan.title}</h2><p>{plan.dueLabel} · {plan.steps.length} pasos pendientes</p></div>
          <span className="planner-plan-icon"><HomeIcon name="calendar" size={24} /></span>
        </div>
        {plan.steps.map(step => (
          <div key={step.id} className="planner-plan-step" data-plan-step={step.id}>
            <span className="planner-unchecked" aria-hidden="true" />
            <p className="planner-row-title">{step.title}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
