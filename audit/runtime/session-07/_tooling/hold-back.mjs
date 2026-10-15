// Session 7 — stable-state invariant (0 / 10 s / 30 s holds) and backward-navigation
// restoration contract, with class-level diff. READ-ONLY.
import { chromium, CHROMIUM_EXE, URL_BASE } from './pw.mjs'
import { PROBE, FINGERPRINT } from './probe.mjs'
import fs from 'node:fs'
import path from 'node:path'

const OUT_DIR =
  'C:/Users/thega/Desktop/HomeplusPresentacion01/HomePlus_Presentacion_FINAL/audit/runtime/session-07'
const DATA = path.join(OUT_DIR, 'data')
fs.mkdirSync(DATA, { recursive: true })

const counts = { S01: 11, S02: 7, S03: 1, S04: 6, S05: 4, S06: 6, S07: 2, S08: 5, S09: 5, S10: 5,
                 S11: 3, S12: 3, S13: 4, S14: 5, S15: 5, S16: 5, S17: 4, S18: 4 }
const ORDER = []
for (const [k, c] of Object.entries(counts))
  for (let i = 0; i < c; i++) ORDER.push(`${k}_step${String(i).padStart(2, '0')}`)
const IDX = new Map(ORDER.map((s, i) => [s, i]))

const stateId = (p) => `S${String(p.slideIndex + 1).padStart(2, '0')}_step${String(p.stepIndex).padStart(2, '0')}`
const settle = async (page) => {
  await page.waitForFunction(() => document.getAnimations().every((a) => a.playState !== 'running'),
    null, { timeout: 12000 })
  await page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))))
}
const HASHFN = `(s) => { let h=0x811c9dc5; for (let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,0x01000193)>>>0;} return h.toString(16).padStart(8,'0'); }`

const browser = await chromium.launch({ executablePath: CHROMIUM_EXE, headless: true })
const ctx = await browser.newContext({ viewport: { width: 1280, height: 720 } })
const page = await ctx.newPage()

const gotoState = async (target) => {
  await page.goto(URL_BASE, { waitUntil: 'networkidle' })
  await page.waitForSelector('.presentation-canvas', { timeout: 20000 })
  await settle(page)
  const want = IDX.get(target)
  for (let i = 0; i < want; i++) {
    await page.keyboard.press('ArrowRight')
    await page.waitForTimeout(15)
  }
  await settle(page)
  return stateId(await page.evaluate(`(${PROBE})()`))
}

// =============== HOLD TESTS ===============
const HOLD_TARGETS = ['S01_step00', 'S01_step10', 'S04_step03', 'S05_step02', 'S06_step03',
                      'S08_step01', 'S09_step04', 'S10_step04', 'S14_step04', 'S16_step04',
                      'S17_step03', 'S18_step03']
const holds = []
for (const target of HOLD_TARGETS) {
  const got = await gotoState(target)
  if (got !== target) { holds.push({ target, reached: got, error: 'navigation mismatch' }); continue }
  const samples = []
  let prevT = 0
  for (const t of [0, 10000, 30000]) {
    if (t > prevT) await page.waitForTimeout(t - prevT)
    prevT = t
    const fp = await page.evaluate(`(${FINGERPRINT})()`)
    samples.push({
      t,
      geomHash: await page.evaluate(HASHFN, fp.hash),
      textHash: await page.evaluate(HASHFN, fp.text),
      elements: fp.n,
      running: await page.evaluate(() => document.getAnimations().filter((a) => a.playState === 'running').length),
      total: await page.evaluate(() => document.getAnimations().length),
      doc: fp.doc,
      playStates: await page.evaluate(() => document.getAnimations().map((a) => a.playState).join(',')),
      textLen: fp.text.length
    })
  }
  holds.push({ target, samples })
}

// =============== FORWARD + BACKWARD ===============
await page.goto(URL_BASE, { waitUntil: 'networkidle' })
await settle(page)
const fwd = []
for (let i = 0; i < 85; i++) {
  fwd.push({ probe: await page.evaluate(`(${PROBE})()`), fp: await page.evaluate(`(${FINGERPRINT})()`) })
  await page.keyboard.press('ArrowRight')
  await settle(page)
}
const back = []
for (let g = 0; g < 90; g++) {
  const p = await page.evaluate(`(${PROBE})()`)
  const fp = await page.evaluate(`(${FINGERPRINT})()`)
  back.push({ probe: p, fp })
  await page.keyboard.press('ArrowLeft')
  await settle(page)
  const now = await page.evaluate(`(${PROBE})()`)
  if (stateId(now) === stateId(p)) break
}

const CLASSES = `(s) => s.split('|').slice(0,2).join('|')`
const restoration = []
const bmap = new Map()
back.forEach((b) => bmap.set(stateId(b.probe), b))
fwd.forEach((f, i) => {
  const id = stateId(f.probe)
  const b = bmap.get(id)
  if (!b) { restoration.push({ state: id, presentBackward: false }); return }
  const A = f.fp.hash.split('#'), B = b.fp.hash.split('#')
  const differing = []
  const desc = (s) => {
    const p = (s || '?').split('|')
    return `${p[1]} @${p[3]},${p[4]} ${p[5]}x${p[6]} op=${p[7]} tr=${p[8]} fs=${p[9]} cw=${p[11]}x${p[12]} sw=${p[13]}x${p[14]}`
  }
  for (let k = 0; k < Math.max(A.length, B.length); k++) {
    if (A[k] !== B[k]) differing.push(desc(A[k]) + '  ||  ' + desc(B[k]))
  }
  restoration.push({
    state: id,
    identicalSnapshot: f.fp.hash === b.fp.hash,
    identicalText: f.fp.text === b.fp.text,
    elementCountFwd: A.length, elementCountBack: B.length,
    differingCount: differing.length,
    differingClasses: [...new Set(differing.map((d) => d.split(' :: ')[0]))].slice(0, 20),
    differingSample: differing.slice(0, 6),
    docScroll: [f.fp.doc, b.fp.doc],
    runningFwd: f.probe.animations.running, runningBack: b.probe.animations.running,
    animsFwd: f.probe.animations.total, animsBack: b.probe.animations.total,
    playStatesFwd: f.fp.anims, playStatesBack: b.fp.anims,
    deviceFwd: JSON.stringify(f.probe.devices), deviceBack: JSON.stringify(b.probe.devices),
    overflowSame: JSON.stringify(f.probe.overflow) === JSON.stringify(b.probe.overflow),
    maxScaleFwd: f.probe.maxScale, maxScaleBack: b.probe.maxScale
  })
})

fs.writeFileSync(path.join(DATA, 'hold-and-back.json'),
  JSON.stringify({ holds, backCount: back.length, restoration }, null, 1))

console.log('BACKWARD STATES      :', back.length)
console.log('IDENTICAL SNAPSHOT   :', restoration.filter((r) => r.identicalSnapshot).length, '/ 85')
console.log('IDENTICAL TEXT       :', restoration.filter((r) => r.identicalText).length, '/ 85')
console.log('DEVICE IDENTICAL     :', restoration.filter((r) => r.deviceFwd === r.deviceBack).length, '/ 85')
console.log('OVERFLOW IDENTICAL   :', restoration.filter((r) => r.overflowSame).length, '/ 85')
console.log('RUNNING ANIMS (settled, both directions):',
  Math.max(...restoration.map((r) => Math.max(r.runningFwd, r.runningBack))))
const diffs = restoration.filter((r) => !r.identicalSnapshot)
console.log('DIFFERING STATES     :', diffs.length, diffs.map((r) => r.state).join(', '))
const allCls = new Set()
diffs.forEach((r) => r.differingClasses.forEach((c) => allCls.add(c)))
console.log('DIFFERING CLASSES    :', [...allCls].join(' | '))
console.log('--- HOLDS (0 s / 10 s / 30 s) ---')
for (const h of holds) {
  if (h.error) { console.log(h.target, 'ERROR', h.error, 'reached', h.reached); continue }
  console.log(h.target.padEnd(13),
    'geomStable=', new Set(h.samples.map((s) => s.geomHash)).size === 1,
    'textStable=', new Set(h.samples.map((s) => s.textHash)).size === 1,
    'running=', h.samples.map((s) => s.running).join(','),
    'total=', h.samples.map((s) => s.total).join(','),
    'playStates=', h.samples.map((s) => s.playStates).join(' / '))
}
await browser.close()