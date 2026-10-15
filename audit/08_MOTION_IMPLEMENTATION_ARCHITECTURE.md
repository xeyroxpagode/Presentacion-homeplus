# 08 — MOTION IMPLEMENTATION ARCHITECTURE

**Issued:** Session 8 (Final Reconstruction Blueprint), 2026-10-05.
**Status:** DECIDED. Every choice below is closed. The implementer does not choose.
**Read first:** `audit/00_AUDIT_NORMALIZATION.md` · `audit/00_CANONICAL_ISSUE_REGISTRY.md` · `audit/07_MOTION_STAGECRAFT_AUDIT.md` · `audit/07_SHARED_ELEMENT_REGISTRY.md` · `audit/08_FINAL_RECONSTRUCTION_BLUEPRINT.md`.
**Resolves:** `Q1` · `Q2` · `Q3` (already closed by Session 7) · `Q8` · `Q9` from `07_MOTION_STAGECRAFT_AUDIT.md` §43.

---

# 0. WHAT THIS DOCUMENT IS

Session 7 stated four required behaviours and refused to choose the mechanism. This file chooses **one** mechanism per requirement and closes it.

> **THE STACK IS:**
>
> ```
> React 19 (already installed)
>   + Web Animations API (browser-native)
>   + CSS transitions / @keyframes (browser-native)
>   + plain inline SVG (browser-native)
>   + ONE existing state engine, extended in place
> ```
>
> **ZERO new runtime dependencies.**

`package.json` today: `react`, `react-dom` only. Nothing is added. Nothing is removed. `package.json` is **not** modified by this campaign.

---

# 1. THE ELEVEN CANDIDATES, EVALUATED

| # | Candidate | Verdict | Reason |
|---|---|---|---|
| 1 | **CSS transitions / @keyframes** | ✅ **SELECTED — tier 1** | Already the deck's only mechanism (`src/index.css:119-172`). Zero cost. Sufficient for every `micro / enter / exit / exposure` primitive. Composes on `transform` + `opacity` only, which is exactly the property whitelist of `07 §13.3`. **KEEP the existing keyframes** (`attention-enter/exit/fade/wipe`) and re-time them onto the 8 Session-7 tokens. |
| 2 | **Web Animations API (WAAPI)** | ✅ **SELECTED — tier 1, primary choreographer for sequences** | `element.animate()` gives: deterministic `currentTime`, `finished` promises, `cancel()`/`finish()`, `playbackRate`, `commitStyles()`, `onfinish`. That is the whole lifecycle contract `07 §16` and `§18.5` need. Native, zero bytes, already shadowed by nothing. **This is the ONE primary choreography engine.** |
| 3 | **Plain inline SVG** | ✅ **SELECTED — tier 1, editorial vector layer** | `stroke-dasharray`/`stroke-dashoffset` animation via CSS = SVG path draw with no library. Used for `house.outline` (`A17`, `J03`), `ghost.links` (`J06`), `backend.verbs` emphasis bars (`G03`), `G04` transaction trace. ⛔ **SVG is not a UI technology.** UI never becomes SVG. |
| 4 | **The existing presentation state engine, extended** | ✅ **SELECTED — the state engine** | `useReducer` + pure `navigate()` in `src/presentation/navigation.ts` is already pure, already reversible, already `{slideIndex, stepIndex}`, already the single source of `presentationConfig.slides`. It is the correct engine. It is **extended in place**, not replaced. See §5. |
| 5 | **GSAP core + Timeline** | ⛔ **REJECTED** | Second choreography engine beside WAAPI. Two schedulers means two settle semantics, and the deck's hardest requirement is *exactly one settle*. Also ~70 kB min+gzip for features WAAPI already has (`finished`, `cancel`, `commitStyles`). |
| 6 | **GSAP Flip** | ⛔ **REJECTED** | Flip is a **measurement + transform-inversion + single-tween** algorithm. `08 §6.4` specifies it completely, and it is ~90 lines of the deck's own code. Buying it as a dependency to get 90 known lines is a net loss and it would own `transform`, colliding with the exposure grammar. |
| 7 | **GSAP CustomEase / MotionPath** | ⛔ **REJECTED** | `NO_UI §6` freezes three cubic-béziers. WAAPI accepts a `cubic-bezier()` easing string natively. Custom easing adds nothing. Motion paths are specified in `08_CINEMATIC_ENHANCEMENT_MAP.csv` as explicit `start_geometry → end_geometry` pairs on straight or quadratic-arc paths, which `08 §6.4` implements with `offsetPath`/`offset-distance` — natively available. |
| 8 | **Motion for React (framer-motion)** | ⛔ **REJECTED** | It is a declarative re-wrap of WAAPI + a Spring solver. The deck's Spring budget is **zero** (§8). Its layout-projection system is exactly the class of mechanism `07 §11.3` forbids. And it would want to own `style`, which conflicts with the token CSS variables. |
| 9 | **Native View Transitions API** | ⛔ **REJECTED** | Same-document only, snapshot-based, and it hijacks the compositor for the whole document. It cannot express "one object keeps identity while its context is destroyed and rebuilt" — which is the film's central requirement (`RC-01`, `M-05`). It also makes `ArrowLeft` restoration non-deterministic because the pseudo-element tree is not inspectable by the test harness. Browser support is incomplete on the presenter's machine class. |
| 10 | **Rive / dotLottie / Lottie** | ⛔ **NOT USED IN PRODUCTION** | See `08 §9`. The three editorial assets that could justify them (house outline, ghost links, transaction trace) are all **path-and-stroke** assets with 0 internal state machine and 0 artboard logic. Recreation in inline SVG is strictly better. **UI never becomes Lottie/Rive** — non-negotiable (`08 §9.3`). |
| 11 | **Theatre.js as authoring aid** | ⛔ **NOT USED** | It is a timeline *designer*. The deck's timings are already frozen numerically by `NO_UI §6` and `07 §13.2` into 8 tokens and 31 sequences. A designer for 8 numbers adds a build-time tool and a `.theatre.json` to diff, for zero expressive gain. |

**Net dependency delta: `0`.**

---

# 2. MECHANISM ASSIGNMENT — WHICH PRIMITIVE USES WHICH ENGINE

This table is binding. There is no third mechanism.

| Primitive | Mechanism | Exact API | Composition property |
|---|---|---|---|
| `micro` 200 ms | CSS transition | `transition: transform var(--t-micro) var(--e-default), background-color var(--t-micro)` | `transform` |
| `enter` 320 ms | CSS `@keyframes` (existing `attention-enter`, re-timed) | `animation: attention-enter var(--t-enter) var(--e-default) both` | `opacity`, `translate` |
| `exit` 260 ms | CSS `@keyframes` (existing `attention-exit`, re-timed + re-curved) | `animation: attention-exit var(--t-exit) var(--e-exit) both` | `opacity`, `translate` |
| `exposure` 360 ms | CSS transition on a group wrapper | `transition: opacity var(--t-exposure) var(--e-default)` | `opacity` only |
| `spatial` 500 ms | CSS transition on `.phone-frame-slot` | `transition: transform var(--t-spatial) var(--e-default)` | `transform` only |
| `reset` 520 ms | CSS transition on the veil | `transition: opacity var(--t-reset) var(--e-exit)` | `opacity` only |
| `shared` 640 ms | **WAAPI** + real-DOM reparenting | `el.animate([{transform: startMatrix},{transform: endMatrix}], {duration:640, easing:'cubic-bezier(.22,.61,.36,1)', fill:'forwards'})` — the **single** `fill:'forwards'` exception; the object is airborne and `cancel()`ed at step 7 (§6.4) | `transform`, `opacity` |
| `hero` 880 ms | **WAAPI** timeline (multi-step) | `el.animate(frames, {duration:880, easing:'cubic-bezier(.16,1,.3,1)'})` + a mask layer animated on a sibling | `transform`, `opacity`, `mask` |
| `AUTO_MICROSEQUENCE` envelope | **WAAPI orchestrator** (`08 §7`) | one controller object owning `Animation[]`, an index of steps, and a `finished` promise | — |
| `local focus` `100→s→100` | CSS transition on a leaf `transform` | `transition: transform var(--t-micro) var(--e-default)`, `transform-origin: center` | `transform` only |
| device scale `1.00 ⇄ 1.08` | CSS transition on `--phone-scale` | `transition: --phone-scale var(--t-spatial)` **requires** `@property` registration (§3.3) | `transform` on `.phone-frame` |
| SVG path draw | CSS transition on `stroke-dashoffset` | `transition: stroke-dashoffset var(--t-hero) var(--e-default)` | `stroke-dashoffset` |
| SVG morph | ⛔ **NOT USED.** See §9.2 | — | — |
| ⛔ spring physics | ⛔ **NOT USED.** See §8 | — | — |

⛔ **Forbidden globally, re-stated from `07 §13.3`:** `width`, `height`, `padding`, `margin`, `font-size`, `scrollWidth/scrollHeight/scrollTop`, `filter: blur()` as default, `box-shadow` animation, `transition: all`, any `infinite` `animation-iteration-count`.

---

# 3. TOKEN LAYER — THE SINGLE SOURCE OF DURATION AND CURVE

### 3.1 What replaces `src/presentation/motion/motionTokens.ts`

The file is **rewritten in place** (Phase 1 task 1.2). Its current shape — one `easing` string, four durations named `fast/standard/emphasis/spatial`, seven named primitives — is replaced by:

- **8 tokens**, exactly as `07 §13.2` freezes them. Names, durations and curves are **identical** to that table. Not renamed, not re-valued.
- **1 envelope**: `AUTO_MICROSEQUENCE = 1400` ms max.
- **3 curves**, emitted as CSS custom properties:
  `--e-default: cubic-bezier(.22,.61,.36,1)` · `--e-exit: cubic-bezier(.4,0,1,1)` · `--e-hero: cubic-bezier(.16,1,.3,1)`
- **The 4 existing durations survive unchanged** and are *reassigned by function*, per `07 §37.4`:
  `220 → micro` · `320 → enter` · `420 → exposure-floor` (folded: `exposure` = 360, `420` becomes the *state-transition* internal step, not a token) · `500 → spatial`.
  Precisely: `micro = 200` (Session 7 named `200`; `07 §37.4` also records `220` as the existing value — **the target token is `200`**, because `07 §13.2` and `07 §38.1` both state `200 ms` and `NO_UI §6`'s band is `180–240`. The old `220` constant is retained as `--motion-exit-duration`'s historical value only where an existing `KEEP AS-IS` item depends on it — see §3.2.)

### 3.2 `KEEP AS-IS` items whose exact millisecond values are **frozen by Session 7** and must not be re-timed

| Item | Frozen duration | Source | Blueprint consequence |
|---|---|---|---|
| S07 block exit | `220 ms` | `07 §37.1 #4`, `B-P7` | `B20` uses a **dedicated** `--t-s07-exit: 220ms`, NOT the `exit` token's 260 ms. Preserved verbatim. |
| S07 statement entrance | `420 ms` opacity + `12 px` rise | `07 §37.3 #5` | `B21` keeps `420 ms`. |
| S18 brand entrance | `420 ms` + `scale 0.96→1` | `07 §37.3 #7` | `J14` keeps `420 ms`. |
| S18 team stagger | `90 ms × 4 = 270 ms` | `07 §37.1 #17` | `J14` keeps `90 ms`. |
| S18 thanks entrance | `420 ms` + `12 px` rise | `07 §37.1 #15` | `J14` keeps `420 ms`. |
| `s18-veil-in` | `220 ms` **primitive** | `07 §37.3 #6` | Reused as the `J13` black-out *primitive*, but `J13`'s **state** still uses `reset 520` + `HOLD`. The 220 ms primitive is the inner fade of the veil; the 520 ms is the chapter reset. Both run; see Blueprint `J13`. |
| Planner selection pill | `320 ms` | `07 §37.1 #6`, `N-02` | `B10` = `enter 320`, mechanism unchanged. |
| S01 entrance | `320 ms` + `12 px` rise | `07 §37.3 #1` (`A-P3`) | `A02` = `enter 320`, unchanged. |
| S06 `step01→02` | `320 ms` | `07 §37.3 #4` | `B15` internal step = `enter 320` for the pin copy. |
| Scene I bubble | `320 ms` fade + `10 px` rise | `07 §37.1 #11` | `I03` = `enter 320`, unchanged. |

⛔ **These 10 are not "re-timed in Phase 10".** They are measured current values that Session 7 froze as correct. The cinematic polish pass (§ `08_FINAL_RECONSTRUCTION_BLUEPRINT.md` §44) may adjust them only inside `±20 ms` and must record the change.

### 3.3 `--phone-scale` must become animatable

**Problem, measured:** `src/presentation/components/PhoneFrame.tsx:8-12` sets `--phone-scale` from a React prop, and `src/index.css:98-99` consumes it in `transform: scale(var(--phone-scale))`. **CSS custom properties are not interpolable by default**, so a plain transition on `--phone-scale` will jump. `PhoneFrame` currently never animates between scales; it re-renders.

**Solution (mandatory, no library):**

1. Register the property in `src/index.css`:
   `@property --phone-scale { syntax: '<number>'; inherits: true; initial-value: 1; }`
2. Put `transition: --phone-scale var(--t-spatial) var(--e-default)` on `.phone-frame-slot`.
3. Keep `PhoneFrame`'s `scale` prop as the **target value** only. The prop drives state, not the tween.

This is the only new CSS at-rule in the campaign. It is required by `B15`, `B16`, `E01`–`E07`, `I02`, `I09`, `I13` — every whole-device scale change.

---

# 4. STATE ENGINE — DECIDED

### 4.1 What is kept

`src/presentation/Presentation.tsx` + `src/presentation/navigation.ts` + `src/presentation/presentationConfig.ts` are **kept and extended**. The `useReducer` + pure-function pattern is correct and already satisfies 7 of the 8 requirements of `07 §18.5`.

### 4.2 The one structural defect that MUST be fixed

`Presentation.tsx:34` sets `key={state.slideIndex <= 6 ? 'intro-product' : slide.id}`.

Measured consequence (`07 §14.3`): for every slide index **> 6**, changing slide **destroys and recreates the whole subtree**. 12 of 17 scene boundaries are pure cross-mounts with 0 interpolating animation; `S07→S08` is 270 entering / 517 exiting; `S13→S14` replays the entire stack entrance at opacity 1.

> **RULE `ARCH-01` — THE MOUNT CONTRACT.**
>
> 1. `.presentation-canvas` contains **exactly three** permanent children for the whole run:
>    `scene-layer` · `shared-layer` · `veil-layer`. (Plus `dev-output`, which is `dev=1` only.)
> 2. `scene-layer` renders **all 18 scenes simultaneously**, each inside a `<div data-scene-id data-active>` wrapper. Every scene is in exactly one of **three lifecycle states** — `DORMANT` · `MEASUREMENT_READY` · `ACTIVE` — specified in §4.2.1. All three hold **no** animation.
> 3. **No scene is ever unmounted during the run.** A cross-mount becomes impossible by construction.
> 4. A scene boundary that is a `reset` may cross-fade to `#000000` first. **A cross-mount is permitted only at a `reset`** (`07 §14.3`).
> 5. ⛔ **Exception, and it is narrow:** the `S01–S03` opening and `S04–S07` product block are currently mounted as one unit. That grouping is **legitimate** (`OpeningSequence.tsx:24` keeps `S01Chaos` mounted across S01→S02→S03 so leaving elements can finish moving). It is preserved: `OpeningSequence` and `HomePlannerSequence` become two of the 18 permanently-mounted scenes, not a merged mount.

**Why this rule and not per-scene lazy mounting:** `RC-01` / `M-05` / `M-06` are *count* problems (84 transitions, 0 shared elements, 12 cross-mounts). Fixing them one scene at a time recreates the defect in the next scene. Fixing the mount contract once fixes `12 of 17 boundaries` structurally. This is exactly the `RC-02`-style "solve the global mechanism" instruction.

### 4.2.1 `ARCH-01` scene lifecycle — three states (added Session 8.1)

⛔ **The defect this closes.** Point 2 above previously gave inactive scenes a single style. Blueprint `ARCH-01` also carried `content-visibility:hidden`, and §11 consequence 3 relied on it. But §6.4 step 2 requires a **live** `targetSlotEl.getBoundingClientRect()` of the destination slot **before** the object flies, and §6.3 states the destination "must provide a **slot element** — an empty box of exactly the destination geometry that exists while the object is airborne". ⛔ **A subtree under `content-visibility:hidden` applies size containment and must not be assumed to yield usable live destination geometry.** Permanent mount alone therefore does **not** make §6.4 executable: the destination must additionally be **laid out and measurable** at the instant of measurement. Three states make that structural rather than hopeful.

| | `DORMANT` | `MEASUREMENT_READY` | `ACTIVE` |
|---|---|---|---|
| `visibility` | `hidden` | `hidden` | `visible` |
| `pointer-events` | `none` | `none` | per presentation policy |
| `aria-hidden` | `true` | `true` | `false` |
| `content-visibility` | `hidden` | **`visible`** | `visible` |
| animates | **no** | **no** | yes |
| valid source of shared destination geometry | ⛔ **no** | ✅ **yes** | n/a |
| painted as active content | no | ⛔ **no** | yes |

```ts
type SceneLifecycle = 'DORMANT' | 'MEASUREMENT_READY' | 'ACTIVE';

// the ONLY legal transitions
const LEGAL: Record<SceneLifecycle, SceneLifecycle[]> = {
  DORMANT:           ['MEASUREMENT_READY'],
  MEASUREMENT_READY: ['ACTIVE', 'DORMANT'],   // ACTIVE on land, DORMANT on cancel
  ACTIVE:            ['DORMANT'],             // only if the transition contract permits it
};
```

⛔ **`DORMANT` is the resting state of every non-current scene**, and it is **not measurable for shared geometry**. Reading a `DORMANT` slot's rect is a **`BLOCKER`** (`T-MSR-01`).

⛔ **`MEASUREMENT_READY` is transient and single-purpose.** It exists only between step 2 and step 11 of §6.4. ⛔ It is never a resting state; ⛔ a stable beat never leaves a scene in it (`T-RC20-02`); ⛔ it never paints as active content and is never announced.

⛔ **`content-visibility:hidden` is now permitted on exactly one lifecycle state: `DORMANT`.** ⛔ It is **mandatory** on `DORMANT` (it is the paint/layout saving that makes 18 permanent scenes affordable) and **forbidden** on `MEASUREMENT_READY` (it would defeat the measurement).

⛔ Reduced motion never enters this contract — see §10.2: the destination state commits directly at `0 ms` and no measurement is performed.

### 4.3 State shape

`presentationTypes.ts` becomes:

```
PresentationState = {
  slideIndex: number            // 0..17  (scene)
  stepIndex: number             // 0..stepCount-1  (beat within scene)
  guardUntil: number            // epoch ms; HOLD mis-press guard expiry (Q8)
  lastManual: { slideIndex, stepIndex }   // Esc target
  flightId: number | null       // non-null while an AUTO_MICROSEQUENCE is in flight
  queuedAdvance: 0 | 1          // at most one queued advance
  reduced: boolean              // mirrors prefers-reduced-motion, for tests
}
```

⛔ `lastManual` is updated **only** on arrival at a *stable* state, never mid-sequence.
⛔ `flightId` is the single source of truth for "a sequence is running". No component-local timers.

### 4.4 The config becomes beat-addressable

`presentationConfig.ts` keeps `slides: SlideDefinition[]` but `SlideDefinition` gains:

```
SlideDefinition = {
  id, name, component,
  stepCount: number,
  beats: BeatDefinition[]        // length === stepCount; index === stepIndex
}

BeatDefinition = {
  id: string                     // 'A01' … 'J14'
  hold: boolean                  // true for all 111 beats; arming the mis-press guard for the 12 protected beats (blueprint §9.1)
  trigger: 'MANUAL' | 'AUTO_MICROSEQUENCE'
  holdGuardMs?: number           // default 600; only meaningful when hold === true
}
```

`stepCount` is **derived** from `beats.length` so the two can never disagree. ⛔ No component may read `stepIndex` and infer meaning; every scene reads `beat = beats[stepIndex]`.

**`hold` is true for all 111 beats** — `HOLD` is a property of every stable state (blueprint §9.1), not a minority of them. The 12 **protected** beats are the ones where a mis-press is semantically destructive, and those are the ones that arm the 600 ms guard:

`A01` `A06` `A07` `A12` `B20` `B21` `F01` `H05` `I06` `J01` `J07` `J14`

⛔ This list is a cross-check. **Blueprint §9.1 governs** and it declares exactly **12**. The `stable_hold` column of `08_CINEMATIC_ENHANCEMENT_MAP.csv` is the third place the same fact appears; all three must agree before Phase 1 passes.

---

# 5. NAVIGATION — Q8 DECIDED, WITH THE EXACT CONTRACT

### 5.1 What already exists (verified, do not rebuild)

`src/presentation/navigation.ts:25-33` — `navigationAction()` filters `altKey/ctrlKey/metaKey/shiftKey/isComposing` and all focusable targets, then maps `ArrowRight | Space | ' '` → `'NEXT'`, `ArrowLeft` → `'PREVIOUS'`.
`src/presentation/Presentation.tsx:25` — `if (!event.repeat) dispatch(action)`.

> **Key-repeat is ALREADY suppressed.** `event.repeat` is already filtered before dispatch. **`07 §34.2`'s "held key never repeats" requirement is already met and must simply be preserved.** Do not "improve" it; do not add a second filter.

### 5.2 The HOLD mis-press guard — final rule

`07 §34.2` proposed a permanent `→`-in-`HOLD`-is-a-no-op. Session 8 rejects that as too strong: it would make the deck unable to leave a hold. **Final rule:**

| Phase | Behaviour |
|---|---|
| On arrival at a `hold: true` beat | set `state.guardUntil = now + 600` |
| `NEXT` while `now < state.guardUntil` | **return the identical state object.** No-op. No keydown side-effect, no focus change, no visual change. |
| `NEXT` while `now >= state.guardUntil` | advance normally |
| `keydown` with `event.repeat === true` | ignored — **already true today**, preserved |
| `keydown` with `event.repeat === false` inside the guard | ignored by the guard, **but** the keyup must still be observed so that the *next* real press works |

**Guard duration: `600 ms`.** `07 §43 Q8` recommended `500–700 ms`. `600` is chosen: it is above the deck's longest single-frame sampling interval (`560 ms` in the Session-7 frame rig), below the shortest spoken beat gap in the film (`6.9 s` target, `07 §40.1`), and it is exactly 1.5× the `400 ms` lower bound of `MASTER §2.8`'s *"hold emocional: 400–900 ms"* — i.e. the guard is shorter than the shortest authorised emotional hold, so a presenter who *intends* to leave the hold is never blocked.

### 5.3 `navigate()` becomes 4-arity and pure

```
navigate(state, action, deck, now) -> PresentationState
```

`now` is injected. **No `Date.now()` inside `navigate()`.** This makes every rule in §5.2 unit-testable with a fake clock and is a hard requirement of the Phase-1 acceptance test `T-NAV-04`.

### 5.4 Complete action table

| Key | Condition | Result |
|---|---|---|
| `ArrowRight` / `Space` | stable state, no flight, `now ≥ guardUntil` | advance one beat; if it lands on a stable state set `lastManual`; if it *launches* a sequence set `flightId` and do **not** touch `lastManual` |
| `ArrowRight` / `Space` | stable state, `now < guardUntil`, current beat `hold` | **no-op** (§5.2) |
| `ArrowRight` / `Space` | `flightId !== null` | `queuedAdvance = 1` if it is 0, else no-op. **At most one.** |
| `ArrowRight` / `Space` | terminal state | no-op |
| `ArrowLeft` | `flightId !== null` | **first** `cancelFlight()` (§7.5), **then** restore `lastManual` — never the in-flight pre-state |
| `ArrowLeft` | stable | step−1; if crossing a scene, previous scene's last beat. `queuedAdvance = 0` |
| `ArrowLeft` | at `slideIndex 0, stepIndex 0` | no-op |
| `Esc` | any | `cancelFlight()` if in flight, then restore `state.lastManual` **exactly**; `queuedAdvance = 0`. If already at `lastManual`, no-op. **This is the presenter's panic key and it must always do something recoverable.** |

⛔ **`Esc` must not be swallowed by the browser.** `navigationAction()` must return `'CANCEL'` **before** the modifier/focusable filters, because in fullscreen presentation the focused element is frequently `<body>` but on some browsers it can be the canvas host. `Esc` is checked first, unconditionally.

### 5.5 `PREVIOUS` restores, it never reverses

Restating `07 §18.1` as an implementation rule: `ArrowLeft` **sets the state to the previous stable beat** and lets the entry transition play. It **never** plays the forward animation backwards. Rationale: reverse-playing a `SHARED_ELEMENT` leaves the shared object detached; a state set makes restoration exact and testable.

---

# 6. PERSISTENT SHARED-ELEMENT LAYER — Q2 DECIDED

### 6.1 The decision

> **A single, permanent, React-managed `shared-layer` is REQUIRED.**
> It is a sibling of `scene-layer` inside `.presentation-canvas`, painted above all scenes and below `veil-layer`.
> Shared objects are **promoted into it by real DOM reparenting** (`appendChild` of the live node), animated there by WAAPI, and **handed back** to the destination scene by the same reparenting call.

### 6.2 Why reparenting and not FLIP-with-clones

`07 §38.5` forbids: *"cloning the object; animating both instances."* Two instances of `asset.ps5.documents` are what Session 3 measured as the defect (`E-10`: two DOM rows at `y 202.4` and `y 210.2`).

Reparenting satisfies every clause:
- **one** node instance exists at every instant → the `E-10` defect is structurally impossible;
- it **keeps real geometry** (`42`, `NO SCREENSHOT UI`) because it *is* the product row;
- it **keeps it editable DOM**, so a text change in the source is still the source;
- `ArrowLeft` = the same reparenting call in reverse → restoration is exact by construction, which closes `07 §18.5` requirement 6 and 7.

Cost, stated honestly: reparenting loses React's ownership of that node for the duration of the flight. **Mitigation (mandatory):** the promoting component must `detach()` the node and keep the `HTMLElement` in a `useRef`, and must guarantee a re-attach on every exit path — normal settle, `ArrowLeft`, `Esc`, and reduced-motion. `08 §7.6` specifies the `finally` block.

### 6.3 Shared-element registry contract

One module, one map, keyed by `semantic_id` from `07_SHARED_ELEMENT_REGISTRY.md`:

```
SharedElementDefinition = {
  semanticId: string          // 'birthday.event' | 'inventory.missing_item' | …
  component: ComponentType    // renders the real object (a product row, a card, an SVG)
  sceneOwner: { slide, step } // where the object lives at rest
  originRectAt: () => DOMRect // measured live, never hardcoded
  targetRectAt: () => DOMRect // measured live, from the destination slot
  family: 'SHARED_ELEMENT'
  arc?: 'none' | 'subtle'     // 'subtle' = the only arc the blueprint authorises (I06)
  reducedMotionFallback: 'substitute'   // see §11
}
```

⛔ **`originRectAt` / `targetRectAt` must be live measurements of the real destination slot**, not authored numbers. `E-10` exists precisely because a `+7.8 px` authored offset was never reconciled. The destination must therefore provide a **slot element** — an empty box of exactly the destination geometry that exists while the object is airborne.

### 6.4 The `shared` movement algorithm (mandatory, this is the whole implementation)

```
0a. PREPARE   destination DORMANT -> MEASUREMENT_READY   (content-visibility:visible;
                                                            still visibility:hidden,
                                                            aria-hidden, pointer-events:none)
0b.           commit the destination's target beat / layout state   (before any rect read)
0c.           await a deterministic layout-ready signal
                 -- ResizeObserver on targetSlotEl, OR rAF after the commit,
                    OR WAAPI startTime on the common document.timeline
                 -- ⛔ NEVER setTimeout  (see §7.1)
0d.           targetSlotEl = resolve()  ;  ⛔ null  => THROW / BLOCK
0e.           slotRect = targetSlotEl.getBoundingClientRect()
0f.           ASSERT  slotRect.width  > 0
                  AND   slotRect.height > 0
                  AND   Number.isFinite(slotRect.x) && Number.isFinite(slotRect.y)
                  AND   slotRect lies inside the canvas coordinate space
                 ⛔ any assertion false => THROW / BLOCK

1.  sourceRect = originEl.getBoundingClientRect()      // canvas-space, pre-move
2.  slotRect   = slotRect                               // already live-measured at 0e
3.  moveEl into shared-layer  (appendChild; it is now absolutely positioned
                                at its last painted position via a temporary
                                inline `position:absolute; left/top/width/height`
                                copied from sourceRect)
4.  anim = moveEl.animate(
        [ { transform: 'translate(0px, 0px) scale(1, 1)' },
          { transform: `translate(${dx}px, ${dy}px) scale(${sx}, ${sy})`,
            offset: 0.62 } ... ,
          { transform: `translate(${dx}px, ${dy}px) scale(${sx}, ${sy})` } ],
        { duration: 640,
          easing: 'cubic-bezier(.22,.61,.36,1)',
          fill: 'forwards' })   // ← the ONE narrow exception; see note below
5.  await anim.finished
6.  slotEl.replaceWith(moveEl)   // hand back; slot is discarded
7.  slotEl = null; anim.cancel(); moveEl.style.transform = '';
   moveEl.classList.remove('is-shared')
8.  scene owner re-reads its own data  →  state settles
9.  PROMOTE  destination MEASUREMENT_READY -> ACTIVE
           (visibility:visible; aria-hidden=false)
10. source   ACTIVE -> DORMANT      ⛔ only if its transition contract permits it;
                                        otherwise the source stays ACTIVE
11. VERIFY   shared-layer has 0 child nodes and 0 held Animation objects
```

⛔ **Steps 0a–0f are the prepare/measure contract** (blueprint §10.3.1). They are **not** optional and they are **not** an optimisation: without them §6.3's live-measurement requirement is unsatisfiable, because a `DORMANT` destination is `content-visibility:hidden` and therefore unmeasurable.

⛔ **If target geometry is unavailable, or any assertion at 0f fails: `THROW` / `BLOCK`.** Never, under any circumstance:

- guess, interpolate, or lerp coordinates;
- use an **authored** destination geometry, or any value from `start_geometry` / `end_geometry` / `end_state`;
- clone the object, or animate a second instance alongside it;
- silently crossfade, fade the source out, or degrade the beat to `EDITORIAL`.

⛔ **On `cancelFlight()` (`Esc`, `ArrowLeft`) the reverse promotion is mandatory:** step 7 → re-attach to the **origin** slot → **`MEASUREMENT_READY → DORMANT`** on the destination → `ACTIVE → DORMANT` on the source. A scene left in `MEASUREMENT_READY` after a cancel is a **`FAIL`** (`T-MSR-07`).

⛔ **On reduced motion the entire algorithm is bypassed** (§10.2): commit the destination state at `0 ms`, never enter `shared-layer`, perform no measurement. A reduced-motion shared beat must therefore **never** promote a destination to `MEASUREMENT_READY` (`T-MSR-08`).

- `sx = slotRect.width / sourceRect.width`, `sy` similarly. **Scale is a transform, never a width/height mutation** (`07 §13.3`).
- `dx/dy` are computed from **both** rects, so it is correct under any device scale.
- `arc: 'subtle'` (only `I06`) inserts one intermediate keyframe at `offset 0.55` using `offsetPath: path('M0,0 Q …')`. **No other beat may use an arc.**
- ⛔ **The device must not move during a `shared` transition** (`07 §30.2`). The shared layer is static; only the object moves.
- ⛔ **`slotRect` availability is asserted at step 0f, before the flight begins** — not when step 5 resolves. A missing or degenerate destination rect is a `BLOCKER` (`08_FINAL_RECONSTRUCTION_BLUEPRINT.md` §41 rule 4) at promotion time, never a silent fallback mid-animation. See §6.4 steps 0a–0f and §4.2.1.

#### Why step 4 uses `fill: 'forwards'` — the single documented exception

§ 11 of this document **bans** `fill: 'forwards'` on anything that stays on stage. The `shared` movement is the **one** exception, and it is safe for a specific reason: **the object is not on stage while the animation is held.**

| | Airborne `shared` object | Anything that stays on stage |
|---|---|---|
| Resting place during the fill | ⛔ none — reparented into `shared-layer` at step 3 | the scene layer |
| Ends at | step 6, replaced back into its slot | never |
| Transform source at rest | ⛔ none — cleared at step 7 | the state |
| Held `Animation` object count at rest | **0** — `anim.cancel()` at step 7 | 0 |

⛔ **The exception is void the instant step 6 or 7 fails.** If the object is still in `shared-layer` with a live `fill: 'forwards'` animation at any settled state, that is a `FAIL` and it is exactly what `T-BAK-*` / `T-SEM-*` detect. Every other mechanism in this document settles from **state**, never from a held animation.

⛔ Step 7 ordering is mandatory: `cancel()` **after** `replaceWith()`, **before** clearing `transform`. Clearing first and then cancelling would paint one frame of the un-transformed object at the destination.

### 6.5 Layer paint order (binding)

```
.presentation-canvas
  ├── scene-layer      z-index 1   (18 permanently-mounted scenes)
  ├── shared-layer     z-index 2   (usually empty; contains 0..2 airborne objects)
  └── veil-layer       z-index 3   (absolute black; owns the 9 black HOLD states)
```

⛔ `veil-layer` is a **single** element with only `opacity` animated. It is never re-mounted. It is not a per-scene `.opening-blackout` (that class is one of the things being deleted — Blueprint Scene A `DELETE` list).

---

# 7. SEQUENCE LIFECYCLE — DETERMINISTIC, CANCELLABLE, ONCE

### 7.1 One orchestrator

```
class Microsequence {
  steps: Array<{ run: () => Animation[] | void, at: number }>
  anims: Animation[]
  promise: Promise<'settled' | 'cancelled'>
}
```

- The **only** thing that starts one is a single `MANUAL` dispatch that sets `flightId`.
- Steps are scheduled by explicit offsets, **not** by `setTimeout`. `07 §17.1` measured zero timers today and the blueprint must not reintroduce them; WAAPI's own `startTime` on a common `document.timeline` is the scheduler, with `delay` on each `Animation`.
- Every `Animation` created is pushed to `anims` **before** it can fire.

### 7.2 The three terminal states

| Terminal | Trigger | Result |
|---|---|---|
| `settled` | last step's `finished` resolves | final stable state committed, `flightId = null`, `lastManual` updated to the landing beat |
| `cancelled` | `Esc` or `ArrowLeft` during flight | `anim.cancel()` on **every** animation, then the landing beat is committed **and then** immediately reverted to the pre-sequence state. **Order matters: settle-then-revert, never cancel-mid-transform.** |
| `queued` | a `NEXT` arrives during flight | at most one; consumed on `settled` |

### 7.3 Orphan prevention — hard rule

`M-06`/`M-12` measured 33 transitions with mount/unmount and a residual transform on a hidden subtree in 34 of 85 states. **Rule:**

> On any terminal, every `Animation` in `anims` is either `finished` or `cancel()`, and every element that received an inline `transform` gets `transform: ''` in the same task. **An orphaned `transform` on a `visibility: hidden` subtree is a `FAIL`, not a `LOW`.** (`07 §36` graded it `MEDIUM` **only because it has zero visible effect today**; under `ARCH-01` it becomes load-bearing for Scene B's map beat, exactly as `07 §18.4` predicted.)

### 7.4 `finish()` vs `cancel()`

⛔ **`cancel()` is forbidden on the landing transition.** `cancel()` reverts to the pre-animation value, which is a transform that no longer matches the new scene. Use:

- `cancel()` — for interruption where the object is being re-parented away.
- `commitStyles(); finish()` — where the final state must persist through a DOM move.
- `reverse(); finish(); cancel()` — **never.**

### 7.5 `cancelFlight()` — the exact sequence

```
1. flight.anim.cancel()            // all
2. clear every inline transform set by the sequence
3. if a shared element is airborne: re-attach it to its ORIGIN slot
4. commit state = pre-sequence beat   (captured when flightId was set)
5. flightId = null ; queuedAdvance = 0
6. lastManual = the pre-sequence beat
```

Step 3 is why `originSlotEl` is stored in the flight record, symmetrically with `targetSlotEl`.

### 7.6 `try/finally` is mandatory

Every promoter is:

```
try   { prepare();            // 0a-0f: MEASUREMENT_READY + commit + layout-ready + assert
        promote(); await flight.promise }
finally { if (detached) reattach(); releaseSlot();
          releaseLifecycle(); }   // ⛔ MEASUREMENT_READY -> ACTIVE (land) or -> DORMANT (cancel)
```

⛔ A `finally` that does not re-attach is a `BLOCKER`. This is the single most likely implementation defect and it is tested by `T-NAV-07`.

⛔ **`releaseLifecycle()` is mandatory in the same `finally`** and is the only thing that guarantees a scene is never left in `MEASUREMENT_READY`. It resolves as `MEASUREMENT_READY → ACTIVE` on a normal land and `MEASUREMENT_READY → DORMANT` on cancel. A scene found in `MEASUREMENT_READY` at any stable beat is a **`FAIL`** of `T-RC20-02`.

---

# 8. PHYSICS — DECIDED: NO SPRING SOLVER

`07 §20` authorises springs "if the selected engine uses springs". **The selected engine does not.**

> **No spring. Anywhere. Ever.**

| Reason | Evidence |
|---|---|
| The canon forbids it | `NO_UI §5` Prohibido: *"spring/bounce"* · `MASTER §2.8` *"Sin rebotes, spring evidente"* |
| Determinism is a hard requirement | `07 §20`: *"deterministic rest · no visible oscillation after settle · cancel cleanly · restore exactly backward"* |
| The chosen engine has no solver | WAAPI's `easing` is a pure time→value function. Adding a solver means adding an engine, which §1 rejects. |
| Overshoot is forbidden | `07 §20` target = *"organic deceleration. Not: rubber toy."* **CRITICALLY-DAMPED FEEL VIA E-DEFAULT TAIL; NO SPRING SOLVER; NO OVERSHOOT.** A solver-driven settle on a `translate` is visually indistinguishable from `cubic-bezier(.22,.61,.36,1)` — so the solver buys nothing and costs an engine; any visible oscillation is a bug. |

**"Organic deceleration" is delivered by the curve, not the solver.** `cubic-bezier(.22,.61,.36,1)` already produces the perception; `07 §38.2-38.8` allocates it to the right tokens. ⛔ **Session 8.1 terminology contract:** wherever a decelerating settle is described anywhere in Session 8, the wording is **`CRITICALLY-DAMPED FEEL VIA E-DEFAULT TAIL; NO SPRING SOLVER; NO OVERSHOOT.`** — never *critically damped spring*, *critically-damped micro-settle*, or any phrasing that names a damping regime as the mechanism. ⛔ **No timing value changes as a result of this wording.** The word `spring` survives in exactly two legitimate places: this section's **prohibitions**, and the map's **column name** `spring_or_easing`, which selects a curve and never a solver (`08_CINEMATIC_MAP_SCHEMA.md` §2.4). Enforced by `validate-map.mjs` check `C12`.

⛔ Therefore: `motion`/`spring` libraries are rejected twice over (§1 #8, here), and **no `spring` profile is defined** because none is used. Session 8's §20 obligation is discharged by this section.

**The one legal "physics" modifier** is `shadow lift / settle` (`08 §13 GEOMETRY`) on the shared object during the last `120 ms` of its travel — implemented as a two-value `box-shadow` interpolation on the shared-layer copy only, never inside `.phone-frame-screen`.

---

# 9. LOTTIE / RIVE / SVG — DECIDED PER ASSET

`07 §41` and Session 8 §41 require a per-asset verdict. Three assets were considered.

### 9.1 The three editorial assets in the target film

| Asset | Beats | Internal animation complexity | State machine adds value? | SVG recreation quality | Verdict |
|---|---|---|---|---|---|
| `house.outline` | `A17`, `J03` | **0** — one closed path, `fill: none`, `stroke-width 4–6 px` | **no** — 2 states (absent / drawn) | **identical** — it is literally a `stroke-dashoffset` tween | **PLAIN INLINE SVG** |
| `ghost.links` (`J06`) | `J06` | **0** — ≤ 3 dashed straight lines | **no** | **identical** — `stroke-dasharray: 4 6` + draw | **PLAIN INLINE SVG** |
| `transaction.trace` (`G04`) | `G04` | **1** — a point moving behind a device, 2 keyframes | **no** | **identical** — a WAAPI transform on a real text node | **PLAIN INLINE SVG / CSS** |
| `organization.symbols` (`J08`) | `J08` ×5 | **0** — 5 static glyphs | **no** | **identical** — reuse `assets/app-icons/*.svg` which **already exist** (`bank.svg`, `calendar.svg`, `drive.svg`, `notes.svg`, `location.svg`) | **PLAIN INLINE SVG, REUSE EXISTING** |

### 9.2 SVG morph — REJECTED for the whole film

Zero beats in `08_CINEMATIC_ENHANCEMENT_MAP.csv` carry `premium_modifier = SVG morph`. The two candidates were:
- logo → wordmark: solved by **two discrete elements on a `hero` keyframe track**, not by morphing paths.
- ghost → solid object: solved by `opacity` (`07 §26`, `E-06`).

⛔ `SESSION 8 §13 VECTOR` lists "SVG morph" as an *allowed* modifier family. Session 8 **does not use it**. An allowed modifier that is not used is not a decision; it is listed here so the implementer does not go looking for it.

### 9.3 Hard boundary

⛔ **UI NEVER BECOMES LOTTIE OR RIVE.** `Home`, `Planner`, `Finance`, `Family`, `Inventory`, `Assets`, `HomeCloud`, `Homi` remain **real editable DOM/UI** (`NO_UI §1`, `08 §42`). If a future asset needs a real state machine with artboard logic, that is a **new dependency request** and requires blueprint approval, not an implementer decision.

---

# 10. REDUCED MOTION — Q9 DECIDED

### 10.1 What exists today (measured, and it is wrong)

`src/index.css:174-181`:

```
@media (prefers-reduced-motion: reduce) { .presentation-canvas * { animation: none !important; transition: none !important; } }
```

**Verdict: `07 §43 Q9` is CLOSED and the answer is *no*.** This block does not degrade sequences *acceptably* — it **hard-cuts them**. `I06` (task travels to Planner) becomes: auxiliary device appears instantly at full opacity, task teleports, Planner device vanishes. The **meaning** — *"Homi works over HomePlus"* — is destroyed, not preserved.

### 10.2 The reduced-motion contract

> **Every cinematic sequence must have a semantic fallback.** The fallback is **not** "no animation". It is **deterministic state substitution**: the same semantic result, reached in `0–120 ms`, with the meaning intact.

| Beat class | NORMAL | REDUCED — binding |
|---|---|---|
| shared object travels (`C05` `D06` `E04` `I06`) | object moves `shared 640` across a visible arc | **the destination state is committed immediately; the object does not appear in the shared layer at all.** It is rendered, in place, at the destination slot, inside the destination scene. `0 ms`. |
| exposure shift (`A06` `B03` `C07` `E06` `I12` `I14`) | `exposure 360` opacity tween | **instant opacity set.** `0 ms`. Same final opacities. |
| saturation burst (`A05`) | 3 staggered bursts, 1100 ms | **all 11 fragments mounted at their final positions at `0 ms`.** No stagger, no sequence. |
| black reset (`A12` `B20` `H05` `I17` `J01` `J13`) | `exposure 360` then `reset 520` then `HOLD` | **`HOLD` is unchanged.** The black state **still exists** and **still waits for the presenter.** Only the 880 ms of fade is removed. ⛔ A `HOLD` must never be removed by reduced motion — that would delete the beat. |
| hero reveal (`A14` `I01`) | `hero 880` | **`0 ms`** — final frame directly. ⛔ **The preceding black `HOLD` beat (`A12`, `I01` step 0) is retained.** The pause before the reveal is the content. |
| three-device comparison (`I09`) | laterals emerge from behind, 500 ms | **all three devices present at final geometry at `0 ms`.** |
| device out-UP / in-BELOW (`I13`) | `spatial 500` + `500` | **both surfaces present simultaneously at final geometry, `0 ms`.** Never one-then-the-other — that ordering *is* the meaning. |
| technology recession (`J11`) | `scale 100→82`, `opacity 100→0` | **final frame at `0 ms`.** ⛔ `house` and `family` still never move. |
| SVG draw (`A17` `J03` `J06`) | `stroke-dashoffset` 700–900 ms | **final drawn state at `0 ms`.** |
| local focus (`G02` `B03`) | `100→s→100` | **`0 ms`**, and the **exposure** change still happens, so the emphasis survives. |

⛔ **Reduced motion removes TIME, never MEANING.** If a fallback cannot express the beat's semantic job, the beat is wrong — report it, do not paper over it.

### 10.3 Implementation

```
prefersReducedMotion  →  reduced: boolean in PresentationState
```

- Read once at startup; listen for change and set `reduced` (no re-render storm).
- Every `Microsequence` reads `state.reduced` **at construction**: if true it runs **zero** animations and resolves `settled` on the next microtask after committing the final state.
- ⛔ The existing `index.css` blanket `!important` block is **deleted** and replaced by the token-level rule: each token's reduced variant is `0 ms`. The blanket block must go because it also kills the `opacity` exposure changes that carry meaning.
- ⛔ `S07`'s `132 px` type, `S08_step01`'s exposure values, `#060404` and the S18 end card are **untouched** by reduced motion — they are not animations.

---

# 11. PERFORMANCE IMPLICATIONS — WHY THIS STACK

`08_PERFORMANCE_QA_SPEC.md` carries the full contract. The architectural consequences:

| # | Consequence | Why |
|---|---|---|
| 1 | **Every animated property is `transform` or `opacity`.** No exceptions. | Both are compositor-only; neither triggers layout or paint. `07 §13.3` already froze this. The new `@property --phone-scale` is the one thing that needs checking — hence `PERF-07`. |
| 2 | **`fill: 'forwards'` is banned on anything that stays on stage.** Settled state must come from the **state**, not from a held animation. | A held animation pins the element to the compositor and is exactly the `fill-mode: both` residue `N-10`/`M-12` describe. |
| 3 | **The 18 permanently-mounted scenes** cost memory, not frame time. A **`DORMANT`** scene is `visibility: hidden` + `content-visibility: hidden`, so it is neither laid out nor painted. ⛔ A **`MEASUREMENT_READY`** scene is `content-visibility: **visible**` and *is* laid out, which is precisely the cost it exists to pay — for the duration of one shared flight and no longer. | Required by `ARCH-01` §4.2.1. `DORMANT` cost is one-time; `MEASUREMENT_READY` is transient and ≤ 1 scene at a time. |
| 4 | **The shared layer holds 0 objects for 105 of 111 beats.** | Only `A05`→`B02`, `A17`, `B03`, `B11`, `B07`, `C05`, `D06`, `E04`, `F03`, `I06`, `I09`, `I11`, `I13`, `J02`, `J10` involve it, and `0–2` nodes at a time. |
| 5 | **No `box-shadow` animation inside `.phone-frame-screen`.** The only shadow tween is the shared layer's lift/settle. | `box-shadow` is a paint property; inside a 282×602 clipping ancestor it repaints the surface. |
| 6 | **No `blur`, no `backdrop-filter`, no `filter` tween in any beat.** | Paint + GPU memory. `07 §12` prohibits blur as default anyway. |
| 7 | **Preload/`will-change` is forbidden except during an in-flight `shared` move, and must be removed on settle.** | `will-change` left on permanently is the classic source of the 12 `finished`-but-attached animation objects. |
| 8 | **Target: 60 FPS floor.** 120 Hz headroom is aspirational and **must be measured**, never promised (`08 §43`). | |
| 9 | **`@property` registration is a hard gate** for device-scale animation. If `@property` fails in the presenter's browser, `B15`/`I13` degrade to instant scale change — acceptable, and it must be detected by a test, not discovered on stage. | `PERF-07`. |

---

# 12. DEPENDENCY IMPACT — EXACT

| Package | Before | After | Change |
|---|---|---|---|
| `react` | `^19.0.0` | `^19.0.0` | none |
| `react-dom` | `^19.0.0` | `^19.0.0` | none |
| `gsap` | — | — | **never added** |
| `motion` / `framer-motion` | — | — | **never added** |
| `animejs` | — | — | **never added** |
| `@theatre/core` | — | — | **never added** |
| `@rive-app/react-canvas` / `lottie-*` / `@lottiefiles/dotlottie-*` | — | — | **never added** |
| devDependencies | unchanged | unchanged | none |

`package.json`, `package-lock.json`, `pnpm-lock.yaml`, `vite.config.ts`, `tsconfig.json` — **untouched.**

⛔ **If the implementer believes a dependency is required: STOP, and report it as a `BLOCKER` using the format in `08_FINAL_RECONSTRUCTION_BLUEPRINT.md` §51.** A dependency is a blueprint change, not an implementation choice.

---

# 13. EXACT REASONS — ONE LINE EACH

| Decision | Reason |
|---|---|
| React kept | it is the deck; `presentationConfig` + `useReducer` already model 85 states reversibly |
| `navigate()` extended, not replaced | it is already pure and already 7/8 compliant with `07 §18.5` |
| 18 scenes permanently mounted | `RC-01`/`M-05`/`M-06` are count problems; the mount contract fixes 12 of 17 boundaries at once |
| WAAPI as the one choreographer | lifecycle (`finished`/`cancel`/`playbackRate`/`commitStyles`) is the whole requirement set; zero bytes |
| CSS for `micro/enter/exit/exposure/spatial/reset` | they are ≤ 360 ms single-property tweens; CSS is the correct tool and is already there |
| Real-DOM reparenting | the only technique that yields **one** instance with **real** geometry — kills `E-10` at the root |
| Live rect measurement | authored coordinates are what produced the `+7.8 px` `E-10` defect |
| No springs | `NO_UI §5` forbids bounce; determinism is required; WAAPI has no solver |
| No SVG morph | zero beats need it; two discrete elements + `hero` keyframes solve both cases |
| No Lottie/Rive | all four editorial assets are path-and-stroke with 0 state machines |
| No Theatre | 8 frozen tokens and 31 frozen sequences are the entire authoring surface |
| `600 ms` HOLD guard | above the deck's longest sampling interval, below the shortest spoken beat, inside `MASTER §2.8`'s 400–900 ms hold band |
| `now` injected into `navigate()` | every guard rule becomes unit-testable with a fake clock |
| Reduced motion = state substitution | cutting an animation to 0 ms destroys `I06`'s meaning; substituting the destination state preserves it |
| `@property --phone-scale` | custom properties are not interpolable; without this, device scale cannot tween |

---

# 14. WHAT IS **NOT** DECIDED HERE

| Item | Why | Where it lives |
|---|---|---|
| Scene content, datasets, geometry per beat | content truth, owned by Sessions 2–6 | Blueprint §20–§29 |
| Exact premium modifier per beat | cinematic decision, owned by Session 8 | `08_CINEMATIC_ENHANCEMENT_MAP.csv` |
| Script wording (`SI-*`) | owner = script owner; `N-44` forbids the audit rewriting it | `00_CROSS_SESSION_CONFLICTS.md` §4 |
| Map ETA (`CF-08`) | genuine authority conflict, open by design | `00_AUDIT_NORMALIZATION.md` `N-03`/`N-30` |
| Technology order (`CF-15`) | script/master conflict; `G07` is its own beat either way | `00_SESSION7_GATE.md` §7.1 |
| Closing object wording (`CF-20`) | script owner; `J02` uses only objects the opening established | `N-25` |

---

**END OF MOTION IMPLEMENTATION ARCHITECTURE**

*Session 8 decided the architecture. It did not implement it. Production files modified: NONE.*