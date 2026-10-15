import fs from 'node:fs'
import path from 'node:path'
import { chromium, CHROMIUM_EXE, URL_BASE, OUT_DIR } from './pw.mjs'

// Re-capture the two S10 internal transitions with the state identity recorded at
// every sample, so a completed-transition first frame can be told from a wrong index.
const CASES = [
  { want: '2', label: 'S10_step02→S10_step03 Assets detail → HomeCloud Documentos' },
  { want: '3', label: 'S10_step03→S10_step04 HomeCloud Documentos → Recuerdos' },
]

const browser = await chromium.launch({ executablePath: CHROMIUM_EXE, headless: true })
const ctx = await browser.newContext({ viewport: { width: 1280, height: 720 }, deviceScaleFactor: 1 })
const page = await ctx.newPage()
await page.goto(URL_BASE, { waitUntil: 'networkidle' })

const settle = async () => {
  await page.waitForFunction(() => document.getAnimations().every((a) => a.playState === 'finished' || a.playState === 'idle'), null, { timeout: 8000 }).catch(() => {})
  await page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))))
}
const key = async (k) => { await page.evaluate((kk) => document.dispatchEvent(new KeyboardEvent('keydown', { key: kk, bubbles: true })), k); await settle() }

// In-page rAF sampler installed BEFORE the press so no round-trip latency is lost.
const ARM = () => {
  window.__S3 = { on: true, frames: [] }
  const tick = () => {
    if (!window.__S3 || !window.__S3.on) return
    const q = (sel) => Array.from(document.querySelectorAll(sel))
    const one = (sel) => { const el = document.querySelector(sel); if (!el) return null; const r = el.getBoundingClientRect(); const s = getComputedStyle(el); return { x: +r.x.toFixed(1), y: +r.y.toFixed(1), w: +r.width.toFixed(1), h: +r.height.toFixed(1), op: +(+s.opacity).toFixed(3), tr: s.transform, fs: s.fontSize, vis: s.visibility } }
    const many = (sel) => q(sel).map((el) => { const r = el.getBoundingClientRect(); const s = getComputedStyle(el); return { cls: (el.className || '').toString().split(/\s+/).slice(0, 2).join('.'), x: +r.x.toFixed(1), y: +r.y.toFixed(1), w: +r.width.toFixed(1), h: +r.height.toFixed(1), op: +(+s.opacity).toFixed(3), fs: s.fontSize, vis: s.visibility, t: el.textContent.trim().slice(0, 34) } })
    const scene = document.querySelector('.presentation-scene')
    window.__S3.frames.push({
      t: +performance.now().toFixed(1),
      scene: scene ? scene.getAttribute('aria-label') : null,
      step: document.querySelector('.s10-scene') ? document.querySelector('.s10-scene').getAttribute('data-step') : null,
      anims: document.getAnimations().length,
      slot: one('.s10-phone-slot'),
      layers: many('.s10-layer'),
      hcTabs: many('.homecloud-tab'),
      hcDocRows: many('.homecloud-doc-row'),
      assetDocs: many('.assets-doc-row'),
      hcPhotos: many('.homecloud-photo'),
      hcThumbs: many('.homecloud-photo-thumb'),
      hcVoice: many('.homecloud-voice'),
      hcAlbum: many('.homecloud-album-row'),
    })
    requestAnimationFrame(tick)
  }
  requestAnimationFrame(tick)
}
const READ = () => { window.__S3.on = false; return window.__S3.frames }

const results = []
for (const c of CASES) {
  await page.goto(URL_BASE, { waitUntil: 'networkidle' })
  await settle()
  // Walk forward until S10 is on stage with data-step === want. Deterministic.
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const st = await page.evaluate(() => { const s = document.querySelector('.s10-scene'); return s ? s.getAttribute('data-step') : null })
    if (st === c.want) break
    if (st === '4') break
    await key('ArrowRight')
  }
  const before = await page.evaluate(() => { const s = document.querySelector('.s10-scene'); return { step: s && s.getAttribute('data-step'), label: document.querySelector('.presentation-scene').getAttribute('aria-label') } })
  await page.evaluate(ARM)
  await page.evaluate(() => document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true })))
  await page.waitForTimeout(1600)
  const frames = await page.evaluate(READ)
  await settle()
  await page.screenshot({ path: path.join(OUT_DIR, 'states', `motion2-want${c.want}-end.png`) })
  results.push({ label: c.label, before, frames })
  console.log('captured', c.label, 'before=', JSON.stringify(before), 'frames=', frames.length)
}

fs.writeFileSync(path.join(OUT_DIR, 'data', 'motion-s10.json'), JSON.stringify(results, null, 1))

// report
const out = []
const P = (s = '') => { out.push(s); console.log(s) }
for (const r of results) {
  P(`## ${r.label}`)
  P(`state before press: ${JSON.stringify(r.before)}`)
  const f = r.frames
  P(`frames: ${f.length}; t ${f[0].t} → ${f[f.length - 1].t} ms`)
  const idx = [0, 2, 4, 6, 9, 12, 16, 20, 25, f.length - 1].filter((i) => i < f.length)
  P('| t ms | data-step | slot x,op | layers | hcTabs | hcDocRows | assetDocs | hcThumbs |')
  P('|---|---|---|---|---|---|---|---|')
  for (const i of idx) {
    const x = f[i]
    P(`| ${x.t} | ${x.step} | ${x.slot ? `${x.slot.x},${x.slot.y} op=${x.slot.op} tr=${x.slot.tr}` : '—'} | ${x.layers.map((l) => `${l.op}/${l.vis}`).join(' ')} | ${x.hcTabs.map((t) => `${t.t}:${t.op}/${t.vis}`).join(' ') || '—'} | ${x.hcDocRows.length} | ${x.assetDocs.length} | ${x.hcThumbs.map((t) => `${t.w}×${t.h}`).join(',') || '—'} |`)
  }
  P('')
  P('HomeCloud doc rows at end: ' + JSON.stringify(f[f.length - 1].hcDocRows.map((r) => `${r.t}@${r.x},${r.y} ${r.w}×${r.h}`)))
  P('Assets doc rows at start: ' + JSON.stringify(f[0].assetDocs.map((r) => `${r.t}@${r.x},${r.y} ${r.w}×${r.h}`)))
  P('Photo thumbs at end: ' + JSON.stringify(f[f.length - 1].hcThumbs.map((r) => `${r.w}×${r.h}@${r.x},${r.y}`)))
  P('Photos at end: ' + JSON.stringify(f[f.length - 1].hcPhotos.map((r) => `${r.w}×${r.h}@${r.x},${r.y}`)))
  P('---')
  P('')
}
fs.writeFileSync(path.join(OUT_DIR, 'data', 'motion-s10.md'), out.join('\n'))
console.log('\nWROTE data/motion-s10.md')
await browser.close()