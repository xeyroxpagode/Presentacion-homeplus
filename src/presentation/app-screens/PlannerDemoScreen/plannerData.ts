export type PlannerTab = 'tasks' | 'calendar' | 'plans'
export type PlannerTask = { id: string; title: string; assignee: string; dueLabel: string; completed?: boolean }
export type PlannerEvent = { title: string; context: string; day: number; dateLabel: string }
export type PlannerPlan = { title: string; dueLabel: string; steps: readonly { id: string; title: string }[] }

export const plannerTabs = [
  { id: 'tasks', label: 'Tareas' },
  { id: 'calendar', label: 'Calendario' },
  { id: 'plans', label: 'Planes' },
] as const

export const juliTasks: readonly PlannerTask[] = [
  { id: 'authorization', title: 'Llevar autorización', assignee: 'Juli', dueLabel: 'Hoy', completed: true },
  { id: 'schoolTask', title: 'Tarea de Matemática', assignee: 'Juli', dueLabel: 'Hoy', completed: true },
]

// Monday 17 August 2026 is tomorrow relative to the frozen Home date.
export const schoolEvent: PlannerEvent = {
  title: 'Educación Física', context: 'Juli · Colegio', day: 17, dateLabel: 'Lunes 17 · Mañana',
}

export const birthdayPlan: PlannerPlan = {
  title: 'Cumpleaños', dueLabel: 'Sábado',
  steps: [
    { id: 'distribute', title: 'Repartir tareas' },
    { id: 'prepare', title: 'Preparar cosas' },
    { id: 'shopping', title: 'Comprar lo que falta' },
  ],
}

export const plannerWeek = [
  { day: 'L', number: 17 }, { day: 'M', number: 18 }, { day: 'X', number: 19 },
  { day: 'J', number: 20 }, { day: 'V', number: 21 }, { day: 'S', number: 22 }, { day: 'D', number: 23 },
] as const
