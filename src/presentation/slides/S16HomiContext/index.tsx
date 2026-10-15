import AmbientGlow from '../../components/AmbientGlow'
import PhoneFrame from '../../components/PhoneFrame'
import HomiContextDemoScreen from '../../app-screens/HomiContextDemoScreen'
import type { SlideProps } from '../../presentationTypes'
import './s16-homi.css'

export default function S16HomiContext({ stepIndex }: SlideProps) {
  return (
    <div className="s16-scene" data-step={stepIndex} aria-label="Homi entiende tu contexto">
      <AmbientGlow x={640} y={380} size={900} intensity={0.6} opacity={0.14} />
      <div className="s16-idea-zone">
        <p className="s16-idea">La misma pregunta.</p>
        <p className="s16-idea s16-idea-quiet">Distinto contexto.</p>
      </div>
      <div className="s16-phone-motion">
        <div className="s16-phone-slot">
          <PhoneFrame scale={1.08}>
            <div className="s16-screen-fill">
              <HomiContextDemoScreen stepIndex={stepIndex} />
            </div>
          </PhoneFrame>
        </div>
      </div>
    </div>
  )
}
