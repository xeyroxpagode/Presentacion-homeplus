import fs from 'node:fs'
import path from 'node:path'
import { chromium, CHROMIUM_EXE } from './pw.mjs'

const FIGMA = process.env.FIGMA_URL || 'http://127.0.0.1:8445/'
const OUT = 'C:/Users/thega/Desktop/HomeplusPresentacion01/HomePlus_Presentacion_FINAL/audit/runtime/session-02/figma-reference'

const NAV = [
  { key: 'home', label: 'Ir a Inicio' },
  { key: 'familia', label: 'Ir a Familia' },
  { key: 'calendario', label: 'Ir a Calendario' },
  { key: 'mas', label: 'Abrir Más opciones' },
]

const probe = () => {
  const vis = (el) => {
    const s = getComputedStyle(el)
    const r = el.getBoundingClientRect()
    return s.display !== 'none' && s.visibility !== 'hidden' && parseFloat(s.opacity) > 0.02 && r.width > 0 && r.height > 0
  }
  const txt = (el) => (el.innerText || el.getAttribute('aria-label') || '').replace(/\s+/g, ' ').trim()
  const headings = [...document.querySelectorAll('h1,h2,h3')].filter(vis).map((el) => ({ tag: el.tagName, text: txt(el), fs: getComputedStyle(el).fontSize }))
  const tabs = [...document.querySelectorAll('[role=tab]')].filter(vis).map((el) => ({ text: txt(el), al: el.getAttribute('aria-label'), selected: el.getAttribute('aria-selected'), fs: getComputedStyle(el).fontSize }))
  const leaves = [...document.querySelectorAll('*')].filter((el) => !el.children.length && vis(el)).map((el) => ({ t: txt(el), fs: parseFloat(getComputedStyle(el).fontSize) })).filter((x) => x.t)
  const fontHist = {}
  for (const l of leaves) fontHist[l.fs] = (fontHist[l.fs] || 0) + 1
  return {
    navScreenId: document.querySelector('[data-nav-screen-id]')?.getAttribute('data-nav-screen-id') ?? null,
    headings,
    tabs,
    bodyText: (document.body.innerText || '').replace(/\n{2,}/g, '\n').slice(0, 4500),
    controls: [...document.querySelectorAll('button,[role=button],[role=tab],a[href]')].filter(vis)
      .map((el) => ({ al: el.getAttribute('aria-label'), t: txt(el).slice(0, 48), role: el.getAttribute('role'), y: Math.round(el.getBoundingClientRect().y) })).slice(0, 90),
    fontHist,
    smallestFonts: Object.keys(fontHist).map(Number).sort((a, b) => a - b).slice(0, 5),
  }
}

const run = async () => {
  const browser = await chromium.launch({ executablePath: CHROMIUM_EXE, headless: true })
  const ctx = await browser.newContext({ viewport: { width: 430, height: 932 }, deviceScaleFactor: 2 })
  const page = await ctx.newPage()
  const errors = []
  page.on('pageerror', (e) => errors.push(String(e.message)))

  await page.goto(FIGMA, { waitUntil: 'networkidle' })
  await page.waitForTimeout(1200)
  const skip = page.getByRole('button', { name: /omitir/i }).first()
  if (await skip.count()) { await skip.click({ timeout: 6000 }); await page.waitForTimeout(1500) }
  const loginSubmit = page.getByRole('button', { name: /^ingresar$/i })
  if (await loginSubmit.count() > 1) { await loginSubmit.last().click({ timeout: 6000 }); await page.waitForTimeout(1800) }

  const save = async (name) => {
    await page.waitForTimeout(800)
    const info = await page.evaluate(probe)
    fs.writeFileSync(path.join(OUT, `${name}.json`), JSON.stringify(info, null, 2))
    await page.screenshot({ path: path.join(OUT, `${name}.png`) })
    console.log(`${name} :: nav=${info.navScreenId} headings=${JSON.stringify(info.headings.slice(0, 3))} tabs=${info.tabs.length} smallest=${JSON.stringify(info.smallestFonts)}`)
    return info
  }

  const results = {}
  const bootNav = await page.evaluate(() => document.querySelector('[data-nav-screen-id]')?.getAttribute('data-nav-screen-id') ?? null)
  console.log('BOOT_NAV=' + bootNav)

  for (const item of NAV) {
    const loc = page.locator(`[aria-label="${item.label}"]`).first()
    if (!(await loc.count())) { console.log(`MISSING_NAV ${item.label}`); continue }
    await loc.click({ timeout: 6000 })
    results[item.key] = await save(`fig-${item.key}`)
  }

  // Planner sub-tabs observed inside Calendario (module id "calendario").
  const plannerTabs = (results.calendario?.tabs || []).map((t) => t.text).filter(Boolean)
  console.log('PLANNER_TABS=' + JSON.stringify(plannerTabs))
  for (const t of plannerTabs) {
    await page.locator('[aria-label="Ir a Calendario"]').first().click({ timeout: 6000 })
    await page.waitForTimeout(900)
    const tab = page.getByRole('tab', { name: t, exact: false }).first()
    if (!(await tab.count())) { console.log(`MISSING_TAB ${t}`); continue }
    await tab.click({ timeout: 6000 })
    results[`cal-${t}`] = await save(`fig-cal-${t.replace(/[^a-zA-Z0-9]+/g, '_').slice(0, 18)}`)
  }

  // Familia sub-surfaces, discovered only from what the run actually shows.
  await page.locator('[aria-label="Ir a Familia"]').first().click({ timeout: 6000 })
  await page.waitForTimeout(900)
  results.familia = await save('fig-familia-deep')
  const familiaControls = (results.familia?.controls || []).filter((c) => c.al && !/^Ir a/.test(c.al))
  console.log('FAMILIA_CONTROLS=' + JSON.stringify(familiaControls.map((c) => c.al).slice(0, 25)))

  fs.writeFileSync(path.join(OUT, 'figma-b-summary.json'), JSON.stringify({ url: FIGMA, errors, keys: Object.keys(results) }, null, 2))
  console.log('ERRORS=' + errors.length)
  await browser.close()
}

run().catch((e) => { console.error('FATAL', e); process.exit(1) })