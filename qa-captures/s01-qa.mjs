// QA V2.1 — capturas de S01 con navegación real por teclado + deep links.
import puppeteer from 'puppeteer-core'
import { mkdirSync } from 'node:fs'

const BASE = 'http://localhost:8443'
const OUT = 'qa-captures/s01-v2-1'
const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
const errors = []

mkdirSync(OUT, { recursive: true })

const browser = await puppeteer.launch({ executablePath: CHROME, args: ['--force-device-scale-factor=1'] })

async function newPage(w = 1280, h = 720, reduced = false) {
  const page = await browser.newPage()
  await page.setViewport({ width: w, height: h })
  page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`))
  page.on('console', (m) => { if (m.type() === 'error') errors.push(`console: ${m.text()}`) })
  if (reduced) await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }])
  return page
}

async function deepLink(page, step, extra = '') {
  await page.goto(`${BASE}/?dev=1&slide=0&step=${step}${extra}`, { waitUntil: 'networkidle0' })
  await sleep(400)
}

// ---------- Run 1: secuencia completa con cámara (navegación real) ----------
{
  const page = await newPage()
  await page.goto(`${BASE}/?dev=1&slide=0&step=0`, { waitUntil: 'networkidle0' })
  await sleep(1500)
  await page.screenshot({ path: `${OUT}/run1-cam-1280-S01.0-F100.png` })

  const press = () => page.keyboard.press('ArrowRight')

  // S01.1
  await press(); await sleep(310)
  await page.screenshot({ path: `${OUT}/run1-cam-1280-S01.1-F50.png` })
  await sleep(640)
  await page.screenshot({ path: `${OUT}/run1-cam-1280-S01.1-F100.png` })

  // S01.2
  await press(); await sleep(950)
  await page.screenshot({ path: `${OUT}/run1-cam-1280-S01.2-F100.png` })

  // S01.3 — 1750ms
  await press(); await sleep(440)
  await page.screenshot({ path: `${OUT}/run1-cam-1280-S01.3-F25.png` })
  await sleep(435)
  await page.screenshot({ path: `${OUT}/run1-cam-1280-S01.3-F50.png` })
  await sleep(435)
  await page.screenshot({ path: `${OUT}/run1-cam-1280-S01.3-F75.png` })
  await sleep(790)
  await page.screenshot({ path: `${OUT}/run1-cam-1280-S01.3-F100.png` })

  // S01.4
  await press(); await sleep(950)
  await page.screenshot({ path: `${OUT}/run1-cam-1280-S01.4-F100.png` })

  // S01.5 — 1000ms
  await press(); await sleep(250)
  await page.screenshot({ path: `${OUT}/run1-cam-1280-S01.5-F25.png` })
  await sleep(250)
  await page.screenshot({ path: `${OUT}/run1-cam-1280-S01.5-F50.png` })
  await sleep(250)
  await page.screenshot({ path: `${OUT}/run1-cam-1280-S01.5-F75.png` })
  await sleep(650)
  await page.screenshot({ path: `${OUT}/run1-cam-1280-S01.5-F100.png` })

  // Handoff S01.5 -> S02
  await press(); await sleep(1200)
  await page.screenshot({ path: `${OUT}/run1-cam-1280-S02-entry.png` })
  await page.close()
}

// ---------- Run 2: plano general con cámara OFF (geometría/oclusiones) ----------
{
  const page = await newPage()
  for (const step of [0, 1, 2, 3, 4, 5]) {
    await deepLink(page, step, '&s01Camera=off')
    await sleep(step === 3 ? 2200 : step === 5 ? 1300 : 1000)
    await page.screenshot({ path: `${OUT}/run2-camoff-1280-S01.${step}.png` })
  }
  await page.close()
}

// ---------- Run 3: resoluciones 1366×768 y 1920×1080 (beats 4 y 5) ----------
{
  for (const [w, h] of [[1366, 768], [1920, 1080]]) {
    const page = await newPage(w, h)
    await deepLink(page, 4)
    await sleep(1000)
    await page.screenshot({ path: `${OUT}/run3-res-${w}x${h}-S01.4.png` })
    await deepLink(page, 5)
    await sleep(1400)
    await page.screenshot({ path: `${OUT}/run3-res-${w}x${h}-S01.5.png` })
    await page.close()
  }
}

// ---------- Run 4: navegación rápida forward/backward (sin huérfanos) ----------
{
  const page = await newPage()
  await deepLink(page, 0)
  await sleep(1200)
  for (let i = 0; i < 5; i++) { await page.keyboard.press('ArrowRight'); await sleep(120) }
  await sleep(1600)
  await page.screenshot({ path: `${OUT}/run4-rapid-forward-S01.5.png` })
  for (let i = 0; i < 5; i++) { await page.keyboard.press('ArrowLeft'); await sleep(120) }
  await sleep(1600)
  await page.screenshot({ path: `${OUT}/run4-rapid-backward-S01.0.png` })
  // reversa intermedia: 4 -> 3 debe volver a mostrar la búsqueda asentada
  await page.keyboard.press('ArrowRight'); await sleep(1400)
  await page.keyboard.press('ArrowRight'); await sleep(1400)
  await page.keyboard.press('ArrowRight'); await sleep(1400)
  await page.keyboard.press('ArrowRight'); await sleep(1400)
  await page.screenshot({ path: `${OUT}/run4-step4-then-reverse.png` })
  await page.keyboard.press('ArrowLeft'); await sleep(2100)
  await page.screenshot({ path: `${OUT}/run4-reverse-4to3-S01.3.png` })
  await page.close()
}

// ---------- Run 5: reduced motion — estados semánticos finales ----------
{
  const page = await newPage(1280, 720, true)
  await deepLink(page, 3)
  await sleep(1000)
  await page.screenshot({ path: `${OUT}/run5-reduced-S01.3.png` })
  await deepLink(page, 5)
  await sleep(1000)
  await page.screenshot({ path: `${OUT}/run5-reduced-S01.5.png` })
  await page.close()
}

await browser.close()
console.log(errors.length ? `ERRORS:\n${errors.join('\n')}` : 'NO-CONSOLE-OR-PAGE-ERRORS')
