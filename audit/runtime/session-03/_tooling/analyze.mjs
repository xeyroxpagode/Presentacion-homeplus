import fs from 'node:fs'
import path from 'node:path'
import { OUT_DIR } from './pw.mjs'

const S = JSON.parse(fs.readFileSync(path.join(OUT_DIR, 'data', 'states-cde.json'), 'utf8'))
const by = Object.fromEntries(S.map((s) => [s.name, s]))

const pick = (st, cls) => st.nodes.filter((n) => n.cls.split(/\s+/).includes(cls))

const lines = []
const P = (s = '') => { lines.push(s); console.log(s) }

// ---------- 1. Stage-side copy per state ----------
P('## 1. STAGE-SIDE COPY (outside the device)')
P('')
P('| state | element | text | font-size | weight | color | opacity | box |')
P('|---|---|---|---|---|---|---|---|')
for (const st of S) {
  for (const t of st.stageText) {
    if (!t.t) continue
    P(`| ${st.name} | ${t.cls || '—'} | ${t.t.replace(/\|/g, '\\|')} | ${t.fs} | ${t.fw} | ${t.color} | ${t.op} | ${t.box ? `${t.box.w}×${t.box.h} @${t.box.x},${t.box.y}` : '—'} |`)
  }
}
P('')

// ---------- 2. S08 plan steps ----------
P('## 2. S08 PLAN CARD — per-step geometry and opacity')
P('')
for (const n of ['S08_step00', 'S08_step01', 'S08_step02']) {
  const st = by[n]
  P(`### ${n}`)
  const rows = st.nodes.filter((x) => (x.cls || '').includes('planner-plan-step'))
  for (const r of rows) {
    const t = r.txt || ''
    P(`- step \`${t}\` opacity **${r.op}** bg \`${r.bg}\` box ${r.box.w}×${r.box.h} @${r.box.x},${r.box.y}`)
  }
  const hd = st.nodes.filter((x) => (x.cls || '').includes('planner-plan-heading'))
  hd.forEach((r) => P(`- heading opacity **${r.op}**`))
  P(`- phone slot opacity **${st.slot.opacity}** side=${st.slot.side} dim=${st.slot.dim}`)
  P('')
}

// ---------- 3. Inventory rows ----------
P('## 3. INVENTORY ROWS — geometry, type and clipping')
P('')
for (const n of ['S08_step03', 'S08_step04']) {
  const st = by[n]
  P(`### ${n}`)
  P('| product | title box | title font | meta font | status chip | status font | row height |')
  P('|---|---|---|---|---|---|---|')
  const rows = st.nodes.filter((x) => (x.cls || '').split(/\s+/).includes('inventory-row'))
  const titles = st.nodes.filter((x) => (x.cls || '').includes('inventory-row-title'))
  const metas = st.nodes.filter((x) => (x.cls || '').includes('inventory-row-meta'))
  const stats = st.nodes.filter((x) => (x.cls || '').includes('inventory-status'))
  rows.forEach((r, i) => {
    const name = titles[i] ? titles[i].txt : '?'
    P(`| ${name} | ${titles[i] ? `${titles[i].box.w}×${titles[i].box.h} @${titles[i].box.y}` : '—'} | ${titles[i] ? titles[i].fs : '—'} | ${metas[i] ? metas[i].fs : '—'} | ${stats[i] ? `${stats[i].txt} ${stats[i].box.w}×${stats[i].box.h} @${stats[i].box.x},${stats[i].box.y}` : 'NONE'} | ${r.box ? r.box.h : '—'} |`)
  })
  P('')
  P('Overflow inside the device screen:')
  st.overflow.forEach((o) => P(`- \`.${o.cls}\` +${o.dh}h / +${o.dw}w`))
  P('')
  const card = st.nodes.find((x) => (x.cls || '').includes('inventory-card'))
  if (card) P(`- \`.inventory-card\` client ${card.cw}×${card.ch} scroll ${card.sw}×${card.sh}`)
  const ws = st.nodes.find((x) => (x.cls || '').includes('inventory-workspace'))
  if (ws) P(`- \`.inventory-workspace\` client ${ws.cw}×${ws.ch} scroll ${ws.sw}×${ws.sh}`)
  P('')
}

// ---------- 4. Inventory: is any row occluded? ----------
P('## 4. INVENTORY — is the OUT row reachable? (clip test against the card box)')
P('')
for (const n of ['S08_step03', 'S08_step04']) {
  const st = by[n]
  const screenTop = st.screen.box.y
  const screenBot = st.screen.box.y + st.screen.box.h
  P(`### ${n} — device screen y ${screenTop} … ${screenBot}`)
  const rows = st.nodes.filter((x) => (x.cls || '').split(/\s+/).includes('inventory-row'))
  const titles = st.nodes.filter((x) => (x.cls || '').includes('inventory-row-title'))
  const metas = st.nodes.filter((x) => (x.cls || '').includes('inventory-row-meta'))
  rows.forEach((r, i) => {
    const name = titles[i] ? titles[i].txt : '?'
    const meta = metas[i] ? metas[i].txt : ''
    const status = st.nodes.filter((x) => (x.cls || '').includes('inventory-status'))[i]
    const cut = r.box.y + r.box.h > screenBot
    P(`- **${name}** — row ${r.box.w}×${r.box.h} @${r.box.x},${r.box.y}${cut ? '  ⛔ EXTENDS BELOW THE DEVICE SCREEN' : ''}  · meta "${meta}"${status ? ` · chip "${status.txt}"` : ' · ⛔ NO STATUS CHIP'}`)
  })
  P('')
}

// ---------- 5. Finance ----------
P('## 5. FINANCE — what is on stage, per step')
P('')
for (const n of ['S09_step00', 'S09_step01', 'S09_step02', 'S09_step03', 'S09_step04']) {
  const st = by[n]
  P(`### ${n}`)
  const sig = st.readText.filter((t) => !t.cls.includes('s09-')).map((t) => `${t.t}@${t.fs}`).join(' | ')
  P(`- device text signature: ${sig}`)
  P(`- questions on stage: ${st.stageText.filter((t) => t.cls.includes('s09-question')).map((t) => `"${t.t}" op=${t.op}`).join(' · ') || 'none'}`)
  P(`- idea: ${st.stageText.filter((t) => t.cls.includes('s09-idea')).map((t) => `"${t.t}" ${t.fs} op=${t.op}`).join('')}`)
  P('')
}
P('Signature equality across the five S09 steps:')
const sigs = ['S09_step00', 'S09_step01', 'S09_step02', 'S09_step03', 'S09_step04']
  .map((n) => by[n].readText.filter((t) => !t.cls.includes('s09-')).map((t) => `${t.t}@${t.fs}@${t.op}`).join('|'))
P('`device text identical across all 5 steps: ' + (new Set(sigs).size === 1) + '`')
P('`unique signatures: ' + new Set(sigs).size + '`')
P('')

// ---------- 6. S10 ----------
P('## 6. S10 — Assets / HomeCloud text per step')
P('')
for (const n of ['S10_step00', 'S10_step01', 'S10_step02', 'S10_step03', 'S10_step04']) {
  const st = by[n]
  P(`### ${n}`)
  st.readText.forEach((t) => P(`- \`${t.cls}\` "${t.t}" ${t.fs} op=${t.op} box ${t.box.w}×${t.box.h} @${t.box.x},${t.box.y}${t.bgImg ? ' bgImage=GRADIENT' : ''}`))
  P('')
}

// ---------- 7. Enlargement ----------
P('## 7. ENLARGEMENT — device + max transform scale per state')
P('')
P('| state | slot box | phone box | phone transform | phone client | screen client | max non-stage scale |')
P('|---|---|---|---|---|---|---|')
for (const n of ['S07_step01', ...sigsAll()]) { }
function sigsAll() { return ['S08_step00', 'S08_step01', 'S08_step02', 'S08_step03', 'S08_step04', 'S09_step00', 'S09_step04', 'S10_step00', 'S10_step01', 'S10_step02', 'S10_step03', 'S10_step04'] }
for (const n of sigsAll()) {
  const st = by[n]
  P(`| ${n} | ${st.slot.box ? `${st.slot.box.w}×${st.slot.box.h} @${st.slot.box.x},${st.slot.box.y}` : '—'} | ${st.phone.box ? `${st.phone.box.w}×${st.phone.box.h}` : '—'} | ${st.phone.transform} | ${st.phone.cw}×${st.phone.ch} | ${st.screen.cw}×${st.screen.ch} | ${st.maxScale} |`)
}
P('')

// ---------- 8. Font inventory ----------
P('## 8. FONT INVENTORY INSIDE THE DEVICE')
P('')
for (const n of sigsAll()) {
  const st = by[n]
  const sizes = Object.keys(st.appFonts).map(parseFloat).sort((a, b) => a - b)
  P(`- ${n}: ${sizes.join(', ')}  → smallest **${sizes[0]}px**, largest **${sizes[sizes.length - 1]}px**`)
}
P('')

// ---------- 9. Canvas overflow ----------
P('## 9. CANVAS OVERFLOW')
P('')
for (const n of sigsAll()) {
  const st = by[n]
  P(`- ${n}: canvas client ${st.canvas.cw}×${st.canvas.ch}, scroll ${st.canvas.sw}×${st.canvas.sh}`)
}
P('')

fs.writeFileSync(path.join(OUT_DIR, 'data', 'analysis-cde.md'), lines.join('\n'))
console.log('\nWROTE data/analysis-cde.md')