import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import homiOrb from '../../assets/illustrations/homi-orb.svg'
import HomeDemoScreen from '../../app-screens/HomeDemoScreen'
import HomePlusLogo from '../../components/HomePlusLogo'
import { homeEventPortalFrame } from '../FinalKitchen/homeScreenTexture'
import { COCA_MESSAGE_FULL, COCA_TASK_TITLE, FIN_CHANGES, FIN_MESSAGE_FULL, PROFILE_ANSWERS, TOMORROW_QUESTION } from './homiV8Data'
import './homi-v9.css'

type Scene = 's15' | 's16' | 's17'
type Props = { scene: Scene; stepIndex: number; directSnapshot?: boolean }

function useTypedText(text: string, enabled: boolean, instant: boolean, interval = 36) {
  const [progress, setProgress] = useState({ text: '', count: 0 })
  useEffect(() => {
    setProgress({ text, count: 0 })
    if (!enabled || instant) return
    let count = 0
    const timer = window.setInterval(() => {
      count = Math.min(count + 1, text.length)
      setProgress({ text, count })
      if (count >= text.length) window.clearInterval(timer)
    }, interval)
    return () => window.clearInterval(timer)
  }, [enabled, instant, interval, text])
  return instant ? text : enabled && progress.text === text ? text.slice(0, progress.count) : ''
}

const TASK_REPLY = 'Entendido. Te preparo una tarea para que la revises.'
const TASK_SUCCESS = `¡Listo! Ya creé la tarea ${COCA_TASK_TITLE} en Planner.`
const FINANCE_REPLY = 'Te preparé estas acciones para que puedas revisarlas.'

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
  const instant = directSnapshot || window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const [openingScene, setOpeningScene] = useState<'s15' | 's16' | null>(null)
  const open = instant || openingScene === scene || !typingStep
  const [readyScene, setReadyScene] = useState<'s15' | 's16' | null>(null)
  useEffect(() => {
    if (instant || !typingStep) return
    const expand = window.setTimeout(() => setOpeningScene(scene), scene === 's16' ? 780 : 220)
    const type = window.setTimeout(() => setReadyScene(scene), scene === 's16' ? 1620 : 1060)
    return () => { window.clearTimeout(expand); window.clearTimeout(type) }
  }, [instant, scene, typingStep])
  const typed = useTypedText(text, typingStep && (instant || readyScene === scene), instant)
  const split = coca && step === 4
  const response = split ? TASK_SUCCESS : coca ? TASK_REPLY : FINANCE_REPLY
  const reply = useTypedText(response, proposalVisible || split, instant || (!coca && step > 2), 25)
  const replyDone = reply === response
  return <article className={`homi-v9-panel homi-v9-chat${split ? ' is-transferring' : open ? ' is-fullscreen' : ''}`} aria-label={coca ? 'Conversación con Homi sobre una tarea' : 'Conversación con Homi sobre acciones financieras'}>
    <HomiHeader />
    <div className="homi-v9-chat-body">
      {sentVisible && <div className="homi-v9-row is-user"><p>{text}</p></div>}
      {thoughtVisible && <div className="homi-v9-row is-homi"><Orb small thinking /><div className="homi-v9-bubble homi-v9-thinking" aria-label="Homi está pensando"><i/><i/><i/></div></div>}
      {proposalVisible && coca && step === 3 && <>
        <div className="homi-v9-row is-homi"><Orb small/><p className="homi-v9-bubble">{reply}{!replyDone && <i className="homi-v9-caret" aria-hidden="true" />}</p></div>
        {replyDone && <div className="homi-v9-row is-homi"><Orb small/><div className="homi-v9-proposal"><label>PROPUESTA DE TAREA</label><h3>{COCA_TASK_TITLE}</h3><p>Mañana · Sin horario definido</p><div className="homi-v9-actions"><span>Cancelar</span><strong>Confirmar</strong></div></div></div>}
      </>}
      {split && <div className="homi-v9-row is-homi"><Orb small/><div className="homi-v9-bubble homi-v9-success">
        <b>{reply.slice(0, 7)}</b>
        <span>{replyDone ? <>Ya creé la tarea <strong>{COCA_TASK_TITLE}</strong> en Planner.</> : <>{reply.slice(8)}<i className="homi-v9-caret" aria-hidden="true" /></>}</span>
        {replyDone && <small>✓ Tarea creada</small>}
      </div></div>}
      {!coca && proposalVisible && step >= 2 && <>
        <div className="homi-v9-row is-homi"><Orb small/><p className="homi-v9-bubble">{reply}{!replyDone && <i className="homi-v9-caret" aria-hidden="true" />}</p></div>
        {replyDone && <div className="homi-v9-row is-homi"><Orb small/><div className="homi-v9-proposal homi-v9-fin-proposal"><div className="homi-v9-fin-title"><h3>Te propongo estas acciones</h3><b>Sin ejecutar</b></div>
          {FIN_CHANGES.map((item, i) => <div key={item.title} className="homi-v9-operation" data-operation={i}><span className="homi-v9-operation-icon">{item.kind === 'Ingreso' ? '＋' : '↗'}</span><span><strong>{item.title}</strong><small>{item.detail}</small></span><em>◷ Pendiente</em></div>)}
          <div className="homi-v9-actions"><span>Cancelar</span><strong>Confirmar</strong></div>
        </div></div>}
      </>}
    </div>
    <div className="homi-v9-composer"><span>{typingStep ? <>{typed}<i className="homi-v9-caret" /></> : 'Preguntale a Homi…'}</span><b aria-hidden="true">↑</b></div>
  </article>
}

const tomorrowProfiles = [
  { id: 'juli', reply: 'Mañana tenés Educación Física. La autorización ya figura como completada. Revisá también la tarea de Matemática.' },
  { id: 'tomi', reply: 'Mañana tenés colegio y entrenamiento. Revisá el horario del club y cómo vas a volver a casa.' },
  { id: 'papa', reply: 'No veo compromisos personales para mañana. En casa queda pendiente revisar la lista de compras compartida.' },
] as const

const contextSources = [
  { module: 'Planner', tab: 'Tareas', tabs: ['Tareas', 'Calendario', 'Planes'], item: 'Tarea de Matemática', detail: 'Juli · Colegio', status: 'Pendiente',
    rows: [['Llevar autorización', 'Juli · Colegio', 'Completada'], ['Preparar la mesa', 'Juli y Tomi', 'Cumpleaños']] },
  { module: 'Planner', tab: 'Calendario', tabs: ['Tareas', 'Calendario', 'Planes'], item: 'Educación Física', detail: 'Mañana · Juli', status: 'Colegio',
    rows: [['Entrenamiento', 'Tomi · Club', 'Actividad'], ['Horarios', 'Rutinas de la familia', 'Calendario']] },
  { module: 'Finanzas', tab: 'Movimientos', tabs: ['Resumen', 'Movimientos', 'Pagos'], item: 'Supermercado', detail: 'Compras · Mercado Pago', status: '−$18.500',
    rows: [['Servicios', 'Movimientos del hogar', '−$12.000'], ['Otros movimientos', 'Transporte y otros', '−$13.000']] },
  { module: 'Inventario', tab: 'Lista de compras', tabs: ['Productos', 'Lista de compras'], item: 'Café', detail: '200 g · En la lista', status: 'Sin stock',
    rows: [['Leche', '3 L', 'Stock bajo'], ['Papel higiénico', '2 u', 'Stock bajo']] },
]

function ContextSources() {
  return <div className="homi-tomorrow-sources">
    {contextSources.map(({ module, tab, tabs, item, detail, status, rows }, index) => (
      <div className="homi-tomorrow-source" key={tab} style={{ '--source-delay': `${index * 1160}ms`, '--source-row': index } as React.CSSProperties}>
        <section className="homi-v9-panel homi-tomorrow-module">
          <div className="homi-v9-product"><HomePlusLogo size={30} /> HomePlus <span>Familia García</span></div>
          <h2>{module}</h2>
          <div className="homi-source-tabs">{tabs.map(label => <span key={label} aria-current={label === tab ? 'page' : undefined}>{label}</span>)}</div>
          <div className="homi-source-rows">
            <div className="homi-source-row is-picked"><div className="homi-tomorrow-record"><strong>{item}</strong><small>{detail}</small></div><b>{status}</b></div>
            {rows.map(([title, meta, badge]) => <div className="homi-source-row" key={title}><div><strong>{title}</strong><small>{meta}</small></div><b>{badge}</b></div>)}
          </div>
        </section>
        <div className="homi-tomorrow-transfer"><strong>{item}</strong><small>{detail}</small></div>
        <div className="homi-tomorrow-received">{item}</div>
      </div>
    ))}
    <aside className="homi-v9-panel homi-tomorrow-inbox"><HomiHeader /></aside>
  </div>
}

function TomorrowChat({ profile, answer, typing = false, side }: {
  profile?: typeof tomorrowProfiles[number]
  answer?: string
  typing?: boolean
  side?: 'left' | 'right'
}) {
  const person = PROFILE_ANSWERS.find(item => item.id === profile?.id)
  return <article className="homi-v9-panel homi-tomorrow-chat" data-side={side}>
    <HomiHeader />
    {person && <div className="homi-tomorrow-person" key={person.id} style={{ '--member-color': person.color } as React.CSSProperties}>
      <span>{person.initial}</span><strong>{person.name}</strong>
    </div>}
    {profile && <div className="homi-tomorrow-messages">
      <div className="homi-v9-row is-user"><p>{TOMORROW_QUESTION}</p></div>
      <div className="homi-v9-row is-homi" key={profile.id}><Orb small /><p className="homi-v9-bubble">
        {answer ?? profile.reply}{typing && <i className="homi-v9-caret" aria-hidden="true" />}
      </p></div>
    </div>}
    {!profile && <div className="homi-v9-composer"><span>{answer}<i className="homi-v9-caret" aria-hidden="true" /></span><b aria-hidden="true">↑</b></div>}
  </article>
}

function TomorrowScene({ beat, instant }: { beat: number; instant: boolean }) {
  const profile = beat >= 2 ? tomorrowProfiles[Math.min(beat - 2, 2)] : undefined
  const response = profile?.reply ?? TOMORROW_QUESTION
  const answer = useTypedText(response, beat >= 1, instant || beat >= 5, profile ? 18 : 36)
  if (beat === 0) return <ContextSources />
  return <div className="homi-tomorrow" data-compare={beat >= 5}>
    <TomorrowChat profile={profile} answer={answer} typing={answer !== response} />
    {beat >= 5 && <>
      <TomorrowChat profile={tomorrowProfiles[0]} side="left" />
      <TomorrowChat profile={tomorrowProfiles[1]} side="right" />
    </>}
  </div>
}

function ContextScene() {
  const homeRef = useRef<HTMLElement>(null)
  useLayoutEffect(() => {
    const home = homeRef.current
    const app = home?.querySelector('.homi-v9-home-app')
    const row = home?.querySelector('[data-home-item="educationPhysical"]')
    const title = row?.querySelector('.home-row-title')
    if (!home || !app || !row || !title) return

    const measure = () => {
      if (home.closest('[data-final-handoff]')) return
      const frame = home.getBoundingClientRect()
      const surface = app.getBoundingClientRect()
      const event = row.getBoundingClientRect()
      const label = title.getBoundingClientRect()
      if (!surface.width || !surface.height || !event.height) return
      const portal = homeEventPortalFrame(frame.width / frame.height)
      const zoom = Math.max(1, frame.height * portal.rowHeight / event.height)
      const targetX = frame.left + frame.width * portal.titleX
      const targetY = frame.top + frame.height * portal.titleY
      const x = targetX - surface.left - (label.left - surface.left) * zoom
      const y = targetY - surface.top - (label.top + label.height / 2 - surface.top) * zoom
      home.style.setProperty('--home-portal-zoom', String(zoom))
      home.style.setProperty('--home-portal-x', `${Math.min(0, x / surface.width) * 100}%`)
      home.style.setProperty('--home-portal-y', `${y / surface.height * 100}%`)
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  return <div className="homi-v9-context is-home-reveal">
    <section ref={homeRef} className="homi-v9-home" aria-label="Inicio de HomePlus">
      <div className="homi-v9-home-brand"><HomePlusLogo size={38}/><span>Home</span></div>
      <div className="homi-v9-integrated-homi"><Orb/><span><b>Homi</b><small>Tu asistente</small></span><span className="homi-v9-open">Abrir</span></div>
      <div className="homi-v9-home-app"><HomeDemoScreen showJuli educationPhysical authorization schoolTask complete authorizationCompleted schoolTaskCompleted /></div>
    </section>
  </div>
}

export default function HomiV9Stage({ scene, stepIndex, directSnapshot = false }: Props) {
  const [arrival, setArrival] = useState({ scene, fromPlanner: false })
  if (arrival.scene !== scene) setArrival({ scene, fromPlanner: arrival.scene === 's15' && scene === 's16' })
  const plannerLeaving = arrival.fromPlanner && scene === 's16' && stepIndex === 0 &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const tomorrowBeat = scene === 's16' && stepIndex >= 4 ? stepIndex - 4 : null

  return <main className="homi-v9-viewport" data-v9-scene={scene} data-v9-step={stepIndex} data-snapshot={directSnapshot}>
    <div className="homi-v9-stage" data-planner-leaving={plannerLeaving || undefined}>
      <div className="homi-v9-glow" aria-hidden="true" />
      {scene !== 's17' ? <>
        {tomorrowBeat !== null ? null : scene === 's15' && stepIndex === 0 ? <section className="homi-v9-intro"><Orb/><h1>Homi</h1><p>Asistente de HomePlus</p></section> : <>
          <Chat scene={scene} step={stepIndex} directSnapshot={directSnapshot} />
          {((scene === 's15' && stepIndex === 4) || plannerLeaving) && <CocaPlanner />}
        </>}
        {tomorrowBeat !== null && <TomorrowScene beat={tomorrowBeat} instant={directSnapshot || window.matchMedia('(prefers-reduced-motion: reduce)').matches} />}
        {scene === 's16' && stepIndex === 3 && <div className="homi-v9-review-label">Revisá cada acción</div>}
      </> : <ContextScene />}
    </div>
  </main>
}
