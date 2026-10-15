import HomeHeader from '../HomeDemoScreen/HomeHeader'
import HomeIcon from '../HomeDemoScreen/HomeIcon'
import { homeVariables } from '../HomeDemoScreen/homeTokens'
import PlannerTabs from './PlannerTabs'
import PlannerTasks from './PlannerTasks'
import PlannerCalendar from './PlannerCalendar'
import PlannerPlans from './PlannerPlans'
import PlannerNavigation from './PlannerNavigation'
import { birthdayPlan, juliTasks, plannerTabs, schoolEvent, type PlannerEvent, type PlannerPlan, type PlannerTab, type PlannerTask } from './plannerData'
import '../HomeDemoScreen/home-screen.css'
import './planner-screen.css'

type PlannerDemoScreenProps = {
  view: PlannerTab
  emphasizeTasks?: boolean
  settled?: boolean
  tasks?: readonly PlannerTask[]
  event?: PlannerEvent
  plan?: PlannerPlan
}

// Scene-independent product surface: the plan can be reused with S08 data later.
export default function PlannerDemoScreen({ view, emphasizeTasks = false, settled = false,
  tasks = juliTasks, event = schoolEvent, plan = birthdayPlan }: PlannerDemoScreenProps) {
  return (
    <div className="home-demo-screen planner-demo-screen" style={homeVariables} data-view={view}
      data-settled={settled} aria-label="Planner de Juli">
      <HomeHeader showJuli />
      <div className="planner-workspace">
        <header className="planner-heading"><h1>{plannerTabs.find(tab => tab.id === view)?.label}</h1><span aria-label="Crear" role="img"><HomeIcon name="add" size={22} /></span></header>
        <PlannerTabs selected={view} settled={settled} />
        <div className="planner-panel-stack">
          <section className="planner-panel" id="planner-panel-tasks" role="tabpanel" aria-labelledby="planner-tab-tasks"
            data-present={view === 'tasks'} aria-hidden={view !== 'tasks'}>
            <PlannerTasks tasks={tasks} emphasized={emphasizeTasks} />
          </section>
          <section className="planner-panel" id="planner-panel-calendar" role="tabpanel" aria-labelledby="planner-tab-calendar"
            data-present={view === 'calendar'} aria-hidden={view !== 'calendar'}>
            <PlannerCalendar event={event} />
          </section>
          <section className="planner-panel" id="planner-panel-plans" role="tabpanel" aria-labelledby="planner-tab-plans"
            data-present={view === 'plans'} aria-hidden={view !== 'plans'}>
            <PlannerPlans plan={plan} />
          </section>
        </div>
      </div>
      <PlannerNavigation />
      <div className="home-system-indicator" aria-hidden="true" />
    </div>
  )
}
