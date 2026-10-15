import { useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { s01Palette as c } from './s01ThreeConfig'
import { s01Director } from './s01Director'

// Iluminación de lookdev: oscura pero legible, sombras suaves, calidez mínima
// desde las lámparas colgantes y un relleno frío desde la ventana (noche).
// Sin bloom, sin neons: el acento cálido es clima, no efecto.
//
// Microajuste narrativo: cuando la cámara entra en close-up, el foco cálido de
// la lámpara (que está justo sobre la isla) quemaría la mesada. Se atenúa en
// proporción a la cercanía — el lookdev del plano general queda intacto.
export default function S01Lighting() {
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
    const k = Math.min(1, Math.max(0.18, 0.18 + (d - 0.62) / 2.6))
    const global = s01Director.frame.kitchenLight
    if (spot.current) spot.current.intensity = 62 * k * global
    if (lamp.current) lamp.current.intensity = 8 * k * global
    if (cool.current) cool.current.intensity = 28 * global
    if (rim.current) rim.current.intensity = 1 * global
    if (bounce.current) bounce.current.intensity = 5 * global
    if (sink.current) sink.current.intensity = 5.5 * global
    // En close-up el spot baja: la base sube apenas (sin duplicar exposición).
    if (ambient.current) ambient.current.intensity = 0.4 + (1 - k) * 0.15
    if (hemi.current) hemi.current.intensity = 0.65 + (1 - k) * 0.12
  })

  return (
    <>
      {/* Base tenue: ambiente apagado + hemisferio frío arriba / cálido abajo */}
      <ambientLight ref={ambient} color={c.wall} intensity={0.4} />
      <hemisphereLight ref={hemi} args={[c.wall, c.kick, 0.65]} />

      {/* Luz principal: lámpara colgante sobre la isla (única con sombras) */}
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

      {/* Segunda lámpara colgante: aporte cálido sin costo de sombra */}
      <pointLight ref={lamp} position={[0.55, 2.0, -0.15]} distance={4.5} decay={2} intensity={8} color={c.bulb} />

      {/* Relleno frío desde la ventana (noche) — da lectura al lateral izquierdo */}
      <pointLight ref={cool} position={[-3.6, 1.9, -1.1]} distance={8} decay={1.7} intensity={28} color={c.coolLight} />

      {/* Separación fría sutil para que la heladera recorte del fondo (sin quemar) */}
      <pointLight ref={rim} position={[2.15, 1.95, -1.95]} distance={4.5} decay={2} intensity={1.0} color="#8fa2c9" />

      {/* Rebote cálido del piso en primer plano — sostiene la bolsa y la
          alfombra sin lavar la zona (profundidad, clima HomePlus) */}
      <pointLight ref={bounce} position={[1.15, 0.5, 0.85]} distance={3.5} decay={2} intensity={5} color="#d9a06b" />
      {/* Lectura del plano de trabajo: revela acero y vajilla sin lavar el fondo. */}
      <pointLight ref={sink} position={[-1.0, 1.55, -2.1]} distance={2.5} decay={2} intensity={5.5} color="#b9c9dc" />
    </>
  )
}
