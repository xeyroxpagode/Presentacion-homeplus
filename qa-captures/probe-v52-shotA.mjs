// PROBE V5.2 SLICE A — resuelve la pose de A_INSURANCE por proyección real.
// Reproduce la hoja superior de la póliza (0.27 x 0.36, yaw 0.1), el sello
// VENCIDO (sub-rect del tercio central) y las llaves, y busca (d, elev, azim)
// que cumplan los targets de composición 1280x720 del contrato §04:
//   - centro hoja ~ (640, 365) ±25 px
//   - bbox hoja ~ X 410–870 (ancho 460 ±8%), Y 175–600 (alto 425 ±8%)
//   - llaves dentro de X 280–430, Y 425–550
//   - sello dentro de la hoja, sin solaparse con llaves
import * as THREE from 'three'

const W = 1280
const H = 720
const FOV = 36
const ASPECT = W / H

// --- mundo (espejo de s01Geo.policy + llaves) ---
const POLICY_CENTER = new THREE.Vector3(-0.05, 0.9255, -0.38)
const POLICY_SIZE = { x: 0.27, z: 0.36 } // +12.5% sobre 0.24x0.32
const POLICY_YAW = 0.1
// sello: 65% del ancho, 15% del alto de hoja, tercio central (canvas y ~470/1360)
const STAMP = { halfX: (0.65 * POLICY_SIZE.x) / 2, halfZ: (0.15 * POLICY_SIZE.z) / 2, cz: -0.03 }

function sheetCorners() {
  const cs = Math.cos(POLICY_YAW)
  const sn = Math.sin(POLICY_YAW)
  const hx = POLICY_SIZE.x / 2
  const hz = POLICY_SIZE.z / 2
  const local = [
    [hx, hz],
    [hx, -hz],
    [-hx, -hz],
    [-hx, hz],
  ]
  return local.map(([x, z]) => new THREE.Vector3(POLICY_CENTER.x + x * cs + z * sn, POLICY_CENTER.y, POLICY_CENTER.z - x * sn + z * cs))
}

function stampCorners() {
  const cs = Math.cos(POLICY_YAW)
  const sn = Math.sin(POLICY_YAW)
  const local = [
    [STAMP.halfX, STAMP.cz + STAMP.halfZ],
    [STAMP.halfX, STAMP.cz - STAMP.halfZ],
    [-STAMP.halfX, STAMP.cz - STAMP.halfZ],
    [-STAMP.halfX, STAMP.cz + STAMP.halfZ],
  ]
  return local.map(([x, z]) => new THREE.Vector3(POLICY_CENTER.x + x * cs + z * sn, POLICY_CENTER.y + 0.001, POLICY_CENTER.z - x * sn + z * cs))
}

function makeCamera(d, elevDeg, azimDeg) {
  const elev = (elevDeg * Math.PI) / 180
  const azim = (azimDeg * Math.PI) / 180
  const pos = new THREE.Vector3(
    POLICY_CENTER.x - d * Math.cos(elev) * Math.sin(azim),
    POLICY_CENTER.y + d * Math.sin(elev),
    POLICY_CENTER.z + d * Math.cos(elev) * Math.cos(azim),
  )
  const cam = new THREE.PerspectiveCamera(FOV, ASPECT, 0.015, 40)
  cam.position.copy(pos)
  cam.lookAt(POLICY_CENTER)
  cam.updateMatrixWorld()
  return { cam, pos }
}

function px(cam, p) {
  const v = p.clone().project(cam)
  return { x: (v.x * 0.5 + 0.5) * W, y: (-v.y * 0.5 + 0.5) * H, z: v.z }
}

function bbox2d(cam, pts) {
  const q = pts.map((p) => px(cam, p))
  const xs = q.map((r) => r.x)
  const ys = q.map((r) => r.y)
  return { x0: Math.min(...xs), x1: Math.max(...xs), y0: Math.min(...ys), y1: Math.max(...ys), cx: (Math.min(...xs) + Math.max(...xs)) / 2, cy: (Math.min(...ys) + Math.max(...ys)) / 2 }
}

function keysBox(center) {
  const c = new THREE.Vector3(...center)
  const hx = 0.055
  const hy = 0.016
  const hz = 0.032
  return [
    c.clone().add(new THREE.Vector3(-hx, 0, -hz)),
    c.clone().add(new THREE.Vector3(hx, hy, hz)),
  ].map((p) => p)
}

// targets del contrato
const T_BBOX = { x0: 410, x1: 870, y0: 175, y1: 600 }
const T_CENTER = { x: 640, y: 365 }

const results = []
const sheet = sheetCorners()
const stamp = stampCorners()

for (let d = 0.7; d <= 1.3; d += 0.02) {
  for (let elev = 34; elev <= 56; elev += 1) {
    for (let azim = 6; azim <= 50; azim += 1) {
      const { cam } = makeCamera(d, elev, azim)
      const b = bbox2d(cam, sheet)
      const bw = b.x1 - b.x0
      const bh = b.y1 - b.y0
      // anchura visual 36–42% del viewport (§04: 460–538 px)
      if (bw < 460 || bw > 538) continue
      // alto objetivo 425 ±8%: 391–459
      if (bh < 391 || bh > 459) continue
      // centro ±25 px
      if (Math.abs(b.cx - T_CENTER.x) > 25 || Math.abs(b.cy - T_CENTER.y) > 25) continue
      // márgenes de seguridad (70–1210 / 50–670) — ya implícitos, reforzamos
      if (b.x0 < 70 || b.x1 > 1210 || b.y0 < 50 || b.y1 > 670) continue
      const err = Math.abs(bw - 460) / 460 + Math.abs(bh - 425) / 425 + Math.abs(b.cx - T_CENTER.x) / 25 * 0.3 + Math.abs(b.cy - T_CENTER.y) / 25 * 0.3
      results.push({ d, elev, azim, bw: Math.round(bw), bh: Math.round(bh), cx: Math.round(b.cx), cy: Math.round(b.cy), x0: Math.round(b.x0), x1: Math.round(b.x1), y0: Math.round(b.y0), y1: Math.round(b.y1), err: +err.toFixed(4) })
    }
  }
}

results.sort((a, b) => a.err - b.err)
console.log('candidatos (top 12):')
for (const r of results.slice(0, 12)) console.log(JSON.stringify(r))

if (results.length) {
  const best = results[0]
  const { cam, pos } = makeCamera(best.d, best.elev, best.azim)
  console.log('\nMEJOR POSE -> pos', pos.toArray().map((v) => +v.toFixed(3)), 'target', POLICY_CENTER.toArray())
  const sb = bbox2d(cam, stamp)
  console.log('sello proyectado:', JSON.stringify({ x0: Math.round(sb.x0), x1: Math.round(sb.x1), y0: Math.round(sb.y0), y1: Math.round(sb.y1) }))
  // búsqueda de posición de llaves: X 280–430, Y 425–550, sin tocar sello
  console.log('\nkeys candidates (X 280–430, Y 425–550):')
  const found = []
  for (let kx = -0.62; kx <= -0.18; kx += 0.01) {
    for (let kz = -0.62; kz <= 0.1; kz += 0.01) {
      const kb = bbox2d(cam, keysBox([kx, 0.915, kz]))
      if (kb.x0 < 260 || kb.x1 > 450 || kb.y0 < 405 || kb.y1 > 570) continue
      const overlap = !(kb.x1 < sb.x0 || kb.x0 > sb.x1 || kb.y1 < sb.y0 || kb.y0 > sb.y1)
      if (overlap) continue
      found.push({ kx: +kx.toFixed(2), kz: +kz.toFixed(2), x0: Math.round(kb.x0), x1: Math.round(kb.x1), y0: Math.round(kb.y0), y1: Math.round(kb.y1) })
    }
  }
  console.log(found.length ? found.slice(0, 10).map((f) => JSON.stringify(f)).join('\n') : 'NINGUNA — ampliar búsqueda')
  // mapa ground→pantalla para entender la zona izquierda del encuadre
  console.log('\nground map (x, z -> px):')
  for (const kx of [-0.6, -0.5, -0.4, -0.3, -0.2]) {
    const row = []
    for (const kz of [-0.7, -0.55, -0.4, -0.25, -0.1, 0.05]) {
      const q = px(cam, new THREE.Vector3(kx, 0.915, kz))
      row.push(`(${kx},${kz})->${Math.round(q.x)},${Math.round(q.y)}`)
    }
    console.log(row.join('  '))
  }
  // qué más cae en encuadre: teléfono, bowl, carpeta, pila
  for (const [name, p, r] of [
    ['phone', [0.1, 0.915, -0.02], 0.08],
    ['bowl', [-1.26, 0.95, -0.5], 0.12],
    ['folder', [-0.1, 0.92, -0.4], 0.16],
    ['stack', [-0.18, 0.92, -0.44], 0.14],
  ]) {
    const b = bbox2d(cam, keysBox([p[0], p[1], p[2]]).map((q) => new THREE.Vector3(q.x, q.y, q.z)))
    console.log(name, JSON.stringify({ x0: Math.round(b.x0), x1: Math.round(b.x1), y0: Math.round(b.y0), y1: Math.round(b.y1) }))
  }
} else {
  console.log('SIN CANDIDATOS — relajar restricciones')
}
