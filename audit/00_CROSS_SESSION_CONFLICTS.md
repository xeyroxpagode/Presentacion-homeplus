# 00 — CROSS-SESSION CONFLICTS

**Issued:** Global Audit Normalization pass, 2026-10-05.
**Purpose:** every place where two sessions (or a session and a frozen authority) disagree, recorded with evidence, authority and resolution — plus the deduplicated script-issue registry.
**Companion files:** `00_AUDIT_NORMALIZATION.md` · `00_CANONICAL_ISSUE_REGISTRY.md` · `00_SESSION7_GATE.md`

---

## 0. RULES OF THIS FILE

1. **A conflict is only closed when an authority closes it.** Where no authority exists, the status is `OPEN` and an owner is named. Nothing is resolved by preference, by taste, or by majority of sessions.
2. **"Later session wins" is not a rule.** A later specialized session supersedes an earlier finding **only** when it (a) measured the same thing more precisely, (b) inspected a source the earlier session did not, (c) found a stronger authority, or (d) reproduced the result and proved the earlier attribution wrong. Each resolution below names which of the four applies.
3. **File date is not authority.** See `CF-15`. The one place date legitimately contributes is `CF-21`, and there it works *together with* a self-declared supersession, not alone.
4. **History is preserved.** Every superseded statement remains readable in its source report. This file records what it now means.

---

## 1. AUTHORITY HIERARCHY APPLIED

### 1.1 Product capability

| Rank | Authority | Role | Can it be overridden by a lower rank? |
|---|---|---|---|
| 1 | latest approved / frozen **Product Truth** | what the product may claim | — |
| 2 | **Integration** = CURRENT implementation evidence | what exists today | no |
| 3 | **Figma** = prototype / visual target | how it should look | **never creates Product Truth** |

### 1.2 Presentation

| Rank | Authority | Role |
|---|---|---|
| 1 | **Product Truth** | limits what may be claimed |
| 2 | **Presentation Master V1.0** | narrative + visual intent |
| 3 | **NO-UI Master V2.0** | execution + motion principles |
| 4 | **current Script** | delivered spoken wording |
| 5 | **current Presentation runtime** | CURRENT implementation |
| 6 | **human walkthrough** | hypothesis source only |

### 1.3 Verified authority documents used in this file

All located in `C:\Users\thega\Downloads\` unless noted. Existence verified by filename search; every cited line was read verbatim this pass.

| Document | Date | Class | Verified at |
|---|---|---|---|
| `HOMePLUS_INVENTORY_PRODUCT_FREEZE_V1.0.md` | 2026-08-12 | PRODUCT AUTHORITY (2 452 lines) | `:6` `MODULE_PRODUCT_DEFINITION_CLOSED` |
| `HOMePLUS_ASSETS_PRODUCT_FREEZE_V2.0.md` | **2026-10-01** | PRODUCT AUTHORITY (1 377 lines) | `:5` `Estado: FROZEN - Product Target` |
| `HOMePLUS_HOME_PRODUCT_FREEZE_V1.0.md` | 2026-08-12 | PRODUCT AUTHORITY (1 187 lines) | `:6` `MODULE_PRODUCT_DEFINITION_CLOSED` |
| `HOMePLUS_PLANNER_PRODUCT_FREEZE_V1.0.md` | 2026-08-09 | SUPPORTING, partly superseded | `:85` |
| `HOMePLUS_FINANCE_PRODUCT_FREEZE_V1.1.md` | 2026-08-12 | PRODUCT AUTHORITY | `:6` |
| `FEED_PRODUCT_FREEZE_V1.0.md` | 2026-09-02 | PRODUCT AUTHORITY (1 435 lines) | `:7`, `:34` |
| `MENSAJES_PRODUCT_FREEZE_V1.0.md` | 2026-08-20 | PRODUCT AUTHORITY (Mensajes) | — |
| `PLANS_PRODUCT_TRUTH_V1_AND_FIGMA_AUDIT.md` | 2026-10-01 | PRODUCT AUTHORITY | `:1075-1076` |
| `HOMECLOUD_PRODUCT_EXPERIENCE_FREEZE_V2.md` | 2026-09-25 | PRODUCT AUTHORITY (`Nueva carpeta (3)\`) | `:3` `FROZEN`, `:10` precedence clause |
| `people_presence_product_freeze.md` | 2026-08-14 | PRODUCT AUTHORITY (Presence) | `:2-8` |
| `HOMEPLUS_PRESENTATION_MASTER_FREEZE_V1.0.md` | 2026-09-23 | staging — **NOT product truth** | `:6` self-subordination |
| `HOMEPLUS_PRESENTATION_NO_UI_MASTER_FREEZE_V2.0.md` | 2026-09-22 | staging — **NOT product truth** | `:12-13` |
| `Guion Compartido (2).md` | 2026-09-24 | spoken-wording authority | 497 lines |

> ⚠ **None of the three presentation documents carries a date line in its front matter.** The dates above are **filesystem mtimes** — chronology only. `CF-15` explains why that is not authority.

> ⚠ **A frozen module Product Freeze outranks the presentation masters.** `MASTER:6` says so explicitly. Several conflicts below are resolved by exactly that clause.

---

## 2. CONFLICT REGISTER

### CF-01 — Planner tab "growth" 82 px → 137 px

| | |
|---|---|
| **SOURCE A** | **Session 1** — `01_RUNTIME_BASELINE.md` §5.4: Planner tab grows `82 px → 137 px` |
| **SOURCE B** | **Session 2** — rAF-sampled measurement over **222 frames**, armed before the keypress, plus all four stable states |
| **WHAT DIFFERS** | Whether the tabs resize at all, and by how much |
| **EVIDENCE** | Only **two** width combinations ever occurred: stable `≈ 81 / 82 / 81 px`, transient `≈ 80 / 84 / 80 px`. The **selection pill translates** (`left: 3px → 84.33px → 165.66px`, width constant `81.33px`). 137 px is **geometrically impossible** in a 244 px track split three ways by `flex: 1`. |
| **AUTHORITY** | Measurement precision. Session 2 measured the same thing more precisely (222 frames vs a point sample) **and** found a physical impossibility in Session 1's number. Precedence clause (a). |
| **RESOLUTION** | **SUPERSEDED.** Max observed tab width = **84 px**. The pill moves. The tabs do not resize. |
| **STATUS** | ✅ **CLOSED** — `N-02`, `01_RUNTIME_BASELINE_ERRATA.md` §E-01 |

---

### CF-02 — HomeCloud thumbnails 40×40 → 98×62

| | |
|---|---|
| **SOURCE A** | **Session 1** — an **authored conditional enlargement** of HomeCloud thumbnails |
| **SOURCE B** | **Session 3** §25.2 — remeasurement |
| **WHAT DIFFERS** | Whether an authored enlargement exists |
| **EVIDENCE** | `40×40` is the **mounted-but-hidden collapsed box**. `98×62` is the **settled layout**. Two states of one element — not a transition. Session 1 read a hidden state and a settled state as an authored motion. |
| **AUTHORITY** | Measurement precision + root-cause identification. Precedence clause (a). |
| **RESOLUTION** | **SUPERSEDED.** There is **no** authored conditional enlargement. Any Session-7 recommendation that enlarges HomeCloud thumbnails as a focus technique is **invalid as specified**; whole-device scale is the correct lever. |
| **STATUS** | ✅ **CLOSED** — `N-08` |

---

### CF-03 — `getAnimations()` "still running"

| | |
|---|---|
| **SOURCE A** | **Session 1** — **2** animations at the 500 ms sample, described as *"still running"* |
| **SOURCE B** | **Session 3** — both are **finished** `fill-mode: both` **ambient-glow** animations still returned by `document.getAnimations()` |
| **WHAT DIFFERS** | Wording only. The **count is not in dispute.** |
| **EVIDENCE** | `fill-mode: both` retains the final keyframe's computed values and keeps the animation object attached to the document. `getAnimations()` returns it. `playState` is `finished`. |
| **AUTHORITY** | Root-cause identification on an undisputed observation. Precedence clause (d) — reproduces the result, corrects the attribution. |
| **RESOLUTION** | **The count is real. The phrase "still running" is imprecise. These are not active motion.** Binding rule for Session 7: `getAnimations().length` is **not** a motion-intensity metric. Classify by `playState` first. |
| **STATUS** | ✅ **CLOSED** — `N-10` |

---

### CF-04 — S14 final state: visible residue or hidden subtree?

| | |
|---|---|
| **SOURCE A** | **Session 1** text-table evidence — `Figma · Diseño · IA` present at S14's final question state |
| **SOURCE B** | **Session 4** §26 `H-P1` + settled screenshot — *"a genuinely clean, residue-free black frame"* |
| **WHAT DIFFERS** | Whether the S14 key question lands on clean black |
| **EVIDENCE** | `H-09`: `.s13-center` **re-asserts `visibility: visible`**, so the `.s14-echo` subtree is not robustly hidden. A DOM / text-table harvest finds strings the painted frame does not show. Same class of artefact as `CF-03`. |
| **AUTHORITY** | Settled visual evidence beats a text inventory for a visibility question. Session 4 read the settled screenshot back individually. |
| **RESOLUTION** | **RECLASSIFIED as `SESSION-1 TEXT-TABLE / HIDDEN-SUBTREE ARTEFACT`.** There is **no visible S14 residue.** `H-09` stays raw `LOW` — a robustness issue graded `LOW` is correct and is **not** changed. |
| **GENERAL RULE** | A text inventory is evidence of **DOM presence**, never of **visible presence**. For S14's final state, text-table harvests are **not admissible**. |
| **STATUS** | ✅ **CLOSED** — `N-17` |

---

### CF-05 — Shopping List: capability, or implementation gap?

**The single highest-stakes conflict in the campaign.**

| | |
|---|---|
| **SOURCE A** | **Session 3** §3.3 — final classification **`SUPPORTED (V1.1 candidate) + NOT YET IMPLEMENTED`**, escalated to an open product decision (`SI-03`) |
| **SOURCE B** | **Session 6** §14 / §20 `SC-02` — **`UNSUPPORTED CLAIM`**, excluded by name, three times |
| **SOURCE C** | **`HOMePLUS_INVENTORY_PRODUCT_FREEZE_V1.0.md`** (frozen, `MODULE_PRODUCT_DEFINITION_CLOSED`) — the actual authority |
| **WHAT DIFFERS** | Whether Shopping List is an approved capability with an implementation gap, or an unapproved capability |
| **EVIDENCE — verbatim, verified this pass** | `:802` **`No es una Shopping List.`**<br>`:977` **`No es una entidad Shopping List independiente.`**<br>`:2120` **`- duplicate Shopping List;`** (inside §32.4 `Explicitly Not Target`)<br>`:815-819` approved chain: *"Cuando un Item con Minimum entra en LOW/OUT: → automatic Restock Need PENDING"*<br>`:121` `Dispatch usa Planner` |
| **THE ERROR IN SOURCE A** | Session 3 **read the frozen V1.0 and reported its exclusion correctly** — then let an **unfrozen `PRODUCT DEFINITION CANDIDATE FREEZE V1.1` embedded in a chat export** (`Inventory Foundation.md`) reverse the frozen verdict in its final classification. Session 3 also documented the correct approved chain at §3.3 and ranked it second. |
| **AUTHORITY** | Frozen Product Truth outranks an unfrozen candidate. **`MASTER:6`** is the tie-break: *"El código actual y los Product Freeze de cada módulo siguen siendo autoridad de producto cuando exista una contradicción."* Precedence clause (c) — stronger authority found. |
| **RESOLUTION** | **PRODUCT TRUTH: NOT APPROVED / EXPLICITLY EXCLUDED.**<br>**FIGMA: POLISHED PROTOTYPE ONLY.**<br>**INTEGRATION: ABSENT** (0 routes / 0 screens / 0 services / 0 tables).<br>**CAPABILITY: UNSUPPORTED CLAIM.**<br>**PRESENTATION: DO NOT SHOW AS WORKING PRODUCT CAPABILITY.**<br><br>**Approved chain (exists in both Product Truth and Integration):**<br>`LOW/OUT → Restock Need (PENDING) → approval → canonical Planner Task → Dispatch via Planner → Finance records the expense` |
| **REOPENING** | If the product owner wants Shopping List back, that is a **separate Product Pass** — not an audit decision and not a Session-7 decision. |
| **STATUS** | ✅ **CLOSED** — `N-06`, `C-05`, `SI-18`, `P0-01` |

---

### CF-06 — Is Shopping List / Inventory present in Figma-app?

| | |
|---|---|
| **SOURCE A** | **Session 3** §3.3 — *"NOT PRESENT as a surface"*; Inventory surfaces *"not reached"* in that harvest |
| **SOURCE B** | **Session 6** §13 / §14 — reached and runtime-captured |
| **WHAT DIFFERS** | Whether the Figma-app surfaces exist |
| **EVIDENCE** | Session 6 reached `src/inventory/InventoryRoot.tsx`, `src/inventory/Products.tsx`, `src/inventory/ShoppingList.tsx` (27 868 B, full state machine), `src/screens/Shopping.tsx`, `src/screens/Inventory.tsx`, plus 61 PNG + 126 JSON captures with a computed-style census. |
| **AUTHORITY** | Session 6 **inspected a source Session 3 did not reach** and produced runtime capture. Precedence clause (b). |
| **RESOLUTION** | **Session-3 evidence = `NOT REACHED IN THAT HARVEST`.** It is **NOT** `ABSENT FROM FIGMA-APP`. Session 3's raw observation is preserved; its *inference* is withdrawn. |
| **⚠ DOES NOT CHANGE CF-05** | A polished Figma prototype **still** does not create Product Truth. `PROTOTYPE ONLY` stands. |
| **STATUS** | ✅ **CLOSED** — `N-07` |

---

### CF-07 — Feed vs Family Conversation

| | |
|---|---|
| **SOURCE A** | **N-04 (Session 2)** — OPEN, correctly refused to declare any implementation canonical |
| **SOURCE B** | **Session 6** `P0-02` — Figma removed the Feed surface for *"Family Conversation V2"* (`types.ts:183-185`), **a decision no product document records**; Integration has a `Demo`-badged stub |
| **SOURCE C** | **`FEED_PRODUCT_FREEZE_V1.0.md`** (frozen 2026-09-02) |
| **WHAT DIFFERS** | Whether the Feed surface still exists as approved Product Truth |
| **EVIDENCE — verbatim** | `:6` `Fecha de consolidación: 2026-09-02` · `:7` `Estado: FROZEN ON KNOWN TRUTH / GAPS EXPLICITLY OPEN` · `:9` `Implementation status: NOT AUDITED / NOT IMPLEMENTED BY THIS FILE` · **`:34`** `Este documento funciona como autoridad standalone de Feed hasta que una decisión posterior y explícita lo reemplace.` |
| **AUTHORITY** | **`:34` is the tie-break.** Feed remains the standalone authority **until an explicit later decision replaces it**. Session 6 searched for such a decision and found none. |
| **RESOLUTION** | **PRODUCT: Feed REMAINS approved Product Truth.**<br>**FIGMA: VISUAL-TARGET GAP** (surface removed without product authority).<br>**INTEGRATION: IMPLEMENTATION GAP** (`Demo` badge, `MOCK_POSTS`, zero HTTP calls, inert comments).<br>**PRESENTATION: may represent approved Feed semantics EDITORIALLY, but must NOT pretend Conversation is the real Feed route.** |
| **SESSION-7 EFFECT** | ⛔ **Does not block.** This is a *capability* question; Session 7's work is *motion / stagecraft*. `MASTER §6 B6` already authorises an editorial transition. |
| **STATUS** | ✅ **CLOSED** — `N-36` supersedes `N-04`; `N-04` preserved as history |

---

### CF-08 — Map: ETA, distance, travel time, global location switch

| | |
|---|---|
| **SOURCE A** | **MASTER §6 B5** — requests proximity evidence: *"cercanía → relación espacial simple (`8 min` o equivalente)"* |
| **SOURCE B** | **Integration + Figma + `people_presence_product_freeze.md`** — none of it exists |
| **WHAT DIFFERS** | Whether `8 min` is a presentation requirement |
| **EVIDENCE** | No ETA, no distance, no travel-time service. The only geometry in the codebase (`distanceBetweenMeters`, `front/mi-front-limpio/services/presenceLocationSharing.ts:125-138`) is used **internally to throttle publish frequency** and is never surfaced. Presence offers only `getRelativeTime()` (`Ahora` / `Hace 5 min` / `Hace 1 h`) and `getStatusLabel()` (`Compartiendo ubicación` / `Desactualizada` / `Sin ubicacion` / `No comparte`). Figma's `MapaTab` shows neither. Location sharing is **individual / contextual**, not a household master switch. Session 6 `SC-08`: `Precisión` and `Pausa` controls are **absent on both implementable sides**. |
| **AUTHORITY** | Product Truth outranks the presentation master (`MASTER:6`). **This conflict is NOT resolved by the audit** — it requires the Master owner **and** the Product owner jointly. |
| **RESOLUTION** | **`8 min` MUST NOT be treated as a presentation requirement.** Show only: place · recency · presence/status · sharing state. Never fabricate minutes away, distance, ETA, or any relative-proximity calculation. Figma map pins are **illustrative positions, not measured geography** — the presentation's authored CSS percentages (`.map-school 24%/29%` etc.) are a fabrication to remove (`B-13`). |
| **⚠ NOT TO BE RESOLVED ARTIFICIALLY** | `N-03` is a genuine open conflict between two authorities. The presentation-safe rule binds every session until the owners act. |
| **STATUS** | 🟡 **OPEN BY DESIGN** — presentation-safe rule issued (`N-03` + `N-30`). Blocks nothing. |

---

### CF-09 — Horarios / Schedule: designed, implemented, but never frozen

| | |
|---|---|
| **SOURCE A** | **Code + design exist** — `household_schedule_blocks` table, 4 endpoints, privacy RPC, a dedicated `PlannerSchedulesScreen.tsx` (119 L), and a polished Figma `Semana de la casa · 4` screen |
| **SOURCE B** | **No Product Truth exists** |
| **WHAT DIFFERS** | Whether a standalone `Horarios` surface may be shown |
| **EVIDENCE** | Filename search across `Downloads`, `Desktop` and all repos: **no `*HORARIO*_PRODUCT_FREEZE*`, no `*SCHEDULE*_PRODUCT_FREEZE*`.** `PLANS_PRODUCT_TRUTH_V1:378-379` has `Schedule` only as a **boundary concept**. `HOMePLUS_PLANNER_PRODUCT_FREEZE_V1.0.md:85` — *"**Planner es el núcleo de organización cotidiana de HomePlus.**"* |
| **AUTHORITY** | **Code existence does not create Product Truth.** Figma never creates Product Truth; neither does Integration. |
| **RESOLUTION** | ⛔ **DO NOT show a standalone `Horarios` product surface.** ✅ **DO** use Planner / Calendar / Event representations for training and time. ⛔ Do **not** add `Horarios` as a 4th Planner tab — the canonical Planner set is **3**: `Tareas / Calendario / Planes`, with `Responsibilities` as a **row inside Tareas** (all three sides agree) and `Milestones` removed (`CF-21`). Revisit only if a Product Freeze freezes Horarios. |
| **STATUS** | ✅ **CLOSED** — `N-35`, `P0-03` |

---

### CF-10 — Home by role: density, projection, or duplicated modules?

| | |
|---|---|
| **SOURCE A** | **Figma** — changes only **density** by role |
| **SOURCE B** | **Integration** — has **multiple Home variants** |
| **SOURCE C** | **`HOMePLUS_HOME_PRODUCT_FREEZE_V1.0.md`** — the authority |
| **WHAT DIFFERS** | What *"materially different projections"* means, and whether a separate Home-per-role module is allowed |
| **EVIDENCE — verbatim** | `:40` `Home es la proyección personalizada de lo que importa ahora para una persona dentro del Household activo.`<br>`:180` `# 04. ROLE-AWARE HOME`<br>`:959` `## INV-HOME-002 - Role-aware projection`<br>`:961` `Adult+Coordinator, Adult, Adolescent and Child may receive materially different Home projections.`<br>`:965` **`Role adaptation never creates separate Home modules or duplicated ownership.`**<br>`:1058` `Role/authority changes relevance without duplicating Home.` |
| **WHAT DIFFERS, precisely** | **Nobody fully complies.** Figma under-delivers on `:961`; Integration **violates** `:965`. Session 6 `P0-04` recorded exactly this. |
| **AUTHORITY** | Frozen Product Truth. Precedence clause (c). |
| **RESOLUTION** | **ONE HOME PRODUCT + a presentation-controlled ROLE PROJECTION** for Juli / Tomi / Papá / Mamá. ⛔ Do **NOT** invent a separate *"Home Juli"* module (`INV-HOME-003` at `:965` forbids it). ✅ **DO** use the Figma Home grammar — 5 sections, `Attention → Today → Upcoming → Insights → Recent` — with role-specific data and state. Classification: `SUPPORTED PRODUCT DIRECTION + VISUAL TARGET GAP`. |
| **SESSION-7 EFFECT** | ⛔ Not a blocker. Session 7 can choreograph a role projection without deciding whether Figma should add a role variant. |
| **STATUS** | ✅ **CLOSED for presentation purposes** — `N-34`, `P0-04`. The *product* question (should Figma add role variants?) remains open but is not Session 7's to answer. |

---

### CF-11 — Assets: "does not exist in the product" vs APPROVED / FROZEN

| | |
|---|---|
| **SOURCE A** | **Session 4** — Assets / PS5 / Documentos "do not exist **in the product**" |
| **SOURCE B** | **Session 6** §16 — Assets is **approved and frozen**, and Figma is its most faithful implementation |
| **SOURCE C** | **`HOMePLUS_ASSETS_PRODUCT_FREEZE_V2.0.md`** |
| **WHAT DIFFERS** | Whether the Assets capability is fake or approved |
| **EVIDENCE — verbatim** | `:3-5` `Versión: 2.0` · `Fecha: 2026-10-01` · **`Estado: FROZEN - Product Target`**<br>`:27-30` `LOGICALLY_CLOSED / PRODUCT_BEHAVIOR_COMPLETE / READY_FOR_IMPLEMENTATION`<br>`:33` *"Este documento define **TARGET**. … Una diferencia entre CURRENT y este documento es un **REAL GAP**, no una razón para modificar Product Truth."*<br>`:360-370` `HomeCloud posee el File canónico` · `File ↔ Asset` · `Assets no crea un Drive paralelo`<br>Integration: **0** routes, **0** services, **0** tables |
| **AUTHORITY** | Frozen Product Freeze, dated **8 days after** the presentation master. **`MASTER:722`** (*"Assets todavía no tiene Product Freeze final"*) is therefore **stale**, and `MASTER:6` yields to it. Session 3 had already applied this correctly at §3.5. |
| **RESOLUTION** | **FOUR-WAY:**<br>`ASSETS PRODUCT TARGET` = **APPROVED / FROZEN**<br>`FIGMA` = root + detail **exist** and follow the freeze<br>`INTEGRATION CURRENT` = **NOT IMPLEMENTED**<br>`CURRENT EXECUTABLE NAV` = **DOES NOT EXIST**<br><br>⇒ `Home → Assets → PS5 → Documentos` **cannot be shown as real current navigation.**<br>⇒ **But the capability is NOT fake:** `SUPPORTED PRODUCT TARGET + IMPLEMENTATION GAP + FAKE CURRENT NAVIGATION IF PRESENTED AS TAP PATH`.<br>⇒ Use **editorial / shared-element / device-transition** until Integration exists. |
| **⚠ H-02 UNAFFECTED** | `H-02` (warranty route names three non-existent nodes) stays **raw BLOCKER / canonically ACTIVE**. Fixing Assets' *authority* does not create a *route*. |
| **STATUS** | ✅ **CLOSED** — `N-13`, `N-31` |

---

### CF-12 — AI / Homi: concept, or current implementation?

| | |
|---|---|
| **SOURCE A** | **SCRIPT L320** — *"también usamos modelos de inteligencia artificial en alguna partes del sistema."* Present tense `usamos`, no hedge |
| **SOURCE B** | **Session 4** — Integration has **0** AI providers, **0** `/api/*ai` routes, **0** edge functions, **0** AI env vars, **0** mock surface |
| **SOURCE C** | **Session 5** — Homi is presentation-only; the freeze says *"Geni no está implementado en este freeze"* |
| **WHAT DIFFERS** | Whether a present-tense technical-stack claim about AI is safe |
| **EVIDENCE** | `L320` is the **only** present-tense AI-implementation claim in all 497 script lines. Runtime declares `assistantName: 'HOMI'`; `src/` has **0** matches for `Geni`. |
| **AUTHORITY** | Integration = CURRENT implementation evidence. Zero providers/routes/functions/env is decisive. |
| **RESOLUTION — three layers, and the two wrong conclusions named explicitly** | `HOMI / AI CONCEPT` → **MAY EXIST** as presentation / future product concept<br>`CURRENT IMPLEMENTATION` → **NONE VERIFIED**<br>`TECH-STACK PRESENT-TENSE CLAIM` → **UNSAFE**<br><br>❌ Do **not** conclude *"Homi can never be a product feature."* — unsupported, out of scope.<br>❌ Do **not** conclude *"Homi is fake."* — also unsupported; it is a concept, honestly pitched.<br>✅ Conclude only: **Homi is not a verified current implemented capability.** |
| **`I-26` RECLASSIFIED** | Session 5's *"Homi is not a product feature"* is **withdrawn as unsupported**. Canonical: `CURRENT not implemented` / `PRODUCT FREEZE not implemented in that freeze` / `PRESENTATION is a concept`. |
| **`G-12`** | Stays **canonically ACTIVE** (raw BLOCKER preserved) unless the script sentence changes or real implementation evidence appears. |
| **SESSION-7 EFFECT** | ⛔ Not a blocker. Presentation choreography **may** demonstrate Homi **conceptually**; the script must not assert implementation facts that do not exist today. |
| **STATUS** | ✅ **CLOSED** — `N-14` + `N-21`, `G-12`, `I-26`, `SI-01`, `SI-11` |

---

### CF-13 — HomeCloud audio: master prohibition vs a newer Product Freeze

| | |
|---|---|
| **SOURCE A** | **MASTER V1.0** — prohibits audio in **three** places |
| **SOURCE B** | **`HOMECLOUD_PRODUCT_EXPERIENCE_FREEZE_V2.md`** (2026-09-25) — **approves** audio |
| **WHAT DIFFERS** | Whether audio is a forbidden capability or an approved one |
| **EVIDENCE — SOURCE A, verbatim** | `:836` (§9 `## E7 — Recuerdos reales`) **`No mostrar nota de voz como entidad V1.`**<br>`:1608` (§15 STRESS TEST) `Inventar audio/nota de voz \| V1 usa fotos/videos + caption; respetar freeze.`<br>`:1664` (§18 patch list) `- HomeCloud no promete audio como Recuerdo V1;`<br>The master patched its own §18 script (`MASTER:1945-1947` → *"pueden quedar fotos, / videos, o incluso una frase"*). **The delivered script was never updated** — `Guion:259` still reads *"o incluso un audio que queremos conservar."* |
| **EVIDENCE — SOURCE B, verbatim** | `:3` `**Status:** FROZEN`<br>`:10` **`Cuando contradiga decisiones antiguas de V1/V1.3, V2 manda.`**<br>`:316` `- Audio` (Memory Create options)<br>`:334` `- no fake waveform`<br>`:335` `- no transcription V1` |
| **AUTHORITY** | **`MASTER:6`** — *"este documento reemplaza los planteos visuales previos. El código actual y los **Product Freeze de cada módulo** siguen siendo autoridad de producto cuando exista una contradicción."* The master **subordinates itself**. Session 3 and Session 6 reached the same conclusion independently. |
| **RESOLUTION** | **PRODUCT: audio APPROVED.** INTEGRATION: not fully implemented (DB-level `audio/*` MEMORY MIME landed in `20260910000002_homecloud_memory_audio_support_v1_1.sql`; no client recorder surface). FIGMA: prototype / target support exists.<br>⇒ **`SUPPORTED PRODUCT TARGET + IMPLEMENTATION GAP`** — *not* a forbidden capability. |
| **⚠ NUANCE THAT SURVIVES** | `HC_V2:334` **`no fake waveform`** is an **active rule of the approving freeze itself**. Audio may be shown; a **fake waveform may not be drawn.** |
| **`E-06` CORRECTED** | Session 3 graded `E-06` MEDIUM citing *"the master forbids it"* **and** *"the freeze's own recorder rule is violated."* The **first half is withdrawn**; the **second half is now the whole reason**. Stays `MEDIUM` / **ACTIVE** on corrected grounds. |
| **STATUS** | ✅ **CLOSED** — `N-29`, `E-06`, `SI-17` |

---

### CF-14 — Finance demo dataset: three competing sets

| | |
|---|---|
| **SOURCE A** | **NO-UI §18 DEMO DATA CANON** (frozen) |
| **SOURCE B** | **Figma** — `Supermercado / Alimentación / $61.800` |
| **SOURCE C** | **presentation S09** — `Alimentos $24.500 / Transporte $18.600` etc. |
| **SOURCE D** | **NO-UI master V1.0** — uses placeholders (`Supermercado · $XX.XXX`), no figures |
| **WHAT DIFFERS** | Which dataset the film shows |
| **EVIDENCE — SOURCE A, verbatim** | `NO_UI:1249` `# 18. DEMO DATA CANON`<br>`:1276` `- Supermercado ` + "`$48.720`"<br>`:1277` `- Monthly supermarket ` + "`$184.320`"<br>`:1278` `- 12 movimientos`<br>`:1279` `- Nafta ` + "`$32.500`"<br>`:1280` `- PS5 ` + "`Mar 2024 · $580.000`"<br>Header: `Estado: FROZEN para ejecución` |
| **ISSUES WITH SOURCE B/C** | `$61.800`, `Alimentación`, `$24.500`, `$18.600` appear in **zero** lines of either frozen master. |
| **THE TEST APPLIED** | *Demo values do not need to exist in Integration source to be valid presentation data, provided the product can represent the underlying concept and the presentation uses one consistent dataset.* → §18 **is** an explicit frozen presentation canon; Finance **can** represent the concept (`Movimientos` + `Análisis` exist in Product Truth and Integration; Session 3 §3.4 called Finance *"the most mature of the six in every dimension"*); **no Finance Product Truth rule is violated by any of the three.** ⇒ This is a **PRESENTATION DEMO-DATA conflict**, not a Product Truth conflict. |
| **RESOLUTION** | **Authority is sufficient ⇒ RESOLVED, not OPEN.**<br>**ONE consistent Finance demo dataset across S09 and the Homi Finance beat, taken from NO-UI §18.** Values: `Supermercado $48.720` / `Monthly supermarket $184.320` / `12 movimientos` / `Nafta $32.500` / `PS5 Mar 2024 · $580.000` (as a **Finance movement**, not an Asset field — `CF-18`).<br>**A fourth dataset was NOT invented.** `$61.800`, `Alimentación`, `$24.500`, `$18.600` are **non-canon**. |
| **REQUIRED DISTINCTION** | **`"supermercado"` is a natural-language merchant / description / query token. `Alimentación` and `Compras` are Finance category-taxonomy keys.** Different layers. ⛔ Do **not** require the spoken word *"supermercado"* to be a category key, and do not treat the mismatch as a defect by itself. |
| **`I-15`** | RAW severity `BLOCKER` **preserved** · CANONICAL STATUS = **`RESOLVED_BY_AUTHORITY`**. |
| **`I-28` residual** | `12 movimientos` is renderable in the Figma movement-filter sheet, **not** in `Resumen`. A **composition** choice, not a truth conflict. Use the filter sheet. Stays `MEDIUM` / **ACTIVE**. |
| **STATUS** | ✅ **CLOSED** — `N-22`, `I-15`, `I-28` |

---

### CF-15 — Figma technology order: script vs master

**The conflict the brief specifically warned must not be settled by timestamps.**

| | |
|---|---|
| **SOURCE A** | **MASTER §11 `## G4 — Tecnologías`** (canonical copy, verified) |
| **SOURCE B** | **SCRIPT L314–L320** |
| **SOURCE C** | **NO-UI §13** — independently agrees with the MASTER |
| **WHAT DIFFERS** | Figma sits at **position 1** or **position 4** |
| **EVIDENCE — SOURCE A, verbatim** | `:1023` *"Para diseñar el frontend de HomePlus usamos **Figma**, donde primero definimos y probamos cómo queríamos que funcionara la experiencia. **Después** lo implementamos con React Native y Expo."*<br>`:1027` `Figma aparece como herramienta previa/de diseño`<br>`:1611` `Figma siempre se muestra como etapa de diseño`<br>Order: **Figma → React Native/Expo → Node → Supabase/PostgreSQL → IA** |
| **EVIDENCE — SOURCE B, verbatim** | `:314` `Para construir el frontend de HomePlus usamos React Native y Expo.`<br>`:316` `y en el Backend, Node.js se encarga de parte de la lógica y los servicios, mientras que Supabase y PostgreSQL nos permiten manejar la identidad…`<br>`:318` **`Y antes de programar las pantallas usamos Figma, para diseñar y probar cómo queríamos que funcionara la experiencia.`**<br>`:320` `también usamos modelos de inteligencia artificial…`<br>Order: **RN/Expo → Node → Supabase/PG → Figma → AI** |
| **EVIDENCE — SOURCE C** | `:952` `Figma: ligado al diseño previo del frontend.` · `:953` `React Native + Expo: implementación frontend.` — **agrees with the master** |
| **⚠ FILE DATES — chronology only** | NO-UI `2026-09-22` · MASTER `2026-09-23` · **SCRIPT `2026-09-24`** (filesystem mtime; **none of the three documents carries a date line**). The script is the newest file and diverges from the master. |
| **WHY DATE IS NOT AUTHORITY** | **`MASTER:6`** is the clause that actually governs: the master subordinates *itself* to module Product Freeze and **never claims to outrank the script**. `00_AUDIT_CONTRACT.md` §2 gives the script authority over *"qué se dice"* and the master over *"cómo se muestra"* — **technology ordering is a spoken-wording question.** Two masters agreeing against the script is evidence of **weight**, not of **authority**. |
| **RESOLUTION** | **`SCRIPT / MASTER CONFLICT` — UNRESOLVED by design.**<br>⛔ Do **not** pick Figma-first or Figma-fourth from timestamps.<br>⛔ Do **not** silently reorder the speaker's lines.<br>✅ Present both orders; `SI-10` is the script-side expression; **owner = script owner.** Session 7 may choreograph **either** order — both are stageable. |
| **⚠ THE ONE PLACE DATE DOES DECIDE** | See `CF-21` (Milestones). There, `PLANS_PRODUCT_TRUTH_V1` is newer **and** self-declares at `:1075-1076` that *"los documentos históricos no sustituyen al Product Truth V1."* Date plus explicit self-declared supersession = authority. Date alone = never. |
| **STATUS** | 🟡 **OPEN — by design.** `N-16`, `G-06`, `G-10`, `SI-10`. **Blocks nothing.** |

---

### CF-16 — The 19:00 time picker: master demo vs prototype limitation

| | |
|---|---|
| **SOURCE A** | **Session 5** `I-18` / `I-27` — **recommends changing** `Sábado 19:00 → Domingo 19:00` to `18:00 → 20:30` |
| **SOURCE B** | **Figma prototype** — picker has no `19:00`; `edit-event` does not persist |
| **SOURCE C** | **Product Truth + Integration** |
| **WHAT DIFFERS** | Whether a prototype limitation may rewrite master canon |
| **EVIDENCE — SOURCE C, verbatim** | `202606210003_schedules.sql:14-17` — `start_time time not null`, `check (recurrence in ('daily','weekly','monthly','none'))`; **the clock value is unconstrained.**<br>`202608100002_household_schedule_blocks.sql:23` — `check (start_minutes >= 0 and end_minutes <= 1439 …)` = every minute of the day.<br>`20260722030000_m11_2a_event_domain_foundation.sql:142-145` — enumerates only `schedule_type in ('timed','all_day')`, **never a clock value.**<br>**No Product Truth document states any allowed-time set.**<br>`front/mi-front-limpio/components/ui/ActionSheet.tsx:184-185` — `hourValues = Array.from({length:24},(_,i)=>i)`, `minuteValues = index*5`. **`19:00` is directly selectable.** |
| **IS `19:00` CANON?** | **YES — twice, in a frozen master.** `NO_UI:1265` `- Sábado · 19:00` (§18 Cumple) · `NO_UI:1284` `- sábado 19:00 → domingo 19:00` (§18 Homi important proposal) · also `:1094` (§15 `## I25`) · `:1285` `- no confirmar`. **Absent from MASTER V1.0 and from the script** (the script says only *"Un cumpleaños el sábado es un evento"*, L146 — day, not time). |
| **AUTHORITY** | **The governing principle: a Figma limitation never rewrites Product Truth or master canon.** Figma is the visual/UX target. It is not the capability authority and not the demo-data authority. Session 5's recommendation is therefore **REJECTED as a method**. |
| **RESOLUTION** | `MASTER DEMO` = **VALID**<br>`FIGMA TARGET` = **IMPLEMENTATION / PROTOTYPE GAP**<br><br>⛔ Do **not** change `19:00` to satisfy prototype options. The correct response to a prototype gap is to **record** it. |
| **`I-27`** | RAW `MEDIUM` preserved · CANONICAL = **`RESOLVED_BY_AUTHORITY`**. Its stated reason (*"master example not reproducible"*) is **withdrawn**. |
| **`I-18`** | Stays `HIGH` / **ACTIVE**, but **only** for its choreography half: no before/after, and it repeats S15's already-consumed mutation. The *time value* is settled. |
| **STATUS** | ✅ **CLOSED** — `N-23`, `I-18`, `I-27` |

---

### CF-17 — The orange token: two oranges, no decision

| | |
|---|---|
| **SOURCE A** | **Presentation implementation** — `--presentation-accent: #E65C1B`, `design-system/tokens.ts:9` |
| **SOURCE B** | **Two frozen masters + Figma-app** — `#E7643F` |
| **WHAT DIFFERS** | Which orange is HomePlus orange |
| **EVIDENCE — verified by search across all three authoritative documents, the script, Figma-app and the presentation package** | **`#E7643F`:** ✅ `MASTER:74` — *"**Naranja HomePlus principal:** `#E7643F`"* · ✅ `NO_UI:197` — *"HomePlus Orange: `#E7643F`"* · ✅ `Figma-app/src/index.css:10` `--color-brand: #E7643F`<br>**`#E65C1B`:** ❌ **0 occurrences** in `MASTER`, ❌ **0** in `NO_UI`, ❌ **0** in the script. Implementation only. |
| **SOURCE OF THE CONFLICT** | Session 2 logged it as **`OPEN-1`** (`02_SCENES_A_B_AUDIT.md:1586`) — correctly as an open question, not a decision. Session 5 raised `J-15` *"DECISION REQUIRED which orange"*. **Both were right to leave it open.** |
| **AUTHORITY** | Two independent frozen declarations **plus** the product's own CSS custom property. |
| **RESOLUTION** | `#E7643F` = **brand / presentation TARGET**<br>`#E65C1B` = **stale current-presentation implementation token**<br>**Decided by authority, not aesthetics.** `J-15` → CANONICAL = **`RESOLVED_BY_AUTHORITY`**, raw `MEDIUM` preserved. |
| **⚠ KNOCK-ON — `A-01` GETS WORSE, NOT BETTER** | Session 2's `A-01` (`HIGH`) is *"HomePlus orange `#E65C1B` is on stage before the reveal, at every state"* (19 states, opacities 0.075–0.28, plus a **176 px** orange `.metric-zero` two states before the reveal). **Resolving *which* orange is correct aggravates `A-01`:** with `#E7643F` confirmed as the HomePlus orange, the pre-reveal use of it is unambiguously the `MASTER §2.1` / `NO-UI §5` violation (*"Antes del reveal A16: **NO naranja HomePlus**"*). `A-01` stays canonically **ACTIVE**. |
| **STATUS** | ✅ **CLOSED** — `N-24`, `J-15`, `A-01` (aggravated) |

---

### CF-18 — PS5 money and date on the Asset card

| | |
|---|---|
| **SOURCE A** | **`MASTER §9 E0`** provisional ficha — `Comprada: Mar 2024` / `Garantía` / `Mantenimiento` / `Documentos: 3 archivos`, plus `§3` *"demo sugerida: Mar 2024 / $580.000"* |
| **SOURCE B** | **`HOMePLUS_ASSETS_PRODUCT_FREEZE_V2.0.md`** |
| **WHAT DIFFERS** | Whether an Asset may own a price, a purchase date, or a maintenance state |
| **EVIDENCE — verbatim** | `:345` `# 21. FINANCE OWNERSHIP`<br>`:347` `Finance posee amount, currency, account, financial context, transaction type, **date**, category, correction, refund, trash y balance effects.`<br>`:349` **`Assets nunca conserva una segunda verdad monetaria.`**<br>`:352` `Transaction → 0..N Assets`<br>`:841` `MaintenancePlan owned by Assets` ← in `EXPLICITLY NOT CORE V2`<br>`:843` `money owned by Assets` ← in `EXPLICITLY NOT CORE V2`<br>`:886` `Assets-owned Maintenance Plan/Cycle` → **`Planner-owned temporal work`**<br>`:888` `Assets-owned money truth` → **`Finance projection only`**<br>`:266` Warranty **is** a real Asset Record type |
| **BOTH QUESTIONS ANSWERED** | **Purchase date prohibited as Asset-owned truth?** **YES** — `:347` assigns `date` to Finance explicitly; `:349` forbids a second monetary truth.<br>**Maintenance an Asset field?** **NO** — `:886` assigns it to Planner-owned temporal work; `:841`/`:843` mark the Assets-owned variant out of core V2. |
| **RESOLUTION** | **Only `Garantía` is a genuine Asset-owned field.** ⛔ `Mar 2024` and ⛔ `$580.000` may **not** appear on the Asset card — **only as a Finance movement** (where `CF-14` canon already places them). **`MASTER §9 E0` is STALE on two of its three fields.** Figma-app **already complies** — ⛔ do **not** "fix" it toward the master. |
| **STATUS** | ✅ **CLOSED** — `N-37`, `E-02`, `D-09` |

---

### CF-19 — Migration count: 117 vs 110

| | |
|---|---|
| **SOURCE A** | **Session 0** — `00_SOURCE_MAP.md:358` records **117** migrations |
| **SOURCE B** | **Session 6** §3.2 / §29 `P2-02` — **110** |
| **WHAT DIFFERS** | A metadata count |
| **EVIDENCE — verified twice this pass** | Filesystem: `Get-ChildItem supabase\migrations -File` → **110** files, all `.sql`, zero other extensions.<br>Git index: `git ls-files supabase/migrations \| Measure-Object` → **110**.<br>Range `202606210001_auth_base.sql` … `20260918000001_planner_preset_templates_capability.sql`. Only one `migrations` directory exists repo-wide. Branch `gps-ux-recovery`, HEAD `20c5a34`. |
| **AUTHORITY** | Direct enumeration, two independent methods. |
| **RESOLUTION** | **Canonical = 110.** `00_SOURCE_MAP.md`'s `117` is a **stale Session-0 metadata fact** and must not remain as a competing audit fact. |
| **SCOPE HONESTY** | ⛔ This does **not** affect presentation choreography. It is bookkeeping. Recorded because a corpus must not hold two contradictory counts of the same thing. Session 6 flagged it as *not investigated*; this pass closes it. |
| **STATUS** | ✅ **CLOSED** — `N-26` |

---

### CF-20 — Closing objects vs opening objects

| | |
|---|---|
| **SOURCE A** | **SCRIPT closing**, L462–465 — `la mochila` / `la factura` / `la heladera` |
| **SOURCE B** | **SCRIPT opening**, L15–L30 — `seguro del auto` (L18) / `las compras` (L20) / `la heladera nueva` + `la garantía` (L21) / `un chat viejo` (L28) / `un calendario` (L29) |
| **SOURCE C** | **`MASTER §2.5 Shared elements`** |
| **WHAT DIFFERS** | Which objects the closing may name |
| **EVIDENCE — SOURCE C, verbatim** | `:125` `## 2.5. Shared elements`<br>`:127` **`Cuando el mismo dato reaparece, debe ser el mismo objeto visual.`**<br>`:129` `Elementos de continuidad obligatorios:`<br>`:131-138` `WhatsApp viejo de la apertura` · `` `Ma ❤️: Esta semana lo busco yo a Tomi.` `` · `Cumpleaños` · `Lista/compra de supermercado` · `PlayStation 5` · `Garantía de PlayStation` · `Juli/Tomi/Mamá/Papá` · `` `¿Qué me queda para mañana?` `<br>`:140` **`No recrear versiones "parecidas".`** |
| **THE SET COMPARISON** | `mochila` — ❌ **absent from the opening entirely** · `factura` — ❌ opening says `seguro del auto` · `heladera` — ✅ **the only overlap**<br>Opening-only: `seguro del auto`, `garantía`, `compras`, `chat viejo`, `calendario`. `bolsa` is in `MASTER:256` and `NO_UI:451` but the word is **absent from the script**. |
| **AUTHORITY** | Master §2.5 — explicit, and it forbids *"versiones parecidas"*. But **the master cannot manufacture an antecedent the opening never established.** |
| **RESOLUTION** | `J-04` is a **SCRIPT ISSUE** (raw `MEDIUM` preserved), **not** a presentation defect — exactly as Session 5 itself concluded.<br>⛔ Do **NOT** invent a new closing object vocabulary. `MASTER §14 J1` maps `mochila → left`, `factura → right`, `heladera → centre-lower`, but `mochila` has no antecedent.<br>✅ The **visual target must prefer objects actually established earlier**: `bolsa` (`grocery-bag.svg` exists), `factura`/`seguro` (`insurance-document.svg` exists), `heladera` (**no asset — must be produced**), `garantía` (`MASTER §2.5` mandatory).<br>**Assets today:** `grocery-bag.svg`, `insurance-document.svg`, `family-avatars.svg`. **Missing:** mochila, heladera, casa. Figma-app has **zero** `.svg`/`.png` in `src/`.<br>**Owner = script owner. The script is NOT rewritten by this pass** (`N-44`). |
| **STATUS** | 🟡 **OPEN on wording** — `N-25`, `J-04`, `SI-23`. **Blocks nothing:** Session 7 can choreograph recurrence from the established set. |

---

### CF-21 — Milestones: an entity the code implements and Product Truth retired

| | |
|---|---|
| **SOURCE A** | **`HOMePLUS_PLANNER_PRODUCT_FREEZE_V1.0.md`** (2026-08-09, FROZEN) — Milestone **is** an entity (`:1683`, `:1724-1726`) |
| **SOURCE B** | **`PLANS_PRODUCT_TRUTH_V1_AND_FIGMA_AUDIT.md`** (2026-10-01) — **retired** |
| **WHAT DIFFERS** | Whether Milestones may be shown |
| **EVIDENCE — SOURCE B, verbatim** | `:302-309` **`Milestone deja de ser entidad de V1`** · `:315` same · **`:1075-1076` `los documentos históricos no sustituyen al Product Truth V1`**<br>`PLANS_TECHNICAL_TRUTH_V1.md:1229` — Milestones in the non-target list<br>Session 6 §2.3 `A-03` resolved this identically. |
| **AUTHORITY** | **This is the ONE place file date legitimately contributes — and note that it is not the date alone.** `PLANS_PRODUCT_TRUTH_V1` is newer **and** carries an explicit self-declared supersession clause at `:1075-1076`. Either alone would be insufficient; together they decide. Contrast `CF-15`. |
| **RESOLUTION** | ⛔ **Milestones are NOT a V1 capability. Do not present them.** |
| **STATUS** | ✅ **CLOSED** — `N-38` |

---

### CF-22 — Bookkeeping: executive blocker tallies and the `SI-*` namespace

**Recorded because both are corpus-integrity defects that would propagate into Session 8.**

#### CF-22a — Executive tallies vs the issue registers

| Session | Executive claim | Register reality | Error |
|---|---|---|---|
| 02 | 3 | **3** | ✅ |
| 03 | *(no tally published; narrative said 6)* | **6** | ✅ |
| **04** | **6** (F 1 / G 4 / H 1) | **12** (F 1 / G 7 / H 4) | ❌ **+6** |
| **05** | **7** | **8** | ❌ **+1** |
| 05 | *"28 issues"* | **42** | ❌ **−14** |

Session 4's own sentence *"No other issue in Scenes F, G or H is graded BLOCKER"* is false for `G-05`, `G-12`, `G-15`, `H-02`, `H-04`, `H-05`.
**Rule adopted:** the **ISSUE REGISTER is the raw-count authority**; executive summaries are not. `N-11`, `N-18`, `N-19`, `N-42`.

#### CF-22b — `SI-*` ID namespace collision

The `SI-*` namespace was **reused by later sessions with different meanings**. Three IDs are triple-used and three are double-used.

| ID | Session 0 | Session 3 §30 | Session 4 §31 | Session 5 §30 |
|---|---|---|---|---|
| `SI-01` | `Geni`/`Homi` | ✳ *script abstract nouns → forbidden literal tasks* | `Geni`/`Homi` ✅ | `Geni`/`Homi` ✅ |
| `SI-02` | speaker `Ber` has no block | ✳ *HomeCloud audio vs master* | — | `Ber` ✅ |
| `SI-03` | Homi example, inconsistent domain | ✳ *Shopping List wording* | — | Homi example ✅ (= S0's `SI-06`) |
| `SI-04` | errata `"compar"` | ✳ *Finance→Assets hinge missing* | — | errata ✅ |
| `SI-05` | `"conversaciones"` → Familia | ✳ *birthday never named* | — | — |
| `SI-06` | Geni example vs block 10 | ✳ *Finance scope claim* | — | — |
| `SI-07` | Scene F black-screen ambiguity | ✳ *`Límites` named but not shown* | Scene F ✅ | — |
| `SI-08` | impossible condition L442 | — | — | L442 ✅ |
| `SI-09` | ghost *"última hipótesis"* L490 | — | — | L490 ✅ |
| `SI-10` | — | — | technology-order regression | ✳ *closing objects mismatch* |

✳ = new meaning, colliding ID.

**Resolution:** Session 0's `SI-01…SI-09` are the frozen registry and are **preserved unchanged**. Session 4's `SI-10…SI-15` are **preserved unchanged**. The colliding re-uses receive **new canonical IDs** (`SI-16…SI-24`, §4 below). **The script itself was not rewritten** (`N-44`).

**Status:** ✅ **CLOSED** — `N-15`, `N-28`, `N-42`

---

## 3. CLOSED / OPEN SUMMARY

| Status | Count | IDs |
|---|---|---|
| ✅ **CLOSED** | **18** | CF-01, CF-02, CF-03, CF-04, CF-05, CF-06, CF-07, CF-09, CF-10, CF-11, CF-12, CF-13, CF-14, CF-16, CF-17, CF-18, CF-19, CF-21, CF-22 |
| 🟡 **OPEN** | **2** | **CF-08** (Map ETA — a genuine authority conflict, open *by design*, presentation-safe rule issued) · **CF-15** (technology order — script/master conflict, owner = script owner) · **CF-20** (closing object wording — owner = script owner) |

**The three open items are all owned outside this campaign** (Master+Product owners for ETA; script owner for the other two), and **none of them blocks Session 7.** See `00_SESSION7_GATE.md`.

---

## 4. SCRIPT ISSUE REGISTRY — NORMALIZED

**24 canonical script issues.** Deduplicated across Sessions 0–5 per `CF-22b`.

**These are records, not patches. The script was NOT rewritten. No `SI-*` was corrected by this pass.** (`N-44`)

| SCRIPT ISSUE ID | FIRST SOURCE | RE-EVIDENCED BY | STATUS | CANONICAL INTERPRETATION | BLOCKS IMPLEMENTATION? | OWNER |
|---|---|---|---|---|---|---|
| **`SI-01`** Geni → Homi | S0 `00_SOURCE_MAP.md` §2.4 | S2 `B-22` · S4 §31 · S5 §30 (`I-26`, `J-18`) | **ACTIVE** | Script says `Geni` at 8 lines (L345/347/349/356/365/367/431/438/446); runtime and product use `HOMI` (0 matches for `Geni` in `src/`). **`MASTER:1662` already orders `Geni → Homi`** and the script was never re-issued. Blocks the S14→S15 reveal: the name is first spoken at the reveal. | **NO** — motion unaffected; wording only | script owner |
| **`SI-02`** speaker `Ber` has no block | S0 `00_SOURCE_MAP.md` §2.4 | S5 §30 | **REGISTER ONLY** | `Ber` is declared in the cast (L11) but never assigned a speaking role. | **NO** | script owner (register only) |
| **`SI-03`** Homi example, inconsistent domain | S0 `00_SOURCE_MAP.md` §2.4 | S5 §30 (= S0's `SI-06`) | **ACTIVE** | Block 9 uses *"comprar una coca"*; block 10 asks by agenda (L375) and Finance (L403). **Frozen canon resolves it:** master §3 / `NO_UI §15 I02` specify `Haceme acordar de comprar una Coca mañana`. | **NO** | script owner |
| **`SI-04`** errata `"compar"` | S0 `00_SOURCE_MAP.md` §2.4 | S5 §30 | **ACTIVE — trivial** | L355 `compar` → `comprar`. | **NO** | script owner |
| **`SI-05`** `"conversaciones"` attributed to Familia | S0 `00_HUMAN_HYPOTHESES.md` §6 (L91) | S2 `B-22` layer (i) | **ACTIVE** | L91 lists *"relacionando personas, lugares, horarios **y conversaciones**"* under Familia. Conversations belong to Feed. **Session 2 added that master §18 froze the same wording**, so it is not a transcription slip. | **NO** | script owner |
| **`SI-06`** Geni example vs block 10 | S0 `00_HUMAN_HYPOTHESES.md` §6 | S5 §30 | **DUPLICATE of `SI-03`** | Same defect, two IDs. Session 0 itself noted *"se solapa con SI-03"*. **Canonical: fold into `SI-03`.** | **NO** | — (merged) |
| **`SI-07`** Scene F black-screen ambiguity | S0 `00_HUMAN_HYPOTHESES.md` §6 (L271) | S4 §31 | **ACTIVE** | Author's own marker: `[Aca va la de continuidad pero en realidad sería una screen negra]`. The implementation chose **neither** — a black screen that also carries two sentences. Evidence now supports **(c)** the object/relation scene the master specifies. | **NO** | script owner |
| **`SI-08`** impossible condition L442 | S0 `00_HUMAN_HYPOTHESES.md` §6 | S5 §30 (`J-16`) | **ACTIVE** | `[…hasta que el Colo termina de hablar]` — but at L442 the active speaker is **Benja** (block 11, L423–441). Colo already spoke at L462. **The condition can never be satisfied at L442.** The black should be tied to **Gaby's** closing (L444–458). | **NO** — but affects which speaker gets the black | script owner |
| **`SI-09`** ghost *"última hipótesis"* L490 | S0 `00_HUMAN_HYPOTHESES.md` §6 | S5 §30 (`J-17`) | **ACTIVE** | `[Aca aparece esa ultima hipotetica q deberia existir]` — **no "hipótesis" exists in the script.** L491 says *"Porque si homeplus funciona como queremos…"* (conditional, not hypothetical). The author marked missing content; `MASTER J21` (*"simplemente viviendo"*) is the intended beat. | **NO** | script owner |
| **`SI-10`** technology-order regression | S4 §31 (L314–L320 vs `MASTER §18 L2002`) | S3 §3 (`G-06`, `G-10`) | **OPEN DECISION** | Master §11 G4 + NO-UI §13 put **Figma first**; the script puts it **fourth**. See **`CF-15`**. Two masters agree against the script, but ordering is spoken wording. **Do not resolve from timestamps.** | **NO** — both orders are stageable | script owner |
| **`SI-11`** AI present-tense claim | S4 §31 (L320) | S5 §30 · `CF-12` | **ACTIVE** | *"también usamos modelos de inteligencia artificial en alguna partes del sistema."* **Unhedged present tense.** Integration: 0 providers / 0 routes / 0 edge functions / 0 AI env / 0 mock surface. **The only present-tense AI claim in all 497 script lines.** Recommended: remove. | **NO** — but the claim is **unsafe on stage** | script owner |
| **`SI-12`** warranty-search has no product referent | S4 §31 (L335–336) | `H-02`, `H-03`, `CF-11` | **ACTIVE** | *"si quiero buscar una garantía, tengo q saber donde esta"*. No Assets module, no `Documentos` section, no warranty entity; Planner search cannot reach documents (`planner.search.service.js:12-18`). Nearest real path is `Más → HomeCloud → Archivos → Buscar`. **Assets' authority is now settled** (`CF-11`) but the **route still does not exist**. | **NO** — but the route must be editorial, not a tap | script owner + product owner |
| **`SI-13`** spoken ≠ displayed at the key question | S4 §31 (L343 vs on-screen) | — | **ACTIVE** | Script: *"¿que pasaría si ni siquiera tuviéramos que saber como?"* Screen: *"¿Y si ni siquiera tuviéramos que saber cómo?"* Different sentence **and** different orthography. `MASTER §2.3` approves only the on-screen wording. | **NO** — copy only | script owner |
| **`SI-14`** Scene F duplicates the speaker | S4 §31 (L296, L298 vs screen) | `F-03` | **ACTIVE** | Script: *"la vida no ocurre separada en módulos"* / *"HomePlus tampoco debería sentirse así."* Screen: *"La vida no pasa por módulos."* / *"HomePlus los conecta."* `MASTER §2.3`: *"No duplicar lo que dice el expositor."* `HomePlus los conecta.` should be removed. | **NO** — copy only | script owner |
| **`SI-15`** script vs S12 deferral | S4 §31 (L304 vs S12) | `G-02` | **RECORD ONLY** | L304 says technologies come later; S12 opens with all five logos. **This is an implementation defect (`G-02`), not a script defect.** Recorded so the script owner does not "fix" the script to match the implementation. | **NO** | presentation developer (not script) |
| **`SI-16`** script abstract nouns as literal tasks | **S3 §30** *(colliding reuse of `SI-01`)* | `C-02` | **ACTIVE** | L147–152: the script's own abstract nouns (`repartir tareas / preparar cosas / resolver qué comprar`) are the three strings `MASTER §7 C2` **forbids verbatim** as literal tasks. **The script is the source of the violation.** Keep the three as a brief editorial beat; make the Plan's tasks concrete (`NO_UI §18`). | **NO** | script owner |
| **`SI-17`** HomeCloud audio in the script | **S3 §30** *(colliding reuse of `SI-02`)* | `CF-13` · `E-06` | **RESOLVED BY AUTHORITY** | Script L257–259: *"pueden quedar fotos, una frase, **o incluso un audio**."* `MASTER:1664` patched this to *"fotos, videos, o incluso una frase"* — **the delivered script was never updated.** `HC_V2:316` **approves** audio, so the master's prohibition is stale (`CF-13`); but `HC_V2:334` **`no fake waveform`** is active. | **NO** | script owner (copy) |
| **`SI-18`** Shopping List wording | **S3 §30** *(colliding reuse of `SI-03`)* | `C-05`, `I-12` · `CF-05` | **ACTIVE — HIGHEST LEGAL RISK** | L169–170: the missing item *"puede sumarse automáticamente a la lista de compras."* **`HOMePLUS_INVENTORY_PRODUCT_FREEZE_V1.0` forbids a Shopping List** (`:802`, `:977`, `:2120`). | **NO** — but **the line must not be spoken as a current capability.** Approved substitute chain: Restock Need → Planner Task | script owner + product owner |
| **`SI-19`** Finance→Assets hinge missing | **S3 §30** *(colliding reuse of `SI-04`)* | `D-09` · `CF-18` | **ACTIVE** | L232–236 has **no hinge** between Finance and Assets. `MASTER §18`'s patched script adds *"porque algunas compras terminan ahí, como un gasto. / Otras se quedan años dentro de la casa."* Without it, *"Pensemos en la Play"* is a non-sequitur. | **NO** — but the conceptual hinge is unrepresented | script owner |
| **`SI-20`** birthday never named | **S3 §30** *(colliding reuse of `SI-05`)* | `E-08` | **ACTIVE** | L146 *"Un cumpleaños el sábado"* vs L253 *"Volvamos al cumpleaños"*. `NO_UI §18` canon is `Cumple de Juli · Sábado · 19:00`. The presentation uses the bare word `Cumpleaños` and dates the memory `20 ago` (Thursday) against the plan's `Sábado` (22 ago). **One birthday object across the film**, with canon name, date and time. | **NO** | script owner |
| **`SI-21`** Finance scope claim | **S3 §30** *(colliding reuse of `SI-06`)* | `D-04` | **ACTIVE** | L188–190 *"tanto personales como del hogar"* is spoken, but the presentation's Finance shows only `Familia García`. `MASTER §18`'s patched script says *"separar tus gastos de los del hogar"*, which at least names the mechanism. Either show the `Personal \| Hogar` control or reduce the line to the household scope. | **NO** — copy only | script owner |
| **`SI-22`** `Límites` named but not shown | **S3 §30** *(colliding reuse of `SI-07`)* | `D-06` | **ACTIVE** | L206–210 *"También podemos establecer límites"* names a complete product — real in both target and Integration — that the presentation does not show and the master's §8 D-section does not choreograph. Add a `Límites` state, or fold it into `Resumen` as the target does. | **NO** | script owner + presentation developer |
| **`SI-23`** closing objects ≠ opening objects | **S5 §30** *(colliding reuse of `SI-10`)* | `J-04` · **`CF-20`** | **ACTIVE** | L462–465 names `mochila / factura / heladera`; the opening established `seguro del auto / compras / heladera + garantía`. **Only 1 of 3 overlaps.** `MASTER §2.5` requires same-object recurrence and forbids *"versiones parecidas"*. | **NO** | script owner |
| **`SI-24`** "Feed" names a module neither target has | **S2 `B-22` layer (ii)** | `CF-07` | **ACTIVE** | Session 2's *new* finding beyond `SI-05`: the word **"Feed"** names a module that **neither target has as a current surface** — Figma removed it (*"Family Conversation V2"*, `types.ts:183-185`, a decision **no product document records**) and Integration's is a `Demo` stub. `FEED_PRODUCT_FREEZE_V1.0:34` keeps Feed as **standalone authority**, so the script's *intent* is approved — but the **on-screen route must not be labelled "Feed"**. | **NO** — `N-36` already fixes presentation | script owner |

### 4.1 Script-issue summary

| Category | Canonical IDs |
|---|---|
| Naming | `SI-01` |
| Register-only | `SI-02`, `SI-15` |
| Copy / wording | `SI-04`, `SI-05`, `SI-13`, `SI-14`, `SI-21` |
| Product-truth exposure | `SI-11`, `SI-12`, `SI-18`, `SI-24` |
| Structural / continuity | `SI-03` (+`SI-06` merged), `SI-07`, `SI-08`, `SI-09`, `SI-16`, `SI-19`, `SI-20`, `SI-22`, `SI-23` |
| Resolved by authority | `SI-17` (`CF-13`) |
| Open decision | `SI-10` (`CF-15`) |
| **TOTAL** | **24** |

### 4.2 The three highest-risk script issues

| ID | Why it is the highest risk |
|---|---|
| **`SI-18`** Shopping List wording | The only script line that asserts a capability **frozen Product Truth explicitly denies, three times by name.** It is the campaign's largest product-truth exposure. |
| **`SI-11`** AI present-tense claim | The only present-tense technical-stack claim with **zero** corresponding implementation. Session 4 graded the stage treatment `BLOCKER` (`G-12`). |
| **`SI-01`** Geni → Homi | Cheapest to fix, hardest to notice: the reveal speaks a name the screen does not show. `MASTER:1662` already ordered the fix; the script was simply never re-issued. |

---

## 5. WHAT THIS FILE DOES NOT DO

- It does **not** rewrite the script, the masters, or any Product Truth document.
- It does **not** choose between two spoken wordings where both masters merely *weigh* against the script (`CF-15`).
- It does **not** invent authority. Where no authority exists (`CF-08`, `CF-15`, `CF-20`), the status is `OPEN` and an owner is named.
- It does **not** recover absorbed issues as `ACTIVE` (`F-04`, `G-16`).
- It does **not** start Session 7.

---

**END OF CROSS-SESSION CONFLICTS**