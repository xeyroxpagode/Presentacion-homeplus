# 07 — MOTION / STAGECRAFT / TIMING AUDIT

**Issued:** Session 7, 2026-10-05.
**Scope:** the whole 18-scene presentation as ONE film. Motion, stagecraft, timing, attention, device grammar, trigger architecture, stable-state contract, backward restoration.
**Mode:** AUDIT + TARGET SPECIFICATION. **No implementation. No production file touched. No git operation.**
**Verdict policy:** every claim is either **MEASURED** (runtime, this session), **CITED** (a committed Session 0–6 measurement or a frozen authority line, quoted), **AUTHORED** (a Session-7 judgement), or **PENDING** (stated and not decided).

---

## 1. EXECUTIVE VERDICT

**The film is not eighteen slides with motion between them. It is eighteen slides with a *press* between them.**

Measured across all 84 adjacent transitions: **15 of 84 change nothing measurable at all** (no element's position, opacity, transform, layout or scroll geometry changes between the settled state before and the settled state after). **26 of 84 move 10 or more elements simultaneously.** The deck has **one easing curve for every transition in the film** — entrances and exits alike — where `NO-UI §6` freezes three different curves. It has **no token for a shared-element transform** (520–760 ms) and **no token for a hero reveal** (700–1000 ms), which are precisely the two motions the film most needs.

The good news is real and it is large: **stable states are genuinely stable.** Twelve hold tests at 0 s / 10 s / 30 s, across the opening, Scene A's end, Home, Planner, Family, the selective-exposure beat, Finance, Assets/HomeCloud, the key question, the persona comparison, the decision and the end card: **zero drift, zero timers, zero running animations, zero text change, zero geometry change.** Every single `getAnimations()` entry at every settled state is `playState: "finished"` — which is `N-10`'s exact point, confirmed mechanically. **The deck already has the single hardest thing for a live presentation.** That is `KEEP AS-IS` and it must not be touched.

The bad news is equally structural: **the deck has motion but almost no motion language.** A `DEVICE_TRANSITION` (a 480 px slide) is used at every module boundary in Scenes C–E — including the two boundaries where `MASTER §2.4` and `MASTER §2.5` explicitly asked for a `SHARED_ELEMENT` and where the shared object does not exist at all in any frame. That is the whole of `RC-01` in one sentence, now confirmed from the motion side with per-frame runtime measurement rather than by reading CSS.

And one anti-pattern dominates: **S06's map.** Measured, `.family-map-stage` client `250×200 → 1080×520`, scroll `313×265 → 1350×689`, the `Colegio` label `15 px → 41.04 px`, the `+1 h` badge `26 px → 64.8 px`, device opacity `1 → 0.12`, the canvas itself `1280×720 → 1450×789`, and the map's own aspect distortion **reversing** from 0.75 to 1.246. That is not camera movement. It is a live component being resized out of its device, which is the one thing a product keynote must not do.

**Whole-film verdict:** the deck is **mechanically trustworthy and dramatically un-choreographed**. It will not break on stage. It will not move with intention. Session 7's job is therefore not to add motion — it is to *delete* motion, then re-introduce exactly eight motion tokens, four transition families, one device grammar and a three-part trigger model.

---

## 2. EVIDENCE CONSUMED

| Source | What was taken |
|---|---|
| `00_AUDIT_NORMALIZATION.md` (68 059 B, N-01…N-45) | the binding correction layer; 15 `N-*` entries applied, 6 deliberately not reopened |
| `00_SESSION7_GATE.md` (22 090 B) | `GO` verdict; 15 safe capability rules; 5 corrected measurements; the preservation list |
| `00_CANONICAL_ISSUE_REGISTRY.md` (57 902 B) | 149 register rows, 18 `RC-*` root causes with full membership, 28 active blockers, the 12-item KEEP list |
| `00_CROSS_SESSION_CONFLICTS.md` (57 816 B) | 20 cross-session conflicts; the 24-item `SI-*` script-issue registry |
| `01_RUNTIME_BASELINE.md` (91 553 B) + `…_ERRATA.md` (5 322 B) | the 85-state table, motion vocabulary, hold tests, viewport matrix, forward/back restoration, evidence gaps G1–G10 |
| `02_SCENES_A_B_AUDIT.md` | Scene A/B beat inventory, 39 register rows, the 132 px preservation mandate, the founding-question measurement, the map measurement |
| `03_SCENES_C_E_AUDIT.md` | Scene C/D/E beat inventory, 34 rows, the exact selective-exposure opacity values, the 7 mandatory shared elements |
| `04_SCENES_F_G_H_AUDIT.md` | Scenes F/G/H, 34 rows, the 16-transition measurement table, the exposure ramp, the three text collisions |
| `05_SCENES_I_J_AUDIT.md` | Scenes I/J, 42 rows, the 14-state constant device, the three-device arithmetic, the target choreography J-00…J-23 |
| `06_FIGMA_VS_INTEGRATION.md` | the four-axis capability classification; §19.1 which cross-module relations are real |
| `Guion Compartido (2).md` (497 lines) | read in full; 13 speaker blocks; word counts computed per block for §33 |
| `HOMEPLUS_PRESENTATION_MASTER_FREEZE_V1.0.md` (2 199 lines) | §2.1–§2.10 global visual grammar, including the three frozen Homi device directions and §2.10 live-operation rules |
| `HOMEPLUS_PRESENTATION_NO_UI_MASTER_FREEZE_V2.0.md` (1 420 lines) | §4 manual vs auto beat, §5 design system, §6 MOTION SYSTEM (frozen), §7 phone, §8 transition taxonomy, §9 state persistence, §18 demo-data canon |
| Presentation source (read-only) | `presentationConfig.ts`, `motionTokens.ts`, `tokens.ts`, `index.css`, `navigation.ts`, and the per-scene CSS/TSX for motion mechanics only |

---

## 3. NORMALIZATION CONSUMED

Applied, and binding on this session:

| `N-*` | Applied where |
|---|---|
| **N-02** Planner tabs do not resize | **re-verified at runtime**: tabs `81.16 / 81.69 px`, one frame at `80.09 / 83.81`, pill `81.33 px` translating `left: 3 → 84.33 → 165.66`. Max 84 px. `137 px` struck. §10, §13 |
| **N-05** S07 keeps its 132 px | §22, §37. Measured again: `688.81 × 274.53`, 20.6 % of canvas, ~60 % of frame empty |
| **N-08** HomeCloud thumbs | §31. Measured again: settled `98×62` layout → `105.84×66.96` visual at 1.08. **No authored enlargement** |
| **N-09 / N-41** device scale | §18. Measured again: `S10` = 1.08, `S15`–`S17` = 1.08, `S01`–`S09` = 1.00, `S11`–`S14` = no device |
| **N-10** `getAnimations()` is not a motion metric | §13, §17. Every count in this report is `playState`-classified. **Measured: 0 running animations at all 85 settled states, both directions** |
| **N-17** S14's settled frame is clean | §34. **Re-confirmed by settled screenshot** — the frame is genuinely clean; the `Figma · Diseño · IA` strings are DOM-only |
| **N-23** `19:00` is valid canon | §29, §38 (SE-06). Not changed to fit a prototype gap |
| **N-24** `#E7643F` is the brand orange | §20, §37 |
| **N-25** closing objects come from the opening's set | §38, §41 |
| **N-29** HomeCloud audio approved, no fake waveform | §31 |
| **N-30 / N-03** no ETA / distance / travel time | §30, §38 |
| **N-31** Assets ↔ HomeCloud is editorial | §29, §31, §38 (SE-10) |
| **N-32** no implied Shopping→Finance pipeline | §29 (SE-08) |
| **N-33** cross-module navigation default | §29–§32. **Only `Plan → Task` and `Payment → Movement` are real** |
| **N-34** one Home, role projection | §30 |
| **N-35** no standalone Horarios | §30 |
| **N-36** Feed approved, Conversation is not its route | §30 (SE-05) |
| **N-37** money/date are Finance-owned | §29, §38 (SE-09) |
| **N-38** Milestones retired | §26 — not shown, not moved |
| **N-42 / N-43** register is the count authority; raw severity never overwritten | §36 |

**Deliberately NOT reopened:** the six Session-1 measurement artefacts (`N-40`); `N-01`/`N-11`/`N-18`/`N-27` tallies; `N-16` chronology; `N-07` Figma harvest coverage; `N-26` migration count.

---

## 4. RUNTIME METHOD

**Port.** 8444 was already listening (`node`, PID 15644). Verified it is the HomePlus presentation before use: `document.title = "HomePlus"`, `.presentation-canvas` present, `clientWidth × clientHeight = 1280 × 720`, `--canvas-width/height = 1280px/720px`, first state `Chaos 0:0`, `aria-label` matches all 18 slide names. **No process was killed. 8443 was not touched.** One console 404 (favicon) was recorded and is not attributable to the presentation.

**Engine.** `playwright-core` 1.63.0 resolved out of `Figma-app`'s existing pnpm store. **Nothing installed.** Viewport 1280×720, headless Chromium 1243.

**Tooling** (all under `audit/runtime/session-07/_tooling/`):

| File | Purpose |
|---|---|
| `pw.mjs` | playwright-core resolution, no install |
| `probe.mjs` | in-page probe: **ancestor-aware** visibility, effective opacity, salience ranking, device geometry, `playState`-classified animations, overflow, clipping |
| `verify.mjs` | family verification + forward state count |
| `motion.mjs` | 84 transitions × 4 in-flight frames (30/100/200/320 ms) + settled, full per-element snapshot at each |
| `frames.mjs` | 36 transitions × 5 screenshots (before / 60 / 160 / 320 / settled) = **215 PNG** |
| `selectors.mjs` | named-selector census: effective opacity, box, font, layout/scroll for 8–10 selectors per scene |
| `hold-back.mjs` | 12 hold tests at 0/10/30 s + full forward walk + full backward walk with class-level diff |
| `analyze-*.mjs`, `build-*.mjs` | analysis and CSV generation |

**A measurement defect was found and fixed before any number was accepted.** Session 1's probe used `getComputedStyle(el).opacity` on the element only. On first run this session that reported a `176 px "6"` as the top stage element in **37 consecutive states spanning Scenes A–D**. A settled screenshot of `S04_step03` showed a clean frame with no such element. Cause: an ancestor carried `opacity: 0`, which multiplies down but is not reflected in a descendant's own computed `opacity`, and `getBoundingClientRect()` still returns the layout box. The probe was rewritten to walk the ancestor chain for `display`, `visibility` and cumulative opacity, and **every number in this report comes from the corrected probe.** This is recorded because a false "37 states are broken" finding is exactly the kind of result that gets acted on.

**Method limits, stated honestly:**

- Frames are **sampled at 4 instants**, not captured as video. Easing *shape*, overshoot and intra-frame stagger order are not observable.
- `getAnimations()` was used **only** with `playState` classification, per `N-10`.
- One engine, headless, no real projector, no `prefers-reduced-motion` variant exercised.
- No audio. **No sync claim is made anywhere in this report.**

---

## 5. PRODUCTION INTEGRITY — PREFLIGHT

Fresh SHA-256 manifest, scope = package root minus `node_modules/`, `audit/`, `.agents/`.

```
FILES IN MANIFEST      : 159          (baseline 159)
TOTAL BYTES            : 2 572 474    (baseline 2 572 474)
ADDED                  : 0
REMOVED                : 0
SHA-256 CONTENT CHANGED: 0
LENGTH CHANGED ONLY    : 0
MTIME CHANGED ONLY     : 0
BYTE+MTIME IDENTICAL   : 159 / 159
VERDICT                : PASS
```

**SESSION 7 = GO.** Production is byte-identical **and** mtime-identical to the state Session 1 left it in.

Adjacent trees: `Figma-app` — read-only, not served, not written. `Family-Hub-Own-integration` — not opened, not launched, not written. Script and both masters — read-only. Packages installed: **none**.

---

## 6. WHOLE-FILM MOTION THESIS

> **The presentation currently uses motion as a *substitute for having nothing to show*.**
> Where a product state should change, a device slides. Where an object should persist, it is destroyed and remounted. Where a scene should breathe, a 320 ms crossfade runs. Where an idea should arrive, a line of narration is copied onto the screen at 33 px.
>
> The target is the inverse: **motion is only ever the visible consequence of a semantic cause.** Every object that moves must be moving *because* something happened to it — it was extracted, it was revealed, it was displaced, it lost attention, it crossed into a new context, or it is the last thing standing before a question.

Three consequences follow, and they are the spine of this report:

1. **Delete before you add.** 15 transitions currently change nothing measurable. Some of those presses are legitimate (a hold), some are dead (`S13_step00`). The film gains more from removing motion than from adding it.
2. **One object crosses, or nothing moves.** `RC-01` is a *count* problem: 84 transitions, **0 shared elements**.
3. **Attention is a budget, and it is currently overspent in 37 states.** A stage-side element holds top salience across Scenes A–D that the audience was told to stop reading.

---

## 7. CURRENT 85-STATE ARCHITURE

**MEASURED, forward traversal, 1280×720, port 8444, 2026-10-05.**

| | |
|---|---|
| States reachable forward | **85** |
| Adjacent transitions | **84** |
| Terminal state | `S18_step03` |
| Unreachable / skipped states | **none** |
| Per scene | S01 11 · S02 7 · S03 1 · S04 6 · S05 4 · S06 6 · S07 2 · S08 5 · S09 5 · S10 5 · S11 3 · S12 3 · S13 4 · S14 5 · S15 5 · S16 5 · S17 4 · S18 4 |
| Logical canvas | `1280 × 720` in every state and every viewport |
| Device-bearing states | **66** · device-less states **19** |
| Document scroll | `0 / 85` states with any document overflow |
| Runtime errors | **0** console / **0** pageerror / **0** requestfailed attributable to the application (1 favicon 404) |

**Matches the expected 85 / 84 exactly. No deviation to record.**

### 7.1 Where the 85 states actually spend their attention

Measured effective-opacity census per state (ancestor-aware):

| Band | What it means | Count of states |
|---|---|---|
| **True black / nothing painted** | no stage type, no device, ≤ 8 painted elements | **3** — `S01_step00`, `S07_step00`, `S18_step00` |
| **Device only, no stage type** | the product is the only subject | **24** — S04, S05, S06, S08, S10 and parts of S02 |
| **Stage type only** | the device is absent or secondary | **30** — S02, S03, S11, S12, S13, S14, S15/16/17 headings |
| **Both, competing** | stage type ≥ 26 px and a device | **28** |

### 7.2 The measured attention defect that Sessions 2–6 could not see

**MEASURED:** the 176 px `.metric-zero` numeral — the forbidden `6 APPS / 1 FAMILIA / 0 COORDINACIÓN` band (`A-03`, `BLOCKER`) — is the **highest-salience painted element on stage in `S02_step06`**, and the `.s08-question` at 68 px and the `60 px "El dinero del hogar"` headline each hold top salience across their scenes.

What it means for motion: **the audience's eye is being carried by narration-on-screen, not by product.** In Scene A the correct target is *nothing*; in Scene B it is *the product*; in Scene D it is *a real Finance surface*. In all three the target is currently a headline.

### 7.3 States that are genuinely correct and must not be disturbed

`S01_step00` (true black, 6 painted elements) · `S07_step00` (product stage fully exited as a block, 204 descendants unpainted) · `S07_step01` (132 px, one idea, nothing competing) · `S08_step01` (measured selective exposure) · `S10_step01` (same mechanism) · `S14_step04` (visually clean question) · `S15_step00`→`S17_step03` chrome discipline · `S18_step03` (end card, infinite hold).

---

## 8. CURRENT TRANSITION INVENTORY — SUMMARY

Full per-transition detail: **`audit/07_TRANSITION_MATRIX.csv`** (84 rows, 28 columns). Aggregate:

### 8.1 Does anything move?

| Metric | Value |
|---|---|
| Transitions where **0** elements change any measured property between settled states | **15 / 84** |
| Transitions where ≥ 10 elements change simultaneously | **26 / 84** |
| Transitions with a layout mutation (`clientW/H` or `scrollW/H`) | **32 / 84** |
| Transitions with a layout mutation **> 4 px** | **27 / 84** |
| Transitions with a **font-size** mutation | **9 / 84** |
| Transitions where the canvas `scrollW/H` changes | **8 / 84** |
| Transitions with any mount/unmount | **33 / 84** |
| Transitions with a device-count change | **6 / 84** |
| Transitions with **running** animations at the settled state | **0 / 84** |
| Max simultaneous meaningful movers, worst transition | **88** (`S08_step02→03`) |

### 8.2 The 15 dead presses

`S01_step03→04` · `S01_step04→05` · `S01_step05→06` · `S01_step06→07` · `S01_step07→08` · `S02_step00→01` · `S02_step01→02` · `S02_step02→03` · `S04_step00→01` · `S05_step00→01` · `S09_step00→01` · `S09_step01→02` · `S09_step02→03` · `S12_step00→01`(partial) · `S13_step00→01`(partial)

**MEASURED:** for these, the settled state before and the settled state after differ only by newly mounted DOM that paints identically or not at all. `S13_step00→01` is worse than dead — Session 4's `G-09` measured `S13_step00` as a **byte-identical remount** of `S12_step02` (51 entering / 28 exiting, 0 animating). **The press exists; the idea does not.** `MASTER §2.10`: *"ningún bloque exige disparar 5-10 objetos individualmente"* — and equally, a press must change an idea.

### 8.3 The 9 layout / font mutations, verbatim

| Transition | Mutation | Verdict |
|---|---|---|
| `S06_step00→01` | `.family-map-stage` `250×200 → 1080×520`; scroll `313×265 → 1350×689`; `.map-place.map-school` `92×32 → 219×82`; `font-size 15px → 41.04px`; `.family-map-glow` `375×330 → 1620×858`; canvas `1280×720 → 1450×789` | **REJECT** — `B-11`, the deck's worst stagecraft failure |
| `S06_step02→03` | `.map-place.map-club` `166×82 → 240×121`; 18 layout changes | REJECT — same cause |
| `S06_step03→04` | reverse of the above, 18 layout changes | KEEP dramaturgy, REJECT mechanism |
| `S08_step03→04` | `.inventory-row-title` `19px → 21px`, box `118×48 → 117×53`; `.inventory-row` height `62 → 64`; `.inventory-card` `scrollHeight 270 → 284`; clip `+41 px → +60 px` | **REJECT** — `C-06`, unsignalled instantaneous focus |
| `S10_step03→04` | `.homecloud-photo` `248×81 → 118×128`; thumb `40×40 → 98×62`; `font-size 11px → 15px` | **REJECT as authored motion**; per `N-08` the thumb values are collapsed-hidden vs settled, not an enlargement. But the `.homecloud-photo` box change is real and is layout mutation |
| `S13_step02→03` | `.s13-bridge` `scrollHeight 8 → 9` | LOW — 1 px |
| `S17_step00→01` | `.homi-decision-row` `scrollHeight 64 → 54` | **REJECT** — the decision row reflows as it appears |
| `S18_step01→02` | `.s18-team` `scrollHeight 113 → 103` | LOW — but it means the team row reflows while entering |
| `S03_step00→04`, `S14_step04→S15_step00`, `S01_*` | `.ambient-glow` boxes and `.attention-element` `scrollWidth/Height` drift | LOW — decorative layers |

### 8.4 Duration and easing — the whole film's vocabulary

**MEASURED across all 84 transitions:** durations in use `220 · 320 · 420 · 500` ms. Easing in use: **`cubic-bezier(0.2, 0.8, 0.2, 1)` — one curve, every transition, both directions.**

Against `NO-UI §6 MOTION SYSTEM — FROZEN`:

| Canon band | Value | Present? |
|---|---|---|
| micro emphasis | 180–240 ms | ✅ 220 |
| opacity / simple move | 260–360 ms | ✅ 320 |
| **state transition** | 380–520 ms | ✅ 420 |
| **shared transform** | **520–760 ms** | ⛔ **NO TOKEN EXISTS.** 500 ms is *below* the floor |
| **hero reveal** | **700–1000 ms** | ⛔ **NO TOKEN EXISTS.** The reveal runs at 640 ms (`420 reframe + 220 blackout`) |
| default curve | `cubic-bezier(.22,.61,.36,1)` | ⛔ not used |
| **exit curve** | `cubic-bezier(.4,0,1,1)` | ⛔ **not used — exits decelerate like entrances** |
| **hero curve** | `cubic-bezier(.16,1,.3,1)` | ⛔ not used |

**Finding:** the deck has **three of the five canon durations and one of the three canon curves**, and it is missing precisely the two durations that carry meaning (a shared element travelling; a hero reveal). Session 4 already noted the directional-easing failure (*"Entrances decelerate, exits accelerate? FAIL."*); this session confirms it across all 84 transitions rather than in one block.

---

## 9. GLOBAL ATTENTION AUDIT

Per-state detail: **`audit/07_ATTENTION_MAP.csv`** (85 rows, 11 columns).

### 9.1 The 250–500 ms identifiability test

**AUTHORED test:** for each stable state, can the audience name the primary subject within roughly 250–500 ms of the state landing?

| Answer | States | Why |
|---|---|---|
| **YES** | **31** | device-only states (24) + the three black states + S08_step01 + S10_step01 + S14_step04 + S07_step01 |
| **PARTIAL** | **29** | a correct subject exists but a second high-contrast element competes |
| **NO** | **25** | the top-salience element is narration-on-screen, or two subjects are co-equal |

### 9.2 The four competition patterns, measured

**(a) Typography competing with product UI — 37 states.**
`S02_step06`→`S09_step04`: the top stage-side salience is a `176 px` / `80 px` / `68 px` / `60 px` headline, never the device. The device's own largest app type is `22–30 px`. **A 176 px headline is 7.9× the largest type inside the product.** At 1.5× projection that is 264 px against 33 px. `MASTER §2.3` authorises exactly six pieces of visible text in the whole film; three of the six are consumed by headlines that duplicate the speaker.

**(b) Motion away from the narrative subject.**
`S06_step00→01`: 38 elements move, and the narrative subject (the map as *data*) is carried by a container that is simultaneously 4.3× wider, 2.6× taller and 34 px outside the canvas. The audience's eye follows the size change, not the meaning.

**(c) An inactive layer remaining too bright.**
`S13_step03` carries `.s13-core-glow` at effective `0.18` and a scene `ambient-glow` at `0.9`. `S14_step00` carries the **entire S13 stack at effective `1.00`** — measured this session, `.s13-stage` and both `.s13-panel` at `eff 1.00` — while `H-12` grades the stack as *background* for the friction scene.

**(d) A repeated title saying what the speaker is already saying.**
`S16_step00`–`S16_step04`: `.s16-idea` at `56 px`, box `540×60.47`, **painted at effective 1.00 in all five states**, reading *"La misma pregunta. / Distinto contexto."* `I-09` (`HIGH`): the forbidden titular states the conclusion and takes the discovery from the audience. `S17_step02`–`S17_step03`: two stage headlines cross-fade (`54 px → 0.4` while `84 px → 1.0`).

### 9.3 The exposure discipline that already works

**MEASURED, and this is the model:**

| State | Subject | Context | Heading | Ground | Mechanism |
|---|---|---|---|---|---|
| **`S08_step01`** | `1.00` | `0.55` | `0.60` | `rgb(246,237,232)` = the product's own `--home-brand-soft` | opacity only — no scale, no layout, no blur |
| **`S10_step01`** | `1.00` | `0.55` | `0.60` | same token | same |

This satisfies `NO-UI §6` exactly: *low exposure `55–65 %`*, *"Preferir exposición antes que blur"*, `MASTER §2.7` *"Exposición baja = devolver atención al expositor o aislar una pieza."* It is **`C-10`, `POSITIVE`, and it is the model for the entire deck.**

**One measured inversion:** `S08_step02` sets `.s08-phone-slot` to effective `0.6` — the **whole** device — while the three plan steps return to `1.00` and the heading to `1.00`. The technique is right; the subject is wrong (`C-03`, `HIGH`).

---

## 10. DEVICE GRAMMAR AUDIT

### 10.1 Measured current device inventory

| States | Device box | Visual size | Scale | Slot position | Layout | Screen client |
|---|---|---|---|---|---|---|
| `S01_step00`–`S03_step00` (19) | `288 × 595.2` | **0.96** | `@572.8,70.4` | `300×620` | `298×618` | `282×602` |
| `S04_step00`–`S09_step04` (28) | `300 × 620` | **1.00** | `@570,50` | `300×620` | `298×618` | `282×602` |
| `S10_step00`–`S10_step04`, `S15_step00`–`S17_step03` (19) | `324 × 669.6` | **1.08** | `@238,25` / `@718,25` / `@250,50` / `@570,50` | `324×670` | `298×618` | `282×602` |
| `S11`, `S12`, `S13`, `S14`, `S18` (19) | **no device** | — | — | — | — | — |

**MEASURED and load-bearing: `.phone-frame` layout is `298×618` and `.phone-frame-screen` client is `282×602` in all 66 device-bearing states, forward and backward.** The three different device sizes on stage are produced entirely by a transform and by the slot box. **This is the single most valuable asset in the deck and it is already the correct mechanism.** `N-41` confirms it as the corpus-level rule.

### 10.2 The safe-area problem — a NEW finding, measured

`tokens.ts`: `canvas: { width: 1280, height: 720, safeArea: 48 }`.

| Scale | Visual height | Measured y | Top margin | Bottom margin | Safe-area verdict |
|---|---|---|---|---|---|
| **1.00** | `620` | `50` | `50` | `50` | ✅ **compliant** (50 ≥ 48) |
| **1.08** | `669.6` | `25` | `25` | `25.4` | ❌ **breaches by 23 px top and bottom** |

**MEASURED finding, new this session:** the device at 1.08 **does not fit inside the frozen 48 px safe area.** The maximum device scale that fits is `624 / 620 = 1.006`.

Two consequences, both decisive:

1. **`NO-UI §7`'s "primary phone: visual height 820–880 px" is geometrically impossible on the frozen 1280×720 canvas.** 820 px does not fit in 720 px. **This is not an implementation failure; it is a canon value that cannot be executed on this canvas.** Session 7 records it and does **not** recommend migrating the canvas (§ brief: *"Do NOT migrate the canvas merely because projection output is 1920×1080"*). The consequence is that **`620 px` is already 99.4 % of the maximum physically available**, and the deck's 1.08 is a deliberate 23 px breach.
2. **There is therefore no third scale.** Any move toward 1.2 or 1.35 (Session 3's readability arithmetic) would breach the safe area by 78 px and 157 px respectively and would be geometrically absurd on a 720 px canvas. **Emphasis must come from device *movement* and *selective exposure*, not from more scale.** This closes the question.

### 10.3 TARGET DEVICE GRAMMAR

| Property | Target | Authority / reason |
|---|---|---|
| **Standard device scale** | **1.00** — `300×620` @ `y = 50`, safe-area compliant | the only compliant resting scale; `N-41` |
| **Emphasized device scale** | **1.08** — `324×669.6`, and the **declared 23 px safe-area breach** | `N-41` promotes 1.08 to a corpus rule; the breach must be *declared*, not accidental |
| **Third scale** | ⛔ **NONE. Prohibited.** | §10.2: no further enlargement fits the canvas |
| **Lateral anchors** | **Two**, defined by the device's *optical* left edge: stage-left third and stage-right third. Currently `x = 250` and `x = 730` at 1.00 (`238` / `718` at 1.08 — the 12 px difference is scale compensation and must be absorbed by the anchor definition, not authored per state) | `MASTER §2.9` *"cambios entre pantallas lejanas pueden resolverse editorialmente moviendo dispositivos completos"* |
| **When a device may move laterally** | Only when the **role** changes: product → map, product → comparison, Homi → Planner execution, S13/S14 → S15. **Never** to make the same screen look different | `NO-UI §7`: valid device motions are left/right, top/bottom, scale, low exposure — and nothing else |
| **When a device must stay centred** | Whenever the device **is** the subject: Home, Planner, Finance, Assets, HomeCloud, and every Homi chat state | `MASTER §2.9` *"una pantalla central = foco de producto"* |
| **Second device justified** | **Only two cases:** (i) Scene I Homi → Planner execution, per the frozen direction *"el teléfono auxiliar de Planner: entra desde un lateral, recibe la task y vuelve a salir"*; (ii) Scene I Homi ↔ visual UI, per *"el dispositivo actual sale hacia arriba; siguiente entra desde abajo"* | `MASTER §2.9` freezes exactly these two directions |
| **Three devices justified** | **Only one moment in the entire film:** Scene I's persona comparison. `MASTER §2.9` — *"tres teléfonos = máximo simultáneo y solo cuando la comparación lo justifica"* | see feasibility below |
| **Maximum simultaneous devices** | **3**, and only at that one moment | `MASTER §2.9` |
| **How a device enters / exits** | Whole-device `transform` only, `spatial` token 500 ms, entering with `opacity 0→1`; exits with `opacity 1→0` and the exit curve. **Never** a layout-size change, never a width/height animation | `N-05`, `B-11`, §19 |
| **How device movement differs from internal UI motion** | Device movement is a **`transform` on the slot**: one object, one curve, 500 ms, no children change. Internal UI motion is **`opacity` / `transform` on a leaf**: ≤ 360 ms, no parent changes. **A device may never move while its contents animate** — the two must be separable, or the audience cannot tell framing from content | AUTHORED; prevents the `S09→S10` and `S14→S15` pattern where a position/transform interpolation and a layer fade happen together |

### 10.4 Three-device feasibility — VERIFIED, not assumed

`NO-UI §7` three-phone spec: central ~700–740 px, laterals ~620–670 px. `MASTER §2.9` I14: laterals *"salen desde detrás del teléfono central hacia izquierda/derecha."*

```
1280 canvas − 2 × 48 safe area      = 1184 px usable
3 × 324 (device at 1.08)            =  972 px
remaining for 2 gaps                =  212 px
gap per device                      =  106 px
```

**MEASURED arithmetic: feasible, exactly, with 106 px per gap and 48 px margins.** Session 4 reached the same figure independently. Session 7 adds two constraints Session 4 did not state:

1. **Do not shrink the devices.** Shrinking to create gaps would put app type below the `NO-UI §5` floor of `20 px` for audience-read content. At 1.00 the smallest readable app text is `11 px` logical → `16.5 px` projected, already below the floor; at 0.96 it is worse. **Readability argues *up*, not down.**
2. **The shared question is extracted above the row, not inside any device.** Measured: the question bubble box is `238×81` at `19 px`. Extracted at `56 px` above three devices it reads at projection while the three answers stay at native scale inside their own devices. **No rhetorical headline** (`I-09`) and **no device scaling** (`I-10`).

**Cost:** the 3-device moment is safe-area-non-compliant vertically by 23 px, exactly like the 1.08 single device. That is the **second and last** authorised breach, and it exists for one beat.

---

## 11. LOCAL FOCUS AUDIT

### 11.1 What exists today

**MEASURED:** the largest transform applied to any individual element anywhere in the film is **`1.08`, and that value is always the phone frame's own `--phone-scale`.** The only other emphasis values are `--home-stage-focus-scale: 1.02` (4 states) and `--opening-near-scale: 1.018` (Scene A).

**MEASURED consequence:** a `1.02` scale on a `20 px` row title is a **0.4 px** change. It is below the legibility threshold and it is the *only* focus mechanism in Scene B (`B-03`, `HIGH`). Session 3 measured `S04_step02`'s focused row at `matrix(1.02,0,0,1.02,0,0)` with background `#F6EDE8` — **the background is doing the work and the scale is invisible.**

**There is currently no local visual focus zoom anywhere in the presentation.** `MASTER §2.6` and `NO-UI §6` both require one; it does not exist.

### 11.2 The conflicting guidance, resolved

| Source | Value |
|---|---|
| `MASTER §6 B1` | `120–125 %` (Session 2 logged as `OPEN-5`) |
| `MASTER §2.6` | micro UI focus `100 → 108/115 → 100`; Tomi `18-19 → 18-20` (~`115 %`); HomeCloud document `100 → 120 → 100` |
| `NO-UI §6` | micro focus `100 → 108 → 100`; **strong UI focus ceiling `115 %`**; HomeCloud document `100 → 120 → 100`; family concept absolute `105 / 110 / 115` |
| Session 2 | recommended `1.12`, or `1.10–1.15`, on the row's **copy only** |
| Session 3 | `1.10–1.15` on pin copy only, non-reflow |

**AUTHORED resolution — one coherent range, and it is not `120–125 %`:**

> ## **`108 %` – `115 %`, transform-based, single-step out and back: `100 → s → 100`.**
> - `s = 108 %` — **micro focus.** A row, a tab, a chip, a nav item that needs a beat.
> - `s = 115 %` — **strong UI focus ceiling.** One named subject that must be read at projection distance. This is a **ceiling**, not a working value: at most one element in the film may be at 115 % at any moment.
>
> **One explicit exception, named:** **HomeCloud document focus at `120 %`**, because two frozen masters name it (`MASTER §2.6` *"elemento documental HomeCloud en factura / garantía / manual: 100 → 120 → 100"*; `NO-UI §6` *"HomeCloud document focus: 100 → 120 → 100"*) and because that document is the hinge of Scene E's thesis.
>
> **Rejected: `120–125 %` as a general value.** It conflicts with `NO-UI §6`'s explicit `115 %` ceiling, and it would make the *ceiling* the *working value*, which destroys the diagnostic: if everything can be 125 %, nothing is emphasised.

### 11.3 Mandatory preconditions — all measured, all enforceable

A local focus is legal **only if all seven hold.** Four of these are violated by mechanisms that exist in the deck today:

| # | Precondition | Measured evidence that it matters |
|---|---|---|
| 1 | `transform` only — never `width`, `height`, `font-size`, `margin`, `padding` | `S08_step03→04` violates this: `19 px → 21 px`, row `62 → 64` |
| 2 | **No `scrollHeight` change on any ancestor** | `.planner-panel-stack` already has `+4 px`; `.inventory-card` `+41 / +60 px`; `.homi-confirm-zone` `+10 px`; `.homi-thread` `+2 px` |
| 3 | **No sibling movement** — the element must not be inside a flex/grid whose siblings resize | `S17_step00→01`: `.homi-decision-row` `scrollHeight 64 → 54` |
| 4 | **No clipping** | `.inventory-card` clip is already `+41 px`, worsening to `+60 px`; the OUT row is clipped out entirely (`C-01`, `BLOCKER`) |
| 5 | **Never inside `.phone-frame-screen`** or any clipping ancestor | `.phone-frame-screen` is `282×602` with `overflow: hidden` in all 66 device states — a 115 % scale on a `248 px` row inside it is `285 px` and **clips** |
| 6 | `transform-origin: center` | required for exact reversibility |
| 7 | **Exactly reversible** | verified by the forward/back walk (§18) |

### 11.4 Where local focus is FORBIDDEN

- On the family map, at any scale (it is already a layout-mutation site — `B-11`)
- Inside `.phone-frame-screen`, `.inventory-card`, `.planner-panel-stack`, `.homi-confirm-zone`, `.homi-thread`, `.homi-context`, `.inventory-filters` — all measured as already overflowing
- On stage typography above 56 px — those are hero lines, not focus targets
- More than one element at once (§14)

---

## 12. SELECTIVE EXPOSURE AUDIT

**Target model, taken verbatim from what already works (`S08_step01`, `C-10` POSITIVE):**

| Layer | Value | Token |
|---|---|---|
| **Subject** | `1.00` | full |
| **Subject ground** | `--home-brand-soft` = `rgb(246,237,232)` | the product's own token |
| **Sibling context** | `0.55` | low exposure (`NO-UI §6` band `55–65 %`) |
| **Section heading** | `0.60` | low exposure |
| **Very low (ghosts, background)** | `0.25–0.35` | `NO-UI §6` band |
| **Duration** | `360 ms` | `exposure` token, default curve |

**Hard prohibitions, each with measured evidence of current violation:**

| Prohibition | Why | Current violation |
|---|---|---|
| ⛔ **Blur as a default** | `NO-UI §6` *"Preferir exposición antes que blur"*; `MASTER §2.7` *"Blur solo cuando realmente hace falta separar jerarquías"* | `S01_step09`: 3 secondaries at `opacity 0.69` **plus `blur(0.35px)`** — both mechanisms for one job |
| ⛔ **Glow as attention glue** | `MASTER §2.8` *"Sin … halos, lens flare, partículas ni 'AI glow'"*; `NO-UI §5` prohibits `glow` outright | `S01_step10` `opening-chaos-light` rises `0 → 0.18` on a pivot line that needs silence; `S13_step03` `.s13-core-glow` at effective `0.18`; `S03_step00` two radials at `0.28` and `0.075` behind the lockup (`A-12`) |
| ⛔ **Dim-everything-to-black as focus** | it destroys the product | `S08_step02` dims the whole device to `0.6`; `S14` ramp goes to `0.12` before black |
| ⛔ **"AI glow"** | `MASTER §2.8`, `NO-UI §5` | `G-12` remains ACTIVE — do not prescribe AI animation at all |
| ⛔ **Per-object bespoke opacities** | eight near-identical weights cannot be read as a group | `S01_step09` measured `0.69 / 0.88 / 0.69 / 0.96 / 0.93 / 1 / 0.69 / 1` |

**Exposure changes must have narrative purpose.** Every exposure shift in the target system is one of exactly four: *the subject arrived*, *the subject lost the floor*, *the context recedes*, *the chapter is ending*. If none of the four applies, no opacity animates.

---

## 13. MOTION TOKEN AUDIT

### 13.1 Current tokens — MEASURED

`motionTokens.ts` declares `fast 220 · standard 320 · emphasis 420 · spatial 500` and one easing `cubic-bezier(.2,.8,.2,1)`. Runtime confirms all four are in use and confirms **one curve for both directions**.

**The four existing tokens are correct and reusable.** `220` sits inside `NO-UI §6`'s `180–240` micro band. `320` sits inside `260–360`. `420` sits inside `380–520`. **No existing token needs to change its duration.** They need to be *named by function* and joined by four more.

### 13.2 TARGET TOKEN SET — **8 tokens, no more**

| # | Token | Duration | Easing | Semantic purpose |
|---|---|---|---|---|
| **1** | `micro` | **200 ms** | `cubic-bezier(.22,.61,.36,1)` | a single object needs a beat of emphasis; local focus `100→s→100` |
| **2** | `enter` | **320 ms** | `cubic-bezier(.22,.61,.36,1)` | an object arrives: `opacity 0→1` + `translate 0 12px→0` |
| **3** | `exit` | **260 ms** | **`cubic-bezier(.4,0,1,1)`** | an object leaves. **Accelerating, not decelerating** |
| **4** | `exposure` | **360 ms** | `cubic-bezier(.22,.61,.36,1)` | attention moves: one layer to `0.55`, another to `1.00` |
| **5** | `spatial` | **500 ms** | `cubic-bezier(.22,.61,.36,1)` | a whole group, a whole device or the editorial frame moves in space |
| **6** | `reset` | **520 ms** | **`cubic-bezier(.4,0,1,1)`** | a chapter goes to absolute black, or returns from it |
| **7** | `shared` | **640 ms** | `cubic-bezier(.22,.61,.36,1)` | **one object changes context while keeping its identity** |
| **8** | `hero` | **880 ms** | **`cubic-bezier(.16,1,.3,1)`** | the HomePlus reveal and the Homi name. **Once in the film, maybe twice** |

**Plus one envelope, not a token:** an **`AUTO_MICROSEQUENCE` envelope of ≤ 1400 ms total**, composed only of tokens 1–8. See §16.

**Why eight and not fewer:** tokens 3, 6 and 8 each carry a **different easing curve** mandated by `NO-UI §6`. Merging them would violate canon. Token 7 exists because `NO-UI §6` freezes `shared transform: 520–760 ms` and **nothing in the deck currently occupies that band** — it is the band the film's most important motion needs and it is empty.

**Why eight and not more:** the four existing durations are reused verbatim. No duration is invented that `NO-UI §6` or `MASTER §2.8` does not already name. **No token exists that has no semantic purpose.**

### 13.3 Allowed / forbidden properties — global

| ✅ Allowed | ⛔ Forbidden |
|---|---|
| `opacity` | `width`, `height`, `padding`, `margin`, `font-size` |
| `transform` (`translate`, `scale`, `rotate`) | `scrollWidth` / `scrollHeight` / `scrollTop` mutation |
| `clip-path` / `mask` where safe | `filter: blur()` as a default |
| `visibility` (discrete, with `enter`/`exit`) | `box-shadow` animation |
| `filter: opacity()` where compositing requires it | any continuous / looping / idle animation |
| | `transition: all` |

**No continuous idle animation anywhere.** §17 is the contract; this is its implementation consequence.

---

## 14. MOTION CONCURRENCY AUDIT

### 14.1 The heuristic

**AUTHORED, from `motion-design`'s one-third rule:** when 3 or more meaningful elements exist, no more than roughly **one third** should be actively moving at once — unless simultaneous movement *is* the concept. **Treated as an attention diagnostic, not a law.**

### 14.2 Measured concurrency, worst cases

| Transition | Max simultaneous movers | Is simultaneous motion the concept? | Verdict |
|---|---|---|---|
| **`S08_step02→03`** | **88** | **No** — a device slide | ❌ **WORST IN THE FILM.** 88 elements move to slide one phone 480 px. `MASTER §2.10` forbids *"disparar 5–10 objetos individualmente"*; this is 88 |
| `S06_step00→01` | **38** | **No** — a layout mutation | ❌ 38 movers, 17 layout mutations, 5 concurrent opacity changes |
| `S06_step05→S07_step00` | **48** | **Partly** — the product must exit as a block | ⚠ the concept *is* block motion, but 48 movers with 11 opacity changes is not a block exit; it is a cross-mount |
| `S03_step00→S04_step00` | **149** | **No** | ❌ 145 elements repositioned, 12 layout mutations — a cross-mount dressed as a transition |
| `S01_step09→10` | 19 | **Partly** — collective de-emphasis | ⚠ right idea, wrong mechanism (8 individual presses, 4 bespoke opacities) |
| `S10_step01→02` | 44 | No | ❌ a navigation with 44 movers |
| `S15_step04→S16_step00` | 26 | No | ❌ cross-mount, 12 mounts / 13 unmounts |
| `S07_step01→S08_step00` | 70 | No | ❌ cross-mount, 270 entering / 517 exiting |
| `S13_step02→03` | 8 | **Partly** — five technologies named | ⚠ `G-11`/`G-14`: five spoken ideas collapse into one press |
| `S14_step03→04` | 16 | **No** | ❌ `H-06`: the attention reset and the question arrival are the same press |
| `S16_step00→01` | 13 | Partly | ⚠ one beat, 6 concurrent |

### 14.3 Measured: cross-mounts are the real concurrency problem

**Of the 33 transitions with mount/unmount, 12 are pure cross-mounts with 0 interpolating animation.** Their element counts (`S07→S08` 270/517, `S08→S09` 114/269, `S09→S10` 172/114, `S13→S14` 88/57, `S03→S04` 145 repositioned) are **not motion.** They are React re-rendering a different subtree. Calling them transitions is a category error, and they are why 33 of 84 transitions "change something".

**AUTHORED consequence for Session 8:** a cross-mount is only acceptable at a **black reset**. Everywhere else, the outgoing composition must **persist and change exposure** — which is exactly `G-08`'s prescription (*"The echo should be a dimming of an existing composition, never a rebuild of it"*) and this session extends it to every boundary.

---

## 15. TRIGGER ARCHITECTURE

Per-beat detail: **`audit/07_TRIGGER_BEAT_MAP.csv`** (111 target beats, 16 columns).

### 15.1 The three trigger types

| Type | Definition | Count in target |
|---|---|---|
| **`MANUAL`** | the presenter consciously advances narrative meaning. **One press = one meaningful beat.** | **80 stable states** |
| **`AUTO_MICROSEQUENCE`** | a manual press starts a short atomic movement that then runs itself. **It must end on a stable state.** | **31 sequences** |
| **`HOLD`** | a stable state remains indefinitely. **No timer. No auto-advance.** | every one of the 111 states, plus 6 dedicated black states |

### 15.2 `MANUAL` — the rule and its test

> **One press = one idea the speaker says.**

Test applied to every target beat: *"can the presenter say the line that goes with this beat, and would omitting the press break a sentence?"* If no, the beat is a duplicate and is merged or deleted.

**Measured evidence that the current deck violates this:**
- `S13_step00` is a byte-identical remount of `S12_step02` — a press that changes nothing (`G-09`).
- `S09_step00→01`, `→02`, `→03` change only which of four 33 px narration lines is at `opacity 1` versus `0.45`. **Three presses, one product state** (`D-01`, `BLOCKER`).
- `S01_step03→08` are six presses carrying one spoken line.

### 15.3 `AUTO_MICROSEQUENCE` — the rule and the authorisation list

> **`AUTO` is allowed only inside one atomic visual cause→effect sequence.**
> **`AUTO` must NEVER advance to the next idea, the next spoken paragraph, the next scene, a new product claim, or a new narrative conclusion.**
> **Narrative advancement remains `MANUAL`, always.**

**The 31 authorised sequences** (each with a measured or cited justification):

| Beat | Sequence | Total | Authority |
|---|---|---|---|
| `A05` | S01 saturation: 3 staggered bursts, last fastest | ~1100 ms | `MASTER §2.10`; replaces **8 individual presses** |
| `A07` | clear to absolute black | 360 ms + hold | `MASTER §2.8` 400–600 ms clear |
| `A12` | founding-question reset to true black | 520 ms + indefinite hold | `A-02` BLOCKER |
| `A13` | HomePlus **icon alone** | 320 ms | `MASTER A15` verbatim |
| `A14` | **hero reveal**: icon left, wordmark rightward, `#E7643F` field, no halo | **880 ms** | `MASTER A16`; `NO-UI §6` hero reveal 700–1000 ms |
| `B03` | Juli identity shared-element arrival | 640 ms | `MASTER §2.5` |
| `B07` | **scope widening** Juli → household | 1400 ms | `B-10`; `MASTER §2.10` |
| `B10` | Planner selection pill translate | 320 ms | `N-02` verified mechanism |
| `B20` | product stage exits as one block | 260 ms | `MASTER §2.4`; `B-P7` KEEP |
| `C05` | **bridge task extracted** from Plan → Inventory | 640 ms | `C-04`; `MASTER §7 C3` |
| `D06` | **PS5 movement row extracted** from Finance → Asset | 640 ms | `D-09`; `N-37` |
| `E04` | **document extracted** Assets → HomeCloud | 640 ms | `E-10`; `MASTER E3` |
| `E06` | warranty/memory exposure swap, sequential | 600 ms | `E-04`; `MASTER E9` |
| `E07` | exposure-down, then reset to black | 360 + 520 ms | `E-13` |
| `G02` | three local-focus steps: screen 108 → button 115 → nav 110 → 100 | 1140 ms | Session 4 `G01`; `NO-UI §6` |
| `G03` | five backend verbs, one active at a time | 1100 ms | `G-04` BLOCKER |
| `G04` | the `$48.720` transaction travels and is validated | 1400 ms | `G-05` BLOCKER; Session 4 `G03` |
| `G09` | **recomposition into one experience** | 1200 ms | `G-15` BLOCKER |
| `H04` | **everything clears** to one clean product state | 360 + 500 ms | `H-04` BLOCKER; `MASTER H3` |
| `H05` | reset to black, then hold | 520 ms | `H-07` HIGH |
| `I01` | reset to black, then the Homi name | 520 + 880 ms | `I-24`; Session 5 |
| `I02` | device enters; wordmark settles to `0.40` | 500 + 360 ms | Session 5 target |
| `I06` | **proposal → Planner auxiliary device → task detaches → task lands** | **1400 ms** | **`NO-UI §4`'s own worked example, quoted verbatim** |
| `I09` | two laterals emerge from behind the centre device | 500 ms | `MASTER §2.9` I14 |
| `I13` | device exits UP, next enters from BELOW | 500 + 500 ms | `MASTER §2.9`, frozen |
| `I16` | exposure down, then reset to black | 360 + 520 ms | `I-04` BLOCKER |
| `J01` | reset to black, then hold 24.5 s | 520 ms + hold | `J-02` HIGH |
| `J06` | ghosts: dashed lines 300 → hold 400 → fade 400 | 1100 ms | Session 4/5 |
| `J11` | **frame 300 → scale 100→82 % 550 → opacity 100→0 550** | 1400 ms | `J-09` HIGH |
| `J12` | flash 110 → photo frame 300 → hold 800 | 1210 ms | `J-10` HIGH |

**Every one ends on a stable state.** None advances an idea. The 31 sequences absorb motion that today costs the presenter **8 presses in Scene A alone** and would otherwise cost ~30 more across the film.

---

## 16. AUTO-MICROSEQUENCE RULES

1. **One press starts it. Nothing else does.**
2. **Total ≤ 1400 ms.** Longest authorised: `I06` (Homi execution) and `J11` (technology recession) at 1400 ms.
3. **It must end on a stable state.** No sequence may end mid-flight.
4. **It may contain only tokens 1–8.** No ad-hoc durations.
5. **It may not change the narrative position.** If the audience would want to breathe between two steps of the sequence, it is **two `MANUAL` beats** — `NO-UI §4`: *"Si el expositor puede querer respirar entre dos cambios, son dos manual triggers."*
6. **It may not be interruptible mid-flight in a way that leaves residue.** If interrupted, it must land on its final stable state with no orphan animation.
7. **It may not be required for comprehension.** If the audience misses the sequence entirely, the meaning must survive. `MASTER §2.10` requires the deck to *"tolerar una variación oral de ±0,5–1 s sin romper la historia."*
8. **One concurrent subject per step**, except where group motion *is* the concept (`B07`, `B20`, `J11`).
9. **Reverse must be exact.** `ArrowLeft` restores the pre-sequence state completely — see §18.

---

## 17. STABLE-STATE CONTRACT

> **If the presenter waits 10 seconds, 30 seconds, or 2 minutes, NOTHING changes.**

### 17.1 MEASURED — the current deck already satisfies this

Twelve hold tests, three samples each (0 s / 10 s / 30 s), `requestAnimationFrame`-settled before sampling:

| Target | Reached | Geometry hash stable | Text hash stable | Running animations | `playState` of every animation |
|---|---|---|---|---|---|
| `S01_step00` (opening) | ✅ | ✅ | ✅ | `0, 0, 0` | *(none)* |
| `S01_step10` (Scene A end) | ✅ | ✅ | ✅ | `0, 0, 0` | *(none)* |
| `S04_step03` (Home) | ✅ | ✅ | ✅ | `0, 0, 0` | `finished, finished` |
| `S05_step02` (Planner) | ✅ | ✅ | ✅ | `0, 0, 0` | `finished` |
| `S06_step03` (Family) | ✅ | ✅ | ✅ | `0, 0, 0` | `finished` |
| `S08_step01` (selective exposure) | ✅ | ✅ | ✅ | `0, 0, 0` | `finished, finished` |
| `S09_step04` (Finance) | ✅ | ✅ | ✅ | `0, 0, 0` | `finished, finished` |
| `S10_step04` (Assets/HomeCloud) | ✅ | ✅ | ✅ | `0, 0, 0` | `finished, finished` |
| `S14_step04` (key question) | ✅ | ✅ | ✅ | `0, 0, 0` | `finished, finished` |
| `S16_step04` (persona) | ✅ | ✅ | ✅ | `0, 0, 0` | `finished ×4` |
| `S17_step03` (decision) | ✅ | ✅ | ✅ | `0, 0, 0` | `finished, finished` |
| `S18_step03` (end card) | ✅ | ✅ | ✅ | `0, 0, 0` | `finished` |

**12 / 12 stable. `runningAnimations = 0` at every sample. `playState = "finished"` at every sample** — `N-10` confirmed mechanically, not by wording. **This is `KEEP AS-IS` and it is the single most load-bearing property of the deck for live delivery.**

### 17.2 The contract, stated for Session 8

A state is **stable** iff, with no input:

| ⛔ Forbidden | Required instead |
|---|---|
| idle drift, looping shimmer, breathing, pulsing | absolute stillness |
| typing animation, carousel, auto page change | a completed state |
| timer, `setTimeout`, auto-advance | manual advance only |
| animated AI icon, repeating glow | a static glyph, if a glyph is used at all |
| any `animation-iteration-count: infinite` | `iteration-count: 1` or none |
| a partially-applied transition | a fully-settled composition |

**Three consequences Session 8 must honour:**

1. **A black hold is a state, not a duration.** `S07_step00`, `S18_step00`, `S11_step00` are already correct. The founding-question black, the pre-Homi black, the pre-reveal black and the Scene H prelude black must all be **states**.
2. **An `AUTO_MICROSEQUENCE` must terminate.** It ends on a stable state by rule (§16.3).
3. **The 31 `finished` animations retained by `fill-mode: both`** (`.ambient-glow` `attention-enter` and the S13 core glow) are **not motion** and must never be described as such. They are harmless. **Do not "fix" them and do not remove them** — Session 3 measured `opening-stage-light` and `metrics-zero-light` as `finished` with `fill: both`, and their removal would change the painted frame.

---

## 18. BACKWARD NAVIGATION CONTRACT

### 18.1 Target

> **`ArrowRight` / `Space`:** previous stable state → forward transition → next stable state.
> **`ArrowLeft`:** current stable state → **restore** the previous stable state.
> **NOT:** play the forward animation in reverse.

### 18.2 MEASURED — the current deck

Full forward walk (85) then full backward walk (85), compared element-by-element:

| Metric | Value |
|---|---|
| States compared | **85 / 85** |
| **Byte-identical** element snapshots | **51 / 85** |
| Differing | **34 / 85** |
| **Visible-text set identical** | **85 / 85** |
| **Device geometry identical** | **85 / 85** |
| **Overflow census identical** | **85 / 85** |
| **Running animations at settled state, both directions** | **0 / 85** |
| Document scroll changed | **0 / 85** |

### 18.3 The 34 differing states — characterised precisely

**MEASURED:** the difference is confined **entirely** to the mounted-but-hidden `.family-map-stage` subtree.

| | Forward arrival | Backward arrival |
|---|---|---|
| `.family-map-stage` | `@22.4,0` `0×0`, `transform: none`, `visibility: hidden` | `@285.62,240` `192×0` / `@274.19,250` `200×0`, `transform: matrix(1,0,0,1,0,0)` |
| `.family-map-surface` | `0×1` | `192×1` / `200×1` |
| `.map-demo-screen` | `0×44`, `scroll 34×0` | `200×250`, `scroll 250×0` |
| `.map-place.map-school` | `@15.33,84.6`, `matrix(0.96,…)` | `@334.23,84.6`, `matrix(0.96,…)` |
| `.map-place-symbol` | `@21.79,16.59` | `@340.69,16.59` |

**The differing states are exactly:** `S01_step00`…`S01_step10` (11) · `S02_step00`…`S02_step06` (7) · `S03_step00` (1) · `S04_step00`…`S04_step05` (6) · `S05_step00`…`S05_step03` (4) · `S06_step00` · `S06_step04` · `S06_step05` (3) · `S07_step00` · `S07_step01` (2) = **34**.

**One visible-level case:** `S06_step04`, where `.family-map-stage` has identical geometry in both directions (`250×200 @274.19,250`) but `transform: matrix(1,0,0,1,0,0)` forward vs `transform: none` backward. `matrix(1,0,0,1,0,0)` **is** the identity, so the rendered pixels are identical. Recorded because it was measured, not because it changes the frame — exactly Session 1's finding, now re-verified.

### 18.4 Verdict

**The backward-navigation contract is MET at every level an audience can observe, and NOT MET at the DOM-subtree level.**

| Requirement | Verdict |
|---|---|
| no timers continue after navigation | ✅ **0 running animations, both directions, all 85 states** |
| no orphan animation remains | ✅ **0 running animations at settled state, both directions** |
| no stale hidden transform | ⚠ **34 states** carry a residual transform on a `visibility: hidden` subtree |
| no residual opacity | ✅ every hidden layer is at effective `0` or `visibility: hidden` |
| no changed scroll position | ✅ **0 / 85** |
| no shared element left detached | ✅ **0 shared elements exist**, therefore nothing can be detached — vacuously true, and it is a *symptom* |
| no duplicate device | ✅ **85 / 85** device geometry identical; `deviceCount` matches in both directions |
| no post-animation state leak | ⚠ the same 34 states |

**Severity: `MEDIUM`, not `BLOCKER`.** Reasoning, stated so it can be re-checked: the residue has **zero** visible effect today (text identical, device identical, overflow identical, zero running animations, `matrix(1,0,0,1,0,0)` is the identity). It is `RC-15` (`H-09`: `.s13-center` re-asserts `visibility: visible`, so hidden subtrees are not robustly hidden). **But it becomes a live defect the moment that subtree is made visible or animated — which is exactly what Session 7's Scene B target requires** (`B15`: the map beat must return inside the device). **It is therefore a prerequisite for Session 8, not a cosmetic issue.**

### 18.5 The requirement Session 8 must meet

`ArrowLeft` must produce, byte-for-byte:

| # | Requirement | How to verify |
|---|---|---|
| 1 | identical painted geometry for every element | element-by-element snapshot comparison, both directions |
| 2 | identical visible text set | text-set hash |
| 3 | identical device box, scale and position | device geometry comparison |
| 4 | identical overflow census on every surface | `scrollW/H` per node |
| 5 | zero running animations | `getAnimations()` filtered by `playState` |
| 6 | **zero residual inline `transform` on any hidden subtree** | this is the one currently failing |
| 7 | **a shared element returns to its exact origin geometry, not to a lookalike** | new test — there are no shared elements today, so there is nothing to test. **Session 8 must create the test.** |
| 8 | no duplicate device; `deviceCount` matches | device count comparison |

---

## 19. SCENE-BOUNDARY AUDIT — GLOBAL SCENE-BOUNDARY MAP

Seventeen boundaries. All audited separately below.

### GLOBAL SCENE-BOUNDARY MAP

| # | Boundary | Idea ending → idea beginning | Black reset justified? | Shared object? | Phone persists? | Device direction | Real nav? | Target family | Audience gets a breath? | Currently lands? |
|---|---|---|---|---|---|---|---|---|---|---|
| **1** | S01→S02 | exhaustion → *"la información ya existía"* | **YES** — accumulation must clear | yes — one household object | n/a (no device) | — | no | `EDITORIAL` | ❌ light *rises* `0.075→0.10` | ❌ `A-13` |
| **2** | **S02→S03** | the argument → **the founding question** → the answer | **YES — this is the film's black** | no — the question *is* the transition | n/a | — | no | `EDITORIAL` + black `HOLD` | **❌ 115 ms** | ❌ **`A-02` BLOCKER** |
| **3** | S03→S04 | the promise → Juli's Home | no | **YES — Juli → Home of Juli** (`MASTER A9`) | **enters** | lateral in | no | `SHARED_ELEMENT` | ❌ cross-mount, 145 movers | ❌ `A-11` |
| **4** | S04→S05 | Home → Planner | no | no (same device) | **YES** | none | **YES** | `REAL_NAV` | ✅ | ✅ **KEEP** |
| **5** | S05→S06 | Juli's scope → the household's | no | **YES — the four members** (`B-10`) | **YES** | none | **YES** (Home→Familia) | `SHARED_ELEMENT` | ❌ no bridge state | ❌ `B-10` |
| **6** | S06→S07 | the household → **the limit** | **YES** — `[Pausa]` | yes — 4 callbacks (`MASTER B7`) | **exits as a block** | out | no | `EDITORIAL` | ✅ | ⚠ block exit correct, synthesis missing (`B-19`) |
| **7** | S07→S08 | the limit → the birthday | no | weak — the Plan | **enters** | lateral in | no | `EDITORIAL` | ❌ cross-mount, 70 movers / 270 entering | ❌ |
| **8** | S08→S09 | *"qué comprar"* → *"el dinero"* | no | **YES — `shopping.missingItem` → the ledger fact** | **YES** | lateral out/in | no | `SHARED_ELEMENT` | ❌ cross-mount | ❌ **`C-11/D-10` BLOCKER** |
| **9** | S09→S10 | *"el dinero"* → *"la Play"* | no | **YES — `finance.ps5Movement`** (`D-09`) | **YES** | out | no | `SHARED_ELEMENT` | ❌ cross-mount, 0 animating | ❌ **`D-09` BLOCKER** |
| **10** | S10→S11 | *"la memoria del hogar"* → continuity | **YES** — chapter reset | no | **exits** | out | no | `EDITORIAL` + black | ❌ destroys HomeCloud at full opacity | ❌ `E-13` |
| **11** | S11→S12 | continuity → how it is built | **YES** — but it costs a whole press | **YES — the device** (`F-05`) | **enters centred** | in | no | `DEVICE_TRANSITION` | ❌ hard cut, 0 animating | ❌ `F-02` |
| **12** | S12→S13 | frontend/backend → the stack | ⛔ **NO — it is inside the same scene** | n/a | n/a | — | no | **none — delete the boundary** | ❌ dead press | ❌ **`G-09`** |
| **13** | **S13→S14** | the stack → the friction | ⛔ **NO — it replays the stack** | n/a | n/a | — | no | **none — the stack must DIM, not remount** | ❌ | ❌ **`G-08` — worst motion in Scene G** |
| **14** | S14→S15 | the question → Homi | **YES** — Homi reveal setup | ⛔ **NO — see registry SE-15** | **enters** | in | no | `EDITORIAL` + black | ❌ hard cut | ❌ `I-24` |
| **15** | S15→S16 | doing → knowing | no | **YES — the question bubble** (`777,187,238,81`) | **YES** | none | no | `SHARED_ELEMENT` | ❌ cross-mount, 0 animating | ❌ `I-24` |
| **16** | S16→S17 | knowing → deciding | no | no | **YES** | **out UP / in BELOW** (`MASTER §2.9`) | no | `DEVICE_TRANSITION` | ❌ hard cut | ❌ `I-05` BLOCKER |
| **17** | **S17→S18** | the decision → the closing | **YES** — closing silence | no | **exits** | out | no | `EDITORIAL` + black `HOLD` | ❌ only 220 ms | ❌ `J-02` |

**Summary of the 17 boundaries:**

| Question | Answer |
|---|---|
| **Black reset justified?** | **YES at 6**: S01→S02, **S02→S03**, S06→S07, S10→S11, S11→S12, S14→S15, S17→S18 (**7**). ⛔ **NO at 2**: S12→S13, S13→S14 |
| **Shared semantic object exists?** | **YES at 9** — but **none is currently implemented** |
| **Phone should persist?** | **YES at 6** (S04→S05, S05→S06, S08→S09, S09→S10, S15→S16, S16→S17). **Exits at 3** (S06→S07, S10→S11, S17→S18). **Enters at 3** (S03→S04, S11→S12, S14→S15) |
| **Device direction communicates anything?** | **NO today.** MEASURED: `phoneCount = 1` in all 14 Scene-I states; device box `718,25,324,670` unchanged across 14 states / 3 scenes / ~3.4 min (`I-21`). The three frozen `MASTER §2.9` directions are **all unimplemented** |
| **Real navigation?** | **2 of 17** — S04→S05 and S05→S06 (both intra-product, both correctly represented) |
| **Does the next scene begin too early?** | **YES at 5** — S02→S03 (115 ms black), S13→S14 (replay), S14→S15 (hard cut), S15→S16 (hard cut), S16→S17 (hard cut) |
| **Does the previous scene land before leaving?** | **NO at 7** — S01 (no clear for the pivot line), S02 (no black), S05→S06 (no bridge), S08→S09 (no extraction), S09→S10 (no extraction), S10 (destroyed at full opacity), S13 (replayed instead of left) |

---

## 20. BLACK-SCREEN GRAMMAR

### 20.1 Black is a semantic tool, not slide separation

`MASTER §2.2` authorises **exactly four** uses. Session 7 finds **seven** target black states, and each maps to one of the four:

| # | Black state | `MASTER §2.2` use | Held for |
|---|---|---|---|
| **1** | `S01_step00` — the opening | 1 — foco absoluto en el expositor | *"Imaginen un martes cualquiera"* |
| **2** | `S02_step04` — *"y otra simplemente en la cabeza de alguien"* | 1 + 3 | one spoken line |
| **3** | **the founding question** (new state) | **3 — pregunta conceptual** | **the whole of L41–L43, ~4–5 s** |
| **4** | `S07_step00` — `[Pausa]` | 2 — reset entre capítulos | *"Pero hay un límite…"* |
| **5** | `S11_step00` — continuity entry | 2 — reset entre capítulos | the whole of L275–L277 |
| **6** | **the Scene H prelude** (new state) | 2 + 3 | *"entonces nos hicimos una última pregunta"* |
| **7** | **the Homi reveal setup** (new state) | 3 — pregunta conceptual | *"Y ahí aparece Homi"* + the name alone |
| **8** | `S18_step00` — closing silence | **4 — cierre emocional** | **Gaby's whole block, ~24.5 s** |

### 20.2 Measured current behaviour of black

| Aspect | MEASURED |
|---|---|
| Field colour | `#060404` (S07–S18) · `#0B0908` (canvas token, S01–S06). **Two blacks.** `J-13` grades this `LOW`; **do not "fix" it into inconsistency** |
| Longest true black today | `S11_step00` / `S18_step00` / `S07_step00` — three states, each **fully stable** |
| Shortest black today | **115 ms**, inside the `S02_step06→S03_step00` animation |
| Black contamination, entry | `S02_step06→S03_step00`: `.service-icon` ×6, `.family-center`, `.metric-zero` and two glows all animate **during** the blackout |
| Black contamination, exit | **`S14_step03→04`: 3 elements move concurrently** — `.s14-echo` `0.12→0` over 420 ms, `.s14-barrier →0` over 320 ms, `.s14-question 0→1` over 420 ms. **Residue and question coexist for ~420 ms** (`H-06`) |
| Black duration authority | `MASTER §2.8`: *"hold emocional: 400–900 ms"* — **and a hold must be a state**, because `MASTER §2.10` forbids requiring timed precision |

### 20.3 Black rules

1. **A black hold is a `MANUAL`-triggered state.** It has a trigger and an indefinite duration. **No timer.**
2. **Everything clears before the black is "on".** `exposure 360 ms` → then `reset 520 ms` → then hold. Never simultaneous.
3. **Nothing arrives during a black hold** unless it is the black's own subject (the question, the name).
4. **Black is never used as slide separation.** If two consecutive scenes need black, they are one chapter.
5. **`reset` uses the exit curve `cubic-bezier(.4,0,1,1)`** — black arrives faster than it leaves. This is currently unimplemented: the deck decelerates into black like everything else.
6. **The exit from black is `hero 880 ms` for the two reveals** (HomePlus, Homi name) and `enter 320 ms` for every other arrival.

---

## 21. SCENE A MOTION AUDIT

**Motion / stagecraft only. Narrative truth = Session 2. Not re-audited.**

### 21.1 Measured current motion

| | |
|---|---|
| States | 19 (S01 11 · S02 7 · S03 1) |
| Spoken words | **200** (28 non-empty spoken lines) |
| Duration at 150 wpm | **80.0 s** |
| Current presses | 18 → **4.4 s per press** |
| Accumulation | `.attention-element` count `1 → 1 → 1 → 1 → 2 → 3 → 4 → 5 → 6 → 7 → 8`; every fragment at effective opacity **1.00** for the whole scene |
| Fragment boxes | `466×89`, `376×89`, `358×74`, `366×89`, `444×89`, `596×138`, `324×74` |
| Coverage at `step10` | 7 content boxes = **279 970 px² of 921 600 px² = 30.4 %** |
| Opacities at `step09` | `0.69 / 0.88 / 0.69 / 0.96 / 0.93 / 1 / 0.69 / 1` + `blur(0.35px)` on 3 |
| Slogan band at `S02_step06` | 3 blocks `236×225.59` at x `218 / 522 / 826`, y `264` → band `844×225.59` = **66 % × 31 % of canvas**; numerals **176 px** |
| Reveal | blackout `0 → 1.000 @ 326 ms → holds to 441 ms → 0 @ 656 ms`; lockup `0.064 @ 661 ms → 1.000 @ 977 ms` |
| Lockup | logo `204×204 @538,217`; wordmark `78 px`; **vertically stacked**; glow `1120×728 @0.28` + `700×455 @0.075` |

### 21.2 Target choreography — Scene A

| Beat | Anchor | Target | Trigger | Family |
|---|---|---|---|---|
| `A01` | L15–16 | **true black, nothing painted** | `MANUAL` | `EDITORIAL` |
| `A02` | L18–19 | insurance document **440–480 px** (MASTER floor is 420–520) | `MANUAL` → `enter 320` | `SHARED_ELEMENT` |
| `A03` | L20 | **invoice `0.60` + bag `1.00`, coexisting** | `MANUAL` → `exposure 360` | `SHARED_ELEMENT` |
| `A04` | L21 | warranty bubble **alone at `1.00`**, objects `0.55` — **moved to beat 3–4, not beat 8** | `MANUAL` | `SHARED_ELEMENT` |
| `A05` | L22–23 | **saturation as ONE `AUTO` 1100 ms**, 3 bursts, last fastest | `MANUAL` → `AUTO` | `EDITORIAL` |
| `A06` | L24 | **THE MISSING STATE**: the whole field to one shared `0.55–0.65`, nothing enters or exits, **HOLD** | `MANUAL` → `exposure 360` | `EDITORIAL` |
| `A07` | L26 | everything clears to **absolute `#000000`**, **HOLD** | `MANUAL` → `exposure 360` | `EDITORIAL` |
| `A08` | L28–30 | distributed context: **three household objects at `0.55`, zero brand logos** | `MANUAL` ×1 | `EDITORIAL` |
| `A09` | L28–30 | one object isolated at `1.00` | `MANUAL` → `exposure 360` | `EDITORIAL` |
| `A10` | L32–36 | **THE MISSING STATE**: the old household message at `1.00`, rest of field `0.35–0.45` | `MANUAL` | `SHARED_ELEMENT` |
| `A11` | L37–39 | **`La información ya existía.`** alone at `80 px` — **past tense** | `MANUAL` → `enter 320` | `EDITORIAL` |
| **`A12`** | **L41–43** | **ABSOLUTE BLACK. Nothing. `MANUAL`-triggered, held for the whole of the question, no timer** | `MANUAL` → `reset 520` + `HOLD` | `EDITORIAL` |
| `A13` | L45 (last two words) | **icon ALONE on black, no wordmark** — `MASTER A15` verbatim | `MANUAL` → `enter 320` | `EDITORIAL` |
| `A14` | L45–48 | **hero reveal**: `hero 880 ms`, `cubic-bezier(.16,1,.3,1)`, icon left / wordmark rightward, `#E7643F` field, **no halo, no vignette, no radial** | `MANUAL` → `AUTO` | `EDITORIAL` |
| `A15` | L48–51 | four members enter, **absolute** scales `105 → 110 → 115 %` | `MANUAL` → `enter 320`, 70 ms stagger | `SHARED_ELEMENT` |
| `A16` | L53–56 | the four at **equal** scale — *"la idea es exactamente la contraria"* | `MANUAL` → `micro 200` | `EDITORIAL` |
| `A17` | L57–61 | house outline draws `700–900 ms`; **Juli remains and morphs into Home of Juli** | `MANUAL` → `AUTO` | `SHARED_ELEMENT` |

**Reveal timing, stated exactly:** the founding question is **fully deliverable over black** and **must be**. The icon arrives on the **last two words**, not during the question. The wordmark and the field arrive on the *next* press. **The current 640 ms collapse of `MASTER A5/A14/A15` — three frozen states — into one animation is the single most consequential motion defect in the film** (`A-02`).

**Physical-object persistence:** `ACCUMULATIVE` from `A02` to `A05` (all three objects coexist), `EXCLUSIVE` at `A07` (nothing), `SELECTIVE CONTINUITY` from `A10` to `A11` (only the declared message survives). **NO-UI §9 requires every state to declare its model; today no Scene A state declares one.**

**First meaningful appearance of orange:** `A14`, the hero reveal. **Nothing before it.** `A-01` (`HIGH`) is now unambiguous because `N-24` settles which orange is correct: `#E7643F` is the frozen brand orange in two masters and in Figma-app's own `index.css`. **The stage currently uses `#E65C1B`, which appears in zero authoritative documents, and it appears pre-reveal in 20 of 19 Scene A states at effective `0.075–0.28`, plus a `176 px` orange `.metric-zero`.**

**Does the reveal breathe before Scene B?** Target: **yes.** `A14` ends on a stable lockup that **holds** while `A15`–`A17` play. `A-11`: today the lockup is followed immediately by a cross-mount with 145 elements repositioned and nothing travelling.

---

## 22. SCENE B MOTION AUDIT

**Content target = Session 2. Not re-audited.**

### 22.1 Measured current motion

| | |
|---|---|
| States | 16 (S04 6 · S05 4 · S06 6 · S07 2) |
| Spoken words | **459** (38 lines) — the longest block in the film |
| Duration at 150 wpm | **183.6 s** |
| Current presses | 15 → **12.2 s per press** — the screen does nothing for 12 s at a time |
| Device | **one physical phone** at `300×620 @570,50`, scale `1.00`, layout `298×618`, screen `282×602`, throughout — `B-P4` **KEEP** |
| Planner tabs | `81.16 / 81.69 px`; pill `81.33 px` translating `left 3 → 84.33 → 165.66`. **Max observed 84 px.** `N-02` **CONFIRMED** |
| `.planner-panel-stack` | `250×298.63` client, `250×303` scroll — **genuine `+4 px` overflow, 47 states** |
| Chrome dim at `S04_step05` | `topBar 0.84 · navigation 0.82 · home-current-date 0.82 · section headings 0.84` |
| S06 map | see §19 and §22.3 |
| S07 | `#060404`, product stage `opacity 0; visibility hidden` at `exit 220 ms`, **204 descendants unpainted**; statement enters `420 ms` opacity + `12 px` rise; `688.81×274.53`, `132 px` |

### 22.2 Target choreography — Scene B

**Home — attention → today → upcoming**

| Beat | Target | Trigger | Mechanism |
|---|---|---|---|
| `B01` | Home, device stage-right, `1.00`. `KEEP` | `MANUAL` | — |
| `B02` | **Juli's identity arrives from Scene A** as the account row | `MANUAL` → `shared 640` | `SHARED_ELEMENT` |
| `B03` | Education Física row `1.00` on `--home-brand-soft`; siblings `0.55`; heading `0.60` | `MANUAL` → `exposure 360` | **replaces the 1.02 scale** |
| `B04` | authorization row **pending** at `1.00` | `MANUAL` | data fix |
| `B05` | school task **pending** at `1.00` | `MANUAL` | data fix |
| `B06` | attention row `1.00` **with its tint intact**; chrome `0.55` | `MANUAL` → `exposure 360` | fixes the lost tint |
| **`B07`** | **THE MISSING BRIDGE**: Juli's rows → `0.35` in sequence, the other three enter at the same positions, re-present as Familia | `MANUAL` → **`AUTO` 1400 ms** | `SHARED_ELEMENT` |

**Planner — Tareas → Responsabilidades → Calendario → Planes. No fake tab resizing.**

| Beat | Target | Trigger | Mechanism |
|---|---|---|---|
| `B08` | Planner module identity legible | `MANUAL` | `REAL_NAV`; **KEEP the mechanism** |
| `B09` | pending tasks **and** responsibilities at `1.00` | `MANUAL` | data |
| `B10` | event rows **with times** at `1.00` | `MANUAL` → `AUTO` 320 ms (pill translate) | `REAL_NAV`; **`N-02` mechanism KEEP** |
| `B11` | the Plan anchor, held for Scene C | `MANUAL` | `REAL_NAV` |

**Family — do not mutate map layout.**

| Beat | Target | Trigger | Mechanism |
|---|---|---|---|
| `B12` | Familia, four members | `MANUAL` | list-integrity fix |
| **`B13`** | **THE MISSING BEAT**: the *consequence* first — the moved training event inside the device, in **Planner/Calendar semantics** (`N-35`: no standalone Horarios). Geography only after | `MANUAL` → `exposure 360` | `SHARED_ELEMENT` |
| **`B14`** | **THE MISSING BEAT**: both questions in sequence at `1.00` — *"'¿A qué hora termina?' → '¿Quién puede pasar a buscarlo?'"* The pivot from *when* to *who* is the point of Familia | `MANUAL` | `EDITORIAL` |
| **`B15`** | **MAP BEAT**: device `1.00 → 1.08` whole-device; map chrome **inside** the device `→ 0.40`; pin labels held at `1.00` | `MANUAL` → `spatial 500` + `exposure 360` | `DEVICE_TRANSITION` |
| `B16` | reverse of `B15` | `MANUAL` → `spatial 500` | `DEVICE_TRANSITION` |
| `B17` | family conversation, **explicitly editorial**, marked as such | `MANUAL` | `EDITORIAL`; **`N-36`** |
| `B18` | the message at `1.00`, shell `0.55` | `MANUAL` → `exposure 360` | `EDITORIAL` |
| **`B19`** | **THE MISSING BEAT**: the message acquires a visible position in a list — HomePlus-native | `MANUAL` | `EDITORIAL` |
| `B20` | product stage exits **as a block**; `#060404` holds | `MANUAL` → `exit 260` | `KEEP AS-IS` |

**S07 — DO NOT TOUCH conceptually. Entrance, hold, exit only:**

| Aspect | Verdict |
|---|---|
| **Entrance** | `S06_step05→S07_step00`: product block exit `220 ms` + veil fade `220 ms`. **`KEEP AS-IS`** (`B-P7`, `MASTER §2.4`) |
| **Hold** | `S07_step00` and `S07_step01` both measured **0 running animations**, geometry and text hashes stable at 0/10/30 s. **`KEEP`** |
| **Exit** | `S07_step01→S08_step00`: **KEEP the mechanism, REPLACE the missing bridge.** Today it is a 70-mover cross-mount (270 entering / 517 exiting). Target: the four `MASTER B7` callbacks converge, **then** out |
| **Typography** | ⛔ **NOT AUDITED AND NOT TO BE TOUCHED.** `N-05` is binding. `132 px`, two-tone `#F5F1EB` / `#C7A084`, `688.81×274.53`, 20.6 % of canvas, ~60 % of frame empty. **Reducing it would make the scene worse** |

### 22.3 S06 — the anti-pattern, and its replacement

**MEASURED (transition `S06_step00→01`), all of it layout mutation:**

| Element | Before | During | After |
|---|---|---|---|
| `.family-map-stage` client | `250×200` | **`1080×520`** | `250×200` |
| its `scrollWidth×scrollHeight` | `313×265` | **`1350×689`** | `313×265` |
| `.family-map-surface` | `250×200` | `1080×520` | `250×200` |
| `.map-place.map-school` | `92×32` | **`219×82`** | `92×32` |
| its label `font-size` | `15px` | **`41.04px`** | `15px` |
| `.map-place.map-club` | `166×82` | `240×121` | `166×82` |
| `.map-place-symbol` | `18×18` | `35×35` | `18×18` |
| `.family-map-glow` | `375×330` | **`1620×858`** | `375×330` |
| `.home-phone-position` opacity | `1.00` | **`0.12`** | `1.00` |
| `.presentation-canvas` scroll | `1280×720` | **`1450×789`** | `1280×720` |
| map aspect distortion | `0.75` | **`1.246` — the distortion REVERSES** | `0.75` |

Five distinct failures: **(i)** it removes the device, so the map is no longer a phone screen; **(ii)** it drops the product to `0.12`, so the product is a ghost behind its own map; **(iii)** it discards the device anatomy — no header, no `Familia｜Mapa｜Lugares` switch, no bottom nav — when `MASTER §6 B5` demands the *opposite* (*"zoom out y aparecen bordes/chrome del teléfono"*); **(iv)** it flips the map's own geometry between states, so the same map is a different shape in each; **(v)** it mutates the canvas's scroll geometry mid-flight, so the composition's containing block is not stable while the object moves.

**TARGET — camera, not mutation. Seven permitted levers, in this order:**

1. **Whole-device scale** `1.00 → 1.08` (declared safe-area breach). `+8 %` linear, `+17 %` area, **zero reflow, zero scroll, zero sibling movement** — the mechanism is already proven (`N-41`).
2. **Device movement** — stage-right anchor to stage-left anchor, `spatial 500 ms`, `transform` on the slot only.
3. **Editorial camera/framing** — the *stage* re-frames around a stable device: the device stays `300×620` while the composition moves. This is `MASTER §2.9`'s *"cambios entre pantallas lejanas pueden resolverse editorialmente moviendo dispositivos completos."*
4. **Selective exposure inside the device** — map chrome (`Mapa` title, the `Ubicaciones compartidas` caption, secondary labels) → `0.40`. Never grown.
5. **Shared-element extraction** — the `Entrenamiento +1 h` consequence is extracted from its Planner origin and lands here.
6. **Small non-reflow local emphasis** — `108–115 %` on **pin copy only**, `transform-origin: center`, no parent resize, no `scrollHeight` change, exactly reversible.
7. **Absolute prohibitions** — no `width`/`height` animation, no `font-size` animation, no `cqw`-driven type growth, no `100vw`/`100vh` surface, no scroll-geometry mutation, no clipping change, no disappearance of the phone anatomy.

**Map geography must remain illustrative.** `N-03` / `N-30`: show place · recency · presence/status · sharing state. **No ETA. No distance. No travel time. No global family location master switch.** The authored pin percentages (`.map-school 24 %/29 %`, `.map-club 69 %/49 %`, `.map-mom 23 %/75 %`, `.map-dad 82 %/79 %`, `.map-delay 70 %/16 %`) are **fabricated geography** (`B-13`) and must not be animated, emphasised, or pointed at. **They should not be pointed at at all.**

---
## 23. SCENES C / D / E MOTION AUDIT

**Content truth = Session 3 + Session 6. Not re-audited.**

### 23.1 Measured current motion

| | C — S08 | D — S09 | E — S10 |
|---|---|---|---|
| States | 5 | 5 | 5 |
| Spoken words | 113 | 145 | 142 |
| Duration @150 wpm | 45.2 s | 58.0 s | 56.8 s |
| Presses | 4 → **11.3 s each** | 4 → **14.5 s each** | 4 → **14.2 s each** |
| Device | `300×620 @250,50` `1.00` | `300×620 @250,50` `1.00` | **`324×669.6 @238,25` `1.08`** |
| Device position changes | `x 250 → 730` (step02→03) | none | `x 238 → 718` (step02→03) |
| Layout mutations | `S08_step03→04`: 8 | 0 | `S10_step03→04`: 5 |
| Font mutations | `S08_step03→04`: 4 | 0 | `S10_step03→04`: 2 |
| Canvas overflow | `1280×732` at step00/01/03/04 | none | none |
| Stage type | `68 px "¿Qué falta en casa?"` at step02 | `60 px "El dinero del hogar"` at all 5 | none |
| App-surface scroll | `282×602` in **all 5 S08 states** | `282×602` in all 5 | `282×602` in all 5 |

**The three devices do not resize in Scenes C–E.** Their internal geometry is `282×602` throughout. **The only Scene C/D emphasis vocabulary in the entire film is `opacity`.** Measured: no non-stage transform above `1.00` exists anywhere in S08 or S09.

### 23.2 The chain, and its honest transition family per link

```
Plan → [need] → restock → Finance fact → historical Finance movement → Asset → document → HomeCloud → memory
```

| Link | Same semantic object? | Real nav? | **TARGET FAMILY** | Why |
|---|---|---|---|---|
| Plan → `¿Qué falta?` | **yes** — the bridge task | no | `SHARED_ELEMENT` | `MASTER §7 C3`; `C-04` asked for it and got a 480 px slide |
| `¿Qué falta?` → Inventory | **yes** — the same need | **no** (`InventarioScreen.tsx` has 0 `navigate` calls) | `SHARED_ELEMENT` — extraction, not a slide | the extracted row keeps identity |
| Inventory → Restock Need | **yes** | **data-link only, invisible in the UI** | `EDITORIAL` | `N-06`: approved chain is `LOW/OUT → Restock Need PENDING → approval → Planner Task`. **⛔ No Shopping List** |
| Restock → Finance | ⛔ **NO — there is no purchase** | no | `EDITORIAL` | `N-32`: the `Supermercado $48.720` row is a **quiet ledger fact already present**, never the visible result of a purchase the audience just watched. `C-11/D-10` is `BLOCKER` |
| Finance → PS5 Asset | **yes — the movement row** | no (direction inverted in Figma only) | `SHARED_ELEMENT` — **extraction of the movement** | `D-09` is `BLOCKER`; **`N-37`: `Mar 2024 · $580.000` may appear ONLY as a Finance movement, never as an Asset field** |
| Asset detail → HomeCloud | **yes — the document** | **no** (`push('homecloud')` with no id) | `EDITORIAL` | `N-31`, `MASTER:237`. Approved editorial example in `MASTER:113-124` |
| HomeCloud Documentos → Recuerdos | **yes — the birthday** | no | `EDITORIAL` | `E-08`: wrong date, never opened |
| Warranty ↔ Memory | **yes — the thesis** | n/a | `EDITORIAL` + `exposure` | `E-04` `BLOCKER`: **no available state exists today** |

**Only `Plan → Task` and `Payment → Movement` are both real navigation and real data.** The second is intra-module. **Every other link in this chain is editorial, and must visibly read as editorial** (`N-33`).

### 23.3 Target choreography — Scenes C / D / E

| Beat | Anchor | Target | Trigger | Family |
|---|---|---|---|---|
| `C01` | L144–146 | Plan **with its Event**: date, **`19:00`**, owner | `MANUAL` | `SHARED_ELEMENT` — `N-23` binding |
| `C02` | L147–150 | the three canonical steps at `1.00` | `MANUAL` | `EDITORIAL` |
| `C03` | L155–157 | bridge task `1.00` on `--home-brand-soft`; siblings `0.55`; heading `0.60` — **`KEEP AS-IS`** | `MANUAL` | `EDITORIAL` |
| `C04` | L159–163 | question `1.00`; device context `0.55`; **bridge task still `1.00`** | `MANUAL` → `exposure 360` | fixes `C-03`'s inversion |
| **`C05`** | (the extraction) | **the bridge task is EXTRACTED; the Plan recedes to `0.35`; the row lands as the first Inventory line at the same width and type size** | `MANUAL` → **`AUTO` `shared 640`** | `SHARED_ELEMENT` — replaces the 480 px slide |
| `C06` | L165–167 | Inventory with the OUT row **visible** inside the device | `MANUAL` | fixes `C-01` `BLOCKER` |
| `C07` | L169–174 | the LOW/OUT row isolated `1.00` on brand-soft; others `0.45`; **zero geometry change, zero font change** | `MANUAL` → `exposure 360` | replaces `C-06`'s mutation |
| `D01` | L180–190 | Finance Resumen; **the stage title enters AFTER its line** | `MANUAL` | `REAL_NAV` — `D-08` composition **KEEP** |
| **`D02`** | L192–194 | **Nuevo movimiento open, account/card selector, scope switch** | `MANUAL` | **NEW STATE** — `D-03` `HIGH` |
| `D03` | L196–204 | Pagos with the household payments at `1.00` | `MANUAL` | replaces 2 text states |
| **`D04`** | L206–210 | **Límites at `1.00`** | `MANUAL` | **NEW STATE** — `D-06` |
| `D05` | L212–222 | Resumen → Análisis, both real | `MANUAL` | replaces 2 text states |
| **`D06`** | (silent) | **the `PlayStation 5 · Mar 2024 · $580.000` movement row is EXTRACTED and becomes the Asset identity** | `MANUAL` → **`AUTO` `shared 640`** | `SHARED_ELEMENT` — `D-09` `BLOCKER`, `N-37` |
| `E01` | L234–236 | Assets list, device `1.08` at the stage-left anchor | `MANUAL` | `EDITORIAL` — `N-41` **KEEP** |
| `E02` | L238–241 | Garantía isolated `1.00`; siblings `0.55` — **measured mechanism already correct** | `MANUAL` | `EDITORIAL`; `N-37` data |
| `E03` | L243–247 | Assets detail: identity / people / next / data & documents / history | `MANUAL` | `REAL_NAV` intra-Assets only (`N-13`) |
| **`E04`** | L249–251 | **the `Garantía PlayStation 5` document is EXTRACTED from Assets and lands as the same object in HomeCloud** — same y, same width, same type | `MANUAL` → **`AUTO` `shared 640`** | `SHARED_ELEMENT` — `E-10`; `MASTER E3` *"Assets baja; Documentos permanece"* |
| `E05` | L253–256 | HomeCloud Recuerdos with the birthday memory, correct date | `MANUAL` | `SHARED_ELEMENT`; `N-29` — audio approved, **no fake waveform** |
| **`E06`** | L263–266 | **THE MISSING STATE PAIR**: HomeCloud recognisable at low exposure behind; garantía at `0.55–0.60` one side; the birthday photo at `1.00` the other | `MANUAL` → `AUTO` `exposure 600` | **`E-04` `BLOCKER`. `MASTER E9`. ⛔ Never write "documentos vs recuerdos" — its absence is currently a positive and must stay one** |
| `E07` | L268–269 | **exposure-down first, then reset to absolute black** | `MANUAL` → `exposure 360` + `reset 520` | fixes `E-13` |

**Net for Scenes C/D/E: 15 → 20 states.** The increase comes entirely from three things Sessions 2–6 proved missing: the Restock beat, four real Finance surfaces, and the two-state warranty/memory composition. **The four narration-on-screen states in Scene D are deleted, not moved.**

### 23.4 Prohibitions specific to Scenes C/D/E

⛔ **No `width`/`height`/`font-size` animation** — measured 13 violations across 4 transitions.
⛔ **No 480 px device slide where a shared object exists** — `C-04`, `E-10`.
⛔ **No `Shopping List` surface or teaser implying one** — `N-06`; the approved chain is Restock Need.
⛔ **No implied automatic Shopping→Finance pipeline** — `N-32`.
⛔ **No money, date or maintenance field on an Asset** — `N-37`.
⛔ **No ETA / distance / travel time** — `N-30`.
⛔ **No fake waveform** — `HC_V2:334` via `N-29`.
⛔ **No gradient photo stand-ins** — `E-05`, forbidden by the product freeze.

---

## 24. SCENE F MOTION AUDIT

**Content defect = Session 4 (`F-01` is `BLOCKER`). Content NOT redesigned here. This section is stagecraft only.**

### 24.1 Measured current motion

| | |
|---|---|
| States | 3 |
| Painted content elements | **8 · 7 · 8** — the entire scene |
| DOM nodes total | **8** at `S11_step00` |
| Device | **none**, in all 3 states |
| Thesis line | `.s11-statement` **120 px**, `783.02×249.59`, w600, `line-height 1.04`, `letter-spacing -0.03em` — **`F-P2` KEEP, strongest typography in the block** |
| Resolution line | `.s11-resolution` **56 px**, `549.14×67.19` |
| Transitions | `step00→01` **1** animator; `step01→02` **1** animator; entry from S10 **0** animators |
| Spoken words / duration | 74 / **29.6 s** → 2 presses = **14.8 s each** |

**`F-P3` is a genuine positive and it constrains the target: the scene is honest about its own emptiness — no glow, no network lines, no iconography, no invented objects. `F-P5`: fully state-driven and reversible, 0/85 forward-vs-backward visible differences. Use this scene as the TEMPLATE for the rebuilt one, not as the thing to fill.**

### 24.2 Target stagecraft — what stays fixed, what moves, how many

| Beat | Anchor | Target | Fixed | Moves | Count |
|---|---|---|---|---|---|
| `F01` | L275–283 | six **concrete** household situations | one at a time at `1.00` | the rest at `0.55` | **1 at a time** |
| `F02` | L285–292 | the six **abstractions** enter at `0.55`, then **a few relations** | the six abstractions | **at most 3 relations, as thin links at `0.55–0.65`** | **≤ 3** |
| `F03` | L294 | abstractions resolve back into the everyday objects at `1.00` | the frame | opacity only | **1** |
| `F04` | L296 | the 120 px thesis alone | the field empty | `enter 320` | **1** |
| `F05` | L298 | **the product**, not a second line of type | the field | the device enters | **1** |

**Explicit counts, because this is the scene where they matter most:**

| | |
|---|---|
| **How many connections appear at once** | **Maximum 3.** `MASTER §6 F3` lists six frozen relations; **six at once is a spiderweb, and a spiderweb is the named failure mode.** Three is the motion budget |
| **What disappears** | the six abstractions, after `F03`. They exist only to be resolved |
| **What survives into Scene G** | **the product** — `F05` replaces the 56 px resolution line. `F-05` (`HIGH`): *"Scene F ends on text, so there is no shared element to hand to Scene G"* |
| **What stays fixed throughout** | the empty frame. No glow, no grid, no background object. **`F-P3` KEEP** |

**Forbidden in Scene F, explicitly:** spiderweb · ERD · giant network diagram · everything moving at once · any invented object · any glow.

**The black entry (`F02`, `HIGH`):** keep the black hold, but **establish it with the scene-entry transition rather than with a dedicated press** (`MASTER §2.10` — no more than one manual trigger per microsequence; scenes must tolerate ±0.5–1 s of oral variation). The thesis line then lands as an `AUTO` beat 400–600 ms after the convergence settles, **so it lands on the last word rather than on the press** (Session 4's own prescription).

---

## 25. SCENE G MOTION AUDIT

**Narrative defects = Session 4 (`G-01`, `G-02`, `G-03`, `G-04`, `G-05`, `G-12`, `G-15` — seven BLOCKERs). Content NOT redesigned here. This section solves the motion language.**

### 25.1 The measured problem, stated as one sentence

> **A frontend/backend explanation with no frontend and no backend.**

**MEASURED:** `deviceCount = 0` in **all 7 states** of Scene G. `app surface = none` in all 7. `S13_step00` is a byte-identical remount of `S12_step02`. `S13_step03 → S14_step00` re-mounts the entire stack — **0 animating elements, 88 entering / 57 exiting** — and because it is a fresh mount the whole entrance animation replays **at echo opacity 1.00** (measured `.s13-stage` and both `.s13-panel` at effective `1.00`), with **visible text byte-identical to `S13_step03`**. Session 4: *"the most damaging motion in the block."*

**The five backend verbs `RECIBE / VALIDA / RELACIONA / GUARDA / DEVUELVE` appear ZERO times in `src/`.** The one concrete transaction (`$48.720`) does not exist. There is no recomposition into "una sola experiencia".

### 25.2 Target motion language — the questions asked, answered

| Question | Answer |
|---|---|
| **How does the product stay on stage?** | It **enters at `G01` and never leaves.** MEASURED today: it is never there. `MASTER §11 G0` *"Teléfono HomePlus centrado"* and `NO-UI §13 G00` *"Phone central. Sin movimiento mientras Benja introduce."* are both explicit |
| **How does "frontend" emerge from the real UI?** | `G01` moves the device to the left third and then runs **three `AUTO` local-focus steps: screen `108 %` → button `115 %` → nav `110 %` → `100 %`.** Real elements of the real UI, at the §11 range, non-reflow. **`G-03` is `BLOCKER` because `pantallas, botones, menús, información` currently have zero evidence** |
| **How does "backend" appear spatially behind it?** | `G02`: a backend plane emerges **from behind** the device. It is not a second card — the current `.s12-panel` pair is two visually identical 460 px cards (`G-16`), so frontend and backend are not even distinguishable today |
| **How do backend verbs run as one atomic sequence?** | `G03`: `RECIBE → VALIDA → RELACIONA → GUARDA → DEVUELVE`, **one active at a time**, ~220 ms each, hierarchy by active state, 26–32 px, **hold ~600 ms on `RELACIONA` with `Persona` + `Hogar` chips**. **One `MANUAL` press launches the whole chain** |
| **How does the concrete transaction travel?** | `G04`: **one `AUTO` sequence ≤ 1400 ms** — the amount enters the frontend, scales down, crosses **behind** the device frame, reappears backend-side, `RECIBE` → `VALIDA ✓` → `RELACIONA` → `GUARDA` → `DEVUELVE` → the response returns → **hold ~400 ms on "movimiento guardado"** |
| **When do logos appear?** | **Only as they are named.** `G-02` is `BLOCKER` because all five vendor logos are on stage before the speaker names a single technology. Target: `G05` React Native then Expo, 100–150 ms apart, **no colour crossfade** (`G-13`: the mono→brand crossfade carries no information — `G-P4` **KEEP the two-variant mechanism, drop the crossfade**); `G06` Node → Supabase → PostgreSQL; `G07` **Figma alone, attached to the frontend** |
| **How does Figma attach without becoming a logo-wall node?** | `G07`: Figma sits **beside the frontend**, not on the centreline. MEASURED today: `.s13-center` is a 140 px column with Figma at top `12 %` and IA at bottom `12 %`, i.e. **on the centreline between the two cards** — which encodes a false architecture (`G-10`). **The 140 px centre column and the `.s12-bridge`/`.s13-bridge` line must go** (`G-07`: the line survives into S14 as a meaningless mark and forms a `+` with the barrier line) |
| **How does the system recompose into ONE experience?** | `G09`: **one `AUTO` 1200 ms** — the backend plane retreats, RN/Expo converge, Figma dissolves, IA integrates, the device returns to centre and grows slightly. `G-15` is `BLOCKER`: this argument does not exist today |

### 25.3 `G-12` constraint — binding

**`G-12` is CANONICALLY ACTIVE.** `N-14` verified `0` AI providers, `0` AI routes, `0` AI edge functions, `0` AI env config, `0` current Homi implementation.

> **⛔ DO NOT PRESCRIBE AI ANIMATION WHILE `G-12` IS ACTIVE.**

`G08` is therefore: **IA as plain type plus a role caption. No glyph. No glow.** `G-P2` **KEEP** — no AI provider logo is shown today, and that restraint must be extended, not relaxed. `SI-11` (the present-tense script claim at L320) is a SCRIPT ISSUE with a named owner; Session 7 does not resolve it and does not let it block the choreography.

### 25.4 `S13 → S14` — ELIMINATED IN TARGET

**MEASURED current:** 0 animating elements · 88 entering · 57 exiting · `canvas 1280×720 → 1280×732` · the full stack painted at `1.00` · visible text byte-identical to `S13_step03`.

**Target — one of two, never a rebuild:**

| Option | Behaviour | Trade-off |
|---|---|---|
| **A (preferred)** | The stack **persists** across the boundary and only changes exposure. `S14` re-uses the mounted composition and dims it. | Requires the composition to be a stable, addressable thing — the honest fix |
| **B** | The stack **unmounts** and `S14` **starts from the device alone** | Simpler; loses the "this is what you were just looking at" beat |

> **In both cases the rule is identical: the echo is a DIMMING of an existing composition, never a REBUILD of it.**

**And `G09` solves a second problem:** the recomposition beat means Scene G ends on **one product**, so Scene H can inherit it directly — `H01` — instead of remounting anything.

---

## 26. SCENE H MOTION AUDIT

### 26.1 The distinction the motion must make

> **The target idea is: interfaces have *interaction cost* — not: HomePlus is badly designed.**

**MEASURED:** the scene cannot make that distinction, because **there is no interface** (`H-01`, `BLOCKER`). The friction cannot be shown when there is nothing to be frictioned against. And what *is* on stage is the **technical stack as background** — measured `.s13-stage` and `.s13-panel` at effective `1.00` at `S14_step00` — which is the visual inverse of the thesis (`H-12`, `HIGH`).

### 26.2 Measured current motion and exposure

| State | `.s14-echo` | `.s14-routes` | `.s14-route` | barrier | what moves |
|---|---|---|---|---|---|
| `S14_step00` | **`1.00`** (re-mounted S13) | `1.00` | — | — | **0 animating · 88 entering / 57 exiting** |
| `S14_step01` | `0.35` | `1.00` | `1 × 557.84×50.8` | — | 2 animating |
| `S14_step02` | `0.22` | `1.00` | `2 × 557.84 / 739.39` | — | 3 animating |
| `S14_step03` | **`0.12`** | `0.50` | `2 × 0.5` | full, `2×320` | 4 animating |
| `S14_step04` | gone | **`0.50` residue** | gone | gone | **3 concurrent** |

**Session 4's verdict on the curve: *"inverts `MASTER §12 H0`: maximum presence at the entry, minimum at the thesis."*** Target: `100 % → 75 %` → routes → **`100 %` on the clean device** → `40 %` prelude → black.

**Three measured text-on-text collisions** — the visual-load half of `H-02`'s root cause (`H-05`, `BLOCKER`):

| # | Overlapping pair | Overlap |
|---|---|---|
| 1 | `+` pill `x 873–975.66, y 295.2–346.0` × `Node.js` caption `x 873–975.66, y 324.2–385.79` | **102.66 × 21.8 px** |
| 2 | `Documentos` pill `x 825.63–1009.69, y 374.0–424.8` × `Supabase` caption `x 873–993.86, y 405.8–466.8` | **120.86 × 19.0 px** |
| 3 | `Home` pill row 2 `x 270.3–382.3, y 374.0–424.8` × `React Native` caption `x 173–332.56, y 365.61–427.2` | **62.26 × 50.8 px** |

**Collision 1 is already present at `S14_step01`.**

### 26.3 Product-safe route representation

| | |
|---|---|
| **Real, product-safe components** | `Plan → Task` is real in both targets. `Payment → Movement` is real (intra-Finance). `Home → Assets → PS5 → Documentos` is **not** real (`N-13`). `Home → Planner → Tareas` is real; the current route **mislabels two of its four nodes** (`H-03`) |
| **Editorial route representation** | the warranty route, using **real nodes only**, explicitly marked as editorial. **No invented warranty node** (`H-02`, `BLOCKER`) |
| **⛔ Text pills — forbidden.** | `H-05` is a `BLOCKER` and the pill styling is the direct cause of three measured text collisions |
| **⛔ No fake taps.** `MASTER:34` — *"No se deben fingir navegaciones o features inexistentes."* |
| **Route arrows** | `H-08`: the `→` glyphs are static and motion conveys no depth. If routes remain editorial, the nodes should **accumulate left-to-right with a 60–100 ms stagger** so the chain reads as a sequence. If they become real components, the stagger is unnecessary — **the simultaneity is the point** (`H-P3` **KEEP the rhythm**) |
| **The barrier line** | `H-11` (`MEDIUM`): an implementation invention with no script referent. MEASURED: at `S14_step03` it sits at `left 50 %`, which is **the gap between the echo's Frontend and Backend cards** — it invites a front/back reading, *"the opposite of what the scene is about."* **Remove it.** |

### 26.4 Target choreography — Scene H

| Beat | Anchor | Target | Trigger | Mechanism |
|---|---|---|---|---|
| **`H01`** | L330–331 | **the recomposed device from `G09`, at `1.00`, alone.** ⛔ **The stack must NOT be re-mounted** | `MANUAL` | `DEVICE_TRANSITION` |
| `H02` | L333–334 | device `0.75`; **one real task route at `1.00`, built from product-safe components** | `MANUAL` | `REAL_NAV` |
| `H03` | L335–336 | device `0.75`; the warranty route, **editorial, real nodes only** | `MANUAL` | `EDITORIAL` |
| **`H04`** | L338–339 | **EVERYTHING clears. ONE clean product state at `1.00` with nothing around it.** | `MANUAL` → **`AUTO` `exposure 360` + `spatial 500`** | **`MASTER §12 H3`, verbatim. `H-04` is `BLOCKER` and this state DOES NOT EXIST** |
| **`H05`** | L341 | **ABSOLUTE BLACK, held while the speaker speaks the prelude** | `MANUAL` → `reset 520` + **`HOLD`** | `H-07` `HIGH`: *"the silence on the key question has no mechanism"* |
| `H06` | L343 | the question alone, on a **separate press** | `MANUAL` → `enter 320` | `H-P1` **KEEP** · `H-P2` **KEEP the two-line break** |
| `H07` | (registry) | ⛔ **NO shared element between the barrier question and the Homi name** — see `07_SHARED_ELEMENT_REGISTRY.md` SE-15 | `MANUAL` → `reset 520` | `EDITORIAL` |

**⛔ No technical-stack residue before the absolving line.** `H04` is that guarantee, as a state.

**Typography deviation, recorded not re-decided:** `H-10` (`MEDIUM`) — the question is `112 px` + `68 px` against a frozen `88–96 px`. `H-P2` **KEEP the two-line structure and the large setting**; the exact size is a copy decision with an owner.

---

## 27. SCENE I MOTION AUDIT

**Product existence NOT re-audited. `N-21` applies: Homi is a concept / intended capability, not verified current implementation.**

### 27.1 Measured current motion — the 14-state constant device

| | MEASURED |
|---|---|
| States | **14** (S15 5 · S16 5 · S17 4) across 3 slides |
| Spoken words | **309** (48 lines) |
| Duration @150 wpm | **123.6 s ≈ 2 min 04 s** |
| Device box | **`718,25,324,670` — identical in all 14** |
| Device transform | **`matrix(1.08,…)` — identical in all 14** |
| `deviceCount` | **1 in all 14** |
| Internal geometry | `282×602` in all 14 |
| Stage-side type | `.s15-title` **110 px** at effective **1.00 in all 5 S15 states** · `.s16-idea` **56 px** at **1.00 in all 5 S16 states** · `.s17-line` **54 px** → `0.4`, `.s17-resolution` **84 px** → `1.0` |
| Layout mutation | `S17_step00→01`: `.homi-decision-row` `scrollHeight 64 → 54` |
| Question bubble | **box `777,187,238,81`, byte-identical across Juli / Tomi / Papá** — **KEEP AS-IS**, confirmed at runtime |
| Scene boundaries | `S14→S15`, `S15→S16`, `S16→S17`: **0 transition animations.** Hard cuts. `I-24` (`MEDIUM`) |

**`I-21` (`HIGH`), restated in Session 7's own words: 14 states, 3 scenes, 2 minutes 4 seconds, and the device never moves, never resizes, never changes surface.** The 1.08 scale itself is **correct** (`N-41`); the absence of the three **frozen** `MASTER §2.9` device directions is the defect.

### 27.2 The three frozen Homi directions — all currently unimplemented

`MASTER §2.9`, verbatim:

| # | Frozen direction | Current state | Target beat |
|---|---|---|---|
| **1** | *"el teléfono auxiliar de Planner: entra desde un lateral, recibe la task y vuelve a salir"* | ⛔ `phoneCount = 1` | **`I06`** — `AUTO` 1400 ms |
| **2** | *"respuestas Juli/Tomi: salen desde detrás del teléfono central hacia izquierda/derecha"* | ⛔ `phoneCount = 1` | **`I09`** — `AUTO` 500 ms, laterals emerge from behind |
| **3** | *"cambio entre Homi y UI visual en Control Humano: el dispositivo actual sale hacia arriba; siguiente entra desde abajo"* | ⛔ `phoneCount = 1`; the device **is** the Homi chat in all 4 S17 states (`I-05`, `BLOCKER`) | **`I13`** — out UP, in BELOW |

**Direction 3 is the one that proves the thesis.** `MASTER §11 I` and the script both say: *"no significa reemplazar toda la aplicación por un chat… Son dos formas de interactuar con el mismo sistema."* Today the screen shows a chat and claims the interface is better. **The motion must show the interface.**

### 27.3 Target choreography — Scene I

| Beat | Anchor | Target | Trigger | Mechanism |
|---|---|---|---|---|
| **`I01`** | L349 | **absolute black → the name `Homi` ALONE** | `MANUAL` → `reset 520` + **`AUTO` `hero 880`** | `hero` curve. **No glow, no aura** (`NO-UI §5`) |
| `I02` | L351–353 | device enters; **wordmark settles to `0.40` as a quiet label** | `MANUAL` → `AUTO` `spatial 500` + `exposure 360` | MEASURED today: `1.00` in all 5 states |
| `I03` | L353–355 | the request bubble at `1.00` | `MANUAL` → `enter 320` | Session 5 positive #3 **KEEP** |
| `I04` | L356–358 | the structured proposal at `1.00`; request at `0.70` | `MANUAL` → `enter 320` | positive #9 **KEEP** (future tense) |
| `I05` | L358 | the decision control **with both actions** | `MANUAL` | `I-19`: add `Cancelar` |
| **`I06`** | L360–365 | **EXECUTION.** `AUTO`: the auxiliary Planner device enters **from a side**, the task detaches, it lands in Planner. **`HOLD WITHOUT CONFIRMING`** | `MANUAL` → **`AUTO` 1400 ms** | **`NO-UI §4`'s own worked example, quoted.** `I-02`/`I-04` `BLOCKER` |
| `I07` | L369–371 | **interaction-mode change**: the same question enters; **⛔ no titular** | `MANUAL` | `I-09` `HIGH`: `MASTER §2.3` does not approve *"La misma pregunta. / Distinto contexto."* |
| `I08` | L373–375 | the identical question bubble; first answer | `MANUAL` → `enter 320` | positive #4 **KEEP AS-IS** |
| **`I09`** | L385–391 | **PERSONA COMPARISON — three devices.** Centre + two emerging from behind. **The question extracted ABOVE at `56 px`; the three answers at native scale inside the devices** | `MANUAL` → **`AUTO` `spatial 500`**, staggered 120 ms | `I-10` `HIGH` |
| `I10` | L393–397 | the comparison holds; the third answer legible | `MANUAL` | data fixes (`I-11`, `I-12`) |
| **`I11`** | L399–407 | **FINANCE GROUNDING.** The real Finance surface enters as a second device; Homi answers from it using the **`N-22`** canon dataset | `MANUAL` | `I-06` `BLOCKER` — **15 spoken lines with zero visual support** |
| `I12` | L415–421 | context grounding at `0.55`, answer at `1.00` | `MANUAL` → `exposure 360` | `I-13`: ⛔ remove *"Basado en tu contexto"* |
| **`I13`** | L425–429 | **current device exits UP; the visual HomePlus surface enters from BELOW. Both visible** | `MANUAL` → **`AUTO` `spatial 500` out + `500` in** | `MASTER §2.9` **direction 3**. `I-05` `BLOCKER` |
| `I14` | L431–435 | the decision row with **both** actions at `1.00`; the rest at `0.20` | `MANUAL` → `exposure 360` | **no reflow.** Measured `scrollHeight 64 → 54` today |
| `I15` | L437–440 | **one** line; the previous line **exits** rather than lingering at `0.40` | `MANUAL` → `exposure 360` | `I-20` `MEDIUM` |
| **`I16`** | (the decision is NOT taken) | **`HOLD` WITHOUT CONFIRMING. No mutation state exists. Then reset to absolute black** | `MANUAL` → `exposure 360` + `reset 520` | **`I-04` `BLOCKER`. MEASURED today: `.homi-done` enters at `1.00` while the stage says "La decisión es nuestra" — the frame contradicts itself** |
| `I17` | L442 marker | absolute black | `MANUAL` → `reset 520` | one continuous breath into Scene J |

### 27.4 Homi multi-device moment — projection feasibility

**§10.4 already verified the arithmetic. Session 5 reached it independently. Both agree:**

```
1184 px usable  −  972 px (3 × 324 at 1.08)  =  212 px  →  106 px per gap
```

**Projection check.** MEASURED app type inside a 1.08 device: `19–20 px` for bubbles and answers, `26 px` for the module title. At 1.08 → `20.5–21.6 px` and `28.1 px`. At 1920×1080 (`scale 1.5`) → **`30.8–32.4 px` and `42.1 px`** — comfortably above `NO-UI §5`'s `20 px` floor for audience-read content. **Readable. Do not shrink.**

**Mitigation that avoids the headline problem entirely:** the shared question is **extracted above the row at `56 px`** (→ `84 px` projected), and the three answers stay at native scale inside their own devices. **No rhetorical headline** (`I-09`) and **no device scaling** (`I-10`).

**Three devices is the maximum. It is used once.**

---

## 28. SCENE J MOTION AUDIT

**Content target = Session 5. `J-01` is `BLOCKER`.**

### 28.1 Measured current motion — the worst pacing ratio in the film

| | MEASURED |
|---|---|
| States | **4** |
| Painted content elements | **4 · 7 · 20 · 21** |
| DOM | 21 nodes total at the end |
| Spoken words | **207** (35 lines) across two speakers |
| Duration @150 wpm | **82.8 s** |
| Presses | 3 → **27.6 s each.** Per-block: Gaby 24.5 s on 2 states; Colo 61.6 s on 2 states = **30.8 s per state** |
| Motion | `s18-veil-in` 220 ms · brand 420 ms + `scale 0.96→1` · team stagger 90 ms × 4 = 270 ms · thanks 420 ms + 12 px rise |
| Type | logo `120 px` · wordmark `64 px` · avatars `24 px` · names `22 px` · `Muchas gracias.` `76 px` |
| Holes | `.s18-team` `scrollHeight 113 → 103` — the team row reflows while entering |

**`S18Closing/index.tsx` is 32 lines of JSX.** `J-01` (`BLOCKER`): *"The entire closing argument is absent — 28 lines / 154 words / 61.6 s resolve to 2 states."*

### 28.2 Target choreography — Scene J

| Beat | Anchor | Target | Trigger | Mechanism |
|---|---|---|---|---|
| **`J01`** | Gaby's whole block | **absolute black, held for all 24.5 s** | `MANUAL` → `reset 520` + **`HOLD`** | `J-02` `HIGH`. MEASURED today: only 220 ms |
| `J02` | L462–465 | **the physical objects return** — `bolsa` / `factura` / `heladera`, much air | `MANUAL` → `enter 320`, 120 ms stagger | `SHARED_ELEMENT`. **`N-25` — from the set the opening established** |
| `J03` | L467 | the house outline draws; the objects shrink `100 → 90` | `MANUAL` → `draw 700–900 ms` | `J-05` |
| `J04` | L470 | **Juli, Tomi, Mamá, Papá inside the house. From here on THEY DO NOT MOVE.** | `MANUAL` → `enter 320`, 70 ms stagger | `J-05`. **This is the constant the technology recedes from** |
| `J05` | L472–474 | **invisible-work ghosts** — the old household message, *"¿Quién me busca hoy?"*, *"Nos fijamos quién hacía qué"* — at `0.25–0.35` | `MANUAL` → `enter 320`, 120 ms stagger | `J-06`. **`MASTER §2.5` mandatory objects. Their absence in Scene A (`A-03`) is why they cannot appear here** |
| `J06` | (the ghosts are the cost) | **`AUTO`**: dashed lines 300 → micro hold 400 → ghosts fade to 0, 400 | `MANUAL` → **`AUTO` 1100 ms** | `SHARED_ELEMENT` |
| `J07` | L476–488 | **TOTAL QUIETUD.** One thin 2 px `#E7643F` line below the family, 300 ms. No logo, no phone, nothing else moves | `MANUAL` → `enter 320` | `J-07`. **`N-24`** |
| **`J08`** | L481–487 | **FIVE separate `MANUAL` triggers, one per word**: `gastos`→amount · `tareas`→check · `horarios`→time block · `información`→document · `responsabilidades`→person. **24–32 px, around the family, never giant words** | `MANUAL` ×5 → `enter 320` | `J-08`. **The only place in the closing with granular timing control** |
| `J09` | L488 | the five order themselves 300 → move to the periphery 400. **The family stays centre** | `MANUAL` → `spatial 500` | `J-09` |
| `J10` | (phone geometry is born FROM the organisation) | the peripheral elements form phone geometry | `MANUAL` → `spatial 500` | `J-09` |
| **`J11`** | L491 | **`AUTO`**: frame completes 300 → `scale 100 → 82 %` 550 `ease-in-out` → `opacity 100 → 0` 550 `ease-in` → the organisation and the line disappear. **⛔ THE HOUSE AND FAMILY DO NOT MOVE** | `MANUAL` → **`AUTO` 1400 ms** | **`J-09`. KEY INVARIANT: the technology recedes; life does not** |
| `J12` | L493–495 | **`AUTO`**: white flash 110 → thin photo frame 300 → **hold ~800 ms. ⛔ NO TEXT** | `MANUAL` → **`AUTO` 1210 ms** | `J-10`. The living moment must breathe |
| `J13` | (fade) | fade to absolute black | `MANUAL` → `reset 520` | closing silence |
| `J14` | L497 | **end card, three presses, unchanged** — brand → team → `Muchas gracias.` | `MANUAL` ×3 | **`J-12` POSITIVE `KEEP AS-IS`** |

### 28.3 The invariant, stated as a testable rule

> **THE HOUSE AND THE FAMILY DO NOT MOVE DURING `J11`.**
> **THE TECHNOLOGY RECEDES. LIFE DOES NOT.**

**Verifiable:** during the 1400 ms of `J11`, the family group's geometry signature must be **byte-identical**. Only the phone-geometry group, the organisation elements and the orange line change. Session 8 must add this as an automated check, because it is the film's thesis and it is currently testable in exactly one way: it does not exist yet.

### 28.4 The `J-16` script marker — recorded, not resolved

`[aca deberia haber una screen negra que aparece hasta que el colo termine de hablar]` at L442, **while Benja is the active speaker** — the condition can never be satisfied (`J-16`, `SCRIPT ISSUE`, owner = script owner). **Session 7 does not resolve the wording.** It specifies the **state** the marker describes, because the motion requirement is independent of who says it: the black must hold for the whole of the first closing block. **Either the marker is corrected or the choreography follows the speaker who actually talks.** `N-44`: the audit does not rewrite the script.

---

## 29. SHARED-ELEMENT AUDIT

Full registry: **`audit/07_SHARED_ELEMENT_REGISTRY.md`** — 15 candidates, 12 qualify, 1 correctly preserved today, 1 explicitly rejected, 1 blocked by a build decision.

### 29.1 Headline

> **Zero of the twelve qualifying shared elements currently survive a scene or module boundary.**
> **84 transitions. 0 shared elements.**
> **Measured proof of the two that should be extractions:** `S08_step02→03` — slot `translateX 0 → 480` in ~540 ms + a 320 ms crossfade, while **every plan-step opacity stays at `1`** — the bridge task receives no treatment whatsoever. `S10_step02→03` — slot `x 238 → 718` in ~700 ms + a 320 ms crossfade, with **both document rows present in both layers as separate DOM instances** at `y 202.4 / 288.9 → 210.2 / 297.2`, a `+7.8 px` offset that makes even a naive same-row read fail.

### 29.2 What Session 3 and Session 7 independently concluded

Session 3, from the narrative side: *"Every boundary in this session is a `DEVICE_TRANSITION` where the master asked for a `SHARED_ELEMENT`. That is the whole failure in one sentence."*
Session 7, from the motion side, with per-frame measurement: **the same sentence, now with numbers.**

### 29.3 The `shared` token is missing from the deck

`NO-UI §6` freezes `shared transform: 520–760 ms`. **No token in the deck occupies that band.** The two transitions that need it most use `500 ms` (spatial wipe) — *below the floor* — plus a `320 ms` crossfade that carries no object. **The deck has no way to move one object from one place to another and keep it the same object.**

### 29.4 Forced-continuity trap, explicitly rejected

Registry entry **SE-15**: the `S14` barrier question and the `S15` Homi name are adjacent and they answer each other — and they are **different semantic objects**. Forcing a shared element would be exactly the *"versiones parecidas"* that `MASTER:140` forbids. **The honest transition is a black reset followed by the name alone.** Recorded as a negative so Session 8 does not "helpfully" connect them.

---

## 30. DEVICE-TRANSITION AUDIT

### 30.1 Where a `DEVICE_TRANSITION` is correct

`NO-UI §8`: *"Sale un teléfono; entra otro."* Valid only when surfaces are **far apart in real navigation** (`NO-UI §7`: *"Si las surfaces están lejos: DEVICE TRANSITION"*).

| Target | Reason | Family |
|---|---|---|
| `H01` — Scene G's recomposed device enters Scene H | a new chapter, same device | `DEVICE_TRANSITION` |
| `I02` — the Homi device enters after the name reveal | the name must be seen alone first | `DEVICE_TRANSITION` |
| `I13` — current device exits UP, visual surface enters from BELOW | **`MASTER §2.9` frozen direction 3** | `DEVICE_TRANSITION` |
| `I09` — three devices, laterals from behind | **`MASTER §2.9` frozen direction 2** | `DEVICE_TRANSITION` |
| `B15`/`B16` — the map beat reframes the device | the role changes; geography is far from the member list | `DEVICE_TRANSITION` |

### 30.2 Where it is currently used and should not be

| Current use | Measured | Verdict |
|---|---|---|
| `S08_step02→03` | 480 px slide, 88 concurrent movers, every step opacity `1` | ❌ should be `SHARED_ELEMENT` |
| `S10_step02→03` | 480 px slide, 44 concurrent movers, two DOM instances per document | ❌ should be `SHARED_ELEMENT` |
| `S08_step04→S09_step00` | cross-mount + 16 px settle, no extraction | ❌ should be `SHARED_ELEMENT` |
| `S09_step04→S10_step00` | cross-mount, 0 animating, 172 entering | ❌ should be `SHARED_ELEMENT` |

**Rule:** a `DEVICE_TRANSITION` is honest **only** when no semantic object crosses. If an object crosses, it is a `SHARED_ELEMENT`, and the device must not move — because a moving device tells the audience "we navigated", which is a claim the product does not support.

### 30.3 The internal-motion / device-motion separation

MEASURED today, at four boundaries, device motion and content fade run **simultaneously**:

| Boundary | Device | Content |
|---|---|---|
| `S03_step00→S04_step00` | visual box `288×595.2 @572.8,70.4 → 295.94×611.61 @570.95,56.9` | 145 elements repositioned |
| `S09_step04→S10_step00` | slot `300×620 → 324×670`, transform `identity → matrix(1.08,…)`, position `250,50 → 238,25`, **already at final scale at the first post-press sample** | 172 entering / 114 exiting |
| `S10_step02→S10_step03` | slot `x 238 → 718` | 320 ms crossfade |
| `S14_step04→S15_step00` | device absent → arrives `718,25`, `324×669.6` | scene fade |

**The `S09→S10` and `S14→S15` arrivals are position + transform interpolations with opacity running `0 → 0.698 → 0.952 → 0.998 → settled`.** The device does not scale up from nothing; it is already at final scale at the first sample. **That is correct as a mechanism but it is unlabelled:** the audience cannot tell that the device arrived from a chapter boundary rather than from a slide.

**Target rule (§10.3):** device motion and internal content motion must be **separable**. Where both occur, the device settles first, then the content arrives. Where the device moves, its contents must be static.

---

## 31. EDITORIAL-TRANSITION AUDIT

**57 of 111 target beats are `EDITORIAL`** — the largest family, and correctly so: most of this film's ideas are conceptual.

### 31.1 What makes an editorial transition *honest* rather than fake

`MASTER §2.4`: *"Si la relación es conceptual o la integración no existe todavía, se usa una transición editorial evidente, nunca un tap falso."*

Three tests, all required:

| # | Test | Current compliance |
|---|---|---|
| 1 | **It does not imitate a tap.** No finger, no cursor, no ripple, no press feedback, no arrow that reads as "go here" | ⚠ `S14` uses `→` glyphs between text pills, which reads exactly like a navigation affordance |
| 2 | **It is visibly a construction.** A shared element being *extracted*, a device *reframing*, a plane *emerging from behind* — all read as editing | ✅ the 640 ms and 500 ms spatial moves read as construction |
| 3 | **The device never moves as if it navigated.** A moving device says "we went somewhere" | ❌ four boundaries violate this (§30.2) |

### 31.2 The family, with its semantics

| Sub-kind | Meaning | Count | Example |
|---|---|---|---|
| **BLACK RESET** | the frame empties and holds | 7 states | founding question · `S07` · `S18` |
| **CLEAR TO HOLD** | everything leaves, one subject remains | 6 beats | `A07` · `H04` · `F03` |
| **SELECTIVE CONTINUITY** | one declared object survives a boundary | 12 beats | `A10` · `E04` |
| **EDITORIAL REFRAME** | the stage re-frames around a stable device | 8 beats | `B15` · `H01` · `I13` |
| **EXPOSURE HAND-OFF** | attention transfers, nothing moves | 14 beats | `B03` · `E06` · `C07` |
| **ACCUMULATION / DECAY** | a field builds or clears | 8 beats | `A05` · `A06` · `A07` |

### 31.3 ⛔ Editorial prohibitions

- **No text-pill fake UI** (`H-05` `BLOCKER`) — three measured text-on-text collisions prove it.
- **No arrow that reads as a route** unless every node is real.
- **No "6 APPS / 1 FAMILIA / 0 COORDINACIÓN"** — a slogan, not a stage state (`A-03` `BLOCKER`).
- **No giant explanatory headline.** `MASTER §2.3` authorises exactly six pieces of visible text in the whole film.
- **No brand third-party logos pre-reveal** (`MASTER §2.1`).
- **No cross-mount that is not a black reset.** Every other boundary must preserve the outgoing composition and change its exposure.

---

## 32. REAL-NAVIGATION AUDIT

**13 of 111 target beats are `REAL_NAV`.**

### 32.1 What is real, verified

`06_FIGMA_VS_INTEGRATION.md §19.1` — only **two** relations are both real navigation and real data:

| Relation | Real nav | Real data | Presentation family |
|---|---|---|---|
| **`Plan → Task`** | ✅ yes | ✅ yes | **`REAL_NAV`** — the presentation may represent it as navigation |
| **`Payment → Movement`** (intra-Finance) | ✅ yes | ✅ yes | **`REAL_NAV`** |
| `Home → <any module>` | ✅ generic nav, read projections only | — | `REAL_NAV` (module change) |
| `Home → Planner → Tareas` | ✅ | ✅ | **`REAL_NAV`** — `S04→S05`, `S05_step01` |
| `Home → Familia` | ✅ | ✅ | **`REAL_NAV`** — `S05→S06` |
| `Assets list → Asset detail` (intra-Assets) | ✅ in Figma | — | `REAL_NAV` **intra-module only** (`N-13`) |
| `Finance tabs` (`Resumen / Movimientos / Pagos / Análisis / Límites`) | ✅ | ✅ | **`REAL_NAV`** |
| `Inventory → Planner Task` | ❌ | ✅ (invisible) | `EDITORIAL` — real link, no real nav |
| `Asset → HomeCloud Files` | ✅ generic | ❌ **no id** | `EDITORIAL` (`N-31`) |
| `Home → Assets → PS5 → Documentos` | ❌ | ❌ | ⛔ **`EDITORIAL` — never a fake tap** (`N-13`) |
| `Plan → Inventory` | ❌ | ❌ | `SHARED_ELEMENT` (`C-04`) |
| `Task → Event` · `Event → Plan` | ❌ | ❌ | `EDITORIAL` |
| `Conversation → Feed` | ❌ | ❌ | ⛔ **not a route.** `N-36` |

### 32.2 The current deck's real-nav compliance

| Current transition | Verdict |
|---|---|
| `S04_step05→S05_step00` (Home → Planner) | ✅ **`KEEP MECHANISM`** — one physical phone, real module change. The only defect is the module *label* (`B-06`) |
| `S05_step01→02`, `→03` (Planner tab changes) | ✅ **`KEEP AS-IS`** — real surfaces, `N-02` mechanism verified |
| `S10_step01→02` (Assets list → detail) | ⚠ **permitted intra-module**, but `N-13` requires it be framed as an approved target with an implementation gap |
| `S05→S06` (Home → Familia) | ✅ **KEEP** |
| `S06_step04→05` (Familia → "Feed") | ❌ **a navigation lie** (`B-15`): presented inside the Familia shell with its tab bar hidden at `opacity: 0` |
| `S14` route pills | ❌ **`H-02` `BLOCKER`** — three nodes that do not exist in the product |

### 32.3 The rule

> **`REAL_NAV` may be shown as navigation. Everything else is `EDITORIAL`, `SHARED_ELEMENT` or `DEVICE_TRANSITION`.**
> **No fake tap. Ever. `MASTER:34`.**

---

## 33. PACING / SPEAKING-RATE MODEL

**No rehearsal audio exists. No sync claim is made. This is a timing model derived from script word counts.**

### 33.1 Method

13 speaker blocks identified in `Guion Compartido (2).md`. Non-empty, non-bracketed, non-heading lines counted; word counts computed per block. **Total 1 921 spoken words.**

### 33.2 Per-block timing and current pacing

| # | Block | Speaker | L | Words | Lines | **130 wpm** | **150 wpm** | **170 wpm** | States | **Presses** | **s / press @150** |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | Entrada y presentación | Colo | 15–61 | 200 | 28 | 92.3 s | **80.0 s** | 70.6 s | 19 | 18 | **4.4 s** ⚠ |
| 2 | Home + Planner + Familia | Gaby | 65–139 | **459** | 38 | 211.8 s | **183.6 s** | 162.0 s | 16 | 15 | **12.2 s** ⚠ |
| 3 | Plan → Inventory | Infra | 144–174 | 113 | 20 | 52.2 s | **45.2 s** | 39.9 s | 5 | 4 | **11.3 s** |
| 4 | Finance | Gaby | 180–230 | 145 | 26 | 66.9 s | **58.0 s** | 51.2 s | 5 | 4 | **14.5 s** ⚠ |
| 5 | Assets → HomeCloud | Infra | 234–269 | 142 | 25 | 65.5 s | **56.8 s** | 50.1 s | 5 | 4 | **14.2 s** ⚠ |
| 6 | Continuidad | Colo | 275–298 | 74 | 19 | 34.2 s | **29.6 s** | 26.1 s | 3 | 2 | **14.8 s** ⚠ |
| 7 | Stack técnico | Benja | 304–326 | 209 | 12 | 96.5 s | **83.6 s** | 73.8 s | 7 | 6 | **13.9 s** ⚠ |
| 8 | Fricción | Infra | 330–343 | 63 | 10 | 29.1 s | **25.2 s** | 22.2 s | 5 | 4 | 6.3 s ✓ |
| 9 | Presentación de Homi | Benja | 349–365 | 67 | 11 | 30.9 s | **26.8 s** | 23.6 s | 5 | 4 | 6.7 s ✓ |
| 10 | Continuación de Homi | Gaby | 369–421 | 175 | 27 | 80.8 s | **70.0 s** | 61.8 s | 5 | 4 | **17.5 s** ⚠ |
| 11 | Control Humano | Benja | 425–440 | 67 | 10 | 30.9 s | **26.8 s** | 23.6 s | 4 | 3 | 8.9 s |
| 12 | Cierre parte 1 | Gaby | 446–458 | 53 | 7 | 24.5 s | **21.2 s** | 18.7 s | (2) | 1 | **21.2 s** ⚠⚠ |
| 13 | Cierre parte 2 | Colo | 462–497 | 154 | 28 | 71.1 s | **61.6 s** | 54.4 s | (2) | 1 | **61.6 s** ⚠⚠ |
| | **TOTAL** | | | **1 921** | **267** | **886.6 s** | **768.4 s** | **678.0 s** | **85** | **84** | **9.15 s** |

### 33.3 The six pacing verdicts

**ⓘ Session 5's premise is REFUTED, and this session confirms the refutation.** Session 5 wrote *"S16 is under-stated (14.0 s/state), not over-stated."* MEASURED at 150 wpm: **S16 = 17.5 s per press — the second-worst ratio in the film.** Scene I needs **more** states, not fewer. *"Many lines per state = bad"* is not the finding; the finding is **many seconds per state with nothing changing**.

| # | Verdict | Evidence |
|---|---|---|
| **1** | **Too many presses — Scene A only.** | 4.4 s per press. `MASTER §2.10` requires multi-object entries to be automated within the state. MEASURED: **8 individual presses** drive the S01 accumulation burst that `MASTER` A04 specifies as one 900–1200 ms auto-beat. **Risk: the presenter rushes the opening, which is the scene that must not be rushed** |
| **2** | **Too few presses — Scene J catastrophically.** | 21.2 s then **61.6 s per press**. MEASURED: 207 words over 4 states. `J-01` `BLOCKER`. **Risk: the audience waits ~1 minute on an end card while the argument is unspoken. This is the film's largest single risk on stage** |
| **3** | **Long static holds — seven scenes.** | `s/press` ≥ 12 s in Scenes B, C, D, E, F, G and S16. MEASURED: 15 transitions change **nothing at all**, and `D-01` (`BLOCKER`) has one product state carrying eight spoken beats. **Risk: the audience stops watching** |
| **4** | **Visual state missing — 15 beats proved by Sessions 2–6.** | `A06` `A10` `B07` `B13` `B14` `B19` `F02` `F03` `G03` `G04` `G09` `I11` `D02` `D04` `E06`. **These are added, not re-labelled** |
| **5** | **Unnecessary visual beat — 16.** | 15 dead transitions plus `S13_step00` (`G-09`, a byte-identical remount). **Deleted, not merged** |
| **6** | **Target: 111 states / 111 presses.** | 768.4 s ÷ 111 = **6.9 s per press at 150 wpm**, and 5.9 s at 170 wpm. Every scene lands in a **4.4–8.3 s** band |

**Per-scene target seconds per press** (150 wpm): A 4.7 · B 8.3 · C 6.5 · D 9.7 · E 8.1 · F 5.9 · G 9.3 · H 3.6 · I 7.3 · J 5.9.

**Two scenes remain above 8 s** (D at 9.7, G at 9.3). Both are acceptable and for the same reason: in D the fix is real Finance surfaces the presenter must describe, and in G the fix is a backend plane and a transaction the presenter must walk through. **Long beats with something actually changing are not the problem.** The problem is long beats with nothing.

### 33.4 Tolerance

`MASTER §2.10`: the deck must *"tolerar una variación oral de ±0,5–1 s sin romper la historia."* At 6.9 s per press, a ±1 s slip is a **14 % variance** — comfortably absorbed. At the current 9.15 s it is 11 %. **The target is not just more comfortable; it is more forgiving of an imperfect rehearsal.**

---

## 34. PRESENTER-OPERABILITY AUDIT

### 34.1 The eight questions, answered from measurement

| # | Question | Verdict | Evidence |
|---|---|---|---|
| 1 | **Can the presenter know when to press?** | ⚠ **mostly yes, three places no** | 111 target beats each map to one script anchor. Today: `S09_step01–04` all look identical except which of four 33 px lines is lit; `S13_step00→01` changes one logo's tint; `S01_step03–08` differ only by one more bubble of the same kind |
| 2 | **Does each press correspond to a phrase?** | ❌ **no, in 4 places** | `S08_step03→04` and `S10_step03→04` land mid-phrase (measured `10.3 ms` — instantaneous). `S13_step02→03` collapses **five spoken ideas into one press** (`G-14`, `HIGH`) |
| 3 | **Are there two presses too close together?** | ❌ **yes — 8 in Scene A** | `S01_step01→08` is 7 presses in a row for **one spoken line** (L21). Session 2: *"the strongest spoken example arrives at state 8 of 11"* (`A-07`) |
| 4 | **Does a visual beat depend on perfect timing?** | ❌ **yes, in 3 places** | `S08_step03→04` and `S10_step03→04` complete at **t ≈ 10 ms** — the "emphasis" is already over before the eye resolves it. `H-06`: the attention reset and the question arrival are the same press |
| 5 | **Does an auto microsequence buy timing tolerance?** | ✅ **yes, and this is its main value** | 31 target sequences convert **8 presses → 1** in Scene A alone, and each has a 640–1400 ms window during which the presenter can breathe. `MASTER §2.10` asks for exactly this |
| 6 | **Can the presenter accidentally skip the important state?** | ❌ **yes — the black holds** | Seven black states. Pressing through one destroys it. **`MASTER §2.10` requires the deck to survive ±1 s of oral variation; a black hold cannot absorb a double-press.** **Mitigation: a repeated `ArrowRight` inside a `HOLD` state must be a no-op, not an advance** |
| 7 | **Can `ArrowLeft` safely recover?** | ⚠ **visually yes, structurally not yet** | MEASURED 51/85 byte-identical; 34 carry residual transforms on a hidden subtree; **0 shared elements exist**, so nothing can be restored *as an object* yet. §18 |
| 8 | **Could a transition still be moving when the next press happens?** | ✅ **no, today** | All durations ≤ 640 ms; MEASURED **0 running animations at all 85 settled states**. With the target's 1400 ms max sequence, **a press during a sequence is now possible** — see the operator grammar below |

### 34.2 SAFE OPERATOR GRAMMAR

| Key | Action | Contract |
|---|---|---|
| **`→` / `Space`** | forward one beat | If a sequence is running, **finish it first** (1400 ms max). If a `HOLD` state is showing, **advance** — but see #6 |
| **`←`** | restore the previous state | Must be exact: §18's eight requirements |
| **`→` inside a `HOLD` state** | **no-op, do not advance** | Seven black holds depend on this. `MASTER §2.10` tolerance |
| **`→` during an `AUTO_MICROSEQUENCE`** | queue at most one; land on the sequence's final state first | Never orphan an animation (§18 req. 2) |
| **`Esc`** (new) | return to the last `MANUAL` beat, cancelling any sequence | **The presenter's panic key.** Not currently present. AUTHORED requirement |
| Any key, held | **nothing repeats** | no auto-repeat, no key-repeat advance |

### 34.3 The single most important operability change

> **Every hold in the film must be a STATE, not an operator behaviour.**
>
> Session 4's own sentence, adopted verbatim: *"Session 1 §7 proves there is no timer and no auto-advance anywhere in the deck, so any hold that is not a state is a hope. **Three of the eight holds above do not currently exist as states.**"*

**MEASURED today, the six holds that must exist and their current status:**

| Hold | Anchor | Exists as a state? |
|---|---|---|
| founding question over black | L41–43 | ❌ **115 ms blink** |
| Scene A collective quiet | L24 | ❌ |
| Scene A clear to black | L26 | ❌ |
| Scene H prelude over black | L341 | ❌ |
| Gaby's closing black | L442–458 | ⚠ 220 ms only |
| the Homi name alone | L349 | ❌ |

---

## 35. WHOLE-FILM RHYTHM CURVE

### 35.1 The authored arc, and the measured motion energy behind it

| Stage | Scenes | Authored motion energy | MEASURED today | Target |
|---|---|---|---|---|
| **CHAOS** | S01 (11) | rising accumulation | 8 individual presses, all at `1.00`, no de-emphasis | **ONE `AUTO` 1100 ms + a held quiet state** |
| **FRAGMENTATION** | S02 (7) | six objects + a slogan | 6 brand logos at `0.54`, a `176 px` band at `1.00` | three household objects, slogan **deleted** |
| **QUESTION / SILENCE** | S02→S03 | **absolute black, held** | **115 ms** | **a held state** |
| **HOMEPLUS REVEAL** | S03 (1) | **the one hero motion** | 640 ms, two glows, vertical lockup | **`hero 880 ms`, horizontal, no halo**, then **9 more states** |
| **PRODUCT CONFIDENCE** | S04–S05 (10) | low, steady | device-only, correct | **KEEP; add the `B07` bridge** |
| **FAMILY / COORDINATION** | S06–S07 (8) | one climax, then silence | **the anti-pattern**, then a correct block exit | reframed map, then the four callbacks, then black |
| **PLAN / INVENTORY / FINANCE / ASSETS / HOMECLOUD** | S08–S10 (15) | moderate | **four 480 px slides, one static prop, one clipped row** | **three extractions, four real Finance states, two new Scene E states** |
| **CONTINUITY** | S11 (3) | near-still | **8 DOM nodes** | **5 states, ≤ 3 relations, ends on the product** |
| **TECHNICAL UNDERSTANDING** | S12–S13 (7) | rising | **two identical cards, a dead press, a decorative line** | **device + backend plane + verbs + transaction + recomposition** |
| **FRICTION** | S14 (5) | falling away | **the whole stack at `1.00`, three text collisions** | **device at `0.75` → one clean state at `1.00` → black** |
| **QUESTION / SILENCE** | S14→S15 | **black, held** | hard cut | **a held black, then the name alone** |
| **HOMI** | S15–S16 (10) | rising | **device fixed for 14 states** | **three frozen device directions** |
| **HUMAN CONTROL** | S17 (4) | decisive | **a second headline crosses over a decision row** | **one line; `HOLD` without confirming** |
| **BLACK** | S17→S18 | **black, held 24.5 s** | 220 ms | **a held state** |
| **LIFE / FAMILY** | S18 | the argument | **nothing** | objects → house → family → ghosts → philosophy |
| **TECHNOLOGY RECEDES** | S18 | the thesis | **nothing** | **`scale 100→82 %`, `opacity → 0`. The house and family do not move** |
| **END CARD** | S18 | stillness | correct, 4 states at 20.7 s each | **`KEEP AS-IS`, moved to the end** |

### 35.2 The seven rhythm verdicts

| # | Question | Verdict |
|---|---|---|
| 1 | **Does motion energy rise and fall with the arc?** | **No.** MEASURED: the film's highest concurrency (88 movers) is in Scene C's *product detail*, and its **lowest** is in the two moments that carry the most weight — the founding question (115 ms) and the closing (0.08 % of the film's motion). **Energy is currently inverted against meaning** |
| 2 | **Is the technical middle too visually busy?** | **Yes, and for the wrong reason.** Scene G is busy with **decoration** (an information-free logo crossfade, a decorative bridge line that survives into S14 as a `+`) and **empty of information** (no device, no verbs, no transaction). Session 4: *"not one of them explains anything."* The fix is **substitution, not subtraction** |
| 3 | **Does the film breathe before key ideas?** | **No — it has no mechanism to.** MEASURED: every hold that should be a state is a duration. Seven required holds do not exist |
| 4 | **Are black resets correctly distributed?** | **No.** 7 target blacks; **3 exist** (`S07`, `S11`, `S18`); the two most important — the founding question and the closing — are **115 ms** and **220 ms**. And **2 blacks must NOT exist**: `S12→S13` and `S13→S14` |
| 5 | **Does Homi feel earned?** | **No.** The reveal is a hard cut with no name-alone beat, and the very next state already has a `110 px` wordmark at `1.00` competing with the device. **Homi is announced, not revealed** |
| 6 | **Does closing feel like release?** | **It cannot.** MEASURED: 207 words over 4 states, 4 → 21 painted elements, no objects, no house, no family, no ghosts, no recession. It feels like an ending card, because that is all it is |
| 7 | **Is the release the *absence* of motion?** | **Yes — and that is available today.** MEASURED: `S18_step03` is stable with 0 running animations at 0/10/30 s, and `S07` is too. **The deck already knows how to be still. It just does it only where it has nothing to show** |

---

## 36. SESSION-7 `M-*` ISSUE REGISTER

New IDs only. `M-01`…`M-14`. Every one links to an existing `RC-*` where the registry already covers it.

**Only two genuinely new root causes are proposed** (`RC-19`, `RC-20`). Everything else reuses the normalised 18.

| ID | Scope | Current | Evidence | Why it fails | RC | Target | Family | Trigger | **Severity** |
|---|---|---|---|---|---|---|---|---|---|
| **M-01** | Whole film | **The deck has no `shared` and no `hero` motion token** | MEASURED: durations in use across 84 transitions are `220 · 320 · 420 · 500`; `NO-UI §6` freezes `shared transform 520–760` and `hero reveal 700–1000` | The two motions the film most needs are unrepresentable. `D-09` and `C-04` cannot be fixed with `spatial 500 ms` because 500 is *below* the 520 floor and carries no identity | **`RC-19`** (new) | 8 tokens; `shared 640`, `hero 880` | — | — | **BLOCKER** |
| **M-02** | Whole film | **One easing curve for all 84 transitions, both directions** | MEASURED: `cubic-bezier(0.2,0.8,0.2,1)` everywhere. `NO-UI §6` freezes three curves incl. `exit cubic-bezier(.4,0,1,1)` | Entrances decelerate into exits. Black arrives decelerated; a shared element decelerates when it should keep travelling. Session 4 already flagged this in one block; it is film-wide | `RC-15` restated as motion | `enter`/`exposure`/`spatial`/`shared` on the default curve; `exit`/`reset` on the exit curve; `hero` on the hero curve | — | — | **HIGH** |
| **M-03** | Whole film | **15 of 84 transitions change nothing measurable; `S13_step00` is a byte-identical remount** | MEASURED: 15 zero-delta transitions; `S13_step00→01` = 1 mover; `G-09` measured 51 entering / 28 exiting, 0 animating | `MASTER §2.10`: a press must change an idea. Dead presses train the presenter to press without looking and give the audience nothing to read | `RC-06` / `RC-18` | Delete `S13_step00` entirely (merge S12/S13). Reallocate the other 14 into the beats that are missing | `EDITORIAL` | `MANUAL` | **HIGH** |
| **M-04** | S06 | **The map is enlarged by layout mutation, out of its device** | MEASURED: `250×200 → 1080×520`; scroll `313×265 → 1350×689`; `15px → 41.04px`; `26px → 64.8px`; device `1.00 → 0.12`; canvas `1280×720 → 1450×789`; anisotropy `0.75 → 1.246` | Five distinct failures in one transition (§22.3). The product stops being product UI. **This is the pattern the whole deck must not learn** | `RC-07` | `DEVICE_TRANSITION`: device `1.00 → 1.08` + exposure inside the device + local focus on pin copy only | `DEVICE_TRANSITION` | `MANUAL` + `AUTO` | **BLOCKER** |
| **M-05** | Whole film | **84 transitions, 0 shared elements; both extractions are 480 px slides** | MEASURED: `S08_step02→03` 88 movers with every step opacity `1`; `S10_step02→03` 44 movers with two DOM instances per document at `y 202.4/288.9 → 210.2/297.2` | A moving device says "we navigated". The product does not navigate there. The audience is told a lie by a 480 px slide | `RC-01` | `shared 640` extractions; the device does not move | `SHARED_ELEMENT` | `MANUAL` + `AUTO` | **BLOCKER** |
| **M-06** | Whole film | **12 of 17 scene boundaries are cross-mounts** | MEASURED: 33 transitions with mount/unmount; 12 with 0 interpolating animation; `S07→S08` 270 entering / 517 exiting | A cross-mount is not a transition. It gives the audience no continuity and it re-runs entrance animations at the wrong moment — `S13→S14` replays the whole stack at `1.00` (`G-08`) | **`RC-20`** (new) | A cross-mount is permitted **only at a black reset**. Every other boundary preserves the outgoing composition and changes exposure | `EDITORIAL` | `MANUAL` | **BLOCKER** |
| **M-07** | Whole film | **Seven required holds do not exist as states** | MEASURED: founding question = 115 ms; Scene H prelude = folded into the question press; Gaby's closing = 220 ms; Scene A quiet and clear = absent; Homi name alone = absent | A hold that is a duration cannot absorb a presenter's timing. `MASTER §2.10` requires ±1 s tolerance. `H-07`, `A-02`, `J-02`, `A-08` | `RC-06` / `RC-18` | 7 new `HOLD` states, each `MANUAL`-triggered with no timer | `EDITORIAL` | `HOLD` | **BLOCKER** |
| **M-08** | Whole film | **Top stage salience is narration-on-screen in 37 states** | MEASURED: `176 px` slogan band, `80 px` statement, `68 px` question, `60 px` "El dinero del hogar", `56 px` forbidden titular, `54/84 px` dual headlines. Largest in-app type is `30 px` | A `176 px` headline is **7.9×** the largest type inside the product. The audience's eye is carried by text the speaker is already saying. `MASTER §2.3` authorises six texts in the whole film; three are consumed by duplicates | `RC-03` | Delete the narration-on-screen states. Let product UI carry Scenes C–D. `MASTER §2.3`'s six texts only | `EDITORIAL` | — | **HIGH** |
| **M-09** | Whole film | **The device at `1.08` breaches the frozen 48 px safe area by 23 px, undeclared** | MEASURED: at `1.00` margins are `50/50` (compliant); at `1.08` they are `25/25.4`. Max compliant scale = `624/620 = 1.006`. **`NO-UI §7`'s `820–880 px` is geometrically impossible on a 720 px canvas** | An undeclared breach is an accident. And the canon value that *would* justify more scale cannot be executed, so the temptation to reach for `1.2`/`1.35` must be closed **now** | **`RC-19`** (new, with M-01) | **Declare 1.08 as the single authorised breach.** **No third scale exists.** Legibility comes from movement + exposure | `DEVICE_TRANSITION` | — | **HIGH** |
| **M-10** | Scene I | **14 states / 3 scenes / 2 min 04 s with a device at identical `718,25,324,670`, `matrix(1.08)`, `phoneCount 1`** | MEASURED, all three properties, every state | The three **frozen** `MASTER §2.9` device directions are unimplemented. The thesis "Homi works *over* HomePlus" is unproven because only one surface is ever on stage. `I-21`, `I-05`, `I-02` | `RC-01` / `RC-02` | All three directions: `I06` auxiliary from a side, `I09` laterals from behind, `I13` out-UP / in-BELOW | `DEVICE_TRANSITION` / `SHARED_ELEMENT` | `MANUAL` + `AUTO` | **BLOCKER** |
| **M-11** | Scene I | **S17 CONFIRMS the mutation while the stage says the decision is ours** | MEASURED: `.homi-done` "Confirmado / Entrenamiento actualizado" enters at effective `1.00`; `.s17-line` holds at `0.4`; `.s17-resolution` "La decisión es nuestra." at `1.00` | The frame contradicts itself. `NO_UI I26`: **NO confirmar**. `MASTER I3`: a cancel path is required and S15 has none | `RC-13` | `HOLD` without confirming. Two actions at `1.00`, context at `0.20`, **no mutation state exists** | `EDITORIAL` | `MANUAL` + `HOLD` | **BLOCKER** |
| **M-12** | Whole film | **Back-navigation leaves a residual transform on a hidden subtree in 34 of 85 states** | MEASURED: forward `.family-map-stage` `@22.4,0 0×0 transform:none`; backward `@274.19,250 200×0 transform:matrix(1,0,0,1,0,0)`. Text `85/85` identical, device `85/85` identical, overflow `85/85` identical, 0 running animations both directions | Invisible today. **Becomes a live defect the moment that subtree is made visible — which is exactly what Scene B's target requires** | `RC-15` | Zero residual inline `transform` on any hidden subtree, in both directions | — | — | **MEDIUM** |
| **M-13** | Whole film | **26 of 84 transitions move ≥ 10 elements at once; worst is 88** | MEASURED: `S08_step02→03` 88 · `S06_step05→S07_step00` 48 · `S06_step00→01` 38 · `S10_step01→02` 44 · `S03→S04` 149 repositioned | More than roughly one third of the meaningful elements moving at once. The audience cannot tell what moved on purpose. `MASTER §2.10` forbids firing 5–10 objects individually | `RC-07` / `RC-06` | Motion budget: ordinary ≤ 2 · shared ≤ 3 · device ≤ 2 · reset = 1 · closing transformation ≤ 3 staged | — | — | **HIGH** |
| **M-14** | Whole film | **A repeated `→` inside a `HOLD` state advances, destroying it** | By inspection of `navigation.ts` semantics + `MASTER §2.10`; MEASURED 7 black/quiet states depend on it | Seven holds are irrecoverable if double-pressed, and `MASTER §2.10` requires ±1 s oral tolerance. A hold must be **robust to a mis-press**, not merely long | **`RC-20`** (with M-06) | `→` inside a `HOLD` state is a **no-op**. Add `Esc` → return to the last `MANUAL` beat | — | `HOLD` | **HIGH** |

### 36.1 Severity discipline

| Severity | Count | IDs |
|---|---|---|
| **BLOCKER** | **7** | `M-01`, `M-04`, `M-05`, `M-06`, `M-07`, `M-10`, `M-11` |
| **HIGH** | **6** | `M-02`, `M-03`, `M-08`, `M-09`, `M-13`, `M-14` |
| **MEDIUM** | **1** | `M-12` |
| **LOW / POSITIVE** | 0 new | 25 `KEEP AS-IS` + 9 `KEEP CONCEPT` in §37 |

**No severity was inflated.** `M-09` is `HIGH` and not `BLOCKER` because the current `1.08` is proven and correct (`N-41`); only the *undeclaration* and the *temptation* are defects. `M-12` is `MEDIUM` and not `BLOCKER` because it has zero visible effect today — the reason is stated in §18.4 so the grade can be re-checked. The three `RC-02` blockers already canonically active in Scenes F/G/H (`F-01`, `G-01`, `H-01`) are **not re-graded** here; they are content blockers that Session 7 inherits, not motion findings.

---

## 37. POSITIVES / KEEP LIST

**Verified before preserving. Where Session 7 re-measured something a prior session asserted, the re-measurement is noted.**

### 37.1 `KEEP AS-IS` — do not touch

| # | Item | Source | Session-7 verification |
|---|---|---|---|
| 1 | **`S07` entire concept + `132 px`** | `B-21` / `N-05` | **RE-MEASURED:** `.s07-statement` `688.81×274.53`, `132 px` two-tone, effective `1.00`, nothing else painted. **BINDING — a later typography-normalisation pass must not reduce it** |
| 2 | **Stable states are stable** | Session 1 §7 | **RE-MEASURED at 0/10/30 s across 12 states:** geometry hash stable, text hash stable, `runningAnimations = 0`, `playState = "finished"` everywhere. **12/12.** The single most load-bearing property for live delivery |
| 3 | **Device scale `1.08` with stable internal geometry** | `N-41` / Session 5 #2 | **RE-MEASURED:** `.phone-frame` layout `298×618` and screen `282×602` in **all 66** device states, forward and backward |
| 4 | **`S08_step01` selective exposure** | `C-10` | **RE-MEASURED:** subject `1.00` on `rgb(246,237,232)`, siblings `0.55`, heading `0.60`, no scale, no layout, no blur. **The model for the whole film** |
| 5 | **`S10_step01` the same mechanism** | Session 3 | **RE-MEASURED:** `.assets-row` effective opacity `{1, 0.55}` |
| 6 | **Planner selection pill translates; tabs do not resize** | `N-02` | **RE-MEASURED:** tabs `81.16 / 81.69 px`, one frame `80.09 / 83.81`, pill `81.33 px`, `left 3 → 84.33 → 165.66`. **Max 84 px.** `137 px` struck permanently |
| 7 | **One physical phone across Home / Planner / Familia** | `B-P4` | **RE-MEASURED:** `300×620 @570,50`, scale `1.00`, identical across all 16 states |
| 8 | **Home / Planner shell anatomy, segmented controls, navigation** | `B-20` / `B-P1`/`B-P2` | correct `role="tab"` / `aria-selected` / `aria-labelledby`; the 0.4 px? no — the `+4 px` overflow in `.planner-panel-stack` is pre-existing and harmless |
| 9 | **Homi chrome** (`HomeHeader` + `homeTokens` + `#C96B45` + `homi-mark.svg`) | Session 5 #1 | it reads as HomePlus, not as a chatbot |
| 10 | **Homi question-bubble invariance** | Session 5 #4 | **RE-MEASURED:** box `777,187,238,81` **byte-identical across Juli / Tomi / Papá.** A correct implementation of *"same question, different answers"* |
| 11 | **Homi bubble entrance primitive** — fade + `10 px` rise, `320/420 ms` | Session 5 #3 | correct register |
| 12 | **S13 / S14 role captions verbatim** | `G-P1` | *"the only moment in the entire block where the visual serves understanding rather than labelling"* |
| 13 | **No AI provider logo; no rack / terminal / code-rain / cylinder** | `G-P2` / `G-P3` | correct restraint. **Must be extended, not relaxed — `G-12` is ACTIVE** |
| 14 | **The mono/colour two-variant mark mechanism** | `G-P4` | real token discipline. **KEEP the mechanism; DROP the crossfade** (`G-13`) |
| 15 | **S18 end-card composition** | `J-12` / Session 5 #3 | logo `120 px` + wordmark `64 px` + 4 members + `Muchas gracias.` `76 px`. **Correct. Only its POSITION was wrong** |
| 16 | **Separate `Muchas gracias.` trigger + indefinite hold** | Session 5 `J-E3`/`J-E4` | **RE-MEASURED at 0/10/30 s: 0 running animations** |
| 17 | **Team stagger `90 ms × 4 = 270 ms`** | Session 5 #4 | inside budget |
| 18 | **Finance composition order** | `D-08` | period scope → tab row → balance → `Pagos próximos` → `Por categoría`, matching the target exactly. `tabular-nums` correctly applied |
| 19 | **HomeCloud `Documentos / Recuerdos` control** | `E-12` | faithful reproduction of the target's domain switch |
| 20 | **The route rhythm — all at once** | `H-P3` | the *rhythm* is correct. **Replace the representation** |
| 21 | **S14's two-line question break and large setting** | `H-P2` / `H-P1` | **RE-VERIFIED visually: the settled frame is genuinely clean.** `N-17` confirmed |
| 22 | **`S11` thesis typography, `120 px`** | `F-P2` | strongest in the block |
| 23 | **`S11`'s honesty about its own emptiness** | `F-P3` | no glow, no network, no invented objects. **The template for the rebuilt scene** |
| 24 | **`#060404` black discipline** | `H-P4` / `J-13` / `N-05` | functionally black on a projector. **Do not "fix" `J-13` into inconsistency** |
| 25 | **Assets → HomeCloud domain-switch timing target `280 ms`** | Session 3 | the target's own value; today's is instantaneous |

### 37.2 `KEEP CONCEPT` — right idea, wrong execution

| # | Item | What to change |
|---|---|---|
| 1 | `S10`'s instinct to raise the device | **KEEP; it is already `1.08`.** `E-11`'s claim to uniqueness is **false** (`N-09`) |
| 2 | Inventory → Shopping **teaser as a narrative function** (`C-09`) | **KEEP the position and the idea; ⛔ never present a Shopping List** (`N-06`). Redirect to the approved Restock chain |
| 3 | `El dinero del hogar` as an editorial idea (`60 px`) | in the `56–72 px` "major concept" band. **KEEP the idea; move it after its line; make the device carry the scene** |
| 4 | S07's product block exit (`220 ms`) | KEEP verbatim |
| 5 | S06's map dramaturgy — expand, then collapse | **KEEP the dramaturgy; REJECT the mechanism** |
| 6 | Persona swap motion (`420 ms` fade + `14 px` slide) | KEEP; **differentiate identity from payload** (`I-23`) |
| 7 | Birthday callback as a concept (`E-08`) | KEEP the concept; make it real — right date, opened |
| 8 | `Confirmar` / `Ahora no` side-by-side decision row | KEEP the layout; **relabel `Ahora no` → `Cancelar`** and **remove the reflow** |
| 9 | The four `MASTER B7` synthesis callbacks | KEEP the concept; **they do not exist yet** — this is the fix for `B-19` |

### 37.3 `KEEP MECHANISM` — right primitive, wrong subject or timing

| # | Item |
|---|---|
| 1 | S01's `320 ms` decelerating entrance with a `12 px` rise — **the deck's reference entrance** (`A-P3`) |
| 2 | `S04_step05→S05_step00` — one device across a module change |
| 3 | `S05_step01→02` / `→03` — pill translate |
| 4 | `S06_step01→02` — `320 ms`, correct primitive |
| 5 | `S07_step00→01` — `420 ms` opacity + `12 px` rise, `KEEP EXACTLY` |
| 6 | `s18-veil-in` `220 ms` — the correct chapter-reset primitive |
| 7 | `S18` brand `420 ms` + `scale 0.96→1` |
| 8 | `PhoneFrame`'s `scale` prop + the `s15-phone-motion` wrapper — **the building blocks for every required device transition** (Session 5 #12) |

### 37.4 `KEEP TOKEN` — the four existing durations survive unchanged

`220` (micro band `180–240` ✓) · `320` (opacity/simple-move band `260–360` ✓) · `420` (state-transition band `380–520` ✓) · `500` (spatial, just under the `520–760` shared band — **reassigned to `spatial`, not to `shared`**). **No existing duration needs to change.** They need naming by function and four siblings.

### 37.5 `KEEP GEOMETRY`

`.phone-frame` `298×618` · `.phone-frame-screen` `282×602` in all 66 device states · `--canvas 1280×720` · `safeArea 48` · device anchors `x 250` / `x 730` at `1.00` · Planner tabs `81/82/81 px` with a translating pill · `S07`'s `688.81×274.53` · `S08_step01`'s `rgb(246,237,232)` ground · Homi bubble `777,187,238,81` · S18's `120 / 64 / 24 / 22 / 76 px` type scale.

### 37.6 Explicit `DO NOT TOUCH`

| # | Item |
|---|---|
| 1 | **S07's 132 px typography.** `N-05` is binding |
| 2 | **The 12 finished `fill-mode: both` glow animations.** They are not motion (`N-10`); removing them changes the painted frame |
| 3 | **`#060404`.** Do not unify the two blacks |
| 4 | **The stable-state invariant.** 12/12 measured. Any change that introduces idle motion breaks it |
| 5 | **`S08_step01`'s exposure values.** `1.00 / 0.55 / 0.60` on `--home-brand-soft` |
| 6 | **S18's end-card composition and its three separate triggers** |
| 7 | **The single-device model as the default.** Two and three devices are the exceptions, at two named moments only |

---

## 38. TARGET MOTION SYSTEM

The eight-category system. §13.2's token set, expanded per category with allowed / forbidden / use / do-not-use.

### 38.1 `MICRO EMPHASIS`

| | |
|---|---|
| **Duration** | **200 ms**, out and back (`100 → s → 100`, so 100 ms each way) |
| **Easing** | `cubic-bezier(.22,.61,.36,1)` |
| **Allowed** | `transform: scale` on a **leaf**; `opacity`; `--home-brand-soft` background swap |
| **Forbidden** | layout, `font-size`, `scrollHeight`, any parent resize, any clipping ancestor |
| **Scale** | **`108 %`**. `115 %` only when the element is the named subject of the sentence |
| **When** | one row, tab, chip or nav item needs a beat |
| **When NOT** | two or more things compete; inside `.phone-frame-screen` or any measured-overflowing ancestor; on stage type above `56 px` |

### 38.2 `ENTER / EXIT`

| | |
|---|---|
| **Duration** | **enter 320 ms** · **exit 260 ms** |
| **Easing** | enter `cubic-bezier(.22,.61,.36,1)` · exit **`cubic-bezier(.4,0,1,1)`** |
| **Allowed** | `opacity`, `transform: translate 0 12px→0` (enter) / `0→-12px` (exit), `visibility` at the end of exit |
| **Forbidden** | layout, `font-size`, blur, shadow, scale-up-from-zero |
| **When** | an object arrives or leaves and its identity does not continue |
| **When NOT** | the object persists into the next context — that is `shared`, not `enter` |

### 38.3 `EXPOSURE SHIFT`

| | |
|---|---|
| **Duration** | **360 ms** |
| **Easing** | `cubic-bezier(.22,.61,.36,1)` |
| **Allowed** | `opacity` on a group; the product's own tokens for the subject ground |
| **Forbidden** | blur, glow, per-object bespoke opacities, dimming the subject |
| **Bands** | subject `1.00` · context `0.55–0.65` · background `0.25–0.35` |
| **When** | attention must move, and **only** for one of four reasons: *the subject arrived · the subject lost the floor · the context recedes · the chapter is ending* |
| **When NOT** | none of the four applies; or more than one subject is being re-weighted at once |

### 38.4 `DEVICE MOVE`

| | |
|---|---|
| **Duration** | **500 ms** |
| **Easing** | `cubic-bezier(.22,.61,.36,1)` |
| **Allowed** | `transform: translate` on `.phone-frame-slot` only; `opacity 0→1` on entry, `1→0` on exit; whole-device `scale` **at 1.00 or 1.08 only** |
| **Forbidden** | any internal mutation; movement while contents animate; a third scale; any device move that implies a product navigation the product does not have |
| **When** | the device's **role** changes: product → map · product → comparison · Homi → Planner · S13/S14 → S15 |
| **When NOT** | the same screen with different content; any move during a `SHARED_ELEMENT` transition |

### 38.5 `SHARED ELEMENT`

| | |
|---|---|
| **Duration** | **640 ms** |
| **Easing** | `cubic-bezier(.22,.61,.36,1)` |
| **Allowed** | `transform` + `opacity` of **one persistent object**; the outgoing composition's exposure |
| **Forbidden** | cloning the object; animating both instances; a device move; a crossfade that hides the transfer |
| **Identity test** | the object must be recognisable as the same object at 50 % of the travel. If it is not, it is not a shared element — it is two lookalikes |
| **When** | the **same semantic datum** continues across a context change |
| **When NOT** | the datum is different but the text is similar — `MASTER:140` forbids *"versiones parecidas"* |

### 38.6 `EDITORIAL REFRAME`

| | |
|---|---|
| **Duration** | **500 ms** (the `spatial` token) |
| **Easing** | `cubic-bezier(.22,.61,.36,1)` |
| **Allowed** | `transform` on stage-level groups; `opacity`; the device staying **absolutely still** |
| **Forbidden** | anything that reads as a tap, a ripple, a cursor, a press; arrow glyphs between nodes that do not exist; text pills |
| **Three honesty tests** | does not imitate a tap · visibly a construction · the device never moves as if it navigated |
| **When** | the relation is conceptual, the integration is incomplete, or the surfaces are narratively but not navigably connected |
| **When NOT** | real navigation exists — then it is `REAL_NAV` |

### 38.7 `BLACK RESET`

| | |
|---|---|
| **Duration** | **520 ms** in, then **`HOLD` indefinitely** |
| **Easing** | **`cubic-bezier(.4,0,1,1)`** — black arrives faster than it leaves |
| **Allowed** | `opacity → 0` on a group; nothing else |
| **Forbidden** | anything arriving during the hold unless it is the hold's own subject; a timer; a second subject |
| **Sequence** | `exposure 360` (everything to 0) → **then** `reset 520` → **then** hold. **Never simultaneous** |
| **Authorised holds** | opening · *"en la cabeza de alguien"* · **the founding question** · `S07`'s pause · Scene F's entry · **the Scene H prelude** · **the Homi reveal setup** · **Gaby's closing** |
| **When NOT** | as slide separation; two consecutive scenes; ⛔ **at `S12→S13` or `S13→S14`** |

### 38.8 `HERO REVEAL`

| | |
|---|---|
| **Duration** | **880 ms** |
| **Easing** | **`cubic-bezier(.16,1,.3,1)`** |
| **Allowed** | `transform` + `opacity` + a mask; a full-field colour fill |
| **Forbidden** | halo, vignette, radial, glow, particles, lens flare, bounce, 3D |
| **Used exactly twice** | `A14` the HomePlus reveal · `I01` the Homi name |
| **Preceded by** | a `HOLD` on absolute black, so the reveal answers a question rather than interrupting one |

### 38.9 `AUTO MICROSEQUENCE` (envelope)

| | |
|---|---|
| **Total** | **≤ 1400 ms** |
| **Composition** | tokens 1–8 only |
| **Rule** | one `MANUAL` press starts it; it ends on a stable state; it never advances an idea |
| **Reverse** | `ArrowLeft` restores the pre-sequence state completely, including every suppressed element's exposure |

---

## 39. MOTION BUDGET

**Not one universal number. Semantic situations differ.**

| Situation | **Max simultaneous meaningful movers** | Rationale |
|---|---|---|
| **Ordinary state transition** | **2** | one subject arriving/leaving + one context shifting exposure. Above 2 the audience cannot tell which moved on purpose |
| **`SHARED_ELEMENT` transition** | **3** | the travelling object + at most 2 context changes |
| **`DEVICE_TRANSITION`** | **2** | the device + the exiting or entering group. **Never more** |
| **Chapter reset** | **1** | the field going to black, or the black returning. One subject by definition |
| **Closing transformation** (`J11`) | **3, staged 120 ms apart** | the frame · the phone geometry · the organisation + line. **The family is not one of them — it does not move** |
| **Saturation burst** (`A05`) | **3 per burst, 3 bursts** | one third of the field at a time |
| **Terminal case** | **ALL of them**, permitted **only** where simultaneous movement *is* the concept | `B07` scope widening · `B20` block exit · `J06` ghost disappearance |

**Measured against the current film:** 26 of 84 transitions exceed 2; 12 exceed 10; the worst is 88. **Budget compliance today: 58 of 84 within budget, 26 over.**

**This is a diagnostic, not a law.** Where a beat legitimately needs group motion it is named in the trigger map with its reason.

---

## 40. TARGET STATE-COUNT TABLE

| Scene | **Current states** | **Target manual states** | **Target auto microsequences** | **Why change / keep** | **Net** |
|---|---|---|---|---|---|
| **A** Chaos · Fragmented · Reveal | 19 | **17** | 5 | **+8 beats, −10 dead presses.** Delete the `6/1/0` slogan state, the 6-logo states, and the 6 dead accumulation presses. Add: the founding-question black, the icon-alone beat, the hero reveal, the four people, equality, house, Juli→Home | **−2** |
| **B** Home · Planner · Family · Coordinar | 16 | **22** | 6 | **+6.** Add: the `B07` scope-widening bridge, `B13` the consequence, `B14` the two questions, `B19` the retention, `B22` the four `MASTER B7` callbacks. Keep S07 untouched | **+6** |
| **C** Plans / Inventory | 5 | **7** | 2 | **+2.** Add: the Restock-Need beat; split the extraction from the arrival | **+2** |
| **D** Finance | 5 | **6** | 1 | **+1 state, −4 text states.** Delete `D-02`'s four narration lines; add `Nuevo movimiento` with the account/card selector and `Límites` | **+1** |
| **E** Assets / HomeCloud | 5 | **7** | 3 | **+2.** Add the two-state warranty/memory composition that `E-04` (`BLOCKER`) says has no available state | **+2** |
| **F** Continuity | 3 | **5** | 1 | **+2.** Add the six abstractions + ≤ 3 relations, and the everyday return. **End on the product, not on type** | **+2** |
| **G** Frontend / Backend / Stack | 7 | **9** | 4 | **+2, −1 boundary.** Delete `S13_step00` (`G-09`, a dead press). Add: the backend plane, the recomposition | **+2** |
| **H** Barrier / Friction | 5 | **7** | 2 | **+2.** Add the clean product state (`H-04` `BLOCKER`) and the black prelude (`H-07`) | **+2** |
| **I** Homi | 14 | **17** | 6 | **+3.** Add: the three-device comparison (`I-10`), the Finance grounding (`I-06`, 15 spoken lines), the visual-UI surface (`I-05`). **S16 is under-stated, not over-stated** | **+3** |
| **J** Closing | 4 | **14** | 3 | **+10.** `J-01` `BLOCKER`: 207 words over 4 states. Add objects, house, family, ghosts, philosophy, **five** organisation triggers, ordering, phone geometry, recession, living moment, black | **+10** |
| **TOTAL** | **85** | **111** | **33** | | **+26** |

**Note on the total:** 111 states and **111 manual presses**, of which **31 launches an `AUTO_MICROSEQUENCE`**. Net **+26 stable states, +27 presses.**

**Every proposed state has a named reason and an anchor.** No state was added for smoothness. No state was removed for brevity. **`85` is not sacred and neither is `111` — §40.1 states the rule these numbers follow.**

### 40.1 The rule the numbers follow

> **Target seconds per manual press: 4.5 – 8.0 s, midpoint ~6 s, measured at 150 wpm.**
>
> `768.4 s ÷ 111 presses = 6.9 s`. Every scene lands in **4.4 – 8.3 s** except **Scenes D (9.7 s) and G (9.3 s)**, where the presenter is describing real product surfaces and a backend transaction — beats where something genuinely changes.
>
> **Long beats with something changing are not the problem. Long beats with nothing are.** That is the entire pacing finding.

---

## 41. WHOLE-FILM TARGET CHOREOGRAPHY

**Specific enough for Session 8 to turn directly into a patch plan. Not implementation.**

### SCENE A — Chaos · Fragmentation · Reveal
- **ENTRY:** absolute black, nothing painted. `MANUAL`.
- **FIRST STABLE STATE:** `A01` black. **~6 s hold.**
- **MANUAL BEATS:** `A01`–`A17` (17).
- **AUTO MICROSEQUENCES:** `A05` saturation 1100 ms · `A07` clear 360 ms · `A12` black reset 520 ms · `A13` icon 320 ms · `A14` **hero 880 ms**.
- **PRIMARY ATTENTION:** the household object being spoken about. **Then nothing.** **Then the icon.** **Then the lockup.** **Then the four people.**
- **DEVICE POSITION:** none in `A01`–`A14`; `A17` the device enters at the **stage-left anchor**.
- **DEVICE COUNT:** 0 → **1**.
- **SHARED ELEMENTS:** `physical.insurance` (opens here, returns at `J02`) · `physical.bolsa` · `physical.heladera` (opens as a question, returns as an object) · `message.old_household` (**created here — it does not exist today**) · `person.*` (open here, return at `A15`, `B07`, `J04`).
- **EXPOSURE:** objects `1.00` → group `0.55–0.65` at `A06` → **all `0`** at `A07`. Icon alone `1.00`. Lockup `1.00`. People at absolute `105/110/115 %`, then equal.
- **EXIT:** `A17` — Juli remains and morphs into Home of Juli.
- **NEXT-SCENE HANDOFF:** `SHARED_ELEMENT` (`shared 640`) — **Juli crosses into `B01`.**
- **BACKWARD RESTORATION:** every accumulated object returns to its exact Scene-A box; the black states are holdable; the hero reverses to the icon alone.

### SCENE B — Home · Planner · Familia · Coordinar
- **ENTRY:** `shared 640` — Juli arrives from Scene A as the account row.
- **FIRST STABLE STATE:** `B01` Home, device stage-right, `1.00`.
- **MANUAL BEATS:** `B01`–`B22` (22).
- **AUTO MICROSEQUENCES:** `B03` shared 640 · `B07` **scope widening 1400 ms** · `B10` pill 320 ms · `B20` block exit 260 ms.
- **PRIMARY ATTENTION:** inside the device, in Figma's Home grammar order: **attention → today → upcoming**; **Tareas → Responsabilidades → Calendario → Planes**; **members → places → the consequence**.
- **DEVICE POSITION:** `B01`–`B06` **stage-right** (`570,50`) · `B07`–`B08` **centred** · `B12`–`B14` **stage-right** · `B15` **stage-left, `1.08`** · `B16` back · `B17`–`B19` **stage-right** · `B20` exits.
- **DEVICE COUNT:** **1 throughout.** Never 2.
- **SHARED ELEMENTS:** `person.*` (all four) · `birthday.event` (leaves at `B11`) · `message.technician` (established at `B18`, returns at `J05`) · `Tomi training event` (opens at `B10`, returns in Scene I).
- **EXPOSURE:** `S08_step01` model everywhere. `B15`: map chrome → `0.40` inside the device. `B19`: shell `0.55`, message `1.00`.
- **EXIT:** `B20` product stage exits **as a block**; `B21` the 132 px statement alone; `B22` the four callbacks converge, then out.
- **NEXT-SCENE HANDOFF:** `EDITORIAL` — out to `C01`'s Plan with its Event attached.
- **BACKWARD RESTORATION:** **all eight §18 requirements.** The map returns to its in-device slot — and **this is the beat that will expose `M-12`, so it must be fixed first.**

### SCENE C — Plans / Inventory
- **ENTRY:** `C01` the Plan **with its Event** (`19:00`).
- **FIRST STABLE STATE:** `C01`.
- **MANUAL BEATS:** `C01`–`C07` (7).
- **AUTO MICROSEQUENCES:** `C05` **extraction `shared 640`** · `C07` exposure 360 ms.
- **PRIMARY ATTENTION:** the bridge task at `1.00` on `--home-brand-soft`. Everything else `0.55`.
- **DEVICE POSITION:** `C01`–`C04` **stage-left** (`250,50`) · `C05` **the device does not move** · `C06`–`C07` **stage-right** (`730,50`).
- **DEVICE COUNT:** **1.**
- **SHARED ELEMENTS:** `birthday.event` (from `B11`) · `inventory.missing_item` (created at `C03`, extracted at `C05`, survives to `C06`).
- **EXPOSURE:** `C04` question `1.00`, device context `0.55`, **bridge task still `1.00`**.
- **EXIT:** `C07` — the approved chain ends on the need, never on a purchase.
- **NEXT-SCENE HANDOFF:** `SHARED_ELEMENT` — the need **becomes** the quiet ledger fact. **⛔ No automatic pipeline** (`N-32`).
- **BACKWARD RESTORATION:** the extracted row returns to its Plan position and size. **No clone.**

### SCENE D — Finance
- **ENTRY:** `D01` Finance Resumen, **stage title after its line**.
- **FIRST STABLE STATE:** `D01`.
- **MANUAL BEATS:** `D01`–`D06` (6).
- **AUTO MICROSEQUENCES:** `D06` **extraction `shared 640`**.
- **PRIMARY ATTENTION:** the real Finance surface. **Never a stage question.**
- **DEVICE POSITION:** **stage-left** (`250,50`), `1.00`. **Does not move** until `D06`.
- **DEVICE COUNT:** **1.**
- **SHARED ELEMENTS:** `finance.supermarket_movement` (`N-22` canon) · `finance.ps5_movement` (**created at `D02`, extracted at `D06`**).
- **EXPOSURE:** real tab states at `1.00`. The scope switch is the only emphasis.
- **EXIT:** `D06` — the movement row leaves the screen and becomes the Asset.
- **NEXT-SCENE HANDOFF:** `SHARED_ELEMENT` (`shared 640`).
- **BACKWARD RESTORATION:** the movement returns to `Movimientos` at its exact row geometry.

### SCENE E — Assets / HomeCloud
- **ENTRY:** `E01` Assets list, device **`1.08`** at the **stage-left anchor** — **the declared 23 px safe-area breach.**
- **FIRST STABLE STATE:** `E01`.
- **MANUAL BEATS:** `E01`–`E07` (7).
- **AUTO MICROSEQUENCES:** `E04` **extraction `shared 640`** · `E06` exposure 600 ms · `E07` exposure 360 + `reset 520`.
- **PRIMARY ATTENTION:** `E02` the warranty record · `E03` the documents · **`E06` the birthday photo at `1.00`, the garantía at `0.55–0.60`.**
- **DEVICE POSITION:** `E01`–`E03` **stage-left, `1.08`** · `E04`–`E07` **stage-right, `1.08`**. The device **does not move during `E04`** — the document travels instead.
- **DEVICE COUNT:** **1.**
- **SHARED ELEMENTS:** `finance.ps5_movement` (from `D06`) · `asset.ps5.documents` (**extracted at `E04`**) · `warranty.ps5` · `birthday.memory`.
- **EXPOSURE:** `E06` is the film's thesis composition. **⛔ Never write "documentos vs recuerdos"** — its absence is currently a positive.
- **EXIT:** `E07` — **exposure-down first, then black.** Not a cross-mount.
- **NEXT-SCENE HANDOFF:** `EDITORIAL` + black reset → Scene F.
- **BACKWARD RESTORATION:** the document returns to the Assets detail **at the same y**.

### SCENE F — Continuity
- **ENTRY:** black, established by the **scene-entry transition**, not by a dedicated press.
- **FIRST STABLE STATE:** `F01` one concrete situation.
- **MANUAL BEATS:** `F01`–`F05` (5).
- **AUTO MICROSEQUENCES:** `F04` thesis line 320 ms.
- **PRIMARY ATTENTION:** one object at a time. **≤ 3 relations, ever.**
- **DEVICE POSITION:** **centred** at `F05`.
- **DEVICE COUNT:** **0 → 1 at `F05`.**
- **SHARED ELEMENTS:** every object from Scenes A–E returns at `0.55`, one group at a time. The **device** crosses into Scene G.
- **EXPOSURE:** subject `1.00`; relations `0.55–0.65`; **the frame itself stays empty** (`F-P3`).
- **EXIT:** `F05` — **the product, not a line of type.**
- **NEXT-SCENE HANDOFF:** `DEVICE_TRANSITION` — the device carries into `G01`.
- **BACKWARD RESTORATION:** each returning object returns to its origin geometry. **This is the template (`F-P5`).**

### SCENE G — Frontend / Backend / Stack
- **ENTRY:** `G01` — the real device, **centred, alone, `1.00`, holding for the whole of L304.**
- **FIRST STABLE STATE:** `G01`.
- **MANUAL BEATS:** `G01`–`G09` (9). **⛔ `S13_step00` deleted.**
- **AUTO MICROSEQUENCES:** `G02` three local-focus steps 1140 ms · `G03` five verbs 1100 ms · `G04` **the transaction 1400 ms** · `G09` **recomposition 1200 ms**.
- **PRIMARY ATTENTION:** `G01` the device · `G02` one named UI element at a time · `G03` the **active** verb · `G04` the travelling transaction · `G09` **the single device.**
- **DEVICE POSITION:** `G01` **centred** · `G02`–`G08` **stage-left third** · `G09` **returns to centre, grows slightly**.
- **DEVICE COUNT:** **1** throughout, plus **one backend plane** behind it from `G02`. **Never 2 devices.**
- **SHARED ELEMENTS:** the `$48.720` transaction (`finance.supermarket_movement` from `D02`/`D06`) · the device (from `F05`).
- **EXPOSURE:** the active verb `1.00`, the others `0.40`. The backend plane is spatially behind, never a peer card.
- **EXIT:** `G09` — the system recomposes into **one experience**.
- **NEXT-SCENE HANDOFF:** `DEVICE_TRANSITION` → `H01`. **⛔ NO re-mount.**
- **BACKWARD RESTORATION:** every stack element reverses to its `G05`–`G08` state; the transaction returns to the frontend.

### SCENE H — Barrier / Friction
- **ENTRY:** `H01` — the device from `G09`, **`1.00`, alone.**
- **FIRST STABLE STATE:** `H01`.
- **MANUAL BEATS:** `H01`–`H07` (7).
- **AUTO MICROSEQUENCES:** `H04` **everything clears, 360 + 500 ms** · `H05` `reset 520` + **`HOLD`**.
- **PRIMARY ATTENTION:** `H02`/`H03` the real route at `1.00`, device `0.75` · **`H04` the clean product at `1.00` with nothing around it** · `H06` the question alone.
- **DEVICE POSITION:** **stage-right**, `1.00`, throughout. **Never moves.**
- **DEVICE COUNT:** **1.**
- **SHARED ELEMENTS:** the device (from `G09`) · real route components. **⛔ Registry SE-15: no shared element to the Homi name.**
- **EXPOSURE:** the `MASTER §12 H0` curve: `100 % → 75 % → routes → 100 % on the clean device → 40 % prelude → black`. **⛔ Not the current inverted curve.**
- **EXIT:** `H06` the question, then `H07` black.
- **NEXT-SCENE HANDOFF:** `EDITORIAL` + black `HOLD` → `I01`.
- **BACKWARD RESTORATION:** the routes clear; the device returns to `1.00`; black is holdable.

### SCENE I — Homi
- **ENTRY:** `I01` — absolute black, **then the name `Homi` ALONE.** `hero 880 ms`.
- **FIRST STABLE STATE:** `I01` black. **Then the name alone.**
- **MANUAL BEATS:** `I01`–`I17` (17).
- **AUTO MICROSEQUENCES:** `I01` `reset 520` + `hero 880` · `I02` `spatial 500` + `exposure 360` · **`I06` execution 1400 ms** · `I09` laterals 500 ms · `I13` `spatial 500` + `500` · `I16` `exposure 360` + `reset 520`.
- **PRIMARY ATTENTION:** `I01` **the name alone** · `I02`–`I05` the chat · `I06` **the landed task** · `I07`–`I08` the question · **`I09` the extracted question ABOVE three devices** · `I11` the Finance figure · `I13` **both surfaces** · `I14`–`I16` **both actions**.
- **DEVICE POSITION:** `I02`–`I08` **stage-right (`718,25`), `1.08`** · **`I09` three devices: centre + laterals from behind** · `I11` a second device enters · **`I13` current exits UP, next enters from BELOW** · `I14`–`I16` the visual surface.
- **DEVICE COUNT:** **1 → 3 at `I09` → 2 at `I11` → 1 → 2 at `I13` → 1.** **Three is the maximum and it happens once.**
- **SHARED ELEMENTS:** `question.what_is_left_for_tomorrow` (box `777,187,238,81`, **extracted above the row at `56 px` at `I09`**) · `homi.proposal → planner.task` (**`I06`**) · `finance.supermarket_movement` (`I11`) · the visual HomePlus surface (`I13`).
- **EXPOSURE:** wordmark settles to **`0.40`** and stays · decision context `0.20` · **both actions `1.00`**.
- **EXIT:** `I16` — **`HOLD` WITHOUT CONFIRMING**, then black. **No mutation state exists.**
- **NEXT-SCENE HANDOFF:** `EDITORIAL` — one continuous breath into `J01`'s black.
- **BACKWARD RESTORATION:** ⛔ **the travelling task returns to the chat. No detached copy. No duplicate device. Three devices collapse to one.**

### SCENE J — Closing
- **ENTRY:** `J01` — **absolute black, held for all of Gaby's 24.5 s.** One `MANUAL` press, one long hold.
- **FIRST STABLE STATE:** `J01` black. **24.5 s.**
- **MANUAL BEATS:** `J01`–`J14` (14), of which `J08` is **five** triggers.
- **AUTO MICROSEQUENCES:** `J06` ghosts 1100 ms · `J11` **recession 1400 ms** · `J12` living moment 1210 ms.
- **PRIMARY ATTENTION:** `J02` the objects · `J03` the house · `J04` **the family** · `J05` the ghosts · `J07` **total stillness** · `J08` one word at a time · `J11` **the family, unmoved** · `J12` the living moment, no text.
- **DEVICE POSITION:** `J02`–`J04` objects `left-upper / right-middle / centre-lower` · `J04` family **inside the house, centred** · `J09`–`J10` organisation to the periphery · `J11` **the family does not move.**
- **DEVICE COUNT:** **0 throughout.** Phone **geometry** is *formed* from the organisation at `J10` and *dissolved* at `J11` — it is never a device on stage.
- **SHARED ELEMENTS:** `physical.heladera` `physical.insurance` `physical.bolsa` · `message.old_household` + `message.technician` as ghosts · `person.*` **all four, and they never move again.**
- **EXPOSURE:** objects `1.00` · ghosts `0.25–0.35` · organisation `0.55` · **the family always `1.00`.**
- **EXIT:** `J13` black → `J14` end card, three presses, **then infinite hold.**
- **NEXT-SCENE HANDOFF:** none. The film ends in a `HOLD`.
- **BACKWARD RESTORATION:** every object returns to its Scene A / B geometry. **During `J11`, the family group's geometry signature must be byte-identical forward and backward** — this is the film's thesis and it must be an automated test.

---

## 42. SCENE-BY-SCENE HANDOFF SUMMARY

| # | Boundary | From → To | Target family | Shared object | Device direction | Black? | Breath? |
|---|---|---|---|---|---|---|---|
| 1 | S01→S02 | exhaustion → *"ya existía"* | `EDITORIAL` | one household object | — | **yes** | **yes** |
| 2 | **S02→S03** | argument → **question** → answer | `EDITORIAL` + `HOLD` | none | — | **yes, held** | **yes** |
| 3 | S03→S04 | promise → Juli's Home | **`SHARED_ELEMENT`** | **Juli → Home of Juli** | lateral in | no | ✅ |
| 4 | S04→S05 | Home → Planner | **`REAL_NAV`** | — | **persists** | no | ✅ |
| 5 | S05→S06 | Juli → household | **`SHARED_ELEMENT`** | **the four members** | persists | no | ✅ |
| 6 | S06→S07 | household → **the limit** | `EDITORIAL` | 4 callbacks | **exits as a block** | **yes** | ✅ |
| 7 | S07→S08 | limit → birthday | `EDITORIAL` | the Plan | lateral in | no | ✅ |
| 8 | S08→S09 | *"qué comprar"* → *"el dinero"* | **`SHARED_ELEMENT`** | **the need** | **persists** | no | ✅ |
| 9 | S09→S10 | *"el dinero"* → *"la Play"* | **`SHARED_ELEMENT`** | **the movement row** | **persists** | no | ✅ |
| 10 | S10→S11 | memory → continuity | `EDITORIAL` + `HOLD` | — | exits | **yes** | ✅ |
| 11 | S11→S12 | continuity → how it is built | `DEVICE_TRANSITION` | **the device** | centred in | **yes** | ✅ |
| 12 | **S12→S13** | ⛔ **deleted** | **none** | — | — | ⛔ **no** | — |
| 13 | **S13→S14** | stack → friction | ⛔ **no transition** — **dim, never remount** | the same stack | — | ⛔ **no** | — |
| 14 | S14→S15 | question → Homi | `EDITORIAL` + `HOLD` | ⛔ **none (SE-15)** | in | **yes, held** | ✅ |
| 15 | S15→S16 | doing → knowing | **`SHARED_ELEMENT`** | **the question bubble** | **persists** | no | ✅ |
| 16 | S16→S17 | knowing → deciding | **`DEVICE_TRANSITION`** | — | **out UP / in BELOW** | no | ✅ |
| 17 | **S17→S18** | decision → closing | `EDITORIAL` + `HOLD` | — | exits | **yes, held 24.5 s** | ✅ |

**Counts:** `SHARED_ELEMENT` **6** · `REAL_NAV` **1** · `EDITORIAL` **7** · `DEVICE_TRANSITION` **2** · **no transition** **1** · black resets **7**.

---

## 43. OPEN QUESTIONS THAT ACTUALLY BLOCK IMPLEMENTATION

| # | Question | Blocks | Owner | Can Session 8 decide it? |
|---|---|---|---|---|
| **Q1** | **Does `family-avatars.svg` become four independently scalable elements, or do the absolute `105/110/115 %` scales get dropped?** | Scene A `A15`–`A17`, Scene J `J04` | build decision | ⛔ **NO — this is the one true motion blocker.** One 1310-byte composed asset with four avatars at fixed relative positions cannot support absolute scales. Session 8 must ask, not assume |
| **Q2** | **Does a persistent shared-element layer exist?** | `C05`, `D06`, `E04`, `I06` — four extractions that must survive | build decision | ⛔ **NO.** Session 7 states the requirement; it does not choose the architecture |
| **Q3** | **Is a larger device scale available at 1920×1080 projection?** | everything emphasis-related | — | ✅ **ANSWERED: no.** `1.08` is the ceiling; max compliant is `1.006`; `NO-UI §7`'s `820–880 px` cannot fit a 720 px canvas |
| **Q4** | **`S14`'s question typography — `112/68 px` or the frozen `88–96 px`?** | one token | copy owner | ⛔ NO. `H-P2` says keep it large; `H-10` says it is off-freeze. **Record both. Do not silently pick** |
| **Q5** | **Which order is spoken — Figma first or Figma fourth?** | which beat `G07` occupies | script owner (`G-06`, `SI-10`) | ⛔ NO. **But the choreography was designed so it does not matter: `G07` is its own `MANUAL` beat and moving one logo is a one-beat change** |
| **Q6** | **Does the closing use `mochila` or `bolsa` as its first object?** | `J02` | script owner (`J-04`, `SI-23`, `CF-20`) | ⛔ NO. **Session 7 choreographed recurrence from the set the opening actually established (`N-25`) and recorded that `mochila` has no antecedent** |
| **Q7** | **Is `Geni` or `Homi` spoken at L446?** | `I01`'s wordmark only | script owner (`J-18`, `SI-01`) | ⛔ NO. **Touches wording, not motion** |
| **Q8** | **Does a `→`-in-`HOLD` no-op conflict with the existing navigation contract?** | `M-14` | Session 8, from `navigation.ts` | ⚠ **POSSIBLY.** This is the one operability change that touches navigation behaviour, so Session 8 must read `navigation.ts` before implementing it |
| **Q9** | **Does `prefers-reduced-motion` degrade every new sequence acceptably?** | all 31 `AUTO` sequences | Session 8 | ⚠ **UNVERIFIED.** Session 1 recorded the block exists at `index.css:174` and never exercised it (`G7`). Scene G's `G02` local-focus chain and Scene I's `I06` execution are the two places where reduced-motion behaviour is load-bearing |

**Four of these (`Q4`–`Q7`) do NOT block implementation**, because the choreography was designed so either wording occupies the same beat.

---
## 44. VERIFICATION

Performed per `verifying-before-completion`: every claim above is backed by a command that ran and whose output was read, or is labelled **CITED** / **AUTHORED**.

| # | Claim | How it was verified | Result |
|---|---|---|---|
| 1 | Production unchanged | `_tooling/integrity.ps1 -Phase preflight` | **159 files · 2 572 474 B · 0 added · 0 removed · 0 SHA-256 changed · 0 mtime changed · PASS** |
| 2 | 8444 is the HomePlus presentation | `_tooling/verify.mjs` | `title = "HomePlus"`, `.presentation-canvas` `1280×720`, `--canvas-width 1280px`, first state `Chaos 0:0` |
| 3 | **85 states / 84 transitions** | `verify.mjs` forward walk | **85 · 84** · per-scene `11/7/1/6/4/6/2/5/5/5/3/3/4/5/5/5/4/4` · terminal `S18_step03` |
| 4 | **17 scene boundaries** | `motion.mjs` | `sceneBoundary = true` on **17** |
| 5 | Per-transition measurements | `motion.mjs` → `analyze-transitions.mjs` / `analyze-motion.mjs` | 84 × (4 in-flight frames at 30/100/200/320 ms + settled), full element snapshots |
| 6 | Concurrent-motion counts | `analyze-motion.mjs` | **26 transitions with ≥ 10 movers; worst 88; 15 with zero delta** |
| 7 | Device geometry constant | `verify.mjs` + `selectors.mjs` | `.phone-frame` `298×618` and screen `282×602` in **all 66** device states |
| 8 | **Safe-area breach at 1.08** | `attention.json` + `tokens.ts` | at `1.00` margins `50/50` compliant; at `1.08` margins `25/25.4` vs `safeArea 48`; max compliant = `624/620 = 1.006` |
| 9 | **N-02 confirmed at runtime** | `selectors.mjs` | tabs `81.16 / 81.69 px`; one frame `80.09 / 83.81`; pill `81.33 px`. **Max 84 px.** `137 px` struck |
| 10 | **N-10 confirmed mechanically** | `hold-back.mjs`, `verify.mjs` | `runningAnimations = 0` at **all 85 settled states, both directions**; every `getAnimations()` entry is `playState: "finished"` |
| 11 | **N-05 re-measured** | `selectors.mjs` | `S07_step01`: `.s07-statement` `688.81×274.53`, `132 px`, effective `1.00` |
| 12 | **N-17 re-confirmed visually** | `audit/runtime/session-01/states/S14_step04.png` read back | the settled frame is genuinely clean. **The `.s14-routes` `0.50` layer is DOM-painted but visually null** |
| 13 | **N-08 re-measured** | `selectors.mjs` | `S10_step04`: `.homecloud-photo-thumb` layout `98×62`, visual `105.84×66.96` at 1.08 = `98 × 1.08` exactly. **No authored enlargement** |
| 14 | **Stable-state invariant** | `hold-back.mjs` | **12 / 12** states stable at 0 / 10 / 30 s: geometry hash stable, text hash stable, doc scroll stable, 0 running |
| 15 | **Backward restoration** | `hold-back.mjs` | 85 backward states; **51 / 85** byte-identical; text **85/85**, device **85/85**, overflow **85/85** identical; **34** differ, all inside `.family-map-stage` |
| 16 | **S06 map mutation** | `selectors.mjs` + `attention.json` + screenshot `S06_step03.png` read back | `250×200 → 1080×520`; scroll `313×265 → 1350×689`; `.map-school` `92×32 → 219×82`; label `15px → 41.04px`; `.map-delay` `178.31×120.94` with `<strong>` at `64.8 px`; device effective opacity `0.12`; canvas `1450×789`; `41.04px "Colegio"` is top stage salience |
| 17 | **Selective exposure model** | `selectors.mjs` + screenshots `S08_step01.png` / `S08_step02.png` / `S08_step04.png` read back | `S08_step01` = model (`1.00` on `rgb(246,237,232)`, siblings `0.55`, heading `0.60`); `S08_step02` = **inverted** (`.s08-phone-slot` effective `0.6`, steps back to `1.00`); `S08_step04` = `19px → 21px` mutation |
| 18 | **S13→S14 remount** | `selectors.mjs` + `motion.mjs` + `attention.json` | `S14_step00`: `.s13-stage` and both `.s13-panel` at effective **`1.00`**; `0` interpolating animators; `88 entering / 57 exiting`; canvas `1280×720 → 1280×732` |
| 19 | **Homi name is 110 px in all 5 S15 states** | `selectors.mjs` | `.s15-title` box `259.55×110`, `font 110px`, `eff 1.00` at `S15_step00` … `step04` |
| 20 | **Forbidden titular is 56 px in all 5 S16 states** | `selectors.mjs` | `.s16-idea` ×2, box `540×60.47`, `font 56px`, `eff 1.00` at `S16_step00` … `step04` |
| 21 | **Homi bubble invariance** | `selectors.mjs` + Session 5 §13 #4 | box `777,187,238,81` identical across the three personas — **re-confirmed** |
| 22 | **14-state constant device** | `attention.json` | `718,25 324×669.6 scale 1.08` at **all 14** S15–S17 states; `deviceCount 1` throughout |
| 23 | **S17 confirms the mutation** | `selectors.mjs` | `S17_step03`: `.homi-done` effective `1.00` while `.s17-line` sits at `0.4` and `.s17-resolution` "La decisión es nuestra." at `1.00` |
| 24 | **Attention top-salience table** | `analyze-attention.mjs` (ancestor-aware probe) | 85 rows: top stage type, app type, exposure buckets, glow layer, `maxScale`, clipping |
| 25 | **A probe defect was found and fixed before acceptance** | first `attention` run vs `S04_step03.png` | the first run reported a `176 px "6"` in 37 consecutive states; the settled screenshot showed a clean frame; cause = ancestor `opacity: 0` is not reflected in a descendant's own computed `opacity`. **The probe was rewritten to walk the ancestor chain; every reported number is post-fix** |
| 26 | **Three-device arithmetic** | arithmetic on the measured device width + `safeArea 48` | `1184 − 972 = 212 → 106 px` per gap. **Feasible, exact** |
| 27 | **Pacing model** | word counts per block computed from `Guion Compartido (2).md` at 130 / 150 / 170 wpm | **1 921 words · 886.6 / 768.4 / 678.0 s**; 84 presses → 9.15 s/press at 150 wpm; 111 → 6.9 s |
| 28 | **Visual QA frames** | `frames.mjs` | **36 transitions × 5 PNG = 180** `before / 60 / 160 / 320 / settled` at 1280×720, plus 35 settled captures from `motion.mjs` = **215 PNG** under `audit/runtime/session-07/frames/` |
| 29 | **Deliverables are complete** | `build-*.mjs` | `07_TRANSITION_MATRIX.csv` **85 lines** (1 header + 84 rows, 28 cols) · `07_ATTENTION_MAP.csv` **86** (85 rows, 11 cols) · `07_TRIGGER_BEAT_MAP.csv` **112** (111 rows, 16 cols) · `07_SHARED_ELEMENT_REGISTRY.md` 15 candidates |
| 30 | Writes confined to `audit/**` | every write target in this session | all under `…\HomePlus_Presentacion_FINAL\audit\` |

### 44.1 Claims deliberately NOT made

- **No claim that any transition "lands on the right word."** There is no audio and no rehearsal. §33 is a **timing model**, not a sync measurement.
- **No claim about easing shape, overshoot, or intra-frame stagger order.** Frames were sampled at 4 instants, not captured as video (`G6`).
- **No claim about a real projector.** One engine, headless (`G7`).
- **No claim that `prefers-reduced-motion` works.** The block exists at `index.css:174` and was not exercised (`G7`) — see **Q9**.
- **No claim about pointer interaction.** The deck exposes no pointer affordances; only keyboard was tested (`G8`).
- **No quality verdict about the product, the copy, or the argument.** Sessions 2–6 own those.
- **No Product Truth invented, and no fake navigation recommended.** Every `real_nav_available = no` row in the shared-element registry is `EDITORIAL` or `SHARED_ELEMENT` by rule.
- **No implementation architecture chosen.** **Q1** and **Q2** are named as blockers with owners.

### 44.2 Two cross-session discrepancies recorded, not adjudicated

| # | Discrepancy | Status |
|---|---|---|
| 1 | `05_SCENES_I_J_AUDIT.md §4` reports `S14_step04`'s background as `#0B0908`; every other measurement in both `04` and `05` and this session's probe reports `#060404` | **NOT ADJUDICATED.** Session 7 measured the S14 field as near-black; the exact hex was not separately sampled. **`J-13` (`LOW`, `ACTIVE`) already covers "not literal black" — this is a variant of it, not a new finding** |
| 2 | Session 1's text-table row for `S10_step04` reports the device at `x = 718`; this session measured `x = 718, 25` | **RESOLVED IN FAVOUR OF 718.** Both agree |

### 44.3 One limitation of this session's own method, stated so it is not mistaken for a result

> **The ancestor-aware probe changes what "visible" means.**
>
> With the corrected probe, `S01_step00` reports **6 painted elements** rather than 0, `S07_step00` **4**, and `S11_step00` **4**. These are full-bleed wrapper elements (`#0B0908` / `#060404` / `.s11-bridge`) that paint a solid background. **They are not content.**
>
> **Therefore "0 painted elements" is a claim about *content*, not about *paint*.** Every statement in this report that says a state is empty means *no textual or product content is visible*, verified against a settled screenshot — not that the frame buffer is untouched. Session 8 must preserve this distinction when it writes the empty-state contract.

---
## 45. PRODUCTION FILES MODIFIED

# NONE

| Metric | Preflight | Final |
|---|---|---|
| Files in manifest | 159 | **159** |
| Total bytes | 2 572 474 | **2 572 474** |
| Added | 0 | **0** |
| Removed | 0 | **0** |
| SHA-256 content changed | 0 | **0** |
| Length changed only | 0 | **0** |
| mtime changed only | 0 | **0** |
| Byte + mtime identical | 159 / 159 | **159 / 159** |
| **Verdict** | **PASS** | **PASS** |

Manifest scope: every file under the package root except `node_modules/`, `audit/`, `.agents/`. Baseline: `audit/runtime/session-01/_integrity/manifest-after.csv`. This session: `audit/runtime/session-07/_integrity/manifest-{preflight,final}.csv`.

**All Session-7 writes are under `audit/**`:**

| Path | Contents |
|---|---|
| `audit/07_MOTION_STAGECRAFT_AUDIT.md` | this report (45 sections) |
| `audit/07_TRANSITION_MATRIX.csv` | 84 rows x 28 columns |
| `audit/07_ATTENTION_MAP.csv` | 85 rows x 11 columns |
| `audit/07_TRIGGER_BEAT_MAP.csv` | 111 rows x 16 columns |
| `audit/07_SHARED_ELEMENT_REGISTRY.md` | 15 candidates |
| `audit/runtime/session-07/_tooling/` | 11 audit-tooling files, **no installs** |
| `audit/runtime/session-07/_integrity/` | 2 SHA-256 manifests |
| `audit/runtime/session-07/data/` | 6 measurement artefacts |
| `audit/runtime/session-07/frames/` | 215 PNG |

**Forbidden paths untouched:** `src/**` · `assets/**` · `index.html` · `package.json` · lockfiles · `vite.config.*` · `tsconfig.*` · presentation production code · `Figma-app` · Integration · script · masters · Product Truth documents.

**Git:** no repository exists under `HomeplusPresentacion01` (`01_RUNTIME_BASELINE.md §15`). No `commit`, `merge`, `stash`, `reset`, `checkout`, `switch`, `rebase` or `clean` was attempted or possible.

**Packages installed: none.** `playwright-core` 1.63.0 was resolved out of `Figma-app`'s existing pnpm store. Python was not used. No formatter, no linter, no `--fix`.

**Processes:** port 8444 was already listening (PID 15644) and was **verified before use, never killed**. Port 8443 was **not touched**. No new dev server was needed.

---

## SESSION-7 HANDOFF

### A. GLOBAL MOTION SYSTEM

**8 tokens. Full specification in §38.**

| Token | Duration | Easing | Purpose |
|---|---|---|---|
| `micro` | 200 ms | `cubic-bezier(.22,.61,.36,1)` | one object needs a beat; local focus `100→s→100` at `108 %` / `115 %` |
| `enter` | 320 ms | `cubic-bezier(.22,.61,.36,1)` | an object arrives: `opacity` + `translate 0 12px→0` |
| `exit` | **260 ms** | **`cubic-bezier(.4,0,1,1)`** | an object leaves, **accelerating** |
| `exposure` | 360 ms | `cubic-bezier(.22,.61,.36,1)` | attention moves; bands `1.00 / 0.55–0.65 / 0.25–0.35` |
| `spatial` | 500 ms | `cubic-bezier(.22,.61,.36,1)` | a whole group or device moves in space |
| `reset` | **520 ms** | **`cubic-bezier(.4,0,1,1)`** | a chapter goes to absolute black, or returns |
| `shared` | **640 ms** | `cubic-bezier(.22,.61,.36,1)` | **one object changes context and keeps its identity** |
| `hero` | **880 ms** | **`cubic-bezier(.16,1,.3,1)`** | the HomePlus reveal and the Homi name. **Twice in the film** |

Plus an `AUTO_MICROSEQUENCE` envelope of **≤ 1400 ms**, composed only of these, always ending on a stable state.

**Four existing durations (`220 / 320 / 420 / 500`) are reused unchanged.** Only the exit and hero easing curves are new.

### B. SCENE-BY-SCENE TARGET CHOREOGRAPHY

§41 — one subsection per scene, each with ENTRY · FIRST STABLE STATE · MANUAL BEATS · AUTO MICROSEQUENCES · PRIMARY ATTENTION · DEVICE POSITION · DEVICE COUNT · SHARED ELEMENTS · EXPOSURE · EXIT · NEXT-SCENE HANDOFF · BACKWARD RESTORATION.

### C. TRANSITION FAMILY FOR EVERY MEANINGFUL HANDOFF

| Family | Count in the 111-beat target | Count in the 17 boundaries |
|---|---|---|
| `EDITORIAL` | 57 | 7 |
| `SHARED_ELEMENT` | 34 | 6 |
| `REAL_NAV` | 13 | 1 |
| `DEVICE_TRANSITION` | 7 | 2 |
| **no transition (delete)** | — | 1 |

Per-transition rows for all 84 current transitions: `audit/07_TRANSITION_MATRIX.csv`.

### D. TARGET MANUAL / AUTO TRIGGER MAP

`audit/07_TRIGGER_BEAT_MAP.csv` — **111 beats**: **80 `MANUAL`** stable states + **31 presses that launch an `AUTO_MICROSEQUENCE`**. Every beat carries its script anchor, its current state, its target, its hold, its shared element, its back behaviour, and its reason.

### E. TARGET STATE COUNT PER SCENE

**85 → 111** (`+26`). Per scene: A `19→17` · B `16→22` · C `5→7` · D `5→6` · E `5→7` · F `3→5` · G `7→9` · H `5→7` · I `14→17` · J `4→14`. **33 auto microsequences.**

### F. SHARED-ELEMENT REGISTRY

`audit/07_SHARED_ELEMENT_REGISTRY.md` — **15 candidates · 12 qualify · 1 currently preserved (`question.what_is_left_for_tomorrow`) · 1 explicitly rejected (`barrier.question` ↔ `homi.name`) · 1 blocked by `OPEN-8` (`person.*`)**. **Zero of the 12 currently survive a boundary.**

### G. DEVICE GRAMMAR

| | |
|---|---|
| **Standard** | `1.00` — `300×620 @ y 50`, safe-area compliant (`50 ≥ 48`) |
| **Emphasized** | `1.08` — `324×669.6 @ y 25`, and the **declared 23 px safe-area breach** |
| **Third scale** | ⛔ **NONE. Geometrically impossible** — max compliant is `1.006`; `NO-UI §7`'s `820–880 px` cannot fit a 720 px canvas |
| **Anchors** | two, by optical left edge: `x 250` and `x 730` at `1.00` |
| **Lateral movement** | only when the device's **role** changes. **Never** to make the same screen look different |
| **Centred** | whenever the device **is** the subject |
| **2 devices** | only at `I06` (auxiliary from a side) and `I13` (out UP / in BELOW) — **`MASTER §2.9`'s two frozen directions** |
| **3 devices** | only at `I09`. **Verified feasible: `972 + 2 × 106 = 1184` = the safe area exactly.** Never shrink them |
| **Maximum** | **3**, once |
| **Motion** | whole-device `transform` only, `spatial 500 ms`. **Never a layout-size change.** Device movement and internal motion must be separable |

### H. BLACK / RESET GRAMMAR

**Seven black states, all `MANUAL`-triggered `HOLD`\ s with no timer:** the opening · *"en la cabeza de alguien"* · **the founding question** · `S07`'s pause · Scene F's entry · **the Scene H prelude** · **the Homi reveal setup** · **Gaby's closing (24.5 s)**.

**Sequence: `exposure 360` → `reset 520` → `HOLD`. Never simultaneous.** ⛔ **No black at `S12→S13` or `S13→S14`.**

### I. EXPOSURE / ATTENTION GRAMMAR

Model = the measured `S08_step01`: **subject `1.00` on `--home-brand-soft`, siblings `0.55`, heading `0.60`, opacity only.**
Bands `1.00 / 0.55–0.65 / 0.25–0.35`. An exposure shift happens for exactly one of four reasons: *the subject arrived · the subject lost the floor · the context recedes · the chapter is ending.*
⛔ No blur as a default. ⛔ No glow as glue. ⛔ No "AI glow". ⛔ No dim-everything-to-black as focus. ⛔ No per-object bespoke opacities. ⛔ No narration-on-screen in Scenes C–D.

### J. BACKWARD RESTORATION CONTRACT

`ArrowLeft` restores the previous stable state. **Eight requirements, §18.5.** Currently **7 of 8 pass**; requirement 6 (zero residual `transform` on a hidden subtree) fails in **34 of 85** states and is a **prerequisite** for Scene B's target.

**Plus one operator rule (`M-14`): `→` inside a `HOLD` state is a no-op.** And `Esc` returns to the last `MANUAL` beat.

### K. MOTION BLOCKERS

**7 `BLOCKER`-severity motion findings**, plus **2 genuinely new root causes**:

| ID | One line |
|---|---|
| `M-01` | The deck has **no `shared` and no `hero` token**. `NO-UI §6`'s `520–760` and `700–1000` bands are empty. **→ `RC-19`** |
| `M-04` | S06 enlarges the map by **layout mutation out of its device**: `250×200 → 1080×520`, `15px → 41.04px`, device `→ 0.12`, canvas `→ 1450×789`, anisotropy `0.75 → 1.246` |
| `M-05` | **84 transitions, 0 shared elements.** Both extractions are 480 px slides |
| `M-06` | **12 of 17 boundaries are cross-mounts**, not transitions. `S13→S14` replays the whole stack at `1.00`. **→ `RC-20`** |
| `M-07` | **Seven required holds do not exist as states** |
| `M-10` | **14 states / 2 min 04 s with a device at identical `718,25,324,670`.** All three frozen `MASTER §2.9` directions unimplemented |
| `M-11` | **S17 confirms the mutation while the stage says the decision is ours** |

Plus `HIGH`: `M-02` (one curve for 84 transitions) · `M-03` (15 dead presses) · `M-08` (narration-on-screen is top salience in 37 states) · `M-09` (undeclared safe-area breach + no third scale) · `M-13` (26 transitions over budget) · `M-14` (`HOLD` not mis-press-safe).
Plus `MEDIUM`: `M-12` (hidden-subtree residue, 34 states).

### L. KEEP / DO-NOT-TOUCH LIST

**§37.** 25 × `KEEP AS-IS` · 9 × `KEEP CONCEPT` · 8 × `KEEP MECHANISM` · 4 × `KEEP TOKEN` · 7 geometries.

**`DO NOT TOUCH`:** S07's `132 px` (`N-05` binding) · the 12 finished `fill-mode: both` glows (`N-10`) · `#060404` · the stable-state invariant · `S08_step01`'s exposure values · S18's end card and its three separate triggers · the single-device default.

### M. OPEN QUESTIONS THAT ACTUALLY BLOCK IMPLEMENTATION

| # | Question | Owner |
|---|---|---|
| **Q1** | **Does `family-avatars.svg` become four independently scalable elements, or are the absolute `105/110/115 %` scales dropped?** This is the one true motion blocker in the film: one 1310-byte composed asset cannot support absolute scales. It blocks Scene A `A15`–`A17` and Scene J `J04` | build decision |
| **Q2** | **Does a persistent shared-element layer exist?** Four extractions depend on it (`C05`, `D06`, `E04`, `I06`). Session 7 states the requirement and does not choose the architecture | build decision |
| **Q8** | **Does a `→`-in-`HOLD` no-op conflict with the existing navigation contract?** The one operability change that touches navigation behaviour | Session 8, from `navigation.ts` |
| **Q9** | **Does `prefers-reduced-motion` degrade every new sequence acceptably?** 31 sequences, never exercised | Session 8 |

**Four copy/script questions do NOT block implementation**, because the choreography was designed so either wording occupies the same beat: **Q4** `S14` typography · **Q5** Figma's order (`G07` is its own press) · **Q6** the closing object vocabulary (`J02` uses only objects the opening established) · **Q7** `Geni` vs `Homi` (`I01`'s wordmark only).

**Q3 is already answered:** `1.08` is the ceiling, and `NO-UI §7`'s `820–880 px` cannot be executed on a 720 px canvas.

---

**END OF SESSION 7 — MOTION / STAGECRAFT / TIMING AUDIT**

*Session 7 defined required behaviour. It did not implement it, did not modify production, and did not start Session 8.*