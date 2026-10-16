// S03 — tipografía protagonista (ACTO II conceptos, ACTO III autonomía).
// Toda posición deriva de (step, p) + medidas canvas (sin lecturas DOM).
// Shared elements reales: la misma palabra viaja de protagonista a slot.
import type { ReactNode } from 'react'
import {
  CONCEPTS, CONCEPT_SLOTS, HERO_CENTER, HERO_LINE, SLOT_LINE,
  YO_SINGLE, COLUMN_ITEMS_Y, COLUMN_ITEM_SIZE, YO_QUAD, YO_QUAD_SIZE,
  YO_LINE, MI_PARTE_SIZE, TYPE_WHITE, TYPE_SECONDARY, ORANGE_HEX,
  type ConceptId,
} from './s03Geometry'
import { easeInOut, clamp01 } from './s03Clock'
import { lerp, easeHero } from './s03Timeline'

export type S03Measures = {
  heroW: Record<ConceptId, number>
  word100: number
  word36: number
  yo115: number
  yo72: number
  yoCol31: Record<ConceptId, number>
  miParte17: number
}

const seg = (p: number, a: number, b: number): number => clamp01((p - a) / (b - a))
const heroBaseline = (size: number): number => HERO_CENTER.y + size * 0.35
const slotBaseline = (top: number, size: number): number => top + size * 0.82

export type ConceptPose = {
  visible: boolean
  x: number // borde izquierdo (textAnchor=start)
  baseline: number
  size: number
  opacity: number
  rise: number
  blur: number
  reveal: number // 0..1 máscara horizontal (1 = completa)
  lineW: number; lineH: number; lineY: number; lineOpacity: number
  lineX: number
}

function heroPose(label: string, w: number, size: number, e: number, lineE: number): ConceptPose {
  const x = HERO_CENTER.x - w / 2
  const baseline = heroBaseline(size)
  return {
    visible: e > 0.001,
    x, baseline, size,
    opacity: e,
    rise: (1 - e) * 15,
    blur: (1 - e) * 3.3,
    reveal: easeHero(clamp01(e * 1.12)),
    lineW: HERO_LINE.w, lineH: HERO_LINE.h,
    lineX: x + (w - HERO_LINE.w) / 2,
    lineY: baseline + size * 0.22 + 14,
    lineOpacity: lineE,
  }
}

function slotPose(id: ConceptId, w: number): ConceptPose {
  const s = CONCEPT_SLOTS[id]
  const baseline = slotBaseline(s.y, s.size)
  return {
    visible: true,
    x: s.x, baseline, size: s.size,
    opacity: 1, rise: 0, blur: 0, reveal: 1,
    lineW: SLOT_LINE.w, lineH: SLOT_LINE.h,
    lineX: s.x + (w - SLOT_LINE.w) / 2,
    lineY: baseline + s.size * 0.22 + SLOT_LINE.gap,
    lineOpacity: 1,
  }
}

function mixPose(a: ConceptPose, b: ConceptPose, e: number): ConceptPose {
  return {
    visible: a.visible || b.visible,
    x: lerp(a.x, b.x, e), baseline: lerp(a.baseline, b.baseline, e),
    size: lerp(a.size, b.size, e), opacity: lerp(a.opacity, b.opacity, e),
    rise: lerp(a.rise, b.rise, e), blur: lerp(a.blur, b.blur, e),
    reveal: lerp(a.reveal, b.reveal, e),
    lineW: lerp(a.lineW, b.lineW, e), lineH: lerp(a.lineH, b.lineH, e),
    lineX: lerp(a.lineX, b.lineX, e), lineY: lerp(a.lineY, b.lineY, e),
    lineOpacity: lerp(a.lineOpacity, b.lineOpacity, e),
  }
}

/** Pose de cada concepto para (step, p). Ancho medido a heroSize; el resto
 *  escala linealmente con el tamaño (tracking proporcional). */
export function conceptPoses(step: number, p: number, m: S03Measures): Record<ConceptId, ConceptPose> {
  const hidden: ConceptPose = {
    visible: false, x: 0, baseline: 0, size: 40, opacity: 0, rise: 0, blur: 0, reveal: 0,
    lineW: 64, lineH: 3, lineX: 0, lineY: 0, lineOpacity: 0,
  }
  const heroW = (id: ConceptId, size: number, heroSize: number) => m.heroW[id] * (size / heroSize)
  const out = {} as Record<ConceptId, ConceptPose>

  for (const c of CONCEPTS) {
    const slot = slotPose(c.id, heroW(c.id, CONCEPT_SLOTS[c.id].size, c.heroSize))
    const hero = (e: number, le: number) => heroPose(c.label, m.heroW[c.id], c.heroSize, e, le)
    let pose: ConceptPose = hidden
    if (step <= 1) pose = hidden
    else if (step === 2) {
      pose = c.id === 'personas' ? hero(easeHero(p), easeHero(seg(p, 0.25, 1))) : hidden
    } else if (step === 3) {
      if (c.id === 'personas') {
        const eA = easeHero(seg(p, 0, 0.886))
        pose = mixPose(hero(1, 1), slot, eA)
      } else if (c.id === 'momentos') {
        const eB = easeHero(seg(p, 0.143, 0.857))
        pose = hero(eB, easeHero(seg(p, 0.36, 1)))
      }
    } else if (step === 4) {
      if (c.id === 'personas') pose = slotPose(c.id, heroW(c.id, CONCEPT_SLOTS[c.id].size, c.heroSize))
      else if (c.id === 'momentos') {
        const eA = easeHero(seg(p, 0, 0.886))
        pose = mixPose(hero(1, 1), slot, eA)
      } else if (c.id === 'responsabilidades') {
        const eB = easeHero(seg(p, 0.143, 0.857))
        pose = hero(eB, easeHero(seg(p, 0.36, 1)))
      }
    } else if (step === 5) {
      if (c.id === 'personas' || c.id === 'momentos') {
        pose = slotPose(c.id, heroW(c.id, CONCEPT_SLOTS[c.id].size, c.heroSize))
      } else if (c.id === 'responsabilidades') {
        const eA = easeHero(seg(p, 0, 0.545))
        pose = mixPose(hero(1, 1), slot, eA)
      } else if (c.id === 'informacion') {
        const eB = easeHero(seg(p, 0.09, 0.545))
        const eC = easeInOut(seg(p, 0.59, 1))
        pose = mixPose(hero(eB, easeHero(seg(p, 0.27, 0.6))), slot, eC)
        pose.visible = eB > 0.001
        pose.opacity = lerp(eB, 1, eC)
      }
    } else if (step === 6) {
      // slots → columna central (stagger 50ms), líneas se atenúan
      const idx = CONCEPTS.findIndex(k => k.id === c.id)
      const e = easeHero(seg(p, (idx * 50) / 850, (idx * 50 + 600) / 850))
      const colW = heroW(c.id, COLUMN_ITEM_SIZE, c.heroSize)
      const col: ConceptPose = {
        visible: true,
        x: 640 - colW / 2, baseline: COLUMN_ITEMS_Y[idx]! + COLUMN_ITEM_SIZE * 0.35,
        size: COLUMN_ITEM_SIZE, opacity: lerp(1, 0.8, e), rise: 0, blur: 0, reveal: 1,
        lineW: 0, lineH: 0, lineX: 0, lineY: 0, lineOpacity: lerp(1, 0, e),
      }
      pose = mixPose(slot, col, e)
    } else {
      // steps 7+: la columna se disuelve durante S03.7
      const idx = CONCEPTS.findIndex(k => k.id === c.id)
      const colW = heroW(c.id, COLUMN_ITEM_SIZE, c.heroSize)
      const fade = 1 - seg(p, step === 7 ? (140 + idx * 20) / 980 : 0, step === 7 ? 500 / 980 : 0.001)
      pose = {
        visible: fade > 0.001 && step === 7,
        x: 640 - colW / 2, baseline: COLUMN_ITEMS_Y[idx]! + COLUMN_ITEM_SIZE * 0.35,
        size: COLUMN_ITEM_SIZE, opacity: 0.8 * fade, rise: 0, blur: 0, reveal: 1,
        lineW: 0, lineH: 0, lineX: 0, lineY: 0, lineOpacity: 0,
      }
    }
    out[c.id] = pose
  }
  return out
}

export type YoQuadPose = { x: number; baseline: number; size: number; opacity: number }[]

export function yoPoses(step: number, p: number, m: S03Measures): {
  single: { opacity: number; rise: number; size: number }
  quad: YoQuadPose
  lines: { x: number; y: number; opacity: number; h: number }[]
  miParte: { opacity: number; rise: number }
  divider: number
} {
  const singleX = (s: number, w: number) => 640 - w * (s / 115) / 2
  if (step <= 5) {
    return {
      single: { opacity: 0, rise: 0, size: YO_SINGLE.size },
      quad: YO_QUAD.map(() => ({ x: 0, baseline: 0, size: YO_QUAD_SIZE, opacity: 0 })),
      lines: YO_QUAD.map(() => ({ x: 0, y: 0, opacity: 0, h: YO_LINE.h })),
      miParte: { opacity: 0, rise: 0 },
      divider: 0,
    }
  }
  if (step === 6) {
    const eYO = easeHero(seg(p, 0.15, 0.75))
    return {
      single: { opacity: eYO, rise: (1 - eYO) * 12, size: YO_SINGLE.size },
      quad: YO_QUAD.map(() => ({ x: 0, baseline: 0, size: YO_QUAD_SIZE, opacity: 0 })),
      lines: YO_QUAD.map(() => ({ x: 0, y: 0, opacity: 0, h: YO_LINE.h })),
      miParte: { opacity: 0, rise: 0 },
      divider: seg(p, 0.4, 0.7),
    }
  }
  // step 7: expansión; step 8: foco; step 9: salida coordinada
  const singleBase = { x: singleX(YO_SINGLE.size, m.yo115), baseline: YO_SINGLE.y + YO_SINGLE.size * 0.35 }
  const quadBase = YO_QUAD.map(q => ({
    x: q.x - (m.yo72 / 2), baseline: q.y + YO_QUAD_SIZE * 0.35,
  }))
  if (step === 7) {
    const cross = seg(p, 140 / 980, 300 / 980)
    const quad: YoQuadPose = YO_QUAD.map((q, j) => {
      const e = easeInOut(seg(p, (140 + j * 50) / 980, 740 / 980))
      return {
        x: lerp(singleBase.x, quadBase[j]!.x, e),
        baseline: lerp(singleBase.baseline, quadBase[j]!.baseline, e),
        size: lerp(108, YO_QUAD_SIZE, e),
        opacity: cross,
      }
      void q
    })
    const lines = YO_QUAD.map((q, j) => {
      const e = seg(p, (620 + j * 30) / 980, 850 / 980)
      return { x: q.x - YO_LINE.w / 2, y: quadBase[j]!.baseline + 19, opacity: e, h: YO_LINE.h }
    })
    return {
      single: { opacity: 1 - cross, rise: 0, size: lerp(YO_SINGLE.size, 108, seg(p, 0, 140 / 980)) },
      quad, lines,
      miParte: { opacity: seg(p, 760 / 980, 1), rise: (1 - seg(p, 760 / 980, 1)) * 8 },
      divider: 1 - seg(p, 140 / 980, 400 / 980),
    }
  }
  if (step === 8) {
    const pms = p * 600
    const lines = YO_QUAD.map((q, j) => {
      const a = seg(pms, j * 110, j * 110 + 250)
      return {
        x: q.x - YO_LINE.w / 2, y: quadBase[j]!.baseline + 19,
        opacity: 0.55 + 0.45 * a, h: YO_LINE.h + 0.7 * a,
      }
    })
    return {
      single: { opacity: 0, rise: 0, size: YO_SINGLE.size },
      quad: YO_QUAD.map((q, j) => ({ ...quadBase[j]!, size: YO_QUAD_SIZE, opacity: 1 })),
      lines,
      miParte: { opacity: 1, rise: 0 },
      divider: 0,
    }
  }
  // step 9: MI PARTE y acentos fuera 0–220; YOs pierden escala/opacidad 100–430
  const outE = seg(p, 0, 220 / 690)
  const yoE = seg(p, 100 / 690, 430 / 690)
  return {
    single: { opacity: 0, rise: 0, size: YO_SINGLE.size },
    quad: YO_QUAD.map((q, j) => ({
      ...quadBase[j]!,
      size: lerp(YO_QUAD_SIZE, YO_QUAD_SIZE * 0.82, yoE),
      opacity: 1 - yoE,
    })),
    lines: YO_QUAD.map((q, j) => ({
      x: q.x - YO_LINE.w / 2, y: quadBase[j]!.baseline + 19,
      opacity: (0.55 + 0.45) * (1 - outE), h: YO_LINE.h,
    })),
    miParte: { opacity: 1 - outE, rise: outE * 6 },
    divider: 0,
  }
}

export function renderWord(
  key: string, label: string, pose: ConceptPose, weight: number, tracking: number, fill: string, clipId?: string,
): ReactNode {
  if (!pose.visible && pose.lineOpacity <= 0.001) return null
  return (
    <g key={key}>
      {pose.visible && (
        <g
          opacity={pose.opacity}
          style={{ filter: pose.blur > 0.05 ? `blur(${pose.blur.toFixed(2)}px)` : undefined }}
        >
          <text
            x={pose.x} y={pose.baseline - pose.rise}
            fontFamily="Manrope, sans-serif" fontWeight={weight} fontSize={pose.size}
            letterSpacing={tracking} fill={fill}
            clipPath={clipId && pose.reveal < 0.999 ? `url(#${clipId})` : undefined}
          >
            {label}
          </text>
        </g>
      )}
      {pose.lineOpacity > 0.001 && (
        <rect
          x={pose.lineX} y={pose.lineY} width={pose.lineW} height={pose.lineH}
          fill={ORANGE_HEX} opacity={pose.lineOpacity}
        />
      )}
    </g>
  )
}

export { TYPE_WHITE, TYPE_SECONDARY }
