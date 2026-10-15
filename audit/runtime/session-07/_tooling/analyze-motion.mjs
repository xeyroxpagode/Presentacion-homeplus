// Session 7 — per-frame concurrent-motion analysis (does not rely on
// getAnimations() alone — see N-10). Counts elements whose painted geometry,
// opacity, transform, font-size or layout changed vs. the pre-press snapshot.
import fs from 'node:fs'
import path from 'node:path'

const OUT_DIR =
  'C:/Users/thega/Desktop/HomeplusPresentacion01/HomePlus_Presentacion_FINAL/audit/runtime/session-07'
const DATA = path.join(OUT_DIR, 'data')
const { trans } = JSON.parse(fs.readFileSync(path.join(DATA, 'transitions.json'), 'utf8'))

const F = (v) => Math.round(v * 100) / 100
const changed = (A, B) => {
  if (!A || !B) return null
  const out = { pos: 0, op: 0, tr: 0, lay: 0, fs: 0 }
  for (const k of Object.keys(A)) {
    const a = A[k], b = B[k]
    if (!b) continue
    if (Math.abs(a.x - b.x) > 0.75 || Math.abs(a.y - b.y) > 0.75 ||
        Math.abs(a.w - b.w) > 0.75 || Math.abs(a.h - b.h) > 0.75) out.pos++
    if (a.op !== b.op) out.op++
    if (a.tr !== b.tr) out.tr++
    if (a.cw !== b.cw || a.ch !== b.ch || a.sw !== b.sw || a.sh !== b.sh || a.st !== b.st || a.sl !== b.sl) out.lay++
    if (a.fs !== b.fs) out.fs++
  }
  return out
}

const rows = trans.map((t) => {
  const b = t.before.snap
  const per = t.frames.map((f) => {
    const c = changed(b, f.snap)
    const running = f.anim.filter((a) => a.st === 'running')
    return { t: f.t, ...c, total: c.pos + c.op + c.tr, running: running.length,
             runningTgt: running.map((a) => a.tgt) }
  })
  const s = changed(b, t.settled.snap)
  const maxMoving = Math.max(...per.map((p) => p.total))
  return {
    i: t.i, from: t.from, to: t.to, bnd: t.sceneBoundary,
    per,
    maxMoving,
    settledTotal: s.pos + s.op + s.tr,
    settledPos: s.pos, settledOp: s.op, settledTr: s.tr,
    settledLay: s.lay, settledFs: s.fs,
    // layout that changed MORE than 4px in any dimension
    bigLayout: t.settled.snap ? Object.keys(b).filter((k) => {
      const a = b[k], z = t.settled.snap[k]
      if (!z) return false
      return Math.abs(a.cw - z.cw) > 4 || Math.abs(a.ch - z.ch) > 4 ||
             Math.abs(a.sw - z.sw) > 4 || Math.abs(a.sh - z.sh) > 4
    }) : [],
    fontChanged: Object.keys(b).filter((k) => b[k] && t.settled.snap[k] && b[k].fs !== t.settled.snap[k].fs)
      .map((k) => k + ' ' + b[k].fs + '->' + t.settled.snap[k].fs),
    animsSettled: t.settled.anim.length,
    animsRunningSettled: t.settled.anim.filter((a) => a.st === 'running').length,
    animNamesSettled: [...new Set(t.settled.anim.map((a) => a.tgt + '@' + a.dur + 'ms'))]
  }
})

fs.writeFileSync(path.join(DATA, 'transition-motion.json'), JSON.stringify(rows, null, 1))

const pad = (s, n) => String(s).padEnd(n).slice(0, n)
console.log('idx  transition                        bnd maxMov settle(pos/op/tr/lay/fs)  animSetSettled  runningTargets@frames')
for (const r of rows) {
  const rt = [...new Set(r.per.flatMap((p) => p.runningTgt))].slice(0, 6)
  console.log(
    String(r.i).padStart(3) + ' ' + pad(r.from + '>' + r.to, 30) + ' ' + (r.bnd ? 'B' : ' ') +
    String(r.maxMoving).padStart(6) + '  ' +
    pad(`${r.settledPos}/${r.settledOp}/${r.settledTr}/${r.settledLay}/${r.settledFs}`, 22) + ' ' +
    pad(r.animsSettled, 4) + '  ' + pad(rt.join(','), 70))
}
console.log('---')
console.log('transitions with maxMoving >= 10 :', rows.filter((r) => r.maxMoving >= 10).length)
console.log('transitions with maxMoving 0     :', rows.filter((r) => r.maxMoving === 0).length)
console.log('transitions with settled layout mutation (any px):', rows.filter((r) => r.settledLay > 0).length)
console.log('transitions with big layout (>4px)            :', rows.filter((r) => r.bigLayout.length).length)
console.log('transitions with font-size mutation           :', rows.filter((r) => r.fontChanged.length).length)