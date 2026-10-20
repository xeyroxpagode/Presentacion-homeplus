import { useCallback, useEffect, useReducer, useRef, useState } from 'react'
import PresentationFrame from './components/PresentationFrame'
import { initialState, navigate, navigationAction } from './navigation'
import { presentationConfig } from './presentationConfig'
import type { NavigationAction, PresentationState } from './presentationTypes'
import OpeningSequence from './opening/OpeningSequence'
import HomePlannerSequence from './components/HomePlannerSequence'
import S07CoordinarNoEsVigilar from './slides/S07CoordinarNoEsVigilar'
import { cineRunKey, isCineSlide } from './cineSlides'
import FinalKitchenCanvas from './slides/FinalKitchen/FinalKitchenCanvas'
import { s03EnqueueAdvance, s03ConsumeAdvance, s03ClearAdvances } from './slides/S03HomePlus/s03v6/advances'

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
  // Handoff S03.10 → S04.0: un solo click. Al entrar en step 10 el zoom corre
  // y al completar navega a S04; un segundo click durante step 10 se ignora.
  const s03Step10 = state.slideIndex === 2 && state.stepIndex === 10
  // §13.4: un click durante una animación se encola; se ejecuta al llegar el
  // step activo a su estado final. Un segundo click no reinicia el relevo.
  const s03Running = state.slideIndex === 2 && state.stepIndex >= 1 && state.stepIndex <= 9
  const s03SettledRef = useRef(false)
  const handleStep10Complete = useCallback(() => {
    if (state.slideIndex !== 2 || state.stepIndex !== 10) return
    dispatch('NEXT')
  }, [state.slideIndex, state.stepIndex])
  const handleStepSettled = useCallback(() => {
    if (state.slideIndex !== 2) return
    s03SettledRef.current = true
    if (s03ConsumeAdvance()) dispatch('NEXT')
  }, [state.slideIndex])
  // El estado de reposo se reinicia al cambiar de step; la cola NO se vacía
  // (varios clicks rápidos se ejecutan en cadena, uno por step).
  useEffect(() => {
    s03SettledRef.current = false
  }, [state.slideIndex, state.stepIndex])
  // Al entrar a S03 la cola empieza vacía.
  useEffect(() => {
    if (state.slideIndex === 2) s03ClearAdvances()
  }, [state.slideIndex])
  const devMode = new URLSearchParams(window.location.search).get('dev') === '1'
  const [directSnapshot, setDirectSnapshot] = useState(devMode)
  const finalReady = useRef(false)
  const onFinalNavigateReady = useCallback((ready: boolean) => { finalReady.current = ready }, [])
  const finalActive = slide.id === 'FINAL_KITCHEN'
  const prepareFinal = slide.id === 'S17' && state.stepIndex === slide.stepCount - 1
  // The cinematic run is one continuous composition, so its slides share a
  // stable section key per run. That keeps `CineScene` mounted across the slide
  // boundary and lets the travelers animate instead of snapping.
  const cine = isCineSlide(state.slideIndex)
  const sceneKey = cine
    ? cineRunKey(state.slideIndex)
    : state.slideIndex <= 6
      ? 'intro-product'
      : slide.id

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      const action = navigationAction(event)
      if (!action || event.defaultPrevented) return
      event.preventDefault()
      if (event.repeat) return
      setDirectSnapshot(false)
      if (s03Step10 && action === 'NEXT') return // el auto-nav del step 10 gobierna; un segundo click no re-inicia
      if (s03Running && action === 'NEXT') {
        // Durante la animación el avance se encola (no salta objetos).
        if (!s03SettledRef.current) { s03EnqueueAdvance(); return }
      }
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
        key={sceneKey}
        className="presentation-scene"
        aria-label={slide.name}
        data-slide-id={slide.id}
        data-slide-index={state.slideIndex}
        data-step-index={state.stepIndex}
      >
        {cine ? (
          <Slide stepIndex={state.stepIndex} slideIndex={state.slideIndex} directSnapshot={directSnapshot} />
        ) : state.slideIndex <= 6 ? (
          <>
            <div className="opening-to-home" data-active={state.slideIndex <= 2}
              data-handoff={state.slideIndex === 3 && state.stepIndex === 0} aria-hidden={state.slideIndex > 2}>
              <OpeningSequence slideIndex={Math.min(state.slideIndex, 2)} stepIndex={state.slideIndex <= 2 ? state.stepIndex : 0}
                handoff={state.slideIndex === 3 && state.stepIndex === 0} s03live={state.slideIndex === 2}
                onStep10Complete={handleStep10Complete} onStepSettled={handleStepSettled} />
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
