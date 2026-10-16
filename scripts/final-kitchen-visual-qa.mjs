// FINAL KITCHEN V6.1 — QA visual con Playwright
// Captura W00–W14, graba navegación completa, genera lámina de contacto
import { chromium } from 'playwright'
import { writeFileSync, mkdirSync, readFileSync } from 'fs'
import { createRequire } from 'module'

const require = createRequire(import.meta.url)
const { PNG } = require('pngjs')

const BASE = 'http://localhost:5199/?finalKitchen=1'
const OUT = 'qa-captures/final-kitchen-v6-v61'
const W = 1280, H = 720

mkdirSync(OUT, { recursive: true })

const BEATS = ['W00','W01','W02','W03','W04','W05','W06','W07','W08','W09','W10','W11','W12','W13','W14']

const browser = await chromium.launch({ headless: true })
const ctx = await browser.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: 1 })
const page = await ctx.newPage()

const consoleErrors = []
page.on('console', msg => { if (msg.type() === 'error') consoleErrors.push(msg.text()) })
page.on('pageerror', err => consoleErrors.push(String(err)))

await page.goto(BASE, { waitUntil: 'networkidle' })
await page.waitForTimeout(1500)

async function waitStable(timeout = 8000) {
  const start = Date.now()
  while (Date.now() - start < timeout) {
    const s = await page.evaluate(() => window.__finalFrame ? window.__finalFrame.phase : null)
    if (s === 'stable') return true
    await page.waitForTimeout(100)
  }
  return false
}

async function gotoBeat(beat) {
  const url = BASE + '&finalBeat=' + beat
  await page.goto(url, { waitUntil: 'networkidle' })
  await page.waitForTimeout(800)
}

// 1. Capturar cada beat en fase estable
console.log('Capturando beats...')
for (const beat of BEATS) {
  await gotoBeat(beat)
  await waitStable()
  await page.waitForTimeout(300)
  const fp = OUT + '/' + beat + '.png'
  await page.screenshot({ path: fp })
  console.log('  ' + beat + ' capturado')
}

// 2. Capturas del travelling W01 (progreso intermedio)
console.log('Capturando travelling W01...')
await page.goto(BASE + '&finalBeat=W01', { waitUntil: 'networkidle' })
await page.waitForTimeout(500)
for (const p of [0.9, 0.75, 0.5, 0.25]) {
  const url = BASE + '&finalBeat=W01&finalp=' + p
  await page.goto(url, { waitUntil: 'networkidle' })
  await page.waitForTimeout(400)
  await page.screenshot({ path: OUT + '/W01-p' + Math.round(p * 100) + '.png' })
  console.log('  W01 p=' + p)
}

// 3. Captura del gesto W06 en fases
console.log('Capturando gesto W06...')
await page.goto(BASE + '&finalBeat=W06&finalPose=P0', { waitUntil: 'networkidle' })
await page.waitForTimeout(600)
await page.screenshot({ path: OUT + '/W06-P0.png' })
await page.goto(BASE + '&finalBeat=W06&finalPose=P1', { waitUntil: 'networkidle' })
await page.waitForTimeout(600)
await page.screenshot({ path: OUT + '/W06-P1.png' })
await page.goto(BASE + '&finalBeat=W06&finalPose=P2', { waitUntil: 'networkidle' })
await page.waitForTimeout(600)
await page.screenshot({ path: OUT + '/W06-P2.png' })

// 4. Grabar navegación manual completa con keyboard
console.log('Grabando navegación manual...')
await page.goto(BASE, { waitUntil: 'networkidle' })
await page.waitForTimeout(1200)

// Iniciar grabación de video
await page.evaluate(() => {
  const canvas = document.querySelector('canvas')
  if (!canvas) return
  const stream = canvas.captureStream(30)
  const rec = new MediaRecorder(stream, { mimeType: 'video/webm;codecs=vp9' })
  const chunks = []
  rec.ondataavailable = e => chunks.push(e.data)
  rec.onstop = () => {
    const blob = new Blob(chunks, { type: 'video/webm' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'fk-v61-navigation.webm'
    document.body.appendChild(a)
    a.click()
    setTimeout(() => URL.revokeObjectURL(url), 5000)
  }
  rec.start()
  window.__fkNavRecorder = rec
})

// Navegar con ArrowRight
for (let i = 0; i < 14; i++) {
  await page.keyboard.press('ArrowRight')
  await page.waitForTimeout(3600)
}
await page.evaluate(() => window.__fkNavRecorder ? window.__fkNavRecorder.stop() : null)
await page.waitForTimeout(1000)

// 5. Verificar W14 negro absoluto
console.log('Verificando W14 negro absoluto...')
await gotoBeat('W14')
await waitStable()
await page.waitForTimeout(800)
await page.screenshot({ path: OUT + '/W14-black.png' })
const w14png = PNG.sync.read(readFileSync(OUT + '/W14-black.png'))
let maxVal = 0
for (let i = 0; i < w14png.data.length; i += 4) {
  const v = Math.max(w14png.data[i], w14png.data[i + 1], w14png.data[i + 2])
  if (v > maxVal) maxVal = v
}
console.log('  W14 max pixel value: ' + maxVal + ' (esperado: 0)')

// 6. Generar lámina de contacto
console.log('Generando lámina de contacto...')
const thumbs = []
const cols = 5
const tw = Math.floor(W / cols)
const th = Math.floor(tw * H / W)
for (const beat of BEATS) {
  try {
    const png = PNG.sync.read(readFileSync(OUT + '/' + beat + '.png'))
    thumbs.push({ beat, png })
  } catch (e) { console.log('  skip ' + beat + ': ' + e.message) }
}
const rows = Math.ceil(thumbs.length / cols)
const sheet = new PNG({ width: cols * tw, height: rows * th })
for (let i = 0; i < thumbs.length; i++) {
  const item = thumbs[i]
  const ox = (i % cols) * tw
  const oy = Math.floor(i / cols) * th
  for (let y = 0; y < th; y++) {
    for (let x = 0; x < tw; x++) {
      const sx = Math.floor(x * item.png.width / tw)
      const sy = Math.floor(y * item.png.height / th)
      const si = (sy * item.png.width + sx) * 4
      const di = (oy + y) * sheet.width * 4 + (ox + x) * 4
      sheet.data[di] = item.png.data[si]
      sheet.data[di + 1] = item.png.data[si + 1]
      sheet.data[di + 2] = item.png.data[si + 2]
      sheet.data[di + 3] = 255
    }
  }
}
writeFileSync(OUT + '/contact-sheet.png', PNG.sync.write(sheet))

// Resumen
const summary = {
  date: new Date().toISOString(),
  beats: BEATS,
  consoleErrors,
  w14maxPixel: maxVal,
  contactSheet: OUT + '/contact-sheet.png',
  capturesDir: OUT,
}
writeFileSync(OUT + '/qa-visual-summary.json', JSON.stringify(summary, null, 2))

console.log('\nResumen: ' + OUT + '/qa-visual-summary.json')
console.log('Errores console: ' + consoleErrors.length)
if (consoleErrors.length) console.log(consoleErrors.slice(0, 5))

await browser.close()
console.log('QA visual completado.')
