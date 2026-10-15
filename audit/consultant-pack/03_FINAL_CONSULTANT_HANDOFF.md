# 03_FINAL_CONSULTANT_HANDOFF

## 1. What HomePlus Presentation Is

HomePlus Presentation is an 18-scene cinematic product presentation. It is not a generic slide deck. The target is a controlled live film: every press lands one idea, every visual object preserves meaning, and every product claim stays inside Product Truth.

The current implementation exists and runs, but Sessions 0-9 found that the presentation often substitutes text, hard cuts, static props, fake navigation, or visual decoration for real product-stage proof. Implementation must now rebuild the deck in phases, with hard gates.

## 2. What Was Wrong

The audit found recurring root causes:

- product absent or inert when narration needs it;
- semantic objects destroyed across scene boundaries;
- fake or unsupported navigation;
- copy/data contradictions against Product Truth;
- motion vocabulary missing or inconsistent;
- hidden-subtree and restoration issues;
- Homi presented too much like current implementation;
- closing argument missing as a real sequence.

The fix is not "more polish". The fix is ordered reconstruction:

Truth -> Content -> Geometry -> State -> Navigation -> Motion -> Cinematic polish.

## 3. Current vs Target

Current:

- 85 states.
- 84 transitions.
- production baseline: 159 files, 2,572,474 bytes.
- no implementation has started after this pack.

Target:

- 111 beats.
- 80 MANUAL.
- 31 AUTO_MICROSEQUENCE.
- 12 protected HOLD.
- 4 transition families.
- 8 timed motion tokens.
- 0 new runtime dependencies.

## 4. Authority Hierarchy

Product:

1. Frozen Product Truth.
2. Integration = current implementation.
3. Figma = visual target only.

Presentation:

1. Hardened Session-8 blueprint.
2. Hardened cinematic map.
3. Motion architecture.
4. Implementation checklist.
5. Acceptance matrix.
6. Performance spec.
7. Asset system.
8. Risk / guardrails.
9. Earlier audits as traceability.

Do not use file dates as authority. Do not treat Figma as current implementation truth.

## 5. Presentation Philosophy

The presentation must feel premium through restraint. Motion exists to protect attention, prove continuity, and make product truth legible. It must not feel like a UI animation showcase.

Stillness is often the design. Black holds are intentional. Shared elements are semantic, not decorative. If a scene is beautiful but wrong, it fails.

## 6. Beat Architecture

The target is 111 beats:

- Scene A: Opening / chaos / fragmentation / reveal.
- Scene B: Home / Planner / Familia / coordination.
- Scene C: Plans + Inventory.
- Scene D: Finance.
- Scene E: Assets + HomeCloud.
- Scene F: Continuity.
- Scene G: Technical explanation.
- Scene H: Barrier.
- Scene I: Homi.
- Scene J: Closing.

Each beat has a `beat_id`, trigger type, motion family, base token, attention job, reduced-motion fallback, and acceptance tests in `08_CINEMATIC_ENHANCEMENT_MAP.csv`.

## 7. Motion Grammar

Four transition families:

- `REAL_NAV`: only where real app navigation exists.
- `EDITORIAL`: conceptual or cinematic transitions.
- `SHARED_ELEMENT`: one semantic object survives context change.
- `DEVICE_TRANSITION`: honest device transition when no semantic object crosses.

Eight timed tokens:

- `micro 200`
- `enter 320`
- `exit 260`
- `exposure 360`
- `spatial 500`
- `reset 520`
- `shared 640`
- `hero 880`

Three curves:

- `E-DEFAULT`
- `E-EXIT`
- `E-HERO`

There is no ninth motion token. There are zero authorized springs and zero authorized SVG/path morphs.

Semantic HERO usage is only:

- A14: HomePlus reveal, `hero 880 / E-HERO`.
- I01: Homi name, `hero 880 / E-HERO`.

A17 and J03 are SVG editorial draw, 800 ms, E-DEFAULT, stroke-dashoffset, not semantic HERO. J14 is closing brand entrance, 420 ms, not semantic HERO.

## 8. Device Grammar

The phone frame is a real component. Device emphasis is achieved by whole-device scale and anchors, never internal layout mutation.

Allowed scale values:

- `1.00`
- `1.08`

`@property --phone-scale` is a Phase 1 hard gate. If it does not interpolate, implementation stops.

No device should be moved by fake slide transitions where a shared semantic object should cross.

## 9. Exposure Grammar

Exposure moves attention without moving layout. Key bands:

- subject: `1.00`
- context: `0.55`
- heading: `0.60`
- background: `0.30`
- decision: `0.20`
- label: `0.40`

The existing S08 selective exposure is a model to preserve.

## 10. Shared-Element System

Shared elements are semantic objects. They are not lookalikes.

Mechanism:

- source remains ACTIVE;
- destination moves DORMANT -> MEASUREMENT_READY;
- destination commits target layout;
- live destination rect is measured;
- the one real node is promoted to `shared-layer`;
- WAAPI FLIP runs;
- node lands into target slot;
- inline transform clears;
- destination becomes ACTIVE;
- source becomes DORMANT only if contracted;
- shared-layer ends empty.

Forbidden:

- clones;
- screenshots;
- snapshot transitions;
- authored coordinates;
- silent crossfade fallback;
- fake taps.

## 11. Lifecycle System

Every scene is one of:

- `DORMANT`: hidden, not measurable.
- `MEASUREMENT_READY`: hidden but measurable, transient only.
- `ACTIVE`: visible.

`MEASUREMENT_READY` exists only so shared destinations can be measured. No stable beat may leave a scene in that state.

## 12. Asset System

Known reusable assets include:

- HomePlus master logo SVG and animatable logo SVG in `C:\Users\thega\Desktop\Figma-app\src\assets\brand\`.
- `family-avatars.svg` as source only; must split into four avatars.
- `grocery-bag.svg`.
- `insurance-document.svg`.
- `information-fragments.svg`.
- `homi-mark.svg`.
- tech logo SVGs.
- app icon SVGs.

P0 missing or required split:

- `family.juli`
- `family.tomi`
- `family.mama`
- `family.papa`
- `obj.heladera`
- `structure.house_outline`

`obj.mochila` has no visual asset, no stage appearance, no semantic id, and no registry entry.

`structure.house` is a persistent scene object from J03 to J11: one SVG/DOM instance, no clone, no reparenting to shared-layer, no shared flight. A17 is a separate editorial motif.

## 13. Homi: Conceptual / Current Distinction

Homi is concept / intended capability, not verified current implementation. The presentation may choreograph it conceptually, but must not imply that the current product has autonomous AI implementation.

I06 is the proof beat: Homi proposal maps to Planner task without confirming the action. There must be no `Confirmado` mutation state.

## 14. Product Truth Prohibitions

Do not show:

- Shopping List as a current capability.
- ETA, distance, travel time, or global location master switch.
- Standalone Horarios surface.
- Fourth Planner tab.
- Fake Assets navigation.
- Asset-owned money/date/maintenance.
- Current AI implementation claim.
- Automatic Shopping-to-Finance pipeline.
- Fake cross-module taps.
- Conversation as the real Feed route.

Use editorial or shared-element treatment when relation is conceptual or target-only.

## 15. Implementation Phases

PHASE 0: Baseline / lock.
PHASE 1: Motion foundation.
PHASE 2: Global stage grammar.
PHASE 3: Opening S01-S03.
PHASE 4: Product core S04-S10.
PHASE 5: Continuity / technical S11-S14.
PHASE 6: Homi S15-S17.
PHASE 7: Closing S18.
PHASE 8: Shared-element integration.
PHASE 9: Whole-film integration.
PHASE 10: Cinematic polish.
PHASE 11: Performance / operability QA.
PHASE 12: Projector / rehearsal QA.
PHASE 13: Final freeze.

Foundation first. No scene redesign before Phase 1 and Phase 2 gates pass.

## 16. Gate Discipline

Each phase has one STOP GATE.

Valid verdicts:

- PASS
- FAIL
- BLOCKED

No partial-success language.

FAIL means do not proceed. BLOCKED means stop and resolve blocker. PASS means consultant may issue the next bounded prompt.

## 17. Major Risks

High-risk implementation traps:

- remounting scenes;
- measuring dormant destinations;
- clone-based shared elements;
- retained fill-forwards animations;
- residual hidden transforms;
- key repeat skip;
- queued advance runaway;
- reduced motion erasing meaning;
- arbitrary device scale;
- fake product navigation;
- product truth drift;
- asset overdesign;
- house treated as shared flight;
- mochila visual asset invented;
- path morph introduced;
- Homi confirmation shown.

Use `10_IMPLEMENTATION_RISK_REGISTER.md` for full review.

## 18. Definition Of Done

Final implementation is done only when:

- all 111 beats exist and are reachable;
- all acceptance matrix tests pass;
- all STOP GATES pass;
- all shared-element identity tests pass;
- reduced motion passes;
- performance and projector QA pass;
- Product Truth prohibitions are preserved;
- no unresolved visual regression remains;
- production integrity is recorded;
- final freeze gate passes.

## 19. First Action

Do not implement Phase 1.

Run Phase 0 only using `06_PHASE0_FIRST_OPENCODE_PROMPT.md`.

The consultant validates STOP GATE 0 before any production changes are allowed.
