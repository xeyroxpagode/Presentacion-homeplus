// FINAL KITCHEN V6.0 — geometría definitiva (metros, Y-up).
// Todos los valores derivan del mundo S01 importado; aquí sólo se fijan los
// anclajes nuevos del cierre + los overrides finalRest del contrato §6.1.

export type Vec3 = [number, number, number]

/** Cámara canónica (idéntica a s01Anchors.A_WIDE — no duplicar valores). */
export const A_WIDE = {
  position: [2.5, 1.82, 3.35] as Vec3,
  target: [0.15, 0.72, -0.6] as Vec3,
}

/** Reencuadre de heladera (reutiliza A_FRIDGE original). */
export const CAM_FRIDGE = {
  position: [1.3, 1.38, 2.3] as Vec3,
  target: [1.82, 0.84, -2.5] as Vec3,
}

/** Foco factura: vecindad de A_INSURANCE reorientada a la pila física. */
export const CAM_FACTURA = {
  position: [-0.72, 1.5, 0.28] as Vec3,
  target: [-0.18, 0.95, -0.44] as Vec3,
}

/** Foco mochila: se recalcula desde el bbox real; este es el valor inicial. */
export const CAM_MOCHILA = {
  position: [-0.3, 0.78, 1.52] as Vec3,
  target: [-0.85, 0.26, 0.33] as Vec3,
}

/** Mochila: raíz al pie del frente de isla (frente útil z≈0.19).
 * Dorso inferior a 0.18 + lean 10° → coronilla trasera roza el mueble. */
export const BACKPACK = {
  root: [-0.85, 0, 0.27] as Vec3,
  yaw: 0.18,
  /** Inclinación contra el mueble (rad, ajustada a contactos reales). */
  lean: 0.17, // ≈10°
  size: { w: 0.31, h: 0.43, d: 0.18 },
}

/** Pila documental + factura (póliza VENCIDA canónica, cima de la pila). */
export const PAPER_STACK = {
  anchor: [-0.18, 0.918, -0.44] as Vec3,
  /** Cima real de la pila (policy accum + hojas): base de la factura. */
  topY: 0.978,
}

/** Pileta empotrada en mesada trasera (topY≈0.902). */
export const SINK = {
  center: [-0.07, 0.902, -2.7] as Vec3,
  size: { w: 0.38, d: 0.34, depth: 0.16 },
  faucetZ: -2.92,
}

/** Escurridor + 3 platos (sector derecho de la pileta). */
export const DRAINER = {
  center: [0.24, 0.902, -2.7] as Vec3,
  width: 0.2,
  plateR: 0.095,
  plateThick: 0.012,
  plateTilt: 1.31, // ≈75°
  platePitch: 0.03,
}

/** Servicio de heladera: cubierta inferior frontal + tornillo + herramienta.
 * Cara frontal del cuerpo en z≈−2.42 (puerta inferior abierta 50° barre
 * x∈[1.63,2.18]: el panel vive a su izquierda, sin intersección). */
export const FRIDGE_SERVICE = {
  fridgeRoot: [1.75, 0.925, -2.55] as Vec3,
  /** Cubierta 0.36×0.25×0.02, dorso a ras de la cara frontal inferior. */
  panelCenter: [1.3, 0.16, -2.408] as Vec3,
  panelSize: [0.36, 0.25, 0.02] as Vec3,
  /** Tornillo objetivo del gesto (mundo, sobre la cara de la cubierta). */
  screw: [1.3, 0.14, -2.394] as Vec3,
  screwR: 0.004,
  /** Caja de herramientas sobre suelo (fuera del barrido de puertas y de
   *  los papeles del suelo: DOC_03 [0.68,−1.62], manual [0.95,−1.50]). */
  toolbox: [0.72, 0, -1.28] as Vec3,
}

/** Volumen del técnico + postura base (hacia la heladera, −Z).
 * Cinemática verificada: con pelvis y=0.42, lean≈29° y brazo 0.30+0.30,
 * el codo queda flexionado de forma natural en P1 (D_wrist≈0.56 < 0.60). */
export const TECHNICIAN = {
  root: [1.22, 0, -1.92] as Vec3,
  pelvisP0: [1.22, 0.42, -1.92] as Vec3,
  rightKnee: [1.3, 0.09, -2.04] as Vec3,
  leftFoot: [1.12, 0.035, -1.68] as Vec3,
  /** Muñeca izquierda: estabiliza el borde de la cubierta (NO la manija). */
  leftWristPanel: [1.14, 0.3, -2.36] as Vec3,
  /** Punto delamano derecha en P0 (hover sobre el tornillo). */
  hoverP0: [1.33, 0.2, -2.33] as Vec3,
}

/** Corredor protegido del travelling sobre la isla. */
export const DIVE_CORRIDOR = {
  x: [-0.3, 0.5] as [number, number],
  z: [-0.3, 0.2] as [number, number],
}

/** Overrides finalRest del contrato §6.1 (mundo, verificados vs s01Docs). */
export const FINAL_REST_OVERRIDES = {
  /** DOC_03 (índice 2, garantía microondas): piso junto a la isla. */
  doc3: { index: 2, p: [0.68, 0.0035, -1.62] as Vec3, r: [0, 0.4, 0] as Vec3 },
  /** Manual (índice 6, DOC manual): piso, portada cerrada. */
  manual: { index: 6, p: [0.95, 0.0085, -1.5] as Vec3, r: [0, -0.5, 0] as Vec3 },
  /** Manzana: piso. */
  apple: { p: [0.62, 0.045, -1.85] as Vec3, r: [0.4, 0.6, 1.2] as Vec3 },
  /** Huevo B: piso. */
  eggB: { p: [0.78, 0.032, -1.95] as Vec3, r: [0, 0.4, Math.PI / 2] as Vec3 },
}

/** Criterios de contacto del gesto (m). */
export const CONTACT = {
  toolTipMaxDist: 0.02,
  toolTipCoverage: 0.8,
  wristTwist: 0.12, // ≈7°
}
