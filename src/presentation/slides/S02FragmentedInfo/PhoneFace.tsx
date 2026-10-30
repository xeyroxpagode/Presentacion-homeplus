// S02 V1.6 — cara estática S02.0 del Phone Dive (§9).
// La pantalla del teléfono físico (S01) muestra desde antes este mismo
// WhatsApp histórico: mismo encabezado, garantía y relación visual.
// S02.0 la reutiliza como base del dive → el empalme es idéntico.

import { useMemo, useRef } from 'react'
import { HISTORY_VIEWPORT_H, HISTORY_VIEWPORT_Y, buildHistory } from './s02Data'
import { useHistoryLayout } from './historyLayout'
import { ChatWallpaper, Composer, HistoryBlocks, HistoryMeasurer, StatusBar, WaHeader } from './WhatsApp'

export default function ChatFaceStatic() {
  const history = useMemo(() => buildHistory(), [])
  const measureRef = useRef<HTMLDivElement | null>(null)
  const layout = useHistoryLayout(history.blocks, measureRef)
  return (
    <div className="s02-appscale s02-face-static" aria-hidden="true">
      <StatusBar />
      <WaHeader />
      <ChatWallpaper />
      <div className="s02-history" style={{ top: HISTORY_VIEWPORT_Y, height: HISTORY_VIEWPORT_H }}>
        <div className="s02-history-inner" style={{ height: layout.contentH, transform: 'translateY(0px)' }}>
          <HistoryBlocks blocks={history.blocks} tops={layout.tops} showSent={false} sentPop={0} hideMother={false} />
        </div>
      </div>
      <Composer text="" />
      <div className="s02-home"><span /></div>
      <div ref={measureRef} style={{ position: 'absolute', top: 0, left: 0 }}>
        <HistoryMeasurer blocks={history.blocks} />
      </div>
    </div>
  )
}
