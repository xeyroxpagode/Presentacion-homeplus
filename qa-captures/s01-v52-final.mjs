// QA FINAL V5.2 — framebuffer WebGL real, beats C/D/E, reverse, reduced e
// interrupciones. Mantiene la cámara y el director de producción.
import puppeteer from 'puppeteer-core'
import { PNG } from 'pngjs'
import { mkdirSync, writeFileSync } from 'node:fs'

const BASE = 'http://127.0.0.1:8443'
const OUT = 'qa-captures/s01-v52/final'
const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
mkdirSync(OUT, { recursive: true })

const browser = await puppeteer.launch({ executablePath: CHROME, args: ['--force-device-scale-factor=1'] })
const errors = []
const quick = process.argv.includes('--quick')

async function state(page) {
  return page.evaluate(() => {
    const d = window.__s01Director
    const f = d?.frame
    return d && f ? {
      step: d.step,
      elapsed: Math.round(d.elapsed),
      animating: d.animating,
      kitchenLight: +f.kitchenLight.toFixed(3),
      docs: f.docs.filter((x) => x.v > 0.5).length,
      dishes: f.dishes.filter((x) => x.v > 0.5).length,
      smokeMax: +Math.max(...f.smoke.map((x) => x.o)).toFixed(3),
      pantry: f.pantry.map((x) => Math.round(x * 57.2958)),
    } : null
  })
}

async function waitElapsed(page, ms, timeout = 9000) {
  const start = Date.now()
  while (Date.now() - start < timeout) {
    const s = await state(page)
    if (s && (s.elapsed >= ms || !s.animating)) return s
    await sleep(16)
  }
  throw new Error(`timeout esperando ${ms}ms: ${JSON.stringify(await state(page))}`)
}

async function capture(page, name) {
  const shot = await page.evaluate(() => {
    const s = window.__s01ThreeDebug
    if (!s) throw new Error('hook __s01ThreeDebug no disponible')
    const { gl, scene, camera } = s
    gl.render(scene, camera)
    const w = gl.domElement.width
    const h = gl.domElement.height
    const ctx = gl.getContext()
    const pixels = new Uint8Array(w * h * 4)
    ctx.readPixels(0, 0, w, h, ctx.RGBA, ctx.UNSIGNED_BYTE, pixels)
    return { w, h, pixels: Array.from(pixels) }
  })
  const png = new PNG({ width: shot.w, height: shot.h })
  for (let y = 0; y < shot.h; y++) for (let x = 0; x < shot.w; x++) {
    const src = (y * shot.w + x) * 4
    const dst = ((shot.h - 1 - y) * shot.w + x) * 4
    png.data[dst] = shot.pixels[src]
    png.data[dst + 1] = shot.pixels[src + 1]
    png.data[dst + 2] = shot.pixels[src + 2]
    png.data[dst + 3] = 255
  }
  writeFileSync(`${OUT}/${name}.png`, PNG.sync.write(png))
  console.log(`${name} ${shot.w}x${shot.h} ${JSON.stringify(await state(page))}`)
}

async function open(page, step) {
  await page.goto(`${BASE}/?dev=1&slide=0&step=${step}&s01Renderer=three`, { waitUntil: 'networkidle0' })
  await sleep(1200)
}

async function captureBeat(label, width, height, step, times) {
  const page = await browser.newPage()
  await page.setViewport({ width, height })
  page.on('pageerror', (e) => errors.push(`[${label}] pageerror: ${e.message}`))
  page.on('console', (m) => m.type() === 'error' && !m.text().includes('404') && errors.push(`[${label}] console: ${m.text()}`))
  await open(page, 0)
  for (const ms of times) {
    await page.evaluate((beat, elapsed, aspect) => {
      window.__s01Director.debugBeat(beat, elapsed, aspect)
      window.__s01ThreeDebug.invalidate()
    }, step, ms, width / height)
    await sleep(80)
    await capture(page, `${label}-${ms}`)
  }
  await page.close()
}

if (quick) {
  await captureBeat('720p-beat3', 1280, 720, 3, [3350])
  await captureBeat('720p-beat4', 1280, 720, 4, [1850])
  await browser.close()
  console.log(errors.length ? `ERRORS:\n${errors.join('\n')}` : 'NO-CONSOLE-OR-PAGE-ERRORS')
  process.exit(0)
}

await captureBeat('720p-beat3', 1280, 720, 3, [0, 320, 500, 760, 1000, 1150, 1350, 1650, 1850, 2200, 2750, 3350])
await captureBeat('720p-beat4', 1280, 720, 4, [0, 462, 925, 1387, 1850])
await captureBeat('720p-beat5', 1280, 720, 5, [0, 360, 725, 1087, 1450])
await captureBeat('1080p-beat3', 1920, 1080, 3, [3350])
await captureBeat('1080p-beat4', 1920, 1080, 4, [1850])
await captureBeat('1080p-beat5', 1920, 1080, 5, [1450])

// Reverse completo: cada destino debe restaurar su F100 semántico.
{
  const page = await browser.newPage()
  await page.setViewport({ width: 1280, height: 720 })
  await open(page, 5)
  for (const target of [4, 3, 2, 1, 0]) {
    await page.keyboard.press('ArrowLeft')
    await waitElapsed(page, 520)
    await capture(page, `720p-reverse-${target}`)
  }
  await page.close()
}

// Reduced motion conserva exactamente los estados finales.
{
  const page = await browser.newPage()
  await page.setViewport({ width: 1280, height: 720 })
  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }])
  await open(page, 0)
  for (const target of [1, 2, 3, 4, 5]) {
    await page.keyboard.press('ArrowRight')
    await waitElapsed(page, 120)
    await capture(page, `720p-reduced-${target}`)
  }
  await page.close()
}

// Interrupciones: los saltos deben converger sin depender de frames previos.
{
  const page = await browser.newPage()
  await page.setViewport({ width: 1280, height: 720 })
  await open(page, 0)
  await page.keyboard.press('ArrowRight')
  await page.keyboard.press('ArrowRight')
  await page.keyboard.press('ArrowRight')
  await waitElapsed(page, 3350)
  await capture(page, '720p-interrupt-0-to-3')
  await page.keyboard.press('ArrowRight')
  await page.keyboard.press('ArrowRight')
  await waitElapsed(page, 1450)
  await capture(page, '720p-interrupt-3-to-5')
  await page.close()
}

await browser.close()
console.log(errors.length ? `ERRORS:\n${errors.join('\n')}` : 'NO-CONSOLE-OR-PAGE-ERRORS')
