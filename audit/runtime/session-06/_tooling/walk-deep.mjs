import { boot, census, clickText, clickAria } from "./lib.mjs";

const { browser, page, errors } = await boot();

async function branch(label, fn) {
  console.log(`\n\n########## ${label} ##########`);
  await fn();
  await census(page, label);
}

// ---------- PLANNER ----------
await clickAria(page, "Ir a Calendario");
await clickText(page, "Planes");
await branch("10-planner-planes", async () => {});

await clickText(page, "Cumpleaños");
await branch("11-planner-plan-detail", async () => {});

await clickAria(page, "Ir a Calendario");
await clickText(page, "Calendario", 900);
await branch("12-planner-calendar", async () => {});

await clickAria(page, "Ir a Calendario");
await clickText(page, "Tareas", 900);
await clickText(page, "Responsabilidades");
await branch("13-planner-responsibilities", async () => {});

// ---------- MAS: INVENTARIO ----------
await clickAria(page, "Abrir Más opciones");
await clickText(page, "Inventario");
await branch("20-inventario", async () => {});

await clickText(page, "Lugares");
await branch("21-inventario-lugares", async () => {});

await clickText(page, "Compras");
await branch("22-shopping", async () => {});

// ---------- MAS: FINANZAS ----------
await clickAria(page, "Abrir Más opciones");
await clickText(page, "Finanzas");
await branch("30-finanzas", async () => {});

await clickText(page, "Movimientos");
await branch("31-fin-movimientos", async () => {});

await clickText(page, "Pagos");
await branch("32-fin-pagos", async () => {});

await clickText(page, "Análisis");
await branch("33-fin-analisis", async () => {});

await clickText(page, "Cuentas");
await branch("34-fin-cuentas", async () => {});

await clickText(page, "Papelera");
await branch("35-fin-papelera", async () => {});

// ---------- MAS: ACTIVOS ----------
await clickAria(page, "Abrir Más opciones");
await clickText(page, "Activos");
await branch("40-activos", async () => {});

await clickText(page, "PlayStation", 1200);
await branch("41-activo-ps5", async () => {});

// ---------- MAS: HOMECLOUD ----------
await clickAria(page, "Abrir Más opciones");
await clickText(page, "HomeCloud");
await branch("50-homecloud", async () => {});

await clickText(page, "Recuerdos");
await branch("51-homecloud-recuerdos", async () => {});

await clickText(page, "Álbumes");
await branch("52-homecloud-albumes", async () => {});

// ---------- MAS: MENSAJES ----------
await clickAria(page, "Abrir Más opciones");
await clickText(page, "Mensajes");
await branch("60-mensajes", async () => {});

console.log("\nERRORS:", JSON.stringify(errors, null, 2));
await browser.close();
