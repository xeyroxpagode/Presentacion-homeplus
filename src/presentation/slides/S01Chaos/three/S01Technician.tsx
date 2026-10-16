import * as THREE from 'three'
import { s01ServicePanel, s01Technician } from './s01CinematicConfig'

/* S01 TÉCNICO V6.2 Lote 1 — figura procedural low-poly PS1, pose P0 horneada.
 *
 * DECISIÓN (T0): el GLB Kenney del contrato no existe en el repo
 * (assets/technician/characterMedium.glb ausente; sin TechnicianGLB/Rig).
 * Se construye un rig procedural en unidades metro 1:1 con UN único nodo
 * de escala (TECH_SCALE=1, sin doble escala importador+root) y materiales
 * mates de la paleta S01. Causa raíz del modo "gigante/flotante" de V6.1
 * eliminada por construcción: no hay bind pose ni conversión FBZ/GLB.
 *
 * T1 — altura de pie nominal 1.75 m (cadera 0.95 + torso 0.55 + cabeza 0.25).
 * T2 — semiarrodillado: rodilla derecha + pie derecho extendido atrás,
 *      pie izquierdo plano adelante, pelvis [0.80,0.55,-2.10], torso ~25°.
 * T3 — rodilla (fondo 3 mm) y pie izquierdo (suela 5 mm) sobre Y=0.
 * T4 — al oeste de la heladera, fuera del barrido de la puerta inferior
 *      (la hoja a 62° no baja de x=1.63; el técnico no pasa de x=1.31).
 * T5 — mano izquierda apoyada en el borde de la cubierta (contacto 0.5 mm).
 * T6 — destornillador en ToolSocket; punta EXACTA sobre SERVICE_SCREW.
 *
 * Lote 2 (pendiente): ciclo P1 de giros + inspector temporal T9.
 */

type Vec3 = [number, number, number]

const SKIN = '#c9a184'
const SHIRT = '#5a6b6e'
const PANTS = '#3a3f4a'
const SHOE = '#2e2a26'
const HAIR = '#2a2420'
const TOOL_GRIP = '#8a3b2e'
const TOOL_SHAFT = '#b9bdc4'

const V = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z)

/** Segmento óseo/tejido entre dos puntos (pose horneada, sin IK). */
function Limb({
  from,
  to,
  w,
  color,
  roughness = 0.95,
  metalness = 0,
  cyl = false,
  r = 0.01,
  seg = 8,
}: {
  from: Vec3
  to: Vec3
  w: number
  color: string
  roughness?: number
  metalness?: number
  cyl?: boolean
  r?: number
  seg?: number
}) {
  const a = V(...from)
  const b = V(...to)
  const d = b.clone().sub(a)
  const len = d.length()
  const mid = a.clone().add(b).multiplyScalar(0.5)
  const q = new THREE.Quaternion().setFromUnitVectors(V(0, 1, 0), d.normalize())
  return (
    <mesh position={mid.toArray()} quaternion={q} castShadow receiveShadow>
      {cyl ? (
        <cylinderGeometry args={[r, r, len, seg]} />
      ) : (
        <boxGeometry args={[w, len, w]} />
      )}
      <meshStandardMaterial color={color} roughness={roughness} metalness={metalness} flatShading />
    </mesh>
  )
}

function ClothBox({
  size,
  position,
  rotation,
  color,
  roughness = 0.95,
}: {
  size: Vec3
  position: Vec3
  rotation?: Vec3
  color: string
  roughness?: number
}) {
  return (
    <mesh position={position} rotation={rotation} castShadow receiveShadow>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} roughness={roughness} flatShading />
    </mesh>
  )
}

/* Geometría de la herramienta (coords locales al anchor del técnico).
 * G = grip (mano derecha), S = punta = screwTip del panel. */
const G: Vec3 = [0.425, 0.55, 0.0]
const S: Vec3 = [0.5, 0.55, -0.04]
const _gd = V(...S).sub(V(...G))
const _glen = _gd.length()
const _gn = _gd.clone().divideScalar(_glen)
const _ga = V(...G).addScaledVector(_gn, -0.075).toArray() as unknown as Vec3
const _gb = V(...G).addScaledVector(_gn, 0.015).toArray() as unknown as Vec3

export default function S01Technician() {
  return (
    <group name="TECHNICIAN_ROOT" position={s01Technician.root}>
      {/* T1.2 — un único nodo de escala controlada (factor 1: rig ya en metros). */}
      <group name="TECH_SCALE" scale={1}>
        {/* T1.3 — frente anatómico +x; orientación fijada acá, no en huesos. */}
        <group name="TECH_ORIENT">
          {/* Pelvis + torso inclinado ~25° hacia el panel (+x). */}
          <ClothBox size={[0.3, 0.2, 0.28]} position={[0, 0.55, 0]} rotation={[0, 0, -0.12]} color={PANTS} />
          <ClothBox size={[0.26, 0.42, 0.3]} position={[0.15, 0.75, 0]} rotation={[0, 0, -0.45]} color={SHIRT} />
          <ClothBox size={[0.16, 0.12, 0.34]} position={[0.26, 0.9, 0]} rotation={[0, 0, -0.45]} color={SHIRT} />

          {/* Cabeza: inclinada abajo hacia el tornillo, sin mentón-pecho. */}
          <ClothBox size={[0.07, 0.09, 0.07]} position={[0.3, 0.99, 0]} rotation={[0, 0, -0.5]} color={SKIN} roughness={0.9} />
          <ClothBox size={[0.17, 0.2, 0.16]} position={[0.35, 1.12, 0]} rotation={[0, 0, -0.5]} color={SKIN} roughness={0.9} />
          <ClothBox size={[0.18, 0.07, 0.17]} position={[0.325, 1.205, 0]} rotation={[0, 0, -0.5]} color={HAIR} />
          <ClothBox size={[0.012, 0.03, 0.1]} position={[0.438, 1.13, 0]} rotation={[0, 0, -0.5]} color={HAIR} roughness={0.9} />

          {/* Pierna derecha: muslo → RODILLA EN SUELO → pantorrilla → pie extendido.
              (Extremos a y≥0.062 con w≤0.13: ningún vértice bajo Y=0.) */}
          <Limb from={[0, 0.52, 0.12]} to={[-0.12, 0.075, 0.14]} w={0.13} color={PANTS} />
          <Limb from={[-0.12, 0.075, 0.14]} to={[-0.4, 0.062, 0.15]} w={0.11} color={PANTS} />
          {/* Rodillera: fondo a 3 mm de Y=0 (T3). */}
          <ClothBox size={[0.13, 0.11, 0.13]} position={[-0.12, 0.058, 0.14]} color={PANTS} />
          <ClothBox size={[0.16, 0.06, 0.09]} position={[-0.44, 0.033, 0.15]} color={SHOE} roughness={0.9} />

          {/* Pierna izquierda: cadera → rodilla adelantada/elevada → pie PLANO. */}
          <Limb from={[0, 0.52, -0.12]} to={[0.2, 0.34, -0.16]} w={0.135} color={PANTS} />
          <Limb from={[0.2, 0.32, -0.16]} to={[0.22, 0.08, -0.18]} w={0.11} color={PANTS} />
          {/* Calzado: suela a 5 mm de Y=0 (T3). */}
          <ClothBox size={[0.24, 0.07, 0.1]} position={[0.22, 0.04, -0.18]} color={SHOE} roughness={0.9} />

          {/* Brazo izquierdo: hombro → codo → muñeca → PALMA EN PANEL. */}
          <Limb from={[0.26, 0.88, -0.13]} to={[0.36, 0.66, -0.17]} w={0.09} color={SHIRT} />
          <Limb from={[0.36, 0.66, -0.17]} to={[0.485, 0.53, -0.19]} w={0.075} color={SKIN} roughness={0.9} />
          <ClothBox size={[0.025, 0.09, 0.1]} position={[0.498, 0.5, -0.19]} color={SKIN} roughness={0.9} />

          {/* Brazo derecho: hombro → codo → muñeca → mano en el mango. */}
          <Limb from={[0.26, 0.88, 0.13]} to={[0.34, 0.64, 0.11]} w={0.09} color={SHIRT} />
          <Limb from={[0.34, 0.64, 0.11]} to={[0.41, 0.56, 0.01]} w={0.075} color={SKIN} roughness={0.9} />
          <ClothBox size={[0.1, 0.055, 0.065]} position={G} rotation={[0, 0.47, 0]} color={SKIN} roughness={0.9} />

          {/* T6 — herramienta vinculada al ToolSocket (no al root). */}
          <group name="ToolSocket" position={G}>
            <Limb from={_ga.map((v, i) => v - G[i]) as unknown as Vec3} to={_gb.map((v, i) => v - G[i]) as unknown as Vec3} w={0} color={TOOL_GRIP} roughness={0.7} cyl r={0.017} seg={8} />
            <Limb from={_gb.map((v, i) => v - G[i]) as unknown as Vec3} to={S.map((v, i) => v - G[i]) as unknown as Vec3} w={0} color={TOOL_SHAFT} roughness={0.35} metalness={0.7} cyl r={0.006} seg={6} />
          </group>

          {/* Anclajes T2/T6 (QA e inspector). */}
          <group name="RIGHT_KNEE_CONTACT" position={[-0.12, 0.003, 0.14]} />
          <group name="LEFT_FOOT_CONTACT" position={[0.22, 0.005, -0.18]} />
          <group name="LEFT_HAND_PANEL_CONTACT" position={[0.51, 0.5, -0.19]} />
          <group name="TOOL_TIP_TARGET" position={S} />

          {/* Sombras de contacto (no sustituyen el contacto físico T3). */}
          {[
            { p: [-0.12, 0.002, 0.14] as Vec3, r: 0.13 },
            { p: [0.22, 0.002, -0.18] as Vec3, r: 0.17 },
            { p: [-0.44, 0.002, 0.15] as Vec3, r: 0.11 },
          ].map((b, i) => (
            <mesh key={i} position={b.p} rotation={[-Math.PI / 2, 0, 0]}>
              <circleGeometry args={[b.r, 20]} />
              <meshBasicMaterial color="#000000" transparent opacity={0.32} depthWrite={false} />
            </mesh>
          ))}
        </group>
      </group>
    </group>
  )
}

/* Métricas analíticas del Lote 1 (mundo; verificables en captura):
 * - Rodilla: fondo de rodillera y=0.003 (3 mm, ideal 0–5 mm).
 * - Pie izq.: suela y=0.005 (5 mm, ideal 0–5 mm).
 * - Palma izq.: cara a 0.5 mm de la cubierta (x 1.3105 vs 1.311).
 * - Punta: EXACTA sobre screwTip (distancia 0.000 m, GATE ≤ 0.02 m).
 * - Puerta inferior a 62°: x mínima 1.63 > 1.31 (sin intersección).
 */
const _tipWorld = V(...s01Technician.root).add(V(...S))
export const TECH_CONTACTS = {
  kneeGap: 0.003,
  footGap: 0.005,
  palmGap: 0.0005,
  tipDistance: _tipWorld.distanceTo(V(...s01ServicePanel.screwTip)),
}
