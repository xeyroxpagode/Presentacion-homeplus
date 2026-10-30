import { useEffect, useMemo } from 'react'
import * as THREE from 'three'
import { PAPER_STACK } from './finalGeometry'

const PAPER = '#eee6d6'
const INK = '#292724'
const MUTED = '#756e64'
const RULE = '#b8ae9f'
const ACCENT = '#a54838'

function createFacturaTexture(): THREE.CanvasTexture {
  const cv = document.createElement('canvas')
  cv.width = 1024
  cv.height = 1360
  const ctx = cv.getContext('2d')!

  ctx.fillStyle = PAPER
  ctx.fillRect(0, 0, cv.width, cv.height)
  for (let i = 0; i < 36; i += 1) {
    const alpha = 0.012 + (i % 4) * 0.004
    ctx.fillStyle = `rgba(92, 76, 55, ${alpha})`
    ctx.fillRect(24 + ((i * 157) % 920), 24 + ((i * 271) % 1260), 60 + ((i * 31) % 120), 20 + ((i * 19) % 50))
  }

  ctx.fillStyle = '#3a4b53'
  ctx.fillRect(0, 0, 1024, 232)
  ctx.textAlign = 'left'
  ctx.fillStyle = '#f7f2e8'
  ctx.font = '600 42px Arial, sans-serif'
  ctx.fillText('ENERGÍA DEL HOGAR', 72, 86)
  ctx.font = '700 88px Arial, sans-serif'
  ctx.fillText('FACTURA', 72, 180)
  ctx.fillStyle = '#d8e0df'
  ctx.font = '28px Arial, sans-serif'
  ctx.fillText('Documento doméstico ficticio', 620, 180)

  ctx.fillStyle = INK
  ctx.font = '700 34px Arial, sans-serif'
  ctx.fillText('PERÍODO', 72, 310)
  ctx.fillText('VENCIMIENTO', 390, 310)
  ctx.fillText('TOTAL', 720, 310)
  ctx.font = '40px Arial, sans-serif'
  ctx.fillText('JUL · AGO', 72, 368)
  ctx.fillStyle = ACCENT
  ctx.font = '700 46px Arial, sans-serif'
  ctx.fillText('18 AGO 2026', 390, 370)
  ctx.fillStyle = INK
  ctx.font = '700 48px Arial, sans-serif'
  ctx.fillText('$ 48.920', 720, 370)

  ctx.fillStyle = RULE
  ctx.fillRect(72, 430, 880, 3)
  ctx.fillStyle = MUTED
  ctx.font = '28px Arial, sans-serif'
  ctx.fillText('CONCEPTO', 72, 500)
  ctx.fillText('IMPORTE', 760, 500)

  const rows = [
    ['Consumo del período', '$ 38.420'],
    ['Distribución y mantenimiento', '$ 7.900'],
    ['Cargos e impuestos', '$ 2.600'],
  ]
  rows.forEach(([label, value], index) => {
    const y = 570 + index * 112
    ctx.fillStyle = INK
    ctx.font = '32px Arial, sans-serif'
    ctx.fillText(label, 72, y)
    ctx.textAlign = 'right'
    ctx.fillText(value, 952, y)
    ctx.textAlign = 'left'
    ctx.fillStyle = RULE
    ctx.fillRect(72, y + 42, 880, 2)
  })

  ctx.fillStyle = '#ddd3c3'
  ctx.fillRect(72, 930, 880, 176)
  ctx.fillStyle = INK
  ctx.font = '700 30px Arial, sans-serif'
  ctx.fillText('PAGO PENDIENTE', 104, 990)
  ctx.font = '27px Arial, sans-serif'
  ctx.fillStyle = MUTED
  ctx.fillText('La obligación permanece hasta que una persona la resuelva.', 104, 1044)

  ctx.fillStyle = MUTED
  ctx.font = '24px Arial, sans-serif'
  ctx.fillText('Sin datos personales · Sin valor fiscal', 72, 1262)
  ctx.textAlign = 'right'
  ctx.fillText('N.º 0001842', 952, 1262)

  const texture = new THREE.CanvasTexture(cv)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.anisotropy = 8
  return texture
}

function facturaGeometry() {
  const geometry = new THREE.PlaneGeometry(0.235, 0.31, 10, 12)
  geometry.rotateX(-Math.PI / 2)
  const positions = geometry.getAttribute('position') as THREE.BufferAttribute
  for (let i = 0; i < positions.count; i += 1) {
    const x = positions.getX(i) / 0.1175
    const z = positions.getZ(i) / 0.155
    const edge = Math.pow(Math.max(0, Math.abs(x) - 0.58) / 0.42, 3)
    const corner = Math.pow(Math.max(0, z - 0.52) / 0.48, 3) * Math.max(0, x)
    positions.setY(i, edge * 0.004 + corner * 0.007)
  }
  positions.needsUpdate = true
  geometry.computeVertexNormals()
  return geometry
}

export default function FacturaOverlay() {
  const texture = useMemo(createFacturaTexture, [])
  const geometry = useMemo(facturaGeometry, [])
  useEffect(() => () => {
    texture.dispose()
    geometry.dispose()
  }, [geometry, texture])

  const position: [number, number, number] = [
    PAPER_STACK.anchor[0] + 0.025,
    PAPER_STACK.topY + 0.006,
    PAPER_STACK.anchor[2] - 0.012,
  ]

  return (
    <group name="FACTURA_FISICA" position={position} rotation={[0, -0.055, 0]}>
      <mesh position={[0, -0.0022, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.236, 0.003, 0.311]} />
        <meshStandardMaterial color="#d9cfbd" roughness={0.94} />
      </mesh>
      <mesh geometry={geometry} castShadow receiveShadow>
        <meshStandardMaterial map={texture} color="#cfc5b3" roughness={0.93} side={THREE.DoubleSide} />
      </mesh>
    </group>
  )
}
