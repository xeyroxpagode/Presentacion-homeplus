import HomiV8Stage from '../homi-cinema-v8/HomiV8Stage'
import type { SlideProps } from '../../presentationTypes'

// V8 — HOMI Action (Benja: intención → propuesta → confirmación → Planner):
// P01 Homi vacío · P02 composer en foco · P03 pedido Coca · P04 interpretación·
// P05 propuesta · P06 confirmación · P07 HomePlus realiza la acción.
export default function S15HomiAction({ stepIndex }: SlideProps) {
  const beat = S15_BEATS[Math.min(stepIndex, S15_BEATS.length - 1)]
  return (
    <div className="s15-scene" data-step={stepIndex} aria-label="Homi actúa sobre HomePlus">
      <HomiV8Stage key={beat} beat={beat} />
    </div>
  )
}
