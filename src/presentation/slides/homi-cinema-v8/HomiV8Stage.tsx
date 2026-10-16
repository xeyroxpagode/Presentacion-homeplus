// HOMIE V8 — Composición general. 23 disparadores, 6 secuencias, 9 fotogramas.
// El stage monta la escena correspondiente al beat: avance, retroceso y salto
// directo reconstruyen el snapshot correcto sin reproducir la secuencia.
// Sin mutaciones reales, sin reloj del sistema para el calendario, sin
// autoplay, sin loops decorativos. Cada beat termina en un hold estable.

import { BEAT_LABELS, sceneFor, type HomiV8Beat } from './homiV8Data'
import { BenjaScene } from './BenjaCinema'
import { GabyScene } from './GabyCinema'
import { EditorialCarousel, type CarouselFrame } from './EditorialCarousel'
import { V8FinTyping, V8HomiEmpty, V8HomiThread, V8Thinking } from './HomiComposerScene'
import { V8ProposalFinance } from './ProposalScene'
import { FIN_GROUPS, FIN_MESSAGE_FULL } from './homiV8Data'
import './homi-v8.css'

function FinBubble() {
  return (
    <div className="homi-user-bubble v8-present" data-compact aria-label={FIN_MESSAGE_FULL}>
      <p>{FIN_MESSAGE_FULL}</p>
    </div>
  )
}

function FinInterpreting() {
  return (
    <V8HomiThread label={FIN_MESSAGE_FULL}>
      <div className="v8-message-zone">
        <FinBubble />
      </div>
      <V8Thinking />
    </V8HomiThread>
  )
}

function FinProposal() {
  return (
    <V8HomiThread label="Propuesta de cambios: 3 acciones para revisar, sin ejecutar">
      <div className="v8-message-zone">
        <FinBubble />
      </div>
      <V8ProposalFinance />
    </V8HomiThread>
  )
}

/** P11: regreso a Homi. El fragmento final se retira; Homi vuelve al centro. */
function HomiReturn() {
  return (
    <div className="v8-return">
      <div className="v8-carousel-exit" aria-hidden="true"><EditorialCarousel frame={2} /></div>
      <div className="v8-homi-pos v8-homi-return-pos">
        <V8HomiEmpty />
      </div>
    </div>
  )
}

/** P15: negro absoluto entre oradores. Sin logo, sin texto, sin textura. */
function Blackout() {
  return (
    <div className="v8-blackout-scene" aria-label="Fin de la intervención de Benja">
      <div className="v8-homi-pos v8-homi-fin-grow"><FinProposal /></div>
      <div className="v8-black" aria-hidden="true" />
    </div>
  )
}

/** Keys estables por grupo de continuidad: el carrusel y las perspectuids
 *  persisten entre frames (la transición la gestiona el componente interno). */
function sceneGroupKey(scene: ReturnType<typeof sceneFor>, beat: HomiV8Beat): string {
  if (beat === 'P08' || beat === 'P09' || beat === 'P10') return 'carousel'
  if (beat === 'P16' || beat === 'P17' || beat === 'P18') return 'context'
  if (beat === 'P20' || beat === 'P21') return 'perspectives'
  if (beat === 'P22' || beat === 'P23') return 'brand-home'
  return scene
}

function SceneContent({ beat, directSnapshot }: { beat: HomiV8Beat; directSnapshot: boolean }) {
  const scene = sceneFor(beat)
  switch (scene) {
    // ——— Benja: Homi aparece y Coca se convierte en fila de Planner ———
    case 'homi-empty':
    case 'composer-focus':
    case 'coca-typing':
    case 'coca-sent':
    case 'interpreting':
    case 'proposal-coca':
    case 'confirm-press':
    case 'planner-morph':
      return <BenjaScene beat={beat as 'P01' | 'P02' | 'P03' | 'P04' | 'P05' | 'P06' | 'P07'} directSnapshot={directSnapshot} />

    // ——— Carrusel editorial rápido (un solo contenedor inmóvil) ———
    case 'carousel-mirar':
    case 'carousel-comparar':
    case 'carousel-control':
      return <EditorialCarousel frame={(beat === 'P08' ? 0 : beat === 'P09' ? 1 : 2) as CarouselFrame} />

    // ——— Regreso a Homi + intención financiera importante ———
    case 'homi-return':
      return <HomiReturn />
    case 'fin-typing':
      return (
        <div className="v8-homi-pos v8-homi-return-pos">
          <V8FinTyping message={FIN_MESSAGE_FULL} groups={FIN_GROUPS} directSnapshot={directSnapshot} />
        </div>
      )
    case 'fin-interpreting':
      return (
        <div className="v8-homi-pos v8-homi-return-pos">
          <FinInterpreting />
        </div>
      )
    case 'proposal-finance':
      return (
        <div className="v8-homi-pos v8-homi-return-pos v8-homi-fin-grow">
          <FinProposal />
        </div>
      )

    // ——— Negro de cambio de orador ———
    case 'blackout':
      return <Blackout />

    // ——— Gaby: contexto, perspectivas y cierre de marcas ———
    case 'homi-low':
    case 'context-orbit':
    case 'context-converge':
    case 'question':
    case 'perspectives':
    case 'answers':
    case 'lockup':
    case 'home-reveal':
      return <GabyScene beat={beat as 'P16' | 'P17' | 'P18' | 'P19' | 'P20' | 'P21' | 'P22' | 'P23'} directSnapshot={directSnapshot} />
  }
}

export default function HomiV8Stage({ beat, directSnapshot = false }: { beat: HomiV8Beat; directSnapshot?: boolean }) {
  return (
    <div className="v8-stage" data-beat={beat} data-motion={directSnapshot ? 'snapshot' : 'animate'} aria-label={`HOMIE V8 ${beat}: ${BEAT_LABELS[beat]}`}>
      <div className="v8-layer" data-layer="base" aria-hidden="true" />
      <SceneContent key={sceneGroupKey(sceneFor(beat), beat)} beat={beat} directSnapshot={directSnapshot} />
    </div>
  )
}
