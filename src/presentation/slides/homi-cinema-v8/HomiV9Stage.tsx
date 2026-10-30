import { useEffect, useState } from 'react'
import homiOrb from '../../assets/illustrations/homi-orb.svg'
import HomeDemoScreen from '../../app-screens/HomeDemoScreen'
import HomePlusLogo from '../../components/HomePlusLogo'
import { COCA_MESSAGE_FULL, COCA_TASK_TITLE, FIN_CHANGES, FIN_MESSAGE_FULL, PROFILE_ANSWERS, TOMORROW_QUESTION } from './homiV8Data'
import './homi-v9.css'

type Scene = 's15' | 's16' | 's17'
type Props = { scene: Scene; stepIndex: number; directSnapshot?: boolean }

function useTypedText(text: string, enabled: boolean, instant: boolean) {
  const [typed, setTyped] = useState(instant ? text : '')
  useEffect(() => {
    setTyped(instant ? text : '')
    if (!enabled || instant) return
    let count = 0
    const timer = window.setInterval(() => {
      count = Math.min(count + 1, text.length)
      setTyped(text.slice(0, count))
      if (count >= text.length) window.clearInterval(timer)
    }, 36)
    return () => window.clearInterval(timer)
  }, [enabled, instant, text])
  return typed
}

function Orb({ small = false, thinking = false }: { small?: boolean; thinking?: boolean }) {
  return <img className={`homi-v9-orb${small ? ' is-small' : ''}${thinking ? ' is-thinking' : ''}`} src={homiOrb} alt="" aria-hidden="true" />
}

function HomiHeader() {
  return <header className="homi-v9-header"><Orb /><span><strong>Homi</strong><small>Asistente de HomePlus</small></span></header>
}

function CocaPlanner() {
  return <section className="homi-v9-panel homi-v9-planner" aria-label="Planner: tarea creada">
    <div className="homi-v9-product"><HomePlusLogo size={28} /> <span>Planner</span></div>
    <h2>Tareas</h2><div className="homi-v9-tabs">Pendientes <span>Hechas</span></div>
    <div className="homi-v9-date">Mañana · lunes 17 de agosto</div>
    <div className="homi-v9-task is-highlighted"><span className="homi-v9-check" /> <span><b>{COCA_TASK_TITLE}</b><small>Sin horario definido</small></span></div>
    <div className="homi-v9-task"><span className="homi-v9-check" />Educación Física</div>
    <div className="homi-v9-task"><span className="homi-v9-check" />Matemática</div>
  </section>
}

function Chat({ scene, step, directSnapshot }: { scene: 's15' | 's16'; step: number; directSnapshot: boolean }) {
  const coca = scene === 's15'
  const text = coca ? COCA_MESSAGE_FULL : FIN_MESSAGE_FULL
  const typingStep = coca ? step === 1 : step === 0
  const sentVisible = coca ? step >= 2 : step >= 1
  const thoughtVisible = coca ? step === 2 : step === 1
  const proposalVisible = coca ? step === 3 : step >= 2
  const typed = useTypedText(text, typingStep, directSnapshot)
  const split = coca && step === 4
  return <article className={`homi-v9-panel homi-v9-chat${split ? ' is-transferring' : ''}`} aria-label={coca ? 'Conversación con Homi sobre una tarea' : 'Conversación con Homi sobre acciones financieras'}>
    <HomiHeader />
    <div className="homi-v9-chat-body">
      {sentVisible && <div className="homi-v9-row is-user"><p>{text}</p></div>}
      {thoughtVisible && <div className="homi-v9-row is-homi"><Orb small thinking /><div className="homi-v9-bubble homi-v9-thinking" aria-label="Homi está pensando"><i/><i/><i/></div></div>}
      {proposalVisible && coca && step === 3 && <>
        <div className="homi-v9-row is-homi"><Orb small/><p className="homi-v9-bubble">Entendido. Te preparo una tarea para que la revises.</p></div>
        <div className="homi-v9-row is-homi"><Orb small/><div className="homi-v9-proposal"><label>PROPUESTA DE TAREA</label><h3>{COCA_TASK_TITLE}</h3><p>Mañana · Sin horario definido</p><div className="homi-v9-actions"><span>Cancelar</span><strong>Confirmar</strong></div></div></div>
      </>}
      {coca && step === 4 && <div className="homi-v9-row is-homi"><Orb small/><div className="homi-v9-bubble homi-v9-success"><b>¡Listo!</b><span>Ya creé la tarea <strong>{COCA_TASK_TITLE}</strong> en Planner.</span><small>✓ Tarea creada</small></div></div>}
      {!coca && proposalVisible && step >= 2 && <>
        <div className="homi-v9-row is-homi"><Orb small/><div className="homi-v9-proposal homi-v9-fin-proposal"><div className="homi-v9-fin-title"><h3>Te propongo estas acciones</h3><b>Sin ejecutar</b></div>
          {FIN_CHANGES.map((item, i) => <div key={item.title} className="homi-v9-operation" data-operation={i}><span className="homi-v9-operation-icon">{item.kind === 'Ingreso' ? '＋' : '↗'}</span><span><strong>{item.title}</strong><small>{item.detail}</small></span><em>◷ Pendiente</em></div>)}
          <div className="homi-v9-actions"><span>Cancelar</span><strong>Confirmar</strong></div>
        </div></div>
      </>}
    </div>
    <div className="homi-v9-composer"><span>{typingStep ? <>{typed}<i className="homi-v9-caret" /></> : 'Preguntale a Homi…'}</span><b aria-hidden="true">↑</b></div>
  </article>
}

function ContextScene({ step }: { step: number }) {
  return <div className={`homi-v9-context${step === 1 ? ' is-home-reveal' : ''}`}>
    {step === 0 ? <>
      <h1 className="homi-v9-question">{TOMORROW_QUESTION}</h1>
      <div className="homi-v9-member-grid">{['juli', 'tomi', 'papa'].map(id => {
        const person = PROFILE_ANSWERS.find(answer => answer.id === id)!
        return <article className="homi-v9-member" key={person.id} style={{ '--member-color': person.color } as React.CSSProperties}>
          <header><span>{person.initial}</span><strong>{person.name}</strong></header><small className="homi-v9-member-date">{person.whenRef}</small>
          {person.records.map(record => <div className="homi-v9-member-record" key={record.title}><b>{record.title}</b><small>{record.meta}</small></div>)}
        </article>
      })}</div>
    </> : <section className="homi-v9-home" aria-label="Inicio de HomePlus">
      <div className="homi-v9-home-brand"><HomePlusLogo size={38}/><span>Home</span></div>
      <div className="homi-v9-integrated-homi"><Orb/><span><b>Homi</b><small>Tu asistente</small></span><span className="homi-v9-open">Abrir</span></div>
      <div className="homi-v9-home-app"><HomeDemoScreen showJuli educationPhysical authorization schoolTask /></div>
    </section>}
  </div>
}

export default function HomiV9Stage({ scene, stepIndex, directSnapshot = false }: Props) {
  return <main className="homi-v9-viewport" data-v9-scene={scene} data-v9-step={stepIndex} data-snapshot={directSnapshot}>
    <div className="homi-v9-stage">
      <div className="homi-v9-glow" aria-hidden="true" />
      {scene !== 's17' ? <>
        {scene === 's15' && stepIndex === 0 ? <section className="homi-v9-intro"><Orb/><h1>Homi</h1><p>Asistente de HomePlus</p></section> : <>
          <Chat scene={scene} step={stepIndex} directSnapshot={directSnapshot} />
          {scene === 's15' && stepIndex === 4 && <CocaPlanner />}
        </>}
        {scene === 's16' && stepIndex === 3 && <div className="homi-v9-review-label">Revisá cada acción</div>}
      </> : <ContextScene step={stepIndex} />}
    </div>
  </main>
}
