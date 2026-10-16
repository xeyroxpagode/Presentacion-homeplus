// S03 — reloj compartido portal/S03 (GATE 1: una única línea temporal).
// Tanto LetterPortalBridge como S03HomePlus derivan su progreso del mismo
// epoch: el instante del commit en que OpeningSequence pasa a slideIndex 2.
// Sin dos timers independientes: el dibujo del logo empieza a t=650ms del
// MISMO origen que el portal (t=0–1200ms), de modo que a t=1200 el trazo
// sigue visiblemente en curso.
//
// El epoch se fija durante el render (no en efecto): los hijos del mismo
// commit ya lo observan. La clave es el slideIndex: sólo cambia al entrar
// o salir de S03, nunca entre steps.

let epochMs = 0
let epochKey = ''

export function s03EntryEpoch(key: string): number {
  if (key !== epochKey) {
    epochKey = key
    epochMs = typeof performance !== 'undefined' ? performance.now() : 0
  }
  return epochMs
}

export function s03Epoch(): number {
  return epochMs
}

export function nowMs(): number {
  return typeof performance !== 'undefined' ? performance.now() : 0
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
    return Number.isFinite(v) ? Math.min(2680, Math.max(0, v)) : null
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

/** cubic-bezier genérico por muestreo (curvas del prompt). */
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
