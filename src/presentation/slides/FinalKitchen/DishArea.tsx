// FINAL KITCHEN V6.0 — pileta, grifería, escurridor y platos (S3A).
// La mesada S01 es una superficie continua: la pileta se resuelve con una
// variante final opt-in del tramo (overlay segmentado con hueco real +
// cuba por debajo del plano), sin CSG y sin tocar S01. Overlay a +2mm
// (subpíxel a distancia de cámara): reversible, sin z-fighting visible.
// Todo estático: sin agua, sin espuma, sin animación de grifo.

import { s01Palette as c } from '../S01Chaos/three/s01ThreeConfig'
import { DRAINER, SINK } from './finalGeometry'

const STEEL = '#8f979e'
const BASIN = '#33373c'
const CERAMIC = '#ddd8cc'

function SinkBasin() {
  const { center, size } = SINK
  const [cx, topY, cz] = center
  const { w, d, depth } = size
  const hw = w / 2
  const hd = d / 2
  const t = 0.012
  const y0 = topY - depth
  return (
    <group name="SINK_BASIN">
      {/* fondo */}
      <mesh position={[cx, y0, cz]} receiveShadow>
        <boxGeometry args={[w, t, d]} />
        <meshStandardMaterial color={BASIN} roughness={0.55} metalness={0.5} />
      </mesh>
      {/* paredes interiores (cuba oscura simplificada) */}
      <mesh position={[cx - hw + t / 2, y0 + depth / 2, cz]}>
        <boxGeometry args={[t, depth, d]} />
        <meshStandardMaterial color={BASIN} roughness={0.55} metalness={0.5} />
      </mesh>
      <mesh position={[cx + hw - t / 2, y0 + depth / 2, cz]}>
        <boxGeometry args={[t, depth, d]} />
        <meshStandardMaterial color={BASIN} roughness={0.55} metalness={0.5} />
      </mesh>
      <mesh position={[cx, y0 + depth / 2, cz - hd + t / 2]}>
        <boxGeometry args={[w, depth, t]} />
        <meshStandardMaterial color={BASIN} roughness={0.55} metalness={0.5} />
      </mesh>
      <mesh position={[cx, y0 + depth / 2, cz + hd - t / 2]}>
        <boxGeometry args={[w, depth, t]} />
        <meshStandardMaterial color={BASIN} roughness={0.55} metalness={0.5} />
      </mesh>
      {/* borde exterior (marco de empotrado) */}
      <mesh position={[cx, topY + 0.003, cz - hd - 0.01]}>
        <boxGeometry args={[w + 0.04, 0.006, 0.02]} />
        <meshStandardMaterial color={STEEL} roughness={0.35} metalness={0.7} flatShading />
      </mesh>
      <mesh position={[cx, topY + 0.003, cz + hd + 0.01]}>
        <boxGeometry args={[w + 0.04, 0.006, 0.02]} />
        <meshStandardMaterial color={STEEL} roughness={0.35} metalness={0.7} flatShading />
      </mesh>
      <mesh position={[cx - hw - 0.01, topY + 0.003, cz]}>
        <boxGeometry args={[0.02, 0.006, d]} />
        <meshStandardMaterial color={STEEL} roughness={0.35} metalness={0.7} flatShading />
      </mesh>
      <mesh position={[cx + hw + 0.01, topY + 0.003, cz]}>
        <boxGeometry args={[0.02, 0.006, d]} />
        <meshStandardMaterial color={STEEL} roughness={0.35} metalness={0.7} flatShading />
      </mesh>
    </group>
  )
}

/** Tramo de mesada con hueco (4 piezas, mismo material que S01). */
function CounterWithHole() {
  const { center, size } = SINK
  const [cx, topY] = center
  // Mesada S01: x∈[−2.06,0.36] (centro −0.85, ancho 2.42), z∈[−3.03,−2.37].
  const x0 = -2.06
  const x1 = 0.36
  const z0 = -3.03
  const z1 = -2.37
  const hx0 = cx - size.w / 2
  const hx1 = cx + size.w / 2
  const hz0 = center[2] - size.d / 2
  const hz1 = center[2] + size.d / 2
  const y = topY + 0.002 // overlay a +2mm sobre la mesada original
  const h = 0.04
  const mat = { color: c.counterBack, roughness: 0.8 }
  return (
    <group name="FINAL_COUNTER_SEGMENT">
      {/* izquierda del hueco */}
      <mesh position={[(x0 + hx0) / 2, y - h / 2, (z0 + z1) / 2]} receiveShadow>
        <boxGeometry args={[hx0 - x0, h, z1 - z0]} />
        <meshStandardMaterial color={mat.color} roughness={mat.roughness} />
      </mesh>
      {/* derecha del hueco */}
      <mesh position={[(hx1 + x1) / 2, y - h / 2, (z0 + z1) / 2]} receiveShadow>
        <boxGeometry args={[x1 - hx1, h, z1 - z0]} />
        <meshStandardMaterial color={mat.color} roughness={mat.roughness} />
      </mesh>
      {/* fondo del hueco */}
      <mesh position={[cx, y - h / 2, (z0 + hz0) / 2]} receiveShadow>
        <boxGeometry args={[hx1 - hx0, h, hz0 - z0]} />
        <meshStandardMaterial color={mat.color} roughness={mat.roughness} />
      </mesh>
      {/* frente del hueco */}
      <mesh position={[cx, y - h / 2, (hz1 + z1) / 2]} receiveShadow>
        <boxGeometry args={[hx1 - hx0, h, z1 - hz1]} />
        <meshStandardMaterial color={mat.color} roughness={mat.roughness} />
      </mesh>
    </group>
  )
}

function Faucet() {
  const [cx, topY] = SINK.center
  const z = SINK.faucetZ
  return (
    <group name="SINK_FAUCET" position={[cx, topY, z]}>
      {/* base + poste */}
      <mesh position={[0, 0.012, 0]} castShadow>
        <cylinderGeometry args={[0.028, 0.032, 0.024, 8]} />
        <meshStandardMaterial color={STEEL} roughness={0.35} metalness={0.7} flatShading />
      </mesh>
      <mesh position={[0, 0.12, 0]} castShadow>
        <cylinderGeometry args={[0.02, 0.022, 0.22, 8]} />
        <meshStandardMaterial color={STEEL} roughness={0.35} metalness={0.7} flatShading />
      </mesh>
      {/* cuello + pico hacia la cuba */}
      <mesh position={[0, 0.225, 0.07]} rotation={[Math.PI / 2.4, 0, 0]} castShadow>
        <cylinderGeometry args={[0.016, 0.016, 0.17, 8]} />
        <meshStandardMaterial color={STEEL} roughness={0.35} metalness={0.7} flatShading />
      </mesh>
      <mesh position={[0, 0.19, 0.135]}>
        <cylinderGeometry args={[0.014, 0.017, 0.05, 8]} />
        <meshStandardMaterial color={STEEL} roughness={0.35} metalness={0.7} flatShading />
      </mesh>
    </group>
  )
}

export function Drainer() {
  const [cx, topY, cz] = DRAINER.center
  const plates = [-0.05, -0.02, 0.01]
  return (
    <group name="DISH_DRAINER" position={[cx, topY, cz]}>
      {/* base con apoyo útil sobre la mesada */}
      <mesh position={[0, 0.009, 0]} castShadow receiveShadow>
        <boxGeometry args={[DRAINER.width, 0.016, 0.3]} />
        <meshStandardMaterial color="#4a4e55" roughness={0.8} flatShading />
      </mesh>
      {/* separadores */}
      {[-0.06, 0.06].map((x, i) => (
        <mesh key={i} position={[x, 0.05, 0]}>
          <boxGeometry args={[0.012, 0.1, 0.28]} />
          <meshStandardMaterial color="#565b63" roughness={0.8} flatShading />
        </mesh>
      ))}
      {/* tres platos: apoyo real en el escurridor, inclinación 70–80°.
          Centro a r·cos(15°)+bandeja: el borde inferior roza sin atravesar. */}
      {plates.map((x, i) => (
        <mesh
          key={i}
          position={[x, 0.11, 0]}
          rotation={[0, 0, DRAINER.plateTilt - Math.PI / 2]}
          castShadow
        >
          <cylinderGeometry args={[DRAINER.plateR, DRAINER.plateR * 0.82, DRAINER.plateThick, 12]} />
          <meshStandardMaterial color={CERAMIC} roughness={0.85} flatShading />
        </mesh>
      ))}
    </group>
  )
}

export default function DishArea() {
  return (
    <group>
      <CounterWithHole />
      <SinkBasin />
      <Faucet />
      <Drainer />
    </group>
  )
}
