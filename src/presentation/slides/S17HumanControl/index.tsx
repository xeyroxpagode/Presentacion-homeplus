import AmbientGlow from '../../components/AmbientGlow'
import PhoneFrame from '../../components/PhoneFrame'
import HomiDecisionDemoScreen from '../../app-screens/HomiDecisionDemoScreen'
import type { SlideProps } from '../../presentationTypes'
import './s17-homi.css'

export default function S17HumanControl({ stepIndex }: SlideProps) {
  return (
    <div className="s17-scene" data-step={stepIndex} aria-label="Homi propone, vos decidís">
      <AmbientGlow x={640} y={380} size={900} intensity={0.6} opacity={0.14} />
      <div className="s17-copy-zone">
        <p className="s17-line" data-present={true} data-dim={stepIndex >= 2} aria-hidden="false">
          Homi interpreta<br />y propone.
        </p>
        <p className="s17-resolution" data-present={stepIndex >= 2} aria-hidden={stepIndex < 2}>
          La decisión<br />es nuestra.
        </p>
      </div>
      <div className="s17-phone-motion">
        <div className="s17-phone-slot">
          <PhoneFrame scale={1.08}>
            <div className="s17-screen-fill">
              <HomiDecisionDemoScreen stepIndex={stepIndex} />
            </div>
          </PhoneFrame>
        </div>
      </div>
    </div>
  )
}
