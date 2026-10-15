// S01 CINEMATIC V3.0 — configuración declarativa de la secuencia de 6 beats.
// Todo lo que la state machine necesita está descrito acá: anchors de cámara,
// tiempos locales por beat, ángulos de puertas, trayectorias de documentación,
// emisión de humo y poses de acumulación. Sin números mágicos sueltos.

export type Vec3 = [number, number, number]

export const DEG = Math.PI / 180

/* ------------------------------------------------------------------ */
/* CÁMARA — una sola PerspectiveCamera, FOV fijo 36° en todo S01.     */
/* Los acercamientos son movimientos físicos (position + target).     */
/* ------------------------------------------------------------------ */

export const s01Anchors = {
  // Preposición silenciosa durante el negro (microdolly de entrada).
  A_INSURANCE_PRE: { pos: [-0.08, 1.38, 0.78] as Vec3, target: [-0.38, 0.92, -0.18] as Vec3 },
  // S01.1 — close-up póliza + llaves desde la izquierda: llaves en
  // primer plano, hoja completa al centro. Bowl queda tras cámara;
  // teléfono sale por borde derecho. Oblicuo leve, sin cenital.
  A_INSURANCE: { pos: [-0.62, 1.46, 0.34] as Vec3, target: [-0.18, 0.915, -0.3] as Vec3 },
  // S01.2 — cavidad protagonista; encuadre desplazado a derecha para dejar
  // fuera el vano oscuro (-2.46). Mira volumen vacío, no puertas.
  A_PANTRY: { pos: [-0.22, 1.68, 0.05] as Vec3, target: [-0.7, 1.62, -2.7] as Vec3 },
  // S01.3 — heladera COMPLETA: top+seam+base+4-6% piso. Leve 3/4 (5-8°).
  // Desde la derecha: las hojas negras de pantry salen por borde izquierdo.
  A_FRIDGE: { pos: [1.3, 1.38, 2.3] as Vec3, target: [1.82, 0.84, -2.5] as Vec3 },
  // S01.4 — hero wide: atrás + derecha + arriba para que entre fridge completa.
  // FOV sigue 36°. Clusters A/B/C separados con aire negativo.
  A_WIDE: { pos: [2.5, 1.82, 3.35] as Vec3, target: [0.15, 0.72, -0.6] as Vec3 },
  // S01.5 — inicio del dive continuo (no es endpoint perceptible).
  A_PHONE: { pos: [0.167, 1.24, 0.215] as Vec3, target: [0.1, 0.918, -0.02] as Vec3 },
} as const

/** Pila de acumulación sobre la isla: visible desde WIDE, separada del
 *  teléfono (fuera de PHONE_CLEAR_ZONE), no tapa llaves. */
export const s01AccumulationStack = [-0.18, 0.918, -0.44] as Vec3

export type AnchorName = keyof typeof s01Anchors

/** Anchor por step: dónde queda la cámara en el F100 de cada beat. */
export const s01AnchorByStep: AnchorName[] = [
  'A_INSURANCE_PRE',
  'A_INSURANCE',
  'A_PANTRY',
  'A_FRIDGE',
  'A_WIDE',
  'A_PHONE',
]

/* ------------------------------------------------------------------ */
/* GEOMETRÍA DE REFERENCIA — posiciones físicas del set actual          */
/* (derivadas del mundo CURRENT: no hay magic numbers sueltos)       */
/* ------------------------------------------------------------------ */

export const s01Geo = {
  counterTopY: 0.915, // mesada de la isla (y = 0.915)
  backCounterTopY: 0.902, // mesada del fondo
  /** Alacenas superiores del set CURRENT: dos cuerpos (A doble + B simple).
   *  HERO RIG V4.0 — puertas con espesor, bisagra real y cavidad física.
   *  A_LEFT:  hinge en borde exterior izquierdo de PANTRY_A, abre screen-left.
   *  A_RIGHT: hinge en borde exterior derecho de PANTRY_A, abre screen-right.
   *  B_RIGHT: hinge en borde exterior derecho de PANTRY_B, abre screen-right.
   *  dirX = lado hacia el que se extiende la hoja cerrada (+1:+x, -1:-x).
   *  open = pose narrativa final (rad, con signo de rotación Y ya aplicado). */
  pantry: {
    y: 1.95,
    doorZ: -2.6725,
    frontZ: -2.7,
    leafA_L: { hingeX: -2.27, width: 0.61, dirX: 1, open: -78 * DEG, physical: 82 * DEG },
    leafA_R: { hingeX: -1.05, width: 0.61, dirX: -1, open: 76 * DEG, physical: 80 * DEG },
    leafB_R: { hingeX: 0.25, width: 1.22, dirX: -1, open: 72 * DEG, physical: 76 * DEG },
  },
  /** Heladera: grupo en (1.75, 0.925, -2.55). Puertas con bisagra real.
   *  HERO RIG V4.2 — TOP físico 0–24° (peak 24°, settled 16°),
   *  BOTTOM físico 0–18° (peak 18°, settled 12°): F100 dañado/entreabierto
   *  legible (la coreografía microtirón→golpe→pop→settle se preserva). */
  fridge: {
    group: [1.75, 0.925, -2.55] as Vec3,
    hingeX: 0.425,
    hingeZ: 0.385,
    topCenterY: 0.6625,
    topHeight: 0.525,
    botCenterY: -0.2625,
    botHeight: 1.325,
    topRest: 16 * DEG,
    botRest: 12 * DEG,
    topMax: 24 * DEG,
    botMax: 18 * DEG,
    topRebound: 11 * DEG,
    botRebound: 8 * DEG,
  },
  /** Sector documental contiguo: cajón prismático próximo a heladera.
   *  HERO RIG V4.0 — DRAWER_SLIDE se mueve sólo en eje frontal local.
   *  Físico 0–0.28 m, narrativo 0.24 m, sin rotación ni drift. */
  docTower: {
    group: [0.85, 0, -2.72] as Vec3,
    drawerHinge: [0.85, 0.6, -2.44] as Vec3,
    drawerTravel: 0.24,
    drawerPhysical: 0.28,
  },
  /** Boca del cajón de donde sale la documentación. */
  docMouth: [0.85, 0.76, -2.36] as Vec3,
  /** Teléfono HERO face-up sobre la isla (pantalla apagada todo S01).
   *  Orientación física V4.0: top hacia fondo de cocina (-z), bottom hacia
   *  audiencia (+z), pitch/roll ≈ 0, yaw natural 8° (0.14 rad). */
  phone: {
    group: [0.1, 0.915, -0.02] as Vec3,
    yaw: 0.14,
    bodySize: [0.075, 0.0085, 0.152] as Vec3,
    screenSize: [0.066, 0.142] as [number, number],
    screenY: 0.9207,
  },
  /** Poliza + sello VENCIDO (la hoja vive en la mesada, no es UI).
   *  Sello ~22% del ancho de hoja, centrado bajo el título. */
  policy: {
    group: [-0.05, 0, -0.38] as Vec3,
    yaw: 0.1,
    stampY: 0.9295,
    stampX: 0.0,
    stampZ: 0.045,
    stampSize: [0.15, 0.05] as [number, number],
    stampRot: -7 * DEG,
  },
  keys: [-0.33, 0.915, 0.02] as Vec3,
  bag: [-2.0, 0.9, -2.68] as Vec3,
  listHome: [-1.62, 0.9025, -2.42] as Vec3,
  /** COMPRAS en la pila: capa upper-middle, asoma título. Isla, sobre stack. */
  listAccum: [-0.09, 0.968, -0.4] as Vec3,
} as const

/** Anchor del plano de pantalla del teléfono (handoff futuro a S02). */
export const s01PhoneScreen = {
  position: [s01Geo.phone.group[0], s01Geo.phone.screenY, s01Geo.phone.group[2]] as Vec3,
  yaw: s01Geo.phone.yaw,
  width: s01Geo.phone.screenSize[0],
  height: s01Geo.phone.screenSize[1],
}

/* ------------------------------------------------------------------ */
/* DOCUMENTACIÓN — 6 hojas + 1 manual, con origen, destino y acumul.  */
/* No salen del freezer: nacen del sector documental contiguo.        */
/* ------------------------------------------------------------------ */

export type DocSpec = {
  origin: Vec3
  controlA: Vec3
  controlB: Vec3
  land: Vec3
  accum: Vec3
  originRot: Vec3
  landRot: Vec3
  accumRot: Vec3
  /** ms desde FRIDGE_EVENT_START (contrato §38). */
  release: number
  dur: number
  arc: number
  manual?: boolean
  /** DOC_05: queda colgando del módulo (35–45% fuera, sin vuelo). */
  hang?: boolean
}

const J = 0.075
// WARRANTY SEARCH (contrato V4.2 §13-17): los documentos NO son consecuencia
// física de la rotura. Drawer abre → pila revelada → slides/fan cortos cerca
// del área documental. Sin arcos grandes, sin explosión, sin spinning.
// Lands: 2-3 en drawer/entorno, 2 sobre back-counter próxima, 1 colgando,
// 1 en piso bajo cercano. Todo a <1m del módulo documental.
// Accums: convergen a A_ACCUMULATION_STACK [-0.18,0.918,-0.44] con offsets
// 0.02-0.06m y rot ±3-9°. DOC_05 queda colgando (no apila).
export const s01Docs: DocSpec[] = [
  // DOC_01 GARANTÍA TELEVISOR — slide corto a back-counter próxima.
  {
    origin: [0.85 - J, 0.76, -2.36],
    controlA: [0.7, 0.82, -2.44],
    controlB: [0.5, 0.88, -2.5],
    land: [0.35, 0.9045, -2.55],
    accum: [-0.14, 0.944, -0.37],
    originRot: [-0.5, 0.2, 0.1],
    landRot: [0, 0.3, 0],
    accumRot: [0, -0.12, 0],
    release: 780,
    dur: 420,
    arc: 0.07,
  },
  // DOC_02 GARANTÍA LAVARROPAS — back-counter, fan leve.
  {
    origin: [0.85 - J * 0.4, 0.78, -2.36],
    controlA: [0.68, 0.84, -2.44],
    controlB: [0.4, 0.88, -2.5],
    land: [0.05, 0.9045, -2.5],
    accum: [-0.23, 0.95, -0.4],
    originRot: [-0.55, 0.35, -0.1],
    landRot: [0, 0.5, 0],
    accumRot: [0, 0.1, 0],
    release: 860,
    dur: 430,
    arc: 0.08,
  },
  // DOC_03 GARANTÍA MICROONDAS — cae a piso bajo cercano (no cruza cocina).
  {
    origin: [0.85 - J * 0.1, 0.75, -2.36],
    controlA: [0.95, 0.6, -2.3],
    controlB: [1.05, 0.3, -2.15],
    land: [1.15, 0.0035, -2.0],
    accum: [-0.25, 0.938, -0.46],
    originRot: [-0.6, 0.1, 0.15],
    landRot: [0, 0.4, 0],
    accumRot: [0, -0.06, 0],
    release: 940,
    dur: 450,
    arc: 0.09,
  },
  // DOC_04 GARANTÍA AIRE ACOND. — superficie próxima derecha.
  {
    origin: [0.85 + J * 0.2, 0.77, -2.36],
    controlA: [0.75, 0.83, -2.45],
    controlB: [0.62, 0.88, -2.52],
    land: [0.55, 0.9045, -2.58],
    accum: [-0.12, 0.956, -0.49],
    originRot: [-0.5, -0.25, -0.12],
    landRot: [0, -0.3, 0],
    accumRot: [0, 0.14, 0],
    release: 1020,
    dur: 430,
    arc: 0.07,
  },
  // DOC_05 GARANTÍA CAFETERA — queda colgando del módulo (35–45% fuera).
  {
    origin: [0.85 + J * 0.35, 0.74, -2.36],
    controlA: [0.87, 0.66, -2.35],
    controlB: [0.86, 0.58, -2.34],
    land: [0.85, 0.52, -2.33],
    accum: [0.85, 0.52, -2.33],
    originRot: [-0.6, 0.05, 0.1],
    landRot: [0.5, 0.12, 0.18],
    accumRot: [0.5, 0.12, 0.18],
    release: 1150,
    dur: 320,
    arc: 0.06,
    hang: true,
  },
  // DOC_06 GARANTÍA ASPIRADORA — borde de isla cercano al stack (trayecto plausible).
  {
    origin: [0.85 + J * 0.6, 0.75, -2.36],
    controlA: [0.6, 0.9, -2.0],
    controlB: [0.1, 0.94, -1.0],
    land: [-0.35, 0.9185, -0.6],
    accum: [-0.15, 0.962, -0.38],
    originRot: [-0.55, -0.15, -0.1],
    landRot: [0, -0.2, 0],
    accumRot: [0, -0.1, 0],
    release: 1080,
    dur: 480,
    arc: 0.1,
  },
  // MANUAL — más pesado: arco bajo, piso cercano, apila en base del stack.
  {
    origin: [0.85 + J * 0.8, 0.73, -2.36],
    controlA: [1.0, 0.6, -2.2],
    controlB: [1.2, 0.25, -2.0],
    land: [1.35, 0.0085, -1.7],
    accum: [-0.21, 0.92, -0.45],
    originRot: [-0.5, 0.2, 0.05],
    landRot: [0, -0.5, 0],
    accumRot: [0, 0.08, 0],
    release: 1000,
    dur: 460,
    arc: 0.08,
    manual: true,
  },
]

/** Dos recibos/documentos secundarios: base de la pila (isla, sobre stack). */
export const s01Loose = [
  {
    home: [0.66, 0.9175, -0.24] as Vec3,
    homeRot: [0, -0.15, 0] as Vec3,
    accum: [-0.24, 0.926, -0.4] as Vec3,
    accumRot: [0, 0.09, 0] as Vec3,
  },
  {
    home: [0.76, 0.921, -0.1] as Vec3,
    homeRot: [0, 0.32, 0] as Vec3,
    accum: [-0.12, 0.932, -0.48] as Vec3,
    accumRot: [0, -0.07, 0] as Vec3,
  },
]

/* ------------------------------------------------------------------ */
/* HUMO — 5 puffs evento V4.0. Opacidad máxima ≤ 0.30.                  */
/* REGLA ABSOLUTA: en cualquier HOLD, SMOKE OPACITY = 0 (residual 0).   */
/* ------------------------------------------------------------------ */

export const s01Smoke = [
  { origin: [1.48, 1.86, -2.42] as Vec3, rise: 0.34, drift: -0.08, start: 340, life: 650, residual: 0 },
  { origin: [1.86, 1.84, -2.46] as Vec3, rise: 0.3, drift: 0.07, start: 465, life: 720, residual: 0 },
  { origin: [1.63, 1.92, -2.55] as Vec3, rise: 0.42, drift: -0.03, start: 590, life: 680, residual: 0 },
  { origin: [2.02, 1.8, -2.6] as Vec3, rise: 0.26, drift: 0.09, start: 755, life: 620, residual: 0 },
  { origin: [1.36, 1.78, -2.34] as Vec3, rise: 0.24, drift: -0.1, start: 1050, life: 510, residual: 0 },
]

export const s01SmokeMaxOpacity = 0.3

/* ------------------------------------------------------------------ */
/* TIMELINES — milisegundos locales del beat.                         */
/* ------------------------------------------------------------------ */

export const s01Timings = {
  enter1: { blackout: [0, 280] as [number, number], cam: [60, 500] as [number, number] },
  enter2: {
    cam: [0, 680] as [number, number],
    doors: [
      [170, 570] as [number, number],
      [235, 590] as [number, number],
      [305, 610] as [number, number],
    ],
  },
  // Beat 3 — timeline físico (§38-41) + micro-pausa 100-180ms tras el fallo.
  // Cámara asentada en 590ms (transición Pantry→Fridge 550-630ms, §31).
  // Drawer abre tras settle; docs liberan 780+ (búsqueda, no explosión).
  fridgeFail: {
    cam: [0, 590] as [number, number],
    tug: [90, 190] as [number, number],
    golpe: [205, 255] as [number, number],
    rebound: [255, 310] as [number, number],
    recover: [310, 375] as [number, number],
    topDoorPeak: [290, 430] as [number, number],
    topDoorMid: [430, 575] as [number, number],
    topDoorRest: [575, 735] as [number, number],
    botDoorPeak: [315, 445] as [number, number],
    botDoorMid: [445, 590] as [number, number],
    botDoorRest: [590, 735] as [number, number],
    drawerA: [375, 455] as [number, number],
    drawerB: [455, 690] as [number, number],
    drawerC: [690, 760] as [number, number],
    settled: 1250,
    manualSettled: 1450,
    smokeDead: 1560,
    end: 1650,
  },
  enter4: { cam: [0, 730] as [number, number] },
  // Beat 5 — acumulación (0-700, §26) + HOLD pila 250-300ms (§29) + DIVE
  // CONTINUO único 1350ms (§32-36: WIDE→BLACK sin staging perceptible).
  // dive=[1000,2350]: arranca tras HOLD, velocity 0 sólo en BLACK.
  enter5: {
    docs: [0, 700] as [number, number],
    docsStagger: 45,
    loose: [0, 660] as [number, number],
    list: [180, 640] as [number, number],
    policy: [260, 700] as [number, number],
    holdUntil: 1000,
    staging: [1000, 1001] as [number, number],
    portal: [1000, 2350] as [number, number],
  },
  reverse: {
    pantry: [320, 380] as [number, number],
    docsBack: [420, 520] as [number, number],
    cam: [0, 520] as [number, number],
    state: [0, 450] as [number, number],
    blackout: [0, 300] as [number, number],
  },
  reduced: { snap: 120 },
} as const

/** Duración total aproximada de cada beat (para el render loop en demand). */
export const s01BeatDuration = [300, 650, 730, 1700, 780, 2950]

/* ------------------------------------------------------------------ */
/* PHONE PORTAL V4.0 — la cámara se acerca físicamente (§74–§84).       */
/* Sin fade, sin overlay, sin scale del teléfono, sin FOV zoom.        */
/* El teléfono queda quieto; el screen negro llena el frustum (108%).  */
/* ------------------------------------------------------------------ */

/** Zona protegida alrededor del teléfono: 1.35×w × 1.25×h. */
export const s01PhoneClearZone = { w: 1.35, h: 1.25 } as const

export const s01Portal = {
  fov: 36,
  near: 0.015,
  /** PHONE_SCREEN = 116% del viewport en ambos ejes: garantiza EDGES
   *  ±8% (margen negro real en los 4 lados, §37). Desviación intencional
   *  sobre el 112-115% nominal — el criterio de bordes domina. */
  overscan: 1.16,
  /** Fases solapadas P1–P4 (§80–§84), ms desde el inicio del portal. */
  commit: [0, 180] as [number, number],
  approach: [180, 500] as [number, number],
  align: [380, 720] as [number, number],
  entry: [650, 920] as [number, number],
  /** Tolerancias angulares finales: roll < 0.25°, yaw/pitch < 0.5°. */
  rollTol: 0.25 * DEG,
  yawTol: 0.5 * DEG,
  pitchTol: 0.5 * DEG,
} as const

/* ------------------------------------------------------------------ */
/* SHOTS DECLARATIVOS V4.0 (§61) — composición + occupancy por beat.    */
/* ------------------------------------------------------------------ */

export const s01Shots = {
  SHOT_INSURANCE: {
    policyWidth: [0.32, 0.37],
    keysWidth: [0.1, 0.14],
    stampCenter: { x: [0.46, 0.54], y: [0.46, 0.54] },
  },
  SHOT_PANTRY: {
    pantryWidth: [0.7, 0.8],
    cavityArea: [0.4, 0.48],
    bagWidth: [0.05, 0.1],
    listWidth: [0.07, 0.1],
    cavityVisibleMin: 0.7,
  },
  SHOT_FRIDGE: {
    heightRatio: [0.72, 0.78],
    centerX: [0.58, 0.66],
  },
  SHOT_WIDE: {
    islandWidth: [0.55, 0.65],
    islandHeight: [0.28, 0.38],
    fridgeHeight: [0.35, 0.45],
    phoneRatio: [0.05, 0.08],
  },
  SHOT_PHONE_STAGING: {
    phoneHeight: [0.55, 0.65],
    screenHeight: [0.42, 0.5],
    rollMax: 1.5 * DEG,
    residualPerspectiveMax: 5 * DEG,
  },
} as const