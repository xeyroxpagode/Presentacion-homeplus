import { chromium } from 'playwright'

const BASE = 'http://localhost:5199'
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } })

const state = async () => page.evaluate(() => {
  const el = document.querySelector('.presentation-dev')
  return el ? el.textContent : 'sin dev'
})

await page.goto(`${BASE}/?dev=1&slide=2&step=1`, { waitUntil: 'load' })
await page.waitForTimeout(400)
console.log('inicio:', await state())

// Click rápido durante la animación del step 1 → debe ENCOLAR, no saltar.
await page.keyboard.press('ArrowRight')
await page.waitForTimeout(120)
console.log('durante animación:', await state(), '(debe seguir en step 1)')

// Al llegar al reposo, el avance encolado se ejecuta.
await page.waitForTimeout(1100)
console.log('tras reposo:', await state(), '(debe pasar a step 2)')

// Tres clicks rápidos encadenados: avanzan de uno en uno, sin saltar.
for (let i = 0; i < 3; i++) { await page.keyboard.press('ArrowRight'); await page.waitForTimeout(90) }
console.log('tras 3 clicks:', await state(), '(debe seguir en step 2)')
await page.waitForTimeout(1000)
console.log('reposo 1:', await state())
await page.waitForTimeout(1000)
console.log('reposo 2:', await state())
await page.waitForTimeout(1200)
console.log('reposo 3:', await state())

await browser.close()
