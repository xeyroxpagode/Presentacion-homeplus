import type { PlannerTask } from '../../app-screens/PlannerDemoScreen/plannerData'
import { juliTasks } from '../../app-screens/PlannerDemoScreen/plannerData'

// HOMI V3.1 — datos fijos de la película.
// Canvas del runtime: 1280×720 (16:9). Toda la geometría editorial del spec
// (1920×1080) se adapta con k = 2/3, misma proporción, sin deformación.

export type HomiBeat =
  | 'I00' | 'I01' | 'I02' | 'I04' | 'I06'
  | 'I08' | 'I09'
  | 'I10' | 'I11' | 'I12' | 'I13'

export const REQUEST_FULL = 'Haceme acordar de ir mañana a comprar una Coca.'

export const REQUEST_SEGMENTS = {
  conversational: 'Haceme acordar',
  // "de ir mañana" se parte en conector + fecha para el morph semántico.
  connector: 'de ir',
  dateWord: 'mañana',
  action: 'a comprar una Coca.',
} as const

export const PROPOSAL_TASK_TITLE = 'Ir a comprar una Coca'
export const PROPOSAL_TASK_DATE = 'Mañana'

export const COCA_TASK: PlannerTask = {
  id: 'coca-homi-film',
  title: PROPOSAL_TASK_TITLE,
  assignee: 'Benja',
  dueLabel: PROPOSAL_TASK_DATE,
}

// Vecinas reales: dataset auténtico de Planner (grupo Hoy).
export const TODAY_TASKS = juliTasks

export const CHANGE_REQUEST = 'Pasá el cumple de Juli del sábado al domingo, a la misma hora.'

export const CHANGE_EVENT = {
  title: 'Cumple de Juli',
  currentDay: 'Sábado',
  proposedDay: 'Domingo',
  hour: '19:00',
} as const

// Reconciliación V3.1 (I00–I13, 10 triggers) con el registry real.
// S15 conserva 5 steps, S16 pasa de 5 a 2, S17 conserva 4.
export const S15_BEATS: readonly HomiBeat[] = ['I00', 'I01', 'I02', 'I04', 'I06']
export const S16_BEATS: readonly HomiBeat[] = ['I08', 'I09']
export const S17_BEATS: readonly HomiBeat[] = ['I10', 'I11', 'I12', 'I13']
