# HOMI V6 — Contrato de datos (§4)

Determinista y congelado: `src/presentation/slides/homi-cinema-v6/homiV6Data.ts`.
Ningún render genera datos, lee el reloj del navegador ni muta el backend.

## Fecha de demostración (§4.2)

| Clave | Valor | Por qué |
|---|---|---|
| `D0` | 2026-08-16 (`D0_LABEL`: Domingo 16 de agosto) | Es la fecha que muestra `HomeDemoScreen` ("Domingo, 16 de agosto") |
| `D1` | 2026-08-17 (`D1_LABEL`: Mañana · lunes 17 de agosto) | `plannerData.ts`: "Monday 17 August 2026 is tomorrow relative to the frozen Home date"; `schoolEvent.dateLabel`: "Lunes 17 · Mañana" |
| `dueLabel` Coca | `Mañana` | Anatomía nativa (`assignee · dueLabel`); el detalle "lun 17 de agosto" viaja como sublínea de la propuesta |

Todos los "mañana" de la sección usan `D1_SHORT`/`D1_LABEL`. Una sola constante.

## Intención Coca (§4.1)

| Campo | Valor |
|---|---|
| Mensaje UI | `Haceme acordar de ir mañana a comprar una Coca` (grupos: `Haceme acordar` / `de ir mañana` / `a comprar una Coca`; la errata oral "compar" se normaliza solo en texto UI, misma intención) |
| Tipo | crear tarea |
| Título | `Ir a comprar una Coca` |
| Fecha | `Mañana` (D1) · hora no especificada · **sin responsable** (`Sin responsable`, coherente con el modelo; §4.3: pedir ≠ ser responsable) |
| Registro | `COCA_TASK` id `coca-homi-v6` — existe en historia solo desde P09 |
| Cantidad creada | exactamente una (verificación L08) |

No es compra efectuada; no promete notificaciones.

## Tres perfiles (§4.4) — pregunta única `¿Qué me queda para mañana?`

| Perfil | Resumen | Registros (1–2) | Origen |
|---|---|---|---|
| Tomi (Club) | Mañana tenés entrenamiento a las 17:00 | Entrenamiento · Club · Mañana 17:00 | `scenic-controlled` — ancla narrativa: `HomiContextDemoScreen` PERSONAS.tomi ("entrenamiento a las 17 h"). Fixture escénico explícito, no backend |
| Juli (Colegio) | Mañana tenés Educación Física a la mañana | Educación Física · Lunes 17 · Mañana | `planner-fixture` — `plannerData.schoolEvent` (real) |
| Papá (Hogar) | Mañana no tenés nada puntual. Queda lo del hogar | Lista de compras · 8 para comprar; Seguro del auto · En 6 días · $62.800 | `inventory-fixture` (`shoppingSummary`) + `finance-fixture` (`financePayments[seguro]`, reales). Sin datos privados inventados; el "nada puntual" es la respuesta honesta desde datos autorizados |

`whenRef` idéntico en las tres tarjetas (`D1_LABEL`). Sin edición ni mutación en respuestas.

## Superficies reales reutilizadas (sin copiar anatomía)

- Planner: `PlannerDemoScreen` + `plannerData.juliTasks` (Hoy ×2, completadas → meta nativa "Completada").
- Finance: `FinanceDemoScreen` + `financeData` (héroe −$55.700; pagos; categorías).
- Inventory: `InventoryDemoScreen` + `inventoryData` (4 productos; lista ×8).
- Home: `HomeDemoScreen` (Juli; Hoy + Próximamente) + `HomeNavigation`.
- Homi: `homi-mark.svg` + clases `.homi-*` + `FrictionEcho` (recuerdo formulario "Preparar la mochila de Juli", `persisted:false`).

## Prohibido y cumplido

Sin respuestas aleatorias (constantes congeladas) · sin montos inventados · sin acceso transversal (cada perfil cita solo su contexto/hogar autorizado) · sin confundir fixture escénico con persistencia (`source`/`sourceRef` por registro).
