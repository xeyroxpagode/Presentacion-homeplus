// QA S01 CINEMATIC V3.0 — framebuffer WebGL real vía readPixels (el screenshot
// headless no compone canvases WebGL bajo el transform del deck).
// Navega con teclado real (flechas) para disparar la state machine y captura
// F100 + intermedios de cada beat, en 1280x720 y 1920x1080, más el reverse.
import puppeteer from 'puppeteer-core'
import { PNG } from 'pngjs'
import { mkdirSync, writeFileSync } from 'node:fs'

const BASE = 'http://localhost:8443'
const OUT = 'qa-captures/s01-cinematic-v3'
const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

mkdirSync(OUT, { recursive: true })
const browser = await puppeteer.launch({ executablePath: CHROME, args: ['--force-device-scale-factor=1'] })
const errors = []

async function capture(page, name) {
  const shots = await page.evaluate(() => {
    const s = window.__s01ThreeDebug
    if (!s) throw new Error('hook __s01ThreeDebug no disponible')
    const { gl, scene, camera } = s
    gl.render(scene, camera)
    const w = gl.domElement.width
    const h = gl.domElement.height
    const glctx = gl.getContext()
    const pixels = new Uint8Array(w * h * 4)
    glctx.readPixels(0, 0, w, h, glctx.RGBA, glctx.UNSIGNED_BYTE, pixels)
    let lit = 0
    let sum = 0
    for (let i = 0; i < pixels.length; i += 4) {
      const v = pixels[i] + pixels[i + 1] + pixels[i + 2]
      sum += v
      if (v > 18) lit++
    }
    return { w, h, pixels: Array.from(pixels), litRatio: lit / (w * h), mean: sum / (w * h * 3) }
  })
  const { w, h, pixels } = shots
  const png = new PNG({ width: w, height: h })
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const src = (y * w + x) << 2
      const dst = ((h - 1 - y) * w + x) << 2
      png.data[dst] = pixels[src]
      png.data[dst + 1] = pixels[src + 1]
      png.data[dst + 2] = pixels[src + 2]
      png.data[dst + 3] = 255
    }
  }
  writeFileSync(`${OUT}/${name}.png`, PNG.sync.write(png))
  console.log(`${name}  ${w}x${h}  lit=${(shots.litRatio * 100).toFixed(1)}%  mean=${shots.mean.toFixed(1)}`)
}

async function directorState(page) {
  return page.evaluate(() => {
    const d = window.__s01Director
    return d ? { step: d.step, elapsed: Math.round(d.elapsed), animating: d.animating, reduced: d.reduced } : null
  })
}

/** Espera a que el reloj local del beat alcance `ms` (no reloj de pared:
 *  readPixels bloquea el hilo principal y congelaría la state machine). */
async function waitElapsed(page, ms, timeout = 8000) {
  const t0 = Date.now()
  while (Date.now() - t0 < timeout) {
    const s = await directorState(page)
    if (s && (!s.animating || s.elapsed >= ms)) return s
    await sleep(25)
  }
  return directorState(page)
}

async function run(label, width, height) {
  const page = await browser.newPage()
  await page.setViewport({ width, height })
  page.on('pageerror', (e) => errors.push(`[${label}] pageerror: ${e.message}`))
  page.on('console', (m) => {
    if (m.type() === 'error' && !m.text().includes('404')) errors.push(`[${label}] console: ${m.text()}`)
  })
  await page.goto(`${BASE}/?dev=1&slide=0&step=0&s01Renderer=three`, { waitUntil: 'networkidle0' })
  await sleep(1800)
  await capture(page, `${label}-s01-0-f100`)

  // 0 -> 1 (mitad de transición + F100)
  await page.keyboard.press('ArrowRight')
  await waitElapsed(page, 260)
  await capture(page, `${label}-s01-1-mid`)
  await waitElapsed(page, 1e9)
  await capture(page, `${label}-s01-1-f100`)

  // 1 -> 2 (puertas abriendo + F100)
  await page.keyboard.press('ArrowRight')
  await waitElapsed(page, 380)
  await capture(page, `${label}-s01-2-mid`)
  await waitElapsed(page, 1e9)
  await capture(page, `${label}-s01-2-f100`)

  // 2 -> 3 (pre-fallo, golpe/puertas, humo+papeles, F100)
  await page.keyboard.press('ArrowRight')
  await waitElapsed(page, 420)
  await capture(page, `${label}-s01-3-camera-arrived`)
  await waitElapsed(page, 660)
  await capture(page, `${label}-s01-3-strike`)
  await waitElapsed(page, 980)
  await capture(page, `${label}-s01-3-smoke-papers`)
  await waitElapsed(page, 1e9)
  await capture(page, `${label}-s01-3-f100`)

  // 3 -> 4
  await page.keyboard.press('ArrowRight')
  await waitElapsed(page, 1e9)
  await capture(page, `${label}-s01-4-f100`)

  // 4 -> 5 (acumulación parcial, asentada, dolly teléfono, F100)
  await page.keyboard.press('ArrowRight')
  await waitElapsed(page, 330)
  await capture(page, `${label}-s01-5-accum-mid`)
  await waitElapsed(page, 880)
  await capture(page, `${label}-s01-5-accum-f100`)
  await waitElapsed(page, 1000)
  await capture(page, `${label}-s01-5-dolly-start`)
  await waitElapsed(page, 1e9)
  await capture(page, `${label}-s01-5-f100`)

  // REVERSE 5->4->3->2->1->0
  for (const [i, step] of [4, 3, 2, 1, 0].entries()) {
    await page.keyboard.press('ArrowLeft')
    await waitElapsed(page, 1e9)
    await capture(page, `${label}-rev-${step}`)
  }

  const state = await page.evaluate(() => {
    const d = window.__s01Director
    return d ? { step: d.step, animating: d.animating, reduced: d.reduced } : null
  })
  console.log(`[${label}] director final`, JSON.stringify(state))
  await page.close()
}

await run('720p', 1280, 720)
await run('1080p', 1920, 1080)

// Navegación rápida / interrupción: 0→3 en 120 ms y 3→1 en 120 ms. Debe
// converger al F100 del step sin humo huérfano, puertas en ángulo imposible
// ni papeles flotando.
{
  const page = await browser.newPage()
  await page.setViewport({ width: 1280, height: 720 })
  page.on('pageerror', (e) => errors.push(`[interrupt] pageerror: ${e.message}`))
  await page.goto(`${BASE}/?dev=1&slide=0&step=0&s01Renderer=three`, { waitUntil: 'networkidle0' })
  await sleep(1500)
  await page.keyboard.press('ArrowRight')
  await page.keyboard.press('ArrowRight')
  await page.keyboard.press('ArrowRight')
  await sleep(2500)
  const after3 = await page.evaluate(() => {
    const f = window.__s01Director.frame
    return {
      step: window.__s01Director.step,
      pantry: f.pantry.map((v) => Math.round(v * 57.3)),
      fTop: Math.round(f.fTop * 57.3),
      docsVisible: f.docs.filter((d) => d.v > 0.5).length,
      smoke: f.smoke.map((s) => +s.o.toFixed(3)),
    }
  })
  console.log('interruption 0->3 :', JSON.stringify(after3))
  await capture(page, 'interrupt-s01-3-f100')
  await page.keyboard.press('ArrowLeft')
  await page.keyboard.press('ArrowLeft')
  await page.keyboard.press('ArrowLeft')
  await sleep(1800)
  const after0 = await page.evaluate(() => {
    const f = window.__s01Director.frame
    return {
      step: window.__s01Director.step,
      blackout: f.blackout,
      pantry: f.pantry.map((v) => Math.round(v * 57.3)),
      docsVisible: f.docs.filter((d) => d.v > 0.5).length,
    }
  })
  console.log('interruption 3->0 :', JSON.stringify(after0))
  await capture(page, 'interrupt-s01-0-f100')
  await page.close()
}

// Regresión: renderer original intacto y S02 sin cambios.
{
  const page = await browser.newPage()
  await page.setViewport({ width: 1280, height: 720 })
  page.on('pageerror', (e) => errors.push(`[regression] pageerror: ${e.message}`))
  await page.goto(`${BASE}/?dev=1&slide=0&step=0`, { waitUntil: 'networkidle0' })
  await sleep(1200)
  await page.screenshot({ path: `${OUT}/regression-s01-original-renderer.png` })
  await page.goto(`${BASE}/?dev=1&slide=1&step=0`, { waitUntil: 'networkidle0' })
  await sleep(1200)
  await page.screenshot({ path: `${OUT}/regression-s02-untouched.png` })
  await page.close()
}

// Reduced motion: progreso semántico sin travelling largo.
{
  const page = await browser.newPage()
  await page.setViewport({ width: 1280, height: 720 })
  page.on('pageerror', (e) => errors.push(`[reduced] pageerror: ${e.message}`))
  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }])
  await page.goto(`${BASE}/?dev=1&slide=0&step=0&s01Renderer=three`, { waitUntil: 'networkidle0' })
  await sleep(1500)
  await capture(page, 'reduced-s01-0-f100')
  console.log('reduced director@0', JSON.stringify(await directorState(page)))
  for (const step of [1, 2, 3, 4, 5]) {
    await page.keyboard.press('ArrowRight')
    await waitElapsed(page, 1e9)
    await capture(page, `reduced-s01-${step}-f100`)
    console.log(`reduced director@${step}`, JSON.stringify(await directorState(page)))
  }
  await page.close()
}

await browser.close()
console.log(errors.length ? `ERRORS:\n${errors.join('\n')}` : 'NO-CONSOLE-OR-PAGE-ERRORS')