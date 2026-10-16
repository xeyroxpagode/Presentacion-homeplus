// FINAL KITCHEN V6.0 — rig procedural articulado del técnico (S3B).
// PLACEHOLDER DECLARADO: sin GLB CC0 verificable en este entorno, personaje
// low-poly con las articulaciones semánticas del contrato (pelvis, spine,
// chest, neck, head, brazos, piernas, ToolSocket en mano derecha).
// La jerarquía (yaw→pitch, offsets) replica EXACTAMENTE la matemática de
// TechnicianAnimation.ts: la pose del clip horneado cae sin conversión.
// Sin ojos/boca/parpadeo. Inmóvil salvo el gesto (piernas siempre fijas).

import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { TECHNICIAN } from './finalGeometry'
import type { JointPose } from './TechnicianAnimation'
import { POSE_P0 } from './TechnicianAnimation'

export type TechRigApi = {
  setPose: (p: JointPose) => void
  setVisible: (v: boolean) => void
}

const COVER = '#2f3b52'
const COVER_DARK = '#28334a'
const SKIN = '#c9a186'
const BOOT = '#26262a'
const CAP = '#1f2733'
const TOOL_RED = '#8c2f2f'
const TOOL_STEEL = '#b9bfc7'

function Limb({ r, len, color }: { r: number; len: number; color: string }) {
  return (
    <group>
      <mesh position={[0, -len / 2, 0]} castShadow>
        <cylinderGeometry args={[r, r * 0.88, len, 6]} />
        <meshStandardMaterial color={color} roughness={0.9} flatShading />
      </mesh>
    </group>
  )
}

export default function TechnicianRig({ apiRef }: { apiRef: React.MutableRefObject<TechRigApi | null> }) {
  const root = useRef<THREE.Group>(null)
  const torso = useRef<THREE.Group>(null)
  const head = useRef<THREE.Group>(null)
  const yawR = useRef<THREE.Group>(null)
  const shR = useRef<THREE.Group>(null)
  const elR = useRef<THREE.Group>(null)
  const wrR = useRef<THREE.Group>(null)
  const tool = useRef<THREE.Group>(null)
  const yawL = useRef<THREE.Group>(null)
  const shL = useRef<THREE.Group>(null)
  const elL = useRef<THREE.Group>(null)
  const yawHipR = useRef<THREE.Group>(null)
  const hipR = useRef<THREE.Group>(null)
  const kneeR = useRef<THREE.Group>(null)
  const ankleR = useRef<THREE.Group>(null)
  const yawHipL = useRef<THREE.Group>(null)
  const hipL = useRef<THREE.Group>(null)
  const kneeL = useRef<THREE.Group>(null)
  const ankleL = useRef<THREE.Group>(null)

  const api = useMemo<TechRigApi>(
    () => ({
      setPose(p: JointPose) {
        if (torso.current) torso.current.rotation.x = p.torso
        if (head.current) head.current.rotation.x = p.head
        if (yawR.current) yawR.current.rotation.y = p.shoulderYawR
        if (shR.current) shR.current.rotation.x = p.shoulderR
        if (elR.current) elR.current.rotation.x = p.elbowR
        if (wrR.current) wrR.current.rotation.x = p.wristPitchR
        if (tool.current) tool.current.rotation.y = p.toolRollR
        if (yawL.current) yawL.current.rotation.y = p.shoulderYawL
        if (shL.current) shL.current.rotation.x = p.shoulderL
        if (elL.current) elL.current.rotation.x = p.elbowL
        if (yawHipR.current) yawHipR.current.rotation.y = p.hipYawR
        if (hipR.current) hipR.current.rotation.x = p.hipR
        if (kneeR.current) kneeR.current.rotation.x = p.kneeR
        if (ankleR.current) ankleR.current.rotation.x = p.ankleR
        if (yawHipL.current) yawHipL.current.rotation.y = p.hipYawL
        if (hipL.current) hipL.current.rotation.x = p.hipL
        if (kneeL.current) kneeL.current.rotation.x = p.kneeL
        if (ankleL.current) ankleL.current.rotation.x = p.ankleL
      },
      setVisible(v: boolean) {
        if (root.current) root.current.visible = v
      },
    }),
    [],
  )
  apiRef.current = api

  const [rx, , rz] = TECHNICIAN.root
  return (
    <group name="TECHNICIAN_ROOT" position={[rx, 0, rz]} ref={root} visible={false}>
      {/* pelvis */}
      <mesh position={[0, 0.42, 0]} castShadow>
        <boxGeometry args={[0.3, 0.18, 0.2]} />
        <meshStandardMaterial color={COVER_DARK} roughness={0.9} flatShading />
      </mesh>
      {/* torso */}
      <group name="TECH_TORSO" position={[0, 0.42, 0]} ref={torso} rotation={[POSE_P0.torso, 0, 0]}>
        <mesh position={[0, 0.27, 0]} castShadow>
          <boxGeometry args={[0.34, 0.5, 0.22]} />
          <meshStandardMaterial color={COVER} roughness={0.9} flatShading />
        </mesh>
        {/* cabeza (sin rostro: casco/cabello + volumen) */}
        <group name="TECH_HEAD" position={[0, 0.52, 0]} ref={head} rotation={[POSE_P0.head, 0, 0]}>
          <mesh position={[0, 0.11, 0.01]} castShadow>
            <boxGeometry args={[0.15, 0.18, 0.16]} />
            <meshStandardMaterial color={SKIN} roughness={0.85} flatShading />
          </mesh>
          <mesh position={[0, 0.2, 0.01]}>
            <boxGeometry args={[0.16, 0.05, 0.17]} />
            <meshStandardMaterial color={CAP} roughness={0.9} flatShading />
          </mesh>
        </group>
        {/* brazo derecho: yaw→pitch→codo→muñeca→ToolSocket */}
        <group name="TECH_SHOULDER_R" position={[0.21, 0.48, 0]} ref={yawR}>
          <group ref={shR}>
            <Limb r={0.055} len={0.3} color={COVER} />
            <group name="TECH_ELBOW_R" position={[0, -0.3, 0]} ref={elR}>
              <Limb r={0.05} len={0.3} color={COVER_DARK} />
              <group name="TECH_WRIST_R" position={[0, -0.3, 0]} ref={wrR}>
                <mesh position={[0, -0.05, 0]} castShadow>
                  <boxGeometry args={[0.07, 0.09, 0.07]} />
                  <meshStandardMaterial color={SKIN} roughness={0.85} flatShading />
                </mesh>
                {/* ToolSocket: destornillador en mano derecha */}
                <group name="TOOL_SOCKET" position={[0, -0.09, 0]} ref={tool}>
                  <mesh position={[0, -0.05, 0]} castShadow>
                    <cylinderGeometry args={[0.016, 0.018, 0.1, 6]} />
                    <meshStandardMaterial color={TOOL_RED} roughness={0.7} flatShading />
                  </mesh>
                  <mesh position={[0, -0.145, 0]}>
                    <cylinderGeometry args={[0.004, 0.004, 0.09, 6]} />
                    <meshStandardMaterial color={TOOL_STEEL} roughness={0.3} metalness={0.85} />
                  </mesh>
                </group>
              </group>
            </group>
          </group>
        </group>
        {/* brazo izquierdo (mano de apoyo, sin herramienta) */}
        <group name="TECH_SHOULDER_L" position={[-0.21, 0.48, 0]} ref={yawL}>
          <group ref={shL}>
            <Limb r={0.055} len={0.3} color={COVER} />
            <group name="TECH_ELBOW_L" position={[0, -0.3, 0]} ref={elL}>
              <Limb r={0.05} len={0.3} color={COVER_DARK} />
              <mesh position={[0, -0.34, 0]} castShadow>
                <boxGeometry args={[0.07, 0.09, 0.07]} />
                <meshStandardMaterial color={SKIN} roughness={0.85} flatShading />
              </mesh>
            </group>
          </group>
        </group>
      </group>
      {/* pierna derecha (rodilla al suelo) */}
      <group name="TECH_HIP_R" position={[0.11, 0.38, 0]} ref={yawHipR}>
        <group ref={hipR}>
          <Limb r={0.07} len={0.45} color={COVER_DARK} />
          <group name="TECH_KNEE_R" position={[0, -0.45, 0]} ref={kneeR}>
            <Limb r={0.06} len={0.44} color={COVER_DARK} />
            <group name="TECH_ANKLE_R" position={[0, -0.44, 0]} ref={ankleR}>
              <mesh position={[0, -0.035, 0.05]} castShadow>
                <boxGeometry args={[0.09, 0.07, 0.22]} />
                <meshStandardMaterial color={BOOT} roughness={0.9} flatShading />
              </mesh>
            </group>
          </group>
        </group>
      </group>
      {/* pierna izquierda (pie plantado) */}
      <group name="TECH_HIP_L" position={[-0.11, 0.38, 0]} ref={yawHipL}>
        <group ref={hipL}>
          <Limb r={0.07} len={0.45} color={COVER_DARK} />
          <group name="TECH_KNEE_L" position={[0, -0.45, 0]} ref={kneeL}>
            <Limb r={0.06} len={0.44} color={COVER_DARK} />
            <group name="TECH_ANKLE_L" position={[0, -0.44, 0]} ref={ankleL}>
              <mesh position={[0, -0.035, 0.05]} castShadow receiveShadow>
                <boxGeometry args={[0.09, 0.07, 0.22]} />
                <meshStandardMaterial color={BOOT} roughness={0.9} flatShading />
              </mesh>
            </group>
          </group>
        </group>
      </group>
    </group>
  )
}
