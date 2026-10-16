import HomiV6Stage from '../homi-cinema-v6/HomiV6Stage'
import { S16_BEATS } from '../homi-cinema-v6/homiV6Data'
import type { SlideProps } from '../../presentationTypes'

// V6 — HOMI Context (Benja: la interfaz conserva su valor, la decisión es
// humana): P11 no reemplazar por chat · P12 mirar · P13 comparar ·
// P14 control visual · P15 Homi cuando decir es más rápido ·
// P16 dos formas, un sistema · P17 recuerdo congelado ·
// P18 decisión final nuestra · P19 negro absoluto.
export default function S16HomiContext({ stepIndex }: SlideProps) {
  const beat = S16_BEATS[Math.min(stepIndex, S16_BEATS.length - 1)]
  return (
    <div className="s16-scene" data-step={stepIndex} aria-label="La interfaz sigue siendo valiosa">
      <HomiV6Stage key={beat} beat={beat} />
    </div>
  )
}
