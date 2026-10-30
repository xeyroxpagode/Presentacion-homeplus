import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import type { TechRigApi } from './TechnicianRig'
import type { JointPose } from './TechnicianAnimation'
import { computeTechnicianJoints, computeToolTip, limbDir } from './TechnicianAnimation'
import { TECHNICIAN } from './finalGeometry'

const CHARACTER_URL = new URL('../../../../assets/technician/characterMedium.glb', import.meta.url).href
const CHARACTER_TEXTURE_URL = new URL('../../../../assets/technician/humanMaleA.png', import.meta.url).href

type BoneSetup = {
  bone: THREE.Bone
  base: THREE.Quaternion
}

type V3Like = { x: number; y: number; z: number }

function RepairTool({ toolRef }: { toolRef: React.MutableRefObject<THREE.Group | null> }) {
  return (
    <group ref={toolRef} name="TECHNICIAN_TOOL_SOCKET">
      <mesh position={[0, 0.006, 0]} castShadow>
        <coneGeometry args={[0.006, 0.012, 8]} />
        <meshStandardMaterial color="#c8d0d5" roughness={0.3} metalness={0.88} />
      </mesh>
      <mesh position={[0, 0.057, 0]} castShadow>
        <cylinderGeometry args={[0.0055, 0.0055, 0.09, 10]} />
        <meshStandardMaterial color="#d7dee2" roughness={0.28} metalness={0.86} />
      </mesh>
      <mesh position={[0, 0.145, 0]} castShadow>
        <cylinderGeometry args={[0.017, 0.02, 0.11, 12]} />
        <meshStandardMaterial color="#b64a34" roughness={0.58} />
      </mesh>
    </group>
  )
}

function RepairArms({
  upperR,
  foreR,
  handR,
  upperL,
  foreL,
  handL,
}: {
  upperR: React.MutableRefObject<THREE.Mesh | null>
  foreR: React.MutableRefObject<THREE.Mesh | null>
  handR: React.MutableRefObject<THREE.Mesh | null>
  upperL: React.MutableRefObject<THREE.Mesh | null>
  foreL: React.MutableRefObject<THREE.Mesh | null>
  handL: React.MutableRefObject<THREE.Mesh | null>
}) {
  return (
    <group name="TECHNICIAN_REPAIR_ARMS">
      {[upperR, upperL].map((ref, index) => (
        <mesh key={`upper-${index}`} ref={ref} castShadow>
          <cylinderGeometry args={[0.038, 0.034, 1, 10]} />
          <meshStandardMaterial color="#4a5364" roughness={0.9} />
        </mesh>
      ))}
      {[foreR, foreL].map((ref, index) => (
        <mesh key={`fore-${index}`} ref={ref} castShadow>
          <cylinderGeometry args={[0.034, 0.03, 1, 10]} />
          <meshStandardMaterial color="#394457" roughness={0.9} />
        </mesh>
      ))}
      {[handR, handL].map((ref, index) => (
        <mesh key={`hand-${index}`} ref={ref} castShadow>
          <sphereGeometry args={[0.045, 12, 10]} />
          <meshStandardMaterial color="#c99073" roughness={0.84} />
        </mesh>
      ))}
    </group>
  )
}

export default function TechnicianGLB({ apiRef }: { apiRef: React.MutableRefObject<TechRigApi | null> }) {
  const root = useRef<THREE.Group>(null)
  const tool = useRef<THREE.Group>(null)
  const upperR = useRef<THREE.Mesh>(null)
  const foreR = useRef<THREE.Mesh>(null)
  const handR = useRef<THREE.Mesh>(null)
  const upperL = useRef<THREE.Mesh>(null)
  const foreL = useRef<THREE.Mesh>(null)
  const handL = useRef<THREE.Mesh>(null)
  const [scene, setScene] = useState<THREE.Group | null>(null)
  const bones = useRef(new Map<string, BoneSetup>())
  const texture = useRef<THREE.Texture | null>(null)
  const [rx, , rz] = TECHNICIAN.root

  useEffect(() => {
    let cancelled = false
    const loader = new GLTFLoader()
    const textureLoader = new THREE.TextureLoader()
    loader.load(
      CHARACTER_URL,
      (gltf) => {
        if (cancelled) return
        gltf.scene.traverse((object) => {
          if (object instanceof THREE.Bone) {
            bones.current.set(object.name, { bone: object, base: object.quaternion.clone() })
          }
          if (object instanceof THREE.Mesh) {
            object.castShadow = true
            object.receiveShadow = true
            const materials = Array.isArray(object.material) ? object.material : [object.material]
            const styled = materials.map((material) => {
              const clone = material.clone() as THREE.MeshStandardMaterial
              clone.roughness = 0.82
              clone.metalness = 0.02
              return clone
            })
            object.material = Array.isArray(object.material) ? styled : styled[0]
          }
        })
        setScene(gltf.scene)
        textureLoader.load(CHARACTER_TEXTURE_URL, (map) => {
          if (cancelled) {
            map.dispose()
            return
          }
          map.colorSpace = THREE.SRGBColorSpace
          map.flipY = false
          map.anisotropy = 8
          texture.current = map
          gltf.scene.traverse((object) => {
            if (!(object instanceof THREE.Mesh)) return
            const materials = Array.isArray(object.material) ? object.material : [object.material]
            materials.forEach((material) => {
              const standard = material as THREE.MeshStandardMaterial
              standard.map = map
              standard.color.set('#ffffff')
              standard.needsUpdate = true
            })
          })
        })
      },
      undefined,
      (error) => {
        console.error('No se pudo cargar el técnico CC0.', error)
      },
    )
    return () => {
      cancelled = true
      texture.current?.dispose()
      apiRef.current = null
    }
  }, [apiRef])

  useEffect(() => {
    if (!scene) return
    const q = new THREE.Quaternion()
    const e = new THREE.Euler()
    const up = new THREE.Vector3(0, 1, 0)
    const direction = new THREE.Vector3()
    const roll = new THREE.Quaternion()
    const currentWorld = new THREE.Quaternion()
    const parentWorld = new THREE.Quaternion()
    const alignment = new THREE.Quaternion()
    const desiredWorld = new THREE.Quaternion()
    const boneWorld = new THREE.Vector3()
    const childWorld = new THREE.Vector3()
    const currentAxis = new THREE.Vector3()
    const desiredAxis = new THREE.Vector3()
    const midpoint = new THREE.Vector3()

    const poseBone = (name: string, x = 0, y = 0, z = 0) => {
      const setup = bones.current.get(name)
      if (!setup) return
      e.set(x, y, z, 'XYZ')
      q.setFromEuler(e)
      setup.bone.quaternion.copy(setup.base).multiply(q)
    }

    const aimBone = (
      name: string,
      childName: string,
      from: { x: number; y: number; z: number },
      to: { x: number; y: number; z: number },
    ) => {
      const setup = bones.current.get(name)
      const child = bones.current.get(childName)
      if (!setup || !child || !root.current) return
      root.current.updateMatrixWorld(true)
      setup.bone.getWorldQuaternion(currentWorld)
      setup.bone.getWorldPosition(boneWorld)
      child.bone.getWorldPosition(childWorld)
      currentAxis.copy(childWorld).sub(boneWorld).normalize()
      desiredAxis.set(to.x - from.x, to.y - from.y, to.z - from.z).normalize()
      alignment.setFromUnitVectors(currentAxis, desiredAxis)
      desiredWorld.copy(alignment).multiply(currentWorld)
      setup.bone.parent?.getWorldQuaternion(parentWorld)
      setup.bone.quaternion.copy(parentWorld.invert()).multiply(desiredWorld)
      setup.bone.updateMatrixWorld(true)
    }

    const placeSegment = (mesh: THREE.Mesh | null, from: V3Like, to: V3Like) => {
      if (!mesh) return
      direction.set(to.x - from.x, to.y - from.y, to.z - from.z)
      const length = direction.length()
      if (length < 0.001) return
      midpoint.set((from.x + to.x) / 2 - rx, (from.y + to.y) / 2, (from.z + to.z) / 2 - rz)
      mesh.position.copy(midpoint)
      mesh.scale.set(1, length, 1)
      mesh.quaternion.setFromUnitVectors(up, direction.normalize())
    }

    apiRef.current = {
      setPose(p: JointPose) {
        for (const setup of bones.current.values()) setup.bone.quaternion.copy(setup.base)
        poseBone('Hips', -p.torso * 0.18, 0, 0)
        poseBone('Spine', -p.torso * 0.28, 0, 0)
        poseBone('Chest', -p.torso * 0.34, 0, 0)
        poseBone('UpperChest', -p.torso * 0.2, 0, 0)
        poseBone('Neck', -p.head * 0.28, 0, 0)
        poseBone('Head', -p.head * 0.42, 0, 0)

        const joints = computeTechnicianJoints(p)
        aimBone('RightArm', 'RightForeArm', joints.shoulderR, joints.elbowR)
        aimBone('RightForeArm', 'RightHand', joints.elbowR, joints.wristR)
        aimBone('RightHand', 'RightHandIndex1', joints.wristR, joints.toolTip)
        aimBone('LeftArm', 'LeftForeArm', joints.shoulderL, joints.elbowL)
        aimBone('LeftForeArm', 'LeftHand', joints.elbowL, joints.wristL)
        aimBone('RightUpLeg', 'RightLeg', joints.hipR, joints.kneeR)
        aimBone('RightLeg', 'RightFoot', joints.kneeR, joints.footR)
        aimBone('LeftUpLeg', 'LeftLeg', joints.hipL, joints.kneeL)
        aimBone('LeftLeg', 'LeftFoot', joints.kneeL, joints.footL)

        placeSegment(upperR.current, joints.shoulderR, joints.elbowR)
        placeSegment(foreR.current, joints.elbowR, joints.wristR)
        placeSegment(upperL.current, joints.shoulderL, joints.elbowL)
        placeSegment(foreL.current, joints.elbowL, joints.wristL)
        handR.current?.position.set(joints.wristR.x - rx, joints.wristR.y, joints.wristR.z - rz)
        handL.current?.position.set(joints.wristL.x - rx, joints.wristL.y, joints.wristL.z - rz)

        if (tool.current) {
          const tip = computeToolTip(p)
          const toolDirection = limbDir(p.shoulderYawR, p.shoulderR + p.elbowR + p.wristPitchR)
          direction.set(-toolDirection.x, -toolDirection.y, -toolDirection.z).normalize()
          tool.current.position.set(
            tip.x - TECHNICIAN.root[0],
            tip.y - TECHNICIAN.root[1],
            tip.z - TECHNICIAN.root[2],
          )
          tool.current.quaternion.setFromUnitVectors(up, direction)
          roll.setFromAxisAngle(up, p.toolRollR)
          tool.current.quaternion.multiply(roll)
        }
      },
      setVisible(visible: boolean) {
        if (root.current) root.current.visible = visible
      },
    }
    return () => {
      apiRef.current = null
    }
  }, [apiRef, scene])

  return (
    <group ref={root} name="TECHNICIAN_ROOT" position={[rx, 0, rz]} visible={false}>
      <group position={[0, -0.2, 0]} rotation={[0, Math.PI, 0]} scale={0.5}>
        {scene && <primitive object={scene} />}
      </group>
      <RepairArms
        upperR={upperR}
        foreR={foreR}
        handR={handR}
        upperL={upperL}
        foreL={foreL}
        handL={handL}
      />
      <RepairTool toolRef={tool} />
    </group>
  )
}
