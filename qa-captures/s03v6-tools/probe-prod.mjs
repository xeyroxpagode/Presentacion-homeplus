import { chromium } from 'playwright'
const BASE = 'http://localhost:5299'
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } })
const errors = []
page.on('pageerror', e => errors.push(e.message))
page.on('console', m => { if (m.type() === 'error') errors.push(m.text()) })

// Producción: entrar a S03 por navegación real desde el inicio.
await page.goto(BASE, { waitUntil: 'load' })
await page.waitForTimeout(1500)
for (let i = 0; i < 26; i++) { await page.keyboard.press('ArrowRight'); await page.waitForTimeout(300) }
await page.waitForTimeout(12000)
const where = await page.evaluate(() => ({
  slide: document.querySelector('.presentation-scene')?.getAttribute('data-slide-id'),
  step: document.querySelector('.presentation-scene')?.getAttribute('data-step-index'),
  cine: document.querySelector('.cine-scene')?.getAttribute('data-cine-scene') ?? null,
}))
console.log('estado tras avanzar hasta S04:', JSON.stringify(where))
await page.screenshot({ path: '/tmp/s03v6-verify/prod-final.png' })
console.log('errores:', errors.length, errors.slice(0, 5))
await browser.close()
