// S02 V1.6 CINEMATIC — «Una cosa estaba en un chat viejo…»
// Una instancia persistente de WhatsApp + una de Calendario + wallpaper.
// Todo el estado visual deriva de (stepIndex, progress): forward, reverse
// e interrupciones convergen al estado destino sin ownerships colgados.
//
// Step0 = HOLD S02.0 del handoff canónico S01→S02: el Phone Dive es la
// cámara 3D original (s01DiveBridge + s01Director.sampleDiveAt, intervalo,
// curvas y duración del portal donante). S02.0 es fullscreen estable desde
// su primer frame visible: sin zoom CSS, sin segundo teléfono, sin fundidos.

import { useEffect, useMemo, useRef } from 'react'
import type { SlideProps } from '../../presentationTypes'
import { setDiveProgress } from '../S01Chaos/three/s01DiveBridge'
import {
  HISTORY_VIEWPORT_H,
  HISTORY_VIEWPORT_Y,
  MOTHER_TEXT,
  SENT_TEXT,
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
import { useHistoryLayout } from './historyLayout'
import ChatFaceStatic from './PhoneFace'
import QuestionSVG from './QuestionSVG'
import { REACTION_ORDER, ReactionGlyph } from './Reactions'
import {
  ChatWallpaper,
  Composer,
  HistoryBlocks,
  HistoryMeasurer,
  IN_X,
  StatusBar,
  WaHeader,
} from './WhatsApp'
import './s02-cinematic.css'

type Phase = 'active' | 'converging' | 'hidden'
type Props = SlideProps & { phase?: Phase }

// ---------- Geometría maestra ----------
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

// Morph burbuja → fondo (§16). R1 con overscan garantizado.
const MORPH_R1: Rect = { x: -128, y: -86, w: 1536, h: 892 }
// R0 = geometría final del long-press (misma pieza, §15/§18).
// Burbuja de Mamá en flujo: X38, Y253 (madre) — determinista por layout.
const SEL_X = 55
const SEL_Y = 240

// Atenuación de calendario (§11): F0 0 · F25 .08 · F50 .25 · F75 .43 · F100 .50.
function attentionDim(p: number): number {
  const keys: Array<readonly [number, number]> = [[0, 0], [0.25, 0.08], [0.5, 0.25], [0.75, 0.43], [1, 0.5]]
  for (let i = 0; i < keys.length - 1; i++) {
    const [t0, v0] = keys[i]!
    const [t1, v1] = keys[i + 1]!
    if (p <= t1) return lerp(v0, v1, smootherstep((p - t0) / (t1 - t0)))
  }
  return 0.5
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

// Bloque de historial para la superficie dinámica (usa anchos del layout).
function DynBlocks({ blocks, tops, showSent, sentPop, hideMother }: { blocks: HistoryBlock[]; tops: Map<string, number>; showSent: boolean; sentPop: number; hideMother: boolean }) {
  return <HistoryBlocks blocks={blocks} tops={tops} showSent={showSent} sentPop={sentPop} hideMother={hideMother} />
}

// ---------- Componente principal ----------
export default function S02FragmentedInfo({ stepIndex, phase = 'active' }: Props) {
  const step = Math.min(Math.max(stepIndex, 0), 8)
  const p = useStepProgress(step, phase)
  const history = useMemo(() => buildHistory(), [])
  const measureRef = useRef<HTMLDivElement | null>(null)
  // Layout medido (alturas reales de burbuja): única autoridad de tops,
  // scroll anchors y geometría de selección/morph. Estimador sólo pre-medición.
  const layout = useHistoryLayout(history.blocks, measureRef)

  // Handoff canónico S01→S02: el Phone Dive es la cámara 3D original (el
  // progreso lineal de este beat muestrea su intervalo vía el puente; la
  // duración es la del portal original). S02.0 no anima ningún zoom: es el
  // HOLD fullscreen estable y permanece invisible hasta la llegada (p>=1),
  // momento en que la pantalla física ya cubre el viewport → el relevo es
  // píxel-equivalente, sin fade, sin flash, sin segundo movimiento.
  // Sólo se publica cuando este beat es el slide activo: oculta o en
  // converging, S02 no maneja la cámara.
  //
  // PREVIOUS desde S02.1+ vuelve al HOLD (no re-ejecuta el dive): el latch
  // `heldRef` lo mantiene llegado; se libera al salir del slide activo
  // (volver desde S01.3 con NEXT sí re-ejecuta el travelling original).
  const prevStepRef = useRef(step)
  const heldRef = useRef(false)
  if (phase !== 'active') heldRef.current = false
  else if (step === 0 && prevStepRef.current > 0) heldRef.current = true
  else if (step !== 0) heldRef.current = false
  useEffect(() => {
    prevStepRef.current = step
  }, [step])
  const held = step === 0 && heldRef.current
  const diveDriving = step === 0 && phase === 'active'
  useEffect(() => {
    setDiveProgress(diveDriving ? (held ? 1 : p) : null)
  }, [diveDriving, held, p])
  useEffect(() => () => setDiveProgress(null), [])

  // ================= STEP 0 — HOLD S02.0 (handoff 3D→2D) =================
  if (step === 0) {
    const arrived = p >= 1 || held
    return (
      <div
        className="s02-stage opening-layer"
        data-phase={phase}
        data-step={step}
        style={{ visibility: arrived && phase === 'active' ? 'visible' : 'hidden' }}
        aria-hidden={!arrived || phase !== 'active'}
      >
        {/* Instancia única de WhatsApp fullscreen: idéntica a la franja
            central de la textura del teléfono físico (mismo markup que el
            resto de S02: ChatFaceStatic). Sin animación de entrada, sin
            scroll, sin bezel: el primer frame visible YA es el destino. */}
        <ChatFaceStatic />
      </div>
    )
  }

  const motherTopStage = HISTORY_VIEWPORT_Y + 141 // Y253: burbuja de Mamá en reposo
  const SCROLL_TO = layout.motherTop - 141 // burbuja de Mamá → Y253 de stage
  const SCROLL_S3 = layout.sentTop - HISTORY_VIEWPORT_H + 22 // recientes, gap 22
  const SCROLL_END = layout.sentTop + layout.sentH + 22 - HISTORY_VIEWPORT_H // tras envío, gap 22
  const SCROLL_FROM = SCROLL_END

  // ----- scroll / viewport por step -----
  // Steps 1–2: WhatsApp conserva el estado S02.0 (garantía, scroll 0).
  // Step 3+: historial reciente (preparado mientras está fuera de pantalla).
  let scrollTop = 0
  let viewportH = HISTORY_VIEWPORT_H
  let blurPx = 0
  let scrollbarOpacity = 0
  if (step === 3) {
    scrollTop = SCROLL_S3
  } else if (step === 4) {
    const ms = p * 1550
    const kbIn = smootherstep(clamp01(ms / 220))
    const kbOut = smootherstep(clamp01((ms - 1300) / 250))
    const kbP = kbIn * (1 - kbOut)
    viewportH = lerp(HISTORY_VIEWPORT_H, 298, kbP)
    const kbScroll = layout.sentTop - 298 + 16
    scrollTop = ms < 1300 ? lerp(SCROLL_S3, kbScroll, kbP) : lerp(kbScroll, SCROLL_END, kbOut)
  } else if (step === 5) {
    const frac = scrollFraction(p)
    scrollTop = SCROLL_FROM + (SCROLL_TO - SCROLL_FROM) * frac
    // Velocidad instantánea → estela (0 en F100), máx. 3px lógicos.
    const e = 0.004
    const v = ((scrollFraction(Math.min(1, p + e)) - scrollFraction(Math.max(0, p - e))) / (2 * e)) * (SCROLL_FROM - SCROLL_TO) / 560 * 16.7
    blurPx = p >= 1 ? 0 : Math.min(3, Math.abs(v) / 55)
    scrollbarOpacity = p > 0 && p < 1 ? 0.55 : 0
  } else {
    // Steps 1–2: S02.0 (garantía). Steps 6–8: mensaje de Mamá.
    scrollTop = step <= 2 ? 0 : SCROLL_TO
  }

  // ----- Step 4: microsecuencia de input (una sola autoridad: ms) -----
  const ms4 = step === 4 ? p * 1550 : 0
  const kbIn4 = step === 4 ? smootherstep(clamp01(ms4 / 220)) : 0
  const kbOut4 = step === 4 ? smootherstep(clamp01((ms4 - 1300) / 250)) : 0
  const kbP4 = kbIn4 * (1 - kbOut4)
  const typedCount = step === 4 ? Math.floor(clamp01((ms4 - 220) / 750) * SENT_TEXT.length) : 0
  // El texto vive en UN solo lugar por frame: antes del envío en el input,
  // desde el envío sólo en la burbuja. F100: composer vacío.
  const typed = step === 4 && ms4 < 1080 ? SENT_TEXT.slice(0, typedCount) : ''
  const sentVisible = step > 4 || (step === 4 && ms4 >= 1080)
  const sendPop = step === 4 ? smootherstep(clamp01((ms4 - 1080) / 220)) : 1
  const composerY = lerp(621, 410, step === 4 ? kbP4 : 0)
  const composerH = lerp(74, 64, step === 4 ? kbP4 : 0)
  const keyboardY = lerp(720, 474, kbP4)
  const showKeyboard = step === 4 && kbP4 > 0.01

  // ----- App Switcher -----
  let waRect: Rect = WA_FULL
  let calRect: Rect = OFF_RIGHT
  let waVisible = true
  let calVisible = false
  if (step === 1) {
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
  // Status bar sistémica única durante el App Switcher (§7): las barras de
  // cada tarjeta se ocultan y una sola instancia global toma el control.
  const switching = (step === 1 || step === 3) && cardness(waRect) > 0.03 && cardness(calRect) > 0.03

  // ----- Atención (dim calendario) -----
  const dim2 = step === 2 ? attentionDim(p) : step === 3 ? 0.5 * (1 - smootherstep(clamp01(p / 0.4))) : 0

  // ----- Long-press (step 6) + morph (step 7): UNA pieza persistente -----
  const showElevated = step === 6 || step === 7
  const R0: Rect = { x: SEL_X, y: SEL_Y, w: history.motherW, h: layout.motherH }
  let elevRect: Rect = R0
  let elevScale = 1
  let backdrop = 0
  let chromeOpacity = 1 // reacciones + menú
  if (step === 6) {
    const press = smootherstep(clamp01(p / 0.13)) * (1 - smootherstep(clamp01((p - 0.13) / 0.13)))
    elevScale = 1 - 0.015 * press
    const lift = smootherstep(clamp01((p - 0.25) / 0.4))
    elevRect = {
      x: lerp(IN_X, SEL_X, lift),
      y: lerp(motherTopStage, SEL_Y, lift),
      w: history.motherW, h: layout.motherH,
    }
    backdrop = smootherstep(clamp01((p - 0.25) / 0.35))
    chromeOpacity = smootherstep(clamp01((p - 0.64) / 0.19))
  }
  // Morph
  let morphQ = 0
  let morphTextOpacity = 1
  if (step === 7) {
    morphQ = smootherstep(p)
    elevRect = {
      x: lerp(R0.x, MORPH_R1.x, morphQ),
      y: lerp(R0.y, MORPH_R1.y, morphQ),
      w: lerp(R0.w, MORPH_R1.w, morphQ),
      h: lerp(R0.h, MORPH_R1.h, morphQ),
    }
    // Sin backdrop separado: la propia superficie ocluye WhatsApp.
    chromeOpacity = 1 - clamp01(p / 0.15)
    morphTextOpacity = 1 - clamp01((p - 0.08) / 0.38)
  }
  // V1.6.1 §13: la burbuja conserva su silueta redondeada durante toda la
  // expansión visible. El radio crece proporcionalmente al ancho visual y
  // las esquinas desaparecen únicamente al abandonar el encuadre, nunca
  // porque el border-radius se reduzca a cero. Sin salto con el long-press
  // (ambos nacen en 22px).
  const morphRadius = step === 7 ? Math.min(160, 22 + 0.105 * (elevRect.w - R0.w)) : 22
  // Color de la materia: #1f2c34 (burbuja) → #080504 (negro cálido).
  const morphBg = step === 7
    ? `rgb(${[31, 44, 52].map((c, i) => Math.round(lerp(c, [8, 5, 4][i]!, morphQ))).join(',')})`
    : undefined

  // ----- Pregunta (step 8) -----
  const qP = step === 8 ? clamp01(p) : 0
  const showEditorial = step === 7 || step === 8
  // V1.6.1 §15: mientras alguna esquina de la burbuja siga visible, ninguna
  // superficie editorial fullscreen puede cubrirla (la burbuja es la única
  // autoridad material). Cobertura total de R0→R1 en q≈0.83: la editorial
  // entra sólo de 0.85→1 con el mismo color/glow → entrega invisible.
  const editorialQ = step === 7 ? smootherstep((morphQ - 0.85) / 0.15) : 0

  // Home indicator del sistema: oculto con teclado y en fondo editorial.
  const homeOpacity = showKeyboard ? 0 : step === 7 ? 1 - morphQ : step === 8 ? 0 : 1

  return (
    <div className="s02-stage opening-layer" data-phase={phase} data-step={step} aria-hidden={phase !== 'active'}>
      {/* Wallpaper del sistema: fijo, inmóvil, detrás de todo. */}
      <div className="s02-wallpaper" aria-hidden="true" />

      {/* ============ WHATSAPP (instancia única) ============ */}
      <section
        className="s02-appcard"
        aria-label="WhatsApp"
        data-app="whatsapp"
        data-naked={switching}
        style={{
          transform: `translate(${waRect.x.toFixed(1)}px, ${waRect.y.toFixed(1)}px)`,
          visibility: waVisible ? 'visible' : 'hidden',
        }}
      >
        {/* Contenido fijo 1280×720 con escala: sin reflow ni deformación interna. */}
        <div
          className="s02-appscale"
          style={{
            transform: `scale(${waScale.toFixed(4)})`,
            borderRadius: Math.round(waRadius * 10) / 10,
            boxShadow: waShadow,
          }}
        >
          <StatusBar />
          <WaHeader />
          <ChatWallpaper />
          <div className="s02-history" style={{ top: HISTORY_VIEWPORT_Y, height: viewportH }}>
            <div
              className="s02-history-inner"
              style={{
                height: layout.contentH,
                transform: `translateY(${-scrollTop.toFixed(1)}px)`,
                filter: blurPx > 0.05 ? `blur(${blurPx.toFixed(2)}px)` : 'none',
              }}
            >
              <DynBlocks blocks={history.blocks} tops={layout.tops} showSent={sentVisible} sentPop={sendPop} hideMother={step >= 6} />
            </div>
            {step === 5 && (
              <div
                className="s02-scrollbar"
                style={{
                  opacity: scrollbarOpacity,
                  height: Math.max(28, (HISTORY_VIEWPORT_H / layout.contentH) * HISTORY_VIEWPORT_H),
                  top: (scrollTop / layout.contentH) * HISTORY_VIEWPORT_H,
                }}
              />
            )}
          </div>
          <Composer text={typed} sendPulse={step === 4 && ms4 >= 1080 && ms4 < 1130} top={composerY} height={composerH} />
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
        data-naked={switching}
        style={{
          transform: `translate(${calRect.x.toFixed(1)}px, ${calRect.y.toFixed(1)}px)`,
          visibility: calVisible ? 'visible' : 'hidden',
        }}
      >
        <div
          className="s02-appscale s02-cal"
          style={{
            transform: `scale(${calScale.toFixed(4)})`,
            borderRadius: Math.round(calRadius * 10) / 10,
            boxShadow: calShadow,
          }}
        >
          <StatusBar onDark={false} />
          <header className="s02-cal-header">
            <span className="s02-cal-today">Hoy</span>
            <strong>Noviembre</strong>
            <span className="s02-cal-plus" aria-hidden="true">+</span>
          </header>
          <div className="s02-cal-day">
            <span className="s02-cal-dow">jueves</span>
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

      {/* Status bar sistémica única durante el App Switcher. */}
      {switching && (
        <div className="s02-sysbar" aria-hidden="true">
          <StatusBar />
        </div>
      )}

      {/* Atención al expositor (§11): overlay editorial uniforme. */}
      {dim2 > 0.001 && <div className="s02-attention" style={{ opacity: dim2.toFixed(3) }} aria-hidden="true" />}

      {/* ============ INTERACCIÓN: long-press (misma pieza del historial) ============ */}
      {showElevated && step === 6 && <div className="s02-backdrop" style={{ opacity: backdrop.toFixed(3) }} aria-hidden="true" />}
      {/* El backdrop se retira con fundido rápido al iniciar el morph (sin pop). */}
      {showElevated && step === 7 && morphQ < 0.12 && (
        <div className="s02-backdrop" style={{ opacity: (1 - smootherstep(morphQ / 0.12)).toFixed(3) }} aria-hidden="true" />
      )}
      {showElevated && (
        <div
          className="s02-elevated"
          style={{
            left: elevRect.x, top: elevRect.y, width: elevRect.w, height: elevRect.h,
            transform: `scale(${elevScale.toFixed(4)})`,
            borderRadius: Math.round(morphRadius * 10) / 10,
            background: morphBg,
          }}
        >
          {step === 7 && <div className="s02-morph-warm" style={{ opacity: morphQ.toFixed(3) }} aria-hidden="true" />}
          <div className="s02-elevated-text" style={{ opacity: morphTextOpacity.toFixed(3) }}>
            <div className="s02-sender">Mamá ❤️</div>
            <div className="s02-bubble-text s02-bubble-text-hero">{MOTHER_TEXT}<span className="s02-stamp">20:14</span></div>
          </div>
          {step === 6 && (
            <>
              <div className="s02-reactions" style={{ opacity: chromeOpacity.toFixed(3), transform: `translateY(${((1 - chromeOpacity) * 8).toFixed(1)}px)` }} aria-hidden="true">
                {REACTION_ORDER.map(k => <span key={k}><ReactionGlyph kind={k} /></span>)}
              </div>
              <div className="s02-ctxmenu" style={{ opacity: chromeOpacity.toFixed(3), transform: `translateY(${((1 - chromeOpacity) * 8).toFixed(1)}px)` }} aria-hidden="true">
                {['Responder', 'Reenviar', 'Copiar', 'Destacar'].map(a => <span key={a}>{a}</span>)}
              </div>
            </>
          )}
        </div>
      )}

      {/* ============ FONDO EDITORIAL + PREGUNTA ============ */}
      {showEditorial && (step === 8 || editorialQ > 0) && <div className="s02-editorial" style={step === 7 ? { opacity: editorialQ.toFixed(3) } : undefined} aria-hidden="true" />}
      {step === 8 && (
        <div className="s02-question-wrap" role="heading" aria-level={1}>
          <QuestionSVG revealP={qP} idSuffix="s02" />
        </div>
      )}

      {/* Home indicator del sistema: ownership único. */}
      <div className="s02-home" style={{ opacity: homeOpacity.toFixed(3) }} aria-hidden="true"><span /></div>

      {/* Medidor oculto de alturas reales (historyLayout). */}
      <div ref={measureRef} style={{ position: 'absolute', top: 0, left: 0 }}>
        <HistoryMeasurer blocks={history.blocks} />
      </div>
    </div>
  )
}
