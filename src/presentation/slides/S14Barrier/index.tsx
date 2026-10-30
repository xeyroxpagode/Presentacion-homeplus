import { useEffect, useState } from 'react'
import type { SlideProps } from '../../presentationTypes'
import './s14-friction.css'

type NodeKind = 'tasks' | 'files' | 'family' | 'finance'

const NODES: { kind: NodeKind; label: string; className: string }[] = [
  { kind: 'tasks', label: 'Tareas', className: 's14-friction-node-1' },
  { kind: 'files', label: 'Archivos', className: 's14-friction-node-2' },
  { kind: 'family', label: 'Familia', className: 's14-friction-node-3' },
  { kind: 'finance', label: 'Finanzas', className: 's14-friction-node-4' },
]

function NodeIcon({ kind }: { kind: NodeKind }) {
  if (kind === 'tasks') return <><rect x="4" y="4" width="16" height="16" rx="3"/><path d="m8 12 3 3 5-6"/></>
  if (kind === 'files') return <><path d="M7 3h7l5 5v12a1 1 0 0 1-1 1H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z"/><path d="M14 3v6h5M9 13h6M9 17h6"/></>
  if (kind === 'family') return <><circle cx="9" cy="8" r="3"/><path d="M3 20v-2a6 6 0 0 1 12 0v2M17 5a3 3 0 0 1 0 6M17 14a5 5 0 0 1 4 5v1"/></>
  return <><rect x="3" y="5" width="18" height="14" rx="3"/><path d="M3 10h18M7 15h4"/></>
}

function HomeMark() {
  return <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="m3 11 9-8 9 8M5 10v10h14V10M10 20v-7h4v7"/></svg>
}

export default function S14Barrier({ stepIndex }: SlideProps) {
  // Runtime beats 0..2 map to the approved preview's visible steps 1..3.
  const step = Math.min(3, Math.max(1, stepIndex + 1))
  const [entered, setEntered] = useState(false)

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setEntered(true))
    return () => window.cancelAnimationFrame(frame)
  }, [])

  return (
    <section
      className="s14-friction-stage"
      data-step={step}
      data-entered={entered}
      aria-label="Fricción: ¿Y si ni siquiera tuviéramos que saber cómo?"
    >
      <div className="s14-friction-brand" aria-hidden="true">Home<span>Plus</span></div>
      <div className="s14-friction-micro" aria-hidden="true">S14 · FRICCIÓN</div>

      <div className="s14-friction-network" aria-hidden="true">
        <svg className="s14-friction-wires" viewBox="0 0 1600 900" preserveAspectRatio="none" focusable="false">
          <path className="s14-friction-wire" d="M800 450 C680 450 660 305 544 305" />
          <path className="s14-friction-wire" d="M800 450 C920 450 940 305 1056 305" />
          <path className="s14-friction-wire" d="M800 450 C680 450 660 603 544 603" />
          <path className="s14-friction-wire" d="M800 450 C920 450 940 603 1056 603" />
        </svg>

        {NODES.map(({ kind, label, className }) => (
          <div key={kind} className={`s14-friction-node ${className}`}>
            <span className="s14-friction-icon"><svg viewBox="0 0 24 24" focusable="false"><NodeIcon kind={kind}/></svg></span>
            <span className="s14-friction-label">{label}</span>
          </div>
        ))}

        <div className="s14-friction-hub">
          <span className="s14-friction-home-icon"><HomeMark /></span>
          <span className="s14-friction-hub-name">HomePlus</span>
          <span className="s14-friction-question" aria-hidden="true">?</span>
        </div>
      </div>

      <div className="s14-friction-blackout" aria-hidden="true" />
      <div className="s14-friction-final">
        <h1>¿Y si ni siquiera tuviéramos<br/>que saber cómo?</h1>
      </div>
    </section>
  )
}
