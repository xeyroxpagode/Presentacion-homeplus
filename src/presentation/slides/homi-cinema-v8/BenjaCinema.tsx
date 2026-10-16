// HOMIE V8 — Secuencias de Benja (P01–P07).
// 1. Homi aparece · 2. Ejemplo Coca → propuesta → confirmación → Planner.
// P08+ no pertenece a Benja: carrusel, regreso, finanzas y negro los monta
// HomiV8Stage directamente o vía GabyScene.

import { V8CocaTyping, V8HomiEmpty, V8HomiFocused, V8HomiThread, V8Thinking } from './HomiComposerScene'
import { V8ProposalCoca } from './ProposalScene'
import { PlannerTransfer } from './PlannerTransfer'
import { COCA_GROUPS, COCA_MESSAGE_FULL } from './homiV8Data'

export type BenjaBeat = 'P01' | 'P02' | 'P03' | 'P04' | 'P05' | 'P06' | 'P07'

function CocaBubble() {
  return (
    <div className="homi-user-bubble v8-present" data-compact aria-label={COCA_MESSAGE_FULL}>
      <p>{COCA_MESSAGE_FULL}</p>
    </div>
  )
}

/** P01–P07: composiciones de Benja, una por disparador. */
export function BenjaScene({ beat, directSnapshot = false }: { beat: BenjaBeat; directSnapshot?: boolean }) {
  switch (beat) {
    case 'P01':
      return (
        <div className="v8-homi-pos v8-homi-empty-pos">
          <V8HomiEmpty />
        </div>
      )
    case 'P02':
      return (
        <div className="v8-homi-pos v8-homi-empty-pos">
          <V8HomiFocused />
        </div>
      )
    case 'P03':
      return (
        <div className="v8-homi-pos v8-homi-conv-pos v8-homi-grow">
          <V8CocaTyping message={COCA_MESSAGE_FULL} groups={COCA_GROUPS} directSnapshot={directSnapshot} />
        </div>
      )
    case 'P04':
      return (
        <div className="v8-homi-pos v8-homi-conv-pos">
          <V8HomiThread label={COCA_MESSAGE_FULL}>
            <div className="v8-message-zone">
              <CocaBubble />
            </div>
            <V8Thinking />
          </V8HomiThread>
        </div>
      )
    case 'P05':
      return (
        <div className="v8-homi-pos v8-homi-conv-pos">
          <V8HomiThread label={COCA_MESSAGE_FULL}>
            <div className="v8-message-zone">
              <CocaBubble />
            </div>
            <V8ProposalCoca />
          </V8HomiThread>
        </div>
      )
    case 'P06':
      return (
        <div className="v8-homi-pos v8-homi-conv-pos">
          <V8HomiThread label={COCA_MESSAGE_FULL}>
            <div className="v8-message-zone">
              <CocaBubble />
            </div>
            <V8ProposalCoca pressed />
          </V8HomiThread>
        </div>
      )
    case 'P07':
      return <PlannerTransfer directSnapshot={directSnapshot} />
  }
}
