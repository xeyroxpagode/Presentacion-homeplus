import HomiV7Stage from '../homi-cinema-v7/HomiV7Stage'
import { S17_BEATS } from '../homi-cinema-v7/homiV7Data'
import type { SlideProps } from '../../presentationTypes'

// V7 — Contexto y propósito (Gaby): G14 Homi + espacio contextual ·
// G15 viewport Planner · G16 viewport Finance · G17 viewport Inventory ·
// G18 contexto se retira · G19 pregunta · G20 tres identidades ·
// G21 tres respuestas · G22 respuestas se retiran · G23 Home ·
// G24–G26 focos · G27 Home estable listo para el hilo 3D.
export default function S17HumanControl({ stepIndex }: SlideProps) {
  const beat = S17_BEATS[Math.min(stepIndex, S17_BEATS.length - 1)]
  return (
    <div className="s17-scene" data-step={stepIndex} aria-label="Homi propone, la decisión es nuestra">
      <HomiV7Stage key={beat} beat={beat} />
    </div>
  )
}
