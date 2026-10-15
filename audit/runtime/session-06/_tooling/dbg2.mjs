import { boot, census, clickText, clickAria } from "./lib.mjs";
const { browser, page, errors } = await boot();
await census(page, "dbg-a-home");
await clickAria(page, "Ir a Calendario");
const d = await page.evaluate(() => {
  const all = [...document.querySelectorAll('button,[role="button"],[class*="cursor-pointer"]')];
  return all.slice(0, 6).map((n) => {
    const r = n.getBoundingClientRect();
    return { t: (n.innerText || "").slice(0, 20), l: Math.round(r.left), r: Math.round(r.right) };
  });
});
console.log("POSITIONS:", JSON.stringify(d));
await clickText(page, "Planes");
const d2 = await page.evaluate(() => {
  const all = [...document.querySelectorAll('button,[role="button"],[class*="cursor-pointer"]')];
  return all.slice(0, 8).map((n) => {
    const r = n.getBoundingClientRect();
    return { t: (n.innerText || "").slice(0, 20), l: Math.round(r.left), r: Math.round(r.right), w: Math.round(r.width) };
  });
});
console.log("POSITIONS2:", JSON.stringify(d2, null, 1));
await census(page, "dbg-b-planes");
await browser.close();
