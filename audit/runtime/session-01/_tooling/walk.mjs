import { chromium, URL_BASE, OUT_DIR } from './pw.mjs'
import { probe } from './probe.mjs'
import fs from 'node:fs/promises'
import path from 'node:path'

const W = Number(process.argv[2] || 1280)
const H = Number(process.argv[3] || 720)
const TAG = process.argv[4] || ''

const SHOTS = path.join(OUT_DIR, 'states')
const DATA = path.join(OUT_DIR, 'data')
await fs.mkdir(SHOTS, { recursive: true })
await fs.mkdir(DATA, { recursive: true })

const errors = []
const warnings = []

const browser = await chromium.launch({ headless: true })
const context = await browser.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: 1 })
const page = await context.newPage()

page.on('console', (m) => {
  const t = m.type()
  if (t === 'error') errors.push({ at: page.url(), text: m.text() })
  else if (t === 'warning') warnings.push({ at: page.url(), text: m.text() })
})
page.on('pageerror', (e) => errors.push({ at: page.url(), text: 'uncaught: ' + e.message }))
page.on('requestfailed', (r) => errors.push({ at: r.url(), text: `requestfailed ${r.failure()?.errorText}` }))

await page.goto(URL_BASE, { waitUntil: 'networkidle' })
await page.waitForSelector('.presentation-scene', { timeout: 15000 })

async function settle() {
  await page
    .waitForFunction(
      () => {
        const as = document.getAnimations ? document.getAnimations() : []
        return as.every((a) => a.playState === 'finished' || a.playState === 'idle')
      },
      null,
      { timeout: 4000 },
    )
    .catch(() => {})
  await page.evaluate(
    () => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(() => r(1)))),
  )
  await page.waitForTimeout(120)
}

const states = []
let idx = 0
const errorsBefore = errors.length

while (true) {
  await settle()
  const p = await page.evaluate(probe)
  const name = `${p.slideId}_step${String(p.stepIndex).padStart(2, '0')}`
  const shotName = TAG ? `${name}__${TAG}` : name
  await page.screenshot({ path: path.join(SHOTS, `${shotName}.png`) })

  states.push({
    order: idx,
    name,
    shot: `states/${shotName}.png`,
    ...p,
  })

  process.stdout.write(
    `[${String(idx).padStart(2)}] ${name} phone=${p.phonePresent ? `${p.phone.frame?.box.w}x${p.phone.frame?.box.h}@${p.phone.frame?.transform}` : 'no'} maxScale=${p.maxScale} hidden=${p.hiddenCount} scrollables=${p.scrollables.length} clippedVis=${p.clippedVisible.length}\n`,
  )

  idx++
  if (idx > 200) break
  await page.keyboard.press('ArrowRight')
  await page.waitForTimeout(30)
  const after = await page.evaluate(() => {
    const s = document.querySelector('.presentation-scene')
    return { si: Number(s.dataset.slideIndex), st: Number(s.dataset.stepIndex) }
  })
  const before = { si: Number(p.slideIndex), st: Number(p.stepIndex) }
  if (after.si === before.si && after.st === before.st) break
}

const out = { viewport: { W, H }, tag: TAG, count: states.length, errors, warnings, states }
await fs.writeFile(
  path.join(DATA, TAG ? `walk-${TAG}.json` : 'walk-forward.json'),
  JSON.stringify(out, null, 1),
)

console.log(`\nSTATES=${states.length}`)
console.log(`ERRORS=${errors.length} (during walk: ${errors.length - errorsBefore})`)
console.log(`WARNINGS=${warnings.length}`)
for (const e of errors.slice(0, 20)) console.log('  ERR ' + e.text)
for (const w of warnings.slice(0, 20)) console.log('  WARN ' + w.text)

await browser.close()