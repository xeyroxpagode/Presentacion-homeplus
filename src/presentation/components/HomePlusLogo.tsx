import homePlusLogo from '../../../assets/07a9c99e-dd9f-4b8b-a7dc-2453e6935ca2.png'
import { tokens } from '../design-system/tokens'

type HomePlusLogoProps = { size?: number; opacity?: number; className?: string }

export default function HomePlusLogo({ size = tokens.logo.size, opacity = 1, className = '' }: HomePlusLogoProps) {
  return (
    <img
      className={`homeplus-logo ${className}`}
      src={homePlusLogo}
      alt="HomePlus"
      width={size}
      height={size}
      style={{ opacity: Math.min(1, Math.max(0, opacity)) }}
      draggable={false}
    />
  )
}
