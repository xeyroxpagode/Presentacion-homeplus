import type { SlideProps } from '../../presentationTypes'
import S13Stack from '../S13Stack'
import './s14-barrier.css'

const routes = [
  { id: 'tareas', nodes: ['Home', 'Planner', 'Tareas', '+'] },
  { id: 'documentos', nodes: ['Home', 'Assets', 'PlayStation 5', 'Documentos'] },
]

export default function S14Barrier({ stepIndex }: SlideProps) {
  return (
    <div className="s14-stage" data-step={stepIndex} aria-label="La barrera de la navegación">
      <div className="s14-echo" aria-hidden="true">
        <S13Stack stepIndex={3} />
      </div>
      <div className="s14-routes" data-dim={stepIndex >= 3} aria-hidden={stepIndex === 0 || stepIndex >= 4}>
        {routes.map((route, index) => (
          <div key={route.id} className="s14-route" data-present={stepIndex >= index + 1 && stepIndex <= 3} aria-hidden={stepIndex < index + 1 || stepIndex >= 4}>
            {route.nodes.map((node, i) => (
              <span key={node} className="s14-route-step">
                {i > 0 && <span className="s14-route-arrow" aria-hidden="true">→</span>}
                <span className={node === '+' ? 's14-node s14-node-action' : 's14-node'}>{node}</span>
              </span>
            ))}
          </div>
        ))}
      </div>
      <div className="s14-barrier" data-present={stepIndex === 3} aria-hidden={stepIndex !== 3} />
      <p className="s14-question" data-present={stepIndex >= 4} aria-hidden={stepIndex < 4}>
        <span className="s14-question-line">¿Y si ni siquiera</span>
        <span className="s14-question-line s14-question-line-quiet">tuviéramos que saber cómo?</span>
      </p>
    </div>
  )
}
