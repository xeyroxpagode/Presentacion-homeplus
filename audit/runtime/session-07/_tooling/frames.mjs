// Session 7 — visual QA frame pass (brief §55).
// For the selected transitions: capture t0 (settled before), early, mid, late,
// settled. Screenshots only; no production change.
import { chromium, CHROMIUM_EXE, URL_BASE } from './pw.mjs'
import { PROBE } from './probe.mjs'
import fs from 'node:fs'
import path from 'node:path'

const OUT_DIR =
  'C:/Users/thega/Desktop/HomeplusPresentacion01/HomePlus_Presentacion_FINAL/audit/runtime/session-07'
const FRAMES = path.join(OUT_DIR, 'frames')
fs.mkdirSync(FRAMES, { recursive: true })

const SHOT = [
  'S01_step00>S01_step01', 'S01_step04>S01_step05', 'S01_step09>S01_step10',
  'S02_step04>S02_step05', 'S02_step06>S03_step00', 'S03_step00>S04_step00',
  'S04_step02>S04_step03', 'S04_step05>S05_step00', 'S05_step01>S05_step02',
  'S05_step02>S05_step03', 'S05_step03>S06_step00', 'S06_step00>S06_step01',
  'S06_step02>S06_step03', 'S06_step03>S06_step04', 'S06_step05>S07_step00',
  'S07_step00>S07_step01', 'S07_step01>S08_step00', 'S08_step00>S08_step01',
  'S08_step01>S08_step02', 'S08_step03>S08_step04', 'S08_step04>S09_step00',
  'S09_step04>S10_step00', 'S10_step02>S10_step03', 'S10_step03>S10_step04',
  'S10_step04>S11_step00', 'S11_step02>S12_step00', 'S12_step02>S13_step00',
  'S13_step02>S13_step03', 'S13_step03>S14_step00', 'S14_step03>S14_step04',
  'S14_step04>S15_step00', 'S15_step04>S16_step00', 'S16_step04>S17_step00',
  'S17_step00>S17_step01', 'S17_step03>S18_step00', 'S18_step01>S18_step02'
]
const wanted = new Map(SHOT.map((s) => {
  const [a, b] = s.split('>')
  return [a, b]
}))
const ORDER = (() => {
  const counts = { S01: 11, S02: 7, S03: 1, S04: 6, S05: 4, S06: 6, S07: 2, S08: 5, S09: 5, S10: 5,
                   S11: 3, S12: 3, S13: 4, S14: 5, S15: 5, S16: 5, S17: 4, S18: 4 }
  const out = []
  for (const [k, c] of Object.entries(counts))
    for (let i = 0; i < c; i++) out.push(`${k}_step${String(i).padStart(2, '0')}`)
  return out
})()
const ORDER_IDX = new Map(ORDER.map((s, i) => [s, i]))
const stateId = (p) => `S${String(p.slideIndex + 1).padStart(2, '0')}_step${String(p.stepIndex).padStart(2, '0')}`

const browser = await chromium.launch({ executablePath: CHROMIUM_EXE, headless: true })
const ctx = await browser.newContext({ viewport: { width: 1280, height: 720 } })
const page = await ctx.newPage()
await page.goto(URL_BASE, { waitUntil: 'networkidle' })
await page.waitForSelector('.presentation-canvas', { timeout: 20000 })
const settle = async () => {
  await page.waitForFunction(() => document.getAnimations().every((a) => a.playState !== 'running'),
    null, { timeout: 12000 })
  await page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))))
}
await settle()

let shots = 0
let cur = stateId(await page.evaluate(`(${PROBE})()`))
for (let n = 0; n < 84; n++) {
  const i = ORDER_IDX.get(cur)
  const next = i != null && i + 1 < ORDER.length ? ORDER[i + 1] : null
  if (next && wanted.has(cur)) {
    const file = `${cur}__${next}`
    await page.screenshot({ path: path.join(FRAMES, `${file}__t000-before.png`) })
    const t0 = Date.now()
    await page.keyboard.press('ArrowRight')
    for (const m of [60, 160, 320]) {
      const w = m - (Date.now() - t0)
      if (w > 0) await page.waitForTimeout(w)
      await page.screenshot({ path: path.join(FRAMES, `${file}__t${String(m).padStart(3, '0')}.png`) })
    }
    await settle()
    await page.screenshot({ path: path.join(FRAMES, `${file}__t560-settled.png`) })
    shots++
    cur = next
    continue
  }
  await page.keyboard.press('ArrowRight')
  await settle()
  const after = stateId(await page.evaluate(`(${PROBE})()`))
  if (after === cur) { console.log('WALK ENDED EARLY at', cur); break }
  cur = after
}
console.log('TRANSITIONS FRAMED :', shots, '/', SHOT.length)
console.log('PNG FILES          :', fs.readdirSync(FRAMES).length)
await browser.close()