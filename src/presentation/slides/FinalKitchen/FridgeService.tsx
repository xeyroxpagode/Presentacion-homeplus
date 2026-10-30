// FINAL KITCHEN V6.0 — servicio de heladera: cubierta, tornillos,
// destornillador suelto (reserva) y caja de herramientas (S3B).
// La herramienta EN MANO vive en TechnicianRig (ToolSocket). Todo estático
// salvo el brazo del técnico: panel, tornillos y caja no se mueven.

import { FRIDGE_SERVICE } from './finalGeometry'
import { RoundedBox } from '@react-three/drei'

const PANEL = '#9aa0a8'
const PANEL_DARK = '#6e747c'
const SCREW = '#c7ccd2'
const TOOLBOX = '#35485e'
const TOOLBOX_LID = '#2b3c4f'

function ServicePanel() {
  const [cx, cy, cz] = FRIDGE_SERVICE.panelCenter
  const [w, h] = FRIDGE_SERVICE.panelSize
  return (
    <group name="FRIDGE_SERVICE_PANEL" position={[cx, cy, cz]}>
      {/* cubierta adaptada al zócalo (no tapa bisagras ni puerta) */}
      <RoundedBox args={FRIDGE_SERVICE.panelSize} radius={0.012} smoothness={3} castShadow receiveShadow>
        <meshStandardMaterial color={PANEL} roughness={0.48} metalness={0.42} />
      </RoundedBox>
      {/* dos fijaciones visibles (esquinas superiores) */}
      <mesh position={[-w / 2 + 0.03, h / 2 - 0.03, FRIDGE_SERVICE.panelSize[2] / 2]}>
        <cylinderGeometry args={[0.004, 0.004, 0.006, 6]} />
        <meshStandardMaterial color={SCREW} roughness={0.3} metalness={0.85} />
      </mesh>
      <mesh position={[w / 2 - 0.03, h / 2 - 0.03, FRIDGE_SERVICE.panelSize[2] / 2]}>
        <cylinderGeometry args={[0.004, 0.004, 0.006, 6]} />
        <meshStandardMaterial color={SCREW} roughness={0.3} metalness={0.85} />
      </mesh>
      {/* ranura de ventilación (detalle de material, sin relieve móvil) */}
      {[-0.04, 0, 0.04].map((dy, i) => (
        <mesh key={i} position={[0, -h / 2 + 0.05 + dy, FRIDGE_SERVICE.panelSize[2] / 2 + 0.0005]}>
          <boxGeometry args={[w * 0.7, 0.008, 0.001]} />
          <meshStandardMaterial color={PANEL_DARK} roughness={0.7} />
        </mesh>
      ))}
      {/* TORNILLO OBJETIVO (serviceScrew): el gesto apunta aquí */}
      <group name="SERVICE_SCREW" position={[FRIDGE_SERVICE.screw[0] - cx, FRIDGE_SERVICE.screw[1] - cy, FRIDGE_SERVICE.screw[2] - cz]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.004, 0.004, 0.008, 6]} />
          <meshStandardMaterial color={SCREW} roughness={0.3} metalness={0.85} />
        </mesh>
        <mesh position={[0, 0, 0.0044]}>
          <boxGeometry args={[0.0055, 0.0012, 0.001]} />
          <meshStandardMaterial color={PANEL_DARK} roughness={0.55} metalness={0.5} />
        </mesh>
      </group>
    </group>
  )
}

function Toolbox() {
  const [x, , z] = FRIDGE_SERVICE.toolbox
  return (
    <group name="TOOLBOX" position={[x, 0, z]} rotation={[0, -0.3, 0]}>
      {/* cuerpo */}
      <RoundedBox args={[0.35, 0.16, 0.2]} radius={0.025} smoothness={3} position={[0, 0.09, 0]} castShadow receiveShadow>
        <meshStandardMaterial color={TOOLBOX} roughness={0.82} />
      </RoundedBox>
      {/* tapa + asa sencilla */}
      <RoundedBox args={[0.35, 0.035, 0.2]} radius={0.012} smoothness={3} position={[0, 0.175, 0]} castShadow>
        <meshStandardMaterial color={TOOLBOX_LID} roughness={0.82} />
      </RoundedBox>
      <mesh position={[0, 0.2, 0]}>
        <torusGeometry args={[0.05, 0.01, 5, 8, Math.PI]} />
        <meshStandardMaterial color={TOOLBOX_LID} roughness={0.85} flatShading />
      </mesh>
      {/* cierre frontal */}
      <mesh position={[0, 0.14, 0.101]}>
        <boxGeometry args={[0.05, 0.04, 0.006]} />
        <meshStandardMaterial color={SCREW} roughness={0.4} metalness={0.7} />
      </mesh>
    </group>
  )
}

export default function FridgeService() {
  return (
    <group>
      <ServicePanel />
      <Toolbox />
    </group>
  )
}
