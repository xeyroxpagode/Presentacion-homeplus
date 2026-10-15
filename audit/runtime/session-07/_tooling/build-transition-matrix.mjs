// Session 7 — builds audit/07_TRANSITION_MATRIX.csv
// Measured columns come from transitions.json / transition-motion.json (runtime,
// 2026-10-05, port 8444). Target columns are authored Session-7 judgements.
import fs from 'node:fs'
import path from 'node:path'

const ROOT = 'C:/Users/thega/Desktop/HomeplusPresentacion01/HomePlus_Presentacion_FINAL'
const DATA = path.join(ROOT, 'audit/runtime/session-07/data')
const { trans } = JSON.parse(fs.readFileSync(path.join(DATA, 'transitions.json'), 'utf8'))
const motion = JSON.parse(fs.readFileSync(path.join(DATA, 'transition-motion.json'), 'utf8'))

const M = new Map(motion.map((r) => [r.from + '>' + r.to, r]))

// ---------------------------------------------------------------------------
// AUTHORED TARGET TABLE. key = "FROM>TO"
// f  = target_transition_family
// tr = target_trigger
// ms = target_motion_subject
// ex = target_exposure_behavior
// hd = target_hold
// bk = back_restore_requirement
// st = recommendation_status
// nt = notes / current_problem + root cause
// ---------------------------------------------------------------------------
const T = {
'S01_step00>S01_step01': ['SHARED_ELEMENT','MANUAL','insurance document enters as a persistent physical object','stage black; object at full exposure; no glow','HOLD indefinite — first object must survive','re-enter with identical geometry; object persists (ACCUMULATIVE)','KEEP MECHANISM','KEEP. 320ms decelerating entrance + 12px rise is the deck reference. Only the 304px size is below the 420-520 master minimum. RC-01'],
'S01_step01>S01_step02': ['EDITORIAL','MANUAL','grocery bag replaces the invoice','both at full exposure — no de-emphasis of the survivor','HOLD','invoice must return on ArrowLeft; it does not (motion="REPLACE")','REPLACE','A-06 BLOCKER-adjacent. The three chaos objects never coexist. MASTER 2.5 requires same-object survival. RC-16/RC-01'],
'S01_step02>S01_step03': ['SHARED_ELEMENT','MANUAL','first chat fragment enters; physical objects persist at 55-65%','objects drop to 0.60 as a group over 360ms','HOLD','all three object classes restorable','REPLACE','A-05/A-13. Stage ADDS instead of reaching black; no attention reset. RC-06'],
'S01_step03>S01_step04': ['SHARED_ELEMENT','MANUAL','second chat fragment','unchanged','HOLD','cumulative set restorable','KEEP MECHANISM','0 measurable motion: additive inside a mounted layer. Correct register, no announcement. RC-06'],
'S01_step04>S01_step05': ['SHARED_ELEMENT','MANUAL','third chat fragment','unchanged','HOLD','cumulative restorable','KEEP MECHANISM','same as previous. RC-06'],
'S01_step05>S01_step06': ['SHARED_ELEMENT','MANUAL','fourth chat fragment','unchanged','HOLD','cumulative restorable','KEEP MECHANISM','same. RC-06'],
'S01_step06>S01_step07': ['SHARED_ELEMENT','MANUAL','fifth chat fragment','unchanged','HOLD','cumulative restorable','KEEP MECHANISM','same. RC-06'],
'S01_step07>S01_step08': ['SHARED_ELEMENT','MANUAL','sixth fragment + warranty chat bubble','unchanged','HOLD','cumulative restorable','KEEP MECHANISM','A-07 HIGH: the strongest spoken example lands at state 8 of 11. RC-18/RC-06'],
'S01_step08>S01_step09': ['SHARED_ELEMENT','MANUAL','"Ya lo hice yo" fragment','unchanged','HOLD','cumulative restorable','KEEP MECHANISM','same. RC-06'],
'S01_step09>S01_step10': ['EDITORIAL','AUTO_MICROSEQUENCE','the whole field de-emphasises together as ONE group','all objects -> 0.55-0.65 together; nothing enters or exits; 400ms','HOLD — collective quiet is a STATE','group opacity is a declared single value, reversible','REPLACE','A-08/A-10 HIGH. Currently 8 manual presses, four near-identical opacities (0.69/0.88/0.93/0.96/1) and a decorative glow rise. MASTER 2.10 forbids 5-10 individual firings. RC-18/RC-06'],
'S01_step10>S02_step00': ['EDITORIAL','MANUAL','everything clears to absolute black; hero line enters alone','objects -> 0; statement -> 1.00 at 80px','HOLD','black state restorable with zero residue','REPLACE','A-13 MEDIUM + A-04 HIGH. No attention reset: light RISES 0.075 -> 0.10 across the cut. Statement already at opacity 1 on entry. RC-06/RC-03'],
'S02_step00>S02_step01': ['EDITORIAL','MANUAL','service icon 1 (WhatsApp) enters','statement stays 1.00','HOLD','icon count restorable','REPLACE','A-03 BLOCKER. Six brand logos replace the distributed-context argument. MASTER 2.1 forbids brand orange/logos pre-reveal. RC-16'],
'S02_step01>S02_step02': ['EDITORIAL','MANUAL','service icon 2 (Calendar)','statement stays 1.00','HOLD','icon set restorable','REPLACE','A-03. RC-16'],
'S02_step02>S02_step03': ['EDITORIAL','MANUAL','icons 3-4 (Drive, Notas) on one press','statement stays 1.00','HOLD','icon set restorable','REPLACE','A-03 + MASTER 2.10: two objects on one press. RC-16/RC-06'],
'S02_step03>S02_step04': ['EDITORIAL','MANUAL','icons 5-6 (Maps, bank)','statement stays 1.00','HOLD','icon set restorable','REPLACE','A-03 + A-05 HIGH: at "en la cabeza de alguien" the master prescribes absolute black; the stage adds two more. RC-06/RC-03'],
'S02_step04>S02_step05': ['EDITORIAL','MANUAL','"volvemos a preguntar / buscamos mensajes viejos" beat','objects -> 0.35-0.45; one target message -> 1.00','HOLD','only the declared target persists (SELECTIVE CONTINUITY)','MISSING','A-08/A-11 HIGH. This beat has NO state at all. Six logos just sit there. RC-02/RC-18'],
'S02_step05>S02_step06': ['EDITORIAL','MANUAL','the forbidden 6 APPS / 1 FAMILIA / 0 COORDINACION band','icons -> 0.54 and 0.64 scale; band numerals at 1.00, 176px','HOLD','band restorable','REPLACE','A-03 BLOCKER + A-01 HIGH. Numerals at 176px = 264px projected; MASTER 2.3 forbids converting an oral enumeration into a giant headline. RC-03/RC-10'],
'S02_step06>S03_step00': ['EDITORIAL','MANUAL','founding question over TRUE BLACK as a held state, then HomePlus reveal','all -> 0; black holds; icon alone 0->1; wordmark after','HOLD — black holds as long as the speaker takes (manual, no timer)','black state must be reachable and holdable indefinitely','REPLACE','A-02 BLOCKER. Measured: full black at 326ms, held 115ms, gone by 656ms; lockup 661-977ms. ~90% of the founding question is delivered over the visible logo. RC-06'],
'S03_step00>S04_step00': ['DEVICE_TRANSITION','MANUAL','the product device enters; one shared element crosses (Juli → Home of Juli)','stage clears; device 0->1','HOLD','device restored at identical box; no duplicate device','REPLACE','A-11 HIGH. Pure cross-mount, 145 elements repositioned, no shared element travels. MASTER A9 requires the Juli->Home morph. RC-01'],
'S04_step00>S04_step01': ['EDITORIAL','MANUAL','Juli account row focus','unchanged','HOLD','focus ring reversible','KEEP MECHANISM','correct minimal beat. RC-06'],
'S04_step01>S04_step02': ['EDITORIAL','MANUAL','Education Fisica row enters the attention set','row 1.00 + brand-soft ground; siblings 0.55; heading 0.60','HOLD','exposure values reversible','REPLACE','B-03 HIGH: the only focus in Scene B is a 1.02 scale = 0.4px on a 20px title. Illegal mechanism (RC-07). Replace with the S08_step01 exposure model.'],
'S04_step02>S04_step03': ['EDITORIAL','MANUAL','authorization row becomes completed','completed row 1.00; siblings 0.55','HOLD','completion state reversible','REPLACE','B-01 BLOCKER (data, not motion) + 8 entering/5 exiting with no transition. RC-09'],
'S04_step03>S04_step04': ['EDITORIAL','MANUAL','school task becomes completed','both completed rows 1.00','HOLD','reversible','REPLACE','B-01 BLOCKER. Same class. RC-09'],
'S04_step04>S04_step05': ['EDITORIAL','MANUAL','cascade de-emphasis settles','chrome -> 0.82-0.84; attention row back to 1.00','HOLD','reversible','REPLACE','B-02 HIGH: cascade order inverts attention and completion; the tint is lost (bg returns to #FFFFFF). RC-09/RC-07'],
'S04_step05>S05_step00': ['REAL_NAV','MANUAL','Home -> Planner module change inside one persistent device','unchanged — device identity preserved','HOLD','device box identical across the boundary','KEEP MECHANISM','Session 2 KEEP. One physical phone across Home/Planner/Familia. Only the module title is wrong (B-06). RC-02'],
'S05_step00>S05_step01': ['REAL_NAV','MANUAL','Planner TAREAS panel content','unchanged','HOLD','panel restorable','REPLACE','B-07 HIGH: 0 pending, 0 responsabilidades shown. Content defect, motion correct. RC-02'],
'S05_step01>S05_step02': ['REAL_NAV','MANUAL','selection pill translates Tareas -> Calendario','unchanged — selection only','HOLD','pill left position restorable','KEEP AS-IS','N-02 CONFIRMED at runtime: tabs 81.16/81.69px, pill 81.33px translating; one frame at 80.09/83.81. Max 84px. The pill moves, the tabs do not resize. RC-01 resolved.'],
'S05_step02>S05_step03': ['REAL_NAV','MANUAL','selection pill translates Calendario -> Planes','unchanged','HOLD','pill restorable','KEEP AS-IS','N-02 CONFIRMED. Same mechanism, same numbers.'],
'S05_step03>S06_step00': ['SHARED_ELEMENT','MANUAL','scope widens: Juli\'s individual organisation -> the household','Juli rows -> 0.35 in sequence; three members enter; then re-present as Familia','HOLD','no device duplicate; scope state restorable','REPLACE','B-10 HIGH. A scope change is animated as a content change; no shared element crosses. Target: ONE press -> AUTO 1.4s scope-widening beat. RC-01'],
'S06_step00>S06_step01': ['DEVICE_TRANSITION','MANUAL','device reframes to the map beat — WHOLE-DEVICE scale + camera, not layout mutation','device 1.00 -> 1.08; map chrome inside the device drops to 0.40','HOLD','map returns to in-device slot on ArrowLeft','REPLACE','B-11 HIGH (anti-pattern). Measured: .family-map-stage client 250x200 -> 1080x520, scroll 313x265 -> 1350x689, "Colegio" 15px -> 41.04px, "+1h" 26px -> 64.8px, map symbol 18 -> 38, radius 12 -> 22, device opacity -> 0.12, canvas scroll 1280x720 -> 1450x789, map anisotropy flips 0.75 -> 1.246. This is layout mutation, not camera movement. RC-07'],
'S06_step01>S06_step02': ['DEVICE_TRANSITION','MANUAL','Club pin enters inside the device','pin 1.00, others 0.55','HOLD','pin set restorable','KEEP MECHANISM','320ms, correct primitive. Session 2 KEEP.'],
'S06_step02>S06_step03': ['EDITORIAL','MANUAL','Entrenamiento +1 h consequence, in Planner/Calendar semantics','badge isolated at 1.00; map chrome to 0.40','HOLD','badge reversible','REPLACE','B-12 HIGH: a schedules badge on a surface that does not own schedules (N-35). Shown at 64.8px because the container was inflated. RC-04/RC-07'],
'S06_step03>S06_step04': ['DEVICE_TRANSITION','MANUAL','device returns to the standard scale and the member list returns','reverse of the emphasis','HOLD','geometry identical to S06_step00','KEEP DRAMATURGY / REPLACE MECHANISM','Session 2 verdict. Reverse mutation measured: 1080x520 -> 250x200 in one frame. RC-07'],
'S06_step04>S06_step05': ['EDITORIAL','MANUAL','the family conversation beat, explicitly editorial','Feed shell at 0.55; the single message at 1.00','HOLD','editorial label state restorable','REPLACE','B-15/B-16 HIGH + N-36. Presented inside the Familia shell with its tab bar hidden = a navigation lie. Feed is approved capability but Conversation is not its route. RC-14'],
'S06_step05>S07_step00': ['EDITORIAL','MANUAL','product stage exits AS A BLOCK, then near-black holds','product -> 0 and hidden as one block over 260ms; #060404 at 1.00','HOLD — the pause is a STATE','204 descendants stay unpainted in both directions','KEEP AS-IS','Session 2 B-P7 KEEP + N-05. Correct implementation of MASTER 2.4 "the product exits as a block". Zero residue measured.'],
'S07_step00>S07_step01': ['EDITORIAL','MANUAL','the statement enters alone','132px two-tone, full exposure, nothing else on stage','HOLD indefinite','statement reversible','KEEP EXACTLY','N-05 BINDING. 420ms opacity + 12px rise. 132px is an intentional semantic exception; do not normalise. 688.81x274.53 = 20.6% of canvas, ~60% empty.'],
'S07_step01>S08_step00': ['EDITORIAL','MANUAL','near-black -> Scene C product stage','black -> product at 1.00','HOLD','S08 restores with no residue from S07','KEEP MECHANISM','270 entering / 517 exiting, 64 elements repositioned, no shared element crosses. RC-01'],
'S08_step00>S08_step01': ['EDITORIAL','MANUAL','bridge task "Comprar lo que falta" isolated','task 1.00 on brand-soft ground; siblings 0.55; heading 0.60','HOLD','exposure values reversible','KEEP AS-IS','C-10 POSITIVE — the model for the whole deck. Measured: step0 0.55, step1 0.55, step2 1.00, heading 0.60, bg rgb(246,237,232). No scale, no layout, no blur.'],
'S08_step01>S08_step02': ['EDITORIAL','MANUAL','the question enters; the device must NOT dim wholesale','question 1.00 at 68px; device context 0.55; bridge task still 1.00','HOLD','reversible','REPLACE','C-03 HIGH: exposure inverted — the WHOLE device drops to 0.6 including the task that must survive. Measured: .s08-phone-slot eff 0.6, step opacities back to 1, heading back to 1. RC-06'],
'S08_step02>S08_step03': ['SHARED_ELEMENT','MANUAL','the bridge task is EXTRACTED and lands as the first Inventory line','the extracted row stays at 1.00 across the boundary','HOLD','extracted object must return to its Plan position on ArrowLeft','REPLACE','C-04 HIGH. Measured: slot translateX 0 -> 480 in ~540ms + 320ms crossfade, while every plan-step opacity stays at 1. A DEVICE_TRANSITION was used where the master asked for SHARED_ELEMENT. Plan->Inventory is NEITHER real nav nor real data link. RC-01'],
'S08_step03>S08_step04': ['EDITORIAL','MANUAL','the LOW/out-of-stock row is isolated','target row 1.00 on brand-soft; other rows 0.45; NO geometry change','HOLD','reversible','REPLACE','C-06 MEDIUM: focus by instantaneous layout+type mutation. Measured 19px -> 21px title, 62 -> 64 row height, .inventory-card scrollHeight 270 -> 284, clip 41px -> 60px, and it lands on a fully-stocked item. RC-07'],
'S08_step04>S09_step00': ['EDITORIAL','MANUAL','the ledger fact arrives quietly; device reframes, no slide','Finance at 1.00; 16px settle only','HOLD','device restored at the S08 anchor','REPLACE','C-11/D-10 BLOCKER. Cross-mount; Finance fully rendered at t=9.6ms. No purchase is shown and none exists. The $48.720 row is a quiet ledger fact (N-32). RC-01'],
'S09_step00>S09_step01': ['REAL_NAV','MANUAL','Finance Pagos tab — a real product surface','unchanged device, real tab content','HOLD','tab restorable','REPLACE','D-01 BLOCKER: the device signature is byte-identical across all five S09 states; only a 33px stage question changes. D-06/D-03: Movimientos / Nuevo movimiento / Limites have no state. RC-18/RC-02'],
'S09_step01>S09_step02': ['REAL_NAV','MANUAL','Finance Resumen -> Analisis','unchanged device, real surface','HOLD','restorable','REPLACE','D-01/D-07. Same defect. RC-18'],
'S09_step02>S09_step03': ['REAL_NAV','MANUAL','register a movement (account/card selector)','unchanged device','HOLD','restorable','MISSING','D-03 HIGH: no state exists for a spoken action. RC-02'],
'S09_step03>S09_step04': ['REAL_NAV','MANUAL','Limites / household scope','unchanged device','HOLD','restorable','MISSING','D-06 MEDIUM + D-01. RC-02/RC-18'],
'S09_step04>S10_step00': ['SHARED_ELEMENT','MANUAL','the Finance movement row "PlayStation 5 · Mar 2024 · $580.000" is EXTRACTED and becomes the Asset','the extracted row travels; it does not reappear as an Asset field','HOLD','extracted row returns to Movimientos on ArrowLeft','REPLACE','D-09 BLOCKER. Cross-mount; no PS5 object exists in any frame. N-37: money+date are Finance-owned, so the bridge must be a movement row. RC-01'],
'S10_step00>S10_step01': ['EDITORIAL','MANUAL','PS5 row isolated','PS5 row 1.00 on brand-soft; siblings 0.55; heading 0.60','HOLD','reversible','KEEP AS-IS','measured: .assets-row eff {1, 0.55}. Same mechanism as S08_step01. RC-06'],
'S10_step01>S10_step02': ['REAL_NAV','MANUAL','Assets list -> Asset detail','unchanged device; Assets navigation is real in Figma and modelled in the package','HOLD','detail restorable','KEEP MECHANISM','N-13: Assets is an APPROVED TARGET with an implementation gap; the intra-Assets relation is the one place a real surface may be represented. RC-02'],
'S10_step02>S10_step03': ['SHARED_ELEMENT','MANUAL','the "Garantia PlayStation 5" document is EXTRACTED from Assets and lands as the same object in HomeCloud','the document keeps identity, size and y','HOLD','document returns to the Assets detail on ArrowLeft','REPLACE','E-10 MEDIUM. Measured: slot x 238 -> 718 in ~700ms + 320ms crossfade; both document rows exist in BOTH layers as separate DOM instances at y 202.4/288.9 -> 210.2/297.2. N-31: relation is editorial until Integration exists. RC-01'],
'S10_step03>S10_step04': ['EDITORIAL','MANUAL','HomeCloud Documentos -> Recuerdos domain switch','unchanged device','HOLD','restorable','KEEP MECHANISM','E-12 POSITIVE: the Documentos/Recuerdos control is faithful. N-08 CONFIRMED: thumbs are 98x62 settled, not an authored enlargement.'],
'S10_step04>S11_step00': ['EDITORIAL','MANUAL','exposure-down first, then fade to absolute black','HomeCloud 1.00 -> 0.40 over 360ms, hold, then -> 0 over 520ms','HOLD on black','black state restorable with HomeCloud fully unpainted','REPLACE','E-13 MEDIUM: the scene exits by destroying HomeCloud at full opacity in a single cross-mount. "The black is correct — the path to it is not." RC-08'],
'S11_step00>S11_step01': ['EDITORIAL','MANUAL','the continuity thesis line enters alone','120px at 1.00; nothing else painted','HOLD','line restorable','KEEP MECHANISM','F-P1/F-P2 KEEP. The black entry is a correct use of black (MASTER 2.2 use 2) and the 120px setting is the strongest typography in the block. F-02 HIGH: this press establishes nothing. RC-18'],
'S11_step01>S11_step02': ['EDITORIAL','MANUAL','"HomePlus los conecta." enters beneath','resolution line at 1.00','HOLD','restorable','REPLACE','F-01 BLOCKER: 4 of 6 spoken beats have no state, and 6 named abstractions + 6 named relations are absent. F-03 HIGH: these are not the script\'s lines. RC-02/RC-03'],
'S11_step02>S12_step00': ['EDITORIAL','MANUAL','black -> the technical chapter opens on the device','black holds, then device enters alone at 1.00','HOLD — black for the whole of L304','device restored, no duplicate','REPLACE','F-02 + G-01 BLOCKER. Hard cut, 0 animations, 32 entering. The phone must be centred and alone. RC-08/RC-02'],
'S12_step00>S12_step01': ['EDITORIAL','MANUAL','the backend plane emerges BEHIND the device','device 1.00; backend plane 1.00 but spatially behind','HOLD','plane restorable','MISSING','G-01/G-04 BLOCKER: zero device in all 7 Scene-G states, and the verbs RECIBE/VALIDA/RELACIONA/GUARDA/DEVUELVE appear zero times. RC-02'],
'S12_step01>S12_step02': ['EDITORIAL','MANUAL','the concrete transaction is named; nothing yet moves','unchanged','HOLD','restorable','REPLACE','G-05 BLOCKER: the $48.720 transaction does not exist. The decorative bridge line carries no information (G-07). RC-02'],
'S12_step02>S13_step00': ['EDITORIAL','MANUAL','NONE — the composition continues unchanged','unchanged','HOLD','restorable','REPLACE','G-09 HIGH: S13_step00 is a byte-identical remount of S12_step02. 51 entering / 28 exiting, 0 animating, a dead press. MASTER 2.10 forbids a press that changes no idea. RC-06/RC-08'],
'S13_step00>S13_step01': ['EDITORIAL','MANUAL','React Native named, then Expo — one press each','each logo 1.00 as it is named','HOLD','restorable','REPLACE','G-02 BLOCKER + G-11 HIGH: all five vendor logos are on stage before one technology is named, and IA+Figma arrive on one press though the script gives two sentences. G-13: the mono->colour crossfade carries no information. RC-06'],
'S13_step01>S13_step02': ['EDITORIAL','MANUAL','Node, then Supabase, then PostgreSQL','each 1.00 as named','HOLD','restorable','REPLACE','G-02/G-11. Same class. RC-06'],
'S13_step02>S13_step03': ['EDITORIAL','MANUAL','Figma attached to the frontend; IA as plain type + role caption','Figma 1.00 beside the frontend; IA 1.00 with NO glyph and NO glow','HOLD','restorable','REPLACE','G-11 + G-12 BLOCKER + G-10 HIGH. Measured: 5 elements move at once. Figma currently sits on the centreline between the two cards, encoding a false architecture. G-12 remains ACTIVE — do not prescribe AI animation. RC-04/RC-06'],
'S13_step03>S14_step00': ['EDITORIAL','MANUAL','NONE — the stack must NOT be re-mounted','if the stack persists it dims; if it does not, S14 starts from the device alone','HOLD','no re-mount on either boundary','REPLACE','G-08 HIGH (the most damaging motion in the block). Measured: 0 animating, 88 entering / 57 exiting, and because it is a fresh mount the whole entrance animation replays AT ECHO OPACITY 1. Visible text byte-identical to S13_step03. "The echo should be a dimming of an existing composition, never a rebuild of it." RC-08'],
'S14_step00>S14_step01': ['EDITORIAL','MANUAL','the real task route appears; the stack recedes','device 0.75; ONE clean route row at 1.00','HOLD','route restorable','REPLACE','H-01/H-02/H-05 BLOCKER. There is no interface on stage, so the friction cannot be shown; the route names three nodes that do not exist and is drawn as fabricated text pills. Measured text-on-text collision 102.66x21.8px at S14_step01. RC-02/RC-14/RC-07'],
'S14_step01>S14_step02': ['EDITORIAL','MANUAL','the warranty route — real nodes only, product-safe representation','device 0.75; route 1.00','HOLD','route restorable','REPLACE','H-02/H-03. N-13: Assets cannot be shown as real current navigation. Route representation must be editorial and must not invent a warranty node. Measured collision 120.86x19.0px. RC-14'],
'S14_step02>S14_step03': ['EDITORIAL','MANUAL','EVERYTHING clears to one clean product state at 1.00','stack -> 0; routes -> 0; barrier in at full; device 1.00 with nothing around it','HOLD for the whole of the absolving sentence','clean state must be a dedicated stable state','REPLACE','H-04 BLOCKER + H-06 HIGH. Measured: echo 0.22, routes 0.5, barrier full — the absolving line lands on clutter. The attention reset and the question arrival are the same press with 3 concurrent animations. RC-02/RC-06'],
'S14_step03>S14_step04': ['EDITORIAL','MANUAL','black holds as a STATE; the question arrives on a SEPARATE press','black 520ms; then the question at 1.00 alone','HOLD — black holds while the speaker speaks the prelude','question and black each restorable independently','REPLACE','H-07 HIGH + H-06. Measured: 3 elements move concurrently — echo out, barrier out, question in — so residue and question coexist for ~420ms. The silence has no mechanism. RC-06/RC-08'],
'S14_step04>S15_step00': ['EDITORIAL','MANUAL','black -> the Homi name alone','black holds, then "Homi" 110px alone at 1.00','HOLD 400-900ms on the name alone','name and black separately restorable','REPLACE','I-24 MEDIUM (hard cut) + T-04 MEDIUM. Measured: 0 transition animations at this boundary beyond the scene fade. SI-18/J-18 (Geni vs Homi) touches the WORDING, not the motion. RC-08'],
'S15_step00>S15_step01': ['EDITORIAL','MANUAL','the user request arrives in the chat','wordmark -> 0.40 once the device is in; bubble 1.00','HOLD','bubble restorable','REPLACE','I-03 BLOCKER (data) + Session 5 target: the wordmark should settle to 0.40 as a quiet label; it stays at 1.00 for all five states, competing with the phone. RC-09/RC-07'],
'S15_step01>S15_step02': ['SHARED_ELEMENT','MANUAL','Homi\'s structured proposal arrives','proposal 1.00; request bubble -> 0.70','HOLD','proposal restorable','KEEP MECHANISM','Session 5 positive #3 (fade + 10px rise, 320/420ms) + #9 (future tense). KEEP.'],
'S15_step02>S15_step03': ['EDITORIAL','MANUAL','the decision control appears','Confirmar 1.00; nothing else added','HOLD','restorable','REPLACE','I-19 MEDIUM: no cancel path in S15, although MASTER I3 requires Cancelar. RC-04'],
'S15_step03>S15_step04': ['SHARED_ELEMENT','MANUAL','proposal travels to the Planner auxiliary device and lands as a task; HOLD WITHOUT CONFIRMING','chat 1.00; device 1.00; no confirmation state','HOLD','the travelling object must return to the chat on ArrowLeft; no detached copy; no duplicate device','REPLACE','I-02/I-04/I-05 BLOCKER + I-18. Measured: .homi-confirm exits and .homi-done enters at full exposure — the screen CONFIRMS the mutation. NO_UI I26 says NO confirmar; phoneCount = 1 in all 14 states. Target: ONE press -> AUTO 1.4s execution sequence. RC-01/RC-13'],
'S15_step04>S16_step00': ['EDITORIAL','MANUAL','interaction-mode change: the same question, a new persona','device holds position; question bubble enters unchanged','HOLD','no duplicate device','REPLACE','I-21 HIGH + I-07 MEDIUM. Measured: pure cross-mount, 0 animations; the empty Homi state is re-shown after a 5-state conversation. RC-08/RC-06'],
'S16_step00>S16_step01': ['SHARED_ELEMENT','MANUAL','the identical question bubble is the shared element','question 1.00 (identical box across personas); answer 1.00','HOLD','all three persona states restore to the same bubble box','KEEP AS-IS + RECOMPOSE','Session 5 positive #4 CONFIRMED at runtime: box 777,187,238,81 identical across Juli/Tomi/Papa. KEEP the invariance. But I-09/I-10: the forbidden 56px titular states the conclusion, and the comparison is one device at a time. RC-03/RC-02'],
'S16_step01>S16_step02': ['SHARED_ELEMENT','MANUAL','same question, second answer','bubble unchanged; persona chip swaps','HOLD','restorable','REPLACE','I-10 HIGH: the comparison is the argument and needs three devices at the thesis beat; phoneCount = 1 in all five states. I-11 HIGH: the answer contradicts the script. RC-02/RC-09'],
'S16_step02>S16_step03': ['SHARED_ELEMENT','MANUAL','same question, third answer','bubble unchanged','HOLD','restorable','REPLACE','I-10 + I-12 HIGH (unsupported Shopping List) + I-25 LOW (avatar reads as disabled). RC-02/RC-04'],
'S16_step03>S16_step04': ['EDITORIAL','MANUAL','context grounding chips appear','chips 0.55; answer 1.00','HOLD','restorable','REPLACE','I-13 HIGH: "Basado en tu contexto" is not in the script and is not proof. I-06 BLOCKER: the entire Finance-through-Homi beat is absent (15 spoken lines). N-22 supplies the dataset. RC-02/RC-11'],
'S16_step04>S17_step00': ['EDITORIAL','MANUAL','interaction-mode change: from answering to deciding','device holds; Homi proposes a consequential change','HOLD','restorable','REPLACE','I-24 MEDIUM (hard cut) + I-18 HIGH. The proposal is not consequential: it repeats the already-consumed mutation. RC-08/RC-17'],
'S17_step00>S17_step01': ['EDITORIAL','MANUAL','the decision row appears with BOTH actions legible','chat -> 0.20; Confirmar and Cancelar at 1.00','HOLD','decision row restorable; no state leak','REPLACE','I-19 MEDIUM + I-20 MEDIUM. Measured: .homi-decision-row scrollHeight 64 -> 54 — the row reflows as it appears. Label "Ahora no" is weak against MASTER I3 "Cancelar". RC-04/RC-07'],
'S17_step01>S17_step02': ['EDITORIAL','MANUAL','the decision line arrives; the headline must not state the conclusion','one line at 1.00; the previous headline must not survive at 0.40','HOLD','restorable','REPLACE','I-20 MEDIUM: two stage headlines cross-fade (54px -> 0.4 while 84px -> 1.0). The old line lingering at 0.40 competes. RC-03/RC-07'],
'S17_step02>S17_step03': ['EDITORIAL','MANUAL','HOLD WITHOUT CONFIRMING — no mutation state','chat at 0.20; decision row stays; nothing confirms','HOLD indefinite','nothing to restore beyond the decision row','REPLACE','I-04 BLOCKER. Measured: .homi-done "Confirmado / Entrenamiento actualizado" enters at full exposure while the stage says "La decision es nuestra." The frame contradicts itself. RC-13'],
'S17_step03>S18_step00': ['EDITORIAL','MANUAL','absolute black holds for the whole of Gaby\'s closing','everything -> 0 over 520ms; black at 1.00','HOLD — 24.5s at 150wpm of black','black state restorable; no residue from the device','REPLACE','J-02 HIGH + J-16. Measured: only s18-veil-in 220ms; the device exits in a single cross-mount. The screen marker says the black should persist until Colo finishes — and the condition as written is impossible. RC-08'],
'S18_step00>S18_step01': ['EDITORIAL','MANUAL','NONE — the brand must not appear here','black holds','HOLD','black restorable','REPLACE','J-02 HIGH: the brand appears inside Gaby\'s black block, ~30s before the argument. End card before argument (J-11). RC-06'],
'S18_step01>S18_step02': ['EDITORIAL','MANUAL','NONE — team credits are not the closing argument','unchanged','HOLD','restorable','REPLACE','J-01 BLOCKER / J-11. 35 spoken lines resolve to a 4-state end card. RC-18'],
'S18_step02>S18_step03': ['EDITORIAL','MANUAL','"Muchas gracias." arrives, then holds forever','76px at 1.00; nothing else animates','HOLD INDEFINITE','thanks restorable','KEEP AS-IS','J-12 POSITIVE + Session 5 positive #3: separate thanks trigger, indefinite hold. Verified 0 running animations at 0/10s/30s.']
}

const rows = []
const durOf = (t) => {
  const s = new Set()
  for (const f of [...t.frames.map((x) => x.anim), t.before.anim, t.settled.anim])
    for (const a of f) if (a.dur != null) s.add(String(a.dur))
  return [...s].sort((a, b) => +a - +b).join('|')
}
const easeOf = (t) => {
  const s = new Set()
  for (const f of [...t.frames.map((x) => x.anim), t.before.anim, t.settled.anim])
    for (const a of f) {
      if (a.eas && a.eas !== 'linear') s.add(a.eas)
      if (a.tt && a.tt !== 'ease' && a.tt !== 'all') s.add(a.tt)
    }
  return [...s].join('|')
}

for (const t of trans) {
  const key = t.from + '>' + t.to
  const m = M.get(key)
  const a = T[key]
  if (!a) { console.error('MISSING TARGET ROW: ' + key); process.exit(1) }
  const devStr = (ds) => ds.length === 0 ? 'none'
    : ds.map((d) => `${d.scale}@${d.slotBox.x},${d.slotBox.y}(${d.frameBox.w}x${d.frameBox.h})`).join('+')
  const cb = t.before.probe, ca = t.settled.probe
  const layoutMut = m.settledLay > 0
    ? (m.bigLayout.length ? 'YES: ' + m.bigLayout.slice(0, 4).join(' | ')
       : 'YES(minor): ' + Object.keys(t.before.snap).filter((k) => {
           const x = t.before.snap[k], y = t.settled.snap[k]
           return x && y && (x.cw !== y.cw || x.ch !== y.ch || x.sw !== y.sw || x.sh !== y.sh)
         }).slice(0, 4).join(' | '))
    : 'no'
  const fontMut = m.fontChanged.length ? 'YES: ' + m.fontChanged.slice(0, 3).join(' | ') : 'no'
  rows.push([
    'T' + String(t.i).padStart(2, '0'),
    t.from, t.to,
    t.sceneFrom, t.sceneTo,
    t.sceneBoundary ? 'yes' : 'no',
    (m.settledPos + ' repositioned, ' + m.settledOp + ' opacity change, ' + m.settledTr + ' transform change, ' +
      (m.settledLay ? m.settledLay + ' layout mutation' : 'no layout mutation') + ', ' +
      (cb.counts.dom !== ca.counts.dom ? 'DOM ' + cb.counts.dom + '->' + ca.counts.dom : 'DOM constant')),
    (t.settled.anim.length === 0 && m.maxMoving === 0) ? 'NONE (hard cut)'
      : (m.per.some((p) => p.running > 0)
        ? 'css transition/animation on ' + [...new Set(t.frames.flatMap((f) => f.anim.filter((a) => a.st === 'running').map((a) => a.tgt)))].slice(0, 5).join('+')
        : 'react remount / class swap, no interpolating animation'),
    durOf(t) || 'n/a',
    easeOf(t) || 'n/a',
    m.maxMoving,
    layoutMut + (fontMut !== 'no' ? ' | font-size: ' + fontMut : ''),
    (cb.canvas.scrollW !== ca.canvas.scrollW || cb.canvas.scrollH !== ca.canvas.scrollH)
      ? 'YES: ' + cb.canvas.scrollW + 'x' + cb.canvas.scrollH + ' -> ' + ca.canvas.scrollW + 'x' + ca.canvas.scrollH
      : 'no',
    (m.bigLayout.length || cb.counts.dom !== ca.counts.dom)
      ? 'yes (' + (cb.counts.dom !== ca.counts.dom ? 'DOM ' + cb.counts.dom + '->' + ca.counts.dom + ', ' : '') +
        (m.bigLayout.length ? m.bigLayout.length + ' geometry changes' : 'class swap only') + ')'
      : 'no',
    devStr(cb.devices), devStr(ca.devices),
    topStageText(cb),
    topStageText(ca),
    a[7].split('.')[0],
    a[7],
    a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7]
  ])
}

function topStageText(p) {
  const s = (p.stageType || []).filter((x) => x.text.length)[0]
  if (s) return s.fontSize + 'px "' + s.text.slice(0, 34) + '"'
  const a = (p.appType || []).filter((x) => x.text.length)[0]
  if (a) return 'device ' + a.fontSize + 'px "' + a.text.slice(0, 30) + '"'
  return 'NONE (black / empty)'
}

const header = ['transition_id','from_state','to_state','scene_from','scene_to','scene_boundary',
 'current_visual_change','current_motion_primitive','current_duration_ms','current_easing',
 'animated_element_count','layout_mutation','scroll_geometry_mutation','mount_unmount',
 'device_before','device_after','primary_attention_before','primary_attention_after',
 'current_problem','canonical_root_cause','target_transition_family','target_trigger',
 'target_motion_subject','target_exposure_behavior','target_hold','back_restore_requirement',
 'recommendation_status','notes']

const csv = [header.join(',')].concat(rows.map((r) =>
  r.map((c) => '"' + String(c).replace(/"/g, '""') + '"').join(','))).join('\r\n')
fs.writeFileSync(path.join(ROOT, 'audit/07_TRANSITION_MATRIX.csv'), '﻿' + csv, 'utf8')
console.log('ROWS WRITTEN :', rows.length)
console.log('COLUMNS      :', header.length)