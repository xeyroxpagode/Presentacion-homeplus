# 06_PHASE0_FIRST_OPENCODE_PROMPT

```text
TITLE
HomePlus Presentation — Phase 0 Baseline / Lock

CURRENT PHASE
PHASE 0

CURRENT SLICE
Baseline / lock only.

MISSION
Establish the exact production baseline and runtime evidence required before any implementation. Implement zero product changes. Do not start Phase 1.

PRECONDITIONS
None. Read access to the current presentation package.

CURRENT AUTHORITY
Read before acting:
- audit/00_AUDIT_NORMALIZATION.md
- audit/00_CANONICAL_ISSUE_REGISTRY.md §1 and §7
- audit/00_SESSION7_GATE.md §8.2 and §8.4
- audit/07_MOTION_STAGECRAFT_AUDIT.md §13.2, §13.3, §37, §38
- audit/07_SHARED_ELEMENT_REGISTRY.md
- audit/08_IMPLEMENTATION_CHECKLIST.md PHASE 0
- audit/10_OPENCODE_EXECUTION_GUARDRAILS.md

ALLOWED FILES
Read: all project files.
Write only:
- audit/runtime/session-09/_integrity/manifest-preflight.csv
- audit/runtime/session-09/_integrity/phase0-integrity-report.md
- audit/runtime/session-09/baseline/**
- audit/runtime/session-09/phase0/**

FORBIDDEN FILES
- src/**
- production assets/**
- package.json
- lockfiles
- config files
- script/master/Product Truth files
- any production file outside audit/runtime/session-09/**

EXACT TASKS
1. Confirm current working folder and record it.
2. Confirm whether this folder is a git repository. Expected: no repository exists under HomeplusPresentacion01. Do not initialize git.
3. Read the Phase 0 checklist in audit/08_IMPLEMENTATION_CHECKLIST.md.
4. Produce the production manifest against audit/runtime/session-01/_integrity/manifest-after.csv:
   - same path set;
   - SHA-256 per file;
   - length;
   - lastWriteUtc;
   - added count;
   - removed count;
   - changed SHA-256 count;
   - length changed count;
   - mtime changed count.
5. Store the manifest at audit/runtime/session-09/_integrity/manifest-preflight.csv.
6. Store a human-readable report at audit/runtime/session-09/_integrity/phase0-integrity-report.md.
7. Verify expected baseline:
   - 159 files;
   - 2,572,474 bytes;
   - ADDED 0;
   - REMOVED 0;
   - SHA-256 CHANGED 0.
8. Inspect the project enough to record:
   - package manager and scripts;
   - app entrypoint;
   - presentation source root;
   - current asset roots;
   - whether external HomePlus SVG logo files are present at the documented paths.
9. Capture current runtime baseline of all 85 current states if the app can be run safely without dependency installation. Store screenshots under audit/runtime/session-09/baseline/.
10. Record the current 85-state / 84-transition walk as comparison basis.
11. Record device geometry census:
    - .phone-frame expected 298x618;
    - .phone-frame-screen expected 282x602;
    - all current device states you can reach.
12. Record attention census enough to support Phase 0 evidence.
13. Verify no unexpected production modifications occurred during Phase 0 by re-running the manifest comparison after evidence capture.

FROZEN REQUIREMENTS
- Zero production changes.
- No dependency installation.
- No git init, commit, reset, clean, stash or checkout.
- No Phase 1 work.
- Do not edit src/**.
- Do not fix anything discovered.

FORBIDDEN IMPLEMENTATIONS
- Do not implement motion tokens.
- Do not edit Presentation.tsx.
- Do not alter assets.
- Do not change package scripts.
- Do not repair warnings.
- Do not proceed to Phase 1.

ACCEPTANCE TESTS
- Phase 0 checklist items 0.1 through 0.12 completed or explicitly BLOCKED with evidence.
- Manifest reports 159 files and 2,572,474 bytes.
- ADDED 0 / REMOVED 0 / SHA-256 CHANGED 0.
- Baseline screenshots exist for all 85 current states, or a BLOCKED report explains exactly why runtime capture could not be completed.
- Final post-run manifest still reports zero production changes.

REQUIRED EVIDENCE
Return:
- path to manifest-preflight.csv;
- path to phase0-integrity-report.md;
- screenshot baseline folder path and count;
- runtime command transcript;
- state-walk evidence path;
- device geometry census path;
- attention census path;
- final production integrity summary;
- list of files changed, expected audit/runtime/session-09/** only.

FAILURE FORMAT
If blocked:

# UNEXPECTED FINDING

Phase:
PHASE 0

Slice:
Baseline / lock

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

STOP CONDITION
Stop immediately if any production file changes, if dependency installation would be required, if the manifest does not match, or if runtime capture would require changing production/config/package files.

FINAL RESPONSE FORMAT
STATUS: PASS / FAIL / BLOCKED

Phase:
PHASE 0

Slice:
Baseline / lock

Files changed:
...

Evidence:
...

Manifest:
files:
bytes:
added:
removed:
sha256_changed:
mtime_changed:

Runtime baseline:
screenshots:
states_walked:
device_geometry:
attention_census:

Unexpected findings:
...

STOP.
Do not implement Phase 1.
```
