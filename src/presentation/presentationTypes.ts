import type { ComponentType } from 'react'

export type CineHandoff = 'home-to-planner' | 'planner-to-home' | null
export type FamilyHandoff = 'planner-to-family' | 'family-to-planner' | null
export type PlannerTransition = 'calendar-to-plans' | 'plans-to-calendar' | null

export type SlideProps = {
  stepIndex: number
  directSnapshot?: boolean
  slideIndex?: number
  cineHandoff?: CineHandoff
  familyHandoff?: FamilyHandoff
  plannerTransition?: PlannerTransition
  c43Exit?: boolean
}

export type SlideDefinition = {
  id: string
  name: string
  stepCount: number
  component: ComponentType<SlideProps>
}

export type PresentationState = { slideIndex: number; stepIndex: number }
export type NavigationAction = 'NEXT' | 'PREVIOUS'
