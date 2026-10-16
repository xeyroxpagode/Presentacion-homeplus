/**
 * S14 Friction — canonical product surfaces (V5.0 contract, §§7/10–18).
 *
 * Anatomy authority: Figma census captures
 * (audit/runtime/session-03/figma-reference fig-act-root / fig-act-detail-
 * playstation-5, session-02 fig-cal-Tareas) + §7.1 / §10.1 field contracts.
 * These components are READ-ONLY scenic fixtures: no mutations, no
 * persistence, stable ids (§23). The repo's simplified demo rows
 * (PlannerDemoScreen/AssetsDemoScreen) are NOT reused where they diverge
 * from the census — differences are logged in the freeze doc.
 */

export const SCENIC_TASK = {
  id: 'friction-task-preview',
  title: 'Preparar la mochila de Juli',
  assignee: 'Sin responsable',
  dateFrom: 'Sin fecha',
  dateTo: 'Mañana',
  time: 'Sin hora',
  persisted: false,
} as const

export const SCENIC_ASSET = {
  id: 'ps5',
  name: 'PlayStation 5',
  category: 'Consola',
  nowWith: 'Ahora con Tomi',
  location: 'Está en Casa de Tomi',
  keeper: 'A cargo de Gabriel',
} as const

export const SCENIC_WARRANTY = {
  id: 'r-garantia-ps5',
  name: 'Garantía PlayStation 5',
  meta: 'Garantía · hasta enero de 2027 · 1 documento',
  until: 'enero de 2027',
  sibling: { name: 'Factura de compra.pdf', meta: 'PDF · 1,1 MB' },
} as const

export const SCENIC_PDF = {
  id: 'd-garantia-ps5',
  name: 'Garantía PS5.pdf',
  meta: 'PDF · 620 KB',
  belongsTo: 'Garantía PlayStation 5',
} as const

/** Authentic date options observed in the product InlinePicker (§8.7). */
export const DATE_OPTIONS = ['Sin fecha', 'Hoy', 'Mañana', 'Sáb 02'] as const

/* ------------------------------------------------------------------ */
/* TaskRow — §7.1: min-h 56, pad-left 20, title 15/500, meta 12,      */
/* avatar 16, action lane 88, ··· 44x44, separator 1px inset 20.      */
/* No left checkbox, no main chevron.                                 */
/* ------------------------------------------------------------------ */

export function FrictionTaskRow({ selectedDate = 'Mañana' }: { selectedDate?: string }) {
  return (
    <div className="fr-taskrow" data-scenic={SCENIC_TASK.id}>
      <div className="fr-taskrow-main">
        <span className="fr-taskrow-avatar" aria-hidden="true">?</span>
        <div className="fr-taskrow-copy">
          <p className="fr-taskrow-title" data-shared="task.title">{SCENIC_TASK.title}</p>
          <p className="fr-taskrow-meta" data-shared="task.meta">
            {SCENIC_TASK.assignee} · {selectedDate}
          </p>
        </div>
        <span className="fr-taskrow-action" data-exit="row-action">Me encargo</span>
        <span className="fr-taskrow-menu" data-exit="row-menu" aria-hidden="true">···</span>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* TaskSheet — Nueva tarea (§7.13): sheet 90%, radius 28, header      */
/* 18/700 + X 44 #F4F0EB, presets 96x72, rows 48px, CTA 52 #E7643F.   */
/* ------------------------------------------------------------------ */

export function FrictionTaskSheet({ pickerOpen = false, dateValue = 'Mañana', valueShown }: {
  pickerOpen?: boolean
  dateValue?: string
  /** Explicit value state for exit/freeze snapshots (CSS keyframes drive the live H02 timeline). */
  valueShown?: 'from' | 'to'
}) {
  return (
    <div className="fr-sheet" role="dialog" aria-label="Nueva tarea">
      <div className="fr-sheet-handle" aria-hidden="true" />
      <header className="fr-sheet-header" data-enter="sheet-header">
        <h2 className="fr-sheet-title" data-shared="sheet.title">Nueva tarea</h2>
        <span className="fr-sheet-x" data-enter="sheet-x" aria-hidden="true">✕</span>
      </header>
      <div className="fr-sheet-body">
        <div className="fr-sheet-titlefield" data-shared="sheet.titlefield">
          <span>{SCENIC_TASK.title}</span>
        </div>
        <div className="fr-presets" data-enter="sheet-presets" aria-hidden="true">
          {['Hoy', 'Mañana', 'Finde', 'S/fecha'].map(p => (
            <span key={p} className="fr-preset" data-active={p === 'Mañana'}>{p}</span>
          ))}
        </div>
        <div className="fr-fieldrow" data-field="date" data-picker={pickerOpen} data-value-shown={valueShown}>
          <span className="fr-fieldrow-label">Fecha</span>
          <span className="fr-fieldrow-value" data-shared="task.date">
            <span data-val="from">{SCENIC_TASK.dateFrom}</span>
            <span data-val="to">{dateValue}</span>
          </span>
          <span className="fr-fieldrow-caret" aria-hidden="true">›</span>
        </div>
        <div className="fr-inlinepicker" data-open={pickerOpen} aria-hidden={!pickerOpen}>
          <div className="fr-inlinepicker-inner">
            {DATE_OPTIONS.map(opt => (
              <span key={opt} className="fr-pickeropt" data-selected={opt === 'Mañana'}>{opt}</span>
            ))}
          </div>
        </div>
        <div className="fr-fieldrow" data-field="assignee">
          <span className="fr-fieldrow-label">Responsable</span>
          <span className="fr-fieldrow-value" data-shared="task.assignee">{SCENIC_TASK.assignee}</span>
          <span className="fr-fieldrow-caret" aria-hidden="true">›</span>
        </div>
        <div className="fr-fieldrow" data-field="time">
          <span className="fr-fieldrow-label">Hora</span>
          <span className="fr-fieldrow-value">{SCENIC_TASK.time}</span>
          <span className="fr-fieldrow-caret" aria-hidden="true">›</span>
        </div>
        <div className="fr-moredetails" data-enter="sheet-more">Más detalles</div>
      </div>
      <footer className="fr-sheet-footer" data-enter="sheet-footer">
        <span className="fr-cta" data-shared="sheet.cta">Crear tarea</span>
      </footer>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Assets list — census fig-act-root: search, chips, 328x64 rows,     */
/* avatar 40 radius 12, Package 20, title 15/500, chevron.            */
/* ------------------------------------------------------------------ */

const ASSET_NEIGHBOURS = [
  { name: 'Notebook de trabajo', meta: 'Trabajo' },
  { name: 'PlayStation 5', meta: 'Ahora con Tomi', hero: true },
  { name: 'Taladro Bosch', meta: 'Ahora con Martín — vecino' },
]

export function FrictionAssetsList() {
  return (
    <div className="fr-assets" aria-label="Activos">
      <div className="fr-assets-topbar" aria-hidden="true">
        <span className="fr-assets-back">‹</span>
        <span className="fr-assets-add">＋</span>
      </div>
      <h2 className="fr-assets-h1">Activos</h2>
      <p className="fr-assets-sub">Objetos, vehículos, mascotas y propiedades importantes</p>
      <div className="fr-assets-search" aria-hidden="true">Buscar por nombre, persona o lugar…</div>
      <div className="fr-assets-chips" aria-hidden="true">
        {['Todos', 'Objetos', 'Vehículos', 'Mascotas', 'Propiedades'].map((c, i) => (
          <span key={c} className="fr-assets-chip" data-selected={i === 0}>{c}</span>
        ))}
      </div>
      <div className="fr-assets-list">
        {ASSET_NEIGHBOURS.map(a => (
          <div key={a.name} className="fr-assetrow" data-hero={Boolean(a.hero)} data-asset={a.hero ? 'ps5' : undefined}>
            <span className="fr-assetrow-avatar" data-shared={a.hero ? 'ps5.avatar' : undefined} aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M10 1.8 17 5.4v9.2l-7 3.6-7-3.6V5.4l7-3.6Z" />
                <path d="M3.2 5.5 10 9l6.8-3.5M10 9v9" />
              </svg>
            </span>
            <div className="fr-assetrow-copy">
              <p className="fr-assetrow-title" data-shared={a.hero ? 'ps5.title' : undefined}>{a.name}</p>
              <p className="fr-assetrow-meta" data-shared={a.hero ? 'ps5.meta' : undefined}>{a.meta}</p>
            </div>
            <span className="fr-assetrow-chevron" data-exit={a.hero ? 'ps5.chevron' : undefined} aria-hidden="true">›</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* PS5 detail — census fig-act-detail-playstation-5 (§13).            */
/* ------------------------------------------------------------------ */

export function FrictionPs5Detail() {
  return (
    <div className="fr-ps5" aria-label="PlayStation 5">
      <div className="fr-ps5-topbar" aria-hidden="true">
        <span>‹</span>
        <span className="fr-ps5-topactions" data-enter="ps5.actions">＋&nbsp;&nbsp;···</span>
      </div>
      <div className="fr-ps5-head">
        <span className="fr-ps5-avatar" data-shared="ps5.avatar" aria-hidden="true">
          <svg width="22" height="22" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M10 1.8 17 5.4v9.2l-7 3.6-7-3.6V5.4l7-3.6Z" />
            <path d="M3.2 5.5 10 9l6.8-3.5M10 9v9" />
          </svg>
        </span>
        <div>
          <h2 className="fr-ps5-title" data-shared="ps5.title">{SCENIC_ASSET.name}</h2>
          <p className="fr-ps5-sub" data-enter="ps5.sub">{SCENIC_ASSET.category}</p>
        </div>
      </div>
      <h3 className="fr-ps5-section">Personas y ubicación</h3>
      <div className="fr-ps5-lines">
        <p>{SCENIC_ASSET.nowWith}</p>
        <p>{SCENIC_ASSET.location}</p>
        <p>{SCENIC_ASSET.keeper}</p>
      </div>
      <h3 className="fr-ps5-section">Próximo</h3>
      <div className="fr-ps5-lines"><p>Nada pendiente</p></div>
      <h3 className="fr-ps5-section">Datos y documentos</h3>
      <div className="fr-ps5-docs">
        <div className="fr-docrow" data-record="warranty">
          <span className="fr-docrow-icon" aria-hidden="true">◈</span>
          <div>
            <p className="fr-docrow-title" data-shared="warranty.title">{SCENIC_WARRANTY.name}</p>
            <p className="fr-docrow-meta" data-shared="warranty.meta">{SCENIC_WARRANTY.meta}</p>
          </div>
          <span className="fr-docrow-chevron" aria-hidden="true">›</span>
        </div>
        <div className="fr-docrow" data-record="invoice">
          <span className="fr-docrow-icon" aria-hidden="true">PDF</span>
          <div>
            <p className="fr-docrow-title">{SCENIC_WARRANTY.sibling.name}</p>
            <p className="fr-docrow-meta">{SCENIC_WARRANTY.sibling.meta}</p>
          </div>
          <span className="fr-docrow-chevron" aria-hidden="true">›</span>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Warranty sheet — real record sheet (§16): white, radius 28,        */
/* handle 40x4, title 20/700, X 44, padding 20.                      */
/* ------------------------------------------------------------------ */

export function FrictionWarrantySheet({ docsCam = 0 }: { docsCam?: number }) {
  return (
    <div className="fr-wsheet" role="dialog" aria-label="Garantía PlayStation 5">
      <div className="fr-wsheet-handle" aria-hidden="true" />
      <header className="fr-wsheet-header">
        <h2 className="fr-wsheet-title" data-shared="warranty.title">{SCENIC_WARRANTY.name}</h2>
        <span className="fr-wsheet-x" aria-hidden="true">✕</span>
      </header>
      <div className="fr-wsheet-body" style={{ transform: `translateY(${-docsCam}px)` }}>
        <div className="fr-wsheet-kv">
          <span>Tipo</span><strong>Garantía</strong>
        </div>
        <div className="fr-wsheet-kv">
          <span>Hasta</span><strong data-shared="warranty.meta">{SCENIC_WARRANTY.until}</strong>
        </div>
        <h3 className="fr-wsheet-section">Documentos</h3>
        <div className="fr-pacerow" data-doc="pdf">
          <span className="fr-pacerow-icon" aria-hidden="true">PDF</span>
          <div>
            <p className="fr-pacerow-title" data-shared="pdf.title">{SCENIC_PDF.name}</p>
            <p className="fr-pacerow-meta">{SCENIC_PDF.meta}</p>
          </div>
          <span className="fr-pacerow-chevron" aria-hidden="true">›</span>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* PDF nested detail — authentic nested sheet (§18, ~200ms).          */
/* ------------------------------------------------------------------ */

export function FrictionPdfDetail() {
  return (
    <div className="fr-pdfsheet" role="dialog" aria-label="Garantía PS5.pdf">
      <div className="fr-pdfsheet-handle" aria-hidden="true" />
      <header className="fr-pdfsheet-header">
        <h2 className="fr-pdfsheet-title" data-shared="pdf.title">{SCENIC_PDF.name}</h2>
        <span className="fr-pdfsheet-x" aria-hidden="true">✕</span>
      </header>
      <p className="fr-pdfsheet-meta">{SCENIC_PDF.meta}</p>
      <p className="fr-pdfsheet-belong">Va con: {SCENIC_PDF.belongsTo}</p>
      <div className="fr-pdfsheet-actions">
        <span>Ver los datos</span>
        <span>Ver en HomeCloud</span>
        <span data-danger="true">Quitar de este activo</span>
      </div>
    </div>
  )
}
