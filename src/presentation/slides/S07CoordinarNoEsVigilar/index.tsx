import type { SlideProps } from '../../presentationTypes'
import './s07-silence.css'

/**
 * S07 · «Coordinar no es vigilar» — single beat, no second click.
 *
 * The retained S06 F06 composition (spotlighted Papa reply) stays mounted
 * underneath. This overlay only fades the WHOLE scene to black over 710ms and
 * then lands the statement on that black. The reply card never moves.
 */
export default function S07CoordinarNoEsVigilar({ exiting = false, returning = false }: SlideProps & { exiting?: boolean; returning?: boolean }) {
  return (
    <div className="s07-silence" data-exiting={exiting || undefined} data-returning={returning || undefined} aria-label="Coordinar no es vigilar">
      <div className="s07-black" aria-hidden="true" />
      <p className="s07-statement" aria-label="Coordinar no es vigilar.">
        <span className="s07-line">Coordinar</span>
        <span className="s07-line s07-line-quiet">no es vigilar.</span>
      </p>
    </div>
  )
}
