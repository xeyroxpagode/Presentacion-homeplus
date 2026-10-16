import * as THREE from 'three'
import { s01Geo, s01Portal } from './s01CinematicConfig'
import type { Vec3 } from './s01CinematicConfig'

/* S01 PHONE PORTAL — matemática del frame del screen (§76–§79).
 * El teléfono queda quieto; la cámara se acerca físicamente hasta que
 * PHONE_SCREEN cubre el 108% del viewport en ambos ejes. Sin fade,
 * sin overlay, sin scale, sin FOV zoom, sin teleport. */

export type ScreenFrame = {
  /** C — centro del screen en mundo. */
  center: Vec3
  /** N — normal del screen (= +Y, face-up). */
  normal: Vec3
  /** U — up del screen (hacia el top físico del teléfono). */
  up: Vec3
  /** R — right del screen (U × N, triedro directo con R × U = N). */
  right: Vec3
  width: number
  height: number
}

/** Frame analítico del screen (el rig es determinista: pos + yaw fijos). */
export function s01ScreenFrame(): ScreenFrame {
  const p = s01Geo.phone
  const yaw = p.yaw
  const sy = Math.sin(yaw)
  const cy = Math.cos(yaw)
  // Top del teléfono → fondo de cocina (-z) rotado por yaw.
  const up: Vec3 = [-sy, 0, -cy]
  const normal: Vec3 = [0, 1, 0]
  // R = U × N.
  const right: Vec3 = [-up[2], 0, up[0]]
  return {
    center: [p.group[0], p.screenY, p.group[2]],
    normal,
    up,
    right,
    width: p.screenSize[0],
    height: p.screenSize[1],
  }
}

/** Distancia frontal para que el screen cubra el overscan en AMBOS ejes
 *  (V4.2 §37: overscan 1.16 → EDGES ±8%, margen negro real en 4 lados).
 *  Viewport objetivo = screen / overscan en cada eje, por eso el overscan
 *  DIVIDE. Para screen portrait en viewport landscape manda el ancho:
 *  d = min(dH, dW). Nunca cruza el plano. */
export function s01PortalDistance(aspect: number): number {
  const f = s01ScreenFrame()
  const t = Math.tan(((s01Portal.fov / 2) * Math.PI) / 180)
  const dH = f.height / 2 / (t * s01Portal.overscan)
  const dW = f.width / 2 / (t * aspect * s01Portal.overscan)
  return Math.min(dH, dW)
}

/** Pose frontal ideal: pos = C + N·d, forward = −N, up = U. */
export function s01PortalFinal(aspect: number): { pos: Vec3; target: Vec3; up: Vec3 } {
  const f = s01ScreenFrame()
  const d = s01PortalDistance(aspect)
  return {
    pos: [f.center[0] + f.normal[0] * d, f.center[1] + f.normal[1] * d, f.center[2] + f.normal[2] * d],
    target: [f.center[0], f.center[1], f.center[2]],
    up: [f.up[0], f.up[1], f.up[2]],
  }
}

const _m = /* @__PURE__ */ new THREE.Matrix4()
const _q = /* @__PURE__ */ new THREE.Quaternion()
const _pos = /* @__PURE__ */ new THREE.Vector3()
const _tgt = /* @__PURE__ */ new THREE.Vector3()
const _up = /* @__PURE__ */ new THREE.Vector3()
const _v = /* @__PURE__ */ new THREE.Vector3()

function screenCornersWorld(): Array<[number, number, number]> {
  const f = s01ScreenFrame()
  const hw = f.width / 2
  const hh = f.height / 2
  return [
    [f.center[0] - f.right[0] * hw + f.up[0] * hh, f.center[1] + f.up[1] * hh, f.center[2] - f.right[2] * hw + f.up[2] * hh],
    [f.center[0] + f.right[0] * hw + f.up[0] * hh, f.center[1] + f.up[1] * hh, f.center[2] + f.right[2] * hw + f.up[2] * hh],
    [f.center[0] + f.right[0] * hw - f.up[0] * hh, f.center[1] - f.up[1] * hh, f.center[2] + f.right[2] * hw - f.up[2] * hh],
    [f.center[0] - f.right[0] * hw - f.up[0] * hh, f.center[1] - f.up[1] * hh, f.center[2] - f.right[2] * hw - f.up[2] * hh],
  ]
}

/**
 * Cobertura real con la cámara viva (handoff S01→S02): proyecta las cuatro
 * esquinas físicas de PHONE_SCREEN a NDC y exige que todas queden fuera del
 * viewport con el margen dado (pantalla cubriendo el encuadre, bisel y
 * mundo fuera de campo). No es un temporizador: es geometría proyectada.
 * Restaurada verbatim de S02 V15 para el puente; no altera poses ni timing.
 */
export function s01ScreenCoversViewport(camera: THREE.Camera, margin = 0.08): boolean {
  for (const c of screenCornersWorld()) {
    _v.set(c[0], c[1], c[2]).project(camera)
    // Detrás de cámara o dentro del encuadre → aún no hay cobertura total.
    if (_v.z > 1 || (Math.abs(_v.x) < 1 + margin && Math.abs(_v.y) < 1 + margin)) return false
  }
  return true
}

/** Metadata del portal para QA angular/píxel y futuro handoff S02 (§97). */
export function s01PortalMetadata(aspect: number, widthPx: number, heightPx: number) {
  const f = s01ScreenFrame()
  const final = s01PortalFinal(aspect)
  _pos.set(final.pos[0], final.pos[1], final.pos[2])
  _tgt.set(final.target[0], final.target[1], final.target[2])
  _up.set(final.up[0], final.up[1], final.up[2])
  _m.lookAt(_pos, _tgt, _up)
  _q.setFromRotationMatrix(_m)
  // Esquinas del screen proyectadas a píxeles (verificación TOP-arriba).
  const hw = f.width / 2
  const hh = f.height / 2
  const corners = {
    topLeft: [f.center[0] - f.right[0] * hw + f.up[0] * hh, f.center[1] + f.up[1] * hh, f.center[2] - f.right[2] * hw + f.up[2] * hh],
    topRight: [f.center[0] + f.right[0] * hw + f.up[0] * hh, f.center[1] + f.up[1] * hh, f.center[2] + f.right[2] * hw + f.up[2] * hh],
    bottomRight: [f.center[0] + f.right[0] * hw - f.up[0] * hh, f.center[1] - f.up[1] * hh, f.center[2] + f.right[2] * hw - f.up[2] * hh],
    bottomLeft: [f.center[0] - f.right[0] * hw - f.up[0] * hh, f.center[1] - f.up[1] * hh, f.center[2] - f.right[2] * hw - f.up[2] * hh],
  }
  return {
    screenCenterWorld: f.center,
    screenNormalWorld: f.normal,
    screenUpWorld: f.up,
    screenRightWorld: f.right,
    screenWidthWorld: f.width,
    screenHeightWorld: f.height,
    cameraFinalPosition: final.pos,
    cameraFinalQuaternion: [_q.x, _q.y, _q.z, _q.w],
    screenProjectedCorners: corners,
    viewport: { aspect, widthPx, heightPx },
  }
}
