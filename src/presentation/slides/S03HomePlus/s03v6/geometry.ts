// S03 V6 — geometría maestra (lienzo 1920×1080, origen arriba-izquierda).
// Todas las medidas en píxeles del lienzo maestro (§1.1). Centros (cx,cy),
// cajas (left,top,width,height). Conversiones desde el branding 1280×720:
// factor ×1.5 (misma proporción 16:9, letterbox idéntico).

export const CANVAS = { w: 1920, h: 1080, cx: 960, cy: 540 } as const
export const SAFE = { x0: 128, x1: 1792, y0: 90, y1: 970 } as const

// --- Paleta ------------------------------------------------------------------
export const INK_BG = '#080504' // fondo editorial (heredado del portal)
export const ORANGE = '#E25F27' // naranja HomePlus (medido del asset)
export const TYPE_WHITE = '#FAFAFA' // blanco cálido
export const TYPE_GRAY = '#9A9A9E' // gris de categorías
export const MONO_DARK = '#2E2B29' // grafito oscuro (monograma J)
export const JULI_SKIN = '#E4B49D' // durazno desaturado
export const COLOR_B = '#B3AFC5' // lavanda grisáceo desaturado
export const COLOR_C = '#A3B1BE' // azul grisáceo desaturado
export const HOME_SURFACE = '#F6F5F2' // superficie real de S04 (homeTokens)
export const S04_BG = '#FDFCFC' // fondo real de S04.0 (cine step 8, stagebg white)

// --- Duraciones por step (ms) -------------------------------------------------
export const STEP_MS = [900, 760, 900, 870, 1230, 1030, 1250, 2200, 1600, 1100] as const

// --- brand.lockup (§2.1) ------------------------------------------------------
// Caja de alineación objetivo (835,82,250,66), centro X=960.
export const LOCKUP_BOX = { x: 835, y: 82, w: 250, h: 66 } as const
// Proporción interna del componente original (stage 1280×720) convertida a
// maestro ×1.5: isotipo 60→90, gap 22→33, wordmark 36→54 (tracking -0.54→-0.81).
export const LOCKUP_CANON = { iso: 90, gap: 33, wordSize: 54, wordBaseline: 63.9, tracking: -0.81 } as const

// --- heading.life (§2.2) -------------------------------------------------------
export const HEADING_FULL = { x: 420, y: 302, w: 1080, h: 110, size: 84, tracking: -1.4 } as const
export const HEADING_COMPACT = { x: 150, y: 218, w: 470, h: 44, size: 28, tracking: -0.3 } as const

// --- person.juli (§2.3) -------------------------------------------------------
export const JULI = { cx: 336, cy: 426, dRef: 24, dAvatar: 112, monoSize: 58 } as const

// --- label.person + name.juli (§2.4) ------------------------------------------
export const LABEL_PERSONAS = { x: 430, y: 355, w: 250, h: 32, size: 22, tracking: 1.6 } as const
export const NAME_JULI = { x: 428, y: 400, w: 300, h: 74, size: 60 } as const

// --- context.pe (§2.5) ---------------------------------------------------------
export const CONTEXT_PE = { x: 770, y: 500, w: 460, h: 140 } as const
export const LABEL_CONTEXT = { x: 792, y: 514, w: 260, h: 30, size: 22, opacity: 0.78 } as const
export const TITLE_PE = { x: 788, y: 558, w: 430, h: 68, size: 52, minSize: 48 } as const
export const ACCENT_CONTEXT = { x: 792, y: 638, w: 70, h: 3, opacity: 0.6 } as const
export const HALO_CONTEXT = { cx: 982, cy: 576, r: 180, max: 0.1 } as const

// --- time.tomorrow (§2.6) ------------------------------------------------------
export const LABEL_MOMENTOS = { x: 1398, y: 352, w: 280, h: 32, size: 22, tracking: 1.6 } as const
export const VALUE_MOMENTO = { x: 1398, y: 394, w: 300, h: 74, size: 58 } as const
export const ACCENT_TIME = { x: 1400, y: 480, w: 76, h: 3, opacity: 0.65 } as const

// --- action.authorization (§2.7) ----------------------------------------------
export const INDICATOR_ACTION = { cx: 1340, cy: 770, d: 13 } as const
export const LABEL_RESP = { x: 1368, y: 709, w: 375, h: 31, size: 22, tracking: 1.6 } as const
export const ACTION_TEXT = { x: 1368, y: 748, w: 405, h: 54, size: 35, minSize: 32 } as const

// --- info.school (§2.8) --------------------------------------------------------
export const GLYPH_INFO = { x: 306, y: 730, w: 48, h: 60, stroke: 2, radius: 4, fold: 11 } as const
export const LABEL_INFO = { x: 378, y: 709, w: 280, h: 31, size: 22, tracking: 1.6 } as const
export const DATA_INFO = { x: 378, y: 750, w: 360, h: 54, size: 36 } as const

// --- threads (§2.9) -----------------------------------------------------------
export const THREAD_STYLE = { stroke: 2.5, opacity: 0.55, active: 0.88 } as const
export const THREAD_JULI = { p0: [336, 482], p1: [336, 528], p2: [633, 544], p3: [770, 566] } as const
export const THREAD_TIME = { p0: [1222, 558], p1: [1295, 552], p2: [1300, 453], p3: [1390, 453] } as const
export const THREAD_ACTION = { p0: [1206, 632], p1: [1272, 651], p2: [1274, 770], p3: [1316, 770] } as const
export const THREAD_INFO = { p0: [741, 790], p1: [754, 755], p2: [742, 669], p3: [770, 626] } as const

// --- contextos secundarios (§2.10) --------------------------------------------
export const CONTEXT_SHOPPING = { cx: 1070, cy: 425, glyph: 52, size: 39, accentW: 140, accentH: 2 } as const
export const CONTEXT_ENCOUNTER = { cx: 1510, cy: 635, glyph: 52, size: 39, accentW: 140, accentH: 2 } as const

// --- avatares secundarios (§2.11) ---------------------------------------------
export const MEMBER_AVATAR = { d: 96, headR: 23, headDy: -11 } as const
export const MEMBER_B = { cx: 960, cy: 785 } as const
export const MEMBER_C = { cx: 1530, cy: 785 } as const

// --- referencia común del hogar (§2.12) ---------------------------------------
export const HOME_CURVE = { p0: [390, 882], p1: [960, 924], p2: [1530, 882] } as const
export const HOME_LABEL = { x: 755, y: 934, w: 410, h: 30, size: 22, tracking: 1.4, opacity: 0.78 } as const

// --- títulos finales (§2.13) --------------------------------------------------
export const TITLE_AUTONOMY = { x: 670, y: 205, w: 580, h: 82, size: 62 } as const
export const TITLE_SHARED = { x: 495, y: 205, w: 930, h: 96, size: 72 } as const

// --- isotipo final (§2.14) ----------------------------------------------------
// Caja final del primer cuadro autoritativo de la transición existente:
// centerBox (541,261,198) del step 9/10 original ×1.5.
export const ISOTYPE_BOX = { x: 811.5, y: 391.5, w: 297 } as const
// Cabeza principal (disco blanco) en coords PNG 1254² — foco del zoom final.
export const HEAD_MAIN_PNG = { cx: 554, cy: 642, r: 76.5, whiteR: 74 } as const
export const PNG_BBOX = { x0: 104, y0: 109, x1: 1149, y1: 1144 } as const

// --- grupo juliContext (§8.2) -------------------------------------------------
export const GROUP_PIVOT_O = { x: 960, y: 565 } as const
export const GROUP_PIVOT_D = { x: 480, y: 465 } as const
export const GROUP_SCALE_END = 0.38

// --- step 7: extracción de Juli (§9.4) ----------------------------------------
export const JULI_EXTRACT = {
  from: { x: 242.88, y: 412.18, d: 42.56 },
  to: { x: 390, y: 785, d: 96 },
  p0: [242.88, 412.18], p1: [242.88, 550], p2: [390, 650], p3: [390, 785],
} as const

// --- step 7: conexiones individuales (§9.8) -----------------------------------
export const CONNECTOR_TOP_Y = 737 as const
export const CONNECTOR_BOTTOM_Y = 542 as const

// --- step 8: señal de participación (§10.4) ------------------------------------
export const SIGNAL = { d: 7 } as const

// --- step 10: zoom final (§12.4) ----------------------------------------------
export const ZOOM = { ms: 1100, margin: 1.08, maxBlur: 2.2, revealMs: 120 } as const
