import { useMemo } from 'react'
import * as THREE from 'three'
import { getS01QualityProfile } from './s01Quality'

function seeded(index: number, channel: number) {
  const value = Math.sin(index * 91.733 + channel * 17.17) * 43758.5453
  return value - Math.floor(value)
}

export default function S01Atmosphere() {
  const profile = useMemo(getS01QualityProfile, [])
  const geometry = useMemo(() => {
    const points = new Float32Array(profile.dustCount * 3)
    for (let index = 0; index < profile.dustCount; index += 1) {
      points[index * 3] = -1.7 + seeded(index, 0) * 3.5
      points[index * 3 + 1] = 0.9 + seeded(index, 1) * 1.3
      points[index * 3 + 2] = -2.65 + seeded(index, 2) * 2.25
    }
    const next = new THREE.BufferGeometry()
    next.setAttribute('position', new THREE.BufferAttribute(points, 3))
    return next
  }, [profile.dustCount])

  if (!profile.atmosphere || profile.dustCount === 0) return null
  return (
    <points geometry={geometry} frustumCulled={false}>
      <pointsMaterial color="#d8c7a7" size={0.009} transparent opacity={0.11} depthWrite={false} sizeAttenuation />
    </points>
  )
}

