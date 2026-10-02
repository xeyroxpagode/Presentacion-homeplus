import { useEffect, useReducer } from 'react'
import PresentationFrame from './components/PresentationFrame'
import { initialState, navigate, navigationAction } from './navigation'
import { presentationConfig } from './presentationConfig'
import type { NavigationAction, PresentationState } from './presentationTypes'
import OpeningSequence from './opening/OpeningSequence'
import HomePlannerSequence from './components/HomePlannerSequence'
import S07CoordinarNoEsVigilar from './slides/S07CoordinarNoEsVigilar'

function reducer(state: PresentationState, action: NavigationAction) {
  return navigate(state, action, presentationConfig.slides)
}

export default function Presentation() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const slide = presentationConfig.slides[state.slideIndex]
  const Slide = slide.component
  const devMode = new URLSearchParams(window.location.search).get('dev') === '1'

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      const action = navigationAction(event)
      if (!action || event.defaultPrevented) return
      event.preventDefault()
      if (!event.repeat) dispatch(action)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  return (
    <PresentationFrame>
      <section
        key={state.slideIndex <= 6 ? 'intro-product' : slide.id}
        className="presentation-scene"
        aria-label={slide.name}
        data-slide-id={slide.id}
        data-slide-index={state.slideIndex}
        data-step-index={state.stepIndex}
      >
        {state.slideIndex <= 6 ? (
          <>
            <div className="opening-to-home" data-active={state.slideIndex <= 2} aria-hidden={state.slideIndex > 2}>
              <OpeningSequence slideIndex={Math.min(state.slideIndex, 2)} stepIndex={state.slideIndex <= 2 ? state.stepIndex : 0} />
            </div>
            <HomePlannerSequence slideIndex={state.slideIndex} stepIndex={state.stepIndex} />
            {state.slideIndex === 6 && <S07CoordinarNoEsVigilar stepIndex={state.stepIndex} />}
          </>
        ) : <Slide stepIndex={state.stepIndex} />}
      </section>
      {devMode && (
        <output className="presentation-dev" aria-live="polite">
          slideIndex: {state.slideIndex} · stepIndex: {state.stepIndex} · {slide.id} {slide.name}
        </output>
      )}
    </PresentationFrame>
  )
}
