// S03 V6 — métricas tipográficas reales (§1.1: el renderer usa las métricas
// reales de la fuente para dibujar las líneas base). Misma fuente Manrope que
// el resto de la presentación; medición vía canvas 2D.

export type Metrics = {
  width: number
  ascent: number
  descent: number
}

const measureCtx: CanvasRenderingContext2D | null = (() => {
  try {
    const c = document.createElement('canvas')
    return c.getContext('2d')
  } catch {
    return null
  }
})()

export function measureText(text: string, size: number, weight: number, tracking: number): Metrics {
  const ctx = measureCtx
  if (!ctx) return { width: text.length * size * 0.56, ascent: size * 0.72, descent: size * 0.2 }
  try {
    ctx.font = `${weight} ${size}px Manrope, sans-serif`
    try {
      ;(ctx as CanvasRenderingContext2D & { letterSpacing: string }).letterSpacing = `${tracking}px`
    } catch { /* navegadores sin letterSpacing: se ignora */ }
    const m = ctx.measureText(text)
    const width = m.width
    const ascent = m.actualBoundingBoxAscent || size * 0.72
    const descent = m.actualBoundingBoxDescent || size * 0.2
    return { width, ascent, descent }
  } catch {
    return { width: text.length * size * 0.56, ascent: size * 0.72, descent: size * 0.2 }
  }
}

/**
 * Línea baseline para un texto de una línea dentro de una caja (left,top,w,h).
 * El texto se centra ópticamente en la caja usando ascenso/descenso reales.
 */
export function baselineInBox(
  box: { x: number; y: number; w: number; h: number },
  size: number, weight: number, tracking: number, _text: string,
): number {
  const { ascent, descent } = measureText(_text, size, weight, tracking)
  const mid = (ascent - descent) / 2
  return box.y + box.h / 2 + mid
}

/** Ancla X para alineación centrada dentro de una caja. */
export function centerAnchorX(box: { x: number; w: number }, size: number, weight: number, tracking: number, text: string): number {
  const { width } = measureText(text, size, weight, tracking)
  return box.x + box.w / 2 - width / 2
}
