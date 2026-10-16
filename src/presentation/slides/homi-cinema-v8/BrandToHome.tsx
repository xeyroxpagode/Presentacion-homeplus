// HOMIE V8 — Cierre de marcas (P22) y morph hacia Home digital (P23).
// Lockup con logos auténticos: identidad Homi + identidad HomePlus con un
// signo de equivalencia ondulado construido en SVG (dos trazos horizontales
// levemente ondulados, alineados como un igual). Sin palabras decorativas ni
// movimiento en loop: una vez asentado, el lockup queda totalmente estable.
//
// P23: el lockup se transforma en una puerta hacia la aplicación. Home está
// prerenderizado y completo detrás de una máscara editorial (clip-path que se
// abre desde el centro). La aplicación no se arma: se revela.

import { useLayoutEffect, useRef, useState, type CSSProperties } from 'react'
import homiMark from '../../assets/illustrations/homi-mark.svg'
import HomePlusLogo from '../../components/HomePlusLogo'
import HomeDemoScreen from '../../app-screens/HomeDemoScreen'
import { homeVariables } from '../../app-screens/HomeDemoScreen/homeTokens'
import '../../app-screens/HomeDemoScreen/home-screen.css'
import { PerspectiveComparison } from './PerspectiveComparison'

// Home digital final: lienzo completo 16:9, anatomía nativa amplificada solo
// por tokens (Nivel A). Sin marco de teléfono, sin Three.js, sin overlays.
const V8_HOME_FULL_VARS = {
  ...homeVariables,
  '--home-household-size': '42px',
  '--home-title-size': '50px',
  '--home-event-size': '56px',
  '--home-body-size': '36px',
  '--home-secondary-size': '29px',
  '--home-section-size': '27px',
  '--home-completion-size': '34px',
  '--task-mark-size': '62px',
  '--home-screen-padding': '30px',
  '--home-row-padding': '22px',
  '--home-row-gap': '20px',
  '--home-section-spacing': '24px',
  '--home-card-radius': '24px',
  '--home-navigation-radius': '34px',
} as CSSProperties

/** Signo de equivalencia ondulado: dos trazos horizontales levemente ondulados. */
function WavyEquals() {
  return (
    <svg className="v8-sign" viewBox="0 0 135 85" width="135" height="85" aria-hidden="true">
      <path className="v8-sign-stroke" d="M8 30 C 30 22, 45 38, 67 30 S 112 22, 127 30" />
      <path className="v8-sign-stroke" d="M8 55 C 30 47, 45 63, 67 55 S 112 47, 127 55" />
    </svg>
  )
}

function LockupMark() {
  return (
    <div className="v8-lockup">
      <div className="v8-lockup-side v8-lockup-homi" role="img" aria-label="Homi">
        <img src={homiMark} alt="" aria-hidden="true" width={64} height={64} draggable={false} />
        <span className="v8-lockup-word">Homi</span>
      </div>
      <WavyEquals />
      <div className="v8-lockup-side v8-lockup-home" role="img" aria-label="HomePlus">
        <HomePlusLogo size={64} />
        <span className="v8-lockup-word">HomePlus</span>
      </div>
    </div>
  )
}

/**
 * P22: Homi ≋ HomePlus sobre negro.
 * P23: morph completo hacia Home fullscreen. `ready` se vuelve verdadero solo
 * cuando la pose final está montada (contrato de handoff).
 */
export function BrandToHome({ phase, onReady, directSnapshot = false }: { phase: 'lockup' | 'reveal'; onReady?: () => void; directSnapshot?: boolean }) {
  const [active, setActive] = useState(directSnapshot && phase === 'reveal')
  const [ready, setReady] = useState(directSnapshot && phase === 'reveal')
  const readyRef = useRef(false)

  useLayoutEffect(() => {
    if (phase === 'lockup') {
      readyRef.current = false
      setActive(false)
      setReady(false)
      return
    }
    if (readyRef.current) return
    readyRef.current = true
    if (directSnapshot) {
      setActive(true)
      setReady(true)
      onReady?.()
      return
    }
    const frame = window.requestAnimationFrame(() => setActive(true))
    const timer = window.setTimeout(() => {
      setReady(true)
      onReady?.()
    }, 1700)
    return () => {
      window.cancelAnimationFrame(frame)
      window.clearTimeout(timer)
    }
  }, [directSnapshot, phase, onReady])

  if (phase === 'lockup') {
    return (
      <div className="v8-lockup-stage">
        {!directSnapshot && <div className="v8-retiring-perspectives" aria-hidden="true"><PerspectiveComparison stage="answers" /></div>}
        <LockupMark />
      </div>
    )
  }

  return (
    <div className={`v8-reveal-stage${active ? ' v8-revealed' : ''}`} data-homi-v8-ready={ready ? 'true' : 'false'}>
      <div className="v8-reveal-home" aria-label="HomePlus Home">
        <HomeDemoScreen showJuli />
      </div>
      <div className="v8-reveal-veil" aria-hidden="true">
        <LockupMark />
      </div>
    </div>
  )
}
