import PlannerDemoScreen from '../../app-screens/PlannerDemoScreen'
import type { SlideProps } from '../../presentationTypes'

export default function S05Planner({ stepIndex }: SlideProps) {
  return (
    <PlannerDemoScreen
      view={stepIndex <= 1 ? 'tasks' : stepIndex === 2 ? 'calendar' : 'plans'}
      emphasizeTasks={stepIndex === 1}
      settled={stepIndex === 3}
    />
  )
}
