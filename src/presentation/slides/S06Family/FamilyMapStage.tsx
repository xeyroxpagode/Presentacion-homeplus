import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type RefObject } from 'react'
import MapDemoScreen from '../../app-screens/MapDemoScreen'
import { homeVariables } from '../../app-screens/HomeDemoScreen/homeTokens'
import { motionTokens } from '../../motion/motionTokens'

type LayoutRect = { x: number; y: number; width: number; height: number }
type ActiveFlight = { timer: number; finish: (event?: TransitionEvent) => void }

type FamilyMapStageProps = {
  active: boolean
  stepIndex: number
  stageRef: RefObject<HTMLDivElement | null>
  slotRef: RefObject<HTMLDivElement | null>
}

// One map node travels between its measured product slot and the stage. FLIP
// switches layout to its destination once, then animates only a compositor
// transform. The current visual rect is sampled from the active matrix so a
// direction change mid-flight continues from its actual on-screen position.
export default function FamilyMapStage({ active, stepIndex, stageRef, slotRef }: FamilyMapStageProps) {
  const [slot, setSlot] = useState({ x: 0, y: 0, width: 0, height: 0 })
  const travelerRef = useRef<HTMLDivElement>(null)
  const layoutRef = useRef<LayoutRect | null>(null)
  const flightRef = useRef<ActiveFlight | null>(null)

  useLayoutEffect(() => {
    const stage = stageRef.current
    const target = slotRef.current
    if (!stage || !target) return
    const measure = () => {
      const parent = stage.getBoundingClientRect()
      const bounds = target.getBoundingClientRect()
      const scale = parent.width / stage.offsetWidth
      if (!scale) return
      setSlot({ x: (bounds.left - parent.left) / scale, y: (bounds.top - parent.top) / scale,
        width: bounds.width / scale, height: bounds.height / scale })
    }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(stage)
    observer.observe(target)
    return () => observer.disconnect()
  }, [stageRef, slotRef, active])

  useLayoutEffect(() => {
    const traveler = travelerRef.current
    if (!traveler) return

    const layout: LayoutRect = {
      x: traveler.offsetLeft,
      y: traveler.offsetTop,
      width: traveler.offsetWidth,
      height: traveler.offsetHeight,
    }
    const previous = layoutRef.current
    layoutRef.current = layout

    if (!previous || !previous.width || !previous.height || !layout.width || !layout.height) return
    const geometryChanged = previous.x !== layout.x || previous.y !== layout.y
      || previous.width !== layout.width || previous.height !== layout.height
    if (!geometryChanged) return

    const priorFlight = flightRef.current
    if (priorFlight) {
      window.clearTimeout(priorFlight.timer)
      traveler.removeEventListener('transitionend', priorFlight.finish)
      flightRef.current = null
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      traveler.style.transition = 'none'
      traveler.style.transform = 'translate3d(0, 0, 0) scale(1, 1)'
      traveler.removeAttribute('data-in-flight')
      void traveler.offsetWidth
      traveler.style.transition = ''
      return
    }

    const computedTransform = getComputedStyle(traveler).transform
    const matrix = computedTransform === 'none' ? new DOMMatrixReadOnly() : new DOMMatrixReadOnly(computedTransform)
    const previousVisual: LayoutRect = {
      x: previous.x + matrix.m41,
      y: previous.y + matrix.m42,
      width: previous.width * matrix.a,
      height: previous.height * matrix.d,
    }
    const scaleX = previousVisual.width / layout.width
    const scaleY = previousVisual.height / layout.height
    const translateX = previousVisual.x - layout.x
    const translateY = previousVisual.y - layout.y

    traveler.setAttribute('data-in-flight', 'true')
    traveler.style.transition = 'none'
    traveler.style.transform = `translate3d(${translateX}px, ${translateY}px, 0) scale(${scaleX}, ${scaleY})`
    void traveler.offsetWidth
    traveler.style.transition = ''
    traveler.style.transform = 'translate3d(0, 0, 0) scale(1, 1)'

    const flight: ActiveFlight = {
      timer: 0,
      finish: (event) => {
        if (event && (event.target !== traveler || event.propertyName !== 'transform')) return
        window.clearTimeout(flight.timer)
        traveler.removeEventListener('transitionend', flight.finish)
        traveler.removeAttribute('data-in-flight')
        if (flightRef.current === flight) flightRef.current = null
      },
    }
    traveler.addEventListener('transitionend', flight.finish)
    flight.timer = window.setTimeout(flight.finish, motionTokens.durations.spatial + 80)
    flightRef.current = flight
  }, [slot, active, stepIndex])

  useEffect(() => () => {
    const flight = flightRef.current
    if (!flight) return
    window.clearTimeout(flight.timer)
    travelerRef.current?.removeEventListener('transitionend', flight.finish)
  }, [])

  const expanded = stepIndex >= 1 && stepIndex <= 3
  const visible = active && stepIndex >= 1 && stepIndex <= 4
  const style = {
    ...homeVariables,
    '--map-slot-x': `${slot.x}px`, '--map-slot-y': `${slot.y}px`,
    '--map-slot-width': `${slot.width}px`, '--map-slot-height': `${slot.height}px`,
  } as CSSProperties
  return (
    <div ref={travelerRef} className="family-map-stage" style={style} data-expanded={active && expanded}
      data-present={visible && slot.width > 0} aria-hidden={!visible}>
      <div className="family-map-glow ambient-glow" aria-hidden="true" />
      <div className="family-map-surface">
        <MapDemoScreen showSchool={stepIndex >= 1} showClub={stepIndex >= 2}
          showPeople={stepIndex >= 3} showDelay={stepIndex >= 3} compact={!expanded} />
      </div>
    </div>
  )
}
