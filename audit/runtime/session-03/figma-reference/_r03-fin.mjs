import fs from 'node:fs'
import path from 'node:path'
import { chromium, CHROMIUM_EXE } from '../_tooling/pw.mjs'

const FIGMA = process.env.FIGMA_URL || 'http://127.0.0.1:8445/'
const OUT = 'C:/Users/thega/Desktop/HomeplusPresentacion01/HomePlus_Presentacion_FINAL/audit/runtime/session-03/figma-reference'

const CENSUS = () => {
  const s0 = (el) => getComputedStyle(el)
  const visSelf = (el) => { const s = s0(el); const r = el.getBoundingClientRect(); return s.display !== 'none' && s.visibility !== 'hidden' && parseFloat(s.opacity) > 0.02 && r.width > 0 && r.height > 0 }
  const vis = (el) => {
    if (!visSelf(el)) return false
    let p = el.parentElement
    while (p) {
      const ps = s0(p)
      if (ps.display === 'none' || ps.visibility === 'hidden' || parseFloat(ps.opacity) <= 0.02) return false
      p = p.parentElement
    }
    return true
  }
  const txt = (el) => (el.innerText || el.getAttribute('aria-label') || el.getAttribute('placeholder') || '').replace(/\s+/g, ' ').trim()
  const box = (el) => { const r = el.getBoundingClientRect(); return { w: +r.width.toFixed(1), h: +r.height.toFixed(1), x: Math.round(r.x), y: Math.round(r.y) } }
  const styleOf = (el) => {
    const s = getComputedStyle(el)
    return { fontSize: s.fontSize, fontWeight: s.fontWeight, lineHeight: s.lineHeight,
      fontFamily: s.fontFamily.split(',')[0].replace(/["']/g, ''),
      letterSpacing: s.letterSpacing === 'normal' ? 'normal' : s.letterSpacing,
      textTransform: s.textTransform, color: s.color, backgroundColor: s.backgroundColor,
      borderRadius: s.borderRadius,
      border: s.borderTopWidth === '0px' ? 'none' : `${s.borderTopWidth} ${s.borderTopStyle} ${s.borderTopColor}`,
      padding: `${s.paddingTop} ${s.paddingRight} ${s.paddingBottom} ${s.paddingLeft}`,
      fontVariantNumeric: s.fontVariantNumeric }
  }
  const texts = []
  for (const el of document.querySelectorAll('*')) {
    if (el.children.length) continue
    const t = txt(el); if (!t || !vis(el)) continue
    texts.push({ tag: el.tagName, text: t.slice(0, 90), ...box(el), ...styleOf(el) })
  }
  const ctrls = []
  for (const el of document.querySelectorAll('button,[role=button],[role=tab],input,select,textarea,a[href]')) {
    if (!vis(el)) continue
    ctrls.push({ tag: el.tagName, role: el.getAttribute('role'), ariaLabel: el.getAttribute('aria-label'),
      ariaSelected: el.getAttribute('aria-selected'), ariaPressed: el.getAttribute('aria-pressed'),
      testid: el.getAttribute('data-testid'), text: txt(el).slice(0, 70), ...box(el), ...styleOf(el) })
  }
  const surfaces = []
  for (const el of document.querySelectorAll('div,section,ul,nav,header,main,li')) {
    if (!vis(el)) continue
    const s = getComputedStyle(el)
    const hasBg = s.backgroundColor && s.backgroundColor !== 'rgba(0, 0, 0, 0)'
    const hasRadius = parseFloat(s.borderRadius) > 0
    if (!hasBg && !hasRadius) continue
    if (s.backgroundImage !== 'none') continue
    const r = el.getBoundingClientRect()
    if (r.width < 40 || r.height < 18) continue
    surfaces.push({ tag: el.tagName, testid: el.getAttribute('data-testid'), radius: s.borderRadius,
      bg: s.backgroundColor,
      border: s.borderTopWidth === '0px' ? 'none' : `${s.borderTopWidth} ${s.borderTopStyle} ${s.borderTopColor}`,
      padding: `${s.paddingTop} ${s.paddingRight} ${s.paddingBottom} ${s.paddingLeft}`,
      shadow: s.boxShadow === 'none' ? 'none' : s.boxShadow, ...box(el) })
  }
  const cs = getComputedStyle(document.documentElement)
  const tokens = {}
  for (const n of ['--color-brand','--color-brand-500','--color-brand-600','--color-brand-700','--color-brand-soft','--color-brand-100','--color-brand-200','--color-brand-400','--color-canvas','--color-canvas-soft','--color-canvas-alt','--color-surface','--color-surface-muted','--color-ink','--color-ink-2','--color-ink-3','--color-ink-4','--color-ink-5','--color-border','--color-border-strong','--color-border-subtle','--color-success','--color-success-strong','--color-success-soft','--color-warning','--color-warning-strong','--color-warning-soft','--color-warning-ink','--color-danger','--color-danger-strong','--color-danger-soft','--color-info','--color-info-soft','--font-sans','--font-display','--radius-sm','--radius-md','--radius-lg','--radius-xl','--radius-2xl'])
    tokens[n] = cs.getPropertyValue(n).trim()
  const fontHist = {}
  for (const t of texts) { const k = t.fontSize + '/' + t.fontWeight; fontHist[k] = (fontHist[k] || 0) + 1 }
  return { url: location.href, navScreenId: document.querySelector('[data-nav-screen-id]')?.getAttribute('data-nav-screen-id') ?? null,
    tokens, bodyFontFamily: getComputedStyle(document.body).fontFamily,
    texts, ctrls, surfaces, fontHist,
    smallest: Object.keys(fontHist).sort((a, b) => parseFloat(a) - parseFloat(b)).slice(0, 6) }
}

const ANATOMY = () => {
  const vis = (el) => { const s = getComputedStyle(el); const r = el.getBoundingClientRect(); return s.display !== 'none' && s.visibility !== 'hidden' && r.width > 0 && r.height > 0 }
  const txt = (el) => (el.innerText || el.getAttribute('aria-label') || '').replace(/\s+/g, ' ').trim()
  return {
    url: location.href,
    navScreenId: document.querySelector('[data-nav-screen-id]')?.getAttribute('data-nav-screen-id') ?? null,
    headings: [...document.querySelectorAll('h1,h2,h3')].filter(vis).map((el) => ({ tag: el.tagName, text: txt(el), fs: getComputedStyle(el).fontSize, fw: getComputedStyle(el).fontWeight, color: getComputedStyle(el).color })),
    controls: [...document.querySelectorAll('button,[role=button],[role=tab],a[href],input,select,textarea')].filter(vis)
      .map((el) => { const r = el.getBoundingClientRect(); return { al: el.getAttribute('aria-label'), t: txt(el).slice(0, 70), tid: el.getAttribute('data-testid'), sel: el.getAttribute('aria-selected'), x: Math.round(r.x), y: Math.round(r.y) } }),
    dialogs: [...document.querySelectorAll('[role=dialog],[role=alertdialog]')].filter(vis).map((el) => ({ al: el.getAttribute('aria-label'), modal: el.getAttribute('aria-modal') })),
    testids: [...new Set([...document.querySelectorAll('[data-testid]')].filter(vis).map((e) => e.getAttribute('data-testid')))],
    bodyText: (document.body.innerText || '').replace(/\n{2,}/g, '\n').slice(0, 9000),
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
const write = (n, o) => fs.writeFileSync(path.join(OUT, `${n}.json`), JSON.stringify(o, null, 2))
const log = (s) => console.log(s)

const capture = async (page, name, { census = true, v = true } = {}) => {
  await page.waitForTimeout(650)
  const a = await page.evaluate(ANATOMY)
  write(`${name}.json`, a)
  await page.screenshot({ path: path.join(OUT, `${name}.png`) })
  let c = null
  if (census) { c = await page.evaluate(CENSUS); write(`${name}.census.json`, c) }
  if (v) {
    log(`\n### ${name}  nav=${a.navScreenId}  dialogs=${JSON.stringify(a.dialogs)}`)
    log(`  headings=${JSON.stringify(a.headings)}`)
    log(`  controls=${JSON.stringify(a.controls.map((x) => ({ al: x.al, t: x.t, tid: x.tid, sel: x.sel, y: x.y })))}`)
    log(`  body=${JSON.stringify(a.bodyText)}`)
    if (c) log(`  fontHist=${JSON.stringify(c.fontHist)} smallest=${JSON.stringify(c.smallest)}`)
  }
  return { a, c }
}

const openMas = async (page, label) => {
  await page.locator('[aria-label="Abrir Más opciones"]').first().click({ timeout: 8000 })
  await page.waitForTimeout(800)
  await page.getByRole('button', { name: new RegExp(label) }).first().click({ timeout: 10000 })
  await page.waitForTimeout(1400)
}
const byLabel = async (page, al, t = 8000) => { await page.locator(`[aria-label="${al}"]`).first().click({ timeout: t }); await page.waitForTimeout(1100) }
const byRole = async (page, name, t = 8000) => { await page.getByRole('button', { name, exact: true }).first().click({ timeout: t }); await page.waitForTimeout(1100) }
const back = async (page) => { const b = page.locator('[aria-label="Volver"]').first(); if (await b.count()) { await b.click(); } else { await page.goBack() } await page.waitForTimeout(1200) }
const has = async (page, al) => (await page.locator(`[aria-label="${al}"]`).count()) > 0

const run = async () => {
  const browser = await chromium.launch({ executablePath: CHROMIUM_EXE, headless: true })
  const ERRORS = []

  // ══════════ FINANCE A: Resumen + scope + Analisis + Organizar ══════════
  {
    const { ctx, page, errors } = await boot(browser)
    await openMas(page, 'Finanzas')
    await capture(page, 'fig-fin-resumen')

    await byLabel(page, 'Personal'); await capture(page, 'fig-fin-resumen-personal'); await byLabel(page, 'Hogar')

    await byLabel(page, 'Ver análisis detallado')
    await capture(page, 'fig-fin-analisis')
    // analysis sub-tabs
    for (const t of ['Gastos', 'Ingresos', 'Evolución']) {
      const loc = page.getByRole('button', { name: t, exact: true })
      if (await loc.count()) { await loc.first().click(); await page.waitForTimeout(900); await capture(page, `fig-fin-analisis-${t.toLowerCase().replace(/[^a-z]/g, '')}`) }
      else log(`MISSING_ANALISIS_TAB ${t}`)
    }
    await back(page)

    await byLabel(page, 'Administrar límites de gasto')
    await capture(page, 'fig-fin-limites')
    await back(page)

    await byLabel(page, 'Organizar dinero')
    await capture(page, 'fig-fin-organizacion')
    await back(page)

    ERRORS.push(...errors.map((e) => 'A:' + e))
    await ctx.close()
  }

  // ══════════ FINANCE B: Movimientos + sheets ══════════
  {
    const { ctx, page, errors } = await boot(browser)
    await openMas(page, 'Finanzas')
    await byRole(page, 'Movimientos')
    await capture(page, 'fig-fin-movimientos')

    // Filtros sheet
    const f = page.locator('[aria-label="Filtros"]').first()
    if (await f.count()) { await f.click(); await page.waitForTimeout(1100); await capture(page, 'fig-fin-mov-filtros-sheet') }
    else log('MISSING mov-filtros')
    // close sheet via scrim / Cerrar
    const close = page.locator('[aria-label="Cerrar"]').first()
    if (await close.count()) { await close.click(); await page.waitForTimeout(900) }
    else { await page.keyboard.press('Escape'); await page.waitForTimeout(900) }

    // Nuevo movimiento
    if (await has(page, 'Nuevo movimiento')) {
      await byLabel(page, 'Nuevo movimiento')
      await capture(page, 'fig-fin-mov-nuevo')
      // scroll inside the sheet to reveal the whole form
      await page.evaluate(() => {
        const d = document.querySelectorAll('div'); for (const el of d) if (el.scrollHeight > el.clientHeight + 40 && el.clientHeight > 200) { el.scrollTop = el.scrollHeight; }
      })
      await page.waitForTimeout(700)
      await capture(page, 'fig-fin-mov-nuevo-scrolled')
      const close = page.locator('[aria-label^="Cerrar"]').first()
      if (await close.count()) { await close.click(); await page.waitForTimeout(900) }
      else { await page.keyboard.press('Escape'); await page.waitForTimeout(900) }
    } else log('MISSING nuevo-movimiento')

    // first movement row -> movement detail
    await byRole(page, 'Movimientos')
    await page.waitForTimeout(900)
    const rows = page.locator('[data-testid^="movimiento-"]')
    const n = await rows.count()
    log(`  movimiento rows=${n}`)
    if (n > 0) { await rows.first().click(); await page.waitForTimeout(1200); await capture(page, 'fig-fin-mov-detalle') }
    else log('MISSING movimiento rows')

    ERRORS.push(...errors.map((e) => 'B:' + e))
    await ctx.close()
  }

  // ══════════ FINANCE C: Pagos ══════════
  {
    const { ctx, page, errors } = await boot(browser)
    await openMas(page, 'Finanzas')
    await byRole(page, 'Pagos')
    await capture(page, 'fig-fin-pagos')
    const due = page.locator('[data-testid^="pago-"]')
    log(`  pago nodes=${await due.count()}`)
    // try the most likely payment affordances
    for (const al of ['Nuevo pago', 'Agregar pago', 'Registrar pago']) if (await has(page, al)) { log(`  FOUND ${al}`) }
    await back(page)
    ERRORS.push(...errors.map((e) => 'C:' + e))
    await ctx.close()
  }

  log('\nERRORS=' + JSON.stringify(ERRORS))
  fs.writeFileSync(path.join(OUT, '_fin-errors.json'), JSON.stringify(ERRORS, null, 2))
  await browser.close()
}
run().catch((e) => { console.error('FATAL', e); process.exit(1) })