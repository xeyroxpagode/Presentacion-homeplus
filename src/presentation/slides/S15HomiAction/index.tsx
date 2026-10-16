import HomiV7Stage from '../homi-cinema-v7/HomiV7Stage'
import { S15_BEATS } from '../homi-cinema-v7/homiV7Data'
import type { SlideProps } from '../../presentationTypes'

// V7 — HOMI Action (Benja: intención → propuesta → confirmación → Planner):
// B01 Homi compacto · B02 composer en foco · B03 mensaje Coca ·
// B04 propuesta · B05 confirmación · B06 Planner ejecuta ·
// B07 trabaja sobre HomePlus (composición integrada; B08 la sostiene para
// continuidad S15→S16 sin flash ni reconstrucción).
export default function S15HomiAction({ stepIndex }: SlideProps) {
  const beat = S15_BEATS[Math.min(stepIndex, S15_BEATS.length - 1)]
  return (
    <div className="s15-scene" data-step={stepIndex} aria-label="Homi actúa sobre HomePlus">
      <HomiV7Stage key={beat} beat={beat} />
    </div>
  )
}
