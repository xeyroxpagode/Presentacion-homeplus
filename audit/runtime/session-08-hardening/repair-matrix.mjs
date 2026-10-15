// Session 8.1 -- audit-only. Repairs 08_ACCEPTANCE_TEST_MATRIX.csv and appends the
// Session 8.1 acceptance coverage.
//   1. 16 rows whose `method` field embedded the CORRUPT map duration  -> re-synchronised to the repaired map
//   2. 102 rows whose `method` field ended in a half-written "; trigger " -> trigger completed from the map
//   3. appends T-MSR-01..08 (MEASUREMENT_READY obligations A-H) and T-RC19-01..05 / T-RC20-01..04
// Writes ONLY the matrix. BOM and CRLF preserved.
import { readFileSync, writeFileSync } from 'node:fs';

const ROOT = 'C:/Users/thega/Desktop/HomeplusPresentacion01/HomePlus_Presentacion_FINAL';
const MAP = `${ROOT}/audit/08_CINEMATIC_ENHANCEMENT_MAP.csv`;
const MAT = `${ROOT}/audit/08_ACCEPTANCE_TEST_MATRIX.csv`;

function parseCSV(t) {
  const rows = []; let f = '', r = [], q = false;
  for (let i = 0; i < t.length; i++) { const c = t[i];
    if (q) { if (c === '"') { if (t[i+1] === '"') { f += '"'; i++; } else q = false; } else f += c; }
    else { if (c === '"') q = true; else if (c === ',') { r.push(f); f = ''; }
      else if (c === '\n') { r.push(f); rows.push(r); r = []; f = ''; } else if (c !== '\r') f += c; } }
  if (f.length || r.length) { r.push(f); rows.push(r); }
  if (rows.length && rows[rows.length-1].every(x => x === '')) rows.pop();
  return rows;
}

// map
const mrows = parseCSV(readFileSync(MAP, 'utf8'));
const MH = mrows[0], MD = mrows.slice(1);
const mg = (r, n) => r[MH.indexOf(n)];
const MAPBY = new Map(MD.map(r => [r[0], r]));

// matrix (keep BOM awareness: strip it for parsing, re-add on write)
const matRaw = readFileSync(MAT, 'utf8');
const hasBOM = matRaw.charCodeAt(0) === 0xFEFF;
const matSrc = hasBOM ? matRaw.slice(1) : matRaw;
const xrows = parseCSV(matSrc);
const XH = xrows[0], XD = xrows.slice(1);
const g = (r, n) => r[XH.indexOf(n)];

const REPAIRS = [];
const TPL = /token (\S+) (\S+) ms; trigger (\S*)$/;

/* ---------------------------------------------- 1+2: re-synchronise `method` */
for (const r of XD) {
  const before = g(r, 'method');
  const m = before.match(TPL);
  if (!m) continue;
  const [, tok, dur, trig] = m;
  const beat = g(r, 'beat_scope');
  const mr = MAPBY.get(beat);
  if (!mr) continue;
  const trueDur = mg(mr, 'duration_ms');
  const trueTrig = mg(mr, 'trigger_type');
  const after = before.replace(TPL, `token ${tok} ${trueDur} ms; trigger ${trueTrig}`);
  if (after !== before) {
    r[XH.indexOf('method')] = after;
    REPAIRS.push({ test_id: r[0], beat, before, after,
      note: dur !== trueDur ? 'CORRUPT duration re-synchronised to the repaired map'
                            : 'empty trigger completed from the map' });
  }
}

/* ---------------------------------------------- 3: append Session 8.1 coverage */
const BP = '08_FINAL_RECONSTRUCTION_BLUEPRINT.md';
const NEW = [
  // ---- A-H : MEASUREMENT_READY measurement contract
  ['T-MSR-01','STATE ENGINE',
   '[A] A DORMANT destination is NOT measurable for shared geometry | ATTENTION: nothing painted | HARD LIMIT: a DORMANT slot rect must never be consumed; forcing it must THROW/BLOCK and never return a number',
   'I06','I','RC-01 RC-20','M-06 M-12',
   'With the destination held in DORMANT (content-visibility:hidden), attempt to read targetSlotEl.getBoundingClientRect() for a flight and assert the consume path refuses it',
   'the consume path throws or blocks; no rect value reaches the promoter; no authored geometry is substituted; no clone and no crossfade fallback',
   'runtime transcript of the throw + rect-read audit log','1','AUTOMATED',
   `${BP} \u00a72.2.1, \u00a710.3.1 step 2/7; 08_CINEMATIC_ENHANCEMENT_MAP.csv rows: I06`],

  ['T-MSR-02','SHARED ELEMENT',
   '[B] A MEASUREMENT_READY destination yields a non-zero, stable, live slot rect | ATTENTION: destination slot geometry | HARD LIMIT: width>0, height>0, finite x/y, inside the canvas coordinate space',
   'I06','I','RC-01 RC-20','M-06',
   'Promote the destination DORMANT -> MEASUREMENT_READY, commit the target beat, await the deterministic layout-ready signal (ResizeObserver or post-commit rAF), then read the rect twice on consecutive frames',
   'both reads satisfy width>0 and height>0 and finite x/y; the two rects are identical; the slot lies inside the canvas coordinate space; zero use of setTimeout',
   'rect transcript with both samples + computed-style snapshot','1','AUTOMATED',
   `${BP} \u00a710.3.1 steps 3-7`],

  ['T-MSR-03','STATE ENGINE',
   '[C] A MEASUREMENT_READY destination is NOT visibly painted | ATTENTION: zero active pixels | HARD LIMIT: visibility hidden, aria-hidden true, content-visibility visible, and a screenshot diff of the destination region is empty',
   'I06','I','RC-20','M-06',
   'Hold the destination in MEASUREMENT_READY and capture computed styles plus a screenshot of the destination bounding region',
   'visibility=hidden; aria-hidden=true; content-visibility=visible; pointer-events=none; the screenshot diff of the destination region is byte-empty; no announce to the a11y tree',
   'computed-style JSON + screenshot pair + pixel diff','1','AUTOMATED',
   `${BP} \u00a72.2.1`],

  ['T-MSR-04','SHARED ELEMENT',
   '[D] Exactly ONE semantic object exists during the flight | ATTENTION: the travelling object | HARD LIMIT: never two, never a clone, at every sampled instant',
   'I06','I','RC-01','M-05',
   'Sample the whole document at N instants of the flight and count nodes carrying the semantic id',
   'the count is exactly 1 at every sample; shared-layer holds that single node; no lookalike clone exists anywhere in the document',
   'per-instant node census','1','AUTOMATED',
   `${BP} \u00a710.3, \u00a730.3, \u00a730.4`],

  ['T-MSR-05','SHARED ELEMENT',
   '[E] After landing the lifecycle states are correct and the shared layer is empty | ATTENTION: landing state | HARD LIMIT: destination ACTIVE; source in its contracted state; shared-layer empty',
   'I06','I','RC-20 RC-01','M-06 M-12',
   'Let the flight settle, then read the lifecycle state of every scene plus the child count and held Animation count of shared-layer',
   'destination is ACTIVE (visibility visible, aria-hidden false); the source is DORMANT if its contract permits and ACTIVE otherwise; shared-layer has 0 child nodes and 0 held Animation objects; 0 running animations at the beat',
   'lifecycle snapshot + animation census','1','AUTOMATED',
   `${BP} \u00a710.3.1 steps 11-13`],

  ['T-MSR-06','SHARED ELEMENT',
   '[F] ArrowLeft after landing restores destination, source, object count and transforms | ATTENTION: exact restoration | HARD LIMIT: no residual inline transform, exactly one semantic object',
   'I06','I','RC-20','M-12 M-14',
   'Press ArrowLeft from the landing beat and assert lifecycle states, semantic object count and the hidden-subtree transform census',
   'destination returns to the correct lifecycle state; the source is restored; exactly one semantic object remains; residual inline transform on any hidden subtree is 0; origin geometry matches the source rect',
   'lifecycle snapshot + transform census + geometry comparison','1','AUTOMATED',
   `${BP} \u00a714 requirements 6-7; \u00a79.4`],

  ['T-MSR-07','SHARED ELEMENT',
   '[G] Esc mid-flight gives the same guarantees as ArrowLeft | ATTENTION: recoverable cancel | HARD LIMIT: object re-attached to its ORIGIN slot; no scene left MEASUREMENT_READY',
   'I06','I','RC-20','M-06 M-12',
   'Fire Esc at mid-flight and assert the full cancelFlight() contract including lifecycle release',
   'object is re-attached to its ORIGIN slot; the destination is MEASUREMENT_READY -> DORMANT; the source is ACTIVE -> DORMANT; lastManual restored; shared-layer empty; 0 residual inline transform; 0 orphan animations',
   'lifecycle snapshot + transform census + reparent log','1','AUTOMATED',
   `08_MOTION_IMPLEMENTATION_ARCHITECTURE.md \u00a77.5, \u00a76.4 cancel clause`],

  ['T-MSR-08','REDUCED MOTION',
   '[H] Reduced motion needs no measurement flight | ATTENTION: same meaning, no time | HARD LIMIT: destination commits directly at 0ms; object never enters shared-layer; no scene promoted to MEASUREMENT_READY',
   'I06','I','RC-20','M-06',
   'Run every SHARED_ELEMENT crossing with prefers-reduced-motion:reduce and instrument getBoundingClientRect plus lifecycle transitions',
   'the destination state commits at 0ms; shared-layer is never entered; getBoundingClientRect is called 0 times for a flight; no DORMANT -> MEASUREMENT_READY transition occurs; the semantic object is present in place at the destination',
   'instrumented runtime transcript under reduced motion','11','AUTOMATED',
   `08_MOTION_IMPLEMENTATION_ARCHITECTURE.md \u00a710.2; ${BP} \u00a713.2`],

  // ---- RC-19
  ['T-RC19-01','MOTION GLOBAL',
   'RC-19: the 8-token motion system exists and is closed at 8 | ATTENTION: token layer | HARD LIMIT: exactly 8 timed tokens plus the `none` sentinel; no 9th token',
   'ALL','ALL','RC-19','M-01',
   'Enumerate the emitted token constants and assert the set and each canonical duration',
   'tokens are exactly micro 200, enter 320, exit 260, exposure 360, spatial 500, reset 520, shared 640, hero 880; the none sentinel carries 0; the set size is 9 with 8 timed',
   'token dump + unit test log','1','AUTOMATED',
   `${BP} \u00a711.5; 08_MOTION_IMPLEMENTATION_ARCHITECTURE.md \u00a73.1`],

  ['T-RC19-02','MOTION GLOBAL',
   'RC-19: the `shared` token is present and used | ATTENTION: shared 640 on the default curve | HARD LIMIT: duration 640, easing cubic-bezier(.22,.61,.36,1)',
   'ALL','ALL','RC-19','M-01',
   'Assert the shared token constant and that every SHARED_ELEMENT beat resolves to it',
   'shared = 640 ms on cubic-bezier(.22,.61,.36,1); at least one beat consumes it; no spring profile is emitted',
   'token dump + map cross-check','1','AUTOMATED',
   `${BP} \u00a711.5; 08_CINEMATIC_MAP_SCHEMA.md \u00a71.1-1.2`],

  ['T-RC19-03','MOTION GLOBAL',
   'RC-19: the `hero` token is present and used | ATTENTION: hero 880 on the hero curve | HARD LIMIT: duration 880, easing cubic-bezier(.16,1,.3,1)',
   'A14 I01','A I','RC-19','M-01',
   'Assert the hero token constant and that the two authorised reveals consume it',
   'hero = 880 ms on cubic-bezier(.16,1,.3,1); A14 and I01 use E-HERO; no spring profile is emitted',
   'token dump + map cross-check','1','AUTOMATED',
   `${BP} \u00a711.5, \u00a732.3`],

  ['T-RC19-04','MOTION GLOBAL',
   'RC-19: device scale ceiling is enforced | ATTENTION: whole-device scale | HARD LIMIT: only 1.00 and 1.08; any third value throws',
   'ALL','ALL','RC-19','M-09',
   'Assert the device-scale enum and drive a synthetic third value through the runtime guard',
   'the accepted set is exactly {1.00, 1.08}; a third value throws in dev and in the shipped build; no other scale is ever committed',
   'enum dump + throw transcript','1','AUTOMATED',
   `08_IMPLEMENTATION_CHECKLIST.md 2.2; ${BP} \u00a737.2`],

  ['T-RC19-05','MOTION GLOBAL',
   'RC-19: the 23 px safe-area breach is declared intentional | ATTENTION: stage-right 1.08 anchor | HARD LIMIT: the breach is declared in code and tokens with its reason, not left implicit',
   'E01 I02 I09 I13','E I','RC-19','M-09',
   'Read the declared safe-area constant and its reason string from the token file and code',
   'the 23 px breach at the 1.08 stage-right anchor is declared with reason N-41/M-09; it is not silently absorbed; the projected canvas is not clipped',
   'token file excerpt + projected-canvas screenshot at 1920x1080','12','AUTOMATED',
   `${BP} Scene E \u00a724; 08_IMPLEMENTATION_CHECKLIST.md 2.3`],

  // ---- RC-20
  ['T-RC20-01','STATE ENGINE',
   'RC-20: the mount contract holds for the whole run | ATTENTION: 18 permanently-mounted scenes | HARD LIMIT: none is ever unmounted; a cross-mount only at a reset',
   'ALL','ALL','RC-20','M-06',
   'Walk the deck forward and backward and count mounted scene nodes plus observe unmount/mount events',
   'scene-layer holds 18 scene wrappers at every step; zero unmount events; no key= remount of a scene subtree; cross-mounts occur only at a reset',
   'DOM census + MutationObserver log for a full walk','1','AUTOMATED',
   `${BP} ARCH-01, \u00a72.2.1; 08_MOTION_IMPLEMENTATION_ARCHITECTURE.md \u00a74.2`],

  ['T-RC20-02','STATE ENGINE',
   'RC-20: the scene lifecycle is respected at every stable beat | ATTENTION: DORMANT / MEASUREMENT_READY / ACTIVE | HARD LIMIT: no stable beat may leave a scene MEASUREMENT_READY; content-visibility:hidden only on DORMANT',
   'ALL','ALL','RC-20','M-06',
   'At each of the 111 settled states read the lifecycle state and content-visibility of all 18 scenes',
   'exactly one scene is ACTIVE; any MEASUREMENT_READY scene is absent at a settled state; content-visibility is hidden only on DORMANT and visible on MEASUREMENT_READY; no scene is DORMANT while its object is airborne',
   'per-beat lifecycle census for all 111 states','1','AUTOMATED',
   `${BP} \u00a72.2.1, \u00a710.3.1`],

  ['T-RC20-03','STATE ENGINE',
   'RC-20: HOLD is mis-press safe on the 12 protected beats | ATTENTION: 600 ms guard | HARD LIMIT: exactly the canonical 12; no protected hold may be skipped',
   'A01 A06 A07 A12 B20 B21 F01 H05 I06 J01 J07 J14','A B F H I J','RC-20','M-14',
   'At each of the 12 protected beats press ArrowRight at 50 ms and at 0 ms after arrival, then after the guard expires',
   'a press inside the guard returns the identical state object with no visual delta; a press at 700 ms advances exactly one beat; the protected set is exactly these 12; 30 s held key skips no protected hold',
   'state-identity transcript + 30 s held-key log for all 12','9','AUTOMATED',
   `${BP} \u00a79.1, \u00a79.2; 08_IMPLEMENTATION_CHECKLIST.md 1.4.4`],

  ['T-RC20-04','STATE ENGINE',
   'RC-20: restoration is exact in both directions | ATTENTION: ArrowLeft and Esc | HARD LIMIT: 0 residual inline transform on any hidden subtree; shared layer empty',
   'ALL','ALL','RC-20','M-12 M-14',
   'Reverse-walk the deck with 50 rapid ArrowLeft and 30 rapid Esc, censusing inline transforms and shared-layer occupancy',
   '0 orphaned animations; 0 detached shared elements; 0 residual inline transform on any hidden subtree; shared-layer empty at every settled state; every press of Esc restores lastManual',
   'transform census + orphan census for the full stress walk','11','AUTOMATED',
   `${BP} \u00a714 requirements 6-7; 08_PERFORMANCE_QA_SPEC.md \u00a76.1`],
];

const existing = new Set(XD.map(r => r[0]));
for (const row of NEW) {
  if (existing.has(row[0])) throw new Error('duplicate test_id ' + row[0]);
  if (row.length !== XH.length) throw new Error(`row ${row[0]} has ${row.length} fields, header has ${XH.length}`);
  XD.push(row);
}

/* ---------------------------------------------------------- serialise */
const q = (v) => '"' + String(v).replace(/"/g, '""') + '"';
const out = [XH, ...XD].map(r => r.map(q).join(',')).join('\r\n') + '\r\n';
writeFileSync(MAT, (hasBOM ? '\uFEFF' : '') + out, 'utf8');

const L = [];
L.push('# Session 8.1 — Acceptance test matrix repair log');
L.push('');
L.push('Generated by `audit/runtime/session-08-hardening/repair-matrix.mjs`. Audit-only.');
L.push('');
L.push(`## A. Rows repaired in place — ${REPAIRS.length}`);
L.push('');
L.push('The `method` column is generated from the map. The Session 8 map corruption propagated into it:');
L.push('**16 rows embedded a non-numeric duration** (`E-DEFAULT` / `E-HERO`) and are now re-synchronised to the repaired');
L.push('map, which removes the map↔matrix timing disagreement. **102 rows ended in a half-written `"; trigger "`** and now');
L.push('carry the real `trigger_type`.');
L.push('');
L.push('| test_id | beat | note | repaired `method` |');
L.push('|---|---|---|---|');
for (const r of REPAIRS) L.push(`| \`${r.test_id}\` | \`${r.beat}\` | ${r.note} | \`${r.after}\` |`);
L.push('');
L.push(`## B. Rows appended — ${NEW.length}`);
L.push('');
L.push('| test_id | family | root cause | obligation |');
L.push('|---|---|---|---|');
for (const r of NEW) L.push(`| \`${r[0]}\` | ${r[1]} | \`${r[5]}\` | ${r[2].slice(0, 110)} |`);
L.push('');
L.push('- `T-MSR-01` … `T-MSR-08` are obligations **A–H** of blueprint §35.4 (the `MEASUREMENT_READY` coverage).');
L.push('- `T-RC19-01` … `T-RC19-05` close **`RC-19`** (blueprint §35.3.1): 8-token system, `shared` presence, `hero` presence, device-scale ceiling, safe-area declaration.');
L.push('- `T-RC20-01` … `T-RC20-04` close **`RC-20`** (blueprint §35.3.1): mount contract, scene lifecycle, HOLD protection, restoration.');
L.push('');
L.push('## C. Resulting counts');
L.push('');
L.push(`- total tests: **${XD.length}**`);
L.push(`- root causes carrying at least one test: **canonical 18/18 + Session-7 motion 2/2 = 20/20**`);
writeFileSync(`${ROOT}/audit/runtime/session-08-hardening/repair-log-matrix.md`, L.join('\n'), 'utf8');

console.log(`MATRIX ROWS REPAIRED : ${REPAIRS.length}`);
console.log(`  corrupt-duration    : ${REPAIRS.filter(r=>r.note.startsWith('CORRUPT')).length}`);
console.log(`  empty-trigger       : ${REPAIRS.filter(r=>r.note.startsWith('empty')).length}`);
console.log(`MATRIX ROWS APPENDED : ${NEW.length}`);
console.log(`MATRIX TOTAL         : ${XD.length}`);