import AmbientGlow from '../components/AmbientGlow'
import S01Chaos from '../slides/S01Chaos'
import S02FragmentedInfo from '../slides/S02FragmentedInfo'
import S03HomePlus from '../slides/S03HomePlus'
import LetterPortalBridge from './LetterPortalBridge'
import { openingTokens, openingVariables } from './openingTokens'
import './opening.css'

type OpeningSequenceProps = { slideIndex: number; stepIndex: number }

// These layers stay mounted across S01–S03: leaving elements can finish moving
// while the next idea appears. Every target is derived from navigation state.
export default function OpeningSequence({ slideIndex, stepIndex }: OpeningSequenceProps) {
  const glowOpacity = slideIndex === 0 ? openingTokens.glow.quiet
    : slideIndex === 1 ? openingTokens.glow.distributed : openingTokens.glow.reveal

  return (
    <div className="opening-sequence" style={openingVariables} data-opening-scene={slideIndex}>
      <AmbientGlow className="opening-stage-light" x={slideIndex === 2 ? 640 : 670}
        y={slideIndex === 2 ? 350 : 380} size={slideIndex === 2 ? 1120 : 920} intensity={0.72} opacity={glowOpacity} />
      <AmbientGlow className="opening-chaos-light" x={620} y={430} size={620} intensity={0.7}
        opacity={slideIndex === 0 && stepIndex === 5 ? openingTokens.glow.chaosFocus : 0} />
      <AmbientGlow className="opening-brand-depth" x={410} y={470} size={700} intensity={0.5}
        opacity={slideIndex === 2 ? openingTokens.glow.brandDepth : 0} />
      <S01Chaos stepIndex={slideIndex === 0 ? stepIndex : 5} active={slideIndex === 0} />
      <S02FragmentedInfo
        stepIndex={slideIndex === 1 ? stepIndex : slideIndex === 0 ? 0 : 6}
        phase={slideIndex === 1 ? 'active' : slideIndex === 2 ? 'converging' : 'hidden'}
      />
      <div aria-hidden="true" className="opening-blackout" data-active={slideIndex === 2} />
      <S03HomePlus active={slideIndex === 2} />
      {/* S02 V1.6: portal vectorial S02.8→S03 (contraforma de la «g» de
          «hogar», línea 2; 1200 ms). S03 intacta: el overlay la revela
          exclusivamente a través de la abertura y se retira. */}
      {slideIndex === 2 && <LetterPortalBridge />}
    </div>
  )
}
