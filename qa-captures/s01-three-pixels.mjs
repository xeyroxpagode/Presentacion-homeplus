// QA LOOKDEV 3D — auditoría de píxeles sobre la captura del lookdev.
// Proyecta puntos 3D conocidos con los mismos parámetros de la cámara
// (posición, target, fov) para muestrear exactamente cada elemento.
import { PNG } from 'pngjs'
import { readFileSync } from 'node:fs'

const OUT = 'qa-captures/s01-three-lookdev'
const results = []
function check(name, ok, detail = '') { results.push({ name, ok, detail }) }

// ---- Proyección: replica PerspectiveCamera de three (mano derecha, -Z adelante) ----
const P = [2.35, 1.72, 3.1]
const T = [0.2, 0.75, -0.5]
const FOV = (36 * Math.PI) / 180

function project(world, w, h) {
  const aspect = w / h
  const sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]]
  const norm = (v) => { const l = Math.hypot(...v); return [v[0] / l, v[1] / l, v[2] / l] }
  const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]
  const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2]
  const f = norm(sub(T, P))
  const upW = [0, 1, 0]
  const r = norm(cross(f, upW))
  const u = cross(r, f)
  const d = sub(world, P)
  const xv = dot(d, r), yv = dot(d, u), zv = -dot(d, f)
  const tanH = Math.tan(FOV / 2)
  const ndcX = (xv / -zv) / (aspect * tanH)
  const ndcY = (yv / -zv) / tanH
  return [(ndcX * 0.5 + 0.5) * w, (1 - (ndcY * 0.5 + 0.5)) * h]
}

function analyze(file, w, h) {
  const img = PNG.sync.read(readFileSync(`${OUT}/${file}`))
  const px = (x, y) => { const i = (img.width * Math.round(y) + Math.round(x)) << 2; return [img.data[i], img.data[i + 1], img.data[i + 2]] }
  const lum = ([R, G, B]) => 0.2126 * R + 0.7152 * G + 0.0722 * B
  const patch = (x, y, rad = 3) => {
    let s = [0, 0, 0], n = 0
    for (let dy = -rad; dy <= rad; dy++) for (let dx = -rad; dx <= rad; dx++) {
      const p = px(x + dx, y + dy); s[0] += p[0]; s[1] += p[1]; s[2] += p[2]; n++
    }
    return [s[0] / n, s[1] / n, s[2] / n]
  }
  const at = (world) => { const [x, y] = project(world, w, h); return { x, y, rgb: patch(x, y) } }

  // Estadística global
  let meanL = 0, dark = 0, bright = 0, warm = 0, n = 0
  for (let i = 0; i < img.data.length; i += 400) {
    const R = img.data[i], G = img.data[i + 1], B = img.data[i + 2]
    const L = 0.2126 * R + 0.7152 * G + 0.0722 * B
    meanL += L; n++
    if (L < 12) dark++
    if (L > 180) bright++
    if (R > B + 15) warm++
  }
  meanL /= n
  console.log(`  ${file}: meanL=${meanL.toFixed(1)}`)
  check(`${file}: frame ni negro ni lavado (lum media 18–90)`, meanL > 18 && meanL < 90, `meanL=${meanL.toFixed(1)}`)
  check(`${file}: oscuridad con legibilidad (void < 68%)`, dark / n < 0.68, `dark=${((dark / n) * 100).toFixed(1)}%`)
  check(`${file}: sin estallidos (bright < 6%)`, bright / n < 0.06, `bright=${((bright / n) * 100).toFixed(1)}%`)
  check(`${file}: calidez presente pero no dominante (warm 8–45%)`, warm / n > 0.08 && warm / n < 0.45, `warm=${((warm / n) * 100).toFixed(1)}%`)

  // Protagonistas (world -> pantalla)
  const fridge = at([1.75, 1.15, -2.18])
  check(`${file}: heladera legible y clara (lum > 55)`, lum(fridge.rgb) > 55, `@(${fridge.x.toFixed(0)},${fridge.y.toFixed(0)}) rgb(${fridge.rgb.map((v) => v.toFixed(0))})`)
  const counter = at([-0.35, 0.92, 0.05])
  check(`${file}: mesada de madera legible (lum > 20, cálida)`, lum(counter.rgb) > 20 && counter.rgb[0] > counter.rgb[2], `@(${counter.x.toFixed(0)},${counter.y.toFixed(0)}) rgb(${counter.rgb.map((v) => v.toFixed(0))})`)
  const papers = at([-0.05, 0.93, -0.38])
  check(`${file}: póliza/papeles claros sobre la mesada (lum > 90)`, lum(papers.rgb) > 90, `@(${papers.x.toFixed(0)},${papers.y.toFixed(0)}) rgb(${papers.rgb.map((v) => v.toFixed(0))})`)
  const doorway = at([-2.46, 1.0, -2.98])
  check(`${file}: vano de puerta oscuro (lum < 16)`, lum(doorway.rgb) < 16, `@(${doorway.x.toFixed(0)},${doorway.y.toFixed(0)}) rgb(${doorway.rgb.map((v) => v.toFixed(0))})`)
  const bulb = at([-1.0, 1.96, -0.35])
  check(`${file}: lámpara cálida encendida (R > 200)`, bulb.rgb[0] > 200, `@(${bulb.x.toFixed(0)},${bulb.y.toFixed(0)}) rgb(${bulb.rgb.map((v) => v.toFixed(0))})`)
  const bag = at([1.35, 0.2, 0.35])
  check(`${file}: bolsa kraft en foreground (lum > 30, cálida)`, lum(bag.rgb) > 30 && bag.rgb[0] > bag.rgb[2], `@(${bag.x.toFixed(0)},${bag.y.toFixed(0)}) rgb(${bag.rgb.map((v) => v.toFixed(0))})`)
  const wallBg = at([-1.5, 1.6, -2.99])
  check(`${file}: pared de fondo oscura < heladera (lum < lum heladera - 15)`, lum(wallBg.rgb) < lum(fridge.rgb) - 15, `wall=${lum(wallBg.rgb).toFixed(0)} vs fridge=${lum(fridge.rgb).toFixed(0)}`)
  const keys = at([-0.9, 0.917, 0.08])
  const floorFg = at([0.0, 0.01, 0.8])
  console.log(`  samples: fridge=(${fridge.x.toFixed(0)},${fridge.y.toFixed(0)}) counter=(${counter.x.toFixed(0)},${counter.y.toFixed(0)}) papers=(${papers.x.toFixed(0)},${papers.y.toFixed(0)}) doorway=(${doorway.x.toFixed(0)},${doorway.y.toFixed(0)}) bulb=(${bulb.x.toFixed(0)},${bulb.y.toFixed(0)}) bag=(${bag.x.toFixed(0)},${bag.y.toFixed(0)}) keys=(${keys.x.toFixed(0)},${keys.y.toFixed(0)})`)
  check(`${file}: piso foreground presente (lum > 12)`, lum(floorFg.rgb) > 12, `@(${floorFg.x.toFixed(0)},${floorFg.y.toFixed(0)}) rgb(${floorFg.rgb.map((v) => v.toFixed(0))})`)
  console.log(`  keys@(${keys.x.toFixed(0)},${keys.y.toFixed(0)}) rgb(${keys.rgb.map((v) => v.toFixed(0))} · lista/bowl/papeles muestreados arriba`)

  // Contraste local (legibilidad de geometría): gradiente medio en franja central
  let grad = 0, gn = 0
  for (let y = Math.floor(h * 0.3); y < h * 0.85; y += 4) for (let x = Math.floor(w * 0.1); x < w * 0.9; x += 4) {
    grad += Math.abs(lum(px(x, y)) - lum(px(x + 4, y))); gn++
  }
  check(`${file}: geometría legible (gradiente medio > 2.2)`, grad / gn > 2.2, `grad=${(grad / gn).toFixed(2)}`)

  // Regresión: sin el param, el renderer original sigue vivo (fridge 2.5D en ~(950,380))
  return img
}

analyze('lookdev-1280.png', 1280, 720)

{
  const img = PNG.sync.read(readFileSync(`${OUT}/regression-original-renderer.png`))
  const px = (x, y) => { const i = (img.width * Math.round(y) + Math.round(x)) << 2; return [img.data[i], img.data[i + 1], img.data[i + 2]] }
  let meanL = 0, n = 0
  for (let i = 0; i < img.data.length; i += 400) { meanL += 0.2126 * img.data[i] + 0.7152 * img.data[i + 1] + 0.0722 * img.data[i + 2]; n++ }
  const fridge = px(950, 380)
  check('regresión: renderer original intacto (fridge 2.5D en 950,380, R 60–160)', fridge[0] > 60 && fridge[0] < 160, `rgb(${fridge}) meanL=${(meanL / n).toFixed(1)}`)
}

let pass = 0, fail = 0
for (const x of results) { if (x.ok) pass++; else fail++ }
console.log(`\n===== LOOKDEV PIXELS: ${pass} PASS / ${fail} FAIL =====`)
for (const x of results.filter((v) => !v.ok)) console.log(`FAIL ${x.name} — ${x.detail}`)
