import fs from 'node:fs'
import path from 'node:path'
import { chromium, CHROMIUM_EXE } from '../_tooling/pw.mjs'

const FIGMA = process.env.FIGMA_URL || 'http://127.0.0.1:8445/'
const OUT = 'C:/Users/thega/Desktop/HomeplusPresentacion01/HomePlus_Presentacion_FINAL/audit/runtime/session-03/figma-reference'

const DUMP = () => {
  const vis = (el) => {
    const s = getComputedStyle(el)
    const r = el.getBoundingClientRect()
    return s.display !== 'none' && s.visibility !== 'hidden' && parseFloat(s.opacity) > 0.02 && r.width > 0 && r.height > 0
  }
  const txt = (el) => (el.innerText || el.getAttribute('aria-label') || '').replace(/\s+/g, ' ').trim()
  const controls = [...document.querySelectorAll('button,[role=button],[role=tab],a[href],input,select,textarea')]
    .filter(vis)
    .map((el) => {
      const r = el.getBoundingClientRect()
      return {
        tag: el.tagName,
        role: el.getAttribute('role'),
        al: el.getAttribute('aria-label'),
        text: txt(el).slice(0, 60),
        testid: el.getAttribute('data-testid'),
        x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height),
        selected: el.getAttribute('aria-selected'),
      }
    })
  return {
    url: location.href,
    navScreenId: document.querySelector('[data-nav-screen-id]')?.getAttribute('data-nav-screen-id') ?? null,
    rootChildren: [...document.body.querySelectorAll(':scope > *')].map((e) => e.tagName + '#' + (e.id || '') + '.' + (e.className || '').toString().slice(0, 60)),
    headings: [...document.querySelectorAll('h1,h2,h3')].filter(vis).map((el) => ({ tag: el.tagName, text: txt(el), fs: getComputedStyle(el).fontSize, fw: getComputedStyle(el).fontWeight, color: getComputedStyle(el).color })),
    controls,
    bodyText: (document.body.innerText || '').replace(/\n{2,}/g, '\n').slice(0, 6000),
  }
}

const run = async () => {
  const browser = await chromium.launch({ executablePath: CHROMIUM_EXE, headless: true })
  const ctx = await browser.newContext({ viewport: { width: 430, height: 932 }, deviceScaleFactor: 2 })
  const page = await ctx.newPage()
  const errors = []
  page.on('pageerror', (e) => errors.push(String(e.message)))
  page.on('console', (m) => { if (m.type() === 'error') errors.push('CONSOLE ' + m.text()) })

  await page.goto(FIGMA, { waitUntil: 'networkidle' })
  await page.waitForTimeout(1500)
  const d0 = await page.evaluate(DUMP)
  console.log('=== STAGE 0 (boot) nav=' + d0.navScreenId + ' controls=' + d0.controls.length)
  console.log('CONTROLS0=' + JSON.stringify(d0.controls.map((c) => ({ al: c.al, t: c.text, tid: c.testid })), null, 0))
  fs.writeFileSync(path.join(OUT, '_r00-stage0.json'), JSON.stringify(d0, null, 2))
  await page.screenshot({ path: path.join(OUT, 'r00-stage0.png') })

  const skip = page.getByRole('button', { name: /omitir/i }).first()
  if (await skip.count()) { console.log('OMITIR_FOUND'); await skip.click({ timeout: 8000 }); await page.waitForTimeout(1800) }
  else console.log('OMITIR_NOT_FOUND')

  const d1 = await page.evaluate(DUMP)
  console.log('=== STAGE 1 (post-omitir) nav=' + d1.navScreenId + ' controls=' + d1.controls.length)
  console.log('CONTROLS1=' + JSON.stringify(d1.controls.map((c) => ({ al: c.al, t: c.text, tid: c.testid }))))
  fs.writeFileSync(path.join(OUT, '_r00-stage1.json'), JSON.stringify(d1, null, 2))
  await page.screenshot({ path: path.join(OUT, 'r00-stage1.png') })

  const loginSubmit = page.getByRole('button', { name: /^ingresar$/i })
  const n = await loginSubmit.count()
  console.log('INGRESAR_COUNT=' + n)
  if (n > 0) { await loginSubmit.last().click({ timeout: 8000 }); await page.waitForTimeout(2200) }

  const d2 = await page.evaluate(DUMP)
  console.log('=== STAGE 2 (post-auth) nav=' + d2.navScreenId + ' controls=' + d2.controls.length)
  console.log('HEADINGS2=' + JSON.stringify(d2.headings))
  console.log('CONTROLS2=' + JSON.stringify(d2.controls.map((c) => ({ al: c.al, t: c.text, tid: c.testid }))))
  console.log('BODY2=' + JSON.stringify(d2.bodyText))
  fs.writeFileSync(path.join(OUT, '_r00-stage2.json'), JSON.stringify(d2, null, 2))
  await page.screenshot({ path: path.join(OUT, 'r00-stage2.png') })

  console.log('ERRORS=' + errors.length + (errors.length ? ' :: ' + JSON.stringify(errors.slice(0, 6)) : ''))
  fs.writeFileSync(path.join(OUT, '_r00-errors.json'), JSON.stringify(errors, null, 2))
  await browser.close()
}

run().catch((e) => { console.error('FATAL', e); process.exit(1) })