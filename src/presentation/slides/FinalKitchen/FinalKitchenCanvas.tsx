// FINAL KITCHEN V6.0 — canvas dedicado al cierre (S0/S5).
// R3F + Three.js existentes, frameloop="demand", FOV 36° canónico. Precarga
// los recursos críticos antes de W00 (textura Home síncrona, sin GLB en red,
// sin reconstrucción por beat). Recursos liberados al desmontar.

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import type { S01FinalLive } from '../S01Chaos/three/S01CinematicProps'
import { createHomeScreenTexture } from './homeScreenTexture'
import FinalKitchenScene from './FinalKitchenScene'
import type { FinalClock } from './FinalCamera'
import type { TechRigApi } from './TechnicianRig'
import type { FinalLightApi } from './FinalLighting'
import { finalDirector } from './FinalDirector'
import { exposeFinalQA } from './finalQA'
import type { FinalBeatId } from './finalTimings'
import { FINAL_BEATS } from './finalTimings'
import { finalNext, finalPrev, finalJump, initialFinalNav, finalDebugEnabled, finalReducedMotion } from './finalState'
import './final-kitchen.css'

export default function FinalKitchenCanvas() {
  const [beat, setBeat] = useState<FinalBeatId>(() => initialFinalNav().beat)
  const clockRef = useRef<FinalClock>({ beat, t: 0, stable: false, frame: null })
  const techApiRef = useRef<TechRigApi | null>(null)
  const lightApiRef = useRef<FinalLightApi | null>(null)
  const liveRef = useRef<S01FinalLive>({
    screenBrightness: 1,
    bulbDim: 1,
    windowDim: 1,
    pantryDim: 1,
    stripDim: 1,
  })
  const reducedMotion = useMemo(() => finalReducedMotion(), [])
  const debug = useMemo(() => finalDebugEnabled(), [])

  // Textura Home lista antes de W00 (composición determinista única).
  const screenMap = useMemo(() => {
    try {
      const caps = 8
      return createHomeScreenTexture(caps)
    } catch {
      return null
    }
  }, [])

  useEffect(() => {
    return () => {
      screenMap?.dispose()
    }
  }, [screenMap])

  const goNext = useCallback(() => {
    // NEXT durante transición se ignora (pose íntegra, sin doble-pulso).
    setBeat((b) => {
      const c = clockRef.current
      if (c.beat !== b || !c.stable) return b
      return finalNext({ beat: b, localTime: 0 }, true).beat
    })
  }, [])

  const goPrev = useCallback(() => {
    setBeat((b) => finalPrev({ beat: b, localTime: 0 }).beat)
  }, [])

  const goJump = useCallback((target: FinalBeatId) => {
    setBeat(finalJump(target).beat)
  }, [])

  // W01→W02 interno: al completar el travelling, el beat avanza solo.
  const onStable = useCallback((stableBeat: FinalBeatId) => {
    if (stableBeat === 'W01') setBeat('W02')
  }, [])

  // Navegación manual (misma tecla que la presentación; sólo en el harness).
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.defaultPrevented || e.repeat) return
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault()
        // NEXT durante transición se ignora (pose íntegra, sin doble-pulso).
        if (clockRef.current.stable) goNext()
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        goPrev()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [goNext, goPrev])

  useEffect(() => {
    exposeFinalQA({
      getBeat: () => clockRef.current.beat,
      goNext,
      goPrev,
      goJump,
    })
    return () => exposeFinalQA(null)
  }, [goNext, goPrev, goJump])

  return (
    <div className="final-kitchen-stage" data-final-beat={beat} data-final-debug={debug}>
      <Canvas
        shadows
        dpr={[1, 2]}
        frameloop="demand"
        camera={{ fov: 36, near: 0.015, far: 40 }}
        gl={{ antialias: true, preserveDrawingBuffer: debug }}
        onCreated={({ gl }) => {
          gl.toneMappingExposure = 1
          ;(window as unknown as Record<string, unknown>).__finalDirector = finalDirector
        }}
      >
        <FinalKitchenScene
          beat={beat}
          clockRef={clockRef}
          techApiRef={techApiRef}
          lightApiRef={lightApiRef}
          liveRef={liveRef}
          screenMap={screenMap}
          reducedMotion={reducedMotion}
          onStable={onStable}
        />
      </Canvas>
      {debug && (
        <div className="final-kitchen-hud" aria-hidden="true">
          <span className="final-kitchen-hud-beat">{beat}</span>
          {FINAL_BEATS.map((b) => (
            <button key={b} type="button" data-active={b === beat} onClick={() => goJump(b)}>
              {b}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
