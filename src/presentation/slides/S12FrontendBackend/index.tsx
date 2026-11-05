import type { SlideProps } from '../../presentationTypes'
import './s12-layers.css'

function BackendOps() {
  return <div className="s12-back-list">
    <div className="s12-back-op"><svg viewBox="0 0 40 40"><circle cx="20" cy="20" r="14"/><path d="m13 20 5 5 10-11"/></svg>Validar</div>
    <div className="s12-back-op"><svg viewBox="0 0 40 40"><circle cx="14" cy="14" r="6"/><circle cx="28" cy="16" r="5"/><path d="M4 34c0-9 19-9 19 0M22 33c0-7 13-7 13 0"/></svg>Relacionar</div>
    <div className="s12-back-op"><svg viewBox="0 0 40 40"><ellipse cx="20" cy="10" rx="13" ry="6"/><path d="M7 10v20c0 8 26 8 26 0V10M7 20c0 8 26 8 26 0"/></svg>Guardar</div>
  </div>
}

export default function S12FrontendBackend({ stepIndex }: SlideProps) {
  const beat = Math.min(Math.max(stepIndex, 0), 4)
  return <main className="s12-arch-stage" data-step={beat} aria-label="Dos partes. Una experiencia.">
    <h1 className="s12-arch-title">Dos partes. <span>Una experiencia.</span></h1>
    <div className="s12-arch-layout">
      <section className="s12-arch-panel s12-front"><h2>Frontend</h2>
        <div className="s12-expense-sheet"><div className="s12-expense-small">Registrar gasto</div><div className="s12-expense-price">$18.500</div><div className="s12-expense-meta"><span>Compras</span><span className="s12-chip">Hogar</span></div><div className="s12-expense-save" aria-hidden="true">Guardar gasto</div></div>
      </section>
      <div className="s12-arch-connector" aria-hidden="true"/>
      <section className="s12-arch-panel s12-back"><h2>Backend</h2><BackendOps/></section>
    </div>
  </main>
}
