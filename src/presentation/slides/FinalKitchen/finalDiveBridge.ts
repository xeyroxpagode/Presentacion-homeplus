// FINAL KITCHEN V6.0 — puente del travelling inverso (teléfono → cocina).
// Patrón reutilizado del donante S02 V15 (s01DiveBridge): separa la orden
// lógica (NEXT del operador) del muestreo de la cámara. El progreso p va de
// 1 (portal, pantalla cubriendo viewport) a 0 (A_WIDE). Sin texto de
// WhatsApp, sin handoff a S02: el destino es la cocina física.

export type FinalDiveTick = () => void

let progress: number | null = null
let tick: FinalDiveTick | null = null
let covered = false
let coveredLostAt: number | null = null

/** Progreso p del travelling (1→0), o null fuera de W01/W02. */
export function getFinalDiveProgress(): number | null {
  return progress
}

export function setFinalDiveProgress(p: number | null): void {
  if (progress === p) return
  progress = p
  if (p !== null) tick?.()
}

/** FinalCamera registra aquí su invalidate (frameloop="demand"). */
export function registerFinalDiveTick(fn: FinalDiveTick | null): void {
  tick = fn
}

/** Cobertura del viewport por PHONE_SCREEN con la cámara real. */
export function setFinalDiveCovered(c: boolean, atP?: number): void {
  if (covered && !c && coveredLostAt === null && typeof atP === 'number') coveredLostAt = atP
  if (c) coveredLostAt = null
  covered = c
}

export function resetFinalDiveCoverage(): void {
  covered = false
  coveredLostAt = null
}

export function isFinalDiveCovered(): boolean {
  return covered
}

export function finalDiveBridgeDebug(): { progress: number | null; covered: boolean; coveredLostAt: number | null } {
  return { progress, covered, coveredLostAt }
}
