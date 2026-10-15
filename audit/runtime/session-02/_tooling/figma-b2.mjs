import fs from 'node:fs'
import path from 'node:path'
import { chromium, CHROMIUM_EXE } from './pw.mjs'

const FIGMA = process.env.FIGMA_URL || 'http://127.0.0.1:8445/'
const OUT = 'C:/Users/thega/Desktop/HomeplusPresentacion01/HomePlus_Presentacion_FINAL/audit/runtime/session-02/figma-reference'

const probe = () => {
  const vis = (el) => {
    const s = getComputedStyle(el)
    const r = el.getBoundingClientRect()
    return s.display !== 'none' && s.visibility !== 'hidden' && parseFloat(s.opacity) > 0.02 && r.width > 0 && r.height > 0
  }
  const txt = (el) => (el.innerText || el.getAttribute('aria-label') || '').replace(/\s+/g, ' ').trim()
  return {
    navScreenId: document.querySelector('[data-nav-screen-id]')?.getAttribute('data-nav-screen-id') ?? null,
    headings: [...document.querySelectorAll('h1,h2,h3')].filter(vis).map((el) => ({ tag: el.tagName, t: txt(el), fs: getComputedStyle(el).fontSize })),
    tabs: [...document.querySelectorAll('[role=tab]')].filter(vis).map((el) => ({ t: txt(el), al: el.getAttribute('aria-label'), fs: getComputedStyle(el).fontSize })),
    bodyText: (document.body.innerText || '').replace(/\n{2,}/g, '\n').slice(0, 4500),
    controls: [...document.querySelectorAll('button,[role=button],[role=tab],a[href]')].filter(vis)
      .map((el) => ({ al: el.getAttribute('aria-label'), t: txt(el).slice(0, 52), role: el.getAttribute('role') })).slice(0, 90),
  }
}

const run = async () => {
  const browser = await chromium.launch({ executablePath: CHROMIUM_EXE, headless: true })
  const page = await (await browser.newContext({ viewport: { width: 430, height: 932 }, deviceScaleFactor: 2 })).newPage()
  const errors = []
  page.on('pageerror', (e) => errors.push(String(e.message)))
  await page.goto(FIGMA, { waitUntil: 'networkidle' })
  await page.waitForTimeout(1200)
  const skip = page.getByRole('button', { name: /omitir/i }).first()
  if (await skip.count()) { await skip.click(); await page.waitForTimeout(1400) }
  const l = page.getByRole('button', { name: /^ingresar$/i })
  if (await l.count() > 1) { await l.last().click(); await page.waitForTimeout(1700) }

  const save = async (name) => {
    await page.waitForTimeout(800)
    const info = await page.evaluate(probe)
    fs.writeFileSync(path.join(OUT, `${name}.json`), JSON.stringify(info, null, 2))
    await page.screenshot({ path: path.join(OUT, `${name}.png`) })
    console.log(`${name} :: nav=${info.navScreenId} headings=${JSON.stringify(info.headings.slice(0, 2))}`)
    return info
  }
  const click = async (label) => {
    const loc = page.locator(`[aria-label="${label}"]`).first()
    if (!(await loc.count())) return false
    await loc.click({ timeout: 6000 })
    await page.waitForTimeout(1100)
    return true
  }
  const clickText = async (re) => {
    const loc = page.getByRole('button', { name: re }).first()
    if (!(await loc.count())) return false
    await loc.click({ timeout: 6000 })
    await page.waitForTimeout(1100)
    return true
  }

  // 1. Familia > Mapa
  await click('Ir a Familia')
  const mapaTab = page.getByRole('tab', { name: /^Mapa$/ }).first()
  if (await mapaTab.count()) { await mapaTab.click(); await page.waitForTimeout(1000) }
  await save('fig2-familia-mapa')

  // 2. Familia > Lugares
  await click('Ir a Familia')
  const lugTab = page.getByRole('tab', { name: /^Lugares$/ }).first()
  if (await lugTab.count()) { await lugTab.click(); await page.waitForTimeout(1000) }
  await save('fig2-familia-lugares')

  // 3. Planner > Responsabilidades (secondary tab inside Tareas)
  await click('Ir a Calendario')
  const respTab = page.getByRole('tab', { name: /Responsabilidades/i }).first()
  console.log('RESP_TAB_FOUND=' + (await respTab.count()))
  if (await respTab.count()) { await respTab.click(); await page.waitForTimeout(1000); await save('fig2-planner-responsabilidades') }

  // 4. Planner > Calendario (calendar surface)
  await click('Ir a Calendario')
  const calTab = page.getByRole('tab', { name: /^Calendario$/ }).first()
  if (await calTab.count()) { await calTab.click(); await page.waitForTimeout(1000) }
  await save('fig2-planner-calendario')

  // 5. Mas > Mensajes, then the canonical family conversation
  await click('Abrir Más opciones')
  const msgs = await clickText(/Mensajes/)
  console.log('MENSAJES=' + msgs)
  await save('fig2-mas-mensajes')
  const famConv = await clickText(/Familia/)
  console.log('FAM_CONV=' + famConv)
  await save('fig2-mensajes-familia')
  const cont = await page.evaluate(() => (document.body.innerText || '').slice(0, 400))
  console.log('AFTER_FAM=' + JSON.stringify(cont.slice(0, 200)))

  fs.writeFileSync(path.join(OUT, 'figma-b2-summary.json'), JSON.stringify({ errors }, null, 2))
  console.log('ERRORS=' + errors.length)
  await browser.close()
}

run().catch((e) => { console.error('FATAL', e); process.exit(1) })