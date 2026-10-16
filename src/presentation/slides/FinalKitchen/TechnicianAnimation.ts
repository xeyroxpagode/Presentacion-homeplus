// FINAL KITCHEN V6.0 — cinemática del técnico (FridgeRepairGesture).
// Módulo SIN dependencias de three.js: matemática 3D explícita (cadenas
// pitch/yaw con orden yaw→pitch, idéntico a la jerarquía del rig). El rig
// procedural (TechnicianRig.tsx) y el QA consumen ESTE código, por lo que
// la pose renderizada y la métrica de contacto coinciden por construcción.
//
// Convención raw (= rotation.x / rotation.y aplicados a cada grupo):
//  - Pitch φ: 0 = miembro colgando, >0 = adelante (−Z, facing de trabajo).
//  - Torso/cabeza (apuntan +Y): raw.x = −inclinación.
//  - Yaw ψ (hombros/cadera): plano de swing hacia el objetivo.
//  - ToolRoll: giro del destornillador sobre su eje (NO mueve la punta).
//
// PLACEHOLDER DECLARADO (S3B PARTIAL): sin GLB CC0 verificable disponible en
// este entorno (Quaternius exige flujo interactivo itch.io), el personaje es
// un rig procedural articulado low-poly con clip horneado sobre sus
// articulaciones. Los keyframes son semánticos y BONE_MAP documenta el
// futuro mapeo a un GLB riggeado.

import { FRIDGE_SERVICE, TECHNICIAN } from './finalGeometry'
import type { Vec3 } from './finalGeometry'

/* ---------------- esqueleto (m, facing −Z, raíz = TECHNICIAN.root) ------- */

export const SKELETON = {
  pelvisY: 0.42,
  torsoLen: 0.52,
  headLen: 0.24,
  shoulderX: 0.21,
  shoulderDrop: 0.04,
  upperLen: 0.31,
  foreLen: 0.31,
  /** Destornillador: mango 0.10 + vástago 0.09 (punta = extremo). */
  toolLen: 0.19,
  hipX: 0.11,
  hipDrop: 0.04,
  thighLen: 0.45,
  shinLen: 0.44,
} as const

/** Futuro mapeo a GLB riggeado (nombres por confirmar contra el asset). */
export const BONE_MAP = {
  pelvis: 'Pelvis/Hips',
  spine: 'Spine',
  chest: 'Chest',
  neck: 'Neck',
  head: 'Head',
  upperArmR: 'RightUpperArm',
  foreArmR: 'RightForeArm',
  handR: 'RightHand',
  upperArmL: 'LeftUpperArm',
  foreArmL: 'LeftForeArm',
  handL: 'LeftHand',
  thighR: 'RightUpperLeg',
  shinR: 'RightLowerLeg',
  footR: 'RightFoot',
  thighL: 'LeftUpperLeg',
  shinL: 'LeftLowerLeg',
  footL: 'LeftFoot',
  toolSocket: 'RightHand.ToolSocket',
} as const

export type JointPose = {
  torso: number
  head: number
  shoulderYawR: number
  shoulderR: number
  elbowR: number
  wristPitchR: number
  toolRollR: number
  shoulderYawL: number
  shoulderL: number
  elbowL: number
  hipYawR: number
  hipR: number
  kneeR: number
  ankleR: number
  hipYawL: number
  hipL: number
  kneeL: number
  ankleL: number
}

/* ---------------- matemática (pitch/yaw, orden yaw→pitch) ---------------- */

const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v))

export type V3 = { x: number; y: number; z: number }

/** Dirección de un miembro: yaw ψ (plano) + pitch φ (0 abajo, >0 adelante). */
export function limbDir(yaw: number, pitch: number): V3 {
  const s = Math.sin(pitch)
  return { x: -s * Math.sin(yaw), y: -Math.cos(pitch), z: -s * Math.cos(yaw) }
}

function add(a: V3, b: V3): V3 {
  return { x: a.x + b.x, y: a.y + b.y, z: a.z + b.z }
}

function scale(v: V3, k: number): V3 {
  return { x: v.x * k, y: v.y * k, z: v.z * k }
}

/** Yaw del plano de swing hombro→objetivo (0 = sagital puro −Z). */
function swingYaw(s: V3, t: V3): number {
  return Math.atan2(-(t.x - s.x), -(t.z - s.z))
}

type Planar = { sh: number; el: number; err: number }

/** IK 2-link en el plano vertical del swing. Entradas ya proyectadas. */
function solvePlanar(dy: number, dh: number, l1: number, l2: number, bendSign: 1 | -1): Planar {
  const d = clamp(Math.hypot(dy, dh), 0.05, l1 + l2 - 0.004)
  const phiT = Math.atan2(dh, -dy) // 0 abajo, >0 adelante
  const beta = Math.acos(clamp((l1 * l1 + d * d - l2 * l2) / (2 * l1 * d), -1, 1))
  const gamma = Math.acos(clamp((l1 * l1 + l2 * l2 - d * d) / (2 * l1 * l2), -1, 1))
  const sh = phiT + bendSign * beta
  const el = -bendSign * (Math.PI - gamma)
  return { sh, el, err: 0 }
}

export type ArmSolution = { yaw: number; sh: number; el: number; wr: number; tipErr: number }

/**
 * Brazo + herramienta hacia el punto T (mundo). Punto fijo determinista
 * (4 iteraciones): muñeca W = T − toolDir·toolLen. El codo abre hacia
 * afuera/arriba (bendSign +1 en el plano de swing del brazo).
 */
function solveToolArm(s: V3, t: V3): ArmSolution {
  const yaw = swingYaw(s, t)
  const dx = t.x - s.x
  const dy = t.y - s.y
  const dz = t.z - s.z
  const dhTotal = Math.hypot(dx, dz)
  let toolPhi = Math.atan2(dhTotal, -dy)
  let sh = 0
  let el = 0
  for (let i = 0; i < 4; i++) {
    // Muñeca candidata a lo largo de la dirección actual de herramienta.
    const wx = t.x + Math.sin(toolPhi) * Math.sin(yaw) * SKELETON.toolLen
    const wy = t.y + Math.cos(toolPhi) * SKELETON.toolLen
    const wz = t.z + Math.sin(toolPhi) * Math.cos(yaw) * SKELETON.toolLen
    const dh = Math.hypot(wx - s.x, wz - s.z)
    const sol = solvePlanar(wy - s.y, dh, SKELETON.upperLen, SKELETON.foreLen, 1)
    sh = sol.sh
    el = sol.el
    // Re-estima la dirección herramienta desde la muñeca resuelta.
    const ex = s.x + limbDir(yaw, sh).x * SKELETON.upperLen
    const ey = s.y + limbDir(yaw, sh).y * SKELETON.upperLen
    const ez = s.z + limbDir(yaw, sh).z * SKELETON.upperLen
    const forePhi = sh + el
    const wfx = ex + limbDir(yaw, forePhi).x * SKELETON.foreLen
    const wfy = ey + limbDir(yaw, forePhi).y * SKELETON.foreLen
    const wfz = ez + limbDir(yaw, forePhi).z * SKELETON.foreLen
    toolPhi = Math.atan2(Math.hypot(t.x - wfx, t.z - wfz), -(t.y - wfy))
  }
  const forePhi = sh + el
  const wr = toolPhi - forePhi
  // Punta real por FK (verificación, mismo código que computeToolTip).
  const tip = chainTip(s, yaw, sh, el, wr)
  const tipErr = Math.hypot(tip.x - t.x, tip.y - t.y, tip.z - t.z)
  return { yaw, sh, el, wr, tipErr }
}

/** Muñeca→punta a través de antebrazo + herramienta (FK del brazo). */
function chainTip(s: V3, yaw: number, sh: number, el: number, wr: number): V3 {
  const e = add(s, scale(limbDir(yaw, sh), SKELETON.upperLen))
  const forePhi = sh + el
  const w = add(e, scale(limbDir(yaw, forePhi), SKELETON.foreLen))
  return add(w, scale(limbDir(yaw, forePhi + wr), SKELETON.toolLen))
}

/** Brazo sin herramienta (la mano termina en la muñeca). */
function solveHandArm(s: V3, w: V3): { yaw: number; sh: number; el: number; err: number } {
  const yaw = swingYaw(s, w)
  const dh = Math.hypot(w.x - s.x, w.z - s.z)
  const sol = solvePlanar(w.y - s.y, dh, SKELETON.upperLen, SKELETON.foreLen, 1)
  const e = add(s, scale(limbDir(yaw, sol.sh), SKELETON.upperLen))
  const w2 = add(e, scale(limbDir(yaw, sol.sh + sol.el), SKELETON.foreLen))
  return { yaw, sh: sol.sh, el: sol.el, err: Math.hypot(w2.x - w.x, w2.y - w.y, w2.z - w.z) }
}

/* ---------------- construcción de poses --------------------------------- */

function toV3(p: Vec3): V3 {
  return { x: p[0], y: p[1], z: p[2] }
}

function shoulderPos(side: 1 | -1, lean: number): V3 {
  const root = TECHNICIAN.root
  const cosL = Math.cos(lean)
  const sinL = Math.sin(lean)
  const neckY = TECHNICIAN.pelvisP0[1] + SKELETON.torsoLen * cosL
  const neckZ = TECHNICIAN.pelvisP0[2] - SKELETON.torsoLen * sinL
  return {
    x: root[0] + side * SKELETON.shoulderX,
    y: neckY - SKELETON.shoulderDrop * cosL,
    z: neckZ + SKELETON.shoulderDrop * sinL,
  }
}

function hipPos(side: 1 | -1): V3 {
  const root = TECHNICIAN.root
  return {
    x: root[0] + side * SKELETON.hipX,
    y: TECHNICIAN.pelvisP0[1] - SKELETON.hipDrop,
    z: TECHNICIAN.pelvisP0[2],
  }
}

export type LegSolution = { yaw: number; hip: number; knee: number; ankle: number; kneePos: V3; footPos: V3 }

/**
 * Pierna hacia el tobillo A. Prueba ambas ramas del codo y elige la cuya
 * rodilla quede más cerca del objetivo preferido (apoyo verificado en QA).
 */
function solveLeg(side: 1 | -1, ankle: V3, preferKnee: V3): LegSolution {
  const hip = hipPos(side)
  const yaw = swingYaw(hip, ankle)
  const dh = Math.hypot(ankle.x - hip.x, ankle.z - hip.z)
  const dy = ankle.y - hip.y
  let best: LegSolution | null = null
  let bestScore = Infinity
  for (const bend of [1, -1] as const) {
    const sol = solvePlanar(dy, dh, SKELETON.thighLen, SKELETON.shinLen, bend)
    const knee = add(hip, scale(limbDir(yaw, sol.sh), SKELETON.thighLen))
    const shinPhi = sol.sh + sol.el
    const foot = add(knee, scale(limbDir(yaw, shinPhi), SKELETON.shinLen))
    const score = Math.hypot(knee.x - preferKnee.x, knee.y - preferKnee.y, knee.z - preferKnee.z)
    if (score < bestScore) {
      bestScore = score
      best = { yaw, hip: sol.sh, knee: sol.el, ankle: -(shinPhi + 0.12), kneePos: knee, footPos: foot }
    }
  }
  return best!
}

/** Piernas del semiarrodillado (idénticas en P0/P1/P2: estables).
 * Derecha: rodilla al suelo junto al trabajo, tibia recogida bajo el muslo
 * (arrodillado real). Izquierda: pie plantado atrás como puntal. */
function kneelLegs(): { R: LegSolution; L: LegSolution } {
  const root = TECHNICIAN.root
  const ankleR: V3 = { x: root[0] + 0.13, y: 0.06, z: root[2] + 0.11 }
  const preferKneeR: V3 = { x: root[0] + 0.13, y: 0.075, z: root[2] - 0.28 }
  const ankleL: V3 = { x: root[0] - 0.1, y: 0.09, z: root[2] + 0.24 }
  const preferKneeL: V3 = { x: root[0] - 0.11, y: 0.28, z: root[2] - 0.1 }
  return { R: solveLeg(1, ankleR, preferKneeR), L: solveLeg(-1, ankleL, preferKneeL) }
}

export type GestureKey = { t: number; lean: number; tipTarget: Vec3; toolRoll: number; headPitch: number }

function buildGestureKeys(): GestureKey[] {
  const screw = FRIDGE_SERVICE.screw
  const H = TECHNICIAN.hoverP0
  const rest: Vec3 = [screw[0] + 0.05, screw[1] + 0.03, screw[2] + 0.1]
  const regrip: Vec3 = [screw[0], screw[1] + 0.008, screw[2] + 0.01]
  return [
    { t: 0, lean: 0.44, tipTarget: H, toolRoll: 0, headPitch: -0.5 },
    { t: 400, lean: 0.5, tipTarget: screw, toolRoll: 0, headPitch: -0.62 },
    { t: 800, lean: 0.52, tipTarget: screw, toolRoll: 0.12, headPitch: -0.64 },
    { t: 1200, lean: 0.5, tipTarget: regrip, toolRoll: 0.02, headPitch: -0.6 },
    { t: 1650, lean: 0.52, tipTarget: screw, toolRoll: -0.12, headPitch: -0.64 },
    { t: 2050, lean: 0.48, tipTarget: H, toolRoll: 0, headPitch: -0.58 },
    { t: 2500, lean: 0.46, tipTarget: rest, toolRoll: 0, headPitch: -0.55 },
    { t: 3000, lean: 0.46, tipTarget: rest, toolRoll: 0, headPitch: -0.55 },
  ]
}

export const GESTURE_KEYS = buildGestureKeys()

function poseAtKey(key: GestureKey, legs: { R: LegSolution; L: LegSolution }): JointPose {
  const sr = shoulderPos(1, key.lean)
  const armR = solveToolArm(sr, toV3(key.tipTarget))
  const sl = shoulderPos(-1, key.lean)
  const armL = solveHandArm(sl, toV3(TECHNICIAN.leftWristPanel))
  return {
    torso: -key.lean,
    head: key.headPitch,
    shoulderYawR: armR.yaw,
    shoulderR: armR.sh,
    elbowR: armR.el,
    wristPitchR: armR.wr,
    toolRollR: key.toolRoll,
    shoulderYawL: armL.yaw,
    shoulderL: armL.sh,
    elbowL: armL.el,
    hipYawR: legs.R.yaw,
    hipR: legs.R.hip,
    kneeR: legs.R.knee,
    ankleR: legs.R.ankle,
    hipYawL: legs.L.yaw,
    hipL: legs.L.hip,
    kneeL: legs.L.knee,
    ankleL: legs.L.ankle,
  }
}

/** Clip horneado: una pose por keyframe (determinista, sin IK en runtime). */
const LEGS = kneelLegs()
const BAKED: JointPose[] = GESTURE_KEYS.map((k) => poseAtKey(k, LEGS))

const smooth01 = (u: number) => u * u * (3 - 2 * u)
const clamp01 = (u: number) => (u < 0 ? 0 : u > 1 ? 1 : u)

/** Muestreo ABSOLUTO del gesto (ms 0–3000). Sin acumulación. */
export function sampleGesture(tMs: number): JointPose {
  const t = clamp(tMs, 0, 3000)
  const keys = GESTURE_KEYS
  let i = 0
  while (i < keys.length - 2 && t >= keys[i + 1].t) i++
  const a = BAKED[i]
  const b = BAKED[i + 1]
  const u = smooth01(clamp01((t - keys[i].t) / Math.max(1, keys[i + 1].t - keys[i].t)))
  const lerp = (x: number, y: number) => x + (y - x) * u
  return {
    torso: lerp(a.torso, b.torso),
    head: lerp(a.head, b.head),
    shoulderYawR: lerp(a.shoulderYawR, b.shoulderYawR),
    shoulderR: lerp(a.shoulderR, b.shoulderR),
    elbowR: lerp(a.elbowR, b.elbowR),
    wristPitchR: lerp(a.wristPitchR, b.wristPitchR),
    toolRollR: lerp(a.toolRollR, b.toolRollR),
    shoulderYawL: lerp(a.shoulderYawL, b.shoulderYawL),
    shoulderL: lerp(a.shoulderL, b.shoulderL),
    elbowL: lerp(a.elbowL, b.elbowL),
    hipYawR: a.hipYawR, hipR: a.hipR, kneeR: a.kneeR, ankleR: a.ankleR,
    hipYawL: a.hipYawL, hipL: a.hipL, kneeL: a.kneeL, ankleL: a.ankleL,
  }
}

/** Poses semánticas: P0 inspección, P1 trabajo, P2 descanso (estable). */
export const POSE_P0 = BAKED[0]
export const POSE_P1 = BAKED[2]
export const POSE_P2 = BAKED[BAKED.length - 1]

/** FK completa: punta del destornillador en mundo (verificación + QA). */
export function computeToolTip(pose: JointPose): V3 {
  const sr = shoulderPos(1, -pose.torso)
  return chainTip(sr, pose.shoulderYawR, pose.shoulderR, pose.elbowR, pose.wristPitchR)
}

/** FK rodilla derecha (mundo): debe rozar el suelo sin hundirse. */
export function computeRightKnee(): V3 {
  return LEGS.R.kneePos
}

/** FK pie izquierdo (mundo): debe permanecer plantado (drift 0). */
export function computeLeftFoot(): V3 {
  return LEGS.L.footPos
}

/** FK mano izquierda (mundo): conserva el apoyo en la cubierta. */
export function computeLeftHand(pose: JointPose): V3 {
  const sl = shoulderPos(-1, -pose.torso)
  const e = add(sl, scale(limbDir(pose.shoulderYawL, pose.shoulderL), SKELETON.upperLen))
  return add(e, scale(limbDir(pose.shoulderYawL, pose.shoulderL + pose.elbowL), SKELETON.foreLen))
}

export function toolTipDistance(pose: JointPose): number {
  const tip = computeToolTip(pose)
  const s = FRIDGE_SERVICE.screw
  return Math.hypot(tip.x - s[0], tip.y - s[1], tip.z - s[2])
}

/** Barrido del clip: cobertura de contacto en la fase efectiva P1. */
export function gestureContactQA(stepMs = 50): {
  samples: { t: number; dist: number }[]
  p1Coverage: number
  maxP1Dist: number
  maxBakedTipErr: number
  kneeY: number
  footY: number
  leftHandErr: number
} {
  const samples: { t: number; dist: number }[] = []
  let inside = 0
  let total = 0
  let maxP1 = 0
  for (let t = 0; t <= 3000; t += stepMs) {
    const d = toolTipDistance(sampleGesture(t))
    samples.push({ t, dist: d })
    if (t >= 400 && t <= 2050) {
      total++
      if (d <= 0.02) inside++
      if (d > maxP1) maxP1 = d
    }
  }
  // Error de horneado en los keyframes de contacto (debe ser ~0).
  let maxBaked = 0
  for (const k of GESTURE_KEYS) {
    if (k.tipTarget !== FRIDGE_SERVICE.screw) continue
    const sr = shoulderPos(1, k.lean)
    const sol = solveToolArm(sr, toV3(k.tipTarget))
    if (sol.tipErr > maxBaked) maxBaked = sol.tipErr
  }
  const lh = computeLeftHand(sampleGesture(1200))
  const lw = TECHNICIAN.leftWristPanel
  return {
    samples,
    p1Coverage: total ? inside / total : 0,
    maxP1Dist: maxP1,
    maxBakedTipErr: maxBaked,
    kneeY: computeRightKnee().y,
    footY: computeLeftFoot().y,
    leftHandErr: Math.hypot(lh.x - lw[0], lh.y - lw[1], lh.z - lw[2]),
  }
}
