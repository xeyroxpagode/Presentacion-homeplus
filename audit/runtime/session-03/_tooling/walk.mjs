import fs from 'node:fs'
import path from 'node:path'
import { chromium, CHROMIUM_EXE, URL_BASE, OUT_DIR } from './pw.mjs'
import { PROBE } from './probe.mjs'

const STATES = [
  'S07_step00', 'S07_step01',
  'S08_step00', 'S08_step01', 'S08_step02', 'S08_step03', 'S08_step04',
  'S09_step00', 'S09_step01', 'S09_step02', 'S09_step03', 'S09_step04',
  'S10_step00', 'S10_step01', 'S10_step02', 'S10_step03', 'S10_step04',
  'S11_step00',
]

const shotDir = path.join(OUT_DIR, 'states')
fs.mkdirSync(shotDir, { recursive: true })

const browser = await chromium.launch({ executablePath: CHROMIUM_EXE, headless: true })
const ctx = await browser.newContext({ viewport: { width: 1280, height: 720 }, deviceScaleFactor: 1 })
const page = await ctx.newPage()

const consoleErrors = []
const pageErrors = []
const failedReqs = []
page.on('console', (m) => { if (m.type() === 'error') consoleErrors.push(m.text()) })
page.on('pageerror', (e) => pageErrors.push(String(e)))
page.on('requestfailed', (r) => failedReqs.push(`${r.method()} ${r.url()} — ${r.failure()?.errorText}`))

await page.goto(URL_BASE, { waitUntil: 'networkidle' })

const settle = async () => {
  await page.waitForFunction(() => document.getAnimations().every((a) => a.playState === 'finished' || a.playState === 'idle'), null, { timeout: 8000 }).catch(() => {})
  await page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))))
}

const key = async (k) => { await page.evaluate((kk) => document.dispatchEvent(new KeyboardEvent('keydown', { key: kk, bubbles: true })), k); await settle() }

const out = []
let idx = 0
// advance to S07_step00 = index 35
const allSteps = []
for (let s = 1; s <= 18; s++) {
  const cfg = { 1: 11, 2: 7, 3: 1, 4: 6, 5: 4, 6: 6, 7: 2, 8: 5, 9: 5, 10: 5, 11: 3, 12: 3, 13: 4, 14: 5, 15: 5, 16: 5, 17: 4, 18: 4 }[s]
  for (let i = 0; i < cfg; i++) allSteps.push(`S${String(s).padStart(2, '0')}_step${String(i).padStart(2, '0')}`)
}

const targetIdx = new Map(allSteps.map((n, i) => [n, i]))

for (const name of STATES) {
  while (idx < targetIdx.get(name)) { await key('ArrowRight'); idx++ }
  const p = await page.evaluate(PROBE)
  p.name = name
  out.push(p)
  await page.screenshot({ path: path.join(shotDir, `${name}.png`), animations: 'disabled' })
  console.log(name, 'ok  slot=', JSON.stringify(p.slot), 'maxScale=', p.maxScale)
}

fs.writeFileSync(path.join(OUT_DIR, 'data', 'states-cde.json'), JSON.stringify(out, null, 1))
fs.writeFileSync(path.join(OUT_DIR, 'data', 'runtime-errors.json'), JSON.stringify({ consoleErrors, pageErrors, failedReqs }, null, 1))
console.log('CONSOLE ERRORS', consoleErrors.length, consoleErrors.slice(0, 5))
console.log('PAGEERRORS', pageErrors.length, pageErrors.slice(0, 5))
console.log('FAILED REQ', failedReqs.length, failedReqs.slice(0, 5))
await browser.close()