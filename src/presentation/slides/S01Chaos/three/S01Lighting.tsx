import { useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { s01Palette as c } from './s01ThreeConfig'
import { s01Director } from './s01Director'
import { getS01QualityProfile } from './s01Quality'

// Iluminación de lookdev: oscura pero legible, sombras suaves, calidez mínima
// desde las lámparas colgantes y un relleno frío desde la ventana (noche).
// Sin bloom, sin neons: el acento cálido es clima, no efecto.
//
// Microajuste narrativo: cuando la cámara entra en close-up, el foco cálido de
// la lámpara (que está justo sobre la isla) quemaría la mesada. Se atenúa en
// proporción a la cercanía — el lookdev del plano general queda intacto.
export default function S01Lighting() {
  const quality = getS01QualityProfile()
  const spot = useRef<THREE.SpotLight>(null)
  const lamp = useRef<THREE.PointLight>(null)
  const ambient = useRef<THREE.AmbientLight>(null)
  const hemi = useRef<THREE.HemisphereLight>(null)
  const cool = useRef<THREE.PointLight>(null)
  const rim = useRef<THREE.PointLight>(null)
  const bounce = useRef<THREE.PointLight>(null)
  const sink = useRef<THREE.PointLight>(null)
  const focus = new THREE.Vector3(0.2, 0.915, -0.2)

  useFrame((state) => {
    const d = state.camera.position.distanceTo(focus)
    const distanceU = Math.min(1, Math.max(0, (d - 0.55) / 2.8))
    const k = 0.26 + 0.74 * distanceU * distanceU * (3 - 2 * distanceU)
    const global = s01Director.frame.kitchenLight
    if (spot.current) spot.current.intensity = 40 * k * global
    if (lamp.current) lamp.current.intensity = 5.5 * k * global
    if (cool.current) cool.current.intensity = 22 * global
    if (rim.current) rim.current.intensity = 1.8 * global
    if (bounce.current) bounce.current.intensity = 4 * global
    if (sink.current) sink.current.intensity = 4.6 * global
    // En close-up el spot baja: la base sube apenas (sin duplicar exposición).
    if (ambient.current) ambient.current.intensity = 0.32 + (1 - k) * 0.12
    if (hemi.current) hemi.current.intensity = 0.54 + (1 - k) * 0.1
  })

  return (
    <>
      {/* Base tenue: ambiente apagado + hemisferio frío arriba / cálido abajo */}
      <ambientLight ref={ambient} color={c.wall} intensity={0.32} />
      <hemisphereLight ref={hemi} args={[c.wall, c.kick, 0.54]} />

      {/* Luz principal: lámpara colgante sobre la isla (única con sombras) */}
      <spotLight
        ref={spot}
        position={[-0.35, 2.55, -0.35]}
        angle={1.2}
        penumbra={0.55}
        distance={8.5}
        decay={2}
        intensity={40}
        color={c.warmLight}
        castShadow
        shadow-mapSize-width={quality.shadowMap}
        shadow-mapSize-height={quality.shadowMap}
        shadow-bias={-0.0004}
        shadow-normalBias={0.018}
      />

      {/* Segunda lámpara colgante: aporte cálido sin costo de sombra */}
      <pointLight ref={lamp} position={[0.55, 2.0, -0.15]} distance={4.5} decay={2} intensity={5.5} color={c.bulb} />

      {/* Relleno frío desde la ventana (noche) — da lectura al lateral izquierdo */}
      <pointLight ref={cool} position={[-3.6, 1.9, -1.1]} distance={8} decay={1.7} intensity={22} color={c.coolLight} />

      {/* Separación fría sutil para que la heladera recorte del fondo (sin quemar) */}
      <pointLight ref={rim} position={[2.15, 1.95, -1.95]} distance={4.5} decay={2} intensity={1.8} color="#8fa2c9" />

      {/* Rebote cálido del piso en primer plano — sostiene la bolsa y la
          alfombra sin lavar la zona (profundidad, clima HomePlus) */}
      <pointLight ref={bounce} position={[1.15, 0.5, 0.85]} distance={3.5} decay={2} intensity={4} color="#d9a06b" />
      {/* Lectura del plano de trabajo: revela acero y vajilla sin lavar el fondo. */}
      <pointLight ref={sink} position={[-1.0, 1.55, -2.1]} distance={2.5} decay={2} intensity={4.6} color="#b9c9dc" />
    </>
  )
}
