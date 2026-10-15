// Session 8.1 -- audit-only. Repairs 08_CINEMATIC_ENHANCEMENT_MAP.csv from authority.
// Writes ONLY the map. Every change is listed in REPAIRS and echoed to the derivation log.
// Schema contract: audit/08_CINEMATIC_MAP_SCHEMA.md
import { readFileSync, writeFileSync } from 'node:fs';

const ROOT = 'C:/Users/thega/Desktop/HomeplusPresentacion01/HomePlus_Presentacion_FINAL';
const MAP = `${ROOT}/audit/08_CINEMATIC_ENHANCEMENT_MAP.csv`;
const STILL = 'NONE \u2014 STILLNESS IS THE DESIGN.';

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

const rows = parseCSV(readFileSync(MAP, 'utf8'));
const H = rows[0], D = rows.slice(1);
const col = (n) => H.indexOf(n);
const byId = new Map(D.map(r => [r[0], r]));

const REPAIRS = [];
function set(beat, field, value, why) {
  const r = byId.get(beat);
  if (!r) throw new Error(`no such beat ${beat}`);
  const i = col(field);
  if (i < 0) throw new Error(`no such column ${field}`);
  const before = r[i];
  if (before === value) return;
  r[i] = value;
  REPAIRS.push({ beat, field, before, after: value, why });
}

// ---------------------------------------------------------------- duration_ms
// Authority: 07_TRIGGER_BEAT_MAP.csv auto_total_duration; 07_MOTION_STAGECRAFT_AUDIT.md
// §15.3 sequence table; 8-token table §1.1; architecture §3.2 KEEP AS-IS frozen list.
const DUR = {
  F01: ['0',            'token `none`; protected black HOLD; nothing moves'],
  G02: ['1140',         '07_TRIGGER_BEAT_MAP.csv:67 auto_total_duration=1140'],
  G03: ['1100',         '07_TRIGGER_BEAT_MAP.csv:68 auto_total_duration=1100'],
  G04: ['1400',         '07_TRIGGER_BEAT_MAP.csv:69 auto_total_duration=1400'],
  G05: ['320',          'token `enter` = 320'],
  G07: ['500',          'token `spatial` = 500'],
  G09: ['1200',         '07_TRIGGER_BEAT_MAP.csv:74 auto_total_duration=1200'],
  H04: ['860',          '07_MOTION_STAGECRAFT_AUDIT.md:557 exposure 360 + spatial 500'],
  I02: ['860',          '07_MOTION_STAGECRAFT_AUDIT.md:560 spatial 500 + exposure 360'],
  I09: ['500',          '07_TRIGGER_BEAT_MAP.csv:90 auto_total_duration=500'],
  I11: ['500',          'token `spatial` = 500'],
  I13: ['1000',         '07_MOTION_STAGECRAFT_AUDIT.md:563 spatial 500 out + 500 in'],
  J02: ['320',          'token `enter` = 320'],
  J04: ['320',          'token `enter` = 320'],
  J05: ['320',          'token `enter` = 320'],
  J11: ['1400',         '07_TRIGGER_BEAT_MAP.csv:109 auto_total_duration=1400; 07:567, :1276'],
  J14: ['420',          'architecture §3.2 "J14 keeps 420 ms" (07 §37.3 #7); blueprint §37.2 forbids re-timing the end card; row own hard_limit states 420/420/90 preserved'],
};
for (const [b, [v, w]] of Object.entries(DUR)) set(b, 'duration_ms', v, w);

// ---------------------------------------------------------------- stagger_ms
// Re-derived from the beat's authority-stated stage stagger, or 0 where the stages are serial.
const STG = {
  G02: ['0',   'three local-focus steps, each returns to 100 before the next (07:553)'],
  G03: ['0',   'five verbs, one active at a time (07:1080)'],
  G04: ['0',   'single AUTO chain (07:1081)'],
  G05: ['120', 'enter 320ms each, 120ms apart (07_TRIGGER_BEAT_MAP.csv:70)'],
  G07: ['0',   'MANUAL, no stages declared'],
  G09: ['120', 'auto: staggered 120ms steps (07_TRIGGER_BEAT_MAP.csv:74)'],
  H04: ['0',   'exposure 360 then spatial 500, serial (07:557)'],
  I02: ['0',   'spatial 500 then exposure 360, serial (07:560)'],
  I09: ['120', 'spatial 500, staggered 120ms (07:1216)'],
  I11: ['0',   'MANUAL, no stages declared'],
  I13: ['0',   'out 500 then in 500, serial (07:563)'],
  J02: ['120', 'enter 320ms each, 120ms apart (07:1267)'],
  J04: ['70',  'enter 320ms, 70ms stagger (07:1269)'],
  J05: ['120', 'enter 320ms, 120ms stagger (07:1270)'],
  J11: ['120', '3 groups staged 120ms apart (07:1811; blueprint CINE-04)'],
  J14: ['90',  'team stagger 90ms x 4 (07 §37.1 #17); architecture §3.2 "J14 keeps 90 ms"'],
};
for (const [b, [v, w]] of Object.entries(STG)) set(b, 'stagger_ms', v, w);

// ---------------------------------------------------------------- spring_or_easing
// Displacement artefact: the 15 timed-token rows whose duration was displaced also lost
// their curve to NONE. Re-bound to the frozen 3-curve table (schema §1.2).
const EASE = {
  G02: 'E-DEFAULT', G03: 'E-DEFAULT', G04: 'E-DEFAULT', G05: 'E-DEFAULT',
  G07: 'E-DEFAULT', G09: 'E-DEFAULT', H04: 'E-DEFAULT', I02: 'E-DEFAULT',
  I09: 'E-DEFAULT', I11: 'E-DEFAULT', I13: 'E-DEFAULT', J02: 'E-DEFAULT',
  J04: 'E-DEFAULT', J05: 'E-DEFAULT', J11: 'E-DEFAULT', J14: 'E-HERO',
};
for (const [b, v] of Object.entries(EASE))
  set(b, 'spring_or_easing', v, `token binding per schema §1.2 (07 §13.2 three-curve canon); displaced-duration row`);

// ---------------------------------------------------------------- J11 residual fields
set('J11', 'micro_anticipation', STILL, 'easing identifier was illegal in this column (schema §2.3)');
set('J11', 'overlap_ms', '0',      'NONE is illegal in a typed numeric field (schema §2.4)');

// ---------------------------------------------------------------- motion_path
set('F01', 'motion_path', 'NONE',        '`0` is not a vocabulary value');
set('I06', 'motion_path', 'ARC-QUADRATIC', 'normalise to the controlled vocabulary; I06 is the only beat permitted an arc (architecture §6.4)');

// ---------------------------------------------------------------- modifier coherence (schema §3.2)
// Authority: G04 = straight occluded pass-through (07:1081, PLANE-BEHIND-DEVICE);
//            I13 = straight vertical slot translate (07:1220, 07 §38.4 translate-only).
set('G04', 'premium_modifier_2', 'straight occluded pass-through behind the device frame', 'modifier implied a curve; authority prescribes a straight pass-through. motion_path stays NONE');
set('I13', 'premium_modifier_3', 'straight vertical slot translate, out-UP then in-BELOW', 'modifier said "path tracing"; 07 §38.4 permits transform:translate on .phone-frame-slot only. motion_path stays NONE');

// ---------------------------------------------------------------- local_focus_scale
set('J05', 'local_focus_scale', 'NONE', 'a semantic-id list is illegal in a scale field (schema §2.2); J05 has no local focus');
set('J07', 'local_focus_scale', 'NONE', 'lowercase null sentinel is illegal; uppercase NONE only');
set('J09', 'local_focus_scale', 'NONE', 'a semantic-id list is illegal in a scale field; J09 is a spatial move to the periphery');
set('J10', 'local_focus_scale', 'NONE', 'lowercase null sentinel is illegal');
set('J11', 'local_focus_scale', 'NONE', 'lowercase null sentinel is illegal');

// ---------------------------------------------------------------- shared_element_id
const FIVE = 'physical.bolsa warranty.ps5 birthday.event finance.supermarket_movement person.juli';
const IDX = {
  E03: ['asset.ps5.documents', '07:56; blueprint SE-10 E03->E04'],
  E04: ['asset.ps5.documents', '07:57 "asset.ps5.documents -> homecloud.file"'],
  H07: ['none',             '07:81 shared_element="none - explicitly rejected"; SE-15 is a deliberate negative entry'],
  J05: ['message.old_household message.technician', '07:103; blueprint SE-04/SE-05 both terminate at J05'],
  J07: ['none',             '07:105 shared_element=none'],
  J09: [FIVE,               '07:107 "the five elements"'],
  J10: [FIVE,               '07:108 "the five elements"'],
  J11: [FIVE,               '07:109 recession covers frame + five elements + line (map.end_geometry)'],
};
for (const [b, [v, w]] of Object.entries(IDX)) set(b, 'shared_element_id', v, `prose was illegal in an id field (schema §2.2); ${w}`);

// ---------------------------------------------------------------- stable_hold
// Canonical 12 protected beats: blueprint §9.1; architecture §4.4 (184-188);
// checklist 1.4.4. HOLD itself stays a property of all 111 beats -- the COUNT of 12 is unchanged.
const PROTECTED = new Set(['A01','A06','A07','A12','B20','B21','F01','H05','I06','J01','J07','J14']);
for (const r of D) {
  const want = PROTECTED.has(r[0]) ? 'YES_HOLD_INDEFINITE' : 'YES';
  if (r[col('stable_hold')] !== want)
    set(r[0], 'stable_hold', want, 'canonical 12 protected HOLD beats (blueprint §9.1; architecture §4.4; checklist 1.4.4)');
}

// ---------------------------------------------------------------- serialise
const q = (v) => '"' + String(v).replace(/"/g, '""') + '"';
const out = [H, ...D].map(r => r.map(q).join(',')).join('\r\n') + '\r\n';
writeFileSync(MAP, out, 'utf8');

// ---------------------------------------------------------------- derivation log
const L = [];
L.push('# Session 8.1 - Cinematic Enhancement Map repair log');
L.push('');
L.push('Generated by `audit/runtime/session-08-hardening/repair-map.mjs`. Audit-only.');
L.push('Every value below was re-derived from authority. No cell was mechanically shifted.');
L.push('Schema contract: `audit/08_CINEMATIC_MAP_SCHEMA.md`.');
L.push('');
L.push(`Total cell changes: **${REPAIRS.length}** across **${new Set(REPAIRS.map(r=>r.beat)).size}** beats.`);
L.push('');
const fields = [...new Set(REPAIRS.map(r => r.field))];
for (const f of fields) {
  L.push(`## \`${f}\``);
  L.push('');
  L.push('| beat | before | after | authority |');
  L.push('|---|---|---|---|');
  for (const r of REPAIRS.filter(x => x.field === f))
    L.push(`| \`${r.beat}\` | \`${r.before}\` | \`${r.after}\` | ${r.why} |`);
  L.push('');
}
writeFileSync(`${ROOT}/audit/runtime/session-08-hardening/repair-log.md`, L.join('\n'), 'utf8');

console.log(`REPAIRS APPLIED : ${REPAIRS.length}`);
console.log(`BEATS TOUCHED   : ${new Set(REPAIRS.map(r=>r.beat)).size}`);
console.log(`FIELDS          : ${fields.join(', ')}`);
console.log('');
for (const f of fields) console.log(`  ${f.padEnd(22)} ${REPAIRS.filter(x=>x.field===f).length}`);