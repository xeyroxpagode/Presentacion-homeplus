/**
 * S14 Friction Editorial V6.0 — master geometry system.
 *
 * Master canvas: 1920 x 1080, origin (0,0) top-left, center (960,540).
 * Runtime canvas: 1280 x 720. Single authorized conversion:
 *   runtime = master * 2/3.
 * Unitless scales pass through unchanged. Exactly ONE strategy is used:
 * children of the editorial stage declare runtime px via mx()/toRuntimeStyle
 * and must NOT re-apply the factor internally (§4.2).
 *
 * No PhoneFrame geometry lives in this file. No V5 phone/camera rects are
 * carried over: every TARGET below comes verbatim from the V6.0 contract
 * (§§4/7–16/20). Provenance per rect is noted where the contract fixes it.
 */

export const MASTER = { width: 1920, height: 1080, cx: 960, cy: 540 } as const
export const RUNTIME = { width: 1280, height: 720 } as const
export const MASTER_TO_RUNTIME = 2 / 3

/** Master px -> runtime px. The single authorized conversion (§4.2). */
export const mx = (v: number): number => v * MASTER_TO_RUNTIME

export type MasterRect = { x: number; y: number; w: number; h: number }

/** Master rect -> runtime CSS geometry (left/top/width/height). */
export function toRuntimeStyle(rect: MasterRect): {
  left: number
  top: number
  width: number
  height: number
} {
  return { left: mx(rect.x), top: mx(rect.y), width: mx(rect.w), height: mx(rect.h) }
}

/* ---------------- Lienzo principal (§4.3) ---------------- */

export const EDITORIAL_SURFACE: MasterRect = { x: 216, y: 150, w: 1488, h: 780 }
export const EDITORIAL_CONTENT: MasterRect = { x: 268, y: 202, w: 1384, h: 676 }
export const SURFACE_CENTER = { x: 960, y: 540 } as const

/* ---------------- P01 Planner horizontal (§7.1) ---------------- */

export const PLANNER_TITLE: MasterRect = { x: 280, y: 208, w: 490, h: 58 }
export const PLANNER_PLUS: MasterRect = { x: 1564, y: 206, w: 76, h: 76 }
export const PLANNER_GROUP_LABEL: MasterRect = { x: 282, y: 302, w: 180, h: 28 }
export const PLANNER_ROW_1: MasterRect = { x: 280, y: 350, w: 1360, h: 96 }
export const PLANNER_ROW_2: MasterRect = { x: 280, y: 462, w: 1360, h: 96 }

/* ---------------- Previsualización de intención (§8.3) ---------------- */

export const INTENT_ROW: MasterRect = { x: 320, y: 410, w: 1280, h: 116 }
export const INTENT_TITLE: MasterRect = { x: 364, y: 428, w: 980, h: 55 }
export const INTENT_META: MasterRect = { x: 364, y: 484, w: 950, h: 30 }

/* ---------------- Formulario editorial (§9.2) ---------------- */

export const FORM_HEADER: MasterRect = { x: 280, y: 208, w: 580, h: 56 }
export const FORM_TITLE_FIELD: MasterRect = { x: 280, y: 329, w: 1360, h: 108 }
export const FORM_DATE: MasterRect = { x: 280, y: 500, w: 420, h: 116 }
export const FORM_ASSIGNEE: MasterRect = { x: 750, y: 500, w: 420, h: 116 }
export const FORM_TIME: MasterRect = { x: 1220, y: 500, w: 420, h: 116 }
export const FORM_PICKER: MasterRect = { x: 280, y: 624, w: 420, h: 188 }
export const FORM_CTA: MasterRect = { x: 1220, y: 758, w: 420, h: 80 }

/** Destino de la caja de texto del título dentro del input (§10.4). */
export const FORM_TITLE_TEXT: MasterRect = { x: 312, y: 359, w: 1296, h: 50 }

/* ---------------- P03 Activos horizontal (§13.1) ---------------- */

export const ASSETS_TITLE: MasterRect = { x: 280, y: 208, w: 520, h: 58 }
export const ASSETS_LABEL: MasterRect = { x: 282, y: 306, w: 220, h: 28 }
export const ASSETS_ROW_1: MasterRect = { x: 280, y: 350, w: 1360, h: 100 }
export const ASSETS_PS5_ROW: MasterRect = { x: 280, y: 470, w: 1360, h: 100 }
export const ASSETS_ROW_3: MasterRect = { x: 280, y: 590, w: 1360, h: 100 }

/* ---------------- P04 Ficha PlayStation (§14.2) ---------------- */

export const ASSET_IDENTITY_REGION: MasterRect = { x: 280, y: 310, w: 600, h: 450 }
export const ASSET_DOCUMENTS_REGION: MasterRect = { x: 932, y: 310, w: 708, h: 460 }
export const ASSET_AVATAR: MasterRect = { x: 292, y: 330, w: 76, h: 76 }
export const ASSET_TITLE_BOX: MasterRect = { x: 390, y: 330, w: 470, h: 58 }
export const ASSET_SUB_BOX: MasterRect = { x: 390, y: 389, w: 400, h: 34 }
export const ASSET_DIVIDER: MasterRect = { x: 292, y: 458, w: 560, h: 1 }
export const ASSET_CONTEXT: MasterRect = { x: 304, y: 490, w: 540, h: 200 }
export const ASSET_DOCS_LABEL: MasterRect = { x: 948, y: 319, w: 660, h: 34 }
export const ASSET_WARRANTY_ROW: MasterRect = { x: 940, y: 382, w: 700, h: 120 }
export const ASSET_INVOICE_ROW: MasterRect = { x: 940, y: 520, w: 700, h: 100 }

/* ---------------- Garantía expandida (§15.2–15.3) ---------------- */

export const WARRANTY_EXPANDED: MasterRect = { x: 924, y: 350, w: 726, h: 450 }
export const WARRANTY_ICON: MasterRect = { x: 960, y: 382, w: 38, h: 38 }
export const WARRANTY_TITLE_BOX: MasterRect = { x: 1012, y: 376, w: 592, h: 46 }
export const WARRANTY_DIVIDER: MasterRect = { x: 960, y: 448, w: 654, h: 1 }
export const WARRANTY_TYPE: MasterRect = { x: 960, y: 480, w: 280, h: 74 }
export const WARRANTY_UNTIL: MasterRect = { x: 1270, y: 480, w: 334, h: 74 }
export const WARRANTY_DOC_LABEL: MasterRect = { x: 960, y: 589, w: 550, h: 30 }
export const WARRANTY_PDF_ROW: MasterRect = { x: 960, y: 635, w: 654, h: 92 }

/* ---------------- Pregunta final (§20.1) ---------------- */

export const QUESTION_BOX: MasterRect = { x: 250, y: 332, w: 1420, h: 416 }

/* ---------------- Tipografías master (§§7.2/9.3/13.2/15.4/20.2) ----------------
 * Valores en px master; convertir con mx() en el punto de uso. */

export const TYPE = {
  plannerTitle: 42,
  plannerGroup: 20,
  plannerRowTitle: 30,
  plannerRowMeta: 21,
  plusGlyph: 32,
  intentTitle: 34,
  intentMeta: 22,
  formHeader: 40,
  formTitleInput: 34,
  formLabel: 20,
  formValue: 29,
  formChevron: 24,
  formCta: 28,
  assetsTitle: 42,
  assetName: 30,
  assetMeta: 21,
  assetAvatar: 62,
  assetIcon: 30,
  assetChevron: 24,
  detailTitle: 42,
  warrantyTitle: 30,
  warrantyLabel: 20,
  warrantyValue: 26,
  warrantyDocLabel: 19,
  warrantyPdfName: 29,
  warrantyPdfMeta: 20,
  homeTitle: 40,
  question: 82,
} as const

/* ---------------- Paleta (§4.5 — verificada contra censo Figma) ---------------- */

export const PALETTE = {
  BRAND: '#E7643F',
  BRAND_PRESSED: '#C94F2E',
  BRAND_SOFT: '#FFE3DA',
  BG: '#FCFBF9',
  SURFACE: '#FFFFFF',
  ELEVATED: '#F4F0EB',
  INK: '#1A1714',
  INK_SECONDARY: '#4A4540',
  INK_MUTED: '#6B6560',
  BORDER: '#DED5CB',
  BORDER_SOFT: '#EEE7E0',
  STAGE: '#0B0908',
} as const

/* ---------------- Movimiento (§5) ---------------- */

export const EASING = {
  M_REFRAME: 'cubic-bezier(.22,.61,.36,1)',
  M_SHARED: 'cubic-bezier(.22,1,.36,1)',
  M_REVEAL: 'cubic-bezier(.16,1,.3,1)',
  M_EXIT: 'cubic-bezier(.55,0,1,.45)',
} as const

export type EasingName = keyof typeof EASING

/* ---------------- Estados narrativos (§22) ---------------- */

export const S14_STATES = [
  'HOME_RECEIVED',
  'FRICTION_FOCUS',
  'PLANNER_AND_FORM',
  'ASSETS_AND_WARRANTY',
  'HOME_CLEAN',
  'EMPTY_STAGE',
  'FINAL_QUESTION',
] as const

export type S14State = (typeof S14_STATES)[number]

/**
 * Duración TARGET del timeline local de cada paso (§21.1). Los holds son
 * manuales y no forman parte de esta duración: al agotarse, la escena queda
 * inmóvil en su estado terminal hasta el avance del expositor.
 */
export const STEP_DURATION: Record<number, number> = {
  0: 500,
  1: 500,
  2: 2300,
  3: 2100,
  4: 900,
  5: 600,
  6: 600,
}
