import { chromium } from 'playwright'

const BASE = 'http://localhost:5199'
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } })

const errors = []
page.on('console', m => { if (m.type() === 'error') errors.push(m.text()) })
page.on('pageerror', e => errors.push('PAGEERROR: ' + e.message))

// Recorre todos los slides y steps declarados en presentationConfig.
const config = [
  { id: 'S01', steps: 6 }, { id: 'S02', steps: 9 }, { id: 'S03', steps: 11 },
  { id: 'S04', steps: 3 }, { id: 'S05', steps: 5 }, { id: 'S06', steps: 6 },
  { id: 'S07', steps: 2 }, { id: 'S08', steps: 5 }, { id: 'S09', steps: 2 },
  { id: 'S10', steps: 4 }, { id: 'S11', steps: 1 }, { id: 'S12', steps: 3 },
  { id: 'S13', steps: 1 }, { id: 'FINAL', steps: 6 }, { id: 'S18', steps: 4 },
]
console.log('slides:', config.map(c => `${c.id}:${c.steps}`).join(' '))

for (let i = 0; i < config.length; i++) {
  for (let s = 0; s < config[i].steps; s++) {
    await page.goto(`${BASE}/?dev=1&slide=${i}&step=${s}`, { waitUntil: 'load' })
    await page.waitForTimeout(120)
  }
  process.stdout.write(`${config[i].id} ok `)
}
console.log('')

// Navegación real con teclado desde S03 hacia S04.
await page.goto(`${BASE}/?dev=1&slide=2&step=8`, { waitUntil: 'load' })
await page.waitForTimeout(2400)
await page.keyboard.press('ArrowRight')
await page.waitForTimeout(1800)
await page.keyboard.press('ArrowRight')
await page.waitForTimeout(1600)
const state = await page.evaluate(() => document.querySelector('.presentation-dev')?.textContent ?? '')
console.log('tras 2 clicks desde step 8:', state)

console.log('errores de consola:', errors.length)
for (const e of errors.slice(0, 12)) console.log('  -', e.slice(0, 180))
await browser.close()
