// Session 7 — targeted selector probe: ancestor-aware effective opacity and
// geometry for named elements at the states that matter for the audit.
import { chromium, CHROMIUM_EXE, URL_BASE } from './pw.mjs'
import { PROBE } from './probe.mjs'
import fs from 'node:fs'
import path from 'node:path'

const OUT_DIR =
  'C:/Users/thega/Desktop/HomeplusPresentacion01/HomePlus_Presentacion_FINAL/audit/runtime/session-07'
const DATA = path.join(OUT_DIR, 'data')

const counts = { S01: 11, S02: 7, S03: 1, S04: 6, S05: 4, S06: 6, S07: 2, S08: 5, S09: 5, S10: 5,
                 S11: 3, S12: 3, S13: 4, S14: 5, S15: 5, S16: 5, S17: 4, S18: 4 }
const ORDER = []
for (const [k, c] of Object.entries(counts))
  for (let i = 0; i < c; i++) ORDER.push(`${k}_step${String(i).padStart(2, '0')}`)

const SELECTORS = {
  S01: ['.attention-element', '.attention-element-content', '.opening-fragments', '.ambient-glow.opening-chaos-light'],
  S02: ['.information-statement', '.service-icon', '.family-center', '.metric-zero', '.metrics-row', '.ambient-glow.metrics-zero-light'],
  S03: ['.homeplus-lockup', '.opening-brand', 'h1', '.ambient-glow.opening-brand-depth'],
  S04: ['.home-scene', '.home-phone-position', '.home-section-heading', '.home-demo-row', '.task-status-mark'],
  S05: ['.planner-tab', '.planner-tab-selection', '.planner-panel-stack', '.planner-task-row'],
  S06: ['.family-map-stage', '.family-map-surface', '.map-place.map-school', '.map-place.map-club', '.map-place.map-mom', '.map-place.map-dad', '.map-delay', '.home-phone-position', '.family-feed-product'],
  S07: ['.s07-statement', '.product-stage'],
  S08: ['.s08-question', '.s08-layer', '.s08-phone-slot', '.planner-step', '.inventory-row', '.inventory-shopping', '.inventory-row-title', '.inventory-filters'],
  S09: ['.s09-question', '.finance-hero-balance', '.s09-phone-motion', '.finance-tab'],
  S10: ['.s10-phone-slot', '.s10-layer', '.assets-row', '.homecloud-photo', '.homecloud-photo-thumb', '.s10-stage-title'],
  S11: ['.s11-statement', '.s11-resolution', '.s11-bridge'],
  S12: ['.s12-panel', '.s12-bridge', '.s12-bridge-line', '.s12-bridge-node'],
  S13: ['.s13-panel', '.s13-tech', '.s13-center', '.s13-bridge', '.s13-core-glow', 'em.s13-role'],
  S14: ['.s14-stage', '.s14-echo', '.s14-route', '.s14-routes', '.s14-barrier', '.s14-question', '.s13-stage', '.s13-panel'],
  S15: ['.s15-scene', '.s15-phone-motion', '.homi-user-bubble', '.homi-proposal', '.homi-confirm', '.s15-title'],
  S16: ['.s16-idea', '.homi-persona', '.homi-proposal', '.homi-context', '.s16-scene'],
  S17: ['.s17-line', '.s17-resolution', '.homi-decision-row', '.homi-done', '.s17-scene'],
  S18: ['.s18-brand', '.s18-team', '.s18-member', '.s18-thanks', '.s18-closing']
}

const DETAIL = /* js */ `(sels) => {
  const num = (v) => { const n = parseFloat(v); return Number.isFinite(n) ? n : 0; };
  const r2 = (n) => Math.round(n * 100) / 100;
  const out = [];
  for (const s of sels) {
    for (const el of Array.from(document.querySelectorAll(s))) {
      const cs = getComputedStyle(el);
      let eff = 1, node = el;
      while (node && node.nodeType === 1) { eff *= num(getComputedStyle(node).opacity); node = node.parentElement }
      let vis = true, n2 = el;
      while (n2 && n2.nodeType === 1) {
        const c2 = getComputedStyle(n2);
        if (c2.display === 'none' || c2.visibility === 'hidden') { vis = false; break; }
        n2 = n2.parentElement;
      }
      const r = el.getBoundingClientRect();
      out.push({
        sel: s,
        painted: vis && eff > 0.004 && r.width > 0.5 && r.height > 0.5,
        eff: r2(eff), own: r2(num(cs.opacity)), vis: cs.visibility, disp: cs.display,
        x: r2(r.x), y: r2(r.y), w: r2(r.width), h: r2(r.height),
        font: cs.fontSize, tr: cs.transform,
        cw: el.clientWidth, ch: el.clientHeight, sw: el.scrollWidth, sh: el.scrollHeight,
        text: (el.textContent || '').trim().slice(0, 48),
        parentOpacity: r2(num(getComputedStyle(el.parentElement || el).opacity))
      });
    }
  }
  return out;
}`

const browser = await chromium.launch({ executablePath: CHROMIUM_EXE, headless: true })
const ctx = await browser.newContext({ viewport: { width: 1280, height: 720 } })
const page = await ctx.newPage()
await page.goto(URL_BASE, { waitUntil: 'networkidle' })
await page.waitForSelector('.presentation-canvas', { timeout: 20000 })
const settle = async () => {
  await page.waitForFunction(() => document.getAnimations().every((a) => a.playState !== 'running'),
    null, { timeout: 12000 })
  await page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))))
}
await settle()

const all = {}
for (let i = 0; i < ORDER.length; i++) {
  const id = ORDER[i]
  const sels = SELECTORS[id.slice(0, 3)] || []
  all[id] = await page.evaluate(`(${DETAIL})(${JSON.stringify(sels)})`)
  if (i < ORDER.length - 1) { await page.keyboard.press('ArrowRight'); await settle() }
}
fs.writeFileSync(path.join(DATA, 'selector-detail.json'), JSON.stringify(all, null, 1))

// digest
const pad = (s, n) => String(s).padEnd(n).slice(0, n)
for (const [id, rows] of Object.entries(all)) {
  const painted = rows.filter((r) => r.painted)
  if (!painted.length) { console.log(id, '-> nothing painted'); continue }
  const agg = new Map()
  for (const r of painted) {
    const k = r.sel
    const a = agg.get(k) || { n: 0, eff: new Set(), wh: new Set(), f: new Set(), cwch: new Set() }
    a.n++; a.eff.add(r.eff); a.wh.add(r.w + 'x' + r.h); a.f.add(r.font)
    a.cwch.add(r.cw + 'x' + r.ch + '/' + r.sw + 'x' + r.sh)
    agg.set(k, a)
  }
  console.log(id + ' | ' + [...agg.entries()].map(([k, a]) =>
    `${k} x${a.n} eff{${[...a.eff].join(',')}} box{${[...a.wh].slice(0, 2).join(',')}} font{${[...a.f].join(',')}} lay{${[...a.cwch].slice(0, 2).join(',')}}`).join(' ; '))
}
await browser.close()