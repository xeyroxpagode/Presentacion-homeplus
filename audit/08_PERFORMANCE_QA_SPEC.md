# 08 — PERFORMANCE / OPERABILITY QA SPEC

**For:** the implementer, at **Phase 11**.
**Read first:** `08_MOTION_IMPLEMENTATION_ARCHITECTURE.md` · `08_FINAL_RECONSTRUCTION_BLUEPRINT.md` §13 §14 §35 §36 · `08_IMPLEMENTATION_CHECKLIST.md` Phase 11.
**Tests executed:** `08_ACCEPTANCE_TEST_MATRIX.csv` rows `T-PER-*`, `T-NAV-*`, `T-RMO-*`, `T-MSR-*`, `T-RC19-*`, `T-RC20-*`, `T-ENG-11`, `T-BAK-*`.

---

## 0. SCOPE AND STANDING

⛔ **This document is a contract, not a report.** It defines what must be *measured*. It contains **no** measured numbers, because Session 8 has **zero** access to a running application. Every number in `08_PERFORMANCE_QA_SPEC.md` is a **threshold**, never an observation.

⛔ **Do not mark a performance gate `PASS` from source inspection.** `T-PER-06` (a `grep`) and `T-PER-04`/`T-PER-05` (computed-style sweeps) are necessary but not sufficient. ⛔ **A `PASS` requires a stored transcript.**

---

## 1. HARDWARE / SOFTWARE PROFILE — record before measuring

A performance number without a profile is not evidence. Store this before the first measurement.

| Field | Value to record |
|---|---|
| CPU model | |
| Logical cores | |
| RAM | |
| GPU / integrated | |
| Display resolution and refresh rate | |
| Browser + exact version | |
| OS + build | |
| Dev server or static build | ⛔ record **which**; a dev build is **not** a ship build |
| Window size | |
| Device pixel ratio | |
| `prefers-reduced-motion` during measurement | |
| Measurement date and time | |

⛔ **Two profiles are mandatory:** (a) the presenter's real machine, (b) the **projector machine** at `1920×1080`. A gate that passes on a dev laptop and fails on the projector machine is a `FAIL`.

---

## 2. THE THREE HARD THRESHOLDS

| # | Threshold | Value | Enforced by |
|---|---|---|---|
| **P1** | Frame time, every one of the **31** `AUTO` sequences | **≤ 16.7 ms** (60 FPS floor), **0** dropped frames | `T-PER-01` |
| **P2** | Layouts per transition, all **110** | **0** layouts caused by `width`/`height`/`margin`/`padding`/`font-size` | `T-PER-02` |
| **P3** | Painted area per transition | **≤** animated bounding rect **+ 20 %** | `T-PER-03` |

⛔ **P1 is a floor, not a target.** The film is projected. A 55 FPS average with visible judder is a `FAIL` even if the mean frame time is under 16.7 ms.

### 2.1 The 120 Hz question — measure, do not assume

⛔ **`T-PER-08` is explicitly `MANUAL` and the answer is not known.** Record one of:

- **`ACHIEVED`** — with the transcript showing sustained frames under **8.3 ms** on at least the 9 highest-cost sequences.
- **`NOT ACHIEVED`** — with the transcript and the measured floor.

⛔ **Do not write "60 FPS is sufficient" and stop.** The projector refresh may be 120 Hz. Measure, then decide. An unmeasured claim here is a `FAIL` under `08_FINAL_RECONSTRUCTION_BLUEPRINT.md` §43.

---

## 3. THE 31 `AUTO` SEQUENCES — the complete profiling set

⛔ **All 31 must be profiled. 3 runs each = 93 runs.** A subset is a `FAIL`.

The 31 `AUTO_MICROSEQUENCE` beats, from `08_CINEMATIC_ENHANCEMENT_MAP.csv`:

Read directly from `08_CINEMATIC_ENHANCEMENT_MAP.csv`, column `trigger_type = AUTO_MICROSEQUENCE`. **Verified: 31 rows, 80 `MANUAL`.**

```
A05  A07  A12  A13  A14                      Scene A      5
B03  B07  B10  B20                            Scene B      4
C05                                            Scene C      1
D06                                            Scene D      1
E04  E06  E07                                  Scene E      3
G02  G03  G04  G09                             Scene G      4
H04  H05                                       Scene H      2
I01  I02  I06  I09  I13  I16                  Scene I      6
J01  J06  J11  J12  J13                        Scene J      5
                                                TOTAL      31
```

⛔ **The profiler must select its set from the map, not from this table.** If the two ever disagree, the **map governs** and the disagreement is a finding to report — ⛔ do not silently profile a different set.

**Note on scene distribution:** Scene F has **0** `AUTO` beats (`F01`–`F05` are all `MANUAL`). Scene C has one (`C05`, the extraction). Scene D has one (`D06`, the Finance movement extraction).

⛔ **Four beats are budgeted at the full `1400 ms` envelope: `B07` (scope widening), `G04` (the travelling transaction), `I06` (the execution sequence) and `J11` (technology recession).** `G04`, `I06` and `J11` each carry a literal `1400` in `07_TRIGGER_BEAT_MAP.csv` (`auto_total_duration`); `B07` is the fourth. ⛔ **A Session 8.1 note previously asserted here that "the map budgets `J11` shorter with staged overlap" — that assertion was wrong and is withdrawn.** The map now agrees with `07` at `1400 ms` for `J11`; `J11`'s three groups are staged `120 ms` apart (`stagger_ms = 120`) **within** that envelope, which is not the same as a shorter envelope. Record `duration_ms` per sequence and ⛔ do not assume any figure not present in the map.

**The three highest-cost sequences to profile first:** `I06` (`shared` + `spatial` + an auxiliary device entering and exiting), `B07` (scope widening, a layout-shaped change), `J11` (three staged groups, the closing's largest mover count).

### 3.1 Per-sequence record — one row each

| Field | Notes |
|---|---|
| `beat_id` | |
| `duration_measured_ms` | must be within 16.7 ms of `duration_ms` (`T-MOT-X08`) |
| `duration_declared_ms` | from the map |
| `frames_total` | |
| `frame_time_max_ms` | **the number that matters** |
| `frame_time_p95_ms` | |
| `frames_over_16_7ms` | ⛔ must be **0** |
| `layouts` | |
| `paints` | |
| `paint_area_px2` | vs animated rect |
| `composited_layers_peak` | |
| `run_1` `run_2` `run_3` | three independent transcripts |

Store under `audit/runtime/session-11/perf/<beat_id>.json` plus a human-readable summary.

---

## 4. PER-TRANSITION CENSUS — all 110 transitions

Beyond the 31 `AUTO` beats, the **79** `MANUAL` transitions must also be swept. Each is a single enter/exit/exposure/device move and must cost **zero** avoidable layouts.

⛔ **Instrumentation required.** A `MutationObserver` on `attributes` for `style`, plus `PerformanceObserver` for `layout-shift` and long tasks, recording for each of the 110 transitions:

- layout count · paint count · paint area · long-task count · max frame time

⛔ **`font-size` mutation is a `FAIL`, not a warning** (`T-PER-02`). It is the specific defect that `B15`/`B11`/`C06` currently exhibit in production, and Phase 2 exists to close it.

---

## 5. THE MOVER BUDGET (`T-MOT-01`)

A dev-mode assertion, active during the whole film, enforcing `08_FINAL_RECONSTRUCTION_BLUEPRINT.md` §2.3:

| Transition class | Max simultaneous meaningful movers |
|---|---|
| Ordinary enter / exit | **2** |
| Shared element | **3** |
| Device move | **2** |
| Black reset | **1** |
| `J11` | **3** |
| **5 or more** | ⛔ **forbidden** — this is the `G-14` failure mode |

The assertion must **fail loudly in dev** and **log** the beat id and the offending movers. A budget violation is a `FAIL` of `T-MOT-01`, even if it renders at 60 FPS. ⛔ Performance and legibility are different gates; `08_FINAL_RECONSTRUCTION_BLUEPRINT.md` §35.1 forbids running one while the other is `FAIL`.

---

## 6. OPERABILITY STRESS

`07 §34.2`'s finding was measured from behaviour, so these must be too. ⛔ **Every stress test is run against the real deck in the browser, not a unit test.**

### 6.1 Keyboard stress — all 111 beats

⛔ **The 12 protected `HOLD` beats, named so this document is self-contained:** `A01` `A06` `A07` `A12` `B20` `B21` `F01` `H05` `I06` `J01` `J07` `J14` (blueprint §9.1 · checklist `1.4.4` · `map.stable_hold = YES_HOLD_INDEFINITE`). ⛔ All three places must agree; `T-RC20-03` asserts it.

| Test | Action | Pass condition | Test id |
|---|---|---|---|
| Held key | Hold `ArrowRight` **30 s** at each of the 111 beats | ⛔ **no** protected hold skipped; the deck never runs away | `T-NAV-01` |
| Mash | **20 presses/s for 10 s** at each of the 12 protected beats | each protected hold survives | `T-NAV-01`, `T-NAV-02` |
| Guard | press **50 ms** after arrival, at each of the 12 protected beats | identical state object; no visual delta | `T-NAV-02` |
| Guard expiry | wait **700 ms**, then press, at each of the 12 protected beats | exactly one advance | `T-NAV-03` |
| Reverse stress | **50** rapid `ArrowLeft` from a random beat | 0 orphans · 0 detached shared elements · 0 residual transforms | `T-BAK-05`, `T-BAK-07` |
| Cancel stress | **30** rapid `Esc` from a random beat | every press restores `lastManual` | `T-NAV-06` |
| Interruption | fire `ArrowRight` **mid-flight** on each of the 31 `AUTO` beats | ⛔ exactly **one** queued advance; the sequence lands on its final stable state | `T-NAV-05`, `T-NAV-07` |
| Boundary | `ArrowLeft` at the first beat of each of the 18 scenes | no-op; no animation | `T-NAV-08` |
| Terminal | reach the final beat, wait **60 s** | no advance, no drift | `T-NAV-09` |

### 6.2 The interruption test is the important one

`07` measured that `AUTO` sequences can orphan the deck, and `NO_UI §4`'s `I06` example is the longest sequence in the film. A press at **t + 200 ms** into `I06` must produce: the queue consumes one advance; the sequence **still completes** to its final stable state; `ArrowLeft` still returns the travelling card to the chat. ⛔ A sequence that is cancelled mid-flight and leaves an object airborne is a `FAIL` of `T-BAK-05`.

---

## 7. REDUCED MOTION — `T-RMO-01` … `T-RMO-06`

⛔ **`prefers-reduced-motion: reduce` must be measured, not reasoned about.** Session 1 recorded that the block at `index.css:174-181` exists and **never exercised it** (`G7`). `Q9` remains unverified for exactly that reason.

| Test | Assertion | Why it is load-bearing |
|---|---|---|
| `T-RMO-01` | **0** animations created across all 111 beats; every beat still readable | the blanket-override trap |
| `T-RMO-02` | `0` blanket `!important` duration blocks remain | `08_MOTION_IMPLEMENTATION_ARCHITECTURE.md` §12 |
| `T-RMO-03` | `I06` still shows the task inside Planner | reduced motion must not erase the film's proof |
| `T-RMO-04` | `I13` shows **both** surfaces simultaneously | out-UP / in-BELOW has no time dimension to remove |
| `T-RMO-05` | `A12` and `J01` still hold | the two most important blacks |
| `T-RMO-06` | `J11` still leaves the family unmoved | the closing thesis is spatial, not temporal |

⛔ **A reduced-motion path that is merely *faster* is a `FAIL`.** The requirement is **semantic substitution**: the same meaning reached with no time-based motion. A `hold` must not become a timed fade. ⛔ `T-MSR-08` extends this: under reduced motion **no scene may be promoted to `MEASUREMENT_READY`** and `getBoundingClientRect` must be called **0** times for a flight — see §7.1.

## 7.1 `MEASUREMENT_READY` — `T-MSR-01` … `T-MSR-08` (added Session 8.1)

⛔ **`ARCH-01 §2.2.1` introduced a lifecycle state whose only purpose is to make the shared destination measurable.** It therefore needs its own measured gates. ⛔ **Measured in the real deck in a browser.** ⛔ Source inspection is not evidence here — a `DORMANT`/`MEASUREMENT_READY` bug is invisible in a grep and only shows up as a wrong landing rect.

| Test | Assertion | Test id |
|---|---|---|
| Lifecycle census | at each of the **111** settled states, exactly one scene is `ACTIVE`, **0** are `MEASUREMENT_READY`, and `content-visibility` is `hidden` **only** on `DORMANT` | `T-RC20-02` |
| Mount | 18 scenes permanently mounted through a full forward **and** backward walk; **0** unmount events | `T-RC20-01` |
| ⛔ Dormant not measured | with the destination `DORMANT`, the consume path **refuses** the rect and `THROW`s/blocks; **0** authored-geometry fallbacks, **0** clones, **0** crossfade degradations | `T-MSR-01` |
| Rect valid + stable | after the commit and the layout-ready signal, `width>0` · `height>0` · finite `x`/`y`, and two consecutive frames read **identical** rects | `T-MSR-02` |
| Not painted | during `MEASUREMENT_READY`: `visibility:hidden` · `aria-hidden="true"` · `content-visibility:visible`, and a screenshot diff of the destination region is **empty** | `T-MSR-03` |
| One object | exactly **1** node carries the semantic id at **every** sampled instant of the flight | `T-MSR-04` |
| Landed state | destination `ACTIVE`; source in its contracted state; `shared-layer` **0** children and **0** held `Animation` objects | `T-MSR-05` |
| `ArrowLeft` | destination returns to the correct lifecycle state; source restored; **1** semantic object; **0** residual inline `transform` | `T-MSR-06` |
| `Esc` mid-flight | identical guarantees, object re-attached to its **origin** slot, `MEASUREMENT_READY → DORMANT` released | `T-MSR-07` |
| Reduced motion | destination commits directly at `0 ms`; `shared-layer` never entered; **0** measurement reads; **0** `MEASUREMENT_READY` promotions | `T-MSR-08` |

⛔ **Determinism requirement for the wait:** the layout-ready signal is `ResizeObserver` on the slot, or `requestAnimationFrame` **after** the commit, or WAAPI `startTime` on the common `document.timeline`. ⛔ **`setTimeout` is forbidden** — `07 §17.1` measured zero timers today and this campaign must not reintroduce them. A test that passes only because of a `setTimeout` race is a `FAIL`.

⛔ **Store every transcript under `audit/runtime/session-11/`.** ⛔ A `PASS` claimed from a code read is a `FAIL` of this section.

---

## 8. MEMORY AND LONG-RUN STABILITY

| Test | Assertion | Test id |
|---|---|---|
| Heap across a full run | no unbounded growth attributable to presentation state | `T-PER-09` |
| Listener leak | `0` accumulation of `keydown`/`resize`/`matchMedia` listeners after 20 full walks | `T-PER-09` |
| Animation leak | `0` detached `Animation` objects after 20 full walks | `T-ENG-03`, `T-ENG-10` |
| Detached DOM | `0` nodes in `shared-layer` after a full walk | `T-ENG-10` |

⛔ A live presentation is a **20-minute** artefact. A 2-minute soak is a `FAIL`.

---

## 9. PROJECTOR-SPECIFIC CHECKS — Phase 12

These are not optional extras. ⛔ **A gate that passes on a monitor and fails on the projector is a `FAIL.**

| Check | Why a monitor cannot prove it |
|---|---|
| **Sustained brightness / contrast** at `1920×1080` | Projector black is not `#000000`; the 9 blacks must still read as black, and `--exposure-background: 0.30` must not become invisible |
| **Colour rendering** of `#E7643F` | Projectors shift warm hues; `J07`'s 2 px line and the `A14` reveal depend on it |
| **Readable at 3 m** from the back of an empty room | ⛔ **a monitor measurement is worthless here** |
| **Frame pacing at projector refresh** | Determined by the projector's own processing |
| **Input latency** end to end, clicker to frame | Projector and capture path both add delay; the `600 ms` guard must remain ≥ input latency |

⛔ **Measure input latency.** If total end-to-end latency approaches **600 ms**, the `HOLD` guard must be re-derived, not adjusted by feel. `08_FINAL_RECONSTRUCTION_BLUEPRINT.md` §9.2 chose `600 ms` from the deck's `560 ms` sampling interval — that derivation does **not** survive a high-latency input path. ⛔ Report it; do not silently change the guard.

---

## 10. ACCEPTANCE — this gate's definition of `PASS`

```
PASS requires ALL of:
  [ ] P1  0 dropped frames on all 31 AUTO sequences, 2 hardware profiles
  [ ] P2  0 avoidable layouts across all 110 transitions
  [ ] P3  paint area <= animated rect + 20% across all 110 transitions
  [ ] T-MOT-01  0 mover-budget violations
  [ ] T-PER-04/05  0 infinite iterations, 0 will-change at rest
  [ ] T-PER-06  0 occurrences of transition: all
  [ ] T-PER-07  @property --phone-scale interpolates
  [ ] T-PER-08  120 Hz outcome MEASURED and recorded
  [ ] T-PER-09  no leak over 20 full walks
  [ ] T-NAV-01..09  all PASS
  [ ] T-BAK-01..08  all PASS
  [ ] T-RMO-01..06  all PASS
  [ ] T-MSR-01..08  all PASS          (ARCH-01 §2.2.1 measurement contract)
  [ ] T-RC19-01..05 all PASS          (RC-19: 8 tokens, shared/hero presence, scale ceiling, safe area)
  [ ] T-RC20-01..04 all PASS          (RC-20: mount, lifecycle, HOLD guard, restoration)
  [ ] Section 7.1  all PASS, measured in a real browser with stored transcripts
  [ ] Section 8  all PASS
  [ ] Section 9  all PASS, measured on a REAL projector
  [ ] every transcript stored under audit/runtime/session-11/
```

⛔ **Any single unchecked box ⇒ `FAIL`.** ⛔ **No partial-success language** (`08_IMPLEMENTATION_CHECKLIST.md`, STOP GATE 11).

⛔ **If a threshold cannot be met, `STOP` and report.** ⛔ Do **not** raise the threshold, do **not** lower the quality, and do **not** silently drop a sequence from the profiling set. The film is already decided; changing the contract to make a test pass is the one failure this document exists to prevent.

---

**END OF PERFORMANCE / OPERABILITY QA SPEC**