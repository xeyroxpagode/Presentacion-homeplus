import { boot, census, clickText, clickAria } from "./lib.mjs";
const { browser, page, errors } = await boot();
const log = [];
const L = (s) => {
  log.push(s);
  console.log(s);
};

async function go(label, fn) {
  await fn();
  const d = await census(page, label);
  L(`\n##### ${label} :: clicks=${d.clicks.length}`);
  L(d.clicks.map((c) => "   · " + c).join("\n"));
}

// ---------- INVENTARIO ----------
await clickAria(page, "Abrir Más opciones");
await clickText(page, "Inventario");
await go("d20-inventario", async () => {});

// ---------- FINANZAS ----------
await clickAria(page, "Abrir Más opciones");
await clickText(page, "Finanzas");
await go("d30-finanzas", async () => {});

// ---------- ACTIVOS ----------
await clickAria(page, "Abrir Más opciones");
await clickText(page, "Activos");
await go("d40-activos", async () => {});

// ---------- HOMECLOUD ----------
await clickAria(page, "Abrir Más opciones");
await clickText(page, "HomeCloud");
await go("d50-homecloud", async () => {});

// ---------- MENSAJES ----------
await clickAria(page, "Abrir Más opciones");
await clickText(page, "Mensajes");
await go("d60-mensajes", async () => {});

// ---------- QUICK ACTIONS ----------
await clickAria(page, "Abrir acciones rápidas");
await go("d70-quickactions", async () => {});

console.log("\nERRORS:", JSON.stringify(errors, null, 2));
await browser.close();
