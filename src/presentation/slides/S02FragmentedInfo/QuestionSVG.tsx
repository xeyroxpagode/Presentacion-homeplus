// S02 V1.6 — pregunta fundacional como SVG vectorial (§17–§18).
// La misma pieza (mismo markup, misma geometría) vive en S02.8 y en el
// puente del portal: no hay intercambio de renderizador, no hay raster,
// no hay pixelación a ninguna escala. Tipografía y portal comparten
// geometría por construcción.
//
// Layout: Manrope Variable 560, 54px, tracking -0.5px, color #F5F0ED,
// tres líneas centradas, bloque X105–1175 / Y248–474, centro (640,360).
// Baselines explícitas (texto SVG: y = baseline alfabética exacta).

import { useEffect, useState } from 'react'
import { QUESTION_LINES } from './s02Data'
import { G_COUNTER_BBOX, G_COUNTER_CENTER, G_CONTOURS, G_COUNTER_INDEX, G_UPM } from './gPortalGeometry'

export const Q_FONT_SIZE = 54
export const Q_TRACKING = -0.5
export const Q_FILL = '#F5F0ED'
export const Q_CX = 640
export const Q_SCALE = Q_FONT_SIZE / G_UPM // 0.027
// Baselines: cajas de línea de 61.56px (54×1.14) centradas en Y248–474,
// baseline a +44px del techo de cada caja (ascenso óptico Manrope).
export const Q_BASELINES = [312.66, 374.22, 435.78]

export type QMetrics = {
  lineW: number[]
  lineLeft: number[]
  prefixW: number // avance de 'contexto del ho' en la línea 2
  ready: boolean
}

// Avances tipográficos reales (canvas 2D, misma fuente): autoridad para
// centrar líneas y situar la «g». Con letterSpacing nativo (Chrome) la
// medición coincide exactamente con el layout; fallback manual con la
// misma semántica en otros motores.
export function useQuestionMetrics(): QMetrics {
  const [m, setM] = useState<QMetrics>({ lineW: [0, 0, 0], lineLeft: [0, 0, 0], prefixW: 0, ready: false })
  useEffect(() => {
    let live = true
    const measure = () => {
      try {
        const cvs = document.createElement('canvas')
        const cx = cvs.getContext('2d')
        if (!cx) return
        cx.font = `560 ${Q_FONT_SIZE}px Manrope, sans-serif`
        let w: (s: string) => number
        try {
          const native = 'letterSpacing' in cx
          if (native) {
            ;(cx as CanvasRenderingContext2D & { letterSpacing: string }).letterSpacing = `${Q_TRACKING}px`
            w = (s: string) => cx.measureText(s).width
          } else {
            throw new Error('fallback')
          }
        } catch {
          w = (s: string) => {
            let t = 0
            for (const ch of s) t += cx.measureText(ch).width + Q_TRACKING
            return t
          }
        }
        const lineW = QUESTION_LINES.map(w)
        const lineLeft = lineW.map(lw => Q_CX - lw / 2)
        const prefixW = w('contexto del ho')
        if (live) setM({ lineW, lineLeft, prefixW, ready: true })
      } catch {
        /* métricas no disponibles: se usa fallback geométrico */
      }
    }
    if (typeof document !== 'undefined' && document.fonts?.ready) {
      document.fonts.ready.then(() => measure()).catch(() => measure())
    } else {
      measure()
    }
    return () => {
      live = false
    }
  }, [])
  return m
}

// Centro óptico de la contraforma de la «g» (línea 2) en coords locales.
// gx = borde izquierdo de la caja de avance de la «g».
export function counterCenter(m: QMetrics): { x: number; y: number; gx: number } {
  const s = Q_SCALE
  const gx = m.ready ? m.lineLeft[1]! + m.prefixW : 616
  return {
    gx,
    x: gx + G_COUNTER_CENTER.x * s,
    y: Q_BASELINES[1]! + G_COUNTER_CENTER.y * s,
  }
}

// Semiejes de la contraforma en px locales (para cálculo de cobertura).
export function counterRadii(): { rx: number; ry: number } {
  const s = Q_SCALE
  return {
    rx: ((G_COUNTER_BBOX[2] - G_COUNTER_BBOX[0]) / 2) * s,
    ry: ((G_COUNTER_BBOX[3] - G_COUNTER_BBOX[1]) / 2) * s,
  }
}

// Escala final del portal: la contraforma debe contener las cuatro
// esquinas del stage + ~9% de margen (elipse inscrita aproximada).
export function portalFinalScale(): number {
  const { rx, ry } = counterRadii()
  const need = Math.sqrt((640 / rx) ** 2 + (360 / ry) ** 2)
  return Math.ceil(need * 1.09 * 10) / 10
}

function smootherstep(t: number): number {
  const x = t < 0 ? 0 : t > 1 ? 1 : t
  return x * x * x * (x * (x * 6 - 15) + 10)
}

const clamp01 = (v: number): number => (v < 0 ? 0 : v > 1 ? 1 : v)

// Progreso 0..1 de cada línea según intervalos de la revelación editorial:
// L1 0–420ms · L2 150–590ms · L3 300–760ms (máscara suave 45–65px, rise ≤6px).
export function questionLineProgress(p: number): [number, number, number] {
  const spans: Array<readonly [number, number]> = [
    [0, 420],
    [150, 590],
    [300, 760],
  ]
  return spans.map(([a, b]) => smootherstep((p * 760 - a) / (b - a))) as [number, number, number]
}

export function QuestionContent({
  revealP,
  idSuffix,
}: {
  revealP: number // 0..1 (1 = frase completa en posición definitiva)
  idSuffix: string // sufijo único para ids de máscaras/gradientes
}) {
  const m = useQuestionMetrics()
  const e = questionLineProgress(clamp01(revealP))
  return (
    <>
      <defs>
        {QUESTION_LINES.map((_, i) => (
          <linearGradient key={i} id={`s02qw-${idSuffix}-${i}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#fff" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
        ))}
        {QUESTION_LINES.map((_, i) => {
          const lw = m.ready ? m.lineW[i]! : 900
          const lx = m.ready ? m.lineLeft[i]! : 640 - lw / 2
          const feather = 55
          const span = lw + feather * 2
          const wx = lx - feather + span * e[i]!
          return (
            <mask key={i} id={`s02qm-${idSuffix}-${i}`} maskUnits="userSpaceOnUse">
              <rect x={lx - feather - span} y={Q_BASELINES[i]! - 70} width={Math.max(0, wx - feather - (lx - feather - span))} height={110} fill="#fff" />
              <rect x={wx - feather} y={Q_BASELINES[i]! - 70} width={feather} height={110} fill={`url(#s02qw-${idSuffix}-${i})`} />
            </mask>
          )
        })}
      </defs>
      {QUESTION_LINES.map((line, i) => (
        <text
          key={line}
          x={Q_CX}
          y={Q_BASELINES[i]}
          textAnchor="middle"
          className="s02-question-text"
          mask={e[i]! < 0.999 ? `url(#s02qm-${idSuffix}-${i})` : undefined}
          transform={`translate(0 ${((1 - e[i]!) * 6).toFixed(2)})`}
        >
          {line}
        </text>
      ))}
    </>
  )
}

export default function QuestionSVG({
  revealP,
  idSuffix,
}: {
  revealP: number // 0..1 (1 = frase completa en posición definitiva)
  idSuffix: string // sufijo único para ids de máscaras/gradientes
}) {
  return (
    <svg className="s02-question-svg" viewBox="0 0 1280 720" aria-hidden="true">
      <QuestionContent revealP={revealP} idSuffix={idSuffix} />
    </svg>
  )
}

// Contorno auténtico de la contraforma (índice G_COUNTER_INDEX del glifo),
// posicionado sobre la «g» real. Negro puro en máscara = ventana a S03.
export function CounterformHole({ gx, baselineY }: { gx: number; baselineY: number }) {
  return (
    <path
      d={G_CONTOURS[G_COUNTER_INDEX]!}
      transform={`translate(${gx.toFixed(2)} ${baselineY.toFixed(2)}) scale(${Q_SCALE})`}
      fill="#000"
    />
  )
}
