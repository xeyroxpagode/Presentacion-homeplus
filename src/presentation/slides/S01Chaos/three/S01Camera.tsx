import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useFrame, useThree } from '@react-three/fiber'
import { s01Director } from './s01Director'
import { s01Anchors, type AnchorName } from './s01CinematicConfig'
import { s01PortalMetadata, s01ScreenCoversViewport } from './s01Portal'
import { getDiveProgress, registerDiveTick, setDiveCovered } from './s01DiveBridge'

// Cámara narrativa única de S01: FOV fijo 36° en toda la secuencia, cero
// animación de FOV. Los acercamientos son movimiento físico (position +
// lookAt + up). También actúa como reloj del director: avanza la state
// machine e invalida sólo mientras hay animación (frameloop="demand").
export default function S01Camera({ stepIndex, sceneKey = 0 }: { stepIndex: number; sceneKey?: number }) {
  const camera = useThree((state) => state.camera) as THREE.PerspectiveCamera
  const invalidate = useThree((state) => state.invalidate)
  const size = useThree((state) => state.size)
  const scene = useThree((state) => state.scene)
  const started = useRef(false)
  const forward = useMemo(() => new THREE.Vector3(0, 0, -1), [])
  const aspect = size.width / Math.max(1, size.height)

  // Negro de S01.0: quad opaco delante de la cámara (no depende de tone
  // mapping ni de materiales). Negro cálido ~#070505.
  const blackout = useMemo(() => {
    const mesh = new THREE.Mesh(
      new THREE.PlaneGeometry(1.6, 1.6),
      new THREE.MeshBasicMaterial({
        color: '#070505',
        transparent: true,
        opacity: 1,
        depthTest: false,
        depthWrite: false,
        toneMapped: false,
      }),
    )
    mesh.renderOrder = 999
    mesh.frustumCulled = false
    return mesh
  }, [])

  useEffect(() => {
    const q = new URLSearchParams(window.location.search)
    // Dev-only: ?s01InspectPortal=0..1 salta directo a una pose del portal.
    const portal = q.get('s01InspectPortal')
    if (portal !== null) {
      started.current = true
      s01Director.debugPortal(Number(portal) || 0, aspect)
      invalidate()
      return
    }
    // Dev-only: ?s01InspectCamera=wide|phone|... fija la cámara en un anchor.
    const cam = q.get('s01InspectCamera')
    if (cam !== null) {
      started.current = true
      const key = (`A_${cam.toUpperCase()}` as AnchorName) in s01Anchors ? (`A_${cam.toUpperCase()}` as AnchorName) : 'A_WIDE'
      s01Director.init(4, aspect)
      const a = s01Anchors[key]
      s01Director.frame.camPos = [...a.pos]
      s01Director.frame.camTarget = [...a.target]
      s01Director.frame.camUp = [0, 1, 0]
      invalidate()
      return
    }
    if (!started.current) {
      started.current = true
      s01Director.init(stepIndex, aspect)
    } else {
      s01Director.aspect = aspect
      s01Director.setStep(stepIndex)
    }
    invalidate()
    // sceneKey re-dispara el beat al cambiar de slide con el mismo step
    // (S01.5 ↔ S02.0 comparten step 5: sin refire no hay animación fantasma).
  }, [stepIndex, sceneKey, invalidate, aspect])

  useEffect(() => {
    scene.add(blackout)
    return () => {
      scene.remove(blackout)
    }
  }, [scene, blackout])

  // El puente invalida el canvas en cada publicación de progreso (S02.0).
  useEffect(() => {
    registerDiveTick(() => invalidate())
    return () => registerDiveTick(null)
  }, [invalidate])

  useFrame((state, delta) => {
    // Puente S01→S02: durante S02.0 la cámara se mantiene en PHONE_INSIDE
    // (el dive ya ocurrió en S01.5). Sobrescribe cualquier animación en
    // curso; la cobertura es geométrica, no un timer.
    const diveP = getDiveProgress()
    if (diveP !== null) {
      s01Director.sampleDiveAt(diveP, aspect, Math.min(delta, 0.05) * 1000)
      const f = s01Director.frame
      camera.position.set(f.camPos[0], f.camPos[1], f.camPos[2])
      camera.up.set(f.camUp[0], f.camUp[1], f.camUp[2])
      camera.lookAt(f.camTarget[0], f.camTarget[1], f.camTarget[2])
      camera.updateMatrixWorld()
      setDiveCovered(s01ScreenCoversViewport(camera))
      if (typeof window !== 'undefined') {
        const w = window as unknown as Record<string, unknown>
        w.__s01PortalMeta = s01PortalMetadata(aspect, size.width, size.height)
        w.__s01DivePose = {
          p: diveP,
          camPos: [...s01Director.frame.camPos],
          camTarget: [...s01Director.frame.camTarget],
          camUp: [...s01Director.frame.camUp],
          covered: s01ScreenCoversViewport(camera),
        }
      }
      if (s01Director.diveBlendActive) state.invalidate()
      return
    }
    const live = s01Director.update(Math.min(delta, 0.05) * 1000, aspect)
    const f = s01Director.frame

    camera.position.set(f.camPos[0], f.camPos[1], f.camPos[2])
    camera.up.set(f.camUp[0], f.camUp[1], f.camUp[2])
    camera.lookAt(f.camTarget[0], f.camTarget[1], f.camTarget[2])
    camera.updateMatrixWorld()

    if (f.blackout > 0.002) {
      forward.set(0, 0, -1).applyQuaternion(camera.quaternion)
      blackout.position.copy(camera.position).addScaledVector(forward, 0.4)
      blackout.quaternion.copy(camera.quaternion)
      ;(blackout.material as THREE.MeshBasicMaterial).opacity = f.blackout
      blackout.visible = true
    } else if (blackout.visible) {
      blackout.visible = false
    }

    // Metadata del portal para QA y futuro handoff S02 (§97). Dev + QA.
    if (typeof window !== 'undefined') {
      const w = window as unknown as Record<string, unknown>
      if (s01Director.step === 5 && !live) {
        w.__s01PortalMeta = s01PortalMetadata(aspect, size.width, size.height)
      }
    }

    if (live) state.invalidate()
  })

  return null
}
