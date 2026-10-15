import { chromium, CHROMIUM_EXE, URL_BASE } from './pw.mjs'
const b = await chromium.launch({ executablePath: CHROMIUM_EXE, headless: true })
const p = await (await b.newContext({ viewport: { width: 1280, height: 720 } })).newPage()
const bad = []
p.on('response', r => { if (r.status() >= 400) bad.push(r.status() + ' ' + r.request().method() + ' ' + r.url()) })
await p.goto(URL_BASE, { waitUntil: 'networkidle' })
await p.waitForSelector('.presentation-canvas')
for (let i = 0; i < 40; i++) { await p.keyboard.press('ArrowRight'); await p.waitForTimeout(90) }
await p.waitForTimeout(1200)
console.log('BAD_RESPONSES=' + bad.length)
console.log(bad.join('\n'))
await b.close()
