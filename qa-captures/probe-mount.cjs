const puppeteer = require('puppeteer-core')
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
async function main () {
  const browser = await puppeteer.launch({ executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', args: ['--force-device-scale-factor=1'] })
  const page = await browser.newPage()
  await page.setViewport({ width: 1280, height: 720 })
  page.on('pageerror', (e) => console.log('PAGEERROR:', e.message.slice(0, 500)))
  page.on('console', (m) => { if (m.type() === 'error') console.log('CONSOLE-ERR:', m.text().slice(0, 500)) })
  await page.goto('http://localhost:8443/?dev=1&slide=0&step=0&s01Renderer=three', { waitUntil: 'networkidle0' })
  await sleep(4000)
  const info = await page.evaluate(() => {
    return {
      hasDebug: !!window.__s01ThreeDebug,
      hasDirector: !!window.__s01Director,
      canvases: document.querySelectorAll('canvas').length,
      rootText: document.getElementById('root') ? document.getElementById('root').innerHTML.slice(0, 300) : 'NO-ROOT',
    }
  })
  console.log(JSON.stringify(info, null, 1))
  await browser.close()
}
main().catch((e) => { console.error('FATAL', e.message); process.exit(1) })
