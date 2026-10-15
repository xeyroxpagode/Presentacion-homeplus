// QA S01 FINAL PRIME V4.0 — framebuffer WebGL real vía readPixels.
// Tiempos del contrato: pantry 250/400, fridge 125/255/430/590/760/965/1250/
// 1450/1650, portal 0/25/50/75/90/100% + pixel-black ≥99.5% en F100.
import puppeteer from 'puppeteer-core'
import { PNG } from 'pngjs'
import { mkdirSync, writeFileSync } from 'node:fs'

const BASE = 'http://localhost:8443'
const OUT = 'qa-captures/s01-final-prime'
const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

mkdirSync(OUT, { recursive: true })
const browser = await puppeteer.launch({ executablePath: CHROME, args: ['--force-device-scale-factor=1'] })
const errors = []

async function capture(page, name) {
  const shots = await page.evaluate(() => {
    const s = window.__s01ThreeDebug
    if (!s) throw new Error('hook __s01ThreeDebug no disponible')
    const { gl, scene, camera } = s
    gl.render(scene, camera)
    const w = gl.domElement.width
    const h = gl.domElement.height
    const glctx = gl.getContext()
    const pixels = new Uint8Array(w * h * 4)
    glctx.readPixels(0, 0, w, h, glctx.RGBA, glctx.UNSIGNED_BYTE, pixels)
    let lit = 0
    let nearBlack = 0
    let sum = 0
    for (let i = 0; i < pixels.length; i += 4) {
      const v = pixels[i] + pixels[i + 1] + pixels[i + 2]
      sum += v
      if (v > 18) lit++
      if (v <= 12) nearBlack++
    }
    const n = w * h
    return { w, h, pixels: Array.from(pixels), litRatio: lit / n, blackRatio: nearBlack / n, mean: sum / (n * 3) }
  })
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
  writeFileSync(`${OUT}/${name}.png`, PNG.sync.write(png))
  console.log(`${name}  ${w}x${h}  lit=${(shots.litRatio * 100).toFixed(1)}%  black=${(shots.blackRatio * 100).toFixed(2)}%  mean=${shots.mean.toFixed(1)}`)
  return shots
}

async function directorState(page) {
  return page.evaluate(() => {
    const d = window.__s01Director
    return d ? { step: d.step, elapsed: Math.round(d.elapsed), animating: d.animating, reduced: d.reduced } : null
  })
}

async function frameProbe(page) {
  return page.evaluate(() => {
    const d = window.__s01Director
    if (!d) return null
    const f = d.frame
    const meta = window.__s01PortalMeta || null
    return {
      step: d.step,
      elapsed: Math.round(d.elapsed),
      pantry: f.pantry.map((v) => +(v * 57.2958).toFixed(1)),
      fTop: +(f.fTop * 57.2958).toFixed(1),
      fBot: +(f.fBot * 57.2958).toFixed(1),
      lift: +f.fLift.toFixed(4),
      roll: +(f.fRoll * 57.2958).toFixed(3),
      shift: +f.fShift.toFixed(4),
      drawer: +f.drawer.toFixed(3),
      manualCover: +(f.manualCover * 57.2958).toFixed(1),
      docsVisible: f.docs.filter((x) => x.v > 0.5).length,
      smoke: f.smoke.map((s) => +s.o.toFixed(3)),
      camPos: f.camPos.map((v) => +v.toFixed(3)),
      portalMeta: meta
        ? { camFinal: meta.cameraFinalPosition.map((v) => +v.toFixed(4)), screenW: meta.screenWidthWorld, screenH: meta.screenHeightWorld }
        : null,
    }
  })
}

async function waitElapsed(page, ms, timeout = 12000) {
  const t0 = Date.now()
  while (Date.now() - t0 < timeout) {
    const s = await directorState(page)
    if (s && (!s.animating || s.elapsed >= ms)) return s
    await sleep(25)
  }
  return directorState(page)
}

async function run(label, width, height) {
  const page = await browser.newPage()
  await page.setViewport({ width, height })
  page.on('pageerror', (e) => errors.push(`[${label}] pageerror: ${e.message}`))
  page.on('console', (m) => {
    if (m.type() === 'error' && !m.text().includes('404')) errors.push(`[${label}] console: ${m.text()}`)
  })
  await page.goto(`${BASE}/?dev=1&slide=0&step=0&s01Renderer=three`, { waitUntil: 'networkidle0' })
  await sleep(1800)
  await capture(page, `${label}-s01-0-f100-black`)

  await page.keyboard.press('ArrowRight')
  await waitElapsed(page, 260)
  await capture(page, `${label}-s01-1-mid`)
  await waitElapsed(page, 1e9)
  await capture(page, `${label}-s01-1-f100-insurance`)

  await page.keyboard.press('ArrowRight')
  await waitElapsed(page, 250)
  await capture(page, `${label}-s01-2-t250`)
  await waitElapsed(page, 400)
  await capture(page, `${label}-s01-2-t400`)
  await waitElapsed(page, 1e9)
  await capture(page, `${label}-s01-2-f100-pantry`)
  console.log(`[${label}] pantry-f100`, JSON.stringify(await frameProbe(page)))

  await page.keyboard.press('ArrowRight')
  await waitElapsed(page, 125)
  console.log(`[${label}] t125-tug`, JSON.stringify(await frameProbe(page)))
  await waitElapsed(page, 255)
  await capture(page, `${label}-s01-3-t255-impact`)
  await waitElapsed(page, 430)
  await capture(page, `${label}-s01-3-t430-doors-peak`)
  await waitElapsed(page, 590)
  await capture(page, `${label}-s01-3-t590`)
  await waitElapsed(page, 760)
  await capture(page, `${label}-s01-3-t760-flying`)
  await waitElapsed(page, 965)
  console.log(`[${label}] t965`, JSON.stringify(await frameProbe(page)))
  await waitElapsed(page, 1250)
  await capture(page, `${label}-s01-3-t1250`)
  await waitElapsed(page, 1e9)
  await capture(page, `${label}-s01-3-f100`)
  console.log(`[${label}] fridge-f100`, JSON.stringify(await frameProbe(page)))

  await page.keyboard.press('ArrowRight')
  await waitElapsed(page, 1e9)
  await capture(page, `${label}-s01-4-f100-wide`)

  await page.keyboard.press('ArrowRight')
  await waitElapsed(page, 400)
  await capture(page, `${label}-s01-5-t400-accum`)
  await waitElapsed(page, 800)
  await capture(page, `${label}-s01-5-t800-accum-settled`)
  await waitElapsed(page, 1600)
  await capture(page, `${label}-s01-5-t1600-staging`)
  console.log(`[${label}] staging`, JSON.stringify(await frameProbe(page)))
  // Dive ÚNICO V4.2: [1000,2350] → 25% ≈ 1338, 50% ≈ 1675, 75% ≈ 2013, 90% ≈ 2215.
  await waitElapsed(page, 1338)
  await capture(page, `${label}-s01-5-portal-25`)
  await waitElapsed(page, 1675)
  await capture(page, `${label}-s01-5-portal-50`)
  await waitElapsed(page, 2013)
  await capture(page, `${label}-s01-5-portal-75`)
  await waitElapsed(page, 2215)
  await capture(page, `${label}-s01-5-portal-90`)
  await waitElapsed(page, 1e9)
  const fin = await capture(page, `${label}-s01-5-f100-portal-black`)
  console.log(`[${label}] portal-f100`, JSON.stringify(await frameProbe(page)))
  console.log(`[${label}] PORTAL-BLACK-PASS=${fin.blackRatio >= 0.995 ? 'PASS' : 'FAIL'} black=${(fin.blackRatio * 100).toFixed(2)}%`)

  for (const step of [4, 3, 2, 1, 0]) {
    await page.keyboard.press('ArrowLeft')
    await waitElapsed(page, 1e9)
    await capture(page, `${label}-rev-${step}`)
  }
  console.log(`[${label}] reverse-end`, JSON.stringify(await frameProbe(page)))
  await page.close()
}

await run('720p', 1280, 720)
await run('1080p', 1920, 1080)

// Interrupción: navegación rápida a mitad de scripts.
{
  const page = await browser.newPage()
  await page.setViewport({ width: 1280, height: 720 })
  page.on('pageerror', (e) => errors.push(`[interrupt] pageerror: ${e.message}`))
  await page.goto(`${BASE}/?dev=1&slide=0&step=0&s01Renderer=three`, { waitUntil: 'networkidle0' })
  await sleep(1500)
  await page.keyboard.press('ArrowRight')
  await page.keyboard.press('ArrowRight')
  await page.keyboard.press('ArrowRight')
  await sleep(2500)
  console.log('interrupt 0->3 :', JSON.stringify(await frameProbe(page)))
  await capture(page, 'interrupt-s01-3-f100')
  // Interrumpir el portal a mitad: 4→5, cortar a 2400 ms y volver.
  await page.keyboard.press('ArrowRight')
  await page.keyboard.press('ArrowRight')
  await waitElapsed(page, 2400)
  await page.keyboard.press('ArrowLeft')
  await waitElapsed(page, 1e9)
  console.log('interrupt portal->4 :', JSON.stringify(await frameProbe(page)))
  await capture(page, 'interrupt-portal-back-4')
  await page.close()
}

// Regresión: renderer original + S02 intactos.
{
  const page = await browser.newPage()
  await page.setViewport({ width: 1280, height: 720 })
  page.on('pageerror', (e) => errors.push(`[regression] pageerror: ${e.message}`))
  await page.goto(`${BASE}/?dev=1&slide=0&step=0`, { waitUntil: 'networkidle0' })
  await sleep(1200)
  await page.screenshot({ path: `${OUT}/regression-s01-original-renderer.png` })
  await page.goto(`${BASE}/?dev=1&slide=1&step=0`, { waitUntil: 'networkidle0' })
  await sleep(1200)
  await page.screenshot({ path: `${OUT}/regression-s02-untouched.png` })
  await page.close()
}

// Reduced motion: F100 idéntico (portal negro incluido) en snap corto.
{
  const page = await browser.newPage()
  await page.setViewport({ width: 1280, height: 720 })
  page.on('pageerror', (e) => errors.push(`[reduced] pageerror: ${e.message}`))
  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }])
  await page.goto(`${BASE}/?dev=1&slide=0&step=5&s01Renderer=three`, { waitUntil: 'networkidle0' })
  await sleep(1500)
  const fin = await capture(page, 'reduced-s01-5-f100')
  console.log(`[reduced] PORTAL-BLACK-PASS=${fin.blackRatio >= 0.995 ? 'PASS' : 'FAIL'} black=${(fin.blackRatio * 100).toFixed(2)}%`)
  console.log('[reduced] state', JSON.stringify(await frameProbe(page)))
  await page.close()
}

await browser.close()
console.log(errors.length ? `ERRORS:\n${errors.join('\n')}` : 'NO-PAGE-ERRORS')
