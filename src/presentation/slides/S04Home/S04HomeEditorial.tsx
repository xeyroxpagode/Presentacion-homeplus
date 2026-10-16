// S04 — Home editorial horizontal (encapsulado en capa de presentación).
// Reutiliza EXCLUSIVAMENTE datos reales de HomeDemoScreen/HomeRow/HomeHeader:
// Juli · Familia García · Domingo, 16 de agosto · Hoy · Próximamente ·
// Educación Física (event, "Mañana") · Llevar autorización (task) ·
// Tarea de Matemática (task) · Completada. Sin Planner/Family aquí.
// Beats: 0 superficie+composición · 1 Juli centro · 2 EF hero ·
// 3 autorización hero · 4 matemática hero+integración · 5 retorno+focus.
import { useEffect, useMemo, useRef, useState } from 'react'
import { homeTokens } from '../../app-screens/HomeDemoScreen/homeTokens'
import './s04-editorial.css'

const SURFACE = homeTokens.colors.canvas

function clamp01(v: number): number {
  return v < 0 ? 0 : v > 1 ? 1 : v
}

function frozenS04(): number | null {
  if (typeof window === 'undefined') return null
  const raw = new URLSearchParams(window.location.search).get('s04p')
  if (raw === null || raw === '') return null
  const v = Number(raw)
  return Number.isFinite(v) ? clamp01(v) : null
}

function reducedMotion(): boolean {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function useS04Progress(stepIndex: number): number {
  const freeze = useMemo(() => frozenS04(), [stepIndex])
  const reduce = useMemo(() => reducedMotion(), [])
  const identity = `${stepIndex}|${freeze === null ? 'live' : `f${freeze}`}|${reduce ? 'r' : 'm'}`
  const [state, setState] = useState(() => ({
    id: identity, progress: freeze !== null ? freeze : reduce ? 1 : 0,
  }))
  if (state.id !== identity) {
    setState({ id: identity, progress: freeze !== null ? freeze : reduce ? 1 : 0 })
  }
  const generation = useRef(0)
  useEffect(() => {
    if (freeze !== null || reduce) return
    const myGen = ++generation.current
    let raf = 0
    let start = -1
    const tick = (now: number) => {
      if (myGen !== generation.current) return
      if (start < 0) start = now
      const t = clamp01((now - start) / 650)
      setState(prev => (prev.id === identity ? { ...prev, progress: t } : prev))
      if (t < 1 && myGen === generation.current) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => {
      if (myGen === generation.current) generation.current++
      cancelAnimationFrame(raf)
    }
  }, [identity, freeze, reduce])
  if (state.id !== identity) return freeze !== null ? freeze : reduce ? 1 : 0
  return freeze ?? state.progress
}

const lerp = (a: number, b: number, t: number): number => a + (b - a) * t
const ease = (t: number): number => {
  const x = clamp01(t)
  return x * x * (3 - 2 * x)
}
const seg = (p: number, a: number, b: number): number => clamp01((p - a) / (b - a))

type RowId = 'educationPhysical' | 'authorization' | 'schoolTask'
const ROWS: ReadonlyArray<{ id: RowId; title: string; kind: 'event' | 'task'; sub: string }> = [
  { id: 'educationPhysical', title: 'Educación Física', kind: 'event', sub: 'Mañana' },
  { id: 'authorization', title: 'Llevar autorización', kind: 'task', sub: 'Juli' },
  { id: 'schoolTask', title: 'Tarea de Matemática', kind: 'task', sub: 'Juli' },
]

// Slots de lista (izquierda) y héroe (centro-derecha), stage 1280×720.
const LIST_X = 150
const LIST_W = 400
const SLOT_Y: Record<RowId, number> = { educationPhysical: 292, authorization: 420, schoolTask: 548 }
const HERO = { x: 770, y: 430, w: 560 } as const

type RowPose = {
  x: number; y: number; w: number; titleSize: number; hero: number
}

function rowPose(id: RowId, step: number, p: number): RowPose {
  const slot: RowPose = { x: LIST_X, y: SLOT_Y[id], w: LIST_W, titleSize: 22, hero: 0 }
  const hero: RowPose = { x: HERO.x - HERO.w / 2, y: HERO.y - 110, w: HERO.w, titleSize: 54, hero: 1 }
  switch (step) {
    case 2:
      if (id === 'educationPhysical') return mixPose(slot, hero, ease(p));
      return slot
    case 3:
      // Intercambio coherente: EF héroe→slot mientras autorización slot→héroe.
      if (id === 'educationPhysical') return mixPose(hero, slot, ease(seg(p, 0, 0.85)))
      if (id === 'authorization') return mixPose(slot, hero, ease(seg(p, 0.15, 1)))
      return slot
    case 4:
      if (id === 'authorization') return mixPose(hero, slot, ease(seg(p, 0, 0.85)))
      if (id === 'schoolTask') return mixPose(slot, hero, ease(seg(p, 0.15, 1)))
      return slot
    case 5:
      // Integración final: matemática héroe→slot, lista compuesta.
      if (id === 'schoolTask') return mixPose(hero, slot, ease(seg(p, 0, 0.7)))
      return slot
    default:
      return slot
  }
}

function mixPose(a: RowPose, b: RowPose, e: number): RowPose {
  return {
    x: lerp(a.x, b.x, e), y: lerp(a.y, b.y, e), w: lerp(a.w, b.w, e),
    titleSize: lerp(a.titleSize, b.titleSize, e),
    hero: lerp(a.hero, b.hero, e),
  }
}

// Semántica de completitud idéntica al teléfono (HomePlannerSequence):
// auth completa desde 3, matemática desde 4, todo completo en 5.
function completed(id: RowId, step: number): boolean {
  if (step >= 5) return true
  if (id === 'authorization') return step >= 3
  if (id === 'schoolTask') return step >= 4
  return false
}

function focusId(step: number): RowId | null {
  if (step === 2) return 'educationPhysical'
  if (step === 3) return 'authorization'
  if (step === 4 || step === 5) return 'schoolTask'
  return null
}

export default function S04HomeEditorial({ stepIndex }: { stepIndex: number }) {
  const step = Math.min(Math.max(stepIndex | 0, 0), 5)
  const p = useS04Progress(step)
  const e = ease(p)

  // Juli: cabecera pequeña ↔ héroe central (sólo step 1, lista atenuada).
  const juliHero = step === 1 ? e : 0
  const juliX = lerp(196, 640, juliHero)
  const juliY = lerp(150, 280, juliHero)
  const juliSize = lerp(38, 104, juliHero)
  const focus = focusId(step)

  // Atenuación de la lista detrás del héroe (la fila héroe no se atenúa).
  const zoneDim = step === 1 ? lerp(1, 0.15, e) : step === 2 ? lerp(0.15, 0.4, e) : 1
  const entrance = step === 0 ? seg(p, 0.2, 0.75) : 1

  return (
    <div className="s04ed" data-step={step} style={{ background: SURFACE }} aria-label="Home de Juli">
      <header className="s04ed-top" style={{ opacity: step === 0 ? seg(p, 0, 0.5) : 1 }}>
        <div className="s04ed-household">Familia García</div>
        <div className="s04ed-date">Domingo, 16 de agosto</div>
      </header>

      <div
        className="s04ed-juli"
        style={{
          left: juliX, top: juliY,
          opacity: step === 0 ? seg(p, 0.2, 0.7) : 1,
          transform: 'translate(-50%, -50%)',
        }}
        aria-label="Perfil de Juli"
      >
        <span className="s04ed-avatar" style={{ width: juliSize, height: juliSize, fontSize: juliSize * 0.42 }}>
          J
        </span>
        <span className="s04ed-juli-name" style={{ fontSize: lerp(20, 44, juliHero) }}>
          Juli{juliHero > 0.5 ? ' · 10 años' : ''}
        </span>
      </div>

      <div className="s04ed-list" style={{ opacity: entrance }}>
        <div className="s04ed-section" data-dim={step === 1} style={{ top: 256 }}>Próximamente</div>
        <div className="s04ed-section" data-dim={step === 1} style={{ top: 388 }}>Hoy</div>
        {ROWS.map(r => {
          const pose = rowPose(r.id, step, p)
          const done = completed(r.id, step)
          const dimmed = pose.hero < 0.5 ? zoneDim : 1
          return (
            <article
              key={r.id}
              className="s04ed-row"
              data-focused={focus === r.id}
              data-completed={done}
              style={{ left: pose.x, top: pose.y, width: pose.w, opacity: dimmed }}
            >
              <span className="s04ed-mark" data-kind={r.kind} data-done={done && r.kind === 'task'} aria-hidden="true">
                {done && r.kind === 'task' ? '✓' : ''}
              </span>
              <span className="s04ed-copy">
                <span className="s04ed-title" style={{ fontSize: pose.titleSize }}>
                  {r.title}
                </span>
                <span className="s04ed-sub">
                  {r.kind === 'event' ? 'Mañana · Próximamente' : done ? 'Completada' : r.sub}
                </span>
              </span>
            </article>
          )
        })}
      </div>
    </div>
  )
}
