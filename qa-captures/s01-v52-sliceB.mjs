// QA V5.2 SLICE B — beat 2 (alacena + heladera): matriz 0/170/350/650/1000/
// 1300/1650/1900/2250/2450 ms en 720p + F100 en 1080p.
import puppeteer from 'puppeteer-core'
import { PNG } from 'pngjs'
import { mkdirSync, writeFileSync } from 'node:fs'

const BASE = 'http://localhost:8443'
const OUT = 'qa-captures/s01-v52/sliceB'
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
    return { w, h, pixels: Array.from(pixels) }
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
  console.log(`${name} ${w}x${h}`)
}

async function directorState(page) {
  return page.evaluate(() => {
    const d = window.__s01Director
    return d ? { step: d.step, elapsed: Math.round(d.elapsed), animating: d.animating } : null
  })
}

async function waitElapsed(page, ms, timeout = 9000) {
  const t0 = Date.now()
  while (Date.now() - t0 < timeout) {
    const s = await directorState(page)
    if (s && (!s.animating || s.elapsed >= ms)) return s
    await sleep(20)
  }
  return directorState(page)
}

const FRAMES = [0, 170, 350, 650, 1000, 1300, 1650, 1900, 2250, 2450]

async function run(label, width, height, full) {
  const page = await browser.newPage()
  await page.setViewport({ width, height })
  page.on('pageerror', (e) => errors.push(`[${label}] pageerror: ${e.message}`))
  page.on('console', (m) => {
    if (m.type() === 'error' && !m.text().includes('404')) errors.push(`[${label}] console: ${m.text()}`)
  })
  await page.goto(`${BASE}/?dev=1&slide=0&step=1&s01Renderer=three`, { waitUntil: 'networkidle0' })
  await sleep(1800)
  await page.keyboard.press('ArrowRight')
  for (const ms of FRAMES) {
    await waitElapsed(page, ms)
    await capture(page, `${label}-b2-${ms}`)
  }
  if (full) {
    // estado del director al F100 + re-entrada (interrupción)
    console.log(`[${label}]`, JSON.stringify(await directorState(page)))
    await page.keyboard.press('ArrowLeft')
    await page.keyboard.press('ArrowRight')
    await waitElapsed(page, 1e9)
    await capture(page, `${label}-b2-reenter-F100`)
  }
  await page.close()
}

await run('720p', 1280, 720, true)
await run('1080p', 1920, 1080, false)
await browser.close()
console.log(errors.length ? `ERRORS:\n${errors.join('\n')}` : 'NO-CONSOLE-OR-PAGE-ERRORS')
