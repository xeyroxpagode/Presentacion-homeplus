import AmbientGlow from '../components/AmbientGlow'
import S01Chaos from '../slides/S01Chaos'
import S02FragmentedInfo from '../slides/S02FragmentedInfo'
import S03HomePlus from '../slides/S03HomePlus'
import { s03EntryEpoch } from '../slides/S03HomePlus/s03Clock'
import LetterPortalBridge from './LetterPortalBridge'
import { openingTokens, openingVariables } from './openingTokens'
import './opening.css'

type OpeningSequenceProps = { slideIndex: number; stepIndex: number; handoff?: boolean }

// These layers stay mounted across S01–S03: leaving elements can finish moving
// while the next idea appears. Every target is derived from navigation state.
export default function OpeningSequence({ slideIndex, stepIndex, handoff = false }: OpeningSequenceProps) {
  // S03: epoch compartido portal/dibujo (s03Clock). Se fija en este render
  // para que LetterPortalBridge y S03HomePlus del mismo commit compartan
  // el origen temporal; sólo cambia al cambiar de slide, nunca entre steps.
  s03EntryEpoch(`opening-${slideIndex}`)
  // Handoff S03.10→S04.0: el frame ya es superficie Home (#F6F5F2); esta
  // capa entrega un velo del mismo material para que el fundido del wrapper
  // (.opening-to-home) sea invisible: sin frame negro, sin segundo zoom.
  if (handoff) {
    return (
      <div className="opening-sequence" style={openingVariables} data-opening-scene={slideIndex}>
        <div className="opening-handoff-veil" aria-hidden="true" />
      </div>
    )
  }
  const glowOpacity = slideIndex === 0 ? openingTokens.glow.quiet
    : slideIndex === 1 ? openingTokens.glow.distributed : openingTokens.glow.reveal
  // S03 posee su fondo editorial (#080504): los glows heredados se
  // neutralizan localmente mientras S03 está activa (GATE 2).
  const s03Clean = slideIndex === 2

  return (
    <div className="opening-sequence" style={openingVariables} data-opening-scene={slideIndex}>
      <AmbientGlow className="opening-stage-light" x={slideIndex === 2 ? 640 : 670}
        y={slideIndex === 2 ? 350 : 380} size={slideIndex === 2 ? 1120 : 920} intensity={0.72} opacity={s03Clean ? 0 : glowOpacity} />
      <AmbientGlow className="opening-chaos-light" x={620} y={430} size={620} intensity={0.7}
        opacity={s03Clean ? 0 : (slideIndex === 0 && stepIndex === 5 ? openingTokens.glow.chaosFocus : 0)} />
      <AmbientGlow className="opening-brand-depth" x={410} y={470} size={700} intensity={0.5}
        opacity={s03Clean ? 0 : openingTokens.glow.brandDepth} />
      {/* Handoff canónico S01→S02 (§10–§13): S01.3 permanece montada y
          visible detrás durante S02.0. El Phone Dive es la cámara 3D
          original (puente s01DiveBridge); S02.0 es el HOLD fullscreen que
          toma la superficie sólo al cubrir la pantalla el viewport, sin
          fade ni capa negra. Al avanzar a S02.1+ el fullscreen de WhatsApp
          ya la ocluye y S01 puede retirarse. */}
      <S01Chaos
        stepIndex={slideIndex === 0 ? stepIndex : 3}
        active={slideIndex === 0 || (slideIndex === 1 && stepIndex === 0)}
        phoneHidden={slideIndex !== 0}
        sceneKey={slideIndex}
      />
      <S02FragmentedInfo
        stepIndex={slideIndex === 1 ? stepIndex : slideIndex === 0 ? 0 : 6}
        phase={slideIndex === 1 ? 'active' : slideIndex === 2 ? 'converging' : 'hidden'}
      />
      {/* Blackout retirado del handoff S02→S03: el portal vectorial es la
          única transición y S03 nace dibujándose detrás (un flash negro
          z=3 taparía el primer trazo). Elemento conservado por compatibilidad. */}
      <div aria-hidden="true" className="opening-blackout" data-active={false} />
      {/* S03 cinematográfica (11 beats): recibe el step para su timeline
          interno; montada desde t=0 detrás del portal (GATE 1). */}
      <S03HomePlus active={slideIndex === 2} stepIndex={slideIndex === 2 ? stepIndex : 0} />
      {/* S02 V1.6: portal vectorial S02.8→S03 (contraforma de la «g» de
          «hogar», línea 2; 1200 ms). S03 intacta: el overlay la revela
          exclusivamente a través de la abertura y se retira. */}
      {slideIndex === 2 && <LetterPortalBridge />}
    </div>
  )
}
