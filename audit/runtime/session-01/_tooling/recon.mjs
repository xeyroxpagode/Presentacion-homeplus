import { chromium, URL_BASE, OUT_DIR } from './pw.mjs'
import fs from 'node:fs/promises'
import path from 'node:path'

const errors = []
const warnings = []

const browser = await chromium.launch({ headless: true })
const context = await browser.newContext({ viewport: { width: 1280, height: 720 }, deviceScaleFactor: 1 })
const page = await context.newPage()

page.on('console', (m) => {
  const t = m.type()
  if (t === 'error') errors.push(m.text())
  else if (t === 'warning') warnings.push(m.text())
})
page.on('pageerror', (e) => errors.push('uncaught: ' + e.message))
page.on('requestfailed', (r) => errors.push(`requestfailed ${r.url()} ${r.failure()?.errorText}`))

await page.goto(URL_BASE, { waitUntil: 'networkidle' })
await page.waitForTimeout(1500)

const scene = await page.evaluate(() => {
  const s = document.querySelector('.presentation-scene')
  return s ? { slideId: s.dataset.slideId, slideIndex: s.dataset.slideIndex, stepIndex: s.dataset.stepIndex } : null
})

const tree = await page.evaluate(() => {
  const out = []
  const walk = (el, depth) => {
    if (depth > 7) return
    for (const c of el.children) {
      const cls = (c.className && c.className.baseVal !== undefined ? c.className.baseVal : c.className) || ''
      const r = c.getBoundingClientRect()
      const cs = getComputedStyle(c)
      out.push({
        depth,
        tag: c.tagName.toLowerCase(),
        cls: String(cls).slice(0, 90),
        box: [Math.round(r.x), Math.round(r.y), Math.round(r.width), Math.round(r.height)],
        opacity: cs.opacity,
        transform: cs.transform,
        overflow: cs.overflow,
        text: (c.children.length === 0 ? (c.textContent || '').trim().slice(0, 60) : ''),
      })
      walk(c, depth + 1)
    }
  }
  const root = document.querySelector('#root')
  if (root) walk(root, 0)
  return out
})

await page.screenshot({ path: path.join(OUT_DIR, '_recon_S01_step00.png') })

const report = { scene, errors, warnings, treeCount: tree.length, tree }
await fs.writeFile(path.join(OUT_DIR, '_recon.json'), JSON.stringify(report, null, 2))

console.log(JSON.stringify({ scene, errors: errors.length, warnings: warnings.length, treeCount: tree.length }, null, 2))
console.log('--- tree ---')
for (const n of tree) {
  console.log(
    '  '.repeat(n.depth) +
      `${n.tag}.${n.cls} box=${JSON.stringify(n.box)} op=${n.opacity} tf=${n.transform} ov=${n.overflow}` +
      (n.text ? ` "${n.text}"` : ''),
  )
}

await browser.close()