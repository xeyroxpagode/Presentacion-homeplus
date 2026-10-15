import HomiStage from '../homi-cinema/HomiStage'
import { S17_BEATS } from '../homi-cinema/homiCinemaData'
import type { SlideProps } from '../../presentationTypes'

// V3.1 — Control humano: s0 I10 segunda intención · s1 I11 comparación
// actual/propuesto · s2 I12 decisión pendiente · s3 I13 negro para Gaby.
export default function S17HumanControl({ stepIndex }: SlideProps) {
  const beat = S17_BEATS[Math.min(stepIndex, S17_BEATS.length - 1)]
  return (
    <div className="s17-scene" data-step={stepIndex} aria-label="Homi propone, la decisión es nuestra">
      <HomiStage beat={beat} />
    </div>
  )
}
