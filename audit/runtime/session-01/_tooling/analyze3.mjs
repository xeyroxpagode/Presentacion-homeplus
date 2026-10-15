import fs from 'node:fs/promises'
import path from 'node:path'

const OUT_DIR = 'C:/Users/thega/Desktop/HomeplusPresentacion01/HomePlus_Presentacion_FINAL/audit/runtime/session-01'
const DATA = path.join(OUT_DIR, 'data')
const j = async (f) => JSON.parse(await fs.readFile(path.join(DATA, f), 'utf8'))
const fwd = await j('walk-forward.json')
const back = await j('walk-back.json')

/* ---- 1. restoration: are all differences inside non-visible layers? ---- */
const backByName = new Map(back.states.map((s) => [s.name, s]))
const rows = []
let anyVisibleDiff = 0
const classesSeen = new Map()
for (const f of fwd.states) {
  const b = backByName.get(f.name)
  if (!b) continue
  const bm = new Map(b.inventory.map((e) => [e.path, e]))
  let diff = 0, visibleDiff = 0
  const sample = []
  for (const fe of f.inventory) {
    const be = bm.get(fe.path)
    if (!be) continue
    const moved = Math.abs(fe.box.x - be.box.x) > 0.5 || Math.abs(fe.box.y - be.box.y) > 0.5 || Math.abs(fe.box.w - be.box.w) > 0.5 || Math.abs(fe.box.h - be.box.h) > 0.5
    const tfDiff = fe.transform !== be.transform
    const visDiff = fe.visible !== be.visible
    const fontDiff = fe.fontSize !== be.fontSize
    if (moved || tfDiff || visDiff || fontDiff) {
      diff++
      const cls0 = fe.cls.split(/\s+/)[0] || fe.tag
      classesSeen.set(cls0, (classesSeen.get(cls0) || 0) + 1)
      if (visDiff || (fe.visible && (moved || tfDiff))) {
        visibleDiff++
        if (sample.length < 5) sample.push({ cls: fe.cls.slice(0, 60), fwdVisible: fe.visible, backVisible: be.visible, fwdBox: fe.box, backBox: be.box, fwdTf: fe.transform, backTf: be.transform })
      }
    }
  }
  if (visibleDiff) { anyVisibleDiff++; console.log(`VISIBLE-LEVEL DIFF ${f.name}: ${visibleDiff} :: ${JSON.stringify(sample)}`) }
  rows.push({ name: f.name, totalDiff: diff, visibleLevelDiff: visibleDiff, phoneEqual: JSON.stringify(f.phone.frame?.box) === JSON.stringify(b.phone.frame?.box), textsEqual: JSON.stringify(f.texts) === JSON.stringify(b.texts) })
}
console.log(`\nSTATES WITH ANY FORWARD/BACK DIFFERENCE: ${rows.filter((r) => r.totalDiff > 0).length} / ${rows.length}`)
console.log(`STATES WITH VISIBLE-LEVEL DIFFERENCE: ${anyVisibleDiff} / ${rows.length}`)
console.log(`PHONE BOUNDS DIFFER: ${rows.filter((r) => !r.phoneEqual).length}`)
console.log(`VISIBLE TEXT SET DIFFERS: ${rows.filter((r) => !r.textsEqual).length}`)
console.log('CLASSES INVOLVED IN DIFFERENCES (count of differing element instances):')
console.log('  ' + [...classesSeen.entries()].sort((a, b) => b[1] - a[1]).map(([k, v]) => `${k}=${v}`).join(', '))

/* ---- 2. typography inside the app surface per state ---- */
console.log('\n=== TYPOGRAPHY INSIDE APP SURFACE (logical px, canvas scale 1.0) ===')
for (const s of fwd.states) {
  const surfPath = s.inventory.find((e) => e.cls.includes('phone-frame-screen')) ? s.inventory.find((e) => e.cls.includes('phone-frame-screen')).path + '/0' : null
  const kids = surfPath ? s.inventory.filter((e) => e.path.startsWith(surfPath)) : []
  const withText = kids.filter((e) => e.visible && e.text && e.text.length >= 2)
  const sizes = {}
  for (const e of withText) sizes[e.fontSize] = (sizes[e.fontSize] || 0) + 1
  const sorted = Object.keys(sizes).map(Number).sort((a, b) => a - b)
  console.log(`${s.name}: ${withText.length} visible text nodes, fontSizes=[${sorted.join(',')}]  screenClient=${s.phone.screen ? s.phone.screen.clientW + 'x' + s.phone.screen.clientH : 'n/a'}`)
}

/* ---- 3. per-state index rows ---- */
const NAMES = {}
for (const s of fwd.states) NAMES[s.slideId] = s.slideAria
const idx = []
for (const s of fwd.states) {
  const visTexts = s.texts.slice(0, 8)
  const layer = s.inventory.filter((e) => e.visible && e.depth !== undefined)
  idx.push({
    order: s.order,
    name: s.name,
    slide: s.slideId,
    slideName: NAMES[s.slideId],
    shot: s.shot,
    phone: s.phone.frame ? `${s.phone.frame.box.w}x${s.phone.frame.box.h} @${s.phone.frame.box.x},${s.phone.frame.box.y} (layout ${s.phone.frame.layoutW}x${s.phone.frame.layoutH})` : 'none',
    screen: s.phone.screen ? `${s.phone.screen.clientW}x${s.phone.screen.clientH} scroll ${s.phone.screen.scrollW}x${s.phone.screen.scrollH}` : 'none',
    appSurface: s.phone.appSurface ? `${s.phone.appSurface.cls.split(/\s+/)[0]} ${s.phone.appSurface.clientW}x${s.phone.appSurface.clientH} scroll ${s.phone.appSurface.scrollW}x${s.phone.appSurface.scrollH}` : 'none',
    module: s.moduleGuess ? s.moduleGuess.cls.slice(0, 70) : 'none',
    domNodes: s.inventoryCount,
    hiddenNodes: s.hiddenCount,
    scrollables: s.scrollables.length,
    clippedVisible: s.clippedVisible.length,
    maxScale: s.maxScale,
    docScroll: `${s.browser.docScrollW}x${s.browser.docScrollH} / client ${s.browser.docClientW}x${s.browser.docClientH}`,
    canvasScroll: `${s.canvas.scrollW}x${s.canvas.scrollH} / client ${s.canvas.clientW}x${s.canvas.clientH}`,
    texts: visTexts,
    textCount: s.texts.length,
  })
}
await fs.writeFile(path.join(DATA, 'state-index.json'), JSON.stringify(idx, null, 1))

console.log('\n=== PER-STATE INDEX (compact) ===')
for (const r of idx) {
  console.log(`${String(r.order).padStart(2)} ${r.name} | phone=${r.phone} | screen=${r.screen} | app=${r.appSurface} | mod=${r.module} | dom=${r.domNodes} hidden=${r.hiddenNodes} scroll=${r.scrollables} clip=${r.clippedVisible} maxScale=${r.maxScale} | canvas ${r.canvasScroll} | doc ${r.docScroll}`)
}

/* ---- 4. slide names ---- */
console.log('\n=== SLIDE NAMES (aria-label) ===')
for (const [k, v] of Object.entries(NAMES)) console.log(`${k} = ${v}`)

/* ---- 5. text inventory per state (for script beat map) ---- */
const textIndex = fwd.states.map((s) => ({ name: s.name, texts: s.texts }))
await fs.writeFile(path.join(DATA, 'text-index.json'), JSON.stringify(textIndex, null, 1))
console.log('\ntext-index.json written')