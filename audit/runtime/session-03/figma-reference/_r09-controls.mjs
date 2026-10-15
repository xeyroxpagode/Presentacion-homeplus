import fs from 'node:fs'
import path from 'node:path'
import { chromium, CHROMIUM_EXE } from '../_tooling/pw.mjs'
const FIGMA = process.env.FIGMA_URL || 'http://127.0.0.1:8445/'
const OUT = 'C:/Users/thega/Desktop/HomeplusPresentacion01/HomePlus_Presentacion_FINAL/audit/runtime/session-03/figma-reference'
const L = (s) => console.log(s)

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
const BOX = (el) => { const s = getComputedStyle(el); const r = el.getBoundingClientRect(); return { tag: el.tagName, fs: s.fontSize, fw: s.fontWeight, lh: s.lineHeight, col: s.color, bg: s.backgroundColor, br: s.borderRadius, border: s.borderTopWidth === '0px' ? 'none' : `${s.borderTopWidth} ${s.borderTopStyle} ${s.borderTopColor}`, pad: `${s.paddingTop} ${s.paddingRight} ${s.paddingBottom} ${s.paddingLeft}`, shadow: s.boxShadow === 'none' ? 'none' : s.boxShadow.slice(0, 44), box: `${+r.width.toFixed(1)}x${+r.height.toFixed(1)}`, txt: (el.innerText || el.getAttribute('aria-label') || '').replace(/\s+/g, ' ').slice(0, 60) } }
const probe = (sels) => {
  const BOX = (el) => { const s = getComputedStyle(el); const r = el.getBoundingClientRect(); return { tag: el.tagName, fs: s.fontSize, fw: s.fontWeight, lh: s.lineHeight, col: s.color, bg: s.backgroundColor, br: s.borderRadius, border: s.borderTopWidth === '0px' ? 'none' : `${s.borderTopWidth} ${s.borderTopStyle} ${s.borderTopColor}`, pad: `${s.paddingTop} ${s.paddingRight} ${s.paddingBottom} ${s.paddingLeft}`, shadow: s.boxShadow === 'none' ? 'none' : s.boxShadow.slice(0, 44), box: `${+r.width.toFixed(1)}x${+r.height.toFixed(1)}`, txt: (el.innerText || el.getAttribute('aria-label') || '').replace(/\s+/g, ' ').slice(0, 60) } }
  const out = {}
  for (const sel of sels) {
    const els = [...document.querySelectorAll(sel)].filter((e) => e.getBoundingClientRect().width > 0)
    out[sel] = els.slice(0, 8).map(BOX)
  }
  // top bar details
  const tb = document.querySelector('[aria-label="Abrir perfil de Gabriel"]')
  out.topbar = tb ? { avatar: BOX(tb), badge: (() => { const b = document.querySelector('[aria-label="Atención"]'); if (!b) return null; const inner = [...b.querySelectorAll('*')].filter((e) => (e.innerText || '').trim() && e.children.length === 0); return { btn: BOX(b), inner: inner.map(BOX) } })() } : null
  return out
}
const run = async () => {
  const browser = await chromium.launch({ executablePath: CHROMIUM_EXE, headless: true })
  const sels = ['[data-testid="movimientos-filter"]', '[data-testid="movimientos-filter"] button', '[data-testid="analisis-tabs"]', '[data-testid="analisis-tabs-thumb"]', '[data-testid="limites-segment"]', '[data-testid="limites-segment-thumb"]', '[data-testid="floating-nav-indicator"]', '[data-testid="sheet-new-movement"]', '[data-testid="finance-sheet-primary"]', '[data-testid="new-movement-mode"]', '[data-testid="new-movement-mode-thumb"]', '[data-testid="new-movement-category"]', '[data-testid="payment-register-action"]', '[role=dialog]', '[role=dialog] [aria-label="Cerrar hoja"]']

  // Finance Movimientos
  { const { ctx, page } = await boot(browser)
    await page.locator('[aria-label="Abrir Más opciones"]:visible').first().click({ timeout: 8000 }); await page.waitForTimeout(700)
    await page.getByRole('button', { name: /Finanzas/ }).first().click({ timeout: 10000 }); await page.waitForTimeout(1400)
    await page.locator('[aria-label="Movimientos"]:visible').first().click(); await page.waitForTimeout(1200)
    const a = await page.evaluate(probe, sels); fs.writeFileSync(path.join(OUT, 'probe-movimientos.json'), JSON.stringify(a, null, 2)); L('=== MOVIMIENTOS ==='); L(JSON.stringify(a, null, 1))
    await ctx.close() }
  // Limites
  { const { ctx, page } = await boot(browser)
    await page.locator('[aria-label="Abrir Más opciones"]:visible').first().click({ timeout: 8000 }); await page.waitForTimeout(700)
    await page.getByRole('button', { name: /Finanzas/ }).first().click({ timeout: 10000 }); await page.waitForTimeout(1400)
    await page.locator('[aria-label="Administrar límites de gasto"]').first().click(); await page.waitForTimeout(1200)
    const a = await page.evaluate(probe, sels); fs.writeFileSync(path.join(OUT, 'probe-limites.json'), JSON.stringify(a, null, 2)); L('=== LIMITES ==='); L(JSON.stringify(a, null, 1))
    await ctx.close() }
  // Analisis
  { const { ctx, page } = await boot(browser)
    await page.locator('[aria-label="Abrir Más opciones"]:visible').first().click({ timeout: 8000 }); await page.waitForTimeout(700)
    await page.getByRole('button', { name: /Finanzas/ }).first().click({ timeout: 10000 }); await page.waitForTimeout(1400)
    await page.locator('[aria-label="Ver análisis detallado"]').first().click(); await page.waitForTimeout(1200)
    const a = await page.evaluate(probe, sels); fs.writeFileSync(path.join(OUT, 'probe-analisis.json'), JSON.stringify(a, null, 2)); L('=== ANALISIS ==='); L(JSON.stringify(a, null, 1))
    await ctx.close() }
  // New movement sheet
  { const { ctx, page } = await boot(browser)
    await page.locator('[aria-label="Abrir Más opciones"]:visible').first().click({ timeout: 8000 }); await page.waitForTimeout(700)
    await page.getByRole('button', { name: /Finanzas/ }).first().click({ timeout: 10000 }); await page.waitForTimeout(1400)
    await page.locator('[aria-label="Movimientos"]:visible').first().click(); await page.waitForTimeout(1100)
    await page.locator('[aria-label="Nuevo movimiento"]:visible').first().click(); await page.waitForTimeout(1300)
    const a = await page.evaluate(probe, sels); fs.writeFileSync(path.join(OUT, 'probe-nuevo-movimiento.json'), JSON.stringify(a, null, 2)); L('=== NUEVO MOVIMIENTO ==='); L(JSON.stringify(a, null, 1))
    await ctx.close() }
  await browser.close()
}
run().catch((e) => { console.error('FATAL', e); process.exit(1) })