// Session 7 — attention / exposure census per stable state (85 rows).
import fs from 'node:fs'
import path from 'node:path'

const OUT_DIR =
  'C:/Users/thega/Desktop/HomeplusPresentacion01/HomePlus_Presentacion_FINAL/audit/runtime/session-07'
const DATA = path.join(OUT_DIR, 'data')
const { states } = JSON.parse(fs.readFileSync(path.join(DATA, 'walk-states.json'), 'utf8'))

const id = (p) => `S${String(p.slideIndex + 1).padStart(2, '0')}_step${String(p.stepIndex).padStart(2, '0')}`

const rows = states.map((p) => {
  const stage = (p.stageType || []).filter((t) => t.text.length)
  const app = (p.appType || []).filter((t) => t.text.length)
  const dev = p.devices.length ? p.devices[0] : null
  return {
    state: id(p),
    scene: id(p).slice(0, 3),
    step: Number(id(p).slice(8)),
    slideName: p.slideName,
    deviceCount: p.deviceCount,
    deviceScale: dev ? dev.scale : null,
    devicePos: dev ? `${dev.slotBox.x},${dev.slotBox.y}` : null,
    deviceSize: dev ? `${dev.frameBox.w}x${dev.frameBox.h}` : null,
    appSurface: p.app ? `${p.app.clientW}x${p.app.clientH}` : (p.screen ? `${p.screen.clientW}x${p.screen.clientH}` : null),
    appScroll: p.app ? `${p.app.scrollW}x${p.app.scrollH}` : null,
    canvasScroll: p.canvas ? `${p.canvas.scrollW}x${p.canvas.scrollH}` : null,
    maxScale: p.maxScale, maxScaleCls: p.maxScaleCls,
    counts: p.counts,
    running: p.animations.running,
    animsSettled: p.animations.total,
    glows: (p.glows || []).map((g) => `${g.cls}@${g.opacity}`).join(' | '),
    primary: stage[0] ? `${stage[0].fontSize}px "${stage[0].text.slice(0, 40)}" op=${stage[0].opacity}` : 'none',
    secondaryStage: stage[1] ? `${stage[1].fontSize}px "${stage[1].text.slice(0, 36)}" op=${stage[1].opacity}` : 'none',
    tertiaryStage: stage[2] ? `${stage[2].fontSize}px "${stage[2].text.slice(0, 36)}" op=${stage[2].opacity}` : 'none',
    stageTypeCount: stage.length,
    appPrimary: app[0] ? `${app[0].fontSize}px "${app[0].text.slice(0, 40)}"` : 'none',
    appSecondary: app[1] ? `${app[1].fontSize}px "${app[1].text.slice(0, 36)}"` : 'none',
    stageTop: stage.map((t) => `${t.fontSize}px/${t.opacity}`).join(' , '),
    overflowCount: (p.overflow || []).length,
    clipped: (p.clipped || []).map((c) => c.cls).join(' | ')
  }
})

fs.writeFileSync(path.join(DATA, 'attention.json'), JSON.stringify(rows, null, 1))
const pad = (s, n) => String(s).padEnd(n).slice(0, n)
console.log(pad('state', 13) + pad('dev', 16) + pad('scale', 7) + pad('canvas', 11) +
  pad('full/mid/low', 14) + pad('run', 4) + 'primary | appPrimary')
for (const r of rows) {
  console.log(pad(r.state, 13) +
    pad(r.deviceCount === 0 ? '-' : `${r.devicePos} ${r.deviceSize}`, 16) +
    pad(r.deviceScale ?? '-', 7) +
    pad(r.canvasScroll, 11) +
    pad(`${r.counts.full}/${r.counts.mid}/${r.counts.low}`, 14) +
    pad(r.running, 4) +
    pad(r.primary, 52) + ' | ' + r.appPrimary)
}
console.log('--- glow layer present in states:',
  rows.filter((r) => r.glows).map((r) => r.state + '(' + r.glows + ')').join(' ; '))
console.log('--- states with canvas overflow:', rows.filter((r) => r.canvasScroll !== '1280x720').map((r) => r.state + ':' + r.canvasScroll).join(', '))
console.log('--- states with app scroll overflow:', rows.filter((r) => r.appScroll && r.appScroll !== '282x602').map((r) => r.state + ':' + r.appScroll).join(', '))
console.log('--- maxScale values:', JSON.stringify(rows.reduce((a, r) => { a[r.maxScale] = (a[r.maxScale] || 0) + 1; return a }, {})))