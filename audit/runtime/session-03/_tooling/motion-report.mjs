import fs from 'node:fs'
import path from 'node:path'
import { OUT_DIR } from './pw.mjs'

const M = JSON.parse(fs.readFileSync(path.join(OUT_DIR, 'data', 'motion-cde.json'), 'utf8'))
const out = []
const P = (s = '') => { out.push(s); console.log(s) }

const fmt = (o) => o ? `${o.w}×${o.h}@${o.x},${o.y} op=${o.op}` : '—'

for (const [label, rec] of Object.entries(M)) {
  P(`## ${label}`)
  const f = rec.frames
  const pick = [0, 2, 4, 7, 10, 14, 18, 22, f.length - 1].filter((i) => i < f.length)
  P(`frames sampled: ${f.length}; dt range ${f[0].dt} → ${f[f.length - 1].dt} ms; running animations at last frame: ${f[f.length - 1].anims}`)
  P('')
  P('| dt ms | anims | slot | phone | layers(op) |')
  P('|---|---|---|---|---|')
  for (const i of pick) {
    const x = f[i]
    P(`| ${x.dt} | ${x.anims} | ${x.slot ? `${x.slot.x},${x.slot.y} ${x.slot.w}×${x.slot.h} op=${x.slot.op} tr=${x.slot.tr}` : '—'} | ${fmt(x.phone)} | ${x.layers.map((l) => `${l.cls}:${l.op}`).join(' ') || '—'} |`)
  }
  P('')

  if (label.includes('Plan → Inventory')) {
    P('Plan steps and the bridge task, across the transition:')
    P('| dt | heading op | step0 op | step1 op | step2 (Comprar lo que falta) op | invCard | invShop |')
    P('|---|---|---|---|---|---|---|')
    for (const i of pick) {
      const x = f[i]
      P(`| ${x.dt} | ${x.planHead ? x.planHead.op : '—'} | ${x.planSteps[0]?.op ?? '—'} | ${x.planSteps[1]?.op ?? '—'} | ${x.planSteps[2]?.op ?? '—'} | ${fmt(x.invCard)} | ${fmt(x.invShop)} |`)
    }
    P('')
    P('Question `¿Qué falta en casa?` opacity: ' + pick.map((i) => `${f[i].dt}ms:${f[i].s08q ? f[i].s08q.op : 'gone'}`).join(' · '))
    P('')
  }

  if (label.includes('Inventory shortage focus')) {
    P('Inventory rows / titles / chips across the mutation:')
    P('| dt | row heights | title font sizes | chips | card box | shop box |')
    P('|---|---|---|---|---|---|')
    for (const i of pick) {
      const x = f[i]
      P(`| ${x.dt} | ${x.invRows.map((r) => r.h.toFixed(1)).join(',')} | ${x.invTitles.map((t) => t.fs).join(',')} | ${x.invChips.map((c) => `${c.t}:${c.fs}`).join(',') || '—'} | ${fmt(x.invCard)} | ${fmt(x.invShop)} |`)
    }
    P('')
  }

  if (label.includes('Inventory → Finance')) {
    P('What survives the handoff:')
    P('| dt | slot | finHero | finTabs | payRows | catRows |')
    P('|---|---|---|---|---|---|')
    for (const i of pick) {
      const x = f[i]
      P(`| ${x.dt} | ${x.slot ? `${x.slot.x},${x.slot.y} op=${x.slot.op}` : '—'} | ${fmt(x.finHero)} | ${x.finTabs.map((t) => `${t.t}:${t.op}`).join(' ')} | ${x.payRows.length} | ${x.catRows.length} |`)
    }
    P('')
    const last = f[f.length - 1]
    P(`FINAL: s09 idea present=${!!last.s09idea} ${fmt(last.s09idea)}`)
    P('')
  }

  if (label.includes('Finance → Assets')) {
    P('Does any Finance object survive into Assets?')
    P('| dt | slot | finHero | assetRows | assetHero | assetDocs |')
    P('|---|---|---|---|---|---|')
    for (const i of pick) {
      const x = f[i]
      P(`| ${x.dt} | ${x.slot ? `${x.slot.x},${x.slot.y} ${x.slot.w}×${x.slot.h} op=${x.slot.op}` : '—'} | ${fmt(x.finHero)} | ${x.assetRows.length} | ${fmt(x.assetHero)} | ${x.assetDocs.length} |`)
    }
    P('')
  }

  if (label.includes('Assets detail → HomeCloud')) {
    P('Assets documents vs HomeCloud documents across the transition:')
    P('| dt | slot | assetDocs | hcTabs | hcDocRows | hcDoc titles |')
    P('|---|---|---|---|---|---|')
    for (const i of pick) {
      const x = f[i]
      P(`| ${x.dt} | ${x.slot ? `${x.slot.x},${x.slot.y} op=${x.slot.op}` : '—'} | ${x.assetDocs.length} | ${x.hcTabs.map((t) => `${t.t}:${t.op}`).join(' ')} | ${x.hcDocRows.length} | ${x.hcDocRows.map((r) => r.cls).join(' ')} |`)
    }
    P('')
    P('HomeCloud doc row geometry at end: ' + JSON.stringify(f[f.length - 1].hcDocRows))
    P('Assets doc row geometry at start: ' + JSON.stringify(f[0].assetDocs))
    P('')
  }

  if (label.includes('Documentos → Recuerdos')) {
    P('Thumbnails and memory rows across the mutation:')
    P('| dt | hcTabs | hcDocRows | hcPhotos | hcThumbs (w×h) | hcVoice | hcAlbum |')
    P('|---|---|---|---|---|---|---|')
    for (const i of pick) {
      const x = f[i]
      P(`| ${x.dt} | ${x.hcTabs.map((t) => `${t.t}:${t.op}`).join(' ')} | ${x.hcDocRows.length} | ${x.hcPhotos.map((p) => `${p.w}×${p.h}`).join(',')} | ${x.hcThumbs.map((t) => `${t.w}×${t.h}@${t.x},${t.y}`).join(' ')} | ${fmt(x.hcVoice)} | ${fmt(x.hcAlbum)} |`)
    }
    P('')
  }
  P('---')
  P('')
}

fs.writeFileSync(path.join(OUT_DIR, 'data', 'motion-cde.md'), out.join('\n'))
console.log('\nWROTE data/motion-cde.md')