// S02 V1.5 — coordinador motion: UNA única fuente de progreso por step.
// Todo valor visual deriva de estado absoluto + progreso (0..1).
// Soporta `?s02p=0..1` (QA determinista: congela el progreso del step
// actual) y respeta prefers-reduced-motion (salto directo a F100).

import { useEffect, useMemo, useRef, useState } from 'react'
import { S02_DURATIONS } from './s02Data'

export function clamp01(v: number): number {
  return v < 0 ? 0 : v > 1 ? 1 : v
}

/** Curva maestra smootherstep q(t)=6t⁵−15t⁴+10t³ (tangentes cero en extremos). */
export function smootherstep(t: number): number {
  const x = clamp01(t)
  return x * x * x * (x * (x * 6 - 15) + 10)
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t
}

/** Lee `s02p` de la URL una vez por render (modo QA freeze). */
export function frozenProgress(): number | null {
  if (typeof window === 'undefined') return null
  const raw = new URLSearchParams(window.location.search).get('s02p')
  if (raw === null || raw === '') return null
  const v = Number(raw)
  return Number.isFinite(v) ? clamp01(v) : null
}

export function reducedMotion(): boolean {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Progreso 0→1 del step actual. Se reinicia con cada stepIndex (o phase):
 * el loop rAF previo se cancela (anti-híbridos) y el nuevo converge al
 * estado destino. Todo derivado: sin setTimeout encadenados.
 */
export function useStepProgress(stepIndex: number, phase: string): number {
  const freeze = useMemo(() => frozenProgress(), [stepIndex])
  const reduce = useMemo(() => reducedMotion(), [])
  const duration = S02_DURATIONS[Math.min(Math.max(stepIndex, 0), S02_DURATIONS.length - 1)] ?? 500
  const [progress, setProgress] = useState(() => freeze ?? (reduce ? 1 : 0))
  const raf = useRef(0)

  useEffect(() => {
    if (freeze !== null || reduce) {
      setProgress(freeze ?? 1)
      return
    }
    setProgress(0)
    let start = -1
    const tick = (now: number) => {
      if (start < 0) start = now
      const t = clamp01((now - start) / duration)
      setProgress(t)
      if (t < 1) raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf.current)
  }, [stepIndex, phase, duration, freeze, reduce])

  return freeze ?? progress
}

// ---- Interpolación por keyframes con tangentes continuas (Catmull-Rom
// uniforme sobre el parámetro t). Pasa por los puntos de composición sin
// frenadas internas: una sola trayectoria, no easings por segmento. ----

export function track(keys: ReadonlyArray<readonly [number, number]>, t: number): number {
  const n = keys.length
  if (n === 0) return 0
  if (t <= keys[0]![0]) return keys[0]![1]
  if (t >= keys[n - 1]![0]) return keys[n - 1]![1]
  let i = 0
  while (i < n - 2 && t > keys[i + 1]![0]) i++
  const p0 = keys[Math.max(0, i - 1)]!
  const p1 = keys[i]!
  const p2 = keys[i + 1]!
  const p3 = keys[Math.min(n - 1, i + 2)]!
  const u = (t - p1[0]) / Math.max(1e-6, p2[0] - p1[0])
  const u2 = u * u
  const u3 = u2 * u
  return (
    0.5 *
    (2 * p1[1] +
      (-p0[1] + p2[1]) * u +
      (2 * p0[1] - 5 * p1[1] + 4 * p2[1] - p3[1]) * u2 +
      (-p0[1] + 3 * p1[1] - 3 * p2[1] + p3[1]) * u3)
  )
}

export type Rect = { x: number; y: number; w: number; h: number }

/** Interpola rectángulos (x,y,w,h) por keyframes temporales. */
export function trackRect(keys: ReadonlyArray<readonly [number, Rect]>, t: number): Rect {
  const pick = (f: (r: Rect) => number) => track(keys.map(([k, r]) => [k, f(r)] as const), t)
  return { x: pick(r => r.x), y: pick(r => r.y), w: pick(r => r.w), h: pick(r => r.h) }
}

// ---- Scroll: curva monótona C1 por los checkpoints de avance espacial ----
// Fracciones del recorrido total; tangente cero sólo en los extremos.

const SCROLL_KEYS: ReadonlyArray<readonly [number, number]> = [
  [0, 0],
  [0.1, 0.03],
  [0.25, 0.1],
  [0.5, 0.48],
  [0.75, 0.9],
  [0.9, 0.98],
  [1, 1],
]

function monotoneScroll(u: number): number {
  const k = SCROLL_KEYS
  if (u <= 0) return 0
  if (u >= 1) return 1
  let i = 0
  while (i < k.length - 2 && u > k[i + 1]![0]) i++
  const [x0, y0] = k[i]!
  const [x1, y1] = k[i + 1]!
  // Tangentes por secantes vecinas (Hermite monótono, clamped).
  const secant = (y1 - y0) / (x1 - x0)
  const prevSlope =
    i === 0 ? secant : (y0 - k[i - 1]![1]) / (x0 - k[i - 1]![0])
  const nextSlope =
    i + 2 >= k.length ? secant : (k[i + 2]![1] - y1) / (k[i + 2]![0] - x1)
  let m0 = (prevSlope + secant) / 2
  let m1 = (secant + nextSlope) / 2
  if (i === 0) m0 = secant
  if (i + 2 >= k.length) m1 = secant
  // Fritsch–Carlson: limita para preservar monotonía.
  const dx = x1 - x0
  const a = m0 * dx / Math.max(1e-9, y1 - y0)
  const b = m1 * dx / Math.max(1e-9, y1 - y0)
  const s = a * a + b * b
  if (s > 9) {
    const tau = 3 / Math.sqrt(s)
    m0 *= tau
    m1 *= tau
  }
  const t = (u - x0) / dx
  const t2 = t * t
  const t3 = t2 * t
  return (
    (2 * t3 - 3 * t2 + 1) * y0 +
    (t3 - 2 * t2 + t) * dx * m0 +
    (-2 * t3 + 3 * t2) * y1 +
    (t3 - t2) * dx * m1
  )
}

export function scrollFraction(p: number): number {
  return monotoneScroll(clamp01(p))
}
