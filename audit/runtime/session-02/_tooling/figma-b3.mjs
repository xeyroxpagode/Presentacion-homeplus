import fs from "node:fs"; import path from "node:path"
import { chromium, CHROMIUM_EXE } from "./pw.mjs"
const OUT = "C:/Users/thega/Desktop/HomeplusPresentacion01/HomePlus_Presentacion_FINAL/audit/runtime/session-02/figma-reference"
const b = await chromium.launch({ executablePath: CHROMIUM_EXE, headless: true })
const p = await (await b.newContext({ viewport: { width: 430, height: 932 }, deviceScaleFactor: 2 })).newPage()
await p.goto("http://127.0.0.1:8445/", { waitUntil: "networkidle" }); await p.waitForTimeout(1200)
const s = p.getByRole("button", { name: /omitir/i }).first(); if (await s.count()) { await s.click(); await p.waitForTimeout(1400) }
const l = p.getByRole("button", { name: /^ingresar$/i }); if (await l.count() > 1) { await l.last().click(); await p.waitForTimeout(1700) }
const probe = () => ({ nav: document.querySelector("[data-nav-screen-id]")?.getAttribute("data-nav-screen-id") ?? null, text: (document.body.innerText||"").replace(/\n{2,}/g,"\n").slice(0,3500) })
const save = async (n) => { await p.waitForTimeout(800); const i = await p.evaluate(probe); fs.writeFileSync(path.join(OUT, n+".json"), JSON.stringify(i,null,2)); await p.screenshot({ path: path.join(OUT, n+".png") }); console.log(n+" :: nav="+i.nav); console.log(i.text.slice(0,1400)); console.log("-----") }
// Planner -> Responsabilidades (secondary control, discovered as text)
await p.locator('[aria-label="Ir a Calendario"]').first().click(); await p.waitForTimeout(1200)
const resp = p.getByText("Responsabilidades", { exact: true }).first()
console.log("RESP_FOUND=" + await resp.count())
if (await resp.count()) { await resp.click(); await p.waitForTimeout(1200); await save("fig3-planner-responsabilidades") }
// Mensajes -> Familia Garcia conversation
await p.locator('[aria-label="Abrir M\u00e1s opciones"]').first().click(); await p.waitForTimeout(1100)
const m = p.getByRole("button", { name: /Mensajes/ }).first(); if (await m.count()) { await m.click(); await p.waitForTimeout(1200) }
const fam = p.getByText("Familia Garc\u00eda", { exact: true }).first()
console.log("FAM_FOUND=" + await fam.count())
if (await fam.count()) { await fam.click(); await p.waitForTimeout(1400); await save("fig3-conversacion-familia") }
await b.close()
