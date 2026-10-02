import AmbientGlow from '../../components/AmbientGlow'
import PhoneFrame from '../../components/PhoneFrame'
import HomiDemoScreen from '../../app-screens/HomiDemoScreen'
import type { SlideProps } from '../../presentationTypes'
import './s15-homi.css'

export default function S15HomiAction({ stepIndex }: SlideProps) {
  return (
    <div className="s15-scene" data-step={stepIndex} aria-label="Homi actúa">
      <AmbientGlow x={640} y={380} size={900} intensity={0.6} opacity={0.14} />
      <div className="s15-title-zone">
        <p className="s15-title">Homi</p>
      </div>
      <div className="s15-phone-motion">
        <div className="s15-phone-slot">
          <PhoneFrame scale={1.08}>
            <div className="s15-screen-fill">
              <HomiDemoScreen stepIndex={stepIndex} />
            </div>
          </PhoneFrame>
        </div>
      </div>
    </div>
  )
}
