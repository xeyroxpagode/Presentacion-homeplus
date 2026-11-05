import { useEffect, useState } from 'react'
import CineScene from '../../cine/CineScene'
import R01Experience from './S04Home/R01Experience'
import FamilyMapIntro from './S06Family/FamilyMapIntro'
import '../../cine/cine.css'
import { c43BeatFor, c43BeatName, cineBeatFor, cineStepFor, cineStepName, FAMILY_MAP_BEATS, s04BeatName, s08BeatFor, s08BeatName, s09BeatFor, s09BeatName, s10BeatFor, s10BeatName } from '../cineSlides'
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
export default function CineRun({ slideIndex, stepIndex, onAdvance, directSnapshot = false, cineHandoff = null, familyHandoff = null, plannerTransition = null, familyOutro = false, c43Exit = false }: SlideProps & { familyOutro?: boolean; c43Exit?: boolean }) {
  const step = cineStepFor(slideIndex ?? -1, stepIndex)
  // R01 V9's seven manual beats are rendered in a dedicated widescreen layer.
  // The original CineScene stays mounted behind it for the S04→S05 traversal.
  const beat = cineBeatFor(slideIndex ?? -1, stepIndex)
  const plannerView = slideIndex === 4 ? stepIndex : undefined
  const r01Active = beat !== null || plannerView !== undefined
  const [showR01, setShowR01] = useState(r01Active)
  useEffect(() => {
    if (r01Active) {
      setShowR01(true)
      return
    }
    // Keep the outgoing Planner frame mounted during the transition to Familia.
    const timer = window.setTimeout(() => setShowR01(false), 700)
    return () => window.clearTimeout(timer)
  }, [r01Active])
  if (step === null) return null
  // S08 opens with C31/C32, two local beats that share global cine step 22.
  const s08Beat = s08BeatFor(slideIndex ?? -1, stepIndex)
  // Finance uses local beats within global steps 27 and 28.
  const s09Beat = s09BeatFor(slideIndex ?? -1, stepIndex)
  // S10 gives the Memories hold and photo zoom separate manual advances.
  const s10Beat = s10BeatFor(slideIndex ?? -1, stepIndex)
  // C43 keeps its three beats on the S11 Continuity step (34).
  const c43Beat = c43BeatFor(slideIndex ?? -1, stepIndex)
  const familyMapActive = slideIndex === 5 && stepIndex < FAMILY_MAP_BEATS.length
  const name = familyMapActive ? FAMILY_MAP_BEATS[stepIndex] : beat !== null ? s04BeatName(beat) : s08Beat !== null ? s08BeatName(s08Beat) : s09Beat !== null ? s09BeatName(s09Beat) : s10Beat !== null ? s10BeatName(s10Beat) : c43Beat !== null ? c43BeatName(c43Beat) : cineStepName(step)
  const dev = typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('dev') === '1'
  const bridge = beat === 6 || cineHandoff === 'home-to-planner'
  return (
    <section
      className={`cine-scene${r01Active ? ' r01-host' : ''}`}
      data-cine-step={step}
      data-cine-scene={name}
      data-cine-home={step >= 8}
      data-home-beat={beat === null ? undefined : 6}
      data-s04-beat={beat === null ? undefined : beat}
      data-home-bridge={bridge ? 'true' : undefined}
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
      <div className="r01-cine-background" data-visible={!r01Active} aria-hidden={r01Active || familyMapActive}>
        <CineScene onAdvance={onAdvance} step={step} beat={beat === null ? null : 6} s08Beat={s08Beat} s09Beat={s09Beat} c43Beat={c43Beat} c43Exit={c43Exit} cineHandoff={cineHandoff} familyHandoff={familyHandoff} directSnapshot={directSnapshot} familyTomiProfile={slideIndex === 5 && !familyMapActive} />
      </div>
      {(slideIndex === 4 || slideIndex === 5) && !familyOutro && (
        <FamilyMapIntro phase={slideIndex === 4 ? 0 : Math.min(stepIndex, FAMILY_MAP_BEATS.length - 1)} active={familyMapActive} snapshot={directSnapshot} />
      )}
      {(r01Active || showR01) && (
        <div className="r01-overlay" data-leaving={!r01Active} aria-hidden={!r01Active}>
          <R01Experience beat={beat ?? 6} plannerView={plannerView ?? (familyHandoff === 'planner-to-family' ? 4 : undefined)} />
        </div>
      )}
      {dev && (
        <output className="cine-dev" aria-live="polite">
          cine {step}/{LAST_CINE_STEP} · {name}
        </output>
      )}
    </section>
  )
}
