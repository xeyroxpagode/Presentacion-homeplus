/**
 * S14 Friction — cinematic implementation V5.0 (§§4–21).
 *
 * Seven operable narrative states (stepIndex 0..6), each playing its full
 * local timeline on mount and terminating in manual HOLD (§4). Remount per
 * step (key={stepIndex}) gives: deterministic replay, cancellation of prior
 * timelines, snapshot reconstruction on PREVIOUS, direct-jump support.
 *
 * Data safety (§23): all fixtures are local read-only (surfaces.tsx).
 * No mutations, no persistence, stable ids.
 */

import { useLayoutEffect, useRef, type CSSProperties, type ReactNode, type RefObject } from 'react'
import PhoneFrame from '../../components/PhoneFrame'
import HomeDemoScreen from '../../app-screens/HomeDemoScreen'
import PlannerDemoScreen from '../../app-screens/PlannerDemoScreen'
import { mx, toRuntimeStyle, TARGETS, NATIVE, FORM_CAM } from './geometry'
import { freezeTimeParam, sampleStep } from './timeline'
import {
  FrictionTaskRow,
  FrictionTaskSheet,
  FrictionAssetsList,
  FrictionPs5Detail,
  FrictionWarrantySheet,
  FrictionPdfDetail,
} from './surfaces'
import './s14-barrier.css'

/** Optional static detail (§21) — set false to use the approved no-dot fallback. */
const QUESTION_DOT = true

/* Phone scale derives from width so content never distorts (§2.2). */
function phoneLayout(rect: { x: number; y: number; w: number; h: number }) {
  const r = toRuntimeStyle({ x: rect.x, y: rect.y, w: rect.w, h: rect.h })
  const scale = r.width / 300
  const frameH = 620 * scale
  return {
    left: r.left + r.width / 2 - (300 * scale) / 2,
    top: r.top + r.height / 2 - frameH / 2,
    scale,
  }
}

/**
 * Shared-element measurement hook (§22.2 steps 1–3): on mount, measure each
 * [data-hero-origin] source rect relative to the stage and publish it as
 * CSS vars consumed by extraction keyframes. Controlled single measurement —
 * never per-frame (§22.5).
 */
function useSharedMeasure(stageRef: RefObject<HTMLDivElement | null>, step: number) {
  useLayoutEffect(() => {
    const stage = stageRef.current
    if (!stage || freezeTimeParam() !== null) return
    try {
      const stageRect = stage.getBoundingClientRect()
      stage.querySelectorAll('[data-hero-origin]').forEach(el => {
        const id = (el as HTMLElement).dataset.heroOrigin
        if (!id) return
        const r = (el as HTMLElement).getBoundingClientRect()
        stage.style.setProperty(`--org-${id}-x`, `${r.left - stageRect.left + r.width / 2}px`)
        stage.style.setProperty(`--org-${id}-y`, `${r.top - stageRect.top + r.height / 2}px`)
      })
    } catch {
      /* measurement is progressive enhancement; keyframe fallbacks hold */
    }
  }, [stageRef, step])
}

function StagePhone({ rect, children, label, bare = false }: {
  rect: { x: number; y: number; w: number; h: number }
  children: ReactNode
  label: string
  bare?: boolean
}) {
  const p = phoneLayout(rect)
  const style = (bare
    ? { left: 0, top: 0 }
    : { left: p.left, top: p.top }) as CSSProperties
  return (
    <div className="s14f-phone" data-label={label} style={style}>
      <PhoneFrame scale={p.scale}>
        <div className="s14f-screen">{children}</div>
      </PhoneFrame>
    </div>
  )
}

/* ---------------- H00 · handoff desde Stack (§5) ---------------- */
function H00() {
  return (
    <>
      <div className="s14f-stackecho" aria-hidden="true">
        <div className="s14f-stackpanel" data-side="front">
          <p>Frontend</p><span>La app que usás</span>
        </div>
        <div className="s14f-stacklink" aria-hidden="true" />
        <div className="s14f-stackpanel" data-side="back">
          <p>Backend</p><span>Datos y servicios</span>
        </div>
      </div>
      <div className="s14f-h00-phone">
        <StagePhone rect={TARGETS.PHONE_CENTER} label="homeplus">
          <HomeDemoScreen />
        </StagePhone>
      </div>
    </>
  )
}

/* ---------------- H01 · último paso (§6) ---------------- */
function H01() {
  return (
    <div className="s14f-h01-phone">
      <StagePhone rect={TARGETS.PHONE_ATTENUATED} label="homeplus-attenuated">
        <HomeDemoScreen />
      </StagePhone>
    </div>
  )
}

/* ---------------- H02 · crear tarea (§§7–8) ---------------- */
function H02({ frozenCamP, frozenPicker, frozenValue }: {
  frozenCamP: number | null
  frozenPicker: number | null
  frozenValue: 'from' | 'to' | null
}) {
  const hero = toRuntimeStyle({ x: TARGETS.TASK_HERO_ROW.x, y: TARGETS.TASK_HERO_ROW.y, w: TARGETS.TASK_HERO_ROW.w, h: TARGETS.TASK_HERO_ROW.h })
  const cam = toRuntimeStyle({ x: TARGETS.TASK_CAMERA.x, y: TARGETS.TASK_CAMERA.y, w: TARGETS.TASK_CAMERA.w, h: TARGETS.TASK_CAMERA.h })
  const sheetLeft = mx(NATIVE.sheetStageX - TARGETS.TASK_CAMERA.x)
  return (
    <>
      <div className="s14f-h02-phone">
        <StagePhone rect={TARGETS.PHONE_CONTEXT} label="planner-context" bare>
          <div className="s14f-planner-dim">
            <PlannerDemoScreen view="tasks" />
            <span className="s14f-planner-origin" data-hero-origin="taskrow" aria-hidden="true" />
          </div>
        </StagePhone>
      </div>
      <div className="s14f-hero-row" data-hero="taskrow"
        style={{ left: hero.left, top: hero.top, width: hero.width }}>
        <div className="s14f-scale" style={{ transform: `scale(${NATIVE.taskScale})` }}>
          <FrictionTaskRow />
        </div>
      </div>
      <div className="s14f-fly-title" aria-hidden="true">Preparar la mochila de Juli</div>
      <div className="s14f-camera" style={{ left: cam.left, top: cam.top, width: cam.width, height: cam.height }}>
        <div className="s14f-cam-scale" style={{ left: sheetLeft, transform: `scale(${NATIVE.sheetScale})` }}>
          <div
            className="s14f-cam-pan"
            data-frozen={frozenCamP !== null}
            style={frozenCamP !== null ? { transform: `translateY(${-frozenCamP / NATIVE.sheetScale}px)` } : undefined}
          >
            <FrictionTaskSheet pickerOpen={frozenPicker !== null ? frozenPicker > 0.5 : undefined}
              valueShown={frozenValue ?? undefined} />
          </div>
        </div>
      </div>
    </>
  )
}

/* ---------------- H03+H04 · salida + garantía (§§9–18) ---------------- */
function H03H04() {
  const taskHero = toRuntimeStyle({ x: TARGETS.TASK_HERO_ROW.x, y: TARGETS.TASK_HERO_ROW.y, w: TARGETS.TASK_HERO_ROW.w, h: TARGETS.TASK_HERO_ROW.h })
  const taskCam = toRuntimeStyle({ x: TARGETS.TASK_CAMERA.x, y: TARGETS.TASK_CAMERA.y, w: TARGETS.TASK_CAMERA.w, h: TARGETS.TASK_CAMERA.h })
  const ps5 = toRuntimeStyle({ x: TARGETS.PS5_HERO_ROW.x, y: TARGETS.PS5_HERO_ROW.y, w: TARGETS.PS5_HERO_ROW.w, h: TARGETS.PS5_HERO_ROW.h })
  const war = toRuntimeStyle({ x: TARGETS.WARRANTY_HERO_ROW.x, y: TARGETS.WARRANTY_HERO_ROW.y, w: TARGETS.WARRANTY_HERO_ROW.w, h: TARGETS.WARRANTY_HERO_ROW.h })
  const pdf = toRuntimeStyle({ x: TARGETS.PDF_HERO_ROW.x, y: TARGETS.PDF_HERO_ROW.y, w: TARGETS.PDF_HERO_ROW.w, h: TARGETS.PDF_HERO_ROW.h })
  const acam = toRuntimeStyle({ x: TARGETS.ASSETS_CAMERA.x, y: TARGETS.ASSETS_CAMERA.y, w: TARGETS.ASSETS_CAMERA.w, h: TARGETS.ASSETS_CAMERA.h })
  const detailScale = (TARGETS.ASSETS_CAMERA.w * 2) / 3 / 370
  return (
    <>
      <div className="s14f-h03-phone">
        <StagePhone rect={TARGETS.PHONE_CONTEXT} label="planner-then-assets">
          <div className="s14f-phone-xfade">
            <div className="s14f-phone-view" data-view="planner">
              <div className="s14f-planner-dim" data-dim="exit">
                <PlannerDemoScreen view="tasks" />
              </div>
            </div>
            <div className="s14f-phone-view" data-view="assets">
              <div className="s14f-assets-scroll">
                <FrictionAssetsList />
                <span className="s14f-ps5-origin" data-hero-origin="ps5" aria-hidden="true" />
              </div>
            </div>
          </div>
        </StagePhone>
      </div>
      {/* H03 exit: camera starts at FOOTER, reframes, folds; row exits (§9) */}
      <div className="s14f-camera" data-camera="task-exit"
        style={{ left: taskCam.left, top: taskCam.top, width: taskCam.width, height: taskCam.height }}>
        <div className="s14f-cam-scale" style={{ left: mx(NATIVE.sheetStageX - TARGETS.TASK_CAMERA.x), transform: `scale(${NATIVE.sheetScale})` }}>
          <div className="s14f-cam-pan" data-pan="task-exit">
            <FrictionTaskSheet valueShown="to" />
          </div>
        </div>
      </div>
      <div className="s14f-hero-row" data-hero="taskrow-exit"
        style={{ left: taskHero.left, top: taskHero.top, width: taskHero.width }}>
        <div className="s14f-scale" style={{ transform: `scale(${NATIVE.taskScale})` }}>
          <FrictionTaskRow />
        </div>
      </div>
      <div className="s14f-hero-row" data-hero="ps5"
        style={{ left: ps5.left, top: ps5.top, width: ps5.width }}>
        <div className="s14f-scale" style={{ transform: `scale(${NATIVE.ps5Scale})` }}>
          <div className="fr-assetrow" data-hero-clone="true">
            <span className="fr-assetrow-avatar" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M10 1.8 17 5.4v9.2l-7 3.6-7-3.6V5.4l7-3.6Z" />
                <path d="M3.2 5.5 10 9l6.8-3.5M10 9v9" />
              </svg>
            </span>
            <div className="fr-assetrow-copy">
              <p className="fr-assetrow-title">PlayStation 5</p>
              <p className="fr-assetrow-meta">Ahora con Tomi</p>
            </div>
            <span className="fr-assetrow-chevron" aria-hidden="true">›</span>
          </div>
        </div>
      </div>
      <div className="s14f-camera" data-camera="assets"
        style={{ left: acam.left, top: acam.top, width: acam.width, height: acam.height }}>
        <div className="s14f-cam-scale" style={{ transform: `scale(${detailScale})` }}>
          <div className="s14f-cam-pan" data-pan="assets-to-docs">
            <FrictionPs5Detail />
          </div>
        </div>
      </div>
      <div className="s14f-hero-row" data-hero="warranty"
        style={{ left: war.left, top: war.top, width: war.width }}>
        <div className="s14f-scale" style={{ transform: `scale(${NATIVE.warrantyScale})` }}>
          <div className="fr-docrow" data-hero-clone="true">
            <span className="fr-docrow-icon" aria-hidden="true">◈</span>
            <div>
              <p className="fr-docrow-title">Garantía PlayStation 5</p>
              <p className="fr-docrow-meta">Garantía · hasta enero de 2027 · 1 documento</p>
            </div>
            <span className="fr-docrow-chevron" aria-hidden="true">›</span>
          </div>
        </div>
      </div>
      <div className="s14f-wsheet-layer" data-layer="wsheet">
        <div className="s14f-cam-scale" style={{ transform: `scale(${NATIVE.sheetScale})` }}>
          <FrictionWarrantySheet />
        </div>
      </div>
      <div className="s14f-hero-row" data-hero="pdf"
        style={{ left: pdf.left, top: pdf.top, width: pdf.width }}>
        <div className="s14f-scale" style={{ transform: `scale(${NATIVE.pdfScale})` }}>
          <div className="fr-pacerow" data-hero-clone="true">
            <span className="fr-pacerow-icon" aria-hidden="true">PDF</span>
            <div>
              <p className="fr-pacerow-title">Garantía PS5.pdf</p>
              <p className="fr-pacerow-meta">PDF · 620 KB</p>
            </div>
            <span className="fr-pacerow-chevron" aria-hidden="true">›</span>
          </div>
        </div>
      </div>
      <div className="s14f-wsheet-layer" data-layer="pdfdetail">
        <div className="s14f-cam-scale" style={{ transform: `scale(${NATIVE.sheetScale})` }}>
          <FrictionPdfDetail />
        </div>
      </div>
    </>
  )
}

/* ---------------- H05+H06 · reintegración (§19) ---------------- */
function H05H06() {
  const acam = toRuntimeStyle({ x: TARGETS.ASSETS_CAMERA.x, y: TARGETS.ASSETS_CAMERA.y, w: TARGETS.ASSETS_CAMERA.w, h: TARGETS.ASSETS_CAMERA.h })
  const detailScale = (TARGETS.ASSETS_CAMERA.w * 2) / 3 / 370
  return (
    <>
      <div className="s14f-h0506-phone">
        <StagePhone rect={TARGETS.PHONE_CENTER} label="homeplus-clean" bare>
          <div className="s14f-phone-xfade" data-reverse="true">
            <div className="s14f-phone-view" data-view="home"><HomeDemoScreen /></div>
            <div className="s14f-phone-view" data-view="assets-out">
              <FrictionPs5Detail />
            </div>
          </div>
        </StagePhone>
      </div>
      <div className="s14f-camera" data-camera="assets-out"
        style={{ left: acam.left, top: acam.top, width: acam.width, height: acam.height }}>
        <div className="s14f-cam-scale" style={{ transform: `scale(${detailScale})` }}>
          <div className="s14f-cam-pan" data-pan="docs-to-head">
            <FrictionPs5Detail />
          </div>
        </div>
      </div>
      <div className="s14f-wsheet-layer" data-layer="wsheet-out">
        <div className="s14f-cam-scale" style={{ transform: `scale(${NATIVE.sheetScale})` }}>
          <FrictionWarrantySheet />
        </div>
      </div>
      <div className="s14f-wsheet-layer" data-layer="pdfdetail-out">
        <div className="s14f-cam-scale" style={{ transform: `scale(${NATIVE.sheetScale})` }}>
          <FrictionPdfDetail />
        </div>
      </div>
    </>
  )
}

/* ---------------- H07 · retirada (§20) ---------------- */
function H07() {
  return (
    <div className="s14f-h07-phone">
      <StagePhone rect={TARGETS.PHONE_CENTER} label="homeplus-exit">
        <HomeDemoScreen />
      </StagePhone>
    </div>
  )
}

/* ---------------- H08 · pregunta final (§21) ---------------- */
function H08() {
  const q = toRuntimeStyle({ x: TARGETS.QUESTION_REGION.x, y: TARGETS.QUESTION_REGION.y, w: TARGETS.QUESTION_REGION.w, h: TARGETS.QUESTION_REGION.h })
  return (
    <div className="s14f-qstage">
      <p className="s14f-question"
        style={{ left: q.left, top: q.top, width: q.width, height: q.height }}>
        <span className="s14f-qline">¿Y si ni siquiera tuviéramos</span>
        <span className="s14f-qline">que saber cómo?</span>
      </p>
      {QUESTION_DOT && <span className="s14f-qdot" aria-hidden="true"
        style={{ left: mx(1750), top: mx(920) }} />}
    </div>
  )
}

export default function S14Barrier({ stepIndex }: { stepIndex: number }) {
  const step = Math.min(6, Math.max(0, stepIndex))
  const stageRef = useRef<HTMLDivElement | null>(null)
  useSharedMeasure(stageRef, step)
  const frozen = freezeTimeParam()
  const frozenSnap = frozen !== null ? sampleStep(Math.min(6, Math.max(0, stepIndex)), frozen) : null
  const formCamFallback = frozenSnap ? frozenSnap.camP : step === 2 ? FORM_CAM.FOOTER : FORM_CAM.TOP

  return (
    <div ref={stageRef} className="s14f-stage" data-step={step}
      data-frozen={frozen !== null} aria-label="Fricción: el último paso">
      <div className="s14f-void" aria-hidden="true" />
      <div key={step} className="s14f-beat" data-beat={step}>
        {step === 0 && <H00 />}
        {step === 1 && <H01 />}
        {step === 2 && <H02 frozenCamP={frozenSnap ? frozenSnap.camP : null}
          frozenPicker={frozenSnap ? frozenSnap.picker : null}
          frozenValue={frozenSnap ? (frozenSnap.picker > 0.5 ? 'from' : frozenSnap.mañana > 0.5 ? 'to' : 'from') : null} />}
        {step === 3 && <H03H04 />}
        {step === 4 && <H05H06 />}
        {step === 5 && <H07 />}
        {step === 6 && <H08 />}
      </div>
      {frozen !== null && step === 2 && (
        <span className="s14f-freeze-note" aria-hidden="true">
          frozen @ {Math.round(frozen)}ms · camP {Math.round(formCamFallback)}
        </span>
      )}
    </div>
  )
}
