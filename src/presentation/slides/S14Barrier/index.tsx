/**
 * S14 Friction Editorial V6.0 — scene host.
 *
 * Seven operable narrative states (§22), stepIndex 0..6, stepCount = 7.
 * Each step owns ONE local timeline: a single rAF loop samples
 * `sampleStep(step, t)` and every layer renders purely from that snapshot
 * (§24.2). Mount = replay from t=0. Unmount = cancel + dismount every track
 * (§24.4). Direct jumps and PREVIOUS reconstruct from a known snapshot.
 *
 * Data safety (§27): fixtures are read-only; the CTA never fires; the date
 * selection only flips scenic state. No POST/PUT/delete anywhere.
 *
 * Handoff (§6): S14 step 0 fades the horizontal EditorialSurface in from
 * stage black (isolated adapter). No Frontend/Backend panels are remounted,
 * no Stack content is reinvented. If S13 still ends on tech panels, the
 * standard slide cut lands here — reported as integration point, not
 * papered over with invented Stack scenery.
 */

import { useEffect, useRef, useState } from 'react'
import type { MasterRect } from './geometry'
import { sampleStep, freezeTimeParam, stepDuration, win, type StepSnapshot } from './timeline'
import {
  EditorialSurface,
  EditorialContent,
  EditorialHome,
  PlannerList,
  TaskIntentPreview,
  SharedTaskTitle,
  EditorialTaskForm,
  EditorialAssets,
  SharedAssetAvatar,
  SharedAssetTitle,
  EditorialAssetDetail,
  QuestionStage,
} from './editorial'
import './s14-editorial.css'

/* ---------------- local clock (§24.2) ---------------- */

function useLocalClock(step: number, duration: number, frozen: number | null): number {
  const [now, setNow] = useState<number>(frozen ?? 0)
  useEffect(() => {
    if (frozen !== null) {
      setNow(Math.min(frozen, duration))
      return
    }
    let raf = 0
    const t0 = performance.now()
    const tick = (t: number): void => {
      const e = Math.min(duration, t - t0)
      setNow(e)
      if (e < duration) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [step, duration, frozen])
  return now
}

/* ---------------- geometry audit (dev only, §25/§29.1) ----------------
 * Compares declared TARGET rects (data-expect="x,y,w,h" master) against
 * real DOM boxes at HOLD. Identity transforms and fully transparent nodes
 * are skipped. Results on window.__S14_AUDIT__ + console summary. */

function isIdentityTransform(value: string): boolean {
  if (value === 'none') return true
  const m = value.match(/matrix\(([^)]+)\)/)
  if (!m) return false
  const v = m[1].split(',').map(Number)
  if (v.length !== 6 || v.some(n => !Number.isFinite(n))) return false
  const [a, b, c, d, e, f] = v
  return Math.abs(a - 1) < 1e-3 && Math.abs(d - 1) < 1e-3
    && Math.abs(b) < 1e-3 && Math.abs(c) < 1e-3
    && Math.abs(e) < 0.6 && Math.abs(f) < 0.6
}

function useGeometryAudit(
  stageRef: React.RefObject<HTMLDivElement | null>,
  step: number,
  settled: boolean,
) {
  useEffect(() => {
    if (!settled) return
    if (typeof window === 'undefined') return
    if (new URLSearchParams(window.location.search).get('dev') !== '1') return
    const stage = stageRef.current
    if (!stage) return
    try {
      const stageBox = stage.getBoundingClientRect()
      const s = stageBox.width / 1280
      if (!Number.isFinite(s) || s <= 0) return
      const rows: { key: string; dx: number; dy: number; dw: number; dh: number; max: number }[] = []
      stage.querySelectorAll('[data-expect]').forEach(el => {
        const raw = (el as HTMLElement).dataset.expect
        if (!raw) return
        const parts = raw.split(',').map(Number)
        if (parts.length !== 4 || parts.some(n => !Number.isFinite(n))) return
        const [x, y, w, h] = parts as [number, number, number, number]
        const cs = window.getComputedStyle(el as Element)
        if (Number(cs.opacity) < 0.05 || !isIdentityTransform(cs.transform)) return
        let p: Element | null = el as Element
        let blocked = false
        while (p && p !== stage) {
          const t = window.getComputedStyle(p).transform
          if (!isIdentityTransform(t) && p !== (el as Element)) { blocked = true; break }
          p = p.parentElement
        }
        if (blocked) return
        const box = (el as HTMLElement).getBoundingClientRect()
        if (box.width < 1 || box.height < 1) return // dismounted/hidden layer
        const ex = stageBox.left + (x * 2) / 3 * s
        const ey = stageBox.top + (y * 2) / 3 * s
        const ew = (w * 2) / 3 * s
        const eh = (h * 2) / 3 * s
        const dx = Math.abs(box.left - ex) / s
        const dy = Math.abs(box.top - ey) / s
        const dw = Math.abs(box.width - ew) / s
        const dh = Math.abs(box.height - eh) / s
        rows.push({ key: `${(el as HTMLElement).className} [${raw}]`, dx, dy, dw, dh, max: Math.max(dx, dy, dw, dh) })
      })
      const worst = rows.reduce((m, r) => Math.max(m, r.max), 0)
      const over = rows.filter(r => r.max > 2)
      const ranked = [...rows].sort((a, b) => b.max - a.max).slice(0, 10)
      ;(window as unknown as { __S14_AUDIT__: unknown }).__S14_AUDIT__ = { step, checked: rows.length, worstRuntimePx: worst, over, ranked }
      // eslint-disable-next-line no-console
      console.info(`[S14-V6] geometry audit step=${step} checked=${rows.length} worst=${worst.toFixed(2)}rt-px over2px=${over.length}`, over.slice(0, 12))
    } catch {
      /* audit is progressive enhancement; never break the scene */
    }
  }, [stageRef, step, settled])
}

/* ---------------- step scenes ---------------- */

function clamp01(v: number): number {
  return Math.min(1, Math.max(0, v))
}

function SceneStep0({ snap }: { snap: StepSnapshot }) {
  return (
    <EditorialSurface surfaceIn={snap.surfaceIn}>
      <EditorialContent>
        <EditorialHome secondaryDim={0} />
      </EditorialContent>
    </EditorialSurface>
  )
}

function SceneStep1({ snap }: { snap: StepSnapshot }) {
  return (
    <EditorialSurface surfaceIn={1}>
      <EditorialContent>
        <EditorialHome secondaryDim={snap.secondaryDim} />
      </EditorialContent>
    </EditorialSurface>
  )
}

function SceneStep2({ snap }: { snap: StepSnapshot }) {
  const showPlanner = snap.plannerIn > 0
  const showPreview = snap.previewIn > 0 && snap.morph <= 0
  const showForm = snap.morph > 0
  const showFlight = snap.titleShared > 0 && snap.titleShared < 1
  return (
    <EditorialSurface surfaceIn={1}>
      <EditorialContent>
        {snap.homeOut < 1 ? (
          <div style={{ opacity: 1 - snap.homeOut }}>
            <EditorialHome secondaryDim={1} />
          </div>
        ) : null}
        {showPlanner ? (
          <div
            style={{
              // M01 (§10.3): Planner context retires as the morph begins,
              // fully gone well before the form establishes.
              opacity: 1 - clamp01(snap.morph / 0.35),
              display: snap.morph >= 1 ? 'none' : undefined,
            }}
          >
            <PlannerList entry={snap.plannerIn} listDim={snap.listDim} plusPulse={snap.plusPulse} />
          </div>
        ) : null}
        {showPreview ? <TaskIntentPreview progress={snap.previewIn} /> : null}
        {showForm ? (
          <EditorialTaskForm
            morph={snap.morph}
            titleShared={snap.titleShared}
            metaSplit={snap.metaSplit}
            fieldsIn={snap.fieldsIn}
            ctaIn={snap.ctaIn}
            pickerOpen={snap.pickerOpen}
            dateIsManana={snap.dateIsManana}
          />
        ) : null}
        {/* Shared instance paints ABOVE destination surface (§25.2). */}
        {showFlight ? <SharedTaskTitle progress={snap.titleShared} /> : null}
      </EditorialContent>
    </EditorialSurface>
  )
}

function SceneStep3({ snap }: { snap: StepSnapshot }) {
  const showFormExit = snap.formOut < 1
  const showAssets = snap.assetsIn > 0 && snap.psMorph < 1
  const showDetail = snap.psMorph > 0
  const assetsOpacity = showAssets ? 1 - clamp01(snap.psMorph / 0.4) : 0
  const detailOpacity = clamp01((snap.psMorph - 0.15) / 0.5)
  const flying = snap.psMorph > 0 && snap.psMorph < 1
  const avatarP = win(snap.t, 590, 420, 'M_SHARED')
  const titleP = win(snap.t, 620, 460, 'M_SHARED')
  return (
    <EditorialSurface surfaceIn={1}>
      <EditorialContent>
        {showFormExit ? (
          <div style={{ opacity: 1 - snap.formOut * 0.5 }}>
            <EditorialTaskForm
              morph={1}
              titleShared={1}
              metaSplit={1}
              fieldsIn={1}
              ctaIn={1}
              pickerOpen={0}
              dateIsManana
              exit={snap.formOut}
            />
          </div>
        ) : null}
        {showAssets ? (
          <div style={{ opacity: assetsOpacity * snap.assetsIn }}>
            <EditorialAssets entry={snap.assetsIn} psFocus={snap.psFocus} />
          </div>
        ) : null}
        {showDetail ? (
          <div style={{ opacity: Math.max(detailOpacity, snap.warrantyExpand > 0 || snap.pdfIn > 0 ? 1 : 0) }}>
            <EditorialAssetDetail
              detailIn={Math.max(detailOpacity, snap.warrantyExpand > 0 || snap.pdfIn > 0 ? 1 : 0)}
              warrantyExpand={snap.warrantyExpand}
              pdfIn={snap.pdfIn}
              hideIdentity={flying}
            />
          </div>
        ) : null}
        {flying ? (
          <>
            <SharedAssetAvatar progress={avatarP} />
            <SharedAssetTitle progress={titleP} />
          </>
        ) : null}
      </EditorialContent>
    </EditorialSurface>
  )
}

function SceneStep4({ snap }: { snap: StepSnapshot }) {
  const t = snap.t
  const pdfQ = 1 - win(t, 0, 150, 'M_EXIT')
  const regQ = 1 - win(t, 100, 380, 'M_REFRAME')
  const detailQ = 1 - win(t, 350, 250, 'M_REFRAME')
  const homeQ = win(t, 500, 250, 'M_REFRAME')
  return (
    <EditorialSurface surfaceIn={1}>
      <EditorialContent>
        {detailQ > 0 ? (
          <div style={{ opacity: detailQ }}>
            <EditorialAssetDetail
              detailIn={1}
              warrantyExpand={regQ}
              pdfIn={pdfQ * (regQ > 0.05 ? 1 : 0)}
            />
          </div>
        ) : null}
        {homeQ > 0 ? (
          <div style={{ opacity: homeQ }}>
            <EditorialHome secondaryDim={0} />
          </div>
        ) : null}
      </EditorialContent>
    </EditorialSurface>
  )
}

function SceneStep5({ snap }: { snap: StepSnapshot }) {
  return (
    <EditorialSurface surfaceIn={1} surfaceOut={snap.surfaceOut}>
      <EditorialContent>
        <EditorialHome secondaryDim={0} />
      </EditorialContent>
    </EditorialSurface>
  )
}

function SceneStep6({ snap }: { snap: StepSnapshot }) {
  return <QuestionStage progress={snap.questionIn} />
}

/* ---------------- host ---------------- */

export default function S14Barrier({ stepIndex }: { stepIndex: number }) {
  const step = Math.min(6, Math.max(0, stepIndex))
  const stageRef = useRef<HTMLDivElement | null>(null)
  const duration = stepDuration(step)
  const frozen = freezeTimeParam()
  const now = useLocalClock(step, duration, frozen)
  const snap = sampleStep(step, now)
  useGeometryAudit(stageRef, step, snap.settled || frozen !== null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (new URLSearchParams(window.location.search).get('dev') !== '1') return
    ;(window as unknown as { __S14__: unknown }).__S14__ = { step, t: snap.t, settled: snap.settled, duration }
  }, [step, snap.t, snap.settled, duration])

  return (
    <div
      ref={stageRef}
      className="ed-stage"
      data-step={step}
      data-settled={snap.settled}
      aria-label="Fricción: el último paso"
    >
      <div key={step} className="ed-beat" data-beat={step}>
        {step === 0 ? <SceneStep0 snap={snap} /> : null}
        {step === 1 ? <SceneStep1 snap={snap} /> : null}
        {step === 2 ? <SceneStep2 snap={snap} /> : null}
        {step === 3 ? <SceneStep3 snap={snap} /> : null}
        {step === 4 ? <SceneStep4 snap={snap} /> : null}
        {step === 5 ? <SceneStep5 snap={snap} /> : null}
        {step === 6 ? <SceneStep6 snap={snap} /> : null}
      </div>
    </div>
  )
}

export type { MasterRect }
