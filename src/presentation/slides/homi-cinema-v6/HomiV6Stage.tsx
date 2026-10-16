// HOMI V6 — Director determinista (§5) + composiciones P01–P38 (§6).
// Cada beat renderiza su estado final estable como función pura del beat:
// avance, retroceso y salto directo reconstruyen el snapshot correcto sin
// reproducir la secuencia. La coreografía de entrada corre como animación
// `both` sobre el montaje (remount por key en cada slide). Sin mutaciones
// reales, sin reloj del sistema, sin autoavance.

import { useLayoutEffect, useRef, useState, type CSSProperties } from 'react'
import {
  V6ComposerTyping, V6FrozenMemory, V6HomiAccess, V6HomiConfirmed,
  V6HomiFocused, V6HomiProposal, V6HomiReady, V6HomiRequest, V6PlannerAfterConfirm,
} from './BenjaShots'
import {
  V6_CLIPPINGS, V6ContextModules, V6HomeFinal, V6HomiIdentity, V6ProfileCard,
  V6QueryComposer, V6QuestionBar, profileById,
} from './GabyShots'
import FrictionEchoV4 from '../homi-cinema-v4/FrictionEcho'
import { COCA_MESSAGE_FULL, COCA_TASK_TITLE, D1_LABEL, type HomiV6Beat } from './homiV6Data'
import './homi-v6.css'

// ---------------------------------------------------------------------------
// P09 — Morph propuesta→Planner con rectángulos medidos (§8.1).
// Origen y destino se convierten al mismo sistema (contenedor del beat).
// Capa compartida temporal; al terminar se elimina por completo.
// ---------------------------------------------------------------------------
function MorphProposalToPlanner() {
  const rootRef = useRef<HTMLDivElement>(null)
  const [landed, setLanded] = useState(false)
  const [flight, setFlight] = useState<{ dx: number; dy: number; scale: number } | null>(null)

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return
    const source = root.querySelector('[data-morph-source]')
    const target = root.querySelector('[data-task-id="coca-homi-v6"]')
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
    <div ref={rootRef} className="v6-morph" data-landed={landed}>
      <div className="v6-morph-planner" aria-label="Planner: tarea creada">
        <V6PlannerAfterConfirm />
      </div>
      {!landed && (
        <div className="v6-morph-source" data-morph-source aria-hidden="true">
          <p className="v6-proposal-kicker">Crear tarea</p>
          <p className="v6-proposal-title">{COCA_TASK_TITLE}</p>
          <p className="v6-proposal-date"><span>Mañana · lun 17 de agosto</span></p>
        </div>
      )}
      {flight && !landed && (
        <div
          className="v6-morph-clone"
          aria-hidden="true"
          style={{ '--v6-dx': `${flight.dx}px`, '--v6-dy': `${flight.dy}px`, '--v6-scale': flight.scale } as CSSProperties}
        >
          <p className="v6-proposal-kicker">Crear tarea</p>
          <span className="v6-proposal-divider" aria-hidden="true" />
          <p className="v6-proposal-title">{COCA_TASK_TITLE}</p>
          <p className="v6-proposal-date"><span>Mañana · lun 17 de agosto</span></p>
        </div>
      )}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Composiciones por beat.
// ---------------------------------------------------------------------------
function BeatScene({ beat }: { beat: HomiV6Beat }) {
  switch (beat) {
    // ——— S15 · Benja: presentación y ejecución ———
    case 'P01':
      return (
        <div className="v6-duo">
          <div className="v6-form-exit v6-friction-scope" aria-hidden="true"><FrictionEchoV4 /></div>
          <div className="v6-box v6-homi-enter"><V6HomiReady /></div>
        </div>
      )
    case 'P02':
      return (
        <div className="v6-duo">
          <div className="v6-echoes" aria-hidden="true">
            <div className="v6-echo" data-echo="planner"><span>Planner · Tareas · Calendario · Planes</span></div>
            <div className="v6-echo" data-echo="add"><span>+</span></div>
            <div className="v6-echo v6-friction-scope" data-echo="form"><FrictionEchoV4 /></div>
          </div>
          <div className="v6-box v6-homi-center"><V6HomiReady /></div>
        </div>
      )
    case 'P03':
      return <div className="v6-box v6-homi-center"><V6HomiFocused /></div>
    case 'P04':
      return (
        <div className="v6-box v6-homi-center">
          <div className="v6-p04">
            <V6HomiRequest />
            <V6ComposerTyping />
          </div>
        </div>
      )
    case 'P05':
      return <div className="v6-box v6-homi-center"><V6HomiProposal /></div>
    case 'P06':
      return <div className="v6-box v6-homi-center" data-calm="true"><V6HomiProposal /></div>
    case 'P07':
      return <div className="v6-box v6-homi-center" data-decide="true"><V6HomiProposal /></div>
    case 'P08':
      return <div className="v6-box v6-homi-center" data-pressed="true"><V6HomiConfirmed /></div>
    case 'P09':
      return <div className="v6-box v6-planner-stage"><MorphProposalToPlanner /></div>
    case 'P10':
      return (
        <div className="v6-wide">
          <div className="v6-wide-planner"><V6PlannerAfterConfirm wide /></div>
          <div className="v6-wide-access"><V6HomiAccess /></div>
        </div>
      )
    // ——— S16 · Benja: interfaz y autoridad humana ———
    case 'P11':
      return (
        <div className="v6-wide" data-homi-dim="true">
          <div className="v6-wide-planner"><V6PlannerAfterConfirm wide /></div>
          <div className="v6-wide-access" data-mini="true"><V6HomiAccess /></div>
        </div>
      )
    case 'P12':
      return (
        <div className="v6-wide">
          <div className="v6-wide-planner" data-full="true"><V6PlannerAfterConfirm wide /></div>
        </div>
      )
    case 'P13':
      return (
        <div className="v6-wide" data-compare="true">
          <div className="v6-wide-planner" data-full="true"><V6PlannerAfterConfirm wide /></div>
        </div>
      )
    case 'P14':
      return (
        <div className="v6-wide">
          <div className="v6-wide-planner" data-full="true"><V6PlannerAfterConfirm wide focusControl /></div>
        </div>
      )
    case 'P15':
      return (
        <div className="v6-wide">
          <div className="v6-wide-planner"><V6PlannerAfterConfirm wide /></div>
          <div className="v6-wide-access" data-focus="true"><V6HomiAccess active /></div>
        </div>
      )
    case 'P16':
      return (
        <div className="v6-integrated" role="img" aria-label="HomePlus: Planner y Homi, un solo sistema">
          <div className="v6-integrated-planner"><V6PlannerAfterConfirm /></div>
          <div className="v6-integrated-homi"><V6HomiConfirmed /></div>
        </div>
      )
    case 'P17':
      return (
        <div className="v6-wide" data-memory="true">
          <div className="v6-wide-planner" data-dim="true"><V6PlannerAfterConfirm wide /></div>
          <div className="v6-memory"><V6FrozenMemory /></div>
        </div>
      )
    case 'P18':
      return (
        <div className="v6-wide" data-memory="true" data-decide="true">
          <div className="v6-wide-planner" data-dim="true"><V6PlannerAfterConfirm wide /></div>
          <div className="v6-memory" data-focus-decide="true"><V6FrozenMemory /></div>
        </div>
      )
    case 'P19':
      return <div className="v6-black" aria-label="Fin de la intervención de Benja" />
    // ——— S17 · Gaby: contexto y propósito ———
    case 'P20':
      return (
        <div className="v6-gaby-intro">
          <V6HomiIdentity />
          <V6QueryComposer />
        </div>
      )
    case 'P21':
      return (
        <div className="v6-context">
          <V6ContextModules focus={null} />
          <div className="v6-context-homi"><V6HomiIdentity /></div>
        </div>
      )
    case 'P22':
      return (
        <div className="v6-context">
          <V6ContextModules focus="planner" />
          <div className="v6-context-homi"><V6HomiIdentity /></div>
        </div>
      )
    case 'P23':
      return (
        <div className="v6-context">
          <V6ContextModules focus="finance" />
          <div className="v6-context-homi"><V6HomiIdentity /></div>
        </div>
      )
    case 'P24':
      return (
        <div className="v6-context">
          <V6ContextModules focus="inventory" />
          <div className="v6-context-homi"><V6HomiIdentity /></div>
        </div>
      )
    case 'P25':
      return (
        <div className="v6-converge">
          <V6ContextModules focus={null} />
          <div className="v6-clips" aria-hidden="true">
            {V6_CLIPPINGS.map((clip, i) => (
              <div key={clip.id} className="v6-clip" data-clip={clip.from} data-i={i}>
                <p className="v6-clip-title">{clip.title}</p>
                <p className="v6-clip-meta">{clip.meta}</p>
              </div>
            ))}
          </div>
          <div className="v6-converge-homi"><V6HomiIdentity /></div>
        </div>
      )
    case 'P26':
      return (
        <div className="v6-gaby-intro" data-composer-main="true">
          <V6HomiIdentity />
          <V6QueryComposer />
        </div>
      )
    case 'P27':
      return (
        <div className="v6-qa" data-qa="ask">
          <V6QuestionBar />
          <div className="v6-qa-composer"><V6QueryComposer mini /></div>
        </div>
      )
    case 'P28':
      return (
        <div className="v6-qa" data-qa="tomi">
          <V6QuestionBar />
          <div className="v6-trio" data-count="1">
            <V6ProfileCard answer={profileById('tomi')} layout="center" />
          </div>
        </div>
      )
    case 'P29':
      return (
        <div className="v6-qa" data-qa="juli">
          <V6QuestionBar />
          <div className="v6-trio" data-count="2">
            <V6ProfileCard answer={profileById('tomi')} layout="left" />
            <V6ProfileCard answer={profileById('juli')} layout="center" />
          </div>
        </div>
      )
    case 'P30':
      return (
        <div className="v6-qa" data-qa="papa">
          <V6QuestionBar />
          <div className="v6-trio" data-count="3">
            <V6ProfileCard answer={profileById('tomi')} layout="left" />
            <V6ProfileCard answer={profileById('juli')} layout="center" />
            <V6ProfileCard answer={profileById('papa')} layout="right" />
          </div>
        </div>
      )
    case 'P31':
      return (
        <div className="v6-qa" data-qa="compare">
          <V6QuestionBar />
          <div className="v6-trio" data-count="3" data-compare="true">
            <V6ProfileCard answer={profileById('tomi')} layout="trio" />
            <V6ProfileCard answer={profileById('juli')} layout="trio" />
            <V6ProfileCard answer={profileById('papa')} layout="trio" />
          </div>
        </div>
      )
    case 'P32':
      return (
        <div className="v6-reintegrate">
          <div className="v6-trio" data-count="3" data-compare="true" data-leaving="true">
            <V6ProfileCard answer={profileById('tomi')} layout="trio" />
            <V6ProfileCard answer={profileById('juli')} layout="trio" />
            <V6ProfileCard answer={profileById('papa')} layout="trio" />
          </div>
          <div className="v6-reintegrate-home"><V6HomeFinal /></div>
        </div>
      )
    case 'P33':
      return (
        <div className="v6-home-stage">
          <V6HomeFinal />
          <div className="v6-home-dock" data-scenic="true" role="img" aria-label="Homi en su lugar dentro de HomePlus (capa editorial)">
            <V6HomiAccess />
          </div>
        </div>
      )
    case 'P34':
      return <div className="v6-home-stage"><V6HomeFinal dimChrome /></div>
    case 'P35':
      return <div className="v6-home-stage"><V6HomeFinal focus="reminder" dimChrome /></div>
    case 'P36':
      return <div className="v6-home-stage"><V6HomeFinal focus="authorization" dimChrome /></div>
    case 'P37':
      return <div className="v6-home-stage"><V6HomeFinal /></div>
    case 'P38':
      return <div className="v6-home-stage" data-final="true"><V6HomeFinal /></div>
  }
}

const BEAT_LABELS: Record<HomiV6Beat, string> = {
  P01: 'Y ahí aparece Homi',
  P02: 'Dónde entrar o qué botón tocar',
  P03: 'Decir qué queremos hacer',
  P04: COCA_MESSAGE_FULL,
  P05: 'Homi entiende la intención',
  P06: 'Nos muestra una propuesta',
  P07: 'Nosotros decidimos',
  P08: 'Recién después de esa confirmación',
  P09: 'HomePlus realiza la acción',
  P10: 'Trabaja sobre HomePlus',
  P11: 'No reemplazar la aplicación por un chat',
  P12: 'Mirar',
  P13: 'Comparar',
  P14: 'Control visual',
  P15: 'Decir es más rápido que encontrar',
  P16: 'Dos formas, un mismo sistema',
  P17: 'Cambiar algo importante',
  P18: 'La decisión final sigue siendo nuestra',
  P19: 'Negro: cambio de orador',
  P20: 'No siempre buscamos algo en particular',
  P21: 'Homi relaciona las cosas',
  P22: 'Lo pendiente',
  P23: 'Nuestros gastos',
  P24: 'Lo que falta comprar',
  P25: 'Homi agarra lo que necesita',
  P26: 'Algo tan simple como',
  P27: 'Qué me queda para mañana',
  P28: 'La puede hacer Tomi',
  P29: 'Juli',
  P30: 'O papá',
  P31: 'La pregunta es la misma, la respuesta no',
  P32: 'El mañana de cada uno',
  P33: 'La misma idea de HomePlus',
  P34: 'No más tecnología que administrar',
  P35: 'Recordar menos cosas',
  P36: 'Menos tiempo buscando',
  P37: 'Menos preocupaciones',
  P38: `El objetivo no es pasar más tiempo en HomePlus · ${D1_LABEL}`,
}

export default function HomiV6Stage({ beat }: { beat: HomiV6Beat }) {
  return (
    <div className="v6-stage" data-beat={beat} aria-label={`HOMI V6 ${beat}: ${BEAT_LABELS[beat]}`}>
      <div className="v6-layer" data-layer="base" aria-hidden="true" />
      <BeatScene beat={beat} />
    </div>
  )
}
