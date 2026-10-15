import { chromium, URL_BASE, OUT_DIR } from './pw.mjs'
import fs from 'node:fs/promises'
import path from 'node:path'

const DATA = path.join(OUT_DIR, 'data')
await fs.mkdir(DATA, { recursive: true })
const TARGETS = [0, 100, 200, 320, 500]

const errors = []
const browser = await chromium.launch({ headless: true })
const context = await browser.newContext({ viewport: { width: 1280, height: 720 }, deviceScaleFactor: 1 })
const page = await context.newPage()
page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()) })
page.on('pageerror', (e) => errors.push('uncaught: ' + e.message))

await page.goto(URL_BASE, { waitUntil: 'networkidle' })
await page.waitForSelector('.presentation-scene', { timeout: 15000 })

const INSTALL = (targets) => {
  const clsOf = (el) => {
    const c = el.className
    if (!c) return ''
    if (typeof c === 'string') return c
    if (c.baseVal !== undefined) return c.baseVal
    return ''
  }
  const idxPath = (el) => {
    const parts = []
    let n = el
    while (n && n.nodeType === 1 && n.parentElement) {
      parts.unshift(Array.from(n.parentElement.children).indexOf(n))
      n = n.parentElement
    }
    return parts.join('.')
  }
  const keyOf = (el) => {
    const t = (el.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 24)
    return `${el.tagName.toLowerCase()}.${clsOf(el).trim().split(/\s+/).slice(0, 2).join('.')}[${idxPath(el)}]${t}`
  }
  const r2 = (n) => Math.round(n * 100) / 100
  window.__samples = []
  window.__done = false
  let armed = true
  const snap = () => {
    const anim = []
    const keys = []
    const containers = {}
    const all = Array.from(document.querySelectorAll('#root *'))
    for (const el of all) {
      const cs = getComputedStyle(el)
      const b = el.getBoundingClientRect()
      const k = keyOf(el)
      keys.push(k)
      const tracked =
        cs.transform !== 'none' || Number(cs.opacity) < 1 || /phone|demo-screen|presentation-canvas|presentation-scene|attention-element/i.test(clsOf(el))
      if (tracked && b.width > 0 && b.height > 0) {
        anim.push({
          k,
          b: [r2(b.x), r2(b.y), r2(b.width), r2(b.height)],
          op: cs.opacity,
          tf: cs.transform,
          tr: cs.translate,
          sc: cs.scale,
          cw: el.clientWidth, ch: el.clientHeight, sw: el.scrollWidth, sh: el.scrollHeight,
          st: el.scrollTop, sl: el.scrollLeft,
        })
      }
    }
    const q = (sel) => {
      const e = document.querySelector(sel)
      if (!e) return null
      const b = e.getBoundingClientRect()
      return { b: [r2(b.x), r2(b.y), r2(b.width), r2(b.height)], cw: e.clientWidth, ch: e.clientHeight, sw: e.scrollWidth, sh: e.scrollHeight, tf: getComputedStyle(e).transform }
    }
    containers.canvas = q('.presentation-canvas')
    containers.scene = q('.presentation-scene')
    containers.phoneSlot = q('.phone-frame-slot')
    containers.phoneFrame = q('.phone-frame')
    containers.phoneScreen = q('.phone-frame-screen')
    containers.appSurface = q('.phone-frame-screen > *')
    const de = document.documentElement
    return {
      anim, keys,
      containers,
      doc: { sw: de.scrollWidth, cw: de.clientWidth, sh: de.scrollHeight, ch: de.clientHeight },
      animCount: document.getAnimations ? document.getAnimations().length : -1,
    }
  }
  window.addEventListener('keydown', () => {
    if (!armed) return
    armed = false
    const t0 = performance.now()
    ;(async () => {
      for (const t of targets) {
        const w = t - (performance.now() - t0)
        if (w > 0) await new Promise((r) => setTimeout(r, w))
        window.__samples.push({ ms: Math.round(performance.now() - t0), ...snap() })
      }
      window.__done = true
    })()
  }, true)
}

const cur = () => page.evaluate(() => {
  const s = document.querySelector('.presentation-scene')
  return { si: Number(s.dataset.slideIndex), st: Number(s.dataset.stepIndex), id: s.dataset.slideId, stp: Number(s.dataset.stepIndex) }
})

const transitions = []
let guard = 0
while (guard++ < 200) {
  const before = await cur()
  await page.evaluate(INSTALL, TARGETS)
  await page.keyboard.press('ArrowRight')
  await page.waitForFunction(() => window.__done === true, null, { timeout: 8000 }).catch(() => {})
  const samples = await page.evaluate(() => window.__samples)
  const after = await cur()
  if (after.si === before.si && after.st === before.st) break
  transitions.push({
    index: transitions.length,
    from: before,
    to: after,
    label: `${before.id}_step${String(before.stp).padStart(2, '0')} -> ${after.id}_step${String(after.stp).padStart(2, '0')}`,
    samples,
  })
  process.stdout.write(`[t${String(transitions.length - 1).padStart(2)}] ${transitions[transitions.length - 1].label} frames=${samples.length}\n`)
  await page.waitForTimeout(60)
}

await fs.writeFile(path.join(DATA, 'motion.json'), JSON.stringify({ targets: TARGETS, count: transitions.length, errors, transitions }, null, 1))
console.log(`TRANSITIONS=${transitions.length} ERRORS=${errors.length}`)
await browser.close()