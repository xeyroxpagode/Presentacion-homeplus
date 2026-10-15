import fs from "node:fs";
import { boot } from "./lib.mjs";
const DATA =
  "C:/Users/thega/Desktop/HomeplusPresentacion01/HomePlus_Presentacion_FINAL/audit/runtime/session-06/data";
const out = {};

// ── 1. Finance scope switch: does it change data? ──────────────────────────
{
  const { browser, page, errors } = await boot();
  await page.getByLabel("Abrir Más opciones", { exact: true }).first().click();
  await page.waitForTimeout(1000);
  await page.getByText("Finanzas", { exact: false }).first().click();
  await page.waitForTimeout(1800);
  const read = () =>
    page.evaluate(() => {
      const el = document.querySelector("div[style*='border-radius: 48px']");
      return el ? el.innerText.replace(/\s+/g, " ").slice(0, 400) : "";
    });
  const before = await read();
  const sw = page.locator('[data-testid="finance-scope-switch"]').first();
  const n = await sw.count();
  let after = before;
  if (n) {
    await sw.click({ timeout: 5000 });
    await page.waitForTimeout(1400);
    after = await read();
  }
  out.financeScope = {
    switchFound: n > 0,
    before: before,
    after: after,
    dataChanged: before !== after,
    consoleErrors: errors,
  };
  console.log("financeScope: switchFound=%s dataChanged=%s", n > 0, before !== after);
  await browser.close();
}

// ── 2. Planner > Horarios reachable? ───────────────────────────────────────
{
  const { browser, page, errors } = await boot();
  await page.getByLabel("Ir a Calendario", { exact: true }).first().click();
  await page.waitForTimeout(1400);
  await page.getByText("Calendario", { exact: true }).first().click();
  await page.waitForTimeout(1500);
  const t1 = await page.evaluate(() => document.body.innerText.slice(0, 500));
  const found = await page.getByText("Horarios", { exact: true }).count();
  let after = null;
  if (found) {
    await page.getByText("Horarios", { exact: true }).first().click();
    await page.waitForTimeout(1500);
    after = await page.evaluate(() => document.body.innerText.slice(0, 600));
  }
  out.plannerHorarios = { entryFound: found > 0, calendarScreen: t1, horariosScreen: after, consoleErrors: errors };
  console.log("plannerHorarios: entryFound=%s", found > 0);
  await browser.close();
}

// ── 3. Finance analysis tabs + trash + limits labels ────────────────────────
{
  const { browser, page, errors } = await boot();
  await page.getByLabel("Abrir Más opciones", { exact: true }).first().click();
  await page.waitForTimeout(1000);
  await page.getByText("Finanzas", { exact: false }).first().click();
  await page.waitForTimeout(1600);
  await page.getByText("Administrar", { exact: true }).first().click();
  await page.waitForTimeout(1500);
  const admin = await page.evaluate(() => document.body.innerText.slice(0, 700));
  out.financeAdmin = { text: admin, consoleErrors: errors };
  console.log("financeAdmin captured");
  await browser.close();
}

// ── 4. HomeCloud Memories anatomy ───────────────────────────────────────────
{
  const { browser, page, errors } = await boot();
  await page.getByLabel("Abrir Más opciones", { exact: true }).first().click();
  await page.waitForTimeout(1000);
  await page.getByText("HomeCloud", { exact: false }).first().click();
  await page.waitForTimeout(1700);
  await page.getByText("Recuerdos", { exact: true }).first().click();
  await page.waitForTimeout(1700);
  const rec = await page.evaluate(() => document.body.innerText.slice(0, 900));
  out.homecloudMemories = { text: rec, consoleErrors: errors };
  console.log("homecloudMemories captured");
  await browser.close();
}

// ── 5. Figma Home: role tier / density evidence at runtime ─────────────────
{
  const { browser, page, errors } = await boot();
  const t = await page.evaluate(() => {
    const el = document.querySelector("div[style*='border-radius: 48px']");
    return el ? el.innerText : "";
  });
  out.homeText = t;
  await browser.close();
}

fs.writeFileSync(`${DATA}/verify-probes.json`, JSON.stringify(out, null, 2));
console.log("written verify-probes.json");
