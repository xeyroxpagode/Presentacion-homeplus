# SESSION 1 — RUNTIME EVIDENCE BASELINE

> ### ⚠ ERRATA EXISTS — READ `audit/01_RUNTIME_BASELINE_ERRATA.md`
> Added by Session 2. Everything below the body of this document is **unedited** and is retained verbatim as the Session-1 historical record, **including the raw §5.4 data rows**.
> **One measurement is superseded:** `S05` Planner tab `clientWidth 82 → 137 px`. Canonical value is **max 84 px**; the selection pill translates and the tabs do not resize. **Do not cite the 137 px figure.**
> Three places in this file still *show* that number, all of them covered by this banner:
> - **§5.4** — the two raw table rows (historical evidence, deliberately preserved; not to be re-read as fact).
> - **§13.2 `G3`** — carries an inline `SUPERSEDED` label.
> - **§17** item 2 — carries an inline strikethrough + `SUPERSEDED` label.
> See `01_RUNTIME_BASELINE_ERRATA.md` §E-01 and `00_AUDIT_NORMALIZATION.md` §N-02. Every other measurement in this document stands as recorded.

**Mode:** READ-ONLY. No production file was created, modified, renamed or deleted.
**Date of capture:** 2026-10-04 (local machine time).
**Runtime under audit:** `C:\Users\thega\Desktop\HomeplusPresentacion01\HomePlus_Presentacion_FINAL` (see §1.1 for the path discrepancy that must be resolved by the user).
**Verdict policy:** this document contains **no quality verdicts**. It records what happens at runtime and nothing else.

---

## 0. HOW TO READ THIS DOCUMENT

Every number below is a measurement or a direct observation from a headless Chromium session driven by Node + `playwright-core` 1.63.0 (already present in `C:\Users\thega\Desktop\Figma-app\node_modules\.pnpm`). No package was installed, `package.json` was not touched, Python was not used.

Three labels are used throughout and are never mixed:

| Label | Meaning |
|---|---|
| **CONFIRMED** | Directly measured or directly read from the running app. |
| **INFERENCE** | A conclusion drawn from those measurements. Not itself a measurement. |
| **DECISION** | Something the user must decide. Session 1 does not decide it. |

Classification vocabulary required by the brief (`WHOLE DEVICE SCALE`, `LOCAL VISUAL SCALE`, `LAYOUT SIZE MUTATION`, `CAMERA/CROP`, `UNKNOWN`) is used in §5 and §16 with measured numbers attached. **No aesthetic judgement is attached to any classification.**

---

## 1. RUNTIME PREFLIGHT

### 1.1 Path discrepancy — MUST BE RESOLVED BY THE USER

**CONFIRMED.** The brief states that `C:\Users\thega\Desktop\HomeplusPresentacion01` "directly contains the current presentation". It does not.

| | |
|---|---|
| Path asserted as current in the brief | `C:\Users\thega\Desktop\HomeplusPresentacion01` |
| Path asserted as obsolete | `…\HomeplusPresentacion01\HomePlus_Presentacion_FINAL\HomePlus_Presentacion_FINAL` (double nesting) |
| **Path actually observed** | `C:\Users\thega\Desktop\HomeplusPresentacion01\HomePlus_Presentacion_FINAL` (**single** nesting level) |

`HomeplusPresentacion01` contains exactly **one** child directory (`HomePlus_Presentacion_FINAL`) and no `package.json`, no `src/`, no `index.html`. The double-nested obsolete path does not exist. The package therefore sits **one level below** the asserted path, not at it.

**Why the audit was nevertheless allowed to proceed (INFERENCE):** the expected *family* matches at 100% and there is exactly one candidate package, so identification is unambiguous. Had any family marker failed, work would have stopped.

### 1.2 Expected-family verification (CONFIRMED, read from source)

| Expected marker | Observed | Source of truth |
|---|---|---|
| React | `react ^19.0.0`, `react-dom ^19.0.0` | `package.json` |
| Vite | `vite ^8.0.5` (running **8.3.2**), `@vitejs/plugin-react ^6.0.0` | `package.json`, dev server banner |
| TypeScript | `typescript ^5.7.0`, `tsconfig.json` present | `package.json` |
| S01–S18 | 18 slide definitions, `S01Chaos` … `S18Closing` | `src/presentation/presentationConfig.ts` |
| 85 presentation steps | sum of `stepCount` = 11+7+1+6+4+6+2+5+5+5+3+3+4+5+5+5+4+4 = **85** | `src/presentation/presentationConfig.ts` |
| 1280×720 logical canvas | `canvas: { width: 1280, height: 720, safeArea: 48 }` → CSS vars `--canvas-width/--canvas-height` | `src/presentation/design-system/tokens.ts` |
| Assistant name | `assistantName: 'HOMI'`; slide names `S15 HOMI Action`, `S16 HOMI Context` | `presentationConfig.ts` |

**CONFIRMED:** slide names as registered at runtime (from `aria-label` on `.presentation-scene`):

`S01 Chaos` · `S02 Fragmented Info` · `S03 HomePlus` · `S04 Home` · `S05 Planner` · `S06 Family` · `S07 Coordinar No Es Vigilar` · `S08 Plans Inventory` · `S09 Finance` · `S10 Assets HomeCloud` · `S11 Continuity` · `S12 Frontend Backend` · `S13 Stack` · `S14 Barrier` · `S15 HOMI Action` · `S16 HOMI Context` · `S17 Human Control` · `S18 Closing`

**CONFIRMED:** the historical package `C:\Users\thega\Desktop\Presentacion_HomePlus_Final` was **not** opened, served, audited or referenced. No `A00–J23`, `sceneRegistry`, `PresentationRoot`, `UISlot` or `PresentationPhone` identifier was required or looked for.

### 1.3 Package manager — declared vs. actually installed (CONFIRMED)

| Signal | Value |
|---|---|
| `.mise.toml` | `node = "22"`, `"npm:pnpm" = "10.34.3"` |
| `.figma/make/dev.json` | `installOn: ["package.json", "pnpm-lock.yaml"]` |
| `ABRIR_PRESENTACION.bat` | `npx --yes pnpm@10.34.3 install` / `… run dev` |
| Lockfiles present | `pnpm-lock.yaml` **and** `package-lock.json` (both) |
| `node_modules/.modules.yaml` (pnpm marker) | **absent** |
| `node_modules/.package-lock.json` (npm marker) | **present** |
| **Resolved** | the **declared** manager is **pnpm 10.34.3**; the **installed** tree was produced by **npm**. |

No install was executed in this session. The existing `node_modules` was used as-is.

### 1.4 Runtime command and port

**Port configuration as declared in `vite.config.ts` (CONFIRMED, read from source):**

```
server: { host: process.env.FIGMA_DEV_SERVER_HOST || '0.0.0.0',
          port: parseInt(process.env.PORT || '8443'),
          strictPort: true }
```

So the *declared* port is **8443 with `strictPort: true`** — matching the brief. **But 8443 was not usable in this environment:**

| Probe | Result |
|---|---|
| `Invoke-WebRequest http://127.0.0.1:8443/` before start | connection refused |
| `netstat -ano` LISTEN on 8443 (first sample) | `0.0.0.0:8443 LISTENING <pid>` — PID not resolvable from this session (`tasklist /FI "PID eq …"` → no matching task) |
| Node `net.createServer().listen(8443,'0.0.0.0')` | `EADDRINUSE` |
| Node `net.createServer().listen(8444,'0.0.0.0')` / `8445` | `OK` |
| First `npm run dev` attempt | failed: `Error: Port 8443 is already in use` |

**INFERENCE:** port 8443 is held by a listener outside this process namespace (consistent with the Figma Make preview host occupying `0.0.0.0:8443` while refusing connections from here). It was **not** killed, and **no unrelated process was touched**.

**DECISION REQUIRED (user):** port ownership for 8443. Until it is resolved, every capture in this document was made on the config's own `PORT` override:

```
set PORT=8444 && npm run dev      →  VITE v8.3.2 ready · Local: http://localhost:8444/
```

Captured URL: `http://127.0.0.1:8444/`. Because the port only feeds `server.port` and the scale logic is `min(width/1280, height/720)` on the viewport, the port does not influence any geometric measurement in this document. It is recorded as a preflight deviation, not a finding.

Also recorded (CONFIRMED, non-blocking): Vite logs a `configLoader: 'native'` future-compat warning about `__dirname` (`vite.config.ts:30`) and the un-attributed JSON import of `./.figma/make/site.json` (`vite.config.ts:6`).

### 1.5 Logical canvas and scaling implementation (CONFIRMED)

- `.presentation-canvas` is `width: var(--canvas-width); height: var(--canvas-height)` = 1280×720, `overflow: hidden`, `transform-origin: center`, `position: absolute; top/left: 50%`.
- `.presentation-viewport` is `position: fixed; inset: 0; overflow: hidden`.
- `html, body, #root` are `100%/100%`, `overflow: hidden`, `overscroll-behavior: none`.
- `PresentationFrame` computes `scale = Math.min(width / 1280, height / 720)` from a `ResizeObserver` and applies `translate(-50%, -50%) scale(s)`.
- Device shell: `.phone-frame` = `300 × 620`, `padding 8px` bezel, `border-radius 46px`, `transform: scale(var(--phone-scale))`, `transform-origin: top left`; `.phone-frame-screen` is the clipped viewport.

### 1.6 Skills actually used

The skill tool available in this session exposes only `customize-opencode`. The three required skills were therefore read directly from the presentation's own `.agents/skills/` copies:

- `.agents/skills/testing-webapps/SKILL.md` — read and applied (reconnaissance-then-action, `networkidle` first, wait-for-`getAnimations()`-settled rather than bare sleeps, console/`pageerror`/`requestfailed` capture, deterministic viewport per run, fresh context per run).
- `.agents/skills/motion-design/SKILL.md` — read and applied as the measurement vocabulary for §4 (property selection, duration/easing tables, three motion layers).
- `.agents/skills/verifying-before-completion/SKILL.md` — read and applied in §16.
- `.agents/skills/systematic-debugging/` — **not** needed for its primary purpose, but one of its practices was applied: a probe defect was found (§13, D1) and fixed before the affected measurements were accepted.

**Override recorded (DECISION):** `testing-webapps` mandates *Python* Playwright and `playwright install chromium`. The brief mandates *Node* `playwright-core` with the already-present Chromium cache and forbids installing Python or Playwright. The brief wins; the skill's *method* was followed, its *runtime* was not.

### 1.7 Audit tooling location

All tooling is under `audit/runtime/session-01/_tooling/` (audit tooling, explicitly permitted):

| File | Purpose |
|---|---|
| `pw.mjs` | resolves `playwright-core` out of `Figma-app`'s pnpm store; no install |
| `probe.mjs` | the in-page measurement probe (self-contained function) |
| `walk.mjs` | forward walk, 85 stable states + screenshots |
| `walk-back.mjs` | advance to end, then walk backward with `ArrowLeft` |
| `motion.mjs` | per-transition frames at 0 / 100 / 200 / 320 / 500 ms |
| `hold.mjs` | 10-second hold tests at 8 states |
| `viewport.mjs` | 1280×720, 1920×1080, 1600×900, 1440×900 full walks |
| `analyze*.mjs`, `tables.mjs` | post-processing into the tables in §3, §5, §6, §8, §9 |

### 1.8 Other paths

| Item | Status |
|---|---|
| `C:\Users\thega\Desktop\Figma-app` | **not** modified, **not** served, **not** runtime-harvested. Only read as the location of an already-installed `playwright-core`. Its own dev server on 8443 had already crashed before this session (its `devserver-8443.err.log` ends with `Error: UNKNOWN … scandir '…\.claude\skills\mobile-app-design-standards'` and `[ELIFECYCLE] Command failed with exit code 1`). |
| `C:\Users\thega\Desktop\homeplus-worktrees\Family-Hub-Own-integration` | **not** launched, **not** read. Session 1 did not need it: no ambiguous product claim was found on stage that required Product Truth resolution (see §13, G4). |
| `HomeplusPresentacion01\HomePlus_Presentacion_FINAL\audit-input\USER_WALKTHROUGH_RAW.txt` | **present** (17 414 bytes). `audit-input` moved with the project, as the brief anticipated. Not recreated. |
| `audit\00_HUMAN_HYPOTHESES.md` | present (65 541 bytes), 91 unique `HW-*` ids. |
| `HOMEPLUS_PRESENTATION_MASTER_FREEZE_V1.0.md` | found at `C:\Users\thega\Downloads\HOMEPLUS_PRESENTATION_MASTER_FREEZE_V1.0.md`. |
| `HOMEPLUS_PRESENTATION_NO_UI_MASTER_FREEZE_V2.0.md` | found at `C:\Users\thega\Downloads\HOMEPLUS_PRESENTATION_NO_UI_MASTER_FREEZE_V2.0.md`. |
| `Guion Compartido (2).md` | present, 497 lines. |

---

## 2. REACHABLE STATE COUNT

| | |
|---|---|
| **Expected** | 85 |
| **Actual, forward traversal** | **85** |
| **Actual, backward traversal** | **85** |
| Terminal state | `S18_step03` (`S18`, stepIndex 3, `stepCount: 4`) |
| Forward traversal stopped because | a further `ArrowRight` did not change `data-slide-index` / `data-step-index` (guard 200 presses, never reached) |
| Backward traversal stopped because | a further `ArrowLeft` did not change state at `S01_step00` |
| Unreachable / skipped states | none |
| States per slide | S01 11 · S02 7 · S03 1 · S04 6 · S05 4 · S06 6 · S07 2 · S08 5 · S09 5 · S10 5 · S11 3 · S12 3 · S13 4 · S14 5 · S15 5 · S16 5 · S17 4 · S18 4 |

Navigation mechanism used: real `KeyboardEvent` dispatch of `ArrowRight` / `ArrowLeft` on the document, which is what `Presentation.tsx` listens to. `Space` was **not** used for the walk; `navigation.ts` maps `Space`/`code === 'Space'`/`' '` to `NEXT` as well.

**CONFIRMED:** `document.documentElement.scrollTop/scrollLeft` stayed `0` in all 85 states; there is no browser-level scrolling mechanism, only keyboard state advance.

Screenshots: `audit/runtime/session-01/states/S01_step00.png` … `S18_step03.png` (85 files) and the mirrored backward set in `states-back/` (85 files). Naming is exactly `Sxx_stepNN.png`.

---

## 3. COMPLETE STATE EVIDENCE INDEX

All 85 rows. `Phone visual` is `getBoundingClientRect()` (post-transform, on-canvas pixels at canvas scale 1.0). `Phone layout` is `offsetWidth × offsetHeight` (pre-transform layout). `DOM / hidden` = total elements under `#root` / of those, elements mounted with a non-zero box but not visible (`opacity: 0`, `visibility: hidden` or `display: none` ancestry). `Clipped` = visible elements whose box escapes the 1280×720 canvas box.

| # | Slide | Step | Screenshot | Phone visual | Phone layout | Phone transform | App surface / screen client | Internal overflow inside app | DOM / hidden | Clipped | Max scale | Visible text (first 6) |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 0 | S01 Chaos | 0 | `S01_step00.png` | 288×595.2 | 300×620 | `1,  0,  0,  1,  0,  0` | product-home-layer · 282x602 | home-row-lead:+0h/+2w<br>home-event-date:+0h/+2w<br>planner-panel-stack:+4h/+0w | 507 / 356 | 0 | 1 | 9:41 · J · Juli · Familia García · Domingo, 16 de agosto · Hoy |
| 1 | S01 Chaos | 1 | `S01_step01.png` | 288×595.2 | 300×620 | `1,  0,  0,  1,  0,  0` | product-home-layer · 282x602 | home-row-lead:+0h/+2w<br>home-event-date:+0h/+2w<br>planner-panel-stack:+4h/+0w | 507 / 348 | 0 | 1 | FACTURA · 9:41 · J · Juli · Familia García · Domingo, 16 de agosto |
| 2 | S01 Chaos | 2 | `S01_step02.png` | 288×595.2 | 300×620 | `1,  0,  0,  1,  0,  0` | product-home-layer · 282x602 | home-row-lead:+0h/+2w<br>home-event-date:+0h/+2w<br>planner-panel-stack:+4h/+0w | 507 / 353 | 0 | 1 | 9:41 · J · Juli · Familia García · Domingo, 16 de agosto · Hoy |
| 3 | S01 Chaos | 3 | `S01_step03.png` | 288×595.2 | 300×620 | `1,  0,  0,  1,  0,  0` | product-home-layer · 282x602 | home-row-lead:+0h/+2w<br>home-event-date:+0h/+2w<br>planner-panel-stack:+4h/+0w | 507 / 350 | 0 | 1 | ¿A qué hora era el turno? · 9:41 · J · Juli · Familia García · Domingo, 16 de agosto |
| 4 | S01 Chaos | 4 | `S01_step04.png` | 288×595.2 | 300×620 | `1,  0,  0,  1,  0,  0` | product-home-layer · 282x602 | home-row-lead:+0h/+2w<br>home-event-date:+0h/+2w<br>planner-panel-stack:+4h/+0w | 507 / 344 | 0 | 1 | ¿A qué hora era el turno? · ¿Hay algo para cenar? · 9:41 · J · Juli · Familia García |
| 5 | S01 Chaos | 5 | `S01_step05.png` | 288×595.2 | 300×620 | `1,  0,  0,  1,  0,  0` | product-home-layer · 282x602 | home-row-lead:+0h/+2w<br>home-event-date:+0h/+2w<br>planner-panel-stack:+4h/+0w | 507 / 339 | 0 | 1 | ¿A qué hora era el turno? · ¿Hay algo para cenar? · Después haceme acordar · 9:41 · J · Juli |
| 6 | S01 Chaos | 6 | `S01_step06.png` | 288×595.2 | 300×620 | `1,  0,  0,  1,  0,  0` | product-home-layer · 282x602 | home-row-lead:+0h/+2w<br>home-event-date:+0h/+2w<br>planner-panel-stack:+4h/+0w | 507 / 333 | 0 | 1 | ¿A qué hora era el turno? · ¿Hay algo para cenar? · Después haceme acordar · ¿Alguien pagó la luz? · 9:41 · J |
| 7 | S01 Chaos | 7 | `S01_step07.png` | 288×595.2 | 300×620 | `1,  0,  0,  1,  0,  0` | product-home-layer · 282x602 | home-row-lead:+0h/+2w<br>home-event-date:+0h/+2w<br>planner-panel-stack:+4h/+0w | 507 / 327 | 0 | 1 | ¿A qué hora era el turno? · ¿Hay algo para cenar? · Después haceme acordar · ¿Alguien pagó la luz? · ¿Quién compra lo que falta? · 9:41 |
| 8 | S01 Chaos | 8 | `S01_step08.png` | 288×595.2 | 300×620 | `1,  0,  0,  1,  0,  0` | product-home-layer · 282x602 | home-row-lead:+0h/+2w<br>home-event-date:+0h/+2w<br>planner-panel-stack:+4h/+0w | 507 / 320 | 0 | 1 | ¿A qué hora era el turno? · ¿Hay algo para cenar? · Después haceme acordar · ¿Alguien pagó la luz? · ¿Quién compra lo que falta? · 9:41 |
| 9 | S01 Chaos | 9 | `S01_step09.png` | 288×595.2 | 300×620 | `1,  0,  0,  1,  0,  0` | product-home-layer · 282x602 | home-row-lead:+0h/+2w<br>home-event-date:+0h/+2w<br>planner-panel-stack:+4h/+0w | 507 / 315 | 0 | 1 | ¿A qué hora era el turno? · ¿Hay algo para cenar? · Después haceme acordar · ¿Alguien pagó la luz? · ¿Quién compra lo que falta? · Ya lo hice yo |
| 10 | S01 Chaos | 10 | `S01_step10.png` | 288×595.2 | 300×620 | `1,  0,  0,  1,  0,  0` | product-home-layer · 282x602 | home-row-lead:+0h/+2w<br>home-event-date:+0h/+2w<br>planner-panel-stack:+4h/+0w | 507 / 311 | 0 | 1.018 | ¿A qué hora era el turno? · ¿Hay algo para cenar? · Después haceme acordar · ¿Alguien pagó la luz? · ¿Quién compra lo que falta? · Ya lo hice yo |
| 11 | S02 Fragmented Info | 0 | `S02_step00.png` | 288×595.2 | 300×620 | `1,  0,  0,  1,  0,  0` | product-home-layer · 282x602 | home-row-lead:+0h/+2w<br>home-event-date:+0h/+2w<br>planner-panel-stack:+4h/+0w | 507 / 311 | 0 | 1.018 | ¿A qué hora era el turno? · ¿Hay algo para cenar? · Después haceme acordar · ¿Alguien pagó la luz? · ¿Quién compra lo que falta? · Ya lo hice yo |
| 12 | S02 Fragmented Info | 1 | `S02_step01.png` | 288×595.2 | 300×620 | `1,  0,  0,  1,  0,  0` | product-home-layer · 282x602 | home-row-lead:+0h/+2w<br>home-event-date:+0h/+2w<br>planner-panel-stack:+4h/+0w | 507 / 309 | 0 | 1.018 | ¿A qué hora era el turno? · ¿Hay algo para cenar? · Después haceme acordar · ¿Alguien pagó la luz? · ¿Quién compra lo que falta? · Ya lo hice yo |
| 13 | S02 Fragmented Info | 2 | `S02_step02.png` | 288×595.2 | 300×620 | `1,  0,  0,  1,  0,  0` | product-home-layer · 282x602 | home-row-lead:+0h/+2w<br>home-event-date:+0h/+2w<br>planner-panel-stack:+4h/+0w | 507 / 307 | 0 | 1.018 | ¿A qué hora era el turno? · ¿Hay algo para cenar? · Después haceme acordar · ¿Alguien pagó la luz? · ¿Quién compra lo que falta? · Ya lo hice yo |
| 14 | S02 Fragmented Info | 3 | `S02_step03.png` | 288×595.2 | 300×620 | `1,  0,  0,  1,  0,  0` | product-home-layer · 282x602 | home-row-lead:+0h/+2w<br>home-event-date:+0h/+2w<br>planner-panel-stack:+4h/+0w | 507 / 303 | 0 | 1.018 | ¿A qué hora era el turno? · ¿Hay algo para cenar? · Después haceme acordar · ¿Alguien pagó la luz? · ¿Quién compra lo que falta? · Ya lo hice yo |
| 15 | S02 Fragmented Info | 4 | `S02_step04.png` | 288×595.2 | 300×620 | `1,  0,  0,  1,  0,  0` | product-home-layer · 282x602 | home-row-lead:+0h/+2w<br>home-event-date:+0h/+2w<br>planner-panel-stack:+4h/+0w | 507 / 299 | 0 | 1.018 | ¿A qué hora era el turno? · ¿Hay algo para cenar? · Después haceme acordar · ¿Alguien pagó la luz? · ¿Quién compra lo que falta? · Ya lo hice yo |
| 16 | S02 Fragmented Info | 5 | `S02_step05.png` | 288×595.2 | 300×620 | `1,  0,  0,  1,  0,  0` | product-home-layer · 282x602 | home-row-lead:+0h/+2w<br>home-event-date:+0h/+2w<br>planner-panel-stack:+4h/+0w | 507 / 297 | 0 | 1.018 | ¿A qué hora era el turno? · ¿Hay algo para cenar? · Después haceme acordar · ¿Alguien pagó la luz? · ¿Quién compra lo que falta? · Ya lo hice yo |
| 17 | S02 Fragmented Info | 6 | `S02_step06.png` | 288×595.2 | 300×620 | `1,  0,  0,  1,  0,  0` | product-home-layer · 282x602 | home-row-lead:+0h/+2w<br>home-event-date:+0h/+2w<br>planner-panel-stack:+4h/+0w | 507 / 287 | 0 | 1.018 | ¿A qué hora era el turno? · ¿Hay algo para cenar? · Después haceme acordar · ¿Alguien pagó la luz? · ¿Quién compra lo que falta? · Ya lo hice yo |
| 18 | S03 HomePlus | 0 | `S03_step00.png` | 288×595.2 | 300×620 | `1,  0,  0,  1,  0,  0` | product-home-layer · 282x602 | home-row-lead:+0h/+2w<br>home-event-date:+0h/+2w<br>planner-panel-stack:+4h/+0w | 507 / 291 | 1 | 1.018 | ¿A qué hora era el turno? · ¿Hay algo para cenar? · Después haceme acordar · ¿Alguien pagó la luz? · ¿Quién compra lo que falta? · Ya lo hice yo |
| 19 | S04 Home | 0 | `S04_step00.png` | 300×620 | 300×620 | `1,  0,  0,  1,  0,  0` | product-home-layer · 282x602 | home-row-lead:+0h/+2w<br>home-event-date:+0h/+2w<br>planner-panel-stack:+4h/+0w | 507 / 289 | 0 | 1.018 | ¿A qué hora era el turno? · ¿Hay algo para cenar? · Después haceme acordar · ¿Alguien pagó la luz? · ¿Quién compra lo que falta? · Ya lo hice yo |
| 20 | S04 Home | 1 | `S04_step01.png` | 300×620 | 300×620 | `1,  0,  0,  1,  0,  0` | product-home-layer · 282x602 | home-row-lead:+0h/+2w<br>home-event-date:+0h/+2w<br>planner-panel-stack:+4h/+0w | 507 / 289 | 0 | 1.018 | ¿A qué hora era el turno? · ¿Hay algo para cenar? · Después haceme acordar · ¿Alguien pagó la luz? · ¿Quién compra lo que falta? · Ya lo hice yo |
| 21 | S04 Home | 2 | `S04_step02.png` | 300×620 | 300×620 | `1,  0,  0,  1,  0,  0` | product-home-layer · 282x602 | home-row-lead:+0h/+2w<br>home-event-date:+0h/+2w<br>planner-panel-stack:+4h/+0w | 507 / 289 | 0 | 1.018 | ¿A qué hora era el turno? · ¿Hay algo para cenar? · Después haceme acordar · ¿Alguien pagó la luz? · ¿Quién compra lo que falta? · Ya lo hice yo |
| 22 | S04 Home | 3 | `S04_step03.png` | 300×620 | 300×620 | `1,  0,  0,  1,  0,  0` | product-home-layer · 282x602 | home-row-lead:+0h/+2w<br>home-event-date:+0h/+2w<br>planner-panel-stack:+4h/+0w | 510 / 289 | 0 | 1.018 | ¿A qué hora era el turno? · ¿Hay algo para cenar? · Después haceme acordar · ¿Alguien pagó la luz? · ¿Quién compra lo que falta? · Ya lo hice yo |
| 23 | S04 Home | 4 | `S04_step04.png` | 300×620 | 300×620 | `1,  0,  0,  1,  0,  0` | product-home-layer · 282x602 | home-row-lead:+0h/+2w<br>home-event-date:+0h/+2w<br>planner-panel-stack:+4h/+0w | 513 / 289 | 0 | 1.018 | ¿A qué hora era el turno? · ¿Hay algo para cenar? · Después haceme acordar · ¿Alguien pagó la luz? · ¿Quién compra lo que falta? · Ya lo hice yo |
| 24 | S04 Home | 5 | `S04_step05.png` | 300×620 | 300×620 | `1,  0,  0,  1,  0,  0` | product-home-layer · 282x602 | home-row-lead:+0h/+2w<br>home-event-date:+0h/+2w<br>planner-panel-stack:+4h/+0w | 513 / 289 | 0 | 1.018 | ¿A qué hora era el turno? · ¿Hay algo para cenar? · Después haceme acordar · ¿Alguien pagó la luz? · ¿Quién compra lo que falta? · Ya lo hice yo |
| 25 | S05 Planner | 0 | `S05_step00.png` | 300×620 | 300×620 | `1,  0,  0,  1,  0,  0` | product-home-layer · 282x602 | home-row-lead:+0h/+2w<br>home-event-date:+0h/+2w<br>planner-panel-stack:+4h/+0w | 513 / 317 | 0 | 1.018 | ¿A qué hora era el turno? · ¿Hay algo para cenar? · Después haceme acordar · ¿Alguien pagó la luz? · ¿Quién compra lo que falta? · Ya lo hice yo |
| 26 | S05 Planner | 1 | `S05_step01.png` | 300×620 | 300×620 | `1,  0,  0,  1,  0,  0` | product-home-layer · 282x602 | home-row-lead:+0h/+2w<br>home-event-date:+0h/+2w<br>planner-panel-stack:+4h/+0w | 513 / 317 | 0 | 1.018 | ¿A qué hora era el turno? · ¿Hay algo para cenar? · Después haceme acordar · ¿Alguien pagó la luz? · ¿Quién compra lo que falta? · Ya lo hice yo |
| 27 | S05 Planner | 2 | `S05_step02.png` | 300×620 | 300×620 | `1,  0,  0,  1,  0,  0` | product-home-layer · 282x602 | home-row-lead:+0h/+2w<br>home-event-date:+0h/+2w<br>planner-panel-stack:+4h/+0w | 513 / 303 | 0 | 1.018 | ¿A qué hora era el turno? · ¿Hay algo para cenar? · Después haceme acordar · ¿Alguien pagó la luz? · ¿Quién compra lo que falta? · Ya lo hice yo |
| 28 | S05 Planner | 3 | `S05_step03.png` | 300×620 | 300×620 | `1,  0,  0,  1,  0,  0` | product-home-layer · 282x602 | home-row-lead:+0h/+2w<br>home-event-date:+0h/+2w<br>planner-panel-stack:+4h/+0w | 513 / 321 | 0 | 1.018 | ¿A qué hora era el turno? · ¿Hay algo para cenar? · Después haceme acordar · ¿Alguien pagó la luz? · ¿Quién compra lo que falta? · Ya lo hice yo |
| 29 | S06 Family | 0 | `S06_step00.png` | 300×620 | 300×620 | `1,  0,  0,  1,  0,  0` | product-home-layer · 282x602 | home-row-lead:+0h/+2w<br>home-event-date:+0h/+2w<br>planner-panel-stack:+4h/+0w | 513 / 331 | 0 | 1.018 | ¿A qué hora era el turno? · ¿Hay algo para cenar? · Después haceme acordar · ¿Alguien pagó la luz? · ¿Quién compra lo que falta? · Ya lo hice yo |
| 30 | S06 Family | 1 | `S06_step01.png` | 300×620 | 300×620 | `1,  0,  0,  1,  0,  0` | product-home-layer · 282x602 | home-row-lead:+0h/+2w<br>home-event-date:+0h/+2w<br>planner-panel-stack:+4h/+0w | 513 / 316 | 1 | 1.018 | ¿A qué hora era el turno? · ¿Hay algo para cenar? · Después haceme acordar · ¿Alguien pagó la luz? · ¿Quién compra lo que falta? · Ya lo hice yo |
| 31 | S06 Family | 2 | `S06_step02.png` | 300×620 | 300×620 | `1,  0,  0,  1,  0,  0` | product-home-layer · 282x602 | home-row-lead:+0h/+2w<br>home-event-date:+0h/+2w<br>planner-panel-stack:+4h/+0w | 513 / 309 | 1 | 1.018 | ¿A qué hora era el turno? · ¿Hay algo para cenar? · Después haceme acordar · ¿Alguien pagó la luz? · ¿Quién compra lo que falta? · Ya lo hice yo |
| 32 | S06 Family | 3 | `S06_step03.png` | 300×620 | 300×620 | `1,  0,  0,  1,  0,  0` | product-home-layer · 282x602 | home-row-lead:+0h/+2w<br>home-event-date:+0h/+2w<br>planner-panel-stack:+4h/+0w | 513 / 299 | 1 | 1.018 | ¿A qué hora era el turno? · ¿Hay algo para cenar? · Después haceme acordar · ¿Alguien pagó la luz? · ¿Quién compra lo que falta? · Ya lo hice yo |
| 33 | S06 Family | 4 | `S06_step04.png` | 300×620 | 300×620 | `1,  0,  0,  1,  0,  0` | product-home-layer · 282x602 | home-row-lead:+0h/+2w<br>home-event-date:+0h/+2w<br>planner-panel-stack:+4h/+0w | 513 / 303 | 0 | 1.018 | ¿A qué hora era el turno? · ¿Hay algo para cenar? · Después haceme acordar · ¿Alguien pagó la luz? · ¿Quién compra lo que falta? · Ya lo hice yo |
| 34 | S06 Family | 5 | `S06_step05.png` | 300×620 | 300×620 | `1,  0,  0,  1,  0,  0` | product-home-layer · 282x602 | home-row-lead:+0h/+2w<br>home-event-date:+0h/+2w<br>planner-panel-stack:+4h/+0w | 513 / 320 | 0 | 1.018 | ¿A qué hora era el turno? · ¿Hay algo para cenar? · Después haceme acordar · ¿Alguien pagó la luz? · ¿Quién compra lo que falta? · Ya lo hice yo |
| 35 | S07 Coordinar No Es Vigilar | 0 | `S07_step00.png` | 300×620 | 300×620 | `1,  0,  0,  1,  0,  0` | product-home-layer · 282x602 | home-row-lead:+0h/+2w<br>home-event-date:+0h/+2w<br>planner-panel-stack:+4h/+0w | 517 / 305 | 0 | 1.018 | ¿A qué hora era el turno? · ¿Hay algo para cenar? · Después haceme acordar · ¿Alguien pagó la luz? · ¿Quién compra lo que falta? · Ya lo hice yo |
| 36 | S07 Coordinar No Es Vigilar | 1 | `S07_step01.png` | 300×620 | 300×620 | `1,  0,  0,  1,  0,  0` | product-home-layer · 282x602 | home-row-lead:+0h/+2w<br>home-event-date:+0h/+2w<br>planner-panel-stack:+4h/+0w | 517 / 304 | 0 | 1.018 | ¿A qué hora era el turno? · ¿Hay algo para cenar? · Después haceme acordar · ¿Alguien pagó la luz? · ¿Quién compra lo que falta? · Ya lo hice yo |
| 37 | S08 Plans Inventory | 0 | `S08_step00.png` | 300×620 | 300×620 | `1,  0,  0,  1,  0,  0` | s08-screen-stack · 282x602 | planner-panel-stack:+4h/+0w<br>inventory-workspace:+0h/+12w<br>inventory-filters:+0h/+28w<br>inventory-card:+41h/+0w | 270 / 164 | 0 | 1 | 9:41 · J · Juli · Familia García · Planes · Tareas |
| 38 | S08 Plans Inventory | 1 | `S08_step01.png` | 300×620 | 300×620 | `1,  0,  0,  1,  0,  0` | s08-screen-stack · 282x602 | planner-panel-stack:+4h/+0w<br>inventory-workspace:+0h/+12w<br>inventory-filters:+0h/+28w<br>inventory-card:+41h/+0w | 270 / 164 | 0 | 1 | 9:41 · J · Juli · Familia García · Planes · Tareas |
| 39 | S08 Plans Inventory | 2 | `S08_step02.png` | 300×620 | 300×620 | `1,  0,  0,  1,  0,  0` | s08-screen-stack · 282x602 | planner-panel-stack:+4h/+0w<br>inventory-workspace:+0h/+12w<br>inventory-filters:+0h/+28w<br>inventory-card:+41h/+0w | 270 / 163 | 0 | 1 | 9:41 · J · Juli · Familia García · Planes · Tareas |
| 40 | S08 Plans Inventory | 3 | `S08_step03.png` | 300×620 | 300×620 | `1,  0,  0,  1,  0,  0` | s08-screen-stack · 282x602 | planner-panel-stack:+4h/+0w<br>inventory-workspace:+0h/+12w<br>inventory-filters:+0h/+28w<br>inventory-card:+41h/+0w | 270 / 141 | 0 | 1 | Cumpleaños · Sábado · 3 pasos pendientes · Repartir tareas · Preparar cosas · Comprar lo que falta · 9:41 |
| 41 | S08 Plans Inventory | 4 | `S08_step04.png` | 300×620 | 300×620 | `1,  0,  0,  1,  0,  0` | s08-screen-stack · 282x602 | planner-panel-stack:+4h/+0w<br>inventory-workspace:+0h/+12w<br>inventory-filters:+0h/+28w<br>inventory-card:+60h/+0w | 270 / 141 | 0 | 1 | Cumpleaños · Sábado · 3 pasos pendientes · Repartir tareas · Preparar cosas · Comprar lo que falta · 9:41 |
| 42 | S09 Finance | 0 | `S09_step00.png` | 300×620 | 300×620 | `1,  0,  0,  1,  0,  0` | s09-screen-fill · 282x602 | finance-hero-balance:+2h/+0w | 115 / 4 | 0 | 1 | 9:41 · Finanzas · Familia García · Resumen · Movimientos · Pagos |
| 43 | S09 Finance | 1 | `S09_step01.png` | 300×620 | 300×620 | `1,  0,  0,  1,  0,  0` | s09-screen-fill · 282x602 | finance-hero-balance:+2h/+0w | 115 / 3 | 0 | 1 | 9:41 · Finanzas · Familia García · Resumen · Movimientos · Pagos |
| 44 | S09 Finance | 2 | `S09_step02.png` | 300×620 | 300×620 | `1,  0,  0,  1,  0,  0` | s09-screen-fill · 282x602 | finance-hero-balance:+2h/+0w | 115 / 2 | 0 | 1 | 9:41 · Finanzas · Familia García · Resumen · Movimientos · Pagos |
| 45 | S09 Finance | 3 | `S09_step03.png` | 300×620 | 300×620 | `1,  0,  0,  1,  0,  0` | s09-screen-fill · 282x602 | finance-hero-balance:+2h/+0w | 115 / 1 | 0 | 1 | 9:41 · Finanzas · Familia García · Resumen · Movimientos · Pagos |
| 46 | S09 Finance | 4 | `S09_step04.png` | 300×620 | 300×620 | `1,  0,  0,  1,  0,  0` | s09-screen-fill · 282x602 | finance-hero-balance:+2h/+0w | 115 / 0 | 0 | 1 | 9:41 · Finanzas · Familia García · Resumen · Movimientos · Pagos |
| 47 | S10 Assets HomeCloud | 0 | `S10_step00.png` | 324×669.6 | 300×620 | `1.08,  0,  0,  1.08,  0,  0` | s10-screen-stack · 282x602 | none | 173 / 64 | 0 | 1.08 | 9:41 · Activos · P · PlayStation 5 · Consola · Living · H |
| 48 | S10 Assets HomeCloud | 1 | `S10_step01.png` | 324×669.6 | 300×620 | `1.08,  0,  0,  1.08,  0,  0` | s10-screen-stack · 282x602 | none | 173 / 64 | 0 | 1.08 | 9:41 · Activos · P · PlayStation 5 · Consola · Living · H |
| 49 | S10 Assets HomeCloud | 2 | `S10_step02.png` | 324×669.6 | 300×620 | `1.08,  0,  0,  1.08,  0,  0` | s10-screen-stack · 282x602 | none | 167 / 64 | 0 | 1.08 | 9:41 · P · PlayStation 5 · Consola · Living · Documentos · PDF |
| 50 | S10 Assets HomeCloud | 3 | `S10_step03.png` | 324×669.6 | 300×620 | `1.08,  0,  0,  1.08,  0,  0` | s10-screen-stack · 282x602 | none | 167 / 60 | 0 | 1.08 | 9:41 · HomeCloud · Documentos · Recuerdos · Recientes · PDF |
| 51 | S10 Assets HomeCloud | 4 | `S10_step04.png` | 324×669.6 | 300×620 | `1.08,  0,  0,  1.08,  0,  0` | s10-screen-stack · 282x602 | none | 179 / 60 | 0 | 1.08 | 9:41 · HomeCloud · Documentos · Recuerdos · Fotos · Cumpleaños |
| 52 | S11 Continuity | 0 | `S11_step00.png` | — | — | identity | none · none | none | 8 / 2 | 0 | 1 | La vida no pasa · por módulos. |
| 53 | S11 Continuity | 1 | `S11_step01.png` | — | — | identity | none · none | none | 8 / 1 | 0 | 1 | La vida no pasa · por módulos. |
| 54 | S11 Continuity | 2 | `S11_step02.png` | — | — | identity | none · none | none | 8 / 0 | 0 | 1 | La vida no pasa · por módulos. · HomePlus los conecta. |
| 55 | S12 Frontend Backend | 0 | `S12_step00.png` | — | — | identity | none · none | none | 32 / 15 | 0 | 1 | Frontend · La app que usás · React Native · Expo |
| 56 | S12 Frontend Backend | 1 | `S12_step01.png` | — | — | identity | none · none | none | 32 / 2 | 0 | 1 | Frontend · La app que usás · React Native · Expo · Backend · Datos y servicios |
| 57 | S12 Frontend Backend | 2 | `S12_step02.png` | — | — | identity | none · none | none | 32 / 0 | 0 | 1 | Frontend · La app que usás · React Native · Expo · Backend · Datos y servicios |
| 58 | S13 Stack | 0 | `S13_step00.png` | — | — | identity | none · none | none | 55 / 13 | 0 | 1 | Frontend · La app que usás · React Native · Expo · Backend · Datos y servicios |
| 59 | S13 Stack | 1 | `S13_step01.png` | — | — | identity | none · none | none | 57 / 13 | 0 | 1 | Frontend · La app que usás · React Native · Interfaz móvil · Expo · Build y preview |
| 60 | S13 Stack | 2 | `S13_step02.png` | — | — | identity | none · none | none | 60 / 13 | 0 | 1 | Frontend · La app que usás · React Native · Interfaz móvil · Expo · Build y preview |
| 61 | S13 Stack | 3 | `S13_step03.png` | — | — | identity | none · none | none | 60 / 4 | 0 | 1 | Frontend · La app que usás · React Native · Interfaz móvil · Expo · Build y preview |
| 62 | S14 Barrier | 0 | `S14_step00.png` | — | — | identity | none · none | none | 91 / 31 | 0 | 1 | Frontend · La app que usás · React Native · Interfaz móvil · Expo · Build y preview |
| 63 | S14 Barrier | 1 | `S14_step01.png` | — | — | identity | none · none | none | 91 / 19 | 0 | 1 | Frontend · La app que usás · React Native · Interfaz móvil · Expo · Build y preview |
| 64 | S14 Barrier | 2 | `S14_step02.png` | — | — | identity | none · none | none | 91 / 7 | 0 | 1 | Frontend · La app que usás · React Native · Interfaz móvil · Expo · Build y preview |
| 65 | S14 Barrier | 3 | `S14_step03.png` | — | — | identity | none · none | none | 91 / 7 | 0 | 1 | Frontend · La app que usás · React Native · Interfaz móvil · Expo · Build y preview |
| 66 | S14 Barrier | 4 | `S14_step04.png` | — | — | identity | none · none | none | 91 / 73 | 0 | 1 | Figma · Diseño · IA · ¿Y si ni siquiera · tuviéramos que saber cómo? |
| 67 | S15 HOMI Action | 0 | `S15_step00.png` | 324×669.6 | 300×620 | `1.08,  0,  0,  1.08,  0,  0` | s15-screen-fill · 282x602 | homi-confirm-zone:+10h/+0w | 63 / 10 | 0 | 1.08 | Homi · 9:41 · Asistente del hogar · ¿En qué te ayudo? · Pedile algo a Homi… |
| 68 | S15 HOMI Action | 1 | `S15_step01.png` | 324×669.6 | 300×620 | `1.08,  0,  0,  1.08,  0,  0` | s15-screen-fill · 282x602 | homi-confirm-zone:+10h/+0w | 63 / 10 | 0 | 1.08 | Homi · 9:41 · Asistente del hogar · Agendá que mañana Tomi tiene entrenamiento una hora más tarde. · Pedile algo a Homi… |
| 69 | S15 HOMI Action | 2 | `S15_step02.png` | 324×669.6 | 300×620 | `1.08,  0,  0,  1.08,  0,  0` | s15-screen-fill · 282x602 | homi-confirm-zone:+10h/+0w | 63 / 8 | 0 | 1.08 | Homi · 9:41 · Asistente del hogar · Agendá que mañana Tomi tiene entrenamiento una hora más tarde. · Voy a actualizar el entrenamiento de Tomi para mañana y avisar a la familia. · Pedile algo a Homi… |
| 70 | S15 HOMI Action | 3 | `S15_step03.png` | 324×669.6 | 300×620 | `1.08,  0,  0,  1.08,  0,  0` | s15-screen-fill · 282x602 | homi-confirm-zone:+10h/+0w | 63 / 7 | 0 | 1.08 | Homi · 9:41 · Asistente del hogar · Agendá que mañana Tomi tiene entrenamiento una hora más tarde. · Voy a actualizar el entrenamiento de Tomi para mañana y avisar a la familia. · Confirmar |
| 71 | S15 HOMI Action | 4 | `S15_step04.png` | 324×669.6 | 300×620 | `1.08,  0,  0,  1.08,  0,  0` | s15-screen-fill · 282x602 | none | 63 / 3 | 0 | 1.08 | Homi · 9:41 · Asistente del hogar · Agendá que mañana Tomi tiene entrenamiento una hora más tarde. · Voy a actualizar el entrenamiento de Tomi para mañana y avisar a la familia. · Confirmado |
| 72 | S16 HOMI Context | 0 | `S16_step00.png` | 324×669.6 | 300×620 | `1.08,  0,  0,  1.08,  0,  0` | s16-screen-fill · 282x602 | homi-thread:+0h/+2w<br>homi-context:+0h/+18w<br>homi-context-chips:+0h/+18w | 63 / 10 | 0 | 1.08 | La misma pregunta. · Distinto contexto. · 9:41 · Homi · Asistente del hogar · ¿En qué te ayudo? |
| 73 | S16 HOMI Context | 1 | `S16_step01.png` | 324×669.6 | 300×620 | `1.08,  0,  0,  1.08,  0,  0` | s16-screen-fill · 282x602 | homi-thread:+0h/+2w<br>homi-context:+0h/+18w<br>homi-context-chips:+0h/+18w | 70 / 8 | 0 | 1.08 | La misma pregunta. · Distinto contexto. · 9:41 · Homi · Asistente del hogar · ¿Qué tengo que hacer hoy? |
| 74 | S16 HOMI Context | 2 | `S16_step02.png` | 324×669.6 | 300×620 | `1.08,  0,  0,  1.08,  0,  0` | s16-screen-fill · 282x602 | homi-thread:+0h/+2w<br>homi-context:+0h/+18w<br>homi-context-chips:+0h/+18w | 70 / 8 | 0 | 1.08 | La misma pregunta. · Distinto contexto. · 9:41 · Homi · Asistente del hogar · ¿Qué tengo que hacer hoy? |
| 75 | S16 HOMI Context | 3 | `S16_step03.png` | 324×669.6 | 300×620 | `1.08,  0,  0,  1.08,  0,  0` | s16-screen-fill · 282x602 | homi-thread:+0h/+2w<br>homi-context:+0h/+18w<br>homi-context-chips:+0h/+18w | 70 / 8 | 0 | 1.08 | La misma pregunta. · Distinto contexto. · 9:41 · Homi · Asistente del hogar · ¿Qué tengo que hacer hoy? |
| 76 | S16 HOMI Context | 4 | `S16_step04.png` | 324×669.6 | 300×620 | `1.08,  0,  0,  1.08,  0,  0` | s16-screen-fill · 282x602 | homi-thread:+0h/+2w<br>homi-context:+0h/+18w<br>homi-context-chips:+0h/+18w | 70 / 2 | 0 | 1.08 | La misma pregunta. · Distinto contexto. · 9:41 · Homi · Asistente del hogar · ¿Qué tengo que hacer hoy? |
| 77 | S17 Human Control | 0 | `S17_step00.png` | 324×669.6 | 300×620 | `1.08,  0,  0,  1.08,  0,  0` | s17-screen-fill · 282x602 | homi-decision-row:+10h/+0w | 63 / 9 | 0 | 1.08 | 9:41 · Homi · Asistente del hogar · Puedo mover el entrenamiento de Tomi una hora más tarde y avisar a la familia. · Pedile algo a Homi… |
| 78 | S17 Human Control | 1 | `S17_step01.png` | 324×669.6 | 300×620 | `1.08,  0,  0,  1.08,  0,  0` | s17-screen-fill · 282x602 | none | 63 / 6 | 0 | 1.08 | 9:41 · Homi · Asistente del hogar · Puedo mover el entrenamiento de Tomi una hora más tarde y avisar a la familia. · Confirmar · Ahora no |
| 79 | S17 Human Control | 2 | `S17_step02.png` | 324×669.6 | 300×620 | `1.08,  0,  0,  1.08,  0,  0` | s17-screen-fill · 282x602 | none | 63 / 5 | 0 | 1.08 | 9:41 · Homi · Asistente del hogar · Puedo mover el entrenamiento de Tomi una hora más tarde y avisar a la familia. · Confirmar · Ahora no |
| 80 | S17 Human Control | 3 | `S17_step03.png` | 324×669.6 | 300×620 | `1.08,  0,  0,  1.08,  0,  0` | s17-screen-fill · 282x602 | homi-decision-row:+10h/+0w | 63 / 3 | 0 | 1.08 | 9:41 · Homi · Asistente del hogar · Puedo mover el entrenamiento de Tomi una hora más tarde y avisar a la familia. · Confirmado · Entrenamiento actualizado · Avisé a la familia |
| 81 | S18 Closing | 0 | `S18_step00.png` | — | — | identity | none · none | none | 21 / 17 | 0 | 1 | — |
| 82 | S18 Closing | 1 | `S18_step01.png` | — | — | identity | none · none | none | 21 / 14 | 0 | 1 | HomePlus |
| 83 | S18 Closing | 2 | `S18_step02.png` | — | — | identity | none · none | none | 21 / 1 | 0 | 1 | HomePlus · BG · Bernardo Gimenez · BD · Benjamin Duarte · GB |
| 84 | S18 Closing | 3 | `S18_step03.png` | — | — | identity | none · none | none | 21 / 0 | 0 | 1 | HomePlus · BG · Bernardo Gimenez · BD · Benjamin Duarte · GB |

Full text inventory per state (all deduped visible strings, DOM order): `audit/runtime/session-01/data/text-table.md`.
Machine-readable index: `data/state-index.json`, `data/state-table.csv`.

---

## 4. MOTION EVIDENCE

### 4.1 Method

For every one of the **84** transitions, an in-page sampler was armed on `keydown` (capture phase, so `t0` precedes React's re-render) and sampled at nominal **0 / 100 / 200 / 320 / 500 ms**. Realised sample times drifted by ≤ ~25 ms; realised times are recorded per frame in `data/motion-summary.json`. Every sample records, for every tracked element: bounding box, `opacity`, `transform`, `translate`, `scale`, `clientWidth/Height`, `scrollWidth/Height`, `scrollTop/Left`, plus `document.getAnimations().length`. Containers tracked explicitly: `.presentation-canvas`, `.presentation-scene`, `.phone-frame-slot`, `.phone-frame`, `.phone-frame-screen`, `.phone-frame-screen > *`.

Declared motion vocabulary read from source (`src/index.css`, `src/presentation/motion/motionTokens.ts`): easing `cubic-bezier(.2,.8,.2,1)`; durations `fast 220ms`, `standard 320ms`, `emphasis 420ms`, `spatial 500ms`; enter distance `12px`; primitives `.motion-enter`, `.motion-exit`, `.motion-replace`, `.motion-accumulate`, `.motion-reframe` (transition), `.motion-spatial-wipe`, `.motion-blackout`.

### 4.2 Aggregate motion facts (CONFIRMED)

| Metric | Value |
|---|---|
| Transitions sampled | 84 / 84, 5 frames each = 420 frames |
| Transitions where ≥1 element changed `opacity` or `transform` | 71 / 84 |
| Transitions with 0 animating elements | 13 / 84 |
| Transitions where an animating element changed `clientWidth/clientHeight/scrollWidth/scrollHeight` during the transition | **9 / 84** |
| Transitions where `.phone-frame` / `.phone-frame-screen` / app surface changed geometry | **9 / 84** (all of them scene-change mount/unmount or a whole-device reposition, see §4.4) |
| Transitions where `.presentation-canvas` `scrollHeight/scrollWidth` changed | 6 / 84 (`S06→S06`, `S07→S08`, `S08` internal, `S08→S09`, `S13→S14`, `S14` internal) |
| Longest running animation observed at 500 ms | still running in 2 transitions (`S09_step04→S10_step00`, `S14_step04→S15_step00`: `getAnimations().length === 2` at the 500 ms sample) |

### 4.3 The 9 transitions where an animating element changed layout/scroll mid-transition

| Transition | Element | client/scroll change |
|---|---|---|
| `S03_step00 → S04_step00` | `.ambient-glow.opening-stage-light` | `920×598 → 996×647` (cw/ch/sw/sh all) |
| `S05_step03 → S06_step00` | `.map-place.map-club` | `66×54 → 71×32` |
| `S06_step00 → S06_step01` | `.family-map-stage` | `250×200 (sw 313 sh 265) → 1080×520 (sw 1350 sh 689)` |
| | `.family-map-glow.ambient-glow` | `375×330 → 1620×858` |
| | `.map-place.map-school` | `92×32 → 219×82` |
| `S06_step02 → S06_step03` | `.map-place.map-club` | `166×82 → 240×121` |
| `S06_step03 → S06_step04` | `.family-map-stage` | `1080×520 → 250×200` (reverse) |
| | `.family-map-glow.ambient-glow` | `1620×858 → 375×330` |
| | `.map-place.map-school` | `219×82 → 92×32` |
| `S06_step05 → S07_step00` | `.map-place.map-club` | `78×51 → 71×32` |
| `S13_step02 → S13_step03` | `.s13-bridge` | `scrollHeight 8 → 9` |
| `S17_step00 → S17_step01` | `.homi-decision-row` | `scrollHeight 64 → 54` |
| `S18_step01 → S18_step02` | `.s18-team` | `scrollHeight 113 → 103` |

**CONFIRMED:** in all 84 transitions the phone frame, phone screen and app surface kept **identical `clientWidth/clientHeight` and `scrollWidth/scrollHeight` at every one of the 420 samples** whenever they existed. The only phone-related geometry changes were the 6 scene-boundary cases in §4.4.

### 4.4 Phone / app-surface geometry deltas across transitions (CONFIRMED)

| Transition | What changed |
|---|---|
| `S03_step00 → S04_step00` | phone visual box `288×595.2 @572.8,70.4` → `295.94×611.61 @570.95,56.9` (interpolating to the new `300×620 @570,50` resting box); `clientWidth/clientHeight` of `.phone-frame` **unchanged** at `298×618` |
| `S09_step04 → S10_step00` | `.phone-frame-slot` `clientWidth 300 → 324`, `clientHeight 620 → 670`; `.phone-frame` visual `300×620 → 324×669.6`, `transform matrix(1,0,0,1,0,0) → matrix(1.08,0,0,1.08,0,0)`; `.phone-frame` `clientWidth/clientHeight` **unchanged** at `298×618`; position `250,50 → 238,25` |
| `S10_step02 → S10_step03` | `.phone-frame-slot` position `238,25 → 718,25` (device movement across stage); size and transform unchanged |
| `S10_step04 → S11_step00` | phone absent at end (S11 has no device) |
| `S14_step04 → S15_step00` | phone absent at start; arrives at `718,25`, `324×669.6`, `matrix(1.08,…)` |
| `S17_step03 → S18_step00` | phone absent at end (S18 has no device) |

The `S09→S10` and `S14→S15` device arrival is animated as a **position + transform interpolation**: at 103 ms the visual box is `324×669.6 @238,31.65`, at 201 ms `@238,26.57`, at 323 ms `@238,25.27`, at 501 ms `@238,25`. Opacity of the arriving layer runs `0 → 0.698 → 0.952 → 0.998 → settled`. The device does **not** scale up from nothing; it is already at final scale at the first post-press sample.

### 4.5 Representative frame traces (CONFIRMED)

`S01_step00 → S01_step01` — 1 animating element, 0 entering, 0 exiting, phone box constant at every frame:

| t (ms) | running animations | phone visual | app surface | mid-transition opacity sample |
|---|---|---|---|---|
| 0 | 0 | `288×595.2 @572.8,70.4` | `270.72×577.92` | — |
| 103 | 2 | unchanged | unchanged | `0.6977` |
| 205 | 2 | unchanged | unchanged | `0.9657` |
| 321 | 2 | unchanged | unchanged | `0.9984` |
| 505 | 0 | unchanged | unchanged | settled |

`S06_step00 → S06_step01` — 9 animating elements, 5 entering / 5 exiting, **7 elements changed layout mid-transition**, `.presentation-canvas` `scrollWidth/scrollHeight` `1280×720 → 1450×789`, phone visual box unchanged at every frame.

`S09_step04 → S10_step00` — 0 animating elements (pure cross-mount), 172 entering / 114 exiting, `.phone-frame-slot` layout mutated `300×620 → 324×670`, `.phone-frame` transform mutated to `1.08`, phone visual box interpolating in `y` only.

### 4.6 Entering / exiting object census (all 84 transitions, CONFIRMED)

Complete per-transition numbers in `data/motion-summary.json`. Notable entries:

| Transition | Entering | Exiting | Reading |
|---|---|---|---|
| `S01_step00 → S01_step01` | 0 | 0 | additive inside a mounted layer |
| `S04_step02 → S04_step03` | 8 | 5 | first real mount inside Home |
| `S05_step01 → S05_step02` | 5 | 5 | Planner tab panel swap |
| `S06_step00 → S06_step01` | 5 | 5 | family map stage swap |
| `S07_step01 → S08_step00` | 270 | 517 | whole-scene unmount/mount (intro-product group ends) |
| `S08_step04 → S09_step00` | 114 | 269 | S08 → S09 |
| `S09_step04 → S10_step00` | 172 | 114 | S09 → S10 |
| `S13_step03 → S14_step00` | 88 | 57 | S13 → S14 |
| `S17_step03 → S18_step00` | 21 | 63 | S17 → S18 |

---

## 5. UI ENLARGEMENT EVIDENCE

**No quality verdict. Classification is factual only.**

### 5.1 Measured enlargement technique, stage by stage

| States | Phone visual | Phone layout (`offset`) | `.phone-frame` transform | `.phone-frame` `clientWidth×clientHeight` | Screen `clientWidth×clientHeight` | Technique |
|---|---|---|---|---|---|---|
| `S01_step00` … `S03_step00` (19 states) | `288 × 595.2` | `300 × 620` | `matrix(1,0,0,1,0,0)` | `298 × 618` | `282 × 602` | whole device, scaled **down** to 0.96 by the slot (`slot 288×595.2`, `--phone-scale: 0.96`) |
| `S04_step00` … `S09_step04` (28 states) | `300 × 620` | `300 × 620` | identity | `298 × 618` | `282 × 602` | whole device at 1.00 |
| `S10_step00` … `S10_step04`, `S15_step00` … `S17_step03` (19 states) | `324 × 669.6` | `300 × 620` | `matrix(1.08,0,0,1.08,0,0)` | `298 × 618` | `282 × 602` | **WHOLE DEVICE SCALE** at 1.08 |
| `S11`, `S12`, `S13`, `S14`, `S18` (19 states) | no device | — | — | — | — | no phone on stage |

**CONFIRMED, and this is the central enlargement fact:** across all 66 device-bearing states, `.phone-frame` layout stayed `298 × 618` and `.phone-frame-screen` client box stayed `282 × 602`. The three different device sizes on stage are produced by the `PhoneFrame` `scale` prop writing `--phone-scale` onto `.phone-frame` (a `transform`), plus the **slot** box being set to `300×scale` by `620×scale`. The app's own layout box never changed.

### 5.2 Largest transform applied to any single element (CONFIRMED)

Maximum element `matrix` scale, per state: **1.000** for most states, **1.018** for `S01_step10` … `S08_step02` (and backward), **1.080** for `S10`/`S15`/`S16`/`S17`.

The 1.08 maximum is the phone's own `--phone-scale`; it is a whole-device value. The 1.018 values correspond to `motion-enter` mid-flight `translate` + the ambient elements, not to a focus magnification.

**Therefore (CONFIRMED):** there is **no local visual focus zoom anywhere in the presentation.** No element is magnified by a transform greater than the device's own scale. `zoomTarget` detection in the probe (largest non-stage transform scale among visible elements) never exceeded `1.08`, and that value was always the phone frame.

### 5.3 The one place where enlargement is done by layout mutation (CONFIRMED, measured)

`S06 Family`, steps 1→3. Measured across the whole transition, not just its endpoints:

| Element | Before emphasis (`S06_step00`) | During emphasis (`S06_step01..03`) | Back (`S06_step04`) |
|---|---|---|---|
| `.family-map-stage` `clientWidth×clientHeight` | `250 × 200` | `1080 × 520` | `250 × 200` |
| `.family-map-stage` `scrollWidth×scrollHeight` | `313 × 265` | `1350 × 689` | `313 × 265` |
| `.family-map-surface` | `250 × 200` | `1080 × 520` | `250 × 200` |
| `.map-demo-screen` | `250 × 200` | `1080 × 520` | `250 × 200` |
| `.map-place.map-school` | `92 × 32` | `219 × 82` | `92 × 32` |
| `.map-place.map-school` label `"Colegio"` `font-size` | `15px` | `41.04px` | `15px` |
| `.map-place.map-club` | `166 × 82` (at step02) | `240 × 121` (at step03) | `166 × 82` |
| `.map-place-symbol` | `18 × 18` | `35 × 35` | `18 × 18` |
| `.family-map-glow.ambient-glow` | `375 × 330` | `1620 × 858` | `375 × 330` |
| `.presentation-canvas` `scrollWidth×scrollHeight` | `1280 × 720` | `1450 × 789` | `1280 × 720` |
| `.presentation-scene` `scrollWidth×scrollHeight` | `1280 × 720` | `1450 × 789` | `1280 × 720` |
| `.home-scene.home-planner-sequence` `scrollWidth×scrollHeight` | `1280 × 720` | `1450 × 789` | `1280 × 720` |
| `.phone-frame` visual / layout | `300×620 / 300×620` | `300×620 / 300×620` | `300×620 / 300×620` |
| `.phone-frame-screen` client | `282 × 602` | `282 × 602` | `282 × 602` |

Screenshot `states/S06_step03.png` corroborates: the map surface is a large light panel that overlaps the device, whose top and bottom edges remain visible behind it.

Classification of this step pair: **LAYOUT SIZE MUTATION** (the emphasised object is resized in layout, its typography is re-sized in layout, its parent scene and the canvas itself gain `scrollWidth/scrollHeight`) **+ CAMERA/CROP is absent** (no `clip-path`, no `overflow` change, no cropping frame — the excess is simply clipped by `.presentation-canvas { overflow: hidden }`). The phone's own geometry is untouched. **No verdict is drawn.**

### 5.4 Other in-app "emphasis" implemented as layout + type mutation (CONFIRMED)

Measured between consecutive *stable* states, on elements that exist in both:

| Transition | Element | `clientW/H` | `font-size` |
|---|---|---|---|
| `S08_step03 → S08_step04` | `.inventory-row-title` ("Papel higiénico", "Leche") | `119×48 → 117×53` | `19px → 21px` |
| | `.inventory-row-meta` | `119×16 → 117×18` | `12px → 13.5px` |
| | `.inventory-status-low` ("Bajo") | `41×21 → 43×22` | `11px → 12px` |
| | `.inventory-row` | `84 → 91`, `62 → 64` (height) | — |
| | `.inventory-card` | `scrollHeight 270 → 284` | — |
| `S05_step01 → S05_step02` | `.planner-tab` "Calendario" | `clientWidth 82 → 137` | unchanged | ← **SUPERSEDED by `01_RUNTIME_BASELINE_ERRATA.md` §E-01. The value is preserved verbatim as the Session-1 record but is INVALID: the Planner tabs do not resize. Canonical max observed width 84 px; the selection pill translates.** |
| `S05_step02 → S05_step03` | `.planner-tab` "Planes" | `clientWidth 137 → 82` | unchanged | ← **SUPERSEDED by `01_RUNTIME_BASELINE_ERRATA.md` §E-01. Same correction.** |
| `S10_step03 → S10_step04` | `.homecloud-photo-thumb` | `40×40 → 98×62` | `11px → 15px` |
| | `.homecloud-photo` | `248×81 → 118×128` and `248×58 → 118×128` | — |
| `S13_step00 → S13_step03` | `.s13-tech`, `.s13-tech-copy` | height `52 → 62`, `34 → 62`; copy width `62 → 133` | unchanged |
| `S15_step04 → S16_step00` | `.s16-idea` ("La misma pregunta.") | `260×110 → 540×60` | `110px → 56px` |
| `S16_step00 → S16_step01` | `.homi-persona` | `20 → 70` | — |
| | `.homi-proposal` | `28 → 134` | — |
| `S16_step01/02 → S16_step02/03` | `.homi-persona-name`/`.homi-persona-tag` | `49 → 55 → 57` | unchanged |
| `S16_step04 → S17_step00` | `.s17-line` | `60 → 119` | `56px → 54px` |
| | `.homi-proposal` | `250×27 → 248×134` | `20px → 19px` |
| `S18_step01 → S18_step02` | `.s18-team` | `scrollHeight 113 → 103` | unchanged |
| `S02_step06 → S03_step00` | `.ambient-glow.opening-stage-light` | `920×598 → 1120×728` | — |
| `S14_step04 → S15_step00` | `.s15-phone-motion` | `2×320 → 1280×720` | — |
| `S01_step00 … S01_step10` | `.attention-element` (×8) | `scrollWidth/scrollHeight` shift by 2–18 px per step | — |

Summary count: **43 of 84** consecutive state pairs contain at least one element that is present in both states and whose `clientWidth`, `clientHeight`, `scrollWidth`, `scrollHeight` or `font-size` changed.

### 5.5 Typography baseline (CONFIRMED)

Distinct logical `font-size` values observed among visible text nodes **inside the app surface**, per app screen:

| App surface | Font sizes (logical px, canvas scale 1.0) |
|---|---|
| `product-home-layer` (S01–S07) | `11,12,13,14,15,16,17,18,19,20,22,24,26,30` |
| `s08-screen-stack` | `11,12,13,13.5,14,17,19,21,24,26` |
| `s09-screen-fill` | `11,12,13,14,15,17,26,29` |
| `s10-screen-stack` | `11,12,13,16,17,18,20,22,26` |
| `s15-screen-fill` | `13,15,17,19,20` |
| `s16-screen-fill` | `13,14,15,19,20,24` |
| `s17-screen-fill` | `13,15,17,19,20` |

Smallest visible app text: **9 px** logical (2 states), then 11 px (36 states). Largest stage-side display type observed: `132px` logical. Full per-state font histogram in `data/enlargement.json`.

---

## 6. FORWARD / BACK RESTORATION

Full table: `data/restoration-table.md`. Method: after reaching `S18_step03`, traverse backward with `ArrowLeft`, capture a full probe at each state, then compare forward vs. backward state **by DOM path** (tag + sibling index chain, depth limit 40).

| Metric | Value |
|---|---|
| States compared | 85 / 85 |
| States with **any** differing element | **34 / 85** |
| States with a **visible-level** difference | **1 / 85** (`S06_step04`) |
| States where `.phone-frame` visual bounds differ | **0 / 85** |
| States where the deduped visible-text set differs | **0 / 85** |
| States with differing `scrollable`-node counts | 0 / 85 |
| States omitted from the table (fully identical) | 51 / 85 |

### RUNTIME RESTORATION DIFFERENCE #1 — the mounted-but-hidden family map layer

**CONFIRMED.** In 34 states the differences are confined to the `.family-map-stage` subtree, which lives inside `HomePlannerSequence` and is mounted with `opacity: 0` in every state where it is not the active content. Its resting geometry depends on **how the state was reached**:

- Reached forward from `S01`/`S02`/`S05` (e.g. `S01_step05`, `S04_step00`, `S05_step01`): the subtree sits at a **collapsed** box — `250 × 200` at `595,274.19`, or `240 × 192` at `596.8,285.62`, or a fully collapsed `0 × 0` / `25.6×22.4` placeholder — and `.family-map-stage` carries `transform: none`.
- Reached backward from `S06`/`S07` (e.g. `S07_step00`, `S04_step00` on the reverse pass): the same subtree carries `transform: matrix(1,0,0,1,0,0)` and sits at `250 × 200 @595,274.19`.
- Reached backward at `S06_step04` / `S06_step05` / `S07_step00`: the transform is `none` where it was `matrix(1,0,0,1,0,0)` going forward.

The single visible-level case is `S06_step04`: `.family-map-stage` has **identical** geometry in both directions (`250 × 200 @595,274.19`) but `transform: matrix(1,0,0,1,0,0)` forward vs. `transform: none` backward. `matrix(1,0,0,1,0,0)` is the identity, so the rendered pixels are the same; the difference is a residual inline transform, not a visible layout difference. Recorded as a difference because it was measured, not because it changes the frame.

**Element classes involved across the 34 states:** `family-map-stage`, `family-map-glow`, `family-map-surface`, `map-demo-screen`, `map-local-geometry`, `map-place`, `map-place-symbol`, `map-person`, `map-delay`, `map-sharing`, `svg`, `path`, `rect`, `circle`, `g`, `span`, `strong`.

**INFERENCE:** a leftover inline transform on a hidden, pre-mounted layer, accumulated as the traversal passes through `S06` in each direction. The consequence is bounded: `.phone-frame`, `.phone-frame-screen`, the app surface, all visible text, all scrollable-node counts and the `.presentation-canvas` box are identical in both directions in all 85 states. Not fixed, per brief.

---

## 7. HOLD TESTS

Method: reload the page, press `ArrowRight` the exact number of times to reach the target state, wait for `getAnimations()` to report every animation `finished`/`idle` + 2 rAF, then sample at **0 / 2500 / 5000 / 7500 / 10000 ms** and screenshot at 0 ms and at 10 000 ms. Samples include a SHA-1 of `#root` `innerHTML`, a SHA-1 of a geometry signature (box + opacity + transform + font-size of every element inside `.presentation-canvas`), the document scroll quadruple, and the count of running animations.

| Target | Reached state | `innerHTML` hash stable | geometry hash stable | doc scroll stable | running animations at each sample | Screenshots |
|---|---|---|---|---|---|---|
| Opening | `S01_step00` | yes (1 distinct hash) | yes | yes | `0,0,0,0,0` | `hold/Opening__S01_step00__t0.png`, `…__t10s.png` |
| Home | `S04_step03` | yes | yes | yes | `0,0,0,0,0` | `hold/Home__S04_step03__t0.png`, `…__t10s.png` |
| Planner | `S05_step02` | yes | yes | yes | `0,0,0,0,0` | `hold/Planner__S05_step02__t0.png`, `…__t10s.png` |
| Family | `S06_step03` | yes | yes | yes | `0,0,0,0,0` | `hold/Family__S06_step03__t0.png`, `…__t10s.png` |
| Finance | `S09_step04` | yes | yes | yes | `0,0,0,0,0` | `hold/Finance__S09_step04__t0.png`, `…__t10s.png` |
| Assets / HomeCloud | `S10_step04` | yes | yes | yes | `0,0,0,0,0` | `hold/Assets_HomeCloud__S10_step04__t0.png`, `…__t10s.png` |
| Homi | `S16_step04` | yes | yes | yes | `0,0,0,0,0` | `hold/Homi__S16_step04__t0.png`, `…__t10s.png` |
| Closing | `S18_step03` | yes | yes | yes | `0,0,0,0,0` | `hold/Closing__S18_step03__t0.png`, `…__t10s.png` |

**CONFIRMED:** in all 8 hold tests, nothing changes without input over 10 seconds. No timer-driven beat, no auto-advance, no idle animation, no drift.

---

## 8. OVERFLOW / SCROLL MATRIX

Full per-state matrix: §3 (`Internal overflow inside app`) and `data/state-table.csv`. Summary of every scroll/overflow surface measured at 1280×720.

### 8.1 Browser document

| Surface | `scrollWidth/clientWidth` | `scrollHeight/clientHeight` | States with overflow |
|---|---|---|---|
| `documentElement` | `1280 / 1280` | `720 / 720` | **0 / 85** |
| `body` (`overflow: hidden`) | `1280 / 1280` | `720 / 720` | **0 / 85** |
| `.presentation-viewport` (`overflow: hidden`) | `1280 / 1280` | `720 / 720` | **0 / 85** |

`documentElement.scrollTop/scrollLeft = 0` in all 85 states.

### 8.2 Presentation canvas — `.presentation-canvas { overflow: hidden }`

| `scrollWidth×scrollHeight` | States | Cause (measured) |
|---|---|---|
| `1280 × 720` (no overflow) | 78 | — |
| `1280 × 732` (+12 h) | `S08_step00`, `S08_step01`, `S08_step03`, `S13_step03`, `S14_step00`, `S14_step01`, `S14_step02`, `S14_step03` | `.s08-scene` / `.s14-stage` and their `.ambient-glow` children measure taller than the canvas |
| `1450 × 789` (+170 w, +69 h) | `S06_step01`, `S06_step02`, `S06_step03` | `.family-map-stage` at `1080 × 520` with `scrollWidth 1350` inside `.home-scene.home-planner-sequence` |
| `1443 × 786` | `S06_step00`, `S06_step04` | same subtree, pre/post-swap |

**CONFIRMED:** because `.presentation-canvas` is `overflow: hidden` and `html/body` are `overflow: hidden` with `overscroll-behavior: none`, **no scrollbar is reachable at any of the 85 states**. The excess is clipped, not scrollable. This is measured, not assumed.

### 8.3 Phone screen and app content

| Surface | `clientWidth×clientHeight` | `scrollWidth×scrollHeight` | States |
|---|---|---|---|
| `.phone-frame-screen` | `282 × 602` | `282 × 602` | **all 66 device-bearing states, identical** |
| app surface root (`product-home-layer`, `s08…s17-screen-fill/stack`) | `282 × 602` | `282 × 602` | all 66 |

### 8.4 Internal overflow inside the app surface (measured, per state)

| Element | Overflow | States |
|---|---|---|
| `.home-row-lead`, `.home-event-date` | `+0 h / +2 w` | `S01_step00` … `S07_step01` (37 states) |
| `.planner-panel-stack` | `+4 h / +0 w` | `S01_step00` … `S09_step04` (47 states) |
| `.inventory-workspace` | `+0 h / +12 w` | all 5 `S08` states |
| `.inventory-filters` | `+0 h / +28 w` | all 5 `S08` states |
| `.inventory-card` | `+41 h` (`S08_step00..03`), `+60 h` (`S08_step04`) | all 5 `S08` states |
| `.finance-hero-balance` | `+2 h / +0 w` | all 5 `S09` states |
| `.homi-confirm-zone` | `+10 h / +0 w` | `S15_step00..03` (4 states) |
| `.homi-thread` | `+0 h / +2 w` | all 5 `S16` states |
| `.homi-context`, `.homi-context-chips` | `+0 h / +18 w` | all 5 `S16` states |
| `.homi-decision-row` | `+10 h / +0 w` | `S17_step00`, `S17_step03` |
| `.map-demo-screen` | `+0 h / +44 w` and `+34 h / +44 w` while collapsed to `0 × 0` | `S01_step00` … `S05_step03` (mounted-hidden) |
| none | — | `S10` (all 5), `S11`–`S14`, `S18`, `S15_step04`, `S17_step01`, `S17_step02` |

All of these are clipped by `.phone-frame-screen { overflow: hidden }` and are not user-scrollable.

### 8.5 Clipping of visible elements by the canvas

| State | Clipped visible element | Box | Extent beyond canvas |
|---|---|---|---|
| `S03_step00` | `.ambient-glow.opening-stage-light` | `1120 × 728 @80,−14` | 80 px left, 14 px top |
| `S06_step01`, `S06_step02`, `S06_step03` | `.family-map-glow.ambient-glow` | `1620 × 858 @−170,−69` | 170 px left, 69 px top, 170 px right, 69 px bottom |

All other 81 states: **0 visible elements** escape the canvas box.

---

## 9. CANVAS / VIEWPORT MATRIX

All four viewports were walked through all 85 states. The logical canvas is **not** migrated: `clientWidth × clientHeight` of `.presentation-canvas` is `1280 × 720` in every viewport.

| Browser viewport | `PresentationFrame` scale (`transform`) | Canvas **box** on screen | Canvas `client` | Phone visual widths seen | Phone `offsetWidth×offsetHeight` | Phone screen visual width seen | Doc overflow states |
|---|---|---|---|---|---|---|---|
| **1280 × 720** | `matrix(1, 0, 0, 1, −640, −360)` | `1280 × 720 @ 0,0` | `1280 × 720` | `288, 300, 324` | `300 × 620` | `270.72, 282, 304.56` | 0 / 85 |
| **1920 × 1080** | `matrix(1.5, 0, 0, 1.5, −640, −360)` | `1920 × 1080 @ 0,0` | `1280 × 720` | `432, 450, 486` | `300 × 620` | `406.08, 423, 456.84` | 0 / 85 |
| **1600 × 900** | `matrix(1.25, 0, 0, 1.25, −640, −360)` | `1600 × 900 @ 0,0` | `1280 × 720` | `360, 375, 405` | `300 × 620` | `338.4, 352.5, 380.7` | 0 / 85 |
| **1440 × 900** (stress) | `matrix(1.125, 0, 0, 1.125, −640, −360)` | `1440 × 810 @ 0,45` | `1280 × 720` | `324, 337.5, 364.5` | `300 × 620` | `304.56, 317.25, 342.63` | 0 / 85 |

### 9.1 Proportional scaling or responsive reflow? — CONFIRMED: **pure proportional scaling**

Evidence, identical across all four viewports:

1. `scale = min(W/1280, H/720)` in every case: `1`, `1.5`, `1.25`, `1.125`. At `1440×900` the height is not the binding constraint (`900/720 = 1.25 > 1440/1280 = 1.125`), and the canvas is letterboxed vertically to `810` at `y = 45`, centred.
2. `.presentation-canvas` `clientWidth × clientHeight` is `1280 × 720` in all four — the layout box never changes.
3. `.phone-frame` `offsetWidth × offsetHeight` is `300 × 620` in all four.
4. The histogram of the smallest visible logical `font-size` per state is **byte-identical** across the four viewports: `{9:2, 11:36, 12:12, 13:16, 16:6, 20:2, 22:2, 24:4, 56:1, 64:1, 120:2}`. The set of distinct maximum sizes is also identical: `30,38,34,80,78,132,26,68,60,22,120,112,110,56,54,84,64,76`.
5. Every measured phone width is exactly the 1280×720 value × scale: `288×1.5 = 432`, `300×1.5 = 450`, `324×1.5 = 486`; `288×1.25 = 360`, `300×1.25 = 375`, `324×1.25 = 405`; `288×1.125 = 324`, `300×1.125 = 337.5`, `324×1.125 = 364.5`.
6. Count of visible elements escaping the canvas box is `0` or `1` at 1280×720 / 1920×1080 / 1600×900, and `1` or `2` at 1440×900 (the same glow bleeds, measured against the letterboxed canvas box).

**INFERENCE:** there is no responsive or reflow behaviour anywhere in the presentation. Viewport size changes only the projected size of the fixed 1280×720 stage. Composition per state is therefore identical at every viewport; only its pixel size changes.

Screenshots for the viewport matrix: `viewport/<W>x<H>__<state>.png` for `S01_step00`, `S04_step00`, `S06_step03`, `S09_step04`, `S10_step04`, `S15_step00`, `S18_step03` at each of the four sizes (28 files).

---

## 10. SCRIPT BEAT MAP

Source: `C:\Users\thega\Downloads\Guion Compartido (2).md` (497 lines).

### 10.1 Structure as authored (CONFIRMED)

- 4 cast entries: **Colo**, **Gaby**, **Benja**, **Ber**. `Ber` is declared and never assigned a block.
- 13 speaker/scene blocks marked with `**…**`, plus 10 `**bold**` in-scene emphasis lines and 9 bracketed `[…]` production notes.
- **267 non-empty, non-bracketed, non-heading spoken lines** across those blocks.

### 10.2 Block → current slide / step map

The mapping column is an **INFERENCE** from block content vs. slide names and visible on-stage text. It is recorded as evidence for Sessions 2–5, not as a verdict.

| # | Guion block (line) | Speaker | Spoken lines | Current slide | Current steps | Beats per step (avg) |
|---|---|---|---|---|---|---|
| 1 | `Entrada y presentacion de el producto : Colo` (L13) | Colo | 48 (L15–L61) | `S01 Chaos`, `S02 Fragmented Info`, `S03 HomePlus` | `S01_step00…10`, `S02_step00…06`, `S03_step00` | 48 / 19 ≈ **2.5** |
| 2 | `Gaby: Home+Planner+ ¿como gano autonomia? --> Family` (L63) | Gaby | 38 (L65–L129) | `S04 Home`, `S05 Planner`, `S06 Family` | `S04_step00…05`, `S05_step00…03`, `S06_step00…05` | 38 / 16 ≈ **2.4** |
| 3 | `Infra:Plan --> Inventory` (L141) | Infra | 21 (L144–L174) | `S08 Plans Inventory` | `S08_step00…04` | 21 / 5 = **4.2** |
| 4 | `Gaby:Finance` (L178) | Gaby | 26 (L180–L230) | `S09 Finance` | `S09_step00…04` | 26 / 5 = **5.2** |
| 5 | `Infra:Assets --> Homecloud` (L232) | Infra | 26 (L234–L269) | `S10 Assets HomeCloud` | `S10_step00…04` | 26 / 5 = **5.2** |
| 6 | `Colo:Continuidad` (L273) | Colo | 20 (L275–L298) | `S11 Continuity` | `S11_step00…02` | 20 / 3 ≈ **6.7** |
| 7 | `Benja:Stack Tecnico` (L302) | Benja | 13 (L304–L320) | `S12 Frontend Backend`, `S13 Stack` | `S12_step00…02`, `S13_step00…03` | 13 / 7 ≈ **1.9** |
| 8 | `Infra:Friccion` (L328) | Infra | 11 (L330–L343) | `S14 Barrier` | `S14_step00…04` | 11 / 5 = **2.2** |
| 9 | `Benja : Presentacion de GENI` (L347) | Benja | 11 (L349–L365) | `S15 HOMI Action` | `S15_step00…04` | 11 / 5 = **2.2** |
| 10 | `Gaby: Continuacion de Geni` (L367) | Gaby | 27 (L369–L421) | `S16 HOMI Context` | `S16_step00…04` | 27 / 5 = **5.4** |
| 11 | `Benja : Control Humano` (L423) | Benja | 11 (L425–L440) | `S17 Human Control` | `S17_step00…03` | 11 / 4 ≈ **2.8** |
| 12 | `Gaby : Cierre parte 1` (L444) | Gaby | 7 (L446–L458) | `S18 Closing` (first part) | `S18_step00…01` | 7 / 2 = **3.5** |
| 13 | `Colo : Cierre parte 2` (L460) | Colo | 28 (L462–L497) | `S18 Closing` (second part) | `S18_step02…03` | 28 / 2 = **14** |

Observed totals: 267 spoken lines, 85 states, global mean **3.14 spoken lines per state**. Per-block means range from **1.9** (block 7) to **14** (block 13). Recorded as measurement only.

### 10.3 Script markers with no corresponding current slide (CONFIRMED absence of a dedicated state)

The script carries 9 bracketed production notes. Which scene each one landed on, as measured:

| Guion marker | Line | Nearest current slide |
|---|---|---|
| `[Screen nega]` | L16 | `S01` (dark stage, `#0B0908`) |
| `[Van apareciendo los items]` | L19 | `S01_step01…step10` (8 fragments accumulate) |
| `[Aca ya aparecen los miles de ejemplos]` | L22 | `S01_step09` ("Ya lo hice yo") |
| `[Diapositiva de la informacion ya existia]` | L37 | `S02 Fragmented Info` |
| `[aca deberia haber una screen negra]` | L41 | no dedicated black-only state; `S02`/`S03` carry content at that moment |
| `[aca deberia haber una donde dice homeplus y el logo]` | L46 | `S03 HomePlus` (`S03_step00`) |
| `[aca va la de un cumpleaños no es solo un evento]` | L143 | `S08 Plans Inventory` |
| `[aca arranca la del dinero es un hogar]` | L176 | `S09 Finance` (`S09_step00`) |
| `[aca va la de continuidad …]` / `[aca va la de frontend backend]` / `[aca va la de tecnologias]` / `[Aca va la de friccion]` | L271, L300, L312, L327 | `S11`, `S12`, `S13`, `S14` |
| `[Aca va la que arranca geni]` | L345 | `S15 HOMI Action` |
| `[Aca deberia haber una screen negra que aparece hasta que el colo termina de hablar]` | L442 | `S18` (`S18_step00` onward; `.motion-blackout` primitive exists in `index.css`) |

### 10.4 Assistant name — CONFIRMED SCRIPT ISSUE

| Where | Occurrences |
|---|---|
| `presentationConfig.ts` `assistantName` | `HOMI` |
| Rendered on stage (`S15`, `S16`, `S17` visible text) | `Homi`, `Pedile algo a Homi…`, `Asistente del hogar`, `¿En qué te ayudo?` — **only** `Homi` |
| `src/**` case-sensitive search for `Geni` | **0 matches** |
| `Guion Compartido (2).md` | `Geni`/`GENI` at **L347, L349, L356, L365, L367, L431, L438, L446** (8 lines) · `Homi` at **L371, L379, L405, L415** (4 lines) |

**CONFIRMED:** the stage is unambiguous — one assistant, named **HOMI**, in two casings (`HOMI` in slide names, `Homi` in the app UI). The dual naming exists **only in the script**, which mixes both inside blocks 9–12. This is a script defect. Not corrected here.

---

## 11. HUMAN HYPOTHESIS EVIDENCE LINKS

Source: `audit/00_HUMAN_HYPOTHESES.md`. **91 unique ids** are present: `HW-A-*` 11, `HW-B-*` 20, `HW-C-*` 7, `HW-D-*` 7, `HW-E-*` 11, `HW-F-*` 1, `HW-G-*` 10, `HW-H-*` 4, `HW-I-*` 16, `HW-J-*` 3 (`HW-J-000`, `HW-J-001`, `HW-J-002`), `HW-X-000` 1. `HW-X-000` is documented in that file as reserved for the global verdict, so **89 substantive hypotheses** — consistent with the brief's "approximately 89".

**No PASS/FAIL is assigned here.** Only the screenshot that shows the state a hypothesis names.

| Group | Hypotheses | Slide / step named by the hypothesis file | Evidence screenshots |
|---|---|---|---|
| A | `HW-A-001` … `HW-A-011` (11) | opening, no slide named | `states/S01_step00.png` … `states/S01_step10.png`, `states/S02_step00.png` … `states/S02_step06.png`, `states/S03_step00.png` |
| B | `HW-B-001` … `HW-B-004` (4) | `S04 t0`, `S04 t1→t4`, `S04 t2` | `states/S04_step00.png` … `states/S04_step05.png` |
| B | `HW-B-005` … `HW-B-010` (6) | `S05`, `S05 header`, `S05 calendario`, `S05 planes` | `states/S05_step00.png` … `states/S05_step03.png` |
| B | `HW-B-011` … `HW-B-017` (7) | `S05→S06`, `S06`, `S06 mapa`, `S06 feed` | `states/S06_step00.png` … `states/S06_step05.png` |
| B | `HW-B-018` … `HW-B-020` (3) | `S06→S07`, `S07` | `states/S07_step00.png`, `states/S07_step01.png` |
| C | `HW-C-001` … `HW-C-004` (4) | `S08 t0`, `S08`, `S08 t?`, `S08→S09` | `states/S08_step00.png` … `states/S08_step04.png`, `states/S09_step00.png` |
| C | `HW-C-005`, `HW-C-006` (2) | `S09 t0`, `S09` | `states/S09_step00.png` … `states/S09_step04.png` |
| C | `HW-C-007` (1) | `S09→S10` | `states/S09_step04.png`, `states/S10_step00.png` |
| D | `HW-D-001` (1) | `S09 (final)` | `states/S09_step04.png` |
| D | `HW-D-002` … `HW-D-007` (6) | `S10 t0`, `S10`, `S10 completo` | `states/S10_step00.png` … `states/S10_step04.png` — **note: the hypothesis file names `S10` for the Finance block; the current slide at that position is `S09 Finance`, and `S10` is `Assets HomeCloud`. Recorded as a coordinate mismatch, not adjudicated.** |
| E | `HW-E-001` (1) | `S10→S11` | `states/S10_step04.png`, `states/S11_step00.png` |
| E | `HW-E-002` … `HW-E-011` (10) | `S11 t0`, `S11 t1`, `S11` | `states/S11_step00.png`, `states/S11_step01.png`, `states/S11_step02.png` — **note: `S11 Continuity` carries no phone on stage and only 8 DOM nodes; see §3.** |
| F | `HW-F-001` (1) | `S11 t0–t2` | `states/S11_step00.png`, `states/S11_step01.png`, `states/S11_step02.png` |
| G | `HW-G-001` … `HW-G-003` (3) | `S12 t0`, `S12` | `states/S12_step00.png` … `states/S12_step02.png` |
| G | `HW-G-004` … `HW-G-009` (6) | `S13` | `states/S13_step00.png` … `states/S13_step03.png` |
| G | `HW-G-010` (1) | `S14 t0` | `states/S14_step00.png` |
| H | `HW-H-001` … `HW-H-004` (4) | `S14` | `states/S14_step00.png` … `states/S14_step04.png` |
| I | `HW-I-001` … `HW-I-005` (5) | `S15 t0`, `S15 t1`, `S15 t2`, `S15 fin` | `states/S15_step00.png` … `states/S15_step04.png` |
| I | `HW-I-006` … `HW-I-012` (7) | `S16 t0`, `S16 t1`, `S16 t2`, `S16 t3`, `S16 t4` | `states/S16_step00.png` … `states/S16_step04.png` |
| I | `HW-I-013` … `HW-I-016` (4) | `S17 t0`, `S17 t1`, `S17 t2`, `S17→S18` | `states/S17_step00.png` … `states/S17_step03.png`, `states/S18_step00.png` |
| J | `HW-J-000`, `HW-J-001`, `HW-J-002` (3) | `S18 t0–t3` | `states/S18_step00.png` … `states/S18_step03.png` |
| X | `HW-X-000` (1) | reserved for the global verdict | not applicable in Session 1 |

Attachment rule applied: only where the hypothesis file itself names a slide or step. No hypothesis was adjudicated.

---

## 12. CONSOLE / RUNTIME ERRORS

| Capture run | `console` errors | `console` warnings | `pageerror` (uncaught) | `requestfailed` |
|---|---|---|---|---|
| Forward walk, 85 states | **0** | **0** | **0** | **0** |
| Backward walk, 85 states | **0** | not captured | **0** | **0** |
| Motion capture, 84 transitions × 5 frames | **0** | not captured | **0** | **0** |
| Viewport matrix, 4 × 85 states | **0** | not captured | **0** | **0** |
| Hold tests, 8 × 10 s | **0** | not captured | **0** | **0** |
| **Total** | **0** | **0** | **0** | **0** |

Non-fatal runtime observations recorded during the walk:

- The Vite dev server logged `Re-optimizing dependencies because vite config has changed` once at startup. This rewrote `node_modules/.vite/**`. `node_modules` is excluded from the integrity manifest (§15); `package.json` and both lockfiles are inside the manifest and are unchanged.
- Vite emitted the `configLoader: 'native'` future-compat warning described in §1.4.
- `.presentation-dev` readout exists behind `?dev=1` (`Presentation.tsx`). It was **not** enabled during capture, so no screenshot contains it.

---

## 13. EVIDENCE GAPS AND MEASUREMENT DEFECTS

### 13.1 Defects found in the measurement method itself (fixed before acceptance)

| Id | Defect | Effect | Resolution |
|---|---|---|---|
| **D1** | The DOM-path key used for element identity was truncated at depth 12, so all nodes deeper than 12 levels shared one path. | Element-by-element diffing produced false positives (e.g. `25–42` "moved" SVG nodes per state) and false absences. | Depth limit raised to 40; forward walk, backward walk and both analyses **re-run from scratch**. The 34-state restoration result in §6 is the post-fix result. The earlier 31-state figure is discarded. |
| **D2** | First-pass keys were `tag.class|text`, which collides across all SVG primitives (`path.`, `rect.`, `svg.` all had empty class and text). | Same as D1 for the motion capture. | Motion capture re-run with a structural index key `tag.class[0.1.2…]` + text prefix. §4 numbers are post-fix. |
| **D3** | Font sizes were sorted with `Number("12px")` → `NaN`. | Typography table in §5.5 unusable on first pass. | Re-parsed with `parseFloat`. |

### 13.2 Known limits of this evidence base

| Id | Gap |
|---|---|
| **G1** | **Port.** All captures were made on `http://127.0.0.1:8444/` because `8443` was held by an out-of-namespace listener. No geometric conclusion depends on the port, but no capture was made on the declared port. |
| **G2** | **Path.** The audited package is one level below the path asserted as current. If a second presentation package exists elsewhere, it was not found and not audited. |
| **G3** | **Motion probe coverage.** The motion sampler only tracks elements that have a non-`none` transform, `opacity < 1`, or a class matching `phone|demo-screen|presentation-canvas|presentation-scene|attention-element`. Elements outside that filter are absent from `layoutChanged`. Concretely: `S05_step01 → S05_step02` reports `layoutChanged = 0` in §4.3, while the stable-state scan in §5.4 measures `.planner-tab` "Calendario" `clientWidth 82 → 137` for the same transition. **§4.3 must be read with §5.4; §4.3's `0` for that transition is a coverage limit, not proof of stability.** ⚠ **SUPERSEDED in part by Session 2:** the §5.4 figure cited here (`82 → 137`) is invalid — the Planner tabs do **not** resize; canonical max observed width is **84 px** and the selection pill translates. See `01_RUNTIME_BASELINE_ERRATA.md` §E-01 and `00_AUDIT_NORMALIZATION.md` §N-02. The G3 coverage-limit finding itself stands. |
| **G4** | **Feature-claim adjudication was not performed.** No slide was found to display a functional control that is absent from the presentation itself, so Integration / Product Truth was not consulted, per §25 of the brief. This is an absence of adjudication, not an absence of risk: the audit did not check any on-stage claim against `Family-Hub-Own-integration`. Session 5 territory. |
| **G5** | **No audio.** No narration, timing or AV sync was measured. The presentation has no audio path in `package.json` or `src/`. |
| **G6** | **Frame timing is sampled, not captured.** Motion is evidenced at 5 instants per transition, not as video. Inter-frame behaviour (easing shape, overshoot, stagger order) is not observable by this method. |
| **G7** | **Single browser engine.** Headless Chromium 1243 only. No WebKit/Firefox, no headed run, no real projector, no `prefers-reduced-motion` variant was exercised even though a `prefers-reduced-motion` block exists in `index.css`. |
| **G8** | **No interaction was exercised.** The presentation exposes no pointer affordances; only keyboard advance was tested. Click/tap/hover behaviour is untested. |
| **G9** | **`Ber` has no script block**, so no state can be attributed to that speaker. The block→slide map in §10.2 covers 13 blocks against 18 slides; `S07` and `S11`–`S14`, `S18` have no 1:1 block of their own and were mapped by proximity. |
| **G10** | **Coordinate mismatch in the hypothesis file.** `HW-D-002` … `HW-D-007` name `S10` for the Finance block; the current `S09` is Finance and `S10` is Assets HomeCloud. Either the hypothesis file's coordinates predate a renumbering, or the block mapping in §10.2 is wrong. **Unresolved — DECISION required.** |

### 13.3 Not done, by design

- No aesthetic comparison, no quality verdict, no redesign proposal (§28).
- No Figma-app runtime harvest (§24). Figma-app was not compared to the stage.
- No Integration launch (§25).
- No production file was modified, so nothing in the presentation was changed to make a measurement succeed (§0).

---

## 14. FILES WRITTEN

All under `C:\Users\thega\Desktop\HomeplusPresentacion01\HomePlus_Presentacion_FINAL\audit\`. Total ≈ **74 MB**.

### 14.1 Report

```
audit/01_RUNTIME_BASELINE.md
```

### 14.2 Screenshots — 214 PNG

```
audit/runtime/session-01/states/        85   S01_step00.png … S18_step03.png   (forward, 1280×720)
audit/runtime/session-01/states-back/   85   same names                          (backward, 1280×720)
audit/runtime/session-01/viewport/      28   <W>x<H>__<state>.png               (4 viewports × 7 states)
audit/runtime/session-01/hold/          16   <label>__<state>__t0.png / __t10s.png  (8 states × 2)
```

Plus two recon artefacts: `audit/runtime/session-01/_recon_S01_step00.png`, `_recon.json`.

### 14.3 Measurement data — 15 files

```
audit/runtime/session-01/data/walk-forward.json        full probe + full element inventory, 85 states
audit/runtime/session-01/data/walk-back.json           same, backward
audit/runtime/session-01/data/restoration.json         forward/back element-level diff, 85 rows
audit/runtime/session-01/data/restoration-table.md     rendered §6 table
audit/runtime/session-01/data/motion.json              84 transitions × 5 frames, raw
audit/runtime/session-01/data/motion-summary.json      per-transition diff + container deltas
audit/runtime/session-01/data/enlargement.json         per-state enlargement metrics
audit/runtime/session-01/data/app-surface-metrics.json per-state app-surface geometry, fonts, overflow
audit/runtime/session-01/data/viewport-matrix.json     4 viewports × 85 states
audit/runtime/session-01/data/hold.json                8 hold tests × 5 samples
audit/runtime/session-01/data/state-index.json         compact per-state index
audit/runtime/session-01/data/state-table.csv          flat CSV of the same
audit/runtime/session-01/data/index-table.md           rendered §3 table (85 rows)
audit/runtime/session-01/data/text-index.json          per-state visible text
audit/runtime/session-01/data/text-table.md            rendered text table
audit/runtime/session-01/data/_probe-defects.txt       note recording D1–D3
```

### 14.4 Tooling, logs, integrity

```
audit/runtime/session-01/_tooling/     15 files   pw.mjs probe.mjs walk.mjs walk-back.mjs motion.mjs
                                                hold.mjs viewport.mjs recon.mjs analyze.mjs analyze2.mjs
                                                analyze3.mjs analyze4.mjs analyze5.mjs tables.mjs
                                                substitute.mjs
audit/runtime/session-01/_logs/         2 files    dev.out.log  dev.err.log
audit/runtime/session-01/_integrity/    2 files    manifest-before.csv  manifest-after.csv
```

**Total files written by this session: 250**, all under `audit/` (§14.1 report + §14.2 216 PNG/JSON + §14.3 15 data + §14.4 19 tooling/logs/integrity).

---

## 15. PRODUCTION FILES MODIFIED

# NONE

Verified by SHA-256 manifest comparison, because this package is **not** a git repository (no `.git` directory exists anywhere under `HomeplusPresentacion01`; `git status` is therefore not available as evidence).

Manifest scope: every file under the package root except `node_modules/`, `audit/`, `.agents/`. That covers `src/**` (100 files), `assets/**`, `dist/**`, `index.html`, `package.json`, `package-lock.json`, `pnpm-lock.yaml`, `vite.config.ts`, `tsconfig.json`, `.mise.toml`, `.gitignore`, `.gitattributes`, `.figma/**`, `skills-lock.json`, `ABRIR_PRESENTACION.bat`, `LEEME.txt`, `audit-input/**`.

| Metric | Before | After |
|---|---|---|
| Files in manifest | 159 | 159 |
| Total bytes | 2 572 474 | 2 572 474 |
| Files added | — | **0** |
| Files removed | — | **0** |
| Files with changed SHA-256 | — | **0** |
| Files with changed `lastWriteTimeUtc` but identical SHA-256 | — | **0** |

Evidence: `_integrity/manifest-before.csv`, `_integrity/manifest-after.csv` (path, length, UTC timestamp, SHA-256 per file). The `before` manifest was taken before the dev server was started.

Adjacent trees, both untouched by this session:

- `C:\Users\thega\Desktop\Figma-app` — no write of any kind. (Its own dev server was already dead before this session began; see §1.7.)
- `C:\Users\thega\Desktop\homeplus-worktrees\Family-Hub-Own-integration` — not opened, not launched, not written.

**One process is still running:** the presentation dev server started for this audit, `PORT=8444 npm run dev`, listening on `0.0.0.0:8444` (PID as reported by `netstat`, log at `audit/runtime/session-01/_logs/dev.out.log`). No process was killed. Stop it at will.

---

## 16. VERIFICATION

Performed per `verifying-before-completion`: every claim above is backed by a command that was run and whose output was read.

| # | Claim | Command that proves it | Result |
|---|---|---|---|
| 1 | Presentation family is React + Vite + TypeScript, S01–S18, 85 steps, 1280×720 | Read `package.json`, `vite.config.ts`, `tokens.ts`, `presentationConfig.ts` | matches all six markers (§1.2) |
| 2 | 85 states reachable forward | `node _tooling/walk.mjs 1280 720` | `STATES=85` |
| 3 | 85 states reachable backward | `node _tooling/walk-back.mjs` | `BACK STATES=85` |
| 4 | 85 forward screenshots exist | `Get-ChildItem states` | 85 files, `S01_step00.png` … `S18_step03.png` |
| 5 | 85 backward screenshots exist | `Get-ChildItem states-back` | 85 files |
| 6 | Zero console/pageerror/requestfailed | counters printed by `walk.mjs`, `walk-back.mjs`, `motion.mjs`, `viewport.mjs`, `hold.mjs` | `ERRORS=0` in all five runs; forward walk also `WARNINGS=0` |
| 7 | Phone layout is constant `300×620` and screen `282×602` across all device states | `data/app-surface-metrics.json`, `data/index-table.md` | identical in all 66 device-bearing states, forward and backward |
| 8 | No local visual focus zoom exists | `maxScale` column of `data/index-table.md` | max element scale = `1.08`, and that value is always the phone frame |
| 9 | 34 states differ forward/back, 1 at visible level | `data/restoration.json`, `data/restoration-table.md` | `diffStates 34`, `visStates 1`; phone bounds differ in 0; visible text differs in 0 |
| 10 | Nothing moves during a 10 s hold | `node _tooling/hold.mjs` | 8/8 with `htmlStable=true geomStable=true docStable=true`, `runningAnimations=[0,0,0,0,0]` |
| 11 | Scaling is purely proportional, not responsive | `data/viewport-matrix.json` | identical font histograms and `canvasClient 1280×720` at all four viewports; every phone width = base × scale |
| 12 | Document never scrolls | `documentElement.scrollTop/Left` in every probe | 0 in all 85 states, forward and backward |
| 13 | The only visible clipping is 4 states | `clippedVisible` in `data/index-table.md` | `S03_step00`, `S06_step01..03`, all ambient glows |
| 14 | Stage renders real content, not a blank frame | screenshots read back: `states/S06_step03.png`, `states/S09_step04.png`, `states/S10_step04.png`, `states/S15_step00.png` | device, map, Finance, HomeCloud and `Homi` all render with legible text |
| 15 | Stage uses one assistant name | visible-text index + case-sensitive search of `src/**` for `Geni` | `HOMI`/`Homi` only; **0** matches for `Geni` in source; `Geni` appears only in the guion (8 lines) |
| 16 | No production file was modified | SHA-256 manifest before/after | 159/159 files, 0 added, 0 removed, 0 content changes, 0 timestamp changes |
| 17 | Writes were confined to `audit/**` | every `write`/`edit` target in this session | all under `…\HomePlus_Presentacion_FINAL\audit\` |

**Claim not made:** nothing in this document asserts that the presentation is good, bad, ugly, readable, oversized, correct or incorrect. No such measurement exists yet, and none is implied by any number above.

---

## 17. GO / NO-GO FOR SESSION 2

### Result: **GO**, with three items the user must decide first.

**Evidence base is complete and reproducible.** 85/85 states forward, 85/85 backward, 214 screenshots, 420 motion frames, 8 hold tests, 4 viewports × 85 states, 0 runtime errors, 0 production changes. Nothing in §13.2 blocks the quality sessions: G1–G3 are method notes with known boundaries, G4–G10 are explicitly deferred by the brief's own scoping.

### DECISIONS REQUIRED BEFORE SESSION 2

| # | Decision | Why it cannot be decided here |
|---|---|---|
| **1** | **Presentation path.** Is `…\HomeplusPresentacion01\HomePlus_Presentacion_FINAL` the current presentation, or is the brief's "directly contains" authoritative and a path is missing? | §1.1. If another package exists, this entire baseline describes the wrong artifact. |
| **2** | **Port 8443.** Should the audit keep using `PORT=8444`, or should the owner of the 8443 listener be identified so the presentation can run on its declared port? | §1.4. The listener is outside this session's process namespace. |
| **3** | **Hypothesis coordinates.** `HW-D-002`…`HW-D-007` point at `S10` for the Finance block, but `S09` is Finance. Renumber the hypothesis file, or accept the offset? | §13.2 G10. Affects every later human-hypothesis cross-reference. |

### What Session 2 now has that it did not have

The two facts that will make the quality discussion defensible, both measured rather than argued:

1. **There is currently no focus zoom to evaluate.** The largest transform anywhere on stage is the device's own `1.08`; the app's layout box is `282 × 602` in all 66 device states. Any future "make the UI readable on stage" work starts from a device that is *already* at three different stage sizes with a stable internal layout — that is the lever the brief's §6/§8 describe, and it already exists.
2. **Where readability is currently bought with layout instead of framing, the measurements are already on record**: the family map at `S06_step01–03` (`250×200 → 1080×520`, type `15px → 41.04px`, canvas `1280×720 → 1450×789`), the inventory rows at `S08_step03→04` (type `19→21px`, `12→13.5px`, `11→12px`), the HomeCloud thumbs at `S10_step03→04` (`40×40 → 98×62`, type `11→15px`), ~~the Planner tab at `S05_step01→02` (`clientWidth 82 → 137`)~~ **← SUPERSEDED, see `01_RUNTIME_BASELINE_ERRATA.md` §E-01 and `00_AUDIT_NORMALIZATION.md` §N-02: the Planner tab does NOT resize. Canonical max observed width is 84 px and the selection pill translates. Do not cite `82 → 137` from this bullet**, and the stage display type at `S16_step04→S17_step00` (`110px → 56px`, box `260×110 → 540×60`).

Those are measurements. Session 2 decides what they mean.

### Explicitly not started

Session 2 has not begun. No presentation source was modified. No redesign, no fix, no copy change, no motion change, no commit, no branch, no stash, no reset.

---

**END OF SESSION 1 — RUNTIME EVIDENCE BASELINE**