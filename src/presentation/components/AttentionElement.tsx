import type { CSSProperties, ReactNode } from 'react'
import type { MotionPrimitive } from '../motion/motionTokens'

type AttentionElementProps = {
  id: string
  present: boolean
  x: number
  y: number
  width: number
  rotation?: number
  secondary?: boolean
  fall?: boolean
  departed?: boolean
  motion?: Extract<MotionPrimitive, 'ENTER' | 'ACCUMULATE' | 'REPLACE'>
  children: ReactNode
}

export default function AttentionElement({
  id, present, x, y, width, rotation = 0, secondary = false,
  fall = false, departed = false, motion = 'ACCUMULATE', children,
}: AttentionElementProps) {
  const style = { left: x, top: y, width, '--attention-rotation': `${rotation}deg` } as CSSProperties
  return (
    <div
      className="attention-element"
      data-element={id}
      data-present={present}
      data-secondary={secondary}
      data-fall={fall && departed}
      data-motion={present ? motion : 'EXIT'}
      aria-hidden={!present}
      style={style}
    >
      <div className="attention-element-content">{children}</div>
    </div>
  )
}
