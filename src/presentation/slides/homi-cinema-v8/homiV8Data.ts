// HOMIE V8 — Contrato canónico de datos de demostración (congelado).
// Reemplaza homiV7Data.ts como única fuente cinematográfica activa de S15–S17.
// Determinista: ningún render genera datos nuevos ni lee el reloj del navegador.
// Fecha demo: D0 = 2026-08-16 (hoy), D1 = 2026-08-17 (mañana). Sin Date.now().

import type { PlannerTask } from '../../app-screens/PlannerDemoScreen/plannerData'
import { juliTasks, schoolEvent } from '../../app-screens/PlannerDemoScreen/plannerData'
import { shoppingSummary } from '../../app-screens/InventoryDemoScreen/inventoryData'

// ---------------------------------------------------------------------------
// Fecha de demostración (verificada contra HomeDemoScreen: "Domingo, 16 de agosto").
// ---------------------------------------------------------------------------
export const D0_ISO = '2026-08-16'
export const D1_ISO = '2026-08-17'
export const D0_LABEL = 'Domingo 16 de agosto'
export const D1_LABEL = 'Mañana · lunes 17 de agosto'
export const D1_SHORT = 'Mañana'

// ---------------------------------------------------------------------------
// Intención Coca. El guion oral trae "Haceme acordar de ir mañana a comprar
// una Coca."; la UI normaliza ortografía manteniendo el pedido natural.
// ---------------------------------------------------------------------------
export const COCA_MESSAGE_UI = 'Haceme acordar de ir mañana a comprar una Coca'
export const COCA_MESSAGE_FULL = 'Haceme acordar de ir mañana a comprar una Coca.'
export const COCA_GROUPS = ['Haceme acordar', 'de ir mañana', 'a comprar una Coca'] as const
export const COCA_OP_KIND = 'Crear tarea'
export const COCA_TASK_TITLE = 'Ir a comprar una Coca'
/** Hora 18:00: dato del escenario de demostración, congelado explícitamente. */
export const COCA_TIME = '18:00'

// Único registro escénico Coca (id propio de V8; no existe antes de P07).
export const COCA_TASK: PlannerTask = {
  id: 'coca-homi-v8',
  title: COCA_TASK_TITLE,
  assignee: 'Sin responsable',
  dueLabel: D1_SHORT,
}

export const TODAY_TASKS: readonly PlannerTask[] = juliTasks

/** Tareas visibles en Planner una vez confirmada la Coca (P07+). */
export const PLANNER_AFTER_CONFIRM: readonly PlannerTask[] = [TODAY_TASKS[0], COCA_TASK, ...TODAY_TASKS.slice(1)]

// ---------------------------------------------------------------------------
// Intención financiera importante (demostración editorial silenciosa que
// acompaña la frase de Benja; no forma de sus palabras pronunciadas).
// Nada se registra ni se paga: es una propuesta escénica pendiente de decisión.
// ---------------------------------------------------------------------------
export const FIN_MESSAGE_UI = 'Registrá mi sueldo y prepará el pago de los impuestos pendientes del mes.'
/** Mensaje completo para aria/thread (idéntico al UI: ya incluye punto final). */
export const FIN_MESSAGE_FULL = FIN_MESSAGE_UI
export const FIN_GROUPS = ['Registrá mi sueldo', 'y prepará el pago', 'de los impuestos pendientes del mes.'] as const
export const FIN_OP_KIND = 'Propuesta de cambios'
export const FIN_OP_SUB = '3 acciones para revisar'
export const FIN_STATUS = 'Sin ejecutar'

export type FinChangeKind = 'Ingreso' | 'Pago'
export type FinChange = {
  kind: FinChangeKind
  title: string
  detail: string
  state: 'Pendiente'
}

// Nombres genéricos deliberados: HomePlus Finance registra y gestiona pagos,
// pero no necesariamente transfiere dinero real a un organismo tributario.
// Sin importes, vencimientos ni obligaciones personales inventadas.
export const FIN_CHANGES: readonly FinChange[] = [
  { kind: 'Ingreso', title: 'Registrar ingreso de sueldo', detail: 'Agregar el sueldo como ingreso del mes', state: 'Pendiente' },
  { kind: 'Pago', title: 'Preparar pago de impuesto pendiente', detail: 'Requiere revisión antes de confirmar', state: 'Pendiente' },
  { kind: 'Pago', title: 'Preparar otro pago tributario pendiente', detail: 'Requiere revisión antes de confirmar', state: 'Pendiente' },
]

// ---------------------------------------------------------------------------
// Tres mañanas (P19–P21). Una misma fecha (D1), tres respuestas desde datos
// autorizados por fixtures. La Coca solo aparece como contexto compartido
// visible, nunca como responsabilidad personal asignada.
// ---------------------------------------------------------------------------
export type ProfileSource = 'planner-fixture' | 'inventory-fixture' | 'scenic-controlled'

export type ProfileRecord = {
  title: string
  meta: string
  source: ProfileSource
  sourceRef: string
}

export type ProfileAnswer = {
  id: 'tomi' | 'juli' | 'papa'
  name: string
  initial: string
  color: string
  tag: string
  whenRef: string
  summary: string
  records: readonly ProfileRecord[]
}

export const TOMORROW_QUESTION = '¿Qué me queda para mañana?'

export const PROFILE_ANSWERS: readonly ProfileAnswer[] = [
  {
    id: 'tomi',
    name: 'Tomi',
    initial: 'T',
    color: '#2D6A8A',
    tag: 'Club',
    whenRef: D1_LABEL,
    summary: 'Entrenamiento',
    records: [
      {
        title: 'Entrenamiento',
        meta: 'En casa · Mañana 17:00',
        source: 'scenic-controlled',
        sourceRef: 'homiV8Data.TOMI_TRAINING (scenic; ancla narrativa: HomiContextDemoScreen PERSONAS.tomi)',
      },
      {
        title: COCA_TASK_TITLE,
        meta: 'En casa · Compartida',
        source: 'scenic-controlled',
        sourceRef: 'homiV8Data.COCA_TASK (contexto compartido visible, sin responsable asignado)',
      },
    ],
  },
  {
    id: 'juli',
    name: 'Juli',
    initial: 'J',
    color: '#B57A1A',
    tag: 'Colegio',
    whenRef: D1_LABEL,
    summary: 'Educación Física',
    records: [
      {
        title: schoolEvent.title,
        meta: schoolEvent.dateLabel,
        source: 'planner-fixture',
        sourceRef: 'plannerData.schoolEvent',
      },
      {
        title: 'Autorización completada',
        meta: 'Llevada hoy · Juli',
        source: 'planner-fixture',
        sourceRef: 'plannerData.juliTasks[authorization] (completed=true verificado)',
      },
    ],
  },
  {
    id: 'papa',
    name: 'Papá',
    initial: 'P',
    color: '#4A4542',
    tag: 'Hogar',
    whenRef: D1_LABEL,
    summary: 'Sin compromisos personales registrados',
    records: [
      {
        title: shoppingSummary.title,
        meta: `${shoppingSummary.subtitle} · En casa`,
        source: 'inventory-fixture',
        sourceRef: 'inventoryData.shoppingSummary (contexto compartido, no obligación personal)',
      },
    ],
  },
]

// ---------------------------------------------------------------------------
// Director determinista V8: 23 disparadores P01–P23 (S15: 7 · S16: 8 · S17: 8).
// Cada beat reconstruye su snapshot correcto sin reproducir la secuencia.
// Sin mutaciones reales, sin reloj del sistema, sin autoavance.
// ---------------------------------------------------------------------------
export type HomiV8Beat =
  | 'P01' | 'P02' | 'P03' | 'P04' | 'P05' | 'P06' | 'P07'
  | 'P08' | 'P09' | 'P10' | 'P11' | 'P12' | 'P13' | 'P14' | 'P15'
  | 'P16' | 'P17' | 'P18' | 'P19' | 'P20' | 'P21' | 'P22' | 'P23'

export const S15_BEATS: readonly HomiV8Beat[] = ['P01', 'P02', 'P03', 'P04', 'P05', 'P06', 'P07']
export const S16_BEATS: readonly HomiV8Beat[] = ['P08', 'P09', 'P10', 'P11', 'P12', 'P13', 'P14', 'P15']
export const S17_BEATS: readonly HomiV8Beat[] = [
  'P16', 'P17', 'P18', 'P19', 'P20', 'P21', 'P22', 'P23',
]

const BEAT_ORDER: readonly HomiV8Beat[] = [...S15_BEATS, ...S16_BEATS, ...S17_BEATS]

export function beatIndex(beat: HomiV8Beat): number {
  return BEAT_ORDER.indexOf(beat)
}

export type SceneKind =
  | 'homi-empty'
  | 'composer-focus'
  | 'coca-typing'
  | 'coca-sent'
  | 'interpreting'
  | 'proposal-coca'
  | 'confirm-press'
  | 'planner-morph'
  | 'carousel-mirar'
  | 'carousel-comparar'
  | 'carousel-control'
  | 'homi-return'
  | 'fin-typing'
  | 'fin-interpreting'
  | 'proposal-finance'
  | 'blackout'
  | 'homi-low'
  | 'context-orbit'
  | 'context-converge'
  | 'question'
  | 'perspectives'
  | 'answers'
  | 'lockup'
  | 'home-reveal'

/** Composición activa por beat: el director decide qué escena se monta. */
export function sceneFor(beat: HomiV8Beat): SceneKind {
  switch (beat) {
    case 'P01': return 'homi-empty'
    case 'P02': return 'composer-focus'
    case 'P03': return 'coca-typing'
    case 'P04': return 'interpreting'
    case 'P05': return 'proposal-coca'
    case 'P06': return 'confirm-press'
    case 'P07': return 'planner-morph'
    case 'P08': return 'carousel-mirar'
    case 'P09': return 'carousel-comparar'
    case 'P10': return 'carousel-control'
    case 'P11': return 'homi-return'
    case 'P12': return 'fin-typing'
    case 'P13': return 'fin-interpreting'
    case 'P14': return 'proposal-finance'
    case 'P15': return 'blackout'
    case 'P16': return 'homi-low'
    case 'P17': return 'context-orbit'
    case 'P18': return 'context-converge'
    case 'P19': return 'question'
    case 'P20': return 'perspectives'
    case 'P21': return 'answers'
    case 'P22': return 'lockup'
    case 'P23': return 'home-reveal'
  }
}

/** Snapshot determinista de estado lógico (puro, sin efectos). */
export function demoStateFor(beat: HomiV8Beat) {
  const i = beatIndex(beat)
  return {
    /** Intención Coca enviada como burbuja (P03+). */
    cocaSent: i >= beatIndex('P03'),
    /** Propuesta Coca pendiente de decisión (P05). */
    cocaProposal: i === beatIndex('P05'),
    /** Confirmación registrada: Confirmar se presionó una vez (P06+). */
    confirmed: i >= beatIndex('P06'),
    /** Planner muestra la fila Coca real (P07+). */
    plannerHasCoca: i >= beatIndex('P07'),
    /** Propuesta financiera visible y NUNCA ejecutada (P14 únicamente). */
    financeProposal: i === beatIndex('P14'),
    /** Negro absoluto entre oradores (P15). */
    blackout: beat === 'P15',
    /** Pregunta única visible (P19–P21). */
    questionVisible: i >= beatIndex('P19') && i <= beatIndex('P21'),
    /** Tres respuestas completas (P21). */
    answersVisible: i >= beatIndex('P21'),
    /** Lockup Homi ≋ HomePlus (P22). */
    lockup: beat === 'P22',
    /** Home digital final estable, handoff al hilo 3D (P23). */
    homeFinal: beat === 'P23',
  }
}

// ---------------------------------------------------------------------------
// Contrato de salida: Home digital estable, listo para el tramo 3D.
// ---------------------------------------------------------------------------
export const HOMI_V8_EXIT_CONTRACT = {
  surface: 'HomeDemoScreen (nativa, sin adaptaciones de anatomía; solo tokens amplificados)',
  contentSource: 'fixtures Planner/Finance/Inventory + Home (Domingo 16 de agosto)',
  dataState: 'estable: 2 tareas Hoy (Juli) + evento Educación Física (Mañana); sin popovers ni propuestas',
  scale: '1 (geometría nativa, amplificada por tokens; stage 1280×720 = lienzo completo)',
  position: 'completa: left=0, top=0, width=1280, height=720',
  overlays: 'ninguno',
  animationState: 'sin animaciones activas (hold estable)',
  ready: 'data-homi-v8-ready="true" cuando el hold P23 está montado',
  handoff: 'El tramo siguiente toma este fotograma y realiza el movimiento hacia el teléfono/mundo físico. V8 no inclina, aleja ni enmarca el dispositivo.',
} as const

// ---------------------------------------------------------------------------
// Etiquetas del guion por beat (solo para aria/registro; no se renderizan).
// ---------------------------------------------------------------------------
export const BEAT_LABELS: Record<HomiV8Beat, string> = {
  P01: 'Y ahí aparece Homi',
  P02: 'Por ejemplo…',
  P03: COCA_MESSAGE_FULL,
  P04: 'Geni entiende esa intención',
  P05: 'Nos muestra una propuesta',
  P06: 'Recién después de esa confirmación',
  P07: 'HomePlus realiza la acción',
  P08: 'La interfaz sigue siendo mejor cuando queremos mirar',
  P09: 'Comparar',
  P10: 'O tener control visual',
  P11: 'Geni aparece cuando decir es más rápido',
  P12: 'Y si una intención implica cambiar algo importante…',
  P13: 'Geni puede interpretar…',
  P14: 'Y proponer, pero la decisión final sigue siendo nuestra',
  P15: 'Fin de Benja (negro)',
  P16: 'Cuando le decimos algo a Homi no siempre buscamos algo en particular',
  P17: 'Relacione las cosas: pendientes, gastos o compras',
  P18: 'Homi agarra lo que necesita y lo usa para respondernos',
  P19: TOMORROW_QUESTION,
  P20: 'La puede hacer Tomi, Juli o papá',
  P21: 'La pregunta es la misma, pero la respuesta no',
  P22: 'Homi ≋ HomePlus',
  P23: 'El objetivo no es pasar más tiempo dentro de HomePlus. Es al revés.',
}
