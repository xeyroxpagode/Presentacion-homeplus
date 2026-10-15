import fs from "node:fs";
import { boot, census, reset } from "./lib.mjs";

const FIG =
  "C:/Users/thega/Desktop/HomeplusPresentacion01/HomePlus_Presentacion_FINAL/audit/runtime/session-06/figma";
const DATA =
  "C:/Users/thega/Desktop/HomeplusPresentacion01/HomePlus_Presentacion_FINAL/audit/runtime/session-06/data";
const MAN = `${DATA}/manifest.json`;
const ERRS = `${DATA}/console-errors.json`;

const manifest = fs.existsSync(MAN) ? JSON.parse(fs.readFileSync(MAN, "utf8")) : [];
const allErrors = fs.existsSync(ERRS) ? JSON.parse(fs.readFileSync(ERRS, "utf8")) : [];

/** One fresh browser per capture — Figma-app marks the shell `inert` behind any
 *  modal host and never restores it, so state cannot be reused across sheets. */
async function capture(name, meta, steps) {
  const { browser, page, errors } = await boot();
  const notes = [];
  try {
    await steps(page, notes, name);
  } catch (e) {
    notes.push("STEP ERROR: " + e.message.split("\n")[0]);
  }
  const phone = page.locator("div[style*='border-radius: 48px']").first();
  if (await phone.count()) {
    await phone.screenshot({
      path: `${FIG}/${name}.png`,
      animations: "disabled",
      caret: "hide",
    });
  } else {
    await page.screenshot({ path: `${FIG}/${name}.png` });
    notes.push("phone-frame-not-found");
  }
  await page.screenshot({
    path: `${FIG}/${name}__ctx.png`,
    animations: "disabled",
    caret: "hide",
  });
  const c = await census(page, name);
  const rec = {
    name,
    ...meta,
    notes,
    clicks: c.clicks,
    text: c.text,
    consoleErrors: errors,
  };
  fs.writeFileSync(`${DATA}/cap-${name}.json`, JSON.stringify(rec, null, 2));
  const i = manifest.findIndex((m) => m.name === name);
  if (i >= 0) manifest[i] = rec;
  else manifest.push(rec);
  allErrors.push(...errors.map((e) => ({ shot: name, e })));
  console.log(
    `[SHOT] ${name} :: ${c.clicks.slice(2, 9).join(" | ")}${
      notes.length ? "  NOTES:" + notes.join(";") : ""
    }`,
  );
  await browser.close();
}

// ── helpers bound to a live page ───────────────────────────────────────────
const mk = (page) => ({
  async tap(text, wait = 900) {
    const tries = [
      page.getByText(text, { exact: true }),
      page.getByRole("tab", { name: text, exact: true }),
      page.getByText(text, { exact: false }),
    ];
    for (const l of tries) {
      if (!(await l.count())) continue;
      try {
        await l.first().click({ timeout: 6000 });
        await page.waitForTimeout(wait);
        return true;
      } catch {}
    }
    console.log(`  !! TAP FAIL "${text}"`);
    return false;
  },
  async nav(label) {
    const b = page.getByLabel(label, { exact: true }).first();
    if (!(await b.count())) {
      console.log(`  !! NAV MISSING "${label}"`);
      return false;
    }
    await b.click({ timeout: 6000 });
    await page.waitForTimeout(1100);
    return true;
  },
  async scroll(dy) {
    await page.mouse.move(500, 500);
    await page.mouse.wheel(0, dy);
    await page.waitForTimeout(800);
  },
  reset,
});

const SHELL = { shell: "PhoneFrame 390x844, bezel 10px #1A1714, radius 48px" };

// ══════════════════════════ B — HOME ══════════════════════════
await capture(
  "B_HOME",
  {
    module: "B",
    surface: "Home root",
    nav: "boot / app phase",
    source: "src/screens/Home.tsx + src/home/*",
    ...SHELL,
  },
  async (page) => {},
);

await capture(
  "B_HOME_SCROLLED",
  {
    module: "B",
    surface: "Home scrolled — Próximo / Te puede servir / Qué cambió",
    nav: "Home + wheel 800",
    ...SHELL,
  },
  async (page, n) => {
    await mk(page).scroll(820);
  },
);

await capture(
  "B_HOME_HOUSEHOLD_OVERLAY",
  {
    module: "B",
    surface: "Household / account overlay",
    nav: "Home → household chip",
    ...SHELL,
  },
  async (page, n) => {
    await mk(page).tap("Coordinador", 1200);
  },
);

// ══════════════════════════ B — PLANNER ══════════════════════════
await capture(
  "B_PLANNER_TASKS",
  {
    module: "B",
    surface: "Planner / Tareas",
    nav: "bottomnav Calendario → tab Tareas",
    source: "src/planner/PlannerRoot.tsx",
    ...SHELL,
  },
  async (page) => {
    await mk(page).nav("Ir a Calendario");
  },
);

await capture(
  "B_PLANNER_RESPONSIBILITIES",
  {
    module: "B",
    surface: "Planner / Responsabilidades — own screen reached from inside the Tasks tab, NOT a 4th tab",
    nav: "Planner → Tareas → Responsabilidades",
    ...SHELL,
  },
  async (page) => {
    const k = mk(page);
    await k.nav("Ir a Calendario");
    await k.tap("Responsabilidades", 1200);
  },
);

await capture(
  "B_PLANNER_CALENDAR",
  {
    module: "B",
    surface: "Planner / Calendario",
    nav: "Planner → Calendario",
    ...SHELL,
  },
  async (page) => {
    const k = mk(page);
    await k.nav("Ir a Calendario");
    await k.tap("Calendario", 1300);
  },
);

await capture(
  "B_PLANNER_PLANS",
  {
    module: "B",
    surface: "Planner / Planes (list)",
    nav: "Planner → Planes",
    source: "src/planner/Plans.tsx",
    ...SHELL,
  },
  async (page) => {
    const k = mk(page);
    await k.nav("Ir a Calendario");
    await k.tap("Planes", 1300);
  },
);

// ══════════════════════════ C — PLANS ══════════════════════════
await capture(
  "C_PLAN_DETAIL_BIRTHDAY",
  {
    module: "C",
    surface: "Plan detail — 'Cumpleaños de Martina' (birthday plan instance)",
    nav: "Planner → Planes → Cumpleaños de Martina",
    ...SHELL,
  },
  async (page) => {
    const k = mk(page);
    await k.nav("Ir a Calendario");
    await k.tap("Planes", 1300);
    await k.tap("Cumpleaños de Martina", 1600);
  },
);

await capture(
  "C_PLAN_DETAIL_MEASUREMENT",
  {
    module: "C",
    surface: "Plan detail — '15 de Martina' (plan carrying Measurements)",
    nav: "Planner → Planes → 15 de Martina",
    ...SHELL,
  },
  async (page) => {
    const k = mk(page);
    await k.nav("Ir a Calendario");
    await k.tap("Planes", 1300);
    await k.tap("15 de Martina", 1600);
  },
);

// ══════════════════════════ B — FAMILY ══════════════════════════
await capture(
  "B_FAMILY_PEOPLE",
  {
    module: "B",
    surface: "Family / Familia (people)",
    nav: "bottomnav Familia",
    source: "src/screens/Familia.tsx",
    ...SHELL,
  },
  async (page) => {
    await mk(page).nav("Ir a Familia");
  },
);

await capture(
  "B_FAMILY_MAP",
  {
    module: "B",
    surface: "Family / Mapa",
    nav: "Familia → Mapa",
    ...SHELL,
  },
  async (page) => {
    const k = mk(page);
    await k.nav("Ir a Familia");
    await k.tap("Mapa", 1400);
  },
);

await capture(
  "B_FAMILY_MAP_MEMBER_SHEET",
  {
    module: "B",
    surface: "Family / Mapa → contextual member sheet",
    nav: "Mapa → member / place pin",
    ...SHELL,
  },
  async (page, n) => {
    const k = mk(page);
    await k.nav("Ir a Familia");
    await k.tap("Mapa", 1400);
    if (!(await k.tap("Colegio", 1300))) await k.tap("Martina", 1300);
  },
);

await capture(
  "B_FAMILY_PLACES",
  {
    module: "B",
    surface: "Family / Lugares",
    nav: "Familia → Lugares",
    ...SHELL,
  },
  async (page) => {
    const k = mk(page);
    await k.nav("Ir a Familia");
    await k.tap("Lugares", 1400);
  },
);

// ══════════════════════════ B — FEED ══════════════════════════
await capture(
  "B_FEED_MESSAGES_ROOT",
  {
    module: "B",
    surface: "Mensajes root — Feed surface retired; family conversation + topics + directs",
    nav: "Más → Mensajes",
    source: "src/screens/Messages.tsx",
    note: "src/types.ts:183-185 declares the Feed surface removed by Family Conversation V2.",
    ...SHELL,
  },
  async (page) => {
    const k = mk(page);
    await k.nav("Abrir Más opciones");
    await k.tap("Mensajes", 1500);
  },
);

await capture(
  "B_FEED_FAMILY_CONVERSATION",
  {
    module: "B",
    surface: "Family conversation — the surface that replaced the Feed post thread",
    nav: "Mensajes → Familia García",
    ...SHELL,
  },
  async (page) => {
    const k = mk(page);
    await k.nav("Abrir Más opciones");
    await k.tap("Mensajes", 1500);
    await k.tap("Familia García", 1600);
  },
);

await capture(
  "B_QUICK_ACTIONS",
  {
    module: "B",
    surface: "Quick Actions launcher",
    nav: "bottomnav Acciones rápidas",
    source: "src/quickactions/QuickActionsFlow.tsx",
    ...SHELL,
  },
  async (page) => {
    await mk(page).nav("Abrir acciones rápidas");
  },
);

// ══════════════════════════ D ══════════════════════════
await capture(
  "D_FINANCE_NEW_MOVEMENT",
  {
    module: "D",
    surface: "New Movement — gasto / ingreso / transferencia",
    nav: "Acciones rápidas → Registrar movimiento",
    source: "src/finance/*",
    ...SHELL,
  },
  async (page) => {
    const k = mk(page);
    await k.nav("Abrir acciones rápidas");
    await k.tap("Registrar movimiento", 1500);
  },
);

const openFin = async (page) => {
  const k = mk(page);
  await k.nav("Abrir Más opciones");
  await k.tap("Finanzas", 1600);
  return k;
};

await capture(
  "D_FINANCE_SUMMARY",
  {
    module: "D",
    surface: "Finance / Resumen — personal scope",
    nav: "Más → Finanzas",
    source: "src/finance/* + src/screens/Finance.tsx",
    ...SHELL,
  },
  async (page) => {
    await openFin(page);
  },
);

await capture(
  "D_FINANCE_SUMMARY_HOUSEHOLD",
  {
    module: "D",
    surface: "Finance / Resumen — household scope",
    nav: "Finanzas → Hogar",
    ...SHELL,
  },
  async (page) => {
    const k = await openFin(page);
    await k.tap("Hogar", 1400);
  },
);

await capture(
  "D_FINANCE_MOVEMENTS",
  {
    module: "D",
    surface: "Finance / Movimientos",
    nav: "Finanzas → Movimientos",
    ...SHELL,
  },
  async (page) => {
    const k = await openFin(page);
    await k.tap("Movimientos", 1400);
  },
);

await capture(
  "D_FINANCE_PAYMENTS",
  {
    module: "D",
    surface: "Finance / Pagos",
    nav: "Finanzas → Pagos",
    ...SHELL,
  },
  async (page) => {
    const k = await openFin(page);
    await k.tap("Pagos", 1400);
  },
);

await capture(
  "D_FINANCE_ANALYSIS",
  {
    module: "D",
    surface: "Finance / Análisis",
    nav: "Finanzas → Ver análisis",
    ...SHELL,
  },
  async (page) => {
    const k = await openFin(page);
    await k.tap("Ver análisis", 1600);
  },
);

await capture(
  "D_FINANCE_ADMIN",
  {
    module: "D",
    surface: "Finance / Administrar (cuentas, categorías, límites, papelera)",
    nav: "Finanzas → Administrar",
    ...SHELL,
  },
  async (page) => {
    const k = await openFin(page);
    await k.tap("Administrar", 1500);
  },
);

await capture(
  "D_FINANCE_ORGANIZAR",
  {
    module: "D",
    surface: "Finance / Organizar",
    nav: "Finanzas → Organizar",
    ...SHELL,
  },
  async (page) => {
    const k = await openFin(page);
    await k.tap("Organizar", 1500);
  },
);

// ══════════════════════════ C ══════════════════════════
const openInv = async (page) => {
  const k = mk(page);
  await k.nav("Abrir Más opciones");
  await k.tap("Inventario", 1500);
  return k;
};

await capture(
  "C_INVENTORY",
  {
    module: "C",
    surface: "Inventory / Productos",
    nav: "Más → Inventario",
    source: "src/inventory/*",
    ...SHELL,
  },
  async (page) => {
    await openInv(page);
  },
);

await capture(
  "C_INVENTORY_LOW_STOCK",
  {
    module: "C",
    surface: "Inventory / low stock filter (Poco)",
    nav: "Inventario → Poco",
    ...SHELL,
  },
  async (page) => {
    const k = await openInv(page);
    await k.tap("Poco", 1300);
  },
);

await capture(
  "C_INVENTORY_OUT_OF_STOCK",
  {
    module: "C",
    surface: "Inventory / out of stock filter (Agotados)",
    nav: "Inventario → Agotados",
    ...SHELL,
  },
  async (page) => {
    const k = await openInv(page);
    await k.tap("Agotados", 1300);
  },
);

await capture(
  "C_INVENTORY_PLACES",
  {
    module: "C",
    surface: "Inventory by place (Heladera / Alacena / Baño / Cocina)",
    nav: "Inventario → Ver lugares",
    ...SHELL,
  },
  async (page) => {
    const k = await openInv(page);
    await k.tap("Ver lugares", 1400);
  },
);

await capture(
  "C_SHOPPING_LIST",
  {
    module: "C",
    surface: "Shopping list (Lista de compras)",
    nav: "Inventario → Lista de compras",
    source: "src/inventory/ShoppingList.tsx (27868 B)",
    ...SHELL,
  },
  async (page) => {
    const k = await openInv(page);
    await k.tap("Lista de compras", 1500);
  },
);

// ══════════════════════════ E ══════════════════════════
const openMas = async (page, label, wait = 1600) => {
  const k = mk(page);
  await k.nav("Abrir Más opciones");
  await k.tap(label, wait);
  return k;
};

await capture(
  "E_ASSETS",
  {
    module: "E",
    surface: "Assets root / Activos",
    nav: "Más → Activos",
    source: "src/assets/* + src/screens/Assets.tsx",
    ...SHELL,
  },
  async (page) => {
    await openMas(page, "Activos", 1700);
  },
);

await capture(
  "E_ASSET_PS5",
  {
    module: "E",
    surface: "Asset detail — PlayStation 5",
    nav: "Activos → PlayStation 5",
    ...SHELL,
  },
  async (page) => {
    const k = await openMas(page, "Activos", 1700);
    await k.tap("PlayStation 5", 1800);
  },
);

await capture(
  "E_HOMECLOUD_FILES",
  {
    module: "E",
    surface: "HomeCloud / Archivos (root — folders + files)",
    nav: "Más → HomeCloud",
    source: "src/homecloud/* + src/screens/HomeCloud.tsx",
    ...SHELL,
  },
  async (page) => {
    await openMas(page, "HomeCloud", 1800);
  },
);

await capture(
  "E_HOMECLOUD_MEMORIES",
  {
    module: "E",
    surface: "HomeCloud / Recuerdos (memories timeline)",
    nav: "HomeCloud → Recuerdos",
    ...SHELL,
  },
  async (page) => {
    const k = await openMas(page, "HomeCloud", 1700);
    await k.tap("Recuerdos", 1600);
  },
);

await capture(
  "E_HOMECLOUD_FOLDER",
  {
    module: "E",
    surface: "HomeCloud / folder (Casa)",
    nav: "HomeCloud → Casa",
    ...SHELL,
  },
  async (page) => {
    const k = await openMas(page, "HomeCloud", 1700);
    await k.tap("Casa", 1600);
  },
);

await capture(
  "E_HOMECLOUD_FILE_INFO",
  {
    module: "E",
    surface: "HomeCloud / file info sheet — a 'Garantía lavarropas' named household file",
    nav: "HomeCloud → ⋯ on Garantía lavarropas",
    ...SHELL,
  },
  async (page) => {
    const k = await openMas(page, "HomeCloud", 1700);
    await k.tap("⋯", 1300);
  },
);

fs.writeFileSync(MAN, JSON.stringify(manifest, null, 2));
fs.writeFileSync(ERRS, JSON.stringify(allErrors, null, 2));
console.log(
  `\nDONE shots=${manifest.length} consoleErrors=${allErrors.length}`,
);
