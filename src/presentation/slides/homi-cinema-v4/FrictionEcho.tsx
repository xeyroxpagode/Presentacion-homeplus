// HOMI V4.2 — FrictionEcho: recuerdo escénico del formulario de Fricción V5.
// Origen exacto (rama donante s14/friction-cinematic-v5):
//   src/presentation/slides/S14Barrier/surfaces.tsx  →  FrictionTaskSheet
//   src/presentation/slides/S14Barrier/s14-barrier.css  →  reglas .fr-*
//
// Copia fiel de la anatomía aprobada: mismos elementos, mismos datos
// (SCENIC_TASK = "Preparar la mochila de Juli"), mismos valores. No se
// modificó contenido, no se reconstruyó una segunda versión parecida.
// Superficie escénica de Fricción: sin persistencia, sin mutaciones.
// Las reglas visuales viven en homi-v4.css bajo el prefijo .h4- (.fr-*).

export const SCENIC_TASK = {
  id: 'friction-task-preview',
  title: 'Preparar la mochila de Juli',
  assignee: 'Sin responsable',
  dateFrom: 'Sin fecha',
  dateTo: 'Mañana',
  time: 'Sin hora',
  persisted: false,
} as const

const DATE_OPTIONS = ['Sin fecha', 'Hoy', 'Mañana', 'Sáb 02'] as const

// Estado del recuerdo T02: sheet en reposo, picker cerrado, valor "Mañana"
// visible — tal como el público la recuerda de Fricción. No hay campos
// completándose, no se guarda ninguna tarea.
export default function FrictionEcho() {
  return (
    <div className="fr-sheet" role="dialog" aria-label="Nueva tarea">
      <div className="fr-sheet-handle" aria-hidden="true" />
      <header className="fr-sheet-header">
        <h2 className="fr-sheet-title">Nueva tarea</h2>
        <span className="fr-sheet-x" aria-hidden="true">✕</span>
      </header>
      <div className="fr-sheet-body">
        <div className="fr-sheet-titlefield">
          <span>{SCENIC_TASK.title}</span>
        </div>
        <div className="fr-presets" aria-hidden="true">
          {['Hoy', 'Mañana', 'Finde', 'S/fecha'].map(p => (
            <span key={p} className="fr-preset" data-active={p === 'Mañana'}>{p}</span>
          ))}
        </div>
        <div className="fr-fieldrow" data-field="date">
          <span className="fr-fieldrow-label">Fecha</span>
          <span className="fr-fieldrow-value">
            <span data-val="to">{SCENIC_TASK.dateTo}</span>
          </span>
          <span className="fr-fieldrow-caret" aria-hidden="true">›</span>
        </div>
        <div className="fr-inlinepicker" data-open={false} aria-hidden="true">
          <div className="fr-inlinepicker-inner">
            {DATE_OPTIONS.map(opt => (
              <span key={opt} className="fr-pickeropt" data-selected={opt === 'Mañana'}>{opt}</span>
            ))}
          </div>
        </div>
        <div className="fr-fieldrow" data-field="assignee">
          <span className="fr-fieldrow-label">Responsable</span>
          <span className="fr-fieldrow-value">{SCENIC_TASK.assignee}</span>
          <span className="fr-fieldrow-caret" aria-hidden="true">›</span>
        </div>
        <div className="fr-fieldrow" data-field="time">
          <span className="fr-fieldrow-label">Hora</span>
          <span className="fr-fieldrow-value">{SCENIC_TASK.time}</span>
          <span className="fr-fieldrow-caret" aria-hidden="true">›</span>
        </div>
        <div className="fr-moredetails">Más detalles</div>
      </div>
      <footer className="fr-sheet-footer">
        <span className="fr-cta">Crear tarea</span>
      </footer>
    </div>
  )
}
