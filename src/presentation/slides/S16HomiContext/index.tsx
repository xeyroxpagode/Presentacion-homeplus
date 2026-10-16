import HomiV8Stage from '../homi-cinema-v8/HomiV8Stage'
import { S16_BEATS } from '../homi-cinema-v8/homiV8Data'
import type { SlideProps } from '../../presentationTypes'

// V8 — HOMI Context (Gaby): P08 mirar · P09 comparar · P10 control visual·
// P11 regreso a Homi · P12 intención importante · P13 interpretar ·
// P14 proponer · P15 negro · P16–P23 Gaby.
export default function S16HomiContext({ stepIndex, directSnapshot }: SlideProps) {
  const beat = S16_BEATS[Math.min(stepIndex, S16_BEATS.length - 1)]
  return (
    <div className="s16-scene" data-step={stepIndex} aria-label="La interfaz sigue siendo valiosa">
      <HomiV8Stage beat={beat} directSnapshot={directSnapshot} />
    </div>
  )
}
