# SESSION 1 RUNTIME BASELINE — ERRATA

**This file does not modify `01_RUNTIME_BASELINE.md`.** That document is preserved verbatim as the Session-1 record. This errata is a **labelled overlay**: where the two disagree on the single point below, **this errata is canonical** for all Sessions 3+.

**Errata issued:** Session 2 (normalization pass), 2026-10-04.
**Canonical index:** `audit/00_AUDIT_NORMALIZATION.md` §N-02.
**Full reasoning:** `audit/02_SCENES_A_B_AUDIT.md` §9.2 and §23 row 22.

---

## ERRATA — SUPERSEDED MEASUREMENT

### E-01 — SUPERSEDED — Session-1 `S05` Planner tab width `82 px → 137 px`

**SUPERSEDED (do not cite as fact):**

> Session 1, `01_RUNTIME_BASELINE.md` **§5.4**, table *"Other in-app 'emphasis' implemented as layout + type mutation"*:
>
> | Transition | Element | `clientW/H` | `font-size` |
> |---|---|---|---|
> | `S05_step01 → S05_step02` | `.planner-tab` "Calendario" | `clientWidth 82 → 137` | unchanged | ← **INVALID — see CANONICAL below** |
> | `S05_step02 → S05_step03` | `.planner-tab` "Planes" | `clientWidth 137 → 82` | unchanged | ← **INVALID — see CANONICAL below** |

**These two rows are invalid.** The 137 px figure does not occur in any stable S05 state, nor at any point during the transition, at rAF resolution.

**CANONICAL (measured in Session 2, use these values):**

| Property | Canonical value |
|---|---|
| Stable tab widths, `S05_step00`…`S05_step03` | **≈ 81 / 82 / 81 px** (one state redistributes fractionally to ≈ 80 / 84 / 80 px) |
| **Maximum tab width observed, anywhere, at any sample** | **84 px** |
| Selection pill | **translates** via `left`: `3px → 84.33px → 165.66px`, `width` constant at `81.33px` |
| Do the tabs resize? | **No.** They do not meaningfully resize. |
| CSS cause | `.planner-tab { flex: 1 }` + `.planner-tab-selection { position: absolute; left: <3 values> }` — `src/presentation/app-screens/PlannerDemoScreen/planner-screen.css:19-23` |

**REASON:**

Session 2 re-measured the transition at requestAnimationFrame resolution rather than at 5 fixed instants:

1. **Stable states** — all four `S05` states probed individually: max tab width **84 px**.
2. **The transition itself** — a `requestAnimationFrame` sampler was armed **before** the keypress and ran for **222 frames** across `S05_step01 → S05_step02`. Only **two** width combinations ever occurred: `81/82/81` for **225 of 226** frames and `80/84/80` for **1** frame. **Maximum = 84 px.**
3. Geometrically impossible at 137 px: the segmented track is `margin: 0 16px` inside a 282 px screen → 250 px, minus 3 px padding each side → 244 px of track for 3 items with `flex: 1 1 0%`. No intermediate value can produce a 137 px tab.

**Classification of the defect:** element **attribution / measurement artefact** of the same class Session 1 itself documented as `D1` and `D2` in `01_RUNTIME_BASELINE.md` §13.1 (truncated DOM-path keys colliding across SVG primitives and across sibling positions during a swap). Session 1's §5.4 numbers were produced by matching elements by structural index; when `.planner-panel-stack`'s absolutely-positioned sibling panels change intrinsic width mid-swap, that index-based match can attach to the wrong node.

**CONSEQUENCE FOR LATER SESSIONS:**

- **Strike** "Planner tabs resize" / "Planner tab grows to 137 px" from every derived finding, tally and remediation list. It is not a real behaviour.
- The **real** and still-valid adjacent facts are unaffected and remain canonical: `.planner-panel-stack` has a genuine **4 px vertical overflow** (client `250×299` vs scroll `250×303`), and `role="tab"` / `role="tabpanel"` / `aria-selected` / `aria-labelledby` are correctly applied (`PlannerTabs.tsx`, `PlannerDemoScreen/index.tsx`).
- The segmented control is **correctly built** and is preserved as a positive (`02_SCENES_A_B_AUDIT.md` §13 `B-P3`). No fix is required.

---

## Items NOT errata'd

Every other measurement in `01_RUNTIME_BASELINE.md` stands as recorded. Specifically confirmed still-true by Session 2's independent re-measurement:

- 85 reachable states forward and backward; terminal state `S18_step03`.
- `.presentation-canvas` `clientWidth × clientHeight` = `1280 × 720`; pure proportional scaling, no responsive reflow, at all four viewports.
- `documentElement.scrollTop/Left = 0` in all states; no scrollbar reachable.
- `.phone-frame` layout `298 × 618`, `.phone-frame-screen` client `282 × 602`, `clientWidth/Height` and `scrollWidth/Height` **identical** across every device-bearing state. **Re-confirmed in Session 2 across all 37 Scene A+B states.**
- Whole-device scales `0.96 / 1.00 / 1.08`; largest non-stage transform scale `1.018`; **no local focus zoom above that anywhere** — cause identified in Session 2 as `--home-stage-focus-scale: 1.02`.
- `S06` enlargement is `LAYOUT SIZE MUTATION`: `250×200 → 1080×520`, labels `15px → 41.04px`, canvas `1280×720 → 1450×789`, phone to `opacity 0.12`.
- 8/8 hold tests stable over 10 s with `runningAnimations = [0,0,0,0,0]`.
- Zero runtime errors attributable to the application.

---

**END OF ERRATA — SESSION 1 RUNTIME BASELINE**

*`01_RUNTIME_BASELINE.md` remains unedited and is retained as the historical Session-1 record. This errata overrides it on exactly one point: E-01.*