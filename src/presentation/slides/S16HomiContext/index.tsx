import HomiV8Stage from '../homi-cinema-v8/HomiV8Stage'
import type { SlideProps } from '../../presentationTypes'

// V8 — HOMI Context (Gaby): P08 mirar · P09 comparar · P10 control visual·
// P11 regreso a Homi · P12 intención importante · P13 interpretar ·
// P14 proponer · P15 negro · P16–P23 Gaby.
export default function S16HomiContext({ stepIndex }: SlideProps) {
  const beat = S16_BEATS[Math.min(stepIndex, S16_BEATS.length - 1)]
  return (
    <div className="s16-scene" data-step={stepIndex} aria-label="La interfaz sigue siendo valiosa">
      <HomiV8Stage key={beat} beat={beat} />
    </div>
  )
}
