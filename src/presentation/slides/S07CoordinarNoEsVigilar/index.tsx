import type { SlideProps } from '../../presentationTypes'
import './s07-silence.css'

export default function S07CoordinarNoEsVigilar({ stepIndex }: SlideProps) {
  return (
    <div className="s07-silence" data-phrase={stepIndex >= 1} aria-label="Coordinar no es vigilar">
      <p className="s07-statement">
        <span className="s07-line">Coordinar</span>
        <span className="s07-line s07-line-quiet">no es vigilar.</span>
      </p>
    </div>
  )
}
