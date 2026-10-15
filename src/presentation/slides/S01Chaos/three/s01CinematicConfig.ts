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
  // V5.2: en el eje de visión del nuevo encuadre, 0.22 atrás del F100.
  A_INSURANCE_PRE: { pos: [-0.47, 1.98, 0.2] as Vec3, target: [-0.05, 0.925, -0.38] as Vec3 },
  // S01.1 V5.2 (§04) — pose resuelta por proyección real (probe-v52-shotA):
  // target = centro de la superficie superior de la póliza; elev ≈56°,
  // azimut ≈36° (oblicuo moderado, sin cenital). Composición 1280×720:
  // hoja 415–876 × 186–580 (bbox objetivo 410–870 × 175–600, ancho 36%),
  // centro (645,383), sello 531–704 × 276–410, llaves ~284–430 × ~477–505,
  // teléfono 935–1128 (borde inf-der, fuera del área protagonista).
  A_INSURANCE: { pos: [-0.4, 1.8, 0.1] as Vec3, target: [-0.05, 0.925, -0.38] as Vec3 },
  // S01.2 — V5.2 (feedback de dirección): apunta SOLO a las cavidades
  // superiores (la mesada trasera queda como franja mínima en el borde
  // inferior). Cámara elevada y cercana: cavidades ~74% del ancho,
  // 4 productos en cuadro, sin lámparas colgantes en el plano.
  A_PANTRY: { pos: [-0.35, 2.1, 0.0] as Vec3, target: [-0.8, 1.75, -2.7] as Vec3 },
  // S01.3 reencuadre (§06A) — heladera COMPLETA antes del golpe, resuelta
  // por proyección (probe-v52-diag): cuerpo 502–764 × 60–610 (altura 76%),
  // top y base con aire, franja de piso 110px, puerta 42° contenida
  // (edge x 591), manzana/humo/eggLand en frame.
  A_FRIDGE: { pos: [1.25, 1.6, 1.65] as Vec3, target: [1.78, 0.85, -2.1] as Vec3 },
  // S01.2 F100 V5.2 (§05B) — revelación lateral IZQUIERDA del interior
  // abierto (feedback de dirección: se ve la CAVIDAD, no la cara de la
  // puerta; pose cercana a la de V5.1, elevada para leer la manzana en su
  // bin). Oclusión verificada por segmento (probe-v52-diag4): manzana,
  // 2 huevos y botella VISIBLES (la hoja de la puerta no tapa nada),
  // alimentos 29%×47% del viewport, borde libre de puerta en frame.
  // Botella al lado DERECHO de la cavidad: desde cámara izquierda es lo
  // visible a través de la boca.
  A_FRIDGE_SIDE: { pos: [0.5, 1.1, -1.0] as Vec3, target: [1.8, 0.6, -2.1] as Vec3 },
  // S01.3 F100 V5.2 (§06F) — búsqueda protagonista con contexto: títulos
  // legibles en el tercio inferior, bacha aún vacía y columna de humo de la
  // heladera visible en el tercio superior derecho.
  A_DOCS: { pos: [0, 2.05, 1.9] as Vec3, target: [0.3, 1.18, -0.8] as Vec3 },
  // S01.4 — hero wide: atrás + derecha + arriba para que entre fridge completa.
  // FOV sigue 36°. Clusters A/B/C separados con aire negativo.
  A_WIDE: { pos: [2.15, 1.75, 2.7] as Vec3, target: [0.15, 0.82, -0.9] as Vec3 },
  // S01.5 — inicio del dive continuo (no es endpoint perceptible).
  A_PHONE: { pos: [0.167, 1.24, 0.215] as Vec3, target: [0.1, 0.918, -0.02] as Vec3 },
} as const

/** Pila de acumulación sobre la isla: visible desde WIDE, separada del
 *  teléfono (fuera de PHONE_CLEAR_ZONE), no tapa llaves. */
export const s01AccumulationStack = [-0.18, 0.918, -0.44] as Vec3

export type AnchorName = keyof typeof s01Anchors

/** Anchor por step: dónde queda la cámara en el F100 de cada beat.
 *  V5.2: S01.3 ARRANCA de A_FRIDGE_SIDE, se reencuadra a A_FRIDGE
 *  (heladera completa, 0–320 ms del script) y TERMINA en A_DOCS
 *  (búsqueda de garantías). A_PANTRY se preserva para inspección DEV. */
export const s01AnchorByStep: AnchorName[] = [
  'A_INSURANCE_PRE',
  'A_INSURANCE',
  'A_FRIDGE_SIDE',
  'A_DOCS',
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
  /** Heladera V5.2 (§05B): grupo en (1.75, 0.925, -2.40) — desplazado
   *  +0.15 en Z para ganar profundidad SIN atravesar la pared (fondo del
   *  cuerpo a z -2.68; cara frontal de la pared a -3.00).
   *  Exterior ≈ 0.68 (cuerpo 0.30 + cavidad útil 0.34 + puerta 0.04).
   *  Cavidad útil visual 0.34: interior trasero 0.045 → plano de puertas.
   *  HERO RIG V5.1 reconciliación física (contrato §4):
   *  Bottom: cerrada 0° → pre-open S01.2 42° → peak 58° → rebound 46° →
   *  rest 50°. Top: 0° → 0° → peak 22° → rebound 8° → rest 12°.
   *  Giro desde bisagra real (hingeX/hingeZ), sin penetraciones. */
  fridge: {
    group: [1.75, 0.925, -2.4] as Vec3,
    hingeX: 0.425,
    hingeZ: 0.38,
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
  /** Alimentos S01 V5.2 (§05B) — coordenadas de autor (mundo / door-local
   *  desde bisagra). Contención física verificada contra bins/bandeja:
   *  manzana y huevos apoyados con separación positiva, botella sobre
   *  estante del cuerpo. Orígenes conocidos; destinos fijos; HOLD quieto. */
  fridgeFood: {
    /** Manzana: compartimento inferior de puerta, apoyada sobre la base
     *  del bin (top -0.29 hinge-space), contenido en x/z del bin.
     *  Destino: rueda MÁS ALLÁ del borde libre de la puerta abierta
     *  (proyección del arco a 50°: hinge (2.175,-2.02), edge (1.63,-1.37))
     *  para quedar visible y no en la zona de sombra de la hoja. */
    appleDoor: [-0.45, -0.245, -0.07] as Vec3,
    appleLand: [1.55, 0.045, -1.2] as Vec3,
    /** Botella: estante inferior del cuerpo (top local y -0.30), lado
     *  DERECHO — desde la cámara izquierda del F100 es lo visible a través
     *  de la boca de la cavidad (sightline verificado). Cae de costado
     *  sobre el MISMO estante (no vuela). */
    waterHome: [1.72, 0.695, -2.22] as Vec3,
    waterLand: [1.7, 0.66, -2.18] as Vec3,
    /** Huevos: bandeja EGG_TRAY en puerta inferior (door-local). Base de
     *  bandeja top hinge-space y 0.109; huevo semialtura 0.0364 → centro
     *  0.145. A cerca de bisagra, B próximo al borde libre, ambos dentro
     *  del rect de la bandeja, separación física 0.30. */
    eggADoor: [-0.28, 0.145, -0.07] as Vec3,
    eggBDoor: [-0.58, 0.145, -0.07] as Vec3,
    eggBLand: [1.44, 0.032, -1.8] as Vec3,
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
  /** Poliza V5.2 (§04) — la hoja vive en la mesada, no es UI.
   *  Tamaño 0.27 × 0.36 (+12.5% sobre 0.24 × 0.32, dentro del 10–15%
   *  autorizado) para alcanzar el target visual de anchura 36–42%.
   *  El sello VENCIDO va IMPRESO en la textura de la hoja (recuadro
   *  completo, §04), ya no como decal flotante. */
  policy: {
    group: [-0.05, 0, -0.38] as Vec3,
    yaw: 0.1,
    size: [0.27, 0.36] as [number, number],
  },
  keys: [-0.33, 0.915, -0.43] as Vec3,
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
/* DOCUMENTACIÓN V5.2 (§06F) — la rotura NO expulsa papeles: la        */
/* búsqueda se representa con disposición + encuadre + deslizamientos  */
/* cortos. 9 documentos: Zona A (isla) 6 hojas con encabezado; Zona B  */
/* (cajón/mesada trasera) 2 hojas + manual colgando. Sin arcos Bézier, */
/* sin lluvia, sin levitación. Ninguna garantía es de la heladera.     */
/* ------------------------------------------------------------------ */

export type DocSpec = {
  /** pose inicial (dentro del cajón cerrado, oculta) */
  origin: Vec3
  /** pose final del beat 3 (land + slide) */
  land: Vec3
  originRot: Vec3
  landRot: Vec3
  /** deslizamiento de búsqueda (2300–3050), delta sobre land, ≤0.16 */
  slide: Vec3
  slideRot: number
  /** ms locales del beat 3 en que se revela (v 0→1, fuera de cuadro) */
  appear: number
  /** destino de acumulación del beat 4 */
  accum: Vec3
  accumRot: Vec3
  manual?: boolean
  /** hoja secundaria sin encabezado protagonista */
  secondary?: boolean
}

// Zona A — isla: 5 GARANTÍAS + CERTIFICADO (encabezados legibles, ≥4 con
// GARANTÍA explícito). Ninguna identifica la heladera.
// Zona B — cajón: 2 hojas sobre el módulo documental + manual colgando.
export const s01Docs: DocSpec[] = [
  {
    origin: [0.85 - 0.075, 0.76, -2.36],
    land: [-0.45, 0.9215, -0.15],
    originRot: [-0.5, 0.2, 0.1],
    landRot: [0, 0.4, 0],
    slide: [0.07, 0, 0.05],
    slideRot: -0.12,
    appear: 1900,
    accum: [-0.14, 0.944, -0.37],
    accumRot: [0, -0.12, 0],
  },
  {
    origin: [0.85 - 0.03, 0.78, -2.36],
    land: [-0.52, 0.9215, -0.52],
    originRot: [-0.55, 0.35, -0.1],
    landRot: [0, -0.3, 0],
    slide: [-0.06, 0, 0.08],
    slideRot: 0.1,
    appear: 1930,
    accum: [-0.23, 0.95, -0.4],
    accumRot: [0, 0.1, 0],
  },
  {
    origin: [0.85 - 0.008, 0.75, -2.36],
    land: [0.22, 0.9215, -0.55],
    originRot: [-0.6, 0.1, 0.15],
    landRot: [0, 0.2, 0],
    slide: [0.09, 0, -0.04],
    slideRot: -0.08,
    appear: 1960,
    accum: [-0.11, 0.938, -0.33],
    accumRot: [0, -0.05, 0],
  },
  {
    origin: [0.85 + 0.015, 0.77, -2.36],
    land: [0.44, 0.9215, -0.3],
    originRot: [-0.5, -0.25, -0.12],
    landRot: [0, -0.5, 0],
    slide: [0.06, 0, 0.05],
    slideRot: 0.14,
    appear: 1990,
    accum: [-0.12, 0.956, -0.49],
    accumRot: [0, 0.14, 0],
  },
  {
    origin: [0.85 + 0.045, 0.75, -2.36],
    land: [0.15, 0.9215, -0.06],
    originRot: [-0.55, -0.15, -0.1],
    landRot: [0, 0.9, 0],
    slide: [-0.07, 0, 0.03],
    slideRot: -0.1,
    appear: 2020,
    accum: [-0.15, 0.962, -0.38],
    accumRot: [0, -0.1, 0],
  },
  {
    origin: [0.85 + 0.06, 0.74, -2.36],
    land: [0.05, 0.9235, -0.62],
    originRot: [-0.5, 0.05, 0.1],
    landRot: [0, -0.15, 0],
    slide: [0.05, 0, 0.06],
    slideRot: 0.08,
    appear: 2050,
    accum: [-0.2, 0.932, -0.45],
    accumRot: [0, 0.06, 0],
  },
  // Zona B — módulo documental: 2 hojas sobre la tapa del cajón.
  {
    origin: [0.85 + 0.02, 0.72, -2.36],
    land: [0.72, 0.9045, -2.6],
    originRot: [-0.4, 0.3, 0.05],
    landRot: [0, 0.3, 0],
    slide: [0, 0, 0],
    slideRot: 0,
    appear: 1850,
    accum: [0.72, 0.9045, -2.6],
    accumRot: [0, 0.3, 0],
    secondary: true,
  },
  {
    origin: [0.85 + 0.05, 0.71, -2.36],
    land: [0.95, 0.9045, -2.75],
    originRot: [-0.45, -0.2, -0.08],
    landRot: [0, -0.2, 0],
    slide: [0, 0, 0],
    slideRot: 0,
    appear: 1875,
    accum: [0.95, 0.9045, -2.75],
    accumRot: [0, -0.2, 0],
    secondary: true,
  },
  // MANUAL DE USUARIO — parcialmente extraído, colgando de la boca del
  // cajón abierto (35–45% fuera). Sin vuelo.
  {
    origin: [0.85 + 0.08, 0.73, -2.36],
    land: [0.85, 0.52, -2.28],
    originRot: [-0.6, 0.05, 0.1],
    landRot: [0.5, 0.12, 0.18],
    slide: [0, 0, 0],
    slideRot: 0,
    appear: 1900,
    accum: [0.85, 0.52, -2.28],
    accumRot: [0.5, 0.12, 0.18],
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
/* VAJILLA V5.2 (§07) — inventario cerrado de 19 piezas.              */
/* Todas las poses están en mundo y terminan físicamente contenidas    */
/* por la bacha o apoyadas en su borde. El reveal sólo recorre 0.025 m.*/
/* ------------------------------------------------------------------ */

export type DishKind = 'plate' | 'bowl' | 'cup' | 'fork' | 'spoon' | 'knife' | 'spatula' | 'ladle'
export type DishSpec = {
  kind: DishKind
  p: Vec3
  r: Vec3
  reveal: number
  tint?: string
}

export const s01Dishes: DishSpec[] = [
  // Oleada 1 — siete platos, apilados/recostados dentro de la cubeta.
  { kind: 'plate', p: [-1.2, 0.855, -2.7], r: [1.38, 0.12, 0.12], reveal: 500, tint: '#d7d2c7' },
  { kind: 'plate', p: [-1.15, 0.862, -2.69], r: [1.36, -0.14, 0.08], reveal: 545, tint: '#c9ced0' },
  { kind: 'plate', p: [-1.1, 0.869, -2.71], r: [1.4, 0.18, 0.04], reveal: 590, tint: '#d8d1c2' },
  { kind: 'plate', p: [-1.04, 0.876, -2.68], r: [1.35, -0.13, 0], reveal: 635, tint: '#bfc7ca' },
  { kind: 'plate', p: [-0.98, 0.883, -2.71], r: [1.39, 0.14, -0.04], reveal: 680, tint: '#d7d2c7' },
  { kind: 'plate', p: [-0.92, 0.89, -2.69], r: [1.34, -0.18, -0.08], reveal: 725, tint: '#c9ced0' },
  { kind: 'plate', p: [-0.86, 0.897, -2.7], r: [1.37, 0.1, -0.12], reveal: 770, tint: '#d8d1c2' },
  // Oleada 2 — bowls y tazas, con contacto en fondo/borde.
  { kind: 'bowl', p: [-1.18, 0.79, -2.57], r: [0.12, 0.15, -0.08], reveal: 700, tint: '#9ba7ad' },
  { kind: 'bowl', p: [-0.91, 0.805, -2.58], r: [-0.08, -0.2, 0.12], reveal: 760, tint: '#c5b99f' },
  { kind: 'cup', p: [-1.23, 0.91, -2.76], r: [0.08, 0.35, 0.08], reveal: 830, tint: '#b7c0c4' },
  { kind: 'cup', p: [-0.81, 0.91, -2.77], r: [-0.04, -0.45, -0.06], reveal: 890, tint: '#c7bca6' },
  // Oleada 3 — cubiertos diferenciados, cruzados sobre platos y cubeta.
  { kind: 'fork', p: [-1.16, 0.875, -2.61], r: [0.22, 0.2, 0.82], reveal: 950 },
  { kind: 'fork', p: [-1.03, 0.89, -2.6], r: [0.16, -0.1, -0.62], reveal: 990 },
  { kind: 'fork', p: [-0.91, 0.885, -2.62], r: [0.2, 0.1, 0.48], reveal: 1030 },
  { kind: 'spoon', p: [-1.12, 0.9, -2.73], r: [0.14, 0.2, -0.92], reveal: 1070 },
  { kind: 'spoon', p: [-0.96, 0.905, -2.73], r: [0.18, -0.15, 0.78], reveal: 1110 },
  { kind: 'knife', p: [-0.86, 0.9, -2.6], r: [0.12, 0.1, -0.5], reveal: 1150 },
  { kind: 'spatula', p: [-1.24, 0.895, -2.68], r: [0.2, -0.15, 0.34], reveal: 1190 },
  { kind: 'ladle', p: [-0.83, 0.895, -2.7], r: [0.18, 0.1, -0.32], reveal: 1230 },
]

/* ------------------------------------------------------------------ */
/* HUMO V5.2 (§06E) — fuga SOSTENIDA. Orígenes en la ARISTA superior/  */
/* trasera del cuerpo (y 1.83–1.92): visibles desde el frontal del     */
/* beat 3 (el cuerpo ocluiría emisiones más bajas) y el columna sube   */
/* completa en el plano general del beat 4. Loop persistente en el     */
/* director mientras smokeOn (steps 3–4 + dive).                       */
/* ------------------------------------------------------------------ */

export const s01Smoke = [
  { origin: [1.52, 1.78, -2.08] as Vec3, rise: 1.05, drift: -0.08, start: 1000, life: 780, residual: 0 },
  { origin: [1.68, 1.84, -2.12] as Vec3, rise: 1.15, drift: 0.07, start: 1060, life: 800, residual: 0 },
  { origin: [1.92, 1.8, -2.1] as Vec3, rise: 1.0, drift: -0.03, start: 1120, life: 780, residual: 0 },
  { origin: [1.6, 1.75, -2.03] as Vec3, rise: 0.9, drift: 0.09, start: 1180, life: 720, residual: 0 },
  { origin: [1.85, 1.82, -2.16] as Vec3, rise: 0.95, drift: -0.1, start: 1240, life: 700, residual: 0 },
  { origin: [1.72, 1.72, -2.06] as Vec3, rise: 0.85, drift: 0.05, start: 1300, life: 620, residual: 0 },
]

export const s01SmokeMaxOpacity = 0.28

/* ------------------------------------------------------------------ */
/* TIMELINES — milisegundos locales del beat.                         */
/* ------------------------------------------------------------------ */

export const s01Timings = {
  // Beat 1 V5.2 (§04): duración total 900 ms —
  // 0–180 retiro del negro · 0–700 dolly y reencuadre · 700–900 asentado.
  enter1: { blackout: [0, 180] as [number, number], cam: [0, 700] as [number, number] },
  // Beat 2 V5.2 (§05) — 2450 ms totales: compras con continuidad física.
  // 0–650 viaje + apertura escalonada alacena · 650–1000 lectura cavidades ·
  // 950–1700 travelling continuo a heladera (solape) · 1300–1900 apertura
  // puerta inferior + luz fría · 1900–2250 lectura interior · 2250–2450 settle.
  enter2: {
    cam: [0, 650] as [number, number],
    camPantry: [0, 650] as [number, number],
    camTravel: [950, 1700] as [number, number],
    fridgeOpen: [1300, 1900] as [number, number],
    readUntil: 2250,
    doors: [
      [170, 570] as [number, number],
      [235, 590] as [number, number],
      [305, 610] as [number, number],
    ],
  },
  // Beat 3 V5.2 (§06) — 3350 ms. Escalada: reencuadre a heladera completa
  // ANTES del fallo · parpadeo de cocina (kitchenLight §06C) · golpe con
  // máximo conjunto · caída de alimentos · humo persistente · lectura ·
  // reencuadre documental con revelación durante la oclusión · búsqueda.
  fridgeFail: {
    // 0–320 SIDE→A_FRIDGE (completa) · 320–500 quieta (la falla NO empieza
    // antes de que la heladera esté encuadrada).
    reframe: [0, 320] as [number, number],
    hold: [320, 500] as [number, number],
    // Parpadeo de cocina: 100→72→95→100→78→100→90→100 (§06C).
    kitchenLight: [
      [500, 1.0],
      [550, 0.72],
      [615, 0.95],
      [720, 1.0],
      [760, 0.78],
      [810, 1.0],
      [875, 0.9],
      [980, 1.0],
    ] as [number, number][],
    // Luz interior: flickers propios más duros, apagada tras el fallo.
    innerFlickerA: [520, 600] as [number, number],
    innerFlickerB: [660, 750] as [number, number],
    innerOff: 800,
    // Cuerpo: vibración 820–900 · golpe 900–1080 (máximos juntos:
    // lift 0.018, shift 0.022, roll 2.2°) · rebote 1080–1190 · recuperación.
    vibrate: [820, 900] as [number, number],
    strike: [900, 1080] as [number, number],
    rebound: [1080, 1190] as [number, number],
    recover: [1190, 1300] as [number, number],
    // Puertas: 42→58→46→50 / 0→22→8→12 con inercia (§06B).
    topDoorPeak: [900, 1080] as [number, number],
    topDoorMid: [1080, 1190] as [number, number],
    topDoorRest: [1190, 1300] as [number, number],
    botDoorPeak: [900, 1080] as [number, number],
    botDoorMid: [1080, 1190] as [number, number],
    botDoorRest: [1190, 1300] as [number, number],
    // Alimentos (§06D): botella oscila desde la vibración; manzana se
    // desprende con el golpe; huevo B cae y llega al piso. Todos quietos
    // desde 1650. La cámara NO abandona la heladera antes.
    foodWater: [900, 1500] as [number, number],
    foodApple: [1050, 1650] as [number, number],
    foodEggA: [900, 1650] as [number, number],
    foodEggB: [1020, 1560] as [number, number],
    // 1650–1850 lectura de la consecuencia (quieta).
    consequence: [1650, 1850] as [number, number],
    // 1850–2200 reencuadre documental (A_FRIDGE→A_DOCS); los documentos se
    // revelan (appear por hoja, fuera de cuadro) durante la oclusión.
    docReframe: [1850, 2200] as [number, number],
    // 2300–3050 búsqueda: deslizamientos cortos por hoja (stagger 60 ms).
    searchStart: 2300,
    searchEach: 400,
    searchStagger: 60,
    // Cajón: abre con el reencuadre (zona B se revela con él).
    drawerA: [1750, 1850] as [number, number],
    drawerB: [1850, 2120] as [number, number],
    drawerC: [2120, 2220] as [number, number],
    // 3050–3350 asentamiento definitivo.
    end: 3350,
  },
  // Beat 4 V5.2 (§07) — clímax completo antes del portal.
  enter4: {
    cam: [0, 650] as [number, number],
    dishes: [500, 1270] as [number, number],
    dishSettle: [1270, 1550] as [number, number],
    docs: [850, 1370] as [number, number],
    docsStagger: 42,
    loose: [900, 1320] as [number, number],
    list: [960, 1320] as [number, number],
    policy: [1040, 1370] as [number, number],
    end: 1850,
  },
  // Beat 5 V5.2 (§08) — exclusivamente un dive físico WIDE→PHONE_INSIDE.
  // Ningún objeto se crea o reacomoda durante este beat.
  enter5: {
    portal: [0, 1450] as [number, number],
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
export const s01BeatDuration = [300, 900, 2450, 3350, 1850, 1450]

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
  // V5.2 §04: anchura de póliza 36–42% del viewport; sello dentro de la
  // hoja, legible desde lejos; llaves zona izquierda/inferior.
  SHOT_INSURANCE: {
    policyWidth: [0.36, 0.42],
    keysWidth: [0.08, 0.14],
    stampCenter: { x: [0.41, 0.55], y: [0.38, 0.57] },
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
