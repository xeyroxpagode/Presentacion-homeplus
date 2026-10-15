import HomeHeader from '../HomeDemoScreen/HomeHeader'
import { homeVariables } from '../HomeDemoScreen/homeTokens'
import homiMark from '../../assets/illustrations/homi-mark.svg'
import '../HomeDemoScreen/home-screen.css'
import './homi-screen.css'

export default function HomiDemoScreen({ stepIndex }: { stepIndex: number }) {
  return (
    <div className="home-demo-screen homi-demo-screen" style={homeVariables} data-step={stepIndex} aria-label="Homi, asistente de HomePlus">
      <HomeHeader showJuli={false} />
      <div className="homi-assistant-bar">
        <img src={homiMark} alt="" aria-hidden="true" width={40} height={40} draggable={false} />
        <div className="homi-assistant-copy">
          <p className="homi-assistant-name">Homi</p>
          <p className="homi-assistant-sub">Asistente del hogar</p>
        </div>
      </div>
      <div className="homi-thread">
        <div className="homi-greeting" data-present={stepIndex === 0} aria-hidden={stepIndex !== 0}>
          <p>¿En qué te ayudo?</p>
        </div>
        <div className="homi-user-bubble" data-present={stepIndex >= 1} aria-hidden={stepIndex < 1}>
          <p>Agendá que mañana Tomi tiene entrenamiento una hora más tarde.</p>
        </div>
        <div className="homi-proposal" data-present={stepIndex >= 2} aria-hidden={stepIndex < 2}>
          <p>Voy a actualizar el entrenamiento de Tomi para mañana y avisar a la familia.</p>
        </div>
        <div className="homi-confirm-zone">
          <button type="button" className="homi-confirm" data-present={stepIndex === 3} aria-hidden={stepIndex !== 3} tabIndex={-1}>
            Confirmar
          </button>
          <div className="homi-done" data-present={stepIndex >= 4} aria-hidden={stepIndex < 4}>
            <span className="homi-check" aria-hidden="true" />
            <div className="homi-done-copy">
              <p className="homi-done-title">Confirmado</p>
              <p className="homi-done-sub">Entrenamiento actualizado · Avisé a la familia</p>
            </div>
          </div>
        </div>
      </div>
      <div className="homi-composer" aria-hidden="true">
        <span className="homi-composer-hint">Pedile algo a Homi…</span>
        <span className="homi-send" />
      </div>
    </div>
  )
}
