// S03 — isotipo auténtico + wordmark (capas derivadas del PNG oficial).
// Todo posicionamiento es absoluto en coords de stage (1280×720) dentro de
// un SVG viewBox equivalente: sin medidas DOM por frame, sin reflow.
//
// El blanco se revela recorriendo la geometría REAL del símbolo: la máscara
// es el trazo central medido de la capa oficial (MAIN_STROKE_D) más las dos
// cabezas con revelación localizada. Sólo se muestran píxeles blancos del
// PNG original: la geometría final es idéntica por construcción.
import {
  PNG, PLUS_PNG, HEAD_MAIN_PNG, HEAD_SECOND_PNG, WHITE_HEX,
  MAIN_STROKE_D, MAIN_STROKE_W,
} from './s03Geometry'
import { S03_ORANGE_URL, S03_WHITE_URL, S03_PLUS_URL, PLUS_CROP, PLUS_CROP_W, PLUS_CROP_H } from './s03BrandAssets'
import type { IsotipoPlacement } from './s03Geometry'

export type WhiteReveal =
  | { mode: 'full' }
  | { mode: 'draw'; stroke: number; head0: number; head1: number }

export type S03IsotipoProps = {
  placement: IsotipoPlacement
  white: WhiteReveal
  /** Radio del naranja en coords PNG; <0 = capa oculta, >=maxR = completa. */
  orangeRadiusPng: number
  orangeMaxPng: number
  plus: { visible: boolean; scale: number; dy: number }
  word: {
    visible: boolean
    text: string
    x: number // ancla izquierda (stage)
    baselineY: number
    size: number
    weight: number
    tracking: number // px de stage (constante durante el movimiento)
    dx: number // desplazamiento lateral coreográfico
    clipLeftStage: number // borde de revelación (Infinity = sin recorte)
    opacity: number
  } | null
  /** Círculo vectorial de relevo del zoom (nitidez a alta escala). */
  vectorHeadOpacity: number
  idSuffix: string
}

export default function S03Isotipo(props: S03IsotipoProps) {
  const { placement, white, orangeRadiusPng, orangeMaxPng, plus, word, vectorHeadOpacity, idSuffix } = props
  const { imgLeft, imgTop, imgSize, k } = placement
  const maskId = `s03wmask-${idSuffix}`
  const clipId = `s03oclip-${idSuffix}`
  const wordClipId = `s03wordclip-${idSuffix}`
  const showOrange = orangeRadiusPng > 0.5
  const orangeFull = orangeRadiusPng >= orangeMaxPng - 0.5
  const drawing = white.mode === 'draw'
  const strokeOff = drawing ? Math.max(0, 100 * (1 - white.stroke)) : 0

  return (
    <g transform={`translate(${imgLeft.toFixed(2)} ${imgTop.toFixed(2)}) scale(${k.toFixed(6)})`}>
      <defs>
        {drawing && (
          <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width={PNG.w} height={PNG.h}>
            {/* Trazo principal: recorre techo→muro→personas en orden real. */}
            <path
              d={MAIN_STROKE_D}
              fill="none" stroke="#fff" strokeWidth={MAIN_STROKE_W}
              strokeLinecap="round" strokeLinejoin="round"
              pathLength={100} strokeDasharray={100}
              strokeDashoffset={strokeOff}
            />
            {/* Cabezas: revelación localizada (radio 0→R). */}
            {white.head0 > 0.001 && (
              <circle cx={HEAD_MAIN_PNG.cx} cy={HEAD_MAIN_PNG.cy} r={Math.max(0.1, HEAD_MAIN_PNG.r * white.head0)} fill="#fff" />
            )}
            {white.head1 > 0.001 && (
              <circle cx={HEAD_SECOND_PNG.cx} cy={HEAD_SECOND_PNG.cy} r={Math.max(0.1, HEAD_SECOND_PNG.r * white.head1)} fill="#fff" />
            )}
          </mask>
        )}
        {showOrange && !orangeFull && (
          <clipPath id={clipId}>
            <circle cx={PLUS_PNG.cx} cy={PLUS_PNG.cy} r={Math.max(0, orangeRadiusPng)} />
          </clipPath>
        )}
        {word && word.visible && Number.isFinite(word.clipLeftStage) && (
          <clipPath id={wordClipId}>
            <rect x={(word.clipLeftStage - imgLeft) / k} y={-2000} width={PNG.w + 4000} height={PNG.h + 4000} />
          </clipPath>
        )}
      </defs>
      {showOrange && (
        <image
          href={S03_ORANGE_URL}
          x="0" y="0" width={PNG.w} height={PNG.h}
          clipPath={orangeFull ? undefined : `url(#${clipId})`}
        />
      )}
      <image
        href={S03_WHITE_URL}
        x="0" y="0" width={PNG.w} height={PNG.h}
        mask={drawing ? `url(#${maskId})` : undefined}
      />
      {plus.visible && (
        <g
          transform={`translate(${PLUS_PNG.cx.toFixed(2)} ${(PLUS_PNG.cy + plus.dy / k).toFixed(2)}) scale(${plus.scale.toFixed(4)}) translate(${(-PLUS_PNG.cx).toFixed(2)} ${(-PLUS_PNG.cy).toFixed(2)})`}
        >
          <image
            href={S03_PLUS_URL}
            x={PLUS_CROP.x0} y={PLUS_CROP.y0} width={PLUS_CROP_W} height={PLUS_CROP_H}
          />
        </g>
      )}
      {vectorHeadOpacity > 0.001 && (
        <circle
          cx={HEAD_MAIN_PNG.cx} cy={HEAD_MAIN_PNG.cy} r={HEAD_MAIN_PNG.r + 8}
          fill={WHITE_HEX} opacity={Math.min(1, vectorHeadOpacity)}
        />
      )}
      {word && word.visible && (
        <g
          clipPath={Number.isFinite(word.clipLeftStage) ? `url(#${wordClipId})` : undefined}
          opacity={word.opacity}
        >
          {/* word coords: el clip vive en espacio PNG; el texto se posiciona
              en stage → se compensa la transform del grupo (inversa). */}
          <text
            x={(word.x - imgLeft) / k + word.dx / k}
            y={(word.baselineY - imgTop) / k}
            fontFamily="Manrope, sans-serif"
            fontWeight={word.weight}
            fontSize={word.size / k}
            letterSpacing={(word.tracking / k).toFixed(3)}
            fill={WHITE_HEX}
          >
            {word.text}
          </text>
        </g>
      )}
    </g>
  )
}
