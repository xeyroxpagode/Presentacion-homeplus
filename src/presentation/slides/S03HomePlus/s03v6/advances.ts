// S03 V6 — cola de avances (§13.4).
// Un click durante una animación NO salta al siguiente step: se encola y se
// ejecuta cuando el step activo llega a su estado final. Cada click se
// contabiliza una sola vez; en el step 10 el relevo a S04 es automático.

let pending = 0

/** Registra un avance pendiente. Devuelve el total en cola. */
export function s03EnqueueAdvance(): number {
  pending += 1
  return pending
}

/** Número de avances pendientes. */
export function s03PendingAdvances(): number {
  return pending
}

/** Consume un avance pendiente (devuelve false si no había). */
export function s03ConsumeAdvance(): boolean {
  if (pending <= 0) return false
  pending -= 1
  return true
}

/** Vacía la cola (nueva entrada al slide S03). */
export function s03ClearAdvances(): void {
  pending = 0
}
