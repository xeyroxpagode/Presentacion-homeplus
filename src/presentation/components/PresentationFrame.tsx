import { useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import { tokens } from '../design-system/tokens'

export default function PresentationFrame({ children }: { children: ReactNode }) {
  const viewportRef = useRef<HTMLElement>(null)
  const [scale, setScale] = useState(0)

  useLayoutEffect(() => {
    const viewport = viewportRef.current
    if (!viewport) return
    const updateScale = (width: number, height: number) => {
      setScale(Math.min(width / tokens.canvas.width, height / tokens.canvas.height))
    }
    updateScale(viewport.clientWidth, viewport.clientHeight)
    const observer = new ResizeObserver(([entry]) => {
      updateScale(entry.contentRect.width, entry.contentRect.height)
    })
    observer.observe(viewport)
    return () => observer.disconnect()
  }, [])

  return (
    <main ref={viewportRef} className="presentation-viewport" aria-label="Presentación HomePlus">
      <div
        className="presentation-canvas"
        style={{ transform: `translate(-50%, -50%) scale(${scale})` }}
      >
        {children}
      </div>
    </main>
  )
}
