import HomiStage from '../homi-cinema/HomiStage'
import { S16_BEATS } from '../homi-cinema/homiCinemaData'
import type { SlideProps } from '../../presentationTypes'

// V3.1 — Valor de la interfaz: s0 I08 Planner ampliado (mirar/comparar/
// control) · s1 I09 dos formas de interactuar con el mismo dato.
export default function S16HomiContext({ stepIndex }: SlideProps) {
  const beat = S16_BEATS[Math.min(stepIndex, S16_BEATS.length - 1)]
  return (
    <div className="s16-scene" data-step={stepIndex} aria-label="La interfaz sigue siendo valiosa">
      <HomiStage beat={beat} />
    </div>
  )
}
