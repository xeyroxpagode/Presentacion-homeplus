import HomiV8Stage from '../homi-cinema-v8/HomiV8Stage'
import { S15_BEATS } from '../homi-cinema-v8/homiV8Data'
import type { SlideProps } from '../../presentationTypes'

// V8 — HOMI Action (Benja: intención → propuesta → confirmación → Planner):
// P01 Homi vacío · P02 composer en foco · P03 pedido Coca · P04 interpretación·
// P05 propuesta · P06 confirmación · P07 HomePlus realiza la acción.
export default function S15HomiAction({ stepIndex, directSnapshot }: SlideProps) {
  const beat = S15_BEATS[Math.min(stepIndex, S15_BEATS.length - 1)]
  return (
    <div className="s15-scene" data-step={stepIndex} aria-label="Homi actúa sobre HomePlus">
      <HomiV8Stage beat={beat} directSnapshot={directSnapshot} />
    </div>
  )
}
