# Session 8.1 — Final Handoff Hardening

**Scope:** `audit/**` only. **Production writes: NONE.**
**Session 8 was conceptually complete. This pass repaired contract integrity only.**

---

## 1. What this pass did — and did not do

| Objective | Status |
|---|---|
| Repair the machine-readable Cinematic Enhancement Map schema | **DONE** — `audit/08_CINEMATIC_MAP_SCHEMA.md` created; 81 cell changes across 30 beats |
| Resolve the inactive-scene / live-shared-measurement contradiction | **DONE** — `DORMANT` / `MEASUREMENT_READY` / `ACTIVE` lifecycle frozen in all five documents |
| Close RC-19 / RC-20 acceptance traceability | **DONE** — 9 new test rows; total tracked root causes now **20/20** |
| Remove wording that could make the implementer accidentally introduce springs | **DONE** — 0 spring ambiguity across all six documents and the map |

⛔ **Unchanged, as mandated:** Product Truth · scene choreography · beat count (111) · transition families · motion tokens (8) · stack decision · datasets · visual target · implementation phases · cinematic intent · HOLD count (12) · S07 · S18 end card · Homi sequence meaning · shared semantic identities · device-scale grammar · exposure grammar · local-focus grammar · zero-new-dependency decision.

---

## 2. Tooling (audit-only)

```
cd audit/runtime/session-08-hardening

node repair-map.mjs        # round 1: displacement artefacts      -> repair-log.md
node repair-map-2.mjs      # round 2: validator-exposed defects    -> repair-log-2.md
node repair-matrix.mjs     # matrix sync + 17 new rows              -> repair-log-matrix.md
node validate-map.mjs      # 16 fail checks, C1..C16               -> validation-report.md
node cross-validate.mjs    # brief §11 cross-document gate        -> cross-validation-report.md
```

Both validators **exit non-zero on any failure** and are idempotent-safe to re-run for reporting.

---

## 3. Findings and resolutions

### Finding A — the map's typed fields carried non-typed values

**Root cause (evidence, not inference).** `audit/runtime/session-08/_tooling/normalise-map.ps1` generated the CSV with a naive `|` splitter from two `.psv` sources. For **16 rows the `duration_ms` cell was displaced into `stagger_ms`**, and the easing cell received the displaced value. Each displaced value matches Session-7's independently declared total exactly (`G02`→1140, `G03`→1100, `G04`→1400, `G09`→1200, `H04`/`I02`→860, `I09`→500, `I13`→1000).

⛔ **No cell was mechanically shifted.** Every value was re-derived from the precedence order in `08_CINEMATIC_MAP_SCHEMA.md` §0.1.

| Violation class | Rows | Resolution |
|---|---|---|
| `duration_ms` non-numeric | 16 | re-derived from `07_TRIGGER_BEAT_MAP.csv:auto_total_duration`, the `07 §15.3` token sums, the 8-token table, or architecture §3.2 |
| `duration_ms` stale (numeric but wrong) | `J11` 120 → **1400** | `07_TRIGGER_BEAT_MAP.csv:109` |
| `spring_or_easing` not in enum | `J11` `1400` | re-bound to the 3-curve canon |
| `spring_or_easing` displaced to `NONE` | 15 | re-bound to the token's canonical curve |
| `stagger_ms` held the displaced duration | 16 | re-derived from each beat's authority-stated stagger, or `0` where serial |
| `micro_anticipation` held an easing id | `J11` | stillness sentinel |
| `overlap_ms` held `NONE` | `J11` | `0` |
| `motion_path` held `0` | `F01` | `NONE` |
| `motion_path` non-vocabulary | `I06` | normalised to `ARC-QUADRATIC` |
| `local_focus_scale` lowercase / id-list | `J05` `J07` `J09` `J10` `J11` | `NONE` (a scale field may never hold semantic ids) |
| `shared_element_id` prose | `H07` `J05` `J07` `J09` `J10` `J11` | registry ids, verbatim from Session-7 |
| `shared_element_id` empty on `SHARED_ELEMENT` | `F05` `G09` `J03` | documented non-registry object class (§4.2) |
| `stable_hold` ≠ canonical 12 | 7 rows | aligned to blueprint §9.1 / architecture §4.4 / checklist `1.4.4` |
| matrix `method` embedded the corrupt duration | 17 | re-synchronised to the repaired map |
| matrix `method` half-written `"; trigger "` | 79 | trigger completed from the map |

**`G04` / `I13` investigated as instructed.** Their modifiers said `motion path` and `path tracing` while `motion_path = NONE`. ⛔ **The premise that they were missing a path value is not supported by authority:** `07` contains **zero** occurrences of `motion path`, `motion_path`, `path tracing`, `quadratic`, `trajectory` or `trace` as geometric vocabulary, and all six `arc` hits are substrings of *architecture* and the *narrative* arc. `G04` is a straight occluded pass-through (`07:1081`, `PLANE-BEHIND-DEVICE`); `I13` is a straight vertical slot translate (`07:1220`, `07 §38.4` translate-only). `I06` holds the **only** arc in the film. This was a **terminology** defect, repaired as such — modifiers reworded to name the linear mechanism, `motion_path` left `NONE`.

**`J14` duration is 420, not 880.** `07_TRIGGER_BEAT_MAP.csv:112` says `hero 880ms`, but architecture §3.2 resolves it explicitly — *"`S18 brand entrance` · `420 ms` · `J14` keeps `420 ms`"* — and blueprint §37.2 forbids re-timing the end card. The row's own `hard_limit` also states `420 / 420 / 90 ms` preserved. Recorded as an authorised deviation.

---

### Finding B — inactive scenes could not supply live shared geometry

**The contradiction, located.** `ARCH-01` prescribed `content-visibility:hidden` on inactive scenes (blueprint `:79`, checklist `1.3.3`), and architecture §11 relied on it (`:505`). But §6.4 step 2 requires a **live** `targetSlotEl.getBoundingClientRect()` of the destination slot *before* the object flies, and §6.3 requires the destination to "provide a **slot element** … that exists while the object is airborne". ⛔ **A subtree under `content-visibility:hidden` applies size containment and must not be assumed to yield usable live destination geometry.** Permanent mount was never sufficient on its own.

**Resolution — three lifecycle states, frozen:**

| | `DORMANT` | `MEASUREMENT_READY` | `ACTIVE` |
|---|---|---|---|
| `visibility` | `hidden` | `hidden` | `visible` |
| `pointer-events` | `none` | `none` | per policy |
| `aria-hidden` | `true` | `true` | `false` |
| `content-visibility` | `hidden` | **`visible`** | `visible` |
| measurable for shared geometry | ⛔ **no** | ✅ **yes** | n/a |

Legal transitions only: `DORMANT → MEASUREMENT_READY`, `MEASUREMENT_READY → ACTIVE`, `MEASUREMENT_READY → DORMANT`, `ACTIVE → DORMANT`.

**The 13-step prepare/measure contract** is now specified as blueprint §10.3.1 and implemented as architecture §6.4 steps `0a`–`0f`, with `T-MSR-01…08` as its acceptance coverage. ⛔ Unavailable or degenerate geometry ⇒ **`THROW` / `BLOCK`**; never guess coordinates, never use authored geometry, never clone, never silently crossfade. ⛔ The layout-ready wait is `ResizeObserver` / post-commit `rAF` / WAAPI `startTime` — **never `setTimeout`**.

Written consistently into: blueprint (`§2.2.1`, `§5.3`, `§10.3.1`, `§35.4`), architecture (`§4.2.1`, `§6.3`, `§6.4`, `§7.6`, `§11`), checklist (`1.3.3`–`1.3.3b`, `1.6.3`–`1.6.9`), acceptance matrix (17 new rows), QA spec (`§7`, `§7.1`, `§10`).

---

### Finding C — RC-19 / RC-20 were untracked

⛔ **Evidence:** the matrix `root_cause_ids` column contained only `RC-01`…`RC-18`. `RC-19` and `RC-20` were defined in blueprint §15 but carried by **zero** test rows, while blueprint §35.3 claimed "every one of the 18 root causes maps to at least one acceptance test" — a count that understated the corpus.

**Resolution — provenance separated, count corrected:**

```
CANONICAL ROOT CAUSES:        18 / 18 covered     (RC-01 … RC-18)
SESSION-7 MOTION ROOT CAUSES:  2 /  2 covered     (RC-19, RC-20)
TOTAL TRACKED ROOT CAUSES:    20 / 20 covered
```

| Root cause | Test ids | Coverage |
|---|---|---|
| `RC-19` | `T-RC19-01…05` | 8-token system closed at 8 · `shared` presence (640, default curve) · `hero` presence (880, hero curve) · device-scale ceiling {1.00, 1.08} with throw on a third · 23 px safe-area breach declared (`N-41`, `M-09`) |
| `RC-20` | `T-RC20-01…04` | mount contract (18 mounted, 0 unmounts) · scene lifecycle (no stable beat left `MEASUREMENT_READY`) · `HOLD` protection (600 ms guard on exactly the 12) · restoration (0 residual inline transform) |

⛔ **No test exists only in prose.** All 9 ids are real rows in `08_ACCEPTANCE_TEST_MATRIX.csv`.

---

### Finding D — spring ambiguity

⛔ **One real defect was found in the map itself:** `I06.settle_behavior` read *"critically damped micro-settle at 520 to 640…"* — the precise phrase most likely to trigger a spring solver. Replaced with the mandated constant. **No timing value changed.**

Mandated wording, reproduced exactly:

```
CRITICALLY-DAMPED FEEL VIA E-DEFAULT TAIL; NO SPRING SOLVER; NO OVERSHOOT.
```

Applied to blueprint `ARCH-04`, `§6` stack table, `§28.2` frame `700–760`, `§37.1 #4`, `§37.2`; architecture `§1 #8`, `§2`, `§8` (heading and rationale), `§13`; checklist `6.6`, `10.5`. Now present verbatim in blueprint, architecture and checklist, and asserted by `cross-validate.mjs`.

⛔ `ARCH-04` is unchanged and still binding. ⛔ The word `spring` survives only inside prohibitions and in the column name `spring_or_easing`, which selects a **curve**. ⛔ The desired perception is unchanged: organic deceleration · no bounce · no overshoot · deterministic settle.

---

## 4. Findings recorded, deliberately NOT actioned

These are **outside the hardening mandate** and changing them would be redesign or would invent authority. They are surfaced for the owner.

| # | Finding | Evidence | Why not actioned |
|---|---|---|---|
| 1 | `hero` token appears on **5** rows (`A14` `A17` `I01` `J03` `J14`); Session 7 authorises it **exactly twice** (`A14`, `I01`) | blueprint `:1318` already documents this | brief §12 forbids changing motion tokens. Declared as an authorised easing/duration exception in schema §2.4. |
| 2 | `A17` / `J03` `duration_ms = 800`, a value with **no** declared authority and not a token duration | map | recorded as `UNCONSTRAINED-ENVELOPE`, not invented |
| 3 | 3 shared ids (`tomi.training_event`, `homi.proposal`, `planner.task`) are mandated by blueprint prose but are **not** registry entries, contradicting blueprint `:1224` *"one of the 14 registry IDs above"* | blueprint `:849`, `:493` | resolving means adding to the registry or re-planning crossing 11 — both redesign. Admitted as a **declared exception** (schema §4) and flagged ⛔ **OPEN**. |
| 4 | `F05` `G09` `J03` are `SHARED_ELEMENT` but their object is not a registry datum (the device / the whole stack / the house outline) | `07_TRIGGER_BEAT_MAP.csv` `shared_element` column | brief §12 forbids changing transition families. Documented as a non-registry object class (schema §4.2). |
| 5 | Session 7's own prose disagrees with its enumerations on the count of protected black holds (7 vs 8 vs 6) | `07_MOTION_STAGECRAFT_AUDIT.md:751`, `:753-762`, `:1523`, `:1588` | pre-existing Session-7 inconsistency. Session 8's **12** protected beats are a different, correctly-governed set and were not touched. |
| 6 | `J11` `ease-in-out` / `ease-in` named at `07:1276` are outside the 3-curve canon | `07_MOTION_STAGECRAFT_AUDIT.md:1276` | re-mapping them would change timing semantics. `J11` binds to `E-DEFAULT` per its `spatial` token; the 300/550/550 stage durations are preserved. |

---

## 5. Verification

```
node audit/runtime/session-08-hardening/validate-map.mjs    ->  111/111 SCHEMA PASS · 0 typed-field violations · exit 0
node audit/runtime/session-08-hardening/cross-validate.mjs  ->  45 PASSED · 0 FAILED · 0 INFO · exit 0
```

⛔ **"no empty cells" was never accepted as a substitute.** 16 distinct fail conditions run over all 111 rows, and 45 cross-document assertions run over the map, the matrix and six documents.