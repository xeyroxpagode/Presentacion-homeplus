// Slice B — deriva capas auténticas del isotipo HomePlus desde el PNG oficial.
// Cada píxel no transparente va EXACTAMENTE a una capa con su RGBA original:
//   composite(orange + white + plus) === original (verificado abajo).
// Además mide: bbox, color naranja dominante, bounding del «+», discos de
// cabezas (componentes conexas blancas sólidas) y región del techo.
// Uso: node scripts/extract-s03-logo.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { PNG } from 'pngjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, 'assets/07a9c99e-dd9f-4b8b-a7dc-2453e6935ca2.png');
const OUT = path.join(ROOT, 'src/presentation/slides/S03HomePlus/assets');
fs.mkdirSync(OUT, { recursive: true });

const png = PNG.sync.read(fs.readFileSync(SRC));
const W = png.width, H = png.height;
const px = (x, y) => {
  const i = (y * W + x) * 4;
  return [png.data[i], png.data[i + 1], png.data[i + 2], png.data[i + 3]];
};

// --- clasificación -------------------------------------------------------
function kind(x, y) {
  const [r, g, b, a] = px(x, y);
  if (a < 20) return 0; // transparente
  // Naranja: rojo dominante, azul bajo.
  if (r - b > 60 && r - g > 25 && r > 150) return 1;
  // Blanco: todo alto.
  if (r > 170 && g > 170 && b > 170) return 2;
  // Ambiguo (antialias): decide por cercanía.
  const orangeD = Math.abs(r - 226) + Math.abs(g - 95) + Math.abs(b - 39);
  const whiteD = Math.abs(r - 253) + Math.abs(g - 253) + Math.abs(b - 253);
  return orangeD <= whiteD ? 1 : 2;
}

// bbox global no transparente
let minx = W, miny = H, maxx = 0, maxy = 0;
const K = new Uint8Array(W * H);
for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
  const k = kind(x, y);
  K[y * W + x] = k;
  if (k) { if (x < minx) minx = x; if (y < miny) miny = y; if (x > maxx) maxx = x; if (y > maxy) maxy = y; }
}
console.log('size', W, H, 'bbox', minx, miny, maxx, maxy);

// color naranja dominante (mediana de píxeles naranja interiores)
let or = [], og = [], ob = [];
for (let y = miny; y <= maxy; y += 2) for (let x = minx; x <= maxx; x += 2) {
  if (K[y * W + x] !== 1) continue;
  const [r, g, b] = px(x, y);
  if (r > 150 && b < 130) { or.push(r); og.push(g); ob.push(b); }
}
const med = a => a.sort((p, q) => p - q)[Math.floor(a.length / 2)];
const orange = [med(or), med(og), med(ob)];
console.log('orange median', orange, `count=${or.length}`);
const orangeHex = '#' + orange.map(v => v.toString(16).padStart(2, '0')).join('').toUpperCase();

// --- componentes conexas blancas (cabezas / cuerpos / techo / muros) -------
const seen = new Uint8Array(W * H);
const comps = [];
for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
  const i = y * W + x;
  if (K[i] !== 2 || seen[i]) continue;
  // BFS
  let bx0 = x, by0 = y, bx1 = x, by1 = y, n = 0;
  const stack = [i]; seen[i] = 1;
  while (stack.length) {
    const c = stack.pop(); n++;
    const cx = c % W, cy = (c / W) | 0;
    if (cx < bx0) bx0 = cx; if (cy < by0) by0 = cy;
    if (cx > bx1) bx1 = cx; if (cy > by1) by1 = cy;
    // 4-vecinos
    if (cx > 0 && K[c - 1] === 2 && !seen[c - 1]) { seen[c - 1] = 1; stack.push(c - 1); }
    if (cx < W - 1 && K[c + 1] === 2 && !seen[c + 1]) { seen[c + 1] = 1; stack.push(c + 1); }
    if (cy > 0 && K[c - W] === 2 && !seen[c - W]) { seen[c - W] = 1; stack.push(c - W); }
    if (cy < H - 1 && K[c + W] === 2 && !seen[c + W]) { seen[c + W] = 1; stack.push(c + W); }
  }
  if (n > 40) comps.push({ n, x0: bx0, y0: by0, x1: bx1, y1: by1 });
}
comps.sort((a, b) => b.n - a.n);
console.log('white components:', comps.length);
for (const c of comps.slice(0, 12)) {
  const w = c.x1 - c.x0 + 1, h = c.y1 - c.y0 + 1;
  const fill = c.n / (w * h);
  console.log(`  n=${c.n} bbox=[${c.x0},${c.y0},${c.x1},${c.y1}] w=${w} h=${h} fill=${fill.toFixed(3)} cx=${((c.x0 + c.x1) / 2).toFixed(1)} cy=${((c.y0 + c.y1) / 2).toFixed(1)}`);
}

// --- «+»: blancos dentro de la región superior derecha ----------------------
const PLUS = { x0: 790, y0: 240, x1: 1040, y1: 480 };
let px0 = 1e9, py0 = 1e9, px1 = 0, py1 = 0, pn = 0;
for (let y = PLUS.y0; y <= PLUS.y1; y++) for (let x = PLUS.x0; x <= PLUS.x1; x++) {
  if (K[y * W + x] === 2) { pn++; if (x < px0) px0 = x; if (y < py0) py0 = y; if (x > px1) px1 = x; if (y > py1) py1 = y; }
}
// Refina: el «+» es conexo; toma la componente mayor dentro de la región.
console.log('plus region whites:', pn, 'bbox', px0, py0, px1, py1);

// máscara del plus: flood desde el centro conocido
const PLUS_SEED = { x: 914, y: 371 };
const plusMask = new Uint8Array(W * H);
{
  const stack = [PLUS_SEED.y * W + PLUS_SEED.x];
  plusMask[PLUS_SEED.y * W + PLUS_SEED.x] = 1;
  let qx0 = 1e9, qy0 = 1e9, qx1 = 0, qy1 = 0;
  while (stack.length) {
    const c = stack.pop();
    const cx = c % W, cy = (c / W) | 0;
    if (cx < qx0) qx0 = cx; if (cy < qy0) qy0 = cy;
    if (cx > qx1) qx1 = cx; if (cy > qy1) qy1 = cy;
    const nb = [c - 1, c + 1, c - W, c + W];
    for (const d of nb) {
      if (d < 0 || d >= W * H || plusMask[d] || K[d] !== 2) continue;
      plusMask[d] = 1; stack.push(d);
    }
  }
  console.log('plus flood bbox', qx0, qy0, qx1, qy1);
  px0 = qx0; py0 = qy0; px1 = qx1; py1 = qy1;
}
const plusCx = (px0 + px1) / 2, plusCy = (py0 + py1) / 2;

// --- escritura de capas -----------------------------------------------------
function layer(pred) {
  const out = new PNG({ width: W, height: H });
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    const i = y * W + x, o = i * 4;
    if (pred(x, y, i)) {
      out.data[o] = png.data[o]; out.data[o + 1] = png.data[o + 1];
      out.data[o + 2] = png.data[o + 2]; out.data[o + 3] = png.data[o + 3];
    } else { out.data[o + 3] = 0; }
  }
  return out;
}
const isPlus = (x, y, i) => plusMask[i] === 1;
const orangePng = layer((x, y, i) => K[i] === 1);
const whitePng = layer((x, y, i) => K[i] === 2 && !isPlus(x, y, i));
const plusPngFull = layer((x, y, i) => isPlus(x, y, i));
// recorta el plus con margen
const PM = 8;
const cx0 = Math.max(0, px0 - PM), cy0 = Math.max(0, py0 - PM);
const cx1 = Math.min(W - 1, px1 + PM), cy1 = Math.min(H - 1, py1 + PM);
function crop(p, x0, y0, x1, y1) {
  const w = x1 - x0 + 1, h = y1 - y0 + 1;
  const out = new PNG({ width: w, height: h });
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    const si = ((y0 + y) * W + (x0 + x)) * 4, di = (y * w + x) * 4;
    out.data[di] = p.data[si]; out.data[di + 1] = p.data[si + 1];
    out.data[di + 2] = p.data[si + 2]; out.data[di + 3] = p.data[si + 3];
  }
  return out;
}
fs.writeFileSync(path.join(OUT, 's03-logo-orange.png'), PNG.sync.write(orangePng));
fs.writeFileSync(path.join(OUT, 's03-logo-white.png'), PNG.sync.write(whitePng));
fs.writeFileSync(path.join(OUT, 's03-logo-plus.png'), PNG.sync.write(crop(plusPngFull, cx0, cy0, cx1, cy1)));

// --- verificación: composite exacto ------------------------------------------
let maxDiff = 0, diffN = 0;
for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
  const o = (y * W + x) * 4;
  // over: plus encima de white encima de orange (mismo color donde se solapan: no se solapan)
  const cand = [orangePng.data, whitePng.data, plusPngFull.data];
  let r = 0, g = 0, b = 0, a = 0;
  for (const L of cand) {
    const la = L[o + 3] / 255;
    r = L[o] * la + r * (1 - la); g = L[o + 1] * la + g * (1 - la);
    b = L[o + 2] * la + b * (1 - la); a = la + a * (1 - la);
  }
  const d = Math.max(Math.abs(r - png.data[o]), Math.abs(g - png.data[o + 1]), Math.abs(b - png.data[o + 2]), Math.abs(a * 255 - png.data[o + 3]));
  if (d > 0.5) diffN++;
  if (d > maxDiff) maxDiff = d;
}
console.log('composite check: maxDiff=', maxDiff.toFixed(3), 'diffPixels=', diffN);

// ficheros
for (const f of ['s03-logo-orange.png', 's03-logo-white.png', 's03-logo-plus.png']) {
  console.log(f, (fs.statSync(path.join(OUT, f)).size / 1024).toFixed(1) + 'KB');
}

// cabezas: componentes con fill alto y bbox ~cuadrada (discos sólidos)
const heads = comps
  .filter(c => {
    const w = c.x1 - c.x0 + 1, h = c.y1 - c.y0 + 1;
    const fill = c.n / (w * h);
    const sq = Math.min(w, h) / Math.max(w, h);
    return fill > 0.55 && sq > 0.8 && w > 60;
  })
  .map(c => ({
    cx: (c.x0 + c.x1) / 2, cy: (c.y0 + c.y1) / 2,
    rx: (c.x1 - c.x0 + 1) / 2, ry: (c.y1 - c.y0 + 1) / 2, n: c.n,
  }))
  .sort((a, b) => b.rx * b.ry - a.rx * a.ry);
console.log('heads', JSON.stringify(heads));

const metrics = {
  png: { w: W, h: H },
  bbox: { x0: minx, y0: miny, x1: maxx, y1: maxy },
  orangeHex,
  plus: { x0: px0, y0: py0, x1: px1, y1: py1, cx: plusCx, cy: plusCy, crop: { x0: cx0, y0: cy0, x1: cx1, y1: cy1 } },
  heads,
  components: comps.slice(0, 12),
  composite: { maxDiff, diffPixels: diffN },
};
fs.writeFileSync(path.join(OUT, 's03-logo-metrics.json'), JSON.stringify(metrics, null, 2));
console.log('metrics written');
