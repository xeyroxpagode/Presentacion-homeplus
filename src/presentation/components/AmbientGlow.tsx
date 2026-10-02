import type { CSSProperties } from 'react'
import { tokens } from '../design-system/tokens'

type AmbientGlowProps = {
  /** Center and size in logical canvas pixels. Intensity and opacity: 0–1. */
  x?: number
  y?: number
  size?: number
  intensity?: number
  opacity?: number
  className?: string
}

export default function AmbientGlow({
  x = tokens.glow.x,
  y = tokens.glow.y,
  size = tokens.glow.size,
  intensity = tokens.glow.intensity,
  opacity = tokens.glow.opacity,
  className = '',
}: AmbientGlowProps) {
  const style = {
    left: x,
    top: y,
    width: Math.max(0, size),
    height: Math.max(0, size) * tokens.glow.aspect,
    opacity: Math.min(1, Math.max(0, opacity)),
    '--glow-strength': `${Math.min(1, Math.max(0, intensity)) * 100}%`,
  } as CSSProperties

  return <div aria-hidden="true" className={`ambient-glow ${className}`} style={style} />
}
