import fs from 'node:fs'
import path from 'node:path'
const OUT = 'C:/Users/thega/Desktop/HomeplusPresentacion01/HomePlus_Presentacion_FINAL/audit/runtime/session-03/figma-reference'
const L = (s) => console.log(s)
const load = (n) => { for (const c of [`${n}.census.json`, `${n}.census.json.json`]) { try { return JSON.parse(fs.readFileSync(path.join(OUT, c), 'utf8')) } catch {} } throw new Error('missing ' + n) }
const rx = (p) => new RegExp(p || '.*', 'i')

const show = (n, f, label) => { const c = load(n); L(`\n--- ${n} :: ${label} ---`); for (const t of c.texts.filter(f)) L(`  ${String(t.fontSize).padEnd(7)}/${String(t.fontWeight).padEnd(4)} lh=${String(t.lineHeight).padEnd(8)} ls=${String(t.letterSpacing).padEnd(9)} tt=${t.textTransform.padEnd(9)} ff=${t.fontFamily.padEnd(18)} col=${t.color.padEnd(22)} bg=${t.backgroundColor.padEnd(22)} br=${t.borderRadius.padEnd(8)} pad=${t.padding.padEnd(22)} border=${t.border.padEnd(24)} fv=${String(t.fontVariantNumeric).padEnd(11)} box=${t.w}x${t.h} :: ${JSON.stringify(t.text)}`) }
const ctrls = (n, f, label) => { const c = load(n); L(`\n--- ${n} :: CTRLS ${label} ---`); for (const t of c.ctrls.filter(f)) L(`  ${t.tag.padEnd(7)} al=${JSON.stringify(t.ariaLabel).padEnd(40)} t=${JSON.stringify(t.text).padEnd(28)} fs=${t.fontSize}/${t.fontWeight} col=${t.color.padEnd(22)} bg=${t.backgroundColor.padEnd(22)} br=${String(t.borderRadius).padEnd(8)} pad=${t.padding.padEnd(22)} border=${t.border.padEnd(24)} box=${t.w}x${t.h}`) }
const surf = (n, f, label) => { const c = load(n); L(`\n--- ${n} :: SURFACES ${label} ---`); for (const s of c.surfaces.filter(f)) L(`  ${s.tag.padEnd(8)} tid=${JSON.stringify(s.testid).padEnd(36)} br=${String(s.radius).padEnd(8)} bg=${s.bg.padEnd(22)} border=${s.border.padEnd(26)} pad=${s.padding.padEnd(22)} shadow=${String(s.shadow).slice(0, 44).padEnd(46)} box=${s.w}x${s.h}`) }

const [mode, n, pat] = process.argv.slice(2)
if (mode === 'text') show(n, (t) => rx(pat).test(t.text), 'TEXTS')
if (mode === 'ctrl') ctrls(n, (t) => rx(pat).test((t.ariaLabel || '') + ' ~ ' + (t.text || '')), 'CTRLS')
if (mode === 'surf') surf(n, (t) => rx(pat).test((t.testid || '') + ' ~ ' + t.bg + ' ~ ' + t.radius), 'SURFACES')
if (mode === 'hist') { const c = load(n); L(`${n}\nfontHist=${JSON.stringify(c.fontHist)}\nsmallest=${JSON.stringify(c.smallest)}`) }
if (mode === 'tok') { const c = load(n); L(`${n} tokens=${JSON.stringify(c.tokens, null, 1)}`) }