import HomeHeader from '../HomeDemoScreen/HomeHeader'
import { homeVariables } from '../HomeDemoScreen/homeTokens'
import homiMark from '../../assets/illustrations/homi-mark.svg'
import '../HomeDemoScreen/home-screen.css'
import '../HomiDemoScreen/homi-screen.css'
import './context-screen.css'

type Persona = {
  id: string
  name: string
  initial: string
  color: string
  tag: string
  answer: string
}

const QUESTION = '¿Qué tengo que hacer hoy?'

const PERSONAS: Record<string, Persona> = {
  juli: {
    id: 'juli',
    name: 'Juli',
    initial: 'J',
    color: '#B57A1A',
    tag: 'Colegio',
    answer: 'Hoy tenés Educación Física a la mañana, llevar la autorización y la tarea de Matemática.',
  },
  tomi: {
    id: 'tomi',
    name: 'Tomi',
    initial: 'T',
    color: '#2D6A8A',
    tag: 'Club',
    answer: 'Hoy tenés entrenamiento a las 17 h. Mamá te pasa a buscar a la salida.',
  },
  papa: {
    id: 'papa',
    name: 'Papá',
    initial: 'P',
    color: '#4A4542',
    tag: 'Hogar',
    answer: 'Hoy: Internet ya está pago, revisá la lista de compras y confirmá al técnico.',
  },
}

const CONTEXT_SOURCES = ['Calendario', 'Tareas', 'Pagos']

export default function HomiContextDemoScreen({ stepIndex }: { stepIndex: number }) {
  const person = stepIndex >= 3 ? PERSONAS.papa : stepIndex === 2 ? PERSONAS.tomi : stepIndex === 1 ? PERSONAS.juli : null
  return (
    <div className="home-demo-screen homi-demo-screen" style={homeVariables} data-step={stepIndex} aria-label="Homi entiende tu contexto">
      <HomeHeader showJuli={false} />
      <div className="homi-assistant-bar">
        <img src={homiMark} alt="" aria-hidden="true" width={40} height={40} draggable={false} />
        <div className="homi-assistant-copy">
          <p className="homi-assistant-name">Homi</p>
          <p className="homi-assistant-sub">Asistente del hogar</p>
        </div>
      </div>
      <div className="homi-thread">
        <div className="homi-greeting" data-present={stepIndex === 0} aria-hidden={stepIndex !== 0}>
          <p>¿En qué te ayudo?</p>
        </div>
        <div className="homi-user-bubble" data-present={stepIndex >= 1} aria-hidden={stepIndex < 1}>
          <p>{QUESTION}</p>
        </div>
        <div className="homi-persona" data-present={stepIndex >= 1} aria-hidden={stepIndex < 1}>
          {person && (
            <div key={person.id} className="homi-persona-swap">
              <span className="homi-persona-avatar" style={{ background: person.color }} aria-hidden="true">
                {person.initial}
              </span>
              <div className="homi-persona-copy">
                <p className="homi-persona-name">{person.name}</p>
                <p className="homi-persona-tag">{person.tag}</p>
              </div>
            </div>
          )}
        </div>
        <div className="homi-proposal" data-present={stepIndex >= 1} aria-hidden={stepIndex < 1}>
          {person && (
            <div key={person.id} className="homi-answer-swap">
              <p>{person.answer}</p>
            </div>
          )}
        </div>
        <div className="homi-context" data-present={stepIndex >= 4} aria-hidden={stepIndex < 4}>
          <p className="homi-context-caption">Basado en tu contexto</p>
          <div className="homi-context-chips">
            {CONTEXT_SOURCES.map(source => (
              <span key={source} className="homi-context-chip">{source}</span>
            ))}
          </div>
        </div>
      </div>
      <div className="homi-composer" aria-hidden="true">
        <span className="homi-composer-hint">Pedile algo a Homi…</span>
        <span className="homi-send" />
      </div>
    </div>
  )
}
