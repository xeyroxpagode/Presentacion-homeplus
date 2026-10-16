// S03 — progreso 0→1 por step con autoridad de identidad (patrón S02 V1.6.1).
// `?s03p=0..1` congela el progreso del step actual (QA determinista).
// prefers-reduced-motion salta al estado final. Al terminar, HOLD sin loop.
// S03.0 (autoplay sincronizado al portal) NO usa este hook: usa el epoch
// compartido vía useS03EntryProgress (abajo).
import { useEffect, useMemo, useRef, useState } from 'react'
import { clamp01 } from './s03Clock'
import { S03_DURATIONS, S03_ENTRY_MS } from './s03Timeline'
import { frozenS03EntryMs, reducedMotion, s03Epoch, nowMs } from './s03Clock'

export function frozenStepProgress(): number | null {
  if (typeof window === 'undefined') return null
  const raw = new URLSearchParams(window.location.search).get('s03p')
  if (raw === null || raw === '') return null
  const v = Number(raw)
  return Number.isFinite(v) ? clamp01(v) : null
}

function initialFor(freeze: number | null, reduce: boolean): number {
  if (freeze !== null) return freeze
  return reduce ? 1 : 0
}

export function useS03Progress(stepIndex: number): number {
  const freeze = useMemo(() => frozenStepProgress(), [stepIndex])
  const reduce = useMemo(() => reducedMotion(), [])
  const duration = S03_DURATIONS[Math.min(Math.max(stepIndex, 0), S03_DURATIONS.length - 1)] ?? 500
  const identity = `${stepIndex}|${freeze === null ? 'live' : `f${freeze}`}|${reduce ? 'r' : 'm'}`
  const [state, setState] = useState(() => ({ id: identity, progress: initialFor(freeze, reduce) }))
  if (state.id !== identity) {
    setState({ id: identity, progress: initialFor(freeze, reduce) })
  }
  const generation = useRef(0)

  useEffect(() => {
    if (freeze !== null || reduce) return
    const myGen = ++generation.current
    let raf = 0
    let start = -1
    const tick = (now: number) => {
      if (myGen !== generation.current) return
      if (start < 0) start = now
      const t = clamp01((now - start) / duration)
      setState(prev => (prev.id === identity ? { ...prev, progress: t } : prev))
      if (t < 1 && myGen === generation.current) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => {
      if (myGen === generation.current) generation.current++
      cancelAnimationFrame(raf)
    }
  }, [identity, duration, freeze, reduce])

  if (state.id !== identity) return initialFor(freeze, reduce)
  return freeze ?? state.progress
}

/** Progreso del autoplay S03.0 derivado del epoch compartido con el portal:
 *  t = (now − epoch) / 2680. Determinista respecto al portal por construcción. */
export function useS03EntryProgress(): number {
  const freezeMs = useMemo(() => frozenS03EntryMs(), [])
  const reduce = useMemo(() => reducedMotion(), [])
  const [progress, setProgress] = useState(() =>
    freezeMs !== null ? clamp01(freezeMs / S03_ENTRY_MS) : reduce ? 1 : 0,
  )
  useEffect(() => {
    if (freezeMs !== null || reduce) {
      setProgress(freezeMs !== null ? clamp01(freezeMs / S03_ENTRY_MS) : 1)
      return
    }
    let raf = 0
    const tick = () => {
      const t = clamp01((nowMs() - s03Epoch()) / S03_ENTRY_MS)
      setProgress(t)
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [freezeMs, reduce])
  return progress
}
