import { chromium, URL_BASE, OUT_DIR } from './pw.mjs'
import fs from 'node:fs/promises'
import path from 'node:path'
import crypto from 'node:crypto'

const DATA = path.join(OUT_DIR, 'data')
const SHOTS = path.join(OUT_DIR, 'hold')
await fs.mkdir(DATA, { recursive: true })
await fs.mkdir(SHOTS, { recursive: true })

const ORDER = []
const SLIDES = [
  ['S01', 11], ['S02', 7], ['S03', 1], ['S04', 6], ['S05', 4], ['S06', 6], ['S07', 2], ['S08', 5],
  ['S09', 5], ['S10', 5], ['S11', 3], ['S12', 3], ['S13', 4], ['S14', 5], ['S15', 5], ['S16', 5], ['S17', 4], ['S18', 4],
]
SLIDES.forEach(([id, n]) => { for (let i = 0; i < n; i++) ORDER.push({ id, step: i, name: `${id}_step${String(i).padStart(2, '0')}` }) })

const TARGETS = [
  { label: 'Opening', name: 'S01_step00', press: 0 },
  { label: 'Home', name: 'S04_step03', press: ORDER.findIndex((o) => o.name === 'S04_step03') },
  { label: 'Planner', name: 'S05_step02', press: ORDER.findIndex((o) => o.name === 'S05_step02') },
  { label: 'Family', name: 'S06_step03', press: ORDER.findIndex((o) => o.name === 'S06_step03') },
  { label: 'Finance', name: 'S09_step04', press: ORDER.findIndex((o) => o.name === 'S09_step04') },
  { label: 'Assets-HomeCloud', name: 'S10_step04', press: ORDER.findIndex((o) => o.name === 'S10_step04') },
  { label: 'Homi', name: 'S16_step04', press: ORDER.findIndex((o) => o.name === 'S16_step04') },
  { label: 'Closing', name: 'S18_step03', press: ORDER.findIndex((o) => o.name === 'S18_step03') },
]

const sig = () => {
  const de = document.documentElement
  const html = document.getElementById('root').innerHTML
  const geom = []
  for (const el of document.querySelectorAll('.presentation-canvas, .presentation-canvas *')) {
    const b = el.getBoundingClientRect()
    const cs = getComputedStyle(el)
    geom.push(`${Math.round(b.x * 100)},${Math.round(b.y * 100)},${Math.round(b.width * 100)},${Math.round(b.height * 100)},${cs.opacity},${cs.transform},${cs.fontSize}`)
  }
  return {
    rootHtmlLen: html.length,
    rootHtmlHash: null,
    geomHash: null,
    geomSample: geom.length,
    doc: { sw: de.scrollWidth, cw: de.clientWidth, sh: de.scrollHeight, ch: de.clientHeight },
    animations: document.getAnimations ? document.getAnimations().map((a) => `${a.constructor.name}:${a.playState}`) : [],
    _html: html,
    _geom: geom.join('|'),
  }
}

const errors = []
const results = []
const browser = await chromium.launch({ headless: true })
const context = await browser.newContext({ viewport: { width: 1280, height: 720 }, deviceScaleFactor: 1 })
const page = await context.newPage()
page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()) })
page.on('pageerror', (e) => errors.push('uncaught: ' + e.message))

for (const t of TARGETS) {
  await page.goto(URL_BASE, { waitUntil: 'networkidle' })
  await page.waitForSelector('.presentation-scene', { timeout: 15000 })
  for (let i = 0; i < t.press; i++) {
    await page.keyboard.press('ArrowRight')
    await page.waitForTimeout(15)
  }
  await page
    .waitForFunction(() => (document.getAnimations ? document.getAnimations() : []).every((a) => a.playState === 'finished' || a.playState === 'idle'), null, { timeout: 5000 })
    .catch(() => {})
  await page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(() => r(1)))))

  const nameNow = await page.evaluate(() => {
    const s = document.querySelector('.presentation-scene')
    return `${s.dataset.slideId}_step${String(s.dataset.stepIndex).padStart(2, '0')}`
  })

  const samples = []
  const shotA = path.join(SHOTS, `${t.label.replace(/\W+/g, '_')}__${t.name}__t0.png`)
  const shotB = path.join(SHOTS, `${t.label.replace(/\W+/g, '_')}__${t.name}__t10s.png`)
  for (const at of [0, 2500, 5000, 7500, 10000]) {
    const s = await page.evaluate(sig)
    samples.push({ at, rootHtmlLen: s.rootHtmlLen, htmlHash: crypto.createHash('sha1').update(s._html).digest('hex').slice(0, 12), geomHash: crypto.createHash('sha1').update(s._geom).digest('hex').slice(0, 12), geomCount: s.geomSample, doc: s.doc, runningAnimations: s.animations.filter((a) => a.endsWith(':running')).length, allAnimations: s.animations })
    if (at === 0) await page.screenshot({ path: shotA })
    if (at > 0 && at < 10000) await page.waitForTimeout(at - samples[samples.length - 2].at)
    if (at === 10000) await page.screenshot({ path: shotB })
  }
  const htmlStable = new Set(samples.map((s) => s.htmlHash)).size === 1
  const geomStable = new Set(samples.map((s) => s.geomHash)).size === 1
  const docStable = new Set(samples.map((s) => JSON.stringify(s.doc))).size === 1
  const resultsRow = { label: t.label, expected: t.name, actual: nameNow, press: t.press, htmlStable, geomStable, docStable, runningAnimations: samples.map((s) => s.runningAnimations), samples: samples.map((s) => ({ at: s.at, htmlHash: s.htmlHash, geomHash: s.geomHash, geomCount: s.geomCount, doc: s.doc, runningAnimations: s.runningAnimations })), shotA: path.relative(OUT_DIR, shotA).replace(/\\/g, '/'), shotB: path.relative(OUT_DIR, shotB).replace(/\\/g, '/') }
  results.push(resultsRow)
  console.log(`${t.label.padEnd(18)} ${nameNow} htmlStable=${htmlStable} geomStable=${geomStable} docStable=${docStable} runningAnim=[${resultsRow.runningAnimations.join(',')}]`)
}

await fs.writeFile(path.join(DATA, 'hold.json'), JSON.stringify({ errors, results }, null, 1))
console.log(`ERRORS=${errors.length}`)
await browser.close()