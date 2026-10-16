import HomiV6Stage from '../homi-cinema-v6/HomiV6Stage'
import { S17_BEATS } from '../homi-cinema-v6/homiV6Data'
import type { SlideProps } from '../../presentationTypes'

// V6 — Human Control / Contexto y propósito (Gaby): P20 identidad Homi ·
// P21 tres superficies · P22 pendiente · P23 gastos · P24 faltantes ·
// P25 convergencia · P26 pregunta simple · P27 consulta mañana ·
// P28 Tomi · P29 Juli · P30 papá · P31 comparación · P32 el mañana de
// cada uno · P33 HomePlus · P34–P37 menos que administrar/recordar/
// buscar/preocuparse · P38 Home final listo para el hilo 3D.
export default function S17HumanControl({ stepIndex }: SlideProps) {
  const beat = S17_BEATS[Math.min(stepIndex, S17_BEATS.length - 1)]
  return (
    <div className="s17-scene" data-step={stepIndex} aria-label="Homi propone, la decisión es nuestra">
      <HomiV6Stage key={beat} beat={beat} />
    </div>
  )
}
