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
  for (const el of document.querySelectorAll('button,[role=button],[role=tab],input,select,textarea,a[href]')) { if (!vis(el)) continue; ctrls.push({ tag: el.tagName, role: el.getAttribute('role'), ariaLabel: el.getAttribute('aria-label'), ariaSelected: el.getAttribute('aria-selected'), ariaPressed: el.getAttribute('aria-pressed'), testid: el.getAttribute('data-testid'), text: txt(el).slice(0, 70), ...box(el), ...styleOf(el) }) }
  const surfaces = []
  for (const el of document.querySelectorAll('div,section,ul,nav,header,main,li')) {
    if (!vis(el)) continue; const s = gs(el)
    const hasBg = s.backgroundColor && s.backgroundColor !== 'rgba(0, 0, 0, 0)'
    if (!hasBg && parseFloat(s.borderRadius) <= 0) continue
    if (s.backgroundImage !== 'none') continue
    const r = el.getBoundingClientRect(); if (r.width < 40 || r.height < 18) continue
    surfaces.push({ tag: el.tagName, testid: el.getAttribute('data-testid'), radius: s.borderRadius, bg: s.backgroundColor, border: s.borderTopWidth === '0px' ? 'none' : `${s.borderTopWidth} ${s.borderTopStyle} ${s.borderTopColor}`, padding: `${s.paddingTop} ${s.paddingRight} ${s.paddingBottom} ${s.paddingLeft}`, shadow: s.boxShadow === 'none' ? 'none' : s.boxShadow, ...box(el) })
  }
  const cs = getComputedStyle(document.documentElement); const tokens = {}
  for (const n of ['--color-brand','--color-brand-500','--color-brand-700','--color-brand-pressed','--color-brand-soft','--color-brand-200','--color-canvas','--color-canvas-alt','--color-surface','--color-surface-muted','--color-ink','--color-ink-2','--color-ink-3','--color-ink-4','--color-ink-5','--color-border','--color-border-subtle','--color-success-strong','--color-success-soft','--color-warning-strong','--color-warning-soft','--color-warning-ink','--color-danger-strong','--color-danger-soft','--font-sans','--radius-md','--radius-lg','--radius-xl','--radius-2xl','--shadow-1']) tokens[n] = cs.getPropertyValue(n).trim()
  const fontHist = {}
  for (const t of texts) { const k = t.fontSize + '/' + t.fontWeight; fontHist[k] = (fontHist[k] || 0) + 1 }
  return { url: location.href, navScreenId: document.querySelector('[data-nav-screen-id]')?.getAttribute('data-nav-screen-id') ?? null, tokens, texts, ctrls, surfaces, fontHist, smallest: Object.keys(fontHist).sort((a, b) => parseFloat(a) - parseFloat(b)).slice(0, 8) }
}
const ANATOMY = () => {
  const vis = (el) => { const s = getComputedStyle(el); const r = el.getBoundingClientRect(); return s.display !== 'none' && s.visibility !== 'hidden' && r.width > 0 && r.height > 0 }
  const txt = (el) => (el.innerText || el.getAttribute('aria-label') || '').replace(/\s+/g, ' ').trim()
  return { url: location.href, navScreenId: document.querySelector('[data-nav-screen-id]')?.getAttribute('data-nav-screen-id') ?? null,
    headings: [...document.querySelectorAll('h1,h2,h3')].filter(vis).map((el) => ({ tag: el.tagName, text: txt(el), fs: getComputedStyle(el).fontSize, fw: getComputedStyle(el).fontWeight })),
    controls: [...document.querySelectorAll('button,[role=button],[role=tab],[role=radio],a[href],input,select,textarea')].filter(vis).map((el) => { const r = el.getBoundingClientRect(); return { role: el.getAttribute('role'), al: el.getAttribute('aria-label'), t: txt(el).slice(0, 70), tid: el.getAttribute('data-testid'), x: Math.round(r.x), y: Math.round(r.y) } }),
    dialogs: [...document.querySelectorAll('[role=dialog],[role=alertdialog]')].filter(vis).map((el) => ({ al: el.getAttribute('aria-label'), modal: el.getAttribute('aria-modal'), depth: el.getAttribute('data-depth'), h: Math.round(el.getBoundingClientRect().height) })),
    testids: [...new Set([...document.querySelectorAll('[data-testid]')].filter(vis).map((e) => e.getAttribute('data-testid')))],
    bodyText: (document.body.innerText || '').replace(/\n{2,}/g, '\n').slice(0, 9000) }
}
const boot = async (browser) => {
  const ctx = await browser.newContext({ viewport: { width: 430, height: 932 }, deviceScaleFactor: 2 })
  const page = await ctx.newPage(); const errors = []
  page.on('pageerror', (e) => errors.push('PAGEERROR ' + String(e.message)))
  await page.goto(FIGMA, { waitUntil: 'networkidle' }); await page.waitForTimeout(1500)
  const skip = page.getByRole('button', { name: /omitir/i }).first()
  if (await skip.count()) { await skip.click({ timeout: 8000 }); await page.waitForTimeout(1800) }
  const login = page.getByRole('button', { name: /^ingresar$/i })
  if ((await login.count()) > 0) { await login.last().click({ timeout: 8000 }); await page.waitForTimeout(2200) }
  return { ctx, page, errors }
}
const write = (n, o) => fs.writeFileSync(path.join(OUT, `${n}.json`), JSON.stringify(o, null, 2))
const capture = async (page, name) => {
  await page.waitForTimeout(650)
  const a = await page.evaluate(ANATOMY); write(name, a)
  await page.screenshot({ path: path.join(OUT, `${name}.png`) })
  const c = await page.evaluate(CENSUS); write(`${name}.census`, c)
  L(`\n### ${name}  nav=${a.navScreenId}  dialogs=${JSON.stringify(a.dialogs)}`)
  L(`  headings=${JSON.stringify(a.headings)}`)
  L(`  controls=${JSON.stringify(a.controls.map((x) => ({ al: x.al, t: x.t, role: x.role, tid: x.tid, y: x.y })))}`)
  L(`  testids=${JSON.stringify(a.testids)}`)
  L(`  body=${JSON.stringify(a.bodyText)}`)
  L(`  fontHist=${JSON.stringify(c.fontHist)}`)
  return { a, c }
}
const openMas = async (page, label) => { await page.locator('[aria-label="Abrir Más opciones"]').first().click({ timeout: 8000 }); await page.waitForTimeout(800); await page.getByRole('button', { name: new RegExp(label) }).first().click({ timeout: 10000 }); await page.waitForTimeout(1400) }
const click = async (page, sel, t = 9000) => { const loc = page.locator(sel).first(); if (!(await loc.count())) { L(`  MISSING ${sel}`); return false } try { await loc.click({ timeout: t }); await page.waitForTimeout(1100); return true } catch (e) { L(`  FAIL ${sel} ${String(e).slice(0, 70)}`); return false } }
const byA = (page, s, t = 9000) => click(page, `[aria-label="${s}"]`, t)
const esc = async (page) => { await page.keyboard.press('Escape'); await page.waitForTimeout(900) }
const back = async (page) => { if (!(await byA(page, 'Volver'))) await page.goBack(); await page.waitForTimeout(1000) }
const scrollAll = async (page) => { await page.evaluate(() => { for (const el of document.querySelectorAll('div')) if (el.scrollHeight > el.clientHeight + 30 && el.clientHeight > 150) el.scrollTop = el.scrollHeight }); await page.waitForTimeout(700) }

const run = async () => {
  const browser = await chromium.launch({ executablePath: CHROMIUM_EXE, headless: true })
  const ERR = []

  // ═════════ ACTivos: root + several details + add sheet + admin ═════════
  {
    const { ctx, page, errors } = await boot(browser)
    await openMas(page, 'Activos')
    await capture(page, 'fig-act-root')
    await scrollAll(page); await capture(page, 'fig-act-root-scrolled')
    for (const name of ['Toyota Corolla', 'PlayStation 5', 'Toby', 'Lámpara del living', 'Casa Córdoba']) {
      const sel = `[aria-label="Ver ${name}"]`
      if (!(await click(page, sel))) continue
      await capture(page, `fig-act-detail-${name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-')}`)
      await scrollAll(page)
      await capture(page, `fig-act-detail-${name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-')}-scrolled`)
      await back(page)
    }
    // add-asset sheet
    if (await byA(page, 'Agregar activo')) { await capture(page, 'fig-act-crear'); await esc(page) }
    // secondary lists
    if (await click(page, 'text=Archivados')) { await capture(page, 'fig-act-archivados'); await back(page) }
    if (await click(page, 'text=Papelera')) { await capture(page, 'fig-act-papelera'); await back(page) }
    ERR.push(...errors.map((e) => 'A:' + e)); await ctx.close()
  }

  // ═════════ ACTivos: detail +/··· (admin) + add menu + record detail ═════════
  {
    const { ctx, page, errors } = await boot(browser)
    await openMas(page, 'Activos')
    await click(page, '[aria-label="Ver Toyota Corolla"]')
    if (await byA(page, 'Administrar Toyota Corolla')) { await capture(page, 'fig-act-admin-menu'); await esc(page) }
    await back(page)
    await click(page, '[aria-label="Ver Toyota Corolla"]')
    if (await byA(page, 'Agregar a Toyota Corolla')) {
      await capture(page, 'fig-act-add-menu')
      // "Guardar información" -> "Informacion" kinds
      if (await click(page, 'text=Guardar información')) { await capture(page, 'fig-act-add-info-kind'); await esc(page); await esc(page) }
      else await esc(page)
    }
    await esc(page)
    ERR.push(...errors.map((e) => 'B:' + e)); await ctx.close()
  }

  // ═════════ HomeCloud: archivos / recuerdos / album / media info / memory add ═════════
  {
    const { ctx, page, errors } = await boot(browser)
    await openMas(page, 'HomeCloud')
    await capture(page, 'fig-hc-archivos')
    // folder
    if (await byA(page, 'Carpeta Casa')) { await capture(page, 'fig-hc-carpeta'); await back(page) }
    // file info: menu on first file
    const opt = page.locator('[aria-label^="Opciones de"]').first()
    if (await opt.count()) { await opt.click(); await page.waitForTimeout(1100); await capture(page, 'fig-hc-file-menu'); if (await click(page, 'text=Información')) { await capture(page, 'fig-hc-file-info'); await esc(page) } else await esc(page) }
    // memories
    if (await byA(page, 'Recuerdos')) {
      await capture(page, 'fig-hc-recuerdos')
      await scrollAll(page); await capture(page, 'fig-hc-recuerdos-scrolled')
      // more options -> album
      if (await byA(page, 'Más opciones')) { await capture(page, 'fig-hc-recuerdos-menu'); await esc(page) }
    }
    ERR.push(...errors.map((e) => 'HC1:' + e)); await ctx.close()
  }

  // ═════════ HomeCloud: album detail, memory create menu, memory info, viewer ═════════
  {
    const { ctx, page, errors } = await boot(browser)
    await openMas(page, 'HomeCloud')
    await byA(page, 'Recuerdos')
    // "Guardar un recuerdo" via ContextPlus
    const plus = page.locator('[aria-label^="Agregar a "],[aria-label^="Nuevo "]').first()
    if (await plus.count()) { await plus.click(); await page.waitForTimeout(1200); await capture(page, 'fig-hc-memory-add-menu'); await esc(page) }
    else L('  MISSING memories create plus')
    // album list via more-options menu
    if (await byA(page, 'Más opciones')) {
      await capture(page, 'fig-hc-menu-ROOT')
      const alb = page.locator('text=Álbumes').first()
      if (await alb.count()) { await alb.click(); await page.waitForTimeout(1200); await capture(page, 'fig-hc-albumes'); 
        // open an album
        const a2 = page.locator('[aria-label^="Abrir álbum"]').first()
        if (await a2.count()) { await a2.click(); await page.waitForTimeout(1300); await capture(page, 'fig-hc-album-detail') }
        else { const anyBtn = page.locator('button').filter({ hasText: /.+/ }); L(`  album buttons: ${await anyBtn.count()}`) }
      }
      await esc(page)
    }
    ERR.push(...errors.map((e) => 'HC2:' + e)); await ctx.close()
  }

  fs.writeFileSync(path.join(OUT, '_errors-assets-hc.json'), JSON.stringify(ERR, null, 2))
  L('\nASSETS_HC_ERRORS=' + JSON.stringify(ERR))
  await browser.close()
}
run().catch((e) => { console.error('FATAL', e); process.exit(1) })