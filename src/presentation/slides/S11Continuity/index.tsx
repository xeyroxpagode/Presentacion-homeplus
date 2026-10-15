import type { SlideProps } from '../../presentationTypes'
import './s11-bridge.css'

export default function S11Continuity({ stepIndex }: SlideProps) {
  return (
    <div
      className="s11-bridge"
      data-first={stepIndex >= 1}
      data-second={stepIndex >= 2}
      aria-label="La vida no pasa por módulos. HomePlus los conecta."
    >
      <p className="s11-statement">
        <span className="s11-line">La vida no pasa</span>
        <span className="s11-line">por módulos.</span>
      </p>
      <p className="s11-resolution">HomePlus los conecta.</p>
    </div>
  )
}
