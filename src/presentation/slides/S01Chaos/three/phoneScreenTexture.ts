// PHONE_SCREEN — WhatsApp canónico como textura del display físico.
//
// El mesh real de PHONE_SCREEN conserva rig, geometría y UVs; sólo su
// material deja de ser negro y pasa a ser esta CanvasTexture (sRGB,
// toneMapped=false: emite como pantalla encendida, no como papel).
//
// Contrato de datos: los mismos textos de s02Data.ts (Familia ❤️, Tomi,
// garantía de la heladera, hora 16:05) y la misma paleta de S02
// (#1f2c34 header/burbujas, #0b141a fondo, #005c4b salientes, #e9edef
// texto). Sin chats inventados, sin recursos remotos, sin screenshots.
//
// Problema de aspect ratio (§8): el display físico es vertical
// (0.066×0.142) y S02.0 es horizontal 16:9. La cámara final (portal con
// overscan 1.16) sólo ve la franja central de la pantalla; esa franja
// (bandRectPx) contiene EXACTAMENTE la composición S02.0 a escala, y las
// áreas exteriores prolongan coherentemente la conversación con mensajes
// canónicos. Nada se estira: cover-fit centrado, tipografía intacta.
//
// Resolución (§9): 1024 px de ancho (≈880 px para los 1280 lógicos de
// S02.0 en el encuadre final). Se compone UNA vez al montar, nunca por
// frame y nunca durante el dive.

import * as THREE from 'three'
import { s01Geo } from './s01CinematicConfig'
import { MOTHER_TEXT, SENT_TEXT, WARRANTY_TEXT } from '../../S02FragmentedInfo/s02Data'

export const SCREEN_TEX_W = 1024
export const SCREEN_TEX_H = Math.round((SCREEN_TEX_W * s01Geo.phone.screenSize[1]) / s01Geo.phone.screenSize[0])

const PORTAL_FOV_DEG = 36
const PORTAL_OVERSCAN = 1.16
const STAGE_ASPECT = 16 / 9

/** Franja de la textura visible en la pose final, en píxeles de textura. */
export function bandRectPx(): { x: number; y: number; w: number; h: number; scale: number } {
  const t = Math.tan(((PORTAL_FOV_DEG / 2) * Math.PI) / 180)
  const [sw, sh] = s01Geo.phone.screenSize
  // El ancho manda (display vertical en viewport horizontal): d = dW.
  const dW = sw / 2 / (t * STAGE_ASPECT * PORTAL_OVERSCAN)
  const visH = 2 * dW * t
  const visW = visH * STAGE_ASPECT
  const fx = Math.min(1, visW / sw)
  const fy = Math.min(1, visH / sh)
  const w = fx * SCREEN_TEX_W
  const h = fy * SCREEN_TEX_H
  return {
    x: (SCREEN_TEX_W - w) / 2,
    y: (SCREEN_TEX_H - h) / 2,
    w,
    h,
    scale: w / 1280,
  }
}

// Paleta canónica S02 (s02-cinematic.css).
const C = {
  header: '#1f2c34',
  chat: '#0b141a',
  bubbleIn: '#1f2c34',
  bubbleOut: '#005c4b',
  text: '#e9edef',
  sub: '#8696a0',
  senderIn: '#e8a0bf',
  sender: '#f2a1c0',
  input: '#2a3942',
  chip: '#1f2c34',
  chipText: '#ffd9a8',
  mic: '#00a884',
} as const

const font = (px: number, weight = 600) => `${weight} ${px}px -apple-system, 'SF Pro Text', 'Segoe UI', Arial, sans-serif`

type Ctx = CanvasRenderingContext2D

function roundRect(ctx: Ctx, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.arcTo(x + w, y, x + w, y + h, r)
  ctx.arcTo(x + w, y + h, x, y + h, r)
  ctx.arcTo(x, y + h, x, y, r)
  ctx.arcTo(x, y, x + w, y, r)
  ctx.closePath()
}

function wrapLines(ctx: Ctx, text: string, maxW: number): string[] {
  const words = text.split(' ')
  const lines: string[] = []
  let cur = ''
  for (const w of words) {
    const t = cur ? `${cur} ${w}` : w
    if (ctx.measureText(t).width <= maxW || !cur) cur = t
    else {
      lines.push(cur)
      cur = w
    }
  }
  if (cur) lines.push(cur)
  return lines
}

type Bubble = { from: 'mama' | 'tomi' | 'papa'; text: string; time: string; hero?: boolean }

/** Burbuja entrante/saliente. Devuelve la altura consumida. */
function drawBubble(ctx: Ctx, b: Bubble, x: number, y: number, maxW: number, k: number): number {
  const out = b.from === 'papa'
  const fs = (b.hero ? 31 : 25) * k
  ctx.font = font(fs, 400)
  const lines = wrapLines(ctx, b.text, maxW - 32 * k - 64 * k)
  const lh = fs * 1.32
  const senderH = out ? 0 : 26 * k
  const stampH = 20 * k
  const h = 22 * k + senderH + lines.length * lh + stampH
  const w = Math.min(
    maxW,
    Math.max(
      170 * k,
      ctx.measureText(b.text).width > maxW - 96 * k
        ? maxW
        : 96 * k + Math.min(maxW, ctx.measureText(b.text).width + 96 * k),
    ),
  )
  const bx = out ? x + maxW - w : x
  ctx.fillStyle = out ? C.bubbleOut : C.bubbleIn
  roundRect(ctx, bx, y, w, h, 16 * k)
  ctx.fill()
  let ty = y + 12 * k
  if (!out) {
    ctx.fillStyle = b.from === 'mama' ? C.senderIn : C.sender
    ctx.font = font(22 * k)
    ctx.textBaseline = 'top'
    ctx.fillText(b.from === 'mama' ? 'Mamá ❤️' : 'Tomi', bx + 16 * k, ty)
    ty += senderH
  }
  ctx.fillStyle = C.text
  ctx.font = font(fs, 400)
  for (const ln of lines) {
    ctx.fillText(ln, bx + 16 * k, ty)
    ty += lh
  }
  ctx.fillStyle = C.text
  ctx.globalAlpha = 0.62
  ctx.font = font(17 * k, 400)
  ctx.fillText(b.time, bx + w - (16 + 17 * 2.2) * k, y + h - 24 * k)
  ctx.globalAlpha = 1
  return h
}

function drawChip(ctx: Ctx, label: string, cx: number, y: number, k: number): number {
  ctx.font = font(21 * k)
  const w = ctx.measureText(label).width + 36 * k
  const h = 38 * k
  ctx.fillStyle = C.chip
  roundRect(ctx, cx - w / 2, y, w, h, 10 * k)
  ctx.fill()
  ctx.fillStyle = C.chipText
  ctx.textBaseline = 'middle'
  ctx.fillText(label, cx - w / 2 + 18 * k, y + h / 2 + k)
  ctx.textBaseline = 'alphabetic'
  return h
}

/** Foto de la garantía (placeholder vectorial consciente, como en S02). */
function drawWarrantyPhoto(ctx: Ctx, x: number, y: number, w: number, k: number): number {
  const h = (w * 190) / 607
  ctx.save()
  roundRect(ctx, x, y, w, h, 10 * k)
  ctx.clip()
  ctx.fillStyle = '#57493d'
  ctx.fillRect(x, y, w, h)
  const px = x + w * 0.21
  const pw = w * 0.6
  const ph = h * 0.87
  const py = y + h * 0.065
  ctx.fillStyle = '#000'
  ctx.globalAlpha = 0.4
  ctx.fillRect(px + 6 * k, py + 8 * k, pw, ph)
  ctx.globalAlpha = 1
  ctx.fillStyle = '#eae3d1'
  ctx.fillRect(px, py, pw, ph)
  ctx.fillStyle = '#3a3428'
  ctx.font = font(15 * k)
  ctx.textAlign = 'center'
  ctx.fillText('G A R A N T Í A', px + pw / 2, py + 22 * k)
  ctx.textAlign = 'left'
  ctx.fillStyle = '#8a7f68'
  ctx.fillRect(px + 14 * k, py + 30 * k, pw - 28 * k, 2 * k)
  ctx.fillStyle = '#4a4436'
  ctx.font = font(8 * k, 400)
  ctx.fillText('Heladera · Modelo H-320', px + 14 * k, py + 44 * k)
  ctx.fillStyle = '#a09a86'
  for (let i = 0; i < 5; i++) {
    ctx.fillRect(px + 14 * k + (i % 3) * 5 * k, py + (52 + i * 9) * k, pw - 40 * k - (i % 3) * 14 * k, 3 * k)
  }
  ctx.restore()
  return h
}

function drawStatusBar(ctx: Ctx, w: number, k: number) {
  ctx.fillStyle = C.header
  ctx.fillRect(0, 0, w, 34 * k)
  ctx.fillStyle = '#fff'
  ctx.font = font(17 * k)
  ctx.fillText('16:05', 44 * k, 23 * k)
  // Glifos de sistema (señal, wifi, batería).
  ctx.fillRect(w - 120 * k, 12 * k, 34 * k, 12 * k)
  ctx.fillRect(w - 70 * k, 12 * k, 50 * k, 12 * k)
}

function drawHeader(ctx: Ctx, w: number, y: number, k: number): number {
  const h = 78 * k
  ctx.fillStyle = C.header
  ctx.fillRect(0, y, w, h)
  ctx.fillStyle = 'rgba(255,255,255,0.07)'
  ctx.fillRect(0, y + h - k, w, k)
  ctx.fillStyle = C.sub
  ctx.font = font(38 * k, 400)
  ctx.fillText('‹', 30 * k, y + 52 * k)
  // Avatar.
  const ax = 91 * k
  const ay = y + h / 2
  const ar = 25 * k
  const g = ctx.createLinearGradient(ax - ar, ay - ar, ax + ar, ay + ar)
  g.addColorStop(0, '#7a5c3e')
  g.addColorStop(1, '#3e4c5c')
  ctx.fillStyle = g
  ctx.beginPath()
  ctx.arc(ax, ay, ar, 0, Math.PI * 2)
  ctx.fill()
  ctx.fillStyle = '#fff'
  ctx.font = font(25 * k)
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText('F', ax, ay + k)
  ctx.textAlign = 'left'
  ctx.textBaseline = 'alphabetic'
  ctx.fillStyle = C.text
  ctx.font = font(32 * k)
  ctx.fillText('Familia ❤️', 132 * k, y + 38 * k)
  ctx.fillStyle = C.sub
  ctx.font = font(18 * k, 400)
  ctx.fillText('Tomi, Mamá ❤️, Papá', 132 * k, y + 60 * k)
  return h
}

function drawComposer(ctx: Ctx, w: number, y: number, k: number): number {
  const h = 74 * k
  ctx.fillStyle = C.header
  ctx.fillRect(0, y, w, h)
  ctx.fillStyle = C.sub
  ctx.font = font(34 * k, 400)
  ctx.fillText('+', 28 * k, y + 48 * k)
  ctx.fillStyle = C.input
  roundRect(ctx, 72 * k, y + 8 * k, w - 140 * k, 58 * k, 29 * k)
  ctx.fill()
  ctx.fillStyle = C.sub
  ctx.font = font(30 * k, 400)
  ctx.fillText('Mensaje', 100 * k, y + 47 * k)
  return h
}

function drawHomeIndicator(ctx: Ctx, w: number, y: number, k: number) {
  ctx.fillStyle = 'rgba(255,255,255,0.92)'
  roundRect(ctx, w / 2 - 56 * k, y + 11 * k, 112 * k, 5 * k, 2.5 * k)
  ctx.fill()
}

/** Bloque de garantía de Tomi (S02.0). Devuelve altura consumida. */
function drawWarrantyBlock(ctx: Ctx, x: number, y: number, maxW: number, k: number): number {
  const w = Math.min(655 * k, maxW)
  const senderH = 30 * k
  const photoH = ((w - 32 * k) * 190) / 607
  // El texto héroe cabe en UNA línea en S02.0 (DOM): ajustar la fuente del
  // canvas hasta lograrlo para que las alturas coincidan por región.
  let heroFs = 31 * k
  let lines: string[] = []
  while (heroFs > 24 * k) {
    ctx.font = font(heroFs, 400)
    lines = wrapLines(ctx, WARRANTY_TEXT, w - 32 * k - 64 * k)
    if (lines.length <= 1) break
    heroFs -= k
  }
  const textH = lines.length * heroFs * 1.28 + 22 * k
  const h = 12 * k + senderH + 6 * k + photoH + 8 * k + textH + 10 * k
  ctx.fillStyle = C.bubbleIn
  roundRect(ctx, x, y, w, h, 16 * k)
  ctx.fill()
  ctx.fillStyle = C.sender
  ctx.font = font(22 * k)
  ctx.fillText('Tomi', x + 16 * k, y + 12 * k + 20 * k)
  drawWarrantyPhoto(ctx, x + 16 * k, y + 12 * k + senderH, w - 32 * k, k)
  let ty = y + 12 * k + senderH + 6 * k + photoH + 8 * k
  ctx.fillStyle = C.text
  ctx.font = font(heroFs, 400)
  for (const ln of lines) {
    ctx.fillText(ln, x + 16 * k, ty + heroFs - k)
    ty += heroFs * 1.28
  }
  ctx.fillStyle = C.text
  ctx.globalAlpha = 0.62
  ctx.font = font(17 * k, 400)
  ctx.fillText('19:46', x + w - 70 * k, y + h - 14 * k)
  ctx.globalAlpha = 1
  return h
}

/**
 * Compone la textura completa. La franja central (bandRectPx) es la
 * composición S02.0 exacta a escala k; el resto prolonga la conversación
 * con mensajes canónicos (s02Data) sobre el mismo fondo de chat.
 */
export function createWhatsAppScreenTexture(): THREE.CanvasTexture {
  const cv = document.createElement('canvas')
  cv.width = SCREEN_TEX_W
  cv.height = SCREEN_TEX_H
  const ctx = cv.getContext('2d')!
  const band = bandRectPx()
  const k = band.scale
  const W = SCREEN_TEX_W

  // Fondo de chat en toda la superficie.
  ctx.fillStyle = C.chat
  ctx.fillRect(0, 0, W, SCREEN_TEX_H)
  // Doodle tenue (marca de agua del wallpaper, sin assets).
  ctx.fillStyle = 'rgba(255,255,255,0.045)'
  for (let yy = 20; yy < SCREEN_TEX_H; yy += 76) {
    for (let xx = ((yy / 76) % 2) * 40 + 20; xx < W; xx += 120) {
      ctx.beginPath()
      ctx.arc(xx, yy, 5, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  // ---- Cromo superior del teléfono (lectura "encendido" en plano wide). ----
  const kk = 0.55
  ctx.fillStyle = C.header
  ctx.fillRect(0, 0, W, 34 * kk)
  ctx.fillStyle = '#fff'
  ctx.font = font(17 * kk)
  ctx.fillText('16:05', 44 * kk, 23 * kk)
  drawHeader(ctx, W, 34 * kk, kk)

  // ---- Historial superior (previo al encuadre final, mensajes canónicos). --
  let uy = 34 * kk + 78 * kk + 26
  const ux = 38 * kk
  const umax = W - ux * 2
  uy += drawChip(ctx, '3 de noviembre', W / 2, uy, kk) + 20
  const early: Bubble[] = [
    { from: 'papa', text: '¿El manual quedó en la caja?', time: '10:12' },
    { from: 'mama', text: 'Creo que sí, después reviso.', time: '10:15' },
    { from: 'mama', text: 'Tomi, mañana llevá las zapatillas de Educación Física.', time: '18:32' },
    { from: 'tomi', text: 'Dale, ya las dejé listas.', time: '18:34' },
  ]
  for (const b of early) {
    if (uy > band.y - 130) break
    uy += drawBubble(ctx, b, ux, uy, umax, kk) + 12
  }

  // ---- Franja central: S02.0 EXACTO (scroll 0, HOLD). ----
  ctx.save()
  ctx.beginPath()
  ctx.rect(band.x, band.y, band.w, band.h)
  ctx.clip()
  ctx.translate(band.x, band.y)
  ctx.scale(k, k)
  // Base.
  ctx.fillStyle = C.chat
  ctx.fillRect(0, 0, 1280, 720)
  drawStatusBar(ctx, 1280, 1)
  drawHeader(ctx, 1280, 34, 1)
  // Historial (viewport Y112–621, scrollTop 0).
  ctx.save()
  ctx.beginPath()
  ctx.rect(0, 112, 1280, 509)
  ctx.clip()
  let hy = 112 + 10
  hy += drawChip(ctx, '3 de noviembre', 640, hy, 1) + 20
  hy += drawWarrantyBlock(ctx, 38, hy, 655 + 76, 1) + 29
  // Orden canónico exacto de S02.0 (buildHistory, scroll 0).
  const w02: Bubble = { from: 'mama', text: 'Ahí está, gracias.', time: '19:48' }
  const d01: Bubble = { from: 'papa', text: '¿El manual quedó en la caja?', time: '10:12' }
  const d02: Bubble = { from: 'mama', text: 'Creo que sí, después reviso.', time: '10:15' }
  const maxW = 1280 - 38 * 2
  hy += drawBubble(ctx, w02, 38, hy, maxW, 1) + 16
  hy += drawChip(ctx, '4 de noviembre', 640, hy, 1) + 20
  hy += drawBubble(ctx, d01, 38, hy, maxW, 1) + 16
  hy += drawBubble(ctx, d02, 38, hy, maxW, 1) + 16
  void hy
  ctx.restore()
  drawComposer(ctx, 1280, 621, 1)
  drawHomeIndicator(ctx, 1280, 695, 1)
  ctx.restore()

  // ---- Continuación inferior (post-encuadre, mensajes canónicos). ----
  let ly = band.y + band.h + 24
  const lk = 0.55
  const lx = 38 * lk
  const lmax = W - lx * 2
  const later: Bubble[] = [
    { from: 'mama', text: MOTHER_TEXT, time: '20:14', hero: true },
    { from: 'papa', text: 'Dale, gracias.', time: '20:16' },
    { from: 'mama', text: 'Dejé la vianda en la heladera.', time: '07:40' },
    { from: 'tomi', text: 'La agarré, gracias.', time: '07:43' },
    { from: 'mama', text: 'Tomi, dejé el bolso en la entrada.', time: '07:14' },
    { from: 'tomi', text: 'Lo tengo.', time: '07:17' },
    { from: 'tomi', text: 'Ya salí del cole.', time: '16:02' },
    { from: 'papa', text: SENT_TEXT, time: '16:05', hero: true },
  ]
  const bottomChrome = 74 * lk + 25
  for (const b of later) {
    if (ly > SCREEN_TEX_H - bottomChrome - 120) break
    ly += drawBubble(ctx, b, lx, ly, lmax, lk) + 12
  }
  // Cromo inferior: composer + home.
  drawComposer(ctx, W, SCREEN_TEX_H - bottomChrome, lk)
  drawHomeIndicator(ctx, W, SCREEN_TEX_H - 25, lk)

  const tex = new THREE.CanvasTexture(cv)
  tex.colorSpace = THREE.SRGBColorSpace
  tex.anisotropy = 8
  return tex
}
