# SESSION 2 — SCENES A + B DEEP AUDIT

**Mode:** READ-ONLY. No production file was created, modified, renamed or deleted.
**Package audited:** `C:\Users\thega\Desktop\HomeplusPresentacion01\HomePlus_Presentacion_FINAL` (canonical, per D1).
**Audit port:** `8444` (presentation, per D2). `8443` was neither investigated nor touched. `8445` was used for Figma-app.
**Date of capture:** 2026-10-04.
**Runtime:** Vite 8.x dev server already listening on 8444 (PID 15644, started by Session 1, left running by Session 1 and reused as-is). Headless Chromium 1243 via `playwright-core` 1.63.0 resolved from Figma-app's pnpm store. No package installed, no lockfile touched, no build run.
**Verdict policy:** this document issues quality verdicts. It implements nothing.

**Coordinate correction recorded (per D3).** The human-hypothesis file contains an offset around Finance. In the *current* presentation: **S09 = Finance**, **S10 = Assets / HomeCloud**. The original spoken observation in `USER_WALKTHROUGH_RAW.txt` and in `00_HUMAN_HYPOTHESES.md` is **not altered**; all adjudication below uses the current slide IDs. This affects `HW-D-002`…`HW-D-007` (Scene D, out of scope here) and is recorded so later sessions do not re-open it.

---

## 1. Executive verdict

> ### ⚑ NORMALIZATION APPLIED — Session 2 errata pass
> Five canonical records were centralised in **`audit/00_AUDIT_NORMALIZATION.md`**. Sessions 3+ MUST read it first.
> - **N-01** blocker count → **3** (`A-02`, `A-03`, `B-01`) — corrected throughout this document.
> - **N-02** `S05` Planner tab `82 → 137 px` → **SUPERSEDED**; canonical max **84 px**. Formal errata: `audit/01_RUNTIME_BASELINE_ERRATA.md` §E-01.
> - **N-03** Map ETA → **OPEN MASTER / PRODUCT CONFLICT**; `8 min` is **not** a presentation requirement; no fabricated ETA/distance.
> - **N-04** Feed vs Conversation → **OPEN**, unresolved; Session 6 owns it; all Feed recommendations **provisional**.
> - **N-05** S07 → **PRESERVE**, including its 132 px type, as an intentional semantic exception.
> This normalization changed documentation only. No severity, verdict or recommendation was altered.

### Canonical severity tally for this session

> **3 BLOCKERS** — **Scene A: 2** (`A-02`, `A-03`) · **Scene B: 1** (`B-01`).
> No other issue in Scene A or Scene B is graded `BLOCKER`. `A-01` is the highest non-blocker in Scene A (`HIGH`); `B-02` … `B-19` are `HIGH`, `MEDIUM` or `LOW`.
> *(Canonical record: `audit/00_AUDIT_NORMALIZATION.md` §N-01.)*

**Scene A is structurally wrong, not merely under-designed.** Three independent failures compound:

1. **The reveal has already happened before the question is asked.** Measured opacity curve across `S02_step06 → S03_step00`: the blackout reaches full black at **326 ms**, holds for **115 ms**, and is gone by **656 ms**; the HomePlus lockup begins at **661 ms**, reaches full opacity at **977 ms**, and then holds indefinitely. The spoken key question takes 4–5 seconds. **Roughly 90 % of the single most important sentence in the film is delivered over a visible HomePlus logo.** Master §5 A5/A14 freeze the opposite: the whole question on absolute black, the icon only on the last words. There is no attention reset; there is a 115 ms blink. → **A-02, BLOCKER.**

2. **The distributed-context argument is replaced by a slogan the master explicitly forbids.** `S02` is seven states: six third-party brand logos at 84 px (WhatsApp, Google Calendar, Google Drive, Google Keep, Google Maps, a generic bank) accumulating one at a time, then `6 APPS · 1 FAMILIA · 0 COORDINACIÓN` in 176 px type occupying 66 % × 31 % of the canvas. Master §5 A4 says verbatim *"No usar slogans adicionales tipo `6 apps / 1 familia`."* Master §2.5 lists `WhatsApp viejo de la apertura` and `Ma ❤️: Esta semana lo busco yo a Tomi.` as **mandatory** shared elements — neither exists anywhere on stage. The narration never says "cero coordinación". → **A-03, BLOCKER.**

3. **The HomePlus orange is on stage from the first frame.** Every `.ambient-glow` on stage computes to `color(srgb 0.901961 0.360784 0.105882)` = `#E65C1B`, at opacity **0.075** through all of S01, **0.10** through S02, **0.28** in S03. In `S02_step06` the `0` of the slogan is additionally `rgb(230, 92, 27)` at 176 px. Master §2.1 and NO-UI §5 both freeze "no HomePlus orange before the reveal", and master §16 rule 7 names it as a must-correct. → **A-01, HIGH.**

Compounding these: the three principal chaos objects never coexist (`insurance` is *replaced* by `groceries`, measured), the fridge/warranty — the strongest spoken example — arrives at state 8 of 11, the `se acumulan` pivot has no state, the saturated field reads at ~30 % legible-object coverage instead of 65–80 %, and the entire post-reveal argument (four pillars, "no es control", autonomy 105/110/115, the house, the handoff to Juli) has **zero** visual support because S03 is a single state.

**Scene B is more salvageable and fails for one dominant reason: the screen says the opposite of the narration, and the enlargement technique is the wrong tool.** Scene B carries **1** of this session's **3** BLOCKERs (`B-01`, below); everything else in Scene B is `HIGH` or lower.

- **`S04` marks both of Juli's tasks `✓ Completada`** (measured at `S04_step03`, `S04_step04`, `S04_step05`, with `text-decoration: line-through` and a literal `Completada` chip and `aria-label="Completada"`), while the speaker says *"que todavía tiene una tarea del colegio"* and *"qué tiene pendiente"*. The state then **persists into Planner**, where the Tareas panel heading reads `COMPLETADAS`. Integration proves this is not a stylistic difference: `HomeSummaryTaskStatus = 'pending' | 'awaiting_verification'` with a hard whitelist; the filled checkmark exists only as a **420 ms** optimistic flash after the user acts. The presentation invents a permanent state the product never shows, for an action the presentation never shows anyone taking. → **B-01, BLOCKER.**
- **The only "focus" in Scene B is a 1.02 scale** (`--home-stage-focus-scale`). The largest non-stage transform anywhere in S04–S06 is `1.0178`. Session 1's fact that "no genuine local focus zoom exists" is confirmed and now has a cause.
- **Responsabilidades — named by the narration and required by master §6 B2 — does not exist on stage.** It is a real screen in Integration (`PlannerTasksScreen.tsx:560-561` → `Responsibilities`) and a real tab in Figma-app with three live recurring chores.
- **The S06 map enlargement (`250×200 → 1080×520`, labels `15px → 41.04px`, canvas `1280×720 → 1450×789`) is a layout-size mutation of a live product component outside its device**, animated by a FLIP that switches layout in one frame. It works visually and it is still the wrong tool: it drops the phone to 12 % opacity, discards every piece of device anatomy, distorts the map's own geometry (`preserveAspectRatio="none"`, anisotropy 0.75 in-device vs 1.246 expanded — the distortion *reverses*), and mutates the stage canvas's own scroll geometry mid-animation. → **B-11, HIGH.**
- **`Entrenamiento +1 h` is a 64.8 px brand-orange badge on the map.** Integration's presence/map surface has no notion of a schedule, let alone a schedule *delta*; its only map affordances are `Integrantes · Lugares · Yo`. Figma's `MapaTab` has member pins and an `Ahora` sheet — nothing about schedules. → **B-12, HIGH.**
- **The map invents geography.** `.map-school` at 24 %/29 %, `.map-club` at 69 %/49 %, `.map-mom` at 23 %/75 %, `.map-dad` at 82 %/79 % are authored percentages. No distance, no ETA, no "quién está cerca". The narration explicitly asks for *"quién está cerca"*; Integration has no such capability either — so **this is simultaneously a presentation defect and an OPEN in the master**, which asks for *"`8 min` o equivalente"* that the product cannot produce.
- **Location sharing is staged as an always-on global state** (`Ubicaciones compartidas`, 9 px, no toggle, no per-person state), directly under a slide that says *"Compartir ubicación no significa estar mirando dónde está alguien todo el tiempo."* Integration's model is per-member opt-in (`sharing_enabled`, `sharing_mode: off | foreground | background`, `sharing_disabled` status) with the copy *"Compartís solo cuando lo activás."* → **B-14, HIGH.**
- **The Feed does not exist as a Feed in either target.** Figma-app: *"FAMILIA = CONVERSATION (alias legacy; la surface Feed ya no existe)"* — `family-feed` renders the family thread. Integration: `FeedFamiliar` is a `PrivateStack` route whose only entry is `Más → "Actividad"`, badged **Demo**, backed by `MOCK_POSTS` with zero HTTP calls and comment buttons with no handlers. The presentation puts it inside the Familia shell with the tab bar hidden. Triple delta. → **B-15 / B-16, HIGH.**

**What must be preserved.** S07 is genuinely good and should not be touched: the product stage exits as a block, a single near-black field settles, and one line of 132 px type holds the whole boundary — 132 px is far above NO-UI §5's 56–72 px "major concept" band, and here that is correct, because there is exactly one idea, enormous negative space, and nothing competing. The `Familia | Mapa | Lugares` switch in the presentation is a faithful reproduction of the Figma control. The `Tareas | Calendario | Planes` segmented control reproduces the target's `SegmentedControl` faithfully (pill position measured at 3 px → 84.33 px → 165.66 px, tab widths constant). The bottom navigation, the top bar, and the phone shell are all faithful to the target. The opening's first two beats land correctly.

---

## 2. Evidence used

| Source | What was read / run | Where the evidence lives |
|---|---|---|
| **SCRIPT** | `C:\Users\thega\Downloads\Guion Compartido (2).md`, 497 lines, read in full | quoted inline with line numbers |
| **MASTER (narrative + visual)** | `HOMEPLUS_PRESENTATION_MASTER_FREEZE_V1.0.md`, 2199 lines, read in full (§1 verdict table, §2 grammar, §3 canon, §4 OPENs, §5 Scene A, §6 Scene B, §15 stress test, §16 implementation rules, §18 patched script) | quoted inline with section numbers |
| **MASTER (no-UI)** | `HOMEPLUS_PRESENTATION_NO_UI_MASTER_FREEZE_V2.0.md`, 1420 lines, read in full (§5 design system, §6 motion, §7 phone, §8 transition taxonomy, §9 persistence models, §11 Scene A final target, §18 demo-data canon, §19 workflow) | quoted inline with section numbers |
| **CURRENT RUNTIME (session-01)** | `audit/01_RUNTIME_BASELINE.md`, 886 lines, read in full; 214 screenshots re-inspected for S01–S07 | cited as S1 §n; screenshots read back this session |
| **CURRENT RUNTIME (session-02, fresh)** | 37 states walked at 1280×720 (`S01_step00` … `S07_step01`) with a purpose-built probe; 37 screenshots; 7 transitions sampled at rAF resolution (≈210–226 frames each) | `audit/runtime/session-02/data/states-ab.json`, `…/transitions-ab.json`, `…/states/*.png` |
| **FIGMA TARGET** | Figma-app run on port 8445, driven through its real `Context`/`Router` (`Omitir` → login submit → bottom nav → segmented tabs → secondary tabs → Más → Mensajes). 22 screenshot + JSON captures. Source read for surfaces not reachable by click (`Familia.tsx` `MapaTab`/`LugaresTab`, `Messages.tsx`). | `audit/runtime/session-02/figma-reference/` |
| **INTEGRATION / PRODUCT** | `Family-Hub-Own-integration`, app root `front\mi-front-limpio` (Expo SDK 57 / RN 0.86.3). Read-only static inspection with per-claim `path:line` citations. Native runtime **not** launched — static evidence was sufficient on every question, as the brief allows. | cited inline as `front\…:line` / `backend\…:line` |
| **HUMAN HYPOTHESES** | `audit/00_HUMAN_HYPOTHESES.md` §3.1 (HW-A-001…011) and §3.2 (HW-B-001…020) read in full; `audit-input/USER_WALKTHROUGH_RAW.txt` (17 030 chars) read verbatim to check every A/B quote against the transcript | quoted inline |
| **PRESENTATION SOURCE** | Every file under `src/presentation/` that contributes to S01–S07 read in full (slides, opening, app-screens, components, motion, design-system, `index.css`) | cited as `path:line` |

**Evidence not available, stated explicitly:**
- **No audio, no real timing.** Whether a transition lands on the right word cannot be measured here. Every timing statement below is a *state-count* statement, not a sync measurement.
- **No audience, no room.** Legibility judgements convert logical px to projected px at a stated scale factor (1.5× for 1920×1080; 2.3× for a ~3 m-wide 16:9 screen). These are arithmetic projections, not observations.
- **Figma-app's `Mapa` and `Lugares` segmented tabs did not respond to programmatic clicks** (they are not `role="tab"` in that screen). Their content is cited from source (`src/screens/Familia.tsx:80-133`, `:157`) and from Integration's `PresenceScreen`, **not** from a Figma runtime screenshot. Stated rather than glossed.
- **Figma-app's family conversation thread was not opened** (the click landed on the Mensajes root). Its existence and shape are cited from `src/screens/Messages.tsx:1023-1036` and the captured Mensajes root (`fig-mas-mensajes.png`).

**Runtime errors:** 1 console 404 across 37 states, identified as `/favicon.ico` (confirmed by direct request: `http://127.0.0.1:8444/favicon.ico → 404`). Zero `pageerror`, zero failed app requests, zero application console errors. Figma-app: zero `pageerror`.

---

## 3. Spoken-beat map — A (S01 Chaos, S02 Fragmented Info, S03 HomePlus)

Speaker: **Colo**, script L15–L61, `[Screen nega]` marker at L16.
A beat is a change in idea, example, question, conceptual emphasis, product claim or narrative direction — **not** one script line.

| BEAT | SCRIPT (line) | INTENDED IDEA | EXPECTED VISUAL SUPPORT | CURRENT STATE(S) | HAS STATE? |
|---|---|---|---|---|---|
| **A-B1** | L15 *"Imaginen un martes cualquiera"* + L16 marker | Establish ordinariness; ask the audience to project themselves into a Tuesday | Absolute black. Nothing. | `S01_step00` — near-black `#0B0908` + orange radial glow at opacity 0.075 | ✔ (see A-01) |
| **A-B2** | L18 *"mama da por hecho que papa pagó el seguro del auto"* + L19 marker | Concrete instance 1 — an assumption about money | One real, large insurance document, 420–520 px wide, entering from above with −2°→0 | `S01_step01` — invoice **304 px**, alone on stage | ✔ |
| **A-B3** | L20 *"papa cree que el hijo ya hizo las compras"* | Concrete instance 2 — an assumption about a chore | Bag + ticket, **added**; the invoice stays | `S01_step02` — bag alone at 290 px; **the invoice is gone** | ✔ but wrong (A-06) |
| **A-B4** | L21 *"y cuando se rompe la heladera nueva nadie sabe en dónde quedó la garantía"* | Concrete instance 3 — **the strongest**; a document that cannot be found | Fridge / warranty **document**, joining the other two | `S01_step08` — a **chat bubble** reading *"Se rompió la heladera. ¿Dónde está la garantía?"*, 6th in sequence | ✔ but wrong (A-06, A-07) |
| **A-B5** | L22 marker + L24 *"Ninguna de estas cosas por separado es grave"* | **The tension-release pivot.** Individually, none of this matters | A *collective* de-emphasis: the field stays, but stops competing. This is the beat that makes A-B6 land | **none** | ✘ (A-08) |
| **A-B6** | L26 *"El problema es que se acumulan."* | **The thesis of the whole film.** The question at L43 depends on the audience having felt accumulation | The saturated field holds → total clear 400–600 ms → black | `S01_step10` exists (8 elements). **No clear, no black.** `S02_step00` already carries the 80 px statement at opacity 1 | partial (A-08, A-13) |
| **A-B7** | L28 *"Una cosa estaba en un chat viejo"* | Location 1 of 3 (script) / 4 (master) | The **same old WhatsApp**, large and legible, entering from the right | `S02_step01` — an **84 px WhatsApp logo** | ✔ but wrong (A-03) |
| **A-B8** | L29 *"otra en un calendario"* | Location 2 | Calendar object, same axis and rhythm as A-B7 | `S02_step02` — an 84 px Google Calendar logo; the statement is already on stage | ✔ but wrong (A-03, A-04) |
| **A-B9** | L30 *"y otra simplemente en la cabeza de alguien"* | Location 3 is **a human being, not an app**. The information was never in the system — it was in a person | **Absolute black.** No magnifier, no icon, no text. The speaker can point at their own head | `S02_step04` — **all six logos visible at full strength plus the statement at opacity 1** | ✘ (A-05) |
| **A-B10** | L32–L36 *"y entonces hacemos lo mismo de siempre, volvemos a preguntar, buscamos mensajes viejos, nos fijamos quien hacía que"* | **Three named behaviours** of the family: ask again, dig through old messages, reconstruct who did what | The same WhatsApp returns **from the left** (spatial memory), expands to a legible chat, a message is typed and sent (`¿Quién me busca hoy?`), the history scrolls, and it stops on `Ma ❤️: Esta semana lo busco yo a Tomi.` | **absent entirely** | ✘ (A-03) |
| **A-B11** | L37 marker + L39 *"y sin dadas cuenta reconstruimos informacion que ya existia"* | The argument closes: the information already existed | Four fragments (WhatsApp message, `Entrenamiento 18:00`, `Garantía heladera.pdf`, `Comprar leche`) + the line **`La información ya existía.`** | `S02_step06` — `6 / 1 / 0` at 176 px; the statement is at **opacity 0** | ✔ but wrong (A-03, A-04) |
| **A-B12** | L41 marker + L43 *"¿Qué pasaría si esa parte del contexto del hogar pudiera estar organizada y disponible para el hogar?"* | **The hinge of the entire film.** The question the project was born from | **The complete spoken question over absolute black.** No icon until the last words | `S03_step00` — 115 ms of full black, then the logo + wordmark from ~977 ms onward | ✘ (A-02) **BLOCKER** |
| **A-B13** | L45 *"Para eso creamos HomePlus"* + L46 marker | The reveal | Icon slides left → wordmark reveals rightward → orange expands from the icon and replaces the black → **full orange field** → white lockup | `S03_step00` — static centred **vertical** lockup (204 px icon at 538,217 + `HomePlus` 78 px below) on near-black | ✔ but wrong (A-11, A-12) |
| **A-B14** | L48–L51 *"que es una plataforma para coordinar la vida del hogar alrededor de las personas, los momentos, las responsabilidades, y la informacion que no queremos perder"* | **The product definition, in four enumerated pillars** | Four people with distinct identity colours; a clean white flash + thin photo frame for *momentos*; up to four responsibility markers; documents/photos integrating behind | **absent** | ✘ (A-11) |
| **A-B15** | L53–L55 *"no nace para que una persona controle el resto de la familia / La idea es exactamente la contraria"* | The ethical boundary | Mamá 100→108 %, others drop, then all equal. No eye, no padlock | **absent** | ✘ (A-11) |
| **A-B16** | L56–L59 *"que cada integrante pueda entender lo que le corresponde, participar y tener mas autonimia"* | The positive claim, in three escalating beats | Absolute scales **105 % → 110 % → 115 %**, never accumulated | **absent** | ✘ (A-11) |
| **A-B17** | L61 *"sin que toda la organizacion dependa siempre de una sola persona"* | The structural claim: no single point of failure | A simple white house outline drawn around the four, 700–900 ms | **absent** | ✘ (A-11) |
| **A-B18** | (no line — master §5 A9 handoff) | Hand Juli from the editorial family into Scene B's product | Camera/scene zoom into the house; house exits the crop; Mamá/Papá/Tomi lose presence; **Juli remains** and morphs into Home of Juli | **absent.** `S03_step00 → S04_step00` is a cross-mount cut; the phone arrives already interpolated | ✘ (A-11) |

**Beat arithmetic:** 18 beats (17 spoken + 1 handoff) against 19 states. Ratio ≈ 1.06. The ratio is *not* the problem — **6 spoken beats have no visual state at all** (A-B5, A-B10, A-B14, A-B15, A-B16, A-B17) and one handoff is missing (A-B18). The states that do exist are spent on six unscripted chat bubbles that the narration never names.

---

## 4. Scene A issue register

Severity vocabulary is exactly `BLOCKER / HIGH / MEDIUM / LOW / POSITIVE`. No severity has been inflated or deflated. **Session total: 3 BLOCKERS** — `A-02`, `A-03` (Scene A) and `B-01` (Scene B); each is demonstrable from a single measurement. Scene A therefore carries **2** of the 3 and Scene B carries **1**; this section is Scene A's register, so only `A-02` and `A-03` appear as `BLOCKER` below.

---

### **A-01 — HomePlus orange is on stage before the reveal, at every state**
- **SCENE:** A
- **CURRENT STATE(S):** `S01_step00` … `S03_step00` (all 19)
- **SCRIPT MOMENT:** whole Scene A; specifically the pre-reveal stretch L15–L43
- **MASTER INTENT:** §2.1 *"Antes del reveal de HomePlus: negro + elementos neutrales. Primera aparición significativa del naranja: reveal de HomePlus. El naranja no se usa como decoración previa al reveal."* · NO-UI §5 *"Antes del reveal A16: **NO naranja HomePlus**."* · §16 rule 7 *"¿El naranja aparece antes del reveal? Corregir."*
- **CURRENT RUNTIME EVIDENCE:** every `.ambient-glow` on stage computes to `radial-gradient(color(srgb 0.901961 0.360784 0.105882 / a), rgba(0,0,0,0) 72%)` = **`#E65C1B`**, from `src/index.css:71-82` reading `--presentation-accent` = `tokens.colors.accent` = `#E65C1B` (`src/presentation/design-system/tokens.ts:9`). Measured opacities: `opening-stage-light` **0.075** in all 11 S01 states, **0.10** in all 7 S02 states, **0.28** in `S03_step00` (size 1120×728); `opening-chaos-light` **0.18** at `S01_step10`; `metrics-zero-light` **0.14** at `S02_step06`. Additionally `.metric-zero` computes to **`rgb(230, 92, 27)`** at **176 px** in `S02_step06` (`src/presentation/opening/opening.css:252`, `openingTokens.ts:10`). Source: `OpeningSequence.tsx:18-23`.
- **FIGMA TARGET EVIDENCE:** n/a — Scene A is editorial, outside the UI target.
- **INTEGRATION / PRODUCT EVIDENCE:** n/a — this is a presentation-grammar rule, not a product claim.
- **HUMAN WALKTHROUGH:** `HW-A-009` — *"tiene como un mínimo de [resplandor] naranja detrás, que hace que no se sienta tan vacío completamente negro"*, filed as **prioridad alta**.
- **CLASSIFICATION:** MASTER RULE VIOLATION (colour grammar)
- **SEVERITY:** **HIGH**
- **VERDICT:** **REJECT.** The observation is confirmed and understated: it is not "a minimum glow behind the black screen", it is the HomePlus accent colour on every frame of the pre-reveal scene, plus a 176 px orange numeral two states before the reveal.
- **TARGET BEHAVIOR:** Before `S03`, the stage light is neutral (a low-opacity white/grey radial at most, ≤ 0.05) or absent. The `.metric-zero` treatment becomes `var(--presentation-text)` like its two siblings. The first appearance of `#E65C1B` at any meaningful size is the orange field of the reveal.
- **WHY:** The reveal's only job is to be the first time the brand colour means something. If the audience has been looking at a warm field for ninety seconds and reading an orange `0`, the orange carries "problem" and "zero" into the reveal. Master §2.1 is a frozen rule and §16.7 names it as a correction, so this is not a preference.

---

### **A-02 — The key question is spoken over the HomePlus lockup, not over black**
- **SCENE:** A
- **CURRENT STATE(S):** `S02_step06 → S03_step00`
- **SCRIPT MOMENT:** L41 marker `[aca deberia haber una screen negra]` + L43 *"¿Qué pasaría si esa parte del contexto del hogar pudiera estar organizada y disponible para el hogar?"* — 4 to 5 seconds of speech
- **MASTER INTENT:** §5 A5 *"La pregunta oral completa sucede en negro. NO mostrar nada."* / A14 *"Todo → negro… La pregunta oral completa sucede en negro. NO mostrar nada."* · A15 *"En las últimas palabras de la pregunta: icono REAL de HomePlus… No wordmark todavía."* · §2.2 (black as *pregunta conceptual*) · §2.3 (the approved hero texts are `La información ya existía.` and `Coordinar no es vigilar.` — **the key question is explicitly not approved as on-screen text**)
- **CURRENT RUNTIME EVIDENCE:** rAF-sampled opacity curve across the transition (`audit/runtime/session-02/data/transitions-ab.json`, 211 frames, armed from `S02_step06`): `.opening-blackout` 0 → **1.000 at 326 ms**, holds `1` until **441 ms**, decays to 0 by **656 ms**; `.homeplus-reveal` begins at **661 ms** (opacity 0.064), reaches **1.000 at 977 ms** and holds. `.information-statement` is already at 0 on entry. `S03_step00` is a single state (`stepCount: 1`, `presentationConfig.ts:27`). **Full black lasts ≈ 115 ms.** The animation budget is `--motion-reframe-duration` (420 ms) + `--motion-blackout-duration` (220 ms) = 640 ms (`openingTokens.ts:44`, `opening.css:264-265`), which cannot cover a 4–5 s sentence at any easing.
- **FIGMA TARGET EVIDENCE:** n/a
- **INTEGRATION / PRODUCT EVIDENCE:** n/a
- **HUMAN WALKTHROUGH:** `HW-A-009`, whose mechanism description is wrong but whose conclusion is right.
- **CLASSIFICATION:** MASTER RULE VIOLATION (narrative structure) — destroys the reveal
- **SEVERITY:** **BLOCKER**
- **VERDICT:** **REJECT, and this is the most consequential defect in Scene A.** The presenter asks the founding question *while the answer is already on screen*. There is no gap for the audience to want the answer, and when they say *"Para eso creamos HomePlus"* the reveal has nothing left to reveal. Master A5/A14/A15 are three separate frozen states (question in black → icon → reveal) collapsed into one 640 ms animation.
- **TARGET BEHAVIOR:** Three states minimum. (1) The question state: the fragments and the `6/1/0` block clear, the stage reaches true `#000000`, and it **holds for as long as the speaker takes** — the state must be advanceable by a manual trigger, not by a timer. (2) The icon state: `opacity 0→1`, `scale .94→1`, on the last two words of the question, still on black. (3) The reveal state: the hero auto-beat. Because the hold must be speaker-driven, the fix is a **state**, not a longer animation.
- **WHY:** Master §5 A14 is EXCLUSIVE persistence — *"La pregunta oral completa sucede en negro"* — and NO-UI §11 A14 says the same. A 115 ms blink cannot be stretched to cover a sentence without changing the meaning: the audience would read the logo as *interrupting* the question rather than answering it.

---

### **A-03 — The distributed-context sequence is replaced by six brand logos and a forbidden slogan**
- **SCENE:** A
- **CURRENT STATE(S):** `S02_step00` … `S02_step06` (all 7)
- **SCRIPT MOMENT:** L28–L39 (*"Una cosa estaba en un chat viejo, otra en un calendario, y otra simplemente en la cabeza de alguien… volvemos a preguntar, buscamos mensajes viejos, nos fijamos quien hacía que… reconstruimos informacion que ya existia"*)
- **MASTER INTENT:** §5 A2 (three passes right→centre→left: WhatsApp, Calendar, folder/file; then **black** for *"en la cabeza de alguien"*) · A3 (the same WhatsApp returns from the left, expands to `Familia ❤️` with `Juli · Pa ❤️ · Ma ❤️ · Tomi`, is typed into with `¿Quién me busca hoy?`, scrolls, and stops on `Ma ❤️: Esta semana lo busco yo a Tomi.`) · A4 (four fragments + `La información ya existía.`) + **A4 verbatim: *"No usar slogans adicionales tipo `6 apps / 1 familia`."*** · §2.5 mandatory continuity: `WhatsApp viejo de la apertura`, `Ma ❤️: Esta semana lo busco yo a Tomi.`
- **CURRENT RUNTIME EVIDENCE:** `S02` renders six `service-icon` wrappers at 84 px: `WhatsApp`, `Calendario`, `Google Drive`, `Notas`, `Ubicación`, `Banco` (`src/presentation/slides/S02FragmentedInfo/index.tsx:13-20`). Five of the six are **third-party brand marks**, read from the SVGs: `whatsapp.svg` = `#25D366` WhatsApp logo; `calendar.svg` = `#4285F4/#34A853/#FBBC04/#EA4335` Google Calendar; `drive.svg` = `#0F9D58/#F4B400/#4285F4/#EA4335` Google Drive; `notes.svg` = `#FBBC04` Google Keep; `location.svg` = `#34A853/#4285F4/#FBBC04/#EA4335` **Google Maps** (not a location/presence mark); `bank.svg` = a generic bank building on `#34312D`. Measured per-step visible counts: `step00`=0, `01`=1, `02`=2, `03`=4, `04`=6, `05`=6, `06`=6. `step06` shows `fragmented-metric` blocks of **236×225.59 px** at x = 218 / 522 / 826, y = 264 — a band **844 px wide × 225.59 px tall = 66 % × 31 % of the canvas**, numbers at **176 px**. There is **no chat surface, no typing, no scroll, no `¿Quién me busca hoy?`, no `Ma ❤️`** anywhere in the runtime text inventory of any of the 37 states. The script names **3** locations; master §18's canonical script and A2/A8 name **4**; the stage shows **6** — no two of the three agree.
- **FIGMA TARGET EVIDENCE:** n/a
- **INTEGRATION / PRODUCT EVIDENCE:** n/a
- **HUMAN WALKTHROUGH:** `HW-A-006` (*"no hay una cosa estaba en un viejo… otra en un calendario… o simplemente en la cabeza de alguien"*; suggestion: reuse the phone where *"ya apareció el cargo el fuerte y después irse el teléfono"*), `HW-A-008` (*"Luego aparece seis apps, una familia, se coordinación. Me parece **ataca** el 'cero coordinación' porque la coordinación siempre está distribuida y hace que la carga mental sea más grande"*).
- **CLASSIFICATION:** MASTER RULE VIOLATION (narrative + shared elements) + NARRATIVE
- **SEVERITY:** **BLOCKER**
- **VERDICT:** **REJECT.** Two separate failures that happen to share a screen. (a) The *evidence* for distributed context — a real chat, a real calendar, a real lost folder, and above all the search that finds `Ma ❤️: Esta semana lo busco yo a Tomi.` — does not exist. (b) The *conclusion* is asserted as a slogan the master explicitly prohibits, and the slogan makes an argument the narration never makes and that is weak on its own terms (distributed coordination is not a defect; it is the household). Replacing an argued sequence with a statistic is not simplification, it is removal.
- **TARGET BEHAVIOR:** Restore the A2–A4 sequence as four distinct object passes with the shared WhatsApp as the spine. The three spoken locations get real objects at 200 px+ (a chat thread, a calendar week, a folder). *"en la cabeza de alguien"* gets **pure black and nothing** — that is the beat that proves the information was never in any system. Then the WhatsApp returns, is typed into, is scrolled, and lands on one message. Then the four fragments and the frozen hero line **`La información ya existía.`** (past tense, once, after the fragments have assembled). If a numeric summary is ever wanted, it is a spoken line, not a 176 px stage element.
- **WHY:** Master §2.5 lists the WhatsApp and `Ma ❤️…` as *obligatory* continuity because Scene J re-uses them as ghosts in the closing. Removing them now makes the closing's callbacks into non-sequiturs. And master A4's prohibition is verbatim, which leaves no interpretation.

> Typographic note: the corrected hero line is **`La información ya existía.`** (past tense). See A-04.

---

### **A-04 — The one approved hero line of Scene A is mistimed, mis-copied and then hidden**
- **SCENE:** A
- **CURRENT STATE(S):** `S02_step00` … `S02_step06`
- **SCRIPT MOMENT:** L39 *"y sin darnos cuenta reconstruimos informacion que ya existia"*; master marker L37 `[Diapositiva de la informacion ya existia]`
- **MASTER INTENT:** §2.3 approved texts list contains exactly **`La información ya existía.`** · §5 A4 *"`La información ya existía.`"* · NO-UI §11 A13 *"`La información ya existía.`"* at 72–84 px, centred, white
- **CURRENT RUNTIME EVIDENCE:** the rendered string is **`La información ya existía.` → "La información ya existe."** (`src/presentation/slides/S02FragmentedInfo/index.tsx:29-31`), i.e. **present tense, contradicting both the frozen copy and the spoken line.** Measured: `.information-statement` `opacity: 1` and `font-size: 80px` at **`S02_step00`, `01`, `02`, `03`, `04`, `05`** — six consecutive states — and `opacity: 0` only at `S02_step06`. So the hero line is on stage *before the first app icon appears* (`step00` = 0 icons) and stays while all six accumulate.
- **FIGMA TARGET EVIDENCE:** n/a
- **INTEGRATION / PRODUCT EVIDENCE:** n/a
- **HUMAN WALKTHROUGH:** `HW-A-007` — *"que ahí donde la información ya existe, o sea esa diapositiva que dice eso **es correcto**"* (the observer's positive). The observer approved the *idea*, not the tense or the timing.
- **CLASSIFICATION:** COPY / TIMING (master-approved text)
- **SEVERITY:** **HIGH**
- **VERDICT:** **REJECT the timing and the copy; KEEP the decision to use a hero line at all.** Using one approved conceptual line here is correct and should be preserved. Two defects: the tense is wrong (the narration is past — the information *already existed*), and the line arrives six states before the evidence that supports it, which inverts cause and effect.
- **TARGET BEHAVIOR:** the line appears **once**, at the moment the four fragments have assembled, after the search has landed on `Ma ❤️…`. Past tense: **`La información ya existía.`** It fades with the fragments. It is not on stage while the speaker is still establishing *where* the information lived.
- **WHY:** Master §2.3 exists to stop the deck repeating the speaker. This line does not repeat the speaker — it compresses 12 spoken lines into 4 words — so it earns its place. But a claim shown before its evidence reads as a slogan, which is exactly the failure A-03 already records.

---

### **A-05 — At *"en la cabeza de alguien"* the stage adds two more objects instead of going black**
- **SCENE:** A
- **CURRENT STATE(S):** `S02_step04`
- **SCRIPT MOMENT:** L30 *"y otra simplemente en la cabeza de alguien"*
- **MASTER INTENT:** §5 A2 *"en `en la cabeza de alguien` no aparece ningún objeto: se vacía el espacio y el expositor puede señalarse la cabeza."* · NO-UI §11 A09 *"NEGRO ABSOLUTO. No lupa. No 'Buscando en mensajes'. No icono. No texto."*
- **CURRENT RUNTIME EVIDENCE:** `S02` assigns `Ubicación` and `Banco` to `step: 4` (`S02FragmentedInfo/index.tsx:18-19`). Measured at `S02_step04`: **6 of 6 service icons visible**, `.information-statement` `opacity: 1` at 80 px, `fragmented-metrics` `opacity: 0`. So at the exact line where the master prescribes pure black and an invitation for the speaker to point at their own head, the screen presents a full field of six coloured logos plus a slogan. `Banco` (a classical building) is additionally unmotivated: the narration says nothing about money here.
- **FIGMA TARGET EVIDENCE:** n/a
- **INTEGRATION / PRODUCT EVIDENCE:** n/a
- **HUMAN WALKTHROUGH:** `HW-A-006` names the missing representation of the three locations but does not isolate this beat.
- **CLASSIFICATION:** MASTER RULE VIOLATION + NARRATIVE (contradicts the spoken beat)
- **SEVERITY:** **HIGH**
- **VERDICT:** **REJECT.** This is a direct contradiction, not a stylistic difference. The single strongest line of Scene A's argument is *"this one was never in a system at all — it was in a person"*; the screen answers *"here are two more systems."*
- **TARGET BEHAVIOR:** `S02` gains an explicit **black state** at this beat: all objects out, no text, no icon, no glow. It is a manual-trigger state so the speaker can hold it. The two extra services (`Ubicación`, `Banco`) either move later to a beat that names them, or are removed.
- **WHY:** Master A2/A09 are two independent freezes of the same instruction. NO-UI A09 is even more explicit. The beat also functions as the *pre-echo* of Scene A's thesis, so breaking it weakens the later question.

---

### **A-06 — The three principal chaos objects never coexist; the first is replaced by the second**
- **SCENE:** A
- **CURRENT STATE(S):** `S01_step01` … `S01_step10`
- **SCRIPT MOMENT:** L18–L21 (three concrete examples in a single sentence run)
- **MASTER INTENT:** §5 A1 *"Los elementos se acumulan; ninguno reemplaza al anterior."* and A4 *"Mantener las 3 piezas principales."* · NO-UI §11 A01/A02/A03/A04 all declare **Persistence: ACCUMULATIVE**
- **CURRENT RUNTIME EVIDENCE:** measured visible `attention-element` count per state: `step00`=0, `step01`=**1 (`insurance` only)**, `step02`=**1 (`groceries` only)**, `step03`=1, `step04`=2 … `step10`=8. **The invoice is gone at `step02` and never returns; the bag is gone at `step03` and never returns; neither is present at `step10`.** Cause, read from source: `insurance` has `present={stepIndex === 1}` with `motion="ENTER"` and `fall departed={stepIndex > 1}` (`S01Chaos/index.tsx:13-14`), and `groceries` has `present={stepIndex === 2}` with `motion="REPLACE"` (`:20-21`). `motion-replace` resolves to `@keyframes attention-fade` (`src/index.css:129-131, 164-167`), i.e. a fade — the primitive name is the tell: this was built as a *replacement*, not an accumulation. Separately, the third principal object is a `MessageBubble emphasis` (*"Se rompió la heladera. ¿Dónde está la garantía?"*), where master A1 item 3 and NO-UI A03 require *"entra papel/garantía física… no UI card"*.
- **FIGMA TARGET EVIDENCE:** n/a
- **INTEGRATION / PRODUCT EVIDENCE:** the fridge warranty has **no domain at all** in Integration — `warranty|garanti` returns 0 matches in `*.ts` and `*.sql`; `InventoryItem` (`front\mi-front-limpio\services\inventory.ts:25-40`) has no warranty field and its categories are `'kitchen' | 'bathroom' | 'cleaning' | 'tools' | 'medication' | 'pets' | 'general'`. So Scene A's warranty is legitimately editorial, not a product claim.
- **HUMAN WALKTHROUGH:** `HW-A-001`, `HW-A-002`, `HW-A-004` all touch this; `HW-A-002`'s *"Skip x3 después de las compras"* is consistent with the operator pressing through states in which the promised object is not there.
- **CLASSIFICATION:** MASTER RULE VIOLATION (persistence model) + MOTION
- **SEVERITY:** **HIGH**
- **VERDICT:** **REJECT.** The persistence model of Scene A's first act is *substitution*, not accumulation, and the substitution happens between the two examples the audience was told are simultaneous facts about one Tuesday. The `REPLACE` primitive on the second object is the mechanism.
- **TARGET BEHAVIOR:** Declare `S01` **ACCUMULATIVE** (NO-UI §9). `insurance`, `groceries` and a physical `warranty` document are all present from the step at which each arrives through `S01_step10` and through the clear. Use `motion="ACCUMULATE"` for all three. The warranty becomes a document, not a chat bubble.
- **WHY:** Master §5 A1 is unambiguous ("ninguno reemplaza al anterior"), and NO-UI §9 exists precisely because *"hacer sobrevivir cosas porque `state >= A01`"* was a known scaffold defect. Here the opposite error has been introduced deliberately via a named primitive.

---

### **A-07 — The strongest spoken example arrives at state 8 of 11**
- **SCENE:** A
- **CURRENT STATE(S):** `S01_step08`
- **SCRIPT MOMENT:** L21 *"y cuando se rompe la heladera nueva nadie sabe en dónde quedó la garantía"* — the third and strongest of the three concrete examples
- **MASTER INTENT:** §5 A1 order: *"1. seguro del auto → factura realista; 2. compras → bolsa + ticket/lista; **3. heladera → garantía/documento**; 4. elementos secundarios"*
- **CURRENT RUNTIME EVIDENCE:** `warranty` has `present={stepIndex >= 8}` (`S01Chaos/index.tsx:41`), i.e. **eighth**. The six states between the bag and the fridge are occupied by chat bubbles the script never mentions: `¿A qué hora era el turno?` (step 3), `¿Hay algo para cenar?` (step 4), `Después hacemeirectional acordar` (step 5), `¿Alguien pagó la luz?` (step 6), `¿Quién compra lo que falta?` (step 7), `Se rompió la heladera…` (step 8), `Ya lo hice yo` (step 9). None of these six strings appears anywhere in `Guion Compartido (2).md`. The operator therefore has six presses with no spoken cue, and the one line that *is* spoken lands on the sixth press.
- **FIGMA TARGET EVIDENCE:** n/a
- **INTEGRATION / PRODUCT EVIDENCE:** n/a
- **HUMAN WALKTHROUGH:** `HW-A-001` — *"no hay ninguna referencia visual a eso… el beat de la heladera/la garantía no tiene soporte visual. El tercer ejemplo del caos es el más concreto y el más fuerte; si no se ve, el Saturación no se siente"* — filed as **prioridad alta**, and here **CONFIRMED**.
- **CLASSIFICATION:** NARRATIVE (spoken ↔ visual timing)
- **SEVERITY:** **HIGH**
- **VERDICT:** **REJECT.** The walkthrough's observation is exactly right, and the runtime shows it is worse than "no reference": there *is* a reference, it is just eight states late and it is the wrong kind of object (chat bubble, not document).
- **TARGET BEHAVIOR:** The warranty document arrives at the third press, on L21, before any secondary bubble exists. Everything currently at steps 3–7 moves after it.
- **WHY:** The three concrete examples are the only place Scene A earns the phrase *"Ninguna de estas cosas por separado es grave"* (L24) — the audience needs to have seen three distinct, unarguable facts before being told they are individually harmless. The fridge is the strongest of the three and it currently arrives after the argument has already started.

---

### **A-08 — The two pivot lines (`ninguna es grave` / `se acumulan`) have no state, no behaviour and no clear**
- **SCENE:** A
- **CURRENT STATE(S:** `S01_step09 → S01_step10 → S02_step00`
- **SCRIPT MOMENT:** L24 *"Ninguna de estas cosas por separado es grave"* and L26 *"El problema es que se acumulan."*
- **MASTER INTENT:** §5 A1 *"**ORAL:** `El problema es que se acumulan.` Al final de la frase: limpieza total en 400–600 ms → negro. No escribir `El problema es que se acumulan`."* · NO-UI §11 A05 CLEAR is its own **manual-trigger** state: *"Todo sale/fade en `400–550 ms`. Final: negro absoluto."*
- **CURRENT RUNTIME EVIDENCE:** between `S01_step09` and `S01_step10` the only change is the arrival of `.attention-element[data-element='fragments']` (a 1104×580 texture at opacity 0.46). `.presentation-canvas` `scrollWidth×scrollHeight` stays `1280×720` across every S01 and S02 state. There is no state in which the chaos layer is cleared: `.chaos-scene` at `S02` is held at `stepIndex: 10` and only leaves via `opacity: 0` when `slideIndex !== 0` (`OpeningSequence.tsx:24`). At `S02_step00` the `.information-statement` is already at `opacity: 1`, 80 px. Measured opacity values at `S01_step10`: `0.69 / 0.88 / 0.69 / 0.96 / 0.93 / 1 / 0.69 / 1` — a set of near-identical weights with no collective move and no hold.
- **FIGMA TARGET EVIDENCE:** n/a
- **INTEGRATION / PRODUCT EVIDENCE:** n/a
- **HUMAN WALKTHROUGH:** `HW-A-003` (*"se perdió el que 'ninguna de estas cosas por separado es grave'"*) and `HW-A-005` (*"no hay nada que diga el problema es que se acumulan — se pasa directo"*), both filed as the reason the opening question has nowhere to fall.
- **CLASSIFICATION:** NARRATIVE + MASTER RULE VIOLATION (missing state)
- **SEVERITY:** **HIGH**
- **VERDICT:** **REJECT.** Two of Scene A's four load-bearing lines have no visual behaviour of any kind. The film currently goes *bubble → more bubbles → slogan*, with no breath before the slogan. That is why A-03's slogan feels like an assertion: there was no argument for it to conclude.
- **TARGET BEHAVIOR:** Two new manual-trigger states. (1) After the third concrete example: a **collective de-emphasis** — every object drops to roughly one value, the field holds, nothing moves. This is L24. (2) After L26: the saturated field holds ~400 ms, then a **total clear to black in 400–600 ms**. The next press starts A-B7.
- **WHY:** Master §5 A1 freezes both the de-emphasis logic (it exists so the viewer reads each item as harmless) and the clear. NO-UI §9 lists A05 as its own state. Without them the transition from comedy to the founding question has no hinge, and A-02 becomes unfixable — there is no black to hold the question in.

---

### **A-09 — The saturated state is a sparse field of seven chat bubbles, not saturation**
- **SCENE:** A
- **CURRENT STATE(S:** `S01_step10`
- **SCRIPT MOMENT:** L22 `[Aca ya aparecen los miles de ejemplos]` + L24–L26
- **MASTER INTENT:** §5 A1 *"elementos secundarios hasta completar aproximadamente **65–75 % del canvas**… Total orientativo: **10–14 piezas**"* with permitted secondaries including *"turno, cena, 'después haceme recordar', luz, quién compra, 'ya lo hice yo', foto, factura, lista"* · NO-UI §11 A04 *"**65–80 % del canvas ocupado al final**… sensación real de saturación"* with 11 named secondaries and a **three-burst auto-beat of 900–1200 ms**
- **CURRENT RUNTIME EVIDENCE:** at `S01_step10`, measured `attention-element` boxes: `appointment` 466×89 @154,152 · `dinner` 376×89 @754,222 · `reminder` 358×74 @716,72 · `electricity` 366×89 @105,378 · `shopping` 444×89 @580,518 · `warranty` 596×138 @514,352 · `already-done` 324×74 @150,556 · `fragments` 1104×580 @88,62. Sum of the seven content boxes = **279 970 px² = 30.4 % of the 921 600 px² canvas.** The eighth element is a texture at `opacity 0.46` with no readable content; including its bounding box gives a meaningless 99.9 %. There is **no document, no photograph, no physical object** anywhere in the saturated state — zero of the master's "factura / lista / foto" secondaries. There is no auto-beat: the burst is eight separate manual presses (`presentationConfig.ts:25`, `stepCount: 11`).
- **FIGMA TARGET EVIDENCE:** n/a
- **INTEGRATION / PRODUCT EVIDENCE:** n/a
- **HUMAN WALKTHROUGH:** `HW-A-004` (*"la animación, como que todas crecen, no se achican un mínimo y pierden un poco de atención"*) and `HW-A-005` (*"no hay nada que diga el problema es que se acumulan"*).
- **CLASSIFICATION:** VISUAL DENSITY + MASTER RULE VIOLATION (quantitative target)
- **SEVERITY:** **HIGH**
- **VERDICT:** **REJECT.** The current `S01_step10` does not read as chaos; it reads as a tidy, well-spaced set of seven chat bubbles with a great deal of black around them — visible directly in `audit/runtime/session-01/states/S01_step10.png`. Master A1 gives a numeric target and the runtime misses it by more than half. Seven of the master's eleven named secondaries are present; the four that would have added *physical* variety are absent.
- **TARGET BEHAVIOR:** 10–14 pieces at 65–80 % canvas occupancy, mixing at least three kinds — messages, documents, and one or two objects with recognisable silhouette (the master's "factura", "lista", "foto"). The last 3–4 entries compressed, then a hold, then the clear.
- **WHY:** The word the speaker uses is *"se acumulan"* (L26). Accumulation is a quantity claim. A field at 30 % occupancy with even spacing reads as *enumeration*, not accumulation, which is precisely the reading `HW-A-005` reported.

---

### **A-10 — There is no "individually harmless" reading available; the only emphasis is a 1.8 % scale**
- **SCENE:** A
- **CURRENT STATE(S):** `S01_step09 → S01_step10`
- **SCRIPT MOMENT:** L24 *"Ninguna de estas cosas por separado es grave"*
- **MASTER INTENT:** §2.6 (scale for semantic attention, with enumerated absolute values) · §2.7 (exposure grammar 55–75 %) · §5 A1 (the accumulation must read as *many small things*, not as *one big problem*)
- **CURRENT RUNTIME EVIDENCE:** the only differentials at `step10` are: opacities `0.69 / 0.88 / 0.69 / 0.96 / 0.93 / 1 / 0.69`; a `filter: blur(0.35px)` on the three `secondary` elements; and a `matrix(0.9487…)` / `matrix(1.0178…)` on `.attention-element-content` — i.e. **scale factors between 0.948 and 1.018**. The `warranty` bubble carries `--opening-near-scale: 1.018` (`openingTokens.ts:11`), the widest emphasis in the scene. There is no state in which the field is *collectively* quiet.
- **FIGMA TARGET EVIDENCE:** n/a
- **INTEGRATION / PRODUCT EVIDENCE:** n/a
- **HUMAN WALKTHROUGH:** `HW-A-004` — *"no se achican un mínimo y pierden un poco de atención"* and *"los iconos (nota/documento/mensaje) se leen como 'algo raro'"*.
- **CLASSIFICATION:** MOTION / VISUAL WEIGHT
- **SEVERITY:** **MEDIUM**
- **VERDICT:** **PARTIALLY CONFIRMED, and less severe than reported.** The mechanism the observer describes *does* exist — three elements drop to 0.69 with a blur, four get bespoke opacities between 0.88 and 0.96. But 0.35 px of blur is imperceptible at any projection size, and the resulting spread (0.69 → 1.00) is too narrow to establish hierarchy across seven objects. The observer's "algo raro" is better explained by A-05/A-09 (wrong objects, too few of them) than by the weight treatment.
- **TARGET BEHAVIOR:** at L24, one collective value for the whole field (roughly 0.55–0.65) with the *count* doing the work, then at L26 the field returns to full and clears. Individual per-object opacities should be reserved for the one object the speaker is naming.
- **WHY:** Master §2.7 gives exposure a range (55–75 %) precisely so that a *state* can be read as quiet. Seven objects spread across 0.69–1.00 are seven objects at the same weight.

---

### **A-11 — The entire post-reveal argument has no visual support**
- **SCENE:** A
- **CURRENT STATE(S):** `S03_step00` (one state)
- **SCRIPT MOMENT:** L48–L61 — *"que es una plataforma para coordinar la vida del hogar alrededor de las personas, los momentos, las responsabilidades, y la informacion que no queremos perder… no nace para que una persona controle el resto de la familia… que cada integrante pueda entender lo que le corresponde, participar y tener mas autonomía… sin que toda la organizacion dependa siempre de una sola persona"* — **14 spoken lines, the complete product definition and the complete ethical argument**
- **MASTER INTENT:** §5 A6 (icon left / wordmark right / orange expansion / full orange field / white lockup) · A7 (four people with distinct identity colours; *momentos* = white flash + thin photo frame; *responsabilidades* = up to four markers; *información* = documents/photos integrating) · A8 (control 108 %, equality, **105 % / 110 % / 115 %** absolute, house outline 700–900 ms) · A9 (zoom to house → Juli morphs into Home of Juli). NO-UI §11 A15–A27 are **13 additional states** for the same material.
- **CURRENT RUNTIME EVIDENCE:** `presentationConfig.ts:27` declares `S03` with `stepCount: 1`. The single stable frame contains: `.homeplus-logo` **204×204 at (538, 217)**, `<h1>HomePlus</h1>` at **78 px**, `color: rgb(245,241,235)`, on `#0B0908` with `.opening-stage-light` at **0.28** and `.opening-brand-depth` at **0.075** — both `#E65C1B`. The lockup is **vertically stacked and centred** (`opening.css:279-280`, `.homeplus-signature { flex-direction: column }`). There is **no orange fill**, no icon displacement, no wordmark reveal, no four avatars, no photo frame, no responsibility markers, no documents, no 105/110/115 scales, no house outline, and no Juli→Home morph. `.chaos-scene` is correctly `opacity: 0; visibility: hidden` and `.information-statement` correctly `opacity: 0` on this state, so the clean-up half of the transition does work.
- **FIGMA TARGET EVIDENCE:** n/a
- **INTEGRATION / PRODUCT EVIDENCE:** the four pillars map cleanly onto real product domains — *personas* → `FamilyMember` (`services\family.ts:23-36`) and `Role` (`:8`, `coordinator|adult|adolescent|child|senior|guest`); *momentos* → `date_of_birth` (`:31`) and `ActivityEntityType` (`services\planner\plannerActivity.ts:7`); *responsabilidades* → `ResponsibilityScheduleKind` (`services\plannerResponsibilities.ts:5-6`); *información* → `HouseholdScheduleBlock`, `PlannerEvent`. Nothing on stage represents any of them.
- **HUMAN WALKTHROUGH:** `HW-A-010` — *"no hay ninguna referencia visual a eso"* for the four pillars (the walkthrough even cites Figma's `A17–A20` as existing in the alt registry). `HW-A-011` — *"siento que podríamos dar cierto apoyo visual… no podríamos no dejar al Colo simplemente que hable y que la gente comprenda"*.
- **CLASSIFICATION:** NARRATIVE (product definition unvisualised)
- **SEVERITY:** **HIGH**
- **VERDICT:** **REJECT.** Fourteen consecutive spoken lines — the definition of the product and the argument for why it is not surveillance — are delivered over a static centred logo. Both human hypotheses are confirmed without qualification. This is also the mechanical reason A-02 cannot be fixed by retiming: there is only one state to hold.
- **TARGET BEHAVIOR:** `S03` becomes a sequence. Orange field → lockup exits up → Juli/Tomi/Mamá/Papá enter from below with four distinct identity colours → *momentos*: one clean white flash 80–120 ms + thin photo frame → *responsabilidades*: up to four small markers → *información*: documents and a photograph integrate behind → control/equality/105/110/115 → house outline draws around the four in 700–900 ms → camera pushes into the house, Juli remains and matches to Home of Juli. Minimum **9 states**, each on its own spoken word, exactly as NO-UI A15–A27 specify.
- **WHY:** Master §2.3 restricts on-screen text to four approved items; everything else must be *"probado con la imagen o quedar oral"*. Fourteen lines of product definition currently have neither. Master A7–A9 are not optional garnish — they are where the audience decides whether HomePlus is a coordination tool or a monitoring tool, which is the exact question S07 later has to answer.

---

### **A-12 — A visible glow sits behind the reveal, where the master forbids one**
- **SCENE:** A
- **CURRENT STATE(S):** `S03_step00`
- **SCRIPT MOMENT:** L45 *"Para eso creamos HomePlus"*
- **MASTER INTENT:** §5 A6 *"Sin glow."* · §2.8 *"Sin rebotes, spring evidente, 3D innecesario, **halos**, lens flare, partículas ni 'AI glow'."* · NO-UI §11 A16 *"**No visible circle. No halo.**"* · §5 (estética) *"Prohibido: … glow …"*
- **CURRENT RUNTIME EVIDENCE:** `S03_step00` has two live orange radials behind the lockup: `.opening-stage-light` at **opacity 0.28**, **1120×728** at (640,350), `--glow-strength: 72%`; `.opening-brand-depth` at **opacity 0.075**, 700×455 at (410,470). Both are `blur(120px)` ellipses (`tokens.ts:18`, `index.css:80`). This is directly visible in `audit/runtime/session-01/states/S03_step00.png` as a warm brown vignette filling the frame. The logo's own bounding box is 204 px — the glow is 5.5× its area in width.
- **FIGMA TARGET EVIDENCE:** n/a
- **INTEGRATION / PRODUCT EVIDENCE:** n/a
- **HUMAN WALKTHROUGH:** `HW-A-009` — *"pero tiene como un mínimo de [resplandor] naranja detrás"*.
- **CLASSIFICATION:** MASTER RULE VIOLATION (aesthetic prohibition)
- **SEVERITY:** **MEDIUM**
- **VERDICT:** **REJECT.** Distinct from A-01 (which is about the colour appearing at all across Scene A): this is specifically the halo behind the lockup, prohibited three separate times. The lockup is also **stacked vertically** where the master requires it horizontal (icon left, letters right).
- **TARGET BEHAVIOR:** the reveal frame is `#E7643F` (master §2.1's frozen orange — note the implementation's `#E65C1B` is a *different* orange, see §20 OPEN-1) with a white lockup. No radial, no halo, no vignette.
- **WHY:** Master A16's eight-step sequence ends in *"fondo naranja completo + lockup HomePlus blanco"*. A glow behind a logo on a near-black field is the visual language of a software product launch, not of a household keynote, and it is explicitly on the prohibited list.

---

### **A-13 — No attention reset between the saturation and the first location**
- **SCENE:** A
- **CURRENT STATE(S):** `S01_step10 → S02_step00`
- **SCRIPT MOMENT:** L28 *"Una cosa estaba en un chat viejo"* — the first line of the new movement
- **MASTER INTENT:** §5 A1 end (*"limpieza total en 400–600 ms → negro"*) and A2 (which begins from black) · §2.2 (black as *reset entre capítulos*)
- **CURRENT RUNTIME EVIDENCE:** across the boundary, `opening-stage-light` goes from **0.075 to 0.10** — the light *increases*. `.presentation-canvas` `scrollWidth×scrollHeight` is `1280×720` on both sides (no growth, no clear). `S02_step00` already shows `.information-statement` at `opacity: 1`, 80 px — so the first state of the new movement opens with the conclusion of the old one still on screen.
- **FIGMA TARGET EVIDENCE:** n/a
- **INTEGRATION / PRODUCT EVIDENCE:** n/a
- **HUMAN WALKTHROUGH:** implied by `HW-A-006` (*"no hay una cosa estaba en un viejo…"* — the new movement does not arrive as a movement).
- **CLASSIFICATION:** MOTION (missing reset)
- **SEVERITY:** **MEDIUM**
- **VERDICT:** **REJECT.** Subsumed in remedy by A-08's clear, but distinct in cause: even if the clear at L26 were added, the first state of S02 must not open with the hero line already up.
- **TARGET BEHAVIOR:** the clear at L26 leaves true black. `S02_step00` is black. The first location object enters on the next press.
- **WHY:** Master §2.2 lists *reset entre capítulos* as one of exactly four valid uses of black. Moving from "the family is drowning" to "here is where one piece of it lives" is a chapter change.

---

### **A-14 — The two physical objects are below the master's minimum size**
- **SCENE:** A
- **CURRENT STATE(S):** `S01_step01`, `S01_step02`
- **SCRIPT MOMENT:** L18, L20
- **MASTER INTENT:** §5 A1 / NO-UI §11 A01 *"grande… reconocible desde lejos… **aprox 420–520 px de ancho**"*; A02 *"objeto grande"*
- **CURRENT RUNTIME EVIDENCE:** `insurance-document` is `width={304}` (`S01Chaos/index.tsx:16`, `AttentionElement width={304}` at `:13`) = **23.7 %** of the 1280 px canvas. `grocery-bag` is `width={290}` (`:20-22`) = **22.7 %**. Both sit alone on a 1280×720 stage, so each occupies roughly a quarter of the width and less than a fifth of the height.
- **FIGMA TARGET EVIDENCE:** n/a
- **INTEGRATION / PRODUCT EVIDENCE:** n/a
- **HUMAN WALKTHROUGH:** `HW-A-001` implies it (*"el beat de la heladera/la garantía no tiene soporte visual"* — nothing in the opening is large enough to carry a solo beat).
- **CLASSIFICATION:** VISUAL SCALE
- **SEVERITY:** **LOW**
- **VERDICT:** **REJECT, minor.** Not a comprehension risk at 1920×1080 — the objects read clearly — but they are below a frozen numeric target, and if they grow to 420–520 px the composition of `step10` will need re-spacing (which is desirable anyway per A-09).
- **TARGET BEHAVIOR:** invoice 440–480 px wide; bag 380–440 px wide; both with the master's −2°→0 entrance.
- **WHY:** Master A01 gives a range, not a minimum. Landing 304 px is outside it, and these are the first two objects the audience sees — their scale sets the expectation for everything after.

---

### **A-15 — `SCRIPT ISSUE` — the spoken enumeration has three locations; the master's canonical script has four**
- **SCENE:** A (recorded, not fixed)
- **CURRENT STATE(S):** n/a — this is a source-text inconsistency
- **SCRIPT MOMENT:** L28–L30. `Guion Compartido (2).md` L28-30: *"Una cosa estaba en un chat viejo, otra en un calendario, y otra simplemente en la cabeza de alguien"* — **three**. `HOMEPLUS_PRESENTATION_MASTER_FREEZE_V1.0.md` §18 (canonical script) L1693-1696: *"Una cosa estaba en un chat viejo, otra en un calendario, **otra en una carpeta perdida** y otra simplemente en la cabeza de alguien"* — **four**. Master §5 A2/A8 also require a **file pass** (`A08 — FILE PASS`, cue *"otra en una carpeta perdida"*).
- **MASTER INTENT:** master §18 is the patched canonical script; §19 says the film's content is frozen and script cleanup happens as a separate pass.
- **CURRENT RUNTIME EVIDENCE:** the stage shows **six** app logos, so it matches neither the spoken three nor the canonical four. The `information-fragments.svg` asset does contain a document/folder motif but is used only as a 0.46-opacity background texture at `step10`, not as a location pass.
- **FIGMA TARGET EVIDENCE:** n/a
- **INTEGRATION / PRODUCT EVIDENCE:** a lost file/folder is consistent with the product's `HomeCloud` document domain, but no `warranty`/`garantía` field exists (`services\inventory.ts:25-40`), so nothing here is a product claim.
- **HUMAN WALKTHROUGH:** not raised as a script problem; the observer simply reported the missing representation (`HW-A-006`).
- **CLASSIFICATION:** **SCRIPT ISSUE** (per §22 of this brief: record, do not rewrite)
- **SEVERITY:** recorded as a source inconsistency, **not** graded as a presentation defect
- **VERDICT:** **SCRIPT ISSUE.** The presentation cannot satisfy both the spoken script and the master's frozen file pass without a decision. My recommendation for the later script pass: **restore "otra en una carpeta perdida" to the spoken script**, because master A2/A3/A4 and the whole A7→A9 chain are built on four locations, and because a lost folder is the object that motivates Scene E. This is a recommendation, not a decision.
- **TARGET BEHAVIOR:** deferred to the script pass.
- **WHY:** AGENTS.md and this brief both forbid compensating for a script inconsistency with dishonest behaviour. Recorded, untouched.

---

### **A-16 — POSITIVE — the first two beats of Scene A land correctly**
- **SCENE:** A
- **CURRENT STATE(S):** `S01_step00`, `S01_step01`
- **SCRIPT MOMENT:** L15, L18
- **Evidence:** `S01_step00` is genuinely near-empty (`attention-element` visible count **0**), matching `[Screen nega]`. `S01_step01` is a single recognisable insurance document with a warm paper surface, a dog-eared corner, a `FACTURA` eyebrow and `Seguro del auto` set at 38 px — legible and correctly scaled as a solo beat. Its accent (`#D28456` in `insurance-document.svg`) is a muted tan, **not** the HomePlus orange, so it does not pre-empt the brand. `attention-enter` uses `translate: 0 12px → 0` with `cubic-bezier(.2,.8,.2,1)` over 320 ms — a decelerating entrance, correct per master §2.8.
- **CLASSIFICATION:** POSITIVE — preserve
- **SEVERITY:** **POSITIVE**
- **VERDICT:** **KEEP AS IS.** Do not touch `S01_step00` or the insurance document's design or entrance. The problem with Scene A begins at step 2.
- **TARGET BEHAVIOR:** unchanged.
- **WHY:** Master §5 A0/A01 are satisfied. When fixing A-06, grow this object (A-14) rather than redesigning it.

---

### **A-17 — POSITIVE — the exhaustion of the opening is real and legible**
- **SCENE:** A
- **CURRENT STATE(S):** `S01_step03` … `S01_step10`
- **Evidence:** the seven bubble strings are all *household* utterances (`¿A qué hora era el turno?`, `¿Hay algo para cenar?`, `Después haceme acordar`, `¿Alguien pagó la luz?`, `¿Quién compra lo que falta?`, `Ya lo hice yo`). None of them is a UI string, a system label, or a product name. That is master §2.5's *"objetos reales"* register executed correctly, and it is why the beat reads as a household rather than as a product deck. The warm off-black palette (`#201B17` bubble, `#44382E` border, `#F5F1EB` text) is coherent and legible at projection size (30 px body → 45 px at 1.5×).
- **CLASSIFICATION:** POSITIVE — preserve, but extend
- **SEVERITY:** **POSITIVE**
- **VERDICT:** **KEEP the register and the palette.** The defect is that there are only seven and they are all one kind of object. Add documents and objects per A-09; do not restyle the bubbles.
- **TARGET BEHAVIOR:** unchanged tone, larger cast.
- **WHY:** Master §16 rule 12 (*"¿Hay blur donde basta con exposición? Preferir exposición"*) and rule 3 (*"¿Hay texto visible que simplemente repite al expositor? Eliminarlo"*) are both satisfied here. The visual discipline of Scene A's bubble layer is the strongest thing in the scene and should be the model for the rest.

---

## 5. Scene A positives to preserve

Explicit `KEEP THIS` list. Each is a measured behaviour, not a preference.

| # | Behaviour | Evidence | Instruction |
|---|---|---|---|
| **A-P1** | **The true-black opening state.** `S01_step00` has **0** visible `attention-element`, no text, no device, nothing. This is the correct execution of `[Screen nega]` / master A0. | measured visible count = 0; `states/S01_step00.png` | **Keep.** When A-01 is fixed, keep this frame black. Do not add the neutral-light alternative here if it can be avoided. |
| **A-P2** | **The insurance document as a designed object, not a card.** Off-white paper, dog-ear, `FACTURA` eyebrow at 18 px with 3 px letter-spacing, `Seguro del auto` at 38 px / −1 px tracking, −6° rotation, muted tan accent. | `S01Chaos/index.tsx:13-19`; `insurance-document.svg` palette `#302922 #40362D #625143 #867364 #D28456` | **Keep the design.** Grow to 440–480 px (A-14) and make it a persistent accumulator (A-06). |
| **A-P3** | **A decelerating entrance on first appearance.** `attention-enter` = `translate: 0 12px → 0`, `cubic-bezier(.2,.8,.2,1)`, 320 ms, no overshoot. | `src/index.css:120-122, 154-157`; `motionTokens.ts:8` | **Keep.** This is the correct register for master §2.8 (250–450 ms normal appearance, no bounce). Reuse it for the restored chat/calendar/file passes. |
| **A-P4** | **The bubble layer's palette and type.** `#201B17` surface, `#44382E` border, `#F5F1EB` text, 30 px / 450 weight / −0.8 px tracking, 22 px radius with a 7 px tail corner, `0 12px 32px rgb(0 0 0/.16)`. | `opening.css:130-151`; `openingTokens.ts:4-9` | **Keep verbatim.** Do not re-tone. Extend with document/object variants at the same surface value. |
| **A-P5** | **Household register in every bubble.** No system label, no product name, no UI chrome anywhere in Scene A's object layer. | measured visible-text inventory of `S01_step01…10` | **Keep.** This is what master §2.5 means by "objetos reales". |
| **A-P6** | **`prefers-reduced-motion` is honoured.** `opening.css:282-285` removes the blackout animation and the secondary blur; `FamilyMapStage.tsx:70-77` snaps the FLIP to `translate3d(0,0,0) scale(1)` with `transition: none`. | both files | **Keep.** The map's reduced-motion path is the model the rest of the map treatment should follow. |
| **A-P7** | **S02's statement typography.** 80 px, −3.4 px tracking, weight 550, centred, `line-height: 1.06`, on `#0B0908`. | `opening.css:176-194`; measured `font-size: 80px` | **Keep the typography.** Fix the tense (A-04) and the timing (A-04, A-03). |
| **A-P8** | **Scene-level clean-up on the reveal state actually works.** At `S03_step00`, `.chaos-scene` is `opacity: 0; visibility: hidden` and `.information-statement` is `opacity: 0`. | measured | **Keep.** The layers *can* be cleared; the clear simply is not given its own state (A-08). |

---

## 6. Scene A target choreography

**This is a design recommendation, not code.** No implementation happens in this session. Every line names the beat, the verdict, and the intended visual behaviour.

### Beat-by-beat

| BEAT | VERDICT | Intended visual behaviour |
|---|---|---|
| **A-B1** *martes cualquiera* | **KEEP** | Absolute `#000000`. Nothing. The neutral-light compromise from A-01 is only needed if a light is unavoidable; prefer true black here. |
| **A-B2** *seguro del auto* | **RECOMPOSE** | Invoice enters 440–480 px wide from above, −2°→0, 320 ms decelerate. **Persists from here to the clear.** |
| **A-B3** *las compras* | **RECOMPOSE** | Bag + ticket enters lower-right, **added to** the invoice. Both remain. `motion: ACCUMULATE`. |
| **A-B4** *se rompe la heladera* | **RECOMPOSE + RETIME** | Warranty **document** (paper, off-white, recognisable) enters upper-right on this line — third press, not eighth. All three principal objects now coexist. |
| **A-B5** *ninguna por separado es grave* | **ADD STATE** | **Collective de-emphasis.** All objects drop to one shared value (≈ 0.55–0.65 exposure) simultaneously over 400–500 ms. Nothing enters, nothing exits, nothing moves position. Hold. This is the beat the operator currently has no press for. |
| **A-B6** *el problema es que se acumulan* | **RECOMPOSE** | Field returns to full presence for ~400 ms while the secondaries burst (3 bursts, 900–1200 ms total, last burst fastest, per NO-UI A04), reaching 10–14 pieces at 65–80 % occupancy. Then **total clear 400–600 ms → `#000000`**. |
| **A-B7** *un chat viejo* | **REPLACE** | From black, the **real WhatsApp** enters from the right: `Familia ❤️`, participants `Juli · Pa ❤️ · Ma ❤️ · Tomi`, casual non-operational messages, 420–560 px wide. Not a logo. |
| **A-B8** *otro en un calendario* | **REPLACE** | Calendar object, same axis and rhythm, exits left. Same size class. |
| **A-B9** *en la cabeza de alguien* | **REPLACE** | **Absolute black. No object, no icon, no text, no magnifier.** A manual-trigger state so the speaker can hold it and gesture at their own head. This is the strongest single change in Scene A. |
| **A-B10** *volvemos a preguntar / buscamos mensajes viejos / nos fijamos quién hacía qué* | **ADD (3 states)** | The same WhatsApp returns **from the left** (spatial memory, per NO-UI A10). It expands. `¿Quién me busca hoy?` is typed and sent. The history scrolls fast and decelerates onto `Ma ❤️: Esta semana lo busco yo a Tomi.` Everything else drops to 35–45 % exposure; the target message stays at 100 %. |
| **A-B11** *reconstruimos información que ya existía* | **RECOMPOSE** | The target message detaches. The chat leaves. Four fragments arrive: WhatsApp `Esta semana lo busco yo a Tomi.` · Calendar `Entrenamiento 18:00` · file `Garantía heladera.pdf` · note `Comprar leche`. A few discontinuous hairlines. Then **`La información ya existía.`** at 72–84 px, centred, white, appearing **once**, after the fragments. Fade both to black. |
| **A-B12** *la pregunta* | **ADD (manual-trigger hold)** | Everything out. `#000000`. **Hold for as long as the speaker takes.** No timer, no auto-advance. This is the state that makes the question land. |
| **A-B13** *para eso creamos HomePlus* | **RECOMPOSE (2 states)** | (13a) On the last two words: the real HomePlus icon, centre, `opacity 0→1`, `scale .94→1`, still on black, **no wordmark**. (13b) HERO AUTO-BEAT ≈ 850–1000 ms: icon slides left → wordmark reveals rightward from behind → `#E7643F` expands from the icon's zone under a mask and fills the entire canvas → final: **full orange field, white horizontal lockup.** No halo, no vignette, no radial. |
| **A-B14** *personas / momentos / responsabilidades / información* | **ADD (4 states)** | (14a) Lockup exits up; orange remains. Juli · Tomi · Mamá · Papá enter from below, aligned as a family with ages legible from scale, four distinct identity colours. No `PERSONAS` text. (14b) *momentos*: one clean white flash 80–120 ms + a thin photo frame around the family, then the frame dissolves. No `MOMENTOS` text. (14c) *responsabilidades*: up to four small markers/checks appear beside members, quick, then leave. No text. (14d) *información que no queremos perder*: documents, a photograph and a file appear around them and integrate behind/below. No text. |
| **A-B15** *no nace para que una persona controle… / la idea es exactamente la contraria* | **ADD (2 states)** | (15a) Mamá `scale 100→108 %`; the other three drop to ~65 % presence; back to equality within the same phrase. No eye, no padlock, no word CONTROL. (15b) All four at 100 % presence. |
| **A-B16** *entender lo que le corresponde / participar / tener más autonomía* | **ADD (3 states)** | Absolute scales **105 % → 110 % → 115 %**, one per spoken beat, each returning before the next. Never multiplied. |
| **A-B17** *sin que toda la organización dependa de una sola persona* | **ADD (1 state)** | A simple white `HouseOutline` draws around/behind the four, 4–6 px stroke at 1920×1080, no fill, no perspective, 700–900 ms. The family is contained, not fenced. |
| **A-B18** *handoff to Juli* | **ADD (1 state)** | Camera/scene push into the house. The house exits the crop. Mamá/Papá/Tomi lose presence. **Juli remains** and matches/morphs into Home of Juli. Type: `SHARED_ELEMENT + EDITORIAL_MORPH`. |

### Resulting Scene A shape

| | Current | Target |
|---|---|---|
| States in Scene A | 19 | **≈ 30** |
| Spoken beats with no visual state | 6 + 1 handoff | **0** |
| Persistence models in use | de-facto `REPLACE` for the first act, then undeclared | `ACCUMULATIVE` (A-B2→A-B6), `EXCLUSIVE` (A-B9, A-B12), `SELECTIVE CONTINUITY` (A-B10→A-B11), `EXCLUSIVE` (A-B12→) — declared per NO-UI §9 |
| Manual triggers needed for the saturation burst | 8 separate presses | 1 press + one 900–1200 ms auto-beat (master §2.10, NO-UI §4) |

**Trigger-budget note.** Master §2.10 requires *"no más de 1 trigger manual por microsecuencia"* and NO-UI §4 requires manual triggers only where the speaker might want to breathe. At ~30 states for Scene A against 48 spoken lines (Session 1 §10.2), that is ≈ 1.6 lines per state — inside the range master §2.10 can absorb, provided the saturation burst and the WhatsApp scroll become auto-beats. Session 1 already showed the current 19 states force 8 consecutive presses for the burst alone.

---

---

## 7. Spoken-beat map — B (S04 Home, S05 Planner, S06 Family, S07 Coordinar No Es Vigilar)

Speaker: **Gaby**, script L65–L139. `[Pausa]` marker at L131.

| BEAT | SCRIPT (line) | INTENDED IDEA | EXPECTED VISUAL SUPPORT | CURRENT STATE(S) | HAS STATE? |
|---|---|---|---|---|---|
| **B-B1** | L65–L67 *"Todo empieza en Home. Es el lugar donde cada integrante puede ver primero qué necesita su atención, sin tener que recorrer toda la aplicación para encontrarlo."* | Module claim: **attention first**, no hunting | Home of Juli, real UI, the attention set visible as a group | `S04_step00` — three rows (`Llevar autorización`, `Tarea de Matemática` under `HOY`; `Educación Física` under `PRÓXIMAMENTE` with lead `Mañana`) | ✔ **and the walkthrough explicitly approves it** |
| **B-B2** | L69 *"Juli tiene 10 años"* | The person the screen belongs to | Juli's identity established (avatar, name, age) | `S04_step01` — `showJuli` → the account row gains a focus ring and full-opacity name. **No age, no person.** | partial |
| **B-B3** | L71 *"Cuando abre Home puede ver que mañana tiene Educación Física, que tiene que llevar una autorización y que todavía tiene una tarea del colegio."* | **Three things, all tomorrow, all pending** | All three coexisting in an attention set; one 120–125 % focus; a zoom-out to show the group | `S04_step02` (Ed. Fís. tinted, `matrix(1.02)`), `step03` (autorización → **Completada**), `step04` (tarea → **Completada**) | ✔ but **contradicts the narration** (B-01, B-03, B-04) |
| **B-B4** | L73 *"Así puede entender rápidamente qué tiene pendiente y qué le corresponde, sin depender de que un adulto se lo recuerde cada vez."* | The outcome: autonomy | The three pending items hold the attention; the app chrome recedes | `S04_step05` — chrome drops to 0.84/0.82, **but the attention tint is gone from the one row that still needs it** | partial (B-02) |
| **B-B5** | L75–L77 *"Y cuando necesita ver más, entra a Planner. Ahí se concentra todo lo que tiene que organizar."* | Module transition + "more than Home" | Real navigation to Planner; the module identifies as **Planner** | `S05_step00` — in-phone layer swap; heading reads **`Tareas`** | ✔ but identity wrong (B-06) |
| **B-B6** | L79 *"En Tareas puede ver lo que tiene que hacer y las responsabilidades que le corresponden."* | **Two** things inside Tareas | Pending tasks **and** a recurring responsibility, demonstrated | `S05_step01` — heading **`COMPLETADAS`**, two completed rows, **0 pending, 0 responsabilidades** | ✘ (B-07) |
| **B-B7** | L81 *"En Calendario puede ver sus eventos, sus horarios y cuándo ocurre cada cosa."* | **Three** things inside Calendario | Event **with a time**, a recurring schedule, and when-things-happen | `S05_step02` — one event, **no time anywhere** (`9:41` is the status bar), **no schedule** | ✘ (B-08) |
| **B-B8** | L83 *"Y en Planes puede organizar cosas más grandes, que no se resuelven con una sola tarea sino que necesitan varios pasos."* | Multi-step organisation | A plan that reads as multi-step **without** naming Scene C's content | `S05_step03` — the named `Cumpleaños` plan with three literal concept-strings | ✔ but spoils C (B-09) |
| **B-B9** | L85–L87 *"Hasta acá estamos hablando principalmente de la organización de cada integrante. Pero en una casa, muchas veces lo que cambia en el día de una persona también afecta al resto."* | **The widening** — individual → household | A visual bridge that widens the frame from *this member* to *the household* | `S05_step03 → S06_step00`: one press, one 320 ms cross-fade of two in-phone layers. Nothing widens. | ✘ (B-10) |
| **B-B10** | L89 *"Ahí entra Familia."* + L91 *"Familia conecta la organización de cada integrante con la del resto del hogar, relacionando personas, lugares, horarios y conversaciones que pueden ser importantes para coordinarse."* | The module + its four connectors | The people context established first; then places, schedules, conversations in that order | `S06_step00` — three member cards (Juli missing), switch `Familia | Mapa | Lugares`. **"Conversaciones" is a SCRIPT ISSUE** (SI-05) | partial (B-17, B-22) |
| **B-B11** | L93–L97 *"Tomi tiene 16 años. Sale del colegio y después va a entrenar. Pero hoy el entrenamiento se alarga una hora y mamá ya no llega."* | **The cause of everything that follows** | School → training; `18:00–19:00`; on *"se alarga una hora"* → `+1 h` and `18:00–20:00` at ~115 % | **Mis-placed.** `Colegio` at `step01`, `Club` at `step02`, `+1 h` at `step03`. **No state shows `18:00→20:00`.** | ✘ order inverted (B-12) |
| **B-B12** | L99–L107 *"Entonces la pregunta deja de ser solamente: '¿A qué hora termina?' y pasa a ser: '¿Quién puede pasar a buscarlo?' Porque en ese momento el horario por sí solo ya no alcanza."* | The pivot from clock-time to people | Exposure only, per master B4 — **no text** | **Nothing.** There is nothing to lower the exposure of; the map at `step03` is already the brightest thing on stage | ✘ (B-12) |
| **B-B13** | L109–L111 *"También importa dónde queda el club, quién está cerca y qué posibilidades tiene cada integrante. Para eso, en el mapa podemos tener esos lugares que forman parte de nuestro día a día y, si cada persona decide compartir su ubicación, sumar también esa información cuando hace falta coordinarnos."* | Places + **optional, individual** location | Club pin, proximity relation, per-person consent made visible | `S06_step01–03` — pins ✔ at arbitrary coordinates; **no proximity**; **no consent, no toggle, an always-on caption** | partial (B-13, B-14) |
| **B-B14** | L113–L115 *"Y la coordinación no siempre depende de dónde está cada uno. A veces simplemente necesitamos hablar o ponernos de acuerdo sobre algo del hogar."* | The turn away from geography | The map recedes; something conversational takes its place | `S06_step04` — map collapses back into the phone; `+1 h` disappears; no editorial mark | partial |
| **B-B15** | L117–L119 *"Ahí entra Feed. Feed reúne avisos y conversaciones relacionadas con la familia, para que tengan un lugar propio y no terminen perdidas entre todos los demás mensajes."* | The module + its promise of a place of its own | A surface that is **visibly not** Family and not Map | `S06_step05` — `Feed` H1 inside the Familia shell with the tab bar at `opacity: 0` | ✘ (B-15) |
| **B-B16** | L121–L125 *"El técnico viene entre las cuatro y las seis. ¿Quién puede estar?" / Esa conversación queda vinculada al hogar y disponible cuando hace falta volver a ella."* | The example + the **retention** promise | Write and send; short replies `Yo puedo.` / `No llego.`; a hold; a way back to the thread | One static post, `Responder` with **no thread, no replies, no list, no way back** | ✘ (B-16) |
| **B-B17** | L127–L129 *"Entonces Familia va mucho más allá de simplemente mostrar quién forma parte del hogar. La idea es conectar lo que hace cada integrante con la información que puede ayudar al resto a organizarse."* | The synthesis: Family is a join, not a list | People list → callbacks (Tomi avatar, Club pin, `20:00`, technician card) → they connect | **absent** | ✘ (B-21) |
| **B-B18** | L131 `[Pausa]` + L133 *"Pero hay un límite que para nosotros es fundamental."* | The breath before the boundary | **Silence.** Product stage exits as a block; nothing on stage | `S07_step00` — veil `#060404` at opacity 1, statement at opacity 0, product stage `visibility: hidden` | ✔ **and the walkthrough explicitly approves it** |
| **B-B19** | L135–L139 *"Coordinar no significa vigilar. Compartir ubicación no significa estar mirando dónde está alguien todo el tiempo. Significa que esa información pueda estar disponible cuando realmente sirve para coordinarse."* | The boundary | One clean conceptual screen, held for all three sentences | `S07_step01` — `Coordinar` 132 px `#F5F1EB` / `no es vigilar.` 132 px `#C7A084`, on `#060404`, nothing else | ✔ visually; ✘ evidentially (B-19) |

**Beat arithmetic:** 19 beats against 16 states. **Three beats have no state** (B-B12, B-B15's promise, B-B17) and **two are inverted** (B-B11, B-B13). This is the same pattern the walkthrough named as its dominant finding (*§5.3 of `00_HUMAN_HYPOTHESES.md`*: "EL GUION DICE ALGO Y LA PANTALLA NO LO MUESTRA"), now measured.

---

## 8. Home audit — S04

### 8.1 What Gaby actually says vs what the screen does

| Spoken (L71) | Screen at that state | Verdict |
|---|---|---|
| *"mañana tiene Educación Física"* | `Educación Física` under `PRÓXIMAMENTE`, lead `Mañana` ✔ | correct |
| *"que tiene que llevar una autorización"* | `Llevar autorización` under **`HOY`** ✘, then **tachada + `✓ Completada`** ✘✘ | two contradictions |
| *"que todavía tiene una tarea del colegio"* | `Tarea de Matemática` under **`HOY`** ✘, then **tachada + `✓ Completada`** ✘✘ | two contradictions |
| *"qué tiene pendiente"* | two rows literally labelled **`Completada`** | direct contradiction |

### 8.2 The completion defect, in full measured detail

`HomePlannerSequence.tsx:34-37` drives it:
```
showJuli={homeStep >= 1}  educationPhysical={homeStep >= 2}
authorization={homeStep >= 3}  schoolTask={homeStep >= 4}
complete={homeStep === 5}
authorizationCompleted={homeStep >= 3}  schoolTaskCompleted={homeStep >= 4}
```
`homeStep` is `slideIndex === 3 ? stepIndex : slideIndex >= 4 ? 5 : 0` (`:20`) — so **`homeStep === 5` for every Planner, Family and S07 state**, which is why the completion persists.

Measured chain of consequence:

| State | `authorization` | `schoolTask` | `educationPhysical` |
|---|---|---|---|
| `S04_step00–01` | `attention=false completed=false`, mark aria `Pendiente`, bg `#FFFFFF`, copy opacity 0.78 | same | `attention=false`, bg `#FFFFFF` |
| `S04_step02` | unchanged | unchanged | **`attention=true focused=true`**, copy `matrix(1.02)`, bg `#F6EDE8` |
| `S04_step03` | **`completed=true`, `title-decoration: line-through`, chip `Completada`, mark aria `Completada`, bg `#F6EDE8`** | unchanged | `attention=true`, copy `none` |
| `S04_step04` | `completed=true`, chip `Completada`, bg `#F4EEE9`, copy opacity 0.9 | **`completed=true`, chip `Completada`, `focused=true`, `matrix(1.02)`** | `attention=true` |
| `S04_step05` | `completed=true`, chip `Completada` | `completed=true`, chip `Completada` | `attention=true` **but bg `#FFFFFF`** |
| `S05_step00–03` | — | — | Planner Tareas: heading **`COMPLETADAS`**, both rows `Completada`, strikethrough |

Source of the visual treatment: `home-screen.css:79-82`
```
.home-demo-row[data-completed='true'] { background: var(--home-completed-surface); }   /* #F4EEE9 */
.home-demo-row[data-completed='true'] .home-row-copy { opacity: var(--home-completed-opacity); }  /* 0.9 */
.home-demo-row[data-completed='true'] .home-row-title { color: …; text-decoration: line-through; … }
.task-completion-label { … background: var(--home-brand); color: var(--home-surface); … }
```
and `HomeRow.tsx:27` — `{taskCompleted ? <span className="task-completion-label">Completada</span> : 'Juli'}`.

**This is not a visual-only mismatch.** `TaskCompletionMark.tsx:3` sets `aria-label={completed ? 'Completada' : 'Pendiente'}`. The DOM asserts the false state, so a screen reader in the room would hear the opposite of the speaker too.

### 8.3 Why it is a BLOCKER and not a HIGH

Three independent reasons, each sufficient on its own:

1. **It contradicts the narration in the present tense.** The speaker says *"todavía tiene"* and *"qué tiene pendiente"* while the screen says `Completada`. Master §2.3's core rule — no on-screen text that merely repeats or contradicts the speaker — is broken in the strongest available direction.
2. **It is not a product capability.** `front\mi-front-limpio\services\planner\homeSummaryTypes.ts:34` — `export type HomeSummaryTaskStatus = 'pending' | 'awaiting_verification';` — with a hard whitelist at `:131-134` that rejects anything else. `HomePlannerSections.tsx:51` — `pending: 'Pendiente', awaiting_verification: 'Por verificar'`. The filled brand checkmark and the string `Tarea completada` exist **only** as a 420 ms optimistic flash after the user taps (`HomePlannerSections.tsx:280-284`, `:367`), followed by a 2 s toast (`:385-391`). There is **no `line-through` anywhere in Home** — the only one in the app is `plannerShared.ts:1452` (a plan milestone) and `TaskDetailScreen.tsx:219` (a checklist item).
3. **The presentation never shows anyone completing anything.** The state appears ex nihilo with no tap, no hand, no confirmation. In the product the 420 ms flash is a *consequence* of an action; in the presentation it is a *decoration*.

### 8.4 Hierarchy, Home-ness and stage readability

| Question | Measurement | Verdict |
|---|---|---|
| Does Home feel like HomePlus? | Top bar (`9:41 · J · Juli · Familia García · search · bell`), `HOY`/`PRÓXIMAMENTE` sections, rounded cards `#FFFFFF` on `#F6F5F2`, 5-item bottom nav with a brand `+` FAB and a `…`. Faithful to the Figma target's shell grammar. | **YES — KEEP.** |
| Is the phone large enough? | Device 300×620 at (570,50) = **23.4 % × 86.1 %** of the 1280×720 canvas; app screen client **282×602**, constant across all 37 states. Device centre at x=720 vs canvas centre 640 — **80 px right of centre**. | **Adequate in principle.** The problem is not the device size; it is that 980 px of the canvas is empty while the one thing that must be read is 20 px type. |
| Are important rows stage-readable? | Row title 20 px → 30 px @1.5× / 46 px @2.3×. Row subtitle (assignee) 12 px → **18 px @1.5×**. Section heading 11 px → **16 px @1.5×**. Status bar 13 px → 20 px. | Titles yes; **everything else no** at 1920×1080. |
| Does the presentation emphasize the correct rows? | At `step02` it emphasizes `Educación Física` at `1.02`. At `step03`/`04` it emphasizes rows it has just falsified. At `step05` it emphasizes nothing. | **NO.** See B-02, B-03. |
| Should emphasis be camera/exposure instead of mutation? | — | **YES.** See §15. |

### 8.5 Comparison with the Figma Home target

| | CURRENT PRESENTATION `S04` | FIGMA TARGET (`fig-home`, `nav=home`) | INTEGRATION |
|---|---|---|---|
| Greeting | none | `<h1>Hola, Gabriel</h1>` 19 px | 4 role-dispatched Home variants (`HomeTabNavigator.tsx:180-185`) |
| Attention section | none | **`NECESITA ATENCIÓN` + `Ver 4 más`** → `Internet vencido · 38.450 ARS · Venció hace 5 días`, `Pagar la luz venció · Vencieron ayer · Completar` | `isAttention()` = `awaiting_verification` ∨ `pending && due_date < today` ∨ `priority === 'high'` (`PlannerTasksScreen.tsx:308-313`); Home section `NECESITA ATENCIÓN` |
| Groups | `HOY`, `PRÓXIMAMENTE` | `NECESITA ATENCIÓN`, `HOY`, `PRÓXIMO`, `TE PUEDE SERVIR`, `QUÉ CAMBIÓ` | `attention / today / upcoming / undated` (`PlannerTasksScreen.tsx:574-577`) |
| Row states | `Pendiente` → `Completada` (chip + strike + fill) | `Completar` (action), `Me encargo` (claim), `Sin responsable`, `Venció ayer`, `Venció hace 5 días` | `Pendiente` / `Por verificar`; no completed row state |
| Where completion lives | on the row | in **`QUÉ CAMBIÓ`**, a separate activity block: *"hace 1 h · Pagar expensas se completó"*, *"ayer · Regar las plantas del balcón se verificó"* | `ActivityEntityType = 'task' \| 'event' \| 'plan' \| 'goal' \| 'milestone'` (`plannerActivity.ts:7`) — **but the backend writes activity only for `event`, `goal`, `milestone`; `planner.tasks.service.js` contains zero occurrences of `activity`**, so tasks never appear there today |
| Real data | hardcoded in `HomeDemoScreen/index.tsx` | fixture-backed prototype | `GET /api/planner/summary` (`useHomePlannerSummary.ts:160-163`) |

**Read of the comparison:** the presentation's Home is a faithful *shell* wrapped around a *content set* one-twentieth the size of the target's, and the one status it does show is the one the product does not have. The shell should be kept; the content and the status semantics must be rebuilt from the target's own taxonomy. Note the honest limit: the target's `QUÉ CAMBIÓ` block is the *designed* home for completion, but the backend does not currently feed it with tasks — so the presentation must not invent task completions there either.

---

## 9. Planner audit — S05

### 9.1 Is "Planner" the module identity?

**Measured:** `.planner-heading h1` renders `'Tareas'` / `'Calendario'` / `'Planes'` at 26 px across all four S05 states. The string `Planner` appears nowhere in the Planner surface.

**Figma target (`fig-cal-Tareas`, `nav=calendario`):** `<h1>Planner</h1>` at **24 px**, with `Tareas · Calendario · Planes` as the segmented tabs beneath it.

**Integration:** `front\mi-front-limpio\screens\planner\PlannerScreen.tsx:700`
```tsx
<AppText variant="title1" weight="600" accessibilityRole="header">Planner</AppText>
```
and `navigation\plannerNavigationContract.ts:41-46`
```ts
export type PlannerTabKey = 'tasks' | 'events' | 'plans';
export const PLANNER_TAB_KEYS: readonly PlannerTabKey[] = ['tasks', 'events', 'plans'] as const;
```
with `PlannerScreen.tsx:798-806` mapping them to `Tareas` / `Calendario` / `Planes`.

**Verdict: HW-B-006 CONFIRMED against both targets.** The hierarchy is inverted: the tab label occupies the position of the module title and the module has no title. This is `HIGH` because a keynote audience reading `Tareas` in 26 px bold concludes the module is called "Tareas", and the narration's *"entra a Planner"* (L75) is then unsupported by the one word on screen.

### 9.2 Are Tareas / Calendario / Planes shown as navigation correctly?

**Yes, and this is a positive.** Measured: `.planner-tab` widths are constant at **81 / 82 / 81 px** (and 80 / 84 / 80 when a fractional pixel redistributes), font-size 16 px, inside a 50 px segmented track whose selected pill moves by `left` only — `3px → 84.33px → 165.66px`, pill width constant at `81.33px` (`planner-screen.css:19-23`). That is a faithful reproduction of the target's `SegmentedControl`: one soft track, one white selected pill with a brand-tinted border, brand-coloured selected label. `aria-selected` is set correctly on the tabs and `role="tabpanel"`/`aria-labelledby` on the panels.

**Correction to Session 1's evidence base.** Session 1 §5.4 recorded *"`S05_step01 → S05_step02` · `.planner-tab` 'Calendario' · `clientWidth 82 → 137`"*. That figure is **SUPERSEDED** and is not reproducible. Formal errata: `audit/01_RUNTIME_BASELINE_ERRATA.md` §E-01; canonical index: `audit/00_AUDIT_NORMALIZATION.md` §N-02. Session 2 re-measured it two ways at rAF resolution: (a) in all four stable S05 states the maximum tab width observed is **84 px**; (b) across the full transition sampled at rAF resolution (**222 frames**, armed before the keypress), only **two** width combinations ever occur — `81/82/81` for 225 frames and `80/84/80` for 1 frame — with a **maximum of 84 px**. The pill translates; the tabs do not resize. The 137 px figure appears to be a mid-transition attribution artefact from Session 1's structural-index element keying (the same class of defect Session 1 itself documented as D1/D2). **The "Planner tabs resize" claim should be struck from the evidence base.** The underlying 4 px vertical overflow of `.planner-panel-stack` (client 250×299 vs scroll 250×303) *is* real and is noted as LOW below.

### 9.3 Does Responsibilities receive the demonstration the narration deserves?

**No. It is absent in every form.**

| Source | What Responsabilidades is |
|---|---|
| **SCRIPT L79** | *"En Tareas puede ver lo que tiene que hacer **y las responsabilidades que le corresponden**."* — one of exactly two things Tareas is said to show. |
| **MASTER §6 B2** | *"Responsabilidad = chore/recurrent household duty; no confundir con autorización. **Mostrar una responsabilidad recurrente dentro de Tasks.**"* |
| **CURRENT** | Zero occurrences of the string in any of the 37 states. Measured `.planner-unchecked` count = **3** at every S05 state, and all three belong to the **Planes** panel (`plannerData.ts:22-29`), not to Tareas. |
| **INTEGRATION** | A **real, registered, reachable screen.** `PlannerTasksScreen.tsx:560-561`:<br>`<InteractivePressable … onPress={() => navigation.navigate('Responsibilities')} accessibilityLabel="Abrir responsabilidades">`<br>`<AppText variant="body" weight="800">Responsabilidades</AppText><AppText variant="caption" tone="secondary">Rutinas y obligaciones de la casa</AppText>`<br>Registered at `HomeTabNavigator.tsx:214-217` alongside `ResponsibilityCreate` / `ResponsibilityEdit` / `ResponsibilityDetail`. Data model `plannerResponsibilities.ts:5-6`: `ResponsibilityAssignmentKind = 'fixed' \| 'rotation' \| 'claimable' \| 'unassigned'`, `ResponsibilityScheduleKind = 'daily' \| 'weekdays' \| 'interval' \| 'monthly' \| 'after_completion'`; `:19` `assignment_kind` + `schedule_kind` on the entity. Lifecycle views at `ResponsibilitiesScreen.tsx`: `Activas` / `Pausadas` / `Archivadas`. |
| **FIGMA TARGET** | A real secondary tab inside Tareas, captured at runtime (`fig3-planner-responsabilidades.png`): header `‹ Responsabilidades` with a `+`; sections **`DE LA CASA · 3`** and **`PAUSADAS · 1`**; rows `Lavar los platos / Todos los días · Va rotando · (T) Tomi`, `Sacar la basura / Mar y vie · Cualquiera puede`, `Dar de comer a Nala / Todos los días · Siempre la misma · (M) Mariana`, `Regar las plantas del balcón / Pausada · Cada 3 días` (struck through), each with a `…` overflow. |
| **HUMAN** | `HW-B-005` — *"No se ve la parte donde aparece responsabilidades. Simplemente es un acceso a responsabilidades, pero no se ve exactamente cómo sería el módulo"*; `HW-B-007` — suggestion, *"podríamos ingresar a la screen de responsabilidades y mostrar las asignadas, por ejemplo a Juli"*. |

**Verdict: `HW-B-005` CONFIRMED, `HW-B-007` NOT NEEDED as a suggestion — the surface already exists in both targets and simply is not in the presentation.** The narration names it; the master requires it; Integration registers it; Figma implements it with recurrence and rotation policy; the presentation shows nothing. This is a **missing real capability**, not a design preference.

### 9.4 Does Calendar prove events, schedules and timing?

**It proves one of three, and not the load-bearing one.**

| Required by L81 | Present on stage? | Evidence |
|---|---|---|
| *"sus **eventos**"* | **Yes, one** | `Educación Física` / `Juli · Colegio`, under the label `LUNES 17 · MAÑANA`, in a week strip `17–23 AGO` with day 17 selected |
| *"sus **horarios**"* | **No** | No recurring-schedule entity of any kind. `.planner-unchecked` count unchanged at 3. |
| *"**cuándo ocurre cada cosa**"* | **No** | Measured: the only clock-like string anywhere in the Planner surface across all four S05 states is **`9:41`**, which is the iOS status bar. There is no `HH:MM`, no `08:00`, no duration. |

**INTEGRATION proves this is a real, unexploited capability:**
- `screens\planner\PlannerCalendarScreen.tsx:46-49` — `type AgendaRow = { kind: 'event' | 'task' | 'schedule'; … }`. The agenda is a three-way union.
- `screens\planner\PlannerCalendarScreen.tsx:436` — creation toggle `options={[{ value: 'event', label: 'Evento' }, { value: 'schedule', label: 'Horario' }]}`.
- `screens\planner\PlannerCalendarScreen.tsx:396` — empty state *"No hay eventos, horarios ni tareas para este día."*
- `services\plannerSchedules.ts:5-17` — `HouseholdScheduleBlock { id, household_id, person_id, title, days_of_week: number[], start_minutes: number, end_minutes: number, color_key, note }`.
- `services\plannerSchedules.ts:47` — `getSchedulePrivacy` → `{ is_visible_to_household: boolean }`, with per-person visibility enforced in `backend\src\services\planner.schedules.service.js:63-85` via the RPC `can_view_household_schedule`.
- `services\plannerEvents.ts:4-6` — `PlannerEventRecurrence = 'none' | 'daily' | 'weekly' | 'monthly'`.

**Classification: FUNCTIONAL CAPABILITY DELTA.** The capability exists, is well-modelled, and is not shown. Master §6 B2 asks the calendar to prove *"eventos / horarios / cuándo ocurre"*; the presentation proves one event with no time.

### 9.5 Does Plans prove multi-step organisation without explaining Scene C?

**It proves multi-step and then spends Scene C's reveal.**

Measured at `S05_step03`: plan heading `Cumpleaños`, meta `Sábado · 3 pasos pendientes`, steps `Repartir tareas` / `Preparar cosas` / `Comprar lo que falta`, unchecked circles, 19 px step titles.

**Two distinct defects:**

**(a) The literal task strings are the ones master §7 C2 forbids by name.** Verbatim: *"No usar como tasks literales `Repartir tareas / Preparar cosas / Comprar lo que falta`."* Master's approved examples are `Confirmar invitados`, `Preparar torta`, `Decoración`, `Comprar globos`, `Bebidas`, `Comida`. Integration contains **zero** matches for any of those nine strings anywhere in the repository, including `docs/` — its real task titles are concrete household items: `Ordenar la cocina`, `Preparar mochila del colegio`, `Comprar leche y pan`, `Sacar la basura`, `Regar las plantas`, `Lavar ropa blanca` (`backend\scripts\seed-demo-familia-1-test.js:335,344,353,362,371,380`); and its own template defaults are `'Tarea de limpieza'`, `'Hacer compras'`, `'Cuidar mascota'`, `'Revisar medicacion'`, `'Organizar estudios'`, `'Realizar pago'` (`services\plannerTemplates.ts:5,11,17,23,29,35`).

**(b) The named plan is Scene C's content, shown one scene early.** Script L83 is a *generic* statement — *"puede organizar cosas más grandes, que no se resuelven con una sola tarea sino que necesitan varios pasos"* — and Scene C opens at L146 with *"Un cumpleaños el sábado es un evento"* and then builds the plan. Presenting the specific `Cumpleaños` plan with its specific three steps at S05 means the Scene C reveal has already happened. Master §6 B2 is explicit: *"No explicar demasiado; la UI debe probarlo."* Proof requires a plan, but not that plan.

**Note on the script.** Script L147-150 says *"repartir tareas, preparar cosas y resolver qué comprar"* — the same abstract triple. That is **correct as speech** and **incorrect as on-screen task titles**. This is not a script defect; it is a presentation copy defect that the script's phrasing invites. Recommendation: on-screen tasks become concrete household items; the spoken line stays abstract. The target's own vocabulary (`Lavar los platos`, `Sacar la basura`, `Dar de comer a Nala`) is the right register, not party tasks — a birthday party's tasks belong to Scene C's beat, and Scene C can introduce them then.

**Figma target for comparison (`fig-cal-Planes`):** six real plans with progress, deadline and remaining count — `Mudanza de mamá 33 % · 15 nov · Faltan 3 cosas`, `15 de Martina 50 % · 30 sep · Listo para completar`, `Renovar la cocina 0 % · Pausado · 12 dic`, `Comprar auto · Ahorro $650.000 / $5.000.000 · jun 2027 · Falta 1 cosa`, `Cumpleaños de Martina 50 % · Sáb 03 · Falta 1 cosa`, `Puesta a punto de la casa 19 % · Sin fecha · Faltan 21 cosas`. So "multi-step" in the target is expressed as **progress + money + what remains**, not as a three-line text list. The presentation's plan has none of those.

---

## 10. Family / Map / Feed audit — S06

The three semantic territories are audited **separately** below, then their boundaries are judged. The human walkthrough suspected they are blended (`HW-B-014`, `HW-B-016`); the evidence confirms it and identifies exactly where.

### 10.1 FAMILY / PEOPLE — `S06_step00`

| Question | Measurement | Verdict |
|---|---|---|
| Does the screen first establish the PEOPLE context? | `family-screen-heading h1` = `'Familia'`; `.family-switch` = `Familia [selected] · Mapa · Lugares` at `opacity: 1`; `family-members` layer `data-present=true` with three `family-member-card`s. | **YES.** The order matches the target exactly: Figma-app's Familia opens on `Familia García · 4 integrantes` with the `Familia` pill selected (`fig-familia.png`). **KEEP.** |
| Are all four people present? | **Three.** `Tomi / Colegio` (`<h2>`, 30 px, chevron, brand-soft `#F6EDE8`), `Mamá / Casa` (`<h3>`, 18 px, no chevron), `Papá / Trabajo` (`<h3>`, 18 px, no chevron). **Juli is absent** while the phone's own top bar reads `Juli`. | **NO.** |
| Is the list internally consistent? | Three different card treatments: one at 30 px with a chevron and a tinted surface, two at 18 px without. Heading levels `<h2>` then `<h3>`. | **NO.** |
| Does the target list everyone including the current user? | Figma: `4 integrantes`, four uniform rows, `Trabajo · hace 1 h` / `Casa · ahora` / `Casa · hace 30 min` / `Colegio · hace 2 min`, plus `ADMINISTRAR` (Datos de la familia / Invitaciones / Seguridad y SOS). Integration: `FamilyMembersCard.tsx:134-136` renders the dynamic count; `:210-214` maps `activeMembers`; `MemberRow.tsx:46-48` adds a `Vos` pill when `member.person_id === current_member.person_id`. | Target = complete list incl. self. Presentation = incomplete list excluding the phone's own user. |
| Is the cast itself a problem? | Juli/Tomi/Mamá/Papá do **not** exist in Integration (0 matches for `Juli`/`Tomi` as persons; the seed uses `Donals Mac`, `Gabriel DB`, `GTech Ituzaingó`, `Soy Re Pobre`). But they map cleanly onto real roles: `Role = 'coordinator' \| 'adult' \| 'adolescent' \| 'child' \| 'senior' \| 'guest'` (`services\family.ts:8`) — Juli→`child`, Tomi→`adolescent`. | **NO — this is a legitimate PRESENTATION-SPECIFIC ADAPTATION.** Do not "fix" the names. Fix the *count*. |

### 10.2 MAP / PRESENCE — `S06_step01` … `S06_step04`

**The enlargement technique is audited in full in §11 and §15. Here, the semantics.**

| Question | Measurement | Verdict |
|---|---|---|
| Does Map show location/presence for coordination? | `showSchool` (`step≥1`), `showClub` (`step≥2`), `showPeople` (`step≥3`) → member pins for Mamá/Papá and a `Tomi` label inside the Club pin, plus an `Ahora`-equivalent `.map-sharing` caption. | **Partly.** Presence is shown; coordination is not. |
| Does it become a fake dashboard? | It becomes a **stage panel**. `.family-map-stage[data-expanded] { left:100px; top:100px; width:1080px; height:520px }`, `border-radius: 28px`, `box-shadow: 0 54px 120px rgb(0 0 0/.55)`. The phone behind it drops to `opacity: 0.12`. No header, no `Mapa` title, no tab switch, no bottom nav — **all device anatomy is discarded.** | **YES.** Master §6 B5 requires the opposite: *"En `mapa familiar`: zoom out y aparecen bordes/chrome del teléfono: descubrimos que era la pantalla Family/Map."* |
| Does it encode proximity? | No distance, no ETA, no `8 min`. Pin positions are authored percentages: `.map-school { left:24%; top:29% }`, `.map-club { left:69%; top:49% }`, `.map-mom { left:23%; top:75% }`, `.map-dad { left:82%; top:79% }`. | **NO, and it asserts geography that nobody stated.** Script L109 asks *"quién está cerca"*; the screen answers with a decorative arrangement. |
| Does the product have proximity? | **No.** No `distancia` / `cerca` / `km` / ETA anywhere in `screens\presence\**` or `components\family\**`. What exists: `PresenceScreen.tsx:101-109` `getRelativeTime()` → `'Ahora'` / `'Hace 1 min'` / `'Hace 5 min'` / `'Hace 1 h'`; `:69-74` `getStatusLabel()` → `'Compartiendo ubicación'` / `'Desactualizada'` / `'Sin ubicacion'` / `'No comparte'`. The only geometric computation in the codebase is `distanceBetweenMeters` in `services\presenceLocationSharing.ts:125-138`, used internally to throttle publishing. | **The master is wrong here.** §6 B5 asks for *"`8 min` o equivalente"* — a capability the product does not have. → **OPEN-2.** |
| Is `Entrenamiento +1 h` in a place that implies a capability Map does not own? | **Yes, and it is the loudest thing on the map.** `.map-delay` → `background: rgb(201,107,69)` (`#C96B45`, the app brand), `color: #FFFFFF`, `<strong>` at **64.8 px**, text `Entrenamiento +1 h`, positioned at `left:70%; top:16%`. It appears at `step03`, **after** `Colegio` (`step01`) and `Club` (`step02`). Script order is the reverse: the change is L97, the places are L109. | **NO.** See B-12. |
| Does location sharing read as individual and contextual? | **No.** `.map-sharing` = the single global string `Ubicaciones compartidas` at **9 px**, `data-present` from `step03` through `step04`, no toggle, no per-member state, no consent. Script L111: *"**si cada persona decide compartir su ubicación**"*; L137: *"Compartir ubicación no significa estar mirando dónde está alguien todo el tiempo."* | **NO.** See B-14. |
| What does the product actually do? | Per-member opt-in with three sharing modes: `presence.ts:21-31` `PresenceMember { …, sharing_enabled: boolean, status: PresenceMemberStatus }`; `:40-43` `UpdatePresenceLocationPayload { sharing_enabled?, sharing_mode?: 'off' \| 'foreground' \| 'background' }`; `:7-11` `PresenceMemberStatus = 'live' \| 'stale' \| 'unavailable' \| 'sharing_disabled'`. The map filters to sharers only: `PresenceScreen.tsx:207-210` `members.filter(m => getMemberCoordinate(m) && m.sharing_enabled)`. Product copy: `PresenceScreen.tsx:619-620` *"Ubicación familiar / **Compartís solo cuando lo activás.**"*; empty state `:583-588` *"Sin ubicaciones compartidas / Activa compartir para mostrar tu posición al hogar."* Backend default derives sharing from the field, with `sharing_mode ?? 'foreground'` as the safe legacy default (`backend\src\services\presence.locations.service.js:44-50`). | The target's own copy is a **first-person opt-in statement**. The presentation's caption is a **third-person ambient fact**. These are opposites. |

### 10.3 FEED / CONVERSATION — `S06_step05`

| Question | Measurement | Verdict |
|---|---|---|
| Is Feed visually/semantically distinct from Family and Map? | `family-view='feed'`, `family-screen-heading h1` = `'Feed'`, but `.family-switch` is **`opacity: 0`** (`family-screen.css:7`) and the bottom nav still shows the **Family icon selected**. The Feed layer is a child of `.family-workspace`, i.e. spatially inside the Family screen. | **NO.** It is announced as a new surface and presented as a fourth tab of Familia whose tab bar has vanished. |
| Does the technician post belong to Feed and appear as such? | It appears as a Feed article (`Mamá` / `Familia García · Ahora` / `El técnico viene entre las cuatro y las seis.` / `¿Quién puede estar?` / `Responder`) — **one** `article`, **zero** comments, `Responder` with no handler and no thread. | **Formally yes; substantively no.** |
| Where does Feed live in the real product? | **Integration:** `navigation\AppNavigator.tsx:240` `<PrivateStack.Screen name="FeedFamiliar" component={FeedFamiliarScreen} />`; `navigation\types.ts:19` `FeedFamiliar: undefined`. It is **not** in `MoreStackParamList` and **not** in Familia. Its **only** incoming navigation is `screens\MoreScreen.tsx:23-32`: `{ id:'feed', label:'Actividad', description:'Actividad del hogar', icon:'chatbubbles', screen:'FeedFamiliar', isDemo:true }`, rendered with `<StatusBadge label="Demo" tone="warning"/>` at `:93`. | **Not in Familia.** |
| Where does Feed live in the visual target? | **Figma-app:** it does not exist as a Feed. `src\screens\Messages.tsx:1023-1029`, verbatim:<br>`// ── FAMILIA = CONVERSATION (alias legacy; la surface Feed ya no existe) ───────`<br>`// \`family-feed\` se conserva como alias que renderiza la conversación familiar`<br>`// canónica con el shared shell. No hay composer post-centric ni comments.`<br>`export function FamilyFeedScreen() { … return <ConversationScreen convId="c1" /> }`<br>and `:1031-1036` `FeedCommentsScreen` *"la ruta `feed-comments` ya no existe (comments → reply)"* also renders `c1`. Reached from `Más → Mensajes`, whose captured root shows the family thread (`Familia García · 8 · Mariana · compramos pan?`), a `TEMAS` section (*"Separan las conversaciones sobre algo concreto para que puedas retomarlas después"*) and `INTEGRANTES` DMs. | **Not in Familia; it is a conversation, under Mensajes.** |
| Is the post shape real? | **Integration's Feed is a social-post surface and is 100 % mock.** `screens\feed\FeedFamiliarScreen.tsx:16-28` `type Post = { id, authorName, authorInitials, authorColor, timeAgo, text, illustration?, reactions: Reaction[], commentsCount: number }`; `:46-55` `const MOCK_POSTS: Post[]`; `:112` `useState<Post[]>(MOCK_POSTS)`; `:134` local-only prepend. Its imports (`:1-13`) include **no service module at all**; there is no `backend\src\routes\feed*`, `post*`, `comment*` or `conversation*` file. The comment affordances have **no handlers**: `:214-217` `<TouchableOpacity style={S.reactionBtn}>` with no `onPress`; `:224-230` a `commentHint` reading `¿Qué opinas?` with no `onPress`. | **A mock, badged "Demo" in the product itself.** |
| Is there any group-conversation surface at all? | **NOT FOUND** in Integration: 0 matches for `conversation|thread|chat` in `backend\src\**\*.js`; no messaging service among the 156 files in `services\`. | The two targets disagree about what Feed *is* (a post feed vs a conversation), and Integration has not implemented either. |

**Net classification for the Feed territory: PRODUCT SEMANTIC DELTA (triple).** The presentation shows a post surface; Figma-app shows a conversation; Integration shows a mock post feed badged *Demo* and reachable only from *Más*. Master §6 B6 already anticipated this — *"Transición real si Product Truth lo permite; si no, editorial hasta cierre de IA"* — and additionally forbids re-showing WhatsApp (*"No volver a mostrar WhatsApp"*), which rules out the easiest honest option. → **OPEN-3, canonical status `audit/00_AUDIT_NORMALIZATION.md` §N-04: NOT RESOLVED. Session 6 owns final evidence resolution via Product Truth + Figma + Integration. Every Feed recommendation in this document is PROVISIONAL until then and must not harden into a decision.**

### 10.4 Are the three territories blurred? — B-F verdict

**Yes, and the blend is structural, not cosmetic.** Measured:

1. **The tab bar is the ownership signal, and it lies.** `.family-switch` has three items (`Familia`, `Mapa`, `Lugares`) and the Feed state hides all three (`opacity: 0`) while the Feed heading occupies the same `<h1>` slot. The audience is told *"Ahí entra Feed"* (L117) and shown a screen with **no navigation at all**, still wearing Family's bottom-nav selection. Ownership is never transferred.
2. **The map's schedule badge fuses Map with Planner.** `Entrenamiento +1 h` is a Planner-domain fact (Integration: `updatePlannerEvent` PATCHes `/api/planner/events/:id`; `updateHouseholdSchedule` PATCHes `/api/planner/schedules/:id`) rendered in Map's visual space at 64.8 px. After `step03` the audience cannot tell which module owns the training.
3. **The Feed is spatially a child of Map.** In `FamilyDemoScreen/index.tsx:38-40`, `family-feed-product` is a sibling of `family-map-product` inside `.family-workspace`, and `family-feed-product { top: 54px }` is positioned by the same layout rules as the map. The technician post appears 54 px below where the map was.
4. **B-F5 answered directly: yes.** `Entrenamiento +1 h` occupies a place that implies Map owns schedule deltas. It does not, in either target.
5. **B-F8 answered directly: no.** Location sharing is staged as a single ambient caption with no per-person state, which is the visual form of *surveillance*, immediately before a slide whose text says HomePlus is not surveillance.

### 10.5 B-F1 — is there a meaningful visual bridge from individual organisation to household coordination?

**No.** Measured `S05_step03 → S06_step00`: a single `ArrowRight`; `product-planner-layer` and `product-family-layer` are both `position:absolute; inset:0` siblings inside the same `.phone-frame`, and the swap is a 320 ms opacity cross-fade (`--motion-replace-duration`). Nothing widens. The stage composition is byte-for-byte the same 300×620 device at (570,50) on both sides. `HW-B-011` (*"mientras nosotros decimos eso no puede simplemente cambiar la screen a familia porque no tiene sentido, es muy simple el cambio"*) is **CONFIRMED**.

The script's own words define the bridge: L85 *"Hasta acá estamos hablando principalmente de la organización **de cada integrante**"* → L87 *"muchas veces lo que cambia en el día **de una persona** también afecta **al resto**"*. That is a change of **scope**, and the current transition changes only **content**. Master §5 does not prescribe this transition, so there is no frozen instruction being violated — this is a gap in the master as well. → **OPEN-4.**

### 10.6 B-F9 — does the current huge map emphasis preserve product anatomy?

**Partially, and the part it preserves is the part that does not matter.**

| Preserved | Lost |
|---|---|
| The **component** is the real one — `MapDemoScreen` is the same React tree in both states (measured: identical `present` flags on `.map-place`, `.map-person`, `.map-delay`). | The **surface**: no top bar, no `Mapa` title, no `Familia｜Mapa｜Lugares` switch, no bottom nav, no `ADMINISTRAR`. |
| Pin identity and colours (`#B57A1A` Tomi, `#7A3D8A` Mamá, `#2D6A8A` Papá) match the target's palette family. | The **device**: `.home-phone-position` at `opacity: 0.12`, so the product is a ghost behind its own map. |
| The stage's dark field and the app's `#EBEEE6` map surface remain visually distinct. | The **geometry**: `preserveAspectRatio="none"` on a `1000×600` viewBox. In-device the map is stretched **vertically** (scaleX 0.250 vs scaleY 0.333, anisotropy **0.75**); expanded it is stretched **horizontally** (1.080 vs 0.867, anisotropy **1.246**). The distortion *reverses* between the two states. |

**Verdict on the technique, in one sentence:** it enlarges correctly and it is still the wrong tool, because it achieves legibility by taking the product **out of its device** — which is the one thing a product keynote must not do. Full analysis and replacement in §11 and §15.

---

## 11. `Coordinar no es vigilar` — S07 audit

The brief is explicit that large concept typography is valid here if narratively justified, and that this is **not** a generic preference against big type. I have applied that test honestly.

### 11.1 What is on stage

| State | Measured |
|---|---|
| `S07_step00` | `.s07-silence` `background: rgb(6,4,4)`, `opacity: 1`, `z-index: 5`, covering `inset: 0`. `.s07-statement` `opacity: 0`. `.home-planner-sequence[data-exiting='true']` → `opacity: 0; visibility: hidden` with `--motion-exit-duration` (220 ms). |
| `S07_step01` | `.s07-statement` `opacity: 1`, `transform: none`, box **688.81 × 274.53 at (295.59, 222.73)**. Line 1 `Coordinar` — **132 px**, weight **600**, `rgb(245,241,235)`. Line 2 `no es vigilar.` — **132 px**, weight **500**, `rgb(199,160,132)`. |

### 11.2 The four questions

**Is the statement earned by the preceding journey?** — **Formally yes, evidentially no.** The journey S04→S06 does deliver a household-coordination argument: three members, two places, an optional-location claim, a family conversation. But three of its load-bearing props are fabricated or inverted (B-12 schedule badge, B-13 invented geography, B-14 ambient location), and its Feed does not exist as a Feed (B-15/B-16). A boundary statement placed after a compromised demonstration inherits the compromise. This is the substance of `HW-B-019` (*"no está bien toda la coordinación directamente de la parte, el módulo Familia con lo que digo con respecto a lo que se ve"*) — **CONFIRMED**, with a sharper mechanism than the observer gave.

**Does S07 create sufficient silence?** — **Yes, and this is the scene's strongest property.** The product stage exits as a block; a single near-black field settles; there is no logo, no device, no glow, no furniture. Measured across both states, the only painted elements are the veil and the statement. Session 1's hold test recorded `S07` as stable with 0 running animations. `HW-B-018` (*"después soy una screen negra y después pasamos a coordinarnos… está bien"*) is **CONFIRMED** as a positive.

**Does anything compete with it?** — **No.** Nothing is on stage. The two-tone treatment (`#F5F1EB` for *Coordinar*, `#C7A084` at lower weight for *no es vigilar*) creates hierarchy inside the single idea without adding a second idea, and `#C7A084` is a warm tan that is **not** the HomePlus orange — a correct choice, and the only place in Scene B where a warm accent is used without semantic weight.

**Is the 132 px type justified?** — **Yes. Do not reduce it.** NO-UI §5 gives *"Major concept: 56–72 px"*, but that band is written for a screen that may also contain other elements. Measured composition: one text block of 688.81 × 274.53 px in a 1280 × 720 frame = **20.6 % of the canvas area**, centred, with roughly 60 % of the frame empty. At 1920×1080 the type projects to **198 px**. There is one idea, one field, enormous negative space, and the concept is the thesis of the entire film. Master §2.3 lists `Coordinar no es vigilar.` as an **approved** on-screen text, and master §6 B8 prescribes *"Pantalla conceptual limpia. Mantener durante toda la explicación de límites/contexto."* That is exactly what is on stage. The size is a consequence of the composition being correct, not a substitute for it.

**Does the exit toward Scene C preserve continuity?** — **Out of scope beyond the endpoint, but the endpoint is verified.** Master §6 B8 prescribes the handoff: *"aparece aislada card real: `Cumpleaños · Sábado`."* `S08_step00` (outside this audit's scope) does carry that card, per Session 1 §3. The transition `S07_step01 → S08_step00` is a whole-scene unmount/mount (Session 1 §4.6: 270 entering / 517 exiting). No continuity loss is visible from B's side; whether C receives it cleanly is Session 4's question.

### 11.3 The one real S07 issue

**B-19 — the boundary is asserted in type while the stage it describes is still contradicting it.** `S06` ends on a map with `Ubicaciones compartidas` at 9 px, no per-person state, and — two states earlier — a 64.8 px brand-orange `Entrenamiento +1 h` badge. The narration immediately after S07 says *"Compartir ubicación no significa estar mirando dónde está alguien todo el tiempo"*. The audience has just been shown permanent, global, always-on location sharing. Master §2.7 offers the tool: exposure, not text. The fix belongs in S06 (B-13/B-14), not in S07. **Severity: HIGH, owner = S06.**

### 11.4 `HW-B-020` — does the pause have its own state?

**REJECTED.** Measured: `S07` has `stepCount: 2`; `step00` is a state in which the veil has settled and `.s07-statement` is at `opacity: 0` — i.e. the pause *does* have its own state, and the transition into it is a 220 ms veil fade over a 220 ms block exit of the product stage. The walkthrough heard the pause and the phrase arriving together; they are two presses apart. Recorded as **REJECTED**, with the note that whether 220 ms of veil is *enough* silence is an ear-level judgement this audit cannot make (no audio, §2).

---

---

## 12. Scene B issue register

**Scene B contains exactly 1 BLOCKER (`B-01`).** Combined with Scene A's 2 (`A-02`, `A-03`), the Session 2 canonical total is **3 BLOCKERS** — see §1 and `audit/00_AUDIT_NORMALIZATION.md` §N-01.

| ID | Short name | Severity |
|---|---|---|
| **B-01** | Home marks both of Juli's tasks `✓ Completada` while the narration says *pendiente* | **BLOCKER** |
| **B-02** | The final Home state visually inverts attention and completion | HIGH |
| **B-03** | The only "focus" in Scene B is a 1.02 scale | HIGH |
| **B-04** | The date semantics contradict the narration (HOY vs Mañana) | HIGH |
| **B-05** | Three rows on a 1280×720 stage with ~980 px of empty frame | MEDIUM |
| **B-06** | `Tareas` is the page title; `Planner` never appears | HIGH |
| **B-07** | Tareas shows zero pending work and zero responsabilidades | HIGH |
| **B-08** | Calendario shows no time and no schedules | HIGH |
| **B-09** | Planes shows Scene C's content with the three literal strings master C2 forbids | HIGH |
| **B-10** | No bridge from individual organisation to household coordination | HIGH |
| **B-11** | The map enlargement is a layout-size mutation of a live component outside its device | HIGH |
| **B-12** | `Entrenamiento +1 h` is a 64.8 px brand badge on a map that does not own schedules | HIGH |
| **B-13** | The map asserts geography the narration never stated and the product cannot know | HIGH (+ OPEN-2) |
| **B-14** | Shared location is staged as an always-on global state | HIGH |
| **B-15** | Feed is presented inside the Familia shell with its tab bar hidden | HIGH |
| **B-16** | The technician post is a mock capability with no thread and no way back | HIGH |
| **B-17** | Familia lists 3 of 4 members and omits the phone's own user | MEDIUM |
| **B-18** | The `Lugares` tab is permanently dead | LOW |
| **B-19** | S07's boundary is asserted over a stage that contradicts it | HIGH |
| **B-20** | POSITIVE — the shell, the segmented controls and the navigation are faithful | POSITIVE |
| **B-21** | POSITIVE — S07 is a correct singular-concept screen | POSITIVE |
| **B-22** | SCRIPT ISSUE — "conversaciones" attributed to Familia (SI-05); "Feed" names a module neither target has | SCRIPT ISSUE |

---

### **B-01 — Home marks both of Juli's tasks `✓ Completada` while the narration says *pendiente***
- **SCENE:** B — Home
- **CURRENT STATE(S):** `S04_step03`, `S04_step04`, `S04_step05`, and persisting into `S05_step00`…`S05_step03`
- **SCRIPT MOMENT:** L71 *"que tiene que llevar una autorización y que todavía tiene una tarea del colegio"*; L73 *"Así puede entender rápidamente qué tiene pendiente y qué le corresponde"*
- **MASTER INTENT:** §6 B1 *"En `Necesita atención` deben convivir: Educación Física; autorización; tarea del cole."* — three coexisting pending items; no completion anywhere in B1. §2.3 (no on-screen text that contradicts or merely repeats the speaker).
- **CURRENT RUNTIME EVIDENCE:** measured at `S04_step03`: `authorization` → `data-completed="true"`, computed `text-decoration-line: line-through`, `.task-completion-label` = **`Completada`**, `.task-status-mark` `aria-label="Completada"`. At `S04_step04`: same for `schoolTask`. At `S04_step05`: both. Source: `HomePlannerSequence.tsx:36` `authorizationCompleted={homeStep >= 3}` / `schoolTaskCompleted={homeStep >= 4}`; `:20` `homeStep = slideIndex >= 4 ? 5 : …` keeps it true across Planner, Family and S07. Treatment: `home-screen.css:79-82`; label from `HomeRow.tsx:27`; aria from `TaskCompletionMark.tsx:3`. Consequence measured at `S05_step00`: `.planner-section-label` = **`COMPLETADAS`**, both `.planner-task-row` `data-completed="true"` with `line-through` and `Completada` metas (`plannerData.ts:13-14` `completed: true`).
- **FIGMA TARGET EVIDENCE:** `fig-home.json` — Home rows carry `Completar` (an action), `Me encargo` (a claim), `Sin responsable`, `Internet vencido · 38.450 ARS · Venció hace 5 días`. **No row is rendered as completed.** Completions appear only in the separate `QUÉ CAMBIÓ` activity block: *"hace 1 h · Pagar expensas se completó"*, *"ayer · Regar las plantas del balcón se verificó"*.
- **INTEGRATION / PRODUCT EVIDENCE:** `front\mi-front-limpio\services\planner\homeSummaryTypes.ts:34` — `export type HomeSummaryTaskStatus = 'pending' | 'awaiting_verification';` with a hard parser whitelist at `:131-134` (`ALLOWED_TASK_STATUSES = new Set(['pending','awaiting_verification'])`). `screens\home\HomePlannerSections.tsx:49-52` — `pending: 'Pendiente', awaiting_verification: 'Por verificar'`. The filled checkmark + `Tarea completada` exist **only** as a 420 ms optimistic flash: `HomePlannerSections.tsx:280-284` `setTimeout(… , 420)` clearing `completionVisualTask`, plus a 2 s `<UndoToast … duration={2000}>` at `:385-391`. Backend restricts the pool accordingly: `backend\src\services\planner.summary.service.js:405-406` — *"`counts.tasks` = number of pending or awaiting_verification tasks"*. **No `line-through` exists in Home** (the only two in the app are `plannerShared.ts:1452` plan milestone and `TaskDetailScreen.tsx:219` checklist item).
- **HUMAN WALKTHROUGH:** `HW-B-002`, filed as *"LA OBSERVACIÓN MÁS GRAVE DEL WALKTHROUGH"* and as a BLOCKER candidate: *"primero se ilumina Educación Física, después **se tacha** llevar autorización, después **se tacha** la tarea de matemáticas. Pero **nunca dijimos que lo completamos**, dijimos que las tiene… nada de lo que decimos tiene que ver con que se completen"*.
- **CLASSIFICATION:** NARRATIVE + UX + **FUNCTIONAL CAPABILITY DELTA** (a capability the product does not have)
- **SEVERITY:** **BLOCKER**
- **VERDICT:** **REJECT. The walkthrough's BLOCKER candidacy is upheld.** The screen asserts the opposite of the sentence being spoken, in the strongest available form — an explicit word (`Completada`), a strikethrough, a filled checkmark and an `aria-label` — and the state then leaks into Planner, where it becomes a category heading. It is not a styling choice: the product's Home row type has exactly two legal values and `completed` is not one of them.
- **TARGET BEHAVIOR:** `authorizationCompleted` and `schoolTaskCompleted` are always `false`. The three rows coexist as the attention set. If a completion must be shown at all, it is shown the way the product shows it: after a visible tap, for 420 ms, as a fill plus a `Tarea completada` toast — **and this presentation has no tap, so it should show none.** In Planner, Tareas keeps `Pendiente` rows and the section heading reads `Tareas` or `NECESITA ATENCIÓN`, never `COMPLETADAS`.
- **WHY:** Master §6 B1 freezes three *pending* items in the attention set. The narration's verb is *"tiene pendiente"*. A `Completada` chip is the single most legible 40 px object on a 300 px-wide device, so it cannot be read as anything else. The presenter will be saying one thing and the screen will be saying its opposite for roughly six seconds, in the middle of the sentence that defines what the product is for.

---

### **B-02 — The final Home state visually inverts attention and completion**
- **SCENE:** B — Home
- **CURRENT STATE(S):** `S04_step05`
- **SCRIPT MOMENT:** L73 *"qué tiene pendiente y qué le corresponde"* — the beat the final state is supposed to deliver
- **MASTER INTENT:** §6 B1 *"Home le muestra primero lo que necesita su atención"*; the attention set must remain the visual owner of the final state
- **CURRENT RUNTIME EVIDENCE:** at `S05_step00`… the same cascade is visible at `S04_step05`: `educationPhysical` has `data-attention="true"` but `background-color: rgb(255,255,255)` — **no tint** — while the two `data-completed="true"` rows carry `rgb(244,238,233)` (`#F4EEE9`). Cause, in CSS source order: `home-screen.css:76` `[data-attention='true'] { background: var(--home-brand-soft) }` is overridden by `:79` `[data-completed='true']` for the done rows, and by `:83` `[data-complete='true']:not([data-completed='true']) { background: var(--home-surface) }` for the still-pending event row. Measured in the same state: `topBar` opacity 0.84, `navigation` opacity 0.82, `home-current-date` 0.82, section headings 0.84.
- **FIGMA TARGET EVIDENCE:** `fig-home.json` — `NECESITA ATENCIÓN` is the **first and visually strongest** section, with `Ver 4 más`; the two attention rows are the only rows carrying an action affordance (`Completar`). Later sections (`HOY`, `PRÓXIMO`, `TE PUEDE SERVIR`) are visually quieter.
- **INTEGRATION / PRODUCT EVIDENCE:** `screens\planner\PlannerTasksScreen.tsx:308-313` `isAttention()` and `:574-577` render `NECESITA ATENCIÓN` **first**, above `HOY`, `PRÓXIMAS`, `SIN FECHA`.
- **HUMAN WALKTHROUGH:** not separately named; it is the visible consequence of `HW-B-002`'s mechanism.
- **CLASSIFICATION:** VISUAL WEIGHT (cascade-order defect) + NARRATIVE
- **SEVERITY:** **HIGH**
- **VERDICT:** **REJECT.** At the exact moment the speaker concludes *"esto es lo que tiene pendiente"*, the one row that is genuinely pending is the only un-tinted card on the screen, and the two finished rows are the tinted ones. The emphasis has been placed on the wrong side of the sentence. This is a pure CSS source-order bug, not a design decision — the same file declares the correct rule for `attention` and then overrides it.
- **TARGET BEHAVIOR:** at the final Home state, the three attention rows hold the tint; the chrome (top bar, date, section headings, nav) recedes to 0.82–0.84 as it already does. No completed row participates in the tint at all.
- **WHY:** Master §6 B1 makes the attention set the protagonist of the scene. `home-scene.css:47` even carries the comment *"The final attention belongs to the three pending items, not the app chrome"* — the intent is documented in the file and then defeated by rule order three lines later.

---

### **B-03 — The only "focus" in Scene B is a 1.02 scale**
- **SCENE:** B — Home, Planner, Map
- **CURRENT STATE(S):** `S04_step02`, `S04_step03`, `S04_step04`; measured across all 37 states
- **SCRIPT MOMENT:** L71 (three named items), L79 (two named things), L81 (three named things)
- **MASTER INTENT:** §6 B1 *"Educación Física recibe un único zoom/foco alrededor de **120–125 %**"*; NO-UI §6 caps `Strong UI focus` at **maximum 115 %** and `Micro focus` at `100 → 108 → 100`
- **CURRENT RUNTIME EVIDENCE:** `--home-stage-focus-scale: 1.02` (`homeTokens.ts:13` `stage: { focusScale: 1.02, … }`), applied as `.home-demo-row[data-focused='true'] .home-row-copy { transform: scale(var(--home-stage-focus-scale)) }` (`home-screen.css:86`). Measured computed transform on the focused copy: **`matrix(1.02, 0, 0, 1.02, 0, 0)`** at `S04_step02` (Ed. Física), `S04_step03` (autorización), `S04_step04` (tarea). The largest non-stage transform scale observed anywhere in the 37 states is **1.0178**; the only larger value anywhere is the phone's own `--phone-scale` of 1.08 in S10/S15–S17. Session 1 §5.2 reached the same conclusion from the other direction (*"there is no local visual focus zoom anywhere in the presentation"*), and now the cause is identified: 1.02 is the configured value.
- **FIGMA TARGET EVIDENCE:** the target's own type floor is 9–13 px logical at a 430 px viewport (`fig-home.json` `smallestFonts: [10,11,11.5,12,12.5]`; `fig-cal-Tareas.json` `[9,10,11,12,13]`). **The target is not bigger.** This is the decisive fact for §15: legibility cannot be delegated to the target's typography.
- **INTEGRATION / PRODUCT EVIDENCE:** n/a — this is presentation staging.
- **HUMAN WALKTHROUGH:** `HW-B-003` — *"primero se ilumina Educación Física… no se ilumina más Educación Física, o sea **no sé si lo haría exactamente así**"*. The observer is unsure of the treatment; the measurement shows the treatment is 2 %.
- **CLASSIFICATION:** VISUAL EMPHASIS (technique mis-specified)
- **SEVERITY:** **HIGH**
- **VERDICT:** **REJECT.** A 2 % scale on a 20 px title is a 0.4 px change. It is below the threshold of perception on a projector and cannot function as focus. **Master inconsistency recorded:** §6 B1 asks for 120–125 % while NO-UI §6 caps strong UI focus at 115 %. The presentation must land at **108–115 %** and the master should be reconciled to that (→ OPEN-5).
- **TARGET BEHAVIOR:** `LOCAL VISUAL EMPHASIS` by **transform scale at 1.10–1.15** on the row's copy block only, combined with **exposure** on everything else (1.0 for the focused row, 0.55–0.65 for the rest). Constraints, per §20: **no reflow, no scroll, no sibling movement, no geometry change.** The row's box stays 282 px wide inside a 282 px screen at every step; only the copy transform and the sibling opacities change.
- **WHY:** NO-UI §6's `Micro focus 100 → 108 → 100` and `Strong UI focus ≤ 115 %` are the measured-to-work values. 1.02 is not a focus device; it is a rounding artefact that happens to be written as a token.

---

### **B-04 — The date semantics contradict the narration**
- **SCENE:** B — Home
- **CURRENT STATE(S):** `S04_step00` … `S04_step05`
- **SCRIPT MOMENT:** L71 *"mañana tiene Educación Física, que tiene que llevar una autorización y que todavía tiene una tarea del colegio"* — all three are **tomorrow**
- **MASTER INTENT:** §3 canonical data: *"Juli | 10 años; Educación Física; autorización; tarea escolar."* · NO-UI §18 canon: *"Juli: 10 años · Educación Física · 08:00 · Llevar autorización · Tarea del cole"*
- **CURRENT RUNTIME EVIDENCE:** measured section headings and row leads: `HOY` contains `Llevar autorización` (lead: empty circle, no date) and `Tarea de Matemática` (lead: empty circle, no date); `PRÓXIMAMENTE` contains `Educación Física` (lead: `Mañana`, brand orange, 14 px). Stage date: `Domingo, 16 de agosto`. So **two of the three items the speaker places on tomorrow are labelled today.** The source is aware of the inconsistency: `plannerData.ts:17` carries the comment *"Monday 17 August 2026 is tomorrow relative to the frozen Home date"* and `schoolEvent.dateLabel` = `'Lunes 17 · Mañana'` — the Planner's calendar surface gets it right while Home does not.
- **FIGMA TARGET EVIDENCE:** Figma's Home separates the two registers *structurally*: a `NECESITA ATENCIÓN` section (which is where overdue and today-critical live) above `HOY`, `PRÓXIMO` and `SIN FECHA`. `PRÓXIMO` items carry explicit day labels (`Sáb 02`, `Jue 30`, `15 mar`).
- **INTEGRATION / PRODUCT EVIDENCE:** `screens\planner\PlannerTasksScreen.tsx:327-336` groups strictly by `due_date` — `attention` / `today` / `upcoming` / `undated`, with `isAttention()` at `:308-313` catching `awaiting_verification`, past-due `pending`, and `priority === 'high'`. A task cannot be *displayed* as today unless its `due_date` **is** today.
- **HUMAN WALKTHROUGH:** not named; the observer was looking at the completion defect.
- **CLASSIFICATION:** NARRATIVE (data semantics vs speech)
- **SEVERITY:** **HIGH**
- **VERDICT:** **REJECT.** The narration's three items are one set; the screen splits them across two sets and puts two of them in the wrong one. Combined with B-01 this is the second way the Home scene misstates the same sentence.
- **TARGET BEHAVIOR:** Either (a) all three rows sit under a single `MAÑANA` / `PRÓXIMAMENTE` grouping with `Educación Física · 08:00` carrying its time, or (b) the narration's "mañana" is honoured by giving both tasks the same tomorrow date as the event. Option (a) is closer to the target's grammar. In Integration terms: give both tasks `due_date = tomorrow` and `requiresVerification = false`, and let `Educación Física` be the `event` with `08:00`.
- **WHY:** Master §3 canon gives all three items to Juli without dates, and NO-UI §18 gives the event a time. Nothing in the canon says two of them are *today*. The presenter says "mañana" three times in one sentence; the screen must agree at least once.

---

### **B-05 — Three rows on a 1280×720 stage**
- **SCENE:** B — Home
- **CURRENT STATE(S):** `S04_step00` … `S04_step05`
- **SCRIPT MOMENT:** L65–L73
- **MASTER INTENT:** §2.9 (the phone represents product experience), §1 stress test *"Legibilidad en proyección — PASS CON REGLAS: … No mostrar UI completa si el detalle importante deja de leerse"*; NO-UI §7 primary phone 820–880 px visual height on a 1920×1080 logical canvas (the presentation's canvas is 1280×720, so 820 px would be 114 % of the frame height — the presentation's 620 px device is the correct proportional choice for its own canvas and must **not** be inflated to satisfy that number)
- **CURRENT RUNTIME EVIDENCE:** device `300×620` at `(570, 50)` = **23.4 % × 86.1 %** of the canvas; app screen client `282×602`, constant. Device centre at x = **720** vs canvas centre **640** — the composition sits 80 px right of centre, so the left margin is 570 px and the right is 410 px. Content: 3 rows of `min-height: 96px` (`home-screen.css:57`), 2 section headings at 11 px, one date line at 15 px, plus the 5-item bottom nav with a 56 px brand FAB. Projected at 1.5×: title 30 px, assignee **18 px**, section heading **16 px**. Row titles wrap to two lines (`Llevar / autorización`, `Tarea de / Matemática`) because the row is 282 px wide with a 52 px event lead — visible in `states/S04_step05.png`.
- **FIGMA TARGET EVIDENCE:** `fig-home.png` at 430 px viewport shows a dense, scannable Home with **five** sections and per-section `Ver N más` affordances — `NECESITA ATENCIÓN`, `HOY`, `PRÓXIMO`, `TE PUEDE SERVIR`, `QUÉ CAMBIÓ`. Its own lowest type is 10–11 px. So the target solves the density problem with **more content and explicit overflow affordances**, not with bigger type.
- **INTEGRATION / PRODUCT EVIDENCE:** `HomePlannerSections.tsx` composes four sections plus inventory alerts (`getInventoryAlerts`, `:156`), attention/activity requests (`useHomeDailySignals.ts:62-65`) and `listHouseholdSchedules` (`:65`) from one `GET /api/planner/summary`.
- **HUMAN WALKTHROUGH:** `HW-B-004` — *"se ve 'llevar autorización', 'tarea matemática' **y nada más**. No hay tareas sin completar o demás cosas"*.
- **CLASSIFICATION:** VISUAL DENSITY / READABILITY
- **SEVERITY:** **MEDIUM**
- **VERDICT:** **REJECT as a content problem; ACCEPT the device size.** The 300×620 device on a 1280×720 canvas is a defensible proportion (NO-UI §7's 820 px band is written for a 1920×1080 canvas; scaled to 1280×720 it lands at ≈ 617 px, which is what the presentation uses). The defect is that **three rows cannot carry a scene.** The target fills the same device with five sections and overflow affordances; the presentation fills it with three rows and ~200 px of empty card.
- **TARGET BEHAVIOR:** fill the device the way the target does — the attention set, then `HOY`, then `PRÓXIMO`, with `Ver N más` on the sections that do not fit. Then use **SELECTIVE EXPOSURE + CAMERA/CROP** (§15) on the three rows that carry the sentence. Do **not** enlarge the device and do **not** inflate the type.
- **WHY:** Master §1's legibility rule is conditional — *"No mostrar UI completa si el detalle importante deja de leerse"*. Right now the device is large enough and the content is too thin: the eye lands on the brand FAB in the bottom nav, which is the most saturated object in the frame after the `Completada` chips.

---

### **B-06 — `Tareas` is the page title; `Planner` never appears**
*(Full evidence in §9.1.)*
- **SCENE:** B — Planner · **CURRENT STATE(S):** `S05_step00`…`S05_step03` · **SCRIPT MOMENT:** L75 *"entra a Planner"*
- **MASTER INTENT:** master §2.9 (real navigation is real navigation) and the module identity implied by §6 B2, whose whole section is titled *Planner*
- **CURRENT RUNTIME EVIDENCE:** `.planner-heading h1` = `'Tareas'` / `'Calendario'` / `'Planes'`, 26 px, weight 700; the string `Planner` is absent from the surface.
- **FIGMA TARGET EVIDENCE:** `fig-cal-Tareas.json` → `<h1>Planner</h1>` **24 px**, `heading: [{tag:'H1', text:'Planner', fs:'24px'}]`, with `Tareas | Calendario | Planes` as tabs.
- **INTEGRATION / PRODUCT EVIDENCE:** `screens\planner\PlannerScreen.tsx:700` `<AppText variant="title1" weight="600" accessibilityRole="header">Planner</AppText>`; `navigation\plannerNavigationContract.ts:41-46` `PLANNER_TAB_KEYS = ['tasks','events','plans']`.
- **HUMAN WALKTHROUGH:** `HW-B-006` — *"Aparece 'tareas, calendario y planes' como **título del módulo**, cuando el título del módulo es **Planner** y el selector dice tareas, calendario, planes"*.
- **CLASSIFICATION:** VISUAL / HIERARCHY — **VISUAL TARGET DELTA**
- **SEVERITY:** **HIGH**
- **VERDICT:** **REJECT. `HW-B-006` CONFIRMED against both targets independently.** The tab label is occupying the module-title slot. Note the presentation's 26 px is *larger* than the target's 24 px — so this is not a fidelity-of-size problem, it is a hierarchy-assignment problem.
- **TARGET BEHAVIOR:** the module surface shows `Planner` as its page title (24–26 px, weight 600, accessibilityRole `header`) with `Tareas | Calendario | Planes` beneath it as the segmented control. This is a one-line structural change, not a redesign — and it is a change the presentation should make, not Figma.
- **WHY:** Both targets agree, and both put `Planner` in the `<h1>` with `accessibilityRole="header"`. Matching them costs one element move and removes the contradiction between the spoken *"entra a Planner"* and the largest word on screen.

---

### **B-07 — Tareas shows zero pending work and zero responsabilidades**
*(Full evidence in §9.3.)*
- **SCENE:** B — Planner · **CURRENT STATE(S):** `S05_step00`, `S05_step01`
- **SCRIPT MOMENT:** L79 *"En Tareas puede ver **lo que tiene que hacer** y **las responsabilidades que le corresponden**"* — one of exactly two things Tareas is said to show
- **MASTER INTENT:** §6 B2 *"La versión final de concepto contiene: `tareas · responsabilidades · eventos · horarios · planes`… **Mostrar una responsabilidad recurrente dentro de Tasks.**"*
- **CURRENT RUNTIME EVIDENCE:** `.planner-section-label` = **`COMPLETADAS`**; both `.planner-task-row` `data-completed="true"` with `line-through` and `Completada` metas; `.planner-unchecked` count = **3**, all three belonging to the **Planes** panel. Zero occurrences of `Responsabilidades` in any of the 37 states.
- **FIGMA TARGET EVIDENCE:** captured at runtime, `fig3-planner-responsabilidades.png` — `‹ Responsabilidades`, sections `DE LA CASA · 3` / `PAUSADAS · 1`, rows with recurrence (`Todos los días`, `Mar y vie`, `Cada 3 días`), assignment policy (`Va rotando`, `Cualquiera puede`, `Siempre la misma`) and assignee avatars. In Tareas, Figma also renders a `Pendientes | Responsabilidades` secondary control (`fig-cal-Tareas.json` body text) and a full task taxonomy: `REVISIÓN · 2`, `VENCIDAS · 2`, `HOY · 8`, `MAÑANA · 11`, `PRÓXIMAS · 25`, `SIN FECHA · 2`.
- **INTEGRATION / PRODUCT EVIDENCE:** `screens\planner\PlannerTasksScreen.tsx:560-561` — the entry row `Responsabilidades / Rutinas y obligaciones de la casa` navigating to `'Responsibilities'`, registered at `navigation\HomeTabNavigator.tsx:214-217`. Data model `services\plannerResponsibilities.ts:5-6,19`: `ResponsibilityAssignmentKind = 'fixed' \| 'rotation' \| 'claimable' \| 'unassigned'`, `ResponsibilityScheduleKind = 'daily' \| 'weekdays' \| 'interval' \| 'monthly' \| 'after_completion'`, `assignment_kind` + `schedule_kind` on the entity; lifecycle `Activas` / `Pausadas` / `Archivadas` (`ResponsibilitiesScreen.tsx:10`). Task taxonomy `PlannerTasksScreen.tsx:327-336, 574-577, 39-46, 63-68`: views `Pendientes` / `Hechas` / `Archivadas`, filters `Vencidas` / `Hoy` / `Próximas` / `Sin fecha`.
- **HUMAN WALKTHROUGH:** `HW-B-004` (*"Planner muestra 2 ítems y nada más. No hay tareas sin completar"*) and `HW-B-005` (*"No se ve la parte donde aparece responsabilidades"*), both **CONFIRMED**.
- **CLASSIFICATION:** NARRATIVE — **FUNCTIONAL CAPABILITY DELTA** (capability exists in both targets, absent here)
- **SEVERITY:** **HIGH**
- **VERDICT:** **REJECT.** Tareas is asked to demonstrate two things and demonstrates neither: the work it shows is finished, and the responsibility it must show does not exist on stage. The compounding of B-01 with B-07 means the *entire* Planner/Tareas scene presents a household with nothing to do — immediately after Home told the audience Juli has three pending items. The two scenes contradict each other.
- **TARGET BEHAVIOR:** the Tareas panel shows Juli's **pending** items — the two authorization/school-task rows as `Pendiente`, plus at least one more pending task so the panel is not a two-row list — grouped the way the target groups them, with the `NECESITA ATENCIÓN` / `HOY` / `SIN FECHA` headings the product actually uses. Alongside them, the `Responsabilidades / Rutinas y obligaciones de la casa` entry row is visible, and on its press the real recurring-responsibility surface appears with at least one live chore showing **recurrence + assignment policy + assignee** (e.g. `Lavar los platos · Todos los días · Va rotando · Tomi`). That is master §6 B2's "una responsabilidad recurrente" delivered with real data.
- **WHY:** Master §6 B2 names the concept list `tareas · responsabilidades · eventos · horarios · planes` and then instructs *"Mostrar una responsabilidad recurrente dentro de Tasks"* — the concept is not enough, the instance is required. Both targets can supply it, so this is not blocked on product work.

---

### **B-08 — Calendario shows no time and no schedules**
*(Full evidence in §9.4.)*
- **SCENE:** B — Planner · **CURRENT STATE(S):** `S05_step02`
- **SCRIPT MOMENT:** L81 *"En Calendario puede ver **sus eventos**, **sus horarios** y **cuándo ocurre cada cosa**"* — three things
- **MASTER INTENT:** §6 B2 *"Eventos y horarios viven en la superficie calendario correspondiente: Event = ocasión; Schedule = obligación recurrente como colegio/trabajo."*
- **CURRENT RUNTIME EVIDENCE:** week strip `17–23 AGO` with day 17 selected in brand orange; section label `LUNES 17 · MAÑANA`; one event row `Educación Física` / `Juli · Colegio`. Measured scan for any clock pattern across all four S05 states returned **only `9:41`**, which is the iOS status bar. No `HH:MM`, no duration, no recurrence, no second entity.
- **FIGMA TARGET EVIDENCE:** `fig2-planner-calendario` captured at runtime (`nav=calendario`, `heading: Planner`); Figma's calendar surface is `CalendarRoot` + a separate `HorariosScreen`.
- **INTEGRATION / PRODUCT EVIDENCE:** `screens\planner\PlannerCalendarScreen.tsx:46-49` — `type AgendaRow = { kind: 'event' | 'task' | 'schedule'; … }`, a three-way agenda union; `:436` — creation toggle `[{value:'event',label:'Evento'},{value:'schedule',label:'Horario'}]`; `:396` — empty state *"No hay eventos, horarios ni tareas para este día."*; `services\plannerSchedules.ts:5-17` — `HouseholdScheduleBlock { days_of_week: number[], start_minutes, end_minutes, color_key, … }`; `:47` `getSchedulePrivacy` → `{ is_visible_to_household }` with per-person RLS in `backend\src\services\planner.schedules.service.js:63-85` (RPC `can_view_household_schedule`).
- **HUMAN WALKTHROUGH:** `HW-B-008` (ask for *"los de su familia"* — **REJECTED as an unauthorised widening**, see §17) and `HW-B-009` (the observer's own point that *"horarios justamente cumple con la misma recurrencia de responsabilidades"* — **CONFIRMED and stronger than stated**: `schedule_kind` on responsibilities and `days_of_week`/`start_minutes`/`end_minutes` on schedules are the same recurrence concept in two modules).
- **CLASSIFICATION:** **FUNCTIONAL CAPABILITY DELTA** (exists, unshown)
- **SEVERITY:** **HIGH**
- **VERDICT:** **REJECT.** The narration's third clause — *"cuándo ocurre cada cosa"* — is the one clause an agenda exists to satisfy, and the stage shows no time at all. NO-UI §18's canon even supplies the value (`Educación Física · 08:00`) and the presentation leaves it out. `HW-B-009`'s observation about recurrence symmetry is correct and is a genuine product insight the presentation could stage: the same recurrence concept governs `horarios` and `responsabilidades`.
- **TARGET BEHAVIOR:** the Calendario panel shows the event **with its time** (`Educación Física · 08:00 · Lunes 17`) **and** one recurring schedule row carrying its recurrence in words (`Entrenamiento · Mar a Vie · 18:00–19:00`, or `Colegio · Lunes a Viernes · 08:00–16:30`). One row is enough to prove the surface holds both entity kinds; two rows and one time label prove all three clauses of L81. Respect the script's *"sus"* — show Juli's, not the household's (see §17, `HW-B-008`).
- **WHY:** Master §6 B2 assigns events and schedules to the calendar surface explicitly and distinguishes them. A calendar with no times is a date picker, not an agenda, and it cannot answer the question the scene is built around.

---

### **B-09 — Planes shows Scene C's content with the three literal strings master C2 forbids**
*(Full evidence in §9.5.)*
- **SCENE:** B — Planner (content owned by C) · **CURRENT STATE(S):** `S05_step03`
- **SCRIPT MOMENT:** L83 *"Y en Planes puede organizar cosas más grandes, que no se resuelven con una sola tarea sino que necesitan varios pasos."* — a generic statement
- **MASTER INTENT:** §6 B2 *"Después entrar a Plans. **No explicar demasiado; la UI debe probarlo.**"* · §7 C2 verbatim: *"**No usar como tasks literales** `Repartir tareas / Preparar cosas / Comprar lo que falta`"*, approved examples `Confirmar invitados`, `Preparar torta`, `Decoración`, `Comprar globos`, `Bebidas`, `Comida`
- **CURRENT RUNTIME EVIDENCE:** plan heading `Cumpleaños`, meta `Sábado · 3 pasos pendientes`, steps `Repartir tareas` / `Preparar cosas` / `Comprar lo que falta` — the forbidden triple, verbatim, on stage one full scene before the narration reaches them.
- **FIGMA TARGET EVIDENCE:** `fig-cal-Planes` — six plans expressed as **progress + deadline + remaining count** (`Mudanza de mamá 33 %`, `Comprar auto · Ahorro $650.000 / $5.000.000`, `Puesta a punto de la casa 19 % · Faltan 21 cosas`). No plan is a three-line text list.
- **INTEGRATION / PRODUCT EVIDENCE:** **zero** matches for any of the six master-approved party strings, anywhere in the repository including `docs/`. Real task titles are concrete household items (`seed-demo-familia-1-test.js:335,344,353,362,371,380`). `Cumpleaños` as a **Plan/Preset does not exist** — the only 5 matches are a profile field (`services\family.ts:31` `date_of_birth`), a profile row (`ProfileScreen.tsx:320`), a form placeholder (`EventForm.tsx:551` *"Ej. Control médico, Cumpleaños de Ana…"*), one mock, and one SQL comment (`supabase\migrations\202606210005_events.sql:5`).
- **HUMAN WALKTHROUGH:** `HW-B-010` — the observer **explicitly pardons** the lack of Plan detail (*"acá no entramos en detalle con eso, lo dejamos porque más adelante Bernardo lo explica"*). The walkthrough did not notice the forbidden strings or the Scene-C pre-emption.
- **CLASSIFICATION:** VISUAL / NARRATIVE ORDER + COPY — **PRESENTATION-SPECIFIC ADAPTATION gone wrong** (a provisional demo surface is fine; a forbidden literal is not)
- **SEVERITY:** **HIGH**
- **VERDICT:** **REJECT on two independent grounds.** (a) Master §7 C2 names the exact three strings on screen and forbids them. (b) Showing the specific `Cumpleaños` plan at S05 spends Scene C's reveal at B's expense: L146–L153 becomes a beat the audience has already seen.
- **TARGET BEHAVIOR:** `S05_step03` shows **a** plan with **real household steps and real progress** — the target's own shape: title, a percentage or remaining count, a date, and two or three concrete steps with checkboxes. The plan must not be `Cumpleaños`; Scene C introduces that. On-screen steps are concrete household items, never the abstract triple.
- **WHY:** Master §6 B2's instruction is *"the UI must prove it"* — proof requires structure (a plan with steps and progress), not a specific instance. The presentation supplied the instance and thereby both broke a frozen copy rule and stole the next scene.

---

### **B-10 — No bridge from individual organisation to household coordination**
- **SCENE:** B — Planner → Family · **CURRENT STATE(S):** `S05_step03 → S06_step00`
- **SCRIPT MOMENT:** L85–L89 *"Hasta acá estamos hablando principalmente de la organización **de cada integrante**. Pero en una casa, muchas veces lo que cambia en el día **de una persona** también afecta **al resto**. Ahí entra Familia."*
- **MASTER INTENT:** no frozen instruction exists for this transition — master §6 goes straight from B2 (Planner) to B3 (*"Juli → Tomi: No negro. Bajar exposición + blur…"*) and B5 (Map). **Recorded as a gap in the master, not only in the implementation.**
- **CURRENT RUNTIME EVIDENCE:** one `ArrowRight`. `product-planner-layer` and `product-family-layer` are `position:absolute; inset:0` siblings inside the same `.phone-frame` (`home-planner-sequence.css:1-3`); the swap is a 320 ms opacity cross-fade. The stage composition is **identical** on both sides: device `300×620` at `(570, 50)`, app screen `282×602`. Nothing widens, nothing scales, no editorial mark, no shared element travels. `HW-B-011` — *"no puede simplemente cambiar la screen a familia porque no tiene sentido, es muy simple el cambio"* — **CONFIRMED**.
- **FIGMA TARGET EVIDENCE:** Figma's Familia orders its own content as the widening: `Familia | Mapa | Lugares`, opening on `4 integrantes`. That is the *destination's* internal grammar; it does not supply a *transition*.
- **INTEGRATION / PRODUCT EVIDENCE:** `HomeTabNavigator.tsx:351-357` (Home tab), `:190-191` (`PlannerStack` with `PlannerHome`), `:359-365` (`FamilyTab`) — the product does treat Family as a peer tab, and `FamilyScreen.tsx:51` `useState<'people' | 'map'>('people')` opens on people. Consistent with the presentation's destination.
- **HUMAN WALKTHROUGH:** `HW-B-011` **CONFIRMED**.
- **CLASSIFICATION:** MOTION + NARRATIVE (missing beat)
- **SEVERITY:** **HIGH**
- **VERDICT:** **REJECT.** The script's hinge is a change of **scope** (*one member* → *the household*). The stage delivers a change of **content** at identical framing. The audience is told "we have been talking about one person" while looking at exactly the same one-person screen.
- **TARGET BEHAVIOR:** a **scope-widening beat**, ~1.2–1.6 s, speaker-triggered at L87. Cheapest correct version: hold on Juli's Home, then a **stacked exposure cascade** — Juli's rows drop to ~0.35 in sequence while the other three household members' identity enters at the same positions (the family avatars from Scene A, as a **SHARED_ELEMENT** callback), then the phone re-presents as Familia. This keeps phone geometry untouched (no reflow, no scroll, no sibling movement) and uses only opacity + the arrival of new elements. It also pays off master §2.5's mandatory `Juli/Tomi/Mamá/Papá` continuity, which Scene A never establishes.
- **WHY:** Master §6 B7 later assumes Family is a *join* ("Mostrar brevemente lista real de personas… después salir de UI hacia callbacks"). Entering Family without the widening means the join has no first half. And per §20 the fix must not resize anything — exposure and shared elements are the correct tools.

---

### **B-11 — The map enlargement is a layout-size mutation of a live component outside its device**
*(Full treatment in §11 and §15; the measurement is repeated here so the issue is self-contained.)*
- **SCENE:** B — Family / Map · **CURRENT STATE(S):** `S06_step00 → S06_step01 → S06_step02 → S06_step03 → S06_step04`
- **SCRIPT MOMENT:** L109–L111 *"También importa dónde queda el club, quién está cerca… en el mapa podemos tener esos lugares…"*
- **MASTER INTENT:** §6 B5 *"En `Y ahí el horario solo ya no alcanza`: revelar mapa full-screen vacío… En `mapa familiar`: **zoom out y aparecen bordes/chrome del teléfono: descubrimos que era la pantalla Family/Map.**"* — the master's map is the phone screen, and the reveal is that it *was* the phone screen. NO-UI §7: *"El teléfono es un contenedor editorial para UI."*
- **CURRENT RUNTIME EVIDENCE:**
  - `.family-map-stage` `clientWidth×clientHeight`: **250×200 → 1080×520**; `scrollWidth×scrollHeight`: **313×265 → 1350×689**; box `(595, 274.19) 250×200 → (100, 100) 1080×520`; `border-radius` **16 → 28 px**; `box-shadow` from `0 6px 18px` to `0 54px 120px rgb(0 0 0/.55)`.
  - **The layout switches in one frame.** rAF trace: `ms 0` → `client 250×200`; `ms 21` → `client 1080×520`, with `transform: matrix(0.231481, 0, 0, 0.384615, 495, 174)` compensating. A FLIP (`FamilyMapStage.tsx:45-112`) then animates only a compositor transform to identity over ~500 ms. So the object is *rendered* at 1080×520 for the whole flight and merely painted small — its labels are genuinely 41.04 px throughout and never 15 px.
  - **The stage canvas mutates during the animation.** `.presentation-canvas` `scrollWidth` grows `1280 → 1288 → 1298 → … → 1450` and `scrollHeight` `720 → … → 789` in ~34 discrete steps between **ms 125 and ms 475**.
  - **The phone is dimmed to a ghost:** `.home-phone-position` opacity **1 → 0.12** between ms 25 and ms 440.
  - **Type is a function of container width:** `.map-demo-screen { container-type: inline-size }` and every map metric in `cqw` with clamps (`map-screen.css:1-18`). Measured: place labels **15 → 41.04 px**, person labels **12 → 34 px**, delay `<strong>` **26 → 64.8 px**, symbol **18 → 38 px**, padding **7 → 18 px**, border-radius **12 → 22 px**.
  - **The map's own geometry is stretched at both sizes**, because `preserveAspectRatio="none"` on a `1000×600` viewBox: in-device scaleX 0.250 / scaleY 0.333 (**anisotropy 0.75**, vertical stretch); expanded scaleX 1.080 / scaleY 0.867 (**anisotropy 1.246**, horizontal stretch). **The distortion reverses between the two states.**
  - **Session 1's central fact re-confirmed:** `.phone-frame` layout stays `300×620` (client `298×618`) and `.phone-frame-screen` client stays `282×602` at **every one of the 37 states measured this session**, forward and stable.
- **FIGMA TARGET EVIDENCE:** Figma's `MapaTab` is a map **inside the screen**: a `min-height: 380` panel with a gradient, faint brand grid and street labels, `MemberPin`s, and an `Ahora` bottom sheet listing `presence.place · presence.time` per member with a status dot (`Familia.tsx:80-133`). It has no enlarged stage variant at all — the enlargement is a presentation invention.
- **INTEGRATION / PRODUCT EVIDENCE:** `FamilyScreen.tsx:416-417` — `{isMapActive ? (` / `<FamilyMapPanel embedded />` — the real map is **embedded**, not promoted. `screens\presence\PresenceScreen.tsx` keeps the map in the normal screen flow with `floatingActions` (recentre, `Compartir`/`Detener`) over it.
- **HUMAN WALKTHROUGH:** the observer did not name the enlargement technique; `HW-B-014` (*"aparece Familia… después se hace un mapa… y de nada aparece entrenamiento +1 hora"*) and `HW-B-015` (*"no tiene por qué aparecer ahí, tiene que aparecer después"*) describe its **content** problem.
- **CLASSIFICATION:** VISUAL TECHNIQUE — **PRESENTATION-SPECIFIC ADAPTATION** that has become **LAYOUT SIZE MUTATION**
- **SEVERITY:** **HIGH**
- **VERDICT:** **REJECT the technique; KEEP the ambition.** It succeeds at legibility and fails at product integrity, for five measured reasons: (1) it removes the device, so the map is no longer a phone screen; (2) it drops the phone to 12 %, so the product is a ghost behind its own content; (3) it discards header, title, tab switch and bottom nav — the anatomy that tells the audience which module they are in, which is the exact question B-F5 turns on; (4) it flips the map's own aspect distortion between states, so the same map is a different shape in each; (5) it mutates the stage canvas's scroll geometry mid-flight, so the composition's containing block is not stable while the object moves. Point (4) alone would be a polish note; points (1)–(3) are why this is HIGH.
- **TARGET BEHAVIOR:** **CAMERA / CROP + SELECTIVE EXPOSURE, inside the device.** Keep `.phone-frame` at `300×620` and `.phone-frame-screen` at `282×602` at all times. To make the map stage-readable: (i) raise the whole presentation's device scale for the Map beat only — the mechanism already exists (`PhoneFrame`'s `--phone-scale`, measured working at 0.96 / 1.00 / 1.08) and `1.08` gives `324×669.6`, i.e. **+8 % linear / +17 % area** with zero reflow; (ii) hold the real Familia chrome visible (top bar, `Mapa` title, `Familia｜Mapa｜Lugares` switch, bottom nav) so module identity is never lost; (iii) apply **SELECTIVE EXPOSURE** to the map's own chrome inside the device (the `.map-sharing` caption and any secondary labels drop to ~0.4) rather than growing them; (iv) if the pin labels are still too small at 1.08, apply `LOCAL VISUAL EMPHASIS` by **transform scale 1.10–1.15 on the pin's copy only**, with **no reflow, no scroll, no sibling movement** — not a container mutation. Master §6 B5's *"aparecen bordes/chrome del teléfono"* then becomes true rather than inverted.
- **WHY:** §7 of this brief is explicit: the target is *"REAL / POLISHED UI + LARGER DEVICE + CAMERA-LIKE FRAMING + SELECTIVE EXPOSURE + LOCAL NON-REFLOW EMPHASIS"* and explicitly **not** *"stretching surfaces outside the device."* A product keynote's one non-negotiable is that the product is shown *as a product*. The lever Session 1 identified — a stable internal layout with three already-working stage scales — is sufficient for the whole of Scene B and does not require any component to leave its device.

---

### **B-12 — `Entrenamiento +1 h` is a 64.8 px brand badge on a map that does not own schedules**
- **SCENE:** B — Map · **CURRENT STATE(S):** `S06_step03` (enlarged), `S06_step04` (in-device, via `.family-now`)
- **SCRIPT MOMENT:** L95–L97 *"Sale del colegio y después va a entrenar. Pero hoy **el entrenamiento se alarga una hora** y mamá ya no llega."* (L97) — and the map is not introduced until L109–L111
- **MASTER INTENT:** §6 B4 places the change in the **schedule** surface: *"Entrenamiento inicia `18:00–19:00`. En `le extendieron una hora`: aparece `+1 h` y el horario cambia a `18:00–20:00`. Nuevo horario hace scale ~115 % y vuelve. `mamá ya no llega`: oral. **No inventar `Retiro · Mamá`.**"* · §6 B5 then introduces the map, with pins for Club and for who-is-near. **The master never puts the change on the map.**
- **CURRENT RUNTIME EVIDENCE:** `.map-delay` → `background: rgb(201,107,69)` = `#C96B45` (the app brand), `color: rgb(255,255,255)`, `<strong>` at **64.8 px**, `<span>` at **19.44 px**, text `Entrenamiento +1 h`, positioned `left:70%; top:16%`, `border-radius: 16px`, `data-present={showDelay}` with `showDelay = stepIndex >= 3`. Measured at `S06_step03`: `fs=64.8px`, `bg=rgb(201,107,69)`, `color=rgb(255,255,255)`. It is **the largest and most saturated object on the enlarged map** — larger than `Colegio` and `Club` (41.04 px), larger than `Mamá`/`Papá` (34 px), and the only element filled with the brand colour. It appears at `step03`, i.e. **after** `Colegio` (`step01`) and `Club` (`step02`), inverting the script's order. **No state anywhere shows `18:00–19:00 → 18:00–20:00`**; `.map-delay` is a bare `+1 h` with no before-value, and master §6 B4's *"el horario cambia a `18:00–20:00`"* is absent. It is also **duplicated**: `.family-now` inside the phone reads `Tomi · Club / Entrenamiento +1 h` at every S06 state including `step00`.
- **FIGMA TARGET EVIDENCE:** `Familia.tsx:80-133` `MapaTab` contains: a gradient map panel, a faint brand grid, two street labels (`Av. Corrientes`, `Florida`), three `MemberPin`s (`Casa`, `Martina`, `Gabriel`) and an `Ahora` sheet of `presence.place · presence.time`. **No schedule, no delta, no badge.** `:22-26` `MapContextNavigation` items are only `Integrantes · Lugares · Yo`.
- **INTEGRATION / PRODUCT EVIDENCE:** the presence surface has **no notion of a schedule at all**. `screens\presence\PresenceScreen.tsx:583-588` overlays are `Sin ubicaciones compartidas` + *"Activa compartir para mostrar tu posición al hogar."*; `:542-543` recentre; `:544-560` `Compartir` / `Detener`; `:594-605` `MapContextCard` + `MapContextNavigation`. Schedule changes live in **Planner**: `services\plannerEvents.ts:14-15` (`starts_at`, `ends_at`) mutated by `updatePlannerEvent` (`:109`, `PATCH /api/planner/events/:id`) and logged as activity (`backend\src\services\planner.events.service.js:335-341`); `services\plannerSchedules.ts:37-42` `updateHouseholdSchedule` (`PATCH /api/planner/schedules/:id`). Backend confirms the map knows nothing about schedules — the only `entityType` values ever written to `planner_activity_log` are `event`, `goal`, `milestone` (`planner.activity.service.js:136` and its three callers); `planner.tasks.service.js` and `planner.schedules.service.js` contain **zero** `activity` references.
- **HUMAN WALKTHROUGH:** `HW-B-014` — *"aparece Familia con Tomi y mamá y papá. Después se hace un mapa… Y después aparece mamá, papá, y **de nada aparece 'entrenamiento +1 hora'**"*; `HW-B-015` — *"**no tiene por qué aparecer ahí, tiene que aparecer después**, y tampoco tiene que aparecer después en mapa, Tomi, club, entrenamiento +1 hora, porque eso simplemente puede ser avisado en el **Feed**"*.
- **CLASSIFICATION:** **PRODUCT SEMANTIC DELTA** (Map is given a capability it does not have) + NARRATIVE ORDER
- **SEVERITY:** **HIGH**
- **VERDICT:** **REJECT. Both human hypotheses CONFIRMED, and the observer's second formulation is the sharper one:** the observer is right that `+1 h` does not belong on a map *at all*, and only partially right that it belongs in Feed. Master §6 B4 places it in the **schedule surface**, which is where the product puts it. The current stage commits three errors at once: wrong module, wrong order (after the places it should precede), and no before-value — so the audience never sees a schedule *change*, only an unexplained `+1`. It is also the only brand-filled element on an enlarged surface, which makes a Planner fact read as a Map headline.
- **TARGET BEHAVIOR:** delete `.map-delay` from the map entirely. Restore the change to the **schedule surface** in the correct order: on L95 show `Entrenamiento 18:00–19:00`; on L97 show `+1 h` and the value become `18:00–20:00` with a `~115 %` scale that returns (master §6 B4, verbatim). `mamá ya no llega` stays oral. The map is then introduced at L109 with what it can honestly show: the **Club pin**, member presence with relative time (`hace 5 min`), and the opt-in state.
- **WHY:** Master §6 B4 is explicit about both the surface and the two values; master §6 B5 introduces the map three lines later for a different purpose. Presenting a Planner fact in Map space makes the audience attribute a capability to the wrong module — which is precisely the blurring B-F5 asks about, and it weakens S07 two beats later.

---

### **B-13 — The map asserts geography the narration never stated and the product cannot know**
- **SCENE:** B — Map · **CURRENT STATE(S):** `S06_step01` … `S06_step04`
- **SCRIPT MOMENT:** L109 *"También importa dónde queda el club, **quién está cerca** y **qué posibilidades tiene cada integrante**."*
- **MASTER INTENT:** §6 B5 *"cercanía → **relación espacial simple** (`8 min` o equivalente)"* · §2.4 *"Si la relación es conceptual o la integración no existe todavía, se usa una **transición editorial evidente**, nunca un tap falso."*
- **CURRENT RUNTIME EVIDENCE:** pin positions are authored CSS percentages with no coordinate behind them: `.map-school { left: 24%; top: 29% }`, `.map-club { left: 69%; top: 49% }`, `.map-mom { left: 23%; top: 75% }`, `.map-dad { left: 82%; top: 79% }` (`map-screen.css:9, 10, 19, 20`). Measured at `S06_step03`: `map-school left=259.19px top=150.80px`, `map-club left=745.19px top=254.80px`, `map-mom left=248.39px top=390px`, `map-dad left=885.59px top=410.80px`. There is **no distance, no ETA, no "cerca", no travel time** in any of the six S06 states. Read literally, the map asserts that Mamá is south-west, Papá is south-east, Tomi is at a club in the east, and the school is north-west — **none of which the narration states and none of which the product can compute.** The background street grid is generic: six blocks and two road families with no names in the presentation (Figma's has `Av. Corrientes` and `Florida`).
- **FIGMA TARGET EVIDENCE:** `Familia.tsx:80-133` — pins at authored percentages too (`Casa` 25 %/45 %, `Martina` 62 %/28 %, `Gabriel` 75 %/62 %) **with no distance and no ETA**, and an `Ahora` sheet that reports `presence.place · presence.time` per member. So the target makes no proximity claim either; what it adds is *named* streets and *per-member recency*.
- **INTEGRATION / PRODUCT EVIDENCE:** **no proximity capability exists.** No `distancia` / `cerca` / `km` / ETA in `screens\presence\**` or `components\family\**`. Available instead: `PresenceScreen.tsx:101-109` `getRelativeTime()` → `'Ahora'` / `'Hace 1 min'` / `'Hace 5 min'` / `'Hace 1 h'`; `:69-74` `getStatusLabel()` → `'Compartiendo ubicación'` / `'Desactualizada'` / `'Sin ubicacion'` / `'No comparte'`; `presence.ts:7-11` `PresenceMemberStatus`. The only geometric code in the repository is `distanceBetweenMeters` in `services\presenceLocationSharing.ts:125-138`, used **internally to throttle publish frequency**, never surfaced.
- **HUMAN WALKTHROUGH:** `HW-B-013` is about the *script* (see B-22). The geography problem is **not** in the walkthrough — this finding is new in Session 2.
- **CLASSIFICATION:** **PRODUCT SEMANTIC DELTA** (fabricated data) + NARRATIVE (an asked-for capability is not delivered) + **OPEN — MASTER / PRODUCT CONFLICT**
- **SEVERITY:** **HIGH**, plus **OPEN-2** *(canonical index: `audit/00_AUDIT_NORMALIZATION.md` **§N-03**)*
- **VERDICT:** **REJECT the fabricated geography.** The missing proximity is an **OPEN MASTER / PRODUCT CONFLICT**, not an implementation failure. Master §6 B5 asks for *"`8 min` o equivalente"* and the product has no ETA, no distance and no travel-time service. **Canonical rule (`audit/00_AUDIT_NORMALIZATION.md` §N-03): `8 min` MUST NOT be treated as a presentation requirement.** The presentation must show **place, recency, presence/status and sharing state** — the things the product actually has — and must **not fabricate minutes away, distance, ETA or any relative-proximity calculation**. The authored pin percentages are a fabrication and go regardless of how the conflict is eventually resolved.
- **TARGET BEHAVIOR:** the map shows **Club as a named place** and each member as `place · relative time · sharing status` — exactly the target's `Ahora` grammar, which is honest, real, and answers *"qué posibilidades tiene cada integrante"* far better than a decorative pin arrangement does. No distance, no ETA, no implied geography beyond "these two places are in this household's day". If proximity is genuinely wanted in the keynote, it is an **editorial** relation (master §2.4), labelled as such, or it waits for a real capability.
- **WHY:** A map is a claim about the world. Authored percentages on a map are indistinguishable, to an audience, from data. When the narration says *"quién está cerca"* and the screen shows three pins at arbitrary positions with no relation between them, the audience will believe a proximity claim was made and then withdrawn — which is worse than never raising it.

---

### **B-14 — Shared location is staged as an always-on global state**
- **SCENE:** B — Map · **CURRENT STATE(S):** `S06_step03`, `S06_step04`
- **SCRIPT MOMENT:** L111 *"y, **si cada persona decide compartir su ubicación**, sumar también esa información cuando hace falta coordinarnos"*; and two beats later L137 *"Compartir ubicación no significa estar mirando dónde está alguien todo el tiempo"*
- **MASTER INTENT:** §6 B5 *"Ubicación compartida debe mostrarse como **opcional e individual**. UI exacta del toggle = **OPEN**."* · §4 lists *"Ubicación exacta de `Compartir ubicación`"* as a real OPEN: *"Debe mostrar decisión individual, pero no inventar dónde vive el toggle hasta cerrar Product Truth."*
- **CURRENT RUNTIME EVIDENCE:** `.map-sharing` is a single element, text `Ubicaciones compartidas`, **9 px** (`clamp(9px, 1.3cqw, 14px)`), `color: #6E6B66`, `white-space: nowrap`, `data-present={showPeople}` → visible from `step03` through `step04`. Measured at `S06_step04`: `fs=9px`, `box=107.34×13.5 @666.33,454.69` — inside a 250×200 in-device map. There is **no toggle, no per-member state, no opt-in affordance, no "quién lo activó"**, and no way to distinguish a member who shares from one who does not: `.map-person` renders identically for Mamá and Papá with `data-present={showPeople}`.
- **FIGMA TARGET EVIDENCE:** Figma's map has **no global sharing caption at all**. Consent lives per member: `Familia.tsx:279` `ubicacion: 'Acceso limitado'` in `MemberPermissionsScreen`; the member list shows a presence *status dot* per person (`homes = #2D7A51`, `away = #B57A1A`; `Familia.tsx:126`), which is a per-member state.
- **INTEGRATION / PRODUCT EVIDENCE:** per-member opt-in with three modes. `services\presence.ts:21-31` — `PresenceMember { …, sharing_enabled: boolean, status: PresenceMemberStatus }`; `:40-43` — `UpdatePresenceLocationPayload { sharing_enabled?, sharing_mode?: 'off' \| 'foreground' \| 'background' }`; `:7-11` — `PresenceMemberStatus = 'live' \| 'stale' \| 'unavailable' \| 'sharing_disabled'`. The map shows only sharers: `PresenceScreen.tsx:207-210` — `members.filter(m => getMemberCoordinate(m) && m.sharing_enabled)`. The product's own copy is a **first-person opt-in statement**: `PresenceScreen.tsx:619-620` *"Ubicación familiar / **Compartís solo cuando lo activás.**"*; and the empty state `:583-588` *"Sin ubicaciones compartidas / **Activa compartir para mostrar tu posición al hogar.**"* Backend derives sharing from the field with `sharing_mode ?? 'foreground'` as the legacy-safe default (`backend\src\services\presence.locations.service.js:44-50`).
- **HUMAN WALKTHROUGH:** `HW-B-019` — *"no está bien toda la coordinación directamente de la parte, el módulo Familia con lo que digo con respecto a lo que se ve"*, filed under L135–139. **CONFIRMED**, and the mechanism is now precise: the contradiction is not in S07's text but in S06's map.
- **CLASSIFICATION:** **PRODUCT SEMANTIC DELTA** + NARRATIVE (contradicts S07)
- **SEVERITY:** **HIGH**
- **VERDICT:** **REJECT.** A single global caption stating a fact is the visual opposite of an individual opt-in, and it is asserted at 9 px — illegible — which means the audience registers *"locations are on"* without ever being able to read who decided. Master §6 B5 requires **optional and individual**; the presentation shows **mandatory and global**. Master §4's OPEN is about *where the toggle lives*, not about *whether consent is shown*, so this is not blocked by the OPEN.
- **TARGET BEHAVIOR:** without inventing a toggle location (master §4 OPEN), show consent the way the target's own grammar allows: **per member**. Each member row carries that member's sharing state — sharing / not sharing / last update — using the target's own vocabulary and colours. Where a single caption is kept, it must state the rule, not the fact: *"Compartir ubicación es opcional y se decide por persona"*, and it must be legible (≥ 20 px logical at the device's stage scale). **Recommendation:** change the element from a state assertion to a rule, and add a per-member state. That satisfies master §6 B5, master §4, and the product's `sharing_enabled` model without inventing UI.
- **WHY:** This is the load-bearing contradiction of Scene B. The film's ethical claim is delivered in S07 as text; the visual evidence for it is in S06; and S06 currently argues the opposite. Master §2.7's exposure grammar is the tool for the fix — dim what is not opted into — and it is also the honest representation of `PresenceScreen.tsx:207-210`.

---

### **B-15 — Feed is presented inside the Familia shell with its tab bar hidden**
- **SCENE:** B — Feed · **CURRENT STATE(S):** `S06_step05`
- **SCRIPT MOMENT:** L117–L119 *"Ahí entra Feed. Feed reúne avisos y conversaciones relacionadas con la familia, para que tengan un lugar propio y no terminen perdidas entre todos los demás mensajes."* — the whole point is that Feed is a **place of its own**
- **MASTER INTENT:** §6 B6 *"Transición real si Product Truth lo permite; si no, **editorial** hasta cierre de IA."* · §4 OPEN: *"Navegación final de Feed dentro de Family / shell — La escena Feed existe; la ubicación exacta queda sujeta a producto."*
- **CURRENT RUNTIME EVIDENCE:** `family-view='feed'`, `family-screen-heading h1` = `'Feed'`, `family-feed-product` layer `data-present=true`, and `.family-switch` at **`opacity: 0`** (`family-screen.css:7` — `.family-demo-screen[data-family-view='feed'] .family-switch { opacity: 0; visibility: hidden; }`). The bottom nav still shows the **Family icon selected**. The Feed layer is a child of `.family-workspace` with `family-feed-product { top: 54px }` (`family-screen.css:31`), i.e. positioned by the same layout rules as the map layer directly above it. Measured controls on this state: no tab, no back affordance, one `Responder` label, one article.
- **FIGMA TARGET EVIDENCE:** **the Feed surface does not exist.** `src\screens\Messages.tsx:1023-1029`, verbatim: `// ── FAMILIA = CONVERSATION (alias legacy; la surface Feed ya no existe) ───────` / `// \`family-feed\` se conserva como alias que renderiza la conversación familiar` / `// canónica con el shared shell. No hay composer post-centric ni comments.` / `export function FamilyFeedScreen() { useMessagesVersion(); return <ConversationScreen convId="c1" /> }`; `:1031-1036` `FeedCommentsScreen` — *"la ruta \`feed-comments\` ya no existe (comments → reply)"*, also rendering `c1`. Reached from `Más → Mensajes` (`fig-mas-mensajes.png`: family thread `Familia García · 8 · Mariana · compramos pan?`, `TEMAS` with *"Separan las conversaciones sobre algo concreto para que puedas retomarlas después"*, and `INTEGRANTES` DMs). Figma's `Más` contains `Inventario`, `Finanzas`, `Activos`, `HomeCloud`, `Mensajes 5 nuevos` — **no Feed entry**.
- **INTEGRATION / PRODUCT EVIDENCE:** `navigation\AppNavigator.tsx:240` `<PrivateStack.Screen name="FeedFamiliar" component={FeedFamiliarScreen} />`; `navigation\types.ts:19` `FeedFamiliar: undefined`. **Not** in `MoreStackParamList` (`types.ts:31-63`) and **not** in Familia. Its only incoming navigation is `screens\MoreScreen.tsx:23-32`: `{ id:'feed', label:'Actividad', description:'Actividad del hogar', icon:'chatbubbles', color: colors.terracotta[600], screen:'FeedFamiliar', isDemo:true }`, rendered with `<StatusBadge label="Demo" tone="warning"/>` (`:93`). `HomeTabNavigator.tsx:227` puts `Family` in `MoreStack` as a *separate* route, so Family and Feed are siblings under Más, not parent and child. **There is no group-conversation surface in Integration at all** (0 matches for `conversation|thread|chat` in `backend\src\**\*.js`; no messaging service among the 156 files in `services\`).
- **HUMAN WALKTHROUGH:** `HW-B-016` — *"que también aparece en Familia, cuando [Feed] **no es de familia, es de More**. O sea los tres puntitos"* — **CONFIRMED exactly**, including the precise navigation path. `HW-B-012`'s *"culpa de mi compañero que no implementó Feed y Family en el Figma"* is also confirmed at source level, and is the root of the triple delta.
- **CLASSIFICATION:** **PRODUCT SEMANTIC DELTA (triple)** + UX (navigation lie)
- **SEVERITY:** **HIGH**
- **VERDICT:** **REJECT.** Three artefacts disagree about what Feed is and where it lives — Figma-app says it is a family **conversation** under Mensajes and does not exist as a Feed; Integration says it is a **mock post feed** under Más, badged *Demo*; the presentation says it is a **fourth tab of Familia with no tab bar**. The navigation lie is the sharpest part: the highlighted bottom-nav item and the hidden tab bar both assert "you are still in Family" while the narration says *"Ahí entra Feed"*. Master §6 B6 already provides the honest answer — editorial until product truth closes — and the presentation has taken neither branch.
- **TARGET BEHAVIOR:** master §6 B6's second branch, taken honestly: **an explicit editorial transition**, not a fake tab. Recommended shape: on L115–L117, the Family screen's content **exits the device upward** and a **different** surface enters from below with its **own chrome visible** — a self-headed header, its own module title, and no Familia tab bar. Because the exact host is an OPEN (master §4), the presentation should not invent a nav destination; it should show the conversation as a **HomePlus-native family thread**, which is what both targets can support (Figma's `ConversationScreen c1`; Integration has none — so editorial). Whatever is chosen, the bottom-nav selection must change or clear, because the current state asserts ownership it does not have.
- **WHY:** Master §4 explicitly leaves Feed's host unresolved and master §6 B6 explicitly authorises an editorial transition in that case. The presentation resolved an OPEN by assertion. A keynote audience reads a highlighted nav item as a promise about where they are; breaking that promise to introduce a module is the cheapest way to lose trust in the whole navigation model.

---

### **B-16 — The technician post is a mock capability with no thread and no way back**
- **SCENE:** B — Feed · **CURRENT STATE(S):** `S06_step05`
- **SCRIPT MOMENT:** L121–L125 *"El técnico viene entre las cuatro y las seis. ¿Quién puede estar?"* + *"Esa conversación queda vinculada al hogar y **disponible cuando hace falta volver a ella**."*
- **MASTER INTENT:** §6 B6 — *"Escribir/enviar rápido: `El técnico viene entre las 4 y las 6. ¿Quién puede estar?` Respuestas cortas: `Yo puedo.` `No llego.` **Hold mientras se habla de que la conversación queda a mano.** No volver a mostrar WhatsApp."*
- **CURRENT RUNTIME EVIDENCE:** `FeedDemoScreen/index.tsx` is **19 lines** with no props in use beyond three defaults and **no state, no handler, and no thread**. Measured at `S06_step05`: `articles = 1`, `comments = 0`, `author = Mamá`, `meta = Familia García · Ahora`, `message = 'El técnico viene entre las cuatro y las seis.'`, `question = '¿Quién puede estar?'`, `footer = 'Responder'`. There is no compose action, no reply, no list of other conversations, no timestamped history, and no back affordance — so the second half of L125 (*"disponible cuando hace falta volver a ella"*) has **no visual support at all**: there is exactly one post and no route back to it.
- **FIGMA TARGET EVIDENCE:** `Mensajes.tsx` is a **2 450-line** messaging surface: `ConversationScreen` with `sendMessage`, `sendMediaMessage`, `retryMessage`, `toggleStarMessage`, `togglePinMessage`, `toggleMessageReaction`, `editMessage`, `deleteMessage`, `forwardMessage`, `createTopic`, `closeTopic`, `reopenTopic`, `buildReplyRef`, `MsgHeader`, `Composer`, `TopicsCoachmark`, `closedTopicsList`, `starredMessages`, `MessagesSearchResults` (`socialSearchText`, `MessagesSearchResult`). The captured Mensajes root shows the family thread with an unread count and a `TEMAS` section whose own copy explains retention: *"Separan las conversaciones sobre algo concreto para que puedas retomarlas después."*
- **INTEGRATION / PRODUCT EVIDENCE:** `screens\feed\FeedFamiliarScreen.tsx` is the honest mirror of the presentation's shape and is **100 % mock**: `:16-28` `type Post = { … reactions: Reaction[]; commentsCount: number }`; `:46-55` `const MOCK_POSTS: Post[]` with entries like `{ authorName: 'Valeria', text: 'Juan terminó el año escolar con diez calificaciones hoy 🎉' }`; `:39-42` `MOCK_HITOS`; `:112` `useState<Post[]>(MOCK_POSTS)`; `:134` `setPosts(prev => [post, ...prev])` — local only. Its imports (`:1-13`) include **no service module**. There is **no** `backend\src\routes\feed*`, `post*`, `comment*` or `conversation*`. The comment affordances are inert: `:214-217` `<TouchableOpacity style={S.reactionBtn}>` with **no `onPress`**; `:224-230` a `commentHint` reading `¿Qué opinas?` with **no `onPress`**. The product badges this module **"Demo"** in its own UI.
- **HUMAN WALKTHROUGH:** `HW-B-017` — *"eso está bien, digamos, pero **no lo hacemos como mensaje en el grupo familiar**, como en el Feed. Está hecho de otra manera"*.
- **CLASSIFICATION:** **FUNCTIONAL CAPABILITY DELTA** (a mock presented as a capability) + NARRATIVE (retention promise unsupported)
- **SEVERITY:** **HIGH**
- **VERDICT:** **REJECT.** Two problems. (a) Master §6 B6's four required beats — send, `Yo puedo.`, `No llego.`, and a hold on retention — are all absent; the post is simply *there*. (b) The product itself marks this module `Demo` and implements no transport for it, so staging it as a working family conversation presents a **mock as a shipped capability**, which §6 of this brief forbids. Note the honest finding in `HW-B-017`: the observer's complaint that it is *"hecho de otra manera"* is correct, and the *reason* is now known — Integration's Feed is inert and Figma's Feed does not exist, so there is no "right way" to copy. → **OPEN-3.**
- **TARGET BEHAVIOR:** master §6 B6, taken literally and marked editorial: the thread **writes itself** on L123 (`El técnico viene entre las cuatro y las seis. ¿Quién puede estar?` appears as a sent message, HomePlus-native — **not** WhatsApp), two short replies land (`Yo puedo.` / `No llego.`), the frame **holds** while L125 is spoken, and the retention promise is made visible by one honest gesture: the thread acquires a **position in a list** the audience can see it sitting in. The module must be framed as HomePlus's own conversation surface, not as a social feed, because that is the only shape both targets can eventually support.
- **WHY:** Master §6 B6 forbids re-showing WhatsApp precisely because the point is that this conversation has a **home** now. A single static post with a dead `Responder` shows the opposite: a conversation that goes nowhere and cannot be returned to. Master §2.4's rule — *"Si la relación es conceptual o la integración no existe todavía, se usa una transición editorial evidente, nunca un tap falso"* — applies to the whole of this beat.

---

### **B-17 — Familia lists 3 of 4 members and omits the phone's own user**
- **SCENE:** B — Family / People · **CURRENT STATE(S):** `S06_step00` … `S06_step05`
- **SCRIPT MOMENT:** L91 *"Familia conecta la organización de cada integrante con la del resto del hogar, relacionando personas…"* — and the whole film's cast is Juli · Tomi · Mamá · Papá
- **MASTER INTENT:** §2.5 mandatory continuity: *"Juli/Tomi/Mamá/Papá"* · §3 canonical data names all four
- **CURRENT RUNTIME EVIDENCE:** three `family-member-card`s: `Tomi / Colegio` (`<h2>`, **30 px**, chevron present, background `--home-brand-soft #F6EDE8`, avatar 50 px), `Mamá / Casa` (`<h3>`, **18 px**, no chevron, avatar 36 px), `Papá / Trabajo` (`<h3>`, **18 px**, no chevron, avatar 36 px). **Juli is absent**, while the shared `HomeHeader showJuli` continues to render `Juli` in the top bar and the device's own context is Juli's. Also measured: `family-map-slot` is `250×200` inside a 282 px screen, and the list ends at y ≈ 545 leaving ~35 px before the nav.
- **FIGMA TARGET EVIDENCE:** `fig-familia.png` — `Familia García` + **`4 integrantes`**, then **one** unified card with four visually identical rows, each `avatar · name · place · time · chevron · status dot`. Uniform anatomy; one card; the count is stated.
- **INTEGRATION / PRODUCT EVIDENCE:** `components\family\FamilyMembersCard.tsx:134-136` — `{activeMembers.length} integrante{activeMembers.length !== 1 ? 's' : ''}` (dynamic, from the API); `:210-214` — `activeMembers.map(member => <MemberRow … isSelf={member.person_id === current_member.person_id} />)`; `components\family\MemberRow.tsx:46-48` — `{isSelf ? <ActionPill label="Vos" tone="success" disabled /> : null}`; `:34-38` `AppAvatar`. Data from `GET /api/households/:id/family` (`services\family.ts:103-105`), backend `backend\src\services\presence.locations.service.js:66`.
- **HUMAN WALKTHROUGH:** not separately raised; the observer read the three cards as "Familia con Tomi y mamá y papá" (`HW-B-014`) without noticing the omission.
- **CLASSIFICATION:** VISUAL / NARRATIVE (list integrity) + a11y
- **SEVERITY:** **MEDIUM**
- **VERDICT:** **REJECT.** The screen contradicts itself: the top bar says the device is Juli's and the list does not contain Juli. Both targets list every member and mark the current user (`Vos`). Separately, the list is internally inconsistent — one card at 30 px with a chevron and a tinted surface, two at 18 px without, and heading levels `<h2>` then `<h3>` — which is both a visual defect and an accessibility defect (the list has no single heading level). Note the cast itself is **not** a defect: Juli/Tomi/Mamá/Papá do not exist in Integration, but they map cleanly onto real roles (`child`, `adolescent`, `adult`, `coordinator`), so this is a legitimate PRESENTATION-SPECIFIC ADAPTATION.
- **TARGET BEHAVIOR:** four rows, **uniform anatomy**, in the target's own single-card layout, ordered as in Scene A (Juli, Tomi, Mamá, Papá — or by the target's own ordering rule). Juli's row carries the `Vos`-equivalent marker, matching `MemberRow.tsx:46-48`. One heading level for all four names. Every member's meta line carries a **real** context (`Casa`, `Trabajo`, `Colegio`) as the target does.
- **WHY:** Master §2.5 lists the four as mandatory continuity. A list that omits the person whose phone it is will be read as *"these are the other three"* — which is the opposite of the coordination claim the scene is making. The `Vos` marker is also the cheapest available proof that location and tasks are per-person, which is B-14's missing evidence.

---

### **B-18 — The `Lugares` tab is permanently dead**
- **SCENE:** B — Family · **CURRENT STATE(S):** all six `S06` states
- **CURRENT RUNTIME EVIDENCE:** `.family-switch` has three spans; measured `selected` values per state: `S06_step00` → `Familia=true, Mapa=false, Lugares=""`; `step01–03` → `false, true, ""`; `step04` → `false, true, ""`; `step05` → `false, false, ""`. The `Lugares` span has **no `data-selected` value in any state**, and no handler exists (`family-screen.css:4-6` styles it but nothing sets it).
- **FIGMA TARGET EVIDENCE:** `LugaresTab` exists at `Familia.tsx:157` and is reachable in Figma-app (I did not capture it at runtime — the segmented control there is not `role="tab"`; recorded honestly in §2).
- **INTEGRATION / PRODUCT EVIDENCE:** places exist as `place-detail` in Figma and as `inventory-places` in Integration; Integration's map context navigation includes `places` (`MapContextNavigation.ts:22-26`) with an explicit empty state (`MapContextCard.tsx:93-96` *"No hay lugares guardados para este hogar."*).
- **HUMAN WALKTHROUGH:** not raised.
- **CLASSIFICATION:** VISUAL (dead affordance)
- **SEVERITY:** **LOW**
- **VERDICT:** **REJECT.** An always-visible tab that can never be selected is a promise the UI does not keep. It also matters because "Lugares" is exactly the word that would make B-13/B-14 honest — a places tab is where `Club` and named places belong, not decorative pins on a map.
- **TARGET BEHAVIOR:** either the tab becomes real (places as first-class objects, which is what B-13's fix needs) or it is removed from the shell. A third option, cheapest and most honest: keep it and land it on the product's own empty state — *"No hay lugares guardados para este hogar"* — which is real copy from `MapContextCard.tsx:93-96` and demonstrates the household's place vocabulary before it has any places.
- **WHY:** Master §16 rule 2 — *"¿La acción existe realmente en la app? Si no, marcarla como editorial."* A dead tab is an unmarked fake tap.

---

### **B-19 — S07's boundary is asserted over a stage that contradicts it**
- **SCENE:** B — Coordinar no es vigilar · **CURRENT STATE(S):** `S06_step03`, `S06_step04` → `S07_step00`, `S07_step01`
- **SCRIPT MOMENT:** L135–L139 *"Coordinar no significa vigilar. Compartir ubicación no significa estar mirando dónde está alguien todo el tiempo. Significa que esa información pueda estar disponible cuando realmente sirve para coordinarse."*
- **MASTER INTENT:** §6 B7 (*"En `cuando hace falta`: 4 elementos se conectan con pocas líneas. En `chicos y adolescentes`: elementos desaparecen → negro."*) then B8 (*"EN PANTALLA: `Coordinar no es vigilar.`… Mantener durante toda la explicación de límites/contexto."*) — **the synthesis beat B7 is what earns the boundary.**
- **CURRENT RUNTIME EVIDENCE:** `S07` itself is clean — see §11.1 and the POSITIVE B-21. The problem is upstream. `S06_step03` leaves on stage: a 64.8 px brand-orange `Entrenamiento +1 h` badge (`B-12`), an always-on `Ubicaciones compartidas` caption with no per-person state (`B-14`), and pins at arbitrary coordinates encoding no real relation (`B-13`). `S06_step04` additionally shows `.family-now` reading `Tomi · Club / Entrenamiento +1 h` inside the phone. Master §6 B7's four-callback synthesis (*Tomi avatar, Club pin, `20:00`, mini technician card, connected by a few lines*) **does not exist**: `S06` goes Family → Map → Feed → `S07` with no synthesis state, and **no state anywhere shows `20:00`** because the `18:00→20:00` change was never staged (`B-12`).
- **FIGMA TARGET EVIDENCE:** both targets support B-21's claim and B-14's fix — Figma's member rows carry a **per-person status dot** (`homes #2D7A51` / `away #B57A1A`, `Familia.tsx:126`), Integration carries `sharing_enabled` + `PresenceMemberStatus` per member.
- **INTEGRATION / PRODUCT EVIDENCE:** the product's own copy already says what S07 says: `PresenceScreen.tsx:619-620` *"Compartís solo cuando lo activás."*; `:69-74` `getStatusLabel()` includes `'No estás compartiendo'` and `'No comparte'` — i.e. **the product renders the negative case as a first-class state**, which is exactly the evidence S07 needs and the presentation never shows.
- **HUMAN WALKTHROUGH:** `HW-B-019` — *"no está bien toda la coordinación directamente de la parte, el módulo Familia con lo que digo con respecto a lo que se ve"* — **CONFIRMED**, mechanism now precise.
- **CLASSIFICATION:** NARRATIVE (cross-scene coherence)
- **SEVERITY:** **HIGH**
- **VERDICT:** **REJECT the sequence; KEEP the screen.** S07's design is correct and should not be touched. What fails is that the evidence S07 asserts is absent, and in one case inverted. Master §6 B7's synthesis is the missing piece: it is where *"4 elementos se conectan con pocas líneas"* would show that Family **joins** information rather than accumulating surveillance — and it is also where `20:00` and the technician card would resolve the two dangling threads from B-12 and B-16.
- **TARGET BEHAVIOR:** add master §6 B7's synthesis state before S07: from the Feed thread, the frame exits to the real people list, then the four callbacks appear (Tomi avatar, Club pin, `20:00`, the technician mini-card) and connect with a few thin lines on the word *"cuando hace falta"* (L125–L129); on *"chicos y adolescentes"* (not in the current script — see OPEN-6) or simply on L131's `[Pausa]`, the elements leave to black. Then S07 arrives as the **conclusion** of a demonstrated system rather than as an assertion over an unexplained map.
- **WHY:** Master §6 B8 assumes the boundary statement has been earned by B7. Without B7 the statement is a promise; with B7 it is a conclusion. This is also the cheapest available fix for three other findings at once, because the synthesis is where `20:00`, the Club pin and the technician card all land.

---

### **B-20 — POSITIVE — the shell, the segmented controls and the navigation are faithful**
- **SCENE:** B · **CURRENT STATE(S):** `S04`…`S07`, all 16 states
- **Evidence:** the top bar (`9:41 · J · Juli · Familia García ⌄ · search · bell`), the `HOY` / `PRÓXIMAMENTE` section grammar, `#FFFFFF` cards on `#F6F5F2` at 16 px radius, the 5-item bottom nav with a 56 px brand `#C96B45` FAB and a `…`, and both segmented controls were each compared line-by-line against Figma-app's runtime captures:
  - `Familia | Mapa | Lugares` → matches `fig-familia.png`'s control in structure, order, and the brand-soft selected pill on a light track (`family-screen.css:4-6` reproduces the target's `Tabs` exactly).
  - `Tareas | Calendario | Planes` → matches `fig-cal-*.png`'s `SegmentedControl`: one soft track, one white selected pill with a brand-tinted border, brand-coloured selected label, pill moving by `left` only (measured `3 → 84.33 → 165.66 px`, constant `81.33 px` width) and tab widths constant at 81/82/81 px across **222 sampled frames**.
  - Bottom nav → matches `fig-home.png`: home / people / **+** / calendar / `…`.
  - Typography discipline → the target's own floor is 9–13 px logical; the presentation's is 9–30 px. The presentation is **not** inflating type relative to the target.
- **CLASSIFICATION:** POSITIVE — preserve
- **SEVERITY:** **POSITIVE**
- **VERDICT:** **KEEP ALL OF IT.** Do not redesign the shell. Every Scene B fix below is a content, status, hierarchy or framing fix inside a shell that is already right.
- **TARGET BEHAVIOR:** unchanged.
- **WHY:** This is the most useful finding for the developer: the expensive part is already correct. The failures are semantic and compositional, not visual.

---

### **B-21 — POSITIVE — S07 is a correct singular-concept screen**
- **SCENE:** B · **CURRENT STATE(S):** `S07_step00`, `S07_step01`
- **Evidence:** see §11.1 for the full measurement. One text block, 688.81 × 274.53 px in a 1280 × 720 frame (20.6 % of canvas area), centred, ~60 % of the frame empty; `Coordinar` 132 px / 600 / `#F5F1EB` and `no es vigilar.` 132 px / 500 / `#C7A084`; the product stage exits as a block in 220 ms and a `#060404` veil settles; nothing else is painted; stable with 0 running animations across a 10 s hold (Session 1 §7). `#C7A084` is a warm tan, deliberately **not** the HomePlus orange.
- **CLASSIFICATION:** POSITIVE — preserve, do not resize
- **SEVERITY:** **POSITIVE**
- **CANONICAL STATUS:** **PRESERVE** — recorded centrally at `audit/00_AUDIT_NORMALIZATION.md` **§N-05**. The 132 px size is an **intentional semantic exception**, not an outlier. **A later global typography-normalization pass MUST NOT reduce it** on the grounds that it exceeds generic type guidance.
- **VERDICT:** **KEEP EXACTLY AS IS, INCLUDING THE 132 px SIZE.** NO-UI §5's 56–72 px "major concept" band does not apply here, and reducing it would be a mistake: one idea, one field, and the concept is the film's thesis. Master §2.3 lists this line as approved text and §6 B8 prescribes exactly this treatment. `HW-B-018` is **CONFIRMED** as a positive.
- **TARGET BEHAVIOR:** unchanged. Fix the *evidence* upstream (B-12, B-13, B-14, B-19), not this screen.
- **WHY:** The brief explicitly warns against treating large concept typography as a defect by default. Here it is not a defect. A reviewer who "fixes" the size would make the scene worse.

---

### **B-22 — `SCRIPT ISSUE` — "conversaciones" attributed to Familia; "Feed" names a module neither target has**
- **SCENE:** B (recorded, not fixed)
- **SCRIPT MOMENT:** L91 *"relacionando personas, lugares, horarios **y conversaciones** que pueden ser importantes para coordinarse"* vs L117 *"Ahí entra Feed. Feed reúne avisos **y conversaciones** relacionadas con la familia"* · L63 heading *"Gaby: Home+Planner+ ¿como gano autonomia? --> Family"*
- **MASTER INTENT:** master §18's canonical script has the same L91 wording, so this inconsistency is **frozen into the master** and cannot be resolved by the presentation alone.
- **CURRENT RUNTIME EVIDENCE:** the presentation cannot satisfy L91 literally — `FamilyDemoScreen` has no conversations surface, and its switch has no such tab. The audience is told Familia relates *"conversaciones"* while looking at three member cards.
- **FIGMA TARGET EVIDENCE:** Figma-app's Familia tabs are `Familia | Mapa | Lugares` — **no conversations**. Conversations live under `Más → Mensajes`.
- **INTEGRATION / PRODUCT EVIDENCE:** conversations do not exist as a surface at all in Integration (no route, no service, no entity). Family is `screens\FamilyScreen.tsx` with `people | map`; Feed is a separate `PrivateStack` route from `Más`.
- **HUMAN WALKTHROUGH:** `HW-B-013` — *"Las conversaciones no son parte del módulo, son de feed, pero la familia sí. Bueno, **no caigamos sin que los errores del guion interrumpan la presentación**"* — **CONFIRMED, and the observer's instinct was right: it should not be allowed to interrupt the presentation.**
- **CLASSIFICATION:** **SCRIPT ISSUE** (recorded as `SI-05` in `00_HUMAN_HYPOTHESES.md` §6, with this session's added finding that master §18 froze the same wording)
- **SEVERITY:** recorded as a source inconsistency, **not** graded as a presentation defect
- **VERDICT:** **SCRIPT ISSUE.** Two layers: (i) L91 mis-attributes conversations to Familia — already logged as `SI-05`; (ii) **new in this session** — the word "Feed" names a module that exists in neither target. Figma-app has explicitly *dissolved* Feed into Mensajes/Conversación (`Messages.tsx:1023`); Integration keeps a Feed but badges it `Demo` and routes it from `Más`. Recommendation for the later script pass: **reword L91 to name only what Familia relates (personas, lugares, horarios)** and **decide once whether the scene called "Feed" is a Feed or a family conversation**, then align script, master and presentation to that single choice. I do not make that decision here.
- **TARGET BEHAVIOR:** deferred to the script pass. Meanwhile the presentation should stage only connectors it can show: `personas`, `lugares`, `horarios`.
- **WHY:** AGENTS.md and §22 of this brief both forbid compensating for a script inconsistency with dishonest behaviour. Recorded, untouched.

---

---

## 13. Scene B positives to preserve

| # | Behaviour | Evidence | Instruction |
|---|---|---|---|
| **B-P1** | **The app shell.** Top bar, section grammar, card system, bottom nav with the brand FAB, `--home-*` token set extracted from the real app (`homeTokens.ts:3` — *"Recovered from the current app's index.css, Shell.tsx and ui.tsx"*), `#C96B45` app brand distinct from the presentation's `#E65C1B` stage accent. | compared against `fig-home.png`, `fig-familia.png`, `fig-cal-*.png` | **Keep verbatim.** Do not re-theme. |
| **B-P2** | **The `Familia｜Mapa｜Lugares` segmented control** reproduces Figma's `Tabs` exactly — order, structure, and the brand-soft selected pill on a light track. | `family-screen.css:4-6` vs `fig-familia.png` | **Keep.** This is the strongest single piece of target fidelity in Scene B. (The dead `Lugares` tab is a separate defect — B-18.) |
| **B-P3** | **The `Tareas｜Calendario｜Planes` segmented control** reproduces the target's `SegmentedControl`: pill translates via `left` (measured `3 → 84.33 → 165.66 px`, width constant at `81.33 px`), tab widths constant at 81/82/81 px across 222 sampled frames, `aria-selected` on tabs and `role="tabpanel"` + `aria-labelledby` on panels. | `planner-screen.css:19-24`; `PlannerTabs.tsx`; `transitions-ab.json` | **Keep.** Correctly built. Only the *title* above it is wrong (B-06). |
| **B-P4** | **One physical phone across Home → Planner → Family.** `HomePlannerSequence` keeps a single `PhoneFrame` and swaps in-phone layers, and `PhoneFrame`'s `--phone-scale` is the one working enlargement lever in the whole deck (measured at 0.96 / 1.00 / 1.08 with app layout constant at `282×602` in all 37 states). | `HomePlannerSequence.tsx`; `PhoneFrame.tsx`; `index.css:89-100` | **Keep the architecture.** Apply the device scale to the Map beat (B-11) instead of mutating the component. |
| **B-P5** | **Exit state survives reverse traversal.** Session 1 §6 measured 85/85 states with identical `.phone-frame` bounds, identical visible-text sets, and identical scrollable-node counts forward and backward. The only visible-level difference in the whole deck is a residual identity `matrix(1,0,0,1,0,0)` on a hidden layer at `S06_step04`. | `01_RUNTIME_BASELINE.md` §6 | **Keep.** The state machine is trustworthy; a developer can push and pull beats without fear. |
| **B-P6** | **Nothing moves on its own.** 8/8 hold tests stable over 10 s with `runningAnimations = [0,0,0,0,0]`; no auto-advance between narrative states, per NO-UI §3. | `01_RUNTIME_BASELINE.md` §7 | **Keep.** This is a hard requirement of live operation and it holds. |
| **B-P7** | **Complete clean-up on the S07 exit.** `.home-planner-sequence[data-exiting='true']` → `opacity: 0; visibility: hidden`, so the 204 product-stage descendants are not painted behind the veil. | `s07-silence.css:5-12`; measured | **Keep.** This is the correct implementation of master §2.4's "the product exits as a block". |
| **B-P8** | **`prefers-reduced-motion` is honoured in the map FLIP**, which is the most complex motion in Scene B. | `FamilyMapStage.tsx:70-77` | **Keep the pattern.** Whatever replaces B-11 must keep it. |
| **B-P9** | **A small honest truth already exists in the map:** `.map-demo-screen[data-compact='true'] .map-delay { opacity: 0; visibility: hidden }` — the code already knows the `+1 h` badge does not belong in the compact map. | `map-screen.css:25` | **Evidence that B-12's fix is already half-present.** Extend it to the expanded state. |

---

## 14. Figma target comparison

For each surface Session 2 needed. **No Figma UI is to be simplified.** The question in every row is *how the existing polished UI should be presented on stage*, not *what could replace it with bigger cards*.

### 14.1 Home

| | **CURRENT PRESENTATION** | **FIGMA TARGET** (`fig-home`, `nav=home`, 430×932) | **PRODUCT SEMANTICS** (Integration) | **PRESENTATION RECOMMENDATION** |
|---|---|---|---|---|
| Module title | none | `<h1>Hola, Gabriel</h1>` 19 px | 4 role-dispatched Home variants | **DEVICE SCALE + LOCAL VISUAL EMPHASIS.** No change of title required (the target's greeting is a Figma-specific demo artefact; the presentation's `Familia García / Juli` header is a faithful equivalent). Fill the device with the target's section grammar. |
| Sections | `HOY`, `PRÓXIMAMENTE` | `NECESITA ATENCIÓN` (Ver 4 más) · `HOY` (Ver 3 más) · `PRÓXIMO` (Ver 16 más) · `TE PUEDE SERVIR` · `QUÉ CAMBIÓ` | `attention / today / upcoming / undated` + inventory alerts + schedules | **Rebuild content, keep shell.** Add the attention section first, then `HOY`, then `PRÓXIMO`, with `Ver N más` on overflowing sections. |
| Row status | `Pendiente` → **`Completada`** | `Completar` · `Me encargo` · `Sin responsable` · `Venció ayer` · `Venció hace 5 días` | `HomeSummaryTaskStatus = 'pending' \| 'awaiting_verification'`; hard whitelist; no completed row | **REPLACE the completed state entirely.** Rows show `Pendiente` / `Por verificar`; actions are `Completar` / `Me encargo` / `Verificar`. |
| Completion surface | on the row, permanently | in `QUÉ CAMBIÓ`, as an activity line | `ActivityEntityType` includes `'task'`, **but** the backend writes activity only for `event`/`goal`/`milestone` | **Do not fabricate task completions.** If an activity line is needed, use an *event* activity, which is real. |
| Type floor | 9–30 px | 10–11.5 px | — | **NO type inflation.** Solve with framing. |

### 14.2 Planner — Tareas

| | **CURRENT** | **FIGMA TARGET** (`fig-cal-Tareas`) | **PRODUCT SEMANTICS** | **RECOMMENDATION** |
|---|---|---|---|---|
| Title | `Tareas` 26 px bold | **`Planner`** 24 px | `PlannerScreen.tsx:700` `<AppText variant="title1" weight="600" accessibilityRole="header">Planner</AppText>` | **One-line fix.** Move `Planner` into the `<h1>`, demote the tab label to the segmented control it already is. **VISUAL TARGET DELTA — align the presentation to the target.** |
| Task status | `COMPLETADAS`, 2 done rows | `REVISIÓN · 2` · `VENCIDAS · 2` · `HOY · 8` · `MAÑANA · 11` · `PRÓXIMAS · 25` · `SIN FECHA · 2`; per-row `Por verificar` + `Verificar`, `Te pidieron corregir`, `Vencieron ayer`, `Pide revisión`, `Sin responsable` + `Me encargo` | views `Pendientes/Hechas/Archivadas`; filters `Vencidas/Hoy/Próximas/Sin fecha`; `isAttention()` = `awaiting_verification ∨ past-due pending ∨ priority high` | **Rebuild the list from the target's own taxonomy.** Show `NECESITA ATENCIÓN` / `HOY` / `SIN FECHA` with real pending rows. |
| Responsabilidades | **absent** | `Pendientes｜Responsabilidades` secondary tab; surface captured at runtime with `DE LA CASA · 3` / `PAUSADAS · 1` and recurrence + policy + assignee per row | `PlannerTasksScreen.tsx:560-561` entry row → `Responsibilities`; `ResponsibilityScheduleKind = daily\|weekdays\|interval\|monthly\|after_completion`; `ResponsibilityAssignmentKind = fixed\|rotation\|claimable\|unassigned` | **Show the entry row and the live surface.** This is master §6 B2's "una responsabilidad recurrente", with real data available in both targets. |
| Emphasis | `emphasizeTasks` at `step01` tints both rows `#F6EDE8` | target uses `Pide revisión` / `Por verificar` affordances per row | — | **SELECTIVE EXPOSURE**: focus the attention group at full presence, drop the rest to 0.55–0.65. Never a size change. |

### 14.3 Planner — Calendario

| | **CURRENT** | **FIGMA TARGET** (`fig2-plendar-calendario`, `CalendarRoot` + `HorariosScreen`) | **PRODUCT SEMANTICS** | **RECOMMENDATION** |
|---|---|---|---|---|
| Title | `Calendario` 26 px | `Planner` 24 px | as above | as 14.2 |
| Entities | 1 event, no time | events + schedules | `PlannerCalendarScreen.tsx:46-49` `AgendaRow = event \| task \| schedule`; `:436` creation toggle `Evento｜Horario`; `HouseholdScheduleBlock { days_of_week, start_minutes, end_minutes }` | **Show one event with its time and one recurring schedule with its recurrence.** That satisfies all three clauses of L81 with two rows. |
| Privacy | none shown | per-person schedule privacy | `getSchedulePrivacy` → `{ is_visible_to_household }`; RLS via `can_view_household_schedule` (`planner.schedules.service.js:63-85`) | Respect the script's *"sus"* — show Juli's. `HW-B-008`'s request to show *"los de su familia"* is an **unauthorised widening** and should be refused. |

### 14.4 Planner — Planes

| | **CURRENT** | **FIGMA TARGET** (`fig-cal-Planes`) | **PRODUCT SEMANTICS** | **RECOMMENDATION** |
|---|---|---|---|---|
| Plan shape | 3-line text list | **progress + deadline + remaining count**: `Mudanza de mamá 33 % · 15 nov · Faltan 3 cosas`; `Comprar auto · Ahorro $650.000 / $5.000.000`; `Cumpleaños de Martina 50 % · Sáb 03` | `PlannerPlanDetailScreenV1.tsx` (677 L, milestones + linkedTasks) | **Adopt the target's shape.** A plan reads as multi-step because it has a percentage and a remaining count, not because it has three abstract lines. |
| Task titles | `Repartir tareas` · `Preparar cosas` · `Comprar lo que falta` — the exact strings master §7 C2 forbids | concrete titles throughout | **0 matches** for any of master's six approved strings anywhere in the repo; real titles are `Ordenar la cocina`, `Preparar mochila del colegio`, `Comprar leche y pan`, `Sacar la basura`, `Regar las plantas`, `Lavar ropa blanca` | **Concrete household steps. Never the abstract triple.** And **not** the `Cumpleaños` plan — Scene C owns that. |

### 14.5 Family — People

| | **CURRENT** | **FIGMA TARGET** (`fig-familia`) | **PRODUCT SEMANTICS** | **RECOMMENDATION** |
|---|---|---|---|---|
| Members | **3** cards, 3 different treatments, Juli absent | `4 integrantes`, **one** card, four uniform rows, `Vos`-equivalent marker | `FamilyMembersCard.tsx:134-136` dynamic count; `:210-214` includes current user; `MemberRow.tsx:46-48` `Vos` pill | **Adopt the target's single-card, uniform-row layout with all four members and a self-marker.** Fixes B-17 and supplies B-14's missing evidence. |
| Meta line | `Colegio` / `Casa` / `Trabajo` — a place with no time | `Trabajo · hace 1 h` — place **+ recency** | `getRelativeTime()` + `presence.place` | **Add the recency**, exactly as the target does. It is real, it is short, and it is what makes presence read as presence rather than as a label. |
| `ADMINISTRAR` | absent | `Datos de la familia` · `Invitaciones` · `Seguridad y SOS` | `can_manage_members`, `can_invite`, `can_review_join_requests`, `can_change_roles` (`services\family.ts:66-75`) | **Optional.** If the device has room after the four-member fix, this is the target's own way to fill it — and it happens to be where `Vos`-style role language lives. |

### 14.6 Family — Map

| | **CURRENT** | **FIGMA TARGET** (`Familia.tsx:80-133`) | **PRODUCT SEMANTICS** | **RECOMMENDATION** |
|---|---|---|---|---|
| Frame | promoted to a 1080×520 stage panel; phone at 12 % | map **inside** the screen; `FamilyMapPanel embedded` (`FamilyScreen.tsx:416-417`) | `PresenceScreen` keeps the map in normal flow | **CAMERA / CROP + SELECTIVE EXPOSURE inside the device.** Raise `--phone-scale` to 1.08 for this beat; keep top bar, `Mapa` title, tab switch and nav visible. Fixes B-11 and honours master §6 B5's *"aparecen bordes/chrome del teléfono"*. |
| Places | `Colegio`, `Club` pins | `MemberPin`s + named streets (`Av. Corrientes`, `Florida`) + `Lugares` context | `MapContextNavigation` = `Integrantes｜Lugares｜Yo`; `MapContextCard.tsx:93-96` empty state | **Keep the place pins; name the context.** Add the target's `Lugares` affordance or its real empty state — fixes B-18 honestly. |
| Schedule data | `Entrenamiento +1 h` at 64.8 px, brand-filled | **absent** | **absent** — schedules live in Planner | **REMOVE from the map.** Restore to the schedule surface with `18:00–19:00 → 18:00–20:00` per master §6 B4. Fixes B-12. |
| Proximity | none (authored pin percentages) | none (authored pin percentages) | **no capability** | **Do not invent.** Show place + recency + sharing status, which are real. Fixes B-13; the `8 min` request becomes OPEN-2. |
| Location consent | global 9 px caption `Ubicaciones compartidas` | none on the map; per-member in `MemberPermissionsScreen` (`ubicacion: 'Acceso limited'`, `Familia.tsx:279`); per-member status dot on member rows | `sharing_enabled` + `sharing_mode: off\|foreground\|background` + `PresenceMemberStatus`; map filters to sharers (`PresenceScreen.tsx:207-210`) | **Per-member state + a rule, not a fact.** Show each member's sharing state; any caption states the rule and is legible. Fixes B-14 and honours master §6 B5 + §4. |

### 14.7 Family — Lugares

| | **CURRENT** | **FIGMA TARGET** (`Familia.tsx:157` `LugaresTab`) | **PRODUCT SEMANTICS** | **RECOMMENDATION** |
|---|---|---|---|---|
| State | permanently dead | exists; **not captured at runtime** (recorded in §2) | `inventory-places`; `MapContextCard` places mode | **Either make it real or remove it.** Cheapest honest version: land it on the product's own empty state — *"No hay lugares guardados para este hogar"* (`MapContextCard.tsx:93-96`). |

### 14.8 Feed

| | **CURRENT** | **FIGMA TARGET** | **PRODUCT SEMANTICS** | **RECOMMENDATION** |
|---|---|---|---|
| Existence | a static post inside the Familia shell | **does not exist as a Feed**: `Messages.tsx:1023` *"la surface Feed ya no existe"*; `family-feed` → `ConversationScreen c1` | `FeedFamiliar` on `PrivateStack` (`AppNavigator.tsx:240`), only entry `Más → Actividad` (`MoreScreen.tsx:23-32`), **badged `Demo`** (`:93`) | **EDITORIAL transition, per master §6 B6's second branch.** Self-headed surface, own chrome, no Familia tab bar, bottom-nav selection changed or cleared. Resolve the host in the script pass (B-22, OPEN-3). |
| Shape | one `article`, `Responder` with no handler | a **conversation** with `sendMessage`, `createTopic`, `closeTopic`, `reply`, reactions, pins, stars, search, and a captured root showing `TEMAS` — *"…para que puedas retomarlas después"* | a **mock post feed** with reactions + inert comment affordances, zero HTTP | **Present it as a HomePlus-native family thread, not a social feed.** Send → `Yo puedo.` / `No llego.` → hold → the thread visibly has a place in a list. That is the only shape both targets can grow into, and it is what master §6 B6 describes. |
| Retention | unsupported | `TEMAS` + `closedTopicsList` + `starredMessages` + search | none | **Make the retention promise visible** with one honest gesture: the thread acquires a position in a list the audience sees. |

### 14.9 Figma target defects observed (recorded, not charged to the presentation)

| Observation | Evidence | Note |
|---|---|---|
| Bottom-nav destinations use `role="tab"` rather than navigation semantics, with no `aria-selected`. | measured at runtime: `Ir a Inicio`, `Ir a Familia`, `Ir a Calendario`, `Abrir Más opciones` all `role="tab"`; `Abrir acciones rápidas` is `role="button"` | A11y issue **in the target**. Do not replicate it in the presentation's device chrome. Recorded for whoever owns Figma-app. |
| Dead screens exist on disk: `screens\calendar\CalendarScreen.tsx:120`, `screens\planner\PlannerGoalsScreen.tsx:186`, `screens\planner\PlannerPlansScreen.tsx:23`, `screens\planner\PlannerSchedulesScreen.tsx:46` — present in the file tree, registered in **no** navigator. | Integration's equivalent set, same finding | Not a Scene B issue. Recorded. |
| Figma's family names (`Gabriel/Mariana/Juan/Martina`) differ from the script's (`Juli/Tomi/Mamá/Papá`). | `fig-familia.json` vs script L93 | **Not a defect.** Script-canonical data wins (master §3); the presentation is right and the target is a different demo household. Recorded so nobody "fixes" the presentation toward Figma here. |

---

## 15. UI enlargement audit

This section answers §7 of the brief directly: **what the Session-1 measurements mean.**

### 15.1 The three facts Session 1 established, and what they mean

| Session-1 fact | What it means |
|---|---|
| The phone uses whole-device scales 0.96 / 1.00 / 1.08 | **This is the correct and only enlargement mechanism in the deck.** It is a pure `transform: scale()` on `.phone-frame` with `transform-origin: top left`, plus the slot box set to `300×scale` by `620×scale`. The app's layout box never changes (`282×602` in all 37 states, re-confirmed). `1.08` yields `324×669.6` — **+8 % linear, +17 % area**, with **zero reflow, zero scroll, zero sibling movement**. Session 1's own conclusion (*"that is the lever the brief's §6/§8 describe, and it already exists"*) is correct. |
| There is no genuine local focus zoom anywhere | **Confirmed and now explained.** The largest configured focus value in Scene B is `--home-stage-focus-scale: 1.02` (`homeTokens.ts:13`), and the largest observed non-stage transform is `1.0178` (Scene A's `--opening-near-scale`). So "no focus zoom" is not an absence — it is two tokens set below the threshold of perception. Master §6 B1 wants 120–125 %, NO-UI §6 caps strong focus at 115 %. Neither is what is configured. |
| S06 enlarges by layout mutation: `250×200 → 1080×520`, label `15px → 41.04px`, canvas `1280×720 → 1450×789` | **It means the component leaves its device.** The type growth is not a decision at all — it is `container-type: inline-size` plus every map metric written in `cqw` (`map-screen.css:1-18`), so widening the box mechanically widens the type. The canvas growth is the stage's own scroll geometry changing mid-animation (measured: `scrollWidth` 1280 → 1450 in ~34 steps between ms 125 and 475). Nothing about this is camera-like; it is a component being promoted out of its frame and the frame being left behind at 12 % opacity. |

### 15.2 State-by-state: current technique, verdict, recommended technique

Legend for the recommended column: **DEVICE SCALE** · **CAMERA / CROP** · **SELECTIVE EXPOSURE** · **LOCAL VISUAL EMPHASIS** · **SHARED ELEMENT EXTRACTION** · **NO CHANGE**.

| State | Current technique | Why it succeeds / fails | Recommended stage technique |
|---|---|---|---|
| `S01_step00`…`S01_step10` | Editorial objects at authored coordinates; attention via opacity 0.69–1.00 + a 1.8 % scale | **Succeeds** on palette and register; **fails** on quantity (30.4 % coverage vs 65–80 %) and on accumulation (first object replaced, not kept). Type is fine at 30–34 px. | **SELECTIVE EXPOSURE** for A-B5's collective de-emphasis; **NO CHANGE** to type or coordinates. Growth in count, not size. |
| `S02_step00`…`S02_step05` | 84 px logos scattered; 80 px statement centred | **Fails.** 84 px is the second-smallest legible object in Scene A and it is carrying a narrative beat; the 80 px statement is 2.7× the icons it is supposed to be supported by. | **REPLACE the objects**, not the scale: real chat / calendar / folder at 200 px+ per master A2–A4. **NO CHANGE** to the 80 px statement's size (it is correct); change its tense and its timing. |
| `S02_step06` | 176 px numerals in an 844×225.59 band (66 % × 31 % of canvas) | **Fails.** A slogan at 264 px projected, in brand orange, two states before the reveal. | **REMOVE.** Per master A4. |
| `S03_step00` | 204 px icon + 78 px wordmark, vertically stacked, on a 0.28 orange radial | **Fails.** Stacked instead of horizontal; no orange fill; halo prohibited. | **NO CHANGE** to the 204 px icon (correct). **RECOMPOSE**: horizontal lockup, orange field, no halo. See A-11. |
| `S04_step00`…`S04_step05` | Whole device at 1.00; focus via `scale(1.02)`; completed rows via a chip + strike | **Device size is right; focus is 2 %; content is 3 rows.** The stage has ~980 px of empty frame and one 20 px title. | **DEVICE SCALE** to 1.08 for the Home beat only (`+8 %` linear, no reflow). **LOCAL VISUAL EMPHASIS** by `transform: scale(1.10–1.15)` on the focused row's copy **only** — **no reflow, no scroll, no sibling movement** — combined with **SELECTIVE EXPOSURE** dropping non-focused rows to 0.55–0.65 and the chrome to 0.82. Fill the device with the target's section grammar first (B-05). |
| `S05_step00`…`S05_step03` | Whole device at 1.00; tab swap is a 320 ms in-phone cross-fade | **Device size is right; the tab control is faithfully built; the content is 2 completed rows and 1 timed-less event.** | **DEVICE SCALE** 1.08. **SELECTIVE EXPOSURE** for the entry that matters (`Responsabilidades` on `step01`; the event on `step02`). **NO CHANGE** to the segmented control. |
| `S06_step00` | Whole device at 1.00 | Correct. | **NO CHANGE.** |
| `S06_step01`…`S06_step03` | **LAYOUT SIZE MUTATION** of `.family-map-stage` to `1080×520` at `(100,100)`, radius 16→28, shadow → `0 54px 120px`, phone at 0.12, canvas scroll mutated mid-flight, map geometry stretched (anisotropy 0.75 → 1.246) | **Succeeds** at making labels legible. **Fails** at product integrity on five measured counts (§10.6). | **DEVICE SCALE** 1.08 **+ CAMERA / CROP** *within the device* + **SELECTIVE EXPOSURE**. Keep `300×620` / `282×602` constant; keep top bar, `Mapa` title, tab switch and nav visible; drop the map's own secondary chrome to ~0.4. If pin labels still read small, add **LOCAL VISUAL EMPHASIS** by `transform: scale(1.10–1.15)` on the pin's **copy only** — **no reflow, no scroll, no sibling movement.** |
| `S06_step04` | Map collapses back into the 250×200 device slot; labels fall to 12–15 px; `Ubicaciones compartidas` at 9 px | **Fails legibility** at exactly the moment the narration asks *"quién está cerca"*. | **NO CHANGE** to the collapse (it is correct dramaturgy and it is what master §6 B5 wants to invert). **SELECTIVE EXPOSURE** to hide what is not opted in; **LOCAL VISUAL EMPHASIS** on the member rows' meta lines if needed. |
| `S06_step05` | Feed state, tab bar hidden | **Fails navigation.** | **SHARED ELEMENT EXTRACTION**: the technician post **detaches from the Feed surface and travels** into master §6 B7's synthesis frame with the Club pin, `20:00` and Tomi's avatar. That is the highest-value single motion available in Scene B and it is currently absent. |
| `S07_step00`, `S07_step01` | 132 px statement on `#060404`, nothing else | **Succeeds completely.** | **NO CHANGE. DO NOT RESIZE.** |

### 15.3 The constraint set, stated once

Every recommendation above obeys all five:

1. **NO REFLOW** — no layout box changes. Verified available: `PhoneFrame`'s `--phone-scale` is a pure `transform`, and `282×602` held in all 37 states measured this session.
2. **NO SCROLL** — `documentElement.scrollTop/Left = 0` in all 85 states (Session 1 §8.1); no enlargement technique may introduce a scrollable box. The current map technique *does* introduce scroll geometry (canvas `1450×789`), which is another reason to drop it.
3. **NO SIBLING MOVEMENT** — emphasis is applied to the focused element and to opacities only. Nothing shifts position to make room for a focus.
4. **REAL UI ONLY** — every surface compared in §14 already exists in Figma-app or Integration. This audit recommends **no new component anywhere**.
5. **NO FICTIONAL CAPABILITY** — where the product cannot do something (ETA/proximity), the recommendation is to show what it *can* show and to log the master as an OPEN, not to invent a number.

---

## 16. Motion audit — A + B

Evaluated per `motion-design`: purpose, timing, continuity, accumulation, exposure, visual priority. Differentiating **motion that communicates** from **motion that merely moves**.

### 16.1 Declared vocabulary vs. applied vocabulary

| | Declared | Applied in A+B |
|---|---|---|
| Easing | `cubic-bezier(.2,.8,.2,1)` (single) | same, everywhere |
| Durations | fast 220 / standard 320 / emphasis 420 / spatial 500 ms | same |
| Primitives | `ENTER`, `EXIT`, `REPLACE`, `ACCUMULATE`, `REFRAME`, `SPATIAL_WIPE`, `BLACKOUT` | `ENTER` once (insurance), **`REPLACE` once (groceries)** — the wrong primitive at the load-bearing moment (A-06); `ACCUMULATE` for the fragments texture; `REFRAME` for scene framing; `SPATIAL_WIPE` for the map; `BLACKOUT` for the S07 veil and the S03 blackout |
| Persistence models | `ACCUMULATIVE` / `EXCLUSIVE` / `SELECTIVE CONTINUITY`, declared per state | **not declared anywhere.** Observed: S01 behaves *substitutively* for its first three objects and *accumulatively* for the rest; S02 accumulates logos then replaces them with a slogan. |

**Motion-design verdict on the vocabulary:** the system is small, consistent, and correctly specified. The failure is not in the tokens — it is in **which primitive was chosen** (`REPLACE` at A-06) and in the absence of declared persistence models. Both are one-line decisions.

### 16.2 Transition-by-transition

| Transition | Purpose | Timing | Continuity | Accumulation | Exposure | Visual priority | Verdict |
|---|---|---|---|---|---|---|---|
| `S01_step00→01` | introduce instance 1 | 320 ms decelerate ✔ | none needed | begins | full | single object, full attention ✔ | **KEEP** |
| `S01_step01→02` | introduce instance 2 | 320 ms ✔ | **broken** — instance 1 leaves | **fails** — this is the pivot of the thesis | full | two objects never share the stage | **REJECT** (A-06) |
| `S01_step02→03…09` | accumulate secondaries | 320 ms each ✔ | each new bubble persists ✔ | works ✔ | none — all at 1.00 | 8 objects at equal weight | **PARTIAL** — accumulation works, hierarchy doesn't (A-09, A-10) |
| `S01_step09→10` | the thesis beat | 320 ms, adds one texture | ✔ | ✔ | none | nothing changes collectively | **REJECT** (A-08) |
| `S01_step10→S02_step00` | chapter change | 320 ms | light *increases* 0.075→0.10 | n/a | n/a | conclusion already on stage | **REJECT** (A-13) |
| `S02_step00→05` | add one logo per state | 320 ms ✔ | each persists ✔ | accumulates 6 logos | none | 84 px objects against an 80 px slogan — inverted priority | **REJECT** (A-03, A-04) |
| `S02_step05→06` | the argument lands | 320 ms cross-fade to the `6/1/0` band | the six logos **move into a grid** at 0.64 scale | **fails** — accumulation is replaced by a summary | 0.54 on the logos | 176 px orange numerals dominate | **REJECT** (A-03) |
| `S02_step06→S03_step00` | attention reset + reveal | **640 ms total; 115 ms of true black** | chaos correctly hidden (`opacity 0; visibility hidden`) | n/a | blackout 0→1→0; glow 0.10→0.28 | the lockup owns the frame for ~4 s | **REJECT** (A-02, A-12) — the single most important failure |
| `S03_step00→S04_step00` | hand to Scene B | 420 ms + position interpolation; phone arrives already at final scale (measured: opacity `0 → .698 → .952 → .998 → settled`, position `y 31.65 → 26.57 → 25.27 → 25`) | none — no shared element travels | n/a | n/a | none | **REJECT** (A-11, A-18) — Scene A ends without a handoff |
| `S04_step01→02` | focus instance 1 | 420 ms | ✔ | n/a | focus `1.02` | imperceptible | **REJECT** (B-03) |
| `S04_step02→03` | ~~complete~~ instance 2 | 420 ms | ✔ | n/a | **wrong state** | a `Completada` chip appears | **REJECT** (B-01) |
| `S04_step03→04` | ~~complete~~ instance 3 | 420 ms | ✔ | n/a | **wrong state** | second `Completada` chip | **REJECT** (B-01) |
| `S04_step04→05` | the autonomy beat | 420 ms | ✔ | n/a | chrome → 0.82 ✔ but the pending row loses its tint ✘ | nothing | **REJECT** (B-02) |
| `S04_step05→S05_step00` | real navigation to Planner | 320 ms in-phone layer swap | ✔ one physical phone (B-P4) ✔ | n/a | n/a | nothing external moves | **KEEP the mechanism.** Needs the `Planner` title (B-06) and pending rows (B-07). |
| `S05_step01→02` | Tareas → Calendario | 320 ms panel swap; pill translates 3 → 84.33 px | ✔ tab widths constant | n/a | n/a | the pill, correctly | **KEEP** |
| `S05_step02→03` | Calendario → Planes | 320 ms; pill 84.33 → 165.66 px | ✔ | n/a | n/a | the plan, wrongly chosen (B-09) | **KEEP motion, REPLACE content** |
| `S05_step03→S06_step00` | individual → household | 320 ms cross-fade | **none** | n/a | n/a | nothing widens | **REJECT** (B-10) |
| `S06_step00→01` | map enlarges | layout switches in **1 frame** (ms 0 → ms 21), FLIP then runs 500 ms | the *component* is continuous ✔ | n/a | phone 1 → 0.12 | the map panel owns 60 % of the stage | **REJECT the technique** (B-11) — visually smooth, semantically wrong |
| `S06_step01→02` | add Club | 320 ms | ✔ | ✔ | phone stays 0.12 | ✔ | **KEEP** |
| `S06_step02→03` | add people + `+1 h` | 320 ms | ✔ | ✔ | phone stays 0.12 | **`+1 h` at 64.8 px in brand orange takes over** | **REJECT** (B-12) |
| `S06_step03→04` | map recedes | layout switches back in 1 frame, FLIP 500 ms; canvas scroll shrinks back | ✔ | n/a | phone 0.12 → 1 | ✔ | **KEEP the dramaturgy, REJECT the mechanism** |
| `S06_step04→05` | Map → Feed | 320 ms layer swap; tab bar `opacity → 0` | **none** — no shared element | n/a | n/a | the new surface owns the frame with **no navigation at all** | **REJECT** (B-15) |
| `S06_step05→S07_step00` | product exits, veil settles | 220 ms block exit + 220 ms veil (`--motion-blackout-duration`) | n/a | n/a | the product goes to 0 | nothing, correctly | **KEEP** (B-21) |
| `S07_step00→01` | the statement enters | 420 ms opacity + 12 px rise | n/a | n/a | n/a | one idea | **KEEP EXACTLY** (B-21) |

### 16.3 Motion that communicates vs. motion that merely moves

| Motion | Verdict |
|---|---|
| The opening bubbles' 320 ms decelerating entrance with a 12 px rise | **Communicates.** It reads as "someone said this", which is the point. `motion-design`'s rule — *"Animation only for progressive disclosure or emphasis"* — is satisfied. |
| `opening-chaos-light` rising 0 → 0.18 at `step10` | **Merely moves.** It brightens a warm field at the thesis beat. Master §2.1/§5 give the orange no pre-reveal job. Should be neutral or absent. |
| The `6/1/0` band scaling the six logos to 0.64 and re-centring them | **Merely moves, and destructively.** It converts accumulation into a summary, which is the argument A-03 rejects. |
| The map FLIP (500 ms, `cubic-bezier(.2,.8,.2,1)`, compositor-only) | **Technically excellent, narratively wrong.** It is the best-implemented motion in Scene B — sampled transform runs `0.2315 → 1.0` smoothly with no layout thrash inside the flight — and it moves a product component out of its device. Master §2.9 and §6 B5 require the device to remain. |
| The S07 veil (220 ms) + statement (420 ms) | **Communicates.** The only place in Scene B where motion is doing exactly one job. |
| The 2 % row "focus" | **Neither.** Below the perceptual threshold; it is neither emphasis nor disclosure. |

### 16.4 Motion findings, ranked

| # | Finding | Severity |
|---|---|---|
| **M-1** | `S06_step00→01` and `step03→04`: a live product component is promoted out of its device and the stage canvas's own scroll geometry mutates mid-flight (measured 1280→1450 in ~34 steps). Master §2.9/§6 B5 violated. | HIGH (paired with B-11) |
| **M-2** | `S05_step03→S06_step00`: a scope change is animated as a content change. No shared element crosses the boundary. | HIGH (paired with B-10) |
| **M-3** | `S02_step06→S03_step00`: a 115 ms blink is asked to cover a 4–5 s sentence, and the answer is on screen for 90 % of it. | BLOCKER (paired with A-02) |
| **M-4** | `S01_step01→02`: `motion="REPLACE"` at the accumulation pivot. | HIGH (paired with A-06) |
| **M-5** | No persistence model is declared for any state in Scene A, contrary to NO-UI §9 (*"Cada state debe declarar explícitamente su modelo"*). | MEDIUM |
| **M-6** | No auto-beat exists for either of Scene A's two places that need one: the 11-entry saturation burst (8 consecutive manual presses vs NO-UI A04's *"900–1200 ms"* burst) and the WhatsApp history scroll (absent entirely). Master §2.10 requires *"ningún bloque exige disparar 5–10 objetos individualmente"*. | MEDIUM |
| **M-7** | `opening-chaos-light` and `metrics-zero-light` are the only two motions in Scene A with no narrative function; both are pre-reveal orange. | LOW (subsumed by A-01) |

---

---

## 17. Human hypothesis adjudication

Every `HW-A-*` (11) and `HW-B-*` (20), plus `HW-J-000`. Verdicts are `CONFIRMED` / `PARTIALLY CONFIRMED` / `REJECTED` / `SCRIPT ISSUE` / `INSUFFICIENT EVIDENCE`.

### 17.1 Scene A

| ID | Verdict | Reason |
|---|---|---|
| **HW-A-001** — no visual reference for the fridge/warranty beat | **CONFIRMED** | There *is* a reference, but it arrives at `S01_step08` — the eighth of eleven states, after six unscripted bubbles — and it is a chat bubble, not the warranty document master §5 A1 item 3 and NO-UI A03 require. Measured visible-element counts per state in §3. **HIGH.** |
| **HW-A-002** — "skip ×3 after the shopping" | **CONFIRMED, with a different cause than the observer assumed** | The skip is real and the cause is not pacing: after `S01_step02` the promised principal objects are **absent** (insurance gone, bag gone, fridge not yet arrived) because `groceries` uses `motion="REPLACE"` and `present={stepIndex === 2}` (A-06). The operator presses through states in which nothing the narration mentions exists. **HIGH.** |
| **HW-A-003** — "ninguna de estas cosas por separado es grave" was lost | **CONFIRMED** | No state, no motion, no de-emphasis pass exists at that line. Script L24 has no representation on stage at all (A-08). **HIGH.** |
| **HW-A-004** — "everything grows, nothing shrinks, they compete; the icons read as *algo raro*" | **PARTIALLY CONFIRMED** | The shrink mechanism **does** exist: three elements drop to `opacity 0.69` + `blur(0.35px)` at `step10`, four get bespoke `0.88 / 0.93 / 0.96 / 1.00`, and the nearest element gets `scale(1.018)`. The measured spread (0.69 → 1.00, scale 0.948 → 1.018) is too narrow to build hierarchy across seven objects, and 0.35 px of blur is imperceptible. The observer's *"algo raro"* is better explained by A-05/A-09 — wrong objects, too few — than by the weight treatment. **MEDIUM.** |
| **HW-A-005** — nothing says *"el problema es que se acumulan"*; it goes straight to the slogan | **CONFIRMED** | No state at that beat; the transition into `S02_step06` is a cross-fade from logos to a `176 px` numeral band with no accumulation beat in between. A-08, A-09. **HIGH.** |
| **HW-A-006** — the three locations have no representation | **CONFIRMED, and worse than reported** | The script names **3** locations, master §18 names **4**, the stage shows **6** brand logos. None of the three versions agrees with the other two. The observer's own suggestion — reuse the phone where a document already appeared, then send the phone away — is a better solution than what was built. **BLOCKER** (as part of A-03). |
| **HW-A-007** — *"esa diapositiva que dice eso **es correcto**"* | **CONFIRMED as a positive — but with two defects the observer did not hear** | Using one approved conceptual line here is right and should be kept. But the rendered copy is **`La información ya existe.`** (present tense) against the frozen `La información ya existía.` and the spoken *"ya existía"*, and it is on stage for **six consecutive states**, starting before the first logo appears. The observer approved the idea, not the tense or the placement. **HIGH** (A-04). |
| **HW-A-008** — *"6 apps, una familia, cero coordinación"* attacks "zero coordination", which is weak | **CONFIRMED — and stronger than the observer argued** | The master **explicitly forbids this exact slogan**: §5 A4 *"No usar slogans adicionales tipo `6 apps / 1 familia`."* So it is not a weak argument the team chose; it is a prohibited construction. The semantic objection also stands: distributed coordination is the household's reality, not a defect. **BLOCKER** (as part of A-03). |
| **HW-A-009** — the black moment has an orange glow behind it | **CONFIRMED, and understated** | Measured: every `.ambient-glow` on stage is `#E65C1B` — **opacity 0.075** through all of S01, **0.10** through S02, **0.28** in S03, plus `opening-chaos-light` 0.18 at `step10` and `metrics-zero-light` 0.14 at `step06`. Plus `.metric-zero` in **`rgb(230,92,27)` at 176 px** at `step06`. The observer's *"mínimo de resplandor naranja"* is in fact the HomePlus accent on every pre-reveal frame, and the largest instance sits exactly at the reveal. The observer's *mechanism* ("a black rectangle over the background we already had") is wrong — the blackout is a real full-canvas `#000000` layer that reaches full opacity — but the *conclusion* is right. **HIGH** (A-01). |
| **HW-A-010** — the four pillars have no visual reference | **CONFIRMED** | `S03` is a **single state** (`stepCount: 1`). Its whole stable frame is a 204 px icon + 78 px wordmark. No people, no photo frame, no responsibility markers, no documents. Fourteen spoken lines (L48–L61) have no representation. **HIGH** (A-11). |
| **HW-A-011** — *"no podríamos no dejar al Colo simplemente que hable y que la gente comprenda"* | **CONFIRMED** | Exactly what happens: L48–L61 is delivered over a static centred logo. The observer's instinct — that this passage needs visual support — is right, and master §5 A7–A9 already specifies the support in detail. **HIGH** (A-11). |

### 17.2 Scene B

| ID | Verdict | Reason |
|---|---|---|
| **HW-B-001** — *"eso está bien"* (Home shows attention first) | **CONFIRMED as a positive** | `S04_step00` does lead with Juli's context and the attention rows. **BUT** the claim is carried by only three rows, and from `step03` the two attention rows are struck through — so the module's opening claim is honest for exactly two of its six states. Preserve the intent, rebuild the content (B-05). **POSITIVE + HIGH dependency on B-01/B-07.** |
| **HW-B-002** — the screen says COMPLETADO, the narration says PENDIENTE | **CONFIRMED — and worse than reported. BLOCKER upheld** | Not just a strikethrough: a literal **`Completada`** chip, a filled brand checkmark, `text-decoration: line-through`, and `aria-label="Completada"`. Measured at `S04_step03/04/05`, and it **persists into Planner**, where the Tareas heading becomes `COMPLETADAS`. Product truth is unambiguous: `HomeSummaryTaskStatus = 'pending' \| 'awaiting_verification'` with a hard whitelist; the filled checkmark exists only as a **420 ms** optimistic flash after a user tap; there is **no `line-through` anywhere in Home**. **BLOCKER** (B-01). |
| **HW-B-003** — *"primero se ilumina Educación Física… no sé si lo haría exactamente así"* | **PARTIALLY CONFIRMED, and the measurement resolves the doubt** | The mechanism is real but is a **`scale(1.02)`** — a 2 % change on a 20 px title, i.e. 0.4 px. The observer's uncertainty is well-founded: the treatment does not do what it appears to do. The incoherence they sensed is not the highlight-vs-strike asymmetry; it is that the highlight is imperceptible and the strike is irreversible. **HIGH** (B-03). |
| **HW-B-004** — Planner shows 2 items and nothing else; no incomplete tasks | **CONFIRMED** | `S05_step00/01`: heading `COMPLETADAS`, **zero** pending rows, `.planner-unchecked` count = 3 belonging to the *Planes* panel. Against the target's `REVISIÓN · 2 / VENCIDAS · 2 / HOY · 8 / MAÑANA · 11 / PRÓXIMAS · 25 / SIN FECHA · 2` and the product's own four-group taxonomy, the presentation's Tareas panel is empty of work. **HIGH** (B-07). |
| **HW-B-005** — *"No se ve la parte donde aparece responsabilidades"* | **CONFIRMED — and the surface already exists in both targets** | Zero occurrences of the string in any of the 37 states. Integration registers a `Responsibilities` screen reachable from the Tareas entry row (`PlannerTasksScreen.tsx:560-561`, `HomeTabNavigator.tsx:214-217`) with `schedule_kind` and `assignment_kind` on the entity. Figma implements it with recurrence + rotation policy + assignee, captured at runtime. So `HW-B-007`'s suggestion is not needed — the capability is real and simply absent here. **HIGH** (B-07). |
| **HW-B-006** — the module title should be *Planner*, not *tareas/calendario/planes* | **CONFIRMED against both targets independently** | Figma-app renders `<h1>Planner</h1>` at 24 px with the three tabs beneath (measured `heading: [{tag:'H1', text:'Planner', fs:'24px'}]`). Integration: `PlannerScreen.tsx:700` `<AppText variant="title1" weight="600" accessibilityRole="header">Planner</AppText>`. The presentation's `<h1>` is the tab label at 26 px. **HIGH** (B-06). |
| **HW-B-007** — *"podríamos ingresar a la screen de responsabilidades y mostrar las asignadas, por ejemplo a Juli"* | **NOT A DEFECT — a suggestion that the targets already satisfy** | Recorded as a hypothesis of **carencia**, not of error. Both targets provide the surface; Integration's model even supports "assigned to Juli" via `assignment_kind: 'fixed'` + `person_id`. Recommendation absorbed into B-07. **No separate severity.** |
| **HW-B-008** — the script says *"sus eventos"*; the observer asks for *"los de su familia"* | **REJECTED as an unauthorised widening** | The script's word is `sus` (L81). Showing household-wide events would widen the claim beyond what the speaker says, which master §16 rule 2 forbids (*"¿La acción existe realmente en la app? Si no, marcarla como editorial"*). **Separately, the presentation shows neither** — one event, no time, no schedules (B-08). The correct fix is to show **Juli's** event with its time and **Juli's** recurring schedule, not the family's. |
| **HW-B-009** — horarios and responsabilidades share the same recurrence model; the asymmetry is unjustified | **CONFIRMED — stronger than stated** | Both are real recurrence models in the product: `ResponsibilityScheduleKind = 'daily' \| 'weekdays' \| 'interval' \| 'monthly' \| 'after_completion'` (`plannerResponsibilities.ts:6`) and `HouseholdScheduleBlock { days_of_week, start_minutes, end_minutes }` (`plannerSchedules.ts:5-17`). The presentation shows **neither** in Scene B, so it never has to treat them asymmetrically — it simply omits the shared concept the observer identified. Fixing B-08 exposes it properly. **MEDIUM.** |
| **HW-B-010** — the observer **pardons** Plans' lack of detail | **NOT A DEFECT as stated — but a different, unflagged defect exists** | The observer explicitly accepts Plans' shallowness. However the current plan shows the **exact three literal strings master §7 C2 forbids** (`Repartir tareas / Preparar cosas / Comprar lo que falta`) and it is Scene C's content shown one scene early. Neither was noticed. **HIGH** (B-09). |
| **HW-B-011** — the switch to Familia cannot be a simple screen change | **CONFIRMED** | Measured: one press, one 320 ms cross-fade between two `position:absolute; inset:0` siblings; identical device `300×620` at `(570,50)`; identical screen `282×602` on both sides. Nothing widens, no shared element crosses. The script's hinge is a change of **scope** and the stage delivers a change of **content**. **HIGH** (B-10). |
| **HW-B-012** — *"tampoco que el Figma sea literalmente lo que está actualmente… culpa de mi compañero que no implementó Feed y Family en el Figma"* | **CONFIRMED, with the root cause identified at source level** | The observer is right that the presentation's Familia is not Figma's, and right that the cause is missing implementation. The source confirms it precisely: `Messages.tsx:1023-1029` — *"la surface Feed ya no existe"*, `family-feed` → `ConversationScreen c1`, `feed-comments` → the same. So Feed and the family conversation were collapsed into one surface. The observer's judgement that this is **not their own error** is also correct: the presentation cannot be expected to match a target surface that does not exist. **Recorded as a target-side gap, not a presentation defect.** |
| **HW-B-013** — *"Las conversaciones no son parte del módulo, son de Feed"* | **SCRIPT ISSUE — and it is frozen into the master too** | Confirmed, and worse: `HOMEPLUS_PRESENTATION_MASTER_FREEZE_V1.0.md` §18's canonical script carries the **same** L91 wording, so the presentation cannot be aligned without a master change. Logged as `SI-05`; this session adds that "conversations" is not in Figma's `Familia | Mapa | Lugares` at all, and that Integration has **no** conversation surface (0 matches for `conversation|thread|chat` in `backend\src\**`). The observer's warning — *"no caigamos sin que los errores del guion interrumpan la presentación"* — is well placed. (B-22) |
| **HW-B-014** — *"aparece Familia… después se hace un mapa… y de nada aparece entrenamiento +1 hora"* | **CONFIRMED** | Measured order: `Colegio` at `step01`, `Club` at `step02`, `Entrenamiento +1 h` at `step03`. The script's order is the reverse: the change is L97, the places are L109. The cause arrives after its own consequence, and arrives as the **largest, most saturated object on the enlarged map** (64.8 px, `background rgb(201,107,69)`). **HIGH** (B-12). |
| **HW-B-015** — *"`+1 h` no tiene por qué aparecer en mapa"* | **CONFIRMED, and the observer's alternative is only half right** | Right that the map is the wrong place. But the observer's alternative — that it belongs in Feed — is not where the product puts it: schedule changes are Planner events/schedules (`updatePlannerEvent` PATCH `/api/planner/events/:id`; `updateHouseholdSchedule` PATCH `/api/planner/schedules/:id`), and the map has no notion of a schedule at all (`MapContextNavigation` = `Integrantes｜Lugares｜Yo`). Master §6 B4 puts it in the schedule surface with `18:00–19:00 → 18:00–20:00`. **HIGH** (B-12). |
| **HW-B-016** — *"Feed … no es de familia, es de More, o sea los tres puntitos"* | **CONFIRMED EXACTLY, including the navigation path** | Integration: `FeedFamiliar` is a `PrivateStack` route (`AppNavigator.tsx:240`), **not** in `MoreStackParamList`, **not** in Familia; its only incoming navigation is `MoreScreen.tsx:23-32` with `label: 'Actividad'` and a `Demo` badge (`:93`). The presentation shows it **inside** the Familia shell with the tab bar hidden. Additionally: Figma has no Feed at all. So the observer's navigation claim is correct *and* there is a second, deeper delta they could not see. **HIGH** (B-15). |
| **HW-B-017** — *"no lo hacemos como mensaje en el grupo familiar, como en el Feed. Está hecho de otra manera"* | **PARTIALLY CONFIRMED** | The "hecho de otra manera" is right, and the reason is now known: Integration's Feed is `MOCK_POSTS` with zero HTTP calls and inert comment buttons (`:214-217`, `:224-230`), and Figma's Feed is a conversation. There is no "right way" to copy — the target surface does not exist. The **shape** the presentation chose (a post with a question) actually matches Integration's `Post` type more closely than Figma's thread, so the shape is defensible; the *placement* (B-15), the *missing thread and replies* (master B6 requires `Yo puedo.` / `No llego.`) and the *absent retention evidence* are not. **HIGH** (B-16). |
| **HW-B-018** — *"después soy una screen negra y después pasamos a coordinarnos… está bien"* | **CONFIRMED as a positive** | `S07_step00` is a settled `#060404` veil at `opacity 1` with `.s07-statement` at `opacity 0` and the product stage at `visibility: hidden`; `S07_step01` adds one line of 132 px type and nothing else. Stable with 0 running animations over a 10 s hold. **KEEP EXACTLY, INCLUDING THE SIZE.** (B-21) |
| **HW-B-019** — *"no está bien toda la coordinación directamente de la parte, el módulo Familia con lo que digo con respecto a lo que se ve"* | **CONFIRMED, with a sharper mechanism than the observer had** | The contradiction is not in S07's text — it is in S06's map. Measured: `Ubicaciones compartidas` as a single always-on 9 px global caption with no toggle and no per-person state (B-14), plus a 64.8 px brand-orange schedule badge (B-12) and pins at arbitrary coordinates (B-13). The product's own copy already says what S07 says (*"Compartís solo cuando lo activás"*, `PresenceScreen.tsx:619-620`) and it renders the negative case as a first-class status (`getStatusLabel()` → `'No estás compartiendo'`, `:69-74`) — evidence the presentation never shows. **HIGH** (B-19). |
| **HW-B-020** — the script's `[Pausa]` has no state of its own | **REJECTED** | Measured: `S07` has `stepCount: 2`. `step00` is a state in which the veil has settled and the statement is at `opacity: 0` — the pause **does** have its own state, one press before the phrase. The walkthrough heard them arrive together. Recorded note: whether 220 ms of veil is *enough* silence is an ear-level judgement this audit cannot make (no audio). |

### 17.3 Global

| ID | Verdict | Reason |
|---|---|---|
| **HW-J-000** — *"la presentación, al menos, tiene una base acompañando [el] guion, pero no es lo que estamos buscando"* | **PARTIALLY CONFIRMED — and Session 2 sharpens it into something measurable** | The "base acompaña el guion" half is **wrong** for Scene A: 6 of 17 spoken beats have no visual state and one is contradicted by the stage. The "no es lo que buscamos" half is **confirmed** and the pattern behind it is now quantified: **9 of 19 Scene B states show content the narration does not mention, and 5 of the 8 named Scene B capabilities are absent.** The observer's structural finding (§5.3 of `00_HUMAN_HYPOTHESES.md`: *"EL GUION DICE ALGO Y LA PANTALLA NO LO MUESTRA"*) holds across both scenes — but Session 2 adds a second, previously unnamed pattern that is **worse** in Scene B: **the screen says something the narration did not say** (a completed task, an always-on location state, a schedule on a map). That is not incompleteness; it is contradiction, and it is where the BLOCKERs are. |

### 17.4 Tally

This tally counts **hypothesis verdicts** (`HW-*`), **not issue severities**. It is not a blocker count. Hypothesis verdicts and audit-issue severities are separate axes and must not be added together. For the canonical blocker count see §1 and `audit/00_AUDIT_NORMALIZATION.md` §N-01.

| Verdict | HW-A-* | HW-B-* |
|---|---|---|
| CONFIRMED | 8 | 13 |
| PARTIALLY CONFIRMED | 1 | 4 |
| REJECTED | 0 | 2 |
| SCRIPT ISSUE | 0 | 1 |
| NOT A DEFECT (suggestion / target-side gap) | 0 | 2 |
| POSITIVE (closed-positive, upheld) | 2 | 2 |
| **Total hypotheses adjudicated** | **11** | **20** |

Of the 31 adjudicable hypotheses, **0** were rejected for lack of evidence. Every one was testable against the six sources, and each received a verdict backed by a measurement or a source citation.

**Note on the Session-0 blocker *candidates*.** `00_HUMAN_HYPOTHESES.md` §5.4 lists **9** items under *"Candidatos a BLOCKER (NO CONFIRMADOS — requieren runtime)"*. Those are unadjudicated Session-0 candidates, **not** verdicts, and they are **not** the Session-2 blocker count. Of the candidates falling inside Scenes A and B, this session adjudicated: `HW-B-002` → **CONFIRMED, BLOCKER upheld** (`B-01`) and `HW-A-009` → **CONFIRMED, HIGH** (`A-01`, deliberately not a blocker because the orange is a colour-grammar violation, not a story-breaking one). The remaining candidates belong to Scenes C–J and were not adjudicated here.

---

## 18. Prioritized remediation list — A + B

No code. Ordering is by *narrative dependency*, then by severity, then by cost.

### P0 — blocks the story. Do these first.

**P0 carries all 3 of the session's BLOCKERs: `A-02` (P0-1), `B-01` (P0-3), `A-03` (P0-4).** P0-2 and P0-5 are `HIGH`-severity prerequisites that the BLOCKER fixes depend on.

| # | Action | Fixes | Cost |
|---|---|---|---|
| **P0-1** | **Give the key question its own black state that holds for the length of the sentence.** Clear everything to `#000000`; add a manual-trigger state that stays black; add a second state for the icon alone; keep the hero auto-beat for the third. The hold must be speaker-driven, never a timer. | **A-02 (BLOCKER)**, and it is the precondition for A-08's clear | Low — 2 new states, no new animation |
| **P0-2** | **Delete every trace of HomePlus orange before the reveal.** Neutralise `.ambient-glow` to a non-accent colour at ≤ 0.05 opacity for S01/S02; make `.metric-zero` inherit `--presentation-text`. | **A-01**, A-12, M-7 | Very low — 2 token changes |
| **P0-3** | **Remove `authorizationCompleted` / `schoolTaskCompleted`.** Set both to `false` permanently; delete the `Completada` chip, the strikethrough and the filled checkmark from the Home demo surface; change the Planner Tareas fixture so its rows are `pending` and the heading is not `COMPLETADAS`. | **B-01 (BLOCKER)** | Very low — 2 props, 3 fixture rows |
| **P0-4** | **Restore the A2–A4 sequence.** Build the real WhatsApp pass, the calendar pass, a file pass, a true black state for *"en la cabeza de alguien"*, the WhatsApp return + type + scroll landing on `Ma ❤️: Esta semana lo busco yo a Tomi.`, and the four fragments with `La información ya existía.` Delete the `6/1/0` slogan. | **A-03 (BLOCKER)**, A-04, A-05 | High — this is a new sequence |
| **P0-5** | **Build Scene A's post-reveal sequence (master A6–A9).** Orange field → horizontal white lockup → four people → photo-frame flash → responsibility markers → documents → control/equality → 105/110/115 → house outline → camera push → Juli morphs into Home. | **A-11**, A-12, A-18 | High — ~9 new states |

### P1 — materially weakens comprehension or stage impact.

| # | Action | Fixes |
|---|---|---|
| **P1-1** | Make `insurance`, `groceries` and a physical `warranty` document **all persist** to the clear; switch `groceries` from `motion="REPLACE"` to `ACCUMULATE`; move the warranty to the third press. | A-06, A-07, A-14 |
| **P1-2** | Add the two missing Scene A beats: a **collective de-emphasis** state for L24, and a **clear to black** for L26. Declare a persistence model for every Scene A state. | A-08, A-13, M-5 |
| **P1-3** | Rebuild the saturated state to **10–14 pieces at 65–80 % coverage**, mixing messages, documents and one or two objects; make the burst a **single auto-beat** of 900–1200 ms. | A-09, A-10, M-6 |
| **P1-4** | Put **`Planner`** in the Planner `<h1>` (24–26 px, `accessibilityRole="header"`) and demote the tab label to the segmented control it already is. One structural change. | B-06 |
| **P1-5** | Rebuild the Planner **Tareas** panel from the target's own taxonomy: real pending rows under `NECESITA ATENCIÓN` / `HOY` / `SIN FECHA`, plus the visible `Responsabilidades / Rutinas y obligaciones de la casa` entry row and, on press, the real recurring-responsibility surface with recurrence + policy + assignee. | B-07, `HW-B-005` |
| **P1-6** | Give Calendario **one event with its time** (`Educación Física · 08:00`) **and one recurring schedule row** (`Entrenamiento · Mar a Vie · 18:00–19:00`). Show **Juli's**, not the household's. | B-08, `HW-B-008` |
| **P1-7** | Replace the map's layout mutation with **device scale 1.08 + in-device camera/crop + selective exposure**, keeping the top bar, `Mapa` title, tab switch and nav visible. | **B-11**, M-1 |
| **P1-8** | Delete `.map-delay` from the map. Restore `18:00–19:00 → 18:00–20:00` with a `~115 %` scale to the **schedule surface**, before the places. | B-12, `HW-B-014`, `HW-B-015` |
| **P1-9** | Remove the fabricated geography. Show **place + recency + sharing status** per member, exactly as Figma's `Ahora` sheet does. No distance, no ETA. | B-13, **OPEN-2** |
| **P1-10** | Replace the global `Ubicaciones compartidas` caption with **per-member sharing state** plus one legible caption that states the *rule*, not the fact. | B-14, B-19 |
| **P1-11** | Re-stage Feed as an **explicit editorial transition** (master §6 B6's second branch): content exits the device, a self-headed surface enters with its own chrome, no Familia tab bar, bottom-nav selection changed or cleared. Then send the message, land `Yo puedo.` / `No llego.`, hold, and make retention visible with one list gesture. | B-15, B-16, **OPEN-3** |
| **P1-12** | Add master §6 B7's **Family synthesis** before S07: people list → the four callbacks (Tomi avatar, Club pin, `20:00`, technician card) → connected by a few thin lines → out to black on the pause. | B-19, and it lands `20:00` which B-12 currently strands |
| **P1-13** | Add a **scope-widening bridge** at `S05→S06` (master-open, see OPEN-4): an exposure cascade from Juli's rows to the four household members as a `SHARED_ELEMENT` callback, at identical framing. | B-10, M-2 |
| **P1-14** | Set the focus scale to **1.10–1.15** on the row copy only (`transform`), with non-focused rows at 0.55–0.65 exposure. No reflow, no scroll, no sibling movement. | B-03 |

### P2 — coherence, consistency, polish.

| # | Action | Fixes |
|---|---|---|
| **P2-1** | Fix the CSS cascade so `attention` outranks `complete`; the pending row keeps its tint at `step05`. | B-02 |
| **P2-2** | Make Home's date semantics match the narration: all three items on the same day, with the event carrying its time. | B-04 |
| **P2-3** | Fill the device the way the target does — attention section, `HOY`, `PRÓXIMO`, `Ver N más` — and raise the Home/Planner beats to `--phone-scale: 1.08`. | B-05 |
| **P2-4** | Planes: adopt the target's plan shape (progress %, deadline, remaining count), concrete household steps, **and not** the `Cumpleaños` plan. | B-09 |
| **P2-5** | Familia: four members, uniform rows, one card, a self-marker, place + recency on every meta line, one heading level. | B-17 |
| **P2-6** | Make `Lugares` real or remove it; cheapest honest version is the product's own empty state *"No hay lugares guardados para este hogar"*. | B-18 |
| **P2-7** | Reconcile master §6 B1's `120–125 %` with NO-UI §6's `≤ 115 %` cap, and set the token accordingly. | B-03, **OPEN-5** |
| **P2-8** | Reconcile the stage accent `#E65C1B` with master §2.1's frozen `#E7643F`, and enlarge the two principal opening objects to master A01's 420–520 px. | A-14, **OPEN-1** |

---

## 19. Exact handoff to presentation developer

Written to be executed literally. Each item names **what, when, why, and how visually**. No code. Scene order as presented.

### Scene A — opening

1. **Before L15 (*"Imaginen un martes cualquiera"*) — the frame is `#000000`.** Not `#0B0908`. Do not put an orange radial anywhere in S01 or S02. Set `--presentation-accent` usages inside `.ambient-glow` to a neutral grey at opacity ≤ 0.05, or remove the glows entirely from S01–S02. Keep the glow visible only from the reveal onward.

2. **On L18 (*"mama da por hecho que papa pagó el seguro del auto"*) — the invoice enters from above**, once. Grow it from 304 px to **440–480 px** wide. Keep its paper surface, dog-ear, `FACTURA` eyebrow at 18 px / 3 px tracking, `Seguro del auto` at 38 px, −6°→−2° rotation. **It stays on stage until the clear at L26. Do not remove it.**

3. **On L20 (*"…el hijo ya hizo las compras"*) — the bag enters lower-right and the invoice stays.** Change `groceries` from `motion="REPLACE"` to `motion="ACCUMULATE"`, and change `present` from `stepIndex === 2` to `stepIndex >= 2`. Grow it to 380–440 px wide. **Two objects on stage, not one.**

4. **On L21 (*"…nadie sabe en dónde quedó la garantía"*) — a warranty *document* enters upper-right.** Move it from state 8 to state 3. Off-white paper, recognisable as a guarantee, no chat bubble. **All three principal objects now coexist.** Keep it on stage until the clear.

5. **After L24 (*"Ninguna de estas cosas por separado es grave"*) — one new state: the whole field goes quiet together.** Every object drops to a single shared exposure (0.55–0.65) over 400–500 ms. Nothing enters, nothing exits, nothing moves position. Hold. **This state does not exist today — create it.**

6. **On L26 (*"El problema es que se acumulan"*) — the field returns to full and the secondaries burst in one auto-beat.** Reach **10–14 pieces** at 65–80 % canvas occupancy. Mix three kinds: chat bubbles (keep the existing palette verbatim), at least two **documents** (factura, lista), and at least one object with a real silhouette. Burst in 3 groups over 900–1200 ms, last group fastest, then hold. **Do not write the line on screen.**

7. **After that beat — a new state: everything clears to `#000000` in 400–600 ms.** Manual trigger, not a timer.

8. **On L28 (*"Una cosa estaba en un chat viejo"*) — from black, a real WhatsApp enters from the right.** 420–560 px wide. Header `Familia ❤️`; participants `Juli · Pa ❤️ · Ma ❤️ · Tomi`; casual non-operational messages. **Delete the WhatsApp logo.** Repeat for the calendar on L29 (same axis, same rhythm, exits left) and for a lost folder on the spoken *"otra en una carpeta perdida"* if the script is restored (A-15).

9. **On L30 (*"y otra simplemente en la cabeza de alguien"*) — absolute black. Nothing.** No icon, no magnifier, no text, no glow. Remove `Ubicación` and `Banco` from this state entirely. Hold for as long as the speaker takes.

10. **On L32–L36 (*"volvemos a preguntar… buscamos mensajes viejos… nos fijamos quien hacía que"*) — the same WhatsApp returns from the LEFT** (spatial memory, because it entered from the right). Expand it. Type `¿Quién me busca hoy?` and send it. Scroll the history fast and decelerate onto exactly `Ma ❤️: Esta semana lo busco yo a Tomi.` Everything else drops to 35–45 % exposure; that one message stays at 100 %. Three states minimum.

11. **On L39 (*"…reconstruimos informacion que ya existia"*) — the target message detaches; the chat leaves; four fragments arrive** (`Esta semana lo busco yo a Tomi.` · `Entrenamiento 18:00` · `Garantía heladera.pdf` · `Comprar leche`) with a few discontinuous hairlines. Then **`La información ya existía.`** at 72–84 px, centred, white — **past tense, and only once.** It has been on screen since `S02_step00`; it must not be. **Delete `6 APPS · 1 FAMILIA · 0 COORDINACIÓN` entirely.**

12. **Before L43 — the question state.** Everything out. `#000000`. **Hold.** Manual trigger only. This state must be able to sit on screen for six seconds without anything changing.

13. **On the last two words of L43 — the icon alone.** `HomePlusLogo` at 204 px, centred, `opacity 0→1`, `scale .94→1`, still on black. No wordmark.

14. **On L45 (*"Para eso creamos HomePlus"*) — the hero auto-beat, ~850–1000 ms.** Icon slides left. Wordmark reveals rightward from behind it. `#E7643F` expands from the icon's zone under a mask and fills the entire canvas. Final: **full orange field, white horizontal lockup.** No halo, no vignette, no radial. **Set `--opening-reveal-delay` to 0 for this beat** — the black hold before it is now a state, not a delay.

15. **On L48 — the lockup exits up; orange stays; four people enter from below.** Juli · Tomi · Mamá · Papá, aligned as a family, four distinct identity colours, ages legible from scale. No `PERSONAS` text.

16. **On "momentos" — one white flash 80–120 ms**, then a thin photo frame around the family, then the frame dissolves. No text.

17. **On "responsabilidades" — up to four small markers** beside members, quick, then gone. No text.

18. **On "información que no queremos perder" — documents and a photograph** appear around them and integrate behind/below. No text.

19. **On "no nace para que una persona controle el resto de la familia" — Mamá `scale 100→108 %`,** the other three drop to ~65 % presence, then all equal on *"La idea es exactamente la contraria"*. No eye, no padlock, no word CONTROL.

20. **On the three autonomy beats — absolute scales `105 %` → `110 %` → `115 %`,** one per beat, each returning before the next. **Do not multiply them.**

21. **On L61 — draw a simple white house outline** around the four, 4–6 px stroke at 1920×1080, no fill, no perspective, 700–900 ms. Contained, not fenced.

22. **Before Gaby — the handoff.** Camera push into the house. House exits the crop. Mamá/Papá/Tomi lose presence. **Juli remains** and matches/morphs into Home of Juli. Today this transition is a bare cross-mount with no shared element.

### Scene B — Home

23. **`authorizationCompleted` and `schoolTaskCompleted` are always `false`.** Delete `authorizationCompleted={homeStep >= 3}` and `schoolTaskCompleted={homeStep >= 4}`. Delete the `Completada` chip, the `line-through`, the filled checkmark and the `aria-label="Completada"` from the Home surface. **Do not check the task. Do not show it as done.** If a completion is ever shown, it is 420 ms after a visible tap, per `HomePlannerSections.tsx:280-284`.

24. **Fix the CSS order at `home-screen.css:83`.** `[data-complete='true']:not([data-completed='true'])` currently overrides `[data-attention='true']`. At `S04_step05` the `Educación Física` row must keep `#F6EDE8` — it is the only row that still needs attention.

25. **`--home-stage-focus-scale`: 1.02 → 1.12.** Apply `transform: scale(1.12)` to `.home-row-copy` of the focused row **only**. **Do not resize the row. Do not change the row's box. Do not move any sibling.** Combine with exposure: non-focused rows to 0.55–0.65, chrome already at 0.82 (keep).

26. **Put all three of Juli's items on the same day.** `Llevar autorización` and `Tarea de Matemática` must not sit under `HOY` while the narration says *mañana*. Either both move to the same group as `Educación Física`, or the event's lead changes to `08:00` and the narration's "mañana" is honoured. **Pick one and make all three agree.**

27. **Raise this beat to `--phone-scale: 1.08`** (device 324×669.6, screen client unchanged at 282×602). No reflow, no scroll, no sibling movement.

28. **Add the target's section grammar**: `NECESITA ATENCIÓN` first (with `Ver N más`), then `HOY`, then `PRÓXIMO`. Keep the shell — top bar, cards, bottom nav — exactly as it is.

### Scene B — Planner

29. **Put `Planner` in the `<h1>`, 24–26 px, weight 600, `accessibilityRole="header"`.** Demote the tab label to the segmented control it already is. **Do not touch the segmented control** — it is correct.

30. **Rebuild the Tareas fixture with pending rows** and a heading that is `Tareas` or `NECESITA ATENCIÓN`, **never `COMPLETADAS`**. Use the target's own groups: `NECESITA ATENCIÓN` / `HOY` / `PRÓXIMAS` / `SIN FECHA`, with real per-row affordances (`Completar`, `Me encargo`, `Verificar`, `Por verificar`).

31. **Add the `Responsabilidades` entry row** exactly as Integration has it — `Responsabilidades` / `Rutinas y obligaciones de la casa` — and on press show the real surface with at least one live recurring chore carrying **recurrence + assignment policy + assignee** (e.g. `Lavar los platos · Todos los días · Va rotando · Tomi`). This is master B2's *"una responsabilidad recurrente"*.

32. **Calendario: show one event with its time and one recurring schedule.** `Educación Física · Lunes 17 · 08:00`. `Entrenamiento · Mar a Vie · 18:00–19:00`. **Show Juli's, not the household's** — the script says *"sus"*. **Do not show a time that the narration has not earned.**

33. **Planes: replace the plan.** Not `Cumpleaños` — Scene C owns that. Use the target's shape: title, a percentage or remaining count, a date, and two or three **concrete household steps** with checkboxes. **Never** `Repartir tareas`, `Preparar cosas`, `Comprar lo que falta` on screen.

### Scene B — the bridge, the map, the feed

34. **Add the widening bridge at L87 (*"…también afecta al resto"*) — exposure only, identical framing.** Hold on Juli's Home; drop her rows to ~0.35 in sequence; bring the other three household members in at the same positions as a **shared-element callback** from Scene A; then re-present as Familia. **No resize, no reflow, no scroll, no sibling movement.**

35. **Replace the map enlargement entirely.** Set `--phone-scale: 1.08` for the Map beat. **Keep `.phone-frame` at 300×620 and `.phone-frame-screen` at 282×602 at every step — the map must not leave the device.** Keep the top bar, the `Mapa` title, the `Familia｜Mapa｜Lugares` switch and the bottom nav visible; master B5's *"aparecen bordes/chrome del teléfono"* must become true. Drop the map's own secondary chrome to ~0.4 instead of growing it. If the pin labels still read small, add `transform: scale(1.12)` **on the pin's copy element only** — **no container resize, no type resize, no sibling movement.** Delete `.family-map-stage[data-expanded]`'s `width: 1080px; height: 520px; left: 100px; top: 100px` and the `border-radius: 28px` / `box-shadow: 0 54px 120px` pair.

36. **Delete `.map-delay` from the map entirely.** Restore the schedule change to the **schedule surface**, before the places: show `Entrenamiento 18:00–19:00`; on L97 show `+1 h` and the value become `18:00–20:00` with a `~115 %` scale that returns. `mamá ya no llega` stays oral. **Do not invent `Retiro · Mamá`.**

37. **Give each member row its real state.** `Nombre · lugar · tiempo transcurrido · estado de compartición`, using the target's `Ahora` grammar and its vocabulary (`hace 5 min`, `Compartiendo ubicación`, `Desactualizada`, `No comparte`). **Do not imply relative geography between pins.** No `8 min`, no distance, no ETA.

38. **Replace the global caption.** Delete `Ubicaciones compartidas` as a bare 9 px assertion. State the **rule**, legibly (≥ 20 px logical at the beat's device scale): *"Compartir ubicación es opcional y se decide por persona."* Add a per-member sharing state to each row. **Do not invent where the toggle lives** — master §4 leaves it an OPEN.

39. **Re-stage Feed as an editorial transition.** On L115–L117: the Family content **exits the device upward**; a **self-headed** surface enters from below with its own module title and **no Familia tab bar**. **Change or clear the bottom-nav selection** — today it still shows Family. **Do not** invent a Feed tab inside `Familia｜Mapa｜Lugares`.

40. **Make the thread real within the fiction.** The message writes and sends on L123; `Yo puedo.` and `No llego.` land; **hold** through L125; and retention is shown by one honest gesture — the thread acquires a visible position in a list. **HomePlus-native. Do not show WhatsApp.**

41. **Add master B7's synthesis before S07.** From the Feed thread: exit to the real people list, then bring in the four callbacks — Tomi's avatar, the Club pin, `20:00`, the technician mini-card — and connect them with **a few thin lines** on *"cuando hace falta"* (L125–L129). Then out to black on the pause. **This is where `20:00` lands**; today it appears nowhere.

42. **Do not touch S07.** Keep `#060404`, keep 132 px, keep the two-tone, keep the product stage exiting as a block. **Reducing the type size would make the scene worse.**

### Cross-cutting

43. **Declare a persistence model for every state** — `ACCUMULATIVE`, `EXCLUSIVE`, or `SELECTIVE CONTINUITY` — per NO-UI §9.

44. **Make the saturation burst one auto-beat.** It is currently 8 manual presses. Master §2.10: *"ningún bloque exige disparar 5–10 objetos individualmente."*

45. **Move both agents out of production.** Before touching anything, re-run a SHA-256 manifest over the package (excluding `node_modules/`, `audit/`, `.agents/`) so you can prove afterwards that only intended files changed. Baseline to compare against: **159 files, 2 572 474 bytes.**

---

## 20. Open questions

Genuinely unresolved. Each needs a decision I cannot make from evidence.

| # | Question | Why it is open | Who decides |
|---|---|---|---|
| **OPEN-1** | **Stage accent: `#E65C1B` (implementation, `tokens.ts:9`) vs `#E7643F` (master §2.1, frozen, and Integration's `FeedFamiliarScreen.tsx:48` uses `#E7643F`).** | Master §2.1 freezes the HomePlus orange as `#E7643F`. The implementation uses `#E65C1B`. The difference is small but it is the brand colour of the film's single most important beat, and the app-level brand is separately `#C96B45` (`homeTokens.ts:8`). Three oranges are in play. | Product/brand owner, then patch master or code — not both |
| **OPEN-2** | **Master §6 B5 asks for a proximity readout (`8 min` o equivalente). The product has no ETA, no distance and no travel-time service** — the only geometric code is internal publish throttling (`presenceLocationSharing.ts:125-138`). | The master is currently demanding a number the product cannot produce, and §6 of this brief forbids the presentation from inventing one. Either the master is amended to ask for what exists (place + recency + status), or an ETA capability is added to the product first. | Master owner **and** product owner, jointly |
| **OPEN-3** | **Is the scene called "Feed" a Feed or a family conversation?** Figma-app says the Feed surface no longer exists and renders a conversation (`Messages.tsx:1023-1029`); Integration has a mock post Feed badged `Demo` reachable from `Más → Actividad`; the presentation shows a static post inside Familia. Master §4 lists Feed's host as an OPEN and §6 B6 authorises an editorial transition meanwhile. | Three artefacts disagree on the entity itself, not just its location. The script (L117) and master §18 both say "Feed". Nothing in the evidence decides it. | Product owner + script pass |
| **OPEN-4** | **No frozen instruction exists for the `S05→S06` widening transition.** Master §6 goes B2 (Planner) → B3 (Juli→Tomi) → B5 (Map); the individual→household bridge at L85–L89 is unspecified. | `HW-B-011` is right that the transition is currently wrong, and there is no master clause to point at. A-B9 / B-B10 is my recommendation, not a spec. | Master owner |
| **OPEN-5** | **Master §6 B1 asks for `120–125 %` focus; NO-UI §6 caps `Strong UI focus` at `115 %` and defines `Micro focus` as `100 → 108 → 100`.** | Two frozen documents give incompatible numbers for the same operation. The presentation currently uses 102 %. I recommend landing at **108–115 %** and reconciling the two, but which document wins is not mine to decide. | Master owner |
| **OPEN-6** | **Master §6 B7 requires *"En `chicos y adolescentes`: elementos desaparecen → negro"*, and master §18's canonical script has *"Y cuando hablamos de chicos y adolescentes, hay un límite que para nosotros es clave"*. The current `Guion Compartido (2).md` has neither** — L127–L129 goes straight from the synthesis to *"entonces Familia va mucho más allá…"*. | Scene A/B's boundary argument currently reaches S07 without the *"chicos y adolescentes"* premise that master B7/B8 are built on. Whether the clause is dropped deliberately or lost in editing is not determinable from the evidence. | Script pass |
| **OPEN-7** | **Master §4's `Compartir ubicación` toggle location is an explicit OPEN.** B-14 recommends per-member state plus a legible rule caption — neither requires the toggle's position — but any fix that wants to *show* the toggle is blocked. | The master says so itself. Flagged so the developer does not build a toggle. | Product owner |
| **OPEN-8** | **Scene A's four-pillar and autonomy sequence (master A7–A9, NO-UI A15–A27) uses `family-avatars.svg` as a single 284×100 asset**, and `person-speaking.svg` exists but is unused. Whether the four members should be one composed asset or four independently scalable elements is a build decision that changes whether the 105/110/115 absolute scales are even possible. | Not determinable from source: `family-avatars.svg` is one 1310-byte file containing four coloured avatars at fixed relative positions. Whether it can be decomposed without redrawing is an asset question. | Presentation developer + design, before P0-5 |
| **OPEN-9** | **Timing was not measured.** No audio exists in the package; the master estimates 1 670 spoken words ≈ 10:27 at 160 ppm (§1 gate temporal). Scene A at ~30 states against 48 spoken lines and Scene B at ~20 against 38 are *state-count* estimates only. | Whether the target state counts are operable live can only be settled by a timed rehearsal. Master §2.10's *"tolerar una variación oral de ±0,5–1 s"* is unverified. | Requires a rehearsal with the real speakers |

---

## 21. Files written

All under `C:\Users\thega\Desktop\HomeplusPresentacion01\HomePlus_Presentacion_FINAL\audit\`. Nothing outside `audit/` was written.

### Report

```
audit/02_SCENES_A_B_AUDIT.md          this document
```

### Runtime evidence — presentation (37 states, fresh this session)

```
audit/runtime/session-02/states/                              37 PNG
  S01_step00.png … S01_step10.png                             (11)
  S02_step00.png … S02_step06.png                             ( 7)
  S03_step00.png                                               ( 1)
  S04_step00.png … S04_step05.png                             ( 6)
  S05_step00.png … S05_step03.png                             ( 4)
  S06_step00.png … S06_step05.png                             ( 6)
  S07_step00.png, S07_step01.png                              ( 2)
```

### Runtime evidence — data and tooling

```
audit/runtime/session-02/data/states-ab.json          37 states, full probe (S01–S07)
audit/runtime/session-02/data/transitions-ab.json     7 transitions × ~210–226 rAF frames
audit/runtime/session-02/_tooling/pw.mjs              playwright-core resolver (no install)
audit/runtime/session-02/_tooling/walk-ab.mjs         37-state walk + probe + screenshots
audit/runtime/session-02/_tooling/transitions-ab.mjs  rAF sampler for 7 transitions
audit/runtime/session-02/_tooling/net.mjs             response-status check (404 isolation)
audit/runtime/session-02/_tooling/net2.mjs            response-status check while walking
audit/runtime/session-02/_tooling/dbg.mjs             selector diagnosis for Figma nav roles
audit/runtime/session-02/_tooling/figma-recon.mjs     first Figma pass (superseded)
audit/runtime/session-02/_tooling/figma-b.mjs         Figma nav walk + Planner tabs
audit/runtime/session-02/_tooling/figma-b2.mjs        Figma Mapa/Lugares/Responsabilidades/Más
audit/runtime/session-02/_tooling/figma-b3.mjs        Figma Responsabilidades + family thread
audit/runtime/session-02/_tooling/manifest.mjs        SHA-256 production manifest
audit/runtime/session-02/_integrity-manifest-before.csv  159 files, taken before any write
audit/runtime/session-02/_integrity-manifest-after.csv   159 files, taken after all writes
audit/runtime/session-02/_logs/figma-dev.out.log      Figma-app dev server on 8445
audit/runtime/session-02/_logs/figma-dev.err.log      (empty)
```

### Figma-app reference harvest (Scene B surfaces only)

```
audit/runtime/session-02/figma-reference/
  fig-home.png / .json                 Home, nav=home, H1 "Hola, Gabriel", 5 sections
  fig-familia.png / .json              Familia, 4 integrantes, tab switch
  fig-cal-Tareas.png / .json           Planner H1 "Planner", REVISIÓN/VENCIDAS/HOY/MAÑANA/PRÓXIMAS/SIN FECHA
  fig-cal-Calendario.png / .json       Planner > Calendario
  fig-cal-Planes.png / .json           6 plans with progress/deadline/remaining
  fig-mas.png / .json                  Más: Inventario, Finanzas, Activos, HomeCloud, Mensajes
  fig2-familia-mapa.png / .json        Familia tab (Mapa click did not register — see §2)
  fig2-familia-lugares.png / .json     ditto
  fig2-planner-calendario.png / .json  Planner > Calendario
  fig2-mas-mensajes.png / .json        Mensajes root: family thread + TEMAS + INTEGRANTES
  fig2-mensajes-familia.png / .json    ditto
  fig3-planner-responsabilidades.png / .json   DE LA CASA · 3 / PAUSADAS · 1, recurrence + policy
  fig3-conversacion-familia.png / .json        Mensajes root after clicking the family row
  figma-b-summary.json, figma-b2-summary.json, figma-nav-walk.json
  recon-*.png / .json                  first-pass reconnaissance
```

**Figma-app and Integration were not modified.** No file in either tree was created, edited, renamed or deleted; both were read-only inputs. The Figma-app dev server was started on port **8445** (D2: 8443 untouched) and left running.

---

## 22. Production files modified

# NONE

Verified by SHA-256 manifest comparison, because this package is **not** a git repository (no `.git` anywhere under `HomeplusPresentacion01`).

**Manifest scope:** every file under the package root except `node_modules/`, `audit/`, `.agents/` — identical to Session 1's scope so the two are comparable. Covers `src/**` (100 files), `assets/**`, `dist/**`, `index.html`, `package.json`, `package-lock.json`, `pnpm-lock.yaml`, `vite.config.ts`, `tsconfig.json`, `.mise.toml`, `.gitignore`, `.gitattributes`, `.figma/**`, `skills-lock.json`, `ABRIR_PRESENTACION.bat`, `LEEME.txt`, `audit-input/**`.

| Metric | Session-1 baseline (before) | Session-2 before | Session-2 after |
|---|---|---|---|
| Files in manifest | 159 | **159** | **159** |
| Total bytes | 2 572 474 | **2 572 474** | **2 572 474** |
| Files added | 0 | — | **0** |
| Files removed | 0 | — | **0** |
| Files with changed SHA-256 | 0 | — | **0** |
| Files with changed `mtimeUtc` but identical SHA-256 | 0 | — | **0** |

The Session-2 **before** manifest was additionally compared **per file** against Session 1's `manifest-after.csv`, after normalising that file's different CSV shape (quoted paths, backslash separators, upper-case hashes, fractional-second timestamps):

| Cross-session check | Result |
|---|---|
| Entries in Session-1 manifest | 159 |
| Entries in Session-2 manifest | 159 |
| Paths only in Session 1 | **0** |
| Paths only in Session 2 | **0** |
| Paths whose length or SHA-256 differs | **0** |

Independently confirmed: **no production file changed between Session 1 and Session 2.**

Adjacent trees, both untouched:
- `C:\Users\thega\Desktop\Figma-app` — read-only; served on 8445; no write of any kind.
- `C:\Users\thega\Desktop\homeplus-worktrees\Family-Hub-Own-integration` — read-only static inspection; **not launched**, no write.

**Processes left running** (none started by this session except the Figma-app dev server):
- `PORT=8444` presentation dev server — PID 15644, started by **Session 1**, reused as-is. Not restarted, not killed.
- `PORT=8445` Figma-app dev server — started by this session for the reference harvest. Left running; stop at will.
- `8443` — **not investigated, not touched**, per D2.

**No implementation actions were taken.** No presentation source modified. No Figma-app modification. No Integration modification. No redesign, no fix, no copy change, no motion change, no commit, no stash, no reset, no branch, no dependency installed, no build run.

---

## 23. Verification

Performed per `verifying-before-completion`: every claim above is backed by a command that was run in this session and whose output was read. No verdict is asserted from inference alone.

| # | Claim | Command / evidence that proves it | Result |
|---|---|---|---|
| 1 | The presentation package is the one named in D1 and it is not a git repo | `Get-ChildItem` on the canonical path; `presentationConfig.ts`, `package.json`, `tokens.ts`, `index.html` read | 18 slides `S01`–`S18`; `canvas 1280×720`; 85 steps; React 19 + Vite 8 + TS 5.7 |
| 2 | Presentation runtime reachable on 8444 and serving *this* package | `Invoke-WebRequest http://127.0.0.1:8444/` → 200; `/src/presentation/presentationConfig.ts` → 200 with the S01–S06 imports | Confirmed |
| 3 | All 37 Scene A+B states reachable and captured | `node _tooling/walk-ab.mjs` | `STATES=37 ERRORS=1 WARNINGS=0` |
| 4 | The single runtime error is `/favicon.ico`, not an application fault | `ERROR_LIST` from the walk; `Invoke-WebRequest http://127.0.0.1:8444/favicon.ico` → **404**; `net.mjs` on a plain load → `BAD_RESPONSES=0`; `net2.mjs` while walking 40 presses → `BAD_RESPONSES=0` | Isolated and non-blocking |
| 5 | Zero uncaught errors, zero failed app requests, zero console errors in the app | `walk-ab.mjs` `pageerror` + `requestfailed` counters; `transitions-ab.mjs` | `pageerror = 0`, `requestfailed = 0`, app console errors `= 0` |
| 6 | `insurance` is replaced by `groceries` and never returns | `states-ab.json` → per-state visible `attention-element` list | `step01 = 1 (insurance)`, `step02 = 1 (groceries)`, `step03 = 1 (appointment)`, `step10 = 8` — neither invoice nor bag present |
| 7 | The fridge/warranty arrives at state 8 | `states-ab.json`; `S01Chaos/index.tsx:41` | `warranty present={stepIndex >= 8}` |
| 8 | Saturated-state coverage is ~30 % of legible objects | sum of measured element boxes at `S01_step10`, excluding the 0.46-opacity `fragments` texture | 279 970 px² of 921 600 px² = **30.4 %** (master target 65–80 %) |
| 9 | Every ambient glow is the HomePlus orange, pre-reveal | computed `background-image` at `S01_step00` | `radial-gradient(color(srgb 0.901961 0.360784 0.105882 / 0.72), …)` = `#E65C1B` |
| 10 | Glow opacities by state | `states-ab.json` → `glows[]` | S01 **0.075** · S02 **0.10** · S03 **0.28** · `opening-chaos-light` **0.18** at `step10` · `metrics-zero-light` **0.14** at `step06` |
| 11 | The slogan numeral is the HomePlus orange | computed `color` on `.metric-zero` at `S02_step06` | `rgb(230, 92, 27)` at **176 px** |
| 12 | The hero line is present tense and spans six states | `S02FragmentedInfo/index.tsx:29-31`; measured `.information-statement` opacity per state | `La información ya existe.`; `opacity: 1` at `S02_step00…05`, `0` at `06` |
| 13 | At *"en la cabeza de alguien"* six logos + the statement are visible | measured `.service-icon` visible count and statement opacity at `S02_step04` | services visible = **6**, statement `opacity: 1`, 80 px |
| 14 | The key question gets 115 ms of black and the logo holds | `transitions-ab.json` → `S02_step06->S03_step00`, 211 rAF frames | blackout `1.000` at 326 ms → `0` at 656 ms; reveal `0.064` at 661 ms → `1.000` at 977 ms |
| 15 | S03 has exactly one state | `presentationConfig.ts:27` | `{ id: 'S03', stepCount: 1 }` |
| 16 | S03's whole frame is a logo + wordmark + two orange radials | measured `reveal.logo.box`, `reveal.h1`, `glows[]` | logo 204×204 @538,217; `HomePlus` 78 px; glows 0.28 and 0.075 |
| 17 | Home marks both tasks completed, with chip, strike and aria | `states-ab.json` → `home.rows[]` at `S04_step03/04/05` | `completed="true"`, `textDecorationLine="line-through"`, `completionLabel="Completada"`, `markAria="Completada"` |
| 18 | The completion persists into Planner | `states-ab.json` → `planner` at `S05_step00…03` | `sectionLabel="COMPLETADAS"`, both rows `completed="true"` with `line-through` and `Completada` |
| 19 | The final Home state removes the tint from the only pending row | measured `home.rows[].bg` at `S04_step05` | `educationPhysical` `attention="true"` but `bg=rgb(255,255,255)`; completed rows `bg=rgb(244,238,233)` |
| 20 | The focus scale is 1.02 | `homeTokens.ts:13`; measured `copyTransform` | `--home-stage-focus-scale: 1.02`; `matrix(1.02, 0, 0, 1.02, 0, 0)` |
| 21 | Planner's title is the tab label, never `Planner` | measured `planner.heading` across all four S05 states | `'Tareas'` / `'Calendario'` / `'Planes'` at 26 px |
| 22 | Session 1's `82 → 137 px` planner-tab figure is **not reproducible** | `states-ab.json` (4 stable states) **and** `transitions-ab.json` → `S05_step01->S05_step02`, 222 rAF frames, armed before the keypress | stable max **84 px**; in-transition only `81/82/81` (225 frames) and `80/84/80` (1 frame); **max 84 px**. The 137 px figure is a Session-1 measurement artefact. |
| 23 | The pill translates, it does not resize the tabs | `planner-screen.css:19-21`; measured `selectionPill` | `left` = `3px → 84.33px → 165.66px`, `width` constant `81.33px` |
| 24 | Planner has zero pending rows and no clock time | measured `planner.taskRows`, `planner.unchecked`, `planner.anyTimeText` | heading `COMPLETADAS`; `unchecked=3` (all in Plans); `anyTimeText=["9:41"]` only |
| 25 | The map enlargement is a layout mutation, measured across the transition | `states-ab.json` + `transitions-ab.json` → `S06_step00->S06_step01` | `client 250×200 → 1080×520` between **ms 0 and ms 21**; FLIP `matrix(0.2315…) → identity` over 500 ms; canvas `scrollWidth` 1280→1450 in ~34 steps between **ms 125 and 475**; phone opacity 1→0.12 between **ms 25 and 440** |
| 26 | Map type growth is container-driven | `map-screen.css:1-18`; measured `places[].fontSize` | `container-type: inline-size` + `cqw`; labels 15→41.04 px, persons 12→34 px, delay 26→64.8 px |
| 27 | The map's geometry is stretched at **both** sizes, in opposite directions | `MapDemoScreen/index.tsx:8` `preserveAspectRatio="none"`, `viewBox="0 0 1000 600"`; measured `svgBox` | in-device 250×200 → anisotropy **0.750**; expanded 1080×520 → anisotropy **1.246** |
| 28 | Phone geometry never changes | measured `phone`, `screen` across all 37 states | device `300×620`, `client 298×618`, screen client `282×602`, `transform matrix(1,0,0,1,0,0)` in **37/37** |
| 29 | `Entrenamiento +1 h` is the loudest object on the enlarged map | measured `mapStage.places[]` at `S06_step03` | `fs=64.8px`, `bg=rgb(201,107,69)`, `color=rgb(255,255,255)` — larger than `Colegio`/`Club` at 41.04 px |
| 30 | Map pin positions are authored percentages | `map-screen.css:9,10,19,20`; measured `left`/`top` | `24%/29%`, `69%/49%`, `23%/75%`, `82%/79%` |
| 31 | Shared location is one global 9 px caption | measured `mapStage.sharing` at `S06_step04` | `Ubicaciones compartidas`, `fs=9px`, `box 107.34×13.5 @666.33,454.69`, no toggle |
| 32 | Feed hides its own tab bar | `family-screen.css:7`; measured `family.switchOpacity` at `S06_step05` | `opacity: 0` |
| 33 | Feed is one static post with no thread | measured `family.feed` | `articles=1`, `comments=0`, `Responder` with no handler |
| 34 | Familia lists 3 members, omitting Juli, with 3 card treatments | measured `family.members[]` | `Tomi[h2,30px,chevron]` · `Mamá[h3,18px]` · `Papá[h3,18px]`; Juli absent while the header reads `Juli` |
| 35 | S07 is a clean singular-concept screen | measured `s07`, `s07veil`, `s07-silence.css` | 132 px / 688.81×274.53 @295.59,222.73; lines `#F5F1EB` 600 and `#C7A084` 500; veil `#060404` opacity 1; product stage `visibility: hidden` |
| 36 | Figma-app renders `Planner` as the module title | `fig-cal-Tareas.json` | `heading: [{tag:'H1', text:'Planner', fs:'24px'}]`, `nav=calendario` |
| 37 | Figma-app has a live `Responsabilidades` surface | `fig3-planner-responsabilidades.png` + `.json` | `DE LA CASA · 3` / `PAUSADAS · 1`; `Lavar los platos · Todos los días · Va rotando · Tomi` |
| 38 | Figma-app's Feed surface does not exist | `src\screens\Messages.tsx:1023-1036` read at source | *"la surface Feed ya no existe"*; `family-feed` → `ConversationScreen c1`; `feed-comments` → `c1` |
| 39 | Figma-app's navigation uses `role="tab"` for destinations | `dbg.mjs` output | `Ir a Inicio`, `Ir a Familia`, `Ir a Calendario`, `Abrir Más opciones` all `role="tab"`, no `aria-selected` |
| 40 | Figma-app boot is reachable only through onboarding → auth → app | `figma-recon.mjs`, `figma-b.mjs` logs | `Omitir` → login submit → `BOOT_NAV=home` |
| 41 | Home's row status type cannot hold `completed` | `front\mi-front-limpio\services\planner\homeSummaryTypes.ts:34,131-134` | `type HomeSummaryTaskStatus = 'pending' \| 'awaiting_verification'` + hard `ALLOWED_TASK_STATUSES` whitelist |
| 42 | The filled checkmark in Home is a 420 ms transient | `front\mi-front-limpio\screens\home\HomePlannerSections.tsx:280-284` | `setTimeout(… , 420)` clearing `completionVisualTask` |
| 43 | Planner's title is `Planner` in the product too | `front\mi-front-limpio\screens\planner\PlannerScreen.tsx:700` | `<AppText variant="title1" weight="600" accessibilityRole="header">Planner</AppText>` |
| 44 | Responsabilidades is registered and reachable in the product | `PlannerTasksScreen.tsx:560-561`; `HomeTabNavigator.tsx:214-217` | `onPress={() => navigation.navigate('Responsibilities')}` + 4 registered screens |
| 45 | The product's calendar holds events **and** schedules | `PlannerCalendarScreen.tsx:46-49,436,396`; `plannerSchedules.ts:5-17` | `AgendaRow = event\|task\|schedule`; toggle `Evento｜Horario`; `days_of_week / start_minutes / end_minutes` |
| 46 | The map has no notion of a schedule and no proximity | `MapContextNavigation.ts:22-26`; `PresenceScreen.tsx:69-74,101-109`; `presenceLocationSharing.ts:125-138` | items `Integrantes｜Lugares｜Yo`; only `getRelativeTime` / `getStatusLabel`; distance used only for publish throttling |
| 47 | Location sharing is per-member and opt-in | `presence.ts:7-11,21-31,40-43`; `PresenceScreen.tsx:207-210,619-620` | `sharing_enabled`, `sharing_mode: off\|foreground\|background`, `sharing_disabled` status, map filters to sharers, copy *"Compartís solo cuando lo activás"* |
| 48 | Feed is a `PrivateStack` route reached only from `Más`, badged `Demo` | `AppNavigator.tsx:240`; `MoreScreen.tsx:23-32,93` | `FeedFamiliar` on `PrivateStack`; `label:'Actividad'`, `isDemo:true`; `<StatusBadge label="Demo"/>` |
| 49 | Feed is 100 % mock with no transport | `FeedFamiliarScreen.tsx:1-13,46-55,112,134,214-217,224-230`; `backend\src\routes\` | no service import; `MOCK_POSTS`; local-only state; both comment affordances lack `onPress`; no feed/post/comment/conversation route |
| 50 | The forbidden task strings exist nowhere in the product | repo-wide search for `Repartir tareas`, `Preparar cosas`, `Comprar lo que falta`, `Confirmar invitados`, `Preparar torta`, `Comprar globos` over `*.ts,*.tsx,*.js,*.md,*.txt,*.sql` | **0 matches**; real titles are `Ordenar la cocina`, `Preparar mochila del colegio`, `Comprar leche y pan`, `Sacar la basura`, `Regar las plantas`, `Lavar ropa blanca` (`seed-demo-familia-1-test.js:335,344,353,362,371,380`) |
| 51 | The script lost "una carpeta perdida" relative to the master's canonical script | `Guion Compartido (2).md` L28-30 (3 items) vs `MASTER_FREEZE_V1.0.md` §18 L1693-1696 (4 items) | Confirmed — recorded as A-15 `SCRIPT ISSUE`, not fixed |
| 52 | The script attributes "conversaciones" to Familia, as does the master | `Guion Compartido (2).md` L91 vs L117; `MASTER_FREEZE_V1.0.md` §18 L1818-1826 | Confirmed in both — B-22 `SCRIPT ISSUE`, not fixed |
| 53 | The master's `chicos y adolescentes` clause is absent from the current script | `MASTER_FREEZE_V1.0.md` §18 L1828-1832 vs `Guion Compartido (2).md` L127-131 | Confirmed — OPEN-6 |
| 54 | No production file was modified | SHA-256 manifest before/after, same scope as Session 1 | 159 files / 2 572 474 bytes; **0** added, **0** removed, **0** content changes, **0** timestamp changes |
| 55 | Writes were confined to `audit/**` | every write target in this session | all under `…\HomePlus_Presentacion_FINAL\audit\` |
| 56 | Adjacent trees untouched | no write call targeted `Figma-app` or `Family-Hub-Own-integration`; Integration not launched | Confirmed |
| 57 | Port 8443 was not investigated or touched | no `netstat`/`Invoke-WebRequest`/kill against 8443 in this session; only `8444` and `8445` used | Confirmed, per D2 |

**Claims explicitly NOT made:**
- That any fix in §18 or §19 has been implemented. None has.
- That the target state counts in §6 and §18 are operable live. No rehearsal was performed and no audio exists; this is OPEN-9.
- That Figma-app's `Mapa` and `Lugares` tabs, or its family conversation thread, render as captured. Their content is cited from source (`Familia.tsx:80-133`, `:157`, `Messages.tsx:1023-1036`), not from a runtime screenshot, and this is stated in §2.
- That the recommended enlargement techniques will achieve legibility. They are reasoned from the target's own measured type floor (9–13 px) and the one device-scale lever already proven at 0.96/1.00/1.08; they are **not** validated on a real projector. A rehearsal is required.
- That the walkthrough's BLOCKER candidacy for `HW-D-001` / `HW-D-007` holds — those are Scene D, out of scope here.

---

**END OF SESSION 2 — SCENES A + B DEEP AUDIT**

*Read-only session. No production file was modified. Verdicts issued against evidence; implementation not started.*