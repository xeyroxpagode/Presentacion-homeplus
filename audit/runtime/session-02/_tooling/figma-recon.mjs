import fs from 'node:fs'
import path from 'node:path'
import { chromium, CHROMIUM_EXE } from './pw.mjs'

const FIGMA = process.env.FIGMA_URL || 'http://127.0.0.1:8445/'
const OUT = 'C:/Users/thega/Desktop/HomeplusPresentacion01/HomePlus_Presentacion_FINAL/audit/runtime/session-02/figma-reference'

const run = async () => {
  const browser = await chromium.launch({ executablePath: CHROMIUM_EXE, headless: true })
  const ctx = await browser.newContext({ viewport: { width: 430, height: 932 }, deviceScaleFactor: 2 })
  const page = await ctx.newPage()
  const errors = []
  page.on('pageerror', (e) => errors.push(String(e.message)))

  await page.goto(FIGMA, { waitUntil: 'networkidle' })
  await page.waitForTimeout(1200)

  // leave onboarding through its own control, never by URL surgery
  const skip = page.getByRole('button', { name: /omitir/i }).first()
  if (await skip.count()) { await skip.click({ timeout: 6000 }); await page.waitForTimeout(1600) }

  // AuthScreen: in `login` mode the primary submit calls setPhase('app') directly.
  const loginSubmit = page.getByRole('button', { name: /^ingresar$/i })
  if (await loginSubmit.count() > 1) {
    await loginSubmit.last().click({ timeout: 6000 })
    await page.waitForTimeout(1800)
  }
  console.log('AFTER_AUTH nav=' + (await page.evaluate(() => document.querySelector('[data-nav-screen-id]')?.getAttribute('data-nav-screen-id') ?? 'none')))

  const shot = async (name) => {
    await page.waitForTimeout(700)
    const info = await page.evaluate(() => {
      const vis = (el) => {
        const s = getComputedStyle(el)
        const r = el.getBoundingClientRect()
        return s.display !== 'none' && s.visibility !== 'hidden' && parseFloat(s.opacity) > 0.02 && r.width > 0 && r.height > 0
      }
      const txt = (el) => (el.innerText || el.getAttribute('aria-label') || '').replace(/\s+/g, ' ').trim()
      const all = [...document.querySelectorAll('button,[role=button],[role=tab],a[href]')].filter(vis)
      return {
        navScreenId: document.querySelector('[data-nav-screen-id]')?.getAttribute('data-nav-screen-id') ?? null,
        bodyText: (document.body.innerText || '').replace(/\n{2,}/g, '\n').slice(0, 3000),
        controls: all.map((el) => {
          const r = el.getBoundingClientRect()
          return { tag: el.tagName, role: el.getAttribute('role'), text: txt(el).slice(0, 48), x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height), selected: el.getAttribute('aria-selected') }
        }).slice(0, 90),
        fontSizes: [...new Set([...document.querySelectorAll('*')].filter(vis).map((el) => (el.children.length ? '' : getComputedStyle(el).fontSize)).filter((v) => v && v !== '0px'))].sort((a, b) => parseFloat(a) - parseFloat(b)),
      }
    })
    fs.writeFileSync(path.join(OUT, `${name}.json`), JSON.stringify(info, null, 2))
    await page.screenshot({ path: path.join(OUT, `${name}.png`) })
    console.log(`${name} :: nav=${info.navScreenId} controls=${info.controls.length} fonts=${info.fontSizes.length}`)
    return info
  }

  await shot('b00-home')

  // Walk the real bottom navigation once, left to right.
  const navZone = await page.evaluate(() => {
    const vis = (el) => { const s = getComputedStyle(el); const r = el.getBoundingClientRect(); return s.display !== 'none' && s.visibility !== 'hidden' && r.width > 0 && r.height > 0 }
    return [...document.querySelectorAll('button,[role=button],a[href]')].filter(vis)
      .map((el) => ({ el, r: el.getBoundingClientRect() }))
      .filter((x) => x.r.bottom > 820 && x.r.width > 0)
      .sort((a, b) => a.r.x - b.r.x)
      .map((x) => ({ text: (x.el.innerText || x.el.getAttribute('aria-label') || '').replace(/\s+/g, ' ').trim(), x: Math.round(x.r.x), y: Math.round(x.r.y) }))
  })
  console.log('NAV_ZONE=' + JSON.stringify(navZone))

  const visited = new Set()
  let n = 1
  for (const item of navZone) {
    if (!item.text || visited.has(item.text)) continue
    visited.add(item.text)
    try { await page.getByRole('button', { name: item.text, exact: false }).first().click({ timeout: 5000 }) }
    catch { try { await page.locator(`button:has-text("${item.text}")`).first().click({ timeout: 5000 }) } catch { console.log(`SKIP ${item.text}`); continue } }
    await page.waitForTimeout(1100)
    await shot(`b${String(n).padStart(2, '0')}-${item.text.replace(/[^a-zA-Z0-9]+/g, '_').slice(0, 22)}`)
    n += 1
  }

  fs.writeFileSync(path.join(OUT, 'figma-nav-walk.json'), JSON.stringify({ url: FIGMA, navZone, errors }, null, 2))
  console.log('ERRORS=' + errors.length + (errors.length ? ' :: ' + JSON.stringify(errors.slice(0, 5)) : ''))
  await browser.close()
}

run().catch((e) => { console.error('FATAL', e); process.exit(1) })