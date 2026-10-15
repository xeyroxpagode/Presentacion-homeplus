// SESSION 5 â€” read-only runtime probe for Scenes I (S15/S16/S17) and J (S18).
// Does not touch production files. Writes only into audit/runtime/session-05/.
import fs from 'node:fs'
import path from 'node:path'
import { chromium, CHROMIUM_EXE, URL_BASE, OUT_DIR } from './pw.mjs'

const OUT = path.join(OUT_DIR, 'data')
fs.mkdirSync(OUT, { recursive: true })
const SHOTS = path.join(OUT_DIR, 'states')
fs.mkdirSync(SHOTS, { recursive: true })

const TARGET_STATES = [
  'S14_step04',
  'S15_step00', 'S15_step01', 'S15_step02', 'S15_step03', 'S15_step04',
  'S16_step00', 'S16_step01', 'S16_step02', 'S16_step03', 'S16_step04',
  'S17_step00', 'S17_step01', 'S17_step02', 'S17_step03',
  'S18_step00', 'S18_step01', 'S18_step02', 'S18_step03',
]

const errors = []
const warnings = []

const IN_PAGE = () => {
  const vis = (el) => {
    const cs = getComputedStyle(el)
    if (cs.visibility === 'hidden' || cs.display === 'none') return false
    if (parseFloat(cs.opacity) === 0) return false
    const r = el.getBoundingClientRect()
    if (r.width <= 0 || r.height <= 0) return false
    let p = el.parentElement
    while (p) {
      const pcs = getComputedStyle(p)
      if (pcs.visibility === 'hidden' || pcs.display === 'none') return false
      if (parseFloat(pcs.opacity) === 0) return false
      p = p.parentElement
    }
    return true
  }
  const txt = (el) => (el.innerText || '').replace(/\s+/g, ' ').trim().slice(0, 70)

  const q = (sel) => Array.from(document.querySelectorAll(sel))

  const collect = () => {
    const anims = document.getAnimations().map((a) => {
      const t = a.effect && a.effect.target
      return {
        name: (a.animationName || (a.effect && a.effect.getKeyframes && 'transition') || 'unknown'),
        cls: t ? (t.className && t.className.baseVal !== undefined ? t.className.baseVal : t.className) : null,
        tag: t ? t.tagName : null,
        text: t ? txt(t) : null,
        state: a.playState,
        t: Math.round(a.currentTime || 0),
      }
    })
    return {
      state: `${document.querySelector('.presentation-scene')?.getAttribute('aria-label') || '?'}#${document.querySelector('.presentation-scene')?.dataset?.slideIndex ?? '?'}:${document.querySelector('.presentation-scene')?.dataset?.stepIndex ?? '?'}`,
      slideIndex: document.querySelector('.presentation-scene')?.dataset?.slideIndex ?? null,
      stepIndex: document.querySelector('.presentation-scene')?.dataset?.stepIndex ?? null,
      animationsRunning: anims.length,
      animations: anims,
      homi: {
        greeting: q('.homi-greeting').map((e) => ({ text: txt(e), vis: vis(e), op: getComputedStyle(e).opacity, tf: getComputedStyle(e).transform, translate: getComputedStyle(e).translate })),
        userBubble: q('.homi-user-bubble').map((e) => ({ text: txt(e), vis: vis(e), op: getComputedStyle(e).opacity, tf: getComputedStyle(e).transform, translate: getComputedStyle(e).translate })),
        persona: q('.homi-persona').map((e) => ({ text: txt(e), vis: vis(e), op: getComputedStyle(e).opacity, tf: getComputedStyle(e).transform, translate: getComputedStyle(e).translate })),
        personaSwap: q('.homi-persona-swap').map((e) => ({ text: txt(e), vis: vis(e), op: getComputedStyle(e).opacity, tf: getComputedStyle(e).transform, translate: getComputedStyle(e).translate })),
        proposal: q('.homi-proposal').map((e) => ({ text: txt(e), vis: vis(e), op: getComputedStyle(e).opacity, tf: getComputedStyle(e).transform, rect: (() => { const r = e.getBoundingClientRect(); return [Math.round(r.x), Math.round(r.y), Math.round(r.width), Math.round(r.height)] })() })),
        answerSwap: q('.homi-answer-swap').map((e) => ({ text: txt(e), vis: vis(e), op: getComputedStyle(e).opacity, tf: getComputedStyle(e).transform, translate: getComputedStyle(e).translate })),
        confirm: q('.homi-confirm').map((e) => ({ text: txt(e), vis: vis(e), op: getComputedStyle(e).opacity })),
        dismiss: q('.homi-dismiss').map((e) => ({ text: txt(e), vis: vis(e), op: getComputedStyle(e).opacity })),
        decisionRow: q('.homi-decision-row').map((e) => ({ vis: vis(e), op: getComputedStyle(e).opacity, scrollH: e.scrollHeight, clientH: e.clientHeight })),
        done: q('.homi-done').map((e) => ({ text: txt(e), vis: vis(e), op: getComputedStyle(e).opacity })),
        context: q('.homi-context').map((e) => ({ text: txt(e), vis: vis(e), op: getComputedStyle(e).opacity })),
        chips: q('.homi-context-chip').map((e) => ({ text: txt(e), vis: vis(e) })),
        composer: q('.homi-composer-hint').map((e) => ({ text: txt(e), vis: vis(e) })),
        assistantSub: q('.homi-assistant-sub').map((e) => ({ text: txt(e), vis: vis(e) })),
      },
      stage: {
        idea: q('.s16-idea').map((e) => ({ text: txt(e), vis: vis(e), op: getComputedStyle(e).opacity, fontSize: getComputedStyle(e).fontSize })),
        s17line: q('.s17-line').map((e) => ({ text: txt(e), vis: vis(e), op: getComputedStyle(e).opacity, color: getComputedStyle(e).color })),
        s17res: q('.s17-resolution').map((e) => ({ text: txt(e), vis: vis(e), op: getComputedStyle(e).opacity, fontSize: getComputedStyle(e).fontSize })),
        s15title: q('.s15-title').map((e) => ({ text: txt(e), vis: vis(e), op: getComputedStyle(e).opacity, fontSize: getComputedStyle(e).fontSize })),
        s18brand: q('.s18-brand').map((e) => ({ vis: vis(e), op: getComputedStyle(e).opacity, scale: getComputedStyle(e).scale })),
        s18team: q('.s18-team').map((e) => ({ vis: vis(e), op: getComputedStyle(e).opacity, text: txt(e) })),
        s18member: q('.s18-member').map((e) => ({ text: txt(e), vis: vis(e), op: getComputedStyle(e).opacity })),
        s18thanks: q('.s18-thanks').map((e) => ({ text: txt(e), vis: vis(e), op: getComputedStyle(e).opacity, fontSize: getComputedStyle(e).fontSize })),
        sceneBg: (() => {
          const el = document.querySelector('.presentation-scene') || document.body
          return { sel: el.className, bg: getComputedStyle(el).backgroundColor, htmlBg: getComputedStyle(document.documentElement).backgroundColor, bodyBg: getComputedStyle(document.body).backgroundColor }
        })(),
        visibleText: Array.from(document.querySelectorAll('.presentation-canvas *'))
          .filter((e) => e.children.length === 0 && vis(e) && (e.innerText || '').trim())
          .map((e) => (e.innerText || '').replace(/\s+/g, ' ').trim()),
      },
      phone: (() => {
        const f = document.querySelector('.phone-frame')
        if (!f) return null
        const r = f.getBoundingClientRect()
        return { box: [Math.round(r.x), Math.round(r.y), Math.round(r.width), Math.round(r.height)], transform: getComputedStyle(f).transform }
      })(),
      phoneCount: q('.phone-frame').length,
    }
  }
  window.__collect = collect
}

const browser = await chromium.launch({ executablePath: CHROMIUM_EXE, headless: true })
const ctx = await browser.newContext({ viewport: { width: 1280, height: 720 }, deviceScaleFactor: 1 })
const page = await ctx.newPage()
page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); if (m.type() === 'warning') warnings.push(m.text()) })
page.on('pageerror', (e) => errors.push('uncaught: ' + e.message))
page.on('requestfailed', (r) => errors.push(`${r.method} ${r.url()} â€” ${r.failure()}`))

await page.goto(URL_BASE, { waitUntil: 'networkidle' })
await page.addScriptTag({ content: `(${IN_PAGE.toString()})()` })

const reduced = await page.evaluate(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)

const stable = async () => {
  await page.waitForFunction(() => document.getAnimations().every((a) => a.playState === 'finished' || a.playState === 'idle'), null, { timeout: 4000 }).catch(() => {})
  await page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))))
}

// walk to the first target
let idx = 0
const stableStates = {}
const label = async () => page.evaluate(() => {
  const s = document.querySelector('.presentation-scene')
  const si = Number(s?.dataset?.slideIndex)
  const st = Number(s?.dataset?.stepIndex)
  return `S${String(si + 1).padStart(2, '0')}_step${String(st).padStart(2, '0')}`
})

while (idx < 85) {
  const l = await label()
  if (TARGET_STATES.includes(l)) {
    await stable()
    stableStates[l] = await page.evaluate(() => window.__collect())
    await page.screenshot({ path: path.join(SHOTS, `${l}.png`), animations: 'disabled' })
  }
  await page.keyboard.press('ArrowRight')
  await page.waitForTimeout(90)
  idx++
}

fs.writeFileSync(path.join(OUT, 'stable-states.json'), JSON.stringify({ reducedMotion: reduced, states: stableStates }, null, 2))

// ---- TRANSITION MICRO-TRACE: arm a document-level capture listener on keydown,
// sample getAnimations() + the specific Homi / S16 / S17 / S18 nodes at 0/60/120/200/320/450 ms.
const TRANSITIONS = [
  'S15_step00->S15_step01', 'S15_step01->S15_step02', 'S15_step02->S15_step03', 'S15_step03->S15_step04',
  'S15_step04->S16_step00', 'S16_step00->S16_step01', 'S16_step01->S16_step02', 'S16_step02->S16_step03',
  'S16_step03->S16_step04', 'S16_step04->S17_step00', 'S17_step00->S17_step01', 'S17_step01->S17_step02',
  'S17_step02->S17_step03', 'S17_step03->S18_step00', 'S18_step00->S18_step01', 'S18_step01->S18_step02',
  'S18_step02->S18_step03',
]

await page.goto(URL_BASE, { waitUntil: 'networkidle' })
await page.addScriptTag({ content: `(${IN_PAGE.toString()})()` })

await page.evaluate(() => {
  window.__trace = null
  const sels = ['.homi-greeting', '.homi-user-bubble', '.homi-proposal', '.homi-confirm', '.homi-dismiss',
    '.homi-decision-row', '.homi-done', '.homi-context', '.homi-persona', '.homi-persona-swap',
    '.homi-answer-swap', '.homi-context-chip', '.s16-idea', '.s17-line', '.s17-resolution',
    '.s15-title', '.s18-brand', '.s18-team', '.s18-member', '.s18-thanks']
  const read = () => {
    const o = {}
    for (const s of sels) {
      const els = Array.from(document.querySelectorAll(s))
      o[s] = els.map((e) => {
        const cs = getComputedStyle(e)
        const r = e.getBoundingClientRect()
        return { op: +(+cs.opacity).toFixed(3), tf: cs.transform, tr: cs.translate, sc: cs.scale,
          box: [Math.round(r.x), Math.round(r.y), Math.round(r.width), Math.round(r.height)],
          sh: e.scrollHeight, ch: e.clientHeight }
      })
    }
    return o
  }
  const anims = () => document.getAnimations().map((a) => {
    const t = a.effect && a.effect.target
    return { n: a.animationName || 'transition', cls: t ? String(t.className.baseVal !== undefined ? t.className.baseVal : t.className).slice(0, 48) : null, st: a.playState, t: Math.round(a.currentTime || 0) }
  })
  document.addEventListener('keydown', () => {
    const t0 = performance.now()
    const frames = []
    const push = () => frames.push({ dt: Math.round(performance.now() - t0), n: anims().length, anims: anims(), nodes: read() })
    push()
    for (const d of [60, 120, 200, 320, 450]) setTimeout(push, d)
    setTimeout(() => { window.__trace = frames }, 620)
  }, true)
})

const traces = []
let cur = ''
for (let i = 0; i < 85; i++) {
  const l = await label()
  const nextIdx = i + 1
  if (i < 84) {
    await page.evaluate(() => { window.__trace = null })
    await page.keyboard.press('ArrowRight')
    await page.waitForTimeout(700)
    const tr = await page.evaluate(() => window.__trace)
    const next = await label()
    const key = `${l}->${next}`
    if (TARGET_STATES.concat(TARGET_STATES).includes(l) || TARGET_STATES.includes(next)) { console.log('TR ' + key + ' trace=' + (tr ? tr.length : 'NULL')) }
    if (TRANSITIONS.includes(key)) traces.push({ key, frames: tr })
    cur = key
  }
  if (l === 'S18_step03') break
}

fs.writeFileSync(path.join(OUT, 'transition-trace.json'), JSON.stringify({ reducedMotion: reduced, traces }, null, 2))

console.log('REDUCED_MOTION=' + reduced)
console.log('STABLE_STATES=' + Object.keys(stableStates).length + ' -> ' + Object.keys(stableStates).join(','))
console.log('TRACES=' + traces.length + ' -> ' + traces.map(t=>t.key).join(','))
console.log('ERRORS=' + errors.length + (errors.length ? '\n' + errors.join('\n') : ''))
console.log('WARNINGS=' + warnings.length)
await browser.close()


