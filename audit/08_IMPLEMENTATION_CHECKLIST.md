# 08 — IMPLEMENTATION CHECKLIST

**For:** the implementer.
**Read first:** `08_FINAL_RECONSTRUCTION_BLUEPRINT.md` §2 (implementer rules) · `08_MOTION_IMPLEMENTATION_ARCHITECTURE.md` · `08_CINEMATIC_ENHANCEMENT_MAP.csv`.
**Machine-readable tests:** `08_ACCEPTANCE_TEST_MATRIX.csv`.

---

## HOW TO USE

1. Work **one phase at a time**, in order.
2. Tick every box before touching the next phase's STOP GATE.
3. At each STOP GATE write **one** of: `STATUS: PASS` · `STATUS: FAIL` · `STATUS: BLOCKED`. ⛔ **No partial-success language.**
4. ⛔ **`FAIL` ⇒ do not proceed.** ⛔ **`BLOCKED` ⇒ stop and report using §2.1 of the blueprint.**
5. ⛔ **Never tick a box you did not verify.** A ticked box is a claim.

---

# ⛔ PHASE 0 — BASELINE / LOCK

**PRECONDITIONS:** none. Read access to the package.

- [ ] `0.1` Read `00_AUDIT_NORMALIZATION.md` in full.
- [ ] `0.2` Read `00_CANONICAL_ISSUE_REGISTRY.md` §1 (28 active blockers) and §7 (18 root causes).
- [ ] `0.3` Read `00_SESSION7_GATE.md` §8.2 (the 15 capability rules) and §8.4 (the preserve list).
- [ ] `0.4` Read `07_MOTION_STAGECRAFT_AUDIT.md` §13.2 (tokens), §13.3 (properties), §37 (keep list), §38 (target motion system).
- [ ] `0.5` Read `07_SHARED_ELEMENT_REGISTRY.md` in full.
- [ ] `0.6` Produce the **production manifest**: 159 files / 2 572 474 bytes, SHA-256 per file. Store under `audit/runtime/session-09/_integrity/manifest-preflight.csv`.
- [ ] `0.7` Produce the **screenshot baseline** of all 85 current states. Store under `audit/runtime/session-09/baseline/`.
- [ ] `0.8` Record the current **85-state / 84-transition walk** as the comparison basis.
- [ ] `0.9` Record the current **device geometry census**: `.phone-frame` `298×618`, `.phone-frame-screen` `282×602`, in all 66 device states.
- [ ] `0.10` Record the current **attention census**: the 37 states where narration-on-screen is top salience.
- [ ] `0.11` Confirm **0 git operations** are possible or needed (no repository exists under `HomeplusPresentacion01`).
- [ ] `0.12` Confirm the Integration working tree's pre-existing dirty state, if you read it. ⛔ Do **not** clean, stage, reset or checkout.

**ACCEPTANCE**
- [ ] Manifest reports exactly `159` files and `2 572 474` bytes.
- [ ] `ADDED 0 · REMOVED 0 · SHA256 CHANGED 0`.
- [ ] Baseline screenshots exist for all 85 states.
- [ ] You can state, without looking anything up, the 15 capability rules and the 12 protected `HOLD` beats.

**STOP GATE 0**
```
STATUS: ____
Evidence: audit/runtime/session-09/_integrity/manifest-preflight.csv
```

---

# ⛔ PHASE 1 — MOTION FOUNDATION

> **This is the phase that decides whether the campaign succeeds.** ⛔ **No scene work before this gate passes.**

**PRECONDITIONS:** Phase 0 `PASS`.

## 1.1 Tokens and curves

- [ ] `1.1.1` Rewrite `src/presentation/motion/motionTokens.ts` with **8 tokens** exactly as blueprint §11.5: `micro 200` · `enter 320` · `exit 260` · `exposure 360` · `spatial 500` · `reset 520` · `shared 640` · `hero 880`.
- [ ] `1.1.2` Emit **3 curves** as CSS custom properties: `--e-default` `--e-exit` `--e-hero` with the exact `NO_UI §6` values.
- [ ] `1.1.3` Emit **1 envelope** constant `AUTO_MICROSEQUENCE = 1400`.
- [ ] `1.1.4` Add the `08_MOTION_IMPLEMENTATION_ARCHITECTURE.md` §3.2 frozen values: `--t-s07-exit: 220ms`, `--t-s07-statement: 420ms`, `--t-s18-brand: 420ms`, `--t-s18-team-step: 90ms`, `--t-s18-thanks: 420ms`, `--t-s18-veil: 220ms`.
- [ ] `1.1.5` Re-time the existing `attention-enter` / `attention-exit` / `attention-fade` / `attention-wipe` keyframes onto the new tokens. ⛔ Do not delete them (`A-P3` is `KEEP AS-IS`).
- [ ] `1.1.6` ⛔ Confirm **no** `transition: all` and **no** `animation-iteration-count: infinite` anywhere in `src/`.

## 1.2 `@property` registration

- [ ] `1.2.1` Add `@property --phone-scale { syntax: '<number>'; inherits: true; initial-value: 1; }` to `src/index.css`.
- [ ] `1.2.2` Add `transition: --phone-scale var(--t-spatial) var(--e-default)` to `.phone-frame-slot`.
- [ ] `1.2.3` Verify in the browser that `--phone-scale` **interpolates** (`T-PER-07`). ⛔ If it does not, stop and report — the entire device-scale grammar depends on it.

## 1.3 Mount contract — `ARCH-01`

- [ ] `1.3.1` Restructure `src/presentation/Presentation.tsx` so `.presentation-canvas` has exactly three permanent children: `scene-layer`, `shared-layer`, `veil-layer`.
- [ ] `1.3.2` `scene-layer` renders **all 18 scenes simultaneously**, each in a `<div data-scene-id data-active>`.
- [ ] `1.3.3` Implement the **three-state scene lifecycle** of blueprint §2.2.1 / architecture §4.2.1. ⛔ It is **not** a single inactive style:

  | state | `visibility` | `pointer-events` | `aria-hidden` | `content-visibility` | animates | measurable for shared geometry |
  |---|---|---|---|---|---|---|
  | `DORMANT` | `hidden` | `none` | `true` | **`hidden`** | no | ⛔ **no** |
  | `MEASUREMENT_READY` | `hidden` | `none` | `true` | **`visible`** | no | ✅ **yes** |
  | `ACTIVE` | `visible` | per policy | `false` | `visible` | yes | n/a |

  ⛔ Legal transitions only: `DORMANT → MEASUREMENT_READY`, `MEASUREMENT_READY → ACTIVE`, `MEASUREMENT_READY → DORMANT`, `ACTIVE → DORMANT`. ⛔ No `display:none`, no `opacity:0` on a scene root (that would let it animate).
- [ ] `1.3.3a` `DORMANT` is the resting state of every non-current scene. ⛔ **A `DORMANT` slot's rect must never be consumed** as a shared destination (`T-MSR-01`).
- [ ] `1.3.3b` `MEASUREMENT_READY` is **transient** — never a resting state, never left behind at a stable beat (`T-RC20-02`).
- [ ] `1.3.4` ⛔ **Remove `key={...}` from the scene section.** No scene is ever unmounted.
- [ ] `1.3.5` Preserve the legitimate `OpeningSequence` / `HomePlannerSequence` grouping as two of the 18 permanently-mounted scenes.
- [ ] `1.3.6` `veil-layer` is **one element** with only `opacity` animated. Delete `.opening-blackout` and `s18-veil-in` as separate mechanisms and re-point both to `veil-layer`.

## 1.4 Beat-addressable state

- [ ] `1.4.1` Extend `SlideDefinition` with `beats: BeatDefinition[]`; derive `stepCount` from `beats.length`.
- [ ] `1.4.2` `BeatDefinition = { id, hold, trigger, holdGuardMs? }`.
- [ ] `1.4.3` **Generate the 111 beats from `08_CINEMATIC_ENHANCEMENT_MAP.csv`** in press order. The map **is** the config.
- [ ] `1.4.4` Set `hold: true` on exactly these 12: `A01` `A06` `A07` `A12` `B20` `B21` `F01` `H05` `I06` `J01` `J07` `J14`.
- [ ] `1.4.5` Extend `SlideProps` to `{ stepIndex, beat, hold, reduced }`. ⛔ Update every scene so **no scene branches on a raw `stepIndex` number** — branch on `beat.id`.

## 1.5 State shape and navigation

- [ ] `1.5.1` Extend `PresentationState` to the 7-field shape of blueprint §7.1.
- [ ] `1.5.2` Make `navigate()` **4-arity**: `navigate(state, action, deck, now)`. ⛔ **No `Date.now()` inside it.**
- [ ] `1.5.3` `lastManual` updates **only** on arrival at a stable state.
- [ ] `1.5.4` Implement the `HOLD` guard: on arrival at a `hold:true` beat set `guardUntil = now + 600`; `NEXT` while `now < guardUntil` returns the **identical state object**.
- [ ] `1.5.5` Add `'CANCEL'` to `NavigationAction`. Map `Escape` to it **before** the modifier and focusable filters in `navigationAction()`.
- [ ] `1.5.6` Implement the complete action table of blueprint §8.3, including: queue **at most one** advance during a flight; `ArrowLeft` **first** cancels the flight then restores `lastManual`.
- [ ] `1.5.7` ⛔ **Preserve `if (!event.repeat) dispatch(action)`** at `Presentation.tsx:25`. Key-repeat suppression already exists.
- [ ] `1.5.8` `PREVIOUS` **sets state**; it never plays a forward animation in reverse.
- [ ] `1.5.9` Write **unit tests** for `navigate()` with an injected fake clock covering: normal advance, blocked advance inside the guard, advance after the guard, `ArrowLeft` at a boundary, `ArrowLeft` during a flight, `Esc` during a flight, `Esc` at `lastManual`, double advance queueing, terminal-state no-op (`T-NAV-01` … `T-NAV-09`).

## 1.6 Persistent shared-element layer

- [ ] `1.6.1` Add `shared-layer` as the second child of `.presentation-canvas`, `z-index 2`.
- [ ] `1.6.2` Create the `SharedElementDefinition` type of `08_MOTION_IMPLEMENTATION_ARCHITECTURE.md` §6.3.
- [ ] `1.6.3` Implement the **prepare / measure** steps `0a`–`0f` of §6.4 **before** the flight, in this exact order (blueprint §10.3.1):
  1. source stays `ACTIVE`
  2. destination `DORMANT → MEASUREMENT_READY`
  3. **commit** the destination's target beat / layout — before any rect is read
  4. ⛔ await a **deterministic layout-ready signal**: `ResizeObserver` on the slot, or `requestAnimationFrame` after the commit, or WAAPI `startTime` on the common `document.timeline`. ⛔ **Not `setTimeout`.**
  5. obtain `targetSlotEl` (⛔ null ⇒ `THROW` / `BLOCK`)
  6. `targetSlotEl.getBoundingClientRect()`
  7. ⛔ **assert** `width > 0` · `height > 0` · `Number.isFinite(x)` · `Number.isFinite(y)` · inside the canvas coordinate space — any failure ⇒ `THROW` / `BLOCK`
- [ ] `1.6.3a` Implement the rest of §6.4 **verbatim**, including `slot.replaceWith(object)`, inline-transform clearing, and the closing `MEASUREMENT_READY → ACTIVE` / `ACTIVE → DORMANT` promotions.
- [ ] `1.6.4` Implement `originSlotEl` / `targetSlotEl` bookkeeping on the flight record, and re-attach to the **origin** on cancellation.
- [ ] `1.6.5` ⛔ Every promoter is wrapped in `try/finally` with a **guaranteed re-attach** *and* a **guaranteed `releaseLifecycle()`** (§7.6), so no scene is ever left in `MEASUREMENT_READY`.
- [ ] `1.6.6` Both rects are **live `getBoundingClientRect()` measurements**, never authored numbers. ⛔ Never use `start_geometry` / `end_geometry` / `end_state` as coordinates.
- [ ] `1.6.7` ⛔ Fail loudly (throw + visible log) if the destination slot is unavailable **or its rect is degenerate**. ⛔ **Do not fall back silently** — and never guess coordinates, clone the object, or degrade to a crossfade.
- [ ] `1.6.8` Build a **single test crossing** end-to-end (any one of the 13) and verify: one instance at every instant, exact origin restore on `ArrowLeft`, no residual inline transform.
- [ ] `1.6.9` Verify the full `T-MSR-01` … `T-MSR-08` set (blueprint §35.4): dormant-not-measured · rect non-zero and stable · not visibly painted · one semantic object during flight · landed state correct · `ArrowLeft` · `Esc` mid-flight · reduced motion.

## 1.7 Sequence lifecycle

- [ ] `1.7.1` Implement the `Microsequence` class of §7.1 with exactly three terminals: `settled` / `cancelled` / `queued`.
- [ ] `1.7.2` Schedule steps by explicit `delay` on a common `document.timeline`. ⛔ **No `setTimeout`.**
- [ ] `1.7.3` Push every created `Animation` into `anims` **before** it can fire.
- [ ] `1.7.4` Implement `cancelFlight()` in the exact 6-step order of §7.5. ⛔ Step 3 (re-attach the shared object) happens **before** the state revert.
- [ ] `1.7.5` ⛔ `fill: 'forwards'` is **banned** on anything that stays on stage.
- [ ] `1.7.6` ⛔ Never use `cancel()` where `commitStyles(); finish()` is required. ⛔ Never use `reverse()`.
- [ ] `1.7.7` On every terminal, clear every inline `transform` the sequence applied.

## 1.8 Reduced motion

- [ ] `1.8.1` Read `prefers-reduced-motion` once at startup; listen for change; set `state.reduced`.
- [ ] `1.8.2` ⛔ **Delete the `index.css:174-181` blanket `!important` block.** Replace with token-level `0 ms` variants.
- [ ] `1.8.3` `Microsequence` reads `state.reduced` at construction: if true, create **zero** animations and resolve `settled` on the next microtask after committing the final state.
- [ ] `1.8.4` Implement every fallback row of blueprint §13.2.
- [ ] `1.8.5` Verify: with reduced motion on, `I06` still shows the task inside Planner; `I13` shows **both** surfaces simultaneously; `A12` and `J01` still **hold**; `J11` still leaves the family unmoved.

## 1.9 Foundation acceptance

- [ ] `1.9.1` Full 85-state walk still completes with 0 runtime errors.
- [ ] `1.9.2` Every one of the 85 current states renders (content may be interim; the **engine** must work).
- [ ] `1.9.3` Forward and backward walks both complete with **0 running animations** at every settled state.
- [ ] `1.9.4` ⛔ **Zero residual inline `transform` on any hidden subtree** in both directions (`T-BAK-06`). ⛔ **This is the one currently-failing requirement of `07 §18.5` and Phase 1 exists to close it.**
- [ ] `1.9.5` The 9 navigation unit tests pass.
- [ ] `1.9.6` The single shared-element test crossing passes all five of §30.3's prohibitions.

**ACCEPTANCE**
- [ ] All 1.1–1.9 boxes ticked.
- [ ] `navigate()` is provably pure with an injected clock.
- [ ] `@property --phone-scale` interpolates.
- [ ] One shared object crosses a boundary with one instance and exact restoration.

**STOP GATE 1**
```
STATUS: ____
BLOCKER IF NOT MET: any scene work started before this gate is out of contract.
```

---

# ⛔ PHASE 2 — GLOBAL STAGE GRAMMAR

**PRECONDITIONS:** Phase 1 `PASS`.

- [ ] `2.1` Implement the **device anchors**: stage-left `x 250`, stage-right `x 730`, centred. At `1.08` use `x 238` / `x 718` / centred — computed from the anchor definition, **never authored per state**.
- [ ] `2.2` Restrict device scale to a **two-value enum**: `1.00` and `1.08`. ⛔ Add a runtime guard that throws on any third value.
- [ ] `2.3` **Declare the 23 px safe-area breach** of `1.08` in code and in the token file, with the reason (`N-41`, `M-09`).
- [ ] `2.4` Implement the **exposure bands** of §11.3 as CSS custom properties: `--exposure-subject: 1.00`, `--exposure-context: 0.55`, `--exposure-heading: 0.60`, `--exposure-background: 0.30`, `--exposure-decision: 0.20`, `--exposure-label: 0.40`.
- [ ] `2.5` Implement the **local-focus primitive**: `transform` only, `transform-origin: center`, `micro 200`, out and back, with the seven §11.4 preconditions **asserted in code** (⛔ throw if a focus target is inside `.phone-frame-screen` or any measured-overflowing ancestor).
- [ ] `2.6` Implement `veil-layer` as the **single** black mechanism, with `reset 520` on the exit curve.
- [ ] `2.7` Implement the **enter/exit** primitives with `12 px` travel.
- [ ] `2.8` Implement the **stage-depth** classes: `DEVICE-ABOVE-PLANE`, `PLANE-BEHIND-DEVICE`, `FAMILY-IMMOVABLE`.
- [ ] `2.9` Implement the **motion-budget guard**: a dev-mode assertion that no transition moves more simultaneous meaningful movers than §2.3 `CINE-04` allows. Ordinary ≤ 2 · shared ≤ 3 · device ≤ 2 · reset = 1 · `J11` = 3.
- [ ] `2.10` ⛔ Replace `#E65C1B` with `#E7643F` in `src/presentation/design-system/tokens.ts:9` (`N-24`).
- [ ] `2.11` ⛔ Do **not** unify `#060404` and `#0B0908` (`J-13` is `LOW`/`ACTIVE` and must stay a deliberate inconsistency).

**ACCEPTANCE**
- [ ] A device can be moved between anchors with **no** layout mutation.
- [ ] A local focus at `1.15` on a `248 px` row inside `282 × 602` **throws** rather than clips.
- [ ] The motion-budget guard fires on a synthetic 5-mover transition.
- [ ] `#E7643F` is the only brand orange in the computed styles.

**STOP GATE 2**
```
STATUS: ____
```

---

# ⛔ PHASE 3 — OPENING (S01–S03)

**PRECONDITIONS:** Phases 1, 2 `PASS`.

- [ ] `3.1` `A01` — PRESERVE the true black; DELETE the `0.075` glow.
- [ ] `3.2` `A02` — RESCALE the insurance document to `440–480 px`; keep the artwork and the `enter 320` primitive.
- [ ] `3.3` `A03` — RESCALE the bag to `380–440 px`; **the invoice must persist at `0.60`** (`A-06`).
- [ ] `3.4` `A04` — BUILD the warranty as a physical paper; MOVE it to the third press.
- [ ] `3.5` `A05` — REBUILD the saturation field: 11 pieces, 65–75 % coverage, the exact `NO_UI A04` strings; DELETE blur and the eight bespoke opacities; one `AUTO` 1100 ms with 3 bursts of 3/4/4 at 70/55/40 ms.
- [ ] `3.6` `A06` — CREATE the collective-quiet state at one shared `0.55–0.65`.
- [ ] `3.7` `A07` — clear to absolute `#000000` and `HOLD`.
- [ ] `3.8` `A08` — **DELETE all six brand logos**; BUILD three household objects at `0.55`, each 200 px+.
- [ ] `3.9` `A09` — CREATE the single-object isolation.
- [ ] `3.10` `A10` — **CREATE `message.old_household`** with the palette and type **frozen verbatim** from the current bubble.
- [ ] `3.11` `A11` — **REPLACE the string** with `La información ya existía.` (past tense); **80 px**; **once**; add the four fragments at `0.30`.
- [ ] `3.12` `A12` — **CREATE the absolute-black hold for the whole of L41–L43.** ⛔ No timer.
- [ ] `3.13` `A13` — CREATE the icon alone; **DELETE both radials**.
- [ ] `3.14` `A14` — REPLACE with the `hero 880` horizontal reveal; `#E7643F` masked field fill; **DELETE the vertical stacking**.
- [ ] `3.15` `A15` — CREATE the four members entering at absolute `105 %` as **four independent layers** (§10.2).
- [ ] `3.16` `A16` — CREATE the equality at `100 %`.
- [ ] `3.17` `A17` — CREATE the house outline draw + Juli morph into Home.
- [ ] `3.18` Declare a **persistence model** (`ACCUMULATIVE` / `EXCLUSIVE` / `SELECTIVE CONTINUITY`) on **every** Scene A beat.
- [ ] `3.19` Verify `A12` is holdable: mash `ArrowRight` for 10 s; **nothing** advances.

**ACCEPTANCE**
- [ ] 17 beats, in order, each mapped to its `Guion Compartido (2).md` anchor.
- [ ] `T-VIS-*` PASS for all 17.
- [ ] `T-GEO-01`, `T-GEO-03`, `T-GEO-04`, `T-GEO-05` PASS.
- [ ] `T-SEM-01`, `T-SEM-02`, `T-SEM-03` PASS.
- [ ] `T-STA-01`, `T-STA-02`, `T-STA-03` PASS (each beat's `stable_hold` honoured).
- [ ] `T-TRU-01`, `T-TRU-02` PASS.
- [ ] Manual review: **zero** brand marks and **zero** brand colour before `A14`.

**STOP GATE 3**
```
STATUS: ____
```

---

# ⛔ PHASE 4 — PRODUCT CORE (S04–S10)

**PRECONDITIONS:** Phases 1–3 `PASS`.

## 4.1 Scene B
- [ ] `4.1.1` `B04`/`B05` — ⛔ `authorizationCompleted` and `schoolTaskCompleted` **always `false`**; rows read `Pendiente`; **DELETE** the completion-toast mechanism.
- [ ] `4.1.2` `B05` — move both tasks to `PRÓXIMAMENTE` with the `Mañana` lead.
- [ ] `4.1.3` `B03` — REPLACE the `1.02` scale with the `S08_step01` exposure model.
- [ ] `4.1.4` `B08` — page title becomes `Planner`.
- [ ] `4.1.5` `B09` — pending items + the `Responsabilidades` **row**; ⛔ no `COMPLETADAS` heading; ⛔ no 4th tab.
- [ ] `4.1.6` `B10` — event **with its time** + one recurring row in words; **pill translates only**, max tab width 84 px.
- [ ] `4.1.7` `B11` — REPLACE the dataset; ⛔ not `Cumpleaños`; ⛔ not the abstract triple.
- [ ] `4.1.8` `B12` — four members, Juli included.
- [ ] `4.1.9` `B13` — CREATE the consequence-first beat; ⛔ delete `+1 h` from the map.
- [ ] `4.1.10` `B14` — CREATE the two questions in sequence.
- [ ] `4.1.11` **`B15` — REPLACE the map mechanism.** `spatial 500` device `1.00→1.08`; map chrome inside the device to `0.40`; pin **copy only** at `1.08–1.15`. ⛔ **DELETE the `.family-map-stage` layout-mutation path in `FamilyMapStage.tsx`.** ⛔ **Top bar, `Mapa` title, `Familia｜Mapa｜Lugares` switch and bottom nav all stay visible.** ⛔ No ETA, no distance, no travel time. ⛔ Do not point at the authored pin percentages.
- [ ] `4.1.12` `B16` — exact reverse of `B15`.
- [ ] `4.1.13` `B17` — editorial conversation; ⛔ **the word "Feed" never appears on screen**; no hidden tab bar.
- [ ] `4.1.14` `B18` — frozen copy; author `Mamá`; `Familia García · Ahora`.
- [ ] `4.1.15` `B19` — CREATE the retained-list position.
- [ ] `4.1.16` `B20` — ⛔ **DO NOT TOUCH**: block exit at `220 ms` + `#060404` hold.
- [ ] `4.1.17` `B21` — ⛔ **DO NOT TOUCH**: `132 px`, two-tone, `420 ms`.
- [ ] `4.1.18` `B22` — CREATE the four callbacks at `70 ms` stagger; ⛔ same objects.

## 4.2 Scene C
- [ ] `4.2.1` `C01` — Event identity with `Sábado` · **`19:00`** · an owner.
- [ ] `4.2.2` `C02` — three of the six `NO_UI §18` canon tasks; each with assignee and due date.
- [ ] `4.2.3` `C03` — ⛔ **DO NOT TOUCH** the measured exposure values.
- [ ] `4.2.4` `C04` — the bridge task **stays at `1.00`**; ⛔ **DELETE the 68 px question**.
- [ ] `4.2.5` `C05` — REPLACE the 480 px slide with the extraction; ⛔ device must not move; ⛔ one instance.
- [ ] `4.2.6` `C06` — REBUILD the layout so the `Sin stock` row is visible in every state.
- [ ] `4.2.7` `C07` — exposure-only isolation; ⛔ **DELETE the `Lista de compras` teaser**; ⛔ zero geometry change.

## 4.3 Scene D
- [ ] `4.3.1` Apply the **frozen `N-22` dataset**; ⛔ delete `−$55.700`, `+$350.000`, `$24.500`, `$18.600`, `$61.800`, `Alimentación`.
- [ ] `4.3.2` `D01` — PRESERVE the composition order; rebuild anatomy to the target; the stage title enters **after** its line.
- [ ] `4.3.3` `D02` — CREATE `Nuevo movimiento` + the `Personal \| Hogar` switch that visibly re-scopes.
- [ ] `4.3.4` `D03` — CREATE `Pagos`; ⛔ **DELETE all four `33 px` stage questions**.
- [ ] `4.3.5` `D04` — CREATE `Límites`.
- [ ] `4.3.6` `D05` — real `Resumen` then real `Análisis`.
- [ ] `4.3.7` `D06` — CREATE the movement-row extraction; ⛔ device must not move; ⛔ the Asset must not repeat the price.

## 4.4 Scene E
- [ ] `4.4.1` `E01` — device `1.08` stage-left; REPLACE the dataset; ⛔ delete `TV · Living` and `Aire acondicionado · Dormitorio`; keep `Heladera`.
- [ ] `4.4.2` `E02` — ⛔ **DELETE every Assets-owned money/date/maintenance field.**
- [ ] `4.4.3` `E03` — BUILD all five sections in the frozen order; empty sections do not render; fill the empty 42 %.
- [ ] `4.4.4` `E04` — REPLACE the 480 px slide with the extraction at **the same y**; ⛔ device must not move; ⛔ one instance.
- [ ] `4.4.5` `E05` — correct date; album opened; ⛔ **DELETE the gradient photo stand-ins**; ⛔ **DELETE the drawn waveform** but keep an audio entry; ⛔ **DELETE `Factura TV`**.
- [ ] `4.4.6` `E06` — CREATE the warranty-vs-memory composition; ⛔ **never write `documentos vs recuerdos`**.
- [ ] `4.4.7` `E07` — exposure-down **first**, then reset, then `HOLD`.

**ACCEPTANCE**
- [ ] 42 beats (B 22 + C 7 + D 6 + E 7) exist and are reachable in order.
- [ ] `T-GEO-06`, `T-GEO-07`, `T-GEO-08`, `T-GEO-09`, `T-GEO-10`, `T-GEO-14` PASS.
- [ ] `T-SEM-04`…`T-SEM-08` PASS.
- [ ] `T-TRU-03`…`T-TRU-25` PASS.
- [ ] Manual review of `B15`: ⛔ no width/height/font-size mutation; ⛔ no canvas scroll mutation; ⛔ phone anatomy intact; ⛔ no proximity figure.
- [ ] Manual review of `C05`/`D06`/`E04`: ⛔ device does not move in any of the three.
- [ ] `12 movimientos` is backed by the **filter sheet**, not `Resumen`.

**STOP GATE 4**
```
STATUS: ____
```

---

# ⛔ PHASE 5 — CONTINUITY / TECHNICAL BLOCK (S11–S14)

**PRECONDITIONS:** Phases 1–4 `PASS`.

- [ ] `5.1` `F01` — black established by the scene-entry transition, **not** a dedicated press.
- [ ] `5.2` `F02` — six concrete situations reused from A–E; six abstractions at `0.55`; ⛔ **maximum 3 relations**; ⛔ no spiderweb, no ERD, no big-titled boxes.
- [ ] `5.3` `F03` — abstractions resolve to **product objects**.
- [ ] `5.4` `F04` — ⛔ **NO TEXT.** ⛔ **DELETE `La vida no pasa por módulos.` and `HomePlus los conecta.`**
- [ ] `5.5` `F05` — the device enters and centres; ⛔ delete the `56 px` resolution line.
- [ ] `5.6` `G01` — CREATE the centred device; ⛔ no logo, no label, no panel on this beat.
- [ ] `5.7` `G02` — three local-focus steps on **real** UI at `1.08` / `1.15` / `1.10`.
- [ ] `5.8` `G03` — CREATE the backend plane **behind** the device + the five verbs one at a time; ⛔ no rack, terminal, code rain or cylinder.
- [ ] `5.9` `G04` — CREATE the `$48.720` transaction travelling behind the frame; ⛔ **DELETE `.s12-bridge` and `.s13-bridge` entirely.**
- [ ] `5.10` `G05`/`G06`/`G07` — logos only as named, one press each; ⛔ **drop the mono→colour crossfade**; ⛔ **DELETE the `140 px` `.s13-center` column**; Figma attached to the frontend.
- [ ] `5.11` `G08` — ⛔ **DELETE the `ai.svg` glyph and `.s13-core-glow`.** IA is plain type + a role caption.
- [ ] `5.12` `G09` — CREATE the recomposition; final state is **exactly one product**.
- [ ] `5.13` ⛔ **DELETE `S13_step00`** entirely.
- [ ] `5.14` `H01` — the recomposed device inherited; ⛔ **no stack remount**, ⛔ no echo above `0`.
- [ ] `5.15` `H02` — CREATE the real task route from **real components**; ⛔ **DELETE the `.s14-node` text pills**; ⛔ do not show `Home → Planner → Tareas → +`.
- [ ] `5.16` `H03` — CREATE the editorial warranty route with real nodes only.
- [ ] `5.17` `H04` — CREATE the clean-product state; ⛔ no labels around it.
- [ ] `5.18` `H05` — CREATE the black `HOLD`.
- [ ] `5.19` `H06` — `88–96 px`, both lines `#F5F1EB`; ⛔ **DELETE the barrier line**; separate press from `H05`.
- [ ] `5.20` `H07` — ⛔ **no shared element to the Homi name.**
- [ ] `5.21` Implement the **Option A** boundary: the stack persists across `S13→S14` and only changes exposure.

**ACCEPTANCE**
- [ ] 28 beats (F 5 + G 9 + H 7 + the S12→S13 deletion) exist.
- [ ] `T-MOT-X05` (Scene F ≤ 3 relation links), `T-MOT-X06` (Scene G holds a device in all 9 states), `T-MOT-X07` (S13→S14 replays nothing) PASS.
- [ ] `T-TRU-26`…`T-TRU-34` PASS.
- [ ] Manual review: Scene G holds a real device in **all 9** states.
- [ ] Manual review: the `S13→S14` boundary shows **0 entering / 0 exiting** and **0 replayed entrance animations**.
- [ ] Manual review: the three measured text collisions in `S14` are **gone** — measure the overlap census and confirm `0`.

**STOP GATE 5**
```
STATUS: ____
```

---

# ⛔ PHASE 6 — HOMI (S15–S17)

**PRECONDITIONS:** Phases 1–5 `PASS`.

- [ ] `6.1` `I01` — CREATE the black + `Homi` alone at `hero 880`; ⛔ no glow, no aura, no orb, no particles.
- [ ] `6.2` `I02` — device enters; wordmark settles to `0.40` **after** the device settles.
- [ ] `6.3` `I03` — REPLACE the string with `Haceme acordar de comprar una Coca mañana`; PRESERVE the `320 ms` + `10 px` primitive.
- [ ] `6.4` `I04` — BUILD the structured proposal `Crear tarea` / `Comprar una Coca` / `Mañana` / `Cancelar` \| `Confirmar`; ⛔ **not `recordatorio`**, ⛔ not a sentence; distinct CSS classes.
- [ ] `6.5` `I05` — both actions; ⛔ **no reflow**.
- [ ] `6.6` **`I06`** — implement §28.2 **frame by frame**, including the single quadratic arc at `offset 0.55` (⛔ the only arc in the entire film), the `~700 ms` destination prelap, the `120 ms` shadow tail-settle — **CRITICALLY-DAMPED FEEL VIA E-DEFAULT TAIL; NO SPRING SOLVER; NO OVERSHOOT.** (`ARCH-04`) — and the auxiliary device entering **before** the card travels and exiting **after** it lands. ⛔ **No `Confirmado` state may exist.**
- [ ] `6.7` `I07` — ⛔ **DELETE `S16_step00`** and the `56 px` titular.
- [ ] `6.8` `I08` — ⛔ **`hoy` → `mañana`**; PRESERVE the bubble box `777,187,238,81` byte-identically.
- [ ] `6.9` `I09` — CREATE the three-device row at `106 px` gaps; extract the question above at `56 px`; ⛔ no headline; ⛔ **never shrink the devices**.
- [ ] `6.10` `I10` — Juli KEEP verbatim; Tomi REPLACE to `18:00 a 20:00` + `Entregá el trabajo de Historia`, ⛔ no mamá pickup; Papá REPLACE to `revisar los pagos del hogar y confirmar el turno del técnico`, ⛔ **no `lista de compras`**, ⛔ no asserted `Internet ya está pago`.
- [ ] `6.11` `I11` — CREATE the Finance grounding with the `N-22` figures; back `12 movimientos` with the filter sheet.
- [ ] `6.12` `I12` — real components at `0.55`; ⛔ **DELETE `Basado en tu contexto`**.
- [ ] `6.13` `I13` — CREATE out-UP / in-BELOW with **both surfaces visible**; ⛔ never simulate navigation.
- [ ] `6.14` `I14` — `Cancelar` \| `Confirmar` at `1.00`, rest at `0.20`; ⛔ **relabel `Ahora no`**; ⛔ no reflow.
- [ ] `6.15` `I15` — ⛔ **DELETE the second stage headline**; `Sábado · 19:00 → Domingo · 19:00`.
- [ ] `6.16` `I16` — ⛔ **DELETE the `Confirmado` mutation state**; `HOLD` without confirming.
- [ ] `6.17` `I17` — `reset 520` to black; ⛔ one continuous breath into Scene J.
- [ ] `6.18` Differentiate the persona swap: identity chip `200 ms`, answer card `320 ms` with `60 ms` delay (`I-23`).

**ACCEPTANCE**
- [ ] 17 beats exist.
- [ ] `T-SEM-13`, `T-SEM-14` PASS.
- [ ] `T-GEO-12`, `T-GEO-13`, `T-GEO-14`, `T-GEO-15` PASS.
- [ ] `T-TRU-35`…`T-TRU-43` PASS.
- [ ] **Manual review of `I06` frame by frame against §28.2** — all 11 rows match.
- [ ] **Manual review of `I16`**: no `Confirmado`, no mutation, the decision row unchanged, black held.
- [ ] Three devices at `I09`, exactly, at `106 px` gaps, none shrunk.
- [ ] `T-BAK-05` / `T-SEM-13`: `ArrowLeft` from `I06` returns the card **to the chat**, with no detached copy and no duplicate device.

**STOP GATE 6**
```
STATUS: ____
```

---

# ⛔ PHASE 7 — CLOSING (S18)

**PRECONDITIONS:** Phases 1–6 `PASS`.

- [ ] `7.1` **PRODUCE the missing assets**: `physical.heladera` (no asset exists) · `house.outline` (no asset exists) · the family avatars split into four layers. ⛔ Match the existing flat-vector palette exactly: `#302922` `#45362A` `#B57956` `#718374`.
- [ ] `7.2` `J01` — `reset 520` then `HOLD` for **the whole of Gaby's block (~24.5 s)**; ⛔ no text, no logo, no animation.
- [ ] `7.3` `J02` — three objects from the **established** set; `120 ms` stagger; much air. ⛔ **NO `mochila`.**
- [ ] `7.4` `J03` — house outline draws `700–900 ms`; objects scale `100 → 90`.
- [ ] `7.5` `J04` — the four family members inside the house; `70 ms` stagger. ⛔ **From here the family is immutable.**
- [ ] `7.6` `J05` — the three ghosts at `0.25–0.35`; ⛔ **the SAME objects from Scenes A and B**.
- [ ] `7.7` `J06` — `AUTO 1100`: lines `300` · hold `400` · ghosts to `0` at `400`.
- [ ] `7.8` `J07` — the 2 px `#E7643F` line; ⛔ nothing else moves.
- [ ] `7.9` `J08` — five `MANUAL` triggers, one per word, `24–32 px`, around the family, ⛔ **the words never on stage**.
- [ ] `7.10` `J09` — order then move to the periphery; ⛔ the family does not move.
- [ ] `7.11` `J10` — the elements form phone geometry; ⛔ **no device enters**.
- [ ] `7.12` **`J11`** — `AUTO 1400`, three groups staged `120 ms`; ⛔ **the house and family move by zero pixels.**
- [ ] `7.13` `J12` — `AUTO 1210`: flash `80–120 ms` · frame `300` · hold ~`800`; ⛔ **no text**.
- [ ] `7.14` `J13` — `reset 520` to black.
- [ ] `7.15` `J14` — ⛔ **DO NOT TOUCH** the end card or its three separate triggers.

**ACCEPTANCE**
- [ ] 14 beats exist.
- [ ] `T-SEM-15`, `T-SEM-16`, `T-SEM-17`, `T-SEM-18` PASS.
- [ ] `T-GEO-16` PASS.
- [ ] `T-STA-10`, `T-STA-11`, `T-STA-12`, `T-STA-13` PASS (J-beat stability).
- [ ] **`T-SEM-18` automated invariant: during `J11` the family geometry signature is byte-identical forward and backward.**
- [ ] `T-SEM-18` / `T-BAK-08`: `ArrowLeft` from `J11` restores every object and leaves the family byte-identical.
- [ ] Manual review: ⛔ **no `mochila`** anywhere in the closing.
- [ ] `J01` holds for the full 24.5 s and survives a 10 s key-mash.

**STOP GATE 7**
```
STATUS: ____
```

---

# ⛔ PHASE 8 — SHARED-ELEMENT INTEGRATION

**PRECONDITIONS:** Phases 3–7 `PASS`.

- [ ] `8.1` Verify **all 13 crossings** of blueprint §10.4 individually, at `0 / 160 / 320 / 640 / settled` ms.
- [ ] `8.2` For each: assert **exactly one DOM instance** at every sampled instant.
- [ ] `8.3` For each: assert the **50 %-travel identity test** (§30.4) — ± 1 px on geometry, exact on type size and copy.
- [ ] `8.4` For each: assert the device **did not move** (shared transitions only).
- [ ] `8.5` For each: assert `ArrowLeft` restores the **exact origin geometry**.
- [ ] `8.6` Assert `SE-15` produced **no** shared element between `H06` and `I01`.
- [ ] `8.7` Assert the family geometry is **byte-identical** through `J04` → `J12`.
- [ ] `8.8` Verify no shared element is ever accompanied by a lookalike.

**ACCEPTANCE**
- [ ] `T-SEM-01`…`T-SEM-18` **all PASS**.
- [ ] Zero identity losses.
- [ ] Zero lookalike pairs.

**STOP GATE 8**
```
STATUS: ____
```

---

# ⛔ PHASE 9 — WHOLE-FILM MOTION PASS

**PRECONDITIONS:** Phase 8 `PASS`.

- [ ] `9.1` Run `S01 → S18` uninterrupted, forward, 3 times.
- [ ] `9.2` Run `S18 → S01` uninterrupted, backward, 3 times.
- [ ] `9.3` Assert **0 running animations** at **all 111** settled states, both directions.
- [ ] `9.4` Assert **0 residual inline transforms** on hidden subtrees, both directions.
- [ ] `9.5` Assert `0` layout mutations and `0` font-size mutations across all 110 transitions.
- [ ] `9.6` Assert `0` cross-mounts except at the 9 `reset` blacks.
- [ ] `9.7` Assert the 15 dead presses are **gone** — no press produces an identical before/after snapshot.
- [ ] `9.8` Assert every one of the 12 protected holds survives a 10 s key-mash.
- [ ] `9.9` Assert `Esc` recovers from every beat.
- [ ] `9.10` Assert the whole-film rhythm matches §33: quietest at `A12` `B21` `J07` `J12`; loudest at `A14` `C05` `D06` `E04` `I06` `J11`.

**ACCEPTANCE**
- [ ] `T-STA-*` `T-BAK-*` `T-NAV-*` **all PASS**.
- [ ] `T-MOT-01` (global motion-budget) PASS.

**STOP GATE 9**
```
STATUS: ____
```

---

# ⛔ PHASE 10 — CINEMATIC POLISH

**PRECONDITIONS:** Phase 9 `PASS` **and** the gate order of blueprint §35.1 satisfied up to `Motion PASS`.

> ⛔ **This phase may only refine numbers.** See blueprint §37.2 for what it may **not** change.

- [ ] `10.1` Run `T-VIS-*`, `T-GEO-*`, `T-MOT-*`, `T-STA-*`, `T-BAK-*`, `T-NAV-*`, `T-TRU-*`, `T-SEM-*` once more as the pre-polish baseline.
- [ ] `10.2` Adjust timing within `20–100 ms`.
- [ ] `10.3` Adjust travel within `1–4 px`.
- [ ] `10.4` Adjust overlap within `20–100 ms`.
- [ ] `10.5` Adjust the `E-DEFAULT` tail-settle window within `± 60 ms`. ⛔ Easing only — `ARCH-04`: **no spring solver, no overshoot, no bounce.**
- [ ] `10.6` Adjust mask edges within `± 2 px`.
- [ ] `10.7` Adjust depth offsets within `± 2 px`.
- [ ] `10.8` Adjust stagger within `± 15 ms`, staying inside the `30–90 ms` band.
- [ ] `10.9` Adjust exposure within `± 0.05`, staying inside the frozen bands.
- [ ] `10.10` Adjust camera-like framing within a `2–4 %` push only.
- [ ] `10.11` **RECORD every change**: beat, previous value, new value, reason. An unrecorded change is a `FAIL`.
- [ ] `10.12` Re-run the full acceptance matrix.

**ACCEPTANCE**
- [ ] `08_ACCEPTANCE_TEST_MATRIX.csv` = **100 % PASS**.
- [ ] A change log exists and every entry is inside a §37.1 tolerance.
- [ ] ⛔ Zero changes outside §37.2.

**STOP GATE 10**
```
STATUS: ____
```

---

# ⛔ PHASE 11 — PERFORMANCE / OPERABILITY QA

**PRECONDITIONS:** Phase 10 `PASS`.

- [ ] `11.1` Execute the profiling process in `08_PERFORMANCE_QA_SPEC.md`: every one of the 31 `AUTO` sequences, ≥ 3 runs each, 4× CPU throttle.
- [ ] `11.2` Record frame time, layout count, paint count, layer count per sequence. Store under `audit/runtime/session-11/`.
- [ ] `11.3` Assert **60 FPS** floor on every sequence.
- [ ] `11.4` Measure — do not assume — whether 120 Hz headroom is achievable. ⛔ **Do not claim it without a transcript.**
- [ ] `11.5` Keyboard stress: hold `ArrowRight` for 30 s at each of the 111 beats. ⛔ **Nothing may skip a protected hold.**
- [ ] `11.6` Mashing test: 20 presses/second for 10 s at each of the 12 protected holds.
- [ ] `11.7` `ArrowLeft` stress: 50 rapid reversals from a random beat. ⛔ No orphan, no detached shared element, no residual transform.
- [ ] `11.8` `Esc` stress: 30 rapid `Esc` presses from a random beat.
- [ ] `11.9` Interruption test: fire `ArrowRight` mid-sequence on each of the 31 `AUTO` beats. ⛔ Exactly one queued advance; the sequence lands on its final stable state.
- [ ] `11.10` Reduced-motion full run with all `T-RMO-*` PASS.
- [ ] `11.11` Assert **0** `animation-iteration-count: infinite` in computed styles at any of the 111 beats.
- [ ] `11.12` Assert `will-change` is absent at every settled state.

**ACCEPTANCE**
- [ ] `T-PER-*` **all PASS** with transcripts stored.
- [ ] `T-NAV-*` **all PASS** under stress.
- [ ] `T-RMO-*` **all PASS**.

**STOP GATE 11**
```
STATUS: ____
```

---

# ⛔ PHASE 12 — PROJECTOR / REHEARSAL QA

**PRECONDITIONS:** Phase 11 `PASS`.

- [ ] `12.1` Project on a **real** projector at `1920×1080`. Measure from the back row of an empty room.
- [ ] `12.2` Readability: every required figure and route node is legible at 3 m.
- [ ] `12.3` Full **timed rehearsal** with the real speaker. Confirm `± 0.5–1 s` oral variance tolerance (`MASTER §2.10`).
- [ ] `12.4` Press timing: no press lands mid-clause.
- [ ] `12.5` Visual breathing: each of the 9 black states and 12 protected holds is long enough to feel and short enough to hold.
- [ ] `12.6` Scene energy matches §33's arc.
- [ ] `12.7` Closing impact: watch `J11`–`J14` alone; the family appears **not** to move; `J12` reads as a moment, not a title card.
- [ ] `12.8` Reveal impact: watch `A12`–`A14` alone; the black is long enough for the question; the lockup is not a slide change.
- [ ] `12.9` Mis-press resilience in practice: the presenter mashes the key for 10 s at each protected hold.
- [ ] `12.10` If the time limit is at risk, a `DELIVERY CUT` may only eliminate oral redundancy, shorten enumerations, compress technical explanation, and reduce holds. ⛔ It may **not** change scene order, callbacks, product decisions or beat counts.

**ACCEPTANCE**
- [ ] All 8 questions of blueprint §36 PASS.
- [ ] A timed rehearsal transcript exists.

**STOP GATE 12**
```
STATUS: ____
```

---

# ⛔ PHASE 13 — FINAL FREEZE

**PRECONDITIONS:** Phase 12 `PASS`.

- [ ] `13.1` Full run `S01 → S18` and `S18 → S01`, clean.
- [ ] `13.2` `08_ACCEPTANCE_TEST_MATRIX.csv` = **100 % PASS**.
- [ ] `13.3` Every STOP GATE in this file = `PASS`.
- [ ] `13.4` Zero unresolved blockers. ⛔ `OB-1`…`OB-3` are inherited and owned outside the campaign — they are **recorded, not blockers**; confirm each has a safe temporary rule in force.
- [ ] `13.5` Re-verify production integrity: **0 added, 0 removed, 0 SHA-256 changed** against `audit/runtime/session-01/_integrity/manifest-after.csv`.
- [ ] `13.6` Update `00_SESSION_PLAN.md` (or a successor) with the shipped beat map and the resolved `Q1`–`Q9`.

**ACCEPTANCE**
- [ ] Blueprint §40's **24 criteria** are all true and evidenced.
- [ ] Production integrity = `PASS`.

**STOP GATE 13 — FINAL DEFINITION OF DONE**
```
STATUS: ____
```

---

## SUMMARY — what the implementer may NOT reorder

```
PHASE 0  Baseline            ┐
PHASE 1  MOTION FOUNDATION   │ ← the only irreversible ordering in the project
PHASE 2  Stage grammar       ┘
PHASE 3  Opening       ┐
PHASE 4  Product core  │ ← these six may run in parallel by owner,
PHASE 5  Continuity   │   but NONE may start before Phase 2 passes
PHASE 6  Homi          │
PHASE 7  Closing       ┘
PHASE 8  Shared-element integration   ← after ALL scenes
PHASE 9  Whole-film pass               ← after Phase 8
PHASE 10 Cinematic polish              ← after Motion PASS
PHASE 11 Performance / operability
PHASE 12 Projector / rehearsal
PHASE 13 FREEZE
```

⛔ **Never start with "fix Scene 6" or "make Homi cooler."**
⛔ **Never skip a STOP GATE.**
⛔ **Never proceed after a `FAIL`.**

---

**END OF IMPLEMENTATION CHECKLIST**