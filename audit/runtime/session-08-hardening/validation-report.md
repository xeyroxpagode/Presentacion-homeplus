# Session 8.1 — Cinematic Enhancement Map validation report

Validator: `audit/runtime/session-08-hardening/validate-map.mjs`  ·  Contract: `audit/08_CINEMATIC_MAP_SCHEMA.md`

## RESULT

**PASS** — 111/111 rows schema-valid · 0 typed-field violation(s) · 4 informational

## Counts

| Metric | Value | Required |
|---|---|---|
| total rows | 111 | 111 |
| MANUAL | 80 | 80 |
| AUTO_MICROSEQUENCE | 31 | 31 |
| protected HOLD | 12 | 12 |
| transition families | 4 | 4 |
| base motion tokens | 9 | 9 |
| timed tokens used | 8 | 8 |
| columns | 41 | 41 |
| distinct acceptance_test ids referenced | 102 | resolves |
| tests in matrix | 183 | — |

## Violations

None. ⛔ *"no empty cells"* was **not** accepted as a substitute — every check below ran.

## Informational (non-failing)

Durations with no declared Session-7 total. Recorded, not invented — schema §3.3.

| beat | detail |
|---|---|
| `A17` | duration 800ms differs from token hero (880ms) and no authority declares a total |
| `J03` | duration 800ms differs from token hero (880ms) and no authority declares a total |
| `A17` | token hero with easing E-DEFAULT -- authorised by blueprint §32.3 |
| `J03` | token hero with easing E-DEFAULT -- authorised by blueprint §32.3 |

## Envelope / authority checks that passed

- every `AUTO_MICROSEQUENCE` duration within 0 < v <= 1400: checked
- every beat with a declared Session-7 total equals it: checked
- every architecture §3.2 frozen millisecond value preserved: checked
- every `acceptance_test` id resolves to a matrix `test_id`: checked
- `motion_path` arc permitted on I06 only: checked
- registry id resolution for every shared element: checked
- `stable_hold` equals the canonical 12: checked
- no spring/solver wording outside an explicit negation: checked
