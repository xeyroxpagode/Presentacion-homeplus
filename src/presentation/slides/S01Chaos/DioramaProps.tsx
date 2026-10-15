import { useId } from 'react'

/** Ids únicos por instancia para gradientes/filtros de SVG. */
function useUid(prefix: string) {
  return `${prefix}-${useId().replace(/:/g, '')}`
}

type PaperTone = { top: string; bottom: string; line: string }

const PAPER_TONES: Record<string, PaperTone> = {
  warm: { top: '#D3C7B1', bottom: '#B7AB93', line: '#8D8272' },
  mid: { top: '#C2B6A0', bottom: '#A99D85', line: '#83796A' },
  deep: { top: '#B4A88F', bottom: '#9C9179', line: '#7C7263' },
  folder: { top: '#93805E', bottom: '#7A6849', line: '#5F5138' },
}

/**
 * Hoja de papel acostada sobre la perspectiva de la mesa: cuadrilátero con
 * borde superior más corto, líneas de texto siguiendo el plano y sombra de
 * contacto adaptada al plano (sin elipses flotantes).
 */
function PaperSheet({
  w,
  h,
  tone,
  rows = 3,
  header = false,
  dashed = false,
  fold = false,
  lineScale = 1,
}: {
  w: number
  h: number
  tone: keyof typeof PAPER_TONES
  rows?: number
  header?: boolean
  dashed?: boolean
  fold?: boolean
  lineScale?: number
}) {
  const uid = useUid('sheet')
  const t = PAPER_TONES[tone]
  const top = 3
  const bottom = h - 3
  const tl = Math.round(w * 0.18)
  const tr = w - Math.round(w * 0.15)
  const bl = 13
  const br = w - 11
  const insetLeft = (y: number) => tl + ((bl - tl) * (y - top)) / (bottom - top)
  const insetRight = (y: number) => tr + ((br - tr) * (y - top)) / (bottom - top)
  const paper = `M${tl},${top} L${tr},${top} L${br},${bottom} L${bl},${bottom} Z`
  const rowGap = (h - 18) / (rows + (header ? 1.6 : 1))
  const rowStart = header ? 16 + rowGap : 14
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width={w} height={h} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={`${uid}-g`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={t.top} />
          <stop offset="1" stopColor={t.bottom} />
        </linearGradient>
        <filter id={`${uid}-s`} x="-25%" y="-25%" width="150%" height="170%">
          <feDropShadow dx="2.5" dy="4" stdDeviation="2.6" floodColor="rgb(0 0 0 / 0.42)" />
        </filter>
      </defs>
      <g filter={`url(#${uid}-s)`}>
        <path d={paper} fill={`url(#${uid}-g)`} stroke="rgb(24 14 6 / 0.35)" strokeWidth="1" />
      </g>
      {header && (
        <path
          d={`M${insetLeft(11)},11 L${insetRight(11) - 6},11 L${insetRight(13)},17 L${insetLeft(13)},17 Z`}
          fill={t.line}
          opacity="0.55"
        />
      )}
      {Array.from({ length: rows }).map((_, i) => {
        const y = rowStart + i * rowGap
        const x1 = insetLeft(y) + 6
        const x2 = insetRight(y) - 10 - (i % 2) * w * 0.14 * lineScale
        return dashed && i === rows - 2 ? (
          <path
            key={i}
            d={`M${x1},${y} L${x2},${y}`}
            stroke={t.line}
            strokeWidth="1.2"
            strokeDasharray="4 3"
            opacity="0.7"
          />
        ) : (
          <path
            key={i}
            d={`M${x1},${y} L${x2},${y} L${x2 + 1.4},${y + 3.2} L${x1 + 1.4},${y + 3.2} Z`}
            fill={t.line}
            opacity="0.62"
          />
        )
      })}
      {fold && (
        <path
          d={`M${br},${bottom - 9} L${br - 14},${bottom} L${br},${bottom} Z`}
          fill="rgb(0 0 0 / 0.18)"
        />
      )}
    </svg>
  )
}

/** Frente del cajón integrado: madera discreta con asa ranurada. */
export function DrawerFront() {
  return (
    <svg viewBox="0 0 132 35" width="132" height="35" aria-hidden="true" focusable="false">
      <rect x="1" y="1" width="130" height="32" rx="2.5" fill="#2B241C" stroke="rgb(0 0 0 / 0.5)" strokeWidth="1" />
      <polyline points="4,3.5 128,3.5" fill="none" stroke="rgb(255 235 200 / 0.09)" strokeWidth="1.5" />
      <rect x="52" y="13" width="28" height="7" rx="3.5" fill="#151009" />
      <polyline points="54,20.5 78,20.5" fill="none" stroke="rgb(255 235 200 / 0.08)" strokeWidth="1" />
    </svg>
  )
}

/** Póliza del seguro: sobre/documento acostado con encabezado simple, sin estado de pago. */
export function AutoPolicy() {
  const uid = useUid('policy')
  return (
    <svg viewBox="0 0 213 77" width="213" height="77" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={`${uid}-g`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#D6CAB4" />
          <stop offset="1" stopColor="#B5A990" />
        </linearGradient>
        <filter id={`${uid}-s`} x="-20%" y="-20%" width="140%" height="170%">
          <feDropShadow dx="3" dy="5" stdDeviation="3" floodColor="rgb(0 0 0 / 0.42)" />
        </filter>
      </defs>
      <g filter={`url(#${uid}-s)`}>
        <path d="M36,3 L168,3 L196,71 L20,73 Z" fill={`url(#${uid}-g)`} stroke="rgb(24 14 6 / 0.35)" strokeWidth="1" />
      </g>
      <text x="54" y="27" fontSize="11.5" fontWeight="600" letterSpacing="1.6" fill="#4A4136">
        SEGURO DEL AUTO
      </text>
      <text x="54" y="39" fontSize="7" letterSpacing="0.6" fill="#847A6B">
        Póliza Nº 47-2891
      </text>
      <path d="M52,47 L142,46 L143.4,50 L53.4,51 Z" fill="#8D8272" opacity="0.55" />
      <path d="M51,56 L124,55 L125.4,59 L52.4,60 Z" fill="#8D8272" opacity="0.55" />
      <path d="M50,64 L152,63 L153.4,67 L51.4,68 Z" fill="#8D8272" opacity="0.55" />
    </svg>
  )
}

/** Llave de auto moderna: FOB grafito con botones, aro cromado y hoja metálica corta. */
export function CarKeys() {
  const uid = useUid('keys')
  return (
    <svg viewBox="0 0 139 90" width="139" height="90" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={`${uid}-metal`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#A6ACB5" />
          <stop offset="0.5" stopColor="#7E858F" />
          <stop offset="1" stopColor="#5E646D" />
        </linearGradient>
        <linearGradient id={`${uid}-fob`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#38332E" />
          <stop offset="0.45" stopColor="#29241F" />
          <stop offset="1" stopColor="#1B1713" />
        </linearGradient>
        <radialGradient id={`${uid}-shadow`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="rgb(0 0 0 / 0.42)" />
          <stop offset="1" stopColor="rgb(0 0 0 / 0)" />
        </radialGradient>
      </defs>
      {/* Hoja metálica corta y ancha, con muescas */}
      <g transform="rotate(-14 54 56)">
        <path d="M14,50 L40,46 L40,41 L50,43 L50,61 L40,63 L40,58 L14,62 Z" fill={`url(#${uid}-metal)`} />
        <path d="M14,50 L40,46 L40,41 L50,43 L50,61 L40,63 L40,58 L14,62 Z" fill="none" stroke="rgb(0 0 0 / 0.35)" strokeWidth="0.8" />
      </g>
      {/* Aro cromado */}
      <circle cx="57" cy="56" r="13" fill="none" stroke={`url(#${uid}-metal)`} strokeWidth="5" />
      <circle cx="57" cy="56" r="15.5" fill="none" stroke="rgb(0 0 0 / 0.25)" strokeWidth="1" />
      {/* FOB moderno */}
      <rect x="72" y="26" width="58" height="46" rx="12" fill={`url(#${uid}-fob)`} stroke="rgb(0 0 0 / 0.45)" strokeWidth="1" />
      <rect x="76" y="30" width="50" height="12" rx="6" fill="rgb(255 255 255 / 0.07)" />
      <circle cx="90" cy="52" r="6" fill="#453F38" stroke="rgb(255 255 255 / 0.1)" strokeWidth="1" />
      <circle cx="109" cy="52" r="6" fill="#453F38" stroke="rgb(255 255 255 / 0.1)" strokeWidth="1" />
      <circle cx="99.5" cy="64" r="6" fill="#453F38" stroke="rgb(255 255 255 / 0.1)" strokeWidth="1" />
      <circle cx="123" cy="34" r="1.8" fill="#8F8375" />
      <ellipse className="key-contact" cx="72" cy="83" rx="52" ry="5.5" fill={`url(#${uid}-shadow)`} />
    </svg>
  )
}

/** Bolsa de compras abierta con tres alimentos rígidos: pan, verdura y envase. */
export function GroceryBag() {
  const uid = useUid('bag')
  return (
    <svg viewBox="0 0 153 178" width="153" height="178" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={`${uid}-body`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#675741" />
          <stop offset="1" stopColor="#4C4030" />
        </linearGradient>
        <linearGradient id={`${uid}-bread`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#B58A57" />
          <stop offset="1" stopColor="#8F6A3E" />
        </linearGradient>
        <radialGradient id={`${uid}-shadow`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="rgb(0 0 0 / 0.45)" />
          <stop offset="1" stopColor="rgb(0 0 0 / 0)" />
        </radialGradient>
      </defs>
      <ellipse cx="77" cy="170" rx="56" ry="6.5" fill={`url(#${uid}-shadow)`} />
      {/* Asas */}
      <path d="M52,62 C48,26 76,24 74,60" fill="none" stroke="#51432F" strokeWidth="6" />
      <path d="M86,60 C86,28 104,30 100,62" fill="none" stroke="#453828" strokeWidth="6" />
      {/* Alimentos rígidos: salen de la boca abierta */}
      <g transform="rotate(26 44 52)">
        <rect x="-16" y="43" width="98" height="19" rx="9.5" fill={`url(#${uid}-bread)`} />
        <path d="M4,46 q4,4 0,9 M24,45 q4,4 0,10 M44,46 q4,4 0,9" fill="none" stroke="#7A5731" strokeWidth="1.6" />
      </g>
      <g>
        <ellipse cx="88" cy="42" rx="9" ry="16" transform="rotate(-18 88 42)" fill="#5C7B49" />
        <ellipse cx="100" cy="38" rx="8" ry="15" transform="rotate(12 100 38)" fill="#46603A" />
        <ellipse cx="93" cy="34" rx="7" ry="13" transform="rotate(-2 93 34)" fill="#6E8A54" />
        <ellipse cx="104" cy="46" rx="6" ry="11" transform="rotate(30 104 46)" fill="#516E42" />
      </g>
      <g transform="rotate(-8 112 50)">
        <rect x="100" y="34" width="26" height="30" fill="#B7AC93" stroke="rgb(0 0 0 / 0.25)" strokeWidth="0.8" />
        <line x1="100" y1="42" x2="126" y2="42" stroke="rgb(0 0 0 / 0.18)" strokeWidth="1" />
        <rect x="100" y="34" width="26" height="6" fill="rgb(255 255 255 / 0.08)" />
      </g>
      {/* Boca abierta con volumen */}
      <polygon points="36,58 116,58 122,72 30,72" fill="#221910" />
      {/* Cuerpo de la bolsa */}
      <path d="M28,64 L124,64 L136,164 Q76,176 18,164 Z" fill={`url(#${uid}-body)`} stroke="rgb(20 12 6 / 0.35)" strokeWidth="1" />
      <polyline points="30,66 122,66" fill="none" stroke="#84705A" strokeWidth="2.5" />
      <path d="M52,70 L46,158 M98,70 L104,158" fill="none" stroke="rgb(0 0 0 / 0.16)" strokeWidth="1.8" />
      <path d="M22,90 Q76,100 132,90" fill="none" stroke="rgb(0 0 0 / 0.1)" strokeWidth="1.4" />
    </svg>
  )
}

/** Lista de compras en perspectiva, con casillas sin confirmación. */
export function ShoppingList() {
  const uid = useUid('list')
  return (
    <svg viewBox="0 0 151 67" width="151" height="67" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={`${uid}-g`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#CDC1AA" />
          <stop offset="1" stopColor="#B0A48D" />
        </linearGradient>
        <filter id={`${uid}-s`} x="-25%" y="-25%" width="150%" height="170%">
          <feDropShadow dx="2.5" dy="4" stdDeviation="2.4" floodColor="rgb(0 0 0 / 0.4)" />
        </filter>
      </defs>
      <g filter={`url(#${uid}-s)`}>
        <path d="M34,2 L120,2 L141,64 L16,64 Z" fill={`url(#${uid}-g)`} stroke="rgb(24 14 6 / 0.35)" strokeWidth="1" />
      </g>
      <text x="48" y="17" fontSize="8" fontWeight="600" letterSpacing="1.4" fill="#6F6455">
        COMPRAS
      </text>
      {[0, 1, 2].map((row) => (
        <g key={row} transform={`translate(${-row * 2.2} ${row * 13})`}>
          <rect x="48" y="26" width="8" height="8" fill="none" stroke="#857A6B" strokeWidth="1.4" />
          <path d={`M62,29.5 L${114 - row * 14},29 L${115.4 - row * 14},33 L63.4,33.5 Z`} fill="#857A6B" opacity="0.7" />
        </g>
      ))}
    </svg>
  )
}

/** Carpeta de papeles que emerge del cajón. */
export function WarrantyFolder() {
  return (
    <svg viewBox="0 0 120 75" width="120" height="75" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="s01-folder-g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#93805E" />
          <stop offset="1" stopColor="#756344" />
        </linearGradient>
        <filter id="s01-folder-s" x="-25%" y="-25%" width="150%" height="170%">
          <feDropShadow dx="2.5" dy="4.5" stdDeviation="2.8" floodColor="rgb(0 0 0 / 0.45)" />
        </filter>
      </defs>
      <g filter="url(#s01-folder-s)">
        <path d="M26,2 L86,2 L94,10 L108,10 L112,71 L14,73 Z" fill="url(#s01-folder-g)" stroke="rgb(20 12 6 / 0.4)" strokeWidth="1" />
      </g>
      <path d="M34,14 L94,13 L96,58 L30,60 Z" fill="#C9BCA2" opacity="0.9" />
      <path d="M40,22 L82,21 L83,26 L41,27 Z" fill="#8D8272" opacity="0.6" />
      <path d="M39,33 L74,32 L75,37 L40,38 Z" fill="#8D8272" opacity="0.6" />
      <polyline points="30,61 96,59" fill="none" stroke="rgb(0 0 0 / 0.2)" strokeWidth="1.2" />
    </svg>
  )
}

/** Documentos de la búsqueda: variantes sutiles de la misma papelería. */
export function DocOne() {
  return <PaperSheet w={105} h={56} tone="warm" rows={3} header />
}
export function DocTwo() {
  return <PaperSheet w={103} h={53} tone="mid" rows={3} dashed />
}
export function DocThree() {
  return <PaperSheet w={94} h={62} tone="deep" rows={4} fold />
}

/** Extras del clímax: salen de fuentes físicas (sobre, lista, cajón/carpeta). */
export function ExtraAutoSheet() {
  return <PaperSheet w={117} h={56} tone="warm" rows={3} header />
}
export function ExtraListNote() {
  return <PaperSheet w={89} h={60} tone="warm" rows={2} header />
}
export function ExtraW1() {
  return <PaperSheet w={98} h={65} tone="mid" rows={3} fold />
}
export function ExtraW2() {
  return <PaperSheet w={88} h={68} tone="deep" rows={4} dashed header />
}
export function ExtraW3() {
  return <PaperSheet w={116} h={64} tone="mid" rows={3} header />
}
