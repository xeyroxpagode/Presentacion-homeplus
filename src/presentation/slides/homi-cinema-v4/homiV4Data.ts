// HOMI V4.2 — datos y estados de la película B + C.
// Doce disparadores manuales T01..T12 sobre el registry existente:
// S15 = T01..T06 (stepCount 6) · S16 = T07..T09 (stepCount 3) · S17 = T10..T12 (stepCount 3).
// Todo determinista: datos escénicos fijos, sin mutaciones reales, sin reloj del sistema.

import type { PlannerTask } from '../../app-screens/PlannerDemoScreen/plannerData'
import { juliTasks } from '../../app-screens/PlannerDemoScreen/plannerData'

export type HomiTrigger =
  | 'T01' | 'T02' | 'T03' | 'T04' | 'T05' | 'T06'
  | 'T07' | 'T08' | 'T09'
  | 'T10' | 'T11' | 'T12'

// Solicitud normalizada ortográficamente (el guion oral trae "compar").
export const REQUEST_FULL = 'Haceme acordar de ir mañana a comprar una Coca.'

export const PROPOSAL_TASK_TITLE = 'Ir a comprar una Coca'
export const PROPOSAL_TASK_DATE = 'Mañana'

// Único registro escénico de Coca. Existe en la historia solo después de
// confirmar (T06+). Responsable default coherente con el modelo, sin
// asignaciones personales inventadas.
export const COCA_TASK: PlannerTask = {
  id: 'coca-homi-v4',
  title: PROPOSAL_TASK_TITLE,
  assignee: 'Sin responsable',
  dueLabel: PROPOSAL_TASK_DATE,
}

// Contexto adyacente auténtico: dataset real de Planner (grupo Hoy).
export const TODAY_TASKS = juliTasks

export const CHANGE_REQUEST = 'Pasá el cumple de Juli del sábado al domingo, a la misma hora.'

export const CHANGE_EVENT = {
  title: 'Modificar Cumple de Juli',
  currentDay: 'Sábado',
  proposedDay: 'Domingo',
  hour: '19:00',
} as const

// Mapeo trigger → steps del registry (índices externos sin cambios).
export const S15_TRIGGERS: readonly HomiTrigger[] = ['T01', 'T02', 'T03', 'T04', 'T05', 'T06']
export const S16_TRIGGERS: readonly HomiTrigger[] = ['T07', 'T08', 'T09']
export const S17_TRIGGERS: readonly HomiTrigger[] = ['T10', 'T11', 'T12']
