# 00 — SESSION PLAN

**Campaña:** HOMEPLUS FINAL PRESENTATION — AUDIT CAMPAIGN
**Sesión:** SESSION 0 — Source Map + Audit Contract
**Principio:** **múltiples sesiones con contexto fresco.** No intentar analizar la presentación entera en un contexto gigante.

---

## 1. SEGMENTACIÓN RECOMENDADA

| Sesión | Alcance | Depende de | Entregable |
|---|---|---|---|
| **0** ✅ | Source Map + Audit Contract | — | Este set. **COMPLETADA** |
| **1** | **Runtime Evidence Baseline** — A→J (o S01→S18) | D-01, D-02 | `01_RUNTIME_BASELINE.md` |
| **2** | **Scenes A–B** — narrativa + visual + motion profundo | 1, M-01 | `02_SCENES_A_B_AUDIT.md` |
| **3** | **Scenes C–E** — product-story profundo | 1, M-01 | `03_SCENES_C_E_AUDIT.md` |
| **4** | **Scenes F–H** — continuidad + arquitectura + fricción | 1, M-01 | `04_SCENES_F_H_AUDIT.md` |
| **5** | **Scenes I–J** — Homi + cierre | 1, M-01 | `05_SCENES_I_J_AUDIT.md` |
| **6** | **Figma-app ↔ Integration** — UI truth B/C/D/E + delta | D-02 | `06_FIGMA_VS_INTEGRATION.md` |
| **7** | **Motion / stagecraft / timing** — sistémico | 1, 2, 3, 4, 5 | `07_MOTION_STAGECRAFT_TIMING.md` |
| **8** | **Síntesis final** — plan de remediación priorizado | 2–7 | `08_FINAL_SYNTHESIS.md` |

### 1.1 Nota sobre el alcance de las escenas

Los rangos A–J de la tabla son los del contrato de campaña. Su equivalencia con la implementación depende de `D-02` (§3). Si se resuelve que la presentación auditada es `Presentacion_HomePlus_Final`, el mapeo es **directo**. Si es la declaración, el mapeo es:

| Escena | `Presentacion_HomePlus_Final` | Presentación declarada |
|---|---|---|
| A | `A_Opening` (A00–A27, 28 est.) | S01 Chaos (11) + S02 FragmentedInfo (7) + S03 HomePlus (1) = **19 pasos** |
| B | `B_HomePlannerFamily` (B00–B27, 28 est.) | S04 Home (6) + S05 Planner (4) + S06 Family (6) + S07 CoordinarNoEsVigilar (2) = **18 pasos** |
| C | `C_PlansInventory` (C00, 1 est.) | S08 PlansInventory (5) |
| D | `D_Finance` (D00, 1 est.) | S09 Finance (5) |
| E | `E_AssetsHomeCloud` (E00, 1 est.) | S10 AssetsHomeCloud (5) |
| F | `F_Continuity` (F00–F08, 9 est.) | S11 Continuity (3) |
| G | `G_TechStack` (G00–G18, 19 est.) | S12 FrontendBackend (3) + S13 Stack (4) = **7 pasos** |
| H | `H_Friction` (H00–H08, 9 est.) | S14 Barrier (5) |
| I | `I_Homi` (I00–I27, 28 est.) | S15 HOMIAction (5) + S16 HOMIContext (5) + S17 HumanControl (4) = **14 pasos** |
| J | `J_Closing` (J00–J23, 24 est.) | S18 Closing (4) |
| | **148 estados** | **85 pasos** |

**Este mapeo es una observación de Session 0, no una decisión.** Su veracidad es trabajo de Session 1 (contar estados reales alcanzables y compararlos con los declarados).

---

## 2. POR QUÉ SESIONES PEQUEÑAS

| Regla | Razón |
|---|---|
| Una sesión = un contexto fresco | 148 estados + 27 slots + 44 superficies de Figma-app + 40 de Integration + 3.5 KB de guion no caben en un contexto bien，结果可靠 |
| Cada sesión escribe su handoff a disco | Un handoff de 60 líneas se lee en 30 s; un historial de chat de 200 mensajes no |
| La evidencia es un fichero, no una conversación | Screenshots + tablas de incidencias sobreviven al cambio de sesión |
| Sesiones深的 más lentas | Preferible 8 sesiones de 40 min que 1 de 6 horas |

---

## 3. DECISIONES PENDIENTES DEL USUARIO (BLOQUEANTES)

| ID | Decisión | Opciones | Bloquea | Recomendación |
|---|---|---|---|---|
| **D-01** | **Método de captura de runtime.** El skill `testing-webapps` exige Python Playwright. Python **no está instalado** e instalar viola el contrato read-only. | (a) **Node Playwright** — `playwright-core@1.63.0` global, chromium ya en cache, scripts en `Temp\opencode\`. Sin instalar nada.<br>(b) Autorizar instalar Python + Playwright.<br>(c) Usar el `@playwright/test` de `Figma-app` desde un `testDir` externo. | Session 1 | **(a)** — cumple el objetivo (evidencia de runtime) sin violar §1.1. Es una desviación documentada del skill, no una violación de su intención. |
| **D-02** | **¿Cuál es la presentación auditada?** Dos repositorios con arquitecturas incompatibles (`00_SOURCE_MAP.md` §6.1, `C-02`). | (a) La **declarada** (`HomePlus_Presentacion_FINAL`, S01–S18, 1280×720). Es la que el brief nombra "CURRENT PRESENTATION" y la que se entrega como ZIP.<br>(b) **`Presentacion_HomePlus_Final`** (A00–J23, 1920×1080). Es la que implementa el master V2.0 y la que el contrato de campaña describe.<br>(c) **Ambas**, por separado. | Sessions 1–5 | **Requiere información del usuario.** El brief dice explícitamente "Do not silently substitute different paths", y (b) no está en la lista de rutas autoritativas. No se puede decidir por evidencia. |
| **D-03** | **Relación entre los dos masters.** `V1.0` (23/09, "única fuente de verdad") vs `V2.0` (22/09, "FROZEN para ejecución"). | (a) V1.0 manda (más nuevo).<br>(b) V2.0 manda (más específico en arquitectura).<br>(c) V1.0 para gramática/narrativa, V2.0 para arquitectura/choreografía. | Sessions 2, 4, 7 | **(c)** — es la única lectura que no pierde nada. Pero **debe decidir el usuario**. |
| **D-04** | **Canvas lógico de presentación.** Contrato §19 dice 1920×1080. La presentación declarada usa 1280×720 con auto-scaling. | (a) Auditar a 1280×720 y reportar el escalado como característica.<br>(b) Auditar a 1920×1080 (que es sólo la ventana del navegador; el contenido se escala 1.5×).<br>(c) Auditar a ambas. | Session 1 | **(c)** — cheap y da la información completa del comportamiento de escalado. |
| **D-05** | **Scripts `Guion Compartido` vs `Geni`/`Homi`.** `SI-01`, `OBS-21`. | (a) El guion manda → la presentación debería decir "Geni" en el bloque 9 y "Homi" en el 10 (imposible sin saber si son el mismo actor).<br>(b) "HOMI" es el nombre canónico del producto; el guion tiene errata → registrar `SI-01` y auditar contra "HOMI".<br>(c) Son dos actores distintos → la presentación necesita dosActores visualmente distintos. | Sessions 2, 5 | **(b) como default de auditoría**, con `SI-01` registrado. Si el walkthrough humano (M-01) aporta evidencia, se reevalúa. |
| **D-06** | **Hablante `Ber` sin bloque.** `SI-02`. | (a) Error del guion.<br>(b) Hay un bloque que no está en esta versión del guion. | Session 5 | **Registrar `SI-02`.** Sin acción. |
| **D-07** | **Copy del walkthrough ausente.** | ✅ **RESUELTO durante Session 0.** El fichero apareció a las 18:31:45 y se procesó: **89 hipótesis** (`HW-A-001` … `HW-J-002`) + veredicto global `HW-J-000`. Ver `00_HUMAN_HYPOTHESES.md`. **9 SCRIPT ISSUES** descubiertos (`SI-05` … `SI-09`). | — | Ninguna |

---

## 3 bis. HALLAZGO ESTRUCTURANTE DEL WALKTHROUGH (para Sessions 2–5)

**Patrón dominante (79 de 89 hipótesis):** el guion dice algo y **la pantalla no lo muestra**. No es "la pantalla contradice al guion" — es ausencia de correspondencia.

**Prueba de ello en código, ya disponible en Session 0:**

| Escena | Pasos declarados | Beats de guion | Ratio |
|---|---|---|---|
| J Cierre | 4 | 54 líneas / 3 bloques | **0,07** |
| F Continuidad | 3 | 14 elementos enumerados | **0,17** |
| E Assets/HomeCloud | 5 | 9 | **0,56** |
| D Finanzas | 5 | 8 | **0,63** |
| A Opening | 19 | 5 bloques | 3,80 |
| B Home/Planner/Familia | 18 | 6 bloques | 3,00 |
| I Homi | 14 | 6 bloques | 2,33 |

**Esto es una hipótesis de trabajo, no una incidencia.** El primer trabajo de Session 1 debe ser **contar los beats de guion por escena** y comparar con los pasos reales del navegador. Si se confirma, la raíz no es "mal diseño" sino **sub-especificación de la coreografía**: el registro de escenas nunca se dimensionó contra el guion.

**9 candidatos a BLOCKER** están listados en `00_HUMAN_HYPOTHESES.md` §5.4. El más sólido tiene confirmación de código en Session 0:

> `HW-B-002` — `HomePlannerSequence.tsx:32-34` pasa `authorizationCompleted={homeStep >= 3}` y `schoolTaskCompleted={homeStep >= 4}`, mientras `HomePlannerSections.tsx:49-52` (producto real) confirma que Home **sólo** expone `pending` / `awaiting_verification` y **nunca** `completed`.

---

## 3 ter. SCRIPT ISSUES DESCUBIERTOS

9 en total. 4 ya registrados en `00_SOURCE_MAP.md` §2.4 (`SI-01` Geni/Homi, `SI-02` hablante `Ber` sin bloque, `SI-03` ejemplo de Homi con dominio inconsistente, `SI-04` errata "compar").

5 nuevos, descubiertos por el walkthrough:

| ID | Guion | Resumen |
|---|---|---|
| `SI-05` | L91 | "conversaciones" listado dentro de **Familia**, pero pertenece a **Feed**. El observador: *"no caigamos sin que los errores del guion interrumpan la presentación"* |
| `SI-06` | L353–356 | Ejemplo de Geni ("comprar una coca") incompatible con el bloque 10 (agenda, Finanzas) |
| `SI-07` | L271 | `[Aca va la de continuidad pero en realidad sería una screen negra]` — el propio autor duda si la escena es slide o negro |
| `SI-08` | L442 | `[…hasta que el **Colo** termina de hablar]` — pero en L442 habla **Benja**; Colo ya habló en L462. Condición imposible |
| `SI-09` | L490 | `[Aca aparece esa última hipótesis q **debería existir**]` — **no existe ninguna hipótesis en el guion**. Contenido fantasma marcado por el autor |

**Ninguno se corrige en la campaña de auditoría.** Se entregan al equipo de guion.

---

## 4. SESIÓN 1 — RUNTIME EVIDENCE BASELINE

### 4.1 Objetivo

Capturar **evidencia de estado estable y de movimiento** de la presentación actual, de principio a fin, **sin emitir judgements**. Session 1 establece la línea base; no arregla nada.

### 4.2 Precondiciones

- [ ] `D-01` resuelta (método de captura).
- [ ] `D-02` resuelta (qué repo).
- [ ] Puerto 8443 libre (verificar antes de arrancar; `strictPort: true` hace fallar si está ocupado).
- [ ] Node disponible (✓ `v24.13.0`).
- [ ] Browsers Playwright disponibles (✓ chromium-1243 en cache).

### 4.3 Método de captura

**No existe salto directo a estado en ninguna de las dos presentaciones** (§6.4 de `00_AUDIT_CONTRACT.md`). Por tanto la navegación es **secuencial**.

```
1. Arrancar el dev server del repo elegido (pnpm dev, puerto 8443).
2. Abrir Chromium headless, viewport 1920×1080.
3. Capturar el estado inicial. Registrar data-slide-id / data-step-index
   (declarada) o .state-id (alterno).
4. Bucle: enviar 'ArrowRight', esperar a que el estado se estabilice,
   capturar.
   - Estabilización: esperar a que las transiciones CSS terminen.
     La presentación declara duraciones de 220/320/420/500 ms
     (motionTokens.ts) → esperar 700 ms es seguro para estado estable.
     Si se observan duraciones reales >700 ms, se registra y se ajusta.
   - NO usar wait_for_timeout como sustituto de una condición; sólo
     para agotar la duración de animación conocida antes de un screenshot.
5. Repetir en sentido inverso con 'ArrowLeft' para captura de
   verificación de reversibilidad.
6. Repetir el recorrido completo a 1440×900 y a un viewport no-16:9
   (p. ej. 1600×1200) para verificar el auto-scaling.
```

### 4.4 Qué capturar por estado

| Dato | Método | Para qué sirve |
|---|---|---|
| Screenshot estable | `page.screenshot({animations:'disabled', caret:'hide'})` | Evidencia visual primaria |
| `data-slide-id`, `data-slide-index`, `data-step-index` / `.state-id` | `getAttribute` | Anclar el estado a una identidad |
| Errores de consola | `page.on('console')`, `page.on('pageerror')`, `page.on('requestfailed')` | Detectar `TECHNICAL` |
| Overflow horizontal | `getBoundingClientRect().right > documentElement.clientWidth + 1` | `TECHNICAL` |
| Scrollbars | `scrollHeight > clientHeight` / `scrollWidth > clientWidth` por contenedor | `TECHNICAL` + regla §8.1 de motion |
| Escala aplicada | `getComputedStyle(.presentation-canvas).transform` | `D-04` |
| Valores computados de token | `getComputedStyle(document.documentElement).getPropertyValue('--presentation-accent')` | Verificar que los tokens se aplican |
| Jerarquía de capas visibles | `document.querySelectorAll('[data-active="true"],[data-present="true"],[data-active="true"]')` | Estados de persistencia |
| Elementos montados pero ocultos | contar hijos de `.opening-sequence` / `.home-planner-sequence` con `aria-hidden` | `OBS-03`, `OBS-04` |
| Rejilla de fuentes / radios / sombras distintos | `[...new Set([...document.querySelectorAll('*')].map(e=>getComputedStyle(e)['font-size']))]` | `reviewing-interface-quality` §Step 3 |
| Frames de movimiento | screenshots con retardo controlado (p. ej. 0/100/200/320/500 ms tras la tecla) | `MOTION` |

### 4.5 Pruebas de comportamiento específicas del contrato

| Prueba | Verifica | Método |
|---|---|---|
| **Reversibilidad** | "A press changes attention. Crossing a scene boundary preserves the inverse path." (`navigation.ts:4`) | Recorrer todo hacia delante, luego todo hacia atrás, comparar cada par de screenshots |
| **Hold indefinido** | "Estados estables pueden sostenerse indefinidamente" | Permanecer 10 s en 5 estados representativos, capturar al inicio y al final, comparar |
| **Persistencia de estado** | Modelos `ACCUMULATIVE`/`EXCLUSIVE`/`SELECTIVE CONTINUITY` | En S04→S05, contar qué elementos de Home sobreviven al entrar en Planner. `HomePlannerSequence.tsx:14` dice "keep completed tasks completed when entering Planner" |
| **Zoom sin reflow** | Regla §8.1 de motion | Medir el `boundingBox` de los hijos de `.phone-frame-screen` antes y después de cualquier estado de cámara. Si cambia, hay reflow |
| **Rama `?dev=1`** | ¿Existe realmente? | Navegar con `?dev=1`, comprobar presencia de `.presentation-dev` |
| **Click-to-advance** | La presentación declarada **no** lo tiene. ¿Es intencionado? | `page.mouse.click()` en el centro; comprobar si el estado cambia |
| **`prefers-reduced-motion`** | `OBS-07` | Crear contexto con `reduced_motion:'reduce'`, comprobar si hay bloqueo |

### 4.6 Salida de Session 1

`01_RUNTIME_BASELINE.md` debe contener:

1. **Identificación del repo auditado** (D-02 resuelta) y su estado real (rama/commit o hash de manifiesto).
2. **Tabla de estados alcanzables**: estado declarado vs estado real observado. **Discrepancias** (p. ej. si el registro declara 85 pasos pero se observan 87 transiciones).
3. **Grid de screenshots** de todos los estados estables, con índice.
4. **Informe de errores de consola** — lista completa, no resumida.
5. **Informe de overflow / scroll / visibilidad**.
6. **Curvas de escalado** medidas a 1920×1080, 1440×900, 1600×1200.
7. **Resultados de las 7 pruebas de comportamiento** de §4.5.
8. **Cero incidencias**. Session 1 es línea base. Las incidencias empiezan en Session 2.

**Handoff:** el fichero + el directorio de screenshots. Nada de contexto de chat.

---

## 5. SESIONES 2–5 — AUDITORÍA PROFUNDA POR ESCENAS

### 5.1 Estructura común de cada sesión

Cada sesión de escenas ejecuta el mismo ciclo:

```
1. RECONOCER     — releer el guion del bloque correspondiente (§4.1 de 00_HUMAN_HYPOTHESES.md)
2. TRAZAR        — para cada frase hablada, ¿qué estado visual hay? ¿cuál debería haber?
3. VERIFICAR     — abrir el screenshot de Session 1 para ese estado
4. CRUZAR        — con el master (fichero:línea), con Figma-app, con Integration
5. CLASIFICAR    — NARRATIVE | VISUAL | UX | MOTION | PRODUCT | TECHNICAL | TIMING | READABILITY
6. SEVERIZAR     — BLOCKER | HIGH | MEDIUM | LOW
7. REDACTAR      — con la plantilla §7.1 de 00_AUDIT_CONTRACT.md
8. HANDOFF       — escribir el fichero de la sesión
```

### 5.2 Enfoque por sesión

| Sesión | Escena | Guion | Foco principal | Competencias dominantes |
|---|---|---|---|---|
| **2** | A–B | Bloques 1–2 (L13–139) | Caos→acumulación→pregunta→reveal→Home→Planner→Familia→Feed→"Coordinar no es vigilar". El estado de Home de Juli y el beat de "la homework está pendiente" son el centro. | `presentation-design` (spoken-word alignment, progressive disclosure), `designing-user-experience` (¿la pantalla comunica "completado" cuando la narración dice "pendiente"?), `reviewing-interface-quality` |
| **3** | C–E | Bloques 3–5 (L141–271) | Cumpleaños multi-etapa → Inventario → Compras. Finanzas. Assets/HomeCloud. **La mayor densidad de superficieausente**: Integration no tiene Assets ni Shopping List. | `PRODUCT` classification como eje dominante, `designing-frontend-interfaces` (fidelidad de composición), `reviewing-interface-quality` |
| **4** | F–H | Bloques 6–8 (L273–345) | Continuidad, Frontend/Backend, Stack, Fricción. Escenas altamente editoriales. | `motion-design` (familias, timing editorial, atención), `presentation-design` (¿el concepto debe quedarse quieto?), `designing-frontend-interfaces` |
| **5** | I–J | Bloques 9–13 (L347–497) | Geni/Homi (nombre sin resolver, `D-05`), contexto por persona, control humano, cierre en dos partes. | `NARRATIVE` + `TIMING` como ejes, `designing-user-experience` (¿la propuesta→confirmación→ejecución es creíble?), `verifying-before-completion` |

### 5.3 Regla de no-veredicto en Session 0 → sí en Sessions 2–5

Session 0 **no** emitió veredictos. Empezó con `OBS-01`…`OBS-22` sin clasificar, e `HW-000` (cero hipótesis).

Sessions 2–5 **sí** convierten lo verificado en `P2-nnn`…`P5-nnn` con veredicto, clasificación y severidad.

**Pero sólo lo que se haya verificado en runtime.** Si una hipótesis no se puede comprobar en runtime, se escribe `RUNTIME NOT VERIFIED` y se clasifica aparte.

---

## 6. SESIÓN 6 — FIGMA-APP ↔ INTEGRATION

### 6.1 Objetivo

Determinar **qué debe llevar la presentación** a la luz de las dos fuentes de verdad divergentes (C y D), y clasificar cada diferencia con la taxonomía §2.2 de `00_AUDIT_CONTRACT.md`.

### 6.2 Precondición

- [ ] `D-02` resuelta — la sesión necesita saber **qué superficies** examina la presentación para poder emitir deltas accionables.
- [ ] Puertos: Figma-app y la presentación **no pueden coexistir** en 8443 (`OBS-18`).

### 6.3 Trabajo

1. Para cada superficie de §14/§15 (44 en total), producir la tabla de tres columnas: **Figma-app** / **Integration** / **Delta clasificado**.
2. Aplicar la taxonomía: `VISUAL-ONLY` · `FUNCTIONAL DELTA` · `PRODUCT DELTA` · `MISSING FIGMA SURFACE` · `LEGACY CURRENT UI` · `UNKNOWN`.
3. Resolverspecifically las tres diferencias ya detectadas en Session 0:
   - `C-09` / `OBS-09` — **Feed**: retirado en Figma-app, mock-stub en Integration, momento dedicado en el guion.
   - `C-10` / `OBS-10` — **Assets**: existe en Figma-app, **no existe** en Integration.
   - `C-11` / `OBS-11` — **Shopping List**: existe en Figma-app, **no existe** en Integration.
4. Emitir **recomendación por superficie**: qué puede mostrar la presentación sin falsificar el producto.

### 6.4 Restricción importante

**Session 6 NO puede levantar el stack completo de Integration.** Requeriría:
- Supabase local en el puerto 56221 (117 migraciones),
- API Node en 3001,
- emulador o dev-client Expo (el mapa y la ubicación exigen nativo),
- `GOOGLE_MAPS_API_KEY` válida.

Session 6 debe trabajar por **inspección estática** de las rutas y servicios, marcándolo como tal. Si se autoriza levantar el stack en una sesión posterior, se documenta como `RUNTIME NOT VERIFIED` en este intento.

---

## 7. SESIÓN 7 — MOTION / STAGECRAFT / TIMING (SISTÉMICO)

### 7.1 Objetivo

Auditar la Presentación **como sistema**, no escena por escena. Ésta es la sesión que responde a las preguntas que ninguna escena puede responder sola.

### 7.2 Preguntas sistémicas

| # | Pregunta | Fuente |
|---|---|---|
| 1 | ¿Se respeta la gramática de color? ¿Aparece naranja de HomePlus antes del reveal de S03/A15? | `MASTER_FREEZE_V1.0` §2.1 |
| 2 | ¿Las 4 familias motion (`REAL_NAV`, `EDITORIAL`, `SHARED_ELEMENT`, `DEVICE_TRANSITION`) se distinguen en la implementación, o hay una sola familia genérica? | §5.2 |
| 3 | ¿Los 3 modelos de persistencia (`ACCUMULATIVE`, `EXCLUSIVE`, `SELECTIVE CONTINUITY`) se distinguen, o todo es `ACCUMULATIVE`? | §5.3 |
| 4 | ¿El zoom se comporta como cámara, o hay reflow / scroll / distorsión? | §8.1 |
| 5 | ¿Los 9 `autobeat` están bien marcados? ¿Hay micro-acciones que deberían ser automáticas y son manuales, o al revés? | `Presentacion_HomePlus_Final/presentationState.ts` |
| 6 | ¿Cuántos triggers manuales hay en total? ¿Es operable en vivo? | `MASTER_FREEZE_V1.0` §1 "Operación en vivo: PASS SI SE AUTOMATIZA — No se puede depender de un click por objeto" |
| 7 | **Timing total.** El master marca WARNING CRÍTICO: guion ≈1.670 palabras → 10:27 @160ppm / 11:09 @150ppm, más holds. ¿Cuál es la duración real del recorrido de 85/148 estados? ¿Cabe en el tiempo disponible? | `MASTER_FREEZE_V1.0` §1 "Gate temporal" |
| 8 | ¿Cuántos elementos visibles simultáneamente en el peor estado? El master fija "máximo tres teléfonos simultáneos". | `MASTER_FREEZE_V1.0` §1 "Legibilidad en proyección" |
| 9 | ¿Hay `prefers-reduced-motion`? | `OBS-07` |
| 10 | ¿Los estados de negro/pantalla negra aparecen donde el guion los pide? | 15 marcas de dirección (§4.2 de `00_HUMAN_HYPOTHESES.md`) |

### 7.3 Método

- Curvas de easing y duraciones **medidas** en runtime (no leídas del token file). Comparar con `motionTokens.ts` y con las tablas de `motion-design`.
- Contar elementos visibles por estado.
- Contar triggers manuales (cada pulsación = 1 trigger).
- Estimar el tiempo de habla con las tablas del master y contrastar con la duración real del recorrido.
- Evaluar cada estado contra las barras de `presentation-design` y `reviewing-interface-quality`.

### 7.4 Salida

`07_MOTION_STAGECRAFT_TIMING.md` — una tabla por pregunta sistémica, con evidencia medida, clasificación, severidad, veredicto, comportamiento objetivo, justificación.

---

## 8. SESIÓN 8 — SÍNTESIS FINAL

### 8.1 Objetivo

Producir un **plan de remediación priorizado** para el desarrollador de la presentación. No una lista de quejas.

### 8.2 Entradas

`01_RUNTIME_BASELINE.md` + `02_SCENES_A_B_AUDIT.md` + `03_SCENES_C_E_AUDIT.md` + `04_SCENES_F_H_AUDIT.md` + `05_SCENES_I_J_AUDIT.md` + `06_FIGMA_VS_INTEGRATION.md` + `07_MOTION_STAGECRAFT_TIMING.md` + las 22 `OBS-*` + los `SI-*` + `C-*` + `M-*` + `D-*`.

### 8.3 Estructura de la salida

1. **Resumen ejecutivo** — 10 líneas, para quien decide.
2. **Bloqueantes** (`BLOCKER`) — nada más hasta resolverlos.
3. **Altos** (`HIGH`) — agrupados por causa raíz, no por escena.
4. **Medios** (`MEDIUM`).
5. **Bajos** (`LOW`) — agrupados, no uno a uno.
6. **SCRIPT ISSUES** — para el equipo de guion, no para el desarrollador.
7. **DECISIONES PENDIENTES** — las `D-*` que siguen abiertas.
8. **Deuda de evidencia** — todo lo que quedó `RUNTIME NOT VERIFIED`.
9. **Rutas几 uncertainty** — lo que sigue sin saber.

### 8.4 Reglas de la síntesis

- **Agrupar por causa raíz.** 12 incidencias de legibilidad en 3 escenas son 1 causa raíz, no 12.
- **Prioridad = severidad × confianza en la evidencia.** Una `MEDIUM` con evidencia runtime sólida va antes que una `HIGH` sin verificar.
- **Nada de "make it prettier".** Ver §7.5 de `00_AUDIT_CONTRACT.md`.
- **Distinguir lo que bloquea el live de lo que bloquea la excellence.**
- **Cada punto debe llevar la evidencia que lo sostiene** — un enlace a la incidencia con su captura, no un adjetivo.

---

## 9. HANDOFF — PROTOCOLO

### 9.1 Principio

**Una sesión futura no debe necesitar el contexto de chat previo.** Todo el contexto vive en `audit/`.

### 9.2 Estructura obligatoria del final de cada sesión

```markdown
## HANDOFF — <nombre de la sesión>

### Qué se hizo
[3 líneas]

### Qué se encontró
- <n> incidencias <ID> (n BLOCKER, n HIGH, n MEDIUM, n LOW)
- <n> OBS sin clasificar
- <n> SCRIPT ISSUES
- <n> decisiones pendientes

### Qué quedó sin verificar
[RUNTIME NOT VERIFIED + por qué]

### Ficheros escritos
[lista]

### Precondiciones para la siguiente sesión
[checklist]

### Lo que la siguiente sesión NO debe rehacer
[trabajo ya hecho, con referencia]
```

### 9.3 Inventario de ficheros

```
audit/
  00_SOURCE_MAP.md            ← Session 0 ✓
  00_AUDIT_CONTRACT.md        ← Session 0 ✓
  00_HUMAN_HYPOTHESES.md      ← Session 0 ✓
  00_SESSION_PLAN.md          ← Session 0 ✓
  01_RUNTIME_BASELINE.md      ← Session 1
  02_SCENES_A_B_AUDIT.md      ← Session 2
  03_SCENES_C_E_AUDIT.md      ← Session 3
  04_SCENES_F_H_AUDIT.md      ← Session 4
  05_SCENES_I_J_AUDIT.md      ← Session 5
  06_FIGMA_VS_INTEGRATION.md  ← Session 6
  07_MOTION_STAGECRAFT_TIMING.md ← Session 7
  08_FINAL_SYNTHESIS.md       ← Session 8
```

**No se crean los ficheros futuros en Session 0.**

---

## 10. SECUENCIA DE ARRANQUE

```
AHORA (Session 0)   ✅ COMPLETADA
   │
   ├──▶ [USUARIO] resuelve D-01 (método de runtime) y D-02 (qué repo)
   │
   ▼
SESSION 1           Runtime baseline. No depende de M-01 (walkthrough).
   │                Empieza en cuanto D-01 y D-02 estén resueltos.
   │
   ├──▶ [USUARIO] resuelve M-01 (walkthrough) ← crítico para 2–5
   ├──▶ [USUARIO] resuelve D-03 (masters), D-04 (canvas), D-05 (Geni/Homi)
   │
   ▼
SESIONES 2,3,4,5     Requieren M-01 + D-03 + D-05.
   │                Se pueden hacer entre sí, en cualquier orden.
   │                Prefieren 4 sesiones separadas (contexto fresco).
   ▼
SESIÓN 6             Figma ↔ Integration. Requiere D-02.
   │                Puede correr en paralelo con 2–5 (no comparte ficheros).
   ▼
SESIÓN 7             Motion/stagecraft/timing. Requiere 1 + 2–5.
   ▼
SESIÓN 8             Síntesis. Requiere todo.
```

### 10.1 Qué se puede hacer HOY

| Acción | Bloqueada por | Nota |
|---|---|---|
| **Session 1 completa** | sólo `D-01` y `D-02` | El baseline de runtime no necesita walkthrough (`M-01` resuelto) |
| **Sessions 2–5** | `D-02`, `D-03`, `D-05` | El walkthrough **ya está** (`M-01` ✅). Son las 4 decisiones de autoridad las que bloquean |
| Session 6 por inspección estática | `D-02` | No necesita levantar Supabase |
| Session 7 | todo lo anterior | Depende de 2–5 |
| Session 8 | todo | — |
