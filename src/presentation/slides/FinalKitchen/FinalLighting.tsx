// FINAL KITCHEN V6.0 — iluminación del cierre (S4).
// Mismo rig que S01Lighting (posiciones/colores/intensidades base 1:1),
// gobernado por FinalDirector SIN el auto-k por distancia: los estados
// cinematográficos W09–W14 no deben ser sobrescritos. S01Lighting no se
// monta en esta escena (una sola fuente de luz).

import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { s01Palette as c } from '../S01Chaos/three/s01ThreeConfig'
import type { LightScales } from './finalState'

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
  // pantryDim/bulbDim/windowDim/strip viven en S01 (contexto live); aquí se
  // resuelven las 7 fuentes propias. screenBrightness lo aplica Phone.

  const api = useMemo<FinalLightApi>(
    () => ({
      setLights(s: LightScales) {
        if (spot.current) spot.current.intensity = 62 * s.spot
        if (lamp.current) lamp.current.intensity = 8 * s.lamp
        if (ambient.current) ambient.current.intensity = 0.4 * s.ambient
        if (hemi.current) hemi.current.intensity = 0.65 * s.hemi
        if (windowFill.current) windowFill.current.intensity = 28 * s.window
        if (rim.current) rim.current.intensity = 1.0 * s.rim
        if (bounce.current) bounce.current.intensity = 5 * s.bounce
        if (work.current) work.current.intensity = 1.8 * s.bounce
      },
    }),
    [],
  )
  apiRef.current = api

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
        intensity={62}
        color={c.warmLight}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-bias={-0.0004}
      />
      <pointLight ref={lamp} position={[0.55, 2.0, -0.15]} distance={4.5} decay={2} intensity={8} color={c.bulb} />
      <pointLight ref={windowFill} position={[-3.6, 1.9, -1.1]} distance={8} decay={1.7} intensity={28} color={c.coolLight} />
      <pointLight ref={rim} position={[2.15, 1.95, -1.95]} distance={4.5} decay={2} intensity={1.0} color="#8fa2c9" />
      <pointLight ref={bounce} position={[1.15, 0.5, 0.85]} distance={3.5} decay={2} intensity={5} color="#d9a06b" />
      <pointLight ref={work} position={[1.65, 0.7, -1.68]} distance={1.4} decay={2} intensity={1.8} color="#e8c9a4" />
    </>
  )
}
