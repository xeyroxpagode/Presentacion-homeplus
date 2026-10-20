import { chromium } from 'playwright'
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } })
for (const p of [0.68, 0.74, 0.8]) {
  await page.goto(`http://localhost:5199/?dev=1&slide=2&step=7&s03p=${p}`, { waitUntil: 'load' })
  await page.waitForTimeout(450)
  await page.screenshot({ path: `/tmp/s03v6-verify/home-${String(p).replace('.', '_')}.png`, clip: { x: 200, y: 840, width: 1520, height: 140 } })
}
await browser.close()
console.log('ok')
