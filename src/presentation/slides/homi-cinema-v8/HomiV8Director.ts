// HOMIE V8 — Director escénico (lógica pura, sin JSX).
// El director controla composición activa, datos visibles, fase de movimiento,
// rectángulos, máscaras, hold final y reconstrucción para navegación.
// No decide contenidos nuevos ni interpreta el guion en tiempo de ejecución.

import {
  D1_LABEL,
  PLANNER_AFTER_CONFIRM,
  PROFILE_ANSWERS,
  TOMORROW_QUESTION,
  beatIndex,
  demoStateFor,
  sceneFor,
  type HomiV8Beat,
} from './homiV8Data'

// ---------------------------------------------------------------------------
// Fases de movimiento: cada disparador puede tener microfases temporizadas.
// Los umbrales se expresan en ms y nunca exigen pulsaciones adicionales.
// ---------------------------------------------------------------------------
export type MotionPhase = 'enter' | 'hold'

export const V8_TIMING = {
  enter: {
    homiAppear: 450,
    composerFocus: 180,
    typingPerSegment: [350, 800, 1350] as const,
    sendTravel: 400,
    thinking: 520,
    proposalReveal: 550,
    confirmPress: 155,
    plannerMorph: 1100,
    carouselFrame: 480,
    carouselSwap: 380,
    homiReturn: 500,
    finTyping: 900,
    finProposal: 700,
    blackout: 550,
    lowExposure: 450,
    orbitPiece: 260,
    converge: 700,
    question: 1050,
    perspectives: 450,
    answers: 650,
    lockup: 600,
    homeReveal: 1550,
  },
  hold: 'indefinido: la pantalla espera el próximo avance',
} as const

// ---------------------------------------------------------------------------
// Contratos de geometría (lienzo runtime 1280×720 = master 1920×1080 × 2/3).
// Todas las coordenadas del master se expresan ×2/3. Fuente: contrato V8 §5–27.
// ---------------------------------------------------------------------------
export const V8_GEOMETRY = {
  /** Homi vacío (P01): una única superficie, intencionalmente vacía. */
  homiEmpty: { left: 160, top: 123, width: 960, height: 473 },
  /** Homi conversacional (P03–P06): crece solo durante el envío y queda estable. */
  homiConversational: { left: 155, top: 80, width: 970, height: 550 },
  /** Burbuja destino del mensaje Coca (P03). */
  cocaBubble: { centerX: 940, top: 207, maxWidth: 507 },
  /** Propuesta Coca (P05): nace donde Homi responde, dentro del panel. */
  proposalCoca: { left: 297, top: 323, width: 687, height: 217 },
  /** Propuesta multiacción financiera (P14): amplia, sin scroll. */
  proposalFinance: { left: 250, top: 277, width: 780, height: 290 },
  /** Composición transitoria del morph Coca→Planner (P07). */
  morph: {
    homi: { left: 80, top: 90, width: 470, height: 540 },
    planner: { left: 567, top: 90, width: 640, height: 540 },
  },
  /** Contenedor editorial del carrusel (P08–P10): único, inmóvil. */
  carousel: { left: 180, top: 137, width: 920, height: 447 },
  /** Homi de regreso tras el carrusel (P11). */
  homiReturn: { left: 160, top: 107, width: 960, height: 507 },
  /** Homi low exposure (P16): mismo lenguaje, menor protagonismo. */
  homiLow: { left: 193, top: 130, width: 893, height: 460 },
  /** Centros de las piezas contextuales (P17), verificados contra zonas protegidas. */
  context: {
    tareas: { centerX: 287, centerY: 287 },
    gastos: { centerX: 680, centerY: 250 },
    compras: { centerX: 917, centerY: 427 },
    plate: 160,
  },
  /** Convergencia (P18): hacia la identidad de Homi, medida realmente. */
  convergeTarget: { centerX: 320, centerY: 160 },
  /** Pregunta única (P19–P21): zona superior centrada. */
  question: { centerX: 640, top: 112, maxWidth: 1250, fontSize: 42 },
  /** Tres perspectivas (P20–P21): mismos gaps, misma estructura. */
  perspectives: {
    panelWidth: 360,
    panelHeight: 390,
    top: 220,
    lefts: [73, 460, 847],
    gap: 27,
  },
  /** Lockup (P22): logos auténticos + signo ondulado. */
  lockup: {
    homi: { centerX: 367, centerY: 360, width: 300, height: 100 },
    homeplus: { centerX: 913, centerY: 360, width: 300, height: 100 },
    sign: { centerX: 640, centerY: 360, width: 90, height: 57 },
  },
  /** Home final (P23): lienzo completo 16:9. */
  homeFinal: { left: 0, top: 0, width: 1280, height: 720 },
} as const

// ---------------------------------------------------------------------------
// Resolución de escena: qué escena se monta y con qué datos visibles.
// ---------------------------------------------------------------------------
export type SceneResolution = {
  beat: HomiV8Beat
  scene: ReturnType<typeof sceneFor>
  state: ReturnType<typeof demoStateFor>
  motion: MotionPhase
  /** Tareas visibles en Planner para el beat (una sola Coca). */
  plannerTasks: readonly typeof PLANNER_AFTER_CONFIRM
  /** Respuestas visibles (siempre las tres, con datos congelados). */
  profileAnswers: typeof PROFILE_ANSWERS
}

export function resolveScene(beat: HomiV8Beat): SceneResolution {
  return {
    beat,
    scene: sceneFor(beat),
    state: demoStateFor(beat),
    motion: 'enter',
    plannerTasks: PLANNER_AFTER_CONFIRM,
    profileAnswers: PROFILE_ANSWERS,
  }
}

/** Pregunta única de consulta: idéntica en las tres perspectivas. */
export const questionText = TOMORROW_QUESTION

/** Referencia temporal compartida: idéntica en las tres tarjetas. */
export const whenRef = D1_LABEL

export function isQuestionVisible(beat: HomiV8Beat): boolean {
  return beatIndex(beat) >= beatIndex('P19') && beatIndex(beat) <= beatIndex('P21')
}

/** El beat P15 es el único negro absoluto: sin step extra ni duplicados. */
export function isBlackout(beat: HomiV8Beat): boolean {
  return beat === 'P15'
}
