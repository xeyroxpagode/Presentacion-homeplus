import fs from 'node:fs/promises'
import path from 'node:path'

const OUT_DIR = 'C:/Users/thega/Desktop/HomeplusPresentacion01/HomePlus_Presentacion_FINAL/audit/runtime/session-01'
const DATA = path.join(OUT_DIR, 'data')
const fwd = JSON.parse(await fs.readFile(path.join(DATA, 'walk-forward.json'), 'utf8'))

const screenPrefix = (inv) => {
  const s = inv.find((e) => e.cls.split(/\s+/).includes('phone-frame-screen'))
  return s ? s.path + '/' : null
}

console.log('=== APP-SURFACE TYPOGRAPHY + GEOMETRY PER STATE (logical px, canvas scale 1) ===')
const rows = []
for (const s of fwd.states) {
  const pre = screenPrefix(s.inventory)
  const kids = pre ? s.inventory.filter((e) => e.path.startsWith(pre)) : []
  const vis = kids.filter((e) => e.visible)
  const withText = vis.filter((e) => e.text && e.text.length >= 2)
  const sizes = {}
  for (const e of withText) sizes[e.fontSize] = (sizes[e.fontSize] || 0) + 1
  const sorted = Object.keys(sizes).map(parseFloat).sort((a, b) => a - b)
  const surface = s.phone.appSurface
  rows.push({
    name: s.name,
    screenClient: s.phone.screen ? `${s.phone.screen.clientW}x${s.phone.screen.clientH}` : 'none',
    screenScroll: s.phone.screen ? `${s.phone.screen.scrollW}x${s.phone.screen.scrollH}` : 'none',
    appSurfaceCls: surface ? surface.cls.slice(0, 60) : 'none',
    appSurfaceClient: surface ? `${surface.clientW}x${surface.clientH}` : 'none',
    appSurfaceScroll: surface ? `${surface.scrollW}x${surface.scrollH}` : 'none',
    appSurfaceLayout: surface ? `${surface.layoutW}x${surface.layoutH}` : 'none',
    phoneLayout: s.phone.frame ? `${s.phone.frame.layoutW}x${s.phone.frame.layoutH}` : 'none',
    phoneVisual: s.phone.frame ? `${s.phone.frame.box.w}x${s.phone.frame.box.h}` : 'none',
    phoneTransform: s.phone.frame ? s.phone.frame.transform : 'none',
    visibleDescendants: vis.length,
    textNodes: withText.length,
    fontSizes: sorted,
    internalOverflow: kids.filter((e) => e.scrollH - e.clientH > 1 || e.scrollW - e.clientW > 1).map((e) => `${e.cls.split(/\s+/)[0]}:+${e.scrollH - e.clientH}h/+${e.scrollW - e.clientW}w`),
  })
  console.log(`${s.name}: screen=${rows.at(-1).screenClient} (scroll ${rows.at(-1).screenScroll}) app=${rows.at(-1).appSurfaceCls}[${rows.at(-1).appSurfaceClient}] layout=${rows.at(-1).phoneLayout} visual=${rows.at(-1).phoneVisual} tf=${rows.at(-1).phoneTransform} visDesc=${vis.length} texts=${withText.length} fonts=[${sorted.join(',')}]${rows.at(-1).internalOverflow.length ? ' overflow:' + rows.at(-1).internalOverflow.join(' ') : ''}`)
}
await fs.writeFile(path.join(DATA, 'app-surface-metrics.json'), JSON.stringify(rows, null, 1))

console.log('\n=== UNIQUE FONT SIZE SETS PER APP SCREEN ===')
const byScreen = new Map()
for (const r of rows) {
  if (r.appSurfaceCls === 'none') continue
  const k = r.appSurfaceCls
  const sig = r.fontSizes.join(',')
  if (!byScreen.has(k)) byScreen.set(k, new Set())
  byScreen.get(k).add(sig)
}
for (const [k, v] of byScreen) console.log(`${k}: ${[...v].map((x) => `[${x}]`).join(' ')}`)