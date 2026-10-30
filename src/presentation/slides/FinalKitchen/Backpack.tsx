import { useEffect, useMemo } from 'react'
import { RoundedBox } from '@react-three/drei'
import * as THREE from 'three'
import { BACKPACK } from './finalGeometry'

const BODY = '#756747'
const BODY_SIDE = '#62583f'
const POCKET = '#6b5c3f'
const WEBBING = '#343a34'
const ZIP = '#b9ad91'

export function backpackBBox() {
  const [x, , z] = BACKPACK.root
  const { w, h, d } = BACKPACK.size
  return {
    min: [x - w / 2, 0, z - d / 2] as const,
    max: [x + w / 2, h + 0.06, z + d / 2 + 0.28] as const,
    center: [x, 0.24, z + 0.02] as const,
  }
}

function useFabricRoughness() {
  const texture = useMemo(() => {
    const size = 64
    const data = new Uint8Array(size * size * 4)
    for (let y = 0; y < size; y += 1) {
      for (let x = 0; x < size; x += 1) {
        const i = (y * size + x) * 4
        const weave = ((x * 17 + y * 29 + ((x ^ y) * 7)) % 23) / 23
        const value = Math.round(198 + weave * 46)
        data[i] = value
        data[i + 1] = value
        data[i + 2] = value
        data[i + 3] = 255
      }
    }
    const map = new THREE.DataTexture(data, size, size, THREE.RGBAFormat)
    map.wrapS = map.wrapT = THREE.RepeatWrapping
    map.repeat.set(5, 7)
    map.needsUpdate = true
    return map
  }, [])
  useEffect(() => () => texture.dispose(), [texture])
  return texture
}

function Strap({ points, radius = 0.009, color = WEBBING }: {
  points: [number, number, number][]
  radius?: number
  color?: string
}) {
  const geometry = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3(points.map((p) => new THREE.Vector3(...p)))
    return new THREE.TubeGeometry(curve, 32, radius, 7, false)
  }, [points, radius])
  useEffect(() => () => geometry.dispose(), [geometry])
  return (
    <mesh geometry={geometry} castShadow>
      <meshStandardMaterial color={color} roughness={0.92} />
    </mesh>
  )
}

function Fabric({ color, roughnessMap }: { color: string; roughnessMap: THREE.Texture }) {
  return <meshStandardMaterial color={color} roughness={0.9} roughnessMap={roughnessMap} />
}

export default function Backpack() {
  const [x, y, z] = BACKPACK.root
  const roughnessMap = useFabricRoughness()
  return (
    <group name="BACKPACK_ROOT" position={[x, y, z]} rotation={[0, BACKPACK.yaw, 0]}>
      <group name="BACKPACK_BODY" rotation={[-BACKPACK.lean, 0, 0]}>
        <RoundedBox args={[0.31, 0.37, 0.17]} radius={0.045} smoothness={4} position={[0, 0.225, 0]} castShadow receiveShadow>
          <Fabric color={BODY} roughnessMap={roughnessMap} />
        </RoundedBox>

        <RoundedBox args={[0.285, 0.085, 0.16]} radius={0.035} smoothness={4} position={[0, 0.405, -0.002]} castShadow>
          <Fabric color={BODY_SIDE} roughnessMap={roughnessMap} />
        </RoundedBox>

        <RoundedBox args={[0.23, 0.155, 0.055]} radius={0.03} smoothness={4} position={[0, 0.17, 0.102]} castShadow>
          <Fabric color={POCKET} roughnessMap={roughnessMap} />
        </RoundedBox>

        <RoundedBox args={[0.25, 0.055, 0.142]} radius={0.022} smoothness={3} position={[0, 0.065, 0.004]} castShadow receiveShadow>
          <Fabric color={BODY_SIDE} roughnessMap={roughnessMap} />
        </RoundedBox>

        <mesh position={[-0.154, 0.235, 0]} rotation={[0, 0, 0.03]} castShadow>
          <capsuleGeometry args={[0.012, 0.24, 4, 8]} />
          <meshStandardMaterial color={BODY_SIDE} roughness={0.92} />
        </mesh>
        <mesh position={[0.154, 0.235, 0]} rotation={[0, 0, -0.03]} castShadow>
          <capsuleGeometry args={[0.012, 0.24, 4, 8]} />
          <meshStandardMaterial color={BODY_SIDE} roughness={0.92} />
        </mesh>

        <Strap points={[[-0.06, 0.445, -0.025], [-0.055, 0.505, -0.035], [0.055, 0.505, -0.035], [0.06, 0.445, -0.025]]} radius={0.012} />

        <Strap points={[[-0.092, 0.385, -0.092], [-0.125, 0.27, -0.112], [-0.11, 0.12, -0.095]]} radius={0.021} />
        <Strap points={[[0.092, 0.385, -0.092], [0.125, 0.27, -0.112], [0.11, 0.12, -0.095]]} radius={0.021} />

        <mesh position={[0, 0.252, 0.132]} castShadow>
          <capsuleGeometry args={[0.006, 0.19, 3, 8]} />
          <meshStandardMaterial color={ZIP} roughness={0.55} metalness={0.25} />
        </mesh>
        <mesh position={[0.105, 0.252, 0.139]} rotation={[0, 0, -0.18]} castShadow>
          <boxGeometry args={[0.014, 0.032, 0.007]} />
          <meshStandardMaterial color={ZIP} roughness={0.45} metalness={0.35} />
        </mesh>

        {[-0.095, 0.095].map((sx) => (
          <mesh key={sx} position={[sx, 0.125, 0.132]}>
            <boxGeometry args={[0.0025, 0.11, 0.003]} />
            <meshStandardMaterial color="#a89b7d" roughness={0.8} />
          </mesh>
        ))}
      </group>

      <Strap
        points={[[0.095, 0.095, 0.05], [0.16, 0.035, 0.12], [0.19, 0.012, 0.24], [0.1, 0.008, 0.36]]}
        radius={0.012}
      />
      <mesh position={[0.095, 0.006, 0.385]} rotation={[0, 0.2, 0]} receiveShadow>
        <boxGeometry args={[0.045, 0.009, 0.075]} />
        <meshStandardMaterial color={WEBBING} roughness={0.95} />
      </mesh>
    </group>
  )
}
