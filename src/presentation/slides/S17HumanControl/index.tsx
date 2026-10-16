import HomiV8Stage from '../homi-cinema-v8/HomiV8Stage'
import type { SlideProps } from '../../presentationTypes'

// V8 — HOMI Context (Gaby): P16 Homi low · P17 contextos · P18 convergencia·
// P19 pregunta · P20 perspectivas · P21 respuestas · P22 lockup·
// P23 morph Home digital. Contexto: tres referencias simbólicas.
export default function S17HumanControl({ stepIndex }: SlideProps) {
  const beat = S17_BEATS[Math.min(stepIndex, S17_BEATS.length - 1)]
  return (
    <div className="s17-scene" data-step={stepIndex} aria-label="Homi propone, la decisión es nuestra">
      <HomiV8Stage key={beat} beat={beat} />
    </div>
  )
}
