# 08 — FINAL RECONSTRUCTION BLUEPRINT

**Issued:** Session 8 (Final Reconstruction Blueprint), 2026-10-05.
**For:** an implementer with strong implementation ability and **no design judgement**.
**Companion files:** `08_CINEMATIC_ENHANCEMENT_MAP.csv` (111 beats) · `08_MOTION_IMPLEMENTATION_ARCHITECTURE.md` · `08_IMPLEMENTATION_CHECKLIST.md` · `08_ACCEPTANCE_TEST_MATRIX.csv` · `08_PERFORMANCE_QA_SPEC.md`.

---

# 1. HOW TO USE THIS DOCUMENT

> ## THIS DOCUMENT IS PRESCRIPTIVE.
>
> ## DO NOT SUBSTITUTE DESIGN DECISIONS.
> ## DO NOT "IMPROVE" TARGETS BY PERSONAL PREFERENCE.
> ## DO NOT INVENT.
>
> ### IF BLOCKED: STOP AND REPORT.

Every instruction here is written so that a developer who has never seen this project, never saw the Figma target, and does not know what "premium" means can execute it correctly.

**How to read a beat.** Each beat in §20–§29 states, in this order:

| Field group | What it gives you |
|---|---|
| **PURPOSE / SCRIPT ANCHOR** | why the beat exists and the exact `Guion Compartido (2).md` line it serves |
| **BUILD** | exact visible content, exact product surface, exact dataset, object identities |
| **VERBS** | `KEEP` · `DELETE` · `MOVE` · `REPLACE` · `REBUILD` · `EXTRACT` · `LAND` · `DIM` · `RESTORE` · `PRESERVE` |
| **TRUTH** | Product Truth / master / `N-*` constraints that bind this beat |
| **FAMILY** | `REAL_NAV` · `EDITORIAL` · `SHARED_ELEMENT` · `DEVICE_TRANSITION` — the four only |
| **MOTION** | the full Part-II contract, in `08_CINEMATIC_ENHANCEMENT_MAP.csv` under `beat_id` |

**Where the numbers live.** The 111-row cinematic map is the machine-readable authority for attention, exposure, device position, timing, modifiers, settle, hold, backward restore, reduced motion, risk, hard limit, mechanism and acceptance test. **This document is the authority for content, truth, verbs and order.** Neither duplicates the other. If they appear to disagree, **the map wins on motion and this document wins on content.**

**Words you must not use in an implementation ticket:** "consider", "maybe", "could", "try", "something like", "cleaner", "prettier", "more premium". If an item is genuinely undecided it appears in §39 **Open Blockers** with an owner — nowhere else.

---

# 2. NON-NEGOTIABLE RULES

## 2.1 Implementer rules — read before touching a file

### DO NOT

- invent Product Truth;
- invent copy;
- invent navigation;
- invent data;
- invent new colours;
- redesign Figma UI;
- change shared semantic identity;
- animate layout for focus;
- change font-size during focus;
- add glows for attention;
- add particles;
- use 3D because it looks impressive;
- add a new dependency without blueprint approval;
- replace UI with images or screenshots;
- resolve an OPEN personally;
- skip a STOP GATE;
- move to the next phase after a FAIL.

### IF BLOCKED: **STOP.**

### REPORT:

1. exact **phase** (0–13);
2. exact **beat** (`A01`…`J14`) or exact global rule (`ARCH-01`…`ARCH-05`);
3. exact **requirement** (the sentence you were implementing);
4. exact **technical blocker**;
5. **evidence** (file:line, measured value, error text);
6. **smallest possible options** (at most three, each with its cost and what it would break).

### DO NOT improvise a substitute.

## 2.2 The five global architecture rules

| ID | Rule |
|---|---|
| **`ARCH-01`** | **The mount contract.** `.presentation-canvas` has exactly three permanent children: `scene-layer` · `shared-layer` · `veil-layer`. All 18 scenes stay mounted for the whole run. Every scene is in one of exactly **three lifecycle states** — `DORMANT` · `MEASUREMENT_READY` · `ACTIVE` — defined in §2.2.1. **No scene is ever unmounted.** A cross-mount is permitted **only at a `reset`**. |
| **`ARCH-02`** | **Motion is only ever the visible consequence of a semantic cause.** Every moving element must be able to answer: *what happened to it?* If nothing happened to it, it does not move. |
| **`ARCH-03`** | **No dependency.** React + WAAPI + CSS + inline SVG. `package.json` is not modified. See `08_MOTION_IMPLEMENTATION_ARCHITECTURE.md` §1. |
| **`ARCH-04`** | **No springs. No spring solver. No spring dependency. Easing only.** `NO_UI §5` forbids bounce; `07 §20` requires deterministic settle. Where a decelerating settle is described, the mandated wording is **`CRITICALLY-DAMPED FEEL VIA E-DEFAULT TAIL; NO SPRING SOLVER; NO OVERSHOOT.`** ⛔ The words *critically damped*, *spring*, *bounce* and *overshoot* are legal **only inside an explicit prohibition** and **only** within that constant. No timing value changes as a result. See `08_CINEMATIC_MAP_SCHEMA.md` §5. |

### 2.2.1 `ARCH-01` scene lifecycle — three states (binding, added Session 8.1)

⛔ **Why this subsection exists.** `ARCH-01` previously prescribed a single inactive-scene style containing `content-visibility:hidden`. That is **incompatible** with §5.3 / §10.3 / §30.2, which all require a **live** `targetSlotEl.getBoundingClientRect()` read of the destination slot *before* the object travels. A subtree under `content-visibility:hidden` applies size containment and must **not** be assumed to yield usable live destination geometry. Permanent mount was therefore never sufficient on its own: the destination also has to be **laid out and measurable** at the moment of measurement. This subsection closes that contradiction structurally. It adds no dependency and changes no choreography.

| | `DORMANT` | `MEASUREMENT_READY` | `ACTIVE` |
|---|---|---|---|
| `visibility` | `hidden` | `hidden` | `visible` |
| `pointer-events` | `none` | `none` | per presentation policy |
| `aria-hidden` | `true` | `true` | `false` |
| `content-visibility` | `hidden` | **`visible`** | `visible` |
| animates | **no** | **no** | yes |
| provides shared destination geometry | ⛔ **no** | ✅ **yes — this is its only purpose** | n/a |
| painted as active content | no | ⛔ **no** | yes |

⛔ **`DORMANT` is the resting state of every non-current scene.** A `DORMANT` subtree is **not measurable for shared geometry**, and any attempt to consume a `DORMANT` slot's rect is a **`BLOCKER`**.

⛔ **`MEASUREMENT_READY` exists for exactly one reason:** to give the shared-element flight an **exact live destination rect**. It participates in layout, it does not animate, it is `visibility:hidden` so it is not painted as active content, and it is `aria-hidden` so it is never announced. ⛔ It is **transient**: it exists only between step 2 and step 11 of the contract in §10.3.1. It is never a resting state and it is never left behind at a stable beat.

⛔ **Transition legality:** `DORMANT → MEASUREMENT_READY → ACTIVE`; `ACTIVE → DORMANT` (only when that scene's transition contract permits it); `MEASUREMENT_READY → DORMANT` on cancel. ⛔ **No other transition is legal**, and a stable state never leaves a scene in `MEASUREMENT_READY`.

⛔ **`content-visibility:hidden` is therefore permitted on exactly one lifecycle state: `DORMANT`.** Every prior statement in this document that described "inactive scenes" without naming a state is to be read as **§2.2.1**, which governs.
| **`ARCH-05`** | **Every `HOLD` is a state with a 600 ms mis-press guard.** See §9. |

## 2.3 Cinematic rules

| Rule | Statement |
|---|---|
| **`CINE-01`** | **Stable states are absolutely still.** No drift, no breathing, no looping glow, no shimmer, no idle particles, no continuous pulse, no carousel, no auto-advance, no `animation-iteration-count: infinite`, no timer. |
| **`CINE-02`** | **Premium through restraint.** An audience of technical reviewers rewards precision and stillness, not decoration. If a beat works with stillness, it ships with stillness. **41 of the 111 target beats carry `NONE — STILLNESS IS THE DESIGN.` and that is a design decision, not an omission.** |
| **`CINE-03`** | **No two PRIMARY subjects.** Every beat names exactly one `PRIMARY ATTENTION`, one `SECONDARY CONTEXT`, one `BACKGROUND`. Two primaries means the beat is wrong. The only exceptions are `I09` (three devices sharing **one** extracted question — the question is the single primary), `E06` (guarantee vs memory — one at `1.00`, one at `0.58`, so the primary is unambiguous) and `J08` (one word at a time, five separate triggers). |
| **`CINE-04`** | **Motion budget is hard.** Ordinary transition ≤ 2 meaningful movers. `SHARED_ELEMENT` ≤ 3. `DEVICE_TRANSITION` ≤ 2. Chapter reset = 1. `J11` ≤ 3 groups staged 120 ms apart, and **the family is not one of them**. `A05` = 3 per burst × 3 bursts. All-of-them moving is permitted **only** at `B07`, `B20`, `J06`, each with its reason recorded in the map. **Never recreate 88 simultaneous movers.** |
| **`CINE-05`** | **No repetition-as-style.** §32 audits technique reuse. A technique used so often it becomes visible as a trick is a defect, not a system. |
| **`CINE-06`** | **Typography never out-shouts product UI during a product scene.** See §11.7. |
| **`CINE-07`** | **No fake capability.** No fake tap, no fake loading, no fake latency, no fake typing, no fake waveform, no gradient photo stand-in, no simulated navigation. |
| **`CINE-08`** | **UI is never an image.** The presentation is composed of real editable layers. Shared-element continuity requires real geometry. |

---

# 3. AUTHORITY MODEL

Read `00_AUDIT_NORMALIZATION.md` §"Consumption rule" first. It is binding.

## 3.1 Product capability

| Rank | Authority | Role | Overridable? |
|---|---|---|---|
| 1 | **latest frozen Product Truth** | what the product may claim | — |
| 2 | **Integration** | what exists today (CURRENT evidence) | never by rank 3 |
| 3 | **Figma-app** | how it should look | **never creates Product Truth** |

## 3.2 Presentation

| Rank | Authority |
|---|---|
| 1 | Product Truth constraints |
| 2 | `HOMEPLUS_PRESENTATION_MASTER_FREEZE_V1.0.md` |
| 3 | `HOMEPLUS_PRESENTATION_NO_UI_MASTER_FREEZE_V2.0.md` |
| 4 | `Guion Compartido (2).md` |
| 5 | current presentation runtime |
| 6 | human walkthrough |

## 3.3 Normalization

`N-*` entries in `00_AUDIT_NORMALIZATION.md` override older audit statements **for the exact fact each one names, and nothing else**. ⛔ **"Newer file wins" is not authority** (`N-16`). ⛔ A Figma limitation never rewrites canon (`N-23`). ⛔ Code existence never creates Product Truth (`N-35`). ⛔ File date contributes only in `N-38`, and only because that document also self-declares supersession.

## 3.4 The 15 binding capability rules

Reproduced from `00_SESSION7_GATE.md` §8.2. Every beat obeys these.

| # | Rule | Authority |
|---|---|---|
| 1 | ⛔ **No Shopping List as a capability.** Show `LOW/OUT → Restock Need PENDING → approval → canonical Planner Task`. | `INVENTORY:802,977,2120` · `N-06` |
| 2 | ⛔ **No ETA, no distance, no travel time, no global family location master switch.** Show place · recency · presence/status · sharing state. Figma map pins are illustrative positions, not geography. | `N-03` + `N-30` |
| 3 | ✅ Feed capability is approved; visual target and implementation are gaps. Represent **editorially**. ⛔ Never label Conversation as the Feed route. ⛔ Never label anything "Feed". | `FEED:34` · `N-36` |
| 4 | ✅ **ONE Home + a presentation-controlled role projection.** ⛔ No separate "Home Juli" module. | `INV-HOME-002 :961/:965` · `N-34` |
| 5 | ⛔ **No standalone `Horarios` surface.** Use Planner / Calendar / Event. ⛔ No 4th Planner tab. ⛔ No Milestones. | `N-35` · `N-38` |
| 6 | ✅ Assets = supported target + implementation gap. ⛔ `Home → Assets → PS5 → Documentos` is **not** real navigation. | `ASSETS_V2:5` · `N-13` · `N-31` |
| 7 | ✅ Assets/HomeCloud relation is editorial / shared-element / device-transition until the cross-module link closes. | `MASTER:237` · `N-31` |
| 8 | ⛔ **No Asset-owned money, date or maintenance field.** `Mar 2024 · $580.000` appears **only** as a Finance movement. Only `Garantía` is a real Asset Record. | `ASSETS_V2:347/886` · `N-37` |
| 9 | ✅ HomeCloud audio is approved. ⛔ **No fake waveform.** | `HC_V2:316` vs `:334` · `N-29` |
| 10 | ⛔ **Do not imply an automatic Shopping→Finance pipeline.** The `Supermercado` row is a quiet ledger fact already present. | `INVENTORY:1050-1059` · `N-32` |
| 11 | ✅ Finance is safe and mature — the only module presentable without caveat. Use the `N-22` dataset consistently. | `N-22` · `D-08` |
| 12 | ✅ Homi = concept / intended capability, not verified current implementation. Choreograph conceptually. | `N-14` + `N-21` |
| 13 | ⛔ The present-tense AI stack claim is unsafe. `G-12` stays ACTIVE. | `N-14` · `SI-11` |
| 14 | ⛔ **No fake cross-module taps.** `REAL_NAV` only where real nav exists. Only `Plan → Task` and `Payment → Movement` are both real. | `MASTER:34,113-124` · `N-33` |
| 15 | ✅ Same semantic datum = same visual object. ⛔ Never invent a new closing object vocabulary. | `MASTER §2.5` · `N-25` |

## 3.5 The `N-*` corrections that change a build decision

| ID | One-line | What you must do differently |
|---|---|---|
| `N-02` | Planner tabs max 84 px; the **pill** translates | never animate tab width |
| `N-05` | **S07's 132 px is binding** | never normalise it to 56–72 px |
| `N-08` | HomeCloud thumbnails have **no** authored enlargement | never "focus" a thumbnail; use whole-device scale |
| `N-09`/`N-41` | device scale: S01–S09 `1.00` · **S10, S15–S17 `1.08`** · S11–S14 none · S18 none | the scale table in §11.1 |
| `N-10` | `getAnimations().length` is not a motion metric | classify by `playState` |
| `N-17` | text-table harvests are **not** admissible for visibility | only settled visual evidence |
| `N-22` | Finance dataset **RESOLVED** | §23 dataset, exactly |
| `N-23` | `19:00` is valid canon | never change it to `18:00`/`20:30` |
| `N-24` | `#E7643F` is the brand orange; `#E65C1B` is stale | replace the token in `design-system/tokens.ts:9` |
| `N-29` | HomeCloud audio **approved**; the live rule is `no fake waveform` | delete the drawn waveform, keep an audio entry |
| `N-35` | no `Horarios` surface | never add a 4th tab |
| `N-37` | Assets owns no money/date/maintenance | never put `Mar 2024 · $580.000` on the Asset card |
| `N-38` | Milestones retired | never present them |
| `N-43` | raw severity is never overwritten | when reporting, print both axes |

---

# 4. CURRENT → TARGET SUMMARY

| Metric | Current | Target | Δ | Authority |
|---|---|---|---|---|
| Stable states forward | **85** | **111** | **+26** | `07 §40` |
| Adjacent transitions | 84 | 110 | — | — |
| Scene boundaries | 17 | **16** (S12→S13 deleted) | −1 | `07 §19` #12 |
| `MANUAL` beats | — | **80** | — | `07 §15.1` |
| `AUTO_MICROSEQUENCE` | 0 | **31** | +31 | `07 §15.3` |
| Shared elements crossing a boundary | **0 / 84** | **13 of the 15 registry IDs** | +13 | `07 §29.1` |
| Distinct motion tokens | 4 + 1 curve | **8 + 1 envelope + 3 curves** | +4 | `07 §13.2` |
| Dead presses | **15 / 84** | **0** | −15 | `07 §8.2`, `M-03` |
| Transitions with a layout mutation | 32 / 84 | **0** | −32 | `07 §8.1` |
| Transitions with a font-size mutation | 9 / 84 | **0** | −9 | `07 §8.1` |
| Max simultaneous movers | **88** | **3** | −85 | `07 §14.2` |
| Canonical device scales | 0.96 / 1.00 / 1.08 | **1.00 / 1.08 only** | −1 | §11.1, `M-09` |
| Narration-on-screen beats that are top salience | **37 states** | **0** | −37 | `M-08` |
| Runtime libraries | React only | **React only** | 0 | `ARCH-03` |
| Dependencies added | — | **0** | 0 | §42 |
| Production files modified by this audit | — | **0** | 0 | §40 |

## 4.1 Per-scene state budget

| Scene | Current | Target | Δ | Why |
|---|---|---|---|---|
| A Chaos · Fragmentation · Reveal | 19 | **17** | −2 | delete the slogan state, the 6-logo states and 6 dead accumulation presses; add the founding-question black, icon-alone, hero reveal, four people, equality, house, Juli→Home |
| B Home · Planner · Familia · Coordinar | 16 | **22** | +6 | add `B07` scope-widening bridge, `B13` consequence, `B14` two questions, `B19` retention, `B22` four callbacks |
| C Plans / Inventory | 5 | **7** | +2 | add the Restock-Need beat; split extraction from arrival |
| D Finance | 5 | **6** | +1 | delete 4 narration text states; add `Nuevo movimiento` and `Límites` |
| E Assets / HomeCloud | 5 | **7** | +2 | add the two-state warranty/memory composition (`E-04` BLOCKER) |
| F Continuity | 3 | **5** | +2 | add six abstractions + ≤3 relations, and the everyday return; end on the product |
| G Frontend / Backend / Stack | 7 | **9** | +2 | delete `S13_step00` (dead press); add the backend plane and the recomposition |
| H Barrier / Friction | 5 | **7** | +2 | add the clean product state (`H-04` BLOCKER) and the black prelude (`H-07`) |
| I Homi | 14 | **17** | +3 | add the three-device comparison, the Finance grounding, the visual-UI surface |
| J Closing | 4 | **14** | +10 | `J-01` BLOCKER: 207 words over 4 states |
| **TOTAL** | **85** | **111** | **+26** | |

**Pacing derivation, binding:** `768.4 s ÷ 111 = 6.9 s per press` at 150 wpm. `07 §40.1` sets the band `4.5–8.0 s`, midpoint ~6 s. Per scene: A 4.7 · B 8.3 · C 6.5 · D 9.7 · E 8.1 · F 5.9 · G 9.3 · H 3.6 · I 7.3 · J 5.9. D and G exceed 8 s **and are accepted**, because in D the presenter describes real Finance surfaces and in G a backend transaction — beats where something genuinely changes. **Long beats with something changing are not the problem. Long beats with nothing are.**

## 4.2 Documented deviation from Session 7's per-family tally

`07 §C` publishes `EDITORIAL 57 · SHARED_ELEMENT 34 · REAL_NAV 13 · DEVICE_TRANSITION 7`. Mechanically re-parsing Session 7's own `07_TRIGGER_BEAT_MAP.csv` yields **`EDITORIAL 58 · SHARED_ELEMENT 33 · REAL_NAV 13 · DEVICE_TRANSITION 7`** — i.e. §C's summary was off by one in both `EDITORIAL` and `SHARED_ELEMENT`. The register is the authority (`N-42`).

`08_CINEMATIC_ENHANCEMENT_MAP.csv` yields **`EDITORIAL 59 · SHARED_ELEMENT 33 · REAL_NAV 12 · DEVICE_TRANSITION 7`**. The single delta against the register is **`B01`**:

| Source | `B01` family |
|---|---|
| `07_TRIGGER_BEAT_MAP.csv` row `B01` | `REAL_NAV` |
| `07 §41` Scene B "NEXT-SCENE HANDOFF" | `SHARED_ELEMENT` |
| `07 §42` boundary 3 (S03→S04) | **`SHARED_ELEMENT`** |

**Decision: `B01 = SHARED_ELEMENT`.** Juli crosses from the Scene-A stage into the Home account row; no navigation occurs. Two of the three Session-7 locations agree and the third is a register slip. Recorded, not silently absorbed.

---

# 5. GLOBAL ARCHITECTURE

Read `08_MOTION_IMPLEMENTATION_ARCHITECTURE.md` in full before writing code. This section is the summary an implementer needs to structure the work.

## 5.1 The three layers

```
.presentation-canvas                       (1280 x 720, overflow hidden, isolation isolate)
├── scene-layer      z-index 1
│   ├── <div data-scene-id="S01" data-active>  S01Chaos
│   ├── <div data-scene-id="S02" data-active>  S02FragmentedInfo
│   ├── … 18 total, all mounted, all derived from presentationConfig.slides
├── shared-layer     z-index 2
│   └── 0..2 airborne shared objects (never a device, never UI chrome)
└── veil-layer       z-index 3
    └── one element; only opacity animates; owns all black HOLD states
```

⛔ **The `veil-layer` is a single element.** Delete `opening.css`'s `.opening-blackout` and `s18-veil-in` as separate mechanisms and replace with this one element. **Nine black states, one mechanism.**

## 5.2 What each scene component receives

Today: `{ stepIndex: number }`.
Target:

```
SlideProps = {
  stepIndex : number
  beat      : BeatDefinition     // so no scene infers meaning from an index
  hold      : boolean
  reduced   : boolean
}
```

⛔ **No scene may branch on a raw `stepIndex` number.** Every scene branches on `beat.id` or `beat.hold`. This is what makes "111 named beats" real rather than nominal.

## 5.3 The shared-layer contract in one paragraph

A scene renders a shared object **in place** at its rest position. When the beat says the object crosses, the promoter (a) measures the live rect of the source element, (b) `appendChild`s that element into `shared-layer` preserving its painted geometry, (c) creates a placeholder slot in the destination **at the destination's real geometry**, (d) animates the object to the slot with WAAPI over `shared 640`, (e) `slot.replaceWith(object)` to hand it back, (f) clears the inline transform. On any interruption, step (e) is replaced by re-attaching to the **origin** slot. Full algorithm: `08_MOTION_IMPLEMENTATION_ARCHITECTURE.md` §6.4.

⛔ **Step (c) is a contract, not a sentence.** "The destination's real geometry" is only obtainable if the destination scene is **laid out and measurable** at that instant. Under `ARCH-01` the destination is always *mounted*; under `ARCH-01 §2.2.1` it must additionally be promoted **`DORMANT → MEASUREMENT_READY`** and a deterministic layout-ready signal awaited before the rect is read. ⛔ A `DORMANT` destination is **not** measurable, and its rect must never be consumed. Full order: **§10.3.1**.

---

# 6. SELECTED MOTION STACK

| Concern | Choice | Rejected |
|---|---|---|
| Micro primitives (≤ 360 ms, single property) | **CSS transitions / `@keyframes`** | WAAPI (heavier for this), GSAP |
| Sequence orchestration | **Web Animations API** — one `Microsequence` controller | GSAP Timeline, Motion, Anime.js |
| Shared-object geometry | **real-DOM reparenting + WAAPI FLIP** | GSAP Flip (buys ~90 known lines; would own `transform`) |
| Editorial vector | **inline SVG + `stroke-dashoffset` via CSS** | GSAP SVG tooling, MotionPath, Rive, Lottie |
| State engine | **the existing `useReducer` + pure `navigate()`, extended** | Theatre.js (authoring aid for 8 frozen numbers), View Transitions (cannot express identity across a reparent; breaks restoration testability) |
| Physics | **easing only** | ⛔ **no springs, no spring solver** (`NO_UI §5` forbids bounce; `07 §20` requires determinism) |

**New runtime dependencies: 0.** `package.json`, both lockfiles, `vite.config.ts`, `tsconfig.json` are untouched.

**One new CSS at-rule:** `@property --phone-scale { syntax: '<number>'; inherits: true; initial-value: 1; }` — mandatory, because CSS custom properties are not interpolable and every whole-device scale change depends on it.

---

# 7. STATE ENGINE

## 7.1 State shape (final)

```
PresentationState = {
  slideIndex      : number                  // 0..17
  stepIndex       : number                  // 0..beats.length-1
  guardUntil      : number                  // epoch ms; HOLD mis-press guard expiry
  lastManual      : { slideIndex, stepIndex }
  flightId        : number | null           // non-null while an AUTO_MICROSEQUENCE runs
  queuedAdvance   : 0 | 1
  reduced         : boolean                 // mirrors prefers-reduced-motion
}
```

## 7.2 The two rules that must never be violated

1. **`lastManual` updates only on arrival at a *stable* state**, never mid-sequence. `Esc` depends on it.
2. **`flightId` is the only source of truth for "a sequence is running".** No component-local `setTimeout`, no `useRef<boolean>`, no CSS `animationend` as the arbiter.

## 7.3 `presentationConfig` becomes beat-addressable

`stepCount` is **derived** from `beats.length` so the two can never disagree. Every beat carries its `id` (`A01`…`J14`), its `hold` flag and its `trigger`. The full beat list is `08_CINEMATIC_ENHANCEMENT_MAP.csv` — **the map *is* the config**, one row per beat, in press order.

---

# 8. TRIGGER ENGINE

| Trigger | Count | Rule |
|---|---|---|
| `MANUAL` | **80** | One press = one idea the speaker says. Test: *can the presenter say the line that goes with this beat, and would omitting the press break a sentence?* If no, the beat is wrong. |
| `AUTO_MICROSEQUENCE` | **31** | One press starts it, it runs itself, **it ends on a stable state**, it never advances an idea, never a paragraph, never a scene, never a product claim. |
| `HOLD` | every beat holds | A stable state remains indefinitely. **No timer. No auto-advance.** |

## 8.1 `AUTO_MICROSEQUENCE` rules (all nine, binding)

1. One press starts it. Nothing else does.
2. Total ≤ **1400 ms**.
3. It ends on a stable state. Never mid-flight.
4. It may contain only tokens 1–8. No ad-hoc durations.
5. It may not change the narrative position.
6. It may not be interruptible in a way that leaves residue.
7. It may not be required for comprehension — if the audience misses it entirely, the meaning survives.
8. One concurrent subject per step, except where group motion **is** the concept (`B07`, `B20`, `J06`).
9. `ArrowLeft` restores the pre-sequence state completely.

## 8.2 The 31 authorised sequences

| Beat | Sequence | Total |
|---|---|---|
| `A05` | saturation: 3 bursts, last fastest | 1100 |
| `A07` | clear to absolute black | 360 |
| `A12` | founding-question reset to true black | 520 |
| `A13` | HomePlus **icon alone** | 320 |
| `A14` | **hero reveal** | 880 |
| `B03` | Juli identity shared-element arrival | 640 |
| `B07` | **scope widening** Juli → household | 1400 |
| `B10` | Planner selection-pill translate | 320 |
| `B20` | product stage exits as one block | 220 |
| `C05` | **bridge task extracted** Plan → Inventory | 640 |
| `D06` | **PS5 movement row extracted** Finance → Asset | 640 |
| `E04` | **document extracted** Assets → HomeCloud | 640 |
| `E06` | warranty/memory exposure swap, sequential | 600 |
| `E07` | exposure-down, then reset to black | 880 |
| `G02` | three local-focus steps: 108 → 115 → 110 → 100 | 1140 |
| `G03` | five backend verbs, one active at a time | 1100 |
| `G04` | **the `$48.720` transaction travels and is validated** | 1400 |
| `G09` | **recomposition into one experience** | 1200 |
| `H04` | **everything clears** to one clean product state | 860 |
| `H05` | reset to black, then hold | 520 |
| `I01` | reset to black, then the Homi name | 880 |
| `I02` | device enters; wordmark settles to `0.40` | 860 |
| `I06` | **proposal → Planner auxiliary device → task detaches → task lands** | 1400 |
| `I09` | two laterals emerge from behind the centre device | 500 |
| `I13` | device exits UP, next enters from BELOW | 1000 |
| `I16` | exposure down, then reset to black | 880 |
| `J01` | reset to black, then hold ~24.5 s | 520 |
| `J06` | ghosts: dashed lines 300 → hold 400 → fade 400 | 1100 |
| `J11` | **frame 300 → scale 100→82 % 550 → opacity 100→0 550** | 1400 |
| `J12` | **flash 110 → photo frame 300 → hold ~800** | 1210 |

**These 31 absorb motion that today costs the presenter 15 dead presses** (8 in Scene A alone).

## 8.3 Operator grammar

| Key | Contract |
|---|---|
| `ArrowRight` / `Space` | advance one beat; if it lands on a stable state, set `lastManual`; if it launches a sequence, set `flightId` and do **not** touch `lastManual` |
| `ArrowRight` / `Space` during a sequence | queue **at most one**; consume on settle |
| `ArrowLeft` | **first** `cancelFlight()`, **then** restore `lastManual` |
| `ArrowLeft` at `slideIndex 0, stepIndex 0` | no-op |
| `Esc` | `cancelFlight()` if in flight, then restore `lastManual` exactly. If already there, no-op. **The presenter's panic key.** Must always do something recoverable. |
| any key held | **nothing repeats.** `event.repeat` is already filtered at `Presentation.tsx:25` — **preserve that line** |
| `Esc` must be checked **before** the modifier and focusable filters in `navigationAction()` |

---

# 9. HOLD PROTECTION — Q8 FINAL

## 9.1 The protected `HOLD` beats

`HOLD` is a property of **every** beat (all stable states hold indefinitely). The list below marks the beats where **a mis-press is semantically destructive**, which is what the guard arms on.

| Beat | What is held | Approx. spoken length |
|---|---|---|
| `A01` | the opening black | ~6 s |
| `A06` | Scene A collective quiet — **one spoken judgement** | ~4 s |
| `A07` | Scene A clear to black | ~4 s |
| `A12` | **the founding question over black** — the whole of L41–L43 | **~4–5 s** |
| `B20` | `#060404` after the product block exit | ~5 s |
| `B21` | the 132 px statement | ~7 s |
| `F01` | Scene F entry black | ~3 s |
| `H05` | **the Scene H prelude over black** | ~4 s |
| `I06` | **the landed task — nothing confirms** | indefinite |
| `J01` | **Gaby's whole closing black** | **~24.5 s** |
| `J07` | total stillness + the orange line | ~12 s |
| `J14` | the end card | **infinite** |

**12 protected beats. `07 §15.1` counts `HOLD` as a property of all 111 states plus 6 dedicated black states; the 9 dedicated black states are `A01` `A07` `A12` `B20` `F01` `H05` `I17`/`J01` `J13`.**

## 9.2 The guard — exact contract

| Phase | Behaviour |
|---|---|
| Arrival at a protected beat | `state.guardUntil = now + 600` |
| `NEXT` while `now < guardUntil` | **return the identical state object.** No-op. No side effect. |
| `NEXT` while `now >= guardUntil` | advance normally |
| `keydown` with `event.repeat === true` | ignored — already true, preserved |
| `keydown` with `event.repeat === false` inside the guard | ignored by the guard; **keyup is still observed** so the next real press works |

**Why `600 ms`:** above the deck's longest sampling interval (`560 ms` in the Session-7 frame rig), below the shortest target spoken beat (`6.9 s`), and `1.5×` the `400 ms` lower bound of `MASTER §2.8`'s *"hold emocional: 400–900 ms"* — so a presenter who intends to leave the hold is never blocked.

## 9.3 Implementation contract

- `navigate(state, action, deck, now)` — **4-arity, pure, `now` injected.** ⛔ No `Date.now()` inside `navigate()`. Unit-testable with a fake clock (`T-NAV-04`).
- `navigationAction()` returns `'CANCEL'` for `Escape` **first**, unconditionally.
- The guard state lives in the reducer, not in a component ref.

## 9.4 `PREVIOUS` restores, it never reverses

`ArrowLeft` **sets the state to the previous stable beat** and lets the entry transition play. It never plays the forward animation backwards. Rationale: reverse-playing a `SHARED_ELEMENT` leaves the object detached; a state set makes restoration exact and testable.

---

# 10. SHARED-ELEMENT LAYER

## 10.1 The 15 registry IDs — build status

| # | `semantic_id` | Verdict | Where it crosses |
|---|---|---|---|
| SE-01 | `physical.heladera` | **BUILD the asset** — none exists | `A04` → `J02` |
| SE-02 | `physical.insurance` | **KEEP** `insurance-document.svg`; fix the HomeCloud identity | `A02` → `J02` |
| SE-03 | `physical.bolsa` | **KEEP** `grocery-bag.svg` | `A03` → `J02` |
| SE-04 | `message.old_household` | **CREATE** — it does not exist today | `A10` → `J05` |
| SE-05 | `message.technician` | **REBUILD** — copy is `FEED:232`, safe to show | `B18` → `J05` |
| SE-06 | `birthday.event` | **REBUILD** with `19:00` | `B11` → `C01` → `I15` |
| SE-07 | `inventory.missing_item` | **REBUILD** | `C03` → `C05` → `C06` |
| SE-08 | `finance.supermarket_movement` | **CREATE** — absent today | `D02`/`D06` → `G04` → `I11` |
| SE-09 | `finance.ps5_movement` | **CREATE** — absent today | `D06` → `E01` |
| SE-10 | `asset.ps5.documents` | **REBUILD** — one instance, not two | `E03` → `E04` |
| SE-11 | `warranty.ps5` | **REBUILD** | `E02` → `E06` |
| SE-12 | `birthday.memory` | **REBUILD** with the correct date | `C01` → `E05` |
| SE-13 | `person.juli / .tomi / .mama / .papa` | **SPLIT into four** — §10.2 | `A15` → `B02` → `B07` → `B12` → `B22` → `J04` |
| SE-14 | `question.what_is_left_for_tomorrow` | **KEEP** — the only one already correct | `I07` → `I08` → `I09` |
| SE-15 | `barrier.question` ↔ `homi.name` | ⛔ **REJECTED — do not build** | never |

**Counts:** 15 investigated · 12 qualify · 1 already correct (`SE-14`) · 1 explicitly rejected (`SE-15`) · 1 build decision now closed (`SE-13`) · **12 to build, 1 to reject.**

## 10.2 `Q1` — the four family avatars: **SPLIT INTO FOUR**

`family-avatars.svg` is a single 1310-byte SVG with four `<g>` groups at `translate(0 5)`, `translate(66 0)`, `translate(132 10)`, `translate(198 14)`. `MASTER §2.6` and `NO_UI §6` require **absolute** scales `105 % → 110 % → 115 %`, never accumulated. One composed asset cannot support independent absolute scales.

**Decision — three parts:**

1. **Preserve the artwork path-for-path.** ⛔ Do not redraw, restyle, recolour or re-proportion. Existing palette to match exactly: `#302922` `#45362A` `#B57956` `#718374`.
2. **Convert the SVG to inline JSX**, keeping all four `<g>` groups as separate elements each with its own `transform`. Do **not** create four files and do **not** re-author. Circle radii already differ (`42`, `42`, `40`, `39`) and carry the age hierarchy — preserve them.
3. **Each `<g>` gets `transform-box: fill-box; transform-origin: center;`** so `scale()` acts about the avatar's own centre, not the SVG origin. Without this, a `115 %` on Juli would translate her 66 px.

**Result:** `person.juli` · `person.tomi` · `person.mama` · `person.papa` become four independently scalable, independently focusable, independently shared layers. `SE-13` is closed. `OPEN-8` is closed.

## 10.3 Ownership cycle (binding)

```
SOURCE owns object
→ promote to shared-layer          (measure live rect; reparent the real node)
→ animate geometry                 (WAAPI, shared 640, one instance)
→ LAND                             (slot.replaceWith(object); clear inline transform)
→ DESTINATION owns object
```

⛔ **A scene cross-mount must never destroy an object during a required shared transition.** `ARCH-01` makes the destination scene structurally present; `ARCH-01 §2.2.1` makes it **measurable** at the moment of measurement. Those are two different guarantees and both are required.

⛔ **No shared element is licence for a fake tap.** Every row with `real_nav_available = no` is `EDITORIAL` or `SHARED_ELEMENT`, never `REAL_NAV`.

## 10.3.1 Shared prepare / measure contract (binding, added Session 8.1)

⛔ **This is the executable form of §5.3 step (c).** It runs **before every cross-scene `SHARED_ELEMENT` flight**, in this exact order. It is implemented verbatim in `08_MOTION_IMPLEMENTATION_ARCHITECTURE.md` §6.4 as steps 0a–0f.

| Step | Action | Obligation |
|---|---|---|
| 1 | **source** remains `ACTIVE` | the object is still owned and painted by the source scene |
| 2 | **destination** `DORMANT → MEASUREMENT_READY` | `content-visibility:visible`; still `visibility:hidden`, `aria-hidden`, `pointer-events:none` |
| 3 | **commit** the destination's target beat / layout | the beat state is set before any rect is read, never after |
| 4 | **await a deterministic layout-ready signal** | ⛔ **not `setTimeout`**. Use `ResizeObserver` on the destination slot, or `requestAnimationFrame` **after** the commit, or WAAPI `startTime` on the common `document.timeline` |
| 5 | obtain `targetSlotEl` | ⛔ null ⇒ go to **BLOCK** |
| 6 | `const r = targetSlotEl.getBoundingClientRect()` | the **only** permitted source of destination geometry |
| 7 | **assert** `r.width > 0 && r.height > 0 && Number.isFinite(r.x) && Number.isFinite(r.y)` and that `r` lies inside the expected canvas coordinate space | any assertion failure ⇒ **BLOCK** |
| 8 | **promote** the single semantic object to `shared-layer` | `appendChild` of the live node; exactly **one** instance |
| 9 | **run the shared flight** | §10.3 ownership cycle; `WAAPI`, `shared 640` |
| 10 | **land** into the destination slot | `slot.replaceWith(object)` |
| 11 | **destination** `MEASUREMENT_READY → ACTIVE` | `visibility:visible`, `aria-hidden=false` |
| 12 | **source** `ACTIVE → DORMANT` | **only when its transition contract permits it**; otherwise the source stays `ACTIVE` |
| 13 | **verify** `shared-layer` is **empty** at the stable state | 0 child nodes, 0 held `Animation` objects |

⛔ **If target geometry is unavailable or any assertion in step 7 fails: `THROW` / `BLOCK`.** Never, under any circumstance:

- guess or interpolate coordinates;
- use an **authored** destination geometry, or any value from `start_geometry` / `end_geometry`;
- clone the object, or animate a second instance;
- silently crossfade, fade the source, or fall back to `EDITORIAL`.

⛔ **A `DORMANT` destination must never be measured.** §2.2.1 makes `DORMANT` unmeasurable by contract; consuming its rect is the failure this subsection exists to prevent. Tested by `T-MSR-01`.

⛔ **Reduced motion bypasses this contract entirely** — see §13.2: the destination state commits directly at `0 ms`, the object never enters `shared-layer`, and no measurement is performed. Tested by `T-MSR-08`.

## 10.4 The 13 required crossings

| # | Crosses | Beats | `semantic_id` | ⛔ hard limit |
|---|---|---|---|---|
| 1 | Scene A stage → Home account row | `A17`→`B01`→`B02` | `person.juli` | device must not move |
| 2 | Juli's Home row → the four members | `B06`→`B07`→`B12` | `person.*` | group motion is the concept; ≤ 3 concurrent |
| 3 | Planner `Planes` anchor → Scene C Plan | `B11`→`C01` | `birthday.event` | `19:00` never changes |
| 4 | Scene C Plan → the four-callback row | `B21`→`B22` | 4 callbacks | same objects, not lookalikes |
| 5 | Casa / bolsa from Scene A/B → Scene F everyday | `F02`→`F03` | `physical.bolsa` `warranty.ps5` `birthday.event` | land on product objects |
| 6 | Scene F everyday → Scene G device | `F04`→`F05`→`G01` | the device | one device only |
| 7 | Plan bridge task → Inventory OUT row | `C04`→`C05`→`C06` | `inventory.missing_item` | **no Shopping List** |
| 8 | Finance movement row → Asset identity | `D05`→`D06`→`E01` | `finance.ps5_movement` | `Mar 2024 · $580.000` only as a movement |
| 9 | Assets detail row → HomeCloud Documentos row | `E03`→`E04`→`E05` | `asset.ps5.documents` | same y, same width; **no 480 px slide** |
| 10 | `$48.720` → the `G04` transaction | `G03`→`G04` | `finance.supermarket_movement` | bridge line deleted |
| 11 | Homi proposal card → Planner task row | `I05`→`I06` | `homi.proposal` → `planner.task` | **no cartoon bounce**; nothing confirms |
| 12 | Scene A/B message → Scene J ghost | `A10`/`B18`→`J05` | `message.old_household` `message.technician` | 25–35 %; same objects |
| 13 | Scene A objects → Scene J closing objects | `A02`/`A03`/`A04`→`J02` | `physical.*` | **no `mochila`** |

---

# 11. DEVICE · EXPOSURE · LOCAL FOCUS GRAMMAR

## 11.1 Device grammar — frozen

| Property | Value |
|---|---|
| **Standard scale** | `1.00` — slot `300 × 620`, y `50`, margins `50/50` ≥ safe-area `48` ✅ compliant |
| **Emphasized scale** | `1.08` — slot `324 × 669.6`, y `25`, margins `25/25.4` — a **DECLARED 23 px breach** of the 48 px safe area. Intentional and documented, not an accident |
| **Third scale** | ⛔ **NONE.** Geometrically impossible: max compliant is `624/620 = 1.006` |
| **Internal geometry** | `.phone-frame` `298 × 618`; `.phone-frame-screen` `282 × 602` — **unchanged at every scale, in all 111 beats** |
| **Anchors** | two, by optical left edge: `x 250` (stage-left) and `x 730` (stage-right) at `1.00`; `x 238` / `x 718` at `1.08`. The 12 px difference is scale compensation and must be absorbed by the anchor definition, **not authored per state** |
| **Centred** | device centre at `640` whenever the device **is** the subject |
| **Lateral movement** | only when the device's **role** changes: product → map · product → comparison · Homi → Planner · S13/S14 → S15. **Never** to make the same screen look different |
| **Maximum simultaneous devices** | **3**, once, at `I09` only |
| **2 devices** | only at `I06` (auxiliary from a lateral) and `I11`/`I13` |
| **Movement** | whole-device `transform` on the slot only, `spatial 500`, entering `opacity 0→1`, exiting `1→0` with the exit curve. ⛔ **Never a layout-size change. Never a width/height animation** |
| **Separation rule** | **a device may never move while its contents animate.** Device settles first, then content arrives. Measured `S09→S10` and `S14→S15` currently interpolate them together and the audience cannot tell framing from content |
| **Scene J** | **0 devices.** Phone *geometry* is formed at `J10` from the organisation and dissolved at `J11`. It is never a `PhoneFrame` |

## 11.2 Three-device arithmetic — verified, do not shrink

```
1280 − 2 × 48 safe area      = 1184 px usable
3 × 324 (at 1.08)            =  972 px
remaining for 2 gaps         =  212 px
gap per device               =  106 px
```

Exact. ⛔ **Do not shrink the devices to create gaps.** At `1.00` the smallest readable app text is `11 px` logical → `16.5 px` projected, already below `NO_UI §5`'s `20 px` floor. Readability argues up.

## 11.3 Exposure grammar — frozen positive model

The model is the measured `S08_step01`, and it is `POSITIVE` (`C-10`).

| Layer | Value | Token |
|---|---|---|
| **Subject** | `1.00` | full |
| **Subject ground** | `--home-brand-soft` = `rgb(246,237,232)` | the product's own token |
| **Sibling context** | `0.55` (`0.55–0.65`) | low exposure |
| **Section heading** | `0.60` | low exposure |
| **Background / ghosts** | `0.25–0.35` | very low |
| **Decision context** (`I14`–`I16`) | `0.20` | `MASTER I13` |
| **Homi wordmark label** (`I02`+) | `0.40` | quiet label |
| **Duration** | **360 ms** | `exposure` token, default curve |

**An exposure shift happens for exactly one of four reasons:**
1. the subject arrived · 2. the subject lost the floor · 3. the context recedes · 4. the chapter is ending.

If none of the four applies, **no opacity animates.**

⛔ **Prohibitions, each with its measured current violation:**

| Prohibition | Current violation |
|---|---|
| blur as a default | `S01_step09`: three secondaries at `opacity 0.69` **plus** `blur(0.35px)` |
| glow as attention glue | `S01_step10` `opening-chaos-light` `0→0.18`; `S13_step03` `.s13-core-glow` at effective `0.18`; `S03_step00` two radials at `0.28` and `0.075` behind the lockup (`A-12`) |
| dim-everything-to-black as focus | `S08_step02` dims the whole device to `0.6`; `S14` ramp goes to `0.12` before black |
| "AI glow" | `G-12` ACTIVE — do not prescribe AI animation at all |
| per-object bespoke opacities | `S01_step09` measured `0.69 / 0.88 / 0.69 / 0.96 / 0.93 / 1 / 0.69 / 1` |

## 11.4 Local focus — frozen

| Value | Meaning |
|---|---|
| **`1.08`** | default micro focus. A row, tab, chip or nav item that needs a beat |
| **`1.15`** | strong focus ceiling. **At most one element in the entire film at any moment**, and only when it is the named subject of the sentence |
| **`1.20`** | **one named exception only**: HomeCloud document focus |
| ⛔ `1.20–1.25` as a general value | rejected — it would make the ceiling the working value and destroy the diagnostic |

**The seven mandatory preconditions. A local focus is legal only if all seven hold.**

| # | Precondition | Current violation it fixes |
|---|---|---|
| 1 | `transform` only — never `width`/`height`/`font-size`/`margin`/`padding` | `S08_step03→04`: `19 px → 21 px`, row `62 → 64` |
| 2 | no `scrollHeight` change on any ancestor | `.inventory-card` `+41 / +60 px` |
| 3 | no sibling movement | `S17_step00→01`: `.homi-decision-row` `scrollHeight 64 → 54` |
| 4 | no clipping | `.inventory-card` clip `+41 px` |
| 5 | **never inside `.phone-frame-screen`** or any clipping ancestor | screen is `282 × 602` with `overflow:hidden`; a `115 %` on a `248 px` row is `285 px` and clips |
| 6 | `transform-origin: center` | required for exact reversibility |
| 7 | exactly reversible | verified by the forward/back walk |

⛔ **Forbidden on:** the family map at any scale · inside `.phone-frame-screen` `.inventory-card` `.planner-panel-stack` `.homi-confirm-zone` `.homi-thread` `.homi-context` `.inventory-filters` · stage type above `56 px` · more than one element at once.

**Pattern is out and back: `100 → s → 100`, 100 ms each way** (total `micro 200`).

## 11.5 Motion-token system — 8 tokens, no more

| # | Token | Duration | Easing | Purpose |
|---|---|---|---|---|
| 1 | `micro` | **200 ms** | `cubic-bezier(.22,.61,.36,1)` | one object needs a beat; local focus `100→s→100` |
| 2 | `enter` | **320 ms** | `cubic-bezier(.22,.61,.36,1)` | an object arrives: `opacity 0→1` + `translate 0 12px→0` |
| 3 | `exit` | **260 ms** | **`cubic-bezier(.4,0,1,1)`** | an object leaves — **accelerating** |
| 4 | `exposure` | **360 ms** | `cubic-bezier(.22,.61,.36,1)` | attention moves |
| 5 | `spatial` | **500 ms** | `cubic-bezier(.22,.61,.36,1)` | a whole group, device or editorial frame moves in space |
| 6 | `reset` | **520 ms** | **`cubic-bezier(.4,0,1,1)`** | a chapter goes to absolute black, or returns |
| 7 | `shared` | **640 ms** | `cubic-bezier(.22,.61,.36,1)` | **one object changes context and keeps its identity** |
| 8 | `hero` | **880 ms** | **`cubic-bezier(.16,1,.3,1)`** | the HomePlus reveal and the Homi name. **Twice in the film** |

Plus **one envelope, not a token:** `AUTO_MICROSEQUENCE` ≤ `1400 ms`, composed only of tokens 1–8.

**Why `exit` and `reset` accelerate while entrances decelerate:** today all 84 transitions use **one** curve, `cubic-bezier(.2,.8,.2,1)`, in both directions, so exits decelerate like entrances (`M-02`). `NO_UI §6` freezes three distinct curves.

**Why 8 and not fewer:** tokens 3, 6, 8 each carry a **different curve mandated by `NO_UI §6`**; merging them violates canon. Token 7 exists because `NO_UI §6` freezes `shared transform: 520–760 ms` and **nothing in the deck occupies that band** (`M-01`).

**Why 8 and not more:** the four existing durations (`220` `320` `420` `500`) are reused; no duration is invented that `NO_UI §6` or `MASTER §2.8` does not already name.

## 11.6 Allowed / forbidden properties — global

| ✅ Allowed | ⛔ Forbidden |
|---|---|
| `opacity` | `width`, `height`, `padding`, `margin`, `font-size` |
| `transform` (`translate` `scale` `rotate`) | `scrollWidth` / `scrollHeight` / `scrollTop` mutation |
| `clip-path` / `mask` / `stroke-dashoffset` | `filter: blur()` as a default |
| `visibility` (discrete, with `enter`/`exit`) | `box-shadow` animation |
| `stroke-dasharray` (SVG only) | any continuous / looping / idle animation |
| | `transition: all` |
| | `animation-iteration-count: infinite` |

## 11.7 Typography vs product

⛔ **Stage typography must never out-shout product UI during a product scene.**

| Rule | Value |
|---|---|
| Largest app type inside the device | `29 px` (Finance balance) |
| Smallest app type the audience must read | **≥ `20 px`** at `NO_UI §5`; at `1.08` + `1.5×` projection, `19–20 px` source → `30.8–32.4 px` |
| Current worst offender | `S02_step06`: a `176 px` numeral = **7.9×** the largest in-product type |
| Stage type ceiling during a product beat | **≤ `56 px`**, and it must be either real UI content or one of the six `MASTER §2.3` approved texts |
| The six approved texts, verbatim | `La información ya existía.` · `Coordinar no es vigilar.` · `¿Y si ni siquiera tuviéramos que saber cómo?` · `HomePlus` · `Homi` · `Muchas gracias.` |

⛔ **Stage text must not merely repeat spoken content.** It must be evidence.

## 11.8 Black grammar

**Nine black states, all `MANUAL`-triggered, all with no timer.** All use the **single** `veil-layer`; `B20` additionally exits the product block first.

| # | State | `MASTER §2.2` use | Held for |
|---|---|---|---|
| 1 | `A01` opening | 1 — absolute focus on the speaker | *"Imaginen un martes cualquiera"* |
| 2 | `A07` Scene A clear | 1 + 3 | *"El problema es que se acumulan"* |
| 3 | **`A12` the founding question** | 3 — conceptual question | **the whole of L41–L43, ~4–5 s** |
| 4 | `B20` after the block exit | 2 — chapter reset | *"Pero hay un límite…"* |
| 5 | `F01` Scene F entry | 2 — chapter reset | the whole of L275–L277 |
| 6 | **`H05` Scene H prelude** | 2 + 3 | *"entonces nos hicimos una última pregunta"* |
| 7 | `H07` → `I01` setup | 3 — conceptual question | *"Y ahí aparece Homi"* + the name alone |
| 8 | `I17` / `J01` closing | 4 — emotional close | **Gaby's whole block, ~24.5 s** |
| 9 | `J13` before the end card | 4 — emotional close | the breath |

**Rules:**
1. Everything clears **before** the black is on. `exposure 360` → **then** `reset 520` → **then** hold. **Never simultaneous.**
2. Nothing arrives during a black hold unless it is the black's own subject (the question, the name).
3. Black is **never** slide separation.
4. `reset` uses the **exit** curve — black arrives faster than it leaves.
5. ⛔ **No black at `S12→S13` or `S13→S14`** (boundaries deleted/dimmed instead).
6. Do not unify the two blacks: `#060404` (S07–S18) and `#0B0908` (canvas token). `J-13` is `LOW`/`ACTIVE`; **do not "fix" it into inconsistency.**

---

# 12. PERFORMANCE CONTRACT (summary)

Full spec: `08_PERFORMANCE_QA_SPEC.md`.

| Guarantee | Value |
|---|---|
| Frame rate floor | **60 FPS** |
| 120 Hz headroom | **aspirational, must be measured, never promised** |
| Animated properties | `transform` + `opacity` only |
| Layout / paint per frame | **zero** expected; any scroll mutation is a FAIL |
| Orphan animations at settle | **0** |
| Residual inline `transform` on any hidden subtree | **0** |
| `fill: 'forwards'` on anything that stays on stage | ⛔ **banned** — the settled state comes from the state, not from a held animation |
| `will-change` | only during an in-flight `shared` move; removed on settle |
| `box-shadow` animation | shared layer only; ⛔ never inside `.phone-frame-screen` |
| `blur` / `backdrop-filter` / `filter` tween | ⛔ none in any beat |

**Required profiling process:** Chrome DevTools Performance panel, 4× CPU throttle, capture every one of the 31 `AUTO` sequences at ≥ 3 runs, record frame time, layout count, paint count, layer count. Store under `audit/runtime/session-11/`. **A sequence exceeding 16.7 ms at any sampled frame is a FAIL, not a warning.**

---

# 13. REDUCED-MOTION CONTRACT — Q9 FINAL

## 13.1 The current state is wrong

`src/index.css:174-181` kills **all** animations and transitions under `prefers-reduced-motion: reduce`. That is not a degradation, it is a **hard cut**: `I06` becomes "auxiliary device appears instantly at full opacity, task teleports, device vanishes". **The meaning is destroyed.**

**Decision: reduced-motion support is REQUIRED and it does not block the blueprint.**

## 13.2 The rule

> **Reduced motion removes TIME, never MEANING.** The fallback is **deterministic state substitution**: the same semantic result, reached in `0–120 ms`.

| Beat class | NORMAL | REDUCED — binding |
|---|---|---|
| shared object travels | object moves `shared 640` | **the destination state is committed immediately; the object never enters the shared layer.** Rendered in place at the destination slot, inside the destination scene. `0 ms` |
| exposure shift | `exposure 360` | **instant opacity set** to the same final values. `0 ms` |
| saturation burst (`A05`) | 3 bursts, 1100 ms | **all 11 fragments at final positions at `0 ms`** |
| black reset | `exposure 360` → `reset 520` → `HOLD` | **`HOLD` is UNCHANGED.** Only the fade is removed. ⛔ **A `HOLD` is never removed by reduced motion — that would delete the beat** |
| hero reveal (`A14`, `I01`) | `hero 880` | `0 ms`. ⛔ **The preceding black `HOLD` beat is retained — the pause before the reveal is the content** |
| three-device comparison (`I09`) | laterals emerge, 500 ms | **all three devices present at final geometry at `0 ms`** |
| device out-UP / in-BELOW (`I13`) | `500` + `500` | **both surfaces present simultaneously at final geometry, `0 ms`.** ⛔ **Never one-then-the-other — that ordering IS the meaning** |
| technology recession (`J11`) | `scale 100→82`, `opacity→0` | **final frame at `0 ms`.** ⛔ `house` and `family` still never move |
| SVG draw (`A17` `J03` `J06`) | `stroke-dashoffset` 700–900 ms | **final drawn state at `0 ms`** |
| local focus (`G02` `B03`) | `100→s→100` | `0 ms`, **and the exposure change still happens** so the emphasis survives |

## 13.3 Implementation

- `prefersReducedMotion` read once at startup; listen for change and set `state.reduced`.
- `Microsequence` reads `state.reduced` **at construction**: if true it creates **zero** animations and resolves `settled` on the next microtask after committing the final state.
- ⛔ **Delete the `index.css:174-181` blanket `!important` block.** Replace with token-level `0 ms` variants. The blanket block must go because it also kills the `opacity` changes that carry meaning.
- ⛔ `S07`'s `132 px`, `S08_step01`'s exposure values, `#060404` and the S18 end card are **untouched** by reduced motion — they are not animations.

---

# 14. BACKWARD RESTORATION

`ArrowLeft` restores the previous stable state. **Eight requirements.**

| # | Requirement | How to verify | Status today |
|---|---|---|---|
| 1 | identical painted geometry for every element | element-by-element snapshot, both directions | ✅ 51/85 byte-identical |
| 2 | identical visible text set | text-set hash | ✅ 85/85 |
| 3 | identical device box, scale and position | device geometry comparison | ✅ 85/85 |
| 4 | identical overflow census on every surface | `scrollW/H` per node | ✅ 85/85 |
| 5 | zero running animations | `getAnimations()` filtered by `playState` | ✅ 85/85 |
| 6 | **zero residual inline `transform` on any hidden subtree** | hidden-subtree transform census | ❌ **fails in 34 of 85** — `.family-map-stage` forward `@22.4,0 0×0 transform:none` vs backward `@274.19,250 200×0 transform:matrix(1,0,0,1,0,0)` |
| 7 | **a shared element returns to its exact origin geometry, not to a lookalike** | origin-slot rect comparison | ❌ **untestable — 0 shared elements exist** |
| 8 | no duplicate device; `deviceCount` matches | device count comparison | ✅ 85/85 |

**Requirements 6 and 7 are the reason `ARCH-01` exists.** Under the permanent-mount contract a hidden scene is never torn down, so requirement 6 becomes enforceable by construction. Requirement 7 is created by the shared layer.

⛔ **An orphaned transform on a `visibility:hidden` subtree is a FAIL in the target, not a `LOW`.** Session 7 graded it `MEDIUM` **only because it has zero visible effect today**; under `ARCH-01` it becomes load-bearing for `B15`.

---

# 15. ROOT-CAUSE REMEDIATION ORDER

**Do not build a 149-item checklist. Solve the causes, then apply.**

| RC | Root cause | Issues | Global mechanism that fixes it | Phase |
|---|---|---|---|---|
| **`RC-19`** | no `shared` and no `hero` token; undeclared safe-area breach | `M-01` `M-09` | the 8-token system (§11.5) + §11.1 | **1** |
| **`RC-20`** | scene-boundary motion vocabulary missing; `HOLD` not mis-press-safe | `M-06` `M-14` `M-12` | `ARCH-01` + §9.2 | **1** |
| **`RC-01`** | no semantic object survives any boundary | `B-10` `C-04` `C-07` `D-09` `D-11` `E-10` `C-11/D-10` `F-05` `I-02` | the shared-element layer (§10) | **1** mechanism · **8** validation |
| **`RC-02`** | the product stage is absent or inert when the narration needs it | **18** | `G01` `H01` `F05` `I13` device-presence beats + `B13` + `E06` | 2–6 |
| **`RC-06`** | visual state ≠ spoken beat | **13** | the 111-beat budget (§4.1) + the map's `script_anchor` column | 3–7 |
| **`RC-08`** | scene-boundary motion vocabulary missing | **10** | `ARCH-01` + the 17-boundary plan (§31) | 1, 8, 9 |
| **`RC-15`** | one easing curve for both directions; hidden-subtree residue | `M-02` `M-12` `H-09` `G-17` `I-22` | §11.5 curves + §14 req. 6 | 1, 2 |
| **`RC-13`** | Homi presented as implemented capability | `I-01` `I-04` `I-26` | `I04` structured proposal · `I16` HOLD WITHOUT CONFIRMING · `G08` plain type | 6 |
| **`RC-12`** | the closing argument has no states | **8** | the 14-beat Scene J blueprint (§29) | 7 |
| **`RC-18`** | scene state budget too small | **6** | §4.1 | 3–7 |
| `RC-03` | on-screen text duplicates narration | **9** | the six approved texts (§11.7) | 3–6 |
| `RC-04` | asserts unsupported capability | **8** | the 15 capability rules (§3.4) | 3–7 |
| `RC-05` | master/script/implementation disagree | **8** | §39 open items; do **not** invent resolutions | — |
| `RC-07` | illegal emphasis mechanism | **8** | §11.4 preconditions | 1–7 |
| `RC-09` | on-screen data contradicts narration | **7** | the datasets in §20–§29 | 3–6 |
| `RC-10` | colour/token discipline | **7** | `#E7643F` (`N-24`) | 2 |
| `RC-11` | demo data diverges | **7** | §23 dataset canon | 3–6 |
| `RC-14` | fabricated navigation / dead affordances | **7** | `N-33` + `H02`/`H03` real-component routes | 5, 6 |
| `RC-16` | cross-scene shared-object continuity | **3** | `A03` fix → `J05` becomes possible | 3, 7 |
| `RC-17` | product authority unresolved at source | **5** | §39 | — |

**Dependency order — not optional:**

```
ARCH-01 mount contract
  └─► tokens + curves
        └─► shared layer
              └─► navigation + HOLD guard + Esc
                    └─► device anchors + exposure bands
                          └─► per-scene rebuild
                                └─► shared-element validation across boundaries
                                      └─► whole-film pass
```

⛔ **Do not start with "fix Scene 6" or "make Homi cooler".** If a scene is rebuilt before the foundation passes, that scene invents its own motion and the current problem is recreated at a higher resolution. **Phase 1's STOP GATE is the gate that prevents this.**

---

# 16. SCENE-BY-SCENE BLUEPRINT

Every scene gives: purpose · current failure · target story · beat count · per-beat build instructions with verbs · truth notes · family. The motion contract for each beat is the matching row of `08_CINEMATIC_ENHANCEMENT_MAP.csv`.

> ⛔ **Numbering note, read once.** The ten scene specifications are **§20 – §29**, not §16 – §25. §16 is the part header for the whole scene-by-scene block; **§17, §18 and §19 are intentionally unused** so that the ten scenes can occupy a clean decade. ⛔ Do **not** renumber. Every cross-reference in this document, in `08_IMPLEMENTATION_CHECKLIST.md` and in `08_MOTION_IMPLEMENTATION_ARCHITECTURE.md` uses the §20 – §29 form.

---

## 20. SCENE A — Chaos · Fragmentation · Reveal (`S01` `S02` `S03`)

**PURPOSE.** Make a room of strangers feel one ordinary Tuesday; then make the accumulation unbearable; then go silent; then answer the question with the product.

**CURRENT FAILURE SUMMARY.** 19 states, 200 spoken words, **4.4 s per press**. `A-02` **BLOCKER**: the founding question plays over the HomePlus lockup (measured 115 ms of black; lockup at 661 ms). `A-03` **BLOCKER**: the distributed-context argument is replaced by **six third-party brand logos** and the explicitly forbidden `6 APPS / 1 FAMILIA / 0 COORDINACIÓN` band (measured `176 px` numerals, `844 × 225.59` = 66 % × 31 % of canvas, in `#E65C1B`). `A-06` HIGH: the invoice is **replaced** by the bag, never coexisting. `A-07` HIGH: the strongest example arrives at state 8 of 11. `A-08`/`A-10`: two pivot lines with no state, no behaviour, no clear; eight near-identical opacities plus `blur(0.35px)`. `A-09`: 7 bubbles = **30.4 %** coverage against a 65–75 % target. `A-11`: the entire post-reveal argument has **zero** visual support because `S03` is one state. `A-01`/`A-12`: brand orange pre-reveal at 0.075–0.28, plus two visible radials behind the reveal.

**TARGET STORY.** Exhaustion → accumulation → collective quiet → silence → **the question on true black** → the icon alone → the reveal → the four people → equality → the house → Juli crosses into Home.

**TARGET: 17 beats, 5 `AUTO`.**

| Beat | Anchor | BUILD — verbs | TRUTH / family |
|---|---|---|---|
| `A01` | L15-16 | **PRESERVE** the true black. **KEEP** 0 painted content elements. **DELETE** the `0.075` stage glow. | `EDITORIAL` · `MASTER §2.2` use 1 · `A-16` POSITIVE |
| `A02` | L18-19 | **REBUILD** the insurance document at **440–480 px** (today 304). **KEEP** `insurance-document.svg` artwork verbatim — `#302922 #40362D #625143 #867364 D28456`, eyebrow `FACTURA` 18 px, title `Seguro del auto` 38 px, rotation `-2°→0`. **KEEP** the `enter 320` + `12 px` rise exactly. | `SHARED_ELEMENT` `physical.insurance` · `MASTER A1` · `NO_UI A01` |
| `A03` | L20 | **REBUILD** the bag at **380–440 px** (today 290). ⛔ **The invoice MUST persist at `0.60`** — today `motion="REPLACE"` deletes it (`A-06`). | `SHARED_ELEMENT` `physical.bolsa` |
| `A04` | L21 | **REBUILD** as a **physical warranty paper**, not a chat bubble (`MASTER A1` forbids a UI card). **MOVE to the third press** — everything now at steps 3–7 moves after it. 380 px. Objects behind at `0.55`. | `SHARED_ELEMENT` `physical.heladera` · `A-07` |
| `A05` | L22-23 | **REBUILD** the saturation field: **11 pieces** (not 7), **65–75 %** canvas coverage, mixing **messages + documents + 2 silhouetted objects**. Exact secondary strings from `NO_UI A04`: `¿A qué hora era el turno?` · `¿Hay algo para cenar?` · `Después haceme recordar` · `¿Alguien pagó la luz?` · `¿Quién compra lo que falta?` · `Se rompió la heladera` · `¿Dónde está la garantía?` + autorización escolar + factura de luz + `¿Quién busca a Tomi?` + `Ya lo hice yo`. **DELETE** `filter: blur(0.35px)` and the eight bespoke opacities. **ONE `AUTO` 1100 ms, 3 bursts of 3/4/4 at 70/55/40 ms.** | `EDITORIAL` · `MASTER §2.10` · `NO_UI A04` |
| `A06` | L24 | **CREATE.** The whole field to **one shared `0.55–0.65`**. Nothing enters, exits or moves. **This state does not exist today.** | `EDITORIAL` · `A-08`/`A-10` |
| `A07` | L26 | **REBUILD.** Everything clears to **absolute `#000000`** and **HOLDS**. ⛔ Do **not** write `El problema es que se acumulan`. | `EDITORIAL` · `MASTER A1` "No escribir" |
| `A08` | L28-30 | **REPLACE entirely.** **DELETE** all six brand logos (`whatsapp.svg` `calendar.svg` `drive.svg` `notes.svg` `location.svg` `bank.svg` — the last two are Google Maps' pin cluster and a generic bank). **BUILD** three household objects at `0.55`: the old chat, the calendar week, the lost folder — each **200 px+**. | `EDITORIAL` · `A-03` BLOCKER · `MASTER §2.1` |
| `A09` | L28-30 | **CREATE.** One of the three isolated at `1.00`. | `EDITORIAL` · `A-05` |
| `A10` | L32-36 | **CREATE.** `message.old_household` at `1.00`, field at `0.35–0.45`. **BUILD** it from scratch — `MASTER:131-132` mandates it and `A-03` deleted it. Palette **frozen verbatim** from the current bubble: surface `#201B17`, border `#44382E`, text `#F5F1EB`, `30 px / 450 / -0.8 px`, radius `22 px` + `7 px` tail, shadow `0 12px 32px rgb(0 0 0/.16)`. Copy: `Ma ❤️: Esta semana lo busco yo a Tomi.` | `SHARED_ELEMENT` · `MASTER §2.5` · `A-11` |
| `A11` | L37-39 | **REPLACE** the string: `La información ya existía.` — **past tense** (today `La información ya existe.`). **80 px**, centred, **once**, after the four fragments. **DELETE** the six-state presence. Add the four fragments at `0.30`: `Esta semana lo busco yo a Tomi.` · `Entrenamiento 18:00` · `Garantía heladera.pdf` · `Comprar leche`, with a few very subtle broken lines. | `EDITORIAL` · `MASTER §2.3` approved text 1 · `A-04` |
| `A12` | **L41-43** | **CREATE.** **ABSOLUTE BLACK. Nothing. `MANUAL`-triggered, held for the whole of the question, no timer.** ⛔ Do not write the question. ⛔ Nothing may arrive during the hold. | `EDITORIAL` · **`A-02` BLOCKER** · `MASTER §2.2` use 3 |
| `A13` | L45 last two words | **CREATE.** **Icon ALONE on black. No wordmark.** `opacity 0→1`, `scale .94→1`, 320 ms. ⛔ **Delete both radials** (`0.28` and `0.075`, measured) — `A-12`, `NO_UI §5`. | `EDITORIAL` · `MASTER A15` verbatim |
| `A14` | L45-48 | **REPLACE.** `hero 880 ms`, `cubic-bezier(.16,1,.3,1)`, **horizontal**: icon shifts left · wordmark reveals rightward from behind · `#E7643F` expands from the icon under a hard-edged mask and fills the canvas · final **full orange field + white lockup**. ⛔ **No halo, no vignette, no radial, no particles, no 3D, no shimmer.** ⛔ **Vertical stacking is wrong** — today `flex-direction: column`, logo `204×204` + wordmark `78 px` stacked. | `EDITORIAL` · `MASTER A16` + `NO_UI A16` (8 steps) · `NO_UI §6` hero band |
| `A15` | L48-51 | **CREATE.** Lockup **exits up**; orange field **remains**; the four enter **from below**, **independent layers at absolute `105 %`** (§10.2). ⛔ Do **not** write `PERSONAS`. | `SHARED_ELEMENT` `person.*` · `MASTER §2.6` · `A-11` |
| `A16` | L53-56 | **CREATE.** `micro 200` to **all four at `100 %` equal**. On `La idea es exactamente la contraria`. ⛔ No eye, no lock, no surveillance icon. | `EDITORIAL` · `MASTER A8` · `NO_UI A22` |
| `A17` | L57-61 | **CREATE.** House outline draws `700–900 ms`, stroke `4–6 px`, `fill:none`, no perspective. Mamá/Papá/Tomi drop to `0.40`. **Juli remains** and **matches/morphs into `UI_HOME_JULI`** (`SHARED_ELEMENT` + `EDITORIAL_MORPH`). | `SHARED_ELEMENT` `person.juli` · `NO_UI A26`/`A27` · `MASTER A9` |

**PRESERVE (do not touch).** `A01`/`A02` as currently built (`A-16`) · the bubble palette and type verbatim (`A-P4`) · the `enter 320` + `12 px` rise primitive (`A-P3`) · the seven-piece *register* and palette, extended not restyled (`A-17`).

**DELETE from Scene A.** Six brand logos · the `6/1/0` band · `.metric-zero` `176 px` · `filter: blur(0.35px)` · both reveal radials · `.opening-blackout` (replaced by `veil-layer`) · `opening-chaos-light` (`0→0.18` on a pivot line) · the vertical lockup · `stepCount: 1` for S03.

**WHAT MUST NOT EXIST in Scene A.** Any third-party brand mark or brand colour before `A14` · any word duplicating the speaker beyond the six approved texts · any glow, halo, particle, shimmer or vignette · any timer.

**PERSISTENCE MODEL (mandatory declaration per `NO_UI §9`).** `A02`–`A05`: `ACCUMULATIVE`. `A07`: `EXCLUSIVE`. `A10`–`A11`: `SELECTIVE CONTINUITY` (only the declared message survives). Every Scene A beat must declare one of the three in its data. **Today none does** — that is `C-03`'s root.

**EXIT / HANDOFF.** `A17` → `B01`: `SHARED_ELEMENT` `shared 640`; the device **does not move**; the device enters at the stage-left anchor.

---

## 21. SCENE B — Home · Planner · Familia · Coordinar (`S04`–`S07`)

**PURPOSE.** Prove the product on real UI, prove it coordinates a household, then state the limit.

**CURRENT FAILURE SUMMARY.** 16 states, 459 spoken words — the longest block — **12.2 s per press**, and the screen does nothing. `B-01` **BLOCKER**: Home marks Juli's two tasks `✓ Completada` with strike-through while the narration and Product Truth say pending; the completed state **persists into every Planner and Familia state** because `homeStep = 5`. `B-02` HIGH: the final Home state inverts attention and loses the `--home-brand-soft` tint. `B-03` HIGH: the only "focus" is `scale(1.02)` = **0.4 px** on a `20 px` title. `B-06`: the page title reads `Tareas`; **`Planner` appears nowhere**. `B-07`: zero pending work, zero `Responsabilidades`. `B-08`: Calendario shows no time and no schedule. `B-09`: `S05_step03` spends Scene C's content early, rendering the three literal strings `MASTER C2` forbids. `B-11` / **`M-04` BLOCKER**: `S06_step00→01` grows `.family-map-stage` from `250×200` to `1080×520`, scroll to `1350×689`, label `15 px → 41.04 px`, device opacity to `0.12`, canvas scroll to `1450×789`, and **the map's anisotropy reverses `0.75 → 1.246`**. `B-12`: `Entrenamiento +1 h` sits on a map that does not own schedules. `B-13`/`B-14`: authored pin percentages = fabricated geography. `B-15`/`B-16`: the Feed presented inside the Familia shell with its tab bar hidden; the technician post is a mock with no thread and no way back. `B-17`: 3 of 4 members. `B-18`: `Lugares` permanently dead.

**TARGET: 22 beats, 6 `AUTO`.**

| Beat | Anchor | BUILD — verbs | TRUTH / family |
|---|---|---|---|
| `B01` | L65-67 | **PRESERVE** one physical phone across Home/Planner/Familia (`B-P4`). **PRESERVE** the shell anatomy, segmented controls, navigation (`B-20` POSITIVE). **KEEP** device at `300×620` scale `1.00`, stage-right. Juli arrives from Scene A as the account row (`shared 640`). | `SHARED_ELEMENT` `person.juli` |
| `B02` | L69 | **REBUILD** the account row to carry the **age** (`10 años`). Today the age is spoken only. | `SHARED_ELEMENT` `person.juli` · `MASTER §5 A9` |
| `B03` | L71 | **REPLACE** the `1.02` scale with the `S08_step01` model: row `1.00` on `rgb(246,237,232)`, siblings `0.55`, heading `0.60`, `exposure 360`, **opacity only**. | `EDITORIAL` · `B-03` |
| `B04` | L71 | **REBUILD the data.** ⛔ `authorizationCompleted` and `schoolTaskCompleted` are **always `false`**. Row reads **`Pendiente`**, no strike-through, no `Completada` chip. **DELETE** the completion-toast mechanism entirely — this presentation has no tap, so it shows no completion. | `EDITORIAL` · **`B-01` BLOCKER** |
| `B05` | L71 | **REBUILD the data.** ⛔ Move `Llevar autorización` and `Tarea del colegio` out of `HOY` into `PRÓXIMAMENTE` with the `Mañana` lead, matching `Educación Física`. No date may contradict the spoken `mañana`. | `EDITORIAL` · `B-04` |
| `B06` | L73 | **REPLACE.** Pending attention rows hold `--home-brand-soft` at `1.00`; chrome recedes to `0.55` (today `0.82–0.84`, and the tint is lost at `step05`). ⛔ No completed row participates in the tint. | `EDITORIAL` · `B-02` |
| `B07` | L85-87 | **CREATE.** The scope-widening bridge: Juli's rows drop to `0.35` **in sequence**; Mamá / Papá / Tomi enter **at the same positions**; the surface re-presents as Familia. `AUTO 1400`, ≤ 3 concurrent. | `SHARED_ELEMENT` `person.*` · `B-10` |
| `B08` | L75-77 | **REBUILD.** Page title becomes **`Planner`** at `24–26 px / 600`. ⛔ `Tareas` is the segmented tab, never the page title. | `REAL_NAV` · `B-06` |
| `B09` | L79 | **REBUILD.** Tareas shows **pending** items grouped `NECESITA ATENCIÓN / HOY / SIN FECHA`, plus the `Responsabilidades` entry row (`Rutinas y obligaciones de la casa`). ⛔ Heading never `COMPLETADAS`. ⛔ `Responsabilidades` is a **row inside Tareas**, not a fourth tab. | `REAL_NAV` · `B-07` · `N-35` |
| `B10` | L81 | **REBUILD.** Calendario shows the event **with its time** (`Educación Física · 08:00 · Lunes 17`) and one recurring row in words (`Entrenamiento · Mar a Vie · 18:00–19:00`). ⛔ **The pill translates (`320`); tabs never resize — max 84 px** (`N-02`). | `REAL_NAV` · `B-08` · `N-02` |
| `B11` | L83 | **REPLACE the dataset.** A concrete household plan with real steps and real progress — **not** `Cumpleaños` (Scene C introduces it) and **not** the abstract triple. | `REAL_NAV` · `B-09` |
| `B12` | L89-91 | **REBUILD.** Familia lists **four** members. ⛔ Juli must appear. | `REAL_NAV` · `B-17` |
| `B13` | L93-97 | **CREATE.** The **consequence first**: the moved training event inside the device in Planner/Calendario semantics. ⛔ `N-35`: no standalone Horarios surface, no fourth tab. ⛔ The `+1 h` badge is **deleted from the map** and lives here. | `SHARED_ELEMENT` `tomi.training_event` · `B-12` |
| `B14` | L99-107 | **CREATE.** Both questions in sequence at `1.00`: `¿A qué hora termina?` → `¿Quién puede pasar a buscarlo?` The pivot from *when* to *who* is the point of Familia and has no state today. | `EDITORIAL` · `B-10` |
| `B15` | L109-111 | **REPLACE the mechanism entirely.** `spatial 500` device `1.00→1.08` whole-device; map chrome **inside** the device to `0.40`; pin **copy only** at `1.08–1.15` transform with `transform-origin:center`. ⛔ **NO** width/height/font-size animation · **NO** device opacity drop · **NO** canvas scroll mutation · **NO** map aspect flip · **NO** disappearance of the phone anatomy — the top bar, `Mapa` title, `Familia｜Mapa｜Lugares` switch and bottom nav **all stay visible** (`MASTER B5` demands the *opposite* of today's behaviour). ⛔ **NO ETA, NO distance, NO travel time.** ⛔ The authored pin percentages (`24%/29%`, `69%/49%`, `23%/75%`, `82%/79%`, `70%/16%`) are **fabricated geography** — ⛔ **do not point at them, do not animate them, do not emphasise them.** | `DEVICE_TRANSITION` · **`M-04` BLOCKER** · `N-03`/`N-30` |
| `B16` | L113-115 | **REBUILD** as the exact reverse of `B15`. Show place · recency · presence/status · sharing state **only**. | `DEVICE_TRANSITION` · `B-13`/`B-14` |
| `B17` | L117-119 | **REBUILD.** The family conversation as **explicit editorial**. ⛔ **The word "Feed" never appears on screen.** ⛔ No reactions, no comments, no unread badges, no algorithmic ranking, no social graph. ⛔ Do not present it inside the Familia shell with a hidden tab bar — **that is a navigation lie** (`B-15`). | `EDITORIAL` · `N-36` · `N-39` |
| `B18` | L121-125 | **REBUILD.** The message at `1.00`, shell at `0.55`. Copy **frozen**: `El técnico viene entre las cuatro y las seis.` / `¿Quién puede estar?` (`FEED:232` records it as SAFE TO SHOW). Author `Mamá` · `Familia García · Ahora`. | `EDITORIAL` · `SE-05` |
| `B19` | L127-129 | **CREATE.** The message acquires a **visible position in a retained list**, HomePlus-native. ⛔ No comment affordance, no unread count. | `EDITORIAL` · `B-16` |
| `B20` | L131-133 | **PRESERVE AS-IS.** The product stage exits **as a block** at **220 ms** and `#060404` holds. ⛔ **Do not retime to the `exit` token's 260 ms.** ⛔ Do not restyle. | `EDITORIAL` · `B-P7` · `07 §37.1 #4` |
| `B21` | L135-139 | **PRESERVE EXACTLY.** `132 px`, two-tone `#F5F1EB` / `#C7A084`, box `688.81 × 274.53`, `20.6 %` of canvas, ~60 % of frame empty, `420 ms` + `12 px` rise. ⛔ **`N-05` IS BINDING: a later typography-normalisation pass must NOT reduce it.** | `EDITORIAL` · `B-21` POSITIVE |
| `B22` | `MASTER B7` | **CREATE.** Before the statement: four callbacks — Tomi's avatar, the Club pin, the time, the technician card — joined by a few thin lines, `enter 320` at `70 ms` stagger. ⛔ **Same objects, not lookalikes.** | `SHARED_ELEMENT` · `B-19` |

**PRESERVE.** `S07` concept + `132 px` (`N-05`) · the stable-state invariant · one physical phone across Home/Planner/Familia · Home/Planner shell anatomy (`B-20`) · the `320 ms` pill mechanism · `S06_step01→02`'s `320 ms` primitive · the map *dramaturgy* (expand then collapse) with the mechanism replaced.

**DELETE from Scene B.** `--home-stage-focus-scale: 1.02` · all `Completada` states · the `COMPLETADAS` heading · the `.family-map-stage` layout-mutation path (`FamilyMapStage.tsx` measured-growth code) · `.map-delay`'s `Entrenamiento +1 h` on the map · `.map-sharing` as a global always-on state (`B-14`) · the hidden `.family-switch` in the conversation view (`B-15`) · the `Lugares` tab (`B-18`, no handler) · `Feed` as an on-screen label · `information-fragments.svg` as opaque texture.

**PRODUCT TRUTH NOTES.**
- Juli / Tomi / Mamá / Papá do **not** exist as people in Integration. They map to Product `Role` values (`child`, `adolescent`, `adult`). ⛔ **Do not "fix" the names**; fix the count (`B-17`).
- The map must remain a **phone screen**.
- `location.svg` is **Google Maps' pin cluster**, not a presence icon. ⛔ Not usable as a presence affordance.
- Presence offers only `getRelativeTime()` and `getStatusLabel()`: `Ahora / Hace 5 min / Hace 1 h` and `Compartiendo ubicación / Desactualizada / Sin ubicacion / No comparte`. ⛔ **Use only these.**
- ⛔ `Precisión` and `Pausa` controls are **absent on both implementable sides** — **do not invent them** (`SC-08`).
- ⛔ `assets/app-icons/whatsapp.svg` is a **brand mark**. It may not appear before `A14` (`MASTER §2.1`).

**EXIT / HANDOFF.** `B22` → `C01`: `EDITORIAL`. `birthday.event` crosses at `B11`→`C01`.

---

## 22. SCENE C — Plans / Inventory (`S08`)

**PURPOSE.** Show that organising a birthday means resolving what is missing — and that HomePlus's answer is a need to organise, not a shopping list.

**CURRENT FAILURE SUMMARY.** 5 states, 113 words, **11.3 s per press**. `C-01` **BLOCKER**: the `Café · Alacena · 0` OUT row is clipped out of the device in **every** Inventory state (card client `248×229` vs scroll `248×270` → **41 px hidden**, worsening to **60 px**), so *"qué necesitamos comprar"* is never visible. `C-02` **BLOCKER**: the Plan renders the three literal strings `MASTER C2` forbids (`Repartir tareas` / `Preparar cosas` / `Comprar lo que falta`) and none of the six canon tasks. `C-03` HIGH: at `step02` the **whole device** drops to `0.6` **including** the task that must survive. `C-04` HIGH: `step02→03` is a **480 px device slide** in ~540 ms plus a 320 ms crossfade while **every** plan-step opacity stays `1` — 88 concurrent movers, and the bridge task receives no treatment. `C-05`: a static `Lista de compras · 8 para comprar` teaser with no list. `C-06` MEDIUM: `step03→04` "focus" is an **instantaneous** (`10.3 ms`) `19 px → 21 px` + row `62 → 64` + card `scrollHeight 270 → 284` mutation that **worsens the clip** and spotlights a fully-stocked item. `C-07`: the Plan card has no Event identity.

**TARGET: 7 beats, 2 `AUTO`.**

| Beat | Anchor | BUILD — verbs | TRUTH / family |
|---|---|---|---|
| `C01` | L144-146 | **REBUILD.** Plan carries its **Event identity**: `Cumple de Juli` · `Sábado` · **`19:00`** · an owner. Add a visible `Evento` marker or a linked-event row. ⛔ **`19:00` exactly — never `18:00` or `20:30`** (`N-23`). | `SHARED_ELEMENT` `birthday.event` · `C-07` |
| `C02` | L147-150 | **REPLACE the dataset** with three of the six `NO_UI §18` canon tasks: `Confirmar invitados` · `Preparar torta` · `Comprar bebidas` (or `Decorar` / `Comprar snacks` / `Comprar globos`). ⛔ **Each row carries an assignee and a due date.** ⛔ The abstract triple may **never** appear as literal tasks. | `EDITORIAL` · **`C-02` BLOCKER** · `SI-16` |
| `C03` | L155-157 | **PRESERVE AS-IS.** Measured `step0 0.55`, `step1 0.55`, **`step2 1.00`**, heading `0.60`, background `rgb(246,237,232)`. Opacity only, no scale, no layout, no blur. | `EDITORIAL` · `C-10` POSITIVE |
| `C04` | L159-163 | **REPLACE.** ⛔ **The whole-device dim is the defect** — carry `C03`'s per-element exposure forward: the bridge task **stays at `1.00`**, question at `1.00`, device context at `0.55`. ⛔ **Delete the 68 px on-screen question** (`MASTER C3`: *"En `¿Qué falta en casa?`: no escribir la pregunta"*). | `EDITORIAL` · `C-03` + `C-08` |
| `C05` | (the extraction) | **REPLACE the 480 px slide with a `SHARED_ELEMENT` extraction.** The bridge task **detaches**, the Plan recedes to `0.35`, the row **lands as the first Inventory line at the same width and type size**. `AUTO shared 640`. ⛔ **The device must NOT move** — a moving device says "we navigated", which is a claim the product does not support. ⛔ **One instance, no clone.** | `SHARED_ELEMENT` `inventory.missing_item` · `C-04` · `N-33` |
| `C06` | L165-167 | **REBUILD the layout** so the `Sin stock` row is **visible inside the device in every Inventory state**. Preferred order: (1) scrollable list region fixed to the workspace, scrolled so the OUT row is on screen; (2) reorder the dataset so `OUT` is first; (3) at minimum, **do not render an invisible row**. | `EDITORIAL` · **`C-01` BLOCKER** |
| `C07` | L169-174 | **REPLACE the emphasis.** The LOW/OUT row isolated at `1.00` on `--home-brand-soft`; others at `0.45`; heading `0.60`. ⛔ **ZERO geometry change, ZERO font change** (`C-06`). ⛔ **DELETE the `Lista de compras · 8 para comprar` teaser entirely** — Shopping List is excluded by name three times. The approved chain ends on the **need**: `LOW/OUT → Restock Need PENDING → approval → canonical Planner Task`. | `EDITORIAL` · **`N-06`** · `N-32` |

**PRESERVE.** The `S08_step01` exposure model (`C-10`) · the Inventory anatomy: heading + filter chips + bordered list card + summary card + shell nav · the shared `PDF`/tile vocabulary · the dataset **names** `Papel higiénico · Baño · 4 u · Bajo` · `Leche · Heladera · 2 L · Bajo` · `Café · Alacena · 0 · Sin stock` · `Detergente`.

**DELETE from Scene C.** The 480 px `motion-spatial-wipe` device slide · the `.s08-phone-slot[data-dim]` uniform `0.6` · the 68 px `.s08-question` · the `Lista de compras` teaser card and its `8` badge · the `19→21 px` focus mutation · the `filter: Por lugar` chip (no product counterpart — Product Truth has **no place axis**; `INV-INV-010` and `:499-508` forbid quantity-per-space).

**PRODUCT TRUTH NOTES.**
- Status vocabulary: Product Truth and Figma say **`agotado` / `Agotados`**; Integration renders `Sin stock`. **Use the Product Truth term.**
- `C07` shows the **Restock Need**, labelled as such. ⛔ It is **not** a shopping list, and ⛔ it does **not** visually imply that buying an item automatically creates a Finance expense (`N-32`).
- ⛔ **No Milestones** (`N-38`). ⛔ **No Horarios surface** (`N-35`).

**EXIT / HANDOFF.** `C07` → `D01`: `SHARED_ELEMENT`. The need **becomes** the quiet ledger fact. ⛔ **No automatic pipeline** — the `Supermercado · $48.720` row is a fact already present, never the visible result of a purchase the audience just watched.

---

## 23. SCENE D — Finance (`S09`)

**PURPOSE.** Show money as part of household organisation — the one module presentable without caveat.

**CURRENT FAILURE SUMMARY.** 5 states, 145 words, **14.5 s per press**, and `D-01` **BLOCKER**: the device text signature is **byte-identical across all five states** — **1 unique signature**. Eight spoken beats rest on one product state. `D-02` HIGH: the four `33 px` stage questions (`¿Internet ya está pago?` · `¿Qué pagos vienen?` · `¿Cuánto gastamos este mes?` · `¿En qué se nos está yendo más?`) are the narration copied to screen and are the only thing that changes. `D-03` HIGH: `Movimientos`, `Nuevo movimiento`, the account/card selector and `Límites` have **no state at all**. `D-05`: anatomy diverges — `11 px` uppercase micro-labels against the target's `18 / 700` sentence case; a filled `#C96B45` balance block against the target's transparent `24 / 800 tabular-nums` coloured by verdict; and a **fourth brand colour**. `D-07`: `Resumen` is on screen before the speaker says it.

**TARGET: 6 beats, 1 `AUTO`.**

| Beat | Anchor | BUILD — verbs | TRUTH / family |
|---|---|---|---|
| `D01` | L180-190 | **PRESERVE the composition order** (`D-08` POSITIVE): period scope → tab row → balance → `Pagos próximos` → `Por categoría`. ⛔ **The `60 px` stage title enters AFTER its spoken line** — today it is at `opacity 1` from `step00`. ⛔ **Rebuild anatomy to the target**: section labels `18 / 700` sentence case; balance `24 / 800 tabular-nums`, **transparent**, negative `#B53042`; `Pagado` carries a text/icon carrier, **never colour alone**. | `REAL_NAV` · `D-05` + `D-07` |
| `D02` | L192-194 | **CREATE.** `Nuevo movimiento` open, `Cuenta` focused, the **`Personal \| Hogar`** scope switch visible **and visibly re-scoping the numbers**. ⛔ Use the real copy: `Monto por definir` · `Caja chica → Saldo sin establecer`. | `REAL_NAV` · `D-03` + `D-04` |
| `D03` | L196-204 | **CREATE.** `Pagos` with the household payments list at `1.00` — `Internet / Pagado / $38.450` · `Seguro del auto / En 6 días / $62.800`. ⛔ **DELETE all four narration-on-screen questions.** | `REAL_NAV` · **`D-01`/`D-02` BLOCKER** |
| `D04` | L206-210 | **CREATE.** `Límites` at `1.00` — `General` / `Por categoría`, `Mensual / Anual`, and the real verdict strings (`Te quedan …`, `Superaste por …`). ⛔ It may be folded into `Resumen` **only if the target does so** — it does not. | `REAL_NAV` · `D-06` · `SI-22` |
| `D05` | L212-222 | **REPLACE** the two text states with real `Resumen` then real `Análisis`. ⛔ **The monthly figure may not appear before the question that asks for it.** | `REAL_NAV` · `D-01` |
| `D06` | (silent) | **CREATE the extraction.** The typed `EXPENSE` row **`PlayStation 5 · Mar 2024 · $580.000`** is **extracted from `Movimientos`** and becomes the Asset identity. `AUTO shared 640`. ⛔ **The device must NOT move.** ⛔ **The Asset must not repeat the price as its own field** — `N-37` is decisive: Assets never keeps a second monetary truth, `date` belongs to Finance, maintenance belongs to Planner. | `SHARED_ELEMENT` `finance.ps5_movement` · **`D-09` BLOCKER** · `N-37` |

**THE DATASET — frozen, `N-22` resolved.** One consistent dataset across Scene D **and** the Homi Finance beat:

```
Supermercado            $48.720
Monthly supermarket   $184.320
12 movimientos
Nafta                   $32.500
PS5          Mar 2024 · $580.000      ← as a FINANCE MOVEMENT, not an Asset field
```

⛔ **`$61.800`, `Alimentación`, `$24.500`, `$18.600` are non-canon and must not be introduced.** The current S09 shows `−$55.700` / `+$350.000` / `$24.500` / `$18.600` — **all of it is replaced.**

**`12 movimientos` placement (resolves `I-28`):** it is **not renderable in `Resumen`** (Integration's `FinanceAnalysisDetailScreen` renders label+amount+percent only, and `finance_6d_resumen_dashboard_tests.ts` explicitly forbids count rows in `Resumen`). It **is** renderable in the movement filter sheet (`FinanceMovementFilterSheet` renders `${count} movimiento(s)`). **Back it with the filter sheet.**

**Required distinction:** `"supermercado"` is a **natural-language merchant token**. `Alimentación` and `Compras` are **category-taxonomy keys**. ⛔ Do not require the spoken word to be a category key, and ⛔ do not treat the mismatch as a defect.

**PRESERVE.** Composition order (`D-08`) · `tabular-nums` on money · the `Resumen | Movimientos | Pagos` tab row · the `300×620 @ 250,50` device at `1.00`.

**DELETE from Scene D.** All four `.s09-question` `33 px` stage texts · the uniform `.s09-phone-slot` static state · the filled brand balance card · the `11 px` uppercase section labels · the `Alimentos $24.500` / `Transporte $18.600` dataset · the `−$55.700` / `+$350.000` figures.

---

## 24. SCENE E — Assets / HomeCloud (`S10`)

**PURPOSE.** Give the object identity, then prove why a house needs a memory and not only storage.

**CURRENT FAILURE SUMMARY.** 5 states, 142 words, **14.2 s per press**. `E-04` **BLOCKER**: the warranty-versus-memory thesis — the reason HomeCloud exists — has **no visual support and no available state**, because `S10_step04` is the last state and the exit is a cross-mount to black. `E-01`: the Assets detail is a two-row document list, **~42 % of the device empty** (~250 px of a 602 px screen). `E-02` HIGH: none of the three spoken causals has evidence. `E-03`: `Factura` is **missing** from Assets and appears in HomeCloud as `Factura TV`, an unrelated object. `E-05` HIGH: HomeCloud Memories uses **CSS gradients as photo stand-ins**, which the product freeze forbids. `E-06`: a **drawn fake waveform**. `E-07`: Memories is a flat list; the album is never entered. `E-08`: the birthday callback is on the **wrong date** (`20 ago`, a Thursday) against the Plan's `Sábado` (22 ago). `E-09`: three Assets rows are absent from the target dataset and never recur. `E-10` MEDIUM: `step02→03` is a 480 px slide with **both document rows present in both layers as separate DOM instances** at `y 202.4 / 288.9 → 210.2 / 297.2` — a **+7.8 px** offset. `E-13`: the exit **destroys HomeCloud at full opacity** in a single cross-mount.

**TARGET: 7 beats, 3 `AUTO`.**

| Beat | Anchor | BUILD — verbs | TRUTH / family |
|---|---|---|---|
| `E01` | L234-236 | **PRESERVE the 1.08 device at the stage-left anchor** (`N-41`; `E-11`'s instinct is preserved, its claim to uniqueness is **false**). ⛔ **Declare the 23 px safe-area breach** in the code as intentional. **REPLACE the dataset** with the target's: keep `PlayStation 5`; **delete** `TV · Living` and `Aire acondicionado · Dormitorio` (`E-09`); add `Toyota Corolla` · `Taladro Bosch` · `Impresora HP`. `Heladera` **stays** — it is the earned `SE-01` callback. | `EDITORIAL` · `N-41` · `E-09` |
| `E02` | L238-241 | **PRESERVE the measured mechanism** (`assets-row` eff `{1, 0.55}`). ⛔ **DELETE every Assets-owned money / date / maintenance field.** ⛔ **Only `Garantía` is a genuine Asset Record** (`ASSETS_V2:266`). Showing `Comprada: Mar 2024` is **itself the defect** (`N-37`; `MASTER §9 E0` is stale on two of three fields). | `EDITORIAL` · `N-37` · `E-02` |
| `E03` | L243-247 | **REBUILD** the detail with **all five target sections in the frozen order**: `IDENTIDAD → PERSONAS Y UBICACIÓN → PRÓXIMO → DATOS Y DOCUMENTOS → HISTORIAL`. ⛔ **An empty section does not render.** `PRÓXIMO` is a read-only Planner projection: *"Se resuelve en el Planner. Acá no se completa nada."* **Fill the empty 42 %.** | `REAL_NAV` **intra-Assets only** · `E-01` · `N-13` |
| `E04` | L249-251 | **REPLACE the 480 px slide with a `SHARED_ELEMENT` extraction.** The `Garantía PlayStation 5` document **detaches** from the Assets detail and **lands as the same object** on the first HomeCloud `Documentos` row — **same y, same width, same type size**. The Assets surface lowers to `0.35` in place; HomeCloud fades up **in the same device**. `AUTO shared 640`. ⛔ **The device must NOT move.** ⛔ **One instance — never two.** ⛔ **No fake tap.** This is `MASTER E3` verbatim: *"Assets baja; Documentos permanece; aparece HomeCloud."* | `SHARED_ELEMENT` `asset.ps5.documents` · `E-10` · **`N-31`** · `MASTER:237` |
| `E05` | L253-256 | **REBUILD.** HomeCloud `Recuerdos` with the birthday memory at the **correct date** (`Sábado · 22 ago`, not `20 ago`) and the **album opened** (`E-07`). ⛔ **DELETE the CSS-gradient photo stand-ins** — replace with real imagery, or with the target's labelled empty state (`Vacío` on `#FFE3DA`). ⛔ **DELETE the drawn waveform** (`HC_V2:334 no fake waveform`) — ⛔ **but audio itself is APPROVED** (`HC_V2:316`); keep an audio entry, remove the fake waveform. ⛔ **DELETE `Factura TV`**; use `Factura de compra.pdf`. | `SHARED_ELEMENT` `birthday.memory` · `E-05`/`E-06`/`E-07`/`E-08` · **`N-29`** |
| `E06` | L263-266 | **CREATE — THE MISSING STATE PAIR.** Three-layer composition: HomeCloud stays **recognisable** behind at `0.30`; the `Garantía` isolated **one side at `0.55–0.60`**; the birthday photo **the other side at `1.00`**. Sequential emphasis, `AUTO 600`, `300 ms` stagger. ⛔ **NEVER write `documentos vs recuerdos`** — its absence is currently a positive and must stay a positive (`MASTER E9`). | `SHARED_ELEMENT` `warranty.ps5` + `birthday.memory` · **`E-04` BLOCKER** |
| `E07` | L268-269 | **REBUILD.** **Exposure-down FIRST, then reset to black.** `exposure 360` → `reset 520` → `HOLD`. ⛔ Never simultaneous. ⛔ **The black is correct — the path to it is not** (`E-13`). | `EDITORIAL` · `E-13` |

**`E04`/`E05` device choreography (binding, resolves the apparent tension):**
- `E01`–`E04`: device **stage-left**, `1.08`. **It does not move during `E04`.**
- `E05`: device moves **stage-right**, `1.08`, `spatial 500`, as HomeCloud settles into its own space.
- `E06`–`E07`: device **stage-right**, `1.08`.

**PRESERVE.** `E-12` POSITIVE: the `Documentos | Recuerdos` domain switch and the HomeCloud section vocabulary · the `1.08` instinct · the `PDF` tile vocabulary shared with Assets and Inventory · the Assets list anatomy · the decision **not** to write `documentos vs recuerdos` · the target's domain-switch timing (`280 ms` track travel, `200 ms` label colour).

**DELETE from Scene E.** `Factura TV` · `TV · Living` · `Aire acondicionado · Dormitorio` · the drawn waveform · both gradient photo stand-ins · the 480 px `motion-spatial-wipe` slide · the second DOM instance of each document row · the 20 ago date · the `1.08 → 1.15` enlargement recommendation (Session 3's) — **there is no third scale.**

**PRODUCT TRUTH NOTES.**
- ⛔ `Home → Assets → PS5 → Documentos` **cannot** be shown as a tap path. `Assets` is `FROZEN — Product Target`, `READY_FOR_IMPLEMENTATION`; Integration has **0 routes, 0 services, 0 tables**; the only residue is `'assets'` as a reserved `ALLOWED_ORIGIN_MODULES` value with no producer.
- ⛔ `Asset → HomeCloud Files` exists in Figma as `push('homecloud')` **with no id** — real nav, **no data link**. Represent editorially.
- ⛔ No `Horarios`, no Milestones, no fourth Planner tab, no amount-per-space in Inventory.
- `PRÓXIMO` on the Asset card is **read-only**; completion happens in Planner.

---

## 25. SCENE F — Continuity (`S11`)

**PURPOSE.** Prove that everything the audience just saw is one connected household, then hand the product to Scene G.

**CURRENT FAILURE SUMMARY.** 3 states, 74 words, **14.8 s per press**. `F-01` **BLOCKER**: **8 DOM nodes total for the entire scene**; 4 of 6 spoken beats unrepresented. `F-03` HIGH: the two on-screen lines are **not** the script's two lines (`La vida no pasa por módulos.` / `HomePlus los conecta.` against *"la vida no ocurre separada en módulos"* / *"HomePlus tampoco debería sentirse así"*) — `SI-14`. `F-05` HIGH: Scene F ends on text, so **there is no shared element to hand to Scene G**. `F-02` HIGH: the black entry costs a whole press and establishes nothing.

**TARGET: 5 beats, 0 `AUTO`.**

| Beat | Anchor | BUILD — verbs | TRUTH / family |
|---|---|---|---|
| `F01` | L275-283 | **PRESERVE the black** (`F-P1`) but **establish it with the scene-entry transition, not a dedicated press** (`F-02`). ⛔ No text. ⛔ No glow. | `EDITORIAL` |
| `F02` | L285-292 | **CREATE.** Six **concrete** household situations, one at a time or in one shared `0.55` band, each **reused from Scenes A–E** — ⛔ no new iconography. Then the six **abstractions** enter at `0.55`: `personas` · `fechas` · `responsabilidades` · `ubicaciones` · `gastos` · `archivos`. Then **at most THREE** relations appear as thin links at `0.55–0.65`, drawn from the six frozen relations: `persona↔responsabilidad` · `responsabilidad↔fecha` · `persona↔ubicación` · `gasto↔archivo` · `fecha↔responsabilidad` · `persona↔gasto`. ⛔ **NO spiderweb. NO ERD. NO giant network diagram. Maximum 3 links — six is the named failure mode.** ⛔ **No six boxes with big titles** (`NO_UI F04`). | `EDITORIAL` · `F-04` SUBSUMED |
| `F03` | L294 | **CREATE.** The abstractions resolve **back into the everyday objects** at `1.00`, abstractions to `0.30`. ⛔ The convergence must land on **product objects**, not on abstract nodes. | `SHARED_ELEMENT` · `F-01` · `MASTER F4` |
| `F04` | L296 | ⛔ **DELETE both on-screen lines.** The spoken line is *"la vida no ocurre separada en módulos"*; the screen reads `La vida no pasa por módulos.` (`SI-14`). Neither is one of the six `MASTER §2.3` approved texts, so **both are spoken only.** ⛔ **DELETE the `56 px` resolution line.** ⛔ **`F04` carries NO TEXT.** The empty frame after `F03` is the point. ⛔ **PRESERVE the typography profile** `F-P2` as the deck's reference for any future line: `120 px`, `lh 1.04`, `ls -0.03em`, `w600`, `783.02 × 249.59`. | `EDITORIAL` · `F-03` · `SI-14` |
| `F05` | L298 | **REPLACE with the PRODUCT.** The device enters and centres. This is the object Scene G inherits. | `SHARED_ELEMENT` · `F-05` |

**PRESERVE.** `F-P2` the thesis typography profile · `F-P3` the honesty about its own emptiness (no glow, no network, no invented objects) — **this scene is the TEMPLATE, not the thing to fill** · `F-P4` `#060404` · `F-P5` state-driven and reversible.

**DELETE from Scene F.** `La vida no pasa por módulos.` · `HomePlus los conecta.` · `.s11-bridge`'s black-on-black wrapper · the dedicated black-entry press.

**FORBIDDEN, explicitly.** Spiderweb · ERD · giant network diagram · everything moving at once · any invented object · any glow · any box with a big title.

---

## 26. SCENE G — Frontend / Backend / Stack (`S12` `S13`)

**PURPOSE.** Impress a technical viewer by *explaining*, not by decorating — and land "una sola experiencia".

**CURRENT FAILURE SUMMARY.** 7 states, 209 words, **13.9 s per press**, and `deviceCount = 0` in **all seven**. `G-01` **BLOCKER**: the product is not on stage. `G-02` **BLOCKER**: all five vendor logos are on stage before the speaker names one. `G-03` **BLOCKER**: the frontend is explained with no frontend. `G-04` **BLOCKER**: `RECIBE / VALIDA / RELACIONA / GUARDA / DEVUELVE` appear **zero times** in `src/`. `G-05` **BLOCKER**: the one concrete transaction does not exist. `G-12` **BLOCKER**: the AI claim is unsupported (`0` providers, `0` routes, `0` edge functions, `0` env) **and** the `ai.svg` glyph is a three-node hub in brand orange — the named "AI cliché". `G-15` **BLOCKER**: the recomposition argument does not exist. `G-08` HIGH: `S13_step03 → S14_step00` re-mounts the entire stack — **0 animating, 88 entering / 57 exiting** — replaying the whole entrance at **effective `1.00`** with text byte-identical. `G-09` HIGH: `S13_step00` is a byte-identical remount of `S12_step02` (dead press). `G-10` HIGH: Figma sits in a `140 px` centre column **between** the two cards, encoding a false architecture. `G-13`: the mono→brand-colour crossfade carries no information. `G-14`: five spoken ideas collapse into one press. `G-16`: the two cards are **visually identical** (`460 px`, `80 px` titles, `52 px` logos). `G-07` MEDIUM: the decorative `140×2 px` bridge line survives into S14 and forms a `+` with the barrier line.

**TARGET: 9 beats, 4 `AUTO`.**

| Beat | Anchor | BUILD — verbs | TRUTH / family |
|---|---|---|---|
| `G01` | L304 | **CREATE.** The real HomePlus device, **centred, alone, `1.00`**, holding for the **whole of L304**. ⛔ No logo, no label, no panel on this beat. | `DEVICE_TRANSITION` · **`G-01` BLOCKER** · `MASTER G0` + `NO_UI G00` |
| `G02` | L306 | **CREATE.** Device moves to the stage-left third. Discrete `FRONTEND` label. `AUTO 1140`: three local-focus steps on **real elements of the real UI** — **screen surface `1.08` → a real button `1.15` → the real navbar/menu `1.10` → `1.00`**. Each returns to `100 %` before the next. ⛔ **No large words.** ⛔ All seven §11.4 preconditions. | `EDITORIAL` · **`G-03` BLOCKER** · `MASTER G1` |
| `G03` | L308 | **CREATE.** A backend plane emerges **from behind** the device toward the right. `AUTO 1100`: `RECIBE → VALIDA → RELACIONA → GUARDA → DEVUELVE`, **one active at a time**, ~220 ms each, `26–32 px`, hierarchy **by active state**. On `RELACIONA`, hold ~600 ms and show the `Persona` + `Hogar` chips. ⛔ **NO server rack, NO terminal, NO code rain, NO cylinder.** ⛔ The plane is **behind** the device, never a peer card. | `DEVICE_TRANSITION` · **`G-04` BLOCKER** · `NO-UI §13` |
| `G04` | L310 | **CREATE the transaction.** `AUTO 1400`: `$48.720` visible in the frontend amount field → **shrinks** → **crosses behind the device frame** → reappears backend-side → `RECIBE` → `VALIDA ✓` → `RELACIONA` → `GUARDA` → `DEVUELVE` → the response returns to the frontend → hold ~400 ms on `movimiento guardado`. ⛔ **Delete `.s12-bridge` and `.s13-bridge` entirely** — line and node (`G-07`). The connection is **the data travelling**. | `SHARED_ELEMENT` `finance.supermarket_movement` · **`G-05` BLOCKER** · `N-22` |
| `G05` | L314 | **REPLACE the timing.** React Native at `1.00`, then `100–150 ms` later Expo at `1.00`. ⛔ **Drop the mono→colour crossfade** — keep the two-variant mark mechanism (`G-P4`), delete the crossfade (`G-13`). ⛔ **No colour crossfade at all.** | `EDITORIAL` · `G-02` |
| `G06` | L316 | **REPLACE the timing.** Node, then Supabase, then PostgreSQL — **one press each**, attached to the backend plane. **PRESERVE the role captions verbatim** (`G-P1`): `Interfaz móvil` · `Build y preview` · `API y lógica` · `Auth y datos` · `Base de datos`. | `EDITORIAL` |
| `G07` | L318 | **REPLACE the position.** Figma **attached to the frontend side**, never on the centreline. ⛔ **Delete the `140 px` `.s13-center` column.** ⛔ This beat is **separate** from `G08` — the script gives Figma and IA two sentences. ⛔ Figma never implies it runs in production. | `EDITORIAL` · `G-10` + `G-11` |
| `G08` | L320 | **REPLACE the glyph.** **IA as plain type plus a role caption.** ⛔ **NO glyph. NO glow. NO AI aura. NO provider logo. NO node graph. NO core-glow.** ⛔ **DO NOT PRESCRIBE AI ANIMATION WHILE `G-12` IS ACTIVE.** | `EDITORIAL` · **`G-12` BLOCKER** · `N-14` · `G-P2` |
| `G09` | L322-326 | **CREATE the recomposition.** `AUTO 1200`, `120 ms` steps: the backend plane retreats · RN/Expo converge · Figma dissolves · IA integrates · **the device returns to centre and grows slightly**. Final state: **exactly one product and nothing else.** ⛔ No residual plane, no residual logo, no residual line. | `SHARED_ELEMENT` · **`G-15` BLOCKER** · `MASTER G5` |

**PRESERVE.** `G-P1` all five role captions verbatim · `G-P2` no AI provider logo · `G-P3` the backend cliché restraint · `G-P4` the mono/colour two-variant mechanism (crossfade dropped) · `G-P5` panel typography · `G-P7` state-driven reversibility.

**DELETE from Scene G.** The two identical `460 px` cards (`G-16`) · the `.s12-bridge` / `.s13-bridge` lines and nodes (`G-07`) · the `140 px` `.s13-center` column (`G-10`) · `ai.svg`'s three-node glyph and `.s13-core-glow` (`G-12`) · the mono→colour crossfade (`G-13`) · `S13_step00` (`G-09`) · the dead CSS `.s12-tech img { color: #ece5d8 }` (`G-17`).

**`S13 → S14` is ELIMINATED IN TARGET.** **Option A is chosen:** the stack **persists** across the boundary and only changes exposure — `H01` re-uses the mounted composition and the stack is already gone. In both options the rule is identical and binding: **the echo is a DIMMING of an existing composition, never a REBUILD of it.**

**`G-06` and the technology order — `CF-15`, OPEN by design.** `MASTER §11 G4` and `NO-UI §13` put Figma **first**; script L318 puts it **fourth**. ⛔ **Do not resolve this from file timestamps** (`N-16`). ⛔ **Do not reorder the speaker's lines.** **The choreography is designed so it does not matter**: `G07` is its own `MANUAL` beat and moving one logo is a one-beat change. ⛔ **Do not silently reorder the speaker's lines.** Owner = **script owner**.

**`SI-11` note on the AI claim.** ⛔ The script line at L320 is a `SCRIPT ISSUE` owned by the **script owner**. The blueprint specifies the **stage treatment** — plain type, no glyph, no glow — because that is what is safe today regardless of how the sentence is re-issued. **The audit does not rewrite the script** (`N-44`).

---

## 27. SCENE H — Barrier / Friction (`S14`)

**PURPOSE.** Show that every interface has **interaction cost** — not that HomePlus is badly designed.

**CURRENT FAILURE SUMMARY.** 5 states, 63 words. `H-01` **BLOCKER**: **no interface at all** — the friction cannot be shown. `H-02` **BLOCKER**: the warranty route names **three nodes that do not exist** (`Assets`, `PlayStation 5`, `Documentos` — `0` matches for `playstation|ps5|warranty|garant` across `front/`, `backend/`, `supabase/`). `H-05` **BLOCKER**: the routes are **fabricated text pills** colliding with stage text by `102.66 × 21.8 px`, `120.86 × 19.0 px` and `62.26 × 50.8 px`. `H-04` **BLOCKER**: the absolving sentence has no clean state, so the scene implies HomePlus is badly designed. `H-06` HIGH: the attention reset and the question arrival are the **same press** with 3 concurrent animations — residue and question coexist ~420 ms. `H-07` HIGH: the silence on the key question has no mechanism. `H-08`: the `→` glyphs are static; motion conveys no depth. `H-10`: the question is `112 px + 68 px` against the frozen `88–96 px`. `H-11`: the barrier line at `left 50%` sits **exactly in the gap between the echo's Frontend and Backend cards** — it invites a front/back reading, *"the opposite of what the scene is about."* `H-12` HIGH: the entire technical stack is the **background** of the friction scene (measured `.s13-stage` and both `.s13-panel` at effective `1.00`).

**TARGET: 7 beats, 2 `AUTO`.**

| Beat | Anchor | BUILD — verbs | TRUTH / family |
|---|---|---|---|
| `H01` | L330-331 | **REPLACE the remount.** The recomposed device from `G09` at `1.00`, **alone**, stage-right. ⛔ **The stack must NOT be re-mounted** (`G-08`). ⛔ No echo above `0`. | `DEVICE_TRANSITION` · `G-08` |
| `H02` | L333-334 | **CREATE the interface.** Device at `0.75`; **one real task route at `1.00`**, built from product-safe components, accumulating left-to-right at `60–100 ms` per node: **`Inicio → Calendario → Tareas → + → Nueva tarea`**. ⛔ **Delete `.s14-node` text pills entirely** (`H-05`). ⛔ **Do not show `Home → Planner → Tareas → +`** — that chain **mislabels two of its four nodes** (`H-03`): the real home tab is `Inicio`, `Planner` is a screen header not a tap target, and `+` opens a **modal sheet**, not a route. | `REAL_NAV` · `H-01`+`H-02`+`H-05` BLOCKER |
| `H03` | L335-336 | **CREATE the editorial warranty route**, real nodes only: **`Más → HomeCloud → Archivos → Buscar → Garantía PlayStation 5.pdf`**. ⛔ **No invented warranty node.** ⛔ **No fake tap** — this route is editorial and must read as editorial (`MASTER §2.4`, three honesty tests). | `EDITORIAL` · **`H-02` BLOCKER** · `N-13` |
| `H04` | L338-339 | **CREATE — THE MISSING STATE.** **Everything clears. ONE clean product state at `1.00` with nothing around it.** `AUTO`: `exposure 360` then `spatial 500`, hold for the whole of L338-339. ⛔ **No labels around it** (`MASTER H3`: *"No añadir etiquetas alrededor"*). This state **is** the guarantee that no technical-stack residue precedes the absolving line. | `EDITORIAL` · **`H-04` BLOCKER** |
| `H05` | L341 | **CREATE the hold.** `reset 520` then **`HOLD`** while the speaker speaks the prelude. ⛔ Nothing arrives during the hold. | `EDITORIAL` · `H-07` |
| `H06` | L343 | **REPLACE the typography.** ⛔ **Both lines in `--presentation-text` (`#F5F1EB`), `88–96 px`, two lines, centred, nothing else** (`NO_UI H08`). ⛔ **PRESERVE the two-line break and the large setting** (`H-P2`). ⛔ **Delete the barrier line** (`H-11`). **On-screen wording is the `MASTER §2.3` approved sentence**: `¿Y si ni siquiera tuviéramos que saber cómo?` — ⛔ the script's variant is a `SCRIPT ISSUE` (`SI-13`) owned by the script owner. **This beat is a SEPARATE press** from `H05` (`H-06`). | `EDITORIAL` · `H-10` + `H-P1`/`H-P2` |
| `H07` | registry | ⛔ **NO shared element to the Homi name.** `SE-15` is a deliberate negative entry. The honest transition is a black reset followed by the name alone. | `EDITORIAL` |

**Exposure curve — target, not current.** Today it **inverts** `MASTER §12 H0` (maximum presence at the entry, minimum at the thesis). Target: `100 % (H01) → 75 % (H02/H03) → routes at 1.00 → 100 % on the clean device (H04) → 40 % prelude → black (H05)`.

**`H-01` ⛔ IS NOT `H-02`.** They share a scene and **not a cause**: `H-01` = *no interface on stage* (`RC-02`); `H-02` = *route names non-existent nodes* (`RC-14`). Both must be fixed. Fixing Assets' **authority** (`N-13`) does **not** create the **route**.

---

## 28. SCENE I — Homi hero (`S15` `S16` `S17`)

**PURPOSE.** Prove that Homi works **OVER** HomePlus — not beside it, not instead of it.

**CURRENT FAILURE SUMMARY.** 14 states, 309 words, **2 min 04 s**, and the device box is **`718,25,324,670` with `matrix(1.08)` identical in all 14**, `deviceCount = 1` throughout. `I-21` HIGH: the three **frozen** `MASTER §2.9` device directions are **all unimplemented**. `I-01` **BLOCKER**: wrong demo, wrong proposal, no cancel path — the request reads `Agendá que mañana Tomi tiene entrenamiento una hora más tarde.` against frozen canon `Haceme acordar de comprar una Coca mañana`, and the proposal is a **sentence**, not a structured proposal. `I-02` **BLOCKER**: no execution proof — the shared element never crosses the chat boundary. `I-03` **BLOCKER**: the on-stage question reads **`¿Qué tengo que hacer hoy?`** while script, master and the whole thesis say **`mañana`**. `I-04` **BLOCKER**: `S17_step03` shows `.homi-done` `Confirmado / Entrenamiento actualizado` at effective `1.00` while the stage says *"La decisión es nuestra."* `I-05` **BLOCKER**: no visual HomePlus surface at all — the device **is** the Homi chat in all four S17 states. `I-06` **BLOCKER**: the entire Finance beat is absent — 15 spoken lines with zero visual support. `I-09` HIGH: the forbidden titular `La misma pregunta. / Distinto contexto.` at `56 px`, painted at `1.00` in **all five** S16 states, **states the conclusion and takes the discovery from the audience**. `I-10` HIGH: `phoneCount = 1`, so the comparison argument is never made. `I-11` HIGH: Tomi's answer `Hoy tenés entrenamiento a las 17 h. Mamá te pasa a buscar a la salida.` **contradicts the script fact** that `mamá ya no llega` and introduces a **third time value** against canon `18:00–20:00`. `I-12` HIGH: Papá's answer invents `revisá la lista de compras` — **excluded by name three times** — and asserts `Internet ya está pago` as fact when it is an open question in Scene D. `I-13` HIGH: `Basado en tu contexto` is not in the script and is not proof. `I-20`: two stage headlines cross-fade (`54 px → 0.4` while `84 px → 1.0`). `I-24`: **0 transition animations** at all three Scene-I boundaries — hard cuts.

**TARGET: 17 beats, 6 `AUTO`.**

### 28.1 The three frozen `MASTER §2.9` directions — all currently unimplemented

| # | Frozen direction (verbatim) | Current | Target |
|---|---|---|---|
| 1 | *"el teléfono auxiliar de Planner: entra desde un lateral, recibe la task y vuelve a salir"* | ⛔ `phoneCount = 1` | **`I06`** |
| 2 | *"respuestas Juli/Tomi: salen desde detrás del teléfono central hacia izquierda/derecha"* | ⛔ `phoneCount = 1` | **`I09`** |
| 3 | *"cambio entre Homi y UI visual en Control Humano: el dispositivo actual sale hacia arriba; siguiente entra desde abajo"* | ⛔ `phoneCount = 1`; the device **is** the chat | **`I13`** |

**Direction 3 is the one that proves the thesis.** ⛔ Today the screen shows a chat and claims the interface is better. **The motion must show the interface.**

| Beat | Anchor | BUILD — verbs | TRUTH / family |
|---|---|---|---|
| `I01` | L349 | **CREATE.** `reset 520` to absolute black, then the name **`Homi` ALONE** via `hero 880`, `cubic-bezier(.16,1,.3,1)`. ⛔ No glow, no aura, no orb, no particles, no sphere (`NO_UI §5`). ⛔ **The black `HOLD` before it is retained under reduced motion.** ⛔ `Geni` vs `Homi` is a **wording** `SCRIPT ISSUE` (`SI-01`) owned by the script owner; the stage shows `Homi`. | `EDITORIAL` · `I-24` · `N-21` |
| `I02` | L351-353 | **REPLACE.** Device enters (`spatial 500`); the `110 px` wordmark **settles to `0.40`** as a quiet label (`exposure 360`, `120 ms` after the device settles). ⛔ **The device must settle before the wordmark resolves.** | `DEVICE_TRANSITION` · `I-02` |
| `I03` | L353-355 | **REPLACE the string.** `Haceme acordar de comprar una Coca mañana` — real transcription, real send. ⛔ **Preserve the `320 ms` fade + `10 px` rise primitive** (Session 5 positive #3). | `EDITORIAL` · **`I-01` BLOCKER** |
| `I04` | L356-358 | **REBUILD as a structured proposal**, three lines plus a two-action row: **`Crear tarea`** / **`Comprar una Coca`** / **`Mañana`** / **`Cancelar`** \| **`Confirmar`**. ⛔ **Not `recordatorio`.** ⛔ **Not a sentence.** ⛔ Distinct CSS classes for proposal / answer / decision (`I-22`). `micro 200` focus on mention. | `EDITORIAL` · `I-01` + `MASTER I3` |
| `I05` | L358 | **REBUILD.** The decision control with **both** actions. ⛔ **No reflow** — measured `.homi-decision-row` `scrollHeight 64 → 54` as it appeared, which is forbidden. | `EDITORIAL` · `I-19` |
| **`I06`** | L360-365 | ⛔ **THE HERO SHARED SEQUENCE — full choreography in §28.2.** `AUTO 1400`. `HOLD` **without confirming**. | `SHARED_ELEMENT` · **`I-02`/`I-04` BLOCKER** · `NO_UI §4` worked example |
| `I07` | L369-371 | ⛔ **DELETE `S16_step00`** — the empty Homi state is re-shown after a 5-state conversation (`I-07`). ⛔ **DELETE the `56 px` titular** `La misma pregunta. / Distinto contexto.` (`I-09`). Start with the question already sent. | `EDITORIAL` · `I-07` + `I-09` |
| `I08` | L373-375 | **REPLACE the wording**: `¿Qué me queda para mañana?`. ⛔ **`hoy` → `mañana`** (`I-03` BLOCKER). ⛔ **PRESERVE the bubble geometry `777,187,238,81`** — byte-identical across all three personas (Session 5 positive #4, re-measured). That invariance **is** the implementation of "same question, different answers". | `SHARED_ELEMENT` · `question.what_is_left_for_tomorrow` |
| `I09` | L385-391 | **CREATE.** Centre device + two laterals emerging **from behind** at `106 px` gaps. The question **extracted above the row at `56 px`**. Answers stay at **native scale inside their own devices**. `AUTO 500`, `120 ms` stagger. ⛔ **No rhetorical headline.** ⛔ **Never shrink the devices to fit.** ⛔ **Never claim a numeral count is approximate.** | `SHARED_ELEMENT` · `I-10` · `MASTER I7` |
| `I10` | L393-397 | **REBUILD the data.** Three distinct answers using **only real capabilities**. **Juli — KEEP verbatim:** `Hoy tenés Educación Física a la mañana, llevar la autorización y la tarea de Matemática.` (canon-consistent, Session 5 POSITIVE). **Tomi — REPLACE:** `Hoy tenés entrenamiento de 18:00 a 20:00. Entregá el trabajo de Historia.` ⛔ No `17 h`; ⛔ **no `Mamá te pasa a buscar`** — the script fact is that `mamá ya no llega` (`I-11`). **Papá — REPLACE:** `Hoy: revisar los pagos del hogar y confirmar el turno del técnico.` ⛔ **No `lista de compras`** (`N-06`); ⛔ **no asserted `Internet ya está pago`** (it is an open question in Scene D); ⛔ no `4-hour window` converted into a fixed appointment. **Papá's avatar** must not read as disabled (`I-25`) — `#4A4542` neutral grey reads as off. | `SHARED_ELEMENT` · `I-11` + `I-12` |
| `I11` | L399-407 | **CREATE — THE MISSING FINANCE BEAT.** The real Finance surface enters as a second device from a lateral; Homi answers from it. **`N-22` canon exactly:** `Supermercado · este mes` / **`$184.320`** / **`12 movimientos`** (backed by the movement **filter sheet**, not `Resumen`). ⛔ **No `$61.800`, no `$24.500`, no `$18.600`.** ⛔ **No generic module names.** | `SHARED_ELEMENT` `finance.supermarket_movement` · **`I-06` BLOCKER** |
| `I12` | L415-421 | **REPLACE.** Request and response at `1.00`; **real** Finance components behind at `0.55`: relevant movements · category · `Hogar` context · period. ⛔ **DELETE `Basado en tu contexto`** (`I-13`). ⛔ **Do not show a whole Finance screen if it adds nothing** (`MASTER I10`). | `EDITORIAL` · `I-13` |
| `I13` | L425-429 | **CREATE — THE BEAT THAT PROVES THE THESIS.** Current device exits **UP**; the visual HomePlus surface (Finance/Análisis) enters **from BELOW**. **Both surfaces visible at the midpoint.** `AUTO 1000`. ⛔ **Never simulate navigation between distant surfaces.** ⛔ In reduced motion, **both are present simultaneously at `0 ms`** — the simultaneity IS the meaning. | `DEVICE_TRANSITION` · **`I-05` BLOCKER** · `MASTER §2.9` dir. 3 |
| `I14` | L431-435 | **REBUILD the decision row.** `Cancelar` \| `Confirmar` both at `1.00`; **everything else at `0.20`** (`MASTER I13`). ⛔ **Relabel `Ahora no` → `Cancelar`.** ⛔ **No reflow.** | `EDITORIAL` · `I-19` |
| `I15` | L437-440 | ⛔ **DELETE the second stage headline** (`I-20`). One line only; the previous line **exits** rather than lingering at `0.40`. **Consequential proposal:** `Cambiar "Cumple de Juli"` / `Sábado · 19:00 → Domingo · 19:00` / `Cancelar · Confirmar`. ⛔ **`19:00` on both sides** — never `18:00` or `20:30` (`N-23`). ⛔ **This is the Homi framing of `birthday.event`** and must read as the same object. | `EDITORIAL` · `I-18` |
| `I16` | (the decision is **NOT** taken) | ⛔ **DELETE the `Confirmado` mutation state entirely** (`I-04` BLOCKER). `exposure 360` to the decision context, then `reset 520`, then **`HOLD` INDEFINITE**. ⛔ **Nothing confirms. No mutation state exists anywhere in the film. No `Confirmado` toast.** | `EDITORIAL` · `I-04` · `NO_UI I26` |
| `I17` | L442 marker | `reset 520` → absolute black. ⛔ **One continuous breath into Scene J — not two transitions.** `J-16`'s marker condition is impossible as written (Benja is the active speaker at L442); that is a **SCRIPT ISSUE** owned by the script owner. **The state is a motion requirement and is specified regardless.** | `EDITORIAL` |

### 28.2 `I06` — THE HERO SHARED SEQUENCE OF THE ENTIRE FILM

This is the most detailed motion specification in the blueprint. `NO_UI §4` gives this exact sequence as its own worked `AUTO` example.

**Semantic job:** prove that Homi does not live beside HomePlus — it works **over** HomePlus. One press. One atomic cause→effect. Ends on a `HOLD` in which **nothing is confirmed**.

| t (ms) | What happens | Token | Who owns what |
|---|---|---|---|
| **0** | Homi device at `0.55`; the proposal card `Comprar una Coca · Mañana` at `1.00` inside it. **The card is still owned by Homi.** | — | Homi owns the card |
| **0–60** | Context exposure begins: Homi device `0.55 → 1.00` begins; the thread dims to `0.30` | `exposure 360` | context recedes |
| **60** | **The card is promoted to `shared-layer`** — real DOM reparenting. Its painted geometry is frozen at its current rect. Homi now shows a slot. | — | **shared-layer owns the card** |
| **60–120** | **The auxiliary Planner device enters from the stage-left lateral** (`spatial 500`, `spatial` curve, `opacity 0→1`). ⛔ It is **the second device and only for this beat.** | `spatial 500` | the auxiliary device arrives |
| **120–700** | **Matched-geometry travel.** `translate` + `scale` from the source rect to the live destination rect inside Planner's `Tareas` list. **One quadratic-arc keyframe at `offset 0.55`.** This is the **only** arc authorised in the entire film. | `shared 640` | the card travels |
| **~700** | **Destination prelap:** the Planner task list's neighbours lift to `0.55` and the slot's row background resolves to `--home-brand-soft` — **before** the card lands. | `exposure 360` | the destination receives |
| **700–760** | **Tail settle.** Shadow lifts `0 → 1 → settle` over the last `120 ms`. **CRITICALLY-DAMPED FEEL VIA E-DEFAULT TAIL; NO SPRING SOLVER; NO OVERSHOOT.** ⛔ `ARCH-04`: no solver, no spring profile, no `motion`/`spring` dependency. The `120 ms` is an `E-DEFAULT` tail on the `shared` token — **not** a spring. NO bounce. NO rubber. | `shared` tail | the card lands |
| **760** | **Land.** `slot.replaceWith(card)`. Inline transform cleared. **The shared layer is now empty.** | — | **Planner owns the card** |
| **760–800** | **Hold, unspecified, quiet.** | — | stable |
| **800–1200** | **The auxiliary Planner device exits by the same lateral** (`spatial 500`, `opacity 1→0`). | `spatial 500` | the auxiliary device leaves |
| **1200–1400** | **Homi returns to `1.00`.** Nothing else moves. | `exposure 360` | Homi owns the thread again |
| **1400** | **STABLE HOLD, INDEFINITE. Nothing confirms.** | — | — |

**Overlap (communicating continuity, not three unrelated moves):** source exposure begins at `0`; promotion at `60`; travel `60→700`; destination prelap at `~700`; settle `700→760`. The destination **starts receiving before the object finishes travelling.**

**Motion budget:** exactly **2** meaningful movers at any instant — the travelling card, plus one context shift. ⛔ Never 3.

**Hard limits for `I06`:**
- ⛔ **NO cartoon bounce. NO visible oscillation.** ⛔ No spring (`ARCH-04`).
- ⛔ The device **must not move while its contents animate** — the auxiliary enters before the card travels and exits after it lands.
- ⛔ **The proposal is NEVER confirmed here.** This beat is the **execution demo**, not the decision. The decision is `I14`–`I16`.
- ⛔ **No `Confirmado` state may exist at any point in this sequence.**
- ⛔ **No detached copy, no duplicate device.** `ArrowLeft` returns the card to the chat.
- ⛔ The arc is **one** quadratic keyframe at `offset 0.55`. ⛔ No bezier path, no path tracing, no motion-path library.
- Reduced motion: the destination row is rendered **in place** at `0 ms`; the shared layer is never used; the `HOLD` is unchanged.

### 28.3 Scene I exposure contract

| Element | Value |
|---|---|
| Homi wordmark label | `0.40`, from `I02` onward |
| Decision context (`I14`–`I16`) | `0.20` |
| Both actions (`I05`, `I14`) | `1.00` |
| Homi device during `I06` | `0.55` mid-sequence, `1.00` after |

**PRESERVE.** `Homi chrome` (`HomeHeader` + `homeTokens` + `#C96B45` + `homi-mark.svg`) — it reads as HomePlus, not as a chatbot · the question-bubble invariance `777,187,238,81` · the `320 ms` bubble entrance · the `Cancelar / Confirmar` side-by-side row layout · the persona swap rhythm (differentiated: identity chip fades `200 ms`, answer card rises `320 ms` with `60 ms` delay — `I-23`).

**DELETE from Scene I.** `S16_step00` · the `56 px` titular · the `110 px` wordmark at `1.00` · `Ahora no` · the `Confirmado` / `Entrenamiento actualizado` mutation bubble · `Basado en tu contexto` · `lista de compras` from Papá's answer · `17 h` from Tomi's answer · the hard cuts at all three boundaries.

**PRODUCT TRUTH NOTES.**
- ⛔ Homi is **not** a verified current implementation (`N-14`, `N-21`). Choreograph conceptually. ⛔ **Do not assert implementation facts that do not exist today.** ⛔ **Do not conclude "Homi is fake"** — that is unsupported.
- ⛔ The current Tomi/Papá answers are `HIGH` data defects, not motion defects.
- ⛔ `Persona` and `Hogar` are real Finance/Planner concepts and may appear as chips.

---

## 29. SCENE J — Cinematic closing (`S18`)

**PURPOSE.** Deliver the argument, then let the technology leave the frame while the house and the family do not move.

**CURRENT FAILURE SUMMARY.** 4 states, 207 spoken words across two speakers, **20.7 s per state** — and **Colo's block alone is 61.6 s on 2 states.** `S18Closing/index.tsx` is **32 lines of JSX**. `J-01` **BLOCKER**: the entire closing argument is absent — 35 spoken lines resolve to an end card. `J-02` HIGH: only 220 ms of black, so the brand appears **inside Gaby's black block**, against `MASTER J00` which requires absolute black for the **whole** of her closing. `J-03`: the three physical objects do not exist as assets. `J-05`: no house, no family — so there is nothing for the technology to recede from. `J-06`: invisible work absent. `J-07`: the philosophy line has no held frame. `J-08`: 5 organisation categories absent — the only place in the closing with granular timing control. `J-09`: technology recession absent. `J-10`: the living moment is absent. `J-11`: the end card arrives **before** the argument. `J-14` HIGH: the closing object vocabulary must be produced from scratch. `J-13` LOW: the field is `#060404`, not literal `#000000`.

**TARGET: 14 beats, 3 `AUTO`.**

**KEY INVARIANT — the testable rule of the closing:**

> **THE HOUSE AND THE FAMILY DO NOT MOVE DURING `J11`.**
> **THE TECHNOLOGY RECEDES. LIFE DOES NOT.**
>
> During the 1400 ms of `J11` the family group's geometry signature must be **byte-identical**. Only the phone-geometry group, the organisation elements and the orange line change. `T-SEM-18` verifies this automatically.

| Beat | Anchor | BUILD — verbs | TRUTH / family |
|---|---|---|---|
| `J01` | Gaby's whole block | **REBUILD.** `reset 520` then **`HOLD` for the whole of Gaby's block (~24.5 s)**. ⛔ **No text. No logo. No animation. No HUD.** ⛔ **The brand does NOT appear here** — that is `J-02`'s current defect. | `EDITORIAL` · `J-02` + `J-11` · `MASTER J0` |
| `J02` | L462-465 | **CREATE.** The physical objects return — **three objects from the set the opening established**: `physical.bolsa` (`grocery-bag.svg`, **KEEP**) · `physical.insurance` (`insurance-document.svg`, **KEEP**) · `physical.heladera` (**BUILD — no asset exists**). Positions: left-upper third · right-middle third · centre-lower. `enter 320` at `120 ms` stagger. **Much air. No chaotic accumulation.** ⛔ **NO `mochila`** — it has no opening antecedent (`N-25`, `SI-23`, owner = script owner). ⛔ Do not invent a new closing vocabulary. | `SHARED_ELEMENT` · `N-25` · `MASTER §2.5` · `J-04` |
| `J03` | L467 | **CREATE.** The house outline draws **behind** the objects (`700–900 ms`, `stroke-dashoffset`, stroke `4–6 px`, `fill:none`, no perspective). Objects scale `100 → 90`. ⛔ The house does not exist today and must be produced. | `SHARED_ELEMENT` · `J-05` · `NO_UI A26` + `MASTER J2` |
| `J04` | L470 | **CREATE.** Juli, Tomí, Mamá, Papá **inside** the house, `enter 320` at `70 ms` stagger. ⛔ **From this beat to `J12` the family geometry signature is immutable.** This is the constant the technology recedes from. | `SHARED_ELEMENT` `person.*` · `J-05` |
| `J05` | L472-474 | **CREATE.** The **invisible-work ghosts** at `0.25–0.35`, outside the house: `¿Quién me busca hoy?` · the old WhatsApp · `Ma ❤️: Esta semana lo busco yo a Tomi.` `enter 320` at `120 ms` stagger. ⛔ **These must be the SAME objects from Scenes A and B, not new ones** — their absence in Scene A (`A-03`) is why they cannot appear here. Fixing `A-03` is a **precondition** for this beat. | `SHARED_ELEMENT` · `J-06` · `MASTER §2.5` |
| `J06` | (the ghosts are the cost) | **CREATE.** `AUTO 1100`: thin dashed lines draw (`300 ms`) → micro hold (`400 ms`) → **ghosts fade to `0`** (`400 ms`). ⛔ **Maximum 3 links.** ⛔ Ghosts fade to **0**, not to `0.30`. | `SHARED_ELEMENT` · `J-06` |
| `J07` | L476-488 | **CREATE — TOTAL QUIETUD.** One thin **2 px `#E7643F`** line below the four. `enter 320`. ⛔ **No logo. No phone. Nothing else moves.** HomePlus as infrastructure, **not a fifth family member.** | `EDITORIAL` · `J-07` · `MASTER J4` · `N-24` |
| `J08` | L481-487 | **CREATE — FIVE SEPARATE `MANUAL` TRIGGERS, one per word:** `gastos` → a movement/amount · `tareas` → a check · `horarios` → a time block · `información` → a document · `responsabilidades` → a person. `24–32 px`, **around** the family, **never on top of it, never giant words.** Each element is a **real object from Scenes C–E at low exposure** (`physical.bolsa` `warranty.ps5` `birthday.event` `finance.supermarket_movement` `person.*`). ⛔ **Do not write the words on stage** — the presenter says them; the object carries them (`MASTER §2.3`). | `EDITORIAL` · `J-08` · `MASTER J5` |
| `J09` | L488 | **CREATE.** The five elements **order themselves** (`300 ms`) then **move to the periphery** (`400 ms`). ⛔ **The family stays centre and does not move.** ⛔ **Two staged steps, not one 500 ms blur.** | `SHARED_ELEMENT` · `J-09` |
| `J10` | (born from the organisation) | **CREATE.** The peripheral elements **form phone geometry** (`400 ms`). ⛔ **NO DEVICE ENTERS.** The frame is born **from the organisation itself** (`NO_UI J6` is explicit). House and family stay inside. | `SHARED_ELEMENT` · `J-09` |
| **`J11`** | L491 | ⛔ **THE CLOSING'S KEY INVARIANT.** `AUTO 1400`, 3 groups staged `120 ms` apart: the frame completes (`300 ms`) → **the forming technology group scales `100 → 82 %`** (`550 ms`) → **its opacity `100 → 0`** (`550 ms`) → the organisation elements and the orange line disappear. ⛔ **THE FAMILY IS NOT ONE OF THE THREE GROUPS. THE HOUSE AND FAMILY DO NOT MOVE BY ONE PIXEL.** | `SHARED_ELEMENT` · `J-09` · `MASTER J7` |
| `J12` | L493-495 | **CREATE — THE LIVING MOMENT.** `AUTO 1210`: **clean white flash `80–120 ms`** → a **thin photographic frame** appears around the family (`300 ms`) → **hold ~800 ms**. ⛔ **NO TEXT IN THIS BEAT.** ⛔ The frame is thin. ⛔ The hold **is** the content — this is the final emotional landing and it must breathe. | `EDITORIAL` · `J-10` · `MASTER J8` |
| `J13` | (fade) | `reset 520` to absolute black. The breath before the end card. ⛔ **The end card must NOT arrive before the argument** (`J-11`). | `EDITORIAL` · `MASTER §2.2` use 4 |
| `J14` | L497 | **PRESERVE AS-IS, MOVED TO THE END.** Logo `120 px` + wordmark `64 px` + four members (`Bernardo Gimenez` `Benjamin Duarte` `Gabriel Bazan` `Maximo Echezarreta`, initials `BG` `BD` `GB` `ME`, `22 px`, `1 px` border at `22 %` opacity) + `Muchas gracias.` `76 px`, `48 px` top margin, generous negative space. **Three SEPARATE triggers preserved**: brand `420 ms` + `scale 0.96→1` · team `90 ms × 4 = 270 ms` · thanks `420 ms` + `12 px` rise. Then **infinite hold**. ⛔ **No HUD. No IDs. No roles. No paragraphs.** ⛔ The composition was always correct; **only its position was wrong** (`J-12` POSITIVE). | `EDITORIAL` · `J-12` POSITIVE |

**PRESERVE.** `J-12` the end-card composition and its three separate triggers · the `90 ms` team stagger · the brand and thanks `420 ms` · `#060404` · `s18-veil-in` as the **inner fade primitive** (the chapter reset around it is `reset 520`).

**DELETE from Scene J.** The brand appearing at `S18_step01` **inside Gaby's black** · the single 220 ms veil as the whole of Gaby's closing · the flat `S18_step02` team-only beat as the *end* of the film.

**WHAT MUST NOT EXIST in Scene J.** A backpack (`mochila`) · a phone device on stage · any text in `J12` · any movement of the house or the family during `J11` · a black frame that is not one of the nine in §11.8.

**THE CLOSING OBJECT VOCABULARY — frozen.** Only objects the opening established may return: `physical.bolsa` · `physical.insurance` / `physical.heladera` · `message.old_household` · `message.technician` · `person.*` · `house.outline` (new, built here, drawn in the same simple outline as `A17`) · `org.gastos` `org.tareas` `org.horarios` `org.informacion` `org.responsabilidades` (as **symbols**, never as words). ⛔ `J-04` is a **SCRIPT ISSUE** owned by the script owner; the blueprint builds to the *established* set.

**NOTE on `I-25` (Papá's avatar colour).** `#4A4542` neutral grey reads as disabled against Juli gold `#B57A1A` and Tomí blue `#2D6A8A`. ⛔ **Do not invent a colour.** Do not restyle the artwork (`§10.2`). The `I10` and `I14` exposure contract is the fix: each persona is isolated at `1.00` in its own beat, so no persona is ever compared side-by-side on colour alone.

---

# 30. SHARED-ELEMENT MASTER PLAN

## 30.1 Implementation order — mandatory

Build in this order. An object that is not yet built cannot be promoted.

| Step | Object | Needed by |
|---|---|---|
| 1 | `physical.insurance` (exists — rescale) | `A02` |
| 2 | `physical.bolsa` (exists — rescale) | `A03` |
| 3 | `physical.heladera` (**build asset**) | `A04` |
| 4 | `message.old_household` (**build**) | `A10` |
| 5 | `person.*` ×4 (**split**) | `A15` |
| 6 | `message.technician` (**rebuild**) | `B18` |
| 7 | `birthday.event` (**rebuild**) | `C01` |
| 8 | `inventory.missing_item` (**rebuild**) | `C03` |
| 9 | `finance.ps5_movement` (**build**) | `D06` |
| 10 | `warranty.ps5` (**rebuild**) | `E02` |
| 11 | `asset.ps5.documents` (**rebuild, one instance**) | `E03` |
| 12 | `birthday.memory` (**rebuild**) | `E05` |
| 13 | `finance.supermarket_movement` (**build**) | `G04` |
| 14 | `question.what_is_left_for_tomorrow` (exists — keep) | `I07` |

## 30.2 The four-field contract every shared object must declare

| Field | Requirement |
|---|---|
| `semanticId` | one of the 14 registry IDs above. ⛔ Never a lookalike |
| `component` | renders **real geometry**. ⛔ Never an image, never a screenshot |
| `originSlot` / `targetSlot` | live DOM elements whose rects are measured, never authored numbers |
| `reducedMotionFallback` | `'substitute'` — commit the destination state at `0 ms`, never enter the shared layer |

## 30.3 The five things a shared element may never do

1. ⛔ Never be **cloned**.
2. ⛔ Never animate while a device moves.
3. ⛔ Never move while the device's contents animate.
4. ⛔ Never be accompanied by a second instance of itself at the destination.
5. ⛔ Never be a *lookalike* — `MASTER:140` **"No recrear versiones parecidas."**

## 30.4 Identity test — measurable

> **An object is recognisably the same object at 50 % of its travel.** If it is not, it is not a shared element — it is two lookalikes, which is forbidden.

`T-SEM-*` tests sample the travelling object's rect at `t = 320 ms` (50 % of `640`) and compare width, height, border-radius, shadow and type size against the source rect. Tolerance: **± 1 px** on geometry, exact on type size and copy.

---

# 31. SCENE-BOUNDARY MASTER PLAN

Seventeen boundaries. **Sixteen survive.** Each row is binding.

| # | Boundary | Idea ending → beginning | Black? | Shared object | Device | Family | How it lands |
|---|---|---|---|---|---|---|---|
| 1 | S01→S02 | exhaustion → *"ya existía"* | **YES** (exposure 360 then reset 520) | one household object | none | `EDITORIAL` | `A07` clears to true black; `A08` enters the three objects on black |
| 2 | **S02→S03** | the argument → **the question** → the answer | **YES, held** | none | none | `EDITORIAL` | `A12` **held for the whole of L41–L43**. ⛔ The lockup may not appear during the question (`A-02`) |
| 3 | S03→S04 | the promise → Juli's Home | no | **Juli** | **enters**, lateral in | `SHARED_ELEMENT` | `A17`→`B01`→`B02`: Juli travels `shared 640`; the device enters after the landing |
| 4 | S04→S05 | Home → Planner | no | none (same device) | **persists** | `REAL_NAV` | one device, real module change; **the device does not move** |
| 5 | S05→S06 | Juli → household | no | **the four members** | **persists** | `SHARED_ELEMENT` | `B07` `AUTO 1400` — the bridge that does not exist today (`B-10`) |
| 6 | S06→S07 | the household → **the limit** | **YES** | 4 callbacks | **exits as a block** | `EDITORIAL` | `B20` block exit `220 ms` → `B21` statement → `B22` callbacks converge before it |
| 7 | S07→S08 | the limit → the birthday | no | the Plan | **enters**, lateral in | `EDITORIAL` | `B22` converges, then out; `C01` enters with its Event attached |
| 8 | S08→S09 | *"qué comprar"* → *"el dinero"* | no | **the need** | **persists** | `SHARED_ELEMENT` | `C05` extraction → `C07` the need → `D01` the need **is** the quiet ledger fact. ⛔ No automatic pipeline |
| 9 | S09→S10 | *"el dinero"* → *"la Play"* | no | **the movement row** | **persists** | `SHARED_ELEMENT` | `D06` extraction of the movement **row**. ⛔ The device must not move |
| 10 | S10→S11 | memory → continuity | **YES** | none | **exits** | `EDITORIAL` | `E07` **exposure-down first**, then reset. Not a cross-mount (`E-13`) |
| 11 | S11→S12 | continuity → how it is built | **YES** (scene-entry, **not** a press) | **the device** | **enters centred** | `SHARED_ELEMENT` | `F05` the device crosses into `G01`. The black is established by the transition (`F-02`) |
| 12 | **S12→S13** | — | ⛔ **NO** | — | — | ⛔ **DELETED** | `S13_step00` is a byte-identical remount of `S12_step02` — a dead press (`G-09`, `M-03`) |
| 13 | **S13→S14** | the stack → the friction | ⛔ **NO** | — | — | **no transition — dim** | **Option A chosen:** the stack persists across the boundary and only changes exposure. **The echo is a DIMMING of an existing composition, never a REBUILD** (`G-08`) |
| 14 | S14→S15 | the question → Homi | **YES, held** | ⛔ **NONE** (`SE-15`) | **enters** | `EDITORIAL` | `H07` black → `I01` the name alone. ⛔ **Do not connect the question to the name** |
| 15 | S15→S16 | doing → knowing | no | **the question bubble** | **persists** | `SHARED_ELEMENT` | `I07`→`I08`; the bubble box is **byte-identical** |
| 16 | S16→S17 | knowing → deciding | no | none | **out UP / in BELOW** | `DEVICE_TRANSITION` | `I13` — the only beat that proves the two-form thesis |
| 17 | **S17→S18** | the decision → the closing | **YES, held 24.5 s** | none | **exits** | `EDITORIAL` | `I17` → `J01` is **one continuous breath**, not two transitions |

**Counts:** `SHARED_ELEMENT` 7 · `REAL_NAV` 1 · `EDITORIAL` 7 · `DEVICE_TRANSITION` 1 · **no transition** 1 · black resets 9.

**Global boundary rules (binding):**
1. ⛔ **A cross-mount is permitted only at a `reset`.** Every other boundary preserves the outgoing composition and changes its exposure.
2. ⛔ **A device transition is honest only when no semantic object crosses.** If an object crosses, it is a `SHARED_ELEMENT` and the device does not move.
3. ⛔ **Device motion and internal content motion must be separable.** Device settles first, then content arrives.
4. Every boundary must give the audience a breath — except the two deleted/dimmed ones.

---

# 32. CINEMATIC ENHANCEMENT STRATEGY

## 32.1 Decision test applied to every modifier

| # | Question | Required answer |
|---|---|---|
| 1 | What semantic job does this perform? | `ORIENT` · `PRIORITIZE` · `PRESERVE CONTINUITY` · `EXPLAIN CAUSALITY` · `CREATE EMOTIONAL PUNCTUATION`. If none: **REMOVE** |
| 2 | What should the audience look at? | must equal the beat's `PRIMARY ATTENTION` |
| 3 | Does this technique make that easier to see? | if no: **REMOVE** |
| 4 | Could stillness communicate it better? | if yes: **REMOVE** |
| 5 | Does it preserve product geometry? | if no: **REMOVE** |
| 6 | Does it introduce fake capability? | if yes: **REMOVE** |
| 7 | Does it repeat a trick already overused? | see §32.3 |
| 8 | Is there a simpler technique with equal meaning? | if yes: **REMOVE** |

## 32.2 Modifier census — 111 beats

| State | Count | Share |
|---|---|---|
| Beats carrying **no** premium modifier (`NONE — STILLNESS IS THE DESIGN.`) | **41** | 37 % |
| Beats carrying exactly one modifier | 21 | 19 % |
| Beats carrying exactly two modifiers | 30 | 27 % |
| Beats carrying three modifiers | 19 | 17 % |

**The 41 deliberately still beats** are the blueprint's quiet majority: `A01` `A02` `A03` `A07` `A12` `A13` `A14` `A15` `B04` `B05` `B08` `B11` `B12` `B17` `B19` `B20` `B21` `B22` `C01` `C03` `C06` `E01` `E02` `E03` `F01` `F04` `G01` `G06` `G08` `H01` `H07` `I17` `J01` `J07` `J13` `J14` plus the beats whose modifier is exposure-only.

**Zero beats carry an allowed-but-unjustified technique.** The ten "strong justification" techniques of the campaign brief were **all declined** (§13.2), each with a meaning-based reason.

## 32.3 Whole-film repetition audit

Premium motion fails when every transition is "special". Technique census across the 111 target beats:

| Technique | Count | Verdict |
|---|---|---|
| exposure shift (`opacity` only) | 17 | ✅ **the deck's workhorse** — and it is the *measured, POSITIVE* mechanism (`C-10`), not a trick |
| `enter` | 26 | ✅ highest count, lowest salience — it is a 320 ms fade + `12 px` rise, the deck's **existing** entrance primitive (`A-P3`). Reuse is invisible because it is the baseline, not the event |
| `spatial` | 14 | ✅ all are whole-device moves; each has a **different** role change behind it |
| `reset` / black | 9 | ✅ each is a distinct narrative function (§11.8). ⛔ **Never** used as slide separation |
| `shared` extraction | 6 | ✅ **the film's centrepiece, used 6 times, never twice in a row** |
| `hero` | 5 | ⚠ 5 is **above** the "twice in the film" Session 7 allowed for `hero 880`. **Resolution:** only **2** beats use the `hero` **token**: `A14` and `I01`. The other 3 (`A17`, `J03`, `I01`) use `hero`-band *timing* for the outline draw and the recession. ⛔ **The `hero` curve `cubic-bezier(.16,1,.3,1)` is used at exactly 2 beats: `A14` and `I01`.** The other three use `E-DEFAULT`. This is enforced in the map's `spring_or_easing` column. |
| `exit` | 3 | ✅ sparse |
| `micro` | 2 | ✅ sparse |
| device scale 1.08 | 6 beats | ✅ all in `E01`–`E07`, `B15` |
| SVG stroke draw | 5 | ✅ 4 distinct assets (`house` ×2, `ghost links`, `verb bars`, `frame`) |
| mask / clip | 2 | ✅ only `A14` |
| motion path | 2 | ✅ only `G04`, `I13` |
| depth staging | 8 | ✅ always `PLANE-BEHIND-DEVICE` or `DEVICE-ABOVE-PLANE`, never decorative parallax |
| shadow lift | 4 | ✅ only on airborne shared objects |
| white-flash punctuation | 1 | ✅ `J12` only |
| **device slide (the anti-pattern)** | **0** | ⛔ **Eliminated.** Session 3's central finding was that *every* C/D/E boundary was a 480 px slide where the master asked for a shared element |
| **spring / bounce** | **0** | ⛔ prohibited |
| **glow** | **0** | ⛔ prohibited |
| **particles** | **0** | ⛔ prohibited |
| **blur** | **0** | ⛔ prohibited as default |
| **3D / perspective** | **0** | ⛔ prohibited |
| **number counter** | **0** | ⛔ declined (§13.2) |
| **chart animation** | **0** | ⛔ declined (§13.2) |
| **parallax** | **0** | ⛔ declined (§13.2) |

**Verdict: no technique is used often enough to become visible as a trick.** `exposure` and `enter` dominate because they are the *baseline grammar*, not the event. The four events of the film — the reveal (`A14`), the three extractions (`C05` `D06` `E04`), the Homi execution (`I06`) and the recession (`J11`) — are each unique in shape.

---

# 33. WHOLE-FILM RHYTHM

| Stage | Scenes | Authored motion energy | Measured today | Target |
|---|---|---|---|---|
| **CHAOS** | S01 | rising accumulation | 8 individual presses, all at `1.00`, no de-emphasis | **ONE `AUTO` 1100 ms + a held quiet state (`A06`)** |
| **FRAGMENTATION** | S02 | six objects + a slogan | 6 brand logos at `0.54`, a `176 px` band at `1.00` | three household objects, slogan **deleted** |
| **QUESTION / SILENCE** | S02→S03 | absolute black, held | **115 ms** | **a held state (`A12`)** |
| **HOMePLUS REVEAL** | S03 | **the one hero motion** | 640 ms, two glows, vertical lockup | **`hero 880`, horizontal, no halo**, then **9 more states** |
| **PRODUCT CONFIDENCE** | S04–S05 | low, steady | device-only, correct | **KEEP; add the `B07` bridge** |
| **FAMILY / COORDINATION** | S06–S07 | one climax, then silence | the anti-pattern, then a correct block exit | reframed map, four callbacks, black |
| **PLAN / INVENTORY / FINANCE / ASSETS / HOMECLOUD** | S08–S10 | moderate | four 480 px slides, one static prop, one clipped row | **three extractions, four real Finance surfaces, two new Scene E states** |
| **CONTINUITY** | S11 | near-still | **8 DOM nodes** | **5 states, ≤ 3 relations, ends on the product** |
| **TECHNICAL UNDERSTANDING** | S12–S13 | rising | two identical cards, a dead press, a decorative line | **device + backend plane + verbs + transaction + recomposition** |
| **FRICTION** | S14 | falling away | the whole stack at `1.00`, three text collisions | **device at `0.75` → one clean state at `1.00` → black** |
| **QUESTION / SILENCE** | S14→S15 | black, held | hard cut | **a held black, then the name alone** |
| **HOMI** | S15–S16 | rising | device fixed for 14 states | **three frozen device directions** |
| **HUMAN CONTROL** | S17 | decisive | a second headline crosses a decision row | **one line; `HOLD` without confirming** |
| **BLACK** | S17→S18 | black, held 24.5 s | 220 ms | **a held state (`J01`)** |
| **LIFE / FAMILY** | S18 | the argument | **nothing** | objects → house → family → ghosts → philosophy |
| **TECHNOLOGY RECEDES** | S18 | the thesis | **nothing** | **`scale 100→82 %`, `opacity → 0`. The house and family do not move** |
| **END CARD** | S18 | stillness | correct, 4 states at 20.7 s each | **`KEEP AS-IS`, moved to the end** |

**The arc is now honest.** Session 7 measured the film's energy **inverted against meaning**: the highest concurrency (88 movers) was in Scene C's product detail, and its lowest was in the two moments that carry the most weight. Target inverts it back: the loudest motion is the reveal, the three extractions and the execution; the quietest are the question, the limit, the closing argument and the living moment.

---

# 34. IMPLEMENTATION PHASES

Full operational detail: `08_IMPLEMENTATION_CHECKLIST.md`.

| Phase | Name | Depends on | Exit gate |
|---|---|---|---|
| **0** | Baseline / lock | — | production manifest + screenshot baseline + current 85-state run frozen |
| **1** | **Motion foundation** | 0 | tokens · semantic IDs · persistent shared layer · sequence lifecycle · cancel/settle · reduced motion · navigation protection · `HOLD` guard · `Esc` restore · `ArrowLeft` exact restoration |
| **2** | Global stage grammar | 1 | device anchors · device scales · exposure bands · local focus · black reset · enter/exit · stage depth · motion budgets |
| **3** | Opening | 1, 2 | S01–S03 |
| **4** | Product core | 1, 2 | S04–S10 |
| **5** | Continuity / technical block | 1, 2 | S11–S14 |
| **6** | Homi | 1, 2 | S15–S17 |
| **7** | Closing | 1, 2 | S18 |
| **8** | Shared-element integration | 3–7 | all 13 crossings validated across boundaries |
| **9** | Whole-film motion pass | 8 | S01 → S18 uninterrupted |
| **10** | Cinematic polish | 9 | timing · overlap · settle · stagger · depth · mask · vector · framing · microfeedback |
| **11** | Performance / operability QA | 10 | 60 FPS · keyboard stress · `HOLD` mis-press · `ArrowLeft` · `Esc` · reduced motion |
| **12** | Projector / rehearsal QA | 11 | readability · real projector · speaker timing · press timing · visual breathing · black holds · scene energy · closing impact |
| **13** | Final freeze | 12 | full run · 0 blockers · 0 unresolved visual regressions |

⛔ **Foundation first.** Phase 1's STOP GATE is mandatory and non-negotiable. ⛔ **No scene redesign before Phase 1 passes.** ⛔ **Do not move to the next phase after a FAIL.** Each phase ends with exactly one of `PASS` / `FAIL` / `BLOCKED`. No partial-success language.

---

# 35. QA

## 35.1 Gate order — hard sequence

```
Product Truth PASS
  → Narrative PASS
    → Geometry PASS
      → State PASS
        → Navigation PASS
          → Motion PASS
            → PERFORMANCE PASS
              → OPERABILITY PASS
                → CINEMATIC POLISH PASS   (Phase 10)
                  → PROJECTOR / REHEARSAL PASS (Phase 12)
                    → FREEZE (Phase 13)
```

⛔ **A later gate may not run while an earlier gate is `FAIL`.**

## 35.2 Acceptance criteria families

Every target state must satisfy all applicable families. Full matrix: `08_ACCEPTANCE_TEST_MATRIX.csv`.

| Family | ID prefix | What it proves |
|---|---|---|
| **VISUAL** | `T-VIS-*` | expected composition; the subject is immediately identifiable; **no competing headline**; device geometry unchanged internally |
| **GEOMETRY** | `T-GEO-*` | **no width mutation** · **no font-size mutation** · **no `scrollHeight` mutation** · **no canvas overflow** · no clipping change |
| **MOTION** | `T-MOT-*` | per-beat: start frame · early frame · mid frame · late frame · settled frame · token duration within ± 1 frame · curve direction correct |
| **MOTION GLOBAL** | `T-MOT-X*` | whole-film motion grammar: mover budget · 12 px travel · opacity-only exposure · transform-only device moves · ≤ 3 relation links · boundary replays nothing · stagger band · 1400 ms envelope |
| **STATE** | `T-STA-*` | per-beat: the map's `stable_hold`, `back_restore` and `reduced_motion_fallback` are honoured at that beat |
| **STATE ENGINE** | `T-ENG-*` | whole-film invariants: after 10 s **unchanged**; after 30 s **unchanged**; **0 running animations**; no timer; 18 scenes permanently mounted; 1 veil; ≤ 2 airborne shared objects |
| **BACK** | `T-BAK-*` | `ArrowLeft` restores the prior stable state exactly — all 8 requirements of §14 |
| **OPERABILITY** | `T-NAV-*` | repeated key does not skip a protected `HOLD`; `AUTO` cannot orphan; `Esc` recovers; one queued advance max |
| **PERFORMANCE** | `T-PER-*` | no visible dropped frame; no unexpected layout; no large paint triggered by avoidable properties |
| **REDUCED MOTION** | `T-RMO-*` | the same semantic state remains understandable |
| **PRODUCT TRUTH** | `T-TRU-*` | the specific `N-*` / master / freeze constraint for that beat |
| **SHARED ELEMENT** | `T-SEM-*` | identity survives; one instance; exact origin restore; 50 %-travel identity test |

## 35.3 Root-cause coverage

⛔ **Every tracked root cause maps to at least one acceptance test.** ⛔ **Every one of the 28 active canonical blockers maps to at least one test.** Both mappings are enumerated in `08_ACCEPTANCE_TEST_MATRIX.csv`, columns `root_cause_ids` and `canonical_blockers`.

**Root causes have two provenances and must be counted separately** (corrected Session 8.1). `RC-01`…`RC-18` are the **canonical** root causes from the original normalization. `RC-19` and `RC-20` were introduced by **Session 7** (`07_MOTION_STAGECRAFT_AUDIT.md`) and are consumed by this blueprint's §15 table. A count of 18/18 presented as *the* coverage figure therefore understates the tracked corpus. Canonical wording:

```
CANONICAL ROOT CAUSES:      18 / 18 covered     (RC-01 … RC-18)
SESSION-7 MOTION ROOT CAUSES: 2 /  2 covered     (RC-19, RC-20)
TOTAL TRACKED ROOT CAUSES:  20 / 20 covered
```

⛔ **`RC-19` and `RC-20` must be counted.** They are the only two rows in §15 whose `Issues` are `M-*` ids rather than scene ids, and they were **absent** from the acceptance matrix's `root_cause_ids` column. Session 8.1 closes that gap.

### 35.3.1 `RC-19` / `RC-20` → acceptance tests (binding)

⛔ **No test may exist only in prose.** Each row below is a real `test_id` in `08_ACCEPTANCE_TEST_MATRIX.csv` carrying the root cause in its `root_cause_ids` column.

| Root cause | Issues | Required coverage | Test ids |
|---|---|---|---|
| **`RC-19`** — no `shared` and no `hero` token; undeclared safe-area breach | `M-01` `M-09` | the **8-token system** exists and is closed at 8 | `T-RC19-01` |
| | | **`shared` token present and used** (duration `640`, default curve) | `T-RC19-02` |
| | | **`hero` token present and used** (duration `880`, hero curve) | `T-RC19-03` |
| | | **device scale ceiling**: whole-device scale ∈ {`1.00`, `1.08`} only; any third value throws | `T-RC19-04` |
| | | **safe-area rule declared**: the 23 px breach is declared intentional in code and tokens (`N-41`, `M-09`) | `T-RC19-05` |
| **`RC-20`** — scene-boundary motion vocabulary missing; `HOLD` not mis-press-safe | `M-06` `M-12` `M-14` | **mount contract**: all 18 scenes permanently mounted, none ever unmounted | `T-RC20-01` |
| | | **scene lifecycle**: every scene is in exactly one of `DORMANT` / `MEASUREMENT_READY` / `ACTIVE`; no stable state is left `MEASUREMENT_READY` | `T-RC20-02` |
| | | **`HOLD` protection**: `600 ms` mis-press guard on exactly the 12 protected beats; no protected hold skipped | `T-RC20-03` |
| | | **restoration**: `ArrowLeft` and `Esc` restore exactly; 0 residual inline `transform` on any hidden subtree | `T-RC20-04` |

⛔ `T-RC20-02` is the lifecycle gate added in Session 8.1 and is the same gate that makes §10.3.1 measurable. ⛔ `M-06`/`M-12` (orphan animation + residual transform) and `M-14` (`HOLD` mis-press safety) are each covered by at least one row above, so no `RC-20` obligation is satisfied only in prose.

**Verified by count, not asserted** (see §42.1): **20/20** tracked root causes (`18/18` canonical + `2/2` Session-7 motion) · **28/28** active blockers · **102/102** map `acceptance_test` ids represented · **0** duplicate ids · **0** empty required cells.

## 35.4 `MEASUREMENT_READY` acceptance coverage (binding, added Session 8.1)

⛔ **These eight tests exist because §2.2.1 introduced a lifecycle state whose only purpose is to make §10.3.1 measurable. Every one of the eight obligations below is a real `test_id` in `08_ACCEPTANCE_TEST_MATRIX.csv`** — `T-MSR-01` … `T-MSR-08`. ⛔ **No obligation is satisfied in prose only.**

| # | Obligation | Assertion | Test id |
|---|---|---|---|
| **A** | **`DORMANT` target is not measurable** | with the destination in `DORMANT`, its slot rect is **not** consumed. Any read that feeds a flight is a `FAIL`. Forcing it must `THROW`/`BLOCK`, never return a number | `T-MSR-01` |
| **B** | **`MEASUREMENT_READY` target is measurable** | after the commit + layout-ready signal, `slotRect.width > 0` · `height > 0` · finite `x`/`y`, and the rect is **byte-stable across two consecutive frames** | `T-MSR-02` |
| **C** | **not visibly painted while measurement-ready** | during `MEASUREMENT_READY` the destination paints **0** active pixels: `getComputedStyle` shows `visibility:hidden`, `aria-hidden="true"`, `content-visibility:visible`, and a screenshot diff of the destination region is empty | `T-MSR-03` |
| **D** | **one semantic object only during flight** | at every sampled instant of the flight there is **exactly one** node carrying the semantic id in the whole document — never two, never a clone | `T-MSR-04` |
| **E** | **landed state is correct** | after landing: destination is **`ACTIVE`**, the source is in the lifecycle state its contract requires, `shared-layer` has **0** children and **0** held `Animation` objects | `T-MSR-05` |
| **F** | **`ArrowLeft` restores everything** | destination returns to the correct lifecycle state; source is restored; exactly one semantic object; **zero** residual inline `transform` anywhere | `T-MSR-06` |
| **G** | **`Esc` mid-flight guarantees the same** | identical guarantees to F, from mid-flight, with the object re-attached to its **origin** slot | `T-MSR-07` |
| **H** | **reduced motion needs no measurement flight** | with `prefers-reduced-motion: reduce`, the destination state **commits directly at `0 ms`**; the object **never** enters `shared-layer`; **no scene is ever promoted to `MEASUREMENT_READY`**; no `getBoundingClientRect` is consumed for a flight | `T-MSR-08` |

⛔ **`T-MSR-01` and `T-MSR-08` are the two negative tests.** They exist to catch the two ways this contract can be silently violated: measuring a scene that was never made measurable, and running the measurement path at all under reduced motion.

⛔ **Measured in the real deck in a browser, not from source inspection** (`08_PERFORMANCE_QA_SPEC.md` §0). ⛔ A `PASS` requires a stored transcript under `audit/runtime/session-11/`.

⛔ **ID-prefix disambiguation.** The per-beat prefixes (`T-VIS-*` `T-GEO-*` `T-MOT-*` `T-STA-*` `T-TRU-*` `T-SEM-*`) and the whole-film prefixes (`T-ENG-*` `T-MOT-X*` `T-NAV-*` `T-BAK-*` `T-PER-*` `T-RMO-*`) are disjoint. ⛔ `T-ENG-*` and `T-MOT-X*` exist **because** the whole-film invariants would otherwise collide with the per-beat ids; do not merge them.

---

# 36. PROJECTOR / REHEARSAL PASS

Runs **after** `CINEMATIC POLISH PASS` and **before** freeze. It is not a motion gate; it is a delivery gate.

| # | Question | Method | Fail condition |
|---|---|---|---|
| 1 | Is every datum readable at 3 m? | real projector, `1920×1080`, back row of an empty room | any required figure or route node unreadable |
| 2 | Does the film fit the time limit? | full timed rehearsal with a real speaker, **± 0.5–1 s** oral variance | exceeds the limit with no `DELIVERY CUT` decision |
| 3 | Does press timing match speech? | full run, presenter on the clicker | any press landing mid-clause |
| 4 | Does the film breathe where it must? | watch for the 9 black states and the 12 protected holds | a black too short to feel, or a hold too long to hold attention |
| 5 | Is scene energy correct? | compare against §33's arc | energy flat, or inverted against meaning |
| 6 | Does the closing land? | watch `J11`–`J14` alone | the family appears to move during `J11`; `J12` reads as a title card instead of a moment |
| 7 | Does the reveal land? | watch `A12`–`A14` alone | the black is too short for the question; the lockup feels like a slide change |
| 8 | Is any beat mis-press vulnerable in practice? | presenter mashes the key for 10 s at each protected hold | any protected hold is destroyed |

**`DELIVERY CUT`, if required, may only:** eliminate oral redundancy · shorten enumerations · compress technical explanation · reduce holds. ⛔ It **may not** change scene order, callbacks, product decisions, or any beat count.

---

# 37. CINEMATIC POLISH PASS — what it may and may not change

Runs **only after** `Motion PASS`. It is the last chance to refine numbers.

## 37.1 MAY change

| # | Parameter | Tolerance |
|---|---|---|
| 1 | timing | **20–100 ms** per token step |
| 2 | travel distance | **1–4 px** |
| 3 | overlap | **20–100 ms** |
| 4 | settle | `E-DEFAULT` tail-settle window **± 60 ms** — ⛔ easing only, `ARCH-04`, no spring solver |
| 5 | mask edge | **± 2 px** |
| 6 | depth offset | **± 2 px** |
| 7 | stagger | **± 15 ms** within the `30–90 ms` band |
| 8 | exposure | **± 0.05** within the frozen bands |
| 9 | camera-like framing | **2–4 %** push only |

⛔ **Every change must be recorded** with the beat, the previous value, the new value, and the reason. An unrecorded change is a `FAIL`.

## 37.2 ⛔ MAY NOT change

- product semantics · scene meaning · dataset ownership · navigation truth · transition family · beat count · the order of beats · the eight token durations beyond the `20–100 ms` tolerance · any `HOLD` into a non-`HOLD` · any local focus above `1.20` · any device scale other than `1.00`/`1.08` · ⛔ **no spring solver, no overshoot** · any dependency · the `#E7643F` token · `S07`'s `132 px` · `S08_step01`'s exposure values · the S18 end-card composition or its three triggers · the stable-state invariant.

## 37.3 The `KEEP AS-IS` items the polish pass may not re-time

`B20` 220 ms · `B21` 420 ms · `B22` 320 ms / 70 ms · `J14` 420 / 90 / 420 ms · `s18-veil-in` 220 ms inner primitive. These are Session-7-frozen measured values (`08_MOTION_IMPLEMENTATION_ARCHITECTURE.md` §3.2). The polish pass may adjust them only inside **± 20 ms** and must record the change.

---

# 38. FREEZE CRITERIA

`audit/08_FINAL_RECONSTRUCTION_BLUEPRINT.md` is superseded by implementation. Freeze requires **all** of:

1. Full run `S01 → S18` with **0** unresolved blockers.
2. Every STOP GATE in `08_IMPLEMENTATION_CHECKLIST.md` = `PASS`.
3. `08_ACCEPTANCE_TEST_MATRIX.csv` = **100 % PASS**.
4. `08_PERFORMANCE_QA_SPEC.md` = **PASS**, with the profiling transcripts stored.
5. Projector/rehearsal pass = **PASS**.
6. Production integrity re-verified: **0 files added, 0 removed, 0 SHA-256 changed** against `audit/runtime/session-01/_integrity/manifest-after.csv`.
7. Every `08_*` document's open items are `RESOLVED` or explicitly handed over with an owner.

---

# 39. OPEN BLOCKERS

**Four entries. Three are inherited and owned outside this campaign. One is closed here.**

| # | Item | Owner | Why evidence cannot resolve it | What it blocks | Safe temporary rule |
|---|---|---|---|---|---|
| **`OB-1`** | **Map ETA / distance / travel time** (`CF-08`) | **Master owner + Product owner, jointly** | A genuine authority-vs-authority conflict: `MASTER §6 B5` asks for `8 min`; Product Truth and Integration have no ETA, no distance, no travel time, and the only geometric code (`distanceBetweenMeters`) is used internally to throttle publish frequency and never surfaced | ⛔ **Blocks nothing.** No beat in the 111 needs it | **Show place · recency · presence/status · sharing state only.** ⛔ Never fabricate minutes away, distance or travel time. Figma map pins are **illustrative positions, not geography** (`N-03`, `N-30`) |
| **`OB-2`** | **Technology order: Figma first or fourth** (`CF-15`, `SI-10`) | **script owner** | `MASTER §11 G4` + `NO_UI §13` put Figma first; script L318 puts it fourth. Two masters agree against the script, which is evidence of **weight**, not authority. Ordering is spoken wording (`MASTER §6` gives the script authority over *qué se dice*) | ⛔ **Blocks nothing.** The choreography is designed so either order is stageable — `G07` is its own `MANUAL` beat | ⛔ **Do not pick from file timestamps** (`N-16`). ⛔ **Do not silently reorder the speaker's lines.** Ship `G07` as its own beat; moving one logo is a one-beat change |
| **`OB-3`** | **Closing object vocabulary: `mochila` vs `bolsa`** (`CF-20`, `SI-23`) | **script owner** | The script names `la mochila sigue siendo una mochila`; the opening **never established** a mochila. `MASTER §2.5` mandates same-object recurrence and forbids *versiones parecidas*, but the master cannot manufacture an antecedent | ⛔ **Blocks nothing.** `J02` builds to the **established** set | **Ship `physical.bolsa` + `physical.insurance` + `physical.heladera`.** ⛔ **No `mochila` on stage.** ⛔ Do not invent a new closing vocabulary (`N-25`) |
| **`OB-4`** | **`Geni` vs `Homi`** (`SI-01`, `J-18`) | **script owner** | The script says `Geni` at L446 and L349; runtime and product use `HOMI` (`0` matches for `Geni` in `src/`). `MASTER:1662` already ordered `Geni → Homi`; the script was never re-issued | ⛔ **Blocks nothing.** Touches `I01`'s wordmark **only** | **Ship `Homi` on stage.** ⛔ Do not edit the script (`N-44`) |

## 39.1 Items Session 8 closed

| Item | Resolution |
|---|---|
| **`Q1`** family avatars | **SPLIT into four independently scalable layers** (§10.2) |
| **`Q2`** shared-element architecture | **Persistent `shared-layer` + real-DOM reparenting + WAAPI FLIP** (§5.3, `08_MOTION_IMPLEMENTATION_ARCHITECTURE.md` §6) |
| **`Q3`** larger device scale | **ANSWERED: no.** `1.08` is the ceiling; max compliant is `1.006` |
| **`Q4`** S14 question typography | **RESOLVED: `88–96 px`, both lines `#F5F1EB`** — `NO_UI H08` is a frozen master and `H-P2` (keep the two-line break and the large setting) is satisfied inside it |
| **`Q8`** `→`-in-`HOLD` | **600 ms mis-press guard, then advance** (§9.2) |
| **`Q9`** reduced motion | **REQUIRED; semantic state substitution, not a hard cut** (§13) |
| **`B01` family** | `SHARED_ELEMENT`, resolving a Session-7 internal discrepancy (§4.2) |

## 39.2 Non-blocking copy items — do **not** let these stall the build

`SI-01` `SI-02` `SI-04` `SI-05` `SI-13` `SI-14` `SI-15` `SI-16` `SI-17` `SI-19` `SI-20` `SI-21` `SI-22` `SI-24` — all are `SCRIPT ISSUE` records owned by the **script owner** and **none of them blocks a beat**. ⛔ The blueprint already specifies the safe on-stage treatment for each (`A11` past tense, `F04` no text, `B17` never labelled "Feed", `I15` `19:00`, `D02`–`D05` product surfaces instead of spoken questions).

⛔ **`SI-18` (spoken *"puede sumarse automáticamente a la lista de compras"*) is the single highest product-truth risk in the script.** It asserts a capability frozen Product Truth excludes **by name, three times**. `C07` ships the approved `Restock Need` chain instead. ⛔ **The presenter must not speak `SI-18` as a current capability** — that is a delivery note for Phase 12, not a code change.

---

# 40. FINAL DEFINITION OF DONE

The implementation may only be called **DONE** when **every** line below is true and evidenced.

| # | Criterion | Evidenced by |
|---|---|---|
| 1 | All Product Truth claims are safe | `T-TRU-*` 100 % PASS |
| 2 | **0** fake navigation | `T-TRU-11`, `T-TRU-32`, `T-TRU-33` + manual review of every `EDITORIAL` beat |
| 3 | **0** unsupported Shopping capability | `T-TRU-16` + manual review of `C07`, `I10` |
| 4 | **0** fake ETA, distance or travel time | `T-GEO-08`, `T-TRU-10` + manual review of `B15`, `B16` |
| 5 | **0** duplicate monetary truth | `T-TRU-22`, `T-SEM-07` |
| 6 | **0** layout-based focus | `T-GEO-*` all PASS; no `width`/`font-size` mutation in any transition |
| 7 | **0** shared-element identity loss where required | all 13 crossings `T-SEM-01…18` PASS |
| 8 | All 111 target beats exist and are reachable | `T-VIS-*` count = 111 |
| 9 | All protected `HOLD` states exist | 12 beats flagged `hold:true`, all reachable and holdable |
| 10 | All stable states remain stable indefinitely | `T-STA-01…13` PASS at 0/10/30 s |
| 11 | All `AUTO` sequences settle | `T-NAV-05`, `T-STA-*` |
| 12 | `ArrowLeft` restores exactly | `T-BAK-01…08` PASS |
| 13 | `Esc` recovery works | `T-NAV-06` PASS |
| 14 | `HOLD` mis-press protection works | `T-NAV-01…03` PASS |
| 15 | Reduced-motion path works | `T-RMO-*` all PASS |
| 16 | The S06 map remains valid product geometry | `T-GEO-08` PASS + manual review against `N-03`/`N-30` |
| 17 | Homi → Planner proves execution | `T-SEM-13` PASS + manual review of `I06` |
| 18 | S17 **never** confirms | `T-TRU-43` PASS + manual review of `I16` |
| 19 | The closing argument exists completely | 14 beats PASS + `T-SEM-18` (family byte-identical during `J11`) |
| 20 | Cinematic enhancement is subordinate to meaning | §32.2 census + §32.3 repetition audit |
| 21 | Performance QA passes | `T-PER-*` PASS with transcripts stored |
| 22 | Projector / rehearsal QA passes | §36, all 8 questions PASS |
| 23 | Whole-film run has no unresolved blocker | Phase 13 gate |
| 24 | **0 production files added, removed or changed outside `audit/**`** | SHA-256 manifest |

---

# 41. SELF-AUDIT — can the implementer determine every required answer?

| Question | Answer | Where |
|---|---|---|
| What to build? | **YES** | §20–§29, per beat, with verbs |
| What to delete? | **YES** | a named `DELETE from Scene X` list per scene + §3.4 + §3.5 |
| What to keep? | **YES** | a named `PRESERVE` list per scene + `07 §37` |
| Exact beat order? | **YES** | §4.1 + the 111 rows of the map, in press order |
| Exact Product Truth? | **YES** | §3.4's 15 rules + per-beat TRUTH columns |
| Exact data? | **YES** | §23 dataset canon + per-beat BUILD cells with verbatim strings |
| Exact attention? | **YES** | map columns `primary_attention` / `secondary_context` / `*_exposure` |
| Exact device position? | **YES** | map column `device_position` + §11.1 anchors |
| Exact motion family? | **YES** | map column `transition_family` + §31 |
| Exact base token? | **YES** | map column `base_motion_token` + §11.5 |
| Exact premium modifier? | **YES** | map columns `premium_modifier_1..3` — or the explicit `NONE — STILLNESS IS THE DESIGN.` |
| Exact timing? | **YES** | map columns `duration_ms` / `stagger_ms` / `overlap_ms` + §11.5 |
| Exact exposure? | **YES** | map columns `subject_exposure` / `context_exposure` / `background_exposure` + §11.3 |
| Exact shared identity? | **YES** | map column `shared_element_id` + §10.4's 13 crossings |
| Exact hold? | **YES** | map column `stable_hold` + §9.1 |
| Exact reduced-motion behaviour? | **YES** | map column `reduced_motion_fallback` + §13.2 |
| Exact backward behaviour? | **YES** | map column `back_restore` + §14 |
| Exact acceptance test? | **YES** | map column `acceptance_test` → `08_ACCEPTANCE_TEST_MATRIX.csv` |

**If any answer were NO, this blueprint would be incomplete. All are YES.**

---

# 42. PRODUCTION INTEGRITY

Baseline and final for this session. ⛔ **Both runs were executed. Neither is a projection.**

| Metric | Preflight | Final | Value |
|---|---|---|---|
| Files in manifest | 159 | 159 | **159** |
| Total bytes | 2 572 474 | 2 572 474 | **2 572 474** |
| Added | — | 0 | **0** |
| Removed | — | 0 | **0** |
| SHA-256 content changed | — | 0 | **0** |
| Length changed only | — | 0 | **0** |
| mtime changed only | — | 0 | **0** |
| Byte + mtime identical | — | 159 / 159 | **159 / 159** |
| **Verdict** | **PASS** | **PASS** | **PASS** |

Manifest scope: every file under the package root except `node_modules/`, `audit/`, `.agents/`. Baseline: `audit/runtime/session-01/_integrity/manifest-after.csv`. This session: `audit/runtime/session-08/_integrity/manifest-{preflight,final}.csv`, each 24 577 bytes.

**All Session-8 writes are under `audit/**`:**

| Path | Contents |
|---|---|
| `audit/08_FINAL_RECONSTRUCTION_BLUEPRINT.md` | this document · 43 sections · ~157 KB |
| `audit/08_MOTION_IMPLEMENTATION_ARCHITECTURE.md` | the stack decision · 13 sections |
| `audit/08_CINEMATIC_ENHANCEMENT_MAP.csv` | **111 rows × 41 columns**, 0 empty cells |
| `audit/08_IMPLEMENTATION_CHECKLIST.md` | phases 0–13 · one STOP GATE each |
| `audit/08_ACCEPTANCE_TEST_MATRIX.csv` | **166 tests × 13 columns** |
| `audit/08_PERFORMANCE_QA_SPEC.md` | performance + operability contract |
| `audit/runtime/session-08/_tooling/` | `integrity.ps1` · `normalise-map.ps1` · `build-matrix.ps1` · `08_map.psv` · `08_map_cj.psv` — **no installs** |
| `audit/runtime/session-08/_integrity/` | 2 SHA-256 manifests |

### 42.1 The acceptance matrix, verified

| Property | Value |
|---|---|
| Rows | **166** |
| Columns | **13** — `test_id` `family` `requirement` `beat_scope` `scene_scope` `root_cause_ids` `canonical_blockers` `method` `pass_criteria` `evidence` `phase` `automation` `map_row_ref` |
| Duplicate `test_id` | **0** |
| Empty `requirement` / `method` / `pass_criteria` / `evidence` / `phase` / `automation` | **0** |
| Map `acceptance_test` ids represented | **102 / 102** |
| ⛔ Canonical root causes mapped | **18 / 18** — `RC-01` … `RC-18` |
| ⛔ Session-7 motion root causes mapped | **2 / 2** — `RC-19`, `RC-20` |
| ⛔ **Total tracked root causes mapped** | **20 / 20** |
| ⛔ `ACTIVE` canonical blockers mapped | **28 / 28** |
| `MANUAL` tests | **1** — `T-PER-08`, the 120 Hz measurement, which is unmeasurable by assertion |
| `AUTOMATED` tests | **165** |

⛔ `§35.3`'s two obligations — every root cause and every active blocker maps to at least one test — are **satisfied and verified by count**, not asserted.

**Forbidden paths untouched:** `src/**` · `assets/**` · `index.html` · `package.json` · lockfiles · `vite.config.*` · `tsconfig.*` · presentation production code · `Figma-app` · Integration · script · masters · Product Truth documents.

**Git:** no repository exists under `HomeplusPresentacion01`. No `commit`, `merge`, `stash`, `reset`, `checkout`, `switch`, `rebase` or `clean` was attempted or possible.

**Packages installed: none.** No formatter, no linter, no `--fix`.

---

## 43. FINAL INSTRUCTION TO THE IMPLEMENTER

> **You do not need to know what the film should feel like.**
> You need to know what to build, in what order, with which numbers, obeying which authority.
> Both are above.
>
> **If an instruction is impossible or contradictory: STOP and report the exact blocker.**
> **DO NOT improvise.**
>
> The film is already decided. Your job is to execute it exactly.

---

**END OF FINAL RECONSTRUCTION BLUEPRINT**