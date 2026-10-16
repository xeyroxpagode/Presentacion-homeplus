// PROBE V5.2 SLICE B-fix — A_FRIDGE_SIDE izquierda CON TEST DE OCLUSIÓN.
// Requisito de dirección (feedback en vivo): se ven TODOS los alimentos
// (manzana en bin de puerta, 2 huevos en bandeja, botella en estante),
// la cavidad y el cuerpo; la hoja de la puerta abierta NO tapa nada.
import * as THREE from 'three'

const W = 1280
const H = 720
const FOV = 36
const ASPECT = W / H

const DEG = Math.PI / 180
const TH = 42 * DEG
const HINGE = [2.175, -2.02]
const DIR = [-Math.cos(TH), Math.sin(TH)] // hacia el borde libre
const N = [Math.sin(TH), Math.cos(TH)] // normal de la hoja (lado cámara)
const LEAF_LEN = 0.85
const LEAF_Y = [0, 1.325]

// occluders: caja de cuerpo sólido, pared lateral izq, puerta superior cerrada
const AABBS = [
  [1.325, 0, -2.68, 2.175, 1.85, -2.38], // cuerpo sólido
  [1.325, 0, -2.38, 1.385, 1.85, -2.02], // pared lateral izquierda de cavidad
  [1.325, 1.325, -2.02, 2.175, 1.85, -1.975], // puerta superior (cerrada)
]

function segAABB(p0, p1, box) {
  // slab method: ¿el segmento p0->p1 intersecta la caja?
  let t0 = 0
  let t1 = 1
  for (let i = 0; i < 3; i++) {
    const d = p1[i] - p0[i]
    if (Math.abs(d) < 1e-9) {
      if (p0[i] < box[i] || p0[i] > box[i + 3]) return false
      continue
    }
    let a = (box[i] - p0[i]) / d
    let b = (box[i + 3] - p0[i]) / d
    if (a > b) [a, b] = [b, a]
    t0 = Math.max(t0, a)
    t1 = Math.min(t1, b)
    if (t0 > t1) return false
  }
  return true
}

function segLeaf(p0, p1) {
  // intersección del segmento con el plano de la hoja (2D xz + rango y)
  const dx = p1[0] - p0[0]
  const dz = p1[2] - p0[2]
  const denom = dx * N[0] + dz * N[1]
  if (Math.abs(denom) < 1e-9) return false
  const s = ((HINGE[0] - p0[0]) * N[0] + (HINGE[1] - p0[2]) * N[1]) / denom
  if (s < 0 || s > 1) return false
  const x = p0[0] + dx * s
  const z = p0[2] + dz * s
  const y = p0[1] + (p1[1] - p0[1]) * s
  if (y < LEAF_Y[0] || y > LEAF_Y[1]) return false
  const rel = (x - HINGE[0]) * DIR[0] + (z - HINGE[1]) * DIR[1]
  return rel >= 0 && rel <= LEAF_LEN
}

function visible(camPos, p) {
  const seg = [camPos[0], p.y, camPos[2]]
  const p1 = [p.x, p.y, p.z]
  if (segLeaf([camPos[0], camPos[1], camPos[2]], p1)) return false
  for (const box of AABBS) if (segAABB([camPos[0], camPos[1], camPos[2]], p1, box)) return false
  return true
}

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
const half = (c, r, ry) => [[c[0] - r, c[1] - (ry ?? r), c[2] - r], [c[0] + r, c[1] + (ry ?? r), c[2] + r]]

const FOODS = {
  apple: half([1.794, 0.4175, -1.771], 0.045),
  eggA: half([1.92, 0.8075, -1.885], 0.032),
  eggB: half([1.697, 0.8075, -1.684], 0.032),
  bottle: half([1.72, 0.695, -2.22], 0.05, 0.14),
}
const foodsFlat = Object.values(FOODS).flat()

const out = []
for (let cx = 0.1; cx <= 0.8; cx += 0.05) {
  for (let cy = 0.95; cy <= 1.45; cy += 0.05) {
    for (let cz = -1.45; cz <= -0.7; cz += 0.05) {
      for (let tx = 1.66; tx <= 1.96; tx += 0.06) {
        for (let ty = 0.45; ty <= 0.8; ty += 0.05) {
          for (let tz = -2.3; tz <= -1.95; tz += 0.07) {
            const camPos = [cx, cy, cz]
            const cam = mkCam(camPos, [tx, ty, tz])
            let ok = true
            const fb = {}
            for (const [k, pts] of Object.entries(FOODS)) {
              const c = [(pts[0][0] + pts[1][0]) / 2, (pts[0][1] + pts[1][1]) / 2, (pts[0][2] + pts[1][2]) / 2]
              if (!visible(camPos, { x: c[0], y: c[1], z: c[2] })) { ok = false; break }
              fb[k] = bb(cam, pts)
              const b = fb[k]
              if (b.x0 < 70 || b.x1 > 1210 || b.y0 < 50 || b.y1 > 670) { ok = false; break }
              if (b.y1 - b.y0 < 22 || b.x1 - b.x0 < 22) { ok = false; break }
            }
            if (!ok) continue
            if (Math.abs((fb.eggA.x0 + fb.eggA.x1) / 2 - (fb.eggB.x0 + fb.eggB.x1) / 2) < 20) continue
            const all = bb(cam, foodsFlat)
            const aw = (all.x1 - all.x0) / W
            const ah = (all.y1 - all.y0) / H
            if (aw < 0.22 || ah < 0.25) continue
            const flank = px(cam, [1.325, 1.5, -2.0])
            if (flank.x < 70 || flank.x > 1210 || flank.y < 50 || flank.y > 670) continue
            const de = px(cam, [1.543, 0.9, -1.451])
            if (de.x < 70 || de.x > 1210 || de.y < 50 || de.y > 670) continue
            const cb = px(cam, [2.05, 1.3, -2.35])
            if (cb.x < 70 || cb.x > 1210 || cb.y < 50 || cb.y > 670) continue
            out.push({ pos: [+cx.toFixed(2), +cy.toFixed(2), +cz.toFixed(2)], tgt: [+tx.toFixed(2), +ty.toFixed(2), +tz.toFixed(2)], aw: +aw.toFixed(2), ah: +ah.toFixed(2) })
          }
        }
      }
    }
  }
}
out.sort((a, b) => b.aw + b.ah - (a.aw + a.ah))
console.log('top 8 (con oclusión verificada):')
out.slice(0, 8).forEach((r) => console.log(JSON.stringify(r)))
if (!out.length) console.log('SIN CANDIDATOS')
