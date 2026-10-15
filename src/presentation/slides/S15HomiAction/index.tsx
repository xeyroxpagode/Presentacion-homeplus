import HomiStage from '../homi-cinema/HomiStage'
import { S15_BEATS } from '../homi-cinema/homiCinemaData'
import type { SlideProps } from '../../presentationTypes'

// V3.1 — Acción de Homi: frase → propuesta → (confirmación) → TaskRow en Planner.
// s0 I00 reveal · s1 I01 cede espacio · s2 I02–I03 solicitud ·
// s3 I04–I05 morph + propuesta · s4 I06–I07 transformación protagonista.
export default function S15HomiAction({ stepIndex }: SlideProps) {
  const beat = S15_BEATS[Math.min(stepIndex, S15_BEATS.length - 1)]
  return (
    <div className="s15-scene" data-step={stepIndex} aria-label="Homi actúa sobre HomePlus">
      <HomiStage beat={beat} />
    </div>
  )
}
