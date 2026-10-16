// FINAL KITCHEN V6.1 — overlay de factura doméstica ficticia (W05).
// No modifica S01: renderiza un plano sobre la póliza existente con textura
// de factura ficticia (sin datos personales reales ni montos no aprobados).
// La pila y su anclaje se mantienen intactos.

import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { POLICY_ACCUM } from './finalGeometry'

const FACTURA_BG = '#f5f0e8'
const FACTURA_TEXT = '#3a3835'
const FACTURA_LINE = '#b8b0a0'
const FACTURA_ACCENT = '#6b5c4f'

function createFacturaTexture(): THREE.CanvasTexture {
  const cv = document.createElement('canvas')
  cv.width = 256
  cv.height = 340
  const ctx = cv.getContext('2d')!

  ctx.fillStyle = FACTURA_BG
  ctx.fillRect(0, 0, 256, 340)

  ctx.fillStyle = FACTURA_ACCENT
  ctx.fillRect(0, 0, 256, 56)

  ctx.fillStyle = '#ffffff'
  ctx.font = 'bold 22px Arial, sans-serif'
  ctx.textAlign = 'center'
  ctx.fillText('FACTURA', 128, 26)
  ctx.font = '11px Arial, sans-serif'
  ctx.fillText('Servicio Doméstico', 128, 44)

  ctx.fillStyle = FACTURA_TEXT
  ctx.font = '10px Arial, sans-serif'
  ctx.textAlign = 'left'
  ctx.fillText('Fecha de emisión: 15/03/2025', 16, 76)
  ctx.fillText('Vencimiento: 30/03/2025', 16, 90)

  ctx.fillStyle = FACTURA_LINE
  ctx.fillRect(16, 102, 224, 1)

  ctx.fillStyle = FACTURA_TEXT
  ctx.font = '9px Arial, sans-serif'
  ctx.fillText('Concepto', 16, 118)
  ctx.fillText('Monto', 180, 118)

  const items = [
    'Mantenimiento general',
    'Reparación menor',
    'Insumos básicos',
  ]
  items.forEach((item, i) => {
    const y = 136 + i * 20
    ctx.fillText(item, 16, y)
    ctx.fillText('—', 200, y)
  })

  ctx.fillStyle = FACTURA_LINE
  ctx.fillRect(16, 200, 224, 1)

  ctx.fillStyle = FACTURA_TEXT
  ctx.font = '10px Arial, sans-serif'
  ctx.fillText('Total', 16, 220)
  ctx.fillText('—', 200, 220)

  ctx.fillStyle = '#8a8070'
  ctx.font = '8px Arial, sans-serif'
  ctx.fillText('Documento ficticio — sin valor legal', 16, 320)

  const tex = new THREE.CanvasTexture(cv)
  tex.colorSpace = THREE.SRGBColorSpace
  tex.anisotropy = 4
  return tex
}

export default function FacturaOverlay() {
  const meshRef = useRef<THREE.Mesh>(null)
  const tex = useMemo(createFacturaTexture, [])

  useFrame(() => {
    if (!meshRef.current) return
    const frame = (window as unknown as Record<string, unknown>).__finalFrame
    if (!frame) return
    const visible = (frame as { qa: { beat: string } }).qa.beat === 'W05'
    meshRef.current.visible = visible
    if (!visible) return
    const p = frame as { camPos: [number, number, number] }
    void p
  })

  const pos: [number, number, number] = [
    POLICY_ACCUM.p[0],
    POLICY_ACCUM.p[1] + 0.0015,
    POLICY_ACCUM.p[2],
  ]
  const rot: [number, number, number] = [POLICY_ACCUM.r[0], POLICY_ACCUM.r[1], POLICY_ACCUM.r[2]]

  return (
    <mesh ref={meshRef} position={pos} rotation={rot} renderOrder={3} visible={false}>
      <planeGeometry args={[0.24, 0.32]} />
      <meshStandardMaterial
        map={tex}
        roughness={0.9}
        polygonOffset
        polygonOffsetFactor={-1}
        transparent
        opacity={0.98}
      />
    </mesh>
  )
}
