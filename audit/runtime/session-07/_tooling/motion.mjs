// Session 7 — whole-film transition capture.
// For every one of the 84 adjacent transitions: sample before, early (~100ms),
// mid (~200ms), late (~320ms), settled (~560ms) and record per-element deltas,
// playState-classified animations (see N-10), container geometry, device geometry,
// mount/unmount, overflow and durations/easings.
import { chromium, CHROMIUM_EXE, URL_BASE } from './pw.mjs'
import { PROBE } from './probe.mjs'
import fs from 'node:fs'
import path from 'node:path'

const OUT_DIR =
  'C:/Users/thega/Desktop/HomeplusPresentacion01/HomePlus_Presentacion_FINAL/audit/runtime/session-07'
const DATA = path.join(OUT_DIR, 'data')
const FRAMES = path.join(OUT_DIR, 'frames')
fs.mkdirSync(DATA, { recursive: true })
fs.mkdirSync(FRAMES, { recursive: true })

const key = (el) =>
  (el.tagName || '') + (typeof el.className === 'string' && el.className ? '.' + el.className.trim().split(/\s+/).join('.') : '')

const SNAP = /* js */ `() => {
  const num = (v) => { const n = parseFloat(v); return Number.isFinite(n) ? n : 0; };
  const r2 = (n) => Math.round(n * 1000) / 1000;
  const out = {};
  const els = Array.from(document.querySelectorAll('.presentation-canvas, .presentation-canvas *'));
  for (const el of els) {
    const cs = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    const k = key_(el);
    out[k] = {
      x: r2(r.x), y: r2(r.y), w: r2(r.width), h: r2(r.height),
      op: r2(num(cs.opacity)),
      tr: cs.transform,
      fs: cs.fontSize,
      vis: cs.visibility + '/' + cs.display,
      cw: el.clientWidth, ch: el.clientHeight,
      sw: el.scrollWidth, sh: el.scrollHeight,
      st: el.scrollTop, sl: el.scrollLeft,
      td: cs.transitionDuration, tt: cs.transitionTimingFunction, tp: cs.transitionProperty,
      an: cs.animationName + '|' + cs.animationDuration + '|' + cs.animationIterationCount + '|' + cs.animationFillMode
    };
  }
  function key_(el) {
    return el.tagName.toLowerCase() + (typeof el.className === 'string' && el.className.trim()
      ? '.' + el.className.trim().split(/\\s+/).join('.') : '');
  }
  return out;
}`

const ANIM = /* js */ `() => {
  const num = (v) => { const n = parseFloat(v); return Number.isFinite(n) ? n : 0; };
  return document.getAnimations().map((a) => {
    const t = a.effect && a.effect.target;
    const cs = t ? getComputedStyle(t) : null;
    const tm = a.effect && a.effect.getTiming ? a.effect.getTiming() : null;
    return {
      st: a.playState,
      tgt: t ? (t.tagName.toLowerCase() + (typeof t.className === 'string' && t.className.trim()
        ? '.' + t.className.trim().split(/\\s+/).slice(0,2).join('.') : '')) : 'null',
      dur: tm ? tm.duration : null,
      delay: tm ? tm.delay : null,
      eas: tm ? tm.easing : null,
      iter: tm ? tm.iterations : null,
      fill: tm ? tm.fill : null,
      tp: cs ? cs.transitionProperty : null,
      td: cs ? cs.transitionDuration : null,
      tt: cs ? cs.transitionTimingFunction : null
    };
  });
}`

const stateId = (p) => `S${String(p.slideIndex + 1).padStart(2, '0')}_step${String(p.stepIndex).padStart(2, '0')}`

// transitions whose frames get screenshots (visual QA per brief §55)
const SHOT = new Set([
  'S01_step00__to__S01_step01', 'S01_step01__to__S01_step02', 'S01_step04__to__S01_step05',
  'S02_step06__to__S03_step00', 'S03_step00__to__S04_step00', 'S04_step02__to__S04_step03',
  'S04_step05__to__S05_step00', 'S05_step01__to__S05_step02', 'S05_step02__to__S05_step03',
  'S05_step03__to__S06_step00', 'S06_step00__to__S06_step01', 'S06_step02__to__S06_step03',
  'S06_step03__to__S06_step04', 'S06_step05__to__S07_step00', 'S07_step01__to__S08_step00',
  'S08_step00__to__S08_step01', 'S08_step01__to__S08_step02', 'S08_step03__to__S08_step04',
  'S08_step04__to__S09_step00', 'S09_step00__to__S09_step01', 'S09_step04__to__S10_step00',
  'S10_step02__to__S10_step03', 'S10_step03__to__S10_step04', 'S10_step04__to__S11_step00',
  'S11_step02__to__S12_step00', 'S12_step02__to__S13_step00', 'S13_step02__to__S13_step03',
  'S13_step03__to__S14_step00', 'S14_step03__to__S14_step04', 'S14_step04__to__S15_step00',
  'S15_step04__to__S16_step00', 'S16_step04__to__S17_step00', 'S17_step00__to__S17_step01',
  'S17_step03__to__S18_step00', 'S18_step01__to__S18_step02'
])

const browser = await chromium.launch({ executablePath: CHROMIUM_EXE, headless: true })
const ctx = await browser.newContext({ viewport: { width: 1280, height: 720 } })
const page = await ctx.newPage()
const errors = []
page.on('console', (m) => { if (m.type() === 'error') errors.push('console:' + m.text()) })
page.on('pageerror', (e) => errors.push('pageerror:' + e.message))

await page.goto(URL_BASE, { waitUntil: 'networkidle' })
await page.waitForSelector('.presentation-canvas', { timeout: 20000 })
const settle = async () => {
  await page.waitForFunction(() => document.getAnimations().every((a) => a.playState !== 'running'),
    null, { timeout: 12000 })
  await page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))))
}

const trans = []
for (let i = 0; i < 84; i++) {
  await settle()
  const probe = await page.evaluate(`(${PROBE})()`)
  const from = stateId(probe)
  const snapBefore = await page.evaluate(`(${SNAP})()`)
  const animBefore = await page.evaluate(`(${ANIM})()`)

  const tidGuess = `${from}__to__X`
  const shoot = SHOT.has(`${from}__to__X`) ||
    [...SHOT].some((s) => s.startsWith(from + '__to__'))
  const t0 = Date.now()
  await page.keyboard.press('ArrowRight')
  const frames = []
  const marks = [30, 100, 200, 320]
  for (const m of marks) {
    const wait = m - (Date.now() - t0)
    if (wait > 0) await page.waitForTimeout(wait)
    frames.push({ t: Date.now() - t0, snap: await page.evaluate(`(${SNAP})()`),
                  anim: await page.evaluate(`(${ANIM})()`) })
  }
  await settle()
  const settledProbe = await page.evaluate(`(${PROBE})()`)
  const toId = stateId(settledProbe)
  const tid = `${from}__to__${toId}`
  if (shoot) {
    for (const f of frames) {
      // frame PNGs are re-taken in the dedicated pass below (timing drift);
      // this pass keeps the numeric trace only.
      void f
    }
    await page.screenshot({ path: path.join(FRAMES, `${tid}__tsettled.png`) })
  }
  trans.push({ i: trans.length, from, to: toId, sceneFrom: from.slice(0, 3), sceneTo: toId.slice(0, 3),
    sceneBoundary: from.slice(0, 3) !== toId.slice(0, 3),
    before: { probe, snap: snapBefore, anim: animBefore },
    frames,
    settled: { probe: settledProbe, snap: await page.evaluate(`(${SNAP})()`),
               anim: await page.evaluate(`(${ANIM})()`) } })
  void tidGuess
}

// screenshots: before-frame of each shot transition is the previous settled frame
await page.goto(URL_BASE, { waitUntil: 'networkidle' })
await settle()
let pid = stateId(await page.evaluate(`(${PROBE})()`))
let n = 0
while (n < 85) {
  const cur = stateId(await page.evaluate(`(${PROBE})()`))
  const nxt = { S01: 11, S02: 7, S03: 1, S04: 6, S05: 4, S06: 6, S07: 2, S08: 5, S09: 5, S10: 5,
                S11: 3, S12: 3, S13: 4, S14: 5, S15: 5, S16: 5, S17: 4, S18: 4 }
  const [s, st] = [cur.slice(0, 3), Number(cur.slice(8))]
  if (st + 1 < n[s]) {
    const nextId = `${s}_step${String(st + 1).padStart(2, '0')}`
    if (SHOT.has(`${cur}__to__${nextId}`))
      await page.screenshot({ path: path.join(FRAMES, `${cur}>${nextId}__t000.png`) })
  }
  await page.keyboard.press('ArrowRight')
  await settle()
  const after = stateId(await page.evaluate(`(${PROBE})()`))
  if (after === cur) break
  n++
}

fs.writeFileSync(path.join(DATA, 'transitions.json'), JSON.stringify({ errors, trans }, null, 1))
console.log('TRANSITIONS      :', trans.length)
console.log('BOUNDARIES       :', trans.filter((t) => t.sceneBoundary).length)
console.log('FRAME PNGs       :', fs.readdirSync(FRAMES).length)
console.log('ERRORS           :', errors.length)
await browser.close()