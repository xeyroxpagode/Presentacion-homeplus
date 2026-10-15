// Session 7 — analyze transitions.json into the per-transition facts needed for
// audit/07_TRANSITION_MATRIX.csv and audit/07_ATTENTION_MAP.csv.
import fs from 'node:fs'
import path from 'node:path'

const OUT_DIR =
  'C:/Users/thega/Desktop/HomeplusPresentacion01/HomePlus_Presentacion_FINAL/audit/runtime/session-07'
const DATA = path.join(OUT_DIR, 'data')
const { trans } = JSON.parse(fs.readFileSync(path.join(DATA, 'transitions.json'), 'utf8'))

const diff = (a, b) => {
  const keys = new Set([...Object.keys(a || {}), ...Object.keys(b || {})])
  const moved = [], opCh = [], trCh = [], layCh = [], visCh = [], newEls = [], goneEls = []
  for (const k of keys) {
    const A = a[k], B = b[k]
    if (!A) { newEls.push(k); continue }
    if (!B) { goneEls.push(k); continue }
    const posA = [A.x, A.y, A.w, A.h], posB = [B.x, B.y, B.w, B.h]
    const dp = posA.some((v, i) => Math.abs(v - posB[i]) > 0.75)
    if (dp) moved.push(k)
    if (A.op !== B.op) opCh.push({ k, from: A.op, to: B.op })
    if (A.tr !== B.tr) trCh.push({ k, from: A.tr, to: B.tr })
    if (A.cw !== B.cw || A.ch !== B.ch || A.sw !== B.sw || A.sh !== B.sh) {
      layCh.push({ k, from: [A.cw, A.ch, A.sw, A.sh], to: [B.cw, B.ch, B.sw, B.sh] })
    }
    if (A.st !== B.st || A.sl !== B.sl) layCh.push({ k, scrollFrom: [A.st, A.sl], scrollTo: [B.st, B.sl] })
    if (A.vis !== B.vis) visCh.push({ k, from: A.vis, to: B.vis })
  }
  return { moved, opCh, trCh, layCh, visCh, newEls, goneEls }
}

const containerKeys = (snap) => Object.keys(snap).filter((k) =>
  /presentation-canvas|presentation-scene|phone-frame|\.home-scene|s\d+-scene|s1[0-8]-stage/.test(k))

const rows = trans.map((t) => {
  const b = t.before.snap, s = t.settled.snap
  const d = diff(b, s)
  const runningPeak = Math.max(0, ...t.frames.map((f) => f.anim.filter((a) => a.st === 'running').length))
  const runningAny = Math.max(0, ...t.frames.map((f) => f.anim.filter((a) => a.st === 'running').length))
  const finishedOnly = t.settled.anim.every((a) => a.st !== 'running')
  // durations / easings actually declared on animating elements
  const durs = new Set(), eases = new Set(), props = new Set()
  for (const f of [...t.frames.map((x) => x.anim), t.before.anim, t.settled.anim]) {
    for (const a of f) {
      if (a.dur != null) durs.add(String(a.dur))
      if (a.eas && a.eas !== 'linear') eases.add(a.eas)
      if (a.tp && a.tp !== 'all') props.add(a.tp)
      if (a.tt && a.tt !== 'ease') eases.add(a.tt)
    }
  }
  const devB = t.before.probe.devices, devA = t.settled.probe.devices
  const dev = (ds) => ds.length === 0 ? 'none'
    : ds.map((d) => `${d.scale ?? '?'}@${d.slotBox?.x},${d.slotBox?.y} ${d.frameBox?.w}x${d.frameBox?.h}`).join(' + ')
  const contB = t.before.probe.canvas, contA = t.settled.probe.canvas
  const canvasDelta = (contB.scrollW !== contA.scrollW || contB.scrollH !== contA.scrollH)
    ? `${contB.scrollW}x${contB.scrollH}->${contA.scrollW}x${contA.scrollH}` : 'none'
  return {
    id: t.i,
    from: t.from, to: t.to,
    sceneBoundary: t.sceneBoundary,
    moved: d.moved.length, opCh: d.opCh.length, trCh: d.trCh.length,
    layCh: d.layCh.length, visCh: d.visCh.length,
    newEls: d.newEls.length, goneEls: d.goneEls.length,
    runningPeak, runningAny, finishedOnly,
    totalAnimsSettled: t.settled.anim.length,
    runningSettled: t.settled.anim.filter((a) => a.st === 'running').length,
    durs: [...durs].join(';'), eases: [...eases].join(';'), props: [...props].join(';'),
    deviceBefore: dev(devB), deviceAfter: dev(devA),
    deviceCountBefore: devB.length, deviceCountAfter: devA.length,
    canvasDelta,
    containerLay: d.layCh.filter((x) => containerKeys({ [x.k]: 1 })[0] !== undefined),
    animTargets: [...new Set(t.frames.flatMap((f) => f.anim.filter((a) => a.st === 'running').map((a) => a.tgt)))].slice(0, 12),
    animTargetsAll: [...new Set([...t.before.anim, ...t.frames.flatMap((f) => f.anim), ...t.settled.anim].map((a) => a.tgt))].slice(0, 16),
    motionPrimitive: [...new Set(t.before.anim.flatMap((a) => (a.tp || '').split(',').map((x) => x.trim()))
      .concat(t.settled.anim.flatMap((a) => (a.tp || '').split(',').map((x) => x.trim())))
      .filter((x) => x && x !== 'all'))].join(';'),
    bigLayout: d.layCh.filter((x) => (x.to && x.from &&
      (Math.abs(x.to[0] - x.from[0]) > 4 || Math.abs(x.to[1] - x.from[1]) > 4))).slice(0, 8),
    fontCh: Object.keys(s).filter((k) => b[k] && b[k].fs !== s[k].fs).map((k) => ({ k, from: b[k].fs, to: s[k].fs })).slice(0, 8)
  }
})

fs.writeFileSync(path.join(DATA, 'transition-summary.json'), JSON.stringify(rows, null, 1))

// ---- console digest -------------------------------------------------------
const pad = (s, n) => String(s).padEnd(n).slice(0, n)
console.log('idx  transition                          bnd mv  op  tr  lay vis new gone runPk animSet durs            eases')
for (const r of rows) {
  console.log(
    String(r.id).padStart(3) + ' ' + pad(r.from + '>' + r.to, 32) + ' ' +
    (r.sceneBoundary ? 'B' : ' ') + '  ' +
    String(r.moved).padStart(3) + String(r.opCh).padStart(3) + String(r.trCh).padStart(4) +
    String(r.layCh).padStart(4) + String(r.visCh).padStart(4) + String(r.newEls).padStart(4) +
    String(r.goneEls).padStart(5) + String(r.runningPeak).padStart(5) + String(r.totalAnimsSettled).padStart(7) + ' ' +
    pad(r.durs, 16) + ' ' + pad(r.eases, 40))
}
console.log('---')
console.log('transitions with 0 running anims at settled:', rows.filter((r) => r.runningSettled === 0).length)
console.log('transitions with runningPeak===0            :', rows.filter((r) => r.runningPeak === 0).length)
console.log('transitions with layout mutation           :', rows.filter((r) => r.layCh > 0).length)
console.log('transitions with canvas scroll delta       :', rows.filter((r) => r.canvasDelta !== 'none').length)
console.log('transitions with font-size change          :', rows.filter((r) => r.fontCh.length).length)
console.log('transitions with device count change       :', rows.filter((r) => r.deviceCountBefore !== r.deviceCountAfter).length)