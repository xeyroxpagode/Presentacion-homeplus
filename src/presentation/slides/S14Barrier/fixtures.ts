/**
 * S14 Friction Editorial V6.0 — data contract (F1, §27).
 *
 * READ-ONLY scenic fixtures. Nothing here is persisted, posted or mutated:
 * - `friction-task-preview` is a temporary scenic intent, never inserted into
 *   any HOY/MAÑANA group, never assigned a database id.
 * - PlayStation / warranty / PDF are frozen reads from verified sources.
 *
 * Provenance levels (§1.3):
 * [RUNTIME]  verified in this repo's presentation runtime.
 * [CENSUS]   verified in audit/runtime/session-0{2,3} Figma censuses.
 * [TARGET]   V6.0 contract TARGET (Level 2 authority) carried from the
 *            V5 census where the census has no contradicting value.
 *
 * | Value | Provenance |
 * |---|---|
 * | Planner rows `Llevar autorización` / `Tarea de Matemática` (Juli) | [RUNTIME] plannerData.ts + HomeDemoScreen |
 * | Planner grammar: avatar-initial + title + meta + action lane, NO left checkbox | [CENSUS] fig-cal-Tareas.json |
 * | Groups HOY / MAÑANA, values `Sin responsable`, `Hoy`, `Mañana` | [CENSUS] fig-cal-Tareas.json |
 * | Assets rows + PlayStation 5 `Ahora con Tomi` | [CENSUS] fig-act-root.json |
 * | Neighbours `Notebook de trabajo · Trabajo`, `Taladro Bosch · Ahora con Martín — vecino` | [CENSUS] fig-act-root.json |
 * | PS5 detail: Consola / Ahora con Tomi / Está en Casa de Tomi / A cargo de Gabriel | [CENSUS] fig-act-detail-playstation-5.census.json |
 * | Warranty row `Garantía · hasta enero de 2027 · 1 documento`, sibling `Factura de compra.pdf · PDF · 1,1 MB` | [CENSUS] fig-act-detail-playstation-5.census.json |
 * | Palette tokens | [CENSUS] fig tokens == V6 §4.5 exactly |
 * | Doc `Garantía PS5.pdf · PDF · 620 KB` inside warranty record | [TARGET] V6 §§15–16 (no census contradicting value; NOT presented as product field census) |
 * | Intent `Preparar la mochila de Juli`, `Sin fecha` initial | [TARGET] V6 §8 (scenic-only, `persisted: false`) |
 * | Date options `Sin fecha / Hoy / Mañana` (V5 `Sáb 02` omitted) | [CENSUS]-attested values; §11.2 omission documented |
 */

export const SCENIC_TASK = {
  id: 'friction-task-preview',
  title: 'Preparar la mochila de Juli',
  metaInitial: 'Sin responsable · Sin fecha',
  assignee: 'Sin responsable',
  dateFrom: 'Sin fecha',
  dateTo: 'Mañana',
  time: 'Sin hora',
  persisted: false,
} as const

/** Authentic Planner rows reused from the runtime collection (never mutated). */
export const PLANNER_ROWS = [
  { id: 'authorization', title: 'Llevar autorización', meta: 'Juli · Hoy', initial: 'J' },
  { id: 'schoolTask', title: 'Tarea de Matemática', meta: 'Juli · Hoy', initial: 'T' },
] as const

export const PLANNER_GROUP_LABEL = 'Hoy' as const

/** Census-verified Assets neighbours. PlayStation 5 is the mandatory hero. */
export const ASSET_NEIGHBOURS: readonly { id: string; name: string; meta: string; hero?: boolean }[] = [
  { id: 'notebook', name: 'Notebook de trabajo', meta: 'Trabajo' },
  { id: 'ps5', name: 'PlayStation 5', meta: 'Ahora con Tomi', hero: true },
  { id: 'taladro', name: 'Taladro Bosch', meta: 'Ahora con Martín — vecino' },
] as const

export const SCENIC_ASSET = {
  id: 'ps5',
  name: 'PlayStation 5',
  category: 'Consola',
  nowWith: 'Ahora con Tomi',
  location: 'Está en Casa de Tomi',
  keeper: 'A cargo de Gabriel',
} as const

export const SCENIC_WARRANTY = {
  id: 'r-garantia-ps5',
  name: 'Garantía PlayStation 5',
  typeLabel: 'Tipo',
  typeValue: 'Garantía',
  untilLabel: 'Hasta',
  untilValue: 'enero de 2027',
  untilPrefix: 'Hasta enero de 2027',
  docLabel: 'Documento asociado',
  sibling: { name: 'Factura de compra.pdf', meta: 'PDF · 1,1 MB' },
} as const

export const SCENIC_PDF = {
  id: 'd-garantia-ps5',
  name: 'Garantía PS5.pdf',
  meta: 'PDF · 620 KB',
} as const

/** §11.2: only source-attested options. V5 `Sáb 02` deliberately omitted. */
export const DATE_OPTIONS = ['Sin fecha', 'Hoy', 'Mañana'] as const

/** Exact final question (§2.2 / §20). Never reformulate. */
export const FINAL_QUESTION_LINE_1 = '¿Qué pasaría si ni siquiera' as const
export const FINAL_QUESTION_LINE_2 = 'tuviéramos que saber cómo?' as const
export const FINAL_QUESTION_FULL = '¿Qué pasaría si ni siquiera tuviéramos que saber cómo?' as const

/** Cue map (§2.2). */
export const CUES = [
  { id: 'G01', line: 'Aunque incluso con todo esto conectado', visual: 'HOME integrada' },
  { id: 'G02', line: 'Sigue existiendo fricción', visual: 'Cambio sutil de atención' },
  { id: 'G03', line: 'Si quiero crear una tarea', visual: 'Planner e intención de tarea' },
  { id: 'G04', line: 'Tengo que saber cómo hacerlo', visual: 'Formulario y fecha' },
  { id: 'G05', line: 'O si quiero buscar una garantía', visual: 'Assets y PlayStation' },
  { id: 'G06', line: 'Tengo que saber dónde está', visual: 'Registro y PDF localizados' },
  { id: 'G07', line: 'No porque la interfaz sea un problema', visual: 'Recomposición ordenada' },
  { id: 'G08', line: 'Simplemente porque todas las aplicaciones tienen su forma de uso', visual: 'HomePlus limpio e inmóvil' },
  { id: 'G09', line: 'Entonces nos hicimos una última pregunta', visual: 'Desaparición de HomePlus' },
  { id: 'G10', line: '¿Qué pasaría si ni siquiera tuviéramos que saber cómo?', visual: 'Únicamente la pregunta' },
] as const
