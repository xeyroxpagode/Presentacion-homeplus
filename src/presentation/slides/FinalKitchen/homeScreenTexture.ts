// FINAL KITCHEN V6.0 — textura Home para PHONE_SCREEN (estado S04-step-5).
// Lógica técnica reutilizada del donante S02 V15 (phoneScreenTexture.ts):
// CanvasTexture compuesta UNA vez, sRGB, anisotropy 8, toneMapped=false en
// el material (emite como pantalla, no como papel). Contenido: S04-step-5
// congelado (showJuli, educationPhysical, authorization, schoolTask,
// complete + completed, focus=null; fecha Domingo, 16 de agosto).
//
// Mapeo UV: PHONE_SCREEN muestra Home en un plano estándar sobre la cara
// +Y (v-up → top físico −z, u → +x, flipY por defecto). Verificado en
// captura real V6.0 (el mapeo directo sobre la cara del box rotaba 180°).
//
// Aspecto: superficie 0.066/0.142≈0.465 vs referencia móvil 300/620≈0.484:
// cover-fit centrado (escala por altura, recorte lateral ~2% por lado).
// Prohibido deformar textos: escala uniforme, sin reflow.

import * as THREE from 'three'

/** Superficie física PHONE_SCREEN (m). */
export const HOME_SURFACE_W = 0.066
export const HOME_SURFACE_H = 0.142

export const HOME_TEX_W = 1024
export const HOME_TEX_H = Math.round((HOME_TEX_W * HOME_SURFACE_H) / HOME_SURFACE_W)

/** Espacio lógico de la referencia móvil Home (px). */
const REF_W = 300
const REF_H = 620

const C = {
  canvas: '#F6F5F2',
  header: '#F7F5F2',
  surface: '#FFFFFF',
  ink: '#1A1816',
  inkSecondary: '#4A4542',
  muted: '#6E6B66',
  subtle: '#9E9B96',
  brand: '#C96B45',
  brandSoft: '#F6EDE8',
  avatar: '#B57A1A',
  completed: '#F4EEE9',
  border: 'rgba(26,24,22,0.10)',
} as const

const font = (px: number, weight = 600) =>
  `${weight} ${px}px -apple-system, 'SF Pro Text', 'Segoe UI', Arial, sans-serif`

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.arcTo(x + w, y, x + w, y + h, r)
  ctx.arcTo(x + w, y + h, x, y + h, r)
  ctx.arcTo(x, y + h, x, y, r)
  ctx.arcTo(x, y, x + w, y, r)
  ctx.closePath()
}

function drawStatusBar(ctx: CanvasRenderingContext2D) {
  ctx.fillStyle = C.ink
  ctx.font = font(13, 600)
  ctx.textAlign = 'left'
  ctx.textBaseline = 'middle'
  ctx.fillText('9:41', 22, 15)
  // Isla de cámara + iconos (silueta, sin detalle funcional).
  ctx.fillStyle = C.ink
  ctx.beginPath()
  ctx.arc(150, 14, 6, 0, Math.PI * 2)
  ctx.fill()
  ctx.textAlign = 'right'
  ctx.font = font(11, 600)
  ctx.fillText('5G  ▮▮▮▯  ▯▯', 282, 15)
}

function drawHeader(ctx: CanvasRenderingContext2D) {
  ctx.textAlign = 'left'
  ctx.textBaseline = 'middle'
  // Avatar Juli
  ctx.fillStyle = C.avatar
  ctx.beginPath()
  ctx.arc(34, 52, 13, 0, Math.PI * 2)
  ctx.fill()
  ctx.fillStyle = '#FFFFFF'
  ctx.font = font(15, 700)
  ctx.textAlign = 'center'
  ctx.fillText('J', 34, 53)
  // Nombre + hogar
  ctx.textAlign = 'left'
  ctx.fillStyle = C.ink
  ctx.font = font(17, 700)
  ctx.fillText('Juli', 54, 48)
  ctx.fillStyle = C.muted
  ctx.font = font(11, 500)
  ctx.fillText('Familia García  ⌄', 54, 62)
  // Acciones (lupa + campana, silueta)
  ctx.strokeStyle = C.inkSecondary
  ctx.lineWidth = 1.6
  ctx.beginPath()
  ctx.arc(248, 52, 7, 0, Math.PI * 2)
  ctx.stroke()
  ctx.beginPath()
  ctx.moveTo(253, 57)
  ctx.lineTo(258, 62)
  ctx.stroke()
  ctx.beginPath()
  ctx.arc(274, 50, 6, Math.PI * 0.9, Math.PI * 2.1)
  ctx.stroke()
}

function drawCompletedRow(ctx: CanvasRenderingContext2D, y: number, title: string) {
  // Check de completitud (marca del sistema, estado final S04-step-5).
  ctx.fillStyle = C.brand
  ctx.beginPath()
  ctx.arc(34, y + 22, 11, 0, Math.PI * 2)
  ctx.fill()
  ctx.strokeStyle = '#FFFFFF'
  ctx.lineWidth = 2.4
  ctx.beginPath()
  ctx.moveTo(28.5, y + 22)
  ctx.lineTo(32.5, y + 26)
  ctx.lineTo(40, y + 17.5)
  ctx.stroke()
  ctx.fillStyle = C.ink
  ctx.font = font(15, 600)
  ctx.textAlign = 'left'
  ctx.textBaseline = 'middle'
  ctx.fillText(title, 54, y + 16)
  ctx.fillStyle = C.brand
  ctx.font = font(12, 600)
  ctx.fillText('Completada', 54, y + 33)
  ctx.fillStyle = C.subtle
  ctx.font = font(15, 400)
  ctx.textAlign = 'right'
  ctx.fillText('›', 282, y + 22)
}

function drawEventRow(ctx: CanvasRenderingContext2D, y: number, title: string) {
  ctx.fillStyle = C.brandSoft
  roundRect(ctx, 22, y + 10, 46, 24, 7)
  ctx.fill()
  ctx.fillStyle = C.brand
  ctx.font = font(11, 700)
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText('Mañana', 45, y + 22)
  ctx.fillStyle = C.ink
  ctx.font = font(15, 600)
  ctx.textAlign = 'left'
  ctx.fillText(title, 76, y + 22)
  ctx.fillStyle = C.subtle
  ctx.font = font(15, 400)
  ctx.textAlign = 'right'
  ctx.fillText('›', 282, y + 22)
}

function drawHome(ctx: CanvasRenderingContext2D) {
  // Fondo
  ctx.fillStyle = C.canvas
  ctx.fillRect(0, 0, REF_W, REF_H)
  drawStatusBar(ctx)
  // Header
  ctx.fillStyle = C.header
  ctx.fillRect(0, 26, REF_W, 56)
  drawHeader(ctx)
  let y = 96
  // Fecha (contrato: Domingo, 16 de agosto)
  ctx.fillStyle = C.muted
  ctx.font = font(12, 500)
  ctx.textAlign = 'left'
  ctx.textBaseline = 'middle'
  ctx.fillText('Domingo, 16 de agosto', 16, y)
  y += 22
  // Sección Hoy
  ctx.fillStyle = C.inkSecondary
  ctx.font = font(11, 700)
  ctx.fillText('HOY', 16, y)
  y += 14
  ctx.fillStyle = C.surface
  roundRect(ctx, 12, y, REF_W - 24, 128, 16)
  ctx.fill()
  ctx.strokeStyle = C.border
  ctx.lineWidth = 1
  ctx.stroke()
  drawCompletedRow(ctx, y + 6, 'Llevar autorización')
  ctx.strokeStyle = 'rgba(26,24,22,0.08)'
  ctx.beginPath()
  ctx.moveTo(20, y + 66)
  ctx.lineTo(280, y + 66)
  ctx.stroke()
  drawCompletedRow(ctx, y + 68, 'Tarea de Matemática')
  y += 142
  // Sección Próximamente
  ctx.fillStyle = C.inkSecondary
  ctx.font = font(11, 700)
  ctx.fillText('PRÓXIMAMENTE', 16, y)
  y += 14
  ctx.fillStyle = C.surface
  roundRect(ctx, 12, y, REF_W - 24, 64, 16)
  ctx.fill()
  ctx.strokeStyle = C.border
  ctx.stroke()
  drawEventRow(ctx, y + 6, 'Educación Física')
  // Barra de navegación inferior (silueta del sistema)
  ctx.fillStyle = C.surface
  roundRect(ctx, 60, REF_H - 34, REF_W - 120, 24, 12)
  ctx.fill()
  ctx.strokeStyle = C.border
  ctx.stroke()
  ctx.fillStyle = C.subtle
  for (let i = 0; i < 4; i++) {
    ctx.beginPath()
    ctx.arc(88 + i * 38, REF_H - 22, i === 0 ? 5 : 3.5, 0, Math.PI * 2)
    ctx.fillStyle = i === 0 ? C.brand : C.subtle
    ctx.fill()
  }
  ctx.fillStyle = C.ink
  ctx.beginPath()
  ctx.arc(150, REF_H - 8, 0.1, 0, Math.PI * 2)
  ctx.fill()
}

/** Composición determinista del Home congelado (una vez por estado). */
export function createHomeScreenTexture(maxAnisotropy = 8): THREE.CanvasTexture {
  const cv = document.createElement('canvas')
  cv.width = HOME_TEX_W
  cv.height = HOME_TEX_H
  const ctx = cv.getContext('2d')!
  // Cover-fit: escala por altura (referencia 300×620), recorte lateral.
  const k = HOME_TEX_H / REF_H
  const drawnW = REF_W * k
  const ox = (HOME_TEX_W - drawnW) / 2
  ctx.fillStyle = C.canvas
  ctx.fillRect(0, 0, HOME_TEX_W, HOME_TEX_H)
  ctx.save()
  ctx.translate(ox, 0)
  ctx.scale(k, k)
  drawHome(ctx)
  ctx.restore()
  const tex = new THREE.CanvasTexture(cv)
  tex.colorSpace = THREE.SRGBColorSpace
  tex.anisotropy = Math.min(8, Math.max(1, maxAnisotropy))
  // Plano estándar (v-up → top físico −z, u → +x): flipY por defecto (true).
  // Evidencia V6.0: flipY=false rotaba el Home 180° en captura real.
  tex.needsUpdate = true
  return tex
}

/** QA de continuidad: la textura debe ser el Home S04-step-5 congelado. */
export function homeScreenQA() {
  return {
    texW: HOME_TEX_W,
    texH: HOME_TEX_H,
    surfaceAspect: HOME_SURFACE_W / HOME_SURFACE_H,
    refAspect: REF_W / REF_H,
    coverCropPerSide: (REF_W * (HOME_TEX_H / REF_H) - HOME_TEX_W) / 2 / (REF_W * (HOME_TEX_H / REF_H)),
    flipY: true,
    frozenState: {
      showJuli: true,
      educationPhysical: true,
      authorization: true,
      schoolTask: true,
      complete: true,
      authorizationCompleted: true,
      schoolTaskCompleted: true,
      focus: null,
      date: 'Domingo, 16 de agosto',
    },
  }
}
