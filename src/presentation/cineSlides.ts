/**
 * Integration map between the cinematic run in `src/cine` and the S04-S11
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
 *   - S07 "Coordinar no es vigilar": its black pause remains a separate scene.
 *   - S12 "Frontend/Backend" and S13 "Stack": local beats; neither consumes
 *     a new global cine step.
 *   - cine 8-34 only. Steps 0-7 are the opening/logo zoom that S01-S03 already
 *     own, and 35-36 are Fricción and Cierre, which are S14 and S18.
 *
 * Source of truth for the step semantics: `src/cine/CineApp.tsx` (STEP_NAMES).
 */

/**
 * S04 R01 V9: seven manually advanced beats (0..6) at global cine step 8.
 * Home general, Juli, Educación Física, autorización, Matemática, conclusion,
 * bridge into Planner. No internal autoadvance. Downstream starts remain fixed.
 */
export const S04_BEAT_COUNT = 7
export const S04_BEAT_NAMES = [
  'Home general',
  'Juli',
  'Educación Física',
  'Llevar autorización',
  'Tarea de Matemática',
  'Home de Juli · síntesis',
  'Entrada a Planner',
] as const

/** S08 owns a local beat axis for C31–C35, which share global steps 22-25. */
export const S08_BEAT_NAMES = [
  'Organización del hogar',
  'Cumpleaños',
  'Preparativos en Planner',
  '¿Qué falta en casa?',
  'Inventario · Productos',
  'Inventario · Estados de stock',
  'Lista de compras',
] as const
export const S08_BEAT_COUNT = S08_BEAT_NAMES.length

export const S09_BEAT_NAMES = [
  'C36 · De la compra al gasto',
  'Finanzas · Movimientos',
  'Movimientos · Cuenta o tarjeta',
  'Finanzas · Pagos',
  'Resumen · Límites de gasto',
  'Finanzas · Resumen mensual',
  'Resumen · Análisis de compras',
] as const
export const S09_BEAT_COUNT = S09_BEAT_NAMES.length

/** S10 keeps C39–C42 on five manual advances; the final click holds the photo. */
export const S10_BEAT_COUNT = 5
export const S10_BEAT_NAMES = [
  'C39 · PlayStation 5',
  'C40 · Ficha y garantía',
  'C41 · HomeCloud Documentos',
  'C42 · HomeCloud Recuerdos',
  'C42 · Fotografía final',
] as const

export const C43_BEAT_NAMES = [
  'C43 · Lo que hay detrás',
  'C43 · Todo relacionado',
  'C43 · La vida no está separada en módulos',
] as const
export const C43_BEAT_COUNT = C43_BEAT_NAMES.length

// Four map beats replace the first Family screen. The five story beats follow.
export const FAMILY_MAP_BEATS = ['Lugares de la familia', 'Ubicaciones compartidas', 'Presentación de Tomi', 'Mapa desde el perfil de Tomi'] as const
export const FAMILY_BEAT_COUNT = FAMILY_MAP_BEATS.length + 5

/** slideIndex -> first cine step owned by that slide. */
export const CINE_SLIDE_STARTS: Readonly<Record<number, number>> = {
  3: 8, // S04 Home        -> R01 seven local beats, same global step 8
  4: 11, // S05 Planner     -> Tareas, Responsabilidades, Calendario, Planes, Puente a Familia
  5: 16, // S06 Familia     -> F01 Familia .. F06 Cumpleaños
  7: 22, // S08 Cumpleaños → C31, C32, I02 .. I05 Puente al gasto
  8: 27, // S09 Finanzas    -> FIN F01 Intención, FIN F02 Resumen
  9: 29, // S10 Activos     -> five manual beats, ending on the step-33 photo hold
  10: 34, // S11 Continuidad -> C43 local beats share the step-34 boundary
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
  if (slideIndex === 5) return CINE_SLIDE_STARTS[5] + Math.max(0, stepIndex - FAMILY_MAP_BEATS.length + 1)
  // S04 does not consume global steps: its 7 beats share global step 8 so the
  // downstream blocks (S05 at 11, S06 at 16, …) keep their exact numbering.
  if (slideIndex === 3) return CINE_SLIDE_STARTS[3]
  // S08 opens with two local birthday beats (C31, C32) that share global step
  // 22, then C33-C35 use the existing Inventory block at 23-25.
  if (slideIndex === 7) return stepIndex <= 3 ? 22 : 23 + (stepIndex - 4)
  if (slideIndex === 8) return stepIndex < 4 ? 27 : 28
  // Continuity uses local beats within global step 34.
  if (slideIndex === 10) return CINE_SLIDE_STARTS[10]
  return CINE_SLIDE_STARTS[slideIndex] + stepIndex
}

/** Local C43 beat, or null outside Continuity. */
export function c43BeatFor(slideIndex: number, stepIndex: number): number | null {
  if (slideIndex !== 10) return null
  return Math.min(Math.max(stepIndex | 0, 0), C43_BEAT_COUNT - 1)
}

/** Human name of a C43 beat (other slides fall back to the global step name). */
export function c43BeatName(beat: number): string {
  return C43_BEAT_NAMES[Math.min(Math.max(beat | 0, 0), C43_BEAT_NAMES.length - 1)]
}

/** Local S09 beat, or null outside Finance. */
export function s09BeatFor(slideIndex: number, stepIndex: number): number | null {
  if (slideIndex !== 8) return null
  return Math.min(Math.max(stepIndex | 0, 0), S09_BEAT_COUNT - 1)
}

/** Human name of an S09 beat (other slides fall back to the global step name). */
export function s09BeatName(beat: number): string {
  return S09_BEAT_NAMES[Math.min(Math.max(beat | 0, 0), S09_BEAT_NAMES.length - 1)]
}

/** Local S10 beat (0 = C39 … 4 = final photograph), or null outside Assets. */
export function s10BeatFor(slideIndex: number, stepIndex: number): number | null {
  if (slideIndex !== 9) return null
  return Math.min(Math.max(stepIndex | 0, 0), S10_BEAT_COUNT - 1)
}

export function s10BeatName(beat: number): string {
  return S10_BEAT_NAMES[Math.min(Math.max(beat | 0, 0), S10_BEAT_NAMES.length - 1)]
}

/** Local S08 beat (0 = C31 … 4 = C35), or null outside the birthday/inventory run. */
export function s08BeatFor(slideIndex: number, stepIndex: number): number | null {
  if (slideIndex !== 7) return null
  return Math.min(Math.max(stepIndex | 0, 0), S08_BEAT_COUNT - 1)
}

/** Human name of an S08 beat (other slides fall back to the global step name). */
export function s08BeatName(beat: number): string {
  return S08_BEAT_NAMES[Math.min(Math.max(beat | 0, 0), S08_BEAT_NAMES.length - 1)]
}

/** Local beat index for S04, or null for every other slide. */
export function cineBeatFor(slideIndex: number, stepIndex: number): number | null {
  if (slideIndex !== 3) return null
  return Math.min(Math.max(stepIndex | 0, 0), S04_BEAT_COUNT - 1)
}

/** Human name of an S04 beat (other slides fall back to the global step name). */
export function s04BeatName(beat: number): string {
  return S04_BEAT_NAMES[Math.min(Math.max(beat | 0, 0), S04_BEAT_NAMES.length - 1)]
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
  'F06 · Cierre familiar',
  'S08 · Cumpleaños y preparativos',
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
  'MEM · Foto de cumpleaños',
  'CON · Continuidad',
  'STK · Stack técnico',
  'BAR · Fricción',
  'CIE · Cierre',
] as const

export function cineStepName(step: number): string {
  return CINE_STEP_NAMES[step] ?? `Step ${step}`
}
