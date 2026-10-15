// Micro-QA: sólo step 0→1 (insurance) para iterar encuadre rápido.
const puppeteer = require('puppeteer-core')
const { PNG } = require('pngjs')
const { writeFileSync } = require('node:fs')
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
async function main () {
  const browser = await puppeteer.launch({ executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe' })
  const page = await browser.newPage()
  await page.setViewport({ width: 1280, height: 720 })
  await page.goto('http://localhost:8443/?dev=1&slide=0&step=0&s01Renderer=three', { waitUntil: 'networkidle0' })
  await sleep(1500)
  await page.keyboard.press('ArrowRight')
  await sleep(2500)
  const shots = await page.evaluate(() => {
    const s = window.__s01ThreeDebug
    s.gl.render(s.scene, s.camera)
    const w = s.gl.domElement.width
    const h = s.gl.domElement.height
    const px = new Uint8Array(w * h * 4)
    s.gl.getContext().readPixels(0, 0, w, h, s.gl.getContext().RGBA, s.gl.getContext().UNSIGNED_BYTE, px)
    return { w, h, pixels: Array.from(px) }
  })
  const png = new PNG({ width: shots.w, height: shots.h })
  for (let y = 0; y < shots.h; y++) {
    for (let x = 0; x < shots.w; x++) {
      const src = (y * shots.w + x) * 4
      const dst = ((shots.h - 1 - y) * shots.w + x) * 4
      png.data[dst] = shots.pixels[src]
      png.data[dst + 1] = shots.pixels[src + 1]
      png.data[dst + 2] = shots.pixels[src + 2]
      png.data[dst + 3] = 255
    }
  }
  writeFileSync('qa-captures/s01-final-prime/ins-iter.png', PNG.sync.write(png))
  console.log('saved ins-iter.png')
  await browser.close()
}
main().catch((e) => { console.error('FATAL', e.message); process.exit(1) })
