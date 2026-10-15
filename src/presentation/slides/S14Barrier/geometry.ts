/**
 * S14 Friction — master geometry system (V5.0 contract, §2).
 *
 * Master canvas: 1920 x 1080, origin (0,0) top-left, center (960,540).
 * Runtime canvas: 1280 x 720. Centralized conversion (no mixed units):
 *   runtimeX = masterX * 2/3, runtimeY = masterY * 2/3.
 * Scales are unitless and pass through unchanged.
 */

export const MASTER = { width: 1920, height: 1080, cx: 960, cy: 540 } as const
export const RUNTIME = { width: 1280, height: 720 } as const
export const MASTER_TO_RUNTIME = 2 / 3

/** Master px -> runtime px. The single authorized conversion. */
export const mx = (v: number): number => v * MASTER_TO_RUNTIME

export type MasterRect = { x: number; y: number; w: number; h: number }

/** Master rect -> runtime CSS geometry. */
export function toRuntimeStyle(rect: MasterRect): { left: number; top: number; width: number; height: number } {
  return { left: mx(rect.x), top: mx(rect.y), width: mx(rect.w), height: mx(rect.h) }
}

/** Canonical S14 TARGET rects (§2.2), master px. */
export const TARGETS = {
  PHONE_CENTER: { x: 765, y: 118, w: 390, h: 844 },
  PHONE_CONTEXT: { x: 180, y: 196, w: 312, h: 675.2 },
  PHONE_ATTENUATED: { x: 772.8, y: 134.88, w: 374.4, h: 810.24 },
  /** Native row height 63 x 2.6 = 163.8 master. */
  TASK_HERO_ROW: { x: 650, y: 394, w: 962, h: 163.8 },
  TASK_CAMERA: { x: 670, y: 145, w: 970, h: 790 },
  ASSETS_CAMERA: { x: 645, y: 150, w: 1030, h: 780 },
  PS5_HERO_ROW: { x: 675, y: 406, w: 918.4, h: 179.2 },
  WARRANTY_HERO_ROW: { x: 650, y: 406, w: 902, h: 209 },
  PDF_HERO_ROW: { x: 664, y: 400, w: 984, h: 180 },
  QUESTION_REGION: { x: 240, y: 328, w: 1440, h: 424 },
} as const satisfies Record<string, MasterRect>

/** Native stage widths chosen so TARGET = native x scale exactly (§7.6, §12, §15, §17). */
export const NATIVE = {
  /** 370 x 2.6 = 962 (TASK_HERO_ROW.w). Row native height 63 -> 163.8. */
  taskRowWidth: 370,
  taskRowHeight: 63,
  taskScale: 2.6,
  /** 328 x 2.8 = 918.4, h 64 x 2.8 = 179.2 (PS5_HERO_ROW). */
  ps5RowWidth: 328,
  ps5RowHeight: 64,
  ps5Scale: 2.8,
  /** 328 x 2.75 = 902, h 76 x 2.75 = 209 (WARRANTY_HERO_ROW). */
  warrantyRowWidth: 328,
  warrantyRowHeight: 76,
  warrantyScale: 2.75,
  /** 328 x 3 = 984, h 60 x 3 = 180 (PDF_HERO_ROW). */
  pdfRowWidth: 328,
  pdfRowHeight: 60,
  pdfScale: 3,
  /** 370 x 2.4 = 888 sheet inside TASK_CAMERA viewport. */
  sheetWidth: 370,
  sheetScale: 2.4,
  /** Sheet stage left inside TASK_CAMERA: X 711 master. */
  sheetStageX: 711,
} as const

/** Editorial camera positions P (master px, §8.4 TARGET). */
export const FORM_CAM = { TOP: 0, DATE: 560, FOOTER: 883.2 } as const

/** Motion easings (§3). */
export const EASING = {
  HERO: 'cubic-bezier(.16,1,.3,1)',
  SHARED: 'cubic-bezier(.22,1,.36,1)',
  CAMERA: 'cubic-bezier(.25,.46,.45,.94)',
  EXIT: 'cubic-bezier(.55,0,1,.45)',
  CONCEPT: 'cubic-bezier(.22,.61,.36,1)',
} as const

/** Native product timings (ms, §3.1) — editorial effects coordinate with these. */
export const NATIVE_TIMING = {
  press: 110,
  inlinePickerOpen: 180,
  inlinePickerClose: 120,
  plannerSheetIn: 300,
  plannerSheetOut: 200,
  assetsSheetIn: 260,
  assetsSheetOut: 200,
  assetsNested: 200,
} as const

/** Narrative states (§4). stepIndex -> state id. */
export const S14_STATES = [
  'H00_HANDOFF',
  'H01_LAST_STEP',
  'H02_CREATE',
  'H03_H04_EXIT_AND_FIND',
  'H05_H06_REINTEGRATE',
  'H07_VOID',
  'H08_QUESTION',
] as const

export type S14State = (typeof S14_STATES)[number]

/** Total local timeline duration per step (ms) — each step plays fully then HOLD. */
export const STEP_DURATION: Record<number, number> = {
  0: 1000, // H00
  1: 480, // H01
  2: 3340, // H02
  3: 4630, // H03 (720) + H04 (3910)
  4: 1480, // H05+H06
  5: 900, // H07 (600 + 300 void hold head)
  6: 460, // H08 entry (then manual hold)
}
