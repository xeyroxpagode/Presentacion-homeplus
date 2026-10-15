# S14 FRICCIÓN — Cinematic Freeze V5.0 (implementación)

Branch: `s01/ultimate-detail-v51` · Escena `S14Barrier` · `stepCount: 7` (steps 0–6).

## 1. Autoridades aplicadas

1. Especificación V5.0 del prompt (beats, tiempos, TARGETs, easings, textos).
2. Anatomía auténtica: censos Figma
   - `audit/runtime/session-03/figma-reference/fig-act-root.json` (lista Activos, fila PS5
     `PlayStation 5 · Ahora con Tomi`),
   - `fig-act-detail-playstation-5.json` (detalle: `PlayStation 5 / Consola`,
     PERSONAS Y UBICACIÓN `Ahora con Tomi / Está en Casa de Tomi / A cargo de Gabriel`,
     PRÓXIMO `Nada pendiente`, DATOS Y DOCUMENTOS `Garantía PlayStation 5 ·
     Garantía · hasta enero de 2027 · 1 documento` + `Factura de compra.pdf · PDF · 1,1 MB`),
   - `audit/runtime/session-02/figma-reference/fig-cal-Tareas.json` (grupos Planner,
     filas con avatar-inicial + vía de acción `Me encargo`/`Verificar`, tabs
     Tareas/Calendario/Planes).
3. Runtime del repo: `Presentation.tsx` (navegación por step, `?dev=1&slide=&step=`),
   `PhoneFrame`, `HomeDemoScreen`, `PlannerDemoScreen`.
4. Medición DOM en vivo: hook `useSharedMeasure` (orígenes de héroes por paso).

## 2. Datos fuente (fixtures locales, solo lectura — §23)

`src/presentation/slides/S14Barrier/surfaces.tsx`. Ninguna mutación, ningún id
regenerado, `persisted: false` en la preview `friction-task-preview`.

| Fixture | Valor |
|---|---|
| Tarea | `Preparar la mochila de Juli` · `Sin responsable` · `Sin fecha→Mañana` · `Sin hora` |
| Activo `ps5` | PlayStation 5 · Consola · Ahora con Tomi · Casa de Tomi · Gabriel |
| Registro `r-garantia-ps5` | Garantía PlayStation 5 · `Garantía · hasta enero de 2027 · 1 documento` |
| Doc `d-garantia-ps5` | Garantía PS5.pdf · PDF · 620 KB · Va con: Garantía PlayStation 5 |
| Picker | `Sin fecha / Hoy / Mañana / Sáb 02` → se selecciona `Mañana` |

Diferencia verificada vs. censo: el contrato V5 fija el documento protagonista como
`Garantía PS5.pdf · 620 KB` (dentro de la hoja de garantía); el censo de ficha trae
además `Factura de compra.pdf · 1,1 MB` como fila vecina de contexto — se conserva
como vecina (no se inventa nada). No se encontró sheet de creación de tarea en los
censos: el formulario se construye con la gramática del contrato V5 §7.13
(header 18/700, X 44 `#F4F0EB`, presets 96×72, filas 48px, CTA 52px `#E7643F`),
derivado de los tokens del producto (`--color-brand #E7643F`, radios, scrims).
No se reutilizan las filas simplificadas de `PlannerDemoScreen/AssetsDemoScreen`
(check+chevron / `Consola · Living`) donde divergen del censo; el teléfono contextual
de Planner sí reutiliza `PlannerDemoScreen` (colección real, sin insertar la preview).

## 3. Geometrías

Conversión centralizada `geometry.ts`: `runtime = master × 2/3`. Escalas sin unidad
pasan intactas. Teléfono posicionado por centro + ancho exactos (marco auténtico
conserva su aspecto; ver §6).

| TARGET master | Runtime | Escala nativa |
|---|---|---|
| PHONE_CENTER (765,118,390,844) | (510,78.7,260,562.7) | ancho/300 = 0.8667 |
| PHONE_CONTEXT (180,196,312,675.2) | (120,130.7,208,450.1) | 0.6933 |
| Atenuado (772.8,134.88,374.4,810.24) | (515.2,89.9,249.6,540.2) | 0.832 |
| TASK_HERO_ROW (650,394,962,163.8) | (433.3,262.7,641.3,109.2) | fila 370×63 ×2.6 |
| TASK_CAMERA (670,145,970,790) | (446.7,96.7,646.7,526.7) | sheet 370 ×2.4, X 711 |
| ASSETS_CAMERA (645,150,1030,780) | (430,100,686.7,520) | detalle 370 ×1.8557 |
| PS5_HERO_ROW (675,406,918.4,179.2) | (450,270.7,612.3,119.5) | fila 328×64 ×2.8 |
| WARRANTY_HERO_ROW (650,406,902,209) | (433.3,270.7,601.3,139.3) | fila 328×76 ×2.75 |
| PDF_HERO_ROW (664,400,984,180) | (442.7,266.7,656,120) | fila 328×60 ×3 |
| QUESTION (240,328,1440,424) | (160,218.7,960,282.7) | texto 92→61.33px |
| Cámara form P | TOP 0 · DATE 560 · FOOTER 883.2 (master) | pan nativo −P/2.4 |

## 4. Tracks definitivos

`timeline.ts`: H02 (10 beats, 3340ms), H03 (4 beats, 720ms) + H04 (10 beats,
3910ms, offset +720 → paso 3 total 4630ms), H05 (6 beats, 1480ms). H00 1000ms,
H01 480ms, H07 600+300ms, H08 460ms. Todos terminan en HOLD (`both`, sin moción
perpetua). Einsings E_HERO/E_SHARED/E_CAMERA/E_EXIT/E_CONCEPT según contrato.
Element IDs: `taskrow / ps5 / warranty / pdf` (héroes), cámaras `task / assets`,
capas `wsheet / pdfdetail`, vistas `planner / assets / home`.

Inspección §22.1: `?dev=1&slide=13&step=2&s14t=<ms>` congela H02 (`sampleStep`).
`channelAt` usa semántica último-track-iniciado (el valor previo rige antes del
primer track). Otros pasos: el freeze desactiva animaciones y muestra su HOLD.

## 5. Estados narrativos

0 H00 handoff (puente mínimo, §6 justificación) · 1 H01 atenuado · 2 H02 crear
(+énfasis, extracción 2.6×, morph con título compartido, cámaras TOP→DATE→FOOTER,
picker nativo 180/120ms, CTA sin guardar) · 3 H03+H04 (repliegue 720ms + Activos→
PS5 2.8× → ficha → garantía 2.75× → hoja 260ms → PDF 3× → detalle anidado 200ms) ·
4 H05+H06 (retorno 1480ms + quietud total) · 5 H07 retirada (0.88→0) ·
6 H08 pregunta exacta en 2 líneas, Inter 500, punto opcional 4×4 12% desactivable
(`QUESTION_DOT`).

## 6. Ajustes obligatorios justificados

1. **H00 no remonta `S13Stack`**: el contrato prohíbe fondo persistente y exige solo
   el puente de convergencia; se renderiza un eco estático mínimo (2 paneles + vínculo
   que se contrae, E_EXIT, sales 120–720ms). Sin rediseño del Stack.
2. **Altura de teléfono**: el marco auténtico (`300×620`) no reproduce exactamente
   390×844; se fija centro + ancho exactos sin distorsión (altura resultante
   806.7 vs 844 master). No se estira contenido.
3. **Salida H08→S15**: el runtime cambia de slide por desmontaje; el fade de 300ms
   de cesión no puede animarse entre slides — queda documentado como corte del
   operador tras el hold (limitación del runtime, sin inventar transición).
4. **Detalle Assets a escala 1.8557** (ancho de viewport / 370): el contrato no fija
   escala de ficha; se llena el viewport sin distorsión.
5. Sin toolchain en este entorno (ver §7): build/typecheck/capturas pendientes.

## 7. QA (estado real)

- Navegación: genérica por `stepCount` (NEXT/PREV con `event.repeat` ignorado,
  `?dev=1&slide=13&step=M` directo). Remount por paso = sin timelines concurrentes,
  sin residuos (unmount = cancel+cleanup). Retroceso reconstruye snapshot anterior.
- Data safety: fixtures de solo lectura; CTA/inline picker no disparan mutaciones.
- **Pendiente de ejecución** (sin Node/npm en este entorno): `tsc`, `vite build`,
  reproducción completa S13→S14→S15, capturas F00–F16 e intermedias 0/10/25/50/75/
  90/100%, proyección 1920×1080 y 1280×720. Ejecutar antes de declarar PASS.
