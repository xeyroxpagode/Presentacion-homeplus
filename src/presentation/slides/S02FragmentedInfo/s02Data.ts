// S02 V1.6 — datos congelados y layout determinista del historial.
// Cronología ficticia canónica (§4–§5): teléfono de Papá, noviembre 2023.
// Todo el historial se posiciona de forma absoluta con alturas calculadas
// en JS (sin medición DOM): offsets estables entre reproducciones.

export const S02_STEP_COUNT = 9

// Duraciones (ms) por step operativo 0..8 (§21).
// step0 = cola del Phone Dive (la cámara ya viene de S01).
export const S02_DURATIONS = [1100, 760, 500, 740, 1550, 560, 650, 1020, 760] as const

export const SENT_TEXT = '¿Quién lo busca a Tomi hoy?'
export const MOTHER_TEXT = 'Esta semana lo busco yo a Tomi.'
export const WARRANTY_TEXT = 'Paa, esta es la garantía de la heladera'

export const QUESTION_LINES = [
  '¿Qué pasaría si esa parte del',
  'contexto del hogar pudiera estar',
  'organizada y disponible para el hogar?',
] as const

export type Sender = 'mama' | 'tomi' | 'papa'

export type SecondaryMsg = {
  id: string
  from: Sender
  text: string
  time: string
}

export const SENDER_LABEL: Record<Sender, string | null> = {
  mama: 'Mamá ❤️',
  tomi: 'Tomi',
  papa: null,
}

// Historial canónico completo (§5). Identificadores estables.
// w=garrantía · d=día intermedio · m=lunes 13 (madre protagonista) ·
// r=reciente jueves 16 · s=enviado por Papá en S02.4.
type DatedMsg = SecondaryMsg & { day: string }

const DATED: DatedMsg[] = [
  // Viernes 3 de noviembre.
  { id: 'w02', from: 'mama', text: 'Ahí está, gracias.', time: '19:48', day: '3 de noviembre' },
  // Sábado 4.
  { id: 'd01', from: 'papa', text: '¿El manual quedó en la caja?', time: '10:12', day: '4 de noviembre' },
  { id: 'd02', from: 'mama', text: 'Creo que sí, después reviso.', time: '10:15', day: '4 de noviembre' },
  // Lunes 6.
  { id: 'd03', from: 'mama', text: 'Tomi, mañana llevá las zapatillas de Educación Física.', time: '18:32', day: '6 de noviembre' },
  { id: 'd04', from: 'tomi', text: 'Dale, ya las dejé listas.', time: '18:34', day: '6 de noviembre' },
  // Jueves 9.
  { id: 'd05', from: 'papa', text: '¿Hay algo que comprar para casa?', time: '12:21', day: '9 de noviembre' },
  { id: 'd06', from: 'mama', text: 'Leche y pan, después me fijo qué más.', time: '12:25', day: '9 de noviembre' },
  // Viernes 10.
  { id: 'd07', from: 'tomi', text: 'Mañana tengo partido a las diez.', time: '17:40', day: '10 de noviembre' },
  { id: 'd08', from: 'papa', text: 'Buenísimo, salimos un rato antes.', time: '17:43', day: '10 de noviembre' },
  // Domingo 12.
  { id: 'd09', from: 'mama', text: 'Mañana arranca otra vez el horario normal.', time: '20:11', day: '12 de noviembre' },
  { id: 'd10', from: 'tomi', text: 'Sí, ya preparé la mochila.', time: '20:13', day: '12 de noviembre' },
  // Lunes 13 — mensaje protagonista + acuse de Papá (había leído la coordinación).
  { id: 'm01', from: 'mama', text: MOTHER_TEXT, time: '20:14', day: 'Lunes 13 de noviembre' },
  { id: 'm02', from: 'papa', text: 'Dale, gracias.', time: '20:16', day: 'Lunes 13 de noviembre' },
  // Martes 14.
  { id: 'd11', from: 'mama', text: 'Dejé la vianda en la heladera.', time: '07:40', day: '14 de noviembre' },
  { id: 'd12', from: 'tomi', text: 'La agarré, gracias.', time: '07:43', day: '14 de noviembre' },
  { id: 'd13', from: 'papa', text: '¿Dónde quedó el buzo azul?', time: '18:22', day: '14 de noviembre' },
  { id: 'd14', from: 'tomi', text: 'En el auto.', time: '18:24', day: '14 de noviembre' },
  // Miércoles 15.
  { id: 'd15', from: 'mama', text: 'El jueves tenés entrenamiento, acordate.', time: '10:04', day: '15 de noviembre' },
  { id: 'd16', from: 'tomi', text: 'Sí, a las cuatro y media.', time: '10:07', day: '15 de noviembre' },
  { id: 'd17', from: 'papa', text: 'Después me fijo lo del bolso.', time: '10:09', day: '15 de noviembre' },
  { id: 'd18', from: 'papa', text: '¿Quedó ropa en la lavarropas?', time: '19:12', day: '15 de noviembre' },
  { id: 'd19', from: 'mama', text: 'No, ya la saqué.', time: '19:15', day: '15 de noviembre' },
  // Jueves 16 (recientes).
  { id: 'r01', from: 'mama', text: 'Tomi, dejé el bolso en la entrada.', time: '07:14', day: 'Hoy' },
  { id: 'r02', from: 'tomi', text: 'Lo tengo.', time: '07:17', day: 'Hoy' },
  { id: 'r03', from: 'tomi', text: 'Hoy salgo a las cuatro.', time: '12:20', day: 'Hoy' },
  { id: 'r04', from: 'papa', text: 'Dale.', time: '12:23', day: 'Hoy' },
  { id: 'r05', from: 'papa', text: '¿Tenés el bolso?', time: '15:55', day: 'Hoy' },
  { id: 'r06', from: 'tomi', text: 'Sí, pa.', time: '15:56', day: 'Hoy' },
  { id: 'r07', from: 'tomi', text: 'Ya salí del cole.', time: '16:02', day: 'Hoy' },
  { id: 'r08', from: 'papa', text: '¿Estás esperando en la entrada?', time: '16:03', day: 'Hoy' },
  { id: 'r09', from: 'tomi', text: 'Sí.', time: '16:04', day: 'Hoy' },
]

export const EARLY_MSGS: SecondaryMsg[] = DATED.filter(m => m.day !== 'Hoy').map(({ day: _d, ...m }) => m)
export const LATE_MSGS: SecondaryMsg[] = DATED.filter(m => m.day === 'Hoy').map(({ day: _d, ...m }) => m)

// ---- Alturas deterministas (px, contenido 1280 de ancho) ----
// Burbujas: entrantes borde X38 (ancho máx. 682), salientes borde der. X1242.
// Modelo calibrado contra render real (Linux): todo el historial cabe en
// UNA línea de texto por burbuja; la altura extra la aporta el timestamp
// flotado cuando texto+reserva no caben en la primera línea (desborda
// ~32/33px y la burbuja BFC lo contiene). Constantes medidas: IN 1L=92,
// OUT 1L=55, héroe-IN 1L+stamp=130, héroe-OUT 1L+stamp=93, garantía=335.
// El estimador es conservador (redondeo arriba); historyLayout.ts corrige
// con alturas medidas en useLayoutEffect (antes del primer pintado).
// Nunca solapa.
const CHIP_H = 38
const WARRANTY_H = 335
const MOTHER_H = 132
const SENT_H = 96

function rowsFor(text: string, w: number, pxPerChar: number): number {
  const total = text.length * pxPerChar
  const avail1 = w - 32 - 64 // primera línea: padding + timestamp flotado
  if (total <= avail1) return 1
  const availN = w - 32
  return 1 + Math.ceil((total - avail1) / availN)
}

// ¿Desborda el timestamp a su propia fila? (test conservador con margen).
function stampOverflows(text: string, w: number, pxPerChar: number): boolean {
  return text.length * pxPerChar + 8 > w - 32 - 64
}

function incomingWidth(text: string, hero: boolean): number {
  const w = 96 + text.length * (hero ? 15.2 : 13.2)
  return Math.round(Math.min(682, Math.max(170, w)))
}

function outgoingWidth(text: string, hero: boolean): number {
  const w = 96 + text.length * (hero ? 15.2 : 13.2)
  return Math.round(Math.min(560, Math.max(140, w)))
}

function incomingHeight(text: string, hero: boolean): number {
  const w = incomingWidth(text, hero)
  const n = rowsFor(text, w, 11.9)
  const ov = n === 1 && stampOverflows(text, w, hero ? 16.5 : 13.8)
  return Math.round(hero ? 59 + n * 40 + (ov ? 33 : 0) : 59 + n * 33 + (ov ? 32 : 0))
}

function outgoingHeight(text: string, hero: boolean): number {
  const w = outgoingWidth(text, hero)
  const n = rowsFor(text, w, 11.9)
  const ov = n === 1 && stampOverflows(text, w, hero ? 16.5 : 13.8)
  return Math.round(hero ? 22 + n * 40 + (ov ? 33 : 0) : 22 + n * 33 + (ov ? 32 : 0))
}

export type HistoryBlock =
  | { kind: 'chip'; label: string; h: number; top: number }
  | { kind: 'warranty'; h: number; top: number }
  | { kind: 'msg'; msg: SecondaryMsg; h: number; top: number; w: number; bh: number }
  | { kind: 'mother'; h: number; top: number; w: number; bh: number }
  | { kind: 'sent'; h: number; top: number; w: number; bh: number }

export function buildHistory(): {
  blocks: HistoryBlock[]
  contentH: number
  motherTop: number
  motherW: number
  sentTop: number
  sentW: number
} {
  const blocks: HistoryBlock[] = []
  let top = 10
  let prevFrom: Sender | 'chip' | 'start' = 'start'
  const gapFor = (from: Sender): number => (prevFrom === from ? 6 : 16)
  const pushMsg = (msg: SecondaryMsg) => {
    const out = msg.from === 'papa'
    const w = out ? outgoingWidth(msg.text, false) : incomingWidth(msg.text, false)
    const bh = out ? outgoingHeight(msg.text, false) : incomingHeight(msg.text, false)
    const h = bh + gapFor(msg.from)
    blocks.push({ kind: 'msg', msg, h, top, w, bh })
    top += h
    prevFrom = msg.from
  }

  const pushChip = (label: string) => {
    blocks.push({ kind: 'chip', label, h: CHIP_H + 20, top })
    top += CHIP_H + 20
    prevFrom = 'chip'
  }

  // Viernes 3: garantía de Tomi (bloque protagonista de S02.0).
  pushChip('3 de noviembre')
  blocks.push({ kind: 'warranty', h: WARRANTY_H + 29, top })
  top += WARRANTY_H + 29
  prevFrom = 'tomi'

  let lastDay = '3 de noviembre'
  for (const m of DATED) {
    if (m.day !== lastDay) {
      pushChip(m.day)
      lastDay = m.day
    }
    if (m.id === 'm01') {
      // Mensaje protagonista del lunes 13: bloque de identidad estable
      // (misma pieza en scroll, long-press y morph).
      const w = Math.round(Math.min(682, 96 + MOTHER_TEXT.length * 15.2))
      blocks.push({ kind: 'mother', h: MOTHER_H + 16, top, w, bh: MOTHER_H })
      top += MOTHER_H + 16
      prevFrom = 'mama'
      continue
    }
    pushMsg(m)
  }
  const motherBlock = blocks.find((b): b is Extract<HistoryBlock, { kind: 'mother' }> => b.kind === 'mother')
  const motherTop = motherBlock?.top ?? 0
  const motherW = motherBlock?.w ?? 640
  const sentTop = top
  const sentW = outgoingWidth(SENT_TEXT, true)
  blocks.push({ kind: 'sent', h: SENT_H + 22, top, w: sentW, bh: SENT_H })
  top += SENT_H + 22
  return {
    blocks,
    contentH: top,
    motherTop,
    motherW,
    sentTop,
    sentW,
  }
}

export const HISTORY_VIEWPORT_H = 509 // Y112–621
export const HISTORY_VIEWPORT_Y = 112
