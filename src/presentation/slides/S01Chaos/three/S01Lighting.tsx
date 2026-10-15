import { useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { s01Palette as c } from './s01ThreeConfig'

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
  const focus = new THREE.Vector3(0.2, 0.915, -0.2)

  useFrame((state) => {
    const d = state.camera.position.distanceTo(focus)
    const k = Math.min(1, Math.max(0.18, 0.18 + (d - 0.62) / 2.6))
    if (spot.current) spot.current.intensity = 62 * k
    if (lamp.current) lamp.current.intensity = 8 * k
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
      <pointLight position={[-3.6, 1.9, -1.1]} distance={8} decay={1.7} intensity={28} color={c.coolLight} />

      {/* Separación fría sutil para que la heladera recorte del fondo (sin quemar) */}
      <pointLight position={[2.15, 1.95, -1.95]} distance={4.5} decay={2} intensity={1.0} color="#8fa2c9" />

      {/* Rebote cálido del piso en primer plano — sostiene la bolsa y la
          alfombra sin lavar la zona (profundidad, clima HomePlus) */}
      <pointLight position={[1.15, 0.5, 0.85]} distance={3.5} decay={2} intensity={5} color="#d9a06b" />
    </>
  )
}