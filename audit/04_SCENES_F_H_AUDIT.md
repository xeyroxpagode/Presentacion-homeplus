# SESSION 4 — SCENES F + G + H DEEP AUDIT

> ## > NORMALIZATION NOTICE
> >
> > **See `audit/00_AUDIT_NORMALIZATION.md` for later cross-session corrections.**
> > **Raw evidence remains preserved below.**
> >
> > That file wins **for the named fact only**. Product Truth remains above it.
> >
> > ### The executive tally in §1 was WRONG and is corrected in place — `N-11`
> >
> > §1 claimed **6 BLOCKERS** (F 1 / G 4 / H 1) and stated *"No other issue in Scenes F, G or H is graded `BLOCKER`."* **Both are false.** The issue register is the raw-count authority (`N-42`).
> >
> > | | §1 claimed | Register contains | |
> > |---|---|---|---|
> > | Scene F | 1 — `F-01` | **1** — `F-01` | ✅ |
> > | Scene G | 4 — `G-01`…`G-04` | **7** — `G-01`, `G-02`, `G-03`, `G-04`, **`G-05`, `G-12`, `G-15`** | ❌ |
> > | Scene H | 1 — `H-01` | **4** — `H-01`, **`H-02`, `H-04`, `H-05`** | ❌ |
> > | **TOTAL** | **6** | **12** | ❌ |
> >
> > **No severity was downgraded to make this arithmetic work.** The register stands. Full Session-4 raw tally: **34 rows · 12 BLOCKER · 14 HIGH · 6 MEDIUM · 2 LOW.**
> >
> > ### Other corrections
> >
> > | This report says | Correction |
> > |---|---|
> > | §5 `H-02` and elsewhere — Assets / PS5 / Documentos "do not exist **in the product**" | **`N-13`** — **superseded in its broad form.** `HOMePLUS_ASSETS_PRODUCT_FREEZE_V2.0` is **FROZEN 2026-10-01** (`:5`), `READY_FOR_IMPLEMENTATION` (`:30`). Canonical four-way: target **APPROVED** · Figma **exists** · Integration **not implemented** · executable nav **does not exist**. ⇒ `SUPPORTED PRODUCT TARGET + IMPLEMENTATION GAP + FAKE CURRENT NAVIGATION IF PRESENTED AS TAP PATH`. **`H-02` nevertheless stays raw BLOCKER and canonically ACTIVE** — fixing an authority does not create a route. |
> > | §1 note on `H-01` vs `H-02` | **`N-12`** — never conflate. `H-01` = *no interface at all* (`RC-02`). `H-02` = *route names three non-existent nodes* (`RC-14`). Different causes; both survive independently. |
> > | §15 `G-12` (AI claim) | **`N-14`** — **CONFIRMED, stays canonically ACTIVE.** Re-verified: 0 AI providers / 0 AI routes / 0 edge functions / 0 AI env / 0 current Homi. The single unsafe sentence is `script L320`. |
> > | §26 `H-P1` (S14 final state clean) | **`N-17`** — **CONFIRMED, and it explains Session 1.** The `Figma · Diseño · IA` residue Session 1 reported is a **text-table / hidden-subtree artefact**, not visible. Mechanism: `H-09`, `.s13-center` re-asserts `visibility: visible`. |
> > | §31 script-issue count | **`N-15`** — **6 new** (`SI-10`…`SI-15`), not 7. `SI-07` and `SI-01` are re-evidenced. The §31 closing line already self-corrected; that correction is canonical. |
> > | §1 + §13 + §31 script vs master chronology | **`N-16`** — the script's 24/9 mtime vs the master's 23/9 **proves chronology only**. ⛔ Technology ordering stays **`SCRIPT / MASTER CONFLICT`** (`CF-15`). Two masters agree against the script, which is weight, not authority. |
> > | `F-04`, `G-16` subsumptions | **`N-43`** — this report's own self-declared subsumptions are **accepted as given**. Raw severities (`HIGH`, `MEDIUM`) preserved; canonical status `SUBSUMED`. Not recovered as `ACTIVE`. |
> >
> > **No severity in this report was altered. No finding was deleted. The raw registers below stand as the evidence of record.**

**Mode:** READ-ONLY. No production file was created, modified, renamed or deleted.
**Package audited:** `C:\Users\thega\Desktop\HomeplusPresentacion01\HomePlus_Presentacion_FINAL`
**Date of capture:** 2026-10-05.
**Runtime evidence:** `audit/01_RUNTIME_BASELINE.md` (Session 1, 85 states, 214 screenshots) + `audit/01_RUNTIME_BASELINE_ERRATA.md` + `audit/02_SCENES_A_B_AUDIT.md` (house style, normalization rules N-01…N-05) + `audit/00_AUDIT_NORMALIZATION.md`.
**Verdict policy:** this document issues quality verdicts. It implements nothing.

**Scope frozen:** S11 (Continuity), S12 (Frontend/Backend), S13 (Stack), S14 (Barrier/Friction). S10 and S15 inspected only for entry/exit continuity.

**Coordinate note.** Slide IDs are the current ones (`S11 Continuity`, `S12 Frontend Backend`, `S13 Stack`, `S14 Barrier`). No renumbering is implied.

---

## 1. Executive verdict

> ### ⚠ CORRECTED 2026-10-05 — see `00_AUDIT_NORMALIZATION.md` **N-11**
>
> **12 BLOCKERS** — **Scene F: 1** (`F-01`) · **Scene G: 7** (`G-01`, `G-02`, `G-03`, `G-04`, `G-05`, `G-12`, `G-15`) · **Scene H: 4** (`H-01`, `H-02`, `H-04`, `H-05`).
>
> This block originally said **6 BLOCKERS** (F 1 / G 4 / H 1) and added *"No other issue in Scenes F, G or H is graded `BLOCKER`."* **Both statements were wrong.** The issue registers in §5, §15 and §25 are the raw-count authority (`N-42`) and they contain **12**. Six issues graded `BLOCKER` in those registers were missing from the tally: `G-05`, `G-12`, `G-15`, `H-02`, `H-04`, `H-05`.
>
> **No severity was downgraded to reach this number, and no register row was changed.** Every issue in this report retains its original grade.
>
> Full Session-4 raw register: **34 rows · BLOCKER 12 · HIGH 14 · MEDIUM 6 · LOW 2.**
>
> The qualified severities are graded `BLOCKER` and stay that way: `G-12` *"as a P0 truth problem"*, and `G-15` / `H-05` as *"the visual-load half of H-02's root cause"*.
>
> *(Tally issued here, not in `00_AUDIT_NORMALIZATION.md`. Sessions 7–8 must merge it — see `00_CANONICAL_ISSUE_REGISTRY.md` §1.)*

**The single root cause of Scenes F, G and H is that the product is not on stage.** Across the 15 states of S11–S14 there is **zero** phone frame and **zero** product surface (Session 1 §5.1: `S11`, `S12`, `S13`, `S14`, `S18` = 19 states with no device; 15 of those are in scope). The product story runs S04–S10 with the device present, then the film cuts to 15 consecutive states of pure typography and vendor logos, then S15 brings the device back. Every master freeze for these three scenes is written around the device:

- Master §11 G0: *"Teléfono HomePlus centrado."*
- Master §11 G3: *"Mantener frontend y backend simultáneamente visibles."*
- Master §12 H0: *"Teléfono HomePlus central."*
- NO-UI §13 G00: *"Phone central. Sin movimiento mientras Benja introduce."*
- NO-UI §14 H00: *"Phone limpio."*

None of that exists. The consequence is not cosmetic; it is that **the three scenes cannot say what the script asks them to say**:

1. **Scene F cannot prove "la vida no pasa por módulos"** because no module is ever shown. S11 is 8 DOM nodes and three lines of text. The speaker names 6 concrete situations and 6 abstractions; the screen shows none of them. → **F-01, BLOCKER.**
2. **Scene G cannot explain frontend or backend** because there is no frontend to look at and no backend to look behind. S12 opens with all five vendor logos already on stage — during the sentence that says technologies come later. The backend is one label (`Datos y servicios`) plus three logos plus a decorative line. The five verbs the script enumerates (`recibe`, `valida`, `guarda o busca`, `devuelve`) appear **zero** times in `src/`. The one concrete transaction the script gives (a registered expense) does not exist. → **G-01, G-02, G-03, G-04, BLOCKER.**
3. **Scene H cannot prove friction** because there is no interface to be lost in. The two "routes" are fabricated text pills; the warranty route names three nodes that do not exist in the product at all. And the sentence that absolves HomePlus (`no porque la interfaz sea un problema`) has no state, because there is no clean HomePlus to return to. → **H-01, BLOCKER.**

**Two further findings are independent of the root cause and would survive any recomposition:**

- **The S13→S14 boundary replays the entire stack.** `S14Barrier` renders `<S13Stack stepIndex={3} />` inside `.s14-echo`. Measured `S13_step03 → S14_step00`: 0 animating elements, 88 entering / 57 exiting — a pure cross-mount that re-runs every entrance animation (`s13-panel-in` 500 ms, `s13-role-in` 420 ms with 70 ms stagger, centre items, bridge firming) at echo opacity 1. The audience watches the whole stack assemble itself twice, at full brightness, back to back. Visible text at `S14_step00` is byte-identical to `S13_step03`. → **G-08, HIGH.**
- **The AI claim is unsupported by Product Truth.** The script says *"también usamos modelos de inteligencia artificial en algunas partes del sistema."* Integration has **zero** AI integration: no provider dependency, no `/api/*ai` route, no edge function, no AI env var, no mock surface. The stage asserts a present-tense capability that does not exist, and places a generic hub-and-spoke glyph inside an orange glow — the exact "AI glow" cliché master §2.8 forbids. → **G-12, BLOCKER** (graded here as a P0 technical-truth problem; see §32).

**What must be preserved.** S11's black entry is a legitimate use of black (master §2.2 use 2, "reset entre capítulos") and should not be removed. S14's final question state does reach a genuinely clean, residue-free black frame — the settled screenshot confirms it. S13's role captions (`Interfaz móvil`, `Build y preview`, `API y lógica`, `Auth y datos`, `Base de datos`) are the only audience-legible technology explanations in the entire block and are correct as written. No AI provider logo is shown, which is the right restraint. The backend did **not** become a server rack, terminal, code rain or database cylinder — that restraint is correct and must survive the addition of the verb language. The stage background is consistent at `#060404` across S07–S18. Hold tests show zero drift and zero timers anywhere in the deck.

**A note on the script.** The current script file (`Guion Compartido (2).md`, 24/9/2026) is **newer** than the master freeze (23/9/2026). It therefore regresses at least one decision the master explicitly patched: the technology order. This is recorded as `SI-10` and it blocks any final adjudication of technology ordering until resolved. See §31.

---

## 2. Evidence used

| Source | What was read / run | Where the evidence lives |
|---|---|---|
| **SCRIPT** | `C:\Users\thega\Downloads\Guion Compartido (2).md`, 497 lines, read in full. Block 6 = L273–L298 (Colo, Continuidad); Block 7 = L302–L326 (Benja, Stack Técnico); Block 8 = L328–L343 (Infra, Fricción) | quoted inline with line numbers |
| **MASTER (narrative + visual)** | `HOMEPLUS_PRESENTATION_MASTER_FREEZE_V1.0.md`, 2199 lines, read in full — §1 verdict table, §2 grammar (2.1 colour, 2.2 black, 2.3 approved on-screen text, 2.4 editorial vs real, 2.5 shared elements, 2.6 scale, 2.7 exposure, 2.8 motion, 2.9 phones, 2.10 live operation), §3 data canon, §4 OPENs, §10 Scene F (F0–F5), §11 Scene G (G0–G5), §12 Scene H (H0–H4), §15 stress test, §16 implementation rules, §18 patched canonical script | quoted inline with section numbers |
| **MASTER (no-UI)** | `HOMEPLUS_PRESENTATION_NO_UI_MASTER_FREEZE_V2.0.md`, read in full — §12 Scene F final target (F00–F08, exact transform mappings, 6 exact relations), §13 Scene G (G00–G05, backend verb language, `$48.720` demo), §14 Scene H (H00–H08, "no falsificar componentes", 88–96 px blanco) | quoted inline with section numbers |
| **CURRENT RUNTIME (session-01)** | `audit/01_RUNTIME_BASELINE.md` (886 lines) read in full; `audit/01_RUNTIME_BASELINE_ERRATA.md` read in full; the 15 in-scope screenshots (`S11_step00…S14_step04`) plus `S10_step04` and `S15_step00` read back individually; `data/motion-summary.json`, `data/text-table.md`, `data/state-table.csv`, `data/walk-forward.json` queried directly | cited as S1 §n; screenshots read back this session |
| **PRESENTATION SOURCE** | Every file contributing to S11–S14 read in full: `S11Continuity/index.tsx` + `s11-bridge.css`; `S12FrontendBackend/index.tsx` + `s12-layers.css`; `S13Stack/index.tsx` + `s13-stack.css`; `S14Barrier/index.tsx` + `s14-barrier.css`; `presentationConfig.ts`; `motion/motionTokens.ts`; `design-system/tokens.ts`; `components/AmbientGlow.tsx`; `assets/tech/*.svg`; `index.css`; `app-screens/FinanceDemoScreen/*` | cited as `path:line` |
| **INTEGRATION / PRODUCT** | `C:\Users\thega\Desktop\homeplus-worktrees\Family-Hub-Own-integration`, app root `front\mi-front-limpio` (Expo / React Native / Supabase / Express). Read-only static inspection with per-claim `path:line` citations. Native runtime **not** launched — static evidence was sufficient on every question, as the brief allows | cited inline as `front\…:line` / `backend\…:line` |
| **HUMAN HYPOTHESES** | `audit/00_HUMAN_HYPOTHESES.md` §3.6 (`HW-F-001`), §3.7 (`HW-G-001`…`HW-G-010`), §3.8 (`HW-H-001`…`HW-H-004`) and §6 script-issue register read in full | quoted inline |

**Evidence not available, stated explicitly:**

- **No audio, no real timing.** Whether a state lands on the right word cannot be measured here. Every timing statement below is a *state-count* or *transition-shape* statement, never a sync measurement. Where a hypothesis claims a sync defect, it is adjudicated `INSUFFICIENT EVIDENCE` on that half.
- **No audience, no room.** Legibility judgements convert logical px to projected px at a stated scale factor (1.5× for 1920×1080; 2.3× for a ~3 m-wide 16:9 screen). These are arithmetic projections, not observations.
- **No fresh runtime capture this session.** All runtime numbers are Session 1's, re-read and re-queried. Session 1's own limits apply: motion sampled at 5 instants per transition, not video (S1 §13.2 G6); single engine (G7); no pointer interaction exercised (G8).
- **One Session-1 measurement is known to over-report.** `data/text-table.md` lists `Figma · Diseño · IA` as visible text at `S14_step04`. That is a measurement artefact, not a visual residue — see §23 and §30.

**Runtime errors:** none attributable to the application in any of the 85 states (S1 §12: 0 console errors, 0 `pageerror`, 0 `requestfailed`).

---

## 3. Spoken-beat map — F

Speaker: **Colo**, script L273–L298. 20 spoken lines (S1 §10.2) against 3 states = **6.67 lines per state**, against a global mean of **3.14** (S1 §10.2). A beat is a change in idea, not one script line.

| BEAT | SCRIPT (line) | INTENDED IDEA | EXPECTED VISUAL SUPPORT | CURRENT STATE(S) | HAS STATE? |
|---|---|---|---|---|---|
| **F-B1** | L275–L277 *"Y si se fijan, no inventamos ninguna situación rara."* | Reset. Refuse exoticism; tell the audience nothing strange is coming | Absolute black. Nothing. (Master §10 F0: *"Negro."*) | `S11_step00` — flat `#060404`, 8 DOM nodes, zero visible content | ✔ correct (see F-P1) |
| **F-B2** | L278–L283 *"Hablamos del colegio, de un entrenamiento que cambia, de hacer las compras, pagar Internet, que ande mal la play o preparar un cumpleaños."* | **Six concrete situations**, all already seen in Scenes B–E | The six real components, reused, in an irregular constellation — not a grid (Master §10 F1; NO-UI §12 F01–F03) | **none** | ✘ (F-01) **BLOCKER** |
| **F-B3** | L285–L292 *"Para nosotros, por debajo, eso significa personas, fechas, responsabilidades, ubicaciones, gastos y archivos. Todos relacionados entre sí."* | **Six abstractions**, each derived from a concrete situation, then related | Situations drop to 40–50 % exposure; six labelled nodes emerge from them; **six** thin relations, no spiderweb (Master §10 F2–F3; NO-UI §12 F04–F05) | **none** | ✘ (F-01) **BLOCKER** |
| **F-B4** | L294 *"Para una familia siguen siendo cosas de todos los días."* | Return to life. The abstraction is not the point; daily life is | 3–4 everyday echoes return **over** the structure, abstraction behind/below (Master §10 F4; NO-UI §12 F06) | **none** | ✘ (F-01) |
| **F-B5** | L296 *"Por eso la vida no ocurre separada en módulos."* | **The thesis of the whole film.** Everything before it exists to earn this line | Elements converge toward centre and begin to define a single vertical surface (Master §10 F5) | `S11_step01` — `La vida no pasa / por módulos.` at 120 px, centred, on black | ✔ but unsupported (F-01, F-03) |
| **F-B6** | L298 *"Y HomePlus tampoco debería sentirse así."* | The product answer. The convergence resolves into the product | Phone frame appears around the convergence; final = one HomePlus phone (Master §10 F5; NO-UI §12 F08) | `S11_step02` — `HomePlus los conecta.` at 56 px, centred, on black | ✘ (F-03) |

**Beat arithmetic.** 6 beats against 3 states. **Four of six beats have no visual state at all** (F-B2, F-B3, F-B4, F-B6). The two that do exist are two lines of centred type. The density figure (6.67) is therefore not the problem by itself — the problem is that the three states that exist are spent on one correct black hold and two text lines, while the four beats that carry the entire argument are unrepresented.

**Named referents.** The script names **6 concrete situations** (colegio, un entrenamiento que cambia, hacer las compras, pagar Internet, que ande mal la play, preparar un cumpleaños) and **6 abstractions** (personas, fechas, responsabilidades, ubicaciones, gastos, archivos) = **12 named referents**. `HW-F-001` counts 14 (7 + 7); that count is not reproducible from the script. See §30.

---

## 4. Continuity deep audit

### F1. Does S11 currently earn "la vida no pasa por módulos"?

**No.** The line is set at 120 px and reads beautifully, and it is the single best-typographed moment in the block. But an assertion without evidence is a slogan, and master §2.3 is explicit that on-screen text is permitted only for *"una pregunta estructural central"*, *"un concepto que merece pantalla propia"*, *"contenido real de UI"*, *"nombre/reveal de producto"* or *"cierre institucional"*. A thesis that the audience is being asked to accept on the strength of a sentence, immediately after being shown six product scenes, needs the six scenes to come back. They do not. The audience is asked to believe that school, training, shopping, internet, a broken PlayStation and a birthday are connected, and is shown nothing.

### F2. Does it visually reconnect concrete examples already seen?

**No.** Zero of the six situations return. This is the single largest gap in the scene and it is a direct violation of master §2.5, which lists the mandatory continuity elements and requires *"No recrear versiones 'parecidas'"*. The six objects needed are **already built** in the package:

| Object | Already built at | Reuse cost |
|---|---|---|
| Juli / colegio | `S04` (`product-home-layer`, Educación Física) | zero — existing component |
| Entrenamiento `18:00→20:00` | `S06` (`.map-place.map-club`, `+1 h`) | zero |
| Cumpleaños | `S08` (`Cumpleaños · Sábado · 3 pasos pendientes`) | zero |
| Supermercado | `S09` (`Supermercado · $XX.XXX`) | zero |
| Pago Internet | `S09` (`Internet · Pagado · $38.450`, `financeData.ts:13`) | zero |
| Garantía PlayStation | `S10` (`Garantía PlayStation 5.pdf`) | zero |

Master §2.5 additionally lists `Garantía de PlayStation` and `PlayStation 5` as **mandatory** shared elements. They are the two objects the friction scene later needs.

### F3. Does the presentation use the SAME semantic objects from earlier scenes, or introduce new generic abstractions?

**Neither.** S11 introduces no semantic objects at all — not the concrete ones and not the abstract ones. The six abstractions the speaker names (`personas`, `fechas`, `responsponsabilidades`, `ubicaciones`, `gastos`, `archivos`) are never visualised. The only new visual content is a second invented assertion (`HomePlus los conecta.`) that the speaker never says. So the scene fails in both directions at once: it does not reuse the real objects, and it does not build the abstractions either.

### F4. Does the audience understand what is connected to what?

**No.** There is nothing to understand. With no objects and no relations on stage, the audience cannot form the model the scene exists to build. This is the scene's purpose and it is entirely unmet.

### F5. Is there enough restraint to avoid a spiderweb/network cliché?

**Moot, and therefore a latent risk rather than a live one.** There is no network at all, so there is no spiderweb. But the restraint is achieved by absence, not by design: the moment anyone implements F-B3, the default implementation is six nodes with six lines, which is exactly the spiderweb master §10 F3 forbids (*"No ERD. Máximo 6–8 líneas."*). The target must therefore **pre-specify the relation set**, not merely warn against the cliché. NO-UI §12 F05 already does this and it is the strongest available specification — see §7.

### F6. Does S11 provide enough visual support for the amount of narration?

**No.** 20 spoken lines against 3 states = 6.67 lines/state, 2.12× the global mean of 3.14 (S1 §10.2). But the more precise statement is the beat count: 4 of 6 beats have no state. Adding states is not automatically better — the correct number is the number of meaningful visual beats, which is **6** (F-B1…F-B6), not 3 and not 20. See §7.

### Additional findings specific to Scene F

**The scene has a dead first press.** `S11_step00` is visually empty: 8 DOM nodes, zero visible content, flat `#060404`. The transition into it (`S10_step04 → S11_step00`) is measured at 0 animating elements, 8 entering / 179 exiting — a hard cut. So the operator presses once and the stage goes from "phone at the right, HomeCloud visible" to "nothing", and must press again to get the first line. The black hold is correct in principle (F-P1) but it currently costs a full press to establish. → **F-02, HIGH.**

**The scene's two text lines are not the script's two text lines.** See F-03 below; this is a script/visual mismatch, not a styling issue.

**The scene ends on text, not on the product.** Master §10 F5 and NO-UI §12 F08 both require the convergence to resolve into a phone frame and end on `UI_HOME_BASE`. S11 ends on a 56 px sentence. This is what makes the F→G transition impossible to build as a shared-element handoff — there is no shared element to hand off. → folded into **F-05 / G-01**.

---

## 5. Continuity issue register

Severity vocabulary is exactly `BLOCKER / HIGH / MEDIUM / LOW / POSITIVE`. No severity has been inflated or deflated.

---

### **F-01 — Scene F has no visual content: 4 of 6 spoken beats are unrepresented**

- **SCENE:** F
- **CURRENT STATE(S):** `S11_step00`, `S11_step01`, `S11_step02` (all 3)
- **SCRIPT MOMENT:** L278–L294 — the six situations, the six abstractions, the relations, and the return to daily life
- **MASTER INTENT:** §10 F1 *"Reutilizar componentes reales ya vistos; no iconos nuevos."* · F2 *"Cada abstracción debe derivar visualmente de una situación concreta."* · F3 *"Aparecen pocas conexiones. No ERD. Máximo 6–8 líneas."* · F4 *"regresan 3–4 ecos cotidianos por encima de la estructura."* · NO-UI §12 F01–F06
- **CURRENT RUNTIME EVIDENCE:** `S11` = 8 DOM nodes total across all 3 states (S1 §3 rows 52–54). Visible text at `S11_step00`: *none*. At `S11_step01`: `La vida no pasa · por módulos.` At `S11_step02`: + `HomePlus los conecta.` (`data/text-table.md:55-57`). Motion: `S11_step00→01` = 1 animating element (`.s11-statement`); `S11_step01→02` = 1 animating element (`.s11-resolution`) (`data/motion-summary.json`). Zero objects, zero relations, zero abstractions.
- **FIGMA / PRODUCT EVIDENCE:** not required — the objects already exist in the package (see §4 F2 table).
- **HUMAN WALKTHROUGH:** *"mientras el Colo dice eso, lo único que aparece es: al primer tap, una pantalla negra; al segundo, 'La vida no pasa por módulos. HomePlus los conecta'; al tercero, dentro de la misma esquina, donde aparece 'la vida no pasa por módulos'"* (`HW-F-001`). The first half is confirmed; the "misma esquina" layout claim is **not** reproducible — at `S11_step02` both blocks are centred and vertically stacked (`s11-bridge.css:8-12` `align-items: center; justify-content: center; gap: 48px`).
- **CLASSIFICATION:** `NARRATIVE` + `VISUAL`
- **SEVERITY:** `BLOCKER`
- **VERDICT:** **FAIL.** The scene's entire argument is unrepresented. This is the highest-value single fix in the session: six already-built components plus six derived labels plus six relations would convert the scene from a slogan into the thesis of the film.
- **TARGET BEHAVIOUR:** See §7, beats F-B2, F-B3, F-B4, F-B6.
- **RATIONALE:** A continuity scene whose job is to show that modules are connected underneath cannot do that work with no modules on stage. Master §15 names this exact risk for Scene F: *"Parecer diagrama técnico prematuro"* — the mitigation is *"Pocas conexiones; transformación rápida; volver a vida cotidiana antes del teléfono."* None of the three mitigations is currently present.

---

### **F-02 — The black entry costs a full press and establishes nothing**

- **SCENE:** F
- **CURRENT STATE(S):** `S11_step00`
- **SCRIPT MOMENT:** L275–L277 *"Y si se fijan, no inventamos ninguna situación rara."*
- **MASTER INTENT:** §10 F0 *"Negro. Colo: 'Y si se fijan… no inventamos ninguna situación rara.' Negro."* · §2.2 use 2 (*"reset entre capítulos"*)
- **CURRENT RUNTIME EVIDENCE:** `S11_step00` renders `.s11-bridge` with `background: #060404` and the `s11-veil-in` keyframe (`s11-bridge.css:13-16, 62-64`); `.s11-statement` and `.s11-resolution` are both `opacity: 0` until `data-first` / `data-second` (`s11-bridge.css:26-27, 33-36, 50-51, 57-60`). Measured `S10_step04 → S11_step00`: 0 animating elements, 8 entering / 179 exiting — a hard cut with no transition.
- **CLASSIFICATION:** `TIMING` + `MOTION`
- **SEVERITY:** `HIGH`
- **VERDICT:** **PARTIAL FAIL.** The black hold itself is correct and is preserved as a positive (F-P1). The defect is that it is a *separate press* with zero content, so the operator's first advance in the scene produces no visible change.
- **TARGET BEHAVIOUR:** Keep the black hold, but let it be established by the **scene-entry transition** rather than by a dedicated state. The press that enters S11 should carry the audience from S10's product stage to black in one move; the first *content* press should then be the one that brings the six concrete objects in. Net effect: the same black, one press earlier, and one press of budget returned to the scene.
- **RATIONALE:** Master §2.10 requires *"no más de 1 trigger manual por microsecuencia"* and that scenes *"tolerar una variación oral de ±0,5–1 s"*. A dead press is a trigger spent on nothing, and it is the first thing an operator will mis-time.

---

### **F-03 — The screen's two lines are not the script's two lines**

- **SCENE:** F
- **CURRENT STATE(S):** `S11_step01`, `S11_step02`
- **SCRIPT MOMENT:** L296 *"Por eso la vida no ocurre separada en módulos."* · L298 *"Y HomePlus tampoco debería sentirse así."*
- **MASTER INTENT:** §2.3 *"No duplicar lo que dice el expositor."* · §2.3 approved on-screen texts (this line is **not** on the approved list)
- **CURRENT RUNTIME EVIDENCE:** On screen: `La vida no pasa / por módulos.` (120 px) and `HomePlus los conecta.` (56 px) — `S11Continuity/index.tsx:12-16`, `s11-bridge.css:18-31, 42-55`. Script: *"la vida no ocurre separada en módulos"* and *"HomePlus tampoco debería sentirse así."*
- **CLASSIFICATION:** `NARRATIVE` + `SCRIPT ISSUE`
- **SEVERITY:** `HIGH`
- **VERDICT:** **FAIL, in three distinct ways.**
  1. **Duplication.** The 120 px line restates the speaker's sentence with a different verb (*pasa* vs *ocurre separada*). Master §2.3 forbids duplicating the speaker.
  2. **Omission.** The speaker's actual second line — *"HomePlus tampoco debería sentirse así"* — is not on screen.
  3. **Fabrication.** `HomePlus los conecta.` is an assertion the speaker never makes. It is also the only place the product is named in the scene, and it arrives as text rather than as the product.
- **TARGET BEHAVIOHAVIOUR:** See §7. The thesis line may stay on screen (it is the one moment master §2.3's *"un concepto que merece pantalla propia"* can be argued to cover) but it must be **earned by an image** — it should be the last thing to appear, after the convergence, not the first. `HomePlus los conecta.` should be **removed**; its job belongs to the phone frame appearing around the convergence (master §10 F5).
- **RATIONALE:** A thesis the audience reads before they have seen the evidence reads as a claim, not a conclusion. The current order inverts the argument: assertion first, evidence never.

---

### **F-04 — Scene F has no relation layer, so "todos relacionados entre sí" is unsupported**

- **SCENE:** F
- **CURRENT STATE(S):** all 3
- **SCRIPT MOMENT:** L292 *"Todos relacionados entre sí."*
- **MASTER INTENT:** §10 F3 · NO-UI §12 F05 — six **exact** relations: `persona→responsabilidad`, `responsabilidad→fecha`, `persona→ubicación`, `gasto→archivo`, `fecha→responsabilidad`, `persona→gasto`
- **CURRENT RUNTIME EVIDENCE:** Zero lines, zero nodes, zero relations in any S11 state. 8 DOM nodes total.
- **CLASSIFICATION:** `NARRATIVE` + `VISUAL`
- **SEVERITY:** `HIGH` (subsumed by F-01; recorded separately because it is the one beat with an exact frozen specification, and therefore the cheapest to implement correctly)
- **VERDICT:** **FAIL.**
- **TARGET BEHAVIOUR:** Six thin lines between the six abstraction nodes, appearing as one auto microsequence. No ERD, no node graph, no glowing network.
- **RATIONALE:** This is the single most precisely specified beat in the entire session — the master froze the exact six relations — and it is entirely absent.

---

### **F-05 — Scene F ends on text, so there is no shared element to hand to Scene G**

- **SCENE:** F (transition)
- **CURRENT STATE(S):** `S11_step02` → `S12_step00`
- **SCRIPT MOMENT:** L298 → L304
- **MASTER INTENT:** §10 F5 *"aparecen bordes de teléfono y descubrimos HomePlus. Final: un solo teléfono HomePlus."* · §11 G0 *"Teléfono HomePlus centrado."* · §2.9 *"una pantalla central = foco de producto"*
- **CURRENT RUNTIME EVIDENCE:** `S11_step02` = centred 56 px text on `#060404`. `S12_step00` = a 460 px card at the left (`Frontend / La app que usás / React Native / Expo`) on `#060404`. Measured `S11_step02 → S12_step00`: 0 animating elements, 32 entering / 8 exiting — a hard cut. No shared element, no reframe, no device.
- **CLASSIFICATION:** `NARRATIVE`
- **SEVERITY:** `HIGH`
- **VERDICT:** **FAIL.** The F→G handoff is currently a hard cut between two unrelated typographic compositions.
- **TARGET BEHAVIOUR:** See §8. The convergence at F-B6 must resolve into a phone frame; that phone is then the shared element that G00 holds on to.
- **RATIONALE:** This is the transition-level consequence of F-01. It is recorded separately because it has its own fix (the shared element) that survives even if F-B2…F-B4 are implemented in a different order.

---

## 6. Continuity positives

### F-P1 — The black entry is a correct use of black
`S11_step00` is flat `#060404` with nothing on it. Master §2.2 lists four valid uses of black; this is use 2, *"reset entre capítulos"*, and it follows directly after the emotional close of Scene E. **KEEP.** Do not let a later pass "fill" it for the sake of content. The fix for F-02 is to stop spending a press on it, not to stop having it.

### F-P2 — The thesis line is excellently set
120 px, `line-height 1.04`, `letter-spacing -0.03em`, weight 600, centred, on a genuinely empty field (`s11-bridge.css:18-31`). At 1.5× projection that is 180 px physical; at 2.3× it is 276 px. This is the strongest single piece of typography in the block and it is correct for a thesis. **KEEP.** The problem is what surrounds it, not the setting.

### F-P3 — The scene is honest about its own emptiness
There is no decorative filler. No ambient glow, no network lines, no iconography, no invented objects. The restraint is real. **KEEP** — and it is exactly the restraint that makes F-01 so legible as a defect: there is nothing to blame but the absence.

### F-P4 — The stage background is consistent
`#060404` across `s07`…`s18` (verified: `s07-silence.css`, `s08-scene.css`, `s09-scene.css`, `s10-scene.css`, `s11-bridge.css`, `s12-layers.css`, `s13-stack.css`, `s14-barrier.css`, `s15-homi.css`, `s16-homi.css`, `s17-homi.css`, `s18-closing.css`). **KEEP.**

### F-P5 — The scene is fully state-driven and reversible
`data-first` / `data-second` on `.s11-bridge` (`index.tsx:8-9`) with pure CSS transitions; Session 1 §6 confirms 0/85 visible-level differences between forward and backward traversal for S11. **KEEP** — this is the correct implementation pattern and should be the template for the rebuilt scene.

---

## 7. Continuity target choreography

**State budget.** 6 beats → **6 states** (F-B1…F-B6). 20 spoken lines / 6 states = **3.33 lines per state**, essentially equal to the global mean of 3.14 — i.e. the scene gets *average* support per line, which is right for a thesis scene that earns its line count with images rather than with text. This is **+3 states** over the current 3.

**Reuse set — the minimum necessary, per NO-UI §12 F01–F03 + F04.** Six objects, chosen because they map 1:1 onto the six spoken abstractions and because all six are already built:

| # | Object returns | Built at | Relation it demonstrates | Enters | Exits / merges |
|---|---|---|---|---|---|
| 1 | **Juli / colegio** (Educación Física) | `S04` | → `PERSONA` | F-B2 | converges F-B5, gone F-B6 |
| 2 | **Entrenamiento `18:00→20:00`** | `S06` | → `FECHA / HORARIO` | F-B2 | converges F-B5, gone F-B6 |
| 3 | **Cumpleaños** (`Cumpleaños · Sábado`) | `S08` | → `RESPONSABILIDAD` | F-B2 | converges F-B5, gone F-B6 |
| 4 | **Club** (map pin) | `S06` | → `UBICACIÓN` | F-B2 | converges F-B5, gone F-B6 |
| 5 | **Supermercado** (`Supermercado · $XX.XXX`) | `S09` | → `GASTO` | F-B2 | converges F-B5, gone F-B6 |
| 6 | **Garantía PlayStation** (`Garantía PlayStation 5.pdf`) | `S10` | → `ARCHIVO` | F-B2 | converges F-B5, gone F-B6 |

**Do not bring back:** the shopping list, the internet payment, the PlayStation asset card, the birthday album, the Feed message, the map surface, the Planner tasks. Master §2.5 lists several of these as mandatory shared elements — they are mandatory **where they are the subject**, not here. Six is the minimum that covers all six abstractions; a seventh object dilutes the 1:1 mapping that makes the scene legible.

**The six relations are frozen by NO-UI §12 F05 and must not be redesigned:**
`persona→responsabilidad` · `responsabilidad→fecha` · `persona→ubicación` · `gasto→archivo` · `fecha→responsabilidad` · `persona→gasto`

| BEAT | SPEAKER MOMENT | CURRENT | TARGET | ACTION |
|---|---|---|---|---|
| **F-B1** | L275–277 *"Y si se fijan, no inventamos ninguna situación rara."* | `S11_step00`: flat black, 8 DOM nodes, nothing visible | Black hold, **established by the scene-entry transition, not by a dedicated state** | **RETIME** |
| | | | **Visible:** black. **Enters:** nothing. **Exits:** nothing. **Moves:** nothing. **Stays still:** everything. **Dims:** —. **Foreground:** —. **Transition family:** `SPATIAL_WIPE` from S10's product stage to black. **Trigger:** the S10→S11 scene change (auto, not a content press). |
| **F-B2** | L278–283 *"Hablamos del colegio, de un entrenamiento que cambia, de hacer las compras, pagar Internet, que ande mal la play o preparar un cumpleaños."* | **no state** | The six real objects enter together as one irregular constellation | **REPLACE** |
| | | | **Visible:** black → six objects. **Enters:** Juli/colegio, Entrenamiento 18–20, Cumpleaños, Club, Supermercado, Garantía PlayStation — all six, simultaneously, staggered 50–100 ms (total < 500 ms). **Exits:** nothing. **Moves:** each settles from 12 px below. **Stays still:** the black field. **Dims:** —. **Foreground:** the constellation. **Layout:** irregular, **not** a 3×2 grid (master §10 F1). **Scale:** each object large enough to read at projection — no object below ~180 px wide. **Transition family:** `ACCUMULATE`. **Trigger:** **MANUAL** (new spoken idea). |
| **F-B3** | L285–292 *"eso significa personas, fechas, responsabilidades, ubicaciones, gastos y archivos. Todos relacionados entre sí."* | **no state** | Objects drop to 40–50 % exposure; six labels emerge derived from them; six thin relations draw | **REPLACE** |
| | | | **Visible:** six objects at 40–50 %, six labels, six lines. **Enters:** six labels (`PERSONA`, `FECHA`, `RESPONSABILIDAD`, `UBICACIÓN`, `GASTO`, `ARCHIVO`) — each label emerges **from its own object**, not from a list; then six thin lines draw in the frozen order. **Exits:** nothing. **Moves:** labels rise 8 px; lines `scaleX 0→1`. **Stays still:** the six objects (dimmed). **Dims:** objects 100 % → 40–50 %. **Foreground:** labels + lines. **Transition family:** `REFRAME` for the dim, `SPATIAL_WIPE` for the lines. **Trigger:** **MANUAL** for the dim + label emergence; the six lines are an **AUTO** microsequence (one indivisible physical story — "they are related" — and six clicks of nothing). |
| **F-B4** | L294 *"Para una familia siguen siendo cosas de todos los días."* | **no state** | 3–4 everyday echoes return over the structure; abstraction sits behind/below | **RECOMPOSE** |
| | | | **Visible:** 3–4 of the six objects return to ~85 % over the dimmed structure. **Enters:** Juli, Cumpleaños, Supermercado, Garantía (the four most human). **Exits:** the other two. **Moves:** nothing. **Stays still:** labels + lines, now at ~30 %. **Dims:** returning objects 40 % → 85 %; structure 50 % → 30 %. **Foreground:** the everyday objects. **Transition family:** `ACCUMULATE`. **Trigger:** **MANUAL**. |
| **F-B5** | L296 *"Por eso la vida no ocurre separada en módulos."* | `S11_step01`: `La vida no pasa / por módulos.` 120 px centred on black | The elements converge toward centre and begin to define a single vertical surface; the thesis line appears **last**, over the convergence | **RECOMPOSE** |
| | | | **Visible:** the convergence + one line of type. **Enters:** the thesis line, at 120 px, centred, **after** the convergence has landed. **Exits:** the individual objects as separate entities. **Moves:** all elements travel toward the centre along short paths (< 1/3 screen, per motion-design's distance rule). **Stays still:** nothing. **Dims:** the field. **Foreground:** the emerging vertical surface. **Transition family:** `REFRAME` (600–1000 ms, master §2.8 "transformación importante"). **Trigger:** **MANUAL** for the convergence; the line is an **AUTO** beat 400–600 ms after the convergence settles, so it lands on the last word rather than on the press. |
| **F-B6** | L298 *"Y HomePlus tampoco debería sentirse así."* | `S11_step02`: `HomePlus los conecta.` 56 px centred on black | Phone frame appears around the convergence; final = one HomePlus phone. **Remove `HomePlus los conecta.`** | **REPLACE** |
| | | | **Visible:** one phone frame, HomePlus open inside. **Enters:** the device frame, drawing in around the convergence over 600–900 ms. **Exits:** the thesis line (fades 250–300 ms, `ease-in`, faster than it entered). **Moves:** nothing. **Stays still:** the convergence, now inside the frame. **Dims:** —. **Foreground:** the phone. **Transition family:** `SPATIAL_WIPE`. **Trigger:** **MANUAL**. |

**Trigger budget.** 6 manual triggers + 2 auto microsequences (the six relations; the thesis line after the convergence). Master §2.10 target is *"no más de 1 trigger manual por microsecuencia"* — met.

**What this fixes.** F-01 (all four missing beats), F-02 (the black is no longer a dead press), F-03 (the thesis line is earned and `HomePlus los conecta.` is gone), F-04 (the six frozen relations), F-05 (the phone frame is the shared element for F→G).

---

## 8. F → G transition audit

**Current shape.** `S11_step02` → `S12_step00`: 0 animating elements, 32 entering / 8 exiting — a hard cut. S11 ends on centred 56 px text; S12 opens on a 460 px card at the left edge. No shared element, no reframe, no device, no spatial continuity.

**What the transition must do.** The audience moves from *what HomePlus connects* to *how HomePlus is built*. Master §11 G0 freezes the entry: *"Teléfono HomePlus centrado. Durante la frase introductoria de Benja no hacer nada."* So the master's own answer to this transition is already written: **the phone is the shared element.** Scene F ends on the phone (F-B6); Scene G opens on the same phone, centred, unchanged, while Benja speaks. Nothing moves. That is the entire transition, and it is currently impossible because F-B6 does not exist.

**Adjudication of the three candidate families:**

| Family | Verdict | Why |
|---|---|---|
| **SHARED ELEMENT** | **REQUIRED** | Master §11 G0 freezes it verbatim. It is also the only family that costs zero new motion and gives the audience a stable anchor across the boundary. |
| **EDITORIAL REFRAME** | Rejected as the primary | There is nothing to reframe — S11 has no spatial composition to reframe. |
| **DEVICE TRANSITION** | Rejected | Master §2.9: *"no simular una transición imposible dentro de la app para ahorrar tiempo."* A device move here would be a fake navigation. |

**Target.** F-B6 lands on a centred phone. G00 holds that phone, centred, at 100 % exposure, for the whole of L304 (*"Aunque antes de hablar de las tecnologías, hay dos conceptos…"*). The first movement in Scene G is the phone moving to the left third at *"Por un lado está el frontend"* — not before.

**Additional defect at the boundary.** S10 ends with the device at `x = 718` (right third) showing HomeCloud Recuerdos, with the left ~55 % of the stage empty (measured `S10_step04`, S1 §3 row 51). That empty left third is where the F-B6 phone should have been able to sit. It is not a defect in S10 — master §9 E9 deliberately leaves the left side open for the garantía/foto composition — but it means the S10→S11 handoff has no spatial preparation either. → **T-01, HIGH.**

---

## 9. Spoken-beat map — G

Speaker: **Benja**, script L302–L326. 13 spoken lines (S1 §10.2) against 7 states (S12 3 + S13 4) = **1.86 lines per state**, against a global mean of 3.14. **Scene G is the least dense scene in the film by this measure — and it is still failing.** That is the central fact of this audit: the problem is not that there are too few states, it is that the states that exist are spent on the wrong content.

| BEAT | SCRIPT (line) | INTENDED IDEA | EXPECTED VISUAL SUPPORT | CURRENT STATE(S) | HAS STATE? |
|---|---|---|---|---|---|
| **G-B1** | L304 *"Aunque antes de hablar de las tecnologías, hay dos conceptos que ayudan a entender cómo está construida una aplicación."* | **Framing and deferral.** Technologies are explicitly postponed | Phone centred, nothing moving, no technology visible (Master §11 G0; NO-UI §13 G00) | `S12_step00` — a card reading `Frontend / La app que usás / React Native / Expo` | ✘ wrong content (G-02) **BLOCKER** |
| **G-B2** | L306 *"Por un lado está el frontend, que es todo lo que vemos y usamos: las pantallas, botones, menús y la forma en que se muestra la información."* | The frontend, defined by **four concrete things** | Real UI; isolate pantalla → botón → menú → información (Master §11 G1; NO-UI §13 G02–G04) | `S12_step00`–`S12_step02` — the same card, plus a second card, plus a line | ✘ (G-03) **BLOCKER** |
| **G-B3** | L308 *"Y por otro está el backend, que trabaja detrás: recibe lo que hacemos, valida la información, la guarda o la busca y devuelve un resultado."* | The backend, defined by **five verbs** | Backend plane emerges from behind the phone; `RECIBE → VALIDA → RELACIONA → GUARDA/BUSCA → DEVUELVE` (Master §11 G2; NO-UI §13 "Backend language") | `S12_step01` — a card reading `Backend / Datos y servicios / Node.js / Supabase / PostgreSQL` | ✘ (G-04) **BLOCKER** |
| **G-B4** | L310 *"Por ejemplo, cuando registramos un gasto, el frontend es la pantalla donde ponemos el monto. El backend recibe ese dato, comprueba que sea válido, lo relaciona con la persona y el hogar correspondiente y lo guarda."* | **The one concrete transaction.** The most important beat in the scene | Frontend + backend simultaneously; an amount travels behind the frame; four backend operations; result returns (Master §11 G3; NO-UI §13 "Gasto demo") | **none** | ✘ (G-05) **BLOCKER** |
| **G-B5** | L314 *"Para construir el frontend de HomePlus usamos React Native y Expo."* | Frontend technologies | Figma → React Native → Expo, in the spoken order, as design → implementation (Master §11 G4; NO-UI §13 "Tecnologías") | `S13_step01` — role captions `Interfaz móvil`, `Build y preview` appear under the two logos | ✔ partial (G-06, G-10) |
| **G-B6** | L316 *"y en el Backend, Node.js se encarga de parte de la lógica y los servicios, mientras que Supabase y PostgreSQL nos permiten manejar la identidad y guardar información…"* | Backend technologies | Node → Supabase → PostgreSQL, in the spoken order | `S13_step02` — role captions `API y lógica`, `Auth y datos`, `Base de datos` | ✔ partial (G-06) |
| **G-B7** | L318 *"Y antes de programar las pantallas usamos Figma, para diseñar y probar cómo queríamos que funcionara la experiencia."* | Figma — chronologically first | Figma shown as a **pre-implementation design** tool, linked to the frontend (Master §11 G4; NO-UI §13) | `S13_step03` — Figma appears in the **centre column**, after five other technologies | ✘ (G-10) HIGH |
| **G-B8** | L320 *"también usamos modelos de inteligencia artificial en algunas partes del sistema."* | AI | One restrained block; no provider logo (Master §4 OPEN; NO-UI §13 "solo logos reales") | `S13_step03` — `IA` label + generic glyph, inside an orange glow | ✘ (G-12) **BLOCKER** |
| **G-B9** | L322 *"Son piezas bastante distintas."* | Separation | Small visual separation between the pieces | `S13_step03` — the core glow appears | ✘ (G-14) HIGH |
| **G-B10** | L324–326 *"Pero para alguien usando HomePlus ninguna debería sentirse separada. Tiene que sentirse como una sola experiencia."* | **Recomposition.** The closing argument of the block | Backend + Node/Supabase/Postgres retreat behind the phone; React Native/Expo converge to the surface; Figma dissolves to the design layer; IA integrates; lines disappear; phone returns to centre and grows slightly (Master §11 G5) | **none** | ✘ (G-15) **BLOCKER** |

**Beat arithmetic.** 10 beats against 7 states. **Four beats have no state at all** (G-B1, G-B4, G-B9, G-B10) and two more are present but wrong (G-B2, G-B3). The states that do exist are spent on: a card, a second card, a decorative line, a duplicate of the previous composition, two sets of role captions, and a centre column.

**The decisive observation.** Scene G has **the right number of states and the wrong allocation of them.** 7 states for 10 beats is close; the correct move is to reallocate, not to add. See §17.

---

## 10. Frontend deep audit

### G-F1. Does the current visual start from the actual product experience?

**No.** There is no product experience on stage. Zero phone frames across all 15 states of S11–S14 (S1 §5.1). S12's "frontend" is a 460 px rounded card with a title, a subtitle and two logos. The audience is being told what a frontend is while looking at a PowerPoint card about a frontend.

### G-F2. When the speaker says *pantallas, botones, menús, información*, does the screen provide concrete visual evidence?

**No.** Zero evidence for any of the four. The four words are delivered over a static card. Master §11 G1 is explicit: *"no zoom de cámara. Hacer scales rápidos sobre componentes exactos: superficie/pantalla 108 %; botón 115 %; navbar/menú 110 %."* NO-UI §13 G02–G04 goes further: *"Targets configurables para: screen/surface, button, navbar/menu. No mostrar palabras grandes. Solo scale del elemento real cuando exista UI."* Neither is implemented. → **G-03, BLOCKER.**

### G-F3. Should the phone remain central initially?

**Yes — and it should be there at all.** Master §11 G0: *"Teléfono HomePlus centrado. Durante la frase introductoria de Benja no hacer nada."* NO-UI §13 G00: *"Phone central. Sin movimiento mientras Benja introduce."* Both freezes agree. The phone is also the only element that can carry the F→G handoff (§8) and the only element that can make the backend "behind" something (§11). Its absence is the root cause of G-01.

### G-F4. Can existing real UI elements become temporarily emphasized without inventing giant labels?

**Yes, and the components already exist.** The package contains real, faithful reconstructions of Home (`product-home-layer`), Planner (`s08-screen-stack`), Finance (`s09-screen-fill`) and HomeCloud (`s10-screen-stack`), all of which have already been on stage. Master §11 G1's three targets — screen/surface, button, navbar/menu — are all present in those surfaces. The correct implementation is a **local visual scale on the real component inside the real device** (the technique Session 2 identified as `--home-stage-focus-scale: 1.02`, S1 errata), not a card with a label. Note the constraint: Session 1 §5.2 confirms the largest non-stage transform anywhere in the deck is 1.018, so a 108/115/110 % emphasis is well inside what the deck already does and will not break the "no local focus zoom" finding.

### G-F5. Does current S12 rely too much on explanatory text?

**Yes, entirely.** S12's visible text is `Frontend · La app que usás · React Native · Expo · Backend · Datos y servicios · Node.js · Supabase · PostgreSQL` (`data/text-table.md:58-60`). Every one of those words is either a label the speaker is already saying or a technology the speaker has not reached yet. There is no explanatory text that earns its place; there is only labelling.

### G-F6. Does the scene visually distinguish WHAT THE USER SEES from WHAT HAPPENS BEHIND?

**No — and it cannot, because neither exists.** The two cards are visually identical: same 460 px width, same padding, same border, same radius, same background, same title size, same subtitle size, same logo size, same list gap (`s12-layers.css:20-46` vs `s13-stack.css:33-40`). The only differences are the words and the logos. So the scene presents "frontend" and "backend" as two identical boxes with different contents, which is precisely the *"random boxes with arrows"* the brief forbids. The distinction the script asks for — visible vs hidden, in front vs behind — has no visual encoding whatsoever. → folded into **G-01 / G-04**.

---

## 11. Backend deep audit

### The backend must not become a server rack, terminal, code rain, database cylinder, or random boxes with arrows

**It does not — and that restraint is correct and must be preserved.** There is no server imagery, no terminal, no code rain, no cylinder. The backend is a card with three logos. **KEEP this restraint** when the verb language is added; the failure is absence of meaning, not presence of cliché.

### The master's proposed semantic backend language

Master §11 G2: `RECIBE → VALIDA → GUARDA/BUSCA → DEVUELVE`. NO-UI §13 "Backend language" expands it to five: `RECIBE`, `VALIDA`, `RELACIONA`, `GUARDA / BUSCA`, `DEVUELVE`, at *"Tipografía: 26–32 px. Jerarquía mediante estado activo, no tamaño gigante."*

**This remains the strongest available visual model and is confirmed as the target.** It is a verb sequence, not a diagram; it encodes an order; it is legible to a non-technical audience; and it is exactly what the script enumerates at L308. It is also **entirely absent**: `RECIBE`, `VALIDA`, `RELACIONA`, `GUARDA`, `DEVUELVE` return **0 matches** across all of `src/` (verified by direct search this session). → **G-04, BLOCKER.**

### Order, amount of text, spatial relation, pacing, triggers

| Question | Finding |
|---|---|
| **Order** | The verbs must appear in the spoken order: `RECIBE → VALIDA → RELACIONA → GUARDA/BUSCA → DEVUELVE`. Currently no order exists. |
| **Amount of text** | Five short verbs at 26–32 px (NO-UI §13). Nothing else. No paragraph, no bullet list, no caption. |
| **Spatial relation** | The backend plane must sit **behind** the phone, emerging to the right (master §11 G2: *"backend sale desde detrás del teléfono hacia la derecha"*; NO-UI §13 G05: *"Backend sale LITERALMENTE desde detrás del teléfono hacia derecha"*). Currently it is a card at the same depth as the frontend card. |
| **Pacing** | The five verbs are one indivisible physical story — a datum arriving, being checked, being related, being stored, being returned. They should be **one auto microsequence**, not five clicks. |
| **Triggers** | **One MANUAL** trigger (the emergence of the backend plane) launching **one AUTO** microsequence (the five verbs). Master §2.10: *"no más de 1 trigger manual por microsecuencia."* |

### Should each phase have a separate trigger?

**No.** Five clicks for five verbs is five clicks of nothing — each press would illuminate one word. That is the *"click for every small animation"* pattern master §2.10 exists to prevent, and it is also the *"Animation Circus"* anti-pattern from the presentation-design skill. The verbs are a single causal chain; they should read as one.

### Should some phases be an automatic microsequence?

**Yes — all of them, as one.** The exception is `RELACIONA`, which the script gives a specific content to (*"lo relaciona con la persona y el hogar correspondiente"*). That content — two small chips reading `Persona` and `Hogar` appearing next to the verb — is the one phase that benefits from being visible slightly longer, and it is the one place where a beat of dwell is earned.

---

## 12. Frontend ↔ Backend transaction audit

### The master's example

Master §11 G3 and NO-UI §13 "Gasto demo" both specify the same transaction, and both specify the same datum: **`$48.720`**. The choreography is frozen:

> Frontend muestra `Nuevo movimiento`. Se introduce `$48.720`. El dato se achica, **entra detrás del teléfono** y reaparece del lado backend. Backend: 1. RECIBE; 2. VALIDA ✓; 3. asocia persona + hogar; 4. GUARDA. Respuesta vuelve al frontend. Confirmación realista: movimiento guardado.

### Current state

**The transaction does not exist.** `48.720` returns **0 matches** in `src/`. S12 has 3 states and none of them contains an amount, a form, a movement or a confirmation. The two routes that the human walkthrough saw (`Home→Planner→Tareas→+` and `Home→PS5→Documentos`) are in **S14**, not S12 — and they are navigation paths, not a transaction. → **G-05, BLOCKER.**

### Does the `$48.720` example remain strong against the current script, the Finance story already shown, and current product semantics?

**Yes — it is the strongest available example, and it is better than any alternative:**

1. **It is the script's own example.** L310 says *"cuando registramos un gasto, el frontend es la pantalla donde ponemos el monto."* The transaction is not an invention; it is the illustration the speaker is already using.
2. **It is the one example where the frontend/backend split is physically obvious.** A number the user typed disappears behind the device and comes back validated. That is the entire concept of a backend, demonstrated.
3. **It uses a module the audience has already seen.** Finance ran as S09, five scenes earlier, with `Internet · Pagado · $38.450` and `Seguro del auto · $62.800` on stage (`financeData.ts:13-14`). The audience has a mental model of Finance to attach the transaction to.
4. **The entry surface is real in the product.** `front/mi-front-limpio/components/finance/NewMovementSheet.tsx:996` renders `title="Nuevo movimiento"`; `:1181` renders a `Monto` field; `:1192` a description placeholder (`Supermercado, farmacia, alquiler`); `:773` validates *"Ingresa un monto mayor que cero."* So the surface is not a fabrication — it simply has not been reconstructed for the presentation.
5. **The amount is a demo value, not a product claim.** Master §3 marks the PlayStation figure as *"salvo que se cambie globalmente"*; the same applies here. `$48.720' is presentation demo data and must be labelled as such in the handoff, not presented as a real household figure.

### The one obstacle, stated honestly

**The presentation's Finance reconstruction has no entry surface.** `app-screens/FinanceDemoScreen/financeData.ts:1` defines `financeTabs = ['Resumen', 'Movimientos', 'Pagos']` — three tabs, no form. The S09 surface (`s09-screen-fill`) shows a hero balance, two payment rows and two categories. So the transaction cannot be staged by reusing an existing on-stage surface; **a `Nuevo movimiento` surface must be built**, modelled on `NewMovementSheet.tsx`. This is new work, and it is the single largest implementation item in Scene G. It is recorded as an open question (§34) because the amount and the exact field set are demo data that the product owner should confirm.

### If another already-seen datum were better, it should be used instead

Considered and rejected:

| Candidate | Why rejected |
|---|---|
| `Internet · Pagado · $38.450` (`financeData.ts:13`) | Already **paid**. A datum that has already been validated cannot demonstrate validation. |
| `Seguro del auto · $62.800` (`financeData.ts:14`) | A **future** payment (`En 6 días`). Same problem, plus it is a scheduled obligation, not a registered expense. |
| The supermarket movement from S09 | It was registered **automatically** (master §8 D0: *"Shopping List purchase → gasto ya registrado"*). Using it would contradict the script's *"el frontend es la pantalla donde ponemos el monto"* — the user did not type anything. |
| A HomeCloud file | Demonstrates storage, not validation-and-return. Wrong beat. |

**Conclusion: keep `$48.720` and build the `Nuevo movimiento` surface.**

---

## 13. Tech stack ordering audit

### Exact script order (current script, L314–L320)

| # | Technology | Script line |
|---|---|---|
| 1 | **React Native** | L314 |
| 2 | **Expo** | L314 |
| 3 | **Node.js** | L316 |
| 4 | **Supabase** | L316 |
| 5 | **PostgreSQL** | L316 |
| 6 | **Figma** | L318 |
| 7 | **modelos de IA** | L320 |

### Current visual order

| State | What appears |
|---|---|
| `S12_step00` | React Native, Expo (logos, mono) |
| `S12_step01` | + Node.js, Supabase, PostgreSQL (logos, mono) |
| `S12_step02` | + decorative bridge line (no text) |
| `S13_step00` | identical to `S12_step02` (full remount) |
| `S13_step01` | + role captions `Interfaz móvil`, `Build y preview` |
| `S13_step02` | + role captions `API y lógica`, `Auth y datos`, `Base de datos` |
| `S13_step03` | + Figma (`Diseño`), IA (no caption) |

### Adjudication of the human walkthrough's suspicion

**The suspicion is correct in its conclusion and wrong in its attribution.**

- **Visual fact:** Figma first appears at `S13_step03` — after five other technologies and across three slides.
- **Spoken fact:** in the **current** script, Figma is also spoken **sixth** (L318). So visual order and spoken order **agree with each other**.
- **The disagreement is with the master.** Master §18's canonical script (L2002) puts Figma **first**: *"Para diseñar el frontend de HomePlus usamos Figma, donde primero definimos y probamos cómo queríamos que funcionara la experiencia. Después lo implementamos con React Native y Expo."* Master §11 G4's canonical copy is the same Figma-first wording. Master §18's patch list explicitly includes *"Figma queda integrado a la explicación del frontend."*
- **The current script file is newer than the master** (24/9/2026 vs 23/9/2026, verified by file timestamps). So this is a **live regression**, not an implementation lag.

**Therefore:** the technology order cannot be finally adjudicated until the script owner decides. Recorded as **SI-10**. → **G-06, HIGH** (order follows the current script; the script is the problem).

### The independent defect: Figma's spatial position

Regardless of when Figma is spoken, **where it is placed is wrong.** Figma sits in `.s13-center` — the centre column, spatially **between** the Frontend card and the Backend card (`S13Stack/index.tsx:65-75`). That position encodes an architectural claim: that Figma is a layer between frontend and backend. It is not. Figma is a **pre-implementation design tool**; it has no runtime existence and no relationship to the backend whatsoever.

Master §15 names this exact risk: *"G Stack | Implicar que Figma corre en producción | Figma siempre se muestra como etapa de diseño."* Master §11 G4: *"Figma aparece como herramienta previa/de diseño, relacionada con frontend. No representar Figma como runtime."* NO-UI §13: *"Figma: ligado al diseño previo del frontend."*

**Target:** Figma must be visually **attached to the frontend** — above, behind or beside the Frontend card, with a thin connector to it — and must never sit on the centreline between the two cards. → **G-10, HIGH.**

### AI representation

**No specific provider logo is shown, and that is correct.** `assets/tech/ai.svg` is a generic three-node hub glyph labelled `IA` with no caption. Given that Product Truth has **no** AI integration at all (§15, G-12), showing a provider logo would be a fabrication. **KEEP the restraint.**

**What is wrong** is the glyph and its treatment: a hub-and-spoke node diagram is the generic "neural network" cliché, and it sits inside an orange radial glow (§15, G-13). Both should go. The correct representation is typographic: the word `IA` in the same face and weight as the other labels, with a short plain-language role caption like the others have — and, ideally, no icon at all.

---

## 14. Technology visual-language audit

### Does each technology need LOGO, NAME, SHORT ROLE, or contextual presence?

| Technology | Current | Target | Action |
|---|---|---|---|
| **Figma** | colour logo + name + role `Diseño`, in the centre column | name + role, **attached to the frontend**, no runtime position | **RECOMPOSE** |
| **React Native** | logo + name + role `Interfaz móvil` | unchanged | **KEEP** |
| **Expo** | logo + name + role `Build y preview` | unchanged | **KEEP** |
| **Node.js** | logo + name + role `API y lógica` | unchanged, **plus** the script's *"parte de la lógica y los servicios"* — `API` is an addition the script does not make | **KEEP** + correct the caption |
| **Supabase** | logo + name + role `Auth y datos` | unchanged | **KEEP** |
| **PostgreSQL** | logo + name + role `Base de datos` | unchanged | **KEEP** |
| **IA** | generic hub glyph + name, **no role caption**, inside an orange glow | name + short role caption, no glyph, no glow | **REPLACE** |

### The role captions are the best thing in Scene G

`Interfaz móvil`, `Build y preview`, `API y lógica`, `Auth y datos`, `Base de datos` — five short, plain-language, non-technical phrases that tell a non-technical audience what each piece does. They are exactly what master §11 G4 and NO-UI §13 ask for, and they are the only moment in the entire block where the visual serves understanding rather than labelling. **KEEP ALL FIVE.** They should be preserved verbatim in any recomposition.

### Logo wall risk

**Currently a logo wall, and it must not become one.** Five logos plus two more, all at 52 px, in two identical cards, with a glow behind them — that is the *"PowerPoint tech stack"* the brief forbids. The fix is not to remove the logos but to **re-encode the relationships**: Figma attached to the frontend as a design stage; the backend three grouped as one services layer; IA integrated rather than floating. Master §11 G5's recomposition is the mechanism.

### Integration into the product

**The stack currently ends as an infographic floating forever, and that is wrong.** Master §11 G5 and NO-UI §13 "Recomposición" both require the layers to recombine into the phone: *"backend + Node/Supabase/Postgres retroceden detrás del teléfono; React Native/Expo convergen hacia la superficie; Figma se disuelve hacia la capa visual/diseño; IA se integra al sistema; líneas desaparecen; teléfono vuelve al centro y crece levemente."* The block currently ends on the densest, most separated composition it has — the exact opposite of its closing argument. → **G-15, BLOCKER.**

**Is the recomposition narratively appropriate here, or should it be reserved for the closing?** **Here.** The script's own closing lines of the block are *"Tiene que sentirse como una sola experiencia"* (L326). The recomposition is not a decorative flourish; it is the visual form of the sentence the speaker is delivering. Reserving it for the closing would leave the block's own argument unmade.

---

## 15. Scene G issue register

---

### **G-01 — The product is not on stage: zero device across all 7 states of Scene G**

- **SCENE:** G
- **CURRENT STATE(S):** `S12_step00`…`S12_step02`, `S13_step00`…`S13_step03` (all 7)
- **SCRIPT MOMENT:** whole block, L304–L326
- **MASTER INTENT:** §11 G0 *"Teléfono HomePlus centrado."* · G3 *"Mantener frontend y backend simultáneamente visibles."* · §2.9 *"una pantalla central = foco de producto"* · NO-UI §13 G00 *"Phone central."*
- **CURRENT RUNTIME EVIDENCE:** S1 §5.1 — `S11`, `S12`, `S13`, `S14`, `S18` have **no device**; 15 of those 19 states are in scope. S12's app surface is `none` in all 3 states (S1 §3 rows 55–57); S13's is `none` in all 4 (rows 58–61); S14's is `none` in all 5 (rows 62–66). The device last appears at `S10_step04` (`324×669.6 @718,25`) and next appears at `S15_step00` (`324×669.6 @718,25`).
- **CLASSIFICATION:** `NARRATIVE` + `TECHNICAL-STORY`
- **SEVERITY:** `BLOCKER`
- **VERDICT:** **FAIL.** This is the root cause of G-02, G-03, G-04 and G-05, and it is independently a defect: a frontend/backend explanation with no frontend and no backend.
- **TARGET BEHAVIOUR:** See §17. A real HomePlus device on stage from G00, carrying the whole scene.
- **RATIONALE:** Master §15 names the Scene G risk as *"Parecer clase de informática"* with the mitigation *"Concepto primero, tecnología después."* The concept cannot be shown without the product.

---

### **G-02 — All five vendor logos are on stage before the speaker has named a single technology**

- **SCENE:** G
- **CURRENT STATE(S):** `S12_step00`, `S12_step01`
- **SCRIPT MOMENT:** L304 *"Aunque antes de hablar de las tecnologías, hay dos conceptos que ayudan a entender cómo está construida una aplicación."* → L306 (frontend) → L308 (backend) → **L314** (first technology named)
- **MASTER INTENT:** §11 G0 *"Durante la frase introductoria de Benja no hacer nada."* · NO-UI §13 G00 *"Sin movimiento mientras Benja introduce."*
- **CURRENT RUNTIME EVIDENCE:** `S12_step00` visible text = `Frontend · La app que usás · React Native · Expo` (`data/text-table.md:58`). `S12_step01` visible text = `… · Backend · Datos y servicios · Node.js · Supabase · PostgreSQL` (`:59`). So at the moment the speaker says technologies come later, **two** logos are on stage; by the time he finishes defining the frontend, **five** are.
- **CLASSIFICATION:** `NARRATIVE` + `TIMING`
- **SEVERITY:** `BLOCKER`
- **VERDICT:** **FAIL.** The scene opens with the exact content the opening sentence defers.
- **TARGET BEHAVIOUR:** G00 = phone centred, nothing else, no logos, no labels, for the whole of L304. Logos enter only at G-B5.
- **RATIONALE:** This is the spoken↔visual contradiction the brief's quality bar names first: *"exact spoken ↔ visual alignment."* It also destroys the deferral that gives the conceptual explanation its value — if the logos are already there, the audience has nothing to wait for.

---

### **G-03 — The frontend is explained with no frontend: *pantallas, botones, menús, información* have zero evidence**

- **SCENE:** G
- **CURRENT STATE(S):** `S12_step00`…`S12_step02`
- **SCRIPT MOMENT:** L306
- **MASTER INTENT:** §11 G1 — *"no zoom de cámara. Hacer scales rápidos sobre componentes exactos: superficie/pantalla 108 %; botón 115 %; navbar/menú 110 %."* · NO-UI §13 G02–G04 — *"Targets configurables para: screen/surface, button, navbar/menu. No mostrar palabras grandes. Solo scale del elemento real cuando exista UI."*
- **CURRENT RUNTIME EVIDENCE:** No device, no UI component, no scale on any real element in any S12 state. The only motion in S12 is the Backend card entering (`S12_step00→01`, 1 animating element) and the bridge line + node (`S12_step01→02`, 2 animating elements) — `data/motion-summary.json`.
- **CLASSIFICATION:** `VISUAL`
- **SEVERITY:** `BLOCKER`
- **VERDICT:** **FAIL.**
- **TARGET BEHAVIOUR:** See §17, beat G-B2: one manual trigger, then one auto microsequence isolating the real screen surface (108 %), a real button (115 %) and the real navbar/menu (110 %), inside the real device.
- **RATIONALE:** The four words are the entire content of the sentence. Showing none of them makes the sentence unfalsifiable and the scene unteachable.

---

### **G-04 — The backend has no verb language: `RECIBE / VALIDA / RELACIONA / GUARDA / DEVUELVE` appear zero times**

- **SCENE:** G
- **CURRENT STATE(S):** `S12_step01`, `S12_step02`, `S13_step00`…`S13_step03`
- **SCRIPT MOMENT:** L308 *"recibe lo que hacemos, valida la información, la guarda o la busca y devuelve un resultado."*
- **MASTER INTENT:** §11 G2 — *"Secuencia conceptual: RECIBE → VALIDA → GUARDA/BUSCA → DEVUELVE. Activar cada paso con la frase correspondiente."* · NO-UI §13 "Backend language" — five verbs, 26–32 px, *"Jerarquía mediante estado activo, no tamaño gigante."*
- **CURRENT RUNTIME EVIDENCE:** Direct search of all `*.tsx`, `*.ts`, `*.css` under `src/` for `RECIBE`, `VALIDA`, `RELACIONA`, `GUARDA`, `DEVUELVE` (and lowercase `recibe`, `valida`, `guarda`, `devuelve`) returns **0 matches**. The backend's entire visible content is the label `Datos y servicios` plus three logos (`data/text-table.md:59-60`).
- **CLASSIFICATION:** `VISUAL` + `TECHNICAL-STORY`
- **SEVERITY:** `BLOCKER`
- **VERDICT:** **FAIL.** The backend is currently a label and three logos. The five verbs are the master's own solution to the exact problem the human walkthrough flagged (`HW-G-003`: *"no sé cómo hacer una representación del backend"*).
- **TARGET BEHAVIOUR:** See §11 and §17, beat G-B3.
- **RATIONALE:** A backend that is only named cannot be understood. The verb sequence is the difference between a diagram and an explanation.

---

### **G-05 — The one concrete transaction of the block does not exist**

- **SCENE:** G
- **CURRENT STATE(S):** all 7
- **SCRIPT MOMENT:** L310
- **MASTER INTENT:** §11 G3 (full choreography frozen) · NO-UI §13 "Gasto demo" (full choreography frozen, `$48.720`)
- **CURRENT RUNTIME EVIDENCE:** `48.720` returns **0 matches** in `src/`. No amount, no form, no movement, no confirmation in any S12/S13 state. The presentation's Finance reconstruction has no entry surface: `financeData.ts:1` = `['Resumen', 'Movimientos', 'Pagos']`.
- **CLASSIFICATION:** `NARRATIVE`
- **SEVERITY:** `BLOCKER`
- **VERDICT:** **FAIL.** Master §15 calls this beat *"el ejemplo es el beat más importante de la escena."*
- **TARGET BEHAVIOUR:** See §12 and §17, beat G-B4.
- **RATIONALE:** Without the transaction, the backend verbs have nothing to act on. The verbs describe a mechanism; the transaction is the proof the mechanism works.

---

### **G-06 — Technology order follows the current script, which regresses the master's canonical order**

- **SCENE:** G
- **CURRENT STATE(S):** `S12_step00`…`S13_step03`
- **SCRIPT MOMENT:** L314–L320
- **MASTER INTENT:** §18 canonical script L2002 (Figma **first**) · §11 G4 canonical copy (Figma first) · §18 patch list *"Figma queda integrado a la explicación del frontend"*
- **CURRENT RUNTIME EVIDENCE:** Visual order = React Native, Expo → Node.js, Supabase, PostgreSQL → Figma → IA. This **matches** the current spoken order and **contradicts** the master's canonical spoken order. The current script file (24/9/2026) is newer than the master (23/9/2026).
- **CLASSIFICATION:** `SCRIPT ISSUE` (`SI-10`)
- **SEVERITY:** `HIGH`
- **VERDICT:** **INDETERMINATE — blocked on `SI-10`.** The visual order is internally consistent with the current script; the script is what regresses the master.
- **TARGET BEHAVIOUR:** Once `SI-10` is resolved: if the master's canonical order is restored, Figma moves to the front of the sequence and the visual order follows. If the current script stands, the visual order is already correct and only G-10 (spatial position) needs fixing.
- **RATIONALE:** A presentation cannot be adjudicated against two different spoken orders. This must be resolved by the script owner before Scene G is rebuilt.

---

### **G-07 — The horizontal bridge line is decorative and survives into S14 as an unexplained mark**

- **SCENE:** G
- **CURRENT STATE(S):** `S12_step02`, `S13_step00`…`S13_step03`, `S14_step00`…`S14_step03`
- **SCRIPT MOMENT:** none — the script never asks for a line between frontend and backend
- **MASTER INTENT:** §11 G3 — the connection between frontend and backend is a **datum travelling**, not a line: *"El dato se achica, entra detrás del teléfono y reaparece del lado backend."*
- **CURRENT RUNTIME EVIDENCE:** `.s12-bridge` = 140×120 px, a 2 px gradient line (`transparent → accent 30 % → 70 % → transparent`) plus a 14 px ringed node (`s12-layers.css:93-133`). It carries no data, moves nothing, and is never explained. It is duplicated into S13 (`.s13-bridge`, `s13-stack.css:185-213`) and survives into S14 inside `.s14-echo`, where at `S14_step03` it crosses the vertical barrier line to form a meaningless `+` at the centre of the composition.
- **CLASSIFICATION:** `MOTION` + `VISUAL`
- **SEVERITY:** `MEDIUM`
- **VERDICT:** **FAIL.** Classified `REDUNDANT` / `DISTRACTING` in §28.
- **TARGET BEHAVIOUR:** Remove the line and node entirely. The connection between frontend and backend is the travelling datum (G-B4), which is both more honest and more explanatory.
- **RATIONALE:** Master §16 rule 13: *"¿Una animación llama más atención que el concepto? Simplificar."* A permanent decorative line between two cards is a diagram convention, not an explanation.

---

### **G-08 — The S13→S14 boundary replays the entire stack at full brightness**

- **SCENE:** G (transition)
- **CURRENT STATE(S):** `S13_step03` → `S14_step00`
- **SCRIPT MOMENT:** L327–L331
- **MASTER INTENT:** §12 H0 — *"Teléfono HomePlus central. `incluso con todo esto conectado…`: sin cambio."*
- **CURRENT RUNTIME EVIDENCE:** `S14Barrier/index.tsx:13-15` renders `<S13Stack stepIndex={3} />` inside `.s14-echo`. Measured `S13_step03 → S14_step00`: **0 animating elements, 88 entering / 57 exiting** — a pure cross-mount. Because it is a fresh mount, every entrance animation re-runs: `s13-panel-in` (500 ms, `backwards` fill, `opacity 0→1` + `translate 0 14px→0` + `scale .983→1`), `s13-role-in` (420 ms, 70 ms stagger), the centre items, and the bridge firming (`opacity .8→1`, node `scale 1→1.15`). Echo opacity at step 0 is **1** (`s14-barrier.css:24`). Visible text at `S14_step00` is byte-identical to `S13_step03` (`data/text-table.md:64-65`).
- **CLASSIFICATION:** `MOTION` + `NARRATIVE`
- **SEVERITY:** `HIGH`
- **VERDICT:** **FAIL.** The audience watches the whole stack assemble itself twice, at full brightness, back to back. This is the measured mechanism behind `HW-G-008`'s *"parpadea todo."*
- **TARGET BEHAVIOUR:** S14 must not re-mount S13. Either S14 reuses the already-mounted stack and only changes exposure, or the stack is unmounted and S14 starts from the phone alone. The echo should be a **dimming of an existing composition**, never a rebuild of it.
- **RATIONALE:** Master §2.10: *"Las entradas de múltiples objetos, scrolls, transformaciones y recorridos deben estar automatizados dentro del estado."* A full remount that replays 88 entrance animations is the opposite of that.

---

### **G-09 — `S13_step00` is a duplicate of `S12_step02` and a dead press**

- **SCENE:** G
- **CURRENT STATE(S):** `S13_step00`
- **SCRIPT MOMENT:** L312 marker `[aca va la de tecnologias]`
- **MASTER INTENT:** §11 G4 — the technology beat is a **new idea** and deserves its own state
- **CURRENT RUNTIME EVIDENCE:** Visible text at `S13_step00` is identical to `S12_step02` (`data/text-table.md:60` vs `:59` — same nine strings). Measured `S12_step02 → S13_step00`: 0 animating elements, 51 entering / 28 exiting — a full remount of the same composition, which re-runs the panel entrance animations.
- **CLASSIFICATION:** `MOTION` + `TIMING`
- **SEVERITY:** `HIGH`
- **VERDICT:** **FAIL.** A press that produces no new information and re-plays the previous composition's entrance.
- **TARGET BEHAVIOUR:** Delete the state. S13's first state should be the one that adds the first new information (the role captions), not a replay of S12's last.
- **RATIONALE:** Same reasoning as F-02. A dead press is a trigger spent on nothing.

---

### **G-10 — Figma is placed between frontend and backend, encoding a false architecture**

- **SCENE:** G
- **CURRENT STATE(S):** `S13_step03`, `S14_step00`…`S14_step03`
- **SCRIPT MOMENT:** L318
- **MASTER INTENT:** §11 G4 — *"Figma aparece como herramienta previa/de diseño, relacionada con frontend. No representar Figma como runtime."* · §15 — *"Implicar que Figma corre en producción | Figma siempre se muestra como etapa de diseño."* · NO-UI §13 — *"Figma: ligado al diseño previo del frontend."*
- **CURRENT RUNTIME EVIDENCE:** `S13Stack/index.tsx:65-75` — `.s13-center` is a flex child between the Frontend `<section>` and the Backend `<section>`, `width: 140px`, `align-self: stretch`. It contains Figma (top 12 %) and IA (bottom 12 %). So Figma sits on the centreline **between** the two cards, with no connector to either.
- **CLASSIFICATION:** `TECHNICAL-STORY`
- **SEVERITY:** `HIGH`
- **VERDICT:** **FAIL.** The position asserts that Figma is a layer between frontend and backend. It is a pre-implementation design tool with no runtime existence.
- **TARGET BEHAVIOUR:** Figma moves out of the centre column and attaches to the **frontend** — above, behind or beside the Frontend card, with a thin connector to it. IA moves with it or integrates into the system block.
- **RATIONALE:** A technical audience will read the centre position as an architecture claim and find it wrong; a non-technical audience will simply be confused about what Figma is for.

---

### **G-11 — IA and Figma arrive on the same press, though the script gives them two separate sentences**

- **SCENE:** G
- **CURRENT STATE(S):** `S13_step03`
- **SCRIPT MOMENT:** L318 (Figma) and L320 (IA) — two distinct spoken ideas
- **MASTER INTENT:** §11 G4 treats them as separate items; §2.10 requires grouping microbeats, not splitting ideas
- **CURRENT RUNTIME EVIDENCE:** Both appear at `stepIndex >= 3` (`S13Stack/index.tsx:65`). Measured `S13_step02→03`: **5 animating elements** — `.s13-core-glow`, `.s13-center`, the Figma item, `.s13-bridge`, and the IA item (the last with a 110 ms delay). Five simultaneous motions for five different spoken ideas.
- **CLASSIFICATION:** `TIMING` + `MOTION`
- **SEVERITY:** `HIGH`
- **VERDICT:** **FAIL.** Two spoken ideas, one press, five simultaneous motions.
- **TARGET BEHAVIOUR:** Figma gets its own press (G-B7). IA gets its own press (G-B8). Each is a new spoken idea and therefore a manual trigger.
- **RATIONALE:** This is the *"Animation Circus"* anti-pattern: when everything animates at once, nothing leads.

---

### **G-12 — The AI claim is unsupported by Product Truth, and the glyph is an AI cliché**

- **SCENE:** G
- **CURRENT STATE(S):** `S13_step03`, `S14_step00`…`S14_step03`
- **SCRIPT MOMENT:** L320 *"también usamos modelos de inteligencia artificial en algunas partes del sistema."*
- **MASTER INTENT:** §4 OPEN — *"Modelos/proveedores de IA que se mostrarán | Mostrar solo logos realmente usados."* · §2.8 — *"Sin rebotes, spring evidente, 3D innecesario, halos, lens flare, partículas ni 'AI glow'."* · NO-UI §13 — *"IA: solo logos reales/proveedores finalmente usados."*
- **CURRENT RUNTIME EVIDENCE:** `assets/tech/ai.svg` is a three-node hub glyph — one orange-filled centre circle (`#E65C1B`), three white satellites, three connector strokes. It is rendered inside `.s13-center` at `S13_step03`, which also activates `.s13-core-glow` — an `AmbientGlow` of `size 360, intensity 0.55, opacity 0.9` inside a wrapper at `opacity 0.2`, i.e. an effective **0.18 orange radial glow** centred directly behind the Figma/IA column (`S13Stack/index.tsx:52-54`, `s13-stack.css:14-22`, `AmbientGlow.tsx:22-31`).
- **FIGMA / PRODUCT EVIDENCE:** Integration has **no AI integration whatsoever**. Zero provider dependencies in any `package.json`; zero `/api/*ai` routes (the complete backend mount list at `backend/index.js:79-95` is `/api/auth`, `/api/invite-links`, `/api/households*`, `/api/invitations`, `/api/users`, `/api/people`, `/api/feature-flags`, `/api/planner`, `/api/inventory`, `/api/finance`, `/api/presence`, `/api/homecloud`); zero Supabase Edge Functions (`supabase/` contains only `migrations/`, `docs/`, `config.toml`); zero AI environment variables in `backend/src/config/*`; zero mock or demo AI surface. The only `openai_api_key` in the repo is Supabase Studio boilerplate under `[studio]` in `supabase/config.toml`, and `[storage.vector] enabled = false`. `Homi` returns **0 matches** in `front/`; `Geni` exists only as two dead icon constants (`constants/icons.tsx:20, :31`), and the decision registry says *"Geni hidden until implemented"* (`PLANNER_V1_M11_FINAL_DECISION_REGISTRY.md:494`).
- **CLASSIFICATION:** `TECHNICAL-STORY` + `VISUAL`
- **SEVERITY:** `BLOCKER` (as a P0 truth problem; see §32)
- **VERDICT:** **FAIL, in two independent ways.**
  1. **The claim is unsupported.** The script asserts a present-tense capability the product does not have. A technical audience will ask *"which model, where?"* and there is no answer.
  2. **The representation is the forbidden cliché.** A hub-and-spoke node glyph inside an orange glow is precisely the *"AI glow"* / *"glowing AI orb"* that master §2.8 and the brief forbid.
- **TARGET BEHAVIOUR:** Two options, and the choice is a **script decision**, not a design decision:
  - **(a) If the AI claim stays in the script:** show the word `IA` as plain type, with a short role caption like the other six, no glyph, no glow. Do **not** show a provider logo.
  - **(b) If Product Truth cannot support the claim:** the sentence must come out of the script and the `IA` block must come off the stage. This is the honest option and it is recommended — see §31 `SI-11`.
- **RATIONALE:** Master §4's OPEN says *"Mostrar solo logos realmente usados."* There are none. Showing a generic glyph in a glow is worse than showing nothing, because it asserts a capability and dresses it in the visual language of a capability the product does not have.

---

### **G-13 — The mono→brand-colour logo crossfade carries no information**

- **SCENE:** G
- **CURRENT STATE(S):** `S13_step00`→`S13_step01`, `S13_step01`→`S13_step02`
- **SCRIPT MOMENT:** L314, L316
- **MASTER INTENT:** §2.6 — *"Usar scale para atención semántica, no por decoración."* · §16 rule 13 — *"¿Una animación llama más atención que el concepto? Simplificar."*
- **CURRENT RUNTIME EVIDENCE:** S12 imports the **mono** logo variants (`react-native.svg`, `expo.svg`, `nodejs.svg`, `supabase.svg`, `postgresql.svg` — `S12FrontendBackend/index.tsx:3-7`), each hardcoding `stroke="#ece5d8"`. S13 imports both mono and `-color` variants and crossfades them via `.s13-mark[data-tint]` (`s13-stack.css:87-97`). Measured: `S13_step00→01` = 1 animating element (`img.s13-mark-tint`), 7 entering / 5 exiting; `S13_step01→02` = 3 animating elements (the three backend tints). The role captions enter on the same press.
- **CLASSIFICATION:** `MOTION`
- **SEVERITY:** `MEDIUM`
- **VERDICT:** **PARTIAL FAIL.** The colour change is real, visible and information-free. The role captions that accompany it are informative and are preserved (G-P3).
- **TARGET BEHAVIOUR:** Drop the colour crossfade; keep the role captions. If a distinction is wanted, it should encode a real one — e.g. design-time vs runtime, which is exactly the Figma fix in G-10.
- **RATIONALE:** This is the measured mechanism behind `HW-G-004`'s *"parpadean los dos."* Two logos change colour because two different SVG files are crossfaded. Nothing about the product changes.

---

### **G-14 — Five spoken ideas collapse into one press with five simultaneous motions**

- **SCENE:** G
- **CURRENT STATE(S):** `S13_step03`
- **SCRIPT MOMENT:** L318 (Figma), L320 (IA), L322 (*"Son piezas bastante distintas."*), L324 (*"ninguna debería sentirse separada"*), L326 (*"una sola experiencia"*)
- **MASTER INTENT:** §11 G4 (Figma), G4 (IA), G5 (recomposition) — three separate beats
- **CURRENT RUNTIME EVIDENCE:** Measured `S13_step02→03`: 5 animating elements — `.s13-core-glow` (opacity 0→0.2), `.s13-center` (opacity/visibility), the Figma item, `.s13-bridge` (opacity .8→1 + node scale 1→1.15), and the IA item (110 ms delay). Plus the `layoutChanged` flag fires once (`.s13-bridge` `scrollHeight 8→9`).
- **CLASSIFICATION:** `TIMING` + `MOTION`
- **SEVERITY:** `HIGH`
- **VERDICT:** **FAIL.** Five spoken ideas, one press, five simultaneous motions, one of which (the bridge node growing 15 %, i.e. 2.1 px on a 14 px dot) is imperceptible.
- **TARGET BEHAVIOUR:** See §17 — Figma gets G-B7, IA gets G-B8, the recomposition gets G-B10.
- **RATIONALE:** Motion-design's 1/3 rule: with 3+ elements, no more than 1/3 should be in active motion simultaneously. Here 5 of 5 move at once.

---

### **G-15 — The recomposition into one experience — the block's closing argument — does not exist**

- **SCENE:** G
- **CURRENT STATE(S):** `S13_step03` (the block's last state)
- **SCRIPT MOMENT:** L322–L326 *"Son piezas bastante distintas. Pero para alguien usando HomePlus ninguna debería sentirse separada. Tiene que sentirse como una sola experiencia."*
- **MASTER INTENT:** §11 G5 — *"backend + Node/Supabase/Postgres retroceden detrás del teléfono; React Native/Expo convergen hacia la superficie; Figma se disuelve hacia la capa visual/diseño; IA se integra al sistema; líneas desaparecen; teléfono vuelve al centro y crece levemente. En 'una sola experiencia': solo queda HomePlus abierto."* · NO-UI §13 "Recomposición" — *"Todo se integra físicamente al teléfono. Final: solo un phone HomePlus central."*
- **CURRENT RUNTIME EVIDENCE:** The block's last state is its **most separated** composition: two cards at maximum distance, a centre column with two more items, a glow behind them, and a line between them. Nothing moves toward anything. There is no phone.
- **CLASSIFICATION:** `NARRATIVE`
- **SEVERITY:** `BLOCKER`
- **VERDICT:** **FAIL.** The scene ends on the exact opposite of its closing sentence.
- **TARGET BEHAVIOUR:** See §17, beat G-B10.
- **RATIONALE:** *"Tiene que sentirse como una sola experiencia"* is the moral of the entire technical block. Ending on a logo wall leaves it unmade and makes the transition to Scene H arbitrary.

---

### **G-16 — The two cards are visually identical, so "frontend" and "backend" are not distinguished**

- **SCENE:** G
- **CURRENT STATE(S):** `S12_step00`…`S13_step03`
- **SCRIPT MOMENT:** L306 vs L308
- **MASTER INTENT:** §11 G1 vs G2 — frontend is *"todo lo que vemos y usamos"*, backend is *"trabaja detrás"*
- **CURRENT RUNTIME EVIDENCE:** `.s12-panel` and `.s13-panel` share identical geometry and styling: `width: 460px; padding: 40px 44px; border: 1px solid rgb(245 241 235 / 0.09); border-radius: 24px; background: rgb(245 241 235 / 0.02)` (`s12-layers.css:20-26`, `s13-stack.css:33-39`). Titles 80 px, subtitles 24 px, logos 52 px, list gap 20 px, captions 28 px — all identical. The only differences are the words and the logos.
- **CLASSIFICATION:** `VISUAL`
- **SEVERITY:** `MEDIUM` (subsumed by G-01; recorded separately because it is the specific mechanism that makes G-F6 fail)
- **VERDICT:** **FAIL.**
- **TARGET BEHAVIOUR:** The distinction must be **spatial and depth-based**, not label-based: frontend in front (the device surface), backend behind it (a plane that emerges from behind the phone). See §11 and §17.
- **RATIONALE:** Two identical boxes with different words is the *"random boxes with arrows"* the brief forbids. The visible/hidden distinction the script asks for has no visual encoding.

---

### **G-17 — Off-token colours and one dead CSS rule**

- **SCENE:** G
- **CURRENT STATE(S):** all 7
- **SCRIPT MOMENT:** —
- **MASTER INTENT:** §2.1 colour system · §16 implementation rules
- **CURRENT RUNTIME EVIDENCE:** Five hardcoded colour values in scope that do not exist in `design-system/tokens.ts`: `#060404` (stage background, 5 files — the token is `#0B0908`), `#c7a084` (`.s14-question-line-quiet`), `#b09a86` (`.s14-barrier` gradient), `#0d0a08` (`.s14-node` background), `#ece5d8` (`.s12-tech img { color }`). Additionally `s12-layers.css:83` sets `color: #ece5d8` on an `<img>` loading an external SVG — **dead CSS**, because `color` does not cross the `<img>` document boundary. The mono logos already hardcode `stroke="#ece5d8"` (`react-native.svg:1`).
- **CLASSIFICATION:** `VISUAL`
- **SEVERITY:** `LOW`
- **VERDICT:** **FAIL (hygiene).** No contrast failure: measured against `#060404`, `#F5F1EB` = 18.0:1, `#A49B94` = 7.4:1, `#c7a084` = 8.5:1 — all pass.
- **TARGET BEHAVIOUR:** Delete the dead `color` rule. Route the four remaining values through tokens. Keep `#060404` if it is a deliberate stage black distinct from the `#0B0908` canvas token — but then declare it as a token rather than hardcoding it in five files.
- **RATIONALE:** Token discipline is what makes a system legible to the next developer. Five ad-hoc values in four scenes is the start of drift.

---

## 16. Scene G positives

### G-P1 — The role captions are correct and must be preserved verbatim
`Interfaz móvil`, `Build y preview`, `API y lógica`, `Auth y datos`, `Base de datos`. Five short, plain-language, non-technical phrases that tell a non-technical audience what each piece does. They are the only moment in the entire block where the visual serves understanding rather than labelling, and they are exactly what master §11 G4 and NO-UI §13 ask for. **KEEP ALL FIVE.** One correction: `API y lógica` should read closer to the script's *"parte de la lógica y los servicios"* — `API` is an addition the script does not make.

### G-P2 — No AI provider logo is shown
Given that Product Truth has no AI integration at all, showing a provider logo would have been a fabrication. The restraint is correct. **KEEP** — and extend it: no glyph and no glow either (G-12).

### G-P3 — The backend did not become a cliché
No server rack, no terminal, no code rain, no database cylinder, no random boxes with arrows. The backend is a card with three logos, which is insufficient but is not a cliché. **KEEP this restraint** when the verb language is added.

### G-P4 — The mono/colour mark system is real token discipline
Two SVG variants per technology, crossfaded through a `data-tint` attribute, with the colour variants hardcoding brand hex (`react-native-color.svg` → `#61DAFB`). This is a genuine two-state system, not an ad-hoc swap. **KEEP the mechanism**; drop the crossfade (G-13).

### G-P5 — The panel typography is clean and legible
80 px titles at weight 600, `letter-spacing -0.03em`, on a genuinely dark field. 24 px secondary, 28 px list items, 20 px captions. The hierarchy is clear and the measure is comfortable. **KEEP** — this is the right typographic base for the rebuilt scene.

### G-P6 — The stage geometry is stable
No canvas overflow in any S12/S13 state (S1 §8.2: `1280×720` for all 7). The only in-scope overflow is `1280×732` at `S13_step03` and `S14_step00…03`, caused by the 120 px blur on `.ambient-glow` extending ink overflow — and S1 §8.5 confirms **0 visible elements** escape the canvas box in those states, so there is no visible defect. Recorded as containment debt, not a bug.

### G-P7 — The scene is fully state-driven and reversible
`data-step` / `data-visible` / `data-tint` attributes with pure CSS transitions; Session 1 §6 confirms 0/85 visible-level differences between forward and backward traversal for S12 and S13. **KEEP** — this is the correct implementation pattern.

---

## 17. Scene G target choreography

**State budget.** 10 beats → **7 states** (G00…G06). 13 spoken lines / 7 states = **1.86 lines per state** — the same count the scene has now. **The state budget is already correct; the allocation is what is wrong.** This is the single most important recommendation in this section: do not add states, reallocate them.

| BEAT | SPEAKER MOMENT | CURRENT | TARGET | ACTION |
|---|---|---|---|---|
| **G00** | L304 *"Aunque antes de hablar de las tecnologías, hay dos conceptos…"* | `S12_step00`: card with `Frontend / La app que usás / React Native / Expo` | Phone centred, nothing else, no logos, no labels | **REPLACE** |
| | | | **Visible:** one HomePlus device, centred, at 100 % exposure, showing a real surface. **Enters:** nothing. **Exits:** nothing. **Moves:** nothing. **Stays still:** the device. **Dims:** —. **Foreground:** the device. **Transition family:** `SPATIAL_WIPE` from S11's F-B6 phone — **the same device, no remount**. **Trigger:** the S11→S12 scene change (auto). **Hold:** for the whole of L304. |
| **G01** | L306 *"Por un lado está el frontend…"* | `S12_step00`–`S12_step02` (wrong content) | Phone moves to the left third; a discreet `FRONTEND` label appears; then one auto microsequence isolates the real components | **REPLACE** |
| | | | **Visible:** phone at left third + `FRONTEND`. **Enters:** the label. **Exits:** nothing. **Moves:** the device travels centre → left third (600–900 ms, `ease-in-out`). **Stays still:** the black field. **Dims:** —. **Foreground:** the device. **Transition family:** `REFRAME`. **Trigger:** **MANUAL** for the move; the component isolation is an **AUTO** microsequence. |
| | | | *Auto microsequence (one indivisible story — "what you see and use"):* ① the screen surface scales to **108 %**; ② a real button scales to **115 %**; ③ the real navbar/menu scales to **110 %**; ④ the whole surface returns to 100 % — *"la forma en que se muestra la información"*. Each holds ~350–450 ms. Total < 2 s. **No camera zoom, no giant labels** (master §11 G1; NO-UI §13 G02–G04). |
| **G02** | L308 *"Y por otro está el backend, que trabaja detrás: recibe… valida… guarda o la busca… devuelve un resultado."* | `S12_step01`–`S12_step02` (a card + a line) | Backend plane emerges from behind the phone to the right; five verbs light in sequence | **REPLACE** |
| | | | **Visible:** phone at left third + a backend plane behind and to the right. **Enters:** the backend plane, emerging from behind the device (master §11 G2: *"backend sale desde detrás del teléfono hacia la derecha"*). **Exits:** nothing. **Moves:** the plane travels from behind the device to the right. **Stays still:** the phone. **Dims:** —. **Foreground:** the plane. **Transition family:** `SPATIAL_WIPE`. **Trigger:** **MANUAL** for the emergence; the five verbs are an **AUTO** microsequence. |
| | | | *Auto microsequence:* `RECIBE` → `VALIDA` → `RELACIONA` → `GUARDA / BUSCA` → `DEVUELVE`, at 26–32 px, hierarchy by **active state** not size (NO-UI §13). `RELACIONA` additionally shows two small chips, `Persona` and `Hogar`, and holds ~600 ms — the one dwell the script earns (*"lo relaciona con la persona y el hogar correspondiente"*). |
| **G03** | L310 *"Por ejemplo, cuando registramos un gasto…"* | **no state** | The `$48.720` transaction, end to end | **REPLACE** |
| | | | **Visible:** frontend + backend simultaneously, and one datum travelling. **Enters:** the amount in the frontend. **Exits:** the amount from the frontend. **Moves:** the amount scales down, passes **behind the device frame**, reappears on the backend side. **Stays still:** both planes. **Dims:** —. **Foreground:** the travelling datum. **Transition family:** `SPATIAL_WIPE` for the datum, `REFRAME` for the backend states. **Trigger:** **MANUAL**; the 11-step chain is **AUTO**. |
| | | | *Auto microsequence (master §11 G3, frozen):* ① `$48.720` visible in `Nuevo movimiento`; ② the datum scales down; ③ it crosses **behind the frame**; ④ it reappears backend-side; ⑤ `RECIBE`; ⑥ `VALIDA ✓`; ⑦ `RELACIONA` (persona + hogar); ⑧ `GUARDA`; ⑨ `DEVUELVE`; ⑩ the response returns to the frontend; ⑪ a realistic confirmation — *movimiento guardado*. **Requires a `Nuevo movimiento` surface to be built** (see §12). |
| **G04** | L314 *"Para construir el frontend de HomePlus usamos React Native y Expo."* | `S13_step01` (role captions only) | React Native + Expo, in the spoken order, as frontend implementation | **RECOMPOSE** |
| | | | **Visible:** the two marks with their role captions. **Enters:** React Native, then Expo — in that order, 100–150 ms apart. **Exits:** nothing. **Moves:** nothing. **Stays still:** everything else. **Dims:** —. **Foreground:** the two marks. **Transition family:** `ACCUMULATE`. **Trigger:** **MANUAL**. **No colour crossfade** (G-13). |
| **G05** | L316 *"y en el Backend, Node.js… Supabase y PostgreSQL…"* | `S13_step02` (role captions only) | Node → Supabase → PostgreSQL, in the spoken order | **RECOMPOSE** |
| | | | Same pattern as G04, three marks in spoken order. **Trigger:** **MANUAL**. |
| **G06** | L318 *"Y antes de programar las pantallas usamos Figma…"* | `S13_step03` (centre column, with IA) | Figma alone, attached to the frontend as a design stage | **REPLACE** |
| | | | **Visible:** Figma with its role caption, **attached to the frontend** — above, behind or beside the Frontend card, with a thin connector to it. **Enters:** Figma. **Exits:** nothing. **Moves:** nothing. **Stays still:** everything else. **Dims:** —. **Foreground:** Figma. **Transition family:** `ACCUMULATE`. **Trigger:** **MANUAL**. **Never on the centreline between the two cards** (G-10). |
| **G07** | L320 *"también usamos modelos de inteligencia artificial…"* | `S13_step03` (with Figma) | IA alone, as type, with a role caption | **REPLACE** |
| | | | **Visible:** the word `IA` + a short role caption, in the same face and weight as the other labels. **Enters:** the label. **Exits:** nothing. **Moves:** nothing. **Stays still:** everything else. **Dims:** —. **Foreground:** the label. **Transition family:** `ACCUMULATE`. **Trigger:** **MANUAL**. **No glyph, no glow** (G-12). |
| **G08** | L322 *"Son piezas bastante distintas."* | `S13_step03` (core glow) | A small, deliberate separation between the pieces | **REPLACE** |
| | | | **Visible:** the pieces, slightly separated. **Enters:** nothing. **Exits:** nothing. **Moves:** the groups drift apart by a small, readable amount. **Stays still:** the phone. **Dims:** —. **Foreground:** the separated groups. **Transition family:** `REFRAME`. **Trigger:** **MANUAL**. |
| **G09** | L324–326 *"ninguna debería sentirse separada. Tiene que sentirse como una sola experiencia."* | **no state** | The recomposition into one phone | **REPLACE** |
| | | | **Visible:** one phone, centred, HomePlus open. **Enters:** the device frame returning to centre and growing slightly. **Exits:** the backend plane, the marks, the labels, the lines. **Moves:** backend + Node/Supabase/Postgres retreat behind the phone; React Native/Expo converge to the surface; Figma dissolves toward the design layer; IA integrates. **Stays still:** nothing. **Dims:** the separating groups. **Foreground:** the phone. **Transition family:** `REFRAME` (600–1000 ms). **Trigger:** **MANUAL**; the recomposition is **AUTO** once triggered. |

**Trigger budget.** 8 manual triggers + 3 auto microsequences (the frontend component isolation; the backend verbs; the transaction; the recomposition — 4 auto in total). Master §2.10 target met.

**What this fixes.** G-01 (device on stage), G-02 (no logos before L314), G-03 (real frontend components), G-04 (the five verbs), G-05 (the transaction), G-08 (no replayed stack — S14 no longer re-mounts S13), G-09 (no dead press), G-10 (Figma attached to frontend), G-11 (Figma and IA get separate presses), G-14 (no five-way simultaneous motion), G-15 (the recomposition exists), G-16 (the visible/hidden distinction is spatial).

**What it deliberately does not do.** It does not add a state. It does not change the slide count. It does not reorder the technologies (that is `SI-10`'s decision). It does not add a logo wall. It does not add a diagram.

---

## 18. G → H transition audit

**Current shape.** `S13_step03` → `S14_step00`: 0 animating elements, 88 entering / 57 exiting — a pure cross-mount that re-mounts the entire S13 stack as `.s14-echo` at **opacity 1** (`s14-barrier.css:24`). Visible text is byte-identical. So the audience watches the whole stack assemble itself a second time, at full brightness, immediately after watching it assemble the first time. That is the measured mechanism behind `HW-G-008`'s *"parpadea todo."*

**What the transition must do.** The audience moves from *how the system is built* to *even a well-built system has a cost*. Master §12 H0 freezes the entry: *"Teléfono HomePlus central. `incluso con todo esto conectado…`: sin cambio."* So the master's answer is: **the phone, unchanged.** The stack dissolves; the phone stays. The continuity is the device, and the argument is that everything the audience just learned sits inside it — and the user still has to find their way around it.

**The conceptual bridge is currently missing entirely.** There is no bridge. S14 step 0 re-presents the stack rather than leaving it. The bridge the script implies is: *you now know there are layers underneath — and you still have to know where to press.* That idea has no visual form.

**Target.** The stack (S13's composition) dims and exits as a block; the phone remains, centred, at 100 %; the field goes quiet. That is the whole transition, and it is one auto microsequence triggered by the scene change — not a rebuild.

**Additional defect.** The echo's opacity curve is `1 → 0.35 → 0.22 → 0.12 → 0` across steps 0–4 (`s14-barrier.css:24-28`). So the stack is at **full brightness** for the first press of Scene H, and never fully leaves until the question arrives. Master §12 H0 wants *"sin cambio"* on entry and a low exposure by *"sigue existiendo fricción."* The current curve inverts that: maximum presence at the entry, minimum at the thesis.

---

## 19. Spoken-beat map — H

Speaker: **Infra**, script L328–L343. 11 spoken lines (S1 §10.2) against 5 states = **2.20 lines per state**, against a global mean of 3.14. **Scene H is the second-least dense scene in the film — and it is still failing.** As with Scene G, the problem is allocation, not count.

| BEAT | SCRIPT (line) | INTENDED IDEA | EXPECTED VISUAL SUPPORT | CURRENT STATE(S) | HAS STATE? |
|---|---|---|---|---|---|
| **H-B1** | L330–331 *"Aunque incluso con todo esto conectado, sigue existiendo fricción."* | Entry + premise. Everything just explained, and there is still a cost | Phone centred, unchanged; then exposure drops slightly (Master §12 H0) | `S14_step00` — the S13 stack re-mounted at opacity 1 | ✘ wrong content (H-01) |
| **H-B2** | L333–334 *"si quiero crear una tarea, tengo q saber como hacerlo"* | Example 1 — a real route the user must know | The complete set of real tap-targets, appearing **simultaneously** (Master §12 H1; NO-UI §14 H02) | `S14_step01` — text pills `Home → Planner → Tareas → +` | ✘ fabricated (H-03) |
| **H-B3** | L335–336 *"o si quiero buscar una garantía, tengo q saber donde esta"* | Example 2 — a second, different route | Same resource, second route (Master §12 H2; NO-UI §14 H04) | `S14_step02` — text pills `Home → Assets → PlayStation 5 → Documentos` | ✘ fabricated and false (H-02) **BLOCKER** |
| **H-B4** | L338–339 *"no porque la interfaz sea un problema, simplemente porque todas las aplicaciones tienen su forma de uso."* | **The thesis of the scene.** HomePlus is absolved; universality is asserted | Return to a **completely clean** HomePlus; nothing around it (Master §12 H3; NO-UI §14 H06) | `S14_step03` — echo at 0.12, routes at 0.5, barrier line at full | ✘ (H-04) **BLOCKER** |
| **H-B5** | L341 *"entonces nos hicimos una ultima pregunta."* | Prelude. The turn toward the question | Exposure drops on the clean phone; hold (Master §12 H4) | **none** | ✘ (H-06) |
| **H-B6** | L343 *"¿que pasaría si ni siquiera tuviéramos que saber como?"* | **The key question of the whole film's second half** | Fade to black; the question in white; hold; fade (Master §12 H4; NO-UI §14 H07–H08) | `S14_step04` — black + two lines of type | ✔ partial (H-05, H-07) |

**Beat arithmetic.** 6 beats against 5 states. **One beat has no state** (H-B5) and two are present but wrong (H-B1, H-B4). The states that do exist are spent on: a replayed stack, two sets of text pills, and a barrier line.

**The decisive observation, stated precisely.** Scene H's problem is **not** density. It is that the two routes are fabricated and the absolving sentence has no clean state to land on. Both are content problems, not pacing problems.

---

## 20. Friction deep audit

### H1. Does current S14 communicate universal interface friction — or does it accidentally imply HomePlus is confusing / badly designed?

**It implies the second, and it fails to communicate the first.** Three mechanisms combine:

1. **There is no interface.** With no device on stage, there is nothing to be lost in. The audience cannot feel the cost of navigating a surface they cannot see.
2. **The routes are text pills, not interfaces.** `Home → Planner → Tareas → +` is a breadcrumb, not a screen. It describes navigation rather than showing it, and it collides with three pieces of stage text (§21, H-02).
3. **The absolving sentence has no state.** L338–L339 (*"no porque la interfaz sea un problema, simplemente porque todas las aplicaciones tienen su forma de uso"*) is the sentence that distinguishes *"all interfaces have a cost"* from *"this interface is badly designed."* It is the entire point of the scene. It currently lands on a composition with the stack echo at 12 %, two routes at 50 % and a vertical line through the middle. Master §12 H3 requires *"volver a HomePlus completamente limpio"* for exactly this sentence. → **H-04, BLOCKER.**

The distinction the brief calls *critical* is therefore not merely unsupported — it is contradicted. An audience that has just seen two confusing text chains collide with a logo wall is primed to conclude that HomePlus is hard to use.

### H2. Are the task route and warranty route believable?

**The task route is partially believable; the warranty route is not believable at all.** See §21 and §22.

### H3. Do they use real product paths?

**The task route is partially real. The warranty route is not real.** Measured against Integration:

| Route | Node | Real? | Evidence |
|---|---|---|---|
| Task | `Home` | ✔ | `HomeTab` — `HomeTabNavigator.tsx:162` |
| Task | `Planner` | ✘ | `Planner` is a **screen header** (`PlannerScreen.tsx:700`), not a tappable tab. The tab is `Calendario` (`HomeTabNavigator.tsx:165`) |
| Task | `Tareas` | ✔ | Segmented tab label — `PlannerScreen.tsx:800-801` |
| Task | `+` | ⚠ | A small `iconButton` with a11y label `Crear tarea` (`PlannerTasksScreen.tsx:554-555`) — **not** a FAB, and it opens a **Modal sheet**, not a route (`PlannerScreen.tsx:760`; `PlannerSheetHost.tsx:15`) |
| Warranty | `Home` | ✔ | as above |
| Warranty | `Assets` | ✘ | **No Assets/Activos module exists.** `MoreScreen.tsx:12-53` lists the complete module set: `HomeCloud`, `Actividad` (isDemo), `Finanzas`, `Inventario` |
| Warranty | `PlayStation 5` | ✘ | **0 matches** for `playstation\|ps5` across `front/`, `backend/`, `supabase/`, `tests/`, `scripts/` |
| Warranty | `Documentos` | ✘ | **0 occurrences** in `front/` and **0** in `supabase/migrations`. The only `'Documentos'` in SQL is a test fixture (`docs/implementation/homecloud/HOMECLOUD_01B_FOLDERS_CONTRACT.sql:112`) |

**Three of four warranty nodes do not exist in the product.** → **H-02, BLOCKER.**

### H4. Are too many elements shown at once?

**Yes, and they collide.** At `S14_step02` the stage carries: the full S13 stack (two cards, five logos, seven role captions, Figma, IA, a bridge line, an ambient glow) at 22 % opacity, **plus** two rows of four text pills each at 100 % opacity, **plus** a vertical barrier line. Measured collisions:

| # | Element A | Element B | Overlap |
|---|---|---|---|
| 1 | `+` pill — x 873–975.66, y 295.2–346.0 | `Node.js` caption — x 873–975.66, y 324.2–385.79 | **x 102.66 px, y 21.8 px** |
| 2 | `Documentos` pill — x 825.63–1009.69, y 374.0–424.8 | `Supabase` caption — x 873–993.86, y 405.8–466.8 | **x 120.86 px, y 19.0 px** |
| 3 | `Home` pill (row 2) — x 270.3–382.3, y 374.0–424.8 | `React Native` caption — x 173–332.56, y 365.61–427.2 | **x 62.26 px, y 50.8 px** |

Collision 1 is already present at `S14_step01` (echo at 0.35 instead of 0.22 — same geometry). → **H-02, BLOCKER** (graded here as the visual-load half of the same root cause).

### H5. Does the screen become visually overloaded while the speaker is still explaining?

**Yes.** The overload is worst exactly where the speaker is making the scene's most important point. At `S14_step02` and `S14_step03` the audience is being told *"no porque la interfaz sea un problema"* while looking at a composition where two text chains are colliding with a logo wall. The visual actively fights the sentence.

### H6. Does current motion help explain route depth, or merely animate arrows?

**It does neither — the arrows do not move at all.** `.s14-route-arrow` is a static text glyph (`→`, 22 px, `s14-barrier.css:67-71`). The only motion on a route is the whole row's `opacity 0→1` + `translateY 12px→0` over 420 ms (`s14-barrier.css:43-60`). So a route "appears"; nothing about its **depth** is communicated. There is no step-through, no accumulation, no sense that four things must be known in order. → **H-08, MEDIUM.**

The one thing the motion does achieve is correct in principle: each route appears **all at once**, which is what master §12 H1 and NO-UI §14 H02 require. The rhythm is right; the representation is wrong.

### H7. Does background information remain visible when it should disappear?

**Yes — this is the scene's most damaging persistence.** The S13 echo is at opacity **1** at `S14_step00`, then 0.35, 0.22, 0.12 across steps 1–3, and only reaches 0 at step 04 — **simultaneously with the question arriving** (`s14-barrier.css:24-28`). So:

- The technical stack is the **background of the entire friction scene**, at full brightness on entry.
- It is still at 12 % when the absolving sentence is delivered.
- It never fully leaves until the question arrives, and it leaves *concurrently* with the question rather than before it.

Master §12 H3 wants a clean HomePlus for the absolving sentence. Master §12 H4 and NO-UI §14 H07 want the fade to black to **precede** the question. Neither happens. → **H-04, BLOCKER** (persistence half) and **H-06, HIGH** (concurrency half).

### H8. Does the key question receive enough visual silence?

**At the settled frame, yes. During the transition, no.**

- **Settled:** `S14_step04` is genuinely clean — black field, two lines of type, nothing else. The screenshot confirms it. The baseline's `text-table.md:69` lists `Figma · Diseño · IA` in this state, but that is a **measurement artefact**: `.s13-center` sets `visibility: visible` explicitly (`s13-stack.css:132-136`), which overrides the `visibility: hidden` inherited from `.s14-echo` — but `.s14-echo` has `opacity: 0` (`s14-barrier.css:28`), and opacity multiplies down the tree, so nothing paints. **There is no visual residue.** See §23 and §30.
- **Transition:** the fade of the echo and the arrival of the question are the **same press** with concurrent 420 ms transitions. So for ~420 ms both are partially visible. Master §12 H4 and NO-UI §14 H07–H08 require a **sequential** reset. → **H-06, HIGH.**

**Additional finding — the silence is entirely operator-dependent.** Session 1 §7 confirms there is **no auto-advance and no timer anywhere in the deck**: all 8 hold tests report `runningAnimations = [0,0,0,0,0]` over 10 s. So the dwell on the most important line of the scene depends 100 % on the operator not pressing. Master §12 H4 asks for a *"Hold corto"* — there is no mechanism that guarantees even that. → **H-07, HIGH.**

---

## 21. Task-route audit

### The real product path

**VERDICT: PARTIALLY REAL.** The chain is real in substance but wrong in two of its four labels, and it omits a shorter real path.

**Real chain A (via Planner):**
`Inicio` (tab) → `Calendario` (tab, route `PlannerTab`) → screen header `Planner` → segmented tab `Tareas` → `+` icon button (a11y `Crear tarea`) → **Modal sheet** `Nueva tarea` → button `Crear tarea`

Evidence: `HomeTabNavigator.tsx:162,165` · `PlannerScreen.tsx:700,728-730,760,800-801` · `PlannerTasksScreen.tsx:554-555` · `PlannerSheetHost.tsx:15` (*"ONLY this component mounts a Planner Modal"*) · `TaskForm.tsx:776`

**Real chain B (shorter, and the slide omits it):**
`Inicio` → floating `+` (*Acciones rápidas*) → row `Crear tarea` → the same Modal sheet

Evidence: `plannerQuickActions.ts:90-92` · `HomeTabNavigator.tsx` floating `+` tab

### What the slide shows vs what is real

| Slide says | Reality | Defect |
|---|---|---|
| `Home` | `Inicio` | Label mismatch — the product tab is `Inicio` |
| `Planner` | `Calendario` (tab) / `Planner` (screen header) | **The slide names a screen header as if it were a tap target.** The user taps `Calendario` |
| `Tareas` | `Tareas` | ✔ correct |
| `+` | `+` icon button | ✔ the control exists — but it is a small `iconButton` in a `utilityRow`, **not** a FAB, and it opens a **Modal sheet**, not a route |

### What does not exist

- **No FAB.** The `+` is a small icon button (`PlannerTasksScreen.tsx:542,554`).
- **No reachable create route.** `CreateTask` *is* registered (`HomeTabNavigator.tsx:192`) but no live UI navigates to it — the only callers are in the deprecated bridge `navigation/plannerNavigationCompat.tsx:200-208`. The deep-link config (`App.tsx:35-49`) exposes `home`, `planner`, `tasks/:entityId`, `events/:entityId`, `goals/:entityId`, `search` — **no create path**.
- **Home cannot create a task inline.** Home cards only read/complete and link out (`HomePlannerSections.tsx:367` → `openPlanner('tasks')`).
- **Planner-internal search is hidden by default** (`backend/src/constants/plannerFeatureFlags.js:5-8` — `planner.search_entry`, `defaultValue: false`).

### The editorial problem with omitting chain B

The slide shows a 4-step path. A real 2-step path exists. This cuts both ways:

- **It overstates the cost** — which is the scene's whole point, so this is not a trivial error.
- **But it also misstates the nature of the cost.** The script's point is *"tengo que saber cómo hacerlo"* — you must know the **procedure**, not merely survive a long path. Showing only the long path suggests the problem is length. Showing **both** paths makes the real point: *there are two ways, and you must know which one exists.* That is a stronger and more honest illustration of the same idea.

### Recommendation

**Presentation-safe route, using only real components:**

`Inicio` → `Calendario` → `Tareas` → `+` → `Nueva tarea`

Five nodes, all real, ending on the Modal sheet's own title so the audience sees that the "destination" is a form, not a screen. **Add chain B simultaneously at lower exposure** — `Inicio` → `+` → `Crear tarea` — so the audience sees that a shorter way exists and must be known. This is 100 % real and it makes the friction argument *stronger*, not weaker.

**Do not** show `Home → Planner → Tareas → +`. Two of those four labels are wrong.

---

## 22. Warranty-route audit

### The real product path

**VERDICT: DOES NOT EXIST.** There is no `Assets`/`Activos` module, no asset detail screen, no `Documentos` section, no PlayStation and no warranty entity anywhere in the product.

**What is real:** `Más` (tab) → `HomeCloud` (route `HomeCloudFiles`) → `Archivos` / `Recuerdos` segmented control → search input `Buscar` (placeholder `Buscar en archivos`) → folders + files grid.

Evidence: `MoreScreen.tsx:12-53` (complete module list — no Assets) · `HomeCloudFilesScreen.tsx:44-45` · `HomeTabNavigator.tsx`

### Evidence of absence

| Claim | Result |
|---|---|
| `Assets` / `Activos` label, route, screen or table | **Does not exist.** Only residue is a DB enum literal `'assets'` inside a CHECK constraint (`supabase/migrations/20260916000002_planner_tasks_origin_module_include_planner.sql:24`) and an unused icon constant (`constants/icons.tsx:59` — `assets: 'cube'`, zero references) |
| `Documentos` in `front/` | **0 occurrences** |
| `Documentos` in `supabase/migrations` | **0 occurrences**. The only `'Documentos'` in SQL is a test fixture (`docs/implementation/homecloud/HOMECLOUD_01B_FOLDERS_CONTRACT.sql:112`) |
| `playstation` / `ps5` / `warranty` / `garant` in `front/`, `backend/`, `supabase/`, `tests/`, `scripts/` | **0 matches** |
| Asset detail → `Documentos` section | **Does not exist.** No asset detail screen at all |
| Navigable link from an Assets document to HomeCloud | **Does not exist.** The relationship lives only in design docs: `docsGeneral/Design system v1.txt:247` (*`{"source":"Documentos","relationship":"references","target":"Assets"}`*) and `docsGeneral/Api + Testcases + Edge cases v1.txt:82` |
| Search that could find a warranty file | **Cannot.** Planner search covers only `task`, `event`, `plan` (`backend/src/services/planner.search.service.js:12-18`). HomeCloud has its own file search (`HomeCloudFilesScreen.tsx:45`) and Inventory its own item search (`InventarioScreen.tsx:591`) — neither reaches the other's domain |

### The master's own OPEN, unresolved

Master §4 lists: *"Ruta real exacta para tarea y garantía en Fricción | Se resolverá con componentes reales cuando las IA estén finales."* That OPEN is still open. The presentation resolved it anyway — by inventing a route. This violates master §2.4 (*"Si la relación es conceptual o la integración no existe todavía, se usa una transición editorial evidente, nunca un tap falso"*), master §12 H1 (*"No escribir breadcrumbs textuales si pueden representarse con UI real"*), and NO-UI §14 H02 (*"En presentation mode no falsificar componentes"*).

### Recommendation

**Replace the route with the real one, and end it on an object the audience has already seen:**

`Más` → `HomeCloud` → `Archivos` → `Buscar` → **`Garantía PlayStation 5.pdf`**

All five nodes are real. The last one is a file that **already exists in the presentation's S10 reconstruction** (`Garantía PlayStation 5.pdf`, seen at `S10_step02`–`S10_step03`) and is a **mandatory shared element** under master §2.5. So the route ends on a callback to something the audience recognises — which is exactly the continuity behaviour the master asks for, and it makes the friction concrete: *you know the file exists; you still have to know where to look.*

**Do not** show `Home → Assets → PlayStation 5 → Documentos`. Three of those four nodes do not exist.

---

## 23. Key-question audit

### The question itself

On screen: `¿Y si ni siquiera` / `tuviéramos que saber cómo?` — 112 px `#F5F1EB` weight 600, then 68 px `#c7a084` weight 500 (`s14-barrier.css:137-150`).

Script L343: *"¿que pasaría si ni siquiera tuviéramos que saber como?"*

**These are different sentences.** The script asks *"what would happen if…"*; the screen asks *"what if we didn't even…"*. They also differ in orthography — the script writes `como` without an accent. Master §2.3 approves **only** the on-screen wording (*`¿Y si ni siquiera tuviéramos que saber cómo?`*). So the speaker will say one sentence while a different sentence is displayed, at the single most important moment of the scene. → **SI-13.**

### What disappears before it

At `S14_step03` → `S14_step04`, three things leave concurrently: `.s14-echo` (opacity 0.12 → 0, 420 ms), `.s14-barrier` (opacity → 0, 320 ms), and the routes (opacity → 0 via `data-present`). One thing arrives: `.s14-question` (opacity 0 → 1 + `translateY 12px → 0`, 420 ms). Measured: 3 animating elements.

**The residue competes.** For ~420 ms the dimmed stack and the barrier are still partially visible while the question fades up. Master §12 H4 requires the fade to black to **precede** the question; NO-UI §14 H07–H08 require *"Fade total a black"* and then the text. → **H-06, HIGH.**

### Is black appropriate?

**Yes.** This is master §2.2 use 3, *"pregunta conceptual"*, and it is the only use of black in the deck that is unambiguously earned. The question is the hinge of the entire second half of the film. **KEEP.**

### How many milliseconds/beat of silence does it need?

**There is no mechanism that provides any.** Session 1 §7: zero timers, zero auto-advance, `runningAnimations = [0,0,0,0,0]` across all 8 hold tests. The silence is 100 % operator-dependent. Master §12 H4 asks for a *"Hold corto"*; NO-UI §14 H08 specifies the text at 88–96 px, blanco, negro absoluto, sin decoración, máximo 2 líneas.

**Target:** the fade to black should be an **auto** beat (600–900 ms, master §2.8 "transformación importante") triggered by the press that leaves the clean phone; the operator then speaks *"entonces nos hicimos una última pregunta"* **during black**; the question arrives on a **separate** press. That gives the silence a mechanism rather than a hope. → **H-07, HIGH.**

### Should it be one or two lines?

**Two lines is correct.** The break after *"¿Y si ni siquiera"* is a genuine rhetorical pause and it is the right place for it. **KEEP.**

### Should anything decorative remain?

**No.** And at the settled frame, nothing does. The `Figma · Diseño · IA` strings in `data/text-table.md:69` are a measurement artefact, not a visual residue:

- `.s14-echo` at step 4 has `opacity: 0; visibility: hidden` (`s14-barrier.css:28`).
- `.s13-center` sets `visibility: visible` explicitly (`s13-stack.css:132-136`), which **overrides** the inherited `hidden` — so the probe reports `Figma` and `IA` as `visibility: visible`.
- But `opacity` is not overridden, and it multiplies down the tree: ancestor `opacity: 0` ⇒ nothing paints.
- The settled screenshot of `S14_step04` confirms a clean black field with two lines of type.

**So: no visual residue. The baseline over-reports.** Recorded here so Sessions 7–8 do not inherit a false finding. The one genuine consequence is robustness, not visibility: because `.s13-center` re-asserts `visibility: visible`, any future change that animates `.s14-echo` opacity without also setting `visibility` would pop Figma and IA in before the rest. → **H-09, LOW.**

### Typography deviation from the freeze

NO-UI §14 H08 specifies **88–96 px, blanco, negro absoluto, sin decoración, máximo 2 líneas**. Current: **112 px** line 1 in `#F5F1EB` (correct colour) and **68 px** line 2 in `#c7a084` (off-token, and not blanco). So the first line is 16–24 % larger than the freeze and the second is 22–29 % smaller and a different colour. The two-tone split reads as *question + subtitle* rather than as one question, and `#c7a084` introduces a warm neutral that exists nowhere else in the system. → **H-10, MEDIUM.**

---

## 24. H → Homi handoff audit

**Scope:** the handoff only. Homi itself is Session 5 territory.

### Current shape

`S14_step04` → `S15_step00`: 0 animating elements, 63 entering / 91 exiting — a hard cut. S14 ends with the question **centred** on black. S15 opens with the device at **`x = 718`** (right third) showing the Homi surface (`324×669.6 @718,25`, S1 §3 row 67).

### Does the key question naturally create the need for Homi?

**Conceptually yes; spatially no.** The question is the perfect setup for Homi — *"what if we didn't have to know how?"* is exactly the problem Homi solves. But the handoff does not deliver it:

1. **No spatial continuity.** The question is centred; the device arrives at the right third. The answer does not appear where the question was.
2. **No name reveal.** Master §13 I0 and NO-UI §15 I00 both specify: *"EN PANTALLA: `Homi`. Reveal limpio. Sin esfera, aura, partículas ni glow de IA."* and *"Black → `Homi`. Nombre limpio. Sin orb/glow."* The current S15 opens directly on the device with `Homi` in the app header — there is no black → name → device sequence at the boundary.
3. **The device is not central.** Master §2.9: *"una pantalla central = foco de producto."* S15 and S16 both hold the device at `x = 718`. That is a layout decision outside this session's scope, but it directly weakens the handoff: the answer arrives off-centre.

### The naming problem

The script says **Geni** at L347, L349, L356, L365, L367, L431, L438, L446 and **Homi** at L371, L379, L405, L415. The presentation says **Homi** everywhere (`presentationConfig.ts:22` `assistantName: 'HOMI'`; `src/**` has **0** matches for `Geni`). This is already registered as `SI-01`. It matters **at this handoff specifically**, because the reveal is the moment the name is spoken for the first time: if the script says *"Y ahí appears Geni"* while the screen says `Homi`, the reveal fails. → **T-04, MEDIUM** (blocked on `SI-01`).

### Target

Black → the name `Homi` alone, centred, clean, no glow → the device arrives **centred** and the name cedes to the Homi surface. Master §13 I0: *"Después el nombre cede lugar a un teléfono HomePlus con superficie Homi."* That is the exact choreography, and it is not implemented at the boundary.

**Transition family:** `SHARED ELEMENT` — the question's centred position becomes the name's centred position becomes the device's centred position. Three states, one axis, no lateral movement until the device is established.

---

## 25. Scene H issue register

---

### **H-01 — Scene H has no interface: the friction cannot be shown**

- **SCENE:** H
- **CURRENT STATE(S):** `S14_step00`…`S14_step04` (all 5)
- **SCRIPT MOMENT:** L330–L339
- **MASTER INTENT:** §12 H0 *"Teléfono HomePlus central."* · H1 *"aparece de una sola vez la ruta completa de componentes exactos"* · H3 *"volver a HomePlus completamente limpio"* · NO-UI §14 H00 *"Phone limpio."*
- **CURRENT RUNTIME EVIDENCE:** Zero device in all 5 states (S1 §3 rows 62–66, app surface `none`). S14's content is: a re-mounted S13 stack, two rows of text pills, a vertical line, and two lines of type.
- **CLASSIFICATION:** `NARRATIVE` + `TECHNICAL-STORY`
- **SEVERITY:** `BLOCKER`
- **VERDICT:** **FAIL.** A friction scene with no interface cannot demonstrate friction.
- **TARGET BEHAVIOUR:** See §27. A real HomePlus device on stage for the whole scene.
- **RATIONALE:** Same root cause as G-01, and it is the reason H-02, H-03 and H-04 all fail.

---

### **H-02 — The warranty route names three nodes that do not exist in the product**

- **SCENE:** H
- **CURRENT STATE(S):** `S14_step02`, `S14_step03`
- **SCRIPT MOMENT:** L335–L336 *"si quiero buscar una garantía, tengo q saber donde esta"*
- **MASTER INTENT:** §12 H2 — *"aparece de una vez la ruta real de componentes de HomePlus/HomeCloud necesaria para llegar al archivo."* · §2.4 — *"nunca un tap falso"* · §4 OPEN — *"Ruta real exacta para tarea y garantía en Fricción"* · NO-UI §14 H04 — *"Mismo sistema."* H02 — *"En presentation mode no falsificar componentes."*
- **CURRENT RUNTIME EVIDENCE:** `S14Barrier/index.tsx:5-8` — `routes = [{ id: 'tareas', nodes: ['Home','Planner','Tareas','+'] }, { id: 'documentos', nodes: ['Home','Assets','PlayStation 5','Documentos'] }]`. Three of the four warranty nodes return **0 matches** in the product (§22 evidence table).
- **FIGMA / PRODUCT EVIDENCE:** §22 — no Assets module (`MoreScreen.tsx:12-53`), no `Documentos` in `front/` (0 occurrences), no PlayStation/warranty anywhere (0 matches across five directories), no asset→HomeCloud link outside design docs.
- **CLASSIFICATION:** `TECHNICAL-STORY` + `VISUAL`
- **SEVERITY:** `BLOCKER`
- **VERDICT:** **FAIL.** The route is a fabrication. It is also the scene's second example, so half the scene's evidence is invented.
- **TARGET BEHAVIOUR:** `Más → HomeCloud → Archivos → Buscar → Garantía PlayStation 5.pdf` (§22).
- **RATIONALE:** Master §12 H2 says *"la ruta **real** de componentes."* The word "real" is the requirement. This is the most clear-cut Product Truth violation in the session.

---

### **H-03 — The task route is partially real and mislabels two of its four nodes**

- **SCENE:** H
- **CURRENT STATE(S):** `S14_step01`, `S14_step02`, `S14_step03`
- **SCRIPT MOMENT:** L333–L334
- **MASTER INTENT:** §12 H1 — *"la ruta completa de componentes exactos que habría que tocar"*
- **CURRENT RUNTIME EVIDENCE:** `S14Barrier/index.tsx:6` — `['Home','Planner','Tareas','+']`. Measured against Integration (§21): `Home` should be `Inicio`; `Planner` is a **screen header**, not a tab — the tab is `Calendario` (`HomeTabNavigator.tsx:165`); `Tareas` is correct (`PlannerScreen.tsx:800-801`); `+` is a small icon button that opens a **Modal sheet**, not a FAB or a route (`PlannerTasksScreen.tsx:554-555`, `PlannerScreen.tsx:760`). A shorter real path (`Inicio → + → Crear tarea`, `plannerQuickActions.ts:90-92`) exists and is omitted.
- **CLASSIFICATION:** `TECHNICAL-STORY`
- **SEVERITY:** `HIGH`
- **VERDICT:** **FAIL.** Two of four labels are wrong, and the omission of the shorter path misstates the nature of the cost.
- **TARGET BEHAVIOUR:** §21 — `Inicio → Calendario → Tareas → + → Nueva tarea`, with the shorter chain shown simultaneously at lower exposure.
- **RATIONALE:** The route is *directionally* right, which makes the errors more dangerous, not less: an audience that knows the product will catch `Planner` as a tab name immediately.

---

### **H-04 — The absolving sentence has no clean state, so the scene implies HomePlus is badly designed**

- **SCENE:** H
- **CURRENT STATE(S):** `S14_step03`
- **SCRIPT MOMENT:** L338–L339 *"no porque la interfaz sea un problema, simplemente porque todas las aplicaciones tienen su forma de uso."*
- **MASTER INTENT:** §12 H3 — *"volver a HomePlus completamente limpio. Mantener limpio durante: 'todas las aplicaciones tienen su forma de uso'. No añadir etiquetas alrededor."* · NO-UI §14 H06 — *"Phone HomePlus limpio. Nada alrededor."*
- **CURRENT RUNTIME EVIDENCE:** At `S14_step03` the stage carries the S13 echo at **0.12** opacity, both route rows at **0.5** (`s14-barrier.css:41`), and the barrier line at full opacity. There is no state in the scene where HomePlus is clean.
- **CLASSIFICATION:** `NARRATIVE`
- **SEVERITY:** `BLOCKER`
- **VERDICT:** **FAIL.** This is the sentence that distinguishes *"all interfaces have a cost"* from *"this interface is badly designed"* — the distinction the brief calls *critical*. It is delivered over a cluttered composition.
- **TARGET BEHAVIOUR:** See §27, beat H-B4: both routes clear, the echo gone, one clean device, nothing around it.
- **RATIONALE:** Without this state the scene's thesis is not merely unsupported but contradicted. `HW-H-001` is confirmed.

---

### **H-05 — The routes are fabricated text pills that collide with three pieces of stage text**

- **SCENE:** H
- **CURRENT STATE(S):** `S14_step01`, `S14_step02`, `S14_step03`
- **SCRIPT MOMENT:** L333–L336
- **MASTER INTENT:** §12 H1 — *"No escribir breadcrumbs textuales si pueden representarse con UI real."* · NO-UI §14 H02 — *"Todos los tap-target components aparecen SIMULTÁNEAMENTE. Hasta que UI llegue: usar `TapSlot` neutrales solo en DEV. En presentation mode no falsificar componentes."*
- **CURRENT RUNTIME EVIDENCE:** `.s14-node` renders `padding: 10px 22px; border: 1px solid rgb(245 241 235 / 0.16); border-radius: 9999px; background: #0d0a08; font-size: 24px` (`s14-barrier.css:73-89`) — styled text in a pill, not a component. Measured collisions at `S14_step02` (boxes from `data/walk-forward.json`):
  1. `+` pill (x 873–975.66, y 295.2–346.0) over `Node.js` caption (x 873–975.66, y 324.2–385.79) — **x 102.66 px, y 21.8 px**
  2. `Documentos` pill (x 825.63–1009.69, y 374.0–424.8) over `Supabase` caption (x 873–993.86, y 405.8–466.8) — **x 120.86 px, y 19.0 px**
  3. `Home` pill, row 2 (x 270.3–382.3, y 374.0–424.8) over `React Native` caption (x 173–332.56, y 365.61–427.2) — **x 62.26 px, y 50.8 px**

  Collision 1 is already present at `S14_step01` (same geometry, echo at 0.35).
- **CLASSIFICATION:** `VISUAL`
- **SEVERITY:** `BLOCKER` (graded here as the visual-load half of H-02's root cause; the fabrication half is H-02/H-03)
- **VERDICT:** **FAIL.** Three measured text-on-text collisions, at the exact moment the speaker is absolving the interface.
- **TARGET BEHAVIOUR:** See §27 — the routes become real components, and the echo is gone before they appear.
- **RATIONALE:** Master §12 H1 says *"componentes exactos"*; NO-UI §14 H02 says *"no falsificar componentes."* Text pills are neither.

---

### **H-06 — The attention reset and the question arrival are the same press, with concurrent transitions**

- **SCENE:** H
- **CURRENT STATE(S):** `S14_step03` → `S14_step04`
- **SCRIPT MOMENT:** L341–L343
- **MASTER INTENT:** §12 H4 — *"HomePlus baja exposición → fade → negro. EN PANTALLA: [question]. Negro + texto blanco. Hold corto. Fade del texto → negro."* · NO-UI §14 H07–H08 — *"Fade total a black."* then the text
- **CURRENT RUNTIME EVIDENCE:** Measured `S14_step03→04`: **3 animating elements** — `.s14-echo` (opacity 0.12→0, 420 ms), `.s14-barrier` (opacity→0, 320 ms), `.s14-question` (opacity 0→1 + translateY, 420 ms). The routes also leave via `data-present`. So three exits and one entrance run **concurrently**.
- **CLASSIFICATION:** `MOTION` + `TIMING`
- **SEVERITY:** `HIGH`
- **VERDICT:** **FAIL.** The reset and the arrival should be sequential; they are simultaneous.
- **TARGET BEHAVIOUR:** See §23 and §27, beat H-B6: the fade to black is an auto beat; the question arrives on a separate press.
- **RATIONALE:** Master §12 H4 describes a sequence (*fade → negro → text → hold → fade*). The current implementation compresses the first three steps into one press.

---

### **H-07 — The silence on the key question has no mechanism**

- **SCENE:** H
- **CURRENT STATE(S):** `S14_step04`
- **SCRIPT MOMENT:** L343
- **MASTER INTENT:** §12 H4 — *"Hold corto."* · §2.10 — *"los cambios deben tolerar una variación oral de ±0,5–1 s"*
- **CURRENT RUNTIME EVIDENCE:** Session 1 §7 — all 8 hold tests report `runningAnimations = [0,0,0,0,0]` over 10 s; S1 §2 confirms no timer-driven beat, no auto-advance, no idle animation anywhere in the deck. The dwell on the most important line of the scene is therefore 100 % operator-dependent.
- **CLASSIFICATION:** `TIMING`
- **SEVERITY:** `HIGH`
- **VERDICT:** **FAIL (operational).** Not a visual defect but a live-operation risk on the single most important beat in the scene.
- **TARGET BEHAVIOUR:** An auto fade-to-black on the press that leaves the clean phone, so the operator speaks the prelude during black and the question arrives on a separate press. This converts the silence from a hope into a mechanism.
- **RATIONALE:** Master §2.10 requires the film to tolerate ±0.5–1 s of oral variation. A beat with no dwell mechanism tolerates none.

---

### **H-08 — The route arrows are static glyphs; motion does not convey depth**

- **SCENE:** H
- **CURRENT STATE(S):** `S14_step01`…`S14_step03`
- **SCRIPT MOMENT:** L333–L336
- **MASTER INTENT:** §12 H1 — *"La intención es mostrar longitud del camino, no simular navegación."*
- **CURRENT RUNTIME EVIDENCE:** `.s14-route-arrow` is a static text glyph (`→`, 22 px, `s14-barrier.css:67-71`) that never animates. The only route motion is the row's `opacity 0→1` + `translateY 12px→0` over 420 ms (`s14-barrier.css:43-60`). Measured: `S14_step00→01` = 1 animating element (`.s14-route`); `S14_step01→02` = 2 (`.s14-echo` + `.s14-route`).
- **CLASSIFICATION:** `MOTION`
- **SEVERITY:** `MEDIUM`
- **VERDICT:** **PARTIAL FAIL.** The routes appear all at once, which is correct; but nothing about their **length** is communicated. A row that fades in reads as "a label appeared," not as "four things must be known in order."
- **TARGET BEHAVIOUR:** If the routes remain editorial, the nodes should at least **accumulate** left-to-right with a 60–100 ms stagger, so the chain reads as a sequence. If they become real components (recommended), the stagger is unnecessary — the simultaneity is the point.
- **RATIONALE:** Master §12 H1 wants *"longitud del camino."* A single fade-in shows a path, not a length.

---

### **H-09 — `.s13-center` re-asserts `visibility: visible`, so the echo's hidden subtree is not robustly hidden**

- **SCENE:** H
- **CURRENT STATE(S):** `S14_step04`
- **SCRIPT MOMENT:** —
- **MASTER INTENT:** §16 rule 10 — *"¿El fondo negro tiene una función narrativa concreta?"*
- **CURRENT RUNTIME EVIDENCE:** `.s14-echo` at step 4 has `opacity: 0; visibility: hidden` (`s14-barrier.css:28`). But `.s13-center[data-visible='true']` sets `visibility: visible` (`s13-stack.css:132-136`), which **overrides** the inherited `hidden`. The probe therefore reports `Figma` and `IA` as `visibility: visible` at `S14_step04`. Nothing paints (ancestor `opacity: 0`), and the settled screenshot is clean — but the hidden state depends on opacity alone.
- **CLASSIFICATION:** `VISUAL` (robustness)
- **SEVERITY:** `LOW`
- **VERDICT:** **PASS at the settled frame; FRAGILE in implementation.**
- **TARGET BEHAVIOUR:** Add `visibility: hidden` to `.s14-echo` at step 4 with a transition delay, or set `display: none`, so the subtree is hidden by more than one mechanism.
- **RATIONALE:** Any future change that animates `.s14-echo` opacity without also managing `visibility` will pop Figma and IA in before the rest of the stack.

---

### **H-10 — The question's typography deviates from the freeze**

- **SCENE:** H
- **CURRENT STATE(S):** `S14_step04`
- **SCRIPT MOMENT:** L343
- **MASTER INTENT:** NO-UI §14 H08 — *"88–96 px, máximo 2 líneas, centered, blanco, negro absoluto, sin decoración."* · §2.3 approved text
- **CURRENT RUNTIME EVIDENCE:** Line 1 = 112 px `#F5F1EB` weight 600; line 2 = 68 px `#c7a084` weight 500 (`s14-barrier.css:137-150`). So line 1 is 16–24 % over the frozen size, line 2 is 22–29 % under it and in an off-token colour. `#c7a084` appears nowhere else in the system.
- **CLASSIFICATION:** `VISUAL`
- **SEVERITY:** `MEDIUM`
- **VERDICT:** **FAIL (freeze deviation).** Not a contrast failure — measured against `#060404`, `#c7a084` = 8.5:1.
- **TARGET BEHAVIOUR:** Both lines in `--presentation-text` (`#F5F1EB`), sized within 88–96 px, two lines, centred, nothing else.
- **RATIONALE:** The two-tone split reads as *question + subtitle* rather than as one question, and it introduces a colour that means nothing.

---

### **H-11 — The barrier line is an implementation invention with no script referent**

- **SCENE:** H
- **CURRENT STATE(S):** `S14_step03`
- **SCRIPT MOMENT:** none — the script never mentions a barrier or a wall
- **MASTER INTENT:** §12 H1–H4 — the scene's visual resources are the routes, the clean phone, black, and the question. No line.
- **CURRENT RUNTIME EVIDENCE:** `.s14-barrier` = a 2 px vertical line at `left: 50 %`, `top: 200px`, `bottom: 200px`, gradient `transparent → #b09a86 30 % → 70 % → transparent`, `scaleY 0→1` over 500 ms (`s14-barrier.css:91-110`). It is present **only** at `stepIndex === 3` (`S14Barrier/index.tsx:28`). The slide's own `aria-label` is *"La barrera de la navegación"* — an interpretation added by the implementation, not by the script.
- **CLASSIFICATION:** `NARRATIVE` + `VISUAL`
- **SEVERITY:** `MEDIUM`
- **VERDICT:** **FAIL.** An unexplained visual metaphor, placed at the exact centreline of the composition.
- **TARGET BEHAVIOUR:** Remove it. If a divider is wanted, it must be earned by the script first.
- **RATIONALE:** At `S14_step03` the centreline is the **gap between the Frontend and Backend cards** of the echo. A vertical line there reads as a *front/back boundary* — the opposite of what the scene is about. It also crosses the surviving `.s13-bridge` horizontal line to form a meaningless `+`.

---

### **H-12 — The entire technical stack is the background of the friction scene**

- **SCENE:** H
- **CURRENT STATE(S):** `S14_step00`…`S14_step03`
- **SCRIPT MOMENT:** L330–L339
- **MASTER INTENT:** §12 H0 — *"sin cambio"* on entry; H3 — *"volver a HomePlus completamente limpio"*
- **CURRENT RUNTIME EVIDENCE:** `.s14-echo` renders the full S13 stage, including `AmbientGlow` (900 px, accent, opacity 0.14) and — at step 3 — `.s13-core-glow` (360 px, effective 0.18). Echo opacity by step: **1 / 0.35 / 0.22 / 0.12 / 0** (`s14-barrier.css:24-28`). So the stack is at **full brightness** on entry and never below 12 % until the question.
- **CLASSIFICATION:** `VISUAL`
- **SEVERITY:** `HIGH`
- **VERDICT:** **FAIL.** The scene about navigation friction is staged against a background of technology logos and orange light. This is the measured mechanism behind `HW-H-004`'s *"fondo raro."*
- **TARGET BEHAVIOUR:** The echo should be gone before the first route appears. The friction scene's background should be the product, not the stack.
- **RATIONALE:** Master §16 rule 10: *"¿El fondo negro tiene una función narrativa concreta?"* — and by extension, does the background have a function at all? Here it has the wrong one.

---

## 26. Scene H positives

### H-P1 — The key question's settled frame is genuinely clean
Black field, two lines of type, nothing else. The screenshot confirms it, and §23 establishes that the `Figma · Diseño · IA` strings in the baseline's text table are a measurement artefact, not a residue. **KEEP.** This is the one moment in the block where the visual is exactly right.

### H-P2 — The question is set large and reads at projection
112 px logical = 168 px at 1.5×, 258 px at 2.3×. The break after *"¿Y si ni siquiera"* is a genuine rhetorical pause. **KEEP** the two-line structure.

### H-P3 — The routes appear all at once, which is the correct rhythm
Master §12 H1 and NO-UI §14 H02 both require simultaneity — *"Todos los tap-target components aparecen SIMULTÁNEAMENTE"* — precisely so the audience sees the whole path at once rather than being walked through a fake tutorial. The current implementation does this correctly. **KEEP the rhythm**; fix the representation (H-05).

### H-P4 — The black reset is earned
This is master §2.2 use 3, *"pregunta conceptual"*, and it is the only unambiguously earned black in the deck. **KEEP.**

### H-P5 — The scene is fully state-driven and reversible
`data-step` / `data-present` / `data-dim` attributes with pure CSS transitions; Session 1 §6 confirms 0/85 visible-level differences between forward and backward traversal for S14. **KEEP.**

### H-P6 — The pill styling is internally consistent
`padding: 10px 22px`, `border-radius: 9999px`, 24 px type, one accent-coloured action node (`s14-barrier.css:73-89`). If the routes are rebuilt as real components, this visual language is a reasonable base for them. **KEEP the language**, change the content.

---

## 27. Scene H target choreography

**State budget.** 6 beats → **7 states** (H00…H06). 11 spoken lines / 7 states = **1.57 lines per state**. This is **+2 states** over the current 5 — the minimum needed to give the absolving sentence and the prelude their own states. As with Scene G, the increase is small and the reallocation is large.

| BEAT | SPEAKER MOMENT | CURRENT | TARGET | ACTION |
|---|---|---|---|---|
| **H00** | L330 *"Aunque incluso con todo esto conectado…"* | `S14_step00`: S13 stack re-mounted at opacity 1 | One clean HomePlus device, centred, unchanged | **REPLACE** |
| | | | **Visible:** one device, centred, at 100 % exposure, showing a real surface. **Enters:** nothing. **Exits:** the entire S13 stack, as a block. **Moves:** nothing. **Stays still:** the device. **Dims:** —. **Foreground:** the device. **Transition family:** `SPATIAL_WIPE` — the stack dims and exits **as a block**; the device does not remount. **Trigger:** the S13→S14 scene change (auto). |
| **H01** | L331 *"sigue existiendo fricción."* | `S14_step01`: echo drops to 0.35, route 1 appears | Exposure drops slightly on the clean device | **RECOMPOSE** |
| | | | **Visible:** the device at ~75 % exposure. **Enters:** nothing. **Exits:** nothing. **Moves:** nothing. **Stays still:** the device. **Dims:** 100 % → 75 %. **Foreground:** the device. **Transition family:** `REFRAME` (400–700 ms). **Trigger:** **MANUAL**. |
| **H02** | L333–334 *"si quiero crear una tarea, tengo q saber como hacerlo"* | `S14_step01`: text pills `Home → Planner → Tareas → +` | The real task route, all at once, as real components | **REPLACE** |
| | | | **Visible:** the device at 75 % + the complete set of real tap-targets for the task route, appearing **simultaneously**. **Enters:** `Inicio` tab, `Calendario` tab, `Tareas` tab, `+` button, `Nueva tarea` sheet title — all at once, staggered 60–100 ms. **Exits:** nothing. **Moves:** nothing. **Stays still:** the device. **Dims:** —. **Foreground:** the route. **Layout:** the components extracted from the device and laid out horizontally, with a thin connector back to the device they belong to. **Transition family:** `ACCUMULATE`. **Trigger:** **MANUAL**. **No text pills** (H-05). **No fake taps** (NO-UI §14 H02). |
| **H03** | L335–336 *"o si quiero buscar una garantía, tengo q saber donde esta"* | `S14_step02`: text pills `Home → Assets → PlayStation 5 → Documentos` | The real warranty route, all at once, ending on a file the audience has seen | **REPLACE** |
| | | | **Visible:** both routes simultaneously — the task route and the warranty route. **Enters:** `Más` tab, `HomeCloud`, `Archivos`, `Buscar`, and `Garantía PlayStation 5.pdf` — all real, all at once. **Exits:** nothing. **Moves:** nothing. **Stays still:** the device and the first route. **Dims:** —. **Foreground:** the second route. **Transition family:** `ACCUMULATE`. **Trigger:** **MANUAL**. **Showing both routes at once is the point:** two different goals, two different paths, both of which must be known. |
| **H04** | L338–339 *"no porque la interfaz sea un problema, simplemente porque todas las aplicaciones tienen su forma de uso."* | `S14_step03`: echo 0.12, routes 0.5, barrier line | **Both routes clear. One clean device. Nothing around it.** | **REPLACE** |
| | | | **Visible:** one clean HomePlus device at 100 % exposure. **Enters:** nothing. **Exits:** both routes, and any residual echo. **Moves:** nothing. **Stays still:** the device. **Dims:** 75 % → 100 %. **Foreground:** the device. **Transition family:** `REFRAME`. **Trigger:** **MANUAL**. **Hold** for the whole of L338–L339. **No labels around it** (master §12 H3). **This is the state that fixes H-04.** |
| **H05** | L341 *"entonces nos hicimos una ultima pregunta."* | **no state** | Exposure drops on the clean device; hold in near-black | **REPLACE** |
| | | | **Visible:** the device at ~40 % exposure, or the field at near-black. **Enters:** nothing. **Exits:** nothing. **Moves:** nothing. **Stays still:** the device. **Dims:** 100 % → 40 %. **Foreground:** the device. **Transition family:** `REFRAME` (600–900 ms). **Trigger:** **MANUAL**. **Hold** — this is the silence before the question, and it must be a state, not a hope (H-07). |
| **H06** | L343 *"¿que pasaría si ni siquiera tuviéramos que saber como?"* | `S14_step04`: black + two lines, arriving concurrently with the echo's exit | Fade to black **first**; then the question, on a separate press | **RETIME** |
| | | | **Visible:** black, then the question. **Enters:** the question, at 88–96 px, `#F5F1EB`, two lines, centred. **Exits:** the device. **Moves:** nothing. **Stays still:** nothing. **Dims:** —. **Foreground:** the question. **Transition family:** `SPATIAL_WIPE` for the fade; `ACCUMULATE` for the text. **Trigger:** **MANUAL** — and it must be a **separate** press from H05, so the fade completes before the text arrives. **Hold corto** (master §12 H4). **Then** fade the text → black, and the S14→S15 handoff takes over. |

**Trigger budget.** 6 manual triggers + 1 auto microsequence (the stack exiting as a block at H00). Master §2.10 target met.

**What this fixes.** H-01 (device on stage), H-02 and H-03 (real routes), H-04 (the clean state for the absolving sentence), H-05 (real components, no collisions), H-06 (sequential reset), H-07 (the silence has a mechanism), H-08 (the routes accumulate, so depth is visible), H-10 (typography matches the freeze), H-11 (the barrier line is gone), H-12 (the stack is no longer the background).

**What it deliberately does not do.** It does not simulate a tap-by-tap navigation. It does not add a fake tutorial. It does not show the routes as breadcrumbs. It does not let the scene imply that HomePlus is badly designed.

---

## 28. Motion audit F–H

Method: Session 1's `data/motion-summary.json` (84 transitions × 5 frames) and `data/walk-forward.json`, re-queried this session. Session 1's limits apply — motion is sampled at 5 instants, not captured as video (S1 §13.2 G6), so inter-frame behaviour (easing shape, overshoot, stagger order) is not observable. What **is** observable: which elements animate, how many at once, whether geometry mutates, and whether the settled state is stable.

### 28.1 Measured transitions in scope

| Transition | Animating | Entering | Exiting | Layout changed | Reading |
|---|---|---|---|---|---|
| `S10_step04 → S11_step00` | 0 | 8 | 179 | 0 | hard cut to black |
| `S11_step00 → S11_step01` | 1 | 0 | 0 | 0 | `.s11-statement` fades + rises |
| `S11_step01 → S11_step02` | 1 | 0 | 0 | 0 | `.s11-resolution` fades + rises |
| `S11_step02 → S12_step00` | 0 | 32 | 8 | 0 | hard cut |
| `S12_step00 → S12_step01` | 1 | 0 | 0 | 0 | Backend card enters |
| `S12_step01 → S12_step02` | 2 | 0 | 0 | 0 | bridge line `scaleX` + node opacity |
| `S12_step02 → S13_step00` | 0 | 51 | 28 | 0 | full remount, no animation |
| `S13_step00 → S13_step01` | 1 | 7 | 5 | 0 | React Native mark mono→colour |
| `S13_step01 → S13_step02` | 3 | 10 | 7 | 0 | Node / Supabase / PostgreSQL marks mono→colour |
| `S13_step02 → S13_step03` | 5 | 0 | 0 | 1 | core-glow, centre, Figma, bridge, IA (110 ms delay) |
| `S13_step03 → S14_step00` | 0 | 88 | 57 | 0 | full remount, no animation |
| `S14_step00 → S14_step01` | 1 | 0 | 0 | 0 | route 1 fades + rises |
| `S14_step01 → S14_step02` | 2 | 0 | 0 | 0 | echo 0.35→0.22; route 2 enters |
| `S14_step02 → S14_step03` | 1 | 0 | 0 | 0 | echo 0.22→0.12 |
| `S14_step03 → S14_step04` | 3 | 0 | 0 | 0 | echo out, barrier out, question in — **concurrent** |
| `S14_step04 → S15_step00` | 0 | 63 | 91 | 0 | hard cut |

### 28.2 Classification of every notable motion

| Motion | Classification | Evidence |
|---|---|---|
| `.s11-statement` fade + rise (12 px, 420 ms) | **PURPOSEFUL** | It is the only content in the scene; a 12 px rise over 420 ms is within master §2.8's 250–450 ms band and is the correct way to introduce a thesis line. |
| `.s11-resolution` fade + rise (12 px, 420 ms) | **REDUNDANT** | It introduces a line the speaker never says (F-03). The motion is fine; the content is wrong. |
| S10→S11 hard cut (0 animating, 179 exiting) | **NEUTRAL** | A hard cut into black is a legitimate reset. The defect is that it costs a press (F-02), not that it is a cut. |
| S11→S12 hard cut (0 animating) | **NEUTRAL** | See F-05 / G-01. |
| Backend card entering (`opacity 0→1` + `translateY 12px→0`, 420 ms) | **REDUNDANT** | It introduces content the speaker has not reached (G-02). Correct motion, wrong beat. |
| `.s12-bridge` line `scaleX 0→1` (500 ms) + node `opacity 0→1` (320 ms) | **DISTRACTING** | A decorative line between two cards. It carries no data, is never explained, survives into S14, and crosses the barrier line to form a meaningless `+` (G-07). |
| S12→S13 full remount (0 animating, 51 in / 28 out) | **REDUNDANT** | Replays the previous composition's entrance animations. Dead press (G-09). |
| Logo mono→colour crossfade, frontend (1 element) | **REDUNDANT** | An information-free colour change (G-13). This is the measured mechanism behind `HW-G-004`'s *"parpadean los dos."* |
| Logo mono→colour crossfade, backend (3 elements) | **REDUNDANT** | Same. |
| `S13_step02→03`: 5 simultaneous animations | **DISTRACTING** | Five spoken ideas, one press, five motions (G-11, G-14). Violates motion-design's 1/3 rule (no more than 1/3 of 3+ elements in active motion). |
| `.s13-bridge` node `scale 1→1.15` at step 3 | **REDUNDANT** | 2.1 px on a 14 px dot. Imperceptible, and it carries no meaning. |
| S13→S14 full remount (0 animating, 88 in / 57 out) | **DISTRACTING** | The most damaging motion in the block: the entire stack re-assembles at full brightness (G-08). This is the measured mechanism behind `HW-G-008`'s *"parpadea todo."* |
| Route rows `opacity 0→1` + `translateY 12px→0` (420 ms) | **PURPOSEFUL** | Correct rhythm — the whole route appears at once, which is what master §12 H1 requires. The representation is wrong (H-05), the motion is right. |
| `.s14-echo` opacity curve 1 → .35 → .22 → .12 → 0 | **DISTRACTING** | The stack is at full brightness on entry and never fully leaves until the question (H-12). The curve inverts master §12 H0. |
| `.s14-barrier` `scaleY 0→1` (500 ms) | **DISTRACTING** | An invented metaphor at the composition's centreline (H-11). |
| `S14_step03→04`: 3 concurrent animations | **DISTRACTING** | The reset and the question arrival are simultaneous (H-06). |
| S14→S15 hard cut (0 animating) | **NEUTRAL** | See T-04. |

### 28.3 What is entirely absent

| Missing motion | Why it matters |
|---|---|
| **Any motion that explains** | Across 15 states and 16 transitions, not a single movement communicates a relationship, a direction, a cause or a mechanism. Every motion is either an entrance, a fade, a colour change or a decorative line. |
| **Any convergence** | Scene F's entire purpose is that separate things come together. Nothing converges. |
| **Any datum travelling** | Scene G's entire purpose is that a datum goes behind the device and comes back. Nothing travels. |
| **Any depth change** | Scene G's entire purpose is visible-vs-behind. Nothing moves in depth. |
| **Any accumulation along a route** | Scene H's entire purpose is the length of a path. Nothing accumulates. |

**This is the session's most concise summary:** the block contains 16 transitions and not one of them explains anything.

### 28.4 Easing, duration, and the motion-design checklist

| Check | Result |
|---|---|
| Durations within master §2.8 bands? | **PASS.** 420 ms entrances (band 250–450), 500 ms wipes (band 400–700), 320 ms replaces (band 250–450). All inside. |
| Easing declared and consistent? | **PASS.** Single easing `cubic-bezier(.2,.8,.2,1)` across the whole deck (`motionTokens.ts:2`). |
| Entrances decelerate, exits accelerate? | **FAIL.** Every transition uses the same easing in both directions. Motion-design's directional rule (entrance → ease-out, exit → ease-in) is not applied. Low impact at these durations, but it is a systemic deviation. |
| `prefers-reduced-motion` block exists? | **PASS** (`index.css:174`). Session 1 G7 records that it was never exercised. |
| Any `transition: all`? | **PASS.** All transitions enumerate their properties. |
| Any layout property animated? | **PASS.** Only `opacity`, `transform`, `translate`, `scale`. The single `layoutChanged` flag in scope is `.s13-bridge` `scrollHeight 8→9` — sub-pixel, not a defect. |
| Total stagger under 500 ms? | **PASS** where stagger exists (70 ms role captions, 110 ms IA). |

---

## 29. Hold / silence recommendations

Master §2.8 specifies *"hold emocional: 400–900 ms"*. Master §2.2 lists the four valid uses of black. The following moments should **deliberately not move**.

| Moment | Current | Target hold | Rationale |
|---|---|---|---|
| **F-B1** — the black entry | `S11_step00`, but it costs a press (F-02) | **Established by the scene-entry transition, then held.** No content press. | Master §2.2 use 2. The reset should be felt, not clicked. |
| **F-B5** — the thesis line | `S11_step01`, appears on the press | **Hold 600–900 ms after the convergence settles.** The line arrives 400–600 ms after the convergence, then holds. | This is the thesis of the film. It is currently the least-supported moment in it. |
| **G00** — the phone before Benja speaks | **does not exist** | **Hold for the whole of L304** (≈2.5 s of speech). Nothing moves. | Master §11 G0: *"Durante la frase introductoria de Benja no hacer nada."* This hold is what makes the later movement meaningful. |
| **G02** — `RELACIONA` | **does not exist** | **Hold ~600 ms** with the `Persona` and `Hogar` chips visible. | The one dwell the script earns: *"lo relaciona con la persona y el hogar correspondiente."* |
| **G03** — the transaction's confirmation | **does not exist** | **Hold ~400 ms** on *movimiento guardado*. | The proof that the mechanism worked. Without it the transaction is a demonstration; with it, it is a result. |
| **H-B4** — the absolving sentence | `S14_step03`, cluttered | **Hold for the whole of L338–L339** on a clean device. | Master §12 H3: *"Mantener limpio durante: 'todas las aplicaciones tienen su forma de uso'."* |
| **H-B5** — the prelude | **does not exist** | **Hold in near-black** while the operator speaks *"entonces nos hicimos una última pregunta."* | This is the silence that makes the question land. It must be a state, not a hope (H-07). |
| **H-B6** — the key question | `S14_step04`, settled frame is clean | **Hold corto** (master §12 H4), then fade the text → black. | The hinge of the second half of the film. |

**The general principle.** Every hold in this block should be a **state**, not an operator behaviour. Session 1 §7 proves there is no timer and no auto-advance anywhere in the deck, so any hold that is not a state is a hope. Three of the eight holds above do not currently exist as states.

---

## 30. Human hypothesis adjudication

Source: `audit/00_HUMAN_HYPOTHESES.md` §3.6–§3.8. No hypothesis is accepted merely because the user said it; none is rejected merely because the implementation differs.

### HW-F

| ID | Adjudication | Basis |
|---|---|---|
| **HW-F-001** | **PARTIALLY CONFIRMED** | **Confirmed:** the enumerated referents have zero visual support. S11 = 8 DOM nodes, 3 text lines, 0 objects, 0 abstractions, 0 relations across all 3 states. The dead first press is confirmed. **Not reproducible:** the count "14 elementos" — the script names 6 concrete situations and 6 abstractions = **12**. **Not reproducible:** *"dentro de la misma esquina"* — at `S11_step02` both blocks are centred and vertically stacked (`s11-bridge.css:8-12`), not in a corner. **Still open:** `SI-07` (the L271 authoring ambiguity) — the implementation resolved it as "two sentences on black", which is neither of the two options the author wrote. |

### HW-G

| ID | Adjudication | Basis |
|---|---|---|
| **HW-G-001** | **CONFIRMED** | All five vendor logos are on stage at `S12_step00`, the state mapped to L304 — the sentence that says technologies come later. Measured visible text at `S12_step00` = `Frontend · La app que usás · React Native · Expo`; at `S12_step01` all five are present, still inside L304–L306. Stronger than the hypothesis states. |
| **HW-G-002** | **CONFIRMED** | *"pantallas, botones, menús y la forma en que se muestra la información"* has zero visual evidence. Zero devices in 15 states. |
| **HW-G-003** | **CONFIRMED** | Backend = `Datos y servicios` + 3 logos + a decorative line. 0 occurrences of the five verbs in `src/`. The asymmetry the observer names is correct. |
| **HW-G-004** (*"parpadean los dos"*) | **PARTIALLY CONFIRMED** | The blink is real but its mechanism is not what the observer inferred. Measured: `S13_step00→01` = 1 animating element (`img.s13-mark-tint`) — a **mono→brand-colour SVG crossfade**, because S12 imports the mono variants and S13 crossfades to the `-color` variants. `S13_step01→02` = 3 (the backend marks). So "los dos" is accurate for the first tap. Classified **REDUNDANT**. |
| **HW-G-005** | **PARTIALLY CONFIRMED** | The role captions **do** follow the script order (`Interfaz móvil`/`Build y preview` at step01; `API y lógica`/`Auth y datos`/`Base de datos` at step02). But *"Sin desviación funcional registrada"* is **rejected**: `API y lógica` adds `API`, which the script does not say (*"parte de la lógica y los servicios"*). And the logos were already fully present two scenes earlier. |
| **HW-G-006** (Figma too late) | **PARTIALLY CONFIRMED → `SI-10`** | Visual fact confirmed: Figma first appears at `S13_step03`, after five technologies. But the current **spoken** order also places Figma sixth (L318), so visual and spoken order agree. The disagreement is with master §18's canonical script and §11 G4, which both put Figma **first**. The current script file is newer than the master → a live regression. Blocked on `SI-10`. |
| **HW-G-007** (specific model logo) | **REJECTED** — with a worse problem | There is **no** specific provider logo on stage. `ai.svg` is a generic three-node hub glyph labelled `IA`. The hypothesis's premise is false. The real problem is that Product Truth has **no AI integration at all**, so the claim itself is unsupported → `SI-11`. |
| **HW-G-008** (*"parpadea todo"*) | **CONFIRMED** — different mechanism | Measured `S13_step03 → S14_step00`: 0 animating, 88 entering / 57 exiting. Not a blink but a **full remount**: `S14Barrier` renders `<S13Stack stepIndex={3}/>`, so the entire stack re-assembles at echo opacity 1. Visible text is byte-identical. The observer's perception is exactly right; the cause is a rebuild, not a flicker. |
| **HW-G-009** (transaction absent) | **CONFIRMED** | L310's expense example is not visualized. `48.720` = 0 matches in `src/`. The routes the observer saw are in S14, not S12, and are navigation paths, not a transaction. |
| **HW-G-010** (*"línea recta en el medio, blanca"*) | **PARTIALLY CONFIRMED** | The line is real, vertical, central and perceived. It is **not white** — it is a `#b09a86` gradient (off-token). And its placement is semantically wrong: at `S14_step03` it stands in the gap between the echo's Frontend and Backend cards, inviting a front/back reading. |

### HW-H

| ID | Adjudication | Basis |
|---|---|---|
| **HW-H-001** | **CONFIRMED** | *"no porque la interfaz sea un problema / todas las aplicaciones tienen su forma de uso"* has no state. There is no clean HomePlus anywhere in S14; the echo persists at 0.35 / 0.22 / 0.12 across steps 1–3. Master §12 H3 requires a clean return for exactly this sentence. |
| **HW-H-002** | **CONFIRMED** | The two named examples exist as text; the third and actual point has no support. |
| **HW-H-003** (question arrives too early) | **PARTIALLY CONFIRMED** | **Confirmed:** the question's arrival press has 3 concurrent animations (echo out, barrier out, question in), so residue and question are simultaneously visible for ~420 ms. Master §12 H4 requires a sequential reset. **INSUFFICIENT EVIDENCE:** whether the question arrives *before the speaker says it* is an operator-timing matter and cannot be measured without audio (S1 §13.2 G5). |
| **HW-H-004** (*"fondo raro"*) | **CONFIRMED** | `.s14-echo` renders the full S13 stage including `AmbientGlow` (900 px, accent, 0.14) and, at step 3, `.s13-core-glow` (360 px, effective 0.18). Echo opacity 1 / 0.35 / 0.22 / 0.12 across steps 0–3. So the friction scene's background is the technical stack's own lighting. Plus 3 measured text-on-text collisions. |

**Tally:** 6 `CONFIRMED` · 6 `PARTIALLY CONFIRMED` · 1 `REJECTED` · 1 `PARTIALLY CONFIRMED → SCRIPT ISSUE` · 1 `CONFIRMED` with a different mechanism. **No hypothesis was accepted merely because the user said it, and none was rejected merely because the implementation differs.**

---

## 31. Script issues

Recorded separately, per the brief. **Not rewritten here.** Each item names what a later script pass must resolve.

| ID | Location | Why it matters | What a later script pass must resolve |
|---|---|---|---|
| **`SI-07`** (pre-existing) | L271 — `[Aca va la de continuidad pero en realidad seria una screen negra]` | The author doubts whether Continuity is a slide or a black screen. The implementation chose **neither**: it built a black screen that also carries two sentences. | Whether Scene F is (a) a black hold with no text, (b) a text slide, or (c) the object/relation scene the master specifies. Evidence now supports (c) — see §7. |
| **`SI-10`** (new) | L314–L320 vs master §18 L2002 | **Technology order regression.** Current script: React Native+Expo → Node → Supabase+PostgreSQL → **Figma** → IA. Master §18 canonical script and §11 G4: **Figma first** (*"Para diseñar el frontend de HomePlus usamos Figma… Después lo implementamos con React Native y Expo"*). Master §18's patch list explicitly includes *"Figma queda integrado a la explicación del frontend."* The current script file (24/9/2026) is **newer** than the master (23/9/2026). | Whether Figma is spoken first (master's canonical order) or sixth (current script). **This blocks final adjudication of G-06 and the whole of §13.** |
| **`SI-11`** (new) | L320 — *"también usamos modelos de inteligencia artificial en algunas partes del sistema."* | **Unsupported product claim.** Integration has zero AI integration: no provider dependency, no `/api/*ai` route, no edge function, no AI env var, no mock surface. Master §4 OPEN: *"Mostrar solo logos realmente usados."* | Either the claim is substantiated (a real integration exists and can be named) or the sentence — and the `IA` block on stage — comes out. **Recommended: remove.** |
| **`SI-12`** (new) | L335–L336 — *"si quiero buscar una garantía, tengo q saber donde esta"* | **No product referent.** No Assets module, no `Documentos` section, no warranty entity, and Planner search cannot reach documents (`planner.search.service.js:12-18`). The real nearest path is `Más → HomeCloud → Archivos → Buscar`. | Either the example is changed to something the product can show, or the route is presented explicitly as editorial. Master §4's OPEN (*"Ruta real exacta para tarea y garantía"*) is still open. |
| **`SI-13`** (new) | L343 vs on-screen text | **Spoken ≠ displayed at the film's key moment.** Script: *"¿que pasaría si ni siquiera tuviéramos que saber como?"* Screen: *"¿Y si ni siquiera tuviéramos que saber cómo?"* Different sentence **and** different orthography. Master §2.3 approves only the on-screen wording. | Which sentence the speaker says. If the master's wording stands, L343 must be corrected to match it. |
| **`SI-14`** (new) | L296, L298 vs on-screen text | **Duplication + omission + fabrication.** Script: *"la vida no ocurre separada en módulos"* / *"HomePlus tampoco debería sentirse así."* Screen: *"La vida no pasa por módulos."* / *"HomePlus los conecta."* Master §2.3: *"No duplicar lo que dice el expositor."* | Whether the thesis line stays on screen at all. If it does, it must be earned by an image (§7 F-B5). `HomePlus los conecta.` should be removed. |
| **`SI-15`** (new) | L304 vs S12 implementation | **Script and runtime disagree about who owns the deferral.** L304 says technologies come later; S12 opens with all five logos. | None required from the script — this is an implementation defect (G-02). Recorded so the script owner does not "fix" the script to match the implementation. |
| **`SI-01`** (pre-existing) | L347 etc. — `Geni` vs `Homi` | **Blocks the S14→S15 handoff.** The reveal is the moment the name is first spoken; if the script says *"Geni"* while the screen says `Homi`, the reveal fails. | Which name the speaker says at the reveal. The presentation is unambiguous (`HOMI`, 0 matches for `Geni` in `src/`). |

**Total this session: 7 new script issues (`SI-10`…`SI-15` is 6 new; `SI-07` and `SI-01` are pre-existing and re-evidenced).** Correction: **6 new** (`SI-10`, `SI-11`, `SI-12`, `SI-13`, `SI-14`, `SI-15`), with `SI-07` and `SI-01` re-evidenced by this session's findings.

---

## 32. Prioritized remediation

Grouped by root cause, per the brief's priority model. **P0 = story/technical truth problem. P1 = keynote-level quality problem. P2 = polish.**

### P0 — story / technical truth

| # | Remediation | Issues fixed | Effort |
|---|---|---|---|
| **P0-1** | **Put the product on stage for all of Scenes F, G and H.** One device, centred, carrying S11's convergence, all of S12–S13, and all of S14. | `F-01`, `F-05`, `G-01`, `H-01` — the root cause of 4 blockers and ~10 other findings | High, but it is the whole fix |
| **P0-2** | **Build the six-object continuity constellation** (Juli/colegio, Entrenamiento 18–20, Cumpleaños, Club, Supermercado, Garantía PlayStation) with the six frozen labels and the six frozen relations. | `F-01`, `F-04` | Low — all six components already exist |
| **P0-3** | **Build the `Nuevo movimiento` surface** and stage the `$48.720` transaction. | `G-05` | Medium — modelled on `NewMovementSheet.tsx` |
| **P0-4** | **Replace the warranty route with the real one:** `Más → HomeCloud → Archivos → Buscar → Garantía PlayStation 5.pdf`. | `H-02` | Low |
| **P0-5** | **Correct the task route labels** (`Inicio`, `Calendario`, `Tareas`, `+`, `Nueva tarea`) and show the shorter real path simultaneously. | `H-03` | Low |
| **P0-6** | **Resolve the AI claim.** Either substantiate it or remove the sentence and the `IA` block. | `G-12`, `SI-11` | None (decision) |
| **P0-7** | **Resolve `SI-10`** (technology order) before rebuilding Scene G. | `G-06` | None (decision) |

### P1 — keynote-level quality

| # | Remediation | Issues fixed |
|---|---|---|
| **P1-1** | **Add the backend verb language** (`RECIBE → VALIDA → RELACIONA → GUARDA/BUSCA → DEVUELVE`) as one auto microsequence behind the device. | `G-04` |
| **P1-2** | **Isolate real frontend components** (screen 108 %, button 115 %, navbar 110 %) instead of describing them. | `G-03` |
| **P1-3** | **Add the recomposition** — the layers converge back into one phone for *"una sola experiencia."* | `G-15` |
| **P1-4** | **Attach Figma to the frontend**, never on the centreline. | `G-10` |
| **P1-5** | **Give the absolving sentence a clean state** — both routes clear, one clean device, nothing around it. | `H-04` |
| **P1-6** | **Make the black reset sequential** — fade to black as an auto beat, then the question on a separate press. | `H-06`, `H-07` |
| **P1-7** | **Stop re-mounting S13 into S14.** The echo must dim an existing composition, never rebuild it. | `G-08` |
| **P1-8** | **Delete the dead press** at `S13_step00`. | `G-09` |
| **P1-9** | **Remove `HomePlus los conecta.`** and earn the thesis line with the convergence instead. | `F-03` |
| **P1-10** | **Remove the decorative bridge line and node.** | `G-07` |
| **P1-11** | **Remove the barrier line**, or earn it in the script first. | `H-11` |
| **P1-12** | **Separate Figma and IA onto their own presses.** | `G-11`, `G-14` |
| **P1-13** | **Replace the text pills with real components** for both routes. | `H-05` |
| **P1-14** | **Add the three missing holds** (G00, H-B5, and the post-convergence thesis hold). | §29 |

### P2 — polish

| # | Remediation | Issues fixed |
|---|---|---|
| **P2-1** | Drop the mono→colour logo crossfade; keep the role captions. | `G-13` |
| **P2-2** | Correct `API y lógica` → closer to *"parte de la lógica y los servicios"*. | `G-P1` |
| **P2-3** | Set the key question at 88–96 px in `--presentation-text`, two lines. | `H-10` |
| **P2-4** | Delete the dead `color: #ece5d8` on `.s12-tech img`; route the four remaining off-token values through tokens. | `G-17` |
| **P2-5** | Harden `.s14-echo`'s hidden state (`visibility` with a transition delay, or `display: none`). | `H-09` |
| **P2-6** | Apply directional easing (entrances ease out, exits ease in) across the block. | §28.4 |
| **P2-7** | If the routes stay editorial, stagger the nodes 60–100 ms so depth is visible. | `H-08` |
| **P2-8** | Exercise `prefers-reduced-motion` in the next runtime pass. | §28.4 |

**Sequencing constraint.** P0-7 (`SI-10`) must be resolved before P1-3/P1-4 are designed, because the technology order determines the state sequence. P0-6 must be resolved before the `IA` block is designed. Everything else can proceed in parallel.

---

## 33. Exact handoff to presentation developer

Directly actionable. No code. Every item names **what**, **when**, **why** and **how visually**.

### Scene F — S11

1. **Keep the black entry.** Do not fill it. But stop spending a press on it: let the S10→S11 scene change carry the audience from S10's product stage to black in one `SPATIAL_WIPE`. The first content press in S11 should be the one that brings the objects in.
2. **Delete `HomePlus los conecta.`** The speaker never says it, and master §2.3 forbids duplicating the speaker. Its job belongs to the phone frame.
3. **Keep the thesis line** (`La vida no pasa por módulos.` at 120 px) — it is the best-typographed moment in the block — but move it to **last**. It should appear 400–600 ms after the convergence settles, not on the press that opens the scene.
4. **Build the six-object constellation.** Reuse, do not rebuild: Juli/Educación Física from S04, Entrenamiento `18:00→20:00` from S06, `Cumpleaños · Sábado` from S08, the Club pin from S06, `Supermercado · $XX.XXX` from S09, `Garantía PlayStation 5.pdf` from S10. All six enter **together**, staggered 50–100 ms, total under 500 ms. Irregular layout — **not** a 3×2 grid. No object below ~180 px wide.
5. **Dim the objects to 40–50 %** and derive the six labels from them: `PERSONA`, `FECHA`, `RESPONSABILIDAD`, `UBICACIÓN`, `GASTO`, `ARCHIVO`. Each label must emerge **from its own object**, not from a list.
6. **Draw exactly six relations**, in this order, as one auto microsequence: `persona→responsabilidad`, `responsabilidad→fecha`, `persona→ubicación`, `gasto→archivo`, `fecha→responsabilidad`, `persona→gasto`. Thin lines. No ERD, no node graph, no glow.
7. **Return 3–4 everyday objects** (Juli, Cumpleaños, Supermercado, Garantía) to ~85 % over the dimmed structure.
8. **Converge everything toward centre** over 600–1000 ms; the individual objects stop being separate.
9. **Draw the phone frame around the convergence** over 600–900 ms. Fade the thesis line out as the frame lands. Final state: one HomePlus phone, centred.
10. **That phone is the shared element into S12.** Do not unmount it.

### Scene G — S12 + S13

11. **Open S12 on the phone from S11, centred, unchanged.** No logos, no labels, no cards. Hold for the whole of *"Aunque antes de hablar de las tecnologías…"*. Nothing moves.
12. **At *"Por un lado está el frontend"*,** move the phone to the left third and show a discreet `FRONTEND` label. Then run **one auto microsequence**: the real screen surface scales to 108 %, a real button to 115 %, the real navbar/menu to 110 %, then the surface returns to 100 %. No camera zoom, no giant labels.
13. **At *"Y por otro está el backend"*,** emerge a backend plane **from behind the phone** to the right. Then light the five verbs in sequence, at 26–32 px, hierarchy by active state not size: `RECIBE` → `VALIDA` → `RELACIONA` → `GUARDA / BUSCA` → `DEVUELVE`. On `RELACIONA`, show two small chips reading `Persona` and `Hogar` and hold ~600 ms.
14. **At *"Por ejemplo, cuando registramos un gasto"*,** build a `Nuevo movimiento` surface (model on `front/mi-front-limpio/components/finance/NewMovementSheet.tsx` — it has a `Monto` field at `:1181` and a description placeholder at `:1192`). Then run the transaction as **one auto microsequence**: `$48.720` visible → scales down → crosses **behind the device frame** → reappears backend-side → `RECIBE` → `VALIDA ✓` → `RELACIONA` (persona + hogar) → `GUARDA` → `DEVUELVE` → response returns → *movimiento guardado* holds ~400 ms.
15. **Delete the horizontal bridge line and node.** The connection between frontend and backend is the travelling datum, not a line.
16. **Delete `S13_step00`.** It is a byte-identical replay of `S12_step02` and a dead press.
17. **At *"Para construir el frontend…"*,** show React Native then Expo, in that order, 100–150 ms apart, with their role captions. **No colour crossfade.**
18. **At *"y en el Backend…"*,** show Node.js, then Supabase, then PostgreSQL, in that order, with their role captions. Change `API y lógica` to something closer to *"parte de la lógica y los servicios"*.
19. **At *"Y antes de programar las pantallas usamos Figma"*,** show Figma **alone**, attached to the frontend — above, behind or beside the Frontend card, with a thin connector to it. **Never on the centreline between the two cards.**
20. **At *"también usamos modelos de inteligencia artificial"*,** show the word `IA` as plain type with a short role caption. **No glyph, no glow.** If `SI-11` resolves to "remove", delete this beat entirely.
21. **At *"Son piezas bastante distintas"*,** separate the groups by a small, readable amount.
22. **At *"Tiene que sentirse como una sola experiencia"*,** run the recomposition: backend + Node/Supabase/Postgres retreat behind the phone, React Native/Expo converge to the surface, Figma dissolves toward the design layer, IA integrates, all lines disappear, the phone returns to centre and grows slightly. Final state: **one phone, centred, HomePlus open.**

### Scene H — S14

23. **Do not re-mount S13.** Let the stack dim and exit **as a block** while the phone from S13 stays. The echo must never rebuild.
24. **Open S14 on one clean phone, centred, unchanged.** Hold.
25. **At *"sigue existiendo fricción"*,** drop the exposure to ~75 %.
26. **At *"si quiero crear una tarea"*,** show the complete set of **real** tap-targets, all at once: the real `Inicio` tab, the real `Calendario` tab, the real `Tareas` tab, the real `+` button, and the `Nueva tarea` sheet title. Extracted from the device, laid out horizontally, with a thin connector back to the device. **No text pills.**
27. **At *"o si quiero buscar una garantía"*,** add the second route, also all at once and also real: `Más` → `HomeCloud` → `Archivos` → `Buscar` → `Garantía PlayStation 5.pdf`. **Show both routes simultaneously** — two different goals, two different paths, both of which must be known. That is the scene's point.
28. **At *"no porque la interfaz sea un problema"*,** clear **both** routes and any residual echo. One clean device at 100 %. Nothing around it. Hold for the whole sentence.
29. **At *"entonces nos hicimos una última pregunta"*,** drop the exposure to ~40 % and **hold in near-black**. This is a state, not an operator behaviour.
30. **On the next press,** fade to black over 600–900 ms, then show the question at 88–96 px in `--presentation-text` (`#F5F1EB`), two lines, centred, nothing else. Hold corto. Then fade the text to black.
31. **Delete the barrier line** at `S14_step03`. The script never asks for it, and at the centreline it reads as a front/back boundary.
32. **Delete the `→` arrows** if the routes become real components. If they stay editorial, stagger the nodes 60–100 ms left-to-right so the chain reads as a sequence.

### Transitions

33. **F→G:** the phone is the shared element. S11 ends on it; S12 opens on it, centred, unchanged. No remount.
34. **G→H:** the stack dims and exits as a block; the phone stays. One auto microsequence. Never a rebuild.
35. **H→Homi:** black → the name `Homi` alone, centred, clean, no glow → the device arrives **centred** and the name cedes to the Homi surface. Three states, one axis.

### Holds

36. Add three holds that do not currently exist as states: **G00** (the phone, for the whole of L304), **H-B5** (near-black, for L341), and the **post-convergence thesis hold** in S11. Remember: there is no timer and no auto-advance anywhere in the deck — a hold that is not a state is a hope.

---

## 34. Open questions

Genuinely unresolved. Each names the owner.

| # | Question | Owner | Blocks |
|---|---|---|---|
| **Q1** | **Technology order.** Is Figma spoken first (master §18 canonical) or sixth (current script L318)? | Script owner | `SI-10`, `G-06`, and the design of beats G04–G07 |
| **Q2** | **The AI claim.** Does any AI integration exist or is planned? If not, does L320 come out? | Product owner + script owner | `SI-11`, `G-12`, beat G07 |
| **Q3** | **The `$48.720` amount and field set.** Demo data, but it should be confirmed so it is not read as a real household figure. | Product owner | `G-05` implementation |
| **Q4** | **The `Nuevo movimiento` surface.** It exists in Integration (`NewMovementSheet.tsx`) but has not been reconstructed. Confirm the field set and the save confirmation copy. | Presentation developer + product owner | `G-05` implementation |
| **Q5** | **The warranty route.** Master §4's OPEN (*"Ruta real exacta para tarea y garantía"*) is still open. This audit recommends `Más → HomeCloud → Archivos → Buscar → Garantía PlayStation 5.pdf`; confirm. | Product owner + master owner | `H-02` |
| **Q6** | **The assistant name at the reveal.** Script says `Geni`, presentation says `Homi`. | Script owner | `SI-01`, the S14→S15 handoff |
| **Q7** | **The device's horizontal position in S15/S16.** It sits at `x = 718` (right third); master §2.9 implies central. Out of this session's scope, but it weakens the handoff. | Presentation developer | T-04 |
| **Q8** | **Whether the routes should be real components or editorial.** This audit recommends real components (NO-UI §14 H02). If the real components are not available in time, the fallback is an explicitly editorial representation — **never** text pills. | Master owner + presentation developer | `H-05` |

---

## 35. Files written

All under `C:\Users\thega\Desktop\HomeplusPresentacion01\HomePlus_Presentacion_FINAL\audit\`.

```
audit/04_SCENES_F_H_AUDIT.md    (this document)
```

**No other file was created, modified, renamed or deleted.** In particular: `00_AUDIT_NORMALIZATION.md`, `01_RUNTIME_BASELINE.md`, `01_RUNTIME_BASELINE_ERRATA.md`, `02_SCENES_A_B_AUDIT.md`, `00_HUMAN_HYPOTHESES.md`, `00_SOURCE_MAP.md`, `00_SESSION_PLAN.md` and `00_AUDIT_CONTRACT.md` are untouched, as are all files under `audit/runtime/session-01/` and `audit/runtime/session-02/`.

---

## 36. Production files modified

# NONE

Verified by SHA-256 manifest comparison, because this package is not a git repository (S1 §15).

**Method.** Every file under the package root except `node_modules/`, `audit/`, `.agents/`, `dist/` was hashed before this session's writes began and again after they completed.

| Metric | Before | After |
|---|---|---|
| Files in manifest | 153 | 153 |
| Total bytes | 1 280 774 | 1 280 774 |
| Files added | — | **0** |
| Files modified | — | **0** |
| Files deleted | — | **0** |

The only writes this session were to `audit/04_SCENES_F_H_AUDIT.md`, which is inside the excluded `audit/` tree and is the deliverable.

**Also confirmed untouched:** `package.json`, `pnpm-lock.yaml`, `package-lock.json`, `vite.config.ts`, `tsconfig.json`, `index.html`, `ABRIR_PRESENTACION.bat`, `LEEME.txt`, `.mise.toml`, `.gitignore`, `.gitattributes`, `skills-lock.json`, `.figma/**`, `assets/**`, `audit-input/**`, and all 130 files under `src/`.

**No git operation was performed.** No commit, no stash, no reset, no branch, no worktree, no push. No dependency was installed. No build was run.

---

## 37. Verification

Per `verifying-before-completion`: no completion claim is made without fresh evidence.

| Claim | How verified | Result |
|---|---|---|
| **No production file was modified** | SHA-256 manifest of 153 files, before vs. after | **PASS** — 0 added, 0 modified, 0 deleted |
| **The deliverable exists** | `Test-Path` on `audit/04_SCENES_F_H_AUDIT.md` | **PASS** |
| **The deliverable is non-empty and complete** | Written in 4 sequential appends; sections 1–37 all present | **PASS** |
| **`RECIBE`/`VALIDA`/`RELACIONA`/`GUARDA`/`DEVUELVE` are absent from the presentation** | `Select-String` across all `*.tsx`, `*.ts`, `*.css` under `src/` | **PASS** — 0 matches each |
| **`48.720` is absent from the presentation** | Same search | **PASS** — 0 matches |
| **`HomePlus los conecta.` is present only in S11** | Same search | **PASS** — 2 matches, both in `S11Continuity/index.tsx` (lines 10, 16) |
| **The warranty route's nodes are absent from the product** | Targeted search of `front/`, `backend/`, `supabase/`, `tests/`, `scripts/` | **PASS** — 0 matches for `playstation\|ps5\|warranty\|garant`; 0 occurrences of `Documentos` in `front/` |
| **The task route's real shape** | Source read with `path:line` citations | **PASS** — tab is `Calendario` (`HomeTabNavigator.tsx:165`); `+` opens a Modal (`PlannerScreen.tsx:760`); shorter path exists (`plannerQuickActions.ts:90-92`) |
| **The `Nuevo movimiento` surface exists in the product but not in the presentation** | `NewMovementSheet.tsx:996` read; `financeData.ts:1` read | **PASS** |
| **The three text collisions at `S14_step02`** | Bounding boxes extracted from `data/walk-forward.json` | **PASS** — overlaps of 102.66×21.8 px, 120.86×19.0 px, 62.26×50.8 px |
| **The S13→S14 remount** | `data/motion-summary.json` | **PASS** — 0 animating, 88 entering / 57 exiting |
| **The `S14_step04` text-table entry is a measurement artefact** | `s14-barrier.css:28` + `s13-stack.css:132-136` read; settled screenshot read | **PASS** — `.s13-center` re-asserts `visibility: visible` but ancestor `opacity: 0` suppresses painting |
| **Contrast of the in-scope text colours** | Computed against `#060404` | **PASS** — `#F5F1EB` 18.0:1, `#A49B94` 7.4:1, `#c7a084` 8.5:1 |
| **The current script is newer than the master** | File timestamps | **PASS** — 24/9/2026 vs 23/9/2026 |
| **No timer / auto-advance exists** | S1 §7 hold tests | **PASS** — `runningAnimations = [0,0,0,0,0]` across all 8 |

**Not verified, stated honestly:**

- **No fresh runtime capture.** All runtime numbers are Session 1's, re-read and re-queried. No new screenshots were taken this session; the in-scope screenshots were read back from Session 1's capture.
- **No audio.** No spoken↔visual sync was measured. Every timing statement is a state-count or transition-shape statement.
- **No `prefers-reduced-motion` run.** The block exists (`index.css:174`) but was not exercised.
- **No pointer interaction.** Only keyboard advance was ever tested (S1 §13.2 G8).
- **The target choreographies in §7, §17 and §27 are unverified.** They are recommendations, not measurements. They must be implemented and then re-walked before any of them is claimed to work.

---

**END OF SESSION 4 — SCENES F + G + H DEEP AUDIT**

*STOP. Session 5 has not been started. Nothing has been implemented. The script has not been edited. Production is unmodified.*

