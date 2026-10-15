import fs from 'node:fs/promises'
import path from 'node:path'
import crypto from 'node:crypto'

const OUT_DIR = 'C:/Users/thega/Desktop/HomeplusPresentacion01/HomePlus_Presentacion_FINAL/audit/runtime/session-01'
const DATA = path.join(OUT_DIR, 'data')
const j = async (f) => JSON.parse(await fs.readFile(path.join(DATA, f), 'utf8'))

const fwd = await j('walk-forward.json')
const back = await j('walk-back.json')
const motion = await j('motion.json')
const viewport = await j('viewport-matrix.json')
const hold = await j('hold.json')

const R2 = (n) => Math.round(n * 100) / 100
const bstr = (b) => (b ? `${R2(b.x)},${R2(b.y)},${R2(b.w)},${R2(b.h)}` : 'none')

/* ---------- 1. restoration ---------- */
const backByName = new Map(back.states.map((s) => [s.name, s]))
const invMap = (s) => {
  const m = new Map()
  for (const e of s.inventory) m.set(e.key, e)
  return m
}
const restoration = []
for (const f of fwd.states) {
  const b = backByName.get(f.name)
  if (!b) { restoration.push({ name: f.name, status: 'NOT_REACHED_BACKWARD' }); continue }
  const fm = invMap(f), bm = invMap(b)
  const moved = [], resized = [], fontChanged = [], visDiff = [], onlyF = [], onlyB = []
  for (const [k, fe] of fm) {
    const be = bm.get(k)
    if (!be) { onlyF.push(k); continue }
    if (fe.visible !== be.visible) visDiff.push({ k, fwd: fe.visible, back: be.visible, fop: fe.opacity, bop: be.opacity })
    const dx = Math.abs(fe.box.x - be.box.x), dy = Math.abs(fe.box.y - be.box.y)
    const dw = Math.abs(fe.box.w - be.box.w), dh = Math.abs(fe.box.h - be.box.h)
    if (dx > 0.5 || dy > 0.5) moved.push({ k, f: [fe.box.x, fe.box.y, fe.box.w, fe.box.h], b: [be.box.x, be.box.y, be.box.w, be.box.h] })
    else if (dw > 0.5 || dh > 0.5) resized.push({ k, f: [fe.box.w, fe.box.h], b: [be.box.w, be.box.h] })
    if (fe.fontSize !== be.fontSize) fontChanged.push({ k, f: fe.fontSize, b: be.fontSize, text: fe.text })
  }
  for (const k of bm.keys()) if (!fm.has(k)) onlyB.push(k)
  const pf = bstr(f.phone.frame?.box), pb = bstr(b.phone.frame?.box)
  const af = bstr(f.phone.appSurface?.box), ab = bstr(b.phone.appSurface?.box)
  const row = {
    name: f.name,
    phoneFwd: pf, phoneBack: pb, phoneEqual: pf === pb,
    appFwd: af, appBack: ab, appEqual: af === ab,
    fwdTexts: f.texts.length, backTexts: b.texts.length, textsEqual: JSON.stringify(f.texts) === JSON.stringify(b.texts),
    movedCount: moved.length, resizedCount: resized.length, fontChangedCount: fontChanged.length,
    visibilityDiffCount: visDiff.length, onlyFwdCount: onlyF.length, onlyBackCount: onlyB.length,
    fwdMaxScale: f.maxScale, backMaxScale: b.maxScale,
    fwdClipped: f.clippedVisible.length, backClipped: b.clippedVisible.length,
    fwdScrollables: f.scrollables.length, backScrollables: b.scrollables.length,
    examples: { moved: moved.slice(0, 5), resized: resized.slice(0, 5), fontChanged: fontChanged.slice(0, 5), visDiff: visDiff.slice(0, 5), onlyF: onlyF.slice(0, 5), onlyB: onlyB.slice(0, 5) },
  }
  restoration.push(row)
}
await fs.writeFile(path.join(DATA, 'restoration.json'), JSON.stringify(restoration, null, 1))

console.log('=== RESTORATION DIFFERENCES ===')
let diffs = 0
for (const r of restoration) {
  const isDiff = !r.phoneEqual || !r.appEqual || !r.textsEqual || r.movedCount > 0 || r.resizedCount > 0 || r.fontChangedCount > 0 || r.visibilityDiffCount > 0 || r.onlyFwdCount > 0 || r.onlyBackCount > 0
  if (isDiff) {
    diffs++
    console.log(`${r.name}: phoneEq=${r.phoneEqual} appEq=${r.appEqual} textsEq=${r.textsEqual} moved=${r.movedCount} resized=${r.resizedCount} font=${r.fontChangedCount} visDiff=${r.visibilityDiffCount} onlyF=${r.onlyFwdCount} onlyB=${r.onlyBackCount} fwdMaxScale=${r.fwdMaxScale} backMaxScale=${r.backMaxScale}`)
    if (r.examples.moved.length) console.log('   moved ex: ' + JSON.stringify(r.examples.moved.slice(0, 3)))
    if (r.examples.resized.length) console.log('   resized ex: ' + JSON.stringify(r.examples.resized.slice(0, 3)))
    if (r.examples.fontChanged.length) console.log('   font ex: ' + JSON.stringify(r.examples.fontChanged.slice(0, 3)))
    if (r.examples.visDiff.length) console.log('   visDiff ex: ' + JSON.stringify(r.examples.visDiff.slice(0, 3)))
    if (r.examples.onlyF.length) console.log('   onlyF: ' + JSON.stringify(r.examples.onlyF))
    if (r.examples.onlyB.length) console.log('   onlyB: ' + JSON.stringify(r.examples.onlyB))
  }
}
console.log(`STATES WITH DIFFERENCES: ${diffs} / ${restoration.length}`)

/* ---------- 2. enlargement / zoom contract ---------- */
const enlargement = []
for (let i = 0; i < fwd.states.length; i++) {
  const s = fwd.states[i]
  const prev = i > 0 ? fwd.states[i - 1] : null
  const pf = s.phone.frame
  const entry = {
    name: s.name,
    order: s.order,
    phonePresent: s.phonePresent,
    phoneVisual: pf ? [pf.box.w, pf.box.h] : null,
    phoneLayout: pf ? [pf.layoutW, pf.layoutH] : null,
    phoneTransform: pf ? pf.transform : null,
    phoneScaleVar: null,
    appSurfaceVisual: s.phone.appSurface ? [s.phone.appSurface.box.w, s.phone.appSurface.box.h] : null,
    appSurfaceLayout: s.phone.appSurface ? [s.phone.appSurface.layoutW, s.phone.appSurface.layoutH] : null,
    appSurfaceClient: s.phone.appSurface ? [s.phone.appSurface.clientW, s.phone.appSurface.clientH] : null,
    appSurfaceScroll: s.phone.appSurface ? [s.phone.appSurface.scrollW, s.phone.appSurface.scrollH] : null,
    screenVisual: s.phone.screen ? [s.phone.screen.box.w, s.phone.screen.box.h] : null,
    screenClient: s.phone.screen ? [s.phone.screen.clientW, s.phone.screen.clientH] : null,
    screenScroll: s.phone.screen ? [s.phone.screen.scrollW, s.phone.screen.scrollH] : null,
    maxElementScale: s.maxScale,
    zoomTarget: s.zoomTarget,
    internalScroll: s.scrollables.filter((x) => /demo-screen|phone|screen|home-|planner|finance|list|content/i.test(x.cls)),
    allScrollables: s.scrollables.length,
    clippedVisible: s.clippedVisible,
    largeFonts: s.largeFonts.slice(0, 12),
    prevName: prev ? prev.name : null,
    phoneChangedFromPrev: prev ? (bstr(prev.phone.frame?.box) !== bstr(s.phone.frame?.box)) : null,
    fontSizeHistogram: null,
  }
  // font sizes of visible text nodes grouped
  const fsizes = {}
  for (const e of s.inventory) if (e.visible && e.text && e.text.length >= 2) fsizes[e.fontSize] = (fsizes[e.fontSize] || 0) + 1
  entry.fontSizeHistogram = fsizes
  enlargement.push(entry)
}
await fs.writeFile(path.join(DATA, 'enlargement.json'), JSON.stringify(enlargement, null, 1))

console.log('\n=== PHONE SCALE PER STATE ===')
let last = null
for (const e of enlargement) {
  const sig = `${e.phonePresent ? e.phoneVisual.join('x') : 'none'}|L${e.phoneLayout}|T${e.phoneTransform}`
  if (sig !== last) { console.log(`${e.name}: visual=${e.phoneVisual} layout=${e.phoneLayout} client=${e.appSurfaceClient} transform=${e.phoneTransform} maxElScale=${e.maxElementScale}`); last = sig }
}

console.log('\n=== INTERNAL SCROLL INSIDE APP SURFACE ===')
for (const e of enlargement) {
  const inner = e.internalScroll.filter((x) => (x.overflowYActual > 1 || x.overflowXActual > 1))
  if (inner.length) console.log(`${e.name}: ` + JSON.stringify(inner.map((x) => ({ c: x.cls, oy: x.overflowYActual, ox: x.overflowXActual, cw: x.clientW, ch: x.clientH, sw: x.scrollW, sh: x.scrollH }))))
}

console.log('\n=== CLIPPED (visible, exceeding canvas) ===')
for (const e of enlargement) {
  if (e.clippedVisible.length) console.log(`${e.name}: ` + JSON.stringify(e.clippedVisible.slice(0, 4)))
}

/* ---------- 3. motion summary ---------- */
const motionRows = []
for (const t of motion.transitions) {
  const first = t.samples[0], lastF = t.samples[t.samples.length - 1]
  const keyMap = (s) => new Map(s.anim.map((a) => [a.k, a]))
  const f0 = keyMap(first)
  const animating = new Set()
  for (const s of t.samples) {
    for (const a of s.anim) {
      const a0 = f0.get(a.k)
      if (!a0) continue
      if (a0.op !== a.op || a0.tf !== a.tf) animating.add(a.k)
    }
  }
  const geomChanged = []
  const containerDelta = {}
  for (const cn of Object.keys(first.containers)) {
    const a = first.containers[cn], b = lastF.containers[cn]
    if (!a || !b) { containerDelta[cn] = a && b ? 'one-missing' : 'absent'; continue }
    const same = JSON.stringify(a) === JSON.stringify(b)
    if (!same) containerDelta[cn] = { from: a, to: b }
  }
  const baseKeys = new Set(first.keys)
  const midKeys = new Set(t.samples[Math.min(2, t.samples.length - 1)].keys)
  const endKeys = new Set(lastF.keys)
  const entering = [...midKeys].filter((k) => !baseKeys.has(k)).slice(0, 20)
  const exiting = [...baseKeys].filter((k) => !midKeys.has(k)).slice(0, 20)
  const layoutChanged = []
  for (const k of animating) {
    const a = f0.get(k)
    for (const s of t.samples) {
      const b = s.anim.find((x) => x.k === k)
      if (b && (a.cw !== b.cw || a.ch !== b.ch || a.sw !== b.sw || a.sh !== b.sh)) {
        layoutChanged.push({ k, from: [a.cw, a.ch, a.sw, a.sh], to: [b.cw, b.ch, b.sw, b.sh] })
        break
      }
    }
  }
  const frames = t.samples.map((s) => ({
    ms: s.ms,
    runningAnim: s.animCount,
    canvas: s.containers.canvas,
    phoneFrame: s.containers.phoneFrame,
    appSurface: s.containers.appSurface,
    doc: s.doc,
    opacitySamples: s.anim.filter((a) => Number(a.op) < 1).slice(0, 6).map((a) => ({ k: a.k.slice(0, 60), op: a.op, tf: a.tf.slice(0, 46), b: a.b })),
    transformSamples: s.anim.filter((a) => a.tf !== 'none').slice(0, 6).map((a) => ({ k: a.k.slice(0, 60), tf: a.tf.slice(0, 46), b: a.b })),
  }))
  motionRows.push({
    label: t.label,
    from: `${t.from.id}_step${String(t.from.stp).padStart(2, '0')}`,
    to: `${t.to.id}_step${String(t.to.stp).padStart(2, '0')}`,
    animatingElementCount: animating.size,
    animatingSample: [...animating].slice(0, 8).map((k) => k.slice(0, 70)),
    entering, exiting,
    layoutChanged,
    containerDelta,
    frames,
  })
}
await fs.writeFile(path.join(DATA, 'motion-summary.json'), JSON.stringify(motionRows, null, 1))

console.log('\n=== MOTION: transitions that changed layout/scroll of animated elements ===')
let layoutMotion = 0
for (const m of motionRows) {
  if (m.layoutChanged.length || Object.keys(m.containerDelta).length) {
    layoutMotion++
    console.log(`${m.label}: animating=${m.animatingElementCount} layoutChanged=${JSON.stringify(m.layoutChanged.slice(0, 4))} containerDelta=${JSON.stringify(Object.keys(m.containerDelta))}`)
  }
}
console.log(`TRANSITIONS WITH ANY CONTAINER/LIST GEOMETRY DELTA: ${layoutMotion} / ${motionRows.length}`)

console.log('\n=== MOTION: sample of representative transitions ===')
for (const lbl of ['S01_step00 -> S01_step01', 'S01_step10 -> S02_step00', 'S03_step00 -> S04_step00', 'S09_step04 -> S10_step00', 'S14_step04 -> S15_step00', 'S17_step03 -> S18_step00']) {
  const m = motionRows.find((x) => x.label === lbl)
  if (!m) continue
  console.log(`\n${lbl}  animating=${m.animatingElementCount} entering=${m.entering.length} exiting=${m.exiting.length}`)
  for (const f of m.frames) console.log(`   t=${f.ms}ms running=${f.runningAnim} phone=${JSON.stringify(f.phoneFrame?.b)} app=${JSON.stringify(f.appSurface?.b)} op=[${f.opacitySamples.map((o) => `${o.op}`).join('|')}]`)
}

/* ---------- 4. viewport summary ---------- */
console.log('\n=== VIEWPORT MATRIX SUMMARY ===')
for (const [size, rows] of Object.entries(viewport.all)) {
  const scales = [...new Set(rows.map((r) => r.canvasTransform))]
  const cbox = [...new Set(rows.map((r) => `${r.canvasBox.w}x${r.canvasBox.h}@${r.canvasBox.x},${r.canvasBox.y}`))]
  const pw = [...new Set(rows.filter((r) => r.phoneBox).map((r) => r.phoneBox.w))]
  const pl = [...new Set(rows.filter((r) => r.phoneLayout).map((r) => `${r.phoneLayout.ow}x${r.phoneLayout.oh}`))]
  const minF = [...new Set(rows.map((r) => r.minFont))].sort((a, b) => a - b)
  const out = [...new Set(rows.map((r) => r.outsideCanvas))]
  const ovf = rows.reduce((a, r) => a + r.overflowCount, 0)
  const docBad = rows.filter((r) => r.doc.sw > r.doc.cw || r.doc.sh > r.doc.ch).length
  console.log(`${size}: scale=${JSON.stringify(scales)} canvasBox=${JSON.stringify(cbox)} phoneVisualW=${JSON.stringify(pw)} phoneLayout=${JSON.stringify(pl)} minLogicalFont=${JSON.stringify(minF)} outsideCanvas=${JSON.stringify(out)} docOverflowStates=${docBad} totalInternalOverflowNodes=${ovf}`)
}

/* ---------- 5. hold ---------- */
console.log('\n=== HOLD ===')
for (const h of hold.results) console.log(`${h.label} ${h.actual}: htmlStable=${h.htmlStable} geomStable=${h.geomStable} docStable=${h.docStable} running=${JSON.stringify(h.runningAnimations)}`)

console.log('\n=== ERRORS ===')
console.log(`forward=${fwd.errors.length} back=${back.errors.length} motion=${motion.errors.length} viewport=${viewport.errors.length} hold=${hold.errors.length}`)
for (const e of [...fwd.errors, ...back.errors, ...motion.errors, ...viewport.errors, ...hold.errors].slice(0, 20)) console.log('  ' + JSON.stringify(e))
console.log(`WARNINGS forward=${fwd.warnings.length}`)
for (const w of fwd.warnings.slice(0, 10)) console.log('  ' + JSON.stringify(w))