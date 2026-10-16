// HOMIE V8 — Contexto alrededor de Homi (P16–P18).
// Metáfora cinematográfica (Nivel C): tres piezas simbólicas grandes y
// reconocibles (Tareas / Gastos / Compras) con íconos de assets existentes.
// Sin pantallas completas, sin emojis, sin logos ajenos. Convergencia medida
// hacia la identidad real de Homi. Sin conexiones de neón ni rebotes.

import { useLayoutEffect, useRef, useState, type CSSProperties } from 'react'
import bankIcon from '../../assets/app-icons/bank.svg'
import groceryIcon from '../../assets/illustrations/grocery-bag.svg'
import { V8HomiEmpty } from './HomiComposerScene'

type OrbitMode = 'low' | 'orbit' | 'converge'

const PIECES = [
  { id: 'tareas', label: 'Tareas', sub: 'Pendientes', icon: null },
  { id: 'gastos', label: 'Gastos', sub: 'Del hogar', icon: bankIcon },
  { id: 'compras', label: 'Compras', sub: 'Por comprar', icon: groceryIcon },
] as const

type PieceId = typeof PIECES[number]['id']

function TasksGlyph() {
  return (
    <svg className="v8-piece-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="5" y="3" width="14" height="18" rx="2.5" />
      <path d="M9 3.5h6M9 9h6M9 14h6M9 18h4" />
      <path d="m7.2 9 1 1 1.8-2M7.2 14l1 1 1.8-2" />
    </svg>
  )
}

/** Centros en canvas (contrato §21, verificados contra zonas protegidas). */
const CENTERS: Record<PieceId, { x: number; y: number }> = {
  tareas: { x: 287, y: 287 },
  gastos: { x: 680, y: 250 },
  compras: { x: 917, y: 427 },
}

const ENTRY_STagger = [0, 220, 440] as const

/**
 * P16: Homi low exposure (mismo lenguaje, menor protagonismo).
 * P17: tres piezas contextuales con entrada escalonada por enumeración.
 * P18: convergencia medida hacia la identidad de Homi y disolución.
 */
export function ContextOrbit({ mode }: { mode: OrbitMode }) {
  const rootRef = useRef<HTMLDivElement>(null)
  const [target, setTarget] = useState<{ x: number; y: number } | null>(null)

  // Convergencia: medir el punto funcional real (identidad de Homi).
  useLayoutEffect(() => {
    if (mode !== 'converge') return
    const root = rootRef.current
    if (!root) return
    const identity = root.querySelector<HTMLElement>('[data-v8-homi-identity]')
    if (identity) {
      const r = identity.getBoundingClientRect()
      const host = root.getBoundingClientRect()
      setTarget({ x: r.left + r.width / 2 - host.left, y: r.top + r.height / 2 - host.top })
    }
  }, [mode])

  return (
    <div ref={rootRef} className="v8-orbit" data-mode={mode}>
      <div className="v8-orbit-homi" data-v8-homi-identity>
        <V8HomiEmpty lowExposure />
      </div>
      {PIECES.map((piece, i) => {
        const center = CENTERS[piece.id]
        const style = {
          left: center.x,
          top: center.y,
          '--v8-stagger': `${ENTRY_STagger[i]}ms`,
          ...(mode === 'converge' && target
            ? {
                '--v8-cx': `${target.x - center.x}px`,
                '--v8-cy': `${target.y - center.y}px`,
              }
            : {}),
        } as CSSProperties
        return (
          <div
            key={piece.id}
            className={`v8-piece-${piece.id} v8-piece`}
            data-mode={mode}
            style={style}
            role="img"
            aria-label={piece.label}
          >
            <span className="v8-piece-plate">
              {piece.icon ? <img src={piece.icon} alt="" width={54} height={54} draggable={false} /> : <TasksGlyph />}
              <p className="v8-piece-label">{piece.label}</p>
              <p className="v8-piece-sub">{piece.sub}</p>
            </span>
          </div>
        )
      })}
    </div>
  )
}
