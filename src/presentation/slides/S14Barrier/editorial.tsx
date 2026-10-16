/**
 * S14 Friction Editorial V6.0 — editorial surfaces (F3).
 *
 * Pure presentational components: every visual is a function of props
 * (snapshot progress), never of timers. Data comes from fixtures.ts only.
 * No PhoneFrame, no mobile status bars, no bottom navigation anywhere.
 *
 * Coordinate rule (§4.2): geometry-critical values (left/top/width/height,
 * fontSize) are computed inline with mx()/toRuntimeStyle from geometry.ts.
 * Cosmetic styling (colors/borders/radii from PALETTE) lives in
 * s14-editorial.css. Children never re-apply the master factor.
 */

import type { CSSProperties } from 'react'
import {
  mx,
  toRuntimeStyle,
  EDITORIAL_SURFACE,
  EDITORIAL_CONTENT,
  PLANNER_TITLE,
  PLANNER_PLUS,
  PLANNER_GROUP_LABEL,
  PLANNER_ROW_1,
  PLANNER_ROW_2,
  INTENT_ROW,
  INTENT_TITLE,
  INTENT_META,
  FORM_HEADER,
  FORM_TITLE_FIELD,
  FORM_TITLE_TEXT,
  FORM_DATE,
  FORM_ASSIGNEE,
  FORM_TIME,
  FORM_PICKER,
  FORM_CTA,
  ASSETS_TITLE,
  ASSETS_LABEL,
  ASSETS_ROW_1,
  ASSETS_PS5_ROW,
  ASSETS_ROW_3,
  ASSET_IDENTITY_REGION,
  ASSET_AVATAR,
  ASSET_TITLE_BOX,
  ASSET_SUB_BOX,
  ASSET_DIVIDER,
  ASSET_CONTEXT,
  ASSET_DOCS_LABEL,
  ASSET_WARRANTY_ROW,
  ASSET_INVOICE_ROW,
  WARRANTY_EXPANDED,
  WARRANTY_ICON,
  WARRANTY_TITLE_BOX,
  WARRANTY_DIVIDER,
  WARRANTY_TYPE,
  WARRANTY_UNTIL,
  WARRANTY_DOC_LABEL,
  WARRANTY_PDF_ROW,
  QUESTION_BOX,
  TYPE,
  PALETTE,
  type MasterRect,
} from './geometry'
import {
  SCENIC_TASK,
  PLANNER_ROWS,
  PLANNER_GROUP_LABEL as GROUP_LABEL,
  ASSET_NEIGHBOURS,
  SCENIC_ASSET,
  SCENIC_WARRANTY,
  SCENIC_PDF,
  DATE_OPTIONS,
  FINAL_QUESTION_LINE_1,
  FINAL_QUESTION_LINE_2,
} from './fixtures'

/* ------------------------------------------------------------------ */
/* helpers                                                             */
/* ------------------------------------------------------------------ */

export function lerp(a: number, b: number, p: number): number {
  return a + (b - a) * p
}

export function lerpRect(a: MasterRect, b: MasterRect, p: number): MasterRect {
  return { x: lerp(a.x, b.x, p), y: lerp(a.y, b.y, p), w: lerp(a.w, b.w, p), h: lerp(a.h, b.h, p) }
}

function rectStyle(r: MasterRect, extra?: CSSProperties): CSSProperties {
  // Surface-absolute TARGET, resolved against EditorialContent: subtract the
  // content origin (268,202). Do NOT use for stage-level nodes (surface box,
  // final question) — those use stageStyle below.
  return {
    position: 'absolute',
    left: mx(r.x - EDITORIAL_CONTENT.x),
    top: mx(r.y - EDITORIAL_CONTENT.y),
    width: mx(r.w),
    height: mx(r.h),
    ...extra,
  }
}

/** Stage-level rect (master canvas coords): surface box, final question. */
function stageStyle(r: MasterRect, extra?: CSSProperties): CSSProperties {
  return { position: 'absolute', ...toRuntimeStyle(r), ...extra }
}

/**
 * Child rect relative to a positioned ancestor that itself sits at `origin`
 * (surface coords). Required because any positioned ancestor becomes the
 * containing block for absolute descendants (§25.1: no invented floats —
 * every number still derives from declared TARGETs).
 */
function relRect(r: MasterRect, origin: MasterRect, extra?: CSSProperties): CSSProperties {
  return {
    position: 'absolute',
    left: mx(r.x - origin.x),
    top: mx(r.y - origin.y),
    width: mx(r.w),
    height: mx(r.h),
    ...extra,
  }
}

function packageIcon(size: number): CSSProperties {
  return { width: size, height: size }
}

/* ------------------------------------------------------------------ */
/* EditorialSurface (§4.3–4.4)                                         */
/* ------------------------------------------------------------------ */

export function EditorialSurface({
  surfaceIn = 1,
  surfaceOut = 0,
  expectTag,
  children,
}: {
  surfaceIn?: number
  surfaceOut?: number
  expectTag?: string
  children: React.ReactNode
}) {
  const scale = lerp(1, 0.975, surfaceOut)
  return (
    <div
      className="ed-surface"
      data-expect={`${EDITORIAL_SURFACE.x},${EDITORIAL_SURFACE.y},${EDITORIAL_SURFACE.w},${EDITORIAL_SURFACE.h}`}
      style={{
        ...stageStyle(EDITORIAL_SURFACE),
        opacity: surfaceIn * (1 - surfaceOut),
        transform: `scale(${scale})`,
        transformOrigin: 'center center',
      }}
    >
      {children}
    </div>
  )
}

export function EditorialContent({ children }: { children: React.ReactNode }) {
  const s = toRuntimeStyle(EDITORIAL_CONTENT)
  return (
    <div
      className="ed-content"
      style={{
        position: 'absolute',
        left: s.left - mx(EDITORIAL_SURFACE.x),
        top: s.top - mx(EDITORIAL_SURFACE.y),
        width: s.width,
        height: s.height,
      }}
    >
      {children}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* EditorialHome — HOME horizontal auténtica (G01/G02/G08)              */
/* Secondary regions dim to .75 on friction focus; the actionable Hoy   */
/* rows stay at 1 (§6 G02). Fully still in G08.                        */
/* ------------------------------------------------------------------ */

export function EditorialHome({ secondaryDim = 0 }: { secondaryDim?: number }) {
  const secondary = lerp(1, 0.75, secondaryDim)
  return (
    <div className="ed-home" aria-label="HomePlus">
      <header className="ed-home-head" style={{ opacity: secondary }}>
        <span className="ed-home-avatar" aria-hidden="true">
          J
        </span>
        <span className="ed-home-who">
          <strong>Juli</strong>
          <em>Familia García</em>
        </span>
        <span className="ed-home-date">Domingo, 16 de agosto</span>
      </header>
      <div className="ed-home-grid">
        <section className="ed-home-card" aria-label="Hoy">
          <h2 className="ed-home-section" style={{ opacity: secondary }}>
            Hoy
          </h2>
          {PLANNER_ROWS.map(row => (
            <div className="ed-home-row" key={row.id} data-home-row={row.id}>
              <span className="ed-home-row-avatar" aria-hidden="true">
                {row.initial}
              </span>
              <span className="ed-home-row-copy">
                <strong>{row.title}</strong>
                <em>{row.meta}</em>
              </span>
              <span className="ed-home-row-go" aria-hidden="true">
                ›
              </span>
            </div>
          ))}
        </section>
        <section className="ed-home-card" style={{ opacity: secondary }} aria-label="Próximamente">
          <h2 className="ed-home-section">Próximamente</h2>
          <div className="ed-home-row" data-home-row="educationPhysical">
            <span className="ed-home-row-avatar" data-kind="event" aria-hidden="true">
              E
            </span>
            <span className="ed-home-row-copy">
              <strong>Educación Física</strong>
              <em>Juli · Colegio · Mañana</em>
            </span>
            <span className="ed-home-row-go" aria-hidden="true">
              ›
            </span>
          </div>
          <p className="ed-home-note">Coordinación del hogar en un solo lugar</p>
        </section>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* EditorialPlanner — P01 (§7)                                         */
/* ------------------------------------------------------------------ */

export function PlannerList({
  entry = 1,
  listDim = 0,
  plusPulse = 0,
}: {
  entry?: number
  listDim?: number
  plusPulse?: number
}) {
  const rows = [PLANNER_ROW_1, PLANNER_ROW_2]
  return (
    <div className="ed-planner" aria-label="Planner">
      <h2
        className="ed-planner-title"
        data-expect={`${PLANNER_TITLE.x},${PLANNER_TITLE.y},${PLANNER_TITLE.w},${PLANNER_TITLE.h}`}
        style={{
          ...rectStyle(PLANNER_TITLE),
          fontSize: mx(TYPE.plannerTitle),
          opacity: entry,
          transform: `translateY(${lerp(10, 0, entry) * (3 / 2)}px)`,
        }}
      >
        Tareas
      </h2>
      <div
        className="ed-plus"
        data-expect={`${PLANNER_PLUS.x},${PLANNER_PLUS.y},${PLANNER_PLUS.w},${PLANNER_PLUS.h}`}
        style={{ ...rectStyle(PLANNER_PLUS), opacity: entry }}
        aria-label="Crear tarea"
      >
        <span style={{ transform: `scale(${1 + 0.08 * plusPulse})`, fontSize: mx(TYPE.plusGlyph) }}>+</span>
      </div>
      <p
        className="ed-group-label"
        style={{ ...rectStyle(PLANNER_GROUP_LABEL), fontSize: mx(TYPE.plannerGroup), opacity: entry }}
      >
        {GROUP_LABEL}
      </p>
      <div style={{ opacity: lerp(1, 0.25, listDim) }}>
        {PLANNER_ROWS.map((row, i) => (
          <div
            key={row.id}
            className="ed-planner-row"
            data-expect={`${rows[i].x},${rows[i].y},${rows[i].w},${rows[i].h}`}
            style={rectStyle(rows[i])}
          >
            <span className="ed-planner-avatar" aria-hidden="true">
              {row.initial}
            </span>
            <span className="ed-planner-copy">
              <strong style={{ fontSize: mx(TYPE.plannerRowTitle) }}>{row.title}</strong>
              <em style={{ fontSize: mx(TYPE.plannerRowMeta) }}>{row.meta}</em>
            </span>
            <span className="ed-planner-action" aria-hidden="true">
              Me encargo
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* TaskIntentPreview — previsualización temporal (§8, NUNCA persistida) */
/* ------------------------------------------------------------------ */

export function TaskIntentPreview({ progress = 1 }: { progress?: number }) {
  return (
    <div
      className="ed-intent"
      data-scenic={SCENIC_TASK.id}
      data-expect={`${INTENT_ROW.x},${INTENT_ROW.y},${INTENT_ROW.w},${INTENT_ROW.h}`}
      style={{
        ...rectStyle(INTENT_ROW),
        opacity: progress,
        transform: `translateY(${lerp(20, 0, progress)}px) scale(${lerp(0.94, 1, progress)})`,
        transformOrigin: 'center center',
      }}
      aria-label={`Intención temporal: ${SCENIC_TASK.title}`}
    >
      <span className="ed-intent-body">
        <strong
          data-shared="task.title"
          style={{
            ...relRect(INTENT_TITLE, INTENT_ROW),
            fontSize: mx(TYPE.intentTitle),
          }}
        >
          {SCENIC_TASK.title}
        </strong>
        <em
          data-shared="task.meta"
          style={{
            ...relRect(INTENT_META, INTENT_ROW),
            fontSize: mx(TYPE.intentMeta),
          }}
        >
          {SCENIC_TASK.metaInitial}
        </em>
      </span>
    </div>
  )
}

/**
 * SharedTaskTitle (§10.4): exactly ONE visible instance. Origin box
 * (364,428,980,55) 34/550 -> dest box (312,359,1296,50) 34/600, 440ms.
 */
export function SharedTaskTitle({ progress }: { progress: number }) {
  const r = lerpRect(INTENT_TITLE, FORM_TITLE_TEXT, progress)
  return (
    <span
      className="ed-shared-title"
      data-shared="task.title-flight"
      style={{
        ...rectStyle(r),
        fontSize: mx(TYPE.intentTitle),
        fontWeight: progress >= 1 ? 600 : 550,
      }}
    >
      {SCENIC_TASK.title}
    </span>
  )
}

/* ------------------------------------------------------------------ */
/* EditorialTaskForm — formulario horizontal P02 (§9)                  */
/* ------------------------------------------------------------------ */

function FieldColumn({
  rect,
  label,
  value,
  delay,
  fieldsIn,
  dimmed = false,
}: {
  rect: MasterRect
  label: string
  value: string
  delay: number
  fieldsIn: number
  dimmed?: boolean
}) {
  // Per-field stagger ≤40ms inside the shared 250ms window (§10.5).
  const span = 1 - 0.28
  const p = Math.min(1, Math.max(0, (fieldsIn - delay) / span))
  return (
    <div
      className="ed-field"
      data-expect={`${rect.x},${rect.y},${rect.w},${rect.h}`}
      style={{ ...rectStyle(rect), opacity: p, transform: `translateY(${lerp(10, 0, p)}px)` }}
    >
      <span className="ed-field-label" style={{ fontSize: mx(TYPE.formLabel) }}>
        {label}
      </span>
      <span
        className="ed-field-value"
        data-dimmed={dimmed}
        style={{ fontSize: mx(TYPE.formValue), opacity: dimmed ? 0.55 : 1 }}
      >
        {value}
        <i aria-hidden="true" style={{ fontSize: mx(TYPE.formChevron) }}>
          ›
        </i>
      </span>
    </div>
  )
}

export function EditorialTaskForm({
  morph = 1,
  titleShared = 1,
  metaSplit = 1,
  fieldsIn = 1,
  ctaIn = 1,
  pickerOpen = 0,
  dateIsManana = false,
  exit = 0,
}: {
  morph?: number
  titleShared?: number
  metaSplit?: number
  fieldsIn?: number
  ctaIn?: number
  pickerOpen?: number
  dateIsManana?: boolean
  exit?: number
}) {
  const titleBox = lerpRect(INTENT_ROW, FORM_TITLE_FIELD, morph)
  const ctaOpacity = ctaIn * (1 - Math.min(1, exit * 3))
  const fieldsExit = Math.min(1, Math.max(0, (exit - 0.15) * 2.2))
  const headerExit = Math.min(1, Math.max(0, (exit - 0.55) * 2.5))
  return (
    <div className="ed-form" aria-label="Nueva tarea" style={{ opacity: 1 - Math.max(0, exit - 0.7) * 3 }}>
      <h2
        className="ed-form-header"
        data-expect={`${FORM_HEADER.x},${FORM_HEADER.y},${FORM_HEADER.w},${FORM_HEADER.h}`}
        style={{ ...rectStyle(FORM_HEADER), fontSize: mx(TYPE.formHeader), opacity: (1 - headerExit) * Math.min(1, morph * 2) }}
      >
        Nueva tarea
      </h2>
      <div
        className="ed-form-titlefield"
        data-expect={`${FORM_TITLE_FIELD.x},${FORM_TITLE_FIELD.y},${FORM_TITLE_FIELD.w},${FORM_TITLE_FIELD.h}`}
        style={{ ...rectStyle(titleBox), opacity: Math.max(morph > 0 ? 1 : 0, morph) }}
      >
        {titleShared >= 1 ? (
          <span className="ed-form-titletext" style={{ fontSize: mx(TYPE.formTitleInput) }}>
            {SCENIC_TASK.title}
          </span>
        ) : titleShared <= 0 ? (
          <span className="ed-form-titletext" style={{ fontSize: mx(TYPE.formTitleInput) }}>
            {SCENIC_TASK.title}
          </span>
        ) : null}
      </div>
      <div style={{ opacity: 1 - fieldsExit }}>
        <FieldColumn rect={FORM_DATE} label="Fecha" value={dateIsManana ? SCENIC_TASK.dateTo : SCENIC_TASK.dateFrom} delay={0} fieldsIn={fieldsIn} />
        <FieldColumn rect={FORM_ASSIGNEE} label="Responsable" value={SCENIC_TASK.assignee} delay={0.14} fieldsIn={fieldsIn} />
        <FieldColumn rect={FORM_TIME} label="Hora" value={SCENIC_TASK.time} delay={0.28} fieldsIn={fieldsIn} dimmed />
      </div>
      <EditorialDatePicker open={pickerOpen} selected={dateIsManana ? 'Mañana' : 'Sin fecha'} />
      <div
        className="ed-cta"
        data-expect={`${FORM_CTA.x},${FORM_CTA.y},${FORM_CTA.w},${FORM_CTA.h}`}
        style={{ ...rectStyle(FORM_CTA), fontSize: mx(TYPE.formCta), opacity: ctaOpacity, transform: `translateY(${lerp(12, 0, ctaIn)}px)` }}
        aria-label="Crear tarea (sin guardar: demostración)"
      >
        Crear tarea
      </div>
      {metaSplit < 1 && metaSplit > 0 ? (
        <span
          className="ed-meta-ghost"
          style={{
            left: mx(364 - EDITORIAL_CONTENT.x),
            top: mx(500 - EDITORIAL_CONTENT.y),
            opacity: 1 - metaSplit,
          }}
        >
          {SCENIC_TASK.metaInitial}
        </span>
      ) : null}
    </div>
  )
}

/** Selector Fecha inline (§11): expande dentro de la columna izquierda. */
export function EditorialDatePicker({ open = 0, selected = 'Sin fecha' }: { open?: number; selected?: string }) {
  if (open <= 0) return null
  return (
    <div
      className="ed-picker"
      data-expect={`${FORM_PICKER.x},${FORM_PICKER.y},${FORM_PICKER.w},${FORM_PICKER.h}`}
      style={{
        ...rectStyle({ ...FORM_PICKER, h: FORM_PICKER.h * open }),
        opacity: open,
        overflow: 'hidden',
      }}
      aria-label="Elegir fecha"
    >
      {DATE_OPTIONS.map(opt => (
        <span key={opt} className="ed-picker-opt" data-selected={opt === selected}>
          {opt}
        </span>
      ))}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* EditorialAssets — P03 (§13)                                         */
/* ------------------------------------------------------------------ */

export function EditorialAssets({
  entry = 1,
  psFocus = 0,
}: {
  entry?: number
  psFocus?: number
}) {
  const rows = [ASSETS_ROW_1, ASSETS_PS5_ROW, ASSETS_ROW_3]
  return (
    <div className="ed-assets" aria-label="Activos" style={{ opacity: entry, transform: `translateY(${lerp(12, 0, entry)}px)` }}>
      <h2
        className="ed-assets-title"
        data-expect={`${ASSETS_TITLE.x},${ASSETS_TITLE.y},${ASSETS_TITLE.w},${ASSETS_TITLE.h}`}
        style={{ ...rectStyle(ASSETS_TITLE), fontSize: mx(TYPE.assetsTitle) }}
      >
        Activos
      </h2>
      <p className="ed-assets-label" style={{ ...rectStyle(ASSETS_LABEL), fontSize: mx(TYPE.plannerGroup) }}>
        Objetos del hogar
      </p>
      {ASSET_NEIGHBOURS.map((asset, i) => {
        const hero = Boolean(asset.hero)
        const exposure = hero ? 1 : lerp(1, 0.45, psFocus)
        const scale = hero ? lerp(1, 1.025, psFocus) : 1
        return (
          <div
            key={asset.id}
            className="ed-asset-row"
            data-asset={asset.id}
            data-expect={`${rows[i].x},${rows[i].y},${rows[i].w},${rows[i].h}`}
            style={{ ...rectStyle(rows[i]), opacity: exposure, transform: `translateY(${hero ? lerp(0, -8, psFocus) : 0}px) scale(${scale})` }}
          >
            <span
              className="ed-asset-avatar"
              data-shared={hero ? 'ps5.avatar' : undefined}
              style={{ width: mx(TYPE.assetAvatar), height: mx(TYPE.assetAvatar) }}
              aria-hidden="true"
            >
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" style={packageIcon(mx(TYPE.assetIcon))}>
                <path d="M10 1.8 17 5.4v9.2l-7 3.6-7-3.6V5.4l7-3.6Z" />
                <path d="M3.2 5.5 10 9l6.8-3.5M10 9v9" />
              </svg>
            </span>
            <span className="ed-asset-copy">
              <strong data-shared={hero ? 'ps5.title' : undefined} style={{ fontSize: mx(TYPE.assetName) }}>
                {asset.name}
              </strong>
              <em data-shared={hero ? 'ps5.meta' : undefined} style={{ fontSize: mx(TYPE.assetMeta) }}>
                {asset.meta}
              </em>
            </span>
            <span className="ed-asset-chevron" style={{ fontSize: mx(TYPE.assetChevron) }} aria-hidden="true">
              ›
            </span>
          </div>
        )
      })}
    </div>
  )
}

/**
 * SharedAssetAvatar / SharedAssetTitle (§14.5): single instances.
 * Avatar 62px row -> (292,330,76,76); title 30px -> 42px.
 */
export function SharedAssetAvatar({ progress }: { progress: number }) {
  const size = lerp(TYPE.assetAvatar, 76, progress)
  const r = lerpRect(
    { x: ASSETS_PS5_ROW.x + 24, y: ASSETS_PS5_ROW.y + 19, w: TYPE.assetAvatar, h: TYPE.assetAvatar },
    ASSET_AVATAR,
    progress,
  )
  return (
    <span className="ed-asset-avatar ed-flight" data-shared="ps5.avatar-flight" style={{ ...rectStyle({ ...r, w: size, h: size }) }} aria-hidden="true">
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" style={packageIcon(mx(size * 0.5))}>
        <path d="M10 1.8 17 5.4v9.2l-7 3.6-7-3.6V5.4l7-3.6Z" />
        <path d="M3.2 5.5 10 9l6.8-3.5M10 9v9" />
      </svg>
    </span>
  )
}

export function SharedAssetTitle({ progress }: { progress: number }) {
  const origin = { x: ASSETS_PS5_ROW.x + 110, y: ASSETS_PS5_ROW.y + 18, w: 600, h: 40 }
  const r = lerpRect(origin, ASSET_TITLE_BOX, progress)
  return (
    <strong
      className="ed-flight-title"
      data-shared="ps5.title-flight"
      style={{ ...rectStyle(r), fontSize: mx(lerp(TYPE.assetName, TYPE.detailTitle, progress)) }}
    >
      {SCENIC_ASSET.name}
    </strong>
  )
}

/* ------------------------------------------------------------------ */
/* EditorialAssetDetail — P04 (§14) + garantía (§§15–16)                */
/* ------------------------------------------------------------------ */

export function EditorialAssetDetail({
  detailIn = 1,
  warrantyExpand = 0,
  pdfIn = 0,
  hideIdentity = false,
  RegistryOverride,
}: {
  detailIn?: number
  warrantyExpand?: number
  pdfIn?: number
  hideIdentity?: boolean
  RegistryOverride?: React.ReactNode
}) {
  const warrantyRect = lerpRect(ASSET_WARRANTY_ROW, WARRANTY_EXPANDED, warrantyExpand)
  const leftExposure = lerp(1, 0.8, warrantyExpand > 0 ? Math.min(1, warrantyExpand * 1.2) : 0)
  const invoiceExposure = lerp(1, 0.35, warrantyExpand)
  return (
    <div className="ed-detail" aria-label={SCENIC_ASSET.name} style={{ opacity: detailIn }}>
      <div
        className="ed-identity"
        data-expect={`${ASSET_IDENTITY_REGION.x},${ASSET_IDENTITY_REGION.y},${ASSET_IDENTITY_REGION.w},${ASSET_IDENTITY_REGION.h}`}
        style={{ ...rectStyle(ASSET_IDENTITY_REGION), opacity: leftExposure }}
      >
        {hideIdentity ? (
        <>
        <em
          className="ed-identity-sub"
          style={{ ...relRect(ASSET_SUB_BOX, ASSET_IDENTITY_REGION), fontSize: mx(TYPE.assetMeta), opacity: detailIn }}
        >
          {SCENIC_ASSET.category}
        </em>
        <span className="ed-identity-context" style={{ ...relRect(ASSET_CONTEXT, ASSET_IDENTITY_REGION), opacity: detailIn }}>
          <p data-shared="ps5.meta-flight">{SCENIC_ASSET.nowWith}</p>
          <p>{SCENIC_ASSET.location}</p>
          <p>{SCENIC_ASSET.keeper}</p>
        </span>
        </>
        ) : (
        <>
        <span
          className="ed-asset-avatar ed-identity-avatar"
          data-expect={`${ASSET_AVATAR.x},${ASSET_AVATAR.y},${ASSET_AVATAR.w},${ASSET_AVATAR.h}`}
          style={{ ...relRect(ASSET_AVATAR, ASSET_IDENTITY_REGION) }}
          aria-hidden="true"
        >
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" style={packageIcon(mx(38))}>
            <path d="M10 1.8 17 5.4v9.2l-7 3.6-7-3.6Z" />
            <path d="M3.2 5.5 10 9l6.8-3.5M10 9v9" />
          </svg>
        </span>
        <strong
          className="ed-identity-title"
          data-expect={`${ASSET_TITLE_BOX.x},${ASSET_TITLE_BOX.y},${ASSET_TITLE_BOX.w},${ASSET_TITLE_BOX.h}`}
          style={{ ...relRect(ASSET_TITLE_BOX, ASSET_IDENTITY_REGION), fontSize: mx(TYPE.detailTitle) }}
        >
          {SCENIC_ASSET.name}
        </strong>
        <em
          className="ed-identity-sub"
          data-expect={`${ASSET_SUB_BOX.x},${ASSET_SUB_BOX.y},${ASSET_SUB_BOX.w},${ASSET_SUB_BOX.h}`}
          style={{ ...relRect(ASSET_SUB_BOX, ASSET_IDENTITY_REGION), fontSize: mx(TYPE.assetMeta) }}
        >
          {SCENIC_ASSET.category}
        </em>
        <span className="ed-identity-divider" style={{ ...relRect(ASSET_DIVIDER, ASSET_IDENTITY_REGION) }} aria-hidden="true" />
        <span className="ed-identity-context" style={{ ...relRect(ASSET_CONTEXT, ASSET_IDENTITY_REGION) }}>
          <p data-shared="ps5.meta-flight">{SCENIC_ASSET.nowWith}</p>
          <p>{SCENIC_ASSET.location}</p>
          <p>{SCENIC_ASSET.keeper}</p>
        </span>
        </>
        )}
      </div>
      {/*
        Static grouping on purpose: children keep surface-absolute TARGET
        coords instead of becoming relative to this region.
      */}
      <div className="ed-documents">
        <p className="ed-docs-label" style={{ ...rectStyle(ASSET_DOCS_LABEL), fontSize: mx(TYPE.plannerGroup) }}>
          Datos y documentos
        </p>
        {/*
          Invoice paints FIRST so the expanding warranty record subordinates
          it underneath (§16 W01). Never ghosts over the record (§8).
        */}
        <div
          className="ed-invoice-row"
          data-expect={`${ASSET_INVOICE_ROW.x},${ASSET_INVOICE_ROW.y},${ASSET_INVOICE_ROW.w},${ASSET_INVOICE_ROW.h}`}
          style={{
            ...rectStyle(ASSET_INVOICE_ROW),
            opacity: invoiceExposure,
            transform: `translateY(${lerp(0, 12, warrantyExpand)}px)`,
          }}
        >
          <span className="ed-doc-tile" aria-hidden="true">
            PDF
          </span>
          <span className="ed-doc-copy">
            <strong style={{ fontSize: mx(TYPE.plannerRowTitle) }}>{SCENIC_WARRANTY.sibling.name}</strong>
            <em style={{ fontSize: mx(TYPE.assetMeta) }}>{SCENIC_WARRANTY.sibling.meta}</em>
          </span>
        </div>
        {RegistryOverride ?? (
          <EditorialWarrantyRow
            rect={warrantyRect}
            expanded={warrantyExpand}
            pdfIn={pdfIn}
          />
        )}
      </div>
    </div>
  )
}

/** Fila compacta -> registro expandido (§16), siempre dentro de la columna. */
export function EditorialWarrantyRow({
  rect,
  expanded = 0,
  pdfIn = 0,
}: {
  rect: MasterRect
  expanded?: number
  pdfIn?: number
}) {
  // Pre-expansion focus 1→1.025 settles back to 1 once expanded (§15.1).
  const focusScale =
    expanded < 0.15
      ? lerp(1, 1.025, expanded / 0.15)
      : lerp(1.025, 1, Math.min(1, (expanded - 0.15) / 0.3))
  const rel = (r: MasterRect, extra?: CSSProperties): CSSProperties => relRect(r, rect, extra)
  return (
    <div
      className="ed-warranty"
      data-record="warranty"
      data-expect={`${rect.x},${rect.y},${rect.w},${rect.h}`}
      style={{ ...rectStyle(rect), transform: `scale(${focusScale})`, transformOrigin: 'center center' }}
    >
      <span
        className="ed-warranty-icon"
        style={rel(WARRANTY_ICON)}
        aria-hidden="true"
      >
        ◈
      </span>
      {expanded >= 1 ? (
        <strong className="ed-warranty-title" style={{ ...rel(WARRANTY_TITLE_BOX), fontSize: mx(TYPE.warrantyTitle) }}>
          {SCENIC_WARRANTY.name}
        </strong>
      ) : expanded > 0 ? (
        <strong className="ed-warranty-title ed-flight-title" style={{ ...rel(lerpRect(ASSET_WARRANTY_ROW, WARRANTY_TITLE_BOX, expanded), rect), fontSize: mx(TYPE.warrantyTitle) }}>
          {SCENIC_WARRANTY.name}
        </strong>
      ) : (
        <span className="ed-warranty-compact">
          <strong style={{ fontSize: mx(TYPE.plannerRowTitle) }}>{SCENIC_WARRANTY.name}</strong>
          <em style={{ fontSize: mx(TYPE.assetMeta) }}>
            {SCENIC_WARRANTY.typeValue} · {SCENIC_WARRANTY.untilPrefix} · 1 documento
          </em>
        </span>
      )}
      {expanded > 0.45 ? (
        <span className="ed-warranty-kv" style={{ opacity: Math.min(1, (expanded - 0.45) * 2.5) }}>
          <span className="ed-warranty-divider" style={rel(WARRANTY_DIVIDER)} aria-hidden="true" />
          <span className="ed-warranty-field" style={{ ...rel(WARRANTY_TYPE) }}>
            <em style={{ fontSize: mx(TYPE.warrantyLabel) }}>{SCENIC_WARRANTY.typeLabel}</em>
            <strong style={{ fontSize: mx(TYPE.warrantyValue) }}>{SCENIC_WARRANTY.typeValue}</strong>
          </span>
          <span className="ed-warranty-field" style={{ ...rel(WARRANTY_UNTIL) }}>
            <em style={{ fontSize: mx(TYPE.warrantyLabel) }}>{SCENIC_WARRANTY.untilLabel}</em>
            <strong style={{ fontSize: mx(TYPE.warrantyValue) }}>{SCENIC_WARRANTY.untilValue}</strong>
          </span>
          <span className="ed-warranty-doclabel" style={{ ...rel(WARRANTY_DOC_LABEL), fontSize: mx(TYPE.warrantyDocLabel) }}>
            {SCENIC_WARRANTY.docLabel}
          </span>
        </span>
      ) : null}
      {pdfIn > 0 ? (
        <span
          className="ed-pdf-row"
          data-doc="pdf"
          data-expect={`${WARRANTY_PDF_ROW.x},${WARRANTY_PDF_ROW.y},${WARRANTY_PDF_ROW.w},${WARRANTY_PDF_ROW.h}`}
          style={{ ...rel(WARRANTY_PDF_ROW, rect), opacity: pdfIn, transform: `translateY(${lerp(12, 0, pdfIn)}px)` }}
        >
          <i className="ed-doc-tile" aria-hidden="true">
            PDF
          </i>
          <span className="ed-doc-copy">
            <strong style={{ fontSize: mx(TYPE.warrantyPdfName) }}>{SCENIC_PDF.name}</strong>
            <em style={{ fontSize: mx(TYPE.warrantyPdfMeta) }}>{SCENIC_PDF.meta}</em>
          </span>
        </span>
      ) : null}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* QuestionStage — G10: texto exacto, dos líneas, inmóvil (§20)        */
/* ------------------------------------------------------------------ */

export function QuestionStage({ progress = 1 }: { progress?: number }) {
  return (
    <div className="ed-question" aria-label={FINAL_QUESTION_LINE_1 + ' ' + FINAL_QUESTION_LINE_2}>
      <p
        className="ed-question-text"
        data-expect={`${QUESTION_BOX.x},${QUESTION_BOX.y},${QUESTION_BOX.w},${QUESTION_BOX.h}`}
        style={{
          ...stageStyle(QUESTION_BOX),
          fontSize: mx(TYPE.question),
          opacity: progress,
          transform: `translateY(${lerp(12, 0, progress)}px)`,
        }}
      >
        <span className="ed-qline">{FINAL_QUESTION_LINE_1}</span>
        <span className="ed-qline">{FINAL_QUESTION_LINE_2}</span>
      </p>
    </div>
  )
}

export { PALETTE }
