import HomeHeader from '../HomeDemoScreen/HomeHeader'
import { homeVariables } from '../HomeDemoScreen/homeTokens'
import homiMark from '../../assets/illustrations/homi-mark.svg'
import '../HomeDemoScreen/home-screen.css'
import '../HomiDemoScreen/homi-screen.css'
import './decision-screen.css'

export default function HomiDecisionDemoScreen({ stepIndex }: { stepIndex: number }) {
  return (
    <div className="home-demo-screen homi-demo-screen" style={homeVariables} data-step={stepIndex} aria-label="Homi propone, vos decidís">
      <HomeHeader showJuli={false} />
      <div className="homi-assistant-bar">
        <img src={homiMark} alt="" aria-hidden="true" width={40} height={40} draggable={false} />
        <div className="homi-assistant-copy">
          <p className="homi-assistant-name">Homi</p>
          <p className="homi-assistant-sub">Asistente del hogar</p>
        </div>
      </div>
      <div className="homi-thread">
        <div className="homi-proposal" data-present={stepIndex >= 0} aria-hidden="false">
          <p>Puedo mover el entrenamiento de Tomi una hora más tarde y avisar a la familia.</p>
        </div>
        <div className="homi-decision-row" data-present={stepIndex >= 1 && stepIndex <= 2} aria-hidden={stepIndex < 1 || stepIndex > 2}>
          <button type="button" className="homi-confirm homi-decision-confirm" data-present={stepIndex >= 1 && stepIndex <= 2} aria-hidden={stepIndex < 1 || stepIndex > 2} tabIndex={-1}>
            Confirmar
          </button>
          <button type="button" className="homi-dismiss" tabIndex={-1}>
            Ahora no
          </button>
        </div>
        <div className="homi-done" data-present={stepIndex >= 3} aria-hidden={stepIndex < 3}>
          <span className="homi-check" aria-hidden="true" />
          <div className="homi-done-copy">
            <p className="homi-done-title">Confirmado</p>
            <p className="homi-done-sub">Entrenamiento actualizado · Avisé a la familia</p>
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
