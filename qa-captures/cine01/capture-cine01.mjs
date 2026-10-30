import puppeteer from 'puppeteer-core'
import { PNG } from 'pngjs'
import { mkdirSync, writeFileSync } from 'node:fs'

const BASE = process.env.CINE01_BASE ?? 'http://127.0.0.1:8443'
const PHASE = process.argv[2] ?? 'baseline'
const OUT = `qa-captures/cine01/${PHASE}`
const CHROME = process.env.CINE01_CHROME ?? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
const errors = []
const metrics = []

mkdirSync(OUT, { recursive: true })

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  args: ['--force-device-scale-factor=1'],
})

async function waitForHook(page) {
  await page.waitForFunction(() => window.__s01ThreeDebug && window.__s01Director, { timeout: 15000 })
  await page.evaluate(() => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))))
}

async function readFramebuffer(page, name) {
  const shot = await page.evaluate(() => {
    const state = window.__s01ThreeDebug
    if (!state) throw new Error('hook __s01ThreeDebug no disponible')
    const { gl, scene, camera } = state
    const post = window.__s01Post
    if (post?.render) post.render()
    else gl.render(scene, camera)
    const width = gl.domElement.width
    const height = gl.domElement.height
    const context = gl.getContext()
    const pixels = new Uint8Array(width * height * 4)
    context.readPixels(0, 0, width, height, context.RGBA, context.UNSIGNED_BYTE, pixels)
    let lit = 0
    let sum = 0
    for (let i = 0; i < pixels.length; i += 4) {
      const value = pixels[i] + pixels[i + 1] + pixels[i + 2]
      sum += value
      if (value > 18) lit += 1
    }
    let binary = ''
    const chunkSize = 0x8000
    for (let offset = 0; offset < pixels.length; offset += chunkSize) {
      binary += String.fromCharCode(...pixels.subarray(offset, Math.min(offset + chunkSize, pixels.length)))
    }
    return {
      width,
      height,
      pixelsBase64: btoa(binary),
      litRatio: lit / (width * height),
      mean: sum / (width * height * 3),
      step: window.__s01Director.step,
      elapsed: window.__s01Director.elapsed,
      frame: {
        camPos: [...window.__s01Director.frame.camPos],
        camTarget: [...window.__s01Director.frame.camTarget],
        camUp: [...window.__s01Director.frame.camUp],
        fTop: window.__s01Director.frame.fTop,
        fBot: window.__s01Director.frame.fBot,
        drawer: window.__s01Director.frame.drawer,
      },
      profile: post?.profile ?? 'direct',
      renderMs: post?.lastRenderMs ?? null,
      averageRenderMs: post?.averageRenderMs ?? null,
      maxRenderMs: post?.maxRenderMs ?? null,
      renderedFrames: post?.frameCount ?? null,
      renderer: context.getParameter(context.RENDERER),
    }
  })

  const pixels = Buffer.from(shot.pixelsBase64, 'base64')
  const png = new PNG({ width: shot.width, height: shot.height })
  for (let y = 0; y < shot.height; y += 1) {
    for (let x = 0; x < shot.width; x += 1) {
      const src = (y * shot.width + x) << 2
      const dst = ((shot.height - 1 - y) * shot.width + x) << 2
      png.data[dst] = pixels[src]
      png.data[dst + 1] = pixels[src + 1]
      png.data[dst + 2] = pixels[src + 2]
      png.data[dst + 3] = 255
    }
  }
  writeFileSync(`${OUT}/${name}.png`, PNG.sync.write(png))
  delete shot.pixelsBase64
  metrics.push({ name, ...shot })
  console.log(`${name}: ${shot.width}x${shot.height}, mean=${shot.mean.toFixed(1)}, lit=${(shot.litRatio * 100).toFixed(1)}%`)
}

async function settleDirector(page, minimumElapsed, timeout = 10000) {
  const started = Date.now()
  let lastState = null
  while (Date.now() - started < timeout) {
    const state = await page.evaluate(() => ({
      step: window.__s01Director?.step ?? null,
      elapsed: window.__s01Director?.elapsed ?? 0,
      animating: window.__s01Director?.animating ?? true,
      hasPost: Boolean(window.__s01Post),
    }))
    lastState = state
    if (state.elapsed >= minimumElapsed || !state.animating) return
    await sleep(20)
  }
  throw new Error(`director no alcanzó ${minimumElapsed} ms: ${JSON.stringify(lastState)}; errors=${JSON.stringify(errors)}`)
}

async function sampleDebugBeat(page, step, elapsed, name) {
  await page.evaluate(({ beat, time }) => {
    window.__s01Director.debugBeat(beat, time, window.innerWidth / window.innerHeight)
    window.__s01ThreeDebug.invalidate()
  }, { beat: step, time: elapsed })
  await page.evaluate(() => new Promise((resolve) => requestAnimationFrame(resolve)))
  await readFramebuffer(page, name)
}

async function run(width, height) {
  const label = `${width}x${height}`
  const page = await browser.newPage()
  await page.setViewport({ width, height, deviceScaleFactor: 1 })
  page.on('pageerror', (error) => errors.push(`[${label}] pageerror: ${error.message}`))
  page.on('console', (message) => {
    if (message.type() === 'error' && !message.text().includes('Failed to load resource')) errors.push(`[${label}] console: ${message.text()}`)
  })
  page.on('requestfailed', (request) => errors.push(`[${label}] requestfailed: ${request.url()}`))
  page.on('response', (response) => {
    if (response.status() >= 400 && !response.url().endsWith('/favicon.ico')) errors.push(`[${label}] ${response.status()} ${response.url()}`)
  })

  await page.goto(`${BASE}/?dev=1&slide=0&step=0&s01Renderer=three&s01Quality=cinematic`, { waitUntil: 'networkidle0' })
  await waitForHook(page)
  await readFramebuffer(page, `${label}-s01-0`)

  await page.keyboard.press('ArrowRight')
  await settleDirector(page, 450)
  await readFramebuffer(page, `${label}-s01-1-mid`)
  await settleDirector(page, 900)
  await readFramebuffer(page, `${label}-s01-1-final`)

  await page.keyboard.press('ArrowRight')
  await settleDirector(page, 500)
  await readFramebuffer(page, `${label}-s01-2-pantry`)
  await settleDirector(page, 1450)
  await readFramebuffer(page, `${label}-s01-2-travel`)
  await settleDirector(page, 2450)
  await readFramebuffer(page, `${label}-s01-2-final`)

  for (const time of [320, 500, 1000, 1300, 1650, 2320, 3350]) {
    await sampleDebugBeat(page, 3, time, `${label}-s01-3-${time}`)
  }
  for (const time of [0, 850, 1370, 1850]) {
    await sampleDebugBeat(page, 4, time, `${label}-s01-4-${time}`)
  }
  for (const [time, suffix] of [[0, 'start'], [360, 'approach'], [680, 'align'], [900, 'entry'], [1450, 'final']]) {
    await sampleDebugBeat(page, 5, time, `${label}-s01-5-${suffix}`)
  }

  await page.close()
}

await run(1280, 720)
if (process.env.CINE01_ONLY !== '720p') await run(1920, 1080)

writeFileSync(`${OUT}/metrics.json`, JSON.stringify({ phase: PHASE, base: BASE, errors, captures: metrics }, null, 2))
await browser.close()

if (errors.length) {
  console.error(errors.join('\n'))
  process.exitCode = 1
} else {
  console.log('NO-CONSOLE-PAGE-OR-REQUEST-ERRORS')
}
