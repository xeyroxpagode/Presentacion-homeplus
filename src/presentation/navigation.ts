import type { NavigationAction, PresentationState } from './presentationTypes'

export const initialState: PresentationState = { slideIndex: 0, stepIndex: 0 }

// A press changes attention. Crossing a scene boundary preserves the inverse path.
export function navigate(
  state: PresentationState,
  action: NavigationAction,
  slides: readonly { stepCount: number }[],
): PresentationState {
  const current = slides[state.slideIndex]
  if (action === 'NEXT') {
    if (state.stepIndex < current.stepCount - 1) return { ...state, stepIndex: state.stepIndex + 1 }
    if (state.slideIndex < slides.length - 1) return { slideIndex: state.slideIndex + 1, stepIndex: 0 }
  } else {
    if (state.stepIndex > 0) return { ...state, stepIndex: state.stepIndex - 1 }
    if (state.slideIndex > 0) {
      const slideIndex = state.slideIndex - 1
      return { slideIndex, stepIndex: slides[slideIndex].stepCount - 1 }
    }
  }
  return state
}

export function navigationAction(event: KeyboardEvent): NavigationAction | null {
  if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey || event.isComposing) return null
  if (event.target instanceof Element && event.target.closest(
    'input, textarea, select, button, a[href], [contenteditable]:not([contenteditable="false"]), [role="textbox"]',
  )) return null
  if (event.key === 'ArrowRight' || event.code === 'Space' || event.key === ' ') return 'NEXT'
  if (event.key === 'ArrowLeft') return 'PREVIOUS'
  return null
}
