// S03 — duraciones y sampling del ACTO I (nacimiento del logo).
// Timeline interno de S03.0: 3000ms desde el epoch compartido con el portal.
// Tramos (§5): T0 portal 0–1200 · T1 dibujo 650–1600 · T2 «+» 1600–1840
//          · T3 naranja 1800–2250 · T4 wordmark 2250–3000.
import { clamp01, cubicBezier, easeDraw, easeLockup, easeOutExpo } from './s03Clock'
import { PNG_BBOX, PLUS_PNG, POSE_ISO_CENTER, POSE_ISO_LOCKUP } from './s03Geometry'

export const S03_ENTRY_MS = 3000
export const PORTAL_MS = 1200

// Duración de la transición de ENTRADA de cada step (0 = autoplay por epoch).
export const S03_DURATIONS = [3000, 780, 500, 700, 700, 1100, 850, 980, 600, 690, 1400]

const seg = (t: number, a: number, b: number): number => clamp01((t - a) / (b - a))
export const lerp = (a: number, b: number, t: number): number => a + (b - a) * t

// Trazo principal (techo→muro→personas): recorre la geometría real 650–1600.
// A t=1200 el progreso eased ≈ 0.72: visiblemente en curso, logo incompleto.
const STROKE_A = 650
const STROKE_B = 1600

export function strokeP(t: number): number {
  return easeDraw(seg(t, STROKE_A, STROKE_B))
}

// Cabezas: revelación localizada (radio 0→R), integradas al lenguaje del
// trazo, nunca barrido vertical. Big 1330–1540 · small 1420–1600.
const HEAD_A0 = 1330
const HEAD_B0 = 1540
const HEAD_A1 = 1420
const HEAD_B1 = 1600
const easeHead = cubicBezier(0.33, 1, 0.68, 1)

export function headP0(t: number): number {
  return easeHead(seg(t, HEAD_A0, HEAD_B0))
}

export function headP1(t: number): number {
  return easeHead(seg(t, HEAD_A1, HEAD_B1))
}

/** El blanco está completo (pasar a modo 'full' sin máscara). */
export function whiteComplete(t: number): boolean {
  return t >= 1605
}

// Microimpacto del «+» (T2 1600–1840): keys locales [ms, escala, dyPxStage].
const PLUS_KEYS: ReadonlyArray<readonly [number, number, number]> = [
  [0, 0.91, -4.7],
  [90, 1.055, 0.7],
  [165, 0.992, -0.7],
  [240, 1.0, 0],
]

function cosineKeys(keys: ReadonlyArray<readonly [number, number]>, t: number): number {
  if (t <= keys[0]![0]) return keys[0]![1]
  const last = keys[keys.length - 1]!
  if (t >= last[0]) return last[1]
  let i = 0
  while (i < keys.length - 2 && t > keys[i + 1]![0]) i++
  const [t0, v0] = keys[i]!
  const [t1, v1] = keys[i + 1]!
  const u = (t - t0) / (t1 - t0)
  return v0 + (v1 - v0) * (0.5 - 0.5 * Math.cos(u * Math.PI))
}

export type PlusPose = { visible: boolean; scale: number; dy: number }
const PLUS_A = 1600

export function plusPose(t: number): PlusPose {
  if (t < PLUS_A) return { visible: false, scale: 0.91, dy: -4.7 }
  const local = Math.min(t - PLUS_A, 240)
  return {
    visible: true,
    scale: cosineKeys(PLUS_KEYS.map(([ms, s]) => [ms, s] as const), local),
    dy: cosineKeys(PLUS_KEYS.map(([ms, , dy]) => [ms, dy] as const), local),
  }
}

// Naranja (T3 1800–2250): radio en coords PNG desde el centro del «+»,
// nace detrás del «+», easing próximo a cubic-bezier(0.22,1,0.36,1).
const ORANGE_A = 1800
const ORANGE_B = 2250

export function orangeMaxRadiusPng(): number {
  const corners = [
    [PNG_BBOX.x0, PNG_BBOX.y0], [PNG_BBOX.x1, PNG_BBOX.y0],
    [PNG_BBOX.x0, PNG_BBOX.y1], [PNG_BBOX.x1, PNG_BBOX.y1],
  ] as const
  let max = 0
  for (const [cx, cy] of corners) {
    const d = Math.hypot(PLUS_PNG.cx - cx, PLUS_PNG.cy - cy)
    if (d > max) max = d
  }
  return max * 1.02
}

export function orangeRadiusPng(t: number): number {
  if (t < ORANGE_A) return 0
  return orangeMaxRadiusPng() * easeOutExpo(seg(t, ORANGE_A, ORANGE_B))
}

// Wordmark / lockup (T4 2250–3000).
const LOCK_A = 2250
const LOCK_B = 3000

export function lockupP(t: number): number {
  return easeLockup(seg(t, LOCK_A, LOCK_B))
}

export type LockupPose = { isoX: number; isoY: number; isoW: number; wordDx: number; wordVisible: boolean }

export function lockupPose(t: number): LockupPose {
  const p = lockupP(t)
  return {
    isoX: lerp(POSE_ISO_CENTER.x, POSE_ISO_LOCKUP.x, p),
    isoY: lerp(POSE_ISO_CENTER.y, POSE_ISO_LOCKUP.y, p),
    isoW: lerp(POSE_ISO_CENTER.w, POSE_ISO_LOCKUP.w, p),
    wordDx: lerp(-28, 0, p),
    wordVisible: t >= LOCK_A - 10,
  }
}

// Easing de reveals tipográficos (protagonista): rise +15px, blur 3.3px.
export const easeHero = cubicBezier(0.22, 1, 0.36, 1)
