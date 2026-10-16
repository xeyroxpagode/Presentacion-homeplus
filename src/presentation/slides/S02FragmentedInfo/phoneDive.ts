// S02 V1.6.1 — geometría compartida del Phone Dive S01→S02.
// UNA sola trayectoria monótona propiedad de S02.0: F0 = teléfono físico
// en S01.3, F100 = WhatsApp fullscreen (0,0,1280,720). Un único progreso
// d ∈ [0,1] con una sola curva smootherstep: sin empalmes intermedios,
// sin overscan que retroceda, sin D_SPLICE como frenada (V1.6.1 §6).
//
// La superficie 1280×720 se mapea con cover-fit centrada en W (centro
// óptico de la garantía) y recortada: nunca se estira la interfaz, el
// campo visible se amplía al atravesar el plano de la pantalla.

// Centro óptico de la garantía en coords de superficie.
export const WARRANTY_CX = 365.5
export const WARRANTY_CY = 341.5

// Rectángulo de pantalla en reposo (coords de stage, S01.3).
// V1.6.1 §4: el teléfono vive en una capa externa de primer plano (fuera
// del rig de cámara del diorama), por lo que este rect es válido tanto en
// S01.3 como en el F0 de S02.0 sin necesidad de transformar por la cámara.
export const REST_SCREEN = { x: 742, y: 330, w: 300, h: 180 } as const
// Grosor de bisel del teléfono (px de stage en reposo).
export const BEZEL = 14

// Duración de referencia del dive completo (V1.6.1 §6: 1400 ms).
export const DIVE_MS = 1400

export type Rect = { x: number; y: number; w: number; h: number }

function clamp01(v: number): number {
  return v < 0 ? 0 : v > 1 ? 1 : v
}

function smootherstep(t: number): number {
  const x = clamp01(t)
  return x * x * x * (x * (x * 6 - 15) + 10)
}

const lerp = (a: number, b: number, t: number): number => a + (b - a) * t

function lerpRect(a: Rect, b: Rect, t: number): Rect {
  return { x: lerp(a.x, b.x, t), y: lerp(a.y, b.y, t), w: lerp(a.w, b.w, t), h: lerp(a.h, b.h, t) }
}

const FULL_SCREEN: Rect = { x: 0, y: 0, w: 1280, h: 720 }

// Trayectoria única: interpolación lineal reposo→fullscreen. La curva
// temporal (una sola smootherstep sobre p) la aplica el propietario del
// dive (S02.0); esta función es geometría pura y monótona en d.
export function diveScreenRect(d: number): Rect {
  return lerpRect(REST_SCREEN, FULL_SCREEN, clamp01(d))
}

export type SurfaceMap = {
  scale: number
  offX: number
  offY: number
  sliceX: number
  sliceY: number
  sliceW: number
  sliceH: number
}

// Cover-fit de la superficie 1280×720 dentro del rect de pantalla,
// centrado en W y recortado (clamp). Continuo en todo d; en d=1 es identidad.
export function diveSurfaceMap(screen: Rect): SurfaceMap {
  const scale = Math.max(screen.w / 1280, screen.h / 720)
  const visW = screen.w / scale
  const visH = screen.h / scale
  const sliceX = visW >= 1280 ? (1280 - visW) / 2 : Math.min(Math.max(WARRANTY_CX - visW / 2, 0), 1280 - visW)
  const sliceY = visH >= 720 ? (720 - visH) / 2 : Math.min(Math.max(WARRANTY_CY - visH / 2, 0), 720 - visH)
  return {
    scale,
    offX: screen.x - sliceX * scale,
    offY: screen.y - sliceY * scale,
    sliceX,
    sliceY,
    sliceW: visW,
    sliceH: visH,
  }
}

export function diveFrame(d: number): { screen: Rect; map: SurfaceMap; body: Rect; tilt: number } {
  const screen = diveScreenRect(d)
  const body: Rect = {
    x: screen.x - BEZEL,
    y: screen.y - BEZEL - 6, // barbilla superior con notch
    w: screen.w + BEZEL * 2,
    h: screen.h + BEZEL * 2 + 6,
  }
  // Micro-inclinación física que se endereza al atravesar el plano.
  const tilt = -5 * (1 - smootherstep(clamp01(d / 0.35)))
  return { screen, map: diveSurfaceMap(screen), body, tilt }
}

// ¿Cubre la pantalla el viewport con margen? → el bisel puede desmontarse
// (ya está fuera de campo; sin fundido).
export function diveBezelVisible(screen: Rect, margin = 40): boolean {
  return screen.x > -margin || screen.y > -margin || screen.x + screen.w < 1280 + margin || screen.y + screen.h < 720 + margin
}

// Radio de esquina de la pantalla durante el dive: 20px físicos en reposo
// que se disuelven al alcanzar fullscreen (F100 sin bisel ni redondeo).
export function diveScreenRadius(d: number): number {
  return 20 * (1 - smootherstep(d))
}
