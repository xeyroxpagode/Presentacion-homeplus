// HOMIE V8 — Superficies del shell Homi (P01–P04, P11–P13, P16).
// Adaptadores de sólo presentación: reutilizan la anatomía nativa
// (.homi-*) sin alterar producción. Toda amplificación vive bajo `.v8-stage`.
// El cuerpo del Homi vacío es intencional: no se agregan frases, cards,
// etiquetas ni instrucciones adicionales.

import { useLayoutEffect, useRef, useState, type CSSProperties } from 'react'
import homiMark from '../../assets/illustrations/homi-mark.svg'
import { homeVariables } from '../../app-screens/HomeDemoScreen/homeTokens'
import '../../app-screens/HomeDemoScreen/home-screen.css'
import '../../app-screens/HomiDemoScreen/homi-screen.css'

/** Tokens editoriales V8 para Homi (amplificación solo por tokens). */
export const V8_HOMI_VARS = {
  ...homeVariables,
  '--home-title-size': '42px',
  '--home-secondary-size': '30px',
  '--home-body-size': '22px',
  '--task-mark-size': '34px',
} as CSSProperties

type ShellProps = {
  label: string
  children?: React.ReactNode
  composer?: React.ReactNode
  overlay?: React.ReactNode
  lowExposure?: boolean
  shellRef?: React.Ref<HTMLDivElement>
}

function HomiShell({ label, children, composer, overlay, lowExposure = false, shellRef }: ShellProps) {
  return (
    <div
      ref={shellRef}
      className={`home-demo-screen homi-demo-screen v8-homi${lowExposure ? ' v8-homi-low' : ''}`}
      style={V8_HOMI_VARS}
      aria-label={label}
    >
      <div className="homi-assistant-bar">
        <img src={homiMark} alt="" aria-hidden="true" width={40} height={40} draggable={false} />
        <div className="homi-assistant-copy">
          <p className="homi-assistant-name">Homi</p>
          <p className="homi-assistant-sub">Asistente del hogar</p>
        </div>
      </div>
      <div className="homi-thread">{children}</div>
      {composer ?? (
        <div className="homi-composer" aria-hidden="true">
          <span className="homi-composer-hint">Pedile algo a Homi…</span>
          <span className="homi-send" />
        </div>
      )}
      {overlay}
    </div>
  )
}

/** P01/P11/P16: Homi vacío. Sin greeting, sin cards: vacío intencional. */
export function V8HomiEmpty({ lowExposure = false }: { lowExposure?: boolean }) {
  return <HomiShell label="Homi, asistente de HomePlus" lowExposure={lowExposure} />
}

/** Shell Homi conversacional con contenido de hilo arbitrario (P04–P06). */
export function V8HomiThread({ children, label }: { children: React.ReactNode; label: string }) {
  return <HomiShell label={label}>{children}</HomiShell>
}

/** P02: composer en foco con cursor. El panel no se mueve, no hay zoom. */
export function V8HomiFocused() {
  return (
    <HomiShell
      label="Homi, asistente de HomePlus, composer en foco"
      composer={(
        <div className="homi-composer v8-composer-focus" aria-hidden="true">
          <span className="homi-composer-hint">Pedile algo a Homi…</span>
          <span className="v8-caret" />
          <span className="homi-send" />
        </div>
      )}
    />
  )
}

// ---------------------------------------------------------------------------
// Escritura del composer → burbuja (P03, P12).
// Una sola representación del contenido: el texto nace en el composer, viaja
// como clon medido hasta la burbuja y el composer queda libre. Nunca dos
// copias completas visibles durante el viaje.
// ---------------------------------------------------------------------------
type TravelPhase = 'typing' | 'travel' | 'sent'

function ComposerToBubble({ groups, bubbleLabel, fontSize, typingMs, directSnapshot }: {
  groups: readonly string[]
  bubbleLabel: string
  fontSize: string
  typingMs: number
  directSnapshot: boolean
}) {
  const shellRef = useRef<HTMLDivElement>(null)
  const composerRef = useRef<HTMLDivElement>(null)
  const bubbleRef = useRef<HTMLDivElement>(null)
  const [phase, setPhase] = useState<TravelPhase>(directSnapshot ? 'sent' : 'typing')
  const [flight, setFlight] = useState<{ left: number; top: number; width: number; dx: number; dy: number; scale: number } | null>(null)
  const travelMs = 400

  useLayoutEffect(() => {
    if (directSnapshot) return
    let landTimer = 0
    const typingTimer = window.setTimeout(() => {
      const root = shellRef.current
      const from = composerRef.current
      const to = bubbleRef.current
      if (root && from && to) {
        const host = root.getBoundingClientRect()
        const s = from.getBoundingClientRect()
        const t = to.getBoundingClientRect()
        if (s.width > 0 && t.width > 0) {
          const dx = t.left + t.width / 2 - (s.left + s.width / 2)
          const dy = t.top + t.height / 2 - (s.top + s.height / 2)
          setFlight({
            left: s.left - host.left,
            top: s.top - host.top,
            width: s.width,
            dx,
            dy,
            scale: Math.max(0.6, Math.min(0.95, t.width / s.width)),
          })
        }
      }
      setPhase('travel')
      landTimer = window.setTimeout(() => setPhase('sent'), travelMs)
    }, typingMs)
    return () => {
      window.clearTimeout(typingTimer)
      window.clearTimeout(landTimer)
    }
  }, [directSnapshot, typingMs])

  const text = groups.join(' ')

  return (
    <HomiShell
      label={bubbleLabel}
      shellRef={shellRef}
      composer={phase === 'typing' ? (
        <div ref={composerRef} className="homi-composer v8-composer-typing" aria-hidden="true" data-v8-typing>
          <span className="v8-typing-text" style={{ fontSize }}>
            {groups.map((group, i) => (
              <span key={group} className="v8-typing-group" data-group={i}>{group}{(i < groups.length - 1) ? ' ' : ''}</span>
            ))}
          </span>
          <span className="v8-caret" />
          <span className="homi-send" />
        </div>
      ) : (
        <div className="homi-composer" aria-hidden="true">
          <span className="homi-composer-hint">Pedile algo a Homi…</span>
          <span className="homi-send" />
        </div>
      )}
      overlay={phase === 'travel' && flight ? (
        <div
          className="v8-send-clone"
          aria-hidden="true"
          style={{
            left: flight.left,
            top: flight.top,
            width: flight.width,
            '--v8-dx': `${flight.dx}px`,
            '--v8-dy': `${flight.dy}px`,
            '--v8-scale': flight.scale,
            fontSize,
          } as CSSProperties}
        >
          {text}
        </div>
      ) : undefined}
    >
      <div ref={bubbleRef} data-v8-bubble-zone className={`v8-sent-zone${phase === 'sent' ? '' : ' v8-sent-pending'}`}>
        <div className="homi-user-bubble v8-present" aria-label={bubbleLabel}>
          <p>{text}</p>
        </div>
      </div>
    </HomiShell>
  )
}

/** P03: pedido Coca. Escritura en 3 segmentos + envío hacia la burbuja. */
export function V8CocaTyping({ message, groups, directSnapshot = false }: { message: string; groups: readonly string[]; directSnapshot?: boolean }) {
  return <ComposerToBubble groups={groups} bubbleLabel={message} fontSize="30px" typingMs={1350} directSnapshot={directSnapshot} />
}

/** P12: petición financiera importante. Mismo mecanismo, texto congelado. */
export function V8FinTyping({ message, groups, directSnapshot = false }: { message: string; groups: readonly string[]; directSnapshot?: boolean }) {
  return <ComposerToBubble groups={groups} bubbleLabel={message} fontSize="27px" typingMs={900} directSnapshot={directSnapshot} />
}

// ---------------------------------------------------------------------------
// Indicador de interpretación (P04, P13): identidad y comportamiento idénticos.
// Tres puntos mínimos en la misma línea. Nunca un loop infinito: si el
// orador no avanza, el indicador queda en estado estático.
// ---------------------------------------------------------------------------
export function V8Thinking() {
  return (
    <div className="v8-thinking" role="status" aria-label="Homi está interpretando">
      <span>Interpretando</span>
      <span className="v8-thinking-dots" aria-hidden="true">
        <i /><i /><i />
      </span>
    </div>
  )
}
