import { chromium } from 'playwright'
import { mkdirSync, readdirSync, renameSync } from 'fs'

const BASE = 'http://localhost:5199'
const OUT = '/root/proyectos/HomeplusPresentacion01/qa-captures/s03v6'
const VID = '/tmp/s03v6-video'
mkdirSync(OUT, { recursive: true })
mkdirSync(VID, { recursive: true })

// Duraciones de los steps (ms) + cola de reposo para leer cada estado.
const STEP_WAIT = [900, 760, 900, 870, 1230, 1030, 1250, 2200, 1600]

const browser = await chromium.launch()
const context = await browser.newContext({
  viewport: { width: 1920, height: 1080 },
  recordVideo: { dir: VID, size: { width: 1920, height: 1080 } },
})
const page = await context.newPage()

// Entra en S03 y deja que el branding (step 0) se dibuje.
// El primer goto compila los módulos (lento): se recalienta y se recarga para
// que el vídeo contenga el branding completo.
await page.goto(`${BASE}/?dev=1&slide=2&step=0`, { waitUntil: 'load' })
await page.waitForTimeout(4000)
await page.reload({ waitUntil: 'load' })
await page.waitForTimeout(3400)

// Avanza los steps 1–9 con un click real (teclado) y espera el reposo.
for (let i = 0; i < STEP_WAIT.length; i++) {
  await page.keyboard.press('ArrowRight')
  await page.waitForTimeout(STEP_WAIT[i] + 260)
  console.log('step', i + 1, 'capturado')
}

// Step 10: un click inicia el travelling y el relevo automático a S04.
await page.keyboard.press('ArrowRight')
await page.waitForTimeout(3600)
console.log('step 10 + handoff capturado')

await context.close()
await browser.close()

const files = readdirSync(VID).filter(f => f.endsWith('.webm'))
if (files.length) {
  renameSync(`${VID}/${files[0]}`, `${OUT}/s03v6-coreografia.webm`)
  console.log('video ->', `${OUT}/s03v6-coreografia.webm`)
} else {
  console.log('NO VIDEO')
}
