// FINAL KITCHEN V6.0 — tiempos y mapa de beats W00–W14.
// Las frases del guion son anclajes (no se renderizan, no hay voz grabada).
// El operador avanza con NEXT; las animaciones internas son temporizadas y
// terminan en HOLD. W01/W02 = UN SOLO movimiento físico sin pausa.

export type FinalBeatId =
  | 'W00' | 'W01' | 'W02' | 'W03' | 'W04' | 'W05' | 'W06' | 'W07'
  | 'W08' | 'W09' | 'W14'

export const FINAL_BEATS: FinalBeatId[] = [
  'W00', 'W01', 'W02', 'W03', 'W04', 'W05', 'W06', 'W07',
  'W08', 'W09', 'W14',
]

export type BeatKind = 'hold' | 'dive' | 'reframe' | 'gesture' | 'fade'

export type BeatDef = {
  id: FinalBeatId
  /** Anclaje del guion hablado (no renderizar). */
  voice: string
  /** ¿Requiere NEXT del operador para entrar? W02 es fase interna del dive. */
  needsNext: boolean
  kind: BeatKind
  /** Duración de la animación interna (ms). 0 = corte/HOLD inmediato. */
  moveMs: number
  /** Tras moveMs la escena queda en HOLD (true = infinito hasta NEXT). */
  holdAfter: boolean
}

export const FINAL_BEAT_DEFS: Record<FinalBeatId, BeatDef> = {
  W00: { id: 'W00', voice: 'Preparación', needsNext: true, kind: 'hold', moveMs: 0, holdAfter: true },
  // W01: orden manual que inicia el travelling. W02: fase interna del MISMO
  // movimiento (no hay click muerto ni pausa en p≈0.85).
  W01: { id: 'W01', voice: 'El objetivo no es pasar más tiempo dentro de HomePlus', needsNext: true, kind: 'dive', moveMs: 3100, holdAfter: false },
  W02: { id: 'W02', voice: 'Es al revés', needsNext: false, kind: 'dive', moveMs: 3100, holdAfter: true },
  W03: { id: 'W03', voice: 'Porque al final', needsNext: true, kind: 'hold', moveMs: 0, holdAfter: true },
  W04: { id: 'W04', voice: 'La mochila sigue siendo una mochila', needsNext: true, kind: 'reframe', moveMs: 700, holdAfter: true },
  W05: { id: 'W05', voice: 'La factura sigue venciendo', needsNext: true, kind: 'reframe', moveMs: 600, holdAfter: true },
  // W06: reencuadre 800ms; el gesto arranca a los 500ms (asentamiento final).
  W06: { id: 'W06', voice: 'Y la heladera se puede romper', needsNext: true, kind: 'gesture', moveMs: 800, holdAfter: true },
  W07: { id: 'W07', voice: 'La casa no cambió', needsNext: true, kind: 'reframe', moveMs: 730, holdAfter: true },
  W08: { id: 'W08', voice: 'Y tampoco tiene por qué hacerlo', needsNext: true, kind: 'hold', moveMs: 0, holdAfter: true },
  W09: { id: 'W09', voice: 'Se apaga todo menos el celular', needsNext: true, kind: 'fade', moveMs: 3000, holdAfter: true },
  W14: { id: 'W14', voice: 'Se apaga el celular', needsNext: true, kind: 'fade', moveMs: 600, holdAfter: true },
}

/** Duración total del travelling físico (contrato §5.4). */
export const DIVE_MS = 3100

/** Gesto FridgeRepairGesture: 3000ms dentro de la ventana [500, 3500] de W06. */
export const GESTURE_START_IN_W06 = 500
export const GESTURE_MS = 3000

/** Fundidos de iluminación por fase (ms dentro de cada beat W09–W14). */
export const LIGHT_FADE_MS = 3000
export const BLACKOUT_FADE_MS = 600

/** Reduced-motion: el travelling se resuelve como corte (sin recorrido). */
export const REDUCED_DIVE_MS = 1

export function beatIndex(id: FinalBeatId): number {
  return FINAL_BEATS.indexOf(id)
}

export function nextBeat(id: FinalBeatId): FinalBeatId | null {
  const i = beatIndex(id)
  return i < 0 || i >= FINAL_BEATS.length - 1 ? null : FINAL_BEATS[i + 1]
}

export function prevBeat(id: FinalBeatId): FinalBeatId | null {
  const i = beatIndex(id)
  return i <= 0 ? null : FINAL_BEATS[i - 1]
}
