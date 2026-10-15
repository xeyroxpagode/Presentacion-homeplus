# Session 8.1 — Cross-document validation report

Validator: `audit/runtime/session-08-hardening/cross-validate.mjs`  ·  Gate: brief §11

## RESULT: **PASS** — 45 passed · 0 failed · 0 informational

| status | check | detail |
|---|---|---|
| PASS | — | 111 beats: 111 |
| PASS | — | 41 columns: 41 |
| PASS | — | 80 MANUAL: 80 |
| PASS | — | 31 AUTO_MICROSEQUENCE: 31 |
| PASS | — | 12 protected HOLD: 12 |
| PASS | — | 4 transition families: 4 |
| PASS | — | 8 timed base motion tokens: 8 |
| PASS | — | no duplicate beat_id: 111 |
| PASS | — | 0 typed-field violations across all 111 rows |
| PASS | — | every acceptance_test resolves: 102 distinct ids referenced, 0 dangling |
| PASS | — | 0 duplicate test_id in the matrix |
| PASS | — | no true orphan tests: the 64 unreferenced ids are whole-film/cross-cutting suites referenced by blueprint §35 and 08_PERFORMANCE_QA_SPEC.md, plus the Session 8.1 global sets |
| PASS | — | canonical root causes 18/18 covered |
| PASS | — | Session-7 motion root causes 2/2 covered (RC-19, RC-20) |
| PASS | — | total tracked root causes 20/20 covered |
| PASS | — | RC-19 carried by 5 test row(s) — not prose-only |
| PASS | — | RC-20 carried by 11 test row(s) — not prose-only |
| PASS | — | all 9 RC-19/RC-20 test ids exist in the matrix |
| PASS | — | all 8 MEASUREMENT_READY test ids (A-H) exist in the matrix |
| PASS | — | all 33 SHARED_ELEMENT beats carry a resolvable id and a distinct source/destination |
| PASS | — | blueprint: three-state lifecycle + measurement contract present |
| PASS | — | arch: three-state lifecycle + measurement contract present |
| PASS | — | checklist: three-state lifecycle + measurement contract present |
| PASS | — | qa: three-state lifecycle + measurement contract present |
| PASS | — | 0 map/matrix timing disagreement in every generated `method` field |
| PASS | — | 0 map modifier/path disagreement; the arc is on I06 only |
| PASS | — | map stable_hold == canonical 12 (A01 A06 A07 A12 B20 B21 F01 H05 I06 J01 J07 J14) |
| PASS | — | blueprint: states the 12 protected beats (table form) and names every one |
| PASS | — | arch: names all 12 protected beats on a single line |
| PASS | — | checklist: names all 12 protected beats on a single line |
| PASS | — | qa: names all 12 protected beats on a single line |
| PASS | — | schema: names all 12 protected beats on a single line |
| PASS | — | 0 spring ambiguity in any Session-8 document or in the map |
| PASS | — | blueprint: carries the mandated no-spring constant verbatim |
| PASS | — | arch: carries the mandated no-spring constant verbatim |
| PASS | — | checklist: carries the mandated no-spring constant verbatim |
| PASS | — | blueprint: no dependency-adding statement |
| PASS | — | arch: no dependency-adding statement |
| PASS | — | checklist: no dependency-adding statement |
| PASS | — | qa: no dependency-adding statement |
| PASS | — | schema: no dependency-adding statement |
| PASS | — | blueprint: stale "18/18 root causes mapped" claim absent |
| PASS | — | qa: stale J11 "budgeted shorter" note absent |
| PASS | — | blueprint: carries the 20/20 provenance wording |
| PASS | — | schema: carries the 20/20 provenance wording |
