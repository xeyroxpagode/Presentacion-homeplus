# 00 — CANONICAL ISSUE REGISTRY

**Issued:** Global Audit Normalization pass, 2026-10-05.
**Inputs:** Sessions 1–6 issue registers, mechanically parsed.
**Companion files:** `00_AUDIT_NORMALIZATION.md` (correction layer) · `00_CROSS_SESSION_CONFLICTS.md` (conflicts + script registry) · `00_SESSION7_GATE.md` (gate).

---

## 0. HOW TO READ THIS FILE

### 0.1 Two axes, never merged

| Axis | Vocabulary | Owner | Mutable? |
|---|---|---|---|
| **RAW SEVERITY** | `BLOCKER` `HIGH` `MEDIUM` `LOW` `POSITIVE` ungraded | the source session | ⛔ **NEVER** |
| **CANONICAL STATUS** | `ACTIVE` `SUPERSEDED` `RESOLVED_BY_AUTHORITY` `DUPLICATE` `SUBSUMED` `OPEN_DECISION` `EVIDENCE_ONLY` `POSITIVE` | this normalization pass | ✅ yes |

**Worked example — `I-15`:** raw severity `BLOCKER` (Session 5 graded it so; that grade is permanent) · canonical status `RESOLVED_BY_AUTHORITY` (NO-UI §18 freezes the dataset, which settles it). **Both facts are true. Neither cancels the other.** See `N-22`.

### 0.2 Extraction method — stated so it can be audited

The register is not a summary. It is the **mechanical parse of every issue-register row in Sessions 2–5**, then adjudicated.

| Source | Format | Rows |
|---|---|---|
| `02_SCENES_A_B_AUDIT.md` §4 + §12 | heading blocks, `- **SEVERITY:**` field | 39 |
| `03_SCENES_C_E_AUDIT.md` §5 + §12 + §21 (+ §8, §15) | heading blocks | 34 |
| `04_SCENES_F_H_AUDIT.md` §5 + §15 + §25 | heading blocks | 34 |
| `05_SCENES_I_J_AUDIT.md` §12 + §24 | **markdown tables**, severity = column 10 | 42 |
| **TOTAL** | | **149** |

**Two parsing traps that were hit, documented because they change the answer:**

1. **Combined IDs.** `C-11/D-10` is one register row carrying a dual cross-scene ID. A naive `[A-J]-\d\d` scan drops it and under-reports Session 3 by one `BLOCKER`. See `N-27`.
2. **Two register formats.** Sessions 2–4 use heading blocks; Session 5 uses tables. A single parser must handle both, or it silently returns zero for Session 5.

**Beat IDs are not issues.** `I00`, `I01`, `t0`…`t4`, `S15 t1` are choreography coordinates and are excluded. See `N-19`.

**Source numbering gap, recorded so nobody hunts for it:** Session 5's `I-*` sequence skips `I-08`, `I-14`, `I-16`, `I-17`. No such ID is referenced anywhere else in the corpus.

### 0.3 Canonical status tally

| CANONICAL STATUS | Count |
|---|---||
| `ACTIVE` | **124** |
| `OPEN_DECISION` | **8** |
| `POSITIVE` | **10** |
| `RESOLVED_BY_AUTHORITY` | **5** |
| `SUBSUMED` | **2** |
| **TOTAL** | **149** |

### 0.4 Raw severity tally (never altered)

| RAW SEVERITY | S2 | S3 | S4 | S5 | TOTAL |
|---|---|---|---|---|---||
| **BLOCKER** | 3 | 6 | 12 | 8 | **29** |
| **HIGH** | 23 | 12 | 14 | 18 | **67** |
| **MEDIUM** | 5 | 11 | 6 | 9 | **31** |
| **LOW** | 2 | 0 | 2 | 3 | **7** |
| **POSITIVE** | 4 | 5 | 0 | 1 | **10** |
| ungraded (`-` / source-inconsistency) | 2 | 0 | 0 | 3 | **5** |
| **TOTAL ROWS** | **39** | **34** | **34** | **42** | **149** |

**Executive-tally mismatches this registry corrects.** The register is the authority — see `N-42`.

| Session | Executive summary claimed | Register reality | Correction |
|---|---|---|---|
| 02 | 3 | **3** | ✅ correct |
| 03 | *(no tally block published; narrative said 6)* | **6** | ✅ consistent |
| **04** | **6** (F 1 / G 4 / H 1) | **12** (F 1 / G 7 / H 4) | ❌ **`N-11`** |
| **05** | **7** | **8** | ❌ **`N-18`** |
| 05 | *"28 issues"* | **42** | ❌ **`N-19`** |

---

## 1. ACTIVE BLOCKERS

**Count: 28** of 29 raw blockers. One (`I-15`) is `RESOLVED_BY_AUTHORITY`. **Zero were downgraded to achieve this number.**

| CANONICAL ID | SOURCE ISSUE ID | SRC SESS | SCENE | RAW SEVERITY | CANONICAL STATUS | ROOT CAUSE | DOMAIN | SUPERSEDES / DUPLICATES | S7? | NOTES |
|---|---|---|---|---|---|---|---|---|---|---|
| CN-001 | **B-01** | 02 | B Â· S04 Home / S05 Planner / S06 Family / S07 Coordinar no es vigilar | BLOCKER | **ACTIVE** | RC-09 | PRODUCT | - | YES | Home marks Juli tasks 'V Completada' while narration says pendiente. Highest-value fix in Scene B. |
| CN-004 | **A-02** | 02 | A Â· S01 Chaos / S02 Fragmented Info / S03 HomePlus | BLOCKER | **ACTIVE** | RC-06 | NARRATIVE | - | YES | Founding question spoken over the HomePlus lockup, not over black. Master A5/A14/A15 collapsed into one 640 ms animation. Frozen rule, no authority conflict. |
| CN-005 | **A-03** | 02 | A Â· S01 Chaos / S02 Fragmented Info / S03 HomePlus | BLOCKER | **ACTIVE** | RC-16 | NARRATIVE | - | YES | Removes MASTER 2.5 mandatory shared elements (WhatsApp, Ma ...), which makes the closing callbacks non-sequiturs. Canonical root of the RC-16 chain. |
| CN-041 | **D-01** | 03 | D Â· S09 Finance | BLOCKER | **ACTIVE** | RC-18 | NARRATIVE | - | YES | Static prop: nothing in the device changes across all five states, so eight spoken beats rest on one product state. |
| CN-042 | **C-01** | 03 | C Â· S08 Plans + Inventory | BLOCKER | **ACTIVE** | RC-02 | PRODUCT | - | YES | Out-of-stock item clipped out of the device in every Inventory state. 'que necesitamos comprar' is never visible. |
| CN-045 | **C-02** | 03 | C Â· S08 Plans + Inventory | BLOCKER | **ACTIVE** | RC-05 | PRODUCT | - | YES | Plan renders the three literal strings MASTER C2 forbids and none of the six canon tasks. Data transcribed from narration. |
| CN-050 | **E-04** | 03 | E Â· S10 Assets + HomeCloud | BLOCKER | **ACTIVE** | RC-02 | NARRATIVE | - | YES | Warranty-vs-memory thesis - the Scene E and product pivot - has no visual support and no available state. |
| CN-065 | **D-09** | 03 | D Â· S09 Finance | BLOCKER | **ACTIVE** | RC-01 | PRODUCT | N-37 REFRAMES | YES | No PS5 movement exists; D to E is a cross-mount. N-37: money+date belong to Finance, so the bridge must be a Finance movement row, not an Asset field. |
| CN-071 | **C-11/D-10** | 03 | C Â· S08 Plans + Inventory | BLOCKER | **ACTIVE** | RC-01 | MOTION | PARSING TRAP - see N-27, N-42 | YES | There is no purchase; C to D is a cross-mount and Finance is fully present before the speaker introduces money. Single register row, combined ID, raw BLOCKER. |
| CN-074 | **H-01** | 04 | H Â· S14 Barrier | BLOCKER | **ACTIVE** | RC-02 | PRODUCT | N-12 - NEVER CONFLATE WITH H-02 | YES | Scene H has no interface: the friction cannot be shown. Cause = product stage absent. Would still be a BLOCKER with a perfect route. |
| CN-075 | **G-01** | 04 | G Â· S12 Frontend/Backend + S13 Stack | BLOCKER | **ACTIVE** | RC-02 | PRODUCT | - | YES | The product is not on stage: zero device across all 7 states. Canonical head of the Scene G chain. |
| CN-076 | **F-01** | 04 | F Â· S11 Continuity | BLOCKER | **ACTIVE** | RC-18 | NARRATIVE | - | YES | Scene F has no visual content: 4 of 6 spoken beats unrepresented. Canonical head of the Scene F chain. |
| CN-077 | **H-02** | 04 | H Â· S14 Barrier | BLOCKER | **ACTIVE** | RC-14 | PRODUCT | N-12, N-13 - NEVER CONFLATE WITH H-01 | YES | The warranty route names three nodes that do not exist in the product. Cause = fabricated navigation. Would still be a BLOCKER with a perfect interface. N-13 fixes Assets' AUTHORITY but does NOT create the route. |
| CN-078 | **G-02** | 04 | G Â· S12 Frontend/Backend + S13 Stack | BLOCKER | **ACTIVE** | RC-06 | TIMING | - | YES | All five vendor logos on stage before the speaker names a single technology. |
| CN-081 | **G-03** | 04 | G Â· S12 Frontend/Backend + S13 Stack | BLOCKER | **ACTIVE** | RC-02 | PRODUCT | - | YES | The frontend is explained with no frontend: pantallas, botones, menus, informacion have zero evidence. |
| CN-083 | **H-04** | 04 | H Â· S14 Barrier | BLOCKER | **ACTIVE** | RC-06 | NARRATIVE | - | YES | The absolving sentence has no clean state, so the scene implies HomePlus is badly designed. |
| CN-085 | **G-04** | 04 | G Â· S12 Frontend/Backend + S13 Stack | BLOCKER | **ACTIVE** | RC-02 | NARRATIVE | - | YES | The backend has no verb language: RECIBE/VALIDA/RELACIONA/GUARDA/DEVUELVE appear zero times. |
| CN-086 | **H-05** | 04 | H Â· S14 Barrier | BLOCKER | **ACTIVE** | RC-07 | VISUAL | - | YES | The routes are fabricated text pills that collide with three pieces of stage text. Visual-load half of H-02's root cause. |
| CN-088 | **G-05** | 04 | G Â· S12 Frontend/Backend + S13 Stack | BLOCKER | **ACTIVE** | RC-02 | PRODUCT | - | YES | The one concrete transaction of the block does not exist. |
| CN-102 | **G-12** | 04 | G Â· S12 Frontend/Backend + S13 Stack | BLOCKER | **ACTIVE** | RC-04 | PRODUCT | N-14 CONFIRMS | YES | NOT RESOLVED. N-14 verified 0 AI providers / 0 AI routes / 0 edge functions / 0 AI env / 0 current Homi. The single unsafe sentence is script L320. Stays ACTIVE unless the script changes or real implementation appears. |
| CN-105 | **G-15** | 04 | G Â· S12 Frontend/Backend + S13 Stack | BLOCKER | **ACTIVE** | RC-02 | NARRATIVE | - | YES | The recomposition into one experience - the block's closing argument - does not exist. |
| CN-108 | **J-01** | 05 | J Â· S18 Closing | BLOCKER | **ACTIVE** | RC-18 | NARRATIVE | - | YES | Closing argument does not exist. 35 spoken lines over 2 speakers resolve to a 4-state end card. S18Closing is 32 lines of JSX. |
| CN-109 | **I-01** | 05 | I Â· S15/S16/S17 Homi | BLOCKER | **ACTIVE** | RC-13 | PRODUCT | N-14, N-21 | YES | Wrong demo, wrong proposal, no cancel path. Teaches autonomous third-party mutation against frozen canon. |
| CN-110 | **I-02** | 05 | I Â· S15/S16/S17 Homi | BLOCKER | **ACTIVE** | RC-01 | MOTION | N-21 | YES | No execution proof. The principle 'Homi does not replace HomePlus, it works over HomePlus' is unproven. Shared element never crosses the chat boundary. |
| CN-113 | **I-03** | 05 | I Â· S15/S16/S17 Homi | BLOCKER | **ACTIVE** | RC-09 | NARRATIVE | - | YES | On-stage question says 'hoy'; script, master canon and the whole thesis say 'manana'. |
| CN-115 | **I-04** | 05 | I Â· S15/S16/S17 Homi | BLOCKER | **ACTIVE** | RC-13 | PRODUCT | N-21 | YES | S17 CONFIRMS the mutation. MASTER NO_UI I26 says NO confirmar. The screen contradicts itself within one frame. |
| CN-117 | **I-05** | 05 | I Â· S15/S16/S17 Homi | BLOCKER | **ACTIVE** | RC-02 | NARRATIVE | - | YES | S17 contains no visual HomePlus surface at all. phoneCount = 1 in all 4 states, always the Homi chat. |
| CN-118 | **I-06** | 05 | I Â· S15/S16/S17 Homi | BLOCKER | **ACTIVE** | RC-18 | NARRATIVE | N-22 SUPPLIES THE DATASET | YES | The entire Finance-through-Homi beat is absent: 15 spoken lines with zero visual support. The dataset to use is now fixed by N-22. |


### 1.1 The 28, grouped by scene

| Scene | Active blockers | Root causes they concentrate in |
|---|---|---|
| **A** Opening | `A-02`, `A-03` | RC-06 timing · RC-16 shared elements |
| **B** Home / Planner / Familia | `B-01` | RC-09 data semantics |
| **C** Plans + Inventory | `C-01`, `C-02`, `C-11/D-10` | RC-02 · RC-05 · RC-01 |
| **D** Finanzas | `D-01`, `D-09` | RC-18 state budget · RC-01 |
| **E** Assets + HomeCloud | `E-04` | RC-02 stage absent |
| **F** Continuidad | `F-01` | RC-18 state budget |
| **G** Stack | `G-01`, `G-02`, `G-03`, `G-04`, `G-05`, `G-12`, `G-15` | **RC-02 (6 of 7)** |
| **H** Fricción | `H-01`, `H-02`, `H-04`, `H-05` | RC-02 · RC-14 · RC-06 · RC-07 |
| **I** Homi | `I-01`, `I-02`, `I-03`, `I-04`, `I-05`, `I-06` | RC-13 · RC-01 · RC-09 · RC-02 · RC-18 |
| **J** Cierre | `J-01` | RC-18 state budget |

**Concentration is not a counting artefact — it is the finding.** Scene G holds 7 of the 28 active blockers and **6 of those 7** share one root cause: *the product is not on stage.* Session 4 stated this itself (*"the single root cause of Scenes F, G and H is that the product is not on stage"*) and then graded seven separate issues BLOCKER anyway. **Do not "fix seven things in Scene G." Fix `RC-02` once.**

---

## 2. ACTIVE HIGH

| CANONICAL ID | SOURCE ISSUE ID | SRC SESS | SCENE | RAW SEVERITY | CANONICAL STATUS | ROOT CAUSE | DOMAIN | SUPERSEDES / DUPLICATES | S7? | NOTES |
|---|---|---|---|---|---|---|---|---|---|---|
| CN-002 | **A-01** | 02 | A Â· S01 Chaos / S02 Fragmented Info / S03 HomePlus | HIGH | **ACTIVE** | RC-10 | VISUAL | SUPERSEDES the OPEN-1 framing; aggravates it | YES | Which orange is correct is settled by N-24 (#E7643F). A-01 now unambiguously violates MASTER 2.1 / NO-UI 5. |
| CN-003 | **B-02** | 02 | B Â· S04 Home / S05 Planner / S06 Family / S07 Coordinar no es vigilar | HIGH | **ACTIVE** | RC-09 | VISUAL | - | YES | Final Home state visually inverts attention and completion (cascade-order defect). |
| CN-006 | **B-03** | 02 | B Â· S04 Home / S05 Planner / S06 Family / S07 Coordinar no es vigilar | HIGH | **ACTIVE** | RC-07 | VISUAL | - | YES | The only 'focus' in Scene B is a 1.02 scale. Illegal emphasis mechanism. |
| CN-007 | **B-04** | 02 | B Â· S04 Home / S05 Planner / S06 Family / S07 Coordinar no es vigilar | HIGH | **ACTIVE** | RC-09 | PRODUCT | - | YES | Date semantics contradict the narration. |
| CN-008 | **A-04** | 02 | A Â· S01 Chaos / S02 Fragmented Info / S03 HomePlus | HIGH | **ACTIVE** | RC-05 | COPY | CROSS-LINK RC-09 | YES | Renders 'La informacion ya existe' (present) instead of the frozen 'La informacion ya existia' (past), on stage for 6 states before the first icon. |
| CN-009 | **A-05** | 02 | A Â· S01 Chaos / S02 Fragmented Info / S03 HomePlus | HIGH | **ACTIVE** | RC-06 | NARRATIVE | - | YES | At 'en la cabeza de alguien' the stage adds objects instead of reaching black. Frozen master A2 beat missing. |
| CN-011 | **A-06** | 02 | A Â· S01 Chaos / S02 Fragmented Info / S03 HomePlus | HIGH | **ACTIVE** | RC-16 | MOTION | CROSS-LINK RC-01 | YES | Persistence model violated: chaos objects replace instead of coexisting. MASTER 2.5 continuity broken. |
| CN-012 | **B-06** | 02 | B Â· S04 Home / S05 Planner / S06 Family / S07 Coordinar no es vigilar | HIGH | **ACTIVE** | RC-02 | PRODUCT | - | YES | Tareas is the page title; Planner never appears. Module identity unproven. |
| CN-013 | **A-07** | 02 | A Â· S01 Chaos / S02 Fragmented Info / S03 HomePlus | HIGH | **ACTIVE** | RC-18 | TIMING | - | YES | Strongest spoken example arrives at state 8 of 11. Scene state budget misallocated. |
| CN-014 | **B-07** | 02 | B Â· S04 Home / S05 Planner / S06 Family / S07 Coordinar no es vigilar | HIGH | **ACTIVE** | RC-02 | PRODUCT | - | YES | Tareas shows zero pending work and zero responsabilidades - capability exists in both targets, absent here. |
| CN-015 | **A-08** | 02 | A Â· S01 Chaos / S02 Fragmented Info / S03 HomePlus | HIGH | **ACTIVE** | RC-03 | NARRATIVE | - | YES | Two pivot lines have no state, no behaviour, no clear. MASTER 2.3. |
| CN-016 | **B-08** | 02 | B Â· S04 Home / S05 Planner / S06 Family / S07 Coordinar no es vigilar | HIGH | **ACTIVE** | RC-02 | PRODUCT | - | YES | Calendario shows no time and no schedules. Same shape as B-07. |
| CN-017 | **B-09** | 02 | B Â· S04 Home / S05 Planner / S06 Family / S07 Coordinar no es vigilar | HIGH | **ACTIVE** | RC-05 | NARRATIVE | SOURCE OF N-28 | YES | Plan shows Scene C content with the three literal strings MASTER C2 forbids. |
| CN-018 | **A-09** | 02 | A Â· S01 Chaos / S02 Fragmented Info / S03 HomePlus | HIGH | **ACTIVE** | RC-03 | VISUAL | - | YES | Saturation is a sparse field of 7 bubbles. MASTER quantitative target not met. |
| CN-020 | **B-10** | 02 | B Â· S04 Home / S05 Planner / S06 Family / S07 Coordinar no es vigilar | HIGH | **ACTIVE** | RC-01 | MOTION | - | YES | No bridge from individual organisation to household coordination. Missing beat, not a bad transition. |
| CN-021 | **A-11** | 02 | A Â· S01 Chaos / S02 Fragmented Info / S03 HomePlus | HIGH | **ACTIVE** | RC-02 | NARRATIVE | - | YES | Entire post-reveal argument has no visual support. |
| CN-022 | **B-11** | 02 | B Â· S04 Home / S05 Planner / S06 Family / S07 Coordinar no es vigilar | HIGH | **ACTIVE** | RC-07 | VISUAL | - | YES | Map enlargement is a layout-size mutation of a live component outside its device. MASTER 8.1 motion rule violation. |
| CN-023 | **B-12** | 02 | B Â· S04 Home / S05 Planner / S06 Family / S07 Coordinar no es vigilar | HIGH | **ACTIVE** | RC-04 | PRODUCT | - | YES | 'Entrenamiento +1 h' badge on a map that does not own schedules. See N-30. |
| CN-025 | **B-13** | 02 | B Â· S04 Home / S05 Planner / S06 Family / S07 Coordinar no es vigilar | HIGH | **ACTIVE** | RC-04 | PRODUCT | RE-EVIDENCED BY N-03, N-30 | YES | Map asserts geography the product cannot know (authored CSS percentages). Fabrication. Canonical index N-03. |
| CN-028 | **B-14** | 02 | B Â· S04 Home / S05 Planner / S06 Family / S07 Coordinar no es vigilar | HIGH | **ACTIVE** | RC-04 | PRODUCT | RE-EVIDENCED BY N-30 | YES | Shared location staged as an always-on global state. Product Truth: individual/contextual, not a household master switch. |
| CN-030 | **B-15** | 02 | B Â· S04 Home / S05 Planner / S06 Family / S07 Coordinar no es vigilar | HIGH | **ACTIVE** | RC-14 | PRODUCT | CROSS-LINK N-36 | YES | Feed presented inside the Familia shell with its tab bar hidden. Navigation lie. |
| CN-032 | **B-16** | 02 | B Â· S04 Home / S05 Planner / S06 Family / S07 Coordinar no es vigilar | HIGH | **ACTIVE** | RC-14 | PRODUCT | - | YES | Technician post is a mock capability with no thread and no way back. |
| CN-036 | **B-19** | 02 | B Â· S04 Home / S05 Planner / S06 Family / S07 Coordinar no es vigilar | HIGH | **ACTIVE** | RC-09 | NARRATIVE | - | YES | S07's boundary asserted over a stage that contradicts it. Pairs with N-05. |
| CN-040 | **E-01** | 03 | E Â· S10 Assets + HomeCloud | HIGH | **ACTIVE** | RC-02 | PRODUCT | - | YES | Assets detail is a document list - one of five target sections, ~42% of the device empty. |
| CN-043 | **E-02** | 03 | E Â· S10 Assets + HomeCloud | HIGH | **ACTIVE** | RC-04 | PRODUCT | N-37 REFRAMES | YES | None of the three spoken causals has evidence. N-37: 2 of 3 (purchase date, maintenance) are PROHIBITED as Asset-owned fields by ASSETS_V2:347/886 - so showing them is itself the defect. Only Warranty is a real Asset Record. |
| CN-044 | **D-02** | 03 | D Â· S09 Finance | HIGH | **ACTIVE** | RC-03 | NARRATIVE | - | YES | The four stage questions are the narration copied to the screen at 33 px, and are the only thing that changes. |
| CN-046 | **D-03** | 03 | D Â· S09 Finance | HIGH | **ACTIVE** | RC-02 | PRODUCT | - | YES | Movimientos, Nuevo movimiento, the account/card selector and Limites have no state at all. |
| CN-047 | **C-03** | 03 | C Â· S08 Plans + Inventory | HIGH | **ACTIVE** | RC-06 | MOTION | - | YES | Selective exposure inverted at the bridge beat: the whole device drops to 0.6 including the task that must survive. |
| CN-048 | **E-03** | 03 | E Â· S10 Assets + HomeCloud | HIGH | **ACTIVE** | RC-11 | PRODUCT | - | NO | Factura missing from the Assets detail and appearing in HomeCloud as 'Factura TV', an unrelated object. |
| CN-049 | **C-04** | 03 | C Â· S08 Plans + Inventory | HIGH | **ACTIVE** | RC-01 | MOTION | - | YES | Plan to Inventory is a 480 px device slide with no shared element. DEVICE_TRANSITION where SHARED_ELEMENT was specified. |
| CN-051 | **D-04** | 03 | D Â· S09 Finance | HIGH | **ACTIVE** | RC-09 | PRODUCT | - | YES | Scope claim contradicted by the data on screen: 'tanto personales como del hogar' vs only Familia Garcia. |
| CN-053 | **E-05** | 03 | E Â· S10 Assets + HomeCloud | HIGH | **ACTIVE** | RC-04 | VISUAL | - | YES | HomeCloud Memories uses CSS gradients as photo stand-ins, which the product freeze explicitly forbids. Fake visual. |
| CN-059 | **E-07** | 03 | E Â· S10 Assets + HomeCloud | HIGH | **ACTIVE** | RC-14 | PRODUCT | - | YES | Memories is a flat list: no album is entered, and Albums is a single text row. |
| CN-070 | **D-11** | 03 | D Â· S09 Finance | HIGH | **ACTIVE** | RC-01 | MOTION | - | YES | No intermediate beat: one keystroke separates 'el dinero' from 'la Play'. Missing beat. |
| CN-079 | **F-02** | 04 | F Â· S11 Continuity | HIGH | **ACTIVE** | RC-06 | TIMING | - | YES | The black entry costs a full press and establishes nothing. |
| CN-080 | **H-03** | 04 | H Â· S14 Barrier | HIGH | **ACTIVE** | RC-14 | PRODUCT | - | YES | The task route is partially real and mislabels two of its four nodes. |
| CN-082 | **F-03** | 04 | F Â· S11 Continuity | HIGH | **ACTIVE** | RC-03 | NARRATIVE | - | YES | The screen's two lines are not the script's two lines. MASTER 2.3. |
| CN-087 | **F-05** | 04 | F Â· S11 Continuity | HIGH | **ACTIVE** | RC-01 | MOTION | - | YES | Scene F ends on text, so there is no shared element to hand to Scene G. |
| CN-090 | **H-06** | 04 | H Â· S14 Barrier | HIGH | **ACTIVE** | RC-08 | MOTION | - | YES | The attention reset and the question arrival are the same press, with concurrent transitions. |
| CN-092 | **H-07** | 04 | H Â· S14 Barrier | HIGH | **ACTIVE** | RC-06 | TIMING | - | YES | The silence on the key question has no mechanism. Manual hold required. |
| CN-093 | **G-08** | 04 | G Â· S12 Frontend/Backend + S13 Stack | HIGH | **ACTIVE** | RC-08 | MOTION | - | YES | The S13 to S14 boundary replays the entire stack at full brightness. Visible text byte-identical to S13_step03. |
| CN-095 | **G-09** | 04 | G Â· S12 Frontend/Backend + S13 Stack | HIGH | **ACTIVE** | RC-08 | MOTION | - | YES | S13_step00 is a duplicate of S12_step02 and a dead press. |
| CN-099 | **G-11** | 04 | G Â· S12 Frontend/Backend + S13 Stack | HIGH | **ACTIVE** | RC-06 | TIMING | - | YES | IA and Figma arrive on the same press though the script gives them two sentences. |
| CN-101 | **H-12** | 04 | H Â· S14 Barrier | HIGH | **ACTIVE** | RC-02 | VISUAL | - | YES | The entire technical stack is the background of the friction scene. Undermines H-01's already-missing interface. |
| CN-104 | **G-14** | 04 | G Â· S12 Frontend/Backend + S13 Stack | HIGH | **ACTIVE** | RC-18 | TIMING | - | YES | Five spoken ideas collapse into one press with five simultaneous motions. |
| CN-111 | **J-02** | 05 | J Â· S18 Closing | HIGH | **ACTIVE** | RC-06 | TIMING | - | YES | Brand appears inside Gaby's black block. MASTER J00: absolute black for the WHOLE of Gaby's closing. |
| CN-112 | **J-03** | 05 | J Â· S18 Closing | HIGH | **ACTIVE** | RC-12 | VISUAL | - | YES | The three closing physical objects do not exist as assets. |
| CN-116 | **J-05** | 05 | J Â· S18 Closing | HIGH | **ACTIVE** | RC-12 | VISUAL | - | YES | No house, no family. The constant that technology recedes from is absent. |
| CN-119 | **J-06** | 05 | J Â· S18 Closing | HIGH | **ACTIVE** | RC-12 | NARRATIVE | - | YES | Invisible work absent. Conceptual core of the closing. |
| CN-120 | **J-07** | 05 | J Â· S18 Closing | HIGH | **ACTIVE** | RC-12 | NARRATIVE | - | YES | Philosophy line absent. The product's philosophical claim has no held frame. |
| CN-122 | **J-08** | 05 | J Â· S18 Closing | HIGH | **ACTIVE** | RC-12 | VISUAL | - | YES | 5 organization categories absent. The only place in the closing with granular timing control. |
| CN-123 | **I-09** | 05 | I Â· S15/S16/S17 Homi | HIGH | **ACTIVE** | RC-03 | VISUAL | - | YES | Forbidden titular 'La misma pregunta. / Distinto contexto.' states the conclusion, taking the discovery from the audience. |
| CN-124 | **J-09** | 05 | J Â· S18 Closing | HIGH | **ACTIVE** | RC-12 | NARRATIVE | - | YES | Technology recession absent. The visual thesis of the film. |
| CN-125 | **J-10** | 05 | J Â· S18 Closing | HIGH | **ACTIVE** | RC-12 | NARRATIVE | - | YES | 'simplemente viviendo' living moment absent. The final emotional landing. |
| CN-126 | **I-10** | 05 | I Â· S15/S16/S17 Homi | HIGH | **ACTIVE** | RC-02 | NARRATIVE | - | YES | Three devices required at the thesis beat; phoneCount = 1. The block's thesis is never visually proven. |
| CN-127 | **J-11** | 05 | J Â· S18 Closing | HIGH | **ACTIVE** | RC-06 | TIMING | - | YES | End card arrives before the argument. It must come after. |
| CN-128 | **I-11** | 05 | I Â· S15/S16/S17 Homi | HIGH | **ACTIVE** | RC-11 | PRODUCT | - | YES | Tomi's answer contradicts the script's established fact and introduces a third time value. NO-UI 18 canon is 18:00-20:00. |
| CN-129 | **I-12** | 05 | I Â· S15/S16/S17 Homi | HIGH | **ACTIVE** | RC-04 | PRODUCT | N-20 REFRAMES THE REASON | YES | Papa's answer invents a Shopping List. N-20: the correct characterisation is 'unsupported under current Product Truth', not 'does not exist anywhere' - Figma does have a prototype. Stays ACTIVE. |
| CN-131 | **I-13** | 05 | I Â· S15/S16/S17 Homi | HIGH | **ACTIVE** | RC-03 | NARRATIVE | - | YES | Generic module names claim grounding without providing any. Not in the script. |
| CN-133 | **J-14** | 05 | J Â· S18 Closing | HIGH | **ACTIVE** | RC-12 | PRODUCTION | - | NO | The entire closing object vocabulary must be produced from scratch. No mochila, no heladera, no casa. Figma-app has zero svg/png in src/. |
| CN-139 | **I-18** | 05 | I Â· S15/S16/S17 Homi | HIGH | **ACTIVE** | RC-17 | PRODUCT | N-23 RESOLVES THE TIME VALUE; CHOREOGRAPHY HALF STAYS ACTIVE | YES | The 19:00 value is VALID canon (NO-UI 18:1265 and :1284). Product Truth permits arbitrary times; Integration's TimePickerSheet offers 0-23h. Figma's picker gap is a PROTOTYPE gap and must not rewrite the canon. What remains ACTIVE: no before/after, and it repeats S15's consumed mutation. |
| CN-142 | **I-21** | 05 | I Â· S15/S16/S17 Homi | HIGH | **ACTIVE** | RC-08 | MOTION | N-41 CONFIRMS THE SCALE | YES | Device box 718,25,324,670 unchanged across all 14 states. 14 states, 3 scenes, ~3.4 min, and the device never moves. The 1.08 scale itself is CORRECT (N-41); the absence of the three frozen device directions is the defect. |


### 2.1 ACTIVE MEDIUM

| CANONICAL ID | SOURCE ISSUE ID | SRC SESS | SCENE | RAW SEVERITY | CANONICAL STATUS | ROOT CAUSE | DOMAIN | SUPERSEDES / DUPLICATES | S7? | NOTES |
|---|---|---|---|---|---|---|---|---|---|---|
| CN-010 | **B-05** | 02 | B Â· S04 Home / S05 Planner / S06 Family / S07 Coordinar no es vigilar | MEDIUM | **ACTIVE** | RC-07 | VISUAL | - | YES | Three rows on a 1280x720 stage. Readability. |
| CN-019 | **A-10** | 02 | A Â· S01 Chaos / S02 Fragmented Info / S03 HomePlus | MEDIUM | **ACTIVE** | RC-07 | MOTION | - | YES | Only emphasis in the scene is a 1.8% scale - below legibility threshold. |
| CN-024 | **A-12** | 02 | A Â· S01 Chaos / S02 Fragmented Info / S03 HomePlus | MEDIUM | **ACTIVE** | RC-10 | VISUAL | - | YES | Visible glow behind the reveal where the master forbids one. |
| CN-026 | **A-13** | 02 | A Â· S01 Chaos / S02 Fragmented Info / S03 HomePlus | MEDIUM | **ACTIVE** | RC-06 | MOTION | - | YES | No attention reset between saturation and the first location. |
| CN-033 | **B-17** | 02 | B Â· S04 Home / S05 Planner / S06 Family / S07 Coordinar no es vigilar | MEDIUM | **ACTIVE** | RC-11 | PRODUCT | - | NO | Familia lists 3 of 4 members and omits the phone's own user. List integrity + a11y. |
| CN-052 | **D-05** | 03 | D Â· S09 Finance | MEDIUM | **ACTIVE** | RC-10 | VISUAL | CROSS-LINK N-24 | YES | Finance anatomy diverges from the target: section headings, balance treatment, and a fourth brand colour. |
| CN-055 | **C-06** | 03 | C Â· S08 Plans + Inventory | MEDIUM | **ACTIVE** | RC-07 | VISUAL | - | YES | Instantaneous unsignalled layout-and-type mutation used as focus; makes the clip worse. |
| CN-056 | **E-06** | 03 | E Â· S10 Assets + HomeCloud | MEDIUM | **ACTIVE** | RC-04 | VISUAL | N-29 CORRECTS THE REASON | YES | Nota de voz drawn. N-29: the master's prohibition is STALE (HC_V2:316 approves audio); the ACTIVE rule is HC_V2:334 'no fake waveform', which the drawn waveform violates. |
| CN-057 | **D-06** | 03 | D Â· S09 Finance | MEDIUM | **ACTIVE** | RC-14 | PRODUCT | - | YES | Pagos and Limites answer two questions only incidentally; Limites is absent. |
| CN-058 | **C-07** | 03 | C Â· S08 Plans + Inventory | MEDIUM | **ACTIVE** | RC-01 | PRODUCT | - | YES | Plan card has no Event identity: no time, no owner, no relation to the Event the narration names. |
| CN-060 | **D-07** | 03 | D Â· S09 Finance | MEDIUM | **ACTIVE** | RC-06 | TIMING | - | YES | Resumen is on screen before Gaby says 'Resumen'; the monthly figure precedes the question asking for it. |
| CN-062 | **E-08** | 03 | E Â· S10 Assets + HomeCloud | MEDIUM | **ACTIVE** | RC-11 | PRODUCT | CROSS-LINK N-33 | YES | Birthday callback is on the wrong date and never named. MASTER 2.5 mandatory recurrence broken. |
| CN-063 | **C-08** | 03 | C Â· S08 Plans + Inventory | MEDIUM | **ACTIVE** | RC-03 | NARRATIVE | - | YES | Narration copied to the screen at 68 px for exactly one state. MASTER 2.3. |
| CN-064 | **E-09** | 03 | E Â· S10 Assets + HomeCloud | MEDIUM | **ACTIVE** | RC-11 | PRODUCT | - | NO | Assets list contains three objects absent from the target dataset and they never recur. |
| CN-068 | **E-10** | 03 | E Â· S10 Assets + HomeCloud | MEDIUM | **ACTIVE** | RC-01 | MOTION | - | YES | Assets to HomeCloud is a 480 px slide; the two PS5 documents are separate DOM instances at different y. N-31: the relation is editorial until Integration exists. |
| CN-073 | **E-13** | 03 | E Â· S10 Assets + HomeCloud | MEDIUM | **ACTIVE** | RC-08 | MOTION | - | YES | Scene E exit destroys HomeCloud at full opacity instead of lowering exposure first. |
| CN-091 | **G-07** | 04 | G Â· S12 Frontend/Backend + S13 Stack | MEDIUM | **ACTIVE** | RC-08 | MOTION | - | NO | The horizontal bridge line is decorative and survives into S14 as an unexplained mark. |
| CN-094 | **H-08** | 04 | H Â· S14 Barrier | MEDIUM | **ACTIVE** | RC-08 | MOTION | - | NO | The route arrows are static glyphs; motion does not convey depth. |
| CN-097 | **H-10** | 04 | H Â· S14 Barrier | MEDIUM | **ACTIVE** | RC-10 | VISUAL | - | YES | The question's typography deviates from the freeze. |
| CN-100 | **H-11** | 04 | H Â· S14 Barrier | MEDIUM | **ACTIVE** | RC-03 | NARRATIVE | - | YES | The barrier line is an implementation invention with no script referent. |
| CN-103 | **G-13** | 04 | G Â· S12 Frontend/Backend + S13 Stack | MEDIUM | **ACTIVE** | RC-08 | MOTION | - | NO | The mono-to-brand-colour logo crossfade carries no information. |
| CN-121 | **I-07** | 05 | I Â· S15/S16/S17 Homi | MEDIUM | **ACTIVE** | RC-06 | TIMING | - | YES | Empty Homi state re-shown as S16_step00 after a 5-state conversation. Wasted state. |
| CN-140 | **I-19** | 05 | I Â· S15/S16/S17 Homi | MEDIUM | **ACTIVE** | RC-09 | UX | - | YES | No cancel path in S15; weak label 'Ahora no' in S17. MASTER I3 requires Cancelar. |
| CN-141 | **I-20** | 05 | I Â· S15/S16/S17 Homi | MEDIUM | **ACTIVE** | RC-03 | VISUAL | - | YES | Two competing stage headlines cross-fade. MASTER I13 specifies no headline. |
| CN-143 | **I-22** | 05 | I Â· S15/S16/S17 Homi | MEDIUM | **ACTIVE** | RC-15 | VISUAL | - | YES | Proposal and answer are the same CSS class, so the audience cannot distinguish proposal / answer / decision. |
| CN-145 | **I-24** | 05 | I Â· S15/S16/S17 Homi | MEDIUM | **ACTIVE** | RC-08 | MOTION | - | YES | 0 transition animations at all three scene-I boundaries except s18-veil-in. Hard cuts. |
| CN-149 | **I-28** | 05 | I Â· S15/S16/S17 Homi | MEDIUM | **ACTIVE** | RC-11 | PRODUCT | N-22 RELATES | NO | '12 movimientos' is renderable in the Figma movement-filter sheet, not in Resumen. A composition choice, not a truth conflict. Use the filter sheet. |


### 2.2 ACTIVE LOW

| CANONICAL ID | SOURCE ISSUE ID | SRC SESS | SCENE | RAW SEVERITY | CANONICAL STATUS | ROOT CAUSE | DOMAIN | SUPERSEDES / DUPLICATES | S7? | NOTES |
|---|---|---|---|---|---|---|---|---|---|---|
| CN-027 | **A-14** | 02 | A Â· S01 Chaos / S02 Fragmented Info / S03 HomePlus | LOW | **ACTIVE** | RC-07 | VISUAL | - | YES | Physical objects below the master minimum size. |
| CN-035 | **B-18** | 02 | B Â· S04 Home / S05 Planner / S06 Family / S07 Coordinar no es vigilar | LOW | **ACTIVE** | RC-14 | UX | RE-EVIDENCED BY N-30 | YES | Lugares tab permanently dead. Session 6 records Lugares as a gap note, not a presentable surface. |
| CN-096 | **H-09** | 04 | H Â· S14 Barrier | LOW | **ACTIVE** | RC-15 | VISUAL | N-17 EXPLAINS THE MECHANISM | NO | .s13-center re-asserts 'visibility: visible', so the echo's hidden subtree is not robustly hidden. This is why Session 1's text table found S14 residue. Raw LOW is correct and unchanged. |
| CN-107 | **G-17** | 04 | G Â· S12 Frontend/Backend + S13 Stack | LOW | **ACTIVE** | RC-15 | VISUAL | - | NO | Off-token colours and one dead CSS rule. |
| CN-132 | **J-13** | 05 | J Â· S18 Closing | LOW | **ACTIVE** | RC-10 | VISUAL | - | NO | S18 field is #060404 not literal #000000. Functionally black; consistent with N-05. Low. |
| CN-144 | **I-23** | 05 | I Â· S15/S16/S17 Homi | LOW | **ACTIVE** | RC-08 | MOTION | - | NO | Identity chip and answer card share an identical curve and duration. 'Everything animates, nothing stands out'. |
| CN-146 | **I-25** | 05 | I Â· S15/S16/S17 Homi | LOW | **ACTIVE** | RC-10 | VISUAL | - | NO | Papa's avatar #4A4542 neutral grey reads as disabled against Juli gold and Tomi blue. |


---

## 3. OPEN DECISIONS

**These are the ONLY genuinely unresolved items in the corpus.** Each has a named owner and a named decision.

| CANONICAL ID | SOURCE ISSUE ID | SRC SESS | SCENE | RAW SEVERITY | CANONICAL STATUS | ROOT CAUSE | DOMAIN | SUPERSEDES / DUPLICATES | S7? | NOTES |
|---|---|---|---|---|---|---|---|---|---|---|
| CN-029 | **A-15** | 02 | A Â· S01 Chaos / S02 Fragmented Info / S03 HomePlus | SCRIPT_ISSUE_UNGRADED | **OPEN_DECISION** | RC-05 | SCRIPT | SOURCE OF N-28 | YES | Script enumerates 3 locations; MASTER 18 canon has 4. Script owner must align. Not rewritten here (N-44). |
| CN-039 | **B-22** | 02 | B Â· S04 Home / S05 Planner / S06 Family / S07 Coordinar no es vigilar | SCRIPT_ISSUE_UNGRADED | **OPEN_DECISION** | RC-05 | SCRIPT | SOURCE OF N-28 | YES | Two layers: (i) L91 mis-attributes 'conversaciones' to Familia (=SI-05); (ii) NEW - the word 'Feed' names a module neither target has as a current surface (=SI-24). |
| CN-089 | **G-06** | 04 | G Â· S12 Frontend/Backend + S13 Stack | HIGH | **OPEN_DECISION** | RC-17 | SCRIPT | N-16, N-28, SI-10 | YES | Technology order follows the current script, regressing the master canon. MASTER 11 G4 + NO-UI 13 say Figma FIRST; script L318 says fourth. Two masters agree against the script, but ordering is spoken wording - the script owner decides. NOT decided by timestamps. |
| CN-098 | **G-10** | 04 | G Â· S12 Frontend/Backend + S13 Stack | HIGH | **OPEN_DECISION** | RC-17 | NARRATIVE | N-16, SI-10 | YES | Figma placed between frontend and backend, encoding a false architecture. Blocked by the same unresolved ordering as G-06. |
| CN-114 | **J-04** | 05 | J Â· S18 Closing | MEDIUM | **OPEN_DECISION** | RC-16 | SCRIPT | N-25, N-28, SI-23 | YES | Closing names mochila/factura/heladera; opening established seguro/garantia/heladera. Only 1 of 3 overlaps. MASTER 2.5 requires same-object recurrence and forbids 'versiones parecidas'. Owner = script owner. NOT rewritten here. |
| CN-136 | **J-16** | 05 | J Â· S18 Closing | NONE | **OPEN_DECISION** | RC-05 | SCRIPT | N-28, SI-08 | YES | Impossible condition at L442: the active speaker is Benja, Colo speaks at L462. Condition can never be satisfied. Owner = script owner. |
| CN-137 | **J-17** | 05 | J Â· S18 Closing | NONE | **OPEN_DECISION** | RC-05 | SCRIPT | N-28, SI-09 | YES | Ghost content at L490: no 'hipotesis' exists in the script. The author marked missing content. Owner = script owner. |
| CN-138 | **J-18** | 05 | J Â· S18 Closing | NONE | **OPEN_DECISION** | RC-05 | SCRIPT | N-28, SI-01, N-21 | YES | Stale naming: script says Geni at L446, runtime says Homi. MASTER:1662 already orders 'Geni -> Homi' but the script was never re-issued. Blocks the S14-to-S15 reveal. Owner = script owner. |


### 3.1 Does any of these block Session 7?

| Open decision | Blocks Session 7 motion / stagecraft? | Why |
|---|---|---|
| `G-06` technology order | **NO** | Session 7 designs the *stage*. The order decides which beat lands when. Both orders are stageable. Blocks copy adjudication, not choreography. |
| `G-10` Figma between frontend / backend | **NO** | Same. If the order changes, one logo moves. |
| `J-04` closing object vocabulary | **NO** | Session 7 can choreograph recurrence using objects the opening actually established (`N-25`). Blocked on the script owner, not on motion. |
| `A-15` spoken location count | **NO** | Copy only. |
| `B-22` "conversaciones" / "Feed" wording | **NO** | Copy only. `N-36` already fixes how the beat must be presented regardless. |
| `J-16` impossible condition L442 | **NO** | Script marker. |
| `J-17` ghost "última hipótesis" L490 | **NO** | Script marker. |
| `J-18` `Geni` vs `Homi` at L446 | **NO** | Touches the S14→S15 reveal *wording*, not its motion. |

**None of the 8 blocks Session 7.** See `00_SESSION7_GATE.md`.

---

## 4. RESOLVED BY AUTHORITY

⚠ **RAW SEVERITY IS PRESERVED IN EVERY ROW BELOW.** These are not dismissals — each was a real defect that authority has since settled.

| CANONICAL ID | SOURCE ISSUE ID | SRC SESS | SCENE | RAW SEVERITY | CANONICAL STATUS | ROOT CAUSE | DOMAIN | SUPERSEDES / DUPLICATES | S7? | NOTES |
|---|---|---|---|---|---|---|---|---|---|---|
| CN-054 | **C-05** | 03 | C Â· S08 Plans + Inventory | HIGH | **RESOLVED_BY_AUTHORITY** | RC-17 | PRODUCT | N-06, N-20, N-32, N-33 | YES | The Shopping List capability claim itself is resolved (excluded by name, 3x). Residual: a static teaser card with no list is still on stage. Approved chain is Restock Need. |
| CN-134 | **J-15** | 05 | J Â· S18 Closing | MEDIUM | **RESOLVED_BY_AUTHORITY** | RC-10 | VISUAL | N-24 RESOLVES IT | YES | RAW SEVERITY = MEDIUM, unchanged. CANONICAL = RESOLVED_BY_AUTHORITY. #E7643F is the frozen brand orange (MASTER:74 + NO-UI:197 + Figma-app index.css:10). #E65C1B is a stale implementation token. Decided by authority, NOT aesthetics. |
| CN-135 | **I-15** | 05 | I Â· S15/S16/S17 Homi | BLOCKER | **RESOLVED_BY_AUTHORITY** | RC-11 | PRODUCT | N-22 RESOLVES IT | YES | RAW SEVERITY = BLOCKER, unchanged. CANONICAL = RESOLVED_BY_AUTHORITY. NO-UI 18 lines 1275-1280 freeze the Finance demo dataset, which is sufficient authority. Target: ONE consistent dataset across S09 + Homi. |
| CN-147 | **I-26** | 05 | I Â· S15/S16/S17 Homi | HIGH | **RESOLVED_BY_AUTHORITY** | RC-13 | PRODUCT | N-21 RESOLVES IT | YES | RAW SEVERITY = HIGH, unchanged. CANONICAL = RESOLVED_BY_AUTHORITY as a three-axis statement: CURRENT not implemented / PRODUCT FREEZE not implemented in that freeze / PRESENTATION is a concept. Session 5's absolute wording ('Homi is not a product feature') is WITHDRAWN as unsupported. |
| CN-148 | **I-27** | 05 | I Â· S15/S16/S17 Homi | MEDIUM | **RESOLVED_BY_AUTHORITY** | RC-17 | PRODUCT | N-23 RESOLVES IT | YES | RAW SEVERITY = MEDIUM, unchanged. Its stated reason ('master example not reproducible') is WITHDRAWN: the master example is valid canon; the prototype cannot yet render it. Do NOT change 19:00. |


### 4.1 Why each resolved, in one line each

| ID | Raw | Decided by | The deciding evidence |
|---|---|---|---|
| `C-05` | HIGH | **`N-06`** | `HOMePLUS_INVENTORY_PRODUCT_FREEZE_V1.0.md:802` *"No es una Shopping List."* · `:977` *"No es una entidad Shopping List independiente."* · `:2120` *"- duplicate Shopping List;"* — three exclusions by name. An unfrozen V1.1 candidate inside a chat export cannot override a frozen V1.0. |
| `I-15` | **BLOCKER** | **`N-22`** | `NO_UI:1275-1280` §18 DEMO DATA CANON freezes `Supermercado $48.720 / Monthly supermarket $184.320 / 12 movimientos / Nafta $32.500 / PS5 Mar 2024 · $580.000`. Frozen *presentation* canon is sufficient authority here, and no Finance Product Truth rule is violated by any of the three competing datasets. |
| `I-26` | HIGH | **`N-21`** | Session 5 absolute wording (*"Homi is not a product feature"*) is unsupported and is **withdrawn**. Replaced by a three-axis statement: CURRENT not implemented / PRODUCT FREEZE not implemented in that freeze / PRESENTATION is a concept. |
| `I-27` | MEDIUM | **`N-23`** | `19:00` is frozen canon (`NO_UI:1265`, `:1284`). Product Truth sets no time restriction (`202606210003_schedules.sql:14-17`, unconstrained `time`); Integration `ActionSheet.tsx:184-185` offers 0–23 h. A Figma picker gap cannot rewrite canon. |
| `J-15` | MEDIUM | **`N-24`** | `#E7643F` is declared the HomePlus orange in **two** frozen masters (`MASTER:74`, `NO_UI:197`) and is what `Figma-app/src/index.css:10` uses. `#E65C1B` appears in **zero** authoritative documents. Decided by authority, not aesthetics. |

### 4.2 What "resolved" does NOT mean here

| | |
|---|---|
| ⛔ | It does **not** mean the defect was imagined. |
| ⛔ | It does **not** mean the underlying work is done. `C-05` still has a static teaser card on stage; `I-06` still has no Finance surface; `J-15` still has a stale token in the code. |
| ✅ | It means **no further audit decision is required** — the answer is written down and authority-backed. |

---

## 5. SUPERSEDED

**No *issue* in the corpus is wholly superseded.** Supersession in this campaign applies to **measurements and statements**, not to graded findings — a graded finding was real when it was graded, and stays real.

Superseded material lives in exactly two places, both complete:

| Where | What | Count |
|---|---|---|
| `00_AUDIT_NORMALIZATION.md` **§N-40** | the consolidated Session-1 measurement-artefact index — Planner 137 px, HomeCloud 40×40, `getAnimations()` wording, S14 text-table, orange token, 117 migrations | 6 |
| `00_CROSS_SESSION_CONFLICTS.md` | 20 cross-session conflicts, each with source A, source B, authority and resolution | 20 |

**The one Session-3 *inference* withdrawn (its raw observation is preserved) — `N-07`:** Session 3 reported Inventory / Shopping as *"NOT PRESENT as a surface"* in Figma-app. Session 6 reached `src/inventory/InventoryRoot.tsx`, `Products.tsx`, `ShoppingList.tsx`, `src/screens/Shopping.tsx`. Canonical: **NOT REACHED IN THAT HARVEST** — not *absent from Figma-app*.

---

## 6. DUPLICATES / SUBSUMED

**SUBSUMED: 2.** Both were declared by Session 4 **inside the severity field itself**, and both are accepted as given — the audit does not second-guess a session's own subsumption, and it does not recover the absorbed issue as `ACTIVE`.

| CANONICAL ID | SOURCE ISSUE ID | SRC SESS | SCENE | RAW SEVERITY | CANONICAL STATUS | ROOT CAUSE | DOMAIN | SUPERSEDES / DUPLICATES | S7? | NOTES |
|---|---|---|---|---|---|---|---|---|---|---|
| CN-084 | **F-04** | 04 | F Â· S11 Continuity | HIGH | **SUBSUMED** | RC-02 | NARRATIVE | SUBSUMED BY F-01 (self-declared in the raw severity field) | YES | No relation layer, so 'todos relacionados entre si' is unsupported. Recorded separately by Session 4 because it has an exact frozen specification. |
| CN-106 | **G-16** | 04 | G Â· S12 Frontend/Backend + S13 Stack | MEDIUM | **SUBSUMED** | RC-07 | VISUAL | SUBSUMED BY G-01 (self-declared in the raw severity field) | YES | The two cards are visually identical so 'frontend' and 'backend' are not distinguished. Recorded separately by Session 4 as the specific mechanism that makes G-F6 fail. |


### 6.1 DUPLICATE — none at the ID level

**Mechanical check performed:** the same issue ID appearing in more than one session. **Result: zero.** The `A-*` … `J-*` namespaces do not overlap across sessions; every raw ID is unique corpus-wide.

That is a real result and worth stating plainly, because it means the 149 rows are **149 distinct observations, not 149 labels for fewer things.**

### 6.2 Where the real duplication lives — the root-cause layer

Duplication is not in the IDs. It is in the **causes**. 149 raw issues collapse to **18 root causes**, and the three largest account for 41 of the 149:

| RC | Count | Share |
|---|---|---|
| `RC-02` product stage absent or inert | **18** | 12.1 % |
| `RC-06` visual state ≠ spoken beat | **13** | 8.7 % |
| `RC-08` scene-boundary motion missing | **10** | 6.7 % |

**The example named in the brief is honoured:** `G-01`, `G-03`, `G-04`, `G-05`, `G-15` (plus `F-01`, `F-04`, `H-01`, `H-12`) all share `RC-02 — PRODUCT ABSENT FROM STAGE`, and **all retain their separate raw issue IDs.** Likewise `I-01`, `I-02`, `I-04`, `I-05` group under the larger Homi conceptual failure, split across `RC-13` and `RC-01`.

---

## 7. ROOT CAUSES

**18 root causes for 149 raw issues.** Each raw issue keeps its ID and is linked to exactly one primary root cause.

| RC | Root cause | Issues | Raw BLOCKERs inside |
|---|---|---|---||
| **RC-01** | No semantic object survives any scene or module boundary (SHARED_ELEMENT substituted by DEVICE_TRANSITION) | **9** | 3 |
| **RC-02** | The product stage is absent or inert at the moment the narration needs it | **18** | 9 |
| **RC-03** | On-screen text duplicates or substitutes for the spoken narration | **9** | 0 |
| **RC-04** | Presentation asserts product capability that frozen authority does not support | **8** | 1 |
| **RC-05** | Frozen master text, delivered script and implementation disagree; the script was patched but never re-issued | **8** | 1 |
| **RC-06** | Visual state does not correspond to the spoken beat (timing / beat mismatch) | **13** | 3 |
| **RC-07** | Emphasis achieved by an illegal mechanism (layout-size mutation, decorative motion, fabricated scale) | **8** | 1 |
| **RC-08** | Scene-boundary motion vocabulary is missing (hard cuts, un-signalled cross-mounts) | **10** | 0 |
| **RC-09** | On-screen data semantics contradict the narration or Product Truth | **7** | 2 |
| **RC-10** | Colour-grammar and design-token discipline violations | **7** | 0 |
| **RC-11** | Demonstration data diverges across surfaces and against canon | **7** | 1 |
| **RC-12** | The closing argument has no states at all | **8** | 0 |
| **RC-13** | Homi is presented as an implemented current capability when it is a concept | **3** | 2 |
| **RC-14** | Navigation and route affordances fabricated or dead | **7** | 1 |
| **RC-15** | Hidden-subtree / echo robustness and list-integrity defects | **3** | 0 |
| **RC-16** | Cross-scene shared-object continuity is not maintained | **3** | 1 |
| **RC-17** | Product authority is unresolved, contradicted or self-conflicting at source | **5** | 0 |
| **RC-18** | Scene state budget too small for the spoken narration | **6** | 4 |


### 7.1 Full root-cause membership

**RC-01 — No semantic object survives any scene or module boundary (SHARED_ELEMENT substituted by DEVICE_TRANSITION)**  (9)

*`B-10`* · *`C-04`* · *`C-07`* · *`D-09`* · *`E-10`* · *`D-11`* · *`C-11/D-10`* · *`F-05`* · *`I-02`*

**RC-02 — The product stage is absent or inert at the moment the narration needs it**  (18)

*`B-06`* · *`B-07`* · *`B-08`* · *`A-11`* · *`E-01`* · *`C-01`* · *`D-03`* · *`E-04`* · *`H-01`* · *`G-01`* · *`G-03`* · *`F-04`* · *`G-04`* · *`G-05`* · *`H-12`* · *`G-15`* · *`I-05`* · *`I-10`*

**RC-03 — On-screen text duplicates or substitutes for the spoken narration**  (9)

*`A-08`* · *`A-09`* · *`D-02`* · *`C-08`* · *`F-03`* · *`H-11`* · *`I-09`* · *`I-13`* · *`I-20`*

**RC-04 — Presentation asserts product capability that frozen authority does not support**  (8)

*`B-12`* · *`B-13`* · *`B-14`* · *`E-02`* · *`E-05`* · *`E-06`* · *`G-12`* · *`I-12`*

**RC-05 — Frozen master text, delivered script and implementation disagree; the script was patched but never re-issued**  (8)

*`A-04`* · *`B-09`* · *`A-15`* · *`B-22`* · *`C-02`* · *`J-16`* · *`J-17`* · *`J-18`*

**RC-06 — Visual state does not correspond to the spoken beat (timing / beat mismatch)**  (13)

*`A-02`* · *`A-05`* · *`A-13`* · *`C-03`* · *`D-07`* · *`G-02`* · *`F-02`* · *`H-04`* · *`H-07`* · *`G-11`* · *`J-02`* · *`I-07`* · *`J-11`*

**RC-07 — Emphasis achieved by an illegal mechanism (layout-size mutation, decorative motion, fabricated scale)**  (8)

*`B-03`* · *`B-05`* · *`A-10`* · *`B-11`* · *`A-14`* · *`C-06`* · *`H-05`* · *`G-16`*

**RC-08 — Scene-boundary motion vocabulary is missing (hard cuts, un-signalled cross-mounts)**  (10)

*`E-13`* · *`H-06`* · *`G-07`* · *`G-08`* · *`H-08`* · *`G-09`* · *`G-13`* · *`I-21`* · *`I-23`* · *`I-24`*

**RC-09 — On-screen data semantics contradict the narration or Product Truth**  (7)

*`B-01`* · *`B-02`* · *`B-04`* · *`B-19`* · *`D-04`* · *`I-03`* · *`I-19`*

**RC-10 — Colour-grammar and design-token discipline violations**  (7)

*`A-01`* · *`A-12`* · *`D-05`* · *`H-10`* · *`J-13`* · *`J-15`* · *`I-25`*

**RC-11 — Demonstration data diverges across surfaces and against canon**  (7)

*`B-17`* · *`E-03`* · *`E-08`* · *`E-09`* · *`I-11`* · *`I-15`* · *`I-28`*

**RC-12 — The closing argument has no states at all**  (8)

*`J-03`* · *`J-05`* · *`J-06`* · *`J-07`* · *`J-08`* · *`J-09`* · *`J-10`* · *`J-14`*

**RC-13 — Homi is presented as an implemented current capability when it is a concept**  (3)

*`I-01`* · *`I-04`* · *`I-26`*

**RC-14 — Navigation and route affordances fabricated or dead**  (7)

*`B-15`* · *`B-16`* · *`B-18`* · *`D-06`* · *`E-07`* · *`H-02`* · *`H-03`*

**RC-15 — Hidden-subtree / echo robustness and list-integrity defects**  (3)

*`H-09`* · *`G-17`* · *`I-22`*

**RC-16 — Cross-scene shared-object continuity is not maintained**  (3)

*`A-03`* · *`A-06`* · *`J-04`*

**RC-17 — Product authority is unresolved, contradicted or self-conflicting at source**  (5)

*`C-05`* · *`G-06`* · *`G-10`* · *`I-18`* · *`I-27`*

**RC-18 — Scene state budget too small for the spoken narration**  (6)

*`A-07`* · *`D-01`* · *`F-01`* · *`G-14`* · *`J-01`* · *`I-06`*



---

## 8. POSITIVES TO PRESERVE

Graded `POSITIVE` in the source registers. **These are not defects.** Session 7 must not "improve" them away.

| CANONICAL ID | SOURCE ISSUE ID | SRC SESS | SCENE | RAW SEVERITY | CANONICAL STATUS | ROOT CAUSE | DOMAIN | SUPERSEDES / DUPLICATES | S7? | NOTES |
|---|---|---|---|---|---|---|---|---|---|---|
| CN-031 | **A-16** | 02 | A Â· S01 Chaos / S02 Fragmented Info / S03 HomePlus | POSITIVE | **POSITIVE** | - | POSITIVE | - | NO | Preserve. First two beats of Scene A land correctly. |
| CN-034 | **A-17** | 02 | A Â· S01 Chaos / S02 Fragmented Info / S03 HomePlus | POSITIVE | **POSITIVE** | - | POSITIVE | - | NO | Preserve. The exhaustion of the opening is real and legible. |
| CN-037 | **B-20** | 02 | B Â· S04 Home / S05 Planner / S06 Family / S07 Coordinar no es vigilar | POSITIVE | **POSITIVE** | - | POSITIVE | - | NO | Preserve. Shell, segmented controls and navigation are faithful. |
| CN-038 | **B-21** | 02 | B Â· S04 Home / S05 Planner / S06 Family / S07 Coordinar no es vigilar | POSITIVE | **POSITIVE** | - | POSITIVE | N-05 GOVERNS | NO | Preserve, do not resize. S07 is a correct singular-concept screen. 132 px is an intentional semantic exception. |
| CN-061 | **D-08** | 03 | D Â· S09 Finance | POSITIVE | **POSITIVE** | - | POSITIVE | - | NO | Preserve. The Finance composition is a genuine readable summary surface with coherent numbers. |
| CN-066 | **C-09** | 03 | C Â· S08 Plans + Inventory | POSITIVE | **POSITIVE** | - | POSITIVE | - | NO | Preserve the Inventory-to-Shopping teaser as the correct narrative FUNCTION. The surface itself is not presented (N-06). |
| CN-067 | **C-10** | 03 | C Â· S08 Plans + Inventory | POSITIVE | **POSITIVE** | - | POSITIVE | - | NO | Preserve. S08_step01 selective exposure is the model for the whole scene. |
| CN-069 | **E-11** | 03 | E Â· S10 Assets + HomeCloud | POSITIVE | **POSITIVE** | - | POSITIVE | N-09 CORRECTS ITS SCOPE | NO | Preserve the instinct (raise the device). Its claim to be 'the only scene above 1.00' is FALSE - S15-S17 are also 1.08. See N-09 / N-41. |
| CN-072 | **E-12** | 03 | E Â· S10 Assets + HomeCloud | POSITIVE | **POSITIVE** | - | POSITIVE | - | NO | Preserve. The Documentos |
| CN-130 | **J-12** | 05 | J Â· S18 Closing | POSITIVE | **POSITIVE** | - | POSITIVE | - | NO | Preserve as-is. End card composition satisfies J-E2/E3/E4/E5. |


### 8.1 The KEEP list

| # | Keep | Source | Note |
|---|---|---|---|
| 1 | **S07 entire concept + 132 px** | `B-21` | **`N-05` is binding.** Intentional semantic exception. Do NOT reduce it to a generic 56–72 px "major concept" band. |
| 2 | Home / Planner **shell anatomy** where faithful | `B-20` | Segmented controls and navigation reproduce the target. |
| 3 | **Figma visual grammar** | `06 §26` | Not a graded row but a corpus-wide constraint: Figma is the visual authority. |
| 4 | **Finance product anatomy** | `D-08` | Composition order (period scope → tab row → balance → Pagos próximos → Por categoría) is correct. |
| 5 | **S08 selective exposure, `step01`** | `C-10` | Measured: bridge task `opacity 1.00` + `background rgb(246,237,232)`, siblings `0.55`, heading `0.6`. Built from the product's own tokens. **This is the model for the whole deck.** |
| 6 | HomeCloud `Documentos / Recuerdos` segmented control | `E-12` | Faithful reproduction of the target's domain switch. |
| 7 | **Homi chrome** | Session 5 §13 #1 | Real `HomeHeader` + real `homeTokens` + real app accent `#C96B45` + real `homi-mark.svg`. It looks like the product, not like a chatbot. |
| 8 | **Homi question-bubble invariance across personas** | Session 5 §13 #4 | Measured box `777,187,238,81`, byte-identical across Juli / Tomi / Papá. A genuine positive — it is the correct implementation of *"same question, different answers."* |
| 9 | **S18 end-card composition** | `J-12` | Logo 120 px + wordmark 64 px + 4 members + `Muchas gracias.` 76 px, generous negative space. Satisfies J-E2 … J-E5. |
| 10 | **Black-background discipline** | `H-P4`, `J-13`, `N-05` | `#060404` consistent across S07–S18. Functionally black on a projector. `J-13` stays `LOW`/`ACTIVE` (not literal `#000000`) but must not be "fixed" into inconsistency. |
| 11 | **Stable manual holds, no timers** | Session 4 §1 | Hold tests: zero drift, zero timers anywhere in the deck. Load-bearing for live delivery. |
| 12 | **Device scale 1.08 with stable internal geometry** | Session 5 §13 #2 + `E-11` | Promoted to a corpus rule by **`N-41`**. The correct enlargement lever. Do not replace it with internal layout mutation. |

### 8.2 Positives carrying a correction — read before using

| ID | Correction |
|---|---|
| `E-11` | Its **instinct** is preserved (raise the device). Its **claim to uniqueness is false** — `N-09`: S10 is the only enlarged scene *within C/D/E*; S15–S17 are also 1.08. See `N-41`. |
| `B-21` | Fully preserved. `N-05` protects the 132 px from any later typography-normalization pass. |

---

## 9. SESSION-7 RELEVANCE INDEX

**Of 149 issues, 126 are marked Session-7 relevant and 23 are not.** The `NO` rows are not discarded — they are Session-8 material, or polish that must not be allowed to consume Session-7 motion budget.

**The four Session-7-relevant root causes, by volume:**

| RC | S7-relevant members | Why Session 7 owns it |
|---|---|---|
| `RC-01` | 9 | Motion-family choice (`SHARED_ELEMENT` vs `DEVICE_TRANSITION`) is *literally* the Session-7 deliverable. |
| `RC-02` | 15 | Deciding what goes on stage, and when, is stagecraft. |
| `RC-06` | 13 | Beat↔speech correspondence is the core of `presentation-design`. |
| `RC-08` | 10 | Mapping motion primitives → the four declared families is the **explicit** Session-7 task (`00_AUDIT_CONTRACT.md` §5.2: *"El mapeo de primitivas → familias es UNKNOWN y es trabajo de Session 7"*). |

---

## 10. TRACEABILITY

| Requirement | Status |
|---|---|
| Every scene issue register mechanically counted | ✅ 149/149 rows; parser and its two traps documented in §0.2 |
| Executive-tally mismatches documented | ✅ §0.4 — Session 4 (+6), Session 5 blockers (+1), Session 5 issue count (−14) |
| Raw severity and canonical status kept separate | ✅ §0.1, §3, §4 |
| No candidate / unfrozen document overrides frozen Product Truth | ✅ `C-05` / `N-06` — the V1.1 chat-export candidate is rejected |
| Figma never creates Product Truth | ✅ `N-06`, `N-35`, `N-36` — a polished Figma Shopping List and a polished Figma Horarios screen create nothing |
| Integration never becomes visual authority | ✅ `N-13` — Assets is an APPROVED TARGET and still an implementation gap; Finance being "safe" is not a licence to redesign |
| File dates never automatically define authority | ✅ `N-16` (script 24/9 ≠ authority) vs `N-38` (Milestones, where date **plus** self-declared supersession **does** decide) |
| Shopping List normalized | ✅ `N-06` · `C-05` · `I-12` · `SI-18` |
| Feed normalized | ✅ `N-36` · `B-15` · `B-16` · `SI-24` |
| Home role normalized | ✅ `N-34` · `B-01` |
| Horarios normalized | ✅ `N-35` |
| ETA normalized | ✅ `N-03` + `N-30` · `B-12` · `B-13` · `B-14` |
| Assets semantics normalized | ✅ `N-13` + `N-37` · `E-02` · `D-09` · `H-02` |
| Homi / AI normalized | ✅ `N-14` + `N-21` · `G-12` · `I-26` |
| Finance dataset explicitly resolved or OPEN | ✅ **RESOLVED** by `N-22` — not OPEN |
| Session-1 measurement artefacts all marked | ✅ `N-40` — all 6 |
| Migration count reconciled | ✅ `N-26` — 117 → **110**, verified twice |
| Source reports remain traceable | ✅ `N-43`; only two executive tallies corrected in place |

---

**END OF CANONICAL ISSUE REGISTRY**