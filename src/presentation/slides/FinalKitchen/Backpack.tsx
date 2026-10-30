// FINAL KITCHEN V6.0 — mochila escolar procedural low-poly (S2).
// Estática: sin simulación de tela ni física dinámica (correa low-poly fija).
// Contactos: base↔suelo, coronilla↔mueble (lean 10°), correa libre en suelo.

import { BACKPACK } from './finalGeometry'

const BODY = '#6b5d43'
const POCKET = '#5d5138'
const DARK = '#3a3f35'
const ZIP = '#2c2c30'

/** BBox mundial aproximada (para el anchor de cámara W04 + QA). */
export function backpackBBox() {
  const [x, , z] = BACKPACK.root
  const { w, h, d } = BACKPACK.size
  return {
    min: [x - w / 2, 0, z - d / 2] as const,
    max: [x + w / 2, h + 0.05, z + d / 2 + 0.3] as const, // +correa libre
    center: [x, 0.24, z + 0.02] as const,
  }
}

export default function Backpack() {
  const [x, y, z] = BACKPACK.root
  return (
    <group name="BACKPACK_ROOT" position={[x, y, z]} rotation={[0, BACKPACK.yaw, 0]}>
      {/* BACKPACK_BODY — inclinado contra el frente de isla */}
      <group name="BACKPACK_BODY" rotation={[-BACKPACK.lean, 0, 0]}>
        {/* cuerpo principal */}
        <mesh position={[0, 0.21, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.31, 0.4, 0.16]} />
          <meshStandardMaterial color={BODY} roughness={0.95} flatShading />
        </mesh>
        {/* tapa superior enrollada */}
        <mesh position={[0, 0.425, 0.005]} castShadow>
          <boxGeometry args={[0.3, 0.07, 0.17]} />
          <meshStandardMaterial color={POCKET} roughness={0.95} flatShading />
        </mesh>
        {/* bolsillo frontal */}
        <mesh position={[0, 0.16, 0.095]} castShadow>
          <boxGeometry args={[0.22, 0.16, 0.05]} />
          <meshStandardMaterial color={POCKET} roughness={0.95} flatShading />
        </mesh>
        {/* cierre del bolsillo (material/textura, sin geometría extra móvil) */}
        <mesh position={[0, 0.245, 0.121]}>
          <boxGeometry args={[0.2, 0.012, 0.004]} />
          <meshStandardMaterial color={ZIP} roughness={0.7} />
        </mesh>
        {/* asa superior */}
        <mesh position={[0, 0.475, -0.01]} castShadow>
          <torusGeometry args={[0.045, 0.011, 5, 8, Math.PI]} />
          <meshStandardMaterial color={DARK} roughness={0.95} flatShading />
        </mesh>
        {/* dos correas traseras (contra el mueble, fijas) */}
        <mesh position={[-0.09, 0.24, -0.085]} rotation={[0.06, 0, 0.04]}>
          <boxGeometry args={[0.06, 0.34, 0.018]} />
          <meshStandardMaterial color={DARK} roughness={0.95} flatShading />
        </mesh>
        <mesh position={[0.09, 0.24, -0.085]} rotation={[0.06, 0, -0.04]}>
          <boxGeometry args={[0.06, 0.34, 0.018]} />
          <meshStandardMaterial color={DARK} roughness={0.95} flatShading />
        </mesh>
      </group>
      {/* correa libre apoyada sobre el suelo (estática, sin atraviesos) */}
      <mesh name="BACKPACK_STRAP_LOOSE" position={[0.1, 0.006, 0.24]} rotation={[0, 0.25, 0]} receiveShadow>
        <boxGeometry args={[0.05, 0.008, 0.3]} />
        <meshStandardMaterial color={DARK} roughness={0.95} flatShading />
      </mesh>
    </group>
  )
}
