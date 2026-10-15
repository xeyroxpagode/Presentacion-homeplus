// QA puntual: close-up de la pila en F100 step 5 (reencuadre sobre frame idle).
import puppeteer from 'puppeteer-core'
import { PNG } from 'pngjs'
import { writeFileSync } from 'node:fs'

const BASE = 'http://localhost:8443'
const OUT = 'qa-captures/s01-final-prime'
const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

const browser = await puppeteer.launch({ executablePath: CHROME, args: ['--force-device-scale-factor=1'] })
const page = await browser.newPage()
await page.setViewport({ width: 1920, height: 1080 })
await page.goto(`${BASE}/?dev=1&slide=0&step=0&s01Renderer=three`, { waitUntil: 'networkidle0' })
await sleep(1500)
for (let i = 0; i < 5; i++) {
  await page.keyboard.press('ArrowRight')
  await sleep(2600)
}
// Reencuadre: top-down oblicuo sobre la pila [-0.18,0.95,-0.44].
await page.evaluate(() => {
  const d = window.__s01Director
  d.frame.camPos = [0.35, 1.75, 0.35]
  d.frame.camTarget = [-0.18, 0.94, -0.44]
  d.frame.camUp = [0, 1, 0]
  window.__s01ThreeDebug.invalidate()
})
await sleep(600)
await page.evaluate(() => {
  const d = window.__s01Director
  d.frame.camPos = [0.35, 1.75, 0.35]
  d.frame.camTarget = [-0.18, 0.94, -0.44]
  d.frame.camUp = [0, 1, 0]
  window.__s01ThreeDebug.invalidate()
})
await sleep(600)
const shots = await page.evaluate(() => {
  const s = window.__s01ThreeDebug
  const { gl, scene, camera } = s
  gl.render(scene, camera)
  const w = gl.domElement.width
  const h = gl.domElement.height
  const glctx = gl.getContext()
  const pixels = new Uint8Array(w * h * 4)
  glctx.readPixels(0, 0, w, h, glctx.RGBA, glctx.UNSIGNED_BYTE, pixels)
  return { w, h, pixels: Array.from(pixels) }
})
const png = new PNG({ width: shots.w, height: shots.h })
for (let y = 0; y < shots.h; y++)
  for (let x = 0; x < shots.w; x++) {
    const src = (y * shots.w + x) << 2
    const dst = ((shots.h - 1 - y) * shots.w + x) << 2
    png.data[dst] = shots.pixels[src]
    png.data[dst + 1] = shots.pixels[src + 1]
    png.data[dst + 2] = shots.pixels[src + 2]
    png.data[dst + 3] = 255
  }
writeFileSync(`${OUT}/1080p-s01-5-pile-closeup.png`, PNG.sync.write(png))
console.log('pile-closeup saved')
await browser.close()
