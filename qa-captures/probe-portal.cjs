const puppeteer = require('puppeteer-core')
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
async function main () {
  const browser = await puppeteer.launch({ executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe' })
  const page = await browser.newPage()
  await page.setViewport({ width: 1280, height: 720 })
  await page.goto('http://localhost:8443/?dev=1&slide=0&step=5&s01Renderer=three', { waitUntil: 'networkidle0' })
  await sleep(2500)
  const info = await page.evaluate(() => {
    const s = window.__s01ThreeDebug
    const d = window.__s01Director
    const meta = window.__s01PortalMeta
    const c = document.querySelector('.chaos-three canvas')
    return {
      step: d.step, elapsed: Math.round(d.elapsed), animating: d.animating,
      aspect: d.aspect,
      r3fSize: s ? { w: s.size.width, h: s.size.height } : null,
      canvasCss: c ? { w: c.clientWidth, h: c.clientHeight } : null,
      drawingBuffer: c ? { w: c.width, h: c.height } : null,
      dpr: window.devicePixelRatio,
      camPos: d.frame.camPos.map((v) => +v.toFixed(4)),
      meta,
    }
  })
  console.log(JSON.stringify(info, null, 1))
  await browser.close()
}
main().catch((e) => { console.error('FATAL', e.message); process.exit(1) })
