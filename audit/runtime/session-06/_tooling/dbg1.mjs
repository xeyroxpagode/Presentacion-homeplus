import { boot, census, clickText, clickAria } from "./lib.mjs";
const OUT =
  "C:/Users/thega/Desktop/HomeplusPresentacion01/HomePlus_Presentacion_FINAL/audit/runtime/session-06/figma";

const { browser, page, errors } = await boot();

async function dbg(label) {
  const d = await page.evaluate(() => {
    const all = document.querySelectorAll("button,[role=button]");
    let vis = 0;
    all.forEach((n) => {
      const r = n.getBoundingClientRect();
      if (r.width > 0 && r.height > 0) vis++;
    });
    return {
      totalButtons: all.length,
      visibleButtons: vis,
      bodyLen: document.body.innerText.length,
      text: document.body.innerText.slice(0, 700),
    };
  });
  console.log(`\n--- ${label} ---`, JSON.stringify(d, null, 2));
  await page.screenshot({ path: `${OUT}/_dbg-${label}.png` });
}

await dbg("00-home");
await clickAria(page, "Ir a Calendario");
await dbg("01-planner-tasks");
await clickText(page, "Planes");
await dbg("02-planner-planes");
await clickText(page, "Cumpleaños", 1400);
await dbg("03-plan-detail");
console.log("ERRORS:", JSON.stringify(errors.slice(0, 10), null, 2));
await browser.close();
