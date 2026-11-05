import type { CSSProperties } from 'react'
import './c43-continuity.css'

const details = [
  ['Personas', 'Quienes viven en casa'],
  ['Fechas', 'Eventos y horarios'],
  ['Responsabilidades', 'Tareas compartidas'],
  ['Ubicaciones', 'Lugares de todos los días'],
  ['Gastos', 'Compras y pagos'],
  ['Archivos', 'Documentos y recuerdos'],
] as const

const phrases = [
  'Detrás de cada situación',
  'Todo relacionado entre sí.',
]

export default function C43Surface({ active, beat, exit }: { active: boolean; beat: number; exit: boolean }) {
  if (!active) return null

  return (
    <section className="c43-story" data-beat={beat} data-exit={exit} aria-label="Continuidad">
      <div className="c43-network" aria-hidden={beat >= 2}>
        <svg viewBox="0 0 1040 380" aria-hidden="true">
          {[65, 190, 315].map(y => <path key={y} pathLength="1" d={`M245 ${y} C360 ${y} 370 190 520 190 S680 ${y} 795 ${y}`} />)}
        </svg>
        <div className="c43-home">
          <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="m6 22 18-15 18 15M11 19v21h26V19M20 40V28h8v12" />
          </svg>
          <strong>Un hogar</strong>
        </div>
        {details.map(([label, example], index) => (
          <article key={label} style={{ '--order': index, '--row': index % 3 } as CSSProperties} data-side={index < 3 ? 'left' : 'right'}>
            <span>{label}</span><strong>{example}</strong>
          </article>
        ))}
      </div>
      <div className="c43-words" key={beat}>
        {beat < 2 ? <h1>{phrases[beat]}</h1> : <h1>La vida no está separada<br /> <strong>en módulos.</strong></h1>}
      </div>
    </section>
  )
}
