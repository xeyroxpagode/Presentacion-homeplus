# HOMEPLUS PRESENTATION AUDIT — NORMALIZATION

**Issued:** Session 2 (N-01…N-05), 2026-10-04 · **Re-verified and extended:** Global Audit Normalization pass (N-06…N-45), 2026-10-05.
**Status:** authoritative **correction layer** for Sessions 7–8.
**Scope:** documentation normalization only. No severity changed, no verdict changed, no recommendation rewritten, nothing implemented, nothing rewritten in the source reports except the two demonstrably wrong executive blocker tallies.

---

## CANONICAL CONSUMPTION RULE

> Where this file explicitly corrects an earlier audit fact, this normalization wins **for that fact only**.
>
> **It does not silently supersede unrelated findings.**
>
> **Product Truth remains above this audit normalization.**

Three sub-rules that make the above operable:

1. **Scope-limited.** Each `N-xx` correction names the exact fact it replaces. Anything not named inside an `N-xx` entry survives untouched.
2. **Raw evidence is never erased.** A corrected statement stays in its source report. This file records *what it now means*, not *that it was said*.
3. **Two axes, always separate.** `RAW SEVERITY` = what the source audit graded. `CANONICAL STATUS` = what the cross-session corpus now says. Never overwrite the first with the second.

---

# PART I — PRESERVED FROM SESSION 2 (re-verified, unchanged)

## N-01 — Session 2 blocker count

**Canonical: 3 BLOCKERS.**

| # | ID | One-line statement |
|---|---|---|
| 1 | **A-02** | The founding question is delivered with HomePlus already visible. |
| 2 | **A-03** | The distributed-context argument is replaced by six brand logos and the explicitly forbidden `6 APPS / 1 FAMILIA / 0 COORDINACIÓN` sequence. |
| 3 | **B-01** | Home and Planner show completed tasks while narration and Product Truth say pending. |

**Distribution:** Scene A = **2** · Scene B = **1** · **TOTAL = 3**.

No fourth blocker exists. Nothing else in Scenes A or B is graded `BLOCKER`. `A-01` is the highest non-blocker in Scene A (`HIGH`).

**Do not confuse three different counts:**
- **Audit issue severities** — this section. Canonical: **3**.
- **`00_HUMAN_HYPOTHESES.md` §5.4 "Candidatos a BLOCKER"** — **9** *unadjudicated Session-0 candidates*, not verdicts. Not a count of anything confirmed.
- **`00_HUMAN_HYPOTHESES.md` §5.4 `HW-B-002`** — was a *candidate*; Session 2 adjudicated it **CONFIRMED / BLOCKER upheld** (`B-01`).

**RE-VERIFIED 2026-10-05 (mechanical).** Parsing of `02_SCENES_A_B_AUDIT.md` issue registers (`### **A-nn …**` / `### **B-nn …**` blocks, severity read from the `- **SEVERITY:**` field of each block) yields: Scene A **17** rows = 2 BLOCKER / 8 HIGH / 3 MEDIUM / 1 LOW / 2 POSITIVE / 1 ungraded script issue; Scene B **22** rows = 1 BLOCKER / 15 HIGH / 2 MEDIUM / 1 LOW / 2 POSITIVE / 1 ungraded script issue. **Blockers found: exactly `A-02`, `A-03`, `B-01`. N-01 CONFIRMED.**

---

## N-02 — Planner tab measurement

**SUPERSEDED:** `S05` Planner tab `82 px → 137 px` (Session 1, `01_RUNTIME_BASELINE.md` §5.4).

**CANONICAL:**
- Stable widths **≈ 81 / 82 / 81 px**; a fractional redistribution may briefly give **≈ 80 / 84 / 80 px**.
- **Maximum observed tab width = 84 px.**
- The **selection pill translates** (`left`: `3px → 84.33px → 165.66px`, width constant `81.33px`).
- **The tabs do not resize.** The "tab resizing" claim is **invalid**.

**REASON:** fresh rAF measurement in Session 2 over **222 frames** armed before the keypress, plus all four stable states. Only two width combinations ever occurred; max 84 px. 137 px is geometrically impossible in a 244 px track split three ways by `flex: 1`.

**Full errata:** `audit/01_RUNTIME_BASELINE_ERRATA.md` §E-01.
**Evidence:** `audit/02_SCENES_A_B_AUDIT.md` §9.2, §23 row 22.

---

## N-03 — Map ETA / proximity

**Status: MASTER / PRODUCT CONFLICT — permanently presentation-unsafe until Master owner and Product owner jointly resolve it. Not an implementation failure. Do not resolve artificially.**

**The conflict:** the presentation master requests proximity evidence — §6 B5 *"cercanía → relación espacial simple (`8 min` o equivalente)"*.

**Verified Product Truth / Integration has none of it:** no ETA, no distance, no travel-time service. The only geometric computation in the codebase (`distanceBetweenMeters`, `front/mi-front-limpio/services/presenceLocationSharing.ts:125-138`) is used **internally to throttle publish frequency** and is never surfaced. The presence surface offers only `getRelativeTime()` (`Ahora` / `Hace 5 min` / `Hace 1 h`) and `getStatusLabel()` (`Compartiendo ubicación` / `Desactualizada` / `Sin ubicacion` / `No comparte`). Figma-app's `MapaTab` likewise shows no distance and no ETA.

**Therefore `8 min` MUST NOT be treated as a presentation requirement.**

**Presentation-safe rule until Product + Master owners explicitly resolve this: SHOW ONLY SUPPORTED INFORMATION.**

| Show | Do not fabricate |
|---|---|
| place · recency · presence/status · sharing state | minutes away · distance · ETA · any relative-proximity calculation |

**Present-state note:** the presentation currently fabricates relative geography by placing pins at authored CSS percentages (`.map-school { left: 24%; top: 29% }`, `.map-club { left: 69%; top: 49% }`, `.map-mom { left: 23%; top: 75% }`, `.map-dad { left: 82%; top: 79% }`). That is finding **B-13** (`HIGH`) and is a **fabrication to be removed**, independent of how the master conflict is eventually resolved.

**Owners:** Master owner **and** Product owner, jointly. Until then the rule above binds every session.

**EXTENDED BY N-30** (no global location master switch; pins are illustrative).

---

## N-04 — Feed vs Family Conversation

**SUPERSEDED BY N-36.** N-04 correctly recorded the conflict as OPEN and correctly refused to declare any implementation canonical. That refusal was right; the conflict is now closed on Product Truth grounds. **Preserve N-04 as history**; consume **N-36**.

---

## N-05 — S07 `Coordinar no es vulgar.` → S07 `Coordinar no es vigilar.`

**Status: PRESERVE.**

Specifically preserve, as an intentional design:

- near-black field (`#060404`);
- singular concept — one idea, nothing else;
- enormous negative space (~60 % of frame empty; the text block occupies 20.6 % of canvas area);
- **132 px typography**;
- product stage exiting **as a block** (`opacity: 0; visibility: hidden`, 220 ms);
- **no competing UI**.

**Do NOT let a later global typography-normalization pass reduce it merely because 132 px exceeds generic type guidance** (e.g. NO-UI §5's 56–72 px "major concept" band). That band was written for screens that also carry other elements. **This is an intentional semantic exception, not an outlier.**

Supporting measurements: `02_SCENES_A_B_AUDIT.md` §11 and §12 `B-21`. Preserved as a positive at §13 `B-P7`.

**RE-VERIFIED 2026-10-05.** `B-21` still carries `POSITIVE` in the raw register. **N-05 CONFIRMED, untouched.**

---

# PART II — SESSION 3 NORMALIZATION

## N-06 — SHOPPING LIST AUTHORITY

**Session 3's final classification is SUPERSEDED.**

**What Session 3 did (and why it was wrong):** Session 3 *correctly read* the frozen `HOMePLUS_INVENTORY_PRODUCT_FREEZE_V1.0.md` and *correctly reported* its exclusion, but then let an **unfrozen V1.1 candidate embedded in a chat export** (`Inventory Foundation.md`) reverse the frozen verdict in its final classification, landing on `SUPPORTED DIRECTION (V1.1 candidate) + NOT YET IMPLEMENTED` and escalating it to an open product decision (`SI-03`).

**The frozen authority, verified verbatim this pass:**

| Source line | Verbatim |
|---|---|
| `HOMePLUS_INVENTORY_PRODUCT_FREEZE_V1.0.md:1-13` | `# HOMePLUS - INVENTORY PRODUCT FREEZE V1.0` · `Estado: MODULE_PRODUCT_DEFINITION_CLOSED` · `LOGICALLY CLOSED` / `PRODUCT BEHAVIOR COMPLETE` |
| `:802` | **`No es una Shopping List.`** |
| `:977` | **`No es una entidad Shopping List independiente.`** |
| `:2120` | **`- duplicate Shopping List;`** (inside §32.4 `Explicitly Not Target`) |
| `:815-819` | approved chain: *"Cuando un Item con Minimum entra en LOW/OUT: → automatic Restock Need PENDING"* |
| `:121` | `Dispatch usa Planner` |

**Canonical:**

| Axis | Verdict |
|---|---|
| **PRODUCT TRUTH** | **NOT APPROVED / EXPLICITLY EXCLUDED** (3 exclusions by name) |
| **FIGMA** | **POLISHED PROTOTYPE ONLY** (full state machine, 27 868 B `ShoppingList.tsx`) |
| **INTEGRATION** | **ABSENT** — 0 routes, 0 screens, 0 services, 0 tables |
| **CAPABILITY** | **UNSUPPORTED CLAIM** under current frozen authority |
| **PRESENTATION** | **DO NOT SHOW AS WORKING PRODUCT CAPABILITY** |

**Approved current product chain (the only product-true C-scene story):**

```
Inventory item LOW / OUT
  → Restock Need (PENDING, automatic or manual)
  → approval (coordinator / adult)
  → canonical Planner Task  (template_key 'shopping', origin_module 'inventory')
  → Dispatch via Planner
  → Finance registers the resulting expense
```

This chain exists in **both** the frozen Product Truth (`INVENTORY:813-835, 1050-1059, 1128-1133`) **and** in Integration (`inventory.service.js:542-562`). **Session 3 already documented it correctly** at §3.3 — it simply ranked it second. It is now the canonical chain.

**A V1.1 candidate in a chat export can never override a frozen V1.0.** If the product owner wants Shopping List back, that is a **separate Product Pass**, not an audit decision and not a Session-7 decision.

**Consequence for the script:** `SI-18` (spoken *"puede sumarse automáticamente a la lista de compras"*, L169-170) is unsafe on stage. Classify as **SCRIPT ISSUE**, owner = script owner.

---

## N-07 — FIGMA INVENTORY / SHOPPING PRESENCE

**Session 3's statement is CORRECTED. It was a harvest-coverage artefact, not a finding.**

| Source | Said |
|---|---|
| **Session 3** §3.3 | Shopping List *"NOT PRESENT as a surface"* in Figma-app; Inventory surfaces *"not reached"* in that harvest |
| **Session 6** §13, §14 | Reached and captured `src/inventory/InventoryRoot.tsx`, `src/inventory/Products.tsx`, `src/inventory/ShoppingList.tsx`, `src/screens/Shopping.tsx`, `src/screens/Inventory.tsx`; 61 runtime captures with computed-style census |

**Canonical correction:**

> **Session-3 evidence = NOT REACHED IN THAT HARVEST.**
>
> It is **NOT** `ABSENT FROM FIGMA-APP`.

Session 6 inspected a source Session 3 did not reach, and reproduced the result with runtime capture. Under the specialized-audit precedence rule this **supersedes** the Session 3 absence statement. Session 3's *raw* observation is preserved; its *inference* ("absent") is withdrawn.

**Does NOT change N-06.** Figma having a polished Shopping List does not create Product Truth. `PROTOTYPE ONLY` stands.

---

## N-08 — HOMECLOUD THUMBNAIL MEASUREMENT

**SUPERSEDED — Session 1's claim:** *"HomeCloud thumbnails `40×40 → 98×62` authored thumbnail enlargement."*

**Canonical (Session 3 re-measurement, §25.2):**

| Value | What it actually is |
|---|---|
| `40×40` | the **mounted-but-hidden collapsed box** |
| `98×62` | the **settled layout** |

**There is no authored conditional enlargement.** The two numbers are two states of one element, not a transition. Session 1 sampled the hidden state and the settled state and read the difference as authored motion.

**Consequence:** any Session-7 recommendation that enlarges HomeCloud thumbnails as a "focus" technique is **invalid as specified**. Whole-device scale (see N-09 / N-41) is the correct lever for this module.

---

## N-09 — S10 GLOBAL SCALE CLAIM

**SUPERSEDED — Session 3 §1 last paragraph:** *"And `S10` is the only scene in all 85 states that raises the device above 1.00 (1.08)."*

**That statement is FALSE.** Session 5 measured the same transform in Scene I.

**Canonical baseline:**

| Scene | Device scale | Source |
|---|---|---|
| **S10** | **1.08** | Session 3, `motion-s10.json` |
| **S15** | **1.08** | Session 5, device box `718,25,324,670`, `transform matrix(1.08, …)` |
| **S16** | **1.08** | Session 5, unchanged across all 5 states |
| **S17** | **1.08** | Session 5, unchanged across all 4 states |

**Correct interpretation:**

> **S10 is the only enlarged scene WITHIN C / D / E.** It is *not* the only enlarged scene in the deck.

No re-measurement was performed: both numbers come from two independent sessions' own committed measurements and they are **compatible**, not conflicting. Re-measuring would violate the spot-re-measurement rule.

**Session 5's positive #2 already preserved 1.08 with stable internal geometry as `KEEP AS-IS`.** That is now doubly confirmed.

---

## N-10 — `getAnimations()` "still running"

**CORRECTION OF WORDING ONLY. The count is correct.**

| | |
|---|---|
| **Session 1** reported | **2** animations at the 500 ms sample, described as *"still running"* |
| **Session 3** established | both are **finished** `fill-mode: both` **ambient-glow** animations still returned by `document.getAnimations()` |

**Canonical:**

> The count of 2 is **real**.
> The phrase *"still running"* is **imprecise**.
> These are **finished animations retained by fill-mode**, not active motion.

**Rule for Session 7:** `getAnimations()` length is **not** a motion-intensity metric. Any finding phrased as "N animations still running" must be re-read as "N animation objects attached to the document", and then classified by `playState` before being called motion.

---

## N-27 — SESSION 3 RAW BLOCKER TALLY *(new — bookkeeping correction)*

**Session 3 published no executive severity tally block, and its narrative text cited 6 blockers. Mechanical parsing of the registers gives exactly that. N-27 records the mechanically-derived numbers so Sessions 7–8 do not have to re-derive them.**

| Prefix | Rows | BLOCKER | HIGH | MEDIUM | LOW | POSITIVE |
|---|---|---|---|---|---|---|
| **C** (`C-01`…`C-10`, plus `C-11/D-10`) | **11** | **3** | 3 | 3 | 0 | 2 |
| **D** (`D-01`…`D-09`, `D-11`) | **10** | **2** | 4 | 3 | 0 | 1 |
| **E** (`E-01`…`E-13`) | **13** | **1** | 5 | 5 | 0 | 2 |
| **TOTAL** | **34** | **6** | 12 | 11 | 0 | 5 |

**RAW BLOCKERS = 6:** `C-01`, `C-02`, `C-11/D-10`, `D-01`, `D-09`, `E-04`.

**Parsing note that matters for traceability:** `C-11/D-10` is a **single register row carrying a combined cross-scene ID** (§8 `C → D handoff audit`). It is **one** issue, graded **BLOCKER**, and it is easy to miss because a naive `[A-J]-\d\d` scan drops it. Any future mechanical count of this corpus must accept the `X-nn/Y-nn` form or it will silently under-report Session 3 by one BLOCKER.

---

# PART III — SESSION 4 NORMALIZATION

## N-11 — SESSION 4 RAW BLOCKER TALLY

**Session 4's executive tally is WRONG. The issue register is the authority.**

| | Session 4 §1 says | Register actually contains |
|---|---|---|
| Scene F | 1 (`F-01`) | **1** — `F-01` ✅ |
| Scene G | 4 (`G-01`…`G-04`) | **7** — `G-01`, `G-02`, `G-03`, `G-04`, `G-05`, `G-12`, `G-15` ❌ |
| Scene H | 1 (`H-01`) | **4** — `H-01`, `H-02`, `H-04`, `H-05` ❌ |
| **TOTAL** | **6** | **12** ❌ |

**CANONICAL RAW TALLY: F = 1 · G = 7 · H = 4 · TOTAL RAW BLOCKERS = 12.**

Session 4's own §1 sentence *"No other issue in Scenes F, G or H is graded `BLOCKER`"* is false for `G-05`, `G-12`, `G-15`, `H-02`, `H-04`, `H-05`.

**Full Session 4 raw register (mechanically verified):**

| Prefix | Rows | BLOCKER | HIGH | MEDIUM | LOW |
|---|---|---|---|---|---|
| F | 5 | 1 | 4 | 0 | 0 |
| G | 17 | 7 | 6 | 3 | 1 |
| H | 12 | 4 | 4 | 3 | 1 |
| **TOTAL** | **34** | **12** | **14** | **6** | **2** |

**No severity was downgraded to make the arithmetic work.** The register stands; only the executive tally is corrected, in place, at `04_SCENES_F_H_AUDIT.md` §1.

**Note on two qualified severities** (kept as BLOCKER, qualifier preserved):
- `G-12` = `BLOCKER (as a P0 truth problem; see §32)` — graded BLOCKER.
- `G-15` = `BLOCKER (graded here as the visual-load half of H-02's root cause; the fabrication half is H-02/H-03)` — graded BLOCKER.
- `H-05` = `BLOCKER (graded here as the visual-load half of H-02's root cause…)` — graded BLOCKER.
- `F-04` = `HIGH (subsumed by F-01…)` and `G-16` = `MEDIUM (subsumed by G-01…)` — Session 4's **own** self-declared subsumptions. Honoured in the canonical registry (see N-43).

---

## N-12 — H-01 / H-02 IDENTITY

**These are two different defects and must never be conflated, merged, or deduplicated into one row.**

| ID | Statement | Root cause |
|---|---|---|
| **H-01** | **Scene H has no interface at all.** The friction cannot be shown because there is no UI to be lost in. | `RC-02` — product stage absent |
| **H-02** | **The warranty route names three nodes that do not exist in the product.** | `RC-14` — fabricated navigation |

They share a scene. They do not share a cause. `H-01` would still be a BLOCKER with a perfect route; `H-02` would still be a BLOCKER with a perfect interface on stage.

**Both remain raw BLOCKER.** Both remain canonically ACTIVE (see the registry), because N-13 fixes Assets' *authority* but does **not** create the warranty route.

---

## N-13 — ASSETS AUTHORITY

**Session 4's broad claim** — Assets / PS5 / Documentos "do not exist *in the product*" — **is SUPERSEDED in its broad form by Session 6.**

**Verified authority (`HOMePLUS_ASSETS_PRODUCT_FREEZE_V2.0.md`, located at `C:\Users\thega\Downloads\`, 1 377 lines):**

| Source line | Verbatim |
|---|---|
| `:3-5` | `Versión: 2.0` · `Fecha: 2026-10-01` · **`Estado: FROZEN - Product Target`** |
| `:27-30` | `LOGICALLY_CLOSED` / `PRODUCT_BEHAVIOR_COMPLETE` / `READY_FOR_IMPLEMENTATION` |
| `:33` | *"Este documento define **TARGET**. … Una diferencia entre CURRENT y este documento es un **REAL GAP**, no una razón para modificar Product Truth."* |

**Canonical four-way classification:**

| Axis | Verdict |
|---|---|
| **ASSETS PRODUCT TARGET** | **APPROVED / FROZEN** (V2.0, 2026-10-01) |
| **FIGMA** | Assets root + detail **exist** and follow the freeze, including three of its negative decisions |
| **INTEGRATION CURRENT** | **NOT IMPLEMENTED** — 0 routes, 0 services, 0 tables; only residue is `'assets'` as a reserved `ALLOWED_ORIGIN_MODULES` value with no producer |
| **CURRENT EXECUTABLE NAV** | **DOES NOT EXIST** |

**Therefore:**

> `Home → Assets → PlayStation 5 → Documentos` **cannot be shown as REAL CURRENT NAVIGATION.**

**But the underlying Assets capability is NOT fake.** The correct classification is the triple:

```
SUPPORTED PRODUCT TARGET
  + IMPLEMENTATION GAP
  + FAKE CURRENT NAVIGATION IF PRESENTED AS TAP PATH
```

**Presentation rule until Integration exists:** use **editorial / shared-element / device-transition** for every Assets↔module relation. `MASTER:113-124` and `MASTER:237` authorise exactly this and even name the Assets→HomeCloud case as an approved editorial example.

**`H-02` severity remains raw BLOCKER and canonical status remains ACTIVE.** Fixing the *authority* of Assets does not create a *route* to a warranty node.

**Also verified, and it changes Session 3 too:** `MASTER:722` says *"Assets todavía no tiene Product Freeze final"* — that is **stale**. `MASTER:6` yields to module Product Freezes on contradiction, so **Assets V2.0 wins**. Session 3 already applied this correctly at §3.5.

---

## N-14 — AI / HOMI STATUS

**Session 4 verified (Integration):** `0` AI providers · `0` AI API routes · `0` AI edge functions · `0` AI env configuration · `0` current Homi product implementation.

**Session 5 added:** Homi is presentation-only; the freeze explicitly says *Geni* is not implemented in that freeze.

**The single unsafe sentence, verified verbatim in the script this pass:**

```
Guion Compartido (2).md:320
  "también usamos modelos de inteligencia artificial en alguna partes del sistema."
```

Present tense `usamos`. No hedge. This is the **only** present-tense AI-implementation claim in all 497 script lines.

**Canonical three-layer distinction:**

| Layer | Verdict |
|---|---|
| **HOMI / AI CONCEPT** | **MAY EXIST** as PRESENTATION / FUTURE PRODUCT CONCEPT |
| **CURRENT IMPLEMENTATION** | **NONE VERIFIED** |
| **TECH-STACK PRESENT-TENSE CLAIM** (`SI-11`) | **UNSAFE** as a current-implementation claim |

**The two conclusions that must NOT be drawn:**

- ❌ *"Homi can never be a product feature."* — unsupported, and out of audit scope.
- ❌ *"Homi is fake."* — also unsupported. It is a concept, honestly pitched.

**The one conclusion that IS supported:**

> **Homi is not a verified current implemented capability.**

**`G-12` stays CANONICALLY ACTIVE** unless the script sentence is changed or real implementation evidence appears. Raw severity BLOCKER is preserved either way.

See also **N-21** for the careful wording of Homi's product status.

---

## N-15 — SESSION 4 SCRIPT ISSUE COUNT

**Session 4 contains its own self-correction and the corrected number is the canonical one.**

| | Count |
|---|---|
| Session 4 §1 narrative | 7 new |
| Session 4 §31 closing line | *"Correction: **6 new**"* ← **canonical** |

**CANONICAL: 6 NEW SCRIPT ISSUES**

| ID | Subject |
|---|---|
| `SI-10` | Technology-order regression |
| `SI-11` | AI present-tense claim unsupported |
| `SI-12` | Warranty-search example has no product referent |
| `SI-13` | Spoken ≠ displayed at the film's key question |
| `SI-14` | Scene F duplicates the speaker on screen |
| `SI-15` | Script vs S12 implementation disagree on deferral (record only) |

**RE-EVIDENCED (not new):** `SI-07` (Scene F black-screen authoring ambiguity), `SI-01` (`Geni` vs `Homi`).

**Not 7 new.**

---

## N-16 — FILE DATE ≠ AUTHORITY

**The temptation this entry exists to kill:**

> *"The script is dated 24/9 and the master 23/9, therefore the script wins."*

**This is false reasoning and must not appear in Session 7 or 8.**

**Verified filesystem chronology** (mtime, *not* document content — none of the three documents carries a date line in its front matter):

| Document | mtime |
|---|---|
| `HOMEPLUS_PRESENTATION_NO_UI_MASTER_FREEZE_V2.0.md` | 2026-09-22 16:17:35 |
| `HOMEPLUS_PRESENTATION_MASTER_FREEZE_V1.0.md` | 2026-09-23 21:16:40 |
| `Guion Compartido (2).md` | 2026-09-24 09:13:55 |

**What chronology proves:** only that the script file was touched last. It does **not** establish authority.

**What actually establishes authority here:** `MASTER:6` — *"este documento reemplaza los planteos visuales previos. El código actual y los Product Freeze de cada módulo siguen siendo autoridad de producto cuando exista una contradicción."* The master **subordinates itself** to module Product Freeze. It never claims to outrank the script.

**Therefore the technology ordering is:**

> ## `SCRIPT / MASTER CONFLICT` — UNRESOLVED

**Canonical state:**

| | |
|---|---|
| **MASTER §11 G4** (canonical copy, verified) | *"Para diseñar el frontend de HomePlus usamos **Figma**, donde primero definimos y probamos cómo queríamos que funcionara la experiencia. **Después** lo implementamos con React Native y Expo."* → order **Figma → React Native/Expo → Node → Supabase/PostgreSQL → IA** |
| **NO-UI §13** (independently agrees with the master) | *"Figma: ligado al diseño previo del frontend."* |
| **SCRIPT L314-320** (verified) | L314 React Native+Expo → L316 Node/Supabase/PostgreSQL → **L318 "Y antes de programar las pantallas usamos Figma"** → L320 IA → order **RN/Expo → Node → Supabase/PG → Figma → AI** |

**The two orders genuinely differ** — Figma moves from position 1 to position 4. `SI-10` is the script-side expression of this.

**Hard rule for Session 7:** **do not** pick Figma-first or Figma-fourth from timestamps. Two masters agree against the script, which is evidence of *weight*, but the campaign contract (§2) gives the script authority over *"qué se dice"* and the master over *"cómo se muestra"*, and the ordering is a spoken-wording question. **Present it as a SCRIPT ISSUE with both orders shown. Do not silently reorder the speaker's lines.**

---

## N-17 — S14 TEXT-TABLE ARTEFACT

**A Session-1 text-table / hidden-subtree artefact — NOT a visible S14 residue.**

| Source | Said |
|---|---|
| **Session 1** text-table evidence | reports `Figma · Diseño · IA` present at S14's final question state |
| **Session 4** §26 positives `H-P1` + settled screenshot | *"S14's final question state does reach a genuinely clean, residue-free black frame"* |

**Canonical:**

> Classify as **`SESSION-1 TEXT-TABLE / HIDDEN-SUBTREE ARTEFACT`**.
> There is **no visible S14 residue** in the settled visual state.

**Mechanism (now understood, and it is the same mechanism as N-10):** `H-09` records that `.s13-center` **re-asserts `visibility: visible`**, so the `.s14-echo` subtree is not robustly hidden. A DOM/text-table harvest therefore finds strings that the *painted* frame does not show. `H-09` stays raw `LOW` — the audit's severity grading for a robustness issue is correct and is **not** changed here.

**Operational rule:** for S14's final state, **text-table harvests and DOM queries are not admissible**; only settled visual evidence is. This is a general rule, not an S14 exception: *a text inventory is evidence of DOM presence, never evidence of visible presence.*

---

# PART IV — SESSION 5 NORMALIZATION

## N-18 — SESSION 5 RAW BLOCKER TALLY

**Session 5's executive tally is WRONG. The issue register is the authority.**

| | Session 5 §1 says | Register actually contains |
|---|---|---|
| Scene I | 6 (`I-01`…`I-06`) | **7** — `I-01`, `I-02`, `I-03`, `I-04`, `I-05`, `I-06`, **`I-15`** ❌ |
| Scene J | 1 (`J-01`) | **1** ✅ |
| **TOTAL** | **7** | **8** ❌ |

The register row for `I-15` reads, verbatim:

```
| **I-15** | S16 t4 (target) | L403 | `$184.320 / 12 movimientos` | … | PRODUCT | **BLOCKER** (decision) | CONFIRMED — three-way data conflict | DECISION REQUIRED: pick one Finance dataset. …
```

**CANONICAL RAW TALLY: I = 7 · J = 1 · TOTAL RAW BLOCKERS = 8.**

**`I-15`'s severity was NOT changed to preserve "7".** It is graded BLOCKER in the register; it stays BLOCKER.

**Two facts that must be kept apart forever:**

| | |
|---|---|
| **RAW BLOCKERS** | **8** — what Session 5 graded |
| **ACTIVE CANONICAL BLOCKERS** | **5** in Scene I — because `I-15` is `RESOLVED_BY_AUTHORITY` under **N-22** |

**Full Session 5 raw register (mechanically verified):**

| Prefix | Rows | BLOCKER | HIGH | MEDIUM | LOW | POSITIVE | ungraded |
|---|---|---|---|---|---|---|---|
| I | 24 | **7** | 8 | 7 | 2 | 0 | 0 |
| J | 18 | **1** | 10 | 2 | 1 | 1 | 3 |
| **TOTAL** | **42** | **8** | **18** | **9** | **3** | **1** | **3** |

**Session 5's `I-*` numbering has gaps** — `I-08`, `I-14`, `I-16`, `I-17` do not exist in the register. This is a **source numbering gap, not missing findings**: no `I-08`/`I-14`/`I-16`/`I-17` is referenced anywhere else in the corpus. Recorded so a future reader does not hunt for them.

---

## N-19 — SESSION 5 REGISTERED ISSUE COUNT

**"28 issues" is FALSE. Do not use it.**

**Mechanical count of the two issue registers only** — `## 12. Homi issue register` (§12) and `## 24. Closing issue register` (§24) — counting rows, not beat IDs:

| | Count |
|---|---|
| unique `I-*` registered issue IDs | **24** |
| unique `J-*` registered issue IDs | **18** |
| **TOTAL unique registered issue IDs** | **42** |

**Counting rule that produces 42 and not something else:**

- ✅ Count **rows** in `## 12. Homi issue register` and `## 24. Closing issue register`.
- ❌ Do **not** count beat IDs — `I00`/`I01`/`t0`…`t4`/`S15 t1` are choreography coordinates, not issues. Counting them inflates the number arbitrarily.
- ❌ Do **not** count the `## 13. Homi positives` / `## 25. Closing positives` tables — those are positives, separately tallied.
- ❌ Do **not** count the 3 ungraded `SCRIPT ISSUE` rows (`J-16`, `J-17`, `J-18`) as severities — they carry `—`, not a grade. They *are* issues and *are* in the 42.

**Corpus grand total (mechanically verified, Sessions 2–5):**

| | Count |
|---|---|
| total registered issue rows | **149** |
| RAW BLOCKER | **29** |
| RAW HIGH | **67** |
| RAW MEDIUM | **31** |
| RAW LOW | **7** |
| POSITIVE | **10** |
| ungraded (`—`) / source-inconsistency | **5** |

---

## N-20 — SHOPPING LIST WORDING IN HOMI

**Session 5's `I-12` finding is CORRECT and remains ACTIVE. Only its *reason* is refined.**

Session 5 said Papá's Homi answer invents a Shopping List (`"revisá la lista de compras"`). Canonical after Session 6:

| | |
|---|---|
| Shopping List in Product Truth | **explicitly excluded** (N-06) |
| Shopping List in Figma | **polished prototype exists** |
| Shopping List in Integration | **absent** |

**So the preferred characterisation of the defect is:**

> **"unsupported under current Product Truth"**

**not simply:**

> ~~"does not exist anywhere"~~

That second phrasing was never true — a complete Figma prototype exists — and using it would have let a later reader reopen the question on the grounds that "Figma has it, therefore it is not fabricated".

**`I-12` stays CANONICALLY ACTIVE.** The Papá answer is unsafe and the Shopping List phrase must be removed. Only the wording of the reason is normalised. **The script is not rewritten here.**

---

## N-21 — HOMI PRODUCT STATUS *(careful wording)*

**`I-26` must be normalised with precision. Both of the following are wrong:**

- ❌ *"Homi is not a product feature"* — an absolute, permanent statement. Unsupported and out of scope.
- ❌ *"Homi is fake"* — also unsupported; it is a concept, honestly pitched.

**Canonical three-axis statement:**

| Axis | Verdict |
|---|---|
| **CURRENT** (Integration) | **not implemented** — 0 routes, 0 tables, 0 AI providers; `GeniOverlay` / `HomiPreview` exist in Figma-app but share no code |
| **PRODUCT FREEZE** (the inspected freeze) | **not implemented in that freeze** — *"Geni no está implementado en este freeze."* |
| **PRESENTATION** | Homi **is** being presented as a product concept / intended capability |

**Therefore:**

> Presentation choreography **may** demonstrate Homi conceptually.
> The script **must not** imply implementation facts that do not exist today.

**This resolves the Session-4 AI ambiguity (N-14) enough for Session 7** — Session 7 can design Homi motion without resolving whether Homi will ever ship.

---

## N-22 — I-15 FINANCE DATASET → **RESOLVED_BY_AUTHORITY**

**`I-15` — RAW severity `BLOCKER`, CANONICAL STATUS `RESOLVED_BY_AUTHORITY`.**

**The three datasets:**

| Source | Dataset |
|---|---|
| **NO-UI §18 DEMO DATA CANON** (frozen) | `Supermercado $48.720` · `Monthly supermarket $184.320` · `12 movimientos` · `Nafta $32.500` · `PS5 Mar 2024 · $580.000` |
| **Figma** | `Supermercado / Alimentación / $61.800` |
| **presentation S09** | `Alimentos $24.500` / `Transporte $18.600` etc. |

**Verified authority, verbatim this pass:**

```
HOMEPLUS_PRESENTATION_NO_UI_MASTER_FREEZE_V2.0.md
1249: # 18. DEMO DATA CANON
1275: Finance:
1276: - Supermercado `$48.720`
1277: - Monthly supermarket `$184.320`
1278: - 12 movimientos
1279: - Nafta `$32.500`
1280: - PS5 `Mar 2024 · $580.000`
```

**Authority test applied — the brief's own rule:**

> *demo values do NOT need to exist in Integration source to be valid presentation data, provided the product can represent the underlying concept and the presentation consistently uses the same demo dataset.*

| Test | Result |
|---|---|
| Is NO-UI §18 an explicit **frozen** presentation canon? | **YES** — `HOMEPLUS_PRESENTATION_NO_UI_MASTER_FREEZE_V2.0.md`, header `Estado: FROZEN para ejecución` |
| Does it freeze `$184.320` and `12 movimientos`? | **YES** — `:1277`, `:1278` |
| Can Finance represent the underlying concept? | **YES** — `Movimientos` + `Análisis` both exist in Product Truth and Integration; Session 3 §3.4 called Finance *"the most mature of the six in every dimension"* |
| Is the conflict a **Product Truth** conflict or a **presentation demo-data** conflict? | **PRESENTATION DEMO-DATA conflict** — no Finance Product Truth rule is violated by any of the three datasets |

**⇒ AUTHORITY IS SUFFICIENT. RESOLVED, not OPEN.**

**RESOLUTION — target state:**

> **One consistent Finance demo dataset across S09 and the Homi Finance beat, taken from NO-UI §18.**

Canonical values to be used by both surfaces:

```
Supermercado            $48.720
Monthly supermarket   $184.320
12 movimientos
Nafta                   $32.500
PS5          Mar 2024 · $580.000      ← as a FINANCE MOVEMENT, not an Asset field (N-37)
```

**A fourth dataset was NOT invented.** `$61.800`, `Alimentación`, `$24.500`, `$18.600` are **non-canon** and are not to be introduced.

**The required distinction — natural language vs taxonomy:**

> **`"supermercado"` is a natural-language merchant / description / query token.**
> **`Alimentación` and `Compras` are Finance category-taxonomy keys.**

These are different layers. **Do not require the spoken word *"supermercado"* to be a category key**, and do not treat a mismatch between the two as a defect by itself. Session 5's `I-06` correctly recorded that `supermercado` "is not a category" — that observation stands and is **not** a blocker on its own.

**Residual, tracked but not blocking:** `I-28` (`12 movimientos` is renderable in the Figma movement-filter sheet, not in `Resumen`) remains a **composition** choice, not a truth conflict. Choose the filter sheet as the backing component. Canonical status `ACTIVE`, raw `MEDIUM`.

---

## N-23 — I-18 / I-27 TIME PICKER → MASTER DEMO IS VALID

**Session 5 recommended changing the master canon to fit a prototype limitation. That recommendation is REJECTED.**

**What Session 5 proposed:** `Sábado 19:00 → Domingo 19:00` should become `18:00 → 20:30`, because the current Figma prototype's time picker has no `19:00` and its `edit-event` path does not persist.

**The governing principle, stated once:**

> **A Figma limitation never rewrites Product Truth or master canon.**
> Figma is the **visual/UX target**. It is not the capability authority, and it is not the demo-data authority.

**Verification of the three questions the brief poses:**

| Question | Answer | Evidence |
|---|---|---|
| **Does Product Truth allow arbitrary event times?** | **YES — no time restriction exists.** | `supabase/migrations/202606210003_schedules.sql:14-17` — `start_time time not null`, `check (recurrence in (...))`; **the clock value is unconstrained**. `202608100002_household_schedule_blocks.sql:23` — `check (start_minutes >= 0 and end_minutes <= 1439 …)` = every minute of the day is expressible. `20260722030000_m11_2a_event_domain_foundation.sql:142-145` enumerates only `schedule_type in ('timed','all_day')` — never a clock value. **No Product Truth document states any allowed-time set.** |
| **Does Integration support it?** | **YES.** | `front/mi-front-limpio/components/ui/ActionSheet.tsx:172-187` — `TimePickerSheet` builds `hourValues = Array.from({length:24},(_,i)=>i)` and `minuteValues = index*5`. **`19:00` is directly selectable.** |
| **Is `19:00` canon?** | **YES — twice, in a frozen master.** | `NO_UI:1265` `- Sábado · 19:00` (§18 Cumple) · `NO_UI:1284` `- sábado 19:00 → domingo 19:00` (§18 Homi important proposal) · also `NO_UI:1094` (§15 `## I25`) · `NO_UI:1285` `- no confirmar` |

**CANONICAL CLASSIFICATION:**

```
MASTER DEMO = VALID               (19:00 is frozen canon in NO-UI §18, twice)
FIGMA TARGET = IMPLEMENTATION / PROTOTYPE GAP   (picker lacks 19:00; edit-event does not persist)
```

**`I-18` and `I-27`:**

| | RAW SEVERITY | CANONICAL STATUS |
|---|---|---|
| `I-18` | `HIGH` | **RESOLVED_BY_AUTHORITY** as to the *time value*. Its separate observation — no before/after, and it repeats S15's already-consumed mutation — **remains ACTIVE** as a choreography finding. |
| `I-27` | `MEDIUM` | **RESOLVED_BY_AUTHORITY.** Its stated reason (*"master example not reproducible"*) is withdrawn: the master example is valid; the prototype cannot yet render it. |

**Binding rule for Session 7:** **do not change `19:00` to satisfy prototype options.** The correct response to a prototype gap is to record the gap, not to edit the canon. If the Figma picker is ever brought into alignment, that is Figma work, out of this campaign's scope.

---

## N-24 — ORANGE

**Session 5's `J-15` is RESOLVED_BY_AUTHORITY. The two oranges are not equally valid.**

**Search performed this pass across all three authoritative documents, the script, Figma-app, and the presentation package:**

| Hex | In MASTER V1.0 | In NO-UI V2.0 | In the script | Elsewhere |
|---|---|---|---|---|
| **`#E7643F`** | ✅ **`:74`** — *"**Naranja HomePlus principal:** `#E7643F`"* | ✅ **`:197`** — *"HomePlus Orange: `#E7643F`"* | not mentioned | `Figma-app/src/index.css:10` `--color-brand: #E7643F` |
| **`#E65C1B`** | ❌ **0 occurrences** | ❌ **0 occurrences** | ❌ **0 occurrences** | presentation implementation only: `src/presentation/design-system/tokens.ts:9` `accent: '#E65C1B'` |

**CANONICAL:**

```
#E7643F  =  brand / presentation TARGET      (frozen, declared twice, and what Figma-app uses)
#E65C1B  =  STALE current-presentation implementation token
```

**`J-15` → CANONICAL STATUS = `RESOLVED_BY_AUTHORITY`.** Raw severity `MEDIUM` is preserved.

**This was already correctly logged as `OPEN-1` by Session 2** (`02_SCENES_A_B_AUDIT.md:1586`). It was an OPEN, not a decision. It is now decided by authority.

**Do not choose on aesthetics.** The choice is made by two frozen declarations and the product's own CSS custom property. No judgement call remains.

**Knock-on, and it is the same defect in another place:** Session 2's `A-01` (`HIGH` — HomePlus orange `#E65C1B` present on every pre-reveal frame at opacity 0.075–0.28, plus a 176 px orange `.metric-zero`) is **not** resolved by N-24. Resolving *which* orange is correct **aggravates** `A-01`: with `#E7643F` confirmed as the HomePlus orange, the pre-reveal use of it is unambiguously the master §2.1 / NO-UI §5 violation Session 2 graded. `A-01` stays canonically **ACTIVE**.

---

## N-25 — CLOSING OBJECTS

**A real conflict between the closing script and what the opening established. It is a SCRIPT ISSUE. The visual target should prefer objects actually established earlier. The script is NOT rewritten here.**

**Verified object sets:**

| Object | OPENING (script L15–L30) | CLOSING (script L462–465) |
|---|---|---|
| **mochila** | ❌ **absent** | ✅ `la mochila sigue siendo una mochila` (L463) |
| **factura** | ❌ (opening says `seguro del auto`, L18) | ✅ `la factura sigue venciendo` (L464) |
| **heladera** | ✅ `se rompe la heladera nueva` (L21) | ✅ `la heladera se puede romper` (L465) |
| **seguro del auto** | ✅ L18 | ❌ |
| **garantía** | ✅ L21 | ❌ |
| **compras** | ✅ L20 | ❌ |
| **chat viejo** | ✅ L28 | ❌ |
| **calendario** | ✅ L29 | ❌ |
| **bolsa** | ❌ (word absent from script) | ❌ (but `MASTER:256` and `NO_UI:451` both specify a *bolsa*) |

**Only ONE of three closing objects (`heladera`) has an opening antecedent in the script.**

**The governing master rule, verified verbatim:**

```
HOMEPLUS_PRESENTATION_MASTER_FREEZE_V1.0.md
125: ## 2.5. Shared elements
127: Cuando el mismo dato reaparece, debe ser el mismo objeto visual.
129: Elementos de continuidad obligatorios:
131: - WhatsApp viejo de la apertura.
132: - `Ma ❤️: Esta semana lo busco yo a Tomi.`
133: - Cumpleaños.
134: - Lista/compra de supermercado.
135: - PlayStation 5.
136: - Garantía de PlayStation.
137: - Juli/Tomi/Mamá/Papá.
138: - Pregunta `¿Qué me queda para mañana?`
140: No recrear versiones "parecidas".
```

**The master requires SAME-OBJECT recurrence, and it is explicit: *"No recrear versiones 'parecidas'."***

**CONSEQUENCE — binding on Session 7:**

1. **Do NOT invent a new closing object vocabulary.** `MASTER §14 J1` maps `mochila → left`, `factura → right`, `heladera → centre-lower` — but the master cannot manufacture an antecedent the opening never established.
2. The **visual target must prefer objects actually established earlier**: `bolsa` (`grocery-bag.svg` exists in the package), `factura` / `seguro` (`insurance-document.svg` exists), `heladera` (no asset — must be produced), `garantía` (`MASTER §2.5` mandatory).
3. `mochila` has **no opening antecedent at all** → it is the sharpest SCRIPT defect. `SI-23`.
4. **Available assets today** (verified in the production package): `grocery-bag.svg`, `insurance-document.svg`, `family-avatars.svg`. **Missing:** mochila, heladera, casa. Figma-app has **zero** `.svg`/`.png` in `src/`.

**Session 5's `J-04` is retained as raw `MEDIUM` and classified canonically as a `SCRIPT ISSUE`, not a presentation defect** — which is exactly what Session 5 itself concluded (`CLASSIFICATION: SCRIPT ISSUE + NARRATIVE`). **Owner: script owner.** The script text is unchanged by this pass.

---

# PART V — CROSS-SESSION PRODUCT NORMALIZATION

## N-26 — MIGRATION COUNT

**Session 0's `117` is SUPERSEDED. Canonical = `110`.**

**Verified two independent ways this pass:**

```
Filesystem : Get-ChildItem supabase\migrations -File  ->  110   (all .sql, zero other extensions)
Git index  : git ls-files supabase/migrations | Measure -> 110
Range      : 202606210001_auth_base.sql  ..  20260918000001_planner_preset_templates_capability.sql
```

Only one `migrations` directory exists repo-wide. Integration is on branch `gps-ux-recovery`, HEAD `20c5a34`.

**`00_SOURCE_MAP.md`'s `117` (`:358`) is a stale Session-0 metadata fact and must not remain as a competing audit fact.** Session 6 already corrected it (§3.2, §29 `P2-02`). This entry closes it.

**Scope honesty:** this does **not** affect presentation choreography. It is bookkeeping. Recorded because a corpus must not hold two contradictory counts of the same thing.

---

## N-28 — SCRIPT-ISSUE ID NAMESPACE COLLISION *(new — bookkeeping correction)*

**The `SI-*` namespace was reused by later sessions with different meanings. Three IDs are triple-used and three are double-used. This is a real bookkeeping defect and it must not propagate into Session 8.**

**Collisions, verified across all five sources:**

| ID | Session 0 (`00_HUMAN_HYPOTHESES.md` §6 / `00_SOURCE_MAP.md` §2.4) | Session 3 §30 | Session 4 §31 | Session 5 §30 |
|---|---|---|---|---|
| `SI-01` | `Geni`/`Homi` naming | ✳ *script abstract nouns → forbidden literal tasks* | `Geni`/`Homi` ✅ | `Geni`/`Homi` ✅ |
| `SI-02` | speaker `Ber` has no block | ✳ *HomeCloud audio vs master* | — | `Ber` ✅ |
| `SI-03` | Homi example, inconsistent domain | ✳ *Shopping List wording* | — | Homi example ✅ (= Session 0's `SI-06`) |
| `SI-04` | errata `"compar"` | ✳ *Finance→Assets hinge missing* | — | errata ✅ |
| `SI-05` | `"conversaciones"` attributed to Familia | ✳ *birthday never named* | — | — |
| `SI-06` | Geni example vs block 10 | ✳ *Finance scope claim* | — | — |
| `SI-07` | Scene F black-screen ambiguity | ✳ *`Límites` named but not shown* | Scene F ✅ | — |
| `SI-08` | impossible condition L442 | — | — | L442 ✅ |
| `SI-09` | ghost *"última hipótesis"* L490 | — | — | L490 ✅ |
| `SI-10` | — | — | technology-order regression | ✳ *closing objects mismatch* |

✳ = **new meaning, colliding ID.**

**CANONICAL RESOLUTION — Session 0's `SI-01…SI-09` are the frozen registry and are preserved unchanged.** Session 4's `SI-10…SI-15` are preserved unchanged. The colliding re-uses receive **new canonical IDs**.

**Full canonical SI registry: `SI-01` … `SI-24` — 24 items.** See the table in `audit/00_CROSS_SESSION_CONFLICTS.md` §4, which carries FIRST SOURCE / RE-EVIDENCED BY / STATUS / CANONICAL INTERPRETATION / BLOCKS IMPLEMENTATION? / OWNER for each.

**The script itself was NOT rewritten.** `SI-*` are records, not patches.

---

## N-29 — HOMECLOUD AUDIO

**Session 3 and Session 6 both reached the same conclusion from different sides: the presentation master's audio prohibition is STALE.**

**The stale prohibition, verified verbatim in MASTER V1.0:**

| Line | Verbatim |
|---|---|
| `:836` (§9 `## E7 — Recuerdos reales`) | **`No mostrar nota de voz como entidad V1.`** |
| `:1608` (§15 STRESS TEST) | `Inventar audio/nota de voz \| V1 usa fotos/videos + caption; respetar freeze.` |
| `:1664` (§18 GUION CANÓNICO patch list) | `- HomeCloud no promete audio como Recuerdo V1;` |

The master patched its own §18 script to remove audio (`MASTER:1945-1947`: *"pueden quedar fotos, / videos, / o incluso una frase"*). **The delivered script was never updated** — `Guion Compartido (2).md:259` still reads *"o incluso un audio que queremos conservar."*

**The superseding authority, verified verbatim this pass:**

```
C:\Users\thega\Downloads\Nueva carpeta (3)\HOMECLOUD_PRODUCT_EXPERIENCE_FREEZE_V2.md
  3: **Status:** FROZEN
 10: Cuando contradiga decisiones antiguas de V1/V1.3, V2 manda.
316: - Audio                       ← Memory Create options
334: - no fake waveform            ← Recorder rules
335: - no transcription V1
```

**Tie-break authority, verified verbatim:** `MASTER:6` — *"El código actual y los **Product Freeze de cada módulo** siguen siendo autoridad de producto cuando exista una contradicción."* The master subordinates itself. **HomeCloud V2 wins. Audio is approved.**

**CANONICAL CLASSIFICATION:**

| Axis | Verdict |
|---|---|
| **PRODUCT** | **audio APPROVED** (`HOMECLOUD_PRODUCT_EXPERIENCE_FREEZE_V2`, FROZEN; also `HOMECLOUD_PRODUCT_EXPERIENCE_FREEZE_V1.3 §30/§31`, FROZEN 2026-09-09) |
| **INTEGRATION** | **not fully implemented** (DB-level `audio/*` MEMORY MIME landed in `20260910000002_homecloud_memory_audio_support_v1_1.sql`; no client recorder surface) |
| **FIGMA** | **prototype / target support exists** |
| **NET** | **SUPPORTED PRODUCT TARGET + IMPLEMENTATION GAP** — *not* a forbidden capability |

**CORRECTION this entry makes to Session 3's `E-06`:** Session 3 graded `E-06` `MEDIUM` citing *"the master forbids it"* **and** *"the product freeze's own recorder rule is violated."* The **first half of that reason is withdrawn** — the master no longer forbids audio. **The second half survives and is now the whole reason:** `HC_V2:334` `no fake waveform` is an **active rule of the approving freeze itself**, and the drawn `Nota de voz` waveform is exactly that. `E-06` stays `MEDIUM` / **ACTIVE**, on corrected grounds.

**Presentation rule:** audio may be shown as a capability. A **fake waveform** may not be drawn.

---

## N-30 — MAP *(extends N-03)*

**All four rules bind Session 7. N-03 remains the primary entry.**

| Rule | Status |
|---|---|
| **No ETA** | ⛔ never fabricate `8 min` or any ETA |
| **No distance** | ⛔ never fabricate |
| **No travel time** | ⛔ never fabricate |
| **No global family master switch** | ⛔ location sharing is **individual / contextual**, not one household-wide toggle |
| **Figma map pins are illustrative positions, not measured geography** | ⛔ authored CSS percentages are set dressing, not data |

**Authority:** `people_presence_product_freeze.md` (FROZEN, `PEOPLE_PRESENCE_PRODUCT_DEFINITION_CLOSED`) owns Presence. Session 6 §10.3 (`B-F4`/`B-F5`) and §10.4 (`B-F6`) established the individual-vs-global and ETA answers against it. Session 6 also records that the `Precisión` and `Pausa` controls are **absent on both implementable sides** (`SC-08`) — do not invent them.

**Related:** `B-13` (fabricated pin geography) stays **ACTIVE**. `B-14` (location staged as always-on global state) stays **ACTIVE**. `B-12` (`Entrenamiento +1 h` badge on a map that does not own schedules) stays **ACTIVE**. `B-18` (permanently dead `Lugares` tab) stays **ACTIVE** — Session 6 §30.2 records `Lugares` as a gap note, not a presentable surface.

---

## N-31 — ASSETS → HOMECLOUD

**The product relation may be approved. The current real navigation and data-link are not closed.**

| | |
|---|---|
| **Product relation** | `HOMePLUS_ASSETS_PRODUCT_FREEZE_V2.0.md:360-370` — `HomeCloud posee el File canónico` · `File ↔ Asset` · `File ↔ Asset Record` · `File ↔ Care Record` · `Assets no crea un Drive paralelo` |
| **Presentation authority** | `MASTER:237` — *"Relación navegable Assets ↔ HomeCloud \| Hasta estar cerrada, usar transición editorial, no tap real."* |
| **Figma** | has a tap (`push('homecloud')` without id) — but Figma is not the capability authority |
| **Integration** | Assets absent ⇒ **the relation cannot be exercised** |

**CANONICAL:**

```
PRESENTATION = EDITORIAL / SHARED_ELEMENT / DEVICE_TRANSITION
NOT          = fake tap navigation
```

**Authority note:** `MASTER:113-124` names this exact case as an **approved** editorial example (*"Assets Documents → HomeCloud Archivos mientras la integración cross-module no esté cerrada"*). So the editorial treatment is not a compromise here — it is the prescribed one.

---

## N-32 — INVENTORY → FINANCE

**There is no approved automatic Shopping→Finance pipeline. Do not visually imply one.**

| | |
|---|---|
| **What the product does** | `Inventory LOW/OUT → Restock Need → approval → Planner Task`. Finance records the resulting expense **as a ledger fact**. |
| **What must NOT be shown** | buying an item → *automatically creating* a Finance expense, as a depicted action |

**Session 3 already got this exactly right** at `C-11/D-10`: *"the easter egg must read as a **data fact already in the ledger**, not as an action taken on screen."* That instruction is canonical and Session 7 must honour it.

**Authority:** `INVENTORY:1050-1059` §16.4 — *"Dispatch crea/usa una operación canónica de Planner. Inventory no crea un segundo task engine."* Plus `INVENTORY:2115-2124` §32.4 forbidding `automatic-assumption system that adds unconfirmed purchases`.

**Consequence:** the `Supermercado · $48.720` row (N-22 canon) is a **quiet ledger fact**, exactly as `MASTER §8 D0` describes. It is not the visible result of a purchase the audience just watched.

---

## N-33 — CROSS-MODULE NAVIGATION *(default rule)*

**The single governing rule for every module-to-module relation in the film.**

> ## `REAL_NAV` only when real navigation exists.
> Otherwise → `EDITORIAL` · `SHARED_ELEMENT` · `DEVICE_TRANSITION`.
> **No fake taps. Ever.**

**Verified authority:** `MASTER:34` — *"No se deben fingir navegaciones o features inexistentes."* · `MASTER:113-124` — *"Si la navegación existe realmente en HomePlus, se representa como navegación real. Si la relación es conceptual o la integración no existe todavía, se usa una transición editorial evidente, nunca un tap falso."* · `NO_UI:329-330, 336-342` — *"No inventar navegación para justificar un cambio de screen. Si las surfaces están lejos: DEVICE TRANSITION."*

**Approved editorial examples** (`MASTER:100`): `Finance movement → Asset PlayStation` · `Assets Documents → HomeCloud Archivos` · `Propuesta Homi → tarea entrando en un segundo teléfono`.

**What is real, and may be shown as real navigation:** Session 6 §30.1 rule 3 — only **`Plan → Task`** and **`Payment → Movement`** are both real and cross-module, and the second is intra-module. Everything else in the narrative chain is editorial.

---

## N-34 — HOME BY ROLE *(resolves P0-04)*

**Product Truth requires role-aware projection and forbids separate duplicated Home modules. Figma only changes density. Integration has multiple Home variants. Nobody fully complies. The presentation must not resolve this by inventing a product.**

**Verified authority, verbatim this pass:**

```
C:\Users\thega\Downloads\HOMePLUS_HOME_PRODUCT_FREEZE_V1.0.md
 40: Home es la proyección personalizada de lo que importa ahora para una persona dentro del Household activo.
180: # 04. ROLE-AWARE HOME
215: La proyección debe priorizar información útil para su participación real…
959: ## INV-HOME-002 - Role-aware projection
961: Adult+Coordinator, Adult, Adolescent and Child may receive materially different Home projections.
965: Role adaptation never creates separate Home modules or duplicated ownership.
1058: Role/authority changes relevance without duplicating Home.
```

**CANONICAL PRESENTATION RULE:**

```
ONE HOME PRODUCT
  + a presentation-controlled ROLE PROJECTION for Juli / Tomi / Papá / Mamá
```

**Binding prohibitions:**

- ❌ Do **NOT** invent a separate *"Home Juli"* product module. `INV-HOME-003` (`:965`) forbids it.
- ✅ **DO** use the Figma Home grammar — 5 sections in order `Attention → Today → Upcoming → Insights → Recent` — with **role-specific data and state**.

**Classification:**

```
SUPPORTED PRODUCT DIRECTION
  + VISUAL TARGET GAP
```

**Not a Session-7 blocker.** Session 7 can choreograph a role projection using Figma's Home anatomy without deciding whether Figma should add a role variant.

**Related:** `B-01` (Home marks Juli's tasks `V Completada` while narration says *pendiente*) stays **ACTIVE** — it is a data-semantics defect inside a single Home, independent of role projection. `OBS-15` (Integration Home summary only ever exposes 2 of 4 states) remains valid supporting evidence.

---

## N-35 — HORARIOS / SCHEDULE *(resolves P0-03)*

**Code existence does not create Product Truth.**

| Evidence | Verdict |
|---|---|
| `supabase/migrations/202606210003_schedules.sql` · `202608100002_household_schedule_blocks.sql` | tables exist |
| Integration: 4 endpoints, privacy RPC, a dedicated `PlannerSchedulesScreen.tsx` (119 L) | code exists |
| Figma: a polished `Semana de la casa · 4` screen | design exists |
| **`*HORARIO*_PRODUCT_FREEZE*` / `*SCHEDULE*_PRODUCT_FREEZE*`** | ⛔ **NONE EXISTS.** Filename search across `Downloads`, `Desktop`, and all repos: no match. |
| `PLANS_PRODUCT_TRUTH_V1` `:378-379` | `Schedule` exists only as a **boundary concept** |
| `HOMePLUS_PLANNER_PRODUCT_FREEZE_V1.0.md:85` | *"**Planner es el núcleo de organización cotidiana de HomePlus.**"* |

**CANONICAL PRESENTATION-SAFE RULE:**

> ⛔ **DO NOT show a standalone `Horarios` product surface.**
> ✅ **DO** use Planner / Calendar / Event representations for training and time.
> 🔄 If a Product Freeze later freezes Horarios, revisit.

**Classification:** `UNFROZEN CAPABILITY` + `DESIGN AHEAD OF PRODUCT TRUTH`. Not a blocker — the presentation simply uses Planner for time, which is both approved and implemented.

**Do not** present `Horarios` as a 4th Planner tab. Session 6 §30.2 already fixed the canonical Planner tab set at **3**: `Tareas / Calendario / Planes`, with `Responsibilities` as a **row inside Tareas** (all three sides agree) and `Milestones` removed (see **N-38**).

---

## N-36 — FEED vs CONVERSATION *(closes N-04, resolves P0-02)*

**N-04 was right to refuse a decision. The decision is now made, on Product Truth grounds.**

**Verified authority, verbatim this pass:**

```
C:\Users\thega\Downloads\FEED_PRODUCT_FREEZE_V1.0.md
  6: **Fecha de consolidación:** 2026-09-02
  7: **Estado:** FROZEN ON KNOWN TRUTH / GAPS EXPLICITLY OPEN
  9: **Implementation status:** NOT AUDITED / NOT IMPLEMENTED BY THIS FILE
 34: Este documento funciona como autoridad standalone de Feed hasta que una
     decisión posterior y explícita lo reemplace.
```

**§34 is the tie-break: Feed remains the standalone authority until an explicit later decision replaces it.** No such later decision exists. Session 6 searched for one and found none (`§2.3`, `§29 P0-02`).

**Meanwhile Figma removed the surface** (`types.ts:183-185`, *"Family Conversation V2"*) — **a design decision that no product document records.**

**CANONICAL FOUR-LAYER VERDICT:**

| Axis | Verdict |
|---|---|
| **PRODUCT** | **Feed REMAINS approved Product Truth.** `FEED_PRODUCT_FREEZE_V1.0`, FROZEN, standalone authority per `:34`. |
| **FIGMA** | **VISUAL-TARGET GAP** — the Feed surface was removed in favour of Family Conversation without product authority. |
| **INTEGRATION** | **IMPLEMENTATION GAP** — `FeedFamiliar` is a `Demo`-badged stub on `MOCK_POSTS`, zero HTTP calls, inert comment affordances. |
| **PRESENTATION** | **may represent the approved Feed semantics EDITORIALLY**, but ⛔ **must NOT pretend Conversation is the real Feed route.** |

**Classification:**

```
PRODUCT-SUPPORTED
  + VISUAL-TARGET GAP
  + IMPLEMENTATION GAP
```

**⛔ DOES NOT BLOCK Session 7 motion analysis.** This is the single most important gate consequence in this section: the Feed question is a *capability* question, and Session 7's work is *motion/stagecraft*. Session 7 may design the transition to the family message as an explicit editorial transition (`MASTER §6 B6` already authorises exactly this).

**Presentation rule:** the transition into the family message is **editorial**. Do not label it "the Feed". Do not show a Feed surface as if it existed as a product route.

**Related, stays ACTIVE:** `B-15` (Feed presented inside the Familia shell with its tab bar hidden — a navigation lie), `B-16` (technician post is a mock with no thread and no way back). `B-22` layer (ii) is a SCRIPT ISSUE — the word "Feed" names a module neither target has as a current surface (`SI-24`).

---

## N-37 — PS5 MONETARY / DATE OWNERSHIP IN ASSETS

**Assets does NOT own duplicate monetary truth. Do not place `$580.000` or `Mar 2024` as an Asset-owned field.**

**Verified authority, verbatim this pass:**

```
C:\Users\thega\Downloads\HOMePLUS_ASSETS_PRODUCT_FREEZE_V2.0.md
345: # 21. FINANCE OWNERSHIP
347: Finance posee amount, currency, account, financial context, transaction type,
     date, category, correction, refund, trash y balance effects.
349: Assets nunca conserva una segunda verdad monetaria.
352: Transaction → 0..N Assets
841: MaintenancePlan owned by Assets        ← EXPLICITLY NOT CORE V2
843: money owned by Assets                  ← EXPLICITLY NOT CORE V2
886: Assets-owned Maintenance Plan/Cycle    → Planner-owned temporal work
888: Assets-owned money truth               → Finance projection only
```

**Both questions the brief poses, answered from verified text:**

| Question | Answer |
|---|---|
| Is purchase **date** prohibited as Asset-owned truth? | **YES.** `:347` assigns `date` to Finance explicitly, and `:349` forbids a second monetary truth. Purchase date is a Finance-owned attribute. |
| Is **maintenance** an Asset field? | **NO.** `:886` assigns it to *"Planner-owned temporal work"*. `:841`/`:843` mark the Assets-owned variant as out of core V2. |

**Only `Garantía` is a genuine Asset-owned field** — a Warranty `Asset Record` (`ASSETS_V2:266`).

**⇒ `MASTER §9 E0`'s provisional ficha (`:730-732`: `Comprada: Mar 2024` / `Garantía` / `Mantenimiento`) is STALE on two of three fields.** Session 3 already flagged this at §3.5; Session 6 resolved it at §16.2 and §20 `SC-05`. Both agree; **Assets V2.0 governs.**

**Binding rule:** `Mar 2024 · $580.000` may appear **only as a Finance movement** (which N-22 canon already places it in). It may **not** appear on the Asset card. Figma-app already complies — do not "fix" it toward the master.

---

## N-38 — MILESTONES RETIRED *(new — prevents a Session-7 resurrection)*

**Recorded here because it is a live trap: the code implements Milestones, and Product Truth retired them.**

| Source | Verdict |
|---|---|
| `HOMePLUS_PLANNER_PRODUCT_FREEZE_V1.0.md:1683, 1724-1726` | Milestone **is** an entity (older, FROZEN 2026-08-09) |
| `PLANS_PRODUCT_TRUTH_V1_AND_FIGMA_AUDIT.md:302-309, 315` | **`Milestone deja de ser entidad de V1`** — and `:1075-1076` *"los documentos históricos no sustituyen al Product Truth V1"* |
| `PLANS_TECHNICAL_TRUTH_V1.md:1229` | Milestones in the non-target list |
| `PLANS_PRODUCT_TRUTH_V1` is dated **2026-10-01** — **newer** than the Planner freeze (2026-08-09) | **wins** |

**CANONICAL: ⛔ Milestones are NOT a V1 capability. Do not present them.**

This is one of the few places where **file date legitimately contributes** — not as authority by itself, but because `PLANS_PRODUCT_TRUTH_V1` is *newer* **and** self-declares that it supersedes historical documents. Recorded explicitly so it is not confused with **N-16**.

---

## N-39 — FEED PRESENTATION SCOPE *(fine grain of N-36)*

**What may and may not be shown inside the family-message beat**, per `FEED_PRODUCT_FREEZE_V1.0` and Session 6 §30.2:

| ✅ May show | ⛔ Do not show |
|---|---|
| `Mensajes → Familia García`, with the freeze's own copy (`FEED:232`) | a surface labelled "Feed" |
| the message/conversation as an **editorial** destination | reactions |
| | comments (Product mandates Feed Comments use the shared Messaging engine — not built) |
| | algorithmic ranking / social graph |
| | any unread/badge semantics on Activity |

---

# PART VI — AUDIT-CORPUS HYGIENE RULES

## N-40 — SESSION-1 MEASUREMENT ARTEFACTS *(consolidated index)*

**All Session-1 measurement artefacts, in one place, so Session 7 does not rediscover them one at a time.**

| # | Session-1 claim | Status | Corrected by | Canonical value |
|---|---|---|---|---|
| 1 | Planner tab `82 → 137 px` growth | **SUPERSEDED** | N-02 | max **84 px**; pill translates; tabs do not resize |
| 2 | HomeCloud thumbnails `40×40 → 98×62` authored enlargement | **SUPERSEDED** | N-08 | `40×40` = mounted-hidden collapsed; `98×62` = settled. **No authored enlargement.** |
| 3 | 2 animations *"still running"* at 500 ms | **WORDING CORRECTED** | N-10 | count real; they are **finished** `fill-mode:both` glows |
| 4 | `Figma · Diseño · IA` visible at S14 final state | **RECLASSIFIED** | N-17 | text-table / hidden-subtree artefact; settled frame is clean |
| 5 | Stage accent is `#E65C1B` | **RESOLVED** | N-24 | `#E7643F` is the frozen brand orange |
| 6 | 117 migrations | **SUPERSEDED** | N-26 | **110** |

**Rule:** Session 1 remains valid evidence for everything not listed above. It is **not** discarded.

---

## N-41 — GLOBAL DEVICE-SCALE BASELINE *(canonical, corrected)*

| Scene | Scale | Note |
|---|---|---|
| S01–S09 | 1.00 | baseline |
| **S10** | **1.08** | only enlarged scene within C/D/E |
| S11–S14 | n/a | no device on stage (Session 4 `RC-02`) |
| **S15, S16, S17** | **1.08** | Session 5 measured `718,25,324,670`, `matrix(1.08,…)`, unchanged across all 14 states |
| S18 | 1.00 / absent | end card, no device |

**Session 5 positive #2 is CONFIRMED and promoted to a corpus-level rule:** 1.08 with **stable internal geometry** (282×602 in all 66 device states) is **the correct enlargement lever**. Session 1 established it; Session 5 re-verified it; N-09 corrected its scope.

**⛔ Do not** let a later pass re-derive "which scenes are enlarged" from Session 3's false claim. Use this table.

---

## N-42 — EXECUTIVE TALLY IS NOT THE AUTHORITY

**The rule that would have prevented N-11, N-18 and N-27.**

> **The ISSUE REGISTER is the raw-count authority. Executive summaries and narrative prose are not.**

**Proof from this corpus:**

| Session | Executive claim | Register reality | Error |
|---|---|---|---|
| 02 | 3 | 3 | ✅ |
| 03 | (none published; narrative said 6) | 6 | ✅ |
| **04** | **6** | **12** | ❌ **+6** |
| **05** | **7** | **8** | ❌ **+1** |
| 05 | "28 issues" | **42** | ❌ **−14** |

**Binding for Sessions 7–8:** every count published in an executive summary must be reproducible by mechanical parsing of the register before it is stated. Where they disagree, the register wins and the summary is corrected in place with a pointer to this entry.

**Extraction rule that must be used** (both traps are real and both were hit during this pass):
- Accept **combined IDs** of the form `X-nn/Y-nn` (`C-11/D-10`). A naive `[A-J]-\d\d` scan silently drops them and under-reports by one BLOCKER.
- For table-style registers, severity is the **10th** column (index 9) and classification the **9th** (index 8). Sessions 2–4 use heading-style blocks; **Session 5 uses tables**. A single parser must handle both.

---

## N-43 — RAW SEVERITY IS NEVER OVERWRITTEN

**Two independent axes. Always both.**

| Axis | Vocabulary | Owner |
|---|---|---|
| **RAW SEVERITY** | `BLOCKER` / `HIGH` / `MEDIUM` / `LOW` / `POSITIVE` / ungraded | the source audit. **Immutable.** |
| **CANONICAL STATUS** | `ACTIVE` / `SUPERSEDED` / `RESOLVED_BY_AUTHORITY` / `DUPLICATE` / `SUBSUMED` / `OPEN_DECISION` / `EVIDENCE_ONLY` / `POSITIVE` | the cross-session corpus. Owned by this file. |

**Worked example from this pass — `I-15`:**

```
RAW SEVERITY    = BLOCKER        ← unchanged, forever
CANONICAL STATUS = RESOLVED_BY_AUTHORITY   ← decided by N-22
```

The issue was real. The demo-data conflict was genuine. Authority has since supplied the canon that settles it. **Both facts are true and both are recorded.**

**Self-declared subsumptions are honoured, not second-guessed.** Session 4 declared `F-04` *"(subsumed by F-01…)"* and `G-16` *"(subsumed by G-01…)"* in the severity field itself. Their raw severities (`HIGH`, `MEDIUM`) are preserved; their canonical status is `SUBSUMED`. Session 4's reasoning — *"recorded separately because it is the one beat with an exact frozen specification"* — is accepted as given.

---

## N-44 — AUDIT DOES NOT REWRITE THE SCRIPT

**Reaffirmed and made explicit, because four separate entries above (N-06, N-20, N-23, N-25) all touch the script and none of them may act on it.**

- `SI-*` entries are **records**, not patches.
- No `SCRIPT ISSUE` was corrected, reworded, or removed by this pass.
- No session rewrote `Guion Compartido (2).md`. It is unmodified.
- Where a script line is unsafe, the correct output is a **SCRIPT ISSUE with an owner**, not a fix.
- **Exception, and it is the only one:** where a *master* canon and a *script* line disagree and the master is demonstrably stale, the entry records that the master wins — it still does **not** edit the script. See N-29 (audio) and N-23 (19:00): in both, the canonical value is recorded and the script text is left for the script owner.

---

## N-45 — WRITE SCOPE OF THIS NORMALIZATION PASS

**Every write of this pass is under `audit/`. Verified.**

| Path | Action |
|---|---|
| `audit/00_AUDIT_NORMALIZATION.md` | rewritten (N-01…N-05 preserved verbatim in substance) |
| `audit/00_CANONICAL_ISSUE_REGISTRY.md` | **created** |
| `audit/00_CROSS_SESSION_CONFLICTS.md` | **created** |
| `audit/00_SESSION7_GATE.md` | **created** |
| `audit/03_SCENES_C_E_AUDIT.md` | normalisation notice only |
| `audit/04_SCENES_F_H_AUDIT.md` | normalisation notice + **corrected executive tally** (N-11) |
| `audit/05_SCENES_I_J_AUDIT.md` | normalisation notice + **corrected executive tally** (N-18) |
| `audit/06_FIGMA_VS_INTEGRATION.md` | normalisation notice only |
| `audit/02_SCENES_A_B_AUDIT.md` | **untouched** — N-01 already recorded there; no new cross-session correction affects it |
| production package (159 files) | **untouched** — SHA-256 + mtime identical to the Session-1 manifest |
| `Figma-app` | **read-only**; not a git repository |
| Integration | **read-only**; pre-existing uncommitted state preserved, not touched |
| script / masters / Product Truth | **read-only** |
| packages | **none installed** |

**Session 7 was NOT started.**

---

## Consumption rule (restated, final)

Sessions 7 and 8 MUST read this file before synthesizing evidence.

When this file conflicts with an earlier measurement, this normalization file wins **ONLY** for the explicitly listed corrections.

It does **not** override unrelated findings.

**And: Product Truth remains above this audit normalization.** Where this file and a frozen Product Truth disagree, the Product Truth is right and this file is wrong — report it, do not act on it.

---

**END OF NORMALIZATION FILE**