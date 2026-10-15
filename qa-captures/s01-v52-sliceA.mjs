// QA V5.2 SLICE A — beat 1 (seguro vencido): F0/F25/F50/F75/F100 en 720p,
// F100 en 1080p. Framebuffer WebGL real via readPixels (matriz §12).
import puppeteer from 'puppeteer-core'
import { PNG } from 'pngjs'
import { mkdirSync, writeFileSync } from 'node:fs'

const BASE = 'http://localhost:8443'
const OUT = 'qa-captures/s01-v52/sliceA'
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

async function waitElapsed(page, ms, timeout = 8000) {
  const t0 = Date.now()
  while (Date.now() - t0 < timeout) {
    const s = await directorState(page)
    if (s && (!s.animating || s.elapsed >= ms)) return s
    await sleep(20)
  }
  return directorState(page)
}

async function runBeat1(label, width, height, full) {
  const page = await browser.newPage()
  await page.setViewport({ width, height })
  page.on('pageerror', (e) => errors.push(`[${label}] pageerror: ${e.message}`))
  page.on('console', (m) => {
    if (m.type() === 'error' && !m.text().includes('404')) errors.push(`[${label}] console: ${m.text()}`)
  })
  await page.goto(`${BASE}/?dev=1&slide=0&step=0&s01Renderer=three`, { waitUntil: 'networkidle0' })
  await sleep(1800)
  await capture(page, `${label}-b1-F0`)
  await page.keyboard.press('ArrowRight')
  await waitElapsed(page, 225)
  await capture(page, `${label}-b1-F25`)
  await waitElapsed(page, 450)
  await capture(page, `${label}-b1-F50`)
  await waitElapsed(page, 675)
  await capture(page, `${label}-b1-F75`)
  await waitElapsed(page, 1e9)
  await capture(page, `${label}-b1-F100`)
  if (full) {
    // reverse 1->0 y re-entrada (interrupción en curso de beat)
    await page.keyboard.press('ArrowLeft')
    await page.keyboard.press('ArrowRight')
    await waitElapsed(page, 1e9)
    await capture(page, `${label}-b1-reenter-F100`)
  }
  console.log(`[${label}]`, JSON.stringify(await directorState(page)))
  await page.close()
}

await runBeat1('720p', 1280, 720, true)
await runBeat1('1080p', 1920, 1080, false)
await browser.close()
console.log(errors.length ? `ERRORS:\n${errors.join('\n')}` : 'NO-CONSOLE-OR-PAGE-ERRORS')
