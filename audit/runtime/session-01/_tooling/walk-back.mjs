import { chromium, URL_BASE, OUT_DIR } from './pw.mjs'
import { probe } from './probe.mjs'
import fs from 'node:fs/promises'
import path from 'node:path'

const SHOTS = path.join(OUT_DIR, 'states-back')
const DATA = path.join(OUT_DIR, 'data')
await fs.mkdir(SHOTS, { recursive: true })
await fs.mkdir(DATA, { recursive: true })

const errors = []
const browser = await chromium.launch({ headless: true })
const context = await browser.newContext({ viewport: { width: 1280, height: 720 }, deviceScaleFactor: 1 })
const page = await context.newPage()
page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()) })
page.on('pageerror', (e) => errors.push('uncaught: ' + e.message))

await page.goto(URL_BASE, { waitUntil: 'networkidle' })
await page.waitForSelector('.presentation-scene', { timeout: 15000 })

async function settle() {
  await page
    .waitForFunction(() => (document.getAnimations ? document.getAnimations() : []).every((a) => a.playState === 'finished' || a.playState === 'idle'), null, { timeout: 4000 })
    .catch(() => {})
  await page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(() => r(1)))))
  await page.waitForTimeout(120)
}
const cur = () => page.evaluate(() => {
  const s = document.querySelector('.presentation-scene')
  return { si: Number(s.dataset.slideIndex), st: Number(s.dataset.stepIndex) }
})

// advance to the very end
let guard = 0
while (guard++ < 300) {
  const c = await cur()
  await page.keyboard.press('ArrowRight')
  await page.waitForTimeout(20)
  const n = await cur()
  if (n.si === c.si && n.st === c.st) break
}
await settle()
console.log('END STATE', JSON.stringify(await cur()))

const states = []
guard = 0
while (guard++ < 300) {
  await settle()
  const p = await page.evaluate(probe)
  const name = `${p.slideId}_step${String(p.stepIndex).padStart(2, '0')}`
  await page.screenshot({ path: path.join(SHOTS, `${name}.png`) })
  states.push({ order: guard - 1, name, shot: `states-back/${name}.png`, ...p })
  process.stdout.write(`[b${String(guard - 1).padStart(2)}] ${name} phone=${p.phonePresent ? `${p.phone.frame?.box.w}x${p.phone.frame?.box.h}` : 'no'} maxScale=${p.maxScale}\n`)
  const c = await cur()
  await page.keyboard.press('ArrowLeft')
  await page.waitForTimeout(20)
  const n = await cur()
  if (n.si === c.si && n.st === c.st) break
}

await fs.writeFile(path.join(DATA, 'walk-back.json'), JSON.stringify({ count: states.length, errors, states }, null, 1))
console.log(`BACK STATES=${states.length} ERRORS=${errors.length}`)
await browser.close()