# 00 — SOURCE MAP

**Campaña:** HOMEPLUS FINAL PRESENTATION — AUDIT CAMPAIGN
**Sesión:** SESSION 0 — Source Map + Audit Contract (BOOTSTRAP)
**Modo:** READ-ONLY sobre todo el proyecto. Único escritura permitida: `audit/`.
**Fecha de captura:** 2026-10-04
**Verificación de integridad:** ver §9.

---

## 0. RESUMEN EJECUTIVO — HALLAZGOS BLOQUEANTES DE SESSION 0

Session 0 NO auditó calidad. Registra los hechos que condicionan toda la campaña:

| # | Hecho | Impacto | Estado |
|---|---|---|---|
| **B-01** | El archivo `audit-input/USER_WALKTHROUGH_RAW.txt` **NO EXISTEÍA** al inicio de Session 0. La carpeta `audit-input/` tampoco existía. **Apareció a las 2026-10-04 18:31:45**, durante la sesión, con 17.414 bytes. | §17 pasó de inejecutable a ejecutable. Mapa de hipótesis construido (89 hipótesis). | ✅ **RESUELTO** |
| **B-02** | Existen **DOS repositorios de presentación distintos** con arquitecturas incompatibles. El declarado "CURRENT PRESENTATION" usa escenas **S01–S18 / canvas 1280×720**. El que implementa el master freeze V2.0 usa escenas **A00–J23 / canvas 1920×1080**. | La campaña fue especificada contra el segundo. El路径 declarado como autoridad (E) es el primero. Hay que decidir antes de Session 1. | ⚠ **ABIERTO — BLOQUEANTE** |
| **B-03** | `SCENE_B_PRODUCTION_FREEZE_V1.0.md` **NO EXISTE** en ninguna ubicación del perfil. | La escena B no tiene freeze de producción localizable. | ⚠ **ABIERTO** |

### 0.1 ⚠ ESTADO INESPERADO — B-01

**Al inicio de Session 0** (verificado a las ~18:20) `audit-input/USER_WALKTHROUGH_RAW.txt` **no existía**. Se ejecutó búsqueda de sustituto en `HomeplusPresentacion01`, `Desktop`, `Downloads` y `Documents` → **0 resultados relevantes**.

**A las 18:31:45** el fichero apareció en la ruta declarada, 17.414 bytes, junto con la carpeta `audit-input/`. La escritura **no** la hizo esta sesión (el manifiesto de control no contiene ningún comando de escritura fuera de `audit/`).

**Comportamiento adoptado:** no se destructive cleanup, no selude, no se pideDevolver. Se leyó el fichero completo y se construyó el mapa de hipótesis real. Si el usuario no lo había colocado, esto es **evidencia aportada durante la campaña** y así se registra.

**Consecuencia:** el bloqueo `M-01` de §11 queda **resuelto**. El resto de B-02 y B-03 sigue abierto.

---

## 1. RUTAS AUTORITATIVAS — VERIFICACIÓN DE EXISTENCIA

| Rol | Ruta declarada | Estado | Última modificación |
|---|---|---|---|
| Presentación actual | `C:\Users\thega\Desktop\HomeplusPresentacion01\HomePlus_Presentacion_FINAL\HomePlus_Presentacion_FINAL` | **EXISTS** (dir) | 2026-10-04 17:54:00 |
| Autoridad visual UI | `C:\Users\thega\Desktop\Figma-app` | **EXISTS** (dir) | 2026-10-04 18:14:34 |
| Producto funcional actual | `C:\Users\thega\Desktop\homeplus-worktrees\Family-Hub-Own-integration` | **EXISTS** (dir) | 2026-09-27 20:53:13 |
| Ubicación del guion | `C:\Users\thega\Downloads` | **EXISTS** (dir) | 2026-10-04 14:10:23 |
| Walkthrough humano | `…\HomePlus_Presentacion_FINAL\audit-input\USER_WALKTHROUGH_RAW.txt` | **EXISTS** — *apareció a las 18:31:45 durante la sesión* | 2026-10-04 18:31:45 |
| Carpeta `audit-input/` | `…\HomePlus_Presentacion_FINAL\audit-input\` | **EXISTS** | 2026-10-04 18:31:45 |

Búsqueda de reemplazo ejecutada (READ-ONLY, sin resultados útiles):
- `Get-ChildItem -Recurse -Filter "*WALKTHROUGH*"` sobre `C:\Users\thega\Desktop\HomeplusPresentacion01` → 0 resultados.
- Búsqueda por nombre `WALKTHROUGH|RECORRIDO|TRANSCRIPT` sobre `Desktop`, `Downloads`, `Documents` → 0 resultados relevantes (solo `node_modules` de terceros: `css-tree/walk.cjs`, `estraverse`/`walker.js`, etc.).

**No se sustituyó la ruta.** El input humano existe. Ver §0.1 para la nota de aparición durante la sesión.

### 1.2 Caracterización del walkthrough humano

| Propiedad | Valor |
|---|---|
| Ruta | `…\audit-input\USER_WALKTHROUGH_RAW.txt` |
| Bytes | 17.414 |
| Líneas | **1** (texto continuo, sin saltos de línea) |
| Formato | **Dictado en voz, español rioplatense, sin edición** |
| Estructura | Ninguna. Sin timestamps, sin分段, sin marcado de escenas, sin referencias a IDs de estado |
| Errors de transcripción | Abundantes: "Colo"→"colo/culo/lolo/leo", "Homi"→"Homie/Home/Homing", "Geni"→"genial", "Info"→"Inside", "Backend"→"Baken/vaquen", "Figma"→"firma/signature", "Supabase"→"Superase", "PostgreSQL"→"Postres SQL", "Exposición"→"exposición/exposure", "Feed"→"FIFA/fido" |
| Referencias a pulsaciones | Implícitas: "skip x3", "al primer tap", "al próximo tap", "después soy una screen negra" |
| Saltos aparentes | "luego" / "después" como conectores, sin anclaje temporal |

**Implicación para el mapeo:** el walkthrough **no nombra IDs de estado ni de escena**. Todo el anclaje必须 hacerse por **momento del guion**, que es la única clave estable. La extracción en `00_HUMAN_HYPOTHESES.md` se hizo así.

**Contenido total leído:** 17.414 caracteres, 100%. Divisible en 13 bloques que corresponden a los 13 bloques de speaker del guion (§2.3). La cobertura del walkthrough llega hasta el final del guion (L497, "muchas gracias").

### 1.1 Repositorio de presentación alterno — NO declarado, relevante

| Ruta | Estado | Última modificación |
|---|---|---|
| `C:\Users\thega\Desktop\Presentacion_HomePlus_Final` | **EXISTS** (dir, **ES repo git**) | 2026-10-02 13:35:59 (`.git`) |

No figura en la lista de rutas autoritativas. Se descubrió porque es el único repositorio que implementa la arquitectura descrita por `HOMEPLUS_PRESENTATION_NO_UI_MASTER_FREEZE_V2.0.md`. Ver §4.2 y §7.

Otros repositorios/presentation artifacts présents en el escritorio y **NO** seleccionados (evidencia de linaje, no autoridad):
- `C:\Users\thega\Desktop\Presentacion\` (2001) — presentación vieja, contiene `homeplus-remotion`, `08_homeplus_presentation_blueprint_final.md`, `source_maps/`.
- `C:\Users\thega\Desktop\Implement HomePlus Keynote\` (2026) — scaffold keynote.
- `C:\Users\thega\Desktop\HomePlus_Presentacion_FINAL.zip` (2 MB) y `HomeplusPresentacion01.rar` (30 MB, 2026-09-24) — paquetes de distributing.
- `C:\Users\thega\Downloads\HOMEPLUS_presentacion_modificada_24-09.zip` (4,9 MB, 2026-09-24).
- `HOMEPLUS presentation design.make` (4,6 MB) replicado en ~12 worktrees de HomePlus — artefacto Figma Make.

---

## 2. AUTORIDAD A — VERDAD NARRATIVA (GUION)

### 2.1 Resolución del guion actual

Búsqueda en `C:\Users\thega\Downloads` de `Guion Compartido*`:

| Fichero | Modificado | Tamaño | Contenido |
|---|---|---|---|
| **`Guion Compartido (2).md`** | **2026-09-24 09:13:55** | **13,2 KB** | 497 líneas. Guion Homeplus, 5 hablantes (Colo, Gaby, Benja, Ber + {:6–9}). |
| `Guion Compartido (1).md` | 2026-09-18 11:17:15 | 11,8 KB | 12.040 chars. Versión anterior, mismo esqueleto. |
| `Guion Compartido.md` | 2026-09-15 22:08:13 | 11,2 KB | 11.460 chars. Versión base. |
| `Guion Compartido.docx` | 2026-09-14 18:22:54 | 14,8 KB | Binario, anterior a los `.md`. |
| `GUION_HOMEPLUS_MODIFICADO (1).docx` | 2026-09-14 17:33:29 | 39,6 KB | Binario, anterior. |
| `HOMEPLUS_GUION_FINAL_V1_0.docx` | 2026-09-14 08:03:02 | 41,5 KB | Binario, anterior. |

### 2.2 Veredicto de selección

**EXACTO PATH:** `C:\Users\thega\Downloads\Guion Compartido (2).md`
**FILENAME:** `Guion Compartido (2).md`
**MODIFIED:** 2026-09-24 09:13:55
**FILE TYPE:** Markdown (`.md`), UTF-8, 497 líneas, 13.532 chars

**WHY SELECTED:**
1. Es el `.md` con timestamp más reciente de la familia `Guion Compartido*` (6 días posterior a `(1).md`).
2. Es el de mayor volumen de contenido (13.532 chars vs 12.040 vs 11.460) — evolución acumulativa, no un duplicado.
3. Contiene **marcas de dirección explícitas para la presentación** que las versiones anteriores no tienen en esa forma: `\[Screen nega\]`, `\[Van apareciendo los items\]`, `\[Aca ya aparecen los miles de ejemplos\]`, `\[Diapositiva de la informacion ya existia\]`, `\[aca deberia haber una screen negra\]`, `\[aca va la de un cumpleaños no es solo un evento\]`, `\[aca arranca la del dinero es un hogar\]`, `\[Aca va la de continuidad pero en realidad seria una screen negra\]`, `\[aca va la de frontend backend\]`, `\[Aca va la de friccion\]`, `\[Aca va la que arranca geni\]`, `\[Aca deberia haber una screen negra que aparece hasta que el colo termina de hablar\]`, `\[Aca aparece esa ultima hipotetica q deberia existir\]`.
  Estas marcas son la **contrato de stage** embebido en el guion. Son la fuente primaria de las hipótesis de sincronía narrator↔pantalla.
4. Los `.docx` homónimos son todos anteriores (2026-09-14) y de otro formato.

**No se editó el guion.**

### 2.3 Estructura de speakers y bloques del guion (mapa de referencia)

| Bloque | Speaker | Contenido | Marca de dirección |
|---|---|---|---|
| 1 | **Colo** | Entrada y presentación del producto. Caos (seguro auto, compras, heladera/garantía) → acumulación → "¿Qué pasaría si esa parte del contexto del hogar pudiera estar organizada y disponible?" → reveal HomePlus → "no nace para que una persona controle" | `Screen negra`, `screen negra` antes de la pregunta, `donde dice homeplus y el logo` |
| 2 | **Gaby** | Home + Planner + "¿cómo ganó autonomía?" → Familia. Juli (10 años) con Educación Física + autorización + tarea. Planner: Tareas/Calendario/Planes. Familia: Tomi (16) entreno se alarga, "¿Quién puede pasar a buscarlo?", mapa + lugares + ubicación, Feed ("El técnico viene entre las cuatro y las seis") → "Coordinar no significa vigilar" | — |
| 3 | **Infra** | Plan → Inventory. Cumpleaños del sábado: evento + tareas + qué comprar. Planes multi-etapa → Inventario → lista de compras automática | `aca va la de un cumpleaños no es solo un evento`, `aca arranca la del dinero es un hogar` |
| 4 | **Gaby** | Finanzas: movimientos personales y del hogar, cuentas/tarjetas, pagos del hogar ("¿Internet ya está pago?"), límites, Resumen ("¿Cuánto gastamos este mes?"), Análisis ("¿En qué se nos está yendo más?") | — |
| 5 | **Infra** | Assets → HomeCloud. Play. Identidad + factura/garantía/manual. "Volvamos al cumpleaños" → fotos/frase/audio → álbumes. "HomeCloud no solamente almacenamiento sino memoria del hogar" | `Aca va la de continuidad pero en realidad seria una screen negra` |
| 6 | **Colo** | Continuidad: colegio, entrenamiento, compras, pagar Internet, la play, cumpleaños → personas/fechas/responsabilidades/ubicaciones/gastos/archivos. "La vida no ocurre separada en módulos" | `aca va la de frontend backend` |
| 7 | **Benja** | Stack técnico. Frontend vs backend (ejemplo gasto). React Native + Expo, Node.js, Supabase + PostgreSQL, Figma, modelos de IA. "Ninguna debería sentirse separada" | `Aca va la de tecnologias`, `Aca va la de friccion` |
| 8 | **Infra** | Fricción: "si quiero crear una tarea, tengo q saber cómo hacerlo" → "¿qué pasaría si ni siquiera tuviéramos que saber cómo?" | `Aca va la que arranca geni` |
| 9 | **Benja** | Presentación de GENI: "Haceme acordar de ir mañana a comprar una coca" → propuesta → confirmación → ejecuta. "Geni no vive al costado de HomePlus. Trabaja sobre HomePlus." | — |
| 10 | **Gaby** | Continuación de Geni/Homi: "¿Qué me queda para mañana?" → respuesta depende de quién pregunta (Juli / Tomi / papá). "Es el mañana de cada uno." → "¿Cuánto gastamos en supermercado este mes?" contra Finanzas | — |
| 11 | **Benja** | Control humano: "no significa reemplazar toda la aplicación por un chat", interfaz sigue siendo mejor para mirar/comparar/control visual. "la decisión final sigue siendo nuestra" | `Aca deberia haber una screen negra que aparece hasta que el colo termina de hablar` |
| 12 | **Gaby** | Cierre parte 1: "Geni responde a la misma idea con la que armamos HomePlus". Menos cosas que reconstruir/buscar/mantener. "El objetivo nunca fue pasar más tiempo dentro de HomePlus" | — |
| 13 | **Colo** | Cierre parte 2: mochila, factura, heladera. "La casa no cambió". Lo invisible. "Homeplus no pretende enseñarle a una familia cómo ser familia". | `Aca aparece esa ultima hipotetica q deberia existir` |

### 2.4 SCRIPT ISSUE — registrado, NO corregido

| ID | Observación | Evidencia |
|---|---|---|
| **SI-01** | **Inconsistencia de nombre del asistente: "Geni" vs "Homi".** El guion usa ambos para lo que parece ser la misma función. | L347 `**Benja : Presentacion de GENI**`, L328/L345 `geni`, L365 `**Geni no vive al costado de HomePlus**`, L434 `Geni aparece cuando`, L446 `hasta Geni responde` — frente a L371 `Porque Homi también puede trabajar con la información que HomePlus ya tiene`, L415 `una de las ideas más importantes de Homi`, L306/L316 (Bloque 7, Benja) no menciona ninguno. |
| **SI-02** | El guion menciona **5 hablantes** (Colo, Gaby, Benja, Ber) pero sólo **3 tienen bloque asignado**. `Ber` no tiene ningún bloque. | L5–11 declaran `**Colo** **Gaby** **Benja** **Ber**`; L11 `**Entrada y presentacion de el producto : Colo**`. Ningún encabezado `**Ber:**` en las 497 líneas. |
| **SI-03** | El ejemplo de Homi usa un **dominio equivocado**: el guion dice `"Haceme acordar de ir mañana a compar una coca"` (recordatorio/compra) pero el bloque 10 pregunta por agenda y por Finanzas. | L355 vs L375 y L403. |
| **SI-04** | Errata tipográfica en el diálogo de ejemplo: `"compar una coca"` (falta `r`). | L355. |

**Consecuencia para la auditoría:** la presentación declara `assistantName: 'HOMI'` (`src/presentation/presentationConfig.ts:24`) y nombra escenas `S15HomiAction`, `S16HomiContext`. El guion, en el bloque 9, lo llama **GENI**. La cámara de presentación no puede estar "alineada con el guion" en el nombre del asistente sin resolver SI-01 primero. **Decisión del usuario requerida.**

---

## 3. AUTORIDAD B — MASTERS DE PRESENTACIÓN

### 3.1 Búsqueda realizada

Búsqueda READ-ONLY en `C:\Users\thega\Desktop`, `C:\Users\thega\Downloads`, `C:\Users\thega\Documents` (profundidad 2, excluyendo `node_modules`/`.git`) de nombres que casen con `*FREEZE*`, `*MASTER*`, `*AUDIT*`, `*SPEC*`, `*HANDOFF*`, `*PRESENTACION*`, `*SCENE*`, `*KEYNOTE*`.

**Dentro del repositorio de presentación declarado:** `C:\Users\thega\Desktop\HomeplusPresentacion01\...\HomePlus_Presentacion_FINAL\` — **0 documentos `.md`**. El árbol completo son 195 archivos: `src/` (código), `assets/`, `dist/`, `.figma/`, `.agents/`, y 10 ficheros de raíz (`package.json`, `vite.config.ts`, `index.html`, `tsconfig.json`, `LEEME.txt`, `ABRIR_PRESENTACION.bat`, `.mise.toml`, `.gitignore`, `.gitattributes`, lockfiles). **No hay `docs/`. No hay `audit/`. No hay `audit-input/`.**

### 3.2 Inventario y clasificación de documentos de presentación

| Documento | Ruta exacta | Bytes | Modificado | Clasificación | Autoridad | Notas |
|---|---|---|---|---|---|---|
| `HOMEPLUS_PRESENTATION_MASTER_FREEZE_V1.0.md` | `C:\Users\thega\Downloads\` | 54.105 | 2026-09-23 21:16 | **AUTHORITATIVE GLOBAL** | B (principal) | Se autodeclara «única fuente de verdad para construir la presentación». Declara: "este documento reemplaza los planteos visuales previos. El código actual y los Product Freeze de cada módulo siguen siendo autoridad de producto cuando exista contradicción." Define el mapa de stress test, gate temporal (~10 min), gramática visual. |
| `HOMEPLUS_PRESENTATION_NO_UI_MASTER_FREEZE_V2.0.md` | `C:\Users\thega\Downloads\` | 26.214 | 2026-09-22 16:17 | **AUTHORITATIVE GLOBAL (refinamiento)** | B | Versión **posterior en numeración (V2.0)** pero **anterior en fecha**. Declara repo base `github.com/xeyroxpagode/HomePlus-Presentacion`. Define la arquitectura A00–J23, `sceneRegistry`, `PresentationRoot`, `UISlot`, `PresentationPhone`, canvas 16:9, y la cadena `CURRENT → AUDIT → PATCH SPEC → IMPLEMENT → RUN → VISUAL QA → FIX → FREEZE`. Declara explícitamente: "El agente de código **no diseña**." |
| `SCENE_B_PRODUCTION_FREEZE_V1.0.md` | — | — | — | **NOT FOUND** | — | No existe en ninguna ruta del perfil. Ver B-03. |
| `HOMEPLUS_KEYNOTE_MASTER_V6.md` | `C:\Users\thega\Downloads\` | 39.322 | 2026-09-10 09:09 | **LEGACY** | — | Supersedido por V1.0 (23/09). |
| `HOMEPLUS_KEYNOTE_MASTER_V5.md` | `C:\Users\thega\Downloads\` | 36.045 | 2026-09-10 08:40 | **LEGACY** | — | Supersedido. |
| `HOMEPLUS_KEYNOTE_MASTER_V4.md` | `C:\Users\thega\Downloads\` | 35.742 | 2026-09-10 08:34 | **LEGACY** | — | Supersedido. |
| `HOMEPLUS_KEYNOTE_MASTER_V2.md` + `V2 (1).md` | `C:\Users\thega\Downloads\` | 12.635 c/u | 2026-09-02 | **DUPLICATE** | — | Dos copias idénticas (12,3 KB). |
| `HOMEPLUS_KEYNOTE_MASTER_V1.md` | `C:\Users\thega\Downloads\` + `C:\Users\thega\Desktop\Implement HomePlus Keynote\src\imports\` | 16.104 | 2026-08-28 02:20 | **LEGACY** | — | Dos copias. |
| `HOMEPLUS_KEYNOTE_FREEZE_V1.zip` | `C:\Users\thega\Downloads\` | 12.985 | 2026-08-27 23:51 | **LEGACY** | — | Archivo comprimido, no verificado. |
| `HOMEPLUS_VISUAL_HANDOFF_V1.md` | `C:\Users\thega\Downloads\` | 14.163 | 2026-08-28 08:19 | **SUPPORTING** | — | Handoff de la era keynote. |
| `00_HOMePLUS_PRODUCT_CLOSURE_HANDOFF.md` | `C:\Users\thega\Downloads\` | 6.660 | 2026-08-15 01:54 | **SUPPORTING** | — | Handoff de cierre de producto, no de presentation. |
| `HOMePLUS_ONBOARDING_HANDOFF_NEXT_CHAT.md` | `C:\Users\thega\Downloads\` | 43.041 | 2026-10-02 11:06 | **SUPPORTING (onboarding)** | — | Alcance onboarding, no presentation global. |
| `HOMePLUS_ONBOARDING_SOURCEMAP_STARTER.md` | `C:\Users\thega\Downloads\` | 3.276 | 2026-10-02 11:06 | **SUPPORTING (onboarding)** | — | Ídem. |
| `HOMePLUS_ASSETS_PRODUCT_FREEZE_V2.0.md` | `C:\Users\thega\Downloads\` | 39.929 | 2026-10-01 21:31 | **SUPPORTING (módulo Assets)** | D (producto) | Producto, no presentación. Relevante para Escena E. |
| `HOMECLOUD_PRODUCT_EXPERIENCE_FREEZE_V2.md` | `C:\Users\thega\Downloads\Nueva carpeta (3)\` | 9.017 | 2026-09-25 11:31 | **SUPPORTING (módulo HomeCloud)** | D (producto) | Producto. |
| `HOMECLOUD_PRODUCT_FREEZE_V1.0.md` | `C:\Users\thega\Downloads\` | 23.649 | 2026-09-03 18:29 | **LEGACY (módulo)** | — | Supersedido por V2. |
| `HOMECLOUD_FILES_HANDOFF.md` | `C:\Users\thega\Downloads\Nueva carpeta (4)\Nueva carpeta\` | 22.118 | 2026-10-03 18:57 | **SUPPORTING (módulo)** | D | Producto. |
| `PLANS_PRODUCT_TRUTH_V1_AND_FIGMA_AUDIT.md` | `C:\Users\thega\Downloads\` | 17.450 | 2026-10-01 16:20 | **SUPPORTING (módulo Plans)** | D | Producto. |
| `PLANNER_FINAL_UX_AUDIT_V1.md` | `C:\Users\thega\Desktop\Figma-app\` | 33.316 | 2026-10-04 15:30 | **SUPPORTING (Figma-app)** | C | Visual/UX del Figma-app, no de la presentación. |
| `HOMEPLUS_MOTION_SYSTEM_V1.md` | `C:\Users\thega\Desktop\Figma-app\` | 47.147 | 2026-10-01 16:21 | **SUPPORTING (Figma-app)** | C | Sistema de motion del producto. Referencia para contraste con motion de presentación. |
| `HOME_SURFACE_GRAMMAR_V1.md` | `C:\Users\thega\Desktop\Figma-app\` | 68.172 | 2026-09-30 16:09 | **SUPPORTING (Figma-app)** | C | Gramática de la superficie Home del Figma-app. |
| `PLANS_FINAL_VISUAL_ATTENTION_AUDIT_V1.md` | `C:\Users\thega\Desktop\Figma-app\` | 133.158 | 2026-10-03 13:38 | **SUPPORTING (Figma-app)** | C | Ídem. |
| `TASKS_CLEAN_VISUAL_AUDIT.md` | `C:\Users\thega\Desktop\Figma-app\` | 103.362 | 2026-09-29 23:09 | **SUPPORTING (Figma-app)** | C | Ídem. **Duplicado exacto** en `Documentos-de-planner-historicos\Figma\`. |
| `TASKS_FINAL_POLISH_AUDIT.md` | `C:\Users\thega\Desktop\Figma-app\` | 94.671 | 2026-09-28 23:48 | **SUPPORTING (Figma-app)** | C | Ídem. **Duplicado exacto** en el histórico. |
| `FINANCE_UX_COMPLETION_MASTER.md` | `C:\Users\thega\Desktop\Figma-app\` | 448.295 | 2026-09-30 09:22 | **SUPPORTING (Figma-app)** | C | **Duplicado exacto** en `Documentos-de-planner-historicos\Figma\`. |
| `FINANCE_UX_ANALYSIS_AUDIT.md` | `C:\Users\thega\Desktop\Figma-app\` | 62.685 | 2026-10-01 13:02 | **SUPPORTING (Figma-app)** | C | — |
| `FINANCE_UX_07_2_TARGET_DECISIONS.md` | `C:\Users\thega\Desktop\Figma-app\` | 89.587 | 2026-10-01 16:02 | **SUPPORTING (Figma-app)** | C | — |
| `CALENDAR_UX_AUDIT.md` | `C:\Users\thega\Desktop\Figma-app\` | 52.887 | 2026-09-30 15:53 | **SUPPORTING (Figma-app)** | C | **Duplicado exacto** en el histórico. |
| `FINANCE_FIGMA_1TO1_AUDIT.md` | `C:\Users\thega\Desktop\Figma-app\` | 61.064 | 2026-09-28 11:08 | **SUPPORTING (Figma-app)** | C | — |
| `ACCEPTANCE_REPORT.md` / `TEST_REPORT.md` | `C:\Users\thega\Desktop\Figma-app\` | 6.407 / 4.643 | 2026-09-24 | **SUPPORTING (Figma-app)** | C | — |
| `HOMePLUS_ONBOARDING_TOTAL_FREEZE_LOCKED.md` | `C:\Users\thega\Desktop\Figma-app\docs\onboarding\` | 52.924 | 2026-10-04 | **SUPPORTING (onboarding)** | C/D | — |
| `HOMePLUS_ONBOARDING_V3_SOURCE_MAP.md` | `C:\Users\thega\Desktop\Figma-app\docs\onboarding\` | 72.921 | 2026-10-04 | **SUPPORTING (onboarding)** | C/D | — |
| `HOMePLUS_FIGMA_MASTER_GENERATION_DIRECTIVE_V1.0.md` | `C:\Users\thega\Desktop\Figma-app\src\imports\` | 77.133 | — | **SUPPORTING (Figma-app)** | C | Directiva de generación. |
| `STAGE_7B_CONTRACT_FREEZE.md`, `STAGE_7A_AUDIT_REPORT.md`, `STAGE_8A_AUDIT_REPORT.md`, `HOME-POLISH-0-AUDIT.md` | múltiples worktrees de HomePlus | 10–59 KB | 2026-09/10 | **UNKNOWN (alcance producto, no presentación)** | D | Stages de polish de producto. No son masters de presentación. |
| `HOMEPLUS presentation design.make` (×12 worktrees) | `HomePlus-worktrees\*` | 4.599.800 | 2026-07/10 | **UNKNOWN** | — | Artefacto binario Figma Make de 4,6 MB. No inspeccionado. |

### 3.3 CONFLICTO DE MASTERS — C-01

**Los dos masters global tienen números de versión invertidos respecto a la fecha:**

| Documento | Versión | Fecha |
|---|---|---|
| `HOMEPLUS_PRESENTATION_MASTER_FREEZE_V1.0.md` | V1.0 | 2026-09-23 (**más nuevo**) |
| `HOMEPLUS_PRESENTATION_NO_UI_MASTER_FREEZE_V2.0.md` | V2.0 | 2026-09-22 (**más viejo**) |

El V2.0 declara "Estado: FROZEN para ejecución" y define la arquitectura operativa. El V1.0, más reciente, se autodeclara "única fuente de verdad" y "reemplaza los planteos visuales previos".

**No se resolvió cuál prevalece.** Registrado como C-01. Ambos son AUTHORITATIVE GLOBAL; el V1.0WIN por fecha, el V2.0 por alcance explícito de ejecución.

### 3.4 CONFLICTO DE MASTERS — C-02 (arquitectura)

El V2.0 manda preservar: `PresentationRoot`, state machine, navegación `Space/ArrowRight/ArrowLeft`, **`sceneRegistry`**, **IDs A00–J23**, estructura por escenas, `UISlot`, `PresentationPhone`, canvas 16:9, render de estados aislados.

La presentación declarada (E) **no tiene ninguno** de `sceneRegistry`, `PresentationRoot`, `UISlot`, `PresentationPhone`, ni IDs A00–J23. Tiene `Presentation.tsx`, `navigation.ts`, `presentationConfig.ts`, escenas `S01`–`S18`, y no hay ningún mecanismo de render de estado aislado.

**C-02 → BLOQUEANTE. Ver §7.**

---

## 4. AUTORIDAD C — `Figma-app` (PREFlight + estructura)

| Campo | Valor | Evidencia |
|---|---|---|
| Ruta | `C:\Users\thega\Desktop\Figma-app` | — |
| Git | **NO es repo git** (sin `.git`) | `Test-Path .git` = False |
| Gestor de paquetes | **pnpm** — único lockfile `pnpm-lock.yaml` (31.191 B) | `.mise.toml`: `node = "22"`, `"npm:pnpm" = "10.34.3"` |
| Framework | **React 19 + Vite 8 + TypeScript 5.7 + Tailwind 4** + `lucide-react ^1.31.0` | `package.json` |
| Nombre paquete | `figma-make-app` (igual que la presentación) | `package.json` |
| Dev command | `vite --host 0.0.0.0` | `package.json:6` |
| Build | `vite build` | `package.json:7` |
| Puerto dev | **8443** (`strictPort: true`, `host 0.0.0.0`) | `vite.config.ts:34-35` |
| Entrypoint | `index.html:19-20` → `src/main.tsx` → `src/App.tsx:971` (`export default function App()`) | — |
| Playwright | `@playwright/test ^1.63.0` (devDep, **presente en node_modules**) + `playwright.config.mjs` con 3 proyectos: `desktop-presentation` (1440×1000), `mobile-product` (390×844), `onboarding-first-run` (390×844) | `playwright.config.mjs` |
| Docs top-level | 24 ficheros `.md` (ver §3.2) | — |
| Tests | 29 `*.spec.ts` + helpers, 19 `qa-*.mjs`, **1.027 PNG** en `tests/shots/` | — |

### 4.1 Estructura de routing — SIN react-router, SIN URL routing

Mecanismo propio de tres capas:

| Capa | Fichero:línea | Rol |
|---|---|---|
| Estado | `src/context.tsx:99` `AppProvider` | `stacks: Record<Tab, NavItem[]>` por tab, más `overlay`, `sheet`, `financeSheetStack`. Operaciones: `push:180`, `pop:203`, `popToRoot:213`, `switchTab:222`, `openOverlay:235`, `openSheet:248`, `openFinanceSheet:142` |
| Tipos | `src/types.ts:1` `Tab = "home"\|"familia"\|"calendario"\|"mas"`; `:3` `Phase`; `:5` `NavItem {screen, params}` | — |
| Registro de screens | `src/App.tsx:325` `renderScreen(nav)` | Cadena de `if (screen === "…")` con **43 IDs de pantalla**. `resolveScreen:314`, `ScreenRouter:310`, `ScreenSwap:225` |
| Overlays | `src/App.tsx:477` `renderOverlay(name)` | `search\|signals\|account\|geni\|sos\|household-selector` |
| Router Planner | `src/planner/PlannerRoot.tsx:213` `ScreenFor({view, params})` | `switch` sobre `nav[]` del store |
| Router Quick Actions | `src/quickactions/QuickActionsFlow.tsx:140` | `switch (current.k)` |
| Gates de fase | `src/App.tsx:727` `Root()` | `restoring → onboarding/auth → app` |

**Parámetros de URL leídos (NO son routing):** `?recovery=`, `?home-lab=`, `?qa=`, `?fin=`, `?fin-ux03..06=`, `?fin-open=`, `?fin-scope=`, `?fin-tab=`, `?fin-cur=`, `?fin-period=`.

**Implicación para auditoría:** el Figma-app **no es deep-linkeable por estado**. Cualquier captura de runtime de una pantalla concreta del Figma-app requiere navegar por la máquina de Context, no por URL. Relevante para Session 6.

### 4.2 Design tokens (Figma-app)

| Fichero | Contenido |
|---|---|
| `src/index.css:5-149` (`@theme`) | `--font-sans`, `--font-display`; `--color-brand*`, `--color-canvas*`, `--color-surface*`, `--color-ink*`, `--color-success/warning/danger/info/critical`, `--color-border*`, `--color-scrim`; `--radius-xs\|sm\|md\|button\|lg\|xl\|2xl\|full`; `--shadow-1..3`; `--motion-*`, `--ease-*`. **SIN escala de spacing `--space-*`.** |
| `src/home/tokens.ts` | `HOME_T:24`, `HOME_SPACE:207`, `HOME_ALIGN:318`, `HOME_GEO:347`, `HOME_ORIENTATION:441`, `tone*:66-164` |
| `src/finance/tokens.ts` | `FINANCE_ROW_MIN_HEIGHT 52`, `FINANCE_HIT_TARGET 44`, `financeSpacing`, `FINANCE_TAB_BOTTOM_INSET 96` |
| `src/homecloud/components.tsx:26-44` | `INK…INK4, BRAND, BRAND_PRESSED, BRAND_SOFT, CANVAS, SURFACE…` |
| `src/assets/ui.tsx:1207` | `A = {canvas, surface, raised, ink, ink2, ink3, brand, brandInk, …}` |
| `src/planner/components.tsx:50` | `P = {…}` |
| `src/motion.ts` | `MOTION:49`, `MUTATION_TIMING:94`, `CANONICAL:136`, `MOTION_EASE:143`, `EXIT:157`, `TRANSFER:179`, `NAV:202`, `CLOCK:221` |
| `src/components/FloatingNavigationBar.tsx:48,58` | `METRICS {barHeight 68, barPadX 4, activeSize 52, activeOffset 4, fabSize 56, itemMinHeight 44, hitTarget 44}` |
| `src/onboarding-v3/foundation/tokens.css:14-89` | `--obv3-*` con spacing `--obv3-s1..s20` |

**Observación:** tokens por módulo (`home/`, `finance/`, `planner/`, `assets/`, `homecloud/`) + un `@theme` global sin escala de spacing. Para Sessions 3 y 6 hay que determinar si esto es sistema o fragmentación.

### 4.3 Device frame — DATOS DUROS

**No existe `DeviceFrame`, `PhoneShell`, `AppScaffold`, `DeviceShell`, `AppFrame` ni `MockupFrame`.**
Único frame: función local `PhoneFrame` en `src/App.tsx:794-969` (**no exportada**).

Geometría exacta (rama desktop):

```
App.tsx:807   width: 390,
App.tsx:808   height: 844,
App.tsx:809   background: var(--color-canvas),
App.tsx:810   borderRadius: 48,
App.tsx:811   border: "10px solid #1A1714",
App.tsx:812   boxShadow: "0 40px 80px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(255,255,255,0.1)",
App.tsx:814   overflow: "hidden",
App.tsx:821   status bar: "flex items-center justify-between px-8 pt-4 pb-2", fontSize 13, fontWeight 600
App.tsx:824   "9:41"
App.tsx:828   width: 120,        ← notch/pill
App.tsx:829   height: 32,        ← notch/pill
App.tsx:830   background: #1A1714,
App.tsx:831   borderRadius: 20,
App.tsx:833   left: "50%",
App.tsx:834   transform: "translateX(-50%)",
App.tsx:835   top: 8,
App.tsx:932   app content: height "calc(100% - 50px)", overflow hidden
App.tsx:959   rama mobile: w-full h-full
```

**Dynamic Island: NO EXISTE por nombre.**
Búsqueda de `Dynamic Island|dynamicIsland|island|notch` en `src/**/*.{ts,tsx,css,md}`, `index.html`, `tests/**` → **0 coincidencias**.
Lo que hay es un **elemento tipo pill/blackout de 120×32, radius 20, centrado, top 8, `#1A1714`, sin nombre ni comentario**. Geométricamente equivalente a un Dynamic Island, pero **no identificado como tal en el código**.

Segundo juego de constantes, solo onboarding-v3 (`src/onboarding-v3/shell/Canvas.tsx`):
```
Canvas.tsx:17   master 390×844 · QA 360×800 · stress 320×720
Canvas.tsx:43-50 FALLBACK = { width: 390, height: 844, inset: 32, inputWidth: 326, … }
Canvas.tsx:60-92 metricsForWidth(width): >=390 → inset 32/input 326 ; >=360 → inset 24/input 312 ; else → inset 18/input 284
```

Constantes de shell (`src/components/Shell.tsx`):
```
:21 TOPBAR_HIT = 44      :25 TOPBAR_EDGE = 16     :37 SHELL_HEADER_HEIGHT = 72
:23 TOPBAR_CLUSTER_GAP = 8   :50 TOPBAR_CENTER_OFFSET = 26
```

**Viewport fitting:** NO hay `transform: scale()` de layout raíz. `useIsDesktopFrame()` (`App.tsx:773`) usa `matchMedia("(min-width: 768px)")` para decidir frame fijo 390×844 vs 100%. `Canvas.tsx:102-118` usa `ResizeObserver` para publicar métricas, sin escalado.

**Lectura para §7 del contrato:** el Figma-app **no tiene** un "logical viewport de presentación" con scale model. Es un frame fijo de 390×844 px CSS. La "presentation device más grande + camera/crop" que pide el contrato **no está implementado en el Figma-app**; hay que construirlo o tomarlo de otra fuente.

---

## 5. AUTORIDAD D — INTEGRATION (preflight + estructura)

| Campo | Valor | Evidencia |
|---|---|---|
| Ruta | `C:\Users\thega\Desktop\homeplus-worktrees\Family-Hub-Own-integration` | — |
| Git | **SÍ es repo git** (worktree) | `.git` presente |
| Branch | **`gps-ux-recovery`** | `git rev-parse --abbrev-ref HEAD` |
| HEAD | **`20c5a340253ca0d88643be4c0fb9cbf190a4d4ed`** | — |
| Últimos commits | `20c5a34 checkpoint: integrated HomePlus frontend state` · `b4513b7 chore: refresh backend lockfile after dependency install` · `c3b26dc integrate: HomeCloud snapshot without contaminated history` | — |
| Dirty | **38 entradas: 9 borrados (` D`), 29 untracked (`??`), 0 modificados, 0 staged** | `git status --short` |
| Worktrees registrados | esta ruta + `C:/hcf`, `C:/hp/integration-runtime`, `homeplus-worktrees/homecloud-current`, `homeplus-worktrees/homecloud-files`, `homeplus-worktrees/planner-current`, `homeplus-worktrees/planner-migrations-final-sync` | `git worktree list` |
| Frontend root | **`front/mi-front-limpio/`** | — |
| Backend root | **`backend/`** | — |
| Framework FE | **Expo SDK 57 + React Native 0.86.3 + React 19.2.3 + TypeScript ~6.0.3** | `front/mi-front-limpio/package.json` |
| Navegación | `@react-navigation/native ^7.2.2` + `native-stack ^7.14.12` + `bottom-tabs ^7.16.2` | — |
| Supabase | `@supabase/supabase-js ^2.105.1` | — |
| Gestor de paquetes | **npm** — `package-lock.json` en raíz, `backend/` y `front/mi-front-limpio/`. **NO hay `yarn.lock` ni `pnpm-lock.yaml`.** | — |
| Entrypoint FE | `index.ts` → `registerRootComponent(App)`; importa `./services/presenceLocationSharing` antes de `App` | — |
| Root component | `App.tsx` (providers + `NavigationContainer` + `AppNavigator`) | — |
| Dev commands | `start: expo start` · `android: expo run:android` · `ios: expo run:ios` · `web: expo start --web` · `lint: expo lint --no-cache` | — |
| Puerto dev | **NO configurado en el repo.** `expo start` usa el puerto Metro por defecto. | — |
| `eas.json` | `build.development.developmentClient: true`, `distribution: internal` | — |

### 5.1 ¿Requiere backend? **SÍ. No hay modo offline/mock para el render principal.**

```
front/mi-front-limpio/.env  (4 líneas, VERSIONADO):
  EXPO_PUBLIC_API_URL=http://192.168.0.26:3001
  EXPO_PUBLIC_SUPABASE_URL=http://192.168.0.26:56221
  EXPO_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_ACJW...
  GOOGLE_MAPS_API_KEY=AIzaSy...
```
- `services/api.ts:5` lee `process.env.EXPO_PUBLIC_API_URL`; en web reescribe hostname a `localhost` (`api.ts:14-19`).
- `supabase/index.ts:14-24` **lanza excepción** si falta `EXPO_PUBLIC_SUPABASE_URL` o `..._ANON_KEY` → la app no arranca.
- `AppNavigator` bloquea en `AuthLoadingScreen` hasta tener sesión. `HomeTabNavigator.tsx:170-178` muestra `ActivityIndicator` mientras `HouseholdContext` carga.

### 5.2 ¿Requiere Supabase / servicios locales? **SÍ.**

- `backend/.env`: `SUPABASE_URL=http://127.0.0.1:56221`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `PORT=3001`, `SUPABASE_JWKS_URL`, `GOOGLE_MAPS_API_KEY`.
- `supabase/config.toml` + `supabase/migrations/` con **117 migraciones .sql** (primera `202606210001_auth_base.sql`, última `20260918000001_planner_preset_templates_capability.sql`).
- **NO hay `docker-compose.yml`.** Stack Supabase local esperado en el puerto **56221**; API en **3001**.
- Backend monta (`backend/index.js:79-95`): `/api/auth`, `/api/invite-links`, `/api/households`, `/api/invitations`, `/api/users`, `/api/people`, `/api/feature-flags`, `/api/planner` (+ `/v1/plans`), `/api/inventory`, `/api/finance`, `/api/presence`, `/api/homecloud`, `/health`.
- **Feature flags con default = `{}` (todo false)** (`featureFlagStore.ts:11`). Ej. `planner.search_entry` deshabilitado por defecto → el ícono de búsqueda del Planner está oculto. `GLOBAL_SURFACE_GATES_OFF` (`globalSurfaceTypes.ts:140-148`): `trash` y `archive` globales `enabled: false`.

### 5.3 ¿Requiere emulador? **SÍ — no es Expo Go.**

- `expo-dev-client ~57.0.18` en dependencias. `eas.json.build.development.developmentClient = true`.
- `react-native-maps 1.27.2` + `expo-location ~57.0.16` con permisos background iOS/Android (`app.json:42-51`) exigen build nativo o dev-client.
- En web el mapa se degrada: `PresenceScreen.tsx:491-494` → `EmptyState title="GPS disponible en mobile"`.
- `android/` con proyecto nativo completo (`gradlew`, `.gradle/`, `build/`, `app/`).
- `app.config.js:12-14` inyecta `GOOGLE_MAPS_API_KEY` en `android.config.googleMaps`.
- **No hay `babel.config.js` ni `metro.config.js`** en el frontend.

### 5.4 Estructura de navegación (Integration)

| Registro | Fichero |
|---|---|
| Tipos de rutas | `navigation/types.ts` (`AuthStackParamList`, `PrivateStackParamList`, `HomeTabParamList`, `MoreStackParamList`, `PlannerStackParamList`, `RootStackParamList`) |
| Stacks + deep-linking | `navigation/AppNavigator.tsx` (`LinkingOptions` líneas 26-59) |
| Resolver de shell | `navigation/ExperienceResolver.tsx` (decide `SimpleShell` vs `StandardShell`) |
| Registro real de pantallas | `navigation/HomeTabNavigator.tsx` |
| Contrato de nombres Planner | `navigation/plannerNavigationContract.ts` (`ROUTE_NAMES`, `PLANNER_TAB_KEYS`, `ENTITY_DETAIL_ROUTES`, `LEGACY_ROUTE_NAMES`) |
| Modo Simple (2º shell) | `navigation/SimpleNavigator.tsx` + `simpleModuleRegistry.ts` + `screens/simple/` |

**Bottom tabs** (`HomeTabNavigator.tsx:161-167`): `HomeTab` "Inicio" · `FamilyTab` "Familia" · `QuickActionTab` "Acciones rápidas" · `PlannerTab` "Calendario" · `MoreTab` "Más".

**PlannerStack: 28 rutas.** `PlannerHome`, `CreateTask`, `EditTask`, `CreateEvent`, `EditEvent`, `CreateGoal`, `EditGoal`, `GoalDetail`, `EditPlan`, `PlanList`, `PlanDetail`, `PlannerTrash`, `PlannerPresetLibrary/Detail/Create/Edit`, `PlannerDraftRecovery`, `PlannerDraftResume`, `PlannerPresetDraftsTrash`, `PlannerSearch`, `PlannerAttentionActivity`, `TaskDetail`, `EventDetail`, `Responsibilities`, `ResponsibilityCreate`, `ResponsibilityEdit`, `ResponsibilityDetail`, `CreatePlan`.

**MoreStack: 12 rutas.** `MoreHome`, `Family`, `HomeCloudFiles`, `Inventory`, `Finance`, `FinanceAccounts`, `FinancePapelera`, `FinancePoolManagement`, `FinanceSpendingLimitsManagement`, `FinanceCategoryManagement`, `FinanceAnalysisDetail`, `Presence`.

**PrivateStack:** `ExperienceShell`, `HomeTabs`, `P02CrearGrupo`, `P03InvitarPersonas`, `JoinHousehold`, `PendingApprovalFallback`, `HouseholdSelectionFallback`, `AccessSuspendedFallback`, `ProfileScreen`, `FeedFamiliar`, `HomeCloudFileIntakeDev` (**solo `__DEV__`**).

**Deep-link paths** (`App.tsx:26-59`): `''`, `login`, `registro`, `forgot-password`, `auth/callback`, `crear-group`, `invitar/:householdId`, `home/planner`, `home/planner/tasks/:entityId`, `home/planner/events/:entityId`, `home/planner/goals/:entityId`, `home/planner/search`, `join`.

---

## 6. AUTORIDAD E — PRESENTACIÓN ACTUAL (preflight)

| Campo | Valor | Evidencia |
|---|---|---|
| Ruta | `C:\Users\thega\Desktop\HomeplusPresentacion01\HomePlus_Presentacion_FINAL\HomePlus_Presentacion_FINAL` | — |
| Git | **NO es repo git** (sin `.git`; sólo `.gitignore` + `.gitattributes`) | `Test-Path .git` = False |
| Branch / HEAD / dirty | **N/A — no aplica.** §24 del contrato pide `git status --short`; **es imposible ejecutarlo aquí.** Ver §9. | — |
| Nombre paquete | `figma-make-app` (**idéntico a Figma-app**) | `package.json` |
| Package manager | **AMBIGUO — dos lockfiles**: `pnpm-lock.yaml` (29.455 B) **y** `package-lock.json` (55.529 B, modificado 30 s después). `.mise.toml` declara `npm:pnpm = 10.34.3`. `ABRIR_PRESENTACION.bat` invoca `npx --yes pnpm@10.34.3`. | — |
| Framework | **React 19 + Vite 8 + TypeScript 5.7 + Tailwind 4** (plugin `@tailwindcss/vite`) | `package.json`, `vite.config.ts` |
| Dev command | `vite` (expuesto como `pnpm dev` por el `.bat`) | `package.json:6` |
| Build command | `vite build` | `package.json:7` |
| Puerto dev | **8443** (`strictPort: true`, `host 0.0.0.0`) — **colisiona con Figma-app** | `vite.config.ts:33-35` |
| Entrypoint | `index.html` → `src/main.tsx:20` → `src/App.tsx:2` → `src/presentation/Presentation.tsx` | — |
| **Canvas lógico** | **1280 × 720** (safeArea 48) | `src/presentation/design-system/tokens.ts:2` `canvas: { width: 1280, height: 720, safeArea: 48 }` |
| **Phone geometry** | **300 × 620**, bezel 8, radius 46, screenRadius 38, body `#141210`, edge `#35302B` | `tokens.ts:19-27` |
| **Dynamic Island** | **NO EXISTE.** Ningún token, ninguna constante, ningún elemento. |(tokens sólo: width, height, bezel, radius, screenRadius, body, edge, shadow) |
| Engine de estado | `useReducer` en `Presentation.tsx:9-11` + reducer puro en `navigation.ts:6-21` | — |
| Estado | `{ slideIndex: number; stepIndex: number }` — **sin persistencia, sin URL, sin hash** | `presentationTypes.ts:13` |
| Scene registry | `presentationConfig.ts:24-45` — array `slides` con `{id, name, stepCount, component}` | — |
| Navegación | **Sólo teclado.** `ArrowRight`/`Space`/`code==='Space'` → `NEXT`; `ArrowLeft` → `PREVIOUS`. `Shift/Ctrl/Alt/Meta` ignorados; ignora eventos si el target es `input, textarea, select, button, a[href], [contenteditable], [role="textbox"]`. **NO hay click-to-advance.** | `navigation.ts:23-30`, `Presentation.tsx:19-27` |
| Direct state jump | **NO EXISTE.** `?dev=1` sólo muestra un `<output>` con `slideIndex / stepIndex / id / name` — no permite saltar. | `Presentation.tsx:18`, `:40-45` |
| Escala | `PresentationFrame.tsx:9-19` → `scale = min(width/1280, height/720)`, aplicado como `translate(-50%,-50%) scale(s)`; `ResizeObserver` en el viewport | — |
| Colores | bg `#0B0908`, blackout `#000000`, text `#F5F1EB`, textSecondary `#A49B94`, accent `#E65C1B`; app bg `#F6F5F2`, surface `#FFFFFF`, app text `#1A1816`, app accent `#C96B45` | `tokens.ts:4-14` |
| Tipografía | `Inter, "Segoe UI", Arial, sans-serif` / mono `"Cascadia Code", Consolas, monospace` | `tokens.ts:16-17` |
| Motion tokens | easing `cubic-bezier(.2,.8,.2,1)`; duraciones fast 220 / standard 320 / emphasis 420 / spatial 500; enterDistance 12 | `motion/motionTokens.ts:2-6` |
| Primitivas de motion | `ENTER`, `EXIT`, `REPLACE`, `ACCUMULATE`, `REFRAME`, `SPATIAL_WIPE`, `BLACKOUT` | `motionTokens.ts:8-16` |
| Total de pasos | **85** | Suma de `stepCount` = 11+7+1+6+4+6+2+5+5+5+3+3+4+5+5+5+4+4 |

### 6.1 CONFLICTO C-02 en detalle — dos arquitecturas de presentación

| Dimensión | **Presentación DECLARADA** (`HomePlus_Presentacion_FINAL`) | **`Presentacion_HomePlus_Final`** (no declarada) |
|---|---|---|
| Escenas | **S01 … S18** (18) | **A00 … J23** (10 escenas) |
| Estados | **85 pasos** | **148 estados** |
| Canvas lógico | **1280 × 720** | **1920 × 1080** (`presentationTokens.ts:canvasW/canvasH`) |
| `sceneRegistry` | **NO EXISTE** | `sceneRegistry.ts` — `SceneKey = 'A'\|…\|'J'`, `SCENE_TITLES`, `getSceneKey(stateId)` |
| `PresentationRoot` | **NO EXISTE** (`Presentation.tsx`) | `PresentationRoot.tsx` |
| `UISlot` | **NO EXISTE** | `components/UISlot.tsx` |
| `PresentationPhone` | `components/PhoneFrame.tsx` (otro nombre, otra API) | `components/PresentationPhone.tsx` |
| Slots de UI | **0** — la UI está hardcodeada en `app-screens/*` | **27 `ui-slots/UI_*.tsx`** que mapean 1:1 con las superficies de §14/§15 |
| Navegación | Sólo teclado | Teclado **+ click-to-advance** (`PresentationRoot.tsx:73-78`) |
| Overlay de estado | Sólo con `?dev=1` | `state-navigator` siempre visible (`PresentationRoot.tsx:88-96`) |
| Autobeats | No hay marca de autobeat | **9 estados marcados `autobeat=true`** |
| Git | No es repo | **Repo git**, branch `main`, HEAD `866e674 baseline: figma generated presentation scaffold`, 14 cambios sin commitear |
| Lienzo / team | — | `PresentationPhone.tsx`, `presentationState.ts`, `scenes/B_HomePlannerFamily/index.tsx`, `ui-slots/UI_FAMILY_MAP.tsx`, `UI_FAMILY_PEOPLE.tsx`, `UI_FEED.tsx`, `UI_HOME_JULI.tsx`, `UI_PLANNER_CALENDAR.tsx`, `UI_PLANNER_TASKS.tsx`, `tsconfig.json` modificados; `app-ui/`, `FocusWrapper.tsx`, `sceneBData.ts`, `UI_PLANNER_PLANS.tsx` untracked |
| Coincide con contrato §16 (Scene A–J)? | **NO** | **SÍ** |
| Coincide con contrato §19 (1920×1080)? | **NO** | **SÍ** |
| Coincide con master V2.0? | **NO** | **SÍ** |

**Esta es la razón por la que NO se puede iniciar Session 1 sin decisión del usuario.**

---

## 7. INVENTARIO DE ESCENAS — PRESENTACIÓN DECLARADA (S01–S18)

> Registro factual. **Sin crítica de calidad** (contrato §16).

| # | ID | Nombre | Path | `stepCount` | Rango de estado | Sustantiva | Placeholder | Incompleta | Infraestructura compartida |
|---|---|---|---|---|---|---|---|---|---|
| 1 | S01 | Chaos | `src/presentation/slides/S01Chaos/index.tsx` | 11 | idx0 s0-10 | Sí | No | No | `OpeningSequence`, `AmbientGlow`, `opening.css`, `openingTokens` |
| 2 | S02 | Fragmented Info | `slides/S02FragmentedInfo/index.tsx` | 7 | idx1 s0-6 | Sí | No | No | `OpeningSequence` (fase `converging`), `opening-blackout` |
| 3 | S03 | HomePlus | `slides/S03HomePlus/index.tsx` | 1 | idx2 s0 | Sí (logo + `<h1>HomePlus</h1>`) | **Casi** — 0,45 KB, sólo logo + wordmark | No | `HomePlusLogo`, `opening-blackout` |
| 4 | S04 | Home | `slides/S04Home/index.tsx` | 6 | idx3 s0-5 | **CÓDIGO HUERFANO** | — | — | Ver nota ⚠ |
| 5 | S05 | Planner | `slides/S05Planner/index.tsx` | 4 | idx4 s0-3 | Sí (delega) | No | No | `PlannerDemoScreen`, `HomePlannerSequence` |
| 6 | S06 | Family | `slides/S06Family/index.tsx` + `FamilyMapStage.tsx` | 6 | idx5 s0-5 | Sí (delega) | No | No | `FamilyDemoScreen`, `FamilyMapStage`, `mapSlotRef` |
| 7 | S07 | Coordinar No Es Vigilar | `slides/S07CoordinarNoEsVigilar/index.tsx` | 2 | idx6 s0-1 | Sí (statement) | No | No | `s07-silence.css` |
| 8 | S08 | Plans Inventory | `slides/S08PlansInventory/index.tsx` | 5 | idx7 s0-4 | Sí | No | No | `s08-scene.css` |
| 9 | S09 | Finance | `slides/S09Finance/index.tsx` | 5 | idx8 s0-4 | Sí | No | No | `FinanceDemoScreen` |
| 10 | S10 | Assets HomeCloud | `slides/S10AssetsHomeCloud/index.tsx` | 5 | idx9 s0-4 | Sí | No | No | `AssetsDemoScreen`, `HomeCloudDemoScreen` |
| 11 | S11 | Continuity | `slides/S11Continuity/index.tsx` | 3 | idx10 s0-2 | **Débil** — 0,57 KB, sólo dos `<p>` | No | **Probable** | `s11-bridge.css` |
| 12 | S12 | Frontend Backend | `slides/S12FrontendBackend/index.tsx` | 3 | idx11 s0-2 | Sí | No | No | `s12-layers.css` |
| 13 | S13 | Stack | `slides/S13Stack/index.tsx` | 4 | idx12 s0-3 | Sí | No | No | `s13-stack.css`, `assets/tech/*.svg` |
| 14 | S14 | Barrier | `slides/S14Barrier/index.tsx` | 5 | idx13 s0-4 | Sí | No | No | `s14-barrier.css` |
| 15 | S15 | HOMI Action | `slides/S15HomiAction/index.tsx` | 5 | idx14 s0-4 | Sí | No | No | `HomiDemoScreen`, `s15-homi.css` |
| 16 | S16 | HOMI Context | `slides/S16HomiContext/index.tsx` | 5 | idx15 s0-4 | Sí | No | No | `HomiContextDemoScreen`, `s16-homi.css` |
| 17 | S17 | Human Control | `slides/S17HumanControl/index.tsx` | 4 | idx16 s0-3 | Sí | No | No | `HomiDecisionDemoScreen`, `s17-homi.css` |
| 18 | S18 | Closing | `slides/S18Closing/index.tsx` | 4 | idx17 s0-3 | Sí | No | No | `HomePlusLogo`, `s18-closing.css` |

### ⚠ OBS-01 — S04Home es código muerto

`Presentation.tsx:31-40` enruta **todos** los slides con `slideIndex <= 6` por `<OpeningSequence>` + `<HomePlannerSequence>` + `<S07CoordinarNoEsVigilar>`. El componente `S04Home` registrado en `presentationConfig.ts:29` **nunca se renderiza**, porque `HomePlannerSequence.tsx:29-31` construye su propia capa Home con `HomeDemoScreen` directamente, replicando la misma lógica de props:

```
S04Home/index.tsx:14-24          HomePlannerSequence.tsx:29-31
showJuli={stepIndex >= 1}        showJuli={homeStep >= 1}
educationPhysical={stepIndex>=2} educationPhysical={homeStep >= 2}
authorization={stepIndex >= 3}   authorization={homeStep >= 3}
schoolTask={stepIndex >= 4}      schoolTask={homeStep >= 4}
complete={stepIndex === 5}       complete={homeStep === 5}
```

**OBSERVATION ONLY.** No se corrigió. Requiere decisión: ¿cuál es la implementación canónica?

### OBS-02 — Reparto de responsabilidad de render por slide

| Slide idx | Componente que realmente renderiza |
|---|---|
| 0 (S01) | `OpeningSequence` → `S01Chaos` |
| 1 (S02) | `OpeningSequence` → `S02FragmentedInfo` |
| 2 (S03) | `OpeningSequence` → `S03HomePlus` + `opening-blackout` |
| 3 (S04) | `HomePlannerSequence` → `HomeDemoScreen` (**no** `S04Home`) |
| 4 (S05) | `HomePlannerSequence` → `S05Planner` → `PlannerDemoScreen` |
| 5 (S06) | `HomePlannerSequence` → `S06Family` → `FamilyDemoScreen` + `FamilyMapStage` |
| 6 (S07) | `S07CoordinarNoEsVigilar` (directo) |
| 7–17 (S08–S18) | `Slide` del registry (`presentationConfig.ts`) |

Consecuencia: la跨界 (cross-scene) boundary está en `slideIndex <= 6`. La `<section>` usa `key={state.slideIndex <= 6 ? 'intro-product' : slide.id}` (`Presentation.tsx:33`) — es decir, **S01–S07 comparten una única instancia de nodo React y NO se re-montan al cambiar de slide**; S08–S18 sí se re-montan. Esto es intentional (persistencia de capas) pero es exactamente el mecanismo que hay que auditar contra los modelos de persistencia `ACCUMULATIVE / EXCLUSIVE / SELECTIVE CONTINUITY` del master.

### OBS-03 — Montajes multi-capa

| Componente | Capas montadas a la vez | Nota |
|---|---|---|
| `OpeningSequence.tsx:19-38` | `S01Chaos` + `S02FragmentedInfo` + `opening-blackout` + `S03HomePlus` + **3 `AmbientGlow`** | Todas montadas simultáneamente; se controlan por `active`/`phase`/`data-active`. Comentario L17: *"These layers stay mounted across S01–S03: leaving elements can finish moving while the next idea appears."* |
| `HomePlannerSequence.tsx:28-48` | `product-home-layer` + `product-planner-layer` + `product-family-layer` + `FamilyMapStage` + `AmbientGlow` | Las tres capas de producto montadas siempre; `data-present` controla visibilidad. Comentario L14: *"keep completed tasks completed when entering Planner."* |
| `PhoneFrame` | 1 `phone-frame-slot` → `phone-frame` → `phone-frame-screen` | **Un solo teléfono físico compartido Home→Planner→Family** (movimiento de cámara sobre interfaz estable) |

---

## 8. INVENTARIO DE ESCENAS — `Presentacion_HomePlus_Final` (A–J, NO declarada)

> Se registra porque es el único candidato que satisface el contrato §16/§19. **No es autoridad hasta que el usuario lo confirme.**

| Escena | Path | Estados | Sustantiva | Placeholder | Nota |
|---|---|---|---|---|---|
| **A** Opening | `scenes/A_Opening/index.tsx` (15,2 KB) | **28** (A00–A27) | Sí | No | La mayor. Cubre Caos → saturación → pregunta → reveal → PEPE. |
| **B** Home Planner Family | `scenes/B_HomePlannerFamily/index.tsx` (14,83 KB) | **28** (B00–B27) | Sí | No | 2ª mayor. |
| **C** Plans & Inventory | `scenes/C_PlansInventory/index.tsx` (**0,84 KB**) | **1** (C00) | **NO** | **SÍ — PLACEHOLDER** | Renderiza `PresentationPhone` con un único `<UISlot id="UI_INVENTORY" devMode={true}/>` y el `stateId` como texto de debug a 11px/20% opacidad. |
| **D** Finance | `scenes/D_Finance/index.tsx` (**0,85 KB**) | **1** (D00) | **NO** | **SÍ — PLACEHOLDER** | Ídem, con `UI_FINANCE_MOVEMENTS`. |
| **E** Assets & HomeCloud | `scenes/E_AssetsHomeCloud/index.tsx` (**0,84 KB**) | **1** (E00) | **NO** | **SÍ — PLACEHOLDER** | Ídem, con `UI_CLOUD_FILES`. |
| **F** Continuity | `scenes/F_Continuity/index.tsx` (9,42 KB) | **9** (F00–F08) | Sí | No | — |
| **G** Tech Stack | `scenes/G_TechStack/index.tsx` (8,74 KB) | **19** (G00–G18) | Sí | No | — |
| **H** Friction | `scenes/H_Friction/index.tsx` (5,94 KB) | **9** (H00–H08) | Sí | No | — |
| **I** Homi | `scenes/I_Homi/index.tsx` (10,23 KB) | **28** (I00–I27) | Sí | No | — |
| **J** Closing | `scenes/J_Closing/index.tsx` (13,38 KB) | **24** (J00–J23) | Sí | No | — |
| | | **148 total** | | **9 autobeat** | |

Los tres placeholders C/D/E son **idénticos salvo por el `id` del `UISlot`**. No tienen estado propio, no tienen `stepIndex`, no tienen choreography.

### 8.1 `ui-slots/` — mapeo 1:1 con §14 del contrato

`UI_ASSET_PS5` · `UI_CLOUD_ALBUM` · `UI_CLOUD_FILES` · `UI_CLOUD_MEDIA_INFO` · `UI_CLOUD_MEMORIES` · `UI_FAMILY_MAP` · `UI_FAMILY_PEOPLE` · `UI_FEED` · `UI_FINANCE_ANALYSIS` · `UI_FINANCE_CONTEXT` · `UI_FINANCE_MOVEMENTS` · `UI_FINANCE_NEW` · `UI_FINANCE_PAYMENTS` · `UI_FINANCE_SUMMARY` · `UI_HOME_BASE` · `UI_HOME_JULI` · `UI_HOMI_BASE` · `UI_HOMI_PROPOSAL` · `UI_HOMI_RESPONSE` · `UI_INVENTORY` · `UI_LOCATION_CONTROL` · `UI_PLANNER_CALENDAR` · `UI_PLANNER_PLAN` · `UI_PLANNER_PLANS` · `UI_PLANNER_TASKS` · `UI_SHOPPING_LIST`

Nótese la ausencia de `UI_INVENTORY_PLACES`, `UI_FINANCE_ACCOUNT_PICKER`, `UI_ASSET_DOCS` —JX. Relevante para §14.

---

## 9. VERIFICACIÓN DE INTEGRIDAD — SESSION 0

### 9.1 `git status --short` (§24)

**Ejecutado en Integration** (`gps-ux-recovery`): 38 entradas, **todas preexistentes a Session 0** (9 ` D` + 29 `??`). Ninguna tocada. No se ejecutó ningún comando git mutante.

**No ejecutable en Presentación ni Figma-app**: ninguna de las dos rutas tiene `.git`. `LEEME.txt` lo confirma: *"No se incluyen node_modules, historial .git, referencias internas ni capturas de QA para mantener el archivo liviano."*

### 9.2 Manifiesto de archivos — sustituto de control de cambios

Como no hay git en la presentación, se generó un manifiesto de 195 archivos (path relativo + tamaño + timestamp UTC) **antes** de escribir nada:

```
C:\Users\thega\AppData\Local\Temp\opencode\pres_manifest_before.txt
```
Excluye `node_modules/`, `dist/`, `.git/`. La comparación post-escritura está en §9.4.

### 9.3 Escrituras de Session 0

Únicamente 4 ficheros bajo `audit/`. Nada más. Ver §12 del informe final.

### 9.4 Resultado

Ver la sección "Files Written" del informe final de Session 0. `audit/` no existía antes de esta sesión y se creó como carpeta nueva.

---

## 10. CONFLICTOS REGISTRADOS (no resueltos)

| ID | Conflicto | Estado |
|---|---|---|
| **C-01** | `MASTER_FREEZE_V1.0` (23/09) vs `NO_UI_MASTER_FREEZE_V2.0` (22/09): V2.0 es más alto de versión pero más viejo; V1.0 se autodeclara "única fuente de verdad". | **ABIERTO — requiere decisión** |
| **C-02** | Arquitectura: presentación declarada (S01–S18 / 1280×720) vs `Presentacion_HomePlus_Final` (A00–J23 / 1920×1080). El contrato de campaña está escrito contra el segundo. | **ABIERTO — BLOQUEANTE para Session 1** |
| **C-03** | Nombre del asistente: guion dice "Geni" (bloque 9) y "Homi" (bloque 10); la presentación dice `HOMI`. | **ABIERTO — ver SI-01** |
| **C-04** | `SCENE_B_PRODUCTION_FREEZE_V1.0.md` no existe. No hay freeze de producción para la escena B. | **ABIERTO** |
| **C-05** | Puertos: presentación y Figma-app ambos `8443` con `strictPort: true`. No pueden coexistir. | **ABIERTO — plan de runtime** |
| **C-06** | Lockfiles duales en la presentación (`pnpm-lock.yaml` + `package-lock.json`). Package manager ambiguo. | **ABIERTO** |
| **C-07** | Versiones de tooling drifted: `.mise.toml` pide node 22 / pnpm 10.34.3; instalado es node **v24.13.0** / pnpm **11.24.0** / npm 11.6.2. | **OBSERVATION** |
| **C-08** | El Figma-app **no tiene Dynamic Island identificado** (pill 120×32 sin nombre) y **no tiene scale-to-fit**. El contrato §7 assume que "Figma-app already contains a polished phone/device structure" con Dynamic Island. Parcialmente falso. | **ABIERTO** |
| **C-09** | En Figma-app el surface **Feed fue retirado** (`types.ts:183-185`: *"Feed legacy (retirado por Family Conversation V2)… La surface Feed ya no existe"*), pero el guion (bloque 2) tiene un momento Feed dedicado ("El técnico viene entre las cuatro y las seis"). En Integration el Feed es un **STUB con mock local**. | **ABIERTO —clasificación de diferencia pendiente** |
| **C-10** | En Integration **no existe el dominio Assets** (0 tablas, 0 rutas, 0 seeds). El guion (bloque 5) tiene un momento Assets completo con "la Play". Figma-app sí lo tiene (`asset ps5`). | **ABIERTO —clasificación: PRODUCT DELTA** |
| **C-11** | En Integration **no existe Shopping List** (0 coincidencias salvo copy). El guion (bloque 3) dice "puede sumarse automáticamente a la lista de compras". Figma-app sí (`ShoppingPlanning`). | **ABIERTO — PRODUCT DELTA** |
| **C-12** | El master's gate temporal marca **WARNING CRÍTICO**: guion ≈1.670 palabras → 10:27 @160ppm / 11:09 @150ppm, más holds. Objetivo declarado 9:30 "no es seguro". | **ABIERTO — Session 7** |

---

## 11. INPUTS FALTANTES

| ID | Falta | Impacto |
|---|---|---|
| ~~**M-01**~~ | ~~`audit-input/USER_WALKTHROUGH_RAW.txt`~~ | ✅ **RESUELTO a las 2026-10-04 18:31:45**, durante Session 0. Ver §0.1 y §1.2. 89 hipótesis construidas. |
| **M-02** | `SCENE_B_PRODUCTION_FREEZE_V1.0.md` | **ABIERTO.** Sin freeze de producción de la escena B, la verificación de §12/§16 pierde su referente de escena. Agrava `HW-B-*`, la escena con más hipótesis (20). |
| **M-03** | `HOMEPLUS_PRESENTATION_MASTER_FREEZE_V1.0.md` completo leído | **ABIERTO.** Sólo se leyeron los primeros 70 líneas (de ~54 KB). **Las secciones 2+ (gramática visual §2.x, motion families, persistence models, scene logic) están sin leer.** Requerido antes de Sessions 2–7. Ya hay evidencia de que son decisivas: el walkthrough identifica una violación de la regla negro/naranja (`HW-A-009`). |
| **M-04** | `HOMEPLUS_PRESENTATION_NO_UI_MASTER_FREEZE_V2.0.md` completo | **ABIERTO.** Sólo 60 líneas leídas. Falta la especificación de escenas A–J. |
| **M-05** | Python + Playwright (ver `00_AUDIT_CONTRACT.md` §6.5) | **ABIERTO — requiere decisión `D-01`.** El skill `testing-webapps` exige Python. No hay Python instalado. Hay Node Playwright 1.63.0 con chromium cacheado. |
| **M-06** | Reproducibilidad de las pulsaciones del walkthrough | **ABIERTO.** El walkthrough cuenta pulsaciones en relativo ("al primer tap", "al próximo tap") sin índice absoluto, y no nombra IDs de estado. Para casar cada observación con un estado exacto hace falta el inventario de estados de Session 1. No bloquea Session 1; bloquea el mapeo preciso en Sessions 2–5. |

---

## 12. VERIFICACIÓN DE PRERREQUISITOS DE RUNTIME (READ-ONLY, no se levantó ningún servicio)

| Herramienta | Estado | Valor |
|---|---|---|
| Node | **OK** | `v24.13.0` |
| npm | **OK** | `11.6.2` |
| pnpm | **OK** | `11.24.0` |
| **Python** | **AUSENTE** | `python` y `python3` → "no se encontró Python; ejecutar sin argumentos para instalar desde el Microsoft Store" |
| Playwright (Python) | **AUSENTE** | módulo no importable |
| venv opencode | **AUSENTE** | `Test-Path ~\.local\opencode-venv` = False |
| **Playwright (Node)** | **OK** | `playwright-core@1.63.0` global; `@playwright/test@^1.63.0` en `Figma-app/node_modules` |
| Browsers Playwright | **OK (cacheados)** | `%LOCALAPPDATA%\ms-playwright`: `chromium-1208`, `chromium-1243`, `chromium_headless_shell-1208`, `chromium_headless_shell-1243`, `firefox-1509`, `webkit-2248`, `ffmpeg-1011`, `winldd-1007` |
| Puerto 8443 libre | **NO VERIFICADO** | `strictPort: true` tanto en presentación como en Figma-app → si uno está corriendo, el otro falla. Verificar antes de Session 1. |
| Integration: Supabase local | **NO VERIFICADO** | Requeriría stack en 56221. No se levantó. |
| Integration: Metro | **NO VERIFICADO** | Requeriría dev-client/emulador para native. No se levantó. |

**No se levantó ningún servicio pesado** (contrato §13). No se instaló ningún paquete.
