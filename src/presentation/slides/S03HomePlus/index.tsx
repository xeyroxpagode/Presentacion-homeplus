// S03 — raíz: única fuente de verdad (stepIndex + progress).
// ACTO I (step 0): autoplay sincronizado al epoch compartido con el portal.
// Steps 1–10: transición determinista hacia el nuevo estado (sin retarget
// desde mitad de vuelo: cada entrada parte de la pose final nominal del
// estado anterior; HOLD estable al terminar, loop apagado).
import { useEffect, useMemo, useState } from 'react'
import S03Isotipo from './S03Isotipo'
import { conceptPoses, yoPoses, renderWord, TYPE_WHITE, TYPE_SECONDARY } from './S03Words'
import type { S03Measures } from './S03Words'
import {
  INK_BG, HOME_SURFACE, ORANGE_HEX, HERO_CENTER,
  CONCEPTS, POSE_ISO_CENTER, POSE_ISO_LOCKUP, WORDMARK, SIGNATURE_TOP,
  YO_SINGLE, YO_QUAD, YO_QUAD_SIZE, YO_LINE, MI_PARTE_SIZE,
  placeIsotipo, pngToStage, zoomCoverScale, HEAD_MAIN_PNG,
  type ConceptId,
} from './s03Geometry'
import {
  S03_ENTRY_MS, drawFrontPng, plusPose, orangeRadiusPng, orangeMaxRadiusPng,
  lockupPose, lockupP, lerp,
} from './s03Timeline'
import { clamp01, easeInOut, easeOutExpo, s03Epoch, nowMs } from './s03Clock'
import { useS03Progress, useS03EntryProgress } from './useS03Progress'
import './s03-cinematic.css'

const WORD_TEXT = 'HomePlus'
const WORD_WEIGHT = 600
const CONCEPT_WEIGHT = 700
const CONCEPT_TRACKING = -1
const ORANGE_MAX = orangeMaxRadiusPng()

const seg = (p: number, a: number, b: number): number => clamp01((p - a) / (b - a))

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
    const heroW = {} as Record<ConceptId, number>
    const yoCol31 = {} as Record<ConceptId, number>
    for (const c of CONCEPTS) {
      heroW[c.id] = measure(c.label, c.heroSize, CONCEPT_WEIGHT, CONCEPT_TRACKING)
      yoCol31[c.id] = measure(c.label, 31, CONCEPT_WEIGHT, CONCEPT_TRACKING)
    }
    void gen
    return {
      heroW,
      word100: measure(WORD_TEXT, 100, WORD_WEIGHT, -1.5),
      word36: measure(WORD_TEXT, 36, WORD_WEIGHT, -0.54),
      yo115: measure('YO', YO_SINGLE.size, 700, 0),
      yo72: measure('YO', YO_QUAD_SIZE, 700, 0),
      yoCol31,
      miParte17: measure('MI PARTE', MI_PARTE_SIZE, 500, 0.12 * MI_PARTE_SIZE),
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

export default function S03HomePlus({ active = true, stepIndex = 0 }: { active?: boolean; stepIndex?: number }) {
  const step = Math.min(Math.max(stepIndex | 0, 0), 10)
  const entryP = useS03EntryProgress()
  const stepP = useS03Progress(step)
  const m = useS03Measures()

  const tMs = step === 0 ? entryP * S03_ENTRY_MS : S03_ENTRY_MS
  const p = step === 0 ? 1 : stepP // steps 1+ animan con su propio progreso

  // --- isotipo ----------------------------------------------------------------
  const shift = useMemo(() => {
    const wordR = WORDMARK.startX + m.word100
    return 640 - (POSE_ISO_LOCKUP.x + wordR) / 2
  }, [m])
  const lockEnd: IsoBox = {
    x: POSE_ISO_LOCKUP.x + shift, y: POSE_ISO_LOCKUP.y, w: POSE_ISO_LOCKUP.w,
  }
  const sig = signatureBox(m)
  const centerBox: IsoBox = { x: 541, y: 261, w: 198 }

  let iso: IsoBox
  let white: { mode: 'full' } | { mode: 'draw'; frontPng: number }
  let orangeR = ORANGE_MAX
  let plus = { visible: true, scale: 1, dy: 0 }
  let word: {
    visible: boolean; text: string; x: number; baselineY: number; size: number;
    weight: number; tracking: number; dx: number; clipLeftStage: number; opacity: number
  } | null = null

  if (step === 0) {
    const L = lockupPose(tMs)
    const eL = lockupP(tMs)
    iso = { x: L.isoX + shift * eL, y: L.isoY, w: L.isoW }
    white = { mode: 'draw', frontPng: drawFrontPng(tMs) }
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
  } else if (step === 1) {
    const e = easeOutExpo(p)
    iso = {
      x: lerp(lockEnd.x, sig.x, e), y: lerp(lockEnd.y, sig.y, e), w: lerp(lockEnd.w, sig.w, e),
    }
    white = { mode: 'full' }
    const sigWordX = sig.x + sig.w + 22
    word = {
      visible: true, text: WORD_TEXT,
      x: lerp(WORDMARK.startX + shift, sigWordX, e),
      baselineY: lerp(WORDMARK.centerY + 100 * 0.35, SIGNATURE_TOP.cy + 36 * 0.35, e),
      size: lerp(100, 36, e), weight: WORD_WEIGHT, tracking: lerp(-1.5, -0.54, e),
      dx: 0, clipLeftStage: Infinity, opacity: 1,
    }
  } else if (step >= 2 && step <= 8) {
    iso = sig
    white = { mode: 'full' }
    word = {
      visible: true, text: WORD_TEXT, x: sig.x + sig.w + 22,
      baselineY: SIGNATURE_TOP.cy + 36 * 0.35, size: 36,
      weight: WORD_WEIGHT, tracking: -0.54, dx: 0, clipLeftStage: Infinity, opacity: 1,
    }
  } else if (step === 9) {
    const e = easeInOut(seg(p, 220 / 690, 1))
    iso = {
      x: lerp(sig.x, centerBox.x, e), y: lerp(sig.y, centerBox.y, e), w: lerp(sig.w, centerBox.w, e),
    }
    white = { mode: 'full' }
    const hideE = seg(p, 350 / 690, 520 / 690)
    const sigWordX = sig.x + sig.w + 22
    word = {
      visible: hideE < 0.999,
      text: WORD_TEXT, x: sigWordX,
      baselineY: SIGNATURE_TOP.cy + 36 * 0.35, size: 36,
      weight: WORD_WEIGHT, tracking: -0.54,
      dx: -m.word36 * hideE - 4 * hideE,
      clipLeftStage: sig.x + sig.w,
      opacity: 1 - seg(p, 450 / 690, 560 / 690),
    }
  } else {
    iso = centerBox
    white = { mode: 'full' }
    word = null
  }

  // --- zoom final (step 10) ------------------------------------------------------
  const placement = placeIsotipo(iso.x, iso.y, iso.w)
  const headStage = pngToStage(placement, HEAD_MAIN_PNG.cx, HEAD_MAIN_PNG.cy)
  const headRStage = HEAD_MAIN_PNG.r * placement.k
  const cover = zoomCoverScale(640, 360, headRStage, 1.07)
  let zoom = { tx: 0, ty: 0, s: 1 }
  let vectorHead = 0
  let homeOpacity = 0
  if (step === 10) {
    const t = p * 1400
    const eA = easeInOut(seg(t, 0, 350))
    const Fx = lerp(640, headStage.x, eA)
    const Fy = lerp(360, headStage.y, eA)
    const sA = lerp(1, 2.4, eA)
    const sB = lerp(2.4, 18, easeInOut(seg(t, 350, 800)))
    const s = t < 350 ? sA : t < 800 ? sB : lerp(18, cover, easeInOut(seg(t, 800, 1250)))
    zoom = { tx: 640 - Fx * s, ty: 360 - Fy * s, s }
    vectorHead = seg(s, 4, 7)
    homeOpacity = seg(t, 1230, 1380)
  }

  // --- palabras ------------------------------------------------------------------
  const poses = conceptPoses(step, step === 0 ? 1 : p, m)
  const yo = yoPoses(step, step === 0 ? 1 : p, m)
  const heroClips = CONCEPTS.filter(c => {
    const ps = poses[c.id]
    return ps.visible && ps.reveal < 0.999
  })

  return (
    <div className="s03-stage" data-active={active} data-step={step} aria-hidden={!active}>
      <svg className="s03-svg" viewBox="0 0 1280 720" aria-label="HomePlus: de una línea a un hogar compartido">
        <defs>
          {heroClips.map(c => {
            const ps = poses[c.id]
            const wCur = m.heroW[c.id] * (ps.size / c.heroSize)
            const revealW = 90 + (wCur + 120) * clamp01(ps.reveal)
            return (
              <clipPath key={c.id} id={`s03hero-${c.id}`}>
                <rect x={ps.x - 90} y={ps.baseline - ps.size - 60} width={revealW} height={ps.size + 140} />
              </clipPath>
            )
          })}
        </defs>
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
          {/* conceptos */}
          {CONCEPTS.map(c => renderWord(
            `concept-${c.id}`, c.label, poses[c.id], CONCEPT_WEIGHT, CONCEPT_TRACKING,
            TYPE_WHITE, `s03hero-${c.id}`,
          ))}
          {/* YO único */}
          {yo.single.opacity > 0.001 && (
            <text
              x={640 - m.yo115 * (yo.single.size / YO_SINGLE.size) / 2}
              y={YO_SINGLE.y + yo.single.size * 0.35 - yo.single.rise}
              fontFamily="Manrope, sans-serif" fontWeight={700} fontSize={yo.single.size}
              fill={TYPE_WHITE} opacity={yo.single.opacity}
            >
              YO
            </text>
          )}
          {yo.divider > 0.001 && (
            <rect x={640 - 1.5} y={296} width={3} height={30} fill={ORANGE_HEX} opacity={yo.divider} />
          )}
          {/* columna (render dentro de conceptos) */}
          {/* cuádruple perspectiva */}
          {yo.quad.map((q, j) => q.opacity > 0.001 && (
            <text
              key={`yo-${j}`}
              x={YO_QUAD[j]!.x - m.yo72 * (q.size / 72) / 2}
              y={q.baseline}
              fontFamily="Manrope, sans-serif" fontWeight={700} fontSize={q.size}
              fill={TYPE_WHITE} opacity={q.opacity}
            >
              YO
            </text>
          ))}
          {yo.lines.map((L, j) => L.opacity > 0.001 && (
            <rect key={`yol-${j}`} x={L.x} y={L.y} width={YO_LINE.w} height={L.h} fill={ORANGE_HEX} opacity={L.opacity} />
          ))}
          {yo.miParte.opacity > 0.001 && YO_QUAD.map((q, j) => (
            <text
              key={`mp-${j}`}
              x={q.x - m.miParte17 / 2}
              y={YO_QUAD[j]!.y + 72 * 0.35 + 19 + 2.7 + 16 + MI_PARTE_SIZE * 0.35 - yo.miParte.rise}
              fontFamily="Manrope, sans-serif" fontWeight={500} fontSize={MI_PARTE_SIZE}
              letterSpacing={(0.12 * MI_PARTE_SIZE).toFixed(2)} fill={TYPE_SECONDARY}
              opacity={yo.miParte.opacity} textAnchor="start"
            >
              MI PARTE
            </text>
          ))}
        </g>
      </svg>
      {homeOpacity > 0.001 && (
        <div className="s03-home-veil" style={{ opacity: homeOpacity, background: HOME_SURFACE }} aria-hidden="true" />
      )}
      {/* fondo editorial (debajo del svg por si el portal aún no cubre) */}
      <div className="s03-bg" style={{ background: INK_BG }} aria-hidden="true" />
    </div>
  )
}

// Re-export para QA determinista (sampling puro, sin React).
export { s03Epoch, nowMs, HERO_CENTER }
