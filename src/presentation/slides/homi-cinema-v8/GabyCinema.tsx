// HOMIE V8 — Secuencias de Gaby (P16–P23).
// 4. Homi relaciona contexto · 5. Una pregunta, tres perspectivas ·
// 6. Homi ≋ HomePlus → Home digital final.
// P15 (negro absoluto) no pertenece a Gaby: es el cierre de Benja.

import { ContextOrbit } from './ContextOrbit'
import { PerspectiveComparison } from './PerspectiveComparison'
import { BrandToHome } from './BrandToHome'

/** P16–P23: composiciones de Gaby, una por disparador. */
export function GabyScene({ beat, onHomeReady }: {
  beat: 'P16' | 'P17' | 'P18' | 'P19' | 'P20' | 'P21' | 'P22' | 'P23'
  onHomeReady?: () => void
}) {
  switch (beat) {
    case 'P16':
      return <ContextOrbit mode="low" />
    case 'P17':
      return <ContextOrbit mode="orbit" />
    case 'P18':
      return <ContextOrbit mode="converge" />
    case 'P19':
      return <PerspectiveComparison stage="question" />
    case 'P20':
      return <PerspectiveComparison stage="perspectives" />
    case 'P21':
      return <PerspectiveComparison stage="answers" />
    case 'P22':
      return <BrandToHome phase="lockup" />
    case 'P23':
      return <BrandToHome phase="reveal" onReady={onHomeReady} />
  }
}
