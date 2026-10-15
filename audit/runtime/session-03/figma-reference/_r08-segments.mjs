import fs from 'node:fs'
import path from 'node:path'
import { chromium, CHROMIUM_EXE } from '../_tooling/pw.mjs'
const FIGMA = process.env.FIGMA_URL || 'http://127.0.0.1:8445/'
const OUT = 'C:/Users/thega/Desktop/HomeplusPresentacion01/HomePlus_Presentacion_FINAL/audit/runtime/session-03/figma-reference'

const boot = async (browser) => {
  const ctx = await browser.newContext({ viewport: { width: 430, height: 932 }, deviceScaleFactor: 2 })
  const page = await ctx.newPage()
  await page.goto(FIGMA, { waitUntil: 'networkidle' }); await page.waitForTimeout(1500)
  const skip = page.getByRole('button', { name: /omitir/i }).first()
  if (await skip.count()) { await skip.click({ timeout: 8000 }); await page.waitForTimeout(1800) }
  const login = page.getByRole('button', { name: /^ingresar$/i })
  if ((await login.count()) > 0) { await login.last().click({ timeout: 8000 }); await page.waitForTimeout(2200) }
  return { ctx, page }
}
const probe = () => {
  const out = {}
  for (const sel of ['[data-testid="finance-tabs"]', '[data-testid="finance-tabs-thumb"]', '[data-testid="finance-scope-switch"]', '[data-testid="finance-scope-switch-thumb"]', '[data-testid="resumen-currency-switch"]', '[data-testid="resumen-currency-switch-thumb"]', '[data-testid="homecloud-tabs"]', '[data-testid="homecloud-tabs-thumb"]', '[data-testid="movimientos-filter"]', '[data-testid="analisis-tabs"]', '[data-testid="limites-segment"]', 'header', '[data-nav-screen-id]']) {
    const el = document.querySelector(sel)
    if (!el) { out[sel] = null; continue }
    const s = getComputedStyle(el); const r = el.getBoundingClientRect()
    out[sel] = { tag: el.tagName, fs: s.fontSize, fw: s.fontWeight, lh: s.lineHeight, col: s.color, bg: s.backgroundColor, br: s.borderRadius, border: s.borderTopWidth === '0px' ? 'none' : `${s.borderTopWidth} ${s.borderTopStyle} ${s.borderTopColor}`, pad: `${s.paddingTop} ${s.paddingRight} ${s.paddingBottom} ${s.paddingLeft}`, shadow: s.boxShadow, gap: s.gap, height: s.height, box: `${+r.width.toFixed(1)}x${+r.height.toFixed(1)}@${Math.round(r.x)},${Math.round(r.y)}`, text: (el.innerText || '').replace(/\s+/g, ' ').slice(0, 80) }
  }
  // label spans inside segmented controls
  out.segmentLabels = [...document.querySelectorAll('[data-testid="finance-tabs"] button span, [data-testid="finance-scope-switch"] button span, [data-testid="resumen-currency-switch"] button span, [data-testid="movimientos-filter"] button span')].map((el) => { const s = getComputedStyle(el); const r = el.getBoundingClientRect(); return { t: el.innerText, fs: s.fontSize, fw: s.fontWeight, lh: s.lineHeight, col: s.color, box: `${+r.width.toFixed(1)}x${+r.height.toFixed(1)}` } })
  // shell: top bar + floating nav
  out.shell = [...document.querySelectorAll('header, nav, [class*=fixed]')].slice(0, 12).map((el) => { const s = getComputedStyle(el); const r = el.getBoundingClientRect(); return { tag: el.tagName, cls: (el.className || '').toString().slice(0, 70), bg: s.backgroundColor, br: s.borderRadius, border: s.borderTopWidth === '0px' ? 'none' : `${s.borderTopWidth} ${s.borderTopStyle} ${s.borderTopColor}`, shadow: s.boxShadow, h: +r.height.toFixed(1), backdrop: s.backdropFilter, box: `${+r.width.toFixed(1)}x${+r.height.toFixed(1)}@${Math.round(r.x)},${Math.round(r.y)}` } })
  // tab labels of floating nav
  out.navLabels = [...document.querySelectorAll('[aria-label="Ir a Inicio"],[aria-label="Ir a Familia"],[aria-label="Abrir acciones rápidas"],[aria-label="Ir a Calendario"],[aria-label="Abrir Más opciones"]')].map((el) => { const l = el.querySelector('span,[class*=text]'); const s = l ? getComputedStyle(l) : getComputedStyle(el); const r = el.getBoundingClientRect(); return { al: el.getAttribute('aria-label'), fs: s.fontSize, fw: s.fontWeight, lh: s.lineHeight, col: s.color, box: `${+r.width.toFixed(1)}x${+r.height.toFixed(1)}` } })
  out.bodyFont = getComputedStyle(document.body).fontFamily
  return out
}
const run = async () => {
  const browser = await chromium.launch({ executablePath: CHROMIUM_EXE, headless: true })
  const { ctx, page } = await boot(browser)
  await page.locator('[aria-label="Abrir Más opciones"]:visible').first().click({ timeout: 8000 }); await page.waitForTimeout(800)
  await page.getByRole('button', { name: /Finanzas/ }).first().click({ timeout: 10000 }); await page.waitForTimeout(1500)
  const a = await page.evaluate(probe)
  fs.writeFileSync(path.join(OUT, 'fig-fin-segments.json'), JSON.stringify(a, null, 2))
  console.log(JSON.stringify(a, null, 1))
  await ctx.close()
  // HomeCloud segments
  const b2 = await boot(browser)
  await b2.page.locator('[aria-label="Abrir Más opciones"]:visible').first().click({ timeout: 8000 }); await b2.page.waitForTimeout(800)
  await b2.page.getByRole('button', { name: /HomeCloud/ }).first().click({ timeout: 10000 }); await b2.page.waitForTimeout(1500)
  const b = await b2.page.evaluate(probe)
  fs.writeFileSync(path.join(OUT, 'fig-hc-segments.json'), JSON.stringify(b, null, 2))
  console.log('=== HOMECLOUD ==='); console.log(JSON.stringify(b, null, 1))
  await b2.ctx.close()
  await browser.close()
}
run().catch((e) => { console.error('FATAL', e); process.exit(1) })