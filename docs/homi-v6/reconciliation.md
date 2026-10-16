# HOMI V6 — Reconciliación CURRENT → TARGET (§3)

Fecha: 2026-10-16 · Rama: `s15/homi-bc-cinematic-v6` · Baseline: `07ec9116afebf56bdd32f7d127c9dc50e8416cad` (`s15/homi-bc-cinematic-v4.2`)

## F0.1 Configuración actual

- CURRENT: `presentationConfig.ts` con S15=6, S16=3, S17=3 pasos sobre `HomiV4Stage` (12 triggers T01–T12).
- TARGET V6: S15=10 (P01–P10), S16=9 (P11–P19), S17=19 (P20–P38). 38 disparadores.
- Diferencia: +26 pasos; V4.2 no cubre Gaby (sin contexto multi-módulo, sin tres perfiles, sin Home final) y usa el cumpleaños de Juli como ejemplo importante.
- Componente seleccionado: `HomiV6Stage` nuevo en `src/presentation/slides/homi-cinema-v6/`. V4.2 queda intacto como referencia.
- Adaptación: wrappers S15/S16/S17 mapean `stepIndex` → beat; `presentationConfig.ts` solo cambia los tres `stepCount`.
- Restricciones: no tocar S14, S18 ni el resto del registry.
- Evidencia: `scripts/verify-homi-v6.sh` (E01, E02, E03).

## F0.2 Índices reales y navegación manual

- CURRENT: S15/S16/S17 son los slots 14/15/16 (índice 0-based) del registry; `navigate()` avanza/retrocede por pasos; `navigationAction` usa Space/ArrowRight/ArrowLeft e ignora inputs reales.
- TARGET: misma semántica; cada beat es función pura del `(slideIndex, stepIndex)` vía `?dev=1&slide=N&step=M` ya existente.
- Diferencia: ninguna en el mecanismo; solo más pasos por slot.
- Evidencia: `navigation.ts` sin modificar; E02.

## F0.3 Director y componentes V4.2

- CURRENT: `HomiV4Stage` con remount por `key={trigger}` y animaciones `both`; `HomiShots`/`PlannerShots`/`FrictionEcho`.
- TARGET: `HomiV6Stage` con remount por `key={beat}` + `demoStateFor(beat)` (snapshot determinista: `confirmed`, `plannerHasCoca`, `frozenMemory`, `blackout`).
- Diferencia: V6 agrega estado lógico puro separado del estado de producto; el morph P09 mide rectángulos reales (`MorphProposalToPlanner`).
- Fuente/donor: patrón de montaje heredado de V4.2; `FrictionEcho` reutilizado tal cual para P01/P02.
- Evidencia: E03, E05.

## F0.4 Componentes Homi reutilizados

- CURRENT: clases nativas `.homi-assistant-bar`, `.homi-thread`, `.homi-user-bubble`, `.homi-proposal`, `.homi-decision-row`, `.homi-confirm`, `.homi-dismiss`, `.homi-done`, `.homi-composer` + `homi-mark.svg`.
- TARGET: idénticas, bajo scope `.v6-stage`; ampliación solo por tokens locales.
- Adaptación: `BenjaShots.tsx` parametriza el contenido Coca (título/fecha) dentro de la anatomía; no redefine estilos globales.
- Restricción: el producto demo solo trae el entrenamiento de Tomi como mensaje; no se reutiliza ese texto (se usa la intención Coca normalizada).
- Evidencia: L02, L04, L05.

## F0.5 Superficies Planner

- CURRENT: `PlannerDemoScreen` (`view`, `tasks`, `event`, `plan`), filas `.planner-task-row` con `assignee · dueLabel` o `Completada`.
- TARGET: P09/P10 usan `PlannerDemoScreen view="tasks" tasks=[2 Hoy + Coca]`; P14 enfoca `PlannerTabs` nativos.
- Diferencia: las 2 tareas Hoy son `completed:true` y muestran "Completada" en vez de "Hoy" (anatomía nativa, no falsificada). La comparación P13 lee contexto Hoy vs Coca/Mañana.
- Fuente: `plannerData.juliTasks` + `COCA_TASK` escénico único.
- Evidencia: L08, L04.

## F0.6 Home actual

- CURRENT: `HomeDemoScreen` ("Domingo, 16 de agosto"; Hoy: autorización + matemática; Próximamente: Educación Física) + `HomeNavigation` sin acceso a Homi.
- TARGET P33–P38: `HomeDemoScreen` nativo centrado (1100×600 canvas = 1650×900 editorial), foco por props (`educationPhysical`, `authorization`, `focus`) + overlay no destructivo.
- Restricción (bloqueo parcial honesto): el producto NO expone punto de acceso nativo a Homi en Home/Planner. P10/P15/P33 usan identidad Homi como capa escénica `data-scenic="true"`, sin presentarla como botón nativo ni interceptar eventos (§0.3: no representar capacidad inexistente como real).
- Evidencia: E06 (sin fugas), L21.

## F0.7 Fragmentos de Fricción

- CURRENT: S14 actual (`S14Barrier`) ya no monta el formulario (solo rutas + pregunta); el formulario vive como recuerdo en `homi-cinema-v4/FrictionEcho.tsx` (copia fiel documentada de `S14Barrier/surfaces.tsx` de la rama donante).
- TARGET P01/P02: reutiliza ese `FrictionEcho` sin copiarlo de nuevo.
- Diferencia: P01 lo retira sin guardar tarea de mochila (animación de salida, sin `persisted`).
- Evidencia: L01 (revisión manual del switch P01: sin tareas creadas).

## F0.8 Finance e Inventory reales

- CURRENT: `FinanceDemoScreen` (héroe −$55.700, pagos Internet/Seguro auto, categorías) y `InventoryDemoScreen` (4 productos, lista de compras ×8).
- TARGET P21–P24: pantallas nativas completas en recuadros con `overflow:hidden`; P25 recorta 3 chips con datos textuales idénticos a los fixtures.
- Adaptación: recorte/posición/escala editorial; cero cambios de anatomía; `pointer-events:none` en módulos.
- Evidencia: L17, L18.

## F0.9 Datos de demostración

- CURRENT: `juliTasks` (Hoy ×2, completadas), `schoolEvent` (Educación Física, "Lunes 17 · Mañana"), `financePayments`, `inventoryProducts`, `shoppingSummary`.
- TARGET: D0=2026-08-16 (fija el "Domingo, 16 de agosto" del Home + comentario plannerData "Monday 17 August 2026 is tomorrow"), D1=lunes 17.
- Diferencia/insuficiencia: ningún fixture da a Tomi algo para mañana ni a papá un vencimiento de mañana.
  - Tomi → fixture escénico controlado `Entrenamiento · Club · Mañana 17:00` (ancla narrativa: `HomiContextDemoScreen` PERSONAS.tomi "entrenamiento a las 17 h"), marcado `scenic-controlled`.
  - Papá → respuesta honesta "mañana nada puntual" + hogar: lista de compras (inventory) + seguro del auto (finance). Sin datos privados inventados.
- Evidencia: L15, L16, L17, L18; `docs/homi-v6/data-contract.md`.

## F0.10 Layout y estilos heredados

- CURRENT: lienzo lógico 1280×720 (`tokens.canvas`), escala uniforme en `PresentationFrame`; medidas V6 §2 en master 1920 → factor 2/3 en CSS.
- TARGET: todo V6 en px de canvas bajo `.v6-stage`; tipografías = objetivo editorial × 2/3 (pregunta 46px, propuesta 34px, perfil 30px, fila nativa amplificada por tokens, botones 24px).
- Restricción: sin segundo sistema de escala; sin formatos verticales (P21 usa tres módulos horizontales, no teléfonos).
- Evidencia: E07, C01, C02.

## F0.11 Dependencias, tests y QA

- CURRENT: sin runner de tests (`scripts`: dev/build/preview/format); `puppeteer-core` + `pngjs` en devDeps pero sin script de capturas.
- TARGET: `scripts/verify-homi-v6.sh` (bash, 17 chequeos) como QA estático; QA visual/build/typecheck pendientes de runtime Node.
- Restricción/BLOQUEO: este entorno no tiene Node/npm/pnpm ni Python (verificado 2026-10-16), por lo que `vite build`, `tsc --noEmit` y capturas de navegador quedan NO VERIFICADOS aquí. No se finge ninguna captura.
- Evidencia: `docs/homi-v6/qa-report.md`.
