import HomePlusLogo from '../../components/HomePlusLogo'
import { openingTokens } from '../../opening/openingTokens'

export default function S03HomePlus({ active = true }: { active?: boolean }) {
  return (
    <div className="homeplus-reveal opening-layer" data-active={active} aria-hidden={!active}>
      <div className="homeplus-signature">
        <HomePlusLogo size={openingTokens.logoSize} />
        <h1>HomePlus</h1>
      </div>
    </div>
  )
}
