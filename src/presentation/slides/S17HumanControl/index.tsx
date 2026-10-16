import HomiV4Stage from '../homi-cinema-v4/HomiV4Stage'
import { S17_TRIGGERS } from '../homi-cinema-v4/homiV4Data'
import type { SlideProps } from '../../presentationTypes'

// V4.2 — Human Control:
// s0 T10 solicitud importante · s1 T11 propuesta sin confirmar ·
// s2 T12 negro absoluto para Gaby.
export default function S17HumanControl({ stepIndex }: SlideProps) {
  const trigger = S17_TRIGGERS[Math.min(stepIndex, S17_TRIGGERS.length - 1)]
  return (
    <div className="s17-scene" data-step={stepIndex} aria-label="Homi propone, la decisión es nuestra">
      <HomiV4Stage key={trigger} trigger={trigger} />
    </div>
  )
}
