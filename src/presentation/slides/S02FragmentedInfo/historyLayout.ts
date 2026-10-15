// S02 V1.6 — layout del historial con MEDICIÓN real (§22).
// El posicionamiento absoluto exige alturas a priori, pero el wrapping
// depende de métricas de fuente (varían por SO). Solución: estimador
// conservador para el primer pintado + corrección determinista midiendo
// burbujas reales (mismo CSS, mismo ancho) al montar y cuando las fuentes
// están listas. Sin medición DOM por frame: sólo puntual al inicio.
// Resultado: cero solapes y cero derivas en cualquier plataforma.

import { useLayoutEffect, useRef, useState } from 'react'
import type { HistoryBlock } from './s02Data'

export const GAP_SAME = 6
export const GAP_DIFF = 16

export type LayoutTops = {
  tops: Map<string, number>
  heights: Map<string, number>
  contentH: number
  motherTop: number
  motherH: number
  sentTop: number
  sentH: number
  ready: boolean
}

export function blockKey(b: HistoryBlock, i: number): string {
  if (b.kind === 'chip') return `chip-${i}`
  if (b.kind === 'warranty') return 'warranty'
  if (b.kind === 'msg') return `msg-${b.msg.id}`
  if (b.kind === 'mother') return 'mother'
  return 'sent'
}

function prevFromOf(blocks: HistoryBlock[], idx: number): string {
  for (let j = idx - 1; j >= 0; j--) {
    const b = blocks[j]!
    if (b.kind === 'msg') return b.msg.from
    if (b.kind === 'mother') return 'mama'
    if (b.kind === 'warranty') return 'tomi'
    if (b.kind === 'chip') return 'chip'
  }
  return 'start'
}

function gapAfter(blocks: HistoryBlock[], idx: number): number {
  const b = blocks[idx]!
  if (b.kind === 'chip') return 20
  if (b.kind === 'warranty') return 29
  if (b.kind === 'mother') return 16
  if (b.kind === 'sent') return 22
  const from = b.kind === 'msg' ? b.msg.from : 'start'
  const prev = prevFromOf(blocks, idx)
  return prev === from ? GAP_SAME : GAP_DIFF
}

// Alturas estimadas (fallback del primer pintado): conservadoras (redondeo
// hacia arriba) para no solapar nunca antes de medir.
export function estimateBlockHeight(b: HistoryBlock): number {
  if (b.kind === 'chip') return 38
  if (b.kind === 'warranty') return 335
  if (b.kind === 'mother') return 132
  if (b.kind === 'sent') return 96
  return b.bh
}

export function computeLayout(blocks: HistoryBlock[], heights: Map<string, number>): LayoutTops {
  const tops = new Map<string, number>()
  let top = 10
  blocks.forEach((b, i) => {
    const key = blockKey(b, i)
    tops.set(key, top)
    const h = heights.get(key) ?? estimateBlockHeight(b)
    top += h + gapAfter(blocks, i)
  })
  let motherTop = 0
  let motherH = 132
  let sentTop = 0
  let sentH = 96
  const effH = new Map<string, number>()
  blocks.forEach((b, i) => {
    const key = blockKey(b, i)
    effH.set(key, heights.get(key) ?? estimateBlockHeight(b))
    if (b.kind === 'mother') {
      motherTop = tops.get(key) ?? 0
      motherH = effH.get(key) ?? motherH
    }
    if (b.kind === 'sent') {
      sentTop = tops.get(key) ?? 0
      sentH = effH.get(key) ?? sentH
    }
  })
  return { tops, heights: effH, contentH: top, motherTop, motherH, sentTop, sentH, ready: heights.size > 0 }
}

export function useHistoryLayout(blocks: HistoryBlock[], measureRef: React.RefObject<HTMLDivElement | null>): LayoutTops {
  const [heights, setHeights] = useState<Map<string, number>>(new Map())
  const blocksRef = useRef(blocks)
  blocksRef.current = blocks

  useLayoutEffect(() => {
    let live = true
    let tries = 0
    const read = (): boolean => {
      const root = measureRef.current
      if (!root) return false
      const next = new Map<string, number>()
      let ok = true
      blocksRef.current.forEach((b, i) => {
        const el = root.querySelector(`[data-mkey="${blockKey(b, i)}"]`)
        if (!el) {
          ok = false
          return
        }
        const h = (el as HTMLElement).offsetHeight
        if (h <= 0) {
          ok = false
          return
        }
        next.set(blockKey(b, i), h)
      })
      if (ok && live) setHeights(next)
      return ok
    }
    const kick = () => {
      if (!live) return
      if (read()) return
      if (++tries < 40) requestAnimationFrame(kick)
    }
    kick()
    let fontsDone = false
    if (typeof document !== 'undefined' && document.fonts?.ready) {
      document.fonts.ready.then(() => {
        if (!live || fontsDone) return
        fontsDone = true
        setHeights(new Map())
        tries = 0
        kick()
      }).catch(() => {})
    }
    return () => {
      live = false
    }
  }, [measureRef])

  return computeLayout(blocks, heights)
}
