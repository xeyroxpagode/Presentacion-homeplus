// S03 — autoridad temporal única de entrada (reloj controlado por el host).
//
// Diseño: OpeningSequence (host de entrada) fija el epoch en un EFECTO cuando
// la navegación entra realmente en S03, y lo invalida al salir. Portal
// (LetterPortalBridge) y S03.0 (useS03EntryProgress) derivan su progreso del
// MISMO valor `epochMs`: mismo instante de origen por construcción, sin dos
// rAF con relojes distintos.
//
// Propiedades garantizadas:
// - Mientras S03 está inactiva (epoch null) el progreso es 0: el timeline NO
//   se consume aunque el componente esté montado detrás del portal.
// - El epoch sólo cambia en transiciones reales de navegación (efecto con
//   deps [entered]): un render normal jamás lo reinicia.
// - S03.0→S03.1 no re-dispara el efecto (entered no cambia) → el portal no
//   se reinicia.
// - Abandonar S03 invalida el ciclo (epoch null → progreso 0, loop parado).
// - Reingresar desde S02 inicia un ciclo nuevo (epoch fresco).
// - Deep link directo a S03: el efecto corre en el montaje → ciclo nuevo.
// - Sin efectos secundarios globales durante el render (sólo en efectos).
// - Matemática del portal intacta: el portal muestrea el mismo epoch.

let epochMs: number | null = null
let generation = 0
const listeners = new Set<() => void>()

function emit(): void {
  for (const fn of listeners) fn()
}

function perfNow(): number {
  return typeof performance !== 'undefined' ? performance.now() : 0
}

/** El host la llama al entrar en S03: abre un ciclo nuevo. */
export function s03StartEntry(): void {
  epochMs = perfNow()
  generation += 1
  emit()
}

/** El host la llama al salir de S03: invalida el ciclo (progreso → 0). */
export function s03InvalidateEntry(): void {
  if (epochMs === null) return
  epochMs = null
  generation += 1
  emit()
}

/** Instante de origen compartido (null = ciclo inactivo). */
export function s03Epoch(): number | null {
  return epochMs
}

/** Identidad del ciclo: cambia en cada start/invalidate. */
export function s03Generation(): number {
  return generation
}

export function subscribeS03Entry(fn: () => void): () => void {
  listeners.add(fn)
  return () => {
    listeners.delete(fn)
  }
}

export function nowMs(): number {
  return perfNow()
}

/** Congelado QA de S03.0 en ms (`?s03t=`). Sin él, si `?portalp=` está
 *  presente se deriva del mismo instante (portalp·1200) para depurar la
 *  sincronización portal/dibujo con un solo parámetro. */
export function frozenS03EntryMs(): number | null {
  if (typeof window === 'undefined') return null
  const params = new URLSearchParams(window.location.search)
  const rawT = params.get('s03t')
  if (rawT !== null && rawT !== '') {
    const v = Number(rawT)
    return Number.isFinite(v) ? Math.min(3000, Math.max(0, v)) : null
  }
  const rawP = params.get('portalp')
  if (rawP !== null && rawP !== '') {
    const v = Number(rawP)
    if (Number.isFinite(v)) return Math.min(1, Math.max(0, v)) * 1200
  }
  return null
}

export function reducedMotion(): boolean {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export const clamp01 = (v: number): number => (v < 0 ? 0 : v > 1 ? 1 : v)

/** cubic-bezier genérico por muestreo (curvas del contrato). */
export function cubicBezier(p1x: number, p1y: number, p2x: number, p2y: number): (t: number) => number {
  const cx = 3 * p1x, bx = 3 * (p2x - p1x) - cx, ax = 1 - cx - bx
  const cy = 3 * p1y, by = 3 * (p2y - p1y) - cy, ay = 1 - cy - by
  const sampleX = (t: number) => ((ax * t + bx) * t + cx) * t
  const sampleY = (t: number) => ((ay * t + by) * t + cy) * t
  const sampleDX = (t: number) => (3 * ax * t + 2 * bx) * t + cx
  return (x: number) => {
    const t0 = clamp01(x)
    let t = t0
    for (let i = 0; i < 5; i++) {
      const err = sampleX(t) - t0
      if (Math.abs(err) < 1e-5) break
      const d = sampleDX(t)
      if (Math.abs(d) < 1e-6) break
      t -= err / d
    }
    return sampleY(clamp01(t))
  }
}

export const easeDraw = cubicBezier(0.45, 0, 0.25, 1) // trazo techo/estructura
export const easeOutExpo = cubicBezier(0.22, 1, 0.36, 1) // naranja / firma sup.
export const easeLockup = cubicBezier(0.76, 0, 0.24, 1) // isotipo→lockup
export const easeInOut = (t: number): number => {
  const x = clamp01(t)
  return x * x * (3 - 2 * x)
}
