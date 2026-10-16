// PROBE V5.2 SLICE B — pose de A_FRIDGE_SIDE (F100 beat 2, §05B):
// toma cercana y lateral que lee cavidad + repisas + puerta abierta +
// bandeja + huevos + manzana + botella, con cuerpo reconocible.
import * as THREE from 'three'

const W = 1280
const H = 720
const FOV = 36
const ASPECT = W / H

// mundo (doorWorld @42° ya calculado a mano; espejo de s01Geo V5.2)
const FOODS = {
  apple: box(1.794, 0.4175, -1.771, 0.045),
  eggA: box(1.92, 0.8075, -1.885, 0.032),
  eggB: box(1.697, 0.8075, -1.684, 0.032),
  bottle: box(1.57, 0.695, -2.25, 0.05, 0.14),
}
const BODY_EDGE = pt(2.175, 0.9, -2.02)
const BODY_TOP = pt(2.175, 1.85, -2.02)
const DOOR_EDGE = pt(1.543, 0.66, -1.451)
const CAVITY_BACK = pt(1.385, 0.9, -2.355)
const CAVITY_MOUTH_L = pt(1.385, 0.9, -2.02)
const TARGET = new THREE.Vector3(1.72, 0.72, -2.0)

function pt(x, y, z) {
  return new THREE.Vector3(x, y, z)
}
function box(x, y, z, r, ry) {
  const h = ry ?? r
  return [pt(x - r, y - h, z - r), pt(x + r, y + h, z + r)]
}

function mkCam(dHoriz, psiDeg, h) {
  const psi = (psiDeg * Math.PI) / 180
  const pos = new THREE.Vector3(TARGET.x + dHoriz * Math.cos(psi), TARGET.y + h, TARGET.z + dHoriz * Math.sin(psi))
  const cam = new THREE.PerspectiveCamera(FOV, ASPECT, 0.015, 40)
  cam.position.copy(pos)
  cam.lookAt(TARGET)
  cam.updateMatrixWorld()
  return cam
}

function px(cam, p) {
  const v = p.clone().project(cam)
  return { x: (v.x * 0.5 + 0.5) * W, y: (-v.y * 0.5 + 0.5) * H }
}

function bb(cam, pts) {
  const q = pts.map((p) => px(cam, p))
  const xs = q.map((r) => r.x)
  const ys = q.map((r) => r.y)
  return { x0: Math.min(...xs), x1: Math.max(...xs), y0: Math.min(...ys), y1: Math.max(...ys) }
}
const inSafe = (b) => b.x0 > 70 && b.x1 < 1210 && b.y0 > 50 && b.y1 < 670

const out = []
for (let d = 1.1; d <= 1.8; d += 0.05) {
  for (let psi = 20; psi <= 60; psi += 2) {
    for (const h of [0.3, 0.4, 0.5]) {
      const cam = mkCam(d, psi, h)
      const fb = {}
      let ok = true
      for (const [k, pts] of Object.entries(FOODS)) {
        fb[k] = bb(cam, pts)
        if (!inSafe(fb[k])) ok = false
      }
      if (!ok) continue
      // separación huevos ≥ 22px
      if (Math.abs((fb.eggA.x0 + fb.eggA.x1) / 2 - (fb.eggB.x0 + fb.eggB.x1) / 2) < 22) continue
      // cuerpo reconocible: flanco derecho + borde de puerta en frame
      const be = px(cam, BODY_EDGE)
      const de = px(cam, DOOR_EDGE)
      if (be.x < 70 || be.x > 1210 || be.y < 50 || be.y > 670) continue
      if (de.x < 70 || de.x > 1210 || de.y < 50 || de.y > 670) continue
      // fondo de cavidad en frame (a la izquierda de la boca)
      const cb = px(cam, CAVITY_BACK)
      if (cb.x < 70 || cb.y < 50 || cb.y > 670) continue
      // alimentos protagonistas: bbox combinado ≥ 26% ancho, ≥ 22% alto
      const all = bb(cam, [...FOODS.apple, ...FOODS.eggA, ...FOODS.eggB, ...FOODS.bottle])
      const aw = (all.x1 - all.x0) / W
      const ah = (all.y1 - all.y0) / H
      if (aw < 0.26 || ah < 0.22) continue
      const bt = px(cam, BODY_TOP)
      out.push({ d, psi, h, aw: +aw.toFixed(2), ah: +ah.toFixed(2), pos: cam.position.toArray().map((v) => +v.toFixed(3)), top: bt.y > 50 && bt.y < 670 ? 'in' : 'out' })
    }
  }
}
out.sort((a, b) => b.aw + b.ah - (a.aw + a.ah))
console.log('candidatos (top 10, ordenados por presencia de alimentos):')
out.slice(0, 10).forEach((r) => console.log(JSON.stringify(r)))
if (!out.length) console.log('SIN CANDIDATOS')
