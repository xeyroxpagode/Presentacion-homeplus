import { chromium } from 'playwright'
import { mkdirSync } from 'fs'

const BASE = 'http://localhost:5199'
const OUT = '/tmp/s03v6-handoff'
mkdirSync(OUT, { recursive: true })

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } })

// Step 10 corriendo en vivo: captura la secuencia del travelling y el relevo.
await page.goto(`${BASE}/?dev=1&slide=2&step=10`, { waitUntil: 'load' })
const stamps = [120, 260, 420, 600, 780, 940, 1020, 1080, 1180, 1400]
let prev = 0
for (const t of stamps) {
  await page.waitForTimeout(t - prev)
  prev = t
  await page.screenshot({ path: `${OUT}/t${String(t).padStart(4, '0')}.png` })
}
console.log('handoff capturado')

// ¿Terminamos en S04?
const dev = await page.evaluate(() => document.querySelector('.presentation-dev')?.textContent ?? '')
const cine = await page.evaluate(() => document.querySelector('.cine-scene')?.getAttribute('data-cine-scene') ?? 'sin cine')
console.log('estado final:', dev, '| cine:', cine)

await browser.close()
