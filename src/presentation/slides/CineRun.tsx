import CineScene from '../../cine/CineScene'
import '../../cine/cine.css'
import { c43BeatFor, c43BeatName, cineBeatFor, cineStepFor, cineStepName, s04BeatName, s08BeatFor, s08BeatName, s09BeatFor, s09BeatName, s10BeatFor, s10BeatName } from '../cineSlides'
import type { SlideProps } from '../presentationTypes'

const LAST_CINE_STEP = 36

/**
 * Hosts the cinematic run inside the normal presentation navigation.
 *
 * The whole `CineScene` tree is one continuous composition, so this component
 * is intentionally a single shared component for every cine slide: React only
 * animates the travelers between steps when `CineScene` stays mounted. The
 * per-slide split happens only at the presentation level, via the run key in
 * `Presentation` and the block starts in `cineSlides`.
 *
 * `CineApp` is not used here on purpose: it owns its own step counter,
 * auto-advance timers and `window` listeners, which would fight the
 * presentation's navigation. The wrapper attributes below are copied from it
 * because `cine.css` drives 121 rules off `data-cine-step`.
 */
export default function CineRun({ slideIndex, stepIndex, cineHandoff = null, familyHandoff = null, plannerTransition = null, familyOutro = false, c43Exit = false }: SlideProps & { familyOutro?: boolean; c43Exit?: boolean }) {
  const step = cineStepFor(slideIndex ?? -1, stepIndex)
  if (step === null) return null
  // S04 runs a local beat axis (7 beats) that shares one global cine step.
  const beat = cineBeatFor(slideIndex ?? -1, stepIndex)
  // S08 opens with C31/C32, two local beats that share global cine step 22.
  const s08Beat = s08BeatFor(slideIndex ?? -1, stepIndex)
  // S09 keeps the three Finance advances on steps 27/27/28.
  const s09Beat = s09BeatFor(slideIndex ?? -1, stepIndex)
  // S10 gives the Memories hold and photo zoom separate manual advances.
  const s10Beat = s10BeatFor(slideIndex ?? -1, stepIndex)
  // C43 keeps its three beats on the S11 Continuity step (34).
  const c43Beat = c43BeatFor(slideIndex ?? -1, stepIndex)
  const name = beat !== null ? s04BeatName(beat) : s08Beat !== null ? s08BeatName(s08Beat) : s09Beat !== null ? s09BeatName(s09Beat) : s10Beat !== null ? s10BeatName(s10Beat) : c43Beat !== null ? c43BeatName(c43Beat) : cineStepName(step)
  const dev = typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('dev') === '1'
  return (
    <section
      className="cine-scene"
      data-cine-step={step}
      data-cine-scene={name}
      data-cine-home={step >= 8}
      data-home-beat={beat === null ? undefined : beat}
      data-p01-handoff={cineHandoff ?? undefined}
      data-family-handoff={familyHandoff ?? undefined}
      data-planner-beat={slideIndex === 4 ? stepIndex : undefined}
      data-planner-transition={slideIndex === 4 ? plannerTransition ?? undefined : undefined}
      data-s08-beat={s08Beat ?? undefined}
      data-s09-beat={s09Beat ?? undefined}
      data-s10-beat={s10Beat ?? undefined}
      data-c43-beat={c43Beat ?? undefined}
      data-stagebg={step <= 1 ? 'dark' : step <= 8 ? 'white' : 'paper'}
      data-family-outro={familyOutro ? 'true' : undefined}
      aria-label={`HomePlus cinemático: ${name}`}
    >
      <CineScene step={step} beat={beat} s08Beat={s08Beat} s09Beat={s09Beat} c43Beat={c43Beat} c43Exit={c43Exit} cineHandoff={cineHandoff} familyHandoff={familyHandoff} />
      {dev && (
        <output className="cine-dev" aria-live="polite">
          cine {step}/{LAST_CINE_STEP} · {name}
        </output>
      )}
    </section>
  )
}
