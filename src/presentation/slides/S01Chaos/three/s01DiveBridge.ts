// S01→S02 CANONICAL HANDOFF — puente de propiedad del renderer.
//
// Separación explícita entre slide lógico y renderer visible (§13):
// - El slide lógico lo decide la navegación (S01.3 → S02.0 con un solo NEXT).
// - El renderer visible lo decide este puente: durante el Phone Dive la
//   cámara 3D original sigue siendo la dueña de la superficie aunque el
//   slide lógico ya sea S02.0. S02.0 permanece montada pero invisible
//   (preparada: fuentes, layout medido) hasta la llegada.
//
// El progreso del dive es el progreso lineal del beat S02.0 (useStepProgress,
// duración = intervalo original del portal, sin curvas nuevas): la cámara se
// muestrea como función pura del progreso vía s01Director.sampleDiveAt().
// Todo es determinista: forward, reverse e interrupciones convergen.

type DiveTick = () => void

let progress: number | null = null
let tick: DiveTick | null = null
let covered = false

/** Progreso lineal 0..1 del dive, o null cuando S02.0 no es el beat activo. */
export function getDiveProgress(): number | null {
  return progress
}

/**
 * Publica el progreso del dive. S02.0 lo llama desde un efecto (nunca en
 * render). Cada publicación con valor no nulo invalida el canvas 3D para
 * que S01Camera muestree la pose exacta correspondiente.
 */
export function setDiveProgress(p: number | null): void {
  if (progress === p) return
  progress = p
  if (p !== null) tick?.()
}

/** S01Camera registra aquí su invalidate (frameloop="demand"). */
export function registerDiveTick(fn: DiveTick | null): void {
  tick = fn
}

/** Cobertura del viewport por PHONE_SCREEN con la cámara real (§10). */
export function setDiveCovered(c: boolean): void {
  covered = c
}

export function isDiveCovered(): boolean {
  return covered
}

/** Inspección QA (window.__s01DiveBridge). */
export function diveBridgeDebug(): { progress: number | null; covered: boolean } {
  return { progress, covered }
}
