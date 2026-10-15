import * as THREE from 'three'
import { s01Palette as c } from './s01ThreeConfig'
import S01CinematicProps from './S01CinematicProps'
import { s01Geo } from './s01CinematicConfig'

/* S01 LOOKDEV — rincón de cocina/living low-poly, noche, sobrio.
 * Base estática aprobada (géométrie, materiales, composición). Los elementos
 * con estado narrativo viven en S01CinematicProps, gobernados por s01Director. */

type Vec3 = [number, number, number]

function Box({
  size,
  position,
  rotation,
  color,
  roughness = 0.85,
  metalness = 0,
  flat = false,
  cast = false,
  receive = false,
}: {
  size: Vec3
  position: Vec3
  rotation?: Vec3
  color: string
  roughness?: number
  metalness?: number
  flat?: boolean
  cast?: boolean
  receive?: boolean
}) {
  return (
    <mesh position={position} rotation={rotation} castShadow={cast} receiveShadow={receive}>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} roughness={roughness} metalness={metalness} flatShading={flat} />
    </mesh>
  )
}

function Cyl({
  args,
  position,
  rotation,
  color,
  roughness = 0.8,
  metalness = 0,
  flat = true,
  open = false,
  cast = false,
  receive = false,
}: {
  args: [number, number, number, number]
  position: Vec3
  rotation?: Vec3
  color: string
  roughness?: number
  metalness?: number
  flat?: boolean
  open?: boolean
  cast?: boolean
  receive?: boolean
}) {
  return (
    <mesh position={position} rotation={rotation} castShadow={cast} receiveShadow={receive}>
      <cylinderGeometry args={[args[0], args[1], args[2], args[3], 1, open]} />
      <meshStandardMaterial color={color} roughness={roughness} metalness={metalness} flatShading={flat} side={open ? THREE.DoubleSide : undefined} />
    </mesh>
  )
}

// ---- Shell: piso, techo, paredes, zócalos, vano de puerta y ventana ----

function Room() {
  return (
    <group>
      <mesh position={[0, 0, 0.5]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[6.6, 7.4]} />
        <meshStandardMaterial color={c.floor} roughness={0.95} />
      </mesh>
      <mesh position={[0, 3.06, 0.5]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[6.6, 7.4]} />
        <meshStandardMaterial color={c.ceiling} roughness={1} />
      </mesh>
      {/* Pared del fondo */}
      <Box size={[6.6, 3.06, 0.12]} position={[0, 1.53, -3.06]} color={c.wall} receive />
      {/* Pared izquierda (con tramo hacia el frente) */}
      <Box size={[0.12, 3.06, 5.4]} position={[-3.06, 1.53, -0.4]} color={c.wallSide} receive />
      {/* Retorno parcial derecha para cerrar el cuadro detrás de la heladera */}
      <Box size={[0.12, 3.06, 2.6]} position={[3.06, 1.53, -1.8]} color={c.wallSide} receive />
      {/* Zócalos */}
      <Box size={[6.4, 0.09, 0.03]} position={[0, 0.045, -2.99]} color={c.trim} />
      <Box size={[0.03, 0.09, 5.2]} position={[-2.99, 0.045, -0.4]} color={c.trim} />
      {/* Vano de puerta a un pasillo oscuro (profundidad al fondo-izquierda) */}
      <Box size={[0.88, 2.12, 0.02]} position={[-2.46, 1.06, -2.985]} color="#08080d" />
      <Box size={[0.07, 2.18, 0.05]} position={[-2.93, 1.09, -2.96]} color={c.trim} />
      <Box size={[0.07, 2.18, 0.05]} position={[-1.99, 1.09, -2.96]} color={c.trim} />
      <Box size={[1.01, 0.07, 0.05]} position={[-2.46, 2.18, -2.96]} color={c.trim} />
      {/* Ventana nocturna en la pared izquierda */}
      <Box size={[0.015, 0.85, 1.05]} position={[-2.99, 1.8, -1.15]} color="#101826" roughness={0.4} />
      <mesh position={[-2.99, 1.8, -1.15]}>
        <boxGeometry args={[0.016, 0.85, 1.05]} />
        <meshStandardMaterial color="#101826" roughness={0.4} emissive="#223552" emissiveIntensity={0.35} />
      </mesh>
      <Box size={[0.05, 0.06, 1.15]} position={[-2.97, 2.27, -1.15]} color={c.trim} />
      <Box size={[0.05, 0.06, 1.15]} position={[-2.97, 1.33, -1.15]} color={c.trim} />
      <Box size={[0.05, 0.97, 0.06]} position={[-2.97, 1.8, -1.72]} color={c.trim} />
      <Box size={[0.05, 0.97, 0.06]} position={[-2.97, 1.8, -0.58]} color={c.trim} />
      <Box size={[0.05, 0.85, 0.04]} position={[-2.97, 1.8, -1.15]} color={c.trim} />
      {/* Alfombra de paso — calidez doméstica en el primer plano */}
      <mesh position={[-0.35, 0.006, 0.62]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[2.1, 1.15]} />
        <meshStandardMaterial color="#322d3a" roughness={1} />
      </mesh>
    </group>
  )
}

// ---- Fondo: muebles bajos, alacenas superiores y despacho alto ----

function BackKitchen() {
  return (
    <group>
      {/* Muebles bajos. La mesada se construye por tramos alrededor de la
          abertura de la bacha: no hay una losa sólida bajo el hueco. */}
      <Box size={[2.3, 0.86, 0.6]} position={[-0.85, 0.43, -2.72]} color={c.cabinet} cast receive />
      <group name="SINK_COUNTER_CUTOUT">
        <Box size={[0.76, 0.04, 0.66]} position={[-1.68, 0.882, -2.7]} color={c.counterBack} cast receive />
        <Box size={[1.1, 0.04, 0.66]} position={[-0.19, 0.882, -2.7]} color={c.counterBack} cast receive />
        <Box size={[0.56, 0.04, 0.15]} position={[-1.02, 0.882, -2.955]} color={c.counterBack} cast receive />
        <Box size={[0.56, 0.04, 0.11]} position={[-1.02, 0.882, -2.425]} color={c.counterBack} cast receive />
      </group>
      {/* Cubeta real 0.56×0.40×0.19: fondo + cuatro paredes interiores,
          acero mate, borde visible y desagüe. */}
      <group name="SINK_BASIN">
        <Box size={[0.5, 0.025, 0.34]} position={[-1.02, 0.705, -2.68]} color="#71787d" roughness={0.42} metalness={0.72} receive />
        <Box size={[0.025, 0.19, 0.4]} position={[-1.2875, 0.797, -2.68]} color="#899095" roughness={0.38} metalness={0.72} receive />
        <Box size={[0.025, 0.19, 0.4]} position={[-0.7525, 0.797, -2.68]} color="#899095" roughness={0.38} metalness={0.72} receive />
        <Box size={[0.51, 0.19, 0.025]} position={[-1.02, 0.797, -2.8675]} color="#858c91" roughness={0.4} metalness={0.7} receive />
        <Box size={[0.51, 0.19, 0.025]} position={[-1.02, 0.797, -2.4925]} color="#858c91" roughness={0.4} metalness={0.7} receive />
        <mesh position={[-1.02, 0.72, -2.68]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <cylinderGeometry args={[0.045, 0.045, 0.006, 16]} />
          <meshStandardMaterial color="#3f464b" roughness={0.32} metalness={0.82} />
        </mesh>
        <mesh position={[-1.02, 0.724, -2.68]} rotation={[-Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.029, 0.004, 6, 16]} />
          <meshStandardMaterial color="#9da3a6" roughness={0.25} metalness={0.9} />
        </mesh>
        {/* Borde perimetral independiente, apoyado sobre la mesada. */}
        <Box size={[0.6, 0.018, 0.025]} position={[-1.02, 0.907, -2.892]} color="#a3a8aa" roughness={0.3} metalness={0.82} />
        <Box size={[0.6, 0.018, 0.025]} position={[-1.02, 0.907, -2.468]} color="#a3a8aa" roughness={0.3} metalness={0.82} />
        <Box size={[0.025, 0.018, 0.4]} position={[-1.307, 0.907, -2.68]} color="#a3a8aa" roughness={0.3} metalness={0.82} />
        <Box size={[0.025, 0.018, 0.4]} position={[-0.733, 0.907, -2.68]} color="#a3a8aa" roughness={0.3} metalness={0.82} />
      </group>
      {/* Grifería: base, columna y pico, todos con sección real. */}
      <group name="SINK_FAUCET">
        <Cyl args={[0.045, 0.05, 0.025, 12]} position={[-1.02, 0.92, -2.94]} color="#91979b" roughness={0.28} metalness={0.88} />
        <Cyl args={[0.018, 0.021, 0.25, 10]} position={[-1.02, 1.045, -2.94]} color="#a4aaad" roughness={0.24} metalness={0.9} />
        <mesh position={[-1.02, 1.155, -2.865]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.017, 0.017, 0.15, 10]} />
          <meshStandardMaterial color="#a4aaad" roughness={0.24} metalness={0.9} />
        </mesh>
        <Cyl args={[0.018, 0.017, 0.095, 10]} position={[-1.02, 1.11, -2.79]} color="#a4aaad" roughness={0.24} metalness={0.9} />
        <Cyl args={[0.022, 0.022, 0.035, 10]} position={[-1.02, 0.94, -2.87]} color="#8d9397" roughness={0.28} metalness={0.86} />
      </group>
      <Box size={[0.02, 0.62, 0.02]} position={[-1.55, 0.57, -2.41]} color={c.fridgeHandle} roughness={0.35} metalness={0.8} />
      <Box size={[0.02, 0.62, 0.02]} position={[-0.15, 0.57, -2.41]} color={c.fridgeHandle} roughness={0.35} metalness={0.8} />
      {/* Tabla de cortar + olla sobre la mesada del fondo */}
      <Box size={[0.24, 0.014, 0.16]} position={[-1.45, 0.907, -2.62]} rotation={[0, 0.2, 0]} color="#8a6a48" cast />
      <Cyl args={[0.085, 0.085, 0.13, 10]} position={[-0.45, 0.965, -2.66]} color="#35383f" cast />
      {/* Alacenas superiores: el carcass completo (exterior + cavidad real +
          estantes + puertas hero) vive en S01CinematicProps/PANTRY_ROOT con
          la misma huella: x -2.27..-1.05 y -0.97..0.25, y 1.6..2.3. */}
      {/* Despacho alto a la derecha del fondo */}
      <Box size={[0.72, 2.2, 0.62]} position={[2.55, 1.1, -2.72]} color="#31343d" cast receive />
      <Box size={[0.02, 0.34, 0.02]} position={[2.2, 1.15, -2.4]} color={c.fridgeHandle} roughness={0.35} metalness={0.8} />
      <Box size={[0.02, 0.34, 0.02]} position={[2.2, 0.72, -2.4]} color={c.fridgeHandle} roughness={0.35} metalness={0.8} />
    </group>
  )
}

// ---- Isla protagonista: cuerpo pintado, frentes de cajón, mesada de madera ----

function Island() {
  const drawers: Vec3[] = [
    [-1.06, 0.28, 0.14],
    [-0.36, 0.28, 0.14],
    [0.34, 0.28, 0.14],
  ]
  return (
    <group position={[-0.35, 0, -0.35]}>
      {/* Toe-kick en sombra */}
      <Box size={[2.2, 0.09, 0.85]} position={[0, 0.045, 0]} color={c.kick} />
      {/* Cuerpo del mueble */}
      <Box size={[2.3, 0.77, 0.95]} position={[0, 0.475, 0]} color={c.cabinet} cast receive />
      {/* Frentes de cajón (lado cámara) con herrajes */}
      {drawers.map((d, i) => (
        <group key={i}>
          <Box size={[0.6, 0.185, 0.025]} position={d} color={c.cabinetFront} receive />
          <Box size={[0.26, 0.018, 0.02]} position={[d[0], d[1] + 0.055, d[2] + 0.02]} color={c.fridgeHandle} roughness={0.35} metalness={0.8} />
        </group>
      ))}
      {/* Puerta en el extremo derecho */}
      <Box size={[0.025, 0.6, 0.6]} position={[1.165, 0.53, 0]} color={c.cabinetFront} receive />
      <Box size={[0.02, 0.34, 0.024]} position={[1.18, 0.53, 0.24]} color={c.fridgeHandle} roughness={0.35} metalness={0.8} />
      {/* Mesada de madera con vuelo — V5.1 §12: madera cálida mate,
          variación tenue por tablones, canto diferenciado, microbevel. */}
      <Box size={[2.44, 0.055, 1.05]} position={[0, 0.8875, 0]} color={c.counter} roughness={0.78} cast receive />
      {/* canto diferenciado (borde frontal más oscuro) */}
      <Box size={[2.44, 0.03, 0.015]} position={[0, 0.878, 0.525]} color="#5d452e" roughness={0.8} />
      {/* vetas tenues: 3 tablones con tono apenas distinto */}
      <Box size={[0.78, 0.004, 1.0]} position={[-0.8, 0.916, 0]} color="#75573c" roughness={0.8} />
      <Box size={[0.78, 0.004, 1.0]} position={[0.02, 0.916, 0]} color="#7d5f41" roughness={0.8} />
      <Box size={[0.78, 0.004, 1.0]} position={[0.84, 0.916, 0]} color="#75573c" roughness={0.8} />
      {/* microbevel: filetes claros en bordes laterales */}
      <Box size={[0.012, 0.056, 1.05]} position={[-1.214, 0.8875, 0]} color="#8a6a48" roughness={0.75} />
      <Box size={[0.012, 0.056, 1.05]} position={[1.214, 0.8875, 0]} color="#8a6a48" roughness={0.75} />
    </group>
  )
}

// ---- Lámparas colgantes sobre la isla (el acento cálido de la escena) ----

function Pendants() {
  return (
    <group>
      {[-1.0, 0.4].map((x, i) => (
        <group key={i} position={[x, 0, -0.35]}>
          <Cyl args={[0.006, 0.006, 1.02, 6]} position={[0, 2.57, 0]} color={c.kick} flat={false} />
          <Cyl args={[0.035, 0.125, 0.15, 10]} position={[0, 2.03, 0]} color="#232228" roughness={0.45} metalness={0.55} open />
          <mesh position={[0, 1.96, 0]}>
            <sphereGeometry args={[0.02, 10, 8]} />
            <meshStandardMaterial color={c.bulb} emissive={c.bulb} emissiveIntensity={2.4} roughness={0.4} />
          </mesh>
        </group>
      ))}
    </group>
  )
}

// Carpeta kraft DEBAJO de la póliza: sólo asoma 15-25% (no protagonista).
function Folder() {
  return (
    <group position={[-0.1, 0, -0.4]} rotation={[0, 0.12, 0]}>
      <mesh position={[0, 0.9185, 0]} castShadow>
        <boxGeometry args={[0.3, 0.01, 0.24]} />
        <meshStandardMaterial color={c.kraft} roughness={0.95} />
      </mesh>
      <Box size={[0.11, 0.011, 0.03]} position={[0.04, 0.919, -0.13]} color="#8f6f44" roughness={0.95} />
    </group>
  )
}

// Frutero: bowl bajo con dos frutas — vida doméstica sin clutter.
function FruitBowl() {
  return (
    <group position={[-1.26, 0, -0.5]}>
      <Cyl args={[0.105, 0.065, 0.055, 9]} position={[0, 0.943, 0]} color="#3b3e46" cast />
      <mesh position={[-0.03, 0.972, 0.01]}>
        <sphereGeometry args={[0.032, 8, 6]} />
        <meshStandardMaterial color="#c07a3a" roughness={0.6} flatShading />
      </mesh>
      <mesh position={[0.03, 0.972, -0.02]}>
        <sphereGeometry args={[0.03, 8, 6]} />
        <meshStandardMaterial color="#b8874a" roughness={0.6} flatShading />
      </mesh>
    </group>
  )
}

// Bolsa de compras incompleta: 1 baguette, 1 verdura, 1 caja pequeña.
// Sobre el mesada de fondo, junto a la lista (beat S01.2).
function GroceryBag() {
  return (
    <group position={s01Geo.bag} rotation={[0, Math.PI / 4 + 0.15, 0]} scale={0.85}>
      <mesh position={[0, 0.18, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.19, 0.145, 0.36, 4, 1, true]} />
        <meshStandardMaterial color={c.kraft} roughness={0.95} flatShading side={THREE.DoubleSide} />
      </mesh>
      <Box size={[0.24, 0.18, 0.18]} position={[0, 0.13, 0]} color="#8a6a44" roughness={0.95} />
      <Cyl args={[0.024, 0.02, 0.44, 7]} position={[0.04, 0.33, -0.03]} rotation={[0.22, 0, -0.38]} color="#c49a5c" flat={false} cast />
      <mesh position={[-0.05, 0.3, 0.04]} rotation={[0.3, 0, 0.35]} castShadow>
        <coneGeometry args={[0.032, 0.1, 5]} />
        <meshStandardMaterial color="#5d7a4a" roughness={0.9} flatShading />
      </mesh>
      <mesh position={[-0.02, 0.29, 0.08]} rotation={[-0.25, 0, 0.15]} castShadow>
        <coneGeometry args={[0.028, 0.08, 5]} />
        <meshStandardMaterial color="#4e6b3f" roughness={0.9} flatShading />
      </mesh>
      <Box size={[0.08, 0.14, 0.045]} position={[0.07, 0.26, 0.07]} rotation={[0, 0.7, -0.12]} color="#3f4a6b" roughness={0.8} cast />
    </group>
  )
}

// Estantería con planta y frasco: cierra el lado izquierdo como hogar.
function WallShelf() {
  return (
    <group position={[-2.92, 0, -0.15]}>
      <Box size={[0.22, 0.025, 0.9]} position={[0, 1.62, 0]} color="#4a4436" roughness={0.9} cast />
      <Cyl args={[0.05, 0.04, 0.09, 8]} position={[0, 1.68, -0.24]} color="#6e5a48" flat={false} cast />
      <mesh position={[0, 1.78, -0.24]} rotation={[0.15, 0, 0]} castShadow>
        <coneGeometry args={[0.055, 0.16, 6]} />
        <meshStandardMaterial color="#4e6b3f" roughness={0.9} flatShading />
      </mesh>
      <Cyl args={[0.035, 0.035, 0.11, 8]} position={[0, 1.69, 0.2]} color="#6b7482" roughness={0.25} flat={false} cast />
    </group>
  )
}

export default function S01World() {
  return (
    <group>
      <Room />
      <BackKitchen />
      <Island />
      <Pendants />
      <Folder />
      <FruitBowl />
      <GroceryBag />
      <WallShelf />
      {/* Props con estado cinematográfico (puertas, heladera, docs, humo, teléfono) */}
      <S01CinematicProps />
    </group>
  )
}
