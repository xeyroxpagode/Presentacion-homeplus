import fs from 'node:fs/promises'
import path from 'node:path'

const OUT_DIR = 'C:/Users/thega/Desktop/HomeplusPresentacion01/HomePlus_Presentacion_FINAL/audit/runtime/session-01'
const DATA = path.join(OUT_DIR, 'data')
const j = async (f) => JSON.parse(await fs.readFile(path.join(DATA, f), 'utf8'))
const fwd = await j('walk-forward.json')
const back = await j('walk-back.json')
const motion = await j('motion.json')

const R2 = (n) => Math.round(n * 100) / 100
const bstr = (b) => (b ? `${R2(b.x)},${R2(b.y)},${R2(b.w)},${R2(b.h)}` : 'none')

/* ---------- restoration, DOM-path keyed ---------- */
const backByName = new Map(back.states.map((s) => [s.name, s]))
const byPath = (s) => { const m = new Map(); for (const e of s.inventory) m.set(e.path, e); return m }
const restoration = []
for (const f of fwd.states) {
  const b = backByName.get(f.name)
  if (!b) { restoration.push({ name: f.name, status: 'NOT_REACHED_BACKWARD' }); continue }
  const fm = byPath(f), bm = byPath(b)
  const moved = [], resized = [], fontChanged = [], visDiff = [], onlyF = [], onlyB = []
  for (const [p, fe] of fm) {
    const be = bm.get(p)
    if (!be) { onlyF.push({ path: p, cls: fe.cls.slice(0, 70), text: fe.text }); continue }
    if (fe.visible !== be.visible) visDiff.push({ path: p, cls: fe.cls.slice(0, 70), text: fe.text, fwdVisible: fe.visible, backVisible: be.visible, fwdOpacity: fe.opacity, backOpacity: be.opacity })
    const dx = Math.abs(fe.box.x - be.box.x), dy = Math.abs(fe.box.y - be.box.y)
    const dw = Math.abs(fe.box.w - be.box.w), dh = Math.abs(fe.box.h - be.box.h)
    if (dx > 0.5 || dy > 0.5) moved.push({ path: p, cls: fe.cls.slice(0, 70), text: fe.text, fwd: [fe.box.x, fe.box.y, fe.box.w, fe.box.h], back: [be.box.x, be.box.y, be.box.w, be.box.h] })
    else if (dw > 0.5 || dh > 0.5) resized.push({ path: p, cls: fe.cls.slice(0, 70), text: fe.text, fwd: [fe.box.w, fe.box.h], back: [be.box.w, be.box.h] })
    if (fe.fontSize !== be.fontSize) fontChanged.push({ path: p, cls: fe.cls.slice(0, 60), text: fe.text, fwd: fe.fontSize, back: be.fontSize })
    if (fe.transform !== be.transform) visDiff.push({ path: p, cls: fe.cls.slice(0, 60), note: 'transform-differs', fwd: fe.transform, back: be.transform })
  }
  for (const [p, be] of bm) if (!fm.has(p)) onlyB.push({ path: p, cls: be.cls.slice(0, 70), text: be.text })
  const pf = bstr(f.phone.frame?.box), pb = bstr(b.phone.frame?.box)
  const sf = bstr(f.phone.screen?.box), sb = bstr(b.phone.screen?.box)
  const af = bstr(f.phone.appSurface?.box), ab = bstr(b.phone.appSurface?.box)
  restoration.push({
    name: f.name,
    phoneFwd: pf, phoneBack: pb, phoneEqual: pf === pb,
    screenEqual: sf === sb, appEqual: af === ab,
    textsEqual: JSON.stringify(f.texts) === JSON.stringify(b.texts),
    fwdTextCount: f.texts.length, backTextCount: b.texts.length,
    movedCount: moved.length, resizedCount: resized.length, fontChangedCount: fontChanged.length,
    visibilityDiffCount: visDiff.length, onlyFwdCount: onlyF.length, onlyBackCount: onlyB.length,
    fwdMaxScale: f.maxScale, backMaxScale: b.maxScale,
    fwdClippedVisible: f.clippedVisible.length, backClippedVisible: b.clippedVisible.length,
    fwdHiddenLayers: f.hiddenCount, backHiddenLayers: b.hiddenCount,
    fwdScrollables: f.scrollables.length, backScrollables: b.scrollables.length,
    fwdInventory: f.inventoryCount, backInventory: b.inventoryCount,
    examples: { moved: moved.slice(0, 6), resized: resized.slice(0, 6), fontChanged: fontChanged.slice(0, 6), visDiff: visDiff.slice(0, 6), onlyF: onlyF.slice(0, 6), onlyB: onlyB.slice(0, 6) },
  })
}
await fs.writeFile(path.join(DATA, 'restoration.json'), JSON.stringify(restoration, null, 1))

console.log('=== RESTORATION DIFFERENCES (DOM-path keyed) ===')
let diffs = 0
for (const r of restoration) {
  const isDiff = !r.phoneEqual || !r.screenEqual || !r.appEqual || !r.textsEqual || r.movedCount || r.resizedCount || r.fontChangedCount || r.visibilityDiffCount || r.onlyFwdCount || r.onlyBackCount || r.fwdMaxScale !== r.backMaxScale || r.fwdHiddenLayers !== r.backHiddenLayers || r.fwdInventory !== r.backInventory
  if (isDiff) {
    diffs++
    console.log(`${r.name}: phone=${r.phoneEqual} screen=${r.screenEqual} app=${r.appEqual} texts=${r.textsEqual}(${r.fwdTextCount}/${r.backTextCount}) moved=${r.movedCount} resized=${r.resizedCount} font=${r.fontChangedCount} visDiff=${r.visibilityDiffCount} onlyF=${r.onlyFwdCount} onlyB=${r.onlyBackCount} scale=${r.fwdMaxScale}/${r.backMaxScale} hidden=${r.fwdHiddenLayers}/${r.backHiddenLayers} inv=${r.fwdInventory}/${r.backInventory} clipped=${r.fwdClippedVisible}/${r.backClippedVisible} scrollables=${r.fwdScrollables}/${r.backScrollables}`)
    for (const k of ['moved', 'resized', 'fontChanged', 'visDiff', 'onlyF', 'onlyB']) {
      if (r.examples[k].length) console.log(`   ${k}: ` + JSON.stringify(r.examples[k].slice(0, 4)))
    }
  }
}
console.log(`STATES WITH DIFFERENCES: ${diffs} / ${restoration.length}`)

/* ---------- motion, path-keyed ---------- */
const motionRows = []
for (const t of motion.transitions) {
  const first = t.samples[0], mid = t.samples[Math.min(2, t.samples.length - 1)], lastF = t.samples[t.samples.length - 1]
  const mapOf = (s) => new Map(s.anim.map((a) => [a.k, a]))
  const f0 = mapOf(first)
  const animating = new Set()
  for (const s of t.samples) for (const a of s.anim) {
    const a0 = f0.get(a.k)
    if (a0 && (a0.op !== a.op || a0.tf !== a.tf)) animating.add(a.k)
  }
  const layoutChanged = []
  for (const k of animating) {
    const a = f0.get(k)
    for (const s of t.samples) {
      const b = s.anim.find((x) => x.k === k)
      if (b && (a.cw !== b.cw || a.ch !== b.ch || a.sw !== b.sw || a.sh !== b.sh)) {
        layoutChanged.push({ k: k.slice(0, 110), from: { cw: a.cw, ch: a.ch, sw: a.sw, sh: a.sh }, to: { cw: b.cw, ch: b.ch, sw: b.sw, sh: b.sh } })
        break
      }
    }
  }
  const containerDelta = {}
  for (const cn of Object.keys(first.containers)) {
    const a = first.containers[cn], b = lastF.containers[cn]
    if (!a && !b) continue
    if (!a || !b) { containerDelta[cn] = a ? 'absent-at-end' : 'absent-at-start'; continue }
    if (JSON.stringify(a) !== JSON.stringify(b)) containerDelta[cn] = { from: a, to: b }
  }
  const baseKeys = new Set(first.keys), midKeys = new Set(mid.keys), endKeys = new Set(lastF.keys)
  motionRows.push({
    label: t.label,
    animatingElementCount: animating.size,
    animatingSample: [...animating].slice(0, 10),
    enteringCount: [...midKeys].filter((k) => !baseKeys.has(k)).length,
    exitingCount: [...baseKeys].filter((k) => !midKeys.has(k)).length,
    enteringSample: [...midKeys].filter((k) => !baseKeys.has(k)).slice(0, 8),
    exitingSample: [...baseKeys].filter((k) => !midKeys.has(k)).slice(0, 8),
    layoutChanged,
    containerDeltaKeys: Object.keys(containerDelta),
    containerDelta,
    frames: t.samples.map((s) => ({
      ms: s.ms,
      runningAnimations: s.animCount,
      canvas: s.containers.canvas,
      phoneSlot: s.containers.phoneSlot,
      phoneFrame: s.containers.phoneFrame,
      phoneScreen: s.containers.phoneScreen,
      appSurface: s.containers.appSurface,
      doc: s.doc,
      midOpacity: s.anim.filter((a) => Number(a.op) > 0.001 && Number(a.op) < 1).slice(0, 8).map((a) => ({ k: a.k.slice(0, 90), op: R2(a.op * 1000) / 1000, tf: a.tf.slice(0, 60), b: a.b })),
      transformed: s.anim.filter((a) => a.tf !== 'none').slice(0, 8).map((a) => ({ k: a.k.slice(0, 90), tf: a.tf.slice(0, 60), b: a.b })),
    })),
  })
}
await fs.writeFile(path.join(DATA, 'motion-summary.json'), JSON.stringify(motionRows, null, 1))

console.log('\n=== MOTION: layout/scroll mutation of animating elements ===')
let layoutMotion = 0
for (const m of motionRows) {
  if (m.layoutChanged.length) {
    layoutMotion++
    console.log(`${m.label}: ` + JSON.stringify(m.layoutChanged.slice(0, 3)))
  }
}
console.log(`TRANSITIONS WHERE AN ANIMATING ELEMENT CHANGED clientWidth/clientHeight/scrollWidth/scrollHeight: ${layoutMotion} / ${motionRows.length}`)

console.log('\n=== MOTION: container geometry deltas (phone/app surface) ===')
let containerMotion = 0
for (const m of motionRows) {
  const keys = m.containerDeltaKeys.filter((k) => k.startsWith('phone') || k === 'appSurface')
  if (keys.length) {
    containerMotion++
    console.log(`${m.label}: ${JSON.stringify(keys)} ` + JSON.stringify(m.containerDelta).slice(0, 300))
  }
}
console.log(`TRANSITIONS WHERE PHONE/APP CONTAINERS CHANGED GEOMETRY (or appeared/disappeared): ${containerMotion} / ${motionRows.length}`)

console.log('\n=== MOTION: canvas/scene deltas ===')
for (const m of motionRows) {
  const keys = m.containerDeltaKeys.filter((k) => k === 'canvas' || k === 'scene')
  if (keys.length) console.log(`${m.label}: ${JSON.stringify(keys)} ` + JSON.stringify(m.containerDelta).slice(0, 260))
}

console.log('\n=== MOTION: entering/exiting counts ===')
for (const m of motionRows) console.log(`${m.label}: animating=${m.animatingElementCount} entering=${m.enteringCount} exiting=${m.exitingCount}`)