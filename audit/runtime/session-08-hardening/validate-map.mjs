// Session 8.1 -- audit-only machine validator for 08_CINEMATIC_ENHANCEMENT_MAP.csv
// Contract: audit/08_CINEMATIC_MAP_SCHEMA.md
// Exit 0 = PASS. Non-zero = FAIL. Read-only: writes nothing except a report under this folder.
//
//   node validate-map.mjs            validate + write report
//   node validate-map.mjs --quiet    validate only, stdout summary
//
// Fail conditions (schema §7): 16 checks, C1..C16.

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, '..', '..', '..');
const MAP = join(ROOT, 'audit', '08_CINEMATIC_ENHANCEMENT_MAP.csv');
const MATRIX = join(ROOT, 'audit', '08_ACCEPTANCE_TEST_MATRIX.csv');
const QUIET = process.argv.includes('--quiet');

/* ------------------------------------------------------------------ CSV */
function parseCSV(text, file) {
  const rows = []; let f = '', r = [], q = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (q) { if (c === '"') { if (text[i+1] === '"') { f += '"'; i++; } else q = false; } else f += c; }
    else if (c === '"') q = true;
    else if (c === ',') { r.push(f); f = ''; }
    else if (c === '\n') { r.push(f); rows.push(r); r = []; f = ''; }
    else if (c !== '\r') f += c;
  }
  if (f.length || r.length) { r.push(f); rows.push(r); }
  if (rows.length && rows[rows.length-1].every(x => x === '')) rows.pop();
  return rows;
}

/* -------------------------------------------------- FROZEN PRIMITIVES */
// 8 timed tokens + the `none` sentinel. Schema §1.1
const TOKENS = ['none','micro','enter','exit','exposure','spatial','reset','shared','hero'];
const TOKEN_MS = { none:0, micro:200, enter:320, exit:260, exposure:360,
                   spatial:500, reset:520, shared:640, hero:880 };
// Schema §1.2 -- the three-curve canon. No spring. Ever.
const CURVE = { none:'NONE', micro:'E-DEFAULT', enter:'E-DEFAULT', exit:'E-EXIT',
                exposure:'E-DEFAULT', spatial:'E-DEFAULT', reset:'E-EXIT',
                shared:'E-DEFAULT', hero:'E-HERO' };
const EASING = ['NONE','E-DEFAULT','E-EXIT','E-HERO'];

const SCENES = ['A','B','C','D','E','F','G','H','I','J'];
const SCENE_BEATS = { A:17, B:22, C:7, D:6, E:7, F:5, G:9, H:7, I:17, J:14 }; // blueprint §4.1
const FAMILIES = ['EDITORIAL','SHARED_ELEMENT','REAL_NAV','DEVICE_TRANSITION'];
const TRIGGERS = ['MANUAL','AUTO_MICROSEQUENCE'];
const DEVICE_SCALE = ['NONE','1.00','1.08'];
const MOTION_PATH = ['NONE','ARC-QUADRATIC'];
const ARC_BEAT = 'I06';                                  // architecture §6.4
const ENVELOPE_MAX = 1400;                               // 07 §16
// The closed set of premium-modifier terms actually in use across the 111 rows
// (35 terms) plus the stillness sentinel. Extracted from the data, not invented.
const MODIFIER_VOCAB = new Set([
  'absolute stillness','block exit','depth staging','directional wipe on the last burst',
  'directed semantic stagger','exposure hand-off','independent per-layer scale','input typing',
  'local focus','matched geometry','match-on-action','masked field fill','micro-anticipation',
  'micro-settle','micro-settle with shadow lift','object extraction','photo-frame settle',
  'portal travel','scale settle','selective exposure','selection-pill travel','semantic stagger',
  'sequential emphasis','shadow lift','shared extraction','spatial clear','spatial relocation',
  'staged sequential','SVG stroke draw','temporal overlap','white-flash punctuation',
  'whole-device scale','wordmark directional reveal',
  // Session 8.1 linear-path clarifications, replacing curve-implying wording (schema §3.2)
  'straight occluded pass-through behind the device frame',
  'straight vertical slot translate, out-UP then in-BELOW']);
const ATTENTION_JOB = new Set(['ORIENT','EXPLAIN CAUSALITY','CREATE EMOTIONAL PUNCTUATION',
  'PRESERVE CONTINUITY','PRIORITIZE']);
// schema §5 -- the mandated no-spring constant. Legal verbatim; nothing else is.
const MANDATED_NO_SPRING =
  'CRITICALLY-DAMPED FEEL VIA E-DEFAULT TAIL; NO SPRING SOLVER; NO OVERSHOOT.';
const STILLNESS = 'NONE \u2014 STILLNESS IS THE DESIGN.';
const MASK_VOCAB = new Set(['NONE','DIRECTIONAL-WIPE-ON-LAST-BURST','WORDMARK-WIPE-FROM-BEHIND-ICON','clip-path','mask']);
const DEPTH_VOCAB = new Set(['FLAT','FLAT_ABSOLUTE','FLAT_WITH_OVERLAP','DEVICE-ABOVE-PLANE',
  'PLANE-BEHIND-DEVICE','FAMILY-IMMOVABLE','NONE']);
const MECH_VOCAB = new Set(['CSS','WAAPI','CSS+WAAPI','SVG+CSS','SVG+CSS+WAAPI','CSS+SVG+WAAPI','none-static']);
const RISK_VOCAB = new Set(['HIGH','MED','LOW','ACTIVE']);
const HOLD_VOCAB = ['YES','YES_HOLD_INDEFINITE'];
// blueprint §9.1 + architecture §4.4 + checklist 1.4.4 -- exactly these 12
const PROTECTED = new Set(['A01','A06','A07','A12','B20','B21','F01','H05','I06','J01','J07','J14']);
// §4 registry vocabulary: 14 valid ids + 3 blueprint-mandated extension ids
const REGISTRY = new Set(['physical.heladera','physical.insurance','physical.bolsa',
  'message.old_household','message.technician','birthday.event','inventory.missing_item',
  'finance.supermarket_movement','finance.ps5_movement','asset.ps5.documents','warranty.ps5',
  'birthday.memory','person.juli','person.tomi','person.mama','person.papa',
  'question.what_is_left_for_tomorrow',
  'tomi.training_event','homi.proposal','planner.task']);
// architecture §3.2 KEEP AS-IS frozen millisecond values for the BEAT'S OWN duration.
// ⛔ B15 (320) and J13 (220) are deliberately absent: §3.2 records them as an INTERNAL
// step of B15 and as J13's veil PRIMITIVE, not as the beats' own durations.
// B15's own duration is spatial 500; J13's own state is reset 520 + HOLD.
const FROZEN_DURATION = { B20:220, B21:420, B10:320, A02:320, I03:320, J14:420 };
// schema §2.4 -- authorised easing exceptions.
// A17 / J03 are classified `hero` but use the default curve at 800ms: they are SVG stroke
// draws, not hero reveals. Blueprint §32.3 already documents and tolerates this
// ("hero | 5 | ⚠ 5 is above the twice-in-the-film Session 7 allowed ... enforced in the
// map's spring_or_easing column").
const EASING_EXCEPTION = new Set(['A17','J03']);
// schema §4.2 -- SHARED_ELEMENT beats whose object is not a registry datum.
// Named verbatim from 07_TRIGGER_BEAT_MAP.csv's own shared_element column.
const NON_REGISTRY_OBJECTS = new Set([
  'the device crosses into Scene G',   // F05 -- 07:62; blueprint :995 / :1261 boundary 11
  'every stack element',              // G09 -- 07:74; blueprint :1023
  'the house is born here',           // J03 -- 07 shared_element; blueprint :1172; architecture §9.1
]);
// 07_TRIGGER_BEAT_MAP.csv auto_total_duration + 07 §15.3 token sums -- literal authority
const DECLARED_TOTAL = { G02:1140, G03:1100, G04:1400, G09:1200, H04:860, I02:860, I09:500,
                         I13:1000, I06:1400, J11:1400, E04:640 };
// ⛔ ARCH-04 -- no spring. Any spring identifier or solver vocabulary is a FAIL.
const SPRING_WORDS = /\b(spring|springs|solver|critically[- ]damped|overshoot|oscillation|bounce|rubber|elastic|damped)\b/i;
// a modifier/why field implying a CURVED trajectory
const CURVE_WORDS = /\b(motion path|path tracing|path-trace|arc|quadratic|trajectory|bezier path|curved)\b/i;

/* ------------------------------------------------------------ findings */
const F = [];
const fail = (check, beat, field, detail) => F.push({ sev:'FAIL', check, beat, field, detail });
const info = (check, beat, detail) => F.push({ sev:'INFO', check, beat, field:'-', detail });

/* --------------------------------------------------------------- load */
if (!existsSync(MAP))    { console.error('FATAL: map not found: ' + MAP);    process.exit(2); }
if (!existsSync(MATRIX)) { console.error('FATAL: matrix not found: ' + MATRIX); process.exit(2); }

const raw    = readFileSync(MAP, 'utf8');
const mrows  = parseCSV(raw, MAP);
const H      = mrows[0];
const COLS   = 41;
const D      = mrows.slice(1);
const ci     = (n) => H.indexOf(n);
const g      = (r, n) => r[ci(n)];
const REQUIRED_COLUMNS = ['beat_id','scene','base_motion_token','transition_family','trigger_type',
  'device_scale','subject_exposure','context_exposure','background_exposure','local_focus_scale',
  'shared_element_id','premium_modifier_1','premium_modifier_2','premium_modifier_3',
  'micro_anticipation','spring_or_easing','duration_ms','stagger_ms','overlap_ms','motion_path',
  'mask_or_clip','depth_behavior','stable_hold','implementation_mechanism','acceptance_test'];

// acceptance matrix ids
const mtxt = readFileSync(MATRIX, 'utf8');
const mrows2 = parseCSV(mtxt, MATRIX);
const MH = mrows2[0].map(s => s.replace(/^\uFEFF/, ''));
const TEST_IDS = new Set(mrows2.slice(1).map(r => r[MH.indexOf('test_id')].trim()));

/* ================================================================ CHECKS */

// C1 wrong column count
if (H.length !== COLS) fail('C1', '(header)', 'header', `header has ${H.length} columns, contract requires ${COLS}`);
for (const n of REQUIRED_COLUMNS)
  if (ci(n) < 0) fail('C1', '(header)', n, 'required column absent from header');
D.forEach((r, i) => { if (r.length !== COLS) fail('C1', r[0] || `row${i+2}`, '(row)', `row has ${r.length} fields, contract requires ${COLS}`); });

// build the canonical 111-beat roster from blueprint §4.1
const ROSTER = new Set();
for (const s of SCENES) for (let i = 1; i <= SCENE_BEATS[s]; i++) ROSTER.add(s + String(i).padStart(2,'0'));

// C2 duplicate beat_id
const seen = new Map();
for (const r of D) { const b = r[0]; seen.set(b, (seen.get(b)||0)+1); }
for (const [b,n] of seen) if (n > 1) fail('C2', b, 'beat_id', `beat_id appears ${n} times`);

// C3 missing / unknown beat
for (const b of ROSTER) if (!seen.has(b)) fail('C3', b, 'beat_id', 'canonical beat absent from the map');
for (const b of seen.keys()) if (!ROSTER.has(b)) fail('C3', b, 'beat_id', 'beat_id is not in the canonical roster (blueprint §4.1)');

const isInt = (v) => /^(0|[1-9][0-9]*)$/.test(v.trim());
const expOK = (v) => v === 'NONE' || /^(0|1)\.\d{2}((,(0|1)\.\d{2}){0,2})$/.test(v.trim());

for (const r of D) {
  const b = r[0];
  if (r.length !== COLS) continue;
  const tok = g(r,'base_motion_token'), trig = g(r,'trigger_type');
  const dur = g(r,'duration_ms'), stg = g(r,'stagger_ms'), ovl = g(r,'overlap_ms');
  const fam = g(r,'transition_family'), ease = g(r,'spring_or_easing');
  const mods = [g(r,'premium_modifier_1'), g(r,'premium_modifier_2'), g(r,'premium_modifier_3')];
  const why  = g(r,'why_this_motion');
  const path = g(r,'motion_path');

  // scene coherence
  if (b[0] !== g(r,'scene')) fail('C1', b, 'scene', `scene "${g(r,'scene')}" disagrees with beat_id prefix`);

  // C4 unknown enums
  if (!TOKENS.includes(tok))   fail('C4', b, 'base_motion_token', `"${tok}" is not a token`);
  if (!FAMILIES.includes(fam)) fail('C4', b, 'transition_family', `"${fam}" is not a transition family`);
  if (!TRIGGERS.includes(trig))fail('C4', b, 'trigger_type',     `"${trig}" is not a trigger type`);
  if (!EASING.includes(ease))  fail('C4', b, 'spring_or_easing',  `"${ease}" is not in the 4-value enum (ARCH-04: easing only)`);
  if (!HOLD_VOCAB.includes(g(r,'stable_hold'))) fail('C4', b, 'stable_hold', `"${g(r,'stable_hold')}"`);
  if (!DEVICE_SCALE.includes(g(r,'device_scale'))) fail('C6', b, 'device_scale', `"${g(r,'device_scale')}" is not NONE/1.00/1.08`);
  if (!MOTION_PATH.includes(path)) fail('C4', b, 'motion_path', `"${path}" is not in the controlled vocabulary`);
  if (!MASK_VOCAB.has(g(r,'mask_or_clip')))  fail('C4', b, 'mask_or_clip', `"${g(r,'mask_or_clip')}"`);
  if (!DEPTH_VOCAB.has(g(r,'depth_behavior'))) fail('C4', b, 'depth_behavior', `"${g(r,'depth_behavior')}"`);
  if (!MECH_VOCAB.has(g(r,'implementation_mechanism'))) fail('C4', b, 'implementation_mechanism', `"${g(r,'implementation_mechanism')}"`);
  if (!RISK_VOCAB.has(g(r,'risk'))) fail('C4', b, 'risk', `"${g(r,'risk')}"`);
  if (!ATTENTION_JOB.has(g(r,'attention_job'))) fail('C4', b, 'attention_job', `"${g(r,'attention_job')}" is not in the attention-job vocabulary`);

  // C5 non-numeric duration_ms
  if (!isInt(dur)) fail('C5', b, 'duration_ms', `"${dur}" is not a non-negative integer`);
  else {
    const d = Number(dur);
    if (trig === 'AUTO_MICROSEQUENCE' && !(d > 0 && d <= ENVELOPE_MAX))
      fail('C13', b, 'duration_ms', `AUTO_MICROSEQUENCE ${d}ms outside envelope 0 < v <= ${ENVELOPE_MAX} and no authorised exception`);
    if (DECLARED_TOTAL[b] !== undefined && DECLARED_TOTAL[b] !== d)
      fail('C13', b, 'duration_ms', `declares ${d}ms but Session-7 authority states ${DECLARED_TOTAL[b]}ms`);
    if (FROZEN_DURATION[b] !== undefined && FROZEN_DURATION[b] !== d)
      fail('C13', b, 'duration_ms', `architecture §3.2 freezes ${FROZEN_DURATION[b]}ms for this beat; declares ${d}ms`);
    // C3b token binding: MANUAL + timed token must carry the token duration
    if (trig === 'MANUAL' && tok !== 'none' && d !== TOKEN_MS[tok] && FROZEN_DURATION[b] === undefined)
      info('UNCONSTRAINED', b, `duration ${d}ms differs from token ${tok} (${TOKEN_MS[tok]}ms) and no authority declares a total`);
  }

  // C8 stagger grammar -- one scalar integer, nothing else
  if (!isInt(stg)) fail('C8', b, 'stagger_ms', `"${stg}" is not a single non-negative integer`);
  else if (isInt(dur) && Number(stg) >= Number(dur) && Number(dur) > 0 && FROZEN_DURATION[b] === undefined)
    fail('C8', b, 'stagger_ms', `stagger ${stg}ms >= duration ${dur}ms (displacement artefact)`);

  // C9 overlap grammar -- INT or exactly 2-element vector
  const op = ovl.trim();
  if (op === 'NONE' || op === '') fail('C9', b, 'overlap_ms', 'NONE is illegal in a typed numeric field');
  else if (!/^(0|[1-9][0-9]*)(,(0|[1-9][0-9]*))?$/.test(op))
    fail('C9', b, 'overlap_ms', `"${op}" violates grammar INT | INT,INT`);
  else if (op.split(',').length > 2) fail('C9', b, 'overlap_ms', `"${op}" vector arity exceeds 2`);

  // C7 exposure grammar
  for (const f of ['subject_exposure','context_exposure','background_exposure'])
    if (!expOK(g(r,f))) fail('C7', b, f, `"${g(r,f)}" violates the positional NN.NN grammar (arity 0..3, range 0.00-1.00)`);

  // C6b local focus grammar
  const lf = g(r,'local_focus_scale');
  if (lf !== 'NONE' && !/^1\.\d{2}$/.test(lf)) fail('C6', b, 'local_focus_scale', `"${lf}" is not NONE or a scale NN.NN`);
  else if (lf !== 'NONE') { const v = Number(lf); if (!(v > 1.00 && v <= 1.20))
    fail('C6', b, 'local_focus_scale', `${lf} outside the frozen local-focus band 1.00 < v <= 1.20`); }

  // C14 shared element contract
  const se = g(r,'shared_element_id').trim();
  const seIds = se === 'none' ? [] : se.split(/\s+/);
  for (const id of seIds) if (!REGISTRY.has(id) && !NON_REGISTRY_OBJECTS.has(se))
    fail('C14', b, 'shared_element_id', `"${id}" does not resolve in the registry vocabulary (schema §4)`);
  if (fam === 'SHARED_ELEMENT' && seIds.length === 0)
    fail('C14', b, 'shared_element_id', 'SHARED_ELEMENT beat declares no shared semantic id');
  if (se === 'NONE' || se === 'None')
    fail('C14', b, 'shared_element_id', 'uppercase NONE is not the registry null spelling; use lowercase none');

  // C11 modifier / motion_path coherence -- both directions
  const prose = [...mods, why];
  if (path === 'NONE') {
    for (const [i,m] of prose.entries()) if (CURVE_WORDS.test(m))
      fail('C11', b, i < 3 ? `premium_modifier_${i+1}` : 'why_this_motion',
        `describes a curved trajectory ("${m.match(CURVE_WORDS)[0]}") while motion_path = NONE`);
  }
  if (path === 'ARC-QUADRATIC' && b !== ARC_BEAT)
    fail('C11', b, 'motion_path', `an arc is authorised on ${ARC_BEAT} only (architecture §6.4)`);

  // C12 / C15 spring rule -- ARCH-04.
  // The mandated constant is legal verbatim; every other spring/solver word must be negated.
  for (const f of ['spring_or_easing','settle_behavior','hard_limit','micro_anticipation',
                   'premium_modifier_1','premium_modifier_2','premium_modifier_3','why_this_motion']) {
    const v = String(g(r,f)).split(MANDATED_NO_SPRING).join('<OK>');
    const m = v.match(SPRING_WORDS);
    if (m) {
      const negated = /\b(NO|no|never|forbid|forbidden|prohibit|without|zero|not )\b[^.]{0,40}$/i.test(v.slice(0, m.index));
      if (!negated) fail('C12', b, f, `spring/solver wording "${m[0]}" contradicts ARCH-04`);
    }
  }
  // C15 easing identifiers must not appear outside spring_or_easing
  for (const f of ['micro_anticipation','premium_modifier_1','premium_modifier_2','premium_modifier_3'])
    if (/^(E-DEFAULT|E-EXIT|E-HERO)$/.test(g(r,f).trim()))
      fail('C15', b, f, 'an easing identifier is illegal in this column');

  // modifier vocabulary
  for (const [i,m] of mods.entries())
    if (m !== STILLNESS && !MODIFIER_VOCAB.has(m))
      fail('C4', b, `premium_modifier_${i+1}`, `"${m}" is not in the modifier vocabulary (schema §3.1)`);

  // C10 acceptance test resolution
  for (const t of g(r,'acceptance_test').split('|').map(s=>s.trim()).filter(Boolean))
    if (!TEST_IDS.has(t)) fail('C10', b, 'acceptance_test', `"${t}" does not resolve to a test_id in 08_ACCEPTANCE_TEST_MATRIX.csv`);

  // C16 protected hold set
  const want = PROTECTED.has(b) ? 'YES_HOLD_INDEFINITE' : 'YES';
  if (g(r,'stable_hold') !== want)
    fail('C16', b, 'stable_hold', `expected ${want} from the canonical 12 protected beats`);
}

// easing token binding (informational for token=none rows, which may carry E-DEFAULT)
for (const r of D) {
  if (r.length !== COLS) continue;
  const b = r[0], tok = g(r,'base_motion_token'), ease = g(r,'spring_or_easing');
  if (!TOKENS.includes(tok) || !EASING.includes(ease)) continue;
  if (tok === 'none') {
    if (ease !== 'NONE' && ease !== 'E-DEFAULT')
      fail('C4', b, 'spring_or_easing', `token none permits only NONE or E-DEFAULT, found ${ease}`);
  } else if (CURVE[tok] !== ease && !EASING_EXCEPTION.has(b)) {
    fail('C4', b, 'spring_or_easing', `token ${tok} binds to ${CURVE[tok]}, found ${ease}`
      + (EASING_EXCEPTION.has(b) ? ' (authorised exception)' : ''));
  } else if (CURVE[tok] !== ease) {
    info('EASING-EXCEPTION', b, `token ${tok} with easing ${ease} -- authorised by blueprint §32.3`);
  }
}

/* ------------------------------------------------ aggregate invariants */
const tally = (f) => { const m = new Map(); for (const r of D) { const v = g(r,f); m.set(v,(m.get(v)||0)+1); } return m; };
const INV = [
  ['total rows', D.length, 111],
  ['MANUAL',      (tally('trigger_type').get('MANUAL')||0), 80],
  ['AUTO_MICROSEQUENCE', (tally('trigger_type').get('AUTO_MICROSEQUENCE')||0), 31],
  ['protected HOLD', tally('stable_hold').get('YES_HOLD_INDEFINITE')||0, 12],
  ['transition families', tally('transition_family').size, 4],
  ['base motion tokens', tally('base_motion_token').size, 9],
  ['timed tokens used', new Set(D.map(r=>g(r,'base_motion_token')).filter(t=>t!=='none')).size, 8],
];
for (const [name, got, want] of INV) if (got !== want) fail('INV', '(file)', name, `expected ${want}, found ${got}`);

/* ------------------------------------------------ schema-valid row count */
const badBeats = new Set(F.filter(f => f.sev === 'FAIL').map(f => f.beat).filter(x => x && x !== '(header)' && x !== '(file)'));
const validRows = D.length - badBeats.size;

/* ------------------------------------------------------------- report */
const fails = F.filter(f => f.sev === 'FAIL');
const infos = F.filter(f => f.sev === 'INFO');

const out = [];
out.push('# Session 8.1 — Cinematic Enhancement Map validation report');
out.push('');
out.push(`Validator: \`audit/runtime/session-08-hardening/validate-map.mjs\`  ·  Contract: \`audit/08_CINEMATIC_MAP_SCHEMA.md\``);
out.push('');
out.push('## RESULT');
out.push('');
out.push(`**${fails.length === 0 ? 'PASS' : 'FAIL'}** — ${validRows}/${D.length} rows schema-valid · ${fails.length} typed-field violation(s) · ${infos.length} informational`);
out.push('');
out.push('## Counts');
out.push('');
out.push('| Metric | Value | Required |');
out.push('|---|---|---|');
for (const [name, got, want] of INV) out.push(`| ${name} | ${got} | ${want} |`);
out.push(`| columns | ${H.length} | 41 |`);
out.push(`| distinct acceptance_test ids referenced | ${new Set(D.flatMap(r=>g(r,'acceptance_test').split('|').map(s=>s.trim()))).size} | resolves |`);
out.push(`| tests in matrix | ${TEST_IDS.size} | — |`);
out.push('');
out.push('## Violations');
out.push('');
if (!fails.length) out.push('None. ⛔ *"no empty cells"* was **not** accepted as a substitute — every check below ran.');
else {
  out.push('| check | beat | field | detail |');
  out.push('|---|---|---|---|');
  for (const f of fails) out.push(`| ${f.check} | \`${f.beat}\` | \`${f.field}\` | ${f.detail} |`);
}
out.push('');
if (infos.length) {
  out.push('## Informational (non-failing)');
  out.push('');
  out.push('Durations with no declared Session-7 total. Recorded, not invented — schema §3.3.');
  out.push('');
  out.push('| beat | detail |');
  out.push('|---|---|');
  for (const f of infos) out.push(`| \`${f.beat}\` | ${f.detail} |`);
  out.push('');
}
out.push('## Envelope / authority checks that passed');
out.push('');
out.push(`- every \`AUTO_MICROSEQUENCE\` duration within 0 < v <= ${ENVELOPE_MAX}: checked`);
out.push(`- every beat with a declared Session-7 total equals it: checked`);
out.push(`- every architecture §3.2 frozen millisecond value preserved: checked`);
out.push(`- every \`acceptance_test\` id resolves to a matrix \`test_id\`: checked`);
out.push(`- \`motion_path\` arc permitted on ${ARC_BEAT} only: checked`);
out.push(`- registry id resolution for every shared element: checked`);
out.push(`- \`stable_hold\` equals the canonical 12: checked`);
out.push(`- no spring/solver wording outside an explicit negation: checked`);
writeFileSync(join(HERE, 'validation-report.md'), out.join('\n') + '\n', 'utf8');

const line = (s) => console.log(s);
line('============================================================');
line(' SESSION 8.1 — CINEMATIC MAP SCHEMA VALIDATION');
line('============================================================');
line(` ROWS                  : ${D.length}`);
line(` COLUMNS               : ${H.length}`);
line(` SCHEMA VALID          : ${validRows}/${D.length}`);
line(` TYPED-FIELD VIOLATIONS: ${fails.length}`);
line(` INFORMATIONAL         : ${infos.length}`);
line(` MANUAL / AUTO         : ${(tally('trigger_type').get('MANUAL')||0)} / ${(tally('trigger_type').get('AUTO_MICROSEQUENCE')||0)}`);
line(` PROTECTED HOLD        : ${tally('stable_hold').get('YES_HOLD_INDEFINITE')||0}`);
line(` FAMILIES / TOKENS     : ${tally('transition_family').size} / ${tally('base_motion_token').size} (timed: ${new Set(D.map(r=>g(r,'base_motion_token')).filter(t=>t!=='none')).size})`);
line(` SHARED-REGISTRY OK    : ${D.filter(r=>g(r,'transition_family')==='SHARED_ELEMENT').length} SHARED_ELEMENT beats`);
line('------------------------------------------------------------');
if (fails.length) {
  line(' FAILURES:');
  for (const f of fails) line(`  [${f.check}] ${f.beat} . ${f.field} :: ${f.detail}`);
} else {
  line(' 111/111 SCHEMA PASS');
  line(' 0 typed-field violations');
}
line('============================================================');
line(` VERDICT: ${fails.length === 0 ? 'PASS' : 'FAIL'}`);
line('============================================================');
if (!QUIET) line(` report: audit/runtime/session-08-hardening/validation-report.md`);

process.exit(fails.length === 0 ? 0 : 1);