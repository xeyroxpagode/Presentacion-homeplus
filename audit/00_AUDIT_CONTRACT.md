# 00 — AUDIT CONTRACT

**Campaña:** HOMEPLUS FINAL PRESENTATION — AUDIT CAMPAIGN
**Sesión:** SESSION 0 — Source Map + Audit Contract
**Naturaleza:** este documento congela el **contrato de trabajo** de toda la campaña. No contiene hallazgos de calidad.

---

## 1. REGLA ABSOLUTA

**ESTA ES UNA CAMPAÑA DE AUDITORÍA READ-ONLY.**

### 1.1 Prohibido

- Rediseñar la presentación.
- Modificar código de la presentación.
- Modificar `Figma-app`.
- Modificar la rama de integración.
- Corregir bugs.
- Implementar UI.
- Implementar motion.
- Cambiar copy.
- Cambiar narrativa.
- Instalar paquetes.
- Commit, reset, checkout de otra rama, stash.
- Formatear ficheros de código.
- Refactors especulativos.
- Levantar servicios pesados sin autorización.

### 1.2 Permitido

- **Únicamente** crear o modificar ficheros bajo:
  `C:\Users\thega\Desktop\HomeplusPresentacion01\HomePlus_Presentacion_FINAL\HomePlus_Presentacion_FINAL\audit\`
- Lectura de cualquier ruta.
- Comandos de navegación de directorios, búsqueda y lectura.
- Comandos git **read-only** (`rev-parse`, `log`, `status`, `worktree list`).
- Captura de runtime con navegador headless (Session 1+, Playwright) — **sin escribir en el proyecto**.
- Escritura de artefactos de evidencia en `C:\Users\thega\AppData\Local\Temp\opencode\`.

### 1.3 Regla de parada

**STOP si una acción requerida modificaría algo fuera de `audit/`.**
Reportar y devolver `BLOCKED`. No limpiar destructivamente.

---

## 2. MODELO DE AUTORIDAD (CONGELADO)

Jerarquía vigente durante **toda** la campaña. Un artefacto no se vuelve correcto por estar implementado.

| Nivel | Autoridad | Rol | Fonte |
|---|---|---|---|
| **A** | **Guion actual** | Qué dice cada expositor, orden de habla, intención narrativa, ejemplos, orden de introducción de módulos, preguntas, transiciones conceptuales | `C:\Users\thega\Downloads\Guion Compartido (2).md` |
| **B** | **Masters de presentación** | Gramática visual, lógica de escena, triggers manuales, beats automáticos, persistencia, transiciones editoriales, elementos compartidos, legibilidad de escenario, principios de motion, relación intención↔pantalla | `HOMEPLUS_PRESENTATION_MASTER_FREEZE_V1.0.md`, `HOMEPLUS_PRESENTATION_NO_UI_MASTER_FREEZE_V2.0.md` |
| **C** | **UI visual** | Arquitectura de información, composición, jerarquía, tipografía, espaciado, controles, botones, cards, listas, navegación, estructura iPhone, framing de dispositivo, Dynamic Island, pulido | `C:\Users\thega\Desktop\Figma-app` |
| **D** | **Producto funcional actual** | Módulos disponibles, navegación real, flujos, rutas, entidades, interacciones, semántica de datos/estado | `C:\Users\thega\Desktop\homeplus-worktrees\Family-Hub-Own-integration` |
| **E** | **Presentación actual** | **EVIDENCIA, no autoridad.** | `…\HomeplusPresentacion01\…\HomePlus_Presentacion_FINAL` |
| **F** | **Walkthrough humano** | **EVIDENCIA (QA).** Observaciones a *verificar*, no a aceptar ni descartar a ciegas. | `…\audit-input\USER_WALKTHROUGH_RAW.txt` — **MISSING** |

### 2.1 Reglas de conflicto

1. **A vs B:** el guion manda *qué se dice*. El master manda *cómo se muestra*. Si el master exige un beat que el guion no menciona, es un beat **no justificable** salvo *foreshadowing* explícito.
2. **B vs C:** el master manda la coreografía; Figma-app manda el aspecto. El master **no** puede exigir UI que Figma-app no haya diseñado.
3. **C vs D:** cuando difieren, **no se prefiere ninguno automáticamente.** Hay que clasificar (ver §2.2).
4. **E vs todo:** la presentación actual es el objeto de auditoría, no una fuente de verdad.
5. **F vs todo:** el walkthrough humano se verifica contra A+B+C+D+E en runtime. No se acepta ni se descarta sin verificar.

### 2.2 Taxonomía obligatoria de diferencias C↔D

Toda diferencia entre `Figma-app` e `Integration` se clasifica con **exactamente uno** de:

| Clase | Definición | Efecto en presentación |
|---|---|---|
| `VISUAL-ONLY DIFFERENCE` | La función es la misma; sólo el aspecto difiere | La presentación puede mostrar cualquiera; la autoridad visual es C |
| `FUNCTIONAL DELTA` | La función existe en uno y no en el otro, sin contradicción de producto | Debe decidir qué lado se presenta |
| `PRODUCT DELTA` | Contradicción de producto real (p. ej. Assets existe en C y no en D) | **La presentación no puede fingir la capacidad** |
| `MISSING FIGMA SURFACE` | C no tiene la superficie que la narrativa necesita | Se necesita decisión de diseño |
| `LEGACY CURRENT UI` | La UI de C está retirada aunque el código exista | No se puede usar como autoridad visual |
| `UNKNOWN` | No clasificable con la evidencia disponible | Requiere investigación antes de decidir |

**Diferencias ya detectadas en Session 0 (a clasificar formalmente en Session 6):** C-09 (Feed), C-10 (Assets), C-11 (Shopping List). Ver `00_SOURCE_MAP.md` §10.

### 2.3 SCRIPT ISSUE

Si el guion en sí parece erróneo:
- Se registra como **`SCRIPT ISSUE`** con ID `SI-nnn`.
- **No se corrige durante las primeras pasadas.**
- **No se compensa haciendo que el comportamiento de la presentación sea deshonesto.**

Ya registrados: `SI-01` (Geni/Homi), `SI-02` (hablante `Ber` sin bloque), `SI-03` (ejemplo de Homi con dominio inconsistente), `SI-04` (errata "compar"). Ver `00_SOURCE_MAP.md` §2.4.

---

## 3. CONTRATO DE UI DE PRESENTACIÓN (CONGELADO)

**La UI pulida de Figma-app debe preservarse.**

### 3.1 Prohibido

- Borrar elementos simplemente para agrandar cosas.
- Convertir pantallas complejas en cards mínimos falsos.
- Reemplazar navegación real por controles genéricos de presentación.
- Reescribir la estructura de la app.
- Rediseñar módulos porque la implementación actual de la presentación se ve mal.

### 3.2 Preferido

- Teléfono más grande.
- Mayor escala global de presentación de la UI.
- Foco temporal.
- Exposición selectiva.
- Clipping / framing de cámara.
- Extracción de un elemento existente cuando editorialmente justificada.
- Motion de elemento compartido controlado.

### 3.3 La presentación

- **Puede** enfatizar elementos reales.
- **No debe** mutarlos en otro producto.

### 3.4 Estrategia objetivo

```
UI REAL POLIDA
  +  dispositivo de presentación más grande
  +  cámara / crop
  +  exposición selectiva
  +  foco local sin reflow
  +  motion editorial
```

**NO:** UI simplificada falsa + cards genéricos sobredimensionados + eliminación de elementos reales de interfaz.

---

## 4. CONTRATO DE DISPOSITIVO

| Requisito | Estado verificado en Session 0 |
|---|---|
| Modelo visual iPhone 15-class o superior | **CUMPLIDO (parcial)** — Figma-app: 390×844, radius 48, borde 10px. iPhone 15 Pro lógico = 393×852. Diferencia de 3pt/8pt. |
| Dynamic Island esperado | **NO VERIFICADO / NO EXISTE POR NOMBRE** — Figma-app tiene un pill 120×32 radius 20 top 8 `#1A1714` sin identificar. La presentación declarada **no tiene ninguno**. |
| Estructura de teléfono pulida en Figma-app | **PARCIAL** — existe `PhoneFrame` local en `App.tsx:794-969`, **no exportada**, sin componente reutilizable, sin safe-area explícita, sin scale model. |
| No inventar otro device frame sin evidencia | **ACTIVO.** No se creará frame nuevo hasta que la evidencia lo justifique en sesión posterior. |
| Determinar viewport lógico exacto, geometría de frame, implementación de Dynamic Island, safe areas, content bounds, scale model | **HECHO** — ver `00_SOURCE_MAP.md` §4.3 y §6. |

**Contrato verificado en la presentación declarada:** phone `300×620`, bezel 8, radius 46, screenRadius 38. Canvas `1280×720`. Sin Dynamic Island.

**Contrato verificado en `Presentacion_HomePlus_Final`:** canvas `1920×1080`, `PresentationPhone width={320} height={640}` en los placeholders C/D/E.

---

## 5. PRINCIPIOS DEL MASTER A VERIFICAR (NO A REASUMIR)

### 5.1 Gramática de color

| Color | Significado |
|---|---|
| **NEGRO** | Reset del narrador / pregunta clave / cierre |
| **OBJETOS REALES** | Caos del hogar / situaciones concretas |
| **UI EXTERNA** | Fragmentación |
| **NARANJA** | HomePlus |
| **TELÉFONO / UI HOMEPLUS** | Producto |

**Regla:** antes del reveal de HomePlus, **no usar naranja de HomePlus casualmente**.

Estado actual en la presentación declarada: `--presentation-blackout: #000000`, `--presentation-accent: #E65C1B`. Verificación pendiente de si el naranja aparece antes de S03.

### 5.2 Familias de motion

| Familia | Significado |
|---|---|
| `REAL_NAV` | Navegación real dentro del producto |
| `EDITORIAL` | Transición de presentación que relaciona conceptos, **no** presented como navegación real |
| `SHARED_ELEMENT` | Continuidad de un objeto entre escenas |
| `DEVICE_TRANSITION` | Cambio de framing de dispositivo |

Estado actual: la presentación declarada declara primitivas `ENTER`, `EXIT`, `REPLACE`, `ACCUMULATE`, `REFRAME`, `SPATIAL_WIPE`, `BLACKOUT` en `motion/motionTokens.ts:8-16`. **No hay familia motion declarada.** El mapeo de primitivas → familias es **UNKNOWN** y es trabajo de Session 7.

### 5.3 Modelos de persistencia de estado

| Modelo | Definición |
|---|---|
| `ACCUMULATIVE` | Los elementos se acumulan; el contexto previo se conserva |
| `EXCLUSIVE` | Un elemento entra, el anterior sale |
| `SELECTIVE CONTINUITY` | Sólo algunos elementos cruzan la frontera de escena |

**Verificar que la implementación actual respeta estas distinciones.** Trabajo de Session 7 (y parcialmente Session 1 para la evidencia de base).

Mecanismo relevante ya identificado: en la presentación declarada, S01–S07 comparten un único nodo React (`key='intro-product'`, `Presentation.tsx:33`), mientras S08–S18 se re-montan. `OpeningSequence` mantiene **todas** sus capas montadas a la vez (`OpeningSequence.tsx:19-38`). `HomePlannerSequence` mantiene **tres** capas de producto montadas simultáneamente (`:28-48`).

---

## 6. CONTRATO DE CAPTURA DE RUNTIME

### 6.1 Target

| Parámetro | Valor |
|---|---|
| Canvas lógico de presentación | **1920×1080** (según contrato de campaña §19). **DISCREPANCIA:** la presentación declarada usa **1280×720**. Resolver antes de Session 1 (C-02). |
| Viewport de navegador a capturar | 1920×1080 como **mínimo**, más 1440×900 y un viewport no-16:9 para verificar escalado |
| Modo | headless Chromium (`chromium-1243` en cache) |
| Artefactos | screenshots de estado estable + evidencia de animación/video/frame donde haga falta |

### 6.2 Capacidades exigidas al harness

El harness de captura debe soportar:

| Capacidad | Cómo se verifica |
|---|---|
| Salto directo a estado | Verificar si existe; si no, navegación secuencial con conteo de pulsaciones |
| Navegación adelante | `ArrowRight` / `Space` |
| Navegación atrás | `ArrowLeft` |
| Verificación de resize | Cambiar viewport y comprobar `scale` |
| Detección de scroll | ¿aparece scrollbar? ¿`scrollHeight > clientHeight`? |
| Detección de overflow | `getBoundingClientRect().right > documentElement.clientWidth` |
| Visibilidad | `data-slide-id`, `data-slide-index`, `data-step-index`, `data-active`, `data-present` |
| Persistencia de estado | Comparar DOM antes/después de una ida y vuelta |
| Observación de motion | Screenshots con retardo controlado + medición de transiciones CSS |

### 6.3 Selectores de estado disponibles

**Presentación declarada** (`Presentation.tsx:33-39`):
```html
<section class="presentation-scene"
         aria-label="…"
         data-slide-id="S07"
         data-slide-index="6"
         data-step-index="1">
```
`?dev=1` añade `<output class="presentation-dev">` con `slideIndex / stepIndex / id / name`.

**`Presentacion_HomePlus_Final`** (`PresentationRoot.tsx:88-96`): overlay `.state-navigator` siempre visible con `.state-id`, título de escena, `index+1 / 148`.

### 6.4 Realidad de "salto directo a estado" — **NO EXISTE en ninguna de las dos presentaciones**

| Presentación | Salto directo | Nota |
|---|---|---|
| Declarada (S01–S18) | **NO** | `?dev=1` sólo *muestra* el estado. No lo setea. Estado en `useReducer` sin sincronización con URL. |
| `Presentacion_HomePlus_Final` (A00–J23) | **NO** | `useReducer({index:0})` sin sincronización con URL. El overlay `.state-navigator` es sólo lectura. |

**Consecuencia:** el harness **debe** navegar secuencialmente. Para 85 pasos (declarada) es trivial. Para 148 estados (alterno) también. El plan exacto está en `00_SESSION_PLAN.md`.

### 6.5 Estado de las herramientas — **BLOQUEANTE PARCIAL**

| Requisito | Estado | Evidencia |
|---|---|---|
| Skill `testing-webapps` exige **Python + Playwright** | **NO DISPONIBLE** | `python` / `python3` → "no se encontró Python; ejecutar sin argumentos para instalar desde el Microsoft Store". `~/.local/opencode-venv` no existe. Módulo `playwright` no importable. |
| Node Playwright | **DISPONIBLE** | `playwright-core@1.63.0` global (`npm ls -g`); `@playwright/test@^1.63.0` presente en `Figma-app/node_modules` |
| Browsers | **DISPONIBLE (cacheados)** | `%LOCALAPPDATA%\ms-playwright`: `chromium-1208`, `chromium-1243`, `chromium_headless_shell-1208`, `chromium_headless_shell-1243`, `firefox-1509`, `webkit-2248`, `ffmpeg-1011` |

**DECISIÓN REQUERIDA DEL USUARIO (D-01):** el skill `testing-webapps` manda Python Playwright. Python no está instalado e instalar violaría §1.1 ("no instalar paquetes"). La vía disponible sin instalar nada es **Node Playwright** (`playwright-core` global, browsers ya en cache), ejecutando los scripts desde un directorio de trabajo en `C:\Users\thega\AppData\Local\Temp\opencode\` para no escribir dentro de ningún proyecto.

**No se ha ejecutado nada.** Registrado como riesgo, no resuelto.

### 6.6 Conflicto de puertos

| Servicio | Puerto | `strictPort` |
|---|---|---|
| Presentación (Vite) | **8443** | **Sí** |
| Figma-app (Vite) | **8443** | **Sí** |

**No pueden coexistir.** `Presentacion_HomePlus_Final` (Vite, `.mise.toml`) también usaría 8443 por defecto.
Session 1 y Session 6 deben correr en momentos distintos, o usar `PORT` / `FIGMA_DEV_SERVER_HOST` para separar. `vite.config.ts` lee `process.env.PORT` — `strictPort: true` implica que si el puerto está ocupado **falla**, no reintenta.

---

## 7. ESTÁNDAR DE EVIDENCIA (CONGELADO PARA TODAS LAS SESIONES)

**Toda incidencia eventual debe incluir evidencia.** Sin evidencia no hay incidencia.

### 7.1 Plantilla obligatoria

```
ISSUE ID:            <PREFIX>-<NNN>
SCENE / STATE:       <escena> / <estado o paso>
SCRIPT:              momento exacto relevante del guion (cita)
MASTER INTENT:       freeze/spec relevante (cita + fichero:línea)
CURRENT RUNTIME:     lo que realmente ocurre (con captura / método)
FIGMA VISUAL:        la UI de producto pretendida relevante
INTEGRATION PRODUCT: comportamiento real si es relevante
HUMAN WALKTHROUGH:   hipótesis enlazada si es relevante
CLASSIFICATION:      NARRATIVE | VISUAL | UX | MOTION | PRODUCT | TECHNICAL | TIMING | READABILITY
SEVERITY:            BLOCKER | HIGH | MEDIUM | LOW
VERDICT:             <veredicto>
TARGET BEHAVIOR:     <comportamiento objetivo>
RATIONALE:           <justificación>
```

### 7.2 PreFIjos de ID

| Prefijo | Alcance |
|---|---|
| `SI-` | SCRIPT ISSUE (defecto del guion, no de la presentación) |
| `HW-` | Hipótesis del walkthrough humano (origen: observación humana, sin veredicto) |
| `OBS-` | Observación de Session 0, sin clasificar ni veredicto |
| `C-` | Conflicto entre fuentes |
| `M-` | Input faltante |
| `D-` | Decisión pendiente del usuario |
| `P<n>-` | Incidencia de la sesión *n* (p. ej. `P2-014`) |

### 7.3 Clasificación (exactamente una)

| Clase | Alcance |
|---|---|
| `NARRATIVE` | La pantalla y lo dicho no coinciden conceptualmente; orden incorrecto; beat faltante |
| `VISUAL` | Composición, jerarquía, color, tipografía, espaciado |
| `UX` | Semántica de la acción, estado creíble, flujo, contexto de módulo |
| `MOTION` | Propósito, duración, easing, dirección de atención, continuidad, persistencia |
| `PRODUCT` | La presentación afirma capacidad que el producto no tiene |
| `TECHNICAL` | Bug, overflow, scroll, error de consola, arquitectura rota |
| `TIMING` | Ritmo, duración de hold, aparición demasiado pronto/tarde |
| `READABILITY` | Legible desde la distancia de sala sin destruir la estructura real |

### 7.4 Severidad

| Nivel | Definición |
|---|---|
| `BLOCKER` | Impide la presentación en vivo, o la presentación afirma algo falso sobre el producto, oridge desconexa un momento spoken-word de cualquier soporte visual |
| `HIGH` | El público no entiende la idea que el expositor está explicando |
| `MEDIUM` | Se entiende, pero degrada la percepción de calidad o contradice el master |
| `LOW` | Polish. No afecta comprensión |

### 7.5 Feedback PROHIBIDO

No se admiten incidencias formuladas así:

- ~~"make it prettier"~~
- ~~"animation feels off"~~
- ~~"needs polish"~~
- ~~"se ve feo"~~
- ~~"la transición podría estar mejor"~~

Cada incidencia nombra **ubicación**, **causa** y **valor de reemplazo**. *"El espaciado se siente mal"* no es una incidencia. *"`card` usa `padding: 14px` mientras el resto usa la escala de 8px → `var(--space-s)`"* sí lo es.

---

## 8. CONTRATO DE SKILLS (8 REQUERIDOS)

**Instrucciones cargadas y leídas en Session 0.** No se usa ningún skill sin leer sus instrucciones.

| # | Skill | Estado | Aplicación en la campaña |
|---|---|---|---|
| 1 | `presentation-design` | **LEÍDO** | Legibilidad de escenario, alineación spoken-word, jerarquía desde la distancia de audiencia, pacing, espacio negativo, beats visuales, si la pantalla apoya o compite con el expositor, si la información aparece demasiado pronto o tarde, si un reveal merece trigger manual, si un concepto debe quedarse quieto. Anti-patrones a vigilar: *Script Reader*, *Animation Circus*, *Bullet Point Disease*, *Data Dump*. Disciplina de referencia: keynote de producto de alto nivel. **No imitar branding de Apple**; se busca comparable *restricción, claridad, timing, stagecraft, jerarquía, confianza*. |
| 2 | `designing-frontend-interfaces` | **LEÍDO** | Composición UI, jerarquía visual, tipografía, espaciado, anatomía de componentes, consistencia visual, coherencia de design system, fidelidad al producto real. **PROHIBIDO usarlo como permiso para inventar un nuevo lenguaje de diseño de HomePlus.** Figma-app es la autoridad visual. Verificar contra sus umbrales: >8 `font-size` distintos, >3 `font-family`, >2 `border-radius`, >3 `box-shadow`, padding fuera de escala, >5 grises, acento >10% de superficie. |
| 3 | `reviewing-interface-quality` | **LEÍDO** | Crítica de UI basada en evidencia, severidad, detección de inconsistencia, densidad, legibilidad, pulido, claridad de interacción, distinción entre issues cosméticos y estructurales. **Ley de hierro: ninguna hallazgo sin evidencia realmente recogida.** Mínimo antes de escribir: screenshot a 1440px, screenshot a 390px, y valores computados de lo que se vaya a llamar inconsistente. |
| 4 | `designing-user-experience` | **LEÍDO** | Si las acciones mostradas tienen sentido semántico; si el flujo coincide con el comportamiento del producto; si las transiciones implican navegación falsa; si una acción comunica completitud incorrectamente; si un estado de usuario es creíble; si el contexto de módulo se mantiene comprensible. **Ley de hierro: ningún componente está terminado sin sus estados empty, loading, error y partial.** |
| 5 | `motion-design` | **LEÍDO** | Propósito del motion, dirección de atención, duración, easing, escala, continuidad de elemento compartido, enfoque tipo cámara, exposición, persistencia de objeto, entrada/salida, semántica de transición. **REGLA DE MOTION CRÍTICA (ver §8.1).** |
| 6 | `testing-webapps` | **LEÍDO** | Inspección de runtime, navegación de navegador, viewport fijo, evidencia por screenshot, navegación de estado, verificación DOM/runtime, reproducción de estados de presentación. **Evidencia de runtime es más fuerte que supuestos estáticos.** Restricción de entorno ver §6.5. |
| 7 | `systematic-debugging` | **LEÍDO** | Ante cualquier comportamiento que parezca roto. **Ley de hierro: ninguna corrección sin investigación de causa raíz.** Ciclo obligatorio: `OBSERVACIÓN → HIPÓTESIS → TEST MÍNIMO → EVIDENCIA → CAUSA RAÍZ`. No proponer reescrituras amplias sin probar la causa. |
| 8 | `verifying-before-completion` | **LEÍDO** | Antes de declarar `PASS`, `DONE`, `CORRECT`, `VERIFIED`. **El razonamiento de código estático NO es verificación de runtime.** Si no se comprobó runtime, escribir literalmente **`RUNTIME NOT VERIFIED`**. Prohibido "should", "probably", "should work". |

### 8.1 REGLA DE MOTION — Zoom tipo cámara sobre interfaz estable

El zoom **debe comportarse como cámara/enfoque sobre una interfaz estable.**

**NO PUEDE:**
- crear reflow de layout;
- hacer la UI scrolleable;
- distorsionar la geometría de la pantalla;
- hacer que los componentes exploten;
- empujar a los hermanos;
- cambiar la arquitectura de información.

Mecanismo actual en la presentación declarada a verificar: `PhoneFrame` acepta `scale` y calcula `width/height` del slot + variable CSS `--phone-scale` (`PhoneFrame.tsx:9-14`). `PresentationFrame` aplica `translate(-50%,-50%) scale(s)` al canvas completo (`PresentationFrame.tsx:29-31`). **Session 1 debe verificar si algún zoom de cámara existente muta la geometría interna del teléfono.**

### 8.2 Disciplina de `systematic-debugging` aplicada a la auditoría

Cuando una observación de runtime parezca un bug:

1. **OBSERVACIÓN** — qué se vio, con captura.
2. **HIPÓTESIS** — una sola, escrita explícitamente.
3. **TEST MÍNIMO** — la mínima acción que distinguiría la hipótesis.
4. **EVIDENCIA** — salida del test.
5. **CAUSA RAÍZ** — el mecanismo, con `fichero:línea`.

**No** se propone solución antes de los pasos 1–5. **No** se mezclan varios problemas independientes en un mismo lote.

### 8.3 Disciplina de `verifying-before-completion` aplicada a la auditoría

Antes de cerrar cualquier sesión:

1. Ejecutar el comando de verificación **fresco** en el mismo mensaje.
2. Leer la salida completa, comprobar exit code, contar fallos.
3. Verificar que la salida confirma la afirmación.
4. Sólo entonces afirmar.

Verificación de integridad de esta campaña: la presentación **no es repo git** (§9.1 de `00_SOURCE_MAP.md`), así que `git status --short` **no es aplicable**. Se usa el **manifiesto de 195 archivos** como sustituto, y el `git status --short` de Integration para confirmar que ese repo sigue exactamente como se encontró.

---

## 9. BARRA DE CALIDAD DE LA PRESENTACIÓN

**No se evalúa como "un PowerPoint de escuela decente".** Se evalúa como una presentación de producto seria, entregada en vivo en escenario.

| Criterio | Verificable |
|---|---|
| Cada beat tiene una razón | ¿qué idea introduce? Si no hay respuesta, es decoración |
| Cada pantalla apoya exactamente la idea hablada | citation de guion + screenshot |
| Los cambios visuales ocurren cuando cambia la idea | correspondencia timing spoken↔visual |
| Sin actividad aleatoria | todo motion tiene propósito identificable |
| Sin motion decorativo |cf. `motion-design` §"Simpleness threshold" |
| Sin comportamiento contradictorio | p. ej. pantalla dice "completado", narración dice "pendiente" |
| Una jerarquía visual clara por beat | un objeto protagonista |
| Espacio negativo suficiente | segundo pase de `reviewing-interface-quality` |
| La audiencia entiende el objeto importante de inmediato | primer test de `presentation-design` |
| UI legible sin destruir su estructura real | §3 |
| Los módulos se sienten como el mismo producto | comparación Figma-app ↔ presentación |
| Las transiciones preservan la continuidad narrativa | §5.3 |
| El expositor controla los beats narrativos | sólo teclado = el expositor tiene control total del ritmo |
| Motion automático sólo para micro-acciones indivisibles | `motionTokens.autobeat` / marcas `autobeat` |
| Estados estables pueden sostenerse indefinidamente | test de hold en Session 1 |
| Las preguntas reciben silencio visual cuando corresponde | estado negro |
| **La capacidad del producto nunca se falsifica** | §2.2 `PRODUCT DELTA` |
| **La presentación nunca explica algo antes de que el expositor lo introduzca intencionadamente** | salvo *foreshadowing* justificado |

---

## 10. EVIDENCIA OBSERVADA EN SESSION 0 QUE SERÁ HIPÓTESIS DE SESIONES POSTERIORES

**Sólo se registra. NO se juzga. NO se propone corrección.**

| ID | Observación | Fuente |
|---|---|---|
| `OBS-01` | `S04Home` es código muerto: registrado en el registry pero nunca renderizado, con lógica de props duplicada en `HomePlannerSequence`. | `Presentation.tsx:31-40`, `HomePlannerSequence.tsx:29-31` |
| `OBS-02` | S01–S07 comparten un nodo React (`key='intro-product'`); S08–S18 se re-montan. | `Presentation.tsx:33` |
| `OBS-03` | `OpeningSequence` mantiene 3 capas de contenido + 3 `AmbientGlow` montadas simultáneamente. | `OpeningSequence.tsx:19-38` |
| `OBS-04` | `HomePlannerSequence` mantiene 3 capas de producto montadas simultáneamente,控制的 por `data-present`. | `HomePlannerSequence.tsx:28-48` |
| `OBS-05` | Canvas lógico `1280×720`, no `1920×1080`. Phone `300×620`, no iPhone 15-class. Sin Dynamic Island. | `design-system/tokens.ts:2,19-27` |
| `OBS-06` | Sin salto directo a estado. `?dev=1` sólo muestra. Sin click-to-advance. | `Presentation.tsx:18,40-45`, `navigation.ts:23-30` |
| `OBS-07` | Cero `prefers-reduced-motion` identificado en el CSS de la presentación. | `index.css` (4 KB), `motion/motionTokens.ts` |
| `OBS-08` | Typografía de presentación = `Inter, "Segoe UI", Arial, sans-serif`. `designing-frontend-interfaces` §Anti-Slop lista Inter/Roboto/Arial/system-ui como **prohibido como display face**. Verificar si se usa como display. | `design-system/tokens.ts:16` |
| `OBS-09` | Figma-app: la superficie **Feed fue retirada** pero el guion tiene un momento Feed dedicado. | `Figma-app/src/types.ts:183-185`; guion L117-125 |
| `OBS-10` | Integration: **no existe el dominio Assets** (ni Play/PS5). Figma-app sí. | Integration: 0 tablas / 0 rutas / 0 seeds. Figma-app: `src/assets/data.ts:26` |
| `OBS-11` | Integration: **no existe Shopping List**. Figma-app sí. | Integration: única coincidencia es copy en `AccountDetailSheet.tsx:495` |
| `OBS-12` | Integration: `Family Places` es STUB — `MapContextCard` renderiza `"No hay lugares guardados para este hogar."` y `selectedPlace` no se calcula en ningún sitio. | `MapContextCard.tsx:90-98`, `PresenceScreen.tsx:594-603` |
| `OBS-13` | Integration: `HomeCloud Memories` es STUB — el segment tiene `onChange={() => {}}`. | `HomeCloudFilesScreen.tsx:44` |
| OBS-13b | Integration: `Feed` es mock local sin llamadas HTTP; `Feed comments` **NO EXISTE**. | `FeedFamiliarScreen.tsx:112`, `:214-230` |
| `OBS-14` | Integration: no existe Home scopeado por miembro. El guion requiere "Home de Juli" (10 años). Figma-app tampoco tiene a Juli; usa `?home-lab=child` con viewers sintéticos. | Integration: 0 coincidencias de `Juli`. Figma-app: `MEMBERS = gabriel, mariana, juan, martina` (`src/data.ts:3-43`), `home/lab.ts:59-80` |
| `OBS-15` | Integration: Home summary **sólo expone 2 estados visibles** (`pending`, `awaiting_verification`). Nunca muestra `completed`/`verified`. La señal de completado es efímera (420 ms). Relevante para el beat de Home en el guion. | `homeSummaryTypes.ts:34,131-134`, `HomePlannerSections.tsx:49-52,280-284,367` |
| `OBS-16` | Master V1.0 marca **WARNING CRÍTICO** de timing: guion ≈1.670 palabras → 10:27 @160ppm, 11:09 @150ppm; objetivo 9:30 "no es seguro". | `HOMEPLUS_PRESENTATION_MASTER_FREEZE_V1.0.md` §1 "Timing del guion actual" |
| `OBS-17` | Dos repositorios de presentación con arquitecturas incompatibles (S01–S18/1280×720 vs A00–J23/1920×1080). | `00_SOURCE_MAP.md` §6.1 |
| `OBS-18` | Figma-app y la presentación declarada **cuelgan del mismo puerto 8443 con `strictPort: true`**. | `Figma-app/vite.config.ts:34-35`, presentación `vite.config.ts:33-35` |
| `OBS-19` | La presentación declarada tiene **dos lockfiles** (`pnpm-lock.yaml` y `package-lock.json`). | raíz del proyecto |
| `OBS-20` | Drift de tooling: `.mise.toml` pide node 22 / pnpm 10.34.3; instalado node v24.13.0 / pnpm 11.24.0. | `.mise.toml`, `node --version`, `pnpm --version` |
| `OBS-21` | Guion: el nombre del asistente alterna "Geni" y "Homi"; la presentación declara `assistantName: 'HOMI'`. | guion L347/365/434/446 vs L371/415; `presentationConfig.ts:24` |
| `OBS-22` | En `Presentacion_HomePlus_Final`, escenas C, D y E son **placeholders de 1 estado** que renderizan un único `UISlot` con `devMode={true}` y el `stateId` como texto de debug a 11px/20% opacidad. | `scenes/C_PlansInventory/index.tsx`, `D_Finance`, `E_AssetsHomeCloud` |

---

## 11. HANDOFF ENTRE SESIONES

Cada sesión escribe un **handoff compacto y persistente** bajo `audit/`.
**Las sesiones futuras NO deben necesitar el contexto de chat previo.**

```
audit/
  00_SOURCE_MAP.md          ← esta sesión
  00_AUDIT_CONTRACT.md      ← esta sesión
  00_HUMAN_HYPOTHESES.md    ← esta sesión
  00_SESSION_PLAN.md        ← esta sesión

  # futuras:
  01_RUNTIME_BASELINE.md
  02_SCENES_A_B_AUDIT.md
  03_SCENES_C_E_AUDIT.md
  04_SCENES_F_H_AUDIT.md
  05_SCENES_I_J_AUDIT.md
  06_FIGMA_VS_INTEGRATION.md
  07_MOTION_STAGECRAFT_TIMING.md
  08_FINAL_SYNTHESIS.md
```

**No se crean los ficheros futuros en Session 0.**
