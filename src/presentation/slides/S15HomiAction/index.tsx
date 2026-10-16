import HomiV6Stage from '../homi-cinema-v6/HomiV6Stage'
import { S15_BEATS } from '../homi-cinema-v6/homiV6Data'
import type { SlideProps } from '../../presentationTypes'

// V6 — HOMI Action (Benja: intención → propuesta → confirmación → Planner):
// P01 aparece Homi · P02 ecos · P03 foco composer · P04 pedido Coca ·
// P05 entiende · P06 propuesta · P07 decisión · P08 confirmación ·
// P09 Planner ejecuta · P10 trabaja sobre HomePlus.
export default function S15HomiAction({ stepIndex }: SlideProps) {
  const beat = S15_BEATS[Math.min(stepIndex, S15_BEATS.length - 1)]
  return (
    <div className="s15-scene" data-step={stepIndex} aria-label="Homi actúa sobre HomePlus">
      <HomiV6Stage key={beat} beat={beat} />
    </div>
  )
}
