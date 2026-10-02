import AmbientGlow from '../../components/AmbientGlow'
import PhoneFrame from '../../components/PhoneFrame'
import FinanceDemoScreen from '../../app-screens/FinanceDemoScreen'
import type { SlideProps } from '../../presentationTypes'
import './s09-scene.css'

const financeQuestions = [
  '¿Internet ya está pago?',
  '¿Qué pagos vienen?',
  '¿Cuánto gastamos este mes?',
  '¿En qué se nos está yendo más?',
] as const

export default function S09Finance({ stepIndex }: SlideProps) {
  return (
    <div className="s09-scene" data-step={stepIndex} aria-label="Finanzas del hogar">
      <AmbientGlow x={640} y={380} size={900} intensity={0.6} opacity={0.14} />
      <div className="s09-phone-motion">
        <div className="s09-phone-slot">
          <PhoneFrame>
            <div className="s09-screen-fill">
              <FinanceDemoScreen />
            </div>
          </PhoneFrame>
        </div>
      </div>
      <div className="s09-copy">
        <p className="s09-idea">El dinero<br />del hogar</p>
        {financeQuestions.map((question, index) => (
          <p
            key={question}
            className="s09-question"
            data-present={stepIndex >= index + 1}
            data-past={stepIndex > index + 1}
            aria-hidden={stepIndex < index + 1}
          >
            {question}
          </p>
        ))}
      </div>
    </div>
  )
}
