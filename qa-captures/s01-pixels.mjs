// QA V2.1 — auditoría de píxeles sobre las capturas + fotogramas intermedios
// del humo/puertas que los F25/F50/F75 nominales no cubren.
import puppeteer from 'puppeteer-core'
import { PNG } from 'pngjs'
import { readFileSync } from 'node:fs'

const BASE = 'http://localhost:8443'
const OUT = 'qa-captures/s01-v2-1'
const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
const results = []
function check(name, ok, detail = '') { results.push({ name, ok, detail }) }
const load = (f) => PNG.sync.read(readFileSync(`${OUT}/${f}`))
const px = (img, x, y) => { const i = (img.width * Math.round(y) + Math.round(x)) << 2; return [img.data[i], img.data[i + 1], img.data[i + 2]] }
const r = ([R]) => R
function meanDiff(a, b) {
  let s = 0, n = 0
  for (let i = 0; i < a.data.length; i += 97) { s += Math.abs(a.data[i] - b.data[i]); n++ }
  return s / n
}
function countPaper(img, x0, x1, y0, y1) {
  let c = 0
  for (let y = y0; y < y1; y++) for (let x = x0; x < x1; x++) { const [R, G] = px(img, x, y); if (R > 120 && G > 108) c++ }
  return c
}

// ---------- Fotogramas intermedios: puerta abierta y humo visible ----------
{
  const browser = await puppeteer.launch({ executablePath: CHROME })
  const page = await browser.newPage()
  await page.setViewport({ width: 1280, height: 720 })
  await page.goto(`${BASE}/?dev=1&slide=0&step=2`, { waitUntil: 'networkidle0' })
  await sleep(1400)
  await page.keyboard.press('ArrowRight'); await sleep(535)
  await page.screenshot({ path: `${OUT}/run1-cam-1280-S01.3-puertas-mid.png` })
  await page.keyboard.press('ArrowLeft'); await sleep(1400)
  await page.keyboard.press('ArrowRight'); await sleep(665)
  await page.screenshot({ path: `${OUT}/run1-cam-1280-S01.3-humo-mid.png` })
  await browser.close()
}

// ---------- Gate A: silueta (cámara OFF, S01.0) ----------
{
  const img = load('run2-camoff-1280-S01.0.png')
  const bg = px(img, 30, 30)
  check('A: fondo casi negro (#060404-ish)', r(bg) < 14, `bg=rgb(${bg})`)
  const floor = px(img, 600, 545)
  check('A: piso tenue perceptible (600,545)', r(floor) > r(bg) + 3 && r(floor) < 46, `floor=rgb(${floor})`)
  const front1 = px(img, 500, 610)
  const front2 = px(img, 650, 612)
  check('A: SIN frente macizo bajo el faldón (500/650,610)', r(front1) < 26 && r(front2) < 26, `rgb(${front1}) rgb(${front2})`)
  const legL = px(img, 240, 560)
  const legR = px(img, 808, 560)
  const floorRef = px(img, 300, 560)
  check('A: pata izquierda visible y separada del piso', r(legL) > r(floorRef) + 12, `leg=rgb(${legL}) floor=rgb(${floorRef})`)
  check('A: pata derecha visible y separada del piso', r(legR) > r(floorRef) + 12, `leg=rgb(${legR}) floor=rgb(${floorRef})`)
  const top = px(img, 400, 390)
  check('A: tablero de madera (400,390)', r(top) > 33 && r(top) < 70, `top=rgb(${top})`)
  const fridge = px(img, 950, 380)
  const side = px(img, 1050, 380)
  check('A: heladera grafito independiente (950,380)', r(fridge) > 75 && r(fridge) < 135, `front=rgb(${fridge})`)
  check('A: lateral derecho más oscuro que el frente', r(side) < r(fridge) - 15, `side=rgb(${side})`)
  const gap = px(img, 855, 300)
  const gapRef = px(img, 700, 300)
  check('A: separación mesa/heladera visible (855,300)', r(gap) < 30 && r(gap) < r(gapRef) + 8, `gap=rgb(${gap}) ref=rgb(${gapRef})`)
}

// ---------- Gate B: protagonistas reconocibles ----------
{
  const b1 = load('run1-cam-1280-S01.1-F100.png')
  // FOB world (427,371) -> screen (427*3-485, 371*3-807) = (796,306)
  const fob = px(b1, 796, 306)
  check('B: FOB grafito oscuro en close-up', r(fob) < 75, `fob=rgb(${fob})`)
  const policy = px(b1, 595, 348)
  check('B: póliza de papel claro en close-up', r(policy) > 150, `paper=rgb(${policy})`)
  const b2 = load('run1-cam-1280-S01.2-F100.png')
  // Pan sobresaliendo de la boca: región world (510..545, 258..280) —
  // escanear la zona proyectada buscando el tono tan del pan.
  let breadHit = null
  for (let wy = 258; wy <= 280 && !breadHit; wy += 4) {
    for (let wx = 510; wx <= 545; wx += 4) {
      const [R, G, B] = px(b2, wx * 2.45 - 964.75, wy * 2.45 - 468.1)
      if (R > 115 && R > G + 18 && G > B + 8) { breadHit = [R, G, B]; break }
    }
  }
  check('B: pan visible saliendo de la bolsa (tono tan)', breadHit !== null, `sample=rgb(${breadHit})`)
  const bag = px(b2, 471, 316)
  check('B: cuerpo de bolsa kraft', r(bag) > 50 && r(bag) < 120, `bag=rgb(${bag})`)
  const list = px(b2, 720 * 2.45 - 964.75, 395 * 2.45 - 468.1)
  check('B: lista de papel sobre la mesa (centro del papel)', r(list) > 140, `list=rgb(${list})`)
}

// ---------- Gate C: falla con humo + extracción ----------
{
  const mid = load('run1-cam-1280-S01.3-humo-mid.png')
  // humo world (1053,189) -> (1053*1.53-599.3, 189*1.53-224.46) = (1011.8, 64.5)
  const smoke = px(mid, 1012, 65)
  const bgRef = px(mid, 60, 20)
  check('C: humo tenue visible a mitad del beat (480–850ms)', r(smoke) > r(bgRef) + 8, `smoke=rgb(${smoke}) bg=rgb(${bgRef})`)
  const f100 = load('run1-cam-1280-S01.3-F100.png')
  const smokeGone = px(f100, 1012, 65)
  check('C: humo disipado en F100', r(smokeGone) < 20, `rgb(${smokeGone})`)
  const doors = load('run1-cam-1280-S01.3-puertas-mid.png')
  // costado derecho de la puerta superior: con rotateY(10°) el borde derecho
  // retrocede y deja ver la cavidad oscura: world (1025,280) -> (969.25,203.94)
  const cavity = px(doors, 969, 204)
  const fridgeF = px(doors, 900, 204)
  check('C: puerta entreabierta deja ver cavidad (borde derecho oscurece)', r(cavity) < r(fridgeF) - 25, `cavity=rgb(${cavity}) frente=rgb(${fridgeF})`)
}

// ---------- Gate D: contraste S01.4 vs S01.5 ----------
{
  const b4 = load('run2-camoff-1280-S01.4.png')
  const b5 = load('run2-camoff-1280-S01.5.png')
  const p4 = countPaper(b4, 180, 850, 340, 445)
  const p5 = countPaper(b5, 180, 850, 340, 445)
  // Zona central: donde ocurre la invasión real del clímax.
  const c4 = countPaper(b4, 380, 820, 340, 470)
  const c5 = countPaper(b5, 380, 820, 340, 470)
  const ratio = p5 / p4
  const cratio = c5 / Math.max(1, c4)
  check('D: densidad de papel S01.5 >> S01.4 (centro de la mesa)', cratio >= 1.25,
    `tablero: ${p4}→${p5} (x${ratio.toFixed(2)}) · centro: ${c4}→${c5} (x${cratio.toFixed(2)})`)
  const legs4 = px(b4, 240, 560)
  const legs5 = px(b5, 240, 560)
  check('D: patas siguen visibles en el clímax', r(legs5) > 25 && r(legs4) > 25, `b4=rgb(${legs4}) b5=rgb(${legs5})`)
}

// ---------- Gate E: determinismo tras navegación rápida y reversa ----------
{
  const fast = load('run4-rapid-forward-S01.5.png')
  const slow = load('run1-cam-1280-S01.5-F100.png')
  const d1 = meanDiff(fast, slow)
  check('E: avance rápido 0→5 = estado settle idéntico', d1 < 3, `diff medio=${d1.toFixed(2)}`)
  const rev3 = load('run4-reverse-4to3-S01.3.png')
  const fwd3 = load('run1-cam-1280-S01.3-F100.png')
  const d2 = meanDiff(rev3, fwd3)
  check('E: reversa 4→3 termina en el mismo estado F100', d2 < 3, `diff medio=${d2.toFixed(2)}`)
}

let pass = 0, fail = 0
for (const x of results) { if (x.ok) pass++; else fail++ }
console.log(`\n===== PIXELS: ${pass} PASS / ${fail} FAIL =====`)
for (const x of results.filter((v) => !v.ok)) console.log(`FAIL ${x.name} — ${x.detail}`)
