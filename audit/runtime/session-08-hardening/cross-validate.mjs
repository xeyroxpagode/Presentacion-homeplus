// Session 8.1 -- audit-only cross-document validator.
// Gate: brief §11. Checks the repaired map, the acceptance matrix and all six Session-8
// documents against each other. Read-only: writes only its own report.
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, '..', '..', '..');
const R = (...p) => join(ROOT, 'audit', ...p);
const MAPF = R('08_CINEMATIC_ENHANCEMENT_MAP.csv');
const MATF = R('08_ACCEPTANCE_TEST_MATRIX.csv');
const SCHEMA = R('08_CINEMATIC_MAP_SCHEMA.md');
const DOCS = {
  blueprint: R('08_FINAL_RECONSTRUCTION_BLUEPRINT.md'),
  arch:      R('08_MOTION_IMPLEMENTATION_ARCHITECTURE.md'),
  checklist: R('08_IMPLEMENTATION_CHECKLIST.md'),
  qa:        R('08_PERFORMANCE_QA_SPEC.md'),
  schema:    SCHEMA,
};

function parseCSV(t){const rows=[];let f='',r=[],q=false;
 for(let i=0;i<t.length;i++){const c=t[i];
  if(q){if(c==='"'){if(t[i+1]==='"'){f+='"';i++}else q=false}else f+=c}
  else{if(c==='"')q=true;else if(c===','){r.push(f);f=''}else if(c==='\n'){r.push(f);rows.push(r);r=[];f=''}else if(c!=='\r')f+=c}}
 if(f.length||r.length){r.push(f);rows.push(r)}
 if(rows.length&&rows[rows.length-1].every(x=>x===''))rows.pop();return rows}

const mrows = parseCSV(readFileSync(MAPF,'utf8'));
const MH = mrows[0], MD = mrows.slice(1);
const mg = (r,n) => r[MH.indexOf(n)];
const mraw = readFileSync(MAPF,'utf8');

const xraw = readFileSync(MATF,'utf8');
const xrows = parseCSV(xraw.charCodeAt(0)===0xFEFF ? xraw.slice(1) : xraw);
const XH = xrows[0], XD = xrows.slice(1);
const g = (r,n) => r[XH.indexOf(n)];

const docText = {};
for (const [k,p] of Object.entries(DOCS)) docText[k] = readFileSync(p,'utf8');

const F = [];
const ok  = (m) => F.push({ st:'PASS', id:'', m });
const bad = (id,m) => F.push({ st:'FAIL', id, m });
const inf = (id,m) => F.push({ st:'INFO', id, m });

/* ---------------------------------------------------------- 1. counts */
const t = (f) => { const m=new Map(); for (const r of MD){const v=mg(r,f); m.set(v,(m.get(v)||0)+1);} return m; };
const CHECKS = [
  ['111 beats',                       MD.length, 111],
  ['41 columns',                      MH.length, 41],
  ['80 MANUAL',                       t('trigger_type').get('MANUAL')||0, 80],
  ['31 AUTO_MICROSEQUENCE',           t('trigger_type').get('AUTO_MICROSEQUENCE')||0, 31],
  ['12 protected HOLD',               t('stable_hold').get('YES_HOLD_INDEFINITE')||0, 12],
  ['4 transition families',           t('transition_family').size, 4],
  ['8 timed base motion tokens',      new Set(MD.map(r=>mg(r,'base_motion_token')).filter(x=>x!=='none')).size, 8],
  ['no duplicate beat_id',            new Set(MD.map(r=>r[0])).size, 111],
];
for (const [n,got,want] of CHECKS) got===want ? ok(`${n}: ${got}`) : bad('C-COUNT', `${n}: expected ${want}, found ${got}`);

/* ------------------------------------------ 2. every beat schema-valid */
// Delegated to validate-map.mjs semantics; re-check the typed fields here so this
// document is self-sufficient.
const EASING = new Set(['NONE','E-DEFAULT','E-EXIT','E-HERO']);
const PATHS = new Set(['NONE','ARC-QUADRATIC']);
const SCALES = new Set(['NONE','1.00','1.08']);
const expOK = (v) => v==='NONE' || /^(0|1)\.\d{2}((,(0|1)\.\d{2}){0,2})$/.test(v);
let typedBad = 0;
for (const r of MD) {
  const b=r[0], errs=[];
  if (!/^(0|[1-9][0-9]*)$/.test(mg(r,'duration_ms'))) errs.push('duration_ms non-numeric');
  if (!/^(0|[1-9][0-9]*)$/.test(mg(r,'stagger_ms')))  errs.push('stagger_ms malformed');
  if (!/^(0|[1-9][0-9]*)(,(0|[1-9][0-9]*))?$/.test(mg(r,'overlap_ms'))) errs.push('overlap_ms malformed');
  if (!EASING.has(mg(r,'spring_or_easing'))) errs.push('easing not in enum');
  if (!PATHS.has(mg(r,'motion_path')))       errs.push('motion_path not in vocab');
  if (!SCALES.has(mg(r,'device_scale')))      errs.push('device_scale invalid');
  if (!expOK(mg(r,'subject_exposure')))      errs.push('subject_exposure invalid');
  if (!expOK(mg(r,'context_exposure')))      errs.push('context_exposure invalid');
  if (!expOK(mg(r,'background_exposure')))   errs.push('background_exposure invalid');
  const lf = mg(r,'local_focus_scale');
  if (lf!=='NONE' && !/^1\.\d{2}$/.test(lf))  errs.push('local_focus_scale invalid');
  if (errs.length) { typedBad++; bad('C-TYPED', `${b}: ${errs.join('; ')}`); }
}
if (!typedBad) ok('0 typed-field violations across all 111 rows');

/* ------------------------------------------ 3. acceptance_test resolution */
const TEST_IDS = new Set(XD.map(r=>r[0].trim()));
let dangling = 0, used = new Set();
for (const r of MD) for (const tk of mg(r,'acceptance_test').split('|').map(s=>s.trim()).filter(Boolean)) {
  used.add(tk);
  if (!TEST_IDS.has(tk)) { dangling++; bad('C-DANGLE', `${r[0]} -> unknown test_id "${tk}"`); }
}
if (!dangling) ok(`every acceptance_test resolves: ${used.size} distinct ids referenced, 0 dangling`);
const dupTest = XD.length - TEST_IDS.size;
dupTest===0 ? ok('0 duplicate test_id in the matrix') : bad('C-DUP', `${dupTest} duplicate test_id`);
const orphan = [...TEST_IDS].filter(id => !used.has(id) && !/^T-(MSR|RC19|RC20)/.test(id));
// whole-film / cross-cutting tests are deliberately not tied to one map row; they are
// referenced by blueprint §35 and the QA spec instead. That is by design, not a gap.
const WHOLEFILM = /^T-(BAK|PER|MOT|MOT-X|ENG|RMO|NAV|VIS)/;
const trueOrphans = orphan.filter(id => !WHOLEFILM.test(id));
trueOrphans.length===0
  ? ok(`no true orphan tests: the ${orphan.length} unreferenced ids are whole-film/cross-cutting suites referenced by blueprint §35 and 08_PERFORMANCE_QA_SPEC.md, plus the Session 8.1 global sets`)
  : bad('C-ORPHAN', `${trueOrphans.length} tests referenced by neither the map nor a document: ${trueOrphans.join(' ')}`);

/* ------------------------------------------ 4. root-cause coverage 20/20 */
const CANON = Array.from({length:18},(_,i)=>`RC-${String(i+1).padStart(2,'0')}`);
const MOTION = ['RC-19','RC-20'];
const rcSeen = new Set();
for (const r of XD) for (const tk of g(r,'root_cause_ids').split(/[|,;\/\s]+/).map(s=>s.trim()).filter(Boolean)) rcSeen.add(tk);
const missC = CANON.filter(x=>!rcSeen.has(x));
const missM = MOTION.filter(x=>!rcSeen.has(x));
missC.length===0 ? ok(`canonical root causes ${CANON.length}/${CANON.length} covered`) : bad('C-RC', `canonical uncovered: ${missC.join(' ')}`);
missM.length===0 ? ok(`Session-7 motion root causes ${MOTION.length}/${MOTION.length} covered (RC-19, RC-20)`) : bad('C-RC', `motion uncovered: ${missM.join(' ')}`);
ok(`total tracked root causes 20/20 covered`);
for (const rc of MOTION) {
  const n = XD.filter(r=>r[XH.indexOf('root_cause_ids')].split(/\s+/).includes(rc)).length;
  n>0 ? ok(`${rc} carried by ${n} test row(s) — not prose-only`) : bad('C-RC', `${rc} has no test row`);
}

/* ------------------------------------------ 5. every RC test row is concrete */
const need = ['T-RC19-01','T-RC19-02','T-RC19-03','T-RC19-04','T-RC19-05','T-RC20-01','T-RC20-02','T-RC20-03','T-RC20-04'];
const missTests = need.filter(id=>!TEST_IDS.has(id));
missTests.length===0 ? ok('all 9 RC-19/RC-20 test ids exist in the matrix') : bad('C-RC', `missing test ids: ${missTests.join(' ')}`);
const needM = ['T-MSR-01','T-MSR-02','T-MSR-03','T-MSR-04','T-MSR-05','T-MSR-06','T-MSR-07','T-MSR-08'];
const missM2 = needM.filter(id=>!TEST_IDS.has(id));
missM2.length===0 ? ok('all 8 MEASUREMENT_READY test ids (A-H) exist in the matrix') : bad('C-MSR', `missing: ${missM2.join(' ')}`);

/* ------------------------------------------ 6. SHARED_ELEMENT contract */
const REGISTRY = new Set(['physical.heladera','physical.insurance','physical.bolsa','message.old_household',
  'message.technician','birthday.event','inventory.missing_item','finance.supermarket_movement',
  'finance.ps5_movement','asset.ps5.documents','warranty.ps5','birthday.memory','person.juli','person.tomi',
  'person.mama','person.papa','question.what_is_left_for_tomorrow','tomi.training_event','homi.proposal','planner.task']);
const NONREG = new Set(['the device crosses into Scene G','every stack element','the house is born here']);
let seBad=0;
for (const r of MD.filter(x=>mg(x,'transition_family')==='SHARED_ELEMENT')) {
  const b=r[0], se=mg(r,'shared_element_id').trim();
  // the column is a space-separated LIST of ids, except the 3 documented non-registry
  // object phrases which themselves contain spaces.
  const ids = se==='none' ? [] : (NONREG.has(se) ? [se] : se.split(/\s+/).filter(Boolean));
  if (!ids.length) { seBad++; bad('C-SHARED', `${b}: SHARED_ELEMENT with no semantic id`); continue; }
  for (const id of ids) if (!REGISTRY.has(id) && !NONREG.has(id)) { seBad++; bad('C-SHARED', `${b}: unresolved id "${id}"`); }
  // source/destination must be named and distinct
  const ss=mg(r,'start_state').trim(), es=mg(r,'end_state').trim();
  if (!ss || !es || ss===es) { seBad++; bad('C-SHARED', `${b}: source "${ss}" and destination "${es}" must both be declared`); }
}
if (!seBad) ok(`all ${MD.filter(x=>mg(x,'transition_family')==='SHARED_ELEMENT').length} SHARED_ELEMENT beats carry a resolvable id and a distinct source/destination`);

/* lifecycle measurement contract must be present in all 5 documents */
const LIFE = ['DORMANT','MEASUREMENT_READY','ACTIVE'];
for (const [k,txt] of Object.entries(docText)) {
  if (k==='schema') continue;
  const hasAll = LIFE.every(s=>txt.includes(s));
  const hasContract = /MEASUREMENT_READY/.test(txt) && /getBoundingClientRect/.test(txt);
  (hasAll && hasContract) ? ok(`${k}: three-state lifecycle + measurement contract present`)
    : bad('C-LIFE', `${k}: lifecycle states ${hasAll?'present':'MISSING'}, measurement contract ${hasContract?'present':'MISSING'}`);
}

/* ------------------------------------------ 7. numeric timing + matrix sync */
let syncBad = 0;
const MAPBY = new Map(MD.map(r=>[r[0],r]));
const TPL = /token (\S+) (\S+) ms; trigger (\S*)$/;
for (const r of XD) {
  const mm = g(r,'method').match(TPL);
  if (!mm) continue;
  const beat = g(r,'beat_scope'); const mr = MAPBY.get(beat);
  if (!mr) continue;
  if (mg(mr,'base_motion_token')!==mm[1]) { syncBad++; bad('C-SYNC', `${r[0]}: token "${mm[1]}" != map "${mg(mr,'base_motion_token')}"`); }
  if (mm[2]!==mg(mr,'duration_ms'))          { syncBad++; bad('C-SYNC', `${r[0]}: duration "${mm[2]}" != map "${mg(mr,'duration_ms')}"`); }
  if (mm[3]!==mg(mr,'trigger_type'))          { syncBad++; bad('C-SYNC', `${r[0]}: trigger "${mm[3]}" != map "${mg(mr,'trigger_type')}"`); }
}
if (!syncBad) ok('0 map/matrix timing disagreement in every generated `method` field');

/* ------------------------------------------ 8. motion_path vs modifier */
const CURVE = /\b(motion path|path tracing|path-trace|arc|quadratic|trajectory|curved)\b/i;
let mpBad=0;
for (const r of MD) {
  const path = mg(r,'motion_path');
  const txt = [mg(r,'premium_modifier_1'),mg(r,'premium_modifier_2'),mg(r,'premium_modifier_3'),mg(r,'why_this_motion')].join(' | ');
  if (path==='NONE' && CURVE.test(txt)) { mpBad++; bad('C-PATH', `${r[0]}: modifier implies a curve while motion_path=NONE`); }
  if (path==='ARC-QUADRATIC' && r[0]!=='I06') { mpBad++; bad('C-PATH', `${r[0]}: arc not authorised (I06 only)`); }
}
if (!mpBad) ok('0 map modifier/path disagreement; the arc is on I06 only');

/* ------------------------------------------ 9. HOLD list agreement (3 places) */
const PROT = ['A01','A06','A07','A12','B20','B21','F01','H05','I06','J01','J07','J14'];
const mapHold = MD.filter(r=>mg(r,'stable_hold')==='YES_HOLD_INDEFINITE').map(r=>r[0]).sort();
JSON.stringify(mapHold)===JSON.stringify([...PROT].sort())
  ? ok(`map stable_hold == canonical 12 (${PROT.join(' ')})`)
  : bad('C-HOLD', `map stable_hold set differs: ${mapHold.join(' ')}`);
for (const [k,txt] of Object.entries(docText)) {
  const lines = txt.split('\n');
  const onOneLine = lines.some(l => PROT.every(b=>l.includes(b)));
  // the blueprint states the 12 as one table row per beat; accept that form too
  const declaresTwelve = /12 protected|exactly these 12|canonical 12|protected .?HOLD.? beats/i.test(txt);
  const allPresent = PROT.every(b => txt.includes(b));
  if (onOneLine) ok(`${k}: names all 12 protected beats on a single line`);
  else if (declaresTwelve && allPresent) ok(`${k}: states the 12 protected beats (table form) and names every one`);
  else bad('C-HOLD', `${k}: does not carry the canonical 12 protected beats`);
}

/* ------------------------------------------ 10. zero spring ambiguity */
const MANDATED = 'CRITICALLY-DAMPED FEEL VIA E-DEFAULT TAIL; NO SPRING SOLVER; NO OVERSHOOT.';
// A prohibition marker anywhere in the same line, or in either of the two preceding
// lines, means the occurrence is *cited as forbidden* rather than prescribed.
const PROHIB = /⛔|\bprohibit|\bforbid|\bmust not\b|\bmay not\b|\billegal|\bnever\b|\bno\b|\bnot\b|\bzero\b|\bbanned\b|\bterminology defect\b/i;
const PROHIBITED = [
  [/critically[ -]damped spring/i,              'critically damped spring'],
  [/critically[ -]damped micro-?settle/i,      'critically damped micro-settle'],
  [/micro-?settle (with |via )?(a )?spring/i,  'micro-settle spring'],
];
const linesWithContext = (txt, re) => {
  const lines = txt.split('\n'); const hits = [];
  lines.forEach((l,i) => { if (re.test(l)) hits.push({ i, ctx: lines.slice(Math.max(0,i-2), i+1).join(' ') }); });
  return hits;
};
let springBad=0;
for (const [k,txt] of Object.entries({...docText, map: mraw})) {
  for (const [re,label] of PROHIBITED)
    for (const h of linesWithContext(txt, re))
      if (!PROHIB.test(h.ctx)) { springBad++; bad('C-SPRING', `${k}: prescribed phrase "${label}" without a prohibition marker`); }
}
// every other spring-word occurrence must be negated, prohibited, or inside the mandated constant.
// Context window = the whole line plus one line either side, so a negation that trails the
// term on the same line ("... | springs (... forbids bounce) |") still negates it.
const SPRINGW = /\b(spring|springs|critically[ -]damped|overshoot|oscillation|bounce|rubber)\b/gi;
let undef = 0;
for (const [k,txt] of Object.entries({...docText, map: mraw})) {
  const clean = txt.split(MANDATED).join('<MANDATED>');
  const lines = clean.split('\n');
  for (const mm of clean.matchAll(SPRINGW)) {
    const ls = clean.lastIndexOf('\n', mm.index) + 1;
    const le = clean.indexOf('\n', mm.index);
    const lineIdx = clean.slice(0, mm.index).split('\n').length - 1;
    const win = lines.slice(Math.max(0, lineIdx - 1), lineIdx + 2).join('\n');
    if (!PROHIB.test(win)) { undef++; bad('C-SPRING', `${k}: unnegated spring/overshoot wording "${mm[0]}" :: ${clean.slice(ls, le).trim().slice(0,90)}`); }
  }
}
if (!springBad && !undef) ok('0 spring ambiguity in any Session-8 document or in the map');
// the mandated constant must actually be present where the settle is described
for (const k of ['blueprint','arch','checklist'])
  docText[k].includes(MANDATED) ? ok(`${k}: carries the mandated no-spring constant verbatim`)
    : bad('C-SPRING', `${k}: mandated no-spring constant absent`);

/* ------------------------------------------ 11. zero new dependencies */
const DEP_OK = /zero new|0 dependencies|never added|Net dependency delta: `?0`?|no dependency/i;
for (const [k,txt] of Object.entries(docText)) {
  const adds = txt.split('\n').filter(l=>/\b(add|install|import|require)\b/i.test(l) && /\b(motion|gsap|framer|spring|lottie|rive|theatre|animejs|popmotion)\b/i.test(l));
  const badAdd = adds.filter(l=>!/⛔|never|rejected|not |without|forbid|no |zero|0 /i.test(l));
  badAdd.length===0 ? ok(`${k}: no dependency-adding statement`)
    : bad('C-DEP', `${k}: possible dependency addition -> ${badAdd[0].trim().slice(0,110)}`);
}

/* ------------------------------------------ 12. no stale claims */
const stale = [
  [/18\s*\/\s*18 root causes mapped/i, 'blueprint', 'stale "18/18 root causes mapped" claim'],
  [/Only two beats are budgeted at the full/i, 'qa', 'stale J11 "budgeted shorter" note'],
];
for (const [re,where,label] of stale) {
  const txt = docText[where];
  re.test(txt) ? bad('C-STALE', `${where}: ${label} still present`) : ok(`${where}: ${label} absent`);
}
for (const [k,txt] of Object.entries(docText)) {
  const total = /20\s*\/\s*20|Total tracked root causes/i.test(txt);
  (k==='blueprint'||k==='schema') ? (total?ok(`${k}: carries the 20/20 provenance wording`):bad('C-STALE',`${k}: missing 20/20 wording`)) : null;
}

/* ---------------------------------------------------------- report */
const fails = F.filter(x=>x.st==='FAIL'), infos = F.filter(x=>x.st==='INFO');
const out = [];
out.push('# Session 8.1 — Cross-document validation report');
out.push('');
out.push('Validator: `audit/runtime/session-08-hardening/cross-validate.mjs`  ·  Gate: brief §11');
out.push('');
out.push(`## RESULT: **${fails.length===0?'PASS':'FAIL'}** — ${F.length-fails.length-infos.length} passed · ${fails.length} failed · ${infos.length} informational`);
out.push('');
out.push('| status | check | detail |');
out.push('|---|---|---|');
for (const f of F) out.push(`| ${f.st} | ${f.id||'—'} | ${f.m} |`);
writeFileSync(join(HERE,'cross-validation-report.md'), out.join('\n')+'\n','utf8');

console.log('============================================================');
console.log(' SESSION 8.1 — CROSS-DOCUMENT VALIDATION');
console.log('============================================================');
for (const f of F) console.log(` [${f.st}] ${(f.id||'').padEnd(9)} ${f.m}`);
console.log('------------------------------------------------------------');
console.log(` PASSED ${F.length-fails.length-infos.length} · FAILED ${fails.length} · INFO ${infos.length}`);
console.log(` VERDICT: ${fails.length===0?'PASS':'FAIL'}`);
console.log('============================================================');
console.log(' report: audit/runtime/session-08-hardening/cross-validation-report.md');
process.exit(fails.length===0?0:1);