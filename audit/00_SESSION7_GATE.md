# 00 — SESSION 7 GATE

**Issued:** Global Audit Normalization pass, 2026-10-05.
**Purpose:** decide whether Session 7 (Motion / Stagecraft / Timing) may begin, and hand it the safe rules if so.
**Read first:** `00_AUDIT_NORMALIZATION.md` · `00_CANONICAL_ISSUE_REGISTRY.md` · `00_CROSS_SESSION_CONFLICTS.md`

---

# GATE: **GO**

**Session 7 may begin.** Every `NO-GO` condition was tested and none is present. The reasoning for each is below, including the three items that remain genuinely open and why none of them is one of them.

---

## 1. GATE CRITERIA — VERDICT PER CRITERION

| # | GO requires | Verdict | Evidence |
|---|---|---|---|
| 1 | All Sessions 2–6 complete | ✅ **PASS** | §2 below |
| 2 | Production integrity clean | ✅ **PASS** | §3 below |
| 3 | Known measurement errors normalized | ✅ **PASS** | §4 below |
| 4 | Raw issue counts reconciled | ✅ **PASS** | §5 below |
| 5 | Product Truth conflicts resolved, made presentation-safe, or explicitly editorialized | ✅ **PASS** | §6 below |
| 6 | No unresolved conflict prevents motion / stagecraft analysis | ✅ **PASS** | §7 below |

---

## 2. CRITERION 1 — Sessions 2–6 complete and stable

| File | Bytes | Expected final sections present | Verification section | Production files modified | Truncation / TODO |
|---|---|---|---|---|---|
| `02_SCENES_A_B_AUDIT.md` | 299 736 | ✅ §1 verdict … §23 Verification | ✅ §23 | ✅ `NONE` (§22) | none |
| `03_SCENES_C_E_AUDIT.md` | 188 610 | ✅ §1 verdict … §34 Verification | ✅ §34 | ✅ `NONE` (§33) | none |
| `04_SCENES_F_H_AUDIT.md` | 185 151 | ✅ §1 verdict … §37 Verification | ✅ §37 | ✅ `NONE` (§36) | none |
| `05_SCENES_I_J_AUDIT.md` | 148 362 | ✅ §1 verdict … §36 Verification | ✅ §36 | ✅ `NONE` (§35) | none |
| `06_FIGMA_VS_INTEGRATION.md` | 201 211 | ✅ §1 verdict … §33 Verification + §33.5 verdict | ✅ §33 | ✅ `NONE` (§32) | none |

**Also present:** `00_SOURCE_MAP.md` (57 718) · `00_AUDIT_CONTRACT.md` (29 637) · `00_HUMAN_HYPOTHESES.md` (65 541) · `00_SESSION_PLAN.md` (26 199) · `01_RUNTIME_BASELINE.md` (91 553) · `01_RUNTIME_BASELINE_ERRATA.md` (5 322).

**Structural check performed:** every session report ends in a Verification section with a command transcript and an explicit verdict; every report has a *Production files modified* section reading `NONE`; no `TODO`, `TBD`, or truncation marker anywhere. **Corpus is complete and stable.**

---

## 3. CRITERION 2 — Production integrity

**Method: fresh SHA-256 manifest, compared against Session 1's post-session manifest. Hashes, not timestamps.**

```
SCOPE: package root minus audit/, node_modules/, .git/, .agents/

BASELINE (audit/runtime/session-01/_integrity/manifest-after.csv) : 159 files / 2,572,474 bytes
CURRENT  (recomputed this pass)                                  : 159 files / 2,572,474 bytes

ADDED                   : 0
REMOVED                 : 0
SHA-256 CONTENT CHANGED : 0
LENGTH CHANGED ONLY     : 0
MTIME CHANGED ONLY      : 0
BYTE+MTIME IDENTICAL    : 159 / 159
```

**GATE = PASS.** Production is byte-identical **and** mtime-identical to the state Session 1 left it in. No audit session mutated production.

**A note on method, because the first attempt produced a false alarm:** comparing relative paths after normalising separators to `/` reported 147 "added" and 147 "removed". That was a **path-separator artefact** — Session 1's manifest stored Windows backslash paths. Re-run using the exact on-disk relative-path form: zero differences. *Recording this because a false "147 files changed" is exactly the kind of result that gets acted on.*

**External repositories:**

| Repo | State | Action taken |
|---|---|---|
| `Figma-app` | not a git repository (consistent with Session 0) | **read-only** — nothing written |
| `Family-Hub-Own-integration` | branch `gps-ux-recovery`, HEAD `20c5a34`; **pre-existing** uncommitted state: 6 deleted `.docx`/`.make`/`.md` artifacts and 28 untracked `T2_0_*.md` planner documents | **read-only** — pre-existing state preserved untouched, not cleaned, not staged, not committed |
| script / masters / Product Truth | in `Downloads\` | **read-only** |

The Integration working tree was already dirty when this pass began. Those files are product/planner work unrelated to the audit and **were not created, modified, staged or removed by this pass.** `git status --short` confirms the same set. No `reset`, no `clean`, no `checkout`, no `stash`, no `commit`, no `push`, no branch or worktree creation.

**Packages installed: none.**

---

## 4. CRITERION 3 — Measurement errors normalized

All six Session-1 artefacts are indexed and corrected in `N-40`. No Session-1 evidence was discarded.

| Session-1 claim | Status | Canonical |
|---|---|---|
| Planner tab `82 → 137 px` growth | **SUPERSEDED** | max **84 px**; pill translates; tabs do not resize (`N-02`) |
| HomeCloud thumbnails `40×40 → 98×62` authored enlargement | **SUPERSEDED** | `40×40` = mounted-hidden collapsed; `98×62` = settled. **No authored enlargement.** (`N-08`) |
| 2 animations *"still running"* | **WORDING CORRECTED** | count real; **finished** `fill-mode:both` glows (`N-10`) |
| `Figma · Diseño · IA` at S14 final state | **RECLASSIFIED** | text-table / hidden-subtree artefact; settled frame is clean (`N-17`) |
| stage accent `#E65C1B` | **RESOLVED** | `#E7643F` is the frozen brand orange (`N-24`) |
| 117 migrations | **SUPERSEDED** | **110**, verified twice (`N-26`) |

**Session-3 statement corrected:** `N-07` — Inventory/Shopping *"not reached in that harvest"*, not *absent from Figma-app*.

**Session-3 measurement re-verified rather than re-measured:** `N-09` — the "S10 is the only scene above 1.00" claim is false; S15–S17 are also 1.08. Two sessions' committed measurements are **compatible**, so per the spot-re-measurement rule **nothing was re-measured** and no new runtime evidence was required.

---

## 5. CRITERION 4 — Raw issue counts reconciled

**All four scene registers were parsed mechanically. Executive summaries were not trusted.**

| Session | Rows | RAW BLOCKER | RAW HIGH | RAW MEDIUM | RAW LOW | POSITIVE | ungraded | Executive claim | Verdict |
|---|---|---|---|---|---|---|---|---|---|
| 02 | 39 | **3** | 23 | 5 | 2 | 4 | 2 | 3 | ✅ |
| 03 | 34 | **6** | 12 | 11 | 0 | 5 | 0 | *(none published)* | ✅ |
| 04 | 34 | **12** | 14 | 6 | 2 | 0 | 0 | **6** | ❌ `N-11` |
| 05 | 42 | **8** | 18 | 9 | 3 | 1 | 3 | **7** / *"28 issues"* | ❌ `N-18`, `N-19` |
| **TOTAL** | **149** | **29** | **67** | **31** | **7** | **10** | **5** | | |

- **RAW BLOCKERS = 29** (was published as 3 + 6 + 12 + 8)
- **ACTIVE CANONICAL BLOCKERS = 28** (`I-15` is `RESOLVED_BY_AUTHORITY`; its raw `BLOCKER` is preserved)
- **Session 5 registered issues = 42**, not 28 (`24` × `I-*` + `18` × `J-*`)

**Corrections applied in place, minimally:** the two demonstrably wrong executive blocker tallies in `04` and `05`, plus a normalization notice at the top of `03`, `04`, `05`, `06`. **No issue severity was altered anywhere.**

**Two parsing traps documented because they change the answer:** the combined ID `C-11/D-10` (a naive `[A-J]-\d\d` scan drops it and loses a `BLOCKER`), and the two register formats (Sessions 2–4 use heading blocks, Session 5 uses tables — a single-format parser returns zero for Session 5). `N-42`.

---

## 6. CRITERION 5 — Product Truth conflicts

**All four Session-6 P0s are resolved. None is left as an unavoidable conflict.**

| P0 | Verdict | Presentation-safe outcome | Blocks S7? |
|---|---|---|---|
| **P0-01** Shopping List | ❌ **NOT APPROVED** — excluded by name 3× in frozen Inventory V1.0 | ⛔ Not shown as a working capability. ✅ Show the approved chain: `LOW/OUT → Restock Need → approval → Planner Task`. | **NO** |
| **P0-02** Feed vs Conversation | ✅ **Feed REMAINS approved Product Truth** (`FEED_PRODUCT_FREEZE_V1.0:34`) · ⛔ Figma visual-target gap · ⛔ Integration implementation gap | ✅ Represent Feed semantics **editorially**. ⛔ Do not pretend Conversation is the real Feed route. | **NO** |
| **P0-03** Horarios | ⛔ **No Product Truth exists.** Code + polished design ≠ authority | ⛔ No standalone `Horarios` surface. ✅ Use Planner / Calendar / Event for time. Canonical Planner = 3 tabs. | **NO** |
| **P0-04** Home by role | ✅ **Role projection approved; duplicated modules forbidden** (`INV-HOME-002`, `:961`/`:965`) | ✅ **ONE Home + a presentation-controlled role projection.** ⛔ No separate "Home Juli" module. | **NO** |

**All other cross-session product normalizations are recorded and presentation-safe:** Map / ETA (`N-03`, `N-30`) · Assets (`N-13`, `N-31`, `N-37`) · HomeCloud audio (`N-29`) · Inventory→Finance (`N-32`) · Finance dataset (`N-22`) · Milestones (`N-38`) · Feed scope (`N-39`) · cross-module navigation default (`N-33`).

**Finance dataset: RESOLVED, not OPEN** — `NO_UI §18:1275-1280` is a frozen presentation canon and is sufficient authority. One consistent dataset across S09 + Homi: `Supermercado $48.720` / `Monthly supermarket $184.320` / `12 movimientos` / `Nafta $32.500` / `PS5 Mar 2024 · $580.000` (as a **Finance movement**). **No fourth dataset was invented.**

---

## 7. CRITERION 6 — Nothing unresolved prevents motion / stagecraft analysis

### 7.1 The three genuinely open items, and why none is a blocker

| Open item | Nature | Why it does not block Session 7 |
|---|---|---|
| **`CF-08` — Map ETA / distance / travel time** | A **genuine authority conflict**: `MASTER §6 B5` asks for `8 min`; Product Truth and Integration have none. | Not resolvable by the audit and **not resolved artificially**. But the **presentation-safe rule already binds every session**: show place · recency · presence/status · sharing state; fabricate no proximity. Session 7 designs *how* supported information appears — a fully determined problem. |
| **`CF-15` — technology ordering** | **SCRIPT / MASTER CONFLICT.** Master + NO-UI say Figma first; script says fourth. | **Both orders are stageable.** The conflict decides which beat lands when, not whether a stage exists. ⛔ Must not be resolved from file timestamps (`N-16`). |
| **`CF-20` — closing object vocabulary** | Script names `mochila`, which the opening never established. | `MASTER §2.5` requires same-object recurrence, and the objects the opening **did** establish are known (`bolsa`, `factura`/`seguro`, `heladera`, `garantía`). Session 7 can choreograph recurrence **from the established set**. Owned by the script owner, not by motion. |

**Plus 8 canonical `OPEN_DECISION` issues** (`A-15`, `B-22`, `G-06`, `G-10`, `J-04`, `J-16`, `J-17`, `J-18`) — **all copy or script-wording items. None is a blocker.** Itemised with reasons in `00_CANONICAL_ISSUE_REGISTRY.md` §3.1.

### 7.2 The NO-GO conditions, each explicitly tested and rejected

| NO-GO condition | Tested? | Result |
|---|---|---|
| Report incomplete / corrupt | ✅ | **NO** — all 5 scene reports complete, verified, untruncated |
| Production mutated unexpectedly | ✅ | **NO** — 159/159 byte- and mtime-identical |
| A central Product Truth conflict cannot be avoided | ✅ | **NO** — every Product Truth conflict is either resolved by authority or made presentation-safe by excluding the unsupported capability |
| Two authoritative sources genuinely contradict in a way that changes Session-7 choreography | ✅ | **NO** — `CF-15` is the only authority-vs-authority conflict and it does not change choreography (both orders stageable). `CF-08` is authority-vs-authority but its safe rule is already fixed and binding. |
| Essential evidence missing | ✅ | **NO** — 149/149 register rows parsed; every decisive authority line was opened and quoted verbatim this pass |

### 7.3 Why NO-GO was explicitly *not* used for these

The brief forbids NO-GO for a specific list. Each is confirmed absent as a ground for NO-GO:

| Forbidden ground for NO-GO | Present? |
|---|---|
| minor copy questions | **No** — the 8 open decisions are copy items and are documented as non-blocking |
| demo-data values that can be canonically selected | **No** — `N-22` canonically selected them |
| implementation gaps already representable editorially | **No** — Assets, Feed, Shopping, Inventory→Finance and cross-module nav are all explicitly editorialized (`N-13`, `N-30`, `N-31`, `N-32`, `N-33`, `N-36`) |
| prototype visual differences | **No** — `N-23` records the 19:00 picker gap as a prototype gap and forbids changing canon to match it |

---

## 8. SESSION-7 SAFE RULES

**These are handed to Session 7. Each was verified against frozen authority this pass. Do not force any of them if fresh evidence disproves it — report instead.**

### 8.1 Authority order — the one rule that governs everything else

| | |
|---|---|
| **Product Truth** | = **capability authority.** Limits what may be claimed. Nothing outranks it. |
| **Figma** | = **visual / UX target.** ⛔ **Never creates Product Truth**, however polished the interaction. |
| **Integration** | = **functional CURRENT.** ⛔ **Never becomes visual authority**, merely because it works. |
| **Presentation Master / NO-UI Master** | narrative + visual intent, execution + motion principles. Both **subordinate** to module Product Freeze (`MASTER:6`). |
| **Script** | delivered spoken wording. |
| **Human walkthrough** | hypothesis source. Verify; never accept or discard blind. |

### 8.2 Capability rules — bind every beat

| # | Rule | Authority |
|---|---|---|
| 1 | ⛔ **No Shopping List as a current capability.** Show `LOW/OUT → Restock Need → approval → Planner Task` instead. | `INVENTORY:802, 977, 2120` · `N-06` |
| 2 | ⛔ **No fake ETA.** ⛔ No distance. ⛔ No travel time. ⛔ No global family location master switch — sharing is individual/contextual. Figma map pins are illustrative positions, not geography. | `N-03` + `N-30` |
| 3 | ✅ **Feed capability is approved; visual target and current implementation are gaps.** Represent it **editorially**; ⛔ never label Conversation as the Feed route. | `FEED:34` · `N-36` |
| 4 | ✅ **Role Home = ONE Home with a presentation-controlled role projection.** ⛔ No separate "Home Juli" module. | `INV-HOME-002 :961/:965` · `N-34` |
| 5 | ⛔ **No standalone `Horarios` surface** without Product Truth. Use Planner / Calendar / Event. ⛔ No 4th Planner tab; `Responsibilities` is a row inside `Tareas`; ⛔ no Milestones. | `N-35` · `N-38` |
| 6 | ✅ **Assets = supported target + implementation gap.** ⛔ `Home → Assets → PS5 → Documentos` is **not** real navigation. Editorial until Integration exists. | `ASSETS_V2:5` · `N-13` · `N-31` |
| 7 | ✅ **Assets/HomeCloud relation is editorial / shared-element / device-transition** until the cross-module link is closed. | `MASTER:237` · `N-31` |
| 8 | ⛔ **No Asset-owned money, date or maintenance field.** `Mar 2024 · $580.000` appears **only** as a Finance movement. Only `Garantía` is a real Asset Record. | `ASSETS_V2:347/349/886` · `N-37` |
| 9 | ✅ **HomeCloud audio is approved** (master prohibition is stale). ⛔ **No fake waveform** — that rule is in the approving freeze itself. | `HC_V2:316` vs `:334` · `N-29` |
| 10 | ⛔ **Do not visually imply an automatic Shopping→Finance pipeline.** The `Supermercado` row is a **ledger fact already present**, not the visible result of a purchase. | `INVENTORY:1050-1059` · `N-32` |
| 11 | ✅ **Finance is safe and mature** — the only module presentable without caveat. Use the canon dataset from `N-22` consistently across S09 and Homi. | `N-22` · `D-08` |
| 12 | ✅ **Homi = concept / future capability, not verified current implementation.** Choreograph it conceptually; ⛔ the script must not assert implementation facts that do not exist today. | `N-14` + `N-21` |
| 13 | ⛔ **The present-tense AI stack claim is unsafe** (`script L320`). | `N-14` · `SI-11` |
| 14 | ⛔ **No fake cross-module taps.** `REAL_NAV` only where real nav exists; otherwise `EDITORIAL` · `SHARED_ELEMENT` · `DEVICE_TRANSITION`. Only `Plan → Task` and `Payment → Movement` are both real. | `MASTER:34, 113-124` · `N-33` |
| 15 | ✅ **Same semantic datum = same visual object** wherever possible. ⛔ Never invent a new closing object vocabulary; prefer objects the opening actually established. | `MASTER §2.5` · `N-25` |

### 8.3 Measurement rules — corrections override Session 1 artefacts

- **`N-02`** Planner tabs do **not** resize (max 84 px); the pill moves.
- **`N-08`** HomeCloud thumbnails have **no** authored conditional enlargement.
- **`N-09` / `N-41`** global device scale: S01–S09 = 1.00 · **S10 = 1.08** · **S15–S17 = 1.08** · S11–S14 no device · S18 end card.
- **`N-10`** `getAnimations().length` is **not** a motion-intensity metric. Classify by `playState`.
- **`N-17`** For S14's final state, text-table harvests are **not admissible**; only settled visual evidence.

### 8.4 Preservation rules — do not "improve" these away

- ⛔ **`N-05` is binding: S07 keeps its 132 px.** It is an **intentional semantic exception**, not an outlier. Do not reduce it to a generic 56–72 px "major concept" band.
- ✅ Device scale **1.08 with stable internal geometry** (282×602) is the **correct enlargement lever**. ⛔ Do not replace it with internal layout mutation.
- ✅ `S08_step01` selective exposure is the **model for the whole deck** (measured: bridge task `opacity 1.00` + `rgb(246,237,232)`, siblings `0.55`, heading `0.6` — built from the product's own tokens).
- ✅ Preserve: Homi chrome · Homi question-bubble invariance across personas (box `777,187,238,81`) · S18 end card · `#060404` black discipline · stable manual holds, zero timers.
- ✅ Finance composition order · HomeCloud `Documentos / Recuerdos` control · Home/Planner shell anatomy.

### 8.5 Corpus rules

- ⛔ **Do not trust an executive tally.** The **issue register** is the count authority (`N-42`).
- ⛔ **Never overwrite a raw severity.** RAW SEVERITY and CANONICAL STATUS are separate axes (`N-43`).
- ⛔ **A file date never establishes authority by itself** (`N-16`). The single exception, `N-38`, works because date **and** an explicit self-declared supersession are both present.
- ⛔ **The audit does not rewrite the script** (`N-44`). Script problems are recorded as `SI-*` with an owner.

---

## 9. HANDOFF

**Session 7's scope, per `00_SESSION_PLAN.md` §7, is `07_MOTION_STAGECRAFT_TIMING.md`.** The corpus hands it:

| Input | Where |
|---|---|
| 28 active canonical blockers, grouped by scene and root cause | `00_CANONICAL_ISSUE_REGISTRY.md` §1 |
| 18 root causes, full membership | `00_CANONICAL_ISSUE_REGISTRY.md` §7 |
| 126 Session-7-relevant issues vs 23 deferred | `00_CANONICAL_ISSUE_REGISTRY.md` §9 |
| 15 safe capability rules | §8.2 above |
| 5 corrected measurements | §8.3 above |
| Preservation list | §8.4 above |
| **The explicit open task** | mapping motion primitives → the four declared families `REAL_NAV` / `EDITORIAL` / `SHARED_ELEMENT` / `DEVICE_TRANSITION`, declared UNKNOWN in `00_AUDIT_CONTRACT.md` §5.2 |

**The four root causes Session 7 owns outright:** `RC-01` (9 issues — no semantic object survives a boundary; motion-family choice *is* the deliverable) · `RC-08` (10 — scene-boundary motion vocabulary missing) · `RC-06` (13 — visual state ≠ spoken beat) · `RC-02` (15 S7-relevant — what goes on stage and when).

**Session 7 should be able to answer, from this corpus alone:** which transitions are `SHARED_ELEMENT` and which must be `DEVICE_TRANSITION`; where a shared object must survive and currently does not; which holds need a mechanism rather than a duration; and what the stage should show at each Scene-G beat that is missing today.

---

## 10. LIMITATIONS, STATED HONESTLY

1. **No runtime was executed in this pass.** This is a documentation-normalization pass. It re-used Sessions 1–6's committed runtime evidence and re-read authorities statically. Per the spot-re-measurement rule, no conflicting numeric evidence existed, so no re-measurement was performed. **No new runtime claim is made here.**
2. **Integration was not executed.** Its state is source inference, as in Session 6. Native runtime not launched.
3. **All decisive authority lines were opened and quoted verbatim this pass** — not paraphrased from session summaries. Where a claim could not be verified (e.g. `HOMECLOUD_PRODUCT_EXPERIENCE_FREEZE_V1_3.md`, flagged unread by Session 6 as `P2-07`), it is **not relied upon**.
4. **`HOMePLUS_ASSETS_PRODUCT_FREEZE_V2.0.md` and `HOMePLUS_INVENTORY_PRODUCT_FREEZE_V1.0.md` live in `Downloads\`, not in the Integration repo.** An early search of the repos alone would have wrongly concluded they do not exist. Located and verified at their real path.
5. **Two `*_PRODUCT_FREEZE_*` documents referenced by other freezes were confirmed absent** from disk (`HOMePLUS_INVENTORY_PRODUCT_FREEZE_V1.0.md` and `HOMePLUS_ASSETS_PRODUCT_FREEZE_V1.0.md` are cited by Finance V1.0; the V2.0/V1.0 versions used here do exist). Recorded, not acted on.
6. **The Integration working tree was already dirty** before this pass. That state is pre-existing and was preserved untouched.
7. **Session 7 has NOT been started.** No implementation, no motion written, no production file touched.

---

## 11. GATE STATEMENT

```
Sessions 2-6 complete and stable ................................ PASS
Production integrity (159 files, SHA-256 + mtime) ............... PASS
Known measurement errors normalized (6 Session-1 artefacts) ..... PASS
Raw issue counts reconciled (149 rows, 29 raw blockers) ........ PASS
Product Truth conflicts resolved or presentation-safe .......... PASS
No unresolved conflict prevents motion / stagecraft analysis ... PASS

SESSION 1 - SESSIONS 0-6 AUDIT CORPUS NORMALIZED
PRE-SESSION-7 GATE ............................................. GO
```

**Session 7 may begin on the basis of §8.**

---

**END OF SESSION 7 GATE**