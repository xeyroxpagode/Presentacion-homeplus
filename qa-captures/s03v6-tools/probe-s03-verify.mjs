import { chromium } from 'playwright'
import { mkdirSync } from 'fs'

const BASE = 'http://localhost:5199'
const OUT = '/tmp/s03v6-verify'
mkdirSync(OUT, { recursive: true })

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } })

// 1) Cobertura blanca del travelling (step 10, handoff congelado).
for (const p of [0.75, 0.85, 0.9, 0.95, 1]) {
  await page.goto(`${BASE}/?dev=1&slide=2&step=10&s03p=${p}&s03noauto=1`, { waitUntil: 'load' })
  await page.waitForTimeout(400)
  await page.screenshot({ path: `${OUT}/zoom-${String(p).replace('.', '_')}.png` })
}
console.log('zoom capturado')

// 2) Estabilidad del reposo: el frame final no debe cambiar con el tiempo.
for (const step of [3, 5, 7, 9]) {
  await page.goto(`${BASE}/?dev=1&slide=2&step=${step}&s03p=1`, { waitUntil: 'load' })
  await page.waitForTimeout(500)
  await page.screenshot({ path: `${OUT}/hold-${step}-a.png` })
  await page.waitForTimeout(2500)
  await page.screenshot({ path: `${OUT}/hold-${step}-b.png` })
}
console.log('reposo capturado')

await browser.close()
