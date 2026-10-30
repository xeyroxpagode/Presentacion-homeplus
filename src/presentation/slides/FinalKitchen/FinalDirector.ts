// FINAL KITCHEN V6.0 — FinalDirector (separado de s01Director).
// Contrato: evaluateFinalFrame(beatId, localTime, viewport, assetsReady).
// Salida absoluta (sin acumulaciones frame a frame). No escribe el singleton
// s01Director: importa sólo constantes de s01CinematicConfig/s01Portal y el
// TIPO S01Frame para construir el frame congelado finalRest.

import { s01AccumDocs, s01Anchors, s01Dishes, s01Docs, s01Geo, s01Loose, s01Smoke } from '../S01Chaos/three/s01CinematicConfig'
import { s01PortalFinal } from '../S01Chaos/three/s01Portal'
import type { S01Frame } from '../S01Chaos/three/s01Director'
import {
  A_WIDE,
  BACKPACK,
  CAM_FACTURA,
  CAM_FRIDGE,
  CAM_MOCHILA,
  FINAL_REST_OVERRIDES,
  PAPER_STACK,
} from './finalGeometry'
import type { Vec3 } from './finalGeometry'
import {
  BLACKOUT_FADE_MS,
  DIVE_MS,
  FINAL_BEAT_DEFS,
  GESTURE_MS,
  GESTURE_START_IN_W06,
  LIGHT_FADE_MS,
  REDUCED_DIVE_MS,
} from './finalTimings'
import type { FinalBeatId } from './finalTimings'
import type { FinalFrame, FinalViewport, LightScales, TechPoseId } from './finalState'
import { LIGHTS_FULL } from './finalState'
import { finalDiveBridgeDebug } from './finalDiveBridge'

/* ---------------- easings (réplica exacta del dive donante) -------------- */

const clamp01 = (u: number) => (u < 0 ? 0 : u > 1 ? 1 : u)
const easeInOut = (u: number) => (u < 0.5 ? 4 * u * u * u : 1 - Math.pow(-2 * u + 2, 3) / 2)
const easeOut = (u: number) => 1 - Math.pow(1 - u, 3)
const smooth = (u: number) => u * u * (3 - 2 * u)
const lerp = (a: number, b: number, u: number) => a + (b - a) * u
const lerp3 = (a: Vec3, b: Vec3, u: number): Vec3 => [lerp(a[0], b[0], u), lerp(a[1], b[1], u), lerp(a[2], b[2], u)]

export type CamPose = { pos: Vec3; target: Vec3; up: Vec3 }

/**
 * Pose del travelling en p (1 = portal inside, 0 = A_WIDE).
 * Misma geometría que sampleScript5 del donante: posición easeInOut,
 * target easeOut (lidera), up smooth desde 15%. Sin easing adicional.
 */
export function sampleUndiveAt(p: number, aspect: number): CamPose {
  const pu = clamp01(p)
  const wide = s01Anchors.A_WIDE
  const fin = s01PortalFinal(aspect)
  const pos = lerp3(wide.pos as Vec3, fin.pos, easeInOut(pu))
  const target = lerp3(wide.target as Vec3, fin.target, easeOut(pu))
  const uU = smooth(clamp01((pu - 0.15) / 0.85))
  const up: Vec3 = [lerp(0, fin.up[0], uU), lerp(1, fin.up[1], uU), lerp(0, fin.up[2], uU)]
  return { pos, target, up }
}

/* ---------------- niveles de luz por beat (objetivo) ---------------------- */

const LIGHT_TARGETS: Record<FinalBeatId, LightScales> = {
  W00: LIGHTS_FULL, W01: LIGHTS_FULL, W02: LIGHTS_FULL, W03: LIGHTS_FULL,
  W04: LIGHTS_FULL, W05: LIGHTS_FULL, W06: LIGHTS_FULL, W07: LIGHTS_FULL,
  W08: LIGHTS_FULL,
  // Primer tap: se apaga la casa, pero el celular queda encendido e intacto.
  W09: { ...LIGHTS_FULL, spot: 0, lamp: 0, pantry: 0, bounce: 0, window: 0, windowEmissive: 0, rim: 0, ambient: 0, hemi: 0, bulbEmissive: 0, strip: 0, screen: 1 },
  // Segundo tap: se apaga el celular; el cuadro termina en negro absoluto.
  W14: { ...LIGHTS_FULL, spot: 0, lamp: 0, pantry: 0, bounce: 0, window: 0, windowEmissive: 0, rim: 0, ambient: 0, hemi: 0, bulbEmissive: 0, strip: 0, screen: 0 },
}

function prevBeatWithLights(beat: FinalBeatId): FinalBeatId {
  const order: FinalBeatId[] = ['W00', 'W01', 'W02', 'W03', 'W04', 'W05', 'W06', 'W07', 'W08', 'W09', 'W14']
  const i = order.indexOf(beat)
  return i <= 0 ? order[0] : order[i - 1]
}

function mixLights(a: LightScales, b: LightScales, u: number): LightScales {
  const o = {} as LightScales
  for (const k of Object.keys(a) as (keyof LightScales)[]) o[k] = lerp(a[k], b[k], u)
  return o
}

/* ---------------- frame congelado finalRest ------------------------------ */

function doorWorld(local: Vec3, theta: number): Vec3 {
  const F = s01Geo.fridge
  const c = Math.cos(theta)
  const s = Math.sin(theta)
  const x = local[0] * c + local[2] * s
  const z = -local[0] * s + local[2] * c
  return [F.group[0] + F.hingeX + x, F.group[1] + F.botCenterY + local[1], F.group[2] + F.hingeZ + z]
}

/** Póliza: slide final post-acumulación (réplica de POLICY_ACCUM privada). */
const POLICY_ACCUM = { p: [-0.13, 0.051, -0.06] as Vec3, r: [0, 0.12, 0] as Vec3 }

/**
 * Frame S01 congelado del cierre: equivale al fin de script5 (acumulación
 * asentada) + overrides finalRest §6.1. No ejecuta caos, no toca S01.
 */
export function buildFinalRestFrame(): S01Frame {
  const docs = s01Docs.map((d, i) => {
    if (i === FINAL_REST_OVERRIDES.doc3.index) {
      return { p: [...FINAL_REST_OVERRIDES.doc3.p] as Vec3, r: [...FINAL_REST_OVERRIDES.doc3.r] as Vec3, v: 1 }
    }
    if (i === FINAL_REST_OVERRIDES.manual.index) {
      return { p: [...FINAL_REST_OVERRIDES.manual.p] as Vec3, r: [...FINAL_REST_OVERRIDES.manual.r] as Vec3, v: 1 }
    }
    return { p: [...d.accum] as Vec3, r: [...d.accumRot] as Vec3, v: 1 }
  })
  return {
    camPos: [...A_WIDE.position] as Vec3,
    camTarget: [...A_WIDE.target] as Vec3,
    camUp: [0, 1, 0],
    blackout: 0,
    pantry: [s01Geo.pantry.leafA_L.open, s01Geo.pantry.leafA_R.open, s01Geo.pantry.leafB_R.open],
    fTop: s01Geo.fridge.topRest,
    fBot: s01Geo.fridge.botRest,
    fLift: 0,
    fRoll: 0,
    fShift: 0,
    drawer: s01Geo.docTower.drawerTravel,
    manualCover: (57 * Math.PI) / 180,
    fridgeLight: 0,
    kitchenLight: 1,
    apple: { p: [...FINAL_REST_OVERRIDES.apple.p] as Vec3, r: [...FINAL_REST_OVERRIDES.apple.r] as Vec3 },
    water: { p: [...s01Geo.fridgeFood.waterLand] as Vec3, r: [0, 0, Math.PI / 2] as Vec3 },
    eggA: { p: doorWorld(s01Geo.fridgeFood.eggADoor, s01Geo.fridge.botRest), r: [0, 0, 0] as Vec3 },
    eggB: { p: [...FINAL_REST_OVERRIDES.eggB.p] as Vec3, r: [...FINAL_REST_OVERRIDES.eggB.r] as Vec3 },
    policy: { p: [...POLICY_ACCUM.p] as Vec3, r: [...POLICY_ACCUM.r] as Vec3 },
    docs,
    accumDocs: s01AccumDocs.map((d) => ({ p: [...d.p] as Vec3, r: [...d.r] as Vec3, v: 1 })),
    loose: s01Loose.map((l) => ({ p: [...l.accum] as Vec3, r: [...l.accumRot] as Vec3 })),
    list: { p: [...s01Geo.listAccum] as Vec3, r: [0, 0.14, 0] as Vec3 },
    smoke: s01GeoSmokeOrigins(),
    dishes: s01Dishes.map((d) => ({ p: [...d.p] as Vec3, r: [...d.r] as Vec3, v: 1 })),
  }
}

function s01GeoSmokeOrigins(): S01Frame['smoke'] {
  // Humo: REGLA ABSOLUTA — en HOLD siempre 0 (sólo orígenes, invisibles).
  return s01Smoke.map((s) => ({ p: [...s.origin] as Vec3, s: 0.001, o: 0 }))
}

/* ---------------- director ------------------------------------------------ */

export class FinalDirector {
  /** Mochila: bbox real → anchor (se fija al montar; determinista). */
  mochilaCam: CamPose = { pos: [...CAM_MOCHILA.position] as Vec3, target: [...CAM_MOCHILA.target] as Vec3, up: [0, 1, 0] }

  evaluateFinalFrame(
    beat: FinalBeatId,
    localTime: number,
    viewport: FinalViewport,
    assetsReady: boolean,
    reducedMotion = false,
  ): FinalFrame {
    const t = Math.max(0, localTime)
    const def = FINAL_BEAT_DEFS[beat]
    const diveMs = reducedMotion ? REDUCED_DIVE_MS : DIVE_MS
    void BACKPACK
    void PAPER_STACK
    // assetsReady: la escena no inicia el travelling sin recursos críticos;
    // la guarda vive en FinalKitchenCanvas (no se evalúa frame sin preload).
    void assetsReady

    // --- cámara ---
    let cam: CamPose
    let diveP: number | null = null
    let stable: boolean
    if (beat === 'W00') {
      cam = sampleUndiveAt(1, viewport.aspect)
      stable = true
    } else if (beat === 'W01' || beat === 'W02') {
      // W01 = travelling (p: 1→0 en 3100ms). W02 = fase interna de llegada:
      // p=0 fijo (A_WIDE, HOLD). La inspección ?finalp= en W02 la resuelve
      // FinalCamera evaluando como W01 con t mapeado.
      const p = beat === 'W02' ? 0 : reducedMotion ? 0 : 1 - clamp01(t / diveMs)
      diveP = p
      cam = sampleUndiveAt(p, viewport.aspect)
      stable = beat === 'W02' ? true : t >= diveMs
    } else if (beat === 'W03') {
      cam = { pos: [...A_WIDE.position] as Vec3, target: [...A_WIDE.target] as Vec3, up: [0, 1, 0] }
      stable = true
    } else if (beat === 'W04' || beat === 'W05' || beat === 'W06' || beat === 'W07') {
      const from = beat === 'W04' ? widePose() : beat === 'W05' ? this.mochilaCam : beat === 'W06' ? facturaPose() : fridgePose()
      const to = beat === 'W04' ? this.mochilaCam : beat === 'W05' ? facturaPose() : beat === 'W06' ? fridgePose() : widePose()
      const u = reducedMotion ? 1 : easeInOut(clamp01(t / def.moveMs))
      cam = {
        pos: lerp3(from.pos, to.pos, u),
        target: lerp3(from.target, to.target, u),
        up: [0, 1, 0],
      }
      stable = reducedMotion || t >= def.moveMs
    } else {
      // W08–W14: cámara fijada a A_WIDE (sin micro-push, sin zoom).
      cam = { pos: [...A_WIDE.position] as Vec3, target: [...A_WIDE.target] as Vec3, up: [0, 1, 0] }
      stable = def.kind === 'hold' || reducedMotion ? true : t >= (beat === 'W14' ? BLACKOUT_FADE_MS : LIGHT_FADE_MS)
    }

    // --- técnico ---
    let techPose: TechPoseId = 'hidden'
    let gestureT: number | null = null
    if (beat === 'W06') {
      techPose = 'P0'
      if (t >= GESTURE_START_IN_W06) {
        gestureT = Math.min(t - GESTURE_START_IN_W06, GESTURE_MS)
        techPose = gestureT >= GESTURE_MS ? 'P2' : 'P1'
        if (gestureT <= 0) techPose = 'P0'
      }
    } else if (beatIndexOf(beat) > beatIndexOf('W06')) {
      techPose = 'P2'
      gestureT = GESTURE_MS
    }

    // --- luces (fundido absoluto desde el nivel del beat anterior) ---
    const prev = LIGHT_TARGETS[prevBeatWithLights(beat)]
    const target = LIGHT_TARGETS[beat]
    let lights: LightScales
    if (beat === 'W09' && !reducedMotion) {
      const phases: { at: number; light: LightScales }[] = [
        { at: 0, light: LIGHTS_FULL },
        { at: 600, light: { ...LIGHTS_FULL, spot: 0.7, lamp: 0.7, pantry: 0.55, bounce: 0.7 } },
        { at: 1250, light: { ...LIGHTS_FULL, spot: 0.5, lamp: 0.42, pantry: 0.25, bounce: 0.4, window: 0.3, rim: 0.3, windowEmissive: 0.3 } },
        { at: 1900, light: { ...LIGHTS_FULL, spot: 0.05, lamp: 0.05, pantry: 0.05, bounce: 0.1, window: 0, rim: 0.05, windowEmissive: 0, bulbEmissive: 0.05 } },
        { at: 2500, light: LIGHT_TARGETS.W09 },
        { at: 3000, light: LIGHT_TARGETS.W09 },
      ]
      const nextIndex = phases.findIndex((p) => t < p.at)
      const i = nextIndex < 0 ? phases.length - 1 : Math.max(0, nextIndex - 1)
      const a = phases[i]
      const b = phases[Math.min(i + 1, phases.length - 1)]
      lights = mixLights(a.light, b.light, easeInOut(clamp01((t - a.at) / Math.max(1, b.at - a.at))))
    } else if (def.kind === 'fade' && !reducedMotion) {
      const fadeMs = beat === 'W14' ? BLACKOUT_FADE_MS : LIGHT_FADE_MS
      lights = mixLights(prev, target, easeInOut(clamp01(t / fadeMs)))
    } else {
      lights = { ...target }
    }

    // --- blackout (negro puro #000, sólo W14) ---
    const blackout = beat === 'W14' ? (reducedMotion ? 1 : easeInOut(clamp01(t / BLACKOUT_FADE_MS))) : 0

    const bridge = finalDiveBridgeDebug()

    return {
      camPos: cam.pos,
      camTarget: cam.target,
      camUp: cam.up,
      techPose,
      gestureT,
      lights,
      blackout,
      phase: stable ? 'stable' : 'transition',
      qa: {
        beat,
        localTime: t,
        diveP,
        coveredLostAt: bridge.coveredLostAt,
      },
    }
  }
}

function beatIndexOf(beat: FinalBeatId): number {
  return (['W00', 'W01', 'W02', 'W03', 'W04', 'W05', 'W06', 'W07', 'W08', 'W09', 'W14'] as FinalBeatId[]).indexOf(beat)
}

function widePose(): CamPose {
  return { pos: [...A_WIDE.position] as Vec3, target: [...A_WIDE.target] as Vec3, up: [0, 1, 0] }
}

function facturaPose(): CamPose {
  return { pos: [...CAM_FACTURA.position] as Vec3, target: [...CAM_FACTURA.target] as Vec3, up: [0, 1, 0] }
}

function fridgePose(): CamPose {
  return { pos: [...CAM_FRIDGE.position] as Vec3, target: [...CAM_FRIDGE.target] as Vec3, up: [0, 1, 0] }
}

export const finalDirector = new FinalDirector()
