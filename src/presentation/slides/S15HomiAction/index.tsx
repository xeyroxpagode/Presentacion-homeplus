import HomiV4Stage from '../homi-cinema-v4/HomiV4Stage'
import { S15_TRIGGERS } from '../homi-cinema-v4/homiV4Data'
import type { SlideProps } from '../../presentationTypes'

// V4.2 — HOMI Action (contraste B + acción):
// s0 T01 reveal Homi · s1 T02 recuerdo formulario Fricción ·
// s2 T03 sustitución hacia Homi · s3 T04 solicitud Coca ·
// s4 T05 propuesta pendiente · s5 T06 confirmación y resultado en Planner.
export default function S15HomiAction({ stepIndex }: SlideProps) {
  const trigger = S15_TRIGGERS[Math.min(stepIndex, S15_TRIGGERS.length - 1)]
  return (
    <div className="s15-scene" data-step={stepIndex} aria-label="Homi actúa sobre HomePlus">
      <HomiV4Stage key={trigger} trigger={trigger} />
    </div>
  )
}
