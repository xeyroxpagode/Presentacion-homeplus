// LETTER_PORTAL_BRIDGE — frontera S02→S03 (§18).
// Cambio mínimo y documentado en infraestructura compartida: S03 intacta.
// Al entrar al slide 2, este overlay reproduce la pregunta de S02.8 en
// geometría idéntica (QuestionSVG: mismo markup, misma fuente, mismas
// baselines) y ejecuta el zoom cinematográfico a través de la CONTRAFORMA
// CERRADA REAL de la «g» de la primera palabra «hogar» (línea 2), con
// contornos Bézier auténticos de Manrope wght≈560 (gPortalGeometry.ts:
// interpolación 500→600 verificada punto a punto; la «g» de Manrope posee
// un único contorno interior cerrado — el ojo superior — sin ambigüedad).
//
// El overlay es opaco salvo por la contraforma, que funciona como ventana
// real: S03 está montada debajo desde el inicio y se revela exclusivamente
// a través de la abertura. Sin fundidos globales, sin raster, sin swaps de
// renderizador: el texto SVG escala vectorialmente (nítido a ×100).
//
// Movimiento: G = centro óptico de la contraforma, C = (640,360),
// q = smootherstep(p), s(p) = exp(ln(sf)·q),
// T(p) = −(s−1)·G + q·(C−G) → P_screen = s·P + T.
// F0 identidad exacta; F100: G centrado en C, abertura cubriendo el stage
// + margen → el puente se desmonta (S03 fullscreen, cero restos).

import { useEffect, useMemo, useState } from 'react'
import { s03Epoch } from '../slides/S03HomePlus/s03Clock'
import {
  Q_BASELINES,
  Q_SCALE,
  QuestionContent,
  counterCenter,
  portalFinalScale,
  useQuestionMetrics,
} from '../slides/S02FragmentedInfo/QuestionSVG'
import { G_CONTOURS, G_COUNTER_INDEX } from '../slides/S02FragmentedInfo/gPortalGeometry'
import '../slides/S02FragmentedInfo/s02-cinematic.css'

const C = { x: 640, y: 360 }
const DURATION = 1200

function smootherstep(t: number): number {
  const x = t < 0 ? 0 : t > 1 ? 1 : t
  return x * x * x * (x * (x * 6 - 15) + 10)
}

function frozenPortal(): number | null {
  if (typeof window === 'undefined') return null
  const raw = new URLSearchParams(window.location.search).get('portalp')
  if (raw === null || raw === '') return null
  const v = Number(raw)
  return Number.isFinite(v) ? Math.min(1, Math.max(0, v)) : null
}

export default function LetterPortalBridge() {
  const m = useQuestionMetrics()
  const [progress, setProgress] = useState(() => frozenPortal() ?? 0)
  const freeze = useMemo(() => frozenPortal(), [])
  const reduce = useMemo(
    () =>
      typeof window !== 'undefined' && typeof window.matchMedia === 'function'
      && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    [],
  )
  const geom = useMemo(() => {
    const cc = counterCenter(m)
    return { g: { x: cc.x, y: cc.y }, gx: cc.gx, sf: portalFinalScale() }
  }, [m])

  useEffect(() => {
    if (freeze !== null || reduce) {
      setProgress(freeze ?? 1)
      return
    }
    // Reloj compartido con S03 (s03Clock): el portal y el dibujo del logo
    // derivan del mismo epoch fijado por OpeningSequence en este commit.
    // Matemática del zoom intacta (G, C, smootherstep, s, T).
    let raf = 0
    const tick = () => {
      const t = Math.min(1, Math.max(0, (performance.now() - s03Epoch()) / DURATION))
      setProgress(t)
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [freeze, reduce])

  // Reduced motion: sin zoom (S03 directa, estados preservados).
  // Abertura completa: S03 fullscreen, el puente se retira sin fundido
  // (la máscara ya cubre todo: nada visible que retirar).
  if (reduce) return null
  const p = freeze ?? progress
  const q = smootherstep(p)
  if (q >= 0.9995 && freeze === null) return null
  const { g, gx, sf } = geom
  const s = Math.exp(Math.log(sf) * q)
  const tx = -(s - 1) * g.x + q * (C.x - g.x)
  const ty = -(s - 1) * g.y + q * (C.y - g.y)

  // La máscara vive en un grupo SIN transformar (espacio de pantalla
  // estable): el agujero se posiciona por JS con los mismos (s,tx,ty) del
  // zoom → seguimiento perfecto por construcción, inmune a la semántica
  // de espacios de las máscaras SVG. El contenido con zoom va anidado
  // dentro del grupo enmascarado.
  const holeX = s * gx + tx
  const holeY = s * Q_BASELINES[1]! + ty
  const holeScale = s * Q_SCALE

  return (
    <div
      className="s02-stage"
      data-phase="active"
      aria-hidden="true"
      // Sin fondo propio: el fondo editorial vive DENTRO del grupo
      // enmascarado para que la contraforma revele S03 (montado debajo).
      style={{ zIndex: 6, background: 'transparent', pointerEvents: 'none' }}
    >
      <svg className="s02-question-svg" viewBox="0 0 1280 720" aria-hidden="true" style={{ width: '100%', height: '100%' }}>
        <defs>
          <radialGradient id="s02portal-warm" cx="660" cy="365" r="580" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#E7643F" stopOpacity="0.045" />
            <stop offset="0.7" stopColor="#E7643F" stopOpacity="0" />
          </radialGradient>
          <mask id="s02portal-hole" maskUnits="userSpaceOnUse">
            <rect x="0" y="0" width="1280" height="720" fill="#fff" />
            <path
              d={G_CONTOURS[G_COUNTER_INDEX]!}
              transform={`translate(${holeX.toFixed(2)} ${holeY.toFixed(2)}) scale(${holeScale.toFixed(5)})`}
              fill="#000"
            />
          </mask>
        </defs>
        <g mask="url(#s02portal-hole)">
          <g transform={`translate(${tx.toFixed(2)} ${ty.toFixed(2)}) scale(${s.toFixed(4)})`}>
            <rect x="-2000" y="-2000" width="5280" height="4720" fill="#080504" />
            <rect x="-2000" y="-2000" width="5280" height="4720" fill="url(#s02portal-warm)" />
            <QuestionContent revealP={1} idSuffix="portal" />
          </g>
        </g>
      </svg>
    </div>
  )
}
