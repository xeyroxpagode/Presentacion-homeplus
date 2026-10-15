import fs from 'node:fs'
import path from 'node:path'
import { chromium, CHROMIUM_EXE, URL_BASE, OUT_DIR } from './pw.mjs'

// Root-cause test for the Session-1 claim:
//   "S05_step01 -> S05_step02  .planner-tab 'Calendario' clientWidth 82 -> 137"
// Re-measured at 60ms resolution across the transition, plus the S06 map
// enlargement sampled across its own transition, so we know whether the
// Session-1 numbers are stable-state facts or transient artefacts.

const sample = () => {
  const tabs = [...document.querySelectorAll('.planner-tab')].map((el) => ({
    label: (el.innerText || '').trim(),
    w: el.clientWidth,
    left: +el.getBoundingClientRect().left.toFixed(1),
  }))
  const stage = document.querySelector('.family-map-stage')
  const places = [...document.querySelectorAll('.family-map-stage .map-place strong, .family-map-stage .map-person strong, .family-map-stage .map-delay strong')]
    .map((el) => ({ fs: getComputedStyle(el).fontSize, t: (el.innerText || '').trim() }))
  const canvas = document.querySelector('.presentation-canvas')
  const phonePos = document.querySelector('.home-phone-position')
  return {
    tabs,
    map: stage ? {
      expanded: stage.getAttribute('data-expanded'),
      client: [stage.clientWidth, stage.clientHeight],
      scroll: [stage.scrollWidth, stage.scrollHeight],
      transform: getComputedStyle(stage).transform,
    } : null,
    places,
    canvasScroll: canvas ? [canvas.scrollWidth, canvas.scrollHeight] : null,
    phoneOpacity: phonePos ? getComputedStyle(phonePos).opacity : null,
  }
}

const run = async () => {
  const browser = await chromium.launch({ executablePath: CHROMIUM_EXE, headless: true })
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 720 }, deviceScaleFactor: 1 })
  const page = await ctx.newPage()
  const errors = []
  page.on('pageerror', (e) => errors.push(String(e.message)))
  await page.goto(URL_BASE, { waitUntil: 'networkidle' })
  await page.waitForSelector('.presentation-canvas')
  await page.waitForTimeout(800)

  const goto = async (target) => {
    const read = () => page.evaluate(() => {
      const el = document.querySelector('.presentation-scene')
      return {
        slide: Number(document.documentElement.getAttribute('data-slide-index') ?? el?.getAttribute('data-slide-index') ?? -1),
        step: Number(document.documentElement.getAttribute('data-step-index') ?? el?.getAttribute('data-step-index') ?? -1),
      }
    })
    for (let guard = 0; guard < 200; guard += 1) {
      const cur = await read()
      if (cur.slide === target[0] && cur.step === target[1]) return true
      const curIdx = cur.slide * 100 + cur.step
      const tgtIdx = target[0] * 100 + target[1]
      await page.keyboard.press(tgtIdx > curIdx ? 'ArrowRight' : 'ArrowLeft')
      await page.waitForTimeout(45)
    }
    return false
  }

  const transitions = [
    { name: 'S05_step01->S05_step02', target: [4, 2] },
    { name: 'S06_step00->S06_step01', target: [5, 1] },
    { name: 'S06_step03->S06_step04', target: [5, 4] },
    { name: 'S01_step00->S01_step01', target: [0, 1] },
    { name: 'S02_step05->S02_step06', target: [1, 6] },
    { name: 'S02_step06->S03_step00', target: [2, 0] },
    { name: 'S06_step05->S07_step00', target: [6, 0] },
  ]

  const out = []
  for (const t of transitions) {
    // Land on the target, step back one so the sampler is armed BEFORE the
    // transition under test, then press forward into it exactly once.
    await goto(t.target)
    await page.keyboard.press('ArrowLeft')
    await page.waitForTimeout(700)
    const before = await page.evaluate(() => {
      const el = document.querySelector('.presentation-scene')
      return {
        slide: Number(document.documentElement.getAttribute('data-slide-index') ?? el?.getAttribute('data-slide-index') ?? -1),
        step: Number(document.documentElement.getAttribute('data-step-index') ?? el?.getAttribute('data-step-index') ?? -1),
      }
    })
    const series = []
    await page.evaluate(() => { window.__frames = [] })
    // arm a rAF sampler before the keypress so the first frame is captured
    await page.evaluate(() => {
      window.__stop = false
      const tick = () => {
        if (window.__stop) return
        window.__frames.push({ t: performance.now(), ...JSON.parse(JSON.stringify({
          tabs: [...document.querySelectorAll('.planner-tab')].map((el) => ({ label: (el.innerText || '').trim(), w: el.clientWidth })),
          mapClient: (() => { const s = document.querySelector('.family-map-stage'); return s ? [s.clientWidth, s.clientHeight] : null })(),
          mapTransform: (() => { const s = document.querySelector('.family-map-stage'); return s ? getComputedStyle(s).transform : null })(),
          canvasScroll: (() => { const c = document.querySelector('.presentation-canvas'); return c ? [c.scrollWidth, c.scrollHeight] : null })(),
          phoneOpacity: (() => { const p = document.querySelector('.home-phone-position'); return p ? getComputedStyle(p).opacity : null })(),
          blackout: (() => { const b = document.querySelector('.opening-blackout'); return b ? getComputedStyle(b).opacity : null })(),
          reveal: (() => { const r = document.querySelector('.homeplus-reveal'); return r ? getComputedStyle(r).opacity : null })(),
          statement: (() => { const s = document.querySelector('.information-statement'); return s ? getComputedStyle(s).opacity : null })(),
        })) })
        requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    })
    await page.keyboard.press('ArrowRight')
    await page.waitForTimeout(1100)
    const frames = await page.evaluate(() => { window.__stop = true; return window.__frames })
    const first = frames.length ? frames[0].t : 0
    const norm = frames.map((f) => ({ ms: Math.round(f.t - first), ...f }))
    out.push({ name: t.name, target: t.target, armedFrom: before, frameCount: norm.length, frames: norm })
    process.stdout.write(`${t.name}: armed from slide ${before.slide} step ${before.step}; ${norm.length} frames\n`)
  }

  fs.writeFileSync(path.join(OUT_DIR, 'data', 'transitions-ab.json'), JSON.stringify({ errors, transitions: out }, null, 2))
  console.log(`TRANSITIONS=${out.length} ERRORS=${errors.length}`)
  await browser.close()
}

run().catch((e) => { console.error('FATAL', e); process.exit(1) })