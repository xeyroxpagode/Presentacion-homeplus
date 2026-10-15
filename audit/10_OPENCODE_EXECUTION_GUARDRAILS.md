# 10_OPENCODE_EXECUTION_GUARDRAILS

This file governs every future OpenCode implementation prompt for the HomePlus presentation.

OpenCode is an EXECUTOR. It receives one bounded prompt, performs the exact slice, returns evidence, and stops.

## 1. Non-Negotiable Rule

FAIL CLOSED, NOT CREATIVE.

If any frozen mechanism cannot be implemented safely, OpenCode must stop and report the blocker. It must not approximate, redesign, simplify, fake visually, invent product capability, create duplicate semantic objects, change copy, change datasets, install dependencies, change transition family, change beat count, perform unrelated cleanup, or continue to the next phase.

## 2. Authority Order

Product:
1. Frozen Product Truth.
2. Integration = current implementation.
3. Figma = visual target only.

Presentation implementation:
1. Hardened Session-8 blueprint.
2. Hardened cinematic map.
3. Motion architecture.
4. Implementation checklist.
5. Acceptance matrix.
6. Performance spec.
7. Asset system.
8. Risk register and these guardrails.
9. Previous audits only as evidence or traceability.

If old audit wording conflicts with a later normalized or hardened decision, use the normalized or hardened decision. Do not use file modification date as authority.

## 3. What OpenCode Does Not Do

OpenCode does not:

- choose what phase comes next;
- reinterpret the blueprint;
- redesign;
- reprioritize;
- continue autonomously into later phases;
- make taste decisions;
- resolve OPEN items;
- install libraries;
- refactor unrelated systems;
- opportunistically clean code;
- change authority;
- change Product Truth;
- change datasets;
- change motion grammar;
- change beat count;
- rewrite adjacent scenes;
- treat Figma as current implementation truth;
- treat editorial presentation transitions as real app navigation.

## 4. Required Prompt Sections

Every future implementation prompt must contain all of:

1. CURRENT PHASE
2. CURRENT SLICE
3. PRECONDITIONS
4. ALLOWED FILES
5. FORBIDDEN FILES
6. EXACT TASKS
7. FROZEN REQUIREMENTS
8. FORBIDDEN IMPLEMENTATIONS
9. ACCEPTANCE TESTS
10. REQUIRED EVIDENCE
11. FAILURE FORMAT
12. STOP CONDITION

If any section is missing, OpenCode must stop before editing.

## 5. Default Forbidden Files

Unless the current prompt explicitly narrows or expands allowed files for that phase, the following remain forbidden:

- files outside the stated allowed list;
- package manifests and lockfiles;
- configuration files unrelated to the slice;
- unrelated scenes;
- Product Truth, master, or script documents;
- audit authority files except evidence outputs requested for the slice.

## 6. Unexpected Finding Contract

If OpenCode finds something material outside the prompt, it must return exactly:

```text
# UNEXPECTED FINDING

Phase:
...

Slice:
...

Expected:
...

Found:
...

Evidence:
...

Impact:
...

Can the requested work continue safely?
YES / NO

Smallest options:
1.
2.
3.

Recommendation:
...

STOP.
```

OpenCode must not resolve the unexpected finding itself.

## 7. Failure Format

If a prompt cannot be completed exactly:

```text
STATUS: BLOCKED

Phase:
...

Slice:
...

Blocked requirement:
...

Evidence:
...

Files changed before blocker:
...

Safe rollback needed:
YES / NO

Recommended smallest next prompt:
...

STOP.
```

If tests fail after edits:

```text
STATUS: FAIL

Phase:
...

Slice:
...

Failed tests:
...

Evidence:
...

Files changed:
...

Do not proceed.

STOP.
```

## 8. Evidence Rules

A claim is not evidence.

Valid evidence includes exact file paths, command transcripts, test output, screenshot paths, manifest paths, measured geometry, measured frame data, and before/after integrity data.

Unsupported phrases such as "all tests pass", "looks correct", "implemented as requested", or "no issues found" must be treated as insufficient unless backed by concrete evidence.

## 9. Phase Discipline

Default granularity is one phase or smaller.

Dangerous work must be split into sub-slices. Phase 1 may be split into tokens, mount contract, navigation, shared layer, lifecycle, reduced motion, and foundation QA. Phase 3 may be split into A01-A07, A08-A14, A15-A17, each with its own gate.

OpenCode must never produce or execute:

- "Implement Phases 1-5";
- "Finish the presentation";
- "Keep improving";
- "Polish everything";
- "Fix whatever looks wrong".

## 10. Product Truth Locks

OpenCode must preserve:

- no Shopping List as a current capability;
- no ETA, distance, travel time, or global location switch;
- Feed semantics only editorially, never Conversation as a real Feed route;
- one Home product with role projection, never "Home Juli" as a separate module;
- no standalone Horarios surface or fourth Planner tab;
- Assets as supported target plus implementation gap;
- no fake cross-module taps;
- no Asset-owned money, date, or maintenance field;
- Homi as conceptual/current implementation gap;
- no present-tense AI implementation claim;
- no automatic Shopping-to-Finance pipeline;
- `Supermercado $48.720` as ledger fact, not visible purchase result.

## 11. Motion Locks

OpenCode must preserve:

- 111 target beats;
- 80 `MANUAL`;
- 31 `AUTO_MICROSEQUENCE`;
- 12 protected `HOLD`;
- 4 transition families;
- 8 timed motion tokens;
- 3 easing curves;
- 0 runtime dependencies;
- WAAPI as the only choreographer;
- no springs, no bounce, no overshoot;
- no SVG/path morph;
- no clones for shared-element flight;
- real DOM reparenting for shared elements;
- `DORMANT / MEASUREMENT_READY / ACTIVE` lifecycle;
- reduced motion as semantic substitution, not a blanket hard cut.

## 12. Session-9 Closure Locks

- CSV schema is 19 fields.
- `obj.mochila` has no visual asset, no stage appearance, no semantic id, and no registry entry.
- `structure.house` is `PERSISTENT_SCENE_OBJECT` from J03 to J11, not a shared flight.
- A17 house is `EDITORIAL_ONLY`.
- True semantic HERO usage is A14 and I01 only.
- A17 and J03 are SVG editorial draw, 800 ms, E-DEFAULT, not semantic HERO.
- J14 is closing brand entrance, 420 ms, not semantic HERO.
- There are zero authorized SVG/path morphs.

## 13. Integrity Rule

Every implementation response must include:

- files changed;
- files intentionally untouched;
- tests run;
- evidence paths;
- any deviations;
- next safe action, or STOP.

Unexpected changed file equals FAIL until explained and accepted by the consultant.

## 14. Stop Rule

At the end of every OpenCode prompt:

```text
STOP.
Return evidence.
Do not continue to the next phase.
```

**END OF OPENCODE EXECUTION GUARDRAILS**
