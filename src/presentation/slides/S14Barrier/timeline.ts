/**
 * S14 Friction Editorial V6.0 — deterministic animation motor (§24).
 *
 * Model: every narrative step owns ONE local timeline. A scene renders purely
 * from its local time `t` via `sampleStep(step, t)` — no scattered setTimeout,
 * no CSS keyframe percentages as source of truth. The React host runs a single
 * rAF loop per step (mount = replay, unmount = cancel + cleanup).
 *
 * Seek (§24.3): `sampleStep(step, pct * STEP_DURATION[step])` reproduces the
 * frame at 0/10/25/50/75/90/100% exactly. Appending `?s14t=<ms>` freezes the
 * mounted step at that local time (JS-driven values, not frozen CSS).
 *
 * Advance policy (§24.4): HOLD → NEXT starts the next cue. Rapid NEXT during
 * animation unmounts the step, which cancels its rAF loop and dismounts every
 * track layer (no orphan layers, no timelines running behind). PREVIOUS and
 * direct jumps (`?dev=1&slide=13&step=M`) remount the requested state from a
 * known snapshot. Key repeat is already ignored by the global navigation
 * (`event.repeat` guard in Presentation.tsx).
 */

import { EASING, STEP_DURATION, type EasingName } from './geometry'

/* ------------------------------------------------------------------ */
/* Easing: exact cubic-bezier solver (no approximations).              */
/* ------------------------------------------------------------------ */

function cubicBezier(x1: number, y1: number, x2: number, y2: number): (t: number) => number {
  const cx = 3 * x1
  const bx = 3 * (x2 - x1) - cx
  const ax = 1 - cx - bx
  const cy = 3 * y1
  const by = 3 * (y2 - y1) - cy
  const ay = 1 - cy - by
  const sampleX = (t: number): number => ((ax * t + bx) * t + cx) * t
  const sampleY = (t: number): number => ((ay * t + by) * t + cy) * t
  const solveX = (x: number): number => {
    let t = x
    for (let i = 0; i < 5; i += 1) {
      const err = sampleX(t) - x
      if (Math.abs(err) < 1e-4) return t
      const d = (3 * ax * t + 2 * bx) * t + cx
      if (Math.abs(d) < 1e-4) break
      t -= err / d
    }
    return t
  }
  return (t: number): number => {
    if (t <= 0) return 0
    if (t >= 1) return 1
    return sampleY(solveX(t))
  }
}

const EASE_FNS: Record<EasingName, (t: number) => number> = {
  M_REFRAME: cubicBezier(0.22, 0.61, 0.36, 1),
  M_SHARED: cubicBezier(0.22, 1, 0.36, 1),
  M_REVEAL: cubicBezier(0.16, 1, 0.3, 1),
  M_EXIT: cubicBezier(0.55, 0, 1, 0.45),
}

export function applyEasing(name: EasingName, p: number): number {
  return EASE_FNS[name](Math.min(1, Math.max(0, p)))
}

/** Eased progress of window [start, start+dur] at local time t. */
export function win(t: number, start: number, dur: number, ease: EasingName): number {
  if (t <= start) return 0
  if (t >= start + dur) return 1
  return applyEasing(ease, (t - start) / dur)
}

/* ------------------------------------------------------------------ */
/* Track contract (§24.1). Every morph track declares origin/dest.      */
/* ------------------------------------------------------------------ */

export type Track = {
  id: string
  cue: string
  elementId: string
  start: number
  duration: number
  easing: EasingName
  origin: string
  destination: string
  opacity: [number, number]
  mask: string | null
  visibleFrom: string
  visibleTo: string
  terminal: string
  cancel: string
  dismount: string
}

export type Beat = {
  id: string
  trigger: string
  duration: number
  tracks: Track[]
}

const T = (
  id: string,
  cue: string,
  elementId: string,
  start: number,
  duration: number,
  easing: EasingName,
  origin: string,
  destination: string,
  opacity: [number, number] = [0, 1],
  mask: string | null = null,
): Track => ({
  id,
  cue,
  elementId,
  start,
  duration,
  easing,
  origin,
  destination,
  opacity,
  mask,
  visibleFrom: origin,
  visibleTo: destination,
  terminal: `hold at ${destination}`,
  cancel: 'unmount step cancels rAF; layer dismounts',
  dismount: 'React unmount on step exit',
})

/** Step 2 beats — microtimeline §21.2 (local ms, total 2300). */
export const S2_BEATS: Beat[] = [
  {
    id: 'home-to-planner', trigger: '“si quiero crear una tarea”', duration: 380, tracks: [
      T('homeOut', 'G03', 'home-regions', 0, 380, 'M_REFRAME', 'HOME full', 'HOME exited', [1, 0]),
      T('plannerIn', 'G03', 'planner-content', 0, 380, 'M_REFRAME', 'y+10/op0', 'PLANNER_* TARGET', [0, 1]),
    ],
  },
  {
    id: 'plus-emphasis', trigger: '“crear una tarea”', duration: 160, tracks: [
      T('plusGlyph', 'G03', 'planner-plus-glyph', 260, 160, 'M_SHARED', 'scale 1', 'scale 1→1.08→1', [1, 1]),
    ],
  },
  {
    id: 'intent-preview', trigger: 'intención de tarea', duration: 410, tracks: [
      T('listDim', 'G03', 'planner-list', 350, 120, 'M_REVEAL', 'op 1', 'op 0.25', [1, 0.25]),
      T('previewIn', 'G03', 'task-intent-preview', 350, 310, 'M_REVEAL', 'INTENT_ROW scale .94 y+20', 'INTENT_ROW TARGET', [0, 1]),
    ],
  },
  {
    id: 'row-to-form', trigger: '“tengo que saber cómo hacerlo”', duration: 580, tracks: [
      T('morph', 'G04', 'intent-surface', 700, 560, 'M_REVEAL', 'INTENT_ROW (320,410,1280,116)', 'FORM_TITLE_FIELD (280,329,1360,108) + form grid', [1, 1], 'form reveal clip'),
      T('titleShared', 'G04', 'shared-task-title', 760, 440, 'M_SHARED', 'INTENT_TITLE (364,428,980,55) 34/550', 'FORM_TITLE_TEXT (312,359,1296,50) 34/600', [1, 1]),
      T('metaSplit', 'G04', 'shared-task-meta', 850, 300, 'M_REVEAL', 'INTENT_META compacta', 'FORM_DATE + FORM_ASSIGNEE values', [1, 0]),
      T('fieldsIn', 'G04', 'form-fields', 950, 250, 'M_REVEAL', 'y+10/op0 stagger ≤40ms', 'FORM_DATE/ASSIGNEE/TIME TARGET', [0, 1]),
      T('ctaIn', 'G04', 'form-cta', 1150, 200, 'M_REVEAL', 'y+12/op0', 'FORM_CTA (1220,758,420,80)', [0, 1]),
    ],
  },
  {
    id: 'date-select', trigger: 'elegir Mañana', duration: 470, tracks: [
      T('pickerOpen', 'G04', 'date-picker', 1210, 180, 'M_REVEAL', 'FORM_PICKER h0 clipped', 'FORM_PICKER (280,624,420,188)', [0, 1], 'vertical clip'),
      T('pickManana', 'G04', 'date-value', 1390, 140, 'M_SHARED', 'Fecha=Sin fecha', 'Fecha=Mañana', [1, 1]),
      T('pickerClose', 'G04', 'date-picker', 1560, 120, 'M_REVEAL', 'FORM_PICKER open', 'collapsed into FORM_DATE', [1, 0], 'vertical clip'),
    ],
  },
]

/** Step 3 beats — microtimeline §21.3 (local ms, total 2100). */
export const S3_BEATS: Beat[] = [
  {
    id: 'task-exit-assets-entry', trigger: '“o si quiero buscar una garantía”', duration: 380, tracks: [
      T('formOut', 'G05', 'task-form', 0, 350, 'M_EXIT', 'form HOLD (Mañana)', 'contracted preview → gone', [1, 0]),
      T('assetsIn', 'G05', 'assets-content', 100, 280, 'M_REFRAME', 'y+12/op0', 'ASSETS_* TARGET', [0, 1]),
    ],
  },
  {
    id: 'ps-focus', trigger: 'PlayStation destacada', duration: 240, tracks: [
      T('psFocus', 'G05', 'ps5-row', 300, 240, 'M_REFRAME', 'exposure 1', 'neighbours .45 / PS5 1 scale 1.025 +8px', [1, 1]),
    ],
  },
  {
    id: 'ps-to-detail', trigger: 'ficha horizontal', duration: 600, tracks: [
      T('psMorph', 'G05', 'asset-identity', 500, 600, 'M_REVEAL', 'ASSETS_PS5_ROW (280,470,1360,100)', 'ASSET_IDENTITY_REGION + ASSET_DOCUMENTS_REGION', [1, 1], 'detail reveal clip'),
      T('avatarShared', 'G05', 'shared-asset-avatar', 590, 420, 'M_SHARED', 'avatar 62px in row', 'ASSET_AVATAR (292,330,76,76)', [1, 1]),
      T('titleShared', 'G05', 'shared-asset-title', 620, 460, 'M_SHARED', 'row title 30px', 'ASSET_TITLE_BOX 42px', [1, 1]),
    ],
  },
  {
    id: 'warranty-expand', trigger: '“tengo que saber dónde está”', duration: 470, tracks: [
      T('warrantyExpand', 'G06', 'warranty-record', 1030, 470, 'M_REVEAL', 'ASSET_WARRANTY_ROW (940,382,700,120)', 'WARRANTY_EXPANDED (924,350,726,450)', [1, 1], 'vertical growth clip'),
      T('warrantyTitle', 'G06', 'shared-warranty-title', 1100, 360, 'M_SHARED', 'row title', 'WARRANTY_TITLE_BOX header', [1, 1]),
    ],
  },
  {
    id: 'pdf-reveal', trigger: 'documento asociado', duration: 220, tracks: [
      T('pdfIn', 'G06', 'warranty-pdf', 1400, 220, 'M_REVEAL', 'y+12/op0 inside record', 'WARRANTY_PDF_ROW (960,635,654,92)', [0, 1]),
    ],
  },
]

/** Step 4 beats — ordered reintegration §17 (local ms, total 900). */
export const S4_BEATS: Beat[] = [
  {
    id: 'reintegrate', trigger: '“no porque la interfaz sea un problema”', duration: 750, tracks: [
      T('pdfOut', 'G07', 'warranty-pdf', 0, 150, 'M_EXIT', 'WARRANTY_PDF_ROW visible', 'retired inside doc region', [1, 0]),
      T('registryClose', 'G07', 'warranty-record', 100, 380, 'M_REFRAME', 'WARRANTY_EXPANDED', 'ASSET_WARRANTY_ROW compact', [1, 1], 'vertical collapse clip'),
      T('detailDock', 'G07', 'asset-identity', 350, 250, 'M_REFRAME', 'ficha completa', 'compacted, identity preserved', [1, 0]),
      T('homeIn', 'G07', 'home-clean', 500, 250, 'M_REFRAME', 'assets exiting', 'HOME full exposure, still', [0, 1]),
    ],
  },
]

export const STEP_BEATS: Record<number, Beat[]> = { 2: S2_BEATS, 3: S3_BEATS, 4: S4_BEATS }

/* ------------------------------------------------------------------ */
/* Snapshot: the full visual state of a step at local time t.          */
/* Every field is a 0..1 progress (eased) unless noted. Rendering is a */
/* pure function of the snapshot: same t => same frame (§24.2).       */
/* ------------------------------------------------------------------ */

export type StepSnapshot = {
  t: number
  settled: boolean
  surfaceIn: number
  secondaryDim: number
  homeOut: number
  plannerIn: number
  plusPulse: number
  listDim: number
  previewIn: number
  morph: number
  titleShared: number
  metaSplit: number
  fieldsIn: number
  ctaIn: number
  pickerOpen: number
  dateIsManana: boolean
  formOut: number
  assetsIn: number
  psFocus: number
  psMorph: number
  warrantyExpand: number
  pdfIn: number
  reintegrate: number
  surfaceOut: number
  questionIn: number
}

function plusPulseAt(t: number): number {
  // Triangle 260→420, peak 340: glyph scale 1→1.08→1 (§7.6).
  if (t <= 260 || t >= 420) return 0
  if (t <= 340) return applyEasing('M_SHARED', (t - 260) / 80)
  return 1 - applyEasing('M_SHARED', (t - 340) / 80)
}

export function sampleStep(step: number, tMs: number): StepSnapshot {
  const dur = STEP_DURATION[step] ?? 500
  const t = Math.min(Math.max(0, tMs), dur)
  const settled = tMs >= dur
  const snap: StepSnapshot = {
    t,
    settled,
    surfaceIn: 0,
    secondaryDim: 0,
    homeOut: 0,
    plannerIn: 0,
    plusPulse: 0,
    listDim: 0,
    previewIn: 0,
    morph: 0,
    titleShared: 0,
    metaSplit: 0,
    fieldsIn: 0,
    ctaIn: 0,
    pickerOpen: 0,
    dateIsManana: false,
    formOut: 0,
    assetsIn: 0,
    psFocus: 0,
    psMorph: 0,
    warrantyExpand: 0,
    pdfIn: 0,
    reintegrate: 0,
    surfaceOut: 0,
    questionIn: 0,
  }
  switch (step) {
    case 0:
      snap.surfaceIn = win(t, 0, 300, 'M_REFRAME')
      break
    case 1:
      snap.surfaceIn = 1
      snap.secondaryDim = win(t, 0, 340, 'M_REFRAME')
      break
    case 2:
      snap.surfaceIn = 1
      snap.homeOut = win(t, 0, 380, 'M_REFRAME')
      snap.plannerIn = win(t, 0, 380, 'M_REFRAME')
      snap.plusPulse = plusPulseAt(t)
      snap.listDim = win(t, 350, 120, 'M_REVEAL')
      snap.previewIn = win(t, 350, 310, 'M_REVEAL')
      snap.morph = win(t, 700, 560, 'M_REVEAL')
      snap.titleShared = win(t, 760, 440, 'M_SHARED')
      snap.metaSplit = win(t, 850, 300, 'M_REVEAL')
      snap.fieldsIn = win(t, 950, 250, 'M_REVEAL')
      snap.ctaIn = win(t, 1150, 200, 'M_REVEAL')
      snap.pickerOpen = win(t, 1210, 180, 'M_REVEAL') * (1 - win(t, 1560, 120, 'M_REVEAL'))
      snap.dateIsManana = t >= 1500
      break
    case 3:
      snap.surfaceIn = 1
      snap.formOut = win(t, 0, 350, 'M_EXIT')
      snap.assetsIn = win(t, 100, 280, 'M_REFRAME')
      snap.psFocus = win(t, 300, 240, 'M_REFRAME')
      snap.psMorph = win(t, 500, 600, 'M_REVEAL')
      snap.warrantyExpand = win(t, 1030, 470, 'M_REVEAL')
      snap.pdfIn = win(t, 1400, 220, 'M_REVEAL')
      break
    case 4:
      snap.surfaceIn = 1
      snap.reintegrate = win(t, 0, 750, 'M_REFRAME')
      break
    case 5:
      snap.surfaceIn = 1
      snap.surfaceOut = win(t, 0, 470, 'M_REFRAME')
      break
    case 6:
      snap.questionIn = win(t, 0, 420, 'M_REFRAME')
      break
    default:
      break
  }
  return snap
}

/** Parse the `s14t` freeze param (ms). Null = play timelines normally. */
export function freezeTimeParam(): number | null {
  if (typeof window === 'undefined') return null
  const raw = new URLSearchParams(window.location.search).get('s14t')
  if (raw === null) return null
  const ms = Number(raw)
  return Number.isFinite(ms) && ms >= 0 ? ms : 0
}

export function stepDuration(step: number): number {
  return STEP_DURATION[step] ?? 500
}
