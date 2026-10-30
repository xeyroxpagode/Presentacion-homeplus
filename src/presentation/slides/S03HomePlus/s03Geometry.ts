// S03 — geometría auténtica del isotipo + poses de composición (stage 1280×720).
// Medidas PNG (1254×1254) verificadas por scripts/extract-s03-logo.mjs contra
// el asset oficial assets/07a9c99e-dd9f-4b8b-a7dc-2453e6935ca2.png.
// Conversión maestro→stage: el archivo de diseño usa 1920×1080;
// stage = master × 2/3 (los valores ya están convertidos abajo).

export const PNG = { w: 1254, h: 1254 } as const
export const PNG_BBOX = { x0: 104, y0: 109, x1: 1149, y1: 1144 } as const
export const PNG_CX = (PNG_BBOX.x0 + PNG_BBOX.x1) / 2 // 626.5
export const PNG_CY = (PNG_BBOX.y0 + PNG_BBOX.y1) / 2 // 626.5

// «+»: componente conexa verificada (flood fill), centro y semiejes.
export const PLUS_PNG = { cx: 914.5, cy: 366.5, x0: 826, y0: 277, x1: 1003, y1: 456 } as const
// Cabeza principal (disco sólido mayor, fill 0.786): foco del zoom final.
export const HEAD_MAIN_PNG = { cx: 554, cy: 642, r: 76.5 } as const
// Cabeza secundaria (disco sólido, fill 0.792).
export const HEAD_SECOND_PNG = { cx: 740, cy: 731.5, r: 60.5 } as const

export const ORANGE_HEX = '#E25F27' // mediana medida del asset (226,95,39)
export const WHITE_HEX = '#FDFDFD' // blanco real del logo (253,253,253)
export const INK_BG = '#080504' // fondo editorial del portal heredado
export const TYPE_WHITE = '#FAFAFA'
export const TYPE_SECONDARY = '#A5A5A5'
export const HOME_SURFACE = '#F6F5F2' // homeTokens.colors.canvas

export type IsotipoPlacement = { imgLeft: number; imgTop: number; imgSize: number; k: number }

/** Coloca la imagen cuadrada 1254² de modo que su bbox oficial ocupe
 *  (x, y, w) — alto proporcional (1036/1046). Todas las capas usan el mismo
 *  placement: registro exacto por construcción. */
export function placeIsotipo(x: number, y: number, w: number): IsotipoPlacement {
  const k = w / (PNG_BBOX.x1 - PNG_BBOX.x0)
  const imgSize = PNG.w * k
  return { imgLeft: x - PNG_BBOX.x0 * k, imgTop: y - PNG_BBOX.y0 * k, imgSize, k }
}

/** Punto PNG → stage según placement. */
export function pngToStage(p: IsotipoPlacement, px: number, py: number): { x: number; y: number } {
  return { x: p.imgLeft + px * p.k, y: p.imgTop + py * p.k }
}

// --- Poses del ACTO I ---------------------------------------------------------
export const POSE_ISO_CENTER = { x: 541, y: 261, w: 198 } // S03.0 nacimiento
export const POSE_ISO_LOCKUP = { x: 287, y: 263, w: 193 } // S03.0 lockup final
export const WORDMARK = {
  startX: 504, centerY: 360, size: 100, gapMin: 20, gapMax: 28,
} as const
// Firma superior S03.1: centro (640,117), isotipo 60, wordmark 36.
export const SIGNATURE_TOP = { cx: 640, cy: 117, iso: 60, wordSize: 36 } as const

// --- ACTO II: conceptos ---------------------------------------------------------
export type ConceptId = 'personas' | 'momentos' | 'responsabilidades' | 'informacion'
export const CONCEPTS: ReadonlyArray<{ id: ConceptId; label: string; heroSize: number }> = [
  { id: 'personas', label: 'Personas', heroSize: 88 },
  { id: 'momentos', label: 'Momentos', heroSize: 85 },
  { id: 'responsabilidades', label: 'Responsabilidades', heroSize: 71 },
  { id: 'informacion', label: 'Información', heroSize: 86 },
]
export const HERO_CENTER = { x: 640, y: 390 } as const
export const HERO_LINE = { w: 64, h: 3 } as const
// Slots editoriales finales (left/top/size).
export const CONCEPT_SLOTS: Record<ConceptId, { x: number; y: number; size: number }> = {
  personas: { x: 173, y: 247, size: 43 },
  momentos: { x: 780, y: 247, size: 43 },
  responsabilidades: { x: 173, y: 460, size: 40 },
  informacion: { x: 780, y: 460, size: 43 },
}
export const SLOT_LINE = { w: 64, h: 2.7, gap: 16 } as const

// --- Trazo auténtico del isotipo ------------------------------------------------
// Línea central del trazo blanco continuo (coords PNG 1254²), derivada por
// medición directa de la capa blanca oficial (runs por columna/fila):
// punta del alero derecho → techo (ápice 627,353) → alero izquierdo → muro →
// U inferior → arco grande → valle → arco pequeño → remate derecho.
// Las dos cabezas son discos sólidos revelados de forma localizada.
// La máscara de dibujo recorre ESTA geometría y revela exclusivamente
// píxeles blancos del PNG original: wipe vertical prohibido.
export const MAIN_STROKE_D = [
  'M 948,672',
  'C 930,630 915,595 900,560',
  'C 870,535 835,505 800,477',
  'C 765,450 732,422 700,395',
  'C 675,375 650,362 627,353',
  'C 600,365 560,390 500,440',
  'C 465,465 432,492 400,520',
  'C 365,552 332,595 300,638',
  'C 312,665 322,690 334,720',
  'L 334,880',
  'C 340,930 352,950 375,950',
  'C 398,950 425,925 430,890',
  'L 440,830',
  'C 445,800 480,775 550,771',
  'C 605,775 630,820 645,870',
  'C 655,905 658,925 665,940',
  'C 675,915 685,880 700,858',
  'C 720,852 745,852 770,855',
  'C 795,860 810,880 818,910',
  'C 821,925 823,938 823,948',
].join(' ')
export const MAIN_STROKE_W = 84 // cubre el trazo real (~52px) con tolerancia

// --- ACTO III: autonomía (concentración → apertura distribuida) --------------
// Sin personajes ni textos nuevos: sólo los cuatro conceptos reutilizados.
// S03.6 columna central compacta; S03.7 composición radial abierta;
// S03.8 activa una línea naranja bajo cada palabra (stagger 110ms).
export const COLUMN_CENTERS_Y = [255, 325, 395, 465] as const
export const COLUMN_ITEM_SIZE = 32 as const
export const AXIS_LINE = { w: 64, h: 3, y: 520 } as const
export const RADIAL: Record<ConceptId, { cx: number; cy: number; size: number }> = {
  personas: { cx: 640, cy: 210, size: 50 },
  momentos: { cx: 270, cy: 385, size: 47 },
  responsabilidades: { cx: 1010, cy: 385, size: 38 },
  informacion: { cx: 640, cy: 550, size: 48 },
}
export const RADIAL_LINE = { w: 48, h: 3, gap: 14 } as const
export const RADIAL_LINE_STAGGER = 110 // ms entre activaciones (S03.8)

// --- Zoom final ----------------------------------------------------------------
// Escala mínima que garantiza cobertura total desde el círculo focal:
// max(dist(foco, esquinas)) / radio × margen 1.07.
export function zoomCoverScale(focusX: number, focusY: number, radius: number, margin = 1.07): number {
  const corners = [[0, 0], [1280, 0], [0, 720], [1280, 720]] as const
  let max = 0
  for (const [cx, cy] of corners) {
    const d = Math.hypot(focusX - cx, focusY - cy)
    if (d > max) max = d
  }
  return (max / radius) * margin
}

/** Cobertura en px del stage para un círculo dado (verificación QA). */
export function circleCoversStage(
  focusX: number, focusY: number, radius: number, scale: number,
): { covers: boolean; margins: number[] } {
  const corners = [[0, 0], [1280, 0], [0, 720], [1280, 720]] as const
  const margins = corners.map(([cx, cy]) => radius * scale - Math.hypot(focusX - cx, focusY - cy))
  return { covers: margins.every(m => m > 0), margins }
}
