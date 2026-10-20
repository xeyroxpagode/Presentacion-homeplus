import { chromium } from 'playwright'
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } })
const errs = []
page.on('pageerror', e => errs.push(e.message))
page.on('console', m => { if (m.type()==='error') errs.push(m.text()) })
for (const [step, name] of [[1,'lockup'], [9,'isotipo']]) {
  await page.goto(`http://localhost:5199/?dev=1&slide=2&step=${step}&s03p=1`, { waitUntil: 'load' })
  await page.waitForTimeout(700)
  await page.screenshot({ path: `/tmp/s03v6-verify/asset-${name}.png` })
  // ¿hay píxeles naranja (el logo)?
  const n = await page.evaluate(() => document.querySelectorAll('.s03v6-svg image').length)
  console.log(`step ${step} (${name}): <image> en el SVG = ${n}`)
}
console.log('errores:', errs.length, errs.slice(0,3))
await browser.close()
