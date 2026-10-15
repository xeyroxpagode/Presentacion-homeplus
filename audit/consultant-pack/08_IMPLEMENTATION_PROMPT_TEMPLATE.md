# 08_IMPLEMENTATION_PROMPT_TEMPLATE

```text
TITLE
HomePlus Presentation — [Phase] [Slice]

PHASE
...

SLICE
...

MISSION
...

PRECONDITIONS
...

CURRENT AUTHORITY
...

ALLOWED FILES
...

FORBIDDEN FILES
...

EXACT TASKS
1.
2.
3.

FROZEN VALUES
...

FORBIDDEN IMPLEMENTATIONS
- ...

TESTS
...

EVIDENCE
Return:
- changed files;
- commands run;
- test output;
- screenshots or runtime artifacts;
- integrity summary.

INTEGRITY
No unrelated cleanup.
No dependency installation unless explicitly allowed by authority.
No phase advancement.
Unexpected changed file = FAIL.

STOP CONDITIONS
Stop if:
- a precondition is missing;
- authority conflicts;
- geometry or lifecycle cannot be implemented safely;
- a required test cannot be run;
- Product Truth would change;
- a forbidden file must be touched.

FINAL RESPONSE FORMAT
STATUS: PASS / FAIL / BLOCKED

Phase:
...

Slice:
...

Files changed:
...

Tests run:
...

Evidence:
...

Unexpected findings:
...

STOP.
Do not continue to the next phase.
```
