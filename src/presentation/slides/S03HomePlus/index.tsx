// S03 — raíz: única fuente de verdad (stepIndex + progress).
// Step 0: branding autoplay (epoch compartido con el portal) — SIN CAMBIOS.
// Steps 1–10: película V6 (1920×1080) — computeScene + S03V6Scene.
// Handoff step 10 → S04: zoom blanco + velo puente + auto-nav (un solo click).
import { useEffect, useMemo, useRef, useState } from 'react'
import S03Isotipo from './S03Isotipo'
import type { S03Measures } from './S03Words'
import {
  INK_BG, HOME_SURFACE, HERO_CENTER,
  POSE_ISO_LOCKUP, WORDMARK, SIGNATURE_TOP, placeIsotipo,
} from './s03Geometry'
import {
  S03_ENTRY_MS, strokeP, headP0, headP1, whiteComplete,
  plusPose, orangeRadiusPng, orangeMaxRadiusPng,
  lockupPose, lockupP,
} from './s03Timeline'
import { s03Epoch, nowMs } from './s03Clock'
import { useS03Progress, useS03EntryProgress } from './useS03Progress'
import { computeScene } from './s03v6/timeline'
import S03V6Scene from './s03v6/Scene'
import './s03-cinematic.css'

const WORD_TEXT = 'HomePlus'
const WORD_WEIGHT = 600
const ORANGE_MAX = orangeMaxRadiusPng()

/** QA: congela el relevo S03.10 → S04 para capturar el frame final. */
function frozenHandoff(): boolean {
  if (typeof window === 'undefined') return false
  return new URLSearchParams(window.location.search).get('s03noauto') === '1'
}

// --- medidas tipográficas reales (canvas 2D, misma fuente) --------------------
function measure(text: string, size: number, weight: number, tracking: number): number {
  try {
    const cvs = document.createElement('canvas')
    const cx = cvs.getContext('2d')
    if (!cx) throw new Error('no-ctx')
    cx.font = `${weight} ${size}px Manrope, sans-serif`
    try {
      (cx as CanvasRenderingContext2D & { letterSpacing: string }).letterSpacing = `${tracking}px`
    } catch { /* fallback: ignora tracking */ }
    return cx.measureText(text).width
  } catch {
    return text.length * size * 0.58
  }
}

function useS03Measures(): S03Measures {
  const [gen, setGen] = useState(0)
  useEffect(() => {
    let live = true
    if (typeof document !== 'undefined' && document.fonts?.ready) {
      document.fonts.ready.then(() => { if (live) setGen(g => g + 1) }).catch(() => {})
    }
    return () => { live = false }
  }, [])
  return useMemo(() => {
    void gen
    return {
      heroW: {} as Record<string, number>,
      word100: measure(WORD_TEXT, 100, WORD_WEIGHT, -1.5),
      word36: measure(WORD_TEXT, 36, WORD_WEIGHT, -0.54),
    }
  }, [gen])
}

// --- poses del isotipo ----------------------------------------------------------
type IsoBox = { x: number; y: number; w: number }

function signatureBox(m: S03Measures): IsoBox {
  const gap = 22
  const total = SIGNATURE_TOP.iso + gap + m.word36
  return {
    x: SIGNATURE_TOP.cx - total / 2,
    y: SIGNATURE_TOP.cy - SIGNATURE_TOP.iso / 2,
    w: SIGNATURE_TOP.iso,
  }
}

export default function S03HomePlus({ active = true, stepIndex = 0, onStep10Complete, onStepSettled }: {
  active?: boolean
  stepIndex?: number
  onStep10Complete?: () => void
  /** Notifica que el step activo alcanzó su estado final (reposo). */
  onStepSettled?: () => void
}) {
  const step = Math.min(Math.max(stepIndex | 0, 0), 10)
  const entryP = useS03EntryProgress(active)
  const stepP = useS03Progress(step)
  const m = useS03Measures()

  const tMs = step === 0 ? entryP * S03_ENTRY_MS : S03_ENTRY_MS
  const p = step === 0 ? 1 : stepP

  // --- Handoff step 10 → S04: auto-nav al completar el zoom -------------------
  // `?s03noauto=1` congela el relevo (QA determinista del frame final).
  const completedRef = useRef(false)
  useEffect(() => {
    if (step === 10 && p >= 1 && !completedRef.current) {
      completedRef.current = true
      if (frozenHandoff()) return
      onStep10Complete?.()
    }
    if (step !== 10) completedRef.current = false
  }, [step, p, onStep10Complete])

  // --- Reposo del step: notifica a la cola de avances (§13.4) -----------------
  const settledRef = useRef(-1)
  useEffect(() => {
    if (step < 1 || step > 9) return
    if (p < 1 || settledRef.current === step) return
    settledRef.current = step
    onStepSettled?.()
  }, [step, p, onStepSettled])

  // --- isotipo (step 0: branding heredado, sin cambios) --------------------------
  const shift = useMemo(() => {
    const wordR = WORDMARK.startX + m.word100
    return 640 - (POSE_ISO_LOCKUP.x + wordR) / 2
  }, [m])
  const sig = signatureBox(m)

  let iso: IsoBox
  let white: { mode: 'full' } | { mode: 'draw'; stroke: number; head0: number; head1: number }
  let orangeR = ORANGE_MAX
  let plus = { visible: true, scale: 1, dy: 0 }
  let word: {
    visible: boolean; text: string; x: number; baselineY: number; size: number;
    weight: number; tracking: number; dx: number; clipLeftStage: number; opacity: number
  } | null = null

  {
    const L = lockupPose(tMs)
    const eL = lockupP(tMs)
    iso = { x: L.isoX + shift * eL, y: L.isoY, w: L.isoW }
    white = whiteComplete(tMs)
      ? { mode: 'full' }
      : { mode: 'draw', stroke: strokeP(tMs), head0: headP0(tMs), head1: headP1(tMs) }
    const pp = plusPose(tMs)
    plus = pp
    orangeR = orangeRadiusPng(tMs)
    if (L.wordVisible) {
      word = {
        visible: true, text: WORD_TEXT, x: WORDMARK.startX + shift * eL,
        baselineY: WORDMARK.centerY + WORDMARK.size * 0.35, size: WORDMARK.size,
        weight: WORD_WEIGHT, tracking: -1.5, dx: L.wordDx,
        clipLeftStage: iso.x + iso.w, opacity: 1,
      }
    }
  }

  const placement = placeIsotipo(iso.x, iso.y, iso.w)
  const zoom = { tx: 0, ty: 0, s: 1 }
  const vectorHead = 0
  const homeOpacity = 0

  // --- Película V6 (steps 1–10) ---------------------------------------------------
  if (step >= 1) {
    const scene = computeScene(step, p)
    return (
      <div className="s03-stage s03v6-stage" data-active={active} data-step={step} aria-hidden={!active}>
        <S03V6Scene state={scene} />
      </div>
    )
  }

  return (
    <div className="s03-stage" data-active={active} data-step={step} aria-hidden={!active}>
      <svg className="s03-svg" viewBox="0 0 1280 720" aria-label="HomePlus: de una línea a un hogar compartido">
        <g transform={`translate(${zoom.tx.toFixed(2)} ${zoom.ty.toFixed(2)}) scale(${zoom.s.toFixed(4)})`}>
          <S03Isotipo
            placement={placement}
            white={white}
            orangeRadiusPng={orangeR}
            orangeMaxPng={ORANGE_MAX}
            plus={plus}
            word={word}
            vectorHeadOpacity={vectorHead}
            idSuffix={`s${step}`}
          />
        </g>
      </svg>
      {homeOpacity > 0.001 && (
        <div className="s03-home-veil" style={{ opacity: homeOpacity, background: HOME_SURFACE }} aria-hidden="true" />
      )}
      <div className="s03-bg" style={{ background: INK_BG }} aria-hidden="true" />
    </div>
  )
}

// Re-export para QA determinista (sampling puro, sin React).
export { s03Epoch, nowMs, HERO_CENTER }
