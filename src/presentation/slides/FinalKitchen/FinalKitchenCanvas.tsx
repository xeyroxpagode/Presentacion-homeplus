// FINAL KITCHEN V6.0 — canvas dedicado al cierre (S0/S5).
// R3F + Three.js existentes, frameloop="demand", FOV 36° canónico. Precarga
// los recursos críticos antes de W00 (textura Home síncrona, sin GLB en red,
// sin reconstrucción por beat). Recursos liberados al desmontar.

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'
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
import { getFinalQualityProfile } from './finalQuality'
import './final-kitchen.css'

// La llegada W02 ya sostiene el plano abierto: el siguiente NEXT va a mochila.
export const INTEGRATED_FINAL_BEATS: FinalBeatId[] = ['W01', 'W04', 'W05', 'W06', 'W07', 'W08', 'W09']

type FinalTransition = {
  beat: FinalBeatId
  seekToEnd: boolean
  id: number
}

export default function FinalKitchenCanvas({ stepIndex = null, integrated = false, directSnapshot = false, reverseEntry = false }: {
  stepIndex?: number | null
  integrated?: boolean
  directSnapshot?: boolean
  reverseEntry?: boolean
}) {
  const initialBeat = integrated ? (stepIndex === null ? 'W00' : INTEGRATED_FINAL_BEATS[stepIndex]) : initialFinalNav().beat
  const [transition, setTransition] = useState<FinalTransition>({ beat: initialBeat, seekToEnd: directSnapshot || reverseEntry, id: 0 })
  const beat = transition.beat
  const previousStep = useRef<number | null>(stepIndex)
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
  const quality = useMemo(getFinalQualityProfile, [])

  useEffect(() => {
    if (!integrated) return
    const previous = previousStep.current
    previousStep.current = stepIndex
    const backwards = previous !== null && stepIndex !== null && previous > stepIndex
    const target = stepIndex === null
      ? 'W00'
      : stepIndex === 0 && backwards
        ? 'W02'
        : INTEGRATED_FINAL_BEATS[stepIndex]
    setTransition((current) => ({
      beat: target,
      seekToEnd: directSnapshot || backwards || reverseEntry,
      id: current.id + 1,
    }))
  }, [directSnapshot, integrated, reverseEntry, stepIndex])

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
    setTransition((current) => {
      const next = finalNext({ beat: current.beat, localTime: 0 }).beat
      return next === current.beat ? current : { beat: next, seekToEnd: false, id: current.id + 1 }
    })
  }, [])

  const goPrev = useCallback(() => {
    setTransition((current) => {
      const previous = finalPrev({ beat: current.beat, localTime: 0 }).beat
      return previous === current.beat ? current : { beat: previous, seekToEnd: true, id: current.id + 1 }
    })
  }, [])

  const goJump = useCallback((target: FinalBeatId) => {
    setTransition((current) => ({ beat: finalJump(target).beat, seekToEnd: true, id: current.id + 1 }))
  }, [])

  // W01→W02 interno: al completar el travelling, el beat avanza solo.
  const onStable = useCallback((stableBeat: FinalBeatId) => {
    if (stableBeat === 'W01') {
      setTransition((current) => current.beat === 'W01'
        ? { beat: 'W02', seekToEnd: true, id: current.id + 1 }
        : current)
    }
  }, [])

  // Navegación manual (misma tecla que la presentación; sólo en el harness).
  useEffect(() => {
    if (integrated) return
    function onKeyDown(e: KeyboardEvent) {
      if (e.defaultPrevented || e.repeat) return
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault()
        goNext()
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        goPrev()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [goNext, goPrev, integrated])

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
    <div className="final-kitchen-stage" data-final-beat={beat} data-final-debug={debug} data-integrated={integrated} data-preparing={stepIndex === null && integrated}>
      <Canvas
        shadows
        dpr={quality.dpr}
        frameloop="demand"
        camera={{ fov: 36, near: 0.015, far: 40 }}
        gl={{ antialias: true, preserveDrawingBuffer: debug, powerPreference: 'high-performance', alpha: false }}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping
          gl.toneMappingExposure = quality.exposure
          gl.outputColorSpace = THREE.SRGBColorSpace
          gl.shadowMap.type = THREE.PCFShadowMap
          ;(window as unknown as Record<string, unknown>).__finalDirector = finalDirector
        }}
      >
        <FinalKitchenScene
          beat={beat}
          transitionId={transition.id}
          seekToEnd={transition.seekToEnd}
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
