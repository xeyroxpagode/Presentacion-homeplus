# HOMIE V7 — Contrato de datos

Fuente: `src/presentation/slides/homi-cinema-v7/homiV7Data.ts`.
Todo congelado y determinista. Ningún render genera datos ni lee el reloj.

## Fecha demo

| Símbolo | Valor | Evidencia |
|---------|-------|-----------|
| D0 | `2026-08-16` (domingo) | `HomeDemoScreen`: "Domingo, 16 de agosto" |
| D1 | `2026-08-17` (lunes) | `plannerData`: "Monday 17 August 2026 is tomorrow" |
| Etiqueta | `Mañana · lunes 17 de agosto` | compartida por las tres respuestas |

## Intención Coca

- UI: `Haceme acordar de ir mañana a comprar una Coca.` (guion oral trae "compar").
- Escritura por grupos: `Haceme acordar` / `de ir mañana` / `a comprar una Coca`.
- Propuesta: tipo `Crear tarea` · título `Ir a comprar una Coca` · fecha `Mañana` ·
  hora no especificada · sin responsable · estado propuesta pendiente.
- Registro: `id 'coca-homi-v7'`, `assignee 'Sin responsable'`, `dueLabel 'Mañana'`.
- Existe en la historia solo desde B06. Una sola fila, sin duplicados,
  sin mutaciones reales (fixtures en memoria de presentación).

## Planner post-confirmación

`PLANNER_AFTER_CONFIRM = [...juliTasks, COCA_TASK]`:
`Llevar autorización` (Juli, Hoy, completada),
`Tarea de Matemática` (Juli, Hoy, completada),
`Ir a comprar una Coca` (sin responsable, Mañana).

## Tres mañanas (misma fecha D1, misma pregunta)

| Perfil | Principal | Contexto | Origen |
|--------|-----------|----------|--------|
| Tomi | Entrenamiento · Club · Mañana 17:00 | `Ir a comprar una Coca` · Hogar · Compartida · Mañana | scenic-controlled + `COCA_TASK` (visible, NO asignada: el registro sigue sin responsable) |
| Juli | Educación Física · Lunes 17 · Mañana | Autorización completada · Llevada hoy | `plannerData.schoolEvent` + `plannerData.juliTasks[authorization]` (completed) |
| Papá | No tenés compromisos personales registrados para mañana. | Lista de compras · 8 para comprar · En casa (contexto compartido, no obligación) | `inventoryData.shoppingSummary` |

Restricción: papá NO muestra seguro, importe ni fecha de vencimiento.

## Salida

`HOMI_V7_EXIT_CONTRACT`: Home nativo estable, 2 tareas Hoy + evento
Educación Física, sin overlays, `data-homi-v7-ready="true"` en G27.
