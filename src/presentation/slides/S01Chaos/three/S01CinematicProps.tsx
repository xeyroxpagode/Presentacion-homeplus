import { createContext, useContext, useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { s01Palette as c } from './s01ThreeConfig'
import { s01Director, type S01Frame } from './s01Director'
import { DEG, s01Docs, s01Geo, s01Loose, s01PhoneClearZone, s01Smoke } from './s01CinematicConfig'

/* S01 CINEMATIC FINAL PRIME — props HERO con estado físico.
 * Todo se escribe por frame desde el frame activo (sin rerenders de React).
 * Jerarquía semántica: PANTRY_ROOT / FRIDGE_WORLD / DOCUMENT_MODULE /
 * PHONE_WORLD. Pivots reales, nada rota desde su centro salvo que sea físico.
 *
 * OVERRIDE OPT-IN V6.0 (escena final): por defecto todo lee el singleton
 * s01Director.frame (comportamiento S01 intacto). La escena FinalKitchen
 * provee `override={{ frame, screenMap, live }}` y los componentes leen el
 * frame congelado + la textura de pantalla sin tocar el estado global. */

/** Estado vivo mínimo que el FinalDirector muta por frame (sin rerenders). */
export type S01FinalLive = {
  screenBrightness: number
  /** 1 = lookdev S01 intacto; <1 atenúa durante el apagado W09–W14. */
  bulbDim: number
  windowDim: number
  pantryDim: number
  stripDim: number
}

export type S01FinalOverride = {
  /** Frame congelado finalRest (sustituye al singleton sólo en este subárbol). */
  frame: S01Frame
  /** Textura Home para PHONE_SCREEN (null = pantalla negra S01). */
  screenMap: THREE.Texture | null
  /** Ref estable con valores mutados por FinalDirector. */
  live: S01FinalLive
}

const S01OverrideContext = createContext<S01FinalOverride | null>(null)

/** Scope del override final (envuelve mundo estático + props dinámicos). */
export function S01FinalScope({
  override,
  children,
}: {
  override: S01FinalOverride | null
  children: React.ReactNode
}) {
  return <S01OverrideContext.Provider value={override}>{children}</S01OverrideContext.Provider>
}

/** Ref viva del override (luces/emisivas), o null en S01 puro. */
export function useS01FinalLive(): S01FinalLive | null {
  return useContext(S01OverrideContext)?.live ?? null
}

/** Frame activo: override final o singleton S01 (default idéntico a antes). */
function useS01Frame(): S01Frame {
  return useContext(S01OverrideContext)?.frame ?? s01Director.frame
}

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

/* ------------------------------------------------------------------ */
/* Texturas de papel: microtexto + sello VENCIDO (nunca UI)             */
/* ------------------------------------------------------------------ */

function policyTexture() {
  const cv = document.createElement('canvas')
  cv.width = 256
  cv.height = 340
  const ctx = cv.getContext('2d')!
  ctx.fillStyle = '#ddd6c6'
  ctx.fillRect(0, 0, 256, 340)
  // Encabezado narrativo: SEGURO DEL AUTO ~13% altura hoja.
  ctx.fillStyle = '#2e2c26'
  ctx.font = 'bold 30px Arial, sans-serif'
  ctx.textAlign = 'center'
  ctx.fillText('SEGURO', 128, 42)
  ctx.fillText('DEL AUTO', 128, 72)
  ctx.fillStyle = '#6d675a'
  ctx.font = '11px Arial, sans-serif'
  ctx.fillText('PÓLIZA Nº 0048217  ·  PAT ABC-123', 128, 92)
  ctx.fillText('VIGENCIA 01/24 — 01/25', 128, 106)
  ctx.fillStyle = '#a49b87'
  for (let i = 0; i < 11; i++) {
    const y = 126 + i * 17
    ctx.fillRect(28, y, i % 3 === 2 ? 96 : 200, 5)
  }
  ctx.fillStyle = '#8d8472'
  ctx.fillRect(28, 306, 120, 4)
  const tex = new THREE.CanvasTexture(cv)
  tex.colorSpace = THREE.SRGBColorSpace
  return tex
}

function vencidoTexture() {
  const cv = document.createElement('canvas')
  cv.width = 512
  cv.height = 168
  const ctx = cv.getContext('2d')!
  ctx.clearRect(0, 0, 512, 168)
  ctx.fillStyle = '#7c2222'
  ctx.font = 'bold 80px "Arial Black", Arial, sans-serif'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  if ('letterSpacing' in ctx) (ctx as unknown as { letterSpacing: string }).letterSpacing = '4px'
  ctx.fillText('VENCIDO', 256, 88)
  // Desgaste de impresión: manchas transparentes que rompen el sello.
  ctx.globalCompositeOperation = 'destination-out'
  for (let i = 0; i < 190; i++) {
    const x = (i * 97) % 512
    const y = (i * 53) % 168
    ctx.fillStyle = `rgba(0,0,0,${0.25 + ((i * 7) % 5) * 0.13})`
    ctx.fillRect(x, y, 3 + ((i * 11) % 6), 2 + ((i * 5) % 4))
  }
  ctx.globalCompositeOperation = 'source-over'
  const tex = new THREE.CanvasTexture(cv)
  tex.colorSpace = THREE.SRGBColorSpace
  return tex
}

/* ------------------------------------------------------------------ */
/* PANTRY HERO — PANTRY_ROOT: A (doble) + B (simple), cavidad real,    */
/* 2 estantes físicos por módulo, jar + box (80–90% vacío), puertas     */
/* con espesor/dorso/cantos/frame/tirador y bisagra exterior real.     */
/* ------------------------------------------------------------------ */

const PANTRY_LEAF_COLOR = '#41454f'
const PANTRY_INNER_COLOR = '#2a2d36'
const PANTRY_SHELF_COLOR = '#3a3d46'
const PANTRY_DOOR_T = 0.03

function PantryModule({
  x,
  width,
  jar,
  box,
}: {
  x: number
  width: number
  jar?: boolean
  box?: boolean
}) {
  const y = s01Geo.pantry.y
  return (
    <group name={jar ? 'PANTRY_A' : 'PANTRY_B'} position={[x, y, -2.87]}>
      {/* A_CAVITY / B_CAVITY — carcasa con interior físico.
          V5.1 §12: marcos y paneles ligeramente distintos, sombras de
          cavidad, dorsos secundarios. */}
      <group name={jar ? 'A_CAVITY' : 'B_CAVITY'}>
        {/* A_BACK_PANEL / B_BACK_PANEL + dorso secundario */}
        <Box size={[width, 0.7, 0.02]} position={[0, 0, -0.16]} color={PANTRY_INNER_COLOR} receive />
        <Box size={[width - 0.1, 0.6, 0.008]} position={[0, 0, -0.148]} color={jar ? '#31343e' : '#2e313a'} receive />
        {/* sombras de cavidad: esquinas interiores oscurecidas */}
        <Box size={[0.03, 0.66, 0.3]} position={[-width / 2 + 0.035, 0, 0]} color="#1d1f26" receive />
        <Box size={[0.03, 0.66, 0.3]} position={[width / 2 - 0.035, 0, 0]} color="#1d1f26" receive />
        {/* laterales + techo/base */}
        <Box size={[0.02, 0.7, 0.34]} position={[-width / 2 + 0.01, 0, 0]} color={PANTRY_LEAF_COLOR} receive />
        <Box size={[0.02, 0.7, 0.34]} position={[width / 2 - 0.01, 0, 0]} color={PANTRY_LEAF_COLOR} receive />
        <Box size={[width, 0.02, 0.34]} position={[0, 0.34, 0]} color={PANTRY_LEAF_COLOR} receive />
        <Box size={[width, 0.02, 0.34]} position={[0, -0.34, 0]} color={PANTRY_LEAF_COLOR} receive />
        {/* A_SHELF_TOP/BOTTOM — grosor real, cara superior + frente */}
        <group name={jar ? 'A_SHELF_TOP' : 'B_SHELF_TOP'}>
          <Box size={[width - 0.04, 0.025, 0.22]} position={[0, 0.1, 0.05]} color={PANTRY_SHELF_COLOR} cast receive />
        </group>
        <group name={jar ? 'A_SHELF_BOTTOM' : 'B_SHELF_BOTTOM'}>
          <Box size={[width - 0.04, 0.025, 0.22]} position={[0, -0.12, 0.05]} color={PANTRY_SHELF_COLOR} cast receive />
        </group>
      </group>
      {/* A_ITEM_JAR — frasco 8 lados + tapa, estante inferior, pegado a lateral/fondo */}
      {jar && (
        <group name="A_ITEM_JAR" position={[-width / 2 + 0.1, -0.1075 + 0.045, -0.03]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.04, 0.037, 0.09, 8]} />
            <meshStandardMaterial color="#6b7482" roughness={0.25} metalness={0.35} flatShading />
          </mesh>
          <mesh position={[0, 0.055, 0]} castShadow>
            <cylinderGeometry args={[0.042, 0.042, 0.02, 8]} />
            <meshStandardMaterial color="#4a4e57" roughness={0.4} metalness={0.5} flatShading />
          </mesh>
        </group>
      )}
      {/* B_ITEM_BOX — caja pequeña LADO OPUESTO al batiente (visible con
          puerta abierta), inclinación 7°, sin branding */}
      {box && (
        <group name="B_ITEM_BOX" position={[-0.15, -0.1075 + 0.05, 0.08]} rotation={[0, 0.35, 7 * DEG]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[0.11, 0.1, 0.09]} />
            <meshStandardMaterial color="#9a8a6d" roughness={0.9} flatShading />
          </mesh>
          <Box size={[0.112, 0.02, 0.092]} position={[0, 0.02, 0]} color="#7d6f56" roughness={0.9} />
        </group>
      )}
    </group>
  )
}

function PantryDoor({ leafKey }: { leafKey: 'leafA_L' | 'leafA_R' | 'leafB_R' }) {
  const hinge = useRef<THREE.Group>(null)
  const frame = useS01Frame()
  const leaf = s01Geo.pantry[leafKey]
  const idx = leafKey === 'leafA_L' ? 0 : leafKey === 'leafA_R' ? 1 : 2
  const hingeName = leafKey === 'leafA_L' ? 'A_LEFT_HINGE' : leafKey === 'leafA_R' ? 'A_RIGHT_HINGE' : 'B_RIGHT_HINGE'
  const doorName = leafKey === 'leafA_L' ? 'A_LEFT_DOOR' : leafKey === 'leafA_R' ? 'A_RIGHT_DOOR' : 'B_RIGHT_DOOR'
  const handleName = leafKey === 'leafA_L' ? 'A_LEFT_HANDLE' : leafKey === 'leafA_R' ? 'A_RIGHT_HANDLE' : 'B_RIGHT_HANDLE'

  useFrame(() => {
    if (hinge.current) hinge.current.rotation.y = frame.pantry[idx]
  })

  const cx = leaf.dirX * leaf.width * 0.5
  return (
    <group name={hingeName} ref={hinge} position={[leaf.hingeX, s01Geo.pantry.y, s01Geo.pantry.doorZ]}>
      <group name={doorName}>
        {/* frente + dorso + 4 cantos en un volumen con espesor real */}
        <Box size={[leaf.width, 0.7, PANTRY_DOOR_T]} position={[cx, 0, 0]} color={PANTRY_LEAF_COLOR} cast receive />
        {/* frame/panel en relieve (cara frontal) */}
        <Box size={[leaf.width - 0.12, 0.03, 0.008]} position={[cx, 0.28, PANTRY_DOOR_T / 2 + 0.004]} color="#4a4e57" />
        <Box size={[leaf.width - 0.12, 0.03, 0.008]} position={[cx, -0.28, PANTRY_DOOR_T / 2 + 0.004]} color="#4a4e57" />
        <Box size={[0.03, 0.53, 0.008]} position={[cx - leaf.width / 2 + 0.075, 0, PANTRY_DOOR_T / 2 + 0.004]} color="#4a4e57" />
        <Box size={[0.03, 0.53, 0.008]} position={[cx + leaf.width / 2 - 0.075, 0, PANTRY_DOOR_T / 2 + 0.004]} color="#4a4e57" />
        {/* tirador independiente — SIEMPRE en borde libre (opuesto al hinge) */}
        <group name={handleName} position={[cx + leaf.dirX * (leaf.width / 2 - 0.09), -0.12, PANTRY_DOOR_T / 2]}>
          <mesh position={[0, 0, 0.02]} castShadow>
            <cylinderGeometry args={[0.011, 0.011, 0.16, 8]} />
            <meshStandardMaterial color={c.fridgeHandle} roughness={0.35} metalness={0.8} flatShading />
          </mesh>
          <Box size={[0.02, 0.02, 0.025]} position={[0, 0.07, 0.008]} color={c.fridgeHandle} roughness={0.35} metalness={0.8} />
          <Box size={[0.02, 0.02, 0.025]} position={[0, -0.07, 0.008]} color={c.fridgeHandle} roughness={0.35} metalness={0.8} />
        </group>
      </group>
    </group>
  )
}

function PantryRoot() {
  return (
    <group name="PANTRY_ROOT">
      <PantryModule x={-1.66} width={1.22} jar />
      <PantryModule x={-0.36} width={1.22} box />
      {/* lectura interior: cavidad protagonista, dorsos sin hotspot.
          Luz A centrada en módulo A (lejos del dorso de A_RIGHT); B sobre
          módulo B; fill frontal suave. Sin luz teatral de alacena. */}
      <PantryLights />
      <PantryDoor leafKey="leafA_L" />
      <PantryDoor leafKey="leafA_R" />
      <PantryDoor leafKey="leafB_R" />
    </group>
  )
}

/* Luces de alacena (V6.0: atenuables por el apagado final, 1 = S01). */
function PantryLights() {
  const live = useS01FinalLive()
  const a = useRef<THREE.PointLight>(null)
  const b = useRef<THREE.PointLight>(null)
  const f = useRef<THREE.PointLight>(null)
  useFrame(() => {
    const k = live?.pantryDim ?? 1
    if (a.current) a.current.intensity = 3.0 * k
    if (b.current) b.current.intensity = 2.2 * k
    if (f.current) f.current.intensity = 1.6 * k
  })
  return (
    <group>
      <pointLight ref={a} position={[-1.7, 1.95, -2.35]} distance={3.0} decay={1.4} intensity={3.0} color="#c9b294" />
      <pointLight ref={b} position={[-0.5, 1.95, -2.4]} distance={2.2} decay={1.5} intensity={2.2} color="#c9b294" />
      <pointLight ref={f} position={[-1.1, 1.65, -2.15]} distance={2.2} decay={1.5} intensity={1.6} color="#cfa87e" />
    </group>
  )
}

/* ------------------------------------------------------------------ */
/* FRIDGE HERO — FRIDGE_WORLD → FRIDGE_SHAKE_RIG; puertas con grosor,   */
/* seam, gasket oscuro, handles, cavidad fría + 2 estantes, bisagras.  */
/* ------------------------------------------------------------------ */

const FRIDGE_GASKET = '#1a1c20'
const FRIDGE_INNER = '#b9c4cc'

/* Luz fría interior V5.1 §9: localizada, suave; encendida al abrir (S01.2),
 * dos flickers finitos en el fallo, apagada después. Sin tocar lámparas. */
function FridgeInnerLight() {
  const light = useRef<THREE.PointLight>(null)
  const strip = useRef<THREE.Mesh>(null)
  const frame = useS01Frame()
  const live = useS01FinalLive()
  useFrame(() => {
    const k = frame.fridgeLight
    const stripDim = live?.stripDim ?? 1
    if (light.current) light.current.intensity = k * 2.4 * stripDim
    const m = strip.current?.material as THREE.MeshStandardMaterial | undefined
    if (m) m.emissiveIntensity = (0.05 + k * 2.2) * stripDim
  })
  return (
    <group position={[0, 0.82, 0.24]}>
      <mesh ref={strip}>
        <boxGeometry args={[0.4, 0.015, 0.02]} />
        <meshStandardMaterial color="#dfe9f2" emissive="#cfe2ff" emissiveIntensity={0.05} roughness={0.4} />
      </mesh>
      <pointLight ref={light} position={[0, -0.12, 0.06]} distance={1.3} decay={1.8} intensity={0} color="#cfe2ff" />
    </group>
  )
}

function Fridge() {
  const rig = useRef<THREE.Group>(null)
  const topDoor = useRef<THREE.Group>(null)
  const botDoor = useRef<THREE.Group>(null)
  const f = s01Geo.fridge
  const frame = useS01Frame()

  useFrame(() => {
    const s = frame
    if (rig.current) {
      rig.current.position.set(s.fShift, s.fLift, 0)
      rig.current.rotation.z = s.fRoll
    }
    if (topDoor.current) topDoor.current.rotation.y = s.fTop
    if (botDoor.current) botDoor.current.rotation.y = s.fBot
  })

  const doorT = 0.035
  return (
    <group name="FRIDGE_WORLD" position={f.group}>
      <group name="FRIDGE_SHAKE_RIG" ref={rig}>
        <group name="FRIDGE_BODY">
          {/* cuerpo con receso frontal real (la cavidad vive en z 0.13–0.37)
              V5.1 §12: exterior blanco cálido satinado (0.42, microbrillo). */}
          <mesh castShadow receiveShadow position={[0, 0, -0.12]}>
            <boxGeometry args={[0.85, 1.85, 0.5]} />
            <meshStandardMaterial color={c.fridge} roughness={0.42} metalness={0.15} />
          </mesh>
          {/* paredes del receso */}
          <Box size={[0.85, 0.06, 0.24]} position={[0, 0.895, 0.25]} color={c.fridge} roughness={0.42} metalness={0.15} />
          <Box size={[0.85, 0.06, 0.24]} position={[0, -0.895, 0.25]} color={c.fridge} roughness={0.42} metalness={0.15} />
          <Box size={[0.06, 1.73, 0.24]} position={[-0.395, 0, 0.25]} color={c.fridge} roughness={0.42} metalness={0.15} />
          <Box size={[0.06, 1.73, 0.24]} position={[0.395, 0, 0.25]} color={c.fridge} roughness={0.42} metalness={0.15} />
          {/* cavidad interior fría + 2 estantes volumétricos */}
          <group name="FRIDGE_CAVITY">
            <Box size={[0.73, 1.73, 0.02]} position={[0, 0, 0.14]} color={FRIDGE_INNER} roughness={0.6} receive />
            {/* FRIDGE_SHELF_TOP/BOTTOM — estantes reales con grosor y frente */}
            <group name="FRIDGE_SHELF_TOP">
              <Box size={[0.71, 0.025, 0.2]} position={[0, 0.45, 0.24]} color="#cdd6dd" roughness={0.55} receive />
              <Box size={[0.71, 0.03, 0.015]} position={[0, 0.445, 0.335]} color="#aeb9c2" roughness={0.5} />
            </group>
            <group name="FRIDGE_SHELF_BOTTOM">
              <Box size={[0.71, 0.025, 0.2]} position={[0, -0.35, 0.24]} color="#cdd6dd" roughness={0.55} receive />
              <Box size={[0.71, 0.03, 0.015]} position={[0, -0.355, 0.335]} color="#aeb9c2" roughness={0.5} />
            </group>
            {/* FRIDGE_CRISPER — base/cajón inferior vacío (frente translúcido) */}
            <group name="FRIDGE_CRISPER">
              <Box size={[0.68, 0.16, 0.18]} position={[0, -0.68, 0.24]} color="#c3ccd4" roughness={0.4} receive />
              <Box size={[0.68, 0.1, 0.012]} position={[0, -0.68, 0.335]} color="#d7dee5" roughness={0.25} />
            </group>
            {/* sombras de contacto bajo estantes (planos oscuros tenues) */}
            <mesh position={[0, 0.436, 0.24]} rotation={[-Math.PI / 2, 0, 0]}>
              <planeGeometry args={[0.68, 0.18]} />
              <meshBasicMaterial color="#000000" transparent opacity={0.18} depthWrite={false} />
            </mesh>
            <mesh position={[0, -0.364, 0.24]} rotation={[-Math.PI / 2, 0, 0]}>
              <planeGeometry args={[0.68, 0.18]} />
              <meshBasicMaterial color="#000000" transparent opacity={0.18} depthWrite={false} />
            </mesh>
            {/* FRIDGE_LIGHT_STRIP — tira fría superior + luz localizada */}
            <group name="FRIDGE_LIGHT_STRIP">
              <FridgeInnerLight />
            </group>
          </group>
          {/* seam freezer/body + zócalo */}
          <Box size={[0.86, 0.014, 0.012]} position={[0, 0.4, 0.375]} color="#8e897f" roughness={0.6} />
          <Box size={[0.8, 0.02, 0.7]} position={[0, -0.93, 0]} color="#8e897f" roughness={0.7} />
        </group>

        <group name="TOP_HINGE" ref={topDoor} position={[f.hingeX, f.topCenterY, f.hingeZ]}>
          <group name="TOP_DOOR">
            <Box size={[0.85, f.topHeight, doorT]} position={[-0.425, 0, 0]} color={c.fridge} roughness={0.42} metalness={0.15} cast receive />
            {/* TOP_GASKET — marco oscuro perimetral interior */}
            <group name="TOP_GASKET">
              <Box size={[0.79, 0.025, 0.012]} position={[-0.425, f.topHeight / 2 - 0.03, -doorT / 2]} color={FRIDGE_GASKET} roughness={0.9} />
              <Box size={[0.79, 0.025, 0.012]} position={[-0.425, -f.topHeight / 2 + 0.03, -doorT / 2]} color={FRIDGE_GASKET} roughness={0.9} />
              <Box size={[0.025, f.topHeight - 0.06, 0.012]} position={[-0.06, 0, -doorT / 2]} color={FRIDGE_GASKET} roughness={0.9} />
              <Box size={[0.025, f.topHeight - 0.06, 0.012]} position={[-0.79, 0, -doorT / 2]} color={FRIDGE_GASKET} roughness={0.9} />
            </group>
            <group name="TOP_HANDLE">
              <Box size={[0.026, 0.17, 0.028]} position={[-0.79, 0, 0.026]} color={c.fridgeHandle} roughness={0.3} metalness={0.85} />
            </group>
          </group>
        </group>
        <group name="BOTTOM_HINGE" ref={botDoor} position={[f.hingeX, f.botCenterY, f.hingeZ]}>
          <group name="BOTTOM_DOOR">
            <Box size={[0.85, f.botHeight, doorT]} position={[-0.425, 0, 0]} color={c.fridge} roughness={0.42} metalness={0.15} cast receive />
            <group name="BOTTOM_GASKET">
              <Box size={[0.79, 0.025, 0.012]} position={[-0.425, f.botHeight / 2 - 0.03, -doorT / 2]} color={FRIDGE_GASKET} roughness={0.9} />
              <Box size={[0.79, 0.025, 0.012]} position={[-0.425, -f.botHeight / 2 + 0.03, -doorT / 2]} color={FRIDGE_GASKET} roughness={0.9} />
              <Box size={[0.025, f.botHeight - 0.06, 0.012]} position={[-0.06, 0, -doorT / 2]} color={FRIDGE_GASKET} roughness={0.9} />
              <Box size={[0.025, f.botHeight - 0.06, 0.012]} position={[-0.79, 0, -doorT / 2]} color={FRIDGE_GASKET} roughness={0.9} />
            </group>
            <group name="BOTTOM_HANDLE">
              <Box size={[0.026, 0.46, 0.028]} position={[-0.79, 0, 0.026]} color={c.fridgeHandle} roughness={0.3} metalness={0.85} />
            </group>
            {/* BOTTOM_BINS — compartimentos simples en puerta inferior
                (rebajados 0.02 m: ajuste mínimo V5.1 para el nuevo ángulo
                42–62° sin penetraciones con cuerpo/estantes). */}
            <group name="BOTTOM_BINS" position={[-0.425, -0.3, -0.055]}>
              <Box size={[0.5, 0.02, 0.09]} position={[0, 0, 0]} color="#cdd6dd" roughness={0.55} receive />
              <Box size={[0.5, 0.07, 0.015]} position={[0, 0.035, -0.037]} color="#cdd6dd" roughness={0.55} />
              <Box size={[0.015, 0.07, 0.09]} position={[-0.242, 0.035, 0]} color="#cdd6dd" roughness={0.55} />
              <Box size={[0.015, 0.07, 0.09]} position={[0.242, 0.035, 0]} color="#cdd6dd" roughness={0.55} />
            </group>
            {/* EGG_TRAY — bandeja física en puerta inferior: A seguro
                (cerca de bisagra), B próximo al borde libre. */}
            <group name="EGG_TRAY" position={[-0.4, 0.1, -0.055]}>
              <Box size={[0.44, 0.018, 0.1]} position={[0, 0, 0]} color="#d8d2c2" roughness={0.8} receive />
              <Box size={[0.02, 0.05, 0.1]} position={[-0.08, 0.025, 0]} color="#cfc8b6" roughness={0.8} />
              <Box size={[0.44, 0.05, 0.015]} position={[0, 0.025, -0.042]} color="#cfc8b6" roughness={0.8} />
              <Box size={[0.44, 0.05, 0.015]} position={[0, 0.025, 0.042]} color="#cfc8b6" roughness={0.8} />
            </group>
          </group>
        </group>
      </group>
    </group>
  )
}

/* ------------------------------------------------------------------ */
/* DOCUMENT MODULE — fuente física de los papeles. Cajón prismático    */
/* (sólo eje frontal, 0–0.24 m). DOCUMENT_STACK + MANUAL_ROOT viajan   */
/* con el drawer; los vuelos arrancan en el origen = boca del cajón,   */
/* equivalencia analítica de releaseDocument (sin pop).                */
/* ------------------------------------------------------------------ */

function DocSector() {
  const slide = useRef<THREE.Group>(null)
  const stack = useRef<THREE.Group>(null)
  const manual = useRef<THREE.Group>(null)
  const t = s01Geo.docTower
  const closedZ = -2.43
  const frame = useS01Frame()

  useFrame(() => {
    const f = frame
    if (slide.current) slide.current.position.z = closedZ + f.drawer
    // El stack vive dentro del cajón cerrado (ocluido); al abrir, los
    // documentos vuelan por separado desde la boca — sin duplicados.
    const shut = f.drawer < 0.02
    if (stack.current) stack.current.visible = shut
    if (manual.current) manual.current.visible = shut
  })

  return (
    <group name="DOCUMENT_MODULE">
      <Box size={[0.62, 0.86, 0.6]} position={[t.group[0], 0.43, t.group[2]]} color={c.cabinet} cast receive />
      <Box size={[0.66, 0.03, 0.64]} position={[t.group[0], 0.885, t.group[2] + 0.01]} color={c.counterBack} cast receive />
      <Box size={[0.54, 0.3, 0.02]} position={[t.group[0], 0.25, -2.41]} color={c.cabinetFront} receive />
      <Box size={[0.18, 0.018, 0.02]} position={[t.group[0], 0.33, -2.39]} color={c.fridgeHandle} roughness={0.35} metalness={0.8} />
      {/* DOCUMENT_CAVITY — boca oscura detrás del frente */}
      <group name="DOCUMENT_CAVITY">
        <Box size={[0.56, 0.3, 0.02]} position={[t.group[0], 0.62, -2.45]} color="#141318" roughness={1} />
      </group>
      <group name="DRAWER_SLIDE" ref={slide} position={[t.drawerHinge[0], t.drawerHinge[1], -2.43]}>
        {/* DRAWER_BODY — fondo + laterales + trasera */}
        <Box size={[0.5, 0.02, 0.5]} position={[0, 0.03, -0.28]} color="#4c4f57" roughness={0.8} receive />
        <Box size={[0.02, 0.12, 0.5]} position={[-0.25, 0.09, -0.28]} color="#4c4f57" roughness={0.8} />
        <Box size={[0.02, 0.12, 0.5]} position={[0.25, 0.09, -0.28]} color="#4c4f57" roughness={0.8} />
        <Box size={[0.5, 0.12, 0.02]} position={[0, 0.09, -0.52]} color="#4c4f57" roughness={0.8} />
        {/* DRAWER_FRONT */}
        <group name="DRAWER_FRONT">
          <Box size={[0.54, 0.28, 0.03]} position={[0, 0.14, 0.01]} color={c.cabinetFront} cast receive />
          <Box size={[0.18, 0.018, 0.02]} position={[0, 0.22, 0.035]} color={c.fridgeHandle} roughness={0.35} metalness={0.8} />
        </group>
        {/* DOCUMENT_STACK — DOC_01..DOC_06 apilados (existen desde el inicio) */}
        <group name="DOCUMENT_STACK" ref={stack} position={[0, 0.06, -0.28]}>
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <group key={i} name={`DOC_0${i + 1}`}>
              <mesh position={[(i % 2) * 0.01 - 0.005, i * 0.005, ((i * 7) % 3) * 0.008 - 0.008]} rotation={[0, (i * 0.06) % 0.3 - 0.15, 0]} castShadow>
                <boxGeometry args={[0.22, 0.0035, 0.3]} />
                <meshStandardMaterial color={i % 2 === 0 ? c.paper : '#d6cfbf'} roughness={0.9} />
              </mesh>
            </group>
          ))}
        </group>
        {/* MANUAL_ROOT — manual cerrado con lomo (pivote de apertura) */}
        <group name="MANUAL_ROOT" ref={manual} position={[0.12, 0.055, -0.3]}>
          <ManualCover closed />
        </group>
      </group>
    </group>
  )
}

/** Tapa del manual: pivot en el lomo. closed = dentro del cajón. */
function ManualCover({ closed, coverRef }: { closed?: boolean; coverRef?: React.Ref<THREE.Group> }) {
  return (
    <group ref={coverRef as React.Ref<THREE.Group>}>
      {/* back cover */}
      <mesh position={[0.045, 0.002, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.09, 0.004, 0.21]} />
        <meshStandardMaterial color="#8f6f44" roughness={0.85} />
      </mesh>
      {/* stack interno de páginas */}
      <mesh position={[0.042, 0.007, 0]}>
        <boxGeometry args={[0.082, 0.008, 0.2]} />
        <meshStandardMaterial color="#e2dccd" roughness={0.9} />
      </mesh>
      {/* front cover (rota sobre el lomo) */}
      <mesh position={[0.045, 0.013, 0]} castShadow>
        <boxGeometry args={[0.09, 0.004, 0.21]} />
        <meshStandardMaterial color={closed ? '#a5814f' : '#b08d55'} roughness={0.85} />
      </mesh>
      {/* spine */}
      <mesh position={[0, 0.007, 0]}>
        <boxGeometry args={[0.012, 0.018, 0.21]} />
        <meshStandardMaterial color="#6e5636" roughness={0.9} />
      </mesh>
      {!closed && <Box size={[0.17, 0.004, 0.02]} position={[0, 0.002, -0.1]} color={c.accent} roughness={0.9} />}
    </group>
  )
}

/* ------------------------------------------------------------------ */
/* Póliza con sello VENCIDO + llaves del auto (AUTO_FOB/RING/BLADE)    */
/* ------------------------------------------------------------------ */

function PolicyDocs() {
  const policyMap = useMemo(policyTexture, [])
  const stampMap = useMemo(vencidoTexture, [])
  const p = s01Geo.policy
  const g = useRef<THREE.Group>(null)
  const frame = useS01Frame()

  useFrame(() => {
    const f = frame.policy
    if (g.current && f) {
      g.current.position.set(f.p[0], f.p[1], f.p[2])
      g.current.rotation.set(f.r[0], f.r[1], f.r[2])
    }
  })

  return (
    <group>
      <group ref={g}>
        <group position={p.group} rotation={[0, p.yaw, 0]}>
          <mesh position={[0.004, 0.9175, -0.004]} rotation={[0, -0.06, 0.004]} castShadow receiveShadow>
            <boxGeometry args={[0.24, 0.004, 0.32]} />
            <meshStandardMaterial color={c.paper} roughness={0.9} />
          </mesh>
          <mesh position={[-0.003, 0.9215, 0.005]} rotation={[0, 0.1, -0.003]} castShadow receiveShadow>
            <boxGeometry args={[0.24, 0.004, 0.32]} />
            <meshStandardMaterial color="#e5dfd0" roughness={0.9} />
          </mesh>
          <mesh position={[0, 0.925, 0]} rotation={[0.002, 0, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.24, 0.004, 0.32]} />
            <meshStandardMaterial color={c.paper} roughness={0.9} map={policyMap} />
          </mesh>
          {/* sello VENCIDO impreso bajo el título: sólo legible por encuadre */}
          <group position={[p.stampX, p.stampY, p.stampZ]} rotation={[-Math.PI / 2, 0, 0]}>
            <mesh rotation={[0, 0, p.stampRot]} renderOrder={2}>
              <planeGeometry args={[p.stampSize[0], p.stampSize[1]]} />
              <meshStandardMaterial
                map={stampMap}
                transparent
                depthWrite={false}
                roughness={0.95}
                polygonOffset
                polygonOffsetFactor={-2}
              />
            </mesh>
          </group>
        </group>
      </group>
    </group>
  )
}

function CarKeys() {
  return (
    <group name="AUTO_KEYS" position={s01Geo.keys}>
      {/* AUTO_FOB — cuerpo 3D grafito, esquinas facetadas, 2 botones */}
      <group name="AUTO_FOB" rotation={[0, 0.45, 0]}>
        <mesh position={[0, 0.009, 0]} castShadow>
          <boxGeometry args={[0.062, 0.017, 0.03]} />
          <meshStandardMaterial color={c.plastic} roughness={0.45} flatShading />
        </mesh>
        <mesh position={[-0.012, 0.019, 0]}>
          <cylinderGeometry args={[0.0045, 0.0045, 0.005, 8]} />
          <meshStandardMaterial color="#4a4a52" roughness={0.4} />
        </mesh>
        <mesh position={[0.006, 0.019, 0.006]}>
          <cylinderGeometry args={[0.004, 0.004, 0.005, 8]} />
          <meshStandardMaterial color={c.accent} roughness={0.4} />
        </mesh>
      </group>
      {/* AUTO_RING */}
      <mesh name="AUTO_RING" position={[0.028, 0.006, 0.014]} rotation={[Math.PI / 2, 0, 0.3]}>
        <torusGeometry args={[0.016, 0.0024, 6, 14]} />
        <meshStandardMaterial color={c.metal} roughness={0.3} metalness={0.85} />
      </mesh>
      {/* AUTO_BLADE — hoja CORTA de auto, no llave medieval */}
      <group name="AUTO_BLADE" position={[0.062, 0, 0.036]} rotation={[0, 0.95, 0]}>
        <mesh position={[0, 0.007, 0]} castShadow>
          <boxGeometry args={[0.02, 0.012, 0.014]} />
          <meshStandardMaterial color={c.metal} roughness={0.35} metalness={0.8} />
        </mesh>
        <mesh position={[0.024, 0.004, 0]}>
          <boxGeometry args={[0.028, 0.0035, 0.006]} />
          <meshStandardMaterial color={c.metal} roughness={0.35} metalness={0.8} />
        </mesh>
        <mesh position={[0.034, -0.001, 0]}>
          <boxGeometry args={[0.006, 0.007, 0.006]} />
          <meshStandardMaterial color={c.metal} roughness={0.35} metalness={0.8} />
        </mesh>
      </group>
    </group>
  )
}

/* ------------------------------------------------------------------ */
/* Lista de compras + dos documentos secundarios sobre la isla         */
/* ------------------------------------------------------------------ */

function ShoppingList() {
  const g = useRef<THREE.Group>(null)
  const listMap = useMemo(shoppingTexture, [])
  const frame = useS01Frame()
  useFrame(() => {
    const l = frame.list
    if (g.current) {
      g.current.position.set(l.p[0], l.p[1], l.p[2])
      g.current.rotation.set(l.r[0], l.r[1], l.r[2])
    }
  })
  return (
    <group ref={g}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[0.095, 0.003, 0.13]} />
        <meshStandardMaterial color="#e8e2d2" roughness={0.9} />
      </mesh>
      {/* COMPRAS: título + 6 líneas con checks vacíos, ninguna completada */}
      <mesh position={[0, 0.0017, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.09, 0.124]} />
        <meshStandardMaterial map={listMap} roughness={0.9} polygonOffset polygonOffsetFactor={-1} />
      </mesh>
    </group>
  )
}

function LooseDocs() {
  const refs = useRef<(THREE.Group | null)[]>([])
  const frame = useS01Frame()
  useFrame(() => {
    const loose = frame.loose
    refs.current.forEach((g, i) => {
      if (!g) return
      g.position.set(loose[i].p[0], loose[i].p[1], loose[i].p[2])
      g.rotation.set(loose[i].r[0], loose[i].r[1], loose[i].r[2])
    })
  })
  return (
    <group>
      {s01Loose.map((l, i) => (
        <group
          key={i}
          ref={(el) => {
            refs.current[i] = el
          }}
        >
          <mesh castShadow receiveShadow>
            <boxGeometry args={[0.22, 0.0035, 0.3]} />
            <meshStandardMaterial color={i === 0 ? c.paper : '#d5cebe'} roughness={0.9} />
          </mesh>
          <Box size={[0.1, 0.0012, 0.005]} position={[-0.03, 0.002, 0.04]} rotation={[0, 0, 0]} color="#a39a86" roughness={0.9} />
          <Box size={[0.07, 0.0012, 0.005]} position={[-0.02, 0.002, -0.02]} rotation={[0, 0, 0]} color="#a39a86" roughness={0.9} />
        </group>
      ))}
    </group>
  )
}

/* Familia documental GARANTÍA — 6 productos, sin HELADERA.
 * Papel crema/blanco, encabezado grande + producto, microtexto.
 * Backside = mismo papel (box), nunca negro/debris. */
const WARRANTY_PRODUCTS = ['TELEVISOR', 'LAVARROPAS', 'MICROONDAS', 'AIRE ACOND.', 'CAFETERA', 'ASPIRADORA'] as const

const warrantyTexCache = new Map<string, THREE.CanvasTexture>()
function warrantyTexture(product: string) {
  const hit = warrantyTexCache.get(product)
  if (hit) return hit
  const cv = document.createElement('canvas')
  cv.width = 256
  cv.height = 340
  const ctx = cv.getContext('2d')!
  ctx.fillStyle = '#e6e0d0'
  ctx.fillRect(0, 0, 256, 340)
  ctx.fillStyle = '#2e2c26'
  ctx.font = 'bold 34px Arial, sans-serif'
  ctx.textAlign = 'center'
  ctx.fillText('GARANTÍA', 128, 52)
  ctx.font = 'bold 21px Arial, sans-serif'
  ctx.fillText(product, 128, 84)
  ctx.fillStyle = '#8d8472'
  ctx.fillRect(28, 98, 200, 3)
  ctx.fillStyle = '#a49b87'
  for (let i = 0; i < 10; i++) {
    const y = 118 + i * 18
    ctx.fillRect(28, y, i % 3 === 2 ? 100 : 200, 5)
  }
  ctx.fillStyle = '#8d8472'
  ctx.fillRect(28, 310, 120, 4)
  const tex = new THREE.CanvasTexture(cv)
  tex.colorSpace = THREE.SRGBColorSpace
  warrantyTexCache.set(product, tex)
  return tex
}

function shoppingTexture() {
  const cv = document.createElement('canvas')
  cv.width = 128
  cv.height = 176
  const ctx = cv.getContext('2d')!
  ctx.fillStyle = '#e8e2d2'
  ctx.fillRect(0, 0, 128, 176)
  ctx.fillStyle = '#2e2c26'
  ctx.font = 'bold 22px Arial, sans-serif'
  ctx.textAlign = 'center'
  ctx.fillText('COMPRAS', 64, 30)
  ctx.strokeStyle = '#6d675a'
  ctx.lineWidth = 2
  for (let i = 0; i < 6; i++) {
    const y = 52 + i * 20
    ctx.strokeRect(10, y - 11, 12, 12)
    ctx.fillStyle = '#a09884'
    ctx.fillRect(28, y - 6, 88 - (i % 3) * 12, 5)
    ctx.fillStyle = '#6d675a'
  }
  const tex = new THREE.CanvasTexture(cv)
  tex.colorSpace = THREE.SRGBColorSpace
  return tex
}

function DocSheet({ variant, index }: { variant: 0 | 1 | 2; index: number }) {
  const tone = index % 2 === 0 ? '#e6e0d0' : '#d6cfbf'
  const narrow = variant === 1
  const w = narrow ? 0.12 : 0.22
  // V5.1 §12: variación de espesor por hoja (papel crema, nada perfecto).
  const thick = 0.003 + (index % 3) * 0.0008
  // DOC_00..05 = garantías protagonistas con textura GARANTÍA+PRODUCTO.
  const product = index < 6 ? WARRANTY_PRODUCTS[index] : null
  const topMap = product ? warrantyTexture(product) : null
  return (
    <group>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[w, thick, 0.3]} />
        <meshStandardMaterial color={tone} roughness={0.9} />
      </mesh>
      {topMap && (
        <mesh position={[0, 0.0021, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[w * 0.94, 0.28]} />
          <meshStandardMaterial map={topMap} roughness={0.9} polygonOffset polygonOffsetFactor={-1} />
        </mesh>
      )}
      {/* esquina con micro-curl determinista (no plano perfecto) */}
      <mesh position={[w / 2 - 0.02, 0.002, 0.13]} rotation={[0, 0, index % 2 === 0 ? 0.045 : -0.04]} castShadow>
        <boxGeometry args={[0.05, 0.002, 0.045]} />
        <meshStandardMaterial color={tone} roughness={0.9} />
      </mesh>
      {variant === 0 && (
        <>
          <Box size={[0.09, 0.0015, 0.014]} position={[-0.04, 0.002, -0.11]} color="#8d8472" roughness={0.9} />
          <Box size={[0.14, 0.0012, 0.004]} position={[-0.02, 0.002, -0.05]} color="#a39a86" roughness={0.9} />
          <Box size={[0.14, 0.0012, 0.004]} position={[-0.02, 0.002, -0.01]} color="#a39a86" roughness={0.9} />
          <Box size={[0.09, 0.0012, 0.004]} position={[-0.045, 0.002, 0.03]} color="#a39a86" roughness={0.9} />
          <Box size={[0.012, 0.0012, 0.012]} position={[0.07, 0.002, -0.05]} color="#8d8472" roughness={0.9} />
        </>
      )}
      {variant === 1 && (
        <>
          <Box size={[0.07, 0.0015, 0.01]} position={[0, 0.002, -0.11]} color="#8d8472" roughness={0.9} />
          <Box size={[0.08, 0.0012, 0.004]} position={[0, 0.002, -0.04]} color="#a39a86" roughness={0.9} />
          <Box size={[0.06, 0.0012, 0.004]} position={[-0.01, 0.002, 0.0]} color="#a39a86" roughness={0.9} />
          <Box size={[0.08, 0.0012, 0.004]} position={[0, 0.002, 0.05]} color="#a39a86" roughness={0.9} />
        </>
      )}
      {variant === 2 && (
        <>
          <Box size={[0.12, 0.0015, 0.012]} position={[-0.03, 0.002, -0.1]} color="#8d8472" roughness={0.9} />
          <Box size={[0.15, 0.0012, 0.004]} position={[-0.015, 0.002, 0.0]} color="#a39a86" roughness={0.9} />
          <Box size={[0.11, 0.0012, 0.004]} position={[-0.035, 0.002, 0.06]} color="#a39a86" roughness={0.9} />
        </>
      )}
    </group>
  )
}

function FlyingManual() {
  const cover = useRef<THREE.Group>(null)
  const frame = useS01Frame()
  useFrame(() => {
    if (cover.current) cover.current.rotation.y = frame.manualCover
  })
  return (
    <group>
      {/* base / back cover + páginas */}
      <mesh position={[-0.037, 0, 0.004]} rotation={[0, 0.07, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.082, 0.005, 0.21]} />
        <meshStandardMaterial color="#d9d3c3" roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.004, 0]}>
        <boxGeometry args={[0.012, 0.014, 0.21]} />
        <meshStandardMaterial color="#6e5636" roughness={0.9} />
      </mesh>
      {/* front cover con pivote en el lomo */}
      <group position={[0.006, 0.004, 0]} ref={cover}>
        <mesh position={[0.037, 0, 0.004]} rotation={[0, -0.07, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.082, 0.005, 0.21]} />
          <meshStandardMaterial color="#e2dccd" roughness={0.9} />
        </mesh>
      </group>
      <Box size={[0.17, 0.004, 0.02]} position={[0, 0.001, -0.1]} color={c.accent} roughness={0.9} />
    </group>
  )
}

function DispersedDocs() {
  const refs = useRef<(THREE.Group | null)[]>([])
  const frame = useS01Frame()
  useFrame(() => {
    const docs = frame.docs
    refs.current.forEach((g, i) => {
      if (!g) return
      const d = docs[i]
      g.visible = d.v > 0.5
      if (!g.visible) return
      g.position.set(d.p[0], d.p[1], d.p[2])
      g.rotation.set(d.r[0], d.r[1], d.r[2])
    })
  })
  return (
    <group>
      {s01Docs.map((spec, i) => (
        <group
          key={i}
          visible={false}
          ref={(el) => {
            refs.current[i] = el
          }}
        >
          {spec.manual ? <FlyingManual /> : <DocSheet variant={(i % 3) as 0 | 1 | 2} index={i} />}
        </group>
      ))}
    </group>
  )
}

/* ------------------------------------------------------------------ */
/* Humo: 5 puffs low-poly, una sola emisión, muere a 0 (regla absoluta) */
/* ------------------------------------------------------------------ */

function SmokePuffs() {
  const refs = useRef<(THREE.Mesh | null)[]>([])
  const frame = useS01Frame()
  useFrame(() => {
    const smoke = frame.smoke
    refs.current.forEach((m, i) => {
      if (!m) return
      const s = smoke[i]
      const mat = m.material as THREE.MeshStandardMaterial
      mat.opacity = Math.min(s.o, 0.28)
      m.visible = s.o > 0.004
      if (!m.visible) return
      m.position.set(s.p[0], s.p[1], s.p[2])
      m.scale.setScalar(Math.max(s.s, 0.001))
    })
  })
  return (
    <group>
      {s01Smoke.map((s, i) => (
        <mesh
          key={i}
          visible={false}
          renderOrder={5}
          ref={(el) => {
            refs.current[i] = el
          }}
        >
          <icosahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color="#5f6878"
            transparent
            opacity={0}
            depthWrite={false}
            flatShading
            roughness={1}
          />
        </mesh>
      ))}
    </group>
  )
}

/* ------------------------------------------------------------------ */
/* ALIMENTOS V5.1 §3/§8 — cuatro props con estado independiente.         */
/* Render en espacio mundo desde el director (sin reparent: la fase       */
/* adosada usa la misma matemática de bisagra; la fase libre es           */
/* determinista; reverse e interruption convergen sin saltos).             */
/* ------------------------------------------------------------------ */

function FridgeFoods() {
  const apple = useRef<THREE.Group>(null)
  const water = useRef<THREE.Group>(null)
  const eggA = useRef<THREE.Group>(null)
  const eggB = useRef<THREE.Group>(null)
  const frame = useS01Frame()
  useFrame(() => {
    const f = frame
    if (apple.current) {
      apple.current.position.set(f.apple.p[0], f.apple.p[1], f.apple.p[2])
      apple.current.rotation.set(f.apple.r[0], f.apple.r[1], f.apple.r[2])
    }
    if (water.current) {
      water.current.position.set(f.water.p[0], f.water.p[1], f.water.p[2])
      water.current.rotation.set(f.water.r[0], f.water.r[1], f.water.r[2])
    }
    if (eggA.current) {
      eggA.current.position.set(f.eggA.p[0], f.eggA.p[1], f.eggA.p[2])
      eggA.current.rotation.set(f.eggA.r[0], f.eggA.r[1], f.eggA.r[2])
    }
    if (eggB.current) {
      eggB.current.position.set(f.eggB.p[0], f.eggB.p[1], f.eggB.p[2])
      eggB.current.rotation.set(f.eggB.r[0], f.eggB.r[1], f.eggB.r[2])
    }
  })
  return (
    <group>
      {/* FRIDGE_APPLE — manzana roja facetada + tallito + hoja discreta */}
      <group name="FRIDGE_APPLE" ref={apple}>
        <mesh castShadow>
          <icosahedronGeometry args={[0.045, 1]} />
          <meshStandardMaterial color="#b03a2e" roughness={0.55} flatShading />
        </mesh>
        <mesh position={[0, 0.05, 0]} castShadow>
          <cylinderGeometry args={[0.004, 0.005, 0.03, 5]} />
          <meshStandardMaterial color="#5d4a2f" roughness={0.9} flatShading />
        </mesh>
        <mesh position={[0.014, 0.055, 0]} rotation={[0, 0, -0.5]}>
          <boxGeometry args={[0.03, 0.004, 0.014]} />
          <meshStandardMaterial color="#4e6b3f" roughness={0.85} flatShading />
        </mesh>
      </group>
      {/* FRIDGE_WATER — botella low-poly, plástico translúcido controlado,
          tapa azul grisácea, agua visual a media altura */}
      <group name="FRIDGE_WATER" ref={water}>
        <mesh position={[0, 0, 0]} castShadow>
          <cylinderGeometry args={[0.035, 0.035, 0.14, 7]} />
          <meshStandardMaterial color="#cfd9e2" transparent opacity={0.45} roughness={0.15} metalness={0} flatShading depthWrite={false} />
        </mesh>
        <mesh position={[0, -0.035, 0]}>
          <cylinderGeometry args={[0.031, 0.031, 0.06, 7]} />
          <meshStandardMaterial color="#7fa3c0" transparent opacity={0.75} roughness={0.1} flatShading depthWrite={false} />
        </mesh>
        <mesh position={[0, 0.085, 0]} castShadow>
          <cylinderGeometry args={[0.014, 0.014, 0.035, 6]} />
          <meshStandardMaterial color="#cfd9e2" transparent opacity={0.45} roughness={0.15} flatShading depthWrite={false} />
        </mesh>
        <mesh position={[0, 0.108, 0]} castShadow>
          <cylinderGeometry args={[0.016, 0.016, 0.022, 6]} />
          <meshStandardMaterial color="#5a6b7d" roughness={0.5} flatShading />
        </mesh>
      </group>
      {/* FRIDGE_EGG_A/B — huevos marfil facetados, mate */}
      <group name="FRIDGE_EGG_A" ref={eggA}>
        <mesh scale={[1, 1.3, 1]} castShadow>
          <icosahedronGeometry args={[0.028, 1]} />
          <meshStandardMaterial color="#e8e0cd" roughness={0.85} flatShading />
        </mesh>
      </group>
      <group name="FRIDGE_EGG_B" ref={eggB}>
        <mesh scale={[1, 1.3, 1]} castShadow>
          <icosahedronGeometry args={[0.028, 1]} />
          <meshStandardMaterial color="#e3dbc6" roughness={0.85} flatShading />
        </mesh>
      </group>
    </group>
  )
}

/* ------------------------------------------------------------------ */
/* PHONE HERO — PHONE_WORLD → PHONE_RIG → CHASSIS/BEZEL/GLASS/SCREEN /  */
/* BUTTONS. Face-up, top al fondo, yaw 8°. Screen = mesh independiente */
/* negro apagado todo S01 (básico, sin tone mapping: negro garantizado) */
/* Anchors A_PHONE_SCREEN_* para debug y futuro handoff S02.           */
/* ------------------------------------------------------------------ */

function Phone() {
  const p = s01Geo.phone
  const [bw, bh, bd] = p.bodySize
  const [sw, sd] = p.screenSize
  const screenY = bh / 2 + 0.0006
  const clearW = bw * s01PhoneClearZone.w
  const clearH = bd * s01PhoneClearZone.h
  // Override V6.0: Home en un plano a 0.1mm sobre la cara +Y (misma
  // geometría/UV/rig: el box negro original queda intacto debajo y la única
  // superficie VISIBLE es el plano. Plano: v-up → top físico (−z), u → +x,
  // sin espejos ni rotaciones (flipY estándar). Decisión documentada en V6.0:
  // se evita cirugía UV sobre la geometría compartida de S01.
  const ov = useContext(S01OverrideContext)
  const screenMesh = useRef<THREE.Mesh>(null)
  const screenMat = useRef<THREE.MeshBasicMaterial>(null)
  useFrame(() => {
    if (!ov?.screenMap || !screenMat.current) return
    const b = Math.max(ov.live.screenBrightness, 0)
    screenMat.current.color.setScalar(Math.max(b, 0.0001))
    if (screenMesh.current) screenMesh.current.visible = b > 0.003
  })
  return (
    <group name="PHONE_WORLD" position={p.group}>
      <group name="PHONE_RIG" rotation={[0, p.yaw, 0]}>
        {/* PHONE_CHASSIS — cuerpo fino grafito + faceta inferior (bevel) */}
        <group name="PHONE_CHASSIS">
          <mesh castShadow receiveShadow>
            <boxGeometry args={[bw, bh, bd]} />
            <meshStandardMaterial color="#33353b" roughness={0.32} metalness={0.72} flatShading />
          </mesh>
          <mesh position={[0, -bh / 2 + 0.0008, 0]}>
            <boxGeometry args={[bw * 0.96, 0.0016, bd * 0.985]} />
            <meshStandardMaterial color="#26272c" roughness={0.4} metalness={0.6} flatShading />
          </mesh>
        </group>
        {/* PHONE_BEZEL — marco pequeño alrededor del screen */}
        <group name="PHONE_BEZEL">
          <Box size={[bw, 0.0012, (bd - sd) / 2]} position={[0, bh / 2 + 0.0002, (sd + bd) / 4]} color="#1c1d21" roughness={0.4} metalness={0.5} />
          <Box size={[bw, 0.0012, (bd - sd) / 2]} position={[0, bh / 2 + 0.0002, -(sd + bd) / 4]} color="#1c1d21" roughness={0.4} metalness={0.5} />
          <Box size={[(bw - sw) / 2, 0.0012, sd]} position={[(sw + bw) / 4, bh / 2 + 0.0002, 0]} color="#1c1d21" roughness={0.4} metalness={0.5} />
          <Box size={[(bw - sw) / 2, 0.0012, sd]} position={[-(sw + bw) / 4, bh / 2 + 0.0002, 0]} color="#1c1d21" roughness={0.4} metalness={0.5} />
        </group>
        {/* PHONE_GLASS — sólo filo perimetral mate (sin highlights sobre el screen) */}
        <group name="PHONE_GLASS">
          <Box size={[bw + 0.0008, 0.0008, 0.0012]} position={[0, bh / 2 + 0.0004, bd / 2]} color="#232428" roughness={0.65} metalness={0.2} />
          <Box size={[bw + 0.0008, 0.0008, 0.0012]} position={[0, bh / 2 + 0.0004, -bd / 2]} color="#232428" roughness={0.65} metalness={0.2} />
        </group>
        {/* PHONE_SCREEN — mesh independiente, APAGADA todo S01.
            V6.0: con override.screenMap un plano muestra Home 0.1mm sobre la
            cara +Y (el box negro original no se toca; una sola superficie
            visible, sin z-fighting: 0.1mm ≫ precisión de depth a 5cm). */}
        <group name="PHONE_SCREEN">
          <mesh position={[0, screenY, 0]} receiveShadow>
            <boxGeometry args={[sw, 0.0012, sd]} />
            <meshBasicMaterial color="#000000" toneMapped={false} />
          </mesh>
          {ov?.screenMap && (
            <mesh ref={screenMesh} position={[0, screenY + 0.0007, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <planeGeometry args={[sw, sd]} />
              <meshBasicMaterial ref={screenMat} map={ov.screenMap} toneMapped={false} />
            </mesh>
          )}
          {/* anchors del plano de pantalla (handoff S02 + QA angular) */}
          <group name="A_PHONE_SCREEN" position={[0, screenY, 0]} />
          <group name="A_PHONE_SCREEN_TOP" position={[0, screenY, -sd / 2]} />
          <group name="A_PHONE_SCREEN_BOTTOM" position={[0, screenY, sd / 2]} />
          <group name="A_PHONE_SCREEN_LEFT" position={[-sw / 2, screenY, 0]} />
          <group name="A_PHONE_SCREEN_RIGHT" position={[sw / 2, screenY, 0]} />
        </group>
        {/* PHONE_BUTTONS — laterales + sensor/speaker mínimo */}
        <group name="PHONE_BUTTONS">
          <Box size={[0.0016, 0.003, 0.02]} position={[bw / 2 + 0.0006, 0, 0.02]} color="#4a4d55" roughness={0.35} metalness={0.8} />
          <Box size={[0.0016, 0.003, 0.012]} position={[bw / 2 + 0.0006, 0, -0.025]} color="#4a4d55" roughness={0.35} metalness={0.8} />
          <Box size={[0.0016, 0.0025, 0.008]} position={[-bw / 2 - 0.0006, 0, 0.01]} color="#4a4d55" roughness={0.35} metalness={0.8} />
        </group>
        <mesh position={[0, screenY + 0.0004, -sd / 2 - 0.004]}>
          <cylinderGeometry args={[0.0022, 0.0022, 0.0008, 10]} />
          <meshStandardMaterial color="#0c0d10" roughness={0.3} metalness={0.4} />
        </mesh>
        {/* PHONE_CLEAR_ZONE — sólo debug (?s01RigDebug=1) */}
        <group name="PHONE_CLEAR_ZONE" visible={false}>
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.012, 0]}>
            <planeGeometry args={[clearW, clearH]} />
            <meshBasicMaterial color="#c97f3d" transparent opacity={0.14} depthWrite={false} side={THREE.DoubleSide} />
          </mesh>
        </group>
      </group>
    </group>
  )
}

/* ------------------------------------------------------------------ */
/* Debug de rig (?s01RigDebug=1): hinges, drawer axis, screen frame.    */
/* ------------------------------------------------------------------ */

function RigDebug() {
  const show = useMemo(() => {
    if (typeof window === 'undefined') return false
    return new URLSearchParams(window.location.search).get('s01RigDebug') === '1'
  }, [])
  useFrame(() => {
    if (!show) return
    s01Director.frame // keep demand loop honest in debug
  })
  if (!show) return null
  const p = s01Geo.pantry
  return (
    <group>
      {(['leafA_L', 'leafA_R', 'leafB_R'] as const).map((k) => (
        <mesh key={k} position={[p[k].hingeX, p.y, p.doorZ + 0.1]}>
          <cylinderGeometry args={[0.008, 0.008, 0.8, 6]} />
          <meshBasicMaterial color="#ff5a5a" toneMapped={false} />
        </mesh>
      ))}
      {/* drawer axis */}
      <mesh position={[0.85, 0.62, -2.2]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.006, 0.006, 0.5, 6]} />
        <meshBasicMaterial color="#5ac8ff" toneMapped={false} />
      </mesh>
      {/* phone screen normal + up */}
      <mesh position={[s01Geo.phone.group[0], s01Geo.phone.group[1] + 0.15, s01Geo.phone.group[2]]}>
        <cylinderGeometry args={[0.005, 0.005, 0.2, 6]} />
        <meshBasicMaterial color="#7dff8a" toneMapped={false} />
      </mesh>
    </group>
  )
}

export default function S01CinematicProps({ override = null }: { override?: S01FinalOverride | null }) {
  return (
    <S01FinalScope override={override}>
      <group>
        <PantryRoot />
        <Fridge />
        <FridgeFoods />
        <DocSector />
        <PolicyDocs />
        <CarKeys />
        <ShoppingList />
        <LooseDocs />
        <DispersedDocs />
        <SmokePuffs />
        <Phone />
        <RigDebug />
      </group>
    </S01FinalScope>
  )
}
