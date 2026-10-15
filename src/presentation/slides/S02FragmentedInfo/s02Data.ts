// S02 V1.5 — datos congelados y layout determinista del historial.
// Todo el historial se posiciona de forma absoluta con alturas calculadas
// en JS (sin medición DOM): offsets estables entre reproducciones.

export const S02_STEP_COUNT = 9

// Duraciones (ms) por step operativo 0..8.
export const S02_DURATIONS = [520, 780, 560, 760, 1550, 1150, 700, 1080, 400] as const

export const SENT_TEXT = '¿Quién lo busca a Tomi hoy?'
export const MOTHER_TEXT = 'El lunes voy yo a buscar a Tomi.'
export const WARRANTY_TEXT = 'Paa, esta es la garantía de la heladera'

export const QUESTION_LINES = [
  '¿Qué pasaría si esa parte del',
  'contexto del hogar pudiera estar',
  'organizada y disponible para el hogar?',
] as const

export type SecondaryMsg = {
  id: string
  from: 'mama' | 'tomi' | 'papa'
  text: string
  time: string
}

export const SENDER_LABEL: Record<SecondaryMsg['from'], string | null> = {
  mama: 'Mamá ❤️',
  tomi: 'Tomi',
  papa: null,
}

// Mensajes entre la garantía (3/11) y el mensaje de mamá (15/11).
const EARLY: SecondaryMsg[] = [
  { id: 'e01', from: 'mama', text: '¿Llegaste?', time: '21:12' },
  { id: 'e02', from: 'papa', text: 'Sí, recién entro.', time: '21:15' },
  { id: 'e03', from: 'tomi', text: 'Paa, ¿viste la garantía que te mandé?', time: '21:20' },
  { id: 'e04', from: 'papa', text: 'Sí. Después la guardo.', time: '21:22' },
  { id: 'e05', from: 'mama', text: '¿Alguien vio las llaves de casa?', time: '08:03' },
  { id: 'e06', from: 'tomi', text: 'Ya estoy en casa.', time: '13:40' },
  { id: 'e07', from: 'mama', text: 'Dale, después te aviso.', time: '13:44' },
  { id: 'e08', from: 'papa', text: '¿A qué hora salís mañana?', time: '22:01' },
  { id: 'e09', from: 'mama', text: 'Temprano, te aviso cuando salga.', time: '22:05' },
  { id: 'e10', from: 'tomi', text: '¿Me llevan al entrenamiento?', time: '18:12' },
  { id: 'e11', from: 'papa', text: 'Dale, vamos juntos.', time: '18:15' },
  { id: 'e12', from: 'mama', text: 'Avísenme cuando estén en casa.', time: '18:20' },
]

// Mensajes del lunes 16/11 entre el mensaje de mamá y la pregunta de papá.
const LATE: SecondaryMsg[] = [
  { id: 'l01', from: 'mama', text: '¿A qué hora salís?', time: '07:05' },
  { id: 'l02', from: 'papa', text: 'Siete y media lo llevo al colegio.', time: '07:06' },
  { id: 'l03', from: 'mama', text: 'Avísenme cuando estén por favor.', time: '07:08' },
  { id: 'l04', from: 'tomi', text: 'Ya estoy en el cole.', time: '07:55' },
  { id: 'l05', from: 'papa', text: '¿Llegaste bien?', time: '07:56' },
  { id: 'l06', from: 'mama', text: 'Sí, entró bien, quédense tranquilos.', time: '08:02' },
  { id: 'l07', from: 'papa', text: '¿A qué hora sale hoy?', time: '09:14' },
  { id: 'l08', from: 'mama', text: 'A las cuatro sale del colegio.', time: '09:20' },
  { id: 'l09', from: 'tomi', text: '¿Me buscan a las cuatro?', time: '11:32' },
  { id: 'l10', from: 'papa', text: 'Dale, alguien te busca.', time: '11:35' },
  { id: 'l11', from: 'mama', text: 'Después te aviso bien.', time: '11:40' },
  { id: 'l12', from: 'papa', text: '¿Alguien vio las llaves?', time: '12:05' },
  { id: 'l13', from: 'mama', text: 'Están en la mesa de la cocina.', time: '12:07' },
  { id: 'l14', from: 'tomi', text: 'Me olvidé la campera azul.', time: '13:15' },
  { id: 'l15', from: 'mama', text: '¿La azul? Fijate en el perchero.', time: '13:18' },
  { id: 'l16', from: 'tomi', text: 'Sí, esa. ¿Me la alcanzan?', time: '13:20' },
  { id: 'l17', from: 'papa', text: 'A la vuelta la buscamos.', time: '13:22' },
  { id: 'l18', from: 'mama', text: '¿Hay entrenamiento hoy?', time: '14:02' },
  { id: 'l19', from: 'papa', text: 'Cuatro y media, hasta las seis y media.', time: '14:05' },
  { id: 'l20', from: 'tomi', text: '¿Quién me lleva al entrenamiento?', time: '14:40' },
  { id: 'l21', from: 'mama', text: 'Hablamos a las cuatro ese tema.', time: '14:44' },
  { id: 'l22', from: 'papa', text: 'Avísenme cuando estén listos.', time: '15:10' },
  { id: 'l23', from: 'mama', text: 'Dale, ya casi estamos.', time: '15:12' },
  { id: 'l24', from: 'tomi', text: 'Ya salí del cole, estoy en la puerta.', time: '15:58' },
  { id: 'l25', from: 'papa', text: '¿Estás con alguien?', time: '16:00' },
  { id: 'l26', from: 'tomi', text: 'Sí, con los chicos de quinto.', time: '16:01' },
  { id: 'l27', from: 'mama', text: 'Ya voy saliendo para allá.', time: '16:03' },
  { id: 'l28', from: 'papa', text: '¿A qué hora llegás?', time: '16:04' },
  { id: 'l29', from: 'mama', text: 'En diez minutos estoy.', time: '16:04' },
  { id: 'l30', from: 'tomi', text: 'Dale, los espero acá.', time: '16:05' },
]

export const EARLY_MSGS = EARLY
export const LATE_MSGS = LATE

// ---- Alturas deterministas (px, contenido 1280 de ancho) ----
const CHIP_H = 64
const WARRANTY_H = 350
const MOTHER_H = 170
const SENT_H = 96

function secondaryHeight(m: SecondaryMsg): number {
  const lines = Math.max(1, Math.ceil(m.text.length / 40))
  if (m.from === 'papa') return 24 + lines * 32 + 14
  return 24 + 25 + lines * 34 + 14
}

export type HistoryBlock =
  | { kind: 'chip'; label: string; h: number; top: number }
  | { kind: 'warranty'; h: number; top: number }
  | { kind: 'msg'; msg: SecondaryMsg; h: number; top: number }
  | { kind: 'mother'; h: number; top: number }
  | { kind: 'sent'; h: number; top: number }

export function buildHistory(): { blocks: HistoryBlock[]; contentH: number; motherTop: number; sentTop: number } {
  const blocks: HistoryBlock[] = []
  let top = 8
  const push = (b: HistoryBlock) => { blocks.push(b); top += b.h }
  push({ kind: 'chip', label: '3 de noviembre', h: CHIP_H, top })
  push({ kind: 'warranty', h: WARRANTY_H, top })
  for (const msg of EARLY) push({ kind: 'msg', msg, h: secondaryHeight(msg), top })
  push({ kind: 'chip', label: '15 de noviembre', h: CHIP_H, top })
  const motherTop = top
  push({ kind: 'mother', h: MOTHER_H, top })
  push({ kind: 'chip', label: 'Hoy', h: CHIP_H, top })
  for (const msg of LATE) push({ kind: 'msg', msg, h: secondaryHeight(msg), top })
  const sentTop = top
  push({ kind: 'sent', h: SENT_H, top })
  return { blocks, contentH: top, motherTop, sentTop }
}

export const HISTORY_VIEWPORT_H = 510 // Y110–620
export const HISTORY_VIEWPORT_Y = 110
