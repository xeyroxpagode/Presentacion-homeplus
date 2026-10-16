# S14 FRICCIÓN — Editorial Freeze V6.0 (implementación)

Branch: `s14/friction-editorial-v6` · Escena `S14Barrier` · `stepCount: 7` (steps 0–6, sin cambios en `presentationConfig.ts`).
Baseline V5 preservada intacta en `s14/friction-cinematic-v5` (HEAD `81901b1` al crear esta rama; working tree limpio).

## 1. Autoridad del guion

Guion original inmutable (§2). Textos en pantalla normalizados; pregunta final exacta:
**¿Qué pasaría si ni siquiera tuviéramos que saber cómo?** (`fixtures.ts` `FINAL_QUESTION_*`, renderizada en 2 líneas por `QuestionStage`).

## 2. Fuentes utilizadas

- Guion original (Nivel 1) + contrato V6.0 del prompt (Nivel 2).
- Censo Figma (Nivel 3, reverificado en esta rama):
  - `audit/runtime/session-03/figma-reference/fig-act-root.json` → título `Activos`, subtítulo, search, chips `Todos/Objetos/Vehículos/Mascotas/Propiedades`; filas `PlayStation 5 · Ahora con Tomi`, `Notebook de trabajo · Trabajo`, `Taladro Bosch · Ahora con Martín — vecino`.
  - `fig-act-detail-playstation-5.census.json` → `PlayStation 5 / Consola`, `Ahora con Tomi / Está en Casa de Tomi / A cargo de Gabriel`, `Garantía PlayStation 5 · Garantía · hasta enero de 2027 · 1 documento`, `Factura de compra.pdf · PDF · 1,1 MB`; tokens `--color-brand #E7643F … --color-border-subtle #EEE7E0` == paleta V6 §4.5 exacta.
  - `audit/runtime/session-02/figma-reference/fig-cal-Tareas.json` → Planner `Tareas/Calendario/Planes`, grupos `HOY/MAÑANA/…`, gramática de fila (avatar-inicial + título + `asignado · fecha` + vía `Me encargo`, SIN checkbox izquierdo), valores `Sin responsable`, `Hoy`, `Mañana`.
- Runtime (Nivel 4): `Presentation.tsx` (navegación, `?dev=1&slide=&step=`, `event.repeat` ignorado), `PresentationFrame` (canvas 1280×720 escalado), `plannerData.ts` (`Llevar autorización`, `Tarea de Matemática`, Juli), `homeTokens.ts`.
- V5 (Nivel 5): solo referencia histórica + `s14-barrier.css` conservado en disco sin importar (infraestructura no reutilizada visualmente).

## 3. Snapshot de baseline

- Rama inicial: `s14/friction-cinematic-v5`, HEAD `81901b1`, `git status` limpio.
- Rama de trabajo: `s14/friction-editorial-v6` (esta). Sin `reset --hard`, sin force, sin cambios ajenos (se revirtió churn de `package-lock.json` por `npm install` del entorno).
- S13/S15 sin modificar. `presentationConfig.ts` sin modificar (`stepCount: 7` ya correcto).

## 4. Geometría 1920×1080

Conversión única centralizada `geometry.ts`: `runtime = master × 2/3` (`mx`, `toRuntimeStyle`). Hijos nunca reaplican el factor. Estrategia documentada en el archivo.
`EDITORIAL_SURFACE = (216,150,1488,780)` · `EDITORIAL_CONTENT = (268,202,1384,676)` · centro `(960,540)`.
TARGETs V6 literales: `PLANNER_*`, `INTENT_*`, `FORM_*` (+`FORM_TITLE_TEXT`), `ASSETS_*`, `ASSET_*`, `WARRANTY_*`, `QUESTION_BOX`. Sin rects V5 (teléfonos/cámaras) remanentes.

## 5. Rectángulos TARGET → renderizados (auditoría DOM real)

Hook `useGeometryAudit` (solo `?dev=1`, en HOLD): compara `data-expect="x,y,w,h"` master contra `getBoundingClientRect`, omite nodos ocultos/transformados. Resultados headless 1280×720:

| Frame | Nodos | Peor desviación | >2px |
|---|---|---|---|
| F00 HOME | 1 | 0 | 0 |
| F05 form Mañana | 7 | 0.021 px runtime | 0 |
| F10 garantía+PDF | 7 | 0.021 px runtime | 0 |
| F11 HOME limpia | 1 | 0 | 0 |
| F12 vacío | 0 | — | 0 |
| F13 pregunta | 1 | 0.010 px runtime | 0 |

Tolerancia §29.1 (±2 px master = ±1.33 runtime): PASS con margen ~60×. Detalle por nodo en `window.__S14_AUDIT__.ranked`.
Lección registrada: los bordes de 1px desplazan la padding-box contra la que resuelven los hijos absolutos (+1px por nivel). Superficie/garantía/intent usan anillo por `box-shadow` (cero layout) en vez de `border`.

## 6. Paleta y tipografías

Paleta `PALETTE` == censo Figma. Superficies: `HomePlus DM Sans` local (variable 300–700, mismo woff2 del producto) con fallback Inter/sistema. Pregunta: pila Inter, peso 500, 82 master, interlineado 1.17, tracking −0.022em, 2 líneas, sin sombra (Inter webfont no empaquetada: rinde con fallback del sistema — ver §11 pendientes).

## 7. Componentes editoriales (`editorial.tsx`, puros, dirigidos por snapshot)

`EditorialSurface/Content/Home/PlannerList/TaskIntentPreview/SharedTaskTitle/EditorialTaskForm/EditorialDatePicker/EditorialAssets/SharedAssetAvatar/SharedAssetTitle/EditorialAssetDetail/EditorialWarrantyRow/QuestionStage`. Cero `PhoneFrame`, cero barras móviles, cero rótulos `FRICCIÓN/CREAR TAREA/BUSCAR GARANTÍA`, cero flechas decorativas.

## 8. Datos y fixtures (`fixtures.ts`, solo lectura)

Tabla de procedencia en el archivo. `friction-task-preview` escénica (`persisted: false`). Opciones Fecha: `Sin fecha/Hoy/Mañana` (se omite `Sáb 02` de V5 por §11.2: sin respaldo de censo de picker). Vecinos de Assets de censo (no `homeAssets` simplificados). Factura auténtica `Factura de compra.pdf · PDF · 1,1 MB`. Doc de garantía `Garantía PS5.pdf · PDF · 620 KB` [TARGET V6].

## 9. Cue map y timelines (`timeline.ts`)

`sampleStep(step, t)` puro y determinista; un solo rAF por paso; `?s14t=<ms>` congela cualquier instante (seek 0/10/25/50/75/90/100% reproducible). Beats declarados `S2_BEATS/S3_BEATS/S4_BEATS` con contrato Track completo (§24.1). Duraciones: S0 500 · S1 500 · S2 2300 · S3 2100 · S4 900 · S5 600 · S6 600 (holds manuales fuera del timeline).
Shared-element registry: `shared-task-title` (440ms M_SHARED), `shared-task-meta` (transferencia, sin morph por carácter), `shared-asset-avatar/title`, `shared-warranty-title`; instancia única visible; vuelo pinta sobre el destino (§25.2); aserción DOM en dev.
Máscaras solo para: revelación de formulario, crecimiento de garantía, picker vertical (§26).

## 10. Entradas/salidas y navegación

- S13→S14: adaptador aislado (fade 300ms a HOME horizontal; no se remontan paneles Stack). Terminal S13 con paneles tech → corte estándar documentado como punto de integración.
- S14→S15: desmontaje con hold previo (limitación runtime: sin crossfade entre slides, como en V5).
- Verificado headless: `slide=12/step=3 +8×NEXT = S15/0`; `+8×NEXT = S16/3`. Saltos directos `?dev=1&slide=13&step=M` (M=0..6) montan correcto. Retroceso reconstruye (remount). Sin errores de consola/página en 20+ cargas.

## 11. QA estático (capturas reales `qa-captures/s14-v6/`, script `qa-captures/s14-v6-capture.mjs`)

F00 HOME · F01 Planner · F02 preview (título/metadata con inset correcto) · F03 form Sin fecha (Planner retirado, sin doble título) · F04 picker abierto · F05 form Mañana+CTA · F06 Assets · F08 ficha · F09 garantía · F10 PDF dentro del registro (factura subordinada DEBAJO, sin ghost) · F11 HOME limpia · F12 vacío · F13 pregunta exacta. Sonda 1920×1080: F05/F10/F13 legibles.

## 12. QA dinámico (midpoints §29.2)

M1 morph tarea (título único en vuelo, sin duplicado) · M2 PS→ficha (retiro ordenado, sin doble pantalla) · M3 garantía media (registro sin atravesar título PS, sin PDF precoz) · M4 reintegración (orden Documento→Registro→Activo→HOME) · M5 salida (unidad, escala→0.975) · M6 pregunta (líneas juntas). Cero animaciones en holds (rAF termina; snapshot constante). Cero mutaciones (grep: sin fetch/POST/storage en S14).

## 13. Build/typecheck

`npx tsc --noEmit` PASS · `npm run build` PASS (vite, sin errores).

## 14. Diferencias justificadas frente a V6.0

1. `Sáb 02` omitida del picker (§11.2: sin respaldo de censo) — 3 opciones atestiguadas.
2. Salida G10→S15 por desmontaje (el runtime no anima entre slides) — hold previo, corte del operador.
3. Entrada S13→S14 por adaptador fade (S13 termina en paneles tech; no se inventa escena Stack).
4. Handoff `event.repeat` y overlay dev reutilizados del runtime global (sin duplicar lógica).
5. Inter de la pregunta con fallback del sistema (fuente no empaquetada en el repo).

## 15. Pendientes reales (no bloquean escena; bloquean el rótulo PASS total)

- P1 Proyección física 1920×1080/720p (QA en navegador headless únicamente).
- P2 Ensayo oral de sincronía guion↔cues (timings son TARGET de animación).
- P3 Contrato terminal S13 (si debe entregar HOME) y confirmación S15 sin cambios.
- P4 Empaquetar Inter o aceptar fallback documentado para la pregunta.
