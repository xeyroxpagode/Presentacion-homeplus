// QA V6.2 Lote 1 — técnico procedural: encuadre A_FRIDGE/A_WIDE + métricas de contacto.
// Reutiliza el hook __s01ThreeDebug (gl/scene/camera) y readPixels real.
import puppeteer from 'puppeteer-core'
import { PNG } from 'pngjs'
import { mkdirSync, writeFileSync } from 'node:fs'

const BASE = 'http://localhost:8443'
const OUT = 'qa-captures/v62-tech'
const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
const errors = []

mkdirSync(OUT, { recursive: true })
const browser = await puppeteer.launch({ executablePath: CHROME, args: ['--force-device-scale-factor=1'] })

async function captureSingle(page, camKey, file) {
  // Todo en UN solo evaluate: fijar cámara, render, píxeles y métricas.
  // (Sin invalidate: el loop demand no pisa la cámara entre medias.)
  const shots = await page.evaluate((c) => {
    const s = window.__s01ThreeDebug
    if (!s) throw new Error('hook __s01ThreeDebug no disponible')
    const { gl, scene, camera } = s
    const d = window.__s01Director
    d.frame.camPos = [...c.pos]
    d.frame.camTarget = [...c.target]
    d.frame.camUp = [0, 1, 0]
    camera.position.set(c.pos[0], c.pos[1], c.pos[2])
    camera.up.set(0, 1, 0)
    camera.lookAt(c.target[0], c.target[1], c.target[2])
    camera.updateMatrixWorld(true)
    scene.updateMatrixWorld(true)
    gl.render(scene, camera)
    const w = gl.domElement.width
    const h = gl.domElement.height
    const glctx = gl.getContext()
    const pixels = new Uint8Array(w * h * 4)
    glctx.readPixels(0, 0, w, h, glctx.RGBA, glctx.UNSIGNED_BYTE, pixels)
    let lit = 0
    let sum = 0
    for (let i = 0; i < pixels.length; i += 4) {
      const v = pixels[i] + pixels[i + 1] + pixels[i + 2]
      sum += v
      if (v > 18) lit++
    }
    const V3 = Object.getPrototypeOf(camera.position).constructor
    const root = scene.getObjectByName('TECHNICIAN_ROOT')
    if (!root) return { error: 'TECHNICIAN_ROOT ausente' }
    const bs = []
    root.traverse((o) => {
      if (o.isMesh && o.geometry) {
        o.geometry.computeBoundingBox()
        bs.push(o.geometry.boundingBox.clone().applyMatrix4(o.matrixWorld))
      }
    })
    let min = { x: 1e9, y: 1e9, z: 1e9 }
    let max = { x: -1e9, y: -1e9, z: -1e9 }
    for (const b of bs) {
      min = { x: Math.min(min.x, b.min.x), y: Math.min(min.y, b.min.y), z: Math.min(min.z, b.min.z) }
      max = { x: Math.max(max.x, b.max.x), y: Math.max(max.y, b.max.y), z: Math.max(max.z, b.max.z) }
    }
    const pt = (name) => {
      const o = scene.getObjectByName(name)
      if (!o) return null
      const v = new V3()
      o.getWorldPosition(v)
      return [v.x, v.y, v.z].map((n) => Math.round(n * 1000) / 1000)
    }
    const proj = (p) => {
      const v = new V3(p[0], p[1], p[2])
      v.project(camera)
      return [v.x, v.y, v.z].map((n) => Math.round(n * 1000) / 1000)
    }
    const rnd = (n) => Math.round(n * 1000) / 1000
    return {
      w, h, pixels: Array.from(pixels), litRatio: lit / (w * h), mean: sum / (w * h * 3),
      camUsed: camera.position.toArray().map(rnd),
      bbMin: min, bbMax: max,
      kneelHeight: rnd(max.y - Math.min(0, min.y)),
      knee: pt('RIGHT_KNEE_CONTACT'),
      foot: pt('LEFT_FOOT_CONTACT'),
      palm: pt('LEFT_HAND_PANEL_CONTACT'),
      tip: pt('TOOL_TIP_TARGET'),
      screw: [1.3, 0.55, -2.14],
      ndcHead: proj([1.15, 1.22, -2.1]),
      ndcKnee: proj([0.68, 0.06, -1.96]),
      ndcScrew: proj([1.3, 0.55, -2.14]),
      ndcPelvis: proj([0.8, 0.55, -2.1]),
      servicePanel: !!scene.getObjectByName('SERVICE_PANEL'),
      serviceScrew: !!scene.getObjectByName('SERVICE_SCREW'),
      toolSocket: !!scene.getObjectByName('ToolSocket'),
    }
  }, CAMS[camKey])
  const { w, h, pixels } = shots
  const png = new PNG({ width: w, height: h })
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const src = (y * w + x) << 2
      const dst = ((h - 1 - y) * w + x) << 2
      png.data[dst] = pixels[src]
      png.data[dst + 1] = pixels[src + 1]
      png.data[dst + 2] = pixels[src + 2]
      png.data[dst + 3] = 255
    }
  }
  writeFileSync(`${OUT}/${file}.png`, PNG.sync.write(png))
  console.log(`${file}  ${w}x${h}  lit=${(shots.litRatio * 100).toFixed(1)}%  mean=${shots.mean.toFixed(1)}`)
  return shots
}

// Anchors canónicos (copia de s01CinematicConfig; el override ?s01InspectCamera
// decae al F100 del step, por eso se fijan por frame + render directo).
const CAMS = {
  FRIDGE: { pos: [1.08, 1.58, 1.92], target: [1.51, 0.8, -2.04] },
  WIDE: { pos: [2.15, 1.75, 2.7], target: [0.15, 0.82, -0.9] },
}

async function run(cam, file) {
  const page = await browser.newPage()
  await page.setViewport({ width: 1280, height: 720 })
  page.on('pageerror', (e) => errors.push(`[${cam}] pageerror: ${e.message}`))
  page.on('console', (m) => {
    if (m.type() === 'error' && !m.text().includes('404')) errors.push(`[${cam}] console: ${m.text()}`)
  })
  await page.goto(`${BASE}/?dev=1&slide=0&step=4&s01Renderer=three&s01InspectCamera=${cam}`, { waitUntil: 'domcontentloaded', timeout: 120000 })
  await sleep(4500)
  const info = await captureSingle(page, cam, file)
  console.log(`[${cam}] camUsed=${JSON.stringify(info.camUsed)}`, JSON.stringify({ ...info, pixels: undefined, w: undefined, h: undefined, litRatio: undefined, mean: undefined }))
  // Chequeos
  const checks = []
  const ck = (name, ok, detail) => { checks.push(`${ok ? 'PASS' : 'FAIL'} ${name} ${detail ?? ''}`); console.log(`${ok ? 'PASS' : 'FAIL'} ${name} ${detail ?? ''}`) }
  if (info.error) {
    ck('escena', false, info.error)
  } else {
    ck('technician-presente', true, `bboxY ${info.bbMin.y.toFixed(3)}..${info.bbMax.y.toFixed(3)}`)
    ck('panel-tornillo-presentes', info.servicePanel && info.serviceScrew, '')
    ck('toolsocket-presente', info.toolSocket, '')
    ck('rodilla-contacto', info.knee && info.knee[1] <= 0.01, `y=${info.knee?.[1]}`)
    ck('pie-contacto', info.foot && info.foot[1] <= 0.01, `y=${info.foot?.[1]}`)
    const tipDx = Math.hypot(info.tip[0] - info.screw[0], info.tip[1] - info.screw[1], info.tip[2] - info.screw[2])
    ck('punta-tornillo', tipDx <= 0.02, `d=${tipDx.toFixed(4)}m`)
    for (const [n, p] of [['cabeza', info.ndcHead], ['rodilla', info.ndcKnee], ['tornillo', info.ndcScrew], ['pelvis', info.ndcPelvis]]) {
      ck(`encuadre-${n}`, Math.abs(p[0]) <= 1 && Math.abs(p[1]) <= 1, `ndc=[${p}]`)
    }
    ck('altura-arrodillada', info.kneelHeight < 1.45 && info.bbMax.y < 1.45, `h=${info.kneelHeight}`)
    ck('sin-penetracion-suelo', info.bbMin.y >= -0.001, `minY=${info.bbMin.y.toFixed(4)}`)
  }
  await page.close()
  return checks
}

const all = []
all.push(...await run('FRIDGE', 'v62-A_FRIDGE'))
all.push(...await run('WIDE', 'v62-A_WIDE'))
console.log('---ERRORES---', errors.length ? errors.join('\n') : '(ninguno)')
await browser.close()
const fails = all.filter((c) => c.startsWith('FAIL')).length
console.log(`---TOTAL ${all.length} checks, ${fails} FAIL---`)
process.exit(fails ? 1 : 0)
