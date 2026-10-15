import { chromium, URL_BASE, OUT_DIR } from './pw.mjs'
import fs from 'node:fs/promises'
import path from 'node:path'

const DATA = path.join(OUT_DIR, 'data')
const SHOTS = path.join(OUT_DIR, 'viewport')
await fs.mkdir(DATA, { recursive: true })
await fs.mkdir(SHOTS, { recursive: true })

// global press index of every (slide, step)
const SLIDES = [
  ['S01', 11], ['S02', 7], ['S03', 1], ['S04', 6], ['S05', 4], ['S06', 6], ['S07', 2], ['S08', 5],
  ['S09', 5], ['S10', 5], ['S11', 3], ['S12', 3], ['S13', 4], ['S14', 5], ['S15', 5], ['S16', 5], ['S17', 4], ['S18', 4],
]
const ORDER = []
SLIDES.forEach(([id, n]) => { for (let i = 0; i < n; i++) ORDER.push({ id, step: i, name: `${id}_step${String(i).padStart(2, '0')}`, press: ORDER.length }) })

const sig = () => {
  const de = document.documentElement
  const canvas = document.querySelector('.presentation-canvas')
  const cb = canvas ? canvas.getBoundingClientRect() : null
  const cs = canvas ? getComputedStyle(canvas) : null
  const viewport = document.querySelector('.presentation-viewport')
  const phone = document.querySelector('.phone-frame')
  const pb = phone ? phone.getBoundingClientRect() : null
  const screen = document.querySelector('.phone-frame-screen')
  const sb = screen ? screen.getBoundingClientRect() : null
  let minFont = null, minFontText = null, maxFont = null, textCount = 0
  const vis = []
  for (const el of document.querySelectorAll('#root *')) {
    const c = getComputedStyle(el)
    if (c.display === 'none' || c.visibility === 'hidden' || Number(c.opacity) === 0) continue
    const b = el.getBoundingClientRect()
    if (b.width < 1 || b.height < 1) continue
    vis.push(el)
    const own = Array.from(el.childNodes).filter((n) => n.nodeType === 3).map((n) => n.textContent.trim()).join('')
    if (own.length >= 3) {
      textCount++
      const fs = parseFloat(c.fontSize)
      if (minFont === null || fs < minFont) { minFont = fs; minFontText = own.slice(0, 40) }
      if (maxFont === null || fs > maxFont) maxFont = fs
    }
  }
  const overflowers = vis.filter((el) => el.scrollHeight - el.clientHeight > 1 || el.scrollWidth - el.clientWidth > 1)
  let outside = 0
  if (cb) {
    outside = vis.filter((el) => {
      const b = el.getBoundingClientRect()
      return b.x < cb.x - 1 || b.y < cb.y - 1 || b.right > cb.right + 1 || b.bottom > cb.bottom + 1
    }).length
  }
  return {
    canvasBox: cb ? { x: Math.round(cb.x * 100) / 100, y: Math.round(cb.y * 100) / 100, w: Math.round(cb.width * 100) / 100, h: Math.round(cb.height * 100) / 100 } : null,
    canvasTransform: cs ? cs.transform : null,
    canvasClient: canvas ? { cw: canvas.clientWidth, ch: canvas.clientHeight, sw: canvas.scrollWidth, sh: canvas.scrollHeight } : null,
    viewportClient: viewport ? { cw: viewport.clientWidth, ch: viewport.clientHeight, sw: viewport.scrollWidth, sh: viewport.scrollHeight } : null,
    phoneBox: pb ? { x: Math.round(pb.x * 100) / 100, y: Math.round(pb.y * 100) / 100, w: Math.round(pb.width * 100) / 100, h: Math.round(pb.height * 100) / 100 } : null,
    phoneLayout: phone ? { ow: phone.offsetWidth, oh: phone.offsetHeight } : null,
    phoneScreenBox: sb ? { x: Math.round(sb.x * 100) / 100, y: Math.round(sb.y * 100) / 100, w: Math.round(sb.width * 100) / 100, h: Math.round(sb.height * 100) / 100 } : null,
    doc: { sw: de.scrollWidth, cw: de.clientWidth, sh: de.scrollHeight, ch: de.clientHeight },
    minFont, minFontText, maxFont, textCount,
    visibleCount: vis.length,
    overflowCount: overflowers.length,
    overflowSample: overflowers.slice(0, 6).map((e) => `${e.tagName.toLowerCase()}.${String(e.className).split(/\s+/)[0]} ${e.scrollWidth - e.clientWidth}x${e.scrollHeight - e.clientHeight}`),
    outsideCanvas: outside,
  }
}

const SHOT_AT = new Set(['S01_step00', 'S04_step00', 'S06_step03', 'S09_step04', 'S10_step04', 'S15_step00', 'S18_step03'])
const SIZES = [[1280, 720], [1920, 1080], [1600, 900], [1440, 900]]
const all = {}
const errors = []

for (const [W, H] of SIZES) {
  const browser = await chromium.launch({ headless: true })
  const context = await browser.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: 1 })
  const page = await context.newPage()
  page.on('console', (m) => { if (m.type() === 'error') errors.push(`${W}x${H} ${m.text()}`) })
  page.on('pageerror', (e) => errors.push(`${W}x${H} uncaught: ${e.message}`))
  await page.goto(URL_BASE, { waitUntil: 'networkidle' })
  await page.waitForSelector('.presentation-scene', { timeout: 15000 })

  const rows = []
  const settle = async () => {
    await page
      .waitForFunction(() => (document.getAnimations ? document.getAnimations() : []).every((a) => a.playState === 'finished' || a.playState === 'idle'), null, { timeout: 4000 })
      .catch(() => {})
    await page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(() => r(1)))))
    await page.waitForTimeout(60)
  }
  const readName = () => page.evaluate(() => {
    const s = document.querySelector('.presentation-scene')
    return `${s.dataset.slideId}_step${String(s.dataset.stepIndex).padStart(2, '0')}`
  })
  for (let p = 0; p < ORDER.length; p++) {
    await settle()
    const name = await readName()
    const s = await page.evaluate(sig)
    rows.push({ name, ...s })
    if (SHOT_AT.has(name)) {
      await page.screenshot({ path: path.join(SHOTS, `${W}x${H}__${name}.png`) })
    }
    await page.keyboard.press('ArrowRight')
  }
  const scales = [...new Set(rows.map((r) => r.canvasTransform))]
  const phoneW = [...new Set(rows.filter((r) => r.phoneBox).map((r) => r.phoneBox.w))]
  const minF = [...new Set(rows.map((r) => r.minFont))]
  console.log(`${W}x${H}: canvasTransform=${JSON.stringify(scales)} canvasBox=${JSON.stringify(rows[0].canvasBox)} phoneW=${JSON.stringify(phoneW)} minFont=${JSON.stringify(minF)} outside=${JSON.stringify([...new Set(rows.map((r) => r.outsideCanvas))])}`)
  all[`${W}x${H}`] = rows
  await browser.close()
}

await fs.writeFile(path.join(DATA, 'viewport-matrix.json'), JSON.stringify({ errors, sizes: SIZES, all }, null, 1))
console.log(`ERRORS=${errors.length}`)
for (const e of errors.slice(0, 10)) console.log('  ' + e)