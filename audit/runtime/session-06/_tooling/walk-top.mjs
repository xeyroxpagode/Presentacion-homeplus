import { createRequire } from "node:module";
import fs from "node:fs";
const require = createRequire(
  "C:/Users/thega/AppData/Roaming/npm/node_modules/playwright-core/index.js",
);
const { chromium } = require("playwright-core");

const BASE = "http://127.0.0.1:8443";
const OUT =
  "C:/Users/thega/Desktop/HomeplusPresentacion01/HomePlus_Presentacion_FINAL/audit/runtime/session-06/data";

const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({
  viewport: { width: 1280, height: 900 },
  deviceScaleFactor: 2,
  locale: "es-AR",
});
const page = await ctx.newPage();
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

async function census(label) {
  const data = await page.evaluate(() => {
    const phone = document.querySelector("div[style*='width: 390']");
    const root = phone || document.body;
    const nodes = root.querySelectorAll(
      'button, [role="button"], a, [onclick], [class*="cursor-pointer"]',
    );
    const out = [];
    const seen = new Set();
    nodes.forEach((n) => {
      const t = (n.innerText || n.getAttribute("aria-label") || "")
        .replace(/\s+/g, " ")
        .trim()
        .slice(0, 90);
      if (!t) return;
      const key = t;
      if (seen.has(key)) return;
      seen.add(key);
      out.push(t);
    });
    const body = root.innerText.replace(/\n{2,}/g, "\n").trim();
    return { clicks: out, text: body };
  });
  fs.writeFileSync(
    `${OUT}/census-${label}.json`,
    JSON.stringify(data, null, 2),
  );
  console.log(
    `\n===== ${label} =====\nCLICKS(${data.clicks.length}):\n` +
      data.clicks.map((c) => "  · " + c).join("\n"),
  );
  return data;
}

async function click(text, opts = {}) {
  const loc = page.getByText(text, { exact: false }).first();
  if (!(await loc.count())) {
    console.log(`  !! NOT FOUND: ${text}`);
    return false;
  }
  try {
    await loc.click({ timeout: 4000, ...opts });
    await page.waitForTimeout(opts.wait ?? 700);
    return true;
  } catch (e) {
    console.log(`  !! CLICK FAIL ${text}: ${e.message.split("\n")[0]}`);
    return false;
  }
}

await census("01-home");

await click("Familia");
await census("02-familia");

await click("Calendario");
await census("03-calendario");

await click("Más");
await census("04-mas");

await browser.close();
