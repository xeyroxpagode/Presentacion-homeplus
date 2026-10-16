// S03 — progreso 0→1 por step con autoridad de identidad (patrón S02 V1.6.1).
// `?s03p=0..1` congela el progreso del step actual (QA determinista).
// prefers-reduced-motion salta al estado final. Al terminar, HOLD sin loop.
// S03.0 (autoplay sincronizado al portal) usa el epoch compartido vía
// useS03EntryProgress(active, abajo): mientras S03 está inactiva el progreso
// es 0 y el loop no consume el timeline.
import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from 'react'
import { clamp01 } from './s03Clock'
import { S03_DURATIONS, S03_ENTRY_MS } from './s03Timeline'
import { frozenS03EntryMs, reducedMotion, s03Epoch, s03Generation, subscribeS03Entry, nowMs } from './s03Clock'

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

/** Progreso del autoplay S03.0 derivado del epoch del host:
 *  t = (now − epoch) / 3000. Portal y dibujo muestrean el MISMO instante.
 *  Con epoch null (S03 inactiva) o active=false: 0, sin consumir nada.
 *  La suscripción a la generación reinicia el loop en cada ciclo nuevo
 *  (reingreso desde S02, deep link), nunca en un render normal. */
export function useS03EntryProgress(active: boolean): number {
  const freezeMs = useMemo(() => frozenS03EntryMs(), [])
  const reduce = useMemo(() => reducedMotion(), [])
  const gen = useSyncExternalStore(subscribeS03Entry, s03Generation, s03Generation)
  const [progress, setProgress] = useState(() =>
    freezeMs !== null ? clamp01(freezeMs / S03_ENTRY_MS) : reduce ? 1 : 0,
  )
  useEffect(() => {
    if (freezeMs !== null) {
      setProgress(clamp01(freezeMs / S03_ENTRY_MS))
      return
    }
    if (reduce) {
      setProgress(1)
      return
    }
    if (!active) {
      setProgress(0)
      return
    }
    const epoch = s03Epoch()
    if (epoch === null) {
      setProgress(0)
      return
    }
    let raf = 0
    const tick = () => {
      const e = s03Epoch()
      const t = e === null ? 0 : clamp01((nowMs() - e) / S03_ENTRY_MS)
      setProgress(t)
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [freezeMs, reduce, active, gen])
  return progress
}
