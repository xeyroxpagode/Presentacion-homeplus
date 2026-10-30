// S03 V6 — interpolación canónica del contrato (§1.2–§1.3).
// Toda propiedad usa E(u) = 6u^5 − 15u^4 + 10u^3 sobre u = clamp((t−a)/(b−a)).
// Las curvas se evalúan con parametrización por longitud de arco (tabla
// precalculada): el trazado visible es la fracción REAL de la curva.

export const clamp01 = (v: number): number => (v < 0 ? 0 : v > 1 ? 1 : v)

/** Curva canónica E(u) = 6u^5 − 15u^4 + 10u^3 (quintica, C1 en los bordes). */
export function E(u: number): number {
  const x = clamp01(u)
  return x * x * x * (x * (x * 6 - 15) + 10)
}

export const lerp = (a: number, b: number, t: number): number => a + (b - a) * t

/** Progreso de segmento: 0 antes de a, 1 después de b, E(u) dentro. */
export function seg(t: number, a: number, b: number): number {
  return E((t - a) / (b - a))
}

/** Punto de una Bézier cúbica. */
export function cubicAt(
  p0: readonly [number, number], p1: readonly [number, number],
  p2: readonly [number, number], p3: readonly [number, number], u: number,
): { x: number; y: number } {
  const v = 1 - u
  const a = v * v * v
  const b = 3 * v * v * u
  const c = 3 * v * u * u
  const d = u * u * u
  return {
    x: a * p0[0] + b * p1[0] + c * p2[0] + d * p3[0],
    y: a * p0[1] + b * p1[1] + c * p2[1] + d * p3[1],
  }
}

export type ArcTable = {
  pts: Array<{ x: number; y: number }>
  cum: number[]
  total: number
}

/** Tabla de longitud de arco: N muestras uniformes con acumulado de longitud. */
export function buildArcTable(
  p0: readonly [number, number], p1: readonly [number, number],
  p2: readonly [number, number], p3: readonly [number, number], n = 240,
): ArcTable {
  const pts: Array<{ x: number; y: number }> = []
  const cum: number[] = [0]
  let total = 0
  let prev: { x: number; y: number } = cubicAt(p0, p1, p2, p3, 0)
  pts.push(prev)
  for (let i = 1; i <= n; i++) {
    const pt = cubicAt(p0, p1, p2, p3, i / n)
    total += Math.hypot(pt.x - prev.x, pt.y - prev.y)
    cum.push(total)
    pts.push(pt)
    prev = pt
  }
  return { pts, cum, total }
}

/** Punto a una longitud de arco s (fracción de la longitud total). */
export function arcPoint(table: ArcTable, frac: number): { x: number; y: number } {
  const target = clamp01(frac) * table.total
  const { cum, pts } = table
  let lo = 0
  let hi = cum.length - 1
  while (lo < hi) {
    const mid = (lo + hi) >> 1
    if (cum[mid] < target) lo = mid + 1
    else hi = mid
  }
  const i = Math.max(1, lo)
  const c0 = cum[i - 1]!
  const c1 = cum[i]!
  const f = c1 > c0 ? (target - c0) / (c1 - c0) : 0
  const a = pts[i - 1]!
  const b = pts[i]!
  return { x: lerp(a.x, b.x, f), y: lerp(a.y, b.y, f) }
}

/** Parámetro u (0–1) para una fracción de longitud de arco: invoca la tabla. */
export function arcParam(table: ArcTable, frac: number): number {
  const target = clamp01(frac) * table.total
  const { cum } = table
  let lo = 0
  let hi = cum.length - 1
  while (lo < hi) {
    const mid = (lo + hi) >> 1
    if (cum[mid] < target) lo = mid + 1
    else hi = mid
  }
  return lo / (cum.length - 1)
}
