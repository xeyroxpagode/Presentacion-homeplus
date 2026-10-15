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
      return { tag: el.TagName || el.tagName, role: el.getAttribute('role'), al: el.getAttribute('aria-label'), text: txt(el).slice(0, 80), testid: el.getAttribute('data-testid'), x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height), selected: el.getAttribute('aria-selected') }
    })
  return {
    url: location.href,
    navScreenId: document.querySelector('[data-nav-screen-id]')?.getAttribute('data-nav-screen-id') ?? null,
    headings: [...document.querySelectorAll('h1,h2,h3,h4')].filter(vis).map((el) => ({ tag: el.tagName, text: txt(el), fs: getComputedStyle(el).fontSize, fw: getComputedStyle(el).fontWeight, color: getComputedStyle(el).color })),
    controls, bodyText: (document.body.innerText || '').replace(/\n{2,}/g, '\n').slice(0, 9000),
  }
}

const boot = async (browser) => {
  const ctx = await browser.newContext({ viewport: { width: 430, height: 932 }, deviceScaleFactor: 2 })
  const page = await ctx.newPage()
  const errors = []
  page.on('pageerror', (e) => errors.push('PAGEERROR ' + String(e.message)))
  await page.goto(FIGMA, { waitUntil: 'networkidle' })
  await page.waitForTimeout(1500)
  const skip = page.getByRole('button', { name: /omitir/i }).first()
  if (await skip.count()) { await skip.click({ timeout: 8000 }); await page.waitForTimeout(1800) }
  const login = page.getByRole('button', { name: /^ingresar$/i })
  if ((await login.count()) > 0) { await login.last().click({ timeout: 8000 }); await page.waitForTimeout(2200) }
  return { ctx, page, errors }
}

const save = async (page, name, quiet) => {
  await page.waitForTimeout(700)
  const info = await page.evaluate(DUMP)
  fs.writeFileSync(path.join(OUT, `${name}.json`), JSON.stringify(info, null, 2))
  await page.screenshot({ path: path.join(OUT, `${name}.png`) })
  if (!quiet) {
    console.log(`### ${name} nav=${info.navScreenId} controls=${info.controls.length}`)
    console.log(`  headings=${JSON.stringify(info.headings)}`)
    console.log(`  controls=${JSON.stringify(info.controls.map((c) => ({ al: c.al, t: c.text, tid: c.testid, sel: c.selected, y: c.y })))}`)
    console.log(`  body=${JSON.stringify(info.bodyText)}`)
  }
  return info
}

const openMas = async (page, label) => {
  await page.locator('[aria-label="Abrir Más opciones"]').first().click({ timeout: 8000 })
  await page.waitForTimeout(900)
  await page.getByRole('button', { name: new RegExp(label) }).first().click({ timeout: 10000 })
  await page.waitForTimeout(1400)
}

const run = async () => {
  const browser = await chromium.launch({ executablePath: CHROMIUM_EXE, headless: true })

  // ── Activos ────────────────────────────────────────────────────────────────
  {
    const { ctx, page, errors } = await boot(browser)
    await openMas(page, 'Activos')
    await save(page, '_r02-act-01-root')
    await ctx.close()
    console.log('ACT_ERRORS=' + JSON.stringify(errors))
  }

  // ── HomeCloud ──────────────────────────────────────────────────────────────
  {
    const { ctx, page, errors } = await boot(browser)
    await openMas(page, 'HomeCloud')
    await save(page, '_r03-hc-01-root')
    await ctx.close()
    console.log('HC_ERRORS=' + JSON.stringify(errors))
  }

  await browser.close()
}

run().catch((e) => { console.error('FATAL', e); process.exit(1) })