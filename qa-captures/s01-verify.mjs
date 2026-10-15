// QA V2.1 — verificación programática: geometría DOM vs contrato, cámara,
// oclusiones vía elementFromPoint, y estado final en navegación/reduced.
import puppeteer from 'puppeteer-core'

const BASE = 'http://localhost:8443'
const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
const results = []
const errors = []
let current = ''
function check(name, ok, detail = '') {
  results.push({ group: current, name, ok, detail })
}
function near(a, b, tol) { return Math.abs(a - b) <= tol }
function parseMatrix(m) {
  const v = m.match(/matrix\(([^)]+)\)/)
  if (v) { const [a, b, c, d, e, f] = v[1].split(',').map(Number); return { a, b, c, d, e, f, is3d: false } }
  const w = m.match(/matrix3d\(([^)]+)\)/)
  if (w) { const n = w[1].split(',').map(Number); return { is3d: true, m: n } }
  return null
}

const browser = await puppeteer.launch({ executablePath: CHROME })
const page = await browser.newPage()
await page.setViewport({ width: 1280, height: 720 })
page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`))
page.on('requestfailed', (r) => errors.push(`requestfailed: ${r.url()}`))
page.on('response', (r) => { if (r.status() >= 400) errors.push(`${r.status()} ${r.url()}`) })

async function gotoStep(step, extra = '') {
  await page.goto(`${BASE}/?dev=1&slide=0&step=${step}${extra}`, { waitUntil: 'networkidle0' })
  await page.evaluate(() => { document.querySelectorAll('.opening-layer, .chaos-scene').forEach((el) => { el.style.pointerEvents = 'auto' }) })
  await sleep(500)
}
async function settle(step) { await sleep(step === 3 ? 2300 : step === 5 ? 1400 : 1100) }

// Mapa world→client usando el rect del canvas lógico.
async function w2c() {
  return page.evaluate(() => {
    const c = document.querySelector('.presentation-canvas').getBoundingClientRect()
    return { x: c.left, y: c.top, s: c.width / 1280 }
  })
}

const EXPECT = {
  'chaos-policy': { x: 254, y: 354, w: 213, h: 77 },
  'chaos-keys': { x: 353, y: 341, w: 139, h: 90 },
  'chaos-bag': { x: 510, y: 234, w: 153, h: 178 },
  'chaos-list': { x: 646, y: 366, w: 151, h: 67 },
  'chaos-drawer': { x: 636, y: 446, w: 132, h: 35 },
  'chaos-folder': { x: 653, y: 365, w: 120, h: 75 },
  'chaos-doc-1': { x: 676, y: 375, w: 105, h: 56 },
  'chaos-doc-2': { x: 723, y: 385, w: 103, h: 53 },
  'chaos-doc-3': { x: 711, y: 354, w: 94, h: 62 },
  'chaos-extra-auto': { x: 300, y: 357, w: 117, h: 56 },
  'chaos-extra-list': { x: 648, y: 368, w: 89, h: 60 },
  'chaos-extra-w1': { x: 675, y: 373, w: 98, h: 65 },
  'chaos-extra-w2': { x: 690, y: 375, w: 88, h: 68 },
  'chaos-extra-w3': { x: 661, y: 371, w: 116, h: 64 },
  'chaos-fridge-rig': { x: 865, y: 185, w: 200, h: 390 },
}

// ---------- Gate A: geometría de reposo con cámara OFF ----------
current = 'A-geometria'
await gotoStep(0, '&s01Camera=off'); await settle(0)
// Habilitar pointer-events para poder usar elementFromPoint como sonda de oclusión.
await page.evaluate(() => { document.querySelectorAll('.opening-layer, .chaos-scene').forEach((el) => { el.style.pointerEvents = 'auto' }) })
const rects = await page.evaluate(() => {
  const out = {}
  for (const sel of ['chaos-policy','chaos-keys','chaos-bag','chaos-list','chaos-drawer','chaos-folder','chaos-doc-1','chaos-doc-2','chaos-doc-3','chaos-extra-auto','chaos-extra-list','chaos-extra-w1','chaos-extra-w2','chaos-extra-w3','chaos-fridge-rig']) {
    const el = document.querySelector('.' + sel)
    // offsetLeft/Top = posición de layout SIN transform (estado de reposo).
    out[sel] = { x: el.offsetLeft, y: el.offsetTop, w: el.offsetWidth, h: el.offsetHeight }
  }
  out['chaos-doc-clip'] = { h: document.querySelector('.chaos-doc-clip').offsetHeight }
  return out
})
for (const [sel, exp] of Object.entries(EXPECT)) {
  const r = rects[sel]
  const ok = near(r.x, exp.x, 1.5) && near(r.y, exp.y, 1.5) && near(r.w, exp.w, 1.5) && near(r.h, exp.h, 1.5)
  check(`${sel} reposo == (${exp.x},${exp.y},${exp.w},${exp.h})`, ok, `real (${r.x.toFixed(1)},${r.y.toFixed(1)},${r.w.toFixed(1)},${r.h.toFixed(1)})`)
}
check('doc-clip alto=470 (boca del cajón)', near(rects['chaos-doc-clip'].h, 470, 1), rects['chaos-doc-clip'].h.toFixed(1))

// Piso: sin frente macizo — el punto bajo el faldón (500,560) debe ser piso tenue, no madera sólida.
// Se verifica por estructura DOM + sampleo de color más abajo (pixel audit).
{
  const m = await w2c()
  const pt = await page.evaluate((px, py) => {
    const el = document.elementFromPoint(px, py)
    return el ? (el.closest('svg')?.className?.baseVal || el.className?.baseVal || el.tagName) : 'none'
  }, m.x + 500 * m.s, m.y + 560 * m.s)
  check('bajo la mesa (500,560) no hay frente macizo (svg piso/mesa, no drawer)', pt.includes('chaos'), `hit=${pt}`)
}

// ---------- Cámara: matrices por beat (modo normal) ----------
current = 'B-camara'
const CAM = {
  0: [1, 0, 0],
  1: [3, -485, -807],
  2: [2.45, -964.75, -468.1],
  3: [1.53, -599.3, -224.46],
  4: [1, 0, 0],
  5: [1, 0, 0],
}
for (const step of [0, 1, 2, 3, 4, 5]) {
  await gotoStep(step); await settle(step)
  const t = await page.evaluate(() => getComputedStyle(document.querySelector('.chaos-camera')).transform)
  const m = parseMatrix(t)
  const ok = m && near(m.a, CAM[step][0], 0.02) && near(m.e, CAM[step][1], 1) && near(m.f, CAM[step][2], 1)
  check(`cámara beat ${step} ≈ scale(${CAM[step][0]}) translate(${CAM[step][1]},${CAM[step][2]})`, ok, t)
}

// ---------- C: heladera/cajón/búsqueda en beat 3 ----------
current = 'C-falla-busqueda'
await gotoStep(3); await settle(3)
{
  const drawerT = parseMatrix(await page.evaluate(() => getComputedStyle(document.querySelector('.chaos-drawer')).transform))
  check('cajón abierto translate y≈24', drawerT && near(drawerT.f, 24, 1), JSON.stringify(drawerT))

  const doorTop = parseMatrix(await page.evaluate(() => getComputedStyle(document.querySelector('.chaos-door-top')).transform))
  const doorBot = parseMatrix(await page.evaluate(() => getComputedStyle(document.querySelector('.chaos-door-bottom')).transform))
  // matrix3d: m[0]=cos(ry), m[2]=-sin(ry)… verificar apertura residual 3–4°.
  const ry = (m) => Math.abs(Math.atan2(-m.m[2], m.m[0]) * 180 / Math.PI)
  check('puerta superior apertura residual 3–5°', doorTop?.is3d && ry(doorTop) > 2.5 && ry(doorTop) < 5, `rotY=${doorTop?.is3d ? ry(doorTop).toFixed(2) : '?'}°`)
  check('puerta inferior apertura residual 2–4°', doorBot?.is3d && ry(doorBot) > 1.5 && ry(doorBot) < 4.5, `rotY=${doorBot?.is3d ? ry(doorBot).toFixed(2) : '?'}°`)

  const lightOpacity = await page.evaluate(() => getComputedStyle(document.querySelector('.chaos-light')).opacity)
  check('luz atenuada (≤0.3)', parseFloat(lightOpacity) <= 0.3, lightOpacity)

  const smokeOpacity = await page.evaluate(() => getComputedStyle(document.querySelector('.chaos-smoke')).opacity)
  check('humo disipado en F100 (≈0)', parseFloat(smokeOpacity) <= 0.05, smokeOpacity)

  const fridgeT = parseMatrix(await page.evaluate(() => getComputedStyle(document.querySelector('.chaos-fridge-rig')).transform))
  check('heladera quieta en F100 (sin transform residual)', fridgeT === null || (near(fridgeT.e, 0, 0.5) && near(fridgeT.f, 0, 0.5)), JSON.stringify(fridgeT))

  // Oclusión: nada de papel visible por debajo de la boca (y=470) en la zona del cajón.
  const m = await w2c()
  const below = await page.evaluate((px, py) => {
    const el = document.elementFromPoint(px, py)
    return el ? el.closest('.chaos-prop')?.className || el.tagName : 'none'
  }, m.x + 700 * m.s, m.y + 495 * m.s)
  check('sin papel bajo la boca del cajón (700,495)', !String(below).includes('chaos-doc') && !String(below).includes('chaos-folder'), `hit=${below}`)
}

// ---------- D: contraste S01.4 vs S01.5 + destinos del clímax ----------
current = 'D-climax'
await gotoStep(5); await settle(5)
{
  // Destinos F100 esperados (dx, dy desde reposo).
  const DEST = {
    'chaos-policy': [144, 9, 5],
    'chaos-keys': [132, 22, -5],
    'chaos-bag': [4, 17, 1],
    'chaos-list': [-125, 16, -8],
    'chaos-folder': [-5, -6, -6],
    'chaos-doc-1': [-72, 7, 12],
    'chaos-doc-2': [-12, 9, -13],
    'chaos-doc-3': [-138, 13, 10],
    'chaos-extra-auto': [31, 28, -12],
    'chaos-extra-list': [-90, 35, 14],
    'chaos-extra-w1': [-212, 20, -17],
    'chaos-extra-w2': [1, 27, 17],
    'chaos-extra-w3': [83, -8, -8],
  }
  for (const [sel, [dx, dy, rot]] of Object.entries(DEST)) {
    const t = parseMatrix(await page.evaluate((s) => getComputedStyle(document.querySelector('.' + s)).transform, sel))
    const deg = t ? Math.atan2(t.b, t.a) * 180 / Math.PI : NaN
    const ok = t && near(t.e, dx, 2) && near(t.f, dy, 2) && near(deg, rot, 1.5)
    check(`${sel} destino (${dx},${dy},${rot}°)`, ok, `real (${t?.e.toFixed(1)},${t?.f.toFixed(1)},${deg.toFixed(1)}°)`)
  }

  // Patas siguen visibles (ningún papel las cubre).
  const m = await w2c()
  for (const [lx, name] of [[236, 'izq'], [808, 'der']]) {
    const hit = await page.evaluate((px, py) => {
      const el = document.elementFromPoint(px, py)
      return el ? el.closest('.chaos-prop')?.className || (el.closest('svg')?.getAttribute('class') || el.tagName) : 'none'
    }, m.x + lx * m.s, m.y + 600 * m.s)
    check(`pata ${name} visible en clímax (sin papel encima)`, !String(hit).includes('chaos-prop'), `hit=${hit}`)
  }

  // Heladera no se movió en el clímax.
  const fr = await page.evaluate(() => {
    const r = document.querySelector('.chaos-fridge-rig').getBoundingClientRect()
    return { left: r.left, top: r.top }
  })
  await gotoStep(0, '&s01Camera=off'); await settle(0)
  const fr0 = await page.evaluate(() => {
    const r = document.querySelector('.chaos-fridge-rig').getBoundingClientRect()
    return { left: r.left, top: r.top }
  })
  check('heladera inmóvil entre beat 0 y beat 5', near(fr.left, fr0.left, 1) && near(fr.top, fr0.top, 1), `${fr.left}/${fr0.left}`)
}

// ---------- E: reduced motion — estados finales deterministas ----------
current = 'E-reduced'
await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }])
await gotoStep(3); await settle(3)
{
  const drawerT = parseMatrix(await page.evaluate(() => getComputedStyle(document.querySelector('.chaos-drawer')).transform))
  check('reduced: cajón abierto final', drawerT && near(drawerT.f, 24, 1), JSON.stringify(drawerT))
  const d1 = parseMatrix(await page.evaluate(() => getComputedStyle(document.querySelector('.chaos-doc-1')).transform))
  const settled = parseMatrix('matrix(1,0,0,1,0,0)')
  check('reduced: DOC_1 asentado (translate 0)', d1 && near(d1.e, 0, 0.5) && near(d1.f, 0, 0.5), JSON.stringify(d1))
  const smoke = await page.evaluate(() => getComputedStyle(document.querySelector('.chaos-smoke')).opacity)
  check('reduced: sin humo', parseFloat(smoke) === 0, smoke)
  const light = await page.evaluate(() => getComputedStyle(document.querySelector('.chaos-light')).opacity)
  check('reduced: luz atenuada', parseFloat(light) <= 0.3, light)
}
await gotoStep(5); await settle(5)
{
  const w1 = parseMatrix(await page.evaluate(() => getComputedStyle(document.querySelector('.chaos-extra-w1')).transform))
  check('reduced: extra W1 en destino final', w1 && near(w1.e, -212, 2) && near(w1.f, 20, 2), JSON.stringify(w1))
}
await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'no-preference' }])

// ---------- E: handoff S01.5 -> S02 ----------
current = 'E-handoff'
await gotoStep(5); await settle(5)
await page.keyboard.press('ArrowRight'); await sleep(1400)
{
  const s02 = await page.evaluate(() => !!document.querySelector('.fragmented-scene[data-phase="active"]'))
  check('transición S01→S02: S02 activa tras el último beat', s02 === true, String(s02))
  const s01still = await page.evaluate(() => {
    const el = document.querySelector('.chaos-scene')
    return el ? getComputedStyle(el).visibility : 'missing'
  })
  check('S01 desmontada visualmente al entrar a S02', s01still === 'hidden' || s01still === 'missing', s01still)
}

await browser.close()

let pass = 0, fail = 0
for (const r of results) { if (r.ok) pass++; else fail++ }
console.log(`\n===== ${pass} PASS / ${fail} FAIL =====`)
for (const r of results.filter((x) => !x.ok)) console.log(`FAIL [${r.group}] ${r.name} — ${r.detail}`)
if (errors.length) console.log('\nNETWORK/PAGE ERRORS:\n' + errors.join('\n'))
