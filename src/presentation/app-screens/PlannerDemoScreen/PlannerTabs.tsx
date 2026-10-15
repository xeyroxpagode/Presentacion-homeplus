import { plannerTabs, type PlannerTab } from './plannerData'

export default function PlannerTabs({ selected, settled }: { selected: PlannerTab; settled: boolean }) {
  return (
    <div className="planner-tabs" data-selected={selected} data-settled={settled} role="tablist" aria-label="Secciones de Planner">
      <span className="planner-tab-selection" aria-hidden="true" />
      {plannerTabs.map(tab => (
        <span key={tab.id} className="planner-tab" role="tab" id={`planner-tab-${tab.id}`}
          aria-selected={selected === tab.id} aria-controls={`planner-panel-${tab.id}`}>
          {tab.label}
        </span>
      ))}
    </div>
  )
}
