// LETTER_PORTAL_BRIDGE — frontera S02→S03 (§17).
// Cambio mínimo y documentado en infraestructura compartida: S03 intacta.
// Al entrar a slide 2, este overlay reproduce la pregunta de S02.8 en
// geometría idéntica (mismas clases CSS) y ejecuta el zoom cinematográfico
// por el interior de la «o» de «hogar» durante 1400 ms. Termina en negro
// (#060404, compatible con la entrada de S03) y se retira.
// Fórmula sin salto en F0: P(t) = s(t)·P + T(t),
// s(t)=exp(ln(sf)·q), T(t)=−(s−1)·G + q·(C−G), q=smootherstep.

import { useEffect, useMemo, useRef, useState } from 'react'
import '../slides/S02FragmentedInfo/s02-cinematic.css'

const C = { x: 640, y: 360 }
const DURATION = 1400
const LINE3 = 'organizada y disponible para el hogar?'
// Índice de la «o» de «hogar» dentro de LINE3.
const O_INDEX = LINE3.indexOf('hogar?') + 1

function smootherstep(t: number): number {
  const x = t < 0 ? 0 : t > 1 ? 1 : t
  return x * x * x * (x * (x * 6 - 15) + 10)
}

function frozenPortal(): number | null {
  const raw = new URLSearchParams(window.location.search).get('portalp')
  if (raw === null || raw === '') return null
  const v = Number(raw)
  return Number.isFinite(v) ? Math.min(1, Math.max(0, v)) : null
}

export default function LetterPortalBridge() {
  const stageRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLSpanElement>(null)
  const [geom, setGeom] = useState<{ g: { x: number; y: number }; sf: number } | null>(null)
  const [progress, setProgress] = useState(() => frozenPortal() ?? 0)
  const freeze = useMemo(() => frozenPortal(), [])
  const reduce = useMemo(
    () => typeof window !== 'undefined' && typeof window.matchMedia === 'function'
      && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    [],
  )
  // Transform actual aplicado (para deshacerlo al medir: getBoundingClientRect
  // devuelve coords post-transform; la geometría debe ser de layout).
  const applied = useRef({ s: 1, tx: 0, ty: 0 })

  // Medir la «o» real una vez montado (rect DOM = autoridad geométrica).
  // El overlay usa un único nodo de texto idéntico a S02.8 (sin spans que
  // rompan kerning): el rango se selecciona por offsets de caracteres.
  useEffect(() => {
    const stage = stageRef.current
    const line = lineRef.current
    if (!stage || !line) return
    const measure = () => {
      const node = line.firstChild
      if (!node || node.nodeType !== 3) return
      const range = document.createRange()
      try {
        range.setStart(node, O_INDEX)
        range.setEnd(node, O_INDEX + 1)
      } catch {
        return
      }
      const r = range.getBoundingClientRect()
      const s = stage.getBoundingClientRect()
      const k = s.width / 1280
      const { s: ps, tx, ty } = applied.current
      if (k <= 0 || r.width <= 0 || ps <= 0) return
      // NOTA: el alto del rango es la caja de línea (≈63px), NO la tinta.
      // El centro vertical del contrasigno se deriva de métricas reales del
      // mismo font (canvas): baseline dentro de la caja + ascenso/ink de «o».
      const cs = getComputedStyle(line)
      const cvs = document.createElement('canvas')
      const cx2 = cvs.getContext('2d')
      if (!cx2) return
      cx2.font = `${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`
      const fm = cx2.measureText('Hg')
      const fA = fm.fontBoundingBoxAscent
      const fD = fm.fontBoundingBoxDescent
      const mO = cx2.measureText('o')
      const lineTop = ((r.top - s.top) / k - 248 - ty) / ps
      const lineH = r.height / (ps * k)
      const baseline = lineTop + (lineH - (fA + fD)) / 2 + fA
      // Centro del contrasigno: x del centro de tinta (el ancho SÍ es tinta),
      // y del centro de tinta de «o» (simétrica: equivale al del contrasigno).
      const cx = (((r.left + r.right) / 2 - s.left) / k - 105 - tx) / ps
      const cy = baseline - (mO.actualBoundingBoxAscent - mO.actualBoundingBoxDescent) / 2
      // Semiejes del contrasigno desde tinta real menos trazo estimado.
      const inkW = r.width / (ps * k)
      const inkH = mO.actualBoundingBoxAscent + mO.actualBoundingBoxDescent
      const stroke = inkW * 0.28
      const rx = Math.max(4, (inkW - stroke * 2) / 2)
      const ry = Math.max(4, (inkH - stroke * 2) / 2)
      // La abertura (ya recentrada en C) debe contener el viewport +20%.
      const sf = 1.2 * Math.max(C.x / rx, C.y / ry)
      setGeom(prev => (prev && Math.abs(prev.g.x - cx) < 0.25 && Math.abs(prev.g.y - cy) < 0.25 && Math.abs(prev.sf - sf) < 0.25 ? prev : { g: { x: cx, y: cy }, sf }))
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(stage)
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    if (freeze !== null || reduce) {
      setProgress(freeze ?? 1)
      return
    }
    let raf = 0
    let start = -1
    const tick = (now: number) => {
      if (start < 0) start = now
      const t = Math.min(1, (now - start) / DURATION)
      setProgress(t)
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [freeze, reduce])

  if (reduce) return null
  const p = freeze ?? progress
  const q = smootherstep(p)
  const sf = geom?.sf ?? 80
  const g = geom?.g ?? { x: 1010, y: 440 }
  const s = Math.exp(Math.log(sf) * q)
  const tx = -(s - 1) * g.x + q * (C.x - g.x)
  const ty = -(s - 1) * g.y + q * (C.y - g.y)
  applied.current = { s, tx, ty }
  // Tras el zoom: fundido de entrega a S03 (ya visible debajo).
  const settled = p >= 1

  return (
    <div
      ref={stageRef}
      className="s02-stage"
      data-phase="active"
      aria-hidden="true"
      style={{
        zIndex: 6,
        background: '#060404',
        opacity: settled ? 0 : 1,
        transition: settled ? 'opacity 260ms ease' : 'none',
        pointerEvents: 'none',
      }}
    >
      <div className="s02-editorial" />
      <div
        className="s02-question s02-portal-text"
        style={{
          transform: `translate(${tx.toFixed(2)}px, ${ty.toFixed(2)}px) scale(${s.toFixed(4)})`,
          transformOrigin: '0 0',
        }}
      >
        <span className="s02-question-line">¿Qué pasaría si esa parte del</span>
        <span className="s02-question-line">contexto del hogar pudiera estar</span>
        <span className="s02-question-line" ref={lineRef}>{LINE3}</span>
      </div>
    </div>
  )
}
