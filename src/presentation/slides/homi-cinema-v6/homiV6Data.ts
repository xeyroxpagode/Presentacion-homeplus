// HOMI V6 — Contrato canónico de datos de demostración (§4).
// Congelado y determinista: ningún render genera datos nuevos ni lee el
// reloj del navegador. Fuente de fecha: fixtures existentes del producto.

import type { PlannerTask } from '../../app-screens/PlannerDemoScreen/plannerData'
import { juliTasks, schoolEvent } from '../../app-screens/PlannerDemoScreen/plannerData'
import { financePayments } from '../../app-screens/FinanceDemoScreen/financeData'
import { inventoryProducts, shoppingSummary } from '../../app-screens/InventoryDemoScreen/inventoryData'

// ---------------------------------------------------------------------------
// §4.2 Fecha de demostración.
// D0 = domingo 16 de agosto de 2026. Evidencia: HomeDemoScreen muestra
// "Domingo, 16 de agosto" y plannerData.ts documenta "Monday 17 August 2026
// is tomorrow relative to the frozen Home date". D1 es lunes 17/08.
// ---------------------------------------------------------------------------
export const D0_ISO = '2026-08-16'
export const D1_ISO = '2026-08-17'
export const D0_LABEL = 'Domingo 16 de agosto'
export const D1_LABEL = 'Mañana · lunes 17 de agosto'
export const D1_SHORT = 'Mañana'

// ---------------------------------------------------------------------------
// §4.1 Intención Coca. Texto UI con ortografía normalizada (el guion oral
// trae "compar"); misma intención, sin contenido nuevo.
// ---------------------------------------------------------------------------
export const COCA_MESSAGE_UI = 'Haceme acordar de ir mañana a comprar una Coca'
export const COCA_MESSAGE_FULL = 'Haceme acordar de ir mañana a comprar una Coca.'
export const COCA_GROUPS = ['Haceme acordar', 'de ir mañana', 'a comprar una Coca'] as const
export const COCA_OP_KIND = 'Crear tarea'
export const COCA_TASK_TITLE = 'Ir a comprar una Coca'

// Único registro escénico Coca. Existe en la historia solo desde P09
// (Planner posterior a la confirmación). Sin responsable inventado,
// coherente con el modelo de PlannerTask.
// ---------------------------------------------------------------------------
export const COCA_TASK: PlannerTask = {
  id: 'coca-homi-v6',
  title: COCA_TASK_TITLE,
  assignee: 'Sin responsable',
  dueLabel: D1_SHORT,
}

// Contexto adyacente auténtico: dataset real de Planner (grupo Hoy).
export const TODAY_TASKS: readonly PlannerTask[] = juliTasks

// Tareas visibles en Planner una vez confirmada la Coca (P09+).
export const PLANNER_AFTER_CONFIRM: readonly PlannerTask[] = [...TODAY_TASKS, COCA_TASK]

// ---------------------------------------------------------------------------
// §4.4 Tres perfiles. Una misma fecha (D1), tres respuestas desde datos
// autorizados. Origen de cada registro documentado en `source`.
// ---------------------------------------------------------------------------
export type ProfileSource = 'planner-fixture' | 'finance-fixture' | 'inventory-fixture' | 'scenic-controlled'

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
  /** Referencia temporal compartida: idéntica en las tres tarjetas. */
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
    summary: 'Mañana tenés entrenamiento a las 17:00.',
    records: [
      {
        title: 'Entrenamiento',
        meta: 'Club · Mañana 17:00',
        source: 'scenic-controlled',
        // Fixture escénico controlado: la narrativa de entrenamiento de Tomi
        // existe en las demos de Homi (HomiContextDemoScreen: "entrenamiento
        // a las 17 h"). Se congela aquí como demostración explícita.
        sourceRef: 'homiV6Data.TOMI_TRAINING (scenic; ancla narrativa: HomiContextDemoScreen PERSONAS.tomi)',
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
    summary: 'Mañana tenés Educación Física a la mañana.',
    records: [
      {
        title: schoolEvent.title,
        meta: schoolEvent.dateLabel,
        source: 'planner-fixture',
        sourceRef: 'plannerData.schoolEvent',
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
    summary: 'Mañana no tenés nada puntual. Queda lo del hogar.',
    records: [
      {
        title: shoppingSummary.title,
        meta: shoppingSummary.subtitle,
        source: 'inventory-fixture',
        sourceRef: 'inventoryData.shoppingSummary',
      },
      {
        title: financePayments[1].title,
        meta: `${financePayments[1].dueLabel} · ${financePayments[1].amount}`,
        source: 'finance-fixture',
        sourceRef: 'financeData.financePayments[seguro]',
      },
    ],
  },
]

// Re-export de superficies reales usadas en P21–P24 (sin copiar datos).
export { financePayments, inventoryProducts, shoppingSummary }

// ---------------------------------------------------------------------------
// §5 Director determinista: estado lógico puro en función del beat.
// Separación estricta entre estado cinematográfico y estado de producto:
// `confirmed`/`plannerHasCoca` derivan del beat; ningún render muta nada.
// Cada beat reconstruye su estado correcto sin reproducir la secuencia.
// ---------------------------------------------------------------------------
export type HomiV6Beat =
  | 'P01' | 'P02' | 'P03' | 'P04' | 'P05' | 'P06' | 'P07' | 'P08' | 'P09' | 'P10'
  | 'P11' | 'P12' | 'P13' | 'P14' | 'P15' | 'P16' | 'P17' | 'P18' | 'P19'
  | 'P20' | 'P21' | 'P22' | 'P23' | 'P24' | 'P25' | 'P26' | 'P27' | 'P28' | 'P29' | 'P30'
  | 'P31' | 'P32' | 'P33' | 'P34' | 'P35' | 'P36' | 'P37' | 'P38'

export const S15_BEATS: readonly HomiV6Beat[] = ['P01', 'P02', 'P03', 'P04', 'P05', 'P06', 'P07', 'P08', 'P09', 'P10']
export const S16_BEATS: readonly HomiV6Beat[] = ['P11', 'P12', 'P13', 'P14', 'P15', 'P16', 'P17', 'P18', 'P19']
export const S17_BEATS: readonly HomiV6Beat[] = [
  'P20', 'P21', 'P22', 'P23', 'P24', 'P25', 'P26', 'P27', 'P28', 'P29',
  'P30', 'P31', 'P32', 'P33', 'P34', 'P35', 'P36', 'P37', 'P38',
]

const BEAT_ORDER: readonly HomiV6Beat[] = [...S15_BEATS, ...S16_BEATS, ...S17_BEATS]

export function beatIndex(beat: HomiV6Beat): number {
  return BEAT_ORDER.indexOf(beat)
}

/** Lógica de demostración para un beat: snapshot determinista. */
export function demoStateFor(beat: HomiV6Beat) {
  const i = beatIndex(beat)
  const confirmed = i >= beatIndex('P08') && i <= beatIndex('P18')
  // El recuerdo P17–P18 es editorial congelado, no operativo.
  const frozenMemory = beat === 'P17' || beat === 'P18'
  return {
    /** La confirmación lógica ocurrió (P08+,se congela como recuerdo en P17–P18). */
    confirmed,
    /** Planner muestra la fila Coca (desde P09; P08 aún no revela Planner). */
    plannerHasCoca: i >= beatIndex('P09') && i <= beatIndex('P16'),
    /** El recuerdo de propuesta P17–P18 no es interactivo. */
    frozenMemory,
    /** Negro absoluto. */
    blackout: beat === 'P19',
  }
}

// ---------------------------------------------------------------------------
// §10 Contrato de salida: Home digital listo para el hilo 3D.
// ---------------------------------------------------------------------------
export const HOMI_V6_EXIT_CONTRACT = {
  surface: 'HomeDemoScreen (nativa, sin adaptaciones de anatomía)',
  contentSource: 'fixtures Planner/Finance/Inventory + Home (Domingo 16 de agosto)',
  dataState: 'estable: 2 tareas Hoy (Juli) + evento Educación Física (Mañana); sin popovers ni propuestas',
  visibleComponents: ['HomeHeader (Juli)', 'Hoy: Llevar autorización, Tarea de Matemática', 'Próximamente: Educación Física', 'HomeNavigation'],
  // Lienzo lógico 1280×720. Home ocupa el ancho de su geometría real
  // (pantalla de app ~402px) centrada en el stage; el hilo 3D decide la
  // proyección al teléfono. No se impone escala física aquí.
  scale: '1 (geometría nativa del componente, centrada en stage 1280×720)',
  position: 'centrada: X=640, Y=360 (lienzo lógico)',
  overlays: 'ninguno',
  animationState: 'sin animaciones activas (hold estable)',
  ready: 'data-homi-v6-ready="true" cuando el hold P38 está montado',
} as const
