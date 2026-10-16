// HOMIE V8 — Morph propuesta Coca → fila de Planner (P07).
// Transición funcional principal de Benja. No es un crossfade de capturas:
// la entidad Coca viaja como shared element desde el rectángulo fuente medido
// hasta la fila real de Planner. Sin rotación, sin acrobacia, sin duplicados
// visibles después del handoff. Estado final: Planner con la fila Coca real.

import { useLayoutEffect, useRef, useState, type CSSProperties } from 'react'
import PlannerDemoScreen from '../../app-screens/PlannerDemoScreen'
import '../../app-screens/PlannerDemoScreen/planner-screen.css'
import { COCA_OP_KIND, COCA_TASK_TITLE, COCA_TIME, D1_SHORT, PLANNER_AFTER_CONFIRM } from './homiV8Data'

/**
 * Composición transitoria del morph:
 * - Homi reduce su protagonismo a izquierda.
 * - Planner aparece a derecha con la fila destino medible.
 * - El contenido Coca viaja como clon y transfiere visibilidad a la fila real.
 */
export function PlannerTransfer() {
  const rootRef = useRef<HTMLDivElement>(null)
  const [landed, setLanded] = useState(false)
  const [flight, setFlight] = useState<{ dx: number; dy: number; scale: number } | null>(null)

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return
    const source = root.querySelector<HTMLElement>('[data-morph-source]')
    const target = root.querySelector<HTMLElement>('[data-task-id="coca-homi-v8"]')
    let raf = 0
    let fallback = 0
    if (source && target) {
      const s = source.getBoundingClientRect()
      const t = target.getBoundingClientRect()
      if (s.width > 0 && t.width > 0) {
        const dx = t.left + 8 - s.left
        const dy = t.top + t.height / 2 - (s.top + s.height / 2)
        const scale = Math.min(1, (t.width / s.width) * 1.35)
        raf = requestAnimationFrame(() => {
          setFlight({ dx, dy, scale: Math.max(0.55, Math.min(0.95, scale)) })
        })
        fallback = window.setTimeout(() => setLanded(true), 1150)
        return () => { cancelAnimationFrame(raf); window.clearTimeout(fallback) }
      }
    }
    // Sin geometría medible: cruce simple pero estado final idéntico.
    fallback = window.setTimeout(() => setLanded(true), 600)
    return () => window.clearTimeout(fallback)
  }, [])

  return (
    <div ref={rootRef} className="v8-morph" data-landed={landed}>
      <div className="v8-morph-planner" aria-label="Planner: tarea creada">
        <PlannerDemoScreen view="tasks" tasks={PLANNER_AFTER_CONFIRM} emphasizeTasks settled={false} />
      </div>
      {!landed && (
        <div className="v8-morph-source" data-morph-source aria-hidden="true">
          <p className="v8-proposal-kicker">{COCA_OP_KIND}</p>
          <span className="v8-proposal-divider" aria-hidden="true" />
          <p className="v8-proposal-title">{COCA_TASK_TITLE}</p>
          <p className="v8-proposal-date"><span>{D1_SHORT} · {COCA_TIME}</span></p>
        </div>
      )}
      {flight && !landed && (
        <div
          className="v8-morph-clone"
          aria-hidden="true"
          style={{ '--v8-dx': `${flight.dx}px`, '--v8-dy': `${flight.dy}px`, '--v8-scale': flight.scale } as CSSProperties}
        >
          <p className="v8-proposal-kicker">{COCA_OP_KIND}</p>
          <span className="v8-proposal-divider" aria-hidden="true" />
          <p className="v8-proposal-title">{COCA_TASK_TITLE}</p>
          <p className="v8-proposal-date"><span>{D1_SHORT} · {COCA_TIME}</span></p>
        </div>
      )}
    </div>
  )
}
