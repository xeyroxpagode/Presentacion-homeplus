import type { CSSProperties, ReactNode } from 'react'
import { tokens } from '../design-system/tokens'

type PhoneFrameProps = { children?: ReactNode; scale?: number; className?: string }

export default function PhoneFrame({ children, scale = 1, className = '' }: PhoneFrameProps) {
  const frameScale = Math.max(0, scale)
  const slotStyle = {
    width: tokens.phone.width * frameScale,
    height: tokens.phone.height * frameScale,
    '--phone-scale': frameScale,
  } as CSSProperties

  return (
    <div className={`phone-frame-slot ${className}`} style={slotStyle}>
      <div className="phone-frame">
        <div className="phone-frame-screen">{children}</div>
      </div>
    </div>
  )
}
