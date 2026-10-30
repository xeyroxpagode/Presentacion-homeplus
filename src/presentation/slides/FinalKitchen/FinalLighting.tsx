// FINAL KITCHEN V6.0 — iluminación del cierre (S4).
// Mismo rig que S01Lighting (posiciones/colores/intensidades base 1:1),
// gobernado por FinalDirector SIN el auto-k por distancia: los estados
// cinematográficos W09–W14 no deben ser sobrescritos. S01Lighting no se
// monta en esta escena (una sola fuente de luz).

import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { s01Palette as c } from '../S01Chaos/three/s01ThreeConfig'
import { LIGHTS_FULL, type LightScales } from './finalState'
import { getFinalQualityProfile } from './finalQuality'

export type FinalLightApi = {
  setLights: (s: LightScales) => void
}

export default function FinalLighting({ apiRef }: { apiRef: React.MutableRefObject<FinalLightApi | null> }) {
  const spot = useRef<THREE.SpotLight>(null)
  const lamp = useRef<THREE.PointLight>(null)
  const ambient = useRef<THREE.AmbientLight>(null)
  const hemi = useRef<THREE.HemisphereLight>(null)
  const windowFill = useRef<THREE.PointLight>(null)
  const rim = useRef<THREE.PointLight>(null)
  const bounce = useRef<THREE.PointLight>(null)
  const work = useRef<THREE.PointLight>(null)
  const backpackFill = useRef<THREE.PointLight>(null)
  const paperFill = useRef<THREE.PointLight>(null)
  const currentScales = useRef<LightScales>(LIGHTS_FULL)
  const islandFocus = useMemo(() => new THREE.Vector3(0.2, 0.915, -0.2), [])
  const quality = getFinalQualityProfile()
  // pantryDim/bulbDim/windowDim/strip viven en S01 (contexto live); aquí se
  // resuelven las 7 fuentes propias. screenBrightness lo aplica Phone.

  const api = useMemo<FinalLightApi>(
    () => ({
      setLights(s: LightScales) {
        currentScales.current = s
        if (ambient.current) ambient.current.intensity = 0.32 * s.ambient
        if (hemi.current) hemi.current.intensity = 0.54 * s.hemi
        if (windowFill.current) windowFill.current.intensity = 22 * s.window
        if (rim.current) rim.current.intensity = 2.0 * s.rim
        if (bounce.current) bounce.current.intensity = 4.5 * s.bounce
        if (work.current) work.current.intensity = 3.2 * s.bounce
        if (backpackFill.current) backpackFill.current.intensity = 2.6 * s.bounce
        if (paperFill.current) paperFill.current.intensity = 1.5 * s.spot
      },
    }),
    [],
  )
  apiRef.current = api

  useFrame((state) => {
    const d = state.camera.position.distanceTo(islandFocus)
    const distanceU = Math.min(1, Math.max(0, (d - 0.55) / 2.8))
    const k = 0.26 + 0.74 * distanceU * distanceU * (3 - 2 * distanceU)
    const scales = currentScales.current
    if (spot.current) spot.current.intensity = 42 * k * scales.spot
    if (lamp.current) lamp.current.intensity = 5.8 * k * scales.lamp
  })

  return (
    <>
      <ambientLight ref={ambient} color={c.wall} intensity={0.4} />
      <hemisphereLight ref={hemi} args={[c.wall, c.kick, 0.65]} />
      <spotLight
        ref={spot}
        position={[-0.35, 2.55, -0.35]}
        angle={1.2}
        penumbra={0.55}
        distance={8.5}
        decay={2}
        intensity={42}
        color={c.warmLight}
        castShadow
        shadow-mapSize-width={quality.shadowMap}
        shadow-mapSize-height={quality.shadowMap}
        shadow-bias={-0.0004}
        shadow-normalBias={0.018}
      />
      <pointLight ref={lamp} position={[0.55, 2.0, -0.15]} distance={4.5} decay={2} intensity={5.8} color={c.bulb} />
      <pointLight ref={windowFill} position={[-3.6, 1.9, -1.1]} distance={8} decay={1.7} intensity={22} color={c.coolLight} />
      <pointLight ref={rim} position={[2.15, 1.95, -1.95]} distance={4.5} decay={2} intensity={2.0} color="#8fa2c9" />
      <pointLight ref={bounce} position={[1.15, 0.5, 0.85]} distance={3.5} decay={2} intensity={4.5} color="#d9a06b" />
      <pointLight ref={work} position={[1.55, 0.85, -1.55]} distance={1.8} decay={2} intensity={3.2} color="#e8c9a4" />
      <pointLight ref={backpackFill} position={[-1.18, 0.58, 0.85]} distance={1.45} decay={2} intensity={2.6} color="#c79a68" />
      <pointLight ref={paperFill} position={[-0.35, 1.35, 0.15]} distance={1.55} decay={2} intensity={1.5} color="#d5c6aa" />
    </>
  )
}
