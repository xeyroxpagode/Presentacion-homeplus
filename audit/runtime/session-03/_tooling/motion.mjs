import fs from 'node:fs'
import path from 'node:path'
import { chromium, CHROMIUM_EXE, URL_BASE, OUT_DIR } from './pw.mjs'

const TOTAL = 85
const TARGETS = [39, 40, 41, 46, 50, 51] // 0-based global index of the state BEFORE the transition
const LABEL = { 39: 'S08_step02→03 (Plan → Inventory bridge)', 40: 'S08_step03→04 (Inventory shortage focus)', 41: 'S08_step04→S09_step00 (Inventory → Finance handoff)', 46: 'S09_step04→S10_step00 (Finance → Assets)', 50: 'S10_step02→03 (Assets detail → HomeCloud)', 51: 'S10_step03→04 (HomeCloud Documentos → Recuerdos)' }

const browser = await chromium.launch({ executablePath: CHROMIUM_EXE, headless: true })
const ctx = await browser.newContext({ viewport: { width: 1280, height: 720 }, deviceScaleFactor: 1 })
const page = await ctx.newPage()
await page.goto(URL_BASE, { waitUntil: 'networkidle' })

const settle = async () => {
  await page.waitForFunction(() => document.getAnimations().every((a) => a.playState === 'finished' || a.playState === 'idle'), null, { timeout: 8000 }).catch(() => {})
  await page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))))
}
const key = async (k) => { await page.evaluate((kk) => document.dispatchEvent(new KeyboardEvent('keydown', { key: kk, bubbles: true })), k); await settle() }

const SAMPLER = () => {
  const t = (sel) => Array.from(document.querySelectorAll(sel)).map((el) => {
    const r = el.getBoundingClientRect(); const s = getComputedStyle(el)
    return { cls: (el.className || '').toString().split(/\s+/).slice(0, 2).join('.'), x: +r.x.toFixed(1), y: +r.y.toFixed(1), w: +r.width.toFixed(1), h: +r.height.toFixed(1), op: +(+s.opacity).toFixed(3), tr: s.transform, fs: s.fontSize }
  })
  const one = (sel) => { const el = document.querySelector(sel); if (!el) return null; const r = el.getBoundingClientRect(); const s = getComputedStyle(el); return { x: +r.x.toFixed(1), y: +r.y.toFixed(1), w: +r.width.toFixed(1), h: +r.height.toFixed(1), op: +(+s.opacity).toFixed(3), tr: s.transform, filter: s.filter, fs: s.fontSize, bg: s.backgroundColor, color: s.color } }
  const txt = (sel) => Array.from(document.querySelectorAll(sel)).map((el) => { const s = getComputedStyle(el); return { t: el.textContent.trim().slice(0, 40), op: +(+s.opacity).toFixed(3), fs: s.fontSize, color: s.color, bg: s.backgroundColor } })
  return {
    ts: performance.now(),
    anims: document.getAnimations().length,
    slot: one('.s08-phone-slot, .s09-phone-slot, .s10-phone-slot'),
    phone: one('.phone-frame'),
    screen: one('.phone-frame-screen'),
    layers: t('.s08-layer, .s10-layer'),
    planSteps: t('.planner-plan-step'),
    planHead: one('.planner-plan-heading'),
    invRows: t('.inventory-row'),
    invTitles: txt('.inventory-row-title'),
    invChips: txt('.inventory-status'),
    invCard: one('.inventory-card'),
    invShop: one('.inventory-shopping'),
    s08q: one('.s08-question'),
    s09idea: one('.s09-idea'),
    s09q: txt('.s09-question'),
    finHero: one('.finance-hero'),
    finTabs: txt('.finance-tab'),
    payRows: t('.finance-payment-row'),
    catRows: t('.finance-category'),
    assetRows: t('.assets-row'),
    assetDocs: t('.assets-doc-row'),
    assetHero: one('.assets-hero'),
    hcTabs: txt('.homecloud-tab'),
    hcDocRows: t('.homecloud-doc-row'),
    hcPhotos: t('.homecloud-photo'),
    hcThumbs: t('.homecloud-photo-thumb'),
    hcVoice: one('.homecloud-voice'),
    hcAlbum: one('.homecloud-album-row'),
  }
}

const results = {}
for (const target of TARGETS) {
  // reset by reloading
  await page.goto(URL_BASE, { waitUntil: 'networkidle' })
  await settle()
  for (let i = 0; i < target; i++) await key('ArrowRight')

  const frames = []
  // arm the sampler BEFORE the key so t0 precedes React's re-render
  await page.evaluate(() => { window.__s3 = { armed: true, frames: [] } })
  await page.evaluate(() => {
    const s = () => {
      if (!window.__s3) return
      // eslint-disable-next-line no-undef
    }
  })
  const start = await page.evaluate(() => performance.now())
  await page.evaluate(() => document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true })))
  for (let i = 0; i < 26; i++) {
    const f = await page.evaluate(SAMPLER)
    f.dt = +(f.ts - start).toFixed(1)
    frames.push(f)
    if (i === 3) await page.screenshot({ path: path.join(OUT_DIR, 'states', `motion-${target}-f03.png`) })
    if (i === 12) await page.screenshot({ path: path.join(OUT_DIR, 'states', `motion-${target}-f12.png`) })
    await page.waitForTimeout(28)
  }
  await settle()
  const last = await page.evaluate(SAMPLER)
  last.dt = +(last.ts - start).toFixed(1)
  frames.push(last)
  results[LABEL[target]] = { from: target, frames }
  console.log('captured', LABEL[target], 'frames=', frames.length)

}

fs.writeFileSync(path.join(OUT_DIR, 'data', 'motion-cde.json'), JSON.stringify(results, null, 1))
console.log('WROTE data/motion-cde.json')
await browser.close()