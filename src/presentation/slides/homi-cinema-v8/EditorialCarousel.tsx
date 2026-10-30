// HOMIE V8 — Carrusel editorial rápido (P08–P10).
// Un único contenedor inmóvil: los tres fragmentos ocupan el mismo rectángulo
// y todos permanecen montados (alternando visibilidad). Salida por izquierda /
// entrada por derecha, 380ms, sin scroll, sin cromo de navegador ni mockup de
// dispositivo. Los fragmentos son recortes amplificados con anatomía nativa
// del Planner (Nivel B). Sin importes financieros inventados: la comparación
// es por fecha/estado con fixtures reales.

import { useEffect, useState, type CSSProperties } from 'react'
import type { PlannerTask } from '../../app-screens/PlannerDemoScreen/plannerData'
import { juliTasks, schoolEvent } from '../../app-screens/PlannerDemoScreen/plannerData'
import { homeVariables } from '../../app-screens/HomeDemoScreen/homeTokens'
import TaskCompletionMark from '../../app-screens/HomeDemoScreen/TaskCompletionMark'
import '../../app-screens/HomeDemoScreen/home-screen.css'
import '../../app-screens/PlannerDemoScreen/planner-screen.css'
import { COCA_TASK, D1_SHORT, PLANNER_AFTER_CONFIRM } from './homiV8Data'

const V8_CAROUSEL_VARS = {
  ...homeVariables,
  '--home-title-size': '30px',
  '--home-secondary-size': '20px',
  '--task-mark-size': '28px',
  '--home-card-radius': '20px',
} as CSSProperties

const MANANA_TASKS: readonly PlannerTask[] = [
  { id: 'educationPhysical', title: schoolEvent.title, assignee: 'Juli', dueLabel: D1_SHORT },
  COCA_TASK,
]

type FrameState = 'active' | 'leaving' | 'entering' | 'hidden'

function frameStateFor(index: number, active: number, leaving: number | null): FrameState {
  if (index === active) return 'active'
  if (index === leaving) return 'leaving'
  return 'hidden'
}

function TaskRow({ task, id }: { task: PlannerTask; id: string }) {
  return (
    <div className="planner-task-row v8-present" data-task-id={id} data-completed={Boolean(task.completed)}>
      <span className="planner-check-zone"><TaskCompletionMark completed={Boolean(task.completed)} /></span>
      <div className="planner-row-copy">
        <p className="planner-row-title">{task.title}</p>
        <p className="planner-row-meta">
          {task.completed ? <span className="task-completion-label">Completada</span> : `${task.assignee} · ${task.dueLabel}`}
        </p>
      </div>
    </div>
  )
}

function TaskCard({ label, tasks, ids }: { label: string; tasks: readonly PlannerTask[]; ids: string[] }) {
  return (
    <div className="v8-frag-card" aria-label={label}>
      <p className="v8-frag-label">{label}</p>
      <div className="planner-card v8-present">
        {tasks.map((task, i) => <TaskRow key={task.id} id={ids[i]} task={task} />)}
      </div>
    </div>
  )
}

/** P08 · MIRAR: lista ampliada de pendientes. Se ven varias tareas a la vez. */
function FragmentMirar() {
  return (
    <div className="v8-frag" aria-label="Mirar: lista de tareas">
      <p className="v8-frag-heading">Tareas</p>
      <div className="planner-card v8-present">
        {PLANNER_AFTER_CONFIRM.map(task => <TaskRow key={task.id} id={task.id} task={task} />)}
      </div>
    </div>
  )
}

/** P09 · COMPARAR: dos grupos lado a lado (Hoy / Mañana). Se lee por estructura. */
function FragmentComparar() {
  return (
    <div className="v8-frag v8-frag-duo" aria-label="Comparar: hoy y mañana">
      <div className="v8-frag-col" data-side="hoy">
        <TaskCard label="Hoy" tasks={juliTasks} ids={juliTasks.map(task => task.id)} />
      </div>
      <div className="v8-frag-col" data-side="manana">
        <TaskCard label={D1_SHORT} tasks={MANANA_TASKS} ids={MANANA_TASKS.map(task => task.id)} />
      </div>
    </div>
  )
}

/** P10 · CONTROL VISUAL: selector real de Planner + checkbox y estados nativos. */
function FragmentControl() {
  const pending = COCA_TASK
  const done = juliTasks[0]
  return (
    <div className="v8-frag" aria-label="Control visual: selector y estados de tarea">
      <div className="planner-tabs v8-frag-tabs" role="tablist" aria-label="Secciones de Planner">
        <span className="planner-tab-selection" aria-hidden="true" />
        <span className="planner-tab" role="tab" aria-selected="true">Tareas</span>
        <span className="planner-tab" role="tab" aria-selected="false">Calendario</span>
        <span className="planner-tab" role="tab" aria-selected="false">Planes</span>
      </div>
      <div className="planner-card v8-present">
        <TaskRow id={pending.id} task={pending} />
        <TaskRow id={done.id} task={done} />
      </div>
    </div>
  )
}

const FRAGMENTS = [FragmentMirar, FragmentComparar, FragmentControl] as const

export type CarouselFrame = 0 | 1 | 2

/**
 * frame 0 = mirar · 1 = comparar · 2 = control.
 * Los tres frames viven montados; solo cambia la visibilidad con slide.
 */
export function EditorialCarousel({ frame }: { frame: CarouselFrame }) {
  const [active, setActive] = useState<CarouselFrame>(frame)
  const [leaving, setLeaving] = useState<CarouselFrame | null>(null)

  useEffect(() => {
    if (frame === active) return
    setLeaving(active)
    setActive(frame)
    const timer = window.setTimeout(() => setLeaving(null), 420)
    return () => window.clearTimeout(timer)
  }, [frame, active])

  return (
    <div className="v8-carousel" style={V8_CAROUSEL_VARS} role="img" aria-label={['Mirar: lista de tareas', 'Comparar: hoy y mañana', 'Control visual: estados de tarea'][active]}>
      {FRAGMENTS.map((Fragment, i) => (
        <div
          key={i}
          className="v8-carousel-frame"
          data-state={frameStateFor(i, active, leaving)}
          aria-hidden={i !== active}
        >
          <Fragment />
        </div>
      ))}
    </div>
  )
}
