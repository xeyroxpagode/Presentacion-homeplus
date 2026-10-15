// Session 7 — runtime preflight: verify 8444 is the HomePlus presentation and
// confirm the expected state count. READ-ONLY.
import { chromium, CHROMIUM_EXE, PW_VERSION, URL_BASE } from './pw.mjs'
import { PROBE } from './probe.mjs'
import fs from 'node:fs'
import path from 'node:path'

const OUT_DIR =
  'C:/Users/thega/Desktop/HomeplusPresentacion01/HomePlus_Presentacion_FINAL/audit/runtime/session-07'
const DATA = path.join(OUT_DIR, 'data')
fs.mkdirSync(DATA, { recursive: true })

const browser = await chromium.launch({ executablePath: CHROMIUM_EXE, headless: true })
const ctx = await browser.newContext({ viewport: { width: 1280, height: 720 } })
const page = await ctx.newPage()

const errors = []
page.on('console', (m) => { if (m.type() === 'error') errors.push('console:' + m.text()) })
page.on('pageerror', (e) => errors.push('pageerror:' + e.message))
page.on('requestfailed', (r) => errors.push('requestfailed:' + r.url()))

await page.goto(URL_BASE, { waitUntil: 'networkidle' })
await page.waitForSelector('.presentation-canvas', { timeout: 20000 })
await page.waitForFunction(() => document.getAnimations().every((a) => a.playState !== 'running'), null, { timeout: 10000 })

// ---- family verification --------------------------------------------------
const fam = await page.evaluate(() => {
  const c = document.querySelector('.presentation-canvas')
  const s = document.querySelector('.presentation-scene')
  const names = []
  return {
    title: document.title,
    hasCanvas: !!c,
    canvasClient: c ? [c.clientWidth, c.clientHeight] : null,
    canvasVars: c ? {
      w: getComputedStyle(c).getPropertyValue('--canvas-width').trim(),
      h: getComputedStyle(c).getPropertyValue('--canvas-height').trim()
    } : null,
    sceneLabel: s ? s.getAttribute('aria-label') : null,
    slideIndex: s ? s.getAttribute('data-slide-index') : null,
    stepIndex: s ? s.getAttribute('data-step-index') : null,
    canvasStyle: c ? { transform: getComputedStyle(c.parentElement).transform } : null,
    bodyBg: getComputedStyle(document.body).backgroundColor
  }
})

// ---- forward walk, stop when state stops changing ------------------------
const states = []
let guard = 0
while (guard < 200) {
  guard++
  const p = await page.evaluate(`(${PROBE})()`)
  states.push(p)
  const before = `${p.slideIndex}:${p.stepIndex}`
  await page.keyboard.press('ArrowRight')
  await page.waitForFunction(() =>
    document.getAnimations().every((a) => a.playState !== 'running'), null, { timeout: 10000 })
  await page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))))
  const p2 = await page.evaluate(() => {
    const s = document.querySelector('.presentation-scene')
    return s ? `${s.getAttribute('data-slide-index')}:${s.getAttribute('data-step-index')}` : 'none'
  })
  if (p2 === before) break
}

const ids = states.map((s) => `S${String(s.slideIndex + 1).padStart(2, '0')}_step${String(s.stepIndex).padStart(2, '0')}`)
const perScene = {}
states.forEach((s) => {
  const n = `S${String(s.slideIndex + 1).padStart(2, '0')}`
  perScene[n] = (perScene[n] || 0) + 1
})

fs.writeFileSync(path.join(DATA, 'walk-states.json'),
  JSON.stringify({ playwright: PW_VERSION, url: URL_BASE, family: fam, states }, null, 1))

console.log('PLAYWRIGHT       :', PW_VERSION)
console.log('URL              :', URL_BASE)
console.log('TITLE            :', fam.title)
console.log('CANVAS           :', fam.hasCanvas, fam.canvasClient, JSON.stringify(fam.canvasVars))
console.log('FIRST STATE      :', fam.sceneLabel, fam.slideIndex + ':' + fam.stepIndex)
console.log('STATES FORWARD   :', states.length)
console.log('ADJACENCY (N-1)  :', states.length - 1)
console.log('LAST STATE       :', ids[ids.length - 1])
console.log('PER SCENE        :', JSON.stringify(perScene))
console.log('ERRORS           :', errors.length, errors.slice(0, 5).join(' | '))

await browser.close()