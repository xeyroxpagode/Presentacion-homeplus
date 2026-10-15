# 09_SHARED_OBJECT_DECISIONS

Sesión 9 — decisiones de identidad semántica y elegibilidad shared para cada objeto repetido del film.
Regla de canon: un objeto es shared SOLO si es el mismo dato semántico que sobrevive el boundary (07_SHARED_ELEMENT_REGISTRY). Lookalikes no califican.

## Taxonomía de decisión utilizada

- `ADD_TO_SHARED_REGISTRY` — falta en SE-01…SE-15 y sí es el mismo objeto: se propone id nuevo (extensión declarada OPEN, no implementada).
- `EDITORIAL_ONLY` — existe repetidamente pero NO es el mismo objeto persistente; cada aparición es una re-render editorial.
- `STATIC_REPEATED_OBJECT` — mismo símbolo repetido como motivo estático (chips, iconos), sin trayectoria shared.
- `PERSISTENT_SCENE_OBJECT` — una única instancia vive dentro de la escena durante varios beats; no cruza boundary por shared-layer y no hace flight.
- `OPEN_BLOCKED` — ambigüedad no resoluble con la autoridad actual.

## Decisiones por objeto

| Objeto | Primera aparición | Recurrencias | Decisión | Id propuesto | Rationale |
|---|---|---|---|---|---|
| `physical.heladera` | A04 | J02 | Mantener SE-01 (ya registrado) | — | Mismo objeto semántico (la heladera rota de la que falta la garantía) |
| `physical.insurance` | A02 | J02, S10/HomeCloud | Mantener SE-02 | — | Mismo documento/seguro |
| `physical.bolsa` | A03 | B22, F02/F03, J02, J08 | Mantener SE-03 | — | Misma bolsa de compras |
| `physical.heladera` warranty question (A04) | A04 | E02 (`warranty.ps5`) | ANALOGY_ONLY, sin id | — | La pregunta de A04 no es el mismo datum que `warranty.ps5`; E02 es la instanciación real |
| `message.old_household` | no existía (MASTER lo manda) | J05 ghost | Mantener SE-04 (construir) | — | Mismo mensaje heredado |
| `message.technician` | B18 | B19, J05 ghost | Mantener SE-05 | — | Mismo mensaje |
| `birthday.event` | B11/S05 | C01, S10, J08 | Mantener SE-06 | — | Mismo evento |
| `inventory.missing_item` | C03 | C05→C06 | Mantener SE-07 | — | Misma tarea/ítem |
| `finance.supermarket_movement` | D-nada: S09 | G04, I11, J08 | Mantener SE-08 | — | Mismo movimiento $48.720 |
| `finance.ps5_movement` | D06 | E01 | Mantener SE-09 (construir) | — | Mismo movimiento PS5; nunca como campo de Asset |
| `asset.ps5.documents` | E03 | E04 | Mantener SE-10 | — | Mismo paquete de documentos |
| `warranty.ps5` | A04 (pregunta) / E02 (real) | E06, H03, J08 | Mantener SE-11 (real = E02) | — | La instancia real es E02; A04 es solo mención |
| `birthday.memory` | C01→S08 evento derivado | E05, E06 | Mantener SE-12 | — | Mismo recuerdo |
| `person.juli/.tomi/.mama/.papa` | S01 bubbles | S04, S06, S15–S18 | Mantener SE-13, split en 4 capas | — | Mismos sujetos; avatares producidos en 4 capas |
| `question.what_is_left_for_tomorrow` | I07 | I08, I09 | Mantener SE-14 (ya correcta) | — | Misma pregunta persistente |
| `barrier.question ↔ homi.name` | H07 | I01 | Mantener RECHAZO SE-15 | — | Nunca shared: la pregunta de barrera no es el nombre |
| device tecnológico (F05→G09→H01) | G01/F05 | G09, H01 | `ADD_TO_SHARED_REGISTRY` (OPEN-A) | `device.product` | Mismo dispositivo físico atravesando fronteras de escena; hoy sin id en registro |
| "every stack element" (G09) | G02–G08 | G09 | `EDITORIAL_ONLY` | — | Colapso de composición, no un objeto; el device (arriba) sí persiste |
| house outline (A17) | A17 | J03 | `EDITORIAL_ONLY` para A17 (motif de trazo); el anclaje persistente nace en J03 | — | A17 es trazo editorial con Juli; J03 es la primera casa persistente (J-05) |
| house outline J03→J04…J11 | J03 | J04–J11 | `PERSISTENT_SCENE_OBJECT` | `structure.house` | Una única instancia SVG/DOM nace en J03 y persiste hasta J11; no clone, no reparenting, no shared flight; J11 mueve la tecnología, la casa no se mueve |
| `question bubble` "mañana" (I04/I15) | I04 | I15 | `STATIC_REPEATED_OBJECT` | — | Mismo shell visual, distinto contenido semántico (pedido vs propuesta de cambio) → no shared trayectoria |
| `homi.proposal` (I04→I06→I15) | I04 | I06, I15 | propuesto `planner.task` mapping ya en I06; I04↔I15 misma clase visual, distinto dato → `EDITORIAL_ONLY` salvo I06 mapping declarado | — | I06 ya define proposal→task por mapping, no por flight |
| map pins (B15/B16) | B15 | B16 retardo | `STATIC_REPEATED_OBJECT` | — | Mismo símbolo, datos de posición distintos |
| organization icons / chips (J08) | J08 | — | `STATIC_REPEATED_OBJECT` | — | Motivos estáticos repetidos, sin persistencia |
| transaction pill (G04/I11) | G04 | I11 | `EDITORIAL_ONLY` (mismo dato `finance.supermarket_movement` ya cubierto por SE-08) | — | El pill es representación; el dato ya está registrado |
| photo cards / album (E05) | E05 | E06 | `EDITORIAL_ONLY` | — | Representación del recuerdo SE-12, no objeto independiente |
| message bubbles genéricas | A02–A10 | múltiples | `EDITORIAL_ONLY` | — | Shell repetido, datos distintos |
| owner says / person-speaking motif | A12 speaker | — | `EDITORIAL_ONLY` | — | Motivo editorial |
| `#E7643F` field / ambient glow | A14 reveal | constante | `EDITORIAL_ONLY` | — | Atmósfera, no objeto |
| black-stage question state | H05–H07 | — | `STATIC_REPEATED_OBJECT` | — | Estado tipográfico |

## Reglas de cruce de boundary derivadas

1. `device.product` (OPEN-A): único candidato de flight real entre escenas F/G/H. Prohibido remontar (G-08). Medición viva vía slot, una instancia viva, `cancelFlight()` estricto.
2. `structure.house`: nace en J03 como `PERSISTENT_SCENE_OBJECT`, persiste hasta J11. En J11 el grupo tecnológico se retira; la casa NO se mueve ni se desvanece hasta el end card. Juli/familia byte-idénticos (T-SEM-18). No pertenece al shared registry y nunca entra al `shared-layer`.
3. `person.*` en SE-13: reparenting real al `shared-layer`, nunca clones.
4. Motifs editoriales (`EDITORIAL_ONLY`): pueden redibujarse por aparición; prohibido reparentarlos.
5. `STATIC_REPEATED_OBJECT`: sin flight, sin measurement, expuestos como nodos independientes con el mismo id de asset.

## Extensión OPEN declarada (no implementada en esta sesión)

- OPEN-A: `device.product` — dispositivo de producto único, F05→G09→H01.
- `structure.house` queda cerrado como `PERSISTENT_SCENE_OBJECT` J03→J11; no es extensión OPEN-B del shared registry.
- Las tres extensiones ya admitidas por schema §4.1 (`tomi.training_event`, `homi.proposal`, `planner.task`) permanecen OPEN.

## Ambigüedades cerradas

- F05/G09/J03 ya NO se tratan como "shared element" informal: F05 device → `ADD_TO_SHARED_REGISTRY`; G09 stack → `EDITORIAL_ONLY`; A17 house → `EDITORIAL_ONLY`; J03 house → `PERSISTENT_SCENE_OBJECT` como `structure.house` desde J03 hasta J11.
