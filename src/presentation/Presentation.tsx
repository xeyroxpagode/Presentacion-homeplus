import { useCallback, useEffect, useReducer, useRef, useState } from 'react'
import PresentationFrame from './components/PresentationFrame'
import { initialState, navigate, navigationAction } from './navigation'
import { presentationConfig } from './presentationConfig'
import type { NavigationAction, PresentationState } from './presentationTypes'
import OpeningSequence from './opening/OpeningSequence'
import HomePlannerSequence from './components/HomePlannerSequence'
import S07CoordinarNoEsVigilar from './slides/S07CoordinarNoEsVigilar'
import FinalKitchenCanvas from './slides/FinalKitchen/FinalKitchenCanvas'

function reducer(state: PresentationState, action: NavigationAction) {
  return navigate(state, action, presentationConfig.slides)
}

// Dev-only deep link (?dev=1&slide=N&step=M) so each beat can be inspected directly.
function devInitialState(): PresentationState {
  const params = new URLSearchParams(window.location.search)
  if (params.get('dev') !== '1') return initialState
  const slide = Number(params.get('slide'))
  const step = Number(params.get('step'))
  const target = presentationConfig.slides[slide]
  if (!target || !Number.isInteger(step) || step < 0 || step >= target.stepCount) return initialState
  return { slideIndex: slide, stepIndex: step }
}

export default function Presentation() {
  const [state, dispatch] = useReducer(reducer, null, devInitialState)
  const slide = presentationConfig.slides[state.slideIndex]
  const Slide = slide.component
  const devMode = new URLSearchParams(window.location.search).get('dev') === '1'
  const [directSnapshot, setDirectSnapshot] = useState(devMode)
  const finalReady = useRef(false)
  const onFinalNavigateReady = useCallback((ready: boolean) => { finalReady.current = ready }, [])
  const finalActive = slide.id === 'FINAL_KITCHEN'
  const prepareFinal = slide.id === 'S17' && state.stepIndex === slide.stepCount - 1

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      const action = navigationAction(event)
      if (!action || event.defaultPrevented) return
      event.preventDefault()
      if (event.repeat) return
      setDirectSnapshot(false)
      if (finalActive && action === 'NEXT') {
        if (!finalReady.current) return
        finalReady.current = false
      }
      if (prepareFinal && action === 'NEXT') finalReady.current = false
      dispatch(action)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [finalActive, prepareFinal])

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
            <div className="opening-to-home" data-active={state.slideIndex <= 2}
              data-handoff={state.slideIndex === 3 && state.stepIndex === 0} aria-hidden={state.slideIndex > 2}>
              <OpeningSequence slideIndex={Math.min(state.slideIndex, 2)} stepIndex={state.slideIndex <= 2 ? state.stepIndex : 0}
                handoff={state.slideIndex === 3 && state.stepIndex === 0} s03live={state.slideIndex === 2} />
            </div>
            <HomePlannerSequence slideIndex={state.slideIndex} stepIndex={state.stepIndex} />
            {state.slideIndex === 6 && <S07CoordinarNoEsVigilar stepIndex={state.stepIndex} />}
          </>
        ) : finalActive ? null : <Slide stepIndex={state.stepIndex} directSnapshot={directSnapshot} />}
      </section>
      {(finalActive || prepareFinal) && (
        <FinalKitchenCanvas stepIndex={finalActive ? state.stepIndex : null} onNavigateReady={onFinalNavigateReady} />
      )}
      {devMode && (
        <output className="presentation-dev" aria-live="polite">
          slideIndex: {state.slideIndex} · stepIndex: {state.stepIndex} · {slide.id} {slide.name}
        </output>
      )}
    </PresentationFrame>
  )
}
