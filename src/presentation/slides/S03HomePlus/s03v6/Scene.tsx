// S03 V6 — renderer SVG de la escena (lienzo maestro 1920×1080).
// Pinta el SceneState producido por computeScene. Capas por orden de pintado:
// refs → grupo del contexto Juli → anotación → contextos secundarios → avatares
// → conectores → hogar → isotipo → títulos → encabezado → lockup → señal → zoom.
import {
  CANVAS, INK_BG, ORANGE, TYPE_WHITE, TYPE_GRAY, MONO_DARK, JULI_SKIN,
  COLOR_B, COLOR_C, S04_BG,
  JULI, GLYPH_INFO,
  CONTEXT_SHOPPING, CONTEXT_ENCOUNTER,
  MEMBER_AVATAR,
  ISOTYPE_BOX, GROUP_PIVOT_O,
} from './geometry'
import { placeIsotipo } from '../s03Geometry'
import { measureText } from './measure'
import { lerp } from './easing'
import { Q0 } from './timeline'
import type { LockPose } from './timeline'
import type { SceneState, TextSpec, ThreadState } from './timeline'
import originalLogoUrl from '../../../../../assets/07a9c99e-dd9f-4b8b-a7dc-2453e6935ca2.png'

const FONT = 'Manrope, sans-serif'

// --- Texto con máscara de revelado bottom→top ---------------------------------
function Text({ spec, idSuffix }: { spec: TextSpec; idSuffix: string }) {
  if (!spec.visible || spec.opacity <= 0.001) return null
  const m = measureText(spec.text, spec.size, spec.weight, spec.tracking)
  const baseline = spec.y + (spec.h - (m.ascent + m.descent)) / 2 + m.ascent
  const textTop = baseline - m.ascent
  const textH = m.ascent + m.descent
  const clipId = `s03t-${idSuffix}`
  const maskP = Math.min(Math.max(spec.maskP, 0), 1)
  const anchor = spec.align === 'center' ? 'middle' : 'start'
  const anchorX = spec.align === 'center' ? spec.x + spec.w / 2 : spec.x
  return (
    <g opacity={spec.opacity} filter={spec.blur > 0.1 ? `url(#s03b-${idSuffix})` : undefined}>
      <defs>
        {maskP < 0.999 && (
          <clipPath id={clipId}>
            <rect x={anchorX - m.width / 2 - 30} y={textTop + textH - maskP * textH} width={m.width + 60} height={maskP * textH} />
          </clipPath>
        )}
        {spec.blur > 0.1 && (
          <filter id={`s03b-${idSuffix}`} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation={spec.blur} />
          </filter>
        )}
      </defs>
      <text
        x={anchorX}
        y={baseline}
        fontFamily={FONT}
        fontWeight={spec.weight}
        fontSize={spec.size}
        letterSpacing={spec.tracking}
        fill={spec.color}
        textAnchor={anchor}
        clipPath={maskP < 0.999 ? `url(#${clipId})` : undefined}
      >
        {spec.text}
      </text>
    </g>
  )
}

// --- Thread (conexión SVG con reveal por longitud de arco) ---------------------
function Thread({ state, d, idSuffix }: { state: ThreadState; d: string; idSuffix: string }) {
  if (state.drawP <= 0.001 || state.opacity <= 0.001) return null
  return (
    <g>
      <path
        d={d}
        fill="none"
        stroke={ORANGE}
        strokeWidth={2.5}
        strokeLinecap="round"
        pathLength={100}
        strokeDasharray={`${state.drawP * 100} 100`}
        opacity={state.opacity}
      />
      {state.dot && state.dot.opacity > 0.001 && (
        <circle cx={state.dot.x} cy={state.dot.y} r={2.5} fill={ORANGE} opacity={state.dot.opacity} />
      )}
    </g>
  )
}

// --- Avatar de Juli ------------------------------------------------------------
function JuliAvatar({ cx, cy, d, opacity, monoMaskP, glow }: { cx: number; cy: number; d: number; opacity: number; monoMaskP: number; glow: number }) {
  const r = d / 2
  // El monograma conserva su proporción óptica: 58 px sobre el avatar de
  // 112 px; al reducirse el avatar (grupo, extracción) escala con él.
  const monoSize = JULI.monoSize * (d / JULI.dAvatar)
  return (
    <g opacity={opacity}>
      {glow > 0.001 && (
        <>
          <defs>
            <radialGradient id="s03juli-glow">
              <stop offset="0" stopColor={JULI_SKIN} stopOpacity={0.08 * glow} />
              <stop offset="0.62" stopColor={JULI_SKIN} stopOpacity={0.05 * glow} />
              <stop offset="1" stopColor={JULI_SKIN} stopOpacity={0} />
            </radialGradient>
          </defs>
          <circle
            cx={cx}
            cy={cy}
            r={(r + 10 * (d / JULI.dAvatar)) * 1.35}
            fill="url(#s03juli-glow)"
          />
        </>
      )}
      <circle cx={cx} cy={cy} r={r} fill={JULI_SKIN} />
      <defs>
        {monoMaskP < 0.999 && (
          <clipPath id="s03juli-mono">
            <rect x={cx - r} y={cy + r - monoMaskP * d} width={d} height={monoMaskP * d} />
          </clipPath>
        )}
      </defs>
      <text
        x={cx}
        y={cy + monoSize * 0.35}
        fontFamily={FONT}
        fontWeight={600}
        fontSize={monoSize}
        fill={MONO_DARK}
        textAnchor="middle"
        clipPath={monoMaskP < 0.999 ? 'url(#s03juli-mono)' : undefined}
      >
        J
      </text>
    </g>
  )
}

// --- Avatar secundario (B / C) -------------------------------------------------
function MemberAvatar({ cx, cy, d, color, opacity, inner }: { cx: number; cy: number; d: number; color: string; opacity: number; inner: number }) {
  const r = d / 2
  const k = d / 96 // escala de referencia (avatar de 96 px)
  return (
    <g opacity={opacity}>
      <circle cx={cx} cy={cy} r={r} fill={color} />
      {/* Silueta abstracta: cabeza circular y hombros curvos. Sin rasgos. */}
      <g opacity={inner} fill={INK_BG}>
        <circle cx={cx} cy={cy + MEMBER_AVATAR.headDy * k} r={MEMBER_AVATAR.headR * k} />
        <path
          d={`M ${cx - 26 * k} ${cy + 20 * k} Q ${cx} ${cy + 40 * k} ${cx + 26 * k} ${cy + 20 * k} L ${cx + 26 * k} ${cy + r} L ${cx - 26 * k} ${cy + r} Z`}
        />
      </g>
    </g>
  )
}

// --- Glifo documental (info) ----------------------------------------------------
function InfoGlyph({ x, y, opacity, drawP, line1, line2 }: { x: number; y: number; opacity: number; drawP: number; line1: number; line2: number }) {
  const { w, h, fold } = GLYPH_INFO
  const perim = 2 * (w + h)
  const foldP = Math.min(1, Math.max(0, (drawP * perim - (w + h)) / (fold * 2)))
  return (
    <g opacity={opacity} transform={`translate(${x} ${y})`}>
      <path
        d={`M 0 0 L ${w - fold} 0 L ${w} ${fold} L ${w} ${h} L 0 ${h} Z`}
        fill="none"
        stroke={TYPE_WHITE}
        strokeWidth={2}
        strokeLinejoin="round"
        pathLength={100}
        strokeDasharray={`${drawP * 100} 100`}
      />
      <path
        d={`M ${w - fold} 0 L ${w - fold} ${fold} L ${w} ${fold}`}
        fill="none"
        stroke={TYPE_WHITE}
        strokeWidth={2}
        strokeLinejoin="round"
        pathLength={100}
        strokeDasharray={`${foldP * 100} 100`}
      />
      <line x1={8} y1={h * 0.45} x2={8 + line1} y2={h * 0.45} stroke={TYPE_WHITE} strokeWidth={2} strokeLinecap="round" />
      <line x1={8} y1={h * 0.62} x2={8 + line2} y2={h * 0.62} stroke={TYPE_WHITE} strokeWidth={2} strokeLinecap="round" />
    </g>
  )
}

// --- Glifo de cesta (shopping) ---------------------------------------------------
function BasketGlyph({ cx, cy, size, opacity, scale }: { cx: number; cy: number; size: number; opacity: number; scale: number }) {
  const s = size / 52
  return (
    <g opacity={opacity} transform={`translate(${cx} ${cy}) scale(${s * scale})`}>
      <path d="M -20 -6 L 20 -6 L 15 16 L -15 16 Z" fill="none" stroke={TYPE_WHITE} strokeWidth={2.4} strokeLinejoin="round" />
      <path d="M -11 -6 Q 0 -20 11 -6" fill="none" stroke={ORANGE} strokeWidth={2.4} strokeLinecap="round" />
      <line x1={-8} y1={4} x2={8} y2={4} stroke={TYPE_WHITE} strokeWidth={2} strokeLinecap="round" opacity={0.6} />
    </g>
  )
}

// --- Glifo circular de momento (encounter) ---------------------------------------
function MomentGlyph({ cx, cy, size, opacity, scale }: { cx: number; cy: number; size: number; opacity: number; scale: number }) {
  const s = size / 52
  return (
    <g opacity={opacity} transform={`translate(${cx} ${cy}) scale(${s * scale})`}>
      <circle r={20} fill="none" stroke={TYPE_WHITE} strokeWidth={2.4} />
      <line x1={0} y1={0} x2={0} y2={-11} stroke={ORANGE} strokeWidth={2.4} strokeLinecap="round" />
      <line x1={0} y1={0} x2={8} y2={4} stroke={TYPE_WHITE} strokeWidth={2.4} strokeLinecap="round" />
    </g>
  )
}

// --- Brand lockup (isotipo + wordmark) -------------------------------------------
function Lockup({ pose, opacity }: { pose: LockPose; opacity: number }) {
  const placement = placeIsotipo(pose.iso.x, pose.iso.y, pose.iso.w)
  return (
    <g opacity={opacity}>
      <image
        href={originalLogoUrl}
        x={placement.imgLeft}
        y={placement.imgTop}
        width={placement.imgSize}
        height={placement.imgSize}
      />
      <text
        x={pose.word.x}
        y={pose.word.baselineY}
        fontFamily={FONT}
        fontWeight={600}
        fontSize={pose.word.size}
        letterSpacing={pose.word.tracking}
        fill={TYPE_WHITE}
      >
        HomePlus
      </text>
    </g>
  )
}

// --- Isotipo aislado ---------------------------------------------------------------
function Isotipo({ x, y, s, opacity }: { x: number; y: number; s: number; opacity: number }) {
  const placement = placeIsotipo(x, y, ISOTYPE_BOX.w * s)
  return (
    <image
      href={originalLogoUrl}
      x={placement.imgLeft}
      y={placement.imgTop}
      width={placement.imgSize}
      height={placement.imgSize}
      opacity={opacity}
    />
  )
}

// --- Escena completa -----------------------------------------------------------------
export default function S03V6Scene({ state }: { state: SceneState }) {
  const { step } = state
  const groupTransform = state.group
    ? `translate(${state.group.cx} ${state.group.cy}) scale(${state.group.s}) translate(${-GROUP_PIVOT_O.x} ${-GROUP_PIVOT_O.y})`
    : undefined
  const juliInGroup = step <= 6

  return (
    <svg className="s03v6-svg" viewBox={`0 0 ${CANVAS.w} ${CANVAS.h}`} aria-hidden="true">
      <rect x={0} y={0} width={CANVAS.w} height={CANVAS.h} fill={INK_BG} />

      {/* Referencias preliminares (steps 1–5) */}
      {state.refs && (
        <g>
          {state.refs.momento.opacity > 0.001 && (
            <rect x={state.refs.momento.x} y={state.refs.momento.y} width={state.refs.momento.w} height={3} fill={ORANGE} opacity={state.refs.momento.opacity} />
          )}
          {state.refs.accion.opacity > 0.001 && (
            <circle cx={state.refs.accion.cx} cy={state.refs.accion.cy} r={state.refs.accion.d / 2} fill={ORANGE} opacity={state.refs.accion.opacity} />
          )}
          {state.refs.info.opacity > 0.001 && (
            <InfoGlyph x={state.refs.info.cx - 11} y={state.refs.info.cy - 14} opacity={state.refs.info.opacity} drawP={state.refs.info.drawP} line1={0} line2={0} />
          )}
          {state.refs.contexto.opacity > 0.001 && (
            <circle cx={state.refs.contexto.cx} cy={state.refs.contexto.cy} r={state.refs.contexto.d / 2} fill={ORANGE} opacity={state.refs.contexto.opacity} />
          )}
        </g>
      )}

      {/* Grupo del contexto Juli (steps 6–7) / world-space (steps 1–5) */}
      <g transform={groupTransform}>
        <Thread state={state.threads.juli} d="M336 482 C336 528 633 544 770 566" idSuffix="j" />
        <Thread state={state.threads.time} d="M1222 558 C1295 552 1300 453 1390 453" idSuffix="t" />
        <Thread state={state.threads.action} d="M1206 632 C1272 651 1274 770 1316 770" idSuffix="a" />
        <Thread state={state.threads.info} d="M741 790 C754 755 742 669 770 626" idSuffix="i" />

        {state.ctxPE.halo > 0.001 && (
          <circle cx={982} cy={576} r={180} fill={ORANGE} opacity={state.ctxPE.halo} />
        )}
        {state.ctxPE.accent.visible && (
          <rect x={state.ctxPE.accent.x} y={state.ctxPE.accent.y} width={state.ctxPE.accent.w} height={3} fill={ORANGE} opacity={state.ctxPE.accent.opacity} />
        )}
        {state.time.accent.visible && (
          <rect x={state.time.accent.x} y={state.time.accent.y} width={state.time.accent.w} height={3} fill={ORANGE} opacity={state.time.accent.opacity} />
        )}
        {state.action.indicator.visible && (
          <circle cx={state.action.indicator.cx} cy={state.action.indicator.cy} r={state.action.indicator.d / 2} fill={ORANGE} opacity={state.action.indicator.opacity} />
        )}
        {state.info.glyph.visible && (
          <InfoGlyph x={GLYPH_INFO.x} y={GLYPH_INFO.y} opacity={state.info.glyph.opacity} drawP={state.info.glyph.drawP} line1={state.info.glyph.line1} line2={state.info.glyph.line2} />
        )}

        {state.ctxPE.label && <Text spec={state.ctxPE.label} idSuffix="cpe-l" />}
        {state.ctxPE.title && <Text spec={state.ctxPE.title} idSuffix="cpe-t" />}
        {state.time.category && <Text spec={state.time.category} idSuffix="t-c" />}
        {state.time.value && <Text spec={state.time.value} idSuffix="t-v" />}
        {state.action.category && <Text spec={state.action.category} idSuffix="a-c" />}
        {state.action.text && <Text spec={state.action.text} idSuffix="a-t" />}
        {state.info.category && <Text spec={state.info.category} idSuffix="i-c" />}
        {state.info.data && <Text spec={state.info.data} idSuffix="i-d" />}
        {state.personLabel && <Text spec={state.personLabel} idSuffix="pl" />}
        {state.juliName && <Text spec={state.juliName} idSuffix="jn" />}

        {juliInGroup && state.juli.visible && (
          <JuliAvatar cx={state.juli.cx} cy={state.juli.cy} d={state.juli.d} opacity={state.juli.opacity} monoMaskP={state.juli.monoMaskP} glow={state.juli.glow} />
        )}
      </g>

      {/* Juli extraída (step 7+) */}
      {!juliInGroup && state.juli.visible && (
        <JuliAvatar cx={state.juli.cx} cy={state.juli.cy} d={state.juli.d} opacity={state.juli.opacity} monoMaskP={state.juli.monoMaskP} glow={state.juli.glow} />
      )}

      {/* Anotación compacta / contexto Educación Física */}
      {state.annotation.visible && (
        <g>
          <Text spec={state.annotation.title} idSuffix="ann-t" />
          {state.annotation.prefix && <Text spec={state.annotation.prefix} idSuffix="ann-j" />}
          <Text spec={state.annotation.moment} idSuffix="ann-m" />
          <rect
            x={state.annotation.x - 30} y={state.annotation.y + 42} width={60} height={3}
            fill={ORANGE} opacity={state.annotation.accentOpacity}
          />
        </g>
      )}

      {/* Contextos secundarios */}
      {state.shopping.visible && (
        <g opacity={state.shopping.opacity}>
          <BasketGlyph cx={state.shopping.cx} cy={state.shopping.cy - 20} size={CONTEXT_SHOPPING.glyph} opacity={state.shopping.glyphOpacity} scale={state.shopping.glyphScale} />
          <Text spec={state.shopping.text} idSuffix="sh-t" />
          <rect
            x={state.shopping.cx - CONTEXT_SHOPPING.accentW / 2} y={state.shopping.cy + 52}
            width={CONTEXT_SHOPPING.accentW * state.shopping.accentP} height={CONTEXT_SHOPPING.accentH}
            fill={ORANGE} opacity={0.6 * state.shopping.accentP}
          />
        </g>
      )}
      {state.encounter.visible && (
        <g opacity={state.encounter.opacity}>
          <MomentGlyph cx={state.encounter.cx} cy={state.encounter.cy - 20} size={CONTEXT_ENCOUNTER.glyph} opacity={state.encounter.glyphOpacity} scale={state.encounter.glyphScale} />
          <Text spec={state.encounter.text} idSuffix="en-t" />
          <rect
            x={state.encounter.cx - CONTEXT_ENCOUNTER.accentW / 2} y={state.encounter.cy + 52}
            width={CONTEXT_ENCOUNTER.accentW * state.encounter.accentP} height={CONTEXT_ENCOUNTER.accentH}
            fill={ORANGE} opacity={0.4 * state.encounter.accentP}
          />
        </g>
      )}

      {/* Avatares secundarios */}
      {state.memberB.visible && <MemberAvatar cx={state.memberB.cx} cy={state.memberB.cy} d={state.memberB.d} color={COLOR_B} opacity={state.memberB.opacity} inner={state.memberB.inner} />}
      {state.memberC.visible && <MemberAvatar cx={state.memberC.cx} cy={state.memberC.cy} d={state.memberC.d} color={COLOR_C} opacity={state.memberC.opacity} inner={state.memberC.inner} />}

      {/* Conectores individuales (step 7+) */}
      {state.connectors.map((c, i) => c.visible && c.drawP > 0.001 && (
        <path
          key={i}
          d={c.d}
          fill="none"
          stroke={ORANGE}
          strokeWidth={2.5}
          strokeLinecap="round"
          pathLength={100}
          strokeDasharray={`${c.drawP * 100} 100`}
          opacity={c.opacity}
        />
      ))}

      {/* Referencia común del hogar: el trazado se abre desde el centro hacia
          ambos extremos, de manera simétrica (§9.9). Mitades exactas por
          subdivisión de De Casteljau en u=0.5. */}
      {state.home.curveOpacity > 0.001 && (
        <>
          <path
            d="M960 903 Q675 903 390 882"
            fill="none"
            stroke={TYPE_WHITE}
            strokeWidth={2}
            opacity={state.home.curveOpacity}
            pathLength={100}
            strokeDasharray={`${state.home.drawP * 100} 100`}
          />
          <path
            d="M960 903 Q1245 903 1530 882"
            fill="none"
            stroke={TYPE_WHITE}
            strokeWidth={2}
            opacity={state.home.curveOpacity}
            pathLength={100}
            strokeDasharray={`${state.home.drawP * 100} 100`}
          />
        </>
      )}
      {state.home.label && <Text spec={state.home.label} idSuffix="hm" />}

      {/* Isotipo (steps 9–10) */}
      {state.isotipo.visible && !state.zoom && (
        <g filter={state.isotipo.blur > 0.1 ? 'url(#s03iso-blur)' : undefined}>
          <defs>
            {state.isotipo.blur > 0.1 && (
              <filter id="s03iso-blur" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation={state.isotipo.blur} />
              </filter>
            )}
          </defs>
          <Isotipo x={state.isotipo.x} y={state.isotipo.y} s={state.isotipo.s} opacity={state.isotipo.opacity} />
        </g>
      )}

      {/* Títulos finales */}
      {state.titleAutonomy && <Text spec={state.titleAutonomy} idSuffix="ta" />}
      {state.titleShared && <Text spec={state.titleShared} idSuffix="ts" />}

      {/* Encabezado editorial */}
      {state.heading && <Text spec={state.heading} idSuffix="hd" />}

      {/* Brand lockup */}
      {state.lockup.visible && <Lockup pose={state.lockup} opacity={state.lockup.opacity} />}

      {/* Señal de participación (step 8) */}
      {state.signal.visible && state.signal.opacity > 0.001 && (
        <circle cx={state.signal.x} cy={state.signal.y} r={state.signal.d / 2} fill={ORANGE} opacity={state.signal.opacity} />
      )}

      {/* Zoom final (step 10) */}
      {state.zoom && (
        <g filter={state.isotipo.blur > 0.1 ? 'url(#s03zoom-blur)' : undefined}>
          <defs>
            {state.isotipo.blur > 0.1 && (
              <filter id="s03zoom-blur" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation={state.isotipo.blur} />
              </filter>
            )}
          </defs>
          <g transform={`translate(${state.zoom.tx} ${state.zoom.ty}) scale(${state.zoom.s}) translate(${-Q0.x} ${-Q0.y})`}>
            <Isotipo x={ISOTYPE_BOX.x} y={ISOTYPE_BOX.y} s={1} opacity={1} />
          </g>
        </g>
      )}

      {/* Velo puente a S04 */}
      {state.veil > 0.001 && (
        <rect x={0} y={0} width={CANVAS.w} height={CANVAS.h} fill={S04_BG} opacity={state.veil} />
      )}
    </svg>
  )
}
