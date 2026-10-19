import type { ComponentType } from 'react'

export type SlideProps = { stepIndex: number; directSnapshot?: boolean; slideIndex?: number }

export type SlideDefinition = {
  id: string
  name: string
  stepCount: number
  component: ComponentType<SlideProps>
}

export type PresentationState = { slideIndex: number; stepIndex: number }
export type NavigationAction = 'NEXT' | 'PREVIOUS'
