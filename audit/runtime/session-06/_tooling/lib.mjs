import { createRequire } from "node:module";
import fs from "node:fs";
const require = createRequire(
  "C:/Users/thega/AppData/Roaming/npm/node_modules/playwright-core/index.js",
);
const { chromium } = require("playwright-core");

const BASE = "http://127.0.0.1:8443";
const DATA =
  "C:/Users/thega/Desktop/HomeplusPresentacion01/HomePlus_Presentacion_FINAL/audit/runtime/session-06/data";

export async function boot() {
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({
    viewport: { width: 1280, height: 900 },
    deviceScaleFactor: 2,
    locale: "es-AR",
  });
  const page = await ctx.newPage();
  const errors = [];
  page.on("console", (m) => {
    if (m.type() === "error") errors.push(m.text());
  });
  page.on("pageerror", (e) => errors.push("uncaught: " + e.message));
  await page.addInitScript(() => {
    try {
      localStorage.setItem("homeplus.onboarding.resolved", "v3");
    } catch {}
  });
  await page.goto(BASE, { waitUntil: "networkidle" });
  await page.waitForTimeout(1600);
  const g = page.getByRole("button", { name: /Continuar con Google/i });
  if (await g.count()) await g.first().click();
  await page.waitForTimeout(900);
  return { browser, ctx, page, errors };
}

export async function census(page, label) {
  const data = await page.evaluate(() => {
    const nodes = document.querySelectorAll(
      'button, [role="button"], a[href], [class*="cursor-pointer"]',
    );
    const clicks = [];
    const seen = new Set();
    nodes.forEach((n) => {
      const r = n.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) return;
      if (r.right < 300 || r.left > 760) return; // keep inside the phone
      const t = (n.innerText || n.getAttribute("aria-label") || "")
        .replace(/\s+/g, " ")
        .trim()
        .slice(0, 100);
      if (!t || seen.has(t)) return;
      seen.add(t);
      clicks.push(t);
    });
    const phone = document.querySelector("div[style*='border-radius: 48px']");
    return {
      clicks,
      text: (phone ? phone.innerText : document.body.innerText)
        .replace(/\n{2,}/g, "\n")
        .trim(),
    };
  });
  fs.writeFileSync(`${DATA}/census-${label}.json`, JSON.stringify(data, null, 2));
  console.log(
    `\n===== ${label} =====\n` +
      data.clicks.map((c) => "  · " + c).join("\n"),
  );
  return data;
}

export async function clickText(page, text, wait = 800) {
  const loc = page.getByText(text, { exact: false }).first();
  if (!(await loc.count())) {
    console.log(`  !! NOT FOUND: ${text}`);
    return false;
  }
  try {
    await loc.click({ timeout: 5000 });
    await page.waitForTimeout(wait);
    return true;
  } catch (e) {
    console.log(`  !! CLICK FAIL "${text}": ${e.message.split("\n")[0]}`);
    return false;
  }
}

export async function clickAria(page, name, wait = 800) {
  const loc = page.getByLabel(name, { exact: true }).first();
  if (!(await loc.count())) {
    console.log(`  !! ARIA NOT FOUND: ${name}`);
    return false;
  }
  try {
    await loc.click({ timeout: 5000 });
    await page.waitForTimeout(wait);
    return true;
  } catch (e) {
    console.log(`  !! ARIA CLICK FAIL "${name}": ${e.message.split("\n")[0]}`);
    return false;
  }
}

/** Force-close whatever modal / sheet / overlay is on top, then get back to Home. */
export async function reset(page) {
  for (let i = 0; i < 8; i++) {
    const t = await page.evaluate(() => document.body.innerText);
    if (/NECESITA ATENCIÓN/.test(t)) break;
    // try explicit close affordances, most-recent-layer first
    let closed = false;
    for (const label of ["Cerrar acciones rápidas", "Cerrar", "Volver a Más", "Volver"]) {
      const b = page.getByLabel(label, { exact: true }).first();
      if (await b.count()) {
        try {
          await b.click({ timeout: 1200 });
          await page.waitForTimeout(450);
          closed = true;
          break;
        } catch {}
      }
    }
    if (!closed) {
      await page.keyboard.press("Escape").catch(() => {});
      await page.waitForTimeout(350);
    }
  }
  for (let i = 0; i < 3; i++) {
    const t = await page.evaluate(() => document.body.innerText);
    if (/NECESITA ATENCIÓN/.test(t)) break;
    const b = page.getByLabel("Ir a Inicio", { exact: true }).first();
    if (await b.count()) {
      await b.click({ timeout: 1500 }).catch(() => {});
      await page.waitForTimeout(500);
    }
  }
  const t = await page.evaluate(() => document.body.innerText);
  if (!/NECESITA ATENCIÓN/.test(t)) console.log("  !! RESET did not reach Home");
}

export async function tap(page, text, wait = 900) {
  const ok = await clickText(page, text, wait);
  if (!ok) console.log(`  !! TAP FAILED: ${text}`);
  return ok;
}

if (import.meta.url === `file:///${process.argv[1].replace(/\\/g, "/")}`) {
  const { browser, page, errors } = await boot();
  await census(page, "01-home");
  await clickAria(page, "Ir a Familia");
  await census(page, "02-familia");
  await clickAria(page, "Ir a Calendario");
  await census(page, "03-planner");
  await clickAria(page, "Abrir Más opciones");
  await census(page, "04-mas");
  console.log("\nERRORS:", JSON.stringify(errors, null, 2));
  await browser.close();
}
