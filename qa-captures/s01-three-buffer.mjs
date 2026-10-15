// QA LOOKDEV 3D — captura del buffer WebGL real vía readPixels (el screenshot
// headless no compone canvases WebGL bajo el transform del deck) + regresión
// del renderer original sin el flag.
import puppeteer from 'puppeteer-core'
import { PNG } from 'pngjs'
import { mkdirSync, writeFileSync } from 'node:fs'

const BASE = 'http://localhost:8443'
const OUT = 'qa-captures/s01-three-lookdev'
const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

mkdirSync(OUT, { recursive: true })
const browser = await puppeteer.launch({ executablePath: CHROME, args: ['--force-device-scale-factor=1'] })
const errors = []

// ---------- Buffer WebGL del lookdev ----------
{
  const page = await browser.newPage()
  await page.setViewport({ width: 1280, height: 720 })
  page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`))
  page.on('console', (m) => { if (m.type() === 'error') errors.push(`console: ${m.text()}`) })
  await page.goto(`${BASE}/?dev=1&slide=0&step=0&s01Renderer=three`, { waitUntil: 'networkidle0' })
  await sleep(2500)
  const shots = await page.evaluate(() => {
    const s = window.__s01ThreeDebug
    if (!s) throw new Error('hook __s01ThreeDebug no disponible')
    const { gl, scene, camera } = s
    gl.render(scene, camera)
    const w = gl.domElement.width, h = gl.domElement.height
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
  writeFileSync(`${OUT}/lookdev-buffer.png`, PNG.sync.write(png))
  console.log(`buffer ${w}x${h} guardado en ${OUT}/lookdev-buffer.png`)
  await page.close()
}

// ---------- Regresión: renderer original sin el flag ----------
{
  const page = await browser.newPage()
  await page.setViewport({ width: 1280, height: 720 })
  page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`))
  await page.goto(`${BASE}/?dev=1&slide=0&step=0`, { waitUntil: 'networkidle0' })
  await sleep(1500)
  await page.screenshot({ path: `${OUT}/regression-original-renderer.png` })
  await page.close()
}

await browser.close()
console.log(errors.length ? `ERRORS:\n${errors.join('\n')}` : 'NO-CONSOLE-OR-PAGE-ERRORS')
