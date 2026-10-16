// HOMIE V7 — Contrato canónico de datos de demostración.
// Reemplaza homiV6Data.ts como única fuente cinematográfica activa de S15–S17.
// Congelado y determinista: ningún render genera datos nuevos ni lee el reloj
// del navegador. Fecha demo: D0 = 2026-08-16, D1 = 2026-08-17 (lunes).

import type { PlannerTask } from '../../app-screens/PlannerDemoScreen/plannerData'
import { juliTasks, schoolEvent } from '../../app-screens/PlannerDemoScreen/plannerData'
import { shoppingSummary } from '../../app-screens/InventoryDemoScreen/inventoryData'

// ---------------------------------------------------------------------------
// Fecha de demostración (idéntica a V6, verificada contra HomeDemoScreen).
// ---------------------------------------------------------------------------
export const D0_ISO = '2026-08-16'
export const D1_ISO = '2026-08-17'
export const D0_LABEL = 'Domingo 16 de agosto'
export const D1_LABEL = 'Mañana · lunes 17 de agosto'
export const D1_SHORT = 'Mañana'

// ---------------------------------------------------------------------------
// Intención Coca. Texto UI con ortografía normalizada; el guion oral trae
// "compar" / "Haceme acordar de ir mañana a compar una coca".
// ---------------------------------------------------------------------------
export const COCA_MESSAGE_UI = 'Haceme acordar de ir mañana a comprar una Coca'
export const COCA_MESSAGE_FULL = 'Haceme acordar de ir mañana a comprar una Coca.'
export const COCA_GROUPS = ['Haceme acordar', 'de ir mañana', 'a comprar una Coca'] as const
export const COCA_OP_KIND = 'Crear tarea'
export const COCA_TASK_TITLE = 'Ir a comprar una Coca'

// Único registro escénico Coca. Existe en la historia solo desde B06
// (Planner posterior a la confirmación). Sin responsable inventado.
export const COCA_TASK: PlannerTask = {
  id: 'coca-homi-v7',
  title: COCA_TASK_TITLE,
  assignee: 'Sin responsable',
  dueLabel: D1_SHORT,
}

// Contexto adyacente auténtico: dataset real de Planner.
export const TODAY_TASKS: readonly PlannerTask[] = juliTasks

// Tareas visibles en Planner una vez confirmada la Coca (B06+).
export const PLANNER_AFTER_CONFIRM: readonly PlannerTask[] = [...TODAY_TASKS, COCA_TASK]

// ---------------------------------------------------------------------------
// Tres mañanas (G20–G21). Una misma fecha (D1), tres respuestas desde datos
// autorizados. V7 corrige a V6: papá NO muestra seguro/importe (la espec
// prohíbe inventar seguro, importe o fecha de vencimiento como compromiso
// personal); Tomi suma la Coca como contexto compartido visible (no como
// responsabilidad personal asignada: el registro sigue sin responsable).
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
        sourceRef: 'homiV7Data.TOMI_TRAINING (scenic; ancla narrativa: HomiContextDemoScreen PERSONAS.tomi)',
      },
      {
        title: COCA_TASK_TITLE,
        meta: 'Hogar · Compartida · Mañana',
        source: 'scenic-controlled',
        sourceRef: 'homiV7Data.COCA_TASK (contexto compartido visible, sin responsable asignado)',
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
      {
        title: 'Autorización completada',
        meta: 'Llevada hoy · Juli',
        source: 'planner-fixture',
        sourceRef: 'plannerData.juliTasks[authorization] (completed)',
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
    summary: 'No tenés compromisos personales registrados para mañana.',
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
// Director determinista V7: 27 disparadores B01–B13 / G14–G27.
// Cada beat reconstruye su snapshot correcto sin reproducir la secuencia.
// Sin mutaciones reales, sin reloj del sistema, sin autoavance.
// ---------------------------------------------------------------------------
export type HomiV7Beat =
  | 'B01' | 'B02' | 'B03' | 'B04' | 'B05' | 'B06' | 'B07'
  | 'B08' | 'B09' | 'B10' | 'B11' | 'B12' | 'B13'
  | 'G14' | 'G15' | 'G16' | 'G17' | 'G18' | 'G19' | 'G20'
  | 'G21' | 'G22' | 'G23' | 'G24' | 'G25' | 'G26' | 'G27'

export const S15_BEATS: readonly HomiV7Beat[] = ['B01', 'B02', 'B03', 'B04', 'B05', 'B06', 'B07']
export const S16_BEATS: readonly HomiV7Beat[] = ['B08', 'B09', 'B10', 'B11', 'B12', 'B13']
export const S17_BEATS: readonly HomiV7Beat[] = [
  'G14', 'G15', 'G16', 'G17', 'G18', 'G19', 'G20',
  'G21', 'G22', 'G23', 'G24', 'G25', 'G26', 'G27',
]

const BEAT_ORDER: readonly HomiV7Beat[] = [...S15_BEATS, ...S16_BEATS, ...S17_BEATS]

export function beatIndex(beat: HomiV7Beat): number {
  return BEAT_ORDER.indexOf(beat)
}

/** Snapshot determinista para un beat (estado lógico puro). */
export function demoStateFor(beat: HomiV7Beat) {
  const i = beatIndex(beat)
  const confirmed = i >= beatIndex('B05')
  return {
    /** La confirmación lógica ocurrió (B05+). */
    confirmed,
    /** Planner muestra la fila Coca (desde B06). */
    plannerHasCoca: i >= beatIndex('B06'),
    /** Negro absoluto entre oradores. */
    blackout: beat === 'B13',
  }
}

// ---------------------------------------------------------------------------
// Contrato de salida: Home digital estable, listo para el hilo 3D.
// ---------------------------------------------------------------------------
export const HOMI_V7_EXIT_CONTRACT = {
  surface: 'HomeDemoScreen (nativa, sin adaptaciones de anatomía)',
  contentSource: 'fixtures Planner/Finance/Inventory + Home (Domingo 16 de agosto)',
  dataState: 'estable: 2 tareas Hoy (Juli) + evento Educación Física (Mañana); sin popovers ni propuestas',
  visibleComponents: ['HomeHeader (Juli)', 'Hoy: Llevar autorización, Tarea de Matemática', 'Próximamente: Educación Física', 'HomeNavigation'],
  scale: '1 (geometría nativa del componente, centrada en stage 1280×720)',
  position: 'centrada: X=640, Y=360 (lienzo lógico)',
  overlays: 'ninguno',
  animationState: 'sin animaciones activas (hold estable)',
  ready: 'data-homi-v7-ready="true" cuando el hold G27 está montado',
} as const
