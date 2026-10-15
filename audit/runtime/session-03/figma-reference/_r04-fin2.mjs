import fs from 'node:fs'
import path from 'node:path'
import { chromium, CHROMIUM_EXE } from '../_tooling/pw.mjs'

const FIGMA = process.env.FIGMA_URL || 'http://127.0.0.1:8445/'
const OUT = 'C:/Users/thega/Desktop/HomeplusPresentacion01/HomePlus_Presentacion_FINAL/audit/runtime/session-03/figma-reference'
const L = (s) => console.log(s)

const CENSUS = () => {
  const gs = (el) => getComputedStyle(el)
  const visSelf = (el) => { const s = gs(el); const r = el.getBoundingClientRect(); return s.display !== 'none' && s.visibility !== 'hidden' && parseFloat(s.opacity) > 0.02 && r.width > 0 && r.height > 0 }
  const vis = (el) => { if (!visSelf(el)) return false; let p = el.parentElement; while (p) { const ps = gs(p); if (ps.display === 'none' || ps.visibility === 'hidden' || parseFloat(ps.opacity) <= 0.02) return false; p = p.parentElement } return true }
  const txt = (el) => (el.innerText || el.getAttribute('aria-label') || el.getAttribute('placeholder') || '').replace(/\s+/g, ' ').trim()
  const box = (el) => { const r = el.getBoundingClientRect(); return { w: +r.width.toFixed(1), h: +r.height.toFixed(1), x: Math.round(r.x), y: Math.round(r.y) } }
  const styleOf = (el) => { const s = gs(el); return { fontSize: s.fontSize, fontWeight: s.fontWeight, lineHeight: s.lineHeight, fontFamily: s.fontFamily.split(',')[0].replace(/["']/g, ''), letterSpacing: s.letterSpacing === 'normal' ? 'normal' : s.letterSpacing, textTransform: s.textTransform, color: s.color, backgroundColor: s.backgroundColor, borderRadius: s.borderRadius, border: s.borderTopWidth === '0px' ? 'none' : `${s.borderTopWidth} ${s.borderTopStyle} ${s.borderTopColor}`, padding: `${s.paddingTop} ${s.paddingRight} ${s.paddingBottom} ${s.paddingLeft}`, fontVariantNumeric: s.fontVariantNumeric } }
  const texts = []
  for (const el of document.querySelectorAll('*')) { if (el.children.length) continue; const t = txt(el); if (!t || !vis(el)) continue; texts.push({ tag: el.tagName, text: t.slice(0, 90), ...box(el), ...styleOf(el) }) }
  const ctrls = []
  for (const el of document.querySelectorAll('button,[role=button],[role=tab],input,select,textarea,a[href]')) { if (!vis(el)) continue; ctrls.push({ tag: el.TagName || el.tagName, role: el.getAttribute('role'), ariaLabel: el.getAttribute('aria-label'), ariaSelected: el.getAttribute('aria-selected'), ariaChecked: el.getAttribute('aria-checked'), ariaPressed: el.getAttribute('aria-pressed'), testid: el.getAttribute('data-testid'), text: txt(el).slice(0, 70), ...box(el), ...styleOf(el) }) }
  const surfaces = []
  for (const el of document.querySelectorAll('div,section,ul,nav,header,main,li')) {
    if (!vis(el)) continue; const s = gs(el)
    const hasBg = s.backgroundColor && s.backgroundColor !== 'rgba(0, 0, 0, 0)'
    if (!hasBg && parseFloat(s.borderRadius) <= 0) continue
    if (s.backgroundImage !== 'none') continue
    const r = el.getBoundingClientRect(); if (r.width < 40 || r.height < 18) continue
    surfaces.push({ tag: el.tagName, testid: el.getAttribute('data-testid'), radius: s.borderRadius, bg: s.backgroundColor, border: s.borderTopWidth === '0px' ? 'none' : `${s.borderTopWidth} ${s.borderTopStyle} ${s.borderTopColor}`, padding: `${s.paddingTop} ${s.paddingRight} ${s.paddingBottom} ${s.paddingLeft}`, shadow: s.boxShadow === 'none' ? 'none' : s.boxShadow, ...box(el) })
  }
  const cs = getComputedStyle(document.documentElement)
  const tokens = {}
  for (const n of ['--color-brand','--color-brand-500','--color-brand-600','--color-brand-700','--color-brand-pressed','--color-brand-soft','--color-brand-100','--color-brand-200','--color-brand-400','--color-canvas','--color-canvas-soft','--color-canvas-alt','--color-surface','--color-surface-muted','--color-ink','--color-ink-2','--color-ink-3','--color-ink-4','--color-ink-5','--color-border','--color-border-strong','--color-border-subtle','--color-success','--color-success-strong','--color-success-soft','--color-warning','--color-warning-strong','--color-warning-soft','--color-warning-ink','--color-danger','--color-danger-strong','--color-danger-soft','--color-info','--color-info-soft','--font-sans','--font-display','--radius-xs','--radius-sm','--radius-md','--radius-button','--radius-lg','--radius-xl','--radius-2xl','--radius-full','--shadow-1','--shadow-2','--shadow-3']) tokens[n] = cs.getPropertyValue(n).trim()
  const fontHist = {}
  for (const t of texts) { const k = t.fontSize + '/' + t.fontWeight; fontHist[k] = (fontHist[k] || 0) + 1 }
  return { url: location.href, navScreenId: document.querySelector('[data-nav-screen-id]')?.getAttribute('data-nav-screen-id') ?? null, tokens, texts, ctrls, surfaces, fontHist, smallest: Object.keys(fontHist).sort((a, b) => parseFloat(a) - parseFloat(b)).slice(0, 8) }
}

const ANATOMY = () => {
  const vis = (el) => { const s = getComputedStyle(el); const r = el.getBoundingClientRect(); return s.display !== 'none' && s.visibility !== 'hidden' && r.width > 0 && r.height > 0 }
  const txt = (el) => (el.innerText || el.getAttribute('aria-label') || '').replace(/\s+/g, ' ').trim()
  return {
    url: location.href,
    navScreenId: document.querySelector('[data-nav-screen-id]')?.getAttribute('data-nav-screen-id') ?? null,
    headings: [...document.querySelectorAll('h1,h2,h3')].filter(vis).map((el) => ({ tag: el.tagName, text: txt(el), fs: getComputedStyle(el).fontSize, fw: getComputedStyle(el).fontWeight })),
    controls: [...document.querySelectorAll('button,[role=button],[role=tab],[role=radio],a[href],input,select,textarea')].filter(vis).map((el) => { const r = el.getBoundingClientRect(); return { role: el.getAttribute('role'), al: el.getAttribute('aria-label'), t: txt(el).slice(0, 70), tid: el.getAttribute('data-testid'), sel: el.getAttribute('aria-selected'), x: Math.round(r.x), y: Math.round(r.y) } }),
    dialogs: [...document.querySelectorAll('[role=dialog],[role=alertdialog]')].filter(vis).map((el) => ({ al: el.getAttribute('aria-label'), modal: el.getAttribute('aria-modal'), h: Math.round(el.getBoundingClientRect().height) })),
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

const capture = async (page, name, { v = true } = {}) => {
  await page.waitForTimeout(650)
  const a = await page.evaluate(ANATOMY); write(name, a)
  await page.screenshot({ path: path.join(OUT, `${name}.png`) })
  const c = await page.evaluate(CENSUS); write(`${name}.census`, c)
  if (v) {
    L(`\n### ${name}  nav=${a.navScreenId}  dialogs=${JSON.stringify(a.dialogs)}`)
    L(`  headings=${JSON.stringify(a.headings)}`)
    L(`  controls=${JSON.stringify(a.controls.map((x) => ({ al: x.al, t: x.t, role: x.role, tid: x.tid, sel: x.sel, y: x.y })))}`)
    L(`  testids=${JSON.stringify(a.testids)}`)
    L(`  body=${JSON.stringify(a.bodyText)}`)
    L(`  fontHist=${JSON.stringify(c.fontHist)}`)
  }
  return { a, c }
}

const openMas = async (page, label) => {
  await page.locator('[aria-label="Abrir Más opciones"]').first().click({ timeout: 8000 }); await page.waitForTimeout(800)
  await page.getByRole('button', { name: new RegExp(label) }).first().click({ timeout: 10000 }); await page.waitForTimeout(1400)
}
const click = async (page, sel, t = 9000) => {
  const loc = page.locator(sel).first()
  if (!(await loc.count())) { L(`  MISSING ${sel}`); return false }
  try { await loc.click({ timeout: t }); await page.waitForTimeout(1100); return true } catch (e) { L(`  FAIL ${sel}: ${String(e).slice(0, 80)}`); return false }
}
const al = (page, s) => `[aria-label="${s}"]`
const byA = async (page, s, t = 9000) => click(page, al(page, s), t)
const back = async (page) => { if (!(await byA(page, 'Volver'))) await page.goBack(); await page.waitForTimeout(1000) }
const esc = async (page) => { await page.keyboard.press('Escape'); await page.waitForTimeout(900) }
const scrollAll = async (page) => { await page.evaluate(() => { for (const el of document.querySelectorAll('div')) if (el.scrollHeight > el.clientHeight + 30 && el.clientHeight > 150) el.scrollTop = el.scrollHeight }); await page.waitForTimeout(700) }

const run = async () => {
  const browser = await chromium.launch({ executablePath: CHROMIUM_EXE, headless: true })
  const ERR = []

  // ═════ FINANCE 1: Resumen scrolled, Analisis tabs, Organizar, Limites ═════
  {
    const { ctx, page, errors } = await boot(browser)
    await openMas(page, 'Finanzas')
    await scrollAll(page)
    await capture(page, 'fig-fin-resumen-scrolled')
    await page.evaluate(() => { for (const el of document.querySelectorAll('div')) if (el.scrollHeight > el.clientHeight + 30 && el.clientHeight > 150) el.scrollTop = 0 })
    await page.waitForTimeout(500)

    // Analisis + its three tabs
    if (await byA(page, 'Ver análisis detallado')) {
      for (const t of ['Gastos', 'Ingresos', 'Evolución']) {
        if (await byA(page, t)) await capture(page, `fig-fin-analisis-${t.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()}`)
        else L(`  MISSING_ANALISIS_TAB ${t}`)
      }
      await back(page)
    }
    // Organizar
    if (!(await byA(page, 'Organizar dinero'))) { await openMas(page, 'Finanzas') }
    if (await byA(page, 'Organizar dinero')) { await capture(page, 'fig-fin-organizacion'); await scrollAll(page); await capture(page, 'fig-fin-organizacion-scrolled'); await back(page) }
    // Limites -> create limit sheet + categorias
    if (!(await byA(page, 'Administrar límites de gasto'))) { await openMas(page, 'Finanzas') }
    if (await byA(page, 'Administrar límites de gasto')) {
      await capture(page, 'fig-fin-limites')
      if (await byA(page, 'Crear límite')) { await capture(page, 'fig-fin-limites-crear'); await esc(page) }
      if (await byA(page, 'Agregar límite por categoría')) { await capture(page, 'fig-fin-limites-agregar-categoria'); await esc(page) }
      if (await byA(page, 'Administrar categorías')) { await capture(page, 'fig-fin-limites-categorias'); await esc(page) }
      await back(page)
    }
    ERR.push(...errors.map((e) => 'F1:' + e)); await ctx.close()
  }

  // ═════ FINANCE 2: Movimientos + sheets + account picker ═════
  {
    const { ctx, page, errors } = await boot(browser)
    await openMas(page, 'Finanzas')
    await click(page, '[aria-label="Movimientos"]')
    await capture(page, 'fig-fin-movimientos')
    await scrollAll(page); await capture(page, 'fig-fin-movimientos-scrolled')

    if (await byA(page, 'Filtros')) { await capture(page, 'fig-fin-mov-filtros'); await esc(page) }
    if (await byA(page, 'Nuevo movimiento')) {
      await capture(page, 'fig-fin-mov-nuevo')
      await scrollAll(page); await capture(page, 'fig-fin-mov-nuevo-scrolled')
      await esc(page)
    }
    await click(page, '[aria-label="Resumen"]')
    await click(page, '[aria-label="Movimientos"]')
    const rows = page.locator('[data-testid^="movimiento-"]')
    const n = await rows.count(); L(`\n  movimiento rows=${n}`)
    if (n > 0) {
      await rows.nth(Math.min(2, n - 1)).click(); await page.waitForTimeout(1300)
      await capture(page, 'fig-fin-mov-detalle')
      await scrollAll(page); await capture(page, 'fig-fin-mov-detalle-scrolled')
      await esc(page)
    }
    if (await byA(page, 'Abrir Papelera')) { await capture(page, 'fig-fin-papelera'); await back(page) }
    ERR.push(...errors.map((e) => 'F2:' + e)); await ctx.close()
  }

  // ═════ FINANCE 3: Pagos ═════
  {
    const { ctx, page, errors } = await boot(browser)
    await openMas(page, 'Finanzas')
    await click(page, '[aria-label="Pagos"]')
    await capture(page, 'fig-fin-pagos')
    const tiles = page.locator('[data-testid^="pago-tarjeta-"]'); const nt = await tiles.count()
    const dues = page.locator('[data-testid^="pago-due-"]'); const nd = await dues.count()
    L(`\n  pago tiles=${nt} dues=${nd}`)
    if (nd > 0) { await dues.first().click(); await page.waitForTimeout(1300); await capture(page, 'fig-fin-pago-detalle'); await scrollAll(page); await capture(page, 'fig-fin-pago-detalle-scrolled'); await esc(page) }
    if (await byA(page, 'Nuevo pago')) { await capture(page, 'fig-fin-pago-nuevo'); await scrollAll(page); await capture(page, 'fig-fin-pago-nuevo-scrolled'); await esc(page) }
    if (await byA(page, 'Abrir Papelera de pagos')) { await capture(page, 'fig-fin-papelera-pagos'); await back(page) }
    ERR.push(...errors.map((e) => 'F3:' + e)); await ctx.close()
  }

  // ═════ FINANCE 4: Organizacion -> account/card picker & pools ═════
  {
    const { ctx, page, errors } = await boot(browser)
    await openMas(page, 'Finanzas')
    if (await byA(page, 'Organizar dinero')) {
      // enumerate all visible affordances on Organizacion
      const det = await page.evaluate(() => {
        const vis = (el) => { const s = getComputedStyle(el); const r = el.getBoundingClientRect(); return s.display !== 'none' && s.visibility !== 'hidden' && r.width > 0 && r.height > 0 }
        return [...document.querySelectorAll('[data-testid]')].filter(vis).map((e) => e.getAttribute('data-testid'))
      })
      L(`\n  ORGANIZACION testids=${JSON.stringify([...new Set(det)])}`)
      await capture(page, 'fig-fin-organizacion')
      // account rows
      const accs = page.locator('[data-testid^="organizacion-cuenta"],[data-testid*="account"]')
      const na = await accs.count(); L(`  organizacion account nodes=${na}`)
      const rowBtn = page.locator('[data-testid^="org-"] button, [data-testid^="organizacion"] button')
      const nr = await rowBtn.count(); L(`  organizacion inner buttons=${nr}`)
      if (nr > 0) { await rowBtn.nth(Math.min(1, nr - 1)).click(); await page.waitForTimeout(1300); await capture(page, 'fig-fin-cuenta-detalle'); await scrollAll(page); await capture(page, 'fig-fin-cuenta-detalle-scrolled'); await esc(page) }
    }
    ERR.push(...errors.map((e) => 'F4:' + e)); await ctx.close()
  }

  fs.writeFileSync(path.join(OUT, '_errors-finance.json'), JSON.stringify(ERR, null, 2))
  L('\nFINANCE_ERRORS=' + JSON.stringify(ERR))
  await browser.close()
}
run().catch((e) => { console.error('FATAL', e); process.exit(1) })