import { useEffect, useRef, useState } from 'react'
import PresentationFrame from '../presentation/components/PresentationFrame'
import CineScene from './CineScene'

const STEP_NAMES = [
  'Logo',
  'Zoom',
  'Zoom final',
  'Blanco',
  'Juli',
  'Tarea de Matemática',
  'Educación Física',
  'Llevar autorización',
  'Organización',
  'Home',
  'Tarea protagonista',
  'Planner · Tareas',
  'Tareas y responsabilidades',
  'Calendario',
  'Horarios y Planes',
  'Puente hacia Familia',
  'F01 · Familia',
  'F02 · Tomi y su familia',
  'F03 · Tomi y su situación',
  'F04 · Mapa',
  'F05 · Mensajes',
  'F06 · Cumpleaños',
  'I01 · Entrada a Inventario',
  'I02 · Inventario',
  'I03 · Existencias y faltantes',
  'I04 · Lista de compras',
  'I05 · Puente al gasto',
  'FIN F01 · Intención y gasto',
  'FIN F02 · Resumen y análisis',
  'AST A01 · PlayStation 5',
  'AST A02 · Ficha y documentos',
  'HC · Archivo en HomeCloud',
  'MEM · Recuerdos',
  'CON · Continuidad',
  'STK · Stack técnico',
  'BAR · Fricción',
  'CIE · Cierre',
] as const

const LAST_STEP = STEP_NAMES.length - 1

// One leg of the logo zoom. Must match --cine-d-zoom in cine.css.
// The second leg fires slightly early (OVERLAP_MS) so the chained flight
// never fully stops mid-zoom: total ≈ 1150ms of continuous motion.
const ZOOM_LEG_MS = 650
const ZOOM_OVERLAP_MS = 150
const ARRANGE_MS = 1600
const SPOTLIGHT_MS = 1000
const PLANNER_MORPH_MS = 1200
const PLANNER_CONTINUE_MS = [2200, 1500, 1400, 1100] as const
const FAMILY_MORPH_MS = 1400
const FAMILY_FOCUS_MS = 1200
const FAMILY_INVENTORY_MS = [1300, 1500, 1300, 1300, 900, 900, 900, 900, 900] as const
// Full-stage module transitions from I05 to the finale: one press per
// narrative idea. Each lock ends right when its visible motion ends
// (subphases overlap the main gesture), so a press on a stable frame
// always advances: no ghost clicks.
const CIERRE_MS = [
  1050, 900, 1200, 2200, 2300,
  2600, 2350, 1000, 1050, 800,
] as const

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export default function CineApp() {
  const [step, setStep] = useState(0)
  const dev = new URLSearchParams(window.location.search).get('dev') === '1'
  const timers = useRef<number[]>([])
  const locked = useRef(false)
  // Always-fresh step for event handlers: listeners attach once and can never
  // act on a stale render, so a rapid second press can never re-apply the
  // previous step nor re-lock navigation by mistake.
  const stepRef = useRef(0)
  useEffect(() => { stepRef.current = step })

  // Clear pending auto-advance on unmount (the route itself never unmounts,
  // but a dev-time refresh may remount it). Always release the lock too:
  // cleared timers must never leave navigation stuck.
  useEffect(
    () => () => {
      timers.current.forEach((t) => window.clearTimeout(t))
      timers.current = []
      locked.current = false
    },
    [],
  )

  function clearFlight() {
    timers.current.forEach((t) => window.clearTimeout(t))
    timers.current = []
    locked.current = false
  }

  useEffect(() => {
    function advance() {
      // Swallow repeated presses while a transition flight is running so
      // they can never skip states.
      if (locked.current) return
      const step = stepRef.current
      if (step === 0 && !prefersReducedMotion()) {
        // Single gesture: run the whole LOGO → WHITE zoom automatically.
        locked.current = true
        setStep(1)
        timers.current.push(
          window.setTimeout(() => {
            setStep(2)
            timers.current.push(
              window.setTimeout(() => {
                // Step 3 is the settled, motionless white frame. The next
                // gesture reveals Juli (step 4).
                setStep(3)
                locked.current = false
              }, ZOOM_LEG_MS),
            )
          }, ZOOM_LEG_MS - ZOOM_OVERLAP_MS),
        )
      } else if (step === 0) {
        // Reduced motion: no transient mid-zoom rest, go straight to white.
        setStep(3)
      } else if (step === 7) {
        if (prefersReducedMotion()) {
          setStep(9)
        } else {
          // Finish the Home reveal only after the last traveler and nav land.
          locked.current = true
          setStep(8)
          timers.current.push(window.setTimeout(() => {
            setStep(9)
            locked.current = false
          }, ARRANGE_MS))
        }
      } else if (step === 9 || step === 10) {
        const next = step + 1
        const duration = step === 9 ? SPOTLIGHT_MS : PLANNER_MORPH_MS
        setStep(next)
        if (!prefersReducedMotion()) {
          locked.current = true
          timers.current.push(window.setTimeout(() => { locked.current = false }, duration))
        }
      } else if (step === 15) {
        if (prefersReducedMotion()) {
          setStep(17)
        } else {
          locked.current = true
          setStep(16)
          timers.current.push(window.setTimeout(() => {
            setStep(17)
            timers.current.push(window.setTimeout(() => { locked.current = false }, FAMILY_FOCUS_MS))
          }, FAMILY_MORPH_MS))
        }
      } else if (step >= 17 && step <= 25) {
        const duration = FAMILY_INVENTORY_MS[step - 17]
        setStep(step + 1)
        if (!prefersReducedMotion()) {
          locked.current = true
          timers.current.push(window.setTimeout(() => { locked.current = false }, duration))
        }
      } else if (step >= 27 && step < LAST_STEP) {
        const duration = CIERRE_MS[step - 27]
        setStep(step + 1)
        if (!prefersReducedMotion()) {
          locked.current = true
          timers.current.push(window.setTimeout(() => { locked.current = false }, duration))
        }
      } else if (step >= 11 && step < 15) {
        const duration = PLANNER_CONTINUE_MS[step - 11]
        setStep(step + 1)
        if (!prefersReducedMotion()) {
          locked.current = true
          timers.current.push(window.setTimeout(() => { locked.current = false }, duration))
        }
      } else {
        setStep((s) => Math.min(LAST_STEP, s + 1))
      }
    }
    function retreat() {
      clearFlight()
      const step = stepRef.current
      const previous = Math.max(0, step - 1)
      setStep(previous)
      if (!prefersReducedMotion() && step >= 10 && step <= LAST_STEP) {
        const duration = step === 10
          ? SPOTLIGHT_MS
          : step === 11
            ? PLANNER_MORPH_MS
              : step === 16
                ? FAMILY_MORPH_MS
                : step === 17
                  ? FAMILY_FOCUS_MS
                : step >= 18 && step <= 26
                  ? FAMILY_INVENTORY_MS[step - 18]
                : step >= 27
                  ? CIERRE_MS[step - 27]
                : PLANNER_CONTINUE_MS[step - 12]
        locked.current = true
        timers.current.push(window.setTimeout(() => { locked.current = false }, duration))
      }
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.repeat) return
      if (event.altKey || event.ctrlKey || event.metaKey) return
      if (event.key === 'ArrowRight' || event.code === 'Space' || event.key === ' ') {
        event.preventDefault()
        advance()
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault()
        retreat()
      }
    }
    function onClick(event: MouseEvent) {
      if (event.altKey || event.ctrlKey || event.metaKey) return
      if (event.button !== 0) return
      event.preventDefault()
      advance()
    }
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('click', onClick)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('click', onClick)
    }
  }, [])

  return (
    <PresentationFrame>
      <section
        className="cine-scene"
        data-cine-step={step}
        data-cine-scene={STEP_NAMES[step]}
        data-cine-home={step >= 8}
        data-stagebg={step <= 1 ? 'dark' : step <= 8 ? 'white' : 'paper'}
        aria-label={`Apertura HomePlus: ${STEP_NAMES[step]}`}
      >
        <CineScene step={step} />
        {dev && (
          <output className="cine-dev" aria-live="polite">
            cine {step}/{LAST_STEP} · {STEP_NAMES[step]}
          </output>
        )}
      </section>
    </PresentationFrame>
  )
}
