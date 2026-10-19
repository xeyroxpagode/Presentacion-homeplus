import CineScene from '../../cine/CineScene'
import '../../cine/cine.css'
import { cineStepFor, cineStepName } from '../cineSlides'
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
export default function CineRun({ slideIndex, stepIndex }: SlideProps) {
  const step = cineStepFor(slideIndex ?? -1, stepIndex)
  if (step === null) return null
  const name = cineStepName(step)
  const dev = typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('dev') === '1'
  return (
    <section
      className="cine-scene"
      data-cine-step={step}
      data-cine-scene={name}
      data-cine-home={step >= 8}
      data-stagebg={step <= 1 ? 'dark' : step <= 8 ? 'white' : 'paper'}
      aria-label={`HomePlus cinemático: ${name}`}
    >
      <CineScene step={step} />
      {dev && (
        <output className="cine-dev" aria-live="polite">
          cine {step}/{LAST_CINE_STEP} · {name}
        </output>
      )}
    </section>
  )
}