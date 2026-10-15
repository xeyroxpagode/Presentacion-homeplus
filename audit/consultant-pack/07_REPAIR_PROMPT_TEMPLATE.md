# 07_REPAIR_PROMPT_TEMPLATE

```text
TITLE
HomePlus Presentation — Repair Only

CURRENT GATE:
FAIL

PHASE:
...

SLICE:
...

FAILED TESTS:
...

DO NOT TOUCH:
...

REPAIR ONLY:
...

EXPECTED RESULT:
...

ACCEPTANCE TESTS:
...

EVIDENCE:
Return exact evidence for the failed tests only.

INTEGRITY:
List every changed file. No unrelated cleanup. No adjacent phase work.

STOP CONDITIONS:
Stop if the repair requires changing authority, product truth, dataset, transition family, beat count, dependency set, or unrelated files.

FINAL RESPONSE FORMAT:
STATUS: PASS / FAIL / BLOCKED
Files changed:
Tests run:
Evidence:
Remaining failures:
STOP.
```
