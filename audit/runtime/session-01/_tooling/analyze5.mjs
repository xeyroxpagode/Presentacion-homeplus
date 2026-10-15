import fs from 'node:fs/promises'
import path from 'node:path'

const OUT_DIR = 'C:/Users/thega/Desktop/HomeplusPresentacion01/HomePlus_Presentacion_FINAL/audit/runtime/session-01'
const DATA = path.join(OUT_DIR, 'data')
const fwd = JSON.parse(await fs.readFile(path.join(DATA, 'walk-forward.json'), 'utf8'))

console.log('=== CONSECUTIVE-STATE LAYOUT MUTATION SCAN (elements present in both states, same DOM path) ===')
console.log('Criterion: clientWidth / clientHeight / scrollWidth / scrollHeight / font-size changed while the state advanced by one press.')
let total = 0
for (let i = 1; i < fwd.states.length; i++) {
  const a = fwd.states[i - 1], b = fwd.states[i]
  const am = new Map(a.inventory.map((e) => [e.path, e]))
  const changes = []
  for (const be of b.inventory) {
    const ae = am.get(be.path)
    if (!ae) continue
    const d = []
    if (ae.clientW !== be.clientW) d.push(`cw ${ae.clientW}->${be.clientW}`)
    if (ae.clientH !== be.clientH) d.push(`ch ${ae.clientH}->${be.clientH}`)
    if (ae.scrollW !== be.scrollW) d.push(`sw ${ae.scrollW}->${be.scrollW}`)
    if (ae.scrollH !== be.scrollH) d.push(`sh ${ae.scrollH}->${be.scrollH}`)
    if (ae.fontSize !== be.fontSize) d.push(`fs ${ae.fontSize}->${be.fontSize}`)
    if (d.length) changes.push({ cls: be.cls.split(/\s+/).slice(0, 2).join('.').slice(0, 60), text: be.text.slice(0, 30), visible: be.visible, d })
  }
  if (changes.length) {
    total++
    console.log(`${a.name} -> ${b.name}: ${changes.length} elements`)
    for (const c of changes.slice(0, 12)) console.log(`    ${c.visible ? 'VIS ' : 'hid '} ${c.cls} ${c.text ? `"${c.text}" ` : ''}${c.d.join(', ')}`)
    if (changes.length > 12) console.log(`    ... +${changes.length - 12} more`)
  }
}
console.log(`\nSTATE PAIRS WITH ANY LAYOUT/FONT MUTATION OF A SHARED ELEMENT: ${total} / ${fwd.states.length - 1}`)

console.log('\n=== PER-STATE SCREENSHOT / KEY METRICS TABLE (csv) ===')
const header = 'order,state,slide,slideName,phone_visual,phone_layout,phone_transform,phone_x,phone_y,screen_client,screen_scroll,app_surface,app_client,app_scroll,dom_nodes,hidden_nodes,scrollable_nodes,clipped_visible,max_element_scale,canvas_scroll,doc_scroll,visible_text_count'
const lines = [header]
for (const s of fwd.states) {
  const pf = s.phone.frame
  lines.push([
    s.order, s.name, s.slideId, `"${s.slideAria}"`,
    pf ? `${pf.box.w}x${pf.box.h}` : 'none',
    pf ? `${pf.layoutW}x${pf.layoutH}` : 'none',
    pf ? `"${pf.transform}"` : 'none',
    pf ? pf.box.x : '', pf ? pf.box.y : '',
    s.phone.screen ? `${s.phone.screen.clientW}x${s.phone.screen.clientH}` : 'none',
    s.phone.screen ? `${s.phone.screen.scrollW}x${s.phone.screen.scrollH}` : 'none',
    s.phone.appSurface ? `"${s.phone.appSurface.cls.slice(0, 40)}"` : 'none',
    s.phone.appSurface ? `${s.phone.appSurface.clientW}x${s.phone.appSurface.clientH}` : 'none',
    s.phone.appSurface ? `${s.phone.appSurface.scrollW}x${s.phone.appSurface.scrollH}` : 'none',
    s.inventoryCount, s.hiddenCount, s.scrollables.length, s.clippedVisible.length, s.maxScale,
    `${s.canvas.scrollW}x${s.canvas.scrollH}/${s.canvas.clientW}x${s.canvas.clientH}`,
    `${s.browser.docScrollW}x${s.browser.docScrollH}/${s.browser.docClientW}x${s.browser.docClientH}`,
    s.texts.length,
  ].join(','))
}
await fs.writeFile(path.join(DATA, 'state-table.csv'), lines.join('\n'), 'utf8')
console.log('state-table.csv written')

console.log('\n=== VISIBLE TEXT PER STATE ===')
for (const s of fwd.states) console.log(`${s.name} (${s.texts.length}): ${s.texts.join(' | ')}`)