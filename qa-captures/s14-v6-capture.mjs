/**
 * S14 V6 QA capture: static frames F00–F13 + morph checkpoints.
 * Usage: `node qa-captures/s14-v6-capture.mjs` (vite preview on :4173).
 */
import puppeteer from 'puppeteer-core'

const SHELL = '/root/.cache/ms-playwright/chromium_headless_shell-1248/chrome-headless-shell-linux64/chrome-headless-shell'
const BASE = 'http://127.0.0.1:4173'

const shots = [
  // [name, step, s14t | null, viewport]
  ['F00-home', 0, null, null],
  ['F01-planner', 2, 340, null],
  ['F02-intent-preview', 2, 650, null],
  ['F03-form-sinfecha', 2, 1200, null],
  ['F04-picker-open', 2, 1450, null],
  ['F05-form-manana', 2, null, null],
  ['F06-assets', 3, 450, null],
  ['F08-ficha', 3, 1000, null],
  ['F09-garantia', 3, 1500, null],
  ['F10-pdf', 3, null, null],
  ['F11-home-clean', 4, null, null],
  ['F12-void', 5, null, null],
  ['F13-pregunta', 6, null, null],
  // morph checkpoints (§29)
  ['M1-task-morph-50', 2, 980, null],
  ['M2-ps-morph-50', 3, 800, null],
  ['M3-warranty-mid', 3, 1265, null],
  ['M4-reintegrate-mid', 4, 375, null],
  ['M5-exit-mid', 5, 235, null],
  ['M6-question-mid', 6, 210, null],
]

const browser = await puppeteer.launch({
  executablePath: SHELL,
  args: ['--no-sandbox', '--disable-gpu'],
})
const page = await browser.newPage()
await page.setViewport({ width: 1280, height: 720 })
const errors = []
page.on('pageerror', e => errors.push(`pageerror: ${e.message}`))
page.on('console', m => { if (m.type() === 'error') errors.push(`console: ${m.text()}`) })

for (const [name, step, t] of shots) {
  const url = `${BASE}/?dev=1&slide=13&step=${step}${t === null ? '' : `&s14t=${t}`}`
  await page.goto(url, { waitUntil: 'networkidle0' })
  await new Promise(r => setTimeout(r, t === null ? 3000 : 1200))
  await page.screenshot({ path: `qa-captures/s14-v6/${name}.png` })
  const audit = await page.evaluate(() => window.__S14_AUDIT__ ?? null)
  console.log(name, JSON.stringify(audit))
}

// 1920x1080 projection probes (§30)
await page.setViewport({ width: 1920, height: 1080 })
for (const [name, step, t] of [['F05-form-manana', 2, null], ['F10-pdf', 3, null], ['F13-pregunta', 6, null]]) {
  const url = `${BASE}/?dev=1&slide=13&step=${step}${t === null ? '' : `&s14t=${t}`}`
  await page.goto(url, { waitUntil: 'networkidle0' })
  await new Promise(r => setTimeout(r, 3000))
  await page.screenshot({ path: `qa-captures/s14-v6/${name}-1080p.png` })
}

// navigation smoke: S13 last -> S14 -> S15 (keyboard)
await page.setViewport({ width: 1280, height: 720 })
await page.goto(`${BASE}/?dev=1&slide=12&step=3`, { waitUntil: 'networkidle0' })
await new Promise(r => setTimeout(r, 800))
for (let i = 0; i < 8; i += 1) { await page.keyboard.press('ArrowRight'); await new Promise(r => setTimeout(r, 350)) }
await page.screenshot({ path: 'qa-captures/s14-v6/NAV-s13-to-s14.png' })
const navState = await page.evaluate(() => document.querySelector('.presentation-scene')?.getAttribute('data-slide-id')
  + '/' + document.querySelector('.presentation-scene')?.getAttribute('data-step-index'))
console.log('nav-after-8-next:', navState)
for (let i = 0; i < 8; i += 1) { await page.keyboard.press('ArrowRight'); await new Promise(r => setTimeout(r, 350)) }
await page.screenshot({ path: 'qa-captures/s14-v6/NAV-s14-to-s15.png' })
const navState2 = await page.evaluate(() => document.querySelector('.presentation-scene')?.getAttribute('data-slide-id')
  + '/' + document.querySelector('.presentation-scene')?.getAttribute('data-step-index'))
console.log('nav-after-16-next:', navState2)

console.log('ERRORS:', JSON.stringify(errors.slice(0, 20)))
await browser.close()
