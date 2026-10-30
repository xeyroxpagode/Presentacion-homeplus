import { useEffect } from 'react'
import AmbientGlow from '../components/AmbientGlow'
import S01Chaos from '../slides/S01Chaos'
import S02FragmentedInfo from '../slides/S02FragmentedInfo'
import S03HomePlus from '../slides/S03HomePlus'
import { s03StartEntry, s03InvalidateEntry } from '../slides/S03HomePlus/s03Clock'
import LetterPortalBridge from './LetterPortalBridge'
import { openingTokens, openingVariables } from './openingTokens'
import './opening.css'

type OpeningSequenceProps = {
  slideIndex: number
  stepIndex: number
  handoff?: boolean
  s03live?: boolean
  onStep10Complete?: () => void
  /** El step activo de S03 alcanzó su estado final (reposo). */
  onStepSettled?: () => void
}

// These layers stay mounted across S01–S03: leaving elements can finish moving
// while the next idea appears. Every target is derived from navigation state.
// S01 V5.2.1: seis beats (0–5); el terminal es el step 5 (PHONE_INSIDE).
export default function OpeningSequence({ slideIndex, stepIndex, handoff = false, s03live, onStep10Complete, onStepSettled }: OpeningSequenceProps) {
  // S03 — autoridad temporal del host: el epoch compartido portal/dibujo se
  // fija en EFECTO (nunca durante el render) sólo en transiciones reales:
  // entrar en S03 abre un ciclo nuevo; salir lo invalida; S03.0→S03.1 no
  // re-dispara (entered no cambia) y un render normal jamás lo reinicia.
  // `s03live` es el slide REAL (el prop slideIndex viene capado con min() y
  // no distingue S03 de S04+): sin él, S04 reactivaría el ciclo en oculto.
  const live = s03live ?? slideIndex === 2
  const entered = live && !handoff && slideIndex === 2
  useEffect(() => {
    if (entered) s03StartEntry()
    else s03InvalidateEntry()
  }, [entered])
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
      {/* Handoff S01→S02: S01.5 permanece montada y visible detrás durante
          S02.0. El puente (s01DiveBridge) mantiene la cámara 3D original en
          PHONE_INSIDE; S02.0 es el HOLD fullscreen que toma la superficie
          sólo con cobertura geométrica total, sin fade ni capa negra. Al
          avanzar a S02.1+ el fullscreen de WhatsApp ya la ocluye y S01
          puede retirarse. */}
      <S01Chaos
        stepIndex={slideIndex === 0 ? stepIndex : 5}
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
          interno; montada desde t=0 detrás del portal. `active` usa el slide
          real: fuera de S03 el timeline de entrada NO se consume. */}
      <S03HomePlus
        active={entered}
        stepIndex={slideIndex === 2 ? stepIndex : 0}
        onStep10Complete={onStep10Complete}
        onStepSettled={onStepSettled}
      />
      {/* Portal vectorial S02.8→S03 (contraforma de la «g» de «hogar»,
          línea 2; 1200 ms). S03 intacta: el overlay la revela exclusivamente
          a través de la abertura y se retira. Sólo en S03.0: en steps
          posteriores o al volver con PREV a S03.10+ no se repite. */}
      {entered && stepIndex === 0 && <LetterPortalBridge />}
    </div>
  )
}
