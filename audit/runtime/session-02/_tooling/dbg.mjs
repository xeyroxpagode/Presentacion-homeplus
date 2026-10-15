import { chromium, CHROMIUM_EXE } from "./pw.mjs"
const b = await chromium.launch({ executablePath: CHROMIUM_EXE, headless: true })
const p = await (await b.newContext({ viewport: { width: 430, height: 932 } })).newPage()
await p.goto("http://127.0.0.1:8445/", { waitUntil: "networkidle" }); await p.waitForTimeout(1200)
const s = p.getByRole("button", { name: /omitir/i }).first(); if (await s.count()) { await s.click(); await p.waitForTimeout(1400) }
const l = p.getByRole("button", { name: /^ingresar$/i }); if (await l.count() > 1) { await l.last().click(); await p.waitForTimeout(1700) }
const info = await p.evaluate(() => {
  const out = []
  for (const el of document.querySelectorAll("*")) {
    const al = el.getAttribute("aria-label")
    if (al && /^(Ir a|Abrir)/.test(al)) {
      const r = el.getBoundingClientRect(); const s = getComputedStyle(el)
      out.push({ tag: el.tagName, role: el.getAttribute("role"), al, y: Math.round(r.y), x: Math.round(r.x), w: Math.round(r.width), h: Math.round(r.height), vis: s.display !== "none" && s.visibility !== "hidden" })
    }
  }
  return out
})
console.log(JSON.stringify(info, null, 1))
await b.close()
