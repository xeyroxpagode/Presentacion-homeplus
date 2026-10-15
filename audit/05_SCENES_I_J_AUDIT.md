# SESSION 5 — SCENES I + J DEEP AUDIT

> ## > NORMALIZATION NOTICE
> >
> > **See `audit/00_AUDIT_NORMALIZATION.md` for later cross-session corrections.**
> > **Raw evidence remains preserved below.**
> >
> > That file wins **for the named fact only**. Product Truth remains above it.
> >
> > ### The executive tally in §1 was WRONG and is corrected in place — `N-18`
> >
> > §1 claimed **7 BLOCKERS** (I 6 / J 1). The issue register in §12 labels **`I-15` as `BLOCKER` (decision)**. **The register is the raw-count authority (`N-42`).**
> >
> > **Canonical: Scene I = 7 (`I-01`…`I-06`, `I-15`) · Scene J = 1 (`J-01`) · TOTAL RAW BLOCKERS = 8.**
> >
> > **`I-15`'s severity was NOT changed to preserve "7".** It is graded `BLOCKER` in the register and it stays `BLOCKER`.
> >
> > **Keep two facts apart forever:**
> >
> > | | |
> > |---|---|
> > | **RAW BLOCKERS** | **8** — what this report graded |
> > | **ACTIVE CANONICAL BLOCKERS in Scene I** | **5** — because `I-15` is `RESOLVED_BY_AUTHORITY` under `N-22` |
> >
> > Full Session-5 raw register: **42 rows** = **24** unique `I-*` + **18** unique `J-*` · BLOCKER 8 · HIGH 18 · MEDIUM 9 · LOW 3 · POSITIVE 1 · ungraded 3.
> >
> > ### Other corrections
> >
> > | This report says | Correction |
> > |---|---|
> > | §1 — *"`S10` is the only scene in the deck that raises the device above 1.00"* (Session 3's claim, adopted here) | **`N-09` / `N-41`** — **false.** S10, **S15, S16 and S17** are all **1.08**. Your own measurement of box `718,25,324,670` with `matrix(1.08, …)` is the disproof. S10 is the only enlarged scene *within C/D/E*. |
> > | §12 `I-15` — three-way Finance data conflict | **`N-22`** — **RESOLVED_BY_AUTHORITY.** `NO_UI:1275-1280` §18 DEMO DATA CANON is a frozen presentation canon and is sufficient authority. Target: **one** dataset across S09 + Homi — `Supermercado $48.720` / `Monthly supermarket $184.320` / `12 movimientos` / `Nafta $32.500` / `PS5 Mar 2024 · $580.000`. **No fourth dataset was invented.** Raw severity `BLOCKER` **preserved**. Also: `"supermercado"` is a natural-language merchant token, **not** a Finance category key (`Alimentación` / `Compras` are) — do not require them to match. |
> > | §12 `I-18` / `I-27` — recommends changing `19:00` to fit the Figma picker | **`N-23`** — **recommendation REJECTED as a method.** `19:00` is frozen canon (`NO_UI:1265`, `:1284`). Product Truth sets **no** time restriction (`202606210003_schedules.sql:14-17`, unconstrained `time`) and Integration's `ActionSheet.tsx:184-185` offers 0–23 h. ⛔ **A Figma limitation must never rewrite canon.** Canonical: `MASTER DEMO = VALID` · `FIGMA TARGET = PROTOTYPE GAP`. `I-27` → `RESOLVED_BY_AUTHORITY`; `I-18` stays `ACTIVE` for its choreography half only. |
> > | §12 `I-12` — Papá's answer "invents" a Shopping List | **`N-20`** — finding **stands, ACTIVE**. Only the *reason* is refined: the correct characterisation is **"unsupported under current Product Truth"**, not *"does not exist anywhere"* — a complete Figma prototype **does** exist (`N-06`). |
> > | §12 `I-26` — *"Homi is not a product feature"* | **`N-21`** — **withdrawn as unsupported** (too absolute, out of audit scope). Canonical three-axis statement: **CURRENT** not implemented · **PRODUCT FREEZE** not implemented in that freeze · **PRESENTATION** is a concept / intended capability. Choreography may demonstrate Homi **conceptually**; the script must not assert implementation facts. |
> > | | §12 `J-15` — "DECISION REQUIRED which orange" | **`N-24`** — **RESOLVED_BY_AUTHORITY.** `#E7643F` is declared the HomePlus orange in **two** frozen masters (`MASTER:74`, `NO_UI:197`) and is what `Figma-app/src/index.css:10` uses. `#E65C1B` appears in **zero** authoritative documents. Decided by authority, **not** aesthetics. |
> > | §24 `J-04` / §30 `SI-10` — closing objects vs opening objects | **`N-25` / `CF-20`** — confirmed, and **kept as a SCRIPT ISSUE** (not a presentation defect), exactly as this report concluded. ⛔ Do **not** invent a new closing object vocabulary. The visual target should prefer objects the opening actually established. Canonical script ID is **`SI-23`** (`SI-10` was already taken by Session 4 — `N-28`). |
> > | §12 / §24 issue registers | Counted mechanically: **42 rows**, not 28. See `N-19`. Beat IDs (`I00`/`I01`/`t0`…`t4`) are choreography coordinates, **not** issues. Numbering gaps `I-08`, `I-14`, `I-16`, `I-17` are **source gaps, not missing findings**. |
> >
> > **No severity in this report was altered. No finding was deleted. The raw registers below stand as the evidence of record.**

**Mode:** READ-ONLY. No production file was created, modified, renamed or deleted.
**Package audited:** `C:\Users\thega\Desktop\HomeplusPresentacion01\HomePlus_Presentacion_FINAL`
**Audit port:** `8444` (presentation dev server, started by Session 1, reused as-is).
**Date of capture:** 2026-10-05.
**Runtime:** Vite 8.x dev server on 8444. Headless Chromium 1243 via `playwright-core` 1.63.0 resolved from Figma-app's pnpm store. No package installed, no lockfile touched, no build run.
**Verdict policy:** this document issues quality verdicts. It implements nothing.

**Coordinate correction recorded.** The human-hypothesis file and the brief use `S15`/`S16`/`S17`/`S18` as slide IDs. The runtime `data-slide-index` is 0-based, so `slideIndex 14` = `S15`. All adjudication below uses the canonical slide IDs (`S15 HOMI Action`, `S16 HOMI Context`, `S17 Human Control`, `S18 Closing`). This affects no finding.

**Normalization applied.** `audit/00_AUDIT_NORMALIZATION.md` N-01…N-05 are binding for this session. Specifically: N-03 (no fabricated ETA/distance), N-04 (Feed vs Conversation OPEN — all Feed recommendations provisional), N-05 (S07 132 px type is a preserved semantic exception). No normalization item conflicts with any Scene I/J finding.

---

## 1. Executive verdict

### Canonical severity tally for this session

> ### ⚠ CORRECTED 2026-10-05 — see `00_AUDIT_NORMALIZATION.md` **N-18**
>
> **8 BLOCKERS** — **Scene I: 7** (`I-01`, `I-02`, `I-03`, `I-04`, `I-05`, `I-06`, **`I-15`**) · **Scene J: 1** (`J-01`).
>
> This block originally said **7 BLOCKERS** (I 6 / J 1) and added *"No other issue in Scene I or Scene J is graded `BLOCKER`."* **The first clause was wrong.** The issue register in §12 labels **`I-15` as `BLOCKER` (decision)** — the register is the raw-count authority (`N-42`).
>
> **`I-15`'s severity was NOT changed to preserve "7".** It is graded `BLOCKER` and it stays `BLOCKER`. Its *canonical status* is `RESOLVED_BY_AUTHORITY` under `N-22`, because `NO_UI §18:1275-1280` freezes the Finance demo dataset — but a raw `BLOCKER` is a permanent fact, not a negotiable one (`N-43`).
>
> **Two counts that must be kept apart:**
>
> | | |
> |---|---|
> | **RAW BLOCKERS** | **8** |
> | **ACTIVE CANONICAL BLOCKERS in Scene I** | **5** |
>
> Every other issue in Scene I or Scene J is `HIGH`, `MEDIUM`, `LOW`, `POSITIVE` or ungraded.
>
> Full Session-5 raw register: **42 rows** = **24** unique `I-*` + **18** unique `J-*` · BLOCKER 8 · HIGH 18 · MEDIUM 9 · LOW 3 · POSITIVE 1 · ungraded 3.
>
> *(Tally issued here, not in `00_AUDIT_NORMALIZATION.md`. Sessions 7–8 must merge it — see `00_CANONICAL_ISSUE_REGISTRY.md` §1.)*

**Scene I is structurally wrong, not merely under-designed.** Six independent failures compound:

1. **The first Homi action is not the script's action.** The script (L355) and the frozen canon (master §3, NO_UI §15 I02) both specify `Haceme acordar de comprar una Coca mañana` → proposal `Crear tarea / Comprar una Coca / Mañana / Cancelar / Confirmar`. The runtime shows `Agendá que mañana Tomi tiene entrenamiento una hora más tarde.` → `Voy a actualizar el entrenamiento de Tomi para mañana y avisar a la familia.` → `Confirmar` → `Confirmado`. The frozen canon row is violated, and the demo teaches the wrong product behaviour: a chatbot rescheduling a third party's training and claiming it notified the family. → **I-01, BLOCKER.**

2. **No execution inside HomePlus is ever shown.** `S15_step03 → S15_step04` produces a chat success bubble (`Confirmado / Entrenamiento actualizado · Avisé a la familia`) inside the same chat. The core principle — *HOMI DOES NOT REPLACE HOMEPLUS, IT WORKS OVER HOMEPLUS* — is unproven. Master §15 lists "I Homi | Parecer chatbot aislado" as the #1 execution risk; it is realised. → **I-02, BLOCKER.**

3. **The on-stage question says "hoy"; the script, the master canon and the whole thesis say "mañana".** `HomiContextDemoScreen/index.tsx:17` sets `QUESTION = '¿Qué tengo que hacer hoy?'`. The speaker says `¿Qué me queda para mañana?` and the thesis is `ese mañana no es igual para todos. Es el mañana de cada uno.` The screen contradicts the speech and destroys the block's own argument. → **I-03, BLOCKER.**

4. **S17 CONFIRMS the mutation.** Master NO_UI §15 I26: *"NO confirmar."* Runtime `S17_step03` shows `Confirmado / Entrenamiento actualizado · Avisé a la familia` while the stage reads `La decisión es nuestra.` The screen contradicts itself within one frame, and it is the exact opposite of the frozen intent. → **I-04, BLOCKER.**

5. **S17 contains no visual HomePlus surface at all.** `phoneCount = 1` in all 4 S17 states, and it is always the Homi chat. The script says *"no significa reemplazar toda la aplicación por un chat"* and *"son dos formas de interactuar con el mismo sistema"*. Neither claim has any visual support; only one interaction form is ever shown. → **I-05, BLOCKER.**

6. **The entire Finance-through-Homi beat is absent.** Script L399–L413 (15 spoken lines, 8.6 % of Scene I's words) asks `¿Cuánto gastamos en supermercado este mes?` and the master dedicates beats I16–I19 to it. The runtime has no `supermercado`, no `$184.320`, no `12 movimientos`, no Finance surface. The last state of S16 is spent on generic context chips instead. → **I-06, BLOCKER.**

Compounding these: the device is absolutely static across 14 consecutive states and 3 scenes (measured box `718,25,324,670`, transform `matrix(1.08,…)` unchanged from `S15_step00` to `S17_step03`); there is no silence between the barrier question and Homi; the stage headline `La misma pregunta. / Distinto contexto.` is the exact titular the master forbids; Tomi's answer contradicts the script's own established fact; Papá's answer asserts a feature that does not exist in the product; and the closing resolves 35 spoken lines over 2 speakers in 4 states.

**Scene J is more salvageable and fails for one dominant reason: the closing argument does not exist.** Scene J carries **1** of this session's **~~7~~ 8** BLOCKERs (`J-01`); everything else in Scene J is `HIGH` or lower.

> **SUPERSEDED — see N-18.** The count **7** was this session's own published figure and is wrong: the register in §12 grades `I-15` as `BLOCKER` (decision). Canonical total **8** (I 7 / J 1). The corrected count does not change this paragraph's conclusion — Scene J still carries exactly one BLOCKER.

- **`S18Closing` is 32 lines of JSX with `stepCount: 4`.** The JSX contains exactly: logo + wordmark, 4 team members, `Muchas gracias.` 35 spoken lines (blocks 12 + 13, 82.8 s of speech at 150 ppm) resolve to those 4 states. The physical objects, the house, the family, the invisible work, the organization categories, the technology recession and the living moment are all absent. → **J-01, BLOCKER.**
- **Gaby's black is one tick, and the brand appears inside her block.** Master NO_UI §16 J00: *"Negro absoluto durante TODO el cierre de Gaby. Nada más."* Runtime: `S18_step00` is black (correct), `S18_step01` is the HomePlus brand. Per the baseline block mapping, block 12 (Gaby) covers `S18_step00…01`, so the brand arrives during Gaby's closing, not after it. → **J-02, HIGH.**
- **None of the closing objects exist as assets.** The package has `insurance-document.svg` (factura), `grocery-bag.svg` (bolsa), `family-avatars.svg` (4 avatars). It has **no** mochila, **no** heladera, **no** casa. Figma-app has **no** closing design, **no** illustration assets at all (zero `.svg`/`.png` in `src/`), and zero occurrences of `Muchas gracias`. The entire closing must be designed and produced from scratch. → **J-14, HIGH.**
- **The three closing objects are not the three the opening established.** Script L462–465 names `mochila / factura / heladera`. The opening (L15–21) established `seguro del auto → factura`, `compras → bolsa`, `heladera → garantía`. Only `heladera` overlaps, and even that has no visual asset. Master §2.5 mandates *"Cuando el mismo dato reaparece, debe ser el mismo objeto visual."* → **J-04, MEDIUM (SCRIPT ISSUE).**

**What must be preserved.** The Homi assistant chrome is genuinely good and should not be touched: it reuses the real `HomeHeader`, the real `homeTokens` design variables, the real app accent `#C96B45`, and the real `homi-mark.svg`. It looks like HomePlus, not like a chatbot. The device scale of 1.08 with stable internal geometry (282×602 in all 66 device states, per Session 1) is the correct enlargement lever and should be kept. The bubble entrance motion (fade + 10 px rise, 320/420 ms) is compliant with the motion system. The persona swap (fade + 14 px slide, 420 ms) is correct in principle. The question bubble stays byte-identical across the three personas (measured box `777,187,238,81` unchanged) — a genuine positive. The S18 end card composition (logo 120 px + 64 px wordmark + 4 members + 76 px `Muchas gracias.`, generous negative space) is well built and satisfies the end-card requirements. Juli's answer content is canon-consistent. The `Confirmar` / `Ahora no` side-by-side decision row is the right concept.

---

## 2. Evidence used

| Source | What was read / run | Where the evidence lives |
|---|---|---|
| **SCRIPT** | `C:\Users\thega\Downloads\Guion Compartido (2).md`, 497 lines, read in full; blocks 9–13 (L347–497) read line by line | quoted inline with line numbers |
| **MASTER (narrative + visual)** | `HOMEPLUS_PRESENTATION_MASTER_FREEZE_V1.0.md`, 2199 lines, read in full (§2 grammar, §3 canon, §13 Scene I, §14 Scene J, §15 stress test, §16 rules, §18 patched script) | quoted inline with section numbers |
| **MASTER (no-UI)** | `HOMEPLUS_PRESENTATION_NO_UI_MASTER_FREEZE_V2.0.md`, 1420 lines, read in full (§15 Scene I coreography freeze I00–I27, §16 Scene J final target J00–J23, §17 non-UI asset style, §18 demo-data canon) | quoted inline with section numbers |
| **CURRENT RUNTIME (session-01)** | `audit/01_RUNTIME_BASELINE.md`, 886 lines, read in full; 214 screenshots re-inspected for S14–S18 | cited as S1 §n |
| **CURRENT RUNTIME (session-05, fresh)** | 19 states walked at 1280×720 (`S14_step04` … `S18_step03`) with a purpose-built probe; 19 screenshots; 17 transitions sampled at 0/60/120/200/320/450 ms with `getAnimations()` + per-node computed style | `audit/runtime/session-05/data/stable-states.json`, `…/transition-trace.json`, `…/states/*.png` |
| **FIGMA TARGET** | `C:\Users\thega\Desktop\Figma-app` read-only static inspection with per-claim `path:line` citations. Runtime **not** launched — static evidence was sufficient on every question, as the brief allows. | cited inline as `src\…:line` |
| **INTEGRATION / PRODUCT** | `C:\Users\thega\Desktop\homeplus-worktrees\Family-Hub-Own-integration` read-only static inspection with per-claim `path:line` citations. Native runtime **not** launched. | cited inline as `front\…:line` / `backend\…:line` / `supabase\…:line` |
| **HUMAN HYPOTHESES** | `audit/00_HUMAN_HYPOTHESES.md` §3.9 (HW-I-001…016) and §3.10 (HW-J-000…002) read in full; `audit-input/USER_WALKTHROUGH_RAW.txt` read verbatim to check every I/J quote | quoted inline |
| **PRESENTATION SOURCE** | Every file under `src/presentation/` that contributes to S14–S18 read in full (slides, app-screens, components, motion, design-system, `index.css`, `navigation.ts`, `Presentation.tsx`, `presentationConfig.ts`) | cited as `path:line` |

**Evidence not available, stated explicitly:**
- **No audio, no real timing.** Whether a transition lands on the right word cannot be measured here. Every timing statement below is a *state-count* statement, not a sync measurement.
- **No audience, no room.** Legibility judgements convert logical px to projected px at a stated scale factor (1.5× for 1920×1080; 2.3× for a ~3 m-wide 16:9 screen). These are arithmetic projections, not observations.
- **Figma-app runtime was not launched.** All Figma-app evidence is static source. Where a claim depends on runtime behaviour, it is marked as such.

**Runtime errors:** 1 console 404 across 19 states, identified as `/favicon.ico`. Zero `pageerror`, zero failed app requests, zero application console errors.

---

## 3. Spoken-beat map — I

Speakers: **Benja** (block 9, L347–365), **Gaby** (block 10, L367–421), **Benja** (block 11, L423–440).
A beat is a change in idea, example, question, conceptual emphasis, product claim or narrative direction — **not** one script line.

| BEAT | SCRIPT (line) | INTENDED IDEA | EXPECTED VISUAL SUPPORT | CURRENT STATE(S) | HAS STATE? |
|---|---|---|---|---|---|
| **I-B1** | L349 *"Y ahí aparece Geni."* + L345 marker | The answer to the barrier question. Homi arrives as the solution, not as a new feature | Black → `Homi` name alone, clean reveal, no orb/glow. Then the phone enters | `S15_step00` — `Homi` at 110 px **and** the phone arrive together in one 320/420 ms fade | ✔ but wrong (I-06) |
| **I-B2** | L351–353 *"La idea es simple: en vez de tener que pensar dónde entrar o qué botón tocar, a veces podemos simplemente decir qué queremos hacer."* | The value proposition: no navigation, just say | Homi ready, no friction routes recovered (master §13 I1) | `S15_step00` — greeting `¿En qué te ayudo?` + composer `Pedile algo a Homi…` | ✔ |
| **I-B3** | L355 *"Haceme acordar de ir mañana a comprar una coca."* | The request. A simple, personal, immediate ask | Transcription appears synchronised, then sends | `S15_step01` — `Agendá que mañana Tomi tiene entrenamiento una hora más tarde.` | ✘ wrong text (I-01) |
| **I-B4** | L356–358 *"Geni entiende esa intención, nos muestra una propuesta y nosotros decidimos si confirmarla o no."* | **The decision point.** Homi proposes; the human decides | Structured proposal: `Crear tarea` / `Comprar una Coca` / `Mañana` / `Cancelar` / `Confirmar` | `S15_step02` — `Voy a actualizar el entrenamiento de Tomi para mañana y avisar a la familia.` (a sentence, not a proposal) | ✘ (I-01) |
| **I-B5** | L360–361 *"Recién después de esa confirmación, HomePlus realiza la acción."* | **The execution proof.** The action happens inside HomePlus, not in the chat | Tap Confirmar → Planner phone enters from a lateral → the same card detaches and travels → lands in Planner → hold → phone exits | `S15_step03` — `Confirmar` button appears. `S15_step04` — `Confirmado` chat bubble | ✘ (I-02) **BLOCKER** |
| **I-B6** | L365 *"Geni no vive al costado de HomePlus. Trabaja sobre HomePlus."* | **The thesis of Scene I.** Homi is not a separate app | Homi drops exposure; the underlying HomePlus surface becomes visible | `S15_step04` — chat success bubble at full exposure | ✘ (I-02) |
| **I-B7** | L369 *"Pero hacer algo es solo una parte."* | Transition from action to context | Homi low exposure | `S16_step00` — **empty Homi state** (`¿En qué te ayudo?`) | ✘ (I-07) |
| **I-B8** | L371–375 *"Porque Homi también puede trabajar con la información que HomePlus ya tiene. Entonces podemos preguntarle: '¿Qué me queda para mañana?'"* | The second capability: context-aware answers | Same transcription grammar; question sent | `S16_step01` — `¿Qué tengo que hacer hoy?` | ✔ but wrong text (I-03) |
| **I-B9** | L377–383 *"Y ahí la respuesta depende de quién esté preguntando. Homi puede tener en cuenta sus horarios, sus tareas y lo que tiene pendiente."* | The personalisation mechanism | Same device, same layout; only avatar, name, answer change | `S16_step01` — Juli chip + answer | ✔ |
| **I-B10** | L385–393 *"Por eso Juli, Tomi o papá pueden hacer exactamente la misma pregunta y recibir respuestas distintas. Porque ese 'mañana' no es igual para todos. Es el mañana de cada uno."* | **The thesis of block 10.** Same question, different tomorrow | Three devices emerge: Papá central, Juli left, Tomi right. Same question visible, three answers | `S16_step02` — Tomi. `S16_step03` — Papá. **One device only.** | ✘ (I-10) |
| **I-B11** | L399–403 *"Y esta misma idea se puede llevar a otras partes de HomePlus. Por ejemplo, podemos preguntar: '¿Cuánto gastamos en supermercado este mes?'"* | The Finance connection | Flanking devices exit; Papá remains; Finance question sent | `S16_step04` — `Basado en tu contexto / Calendario / Tareas / Pagos` | ✘ (I-06) **BLOCKER** |
| **I-B12** | L405–407 *"Y Homi puede buscar esa información dentro de Finanzas y responder usando los movimientos y datos que ya tenemos registrados."* | The answer is grounded in real Finance data | Brief answer: `Supermercado · este mes` / `$184.320` / `12 movimientos` | **absent** | ✘ (I-06) |
| **I-B13** | L409–413 *"Entonces no tenemos que pensar qué movimientos revisar o en qué parte de la aplicación buscarlo. Simplemente preguntamos lo que queremos saber."* | The benefit: no navigation, no reconstruction | Real Finance components visible behind the answer | **absent** | ✘ (I-06) |
| **I-B14** | L415–421 *"Y ahí está una de las ideas más importantes de Homi: no solamente entiende lo que le decimos. Puede relacionar esa intención con el contexto que HomePlus ya tiene."* | The synthesis: intent + context | Request + response at full definition; backing evidence appears | **absent** | ✘ (I-06) |
| **I-B15** | L425 *"Y eso no significa reemplazar toda la aplicación por un chat."* | **The boundary.** Chat is not the whole product | Homi phone exits up; a visual HomePlus phone enters from below | `S17_step00` — Homi chat only | ✘ (I-05) **BLOCKER** |
| **I-B16** | L427–429 *"La interfaz sigue siendo mejor cuando queremos mirar, comparar o tener control visual."* | The visual UI is still superior for some tasks | Brief scales on chart/summary, list/comparison, controls/filters | **absent** | ✘ (I-05) |
| **I-B17** | L431–433 *"Geni aparece cuando: decir lo que necesitamos es más rápido que encontrar cómo hacerlo."* | Homi is the faster path, not the only path | Visual UI exits up; Homi enters from below | **absent** | ✘ (I-05) |
| **I-B18** | L435 *"Son dos formas de interactuar con el mismo sistema."* | **Two forms, one system** | Both visible, no extra animation, let it breathe | **absent** | ✘ (I-05) |
| **I-B19** | L437–438 *"Y si una intención implica cambiar algo importante, Geni puede interpretar y proponer, pero:"* | A consequential proposal | Homi generates a structured proposal | `S17_step00` — `Puedo mover el entrenamiento de Tomi una hora más tarde y avisar a la familia.` | ✔ but wrong example (I-18) |
| **I-B20** | L440 *"la decisión final sigue siendo nuestra"* | **The human retains control** | Everything drops exposure except `Cancelar` / `Confirmar`. Do not confirm. Hold. | `S17_step01` — `Confirmar` / `Ahora no`. `S17_step02` — `La decisión es nuestra.` at 84 px. `S17_step03` — **`Confirmado`** | ✘ (I-04) **BLOCKER** |

**Beat arithmetic:** 20 beats against 14 states. Ratio 0.70. The ratio is *not* the problem — **6 spoken beats have no visual state at all** (I-B5 execution proof, I-B11–I-B14 the entire Finance beat, I-B15–I-B18 the visual-UI boundary) and the states that do exist are spent on a wrong demo, a wrong question, a forbidden titular and a confirmation that should not happen.

**Pacing measurement (this session, from the script):**

| Block | Speaker | Spoken lines | Words | Est. @150 ppm | Current states | Seconds per state |
|---|---|---|---|---|---|---|
| 9 — Presentación de HOMI | Benja | 11 | 67 | 26.8 s | 5 (`S15`) | 5.4 s |
| 10 — Continuación de HOMI | Gaby | 27 | 175 | 70.0 s | 5 (`S16`) | 14.0 s |
| 11 — Control Humano | Benja | 10 | 67 | 26.8 s | 4 (`S17`) | 6.7 s |
| **Scene I total** | | **48** | **309** | **123.6 s** | **14** | **8.8 s** |

**Adjudication of the brief's pacing premise (§46).** The brief states *"S16: 27 spoken lines / 5 states"* as an example of high narration density. **This is refuted by measurement.** 27 lines / 5 states = 14.0 s per state, which is *slow*, not dense. S16 is **under-stated**, not over-stated. The correct pacing problem in Scene I is the opposite: the content is wrong, and S16 needs **more** states to carry the missing Finance beat. S15 at 5.4 s/state is about right in count but wrong in content. S17 at 6.7 s/state is about right in count but step02 duplicates the speech and step03 must be deleted.

---

## 4. Homi entry audit

**Scope:** `S14 → S15` only as a transition. S14 is not re-audited.

**What the script and masters require.**

| Source | Requirement |
|---|---|
| Script L341–343 | *"entonces nos hicimos una última pregunta. ¿que pasaría si ni siquiera tuviéramos que saber como?"* |
| Script L345 marker | `[Aca va la que arranca geni]` |
| Script L349 | *"Y ahí aparece Geni."* |
| Master §13 H4 | HomePlus fades → black. **EN PANTALLA:** `¿Y si ni siquiera tuviéramos que saber cómo?` Negro + texto blanco. Hold corto. Fade del texto → negro. |
| Master §13 I0 | **EN PANTALLA:** `Homi`. Reveal limpio. Sin esfera, aura, partículas ni glow de IA. **Después el nombre cede lugar a un teléfono HomePlus con superficie Homi.** |
| NO_UI §15 I00 | Black → `Homi`. Nombre limpio. Sin orb/glow. |
| NO_UI §15 I01 | Phone Homi entra/aparece. |

**What the runtime does (measured).**

| Transition | Measured behaviour |
|---|---|
| `S14_step04` (stable) | Barrier question at 132 px white + 132 px warm tan, on near-black `#0B0908`. No device. |
| `S14_step04 → S15_step00` | **0 transition animations.** `s15-scene-in` (320 ms opacity) and `s15-phone-in` (420 ms, opacity + 16 px rise) start. The barrier text is unmounted instantly. |
| `S15_step00` (stable) | `Homi` at 110 px, opacity 1, at `left:100px`, vertically centred. Phone at `718,25,324,670`, scale 1.08. Both present simultaneously. |

**Findings.**

| ID | Question | Verdict |
|---|---|---|
| **I-06** | I-E2: *¿Hay suficiente silencio antes de que Homi aparezca?* | **NO.** There is no silence state at all. The barrier question is unmounted the instant the key is pressed, and `Homi` + phone fade in over 320/420 ms. Master §13 H4 requires *"Hold corto. Fade del texto → negro."* and NO_UI I00 requires the name **alone** on black before the phone. Neither exists. The audience gets one keypress of transition where the master requires a held black beat. **HIGH.** |
| **I-06** | I-E3: *¿Debería Homi aparecer primero como palabra/nombre y luego como UI de producto?* | **YES, and it does not happen.** Master §13 I0: *"Después el nombre cede lugar a un teléfono."* Runtime: `Homi` at 110 px is present in **all 5** S15 states at full opacity and never cedes. The name and the phone arrive together and the name stays for the whole scene. **MEDIUM.** |
| **I-06** | I-E4: *¿La motion actual introduce demasiado de una vez?* | **YES.** At `S15_step00` three things appear simultaneously: the 110 px name, the phone (with its 16 px rise), and the ambient glow. Master §13 I0 wants the name alone first, then the phone. **MEDIUM.** |
| **I-06** | I-E5: *¿El lenguaje visual de Homi se siente como HomePlus?* | **YES inside the device, NO on stage.** Inside: the device reuses `HomeHeader`, `homeTokens`, the app accent `#C96B45` and `homi-mark.svg`. It looks like HomePlus. On stage: `Homi` at 110 px is a static wordmark with zero relationship to the device content, and it duplicates the name that already appears at 20 px inside the device and in the composer placeholder `Pedile algo a Homi…`. Three instances of the same word. **MEDIUM.** |
| — | I-E1: *¿La entrada actual se siente causalmente ganada?* | **PARTIALLY.** The barrier question is the correct setup and the transition is clean. But because there is no black hold, the causal link is asserted by the speaker rather than felt by the audience. The question and Homi are separated by 320 ms of crossfade, not by a beat of silence. |

**Positives.** The barrier question text is correct and approved (master §2.3). The device arrival motion (opacity + 16 px rise, 420 ms) is compliant with the motion system. The `homi-mark.svg` (orange rounded square, white 4-point sparkle) is a static icon, not an animation, and does not violate master §13 I0's prohibition on *"esfera, aura, partículas ni glow de IA"*. It is the only AI signifier in the scene and it is restrained.

---

## 5. First action demo audit

**Script truth (L351–361).**

> *"La idea es simple: en vez de tener que pensar dónde entrar o qué botón tocar, a veces podemos simplemente decir qué queremos hacer. Por ejemplo: 'Haceme acordar de ir mañana a comprar una coca'. Geni entiende esa intención, nos muestra una propuesta y nosotros decidimos si confirmarla o no. Recién después de esa confirmación, HomePlus realiza la acción."*

**Frozen canon (master §3).**

> `Homi / acción` | request oral `Haceme acordar de comprar una Coca mañana`; propuesta = **Crear tarea**, no recordatorio.

**NO_UI §15 I02–I03.**

> I02: Sistema de transcripción preparado: `Haceme acordar de comprar una Coca mañana`
> I03: Proposal semantic: `Crear tarea` / `Comprar una Coca` / `Mañana` / `Cancelar` / `Confirmar`

**Runtime truth (measured, `HomiDemoScreen/index.tsx:19-39`).**

| State | Element | Text | Visible |
|---|---|---|---|
| `S15_step00` | `.homi-greeting` | `¿En qué te ayudo?` | yes |
| `S15_step00` | `.homi-composer-hint` | `Pedile algo a Homi…` | yes |
| `S15_step01` | `.homi-user-bubble` | `Agendá que mañana Tomi tiene entrenamiento una hora más tarde.` | yes |
| `S15_step02` | `.homi-proposal` | `Voy a actualizar el entrenamiento de Tomi para mañana y avisar a la familia.` | yes |
| `S15_step03` | `.homi-confirm` | `Confirmar` | yes |
| `S15_step04` | `.homi-done` | `Confirmado` / `Entrenamiento actualizado · Avisé a la familia` | yes |

**Findings.**

| ID | Question | Verdict |
|---|---|---|
| **I-01** | I-A8: *¿El ejemplo actual coincide con el guion?* | **NO.** The script says `Haceme acordar de ir mañana a comprar una coca`. The runtime says `Agendá que mañana Tomi tiene entrenamiento una hora más tarde.` The frozen canon row (master §3) is violated. The demo is not a personal reminder-to-buy; it is a third-party schedule mutation plus a family notification. This is the exact failure mode the brief §6 forbids: *"a fake autonomous agent"*. **BLOCKER.** |
| **I-01** | I-A1: *¿S15 muestra a Homi interpretando la intención?* | **NO.** There is no interpretation beat. The request appears as a complete bubble (fade + 10 px rise, 320/420 ms) and is immediately followed by the proposal. The audience never sees Homi *understand* — only *respond*. |
| **I-01** | I-A2: *¿Homi distingue claramente propuesta de ejecución?* | **NO.** The proposal is a sentence (`Voy a actualizar…`) in the same card class as every other message. There is no action type, no date field, no structured diff. The proposal and the execution are visually indistinguishable until the success bubble appears. |
| **I-01** | I-A7: *¿Es la primera demo lo suficientemente simple para entender al instante?* | **NO.** The audience must parse: (a) a request that is a statement about someone else's schedule, (b) a proposal that chains two actions (reschedule + notify), (c) a single `Confirmar` with no alternative. The speaker is saying *"haceme acordar de ir mañana a comprar una coca"* while the screen shows something else entirely. The mental model set by the speech is contradicted by the screen. |
| **I-01** | I-A6: *¿Algún visual actual implica acción autónoma antes de la confirmación?* | **NO.** The proposal text uses future tense (`Voy a actualizar…`), which is correct. No autonomous action is implied before `Confirmar`. **This is a positive.** |
| — | I-A3: *¿Es la confirmación del usuario visualmente obvia?* | **PARTIALLY.** `Confirmar` is a solid brand-orange full-width button at 54 px — the strongest element in the thread. But there is **no cancel path in S15**. Only `Confirmar` exists. The script says *"nosotros decidimos si confirmarla o no"*; the UI offers only one direction. See **I-19**. |
| — | I-A4: *¿La presentación prueba que la acción ocurrió dentro de HomePlus?* | **NO.** See **I-02**. |
| — | I-A5: *¿La motion preserva el mismo objeto semántico?* | **NO.** The proposal card and the success bubble are different components with different classes. The task is never shown as the same object moving into a HomePlus surface. See **I-02**. |

**Positives.** The assistant chrome is real HomePlus UI. The bubble entrance motion is compliant. The proposal uses future tense. The `Confirmar` button is visually dominant. The thread is bottom-aligned with a stable layout (no reflow when elements appear).

---

## 6. Proposal / confirmation audit

**What the masters require.**

| Source | Requirement |
|---|---|
| Master §13 I3 | Homi interpreta y muestra: **Crear tarea** / `Comprar una Coca` / `Mañana` / `Cancelar` / `Confirmar`. No `recordatorio`. Propuesta hace un micro scale al ser mencionada. |
| Master §13 I4 | En `Recién después de esa confirmación`: tap Confirmar. Desde un lateral entra un segundo teléfono con Planner/Tareas abierto. La card `Comprar una Coca · Mañana` se desprende de Homi y se posiciona exactamente en su lugar dentro de Planner. Hold corto. Teléfono Planner vuelve a salir. Queda Homi. |
| Master §2.4 | *"Propuesta Homi → tarea entrando en un segundo teléfono con Planner"* is an approved **editorial** transition. |
| Master §2.9 | *"teléfono auxiliar de Planner: entra desde un lateral, recibe la task y vuelve a salir"*. |
| NO_UI §15 I03 | `Crear tarea` / `Comprar una Coca` / `Mañana` / `Cancelar` / `Confirmar` |
| NO_UI §15 I04–I07 | Confirmar: tap → Planner phone entra desde lateral → proposal task se desprende → shared element viaja → aterriza en Planner → phone Planner hold → sale por lateral → Homi queda |
| Brief §14 | The proposal should communicate: ACTION TYPE / CONTENT / DATE-CONTEXT / CANCEL / CONFIRM. |

**What the runtime does.**

| Element | Runtime | Required |
|---|---|---|
| Action type | **absent** | `Crear tarea` |
| Content | `Voy a actualizar el entrenamiento de Tomi para mañana y avisar a la familia.` (a sentence) | `Comprar una Coca` |
| Date / context | **absent** (embedded in the sentence) | `Mañana` |
| Cancel | **absent** in S15 | `Cancelar` |
| Confirm | `Confirmar` (54 px, brand orange, full width) | `Confirmar` |
| Micro scale on mention | **absent** | yes |
| Second device (Planner) | **absent** (`phoneCount = 1` in all S15 states) | yes |
| Shared element travel | **absent** | yes |
| Hold after landing | **absent** | yes |
| Planner phone exits | **absent** | yes |

**Findings.**

| ID | Finding | Severity |
|---|---|---|
| **I-01** | The proposal has no semantic structure. It is a sentence, not a proposal. The audience cannot tell what kind of action is being proposed, what the content is, or when it would happen. Master §13 I3 is violated in full. | **BLOCKER** (with I-01) |
| **I-02** | There is no execution proof. `S15_step04` is a chat success bubble, not a HomePlus surface. The core principle of Scene I is unproven. | **BLOCKER** |
| **I-19** | S15 has no cancel path. Only `Confirmar`. The script says *"decidimos si confirmarla o no"*; the UI offers one direction. Master §13 I3 requires `Cancelar` / `Confirmar`. | **MEDIUM** |
| **I-19** | S17 has `Confirmar` / `Ahora no`. `Ahora no` is not `Cancelar`. Per `designing-user-experience` Step 4, a button label must name the action and be readable out of context. `Ahora no` is a weak, ambiguous label for a rejection. | **MEDIUM** |
| **I-22** | `.homi-proposal` is the same CSS class used for the S15 proposal, the S16 answers and the S17 proposal. Three different semantic roles share one visual treatment. The audience cannot distinguish a *proposal* from an *answer* from a *decision*. | **MEDIUM** |
| — | The `Confirmar` button has `cursor: default`, `tabIndex={-1}`, and no `:active` or `:focus-visible` state anywhere in `homi-screen.css` or `decision-screen.css`. It looks like a button but is not interactive. The single most important gesture in Scene I — the human confirming — is represented by the same keypress as every other state change, with no press feedback. Per `designing-user-experience` Step 5, every user action needs acknowledgement within 100 ms; here the acknowledgement is the next state, one keypress later. | **MEDIUM** |

**Positives.** The `Confirmar` button is visually dominant (solid brand orange, 54 px, full width). The decision row in S17 places `Confirmar` and `Ahora no` side by side at equal height, which is the correct spatial relationship for a binary choice. The proposal card has a stable box (`745,345,270,147`) that does not reflow when it appears.

---

## 7. HomePlus execution proof audit

**The frozen requirement.** Master §13 I4 and NO_UI §15 I04–I07 both require: after `Confirmar`, a second device carrying Planner/Tareas enters from a lateral; the proposed task detaches from Homi and travels as a shared element; it lands exactly in its place inside Planner; hold; the Planner device exits; Homi remains. Master §2.4 classifies this as an approved **editorial** transition, not a real navigation.

**Product truth (verified).**

| Claim | Evidence | Verdict |
|---|---|---|
| A task can be created in HomePlus | `supabase/migrations/202606230001_planner_mvp.sql:6-35` → `planner_tasks` table; `backend/src/routes/planner.js:95` → `router.post('/tasks', tasksController.createTask)`; `backend/src/services/planner.tasks.service.js:637-676` → only `title` is required, `due_date`/`due_time` are optional | **EXISTS** |
| A task with a title and a date maps to the Homi proposal | `planner_tasks.title` (required) + `planner_tasks.due_date` (optional) | **EXISTS** |
| Figma-app can show a new task landing in a list | `src/planner/Forms.tsx:524` → `addTask(t)`; `src/planner/store.tsx:729` → `setExtra((p) => [t, …p])`; `src/planner/Tasks.tsx:617` → `TasksScreen()` at route `planner-tareas` | **EXISTS** |
| The presentation has a Planner tasks screen | `src/presentation/app-screens/PlannerDemoScreen/PlannerTasks.tsx` exists | **EXISTS** |

**Runtime truth.** `phoneCount = 1` in all 5 S15 states. The device box is `718,25,324,670` in all 5 states. There is no second device, no Planner surface, no shared element, no travel, no landing, no hold.

**Findings.**

| ID | Finding | Severity |
|---|---|---|
| **I-02** | The execution proof is entirely absent. `S15_step04` shows `Confirmado / Entrenamiento actualizado · Avisé a la familia` inside the chat. The audience never sees the action happen inside HomePlus. The core principle — *HOMI WORKS OVER HOMEPLUS* — is asserted by the speaker and unproven by the screen. Master §15 lists *"I Homi \| Parecer chatbot aislado"* as the #1 execution risk; it is realised. | **BLOCKER** |
| **I-02** | The product truth fully supports the required proof. `planner_tasks` exists, `POST /api/planner/tasks` exists, and Figma-app's `addTask` → `TasksScreen` pipeline exists. The presentation already has a `PlannerDemoScreen/PlannerTasks.tsx`. There is no product reason this cannot be shown. | (evidence for I-02) |
| **I-02** | The master explicitly forbids faking a Homi→Planner navigation route. The correct implementation is an **editorial** shared-element transition: the same card detaches, travels, and lands in a second device that enters from a lateral and exits afterwards. This is achievable with the existing `PhoneFrame` component and the existing `PlannerTasks` screen. | (target for I-02) |

**Positives.** The presentation already contains every component needed to build the proof: `PhoneFrame` (with a `scale` prop), `PlannerDemoScreen/PlannerTasks.tsx`, and the `s15-phone-motion` wrapper that can host a second device. The motion system already has `motion-spatial-wipe` (500 ms) which is the correct primitive for a lateral device entry.

---

## 8. Personal-context audit

**Script (L369–397).**

> *"Pero hacer algo es solo una parte. Porque Homi también puede trabajar con la información que HomePlus ya tiene. Entonces podemos preguntarle, por ejemplo: '¿Qué me queda para mañana?' Y ahí la respuesta depende de quién esté preguntando. Homi puede tener en cuenta sus horarios, sus tareas y lo que tiene pendiente. Por eso Juli, Tomi o papá pueden hacer exactamente la misma pregunta y recibir respuestas distintas. Porque ese 'mañana' no es igual para todos. Es el mañana de cada uno."*

**Frozen canon (NO_UI §18).**

| Person | Canon |
|---|---|
| Juli | 10 años · Educación Física · 08:00 · Llevar autorización · Tarea del cole |
| Tomi | 16 años · Colegio · 08:00–16:30 · Training `18:00–19:00 → 18:00–20:00` · Entregar trabajo de Historia |

**Runtime truth (measured, `HomiContextDemoScreen/index.tsx:17-44`).**

| State | Persona | Tag | Answer |
|---|---|---|---|
| `S16_step00` | — | — | `¿En qué te ayudo?` (empty state) |
| `S16_step01` | Juli | Colegio | `Hoy tenés Educación Física a la mañana, llevar la autorización y la tarea de Matemática.` |
| `S16_step02` | Tomi | Club | `Hoy tenés entrenamiento a las 17 h. Mamá te pasa a buscar a la salida.` |
| `S16_step03` | Papá | Hogar | `Hoy: Internet ya está pago, revisá la lista de compras y confirmá al técnico.` |
| `S16_step04` | Papá | Hogar | same + `Basado en tu contexto` / `Calendario` / `Tareas` / `Pagos` |

**The question.** `HomiContextDemoScreen/index.tsx:17` → `const QUESTION = '¿Qué tengo que hacer hoy?'`

**Findings.**

| ID | Question | Verdict |
|---|---|---|
| **I-03** | I-C1: *¿Es la pregunta visiblemente idéntica entre personas?* | **YES.** Measured: the `.homi-user-bubble` box is `777,187,238,81` in `S16_step01`, `S16_step02` and `S16_step03`. The question text is identical. **This is a positive.** |
| **I-03** | I-C1 (thesis): *¿La pregunta es "mañana"?* | **NO.** The screen says `¿Qué tengo que hacer hoy?`. The script says `¿Qué me queda para mañana?`. The master canon says `mañana`. The thesis is *"ese mañana no es igual para todos. Es el mañana de cada uno."* The screen contradicts the speech and destroys the block's own argument. If the question is always "hoy" and always the same day, the "mañana de cada uno" line has no referent on stage. | **BLOCKER** |
| **I-07** | I-C3: *¿Cambia solo el contexto relevante?* | **PARTIALLY.** The persona chip and the answer change correctly. But `S16_step00` re-shows the **empty Homi state** (`¿En qué te ayudo?` + `Pedile algo a Homi…`) after a 5-state conversation in S15. The thread is not continuous. The audience just watched Homi act; now it is reset to zero. This breaks the "same device, same layout, only persona changes" logic and wastes a state. | **MEDIUM** |
| **I-09** | — | *La misma pregunta. / Distinto contexto.* at 56 px is present in **all 5** S16 states at full opacity. Master §13 I7 says verbatim: *"No poner titular `misma pregunta, distintas respuestas`."* The runtime is a near-paraphrase of the forbidden titular. It states the conclusion out loud, taking the discovery away from the audience. | **HIGH** |
| **I-10** | I-C6: *¿La UI actual muestra suficiente contexto de HomePlus para probar que la respuesta está fundamentada?* | **NO.** `phoneCount = 1` in all 5 S16 states, and it is always the Homi chat. There is no HomePlus surface behind or beside the answer. The claim *"Homi trabaja con la información que HomePlus ya tiene"* has zero visual evidence. The answer exists only as a chat bubble. | **HIGH** (with I-02) |
| **I-11** | Persona data: Tomi | **CONTRADICTS THE SCRIPT.** Script L97: *"el entrenamiento se alarga una hora y mamá ya no llega."* Runtime: *"Mamá te pasa a buscar a la salida."* The answer asserts the exact opposite of the story fact that generated the whole `¿Quién puede pasar a buscarlo?` pivot. Additionally, the canon (NO_UI §18) is `18:00–19:00 → 18:00–20:00`; the runtime says `17 h`. A third time value. | **HIGH** |
| **I-12** | Persona data: Papá | **INVENTS A NONEXISTENT FEATURE.** *"revisá la lista de compras"* — the shopping list does not exist in Integration (0 tables, 0 routes, 0 screens; only `template_key='shopping'` as a task type and a `Compras` expense category). Additionally: *"Internet ya está pago"* converts Scene D's unanswered question (L200 `¿Internet ya está pago?`) into an asserted fact; *"confirmá al técnico"* converts a 4-hour window (L123 `entre las cuatro y las seis`) into a specific appointment. | **HIGH** |
| **I-13** | The `Basado en tu contexto` beat | **NOT IN THE SCRIPT.** `HomiContextDemoScreen/index.tsx:46` → `CONTEXT_SOURCES = ['Calendario', 'Tareas', 'Pagos']`, rendered at `:87-94`, visible only at `S16_step04`. The script passes from the per-person agenda directly to Finance (L399–403). These are generic module names, not data. They claim grounding without providing any. And they are attached to the Papá answer, not to the Finance question. | **HIGH** |
| — | Persona data: Juli | **CONSISTENT.** `Educación Física`, `autorización`, `tarea de Matemática` match the canon (NO_UI §18). The only deviation is `Hoy` instead of `mañana` (I-03) and `Matemática` instead of the script's generic `tarea del colegio`. | **POSITIVE** |
| — | I-C2: *¿Cambia la identidad claramente?* | **YES.** The persona chip (avatar + name + tag) changes with a 420 ms fade + 14 px slide. The avatar colours are distinct: Juli `#B57A1A`, Tomi `#2D6A8A`, Papá `#4A4542`. | **POSITIVE** |
| — | I-C4: *¿El espectador entiende POR QUÉ cambia la respuesta?* | **PARTIALLY.** The persona chip makes the identity change clear. But because the question says "hoy" and the answers are all about "hoy", the audience has no way to see that the *same* question would produce different answers on different days. The personalisation is asserted, not demonstrated. | **MEDIUM** |
| — | I-C5: *¿Hay animación innecesaria entre personas?* | **NO.** The persona swap is a single 420 ms fade + 14 px slide. It is the correct duration and the correct primitive. | **POSITIVE** |

**Positives.** The question bubble is byte-identical across personas (measured). The persona chip is clear and well-coloured. The swap motion is compliant. Juli's answer is canon-consistent. The identity change is immediate and unambiguous.

---

## 9. Juli / Tomi / Papá comparison audit

**The frozen requirement (master §13 I6–I7, NO_UI §15 I10–I14).**

| Beat | Requirement |
|---|---|
| I6 / I10 | Usar la misma gramática de transcripción. Enviar `¿Qué me queda para mañana?`. La UI general NO cambia durante las respuestas. Solo transforman: avatar, nombre, respuesta. Orden: Juli → Tomi → Papá. |
| I6 / I11–I13 | Mismo Homi. Solo transforman: avatar, nombre, respuesta. |
| I7 / I14 | Terminar con Papá en teléfono central. En `ese mañana no es igual para todos. Es el mañana de cada uno.`: desde detrás del teléfono central salen los otros dos teléfonos: izquierda y derecha. Resultado: tres teléfonos, misma pregunta, tres respuestas distintas. |
| I7 | No poner titular `misma pregunta, distintas respuestas`. |
| Master §2.9 | *"respuestas Juli/Tomi: salen desde detrás del teléfono central hacia izquierda/derecha"*. |
| Master §2.9 | *"tres teléfonos = máximo simultáneo y solo cuando la comparación lo justifica"*. |

**Runtime truth.** `phoneCount = 1` in all 5 S16 states. The device box is `718,25,324,670` in all 5 states. There is no second or third device at any point.

**Findings.**

| ID | Finding | Severity |
|---|---|---|
| **I-10** | The three-device comparison does not exist. The master's I7 / NO_UI I14 is the single moment where the comparison *is* the point, and it is the only place in Scene I where three devices are justified. Its absence means the block's thesis — *"misma pregunta, respuestas distintas"* — is never visually proven. The audience sees three sequential single-device states and must infer the comparison. | **HIGH** |
| **I-10** | The stage headline `La misma pregunta. / Distinto contexto.` is the master's forbidden titular (I-09). The correct implementation is the three-device reveal, not a headline. | (with I-09) |
| — | **Multi-device assessment (brief §20).** The master's three-device moment is **stage-effective and should be implemented**. It is the only moment in Scene I where the comparison is the argument, it is the only place where three devices are justified, and it is the only way to make "same question, different answers" legible at projection distance. The risk is readability: three devices at 1.08 scale = 972 px + 2 gaps on a 1280 canvas with 48 px safe area → 1184 px usable, 106 px per gap. Feasible. The mitigation: at the three-device beat, extract the question bubble as a **shared element** that rises above the row of three devices at readable size, while the three answers stay in their devices at native scale. This satisfies "same question visible" without a rhetorical headline and without scaling the devices down. | (target for I-10) |
| — | **Persona data reconciliation.** The canon (NO_UI §18) and the runtime disagree on Tomi's training time (`18:00–20:00` vs `17 h`) and on Mamá's availability (`ya no llega` vs `te pasa a buscar`). The runtime must be corrected to match the canon. Juli's data is correct. Papá's data must be rewritten to remove the nonexistent shopping list and to stop converting open questions into facts. | (with I-11, I-12) |

---

## 10. Finance-through-Homi audit

**Script (L399–413).**

> *"Y esta misma idea se puede llevar a otras partes de HomePlus. Por ejemplo, podemos preguntar: '¿Cuánto gastamos en supermercado este mes?' Y Homi puede buscar esa información dentro de Finanzas y responder usando los movimientos y datos que ya tenemos registrados. Entonces no tenemos que pensar qué movimientos revisar o en qué parte de la aplicación buscarlo. Simplemente preguntamos lo que queremos saber. Y ahí está una de las ideas más importantes de Homi: no solamente entiende lo que le decimos. Puede relacionar esa intención con el contexto que HomePlus ya tiene."*

**Frozen canon (NO_UI §15 I16–I19, §18).**

| Beat | Requirement |
|---|---|
| I16 | Request: `¿Cuánto gastamos en supermercado este mes?` |
| I17 | Low exposure during explanation. |
| I18 | Response: `$184.320` / `12 movimientos` |
| I19 | Request/response foreground. Detrás: componentes reales de Finance que sustentan la respuesta. UI OWNER los provee. |
| §18 | Finance: Supermercado `$48.720` (single) · Monthly supermarket `$184.320` · 12 movimientos · Nafta `$32.500` · PS5 `Mar 2024 · $580.000` |

**Runtime truth.** There is no `supermercado`, no `$184.320`, no `12 movimientos`, no Finance surface anywhere in S16. The last state (`S16_step04`) shows `Basado en tu contexto / Calendario / Tareas / Pagos`.

**Product truth (verified).**

| Claim | Evidence | Verdict |
|---|---|---|
| `supermercado` is a Finance category | `supabase/migrations/20260813010000_finance_category_authority_v1_1.sql:228-246` → the canonical category list has `food` = `Alimentación` and `shopping` = `Compras`. **No `supermercado`.** | **DOES NOT EXIST** |
| `$184.320` / `12 movimientos` exist in code | Search for `184.320`, `184320`, `$184`, `12 movimientos` across the entire Integration repo → **0 matches**. | **DOES NOT EXIST** |
| `12 movimientos` is renderable by the real Finance UI | `front/mi-front-limpio/screens/finance/FinanceAnalysisDetailScreen.tsx:570-601` renders label + amount + percent. No count. `scripts/finance_6d_resumen_dashboard_tests.ts:576-581` explicitly forbids count rows in Resumen. | **DOES NOT EXIST** (in Resumen) |
| `12 movimientos` is renderable anywhere in Figma-app | `src/screens/finance/FinanceMovementFilterSheet.tsx:162-168` → `` `${count} movimiento${count === 1 ? '' : 's'}` `` | **EXISTS** (filter sheet only) |
| Figma-app has real Finance data | `src/finance/domain.ts:220-222` → `Supermercado` / `Alimentación` / `$61.800` | **EXISTS** |
| The presentation has its own Finance data | `src/presentation/app-screens/FinanceDemoScreen/financeData.ts:21-23` → `Alimentos $24.500 (44%)`, `Transporte $18.600 (33%)`; `:4-8` → balance `−$55.700`, scope `Agosto 2026 · Familia García` | **EXISTS** |

**Findings.**

| ID | Question | Verdict |
|---|---|---|
| **I-06** | I-F1: *¿La consulta de Finanzas ocurre en el momento narrativo correcto?* | **It does not occur at all.** 15 spoken lines (L399–413, 8.6 % of Scene I's words) have zero visual support. The master dedicates 4 beats (I16–I19) to this. | **BLOCKER** |
| **I-06** | I-F2: *¿La respuesta viene visiblemente de los datos de HomePlus?* | **NO.** There is no response. | **BLOCKER** |
| **I-06** | I-F3: *¿Es la respuesta lo suficientemente concisa?* | **N/A** — no response exists. The target is `Supermercado · este mes` / `$184.320` / `12 movimientos` (3 lines). | — |
| **I-06** | I-F4: *¿La superficie de Finanzas soporta en lugar de competir?* | **N/A** — no Finance surface exists. The target is: request + response in the foreground, real Finance components behind at low exposure. | — |
| **I-06** | I-F5: *¿La presentación actual muestra chips de contexto genéricos en lugar de prueba real?* | **YES.** `S16_step04` shows `Basado en tu contexto / Calendario / Tareas / Pagos`. These are generic module names, not data. They claim grounding without providing any. | **HIGH** (with I-13) |
| **I-15** | **Data conflict — three sources, three numbers.** The NO_UI canon says `$184.320 / 12 movimientos`. Figma-app's `domain.ts` says `Supermercado / Alimentación / $61.800`. The presentation's own `financeData.ts` says `Alimentos $24.500 / Transporte $18.600 / balance −$55.700 / Agosto 2026`. If Homi answers `$184.320`, the number will not be traceable to any Finance surface the audience has seen (S09) or will see. The whole point of beat I19 — *"detrás aparecen los componentes reales de Finance que sustentan la respuesta"* — is that the backing evidence must reconcile. It currently cannot. **This is a DECISION for the team, not something the audit can resolve.** | **BLOCKER** (as a decision) |
| — | **Actionable reconciliation.** The presentation's `Transporte $18.600` matches Figma-app's `Nafta / Transporte $18.600`, so the presentation derived its Finance data from Figma-app. But `Alimentos $24.500` does not match Figma-app's `Alimentación` (the Supermercado movement is `$61.800`), and the presentation has no `Supermercado` movement at all. The correct fix is: pick **one** dataset, make S09 and the Homi Finance beat agree, and use a real category name (`Alimentación` or `Compras`, not `Supermercado`). | (target for I-15) |
| — | **Where `12 movimientos` can legitimately appear.** Figma-app's `FinanceMovementFilterSheet.tsx:162-168` renders `` `${count} movimiento${count === 1 ? '' : 's'}` ``. This is the only place in the target where a movement count is renderable. The backing component for beat I19 should be the movement filter sheet, not the Resumen. | (target for I-06) |

---

## 11. Human-control audit

**Script (L423–440).**

> *"Y eso no significa reemplazar toda la aplicación por un chat. La interfaz sigue siendo mejor cuando queremos mirar, comparar o tener control visual. Geni aparece cuando: decir lo que necesitamos es más rápido que encontrar cómo hacerlo. Son dos formas de interactuar con el mismo sistema. Y si una intención implica cambiar algo importante, Geni puede interpretar y proponer, pero: la decisión final sigue siendo nuestra"*

**Frozen canon (master §13 I11–I13, NO_UI §15 I20–I26).**

| Beat | Requirement |
|---|---|
| I11 / I20–I21 | Homi phone exits up. Visual UI phone enters from below (preferably Finance/Analysis). Brief scales on chart/summary, list/comparison, controls/filters. |
| I12 / I22 | Visual UI exits up. Homi enters from below. `Son dos formas de interactuar con el mismo sistema`: no extra animation, let it breathe. |
| I13 / I25 | Important proposal: `Cambiar "Cumple de Juli"` / `Sábado · 19:00 → Domingo · 19:00` / `Cancelar · Confirmar` |
| I13 / I26 | Everything drops exposure except `Cancelar` / `Confirmar`. **NO confirmar.** Hold. |
| I13 / I27 | Fade total → negro. |
| Master §2.9 | *"cambio entre Homi y UI visual en Control Humano: dispositivo actual sale hacia arriba; siguiente entra desde abajo."* |

**Runtime truth (measured, `HomiDecisionDemoScreen/index.tsx:20-37`, `S17HumanControl/index.tsx:12-17`).**

| State | Element | Text / behaviour |
|---|---|---|
| `S17_step00` | `.homi-proposal` | `Puedo mover el entrenamiento de Tomi una hora más tarde y avisar a la familia.` |
| `S17_step01` | `.homi-decision-row` | `Confirmar` / `Ahora no` (54 px each, side by side) |
| `S17_step02` | `.s17-line` → `.s17-resolution` | `Homi interpreta y propone.` (op 1 → 0.4) / `La decisión es nuestra.` (84 px, op 0 → 1) |
| `S17_step03` | `.homi-done` | `Confirmado` / `Entrenamiento actualizado · Avisé a la familia` |

**Findings.**

| ID | Question | Verdict |
|---|---|---|
| **I-04** | I-H2: *¿Confirma accidentalmente la acción?* | **YES.** `S17_step03` shows `Confirmado / Entrenamiento actualizado · Avisé a la familia`. Master NO_UI §15 I26: *"NO confirmar."* The stage reads `La decisión es nuestra.` while the device reads `Confirmado`. The screen contradicts itself within one frame. This is the exact opposite of the frozen intent and the single most damaging thing in Scene I: the audience sees Homi execute a mutation with no ambiguity, immediately after the speaker says *"la decisión final sigue siendo nuestra."* | **BLOCKER** |
| **I-05** | I-H5: *¿La pantalla necesita volver de chat a UI visual para probar "no reemplazamos toda la aplicación por un chat"?* | **YES, and it does not happen.** `phoneCount = 1` in all 4 S17 states. There is no visual HomePlus surface at any point. The script's *"no significa reemplazar toda la aplicación por un chat"* and *"son dos formas de interactuar con el mismo sistema"* have zero visual support. Only one interaction form is ever shown. | **BLOCKER** |
| **I-05** | I-H4: *¿La interfaz sigue siendo visiblemente HomePlus?* | **YES.** The device reuses `HomeHeader`, `homeTokens`, the app accent. The problem is not the visual language; it is the absence of a second surface. | **POSITIVE** |
| **I-18** | I-H3: *¿El cambio propuesto es lo suficientemente consecuente para demostrar confianza?* | **NO.** `Puedo mover el entrenamiento de Tomi una hora más tarde y avisar a la familia.` The audience has no idea what the current value is. There is no before, no after, no date, no time. It is a sentence, not a diff. The master's example — `Sábado · 19:00 → Domingo · 19:00` — is a before/after the viewer can compare. Additionally, this mutation was **already consumed in S15** (the same Tomi-training +1 h action was proposed and confirmed there). S17 repeats the same proposal. The story now says the same change happened twice. | **HIGH** |
| **I-18** | **Target correction.** Figma-app's event time picker (`src/planner/Forms.tsx:1170`) offers `["08:00","10:00","12:30","13:30","18:00","20:30"]` — **19:00 does not exist**. And `edit-event` does not persist (`Forms.tsx:1045` does not obtain `mutateEvent`; only `pushToast`). So the master's `Sábado 19:00 → Domingo 19:00` example is **not reproducible** on the current Figma target. The correct target is `Sábado 18:00 → Domingo 20:30` (both in the picker), which is arguably *more* consequential: a birthday party moved 2.5 hours later and to a different day. | (target for I-18) |
| **I-20** | I-H6: *¿La secuencia actual sobre-explica?* | **YES.** Two stage headlines coexist: `Homi interpreta y propone.` (54 px) and `La decisión es nuestra.` (84 px). At `S17_step02` they cross-fade (line dims to 0.4, resolution fades to 1). The speaker says both lines (L437–440). Per master §2.3, *"No duplicar lo que dice el expositor."* The master's I13 specifies **no stage headline at all** — only the exposure move. | **MEDIUM** |
| **I-20** | I-H7: *¿Deberían Cancelar/Confirmar ser los únicos objetos en primer plano al final?* | **YES, and they are not.** At `S17_step02` the decision row is visible, but so is the proposal card, the assistant bar, the composer, and two stage headlines. Master I26: *"todo baja exposición excepto: Cancelar / Confirmar."* Runtime: the only exposure change in S17 is `.s17-line` (1 → 0.4). Zero exposure changes on the device or the proposal. | **HIGH** |
| — | I-H1: *¿Establece claramente propuesta vs decisión?* | **PARTIALLY.** The proposal card and the decision row are distinct elements. But the proposal is a sentence (not a structured diff), and the decision row appears *after* the proposal with no visual separation of "Homi proposes" from "you decide". | **MEDIUM** |

**Positives.** The `Confirmar` / `Ahora no` row is the correct spatial relationship for a binary choice (side by side, equal height, 54 px each). The proposal card is visually distinct from the user bubble (bordered card vs. filled bubble). The device is real HomePlus UI.

---

## 12. Homi issue register

| ID | SCENE / STATE | SCRIPT MOMENT | MASTER INTENT | CURRENT RUNTIME EVIDENCE | FIGMA TARGET | PRODUCT / INTEGRATION EVIDENCE | HUMAN WALKTHROUGH | CLASSIFICATION | SEVERITY | VERDICT | TARGET BEHAVIOR | RATIONALE |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| **I-01** | S15 t1–t4 | L355–361 | Request `Haceme acordar de comprar una Coca mañana`; proposal `Crear tarea / Comprar una Coca / Mañana / Cancelar / Confirmar` | `Agendá que mañana Tomi tiene entrenamiento una hora más tarde.` → `Voy a actualizar el entrenamiento de Tomi para mañana y avisar a la familia.` → `Confirmar` → `Confirmado` | `GeniOverlay` has a text input; `HomiPreview` has `Cancelar`/`Confirmar` but no date field and no result state | `planner_tasks` exists; `POST /api/planner/tasks` exists; only `title` required, `due_date` optional | *"sin ningún tipo de animación, donde escribimos algo, aparece un mensaje"* | NARRATIVE + PRODUCT | **BLOCKER** | CONFIRMED — wrong demo, wrong proposal, no cancel path | Replace the entire S15 demo with the frozen canon: request `Haceme acordar de comprar una Coca mañana` → proposal `Crear tarea / Comprar una Coca / Mañana / Cancelar / Confirmar` → confirm → task lands in Planner | The frozen canon row (master §3) is violated. The demo teaches autonomous third-party mutation. The product fully supports the correct demo. |
| **I-02** | S15 t3–t4 | L360–361 | Confirm → Planner phone enters from lateral → card travels → lands → hold → exits | `S15_step04` = chat success bubble `Confirmado`. `phoneCount = 1` in all states. Device box unchanged. | `planner-tasks` route exists; `addTask` persists to `TasksScreen` | `planner_tasks` table + `POST /api/planner/tasks` exist | *"un montón de 'confirmar', 'confirmado', 'actualizado'"* | NARRATIVE + MOTION | **BLOCKER** | CONFIRMED — no execution proof | After `Confirmar`, run one automatic shared-element sequence: second device with Planner/Tareas enters from a lateral, the same card detaches and travels, lands in the task list, holds, exits. Editorial transition, not fake navigation. | The core principle of Scene I is unproven. Master §15 lists "parecer chatbot aislado" as the #1 risk; it is realised. |
| **I-03** | S16 t1–t4 | L375 | `¿Qué me queda para mañana?` | `¿Qué tengo que hacer hoy?` (`HomiContextDemoScreen/index.tsx:17`) | No per-member Homi answer exists | Home summary is household-wide top-3, no "tomorrow" concept, no per-member filter | *"después aparece '¿qué tengo que hacer hoy?'"* | NARRATIVE | **BLOCKER** | CONFIRMED — contradicts script and thesis | Change the question to `¿Qué me queda para mañana?` | The screen contradicts the speech and destroys the block's thesis. If the question is always "hoy", "el mañana de cada uno" has no referent. |
| **I-04** | S17 t3 | L440 | `la decisión final sigue siendo nuestra` → do NOT confirm | `S17_step03` = `Confirmado / Entrenamiento actualizado · Avisé a la familia` while stage reads `La decisión es nuestra.` | No result state in `HomiPreview` | Event date/time change exists but has no confirmation step in the product | *"al próximo tap se confirma"* | AI-SEMANTICS + UX | **BLOCKER** | CONFIRMED — confirms the mutation | Delete `S17_step03`. End on the decision row with everything else at low exposure. Hold. Fade to black. | Master NO_UI I26: "NO confirmar." The screen contradicts itself within one frame. |
| **I-05** | S17 t0–t3 | L425–435 | Homi phone exits up; visual UI phone enters from below; then reverse | `phoneCount = 1` in all 4 S17 states. No second surface. | No visual UI surface in S17 | — | *"después aparece otra diapositiva"* | NARRATIVE + UX | **BLOCKER** | CONFIRMED — no visual UI proof | Insert the device swap: Homi exits up, a visual HomePlus phone (Finance/Analysis or Planner) enters from below, brief scales on chart/list/controls, then exits up, Homi returns from below. | "No reemplazamos toda la aplicación por un chat" and "dos formas de interactuar" have zero support. Only one form is shown. |
| **I-06** | S16 t4 | L399–413 | Finance question → answer `$184.320 / 12 movimientos` → real Finance components behind | `Basado en tu contexto / Calendario / Tareas / Pagos`. No `supermercado`, no `$184.320`, no Finance surface. | `FinanceAnalisis.tsx:362` renders category breakdown; `FinanceMovementFilterSheet.tsx:162-168` renders count | `supermercado` is not a category; `$184.320` / `12 movimientos` do not exist in code; `12 movimientos` not renderable in Resumen | *"y papá, con el último tap aparece 'basado en tu contexto'"* | NARRATIVE + PRODUCT | **BLOCKER** | CONFIRMED — Finance beat absent | Add 3 states: Finance question sent → brief answer (`Supermercado · este mes` / `$184.320` / `12 movimientos`) → real Finance components behind at low exposure (movement filter sheet, not Resumen). | 15 spoken lines (8.6 % of Scene I) have zero visual support. The master dedicates 4 beats to this. |
| **I-07** | S16 t0 | L369–371 | Homi low exposure → restore; question sent | `S16_step00` = empty Homi state (`¿En qué te ayudo?` + `Pedile algo a Homi…`) | — | — | *"aparece la misma pregunta, distinto contexto, acompañado de un teléfono en el mismo estado en el que estaba antes"* | NARRATIVE + UX | MEDIUM | CONFIRMED — empty state re-shown | Delete `S16_step00`. Start S16 with the question already sent (or send it on the first trigger). | The thread is not continuous. A state is wasted on an empty greeting after a 5-state conversation. |
| **I-09** | S16 t0–t4 | L385–393 | No titular `misma pregunta, distintas respuestas` | `La misma pregunta.` / `Distinto contexto.` at 56 px, all 5 states, full opacity | — | — | — | VISUAL + AI-SEMANTICS | HIGH | CONFIRMED — forbidden titular | Remove the stage headline. Replace with the three-device reveal (I-10). | Master §13 I7 forbids this exact titular. It states the conclusion, taking the discovery from the audience. |
| **I-10** | S16 t1–t4 | L385–393 | Three devices: Papá central, Juli left, Tomi right. Same question, three answers. | `phoneCount = 1` in all 5 states. Device box unchanged. | — | — | — | NARRATIVE + MOTION | HIGH | CONFIRMED — no multi-device | At the thesis beat, two devices emerge from behind the centre device. Extract the question as a shared element above the row. | The block's thesis is never visually proven. Three devices is the max and is justified here. |
| **I-11** | S16 t2 | L97 (callback) | Tomi: training `18:00–19:00 → 18:00–20:00`; mamá ya no llega | `Hoy tenés entrenamiento a las 17 h. Mamá te pasa a buscar a la salida.` | — | No seed data for Tomi's training; canon is `18:00–20:00` | *"y Tomi cambia por Juli… 'mamá te paso a buscar a la salida'"* | NARRATIVE + PRODUCT | HIGH | CONFIRMED — contradicts script and canon | Correct to: `Hoy tenés entrenamiento de 18:00 a 20:00. Entregá el trabajo de Historia.` | Contradicts the script's established fact ("mamá ya no llega") and introduces a third time value (17 h). |
| **I-12** | S16 t3 | L200, L123, L165–170 | Papá: household responsibilities | `Hoy: Internet ya está pago, revisá la lista de compras y confirmá al técnico.` | — | Shopping list: 0 tables, 0 routes, 0 screens. `supermercado` not a category. | *"papá: 'hoy internet ya está pago, revisar la lista de compras y confirmar al técnico'"* | PRODUCT + NARRATIVE | HIGH | CONFIRMED — invents nonexistent feature | Rewrite Papá's answer using only real capabilities. Remove `lista de compras`. Do not assert `Internet ya está pago` as fact (it is an open question in Scene D). | Asserts a feature that does not exist in the product. Converts open questions into facts. |
| **I-13** | S16 t4 | L399–403 | Finance question | `Basado en tu contexto / Calendario / Tareas / Pagos` | — | — | *"¿Por qué aparece así? Si no pasa así en el guion"* | NARRATIVE + PRODUCT | HIGH | CONFIRMED — not in script, not proof | Remove. Replace with the Finance question and answer (I-06). | Generic module names claim grounding without providing any. Not in the script. |
| **I-15** | S16 t4 (target) | L403 | `$184.320 / 12 movimientos` | N/A (beat absent) | `Supermercado / Alimentación / $61.800` | `$184.320` / `12 movimientos`: 0 matches in code | — | PRODUCT | **BLOCKER** (decision) | CONFIRMED — three-way data conflict | DECISION REQUIRED: pick one Finance dataset. Make S09 and the Homi Finance beat agree. Use a real category name. | The backing evidence for I19 must reconcile with what the audience has seen. It currently cannot. |
| **I-18** | S17 t0 | L437–438 | `Cambiar "Cumple de Juli"` / `Sábado · 19:00 → Domingo · 19:00` | `Puedo mover el entrenamiento de Tomi una hora más tarde y avisar a la familia.` | Time picker: `["08:00","10:00","12:30","13:30","18:00","20:30"]` — no 19:00. `edit-event` does not persist. | Event date/time change exists; no confirmation step | — | UX + NARRATIVE | HIGH | CONFIRMED — not consequential, not comparable, repeats S15 | Replace with `Cambiar "Cumple de Juli"` / `Sábado · 18:00 → Domingo · 20:30` / `Cancelar · Confirmar` | No before/after. Repeats S15's already-consumed mutation. The master's 19:00 is not in the Figma picker. |
| **I-19** | S15 t3, S17 t1 | L358, L440 | `Cancelar` / `Confirmar` | S15: only `Confirmar`. S17: `Confirmar` / `Ahora no`. | `HomiPreview` has `Cancelar` / `Confirmar` | — | — | UX | MEDIUM | CONFIRMED — no cancel in S15; weak label in S17 | S15: add `Cancelar`. S17: rename `Ahora no` → `Cancelar`. | The script says "decidimos si confirmarla o no". Master §13 I3 requires `Cancelar`. `Ahora no` is a weak label. |
| **I-20** | S17 t1–t2 | L437–440 | No stage headline; exposure move only | `Homi interpreta y propone.` (54 px) + `La decisión es nuestra.` (84 px) cross-fade | — | — | *"y después otro concepto debajo… con que 'la decisión es nuestra'"* | VISUAL + AI-SEMANTICS | MEDIUM | CONFIRMED — two competing headlines | Remove both stage headlines. Use the exposure move (I-20) instead. | Duplicates the speech. Master I13 specifies no headline. |
| **I-21** | S15–S17 (all) | — | Device moves: lateral entry, exit up, enter from below | Device box `718,25,324,670` unchanged in all 14 states. `phoneCount = 1` in all 14 states. | — | — | — | MOTION | HIGH | CONFIRMED — device is static | Implement the frozen device directions: lateral Planner entry, exit up, enter from below. | 14 states, 3 scenes, ~3.4 minutes of speech, and the device never moves, never resizes, never changes surface. |
| **I-22** | S15 t2, S16 t1–t3, S17 t0 | — | Proposal and answer are different semantic roles | `.homi-proposal` is the same CSS class for all three | — | — | — | VISUAL + UX | MEDIUM | CONFIRMED — semantic collision | Use distinct classes: `.homi-proposal` for proposals, `.homi-answer` for answers. | The audience cannot distinguish a proposal from an answer from a decision. |
| **I-23** | S16 t1→t2, t2→t3 | — | Identity and payload change together | `homi-swap-in` (420 ms, opacity + 14 px) on both `.homi-persona-swap` and `.homi-answer-swap` — identical curve, identical duration | — | — | — | MOTION | LOW | CONFIRMED — undifferentiated | Differentiate: identity chip fades (200 ms), answer card rises (320 ms) with a 60 ms delay. | Motion-design: "everything animates → nothing stands out." The payload gets no more emphasis than the label. |
| **I-24** | S15→S16, S16→S17, S17→S18 | — | Chapter resets | 0 transition animations at all three boundaries. `s18-veil-in` 220 ms only. | — | — | — | MOTION | MEDIUM | CONFIRMED — hard cuts | Add cross-dissolve or blackout at each boundary. | Three of four Scene I boundaries are hard cuts, including the transition into the closing. |
| **I-25** | S16 t3 | — | Papá has a distinct identity | Avatar `#4A4542` (neutral grey) | — | — | — | VISUAL | LOW | CONFIRMED — Papá reads as disabled | Give Papá a distinct colour (e.g. `#6B4F3A` warm brown). | Juli is gold, Tomi is blue, Papá is grey. Grey reads as "no colour" / disabled. |
| **I-26** | S15–S17 (all) | — | Homi works over HomePlus | Homi is a presentation-only construct. No Homi surface exists in Integration or Figma-app. | `GeniOverlay` + `HomiPreview` exist but share no code | 0 routes, 0 tables, 0 AI providers. Product freeze: *"Geni no está implementado en este freeze."* | — | PRODUCT | HIGH | CONFIRMED — Homi is not a product feature | The presentation is a pitch for a future product. This is not a defect in itself, but it means: (a) the presentation must not claim capabilities the product freeze explicitly forbids; (b) the specific sub-claims must not contradict product truth. | The presentation is pitching Homi as a concept. The audit's job is to ensure the pitch is internally consistent and does not assert things the product cannot support. |
| **I-27** | S17 (target) | L437–438 | `Sábado · 19:00 → Domingo · 19:00` | N/A | Time picker has no 19:00. `edit-event` does not persist. | Event change exists; no confirmation step | — | PRODUCT | MEDIUM | CONFIRMED — master example not reproducible | Use `Sábado · 18:00 → Domingo · 20:30` (both in the picker). | The master's example cannot be rendered on the current Figma target. |
| **I-28** | S16 t4 (target) | L403 | `12 movimientos` | N/A | `FinanceMovementFilterSheet.tsx:162-168` renders count | `12 movimientos` not renderable in Resumen; test forbids it | — | PRODUCT | MEDIUM | CONFIRMED — count not renderable in Resumen | Use the movement filter sheet as the backing component, not the Resumen. | The only place in the target where a movement count is renderable is the filter sheet. |

---

## 13. Homi positives

| # | What survives | Classification | Rationale |
|---|---|---|---|
| 1 | The Homi assistant chrome (`HomeHeader` + `homeTokens` + app accent `#C96B45` + `homi-mark.svg`) | **KEEP AS-IS** | It is real HomePlus UI. It looks like the product, not like a chatbot. This is the single strongest asset in Scene I. |
| 2 | The device scale of 1.08 with stable internal geometry (282×602) | **KEEP AS-IS** | Session 1 confirmed this in all 66 device states. It is the correct enlargement lever. Do not replace it with internal layout mutation. |
| 3 | The bubble entrance motion (fade + 10 px rise, 320/420 ms) | **KEEP AS-IS** | Compliant with the motion system. Correct duration, correct easing, correct primitive. |
| 4 | The question bubble stays byte-identical across the three personas (measured box `777,187,238,81`) | **KEEP AS-IS** | This is the correct implementation of "same question, different answers." A genuine positive. |
| 5 | Juli's answer content (`Educación Física`, `autorización`, `tarea de Matemática`) | **KEEP AS-IS** | Canon-consistent (NO_UI §18). |
| 6 | The `Confirmar` button's visual dominance (solid brand orange, 54 px, full width) | **KEEP AS-IS** | The primary action is unmistakable. |
| 7 | The `Confirmar` / `Ahora no` side-by-side decision row in S17 | **KEEP CONCEPT / RECOMPOSE EXECUTION** | The spatial relationship is correct. The labels need to change to `Cancelar` / `Confirmar`, and the row must become the only foreground object. |
| 8 | The persona swap motion (420 ms fade + 14 px slide) | **KEEP CONCEPT / RECOMPOSE EXECUTION** | Correct duration and primitive. Differentiate identity from payload (I-23). |
| 9 | The proposal uses future tense (`Voy a actualizar…`) | **KEEP AS-IS** | No autonomous action is implied before confirmation. |
| 10 | The `homi-mark.svg` (orange rounded square, white 4-point sparkle) | **KEEP AS-IS** | A static icon, not an animation. Does not violate master §13 I0's prohibition on "esfera, aura, partículas ni glow de IA". Restrained. |
| 11 | The thread's stable layout (no reflow when elements appear) | **KEEP AS-IS** | The proposal card has a fixed box (`745,345,270,147`). No layout shift. |
| 12 | The `PhoneFrame` component with a `scale` prop and the `s15-phone-motion` wrapper | **KEEP AS-IS** | These are the building blocks for the required device transitions (lateral entry, exit up, enter from below). |

---

## 14. Homi target choreography

**Pacing target.** Scene I = 123.6 s of speech. Target 18 manual triggers → 6.9 s per trigger. Current 14 states → 8.8 s per state. Net +4 states, but 12 of the 14 current states have wrong content.

| BEAT | SPEAKER | CURRENT | TARGET | ACTION |
|---|---|---|---|---|
| **I-00** | Benja | `S15_step00`: `Homi` at 110 px + phone together | Black → `Homi` name alone, clean reveal, no orb/glow. Hold. | **RECOMPOSE** — separate the name from the phone |
| **I-01** | Benja | (same state) | Phone Homi enters from below (420 ms, 16 px rise) | **RECOMPOSE** — phone enters after the name |
| **I-02** | Benja | `S15_step01`: wrong request | Transcription appears synchronised: `Haceme acordar de comprar una Coca mañana`. Then sends. | **REPLACE** — correct request text |
| **I-03** | Benja | `S15_step02`: wrong proposal | Structured proposal: `Crear tarea` / `Comprar una Coca` / `Mañana` / `Cancelar` / `Confirmar`. Micro scale on mention. | **REPLACE** — structured proposal with cancel path |
| **I-04** | Benja | `S15_step03`: `Confirmar` only | Tap `Confirmar`. Then AUTO BEAT: | **RECOMPOSE** — add cancel, then auto sequence |
| **I-04a** | (auto) | — | Planner phone enters from a lateral (500 ms, `motion-spatial-wipe`) | **ADD** — second device |
| **I-04b** | (auto) | — | The same card detaches from Homi and travels as a shared element | **ADD** — shared element |
| **I-04c** | (auto) | — | Lands exactly in its place in the Planner task list | **ADD** — landing |
| **I-04d** | (auto) | — | Hold (400–900 ms) | **ADD** — hold |
| **I-04e** | (auto) | — | Planner phone exits by the lateral. Homi remains. | **ADD** — exit |
| **I-05** | Benja | `S15_step04`: chat success bubble | Homi drops exposure. The underlying HomePlus surface becomes visible. | **REPLACE** — exposure move, not a chat toast |
| **I-06** | Gaby | `S16_step00`: empty Homi state | Delete. Start with the question already sent. | **REMOVE** — wasted state |
| **I-07** | Gaby | `S16_step01`: wrong question | `¿Qué me queda for mañana?` sent. Juli chip + answer. | **REPLACE** — correct question, Juli |
| **I-08** | Gaby | `S16_step02`: Tomi | Tomi chip + answer (corrected: `18:00–20:00`, no mamá pickup) | **REPLACE** — corrected Tomi data |
| **I-09** | Gaby | `S16_step03`: Papá | Papá chip + answer (corrected: no shopping list, no asserted facts) | **REPLACE** — corrected Papá data |
| **I-10** | Gaby | (absent) | Three devices emerge: Papá central, Juli left, Tomi right. Question extracted as shared element above. | **ADD** — multi-device reveal |
| **I-11** | Gaby | `S16_step04`: context chips | Flanking devices exit. Papá remains. Finance question sent. | **REPLACE** — Finance question |
| **I-12** | Gaby | (absent) | Brief answer: `Supermercado · este mes` / `$184.320` / `12 movimientos` | **ADD** — Finance answer |
| **I-13** | Gaby | (absent) | Real Finance components behind at low exposure (movement filter sheet) | **ADD** — backing evidence |
| **I-14** | Benja | `S17_step00`: wrong proposal | Homi phone exits up. Visual HomePlus phone (Finance/Analysis) enters from below. Brief scales on chart/list/controls. | **REPLACE** — device swap to visual UI |
| **I-15** | Benja | `S17_step01`: decision row | Visual UI exits up. Homi enters from below. `Son dos formas de interactuar con el mismo sistema`: no extra animation. | **RECOMPOSE** — device swap back |
| **I-16** | Benja | `S17_step02`: two stage headlines | Homi generates a structured proposal: `Cambiar "Cumple de Juli"` / `Sábado · 18:00 → Domingo · 20:30` / `Cancelar · Confirmar`. No stage headline. | **REPLACE** — consequential proposal, no headline |
| **I-17** | Benja | `S17_step03`: `Confirmado` | Everything drops exposure except `Cancelar` / `Confirmar`. **Do not confirm.** Hold. | **REPLACE** — exposure move, no confirmation |
| **I-18** | (auto) | `S18_step00`: hard cut | Fade total → black. Chapter reset. | **RECOMPOSE** — fade to black |

**Manual vs auto beats.**

| Beat | Type | Rationale |
|---|---|---|
| I-00 name alone | MANUAL | Spoken idea changes: "Y ahí aparece Homi" |
| I-01 phone enters | AUTO | Indivisible physical action following the name |
| I-02 transcription + send | AUTO | One indivisible action: the request is typed and sent |
| I-03 proposal | MANUAL | Spoken idea changes: "nos muestra una propuesta" |
| I-04 confirm → I-04a–e | MANUAL trigger + AUTO sequence | The tap is the user's decision; the travel/land/hold/exit is one indivisible physical action |
| I-05 exposure | AUTO | Indivisible: Homi drops, HomePlus surface appears |
| I-07 question sent | MANUAL | Spoken idea changes: "podemos preguntarle" |
| I-08 Juli | MANUAL | Speaker needs timing control over the first persona |
| I-09 Tomi | MANUAL | Speaker needs timing control |
| I-10 Papá | MANUAL | Speaker needs timing control |
| I-10a three devices | AUTO | Indivisible physical action |
| I-11 Finance question | MANUAL | Spoken idea changes: "podemos preguntar" |
| I-12 Finance answer | AUTO | Indivisible: the answer appears |
| I-13 backing evidence | AUTO | Indivisible: components appear behind |
| I-14 device swap to visual UI | MANUAL | Spoken idea changes: "la interfaz sigue siendo mejor" |
| I-15 device swap back | MANUAL | Spoken idea changes: "Geni aparece cuando…" |
| I-16 proposal | MANUAL | Spoken idea changes: "Geni puede interpretar y proposer" |
| I-17 exposure only | AUTO | Indivisible: everything drops except the decision |
| I-18 fade to black | AUTO | Indivisible: chapter reset |

**Total: 18 manual triggers, 10 auto beats.**

---

## 15. Spoken-beat map — J

Speakers: **Gaby** (block 12, L444–458), **Colo** (block 13, L460–497).

| BEAT | SCRIPT (line) | INTENDED IDEA | EXPECTED VISUAL SUPPORT | CURRENT STATE(S) | HAS STATE? |
|---|---|---|---|---|---|
| **J-B1** | L446–458 (Gaby) *"Y al final, hasta Geni responde a la misma idea con la que armamos HomePlus. No queremos que una familia tenga más tecnología que administrar. Queremos que tenga menos cosas que reconstruir, buscar y mantener abiertas en la cabeza. El objetivo nunca fue pasar más tiempo dentro de HomePlus. Es exactamente al revés."* | **The philosophical closing.** Even Homi follows the HomePlus philosophy. The objective was never more time inside the app. | **Absolute black.** No text. No logo. No animation. The whole of Gaby's closing happens in silence. | `S18_step00` — black `#060404`. `S18_step01` — **HomePlus brand** | ✘ (J-02) |
| **J-B2** | L462–465 (Colo) *"porque al final la mochila sigue siendo una mochila, la factura sigue venciendo, y la heladera se puede romper"* | **The house did not change.** Life's objects are still life's objects. | Three physical objects enter: mochila (left-upper), factura (right-middle), heladera (centre-lower). Much air. No chaos. | **absent** | ✘ (J-03) |
| **J-B3** | L467–468 *"La casa no cambio y tampoco tiene porque hacerlo"* | The house is constant | A simple house outline draws around the objects. The objects shrink slightly. | **absent** | ✘ (J-05) |
| **J-B4** | L468 *"y tampoco tiene porque hacerlo"* | The family is constant | Juli · Tomi · Mamá · Papá appear inside the house | **absent** | ✘ (J-05) |
| **J-B5** | L470–474 *"lo que puede cambiar es todo el trabajo invisible que hacemos alrededor: volver a preguntar, buscar ese mensaje, tratar de recordar quien hacia que y reconstruir algo que ya se sabe"* | **The invisible work.** What HomePlus reduces is the reconstruction, not the objects. | Ghosts at 25–35 % outside the house: `¿Quién me busca hoy?`, the old WhatsApp, `Ma ❤️: Esta semana lo busco yo a Tomi.` | **absent** | ✘ (J-06) |
| **J-B6** | L474 *"y reconstruir algo que ya se sabe"* | The reconstruction is what disappears | A few dashed lines try to connect the ghosts. Then the ghosts fade. The house + family + objects remain. | **absent** | ✘ (J-06) |
| **J-B7** | L476–477 *"Homeplus no pretende enseñarle a una familia como ser familia. Busca acompañarla y darle un lugar comun a ese contexto cuándo alguien lo necesita."* | **The product philosophy.** HomePlus accompanies; it does not teach. | **QUIETUD TOTAL.** Nothing moves. Then a thin orange line appears below the four family members. No logo. No phone. | **absent** | ✘ (J-07) |
| **J-B8** | L479–488 *"Para nosotros, ese es el objetivo final del proyecto, que organizar gastos, tareas, horarios, informacion y responsabilidades sea mas simple sin convertir la organizacion en el centro de la vida familiar."* | **The five organization categories.** Small, clean symbols around the family. | Five manual triggers, one per word: `gastos` → movement/amount; `tareas` → check; `horarios` → time block; `información` → document; `responsabilidades` → assignment/person. Small, around the family, never giant words. | **absent** | ✘ (J-08) |
| **J-B9** | L487 *"sea mas simple"* | The organization becomes simpler | The five elements order themselves | **absent** | ✘ (J-08) |
| **J-B10** | L488 *"sin convertir la organizacion en el centro de la vida familiar"* | The family stays central | The elements move to the periphery. The family remains in the centre. | **absent** | ✘ (J-08) |
| **J-B11** | L490 marker + L491–492 *"Porque si homeplus funciona como queremos, la tecnología deja de sentirse protagonista."* | **Technology recedes.** The device disappears; life does not. | The peripheral elements form phone geometry. Then AUTO BEAT: phone 100→82 %, opacity 100→0. Organization disappears. Orange line disappears. **Casa/familia do not move.** | **absent** | ✘ (J-09) |
| **J-B12** | L494–495 *"Y podemos pasar menos tiempo organizando como vivir juntos y un poco mas de tiempo simplemente viviendo"* | **The final emotional beat.** Less time organizing, more time living. | Quietud. Then: clean white flash 80–120 ms. A thin photo frame appears around the family. The family becomes a "moment." Hold ~800 ms. | **absent** | ✘ (J-10) |
| **J-B13** | L497 *"muchas gracias."* | The end | Fade to black. End card: HomePlus logo/wordmark blanco + team below. Then `Muchas gracias.` appears in 250–300 ms. Hold infinite. | `S18_step01` brand → `S18_step02` team → `S18_step03` `Muchas gracias.` | ✔ (J-12) |

**Beat arithmetic:** 13 beats against 4 states. Ratio 0.31. **9 spoken beats have no visual state at all** (J-B2–J-B11). The 4 states that exist are the end card.

**Pacing measurement:**

| Block | Speaker | Spoken lines | Words | Est. @150 ppm | Current states | Seconds per state |
|---|---|---|---|---|---|---|
| 12 — Cierre parte 1 | Gaby | 7 | 53 | 21.2 s | 2 (`S18` t0–t1) | 10.6 s |
| 13 — Cierre parte 2 | Colo | 28 | 154 | 61.6 s | 2 (`S18` t2–t3) | 30.8 s |
| **Scene J total** | | **35** | **207** | **82.8 s** | **4** | **20.7 s** |

**Adjudication of the brief's pacing premise (§46).** The brief states *"S18 closing: large amount of narration over only 4 current steps, with the final Colo block especially dense."* **This is confirmed by measurement.** 35 lines / 4 states = 20.7 s per state. Block 13 alone is 61.6 s over 2 states = 30.8 s per state. The closing is **severely under-stated**.

---

## 16. Gaby closing audit

**Script (L444–458).**

> *"Y al final, hasta Geni responde a la misma idea con la que armamos HomePlus. No queremos que una familia tenga más tecnología que administrar. Queremos que tenga menos cosas que reconstruir, buscar y mantener abiertas en la cabeza. El objetivo nunca fue pasar más tiempo dentro de HomePlus. Es exactamente al revés."*

**Frozen requirement (master §14 J0, NO_UI §16 J00).**

> J0 — Gaby completamente en negro. Después de Control Humano: negro absoluto. **Todo el cierre de Gaby sucede en negro.** No texto. No logo. No animación.
> J00 — GABY BLACK. Negro absoluto durante TODO el cierre de Gaby. Nada más.

**Runtime truth.**

| State | Content |
|---|---|
| `S18_step00` | Black `#060404`. Nothing. |
| `S18_step01` | HomePlus logo (120 px) + wordmark `HomePlus` (64 px) |
| `S18_step02` | + 4 team members (64 px avatars, 22 px names) |
| `S18_step03` | + `Muchas gracias.` (76 px) |

**Findings.**

| ID | Question | Verdict |
|---|---|---|
| **J-02** | J-G1: *¿S18 respeta actualmente este silencio?* | **PARTIALLY.** `S18_step00` is black and correct. But it is **one state**. Gaby's closing is 7 lines / 53 words / ~21.2 s. One tap must cover 21 seconds of black. That is possible if the presenter holds it, but the next state (`S18_step01`) is the HomePlus brand, which per the baseline block mapping falls inside Gaby's block. Master J00: *"Negro absoluto durante TODO el cierre de Gaby. Nada más."* The brand must not appear until Colo's block. | **HIGH** |
| **J-02** | J-G2: *¿Aparece algún logo/texto demasiado temprano?* | **YES.** The HomePlus brand appears at `S18_step01`, which is inside Gaby's block. The master's end card (J22) comes after J21 ("simplemente viviendo"), which is Colo's last line. The brand is ~30 seconds too early. | **HIGH** |
| **J-02** | J-G3: *¿Debería permanecer algo de Homi visible?* | **NO.** Master J00: *"No texto. No logo. No animación."* The silence must be total. The audience should understand that even Homi follows the same philosophy: the objective was never more time inside HomePlus. | (target) |
| **J-02** | J-G4: *¿El silencio le da autoridad al expositor?* | **YES, when it is held.** A 21-second black hold after "Control Humano" is one of the strongest things the presentation can do. It gives Gaby complete authority. The risk is operational: the presenter must know to hold, and the audience must not think the presentation has frozen. | **POSITIVE** (potential) |
| — | **Black colour.** `.s18-closing { background: #060404 }`. The global stage background is `#0B0908`. The token `tokens.colors.blackout = '#000000'` exists but is unused. Master J00 says *"negro absoluto"*. `#060404` is 6/255 ≈ 2.4 % — functionally black on a projector, not literally. This is consistent with the rest of the deck (S07 uses `#060404` too, per N-05). | **LOW** |

**Positives.** `S18_step00` is a correct black state. The `s18-veil-in` animation (220 ms) is the right primitive for a chapter reset. The black is held indefinitely (Session 1 confirmed: nothing moves during a 10 s hold).

---

## 17. Colo closing audit

**Script (L460–497).**

> *"porque al final la mochila sigue siendo una mochila, la factura sigue venciendo, y la heladera se puede romper. La casa no cambio y tampoco tiene porque hacerlo, lo que puede cambiar es todo el trabajo invisible que hacemos alrededor: volver a preguntar, buscar ese mensaje, tratar de recordar quien hacia que y reconstruir algo que ya se sabe. Homeplus no pretende enseñarle a una familia como ser familia. Busca acompañarla y darle un lugar comun a ese contexto cuándo alguien lo necesita. Para nosotros, ese es el objetivo final del proyecto, que organizar gastos, tareas, horarios, informacion y responsabilidades sea mas simple sin convertir la organizacion en el centro de la vida familiar. Porque si homeplus funciona como queremos, la tecnología deja de sentirse protagonista. Y podemos pasar menos tiempo organizando como vivir juntos y un poco mas de tiempo simplemente viviendo. muchas gracias."*

**Frozen requirement (master §14 J1–J9, NO_UI §16 J01–J23).**

| Beat | Requirement |
|---|---|
| J1 / J01–J03 | Three physical objects: mochila (left-upper), factura (right-middle), heladera (centre-lower). Much air. No chaos. |
| J2 / J04–J05 | House outline draws around. Objects shrink. Family appears inside. |
| J3 / J06–J08 | Ghosts at 25–35 %: `¿Quién me busca hoy?`, old WhatsApp, `Ma ❤️: Esta semana lo busco yo a Tomi.` |
| J3 / J09 | AUTO BEAT: dashed lines try to connect. Micro hold. Ghosts disappear. |
| J4 / J10 | `HomePlus no pretende enseñarle…` → QUIETUD TOTAL. |
| J4 / J11 | `Busca acompañarla…` → thin orange line below the family. No logo. No phone. |
| J5 / J12–J16 | Five manual triggers: `gastos`, `tareas`, `horarios`, `información`, `responsabilidades`. Small clean symbols around the family. |
| J5 / J17–J18 | `sea más simple` → order. `sin convertir la organización en el centro` → periphery. Family remains centre. |
| J6 / J19 | Peripheral elements form phone geometry. |
| J7 / J20 | AUTO BEAT: phone 100→82 %, opacity 100→0. Organization disappears. Orange line disappears. Casa/familia do not move. |
| J8 / J21 | `simplemente viviendo`: white flash 80–120 ms. Thin photo frame. Family becomes a "moment." Hold ~800 ms. |
| J9 / J22–J23 | Fade black. End card. `Muchas gracias.` |

**Runtime truth.** `S18_step01` = brand. `S18_step02` = team. `S18_step03` = `Muchas gracias.` Nothing else.

**Findings.**

| ID | Finding | Severity |
|---|---|---|
| **J-01** | The entire Colo closing argument is absent. 28 spoken lines / 154 words / 61.6 s resolve to 2 states (team + thanks). The physical objects, the house, the family, the invisible work, the philosophy, the organization categories, the technology recession and the living moment are all absent. | **BLOCKER** |
| **J-03** | No physical objects exist. The package has `insurance-document.svg` (factura) and `grocery-bag.svg` (bolsa). It has **no** mochila, **no** heladera. | **HIGH** |
| **J-05** | No house, no family. The package has `family-avatars.svg` (4 avatars) but no house outline. The opening's "casa blanca" (master §A8) was also never implemented. | **HIGH** |
| **J-06** | No invisible-work fragments. The master's J3 is the conceptual core of the closing: what HomePlus reduces is the *reconstruction*, not the objects. Without it, the closing has no argument. | **HIGH** |
| **J-07** | No "HomePlus no pretende enseñar…" with total stillness. This is the philosophical claim of the entire product. It deserves a held frame. | **HIGH** |
| **J-08** | No organization categories. The master explicitly requires 5 manual triggers, one per word. This is the only place in the closing where the presenter has granular timing control. | **HIGH** |
| **J-09** | Technology never recedes. The master's J7 is the visual thesis of the whole film: the device disappears, life does not. Without it, the closing has no visual climax. | **HIGH** |
| **J-10** | No "simplemente viviendo" beat. The final emotional landing is absent. | **HIGH** |

---

## 18. Physical-object return audit

**Script (L462–465).**

> *"porque al final la mochila sigue siendo una mochila, la factura sigue venciendo, y la heladera se puede romper"*

**Master §14 J1.**

> Colo entra. `la mochila sigue siendo una mochila`: mochila entra en tercio izquierdo alto. `la factura sigue venciendo`: factura entra en tercio derecho. `la heladera se puede romper`: heladera entra en centro inferior. Mucho aire. No acumulación caótica.

**NO_UI §16 J01–J03.**

> J01 — BACKPACK. Mochila realista/gráfica. Grande. No emoji. Left-upper third.
> J02 — BILL. Factura. Right-middle.
> J03 — FRIDGE. Heladera. Center-lower. Mucho aire. No caos.

**NO_UI §17 (asset style).**

> Physical objects: vector/document mock visual; legibles como categoría; off-white paper; pequeño shadow; rotación 1–3 grados máximo. Backpack: silhouette/illustration; no stock photo con fondo.

**Asset inventory (verified).**

| Object | Asset exists? | File | Notes |
|---|---|---|---|
| Factura / bill | **YES** | `src/presentation/assets/illustrations/insurance-document.svg` (622 B) | A document with a cart/label. Usable as the factura continuity object from the opening. |
| Bolsa de compras | **YES** | `src/presentation/assets/illustrations/grocery-bag.svg` (990 B) | A grocery bag with groceries. This is the opening's "compras" object. |
| Mochila / backpack | **NO** | — | Not in the package. Not in Figma-app. Only 2 fixture strings in `src/planner/fixtures.ts:375,1006`. |
| Heladera / fridge | **NO** | — | Not in the package. Not in Figma-app. Only data references (`src/inventory/v11.ts:130`, `src/onboarding/fixtures.ts:137`). |
| Casa / house | **NO** | — | Not in the package. Not in Figma-app. The opening's "casa blanca" (master §A8) was never implemented. |
| Family avatars | **YES** | `src/presentation/assets/illustrations/family-avatars.svg` (1310 B) | 4 illustrated avatars at x-offsets 0, 66, 132, 198. Flat illustration, muted earth tones. Usable for the closing family. |

**Findings.**

| ID | Finding | Severity |
|---|---|---|
| **J-03** | Mochila and heladera do not exist as assets. They must be created. Figma-app has **no** illustration assets at all (zero `.svg`/`.png` in `src/`). The entire closing object vocabulary must be designed and produced from scratch. | **HIGH** |
| **J-04** | **The three closing objects are not the three the opening established.** Script L462–465 names `mochila / factura / heladera`. The opening (L15–21) established `seguro del auto → factura`, `compras → bolsa`, `heladera → garantía`. Only `heladera` overlaps, and even that has no visual asset — the opening represented it via `insurance-document.svg` (the garantía document) plus a chat bubble. Master §2.5: *"Cuando el mismo dato reaparece, debe ser el mismo objeto visual."* The closing would introduce objects the audience never saw. | **MEDIUM** (SCRIPT ISSUE) |
| **J-04** | **Recommended resolution.** Use the objects the opening actually established: `grocery-bag.svg` (the "compras" object) instead of "mochila", `insurance-document.svg` (the "factura" object) for "factura", and either create a heladera illustration or use the garantía document as the heladera's visual proxy (as the opening did). This preserves continuity and avoids inventing new objects. The script's "mochila" should be reconciled with the opening's "compras" in the later script-cleanup pass. | (target for J-04) |
| — | **Asset style.** The existing illustrations (`insurance-document.svg`, `grocery-bag.svg`, `family-avatars.svg`) share a consistent flat-vector style with muted earth tones (`#302922`, `#45362A`, `#B57956`, `#718374`). New objects (mochila, heladera, casa) must match this style exactly. NO_UI §17: no emoji, no stock photo, rotation 1–3 degrees max, off-white paper, small shadow. | (target) |

---

## 19. Family / house composition audit

**Master §14 J2.**

> En `La casa no cambió`: dibujar el mismo contorno simple de casa usado en la apertura. Los objetos bajan de tamaño ligeramente. En `y tampoco tiene por qué hacerlo`: aparecen Juli · Tomi · Mamá · Papá dentro de la casa.

**NO_UI §16 J04–J05.**

> J04 — HOUSE. HouseOutline se dibuja alrededor.
> J05 — FAMILY. Juli/Tomi/Mamá/Papá aparecen dentro.

**Findings.**

| ID | Finding | Severity |
|---|---|---|
| **J-05** | No house outline exists. The opening's "casa blanca" (master §A8: *"dibujar casa blanca simple alrededor/detrás de los cuatro en 700–900 ms"*) was never implemented — S03 has `stepCount: 1` and only the HomePlus reveal. So there is no house outline to "draw again" in the closing. The master's J2 assumes an opening beat that does not exist. | **HIGH** |
| **J-05** | No family appears in the closing. The only place the four people appear in S18 is the team member list (initials + names). The "family" (Juli/Tomi/Mamá/Papá) never appears. | **HIGH** |
| — | **Available asset.** `family-avatars.svg` contains 4 illustrated avatars in a consistent flat style. These are the correct building blocks for the closing family. They should be used as-is, not replaced with initials. | (target) |
| — | **House outline.** A simple white house outline (matching the opening's intended "casa blanca") must be created. It should be a single clean SVG path, drawn around the family in 700–900 ms (master §A8 duration). | (target) |

---

## 20. Invisible-work concept audit

**Master §14 J3.**

> En `lo que puede cambiar es todo el trabajo invisible…`: afuera de la casa aparecen fantasmas al 25–35 %: `¿Quién me busca hoy?`, WhatsApp viejo, `Ma ❤️: Esta semana lo busco yo a Tomi.` En `reconstruir algo que ya se sabe`: pocas líneas discontinuas intentan unirlos. Después todo ese trabajo externo hace fade. Quedan casa + familia + objetos.

**NO_UI §16 J06–J09.**

> J06 — Ghost: `¿Quién me busca hoy?` afuera de la casa. 25–35 %.
> J07 — WhatsApp fragment afuera. 25–35 %.
> J08 — Mensaje: `Ma ❤️: Esta semana lo busco yo a Tomi.` afuera.
> J09 — RECONSTRUCT. Pocas líneas discontinuas intentan conectar. AUTO BEAT: líneas, micro hold, fantasmas desaparecen. Final: casa + familia + mochila/factura/heladera.

**Findings.**

| ID | Finding | Severity |
|---|---|---|
| **J-06** | The invisible-work concept is entirely absent. This is the **conceptual core** of the closing: what HomePlus reduces is not the objects but the *reconstruction* — asking again, searching for the message, remembering who did what, reconstructing what is already known. Without it, the closing has no argument; it is just an end card. | **HIGH** |
| **J-06** | **Available assets.** The master's three ghosts map to existing presentation assets: `¿Quién me busca hoy?` is the message typed in the opening (master §5 A3); the old WhatsApp is `assets/app-icons/whatsapp.svg` (367 B); `Ma ❤️: Esta semana lo busco yo a Tomi.` is a mandatory shared element (master §2.5) that was never implemented in the opening. The closing is the correct place to introduce it. | (target) |
| — | **AUTO BEAT.** NO_UI J09 explicitly marks this as an AUTO BEAT: dashed lines appear, micro hold, ghosts disappear. This is one of the few places in the closing where the presenter should **not** trigger manually — the disappearance must be automatic to feel like a release, not a cut. | (target) |

---

## 21. Technology-recedes audit

**Master §14 J6–J7.**

> J6: Los componentes periféricos empiezan a sugerir un marco de teléfono alrededor de la escena. No entra un dispositivo externo: el marco nace de la propia organización. Casa + familia siguen dentro.
> J7: En `Porque si HomePlus funciona como queremos`: teléfono termina de definirse. En `la tecnología deja de sentirse protagonista`: teléfono + componentes organizativos + línea naranja: `scale 100→82`, `opacity 100→0`. **Casa y familia no se mueven.** La tecnología literalmente se retira.

**NO_UI §16 J19–J20.**

> J19 — Los elementos periféricos empiezan a definir geometría de phone.
> J20 — `la tecnología deja de sentirse protagonista`. AUTO BEAT: phone 100→82 %, phone opacity 100→0, organización desaparece, línea naranja desaparece. Casa/familia: NO se mueven.

**Findings.**

| ID | Finding | Severity |
|---|---|---|
| **J-09** | Technology never recedes. There is no phone geometry, no scale-down, no opacity fade, no disappearance. The master's J7 is the **visual thesis of the entire film**: the device disappears, life does not. Without it, the closing has no visual climax and the film's final argument is unproven. | **HIGH** |
| **J-09** | **The master's key constraint.** *"Casa y familia no se mueven."* The technology recedes; life does not. This is the single most important rule in the closing. Any implementation that moves, scales or fades the family is wrong. | (target) |
| **J-09** | **The phone frame must be born from the organization, not from an external device.** Master J6: *"No entra un dispositivo externo: el marco nace de la propia organización."* The five organization symbols (gastos/tareas/horarios/información/responsabilidades) arrange themselves into phone geometry. This is a SHARED_ELEMENT extraction, not a device transition. | (target) |
| — | **Orange line.** Master J4 / NO_UI J11 requires a thin orange line below the family at `Busca acompañarla…`. The stage accent is `#E65C1B` (`tokens.colors.accent`); the master's frozen HomePlus orange is `#E7643F`. These are different. **DECISION REQUIRED** which orange the closing uses. See **J-15**. | (with J-15) |

---

## 22. "Simplemente viviendo" audit

**Master §14 J8.**

> Solo casa + cuatro integrantes. En `podemos pasar menos tiempo organizando cómo vivir juntos`: quietud. En `un poco más de tiempo simplemente viviendo`: flash blanco limpio 80–120 ms. Aparece marco fotográfico fino alrededor de la familia. Hold ~800 ms.

**NO_UI §16 J21.**

> J21 — `simplemente viviendo`. Flash blanco 80–120 ms. Marco fotográfico fino. Familia convertida visualmente en "momento". Hold ~800 ms.

**Findings.**

| ID | Finding | Severity |
|---|---|---|
| **J-10** | The "simplemente viviendo" beat is absent. This is the final emotional landing of the entire film. | **HIGH** |
| — | **Should it exist?** **YES.** It is the correct final beat. The risk is sentimentality; the mitigation is restraint: a clean white flash (80–120 ms), a thin photo frame, no text, no music cue, no stock-photo aesthetic. The family becomes a "moment" — a held frame, not a narrative scene. | (target) |
| — | **How abstract/realistic?** The family should remain the same flat-illustration avatars from `family-avatars.svg`, now inside a thin photo frame. Do **not** switch to photorealism or a stock-photo aesthetic. The abstraction is the point: it is a *representation* of a moment, not the moment itself. | (target) |
| — | **Duration.** Flash 80–120 ms. Frame appears. Hold ~800 ms. Then fade to black. Total beat: ~1.2 s. | (target) |
| — | **Text?** **NO.** No text. The beat is purely visual. The speaker says `un poco más de tiempo simplemente viviendo` — the screen should show, not tell. | (target) |
| — | **Position.** Before the end card. Master J8 → J9 (fade black) → J9/J22 (end card) → J23 (`Muchas gracias.`). The living moment is the last thing the audience sees before the brand. | (target) |

---

## 23. End-card audit

**Master §14 J9.**

> Fade a negro. Aparece: logo HomePlus blanco + wordmark. Debajo: cuatro integrantes reales del equipo con nombre/avatar. No roles técnicos, párrafos ni elementos innecesarios. En `Muchas gracias`: **EN PANTALLA:** `Muchas gracias.` Fade 250–300 ms. Queda fijo. FIN.

**NO_UI §16 J22–J23.**

> J22 — Fade black. End card: HomePlus logo/wordmark blanco, equipo debajo, layout limpio.
> J23 — `Muchas gracias.` Aparece en 250–300 ms. Hold infinito. FIN.

**Runtime truth (measured).**

| State | Content | Font size |
|---|---|---|
| `S18_step01` | HomePlus logo (120 px) + wordmark `HomePlus` | 64 px |
| `S18_step02` | + 4 team members: BG Bernardo Gimenez, BD Benjamin Duarte, GB Gabriel Bazan, ME Maximo Echezarreta | 24 px avatar, 22 px name |
| `S18_step03` | + `Muchas gracias.` | 76 px |

**Findings.**

| ID | Question | Verdict |
|---|---|---|
| — | J-E1: *¿Aparece la marca en el momento correcto?* | **NO.** The brand appears at `S18_step01`, which per the baseline block mapping falls inside Gaby's closing (block 12). Master J22 places the end card after J21 ("simplemente viviendo"), which is Colo's last line. The brand is ~30 s too early. **HIGH** (J-02) |
| — | J-E2: *¿El end card tiene suficiente espacio negativo?* | **YES.** The composition is well balanced: logo centred, wordmark below, team in a row with 56 px gaps, `Muchas gracias.` at 76 px with 48 px top margin. Generous negative space. **POSITIVE** |
| — | J-E3: *¿Debería "Muchas gracias" aparecer tras un trigger separado?* | **YES, and it does.** `S18_step02` → `S18_step03` is a separate trigger. Correct. **POSITIVE** |
| — | J-E4: *¿El estado final se mantiene indefinidamente?* | **YES.** Session 1 confirmed: nothing moves during a 10 s hold. The end card is stable. **POSITIVE** |
| — | J-E5: *¿Algo anima innecesariamente?* | **NO.** The only animations are the brand fade (420 ms), the team stagger (90 ms × 4 = 270 ms total, inside motion-design's 500 ms budget), and the thanks fade (420 ms). All are purposeful. **POSITIVE** |
| — | **Team composition.** 4 members: Bernardo Gimenez, Benjamin Duarte, Gabriel Bazan, Maximo Echezarreta. Master J9: *"cuatro integrantes reales del equipo con nombre/avatar. No roles técnicos, párrafos ni elementos innecesarios."* The runtime matches: names + initial avatars, no roles, no paragraphs. **POSITIVE** |
| — | **Avatar style.** The team avatars are initials in circles (`BG`, `BD`, `GB`, `ME`) with a 1 px border at 22 % opacity. This is consistent with the presentation's visual language. The closing family should use the illustrated `family-avatars.svg` instead, to distinguish "the team" from "the family". | (target) |

---

## 24. Closing issue register

| ID | SCENE / STATE | SCRIPT MOMENT | MASTER INTENT | CURRENT RUNTIME EVIDENCE | FIGMA TARGET | PRODUCT / INTEGRATION EVIDENCE | HUMAN WALKTHROUGH | CLASSIFICATION | SEVERITY | VERDICT | TARGET BEHAVIOR | RATIONALE |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| **J-01** | S18 t0–t3 | L444–497 (blocks 12 + 13) | Full closing argument: objects → house → family → invisible work → philosophy → organization → technology recedes → living moment → end card | `S18Closing/index.tsx` is 32 lines. `stepCount: 4`. JSX = logo + wordmark, 4 members, `Muchas gracias.` 35 spoken lines / 82.8 s over 4 states | No closing design exists in Figma-app. Zero `Muchas gracias`. Zero illustration assets. | — | *"y ya el próximo tap, cierre con el logo Home Plus y debajo los nombres… y el próximo tap 'muchas gracias'"* | NARRATIVE | **BLOCKER** | CONFIRMED — closing argument absent | Build the full closing per master §14 J1–J9 / NO_UI §16 J01–J23. Target 18 manual triggers. | 35 spoken lines over 2 speakers resolve to an end card. The entire emotional argument is absent. |
| **J-02** | S18 t0–t1 | L446–458 (Gaby) | Gaby's entire closing in absolute black. No text. No logo. No animation. | `S18_step00` black (correct). `S18_step01` = HomePlus brand. Per baseline block mapping, block 12 covers `S18_step00…01`, so the brand is inside Gaby's block. | — | — | *"y ya el próximo tap, cierre con el logo"* | TIMING + AI-SEMANTICS | HIGH | CONFIRMED — brand too early | Move the brand to Colo's block (after J21 "simplemente viviendo"). Hold black for all of Gaby's 21.2 s. | Master J00: "Negro absoluto durante TODO el cierre de Gaby. Nada más." The brand is ~30 s too early. |
| **J-03** | S18 (target) | L462–465 | Mochila, factura, heladera enter | **absent** | No mochila or heladera assets exist | — | — | VISUAL | HIGH | CONFIRMED — objects absent | Create or source 3 physical objects. Use `grocery-bag.svg` for "compras" (not "mochila"), `insurance-document.svg` for "factura". Create heladera or use garantía as proxy. | The objects are the opening of the closing argument. Without them there is nothing to say "the house did not change". |
| **J-04** | S18 (target) | L462–465 | Same objects as the opening | **absent** | — | — | — | SCRIPT ISSUE + NARRATIVE | MEDIUM | CONFIRMED — wrong objects | Reconcile: use the opening's actual objects (bolsa, factura, garantía). Flag "mochila" for the script-cleanup pass. | Master §2.5: "Cuando el mismo dato reaparece, debe ser el mismo objeto visual." The closing names objects the audience never saw. |
| **J-05** | S18 (target) | L467–468 | House outline draws; family appears inside | **absent** | No house outline. `family-avatars.svg` exists (4 avatars). | — | — | VISUAL | HIGH | CONFIRMED — no house, no family | Draw a simple white house outline (700–900 ms). Place the 4 illustrated avatars inside. | The house and family are the constant that technology recedes from. Without them, J7 has nothing to recede from. |
| **J-06** | S18 (target) | L470–474 | Invisible work: ghosts outside, dashed lines, ghosts fade | **absent** | `whatsapp.svg` exists. `¿Quién me busca hoy?` is the opening's typed message. `Ma ❤️` is a mandatory shared element (master §2.5). | — | — | NARRATIVE | HIGH | CONFIRMED — concept absent | Add 3 ghosts at 25–35 %, dashed lines, AUTO BEAT disappearance. | This is the conceptual core: HomePlus reduces reconstruction, not objects. Without it the closing has no argument. |
| **J-07** | S18 (target) | L476–477 | `HomePlus no pretende enseñarle…` → QUIETUD TOTAL. Then thin orange line. | **absent** | — | — | — | NARRATIVE | HIGH | CONFIRMED — philosophy absent | Hold total stillness on the philosophy line. Then a thin orange line below the family. No logo. No phone. | This is the product's philosophical claim. It deserves a held frame. |
| **J-08** | S18 (target) | L479–488 | 5 organization categories, one manual trigger per word | **absent** | — | — | — | VISUAL | HIGH | CONFIRMED — categories absent | 5 manual triggers: `gastos` → amount, `tareas` → check, `horarios` → time block, `información` → document, `responsabilidades` → person. Small symbols around the family. | The master explicitly requires 5 manual triggers. This is the only place in the closing with granular timing control. |
| **J-09** | S18 (target) | L491–492 | Technology recedes: phone 100→82 %, opacity→0. Casa/familia do not move. | **absent** | — | — | — | NARRATIVE | HIGH | CONFIRMED — no recession | Peripheral elements form phone geometry. AUTO BEAT: scale 100→82, opacity→0. Family does not move. | The visual thesis of the entire film. Without it the closing has no climax. |
| **J-10** | S18 (target) | L494–495 | `simplemente viviendo`: flash, frame, hold | **absent** | — | — | — | NARRATIVE | HIGH | CONFIRMED — living moment absent | White flash 80–120 ms. Thin photo frame. Family as "moment". Hold ~800 ms. No text. | The final emotional landing. |
| **J-11** | S18 t1–t3 | L497 | End card after the argument | Brand at `S18_step01` (Gaby's block). Team at `S18_step02`. Thanks at `S18_step03`. | — | — | — | TIMING | HIGH | CONFIRMED — end card too early | Move the end card to after J21. | The end card is the conclusion; it must come after the argument, not before. |
| **J-12** | S18 t1–t3 | L497 | End card composition | Logo 120 px + wordmark 64 px + 4 members + `Muchas gracias.` 76 px. Generous negative space. | — | — | — | — | **POSITIVE** | CONFIRMED — end card is well built | Keep as-is. | Satisfies J-E2, J-E3, J-E4, J-E5. |
| **J-13** | S18 t0 | — | Negro absoluto | `#060404`. Token `colors.blackout = '#000000'` exists but is unused. | — | — | — | VISUAL | LOW | CONFIRMED — not literal black | Use `#000000` or accept `#060404` as consistent with S07 (N-05). | Functionally black on a projector. Consistent with the rest of the deck. |
| **J-14** | S18 (target) | L462–465 | Physical objects | No mochila, no heladera, no casa in the package or Figma-app. | Zero `.svg`/`.png` in Figma-app `src/`. | — | — | VISUAL + PRODUCTION | HIGH | CONFIRMED — assets must be created | Create 3 objects + house outline. Match existing flat-vector style. | The entire closing object vocabulary must be produced from scratch. |
| **J-15** | S18 (target) | L477 | Thin orange line below family | Stage accent `#E65C1B`. Master orange `#E7643F`. | — | — | — | VISUAL | MEDIUM | CONFIRMED — two oranges | DECISION: which orange for the closing line. | The master's J4/J11 requires an orange line. The stage and master use different oranges. |
| **J-16** | S18 (script) | L442 | `[Aca deberia haber una screen negra… hasta que el colo termina de hablar]` | At L442 the active speaker is Benja (block 11, L423–440). Colo's next turn is L462. | — | — | — | SCRIPT ISSUE | — | CONFIRMED — impossible condition | Flag for script-cleanup pass. | The condition can never be satisfied at L442. |
| **J-17** | S18 (script) | L490 | `[Aca aparece esa ultima hipotetica q deberia existir]` | No "hipótesis" exists in the script. L491 says "Porque si homeplus funciona como queremos…" | — | — | — | SCRIPT ISSUE | — | CONFIRMED — ghost content | Flag for script-cleanup pass. | The author marked missing content. |
| **J-18** | S18 (script) | L446 | `hasta Geni responde…` | Script says `Geni`. Runtime says `Homi`. | — | — | — | SCRIPT ISSUE | — | CONFIRMED — stale naming | Canonical: `Homi`. | Script uses `Geni` at L446. Product and runtime use `Homi`. |

---

## 25. Closing positives

| # | What survives | Classification | Rationale |
|---|---|---|---|
| 1 | `S18_step00` pure black state | **KEEP AS-IS** | Correct J00 anchor. Held indefinitely. |
| 2 | The `s18-veil-in` 220 ms fade | **KEEP AS-IS** | Correct primitive for a chapter reset. |
| 3 | The end card composition (logo 120 px + wordmark 64 px + 4 members + `Muchas gracias.` 76 px) | **KEEP AS-IS** | Well built. Satisfies J-E2, J-E3, J-E4, J-E5. |
| 4 | The team stagger (90 ms × 4 = 270 ms) | **KEEP AS-IS** | Inside motion-design's 500 ms budget. Purposeful. |
| 5 | The `insurance-document.svg` and `grocery-bag.svg` assets | **KEEP AS-IS** | Usable as the factura and compras continuity objects. |
| 6 | The `family-avatars.svg` asset | **KEEP AS-IS** | 4 illustrated avatars in a consistent flat style. The correct building blocks for the closing family. |
| 7 | The `whatsapp.svg` app icon | **KEEP AS-IS** | Usable as the old-WhatsApp ghost in J3. |
| 8 | The black colour `#060404` | **KEEP AS-IS** | Consistent with S07 (N-05). Functionally black. |

---

## 26. Closing target choreography

**Pacing target.** Scene J = 82.8 s of speech. Target 18 manual triggers → 4.6 s per trigger. Current 4 states → 20.7 s per state. Net +14 states.

| BEAT | SPEAKER | CURRENT | TARGET | ACTION |
|---|---|---|---|---|
| **J-00** | Gaby | `S18_step00` black | Black. Hold for all of Gaby's 21.2 s. No text. No logo. No animation. | **KEEP** — hold longer |
| **J-01** | Colo | (absent) | Mochila enters left-upper third. Large. No emoji. | **ADD** |
| **J-02** | Colo | (absent) | Factura enters right-middle. | **ADD** |
| **J-03** | Colo | (absent) | Heladera enters centre-lower. Much air. No chaos. | **ADD** |
| **J-04** | Colo | (absent) | House outline draws around (700–900 ms). Objects shrink slightly. | **ADD** |
| **J-05** | Colo | (absent) | Juli · Tomi · Mamá · Papá appear inside the house. | **ADD** |
| **J-06** | Colo | (absent) | Ghost `¿Quién me busca hoy?` outside at 25–35 %. | **ADD** |
| **J-07** | Colo | (absent) | WhatsApp fragment outside at 25–35 %. | **ADD** |
| **J-08** | Colo | (absent) | `Ma ❤️: Esta semana lo busco yo a Tomi.` outside at 25–35 %. | **ADD** |
| **J-09** | (auto) | (absent) | AUTO BEAT: dashed lines try to connect. Micro hold. Ghosts disappear. | **ADD** |
| **J-10** | Colo | (absent) | `HomePlus no pretende enseñarle…` → QUIETUD TOTAL. Nothing moves. | **ADD** |
| **J-11** | Colo | (absent) | `Busca acompañarla…` → thin orange line below the family. No logo. No phone. | **ADD** |
| **J-12** | Colo | (absent) | `gastos` → small amount symbol appears near the family. | **ADD** |
| **J-13** | Colo | (absent) | `tareas` → small check symbol. | **ADD** |
| **J-14** | Colo | (absent) | `horarios` → small time-block symbol. | **ADD** |
| **J-15** | Colo | (absent) | `información` → small document symbol. | **ADD** |
| **J-16** | Colo | (absent) | `responsabilidades` → small person/assignment symbol. | **ADD** |
| **J-17** | (auto) | (absent) | `sea más simple` → five elements order themselves. | **ADD** |
| **J-18** | (auto) | (absent) | `sin convertir la organización en el centro` → elements move to periphery. Family remains centre. | **ADD** |
| **J-19** | (auto) | (absent) | Peripheral elements form phone geometry. | **ADD** |
| **J-20** | (auto) | (absent) | AUTO BEAT: phone 100→82 %, opacity→0. Organization disappears. Orange line disappears. Casa/familia do not move. | **ADD** |
| **J-21** | Colo | (absent) | `simplemente viviendo`: white flash 80–120 ms. Thin photo frame. Family as "moment". Hold ~800 ms. | **ADD** |
| **J-22** | (auto) | (absent) | Fade to black. End card: HomePlus logo/wordmark blanco + team below. | **ADD** |
| **J-23** | Colo | `S18_step03` `Muchas gracias.` | `Muchas gracias.` appears in 250–300 ms. Hold infinite. FIN. | **KEEP** |

**Manual vs auto beats.**

| Beat | Type | Rationale |
|---|---|---|
| J-00 black | MANUAL | Spoken idea changes: Gaby's closing begins |
| J-01 mochila | MANUAL | Spoken idea changes: "la mochila sigue siendo una mochila" |
| J-02 factura | MANUAL | Spoken idea changes: "la factura sigue venciendo" |
| J-03 heladera | MANUAL | Spoken idea changes: "la heladera se puede romper" |
| J-04 house | AUTO | Indivisible: the outline draws |
| J-05 family | AUTO | Indivisible: the family appears |
| J-06 ghost 1 | MANUAL | Spoken idea changes: "volver a preguntar" |
| J-07 ghost 2 | MANUAL | Spoken idea changes: "buscar ese mensaje" |
| J-08 ghost 3 | MANUAL | Spoken idea changes: "tratar de recordar quien hacia que" |
| J-09 reconstruct | AUTO | Indivisible: lines, hold, disappearance |
| J-10 philosophy | MANUAL | Spoken idea changes: "HomePlus no pretende enseñar…" |
| J-11 orange line | AUTO | Indivisible: the line appears |
| J-12–J-16 five categories | MANUAL (×5) | Master explicitly requires one trigger per word |
| J-17–J-18 order/periphery | AUTO | Indivisible: the elements move |
| J-19 phone geometry | AUTO | Indivisible: the frame forms |
| J-20 recession | AUTO | Indivisible: scale + opacity + disappearance |
| J-21 living moment | MANUAL | Spoken idea changes: "simplemente viviendo" |
| J-22 end card | AUTO | Indivisible: fade + card |
| J-23 thanks | MANUAL | Spoken idea changes: "muchas gracias" |

**Total: 18 manual triggers, 10 auto beats.**

---

## 27. Motion audit I–J

**Method.** 17 transitions sampled at 0/60/120/200/320/450 ms with `getAnimations()` + per-node computed style (opacity, transform, translate, scale, bounding box, scrollHeight). 19 stable states probed. Evidence: `audit/runtime/session-05/data/transition-trace.json`, `…/stable-states.json`.

| Transition | Measured | Classification | Notes |
|---|---|---|---|
| `S14_step04 → S15_step00` | 0 transition animations. `s15-scene-in` 320 ms + `s15-phone-in` 420 ms/16 px. | **PURPOSEFUL** but **MISSING** | Device arrival is correct. But no black hold, no name-alone beat (I-06). |
| `S15_step00 → S15_step01` | `transition:homi-user-bubble` opacity 320 ms + translateY 420 ms. | **PURPOSEFUL** | Correct duration, easing, primitive. |
| `S15_step01 → S15_step02` | `transition:homi-proposal` 320/420 ms. | **PURPOSEFUL** | Correct. |
| `S15_step02 → S15_step03` | `transition:homi-confirm` 320/420 ms. | **PURPOSEFUL** | Correct. |
| `S15_step03 → S15_step04` | confirm exits + `transition:homi-done` 320/420 ms. | **DISTRACTING** | Wrong beat: should be the task landing in HomePlus, not a chat toast (I-02). |
| `S15_step04 → S16_step00` | 0 animating. Pure cross-mount. | **MISSING** | Hard cut at a chapter boundary (I-24). |
| `S16_step00 → S16_step01` | 13 running: greeting + bubble + persona + proposal + 2× swap. | **PURPOSEFUL** but **REDUNDANT** | 6 concurrent transitions for one beat. |
| `S16_step01 → S16_step02` | `homi-swap-in` 420 ms on persona + answer. | **PURPOSEFUL** but **REDUNDANT** | Identity and payload move identically (I-23). |
| `S16_step02 → S16_step03` | Same. | **PURPOSEFUL** but **REDUNDANT** | Same. |
| `S16_step03 → S16_step04` | `transition:homi-context` 320/420 ms. | **DISTRACTING** | Generic chips claim grounding without providing it (I-13). |
| `S16_step04 → S17_step00` | 0 animating. Pure cross-mount. | **MISSING** | Hard cut (I-24). |
| `S17_step00 → S17_step01` | `transition:homi-decision-row` + `transition:homi-confirm`. `scrollHeight 64→54`. | **PURPOSEFUL** | The 10 px scrollHeight change is a neutral reflow artefact. |
| `S17_step01 → S17_step02` | `transition:s17-line` (1→0.4) + `transition:s17-resolution` (0→1). | **DISTRACTING** | Two stage headlines cross-fading (I-20). |
| `S17_step02 → S17_step03` | 10 transitions: decision row out, confirm out, `homi-done` in. | **DISTRACTING** | The frozen "NO confirmar" beat animated as a success (I-04). |
| `S17_step03 → S18_step00` | `s18-veil-in` 220 ms only. | **MISSING** | Should be a chapter reset; 220 ms is the fastest duration in the system (I-24). |
| `S18_step00 → S18_step01` | `transition:s18-brand` opacity 420 ms + scale 0.96→1. | **REDUNDANT** | Brand enters ~30 s before the end (J-02). |
| `S18_step01 → S18_step02` | `transition:s18-team` + 4× `s18-member` with 90 ms stagger. | **PURPOSEFUL** | The only correct stagger in the film. 270 ms total, inside the 500 ms budget. |
| `S18_step02 → S18_step03` | `transition:s18-thanks` opacity + 12 px rise, 420 ms. | **PURPOSEFUL** | Correct. |

**Motion-design compliance.**

| Rule | Status |
|---|---|
| Never linear for spatial movement | ✅ All transitions use `cubic-bezier(.2,.8,.2,1)` |
| Never opacity-only for important state changes | ✅ All combine opacity + translateY or scale |
| Never exceed 1/3 screen without intermediate keyframe | ✅ Max travel is 16 px (device rise) |
| Three motion layers (primary + secondary + ambient) | ⚠️ Primary and secondary present; ambient (glow) is static in S15–S17 |
| Total stagger under 500 ms | ✅ S18 team: 270 ms |
| Enter > Exit | ✅ Entrances 420 ms, exits 320 ms |
| `prefers-reduced-motion` block exists | ✅ `index.css` has it |

**Missing motion.**

| Beat | Required | Status |
|---|---|---|
| Device lateral entry (Planner) | 500 ms `motion-spatial-wipe` | **MISSING** (I-02) |
| Shared element travel | 400–700 ms | **MISSING** (I-02) |
| Device exit up / enter below | 400–600 ms | **MISSING** (I-05) |
| Three-device emergence | 400–600 ms | **MISSING** (I-10) |
| Exposure down except decision | 320–420 ms | **MISSING** (I-20) |
| Chapter reset to black | 400–600 ms | **MISSING** (I-24) |
| House outline draw | 700–900 ms | **MISSING** (J-05) |
| Ghost fade | 320–420 ms | **MISSING** (J-06) |
| Phone recession (scale + opacity) | 600–1000 ms | **MISSING** (J-09) |
| White flash | 80–120 ms | **MISSING** (J-10) |

---

## 28. Hold / silence recommendations

| Beat | Current | Target | Rationale |
|---|---|---|---|
| Barrier question → Homi | 320 ms crossfade | **Black hold 400–900 ms** | Master §13 H4: "Hold corto. Fade del texto → negro." The causal link must be felt, not asserted. |
| Homi name → phone | Simultaneous | **Name holds 400–900 ms alone on black** | Master §13 I0: "Después el nombre cede lugar a un teléfono." The name must be alone first. |
| Proposal → confirm | Immediate | **Hold 400–900 ms** | The audience must read the proposal before the decision appears. |
| Confirm → task lands | Immediate (chat toast) | **Hold 400–900 ms after landing** | Master §13 I4: "Hold corto." The audience must see the task in Planner. |
| Task lands → exit | Immediate | **Hold 400–900 ms** | The proof must be absorbed before the device exits. |
| Gaby's closing | 1 state (black) | **Hold 21.2 s of black** | Master J00: "Negro absoluto durante TODO el cierre de Gaby." |
| `HomePlus no pretende enseñar…` | Absent | **QUIETUD TOTAL** | Master J4/J10: the philosophy line deserves a held frame. |
| `simplemente viviendo` | Absent | **Hold ~800 ms** | Master J8/J21: the living moment must breathe. |
| End card | Stable | **Hold infinite** | Master J9/J23: "Hold infinito. FIN." |

---

## 29. Human hypothesis adjudication

### HW-I

| ID | Hypothesis | Verdict | Evidence |
|---|---|---|---|
| **HW-I-001** | Homi entrance works | **PARTIALLY CONFIRMED** | Device reveal and assistant chrome are good. But no silence, name never cedes. |
| **HW-I-002** | Wrong text, wrong answer, "sin animación" | **PARTIALLY CONFIRMED** | (a) CONFIRMED wrong text. (b) CONFIRMED mismatch. (c) REJECTED on "sin ningún tipo de animación" — measured 320/420 ms fade + 10 px rise. |
| **HW-I-003** | Chain presented as accumulation of status messages | **REJECTED** as stated / **CONFIRMED** in substance | S15 is a clean 4-element thread, not an accumulation. But the substantive UX point (no completion before decision) is CONFIRMED at S17_step03 (I-04). |
| **HW-I-004** | Spoken has no correspondence; proposal not seen as proposal | **CONFIRMED** | No proposal structure at all (no action type, no date, no cancel). |
| **HW-I-005** | "Homi no vive al costado… ya está encaminada" | **REJECTED** | Device never moves in 14 states. No second surface. No proof of "works over HomePlus". |
| **HW-I-006** | S16 t0, no deviation | **CONFIRMED NEUTRAL** | Entry line is fine, but see I-07 (empty state regression). |
| **HW-I-007** | Empty Homi state re-shown | **CONFIRMED** | `S16_step00` shows `¿En qué te ayudo?` + `Pedile algo a Homi…`. |
| **HW-I-008** | Answer exists only as chat bubble; no app surface | **CONFIRMED** | `phoneCount = 1` in all 5 S16 states. |
| **HW-I-009** | Tomi's resolution shown before setup-up | **REJECTED** as stated | No setup-up or resolution beat in S16. But the Tomi answer contradicts script L97 — recorded as I-11. |
| **HW-I-010** | "¿Quién puede pasar a buscarlo?" has no visual beat | **CONFIRMED** | The Homi answer resolves it without the question being asked. |
| **HW-I-011** | Papá's answer adds Pagos + Shopping List; Shopping List doesn't exist | **CONFIRMED** and **ESCALATED** | Product truth: 0 tables, 0 routes, 0 screens. Plus "Internet ya está pago" converts an open question into a fact. |
| **HW-I-012** | "basado en tu contexto" beat not in script | **CONFIRMED** | `CONTEXT_SOURCES = ['Calendario','Tareas','Pagos']` at `S16_step04`. |
| **HW-I-013** | S17 t0 proposal card matches script | **PARTIALLY CONFIRMED** | Content is consistent with Scene B's Tomi thread. But master required a different, more consequential proposal. |
| **HW-I-014** | "la decisión es nuestra" as text under repeated concept | **CONFIRMED** | Two stage headlines cross-fade at `S17_step02`. |
| **HW-I-015** | Confirm → executes → black works | **REJECTED** | The black does not follow (hard cut, 220 ms veil). And "confirm → executes" is the defect (I-04). |
| **HW-I-016** | Script note L442 contradiction | **CONFIRMED** as SCRIPT ISSUE | At L442 the active speaker is Benja. Colo's next turn is L462. |

### HW-J

| ID | Hypothesis | Verdict | Evidence |
|---|---|---|---|
| **HW-J-000** | Global: "tiene una base acompañando el guion, pero no es lo que estamos buscando" | **PARTIALLY CONFIRMED** | For Scene I the structural read is right but the specific diagnosis is partly wrong. For Scene J it is confirmed outright. |
| **HW-J-001** | The planned closing does not exist | **CONFIRMED** | `S18Closing/index.tsx` is 32 lines. 35 spoken lines over 4 states. |
| **HW-J-002** | (duplicate of HW-J-000) | **CONFIRMED** | Same quote, same observation. Recorded once. |

---

## 30. Script issues

| ID | Line | Issue | Classification | Recommendation |
|---|---|---|---|---|
| **SI-01** | L347, L349, L356, L365, L367, L431, L438, L446 | **Stale assistant naming.** Script uses `Geni`/`GENI` at 8 lines. Product and runtime use `HOMI`. | SCRIPT ISSUE | Canonical: `Homi`. Do not create two assistants. Do not recommend restoring Geni. |
| **SI-02** | — | **Speaker `Ber` has no block.** `Ber` is declared in the cast (L11) but never assigned a speaking role. | SCRIPT ISSUE | Register only. No action. |
| **SI-03** | L353–356 | **Example of Geni incompatible with block 10.** Block 9 uses "comprar una coca". Block 10 asks by agenda (L375) and Finance (L403). | SCRIPT ISSUE | The frozen canon (master §3) resolves this: the first action is `Crear tarea / Comprar una Coca / Mañana`. |
| **SI-04** | L355 | **Errata "compar".** Should be `comprar`. | SCRIPT ISSUE | Fix in script-cleanup pass. |
| **SI-08** | L442 | **Impossible condition.** `[Aca deberia haber una screen negra que aparece hasta que el colo termina de hablar]`. At L442 the active speaker is Benja (block 11). Colo's next turn is L462. | SCRIPT ISSUE | The condition can never be satisfied at L442. Recommend: the black should be tied to Gaby's closing (L444–458), not to Colo. |
| **SI-09** | L490 | **Ghost content.** `[Aca aparece esa ultima hipotetica q deberia existir]`. No "hipótesis" exists in the script. | SCRIPT ISSUE | The author marked missing content. The master's J21 ("simplemente viviendo") is the intended beat. |
| **SI-10** | L462–465 | **Closing objects don't match opening.** Script names `mochila / factura / heladera`. Opening established `factura / bolsa / garantía`. | SCRIPT ISSUE | Reconcile in script-cleanup pass. Recommend using the opening's actual objects. |

---

## 31. Prioritized remediation

### P0 — Story / product truth

| # | Issue | Fix | Effort |
|---|---|---|---|
| 1 | **I-01** Wrong demo | Replace S15 with frozen canon: `Haceme acordar de comprar una Coca mañana` → `Crear tarea / Comprar una Coca / Mañana / Cancelar / Confirmar` | Medium |
| 2 | **I-02** No execution proof | Add shared-element sequence: Planner device enters, card travels, lands, holds, exits | High |
| 3 | **I-03** Wrong question | Change `¿Qué tengo que hacer hoy?` → `¿Qué me queda para mañana?` | Low |
| 4 | **I-04** Confirms mutation | Delete `S17_step03`. End on decision row with exposure move. | Low |
| 5 | **I-05** No visual UI | Add device swap: Homi exits up, visual UI enters from below, scales, exits, Homi returns | High |
| 6 | **I-06** Finance beat absent | Add 3 states: Finance question → answer → backing evidence | Medium |
| 7 | **I-15** Data conflict | DECISION: pick one Finance dataset. Make S09 and Homi Finance beat agree. | Low (decision) |
| 8 | **J-01** Closing absent | Build full closing per master §14 / NO_UI §16. Target 18 manual triggers. | Very High |

### P1 — Keynote excellence

| # | Issue | Fix | Effort |
|---|---|---|---|
| 9 | **I-06** (entry) | Add black hold + name-alone beat before phone | Low |
| 10 | **I-09** Forbidden titular | Remove `La misma pregunta. / Distinto contexto.` Replace with 3-device reveal | Low |
| 11 | **I-10** No multi-device | Add 3-device emergence with shared-element question | High |
| 12 | **I-11** Tomi contradicts script | Correct to `18:00–20:00`, remove mamá pickup | Low |
| 13 | **I-12** Papá invents feature | Rewrite Papá's answer. Remove shopping list. | Low |
| 14 | **I-13** Context chips | Remove. Replace with Finance beat. | Low |
| 15 | **I-18** Weak proposal | Replace with `Cambiar "Cumple de Juli"` / `Sábado · 18:00 → Domingo · 20:30` | Low |
| 16 | **I-20** Two headlines | Remove both. Use exposure move. | Low |
| 17 | **I-21** Static device | Implement frozen device directions | High |
| 18 | **J-02** Brand too early | Move end card to after J21 | Low |
| 19 | **J-03–J-10** Closing beats | Build objects, house, family, ghosts, philosophy, categories, recession, living moment | Very High |

### P2 — Polish

| # | Issue | Fix | Effort |
|---|---|---|---|
| 20 | **I-07** Empty state | Delete `S16_step00` | Low |
| 21 | **I-19** No cancel / weak label | Add `Cancelar` to S15. Rename `Ahora no` → `Cancelar`. | Low |
| 22 | **I-22** Semantic collision | Distinct classes for proposal vs answer | Low |
| 23 | **I-23** Undifferentiated swap | Differentiate identity (200 ms) from payload (320 ms + 60 ms delay) | Low |
| 24 | **I-24** Hard cuts | Add cross-dissolve at 3 boundaries | Low |
| 25 | **I-25** Papá grey | Give Papá a distinct colour | Low |
| 26 | **J-13** Black colour | Use `#000000` or accept `#060404` | Low |
| 27 | **J-15** Orange decision | DECISION: which orange for the closing line | Low (decision) |

---

## 32. Exact handoff to presentation developer

### Scene I — Homi

**I-00 + I-01: Entry.**
1. Keep the barrier question at `S14_step04`. On the next trigger, fade the question to black over 400 ms.
2. Hold black for 400–900 ms. Nothing on screen.
3. Reveal `Homi` at 110 px, white, on the left. Hold alone for 400–900 ms.
4. Then the phone enters from below (420 ms, 16 px rise, `motion-spatial-wipe`).
5. The `Homi` wordmark fades to 0.4 opacity once the phone is fully in. It does not disappear entirely — it becomes a quiet label.

**I-02: Request.**
6. On the next trigger, the transcription appears character-by-character (or word-by-word) over ~800 ms: `Haceme acordar de comprar una Coca mañana`.
7. The bubble sends (fade + 10 px rise, 320/420 ms).

**I-03: Proposal.**
8. On the next trigger, the proposal appears as a **structured card**, not a sentence:
   - Line 1 (small, muted): `Crear tarea`
   - Line 2 (large, bold): `Comprar una Coca`
   - Line 3 (medium): `Mañana`
   - Row: `Cancelar` (secondary, 54 px) | `Confirmar` (primary, brand orange, 54 px)
9. The proposal card does a micro scale (100 → 104 → 100, 200 ms) on appearance.

**I-04: Confirm → execution.**
10. On the next trigger, the `Confirmar` button shows a press state (scale 0.97, 120 ms).
11. Then run one **automatic** sequence (no further trigger):
    - a. The Planner phone enters from the right lateral (500 ms, `motion-spatial-wipe`). It carries `PlannerDemoScreen/PlannerTasks.tsx` with an empty task list.
    - b. The proposal card detaches from the Homi thread and travels as a shared element (400–700 ms, ease-in-out) to its exact position in the Planner task list.
    - c. The card lands as a real task row. Hold 400–900 ms.
    - d. The Planner phone exits by the lateral (500 ms).
    - e. Homi remains. The proposal card is gone from the thread.
12. Do **not** show a chat success bubble. The proof is the task in Planner.

**I-05: Exposure.**
13. Homi drops to 40 % exposure. The underlying HomePlus surface (the Planner task list, now with the task) becomes visible at 100 %.
14. Hold. Then restore Homi to 100 %.

**I-06: Context question.**
15. Delete `S16_step00` (the empty greeting state).
16. On the first trigger of S16, send `¿Qué me queda para mañana?` (transcription + send, one auto beat).
17. Juli's chip + answer appear. The question bubble is **byte-identical** across all three personas (same box, same text).

**I-07–I-09: Personas.**
18. On the next trigger, Tomi's chip + answer replace Juli's. The swap is a 420 ms fade + 14 px slide. **Differentiate:** the identity chip fades (200 ms), the answer card rises (320 ms) with a 60 ms delay.
19. On the next trigger, Papá's chip + answer replace Tomi's. Same motion.
20. **Correct the data:**
    - Juli: `Hoy tenés Educación Física a la mañana, llevar la autorización y la tarea de Matemática.` ✅ (keep)
    - Tomi: `Hoy tenés entrenamiento de 18:00 a 20:00. Entregá el trabajo de Historia.` (remove mamá pickup, fix time)
    - Papá: `Hoy: revisar los pagos del hogar y confirmar el turno del técnico.` (remove shopping list, remove asserted "Internet ya está pago")

**I-10: Three devices.**
21. On the next trigger (the thesis beat), two devices emerge from behind the centre device: Juli left, Tomi right. Papá remains central.
22. Extract the question bubble as a **shared element** that rises above the row of three devices at readable size (56 px). The three answers stay in their devices at native scale.
23. Do **not** add a stage headline. The shared-element question is enough.

**I-11–I-13: Finance.**
24. On the next trigger, the flanking devices exit left/right (500 ms). Papá remains.
25. Send `¿Cuánto gastamos en supermercado este mes?` (transcription + send).
26. The answer appears: `Supermercado · este mes` / `$184.320` / `12 movimientos` (3 lines, concise).
27. On the next trigger, real Finance components appear behind at 40 % exposure: the movement filter sheet (which renders `12 movimientos`), the category breakdown, the period selector. These must reconcile with S09's data.

**I-14–I-15: Device swap.**
28. On the next trigger, the Homi phone exits up (400 ms, 16 px rise).
29. A visual HomePlus phone enters from below (400 ms, 16 px rise). It carries `FinanceDemoScreen` or `PlannerDemoScreen` — a surface where looking/comparing/controlling is visibly better.
30. Brief scales (200 ms each) on: the chart/summary, the list/comparison, the controls/filters.
31. On the next trigger, the visual UI exits up. Homi enters from below. `Son dos formas de interactuar con el mismo sistema`: no extra animation. Let it breathe.

**I-16: Proposal.**
32. On the next trigger, Homi generates a structured proposal:
    - Line 1 (small, muted): `Cambiar evento`
    - Line 2 (large, bold): `Cumple de Juli`
    - Line 3 (medium): `Sábado · 18:00 → Domingo · 20:30`
    - Row: `Cancelar` (secondary, 54 px) | `Confirmar` (primary, brand orange, 54 px)
33. **No stage headline.** The proposal card is the only foreground object.

**I-17: Decision.**
34. On the next trigger, everything drops to 20 % exposure **except** `Cancelar` / `Confirmar`. The proposal card, the assistant bar, the composer, the device chrome — all dim.
35. **Do not confirm.** Hold.
36. Fade total → black (400–600 ms).

### Scene J — Closing

**J-00: Gaby's black.**
37. After I-17's fade to black, hold black for all of Gaby's closing (21.2 s). No text. No logo. No animation. The presenter holds the trigger.

**J-01–J-03: Objects.**
38. On Colo's first line, the mochila enters left-upper third. Large (200–300 px). Flat illustration. No emoji. Rotation 1–3 degrees.
39. On `la factura sigue venciendo`, the factura enters right-middle. Use `insurance-document.svg`.
40. On `la heladera se puede romper`, the heladera enters centre-lower. Create a flat-vector heladera matching the existing style.
41. Much air. No chaos. The three objects are the only things on screen.

**J-04–J-05: House and family.**
42. On `La casa no cambio`, a simple white house outline draws around the objects (700–900 ms, stroke draw).
43. The objects shrink slightly (scale 100 → 90).
44. On `y tampoco tiene porque hacerlo`, the four family avatars (`family-avatars.svg`) appear inside the house.

**J-06–J-09: Invisible work.**
45. On `lo que puede cambiar es todo el trabajo invisible…`, three ghosts appear outside the house at 25–35 % opacity:
    - `¿Quién me busca hoy?` (left)
    - The old WhatsApp fragment (right) — use `whatsapp.svg`
    - `Ma ❤️: Esta semana lo busco yo a Tomi.` (bottom)
46. On `y reconstruir algo que ya se sabe`, run one **automatic** sequence:
    - a. A few dashed lines try to connect the ghosts (300 ms).
    - b. Micro hold (400 ms).
    - c. The ghosts fade to 0 (400 ms).
47. The house + family + objects remain. The reconstruction work disappears.

**J-10–J-11: Philosophy.**
48. On `Homeplus no pretende enseñarle a una familia como ser familia`, **stop**. QUIETUD TOTAL. Hold for the full line. Nothing moves.
49. On `Busca acompañarla y darle un lugar comun…`, a thin orange line (2 px) appears below the four family members (300 ms). No logo. No phone.

**J-12–J-16: Organization categories.**
50. On each of the five words, a small clean symbol appears near the family:
    - `gastos` → a small amount/movement icon
    - `tareas` → a small check icon
    - `horarios` → a small time-block icon
    - `información` → a small document icon
    - `responsabilidades` → a small person/assignment icon
51. Each is 24–32 px. They appear around the family, not on top of it. Never giant words.

**J-17–J-20: Technology recedes.**
52. On `sea mas simple`, the five elements order themselves (300 ms).
53. On `sin convertir la organizacion en el centro`, the elements move to the periphery (400 ms). The family remains in the centre.
54. The peripheral elements begin to suggest phone geometry (400 ms).
55. On `la tecnología deja de sentirse protagonista`, run one **automatic** sequence:
    - a. The phone frame completes its geometry (300 ms).
    - b. Scale 100 → 82 % (600 ms, ease-in-out).
    - c. Opacity 100 → 0 (600 ms, ease-in).
    - d. The organization symbols disappear.
    - e. The orange line disappears.
    - f. **Casa and family do not move.** They remain at 100 % opacity, centred.

**J-21: Living moment.**
56. On `un poco mas de tiempo simplemente viviendo`:
    - a. A clean white flash (80–120 ms).
    - b. A thin photo frame appears around the family (300 ms).
    - c. The family becomes a "moment" — a held frame, not a narrative scene.
    - d. Hold ~800 ms. No text.

**J-22–J-23: End card.**
57. Fade to black (400 ms).
58. The end card appears: HomePlus logo (120 px) + wordmark (64 px) + 4 team members. Keep the existing composition.
59. On `muchas gracias`, the text appears (250–300 ms). Hold infinite. FIN.

---

## 33. Open questions

| # | Question | Owner | Why it cannot be resolved here |
|---|---|---|---|
| 1 | **Finance dataset.** Which dataset is canonical: NO_UI `$184.320 / 12 movimientos`, Figma-app `$61.800`, or presentation `$24.500 / $18.600`? | Product owner + Master owner | The three sources disagree. The presentation must pick one and make S09 and the Homi Finance beat agree. |
| 2 | **Orange for the closing line.** Stage accent `#E65C1B` or master orange `#E7643F`? | Master owner | Master J4/J11 requires an orange line. The stage and master use different oranges. |
| 3 | **Homi's product status.** Is Homi a pitch for a future product, or is it expected to exist by the time of the presentation? | Product owner | The presentation assumes Homi works. Integration has 0 Homi code. This affects how much product-truth grounding is required. |
| 4 | **Closing objects.** Should the closing use the script's `mochila / factura / heladera` or the opening's `bolsa / factura / garantía`? | Script owner + Master owner | The script and opening disagree. Continuity (master §2.5) favours the opening's objects. |
| 5 | **Figma-app `edit-event` persistence.** The master's `Sábado 19:00 → Domingo 19:00` is not reproducible (no 19:00 in the picker, no persistence). Should the target be extended, or should the presentation use `18:00 → 20:30`? | Figma-app owner | The audit recommends `18:00 → 20:30`, but this is a target change. |
| 6 | **`12 movimientos` renderability.** The count is only renderable in Figma-app's movement filter sheet, not in the Resumen. Is the filter sheet an acceptable backing component? | Figma-app owner | The master's I19 says "componentes reales de Finance". The filter sheet is real, but it is not the Resumen. |

---

## 34. Files written

All under `C:\Users\thega\Desktop\HomeplusPresentacion01\HomePlus_Presentacion_FINAL\audit\`.

```
audit/05_SCENES_I_J_AUDIT.md                          (this document)
audit/runtime/session-05/_tooling/pw.mjs                (playwright-core resolver)
audit/runtime/session-05/_tooling/s05-probe.mjs         (19-state + 17-transition probe)
audit/runtime/session-05/data/stable-states.json       (19 stable states, full computed style)
audit/runtime/session-05/data/transition-trace.json    (17 transitions × 6 frames)
audit/runtime/session-05/states/*.png                   (19 screenshots, 1280×720)
```

**Total files written by this session: 24**, all under `audit/`.

---

## 35. Production files modified

# NONE

No file under `src/`, `assets/`, `index.html`, `package.json`, `package-lock.json`, `pnpm-lock.yaml`, `vite.config.ts`, `tsconfig.json`, `.mise.toml`, `.gitignore`, `.gitattributes`, `.figma/`, `skills-lock.json`, `ABRIR_PRESENTACION.bat`, `LEEME.txt`, or `audit-input/` was created, modified, renamed or deleted.

The presentation dev server on port 8444 (started by Session 1) was reused as-is. No process was started, stopped or killed by this session.

Adjacent trees, both untouched:
- `C:\Users\thega\Desktop\Figma-app` — read-only static inspection. No write of any kind.
- `C:\Users\thega\Desktop\homeplus-worktrees\Family-Hub-Own-integration` — read-only static inspection. No write of any kind.

---

## 36. Verification

Performed per `verifying-before-completion`: every claim above is backed by a command that was run and whose output was read.

| # | Claim | Command that proves it | Result |
|---|---|---|---|
| 1 | 19 states captured (S14_step04 … S18_step03) | `node audit/runtime/session-05/_tooling/s05-probe.mjs` | `STABLE_STATES=19` |
| 2 | 17 transitions traced | same | `TRACES=17` |
| 3 | Device box unchanged across 14 S15–S17 states | `stable-states.json` → `phone.box` | `718,25,324,670` in all 14 |
| 4 | `phoneCount = 1` in all S15–S17 states | same | 1 in all 14 |
| 5 | S15 texts (request, proposal, confirm, done) | `stable-states.json` → `homi.*` | matches §5 table |
| 6 | S16 question is `¿Qué tengo que hacer hoy?` | `stable-states.json` → `homi.userBubble[0].text` | confirmed |
| 7 | S16 personas and answers | same → `homi.persona`, `homi.proposal` | matches §8 table |
| 8 | S16 context chips at step04 | same → `homi.context`, `homi.chips` | `Basado en tu contexto / Calendario / Tareas / Pagos` |
| 9 | S17 confirms at step03 | same → `homi.done[0].text` | `Confirmado / Entrenamiento actualizado · Avisé a la familia` |
| 10 | S17 stage headlines | same → `stage.s17line`, `stage.s17res` | `Homi interpreta y propone.` / `La decisión es nuestra.` |
| 11 | S18 has 4 states: black, brand, team, thanks | `stable-states.json` → `stage.s18*` | matches §23 table |
| 12 | `homi-swap-in` runs 0→420 ms on persona swap | `transition-trace.json` → `S16_step01->S16_step02` | `st=running t=43→110→187→300`, `st=finished t=420` |
| 13 | Question bubble identical across personas | `transition-trace.json` → `.homi-user-bubble` box | `777,187,238,81` in steps 01, 02, 03 |
| 14 | 3 scene boundaries are hard cuts | `transition-trace.json` → `S15_step04->S16_step00`, `S16_step04->S17_step00`, `S17_step03->S18_step00` | 0 transition animations at first two; `s18-veil-in` 220 ms at third |
| 15 | S18 black is `#060404` | `stable-states.json` → `stage.sceneBg` | `bg=rgb(6,4,4)` |
| 16 | No `supermercado` / `$184.320` / `12 movimientos` in presentation source | `Get-ChildItem src -Recurse -Include *.ts,*.tsx \| Select-String` | 0 matches |
| 17 | No mochila / heladera / casa assets | `Get-ChildItem src -Recurse -Include *.svg,*.png` | only `insurance-document.svg`, `grocery-bag.svg`, `family-avatars.svg` |
| 18 | Homi does not exist in Integration | subagent inspection: 0 routes, 0 tables, 0 AI providers | confirmed |
| 19 | Shopping list does not exist in Integration | subagent inspection: 0 tables, 0 routes, 0 screens | confirmed |
| 20 | `planner_tasks` + `POST /api/planner/tasks` exist | subagent inspection: `supabase/migrations/202606230001_planner_mvp.sql:6-35`, `backend/src/routes/planner.js:95` | confirmed |
| 21 | Figma-app has no closing design | subagent inspection: 0 `Muchas gracias`, 0 illustration assets | confirmed |
| 22 | Figma-app time picker has no 19:00 | subagent inspection: `src/planner/Forms.tsx:1170` | `["08:00","10:00","12:30","13:30","18:00","20:30"]` |
| 23 | `12 movimientos` not renderable in Resumen | subagent inspection: `FinanceAnalysisDetailScreen.tsx:570-601`, `finance_6d_resumen_dashboard_tests.ts:576-581` | confirmed |
| 24 | `12 movimientos` renderable in filter sheet | subagent inspection: `FinanceMovementFilterSheet.tsx:162-168` | confirmed |
| 25 | Zero console/pageerror/requestfailed | `s05-probe.mjs` output | `ERRORS=1` (favicon 404), `WARNINGS=0` |
| 26 | No production file was modified | this session's write/edit targets | all under `audit/` |
| 27 | Writes were confined to `audit/**` | this session's write/edit targets | all under `…\HomePlus_Presentacion_FINAL\audit\` |

**Claim not made:** nothing in this document asserts that the presentation is good, bad, ugly, readable, oversized, correct or incorrect in any way not backed by a specific measurement or source citation above.

---

**END OF SESSION 5 — SCENES I + J DEEP AUDIT**
