import { createRequire } from "node:module";
const require = createRequire(
  "C:/Users/thega/AppData/Roaming/npm/node_modules/playwright-core/index.js",
);
const { chromium } = require("playwright-core");

const BASE = "http://127.0.0.1:8443";
const OUT = "C:/Users/thega/Desktop/HomeplusPresentacion01/HomePlus_Presentacion_FINAL/audit/runtime/session-06/figma";

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

// Auth gate -> app
const google = page.getByRole("button", { name: /Continuar con Google/i });
if (await google.count()) {
  await google.first().click();
  await page.waitForTimeout(900);
}

const state = await page.evaluate(() => {
  const txt = document.body.innerText;
  return {
    hasAuth: /Ingresar/.test(txt),
    snippet: txt.slice(0, 400),
  };
});
console.log("STATE:", JSON.stringify(state, null, 2));

await page.screenshot({ path: `${OUT}/_recon-00-after-gate.png` });

// Census of the phone shell
const shell = await page.evaluate(() => {
  const phone =
    document.querySelector("div[style*='390px']") ||
    document.querySelector("div[style*='width: 390']");
  if (!phone) return null;
  const r = phone.getBoundingClientRect();
  const cs = getComputedStyle(phone);
  return {
    rect: { w: r.width, h: r.height, x: r.x, y: r.y },
    border: cs.border,
    borderRadius: cs.borderRadius,
  };
});
console.log("SHELL:", JSON.stringify(shell, null, 2));

console.log("ERRORS:", JSON.stringify(errors.slice(0, 20), null, 2));

await browser.close();
