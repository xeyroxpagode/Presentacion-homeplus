// FINAL KITCHEN V6.1 — técnico GLB Kenney Animated Characters 3 (CC0).
// Reemplaza el placeholder procedural por asset real riggeado.
// BONE_MAP mapea huesos Kenney → articulaciones del contrato.

import { useEffect, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import type { TechRigApi } from './TechnicianRig'
import type { JointPose } from './TechnicianAnimation'
import { TECHNICIAN } from './finalGeometry'

const BONE_MAP: Record<string, string> = {
  pelvis: 'Hips',
  spine: 'Spine',
  chest: 'Chest',
  neck: 'Neck',
  head: 'Head',
  upperArmR: 'RightArm',
  foreArmR: 'RightForeArm',
  handR: 'RightHand',
  upperArmL: 'LeftArm',
  foreArmL: 'LeftForeArm',
  handL: 'LeftHand',
  thighR: 'RightUpLeg',
  shinR: 'RightLeg',
  footR: 'RightFoot',
  thighL: 'LeftUpLeg',
  shinL: 'LeftLeg',
  footL: 'LeftFoot',
}

type GLTFResult = { scene: THREE.Group }

export default function TechnicianGLB({ apiRef }: { apiRef: React.MutableRefObject<TechRigApi | null> }) {
  const root = useRef<THREE.Group>(null)
  const [gltf, setGltf] = useState<GLTFResult | null>(null)
  const bonesRef = useRef<Map<string, THREE.Bone>>(new Map())
  const [rx, , rz] = TECHNICIAN.root

  useEffect(() => {
    const loader = new GLTFLoader()
    loader.load(
      new URL('../../../../assets/technician/characterMedium.glb', import.meta.url).pathname,
      (g: GLTFResult) => {
        g.scene.traverse((obj) => {
          if (obj instanceof THREE.Mesh) {
            obj.castShadow = true
            obj.receiveShadow = true
          }
        })
        setGltf(g)
      },
      undefined,
      () => setGltf(null),
    )
  }, [])

  useEffect(() => {
    if (!gltf || !root.current) return
    root.current.add(gltf.scene)
    const bones = new Map<string, THREE.Bone>()
    gltf.scene.traverse((obj) => {
      if (obj instanceof THREE.Bone) bones.set(obj.name, obj)
    })
    bonesRef.current = bones
    apiRef.current = {
      setPose(p: JointPose) {
        for (const [contract, kenney] of Object.entries(BONE_MAP)) {
          const bone = bones.get(kenney)
          if (!bone) continue
          switch (contract) {
            case 'spine': bone.rotation.x = p.torso * 0.4; break
            case 'chest': bone.rotation.x = p.torso * 0.6; break
            case 'neck': bone.rotation.x = p.head * 0.3; break
            case 'head': bone.rotation.x = p.head * 0.7; break
            case 'upperArmR': bone.rotation.x = p.shoulderR; bone.rotation.y = p.shoulderYawR; break
            case 'foreArmR': bone.rotation.x = p.elbowR; break
            case 'handR': bone.rotation.x = p.wristPitchR; break
            case 'upperArmL': bone.rotation.x = p.shoulderL; bone.rotation.y = p.shoulderYawL; break
            case 'foreArmL': bone.rotation.x = p.elbowL; break
            case 'thighR': bone.rotation.x = p.hipR; break
            case 'shinR': bone.rotation.x = p.kneeR; break
            case 'footR': bone.rotation.x = p.ankleR; break
            case 'thighL': bone.rotation.x = p.hipL; break
            case 'shinL': bone.rotation.x = p.kneeL; break
            case 'footL': bone.rotation.x = p.ankleL; break
          }
        }
      },
      setVisible(v: boolean) {
        if (root.current) root.current.visible = v
      },
    }
    return () => {
      root.current?.remove(gltf.scene)
      apiRef.current = null
    }
  }, [gltf, apiRef])

  useFrame(() => {
    if (!root.current) return
    const frame = (window as unknown as Record<string, unknown>).__finalFrame
    if (!frame) return
    const f = frame as { techPose: string }
    root.current.visible = f.techPose !== 'hidden'
  })

  return (
    <group ref={root} position={[rx, 0, rz]} visible={false}>
      {gltf && <primitive object={gltf.scene} />}
    </group>
  )
}
