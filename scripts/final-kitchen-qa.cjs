// FINAL KITCHEN V6.0 — QA numérico ejecutable (node, sin navegador).
// Uso: node scripts/final-kitchen-qa.cjs [--out qa-captures/final-kitchen-v6]
// Compila los módulos puros con tsc y ejecuta: cobertura, corredor, contactos,
// blackout, finalRest, navegación, textura Home. Salida: JSON + PASS/PARTIAL.
// QA visual con píxeles reales requiere navegador (se declara por separado).
'use strict'

const { execFileSync } = require('node:child_process')
const fs = require('node:fs')
const path = require('node:path')
const Module = require('node:module')
const os = require('node:os')

const ROOT = path.resolve(__dirname, '..')
process.env.NODE_PATH = path.join(ROOT, 'node_modules')
Module._initPaths()
const BUILD = fs.mkdtempSync(path.join(os.tmpdir(), 'fkqa-'))
const TSC = path.join(ROOT, 'node_modules', 'typescript', 'bin', 'tsc')

const SOURCES = [
  'src/presentation/slides/FinalKitchen/FinalDirector.ts',
  'src/presentation/slides/FinalKitchen/finalQA.ts',
  'src/presentation/slides/FinalKitchen/TechnicianAnimation.ts',
  'src/presentation/slides/FinalKitchen/finalGeometry.ts',
  'src/presentation/slides/FinalKitchen/finalTimings.ts',
  'src/presentation/slides/FinalKitchen/finalState.ts',
  'src/presentation/slides/FinalKitchen/finalDiveBridge.ts',
  'src/presentation/slides/FinalKitchen/homeScreenTexture.ts',
  'src/presentation/slides/S01Chaos/three/s01CinematicConfig.ts',
  'src/presentation/slides/S01Chaos/three/s01Portal.ts',
]

function check(name, cond, detail) {
  return { name, pass: !!cond, detail: detail ?? null }
}

function main() {
  const outDir = process.argv.includes('--out') ? process.argv[process.argv.indexOf('--out') + 1] : 'qa-captures/final-kitchen-v6'
  execFileSync(process.execPath, [TSC, ...SOURCES, '--outDir', BUILD, '--module', 'commonjs', '--target', 'es2020', '--moduleResolution', 'node', '--jsx', 'react-jsx', '--skipLibCheck'], { cwd: ROOT, stdio: 'pipe' })

  const QA = require(path.join(BUILD, 'FinalKitchen', 'finalQA.js'))
  const TA = require(path.join(BUILD, 'FinalKitchen', 'TechnicianAnimation.js'))
  const FD = require(path.join(BUILD, 'FinalKitchen', 'FinalDirector.js'))
  const FT = require(path.join(BUILD, 'FinalKitchen', 'finalTimings.js'))
  const FS = require(path.join(BUILD, 'FinalKitchen', 'finalState.js'))
  const HST = require(path.join(BUILD, 'FinalKitchen', 'homeScreenTexture.js'))

  const results = []

  // S1 — cobertura del primer frame + pérdida medida (no asumida).
  const cov169 = QA.coverageSweep(16 / 9)
  results.push(check('S1.firstFrameCovered', cov169[0].covered === true, cov169.slice(0, 8)))
  const loss169 = QA.firstCoverageLoss(16 / 9)
  results.push(check('S1.lossMeasuredNotAssumed', loss169 !== null && Math.abs(loss169 - 0.85) > 1e-9, { loss169 }))
  results.push(check('S1.lossInPlausibleRange', loss169 !== null && loss169 >= 0.7 && loss169 <= 0.9, { loss169 }))
  results.push(check('S1.endOpen', cov169[cov169.length - 1].covered === false, null))

  // S1 — corredor: despegue = portal distance; tramo con margen.
  const corr = QA.corridorSweep(16 / 9, 64)
  results.push(check('S1.portalDistance sane', corr.minClearance > 0.04 && corr.minClearance < 0.07, corr))
  results.push(check('S1.travelClearance positive', corr.travelClearance > 0.03, corr))
  const pd = QA.portalDistanceQA(16 / 9)
  results.push(check('S1.nearPlaneSafe', pd.distance > pd.near * 2, pd))

  // S1 — duración del travelling.
  results.push(check('S1.diveDuration3100', FT.DIVE_MS === 3100, { DIVE_MS: FT.DIVE_MS }))

  // S3B — contactos del gesto.
  const contact = TA.gestureContactQA(50)
  results.push(check('S3B.tipCoverage>=80%', contact.p1Coverage >= 0.8, { coverage: contact.p1Coverage, maxP1: contact.maxP1Dist }))
  results.push(check('S3B.bakedTipExact', contact.maxBakedTipErr < 0.002, { err: contact.maxBakedTipErr }))
  results.push(check('S3B.kneeGrazesFloor', contact.kneeY >= 0.02 && contact.kneeY <= 0.14, { kneeY: contact.kneeY }))
  results.push(check('S3B.footPlanted', contact.footY >= 0.03 && contact.footY <= 0.12, { footY: contact.footY }))
  results.push(check('S3B.leftHandStable', contact.leftHandErr < 0.02, { err: contact.leftHandErr }))
  results.push(check('S3B.gestureWindow3000', FT.GESTURE_MS >= 2500 && FT.GESTURE_MS <= 3400, { ms: FT.GESTURE_MS }))

  // S2 — finalRest congelado.
  const fr = FD.buildFinalRestFrame()
  const DEG = Math.PI / 180
  results.push(check('S2.fridgeDoorsRest', Math.abs(fr.fBot - 50 * DEG) < 1e-9 && Math.abs(fr.fTop - 12 * DEG) < 1e-9, { fBot: fr.fBot, fTop: fr.fTop }))
  results.push(check('S2.doc3Override', fr.docs[2].p[0] === 0.68 && fr.docs[2].p[1] === 0.0035 && fr.docs[2].p[2] === -1.62, fr.docs[2]))
  results.push(check('S2.manualOverride', fr.docs[8].p[0] === 0.95 && fr.docs[8].p[2] === -1.5, fr.docs[8]))
  results.push(check('S2.appleOverride', fr.apple.p[0] === 0.62 && fr.apple.p[1] === 0.045, fr.apple))
  results.push(check('S2.eggBOverride', fr.eggB.p[0] === 0.78 && fr.eggB.p[2] === -1.95, fr.eggB))
  results.push(check('S2.allDocsVisible', fr.docs.every((d) => d.v === 1), null))
  results.push(check('S2.smokeZero', fr.smoke.every((s) => s.o === 0), null))
  results.push(check('S2.drawerOpen', Math.abs(fr.drawer - 0.24) < 1e-9, { drawer: fr.drawer }))
  results.push(check('S2.policyOnStack', Math.abs(fr.policy.p[0] - -0.13) < 1e-9 && fr.policy.p[1] > 0.04, fr.policy))

  // S4 — apagado: W14 todo cero + blackout 1; fases monótonas.
  const bo = QA.blackoutExpectation()
  results.push(check('S4.w14AllZero', bo.allLightsZero === true, bo.lights))
  results.push(check('S4.w14Blackout1', bo.blackout === 1, null))
  const vp = { width: 1280, height: 720, aspect: 16 / 9 }
  const w09 = FD.finalDirector.evaluateFinalFrame('W09', 9999, vp, true, false)
  results.push(check('S4.w09ScreenOn', Math.abs(w09.lights.screen - 1) < 1e-9, { screen: w09.lights.screen }))
  results.push(check('S4.w09OthersZero', w09.lights.spot === 0 && w09.lights.ambient === 0 && w09.lights.hemi === 0, null))
  results.push(check('S4.twoManualTaps', FT.FINAL_BEATS.slice(-3).join(',') === 'W08,W09,W14' && FT.FINAL_BEAT_DEFS.W09.moveMs === 3000 && FT.FINAL_BEAT_DEFS.W14.moveMs === 600, FT.FINAL_BEATS))
  const w08 = FD.finalDirector.evaluateFinalFrame('W08', 9999, vp, true, false)
  results.push(check('S4.w08Full', Object.values(w08.lights).every((v) => v === 1), null))
  const wide = FD.sampleUndiveAt(0, vp.aspect).pos
  results.push(check('S4.camLockedW08_W14', ['W08', 'W09', 'W14'].every((b) => {
    const f = FD.finalDirector.evaluateFinalFrame(b, 9999, vp, true, false)
    return f.camPos.every((v, i) => v === wide[i])
  }), null))

  // Navegación: W01→(interno)W02 sin NEXT; holds estables; retroceso.
  results.push(check('S5.w02NoNext', FT.FINAL_BEAT_DEFS.W02.needsNext === false, null))
  results.push(check('S5.w01StartsDive', FT.FINAL_BEAT_DEFS.W01.needsNext === true && FT.FINAL_BEAT_DEFS.W01.moveMs === 3100, null))
  const w02 = FD.finalDirector.evaluateFinalFrame('W02', 9999, vp, true, false)
  results.push(check('S5.diveEndsAtWide', w02.camPos.every((v, i) => v === wide[i]) && w02.phase === 'stable', w02.camPos))
  const w01mid = FD.finalDirector.evaluateFinalFrame('W01', 1550, vp, true, false)
  results.push(check('S5.diveMidTransition', w01mid.phase === 'transition' && w01mid.qa.diveP !== null && Math.abs(w01mid.qa.diveP - 0.5) < 0.01, w01mid.qa))
  results.push(check('S5.prevFromW02GoesW00noreplay', FS.finalPrev({ beat: 'W02', localTime: 0 }).beat === 'W00', null))
  results.push(check('S5.nextDuringTransitionIgnored', (() => {
    // El guard vive en el canvas; aquí se verifica la primitiva pura.
    const s = FS.finalNext({ beat: 'W06', localTime: 0 }, false)
    return s.beat === 'W06'
  })(), null))
  // Determinismo: dos evaluaciones idénticas.
  const f1 = FD.finalDirector.evaluateFinalFrame('W06', 1200, vp, true, false)
  const f2 = FD.finalDirector.evaluateFinalFrame('W06', 1200, vp, true, false)
  results.push(check('S5.deterministic', JSON.stringify(f1) === JSON.stringify(f2), null))

  // S1 — textura Home congelada (sin DOM: metadatos puros).
  const hqa = HST.homeScreenQA()
  results.push(check('S1.homeFrozenState', hqa.frozenState.complete === true && hqa.frozenState.focus === null
    && hqa.frozenState.date === 'Domingo, 16 de agosto', hqa.frozenState))
  results.push(check('S1.homeAspect', Math.abs(hqa.texW / hqa.texH - 0.066 / 0.142) < 0.002, { texW: hqa.texW, texH: hqa.texH }))
  results.push(check('S1.homeNoDeform', hqa.flipY === true && hqa.coverCropPerSide > 0 && hqa.coverCropPerSide < 0.05, { crop: hqa.coverCropPerSide }))

  const failed = results.filter((r) => !r.pass)
  const report = {
    suite: 'final-kitchen-v6 math QA',
    date: new Date().toISOString(),
    pass: failed.length === 0,
    failedCount: failed.length,
    total: results.length,
    results,
  }
  const abs = path.resolve(ROOT, outDir)
  fs.mkdirSync(abs, { recursive: true })
  fs.writeFileSync(path.join(abs, 'qa-math.json'), JSON.stringify(report, null, 2))
  for (const r of results) console.log(`${r.pass ? 'PASS' : 'FAIL'}  ${r.name}${r.pass ? '' : '  ' + JSON.stringify(r.detail)}`)
  console.log(`\n${report.total - report.failedCount}/${report.total} PASS → ${path.join(outDir, 'qa-math.json')}`)
  process.exit(failed.length === 0 ? 0 : 1)
}

main()
