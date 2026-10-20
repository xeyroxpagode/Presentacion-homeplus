import { chromium } from 'playwright'
import { mkdirSync } from 'fs'

const BASE = 'http://localhost:5199'
const OUT = '/root/proyectos/HomeplusPresentacion01/qa-captures/s03v6'
mkdirSync(OUT, { recursive: true })

// §14 — estado inicial, 10%, 25%, 50%, 75%, 90% y estado final por step.
const MARKS = [
  { tag: '00-inicial', p: 0 },
  { tag: '10', p: 0.1 },
  { tag: '25', p: 0.25 },
  { tag: '50', p: 0.5 },
  { tag: '75', p: 0.75 },
  { tag: '90', p: 0.9 },
  { tag: '100-final', p: 1 },
]

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } })

// Step 0 (branding heredado): el congelado de entrada es en ms (0–3000).
for (const m of MARKS) {
  const ms = Math.round(m.p * 3000)
  await page.goto(`${BASE}/?dev=1&slide=2&step=0&s03t=${ms}`, { waitUntil: 'load' })
  await page.waitForTimeout(450)
  await page.screenshot({ path: `${OUT}/step00-${m.tag}.png` })
  console.log('captured step00', m.tag)
}

// Steps 1–10 (película V6): el congelado `s03p` es la fracción del step.
for (let step = 1; step <= 10; step++) {
  for (const m of MARKS) {
    const url = `${BASE}/?dev=1&slide=2&step=${step}&s03p=${m.p}&s03noauto=1`
    await page.goto(url, { waitUntil: 'load' })
    await page.waitForTimeout(420)
    await page.screenshot({ path: `${OUT}/step${String(step).padStart(2, '0')}-${m.tag}.png` })
  }
  console.log('captured step', step)
}

await browser.close()
console.log('done')
