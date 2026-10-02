import type { ReactNode } from 'react'

type MessageBubbleProps = { children: ReactNode; emphasis?: boolean }

export default function MessageBubble({ children, emphasis = false }: MessageBubbleProps) {
  return (
    <div className="message-bubble" data-emphasis={emphasis}>
      <p>{children}</p>
      <svg className="message-bubble-tail" aria-hidden="true" viewBox="0 0 22 18">
        <path d="M1 0h20L2 16c-1.5 1-2-.5-1-3L5 0" />
      </svg>
    </div>
  )
}
