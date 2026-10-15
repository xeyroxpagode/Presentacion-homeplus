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
  // S01.2 F100 V5.1 — revelación lateral cercana del interior abierto:  // la puerta inferior (bisagra derecha, 42°) presenta su cara interna a
  // cámara y la cavidad izquierda queda despejada: los cuatro alimentos se
  // reconocen (puerta + estante). Desviación documentada: ningún encuadre
  // frontal ve la cara interna a 42° (normal -x/-z) ni la cavidad izquierda
  // tras la puerta. S01.3 reencuadra a A_FRIDGE en 0–250ms (asentado).
  A_FRIDGE_SIDE: { pos: [0.35, 0.95, -1.15] as Vec3, target: [1.8, 0.55, -2.05] as Vec3 },
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

/** Anchor por step: dónde queda la cámara en el F100 de cada beat.
 *  V5.1: el F100 de S01.2 es revelación lateral del interior abierto
 *  (A_FRIDGE_SIDE, cuatro alimentos reconocibles), no A_PANTRY.
 *  A_PANTRY se preserva para inspección DEV de la alacena en su pose final.
 *  S01.3 arranca de SIDE y asienta a A_FRIDGE en 0–250ms. */
export const s01AnchorByStep: AnchorName[] = [
  'A_INSURANCE_PRE',
  'A_INSURANCE',
  'A_FRIDGE_SIDE',
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
   *  HERO RIG V5.1 — reconciliación física (contrato §4):
   *  Bottom: cerrada 0° → pre-open S01.2 42° → peak 58° → rebound 46° →
   *  rest 50°. Top: 0° → 0° → peak 22° → rebound 8° → rest 12°.
   *  topMax 26° / botMax 62° incluyen margen de seguridad (+4°).
   *  Giro desde bisagra real (hingeX/hingeZ), sin penetraciones: verificado
   *  contra cuerpo/isla/paredes/bandeja/alimentos (ajuste mínimo documentado
   *  en S01CinematicProps: compartimentos de puerta rebajados 0.02 m). */
  fridge: {
    group: [1.75, 0.925, -2.55] as Vec3,
    hingeX: 0.425,
    hingeZ: 0.385,
    topCenterY: 0.6625,
    topHeight: 0.525,
    botCenterY: -0.2625,
    botHeight: 1.325,
    topRest: 12 * DEG,
    botRest: 50 * DEG,
    topMax: 26 * DEG,
    botMax: 62 * DEG,
    topRebound: 8 * DEG,
    botRebound: 46 * DEG,
    /** Pose pre-open: final de S01.2 / inicio de S01.3 (puerta abierta). */
    topPre: 0,
    botPre: 42 * DEG,
    /** Peak de avería S01.3. */
    topPeak: 22 * DEG,
    botPeak: 58 * DEG,
  },
  /** Alimentos S01 V5.1 — coordenadas de autor (mundo). El director calcula
   *  la fase adosada a puerta (bisagra real) y la fase libre determinista.
   *  Orígenes físicos conocidos; destinos fijos; HOLD sin movimiento. */
  fridgeFood: {
    /** Manzana: compartimento de puerta inferior (door-local desde bisagra;
     *  coincide con BOTTOM_BINS: y≈-0.24 sobre el fondo, z interior). */
    appleDoor: [-0.45, -0.24, -0.03] as Vec3,
    appleLand: [1.32, 0.045, -1.92] as Vec3,
    /** Botella: estante inferior del cuerpo, lado izquierdo (despejado para
     *  A_FRIDGE/A_FRIDGE_SIDE: la puerta abierta tapa el lado derecho). */
    waterHome: [1.52, 0.69, -2.31] as Vec3,
    waterLand: [1.5, 0.625, -2.3] as Vec3,
    /** Huevos: bandeja EGG_TRAY en puerta inferior (door-local).
     *  A seguro (cerca de bisagra), B próximo al borde libre. */
    eggADoor: [-0.28, 0.15, -0.03] as Vec3,
    eggBDoor: [-0.62, 0.15, -0.03] as Vec3,
    eggBLand: [1.42, 0.032, -1.98] as Vec3,
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
  // V5.1: release tras la pausa post-avería (búsqueda, no explosión).
  {
    origin: [0.85 - J, 0.76, -2.36],
    controlA: [0.7, 0.82, -2.44],
    controlB: [0.5, 0.88, -2.5],
    land: [0.35, 0.9045, -2.55],
    accum: [-0.14, 0.944, -0.37],
    originRot: [-0.5, 0.2, 0.1],
    landRot: [0, 0.3, 0],
    accumRot: [0, -0.12, 0],
    release: 1850,
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
    release: 1930,
    dur: 430,
    arc: 0.08,
  },
  // DOC_03 GARANTÍA MICROONDAS — cae a piso bajo cercano (no cruza cocina).
  // V5.1 §11-C: permanece en piso (accum = land, no se eleva a la pila).
  {
    origin: [0.85 - J * 0.1, 0.75, -2.36],
    controlA: [0.95, 0.6, -2.3],
    controlB: [1.05, 0.3, -2.15],
    land: [1.15, 0.0035, -2.0],
    accum: [1.15, 0.0035, -2.0],
    originRot: [-0.6, 0.1, 0.15],
    landRot: [0, 0.4, 0],
    accumRot: [0, 0.4, 0],
    release: 2010,
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
    release: 2090,
    dur: 430,
    arc: 0.07,
  },
  // DOC_05 GARANTÍA CAFETERA — queda colgando del módulo (35–45% fuera).
  // V5.1 §11-D: permanece en su ubicación (accum = land).
  {
    origin: [0.85 + J * 0.35, 0.74, -2.36],
    controlA: [0.87, 0.66, -2.35],
    controlB: [0.86, 0.58, -2.34],
    land: [0.85, 0.52, -2.33],
    accum: [0.85, 0.52, -2.33],
    originRot: [-0.6, 0.05, 0.1],
    landRot: [0.5, 0.12, 0.18],
    accumRot: [0.5, 0.12, 0.18],
    release: 2250,
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
    release: 2170,
    dur: 480,
    arc: 0.1,
  },
  // MANUAL — más pesado: arco bajo, piso cercano.
  // V5.1 §11-E: NO se eleva a la pila (accum = land, permanece en piso).
  {
    origin: [0.85 + J * 0.8, 0.73, -2.36],
    controlA: [1.0, 0.6, -2.2],
    controlB: [1.2, 0.25, -2.0],
    land: [1.35, 0.0085, -1.7],
    accum: [1.35, 0.0085, -1.7],
    originRot: [-0.5, 0.2, 0.05],
    landRot: [0, -0.5, 0],
    accumRot: [0, -0.5, 0],
    release: 2050,
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
/* HUMO — 6 puffs evento V5.1. Origen técnico trasero/inferior con ruta   */
/* visible hacia arriba. Opacidad máxima ≤ 0.28.                           */
/* REGLA ABSOLUTA: en cualquier HOLD, SMOKE OPACITY = 0 (residual 0).      */
/* ------------------------------------------------------------------ */

export const s01Smoke = [
  { origin: [1.42, 0.55, -2.68] as Vec3, rise: 1.05, drift: -0.08, start: 730, life: 780, residual: 0 },
  { origin: [1.68, 0.48, -2.73] as Vec3, rise: 1.15, drift: 0.07, start: 830, life: 800, residual: 0 },
  { origin: [1.95, 0.55, -2.68] as Vec3, rise: 1.0, drift: -0.03, start: 940, life: 780, residual: 0 },
  { origin: [1.58, 0.62, -2.62] as Vec3, rise: 0.9, drift: 0.09, start: 1050, life: 720, residual: 0 },
  { origin: [1.82, 0.58, -2.7] as Vec3, rise: 0.95, drift: -0.1, start: 1160, life: 700, residual: 0 },
  { origin: [1.5, 0.5, -2.66] as Vec3, rise: 0.85, drift: 0.05, start: 1280, life: 620, residual: 0 },
]

export const s01SmokeMaxOpacity = 0.28

/* ------------------------------------------------------------------ */
/* TIMELINES — milisegundos locales del beat.                         */
/* ------------------------------------------------------------------ */

export const s01Timings = {
  enter1: { blackout: [0, 280] as [number, number], cam: [60, 500] as [number, number] },
  // Beat 2 V5.1 — compras con continuidad física (§6):
  // 0–650 apertura escalonada · 650–1050 lectura vacío ·
  // 1050–1850 travelling continuo a heladera (sin corte) ·
  // 1280–1820 bottom 0°→42° + luz fría · 1850–2200 lectura interior · 2200+ HOLD.
  enter2: {
    cam: [0, 680] as [number, number],
    camPantry: [0, 1050] as [number, number],
    camTravel: [1050, 1850] as [number, number],
    fridgeOpen: [1280, 1820] as [number, number],
    readUntil: 2200,
    doors: [
      [170, 570] as [number, number],
      [235, 590] as [number, number],
      [305, 610] as [number, number],
    ],
  },
  // Beat 3 V5.1 — fridge failure (§7): arranca del F100 real del paso 2
  // (bottom 42° abierto, luz encendida). Cámara asentada 0–250 (ya está en
  // A_FRIDGE: micro-settle, sin travelling). Flickers 250–460, microtirón
  // 480–580, golpe 620–750, puertas 680–980, humo 730–1550, alimentos
  // 760–1500, pausa 1550–1750, búsqueda 1750–3100 (cajón tras la pausa).
  fridgeFail: {
    cam: [0, 250] as [number, number],
    flickerA: [250, 330] as [number, number],
    flickerB: [380, 460] as [number, number],
    tug: [480, 580] as [number, number],
    golpe: [620, 750] as [number, number],
    rebound: [750, 830] as [number, number],
    recover: [830, 900] as [number, number],
    topDoorPeak: [680, 800] as [number, number],
    topDoorMid: [800, 900] as [number, number],
    topDoorRest: [900, 980] as [number, number],
    botDoorPeak: [680, 800] as [number, number],
    botDoorMid: [800, 900] as [number, number],
    botDoorRest: [900, 980] as [number, number],
    foodReact: [760, 1500] as [number, number],
    smokeDead: 1600,
    pauseUntil: 1750,
    drawerA: [1750, 1850] as [number, number],
    drawerB: [1850, 2120] as [number, number],
    drawerC: [2120, 2220] as [number, number],
    settled: 2650,
    manualSettled: 2750,
    end: 3150,
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
export const s01BeatDuration = [300, 650, 2250, 3200, 780, 2950]

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