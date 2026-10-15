import fs from 'node:fs'
import path from 'node:path'
import { OUT_DIR } from './pw.mjs'

const S = JSON.parse(fs.readFileSync(path.join(OUT_DIR, 'data', 'states-cde.json'), 'utf8'))
const by = Object.fromEntries(S.map((s) => [s.name, s]))
const out = []
const P = (s = '') => { out.push(s); console.log(s) }

// Pair inventory rows with their chips by Y coordinate (DOM order is not reliable).
for (const n of ['S08_step03', 'S08_step04']) {
  const st = by[n]
  const rows = st.nodes.filter((x) => (x.cls || '').split(/\s+/).includes('inventory-row'))
    .map((r) => ({ row: r, title: st.nodes.find((t) => (t.cls || '').includes('inventory-row-title') && Math.abs(t.box.y - r.box.y) < 4), meta: st.nodes.find((t) => (t.cls || '').includes('inventory-row-meta') && t.box.y > r.box.y && t.box.y < r.box.y + r.box.h), chip: st.nodes.find((t) => (t.cls || '').includes('inventory-status') && Math.abs((t.box.y + t.box.h / 2) - (r.box.y + r.box.h / 2)) < 30) }))
  const card = st.nodes.find((x) => (x.cls || '').includes('inventory-card'))
  const shop = st.nodes.find((x) => (x.cls || '').includes('inventory-shopping'))
  const ws = st.nodes.find((x) => (x.cls || '').includes('inventory-workspace'))
  P(`### ${n}`)
  P(`- \`.inventory-workspace\` client ${ws.cw}×${ws.ch} scroll ${ws.sw}×${ws.sh}`)
  P(`- \`.inventory-card\` client ${card.cw}×${card.ch} scroll ${card.sw}×${card.sh}  → overflow **+${card.sh - card.ch}px**`)
  P(`- \`.inventory-shopping\` client ${shop.cw}×${shop.ch} @y=${shop.box.y} (card bottom edge y=${card.box.y + card.ch})`)
  P('')
  P('| # | product | meta | chip | row y-range | row h | title fs | meta fs | chip fs | visible? |')
  P('|---|---|---|---|---|---|---|---|---|---|')
  rows.forEach((r, i) => {
    const y0 = r.row.box.y, y1 = r.row.box.y + r.row.box.h
    const visible = y1 <= card.box.y + card.ch
    P(`| ${i} | **${r.title ? r.title.txt : '?'}** | ${r.meta ? r.meta.txt : '—'} | ${r.chip ? r.chip.txt : '⛔ NONE'} | ${y0.toFixed(0)}–${y1.toFixed(0)} | ${r.row.box.h.toFixed(2)} | ${r.title ? r.title.fs : '—'} | ${r.meta ? r.meta.fs : '—'} | ${r.chip ? r.chip.fs : '—'} | ${visible ? 'yes' : '⛔ **CLIPPED — below the card box**'} |`)
  })
  P('')
  const hl = st.nodes.filter((x) => x.cls.includes('inventory-row') && x.cls.includes('data-highlight'))
  P(`Spotlighted rows (data-highlight="true"): ${hl.length} → ${hl.map((x) => x.box.y.toFixed(0)).join(', ')}`)
  P('')
}

// Which of the three narration questions can the Inventory screen actually answer?
P('## Narration coverage test for Scene C')
P('')
for (const n of ['S08_step03', 'S08_step04']) {
  const st = by[n]
  const card = st.nodes.find((x) => (x.cls || '').includes('inventory-card'))
  const bot = card.box.y + card.ch
  const rows = st.nodes.filter((x) => (x.cls || '').split(/\s+/).includes('inventory-row'))
  const low = rows.filter((r) => st.nodes.some((t) => (t.cls || '').includes('inventory-status') && t.txt === 'Bajo' && Math.abs(t.box.y - r.box.y) < 40))
  const outp = rows.filter((r) => st.nodes.some((t) => (t.cls || '').includes('inventory-status') && t.txt === 'Sin stock' && Math.abs(t.box.y - r.box.y) < 40))
  const ok = rows.filter((r) => !low.includes(r) && !outp.includes(r))
  P(`- **${n}**`)
  P(`  - "qué tenemos" → fully-stocked rows visible: **${ok.filter((r) => r.box.y + r.box.h <= bot).length}/${ok.length}**`)
  P(`  - "qué se está terminando" (LOW) → visible: **${low.filter((r) => r.box.y + r.box.h <= bot).length}/${low.length}**`)
  P(`  - "qué necesitamos comprar" (OUT) → visible: **${outp.filter((r) => r.box.y + r.box.h <= bot).length}/${outp.length}**  ${outp.some((r) => r.box.y + r.box.h > bot) ? '⛔ THE OUT-OF-STOCK ITEM IS BELOW THE CLIP' : ''}`)
  P('')
}

fs.writeFileSync(path.join(OUT_DIR, 'data', 'inventory-rows.md'), out.join('\n'))
console.log('\nWROTE data/inventory-rows.md')