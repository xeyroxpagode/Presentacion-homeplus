// HOMIE V7 — Director determinista + 7 composiciones, 27 disparadores.
// Cada beat renderiza su estado final estable como función pura del beat:
// avance, retroceso y salto directo reconstruyen el snapshot correcto sin
// reproducir la secuencia. La coreografía de entrada corre como animación
// `both` sobre el montaje (remount por key en cada slide). Sin mutaciones
// reales, sin reloj del sistema, sin autoavance.
//
// Distribución: S15 = B01–B07 · S16 = B08–B13 · S17 = G14–G27.
// B07 y B08 renderizan la MISMA composición integrada (hold idéntico) para
// que la transición S15→S16 no produzca flash ni reconstrucción perceptible.

import { useLayoutEffect, useRef, useState, type CSSProperties } from 'react'
import {
  V7ComposerTyping, V7FrozenMemory, V7HomiAccess, V7HomiConfirmed,
  V7HomiFocused, V7HomiProposal, V7HomiReady, V7HomiRequest, V7PlannerAfterConfirm,
} from './BenjaShots'
import {
  V7ContextViewport, V7HomeFinal, V7HomiIdentity, V7ProfileCard, V7QueryComposer,
  V7QuestionBar, V7SourceChips, profileById,
} from './GabyShots'
import FrictionEchoV4 from '../homi-cinema-v4/FrictionEcho'
import { COCA_MESSAGE_FULL, COCA_TASK_TITLE, D1_LABEL, type HomiV7Beat } from './homiV7Data'
import './homi-v7.css'

// ---------------------------------------------------------------------------
// B06 — Morph propuesta→Planner con rectángulos medidos.
// Origen y destino se convierten al mismo sistema (contenedor del beat).
// Capa compartida temporal; al terminar se elimina por completo.
// Sin doble fila, sin doble texto después del handoff.
// ---------------------------------------------------------------------------
function MorphProposalToPlanner() {
  const rootRef = useRef<HTMLDivElement>(null)
  const [landed, setLanded] = useState(false)
  const [flight, setFlight] = useState<{ dx: number; dy: number; scale: number } | null>(null)

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return
    const source = root.querySelector('[data-morph-source]')
    const target = root.querySelector('[data-task-id="coca-homi-v7"]')
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
        // Handoff al completar el vuelo (~1050ms): fallback si WAAPI falla.
        fallback = window.setTimeout(() => setLanded(true), 1150)
        return () => { cancelAnimationFrame(raf); window.clearTimeout(fallback) }
      }
    }
    // Sin geometría medible: cruce simple pero estado final idéntico.
    fallback = window.setTimeout(() => setLanded(true), 600)
    return () => window.clearTimeout(fallback)
  }, [])

  return (
    <div ref={rootRef} className="v7-morph" data-landed={landed}>
      <div className="v7-morph-planner" aria-label="Planner: tarea creada">
        <V7PlannerAfterConfirm />
      </div>
      {!landed && (
        <div className="v7-morph-source" data-morph-source aria-hidden="true">
          <p className="v7-proposal-kicker">Crear tarea</p>
          <span className="v7-proposal-divider" aria-hidden="true" />
          <p className="v7-proposal-title">{COCA_TASK_TITLE}</p>
          <p className="v7-proposal-date"><span>Mañana · lun 17 de agosto</span></p>
        </div>
      )}
      {flight && !landed && (
        <div
          className="v7-morph-clone"
          aria-hidden="true"
          style={{ '--v7-dx': `${flight.dx}px`, '--v7-dy': `${flight.dy}px`, '--v7-scale': flight.scale } as CSSProperties}
        >
          <p className="v7-proposal-kicker">Crear tarea</p>
          <span className="v7-proposal-divider" aria-hidden="true" />
          <p className="v7-proposal-title">{COCA_TASK_TITLE}</p>
          <p className="v7-proposal-date"><span>Mañana · lun 17 de agosto</span></p>
        </div>
      )}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Composición 04 reutilizada (B07–B12): Planner integrado + Homi contextual.
// Una sola superficie; los beats solo cambian el foco editorial.
// ---------------------------------------------------------------------------
function UnifiedSystem({ beat }: { beat: HomiV7Beat }) {
  const homiDim = beat === 'B08' || beat === 'B09' || beat === 'B10'
  const homiFocus = beat === 'B11'
  const fullPlanner = beat === 'B08' || beat === 'B09' || beat === 'B10'
  return (
    <div
      className="v7-wide"
      data-beat={beat}
      data-homi-dim={homiDim || undefined}
      role="img"
      aria-label="HomePlus: Planner y Homi, un solo sistema"
    >
      <div className="v7-wide-planner" data-full={fullPlanner || undefined}>
        <V7PlannerAfterConfirm wide compare={beat === 'B09'} focusControl={beat === 'B10'} />
      </div>
      {beat !== 'B08' && beat !== 'B09' && beat !== 'B10' ? (
        <div className="v7-wide-access" data-focus={homiFocus || undefined}>
          <V7HomiAccess active={homiFocus} />
        </div>
      ) : (
        <div className="v7-wide-access" data-mini>
          <V7HomiAccess />
        </div>
      )}
      {beat === 'B12' && (
        <div className="v7-memory" role="img" aria-label="La decisión final sigue siendo nuestra">
          <V7FrozenMemory />
        </div>
      )}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Composiciones por beat (7 composiciones, §4).
// ---------------------------------------------------------------------------
function BeatScene({ beat }: { beat: HomiV7Beat }) {
  switch (beat) {
    // ——— C01 · Homi (B01–B03) ———
    case 'B01':
      return (
        <div className="v7-duo">
          <div className="v7-form-exit v7-friction-scope" aria-hidden="true"><FrictionEchoV4 /></div>
          <div className="v7-box v7-homi-enter"><V7HomiReady /></div>
        </div>
      )
    case 'B02':
      return <div className="v7-box v7-homi-center"><V7HomiFocused /></div>
    case 'B03':
      return (
        <div className="v7-box v7-homi-conv">
          <div className="v7-p04">
            <V7HomiRequest />
            <V7ComposerTyping />
          </div>
        </div>
      )
    // ——— C02 · Propuesta (B04–B05) ———
    case 'B04':
      return <div className="v7-box v7-homi-conv"><V7HomiProposal /></div>
    case 'B05':
      return <div className="v7-box v7-homi-conv" data-pressed="true"><V7HomiConfirmed /></div>
    // ——— C03 · Planner (B06) ———
    case 'B06':
      return <div className="v7-box v7-planner-stage"><MorphProposalToPlanner /></div>
    // ——— C04 · Sistema unificado (B07–B12) ———
    case 'B07':
    case 'B08':
    case 'B09':
    case 'B10':
    case 'B11':
    case 'B12':
      return <UnifiedSystem beat={beat} />
    // ——— Negro entre oradores (B13) ———
    case 'B13':
      return <div className="v7-black" aria-label="Fin de la intervención de Benja" />
    // ——— C05 · Homi + contexto (G14–G18) ———
    case 'G14':
      return (
        <div className="v7-context-duo">
          <div className="v7-context-homi">
            <V7HomiIdentity />
            <V7QueryComposer />
          </div>
          <div className="v7-context-vacant" aria-label="Espacio contextual" />
        </div>
      )
    case 'G15':
      return (
        <div className="v7-context-duo">
          <div className="v7-context-homi" data-calm="true">
            <V7HomiIdentity />
          </div>
          <div className="v7-context-frame" data-category="tareas">
            <p className="v7-context-tabs" aria-label="Tareas · Gastos · Compras">
              <span data-active>Tareas</span><span>Gastos</span><span>Compras</span>
            </p>
            <V7ContextViewport module="planner" />
          </div>
        </div>
      )
    case 'G16':
      return (
        <div className="v7-context-duo">
          <div className="v7-context-homi" data-calm="true">
            <V7HomiIdentity />
          </div>
          <div className="v7-context-frame" data-category="gastos">
            <p className="v7-context-tabs" aria-label="Tareas · Gastos · Compras">
              <span>Tareas</span><span data-active>Gastos</span><span>Compras</span>
            </p>
            <V7ContextViewport module="finance" />
          </div>
        </div>
      )
    case 'G17':
      return (
        <div className="v7-context-duo">
          <div className="v7-context-homi" data-calm="true">
            <V7HomiIdentity />
          </div>
          <div className="v7-context-frame" data-category="compras">
            <p className="v7-context-tabs" aria-label="Tareas · Gastos · Compras">
              <span>Tareas</span><span>Gastos</span><span data-active>Compras</span>
            </p>
            <V7ContextViewport module="inventory" />
          </div>
        </div>
      )
    case 'G18':
      return (
        <div className="v7-context-duo" data-converge="true">
          <div className="v7-context-homi" data-regain="true">
            <V7HomiIdentity />
            <V7SourceChips />
          </div>
          <div className="v7-context-vacant" data-leaving="true" aria-hidden="true" />
        </div>
      )
    // ——— C06 · Tres mañanas (G19–G22) ———
    case 'G19':
      return (
        <div className="v7-qa" data-qa="ask">
          <V7QuestionBar />
          <div className="v7-qa-composer"><V7QueryComposer mini /></div>
        </div>
      )
    case 'G20':
      return (
        <div className="v7-qa" data-qa="names">
          <V7QuestionBar />
          <div className="v7-names" aria-label="Tomi, Juli, papá">
            {(['tomi', 'juli', 'papa'] as const).map((id, i) => (
              <span key={id} className="v7-name" data-profile={id} data-i={i}>{profileById(id).name}</span>
            ))}
          </div>
        </div>
      )
    case 'G21':
      return (
        <div className="v7-qa" data-qa="compare">
          <V7QuestionBar />
          <div className="v7-trio" data-count="3" data-compare="true">
            <V7ProfileCard answer={profileById('tomi')} />
            <V7ProfileCard answer={profileById('juli')} />
            <V7ProfileCard answer={profileById('papa')} />
          </div>
        </div>
      )
    case 'G22':
      return (
        <div className="v7-reintegrate">
          <div className="v7-trio" data-count="3" data-compare="true" data-leaving="true">
            <V7ProfileCard answer={profileById('tomi')} />
            <V7ProfileCard answer={profileById('juli')} />
            <V7ProfileCard answer={profileById('papa')} />
          </div>
          <div className="v7-reintegrate-home"><V7HomeFinal /></div>
        </div>
      )
    // ——— C07 · Home final (G23–G27) ———
    case 'G23':
      return <div className="v7-home-stage"><V7HomeFinal /></div>
    case 'G24':
      return <div className="v7-home-stage"><V7HomeFinal dimChrome /></div>
    case 'G25':
      return <div className="v7-home-stage"><V7HomeFinal focus="reminder" dimChrome /></div>
    case 'G26':
      return <div className="v7-home-stage"><V7HomeFinal focus="authorization" dimChrome /></div>
    case 'G27':
      return <div className="v7-home-stage" data-final="true"><V7HomeFinal /></div>
  }
}

const BEAT_LABELS: Record<HomiV7Beat, string> = {
  B01: 'Y ahí aparece HOMIE',
  B02: 'A veces podemos simplemente decir',
  B03: COCA_MESSAGE_FULL,
  B04: 'Geni entiende esa intención',
  B05: 'Recién después de esa confirmación',
  B06: 'HomePlus realiza la acción',
  B07: 'Trabaja sobre HomePlus',
  B08: 'Queremos mirar',
  B09: 'Comparar',
  B10: 'Control visual',
  B11: 'Geni aparece cuando decir es más rápido',
  B12: 'La decisión final sigue siendo nuestra',
  B13: 'Negro: cambio de orador',
  G14: 'Cuando le decimos algo a Homi',
  G15: 'Lo que tenemos pendiente',
  G16: 'Nuestros gastos',
  G17: 'Lo que falta comprar en casa',
  G18: 'Homi agarra lo que necesita',
  G19: 'Qué me queda para mañana',
  G20: 'Tomi, Juli o papá',
  G21: 'La pregunta es la misma, la respuesta no',
  G22: 'Es el mañana de cada uno',
  G23: 'Misma idea con la que pensamos HomePlus',
  G24: 'Más tecnología que administrar',
  G25: 'Recordar menos cosas',
  G26: 'Menos tiempo buscando cosas',
  G27: `El objetivo no es pasar más tiempo en HomePlus · ${D1_LABEL}`,
}

export default function HomiV7Stage({ beat }: { beat: HomiV7Beat }) {
  return (
    <div className="v7-stage" data-beat={beat} aria-label={`HOMIE V7 ${beat}: ${BEAT_LABELS[beat]}`}>
      <div className="v7-layer" data-layer="base" aria-hidden="true" />
      <BeatScene beat={beat} />
    </div>
  )
}
