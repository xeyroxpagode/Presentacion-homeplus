import HomiV7Stage from '../homi-cinema-v7/HomiV7Stage'
import { S16_BEATS } from '../homi-cinema-v7/homiV7Data'
import type { SlideProps } from '../../presentationTypes'

// V7 — Sistema unificado + negro (Benja: la interfaz conserva su valor, la
// decisión es humana): B08 mirar · B09 comparar · B10 control visual ·
// B11 Homi cuando decir es más rápido · B12 decisión final nuestra ·
// B13 negro absoluto. B08 sostiene la composición integrada de B07.
export default function S16HomiContext({ stepIndex }: SlideProps) {
  const beat = S16_BEATS[Math.min(stepIndex, S16_BEATS.length - 1)]
  return (
    <div className="s16-scene" data-step={stepIndex} aria-label="La interfaz sigue siendo valiosa">
      <HomiV7Stage key={beat} beat={beat} />
    </div>
  )
}
