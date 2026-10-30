// S03 V6 — timeline puro: computeScene(step, p) → SceneState.
// Toda la coreografía de los steps 1–10 derivada del contrato. Función
// determinista (QA: congela p y captura). Coordenadas en lienzo maestro
// 1920×1080. Cada propiedad respeta comienzo, final, valor inicial, valor
// final y orden de composición (§1.2).

import {
  CANVAS, INK_BG, ORANGE, TYPE_WHITE, TYPE_GRAY, MONO_DARK, JULI_SKIN,
  STEP_MS,
  LOCKUP_BOX, LOCKUP_CANON,
  HEADING_FULL, HEADING_COMPACT,
  JULI, LABEL_PERSONAS, NAME_JULI,
  CONTEXT_PE, LABEL_CONTEXT, TITLE_PE, ACCENT_CONTEXT, HALO_CONTEXT,
  LABEL_MOMENTOS, VALUE_MOMENTO, ACCENT_TIME,
  INDICATOR_ACTION, LABEL_RESP, ACTION_TEXT,
  GLYPH_INFO, LABEL_INFO, DATA_INFO,
  THREAD_STYLE, THREAD_JULI, THREAD_TIME, THREAD_ACTION, THREAD_INFO,
  CONTEXT_SHOPPING, CONTEXT_ENCOUNTER,
  MEMBER_AVATAR, MEMBER_B as MB, MEMBER_C as MC,
  HOME_CURVE, HOME_LABEL,
  TITLE_AUTONOMY, TITLE_SHARED,
  ISOTYPE_BOX, HEAD_MAIN_PNG, PNG_BBOX,
  GROUP_PIVOT_O, GROUP_PIVOT_D, GROUP_SCALE_END,
  JULI_EXTRACT, CONNECTOR_TOP_Y, CONNECTOR_BOTTOM_Y,
  SIGNAL, ZOOM,
} from './geometry'
import { E, lerp, seg, buildArcTable, arcPoint, arcParam, clamp01 } from './easing'
import { measureText } from './measure'
import { POSE_ISO_LOCKUP, WORDMARK } from '../s03Geometry'

// --- Tipos -------------------------------------------------------------------
export type TextSpec = {
  text: string
  /** Caja de composición: origen superior izquierdo (x,y) y tamaño (w,h). */
  x: number
  y: number
  w: number
  h: number
  size: number
  weight: number
  tracking: number
  color: string
  opacity: number
  blur: number
  align: 'left' | 'center'
  maskP: number
  visible: boolean
}

export type ThreadState = { drawP: number; opacity: number; dot: { x: number; y: number; opacity: number } | null }

export type SceneState = {
  step: number
  t: number
  lockup: LockPose & { opacity: number; visible: boolean }
  heading: TextSpec | null
  juli: { cx: number; cy: number; d: number; opacity: number; monoMaskP: number; glow: number; visible: boolean }
  personLabel: TextSpec | null
  juliName: TextSpec | null
  ctxPE: {
    label: TextSpec | null
    title: TextSpec | null
    accent: { x: number; y: number; w: number; opacity: number; visible: boolean }
    halo: number
    visible: boolean
  }
  time: {
    category: TextSpec | null
    value: TextSpec | null
    accent: { x: number; y: number; w: number; opacity: number; visible: boolean }
  }
  action: {
    indicator: { cx: number; cy: number; d: number; opacity: number; visible: boolean }
    category: TextSpec | null
    text: TextSpec | null
  }
  info: {
    glyph: { opacity: number; drawP: number; line1: number; line2: number; visible: boolean }
    category: TextSpec | null
    data: TextSpec | null
  }
  threads: { juli: ThreadState; time: ThreadState; action: ThreadState; info: ThreadState }
  group: { cx: number; cy: number; s: number } | null
  annotation: {
    x: number; y: number; opacity: number; juliPrefix: number; accentOpacity: number; visible: boolean
    title: TextSpec; prefix: TextSpec | null; moment: TextSpec
  }
  refs: {
    momento: { w: number; opacity: number; x: number; y: number }
    accion: { d: number; opacity: number; cx: number; cy: number }
    info: { drawP: number; opacity: number; cx: number; cy: number }
    contexto: { d: number; opacity: number; cx: number; cy: number }
  }
  signal: { x: number; y: number; opacity: number; d: number; visible: boolean }
  shopping: { cx: number; cy: number; opacity: number; glyphOpacity: number; glyphScale: number; textOpacity: number; accentP: number; blur: number; visible: boolean; text: TextSpec }
  encounter: { cx: number; cy: number; opacity: number; glyphOpacity: number; glyphScale: number; textOpacity: number; accentP: number; blur: number; visible: boolean; text: TextSpec }
  memberB: { cx: number; cy: number; d: number; opacity: number; inner: number; visible: boolean }
  memberC: { cx: number; cy: number; d: number; opacity: number; inner: number; visible: boolean }
  connectors: Array<{ d: string; drawP: number; opacity: number; visible: boolean }>
  home: { drawP: number; curveOpacity: number; label: TextSpec | null }
  titleAutonomy: TextSpec | null
  titleShared: TextSpec | null
  isotipo: { x: number; y: number; s: number; opacity: number; blur: number; visible: boolean }
  zoom: { tx: number; ty: number; s: number } | null
  veil: number
}

// --- Helpers -----------------------------------------------------------------
const W600 = 600
const W500 = 500
const W400 = 400

type Box = { x: number; y: number; w: number; h: number }

/** Caja tipográfica: (x,y) es el origen superior (§1.1). */
function txt(
  text: string, box: Box, size: number, weight: number, tracking: number,
  color: string, opacity: number, blur: number, align: 'left' | 'center', maskP: number,
): TextSpec {
  return {
    text, x: box.x, y: box.y, w: box.w, h: box.h,
    size, weight, tracking, color, opacity, blur, align, maskP,
    visible: opacity > 0.001,
  }
}

/** Caja virtual centrada en cx con una línea base objetivo. */
function centeredBox(text: string, size: number, weight: number, tracking: number, cx: number, baseline: number): Box {
  const m = measureText(text, size, weight, tracking)
  const h = size * 1.25
  return {
    x: cx - m.width / 2,
    y: baseline - (h - (m.ascent + m.descent)) / 2 - m.ascent,
    w: m.width,
    h,
  }
}

/** Caja virtual alineada a la izquierda con una línea base objetivo. */
function leftBox(text: string, size: number, weight: number, tracking: number, x: number, baseline: number): Box {
  const m = measureText(text, size, weight, tracking)
  const h = size * 1.25
  return {
    x,
    y: baseline - (h - (m.ascent + m.descent)) / 2 - m.ascent,
    w: m.width,
    h,
  }
}

function thread(drawP: number, opacity: number, dot: ThreadState['dot'] = null): ThreadState {
  return { drawP, opacity, dot }
}

// --- Lockup: dos poses canónicas ---------------------------------------------
export type LockPose = {
  iso: { x: number; y: number; w: number }
  word: { x: number; baselineY: number; size: number; tracking: number }
}

/** Lockup canónico: el componente original escalado uniformemente para
 *  encajar en la caja objetivo (835,82,250,66). Centro horizontal X=960. */
function lockupTarget(): LockPose {
  const wordW = measureText('HomePlus', LOCKUP_CANON.wordSize, W600, LOCKUP_CANON.tracking).width
  const localW = LOCKUP_CANON.iso + LOCKUP_CANON.gap + wordW
  const s = Math.min(LOCKUP_BOX.w / localW, LOCKUP_BOX.h / LOCKUP_CANON.iso)
  const iso = {
    x: LOCKUP_BOX.x + (LOCKUP_BOX.w - localW * s) / 2,
    y: LOCKUP_BOX.y + (LOCKUP_BOX.h - LOCKUP_CANON.iso * s) / 2,
    w: LOCKUP_CANON.iso * s,
  }
  return {
    iso,
    word: {
      x: iso.x + (LOCKUP_CANON.iso + LOCKUP_CANON.gap) * s,
      baselineY: iso.y + LOCKUP_CANON.wordBaseline * s,
      size: LOCKUP_CANON.wordSize * s,
      tracking: LOCKUP_CANON.tracking * s,
    },
  }
}

/** Último cuadro real del branding (step 0) convertido a maestro ×1.5.
 *  Mismas constantes y medición que el branding heredado: el primer frame
 *  del step 1 muestra exactamente el mismo estado de marca (§3.2). */
function lockupBrandFinal(): LockPose {
  const word100 = measureText('HomePlus', WORDMARK.size, W600, -1.5).width
  const shift = 640 - (POSE_ISO_LOCKUP.x + WORDMARK.startX + word100) / 2
  return {
    iso: {
      x: (POSE_ISO_LOCKUP.x + shift) * 1.5,
      y: POSE_ISO_LOCKUP.y * 1.5,
      w: POSE_ISO_LOCKUP.w * 1.5,
    },
    word: {
      x: (WORDMARK.startX + shift) * 1.5,
      baselineY: (WORDMARK.centerY + WORDMARK.size * 0.35) * 1.5,
      size: WORDMARK.size * 1.5,
      tracking: -1.5 * 1.5,
    },
  }
}

/** Anotación compacta: «Juli · Educación Física» + «Mañana». El prefijo
 *  «Juli ·» se retira sin duplicar el título de Educación Física (§9.5). */
function annotationTexts(x: number, y: number, prefixOpacity: number, opacity: number) {
  const bodyW = measureText('Educación Física', 40, W600, 0).width
  const preW = measureText('Juli · ', 40, W600, 0).width
  const k = 1 - prefixOpacity
  const bodyX = lerp(x - (preW + bodyW) / 2 + preW, x - bodyW / 2, k)
  const preX = x - (preW + bodyW) / 2
  return {
    title: txt('Educación Física', leftBox('Educación Física', 40, W600, 0, bodyX, y - 8), 40, W600, 0, TYPE_WHITE, opacity, 0, 'left', 1),
    prefix: prefixOpacity > 0.001
      ? txt('Juli · ', leftBox('Juli · ', 40, W600, 0, preX, y - 8), 40, W600, 0, TYPE_WHITE, prefixOpacity * opacity, 0, 'left', 1)
      : null,
    moment: txt('Mañana', centeredBox('Mañana', 26, W500, 0, x, y + 26), 26, W500, 0, TYPE_GRAY, 0.9 * opacity, 0, 'center', 1),
  }
}

/** Título de contexto secundario (centro, línea base objetivo). */
function contextTitle(text: string, size: number, cx: number, baseline: number, opacity: number, blur: number): TextSpec {
  return txt(text, centeredBox(text, size, W500, 0, cx, baseline), size, W500, 0, TYPE_WHITE, opacity, blur, 'center', 1)
}

function lerpLock(a: LockPose, b: LockPose, t: number): LockPose {
  return {
    iso: { x: lerp(a.iso.x, b.iso.x, t), y: lerp(a.iso.y, b.iso.y, t), w: lerp(a.iso.w, b.iso.w, t) },
    word: {
      x: lerp(a.word.x, b.word.x, t),
      baselineY: lerp(a.word.baselineY, b.word.baselineY, t),
      size: lerp(a.word.size, b.word.size, t),
      tracking: lerp(a.word.tracking, b.word.tracking, t),
    },
  }
}

// --- Tablas de arco para threads y trayectorias ------------------------------
const arcJuli = buildArcTable(THREAD_JULI.p0, THREAD_JULI.p1, THREAD_JULI.p2, THREAD_JULI.p3)
const arcTime = buildArcTable(THREAD_TIME.p0, THREAD_TIME.p1, THREAD_TIME.p2, THREAD_TIME.p3)
const arcAction = buildArcTable(THREAD_ACTION.p0, THREAD_ACTION.p1, THREAD_ACTION.p2, THREAD_ACTION.p3)
const arcInfo = buildArcTable(THREAD_INFO.p0, THREAD_INFO.p1, THREAD_INFO.p2, THREAD_INFO.p3)
const arcExtract = buildArcTable(JULI_EXTRACT.p0, JULI_EXTRACT.p1, JULI_EXTRACT.p2, JULI_EXTRACT.p3)
const arcHome = buildArcTable(HOME_CURVE.p0, HOME_CURVE.p1, HOME_CURVE.p1, HOME_CURVE.p2)
// Conexión vertical de Juli (step 7/8): la señal la recorre en sentido inverso.
const arcJuliVertical = buildArcTable([390, CONNECTOR_BOTTOM_Y], [390, 620], [390, 680], [390, CONNECTOR_TOP_Y])

// --- Zoom final (step 10): foco geométrico -----------------------------------
const ISO_K = ISOTYPE_BOX.w / (PNG_BBOX.x1 - PNG_BBOX.x0)
const Q0 = {
  x: ISOTYPE_BOX.x + (HEAD_MAIN_PNG.cx - PNG_BBOX.x0) * ISO_K,
  y: ISOTYPE_BOX.y + (HEAD_MAIN_PNG.cy - PNG_BBOX.y0) * ISO_K,
}
const WHITE_R = HEAD_MAIN_PNG.whiteR * ISO_K
const CORNERS: ReadonlyArray<readonly [number, number]> = [[0, 0], [CANVAS.w, 0], [0, CANVAS.h], [CANVAS.w, CANVAS.h]]
let maxCorner = 0
for (const [cx, cy] of CORNERS) {
  const d = Math.hypot(Q0.x - cx, Q0.y - cy)
  if (d > maxCorner) maxCorner = d
}
const S_FINAL = (maxCorner / WHITE_R) * ZOOM.margin

function zoomAt(t: number): { tx: number; ty: number; s: number; blur: number } {
  const u = clamp01(t / ZOOM.ms)
  const e = E(u)
  const s = Math.exp(Math.log(S_FINAL) * e)
  const tx = Q0.x + e * (CANVAS.cx - Q0.x)
  const ty = Q0.y + e * (CANVAS.cy - Q0.y)
  const ePrime = 30 * u * u * (u - 1) * (u - 1)
  const blur = clamp01((s * ePrime) / 14.21) * ZOOM.maxBlur
  return { tx, ty, s, blur }
}

// --- Estado base --------------------------------------------------------------
function baseState(step: number, t: number): SceneState {
  void step
  return {
    step, t,
    lockup: { ...lockupBrandFinal(), opacity: 1, visible: true },
    heading: null,
    juli: { cx: JULI.cx, cy: JULI.cy, d: JULI.dRef, opacity: 0, monoMaskP: 0, glow: 1, visible: false },
    personLabel: null,
    juliName: null,
    ctxPE: {
      label: null, title: null,
      accent: { x: ACCENT_CONTEXT.x, y: ACCENT_CONTEXT.y, w: ACCENT_CONTEXT.w, opacity: 0, visible: false },
      halo: 0, visible: false,
    },
    time: {
      category: null, value: null,
      accent: { x: ACCENT_TIME.x, y: ACCENT_TIME.y, w: 0, opacity: 0, visible: false },
    },
    action: {
      indicator: { cx: INDICATOR_ACTION.cx, cy: INDICATOR_ACTION.cy, d: 0, opacity: 0, visible: false },
      category: null, text: null,
    },
    info: {
      glyph: { opacity: 0, drawP: 0, line1: 0, line2: 0, visible: false },
      category: null, data: null,
    },
    threads: {
      juli: thread(0, THREAD_STYLE.opacity), time: thread(0, THREAD_STYLE.opacity),
      action: thread(0, THREAD_STYLE.opacity), info: thread(0, THREAD_STYLE.opacity),
    },
    group: null,
    annotation: {
      x: GROUP_PIVOT_D.x, y: GROUP_PIVOT_D.y, opacity: 0, juliPrefix: 1, accentOpacity: 0, visible: false,
      title: txt('Educación Física', centeredBox('Educación Física', 40, W600, 0, GROUP_PIVOT_D.x, GROUP_PIVOT_D.y - 8), 40, W600, 0, TYPE_WHITE, 0, 0, 'center', 1),
      prefix: null,
      moment: txt('Mañana', centeredBox('Mañana', 26, W500, 0, GROUP_PIVOT_D.x, GROUP_PIVOT_D.y + 26), 26, W500, 0, TYPE_GRAY, 0, 0, 'center', 1),
    },
    refs: {
      momento: { w: 0, opacity: 0, x: 1430, y: 453 },
      accion: { d: 0, opacity: 0, cx: 1350, cy: 770 },
      info: { drawP: 0, opacity: 0, cx: 328, cy: 760 },
      contexto: { d: 0, opacity: 0, cx: 960, cy: 570 },
    },
    signal: { x: 0, y: 0, opacity: 0, d: SIGNAL.d, visible: false },
    shopping: {
      cx: CONTEXT_SHOPPING.cx, cy: CONTEXT_SHOPPING.cy, opacity: 0, glyphOpacity: 0, glyphScale: 0.94,
      textOpacity: 0, accentP: 0, blur: 1, visible: false,
      text: txt('Compra semanal', centeredBox('Compra semanal', CONTEXT_SHOPPING.size, W500, 0, CONTEXT_SHOPPING.cx, CONTEXT_SHOPPING.cy + 34), CONTEXT_SHOPPING.size, W500, 0, TYPE_WHITE, 0, 1, 'center', 1),
    },
    encounter: {
      cx: CONTEXT_ENCOUNTER.cx, cy: CONTEXT_ENCOUNTER.cy, opacity: 0, glyphOpacity: 0, glyphScale: 0.94,
      textOpacity: 0, accentP: 0, blur: 1, visible: false,
      text: txt('Un encuentro', centeredBox('Un encuentro', CONTEXT_ENCOUNTER.size, W500, 0, CONTEXT_ENCOUNTER.cx, CONTEXT_ENCOUNTER.cy + 34), CONTEXT_ENCOUNTER.size, W500, 0, TYPE_WHITE, 0, 1, 'center', 1),
    },
    memberB: { cx: MB.cx, cy: MB.cy, d: MEMBER_AVATAR.d, opacity: 0, inner: 0, visible: false },
    memberC: { cx: MC.cx, cy: MC.cy, d: MEMBER_AVATAR.d, opacity: 0, inner: 0, visible: false },
    connectors: [],
    home: { drawP: 0, curveOpacity: 0, label: null },
    titleAutonomy: null,
    titleShared: null,
    isotipo: { x: ISOTYPE_BOX.x, y: ISOTYPE_BOX.y, s: 0.94, opacity: 0, blur: 1.2, visible: false },
    zoom: null,
    veil: 0,
  }
}

// --- STEP 1 — El espacio se prepara -------------------------------------------
function step1(t: number): SceneState {
  const s = baseState(1, t)
  const lp = seg(t, 120, 620)
  s.lockup = { ...lerpLock(lockupBrandFinal(), lockupTarget(), lp), opacity: 1, visible: true }

  const hp = seg(t, 130, 610)
  const hSize = lerp(HEADING_FULL.size * 0.98, HEADING_FULL.size, hp)
  const hY = lerp(HEADING_FULL.y + 20, HEADING_FULL.y, hp)
  const hBlur = 2 * (1 - hp)
  const hMask = seg(t, 130, 480)
  // Ancla izquierda centrada: el mismo mecanismo que el morph del step 2,
  // de modo que el frame final del step 1 y el inicial del step 2 coinciden.
  const hHeadW = measureText('La vida del hogar', hSize, W600, HEADING_FULL.tracking).width
  s.heading = txt(
    'La vida del hogar',
    { x: CANVAS.cx - hHeadW / 2, y: hY, w: hHeadW, h: HEADING_FULL.h },
    hSize, W600, HEADING_FULL.tracking, TYPE_WHITE, hp, hBlur, 'left', hMask,
  )

  const jP = seg(t, 340, 660)
  s.juli = { cx: JULI.cx, cy: JULI.cy, d: lerp(18, JULI.dRef, jP), opacity: 0.24 * jP, monoMaskP: 0, glow: 1, visible: jP > 0.001 }

  // Referencias preliminares (opacidad ≤ 0.24)
  s.refs = {
    momento: { w: 40 * seg(t, 385, 705), opacity: 0.24 * seg(t, 385, 705), x: 1430, y: 453 },
    accion: { d: 12 * seg(t, 430, 750), opacity: 0.24 * seg(t, 430, 750), cx: 1350, cy: 770 },
    info: { drawP: seg(t, 475, 795), opacity: 0.24 * seg(t, 475, 795), cx: 328, cy: 760 },
    contexto: { d: lerp(4, 8, seg(t, 530, 840)), opacity: 0.5 * seg(t, 530, 840), cx: 960, cy: 570 },
  }
  return s
}

// --- STEP 2 — Juli le da identidad --------------------------------------------
function step2(t: number): SceneState {
  const s = baseState(2, t)
  s.lockup = { ...lockupTarget(), opacity: 1, visible: true }

  const mp = seg(t, 0, 470)
  const hSize = lerp(HEADING_FULL.size, HEADING_COMPACT.size, mp)
  const hY = lerp(HEADING_FULL.y, HEADING_COMPACT.y, mp)
  const hTrack = lerp(HEADING_FULL.tracking, HEADING_COMPACT.tracking, mp)
  const fullW = measureText('La vida del hogar', HEADING_FULL.size, W600, HEADING_FULL.tracking).width
  const startX = CANVAS.cx - fullW / 2
  const hX = lerp(startX, HEADING_COMPACT.x, mp)
  s.heading = txt(
    'La vida del hogar',
    { x: hX, y: hY, w: lerp(HEADING_FULL.w, HEADING_COMPACT.w, mp), h: lerp(HEADING_FULL.h, HEADING_COMPACT.h, mp) },
    hSize, W600, hTrack, TYPE_WHITE, 1, 0, 'left', 1,
  )

  const aP = seg(t, 100, 470)
  s.juli = { cx: JULI.cx, cy: JULI.cy, d: lerp(JULI.dRef, JULI.dAvatar, aP), opacity: lerp(0.24, 1, aP), monoMaskP: seg(t, 220, 510), glow: 1, visible: true }

  const pP = seg(t, 310, 650)
  s.personLabel = txt('PERSONAS', { ...LABEL_PERSONAS, y: lerp(LABEL_PERSONAS.y + 14, LABEL_PERSONAS.y, pP) }, LABEL_PERSONAS.size, W400, LABEL_PERSONAS.tracking, TYPE_GRAY, 0.78 * pP, 1 * (1 - pP), 'left', 1)

  const nP = seg(t, 350, 690)
  s.juliName = txt('Juli', { ...NAME_JULI, y: lerp(NAME_JULI.y + 20, NAME_JULI.y, nP) }, NAME_JULI.size, W600, 0, TYPE_WHITE, nP, 1.5 * (1 - nP), 'left', seg(t, 350, 620))

  s.threads.juli = thread(0.45 * seg(t, 480, 760), THREAD_STYLE.opacity)
  s.refs = {
    momento: { w: 40, opacity: 0.24, x: 1430, y: 453 },
    accion: { d: 12, opacity: 0.24, cx: 1350, cy: 770 },
    info: { drawP: 1, opacity: 0.24, cx: 328, cy: 760 },
    contexto: { d: 8, opacity: 0, cx: 960, cy: 570 },
  }
  return s
}

// --- STEP 3 — El momento adquiere contexto ------------------------------------
function step3(t: number): SceneState {
  const s = baseState(3, t)
  s.lockup = { ...lockupTarget(), opacity: 1, visible: true }
  s.heading = txt('La vida del hogar', HEADING_COMPACT, HEADING_COMPACT.size, W600, HEADING_COMPACT.tracking, TYPE_WHITE, 1, 0, 'left', 1)

  // Foco: Juli cede énfasis a 0,82 mientras aparece «Mañana» y lo recupera.
  const glowDown = lerp(1, 0.82, seg(t, 130, 510))
  const glow = lerp(glowDown, 1, seg(t, 790, 900))
  s.juli = { cx: JULI.cx, cy: JULI.cy, d: JULI.dAvatar, opacity: 1, monoMaskP: 1, glow, visible: true }
  s.personLabel = txt('PERSONAS', LABEL_PERSONAS, LABEL_PERSONAS.size, W400, LABEL_PERSONAS.tracking, TYPE_GRAY, 0.78, 0, 'left', 1)
  s.juliName = txt('Juli', NAME_JULI, NAME_JULI.size, W600, 0, TYPE_WHITE, 1, 0, 'left', 1)

  // Anticipación temporal
  const momRef = lerp(0.24, 0.65, seg(t, 0, 130)) * (1 - seg(t, 130, 450))
  s.refs = {
    momento: { w: 40, opacity: momRef, x: 1430, y: 453 },
    accion: { d: 12, opacity: 0.24, cx: 1350, cy: 770 },
    info: { drawP: 1, opacity: 0.24, cx: 328, cy: 760 },
    contexto: { d: 8, opacity: 0.5 * (1 - seg(t, 0, 400)), cx: 960, cy: 570 },
  }

  // Mañana
  const mP = seg(t, 130, 510)
  const mSize = lerp(VALUE_MOMENTO.size * 0.97, VALUE_MOMENTO.size, mP)
  const mX = lerp(1424, VALUE_MOMENTO.x, mP)
  s.time.value = txt('Mañana', { ...VALUE_MOMENTO, x: mX }, mSize, W600, 0, TYPE_WHITE, mP, 1.5 * (1 - mP), 'left', 1)
  const catP = seg(t, 180, 520)
  s.time.category = txt('MOMENTOS', { ...LABEL_MOMENTOS, y: lerp(LABEL_MOMENTOS.y + 10, LABEL_MOMENTOS.y, catP) }, LABEL_MOMENTOS.size, W400, LABEL_MOMENTOS.tracking, TYPE_GRAY, 0.78 * catP, 1 * (1 - catP), 'left', 1)

  // Línea temporal
  const aP = seg(t, 230, 570)
  const aIntensity = lerp(0.85, 0.65, aP)
  s.time.accent = { x: ACCENT_TIME.x, y: ACCENT_TIME.y, w: ACCENT_TIME.w * aP, opacity: aIntensity * aP, visible: aP > 0.001 }

  // Núcleo Educación Física
  const cP = seg(t, 260, 690)
  s.ctxPE.label = txt('CONTEXTO', { ...LABEL_CONTEXT, y: lerp(LABEL_CONTEXT.y + 8, LABEL_CONTEXT.y, cP) }, LABEL_CONTEXT.size, W400, 1.6, TYPE_GRAY, 0.78 * cP, 0, 'left', 1)
  const tP = seg(t, 320, 690)
  s.ctxPE.title = txt('Educación Física', { ...TITLE_PE, y: lerp(TITLE_PE.y + 18, TITLE_PE.y, tP) }, TITLE_PE.size, W600, 0, TYPE_WHITE, tP, 1.5 * (1 - tP), 'left', 1)
  s.ctxPE.accent = { x: ACCENT_CONTEXT.x, y: ACCENT_CONTEXT.y, w: ACCENT_CONTEXT.w, opacity: ACCENT_CONTEXT.opacity * seg(t, 320, 690), visible: tP > 0.001 }
  s.ctxPE.halo = 0.1 * seg(t, 720, 820) * (1 - seg(t, 820, 900))
  s.ctxPE.visible = true

  // Conexiones
  s.threads.juli = thread(lerp(0.45, 1, seg(t, 340, 760)), THREAD_STYLE.opacity)
  s.threads.time = thread(seg(t, 370, 790), THREAD_STYLE.opacity)
  return s
}

// --- STEP 4 — Algo requiere atención ------------------------------------------
function step4(t: number): SceneState {
  const s = baseState(4, t)
  s.lockup = { ...lockupTarget(), opacity: 1, visible: true }
  s.heading = txt('La vida del hogar', HEADING_COMPACT, HEADING_COMPACT.size, W600, HEADING_COMPACT.tracking, TYPE_WHITE, 1, 0, 'left', 1)
  s.juli = { cx: JULI.cx, cy: JULI.cy, d: JULI.dAvatar, opacity: 1, monoMaskP: 1, glow: 1, visible: true }
  s.personLabel = txt('PERSONAS', LABEL_PERSONAS, LABEL_PERSONAS.size, W400, LABEL_PERSONAS.tracking, TYPE_GRAY, 0.78, 0, 'left', 1)
  s.juliName = txt('Juli', NAME_JULI, NAME_JULI.size, W600, 0, TYPE_WHITE, 1, 0, 'left', 1)
  s.time.value = txt('Mañana', VALUE_MOMENTO, VALUE_MOMENTO.size, W600, 0, TYPE_WHITE, 1, 0, 'left', 1)
  s.time.category = txt('MOMENTOS', LABEL_MOMENTOS, LABEL_MOMENTOS.size, W400, LABEL_MOMENTOS.tracking, TYPE_GRAY, 0.78, 0, 'left', 1)
  s.time.accent = { x: ACCENT_TIME.x, y: ACCENT_TIME.y, w: ACCENT_TIME.w, opacity: ACCENT_TIME.opacity, visible: true }
  s.ctxPE.label = txt('CONTEXTO', LABEL_CONTEXT, LABEL_CONTEXT.size, W400, 1.6, TYPE_GRAY, 0.78, 0, 'left', 1)
  s.ctxPE.title = txt('Educación Física', TITLE_PE, TITLE_PE.size, W600, 0, TYPE_WHITE, 1, 0, 'left', 1)
  s.ctxPE.accent = { x: ACCENT_CONTEXT.x, y: ACCENT_CONTEXT.y, w: ACCENT_CONTEXT.w, opacity: ACCENT_CONTEXT.opacity, visible: true }
  s.ctxPE.visible = true
  s.threads.juli = thread(1, THREAD_STYLE.opacity)
  s.threads.time = thread(1, THREAD_STYLE.opacity)

  // Referencia de acción: se retira
  const accRef = 0.24 * (1 - seg(t, 100, 400))
  s.refs = {
    momento: { w: 40, opacity: 0, x: 1430, y: 453 },
    accion: { d: 12, opacity: accRef, cx: 1350, cy: 770 },
    info: { drawP: 1, opacity: 0.24, cx: 328, cy: 760 },
    contexto: { d: 8, opacity: 0, cx: 960, cy: 570 },
  }

  // Conector de acción
  const cP = seg(t, 100, 510)
  const dotP = seg(t, 100, 430) * (1 - seg(t, 430, 510))
  const dotPos = dotP > 0.001 ? arcPoint(arcAction, dotP) : null
  s.threads.action = thread(cP, THREAD_STYLE.opacity, dotPos ? { x: dotPos.x, y: dotPos.y, opacity: dotP } : null)

  // Indicador
  const iP = seg(t, 260, 580)
  s.action.indicator = { cx: INDICATOR_ACTION.cx, cy: INDICATOR_ACTION.cy, d: INDICATOR_ACTION.d * iP, opacity: iP, visible: iP > 0.001 }

  // Texto de responsabilidad
  const rP = seg(t, 350, 740)
  const rSize = lerp(ACTION_TEXT.size * 0.985, ACTION_TEXT.size, rP)
  s.action.text = txt('Llevar autorización', { ...ACTION_TEXT, y: lerp(ACTION_TEXT.y + 18, ACTION_TEXT.y, rP) }, rSize, W500, 0, TYPE_WHITE, rP, 1.5 * (1 - rP), 'left', seg(t, 350, 700))

  // Categoría
  const rcP = seg(t, 470, 800)
  s.action.category = txt('RESPONSABILIDAD', { ...LABEL_RESP, y: lerp(LABEL_RESP.y + 10, LABEL_RESP.y, rcP) }, LABEL_RESP.size, W400, LABEL_RESP.tracking, TYPE_GRAY, 0.78 * rcP, 0, 'left', 1)

  // Microrespuesta del indicador
  const micro = t < 700 ? 0 : t < 785 ? seg(t, 700, 785) : 1 - seg(t, 785, 870)
  s.action.indicator.d = lerp(INDICATOR_ACTION.d, 15, micro)
  return s
}

// --- STEP 5 — La información completa la situación -----------------------------
function step5(t: number): SceneState {
  const s = baseState(5, t)
  s.lockup = { ...lockupTarget(), opacity: 1, visible: true }
  s.heading = txt('La vida del hogar', HEADING_COMPACT, HEADING_COMPACT.size, W600, HEADING_COMPACT.tracking, TYPE_WHITE, 1, 0, 'left', 1)
  s.juli = { cx: JULI.cx, cy: JULI.cy, d: JULI.dAvatar, opacity: 1, monoMaskP: 1, glow: 1, visible: true }
  s.personLabel = txt('PERSONAS', LABEL_PERSONAS, LABEL_PERSONAS.size, W400, LABEL_PERSONAS.tracking, TYPE_GRAY, 0.78, 0, 'left', 1)
  s.juliName = txt('Juli', NAME_JULI, NAME_JULI.size, W600, 0, TYPE_WHITE, 1, 0, 'left', 1)
  s.time.value = txt('Mañana', VALUE_MOMENTO, VALUE_MOMENTO.size, W600, 0, TYPE_WHITE, 1, 0, 'left', 1)
  s.time.category = txt('MOMENTOS', LABEL_MOMENTOS, LABEL_MOMENTOS.size, W400, LABEL_MOMENTOS.tracking, TYPE_GRAY, 0.78, 0, 'left', 1)
  s.time.accent = { x: ACCENT_TIME.x, y: ACCENT_TIME.y, w: ACCENT_TIME.w, opacity: ACCENT_TIME.opacity, visible: true }
  s.ctxPE.label = txt('CONTEXTO', LABEL_CONTEXT, LABEL_CONTEXT.size, W400, 1.6, TYPE_GRAY, 0.78, 0, 'left', 1)
  s.ctxPE.title = txt('Educación Física', TITLE_PE, TITLE_PE.size, W600, 0, TYPE_WHITE, 1, 0, 'left', 1)
  s.ctxPE.accent = { x: ACCENT_CONTEXT.x, y: ACCENT_CONTEXT.y, w: ACCENT_CONTEXT.w, opacity: ACCENT_CONTEXT.opacity, visible: true }
  s.ctxPE.visible = true
  s.action.indicator = { cx: INDICATOR_ACTION.cx, cy: INDICATOR_ACTION.cy, d: INDICATOR_ACTION.d, opacity: 1, visible: true }
  s.action.text = txt('Llevar autorización', ACTION_TEXT, ACTION_TEXT.size, W500, 0, TYPE_WHITE, 1, 0, 'left', 1)
  s.action.category = txt('RESPONSABILIDAD', LABEL_RESP, LABEL_RESP.size, W400, LABEL_RESP.tracking, TYPE_GRAY, 0.78, 0, 'left', 1)
  s.threads.juli = thread(1, THREAD_STYLE.opacity)
  s.threads.time = thread(1, THREAD_STYLE.opacity)
  s.threads.action = thread(1, THREAD_STYLE.opacity)

  // Referencia documental: se retira
  const infoRef = 0.24 * (1 - seg(t, 0, 250))
  s.refs = {
    momento: { w: 40, opacity: 0, x: 1430, y: 453 },
    accion: { d: 12, opacity: 0, cx: 1350, cy: 770 },
    info: { drawP: 1, opacity: infoRef, cx: 328, cy: 760 },
    contexto: { d: 8, opacity: 0, cx: 960, cy: 570 },
  }

  // Glifo documental
  const gP = seg(t, 0, 230)
  s.info.glyph = { opacity: gP, drawP: gP, line1: 20 * seg(t, 150, 310), line2: 15 * seg(t, 210, 400), visible: gP > 0.001 }

  // Texto principal
  const dP = seg(t, 230, 600)
  s.info.data = txt('Aviso del colegio', { ...DATA_INFO, x: lerp(DATA_INFO.x + 20, DATA_INFO.x, dP) }, DATA_INFO.size, W500, 0, TYPE_WHITE, dP, 1.5 * (1 - dP), 'left', 1)

  // Categoría
  const icP = seg(t, 280, 590)
  s.info.category = txt('INFORMACIÓN', { ...LABEL_INFO, y: lerp(LABEL_INFO.y + 10, LABEL_INFO.y, icP) }, LABEL_INFO.size, W400, LABEL_INFO.tracking, TYPE_GRAY, 0.78 * icP, 0, 'left', 1)

  // Cuarta conexión
  const t4P = seg(t, 310, 750)
  const dot4P = seg(t, 310, 670) * (1 - seg(t, 670, 750))
  const dot4Pos = dot4P > 0.001 ? arcPoint(arcInfo, dot4P) : null
  s.threads.info = thread(t4P, THREAD_STYLE.opacity, dot4Pos ? { x: dot4Pos.x, y: dot4Pos.y, opacity: 0.6 * dot4P } : null)

  // Respuesta central
  const haloP = seg(t, 690, 820) * (1 - seg(t, 820, 940))
  s.ctxPE.halo = 0.12 * haloP
  s.ctxPE.accent.opacity = lerp(ACCENT_CONTEXT.opacity, 0.9, haloP)

  // Recorrido de relaciones (4 pulsos)
  const pulse = (start: number, peak: number, end: number) => {
    if (t <= start) return THREAD_STYLE.opacity
    if (t <= peak) return lerp(THREAD_STYLE.opacity, THREAD_STYLE.active, seg(t, start, peak))
    if (t <= end) return lerp(THREAD_STYLE.active, THREAD_STYLE.opacity, seg(t, peak, end))
    return THREAD_STYLE.opacity
  }
  s.threads.juli.opacity = pulse(760, 840, 940)
  s.threads.time.opacity = pulse(800, 880, 980)
  s.threads.action.opacity = pulse(840, 920, 1020)
  s.threads.info.opacity = pulse(880, 960, 1060)
  return s
}

// --- STEP 6 — La cámara descubre más hogar -------------------------------------
function step6(t: number): SceneState {
  const s = baseState(6, t)
  s.lockup = { ...lockupTarget(), opacity: 1, visible: true }
  s.heading = txt('La vida del hogar', HEADING_COMPACT, HEADING_COMPACT.size, W600, HEADING_COMPACT.tracking, TYPE_WHITE, 1, 0, 'left', 1)

  // Grupo: alejamiento de cámara
  const gP = seg(t, 80, 800)
  const gCx = lerp(GROUP_PIVOT_O.x, GROUP_PIVOT_D.x, gP)
  const gCy = lerp(GROUP_PIVOT_O.y, GROUP_PIVOT_D.y, gP)
  const gS = lerp(1, GROUP_SCALE_END, gP)
  s.group = { cx: gCx, cy: gCy, s: gS }

  // Elementos del grupo (coords locales = master de steps 1–5)
  const labelFade = 1 - seg(t, 450, 800)
  s.juli = { cx: JULI.cx, cy: JULI.cy, d: JULI.dAvatar, opacity: 1, monoMaskP: 1, glow: 1, visible: true }
  s.personLabel = txt('PERSONAS', LABEL_PERSONAS, LABEL_PERSONAS.size, W400, LABEL_PERSONAS.tracking, TYPE_GRAY, 0.78 * labelFade, 0, 'left', 1)
  s.juliName = txt('Juli', NAME_JULI, NAME_JULI.size, W600, 0, TYPE_WHITE, labelFade, 0, 'left', 1)
  s.time.value = txt('Mañana', VALUE_MOMENTO, VALUE_MOMENTO.size, W600, 0, TYPE_WHITE, labelFade, 0, 'left', 1)
  s.time.category = txt('MOMENTOS', LABEL_MOMENTOS, LABEL_MOMENTOS.size, W400, LABEL_MOMENTOS.tracking, TYPE_GRAY, 0.78 * labelFade, 0, 'left', 1)
  s.time.accent = { x: ACCENT_TIME.x, y: ACCENT_TIME.y, w: ACCENT_TIME.w, opacity: ACCENT_TIME.opacity * labelFade, visible: labelFade > 0.001 }
  s.ctxPE.label = txt('CONTEXTO', LABEL_CONTEXT, LABEL_CONTEXT.size, W400, 1.6, TYPE_GRAY, 0.78 * labelFade, 0, 'left', 1)
  s.ctxPE.title = txt('Educación Física', TITLE_PE, TITLE_PE.size, W600, 0, TYPE_WHITE, labelFade, 0, 'left', 1)
  s.ctxPE.accent = { x: ACCENT_CONTEXT.x, y: ACCENT_CONTEXT.y, w: ACCENT_CONTEXT.w, opacity: ACCENT_CONTEXT.opacity * labelFade, visible: labelFade > 0.001 }
  s.ctxPE.halo = 0
  s.ctxPE.visible = true
  s.action.indicator = { cx: INDICATOR_ACTION.cx, cy: INDICATOR_ACTION.cy, d: INDICATOR_ACTION.d, opacity: labelFade, visible: labelFade > 0.001 }
  s.action.text = txt('Llevar autorización', ACTION_TEXT, ACTION_TEXT.size, W500, 0, TYPE_WHITE, labelFade, 0, 'left', 1)
  s.action.category = txt('RESPONSABILIDAD', LABEL_RESP, LABEL_RESP.size, W400, LABEL_RESP.tracking, TYPE_GRAY, 0.78 * labelFade, 0, 'left', 1)
  s.info.glyph = { opacity: labelFade, drawP: 1, line1: 20, line2: 15, visible: labelFade > 0.001 }
  s.info.data = txt('Aviso del colegio', DATA_INFO, DATA_INFO.size, W500, 0, TYPE_WHITE, labelFade, 0, 'left', 1)
  s.info.category = txt('INFORMACIÓN', LABEL_INFO, LABEL_INFO.size, W400, LABEL_INFO.tracking, TYPE_GRAY, 0.78 * labelFade, 0, 'left', 1)
  // Las relaciones permanecen perceptibles mientras la transformación se
  // aproxima al destino; después bajan a un eco tenue para no cruzar el
  // texto de la anotación compacta (§8.3).
  const relOp = THREAD_STYLE.opacity * lerp(1, 0.28, seg(t, 800, 1030))
  s.threads.juli = thread(1, relOp)
  s.threads.time = thread(1, relOp)
  s.threads.action = thread(1, relOp)
  s.threads.info = thread(1, relOp)

  // Anotación compacta
  const anP = seg(t, 580, 980)
  s.annotation = {
    x: GROUP_PIVOT_D.x, y: GROUP_PIVOT_D.y, opacity: anP, juliPrefix: 1,
    accentOpacity: ACCENT_CONTEXT.opacity * anP, visible: anP > 0.001,
    ...annotationTexts(GROUP_PIVOT_D.x, GROUP_PIVOT_D.y, 1, anP),
  }

  // Compra semanal
  const sP = seg(t, 530, 900)
  const sGlyph = seg(t, 530, 780)
  const sText = seg(t, 620, 900)
  const sAccent = seg(t, 780, 900)
  const shopCx = lerp(CONTEXT_SHOPPING.cx + 30, CONTEXT_SHOPPING.cx, sP)
  s.shopping = {
    cx: shopCx, cy: CONTEXT_SHOPPING.cy,
    opacity: 1, glyphOpacity: sGlyph, glyphScale: lerp(0.94, 1, sGlyph),
    textOpacity: sText, accentP: sAccent, blur: 1 * (1 - sP), visible: sP > 0.001,
    text: contextTitle('Compra semanal', CONTEXT_SHOPPING.size, shopCx, CONTEXT_SHOPPING.cy + 34, sText, 1 * (1 - sP)),
  }

  // Un encuentro
  const eP = seg(t, 650, 1030)
  const eGlyph = seg(t, 650, 900)
  const eText = seg(t, 740, 1030)
  const eAccent = seg(t, 860, 1030)
  const encCx = lerp(CONTEXT_ENCOUNTER.cx + 24, CONTEXT_ENCOUNTER.cx, eP)
  const encCy = lerp(CONTEXT_ENCOUNTER.cy + 18, CONTEXT_ENCOUNTER.cy, eP)
  s.encounter = {
    cx: encCx, cy: encCy,
    opacity: 1, glyphOpacity: eGlyph, glyphScale: lerp(0.94, 1, eGlyph),
    textOpacity: eText, accentP: eAccent, blur: 1 * (1 - eP), visible: eP > 0.001,
    text: contextTitle('Un encuentro', CONTEXT_ENCOUNTER.size, encCx, encCy + 34, eText, 1 * (1 - eP)),
  }
  return s
}

// --- STEP 7 — Distintas personas, distintas perspectivas ------------------------
function step7(t: number): SceneState {
  const s = baseState(7, t)
  s.lockup = { ...lockupTarget(), opacity: 1, visible: true }
  s.heading = txt('La vida del hogar', HEADING_COMPACT, HEADING_COMPACT.size, W600, HEADING_COMPACT.tracking, TYPE_WHITE, 1, 0, 'left', 1)

  // Grupo fijo en la pose final del step 6
  s.group = { cx: GROUP_PIVOT_D.x, cy: GROUP_PIVOT_D.y, s: GROUP_SCALE_END }
  // El grupo conserva la pose final del step 6: sus textos ya se retiraron
  // allí (ilegibles al 0,38) y no reaparecen (§8.3, §13.3).
  const groupFade = 0
  s.personLabel = txt('PERSONAS', LABEL_PERSONAS, LABEL_PERSONAS.size, W400, LABEL_PERSONAS.tracking, TYPE_GRAY, 0, 0, 'left', 1)
  s.juliName = txt('Juli', NAME_JULI, NAME_JULI.size, W600, 0, TYPE_WHITE, 0, 0, 'left', 1)
  s.time.value = txt('Mañana', VALUE_MOMENTO, VALUE_MOMENTO.size, W600, 0, TYPE_WHITE, 0, 0, 'left', 1)
  s.time.category = txt('MOMENTOS', LABEL_MOMENTOS, LABEL_MOMENTOS.size, W400, LABEL_MOMENTOS.tracking, TYPE_GRAY, 0, 0, 'left', 1)
  s.time.accent = { x: ACCENT_TIME.x, y: ACCENT_TIME.y, w: ACCENT_TIME.w, opacity: 0, visible: false }
  s.ctxPE.label = txt('CONTEXTO', LABEL_CONTEXT, LABEL_CONTEXT.size, W400, 1.6, TYPE_GRAY, 0, 0, 'left', 1)
  s.ctxPE.title = txt('Educación Física', TITLE_PE, TITLE_PE.size, W600, 0, TYPE_WHITE, 0, 0, 'left', 1)
  s.ctxPE.accent = { x: ACCENT_CONTEXT.x, y: ACCENT_CONTEXT.y, w: ACCENT_CONTEXT.w, opacity: 0, visible: false }
  s.ctxPE.visible = true
  s.action.indicator = { cx: INDICATOR_ACTION.cx, cy: INDICATOR_ACTION.cy, d: INDICATOR_ACTION.d, opacity: 0, visible: false }
  s.action.text = txt('Llevar autorización', ACTION_TEXT, ACTION_TEXT.size, W500, 0, TYPE_WHITE, 0, 0, 'left', 1)
  s.action.category = txt('RESPONSABILIDAD', LABEL_RESP, LABEL_RESP.size, W400, LABEL_RESP.tracking, TYPE_GRAY, 0, 0, 'left', 1)
  s.info.glyph = { opacity: 0, drawP: 1, line1: 20, line2: 15, visible: false }
  s.info.data = txt('Aviso del colegio', DATA_INFO, DATA_INFO.size, W500, 0, TYPE_WHITE, 0, 0, 'left', 1)
  s.info.category = txt('INFORMACIÓN', LABEL_INFO, LABEL_INFO.size, W400, LABEL_INFO.tracking, TYPE_GRAY, 0, 0, 'left', 1)
  // El grupo hereda el eco final del step 6 y se retira explícitamente (§13.3).
  const ghost = THREAD_STYLE.opacity * 0.28 * (1 - seg(t, 0, 300))
  s.threads.juli = thread(1, ghost)
  s.threads.time = thread(1, ghost)
  s.threads.action = thread(1, ghost)
  s.threads.info = thread(1, ghost)

  // Extracción física de Juli
  const xP = seg(t, 140, 970)
  const jx = arcPoint(arcExtract, xP)
  const juliD = lerp(JULI_EXTRACT.from.d, JULI_EXTRACT.to.d, xP)
  s.juli = { cx: jx.x, cy: jx.y, d: juliD, opacity: 1, monoMaskP: 1, glow: 1, visible: true }

  // Anotación compacta → Educación Física
  const anP = seg(t, 0, 670)
  const anX = lerp(GROUP_PIVOT_D.x, 390, anP)
  const anY = lerp(GROUP_PIVOT_D.y, 420, anP)
  const anPrefix = 1 - seg(t, 270, 570)
  s.annotation = {
    x: anX, y: anY, opacity: 1, juliPrefix: anPrefix,
    accentOpacity: ACCENT_CONTEXT.opacity, visible: true,
    ...annotationTexts(anX, anY, anPrefix, 1),
  }

  // Reubicación de contextos
  const shP = seg(t, 80, 710)
  s.shopping.cx = lerp(CONTEXT_SHOPPING.cx, 960, shP)
  s.shopping.cy = lerp(CONTEXT_SHOPPING.cy, 420, shP)
  s.shopping.opacity = 1; s.shopping.glyphOpacity = 1; s.shopping.glyphScale = 1
  s.shopping.textOpacity = 1; s.shopping.accentP = 1; s.shopping.blur = 0; s.shopping.visible = true
  s.shopping.text = contextTitle('Compra semanal', CONTEXT_SHOPPING.size, s.shopping.cx, s.shopping.cy + 34, 1, 0)

  const enP = seg(t, 150, 780)
  s.encounter.cx = lerp(CONTEXT_ENCOUNTER.cx, 1530, enP)
  s.encounter.cy = lerp(CONTEXT_ENCOUNTER.cy, 420, enP)
  s.encounter.opacity = 1; s.encounter.glyphOpacity = 1; s.encounter.glyphScale = 1
  s.encounter.textOpacity = 1; s.encounter.accentP = 1; s.encounter.blur = 0; s.encounter.visible = true
  s.encounter.text = contextTitle('Un encuentro', CONTEXT_ENCOUNTER.size, s.encounter.cx, s.encounter.cy + 34, 1, 0)

  // Avatar B
  const bP = seg(t, 360, 780)
  s.memberB = { cx: MB.cx, cy: lerp(805, MB.cy, bP), d: MEMBER_AVATAR.d, opacity: bP, inner: seg(t, 430, 780), visible: bP > 0.001 }

  // Avatar C
  const cP = seg(t, 430, 850)
  s.memberC = { cx: MC.cx, cy: lerp(805, MC.cy, cP), d: MEMBER_AVATAR.d, opacity: cP, inner: seg(t, 500, 850), visible: cP > 0.001 }

  // Conexiones individuales (anclaje dinámico)
  const connDraw = seg(t, 730, 1100)
  const mkConn = (ctxX: number, ctxY: number, avX: number, avY: number, avD: number) => {
    const startX = ctxX
    const startY = ctxY + 122
    const endX = avX
    const endY = avY - avD / 2
    const c1x = startX; const c1y = startY + 78
    const c2x = endX; const c2y = endY - 57
    const d = `M${startX.toFixed(1)} ${startY.toFixed(1)} C${c1x.toFixed(1)} ${c1y.toFixed(1)} ${c2x.toFixed(1)} ${c2y.toFixed(1)} ${endX.toFixed(1)} ${endY.toFixed(1)}`
    return { d, drawP: connDraw, opacity: THREAD_STYLE.opacity, visible: connDraw > 0.001 }
  }
  s.connectors = [
    mkConn(s.annotation.x, s.annotation.y, s.juli.cx, s.juli.cy, s.juli.d),
    mkConn(s.shopping.cx, s.shopping.cy, s.memberB.cx, s.memberB.cy, s.memberB.d),
    mkConn(s.encounter.cx, s.encounter.cy, s.memberC.cx, s.memberC.cy, s.memberC.d),
  ]

  // Referencia común del hogar
  s.home.drawP = seg(t, 830, 1130)
  s.home.curveOpacity = 0.55 * s.home.drawP
  const hLabelP = seg(t, 950, 1170)
  s.home.label = txt('UN MISMO HOGAR', { ...HOME_LABEL, y: lerp(HOME_LABEL.y + 10, HOME_LABEL.y, hLabelP) }, HOME_LABEL.size, W400, HOME_LABEL.tracking, TYPE_GRAY, HOME_LABEL.opacity * hLabelP, 0, 'center', 1)
  return s
}

// --- STEP 8 — Autonomía como consecuencia --------------------------------------
function step8(t: number): SceneState {
  const s = baseState(8, t)

  // Acto A — Claridad (100–670)
  const aP = seg(t, 100, 670)
  const juliConnOp = lerp(THREAD_STYLE.opacity, 0.92, aP)
  const bcConnOp = lerp(THREAD_STYLE.opacity, 0.42, aP)
  const bcIntensity = lerp(1, 0.78, aP)
  const accentOp = lerp(ACCENT_CONTEXT.opacity, 0.85, aP)

  // Respuesta del contexto (1050–1320)
  const rP = seg(t, 1050, 1320)
  const juliConnOp2 = lerp(juliConnOp, 1, rP)
  const accentOp2 = lerp(accentOp, 1, rP)

  // Acto C — Recuperar equilibrio (1260–1850)
  const cP = seg(t, 1260, 1850)
  const juliConnFinal = lerp(juliConnOp2, THREAD_STYLE.opacity, cP)
  const bcConnFinal = lerp(bcConnOp, THREAD_STYLE.opacity, cP)
  const bcIntensityFinal = lerp(bcIntensity, 1, cP)
  const accentFinal = lerp(accentOp2, ACCENT_CONTEXT.opacity, cP)

  s.lockup = { ...lockupTarget(), opacity: 1, visible: true }
  s.heading = txt('La vida del hogar', HEADING_COMPACT, HEADING_COMPACT.size, W600, HEADING_COMPACT.tracking, TYPE_WHITE, 1, 0, 'left', 1)

  // Composición base del step 7 (estable)
  s.juli = { cx: 390, cy: 785, d: 96, opacity: 1, monoMaskP: 1, glow: 1, visible: true }
  s.annotation = {
    x: 390, y: 420, opacity: 1, juliPrefix: 0, accentOpacity: accentFinal, visible: true,
    ...annotationTexts(390, 420, 0, 1),
  }
  s.shopping = {
    cx: 960, cy: 420, opacity: bcIntensityFinal, glyphOpacity: 1, glyphScale: 1,
    textOpacity: 1, accentP: 1, blur: 0, visible: true,
    text: contextTitle('Compra semanal', CONTEXT_SHOPPING.size, 960, 420 + 34, 1, 0),
  }
  s.encounter = {
    cx: 1530, cy: 420, opacity: bcIntensityFinal, glyphOpacity: 1, glyphScale: 1,
    textOpacity: 1, accentP: 1, blur: 0, visible: true,
    text: contextTitle('Un encuentro', CONTEXT_ENCOUNTER.size, 1530, 420 + 34, 1, 0),
  }
  s.memberB = { cx: MB.cx, cy: MB.cy, d: 96, opacity: 1, inner: 1, visible: true }
  s.memberC = { cx: MC.cx, cy: MC.cy, d: 96, opacity: 1, inner: 1, visible: true }
  s.home.drawP = 1; s.home.curveOpacity = 0.55
  s.home.label = txt('UN MISMO HOGAR', HOME_LABEL, HOME_LABEL.size, W400, HOME_LABEL.tracking, TYPE_GRAY, HOME_LABEL.opacity, 0, 'center', 1)

  // Conexiones finales
  const vConn = (x: number): { d: string; drawP: number; opacity: number; visible: boolean } => ({ d: `M${x} ${CONNECTOR_BOTTOM_Y} C${x} 620 ${x} 680 ${x} ${CONNECTOR_TOP_Y}`, drawP: 1, opacity: THREAD_STYLE.opacity, visible: true })
  const conns = [vConn(390), vConn(960), vConn(1530)]
  conns[0]!.opacity = juliConnFinal
  conns[1]!.opacity = bcConnFinal
  conns[2]!.opacity = bcConnFinal
  s.connectors = conns

  // Señal de participación (650–1170): asciende por la conexión de Juli
  const sigP = seg(t, 650, 1170)
  const sigOpacity = seg(t, 650, 730) * (1 - seg(t, 1070, 1170))
  if (sigOpacity > 0.001) {
    const pos = arcPoint(arcJuliVertical, 1 - sigP)
    s.signal = { x: pos.x, y: pos.y, opacity: sigOpacity, d: SIGNAL.d, visible: true }
  }

  // Título Más autonomía (1500–2050)
  const tA = seg(t, 1500, 2050)
  s.titleAutonomy = txt('Más autonomía', { ...TITLE_AUTONOMY, y: lerp(221, TITLE_AUTONOMY.y, tA) }, TITLE_AUTONOMY.size, W600, 0, TYPE_WHITE, tA, 1 * (1 - tA), 'center', seg(t, 1500, 1980))
  return s
}

// --- STEP 9 — La complejidad se convierte en una idea clara ----------------------
function step9(t: number): SceneState {
  const s = baseState(9, t)

  // Bloque superior de marca (lockup + encabezado): se retira 850–1190 ms.
  const brandFade = 1 - seg(t, 850, 1190)
  s.lockup = { ...lockupTarget(), opacity: brandFade, visible: brandFade > 0.001 }
  s.heading = txt('La vida del hogar', HEADING_COMPACT, HEADING_COMPACT.size, W600, HEADING_COMPACT.tracking, TYPE_WHITE, brandFade, 0, 'left', 1)

  // Titular: cruce Más autonomía → Organización compartida
  const outA = seg(t, 90, 380)
  s.titleAutonomy = txt('Más autonomía', { ...TITLE_AUTONOMY, y: lerp(TITLE_AUTONOMY.y, 193, outA) }, TITLE_AUTONOMY.size, W600, 0, TYPE_WHITE, 1 - outA, 1 * outA, 'center', 1)
  const inB = seg(t, 210, 550)
  s.titleShared = txt('Organización compartida', { ...TITLE_SHARED, y: lerp(221, TITLE_SHARED.y, inB) }, TITLE_SHARED.size, W600, 0, TYPE_WHITE, inB, 1 * (1 - inB), 'center', 1)
  const outB = seg(t, 930, 1230)
  s.titleShared.opacity = 1 - outB
  s.titleShared.y = lerp(TITLE_SHARED.y, TITLE_SHARED.y - 10, outB)

  // Retirada de información
  const txtFade = 1 - seg(t, 520, 900)
  const txtY = -8 * seg(t, 520, 900)
  s.annotation = {
    x: 390, y: 420 + txtY, opacity: txtFade, juliPrefix: 0,
    accentOpacity: ACCENT_CONTEXT.opacity * txtFade, visible: txtFade > 0.001,
    ...annotationTexts(390, 420 + txtY, 0, txtFade),
  }
  const glyphFade = 1 - seg(t, 600, 1000)
  s.shopping.cx = 960
  s.shopping.cy = 420
  s.encounter.cx = 1530
  s.encounter.cy = 420
  s.shopping.opacity = 1
  s.shopping.textOpacity = txtFade
  s.shopping.accentP = txtFade
  s.shopping.visible = true
  s.shopping.glyphOpacity = glyphFade
  s.shopping.glyphScale = lerp(1, 0.97, seg(t, 600, 1000))
  s.shopping.text = contextTitle('Compra semanal', CONTEXT_SHOPPING.size, s.shopping.cx, s.shopping.cy + 34, txtFade, 0)
  s.encounter.opacity = 1
  s.encounter.textOpacity = txtFade
  s.encounter.accentP = txtFade
  s.encounter.visible = true
  s.encounter.glyphOpacity = glyphFade
  s.encounter.glyphScale = lerp(1, 0.97, seg(t, 600, 1000))
  s.encounter.text = contextTitle('Un encuentro', CONTEXT_ENCOUNTER.size, s.encounter.cx, s.encounter.cy + 34, txtFade, 0)

  // Conexiones
  const connFade = 1 - seg(t, 700, 1080)
  const vConn = (x: number) => ({ d: `M${x} ${CONNECTOR_BOTTOM_Y} C${x} 620 ${x} 680 ${x} ${CONNECTOR_TOP_Y}`, drawP: 1, opacity: THREAD_STYLE.opacity * connFade, visible: connFade > 0.001 })
  s.connectors = [vConn(390), vConn(960), vConn(1530)]

  // Avatares
  const avFade = 1 - seg(t, 800, 1160)
  const avScale = lerp(1, 0.96, seg(t, 800, 1160))
  s.juli = { cx: 390, cy: 785, d: 96 * avScale, opacity: avFade, monoMaskP: 1, glow: 1, visible: avFade > 0.001 }
  s.memberB = { cx: MB.cx, cy: MB.cy, d: 96 * avScale, opacity: avFade, inner: avFade, visible: avFade > 0.001 }
  s.memberC = { cx: MC.cx, cy: MC.cy, d: 96 * avScale, opacity: avFade, inner: avFade, visible: avFade > 0.001 }

  // Línea inferior + etiqueta
  const homeFade = 1 - seg(t, 800, 1150)
  s.home.drawP = 1; s.home.curveOpacity = 0.55 * homeFade
  s.home.label = txt('UN MISMO HOGAR', HOME_LABEL, HOME_LABEL.size, W400, HOME_LABEL.tracking, TYPE_GRAY, HOME_LABEL.opacity * homeFade, 0, 'center', 1)

  // Isotipo
  const iP = seg(t, 1070, 1470)
  s.isotipo = {
    x: ISOTYPE_BOX.x, y: ISOTYPE_BOX.y, s: lerp(0.94, 1, iP),
    opacity: iP, blur: 1.2 * (1 - iP), visible: iP > 0.001,
  }
  return s
}

// --- STEP 10 — Travelling final de una sola pieza --------------------------------
function step10(t: number): SceneState {
  const s = baseState(10, t)
  s.lockup.visible = false
  const z = zoomAt(t)
  s.zoom = { tx: z.tx, ty: z.ty, s: z.s }
  s.isotipo = { x: ISOTYPE_BOX.x, y: ISOTYPE_BOX.y, s: 1, opacity: 1, blur: z.blur, visible: true }
  s.veil = seg(t, 980, 1100)
  return s
}

// --- Dispatcher -----------------------------------------------------------------
const STEPS = [step1, step2, step3, step4, step5, step6, step7, step8, step9, step10]

export function computeScene(step: number, p: number): SceneState {
  const idx = Math.min(Math.max(step - 1, 0), STEPS.length - 1)
  const t = clamp01(p) * STEP_MS[idx]!
  return STEPS[idx]!(t)
}

export { STEP_MS, S_FINAL, Q0, WHITE_R, arcJuli, arcTime, arcAction, arcInfo, arcExtract, arcHome }
