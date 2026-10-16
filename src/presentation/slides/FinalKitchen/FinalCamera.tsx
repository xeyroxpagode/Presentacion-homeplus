// FINAL KITCHEN V6.0 — cámara + reloj único del director (S5 runtime).
// FOV fijo 36° (canónico), sin animación de FOV. Este useFrame es el ÚNICO
// que escribe poses: evalúa FinalDirector en tiempo absoluto, aplica cámara,
// empuja pose al rig, luces al rig de luz y valores live al mundo S01.
// frameloop="demand": invalida sólo durante transiciones.

import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useFrame, useThree } from '@react-three/fiber'
import { finalDirector } from './FinalDirector'
import { POSE_P0, POSE_P1, POSE_P2, sampleGesture } from './TechnicianAnimation'
import { s01ScreenFrame } from '../S01Chaos/three/s01Portal'
import { resetFinalDiveCoverage, setFinalDiveCovered } from './finalDiveBridge'
import type { FinalBeatId } from './finalTimings'
import { DIVE_MS } from './finalTimings'
import type { FinalFrame } from './finalState'
import { finalQueryPose } from './finalState'
import type { S01FinalLive } from '../S01Chaos/three/S01CinematicProps'
import type { TechRigApi } from './TechnicianRig'
import type { FinalLightApi } from './FinalLighting'

const _v = new THREE.Vector3()

/** Cobertura real con la cámara viva (réplica de s01ScreenCoversViewport). */
function screenCoversViewport(camera: THREE.Camera, margin = 0.08): boolean {
  const f = s01ScreenFrame()
  const hw = f.width / 2
  const hh = f.height / 2
  const corners: Array<[number, number, number]> = [
    [f.center[0] - f.right[0] * hw + f.up[0] * hh, f.center[1] + f.up[1] * hh, f.center[2] - f.right[2] * hw + f.up[2] * hh],
    [f.center[0] + f.right[0] * hw + f.up[0] * hh, f.center[1] + f.up[1] * hh, f.center[2] + f.right[2] * hw + f.up[2] * hh],
    [f.center[0] + f.right[0] * hw - f.up[0] * hh, f.center[1] - f.up[1] * hh, f.center[2] + f.right[2] * hw - f.up[2] * hh],
    [f.center[0] - f.right[0] * hw - f.up[0] * hh, f.center[1] - f.up[1] * hh, f.center[2] - f.right[2] * hw - f.up[2] * hh],
  ]
  for (const c of corners) {
    _v.set(c[0], c[1], c[2]).project(camera)
    if (_v.z > 1 || (Math.abs(_v.x) < 1 + margin && Math.abs(_v.y) < 1 + margin)) return false
  }
  return true
}

export type FinalClock = {
  beat: FinalBeatId
  t: number
  stable: boolean
  frame: FinalFrame | null
}

export default function FinalCamera({
  beat,
  clockRef,
  techApiRef,
  lightApiRef,
  liveRef,
  reducedMotion,
  onStable,
}: {
  beat: FinalBeatId
  clockRef: React.MutableRefObject<FinalClock>
  techApiRef: React.MutableRefObject<TechRigApi | null>
  lightApiRef: React.MutableRefObject<FinalLightApi | null>
  liveRef: React.MutableRefObject<S01FinalLive>
  reducedMotion: boolean
  onStable: (beat: FinalBeatId) => void
}) {
  const camera = useThree((s) => s.camera) as THREE.PerspectiveCamera
  const invalidate = useThree((s) => s.invalidate)
  const size = useThree((s) => s.size)
  const scene = useThree((s) => s.scene)
  const forward = useMemo(() => new THREE.Vector3(0, 0, -1), [])
  const aspect = size.width / Math.max(1, size.height)

  const blackout = useMemo(() => {
    const mesh = new THREE.Mesh(
      new THREE.PlaneGeometry(1.6, 1.6),
      new THREE.MeshBasicMaterial({
        color: '#000000', // negro PURO (no #070505): el último píxel debe ser 0
        transparent: true,
        opacity: 0,
        depthTest: false,
        depthWrite: false,
        toneMapped: false,
      }),
    )
    mesh.renderOrder = 999
    mesh.frustumCulled = false
    mesh.visible = false
    return mesh
  }, [])

  // Reloj local: se reinicia en cada cambio de beat (tiempo absoluto).
  const tRef = useRef(0)
  const beatRef = useRef<FinalBeatId>(beat)
  const stableNotified = useRef<FinalBeatId | null>(null)
  if (beatRef.current !== beat) {
    beatRef.current = beat
    tRef.current = 0
    if (beat === 'W01') resetFinalDiveCoverage()
  }

  useEffect(() => {
    scene.add(blackout)
    return () => {
      scene.remove(blackout)
    }
  }, [scene, blackout])

  useEffect(() => {
    invalidate()
  }, [beat, invalidate])

  useFrame((state, delta) => {
    const q = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null
    let t = tRef.current + Math.min(delta, 0.05) * 1000
    // Inspección determinista: ?finalp=0.85 fija el travelling sin navegar.
    const qp = q?.get('finalp')
    if (qp !== null && qp !== undefined && (beat === 'W01' || beat === 'W02')) {
      const p = Math.min(1, Math.max(0, Number(qp) || 0))
      t = (1 - p) * DIVE_MS
    }
    tRef.current = t

    // Inspección ?finalp= en W02: se evalúa como W01 con t mapeado.
    const evalBeat: FinalBeatId = beat === 'W02' && qp !== null && qp !== undefined ? 'W01' : beat
    const frame = finalDirector.evaluateFinalFrame(
      evalBeat,
      t,
      { width: size.width, height: size.height, aspect },
      true,
      reducedMotion,
    )

    camera.position.set(frame.camPos[0], frame.camPos[1], frame.camPos[2])
    camera.up.set(frame.camUp[0], frame.camUp[1], frame.camUp[2])
    camera.lookAt(frame.camTarget[0], frame.camTarget[1], frame.camTarget[2])
    camera.updateMatrixWorld()

    if (frame.blackout > 0.002) {
      forward.set(0, 0, -1).applyQuaternion(camera.quaternion)
      blackout.position.copy(camera.position).addScaledVector(forward, 0.4)
      blackout.quaternion.copy(camera.quaternion)
      ;(blackout.material as THREE.MeshBasicMaterial).opacity = frame.blackout
      blackout.visible = true
    } else if (blackout.visible) {
      blackout.visible = false
    }

    // Técnico: visible desde W06, pose absoluta del gesto (o inspección).
    const poseOverride = finalQueryPose()
    const tech = techApiRef.current
    if (tech) {
      tech.setVisible(frame.techPose !== 'hidden')
      if (frame.techPose !== 'hidden') {
        if (poseOverride === 'P0') tech.setPose(POSE_P0)
        else if (poseOverride === 'P1') tech.setPose(POSE_P1)
        else if (poseOverride === 'P2') tech.setPose(POSE_P2)
        else tech.setPose(frame.gestureT == null ? POSE_P0 : sampleGesture(frame.gestureT))
      }
    }

    // Luces propias + valores live del mundo S01 (una sola escritura).
    lightApiRef.current?.setLights(frame.lights)
    liveRef.current.screenBrightness = frame.lights.screen
    liveRef.current.bulbDim = frame.lights.bulbEmissive
    liveRef.current.windowDim = frame.lights.windowEmissive
    liveRef.current.pantryDim = frame.lights.pantry
    liveRef.current.stripDim = frame.lights.strip

    // Cobertura del travelling con la cámara real (QA S1, §5.6).
    if (beat === 'W01' || beat === 'W02') {
      const covered = screenCoversViewport(camera)
      setFinalDiveCovered(covered, frame.qa.diveP ?? undefined)
    }

    clockRef.current = { beat, t, stable: frame.phase === 'stable', frame }

    // W01/W02: un solo movimiento — al estabilizar, el director registra la
    // fase interna W02 sin NEXT adicional (sin pausa ni click muerto). En
    // inspección ?finalp= se omite para no patear al operador.
    if (frame.phase === 'stable' && stableNotified.current !== beat) {
      stableNotified.current = beat
      if (!(qp !== null && qp !== undefined && (beat === 'W01' || beat === 'W02'))) {
        onStable(beat)
      }
    }

    if (typeof window !== 'undefined') {
      const w = window as unknown as Record<string, unknown>
      w.__finalFrame = frame
      w.__finalDivePose =
        frame.qa.diveP == null
          ? null
          : { p: frame.qa.diveP, camPos: [...frame.camPos], camTarget: [...frame.camTarget], covered: screenCoversViewport(camera) }
    }

    if (frame.phase !== 'stable') state.invalidate()
  })

  return null
}
