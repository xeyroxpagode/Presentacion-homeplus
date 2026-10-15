// S02 V1.5 CINEMATIC — «Una cosa estaba en un chat viejo…»
// Reemplaza la escena antigua de íconos (V1.3) y el chat del dentista.
// Una instancia persistente de WhatsApp + una de Calendario + un wallpaper.
// Todo el estado visual deriva de (stepIndex, progress): forward, reverse e
// interrupciones convergen al estado destino sin ownerships colgados.

import { useMemo } from 'react'
import type { SlideProps } from '../../presentationTypes'
import {
  HISTORY_VIEWPORT_Y,
  MOTHER_TEXT,
  QUESTION_LINES,
  SENT_TEXT,
  SENDER_LABEL,
  WARRANTY_TEXT,
  buildHistory,
  type HistoryBlock,
} from './s02Data'
import {
  clamp01,
  lerp,
  smootherstep,
  scrollFraction,
  trackRect,
  useStepProgress,
  type Rect,
} from './useStepProgress'
import './s02-cinematic.css'

type Phase = 'active' | 'converging' | 'hidden'
type Props = SlideProps & { phase?: Phase }

// ---------- Geometría maestra (targets nominales §03–§17) ----------
const WA_FULL: Rect = { x: 0, y: 0, w: 1280, h: 720 }
const CAL_FULL: Rect = WA_FULL
const OFF_LEFT: Rect = { x: -1400, y: 22, w: 1203, h: 676 }
const OFF_RIGHT: Rect = { x: 1400, y: 22, w: 1203, h: 676 }

// App Switcher ida (WA fullscreen → sale izquierda; CAL entra derecha).
const WA_OUT_KEYS: ReadonlyArray<readonly [number, Rect]> = [
  [0, WA_FULL],
  [0.15, { x: 29, y: 16, w: 1222, h: 688 }],
  [0.35, { x: -260, y: 22, w: 1203, h: 676 }],
  [0.5, { x: -565, y: 22, w: 1203, h: 676 }],
  [0.7, { x: -1050, y: 22, w: 1203, h: 676 }],
  [0.85, { x: -1290, y: 22, w: 1203, h: 676 }],
  [1, OFF_LEFT],
]
const CAL_IN_KEYS: ReadonlyArray<readonly [number, Rect]> = [
  [0, OFF_RIGHT],
  [0.15, { x: 1380, y: 22, w: 1203, h: 676 }],
  [0.35, { x: 970, y: 22, w: 1203, h: 676 }],
  [0.5, { x: 700, y: 22, w: 1203, h: 676 }],
  [0.7, { x: 205, y: 22, w: 1203, h: 676 }],
  [0.85, { x: 24, y: 14, w: 1232, h: 692 }],
  [1, CAL_FULL],
]
// Regreso: espejo geométrico (CAL se contrae a la derecha, WA vuelve).
const CAL_OUT_KEYS: ReadonlyArray<readonly [number, Rect]> = [
  [0, CAL_FULL],
  [0.15, { x: 24, y: 14, w: 1232, h: 692 }],
  [0.3, { x: 205, y: 22, w: 1203, h: 676 }],
  [0.5, { x: 700, y: 22, w: 1203, h: 676 }],
  [0.65, { x: 970, y: 22, w: 1203, h: 676 }],
  [0.85, { x: 1380, y: 22, w: 1203, h: 676 }],
  [1, OFF_RIGHT],
]
const WA_IN_KEYS: ReadonlyArray<readonly [number, Rect]> = [
  [0, OFF_LEFT],
  [0.15, { x: -1290, y: 22, w: 1203, h: 676 }],
  [0.3, { x: -1050, y: 22, w: 1203, h: 676 }],
  [0.5, { x: -565, y: 22, w: 1203, h: 676 }],
  [0.65, { x: -260, y: 22, w: 1203, h: 676 }],
  [0.85, { x: 29, y: 16, w: 1222, h: 688 }],
  [1, WA_FULL],
]

// Morph burbuja → fondo (§15). R1 con overscan garantizado.
const MORPH_R1: Rect = { x: -128, y: -86, w: 1536, h: 892 }
// R0 = rectángulo seleccionado real (misma pieza que el long-press, §18).
// NOTA QA: nominal §14 (265,228,675,127); se conserva centro y tipografía
// con el tamaño real medido (655×146) para no cambiar el wrapping.
const SEL_RECT: Rect = { x: 274, y: 218, w: 655, h: 146 }
const NORM_RECT: Rect = { x: 245, y: 250, w: 655, h: 146 }

// ---------- Piezas iOS ----------
function StatusBar() {
  return (
    <div className="s02-statusbar" aria-hidden="true">
      <span className="s02-status-time">16:05</span>
      <span className="s02-status-icons">
        <svg width="20" height="12" viewBox="0 0 20 12"><rect x="0" y="7" width="3" height="5" rx="0.8" fill="currentColor" /><rect x="4.5" y="5" width="3" height="7" rx="0.8" fill="currentColor" /><rect x="9" y="3" width="3" height="9" rx="0.8" fill="currentColor" /><rect x="13.5" y="1" width="3" height="11" rx="0.8" fill="currentColor" opacity="0.35" /></svg>
        <svg width="17" height="12" viewBox="0 0 17 12"><path d="M8.5 9.6a1.6 1.6 0 1 1 0 3.2 1.6 1.6 0 0 1 0-3.2zM8.5 6c1.9 0 3.6.8 4.8 2l-1.8 1.8A4.4 4.4 0 0 0 8.5 8.4c-1.2 0-2.2.5-3 1.4L3.7 8C4.9 6.8 6.6 6 8.5 6zM8.5 2c2.9 0 5.6 1.2 7.5 3.1L14.2 7A8.6 8.6 0 0 0 8.5 4.4c-2.2 0-4.2.9-5.7 2.6L1 5.1A12.6 12.6 0 0 1 8.5 2z" fill="currentColor" transform="translate(0,-2)" /></svg>
        <svg width="26" height="12" viewBox="0 0 26 12"><rect x="0.5" y="0.5" width="21" height="11" rx="3" fill="none" stroke="currentColor" opacity="0.4" /><rect x="2.5" y="2.5" width="15" height="7" rx="1.6" fill="currentColor" /><rect x="23" y="4" width="2.4" height="4" rx="1.2" fill="currentColor" opacity="0.4" /></svg>
      </span>
    </div>
  )
}

// Foto de garantía: documento cotidiano fotografiado (asset local inline).
function WarrantyPhoto() {
  return (
    <svg className="s02-warranty-photo" viewBox="0 0 583 173" role="img" aria-label="Foto de la garantía de la heladera">
      <defs>
        <linearGradient id="s02desk" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#6b5d4f" /><stop offset="0.55" stopColor="#57493d" /><stop offset="1" stopColor="#463c32" />
        </linearGradient>
        <linearGradient id="s02paper" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f4efe4" /><stop offset="0.7" stopColor="#e9e2d2" /><stop offset="1" stopColor="#d9d1bd" />
        </linearGradient>
        <linearGradient id="s02glare" x1="0" y1="0" x2="1" y2="0.6">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.22" /><stop offset="0.4" stopColor="#ffffff" stopOpacity="0" /><stop offset="1" stopColor="#000000" stopOpacity="0.18" />
        </linearGradient>
        <filter id="s02soft" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="6" /></filter>
      </defs>
      <rect width="583" height="173" fill="url(#s02desk)" />
      <ellipse cx="300" cy="150" rx="230" ry="26" fill="#000" opacity="0.35" filter="url(#s02soft)" />
      <g transform="rotate(-3 291 86)">
        <rect x="120" y="8" width="350" height="158" rx="3" fill="#000" opacity="0.45" filter="url(#s02soft)" transform="translate(7 9)" />
        <rect x="120" y="8" width="350" height="158" rx="3" fill="url(#s02paper)" />
        <rect x="120" y="8" width="350" height="158" rx="3" fill="url(#s02glare)" />
        <text x="295" y="42" textAnchor="middle" fontFamily="Georgia, serif" fontSize="26" letterSpacing="6" fill="#3a3428">GARANTÍA</text>
        <rect x="150" y="54" width="290" height="2" fill="#8a7f68" />
        <text x="150" y="76" fontFamily="Georgia, serif" fontSize="11" fill="#4a4436">Heladera · Modelo H-320 · Serie 884102</text>
        {Array.from({ length: 7 }).map((_, i) => (
          <rect key={i} x={150 + (i % 3) * 8} y={88 + i * 10} width={264 - (i % 3) * 22 - (i * 7) % 30} height="4" rx="2" fill="#a09a86" opacity="0.85" />
        ))}
        <rect x="150" y="150" width="90" height="7" rx="3.5" fill="none" stroke="#6a6350" strokeWidth="1" />
      </g>
    </svg>
  )
}

function ChatWallpaper() {
  return <div className="s02-chat-wallpaper" aria-hidden="true" />
}

// ---------- Historial ----------
function BubbleShell({ x, w, children, kind }: { x: number; w: number; children: React.ReactNode; kind: 'in' | 'out' }) {
  return (
    <div className={`s02-bubble s02-bubble-${kind}`} style={{ left: x, width: w }}>
      {children}
    </div>
  )
}

function HistoryBlocks({ blocks, showSent, sentPop, hideMother }: { blocks: HistoryBlock[]; showSent: boolean; sentPop: number; hideMother: boolean }) {
  return (
    <>
      {blocks.map((b, i) => {
        if (b.kind === 'chip') {
          return (
            <div key={i} className="s02-date-chip" style={{ top: b.top }}>
              <span>{b.label}</span>
            </div>
          )
        }
        if (b.kind === 'warranty') {
          return (
            <div key={i} className="s02-msg-block" style={{ top: b.top, height: b.h }}>
              <BubbleShell x={220} w={630} kind="in">
                <div className="s02-sender">Tomi</div>
                <WarrantyPhoto />
                <div className="s02-bubble-text s02-bubble-text-hero">{WARRANTY_TEXT}<span className="s02-stamp">19:46</span></div>
              </BubbleShell>
            </div>
          )
        }
        if (b.kind === 'msg') {
          const m = b.msg
          const out = m.from === 'papa'
          return (
            <div key={m.id} className="s02-msg-block" style={{ top: b.top, height: b.h }}>
              <BubbleShell x={out ? 735 : 245} w={out ? 410 : 620} kind={out ? 'out' : 'in'}>
                {!out && <div className="s02-sender">{SENDER_LABEL[m.from]}</div>}
                <div className="s02-bubble-text">{m.text}<span className="s02-stamp">{m.time}</span></div>
              </BubbleShell>
            </div>
          )
        }
        if (b.kind === 'mother') {
          return (
            <div key="mother" className="s02-msg-block" style={{ top: b.top, height: b.h, visibility: hideMother ? 'hidden' : 'visible' }}>
              <div style={{ position: 'absolute', top: 12, left: 0, right: 0, height: 146 }}>
                <BubbleShell x={245} w={655} kind="in">
                  <div className="s02-sender">Mamá ❤️</div>
                  <div className="s02-bubble-text s02-bubble-text-hero">{MOTHER_TEXT}<span className="s02-stamp">20:14</span></div>
                </BubbleShell>
              </div>
            </div>
          )
        }
        // sent
        if (!showSent) return null
        return (
          <div
            key="sent"
            className="s02-msg-block"
            style={{ top: b.top, height: b.h, opacity: sentPop, transform: `scale(${0.92 + 0.08 * sentPop})`, transformOrigin: '100% 100%' }}
          >
            <BubbleShell x={735} w={410} kind="out">
              <div className="s02-bubble-text s02-bubble-text-hero">{SENT_TEXT}<span className="s02-stamp">16:05</span></div>
            </BubbleShell>
          </div>
        )
      })}
    </>
  )
}

// ---------- Teclado iOS (landscape 16:9, español) ----------
const KB_ROWS = ['QWERTYUIOP', 'ASDFGHJKLÑ', 'ZXCVBNM']
function Keyboard({ typed, opacity }: { typed: string; opacity: number }) {
  const last = typed.slice(-1).toUpperCase()
  return (
    <div className="s02-keyboard" style={{ opacity }} aria-hidden="true">
      {KB_ROWS.map((row, r) => (
        <div key={r} className="s02-kb-row">
          {r === 2 && <span className="s02-key s02-key-mod">⇧</span>}
          {row.split('').map(ch => (
            <span key={ch} className={`s02-key${last === ch ? ' s02-key-hit' : ''}`}>{ch.toLowerCase()}</span>
          ))}
          {r === 2 && <span className="s02-key s02-key-mod">⌫</span>}
        </div>
      ))}
      <div className="s02-kb-row">
        <span className="s02-key s02-key-mod s02-key-wide">123</span>
        <span className="s02-key s02-key-mod">ES</span>
        <span className="s02-key s02-key-space">espacio</span>
        <span className="s02-key s02-key-mod">.</span>
        <span className="s02-key s02-key-mod s02-key-wide">intro</span>
      </div>
      <div className="s02-kb-home"><span /></div>
    </div>
  )
}

// ---------- Componente principal ----------
export default function S02FragmentedInfo({ stepIndex, phase = 'active' }: Props) {
  const step = Math.min(Math.max(stepIndex, 0), 8)
  const p = useStepProgress(step, phase)
  const history = useMemo(() => buildHistory(), [])

  const motherBubbleTop = history.motherTop + 12
  const SCROLL_TO = motherBubbleTop - 140
  const SCROLL_S3 = history.sentTop - 494
  const SCROLL_END = history.contentH - 502
  const SCROLL_FROM = SCROLL_END

  // ----- scroll / viewport por step -----
  let scrollTop = 0
  let viewportH = 510
  let blurPx = 0
  let scrollbarOpacity = 0
  if (step >= 3 && step <= 8) {
    if (step === 3) scrollTop = SCROLL_S3
    else if (step === 4) {
      const ms = p * 1550
      const kbIn = smootherstep(clamp01(ms / 220))
      const kbOut = smootherstep(clamp01((ms - 1300) / 250))
      const kbP = kbIn * (1 - kbOut)
      viewportH = lerp(510, 300, kbP)
      const kbScroll = history.sentTop - 300 + 16
      scrollTop = ms < 1300 ? lerp(SCROLL_S3, kbScroll, kbP) : lerp(kbScroll, SCROLL_END, kbOut)
    } else if (step === 5) {
      const frac = scrollFraction(p)
      scrollTop = SCROLL_FROM + (SCROLL_TO - SCROLL_FROM) * frac
      // Velocidad instantánea → estela (0 en F100).
      const e = 0.004
      const v = ((scrollFraction(Math.min(1, p + e)) - scrollFraction(Math.max(0, p - e))) / (2 * e)) * (SCROLL_FROM - SCROLL_TO) / 1150 * 16.7
      blurPx = p >= 1 ? 0 : Math.min(5, Math.abs(v) / 55)
      scrollbarOpacity = p > 0 && p < 1 ? 0.55 : 0
    } else {
      scrollTop = SCROLL_TO
    }
  }

  // ----- Step 4: microsecuencia de input (una sola autoridad: ms) -----
  const ms4 = step === 4 ? p * 1550 : 0
  const kbP4 = step === 4 ? smootherstep(clamp01(ms4 / 220)) * (1 - smootherstep(clamp01((ms4 - 1300) / 250))) : step > 4 ? 0 : 0
  const typedCount = step === 4 ? Math.floor(clamp01((ms4 - 220) / 750) * SENT_TEXT.length) : 0
  // El texto vive en UN solo lugar por frame: antes del envío en el input,
  // desde el envío sólo en la burbuja. F100: composer vacío.
  const typed = step === 4 && ms4 < 1080 ? SENT_TEXT.slice(0, typedCount) : ''
  const sentVisible = step > 4 || (step === 4 && ms4 >= 1080)
  const sendPop = step === 4 ? smootherstep(clamp01((ms4 - 1080) / 220)) : 1
  const composerY = lerp(620, 410, step === 4 ? smootherstep(clamp01(ms4 / 220)) * (1 - smootherstep(clamp01((ms4 - 1300) / 250))) : 0)
  const keyboardY = lerp(720, 474, kbP4)
  const showKeyboard = step === 4 && kbP4 > 0.01

  // ----- App Switcher -----
  let waRect: Rect = WA_FULL
  let calRect: Rect = OFF_RIGHT
  let waVisible = true
  let calVisible = false
  if (step === 0) { waRect = WA_FULL; calVisible = false }
  else if (step === 1) {
    const q = smootherstep(p)
    waRect = trackRect(WA_OUT_KEYS, q)
    calRect = trackRect(CAL_IN_KEYS, q)
    waVisible = true; calVisible = true
  } else if (step === 2) {
    waRect = OFF_LEFT; calRect = CAL_FULL; waVisible = false; calVisible = true
  } else if (step === 3) {
    const q = smootherstep(p)
    waRect = trackRect(WA_IN_KEYS, q)
    calRect = trackRect(CAL_OUT_KEYS, q)
    waVisible = true; calVisible = true
  } else {
    waRect = WA_FULL; calVisible = false
  }
  const cardness = (r: Rect) => clamp01(1 - r.w / 1280)
  const waScale = waRect.w / 1280
  const calScale = calRect.w / 1280
  const waRadius = (cardness(waRect) * 26) / Math.max(0.5, waScale)
  const calRadius = (cardness(calRect) * 26) / Math.max(0.5, calScale)
  const waShadow = cardness(waRect) > 0.02 ? '0 30px 80px rgba(0,0,0,0.45)' : 'none'
  const calShadow = cardness(calRect) > 0.02 ? '0 30px 80px rgba(0,0,0,0.45)' : 'none'

  // ----- Atención (dim calendario) -----
  const dim2 = step === 2 ? smootherstep(p) * 0.52 : step === 3 ? (1 - smootherstep(clamp01(p / 0.33))) * 0.52 : 0

  // ----- Long-press (step 6) + morph (step 7): UNA pieza persistente -----
  const showElevated = step === 6 || step === 7
  let elevRect: Rect = SEL_RECT
  let elevScale = 1
  let backdrop = 0
  let chromeOpacity = 1 // reacciones + menú
  if (step === 6) {
    const press = smootherstep(clamp01(p / 0.13)) * (1 - smootherstep(clamp01((p - 0.13) / 0.13)))
    elevScale = 1 - 0.015 * press
    const lift = smootherstep(clamp01((p - 0.25) / 0.4))
    elevRect = {
      x: lerp(NORM_RECT.x, SEL_RECT.x, lift),
      y: lerp(NORM_RECT.y, SEL_RECT.y, lift),
      w: NORM_RECT.w, h: NORM_RECT.h,
    }
    backdrop = smootherstep(clamp01((p - 0.25) / 0.35))
    chromeOpacity = smootherstep(clamp01((p - 0.64) / 0.19))
  }
  // Morph
  let morphQ = 0
  let morphColor = '#1f2c34'
  let morphTextOpacity = 1
  if (step === 7) {
    morphQ = smootherstep(p)
    elevRect = {
      x: lerp(SEL_RECT.x, MORPH_R1.x, morphQ),
      y: lerp(SEL_RECT.y, MORPH_R1.y, morphQ),
      w: lerp(SEL_RECT.w, MORPH_R1.w, morphQ),
      h: lerp(SEL_RECT.h, MORPH_R1.h, morphQ),
    }
    // Sin backdrop separado: la propia superficie ocluye WhatsApp.
    chromeOpacity = 1 - clamp01(p / 0.15)
    morphTextOpacity = 1 - clamp01(p / 0.3)
    const c0 = [31, 44, 52]
    const c1 = [6, 4, 4]
    morphColor = `rgb(${c0.map((c, i) => Math.round(lerp(c, c1[i]!, morphQ))).join(',')})`
  }
  const morphRadius = step === 7 ? 22 * (1 - morphQ) : 22
  const morphGlow = step === 7 ? Math.pow(morphQ, 2) * 0.14 : 0

  // ----- Pregunta (step 8) -----
  const qP = step === 8 ? smootherstep(p) : 0
  const showEditorial = step === 7 || step === 8

  // Home indicator del sistema: oculto con teclado y en fondo editorial.
  const homeOpacity = showKeyboard ? 0 : step === 7 ? 1 - morphQ : step === 8 ? 0 : 1

  const revealBlack = step === 0 ? 1 - p : 0

  return (
    <div className="s02-stage opening-layer" data-phase={phase} data-step={step} aria-hidden={phase !== 'active'}>
      {/* Wallpaper del sistema: fijo, inmóvil, detrás de todo. */}
      <div className="s02-wallpaper" aria-hidden="true" />

      {/* ============ WHATSAPP (instancia única) ============ */}
      <section
        className="s02-appcard"
        aria-label="WhatsApp"
        data-app="whatsapp"
        style={{
          transform: `translate(${waRect.x}px, ${waRect.y}px)`,
          visibility: waVisible ? 'visible' : 'hidden',
        }}
      >
        {/* Contenido fijo 1280×720 con escala: sin reflow ni deformación interna. */}
        <div
          className="s02-appscale"
          style={{
            transform: `scale(${waScale})`,
            borderRadius: waRadius,
            boxShadow: waShadow,
          }}
        >
          <StatusBar />
          <header className="s02-wa-header">
            <span className="s02-wa-back">‹</span>
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
          <ChatWallpaper />
          <div className="s02-history" style={{ top: HISTORY_VIEWPORT_Y, height: viewportH }}>
            <div
              className="s02-history-inner"
              style={{
                height: history.contentH,
                transform: `translateY(${-scrollTop}px)`,
                filter: blurPx > 0.05 ? `blur(${blurPx.toFixed(2)}px)` : 'none',
              }}
            >
              <HistoryBlocks blocks={history.blocks} showSent={sentVisible} sentPop={sendPop} hideMother={step >= 6} />
            </div>
            {step === 5 && (
              <div
                className="s02-scrollbar"
                style={{
                  opacity: scrollbarOpacity,
                  height: Math.max(28, (510 / history.contentH) * 510),
                  top: (scrollTop / history.contentH) * 510,
                }}
              />
            )}
          </div>
          <div className="s02-composer" style={{ top: composerY }}>
            <span className="s02-composer-plus" aria-hidden="true">+</span>
            <div className="s02-composer-input">
              {typed.length === 0 ? (
                <span className="s02-composer-placeholder">Mensaje</span>
              ) : (
                <span className="s02-composer-text">{typed}<span className="s02-caret" /></span>
              )}
            </div>
            {typed.length > 0 ? (
              <span
                className="s02-sendbtn"
                style={step === 4 && ms4 >= 1080 && ms4 < 1130 ? { transform: 'scale(0.88)' } : undefined}
                aria-hidden="true"
              >↑</span>
            ) : (
              <span className="s02-composer-mic" aria-hidden="true">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#8696a0" strokeWidth="1.8"><rect x="9" y="2" width="6" height="12" rx="3" /><path d="M5 10a7 7 0 0 0 14 0M12 19v3" /></svg>
              </span>
            )}
          </div>
          {showKeyboard && (
            <div className="s02-keyboard-slot" style={{ top: keyboardY }}>
              <Keyboard typed={typed} opacity={kbP4} />
            </div>
          )}
        </div>
        {cardness(waRect) > 0.25 && <div className="s02-card-label">WhatsApp</div>}
      </section>

      {/* ============ CALENDARIO (instancia única) ============ */}
      <section
        className="s02-appcard"
        aria-label="Calendario"
        data-app="calendar"
        style={{
          transform: `translate(${calRect.x}px, ${calRect.y}px)`,
          visibility: calVisible ? 'visible' : 'hidden',
        }}
      >
        <div
          className="s02-appscale s02-cal"
          style={{
            transform: `scale(${calScale})`,
            borderRadius: calRadius,
            boxShadow: calShadow,
          }}
        >
          <StatusBar />
          <header className="s02-cal-header">
            <span className="s02-cal-today">Hoy</span>
            <strong>Noviembre 2026</strong>
            <span className="s02-cal-plus" aria-hidden="true">+</span>
          </header>
          <div className="s02-cal-day">
            <span className="s02-cal-dow">lunes</span>
            <span className="s02-cal-dnum">16</span>
          </div>
          <div className="s02-cal-event s02-cal-school">
            <span className="s02-cal-bar" />
            <span className="s02-cal-etitle">Colegio · Tomi</span>
            <span className="s02-cal-etime">07:30–16:00</span>
          </div>
          <div className="s02-cal-event s02-cal-training">
            <span className="s02-cal-bar" />
            <span className="s02-cal-etitle">Entrenamiento · Tomi</span>
            <span className="s02-cal-etime">16:30–18:30</span>
          </div>
        </div>
        {cardness(calRect) > 0.25 && <div className="s02-card-label">Calendario</div>}
      </section>

      {/* Atención al expositor (§10): overlay editorial uniforme. */}
      {dim2 > 0.001 && <div className="s02-attention" style={{ opacity: dim2 }} aria-hidden="true" />}

      {/* ============ INTERACCIÓN: long-press (misma pieza del historial) ============ */}
      {showElevated && step === 6 && <div className="s02-backdrop" style={{ opacity: backdrop }} aria-hidden="true" />}
      {showElevated && (
        <div
          className="s02-elevated"
          style={{
            left: elevRect.x, top: elevRect.y, width: elevRect.w, height: elevRect.h,
            transform: `scale(${elevScale})`,
            borderRadius: morphRadius,
            background: step === 7 ? morphColor : undefined,
            boxShadow: step === 7 && morphGlow > 0.005 ? `0 0 120px rgba(231,100,63,${morphGlow.toFixed(3)})` : undefined,
          }}
        >
          <div className="s02-elevated-text" style={{ opacity: morphTextOpacity }}>
            <div className="s02-sender">Mamá ❤️</div>
            <div className="s02-bubble-text s02-bubble-text-hero">{MOTHER_TEXT}<span className="s02-stamp">20:14</span></div>
          </div>
          {step === 6 && (
            <>
              <div className="s02-reactions" style={{ opacity: chromeOpacity, transform: `translateY(${((1 - chromeOpacity) * 8).toFixed(1)}px)` }} aria-hidden="true">
                {['👍', '❤️', '😂', '😮', '😢', '🙏'].map(e => <span key={e}>{e}</span>)}
              </div>
              <div className="s02-ctxmenu" style={{ opacity: chromeOpacity, transform: `translateY(${((1 - chromeOpacity) * 8).toFixed(1)}px)` }} aria-hidden="true">
                {['Responder', 'Reenviar', 'Copiar', 'Destacar'].map(a => <span key={a}>{a}</span>)}
              </div>
            </>
          )}
          {step === 7 && chromeOpacity > 0.001 && <div className="s02-morph-fade" style={{ opacity: chromeOpacity }} />}
        </div>
      )}

      {/* ============ FONDO EDITORIAL + PREGUNTA ============ */}
      {showEditorial && step === 8 && <div className="s02-editorial" aria-hidden="true" />}
      {step === 8 && (
        <div
          className="s02-question"
          style={{ opacity: qP, transform: `translateY(${((1 - qP) * 8).toFixed(2)}px)` }}
          role="heading"
          aria-level={1}
        >
          {QUESTION_LINES.map(l => <span key={l} className="s02-question-line">{l}</span>)}
        </div>
      )}

      {/* Home indicator del sistema: ownership único. */}
      <div className="s02-home" style={{ opacity: homeOpacity }} aria-hidden="true"><span /></div>

      {/* Reveal S01→S02: la interfaz ya está montada debajo del negro. */}
      {step === 0 && revealBlack > 0.001 && <div className="s02-reveal" style={{ opacity: revealBlack }} aria-hidden="true" />}
    </div>
  )
}

