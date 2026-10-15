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
  for (const el of document.querySelectorAll('button,[role=button],[role=tab],input,select,textarea,a[href]')) { if (!vis(el)) continue; ctrls.push({ tag: el.tagName, role: el.getAttribute('role'), ariaLabel: el.getAttribute('aria-label'), testid: el.getAttribute('data-testid'), text: txt(el).slice(0, 70), ...box(el), ...styleOf(el) }) }
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
  for (const n of ['--color-brand','--color-brand-500','--color-brand-700','--color-brand-pressed','--color-brand-soft','--color-brand-200','--color-canvas','--color-canvas-alt','--color-surface','--color-surface-muted','--color-ink','--color-ink-2','--color-ink-3','--color-ink-4','--color-ink-5','--color-border','--color-border-subtle','--font-sans','--font-display','--radius-md','--radius-lg','--radius-xl','--radius-2xl']) tokens[n] = cs.getPropertyValue(n).trim()
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
}
const openMas = async (page, label) => { await page.locator('[aria-label="Abrir Más opciones"]:visible').first().click({ timeout: 8000 }); await page.waitForTimeout(800); await page.getByRole('button', { name: new RegExp(label) }).first().click({ timeout: 10000 }); await page.waitForTimeout(1400) }
const click = async (page, sel, t = 9000) => { const loc = page.locator(sel).first(); if (!(await loc.count())) { L(`  MISSING ${sel}`); return false } try { await loc.click({ timeout: t }); await page.waitForTimeout(1100); return true } catch (e) { L(`  FAIL ${sel} ${String(e).slice(0, 60)}`); return false } }
const byA = (page, s, t = 9000) => click(page, `[aria-label="${s}"]:visible`, t)
const esc = async (page) => { await page.keyboard.press('Escape'); await page.waitForTimeout(900) }
const back = async (page) => { if (!(await byA(page, 'Volver'))) await page.goBack(); await page.waitForTimeout(1100) }
const scrollAll = async (page) => { await page.evaluate(() => { for (const el of document.querySelectorAll('div')) if (el.scrollHeight > el.clientHeight + 30 && el.clientHeight > 150) el.scrollTop = el.scrollHeight }); await page.waitForTimeout(700) }

const run = async () => {
  const browser = await chromium.launch({ executablePath: CHROMIUM_EXE, headless: true })
  const ERR = []

  // ═════ Activos: secondary lists + nested "Guardar información" ═════
  {
    const { ctx, page, errors } = await boot(browser)
    await openMas(page, 'Activos')
    if (await click(page, 'button:has-text("Archivados")')) { await capture(page, 'fig-act-archivados'); await back(page) }
    if (await click(page, 'button:has-text("Papelera")')) { await capture(page, 'fig-act-papelera'); await back(page) }
    await click(page, '[aria-label="Ver Toyota Corolla"]:visible')
    if (await byA(page, 'Agregar a Toyota Corolla')) {
      if (await click(page, '[role=dialog] button:has-text("Guardar información")')) { await capture(page, 'fig-act-add-info-kind') }
    }
    ERR.push(...errors.map((e) => 'A:' + e)); await ctx.close()
  }

  // ═════ HomeCloud: memory add menu (audio), file info, memory info, viewer ═════
  {
    const { ctx, page, errors } = await boot(browser)
    await openMas(page, 'HomeCloud')
    // FILES: file menu -> Informacion (media info)
    const opt = page.locator('[aria-label^="Opciones de"]:visible').first()
    if (await opt.count()) {
      await opt.click(); await page.waitForTimeout(1100); await capture(page, 'fig-hc-file-menu')
      if (await click(page, '[role=dialog] button:has-text("Información")')) { await capture(page, 'fig-hc-file-info'); await esc(page) }
    } else L('  MISSING file options')
    // RECUERDOS: create menu (audio)
    if (await byA(page, 'Recuerdos')) {
      if (await byA(page, 'Guardar un recuerdo')) { await capture(page, 'fig-hc-memory-add-menu') }
      else L('  MISSING Guardar un recuerdo')
      await esc(page)
      // memory info: open first memory tile menu
      const tm = page.locator('button[aria-label^="Opciones del recuerdo"], button[aria-label^="Opciones de recuerdo"]').first()
      const anyT = await page.locator('[data-hc-scroll]:not([hidden]) button').count()
      L(`  memories visible buttons=${anyT}`)
      const memInfo = page.locator('[role=dialog] button:has-text("Información")').first()
      // use timeline tile long-press alternative: click the ⋯ on a tile
      const dots = page.locator('[data-hc-scroll]:not([hidden]) button').filter({ has: page.locator('svg') })
      L(`  dot-ish buttons=${await dots.count()}`)
      if (await byA(page, 'Más opciones')) { await capture(page, 'fig-hc-recuerdos-menu') }
    }
    ERR.push(...errors.map((e) => 'HC1:' + e)); await ctx.close()
  }

  // ═════ HomeCloud: albums surface + album detail + viewer ═════
  {
    const { ctx, page, errors } = await boot(browser)
    await openMas(page, 'HomeCloud')
    await byA(page, 'Recuerdos')
    if (await click(page, 'button:has-text("Ver todos")')) {
      await capture(page, 'fig-hc-albumes')
      const rows = page.locator('[data-hc-scroll]:not([hidden]) button').first()
      if (await rows.count()) { await rows.click(); await page.waitForTimeout(1300); await capture(page, 'fig-hc-album-detail') }
      else L('  MISSING album rows')
    }
    ERR.push(...errors.map((e) => 'HC2:' + e)); await ctx.close()
  }

  // ═════ HomeCloud: viewer (media info via viewer) + audio memory ═════
  {
    const { ctx, page, errors } = await boot(browser)
    await openMas(page, 'HomeCloud')
    const f = page.locator('button:has-text("Claves wifi")').first()
    if (await f.count()) { await f.click(); await page.waitForTimeout(1400); await capture(page, 'fig-hc-viewer-archivo') } else L('  MISSING viewer file')
    ERR.push(...errors.map((e) => 'HC3:' + e)); await ctx.close()
  }

  fs.writeFileSync(path.join(OUT, '_errors-r06.json'), JSON.stringify(ERR, null, 2))
  L('\nR06_ERRORS=' + JSON.stringify(ERR))
  await browser.close()
}
run().catch((e) => { console.error('FATAL', e); process.exit(1) })