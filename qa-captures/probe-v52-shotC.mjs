// PROBE V5.2 SLICE C — dos poses:
// 1) A_FRIDGE_FULL (§06A): heladera completa antes del golpe — fridge+puerta
//    contenidos en X 480–980, top+base+piso visibles, altura 70–79%.
// 2) A_DOCS (§06F): documental protagonista — grupo dentro de X 245–1030,
//    Y 200–640, mesa reconocible, varios encabezados.
import * as THREE from 'three'

const W = 1280
const H = 720
const FOV = 36
const ASPECT = W / H

function mkCam(pos, target) {
  const cam = new THREE.PerspectiveCamera(FOV, ASPECT, 0.015, 40)
  cam.position.set(...pos)
  cam.lookAt(new THREE.Vector3(...target))
  cam.updateMatrixWorld()
  return cam
}
function px(cam, p) {
  const v = new THREE.Vector3(...p).project(cam)
  return { x: (v.x * 0.5 + 0.5) * W, y: (-v.y * 0.5 + 0.5) * H }
}
function bb(cam, pts) {
  const q = pts.map((p) => px(cam, p))
  const xs = q.map((r) => r.x)
  const ys = q.map((r) => r.y)
  return { x0: Math.min(...xs), x1: Math.max(...xs), y0: Math.min(...ys), y1: Math.max(...ys) }
}

// ---------------- 1) A_FRIDGE_FULL ----------------
// heladera V5.2: x 1.325..2.175, y 0..1.85, frente -1.98; puerta 42°:
// edge (1.543, -1.451); apple land (1.55,-1.2); humo (1.7,1.8,-2.7)
const fridgePts = {
  topL: [1.325, 1.85, -2.0],
  topR: [2.175, 1.85, -2.0],
  botL: [1.325, 0.0, -1.98],
  botR: [2.175, 0.0, -1.98],
  doorEdge: [1.543, 0.66, -1.451],
  apple: [1.55, 0.05, -1.2],
  smoke: [1.7, 1.8, -2.7],
}
const full = []
for (let cx = 1.1; cx <= 1.8; cx += 0.05) {
  for (let cy = 1.25; cy <= 1.6; cy += 0.05) {
    for (let cz = 2.0; cz <= 2.7; cz += 0.05) {
      const cam = mkCam([cx, cy, cz], [1.78, 0.85, -2.1])
      const b = bb(cam, [fridgePts.topL, fridgePts.topR, fridgePts.botL, fridgePts.botR])
      const bh = (b.y1 - b.y0) / H
      if (bh < 0.7 || bh > 0.79) continue
      // franja de piso: base proyectada con ≥70px de aire debajo
      if (b.y1 < H - 70) continue
      // top visible con aire
      if (b.y0 < 60 || b.y0 > 200) continue
      // fridge+door contenidos en X 480–980
      const de = px(cam, fridgePts.doorEdge)
      if (de.x < 480 || de.x > 1010) continue
      if (b.x1 > 980) continue
      // centro del cuerpo a la derecha del centro óptico pero protagonista
      const bcx = (b.x0 + b.x1) / 2
      if (bcx < 600 || bcx > 800) continue
      // manzana y humo en frame
      const ap = px(cam, fridgePts.apple)
      const sm = px(cam, fridgePts.smoke)
      if (ap.x < 70 || ap.x > 1210 || ap.y < 50 || ap.y > 670) continue
      if (sm.x < 70 || sm.x > 1210 || sm.y < 50 || sm.y > 670) continue
      full.push({ cx: +cx.toFixed(2), cy: +cy.toFixed(2), cz: +cz.toFixed(2), bh: +bh.toFixed(3), x0: Math.round(b.x0), x1: Math.round(b.x1), y0: Math.round(b.y0), y1: Math.round(b.y1), doorEdgeX: Math.round(de.x), appleX: Math.round(ap.x), smokeY: Math.round(sm.y) })
    }
  }
}
full.sort((a, b) => Math.abs(a.bh - 0.745) - Math.abs(b.bh - 0.745))
console.log('A_FRIDGE_FULL candidatos (top 8):')
full.slice(0, 8).forEach((r) => console.log(JSON.stringify(r)))

// ---------------- 2) A_DOCS ----------------
// isla: mesada x -1.575..0.875, z -0.875..0.175, top y 0.915.
// 6 hojas zona A (spread): aprox x -0.55..0.5, z -0.65..0.0, y 0.923
// póliza en (-0.05, 0.925, -0.38); teléfono (0.1, 0.915, -0.02) puede salir.
const docPts = [
  [-0.45, 0.923, -0.15],
  [-0.52, 0.923, -0.52],
  [0.22, 0.923, -0.55],
  [0.44, 0.923, -0.3],
  [0.15, 0.923, -0.06],
  [0.05, 0.923, -0.62],
]
const sheet = (c) => [
  [c[0] - 0.11, 0.923, c[2] - 0.15],
  [c[0] + 0.11, 0.923, c[2] + 0.15],
]
const allDocPts = docPts.flatMap(sheet)
const docs = []
for (let d = 1.15; d <= 1.9; d += 0.05) {
  for (let elev = 40; elev <= 62; elev += 2) {
    for (let azim = 12; azim <= 40; azim += 2) {
      const e = (elev * Math.PI) / 180
      const a = (azim * Math.PI) / 180
      const tgt = [-0.05, 0.92, -0.32]
      const pos = [tgt[0] - d * Math.cos(e) * Math.sin(a), tgt[1] + d * Math.sin(e), tgt[2] + d * Math.cos(e) * Math.cos(a)]
      const cam = mkCam(pos, tgt)
      const b = bb(cam, allDocPts)
      // grupo principal dentro de X 245–1030, Y 200–640
      if (b.x0 < 245 || b.x1 > 1030 || b.y0 < 200 || b.y1 > 640) continue
      const bw = (b.x1 - b.x0) / W
      const bh = (b.y1 - b.y0) / H
      if (bw < 0.4) continue
      // póliza visible (no cubierta): su bbox dentro de frame
      const pb = bb(cam, [
        [-0.19, 0.925, -0.56],
        [0.09, 0.925, -0.2],
      ])
      if (pb.x0 < 70 || pb.x1 > 1210 || pb.y0 < 50 || pb.y1 > 670) continue
      docs.push({ d, elev, azim, bw: +bw.toFixed(2), bh: +bh.toFixed(2), pos: pos.map((v) => +v.toFixed(3)), x0: Math.round(b.x0), x1: Math.round(b.x1), y0: Math.round(b.y0), y1: Math.round(b.y1) })
    }
  }
}
docs.sort((a, b) => b.bw - a.bw)
console.log('\nA_DOCS candidatos (top 8):')
docs.slice(0, 8).forEach((r) => console.log(JSON.stringify(r)))
if (!docs.length) console.log('A_DOCS: SIN CANDIDATOS')
