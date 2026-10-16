import HomiV4Stage from '../homi-cinema-v4/HomiV4Stage'
import { S16_TRIGGERS } from '../homi-cinema-v4/homiV4Data'
import type { SlideProps } from '../../presentationTypes'

// V4.2 — HOMI Context / Two Ways:
// s0 T07 Planner visual amplio · s1 T08 regreso a Homi ·
// s2 T09 destello de las dos formas (única composición dual).
export default function S16HomiContext({ stepIndex }: SlideProps) {
  const trigger = S16_TRIGGERS[Math.min(stepIndex, S16_TRIGGERS.length - 1)]
  return (
    <div className="s16-scene" data-step={stepIndex} aria-label="La interfaz sigue siendo valiosa">
      <HomiV4Stage key={trigger} trigger={trigger} />
    </div>
  )
}
