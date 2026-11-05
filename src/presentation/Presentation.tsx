import { useCallback, useEffect, useReducer, useRef, useState } from 'react'
import PresentationFrame from './components/PresentationFrame'
import { initialState, navigate, navigationAction } from './navigation'
import { presentationConfig } from './presentationConfig'
import type { CineHandoff, FamilyHandoff, NavigationAction, PlannerTransition, PresentationState } from './presentationTypes'
import OpeningSequence from './opening/OpeningSequence'
import HomePlannerSequence from './components/HomePlannerSequence'
import CineRun from './slides/CineRun'
import S07CoordinarNoEsVigilar from './slides/S07CoordinarNoEsVigilar'
import S12FrontendBackend from './slides/S12FrontendBackend'
import HomiV9Stage from './slides/homi-cinema-v8/HomiV9Stage'
import { C43_BEAT_COUNT, cineRunKey, FAMILY_BEAT_COUNT, isCineSlide } from './cineSlides'
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
  if (target?.id === 'S17' && step === 1) return { slideIndex: slide, stepIndex: 0 }
  if (!target || !Number.isInteger(step) || step < 0 || step >= target.stepCount) return initialState
  return { slideIndex: slide, stepIndex: step }
}

export default function Presentation() {
  const [state, dispatch] = useReducer(reducer, null, devInitialState)
  const [cineHandoff, setCineHandoff] = useState<CineHandoff>(null)
  const [familyHandoff, setFamilyHandoff] = useState<FamilyHandoff>(null)
  const [plannerTransition, setPlannerTransition] = useState<PlannerTransition>(null)
  const [s07Departure, setS07Departure] = useState(false)
  const [s07Return, setS07Return] = useState(false)
  const [stackHandoff, setStackHandoff] = useState(false)
  const [finalHandoff, setFinalHandoff] = useState<'zoom' | 'portal' | null>(null)
  const finalHandoffTimers = useRef<number[]>([])
  const clearFinalHandoff = useCallback(() => {
    finalHandoffTimers.current.forEach(timer => window.clearTimeout(timer))
    finalHandoffTimers.current = []
  }, [])
  useEffect(() => clearFinalHandoff, [clearFinalHandoff])
  // C43 fades its closing line before Benja's block mounts. The presentation
  // navigation has no cross-slide transition, so this one boundary delays the
  // dispatch instead of adding another global slide.
  const [c43Exit, setC43Exit] = useState(false)
  const c43ExitLock = useRef(false)
  const c43ExitTimer = useRef<number | null>(null)
  useEffect(() => () => {
    if (c43ExitTimer.current !== null) window.clearTimeout(c43ExitTimer.current)
  }, [])
  const navigationStateRef = useRef(state)
  navigationStateRef.current = state
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
  const homiChat = slide.id === 'S15' || slide.id === 'S16'
  const sceneKey = homiChat ? 'homi-chat' : cine
    ? cineRunKey(state.slideIndex)
    : state.slideIndex === 6
      // S06 stays mounted one beat under S07 so the family closure can be
      // focused and dissolved instead of being cut by the slide boundary.
      ? 'cine-1'
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
      const current = navigationStateRef.current
      setStackHandoff(action === 'NEXT' && current.slideIndex === 11 &&
        current.stepIndex === presentationConfig.slides[11].stepCount - 1 &&
        !window.matchMedia('(prefers-reduced-motion: reduce)').matches)
      setCineHandoff(
        action === 'NEXT' && current.slideIndex === 3 && current.stepIndex === 6
          ? 'home-to-planner'
          : action === 'PREVIOUS' && current.slideIndex === 4 && current.stepIndex === 0
            ? 'planner-to-home'
            : null,
      )
      setFamilyHandoff(
        action === 'NEXT' && current.slideIndex === 4 && current.stepIndex === 4
          ? 'planner-to-family'
          : action === 'PREVIOUS' && current.slideIndex === 5 && current.stepIndex === 0
            ? 'family-to-planner'
            : null,
      )
      setS07Departure(action === 'NEXT' && current.slideIndex === 6 && current.stepIndex === 0)
      setS07Return(action === 'PREVIOUS' && current.slideIndex === 7 && current.stepIndex === 0)
      setPlannerTransition(
        action === 'NEXT' && current.slideIndex === 4 && current.stepIndex === 2
          ? 'calendar-to-plans'
          : action === 'PREVIOUS' && current.slideIndex === 4 && current.stepIndex === 3
            ? 'plans-to-calendar'
            : null,
      )
      // C43 remate → Benja: play the exit fade first, then let the next slide
      // mount. Reversing cancels the fade and returns to the previous beat.
      if (c43ExitLock.current) {
        if (action === 'PREVIOUS') {
          if (c43ExitTimer.current !== null) {
            window.clearTimeout(c43ExitTimer.current)
            c43ExitTimer.current = null
          }
          c43ExitLock.current = false
          setC43Exit(false)
        } else {
          return
        }
      }
      if (action === 'NEXT' && current.slideIndex === 10 && current.stepIndex === C43_BEAT_COUNT - 1 &&
          !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        c43ExitLock.current = true
        setC43Exit(true)
        c43ExitTimer.current = window.setTimeout(() => {
          c43ExitTimer.current = null
          c43ExitLock.current = false
          setC43Exit(false)
          dispatch('NEXT')
        }, 220)
        return
      }
      if (s03Running && action === 'NEXT') {
        // Durante la animación el avance se encola (no salta objetos).
        if (!s03SettledRef.current) { s03EnqueueAdvance(); return }
      }
      if (finalActive && action === 'NEXT') {
        if (!finalReady.current) return
        finalReady.current = false
      }
      if (prepareFinal && finalHandoffTimers.current.length) {
        if (action === 'NEXT') return
        clearFinalHandoff()
        setFinalHandoff(null)
      }
      if (prepareFinal && action === 'NEXT') {
        finalReady.current = false
        if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          setFinalHandoff('zoom')
          finalHandoffTimers.current = [
            window.setTimeout(() => setFinalHandoff('portal'), 505),
            window.setTimeout(() => {
              finalHandoffTimers.current = []
              setFinalHandoff(null)
              dispatch('NEXT')
            }, 685),
          ]
          return
        }
      }
      dispatch(action)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [clearFinalHandoff, finalActive, prepareFinal])

  const s07ToS08 = state.slideIndex === 7 && state.stepIndex === 0 && s07Departure

  return (
    <PresentationFrame>
      <section
        key={sceneKey}
        className="presentation-scene"
        aria-label={slide.name}
        data-slide-id={slide.id}
        data-slide-index={state.slideIndex}
        data-step-index={state.stepIndex}
        data-s07-to-s08={s07ToS08 || undefined}
        data-stack-handoff={stackHandoff && state.slideIndex === 12 && state.stepIndex === 0 || undefined}
        data-final-handoff={prepareFinal ? finalHandoff ?? undefined : undefined}
      >
        {cine ? (
          <>
            <Slide stepIndex={state.stepIndex} slideIndex={state.slideIndex} directSnapshot={directSnapshot} cineHandoff={cineHandoff} familyHandoff={familyHandoff} plannerTransition={plannerTransition} c43Exit={c43Exit} onAdvance={() => dispatch('NEXT')} />
            {s07ToS08 && <S07CoordinarNoEsVigilar stepIndex={0} exiting />}
          </>
        ) : state.slideIndex === 6 ? (
          <>
            {/* The last Family beat stays mounted: S07 focuses and dissolves its
                Mamá card, then the statement lands on the black it leaves. */}
            <CineRun slideIndex={5} stepIndex={FAMILY_BEAT_COUNT - 1} familyOutro />
            <S07CoordinarNoEsVigilar stepIndex={state.stepIndex} returning={s07Return} />
          </>
        ) : state.slideIndex <= 6 ? (
          <>
            <div className="opening-to-home" data-active={state.slideIndex <= 2}
              data-handoff={state.slideIndex === 3 && state.stepIndex === 0} aria-hidden={state.slideIndex > 2}>
              <OpeningSequence slideIndex={Math.min(state.slideIndex, 2)} stepIndex={state.slideIndex <= 2 ? state.stepIndex : 0}
                handoff={state.slideIndex === 3 && state.stepIndex === 0} s03live={state.slideIndex === 2}
                onStep10Complete={handleStep10Complete} onStepSettled={handleStepSettled} />
            </div>
            <HomePlannerSequence slideIndex={state.slideIndex} stepIndex={state.stepIndex} />
          </>
        ) : homiChat ? (
          <HomiV9Stage scene={slide.id === 'S15' ? 's15' : 's16'} stepIndex={state.stepIndex} directSnapshot={directSnapshot} />
        ) : finalActive ? null : <Slide stepIndex={state.stepIndex} directSnapshot={directSnapshot} />}
        {stackHandoff && state.slideIndex === 12 && state.stepIndex === 0 && (
          <div className="s12-stack-outgoing" aria-hidden="true">
            <S12FrontendBackend stepIndex={presentationConfig.slides[11].stepCount - 1} />
          </div>
        )}
      </section>
      {(finalActive || prepareFinal) && (
        <FinalKitchenCanvas stepIndex={finalActive ? state.stepIndex : null} portalPreview={finalHandoff === 'portal'} onNavigateReady={onFinalNavigateReady} />
      )}
      {devMode && slide.id !== 'S12' && slide.id !== 'S13' && !homiChat && !prepareFinal && !finalActive && (
        <output className="presentation-dev" aria-live="polite">
          slideIndex: {state.slideIndex} · stepIndex: {state.stepIndex} · {slide.id} {slide.name}
        </output>
      )}
    </PresentationFrame>
  )
}
