// FINAL KITCHEN V6.0 — instrumentación QA (sólo desarrollo).
// Expone window.__finalDirector / __finalDivePose / __finalFrame / __finalQA
// + parámetros ?finalBeat= ?finalp= ?finalPose= ?finalDebug=1.
// Las funciones de barrido son matemática independiente (réplica documentada
// de s01Portal + FinalDirector): si el espejo y el runtime discrepan, el QA
// lo revela en lugar de auto-confirmarse.

import { finalDirector, sampleUndiveAt } from './FinalDirector'
import { gestureContactQA } from './TechnicianAnimation'
import { DIVE_MS } from './finalTimings'
import type { FinalBeatId } from './finalTimings'
import type { Vec3 } from './finalGeometry'

/* ---- espejo matemático (fuente: s01CinematicConfig/s01Portal/finalGeometry) */

const PHONE = { group: [0.1, 0.915, -0.02] as const, yaw: 0.14, screenY: 0.9207, sw: 0.066, sh: 0.142 }
const PORTAL = { fov: 36, overscan: 1.16 }
const WIDE = { pos: [2.5, 1.82, 3.35] as const, target: [0.15, 0.72, -0.6] as const }

function screenFrame() {
  const sy = Math.sin(PHONE.yaw)
  const cy = Math.cos(PHONE.yaw)
  const up: [number, number, number] = [-sy, 0, -cy]
  const right: [number, number, number] = [-up[2], 0, up[0]]
  return {
    center: [PHONE.group[0], PHONE.screenY, PHONE.group[2]] as [number, number, number],
    up,
    right,
    hw: PHONE.sw / 2,
    hh: PHONE.sh / 2,
  }
}

function portalDistance(aspect: number): number {
  const t = Math.tan(((PORTAL.fov / 2) * Math.PI) / 180)
  const dH = PHONE.sh / 2 / (t * PORTAL.overscan)
  const dW = PHONE.sw / 2 / (t * aspect * PORTAL.overscan)
  return Math.min(dH, dW)
}

type M3 = [number, number, number, number, number, number, number, number, number]

function lookAt(eye: Vec3, target: Vec3, up: Vec3): M3 {
  let zx = eye[0] - target[0]
  let zy = eye[1] - target[1]
  let zz = eye[2] - target[2]
  const zl = Math.hypot(zx, zy, zz) || 1
  zx /= zl; zy /= zl; zz /= zl
  let xx = up[1] * zz - up[2] * zy
  let xy = up[2] * zx - up[0] * zz
  let xz = up[0] * zy - up[1] * zx
  const xl = Math.hypot(xx, xy, xz) || 1
  xx /= xl; xy /= xl; xz /= xl
  const yx = zy * xz - zz * xy
  const yy = zz * xx - zx * xz
  const yz = zx * xy - zy * xx
  // Filas: [x | y | z] (multiplicación row-major en projectCorner).
  return [xx, xy, xz, yx, yy, yz, zx, zy, zz]
}

function projectCorner(
  c: Vec3,
  eye: Vec3,
  view: M3,
  tanV: number,
  aspect: number,
): { x: number; y: number; behind: boolean } {
  const dx = c[0] - eye[0]
  const dy = c[1] - eye[1]
  const dz = c[2] - eye[2]
  const vx = view[0] * dx + view[1] * dy + view[2] * dz
  const vy = view[3] * dx + view[4] * dy + view[5] * dz
  const vz = view[6] * dx + view[7] * dy + view[8] * dz
  // Cámara mira hacia −Z de vista: delante = vz < 0.
  if (vz >= -0.015) return { x: 0, y: 0, behind: true }
  const tanH = tanV * aspect
  return { x: vx / (-vz * tanH), y: vy / (-vz * tanV), behind: false }
}

/** Cobertura por p con matemática independiente (no usa THREE). */
export function mirrorCoverage(p: number, aspect: number, margin = 0.08): boolean {
  const pose = sampleUndiveAt(p, aspect)
  const f = screenFrame()
  const view = lookAt(pose.pos, pose.target, pose.up)
  const tanV = Math.tan(((PORTAL.fov / 2) * Math.PI) / 180)
  const corners: Array<Vec3> = [
    [f.center[0] - f.right[0] * f.hw + f.up[0] * f.hh, f.center[1] + f.up[1] * f.hh, f.center[2] - f.right[2] * f.hw + f.up[2] * f.hh],
    [f.center[0] + f.right[0] * f.hw + f.up[0] * f.hh, f.center[1] + f.up[1] * f.hh, f.center[2] + f.right[2] * f.hw + f.up[2] * f.hh],
    [f.center[0] + f.right[0] * f.hw - f.up[0] * f.hh, f.center[1] - f.up[1] * f.hh, f.center[2] + f.right[2] * f.hw - f.up[2] * f.hh],
    [f.center[0] - f.right[0] * f.hw - f.up[0] * f.hh, f.center[1] - f.up[1] * f.hh, f.center[2] - f.right[2] * f.hw - f.up[2] * f.hh],
  ]
  for (const c of corners) {
    const ndc = projectCorner(c, pose.pos, view, tanV, aspect)
    if (ndc.behind || (Math.abs(ndc.x) < 1 + margin && Math.abs(ndc.y) < 1 + margin)) return false
  }
  return true
}

export const COVERAGE_SAMPLES = [1, 0.99, 0.975, 0.95, 0.9, 0.85, 0.8, 0.75, 0.65, 0.5, 0.25, 0]

export function coverageSweep(aspect = 16 / 9): { p: number; covered: boolean }[] {
  return COVERAGE_SAMPLES.map((p) => ({ p, covered: mirrorCoverage(p, aspect) }))
}

/** Primer p (descendiendo de 1) donde se pierde la cobertura. */
export function firstCoverageLoss(aspect = 16 / 9): number | null {
  for (const p of COVERAGE_SAMPLES) {
    if (!mirrorCoverage(p, aspect)) return p
  }
  return null
}

/** Distancia mínima cámara↔mesada (y=0.915) dentro de la huella de la isla.
 * minClearance incluye el despegue del teléfono (portal ≈ 0.055: esperado);
 * travelClearance excluye p>0.98 (margen de la auditoría ≈6cm en el tramo). */
export function corridorSweep(aspect = 16 / 9, n = 64): {
  minClearance: number
  atP: number
  travelClearance: number
  travelAtP: number
  inside: number
} {
  let min = Infinity
  let atP = 0
  let travel = Infinity
  let travelAtP = 0
  let inside = 0
  for (let i = 0; i <= n; i++) {
    const p = 1 - i / n
    const pose = sampleUndiveAt(p, aspect)
    const [x, y, z] = pose.pos
    const inFoot = x >= -1.5 && x <= 0.8 && z >= -0.825 && z <= 0.125
    if (inFoot) {
      inside++
      const clearance = y - 0.915
      if (clearance < min) {
        min = clearance
        atP = p
      }
      if (p <= 0.98 && clearance < travel) {
        travel = clearance
        travelAtP = p
      }
    }
  }
  return { minClearance: min === Infinity ? -1 : min, atP, travelClearance: travel === Infinity ? -1 : travel, travelAtP, inside }
}

export function portalDistanceQA(aspect = 16 / 9) {
  return { aspect, distance: portalDistance(aspect), near: 0.015 }
}

export function blackoutExpectation() {
  const frame = finalDirector.evaluateFinalFrame('W14', 9999, { width: 1280, height: 720, aspect: 16 / 9 }, true, false)
  const vals = Object.entries(frame.lights)
  const allZero = vals.every(([, v]) => v === 0)
  return { allLightsZero: allZero, blackout: frame.blackout, lights: frame.lights }
}

export type FinalQAApi = {
  getBeat: () => FinalBeatId
  goNext: () => void
  goPrev: () => void
  goJump: (b: FinalBeatId) => void
}

export function exposeFinalQA(api: FinalQAApi | null) {
  if (typeof window === 'undefined') return
  const w = window as unknown as Record<string, unknown>
  if (api === null) {
    delete w.__finalQA
    return
  }
  w.__finalQA = {
    ...api,
    director: finalDirector,
    diveMs: DIVE_MS,
    coverageSweep,
    firstCoverageLoss,
    corridorSweep,
    portalDistanceQA,
    blackoutExpectation,
    contactQA: gestureContactQA,
    wide: WIDE,
  }
}
