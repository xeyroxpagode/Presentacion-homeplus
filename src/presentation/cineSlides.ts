/**
 * Integration map between the cinematic run in `src/cine` and the S04-S13
 * slides of the main presentation.
 *
 * `src/cine` is one continuous composition: `CineScene({ step })` renders every
 * surface at once and each one gates itself on a step range, while the
 * travelers move through an analytic `at[step]` position table. It is therefore
 * driven by a single global step number, not by independent scenes.
 *
 * The presentation drives (slideIndex, stepIndex) instead, so each cine slide
 * declares the first cine step it owns and `stepCount` covers the rest of its
 * block. Blocks are contiguous and cut only where the colleague's sequence
 * breaks cleanly.
 *
 * Deliberately NOT mapped, with reasons:
 *   - S07 "Coordinar no es vigilar": the cine run has no counterpart. Kept.
 *   - S12 "Frontend/Backend": kept; the single STK step goes to S13, whose
 *     name matches.
 *   - cine 8-34 only. Steps 0-7 are the opening/logo zoom that S01-S03 already
 *     own, and 35-36 are Fricción and Cierre, which are S14 and S18.
 *
 * Source of truth for the step semantics: `src/cine/CineApp.tsx` (STEP_NAMES).
 */

/** slideIndex -> first cine step owned by that slide. */
export const CINE_SLIDE_STARTS: Readonly<Record<number, number>> = {
  3: 8, // S04 Home        -> Organización, Home, Tarea protagonista
  4: 11, // S05 Planner     -> Tareas, Responsabilidades, Calendario, Planes, Puente a Familia
  5: 16, // S06 Familia     -> F01 Familia .. F06 Cumpleaños
  7: 22, // S08 Inventario  -> I01 Entrada .. I05 Puente al gasto
  8: 27, // S09 Finanzas    -> FIN F01 Intención, FIN F02 Resumen
  9: 29, // S10 Activos     -> PS5, Ficha, HomeCloud, Recuerdos
  10: 33, // S11 Continuidad -> CON
  12: 34, // S13 Stack       -> STK
}

/**
 * Contiguous cine blocks. Slides inside a run share one mounted `CineScene`
 * so the travelers animate across slide boundaries; the run id becomes the
 * section key in `Presentation`, which is what keeps React from remounting.
 * A run that is split by a non-cine slide (S07, S12) is a separate run.
 */
export const CINE_RUNS: readonly (readonly number[])[] = [
  [3, 4, 5], // S04, S05, S06
  [7, 8, 9, 10], // S08, S09, S10, S11
  [12], // S13
]

export function isCineSlide(slideIndex: number): boolean {
  return Object.prototype.hasOwnProperty.call(CINE_SLIDE_STARTS, slideIndex)
}

/** Stable per-run key, or null when the slide is not a cine slide. */
export function cineRunKey(slideIndex: number): string | null {
  for (let run = 0; run < CINE_RUNS.length; run++) {
    if (CINE_RUNS[run].includes(slideIndex)) return `cine-${run + 1}`
  }
  return null
}

/** Global cine step for a presentation position, or null when not a cine slide. */
export function cineStepFor(slideIndex: number, stepIndex: number): number | null {
  if (!isCineSlide(slideIndex)) return null
  return CINE_SLIDE_STARTS[slideIndex] + stepIndex
}

/** Mirrors `STEP_NAMES` in `src/cine/CineApp.tsx` for the mapped range. */
const CINE_STEP_NAMES = [
  '', '', '', '', '', '', '', '',
  'Organización',
  'Home',
  'Tarea protagonista',
  'Planner · Tareas',
  'Tareas y responsabilidades',
  'Calendario',
  'Horarios y Planes',
  'Puente hacia Familia',
  'F01 · Familia',
  'F02 · Tomi y su familia',
  'F03 · Tomi y su situación',
  'F04 · Mapa',
  'F05 · Mensajes',
  'F06 · Cumpleaños',
  'I01 · Entrada a Inventario',
  'I02 · Inventario',
  'I03 · Existencias y faltantes',
  'I04 · Lista de compras',
  'I05 · Puente al gasto',
  'FIN F01 · Intención y gasto',
  'FIN F02 · Resumen y análisis',
  'AST A01 · PlayStation 5',
  'AST A02 · Ficha y documentos',
  'HC · Archivo en HomeCloud',
  'MEM · Recuerdos',
  'CON · Continuidad',
  'STK · Stack técnico',
  'BAR · Fricción',
  'CIE · Cierre',
] as const

export function cineStepName(step: number): string {
  return CINE_STEP_NAMES[step] ?? `Step ${step}`
}