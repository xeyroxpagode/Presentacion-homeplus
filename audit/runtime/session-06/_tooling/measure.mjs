import fs from "node:fs";
import { boot } from "./lib.mjs";

const DATA =
  "C:/Users/thega/Desktop/HomeplusPresentacion01/HomePlus_Presentacion_FINAL/audit/runtime/session-06/data";

const SURFACES = [
  ["home", []],
  ["planner-tareas", ["Ir a Calendario"]],
  ["familia", ["Ir a Familia"]],
  ["inventario", ["Abrir Más opciones", "Inventario"]],
  ["finanzas", ["Abrir Más opciones", "Finanzas"]],
  ["activos", ["Abrir Más opciones", "Activos"]],
  ["homecloud", ["Abrir Más opciones", "HomeCloud"]],
  ["mensajes", ["Abrir Más opciones", "Mensajes"]],
];

const out = {};

for (const [label, steps] of SURFACES) {
  const { browser, page, errors } = await boot();
  try {
    for (const s of steps) {
      const isNav = s.startsWith("Ir a") || s.startsWith("Abrir ") && s.includes("opciones") || s.includes("rápidas");
      if (isNav) {
        const b = page.getByLabel(s, { exact: true }).first();
        if (await b.count()) await b.click({ timeout: 6000 }).catch(() => {});
      } else {
        const l = page.getByText(s, { exact: false }).first();
        if (await l.count()) await l.click({ timeout: 6000 }).catch(() => {});
      }
      await page.waitForTimeout(1400);
    }
    const m = await page.evaluate(() => {
      const phone =
        document.querySelector("div[style*='border-radius: 48px']") || document.body;
      const cs = getComputedStyle(phone);
      const collect = (prop) =>
        [
          ...new Set(
            [...phone.querySelectorAll("*")]
              .map((e) => getComputedStyle(e)[prop])
              .filter((v) => v && v !== "none" && v !== "0px" && v !== "normal" && v !== "auto"),
          ),
        ].sort();
      const faces = collect("font-family");
      return {
        shell: {
          width: cs.width,
          height: cs.height,
          border: cs.border,
          borderRadius: cs.borderRadius,
          boxShadow: cs.boxShadow,
          background: cs.backgroundColor,
          overflow: cs.overflow,
        },
        counts: {
          fontSize: collect("font-size").length,
          fontFamily: faces.length,
          fontWeight: collect("font-weight").length,
          borderRadius: collect("border-radius").length,
          boxShadow: collect("box-shadow").length,
          color: collect("color").length,
          backgroundColor: collect("background-color").length,
          gap: collect("gap").length,
          padding: collect("padding").length,
        },
        fontSizes: collect("font-size"),
        fontFamilies: faces,
        radii: collect("border-radius"),
        shadows: collect("box-shadow"),
        gaps: collect("gap"),
        paddings: collect("padding"),
        fontWeights: collect("font-weight"),
      };
    });
    out[label] = { ...m, consoleErrors: errors };
    console.log(
      `${label.padEnd(16)} fs=${m.counts.fontSize} ff=${m.counts.fontFamily} r=${m.counts.borderRadius} sh=${m.counts.boxShadow} color=${m.counts.color} bg=${m.counts.backgroundColor} gap=${m.counts.gap} pad=${m.counts.padding} fw=${m.counts.fontWeight}`,
    );
  } catch (e) {
    out[label] = { error: e.message.split("\n")[0] };
    console.log(`${label} ERROR ${e.message.split("\n")[0]}`);
  }
  await browser.close();
}

fs.writeFileSync(`${DATA}/visual-system.json`, JSON.stringify(out, null, 2));
console.log("\nwritten visual-system.json");
