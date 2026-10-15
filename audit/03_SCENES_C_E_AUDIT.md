# SESSION 3 — SCENES C + D + E DEEP AUDIT

> ## > NORMALIZATION NOTICE
> >
> > **See `audit/00_AUDIT_NORMALIZATION.md` for later cross-session corrections.**
> > **Raw evidence remains preserved below.**
> >
> > That file wins **for the named fact only**. Product Truth remains above it.
> >
> > | This report says | Correction |
> > |---|---|
> > | §3.2 / §3.3 — Shopping List classified `SUPPORTED (V1.1 candidate) + NOT YET IMPLEMENTED` | **`N-06`** — the final classification is **withdrawn**. The frozen `HOMePLUS_INVENTORY_PRODUCT_FREEZE_V1.0` **excludes Shopping List by name** (`:802` *"No es una Shopping List."* · `:977` · `:2120` *"- duplicate Shopping List;"*). An unfrozen V1.1 candidate embedded in a chat export cannot override a frozen V1.0. Canonical: **UNSUPPORTED CLAIM.** The approved chain is `LOW/OUT → Restock Need → approval → Planner Task`. |
> > | §3.3 / §5 — Inventory & Shopping "NOT PRESENT as a surface" in Figma-app | **`N-07`** — Session 6 reached `src/inventory/InventoryRoot.tsx`, `Products.tsx`, `ShoppingList.tsx`. Correct reading: **NOT REACHED IN THAT HARVEST**, not *absent*. |
> > | §1 — *"`S10` is the only scene in all 85 states that raises the device above 1.00"* | **`N-09` / `N-41`** — **false**. S15–S17 are also **1.08**. Correct: S10 is the only enlarged scene *within C/D/E*. The *instinct* behind `E-11` is preserved. |
> > | §25.2 — HomeCloud thumbnail correction | **`N-08`** — **confirmed.** Session 1's `40×40 → 98×62` "authored enlargement" is a measurement artefact: `40×40` = mounted-but-hidden collapsed box, `98×62` = settled layout. **No authored conditional enlargement exists.** |
> > | §5 / §12 / §21 issue registers | Counted mechanically this pass: **34 rows · 6 RAW BLOCKERS** (`C-01`, `C-02`, `C-11/D-10`, `D-01`, `D-09`, `E-04`). See **`N-27`** — `C-11/D-10` is a **single row carrying a combined cross-scene ID** and is trivially missed by a naive scan. |
> > | §3.5 — Assets | **Confirmed.** `MASTER:722` (*"todavía no tiene Product Freeze final"*) is **stale**; `HOMePLUS_ASSETS_PRODUCT_FREEZE_V2.0` is FROZEN 2026-10-01 and wins per `MASTER:6`. Extended by **`N-37`**. |
> > | §5 `E-06` stated reason | **`N-29`** — the *"the master forbids it"* half is **withdrawn** (`HOMECLOUD_PRODUCT_EXPERIENCE_FREEZE_V2:316` approves audio). The surviving reason is that same freeze's **`:334` `no fake waveform`**. Raw severity `MEDIUM` unchanged. |
> >
> > **No severity in this report was altered. No finding was deleted. The raw registers below stand as the evidence of record.**

**Mode:** READ-ONLY, CONSTRUCTIVE AUDIT. No production file was created, modified, renamed or deleted.
**Package audited:** `C:\Users\thega\Desktop\HomeplusPresentacion01\HomePlus_Presentacion_FINAL`
**Presentation dev server:** port `8444` (already running, PID 15644, started by Session 1, reused as-is; not restarted).
**Figma-app dev server:** port `8445` (already running, PID 30576; not restarted, not rebuilt).
**Integration:** `C:\Users\thega\Desktop\homeplus-worktrees\Family-Hub-Own-integration` — static inspection only, never launched.
**Runtime driver:** headless Chromium 1243 via `playwright-core` 1.63.0 resolved from Figma-app's pnpm store. No package installed, no lockfile touched, no build run.
**Date of capture:** 2026-10-05.
**Verdict policy:** this document issues quality verdicts and design recommendations. It implements nothing.

**Coordinate correction carried forward (per Session 2 D3).** In the *current* presentation: **S08 = Plans / Inventory**, **S09 = Finance**, **S10 = Assets / HomeCloud**. The human-hypothesis file places Finance at "S10" for `HW-D-002`…`HW-D-007`; that coordinate is stale. The original spoken observation is **not** altered anywhere; every adjudication below uses the current slide IDs and says so at the point of contact.

**Enlargement-principle correction carried forward (per Session 2 §15).** This session applies the same frozen rule: stage readability is never solved by redesigning the app into giant cards. Preferred: DEVICE SCALE · CAMERA/CROP · SELECTIVE EXPOSURE · LOCAL NON-REFLOW EMPHASIS · SHARED ELEMENT EXTRACTION · NEGATIVE SPACE.

---

## 1. Executive verdict

**Scene C is one broken mechanic away from working, and that mechanic is a clip box.** The Plan → Inventory → Shopping story is present in the data but the three substructures that carry it — the bridge task, the missing item, and the Shopping List — are each defeated by a specific, measurable defect:

1. **The out-of-stock item is clipped out of the device in every Inventory state.** `.inventory-card` is `248×229` client against `248×270` scroll at `S08_step03` (**+41 px**) and `248×224` against `248×284` at `S08_step04` (**+60 px**). The `Café · Alacena · 0 · Sin stock` row sits at y 472–534 (`step03`) and y 484–549 (`step04`) while the card's bottom edge is at y 492.38 / 487.38. **Coverage test: "qué tenemos" 1/1 visible, "qué se está terminando" 2/2 visible, "qué necesitamos comprar" 0/1 visible.** The one row the narration's third clause depends on is below the clip. → **C-01, BLOCKER.**

2. **The Plan's three task rows are the three literal strings the master forbids.** `Repartir tareas / Preparar cosas / Comprar lo que falta` are rendered verbatim as the plan steps (`plannerData.ts:25-27`), and MASTER §7 C2 says verbatim: *"No usar como tasks literales `Repartir tareas / Preparar cosas / Comprar lo que falta`."* Zero of the six canon tasks (`Confirmar invitados / Preparar torta / Decorar / Comprar bebidas / Comprar snacks / Comprar globos`, NO-UI §18) appear. The screen is the narration transcribed as data. → **C-02, BLOCKER.**

3. **There is no purchase.** `S08_step04 → S09_step00` is a pure cross-mount: at the first post-key sample (**9.6 ms**) the Finance screen is already fully rendered (hero `op=1`, all three tabs `op=1`, two payment rows, two category rows), and the Shopping List card and its `8` items are **gone at frame 0**. MASTER §8 D0 requires the purchase to complete and to reappear as a quiet `Supermercado · $XX.XXX` easter egg. It does not exist. → **C-11/D-10, BLOCKER.**

**Scene D is a static prop with an editorial caption, and the caption is the narration.** The device does not change across all five states of `S09`: the device-text signature is **byte-identical** at `S09_step00`, `01`, `02`, `03`, `04` (23 strings, same sizes, same opacities). The only thing that changes is four stage-side questions fading in at `33 px`, one per keystroke, dropping older ones to `opacity 0.45`. Those four questions are the speaker's lines copied to the screen — a direct violation of MASTER §2.3 (*"No duplicar lo que dice el expositor"*). Of the eight ideas in the Finance block, **three have no evidence at all** (`movimientos`, `registrar un movimiento` / `cuentas o tarjetas`, `límites`) and one is **contradicted** (`tanto personales como del hogar`, while the screen's only scope is `Familia García`). → **D-01, BLOCKER; D-02, D-03, D-04, HIGH.**

**Scene E is two modules in five states with nine spoken beats, and the emotional pivot has no state.** `S10` spends `step00–02` on Assets (list → PS5 focus → a two-document detail with ~65 % empty space) and `step03–04` on HomeCloud (three PDFs → two gradient squares and a fake waveform). The warranty-vs-memory thesis — the pivot of Scene E *and* of the product — has **zero** visual support and, structurally, **zero available states**: `S10_step04` is the last step and the exit to `S11` is a cross-mount to pure black. Master §7 E9's isolation composition never happens. → **E-04, BLOCKER.**

**The single root cause that unifies the three worst findings:** **no semantic object survives any module boundary in C/D/E.** `birthday.event`, `shopping.missingItem`, `shopping.purchase.supermarket`, `finance.ps5Movement`, `asset.ps5.documents`, `birthday.memory` and `warranty.ps5` were all *specified as mandatory* (MASTER §2.5, §7, §8, §9). Measured:
- The bridge task never leaves the Plan (`S08_step02→03`).
- The missing item never leaves Inventory (it is clipped).
- The purchase is never created (`S08_step04→S09_step00`).
- No PS5 movement exists anywhere (`S09_step04→S10_step00`: `finHero` absent at every frame).
- The two PS5 documents crossfade as **two separate DOM instances** at different y (`202.4/288.9` → `210.2/297.2`).
- The birthday memory is on the **wrong date** (`20 ago` = Thursday; the Plan's `Sábado` = 22 ago) and is never opened.

Every boundary in this session is a **DEVICE_TRANSITION** (a 480 px horizontal slide + a 320 ms layer crossfade) where the master asked for a **SHARED_ELEMENT**. That is the whole failure in one sentence.

**What must be preserved.** `S08_step01` is the model the rest of the scene should copy: at `stepIndex === 1` the bridge task holds `opacity 1.00` and gains `background: rgb(246,237,232)` while its two siblings drop to `0.55` and the plan heading drops to `0.6` — a correct, restrained SELECTIVE EXPOSURE built from the product's own tokens. The `Documentos | Recuerdos` domain switch is a faithful reproduction of the target's control, and the `PDF` tile vocabulary, the `Recientes` grouping and the `Fotos / Álbumes` structure are recognisably HomeCloud. The Finance *composition* (period scope → tab row → balance → Pagos próximos → Por categoría) is a genuine, readable summary surface built from the correct anatomy order. And `S10` is the only scene in all 85 states that raises the device above 1.00 (1.08) — the instinct is right; only the magnitude and the missing extraction are wrong.

---

## 2. Evidence used

| Source | What was read / run | Where the evidence lives |
|---|---|---|
| **SCRIPT** | `C:\Users\thega\Downloads\Guion Compartido (2).md`, 497 lines, read in full; blocks 3, 4, 5 (L141–L271) quoted inline with line numbers | quoted inline |
| **MASTER (narrative + visual)** | `HOMEPLUS_PRESENTATION_MASTER_FREEZE_V1.0.md`, 2199 lines; §2 grammar, §3 continuity canon, §7 Scene C, §8 Scene D, §9 Scene E, §16 rules | quoted by section |
| **MASTER (no-UI)** | `HOMEPLUS_PRESENTATION_NO_UI_MASTER_FREEZE_V2.0.md`, 1420 lines; §5 design system, §6 motion, §7 phone, §8 transition taxonomy, §9 persistence, §18 demo-data canon | quoted by section |
| **CURRENT RUNTIME (Session 1)** | `audit/01_RUNTIME_BASELINE.md`, 886 lines; §3 state index, §4.4 phone geometry deltas, §5.3–5.5 enlargement & typography, §8 overflow matrix | cited as S1 §n |
| **CURRENT RUNTIME (Session 3, fresh)** | 18 states walked at 1280×720 (`S07_step00` … `S11_step00`) with a purpose-built probe; 18 screenshots; 6 transitions sampled at rAF resolution (≈320 frames each) plus a 5-instant sampler; overflow, font and geometry census | `audit/runtime/session-03/data/states-cde.json`, `analysis-cde.md`, `inventory-rows.md`, `motion-cde.json/.md`, `motion-s10.json/.md`, `runtime-errors.json`; screenshots `audit/runtime/session-03/states/` |
| **FIGMA TARGET** | Figma-app on port 8445, driven through its real onboarding gate (`Omitir`) → `AuthScreen` (`Ingresar`) → real bottom nav → `Más` → each module. 61 PNG + 126 JSON captures, with a computed-style census per surface and per-claim `path:line` citations | `audit/runtime/session-03/figma-reference/` |
| **PRODUCT TRUTH** | `PLANS_PRODUCT_TRUTH_V1_AND_FIGMA_AUDIT.md`, `PLANS_TECHNICAL_TRUTH_V1.md`, `HOMePLUS_PLANNER_PRODUCT_FREEZE_V1.0.md`, `HOMePLUS_INVENTORY_PRODUCT_FREEZE_V1.0.md`, `Inventory Foundation.md` (chat export containing an embedded V1.1 candidate), `HOMePLUS_FINANCE_PRODUCT_FREEZE_V1.1.md`, `HOMePLUS_ASSETS_PRODUCT_FREEZE_V2.0.md`, `HOMECLOUD_PRODUCT_FREEZE_V1.0.md`, `HOMECLOUD_PRODUCT_EXPERIENCE_FREEZE_V2.md`, `HOMECLOUD_IMPLEMENTATION_STATE_AND_ROADMAP.md`, `HOMECLOUD_FILES_HANDOFF.md`, `HOMECLOUD_ORCHESTRATOR_HANDOFF.md` | classified in §3; quoted inline |
| **INTEGRATION** | `Family-Hub-Own-integration` — app root `front\mi-front-limpio` (Expo SDK 57 / RN 0.86.3), `backend`, `supabase\migrations`. Static, per-claim `path:line` citations. Native runtime **not** launched — static evidence was sufficient on every question. | cited inline as `front\…:line` / `backend\…:line` |
| **HUMAN HYPOTHESES** | `audit/00_HUMAN_HYPOTHESES.md` §3.3 (HW-C-001…007), §3.4 (HW-D-001…007), §3.5 (HW-E-001…011) read in full | quoted inline |
| **PRESENTATION SOURCE** | Every file under `src/presentation/` contributing to S08/S09/S10 read in full: the three slides, the three scenes' CSS, `PlannerData`/`PlannerPlans`, `InventoryDemoScreen`(index/data/css), `FinanceDemoScreen`(index/data/css), `AssetsDemoScreen`(index/data), `HomeCloudDemoScreen`(index/data/css), `homeTokens`, `PhoneFrame`, `AmbientGlow`, `presentationConfig` | cited as `path:line` |

**Evidence not available, stated explicitly:**
- **No audio, no real timing.** Whether a transition lands on the right word cannot be measured. Every timing statement below is a *state-count* or *frame-time* statement, not a voice-sync measurement.
- **No audience, no room.** Legibility judgements convert logical px to projected px at a stated factor (1.5× for 1920×1080). These are arithmetic projections, not observations.
- **Figma target `Mapa`/`Lugares` and Finance's in-screen `Movimientos` filter sheets were partially reachable.** Everything asserted about them is cited from Figma-app source with `path:line`, not from a runtime screenshot, and is marked as such.
- **Integration was not launched.** All Integration claims are static. Where behaviour could differ at runtime, the claim is marked PARTIAL rather than PASS.

**Runtime errors:** one console `404`, identified as `/favicon.ico` (the same single error Session 2 recorded on the same server). Zero `pageerror`, zero failed application requests. Figma-app: zero `pageerror` across all sequences.

---

## 3. Product-truth resolution

Each document is classified before use. `PRODUCT AUTHORITY` = a frozen, self-declared product/technical contract. `VISUAL AUTHORITY` = the polished design reference. `SUPPORTING` = a handoff/roadmap that states current status. `LEGACY` = superseded by an explicit statement. `UNKNOWN` = a chat export or unverified artefact.

### 3.1 Plans

| Document | Class | What it actually freezes |
|---|---|---|
| `PLANS_PRODUCT_TRUTH_V1_AND_FIGMA_AUDIT.md` | **PRODUCT AUTHORITY** | `Estado Product Truth: PRODUCT DEFINITION CLOSED` (L3). Composition: `PLAN → TASKS / EVENTS / MEASUREMENTS` (L49-56) — **no fourth "milestone" entity**. **Milestone retired:** `Milestone deja de ser entidad de V1` (L304). Empty Plan valid (L30). Explicit Figma coverage: *"El prototipo implementa 1 de las 4 superficies principales de Plan y sólo 4 de 17 estados de lista"* (L427-431). |
| `PLANS_TECHNICAL_TRUTH_V1.md` | **PRODUCT AUTHORITY (technical)** | `TECHNICAL DEFINITION CLOSED FOR RECONSTRUCTION PLANNING`. Root = `planner_goals`; `planner_plans` retired as product root (L32-38). `Milestones` in the non-target list (L1229). Empty Plan valid (L272). |
| `HOMePLUS_PLANNER_PRODUCT_FREEZE_V1.0.md` | **LEGACY / CONFLICTING** | FROZEN but **contradicted on two points** by the two documents above: it still makes `Milestone` an entity (L1683, L1724) and states `Un Plan vacío no puede activarse` (L1710) against Product Truth L30. Order of authority: `PLANS_PRODUCT_TRUTH_V1` wins (its own rule, L1075-1076). |

**Resolution for Scene C.** A Plan **is** a multi-phase objective; an Event exists independently and may be linked to a Plan; a Task may belong to `0..1` Plan; there is **no milestone** entity. The canonical demo is a **Plan called `Cumpleaños` containing events/tasks** — Product Truth gives only illustrative content (`Cumple de 4 de Gaby · 93 recuerdos` is HomeCloud, not Plans). The **only** authoritative demo data for the birthday is **NO-UI §18**: `Cumple de Juli · Sábado · 19:00` with tasks `Confirmar invitados / Preparar torta / Decorar / Comprar bebidas / Comprar snacks / Comprar globos`. Status of the birthday as a *persisted* object: **SUPPORTED + TESTED-BY-PRODUCT-TRUTH, IMPLEMENTATION GAP** (Figma `/src/planner/` prototype implements 1 of 4 Plan surfaces; no runtime demo dataset was located for a named birthday Plan).

### 3.2 Inventory

| Document | Class | What it freezes |
|---|---|---|
| `HOMePLUS_INVENTORY_PRODUCT_FREEZE_V1.0.md` | **PRODUCT AUTHORITY** | `MODULE_PRODUCT_DEFINITION_CLOSED` / `LOGICALLY_CLOSED` / `PRODUCT_BEHAVIOR_COMPLETE` / **`IMPLEMENTATION NOT YET AUDITED`** (L1-13). Derived status rule: `quantity > minimum → NORMAL` · `0 < quantity ≤ minimum → LOW` · `quantity = 0 → OUT` (L763-774). Illustrative item names include `leche`, `papel higiénico` (L315-321). **`Inventory Need → Planner Task`, and a Shopping List is explicitly prohibited as a parallel entity:** `No es una Shopping List` (L802); `Restock Needs se acumulan sin crear una Shopping List paralela; Dispatch usa Planner` (L120-121); `Inventory no crea un segundo sistema de Tasks` (L156); `duplicate Shopping List` is in `Explicitly Not Target` (L2113-2127). |
| `Inventory Foundation.md` | **UNKNOWN (chat export) containing a `PRODUCT DEFINITION CANDIDATE FREEZE V1.1`** | The export itself is not authoritative. Its embedded V1.1 candidate **reverses V1.0**: `LISTA DE COMPRAS → decidir qué hace falta comprar` is a primary surface (L6505-6527), and `# 11. AUTOMATIC SHOPPING BEHAVIOR … Product → Shopping List line` (L7174-7183). Its status block reads `SHOPPING MODEL: DEFINED … FRONTEND IMPLEMENTATION: NOT YET AUDITED AGAINST V1.1` (L8451-8469). |

**Resolution for Inventory — the two facts the audit needs:**
- **Visual/functional model:** SUPPORTED. `place` grouping, low/out states and derived thresholds are all in V1.0.
- **Shopping List is a documented product-truth CONTRADICTION.** The frozen V1.0 **forbids** it and routes restock into a Planner Task; an unfrozen V1.1 **candidate** makes it a primary surface with automatic push. Neither is implemented (see §3.3). **This session classifies the script's claim as `SUPPORTED DIRECTION (V1.1 candidate) + NOT YET IMPLEMENTED`, and flags the freeze contradiction as an open product decision** (see §30, SI-03). It does **not** call the presentation fraudulent.

### 3.3 Shopping List — capability classification

| Question | Answer | Evidence |
|---|---|---|
| Defined in approved Product Truth? | **CONTRADICTORY.** `Inventory Freeze V1.0` (PRODUCT AUTHORITY, frozen) forbids it; `Inventory Foundation` V1.1 candidate supports it. | §3.2 above |
| Present in Figma-app? | **NOT PRESENT as a surface.** A `ShoppingCard({onNavigate})` reading `SHOPPING_LIST.assignedTo` exists only inside `Assets Foundation.md`'s chat transcript (`:31547, 49139-49149`), i.e. prototype code inside a chat export, not a Figma-app screen. | Subagent finding |
| Implemented in Integration? | **NO.** Frontend: zero `ShoppingList`/`lista_compras` matches; all 30 `shopping|compra` hits are a Planner **task `template_key`**. Backend: no `shopping` route (`backend\index.js:79-95`); no `shopping` table. | `front\mi-front-limpio\services\plannerTemplates.ts:9`; `backend\index.js:79-95` |
| What the script claims | The missing inventory item `puede sumarse automáticamente a la lista de compras` (L169-170). | detection |
| **Final classification** | **SUPPORTED (V1.1 candidate) + NOT YET IMPLEMENTED.** The presentation's Shopping List card is therefore a `VISUAL TARGET ONLY`; it may be shown, but the handoff must flag implementation status and the freeze contradiction. | — |

**What Integration actually has instead** (a genuine, working alternative): a two-step restock path — `inventory_items` low/out → `inventory_restock_requests` (auto-created, `backend\src\services\inventory.service.js:121-152`) → approval by `coordinator|adult` → **canonical Planner task** with `template_key: 'shopping'`, `origin_module: 'inventory'`, `origin_reason: 'low_stock'|'out_of_stock'` (`:542-557`). UI surface: `Reposiciones pendientes` (`front\mi-front-limpio\screens\inventory\InventarioScreen.tsx:220`); toast `'La reposicion fue enviada al Calendario.'` (`:532`). This is **Reports → Planner Task**, exactly as V1.0 froze. The presentation could truthfully use this path instead of a Shopping List. → Decision for product owner (§30, SI-03).

### 3.4 Finance

| Document | Class | What it freezes |
|---|---|---|
| `HOMePLUS_FINANCE_PRODUCT_FREEZE_V1.1.md` | **PRODUCT AUTHORITY** | Present with four sibling copies `V1.0`/`V1.0(3)`/`V1.0(4)`. V1.1 supersedes. Scope model includes personal vs household; movements, payments, limits, summary, analysis. |
| Figma-app Finance | **VISUAL AUTHORITY** | Reached via `Más → Finanzas` (`screens/Mas.tsx:23-34`). Full target anatomy measured (§11). |

**Resolution.** Finance is the **most mature** of the six in every dimension: product truth, target, and Integration. Integration evidence: real `Resumen | Movimientos | Pagos` tabs (`services\finance\financeContext.ts:8-16`); a **live** `Personal | Hogar` scope switch wired to 5 concurrent network reads (`FinanceScreen.tsx:124-127, 347-363`); `Nuevo movimiento` fully implemented with operation switch, `Cuenta` selector that unifies accounts and cards, installment presets and a transfer guard (`components\finance\NewMovementSheet.tsx:992-1023, 1224-1246`); real `Análisis` and `Límites` screens; movement rows = exactly `EXPENSE | INCOME | TRANSFER` (`financeMovements.ts:147-190, 496`). **One Integration anomaly:** `FinanceAccounts` is a fully-built screen registered at `HomeTabNavigator.tsx:231` with **zero inbound navigation** — an orphan route (accounts remain reachable through `AccountSelector → Agregar cuenta`). Not a presentation defect; recorded.

### 3.5 Assets

| Document | Class | What it freezes |
|---|---|---|
| `HOMePLUS_ASSETS_PRODUCT_FREEZE_V2.0.md` | **PRODUCT AUTHORITY** | `Estado: FROZEN — Product Target` (L5). `IMPLEMENTATION ALIGNMENT PENDING` / `FINAL ACCEPTANCE PENDING` (L23-30). Detail order fixed: **`IDENTIDAD → PERSONAS Y UBICACIÓN → PRÓXIMO → DATOS Y DOCUMENTOS → HISTORIAL`** (L733-737). **Money is removed from Core** (L345-356): `Finance posee amount, currency, account, financial context… Assets nunca conserva una segunda verdad monetaria.` Warranty is a **Record type**, not a status field (L266). **`MaintenancePlan` owned by Assets is in `EXPLICITLY NOT CORE V2`** (L841-842); maintenance lives in a `Care Record` (L307-311). Images do not exist in V2. |
| Figma-app Assets | **VISUAL AUTHORITY** | `Más → Activos` (`screens/Mas.tsx:35-40`). Real `IncomeRow`s include `Toyota Corolla`, `PlayStation 5`, `Toby`, `Taladro Bosch`, `Casa Córdoba`. Detail implements the exact 5-section order. |
| Integration Assets | — | **ABSENT from both frontend and backend.** No `AssetsScreen.tsx`; no `assets` router; no `assets` table. Only trace: `'assets'` as a reserved `ALLOWED_ORIGIN_MODULES` value with no producer (`backend\src\services\planner.tasks.service.js:10-16`). |

**Resolution for the PS5 object.** The canonical `PS5 · Mar 2024 · $580.000` exists **only in a chat export** (`Assets Foundation.md:596-608, 1222-1248, 4686-4706`), **not** in Frozen V2.0. V2.0 **forbids** an asset-owned purchase price. Therefore: the D→E bridge cannot be an Assets purchase field. The correct, product-true bridge is a **Finance movement row** (`Movimientos`) that owns the money, which the Asset then relates to. Status: `SUPPORTED (as a Finance-owned fact) + NOT YET IMPLEMENTED IN ASSETS`. Any presentation surface promising `Comprada` / `$580.000` **on the Asset** is a `PRODUCT-TRUTH VIOLATION`; showing it **on the Finance movement** is correct.

### 3.6 HomeCloud

| Document | Class | What it freezes |
|---|---|---|
| `HOMECLOUD_PRODUCT_FREEZE_V1.0.md` | **LEGACY (superseded by Experience Freeze V2)** | FROZEN 2026-08-20. Two surfaces `[ Archivos | Recuerdos ]` (L69-70). Capability list for `RECUERDOS` = `Photos, Videos, Shared Albums, Chronological Library, Optional caption, Media Viewer` (L1120-1137) — **audio does not appear at all**. Canonical demo: `Cumple de Gaby · 22 ago · 93` (§17) — internally contradictory against `Cumple de 4 de Gaby · 87 fotos · 6 videos` (§22). |
| `HOMECLOUD_PRODUCT_EXPERIENCE_FREEZE_V2.md` | **PRODUCT AUTHORITY (current)** | `Status: FROZEN`. `Cuando contradiga decisiones antiguas de V1/V1.3, V2 manda` (L10). **Audio is approved as a Memory**, explicitly *not* a third role: `roles: file | memory · audio no es tercer role` (L58-59). Create menu `+`: `Fotos y videos / Audio / Grabar recuerdo / Escribir un recuerdo / Nuevo álbum` (L313-319). Recorder: `record/stop/preview/save · no fake waveform · no transcription V1` (L328-335). **Visual prohibitions:** `No introducir: gradients / neon / random pastels / scrapbook / polaroid / tape / sepia / vintage / decorative doodles / clones de Pinterest/Instagram/Google Photos/Drive` (L555-567). |
| Figma-app HomeCloud | **VISUAL AUTHORITY** | `Más → HomeCloud` (`screens/Mas.tsx:41-46`). `Archivos | Recuerdos` domain switch (regular metric track 44 / thumb 36); `Recuerdos` root = `PARA VOLVER A VER` resurfacing cards + `ÁLBUMES` carousel + `LÍNEA DE TIEMPO` 3-column grid. Memory create menu = 4 rows, `Audio / Elegir un audio existente` (verbatim). |
| `HOMECLOUD_IMPLEMENTATION_STATE_AND_ROADMAP.md` + `HOMECLOUD_ORCHESTRATOR_HANDOFF.md` | **SUPPORTING** | Status table: `Files core PASS · Scanner IN PROGRESS · **Memories V2 NOT STARTED** · Viewers V2 NOT STARTED`. |
| `HOMECLOUD_FILES_HANDOFF.md` (2026-10-03, newest) | **SUPPORTING** | Scoped to the **Files** lane; explicitly excludes Memories (`MEMORIES: se desarrolla en otro worktree/chat`). |
| `Homecloud Implementation.md` | **UNKNOWN (chat export)** | Contains runtime logs of a working audio recorder in a **different worktree** (`homecloud-current`). Not a freeze; used only as corroboration that audio is a real backend capability. |

### 3.7 HomeCloud Memories — capability truth

| Capability | Product Truth | Figma target | Integration | Classification |
|---|---|---|---|---|
| **Memories** (root) | SUPPORTED (V1 §17, V2) | EXISTS (`Recuerdos` root with resurfacing + albums + timeline) | **UI STUB** — `SegmentedControl value="files"` hard-coded, `onChange={() => {}}` (`HomeCloudFilesScreen.tsx:44`). No browse surface. | **SUPPORTED + NOT YET IMPLEMENTED** |
| **Album** | SUPPORTED (V1 §20-28 "CORE de Memories") | EXISTS (`ÁLBUMES` carousel, album list, album detail) | **Backend built** (`homecloud_albums`/`homecloud_album_items`, `GET /api/homecloud/albums/...`); **no read UI** — only the dev harness and the intake destination picker read it. | **SUPPORTED + PARTIAL (write-only)** |
| **Media** (viewer) | SUPPORTED (V1 §32) | EXISTS (viewers) | **NOT FOUND** — no viewer component; no `expo-video`/`expo-image`/`expo-av` dependency. Files render as a static type icon. | **SUPPORTED + NOT IMPLEMENTED** |
| **audio** | **SUPPORTED** by `Experience Freeze V2` (L58-59, 313-319); absent from V1.0 | EXISTS in create menu (`Audio / Elegir un audio existente`) and as a `MemoryKind` | **Backend allows** `audio/*` for `role='memory'` (`…_memory_audio_support_v1_1.sql:19-26`); **frontend hard-blocks it** — picker allows only `images|videos`, error `'Solo podés agregar fotos o videos.'` (`homecloudMemoryPicker.ts:52,95,113`). No recorder, no `expo-audio`. | **SUPPORTED + NOT IMPLEMENTED (client)** |
| **photo** | SUPPORTED | EXISTS | Supported for **intake** (with EXIF-date fidelity); no read surface. | **SUPPORTED + PARTIAL** |
| **video** | SUPPORTED | EXISTS | Supported for intake; no viewer. | **SUPPORTED + PARTIAL** |
| **caption / phrase** | SUPPORTED (V1 §33 `Descripción/caption · opcional`) | EXISTS (`Información` sheet `Nota`) | Intake types carry `capturedAt`/`capturePrecision`; caption field not located in a browse surface. | **SUPPORTED + NOT IMPLEMENTED (UI)** |
| **media info** | SUPPORTED (V1 §33) | EXISTS but **thin** (`Información`: Nombre / Carpeta / Fecha del documento / Nota — no size, no MIME, no duration) | **EXISTS (files only)** — `FileInfoSheet` (`HomeCloudFilesScreen.tsx:58-66`). | **SUPPORTED + PARTIAL** |

**Resolution for Scene E.** `photo` and `video` are the only demonstrable Memories types. **Audio is a real, frozen product capability with zero client surface** — so the presentation may *conceptually* show audio, but it must be marked as a `VISUAL TARGET` and the handoff must record the client gap. Critically, the **delivered script** (L257-259) says `pueden quedar fotos, una frase, o incluso un audio`, while the **master's patched script** (§18) says `fotos, videos, o incluso una frase` and MASTER §7 E7 says verbatim *"No mostrar nota de voz como entidad V1."* The presentation drew the **voice note**, i.e. it followed the delivered script and violated the patched master. That is a **SCRIPT/MASTER CONFLICT**, not a presentation defect → §30, SI-02.

---

## 4. Spoken-beat map — C

Speaker: **Infra** (script L141–L176). A beat is a change in idea, example, question or narrative direction — **not** one line.

| BEAT | SCRIPT (line) | INTENDED IDEA | EXPECTED VISUAL SUPPORT | CURRENT STATE(S) | HAS STATE? |
|---|---|---|---|---|---|
| **C-B1** | L144 *"Porque organizar una casa tampoco es solamente resolver lo que pasa hoy."* | Bridge from Scene B: household organisation has a horizon beyond today | The plan card from the S07 handoff holds; no new content | `S08_step00` — the birthday Plan card (`Cumpleaños · Sábado · 3 pasos pendientes`), alone | ✔ |
| **C-B2** | L146 *"Un cumpleaños el sábado es un evento"* | Establish the birthday as an **Event** first | A real `Cumple de Juli · Sábado · 19:00` event card; master §7 C0 *"revelar Planner/Events alrededor de la misma card"* | `S08_step00` — a **Plan** card, never an Event; no time, no owner | partial |
| **C-B3** | L147-150 *"pero antes todavía faltan cosas por organizar: repartir tareas, preparar cosas y resolver qué comprar"* | Three **broad editorial categories** of work — explicitly *not* task names | Three editorial concepts, synchronised; master §7 C1 | `S08_step00` — three **literal task rows** with those exact strings | ✔ but wrong (C-02) |
| **C-B4** | L152 *"Para eso están los Planes: para ordenar un objetivo que avanza en varias etapas."* | A Plan is a **multi-phase** objective | Planner/Plans with real, life-like tasks; master §7 C2 lists six allowed examples | `S08_step00` — same three forbidden literals; `3 pasos pendientes` | ✔ but wrong (C-02, C-07) |
| **C-B5** | L155 *"Y cuando una de esas tareas es: 'comprar lo que falta'"* | **The bridge task.** One concrete task that needs something bought | Focus on the purchase cluster; master §7 C3 *"foco/zoom en el cluster de compra"* | `S08_step01` — SELECTIVE EXPOSURE **correct**: bridge task `op=1.00` + `bg 246,237,232`, siblings `0.55`, heading `0.6` | ✔ |
| **C-B6** | L159-161 *"aparece otra pregunta: '¿Qué falta en casa?'"* + L163 *"Ahí entra el Inventario"* | The question that opens Inventory | Master §7 C3: *"no escribir la pregunta"*, lower exposure + blur, then "recuperar normalidad" on `Ahí entra Inventario` | `S08_step02` — the question is **written at 68 px**; whole device drops to `opacity 0.6` including the bridge task | ✔ but wrong (C-03, C-08) |
| **C-B7** | L165-167 *"este mantiene qué tenemos, qué se está terminando y qué necesitamos comprar"* | Three Inventory states | Master §7 C4: full view → focus low-stock → focus out-of-stock | `S08_step03` / `S08_step04` — LOW **2/2 visible**, OUT **0/1 visible (clipped)** | ✔ but broken (C-01) |
| **C-B8** | L169-170 *"cuando algo hace falta, puede sumarse automáticamente a la lista de compras"* | Automatic push of the missing item into a Shopping List | Master §7 C5: the missing item detaches and travels into the Shopping List, which already has other products | `S08_step03/04` — a static card `Lista de compras · 8 para comprar`; no list; no transfer | ✘ (C-05) |
| **C-B9** | L172-174 *"Así antes de ir al supermercado te ahorras dar vuelta toda la casa porque ya sabes qué comprar"* | The concrete benefit | Hold of the complete list; master §7 C5 | `S08_step04` — the same static card, with the OUT item still clipped | ✘ (C-01, C-05) |
| **C-B10** | L176 marker `[aca arranca la del dinero es un hogar]` → L180 *"Y cuando hacemos esa compra"* | **Purchasing is the bridge into money** | The purchase is materialised; master §8 D0: it reappears as a quiet `Supermercado · $XX.XXX` | **none — `S08_step04→S09_step00` is a cross-mount** | ✘ (C-11) |

**Beat arithmetic:** 10 beats against 5 states (ratio 2.0). Two beats have **no** state (C-B8's transfer, C-B10's purchase); two more are attempts that fail on a measurable defect (C-B3/C-B4 on forbidden literals, C-B7 on the clip).

---

## 5. Scene C issue register

Severity vocabulary is exactly `BLOCKER / HIGH / MEDIUM / LOW / POSITIVE`. No severity is inflated.

---

### **C-01 — The out-of-stock item is clipped out of the device in every Inventory state, so "qué necesitamos comprar" is never visible**

- **SCENE:** C
- **CURRENT STATE(S):** `S08_step03`, `S08_step04`
- **SCRIPT MOMENT:** L165-167 *"este mantiene qué tenemos, qué se está terminando y qué necesitamos comprar"*
- **MASTER INTENT:** §7 C4 — *"`qué tenemos`: vista completa · `qué se está terminando`: un low-stock item recibe foco · `qué necesitamos comprar`: mismo encuadre; foco pasa al out-of-stock item."* NO-UI §5 — *"Nunca menos de 20 px en contenido que la audiencia deba leer."*
- **CURRENT RUNTIME:** `.inventory-card` is `client 248×229` against `scroll 248×270` → **+41 px hidden** at `step03`; `client 248×224` against `scroll 248×284` → **+60 px hidden** at `step04`. The `Café · Alacena · 0` row (the only `status:'out'`, chip `Sin stock`) occupies y 472–534 at `step03` (card bottom edge `492.38`) and y 484–549 at `step04` (card bottom edge `487.38`). **Measured coverage: `qué tenemos` 1/1 visible · LOW 2/2 visible · OUT 0/1 visible, in both states.** The `Lista de compras` card then sits at y 506.06 / 501.53 and occupies the space the café row would need. Screenshot `states/S08_step04.png` shows `Detergente` as the last visible row; `Café` is entirely absent. Source: `inventory-screen.css:9` (`overflow: hidden`), `index.tsx:21-34` (four rows rendered unconditionally), `inventoryData.ts:20` (`{ id:'cafe', qty:'0', status:'out' }`).
- **FIGMA TARGET:** Inventory is **not present in Figma-app as a screen** (the target's `Más` list has `Inventario` but the exploration found no reachable Inventory surface in this harvest); the product model is therefore taken from Product Truth, and the visual grammar from the presentation's own Home/Planner shell.
- **PRODUCT TRUTH / INTEGRATION:** `HOMePLUS_INVENTORY_PRODUCT_FREEZE_V1.0.md` L763-774 *derives* `OUT` as `quantity = 0` — the state is canonical. Integration has one Inventory screen with the same three-state vocabulary (`InventarioScreen.tsx:92-102`: `out → 'Sin stock'`, `low → 'Stock bajo'`, `ok → 'En stock'`) in a **single scrolling list** (`:626-647`, no `SectionList`), so the real product never has to show all three states inside one fixed-height box.
- **HUMAN WALKTHROUGH:** `HW-C-005` (no deviation registered for these four points) and `HW-C-006` (the concrete benefit is not shown). Neither names the clip; this finding is new.
- **CLASSIFICATION:** PRODUCT-TRUTH-VIOLATING COMPOSITION (the screen cannot answer one third of its own scripted claim) + stage accessibility failure
- **SEVERITY:** **BLOCKER**
- **VERDICT:** **REJECT.** The narration's sentence has three clauses; the screen can evidence two. The audience is told "qué necesitamos comprar" while the only thing that needs buying is off-screen. This is not a polish issue: it is the third proposition of the scene's thesis.
- **TARGET BEHAVIOR:** The card must be tall enough for all rows at the state's type size, or the list must scroll its own content, or the out-of-stock row must be promoted to a fixed position. Preference, in order: (1) **give the Inventory a scrollable list region** whose container height is fixed to the workspace, and scroll it so the OUT row is on screen at the "qué necesitamos comprar" beat; (2) if scrolling is out of scope, **reorder the dataset** so `OUT` is first and `ok` is last, keeping the row count identical; (3) at minimum, do not render a row that cannot be seen. In all cases the `Sin stock` chip must be visible together with its row.
- **RATIONALE:** A keynote beat that names a thing the audience cannot see reads as a glitch, and it silently undercuts the Shopping List that follows — the audience cannot believe an item "suma a la lista" if they never saw the item.

---

### **C-02 — The Plan renders the three literal task strings the master forbids, and none of the six canon tasks**

- **SCENE:** C
- **CURRENT STATE(S):** `S08_step00`, `S08_step01`, `S08_step02`
- **SCRIPT MOMENT:** L147-150 *"repartir tareas, preparar cosas y resolver qué comprar"*; L152 *"para ordenar un objetivo que avanza en varias etapas"*
- **MASTER INTENT:** §7 C1 — the three spoken ideas are *"conceptos editoriales, **no nombres de Tasks**."* §7 C2 — *"Las tres ideas se convierten en tareas concretas de vida real… **No usar como tasks literales `Repartir tareas / Preparar cosas / Comprar lo que falta`.**"* NO-UI §18 gives the canon tasks: `Confirmar invitados · Preparar torta · Decorar · Comprar bebidas · Comprar snacks · Comprar globos`.
- **CURRENT RUNTIME:** `plannerData.ts:22-29` defines `birthdayPlan.steps = [{ id:'distribute', title:'Repartir tareas' }, { id:'prepare', title:'Preparar cosas' }, { id:'shopping', title:'Comprar lo que falta' }]`. The DOM renders them at `19 px / 500` (`planner-row-title`), each on a `248×62` row, with `Cumpleaños` at `20 px` and `Sábado · 3 pasos pendientes` at `13 px`. There is no event, no time, no owner, no milestone and no per-task assignee.
- **FIGMA TARGET:** Plan detail exists in the target (Session 2 read `PlanDetailScreen.tsx`), and the target's task vocabulary is life-like (`Reservar salón`, `Comprar comida` per Product Truth L851-852). The target is *not* the source of the forbidden strings.
- **PRODUCT TRUTH / INTEGRATION:** `PLANS_PRODUCT_TRUTH_V1` L49-56: composition is `TASKS / EVENTS / MEASUREMENTS`; tasks must be concrete actions (`comprar alimento del perro`, `llamar al plomero`, per Planner Freeze L438-443). Integration builds Plan detail as `linkedTasks` (Session 2 B-09). The three literals are abstract categories, which the model does **not** treat as tasks.
- **HUMAN WALKTHROUGH:** `HW-C-001` — *"El plan se presenta como 4 líneas de texto, no como un plan con estructura."* `HW-C-002` — *"La idea no es que sea así, sino que **aparezcan tareas reales**."* Both **CONFIRMED**.
- **CLASSIFICATION:** MASTER RULE VIOLATION (frozen Scene C rule) + PRODUCT SEMANTICS VIOLATION
- **SEVERITY:** **BLOCKER**
- **VERDICT:** **REJECT.** This is the second occurrence of the identical violation Session 2 recorded as **B-09** on the Planner/Planes surface. The presentation has now spent the *primary content* of Scene C on the strings the master explicitly wrote a rule against.
- **TARGET BEHAVIOR:** Keep the three **broad ideas** as a brief editorial beat if the script needs them, but the Plan itself must show concrete, household-real tasks drawn from NO-UI §18 (e.g. `Confirmar invitados · Preparar torta · Comprar bebidas · Comprar globos`). The `comprar` task that becomes the bridge should be a specific purchasable (`Comprar bebidas` or `Comprar lo que falta` only if a concrete item list is attached). Every task row should carry the product's own task anatomy — assignee and due — since Product Truth makes assignment a core Planner concept.
- **RATIONALE:** A Plan whose steps are the narration's own abstract nouns proves nothing. The scene's job is to demonstrate that a Plan coordinates *several concrete steps*; abstract categories are exactly the thing the master forbade because they collapse back into the sentence the speaker is already saying.

---

### **C-03 — The selective exposure is inverted at the bridge beat: at `S08_step02` the whole device drops to 0.6, including the task that must survive**

- **SCENE:** C
- **CURRENT STATE(S):** `S08_step01 → S08_step02`
- **SCRIPT MOMENT:** L155 *"Y cuando una de esas tareas es: 'comprar lo que falta'"* → L159-161 *"aparece otra pregunta: '¿Qué falta en casa?'"*
- **MASTER INTENT:** §7 C3 — *"En `comprar lo que falta`: foco/zoom en el cluster de compra. En `¿Qué falta en casa?`: … Bajar exposición + blur y hacer transición hacia Inventory."* NO-UI §9 — the state must declare its persistence model; the bridge task is the declared survivor (**SELECTIVE CONTINUITY**).
- **CURRENT RUNTIME:** At `step01` the mechanism is **correct**: sibling steps `opacity 0.55`, bridge step `opacity 1.00` with `background rgb(246,237,232)`, heading `0.6` (measured; `s08-scene.css:56-60`). At `step02` the `s08-plans-focus` class is removed (`showQuestion = stepIndex === 2`, `index.tsx:10`; the focus class is gated on `stepIndex === 1`, `index.tsx:23`), so **all three steps return to `opacity 1.00` and the heading returns to `1`** — and instead the **whole device** is dimmed via `.s08-phone-slot[data-dim='true'] { opacity: 0.6 }` (`s08-scene.css:30`). Measured slot opacity at `step02`: **0.6**; step opacities: `1, 1, 1`; heading `1`.
- **FIGMA TARGET:** n/a — this is a presentation-grammar rule.
- **PRODUCT TRUTH / INTEGRATION:** n/a.
- **HUMAN WALKTHROUGH:** `HW-C-003` — *"de esa tarea **nace un concepto donde se le baja la exposición a todo el resto**, pero 'comprar lo que falta', esa tarea en específico, **no se debería bajar el exposure**; ésa sola debería quedarse igual. Entonces '¿qué falta en la casa?' y eso **deberían estar con una exposición normal**."* **CONFIRMED** — and precisely: the observation is right about `step02`, and the current code gets `step01` right by accident of ordering.
- **CLASSIFICATION:** MOTION / STATE-PERSISTENCE DEFECT — the persistence model is applied one beat early and then abandoned
- **SEVERITY:** **HIGH**
- **VERDICT:** **ACCEPT the hypothesis, REJECT the current behaviour.** `step01` proves the team can build the right mechanic; `step02` throws it away at exactly the moment the bridge is supposed to happen.
- **TARGET BEHAVIOR:** Carry the `step01` selective exposure **forward** into `step02` and merge it with the transition: at `step02`, lower exposure of the **plan heading, the sibling tasks and the device chrome**, but keep the **bridge task at 100 %**; let the same task's row become the anchor for the Inventory entrance. Replace the uniform `slot opacity 0.6` with per-element exposure. The question should not be *written* (see C-08), or if kept, be placed so it does not compete with the surviving task. When Inventory arrives, the bridge task's **semantic** (a purchase is needed) should be the first thing Inventory answers.
- **RATIONALE:** The bridge is a single semantic object moving between two contexts. Dimming it removes the only thread the audience can follow, and the module change then reads — correctly — as "now here is another module", which is the exact outcome the brief's §12 forbids.

---

### **C-04 — The Plan → Inventory transition is a 480 px device slide with no shared element; the bridge task never survives**

- **SCENE:** C
- **CURRENT STATE(S):** `S08_step02 → S08_step03`
- **SCRIPT MOMENT:** L161 *"¿Qué falta en casa?"* → L163 *"Ahí entra el Inventario"*
- **MASTER INTENT:** §2.4/§8 taxonomy — *"same datum = same visual object cuando sea posible"*; §7 C3 is a transition *"hacia Inventory"*, not a device replacement. NO-UI §7 — *"Si las surfaces están lejos: **DEVICE_TRANSITION**"* (i.e. a device transition is the **fallback**, used only when no shared element exists).
- **CURRENT RUNTIME:** rAF-sampled: the slot's `transform` runs `matrix(1,0,0,1,0,0)` → `matrix(1,0,0,1,480,0)` over ≈540 ms (`--motion-spatial-wipe-duration`), x `250 → 730`, while the two `.s08-layer`s crossfade (`opacity 1→0` / `0→1`) over `--motion-replace-duration`. The plan-step opacities, measured across the whole transition, are **constant** (`heading 1 · step0 1 · step1 1 · step2 1` at every sample) — the bridge task receives **no treatment at all** during the transition. The question `¿Qué falta en casa?` is `opacity 1` at the first sample and `0` by ≈420 ms. There is no extracted object, no element that flies, no camera crop: the entire Inventory screen is a sibling layer that is already laid out at the destination x.
- **FIGMA TARGET:** n/a — transition grammar.
- **PRODUCT TRUTH / INTEGRATION:** Integration has **no navigation** from Inventory to anything (`InventarioScreen.tsx` contains zero `navigate` calls); a real tap from Plan to Inventory does not exist. So this must be an **EDITORIAL** or **SHARED_ELEMENT** transition, never a simulated tap.
- **HUMAN WALKTHROUGH:** `HW-C-004` — *"el teléfono se mueve hacia la derecha, aparece el inventario, pero **la interacción y animación del inventario no tiene ningún tipo de sentido con lo que dijo Infra**."* **CONFIRMED**.
- **CLASSIFICATION:** MOTION DEFECT — DEVICE_TRANSITION used where SHARED_ELEMENT was specified; no semantic continuity
- **SEVERITY:** **HIGH**
- **VERDICT:** **REJECT the transition; KEEP the Inventory screen.**
- **TARGET BEHAVIOR:** Either (a) **SHARED_ELEMENT**: extract the bridge task row (or a token of it — the item word `bebidas` / a cart glyph) from the Plan, hold it while the Plan recedes, and let it land as the first Inventory row or as the Shopping List line; or (b) if no shared element is built, declare the transition **EDITORIAL** explicitly — the device does not slide as though navigating; instead the Plan lowers exposure and the Inventory fades up **in place**, with a clear editorial beat (e.g. the question, then the answer). What must not continue is a 480 px slide that pretends to be navigation the product does not have (MASTER §16 rule 11).
- **RATIONALE:** A device slide is the correct tool for *unrelated surfaces*. Plan → Inventory is the most related pair in the entire film: one is the cause of the other. Using the unrelated-surface tool here is what makes the scene read as a module switch.

---

### **C-05 — There is no Shopping List; the `Lista de compras · 8 para comprar` card is a static teaser with no list, and the script's "se suma automáticamente" has no state**

- **SCENE:** C
- **CURRENT STATE(S):** `S08_step03`, `S08_step04`
- **SCRIPT MOMENT:** L169-170 *"Y cuando algo hace falta, puede sumarse automáticamente a la lista de compras."*; L172 *"Así antes de ir al supermercado te ahorras dar vuelta toda la casa"*
- **MASTER INTENT:** §7 C5 — *"El item faltante se desprende y viaja literalmente a la Shopping List. La lista ya tiene otros productos. El item aterriza como fila real. Hold de lista completa."*
- **CURRENT RUNTIME:** `inventoryData.ts:23` defines `shoppingSummary = { title: 'Lista de compras', subtitle: '8 para comprar', count: 8 }`. It renders as an **8<sup>th</sup>-class summary card** (`inventory-screen.css:20-21`) with a title, a subtitle and a circular `8` badge. There is no list, no rows, no item names, no interaction and no change across steps. Measured geometry: `248×66` at `step03`, `248×70` at `step04`.
- **FIGMA TARGET:** Not present as a surface (see §3.3). A `ShoppingCard` prototype exists only inside a chat export.
- **PRODUCT TRUTH / INTEGRATION:** `HOMePLUS_INVENTORY_PRODUCT_FREEZE_V1.0.md` **forbids** a parallel Shopping List (L802, L120-121, L2113-2127) and routes restock into a **Planner Task**. The `Inventory Foundation` V1.1 candidate **supports** it (`LISTA DE COMPRAS` primary surface; `Product → Shopping List line`). Integration implements **neither**: no frontend feature, no backend route. The real mechanism is `inventory_restock_requests → approve → planner task` (`backend\src\services\inventory.service.js:121-152, 496-557`). **Classification: `SUPPORTED (V1.1 candidate) + NOT YET IMPLEMENTED`.** Presenting it as a `VISUAL TARGET ONLY` is acceptable **if** the handoff flags it.
- **HUMAN WALKTHROUGH:** `HW-C-005` — the automatic add *"no existe en Integration"*; `HW-C-006` — the concrete benefit is not shown. Both **CONFIRMED**.
- **CLASSIFICATION:** IMPLEMENTATION GAP + PRODUCT-TRUTH CONTRADICTION (freeze vs candidate) + COMPOSITION DEFECT (a capability claim reduced to a badge)
- **SEVERITY:** **HIGH**
- **VERDICT:** **REJECT the teaser as a demonstration; DO NOT correct the product truth here.** The scene may not show a fake list, but the badge alone proves nothing.
- **TARGET BEHAVIOR:** Choose one honest path and have the script match it. **Path A (product-true today):** show the real mechanism — the missing item becomes a **Planner task** (`Comprar café · alta prioridad`), visible as a row landing in the Plan, and adjust the spoken line from "la lista de compras" to the Planner handoff. **Path B (visual target):** build a real Shopping List surface (target design) with the missing item landing as a row among others, and **explicitly flag `NOT YET IMPLEMENTED` in the handoff**, plus resolve the V1.0-vs-V1.1 freeze contradiction before using the words "lista de compras" on stage. Either way the Shopping List card must not remain a badge.
- **RATIONALE:** The scene's payoff is "you already know what to buy". A badge reading `8` asserts a number with nothing behind it. Either the number is demonstrable (a list) or the capability is redirected to what the product actually does.

---

### **C-06 — The `S08_step03→04` "focus" is an instantaneous, unsignalled layout-and-type mutation that makes the clip worse and spotlights a fully-stocked item**

- **SCENE:** C
- **CURRENT STATE(S):** `S08_step03 → S08_step04`
- **SCRIPT MOMENT:** L165-167 *"qué se está terminando y qué necesitamos comprar"*
- **MASTER INTENT:** NO-UI §6 — *"Micro focus: 100 → 108 → 100"*; *"Strong UI focus: máximo 115%"*. §6 — *"Preferir exposición antes que blur"*. NO-UI §6 durations: `micro emphasis 180–240 ms`. MASTER §2.6 — *"Usar scale para **atención semántica**, no por decoración."*
- **CURRENT RUNTIME:** rAF-sampled at 28 ms intervals. At the **first** sample after the keypress (**t = 10.3 ms**) the row heights are already `90.7 / 64.5 / 64.5 / 64.5`, the titles already `21 px`, the card already `226.2 px` tall and the shop box already `72.5 px`. **There is no interpolation.** `anims` = 8, all of which are the `.ambient-glow` `attention-enter` fill-mode animations, not the rows. Session 1 measured the same change as `title 19→21px`, `meta 12→13.5px`, `status 11→12px`, row `62→64`, and `.inventory-card scrollHeight 270→284`. Consequence: the card's hidden excess **grows from +41 px to +60 px** and the OUT row's clip deficit grows from 42 px to 62 px. Additionally, the three rows that receive `data-highlight="true"` are `Papel higiénico` (`low`), `Leche` (`low`) and **`Detergente` (`status:'ok'`, `qty '3 u'`)** — a fully-stocked item is spotlit identically to the two low-stock ones (`inventoryData.ts:17-20`; `inventory-screen.css:29-31`). Only `Café` (`out`) is `data-dim`.
- **FIGMA TARGET:** The target's own type grammar is `15/500` for list-row titles and `12/400` for row meta; it does **not** enlarge row type to signal state. State is communicated by a tonal surface (`FinanceStatus`) and by explicit copy, never by font-size.
- **PRODUCT TRUTH / INTEGRATION:** Integration's status is a `StatusBadge` with `tone` (`InventarioScreen.tsx:98-102, 141`) — the state is a **badge**, not a size.
- **HUMAN WALKTHROUGH:** `HW-C-004` (englobed an animation complaint). No hypothesis separates `step03` from `step04`; this is new.
- **CLASSIFICATION:** LAYOUT-SIZE MUTATION used as emphasis + STATE-SEMANTICS DEFECT
- **SEVERITY:** **MEDIUM**
- **VERDICT:** **REJECT the technique; REJECT the spotlight set.**
- **TARGET BEHAVIOR:** Do not resize the product's rows. Signal "low / out" with the product's own vocabulary (the existing `Bajo` / `Sin stock` chips), plus a **SELECTIVE EXPOSURE** pass that dims the non-relevant rows to `0.45` (as already attempted) **without changing type or geometry**, plus a **LOCAL NON-REFLOW EMPHASIS** on the OUT row (the 4 px brand bar already exists — keep it, drop the type growth). The `ok` item (`Detergente`) must **not** be spotlit; if a third highlight is needed, it must be a second `low` or the `out` item. And the OUT row must be brought into the visible box (C-01).
- **RATIONALE:** A change the audience cannot see happen is not an emphasis; it is a jump cut inside a device that makes the same screen look like a different screen. Enlarging three items with a uniform treatment that ignores their differing stock state communicates the opposite of what the narration says.

---

### **C-07 — The Plan card has no Event identity: no time, no owner, no relation to the calendar Event the narration names**

- **SCENE:** C
- **CURRENT STATE(S):** `S08_step00`, `S08_step01`
- **SCRIPT MOMENT:** L146 *"Un cumpleaños el sábado es un evento"*
- **MASTER INTENT:** §7 C0 — *"En `Un cumpleaños el sábado es un evento`: revelar Planner/Events alrededor de la misma card."* NO-UI §18 canon: `Cumple de Juli · Sábado · 19:00`. NO-UI §5 minimum readable size and MASTER §3 continuity canon.
- **CURRENT RUNTIME:** The card reads `Cumpleaños` (`20 px`) and `Sábado · 3 pasos pendientes` (`13 px`). There is no `19:00`, no event/plan distinction, no owner, and no relationship to the calendar. The screen title is `Planes` with a `Tareas | Calendario | Planes` segmented control. The word `Evento` never appears.
- **FIGMA TARGET:** Planner Plans in the target distinguishes Plan vs Event (`PlanDetail` includes an `EVENTOS` block per Product Truth L660-668); the target's plan header carries identity, not just a label.
- **PRODUCT TRUTH / INTEGRATION:** `PLANS_PRODUCT_TRUTH_V1` L69 *"Un Event puede existir independientemente o estar vinculado a un Plan."* Integration's `PlannerPlanDetailScreenV1` carries `linkedTasks` and milestone-ish structures.
- **HUMAN WALKTHROUGH:** `HW-C-001` (the plan is four lines of text, not a structure) **CONFIRMED**.
- **CLASSIFICATION:** PRODUCT-ANATOMY OMISSION — the Plan is shown without the Event relationship the narration asserts
- **SEVERITY:** **MEDIUM**
- **VERDICT:** **REVISE.** The card is not wrong; it is under-specified for the sentence being spoken.
- **TARGET BEHAVIOR:** Give the plan card the canon identity: `Cumple de Juli · Sábado · 19:00`, plus a visible `Evento` marker or a linked-event row so that `es un evento` is literally true on screen. If the Plan/Event distinction is too much for the presentation's time budget, at minimum add the time and the person, since NO-UI §18 already provides both.
- **RATIONALE:** The scene exists to show that a Plan is *not just* an event. That contrast only reads if the Event is present first.

---

### **C-08 — `¿Qué falta en casa?` is the narration copied to the screen at 68 px, and it holds for exactly one state**

- **SCENE:** C
- **CURRENT STATE(S):** `S08_step02` (and partially visible during the `step02→03` transition)
- **SCRIPT MOMENT:** L159-161 *"aparece otra pregunta: '¿Qué falta en casa?'"*
- **MASTER INTENT:** §2.3 — *"No duplicar lo que dice el expositor."* §2.3 lists the only approved on-screen conceptual texts (`La información ya existía.` · `Coordinar no es vigilar.` · `¿Y si ni siquiera tuviéramos que saber cómo?` · `HomePlus` · `Homi` · `Muchas gracias.`) — `¿Qué falta en casa?` is **not** among them. §7 C3 — *"En `¿Qué falta en casa?`: **no escribir la pregunta**."*
- **CURRENT RUNTIME:** `.s08-question` renders at `68 px / 600` in the right column (`s08-scene.css:62-86`). It is `opacity 0` at `step00`/`01`, `opacity 1` at `step02`, and `opacity 0` again from `step03` on. Measured during the transition: `1` at 17.8 ms, `0.218` at 110.4 ms, `0.005` at 280.3 ms, `0` by 419.6 ms. So the written question is on screen for the duration of **one state**, while the speaker asks it at normal speech pace.
- **FIGMA TARGET:** n/a — the target never writes the presenter's questions.
- **PRODUCT TRUTH / INTEGRATION:** n/a.
- **HUMAN WALKTHROUGH:** `HW-C-003` references the question's exposure, not its presence. This specific rule violation is new.
- **CLASSIFICATION:** MASTER RULE VIOLATION (on-screen copy)
- **SEVERITY:** **MEDIUM**
- **VERDICT:** **REJECT the written question.**
- **TARGET BEHAVIOR:** Remove the on-screen `¿Qué falta en casa?`. Let the question be spoken over the held Plan/inventory bridge (exposure lowered per C-03), and let Inventory *answer* it. If a written question is kept anywhere in Scene C for structural reasons, it must be one of the approved set and it must hold across the transition, not blink for one state.
- **RATIONALE:** A written question that duplicates the speaker competes with the speaker and, at one state of screen time, reads as a flash rather than a beat.

---

### **C-09 — POSITIVE — the Inventory→Shopping teaser is the correct narrative function, even though the surface is missing**

- **SCENE:** C
- **CURRENT STATE(S):** `S08_step03`, `S08_step04`
- **SCRIPT MOMENT:** L169-170
- **MASTER INTENT:** §7 C5.
- **CURRENT RUNTIME:** The `Lista de compras` card is placed **after** the inventory list, within the same device, in the correct reading order, and it is the only element in the Inventory screen that names the destination. Its `8` badge is the one quantity on the screen that implies a list.
- **CLASSIFICATION:** POSITIVE — concept worth keeping
- **SEVERITY:** **POSITIVE**
- **VERDICT:** **KEEP CONCEPT / RECOMPOSE EXECUTION.**
- **TARGET BEHAVIOR:** Keep the position and the idea; replace the badge with a real (even if short) list, or redirect to the Planner-task mechanism (§3.3 path A).
- **RATIONALE:** The scene's ending needs a "what to do next" surface. The card correctly marks that place.

---

### **C-10 — POSITIVE — `S08_step01` selective exposure is executed correctly and should be the model for the scene**

- **SCENE:** C
- **CURRENT STATE(S):** `S08_step01`
- **SCRIPT MOMENT:** L155 *"Y cuando una de esas tareas es: 'comprar lo que falta'"*
- **MASTER INTENT:** §7 C3 *"foco/zoom en el cluster de compra"*; NO-UI §9 SELECTIVE CONTINUITY.
- **CURRENT RUNTIME:** measured `step0 0.55 · step1 0.55 · step2 1.00 · heading 0.6` with `background rgb(246,237,232)` on the bridge step. No scale, no layout change, no blur — pure exposure contrast using the product's own soft-brand token (`--home-brand-soft`).
- **CLASSIFICATION:** POSITIVE
- **SEVERITY:** **POSITIVE**
- **VERDICT:** **KEEP AS-IS** and propagate into `step02` (per C-03).
- **RATIONALE:** This is exactly the restrained, token-based emphasis the enlargement principle asks for. It is the best-executed moment in Scenes C–E.

---

## 6. Scene C positives

- **KEEP AS-IS:**
  - `S08_step01` selective exposure (C-10).
  - The Inventory screen's **anatomy**: heading + filter chips + a bordered list card + a summary card + the shell navigation. It is recognisably a HomePlus module surface, using the same header, cards, radii and nav as Home/Planner/Finance.
  - The `PDF`/tile vocabulary shared between Inventory, Assets and HomeCloud — it creates real visual consistency across the three modules.
  - The dataset **names**: `Papel higiénico · Baño · 4 u · Bajo`, `Leche · Heladera · 2 L · Bajo`, `Café · Alacena · 0 · Sin stock` are plausible, product-like and consistent with V1.0's illustrative items (`leche`, `papel higiénico`).
- **KEEP CONCEPT / RECOMPOSE EXECUTION:**
  - The Inventory→Shopping teaser (C-09).
  - The Plan card as the scene's anchor (`S07` → `S08` handoff continuity is real: the same card is isolated at the end of `B8` per master §6 B8 and persists into `S08_step00`).
- **REPLACE:**
  - The Plan task dataset (C-02).
  - The transition family (C-04).
  - The `step03→04` emphasis technique (C-06).

---

## 7. Scene C target choreography

**CURRENT:** `S08_step00` (Plan) → `S08_step01` (bridge task focus) → `S08_step02` (question on stage + device dim 0.6) → `S08_step03` (device slides 480 px right → Inventory) → `S08_step04` (Inventory rows grow instantly) → cross-mount to Finance.

| Beat | CURRENT | TARGET | ACTION |
|---|---|---|---|
| C-B1/C-B2 (`es un evento`) | Plan card alone | Plan card + its linked **Event** (`Cumple de Juli · Sábado · 19:00`) revealed around it | **RECOMPOSE** |
| C-B3 (`repartir tareas, preparar cosas…`) | three literal task rows | three **editorial** concepts, briefly, then into concrete tasks | **REPLACE** |
| C-B4 (`para ordenar un objetivo…`) | same three literals | six canon tasks, assigned and dated | **REPLACE** |
| C-B5 (`comprar lo que falta`) | correct selective exposure | **KEEP** | **KEEP** |
| C-B6 (`¿Qué falta en casa?`) | written 68 px, 1 state, device dim 0.6 | spoken only; bridge task holds 100 %; siblings/heading dim | **RECOMPOSE** |
| C-B7 (Inventory three clauses) | LOW 2/2, OUT 0/1 | all three states visible; OUT focused | **RECOMPOSE** |
| C-B8 (`se suma a la lista`) | static badge | missing item becomes a real row (list or Planner task) | **RECOMPOSE** |
| C-B9 (`ya sabes qué comprar`) | hold of badge | hold of the complete list | **RECOMPOSE** |
| C-B10 (purchase → money) | cross-mount | the purchase completes and becomes the bridge object | **REPLACE** |

**Resulting Scene C shape:** Plan (with Event identity and concrete tasks) → bridge task isolated → question spoken over the held Plan → Inventory fades in **in place** / the bridge object travels → Inventory shows `ok`, `low`, `out` with the OUT item focused → the OUT item lands in the destination list → **the same purchase object** carries into Scene D.

**What remains / moves / dims / becomes the bridge:**
- **Remains:** the Plan card and its `Cumple de Juli` identity through `C-B1…C-B5` (the scene's continuity thread).
- **Moves:** one object — the needed purchase (`Café`, or a token naming it) — from the Plan/Inventory into the Shopping/Planner destination.
- **Dims:** the non-relevant Plan tasks at `C-B5`, the Plan chrome at `C-B6`, the `ok` Inventory rows at `C-B7`.
- **Becomes the bridge:** the **purchase object**, which must then cross into Finance (see §8).

---

## 8. C → D handoff audit

**The narrated bridge:** L176 marker `[aca arranca la del dinero es un hogar]` → L180-184 *"Y cuando hacemos esa compra, entra otra parte de la organización: el dinero. Ahí aparece Finanzas."*

**MASTER INTENT (§8 D0):** *"La compra se completa. Shopping List purchase → gasto ya registrado. No arrastrar la misma compra manualmente a New Movement. Transición a Finance / Movimientos. Debe verse como easter egg: `Supermercado · $XX.XXX`. No sobrerresaltarlo."*

### **C-11/D-10 — There is no purchase; the handoff is a cross-mount, and Finance is fully present before the speaker introduces money**

- **SCENE:** C→D
- **CURRENT STATE(S):** `S08_step04 → S09_step00`
- **SCRIPT MOMENT:** L176-184
- **MASTER INTENT:** §8 D0 (above); NO-UI §8 — *"si no existe en producto, NO fingir tap… same datum = same visual object cuando sea posible."*
- **CURRENT RUNTIME:** rAF-sampled. At **t = 9.6 ms** the slot is at `250,66` with `transform: none`, the Finance hero is already `opacity 1`, all three `finance-tab`s are `opacity 1`, and there are already **2 payment rows and 2 category rows** rendered. The only motion is a 16 px vertical settle (`y 66 → 50`, `.s09-phone-in`, `--motion-reframe-duration`). The Shopping List card, the `8`, and the Inventory screen are **absent from frame 0**. There is no `Supermercado · $…` row anywhere, and no Finance `Movimientos` surface exists to hold one (the screen has a `Movimientos` **tab**, never activated).
- **FIGMA TARGET:** `Movimientos` is a full surface with dated groups and typed rows (`Gastos | Ingresos | Transferencias`); it is where a purchase row would live. `Nuevo movimiento` is a sheet. Neither is touched.
- **PRODUCT TRUTH / INTEGRATION:** Integration's real path is `Shopping/restock → Planner task` (V1.0) — it does **not** auto-create a Finance movement. The Investment's finance module does have typed movements including `EXPENSE` (`financeMovements.ts:147-190`), so a `Supermercado` expense row is a legitimate product object. **Classification: SUPPORTED + NOT IMPLEMENTED as an automatic link.** The presentation may show the movement as a data fact; it must not imply a pipeline the product does not have.
- **HUMAN WALKTHROUGH:** `HW-C-007` — *"y después entrar a la transición con Gaby en Finance, pero **no hay una buena transición de lo que quedó en inventario**."* **CONFIRMED** and understated: there is no transition at all.
- **CLASSIFICATION:** MISSING SHARED ELEMENT + TIMING DEFECT (the module appears before its narration) + PRODUCT-TRUTH AMBIGUITY (auto-registration)
- **SEVERITY:** **BLOCKER**
- **VERDICT:** **REJECT.** The single most important handoff in the session does not exist.
- **TARGET BEHAVIOR:** In order: (1) the purchase must visible-complete — the Shopping/Planner destination is resolved; (2) **one object survives** — the purchase — and it must be the *same visual object* in both contexts; (3) Finance must **not** be on stage before `L180` begins; the `Movimientos` surface should arrive as the purchase resolves, and the `Supermercado · $48.720` row (NO-UI §18 canon) should be the quiet easter egg the master specifies; (4) because the product does not auto-create a movement, the easter egg must read as a **data fact already in the ledger**, not as an action taken on screen.
- **RATIONALE:** The script literally says "cuando hacemos esa compra". If nothing is bought, the sentence has no referent, and Finance arrives as an unannounced module reset — the exact failure the brief's §12 warns against.

---

## 9. Spoken-beat map — D

Speaker: **Gaby** (script L178–L231). Delivered script is the source; where the master's patched script differs, both are recorded.

| BEAT | SCRIPT (line) | INTENDED IDEA | EXPECTED VISUAL SUPPORT | CURRENT STATE(S) | HAS STATE? |
|---|---|---|---|---|---|
| **D-B1** | L180-184 *"Y cuando hacemos esa compra, entra otra parte de la organización: el dinero. Ahí aparece Finanzas."* | Money enters as a consequence of purchasing | The purchase object crossing; Finance **arriving with the sentence** | `S09_step00` — Finance + `El dinero del hogar` already at `opacity 1` | ✘ (C-11, C-12) |
| **D-B2** | L188-190 *"Acá reunimos y organizamos los movimientos, tanto personales como del hogar."* | Two claims: **movements**, and **personal vs household** | Movements list; a `Personal | Hogar` scope | `S09_step00-04` — screen shows `Familia García` only; no `Personal`; `Movimientos` tab never active | ✘ (D-03, D-04) |
| **D-B3** | L192-194 *"Dentro de Finanzas podemos registrar un movimiento y relacionarlo con las cuentas o tarjetas involucradas."* | Finance **writes**; account/card relation | `Nuevo movimiento` → `Cuenta` selector | none | ✘ (D-03) |
| **D-B4** | L196-204 *"controlar los pagos del hogar… '¿Internet ya está pago?' o '¿Qué pagos vienen?'"* | Payment control; two example questions | `Pagos` surface, focus on Internet then a wider read | `S09_step00-04` — `Pagos próximos: Internet · Pagado / Seguro del auto · En 6 días` are on screen from step00, unfocused | partial (D-06) |
| **D-B5** | L206-210 *"También podemos establecer límites, para tener una referencia de cuánto queremos gastar y ver cómo venimos con respecto a eso."* | **Spending limits** | A limits surface | **none** | ✘ (D-06) |
| **D-B6** | L212-216 *"en Resumen podemos tener una visión general… '¿Cuánto gastamos este mes?'"* | Summary answers monthly spend | Navigate to `Resumen` during the lead-in; focus `Gastamos` | `S09_step00-04` — `Resumen` is active from step00 and the balance is on screen before the question | partial, mis-timed (D-07) |
| **D-B7** | L218-222 *"podemos entrar al análisis y preguntarnos: '¿En qué se nos está yendo más?'"* | Analysis by category | Enter `Análisis`; focus the main category | `S09_step00-04` — `Por categoría` (Alimentos 44 %, Transporte 33 %) is on screen from step00 | partial, mis-timed |
| **D-B8** | L224-230 *"Finanzas no se queda solamente en registrar movimientos. También nos permite controlar, consultar y entender mejor el dinero del hogar."* | The summary claim: register · consult · understand | Hold the UI; lower exposure to return to Gaby | `S09_step04` — the same screen; no exposure change | partial |

**Beat arithmetic:** 8 beats against 5 states, but functionally against **1** — the device never changes. Four of the eight beats have no evidence (D-B2's movements & scope, D-B3's write path, D-B5's limits); two are evidenced only because their surface happens to already be on screen (D-B4, D-B6/B7).

---

## 10. Finance deep audit

### 10.1 What Gaby actually says vs what the screen does

The narration makes **eight** propositions. The screen evidences, at best, **two** — and both are present from the first frame, unrelated to the narration's sequence.

| Proposition | Screen evidence |
|---|---|
| "reunimos y organizamos los movimientos" | ✘ no movements list; `Movimientos` tab inactive (measured: `aria-selected` stays on `Resumen` across all 5 steps; tab text opacity never changes) |
| "tanto personales como del hogar" | ✘ contradicted — the only scope on screen is `Agosto 2026 · Familia García`; the word `Personal` does not appear |
| "registrar un movimiento… cuentas o tarjetas" | ✘ no form, no selector |
| "controlar los pagos… Internet ya está pago / qué pagos vienen" | ~ two rows exist (`Internet · Pagado · $38.450`, `Seguro del auto · En 6 días · $62.800`) but there is no focus action and they are on screen before the sentence |
| "establecer límites" | ✘ absent |
| "en Resumen… cuánto gastamos este mes" | ~ `Resumen` tab active; balance `−$55.700` + `vs. +$350.000 ingresado` visible from step00 |
| "entrar al análisis… en qué se nos está yendo más" | ~ `Por categoría` with two bars visible from step00; there is no `Análisis` entry and no category focus |
| "registrar, consultar y entender" | ✘ no change to return attention; the device is unchanged |

### 10.2 The device never changes (measured)

Device-text signature, per state, is the concatenation of every visible in-device string with its font-size:

```
S09_step00 = S09_step01 = S09_step02 = S09_step03 = S09_step04
9:41@13 | Finanzas@26 | Familia García@13 | Resumen@13 | Movimientos@13 | Pagos@13 |
Agosto 2026 · Familia García@12 | −$55.700@29 | vs. +$350.000 ingresado@12 |
Pagos próximos@11 | Internet@17 | Pagado@12 | $38.450@15 |
Seguro del auto@17 | En 6 días@12 | $62.800@15 |
Por categoría@11 | Alimentos@15 | $24.500@14 | Transporte@15 | $18.600@14
```

`unique signatures across the five steps: 1`. The only per-step change is the four stage questions' opacity (`0 → 1 → 0.45`). Therefore `S09` declares **one** product state and four editorial text states.

### 10.3 Finance hierarchy, stage readability, and the target

- **Device size:** `300×620` (no `--phone-scale`), screen `282×602`. This is the **smallest** device in the session: `S10` is `324×669.6`. NO-UI §7 recommends a primary-phone visual height of **820–880 px**; the presentation is at **620 px (S08/S09)** and **669.6 px (S10)** — i.e. 71–76 % of the low end.
- **Type inside the device:** distinct sizes `11, 12, 13, 14, 15, 16, 17, 26, 29`. Smallest `11 px` (the section labels `Pagos próximos` / `Por categoría`); largest `29 px` (the balance). At a 1920×1080 projector (`scale 1.5`) the section labels project at **16.5 px** and the balance at **43.5 px**. NO-UI §5 requires *"Nunca menos de 20 px en contenido que la audiencia deba leer."* The section labels and the row meta (`12 px → 18 px`) are below it.
- **Against the target:** the presentation's section heading is an **11 px uppercase `#6E6B66` micro-label**. The target's `FinanceSection` h2 is **18 / 700 / 24 `#1A1714`** — sentence case, five steps larger, full ink. The presentation's row title is **17 / 500**; the target's `FinanceListRow` title is **14 / 600 / 20**. The presentation's tab is **13 px**; the target's standard segmented label is **14 / 800 / 20** (selected `#C94F2E`, idle `#6B6560`). The presentation's own app brand is `#C96B45` (`homeTokens.ts:8`) — which is **none of** the target's `#E7643F` / `#C94F2E`, and **not** the presentation-level accent `#E65C1B` (`tokens.ts`, per Session 1 A-01). Four brand values across two artefacts.
- **The balance:** presentation `−$55.700` is **white on a filled brand block** (`finance-screen.css:16-18`). The target renders a money *figure* at **24 / 800 `tabular-nums` on transparent**, and reserves colour for the **verdict** — `balanceTone() → positive #0D6B49 / negative #B53042 / zero neutral` — with the explicit rule *"Un estado NUNCA se comunica sólo por color"* (`FinanceStatus.tsx:8-9`). The presentation not only loses the semantic colour (a negative balance is white), it also produces the "fake huge balance detached from context" surface the brief's §21 explicitly forbids.
- **The `Personal | Hogar` switch:** target = a compact segmented control in the header (`FinanceScopeSwitch`), and Integration = the same, **wired to 5 live reads**. Presentation = absent; a household pill `Familia García` instead.
- **Correct details worth keeping:** the presentation does set `font-variant-numeric: tabular-nums` on the balance and amounts, and the composition order (scope → tabs → balance → payments → categories) matches the target's section order.

---

## 11. Finance — Figma vs Product Truth

| Surface | Figma target (VISUAL AUTHORITY) | Product Truth / Integration | Presentation |
|---|---|---|---|
| Root anatomy | `header → scope switch → tabs → content`; only content scrolls (`FinanceRoot.tsx:19-66`) | `FINANCE_TABS = ['resumen','movimientos','pagos']` (`financeContext.ts:8-16`) | heading → household pill → 3 tabs → hero → payments → categories. **Order matches**; the **scope switch is missing** |
| `Resumen` | period nav → `Este mes` + currency + 3 metrics + `Ver análisis` → `Tu dinero` + `Organizar` → `Límites` + `Administrar` | `getFinanceSummary`, `getFinancePoolSummary`, `getFinanceSpendingLimitProgress` (5 live reads) | balance + Pagos próximos + Por categoría. **Has no period nav, no currency, no `Tu dinero`, no limits** |
| `Movimientos` | `[Papelera][período][Nuevo movimiento]` + multi-filter + search + dated groups + typed rows | `EXPENSE | INCOME | TRANSFER`; `NewMovementSheet` full | **not shown** |
| `Nuevo movimiento` | sheet: operation switch + Monto + date + category + **Cuenta/card** selector + `Registrar gasto` | `NewMovementSheet.tsx:992-1246` | **not shown** |
| `Pagos` | `Tarjetas` scroller + `VENCIDOS/HOY/PRÓXIMOS`; recurring shown by an **icon**, not a chip | `PYMT` surfaces; `Internet` overdue example | 2 rows inside the Summary screen; `Pagado` is a **coloured text**, so it is colour-only state |
| `Límites` | real destination screen (`FinanceLimites.tsx`) | real (`FinanceSpendingLimitsManagementScreen.tsx`) | **absent** |
| `Análisis` | real destination screen with `Gastos|Ingresos|Evolución` | real (`FinanceAnalysisDetailScreen.tsx`) | **not entered**; a static `Por categoría` block stands in |
| Money type | `metric 24/30 w800`, `title 18/24 w800`, `inline 14/20 w700`, all `tabular-nums` | same | `29/700`, `17/500`, `15/600`, `14/600` — **different scale and weights** |
| Currency | `El monto NUNCA es un símbolo suelto: la moneda viaja con el número` (`FinanceMetric.tsx:6-7`) | Integration formats with `ARS`/`USD`/`EUR` | bare `$` on all six amounts. **Note:** NO-UI §18 canon also uses bare `$` (`Supermercado $48.720`, `PS5 $580.000`), so **the master and the target disagree**; the presentation followed the master. Recorded, not charged. |

**Target defects observed (recorded, not charged to the presentation):** `Personal | Hogar` in Figma-app changes **nothing but two label colours** (fixture `scope` is never re-read — `FinanceResumen.tsx:49` does not destructure `scope`); screen-title weight is inconsistent across Finance destinations (28/600 · 28/700 · 28/800); the scope switch and tab bar expose `role="radio"` in a `radiogroup` although they switch surfaces (`controls.tsx:77-80`). These are the **target's** problems; the presentation's problem is that it reproduces the *visual* idiom while dropping the one control the narration actually names.

---

## 12. Scene D issue register

---

### **D-01 — The screen is a static prop: nothing in the device changes across all five states, so eight spoken beats rest on one product state**

- **SCENE:** D
- **CURRENT STATE(S):** `S09_step00` … `S09_step04`
- **SCRIPT MOMENT:** L188-230 (the whole Finance block)
- **MASTER INTENT:** §1 verdict table (Continuidad PASS: *"Cada módulo nace de una consecuencia del anterior"*); §8 D1–D4 specify **four distinct navigation actions** (`Nuevo movimiento`, `Pagos`, `Resumen`, `Análisis`); §16 rule 5 timing with the phrase.
- **CURRENT RUNTIME:** device-text signature byte-identical across all five states (measured, §10.2). The only change is on the stage. There is no navigation, no tab change, no sheet, no focus.
- **FIGMA TARGET:** four real destination surfaces + one sheet (measured).
- **PRODUCT TRUTH / INTEGRATION:** every one of those surfaces exists and works (measured, §3.4); `Movimientos`, `Nuevo movimiento`, `Pagos`, `Límites` and `Análisis` are all real.
- **HUMAN WALKTHROUGH:** `HW-D-007` — *"o sea **nada de lo que decimos [en Finance] tiene algún tipo de interacción con lo que pasa en la presentación**. Pasamos"*, filed as **BLOCKER candidato**. **CONFIRMED as a BLOCKER.**
- **CLASSIFICATION:** NARRATIVE DEFECT — the scene has no product behaviour
- **SEVERITY:** **BLOCKER**
- **VERDICT:** **REJECT.** The human is right, and the measurement makes it exact: it is not that the interactions are weak; there are none.
- **TARGET BEHAVIOR:** Build **at least four product states** against the five `stepCount` slots — one per navigation action the script names. Minimum viable: (1) `Movimientos` with the supermarket expense; (2) `Nuevo movimiento` open on `Cuenta` with the `Personal | Hogar` switch visible; (3) `Pagos` with Internet focused, then widened; (4) `Resumen` → `Análisis`. The question list on the stage must be removed (D-02) so the device carries the scene.
- **RATIONALE:** A keynote that says "we can register, control and understand" while showing one unchanging summary screen is a slideshow of a single screenshot. The product can do these things; the presentation just never asks it to.

---

### **D-02 — The four stage questions are the narration copied to the screen at 33 px, and they are the only thing that changes**

- **SCENE:** D
- **CURRENT STATE(S):** `S09_step01` … `S09_step04`
- **SCRIPT MOMENT:** L200 *"¿Internet ya está pago?"*; L204 *"¿Qué pagos vienen?"*; L216 *"¿Cuánto gastamos este mes?"*; L222 *"¿En qué se nos está yendo más?"*
- **MASTER INTENT:** §2.3 — *"No duplicar lo que dice el expositor… Texto en pantalla solamente cuando es: contenido real de UI; una pregunta estructural central; un concepto que merece pantalla propia; nombre/reveal de producto; cierre institucional."* The four questions are **UI-level questions**, not structural concepts; they are not in the approved list.
- **CURRENT RUNTIME:** four `.s09-question` elements at `33 px / 500`, appearing one per step (`data-present={stepIndex >= index + 1}`, `s09Finance/index.tsx:33`), older ones dropping to `opacity 0.45` (`s09-scene.css:66`). Measured: `step00` all four at `0`; `step01` first at `1`; `step02` first `0.45`, second `1`; `step03` first two `0.45`, third `1`; `step04` first three `0.45`, fourth `1`. The idea `El dinero del hogar` is at `opacity 1` from `step00` and never changes.
- **FIGMA TARGET:** the target never writes the presenter's questions; its questions are UI affordances (`Ver análisis`, `Administrar`, `Organizar`).
- **PRODUCT TRUTH / INTEGRATION:** n/a.
- **HUMAN WALKTHROUGH:** `HW-D-001` — *"finanzas **ya apareció en pantalla** con el concepto del 'dinero del hogar' a su costado"*, filed as **BLOCKER candidato**. **CONFIRMED** (see C-12). `HW-D-006` — *"después la pregunta '¿cuánto gastamos este mes?'. Después '¿en qué se nos está yendo más?'. Y ya pasamos"* — **CONFIRMED**: the questions are the only thing that happens.
- **CLASSIFICATION:** MASTER RULE VIOLATION (on-screen copy) + NARRATIVE DEFECT (the questions substitute for product behaviour)
- **SEVERITY:** **HIGH**
- **VERDICT:** **REJECT the question list.**
- **TARGET BEHAVIOR:** Remove all four written questions. Let the device answer them: `Pagos` shows `Internet · Pagado` (the answer to "¿Internet ya está pago?"); `Resumen` shows the monthly figure; `Análisis` shows the category ranking. If a question must be written, it must be one of the §2.3 approved set and it must hold across the transition.
- **RATIONALE:** The questions are the speaker's job. On screen they are a teleprompter, and because they are the only motion in the scene they become the scene.

---

### **D-03 — `Movimientos`, `Nuevo movimiento`, the account/card selector and `Límites` have no state at all**

- **SCENE:** D
- **CURRENT STATE(S):** `S09_step00` … `S09_step04`
- **SCRIPT MOMENT:** L188-190 *"reunimos y organizamos los movimientos"*; L192-194 *"registrar un movimiento y relacionarlo con las cuentas o tarjetas"*; L206-210 *"establecer límites"*
- **MASTER INTENT:** §8 D1 — *"Abrir `Nuevo movimiento`. Completar rápidamente: monto, descripción, categoría. En `cuenta o tarjeta`: desplazar/focalizar Account y elegir una opción realista."* §8 D2 — *"Entrar a `Pagos`."* §8 D3 — *"navegar a Resumen… entrar a Análisis temprano."*
- **CURRENT RUNTIME:** the `Movimientos` tab exists in the DOM (`financeData.ts:1`) and is rendered at `13 px` with `aria-selected="false"` in every state; it is never activated. There is no `Nuevo movimiento` sheet, no `Cuenta` selector, no `Límites` surface. The device-text signature proves none of these ever mount.
- **FIGMA TARGET:** all four exist and were measured (§11).
- **PRODUCT TRUTH / INTEGRATION:** all four exist and work (§3.4). `Nuevo movimiento` is a 1870-line sheet with a `Cuenta` selector that unifies accounts and cards (`NewMovementSheet.tsx:1224-1246`).
- **HUMAN WALKTHROUGH:** `HW-D-004` — *"Lo único que pasa en la presentación es: el teléfono, el dinero del hogar, el primer tab"*; `HW-D-005` — *"el primer tab muestra el ejemplo de que '¿internet ya está pagado?'… Pero los 'límites' no quedan cubiertos"*; `HW-D-006` — *"Resumen y Análisis se mencionan pero **no se ve la transición ni el contenido**"*. All three **CONFIRMED**.
- **CLASSIFICATION:** NARRATIVE DEFECT — three of the block's eight beats have no product state
- **SEVERITY:** **HIGH**
- **VERDICT:** **REJECT.** The scene must be rebuilt around the four navigation actions the script names.
- **TARGET BEHAVIOR:** See D-01 target behaviour. Concretely: `step00` = `Movimientos` (with the supermarket row); `step01` = `Nuevo movimiento` open, `Cuenta` focused; `step02` = `Pagos`, Internet focused; `step03` = `Resumen` with the monthly figure focused; `step04` = `Análisis` with the top category focused. `Límites` is a fifth beat the script names and the five slots cannot hold; either extend `stepCount` to 6 or fold `Límites` into the `Resumen` state as the target does (the target's `Resumen` carries a `Límites de gasto` section with `Administrar`).
- **RATIONALE:** The script's Finance block is the densest in the film (26 spoken lines, 8 beats) and it is the only block in the session whose screen never changes.

---

### **D-04 — The scope claim is contradicted by the data on screen: the narration says "tanto personales como del hogar" and the screen shows only `Familia García`**

- **SCENE:** D
- **CURRENT STATE(S):** `S09_step00` … `S09_step04`
- **SCRIPT MOMENT:** L188-190 *"Acá reunimos y organizamos los movimientos, tanto personales como del hogar."*
- **MASTER INTENT:** §8 D1 — *"En `separar tus gastos de los los del hogar`: volver a Finance y usar el selector real `Personal | Hogar`."* (master's patched script; the delivered script says "tanto personales como del hogar").
- **CURRENT RUNTIME:** the only scope element on screen is `.finance-scope`, a pill reading `Familia García` with a chevron (`finance-screen.css:9-10`). The string `Personal` does not appear anywhere in the device. There is no two-option scope control.
- **FIGMA TARGET:** `FinanceScopeSwitch` — a compact segmented control in the header, `FinanceSegmented variant="compact" distribution="content"`, labels from `FINANCE_SCOPE_OPTIONS` (`finance/FinanceSegmented.tsx:81-105`; `finance/types.ts:106-109`).
- **PRODUCT TRUTH / INTEGRATION:** Integration has the same control **wired to live data** — `FINANCE_SCOPE_OPTIONS = [{PERSONAL,'Personal'},{HOUSEHOLD,'Hogar'}]` (`FinanceScreen.tsx:124-127`), and switching it re-issues 5 concurrent reads keyed per scope (`:347-363`), with `householdId` threaded conditionally into every sheet (`:841`). It is not a static fixture.
- **HUMAN WALKTHROUGH:** `HW-D-003` — *"también con lo que mostramos en pantalla, pero **no le vemos bola**"*. **CONFIRMED.**
- **CLASSIFICATION:** NARRATIVE DEFECT — the screen contradicts the sentence being spoken
- **SEVERITY:** **HIGH**
- **VERDICT:** **REJECT.** Either show the scope switch, or change the sentence. The current state has the speaker asserting a duality the product UI does not display.
- **TARGET BEHAVIOR:** Add the `Personal | Hogar` compact segmented control to the Finance header (target anatomy), and let the scope change be a visible state: switching to `Personal` should visibly re-scope the numbers. If the presentation cannot afford the control, the spoken line should be reduced to "los movimientos del hogar" and the personal scope dropped from this scene.
- **RATIONALE:** This is the first proposition of the Finance block. If the audience cannot see the thing being defined, the rest of the block has no foundation.

---

### **D-05 — Finance anatomy diverges from the target: section headings, the balance treatment, and a fourth brand colour**

- **SCENE:** D
- **CURRENT STATE(S):** `S09_step00` … `S09_step04`
- **SCRIPT MOMENT:** whole block
- **MASTER INTENT:** §2.1 — *"UI HomePlus: usar el Design System real del producto."* §16 rule 9 — *"¿Una UI provisional está creando Product Truth nuevo? Corregir."*
- **CURRENT RUNTIME (measured):**
  - Section heading: `11 px / 600 / uppercase / letter-spacing 0.66 px / #6E6B66` (`finance-screen.css:21`). Target: `18 / 700 / 24 / #1A1714`, sentence case, no tracking (`FinanceSection.tsx:43-48`).
  - Row title: `17 / 500`. Target: `14 / 600 / 20` (`FinanceRows.tsx:95-96`).
  - Tab: `13 px`, selected `#C96B45`. Target: `14 / 800 / 20`, selected `#C94F2E`, idle `#6B6560` (`FinanceSegmented.tsx:65-69`).
  - Balance: `29 / 700`, **white on a filled `#C96B45` block**, `padding 9px 14px`, `border-radius 16px` (`finance-screen.css:16-18`). Target: `24 / 800 / 30`, `tabular-nums`, **transparent**, colour = verdict only (`#0D6B49` / `#B53042` / `#1A1714`) (`FinanceMetric.tsx:30-33,56-66`; `FinanceStatus.tsx:8-9`).
  - App brand: `--home-brand: #C96B45` (`homeTokens.ts:8`). Target brand `#E7643F`, brand-pressed `#C94F2E`. Presentation-level accent `#E65C1B` (`tokens.ts`, Session 1 A-01). **Three different brand values across two artefacts, plus a fourth at presentation level.**
  - `Pagado` is communicated by **colour alone** (`#2d7a51`, `finance-screen.css:29`). Target rule: *"Un estado NUNCA se comunica sólo por color"* (`FinanceStatus.tsx:8-9`).
- **FIGMA TARGET:** as above.
- **PRODUCT TRUTH / INTEGRATION:** Integration's `FinanceStatus` carries tone **and** copy; `FinanceMetric` carries the currency with the number.
- **HUMAN WALKTHROUGH:** `HW-D-003` (the scope point is not visible) **CONFIRMED**; no hypothesis addresses the anatomy.
- **CLASSIFICATION:** VISUAL-TARGET DIVERGENCE + ACCESSIBILITY (colour-only state)
- **SEVERITY:** **MEDIUM**
- **VERDICT:** **REVISE.** The composition is right; the type grammar and the balance treatment are not.
- **TARGET BEHAVIOR:** (1) Replace the `11 px` uppercase micro-labels with the target's `18 / 700` sentence-case section headings. (2) Replace the filled brand balance card with the target's transparent `24 / 800 tabular-nums` figure, coloured by verdict — a negative balance must read `#B53042`, not white-on-orange. (3) Adopt the target's brand `#E7643F` / pressed `#C94F2E` for the app surface, or explicitly reconcile the three values. (4) Give `Pagado` a text or icon carrier in addition to its colour.
- **RATIONALE:** The brief's §21 forbids "fake huge balances detached from context" and "arbitrary type inflation". A white figure on a saturated brand block is the first; an `11 px` uppercase label where the target uses an `18 px` heading is the second, and it inverts the target's hierarchy — the section structure becomes invisible from the back of a room.

---

### **D-06 — `Pagos` and `Límites`: two rows answer two questions only incidentally, and `Límites` is absent**

- **SCENE:** D
- **CURRENT STATE(S):** `S09_step00` … `S09_step04`
- **SCRIPT MOMENT:** L196-204 *"controlar los pagos del hogar… '¿Internet ya está pago?' o '¿Qué pagos vienen?'"*; L206-210 *"establecer límites"*
- **MASTER INTENT:** §8 D2 — *"`¿Internet ya está pago?`: foco/zoom en Internet. `¿Qué pagos vienen?`: mismo screen, ampliar lectura a varios pagos. **No crear nueva escena.**"*
- **CURRENT RUNTIME:** two payment rows exist inside the `Resumen` screen from `step00`: `Internet · Pagado · $38.450` and `Seguro del auto · En 6 días · $62.800` (`financeData.ts:12-15`). There is **no focus action** on either, no widening read, and no `Pagos` surface. `Límites` does not exist anywhere in the device.
- **FIGMA TARGET:** `Pagos` is a real destination with `Tarjetas` scroller + `VENCIDOS / HOY / PRÓXIMOS` groups; `Límites` is a real destination with `General` + `Por categoría` blocks.
- **PRODUCT TRUTH / INTEGRATION:** both real (`FinancePagos.tsx:68-202`; `FinanceSpendingLimitsManagementScreen.tsx`).
- **HUMAN WALKTHROUGH:** `HW-D-005` — *"el primer tab muestra el ejemplo de que '¿internet ya está pagado?', '¿qué pagos vienen?'… Pero los 'límites' (L206-210) no quedan cubiertos"*. **CONFIRMED.**
- **CLASSIFICATION:** NARRATIVE DEFECT (partial coverage) + MISSING SURFACE
- **SEVERITY:** **MEDIUM**
- **VERDICT:** **REVISE.** The two rows are real data and they do answer the two questions — but only because they happen to be on screen, not because the scene asks them to.
- **TARGET BEHAVIOR:** Give `Pagos` its own state with a focus on `Internet` first, then a widening read to `Seguro del auto`. Give `Límites` a state, or fold it into `Resumen` as the target does (the target's `Resumen` carries a `Límites de gasto` section with `Administrar`), which costs no extra step.
- **RATIONALE:** The master explicitly says "no crear nueva escena" for the two payment questions — they belong to one surface with two readings. The presentation has one reading and no focus.

---

### **D-07 — `Resumen` is on screen before Gaby says "Resumen", and the monthly figure precedes the question that asks for it**

- **SCENE:** D
- **CURRENT STATE(S):** `S09_step00` … `S09_step04`
- **SCRIPT MOMENT:** L212 *"Y en Resumen podemos tener una visión general"*; L216 *"¿Cuánto gastamos este mes?"*; L222 *"¿En qué se nos está yendo más?"*
- **MASTER INTENT:** §8 D3 — *"Durante lead-in de `¿Cuánto gastamos este mes?`: **navegar a Resumen antes de terminar la pregunta.** Foco `Gastamos`. Durante `¿En qué se nos está yendo más?`: **entrar a Análisis temprano.** Foco en categoría principal."*
- **CURRENT RUNTIME:** `Resumen` is the active tab at `step00` (`aria-selected="true"` on `Resumen` in every state) and the balance `−$55.700` + `vs. +$350.000 ingresado` plus `Por categoría` (Alimentos 44 %, Transporte 33 %) are on screen from `step00`. So the answer to "¿Cuánto gastamos este mes?" and the answer to "¿En qué se nos está yendo más?" are both visible **before either question is spoken**. There is no navigation to `Resumen` and no entry into `Análisis`.
- **FIGMA TARGET:** `Resumen` and `Análisis` are separate destination screens, reached by `Ver análisis` / `Administrar` / `Organizar`.
- **PRODUCT TRUTH / INTEGRATION:** both real.
- **HUMAN WALKTHROUGH:** `HW-D-006` — *"después la pregunta '¿cuánto gastamos este mes?'. Después '¿en qué se nos está yendo más?'. Y ya pasamos"*. **CONFIRMED.**
- **CLASSIFICATION:** TIMING DEFECT — the answer precedes the question
- **SEVERITY:** **MEDIUM**
- **VERDICT:** **REVISE.** Not a blocker: the data is correct and the composition is right. But the scene gives away its own questions.
- **TARGET BEHAVIOR:** Start `S09` on `Movimientos` (which is where the purchase lands), and let `Resumen` and `Análisis` be *entered* at the moments the script names. If the five slots cannot hold both, keep `Resumen` as the opening state but **remove the balance and the category bars from `step00`** and reveal them at `step03`/`step04` — the current static composition is what makes the questions redundant.
- **RATIONALE:** A question whose answer is already on screen is not a question; it is a caption.

---

### **D-08 — POSITIVE — the Finance composition is a genuine, readable summary surface with coherent numbers**

- **SCENE:** D
- **CURRENT STATE(S):** `S09_step00` … `S09_step04`
- **SCRIPT MOMENT:** whole block
- **MASTER INTENT:** §8 D3/D4.
- **CURRENT RUNTIME:** the composition order (scope → tabs → balance → Pagos próximos → Por categoría) matches the target's section order exactly. The numbers are internally coherent: `Pagos próximos` sums to `$101.250`; the balance `−$55.700` against `+$350.000 ingresado`; `Por categoría` `$24.500 + $18.600 = $43.100`. `font-variant-numeric: tabular-nums` is correctly applied to the balance and amounts.
- **CLASSIFICATION:** POSITIVE
- **SEVERITY:** **POSITIVE**
- **VERDICT:** **KEEP CONCEPT / RECOMPOSE EXECUTION.** Keep the composition and the numbers; rebuild the states around them (D-01, D-07).
- **RATIONALE:** The scene's skeleton is correct. What is missing is behaviour, not layout.

---

## 13. Scene D positives

- **KEEP AS-IS:**
  - The Finance **composition order** and the internal coherence of its numbers (D-08).
  - `font-variant-numeric: tabular-nums` on money.
  - The `Resumen | Movimientos | Pagos` tab row — it reproduces the target's tab vocabulary and gives the scene a real product frame even while it is misused.
  - The `300×620` device at `scale 1.00` for a dense summary screen: the restraint is correct even though the size is not (see §25).
- **KEEP CONCEPT / RECOMPOSE EXECUTION:**
  - The `El dinero del hogar` editorial idea at `60 px` — the *concept* is right and the size is in the NO-UI §5 `56–72 px` "major concept" band. It must simply not be on screen before `L180` (C-12).
  - The `Pagos próximos` and `Por categoría` blocks as the carriers of D-B4 and D-B7.
- **REPLACE:**
  - The four written questions (D-02).
  - The static single-state construction (D-01).
  - The `11 px` uppercase section labels and the filled brand balance card (D-05).

---

## 14. Scene D target choreography

**CURRENT:** `S09_step00` (Resumen + idea + 0 questions) → `step01` (+Q1) → `step02` (+Q2) → `step03` (+Q3) → `step04` (+Q4) → cross-mount to Assets.

| Beat | CURRENT | TARGET | ACTION |
|---|---|---|---|
| D-B1 (purchase → money) | cross-mount; Finance already present | the purchase object crosses; Finance arrives with the sentence | **REPLACE** |
| D-B2 (movements + scope) | `Familia García` only | `Movimientos` list + `Personal \| Hogar` switch | **REPLACE** |
| D-B3 (register + account) | none | `Nuevo movimiento` open on `Cuenta` | **REPLACE** |
| D-B4 (payments) | 2 rows, unfocused | `Pagos`, Internet focused then widened | **RECOMPOSE** |
| D-B5 (limits) | none | `Límites` (or the `Resumen` limits section) | **REPLACE** |
| D-B6 (summary) | on screen from step00 | `Resumen` entered at the lead-in; monthly figure focused | **RETIME** |
| D-B7 (analysis) | `Por categoría` from step00 | `Análisis` entered early; top category focused | **RETIME** |
| D-B8 (register/consult/understand) | no change | hold UI, lower exposure to return to Gaby | **RECOMPOSE** |

**Resulting Scene D shape:** `Movimientos` (with the supermarket row) → `Nuevo movimiento` → `Pagos` → `Resumen` → `Análisis` → exposure down. Five product states, one per step, each answering one spoken question. The `El dinero del hogar` idea appears **once**, at `D-B1`, and only after the purchase.

**What remains / moves / dims / becomes the bridge:**
- **Remains:** the Finance shell (header, tabs, nav) across all five states — the scene's continuity thread.
- **Moves:** the tab indicator and the sheet; nothing else.
- **Dims:** the whole device at `D-B8` to return attention to Gaby.
- **Becomes the bridge:** the **supermarket movement row**, which must then cross into Assets as the PS5 (see §15).

---

## 15. D → E handoff audit

**The narrated bridge:** L232 marker `Infra:Assets --> Homecloud` → L234-236 *"termina quedándose años dentro de la casa. Pensemos en la Play."*

**MASTER INTENT (§8 D5):** *"Bajo blur/exposición, volver a Movimientos y preparar: `PlayStation 5 · Mar 2024 · $580.000`. Foco exclusivo. Infra: `algunas compras terminan ahí, como un gasto`. Después Finance desaparece; la fila PlayStation permanece y se convierte editorialmente en Asset."* §3 canon: `PlayStation 5 | compra histórica usada para Finance → Assets → HomeCloud; demo sugerida: Mar 2024 / $580.000`.

### **D-09 — No PS5 movement exists; the handoff is a cross-mount and the object that should survive never appears**

- **SCENE:** D→E
- **CURRENT STATE(S):** `S09_step04 → S10_step00`
- **SCRIPT MOMENT:** L234-236
- **MASTER INTENT:** §8 D5 (above).
- **CURRENT RUNTIME:** rAF-sampled. `finHero` is **absent at every sample** (the Finance screen is a cross-mount, so no Finance element is present in the new scene at all). At `t = 22.3 ms` the Assets screen is already fully rendered: **4 asset rows**, no hero, no documents. The only motion is the device settling `y 41 → 25` and the device scale changing `1.00 → 1.08`. There is no `PlayStation 5 · Mar 2024 · $580.000` row anywhere in the presentation — the string `PlayStation 5` appears only as an **Assets list row** (`PlayStation 5 · Consola · Living`) and later as an Assets detail hero, never as a Finance movement.
- **FIGMA TARGET:** `Movimientos` rows are typed (`EXPENSE | INCOME | TRANSFER`) with date groups; a PS5 purchase would be an `EXPENSE` row. `Assets` detail has **no purchase field** (see §17).
- **PRODUCT TRUTH / INTEGRATION:** `HOMePLUS_ASSETS_PRODUCT_FREEZE_V2.0.md` §21 (L345-356) removes money from the Asset Core: *"Assets nunca conserva una segunda verdad monetaria."* `assets/types.ts:31-55` has **no** date-of-purchase or price field. Therefore the master's `Mar 2024 · $580.000` **cannot live on the Asset** — it must live on the **Finance movement**, and the Asset relates to it. Integration has no Assets module at all, so the relation is `SUPPORTED + NOT YET IMPLEMENTED`.
- **HUMAN WALKTHROUGH:** `HW-E-001` — *"y hablamos de que algunas compras terminan quedándose 12 años dentro de la casa. Pensemos en la Play"*, filed **CLOSED-POSITIVE** (no deviation). The observation is right and the presentation does not contradict it — but it also does not *show* it.
- **CLASSIFICATION:** MISSING SHARED ELEMENT + PRODUCT-TRUTH CONFLICT (the master's own bridge data is not product-true on the Asset side)
- **SEVERITY:** **BLOCKER**
- **VERDICT:** **REJECT the current handoff; CORRECT the bridge object.**
- **TARGET BEHAVIOR:** (1) In `S09`, before the exit, show a `Movimientos` state containing the PS5 purchase as a typed `EXPENSE` row — `PlayStation 5 · Mar 2024 · $580.000` — with exclusive focus. (2) Let that **row** be the object that survives: Finance lowers exposure, the row is extracted, and it lands as the Assets detail hero. (3) The Asset must **not** repeat the price as its own field; it may *reference* the movement. (4) If the master's `Mar 2024 / $580.000` is kept, it must be presented as a Finance fact, and the Assets freeze's rule must be respected on the Asset side.
- **RATIONALE:** The master's own instruction is *"la fila PlayStation permanece y se convierte editorialmente en Asset"*. The presentation has no PlayStation row in Finance, so there is nothing to preserve and nothing to convert. The D→E handoff is currently a module change, not a consequence.

### **D-11 — The handoff has no intermediate beat: one keystroke separates "el dinero" from "la Play"**

- **SCENE:** D→E
- **CURRENT STATE(S):** `S09_step04 → S10_step00`
- **SCRIPT MOMENT:** L224-230 (Finance close) → L232 marker → L234-236
- **MASTER INTENT:** §8 D5 — *"Infra: `algunas compras terminan ahí, como un gasto`."* The master's **patched script** (§18) adds the two-line hinge: *"porque algunas compras terminan ahí, como un gasto. / Otras se quedan años dentro de la casa."* The **delivered script** has only the marker `[aca arranca la de a veces las compras quedan años en la casa]` and the single line L234.
- **CURRENT RUNTIME:** one keystroke. `S09_step04` (Finance, `scale 1.00`) → `S10_step00` (Assets, `scale 1.08`). No intermediate state, no exposure change on the outgoing scene, no object in flight.
- **HUMAN WALKTHROUGH:** `HW-E-001` (no deviation). Not adjudicated against a missing beat.
- **CLASSIFICATION:** NARRATIVE DEFECT — the conceptual hinge is unrepresented
- **SEVERITY:** **HIGH**
- **VERDICT:** **RECOMPOSE.** Add one state (or one auto-beat inside `S09_step04`) that carries the hinge: *some purchases end as an expense; others stay for years.* Visually that is the PS5 row being **marked** — the same row that then becomes the Asset.
- **RATIONALE:** Without the hinge, "Pensemos en la Play" is a non-sequitur. The master wrote the hinge into the patched script; the delivered script dropped it. This is a **script gap** as much as a presentation gap (§30, SI-04).

---

## 16. Spoken-beat map — E

Speaker: **Infra** (script L232–L271).

| BEAT | SCRIPT (line) | INTENDED IDEA | EXPECTED VISUAL SUPPORT | CURRENT STATE(S) | HAS STATE? |
|---|---|---|---|---|---|
| **E-B1** | L234-236 *"termina quedándose años dentro de la casa. Pensemos en la Play."* | Some purchases persist for years | The PS5 object arriving from Finance | `S10_step00` — Assets list, 4 rows, no Finance origin | ✘ (D-09) |
| **E-B2** | L238-241 *"Hasta que empieza a andar mal, nadie piensa demasiado en **cuándo se compró**, **si le toca mantenimiento** o **dónde quedó la garantía**."* | Three things we forget about a persistent object | Three focused fields: purchase, maintenance, warranty | `S10_step01` (PS5 row focused) → `S10_step02` (detail: hero + 2 docs). **None of the three fields exists.** | ✘ (E-02) |
| **E-B3** | L243-247 *"Assets le da identidad a esas cosas importantes del hogar, y HomeCloud permite conservar alrededor de ellas información como la factura, la garantía o el manual."* | Asset identity + three documents | Full asset identity + `Factura / Garantía / Manual` | `S10_step02` — `Documentos` label + `Garantía PlayStation 5` + `Manual PS5`. **No `Factura`.** | partial (E-03) |
| **E-B4** | L249-251 *"Pero una casa no guarda solamente documentos. También acumula historia."* | The pivot from documents to memory | Documents hold; the surface prepares to change | `S10_step02 → step03` — device slides 480 px right, layers crossfade | ✔ (mechanism only) |
| **E-B5** | L253-255 *"Volvamos al cumpleaños. El evento termina y el Plan cumple su objetivo, pero pueden quedar fotos, una frase, o incluso un audio."* | **The callback.** The birthday returns, completed | Enter the birthday album; show photos / a phrase / audio | `S10_step04` — `Fotos: Cumpleaños · 20 ago`, `Vacaciones · Ene 2026`, `Nota de voz · Mamá · 0:42`, `Álbumes: Cumpleaños · 24 fotos`. **No album entered; wrong date.** | partial (E-07, E-08) |
| **E-B6** | L261 *"HomeCloud también puede reunir esos recuerdos en álbumes."* | Albums as grouping | Exit to a multi-album root | `S10_step04` — a single text row `Álbumes · Cumpleaños · 24 fotos` | ✘ (E-07) |
| **E-B7** | L263-265 *"Porque una garantía tiene valor porque algún día podemos necesitarla. Pero un recuerdo puede tener valor justamente porque algún día ya no vamos a poder repetirlo."* | **The thesis of the product.** Functional document vs irreplaceable memory | Isolate `Garantía PS5.pdf` on one side, a birthday photo on the other | **none** | ✘ (E-04) |
| **E-B8** | L268-269 *"Por eso pensamos HomeCloud no solamente como almacenamiento sino como una memoria del hogar."* | The reformulation | HomeCloud holds, recognisable, then exposure down → black | `S10_step04 → S11_step00` — cross-mount to **pure black**; HomeCloud vanishes at full opacity | ✘ (E-04, E-13) |

**Beat arithmetic:** 8 beats against 5 states, and the last two beats — the thesis and its reformulation — have **no state at all**. `S10` is the only scene in the session whose final spoken idea has nowhere to land.

---

## 17. Assets deep audit

### 17.1 What the narration asks vs what the screen shows

The script names **four** things an Asset carries: *cuándo se compró*, *mantenimiento*, *dónde quedó la garantía*, and the documents around it. The screen shows **one**: a document list.

| Spoken element | Screen evidence |
|---|---|
| "cuándo se compró" | ✘ no purchase date anywhere in the Assets screen |
| "si le toca mantenimiento" | ✘ no maintenance field, no `Próximo` section |
| "dónde quedó la garantía" | ~ `Garantía PlayStation 5 · PDF · HomeCloud` exists as a row, but there is no warranty *status*, no expiry, no `hasta …` |
| "la factura, la garantía o el manual" | ✘ only `Garantía` + `Manual`. **`Factura` is missing** |
| "Assets le da identidad" | ✘ the detail is a hero + one section label + two rows; ~65 % of the device is empty |

### 17.2 The detail screen, measured

`S10_step02` device text, in order:

```
PlayStation 5            22px / 600
Consola · Living         13px / 400
Documentos               11px / 600  (uppercase section label)
PDF  Garantía PlayStation 5   17px / 500   meta 13px  "PDF · HomeCloud"
PDF  Manual PS5                17px / 500   meta 13px  "PDF · HomeCloud"
```

Measured geometry: hero tile `P` at `24 px`, hero title `22 px`, hero meta `13 px`; the two doc rows at `267.8×86.5` and `267.8×63.5`. The device screen is `282×602`; the content ends at approximately y `350`, leaving **~250 px (≈42 %) of the device empty** above the bottom navigation.

### 17.3 Against the target

The target's Asset detail is a **five-section** surface with a fixed, documented order (`assets/Detail.tsx:2`):

```
IDENTIDAD → PERSONAS Y UBICACIÓN → PRÓXIMO → DATOS Y DOCUMENTOS → HISTORIAL
```

with the rule *"una sección vacía no se renderiza"* (`:4`). Measured target anatomy: identity block (avatar 44, name `20/700`, category `13/400`, status pill, two 44×44 icon buttons) · `PERSONAS Y UBICACIÓN` (`Ahora con {holder}` / `Está en {place}` / `A cargo de {custodian}`) · `PRÓXIMO` (next care, empty state `Nada pendiente`) · `DATOS Y DOCUMENTOS` (≤3 + `Ver toda la información (N)`) · `HISTORIAL` (past care entries).

The presentation implements **one** of the five, and implements it as a bare label plus rows.

### 17.4 The product-truth constraint that changes the fix

`HOMePLUS_ASSETS_PRODUCT_FREEZE_V2.0.md` §21 (L345-356) removes money from the Asset Core. `assets/types.ts:31-55` has **no** purchase-date or price field. `MaintenancePlan` owned by Assets is in `EXPLICITLY NOT CORE V2` (L841-842); maintenance is a `Care Record` (L307-311). Images do not exist in V2.

**Consequence:** the fix for E-B2 is **not** "add a purchase date and a price to the Asset screen". That would create new Product Truth, which MASTER §16 rule 9 explicitly forbids. The fix is:
- `cuándo se compró` → a **Finance-owned** fact, surfaced as a *reference*, not a field;
- `mantenimiento` → a `Care Record` / `Próximo` entry;
- `garantía` → a **Record** of type `WARRANTY` with an `until` date (`RECORD_KIND_LABEL.warranty`, `types.ts:134-140`; `AssetRecord.until`, `types.ts:67`);
- `documentos` → `File ↔ Asset` relations, with the File canonical in HomeCloud (`§22 HOMECLOUD OWNERSHIP`, L360-377).

### 17.5 The Assets list

`S10_step00` shows four rows: `PlayStation 5 · Consola · Living`, `Heladera · Cocina`, `TV · Living`, `Aire acondicionado · Dormitorio`. The target's real dataset is `Casa Córdoba`, `Generador eléctrico industrial`, `Impresora HP`, `Lámpara del living`, `Moto G`, `Notebook de trabajo`, `PlayStation 5`, `Taladro Bosch`, `Toby`, `Toyota Corolla`. Three of the presentation's four rows (`Heladera`, `TV`, `Aire acondicionado`) are **not** in the target dataset and never recur in the film. `Heladera` is the opening's chaos object (Session 1 A-06) — showing it as a settled Asset is a missed callback, but as a bare row it is decoration.

---

## 18. HomeCloud Files deep audit

### 18.1 What is on stage

`S10_step03` device text, in order:

```
HomeCloud                          26px / 700
Documentos · Recuerdos             13px / 500 · 13px / 600   (domain switch)
Recientes                          11px / 600  (uppercase section label)
PDF  Garantía PlayStation 5       18px / 600   meta 13px  "PDF · Hoy"
PDF  Manual PS5                   18px / 600   meta 13px  "PDF · Ayer"
PDF  Factura TV                   18px / 600   meta 13px  "PDF · 12 ago"
```

Measured: the three doc rows are `267.8×87`, `267.8×62.7`, `267.8×62.7` at x `746.1`, y `210.2 / 297.2 / 359.9`. The `Documentos` tab is `aria-selected="true"`.

### 18.2 The `Factura` problem

The script (L245-246) says *"la factura, la garantía o el manual"* — three documents, all of the PS5. The Assets detail shows **two** (`Garantía`, `Manual`). HomeCloud shows **three**, but the third is **`Factura TV`** — a document belonging to a **different** asset.

So across the two screens the PS5 has: `Garantía` ✓, `Manual` ✓, `Factura` ✗ (missing from Assets) and `Factura TV` ✗ (wrong object in HomeCloud). The narration's trio is not demonstrable.

### 18.3 Against the target

The target's `Archivos` root is: `buscar · Ordenar · + · ⋯` toolbar → `CARPETAS` (2-col grid of folder tiles then file tiles) → file tiles with a `Subiendo…` chip and a duration overlay. `Información` sheet = `Nombre / Carpeta / Fecha del documento / Nota`. The presentation's `Recientes` flat list is a **simplification**, not a reproduction: it has no folders, no search, no sort, no per-item menu, and no file-type icon beyond a `PDF` text tile.

The presentation's `PDF` text tile is a reasonable stage simplification of the target's type-icon tile, and the `Recientes` grouping is a legitimate editorial reduction. What is **not** legitimate is the `Factura TV` row: it asserts a document relationship the product data does not support for the PS5.

### 18.4 The Assets → HomeCloud transition

Measured across `S10_step02 → S10_step03` (rAF, 320 frames):

| | Assets detail | HomeCloud Documentos |
|---|---|---|
| `Garantía PlayStation 5` | x `266.1`, y `202.4`, `267.8×86.5` | x `746.1`, y `210.2`, `267.8×87` |
| `Manual PS5` | x `266.1`, y `288.9`, `267.8×63.5` | x `746.1`, y `297.2`, `267.8×62.7` |

The slot travels `x 238 → 718` (`translateX 0 → 480`) over ≈700 ms with a 320 ms layer crossfade. **Both rows exist in both screens as separate DOM instances.** The HomeCloud copies are mounted from the start (at the destination x) and simply become visible. There is no extraction, no flight, no morph, no shared element. The y offset (`+7.8 px`) means even a naive "same row" reading fails.

Product Truth: `HOMECLOUD_PRODUCT_FREEZE_V1.0.md` L1145-1160 lists `Assets Documents ↔ HomeCloud File` as a **candidate for a future Cross-Module Integration phase**, explicitly *not* part of the freeze. So the relationship is **SUPPORTED + NOT YET IMPLEMENTED**, and the transition must be **EDITORIAL**, never a simulated tap.

---

## 19. HomeCloud Memories deep audit

### 19.1 What is on stage

`S10_step04` device text, in order:

```
HomeCloud                          26px / 700
Documentos · Recuerdos             13px / 500 · 13px / 600
Fotos                              11px / 600  (uppercase)
Cumpleaños                         16px / 600    20 ago       12px / 400
Vacaciones                         16px / 600    Ene 2026     12px / 400
Nota de voz                        16px / 500    Mamá · 0:42  13px / 400
Álbumes                             11px / 600  (uppercase)
Álbumes                             20px / 500    Cumpleaños · 24 fotos  13px / 400
```

Measured: photo cards `129.6×140.8` at `(745, 209.1)` and `(885.4, 209.1)`; thumbnails `98×62` layout → `105.8×67` visual (device `scale 1.08`).

### 19.2 The photos are CSS gradients

`.homecloud-photo-thumb` has exactly **one** sizing rule — `height: 62px` — and two colour rules:

```css
.homecloud-photo-thumb[data-memory='cumple']     { background: linear-gradient(140deg, #f0b27a 0%, #d97b3f 55%, #a34d24 100%); }
.homecloud-photo-thumb[data-memory='vacaciones'] { background: linear-gradient(140deg, #bcd6e8 0%, #7fa8c9 55%, #4a7699 100%); }
```

(`homecloud-screen.css:20-22`). There is **no** `data-cloud-tab` or `data-memory`-conditional sizing anywhere in the file.

**Two independent prohibitions:**
- `HOMECLOUD_PRODUCT_EXPERIENCE_FREEZE_V2.md` L555-567: *"No introducir: **gradients** / neon / random pastels / heavy shadows / scrapbook / polaroid / tape / sepia / vintage / decorative doodles / clones de Pinterest/Instagram/Google Photos/Drive."*
- NO-UI §5: *"Prohibido: … **gradients de 'IA'** …"*

A gradient swatch standing in for a photograph of a birthday is precisely the "decorative doodle / AI gradient" the product freeze forbids. It is also the visual opposite of the scene's thesis: the beat is about *irreplaceable* memories, and the screen shows two coloured rectangles.

### 19.3 The voice note

`Nota de voz · Mamá · 0:42` renders a play button and a **fake waveform** built from seven `<span>` elements with hard-coded heights `8, 14, 20, 12, 17, 9, 15` (`HomeCloudDemoScreen/index.tsx:53`).

**Capability truth:** `HOMECLOUD_PRODUCT_EXPERIENCE_FREEZE_V2.md` approves audio as a Memory (`roles: file | memory · audio no es tercer role`, L58-59; create menu `Audio`, L316; recorder `no fake waveform`, L334). Integration **blocks** audio at the client (`homecloudMemoryPicker.ts:52, 95, 113` — `mediaTypes: ['images','videos']`, error `'Solo podés agregar fotos o videos.'`), and the backend **allows** it (`…_memory_audio_support_v1_1.sql:19-26`). **Classification: `SUPPORTED + NOT IMPLEMENTED (client)`.**

**The rule conflict:** MASTER §7 E7 says verbatim *"No mostrar nota de voz como entidad V1"* and the master's **patched script** (§18) replaces the audio with *"una frase"*. The **delivered script** (L257-259) says *"o incluso un audio"*. The presentation drew the voice note — it followed the delivered script and violated the patched master. **This is a SCRIPT/MASTER CONFLICT, not a presentation defect** (§30, SI-02). The presentation should not be asked to un-draw it; the script and the master must be reconciled.

Note also that the target's recorder rule is `no fake waveform` — the presentation's hard-coded waveform bars violate the target's own constraint even if audio were in scope.

### 19.4 Albums

`Álbumes · Cumpleaños · 24 fotos` is a **single text row** (`homecloud-album-row`, `min-height 52px`). The target has an `ÁLBUMES` carousel with cover, title and count, an album list, and an album detail with a 3-column grid. Master §7 E6 requires entering the birthday album (cover, name, date, count, grid); §7 E8 requires exiting to a multi-album root. **Neither happens.**

### 19.5 The birthday callback

`Cumpleaños · 20 ago` exists. But:
- The Scene C plan is `Cumpleaños · Sábado`. The frozen Home date is `Domingo, 16 de agosto` (verified: 2026-08-16 **is** a Sunday). `Sábado` = **2026-08-22** (verified). `20 ago` = **2026-08-20**, which is a **Thursday** (verified).
- So the birthday memory is dated **two days before** the birthday the Plan announces. The callback lands on the wrong day.
- The plan is never named `Cumple de Juli` (NO-UI §18 canon) and never given `19:00`, so the callback has no shared identity beyond the word `Cumpleaños`.
- The album is never opened, so the callback is a label, not a return.

### 19.6 The tab switch has no motion

Measured across `S10_step03 → S10_step04` (rAF, 322 frames): the **first** sampled frame already has `data-step="4"`, zero `.homecloud-doc-row` elements and the photo thumbnails at their final `105.8×67`. There is **no crossfade, no tab-indicator travel, no stagger** — an instantaneous cut.

The target animates its domain switch: segmented thumb travel **280 ms** `cubic-bezier(0.22,1,0.36,1)` and label colour **200 ms** (measured, `components/controls.tsx`). The presentation's HomeCloud tab switch has **no animation at all**, which is the single largest motion deficit in the session.

---

## 20. Warranty vs Memory concept audit

**The spoken thesis (L263-269):** *"Porque una garantía tiene valor porque algún día podemos necesitarla. Pero un recuerdo puede tener valor justamente porque algún día ya no vamos a poder repetirlo. Por eso pensamos HomeCloud no solamente como almacenamiento sino como una memoria del hogar."*

**MASTER INTENT (§7 E9):** *"HomeCloud **permanece visible de fondo**, a exposición baja. No blur que elimine el módulo. En `una garantía tiene valor…`: aislar visualmente `Garantía PlayStation 5.pdf`. En `Pero un recuerdo…`: extraer una foto del cumpleaños. Composición: Garantía a un lado / foto al otro. En `ya no vamos a poder repetirlo`: garantía baja a ~55–60%; foto permanece 100%. **No escribir `documentos vs recuerdos`.**"* §7 E10: *"Ambos vuelven suavemente a HomeCloud… En `memoria del hogar`: bajar exposición suavemente y después fade completo. Negro absoluto."*

### Measured reality

| Required | Present? |
|---|---|
| HomeCloud visible at low exposure behind the thesis | ✘ HomeCloud is on screen only at `S10_step04`, the **last** state |
| `Garantía PlayStation 5.pdf` isolated | ✘ it is one row in a list, never isolated |
| A birthday photo extracted | ✘ the two gradient squares are never extracted |
| Warranty at 55–60 % / photo at 100 % | ✘ no such composition exists |
| The written contrast `documentos vs recuerdos` | ✔ correctly absent |
| Both return to HomeCloud, recognisable | ✘ the exit is a cross-mount to **pure black** |
| Exposure down, then fade, then black | ✘ HomeCloud goes 100 % → 0 % in one cross-mount |

**`S11_step00` is pure black** (measured: no device, no text, background `#000`). So the master's authorised black *is* reached — but the exposure-down of HomeCloud that must precede it is not performed. The device vanishes at full opacity.

### Verdict on the concept

**The screen does not earn the statement.** The thesis is the strongest idea in the entire film — it is the reason HomeCloud exists — and it has **zero** visual support and **zero** available states. The narration carries it alone, against a black background, which is the one thing the master explicitly did not want (*"No escribir `documentos vs recuerdos`"* — and by extension, no narration-only delivery of the contrast).

**Is it too decorative?** No — the opposite. The risk here is not sentimentality; it is that the emotional climax is delivered as a voiceover on black. The master's composition (warranty isolated / photo extracted / warranty dimmed) is **product UI doing the emotional work**, which is exactly the right register for a product keynote.

---

## 21. Scene E issue register

---

### **E-01 — The Assets detail is a document list: one of the target's five sections, with ~42 % of the device empty**

- **SCENE:** E
- **CURRENT STATE(S):** `S10_step02`
- **SCRIPT MOMENT:** L238-247
- **MASTER INTENT:** §9 E0 — *"Ficha mínima: **PlayStation 5** · Comprada: Mar 2024 · Garantía: estado/fecha · Mantenimiento: estado · Documentos: 3 archivos · imagen/icono del objeto. Campos extra solo si el futuro Assets Freeze los confirma."* §9 E1 — *"`cuándo se compró` → foco Comprada. `mantenimiento` → foco Mantenimiento. `garantía` → foco Garantía. **No tres zooms.**"*
- **CURRENT RUNTIME:** the detail is a hero (`P` tile `24 px`, `PlayStation 5` `22 px`, `Consola · Living` `13 px`) + one `11 px` section label + two `17 px` doc rows. Content ends at ≈y `350` of a `602 px` screen. **None of the master's four fields exists** (see §17.2 for the full measured text).
- **FIGMA TARGET:** five sections in a fixed order (`Detail.tsx:2`), with `PRÓXIMO` carrying next care and `HISTORIAL` carrying past care.
- **PRODUCT TRUTH / INTEGRATION:** V2.0 freezes the five-section order and **removes purchase date/price from the Asset Core** (§21, L345-356). Integration has **no Assets module**. **Classification: `SUPPORTED (target) + NOT YET IMPLEMENTED`.**
- **HUMAN WALKTHROUGH:** `HW-E-003` — *"lo único que pasa es que entra al Detail de PlayStation 5 y se ven documentos: garantía PlayStation 5, manual PS5"*; `HW-E-004` — *"la UI de Assets es un **detalle de documentos**, no una identidad + HomeCloud"*. Both **CONFIRMED**.
- **CLASSIFICATION:** PRODUCT-ANATOMY OMISSION + STAGE COMPOSITION (a mostly-empty device)
- **SEVERITY:** **HIGH**
- **VERDICT:** **REJECT the detail as built; REBUILD against the target's five sections.**
- **TARGET BEHAVIOR:** Implement, at minimum, `IDENTIDAD` (name, category, status) · `PERSONAS Y UBICACIÓN` (`Ahora con Tomi` / `Está en Living`) · `PRÓXIMO` (next care or the quiet `Nada pendiente`) · `DATOS Y DOCUMENTOS` (≤3 + `Ver toda la información`) · `HISTORIAL`. Do **not** add a purchase-date or price field (§17.4). Fill the empty 42 % — either with the sections or by raising the device scale (§25).
- **RATIONALE:** The master's own minimal spec has four fields; the presentation has zero. An Asset screen that is a document list is a file manager, which is HomeCloud's job, not Assets'.

---

### **E-02 — None of the three spoken causals has evidence: no purchase date, no maintenance, no warranty status**

- **SCENE:** E
- **CURRENT STATE(S):** `S01_step01`, `S10_step02`
- **SCRIPT MOMENT:** L238-241 *"nadie piensa demasiado en **cuándo se compró**, **si le toca mantenimiento** o **dónde quedó la garantía**."*
- **MASTER INTENT:** §9 E1 (above) — three focused fields, explicitly *"No tres zooms."*
- **CURRENT RUNTIME:** `S10_step01` focuses the PS5 **list row** (`.s10-assets-focus [data-asset='ps5']` gets `background: var(--home-brand-soft)` and a filled tile; siblings `0.55`; heading `0.6`). That is a **generic row highlight**, not a field focus. `S10_step02` shows no field corresponding to any of the three.
- **FIGMA TARGET:** `PRÓXIMO → Cambio de aceite / 14 octubre`; `DATOS Y DOCUMENTOS → Garantía · hasta enero de 2027 · 1 documento`.
- **PRODUCT TRUTH / INTEGRATION:** warranty = a `WARRANTY` **Record** with `until` (`types.ts:67, 134-140`); maintenance = a `Care Record` / `PRÓXIMO` entry; purchase date = **Finance-owned**, surfaced as a reference.
- **HUMAN WALKTHROUGH:** `HW-E-002` — *"se ilumina la Play. Hasta que empieza a andar mal, nadie piensa en cuándo se compró, si le toca mantenimiento, dónde quedó la garantía"*. **CONFIRMED.**
- **CLASSIFICATION:** NARRATIVE DEFECT — the scene's three named data points do not exist on screen
- **SEVERITY:** **HIGH**
- **VERDICT:** **REJECT.**
- **TARGET BEHAVIOR:** Three **local non-reflow emphases** on three real fields, in the master's order and without three zooms: `Comprada` (as a Finance reference) → `Mantenimiento` → `Garantía`. Each emphasis is a `100 → 108 → 100` local scale or an exposure change on that field only, per NO-UI §6.
- **RATIONALE:** The sentence enumerates three things. The screen shows none. The audience cannot infer a product capability from a row highlight.

---

### **E-03 — `Factura` is missing from the Assets detail and appears in HomeCloud as `Factura TV`, an unrelated object**

- **SCENE:** E
- **CURRENT STATE(S):** `S10_step02`, `S10_step03`
- **SCRIPT MOMENT:** L245-246 *"información como **la factura**, la garantía o el manual."*
- **MASTER INTENT:** §3 canon — `HomeCloud / Play | Factura, Garantía, Manual.` §7 E4 — *"Mostrar: Factura PlayStation 5; Garantía PlayStation 5; Manual PlayStation 5."*
- **CURRENT RUNTIME:** Assets detail = `Garantía PlayStation 5` + `Manual PS5` (2 rows). HomeCloud = `Garantía PlayStation 5` + `Manual PS5` + **`Factura TV`** (3 rows). The PS5 has no `Factura` anywhere; a `Factura` exists for a different asset.
- **FIGMA TARGET:** `DATOS Y DOCUMENTOS` merges record + doc into one row per object (`assets/ui.tsx:1117-1148`); the target's PS5 detail shows `Garantía PlayStation 5` and a loose `Factura de compra.pdf`.
- **PRODUCT TRUTH / INTEGRATION:** `File ↔ Asset` relations are frozen (V2.0 §22, L360-377); the File is canonical in HomeCloud. A `Factura` for the PS5 is therefore a legitimate relation — it is simply **not in the presentation's dataset**.
- **HUMAN WALKTHROUGH:** `HW-E-005` — *"ahí aparece 'garantía de PlayStation 5', 'manual PS5', y lo que yo aparecía y **factura TV**"*, flagged *"⚠ Posible desajuste… A verificar en runtime"*. **CONFIRMED and worse than the observer could see:** the mismatch is not a transcription error, it is the dataset.
- **CLASSIFICATION:** DATASET DEFECT + NARRATIVE DEFECT
- **SEVERITY:** **HIGH**
- **VERDICT:** **REJECT the dataset.**
- **TARGET BEHAVIOR:** Make the three documents consistent across both screens and consistent with the script: `Factura PlayStation 5` / `Garantía PlayStation 5` / `Manual PlayStation 5`. Remove `Factura TV` from this scene (it belongs to a different asset and its presence actively contradicts the narration).
- **RATIONALE:** The narration says "la factura, la garantía o el manual" of the Play. The screen shows two of the Play's and one of the TV's. The audience cannot complete the trio.

---

### **E-04 — The warranty-vs-memory thesis has no visual support and no available state**

- **SCENE:** E
- **CURRENT STATE(S):** `S10_step04` (last), `S10_step04 → S11_step00`
- **SCRIPT MOMENT:** L263-269
- **MASTER INTENT:** §7 E9/E10 (quoted in full in §20).
- **CURRENT RUNTIME:** `S10_step04` is the final S10 state. The exit is a cross-mount to `S11_step00`, which is **pure black** (measured). HomeCloud goes from 100 % presence to 0 % with **no intermediate frame at reduced exposure**. There is no isolation of `Garantía PlayStation 5.pdf`, no extraction of a birthday photo, no 55–60 % / 100 % composition.
- **FIGMA TARGET:** the target's `Información` sheet and album detail provide the surfaces from which such a composition could be built.
- **PRODUCT TRUTH / INTEGRATION:** `Garantía` is a frozen Record type; `photo`/`video` are frozen Memory types. The composition is therefore **SUPPORTED** by product truth — it is purely a presentation-construction gap.
- **HUMAN WALKTHROUGH:** `HW-E-009` — *"pero **en la presentación no pasa nada**"*, filed **BLOCKER candidato**; `HW-E-011` — *"lo único que aparece en [Home]Cloud"*. Both **CONFIRMED as BLOCKERs.**
- **CLASSIFICATION:** NARRATIVE DEFECT — the product thesis is delivered as a voiceover on black
- **SEVERITY:** **BLOCKER**
- **VERDICT:** **REJECT.** This is the most consequential finding in Scene E.
- **TARGET BEHAVIOR:** Add **at least two states** to `S10` (extend `stepCount` from 5 to 7, or convert `step03`/`step04` into a longer sequence). State A: HomeCloud at low exposure, `Garantía PlayStation 5.pdf` isolated on one side. State B: a birthday photo extracted on the other side; warranty to ~55–60 %, photo at 100 %. Then both return to HomeCloud, exposure lowers smoothly, fade to black. Do **not** write `documentos vs recuerdos`.
- **RATIONALE:** The thesis is the reason the product exists. Delivering it as a voiceover on a black screen wastes the one moment the film has earned.

---

### **E-05 — HomeCloud Memories uses CSS gradients as photo stand-ins, which the product freeze explicitly forbids**

- **SCENE:** E
- **CURRENT STATE(S):** `S10_step04`
- **SCRIPT MOMENT:** L255-259 *"pueden quedar fotos, una frase, o incluso un audio."*
- **MASTER INTENT:** §2.3 — *"UI real"*; §7 E7 — *"foto → scale/foco; video → foco en thumbnail con play; frase → abrir/mostrar caption."* NO-UI §5 — *"Prohibido: … gradients de 'IA'."*
- **CURRENT RUNTIME:** `.homecloud-photo-thumb` = `linear-gradient(140deg, …)` for both memories (`homecloud-screen.css:21-22`). Measured `98×62` layout / `105.8×67` visual.
- **FIGMA TARGET:** album covers and memory tiles are **real media**; the target's empty album cover is a `Vacío` label on `#FFE3DA` (`HomeCloud.tsx:1789-1791`), not a gradient.
- **PRODUCT TRUTH / INTEGRATION:** `HOMECLOUD_PRODUCT_EXPERIENCE_FREEZE_V2.md` L555-567 lists `gradients` first among *"No introducer"*. Integration has no viewer and no image dependency, so real photos cannot be rendered in the current app — but the **presentation** is not the app, and the freeze's rule applies to the presentation's visual language.
- **HUMAN WALKTHROUGH:** `HW-E-010** — *"Hay una lista de recuerdos, pero es **un listado plano**"*. **CONFIRMED.**
- **CLASSIFICATION:** PRODUCT-FREEZE VIOLATION (visual language) + FAKE VISUAL
- **SEVERITY:** **HIGH**
- **VERDICT:** **REJECT the gradients.**
- **TARGET BEHAVIOR:** Use real photographs (the birthday is the film's own subject — the presentation already has the family's visual world). If real media is impossible, use the target's own empty-state treatment (a labelled placeholder) rather than a decorative gradient. A gradient reads as "AI-generated placeholder", which is the one signal the brief's §7 quality standard exists to eliminate.
- **RATIONALE:** The beat is about *irreplaceable* memories. A coloured rectangle is the visual opposite of irreplaceable.

---

### **E-06 — `Nota de voz` is drawn although the master forbids it and the product freeze's own recorder rule is violated**

- **SCENE:** E
- **CURRENT STATE(S):** `S10_step04`
- **SCRIPT MOMENT:** L257-259 *"pueden quedar fotos, una frase, o incluso un audio que queremos conservar."*
- **MASTER INTENT:** §7 E7 — *"La copy final debe respetar HomeCloud V1: `pueden quedar fotos, videos o incluso una frase que queremos conservar junto a ese recuerdo.` … **No mostrar nota de voz como entidad V1.**"* §18 patched script — *"fotos, videos, o incluso una frase."*
- **CURRENT RUNTIME:** `Nota de voz · Mamá · 0:42` with a play button and a **hard-coded seven-bar waveform** (`HomeCloudDemoScreen/index.tsx:50-59`).
- **FIGMA TARGET:** the target's create menu offers `Audio / Elegir un audio existente` — i.e. **choosing** an existing audio, not recording one. The target's recorder spec says `no fake waveform` (`viewers.tsx:248-249`; Experience Freeze V2 L334).
- **PRODUCT TRUTH / INTEGRATION:** audio is **SUPPORTED** by `HOMECLOUD_PRODUCT_EXPERIENCE_FREEZE_V2` (FROZEN) and **NOT IMPLEMENTED** at the Integration client (hard-blocked at `homecloudMemoryPicker.ts:52,95,113`; no `expo-audio`). Backend allows `audio/*`.
- **HUMAN WALKTHROUGH:** `HW-E-007** — *"Los **tres** tipos (foto / frase / audio) deben verse"*. **REJECTED as a presentation defect** — the observation is right that the three types should be visible, but the *rule* it cites (audio is unsupported) is stale: the current product freeze approves audio. The defect is in the **script/master pair**, not the drawing.
- **CLASSIFICATION:** SCRIPT/MASTER CONFLICT + TARGET-CONSTRAINT VIOLATION (fake waveform)
- **SEVERITY:** **MEDIUM**
- **VERDICT:** **DO NOT change the drawing on the presentation's authority. ESCALATE to the script owner.** The delivered script says "un audio"; the master's patched script says "una frase"; the master's §7 E7 says do not show a voice note. These cannot all hold. **Recommendation:** adopt the master's patched copy (`fotos, videos, o incluso una frase`) — it is product-true for V1, it removes the fake waveform, and it keeps the three-type structure the observer asked for. If audio is kept, the waveform must go (the target forbids it) and the handoff must flag `NOT IMPLEMENTED (client)`.
- **RATIONALE:** The presentation followed the delivered script. Punishing it for that would punish the wrong party.

---

### **E-07 — Memories is a flat list: no album is entered, and `Álbumes` is a single text row**

- **SCENE:** E
- **CURRENT STATE(S):** `S10_step04`
- **SCRIPT MOMENT:** L253-255 (the callback), L261 *"HomeCloud también puede reunir esos recuerdos en álbumes."*
- **MASTER INTENT:** §7 E6 — *"entrar a Album Detail del cumpleaños… Album Detail: portada; nombre; fecha; cantidad de fotos/videos; grid protagonista."* §7 E8 — *"salir del album hacia Recuerdos Root / Todos los álbumes. Mostrar varios álbumes."*
- **CURRENT RUNTIME:** `Fotos` = two cards (`Cumpleaños · 20 ago`, `Vacaciones · Ene 2026`); `Nota de voz` = one row; `Álbumes` = **one row** reading `Álbumes · Cumpleaños · 24 fotos`. No album is opened; no grid; no multi-album root.
- **FIGMA TARGET:** `ÁLBUMES` carousel (cover + title + count), album list, album detail with optional 16:9 cover and a 3-column grid.
- **PRODUCT TRUTH / INTEGRATION:** Albums are **CORE of Memories** (Experience Freeze V2 L237); `Memory 0..N Albums` is a frozen invariant. Integration's backend is fully built (`homecloud_albums`, `homecloud_album_items`, `GET /api/homecloud/albums/...`); there is **no read UI**. **Classification: `SUPPORTED + PARTIAL (write-only)`.**
- **HUMAN WALKTHROUGH:** `HW-E-008** — *"Álbumes deben verse como **agrupación**"*; `HW-E-010** — *"es **un listado plano**"*. Both **CONFIRMED.**
- **CLASSIFICATION:** NARRATIVE DEFECT + PRODUCT-ANATOMY OMISSION
- **SEVERITY:** **HIGH**
- **VERDICT:** **REJECT the flat list.**
- **TARGET BEHAVIOR:** Enter the birthday album (cover, name, date, photo count, grid) at the callback beat, then exit to a multi-album root at `L261`. This is also the **only** place the E-B7 thesis composition can live — the album detail is where a photo can be extracted.
- **RATIONALE:** "Reunir esos recuerdos en álbumes" is the sentence that turns a file list into a memory. Without an album, HomeCloud is still a file list.

---

### **E-08 — The birthday callback is on the wrong date and is never named**

- **SCENE:** E
- **CURRENT STATE(S):** `S10_step04` (against `S08_step00`)
- **SCRIPT MOMENT:** L253-255 *"Volvamos al cumpleaños."*
- **MASTER INTENT:** §3 canon — `Cumpleaños | sábado; Event → Plan → tareas/preparación/compras → recuerdos en HomeCloud.` §2.5 — *"Cuando el mismo dato reaparece, debe ser el mismo objeto visual."* NO-UI §18 — `Cumple de Juli · Sábado · 19:00`.
- **CURRENT RUNTIME:** the memory reads `Cumpleaños · 20 ago`. The plan reads `Cumpleaños · Sábado`. The frozen Home date is `Domingo, 16 de agosto` (2026-08-16 = Sunday, verified). Therefore `Sábado` = 2026-08-22 and `20 ago` = **2026-08-20 = Thursday** (verified). The callback is **two days early**. Neither screen names Juli nor shows `19:00`.
- **FIGMA TARGET:** the target's album detail carries name + date + count.
- **PRODUCT TRUTH / INTEGRATION:** `HOMECLOUD_PRODUCT_FREEZE_V1.0.md` canonical demo album is `Cumple de Gaby · 22 ago · 93` (§17) — internally inconsistent with `Cumple de 4 de Gaby · 87 fotos · 6 videos` (§22). The presentation's `Cumpleaños` matches neither.
- **HUMAN WALKTHROUGH:** `HW-E-006** — *"El 'volvamos al cumpleaños' es un **callback** al Plan de la Escena C. ¿Se muestra el callback?"* — no deviation registered. **PARTIALLY CONFIRMED:** the callback exists as a label but is not demonstrably the same object.
- **CLASSIFICATION:** DATA CONTRADICTION + CONTINUITY DEFECT
- **SEVERITY:** **MEDIUM**
- **VERDICT:** **RECONCILE the dataset.**
- **TARGET BEHAVIOR:** One birthday object across the whole film: `Cumple de Juli · Sábado 22 de agosto · 19:00`. The Plan card, the calendar Event, and the HomeCloud album must all carry it. Fix `20 ago` → `22 ago` (or make the memory date relative to a fixed "today" that matches).
- **RATIONALE:** The callback is the film's strongest continuity device. A two-day error silently breaks it.

---

### **E-09 — The Assets list contains three objects that are not in the target dataset and never recur**

- **SCENE:** E
- **CURRENT STATE(S):** `S10_step00`
- **SCRIPT MOMENT:** L234-236
- **MASTER INTENT:** §9 E0 — *"Para la presentación se usa una UI provisional mínima, coherente con HomePlus, **sin inventar un dashboard entero**."*
- **CURRENT RUNTIME:** `PlayStation 5 · Consola · Living`, `Heladera · Cocina`, `TV · Living`, `Aire acondicionado · Dormitorio` (`assetsData.ts:7-12`). The target's dataset is `Casa Córdoba`, `Generador eléctrico industrial`, `Impresora HP`, `Lámpara del living`, `Moto G`, `Notebook de trabajo`, `PlayStation 5`, `Taladro Bosch`, `Toby`, `Toyota Corolla`.
- **FIGMA TARGET:** as above.
- **PRODUCT TRUTH / INTEGRATION:** V2.0 profiles are `STANDARD / VEHICLE / PET / PROPERTY`; `Aire acondicionado` and `TV` are not in the target dataset. `Heladera` **is** in the film — it is the opening's chaos object (Session 1 A-06) — so listing it as a settled Asset is a **missed callback**, not an error.
- **HUMAN WALKTHROUGH:** no hypothesis.
- **CLASSIFICATION:** DATASET DIVERGENCE + MISSED CONTINUITY
- **SEVERITY:** **MEDIUM**
- **VERDICT:** **REVISE.**
- **TARGET BEHAVIOR:** Use the target's dataset. At minimum keep `PlayStation 5` and add one or two target objects (`Toyota Corolla`, `Taladro Bosch`, `Impresora HP`). Consider whether `Heladera` should appear as the opening's callback — if it does, it must be *earned* (a beat that says "and now it has a home"), not a bare row.
- **RATIONALE:** A list of invented objects next to one real one reads as filler, and it wastes the one callback the opening set up.

---

### **E-10 — The Assets → HomeCloud transition is a 480 px device slide; the two PS5 documents are separate DOM instances at different y**

- **SCENE:** E
- **CURRENT STATE(S):** `S10_step02 → S10_step03`
- **SCRIPT MOMENT:** L243-247
- **MASTER INTENT:** §9 E3 — *"En `HomeCloud permite conservar…`: foco en `Documentos`. Hasta que exista relación navegable real, transición **editorial**. Assets baja; Documentos permanece; aparece HomeCloud."* §2.4 — *"Assets Documents → HomeCloud Archivos mientras la integración cross-module no esté cerrada."*
- **CURRENT RUNTIME:** measured (§18.4). Slot `x 238 → 718` over ≈700 ms; layers crossfade 320 ms. `Garantía PlayStation 5` exists **twice**: at `(266.1, 202.4)` in Assets and `(746.1, 210.2)` in HomeCloud. `Manual PS5` at `(266.1, 288.9)` and `(746.1, 297.2)`. The HomeCloud copies are mounted from the start at the destination x. **No extraction, no flight, no morph.**
- **FIGMA TARGET:** n/a — transition grammar.
- **PRODUCT TRUTH / INTEGRATION:** `HOMECLOUD_PRODUCT_FREEZE_V1.0.md` L1145-1160 lists `Assets Documents ↔ HomeCloud File` as a **candidate for a future Cross-Module Integration phase**. So the relationship is **SUPPORTED + NOT YET IMPLEMENTED**, and the transition **must be editorial**, never a simulated tap.
- **HUMAN WALKTHROUGH:** no hypothesis.
- **CLASSIFICATION:** MOTION DEFECT — DEVICE_TRANSITION where SHARED_ELEMENT was specified
- **SEVERITY:** **MEDIUM**
- **VERDICT:** **REJECT the device slide; KEEP the editorial intent.**
- **TARGET BEHAVIOR:** Per the master: *"Assets baja; Documentos permanece; aparece HomeCloud."* Concretely — Assets lowers exposure; the `Documentos` section (or the two PS5 rows) **stays put** as the anchor; HomeCloud fades up around it. The two rows must be **one** object that changes context, not two copies. If a device move is kept for stage reasons, it must be declared DEVICE_TRANSITION and the rows must still read as the same object (same y, same width, same type size).
- **RATIONALE:** The master's own words are "Assets baja; Documentos permanece". The current transition does the opposite: Assets leaves and Documentos is replaced by a lookalike.

---

### **E-11 — POSITIVE — `S10` is the only scene in the deck that raises the device above 1.00**

- **SCENE:** E
- **CURRENT STATE(S):** `S10_step00` … `S10_step04`
- **SCRIPT MOMENT:** whole scene
- **MASTER INTENT:** NO-UI §7 — *"Primary phone: alto visual recomendado: `820–880 px`."*
- **CURRENT RUNTIME:** `S10` uses `<PhoneFrame scale={1.08}>` (`S10AssetsHomeCloud/index.tsx:15`) → device visual `324×669.6`, the largest in the session. `S08`/`S09` are `300×620` at `scale 1.00`.
- **CLASSIFICATION:** POSITIVE — correct instinct
- **SEVERITY:** **POSITIVE**
- **VERDICT:** **KEEP the instinct; CORRECT the magnitude** (see §25).
- **RATIONALE:** The team identified that this scene's content is denser and acted on it. The direction is right; the size is 71–76 % of the recommendation.

---

### **E-12 — POSITIVE — the `Documentos | Recuerdos` domain switch and the HomeCloud section structure are faithful**

- **SCENE:** E
- **CURRENT STATE(S):** `S10_step03`, `S10_step04`
- **SCRIPT MOMENT:** L249-261
- **MASTER INTENT:** §9 E3/E5.
- **CURRENT RUNTIME:** the domain switch reproduces the target's control (`Documentos | Recuerdos`, pill track, selected state in brand). The section structure (`Recientes` / `Fotos` / `Álbumes`) matches the target's grouping vocabulary. The `PDF` tile is a legitimate stage simplification of the target's type-icon tile.
- **CLASSIFICATION:** POSITIVE
- **SEVERITY:** **POSITIVE**
- **VERDICT:** **KEEP AS-IS.**
- **RATIONALE:** This is recognisably HomeCloud, built from the target's own vocabulary.

---

### **E-13 — The Scene E exit destroys HomeCloud at full opacity instead of lowering exposure first**

- **SCENE:** E
- **CURRENT STATE(S):** `S10_step04 → S11_step00`
- **SCRIPT MOMENT:** L268-269
- **MASTER INTENT:** §7 E10 — *"Ambos vuelven suavemente a HomeCloud. La UI HomeCloud sigue reconocible. En `memoria del hogar`: **bajar exposición suavemente y después fade completo.** Negro absoluto."*
- **CURRENT RUNTIME:** `S11_step00` is **pure black** (measured: no device, no text). HomeCloud goes from 100 % presence to 0 % in a single cross-mount. There is no intermediate frame at reduced exposure and no fade.
- **CLASSIFICATION:** MOTION DEFECT — the authorised black is reached without the authorised exposure-down
- **SEVERITY:** **MEDIUM**
- **VERDICT:** **RECOMPOSE the exit.**
- **TARGET BEHAVIOR:** Hold HomeCloud at `S10_step04`; deliver the thesis composition (E-04); then lower HomeCloud's exposure smoothly over 400–600 ms while the `memoria del hogar` idea is spoken; then fade to black. The black is correct — the path to it is not.
- **RATIONALE:** The master's black is earned by a visible withdrawal of the product. A hard cut to black reads as a technical cut, not an ending.

---

## 22. Scene E positives

- **KEEP AS-IS:**
  - The `Documentos | Recuerdos` domain switch and the HomeCloud section vocabulary (E-12).
  - The `1.08` device scale instinct (E-11).
  - The `PDF` tile vocabulary shared with Assets and Inventory.
  - The Assets **list** anatomy (heading + bordered card + rows + shell nav) — it is a recognisable module surface.
  - The decision **not** to write `documentos vs recuerdos` on screen.
- **KEEP CONCEPT / RECOMPOSE EXECUTION:**
  - The birthday callback as a concept (E-08) — it must be made real, not removed.
  - The `Álbumes` row as the marker of where albums should be (E-07).
  - The `Nota de voz` as a marker that audio is a product direction (E-06) — pending the script decision.
- **REPLACE:**
  - The gradient photo stand-ins (E-05).
  - The flat Memories list (E-07).
  - The two-document Assets detail (E-01, E-03).
  - The device-slide transitions (E-10, and C-04).

---

## 23. Scene E target choreography

**CURRENT:** `S10_step00` (Assets list) → `step01` (PS5 row focus) → `step02` (Assets detail: 2 docs) → `step03` (device slides right → HomeCloud: 3 docs) → `step04` (HomeCloud Recuerdos: 2 gradients + voice + album row) → cross-mount to black.

| Beat | CURRENT | TARGET | ACTION |
|---|---|---|---|
| E-B1 (the Play arrives) | Assets list, no Finance origin | the PS5 **movement row** crosses from Finance and becomes the Asset | **REPLACE** |
| E-B2 (three forgotten things) | generic row highlight | three field emphases: purchase ref / maintenance / warranty | **REPLACE** |
| E-B3 (identity + 3 documents) | hero + 2 docs, no Factura | full identity + `Factura / Garantía / Manual` | **RECOMPOSE** |
| E-B4 (documents → history) | device slide + crossfade | Assets lowers; `Documentos` stays; HomeCloud fades up | **RECOMPOSE** |
| E-B5 (the callback) | 2 gradient cards, wrong date, never opened | enter the birthday album (cover/name/date/grid) | **REPLACE** |
| E-B6 (albums) | one text row | exit to a multi-album root | **REPLACE** |
| E-B7 (warranty vs memory) | **none** | isolate `Garantía PS5.pdf` / extract a birthday photo / warranty 55–60 % | **REPLACE** |
| E-B8 (memoria del hogar) | cross-mount to black | both return to HomeCloud → exposure down → fade → black | **RECOMPOSE** |

**Resulting Scene E shape:** Assets list → PS5 detail (five sections, three field emphases) → `Documentos` holds while HomeCloud fades up → the three PS5 documents → the birthday album opens (the callback, correct date) → exit to the album root → **HomeCloud stays at low exposure** → the warranty/memory composition → exposure down → black.

**What remains / moves / dims / becomes the bridge:**
- **Remains:** the HomeCloud shell and the PS5 document set across `E-B3…E-B7`.
- **Moves:** the PS5 object (Finance movement → Asset) and, at `E-B7`, the warranty row and one birthday photo.
- **Dims:** the non-relevant Assets sections at `E-B2`; the `ok` documents at `E-B7`; all of HomeCloud at `E-B8`.
- **Becomes the bridge:** the **PS5 object** (into HomeCloud) and then the **warranty document** (into the thesis composition).

---

## 24. Shared-element continuity C→D→E

| Object | Current behavior | Target behavior | Transition family | Reason |
|---|---|---|---|---|
| `birthday.event` | **PARTIAL.** `Cumpleaños · Sábado` card exists in `S08_step00`; never an Event, no `19:00`, no owner, no calendar relation | **COMPLETE.** `Cumple de Juli · Sábado · 19:00` as a Plan **with** its linked Event | **SHARED_ELEMENT** + **REAL_NAV** (Planner) | The scene's first sentence is "es un evento"; the Event must be visible for the Plan to be a contrast |
| `shopping.missingItem` | **ABSENT.** The `Café · Sin stock` row is clipped and never leaves Inventory | **COMPLETE.** The OUT row becomes a Shopping List / Planner row | **SHARED_ELEMENT** | The scene's third clause depends on it; it is also the only object that could carry into Finance |
| `shopping.purchase.supermarket` | **ABSENT.** The purchase is never created | **COMPLETE.** The purchase completes and reappears as `Supermercado · $48.720` | **SHARED_ELEMENT** | Master §8 D0; the C→D handoff has no referent without it |
| `finance.ps5Movement` | **ABSENT.** No movement row exists anywhere in the presentation's Finance | **COMPLETE.** A typed `EXPENSE` row `PlayStation 5 · Mar 2024 · $580.000` in `Movimientos` | **SHARED_ELEMENT** (extraction, **not** a field) | Master §8 D5; the Asset has no purchase field in Product Truth, so the row is the only legal carrier |
| `asset.ps5.documents` | **PARTIAL.** `Garantía PlayStation 5` and `Manual PS5` exist in **two DOM instances** at different y (`202.4/288.9` → `210.2/297.2`) | **COMPLETE.** One object that changes context | **SHARED_ELEMENT** | Master §9 E3: *"Assets baja; Documentos permanece"* |
| `birthday.memory` | **PARTIAL.** `Cumpleaños · 20 ago` exists but on the **wrong date** and never opened | **COMPLETE.** The birthday album, correct date, entered | **SHARED_ELEMENT** + **REAL_NAV** (HomeCloud) | The callback is the film's strongest continuity device |
| `warranty.ps5` | **PARTIAL.** `Garantía PlayStation 5` exists in Assets and HomeCloud; never isolated | **COMPLETE.** Isolated at `E-B7`, dimmed to 55–60 % | **SHARED_ELEMENT** (extraction) | Master §7 E9; the product thesis depends on it |

**Summary:** of the seven mandatory shared elements, **zero** are currently complete. Two are partial in a way that could be repaired by a dataset change (`birthday.memory`, `asset.ps5.documents`), two are partial in a way that requires new construction (`birthday.event`, `warranty.ps5`), and three are **absent** (`shopping.missingItem`, `shopping.purchase.supermarket`, `finance.ps5Movement`). The three absent ones are exactly the three that carry the narrative across module boundaries.

---

## 25. UI enlargement audit

### 25.1 The three facts Session 1 established, and what they mean here

| Fact (S1 §5.1) | Value | Consequence for C/D/E |
|---|---|---|
| `.phone-frame` layout is **constant** at `298×618` and `.phone-frame-screen` at `282×602` in all 66 device-bearing states | confirmed again this session | The app's own layout never changes. Every "enlargement" is a `transform` on the device or a mutation **inside** the app. |
| Three device sizes exist, produced by `--phone-scale` | `0.96` (S01–S03) · `1.00` (S04–S09) · `1.08` (S10, S15–S17) | **S08 and S09 — the two densest scenes in the session — sit at the smallest scale, 1.00.** S10, the least dense, gets the only enlargement. The allocation is inverted. |
| **No local visual focus zoom exists anywhere** | max non-stage transform scale = `1.00` for S08/S09, `1.08` for S10 (the device itself) | **Scenes C and D have no focus mechanism at all.** Their entire emphasis vocabulary is `opacity`. |

### 25.2 Correction to Session 1 §5.4 — the "HomeCloud thumbnails 40×40 → 98×62" measurement is an artefact

Session 1 §5.4 recorded `.homecloud-photo-thumb` changing `40×40 → 98×62` at `S10_step03→04` and `.homecloud-photo` `248×81 → 118×128`. **This session measured the source and the transition and the finding does not hold:**

- `.homecloud-photo-thumb` has **exactly one** sizing rule in the entire stylesheet: `height: 62px` (`homecloud-screen.css:20`). There is **no** width rule, **no** `[data-cloud-tab]` conditional, and **no** `[data-memory]` sizing — only two `background` gradients (`:21-22`).
- The `40×40` figure is the **mounted-hidden collapsed box**: the HomeCloud layer is mounted from `S10_step00` with `visibility: hidden`, and a hidden flex child collapses.
- The `98×62` figure is the **settled layout** size. Converted to visual pixels by the device's own `1.08` scale: `98 × 1.08 = 105.84`, `62 × 1.08 = 66.96` — which is exactly what this session measured (`105.8×67`).
- The transition itself is **instantaneous** (§19.6): the first sampled frame already has the thumbnails at final size.

**Verdict: there is no authored thumbnail enlargement in `S10`.** Session 1's row is a measurement artefact produced by comparing a hidden collapsed box against a settled box and then applying the device scale. **S10 has no enlargement technique at all** — which is itself a finding (see 25.4).

### 25.3 State-by-state: current technique, verdict, recommended technique

| States | Current technique | Measured evidence | Verdict | Recommended stage technique |
|---|---|---|---|---|
| `S08_step00`–`step02` (Plan) | none — `scale 1.00`, opacity only | max non-stage transform `1.0`; step opacities `1 / 0.55 / 1` | **REJECT** as a focus tool (opacity is not enlargement) | **DEVICE SCALE** to `1.15–1.20` for the whole scene, or **CAMERA/CROP** on the plan card |
| `S08_step03` (Inventory, entering) | none | `scale 1.00`; card `248×229` client vs `248×270` scroll | **REJECT** — the clip is the defect | **DEVICE SCALE** + a list region tall enough for all rows (C-01) |
| `S08_step04` (Inventory, "focus") | **LAYOUT SIZE MUTATION** — type `19→21px`, `12→13.5px`, `11→12px`; row `62→64px`; card `scrollHeight 270→284` | **instantaneous** (already complete at `t=10.3 ms`); clip worsens `+41→+60 px` | **REJECT** | **SELECTIVE EXPOSURE** (dim non-relevant rows, no geometry change) + **LOCAL NON-REFLOW EMPHASIS** on the OUT row (keep the 4 px brand bar, drop the type growth) |
| `S09_step00`–`step04` (Finance) | **none** | `scale 1.00`; device-text signature identical across all 5 states; smallest app text `11 px` | **REJECT** — the densest scene has the smallest device and no focus | **DEVICE SCALE** to `1.15–1.20`. This single change takes the `11 px` section labels from `16.5 px` to `18.7–19.6 px` projected and the `29 px` balance from `43.5 px` to `49.9–52.7 px` projected, and makes the `17 px` row titles cross the `20 px` readability floor |
| `S10_step00`–`step02` (Assets) | **WHOLE DEVICE SCALE** `1.08` | device `324×669.6`; Assets detail ~42 % empty | **PARTIAL** — right tool, wrong magnitude, and it leaves the detail half-empty | **DEVICE SCALE** to `1.15–1.20` **and** fill the detail with the target's five sections (E-01) |
| `S10_step03` (HomeCloud Documentos) | none (inherits `1.08`) | 3 doc rows, `18 px` titles | **KEEP** | **KEEP** |
| `S10_step04` (HomeCloud Recuerdos) | **none** — and the tab switch has **no motion** | thumbnails fixed `98×62` layout; instantaneous cut | **REJECT** | **DEVICE SCALE** `1.15–1.20` + the target's `280 ms` segmented-thumb travel for the tab switch |

### 25.4 The constraint set, stated once

1. **Do not resize the product's rows or type to signal state.** The target communicates state with tonal surfaces, badges and copy — never with font-size. `S08_step04` is the one place the presentation does this, and it is the one place the clip gets worse.
2. **Do not add a fake balance or a fake figure.** The target's money type is a closed set (`24/30`, `18/24`, `14/20`, all `tabular-nums`) on a transparent surface, coloured by verdict.
3. **Do not invent a device scale per scene as a substitute for composition.** `S10`'s `1.08` is fine; using scale to paper over an empty Assets detail is not.
4. **The device should be `820–880 px` tall on stage** (NO-UI §7). At `1.15–1.20` on a `620 px` base, the presentation reaches `713–744 px`; at `1.35` it reaches `837 px`. **Recommendation: `1.20` for S08/S09 (dense) and `1.15` for S10 (less dense), or a single `1.20` across all three if operationally simpler.**
5. **Every emphasis must be visible as a change.** An instantaneous layout mutation is not an emphasis; it is a jump cut.

---

## 26. Motion audit C–E

### 26.1 Declared vocabulary vs applied vocabulary

| Declared (S1 §4.1) | Applied in C/D/E |
|---|---|
| `.motion-enter` / `.motion-exit` / `.motion-replace` / `.motion-accumulate` / `.motion-reframe` | `.motion-replace` (320 ms) for the S08/S10 layer crossfades; `.motion-reframe` (420 ms) for the 16 px device settle on scene entry; `--motion-spatial-wipe-duration` (500 ms) for the 480 px device slides |
| `.motion-spatial-wipe` | the S08 and S10 device slides |
| `.motion-blackout` | **not used** in C/D/E (correctly — no black is authorised inside these scenes) |
| `prefers-reduced-motion` block | present in `index.css`; **not exercised** in this audit (S1 G7) |

**Note on S1 §4.2's "still running" wording.** S1 recorded `getAnimations().length === 2` at the 500 ms sample for `S09_step04→S10_step00` and `S14_step04→S15_step00`. This session re-measured and the count of 2 is **two `finished`, `fill-mode: both` `attention-enter` animations on the `.ambient-glow` elements** (`index.css:71-82`; `AmbientGlow.tsx:31`). A finished animation with `both` fill remains in `getAnimations()` until removed. **These are not motion in progress.** S1's wording is imprecise; the underlying fact (the count) is correct.

### 26.2 Transition-by-transition

| Transition | Family | Measured | Verdict |
|---|---|---|---|
| `S08_step02 → step03` (Plan → Inventory) | **DEVICE_TRANSITION** + layer crossfade | slot `translateX 0 → 480` over ≈540 ms; layers crossfade 320 ms; **plan-step opacities constant at `1,1,1` throughout**; question `1 → 0` inside 420 ms | **REJECT** — no shared element; the bridge task gets no treatment (C-04) |
| `S08_step03 → step04` (Inventory "focus") | **none** | already complete at `t = 10.3 ms`; `anims = 8` are all ambient | **REJECT** — a hard cut, not an emphasis (C-06) |
| `S08_step04 → S09_step00` (Inventory → Finance) | **cross-mount** | Finance fully rendered at `t = 9.6 ms`; only a 16 px `y` settle | **REJECT** — no purchase, no shared element (C-11) |
| `S09_step00 → step04` (internal) | **stage text only** | device signature identical; four questions `0 → 1 → 0.45` | **REJECT** — the device never changes (D-01, D-02) |
| `S09_step04 → S10_step00` (Finance → Assets) | **cross-mount** | `finHero` absent at every frame; Assets fully rendered at `t = 22.3 ms`; device `y 41 → 25`, scale `1.00 → 1.08` | **REJECT** — no PS5 object survives (D-09) |
| `S10_step02 → step03` (Assets → HomeCloud) | **DEVICE_TRANSITION** + layer crossfade | slot `x 238 → 718` over ≈700 ms; layers crossfade 320 ms; **both PS5 doc rows present in both layers at different y** | **REJECT** — two DOM instances, no extraction (E-10) |
| `S10_step03 → step04` (Documentos → Recuerdos) | **none** | first sampled frame already at `data-step=4`; zero doc rows; thumbnails at final size | **REJECT** — instantaneous; the target animates this in 280 ms (E-06, §19.6) |
| `S10_step04 → S11_step00` (exit) | **cross-mount** | `S11_step00` pure black; HomeCloud `100 % → 0 %` | **REJECT** — no exposure-down (E-13) |

### 26.3 Motion that communicates vs motion that merely moves

**Communicates (keep):**
- `S08_step01` selective exposure — a real semantic emphasis, token-based, invisible as a "technique".
- The `S08`/`S10` layer crossfades — they are honest about being a surface change.
- The `S10` device scale change `1.00 → 1.08` — a real, visible, semantic difference.

**Merely moves (reject or recompose):**
- The two 480 px device slides. Both pretend to be navigation the product does not have, and both discard the one object that should have survived.
- The `S08_step03→04` layout mutation. It moves nothing; it changes size instantaneously, which reads as a cut.
- The four S09 question fades. They are the only motion in the scene and they carry no product information.
- The `S10_step03→04` tab switch. It does not move at all.

### 26.4 Motion findings, ranked

1. **No transition in C/D/E carries a semantic object.** Eight transitions, zero shared elements. This is the root cause of C-04, C-11, D-09 and E-10.
2. **Two transitions have no motion at all** (`S08_step03→04`, `S10_step03→04`) at the exact moments the narration asks for emphasis.
3. **The one correct emphasis in the session** (`S08_step01`) is applied one state too early and then dropped.
4. **The scene exits are cross-mounts to black** without the exposure-down the master requires.
5. **Pacing is not the problem.** The durations that do exist (320 ms crossfade, 500 ms slide, 420 ms reframe) are all inside NO-UI §6's `state transition 380–520 ms` / `shared transform 520–760 ms` bands. The problem is *what* moves, not *how long*.

---

## 27. Human hypothesis adjudication

The stale `S09`/`S10` coordinate is corrected internally throughout: **S09 = Finance, S10 = Assets / HomeCloud**. Original wording is preserved verbatim.

### 27.1 HW-C

| ID | Original observation (verbatim) | Adjudication | Basis |
|---|---|---|---|
| **HW-C-001** | *"aparece un teléfono en Planes con un plan llamado 'cumpleaños': repartir tareas, preparar cosas, comprar lo que falta"* — *"El plan se presenta como **4 líneas de texto**, no como un plan con estructura"* | **CONFIRMED** | `plannerData.ts:22-29` renders exactly those three strings as three `19 px` rows. Zero of the six canon tasks. Reinforced by C-02 and C-07. |
| **HW-C-002** | *"La idea no es que sea así, sino que **aparezcan tareas reales**, que aparezcan ahí **vinculados con lo mismo**, con el mismo frente de Planes"* | **CONFIRMED** | No assignee, no due, no event link, no milestone. Product Truth L49-56 requires `TASKS / EVENTS / MEASUREMENTS`. |
| **HW-C-003** | *"de esa tarea **nace un concepto donde se le baja la exposición a todo el resto**, pero 'comprar lo que falta', esa tarea en específico, **no se debería bajar el exposure**… Entonces '¿qué falta en la casa?' y eso **deberían estar con una exposición normal**"* | **CONFIRMED** | Measured: `step01` correct (`0.55/0.55/1.00`, heading `0.6`), `step02` inverted (all steps `1.00`, heading `1.00`, whole device `0.6`). The observation is exact. |
| **HW-C-004** | *"el teléfono se mueve hacia la derecha, aparece el inventario, pero **la interacción y animación del inventario no tiene ningún tipo de sentido con lo que dijo Infra**"* | **CONFIRMED** | 480 px slide + 320 ms crossfade; plan-step opacities constant; no shared element. The "no sentido" is the absence of a causal object. |
| **HW-C-005** | (no deviation registered for the four Inventory points) — the automatic add *"no existe in Integration"* | **CONFIRMED** | Integration has no Shopping List (frontend or backend). **Refined:** the claim is not merely unimplemented, it is a **product-truth contradiction** (V1.0 forbids it, V1.1 candidate supports it). Classification `SUPPORTED + NOT YET IMPLEMENTED`. |
| **HW-C-006** | (englobed in HW-C-004) — the concrete benefit is not shown | **CONFIRMED** | The `Lista de compras` card is a static badge; the OUT item it should contain is clipped. |
| **HW-C-007** | *"y después entrar a la transición con Gaby en Finance, pero **no hay una buena transición de lo que quedó en inventario**"* | **CONFIRMED — and understated** | There is no transition at all. `S08_step04→S09_step00` is a cross-mount; Finance is fully rendered at `t = 9.6 ms`. |

**HW-C score: 7 / 7 CONFIRMED.** Scene C is the most accurately diagnosed scene in the hypothesis file.

### 27.2 HW-D

| ID | Original observation (verbatim) | Adjudication | Basis |
|---|---|---|---|
| **HW-D-001** | *"finanzas **ya apareció en pantalla** con el concepto del 'dinero del hogar' a su costado"* — *"LA CAPACIDAD SE EXPLICA ANTES DE QUE EL EXPOSITOR LA INTRODUZCA"* | **CONFIRMED** | `El dinero del hogar` is at `opacity 1` from `S09_step00`, before `L180`. Reinforced by C-12. |
| **HW-D-002** | *"entonces **no tiene sentido presentarle el producto antes de que yo lo presente con palabras**. Tendría sentido que aparezca **cuando yo iba ahí**"* | **CONFIRMED** | The device is present and unchanged from the first frame. |
| **HW-D-003** | *"también con lo que mostramos en pantalla, pero **no le vemos bola**"* (on *"tanto personales como del hogar"*) | **CONFIRMED** | The word `Personal` does not appear anywhere in the device; the only scope is `Familia García`. |
| **HW-D-004** | *"dentro de Finanzas, bueno, registrar un movimiento y relacionarlo con las cuentas o tarjetas involucradas. Lo único que pasa en la presentación es: el teléfono, el dinero del hogar, el primer tab"* | **CONFIRMED** | Device signature identical across all 5 states; `Movimientos` never activated; no sheet. |
| **HW-D-005** | *"el primer tab muestra el ejemplo de que '¿internet ya está pagado?', '¿qué pagos vienen?'"* — *"Pero los 'límites' (L206-210) no quedan cubiertos"* | **CONFIRMED** | Two payment rows exist but unfocused; `Límites` absent. |
| **HW-D-006** | *"después la pregunta '¿cuánto gastamos este mes?'. Después '¿en qué se nos está yendo más?'. Y ya pasos"* | **CONFIRMED** | Both answers are on screen from `step00`, before either question. |
| **HW-D-007** | *"o sea **nada de lo que decimos [en Finance] tiene algún tipo de interacción con lo que pasa en la presentación**. Pasos"* | **CONFIRMED — BLOCKER** | The measurement makes it exact: one product state, four editorial text states. |

**HW-D score: 7 / 7 CONFIRMED.** The observer's verdict on Scene D is the correct one and is now backed by measurement.

### 27.3 HW-E

| ID | Original observation (verbatim) | Adjudication | Basis |
|---|---|---|---|
| **HW-E-001** | *"y hablamos de que algunas compras terminan quedándose 12 años dentro de la casa. Pensemos en la Play"* | **CLOSED-POSITIVE — upheld** | No deviation. The presentation does not contradict the line; it simply does not show it (D-09). |
| **HW-E-002** | *"se ilumina la Play. Hasta que empieza a andar mal, nadie piensa en cuándo se compró, si le toca mantenimiento, dónde quedó la garantía"* | **CONFIRMED** | `S10_step01` is a generic row highlight; `S10_step02` has none of the three fields. |
| **HW-E-003** | *"lo único que pasa es que entra al Detail de PlayStation 5 y se ven documentos: garantía PlayStation 5, manual PS5"* | **CONFIRMED** | Exactly two documents, no identity sections. |
| **HW-E-004** | *"lo único que aparece: dice 'le da identidad a esas cosas importantes del hogar' y 'HomeCloud permite conservar alrededor de ellas información'"* | **CONFIRMED** | The detail is a document list. |
| **HW-E-005** | *"ahí aparece 'garantía de PlayStation 5', 'manual PS5', y lo que yo aparecía y **factura TV**"* | **CONFIRMED — and worse than described** | Not a transcription error: the dataset has `Factura TV` (a different asset) and no `Factura PlayStation 5`. |
| **HW-E-006** | (no deviation registered for *"Volvamos al cumpleaños"*) | **PARTIALLY CONFIRMED** | The callback exists as a label (`Cumpleaños · 20 ago`) but is on the wrong date and is never opened. |
| **HW-E-007** | *"pueden quedar fotos, una frase, o incluso un audio que queremos conservar"* — *"Los **tres** tipos (foto / frase / audio) deben verse"* | **REJECTED as a presentation defect / RECLASSIFIED** | The observation that the three types should be visible is **right**. The rule it cites (audio unsupported) is **stale**: `HOMECLOUD_PRODUCT_EXPERIENCE_FREEZE_V2` (FROZEN) approves audio. The defect is a **script/master conflict** (§30, SI-02), not a drawing error. |
| **HW-E-008** | (englobed) — *"Álbumes deben verse como **agrupación**"* | **CONFIRMED** | `Álbumes` is a single text row; no album is entered. |
| **HW-E-009** | *"pero **en la presentación no pasa nada**"* (on the warranty-vs-memory thesis) | **CONFIRMED — BLOCKER** | Zero visual support and zero available states. The most consequential finding in Scene E. |
| **HW-E-010** | *"Simplemente al llegar a recuerdos aparece: 'un cumpleaños 20 de agosto', 'vacaciones en enero 2026', 'nota de voz mamá 42 segundos', y otra sección llamada 'lunes cumpleaños 24 fotos'"* — *"es **un listado plano**"* | **CONFIRMED** | Two gradient cards + one voice row + one album row. **New:** the thumbnails are CSS gradients, which the product freeze forbids. |
| **HW-E-011** | *"lo único que aparece en [Home]Cloud"* (on *"una memoria del hogar"*) | **CONFIRMED** | The reformulation has no visual support; the exit is a cross-mount to black. |

**HW-E score: 9 CONFIRMED · 1 PARTIALLY CONFIRMED · 1 REJECTED (reclassified).**

### 27.4 Aggregate

| Scene | Confirmed | Partial | Rejected | Total |
|---|---|---|---|---|
| C | 7 | 0 | 0 | 7 |
| D | 7 | 0 | 0 | 7 |
| E | 9 | 1 | 1 | 11 |
| **Total** | **23** | **1** | **1** | **25** |

**23 of 25 human hypotheses are confirmed by measurement.** The one rejection is a reclassification (the observation is right, the rule it cites is stale). The one partial is a continuity defect the observer could not have measured. **The human walkthrough is the most reliable evidence source in this campaign**, and Session 3's job has been to attach measurements to its claims — plus to find the four defects it could not see (the Inventory clip, the missing purchase, the missing PS5 movement, and the absent thesis composition).

---

## 28. Prioritized remediation

Grouped by root cause. **No root cause is split into micro-items.**

### P0 — must be corrected for story / product truth

| # | Root cause | Issues | Remediation |
|---|---|---|---|
| **P0-1** | **No semantic object survives any module boundary.** Eight transitions, zero shared elements. | C-04, C-11, D-09, E-10 | Build **one** shared element per boundary, in this order of narrative importance: (a) the **purchase** (Inventory → Finance); (b) the **PS5 movement row** (Finance → Assets); (c) the **PS5 documents** (Assets → HomeCloud); (d) the **bridge task** (Plan → Inventory). Each must be the *same visual object* at both ends. |
| **P0-2** | **Inventory cannot show the out-of-stock item.** | C-01, C-06 | Make the list region tall enough (or scrollable, or reordered) so the `Sin stock` row is visible. Stop the `step03→04` type/geometry mutation. |
| **P0-3** | **The Plan's tasks are the three forbidden literals.** | C-02, C-07 | Replace with the six NO-UI §18 canon tasks; add the `Cumple de Juli · Sábado · 19:00` Event identity. |
| **P0-4** | **Finance never changes.** | D-01, D-02, D-03 | Rebuild `S09` as five product states (Movimientos → Nuevo movimiento → Pagos → Resumen → Análisis). Remove the four written questions. |
| **P0-5** | **The warranty-vs-memory thesis has no state.** | E-04, E-13 | Add ≥2 states to `S10`. Build the E9 isolation composition. Lower HomeCloud's exposure before the black. |

### P1 — strongly needed for keynote-level quality

| # | Root cause | Issues | Remediation |
|---|---|---|---|
| **P1-1** | **The selective exposure is applied one state early and dropped.** | C-03 | Carry the `step01` mechanic into `step02`; replace the uniform `slot 0.6` with per-element exposure that spares the bridge task. |
| **P1-2** | **The Assets detail is one of five sections and ~42 % empty.** | E-01, E-02 | Implement the target's five sections; add the three field emphases (purchase reference / maintenance / warranty). Do **not** add a purchase-price field. |
| **P1-3** | **The document dataset is inconsistent and includes a foreign object.** | E-03 | `Factura PlayStation 5` / `Garantía PlayStation 5` / `Manual PlayStation 5` on both screens. Remove `Factura TV`. |
| **P1-4** | **The purchase is never materialised and Finance precedes its narration.** | C-11, C-12, D-11 | Add the purchase beat; make Finance arrive with `L180`; add the hinge *"algunas compras terminan ahí, como un gasto"*. |
| **P1-5** | **Memories is a flat list with gradient stand-ins.** | E-05, E-07 | Real photographs (or the target's labelled empty state). Enter the birthday album; exit to a multi-album root. |
| **P1-6** | **The birthday callback is on the wrong date and unnamed.** | E-08 | One birthday object across the film: `Cumple de Juli · Sábado 22 de agosto · 19:00`. |
| **P1-7** | **The D→E handoff has no intermediate beat and no PS5 row.** | D-09, D-11 | Add a `Movimientos` state with the PS5 expense; let that row become the Asset. |
| **P1-8** | **The device scale allocation is inverted.** | §25 | `S08`/`S09` (densest) at `1.00` → `1.20`. `S10` at `1.08` → `1.15`. Target device height `820–880 px`. |

### P2 — polish / refinement

| # | Root cause | Issues | Remediation |
|---|---|---|---|
| **P2-1** | **Finance anatomy diverges from the target.** | D-05 | `18 px` sentence-case section headings; transparent `24/800 tabular-nums` balance coloured by verdict; adopt the target's brand pair; give `Pagado` a non-colour carrier. |
| **P2-2** | **The written question and the question list.** | C-08, D-02 | Remove both; let the product answer. |
| **P2-3** | **The `S10_step03→04` tab switch has no motion.** | §19.6 | Add the target's `280 ms` segmented-thumb travel + `200 ms` label colour. |
| **P2-4** | **The Assets list contains invented objects.** | E-09 | Use the target's dataset; consider earning the `Heladera` callback. |
| **P2-5** | **The `Nota de voz` rule conflict.** | E-06 | Escalate to the script owner (§30, SI-02). If audio is kept, remove the fake waveform and flag `NOT IMPLEMENTED (client)`. |
| **P2-6** | **The `Por lugar` filter chip has no product counterpart.** | — | Integration groups by `category_key`, not place. Either drop the chip or relabel it to match the product's category model. |

---

## 29. Exact handoff to presentation developer

Beat-by-beat instructions. **No code.**

### 29.1 Scene C — S08

1. **Keep the birthday Plan visible** as the scene's anchor from `step00`. Do not replace it with a generic card.
2. **Replace the three task rows** with the six canon tasks (`Confirmar invitados · Preparar torta · Decorar · Comprar bebidas · Comprar snacks · Comprar globos`), each with the product's task anatomy (assignee, due). Keep `Comprar bebidas` as the bridge task.
3. **Add the Event identity** to the plan card: `Cumple de Juli · Sábado · 19:00`, with a visible link to the calendar Event so that *"es un evento"* is literally true.
4. **At the `comprar lo que falta` beat**, keep the `step01` selective exposure: bridge task at `opacity 1.00` + `--home-brand-soft` background, siblings at `0.55`, heading at `0.6`. **Do not use scale.**
5. **At the `¿Qué falta en casa?` beat**, **carry that exposure forward** — do not remove it. Lower the plan heading, the sibling tasks and the device chrome, but **keep the bridge task at 100 %**. **Do not write the question on screen.**
6. **Replace the 480 px device slide** with either (a) a shared-element extraction of the bridge task that lands as the first Inventory row, or (b) an editorial transition in place: Plan lowers exposure, Inventory fades up. **Do not simulate a tap the product does not have.**
7. **Make the Inventory list region tall enough for all four rows** at the state's type size, or make it scrollable, or reorder the dataset so `OUT` is first. **The `Sin stock` row and its chip must be visible.** Do not render a row that cannot be seen.
8. **At the `qué se está terminando / qué necesitamos comprar` beat**, use SELECTIVE EXPOSURE only: dim the non-relevant rows to `0.45`, keep the 4 px brand bar on the OUT row. **Do not change font-size, row height or card height.** Do not spotlight `Detergente` (it is fully stocked).
9. **Replace the `Lista de compras · 8 para comprar` badge** with either a real short list or the Planner-task mechanism (`Comprar café · alta prioridad`). Flag the choice in the handoff.
10. **Raise the device scale for S08 to `1.20`** (from `1.00`).

### 29.2 C → D handoff

11. **Materialise the purchase.** The Shopping/Planner destination must visibly complete before Finance appears.
12. **One object survives.** The purchase must be the same visual object in both contexts.
13. **Finance must not be on stage before `L180`.** `El dinero del hogar` appears once, at the purchase beat, and not before.
14. **Add the hinge** *"algunas compras terminan ahí, como un gasto"* as one state or one auto-beat, carrying the PS5 row.

### 29.3 Scene D — S09

15. **Rebuild as five product states**, one per navigation action the script names:
    - `step00` — `Movimientos`, with the `Supermercado · $48.720` row (and, at `step04`, the `PlayStation 5 · Mar 2024 · $580.000` row).
    - `step01` — `Nuevo movimiento` open, `Cuenta` selector focused, `Personal | Hogar` switch visible.
    - `step02` — `Pagos`, `Internet` focused, then widened to `Seguro del auto`.
    - `step03` — `Resumen`, monthly figure focused.
    - `step04` — `Análisis`, top category focused; then exposure down to return to Gaby.
16. **Remove all four written questions.** Let the device answer them.
17. **Add the `Personal | Hogar` compact segmented control** to the header (target anatomy) and let switching it visibly re-scope the numbers.
18. **Adopt the target's type grammar:** `18 px` sentence-case section headings (not `11 px` uppercase); `24/800 tabular-nums` transparent balance coloured by verdict (a negative balance reads `#B53042`, not white-on-orange); the target's brand pair `#E7643F` / `#C94F2E`.
19. **Give `Pagado` a non-colour carrier** (text or icon).
20. **Raise the device scale for S09 to `1.20`.**

### 29.4 D → E handoff

21. **Show the PS5 as a Finance movement row** before the exit, with exclusive focus.
22. **Let that row be the object that survives** — extracted, not duplicated.
23. **The Asset must not repeat the price as its own field.** It may reference the movement.

### 29.5 Scene E — S10

24. **Extend `stepCount` from 5 to 7** (or convert `step03`/`step04` into a longer sequence) so the thesis has somewhere to land.
25. **Assets detail:** implement the target's five sections — `IDENTIDAD` · `PERSONAS Y UBICACIÓN` · `PRÓXIMO` · `DATOS Y DOCUMENTOS` · `HISTORIAL`. Fill the empty 42 %.
26. **Three field emphases, in the master's order, without three zooms:** purchase reference → maintenance → warranty. Each is a `100 → 108 → 100` local scale or an exposure change on that field only.
27. **Fix the document dataset:** `Factura PlayStation 5` / `Garantía PlayStation 5` / `Manual PlayStation 5` on both screens. Remove `Factura TV`.
28. **Assets → HomeCloud:** Assets lowers exposure; the `Documentos` section **stays put** as the anchor; HomeCloud fades up around it. The two PS5 rows must be **one** object, at the same y and width.
29. **Replace the gradient thumbnails** with real photographs, or with the target's labelled empty state. **No gradients.**
30. **Enter the birthday album** at the callback beat (cover, name, date, count, grid). Fix the date to `22 de agosto`. Name it `Cumple de Juli`.
31. **Exit to a multi-album root** at *"reunir esos recuerdos en álbumes"*.
32. **Build the thesis composition:** HomeCloud at low exposure → isolate `Garantía PlayStation 5.pdf` on one side → extract a birthday photo on the other → warranty to `55–60 %`, photo at `100 %`. **Do not write `documentos vs recuerdos`.**
33. **The exit:** both return to HomeCloud, HomeCloud stays recognisable, exposure lowers smoothly over `400–600 ms`, then fade to black.
34. **Add the target's `280 ms` segmented-thumb travel** to the `Documentos → Recuerdos` tab switch.
35. **Raise the device scale for S10 to `1.15`.**
36. **Use the target's Assets dataset** (`Toyota Corolla`, `Taladro Bosch`, `Impresora HP`, …) instead of invented rows.

### 29.6 Cross-cutting

37. **Every transition in C/D/E must be labelled** `REAL_NAV`, `EDITORIAL`, `SHARED_ELEMENT` or `DEVICE_TRANSITION` (NO-UI §8). Currently all eight are unlabelled device slides or cross-mounts.
38. **Every state must declare its persistence model** (ACCUMULATIVE / EXCLUSIVE / SELECTIVE CONTINUITY) (NO-UI §9).
39. **No emphasis may be instantaneous.** If a change cannot be seen happening, it is not an emphasis.
40. **Do not add a purchase-date or price field to the Asset.** Product Truth forbids it.

---

## 30. Script issues discovered

Recorded, not corrected.

| ID | Line | Issue | Recommendation |
|---|---|---|---|
| **SI-01** | L147-150 vs L152 | The script's own abstract nouns (`repartir tareas / preparar cosas / resolver qué comprar`) are the three strings MASTER §7 C2 forbids as literal tasks. The script is the source of the violation. | Keep the three as a brief editorial beat; make the Plan's tasks concrete (NO-UI §18). |
| **SI-02** | L257-259 vs MASTER §7 E7 / §18 | **Direct conflict.** Delivered script: *"pueden quedar fotos, una frase, o incluso un audio."* Master's patched script: *"fotos, videos, o incluso una frase."* Master §7 E7: *"No mostrar nota de voz como entidad V1."* Product Truth (`HOMECLOUD_PRODUCT_EXPERIENCE_FREEZE_V2`, FROZEN) **approves audio**. | Adopt the master's patched copy. It is product-true for V1, removes the fake waveform, and keeps the three-type structure. If audio is kept, flag `NOT IMPLEMENTED (client)` in the handoff. |
| **SI-03** | L169-170 vs `HOMePLUS_INVENTORY_PRODUCT_FREEZE_V1.0` | The script claims the missing item *"puede sumarse automáticamente a la lista de compras"*. V1.0 **forbids** a Shopping List and routes restock into a Planner Task; the V1.1 candidate supports it. Neither is implemented. | Product decision required before the words "lista de compras" are spoken on stage. Path A: change the line to the Planner handoff. Path B: build the target surface and flag the gap. |
| **SI-04** | L232-236 vs MASTER §18 patched script | The delivered script has **no hinge** between Finance and Assets. The master's patched script adds *"porque algunas compras terminan ahí, como un gasto. / Otras se quedan años dentro de la casa."* Without it, *"Pensemos en la Play"* is a non-sequitur. | Restore the two-line hinge. |
| **SI-05** | L146 vs L253 | The birthday is never named. L146 says *"Un cumpleaños el sábado"*; L253 says *"Volvamos al cumpleaños"*. NO-UI §18 canon is `Cumple de Juli · Sábado · 19:00`. The presentation uses the bare word `Cumpleaños` and dates the memory `20 ago` (Thursday) against the plan's `Sábado` (22 ago). | One birthday object across the film, with the canon name, date and time. |
| **SI-06** | L188-190 | *"tanto personales como del hogar"* is spoken, but the presentation's Finance shows only `Familia García`. The master's patched script says *"separar tus gastos de los del hogar"*, which at least names the mechanism. | Either show the `Personal | Hogar` control or reduce the line to the household scope. |
| **SI-07** | L206-210 | *"También podemos establecer límites"* names a complete product (real in both target and Integration) that the presentation does not show and the master's §8 D-section does not choreograph. | Add a `Límites` state, or fold it into `Resumen` as the target does. |

---

## 31. Open questions

Only real unresolved questions.

1. **Shopping List: V1.0 or V1.1?** The frozen Inventory Freeze forbids it; the V1.1 candidate makes it a primary surface. This is a **product decision**, not a presentation decision, and it blocks SI-03 and C-05.
2. **Audio in HomeCloud: script or master?** SI-02 cannot be resolved by the presentation team. It needs the script owner and the product-freeze owner in the same room.
3. **Is the `Supermercado` purchase an automatic Finance movement or a manual one?** MASTER §8 D0 says automatic (*"gasto ya registrado"*); Integration has no such pipeline. The presentation may show the row as a data fact, but the handoff must state which it is.
4. **Should the Assets detail show a purchase date at all?** Product Truth says no (Finance owns money). MASTER §9 E0 says yes (`Comprada: Mar 2024`). **These two authorities contradict each other** and the presentation cannot satisfy both.
5. **What is the real birthday date?** The plan says `Sábado`; the memory says `20 ago` (Thursday). One of them is wrong and the film's strongest callback depends on it.
6. **Is `S10`'s `stepCount` of 5 fixed, or can it be extended to 7?** P0-5 (the thesis composition) and P1-5 (the album) both need states that do not exist. This is a structural question, not a design one.
7. **Who owns the `Por lugar` filter chip?** Integration groups Inventory by `category_key`, not place. The chip implies a grouping the product does not have.

---

## 32. Files written

All under `C:\Users\thega\Desktop\HomeplusPresentacion01\HomePlus_Presentacion_FINAL\audit\`.

```
audit/03_SCENES_C_E_AUDIT.md                                    ← this report
audit/runtime/session-03/states/                    18 PNG      S07_step00 … S11_step00 (+ 8 motion frames)
audit/runtime/session-03/data/states-cde.json                  18-state full probe
audit/runtime/session-03/data/analysis-cde.md                  stage copy, plan steps, inventory rows, finance, S10, enlargement, fonts, canvas
audit/runtime/session-03/data/inventory-rows.md                per-row geometry, chip pairing, clip test, coverage test
audit/runtime/session-03/data/motion-cde.json                   6 transitions × 27 frames (5-instant sampler)
audit/runtime/session-03/data/motion-cde.md                    rendered transition tables
audit/runtime/session-03/data/motion-s10.json                   2 transitions × ~320 frames (rAF sampler, in-page)
audit/runtime/session-03/data/motion-s10.md                    rendered S10 transition tables
audit/runtime/session-03/data/runtime-errors.json               console / pageerror / requestfailed
audit/runtime/session-03/figma-reference/         61 PNG + 126 JSON   Figma-app target harvest
audit/runtime/session-03/_tooling/                  8 files    pw.mjs probe.mjs walk.mjs analyze.mjs inv.mjs
                                                                  motion.mjs motion-report.mjs motion-s10.mjs
audit/runtime/session-03/_logs/                     (none — tooling wrote to stdout)
```

**No file outside `audit/` was created, modified, renamed or deleted.**

---

## 33. Production files modified

# NONE

This package is **not a git repository** (no `.git` anywhere under `HomeplusPresentacion01`), so `git status` is not available as evidence. Instead:

- Every read was a read. Every write landed under `audit/`.
- The presentation dev server on `8444` was **already running** (PID 15644, started by Session 1) and was **reused as-is** — not restarted, not reconfigured, not rebuilt.
- The Figma-app dev server on `8445` was **already running** (PID 30576) and was **reused as-is** — not restarted, not rebuilt, `package.json` untouched (mtime 2026-09-24 20:31:11, before this session).
- **No package was installed. No lockfile was touched. No build was run. No dependency was added.**
- `node_modules` was not modified.
- The script was **not** edited.
- No commit, stash, reset, branch or worktree operation was performed.

---

## 34. Verification

Per `verifying-before-completion`: no completion claim is made without fresh evidence.

| Claim | How verified | Result |
|---|---|---|
| 18 states reachable and captured | `walk.mjs` walked `S07_step00` … `S11_step00` with a per-state probe + screenshot | **18 / 18 captured**, zero skipped |
| The Inventory OUT row is clipped | `inv.mjs` measured `.inventory-card` client vs scroll and each row's y-range against the card's bottom edge | **CONFIRMED** — `+41 px` (`step03`), `+60 px` (`step04`); OUT row below the clip in both |
| Coverage 1/1 · 2/2 · 0/1 | `inv.mjs` coverage test, both states | **CONFIRMED** |
| The Finance device never changes | device-text signature compared across all 5 states | **CONFIRMED** — `unique signatures: 1` |
| `El dinero del hogar` is present at `S09_step00` | stage-text probe, `opacity` per state | **CONFIRMED** — `opacity 1` from `step00` |
| The `S08_step03→04` mutation is instantaneous | rAF sampler, first sample at `t = 10.3 ms` | **CONFIRMED** — already complete |
| The `S08_step04→S09_step00` handoff is a cross-mount | rAF sampler, first sample at `t = 9.6 ms` | **CONFIRMED** — Finance fully rendered, Inventory absent |
| The `S09_step04→S10_step00` handoff has no Finance object | `finHero` sampled at 9 instants | **CONFIRMED** — absent at every sample |
| The `S10_step02→03` documents are two DOM instances | rAF sampler, 320 frames, both layers measured | **CONFIRMED** — y `202.4/288.9` vs `210.2/297.2` |
| The `S10_step03→04` tab switch has no motion | rAF sampler, 322 frames, first frame already `data-step=4` | **CONFIRMED** |
| `S11_step00` is pure black | screenshot + probe (no device, no text) | **CONFIRMED** |
| Session 1's "thumbnails 40×40 → 98×62" is an artefact | source read (`homecloud-screen.css:20-22`) + rAF measurement | **CONFIRMED as artefact** — one sizing rule, no tab conditional; `98×1.08 = 105.84` |
| Max non-stage transform in S08/S09 is `1.00` | per-state max-scale census | **CONFIRMED** |
| Device geometry per state | per-state slot/phone/screen probe | **CONFIRMED** — `300×620 @1.00` (S08/S09), `324×669.6 @1.08` (S10) |
| 2026-08-16 is a Sunday, 2026-08-22 a Saturday, 2026-08-20 a Thursday | `Get-Date … .DayOfWeek` | **CONFIRMED** |
| Runtime cleanliness | `runtime-errors.json` | **1 console 404** (`/favicon.ico`), **0 pageerror**, **0 failed requests** |
| No production file modified | every write scoped to `audit/`; both dev servers reused as-is | **CONFIRMED** |

**Not verified (stated, not assumed):**
- **No audio / voice sync.** Every timing statement is a frame-time or state-count statement.
- **No real projector / room.** Legibility figures are arithmetic projections at `1.5×`.
- **No `prefers-reduced-motion` run** (S1 G7 carries forward).
- **No Interaction runtime launch** — all Integration claims are static.
- **No backward-walk restoration test** for S08–S10 (S1 §6 covers the deck; the `.family-map-stage` artefact S1 found is a Scene B issue and is out of scope here).

---

**END OF SESSION 3.**

STOP. DO NOT IMPLEMENT. DO NOT START SESSION 4. DO NOT MODIFY PRODUCTION. DO NOT EDIT THE SCRIPT.
