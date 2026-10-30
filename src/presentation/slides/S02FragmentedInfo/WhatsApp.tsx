// S02 V1.6 — piezas presentacionales de WhatsApp (§8).
// Componentes puros (sin estado): la superficie dinámica de S02 y la
// cara estática del Phone Dive (S01 + S02.0) comparten este mismo
// markup y las mismas clases → identidad de píxeles garantizada en
// los empalmes. Geometría canónica: entrantes X38, salientes borde
// derecho X1242, header Y34–112, historial Y112–621, composer Y621–695.

import type { HistoryBlock, SecondaryMsg } from './s02Data'
import { MOTHER_TEXT, SENDER_LABEL, SENT_TEXT, WARRANTY_TEXT } from './s02Data'

export const IN_X = 38
export const OUT_R = 1242

export function StatusBar({ onDark = true }: { onDark?: boolean }) {
  return (
    <div className="s02-statusbar" data-tone={onDark ? 'dark' : 'light'} aria-hidden="true">
      <span className="s02-status-time">16:05</span>
      <span className="s02-status-icons">
        <svg width="20" height="12" viewBox="0 0 20 12"><rect x="0" y="7" width="3" height="5" rx="0.8" fill="currentColor" /><rect x="4.5" y="5" width="3" height="7" rx="0.8" fill="currentColor" /><rect x="9" y="3" width="3" height="9" rx="0.8" fill="currentColor" /><rect x="13.5" y="1" width="3" height="11" rx="0.8" fill="currentColor" opacity="0.35" /></svg>
        <svg width="17" height="12" viewBox="0 0 17 12"><path d="M8.5 9.6a1.6 1.6 0 1 1 0 3.2 1.6 1.6 0 0 1 0-3.2zM8.5 6c1.9 0 3.6.8 4.8 2l-1.8 1.8A4.4 4.4 0 0 0 8.5 8.4c-1.2 0-2.2.5-3 1.4L3.7 8C4.9 6.8 6.6 6 8.5 6zM8.5 2c2.9 0 5.6 1.2 7.5 3.1L14.2 7A8.6 8.6 0 0 0 8.5 4.4c-2.2 0-4.2.9-5.7 2.6L1 5.1A12.6 12.6 0 0 1 8.5 2z" fill="currentColor" transform="translate(0,-2)" /></svg>
        <svg width="26" height="12" viewBox="0 0 26 12"><rect x="0.5" y="0.5" width="21" height="11" rx="3" fill="none" stroke="currentColor" opacity="0.4" /><rect x="2.5" y="2.5" width="15" height="7" rx="1.6" fill="currentColor" /><rect x="23" y="4" width="2.4" height="4" rx="1.2" fill="currentColor" opacity="0.4" /></svg>
      </span>
    </div>
  )
}

export function WaHeader() {
  return (
    <header className="s02-wa-header">
      <span className="s02-wa-back" aria-hidden="true">‹</span>
      <span className="s02-wa-avatar" aria-hidden="true">F</span>
      <span className="s02-wa-title">
        <strong>Familia ❤️</strong>
        <small>Tomi, Mamá ❤️, Papá</small>
      </span>
      <span className="s02-wa-actions" aria-hidden="true">
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#8696a0" strokeWidth="1.8"><path d="M23 7l-7 5 7 5V7z" /><rect x="1" y="5" width="15" height="14" rx="2.5" /></svg>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#8696a0" strokeWidth="1.8"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8 10a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.7 2z" /></svg>
      </span>
    </header>
  )
}

// Fotografía de la garantía: documento doméstico (recurso vectorial local).
// GAP P1 (§8): la especificación exige fotografía real (papel, sombra de
// contacto, luz doméstica). No existe en el repo un recurso fotográfico
// autorizado ni se puede producir legítimamente aquí: esta pieza vectorial
// con grano, luz desigual y perspectiva imperfecta es un placeholder
// consciente, NO una fotografía. No declarar PASS visual por ella.
export function WarrantyPhoto() {
  return (
    <svg className="s02-warranty-photo" viewBox="0 0 607 190" role="img" aria-label="Foto de la garantía de la heladera">
      <defs>
        <linearGradient id="s02desk" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#6b5d4f" /><stop offset="0.55" stopColor="#57493d" /><stop offset="1" stopColor="#453a30" />
        </linearGradient>
        <linearGradient id="s02paper" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f6f1e5" /><stop offset="0.7" stopColor="#eae3d1" /><stop offset="1" stopColor="#d8d0bc" />
        </linearGradient>
        <linearGradient id="s02glare" x1="0" y1="0" x2="1" y2="0.55">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.28" /><stop offset="0.38" stopColor="#ffffff" stopOpacity="0" /><stop offset="1" stopColor="#000000" stopOpacity="0.22" />
        </linearGradient>
        <filter id="s02soft" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="6" /></filter>
        <filter id="s02grain" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" result="n" />
          <feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.06 0" />
          <feComposite operator="over" in2="SourceGraphic" />
        </filter>
      </defs>
      <rect width="607" height="190" fill="url(#s02desk)" filter="url(#s02grain)" />
      <ellipse cx="310" cy="168" rx="240" ry="26" fill="#000" opacity="0.4" filter="url(#s02soft)" />
      <g transform="rotate(-2.5 303 95)">
        <rect x="128" y="12" width="362" height="166" rx="3" fill="#000" opacity="0.5" filter="url(#s02soft)" transform="translate(8 10)" />
        <rect x="128" y="12" width="362" height="166" rx="3" fill="url(#s02paper)" />
        <rect x="128" y="12" width="362" height="166" rx="3" fill="url(#s02glare)" />
        <text x="309" y="48" textAnchor="middle" fontFamily="Georgia, 'Times New Roman', serif" fontSize="27" letterSpacing="6" fill="#3a3428">GARANTÍA</text>
        <rect x="158" y="60" width="302" height="2" fill="#8a7f68" />
        <text x="158" y="82" fontFamily="Georgia, serif" fontSize="12" fill="#4a4436">Heladera · Modelo H-320</text>
        <text x="158" y="97" fontFamily="Georgia, serif" fontSize="9.5" fill="#5c5545">Serie 884102 · Compra 02/11/2023</text>
        {Array.from({ length: 6 }).map((_, i) => (
          <rect key={i} x={158 + (i % 3) * 9} y={108 + i * 10} width={272 - (i % 3) * 24 - (i * 11) % 34} height="4" rx="2" fill="#a09a86" opacity="0.85" />
        ))}
        <rect x="158" y="163" width="96" height="8" rx="4" fill="none" stroke="#6a6350" strokeWidth="1" />
      </g>
    </svg>
  )
}

export function ChatWallpaper() {
  return <div className="s02-chat-wallpaper" aria-hidden="true" />
}

function Stamp({ time }: { time: string }) {
  return <span className="s02-stamp">{time}</span>
}

export function WarrantyBubble() {
  return (
    <div className="s02-bubble s02-bubble-in s02-bubble-warranty" style={{ left: IN_X, width: 655 }}>
      <div className="s02-sender">Tomi</div>
      <WarrantyPhoto />
      <div className="s02-bubble-text s02-bubble-text-hero">{WARRANTY_TEXT}<Stamp time="19:46" /></div>
    </div>
  )
}

export function BubbleIn({ x, w, sender, text, time, hero }: { x: number; w: number; sender: string | null; text: string; time: string; hero?: boolean }) {
  return (
    <div className="s02-bubble s02-bubble-in" style={{ left: x, width: w }}>
      {sender && <div className="s02-sender">{sender}</div>}
      <div className={`s02-bubble-text${hero ? ' s02-bubble-text-hero' : ''}`}>{text}<Stamp time={time} /></div>
    </div>
  )
}

export function BubbleOut({ x, w, text, time, hero }: { x: number; w: number; text: string; time: string; hero?: boolean }) {
  return (
    <div className="s02-bubble s02-bubble-out" style={{ left: x, width: w }}>
      <div className={`s02-bubble-text${hero ? ' s02-bubble-text-hero' : ''}`}>{text}<Stamp time={time} /></div>
    </div>
  )
}

export function HistoryBlocks({
  blocks,
  tops,
  showSent,
  sentPop,
  hideMother,
}: {
  blocks: HistoryBlock[]
  tops: Map<string, number>
  showSent: boolean
  sentPop: number
  hideMother: boolean
}) {
  const topOf = (key: string, fallback: number): number => tops.get(key) ?? fallback
  return (
    <>
      {blocks.map((b, i) => {
        if (b.kind === 'chip') {
          return (
            <div key={`chip-${i}`} className="s02-date-chip" style={{ top: topOf(`chip-${i}`, b.top) }}>
              <span>{b.label}</span>
            </div>
          )
        }
        if (b.kind === 'warranty') {
          return (
            <div key="warranty" className="s02-msg-block" style={{ top: topOf('warranty', b.top), height: b.h }}>
              <WarrantyBubble />
            </div>
          )
        }
        if (b.kind === 'msg') {
          const m: SecondaryMsg = b.msg
          const out = m.from === 'papa'
          return (
            <div key={m.id} className="s02-msg-block" style={{ top: topOf(`msg-${m.id}`, b.top), height: b.h }}>
              {out ? (
                <BubbleOut x={OUT_R - b.w} w={b.w} text={m.text} time={m.time} />
              ) : (
                <BubbleIn x={IN_X} w={b.w} sender={SENDER_LABEL[m.from]} text={m.text} time={m.time} />
              )}
            </div>
          )
        }
        if (b.kind === 'mother') {
          return (
            <div
              key="mother"
              className="s02-msg-block"
              style={{ top: topOf('mother', b.top), height: b.h, visibility: hideMother ? 'hidden' : 'visible' }}
            >
              <BubbleIn x={IN_X} w={b.w} sender="Mamá ❤️" text={MOTHER_TEXT} time="20:14" hero />
            </div>
          )
        }
        if (!showSent) return null
        return (
          <div
            key="sent"
            className="s02-msg-block"
            style={{
              top: topOf('sent', b.top),
              height: b.h,
              opacity: sentPop,
              transform: `scale(${(0.92 + 0.08 * sentPop).toFixed(3)})`,
              transformOrigin: '100% 100%',
            }}
          >
            <BubbleOut x={OUT_R - b.w} w={b.w} text={SENT_TEXT} time="16:05" hero />
          </div>
        )
      })}
    </>
  )
}

// Medidor oculto: reproduce cada burbuja con idéntico CSS y ancho para
// leer su altura real (historyLayout.ts). No afecta al layout visible.
export function HistoryMeasurer({ blocks }: { blocks: HistoryBlock[] }) {
  return (
    <div className="s02-measure" aria-hidden="true">
      {blocks.map((b, i) => {
        if (b.kind === 'chip') {
          return (
            <div key={`chip-${i}`} data-mkey={`chip-${i}`} className="s02-date-chip s02-measure-static">
              <span>{b.label}</span>
            </div>
          )
        }
        if (b.kind === 'warranty') {
          return (
            <div key="warranty" data-mkey="warranty" className="s02-measure-static">
              <WarrantyBubble />
            </div>
          )
        }
        if (b.kind === 'msg') {
          const m = b.msg
          const out = m.from === 'papa'
          return (
            <div key={m.id} data-mkey={`msg-${m.id}`} className="s02-measure-static">
              {out ? (
                <BubbleOut x={0} w={b.w} text={m.text} time={m.time} />
              ) : (
                <BubbleIn x={0} w={b.w} sender={SENDER_LABEL[m.from]} text={m.text} time={m.time} />
              )}
            </div>
          )
        }
        if (b.kind === 'mother') {
          return (
            <div key="mother" data-mkey="mother" className="s02-measure-static">
              <BubbleIn x={0} w={b.w} sender="Mamá ❤️" text={MOTHER_TEXT} time="20:14" hero />
            </div>
          )
        }
        return (
          <div key="sent" data-mkey="sent" className="s02-measure-static">
            <BubbleOut x={0} w={b.w} text={SENT_TEXT} time="16:05" hero />
          </div>
        )
      })}
    </div>
  )
}

export function Composer({ text, sendPulse, top, height }: { text: string; sendPulse?: boolean; top?: number; height?: number }) {
  return (
    <div className="s02-composer" style={top !== undefined || height !== undefined ? { top, height } : undefined}>
      <span className="s02-composer-plus" aria-hidden="true">+</span>
      <div className="s02-composer-input">
        {text.length === 0 ? (
          <span className="s02-composer-placeholder">Mensaje</span>
        ) : (
          <span className="s02-composer-text">{text}<span className="s02-caret" /></span>
        )}
      </div>
      {text.length > 0 ? (
        <span className="s02-sendbtn" style={sendPulse ? { transform: 'scale(0.88)' } : undefined} aria-hidden="true">↑</span>
      ) : (
        <span className="s02-composer-mic" aria-hidden="true">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#8696a0" strokeWidth="1.8"><rect x="9" y="2" width="6" height="12" rx="3" /><path d="M5 10a7 7 0 0 0 14 0M12 19v3" /></svg>
        </span>
      )}
    </div>
  )
}
