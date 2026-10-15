import fs from 'node:fs/promises'
import path from 'node:path'
const OUT_DIR = 'C:/Users/thega/Desktop/HomeplusPresentacion01/HomePlus_Presentacion_FINAL/audit/runtime/session-01'
const DATA = path.join(OUT_DIR, 'data')
const fwd = JSON.parse(await fs.readFile(path.join(DATA, 'walk-forward.json'), 'utf8'))
const app = JSON.parse(await fs.readFile(path.join(DATA, 'app-surface-metrics.json'), 'utf8'))
const appBy = new Map(app.map((r) => [r.name, r]))
const back = JSON.parse(await fs.readFile(path.join(DATA, 'walk-back.json'), 'utf8'))
const backBy = new Map(back.states.map((s) => [s.name, s]))
const cls0 = (s) => (s || '').split(/\s+/)[0]
const T = (tf) => (tf ? `\`${tf.replace(/matrix\(|\)/g, '').replace(/,/g, ', ')}\`` : 'identity')

const L = []
L.push('| # | Slide | Step | Screenshot | Phone visual | Phone layout | Phone transform | App surface / screen client | Internal overflow inside app | DOM / hidden | Clipped | Max scale | Visible text (first 6) |')
L.push('|---|---|---|---|---|---|---|---|---|---|---|---|---|')
for (const s of fwd.states) {
  const a = appBy.get(s.name); const pf = s.phone.frame
  L.push('| ' + [s.order, `${s.slideId} ${s.slideAria}`, s.stepIndex, `\`${s.name}.png\``,
    pf ? `${pf.box.w}×${pf.box.h}` : '—', pf ? `${pf.layoutW}×${pf.layoutH}` : '—', T(pf ? pf.transform : null),
    a ? `${cls0(a.appSurfaceCls)} · ${a.screenClient}` : 'no phone on stage',
    a && a.internalOverflow.length ? a.internalOverflow.join('<br>') : 'none',
    `${s.inventoryCount} / ${s.hiddenCount}`, s.clippedVisible.length, s.maxScale,
    s.texts.slice(0, 6).map((t) => t.replace(/\|/g, '/')).join(' · ') || '—',
  ].join(' | ') + ' |')
}
await fs.writeFile(path.join(DATA, 'index-table.md'), L.join('\n'), 'utf8')

// restoration table
const R = []
R.push('| State | Phone bounds identical fwd/back | Visible text identical | Differing elements (same DOM path) | Of those, differing while visible | Element classes involved |')
R.push('|---|---|---|---|---|---|')
let diffStates = 0, visStates = 0
for (const s of fwd.states) {
  const b = backBy.get(s.name)
  const bm = new Map(b.inventory.map((e) => [e.path, e]))
  const classes = new Set(); let diff = 0, vis = 0
  for (const fe of s.inventory) {
    const be = bm.get(fe.path); if (!be) continue
    const moved = Math.abs(fe.box.x - be.box.x) > 0.5 || Math.abs(fe.box.y - be.box.y) > 0.5 || Math.abs(fe.box.w - be.box.w) > 0.5 || Math.abs(fe.box.h - be.box.h) > 0.5
    const tf = fe.transform !== be.transform, vd = fe.visible !== be.visible
    if (moved || tf || vd) { diff++; classes.add(cls0(fe.cls) || fe.tag); if (vd || (fe.visible && (moved || tf))) vis++ }
  }
  if (diff) diffStates++
  if (vis) visStates++
  const phoneEq = JSON.stringify(s.phone.frame?.box) === JSON.stringify(b.phone.frame?.box)
  const textEq = JSON.stringify(s.texts) === JSON.stringify(b.texts)
  if (!diff && phoneEq && textEq) continue
  R.push(`| \`${s.name}\` | ${phoneEq ? 'yes' : 'NO'} | ${textEq ? 'yes' : 'NO'} | ${diff} | ${vis} | ${[...classes].join(', ')} |`)
}
R.push('')
R.push(`**Totals:** states with any difference = ${diffStates}/85 · states with a visible-level difference = ${visStates}/85 · states omitted from this table (fully identical) = ${85 - (R.length - 4)}/85.`)
await fs.writeFile(path.join(DATA, 'restoration-table.md'), R.join('\n'), 'utf8')
console.log('index rows', L.length - 2, '| restoration rows', R.length - 4, '| diffStates', diffStates, 'visStates', visStates)