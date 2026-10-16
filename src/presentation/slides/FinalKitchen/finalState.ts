// FINAL KITCHEN V6.0 — estado de navegación y tipos del frame final.

import type { FinalBeatId } from './finalTimings'
import { FINAL_BEATS, beatIndex } from './finalTimings'
import type { Vec3 } from './finalGeometry'

export type { FinalBeatId }

export type FinalViewport = { width: number; height: number; aspect: number }

export type LightScales = {
  spot: number
  lamp: number
  pantry: number
  window: number
  rim: number
  bounce: number
  ambient: number
  hemi: number
  bulbEmissive: number
  windowEmissive: number
  strip: number
  screen: number
}

export const LIGHTS_FULL: LightScales = {
  spot: 1, lamp: 1, pantry: 1, window: 1, rim: 1, bounce: 1,
  ambient: 1, hemi: 1, bulbEmissive: 1, windowEmissive: 1, strip: 1, screen: 1,
}

export type TechPoseId = 'hidden' | 'P0' | 'P1' | 'P2'

export type FinalFrame = {
  camPos: Vec3
  camTarget: Vec3
  camUp: Vec3
  techPose: TechPoseId
  /** Tiempo local del gesto (ms desde su inicio) o null si inactivo. */
  gestureT: number | null
  lights: LightScales
  /** Opacidad del quad de blackout negro puro (0–1). */
  blackout: number
  phase: 'stable' | 'transition'
  qa: {
    beat: FinalBeatId
    localTime: number
    /** Progreso del dive p (1 = portal, 0 = A_WIDE) o null fuera de W01/W02. */
    diveP: number | null
    coveredLostAt: number | null
  }
}

export type FinalNavState = { beat: FinalBeatId; localTime: number }

export function initialFinalNav(params?: URLSearchParams): FinalNavState {
  const q = params ?? (typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : new URLSearchParams())
  const beat = q.get('finalBeat') as FinalBeatId | null
  if (beat && (FINAL_BEATS as string[]).includes(beat)) return { beat, localTime: 0 }
  return { beat: 'W00', localTime: 0 }
}

/** Avance manual: ignora NEXT durante transiciones (pose íntegra, §2.4). */
export function finalNext(state: FinalNavState, stable: boolean): FinalNavState {
  if (!stable) return state
  const i = beatIndex(state.beat)
  if (i < 0 || i >= FINAL_BEATS.length - 1) return state
  let n = FINAL_BEATS[i + 1]
  // W01/W02: un solo movimiento — entrar a W01 ejecuta el travelling y la
  // llegada resuelve la fase interna W02 sin NEXT adicional.
  return { beat: n, localTime: 0 }
}

export function finalPrev(state: FinalNavState): FinalNavState {
  const i = beatIndex(state.beat)
  if (i <= 0) return state
  // Retroceso sin repetición inesperada (§12.3): desde W02 se vuelve a W00
  // (portal estático, sin replay del travelling) en lugar de reentrar a W01.
  if (state.beat === 'W02') return { beat: 'W00', localTime: 0 }
  return { beat: FINAL_BEATS[i - 1], localTime: 0 }
}

export function finalJump(beat: FinalBeatId): FinalNavState {
  return { beat, localTime: 0 }
}

/** Query QA: ?finalBeat=W06&finalPose=P1&finalDebug=1 */
export function finalQueryPose(): TechPoseId | null {
  if (typeof window === 'undefined') return null
  const p = new URLSearchParams(window.location.search).get('finalPose')
  return p === 'P0' || p === 'P1' || p === 'P2' ? p : null
}

export function finalDebugEnabled(): boolean {
  if (typeof window === 'undefined') return false
  return new URLSearchParams(window.location.search).get('finalDebug') === '1'
}

export function finalReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  if (new URLSearchParams(window.location.search).get('finalReduced') === '1') return true
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}
