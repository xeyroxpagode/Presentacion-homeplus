// S03 — tipografía protagonista (ACTO II conceptos, ACTO III autonomía).
// Toda posición deriva de (step, p) + medidas canvas (sin lecturas DOM).
// Shared elements reales: la misma palabra viaja de protagonista a slot,
// luego a columna (S03.6), a composición radial (S03.7–S03.8) y sale (S03.9).
// Sin YO / MI PARTE: la autonomía se narra sólo con los cuatro conceptos.
import type { ReactNode } from 'react'
import {
  CONCEPTS, CONCEPT_SLOTS, HERO_CENTER, HERO_LINE, SLOT_LINE,
  COLUMN_CENTERS_Y, COLUMN_ITEM_SIZE, RADIAL, RADIAL_LINE,
  RADIAL_LINE_STAGGER, AXIS_LINE,
  TYPE_WHITE, ORANGE_HEX,
  type ConceptId,
} from './s03Geometry'
import { easeInOut, clamp01 } from './s03Clock'
import { lerp, easeHero } from './s03Timeline'

export type S03Measures = {
  heroW: Record<ConceptId, number>
  word100: number
  word36: number
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

function columnPose(id: ConceptId, wCol: number, idx: number): ConceptPose {
  return {
    visible: true,
    x: 640 - wCol / 2,
    baseline: COLUMN_CENTERS_Y[idx]! + COLUMN_ITEM_SIZE * 0.35,
    size: COLUMN_ITEM_SIZE,
    opacity: 1, rise: 0, blur: 0, reveal: 1,
    lineW: 0, lineH: 0, lineX: 0, lineY: 0, lineOpacity: 0,
  }
}

function radialPose(id: ConceptId, wRad: number, lineE: number): ConceptPose {
  const r = RADIAL[id]
  const baseline = r.cy + r.size * 0.35
  return {
    visible: true,
    x: r.cx - wRad / 2, baseline, size: r.size,
    opacity: 1, rise: 0, blur: 0, reveal: 1,
    lineW: RADIAL_LINE.w, lineH: RADIAL_LINE.h,
    lineX: r.cx - RADIAL_LINE.w / 2,
    lineY: baseline + r.size * 0.22 + RADIAL_LINE.gap,
    lineOpacity: lineE,
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
    const idx = CONCEPTS.findIndex(k => k.id === c.id)
    const slot = slotPose(c.id, heroW(c.id, CONCEPT_SLOTS[c.id].size, c.heroSize))
    const hero = (e: number, le: number) => heroPose(c.label, m.heroW[c.id], c.heroSize, e, le)
    const col = columnPose(c.id, heroW(c.id, COLUMN_ITEM_SIZE, c.heroSize), idx)
    const rad = (lineE: number) => radialPose(c.id, heroW(c.id, RADIAL[c.id].size, c.heroSize), lineE)
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
      // S03.6 concentración (850ms): slots → columna central con stagger de
      // 50ms; las líneas individuales se atenúan durante la convergencia.
      const e = easeHero(seg(p, (idx * 50) / 850, (idx * 50 + 600) / 850))
      pose = mixPose(slot, col, e)
      pose.lineOpacity = lerp(1, 0, easeHero(seg(p, 0, 0.5)))
    } else if (step === 7) {
      // S03.7 apertura (980ms): la columna deja el eje compartido y cada
      // palabra viaja a su posición radial. Sin líneas ni conexiones.
      const e = easeInOut(seg(p, (idx * 40) / 980, (idx * 40 + 700) / 980))
      pose = mixPose(col, rad(0), e)
    } else if (step === 8) {
      // S03.8 autonomía compartida (600ms): composición radial estable;
      // bajo cada palabra aparece su línea con 110ms de desfase y permanece.
      const tMs = p * 600
      const lineE = seg(tMs, idx * RADIAL_LINE_STAGGER, idx * RADIAL_LINE_STAGGER + 250)
      pose = rad(lineE)
    } else if (step === 9) {
      // S03.9 retorno (690ms): los conceptos pierden protagonismo con escala
      // y opacidad, sin salidas extravagantes; las líneas se van primero.
      const outE = seg(p, 0, 220 / 690)
      const wordE = seg(p, 100 / 690, 430 / 690)
      pose = { ...rad(0), lineOpacity: 1 - outE, opacity: 1 - wordE }
      pose.visible = wordE < 0.999
    } else {
      pose = hidden
    }
    out[c.id] = pose
  }
  return out
}

/** Línea única del eje central (S03.6): aparece con la concentración y se
 *  retira al abrir (S03.7). Recurso de concentración, sin texto. */
export function axisLineOpacity(step: number, p: number): number {
  if (step === 6) return seg(p, 0.35, 0.7)
  return 0
}

export function axisLineRect(): { x: number; y: number; w: number; h: number } {
  return { x: 640 - AXIS_LINE.w / 2, y: AXIS_LINE.y, w: AXIS_LINE.w, h: AXIS_LINE.h }
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

export { TYPE_WHITE }
