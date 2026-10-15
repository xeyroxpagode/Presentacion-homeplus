# SESSION 6 — FIGMA ↔ INTEGRATION AUDIT

> ## > NORMALIZATION NOTICE
> >
> > **See `audit/00_AUDIT_NORMALIZATION.md` for later cross-session corrections.**
> > **Raw evidence remains preserved below.**
> >
> > This report is the **strongest authority work in the campaign** and almost all of it is **confirmed**. Every authority line cited here was re-opened and quoted verbatim in the Global Normalization pass. Below: what changed, what was confirmed, and the two places this report's own framing needed adjusting.
> >
> > ### The four P0s are now RESOLVED
> >
> > | P0 | This report asked | Canonical outcome |
> > |---|---|---|
> > | `P0-01` Shopping List | *"¿se reabre la decisión?"* — three incompatible positions | **`N-06` — CLOSED.** Frozen `HOMePLUS_INVENTORY_PRODUCT_FREEZE_V1.0` excludes it by name (`:802`, `:977`, `:2120`). **Not approved.** Figma = prototype only. ⛔ Not shown as a working capability; ✅ show `LOW/OUT → Restock Need → approval → Planner Task`. **Does not block Session 7.** |
> > | `P0-02` Feed | *"¿sigue siendo Feed o es Conversation?"* | **`N-36` — CLOSED.** `FEED_PRODUCT_FREEZE_V1.0:34` — *"funciona como autoridad standalone de Feed hasta que una decisión posterior y explícita lo reemplace."* **No such later decision exists.** ⇒ **Feed REMAINS approved Product Truth**; Figma = visual-target gap; Integration = implementation gap. Presentation may treat it **editorially** but ⛔ must not present Conversation as the real Feed route. **Does not block Session 7.** |
> > | `P0-03` Horarios | *"¿es capacidad?"* — designed and implemented, zero Product Truth | **`N-35` — CLOSED.** No `*HORARIO*_PRODUCT_FREEZE*` / `*SCHEDULE*_PRODUCT_FREEZE*` exists anywhere. **Code existence does not create Product Truth.** ⛔ No standalone Horarios surface; ✅ use Planner / Calendar / Event. **Does not block.** |
> > | `P0-04` Home by role | *"¿qué es 'materialmente diferente'?"* — nobody complies | **`N-34` — CLOSED for presentation purposes.** `HOMePLUS_HOME_PRODUCT_FREEZE_V1.0:961` materially different projections allowed · `:965` *"Role adaptation never creates separate Home modules or duplicated ownership."* ⇒ **ONE Home + a presentation-controlled role projection.** ⛔ No separate "Home Juli" module. **Does not block.** |
> >
> > ### ✅ Confirmed by this pass
> >
> > - **Assets authority (§2.3 `A-04`/`A-05`, §16, §20 `SC-05`)** — verified: `:5` `Estado: FROZEN - Product Target` · `:30` `READY_FOR_IMPLEMENTATION` · `:33` *"Una diferencia entre CURRENT y este documento es un **REAL GAP**"* · `:347`/`:349` Finance owns money and date, *"Assets nunca conserva una segunda verdad monetaria"* · `:886` `Assets-owned Maintenance Plan/Cycle → Planner-owned temporal work`. **Every line number cited here is correct.** Extended by **`N-13`** and **`N-37`**.
> > - **Shopping List exclusion (§14, §20 `SC-02`)** — `INVENTORY:802` *"No es una Shopping List."* · `:977` *"No es una entidad Shopping List independiente."* · `:2120` *"- duplicate Shopping List;"*. **All three cited lines verified verbatim.**
> > - **Milestones retired (§2.3 `A-03`)** — `PLANS_PRODUCT_TRUTH_V1:302-309`. Recorded as **`N-38`**, including the explicit note that this is the **one** place a file date legitimately contributes — because `:1075-1076` self-declares the supersession. Contrast **`N-16`**.
> > - **Presentation-master audio prohibition is stale (§2.3 `A-02`)** — `HOMECLOUD_PRODUCT_EXPERIENCE_FREEZE_V2:3` `FROZEN` · `:10` *"Cuando contradiga decisiones antiguas de V1/V1.3, V2 manda"* · `:316` `- Audio`. Recorded as **`N-29`**. ⚠ **One nuance this report did not carry, and it changes a finding:** `HC_V2:334` **`no fake waveform`** is an **active rule of the approving freeze itself**. Audio may be shown; a **fake waveform may not**. That is now the *whole* surviving reason for `E-06`, whose `"the master forbids it"` half is withdrawn.
> > - **Migration count (§3.2, §29 `P2-02`)** — verified twice this pass: filesystem **110**, git index **110**. Your correction is right; it is now closed as **`N-26`** and `00_SOURCE_MAP.md`'s `117` is marked a stale Session-0 fact.
> > - **Planner event times permit arbitrary values** — added as verified evidence for **`N-23`**: `202606210003_schedules.sql:14-17` (unconstrained `time`) · `202608100002:23` (`0..1439` minutes) · `ActionSheet.tsx:184-185` (0–23 h). **`19:00` is canon and is selectable. Do not change it to fit a prototype picker.**
> > - **§30.1 rule 4 — Finance is the only module presentable without caveat.** Adopted as a Session-7 safe rule.
> >
> > ### ⚠ Two adjustments to this report's own framing
> >
> > | Here | Adjustment |
> > |---|---|
> > | `§29 P1-06` — *"¿el mapa se muestra con pines en % literal?"* listed as an **OPEN** question | **`N-03` + `N-30`.** Not open, and never was. Figma's hardcoded pins are **illustrative positions, not measured geography**, and the presentation's authored CSS percentages are a **fabrication to remove** (`B-13`). Session 2 already ruled. |
> > | `§2.2` row 78 — `PLANNER_FIGMA_TOTAL_FREEZE_V1.md`, *"escrito por una sesión paralela después de mi captura"* | Recorded in **`N-45`** as an unchanged external fact. **It remains a VISUAL / DESIGN freeze, never Product Truth**, exactly as classified here. A design freeze written later does not outrank a product freeze written earlier. |
> >
> > ### Unchanged
> >
> > ⛔ **Session 7 was NOT started.** Nothing in this report was rewritten except the added notice and the two executive tallies in `04`/`05`. **No severity altered. No finding deleted.**
> >
> > **Companions:** `00_AUDIT_NORMALIZATION.md` · `00_CANONICAL_ISSUE_REGISTRY.md` · `00_CROSS_SESSION_CONFLICTS.md` · `00_SESSION7_GATE.md`

**Campaña:** HOMEPLUS FINAL PRESENTATION — AUDIT CAMPAIGN
**Sesión:** SESSION 6 — Figma-app ↔ Integration · VISUAL TARGET / PRODUCT TRUTH / FUNCTIONAL DELTA
**Modo:** READ-ONLY. Única escritura: `audit/**`.
**Fecha de captura runtime:** 2026-10-05
**Superficies capturadas:** 35 (todas B/C/D/E), 0 errores de consola
**Alcance excluido por contrato:** coreografía de presentación, timing, escalado de dispositivo.

---

## 0. MÉTODO Y LÍMITES DE ESTA SESIÓN

| Aspecto | Decisión |
|---|---|
| Modo | Read-only sobre presentación, Figma-app, Integration y documentos de producto. |
| Escrituras | Sólo `audit/06_FIGMA_VS_INTEGRATION.md` y `audit/runtime/session-06/**`. |
| Runtime Figma | Dev-server ya levantado en `http://127.0.0.1:8443` (proceso preexistente). **No se cerró ningún proceso ajeno.** Navegado por la máquina de Context real, no por URL. |
| Runtime Integration | **NO lanzado.** Análisis 100 % estático de fuente + migraciones. Todo estado funcional de Integration marcado como inferencia salvo indicación contraria. |
| Python | Ausente en la máquina (`00_SOURCE_MAP` §12, M-05). Se usó Playwright **Node** (`playwright-core@1.63.0` global) con scripts `.mjs` en `audit/runtime/session-06/_tooling/`. |
| Deep-linking | Figma-app no tiene deep-link general (`src/App.tsx:738-740` sólo lee `?recovery=`). Se navegó por Ctx. Los parámetros `?home-lab=`, `?qa=`, `?fin=`, `?fin-ux03..06=` existen pero son *fixtures de review*, no rutas de superficie. |
| Puertos | 8443/8444/8445/4173 ya estaban ocupados por sesiones paralelas. **No se arrancó ningún servidor nuevo.** |

**Limitación honesta:** ninguna afirmación sobre Integration en este documento es evidencia runtime. Donde una capacidad no se pudo verificar por fuente, se escribe literalmente `FUNCTIONAL STATUS NOT VERIFIED`.

---

## 1. EXECUTIVE VERDICT

**¿Puede Figma-app servir como target visual de presentación para B/C/D/E?** **SÍ, con una excepción dura y una advertencia de módulo.**

| Veredicto | Detalle |
|---|---|
| **Global** | Figma-app es un target visual **coherente y medible**: 390×844 fijo, un solo sistema de tokens, 1 familia tipográfica en 7 de 8 superficies medidas, cero errores de consola en 35 capturas. La gramática de filas, tarjetas, segmented controls, sheets y bottom-nav está resuelta y es reutilizable. |
| **Excepción dura — Shopping List** | La superficie `Lista de compras` de Figma-app **no es sólo "visualmente adelantada": contradice una exclusión explícita de Product Truth** y añade semántica de compra propia que no existe en ninguna autoridad. **NO debe presentarse como capacidad de producto.** Ver §14 y §20 (SC-07). |
| **Advertencia — Home** | La jerarquía de secciones de Figma Home coincide **exactamente** con `HOMePLUS_HOME_PRODUCT_FREEZE_V1.0.md` INV-HOME-004. Pero la adaptación por rol de Figma es **sólo de densidad**, mientras Product Truth exige *proyecciones materialmente distintas* y prohíbe módulos Home duplicados. Ver §8 y §20 (SC-01). |
| **Riesgo mayor de capacidad** | **E / Assets**: aprobado y congelado (`HOMePLUS_ASSETS_PRODUCT_FREEZE_V2.0`, FROZEN 2026-10-01) y **cero implementación** en Integration (0 rutas, 0 servicios, 0 tablas). Figma-app es aquí la implementación de referencia más fiel a Product Truth de todo el codebase. |
| **Segundo riesgo** | **E / HomeCloud Memories**: aprobado y congelado (`HOMECLOUD_PRODUCT_EXPERIENCE_FREEZE_V2`), con 4 tablas y 6 endpoints en backend pero **cero superficie de lectura** en el frontend. `caption` existe en DB y el cliente lo manda siempre `null`. |
| **Riesgo de superficie** | **B / Feed**: Product Truth congela un Feed plano social; Figma-app lo **retiró** (alias muerto → conversación familiar); Integration lo tiene como **stub en memoria sin persistencia**. Los tres lados están en posiciones distintas. Ver §11 y §20 (SC-06). |
| **Lo que SÍ está maduro** | **D / Finance**. Único módulo donde Figma, Product Truth e Integration convergen en modelo y en comportamiento observable. Único lugar donde se puede presentar como producto real sin matiz. |

**Respuesta corta:** usar Figma-app como target visual de B, C (salvo Shopping), D y E. **Excluir Shopping List del producto.** En Assets y Memories, marcar explícitamente como *product-approved / implementation-pending*. En Feed, no prometer la superficie Feed.

---

## 2. AUTORIDAD RESOLVIDA

### 2.1 Las tres autoridades y su orden

| Autoridad | Rol en esta sesión | Regla aplicada |
|---|---|---|
| **Figma-app** | TARGET VISUAL / UX | Composición, jerarquía, tipografía, densidad, anatomía de filas/tarjetas/sheets, tratamiento de navegación. Permitido estar visualmente adelantado. |
| **Product Truth / freezes** | TARGET DE PRODUCTO | Define capacidad aunque Integration no la implemente. `FIGMA ∧ PRODUCT_TRUTH ∧ ¬INTEGRATION` = **IMPLEMENTATION GAP**, nunca fake feature. |
| **Integration** | CURRENT FUNCIONAL | Evidencia de rutas, entidades, backend, persistencia y acciones reales. Su frontend **no** es target visual. |

### 2.2 Inventory de documentos y clasificación

| Documento | Fecha | Clasificación | Evidencia de autoridad |
|---|---|---|---|
| `HOMePLUS_ASSETS_PRODUCT_FREEZE_V2.0.md` | 2026-10-01 | **AUTHORITATIVE PRODUCT TRUTH** | `:3-6` `Estado: FROZEN — Product Target`; `:27-30` `LOGICALLY_CLOSED / PRODUCT_BEHAVIOR_COMPLETE / READY_FOR_IMPLEMENTATION`; `:33` `Este documento define TARGET`; `:874-901` §75 supersedes V1 |
| `HOMePLUS_HOME_PRODUCT_FREEZE_V1.0.md` | 2026-08-12 | **AUTHORITATIVE PRODUCT TRUTH** | `:3-6` `MODULE_PRODUCT_DEFINITION_CLOSED`; `:18` `congela la Product Truth V1.0 de Home` |
| `HOMePLUS_FINANCE_PRODUCT_FREEZE_V1.1.md` | 2026-08-12 | **AUTHORITATIVE PRODUCT TRUTH** | `:3-6` `MODULE_PRODUCT_AND_FRONTEND_DEFINITION_CLOSED`; `:9-19` `PRODUCT TRUTH FROZEN` |
| `HOMePLUS_INVENTORY_PRODUCT_FREEZE_V1.0.md` | 2026-08-12 | **AUTHORITATIVE PRODUCT TRUTH** | `:3-6`, `:11-16`, `:18` `congela la Product Truth V1.0 de Inventory` |
| `people_presence_product_freeze.md` | 2026-08-14 | **AUTHORITATIVE PRODUCT TRUTH** | `:2-8` `PEOPLE_PRESENCE_PRODUCT_DEFINITION_CLOSED`; `:10-21` bloques `FROZEN` |
| `FEED_PRODUCT_FREEZE_V1.0.md` | 2026-09-02 | **AUTHORITATIVE PRODUCT TRUTH** | `:3-9` `FROZEN ON KNOWN TRUTH / GAPS EXPLICITLY OPEN`; `:34` `autoridad standalone de Feed` |
| `MENSAJES_PRODUCT_FREEZE_V1.0.md` | 2026-08-20 | **AUTHORITATIVE PRODUCT TRUTH** (Mensajes) | `:3-7` `FROZEN`; citado como autoridad principal de Feed en `FEED_PRODUCT_FREEZE_V1.0.md:1266-1271` |
| `PLANS_PRODUCT_TRUTH_V1_AND_FIGMA_AUDIT.md` | 2026-10-01 | **AUTHORITATIVE PRODUCT TRUTH** | `:3-5` `PRODUCT DEFINITION CLOSED`; `:1075-1076` `los documentos históricos no sustituyen al Product Truth V1` |
| `HOMECLOUD_PRODUCT_EXPERIENCE_FREEZE_V2.md` | 2026-09-25 | **AUTHORITATIVE PRODUCT TRUTH** (HomeCloud) | `:3-4` `FROZEN`; `:10` `Cuando contradiga decisiones antiguas de V1/V1.3, V2 manda` |
| `HOMePLUS_PLANNER_PRODUCT_FREEZE_V1.0.md` | 2026-08-09 | SUPPORTING — **parcialmente superseded en §Plans** | `:4-11` `Product Truth`; su §09 Milestones removido por `PLANS_PRODUCT_TRUTH_V1:302-309` |
| `PLANS_TECHNICAL_TRUTH_V1.md` | 2026-10-03 | SUPPORTING (arquitectura) | `:3` `TECHNICAL DEFINITION CLOSED`; `:13-18` `Product Truth manda sobre comportamiento` |
| `HOMECLOUD_PRODUCT_FREEZE_V1.0.md` | 2026-08-20 | SUPPORTING — superseded por V2 | `:5-7`; supersedido según `:10` del V2 |
| `HOMECLOUD_FILES_HANDOFF.md` | 2026-10-03 | SUPPORTING (traspaso) | `:3` `Documento autoritativo de traspaso` |
| `HOMePLUS_HOUSEHOLD_PRODUCT_FREEZE_V1.0.md` | 2026-08-12 | SUPPORTING | `:3-6` |
| `HOMEPLUS_PRESENTATION_MASTER_FREEZE_V1.0.md` | 2026-09-23 | SUPPORTING — **staging, NO product truth** | `:6` `El código actual y los Product Freeze de cada módulo siguen siendo autoridad de producto cuando exista una contradicción` |
| `HOMEPLUS_PRESENTATION_NO_UI_MASTER_FREEZE_V2.0.md` | 2026-09-22 | SUPPORTING — **staging, NO product truth** | `:12-13` `El proyecto actual generado por Figma Make sirve como scaffold técnico, NO como Product/Visual Truth` |
| `HOMePLUS_FINANCE_PRODUCT_FREEZE_V1.0.md` | 2026-08-10 | LEGACY | Reemplazado por V1.1 |
| `FINANCE_FIGMA_1TO1_AUDIT.md`, `FINANCE_UX_*.md`, `TASKS_*.md`, `CALENDAR_UX_AUDIT.md`, `PLANS_FINAL_VISUAL_ATTENTION_AUDIT_V1.md`, `HOME_SURFACE_GRAMMAR_V1.md`, `HOMEPLUS_MOTION_SYSTEM_V1.md` (en `Figma-app/`) | 2026-09/10 | **VISUAL AUDIT** (Figma-app) | Auditorías de diseño, no de producto |
| `PLANNER_FIGMA_TOTAL_FREEZE_V1.md` (en `Figma-app/`, 633 KB) | **2026-10-05 01:52** | **VISUAL AUDIT / DESIGN FREEZE de Figma-app** | `:1-9` *"TARGET AUTHORITY. Documento de congelamiento total del Planner tal como está diseñado y construido hoy en `Figma-app`. **No es una auditoría crítica**, ni una propuesta de mejora, ni un documento de comparación con Planner App. Es el contrato de diseño que una implementación futura debe reproducir."* → **no es Product Truth**. Escrito por una sesión paralela **después** de mi captura. Ver §33.4 |
| `PLANS_FIGMA_AUDIT_V1.md`, `PLANS_RUNTIME_CURRENT_TO_TARGET_AUDIT_V1.md`, `PLANS_SOURCE_MAP_V1.md` (`Desktop\Documentos-de-planner-historicos\`) | 2026-10 | VISUAL AUDIT | carpeta `historicos` |
| `HomePlus - FinalSpec.md`, `FEED_FAMILIAR_PRIVADO.md`, `ALBUM_FAMILIAR_INTELIGENTE.md`, `DRIVE_FAMILIAR_VACACIONES.md`, `GESTOR_DOCUMENTOS_ALERTAS.md` | 2026-05 / 2026-07 | **LEGACY** | Sin estado/versionado; 2–3 meses anteriores a los freezes |
| `GEI_SYSTEM_PRODUCT_TRUTH_FREEZE_V1_0_1.md` | 2026-10-02 | **UNKNOWN — fuera de alcance** | `:1` `# GEI HOCKEY MANAGEMENT SYSTEM` |

**Ausente:** no existe ningún `*SHOPPING*_PRODUCT_FREEZE*` en `Downloads` ni `Desktop` (búsqueda por nombre recursiva + por contenido). Ver §2.3 A-01.

### 2.3 Conflictos de autoridad RESUELTOS en esta sesión

| # | Conflicto | Resolución |
|---|---|---|
| **A-01** | **Shopping List**: `HOMEPLUS_PRESENTATION_MASTER_FREEZE_V1.0.md:213,616,634` la presenta como cadena real; `HOMePLUS_INVENTORY_PRODUCT_FREEZE_V1.0.md:802,977,2120` la **excluye por nombre** (`No es una Shopping List` / `No es una entidad Shopping List independiente` / `duplicate Shopping List`). | **Product Truth gana** por `:6` del propio master de presentación. Shopping **no** es capacidad aprobada. El master de presentación está desactualizado en este punto. |
| **A-02** | **Audio/Voice note en Memories**: `HOMEPLUS_PRESENTATION_MASTER_FREEZE_V1.0.md:1608,1664` prohíbe audio como Recuerdo V1; `HOMECLOUD_PRODUCT_EXPERIENCE_FREEZE_V2.md:316-318,333-335` lo **aprueba** (2 días más nuevo y con cláusula de precedencia explícita `:10`). | **V2 de HomeCloud gana.** Audio/voz es capacidad aprobada. La prohibición del master de presentación está desactualizada. |
| **A-03** | **Milestone como entidad de Plan**: `HOMePLUS_PLANNER_PRODUCT_FREEZE_V1.0.md:306,1724-1726` lo congela; `PLANS_PRODUCT_TRUTH_V1:302-309,315` dice `Milestone deja de ser entidad de V1`. | **Plans Product Truth gana.** Milestone **no** debe presentarse como capacidad. |
| **A-04** | **Assets "abierto"**: `HOMEPLUS_PRESENTATION_MASTER_FREEZE_V1.0.md:722` dice `Assets todavía no tiene Product Freeze final`; `HOMePLUS_ASSETS_PRODUCT_FREEZE_V2.0.md:1-6` lo cierra FROZEN el 2026-10-01 (8 días posterior). | **V2.0 gana.** El OPEN está cerrado. |
| **A-05** | **Campos del PS5**: `HOMEPLUS_PRESENTATION_MASTER_FREEZE_V1.0.md:726-736` pide `Comprada: Mar 2024 / Garantía / Mantenimiento / Documentos: 3 archivos`; `HOMePLUS_ASSETS_PRODUCT_FREEZE_V2.0.md:347,372,841-843,886` asigna dinero y fecha a Finance, y `Maintenance` a Planner. | **Assets V2.0 gana.** Sólo `Garantía` (Asset Record tipo `WARRANTY`, `:266`) es campo propio de Assets. Figma-app **ya coincide con esto** (§16). |
| **A-06** | **Rol vs versión entre los dos presentation masters** (V2.0 es 1 día más viejo que V1.0). Ninguno declara relación. | **ABIERTO — irrelevante para esta sesión.** Ambos son subordinados a los Product Freeze de módulo y ninguno define capacidad. Se registra, no se resuelve. |

### 2.4 Reglas de los presentation masters que gobiernan esta auditoría

Citas textuales que acotan qué puede afirmar la presentación:

- `HOMEPLUS_PRESENTATION_MASTER_FREEZE_V1.0.md:113-124` — *"Si la navegación existe realmente en HomePlus, se representa como navegación real. Si la relación es conceptual o la integración no existe todavía, se usa una transición editorial evidente, nunca un tap falso."* Ejemplos editoriales **aprobados**: `Finance movement → Asset PlayStation`, `Assets Documents → HomeCloud Archivos mientras la integración cross-module no esté cerrada`, `Propuesta Homi → tarea entrando en un segundo teléfono`.
- `:34` — *"No se deben fingir navegaciones o features inexistentes."*
- `:237` — *"Relación navegable Assets ↔ HomeCloud | Hasta estar cerrada, usar transición editorial, no tap real."*
- `:1624,1631,1633` — tres preguntas de control: *¿la acción existe realmente? ¿una UI provisional está creando Product Truth nuevo? ¿un cambio de dispositivo editorial podría ser más honesto que simular una navegación inexistente?*
- `HOMEPLUS_PRESENTATION_NO_UI_MASTER_FREEZE_V2.0.md:329-330,336-342` — *"No inventar navegación para justificar un cambio de screen. Si las surfaces están lejos: DEVICE TRANSITION."* / `REAL_NAV` vs `EDITORIAL`.
- `NO_UI:1349-1366` §20 DO NOT TOUCH — el agente NO-UI no diseña HomePlus/Planner/Finance/Family/Inventory/Assets/HomeCloud ni **agrega features** ni **convierte editorial en fake navigation**.
- `NO_UI:12-13` — el scaffold de Figma Make **NO es Product/Visual Truth**. En esta sesión `Figma-app` se usa como **target visual** por instrucción explícita de la campaña, lo cual es compatible: la prohibición es del agente NO-UI, no del auditor.

---

## 3. EVIDENCIA USADA

### 3.1 Runtime Figma-app (evidencia propia de esta sesión)

| Artefacto | Ruta | Contenido |
|---|---|---|
| 35 screenshots de superficie | `audit/runtime/session-06/figma/<NAME>.png` | Teléfono recortado, `deviceScaleFactor: 2`, `animations: disabled` |
| 35 screenshots de contexto | `audit/runtime/session-06/figma/<NAME>__ctx.png` | Viewport 1280×900 completo, muestra el frame sobre el canvas `#D9D7D0` |
| 5 screenshots de gate | `audit/runtime/session-06/figma/_recon-00-after-gate.png`, `_dbg-*.png` | Arranque, gate de auth y Planner antes de navegación |
| Census por superficie | `audit/runtime/session-06/data/census-<NAME>.json` | Elementos interactuables + texto renderizado |
| Registro por superficie | `audit/runtime/session-06/data/cap-<NAME>.json` | Metadata de navegación + `clicks` + `text` + `consoleErrors` |
| Manifiesto | `audit/runtime/session-06/data/manifest.json` | Las 35 superficies con su `nav` y su `source` |
| Errores de consola | `audit/runtime/session-06/data/console-errors.json` | **`[]` — 0 errores en las 35 capturas** |
| Sistema visual medido | `audit/runtime/session-06/data/visual-system.json` | Conteos de valores distintos por superficie (§4.3) |
| Sondas de comportamiento | `audit/runtime/session-06/data/verify-probes.json` | Scope Finance, Horarios, Límites, Memories |
| Tooling | `audit/runtime/session-06/_tooling/{lib,capture,measure,verify,discover,walk-*,dbg*}.mjs` | Playwright Node |

**Navegación usada (todas por Ctx real, ninguna por URL):**
`bottomnav Inicio/Familia/Calendario/Más/Acciones rápidas` → tabs internos `Familia|Mapa|Lugares`, `Tareas|Calendario|Planes`, `Productos|Lista de compras`, `Resumen|Movimientos|Pagos`, `Archivos|Recuerdos` → filas y entries.

**Gate de arranque (reproducible):** `localStorage["homeplus.onboarding.resolved"] = "v3"` (`src/onboarding/persistence.ts:13-14`) salta Onboarding; el botón `Continuar con Google` del AuthScreen ejecuta `setPhase('app')` (`src/screens/Auth.tsx:27-36`).

### 3.2 Integration (fuente, sin runtime)

| Capa | Ruta | Método |
|---|---|---|
| Navegación | `front/mi-front-limpio/navigation/{types,AppNavigator,HomeTabNavigator,plannerNavigationContract,SimpleNavigator,ExperienceResolver}.tsx` | lectura + grep |
| Pantallas | `front/mi-front-limpio/screens/**` | lectura dirigida |
| Servicios | `front/mi-front-limpio/services/**` | lectura dirigida |
| Backend | `backend/index.js` + `backend/src/routes/**` | lectura dirigida |
| Esquema | `supabase/migrations/*.sql` — **110 archivos** (corrige el "117" de `00_SOURCE_MAP` §5.2) | grep de `create table`, `alter table`, constraints |
| Git | branch `gps-ux-recovery`, HEAD `20c5a34` | **sólo lectura**, sin comandos mutantes |

**Corrección de Session 0 (finding propio):** `00_SOURCE_MAP.md:358` reporta "117 migraciones .sql". El recuento real en `supabase/migrations/` es **110** (verificado por dos pasos independientes). El path correcto es `supabase/migrations/`; **`backend/supabase/migrations/` no existe**.

### 3.3 Documentos de producto

31 documentos clasificados (§2.2). Citas textuales con número de línea en cada afirmación de §8–§19.

---

## 4. FIGMA VISUAL-SYSTEM SUMMARY

### 4.1 Tokens globales (`src/index.css:5-83`, `@theme`)

| Categoría | Valores |
|---|---|
| Tipografía | `--font-sans: 'DM Sans'` · `--font-display: 'DM Serif Display'` (Google Fonts CDN, `index.css:1-2`) |
| Brand | `--color-brand: #E7643F` (terracota) · `-pressed #C94F2E` · `-soft/#brand-light/#brand-50 #FFE3DA` · `-100 #FFD0C2` · `-200 #F59A7C` · `-400 #ED7C59` · `-500 #E7643F` · `-600 #C94F2E` · `-700 #A83E25` |
| Canvas | `--color-canvas #FCFBF9` · `-soft/-surface-muted/-surface-raised #F4F0EB` · `-alt #EEE8E0` |
| Surface | `#FFFFFF` · `-glass rgba(255,255,255,.82)` · `-glass-warm rgba(250,248,246,.84)` · `-glass-strong rgba(255,255,255,.92)` |
| Ink (5 niveles) | `#1A1714` · `#4A4540` · `#6B6560` · `#8A8178` · `#BEB4AA` · `-inverse #FFFFFF` |
| Semánticos | `success #168A61` · `warning #D98622` + `-ink #8A4E08` · `danger #D64C5A` · `info #3178C6` (cada uno con `-soft` y `-strong`) |
| Estructura | `--color-border #DED5CB` · `-strong #CDBFB3` · `-subtle #EEE7E0` · `--color-scrim rgba(26,23,20,.38)` |
| Radius (8) | `xs 8` `sm 10` `md 14` `button 16` `lg 20` `xl 24` `2xl 28` `full 9999` |
| Elevation (3) | `--shadow-1` (1px3px .07 + 1px2px .04) · `--shadow-2` (4px12px .10 + 1px4px .06) · `--shadow-3` (8px24px .12 + 2px8px .06) |

**Calidad del sistema:** rampa de tinta de 5 niveles + 3 sombras + 8 radios + accent único. Cumple los umbrales de `reviewing-interface-quality` §3. Hay una corrección de contraste ya resuelta en el propio código (`index.css:48-52`: `#8A4E08` da 5.89:1 sobre `--color-warning-soft` frente a 4.35:1 de `#A95E0D`).

**Ausencia:** **no existe escala global de spacing `--space-*`** en `@theme`. Hay `--motion-*` y `--ease-*` en `:root` (`index.css:86-150`), pero el espacio es px crudo o utilidades Tailwind arbitrarias.

### 4.2 Overrides por módulo

| Módulo | Fichero de tokens | Qué define |
|---|---|---|
| Home | `src/home/tokens.ts` | `HOME_T:24`, `HOME_SPACE:207`, `HOME_ALIGN:318`, `HOME_GEO:347`, `HOME_ORIENTATION:441`, `tone*:66-164` |
| Finance | `src/finance/tokens.ts` | `FINANCE_ROW_MIN_HEIGHT 52`, `FINANCE_HIT_TARGET 44`, `financeSpacing`, `FINANCE_TAB_BOTTOM_INSET 96` |
| Planner | `src/planner/components.tsx:50` | `P = {…}` |
| HomeCloud | `src/homecloud/components.tsx:26-44` | `INK…INK4`, `BRAND`, `BRAND_PRESSED`, `BRAND_SOFT`, `CANVAS`, `SURFACE…` |
| Assets | `src/assets/ui.tsx:1207` | `A = {canvas, surface, raised, ink, ink2, ink3, brand, brandInk, …}` |
| Onboarding v3 | `src/onboarding-v3/foundation/tokens.css:14-89` | `--obv3-*` con spacing `--obv3-s1..s20` (**el único set de spacing del proyecto**) |
| Shell | `src/components/Shell.tsx:21-50` | `TOPBAR_HIT 44`, `TOPBAR_EDGE 16`, `SHELL_HEADER_HEIGHT 72`, `TOPBAR_CLUSTER_GAP 8`, `TOPBAR_CENTER_OFFSET 26` |
| BottomNav | `src/components/FloatingNavigationBar.tsx:48,58` | `METRICS { barHeight 68, barPadX 4, activeSize 52, activeOffset 4, fabSize 56, itemMinHeight 44, hitTarget 44 }` |

### 4.3 Medición runtime — valores distintos por superficie

Fuente: `audit/runtime/session-06/data/visual-system.json` (computed styles de todos los descendientes del frame).

| Superficie | font-size | font-family | border-radius | box-shadow | color | background | gap | padding | font-weight |
|---|---|---|---|---|---|---|---|---|---|
| Home | 12 | **1** | 5 | 2 | 7 | 14 | 4 | 14 | 4 |
| Planner Tareas | 10 | **1** | 6 | 3 | 8 | 16 | 4 | 16 | 4 |
| Familia | 9 | **1** | 7 | 3 | 9 | 17 | 4 | 12 | 5 |
| Inventario | 8 | **1** | 7 | 3 | 13 | 15 | 5 | 17 | 4 |
| Finanzas | 10 | **1** | 7 | 3 | 9 | 14 | 6 | 14 | 4 |
| Activos | 9 | **1** | 6 | 2 | 7 | 13 | 5 | 15 | 4 |
| HomeCloud | 9 | **2** | **10** | 4 | 12 | 15 | 6 | **24** | 4 |
| Mensajes | 12 | **1** | 6 | 3 | 11 | 18 | 4 | 18 | 4 |

**Radios observados (valores exactos):**
- Home `16, 20, 28, 50%, 9999` · Planner `16, 20, 22, 28, 50%, 9999` · Familia `16, 18, 20, 22, 28, 50%, 9999`
- Inventario `16, 18, 20, 22, 28, 50%, 9999` · Finanzas `14, 20, 24, 28, 3px, 50%, 9999`
- Activos `12, 16, 20, 28, 50%, 9999` · Mensajes `14, 16, 20, 28, 50%, 9999`
- **HomeCloud `12, 14, 16, 18, 20, 22, 28, 50%, 8px, 9999`**

### 4.4 Clasificación por categoría

| Categoría | Veredicto | Evidencia |
|---|---|---|
| Marca / accent | **UNIFIED** | `#E7643F` único accent; `#C94F2E` el pressed. Sin segundo accent en B/C/D/E. |
| Canvas / surface | **UNIFIED** | `#FCFBF9` + `#FFFFFF`; los módulos re-declaran los mismos valores con nombres distintos, no valores distintos. |
| Jerarquía de tinta | **UNIFIED** | Rampa de 5 niveles consistente; 7–13 colores de texto por superficie, todos de la rampa. |
| Bordes | **UNIFIED** | 3 tokens (`#DED5CB` / `#CDBFB3` / `#EEE7E0`). |
| **Radios** | **MODULE-SPECIFIC BUT COHERENT** | 5–10 valores por superficie frente a una escala de 8. **Valores fuera de escala**: `12px` (Activos, HomeCloud), `18px` (Familia, Inventario, HomeCloud), `22px` (Planner, Familia, Inventario, HomeCloud), **`3px`** (Finanzas). HomeCloud llega a 10. |
| Sombras | **UNIFIED** | 2–4 valores, todos de `--shadow-1/2/3` + scrims. |
| Tipografía | **UNIFIED** | 1 familia en 7/8 superficies. **Excepción: HomeCloud usa 2.** |
| **Spacing** | **FRAGMENTED** | **No hay escala global.** 4–6 `gap` y 12–24 `padding` distintos por superficie, sin token común. `Finance` sí tiene `financeSpacing`; Home tiene `HOME_SPACE`; el resto usa px crudo. HomeCloud (24 paddings) es el peor caso. |
| Phone frame | **UNIFIED** | Uno solo, sin variantes. |
| Topbar | **UNIFIED** | Avatar + nombre de hogar + chip de rol + búsqueda + notificaciones; `Shell.tsx` con constantes únicas. |
| Bottom navigation | **UNIFIED** | `FloatingNavigationBar` con `METRICS` fijas; 5 slots, FAB central. |
| Tabs | **UNIFIED** | `MotionSegmentedControl role="tablist"` reutilizado en Planner, Inventario, HomeCloud, Finance. |
| Rows | **UNIFIED** | Mismo patrón de fila con chevron + subtítulo + acción a la derecha en las 8 superficies. |
| Cards | **MODULE-SPECIFIC BUT COHERENT** | Mismo lenguaje (radio 20–28, sombra 1–2, borde sutil), densidad variable. |
| Sheets | **UNIFIED** | Un solo patrón de bottom sheet con `Cerrar` / `Volver` y escalonado de capas (`financeSheetStack`). |
| Empty states | **PARTIAL** | Presentes en Memories (`"Todavía no hay recuerdos"`) y Finance Papelera (`"Papelera vacía"`). Ausentes en Shopping y Activos. |
| FAB / quick actions | **UNIFIED** | FAB central naranja + modal `QuickActionsFlow` de 4 acciones. |

**Veredicto de sistema visual:** **UNIFIED en color, tipografía, sombra, frame, navegación, tabs y rows. MODULE-SPECIFIC BUT COHERENT en radios y cards. FRAGMENTED en spacing.** No se ven dos productos distintos: se ve un producto con tres gramáticas de espaciado y un radio suelto (`3px` en Finanzas). Utilizable como target sin redibujar nada.

---

## 5. DEVICE-SHELL EVIDENCE

Documentado sin modificarlo. Es evidencia para la adaptación de Sessions 7/8.

| Propiedad | Valor | Evidencia |
|---|---|---|
| Dimensiones lógicas | **390 × 844** CSS px | `src/App.tsx:807-808`; medido en runtime: `"390px"`, `"844px"` |
| Bezel | **10 px**, `#1A1714` (rgb 26,23,20) | `App.tsx:811`; medido `"10px solid rgb(26, 23, 20)"` |
| Radio exterior | **48 px** | `App.tsx:810`; medido `"48px"` |
| Sombra | `0 40px 80px rgba(0,0,0,.5), inset 0 0 0 1px rgba(255,255,255,.1)` | `App.tsx:812-813`; medido idéntico |
| Fondo del frame | `var(--color-canvas)` = `#FCFBF9` | `App.tsx:809`; medido `"rgb(252, 251, 249)"` |
| Overflow | `hidden` | `App.tsx:814` |
| Canvas exterior | `#D9D7D0` | `App.tsx:800` |
| Barra de estado | `flex items-center justify-between px-8 pt-4 pb-2`, `fontSize 13`, `fontWeight 600` | `App.tsx:820-822` |
| Reloj | `"9:41"` fijo | `App.tsx:824` |
| **Pill / "Dynamic Island"** | **120 × 32 px, `borderRadius: 20`, `#1A1714`, `left: 50%`, `translateX(-50%)`, `top: 8`** | `App.tsx:828-835` |
| Dynamic Island con nombre | **NO EXISTE por nombre.** Búsqueda de `Dynamic Island|dynamicIsland|island|notch` en `src/**`, `index.html`, `tests/**` → 0 coincidencias | Confirmado en `00_SOURCE_MAP` §4.3 y re-verificado aquí |
| Indicadores señal/batería | **Sí existen** en el render (5 barras + indicador + batería), dibujados fuera de `PhoneFrame` | visible en `B_HOME.png` |
| Altura del contenido de app | `calc(100% - 50px)`, `overflow hidden` | `App.tsx:932` |
| Rama mobile | `w-full h-full`, sin bezel | `App.tsx:959` |
| Breakpoint | `matchMedia('(min-width: 768px)')` | `App.tsx:773-777` |
| **Escalado** | **NO existe `transform: scale()` de layout raíz.** Frame fijo o 100%. No hay modelo de escala. | `00_SOURCE_MAP` §4.3, re-verificado |
| Safe area | **No hay `env(safe-area-inset-*)` en `PhoneFrame`.** El padding de 50 px del status bar es px literal. | `App.tsx:932` |

**Implicación directa para Sessions 7/8 (restricción, no coreografía):** el shell de Figma-app es de **390×844 CSS px fijos**, no un viewport con safe-area real. Un "dispositivo mayor + cámara/crop" **no puede** derivarse del Figma-app sin construirlo aparte, y **no debe** construirse mutando Figma-app. Corroboración independiente de `00_SOURCE_MAP` C-08.

---

## 6. MASTER SURFACE MATRIX

`PT` = Product Truth · `INT` = Integration · `SAFE` = presentación-segura.
Delta: `MATCH` · `VTA` = Visual Target Ahead · `FCA` = Functional Current Ahead · `VTG` = Visual Target + Implementation Gap · `SEM` = Semantic Conflict · `PROTO` = Figma Prototype Only · `MISS-FIG` / `MISS-INT`.

| SCENE | MOD | SURFACE | FIGMA STATUS | FIGMA PATH | PT STATUS | INT STATUS | INT PATH/ROUTE | DELTA | CAPABILITY | SAFE | REUSE |
|---|---|---|---|---|---|---|---|---|---|---|---|
| B | B | Home root | POLISHED | `src/screens/Home.tsx` + `src/home/{compose,candidates,types,viewer}.ts` | APPROVED — jerarquía exacta (`HOME_PRODUCT_FREEZE:967-977`) | PARTIAL — shell real, 4 Homes por rol con contenido mock | `HomeTab` → `screens/home/HomeCoordinador.tsx` | SEM (sec.) VTA | SUPPORTED + PARTIAL | SAFE TO SHOW | REUSE WITH DATA ADAPTER |
| B | B | Home — proyección por rol | PARTIAL — densidad por tier (`home/types.ts:184-189`) | `src/home/viewer.ts:41-50` | APPROVED como *proyección* (`HOME:959-961`); módulos duplicados PROHIBIDOS (`HOME:963-965`) | PARTIAL — 4 componentes Home (viola INV-HOME-003) | `HomeTabNavigator.tsx:180-185` | **SEM** | SUPPORTED + PARTIAL | SAFE WITH IMPLEMENTATION-GAP NOTE | REUSE VISUAL ONLY |
| B | B | "Home for Juli" (child) | **MISS-FIG** — no existe; sólo `?home-lab=` dev (`home/lab.ts:9-10,59-76`) | — | APPROVED (`HOME:217-221`, `UC-HOME-005:799-805`) | PARTIAL — `HomeAdolescente.tsx` con XP/streak hardcodeados (`:78-80`) | `HomeAdolescente.tsx` | MISS-FIG / VTG | SUPPORTED + PARTIAL | SAFE WITH IMPLEMENTATION-GAP NOTE | REUSE VISUAL ONLY |
| B | B | Planner shell + tabs | POLISHED | `src/planner/PlannerRoot.tsx`, `components.tsx:341-345` | APPROVED — 3 tabs (`PLANNER_PRODUCT_FREEZE:353-361`) | **MATCH** — 3 tabs | `plannerNavigationContract.ts:41,45`; `PlannerScreen.tsx:728-734` | **MATCH** | SUPPORTED + IMPLEMENTED | SAFE TO SHOW | DIRECT REUSE |
| B | B | Planner / Tareas | POLISHED | `src/planner/Tasks.tsx` | APPROVED | **MATCH** | `PlannerTasksScreen.tsx`; `/api/planner/tasks` | **MATCH** | SUPPORTED + IMPLEMENTED | SAFE TO SHOW | DIRECT REUSE |
| B | B | Planner / Responsabilidades | POLISHED — pantalla propia, entrada `EntryRow` dentro de Tareas (`Tasks.tsx:744`) | `src/planner/Tasks.tsx:738-744`; route `responsibilities` | APPROVED como pantalla en territorio Tasks, **NO 4º tab** (`PLANNER_PRODUCT_FREEZE:363-377`) | **MATCH** — misma posición | `PlannerTasksScreen.tsx:560-563` → route `Responsibilities` | **MATCH** | SUPPORTED + IMPLEMENTED | SAFE TO SHOW | DIRECT REUSE |
| B | B | Planner / Calendario | POLISHED | `src/planner/Calendar.tsx` | APPROVED | **MATCH** | `PlannerCalendarScreen.tsx` | **MATCH** | SUPPORTED + IMPLEMENTED | SAFE TO SHOW | DIRECT REUSE |
| B | B | **Planner / Horarios** | POLISHED — pantalla dedicada, `SEMANA DE LA CASA · 4` | `src/planner/Calendar.tsx:608` `HorariosScreen`; route `horarios` (`PlannerRoot.tsx:219-220`) | **SILENT** — `Schedule` sólo como concepto de frontera (`PLANS_PRODUCT_TRUTH:378-379`); 0 ocurrencias en `PLANS_TECHNICAL_TRUTH_V1` | VTG — entidad `household_schedule_blocks` + `/api/planner/schedules` reales, pero `PlannerSchedulesScreen.tsx` **huérfana (0 imports)**; la UI vive embebida en Calendar | `PlannerCalendarScreen.tsx:197-210,236-270`; `routes/planner.js:62-67`; `202608100002:9` | **SEM / UNK (PT)** | SUPPORTED + PARTIAL | SAFE WITH IMPLEMENTATION-GAP NOTE | REUSE WITH STATE ADAPTER |
| B | B | Planner / Planes (list) | POLISHED | `src/planner/Plans.tsx` | APPROVED | **MATCH** | `PlannerPlanListScreen.tsx`; `/api/planner/v1/plans` | **MATCH** | SUPPORTED + IMPLEMENTED | SAFE TO SHOW | DIRECT REUSE |
| B | B | Family — tabs | POLISHED — `Familia \| Mapa \| Lugares` | `src/screens/Familia.tsx` | **MATCH EXACTO** — 3 primary tabs (`people_presence:242-250`) | SEM — sólo 2: `Personas \| Mapa` | `FamilyViewSegmentedControl.tsx:25-28` | **MISS-INT** | SUPPORTED + PARTIAL | SAFE WITH IMPLEMENTATION-GAP NOTE | DIRECT REUSE |
| B | B | Family / Personas | POLISHED | `src/screens/Familia.tsx` | APPROVED | IMPLEMENTED | `FamilyTab` / `Family` → `screens/FamilyScreen.tsx`; `routes/households.js:25-55` | VTA | SUPPORTED + IMPLEMENTED | SAFE TO SHOW | DIRECT REUSE |
| B | B | Family / Mapa | POLISHED | `src/screens/Familia.tsx:83-130` | APPROVED — *"Mapa es full-focus. No dashboard alrededor"* (`people_presence:1809-1812`) | IMPLEMENTED (mobile-only; web → `EmptyState "GPS disponible en mobile"`) | `PresenceScreen.tsx`; `/api/presence/locations`; `react-native-maps` | VTA | SUPPORTED + IMPLEMENTED | SAFE TO SHOW | REUSE WITH STATE ADAPTER |
| B | B | Family / Lugares | POLISHED — Casa 2 / Colegio 1 / Trabajo 1 + "+ Agregar lugar" | `src/screens/Familia.tsx:177-179` | APPROVED — Lugares comparte espacio **únicamente con Avisos** (`people_presence:1942-1954`) | **NOT IMPLEMENTED** — texto fijo "No hay lugares guardados"; 6 tablas en DB, **0 servicios** | `MapContextCard.tsx:90-99`; tablas en `20260904010000:78,92,106` | **VTG** | SUPPORTED + NOT IMPLEMENTED | SAFE WITH IMPLEMENTATION-GAP NOTE | REUSE VISUAL ONLY |
| B | B | Miembro / hoja contextual | POLISHED | `src/screens/Familia.tsx:254-320` | APPROVED (`people_presence:1874-1901`) | PARTIAL — sheet de acciones persiste; **detalle read-only NO implementado** | `MemberActionsSheetFinal.tsx:36`; `GET /households/:id/members/:id` **sin consumidor FE** (`routes/households.js:28`) | VTA | SUPPORTED + PARTIAL | SAFE TO SHOW | DIRECT REUSE |
| B | B | Location sharing | **PROTO** — filas muertas `onPress={() => {}}` (`Familia.tsx:256,291,299-303,370`); `Toggle` importado y **nunca renderizado** | — | APPROVED — decisión **por individuo** + Precisión exacta/reducida + Pausar (`people_presence:1756-1806`) | PARTIAL — switch por miembro real (`sharing_mode off/foreground/background`), **sin** precisión ni pausa; `location_share_grants` existe en DB y **ningún código la lee/escribe** | `services/presenceLocationSharing.ts`; `PUT /api/presence/location`; `20260904010000:39-61` | **PROTO** (ambos) | SUPPORTED + PARTIAL | DO NOT SHOW AS WORKING CAPABILITY | DO NOT REUSE (interactivo) |
| B | B | **ETA** | **ABSENT** — 0 coincidencias de `\beta` en `src/**` | — | **NO V1** — `FUTURE CANDIDATES — NOT DISCARDED` (`people_presence:2798-2812`) | **ABSENT** — 0 en FE y BE; lo más cercano es `estimated_duration_minutes` en *tareas* | — | **MATCH (ambos ausentes)** | UNSUPPORTED CLAIM si se muestra | DO NOT SHOW | DO NOT REUSE |
| B | B | **Feed (superficie)** | **RETIRADA** — `types.ts:183-185` *"La surface Feed ya no existe"*; `family-feed`/`feed-comments` son **alias muertos** a `ConversationScreen` (`Messages.tsx:1024-1036`); `FEED_POSTS = []` (`data.ts:169`) | — | APPROVED — Feed = espacio social del hogar, **NO group chat**, modelo visual `FLAT CONTENT + SPACING + DIVIDER`, `NO CARD SOUP` (`FEED:86-98,142-169,344-364`) | **STUB** — `MOCK_POSTS` constantes, `setState` local, **0 tablas, 0 API**; el producto lo marca `isDemo: true` | `FeedFamiliar` en `PrivateStack` → `screens/feed/FeedFamiliarScreen.tsx` | **SEM (3 posiciones)** | SUPPORTED + NOT IMPLEMENTED | DO NOT SHOW AS WORKING CAPABILITY | DO NOT REUSE |
| B | B | Mensajes root | POLISHED | `src/screens/Messages.tsx` | APPROVED (Mensajes V1.0) | **MISS-INT** — 0 dominio de conversación/mensaje en todo el repo | — | **MISS-INT** | SUPPORTED + NOT IMPLEMENTED | SAFE WITH IMPLEMENTATION-GAP NOTE | REUSE VISUAL ONLY |
| B | B | Quick Actions | POLISHED — 4 acciones | `src/quickactions/QuickActionsFlow.tsx:140` | APPROVED (`HOME:133-143`) | PARTIAL — 3 de 4 `implemented: true` | `QuickActionTab` → `PlannerSheetProvider.openActions()` | VTA | SUPPORTED + PARTIAL | SAFE TO SHOW | DIRECT REUSE |
| C | C | Plan detail — cumpleaños | POLISHED — `TAREAS · 0 / EVENTOS · 1/2 / MEDICIONES · 0` | `src/planner/Plans.tsx` | **MATCH** — `PLAN = TASKS + EVENTS + MEASUREMENTS` (`PLANS_PRODUCT_TRUTH:47-57`); "Cumpleaños / 2 Events" ejemplo canónico (`:295-300`) | IMPLEMENTED | `PlannerPlanDetailScreenV1.tsx`; `planner_goals` | **MATCH** | SUPPORTED + IMPLEMENTED | SAFE TO SHOW | DIRECT REUSE |
| C | C | Plan — Milestones | **MISS-FIG** | — | **PROHIBIDO** (`PLANS_PRODUCT_TRUTH:302-309`) | IMPLEMENTED en DB (`planner_goal_milestones`, `202607080004:80`) | — | SEM (INT excede PT) | SUPPORTED + PARTIAL | DO NOT SHOW | DO NOT REUSE |
| C | C | Inventory root | POLISHED — `Productos \| Lista de compras \| Ver lugares` + chips de lugar/estado | `src/inventory/InventoryRoot.tsx`, `Products.tsx` | APPROVED — Item + Storage Space (`INVENTORY:309-323,454-486`) | PARTIAL — **sin eje de lugar**; filtro sólo por categoría | `MoreTab` → `screens/inventory/InventarioScreen.tsx`; `/api/inventory/items` | VTA | SUPPORTED + PARTIAL | SAFE TO SHOW | DIRECT REUSE |
| C | C | Inventory by place | POLISHED — Heladera 3 / Alacena 2 / Baño 1 / Cocina 1 | `src/inventory/productsNav.ts`; `Products.tsx` | APPROVED — **`0..N` Storage Spaces** por Item, cantidad global (`INVENTORY:488-508`) | **NOT IMPLEMENTED** — `inventory_items` **no tiene columna de lugar** (`202607080001:36-51`) | — | **VTG** | SUPPORTED + NOT IMPLEMENTED | SAFE WITH IMPLEMENTATION-GAP NOTE | REUSE VISUAL ONLY |
| C | C | Low stock / out of stock | POLISHED — `Poco 1` / `Agotados 1` | `src/inventory/productsNav.ts:10` | **MATCH** — `NORMAL / LOW / OUT` derivados (`INVENTORY:761-790`) | **MATCH** — mismo derivado, `quantity <= low_stock_threshold` | `InventarioScreen.tsx:92-102`; `inventory.service.js:409-431` | **MATCH** | SUPPORTED + IMPLEMENTED | SAFE TO SHOW | DIRECT REUSE |
| C | C | Consumo | POLISHED — decremento inline | `src/inventory/Products.tsx` | APPROVED — `MOVEMENT/ADD/REMOVE-CONSUME/ADJUST` (`INVENTORY:232-235`) | **PARTIAL** — escritura existe, **no hay endpoint de lectura** | `POST /api/inventory/items/:id/consume` (`routes/inventory.js:15`); `inventory_item_movements` (`202607080001:65-76`) | VTG | SUPPORTED + PARTIAL | SAFE WITH IMPLEMENTATION-GAP NOTE | DIRECT REUSE |
| C | C | **Shopping List** | **POLISHED + máquina de estados completa** — assignment, líneas, `Empezar compra` → `Compra en curso` (pausa/progreso/check) → `Finalizar compra` (total pagado) → Summary con `"Registrado en Finanzas · {s.totalPaid}"` | `src/inventory/ShoppingList.tsx` (27 868 B), `store.tsx:369-528` | **PROHIBIDO POR NOMBRE** — `INVENTORY:802,977,2120` | **ABSENT** — 0 rutas, 0 pantallas, 0 servicios, 0 tablas | — | **SEM + PROTO** | **UNSUPPORTED CLAIM** | **DO NOT SHOW AS WORKING CAPABILITY** | **DO NOT REUSE** |
| C | C | Shopping → Finance (escritura) | **PROTO** — sólo el texto `"Registrado en Finanzas"`; **0 imports** del store de Finance en `src/inventory/**` | `ShoppingList.tsx:543` | **AUSENTE** — `Finance → may register total/related expense. El modelo exacto se definirá en Finance` (`INVENTORY:1414-1418`) | **ABSENT** | — | **PROTO** | UNSUPPORTED CLAIM | DO NOT SHOW | DO NOT REUSE |
| C | C | Inventory → Shopping (auto-alta) | POLISHED — trigger por umbral `autoRestock`/`whenLeft` | `store.tsx:89-142` | **PROHIBIDO** como lista; lo aprobado es **Restock Need** (`INVENTORY:813-835`) | **Ruta real pero distinta** — `POST /inventory/restock-requests/:id/approve` crea una **Planner Task** | `inventory.service.js:542-562`; `inventory_restock_requests` (`202607080001:92-105`) | **SEM (dirección invertida)** | SUPPORTED + PARTIAL | DO NOT SHOW AS SHOPPING | DO NOT REUSE |
| D | D | Finance / Resumen | POLISHED | `src/screens/finance/FinanceResumen.tsx` | APPROVED | **MATCH** — `GET /api/finance/summary` | `FinanceScreen.tsx:1003`; `routes/finance.js:51` | **MATCH** | SUPPORTED + IMPLEMENTED | SAFE TO SHOW | DIRECT REUSE |
| D | D | Finance scope Personal/Hogar | POLISHED — segmented `Personal \| Hogar` (`testID=finance-scope-switch`) | `src/finance/FinanceHeader.tsx:64-72` | APPROVED (`FINANCE:348-390`) | PARTIAL — funciona pero **no se persiste** (React state) | `FinanceScreen.tsx:124-127,702-714` | **PROTO en Figma** (medido: `dataChanged=false`) | SUPPORTED + PARTIAL | SAFE (visual) / NO el cambio de datos | DIRECT REUSE |
| D | D | Finance / Movimientos | POLISHED | `src/screens/finance/FinanceMovimientos.tsx` | APPROVED | **MATCH** | `FinanceScreen.tsx:1164`; `routes/finance.js:50` | **MATCH** | SUPPORTED + IMPLEMENTED | SAFE TO SHOW | DIRECT REUSE |
| D | D | New Movement | POLISHED — 3 tipos, ARS/USD/EUR, `+ Más detalles` | `src/finance/sheets/MovementSheets.tsx` | APPROVED — `INCOME / EXPENSE / TRANSFER` (`FINANCE:691-707`) | **MATCH** — 3 endpoints | `POST /expenses`, `/incomes`, `/transfers` (`routes/finance.js:39-42`) | **MATCH** | SUPPORTED + IMPLEMENTED | SAFE TO SHOW | DIRECT REUSE |
| D | D | Finance / Pagos | POLISHED | `src/screens/finance/FinancePagos.tsx` | APPROVED — `PENDING → PAID/SKIPPED/CANCELLED`, `OVERDUE` derivado (`FINANCE:1228-1246`) | PARTIAL — overdue/today/upcoming; **bucket `paid` no renderizado** (`PaymentsList.tsx:149`) | `GET /api/finance/payments/dues` (`routes/finance.js:60`) | VTA | SUPPORTED + PARTIAL | SAFE TO SHOW | DIRECT REUSE |
| D | D | Pago con monto desconocido | POLISHED — copy real **`"Monto por definir"`** | `src/finance/payments.ts:32,35` | APPROVED — `Expected Amount puede ser UNKNOWN. Nunca se reemplaza por zero` | **MATCH** | `expected_amount_known` (`20260825000000:16-17,43-44,116-123`) | **MATCH** | SUPPORTED + IMPLEMENTED | SAFE TO SHOW | DIRECT REUSE |
| D | D | Saldo sin establecer | POLISHED — `Caja chica → Saldo sin establecer` | `src/finance/format.ts:121` | APPROVED | **MATCH** — `balance_state UNKNOWN`; **nunca `$0`** | `20260814010000:74-78`; `20260814020000:10-14,192-224` | **MATCH** | SUPPORTED + IMPLEMENTED | SAFE TO SHOW | DIRECT REUSE |
| D | D | Cuentas / Tarjetas | POLISHED — secciones `Cuentas / Tarjetas / Pozos`; `Galicia`, `Billetera`, `Caja chica`, `Cuenta corriente` | `src/screens/finance/FinanceOrganizacion.tsx:161,199,237` | APPROVED — `ACCOUNT`/`CREDIT_CARD` como **tipos de Account** (`FINANCE:517-528,610-628`) | **MATCH** | `account_type` + `closing_day`/`due_day` (`20260814010000:16`; `20260904000000:17-47`) | **MATCH** | SUPPORTED + IMPLEMENTED | SAFE TO SHOW | DIRECT REUSE |
| D | D | Finance / Análisis | POLISHED — `Gastos \| Ingresos \| Evolución` + Mes anterior/siguiente | `src/screens/finance/FinanceAnalisis.tsx:317-319` | APPROVED | **MATCH** — `MONTHLY \| YEARLY` | `GET /api/finance/analysis` (`routes/finance.js:55`) | **MATCH** | SUPPORTED + IMPLEMENTED | SAFE TO SHOW | DIRECT REUSE |
| D | D | Límites de gasto | POLISHED — General + Por categoría, Mensual/Anual, `Superaste por 27.000` | `src/screens/finance/FinanceLimites.tsx` | APPROVED — control conductual, **no retiene dinero** | **MATCH** | `finance_spending_limit_*` (`20260828030000:8,26,37`) | **MATCH** | SUPPORTED + IMPLEMENTED | SAFE TO SHOW | DIRECT REUSE |
| D | D | Finance / Papelera + restaurar | POLISHED | `src/screens/finance/FinancePapelera.tsx:147`; `TransferTrashSheets.tsx:390` | APPROVED — `ACTIVE → TRASH → RESTORE`, Trash sin efecto en balance/budget/reports (`FINANCE:912-930`) | **MATCH** | `POST /transactions/trash\|restore` (`routes/finance.js:45-46`); RPCs `20260815030000:10`, `20260907000005:125` | **MATCH** | SUPPORTED + IMPLEMENTED | SAFE TO SHOW | DIRECT REUSE |
| D | D | Refund / corrección | POLISHED | `src/finance/sheets/MovementSheets.tsx` | APPROVED (`FINANCE:934-954`) | **MATCH** | `POST /refunds`, `/refunds/correct`, `/transactions/correct` (`routes/finance.js:47-49`) | **MATCH** | SUPPORTED + IMPLEMENTED | SAFE TO SHOW | DIRECT REUSE |
| E | E | **Assets root** | POLISHED — filtros `Todos/Objetos/Vehículos/Mascotas/Propiedades` + Archivados + Papelera | `src/assets/Root.tsx:30,38-44` | **APPROVED** — `STANDARD/VEHICLE/PET/PROPERTY`, `STANDARD` → *"Objeto o equipo"* (`ASSETS_V2:140-152`) | **NOT IMPLEMENTED** — 0 rutas, 0 pantallas, 0 servicios, 0 tablas | — | **VTG** | SUPPORTED + NOT IMPLEMENTED | SAFE WITH IMPLEMENTATION-GAP NOTE | DIRECT REUSE |
| E | E | **Asset detail (PS5)** | POLISHED — Identidad / Personas y ubicación / Próximo / Datos y documentos / Historial | `src/assets/Detail.tsx:2-3` | **APPROVED** — orden idéntico (`ASSETS_V2:730-738`) | NOT IMPLEMENTED | — | **VTG** | SUPPORTED + NOT IMPLEMENTED | SAFE WITH IMPLEMENTATION-GAP NOTE | DIRECT REUSE |
| E | E | Asset — dinero | **NO hay monto propio** — `expense?: string` + `expenseId` como **referencia** (`assets/types.ts:9-10,88-91`); `Ver gasto en Finanzas` abre el movimiento (`Detail.tsx:2162`) | — | **MATCH** — `Finance posee amount… Assets nunca conserva una segunda verdad monetaria` (`ASSETS_V2:345-349`); `Transaction ↔ 0..N Assets` (`:351-354`) | NOT IMPLEMENTED | — | **MATCH (Figma↔PT)** | SUPPORTED + NOT IMPLEMENTED | SAFE WITH IMPLEMENTATION-GAP NOTE | DIRECT REUSE |
| E | E | Asset — Mantenimiento | **NO como campo de Asset** — `CareEntry` es "qué ocurrió"; lo que hay que hacer sale a Planner | `assets/types.ts:79-96`; `Detail.tsx:2334 push('create-task'\|'create-event', {assetId, assetName})` | **MATCH** — `MaintenancePlan owned by Assets` en EXPLICITLY NOT CORE; `→ Planner-owned temporal work` (`ASSETS_V2:841-842,886`) | NOT IMPLEMENTED | — | **MATCH (Figma↔PT)** | SUPPORTED + NOT IMPLEMENTED | SAFE WITH IMPLEMENTATION-GAP NOTE | DIRECT REUSE |
| E | E | Asset → Finance | **REAL** — `finance.createExpense(...)` al registrar un cuidado (`Detail.tsx:1880`) | — | **MATCH** | NOT IMPLEMENTED | — | **VTG** | SUPPORTED + NOT IMPLEMENTED | SAFE WITH IMPLEMENTATION-GAP NOTE | DIRECT REUSE |
| E | E | Asset → HomeCloud | **NAV sin DATA LINK** — `push('homecloud')` sin id de archivo (`Detail.tsx:1806-1809`) | — | `File ↔ Asset` es Core (`ASSETS_V2:366-370`) | NOT IMPLEMENTED | — | VTG | SUPPORTED + NOT IMPLEMENTED | SAFE WITH IMPLEMENTATION-GAP NOTE | REUSE WITH STATE ADAPTER |
| E | E | **HomeCloud / Archivos** | POLISHED — carpetas `Casa`/`Auto`; `Factura del mes`, `Garantía lavarropas`, `Claves wifi`, `Presupuesto detallado…`, `Video del portero eléctrico 00:42` | `src/screens/HomeCloud.tsx:159-160` | **MATCH EXACTO** — `[Archivos \| Recuerdos]`, first-ever entry Archivos (`HC_V2:29-45`) | **PARTIAL** — browse + carpetas + intake reales; **sin visor de archivo**, sin trash/restore, sin scanner | `HomeCloudFilesScreen.tsx`; 17 endpoints `/api/homecloud` | VTA | SUPPORTED + PARTIAL | SAFE TO SHOW | DIRECT REUSE |
| E | E | HomeCloud — carpetas | POLISHED | `src/homecloud/*` | APPROVED — planas, sin jerarquía | **MATCH** — *"flat, **no parent_id**, no lifecycle, no ACL"* | `homecloud_folders` (`20260910000001:3-7,14-21`) | **MATCH** | SUPPORTED + IMPLEMENTED | SAFE TO SHOW | DIRECT REUSE |
| E | E | **HomeCloud / Recuerdos** | POLISHED — `PARA VOLVER A VER`, `ÁLBUMES` (8), `LÍNEA DE TIEMPIO` por año/mes, `Ir a un año`, audio con duración, **written memory**, estado `No se pudo subir / Reintentar` | `src/screens/HomeCloud.tsx:1628,1690,1728,1896-1989` | **MATCH** — Timeline newest→oldest, precisión `exact/month_year/year/unknown`, `Durante YYYY`, `Sin fecha` al final (`HC_V2:196-233`) | **BACKEND ONLY** — 4 tablas + 6 endpoints; **0 superficie de lectura**; tab `Recuerdos` con `onChange={() => {}}` (`HomeCloudFilesScreen.tsx:44`) | `homecloud_albums`, `homecloud_album_items` (`20260910000003:22-32,115-120`) | **VTG** | SUPPORTED + PARTIAL | SAFE WITH IMPLEMENTATION-GAP NOTE | DIRECT REUSE |
| E | E | HomeCloud — captura de audio/voz | **PROTO en HomeCloud** — `+ Audio` *simula* el retorno del picker con un audio mock (`HomeCloud.tsx:2440-2455`). **La grabación real vive en Quick Actions** y **escribe en HomeCloud** | `src/quickactions/CaptureMoment.tsx:633,735-748,833,883` | **MATCH** — `record/stop/preview/save`, `no fake waveform`, `no transcription V1` (`HC_V2:333-335`) | NOT IMPLEMENTED | — | **VTG** | SUPPORTED + NOT IMPLEMENTED | SAFE WITH IMPLEMENTATION-GAP NOTE | REUSE WITH STATE ADAPTER |
| E | E | Memory ↔ Event/Person/Asset | **ABSENT** — `HcMemory` **no tiene** `eventId`/`personIds`/`assetId`; único dato personal es `savedBy` (**string libre**) | `src/homecloud/types.ts:52-76` | **AUSENTE del freeze vigente.** Sólo *"candidata futura"* en V1.0 (`HC_V1:1145,1153-1154`) | **ABSENT** — 0 FK desde `homecloud_*` hacia otros dominios | `20260910000000:17,25,34` | **MATCH (ambos ausentes)** | UNSUPPORTED CLAIM si se muestra | DO NOT SHOW | DO NOT REUSE |

---

## 7. MASTER CAPABILITY MATRIX

| CAPABILITY | PRODUCT TRUTH | FIGMA | INT FE | INT BE | STATUS | SAFE TO DEMO? | EVIDENCE |
|---|---|---|---|---|---|---|---|
| Completar tarea | APPROVED | Sí, inline con "Completar" | Sí | `POST /planner/tasks/:id/complete` | SUPPORTED + IMPLEMENTED | **SÍ** | `B_HOME.png`, `PlannerTasksScreen.tsx`, `routes/planner.js:76-102` |
| Ver responsabilidad | APPROVED, en territorio Tasks | Sí, pantalla propia | Sí | `/api/planner/responsibilities` + RPC `materialize_planner_responsibility_v1` | SUPPORTED + IMPLEMENTED | **SÍ** | `B_PLANNER_RESPONSIBILITIES.png`; `20260916000001:5,38,48` |
| Cambiar evento de calendario | APPROVED | Sí | Sí | `/api/planner/v1/events` | SUPPORTED + IMPLEMENTED | **SÍ** | `PlannerCalendarScreen.tsx:306` |
| Abrir Plan | APPROVED | Sí | Sí | `/api/planner/v1/plans` | SUPPORTED + IMPLEMENTED | **SÍ** | `C_PLAN_DETAIL_BIRTHDAY.png` |
| Ver horario de la casa | **SILENT** | Sí, pantalla dedicada | Pantalla huérfana | `household_schedule_blocks` + RPC | SUPPORTED + PARTIAL | CON NOTA | `verify-probes.json`; `PlannerSchedulesScreen.tsx:46` (0 imports) |
| Añadir lugar | APPROVED | Sí, "+ Agregar lugar" | No | Tablas sin servicio | SUPPORTED + NOT IMPLEMENTED | CON NOTA | `B_FAMILY_PLACES.png`; grep backend → 0 |
| Compartir ubicación | APPROVED, por individuo | Fila muerta; sin toggle | Switch por miembro | `sharing_mode` + trigger | SUPPORTED + PARTIAL | **NO como capacidad** | `Familia.tsx:256`; `20260904010000:22-30` |
| Pausar / bajar precisión de ubicación | APPROVED | **No** | **No** | **No** | SUPPORTED + NOT IMPLEMENTED | **NO** | `people_presence:1756-1806`; 0 hits |
| Publicar en Feed | APPROVED | **Retirada** | `setState` local | **Ausente** | SUPPORTED + NOT IMPLEMENTED | **NO** | `types.ts:183-185`; `FeedFamiliarScreen.tsx:121-138` |
| Comentar / reaccionar | APPROVED, motor compartido | Reactions sólo en mensajes | Contador en memoria | **Ausente** | SUPPORTED + PARTIAL | **NO** | `Messages.tsx:1737-1739`; `FeedFamiliarScreen.tsx:140-149,214-221` |
| Adjuntar archivo a un post | **LEGACY INTENT / NOT RECONFIRMED** | No | No | No | UNKNOWN | **NO** | `FEED:783-814,999-1002` |
| Registrar consumo de stock | APPROVED | Sí | Sí | `POST /inventory/items/:id/consume` | SUPPORTED + PARTIAL | **SÍ** (escritura) | `inventory_item_movements` (`202607080001:65-76`) |
| Ver historial de consumo | APPROVED implícito | No | **No hay endpoint de lectura** | Ausente | SUPPORTED + NOT IMPLEMENTED | **NO** | `routes/inventory.js` sin `GET /movements` |
| Ver inventario por lugar | APPROVED (`0..N`) | Sí | **No** (sin columna) | Ausente | SUPPORTED + NOT IMPLEMENTED | CON NOTA | `C_INVENTORY_PLACES.png`; `202607080001:36-51` |
| **Mover un ítem a Shopping** | **PROHIBIDO** | Sí | **No existe la entidad** | Ausente | **UNSUPPORTED CLAIM** | **NO** | `INVENTORY:2120`; 0 tablas |
| **Empezar / finalizar una compra** | **NO DEFINIDA** | Sí, con sesión completa | No | Ausente | **UNSUPPORTED CLAIM** | **NO** | `store.tsx:369-528` |
| **Compra → gasto en Finance** | **`El modelo exacto se definirá en Finance`** | Sólo texto `"Registrado en Finanzas"` | No | Ausente | **UNSUPPORTED CLAIM** | **NO** | `ShoppingList.tsx:543`; `INVENTORY:1414-1418` |
| Registrar gasto | APPROVED | Sí | Sí | `POST /finance/expenses` | SUPPORTED + IMPLEMENTED | **SÍ** | `D_FINANCE_NEW_MOVEMENT.png` |
| Registrar ingreso | APPROVED | Sí | Sí | `POST /finance/incomes` | SUPPORTED + IMPLEMENTED | **SÍ** | `routes/finance.js:41` |
| Registrar transferencia | APPROVED | Sí | Sí | `POST /finance/transfers` | SUPPORTED + IMPLEMENTED | **SÍ** | `routes/finance.js:42` |
| Registrar pago (mark paid) | APPROVED — `Register Payment → Expense → PAID` | Sí | Sí | `POST /payments/dues/:dueId/register` | SUPPORTED + IMPLEMENTED | **SÍ** | `D_FINANCE_PAYMENTS.png`; `20260826000000:1-8` |
| Pagar con monto por definir | APPROVED | Sí (`"Monto por definir"`) | Sí | `expected_amount_known=false` | SUPPORTED + IMPLEMENTED | **SÍ** | `financePayments.ts:200,233-238,329-337` |
| Ver saldo sin establecer | APPROVED | Sí | Sí | `balance_state UNKNOWN` | SUPPORTED + IMPLEMENTED | **SÍ** | `D_FINANCE_ORGANIZAR.png` |
| Ver análisis por categoría | APPROVED | Sí | Sí | `GET /finance/analysis` | SUPPORTED + IMPLEMENTED | **SÍ** | `D_FINANCE_ANALYSIS.png` |
| Restaurar de papelera | APPROVED | Sí | Sí | RPC `finance_trash_transaction_v1` | SUPPORTED + IMPLEMENTED | **SÍ** | `20260815030000:10` |
| **Ver un activo** | **APPROVED (FROZEN)** | Sí | **No** | **No** | SUPPORTED + NOT IMPLEMENTED | CON NOTA | `E_ASSETS.png`; 0 rutas |
| **Ver un Asset Record de garantía** | **APPROVED** (`WARRANTY`) | Sí — "Garantía PlayStation 5 · hasta enero de 2027 · 1 documento" | **No** | **No** | SUPPORTED + NOT IMPLEMENTED | CON NOTA | `E_ASSET_PS5.png`; `ASSETS_V2:266` |
| **Registrar el gasto de un activo** | APPROVED (`Transaction ↔ 0..N Assets`) | Sí (`finance.createExpense`) | **No** | **No** | SUPPORTED + NOT IMPLEMENTED | CON NOTA | `assets/Detail.tsx:1880` |
| **Abrir un archivo de HomeCloud desde un activo** | APPROVED (`File ↔ Asset`) | **Nav sin link** (`push('homecloud')` sin id) | **No** | **No** | SUPPORTED + PARTIAL | CON NOTA + editorial | `assets/Detail.tsx:1806-1809` |
| **Ver un recuerdo** | **APPROVED (FROZEN V2)** | Sí | **No** | Sí (`GET /albums`, `/albums/:id/items`) | SUPPORTED + PARTIAL | CON NOTA | `E_HOMECLOUD_MEMORIES.png`; `homecloudReadService.ts:141,201` |
| **Capturar un recuerdo con voz** | **APPROVED (V2)** | Sí (Quick Actions → HomeCloud) | **No** | **No** | SUPPORTED + NOT IMPLEMENTED | CON NOTA | `CaptureMoment.tsx:735-748` |
| Añadir recuerdo a un álbum | APPROVED — `Memory 0..N Albums`, N:M real | Sí | **No** | Parcial (`PATCH /content/:id/file` sólo `role='file'`) | SUPPORTED + PARTIAL | CON NOTA | `HC_V2:235-271,517-519`; trigger `20260910000001:98-101` |
| Escribir un recuerdo | APPROVED — sin título requerido, puede no tener binario | Sí | **No** | **No** | SUPPORTED + NOT IMPLEMENTED | CON NOTA | `HC_V2:282-309`; `homecloud/store.tsx:391` |
| Editar `caption` de un recuerdo | APPROVED como buscable | Sí | **No** — el cliente manda `caption: null` hardcodeado | Validado, insertado | SUPPORTED + PARTIAL | **NO** | `homecloudMemoryIntakeService.ts:115`; `20260910000000:29` |
| Subir un archivo al hogar | APPROVED | Sí | Sí, pipeline 4 pasos | `POST /register`→`/upload`→`/verify`→`/finalize` | SUPPORTED + IMPLEMENTED | **SÍ** | `E_HOMECLOUD_FILES.png`; `routes/homecloud.js:64-73` |
| **Abrir / ver un archivo** | APPROVED (Viewer) | Sí | **No hay visor**; `FileTile` sólo tiene `onMore` | `GET /content/:id/access` existe, **sin consumidor FE** | SUPPORTED + PARTIAL | CON NOTA | `HomeCloudFilesScreen.tsx:57,58-68`; `homecloudReadService.ts:348` |
| Papelera de HomeCloud | **No en V1** (*"folders not part of unified Trash V1"*) | Sí (root/folder) | **No hay endpoint** | Columnas existen, **ningún writer** | UNSUPPORTED CLAIM | **NO** | `20260910000001:5-6`; 0 endpoints |

---

## 8. B — HOME

### 8.1 FIGMA: anatomía medida

**Shell:** top bar con avatar `G`, nombre de hogar `Familia García` + chevron, chip de rol `Coordinador`, iconos de búsqueda y notificaciones con badge `2`. Debajo, greeting por fecha: `Viernes, 25 de septiembre` / `Hola, Gabriel` (`src/screens/Home.tsx:85-91,955`).

**Cinco secciones, en el orden exacto de Product Truth** (`HOME_PRODUCT_FREEZE:967-977`):

| # | Sección Figma | Copy en pantalla | Origen de datos (Figma) |
|---|---|---|---|
| 1 | `attention` | `NECESITA ATENCIÓN` + `Ver 4 más` | `candidates.ts:210,232,246` (planner), `:557,570,584` (finance), `:663` (assets) |
| 2 | `today` | `HOY` + `Ver 3 más` | `candidates.ts:155,210` (planner), `:382,409,424` (inventory) |
| 3 | `upcoming` | `PRÓXIMO` + `Ver 16 más` | `candidates.ts:159,277,584,698,722` |
| 4 | `insights` | `TE PUEDE SERVIR` | `candidates.ts:607` (límites), `:461,424` (reposición) |
| 5 | `recent` | `QUÉ CAMBIÓ` | `candidates.ts:313` (planner), `:476` (último resumen de compra) |

**Anatomía de fila:** sección en uppercase con tracking amplio + link de overflow a la derecha; fila con badge/contador a la izquierda, título en semibold, meta en `ink-3`, y acción contextual a la derecha (`Completar`, `Me encargo`, `Verificar`) como botón pill con borde. La fila de attention usa tarjeta con borde izquierdo de acento en `danger` y fondo `danger-soft` (`B_HOME.png`).

**Cross-domain real dentro de Figma Home** (`src/home/candidates.ts`): planner → `task-detail`/`event-detail`; finance → `finance-limites`; inventory → `inventory-item`, **`compras {tab:'lista'}`** (`:363`), **`shopping-summary`** (`:487`); assets → `asset-detail`; homecloud → `homecloud` (`:775`). `messagesAdapter` **no proyecta nada** (`:809-816`), y Family/Presence **no tiene adaptador** — *"no puede crear una situación, sólo enriquecer"* (`compose.ts:156-157`), coherente con `HOME` §02.6.

### 8.2 PRODUCT TRUTH: coincidencias y divergencias

| Punto | Product Truth | Figma | Veredicto |
|---|---|---|---|
| Jerarquía de secciones | `Attention → Today → Upcoming → Insights → Recent` (`HOME:967-977`, `:170-176`) | Idéntica | **MATCH** |
| Personal-first | `INV-HOME-001` | Greeting nominado + proyección por viewer | MATCH |
| Rol-aware | `INV-HOME-002` — *"may receive **materially different** Home projections"*; §04.4/§04.5 exigen ocultar contenido no autorizado y ser apropiado a capacidades | **Sólo densidad**: `DENSITY_BY_TIER` (`home/types.ts:184-189`) y el comentario explícito *"Un solo Home, distinta densidad: **no cuatro Homes**"* (`home/types.ts:172-183`) | **DIVERGENCIA — P0** |
| Un solo Home | `INV-HOME-003` — *"Role adaptation **never** creates separate Home modules"* | Un solo Home ✔ | **MATCH** |
| Sin cards de módulo permanentes | `INV-HOME-005` | Sin cards de módulo ✔ | MATCH |
| Deduplicación / precedencia | `INV-HOME-007/008` | Implementado en `compose.ts` | MATCH (no verificable en una sola captura) |
| Deep link | `INV-HOME-010` | Implementado (`useHomeProjection.ts:250-253`) | MATCH |

### 8.3 INTEGRATION: estado real

| Componente | Datos | Estado |
|---|---|---|
| `HomeCoordinador.tsx` (49 L) | delega en `HomePlannerSections` | **REAL** |
| `HomeAdulto.tsx` (313 L) | `fetchData` **no hace ninguna llamada** (`:61-68`, sólo `setLoading(false)`); `MOCK_ACTIVITY` (`:20-24`); bloques de agenda/tareas/calendario envueltos en `{false ? (...) : null}` (`:129`); "En casa / Salí" es estado local (`:49,120-128`); wellbeing local (`:242-264`) | **STUB** |
| `HomeAdolescente.tsx` (310 L) | XP/streak **hardcodeados** (`:78-80`); `MOCK_CHALLENGE` (`:33-41`) | **STUB** |
| `HomeAdultoMayor.tsx` (298 L) | `MOCK_PHOTOS` (`:30`), `MOCK_VOICE` (`:36`), check-in local (`:54`) | **STUB** |
| Bloque compartido `HomePlannerSections.tsx` (401 L) | `GET /api/planner/summary` · `/attention?limit=3` · `/activity?limit=3` · `/schedules?person_id=` · `GET /api/inventory/alerts`; mutación one-tap `POST /planner/tasks/:id/complete` | **REAL / IMPLEMENTED** |

`mapRole`: `child → adolescente` (`context/HouseholdContext.tsx:25`). Backend con matriz de capacidades por rol (`backend/src/lib/plannerCapabilities.js:172-330`).

### 8.4 Delta Home — la posición exacta

- **Figma ↔ Product Truth:** MATCH en arquitectura de información (5 secciones en orden, un solo Home, sin cards de módulo, deep-link). DIVERGENCIA en profundidad del rol-awareness: densidad ≠ proyección materialmente distinta.
- **Integration ↔ Product Truth:** `INV-HOME-003` **violado** — cuatro componentes Home. E `INV-HOME-002` es formalmente cumplido (son materialmente distintas) pero con contenido mock, lo cual no es cumplimiento.
- **"Home for Juli":** `Juli` → **0 coincidencias** en los 388 `.ts/.tsx` del frontend. En Figma tampoco existe salvo el lab dev con viewers sintéticos (`home/lab.ts:59-76`, y el propio código admite *"CURRENT no tiene un rol 'Niño'"*). **Es una capacidad aprobada sin superficie en ninguno de los dos lados.**

### 8.5 Qué se reutiliza casi 1:1 y qué datos hay que inyectar

**Reutilizable ~1:1 (estructura visual):** top bar completa (avatar + nombre + chip de rol + búsqueda + notificaciones), greeting por fecha, los cinco encabezados de sección con su link de overflow, la anatomía de fila con badge-izquierda + acción-derecha, la tarjeta de attention con borde de acento, y el bottom nav.

**Datos a inyectar para la presentación:**
1. **Ficha de "Juli"** — no existe. Debe construirse como **estado de presentación**, no como Home de producto. Su autoridad visual sale de la misma anatomía de Home (densidad `child` de `DENSITY_BY_TIER`), pero su contenido debe ser **editorial** y marcado como tal.
2. **Rol del viewer** — el chip `Coordinador` del top bar. Cambiarlo a un rol adolescente/niño es un cambio de una línea de datos (`data.ts:3`) y es **seguro**; lo que **no** es seguro es insinuar que el sistema calcula una proyección por rol (no lo hace).
3. **Conteos** — `Ver 4 más`, `Ver 3 más`, `Ver 16 más`, badge `2`. Todos deben ser **datos de demo explícitos**, no leídos de nada.
4. **Section ordering** — si la presentación necesita otra prioridad, Product Truth la fija: `Attention > Today > Upcoming > Insights > Recent`. No negociable.

**Presentación-safety:** la pantalla Home completa es **SAFE TO SHOW**. El fragmento "Home de Juli" es **SAFE WITH IMPLEMENTATION-GAP NOTE** y debe presentarse como *el mismo Home con otra densidad*, nunca como un módulo Home distinto.

---

## 9. B — PLANNER

### 9.1 B-P1 — ¿Responsibilities es tab principal o pantalla en Tasks?

**RESUELTO: pantalla dentro del territorio de Tasks. Los tres lados coinciden.**

| Autoridad | Evidencia |
|---|---|
| **Product Truth** | `PLANNER_PRODUCT_FREEZE_V1.0.md:353-361` `Planner tiene tres superficies principales: Tareas / Calendario / Planes`; `:291-308` el Product Map anida `TASKS └── Task └── Responsibilities`; `:363-377` *"`Responsibilities` tiene identidad funcional y screen propia, pero **no ocupa un cuarto pilar permanente** del Planner… Modelo: `TASKS ├── Tareas └── Responsabilidades`"*; `:1001-1005` *"accesible dentro del territorio de Tasks… sin convertirse en un cuarto pilar principal"* |
| **Figma** | `src/planner/components.tsx:341-345` `PLANNER_NAV_ITEMS = [{tareas},{calendario},{planes}]` — **exactamente 3**; `store.tsx:33` `PlannerTab = "tareas"\|"calendario"\|"planes"`; `Tasks.tsx:744` `<EntryRow title="Responsabilidades" onPress={() => go("responsibilities")} />`; `Tasks.tsx:11-12` *"NO existe el switch Tareas \| Responsabilidades"*; `PlannerRoot.tsx:12-14` *"No hay tabs anidadas"*; CTA propio `:71` `"Nueva responsabilidad"` |
| **Integration** | `plannerNavigationContract.ts:41,45` `PlannerTabKey = 'tasks'\|'events'\|'plans'`; `PlannerScreen.tsx:728-734` + labels `:798-808`; único punto de entrada `PlannerTasksScreen.tsx:560-563` → `navigate('Responsibilities')` |

**Consecuencia:** la segmentada de 3 segmentos es correcta en los tres lados. Mostrar "Responsabilidades" como cuarta pestaña sería **conflicto semántico** contra la autoridad. El guion dice "Planner: Tareas/Calendario/Planes" — coincide.

### 9.2 B-P2 — ¿Los Planes son Planes/Goals multi-paso reales?

**SÍ, en los tres lados, con una divergencia de composición.**

- **Product Truth** (`PLANS_PRODUCT_TRUTH_V1:47-57`): `PLAN ├── TASKS ├── EVENTS └── MEASUREMENTS`. *"No existe una cuarta entidad de 'momento importante'."* `:366-386` frontera: RESPONSIBILITY / TASK / EVENT / **SCHEDULE** / PLAN / MEASUREMENT.
- **Figma** (`C_PLAN_DETAIL_BIRTHDAY.png`, `C_PLAN_DETAIL_MEASUREMENT.png`): secciones `TAREAS · 0`, `EVENTOS · 1/2`, `MEDICIONES · 0`. **Coincide exactamente.** El fixture `Cumpleaños de Martina` muestra `EVENTOS · 1/2` con dos eventos que comparten fecha y participantes.
- **Integration** (`PlannerPlanDetailScreenV1.tsx`, 677 L): entidad real `planner_goals` + `planner_goal_milestones` (`202607080004:5,80`), `progress_mode in ('steps','tasks','numeric','boolean','none')` (`202607100001:14`), enlace/desenlace real de tareas (`:68,201,225`). **PERO** expone `planner_goal_milestones`, es decir **mantiene la entidad Milestone que Product Truth eliminó** (§2.3 A-03) → **FUNCTIONAL CURRENT AHEAD en la dirección equivocada**.

### 9.3 B-P3 — ¿Los horarios son entidad separada o recurrencia?

**RESPUESTA: hay tres mecanismos coexistiendo, y sólo uno está respaldado por Product Truth.**

| Mecanismo | Product Truth | Figma | Integration |
|---|---|---|---|
| **Recurrencia en Responsibility** | APPROVED — *"Responsibility utiliza recurrencia calendar/schedule-based"* (`PLANNER:1149`) | `RespFrequency = "diario"\|"semanal"\|"cadaN"` (`planner/fixtures.ts:481`) | `schedule_kind in (daily,weekdays,interval,monthly,after_completion)` (`20260916000001:5`) + RPC de materialización |
| **Recurrencia en Event** | APPROVED (`PLANNER:312-329`) | `EventRepeat = {semanal:{dows}}\|{mensual}` (`fixtures.ts:603`) | `planner_events.recurrence` (`202606230001:113,131-134`) + `planner_event_series.recurrence_rule jsonb` |
| **Entidad Schedule / "Horarios"** | **SILENT.** `Schedule` aparece **sólo** como concepto de frontera (`PLANS_PRODUCT_TRUTH:378-379`). **0 ocurrencias** en `PLANS_TECHNICAL_TRUTH_V1.md`, el documento técnico más nuevo. El master de presentación lo invoca sin respaldo (`MASTER:898` `Colegio de Juli → componente de Horarios`). | **Pantalla dedicada de primer nivel dentro de Calendario**: `HorariosScreen` (`planner/Calendar.tsx:608`), route `horarios`, título `"Horarios"`, CTA `"Nuevo horario"`, datos **medidos en runtime**: `SEMANA DE LA CASA · 4` con `Colegio de Tomi · Lun a Vie · 08:00–13:00`, `Natación de Juan · Mar y Jue · 17:00–18:30`, `Ocupado · Lun a Vie · 09:00–18:00`, `Club de la esquina · Sáb · 11:00–12:30`; y el glosario *"Un horario es cómo se ve normalmente la semana de alguien: colegio, trabajo, club."* | **Entidad real sin pantalla**: `household_schedule_blocks` + `household_schedule_preferences` (`202608100002:1,9`) + `/api/planner/schedules` + `/schedules/privacy` (`routes/planner.js:62-67`) + RPC `can_view_household_schedule`. Pantalla dedicada `PlannerSchedulesScreen.tsx` (119 L) **huérfana: 0 imports**. La UI vive embebida en `PlannerCalendarScreen.tsx:197-210,236-270`. |

`rrule` (formato iCalendar): **ABSENT** en migraciones y en ambos lados.

**Veredicto:** `Schedule` es una capacidad **ya implemented por Integration y diseñada por Figma** que Product Truth nunca congeló. Es el patrón exacto para **P0 PRODUCT TRUTH AMBIGUITY** (§29). La pantalla es coherente y muy presentable, pero presentarla como capacidad congelada excedería la autoridad.

### 9.4 B-P4 — Jerarquía canónica de pantallas de Planner

```
PLANNER  (bottom tab "Calendario" en Integration · sin tab propio en Figma)
│
├── TAREAS                        [TAB PRIMARIO 1]
│   ├── vista Pendientes (filtro por defecto)
│   │   ├── REVISIÓN · n           "Verificar"
│   │   ├── VENCIDAS · n           "Me encargo"
│   │   ├── HOY · n                "Completar"
│   │   ├── MAÑANA · n
│   │   └── "y N más"
│   ├── EntryRow: RESPONSABILIDADES   ← B-P1: pantalla propia, un nivel más adentro
│   ├── CreateTask / EditTask
│   └── TaskDetail
│
├── CALENDARIO                    [TAB PRIMARIO 2]
│   ├── timeline mixto: eventos + tareas + horarios
│   ├── CreateEvent / EditEvent
│   └── EventDetail
│
├── PLANES                        [TAB PRIMARIO 3]
│   ├── filtros por lifecycle: En curso / Preparación / Completados / Cancelados
│   ├── PlanList → PlanDetail
│   │     ├── TAREAS · n
│   │     ├── EVENTOS · n/m
│   │     └── MEDICIONES · n
│   ├── CreatePlan / EditPlan
│   └── PlanStructureEdit
│
└── HORARIOS                      ⚠ NO CONGELADO en Product Truth
      "SEMANA DE LA CASA · n" → ScheduleBlock → ScheduleForm
```

Toda esta jerarquía está **medida en runtime** salvo el subárbol de Crear/Editar, que no se capturó por no ser requisito de B/C/D/E en esta sesión.

---

## 10. B — FAMILY / PRESENCE / MAP / PLACES

### 10.1 B-F1 — Tabs top-level exactos

| Autoridad | Tabs |
|---|---|
| **Product Truth** | `people_presence_product_freeze.md:242-250` — `Dentro de Familia: [ Familia \| Mapa \| Lugares ]` · *"Estas son las tres primary tabs."* · `:2844` acceptance `3. Familia uses exactly 'Familia \| Mapa \| Lugares' as primary tabs.` · `:278-290` §03.4 *"No existe primary tab para: Activity, Avisos, Permisos, Privacy, Settings, Devices, SOS"* |
| **Figma** | **3/3 MATCH** — verificado en runtime: `Familia`, `Mapa`, `Lugares` |
| **Integration** | **2** — `people` / `map` (`FamilyViewSegmentedControl.tsx:25-28`). **Falta `Lugares` como tab.** |

→ **MISS-INT.** Es el gap de implementación más barato y más visible de todo el módulo B: la autoridad y el target visual coinciden en 3 tabs, y la implementación tiene 2.

### 10.2 B-F2 / B-F3 — Qué posee Mapa y qué posee Lugares

| | Product Truth | Figma | Integration |
|---|---|---|---|
| **Mapa** | *"Mapa es full-focus. No dashboard alrededor."* (`:1809-1812`). Elementos permanentes: *"Sólo: 1. Member avatar pins; 2. relevant Place markers; 3. own location representation; 4. recenter control. **No filters. No card permanente inferior.**"* (`:1814-1830`). Prioridad `MEMBERS → highest`, `PLACES → contextual` | ✓ pins de avatar, ✓ marker de lugar (`🏠 Casa`), ✓ rótulos de calle fijos. **✗ hay un bloque `AHORA` permanente inferior** con lista de presencia (`Mariana · Casa · ahora`, `Juan · Casa · hace 30 min`) | ✓ markers con avatar, ✓ `live/stale/sharing_disabled`, ✓ realtime, ✓ compartir/detener. ✗ web → `EmptyState "GPS disponible en mobile"` (`PresenceScreen.tsx:491-494`) |
| **Lugares** | *"comparte espacio **únicamente con Avisos**. No incluye: Activity, Permissions, Privacy, Device, SOS, Members management, Check-in"* (`:1942-1954`). Responde `¿Qué lugares son significativos y qué avisos dependen de ellos?` (`:261-276`) | ✓ catálogo con conteo `2 personas ahora` + `+ Agregar lugar`. ✗ no muestra Avisos | **✗** — el modo `places` de `MapContextCard` sólo pinta *"No hay lugares guardados para este hogar."* (`:90-99`) y nunca recibe `selectedPlace` (`PresenceScreen.tsx:595-603`) |

→ **SC-08 (§20):** el bloque `AHORA` permanente inferior del Mapa de Figma contradice `people_presence:1830` *"No card permanente inferior"*. Es un cambio estructural de superficie, no cosmético. El copy del guion no depende de él, así que la resolución de Session 7 puede ser simplemente **no mostrarlo**.

### 10.3 B-F4 / B-F5 — Compartir ubicación: ¿individual o master switch global?

**RESPUESTA DEFINITIVA: por individuo en las tres autoridades. Ninguna muestra un master switch global. La hipótesis de conflicto planteada en el encargo se descarta con evidencia.**

| Autoridad | Modelo |
|---|---|
| **Product Truth** | `:1756-1806` §33 *Privacy Surface*: `Own Member Detail → ••• → Privacidad de ubicación`. Teen: `Tu ubicación se comparte con / Familia García` + `Precisión: ● Exacta / ○ Reducida temporalmente`. Adult: `Exacta / Aproximada / Pausar ubicación`. `:1032-1053` Privacy Mode reduce precisión **temporalmente**. `:802` *"Teen temporary Privacy Mode cannot be silently broken."* `:2627` *"Teen Privacy Mode never means silent disappearance."* `:1480-1499` Presence necesita **una ubicación autoritativa por User/Member**; la configuración vive en Account/Profile, **no en Familia**. |
| **Figma** | **Sin control real.** `Familia.tsx:256` `<Row title="Privacidad" subtitle="Qué comparte con la familia" onPress={() => {}} />` — fila muerta. `:291` *"Toca para cambiar el rol"* con `onPress={() => {}}`. `:299-303` permisos read-only. `:370` `Row title="Cuando alguien llegue" subtitle="Avisarme" onPress={() => {}}`. `Toggle` importado (`:4`) y **nunca renderizado** (0 ocurrencias de `<Toggle` en `Familia.tsx`). **Cero** `Compartir`/`Detener`/`Pausar`/selector de precisión. La única UI de ubicación es texto fijo en el overlay SOS (`Overlays.tsx:1037-1039`). |
| **Integration** | Switch **por miembro real**: `sharing_mode: 'off'\|'foreground'\|'foregroundAndBackground'` (`presence.ts:40-47`); `PUT /api/presence/location` sólo escribe la fila del actor (`presence.locations.service.js:137-143,167-171`); trigger fuerza `sharing_enabled := sharing_mode <> 'off'` y borra coordenadas cuando es off (`20260904010000:22-30`). El modelo per-viewer correcto **existe en DB** (`location_share_grants` owner↔viewer `:39-48`, consumido por `can_view_presence` `:260-295`) pero **ningún endpoint ni servicio lo lee o escribe** (0 hits). Efecto real: todo miembro activo ve a todo miembro activo que compartía (RLS `20260917000100:11-19`). |

**Veredicto:**
- El modelo de **switch individual** es correcto en los tres lados. **No hay master switch global en ninguna autoridad** → **no hay conflicto semántico**. Se registra explícitamente para que Sessions 7/8 no introduzcan uno.
- **Lo que falta en todas partes:** los controles de Product Truth §33 `Precisión exacta|reducida` y `Pausar`. Figma no los diseña; Integration no los implementa; Product Truth los exige → **SC-09**.
- La granularidad por viewer existe **sólo en el esquema**. Presentarla sería inventar.

### 10.4 B-F6 — ¿ETA es capacidad real?

**NO. Ausente en las tres autoridades, y Product Truth la clasifica explícitamente como candidata futura.**

- **Product Truth:** `people_presence:2798-2812` §54 `FUTURE CANDIDATES — NOT DISCARDED` → `- ETA;` + *"Each requires a separate future Product Pass."* Búsqueda de `\bETA\b|estimated time|tiempo estimado|llegada estimada` en Household/Auth/Home/HomeCloud freezes y en ambos presentation masters → **0 coincidencias**.
- **Figma:** `\beta` case-insensitive en `src/**` → **0 coincidencias**. La presencia es un **fixture estático**: `src/types.ts:28` `presence: { place, time, status }` con valores `"ahora"`/`"hace 30 min"` (`data.ts:10,22,31,40`). El propio código lo declara: `src/home/viewer.ts:119-122` *"`Member.presence` es un fixture estático y no tiene escrituras en todo `src/`."* El mapa es un gradiente con pines en **porcentaje literal**: `x="25%" y="45%"`, `x="62%" y="28%"`, `x="75%" y="62%"` (`Familia.tsx:106-108`) y rótulos fijos `Av. Corrientes`/`Florida` (`:102-103`).
- **Integration:** 0 en FE y BE. Lo más cercano es `estimated_duration_minutes` en **tareas** Planner (`plannerTasks.ts:56`), no en presencia. Existe un trigger geofence Haversine que emite `presence.geofence_notification` a un outbox (`20260904010000:142-156`) **sin consumidor**.

→ **Ninguna visual de Figma implica semántica GPS de ETA.** El riesgo es de **interpretación**, no de Figma: si la presentación muestra `"hace 30 min"`, el espectador puede leer "tracking". Eso es **editorial-safe** (el freshness label **sí** es producto real en Integration: `STALE_AFTER_MINUTES=10`), pero **no** debe acompañarse de ninguna promesa de llegada.

### 10.5 B-F7 — Hoja contextual / detalle de miembro

| | Figma | Integration |
|---|---|---|
| Hoja contextual | `MemberDetailScreen` con `Ver tareas de Juan · 2 pendientes`, `Permisos · Rol: Adolescente`, `Privacidad · Qué comparte con la familia` (runtime: `B_FAMILY_MAP_MEMBER_SHEET.png`) | `MemberActionsSheetFinal.tsx:36` — acciones de gestión (rol, quitar, pedir cambio) |
| Detalle de miembro | Sí | **NO implementado.** `FamilyMember.phone` y `date_of_birth` existen en el tipo (`family.ts:30-31`) y **nunca se renderizan**. El endpoint `GET /households/:id/members/:membership_id` (`routes/households.js:28`) **no tiene consumidor FE** |
| Tarjeta contextual de presencia | `Familia.tsx:101-139` | `MapContextCard.tsx` |
| Tareas del miembro | `Ver tareas de Juan · 2 pendientes` en la hoja | No hay navegación a tareas/eventos del miembro |

### 10.6 Delta Family

Coincidencia fuerte en tabs con Product Truth (3/3), gap de 1 tab en Integration. Mapa: Figma visualmente más limpio y coherente con la regla "full-focus" — salvo el bloque `AHORA` inferior. Lugares: Figma diseñado, Integration con schema y cero aplicación. Ubicación: individual en los tres lados, sin conflicto; faltan los controles de precisión/pausa en los dos lados implementables. ETA: ausente en los tres. Miembro: Figma diseñado, Integration parcial con un endpoint huérfano.

---

## 11. B — FEED

### 11.1 B-FEED1 — ¿Feed o chat?

| Autoridad | Veredicto |
|---|---|
| **Product Truth** (`FEED_PRODUCT_FREEZE_V1.0.md`, FROZEN 2026-09-02) | **Feed = espacio social compartido del hogar.** `:86-98` *"¿Qué compartimos como casa?… Su objetivo no es transformarse en una red social general."* `:102-120` `MENSAJES ├── FEED └── CONVERSACIONES`. `:142-169` §5 **FEED NO ES GROUP CHAT** — *"Representa: 'esto queremos compartirlo con toda la casa'"*. `:124-138` §4 FEED REPLAZA `GENERAL` — *"No debe reaparecer un chat General paralelo al Feed."* `:344-364` §14 MODELO VISUAL **`FLAT CONTENT + SPACING + DIVIDER`, `NO CARD SOUP`**. `:310-340` §13 FEED ≠ ACTIVITY. `:571-596` §24 Feed aparece **desde Messages Root**, sin tabs primarias `[Feed\|Groups\|Directs]`. `:232` **el caso del guion ya está textual**: *"`El técnico viene entre las 4 y las 6. ¿Quién puede estar?`"* |
| **Figma** | **Feed retirado.** `src/types.ts:183-185` *"Feed legacy (retirado por Family Conversation V2) … La surface Feed ya no existe."* `data.ts:166-169` *"Feed legacy: fixtures migrados a Family Conversation… Se conservan vacíos."* `FEED_POSTS = []`, `FEED_COMMENTS = []`, sin importadores. `Messages.tsx:1024-1036` `family-feed` y `feed-comments` son **alias que renderizan `ConversationScreen convId="c1"`**, con el comentario *"No hay composer post-centric ni comments"*. **Cero** `push('family-feed')` en `src/**`. `Messages.tsx:164` *"Sin mini-feed ni reactions"* (salvo reactions de mensaje). |
| **Integration** | **STUB puro.** `FeedFamiliarScreen.tsx` (359 L), route `FeedFamiliar` en `PrivateStack`, sin tab, sólo desde `Más > Actividad`, y **el propio producto lo marca `isDemo: true`** (`MoreScreen.tsx:31,93`). `MOCK_POSTS`/`MOCK_HITOS` constantes (`:39-91`). `publishPost` = `setState` (`:121-138`). Botón comentario **sin `onPress`** (`:214-217`). Botón compartir **sin `onPress`** (`:219-221`). **0 tablas** `feed_*` en las 110 migraciones. **0** dominio `conversation`/`chat`/`message` en las 388 `.ts/.tsx`. |

### 11.2 B-FEED2..6 — Capabilities

| # | Pregunta | Respuesta con evidencia |
|---|---|---|
| **B-FEED2** | ¿Composer? | **PT:** APPROVED — `:391-413` §16 `Feed Root ofrece: "Compartir algo con la familia…" → Create Feed Post`; `:417-429` §17 *"¿Qué querés compartir? / Foto / video / Publicar"*; `:438-444` *"No agregar por defecto: categoría, tipo de publicación, estado, contexto burocrático, metadata de proyecto"*. **Figma:** no existe como composer post-centric (`Messages.tsx:1025`). **Integration:** modal "Publicar" que sólo muta `useState` y cierra (`:265,134`). |
| **B-FEED3** | ¿Posts persistidos? | **PT:** sí, implícitamente. **Figma:** `FEED_POSTS = []`, sin store. **Integration:** **NINGUNA** — ni local ni remota. |
| **B-FEED4** | ¿Comentarios? | **PT:** APPROVED, pero **motor compartido**: `:499-516` §20 `COMMENTS → shared conversation engine` + *"No crear un segundo comments subsystem paralelo."* **Figma:** `FeedCommentsScreen` es alias de `ConversationScreen` — *"la ruta `feed-comments` ya no existe (comments → reply)"* (`Messages.tsx:1031-1035`). **Integration:** botón decorativo sin `onPress`. |
| **B-FEED5** | ¿reacciones? | **PT:** APPROVED — `:472-495` §19 `❤️ 👍 😂 😮 😢 +` + `ONE SHARED REACTION CAPABILITY` + *"No crear un sistema distinto de reactions exclusivo para Feed."* **Figma:** reactions **sólo de mensaje** (`Messages.tsx:1737-1739,1795`; fixtures `data.ts:189`). **Integration:** `toggleReaction` sólo incrementa un contador en memoria (`FeedFamiliarScreen.tsx:140-149`). |
| **B-FEED6** | ¿adjuntos? | **PT:** `TEXT / PHOTO / VIDEO → CURRENT FROZEN BASELINE`; `FILES → LEGACY INTENT / NOT RECONFIRMED`; `INTERNAL LINKS → LEGACY INTENT / NOT RECONFIRMED` (`:783-814`); listados fuera del freeze (`:999-1002`). **Figma:** mensajes sí tienen `kind: photo\|video\|file\|voice` (`types.ts:144`), pero **el Feed ya no existe**. **Integration:** el tipo `Post` local no tiene adjuntos. |

### 11.3 B-FEED7 — Delta Feed: la posición exacta

```
Product Truth : Feed social plano (FLAT + SPACING + DIVIDER), dentro de Mensajes, con composer, reactions y comments sobre motor compartido
Figma         : Feed RETIRADO. Sustituido por conversación familiar chat-shaped. El visual plano congelado ya no existe en src/
Integration   : Feed STUB en memoria, 0 persistencia, marcado isDemo por el propio producto
```

Esto **no es** "VISUAL TARGET AHEAD" ni "IMPLEMENTATION GAP": es una **reinterpretación del modelo de superficie** que Product Truth no ha ratified → **SC-06 (§20)**, la segunda ambigüedad P0 después de Shopping.

Lo que sí es cierto y accionable: **el caso textual del guion ya está en Product Truth** (`FEED:232`, verbatim). Eso convierte el momento del guion en una cita de autoridad, no en una invención.

### 11.4 Feed — presentación-seguridad

| Opción | Veredicto |
|---|---|
| Mostrar una pantalla "Feed" | **DO NOT SHOW AS WORKING CAPABILITY.** No existe en ninguno de los dos lados como superficie de posts. |
| Mostrar `Mensajes` root | **SAFE WITH IMPLEMENTATION-GAP NOTE.** Es la superficie real de Figma y la autoridad Mensajes está FROZEN; Integration no tiene el dominio. |
| Mostrar `Mensajes → Familia García` | **SAFE WITH IMPLEMENTATION-GAP NOTE.** Es donde Figma cocinó el caso del guion. |
| Mostrar el mensaje "El técnico viene entre las 4 y las 6" | **SAFE TO SHOW AS PRODUCT** — copy exacto de `FEED:232`. La **transición hacia él** debe ser editorial o de dispositivo, no un tap inventado: en Figma se llega desde Mensajes root por `push('conversation', {convId:'c1'})` (`Messages.tsx:704-708`) — **REAL_NAV dentro de Figma pero inexistente en Integration**. |
| Mostrar reactions/likes sobre posts | **DO NOT SHOW.** El motor es compartido con Mensajes y no está implementado. |
| Mostrar comentarios | **DO NOT SHOW.** |
| Reutilizar el visual de `FamilyFeedScreen` | **DO NOT REUSE.** No existe como anatomía: es un alias de conversación. |

---

## 12. C — PLANS

### 12.1 Modelo canónico

**`PLAN = TASKS + EVENTS + MEASUREMENTS`.** Verificado en los tres lados:

| Componente | Product Truth | Figma (medido) | Integration |
|---|---|---|---|
| **TASKS** | `:47-57` ✔ | `TAREAS · 0` ✔ | `planner_tasks` + `planner_goals.goal_id` (`202607080004:116`) |
| **EVENTS** | `:47-57` ✔ | `EVENTOS · 1/2` ✔ | `planner_events` (sin `plan_id` — ver §19) |
| **MEASUREMENTS** | `:47-57` ✔ | `MEDICIONES · 0` ✔ | `progress_mode` incluye `numeric`/`boolean` (`202607100001:14`) |
| **MILESTONE** | **PROHIBIDO** (`:302-309`) | ausente ✔ | `planner_goal_milestones` presente — **excede Product Truth** |

Restricciones de Product Truth relevantes: `:28-35` *"El mínimo conceptual es el objetivo/título. Un Plan puede crearse vacío."* · `:147-168` §10 *"No existe un único porcentaje universal que mezcle Tasks, Events y Measurements"* · `:170-174` §11 *"Completar un Plan **NO** completa sus hijos"* · `:112-118` §8 Readiness *"lectura derivada, no una entidad"* · `:213-216` estados `Active/Paused/Completed/Cancelled` · `:234-246` §14 *"Archive es ortogonal al lifecycle"*.

### 12.2 ¿Es semánticamente válido un "Birthday Plan"?

**SÍ, y es ejemplo canónico de la autoridad.**

`PLANS_PRODUCT_TRUTH_V1_AND_FIGMA_AUDIT.md:276-300`:
> `## 18. Plan vacío` / `Son válidos: Vacaciones 2027 / Todavía no agregaste nada.`
> …
> `Cumpleaños` / `2 Events` / `No existe obligación de tener los tres tipos de contenido.`

El freeze usa `Cumpleaños` como ejemplo de Plan válido con 2 Events y 0 Tasks. **La equivalencia "Birthday Plan" = Plan de Cumpleaños es inferencia mía**, pero la instancia es literalmente la que Figma muestra y coincide con la autoridad. `:30` `Un Plan puede crearse vacío` y `:300` `No existe un mínimo obligatorio de Tasks, Events o Measurements` confirman que `TAREAS · 0` es legal.

### 12.3 Superficies Figma identificadas

`B_PLANNER_PLANS.png` (list, filtro `En curso`), `C_PLAN_DETAIL_BIRTHDAY.png` (Events), `C_PLAN_DETAIL_MEASUREMENT.png` (Measurements), `B_PLANNER_CALENDAR.png` (Events+Tareas en un timeline), `B_PLANNER_TASKS.png`, `B_PLANNER_RESPONSIBILITIES.png`.

Elemento cross-module en Figma Planner: **ninguno**. Búsqueda de `inventario|compras|inventory|activo|homecloud|recuerdo|album` en `src/planner/**` → 0. Lo único es texto de fixture: `fixtures.ts:379` `"Armar la lista de compras del mes con precios de referencia del barrio"` (una **tarea**, no un link) y `fixtures.ts:395` `"Imprimir el album de la muda"`.

### 12.4 Comportamiento visual no respaldado

| Comportamiento Figma | Product Truth | Veredicto |
|---|---|---|
| Porcentaje de Plan | `PLANS_PRODUCT_TRUTH:147-168` §10 — sin porcentaje universal | **MATCH.** El porcentaje aparece **sólo cuando el Plan clasifica** (≥2 tipos discretos) y siempre con su conteo (`50% · Falta 1 cosa`, `33% · Faltan 3 cosas`, `19% · Faltan 21 cosas`). Los dos Planes que no clasifican **no lo muestran**: `Comprar auto · Ahorro · $650.000 / $5.000.000` y `15 de Martina · Listo para completar`. Corroborado por `PLANNER_FIGMA_TOTAL_FREEZE_V1:68,798,812,1590` y por `aria-valuetext` con la cuenta de verdad (`Plans.tsx:596-602`). Ver SC-04 |
| Filtros por lifecycle `En curso/Completados/Cancelados` | APPROVED (`:213-216`) | MATCH |
| `Falta 1 cosa necesaria` / `Faltan 3 cosas` | Derivado, coherente con Readiness | MATCH |
| Empty state de Plan (`Todavía no agregaste nada.`) | APPROVED (`:276-284`) | MATCH |
| `Comprar auto · Ahorro · $650.000 / $5.000.000` | `:366-386` incluye MEASUREMENT `¿Cuánto llevamos?` | MATCH (es una Measurement) |
| Milestones visibles | PROHIBIDO | No aparece en Figma ✔ |

---

## 13. C — INVENTORY

### 13.1 Modelo canónico

| Concepto | Product Truth (`INVENTORY_PRODUCT_FREEZE_V1.0`) | Figma | Integration |
|---|---|---|---|
| Entidad principal | **Inventory Item** (no "Product") `:309-323` — *"un tipo de producto, insumo o consumible fungible cuya identidad se expresa mediante cantidad/stock"*, *"No representa cada unidad física individual"* | `productStatus()` con `agotado`/`poco` (`inventory/v11.ts:27-32`) | `inventory_items` (`202607080001:36-51`) — nombre de tabla correcto |
| Mínimo de alta | `Name / Canonical Unit / Current Quantity` `:345-353`; `Una unidad canónica por Item` `:386-397`; `quantity >= 0` `:399-405` | ✔ | ✔ `inventory_items_quantity_check` (`202607080001:59-63`) |
| Lugar | **Storage Space** (no "Place") `:454-486` — *"HomePlus no necesita comprender semánticamente qué tipo de espacio es"* | Heladera / Alacena / Baño / Cocina + `Ver lugares` + `Nuevo lugar` | **NO EXISTE.** `inventory_items` no tiene columna de lugar |
| Regla de cardinality | **`:488-497` `0..N Storage Spaces`** con ejemplo explícito de multi-place: *`Coca-Cola / Quantity: 9 / Stored in: - Heladera - Alacena`*. `:499-508` §07.4 *"La cantidad canónica es **global** por Item. Core V1 no exige: Heladera = 3 / Alacena = 6"*. `:2163-2173` `INV-INV-010 — Core quantity is global` | Figma muestra **filtro por lugar** con conteo, no multi-place por ítem | **NO representable** |
| Frontera con Assets | `:325-343` `4 botellas de leche → Inventory` / `Heladera Samsung → Asset` | ✔ implícito | ✔ por diseño |
| Movimiento | `:232-235` `MOVEMENT / ADD / REMOVE-CONSUME / ADJUST` | decremento inline | `inventory_item_movements` (`202607080001:65-76`) — **pero sin endpoint de lectura** |

### 13.2 La regla "one product → 0..1 Place"

**REFUTADA por la autoridad vigente.** La regla real es **`0..N` Storage Spaces por Item, con cantidad global**. La formulación `0..1` no aparece en ningún documento de producto — es una simplificación.

Consecuencia para la presentación: la vista "por lugar" de Figma **sí** está aprobada, pero como filtro/agrupación sobre `0..N` Storage Spaces, **no** como la regla de que cada producto vive en un solo lugar. Si la presentación muestra "Leche → Heladera" como relación única, contradice `INVENTORY:488-508`.

### 13.3 Semántica exacta de "queda 1" / "0" / "agotado"

`INVENTORY_PRODUCT_FREEZE_V1.0.md:761-790`:
> `## 12.1 With Minimum configured` → `quantity > minimum → NORMAL` · `0 < quantity <= minimum → LOW` · `quantity = 0 → OUT`
> `## 12.2 Without Minimum` → `quantity > 0 → NORMAL / AVAILABLE` · `quantity = 0 → OUT`
> `## 12.3 Derived state` → `El usuario no marca manualmente LOW/OUT.`
> `:2183-2185` `INV-INV-013 — Stock states are derived`

| Expresión | Regla derivada | Figma | Integration |
|---|---|---|---|
| **"queda 1"** | Si `minimum >= 1`: `0 < 1 <= minimum` → **LOW**. Si `minimum = 0`: `1 > 0` → **NORMAL**. **No existe estado propio "queda 1".** | chip `Poco 1` | `getItemStatus` usa `quantity <= low_stock_threshold` (`InventarioScreen.tsx:93-94`), default `1` (`202607080001:44`) → LOW. **MATCH** |
| **"0"** | `quantity = 0` → **OUT** | chip `Agotados 1` | `is_out_of_stock` generated `always as (quantity <= 0) stored` (`202607080001:45`); label "Sin stock" (`InventarioScreen.tsx:99`). **MATCH semántico** |
| **"agotado"** | No es estado almacenado: es el derivado OUT | rótulo de filtro `Agotados` | bucket `out` (`inventory.service.js:415`); `POST /out-of-stock` fuerza `quantity=0` (`:353-376`). **MATCH** |
| Marcado manual | **PROHIBIDO** | — | No hay UI para marcar LOW/OUT. **MATCH** |

**Nota de terminología:** Product Truth y Figma dicen **"agotado"/"Agotados"**; Integration renderiza **"Sin stock"** con el mismo bucket. Diferencia de copy, no de modelo. La presentación debe usar el término de Product Truth/Figma.

### 13.4 Delta Inventory

Modelo **MATCH** en los tres lados (Item, cantidad global, estados derivados). Dos gaps: **(a)** Integration **no tiene el eje de lugar** pese a que las 6 tablas de Places/Geofence existen en DB con RLS, triggers y outbox pero **0 servicios**; **(b)** Integration tiene **escritura** de consumo pero **no lectura** del historial. Figma muestra ambos.

---

## 14. C — SHOPPING LIST — VEREDICTO DEFINITIVO

### 14.1 Las 8 preguntas

| # | Pregunta | Respuesta | Evidencia |
|---|---|---|---|
| **1** | ¿Shopping List es capacidad de producto aprobada? | **NO. Excluida explícitamente por nombre.** | `INVENTORY_PRODUCT_FREEZE_V1.0.md:800-802` `No es una Task. / No es una Shopping List.` · `:971-977` `Para reponer es una vista de Restock Needs: state = PENDING. No es una entidad Shopping List independiente.` · `:120` `Restock Needs se acumulan sin crear una Shopping List paralela` · `:2115-2121` `Inventory no debe convertirse en: … - duplicate Shopping List; - duplicate Planner; - duplicate Finance;` · `:121` `Dispatch usa Planner` |
| **2** | ¿Está en Figma? | **SÍ, y es una superficie completa con máquina de estados.** | `C_SHOPPING_LIST.png`; `src/inventory/ShoppingList.tsx` (27 868 B); `src/screens/Shopping.tsx` (602 B, alias a `InventoryRoot tab=lista`) |
| **3** | ¿Está en el frontend de Integration? | **NO.** 0 rutas, 0 pantallas, 0 servicios, 0 tipos. | `MoreStackParamList` (`navigation/types.ts:31-63`) sin key; `HomeTabNavigator.tsx:223-240` registra 13 rutas sin Shopping; `screens/` sin dir `shopping`; los 14 hits de `shopping` en el frontend son el `template_key:'shopping'` de Planner (`plannerTasks.ts:29`, `plannerTemplates.ts:9`) o la categoría Finance `Compras` (`financeCategories.ts:105,124,142`) |
| **4** | ¿Backend? | **NO.** | `backend/index.js:79-95` monta 11 routers, ninguno shopping; no existe `backend/src/routes/shopping.js`; 0 tablas `shopping_*` en las 110 migraciones |
| **5** | ¿Persistencia? | **NO.** Ninguna, en ninguna capa de producto. | — |
| **6** | ¿Puede un ítem de Inventory convertirse en ítem de Shopping? | **Figma: SÍ, automáticamente por umbral.** **Integration: NO** — se convierte en **Planner Task**. **Product Truth: NO como lista**; lo aprobado es **Restock Need**. | Figma `store.tsx:89-142 recalcAuto()` con trigger `autoRestock === true && quantity <= whenLeft` (`:99-104`), switch en `Products.tsx:915,1109`. Integration `inventory.service.js:542-562` `plannerTasksService.createTask({template_key:'shopping', category:'Compras', origin_module:'inventory', origin_entity_type:'inventory_item', origin_entity_id, origin_reason: quantity<=0?'out_of_stock':'low_stock'})`, FK `inventory_restock_requests.planner_task_id` (`202607080001:102`). Product Truth `INVENTORY:813-835` §13.3/§13.4 + `:1050-1059` §16.4 `Dispatch crea/usa una operación canónica de Planner. Inventory no crea un segundo task engine.` |
| **7** | ¿Automático o manual? | **Figma: ambos.** Integration: **automático** (crea la restock request) + **aprobación manual** por coordinador/adulto. Product Truth: ambos, sobre Restock Need. | Figma `store.tsx:99-128` (auto) + `ShoppingList.tsx:160-196 AddShoppingSheet` (manual). Integration `inventory.service.js:121-164 ensureRestockRequest` + `:471-475 assertRestockApprover` + UI `InventarioScreen.tsx:230-252,319`. Product Truth `INVENTORY:813-835` |
| **8** | ¿Qué pasa al completar la compra? | **Figma: sesión de compra completa con total pagado → pantalla Summary.** Integration: **no aplica.** Product Truth: **§14.7 la congeló de otra manera.** | Figma `ShoppingList.tsx:94-97` `Empezar compra` → `store.tsx:369-378 startPurchase()` *"Congelar la planificación en la sesión"* → `ShoppingList.tsx:316-323` `Compra en curso` con progreso → `:360` `Finalizar compra` → `FinalizeSheet` con `Total pagado · opcional` (`:461`) → `:472 push("shopping-summary")` → `:483 SummaryScreen`. Product Truth `:944-953` §14.7 `DISPATCHED → actual ADD movement(s) → current quantity recalculated → replenishment cycle RESOLVED`; y `:170-174` §02.4 ***"Inventory nunca inventa stock porque una Task fue completada."*** |

### 14.2 Lo que Figma añade por encima de cualquier autoridad

Tres cosas en `ShoppingList.tsx` que **no están en ningún documento de producto**:

1. **`totalPaid`** — campo de texto libre que representa dinero. `store.tsx:523` `totalPaid: totalPaid?.trim() ? totalPaid.trim() : undefined`. Sin columna, sin tipo, sin decisión de diseño en ningún freeze.
2. **`"Registrado en Finanzas · {s.totalPaid}"`** (`ShoppingList.tsx:543`) — **afirmación de UI sin ninguna escritura**. `src/inventory/**` no importa el store de Finance; el único hit es un comentario (`:157` *"sin que esta hoja tenga que saber de Finance"*). Contraste directo: el caso **Assets → Finance** sí llama `finance.createExpense(...)` (`assets/Detail.tsx:1880`). Figma sabe hacer el link real cuando existe; aquí afirma uno que no escribió.
3. **`PurchaseSession`** como entidad (`v11.ts:49-54 {active, paused, lines, hideDone}`) — la noción de "compra en curso" con pausa y reanudación. Product Truth no la tiene; describe el **resultado** (`DISPATCHED`), no la sesión.

### 14.3 Veredicto único

> **SHOPPING LIST NO ES UNA CAPACIDAD DE PRODUCTO.**
>
> - **Product Truth: NO APROBADA** — excluida por nombre en el freeze autoritativo de Inventory, tres veces.
> - **Integration: NO IMPLEMENTADA** — 0 en las 5 capas.
> - **Figma: VISUAL PROTOTYPE ONLY** — superficie completa y pulida que **contradice** la autoridad, no que la adelanta.
>
> **Clasificación primaria: SEMANTIC CONFLICT (Figma vs Product Truth). Secundaria: VISUAL PROTOTYPE ONLY (Figma vs Integration).**
> **Capability status: UNSUPPORTED CLAIM.**
> **Presentation-safe: DO NOT SHOW AS WORKING CAPABILITY. Reuse: DO NOT REUSE.**

Lo que SÍ es presentable es la **cadena real y aprobada**: `Stock bajo → Restock Need → aprobación → Planner Task → confirmación de cantidades → Finance registra el gasto`. Esa cadena existe en Product Truth (`INVENTORY:813-835,1050-1059,1128-1133,1414-1418`) y en Integration (`inventory.service.js:542-562`). Y la afirmación textual del master de presentación (`MASTER:616` *"El item faltante se desprende y viaja literalmente a la Shopping List"*) está **desactualizada** respecto de su propia declaración de autoridad (`MASTER:6`).

---

## 15. D — FINANCE

Finance es el único módulo donde los tres lados convergen.

### 15.1 Data contract verificado

| Semántica | Product Truth | Figma (medido) | Integration (fuente) | Match |
|---|---|---|---|---|
| **Personal vs Household** | `FINANCE:348-390` §04.1/§04.2 — Personal *no pertenece al Household*, *sobrevive al cambio de Household activo*, *no se vuelve visible por ser Coordinador/Adulto/pareja* | segmented `Personal \| Hogar` (`testID=finance-scope-switch`) | `FINANCE_CONTEXT_TYPES = {PERSONAL, HOUSEHOLD}` (`finance.constants.js:21-24`); ownership resuelto **server-side**, rechaza `personId/householdId/membershipId` del caller (`finance.context.service.js:88-103`); invariante en DB `finance_*_context_owner_shape_check` | **Sí en modelo.** ⚠ Figma: `dataChanged=false` medido → el switch **no cambia los datos** |
| **ACCOUNT vs CREDIT_CARD** | `:517-528` §06.2 *"`CREDIT_CARD` es un **tipo/presentación de Account**, no un subsystem independiente"*; `:610-628` §07 *"Una Account normal presenta Saldo actual; una Credit Card presenta Deuda actual"* | secciones `Cuentas / Tarjetas / Pozos`; `Galicia`, `Billetera`, `Caja chica`, `Cuenta corriente` | una tabla, un discriminador `account_type text check in ('ACCOUNT','CREDIT_CARD')` (`20260814010000:16,68-72`); única diferencia de storage = `closing_day`/`due_day` nullable (`20260904000000:17-47`); CREDIT_CARD rechaza Income (`finance.account.service.js:616`), ACCOUNT no puede ir negativo (`:216-217`), CARD no puede ser fuente de transferencia | **MATCH total** |
| **known / unknown balance** | *UNKNOWN nunca se muestra como $0* | `Caja chica → Saldo sin establecer` | `balance_state text default 'UNKNOWN' check in ('UNKNOWN','KNOWN')` (`20260814010000:74-78` → `20260814020000:10-14`); **no hay `current_balance` ni `is_known`** — se deriva de `finance_account_balance_anchors` + `finance_account_effects` (`20260814020000:192-224`); agregados guardan `unknown_account_count` (`20260909000000:42-46`) | **MATCH** |
| **Pago con monto desconocido** | `Expected Amount puede ser UNKNOWN. Nunca se reemplaza por zero.` | copy real **`"Monto por definir"`** (`finance/payments.ts:32,35`) | `expected_amount_known boolean` + `expected_amount numeric(18,4)` nullable con check pareado (`:116-123`); FE toggle ( `NewPaymentSheet.tsx:200,233-238,329-337`); BE `finance_payment_expected_amount_required` (`finance.payment.service.js:286-300`). ⚠ al liquidar, `PAID` exige `actual_amount > 0` (`20260826000000:47-62`) | **MATCH** |
| **due date** | APPROVED | `Vencido / Vence hoy / Próximo` | `finance_payment_dues.due_date date not null` (`:45`); `overdue` **no se almacena**, se deriva `status='PENDING' && due_date < today` (`finance.payment.service.js:453`) | **MATCH** |
| **paid state** | `:1228-1246` §31 `PENDING → PAID/SKIPPED/CANCELLED`, `+ due date passed → OVERDUE` derivado · `:1249-1259` §32 *"Un reminder, Attention item o futura Task **nunca** equivalen a dinero movido"* | tiles de tarjeta con deuda/due | `status check in ('PENDING','CANCELLED','PAID','SKIPPED')` (`20260914000000:5-10`); columnas `actual_amount/actual_date/paid_at/actual_category_id/actual_account_id/expense_root_transaction_id/transfer_id` (`20260826000000:20-27`); `finance_payment_dues_paid_integrity_check` (`:45-62`) | **MATCH en modelo.** ⚠ Figma `PaymentsList` no renderiza el bucket `paid` |
| **movement categories** | `:691-707` §09 primitivas `INCOME/EXPENSE/TRANSFER`; `:971-981` §20.1 base nativa | selector `Categoría` + `Administrar categorías` | `finance_categories` con `category_kind in ('native','custom')` (`20260813010000:34-38`); **16 nativas sembradas** (12 gasto + 4 ingreso, incl. `('native','expense','shopping','Compras',70)`) `:228-258`; nativas inmutables vía API (`finance.category.service.js:260-268`), custom gestionadas por el usuario | **MATCH** |
| **historical movement** | §17 Transaction editing + §08 Balance correction | `Mes anterior / Mes siguiente` en Movimientos, Análisis y Límites | `GET /movements` y `/summary` **requieren** `period` `YYYY-MM` (`finance.read.service.js:43,127-140`); Análisis `MONTHLY \| YEARLY` (`finance.analysis.service.js:12-13`). ⚠ Figma Pagos **no** tiene selector mensual, **por decisión documentada** (`FinancePagos.tsx:50-52` *"Pagos NO tiene selector mensual: no comparte espacio con las surfaces que sí lo tienen"*) | **MATCH.** La ausencia en Pagos es intencional y documentada |
| **trash / restore** | `:912-930` §18 `ACTIVE → TRASH → RESTORE`; Trash **no** afecta Account Balance, Budget ni Reports | `Papelera vacía / y podés restaurarlos` + sheet `Restaurar` | `status` + `trashed_at` con check de consistencia (`20260815020000:10-38`); vía **RPCs**, no escrituras directas: `finance_trash_transaction_v1` (`20260815030000:10`), `finance_trash_transfer_v1` (`20260907000005:125`); restore **rechazado** si la compra ya liquidó un resumen de tarjeta (`finance.transaction.restore.service.js:79`) | **MATCH total** |
| **refund / correction** | `:934-954` §19 `Refund representa devolución real de un Expense previo. No es Income.` | sheets en movement detail | `finance_refund_events` + `POST /refunds`, `/refunds/correct`, `/transactions/correct`; corrección estructural **prohibida** si la compra ya liquidó (`finance.transaction.correction.service.js:209,212`) | **MATCH** |

### 15.2 Dónde Figma está visualmente adelante sin conflicto semántico

1. **Anatomía de fila y densidad** — `D_FINANCE_MOVEMENTS.png` muestra filas con avatar de categoría, título, subtítulo de cuenta, importe alineado a la derecha con color semántico y estado. Integration tiene los datos pero su composición es más densa y menos jerarquizada.
2. **Agrupación de Resumen** — `Ingresos / Gastamos / Balance` como trío de cifras + `Tu dinero: Disponible / Organizado / Sin organizar` + `Organizar` como acción. El modelo de "pool" de Integration (`finance_pools`, `finance_pool_operations`) soporta exactamente esto.
3. **Límites de gasto** — `Gastaste X de Y / Te quedan Z / Superaste por 27.000` + desglose `General` vs `Por categoría` (texto medido en `verify-probes.json`). Integration tiene `finance_spending_limit_series/versions/exceptions` completo. MATCH, sólo Figma lo cuenta bien.
4. **Barra de progreso y segmented control** de Pagos, y el detalle de tarjeta con `Deuda actual` vs `Saldo actual`.

**Ninguno de estos cuatro introduce semántica no aprobada.** Se pueden reutilizar casi 1:1.

### 15.3 Advertencias de Finance

- `Administrar` es un **sheet multi-destino**, no una pestaña. `D_FINANCE_ADMIN.png` navegó a `Límites de gasto`; `D_FINANCE_ORGANIZAR.png` a la lista de cuentas. Los destinos de `Administrar` (Cuentas, Categorías, Límites, Papelera, Pozos) están implementados y verificados en Integration por fuente, **pero no se capturó cada uno por separado**: se marcan como verificados por fuente, no por captura.
- **El switch de scope en Figma no cambia los datos** (`verify-probes.json` → `dataChanged: false`). Es visual, no funcional dentro del prototipo. Integration sí resuelve el scope server-side, aunque no lo persiste.

---

## 16. E — ASSETS

### 16.1 Prioridad P0: no concluir que Assets es fake

**Assets NO es fake. Es el caso más claro de "producto aprobado, implementación pendiente" de toda la campaña.**

### 16.2 PRODUCT TRUTH vs FIGMA — la coincidencia más precisa de la campaña

`HOMePLUS_ASSETS_PRODUCT_FREEZE_V2.0.md:3-6` `Estado: FROZEN — Product Target` · `:27-30` `LOGICALLY_CLOSED / PRODUCT_BEHAVIOR_COMPLETE / READY_FOR_IMPLEMENTATION` · `:33` `Este documento define TARGET`.

| Campo | Product Truth | Figma (`E_ASSET_PS5.png`) | Match |
|---|---|---|---|
| Jerarquía del detail | `:730-738` §62 `IDENTIDAD → PERSONAS Y UBICACIÓN → PRÓXIMO → DATOS Y DOCUMENTOS → HISTORIAL` | **Idéntica, en ese orden exacto** | **MATCH** |
| Orden único | `:768` *"Main Detail muestra current/next/latest/most relevant; secondary surfaces contienen profundidad"* | `assets/Detail.tsx:2` *"Orden único: Identidad → Personas y ubicación → Próximo → Datos y documentos → Historial"*; `:3` *"Nada de dominios separados (Importario / Mantenimiento / Documentos / Dinero)"* | **MATCH** |
| Identidad mínima | `:185-201` §8 `CREATE FIRST ENRICH LATER`: sólo `Name` + `System Profile` | `PlayStation 5` / `Consola` + avatar + `+ Agregar` / `Administrar` | **MATCH** |
| System Profile | `:140-149` §6 exactamente `STANDARD / VEHICLE / PET / PROPERTY`; `:151-152` `STANDARD` → *"Objeto o equipo"*, *"No existe `DEVICE` como System Profile"* | filtros `Todos/Objetos/Vehículos/Mascotas/Propiedades` (`assets/Root.tsx:30,38-44`); labels canónicos `Objeto o equipo/Vehículo/Mascota/Propiedad` (`assets/types.ts:120-125`) | **MATCH exacto, incluyendo la decisión de no tener DEVICE** |
| Profile ≠ Category | `:165-181` §7 `Category 0..1 por Asset, optional, Household-scoped`; *"Nunca modifica lifecycle, permissions, Records, Care u ownership"* | filtro por Profile, no por Category | MATCH |
| Responsible / Holder / Placement | `:205-243` tres dimensiones 0..1 **independientes**; `:253-255` §13 *"Son dimensiones independientes"* | `Ahora con Tomi` / `Está en Casa de Tomi` / `A cargo de Gabriel` + `Editar`; el editor dice literalmente *"Responsable, quién lo tiene y dónde está son tres cosas distintas"* (`Detail.tsx:1096`) | **MATCH exacto** |
| Asset Record — Warranty | `:259-284` §14 tipos core `WARRANTY/INSURANCE/REGISTRATION/INSPECTION/SERVICE CONTRACT/OTHER`; `Requiere Title + Type`; `1..N Assets`, `0..N HomeCloud Files`, `0..N Planner actions/context` | `Garantía PlayStation 5` / `Garantía · hasta enero de 2027 · 1 documento` | **MATCH** |
| Documentos | `:360-377` §22 `HomeCloud posee el File canónico`; `File ↔ Asset`; `:372` *"Assets no crea un Drive paralelo"* | `Factura de compra.pdf` / `PDF · 1,1 MB` en `DATOS Y DOCUMENTOS` | **MATCH** |
| **Precio / fecha de compra** | **AUSENTE.** `:345-349` §21 `Finance posee amount, currency, … date …`. `:843` `money owned by Assets` en EXPLICITLY NOT CORE V2. Búsqueda exhaustiva en 1 377 líneas: 3 hits, ninguno sobre valor o fecha de compra. | **AUSENTE.** Cero campos `purchaseDate/purchasePrice/valor/precio` en `src/assets/**`. Lo único es el nombre de un archivo (`data.ts:332`) | **MATCH — Figma NO tiene lo que el master de presentación pedía** |
| **Mantenimiento** | `:841-842` `MaintenancePlan owned by Assets` en EXPLICITLY NOT CORE; `:886` `→ Planner-owned temporal work`; `:321-326` §19 `qué hay que hacer → Planner / qué ocurrió → Care` | `CareEntry` = "qué ocurrió"; lo que hay que hacer sale a Planner: `Detail.tsx:2334 push('create-task'\|'create-event', {assetId, assetName})` | **MATCH** |
| **Dinero** | `:351-354` `Transaction ↔ 0..N Assets`; `:356` `Finance correction/refund/trash no reescribe Asset/Care` | `assets/types.ts:9-10` *"un hecho guarda una REFERENCIA al movimiento canónico de Finance (`expenseId`), **nunca un monto paralelo**"*; `Detail.tsx:2162` `openFinanceSheet('movement-detail', {movementId: c.expenseId})`; y al revés, `Detail.tsx:1880` `finance.createExpense(...)` | **MATCH — Figma implementa la relación bidireccional que Product Truth congeló** |
| Próximo (Planner projection) | `:321-326` §19 | `PRÓXIMO → Nada pendiente`; `Detail.tsx:352-387` *"PRÓXIMO: proyección del Planner. Sólo lectura."*; `:2412` *"Se resuelve en el Planner: ahí se marca como hecho. Acá no se completa nada."* | **MATCH** |
| Fin de vida | Archive ortogonal; `Inactive ≠ Archived ≠ Trash` (`assets/types.ts:8`) | `Archivados 1 · conservan su historia` / `Papelera 1 · solo duplicados o errores`; `Detail.tsx:254-297` con `Reactivar` y `Restaurar` | MATCH |

**Conclusión de §16.2: la superficie de Asset de Figma-app no es una aproximación — es una transcripción del freeze, incluyendo tres decisiones negativas que el master de presentación había pedido incumplir.** Se puede reutilizar 1:1 y no requiere corrección semántica.

### 16.3 INTEGRATION: NOT IMPLEMENTED (con residuo)

| Capa | Resultado |
|---|---|
| FE | **0 pantallas, 0 rutas, 0 servicios.** `MoreStackParamList` (`navigation/types.ts:31-63`) sin `Assets`; `HomeTabNavigator.tsx:223-240` registra 13 rutas sin Assets; `SimpleModuleId` (`simpleModuleRegistry.ts:3`) sin `assets`; `screens/MoreScreen.tsx:12-53` con 4 entradas, sin Assets. Búsqueda de `asset` en 388 `.ts/.tsx`: los únicos hits son `require('../assets/icons/icon.png')`, `result.assets[0]` de los pickers, `creditCardHasSettlementProgress` (substring) y `assetAccounts` (alias local). **0 hits** de `ps5`, `garanti*`, `warranty`, `mantenimiento`, `maintenance` |
| BE | **ABSENT.** No existe `backend/src/routes/assets.js`; `backend/index.js:79-95` monta 12 routers, ninguno de assets. Único hit de `asset` en BE: `planner.tasks.service.js:12` (allowlist de `origin_module`) |
| DB | **ABSENT.** 0 tablas `asset*` en las 110 migraciones; 0 `alter table ... asset*`; **0 columnas `asset_id`** en todo el esquema |
| Residuo taxonómico | `planner_tasks.origin_module` acepta el valor `'assets'` (`202607080003:21`, re-declarado en `20260916000002:24`) sin módulo detrás; `constants/icons.tsx:59` `assets: 'cube'` sin consumidor |

→ **VERDICT: NOT IMPLEMENTED.** Es un *implementation gap* total, no un intento parcial.

### 16.4 Clasificación de las tres salidas del encargo

**PRODUCT-SUPPORTED SURFACES** (autorizadas y con target visual): Activos root con filtros por System Profile · Asset detail con las 5 secciones · Asset Record de tipo WARRANTY · Asset Record de tipo OTRO · Person Responsible / Current Holder / Current Placement · Próximo como proyección de Planner · Historial · Archive / Trash / Restore · Crear y editar Asset · Informe de problema (`report-issue`).

**IMPLEMENTED SURFACES** en Integration: **ninguna**.

**MISSING IMPLEMENTATION**: el 100% del módulo.

**FIGMA VISUAL TARGET**: 2 capturas (`E_ASSETS.png`, `E_ASSET_PS5.png`) + 3 sub-destinos verificados por fuente (`assets-archived`, `assets-trash`, `report-issue`, `asset-detail` con `CareEntry` form y `Programar algo`).

---

### 16.5 E — PS5 EXAMPLE: VALID DEMO DATA, NOT PRODUCT FEATURE

#### 16.5.1 Determinación

| Pregunta | Respuesta | Evidencia |
|---|---|---|
| ¿`PS5`/`PlayStation` aparece en Product Truth? | **NO. 0 coincidencias** en los 5 freezes principales | `ASSETS_V2.0`, `PLANS_PRODUCT_TRUTH_V1`, `HOMECLOUD_PRODUCT_FREEZE_V1.0`, `HOMECLOUD_PRODUCT_EXPERIENCE_FREEZE_V2`, `HOMECLOUD_FILES_HANDOFF` → todos 0 |
| ¿Aparece en Figma-app? | **Sí**, como fixture | `data.ts:332` `name: 'Factura de compra.pdf'`; el asset `PlayStation 5 · Consola · Ahora con Tomi` está en la lista de `E_ASSETS.png` |
| ¿Aparece en Integration? | **NO. 0 hits** de `ps5` en las 388 `.ts/.tsx` | — |
| ¿Lo clasifica algún documento? | **SÍ, explícitamente** | `HOMEPLUS_PRESENTATION_MASTER_FREEZE_V1.0.md:214` *"| PlayStation 5 | compra histórica usada para Finance → Assets → HomeCloud; **demo sugerida**: Mar 2024 / $580.000 salvo que se cambie globalmente. |"*; `HOMEPLUS_PRESENTATION_NO_UI_MASTER_FREEZE_V2.0.md:1275-1280` `PS5 Mar 2024 · $580.000` dentro de la sección **`DEMO DATA CANON`** |

#### 16.5.2 Veredicto

> **PS5 = VALID DEMO DATA, NOT A PRODUCT FEATURE.**
>
> - No es una capability: no hay ningún comportamiento de producto que dependa de que exista un activo llamado PS5.
> - Es un **ejemplo de demostración** autorizado explícitamente por ambos presentation masters.
> - **No se requiere que Integration contenga un registro PS5** para que la capacidad Assets sea válida. El requirement de implementación es el dominio, no el datum.
> - La capacidad Assets es válida y está aprobada; su implementación está pendiente.
>
> **Presentación-safe: SAFE TO SHOW (como Asset de demostración). Reuse: DIRECT REUSE.**

**Advertencia de coherencia de datos:** el master de presentación propone `Mar 2024 / $580.000` como "demo sugerida". Pero (a) `HOMePLUS_ASSETS_PRODUCT_FREEZE_V2.0.md:345-349,843` asigna `amount` y `date` a **Finance**, y (b) el Asset detail de Figma **no tiene** esos campos. Por lo tanto `Mar 2024 / $580.000` **no puede aparecer en la tarjeta de Asset**. Puede aparecer **únicamente** como el movimiento de Finance referenciado. Ver §20 (SC-05).

---

## 17. E — HOMECLOUD FILES

### 17.1 Superficies y estado

| Superficie | Figma | Integration | Estado |
|---|---|---|---|
| Files root | POLISHED — folders `Casa`/`Auto` + archivos con estado de subida (`1 subida`, `Subiendo…`, `00:42`) | Browse real | **PARTIAL** |
| Carpetas | POLISHED — `Opciones de carpeta`, `Agregar archivo a Casa` | **MATCH** — *"flat, no parent_id, no lifecycle, no ACL"* | **IMPLEMENTED** |
| File info / metadata | POLISHED — `Nombre`, `Nota`, `Carpeta`, `Fecha del documento` | `PATCH /content/:contentId/file` — `display_name`, `note`, `folder_id`, `document_date` | **IMPLEMENTED** |
| Upload / intake | POLISHED — `Agregar a Archivos` | Pipeline 4 pasos `register → upload → verify → finalize` | **IMPLEMENTED** |
| **Abrir / ver el archivo** | POLISHED (viewer) | **NO hay visor.** `FileTile` sólo tiene `onMore`; `fetchHomeCloudContentAccess` nunca se invoca desde UI | **MISSING** |
| Trash / restore | POLISHED | **0 endpoints**; las columnas `trashed_at/lifecycle` existen pero **ningún writer** | **MISSING** (y fuera de V1 para carpetas) |
| Scanner | No | No (2 menciones en comentarios) | **ABSENT** en ambos |

**Terminología de Figma que coincide exactamente con el freeze:** `Archivos` / `Recuerdos` como los dos territorios sin landing intermedia; `first-ever entry: Archivos`; *"MIME no decide intención"*; `roles: file | memory`; `audio no es tercer role` (`HC_V2:29-61`).

### 17.2 ¿Pueden "Factura", "Garantía" y "Manual" existir como archivos del hogar?

**SÍ, pero como documentos genéricos y semánticamente opacos.**

| Campo solicitado | Existe en Integration | Evidencia |
|---|---|---|
| Nombre | **Sí** (`display_name` texto libre + `extension`) | `20260910000000:19,21` |
| MIME | **Sí** (`mime_type text not null`) | `20260910000000:20` |
| Fecha del documento | **Sí** (`document_date`) | `20260910000000:27`; editor en `HomeCloudFilesScreen.tsx:66` |
| Nota | **Sí** (`note`) | `20260910000000:28` |
| Carpeta | **Sí** (`folder_id`) | `20260910000001:76-78` |
| **Categoría / tipo documental** (factura / garantía / manual) | **NO** — no existe columna `category`, ni enum, ni heurística | grep `category` en migraciones homecloud → 0 |
| **Tags** | **NO** | grep `tag` → 0 |
| **Clasificación `kind`** | Sólo `role ∈ {file, memory}`, declarado explícitamente como NO-clasificación | `20260910000000:8-9,18,42-43,70-71` |
| **Vínculo a un activo o a una compra** | **NO** — 0 FK desde `homecloud_*` hacia cualquier dominio | FKs reales: `household_id`, `household_members`, `homecloud_folders`, `homecloud_contents` |

**Veredicto:** un archivo `display_name='Factura PS5.pdf'`, `mime_type='application/pdf'`, con `document_date` y `note`, **es válido y persiste**. Y así es exactamente como lo muestra Figma: `Factura de compra.pdf` y `Garantía lavarropas` son **nombres de archivo**, no tipos. La presentación puede mostrarlos con seguridad, **siempre que no los presente como documentos clasificados**.

**Matiz Figma que es más correcto que Integration:** `ASSETS_V2:360-377` exige `File ↔ Asset` como relación Core. Figma cumple la **dirección Asset → File** (el Asset lista `Factura de compra.pdf` dentro de `DATOS Y DOCUMENTOS`). Integration no tiene ninguna de las dos direcciones. La distinción "el archivo existe" vs "el archivo está vinculado al activo" debe respetarse en la presentación.

---

## 18. E — HOMECLOUD MEMORIES / MEDIA

### 18.1 Product Truth vigente

`HOMECLOUD_PRODUCT_EXPERIENCE_FREEZE_V2.md` (FROZEN, `:10` `Cuando contradiga decisiones antiguas de V1/V1.3, V2 manda`).

| Punto | Autoridad | Figma | Integration |
|---|---|---|---|
| Territorios | `[Archivos \| Recuerdos]`, sin landing, first-ever entry Archivos, persistir last tab (`:29-45`) | **MATCH exacto** | Segmented con `onChange={() => {}}` — tab **inerte** (`HomeCloudFilesScreen.tsx:44`) |
| Memories root (timeline) | `:196-233` §Timeline newest→oldest, **usa fecha semántica, nunca `uploaded_at` como fallback**; precisión `exact/month_year/year/unknown`; `year` → `Durante YYYY`; `unknown` → `Sin fecha` **al final** | **MATCH** — `LÍNEA DE TIEMPO` agrupada por año y mes con `MONTHS` en español (`HomeCloud.tsx:1896-1989`); `Ir a un año`; `k === "unknown" ? "Sin fecha"` (`:1943`) | **0 superficie de lectura** |
| Resurfacing | APPROVED (no contradictoria) | `PARA VOLVER A VER` con `Hace 5 años`, `24 septiembre 2021`, `Septiembre de 2019`; toggle `Mostrar / No mostrar en "Para volver a ver"` (`HomeCloud.tsx:1235-1236,1628`) | **0** |
| **Sin captions permanentes bajo thumbnails** | `:233` | ✔ medido | `caption` **sí** existe en DB (`:29`) y está **operativamente muerto**: el cliente manda `null` hardcodeado (`homecloudMemoryIntakeService.ts:115`) |
| Albums | `:235-271` §Albums CORE; `Memory 0..N Albums` **N:M real**; `duplicate names allowed`; `no description V1`; `no nesting`; `no tags`; `no manual order V1`; `Delete Album never Memories`; `Album ≠ Folder` | `ÁLBUMES` con 8 (`Favoritos 2`, `Vacaciones 3`, `Voces de la familia 2`, `Cumpleaños 1`, `Navidades 15`, `Vacío`, `Casa nueva 0`) + `Ver todos` + cover por prioridad de tipo (`audio` → `written`) | Tablas `homecloud_albums` + `homecloud_album_items` (`20260910000003:22-32,115-120`) y 3 endpoints — **pero ningún cliente de lectura los invoca desde una pantalla**: los únicos consumidores son el harness `__DEV__` (`HomeCloudFileIntakeDevScreen.tsx:47`) y funciones **exportadas y nunca invocadas** (`homecloudReadService.ts:248,295`) |
| Memory Create | `:311-335` — `Fotos y videos`, `Audio`, `Grabar recuerdo`, `Escribir un recuerdo`, `Nuevo álbum`; recorder `record/stop/preview/play/save`, **`no fake waveform`**, **`no transcription V1`** | `Guardar un recuerdo` con las 5 entradas | Intake sólo por harness `__DEV__`; **el picker de HomeCloud no tiene audio** (`homecloudMemoryPicker.ts:92` usa `expo-image-picker`) |
| Written Memory | `:282-309` — APPROVED, es Memory (no Note, no File); `text` + optional date precision + optional Albums; sin rich text, sin markdown, sin checklist, **sin título requerido**; puede no tener binario; `Written Memory no puede convertirse a File` | Medido en runtime: *"Hoy encontramos la caja con las cartas del primer año en esta casa. Las leímos en voz alta en la cocina y decidimos guardarlas acá para no perderlas."* | **0** |
| Audio / voice note | **APPROBADO en V2** (resuelve el conflicto A-02) | `+ Audio` **simula** el retorno del picker con un audio mock (`HomeCloud.tsx:2440-2455`, comentario *"Prototipo: simula el retorno del selector del sistema con un audio mock (sin diseñar un picker falso)"*). **La grabación real vive en Quick Actions** (`CaptureMoment.tsx:633,833,883`) y **escribe directo en HomeCloud** (`:735-748`) | `mime audio/*` aceptado por el check de DB (`20260910000002:16-26`) pero **sin captura** |
| Media detail / Viewer | `:372-444` §Viewers — *"Un Viewer shell: image, video, audio, PDF, unsupported File, written Memory"*; `tap content = consume`, `⋯ = administer`; `Prev/next sigue caller` | `openViewer` + `setHomeCloudImmersive` (`HomeCloud.tsx:283,342-349`); `VideoBody` *abre pausado, sin autoplay*; `AudioBody`; `WrittenBody` con `lead = text.slice(0,140)` | `GET /content/:id` y `/content/:id/access` existen; **sin consumidor FE** |
| Memory Search | `:337-352` — puede buscar `caption`, `written text`, `Album name`, `fecha/año`, `display_name`; **no** face recognition, OCR, AI tagging ni semantic AI search V1 | — | — |
| **Sin social en Memories** | `:193` *"Sin social feed, likes, comments, followers o reactions"*; `:1205` `comments/social feed` en REGLA DE NO DUPLICACIÓN | ✔ (no hay) | ✔ (no hay) |
| **Memory ↔ Event/Person/Asset** | **AUSENTE del freeze vigente.** Sólo *"candidata para futura fase Cross-Module Integration"*: `HOMECLOUD_PRODUCT_FREEZE_V1.0.md:1145,1153-1154` `Planner Event ↔ HomeCloud Album`, `Member ↔ HomeCloud Album`, bajo `:1145 Integraciones concretas NO forman parte de este freeze standalone` | `HcMemory` **no tiene** `eventId`/`personIds`/`assetId`; único dato personal es `savedBy`, un **string libre** (`homecloud/types.ts:59`; el propio código: `data.ts:2` *"La UI NUNCA debe inferir personas, lugares, ocasiones ni fechas que no estén acá"*) | **0 FK** desde `homecloud_*` hacia `planner_*`/`finance_*`/`inventory_*`/`asset*` |

### 18.2 Veredicto Memories

- **Product Truth:** APROBADO y FROZEN, incluyendo Timeline, Albums N:M, Written Memory y recorder de audio.
- **Figma:** **coherente y de alta fidelidad** — coincide con el freeze en casi todos los puntos verificables, incluida la regla de no inferir personas.
- **Integration:** **BACKEND ONLY**. 4 tablas + 6 endpoints + intake engine completos, **0 superficie de lectura**; el tab de Recuerdos es un `SegmentedControl` con handler vacío; `caption` nunca se escribe; el audio no se captura.

→ **Capability status: SUPPORTED + PARTIAL.** **Delta: VISUAL TARGET + IMPLEMENTATION GAP.** **Presentación-safe: SAFE WITH IMPLEMENTATION-GAP NOTE. Reuse: DIRECT REUSE.**

**Lo que NO debe mostrarse:** cualquier recuerdo **etiquetado con una persona o un evento**. No está en Product Truth vigente, no está en Figma, y no está en Integration. Es exactamente el tipo de "vinculación emocional" que el guion podría pedir y que sería inventada.

---

## 19. CROSS-MODULE RELATION MATRIX

Matriz factual. Sin coreografía. Para cada relación: **REAL NAV** (existe un `push`/navigate de una pantalla a la otra) y **REAL DATA LINK** (FK / columna / join a nivel de esquema o servicio).

| Relación | REAL NAV | REAL DATA LINK | Veredicto | Evidencia |
|---|---|---|---|---|
| **Plan → Inventory** | **NO** | **NO** | **NEITHER (editorial only)** | `planner_plans` (`20260722040000:13-57`) y `planner_goals` (`202607080004:5`) sin FK hacia `inventory_*`; grep `Inventario\|Inventory` en `screens/planner/**` → 0. Figma: grep `inventario\|compras\|inventory\|activo` en `src/planner/**` → 0. Lo único es texto de fixture (`planner/fixtures.ts:379`) |
| **Inventory → Shopping List** | **NO** | **NO** | **NEITHER (editorial only)** | No existe la entidad Shopping en ningún lado de Integration. En Figma el acceso es un deep-link **desde Home** (`home/candidates.ts:363 SCREEN_TARGET("compras", {tab:"lista"})`), no desde Inventario. Y `INVENTORY:2120` lo prohíbe |
| **Shopping purchase → Finance** | **NO** | **NO** | **NEITHER — y Figma además afirma lo contrario** | `finance_transactions` (`20260813020000:9`) sin `planner_task_id`/`inventory_item_id`/`origin_*`. Figma: `ShoppingList.tsx:543` `"Registrado en Finanzas · {s.totalPaid}"` **sin ninguna escritura**; 0 imports del store de Finance en `src/inventory/**` |
| **Shopping purchase → Inventory (traslado de stock)** | **NO** | **NO** | **NEITHER** | Integration: completar la task de restock **no** incrementa `inventory_items.quantity`; el único camino de restauración es `POST /items/:id/add` (`InventarioScreen.tsx:639`). Figma sí lo modela (`store.tsx:499-517` suma/crea productos) — pero sobre una lista no aprobada |
| **Finance purchase → Asset** | **NO (dirección inversa)** | **NO** | **NEITHER en Integration. En Figma: la dirección inversa SÍ es real** | `finance_transactions` sin `asset_id`; grep `asset_id` en las 110 migraciones → 0. Figma `src/finance/**` de `asset-detail\|activos\|assetId` → 0. **Pero** `assets/Detail.tsx:1880` `finance.createExpense(...)` = **Asset → Finance, sí existe** |
| **Asset → HomeCloud Files** | **SÍ, pero genérico** | **NO** | **REAL NAV only, sin link** | Figma `assets/Detail.tsx:1807 push('homecloud')` — **sin id de archivo**, comentario `:1806` *"El visor canónico vive en HomeCloud: Activos no lo replica."* y `:1795` *"Quitarlo no borra el archivo de HomeCloud."* Integration: sin dominio Assets |
| **Plan/Event → HomeCloud Memories** | **NO** | **NO** | **NEITHER (editorial only)** | `HcMemory` sin campo de evento (`homecloud/types.ts:52-76`); `homecloud_contents` sin FK a `planner_*`. Figma: grep `homecloud\|recuerdo\|album` en `src/planner/**` → 0. Sólo texto de fixture (`planner/fixtures.ts:395`). Product Truth: ausente del freeze vigente; *"candidata futura"* (`HC_V1:1153-1154`) |
| **Inventory → Planner Task** | **NO** | **SÍ (doble)** | **REAL DATA LINK only** | (a) FK `inventory_restock_requests.planner_task_id uuid null references planner_tasks(id) on delete set null` (`202607080001:102`). (b) `planner_tasks.origin_module / origin_entity_type / origin_entity_id / origin_reason` (`202607080003:3-13,21,42-51`), escrito por BE (`inventory.service.js:550-553,583`). **Pero sin nav**: `InventarioScreen.tsx` no importa `useNavigation`; al aprobar sólo muestra `Alert.alert('Tarea creada', 'La reposición fue enviada al Calendario.')` (`:532`). Y **la procedencia es invisible en UI**: `originModule` sólo se lee en la declaración de tipo (`plannerTasks.ts:74-76`); `TaskDetailScreen.tsx` tiene 0 matches de `Origen\|origin` |
| **Task → Event** | **NO** | **NO** | **NEITHER** | `planner_tasks` **no tiene** `event_id` (revisión completa de los 8 `alter table public.planner_tasks`); `parent_event_id` es de `planner_events` (`202606230005:7`). Figma: grep `EventDetail` en `src/planner/**` → 0 |
| **Event → Plan** | **NO** | **NO** | **NEITHER** | `planner_events` **no tiene** `plan_id` ni `goal_id`. El puente `planner_plan_legacy_goal_links.legacy_goal_id/plan_id` (`20260722040000:251-252`) existe pero **sólo desde Goal**, y Goal nunca se enlaza a Event |
| **Plan → Task** | **SÍ** | **SÍ** | **BOTH** | `planner_tasks.goal_id → planner_goals` (`202607080004:116`); FE `listPlannerTasks({goal_id: planId})` (`PlannerPlanDetailScreenV1.tsx:68`) y navega `TaskDetail` (`:534`) |
| **Payment → Movement** | **SÍ** | **SÍ (lógico, sin FK)** | **BOTH** (intra-Finance) | `finance_payment_dues.expense_root_transaction_id uuid null` **sin `references`** (`20260826000000:21`) + `transfer_id` (`:22`); escritura en el RPC de registro (`:276,299`); FE `FinanceScreen.tsx:656-670 handlePaymentOpenMovement` abre `MovementDetailSheet`; `PaymentDetailSheet.tsx:377` |
| **Asset → Planner** | **SÍ** | **SÍ (sólo en `push` params, sin persistencia)** | **REAL NAV only, sin link persistente** | Figma `Detail.tsx:2334 push('create-task'\|'create-event', {assetId, assetName})`. No hay columna en `planner_tasks` que persista `asset_id` |
| **Asset → Finance (crear gasto)** | **SÍ** | **SÍ** | **BOTH** (en Figma) | `Detail.tsx:1880 finance.createExpense({...})`; y referencia inversa `Detail.tsx:2162` |
| **Member → HomeCloud Album** | **NO** | **NO** | **NEITHER** | Sin FK. `savedBy` es un string libre. Product Truth: *"candidata futura"* (`HC_V1:1154`) |
| **Home → cualquier módulo** | **SÍ** | **NO (read projections, no links)** | **REAL NAV only** | Figma `useHomeProjection.ts:250-253`; `home/candidates.ts` targets: `compras`, `inventory-item`, `shopping-summary`, `finance-limites`, `asset-detail`, `homecloud`, `task-detail`, `event-detail` |

### 19.1 Lectura para Sessions 7/8

Sólo **dos** relaciones son `BOTH` (navegación + dato): **Plan → Task** y **Payment → Movement** (esta última intra-módulo). Una es `REAL DATA LINK only`: **Inventory → Planner Task**, y es **invisible en la UI de Integration**. Todo lo que toca a Assets o a Memories es `NEITHER` en Integration.

**Consecuencia directa:** la cadena narrativa del guion (`Plan → Inventory → lista → Finance → Asset → HomeCloud`) es, en su práctica totalidad, **continuidad semántica editorial**, no navegación ni persistencia real. Eso **no es un defecto** — es exactamente el caso para el que `MASTER:113-124` y `NO_UI:329-342` existen. Pero significa que cada uno de esos saltos debe clasificarse explícitamente como `EDITORIAL`, `SHARED_ELEMENT` o `DEVICE_TRANSITION`, y **nunca** como un tap.

---

## 20. TRUE SEMANTIC CONFLICTS

Sólo conflictos **semánticos**. No se incluyen diferencias cosméticas (esas van en §21).

**Composición de esta sección: 8 conflictos reales (SC-01, SC-02, SC-03, SC-05, SC-06, SC-07, SC-08, SC-09) + 1 hallazgo que la evidencia de esta sesiónsutó ser NO conflicto y se documenta aquí para que nadie lo reabra (SC-04).**

### SC-01 — Home: densidad por rol vs proyección materialmente distinta

| Campo | Contenido |
|---|---|
| **SURFACE** | B — Home |
| **FIGMA SEMANTIC** | Un único Home; la adaptación por rol es **sólo de densidad** (`DENSITY_BY_TIER`, `home/types.ts:184-189`); el propio código lo declara: *"Un solo Home, distinta densidad: no cuatro Homes"* (`:172-183`). UnTeen/adolescent no ve **menos contenido**, ve **menos filas**. |
| **PRODUCT / INTEGRATION SEMANTIC** | Product Truth `HOME:959-961 INV-HOME-002`: *"Adult+Coordinator, Adult, Adolescent and Child **may receive materially different** Home projections"*; `:213-215` Adolescent *"debe priorizar información útil para su participación real y **ocultar contenidos no autorizados o innecesariamente sensibles**"*; `:217-221` Child *"**No debe revelar por defecto información sensible** sólo porque exista dentro del Household"*. Integration: cuatro componentes Home distintos (`HomeCoordinador/Adulto/Adolescente/AdultoMayor`), lo cual además **viola `INV-HOME-003`** (`:963-965` *"Role adaptation **never** creates separate Home modules"*). |
| **AUTHORITY** | `HOMePLUS_HOME_PRODUCT_FREEZE_V1.0.md` (AUTHORITATIVE PRODUCT TRUTH) |
| **VERDICT** | **Conflicto real, sin resolver en la autoridad.** Figma cumple `INV-HOME-003` y **no** cumple `INV-HOME-002` en profundidad. Integration hace lo contrario en cada uno. Ninguno de los dos cumple `INV-HOME-004` con adaptación por rol, porque Figma no la tiene e Integration no tiene datos. |
| **QUÉ DEBE SEGUIR LA PRESENTACIÓN** | Mostrar **un solo Home** con su jerarquía exacta de 5 secciones. Si se muestra un viewer de rol diferente, **no** puede insinuar que el sistema filtra contenido sensible: eso es `INV-HOME-002`, no está implementado en ningún lado. **La densidad de filas es un dato de demo, no una capacidad.** Clasificación de la ficha de Juli: `EDITORIAL`. |

### SC-02 — Shopping List: Figma contradice una exclusión explícita de Product Truth

| Campo | Contenido |
|---|---|
| **SURFACE** | C — Shopping List |
| **FIGMA SEMANTIC** | Existe una superficie de lista de compras completa con asignación, líneas, sesión de compra con pausa, y total pagado que "se registra en Finanzas". |
| **PRODUCT / INTEGRATION SEMANTIC** | Product Truth `INVENTORY:802` `No es una Shopping List.` · `:977` `No es una entidad Shopping List independiente.` · `:2120` `duplicate Shopping List`. Integration: **0 en las 5 capas**. |
| **AUTHORITY** | `HOMePLUS_INVENTORY_PRODUCT_FREEZE_V1.0.md` |
| **VERDICT** | **Conflicto duro.** No es "Figma adelante": Figma contradice la autoridad. |
| **QUÉ DEBE SEGUIR LA PRESENTACIÓN** | **No mostrar Shopping List.** Mostrar la cadena aprobada: `Stock bajo → Restock Need → aprobación → Planner Task → confirmación de cantidades → Finance registra el gasto`. Si el guion obliga a mencionar una "lista de compras", el término debe entrar **en el diálogo**, nunca como superficie de producto. Ver §14 y §30. |

### SC-03 — Horarios / Schedule: capacidad diseñada e implementada sin congelar

| Campo | Contenido |
|---|---|
| **SURFACE** | B — Planner / Horarios |
| **FIGMA SEMANTIC** | `Horarios` es una **pantalla de primer nivel dentro de Calendario**, con CTA propio `Nuevo horario`, y una noción de dominio `ScheduleBlock` con pausa. Glosario: *"cómo se ve normalmente la semana de alguien: colegio, trabajo, club"*. |
| **PRODUCT / INTEGRATION SEMANTIC** | Product Truth: `Schedule` aparece **sólo** como concepto de frontera (`PLANS_PRODUCT_TRUTH:378-379 SCHEDULE / ¿Qué ocurre regularmente en el tiempo?`) y **no** figura en `## 03. Componentes` (`:49-54`) ni en el Product Map. **0 ocurrencias** en `PLANS_TECHNICAL_TRUTH_V1.md`. Integration: entidad real (`household_schedule_blocks`, `/api/planner/schedules`, RPC `can_view_household_schedule`) con pantalla **huérfana** y UI embebida en Calendar. |
| **AUTHORITY** | **NINGUNA.** Es una ambigüedad de Product Truth, no un conflicto entre autoridades. |
| **VERDICT** | **Capability de producto sin Product Truth.** Las tres fuentes apuntan a que es intencionada (tabla, API, privacy endpoint, pantalla en ambos lados), pero nadie la congeló. |
| **QUÉ DEBE SEGUIR LA PRESENTACIÓN** | **`SAFE WITH IMPLEMENTATION-GAP NOTE`** y sólo como "la semana del hogar" que ya se ve integrada en el calendario. **No** presentarla como superficie propia con alta de horarios hasta que exista decisión de Product Truth. Requiere decisión de usuario → P0 (§29). |

### SC-04 — Plan: porcentaje único agregado — **RESUELTO, NO ES CONFLICTO**

> **Corrección de esta sesión.** Una primera lectura de este documento hizo pasar por conflicto algo que Figma no hace: se veía un porcentaje universal por Plan. **La evidencia runtime y el freeze de diseño de Planner lo refutan.** Se conserva el ID para que ninguna sesión posterior lo reabra como conflicto.

| Campo | Contenido |
|---|---|
| **SUPERFACE** | C — Plan detail / Plan list |
| **LO QUE SE CREÍA** | Figma muestra un porcentaje único agregado por Plan (`50%`, `33%`, `19%`, `0%`), lo que Product Truth prohíbe como *"un único porcentaje universal que mezcle Tasks, Events y Measurements"*. |
| **LO QUE LA EVIDENCIA MUESTRA** (text renderizado, `cap-B_PLANNER_PLANS.json`, `cap-C_PLAN_DETAIL_BIRTHDAY.json`, `cap-C_PLAN_DETAIL_MEASUREMENT.json`) | El porcentaje **sólo aparece cuando el Plan clasifica** (≥2 tipos de contenido discretos) y **siempre acompañado de un conteo**: `Mudanza de mamá 33% · Faltan 3 cosas` · `Cumpleaños de Martina 50% · Falta 1 cosa` · `Puesta a punto de la casa 19% · Faltan 21 cosas`. Los dos Planes que **no** clasifican **no muestran porcentaje**: `Comprar auto · Ahorro · $650.000 / $5.000.000 · Falta 1 cosa` (sin barra) y `15 de Martina · Listo para completar · No queda ninguna cosa necesaria` (sin barra), que en su lugar muestra su Medición real: `Invitados · 10 personas / = 10 personas · Alcanzado`. |
| **CORROBORACIÓN EXTERNA** | `Figma-app\PLANNER_FIGMA_TOTAL_FREEZE_V1.md:68` *"**No hay porcentaje universal de Plan.** Hay tres preguntas distintas con tres…"* · `:70` *"No hay Medición dentro del porcentaje"* · `:798` *"`aria-valuetext` dice la cuenta de verdad, no sólo el número redondeado: un porcentaje redondeado pierde el denominador y con él el significado"* (`Plans.tsx:596-602`) · `:812` *"**`Comprar auto` no tiene barra ni porcentaje**: no tiene nada discreto, así que muestra la lectura factual de una medición"* (`Plans.tsx:505-516`) · `:1590` *"el desglose sólo cuando clasifica… con dos o más tipos **sí** aporta"* (`Plans.tsx:940-952`) |
| **PRODUCT SEMANTIC** | `PLANS_PRODUCT_TRUTH:147-168` §10 — *"No existe un único porcentaje universal… No existe: progress mode configurable; porcentaje manual; porcentaje artificial"* |
| **AUTHORITY** | `PLANS_PRODUCT_TRUTH_V1_AND_FIGMA_AUDIT.md` |
| **VERDICT** | **MATCH.** Figma implementa exactamente la lectura derivada que Product Truth exige: percentage sólo cuando clasifica, con `aria-valuetext` de verdad, y lectura factual de Medición cuando no hay nada discreto. |
| **QUÉ DEBE SEGUIR LA PRESENTACIÓN** | Mostrar el porcentaje **sólo junto con su conteo** (`50% · Falta 1 cosa`), que es lo que Figma ya hace. Si se muestra un Plan sin porcentaje, mostrar su Medición. Los contadores de sección (`TAREAS · 1/2`, `EVENTOS · 0`, `MEDICIONES · 1`) y el desglose con `Opcional` son la lectura canónica. No hay que ocultar nada. |

### SC-05 — PS5: campos de la ficha provisional del master vs Assets Freeze V2.0

| Campo | Contenido |
|---|---|
| **SURFACE** | E — Asset detail |
| **FIGMA SEMANTIC** | El Asset **no** tiene precio ni fecha de compra. `Ahora con Tomi` / `Está en Casa de Tomi` / `A cargo de Gabriel` / `PRÓXIMO → Nada pendiente` / `Garantía PlayStation 5 · hasta enero de 2027 · 1 documento` / `Factura de compra.pdf · PDF · 1,1 MB`. Cero campos monetarios. |
| **PRODUCT SEMANTIC** | `ASSETS_V2:345-349` §21 `Finance posee amount, currency, account, … date …`; `:843` `money owned by Assets` en EXPLICITLY NOT CORE V2; `:841-842,886` `Maintenance` → Planner. |
| **MASTER DE PRESENTACIÓN** | `MASTER:726-736` `**PlayStation 5** / - Comprada: Mar 2024 / - Garantía: estado/fecha / - Mantenimiento: estado / - Documentos: 3 archivos` + `:214` `demo sugerida: Mar 2024 / $580.000` |
| **AUTHORITY** | `HOMePLUS_ASSETS_PRODUCT_FREEZE_V2.0.md` (gana por `:6` del master) |
| **VERDICT** | **Resuelto a favor de Figma.** El master de presentación pidió 3 campos que Product Truth prohíbe en Assets. Figma-app ya lo resolvió correctamente. |
| **QUÉ DEBE SEGUIR LA PRESENTACIÓN** | Mostrar la ficha de Figma tal cual. `Mar 2024 / $580.000`, si se usa, **sólo** como el movimiento de Finance referenciado, nunca como campo del activo. `Documentos: 3 archivos` → usar el conteo real de `DATOS Y DOCUMENTOS`. |

### SC-06 — Feed: tres definiciones incompatibles de la misma superficie

| Campo | Contenido |
|---|---|
| **SURFACE** | B — Feed |
| **FIGMA SEMANTIC** | La superficie Feed **no existe**. Los ids de ruta `family-feed` y `feed-comments` son alias que renderizan `ConversationScreen convId="c1"`, con el comentario *"No hay composer post-centric ni comments"*. `FEED_POSTS = []`. Se entró por el Conversation Engine. |
| **PRODUCT SEMANTIC** | `FEED:344-364` §14 `FLAT CONTENT + SPACING + DIVIDER`, `NO CARD SOUP`; `:142-169` §5 `FEED NO ES GROUP CHAT`; `:499-516` §20 comments sobre **motor compartido**; `:571-596` §24 Feed visible desde Messages Root. |
| **INTEGRATION SEMANTIC** | Stub en memoria, 0 tablas, 0 API, botón de comentar sin `onPress`, botón de compartir sin `onPress`, y **el propio producto lo marca `isDemo: true`**. |
| **AUTHORITY** | `FEED_PRODUCT_FREEZE_V1.0.md` + `MENSAJES_PRODUCT_FREEZE_V1.0.md` |
| **VERDICT** | **Conflicto de modelo de superficie.** Product Truth congeló un Feed plano; Figma lo substituyó por conversación; Integration nunca lo implementó. Ninguno de los dos lados coincide con la autoridad. |
| **QUÉ DEBE SEGUIR LA PRESENTACIÓN** | **No mostrar una pantalla Feed.** El caso del guion ya está en la autoridad como texto (`FEED:232` verbatim) y se puede mostrar dentro de `Mensajes → Familia García`, que es la superficie real de Figma. La transición hacia ese mensaje es **editorial**, porque en Integration ese camino no existe. Requiere decisión de usuario → P0 (§29). |

### SC-07 — Family / Map: card permanente inferior

| Campo | Contenido |
|---|---|
| **SURFACE** | B — Family / Mapa |
| **FIGMA SEMANTIC** | El mapa full-focus tiene debajo un bloque **permanente** `AHORA` con la lista de presencia (`Mariana · Casa · ahora`, `Juan · Casa · hace 30 min`). |
| **PRODUCT SEMANTIC** | `people_presence:1814-1830` §34.1: elementos permanentes *"**No filters. No card permanente inferior.**"*; `:1809-1812` §34 *"Mapa es full-focus. **No dashboard alrededor.**"* |
| **AUTHORITY** | `people_presence_product_freeze.md` |
| **VERDICT** | **Conflicto estructural menor.** La versión medida de Figma tiene exactamente el "dashboard alrededor" que el freeze prohíbe. |
| **QUÉ DEBE SEGUIR LA PRESENTACIÓN** | Mostrar el mapa **sin** el bloque `AHORA`, o con él recortado a la zona de mapa. La presencia de miembros ya se cuenta en `Familia` (listado con `Trabajo · hace 1 h`, `Casa · ahora`), que es donde Product Truth la ubica. |

### SC-08 — Ubicación: controles de Precisión y Pausa ausentes en los dos lados implementables

| Campo | Contenido |
|---|---|
| **SURFACE** | B — Family / Privacy |
| **FIGMA SEMANTIC** | Una fila muerta `Privacidad — Qué comparte con la familia` con `onPress={() => {}}`. `Toggle` importado y nunca renderizado. Cero control de precisión o pausa. |
| **PRODUCT SEMANTIC** | `people_presence:1756-1806` §33 exige `Precisión: ● Exacta / ○ Reducida temporalmente` (Teen) y `Exacta / Aproximada / Pausar ubicación` (Adult); `:1032-1053` Privacy Mode temporal; `:802` *"cannot be silently broken"*; `:2627` *"never means silent disappearance"*. |
| **INTEGRATION SEMANTIC** | Switch por miembro `off/foreground/background`. **Sin** precisión, **sin** pausa, **sin** Privacy Mode temporal. El modelo per-viewer existe sólo en DB. |
| **AUTHORITY** | `people_presence_product_freeze.md` |
| **VERDICT** | **Gap de los tres lados**, no conflicto entre ellos. Los tres coinciden en "decisión individual"; ninguno implementa los controles que la autoridad define. |
| **QUÉ DEBE SEGUIR LA PRESENTACIÓN** | El tema "Coordinar no es vigilar" se sostiene con el **concepto** de decisión individual, que sí está autorizado en los tres lados. **No mostrar** un control de precisión, de pausa, ni un interruptor global. `DO NOT SHOW AS WORKING CAPABILITY`. |

### SC-09 — Milestones: Integration mantiene una entidad que Product Truth eliminó

| Campo | Contenido |
|---|---|
| **SURFACE** | C — Plan |
| **INTEGRATION SEMANTIC** | `planner_goal_milestones` (`202607080004:80`) + `progress_mode in ('steps','tasks','numeric','boolean','none')` |
| **PRODUCT SEMANTIC** | `PLANS_PRODUCT_TRUTH:302-309` §19 ***"Milestone deja de ser entidad de V1. No necesitamos un `Task + Milestone` para representar importancia."*** · `:315` `Milestone como entidad` en "Fuera de alcance". |
| **FIGMA** | No aparece en el detail. Correcto. |
| **AUTHORITY** | `PLANS_PRODUCT_TRUTH_V1_AND_FIGMA_AUDIT.md` (gana sobre `PLANNER_PRODUCT_FREEZE:306,1724-1726` — §2.3 A-03) |
| **VERDICT** | **Functional Current Ahead en la dirección equivocada.** |
| **QUÉ DEBE SEGUIR LA PRESENTACIÓN** | **No mostrar milestones.** Mostrar `TAREAS / EVENTOS / MEDICIONES`. |

---

## 21. VISUAL-ONLY DELTAS

Figma simplemente es más pulido. **NO son conflictos de producto.** Aquí es donde la presentación debe preferir Figma.

| # | Superficie | Qué es mejor en Figma | Por qué NO es conflicto |
|---|---|---|---|
| V-01 | **Home** | Densidad, jerarquía de secciones, sección de attention con borde de acento y acción inline, "Ver N más" por sección, chips de rol y de estado | Product Truth fija la **jerarquía**, no la anatomía. Figma la respeta |
| V-02 | **Planner / Tareas** | Segmented control con pill de selección animada, grupos `REVISIÓN / VENCIDAS / HOY / MAÑANA`, botón contextual por fila (`Completar`/`Me encargo`/`Verificar`), `Opciones de {tarea}` por fila | Mismo modelo de datos, mismo conjunto de capacidades |
| V-03 | **Planner / Calendario** | Timeline mixto con horas a la izquierda y color por responsable | Integration mezcla lo mismo en un solo timeline (`PlannerCalendarScreen.tsx:184-217`) |
| V-04 | **Planner / Responsabilidades** | Fila de frecuencia legible (`Todos los días`, `Mar y vie`, `Cada 3 días`) + modo de reparto (`Va rotando`, `Cualquiera puede`, `Siempre la misma`) + estado `Pausada` | Integration tiene los mismos 5 `schedule_kind` y 4 `assignment_kind` (`plannerResponsibilities.ts:5,6`) |
| V-05 | **Family / Personas** | Filas con avatar + lugar + freshness en una línea; secciones de acciones household agrupadas al pie | Mismo modelo |
| V-06 | **Family / Lugares** | Catálogo con conteo `2 personas ahora` y CTA `+ Agregar lugar` | Product Truth aprobado; Integration vacío |
| V-07 | **Inventory** | Chips de lugar (`Heladera 3`) y de estado (`Agotados 1`, `Poco 1`) como filtro de una línea; `Todos los productos 8` / `Archivados (1)` / `Papelera (1)` | Los tres filtros de Product Truth existen como derivación (`INVENTORY:761-790`) |
| V-08 | **Inventory by place** | Vista de lugar con `Nuevo lugar` y conteo por espacio | Aprobado como filtro sobre `0..N` Storage Spaces |
| V-09 | **Finance / Resumen** | Trío `Ingresos / Gastamos / Balance`; bloque `Tu dinero: Disponible / Organizado / Sin organizar`; `Límites de gasto` embebido con `Te quedan 375.000 ARS` y `Salud 115% / Te pasaste 27.000 ARS` | `finance_pools` + `finance_spending_limits` soportan exactamente estas tres agregaciones |
| V-10 | **Finance / Movimientos** | Fila con avatar de categoría, cuenta en subtítulo, importe alineado con color semántico | Integration tiene los mismos datos, más denso |
| V-11 | **Finance / Análisis** | Tabs `Gastos / Ingresos / Evolución` + navegación mensual | `MONTHLY \| YEARLY` idéntico |
| V-12 | **Assets root** | Filtros por System Profile con el label canónico, chips `Ahora con / Está en / Trabajo`, `Archivados 1 · conservan su historia`, `Papelera 1 · solo duplicados o errores` | Los labels son los del freeze (`ASSETS_V2:120-125`) |
| V-13 | **Asset detail** | Orden de 5 secciones con `QuietNote` en vacío (`Nada pendiente`) | Orden idéntico al freeze |
| V-14 | **HomeCloud / Archivos** | Estado de subida por archivo (`Subiendo…`, `00:42`, `1 subida`), separador folders/archivos, `⋯` contextual por item | El intake engine de Integration tiene los estados (`homecloudIntakeService.js:235,472`) |
| V-15 | **HomeCloud / Recuerdos** | `PARA VOLVER A VER`, carousel de álbumes, timeline por año/mes con `Ir a un año`, audio con duración, written memory con lead tipográfico | Todo coincide con `HC_V2:196-233,282-309` |
| V-16 | **Mensajes** | Lista de conversaciones con `Familia García` + topics + directs, separadores `HOY/Ayer`, unread pills | Mismo modelo |
| V-17 | **Quick Actions** | Launcher modal con 4 acciones y subtítulo por acción (`Gasto · Ingreso · Transferencia`) | Integration tiene 3 de 4 |
| V-18 | **Global** | Shell 390×844, bottom nav flotante con FAB, sheets con `Cerrar`/`Volver`, segmented control consistente, `DM Sans` + `DM Serif Display` | No hay Product Truth de diseño. Figma es la autoridad |

---

## 22. FUNCTIONAL-CURRENT-AHEAD DELTAS

Integration (o Product Truth) soportan algo que Figma no expone. **No forzarlo en la presentación salvo que el guion lo necesite.**

| # | Capacidad | Quién está delante | Evidencia | ¿Presentarlo? |
|---|---|---|---|---|
| F-01 | **Milestones de Plan** | Integration (+ contra Product Truth) | `planner_goal_milestones` (`202607080004:80`) | **NO** — SC-09 |
| F-02 | **Descuento de tarjetas de crédito (cuotas)** | Integration | `finance_credit_card_installment_plans/installments` (`20260906000000:36,117`); `closing_day`/`due_day` con checks (`20260904000000:31-47`); UI `PayCreditCardSheet`, `DirectCreditCardPaymentSheet` | Sólo si el guion pide "cuotas". No está en Figma |
| F-03 | **Refinanciación / corrección estructural de movimentos** | Integration | `POST /transactions/correct`, `/refunds/correct` (`routes/finance.js:47-49`); `finance_refund_events` (`20260824093347:10`); bloqueada si la compra liquidó (`finance.transaction.correction.service.js:209,212`) | **NO.** Figma tiene la sheet pero no la profundidad. Mostrar la sheet es correcto; prometer la corrección no |
| F-04 | **Pools de dinero** | Integration | `finance_pools`, `finance_pool_operations`, `finance_pool_entries`, `finance_expense_pool_links` (`20260828002827:21,130,221`; `20260828020000:9`); 16 endpoints (`routes/finance.js:77-92`) | **NO.** Figma muestra la sección `Pozos` pero no el modelo |
| F-05 | **Cálculo de saldo por anclas de balance** | Integration | `finance_account_balance_anchors` (`20260814020000:48`); función `finance_account_current_balance_text()` (`:192-224`); UI "Definir monto" | **NO.** Figma muestra el estado, no el modelo |
| F-06 | **Materialización server-side de ocurrencias de Responsibility** | Integration | RPC `materialize_planner_responsibility_v1` (`planner.responsibilities.service.js:124,140,178,196`) | **NO.** Figma tiene la UI; el backend es un detalle |
| F-07 | **V1 fulfillment de Tasks (claim/release/archive) + evidencia** | Integration | `planner_task_fulfillments`, `planner_task_evidence_attempts`; `/complete`, `/verify`, `/evidence` (`routes/planner.js:76-87`); `If-Match` + idempotencia (`plannerTasks.ts:362-398`) | **NO.** Figma muestra `Verificar` como acción; la evidencia es otro nivel |
| F-08 | **Real-time de presencia** | Integration | `postgres_changes` sobre `presence_member_locations` (`PresenceScreen.tsx:395-400`); `alter publication` (`20260917000100:22-28`) | **NO.** Figma es un fixture estático |
| F-09 | **Geofence enter/exit con Haversine → outbox** | Integration | `20260904010000:142-156` emite `presence.geofence_notification` | **NO.** Sin consumidor de outbox; no es una capacidad mostrable |
| F-10 | **Grace / segment switch con `location_share_grants` per-viewer** | Integration (sólo DB) | `location_share_grants` (`:39-48`), `minor_location_guardians` (`:49-61`), `can_view_presence` (`:260-295`) | **NO.** Existe en el esquema, no en el código. Presentarlo sería inventar |
| F-11 | **Presets / plantillas de Planner + drafts** | Integration | `PlannerPresetLibrary/Detail/Create/Edit`, `PlannerPresetDraftsTrash`, `PlannerDraftRecovery/Resume` (`HomeTabNavigator.tsx` PlannerStack) | **NO** |
| F-12 | **Presupuesto de Finance como control conductual con excepciones y versiones** | Integration | `finance_spending_limit_series/versions/exceptions` (`20260828030000:8,26,37`) | **NO.** Figma muestra la lectura; no el modelo |
| F-13 | **Simple Shell / modo simple** | Integration | `SimpleNavigator.tsx`, `simpleModuleRegistry.ts`, `ExperienceResolver.tsx`, `screens/simple/` | **NO.** Es una alternativa de shell, no una superficie |
| F-14 | **Intake DEV de HomeCloud (files + memories + albums)** | Integration | `HomeCloudFileIntakeDevScreen.tsx`, registrado como `{__DEV__ && <PrivateStack.Screen .../>}` (`AppNavigator.tsx:241`) | **NO.** Sólo `__DEV__`. No existe en release |
| F-15 | **Payment → Movement con navegación intra-Finance** | Integration | `finance_payment_dues.expense_root_transaction_id` (lógico, sin FK) + `FinanceScreen.tsx:656-670` | **NO.** Intra-módulo; y la integridad no está garantizada a nivel de esquema |
| F-16 | **Inventario → Planner Task con procedencia** | Integration | `planner_tasks.origin_module='inventory'` + `origin_reason` (`202607080003:3-13,21`); `inventory_restock_requests.planner_task_id` (`202607080001:102`) | **CON NOTA.** El link existe pero es **invisible en UI**; y la dirección aprobada es `Restock Need`, no Shopping |

---

## 23. MISSING FIGMA SURFACES

| Superficie requerida | Estado en Figma | Gramática visual adyacente reutilizable | Qué haría falta |
|---|---|---|---|
| **Home for Juli** (child Home) | **MISSING.** No existe salvo el lab dev por URL (`home/lab.ts:59-76`, con viewers sintéticos y el propio aviso *"CURRENT no tiene un rol 'Niño'"*) | **La misma anatomía de Home con `DENSITY_BY_TIER.child` = `{attention:1, today:3, upcoming:2, insights:1, recent:1}`** | Sólo datos + decisión de qué va en cada sección. **No requiere diseño nuevo.** Clasificación: `EDITORIAL` |
| **Feed plano** (posts con spacing + divider) | **MISSING y retirado por decisión.** `types.ts:183-185`; alias muertos (`Messages.tsx:1024-1036`) | **Ninguna.** El visual plano congelado (`FEED:344-364`) ya no existe en `src/` | Reconstruirlo sería rediseñar un módulo retirado. **No hacerlo.** Usar Mensajes |
| **Composer de Feed** | **MISSING** | El composer de Mensajes existe (`MessageKind` incluye photo/video/file/voice) | **No** — la autoridad pide el modelo plano, no un composer de chat |
| **Memories con persona o evento etiquetado** | **MISSING** y no aprobado | Ninguna | **No construir.** Está ausente del freeze vigente y de `HcMemory` |
| **Visor de archivo de HomeCloud** | **MISSING.** `FileTile` sólo tiene `onMore` | El `ViewerHost` de memories existe y es **el mismo shell** (`HC_V2:372-444` *"Un Viewer shell: image, video, audio, PDF, unsupported File, written Memory"*) | Extender el viewer existente a `kind='file'`. **Es el gap más barato de E** |
| **Carpetas de HomeCloud Trash** | **MISSING** y fuera de V1 | Ninguna | **No construir** (`20260910000001:5-6`) |
| **Inventory by place con cantidad por espacio** | **MISSING.** Figma tiene filtro por lugar, no cantidad por espacio | El filtro de lugar ya existe | Product Truth **prohíbe** la cantidad por espacio en Core V1 (`INVENTORY:499-508`) → **no construir** |
| **Descuento de tarjeta (cuotas)** | **MISSING** | La tile de tarjeta de Pagos existe | Integration **ya lo tiene**; es un gap de Figma, no de producto |
| **Presupuesto de Finance con versiones** | **MISSING** (Figma tiene la lectura de límites, no el modelo de presupuesto) | La pantalla de Límites con `Mensual/Anual` + `General`/`Por categoría` es la lectura correcta | Integration ya lo tiene. No hace falta |
| **Sheet de privacidad de ubicación (Precisión/Pausa)** | **MISSING.** La fila existe pero es muerta | La `MemberPermissionsScreen` de Figma (`Familia.tsx:273`) tiene la anatomía de un dominio-por-fila con nivel; faltan los toggles | **Requiere decisión de Product Truth** primero (SC-08) |
| **Places / Avisos** (segundo contenido de la tab Lugares) | **MISSING.** Figma muestra sólo el catálogo de lugares | El catálogo con conteo está | Product Truth: `Lugares` comparte espacio **únicamente con Avisos**; `place_alert_subscriptions` existe en DB sin servicio |
| **Feed attachments (archivos / links internos)** | **MISSING** | — | **NO construir** — `LEGACY INTENT / NOT RECONFIRMED` (`FEED:783-814`) |
| **Module-level root de Assets en el shell de Figma** | **MISSING como tab.** Activos se alcanza desde `Más`, igual que Integration | El launcher de `Más` | Es correcto: ni Product Truth ni Integration lo ponen como tab |
| **HomeCloud Trash / Restore** | **MISSING.** Figma no lo expone en la raíz de Archivos | — | Las columnas existen; **no** hay writer. Y folders están fuera de Trash V1 |

---

## 24. PRODUCT-SUPPORTED BUT NOT IMPLEMENTED

Capacidades **aprobadas por Product Truth** que Integration no implementa, con target visual disponible. Este es el conjunto queSessions 7/8 deben tratar como *implementation gap*, nunca como *fake feature*.

| # | Capacidad | Autoridad | Figma | Integration | Superficie reutilizable |
|---|---|---|---|---|---|
| **N-01** | **Dominio Assets completo** | `ASSETS_V2.0` FROZEN `READY_FOR_IMPLEMENTATION` | Sí: 5 secciones + 4 filtros + archivados/trash | **0 rutas, 0 pantallas, 0 servicios, 0 tablas** | `DIRECT REUSE` |
| **N-02** | **Asset Record de garantía** | `ASSETS_V2:266` tipo `WARRANTY` | Sí | 0 | `DIRECT REUSE` |
| **N-03** | **`Transaction ↔ 0..N Assets`** | `ASSETS_V2:351-354` | **Sí, bidireccional** (`Detail.tsx:1880` crea, `:2162` abre) | 0 | `DIRECT REUSE` |
| **N-04** | **`File ↔ Asset` / `File ↔ Asset Record`** | `ASSETS_V2:366-370` | Nav genérico sin link | 0 | `REUSE WITH STATE ADAPTER` |
| **N-05** | **Inventario por Storage Space (`0..N`)** | `INVENTORY:454-508` | Sí (filtro con conteo) | **Sin columna de lugar** | `REUSE VISUAL ONLY` |
| **N-06** | **Places como tab de Familia** | `people_presence:242-250` | Sí | 6 tablas en DB, **0 servicios** | `REUSE VISUAL ONLY` |
| **N-07** | **Avisos de lugar** | `people_presence:1942-1954` | No | `place_alert_subscriptions` sin servicio | — |
| **N-08** | **Precisión de ubicación (Exacta / Reducida) y Pausar** | `people_presence:1756-1806,1032-1053` | No (fila muerta) | No | `REUSE VISUAL ONLY` (tras decisión PT) |
| **N-09** | **Privacy Mode temporal de adolescente** | `people_presence:802,2627` | No | No | `REUSE VISUAL ONLY` |
| **N-10** | **Memories: superficie de lectura completa** | `HC_V2` FROZEN | Sí | 4 tablas + 6 endpoints, **0 UI** | `DIRECT REUSE` |
| **N-11** | **Written Memory** | `HC_V2:282-309` | Sí | 0 | `DIRECT REUSE` |
| **N-12** | **Recorder de audio/voz** | `HC_V2:333-335` | Sí (Quick Actions → HomeCloud) | `mime audio/*` en DB, sin captura | `REUSE WITH STATE ADAPTER` |
| **N-13** | **Membership deyad en Albums (`0..N`, N:M)** | `HC_V2:235-271,517-519` | Sí | `PATCH /content/:id/file` **sólo para `role='file'`**; trigger `20260910000001:98-101` | `DIRECT REUSE` |
| **N-14** | **Escritura de `caption`** | `HC_V2:337-352` (buscable) | Sí | Cliente manda `null` hardcodeado | `REUSE WITH STATE ADAPTER` |
| **N-15** | **Visor de archivo (Viewer shell)** | `HC_V2:372-444` | Sí para memories | `GET /content/:id/access` existe, **sin consumidor FE** | `DIRECT REUSE` |
| **N-16** | **Family Conversation / Mensajes** | `MENSAJES_PRODUCT_FREEZE_V1.0` FROZEN | Sí, completo | **0 dominio de conversación en todo el repo** | `REUSE VISUAL ONLY` |
| **N-17** | **Feed persistido con composer, reactions y comments** | `FEED_PRODUCT_FREEZE_V1.0` FROZEN | Superficie **retirada** | 0 tablas, 0 API | `DO NOT REUSE` |
| **N-18** | **Bucket `paid` en Pagos** | `FINANCE:1249-1259` §32 | No renderizado | El bucket se calcula (`financePayments.ts:805-806`) pero `PaymentsList.tsx:149` no lo destructura | `DIRECT REUSE` |
| **N-19** | **Horarios como superficie propia** | **SIN AUTORIDAD** | Sí | Entidad + API, pantalla huérfana | `REUSE WITH STATE ADAPTER` — requiere decisión (§29 P0-03) |
| **N-20** | **Home por rol con contenido real** | `HOME:959-961` §04.4/§04.5 | Sólo densidad | 4 componentes, contenido mock | `REUSE VISUAL ONLY` |

---

## 25. UNSUPPORTED / PROTOTYPE-ONLY CLAIMS

Claims que **no** pueden presentarse como capacidad de producto. Cada uno con su clasificación.

| # | Claim | Clasificación | Evidencia del defecto | Por qué no es "implementation gap" |
|---|---|---|---|---|
| **U-01** | **Shopping List como capacidad** | **UNSUPPORTED CLAIM** | `INVENTORY:802,977,2120` la excluye por nombre | Product Truth la niega. No es "falta de implementación", es **modelo no aprobado** |
| **U-02** | **`Empezar compra` / `Compra en curso` / `Finalizar compra`** | **VISUAL PROTOTYPE ONLY** | `store.tsx:369-528` `PurchaseSession`; sin contraparte en ninguna autoridad | `PurchaseSession` no existe en Product Truth; Product Truth describe el **resultado** (`DISPATCHED`), no la sesión |
| **U-03** | **`Total pagado` en Shopping** | **VISUAL PROTOTYPE ONLY** | `ShoppingList.tsx:461` campo libre; `store.tsx:523` sin tipo ni columna | El dinero pertenece a Finance (`FINANCE:348-390`, `ASSETS_V2:345-349`) |
| **U-04** | **`Registrado en Finanzas` (en Shopping)** | **UNSUPPORTED CLAIM** | `ShoppingList.tsx:543` — afirmación de UI, **0 escrituras**, 0 imports del store de Finance | El caso Assets→Finance **sí** escribe (`Detail.tsx:1880`). Aquí se afirma lo que no existe |
| **U-05** | **ETA / tiempo de llegada** | **UNSUPPORTED CLAIM** | 0 en Figma; 0 en Integration; `people_presence:2805` la lista como *Future Candidate* | No hay ningún cálculo de distancia ni tiempo de traslado en ninguna capa |
| **U-06** | **Interruptor global de "compartir ubicación"** | **UNSUPPORTED CLAIM** | No existe en ninguna autoridad | Los tres lados son **individuales**. Introducir uno sería inventar |
| **U-07** | **Control de Precisión / Pausar ubicación** | **UNSUPPORTED CLAIM** (exigido por PT, no implementado) | `people_presence:1756-1806` lo exige; Figma e Integration no lo tienen | Classificar como `SUPPORTED + NOT IMPLEMENTED`, no como fake. Pero **no mostrar** |
| **U-08** | **Fila "Privacidad — Qué comparte con la familia"** | **VISUAL PROTOTYPE ONLY** | `Familia.tsx:256` `onPress={() => {}}` | El rótulo implica un control que no existe. El copy sí es correcto conceptualmente (decisión individual) |
| **U-09** | **Fila "Toca para cambiar el rol"** | **VISUAL PROTOTYPE ONLY** | `Familia.tsx:291` `onPress={() => {}}` | Integration sí cambia roles (`family.ts:268`), pero **no desde esa fila** |
| **U-10** | **Row "Cuando alguien llegue — Avisarme"** | **VISUAL PROTOTYPE ONLY** | `Familia.tsx:370` `onPress={() => {}}` | El geofence existe en DB con outbox pero **sin consumidor** |
| **U-11** | **Alta de audio en HomeCloud (`+ Audio`)** | **VISUAL PROTOTYPE ONLY** | `HomeCloud.tsx:2440-2455` *"Prototipo: simula el retorno del selector del sistema con un audio mock (sin diseñar un picker falso)"* | La captura **real** sí existe en Figma, en Quick Actions (`CaptureMoment.tsx:833,883`). El picker de HomeCloud es simulado |
| **U-12** | **Recuerdo etiquetado con persona o evento** | **UNSUPPORTED CLAIM** | `HcMemory` sin `eventId`/`personIds`; `savedBy` es string libre (`homecloud/types.ts:59`); 0 FK | Ausente del freeze vigente; "candidata futura" (`HC_V1:1153-1154`) |
| **U-13** | **Feed posts / comments / reactions como capacidad** | **UNSUPPORTED CLAIM** | Superficie **retirada** en Figma (`types.ts:183-185`); 0 tablas en Integration | Product Truth la aprueba, pero **ningún lado la implementa**. Es `SUPPORTED + NOT IMPLEMENTED` con target **no disponible** → no mostrar |
| **U-14** | **Adjuntos de Feed (archivos, links internos, URL previews)** | **UNSUPPORTED CLAIM** | `FEED:783-814,999-1002` `LEGACY INTENT / NOT RECONFIRMED` | Fuera del freeze actual |
| **U-15** | **Papelera de HomeCloud** | **VISUAL PROTOTYPE ONLY** | Columnas `trashed_at/lifecycle` existen; **0 endpoints**, **0 writers** | Y folders explícitamente fuera de Trash V1 (`20260910000001:5-6`) |
| **U-16** | **HomeCloud Scanner** | **UNSUPPORTED CLAIM** | 2 menciones en comentarios (`homecloudUploadEngine.ts:62`, `homecloudUploadTypes.ts:13`); sin librería OCR/scan | `HOMECLOUD_IMPLEMENTATION_STATE_AND_ROADMAP.md` marca `Scanner / IN PROGRESS` |
| **U-17** | **Switch de scope Finance que cambia los datos** | **VISUAL PROTOTYPE ONLY** (medido) | `verify-probes.json` → `dataChanged: false` con `switchFound: true` | El segmented existe pero el fixture no cambia. El **modelo** sí es real en Integration |
| **U-18** | **Documentos clasificados (factura / garantía / manual)** | **UNSUPPORTED CLAIM** como clasificación | No hay columna `category`, ni enum, ni heurística en `homecloud_contents` | Los **nombres** sí son válidos (`Factura del mes`, `Garantía lavarropas`). Lo que no existe es la **clasificación** |
| **U-19** | **Cantidad de stock por espacio** | **UNSUPPORTED CLAIM** | `INVENTORY:499-508` §07.4 + `INV-INV-010` | Product Truth lo **prohíbe** en Core V1. La cantidad es **global** |
| **U-20** | **Un ítem de Inventory en "un" lugar** | **UNSUPPORTED CLAIM** | `INVENTORY:488-497` `0..N` con ejemplo multi-place | La regla real es `0..N`. Mostrar `Leche → Heladera` como única ubicación contradice la autoridad |
| **U-21** | ~~Porcentaje único agregado de Plan~~ | **RESUELTO — NO ES UNSUPPORTED CLAIM** | La evidencia runtime y `PLANNER_FIGMA_TOTAL_FREEZE_V1:68,798,812,1590` muestran que el porcentaje **sólo** aparece cuando el Plan clasifica y siempre con su conteo. `PLANS_PRODUCT_TRUTH:147-168` se cumple. Ver SC-04 | Ver SC-04 (corregido) |
| **U-22** | **Milestones como capacidad** | **CONTRADICE Product Truth** | `PLANS_PRODUCT_TRUTH:302-309` | Integration los mantiene; no mostrarlos |
| **U-23** | **`Comprada: Mar 2024` / `$580.000` en la ficha de Asset** | **CONTRADICE Product Truth** | `ASSETS_V2:345-349,843` | El dinero y la fecha son de Finance |
| **U-24** | **`Mantenimiento` como campo de Asset** | **CONTRADICE Product Truth** | `ASSETS_V2:841-842,886` | Es trabajo temporal de Planner |
| **U-25** | **Tar abierto desde Asset a un archivo concreto de HomeCloud** | **VISUAL PROTOTYPE ONLY** | `Detail.tsx:1806-1809` `push('homecloud')` sin id | La relación `File ↔ Asset` está congelada pero **el link no está**. `MASTER:237` lo prohíbe explícitamente |
| **U-26** | **"Home de Juli" como módulo Home propio** | **CONTRADICE `INV-HOME-003`** | `HOME:963-965` | Puede ser el mismo Home con otra densidad, no un módulo separado |

---

## 26. PRESENTATION-SAFE MATRIX

Clasificación de auditoría para decisiones de Session 7. **Esto NO significa añadir disclaimers a la presentación viva.**

| Superficie / acción | Clasificación | Razón |
|---|---|---|
| B — Home (root, 5 secciones, greeting, filas) | **SAFE TO SHOW AS PRODUCT** | Jerarquía idéntica a `HOME:967-977`; datos de Home existen en Integration (`/api/planner/summary`, `/attention`, `/activity`, `/inventory/alerts`) |
| B — Home: fragmento de otro rol | **SAFE WITH IMPLEMENTATION-GAP NOTE** | `INV-HOME-002` no implementado en profundidad (`SC-01`) |
| B — Home de Juli | **SAFE WITH IMPLEMENTATION-GAP NOTE** + `EDITORIAL` | Capacidad aprobada sin superficie en ninguno de los dos lados |
| B — Planner Tareas / Calendario / Planes | **SAFE TO SHOW AS PRODUCT** | MATCH en los tres lados |
| B — Planner Responsabilidades (dentro de Tareas) | **SAFE TO SHOW AS PRODUCT** | MATCH en los tres lados; `PLANNER:363-377` |
| B — Planner Horarios (superficie propia) | **SAFE WITH IMPLEMENTATION-GAP NOTE** | Sin Product Truth (`SC-03`). Sólo como contenido integrado en Calendario |
| B — Family Personas | **SAFE TO SHOW AS PRODUCT** | MATCH |
| B — Family Mapa (sin bloque `AHORA`) | **SAFE TO SHOW** | Presencia real en Integration (Postgres + Realtime + `expo-location`) |
| B — Family Mapa (con bloque `AHORA`) | **SAFE AS VISUAL SHELL ONLY** | `people_presence:1830` lo prohíbe (`SC-07`) |
| B — Family Lugares | **SAFE WITH IMPLEMENTATION-GAP NOTE** | Aprobado; 6 tablas en DB, 0 servicios |
| B — Hoja de miembro (acciones) | **SAFE TO SHOW** | Mutaciones reales (`finalizeMember`, `updateMemberRole`, `requestRoleChange`) |
| B — Hoja de miembro: teléfono / fecha de nacimiento | **SAFE AS VISUAL SHELL ONLY** | Los campos existen en el tipo y **nunca se renderizan** |
| B — Compartir ubicación (concepto) | **SAFE TO SHOW** | Decisión individual aprobada en los tres lados |
| B — Control de Precisión / Pausar | **DO NOT SHOW AS WORKING CAPABILITY** | `U-07` |
| B — Interruptor global de ubicación | **DO NOT SHOW** | `U-06` |
| B — ETA | **DO NOT SHOW** | `U-05` |
| B — Mensajes root / Familia García | **SAFE WITH IMPLEMENTATION-GAP NOTE** | Authority FROZEN; Figma designed; Integration 0 |
| B — Mensaje "El técnico viene entre las 4 y las 6" | **SAFE TO SHOW AS PRODUCT** | Copy exacto de `FEED:232` |
| B — Feed (posts planos) | **DO NOT SHOW AS WORKING CAPABILITY** | `U-13` |
| B — Quick Actions | **SAFE TO SHOW** | `HOME:133-143`; 3 de 4 implementadas |
| C — Plan detail (cumpleaños) | **SAFE TO SHOW AS PRODUCT** | MATCH en los tres lados; ejemplo canónico de la autoridad |
| C — Plan detail: porcentaje único | **SAFE TO SHOW** — **sólo junto con su conteo**, que es como Figma ya lo hace | MATCH (§20 SC-04, corregido) |
| C — Plan detail: milestones | **DO NOT SHOW** | `U-22` |
| C — Inventory root + filtros de estado | **SAFE TO SHOW AS PRODUCT** | MATCH en los tres lados |
| C — Inventory por lugar (filtro) | **SAFE WITH IMPLEMENTATION-GAP NOTE** | Aprobado; sin columna en Integration |
| C — Cantidad por espacio | **DO NOT SHOW** | `U-19` |
| C — Relación producto↔lugar única | **DO NOT SHOW** | `U-20` |
| C — Consumo de stock (escritura) | **SAFE TO SHOW** | Endpoint real |
| C — Historial de consumo | **DO NOT SHOW** | Sin endpoint de lectura |
| **C — Shopping List (superficie)** | **DO NOT SHOW AS WORKING CAPABILITY** | `U-01`, SC-02 |
| **C — `Empezar compra` / `Total pagado` / `Registrado en Finanzas`** | **DO NOT SHOW** | `U-02`, `U-03`, `U-04` |
| C — Cadena Restock Need → Planner Task → Finance | **SAFE TO SHOW WITH IMPLEMENTATION-GAP NOTE** | Es la cadena **aprobada** (`INVENTORY:813-835,1050-1059,1414-1418`) y existe en Integration |
| D — Resumen / Movimientos / Pagos / Análisis | **SAFE TO SHOW AS PRODUCT** | MATCH total |
| D — New Movement (gasto/ingreso/transferencia) | **SAFE TO SHOW AS PRODUCT** | 3 endpoints reales |
| D — Cuentas / Tarjetas / `Saldo sin establecer` | **SAFE TO SHOW AS PRODUCT** | MATCH total |
| D — Límites de gasto | **SAFE TO SHOW AS PRODUCT** | MATCH |
| D — Papelera + restaurar | **SAFE TO SHOW AS PRODUCT** | MATCH |
| D — Refund / corrección (la sheet) | **SAFE AS VISUAL SHELL ONLY** | La sheet existe; la profundidad del modelo no está en Figma |
| D — Pools de dinero | **DO NOT SHOW** como modelo | `F-04` |
| D — Cuotas de tarjeta | **SAFE WITH IMPLEMENTATION-GAP NOTE** si el guion lo pide | `F-02` |
| D — Switch de scope que cambia cifras | **SAFE AS VISUAL SHELL ONLY** | `U-17` |
| E — Activos root + Asset detail | **SAFE WITH IMPLEMENTATION-GAP NOTE** | Aprobado FROZEN; Figma de alta fidelidad; Integration 0 |
| E — Garantía del Asset | **SAFE WITH IMPLEMENTATION-GAP NOTE** | `ASSETS_V2:266` |
| E — Gasto del Asset referenciado a Finance | **SAFE WITH IMPLEMENTATION-GAP NOTE** | `ASSETS_V2:351-354` |
| E — Tap Asset → archivo de HomeCloud | **SAFE AS VISUAL SHELL ONLY + editorial** | `U-25`; `MASTER:237` lo prohíbe como tap real |
| E — PS5 como Asset de demo | **SAFE TO SHOW** | `MASTER:214` "demo sugerida" |
| E — `Comprada: Mar 2024` / `$580.000` en la ficha | **DO NOT SHOW** | `U-23` |
| E — `Mantenimiento` como campo de Asset | **DO NOT SHOW** | `U-24` |
| E — HomeCloud Archivos (root, carpetas, nombres) | **SAFE TO SHOW** | Browse + carpetas + intake reales |
| E — HomeCloud Recuerdos (timeline, álbumes, resurfacing) | **SAFE WITH IMPLEMENTATION-GAP NOTE** | Aprobado FROZEN; Figma coherente; Integration backend-only |
| E — HomeCloud Written Memory | **SAFE WITH IMPLEMENTATION-GAP NOTE** | `HC_V2:282-309` |
| E — HomeCloud audio / nota de voz | **SAFE WITH IMPLEMENTATION-GAP NOTE** | Aprobado en V2 (resuelve A-02); captura real existe en Figma Quick Actions |
| E — Recuerdo con persona o evento | **DO NOT SHOW** | `U-12` |
| E — `Factura` / `Garantía` / `Manual` como **nombres de archivo** | **SAFE TO SHOW** | Válido y persiste |
| E — Los mismos como **documentos clasificados** | **DO NOT SHOW** | `U-18` |
| E — Visor de archivo de HomeCloud | **SAFE AS VISUAL SHELL ONLY** | `N-15` — el viewer existe en Figma; Integration no lo invoca |
| E — Papelera de HomeCloud | **DO NOT SHOW** | `U-15` |

---

## 27. REUSE SUITABILITY

### DIRECT REUSE — el componente puede usarse casi tal cual

`B_PLANNER_TASKS` · `B_PLANNER_RESPONSIBILITIES` · `B_PLANNER_CALENDAR` · `B_PLANNER_PLANS` · `B_FAMILY_PEOPLE` · `B_FAMILY_MAP` · `B_QUICK_ACTIONS` · `C_PLAN_DETAIL_BIRTHDAY` · `C_PLAN_DETAIL_MEASUREMENT` · `C_INVENTORY` · `C_INVENTORY_LOW_STOCK` · `C_INVENTORY_OUT_OF_STOCK` · `D_FINANCE_SUMMARY` · `D_FINANCE_SUMMARY_HOUSEHOLD` · `D_FINANCE_MOVEMENTS` · `D_FINANCE_NEW_MOVEMENT` · `D_FINANCE_PAYMENTS` · `D_FINANCE_ANALYSIS` · `D_FINANCE_ADMIN` · `D_FINANCE_ORGANIZAR` · `E_ASSETS` · `E_ASSET_PS5` · `E_HOMECLOUD_FILES` · `E_HOMECLOUD_MEMORIES` · `E_HOMECLOUD_FOLDER`

### REUSE WITH DATA ADAPTER — estructura correcta, datos de demo a inyectar

`B_HOME` · `B_HOME_SCROLLED` · `B_HOME_HOUSEHOLD_OVERLAY`

Datos a inyectar: rol del viewer, `Coordinador`/`Adolescente`; fecha y greeting; conteos `Ver N más`; badge de notificaciones; nombres de tareas/eventos; cifras de Finance (si se quiere que coincidan con el canon de demo `Supermercado $48.720`, `PS5 Mar 2024 · $580.000` de `NO_UI:1275-1280`); conteos de favoritos deérées de Memories.

### REUSE WITH STATE ADAPTER — el modelo de interacción necesita estado controlado por la presentación

`B_FAMILY_MAP` (los pines son **porcentajes literales** `x="25%" y="45%"` — cualquier reposicionamiento exige control de estado) · `B_FAMILY_PLACES` · `B_FAMILY_MAP_MEMBER_SHEET` · `E_HOMECLOUD_MEMORIES` (el `ViewerHost` y la pila de sheets son controlados por un `SurfaceContext`) · `E_HOMECLOUD_FILE_INFO` · `D_FINANCE_ADMIN` (sheet multi-destino) · **`B_PLANNER_HORARIOS`** (no capturado, requiere su propia superficie de estado)

### REUSE VISUAL ONLY — reproducir la anatomía, no depender de la lógica de producto

`C_INVENTORY_PLACES` (el esquema de Integration no tiene lugar) · `B_HOME_JULI` (no existe en Figma; hay que reproducir la anatomía de Home con densidad `child`) · `B_PLANNER_HORARIOS` · `B_FEED_MESSAGES_ROOT` · `B_FEED_FAMILY_CONVERSATION` (el dominio de Mensajes no existe en Integration)

### DO NOT REUSE

`C_SHOPPING_LIST` — contradice Product Truth (`SC-02`) · `B_FEED` (superficie **retirada**) · cualquier control de **Compartir ubicación**, **Precisión**, **Pausar** · cualquier superficie de **ETA** · **Milestones** · **Shopping → Finance** · **cantidad de stock por espacio** · **recuerdos etiquetados con persona o evento** · **Papelera de HomeCloud** · **Scanner**

---

## 28. PRESENTATION READABILITY NOTES

Sin coreografía. Sólo si la superficie, tal como está, sobrevive a ser mostrada dentro de un teléfono mayor en un lienzo 1280×720.

| Superficie | PRESENTATION READABILITY | Razón |
|---|---|---|
| `B_HOME` | **WHOLE DEVICE ENOUGH** | Jerarquía de 5 secciones con rótulos grandes; el ojo encuentra `NECESITA ATENCIÓN` sin zoom |
| `B_PLANNER_TASKS` | **LIKELY SELECTIVE EXPOSURE** | Las filas son densas y el contenidoWraps ("Comprar regalo de de…"); 60 filas en un scroll |
| `B_PLANNER_RESPONSIBILITIES` | **WHOLE DEVICE ENOUGH** | 4 filas, mucho aire, ritmo legible |
| `B_PLANNER_CALENDAR` | **LIKELY SELECTIVE EXPOSURE** | Timeline con horas a la izquierda y color por responsable |
| `B_PLANNER_PLANS` | **WHOLE DEVICE ENOUGH** | 6 planes con % y fecha; cada fila es legible |
| `C_PLAN_DETAIL_BIRTHDAY` | **WHOLE DEVICE ENOUGH** | 3 secciones con contadores; muy poco texto |
| `C_PLAN_DETAIL_MEASUREMENT` | **LIKELY SELECTIVE EXPOSURE** | Más contenido de measurements |
| `C_INVENTORY` | **LIKELY SELECTIVE EXPOSURE** | Chips de lugar/estado en dos filas + bottom nav; mucho aire desperdiciado arriba |
| `C_INVENTORY_PLACES` | **WHOLE DEVICE ENOUGH** | Pocas filas, alto por item |
| `C_SHOPPING_LIST` | **LIKELY CAMERA/CROP** | *( moot — DO NOT REUSE )* |
| `D_FINANCE_SUMMARY` | **LIKELY SELECTIVE EXPOSURE** | 4 bloques de cifras; cada trío es una unidad legible, el bloque completo no |
| `D_FINANCE_MOVEMENTS` | **LIKELY LOCAL FOCUS** | Filas de 2 líneas con importes; el texto más pequeño es el subtítulo de cuenta |
| `D_FINANCE_PAYMENTS` | **LIKELY SELECTIVE EXPOSURE** | Tiles de tarjeta con 4 cifras cada uno |
| `D_FINANCE_ANALYSIS` | **LIKELY LOCAL FOCUS** | Barras + etiquetas de categoría; el eje y los importes son el detalle |
| `D_FINANCE_ADMIN` / `D_FINANCE_ORGANIZAR` | **LIKELY SELECTIVE EXPOSURE** | Límites por categoría: 3 filas con 2 cifras cada una |
| `B_FAMILY_PEOPLE` | **WHOLE DEVICE ENOUGH** | 4 miembros + 3 secciones cortas |
| `B_FAMILY_MAP` | **LIKELY CAMERA/CROP** | El mapa es un gradiente con rótulos fijos; el bloque `AHORA` inferior compite por el tercio inferior |
| `B_FAMILY_PLACES` | **WHOLE DEVICE ENOUGH** | 3 lugares con conteo |
| `B_FEED_MESSAGES_ROOT` | **LIKELY LOCAL FOCUS** | 6 filas de conversación con 2 líneas cada una |
| `E_ASSETS` | **LIKELY SELECTIVE EXPOSURE** | 9 assets con 2 líneas; el segundo (`Generador eléctrico industrial trifásico…`) ya **trunca** en el diseño |
| `E_ASSET_PS5` | **WHOLE DEVICE ENOUGH** | 3 secciones cortas, 2 filas de documento, mucho aire |
| `E_HOMECLOUD_FILES` | **LIKELY SELECTIVE EXPOSURE** | Un nombre de archivo ya ocupa 2 líneas ("Presupuesto detallado de la reforma del baño con materiales y mano de obra incluida") |
| `E_HOMECLOUD_MEMORIES` | **LIKELY CAMERA/CROP** | Timeline muy largo (2020–2026); un año concreto es legible, el scroll completo no |
| `E_HOMECLOUD_FOLDER` | **WHOLE DEVICE ENOUGH** | Carpeta con pocos items |
| `B_QUICK_ACTIONS` | **WHOLE DEVICE ENOUGH** | 4 acciones con subtítulo, sobre scrim |

**Notas de legibilidad horizontal, medidas:**
- La fila de tarea más larga de `B_PLANNER_TASKS` es *"Preparar la mochila del campamento de Martina con lista completa de abrigo y linterna"* — **97 caracteres** en una sola línea a 390 px. Se corta. Cualquier dato de demo para Tasks debe respetar ~40 caracteres.
- El nombre de archivo más largo de `E_HOMECLOUD_FILES` ocupa **2 líneas** ya en 390 px.
- `E_ASSETS` ya trunca nombres largos **en el diseño**, no por overflow: es una decisión deliberada (`Root.tsx`).

---

## 29. PRODUCT-TRUTH UNCERTAINTIES

Ranked. Session 8 no debe heredar veinte incógnitas triviales.

### P0 — PRODUCT TRUTH AMBIGUITY (requiere decisión del usuario)

| # | Incógnita | Por qué es P0 | Qué se decide | Impacto si no se resuelve |
|---|---|---|---|---|
| **P0-01** | **Shopping List: ¿se reabre la decisión?** | El freeze autoritativo la **excluye por nombre** (3 veces), Figma la implementa completa, y el master de presentación (`MASTER:213,616,634`) la da por existente. El guion (bloque 3) dice "puede sumarse automáticamente a la lista de compras". **Tres posiciones incompatibles.** | ¿Se (a) ratifica la exclusión → el guion se reescribe con la cadena Restock Need, o (b) se abre un Product Pass de Shopping List → Figma se convierte en target autorizado y Integration gana un gap grande? | Si se muestra `Lista de compras` como producto, la presentación **afirma una capacidad que la autoridad niega**. Es el mayor riesgo legal de la campaña |
| **P0-02** | **Feed: ¿sigue siendo Feed o es Conversation?** | `FEED_PRODUCT_FREEZE_V1.0` (FROZEN 2026-09-02) congela un Feed plano. Figma lo **retiró** explícitamente por "Family Conversation V2" (`types.ts:183-185`) — **una decisión que ningún documento de producto registra**. Integration tiene un stub. El guion depende de un momento Feed (bloque 2) | ¿Se ratifica la retirada (y el momento del guion se cuenta como conversación), o se reabre el Feed? | Sin decisión, Session 7 no sabe si puede mostrar `Mensajes → Familia García` como *el Feed* o sólo como *una conversación* |
| **P0-03** | **Horarios / Schedule: ¿es capacidad?** | Tabla `household_schedule_blocks`, 4 endpoints, RPC de privacidad, pantalla dedicada en **ambos** lados, y **cero** Product Truth. `Schedule` sólo existe como concepto de frontera (`PLANS_PRODUCT_TRUTH:378-379`) | ¿Se congela Schedule como entidad + superficie, o se degrada a proyección del Calendario? | Figma muestra una pantalla propia muy presentable (`Semana de la casa · 4`). Sin decisión, no sabemos si presentarla es dato o invención |
| **P0-04** | **Home: ¿qué es "materialmente diferente"?** | `INV-HOME-002` exige proyecciones materialmente distintas; Figma hace sólo densidad; Integration hace cuatro módulos (que viola `INV-HOME-003`). **Nadie cumple el freeze** | ¿Se añade un Home de rol a Figma? ¿Se acepta la densidad como cumplimiento? | El guion tiene un momento completo dedicado a Juli (bloque 2). Es la segunda mayor ambigüedad |

### P1 — PRESENTATION SAFETY AMBIGUITY

| # | Incógnita | Efecto |
|---|---|---|
| **P1-01** | **Assets ↔ HomeCloud: ¿hay tap o editorial?** | `MASTER:237` dice "hasta estar cerrada, usar transición editorial, no tap real". Figma **tiene** un tap (`push('homecloud')` sin id). La autoridad `ASSETS_V2:366-370` congela `File ↔ Asset`. ¿Se cierra la relación (→ el tap pasa a ser real) o se mantiene editorial? |
| **P1-02** | **Canción de la compra: ¿se nombra "lista de compras" en el diálogo?** | Si P0-01 se resuelve como (a), el término puede aparecer **oral** pero no en pantalla. Hay que decidir si el guion se toca |
| **P1-03** | **¿Se puede mostrar `Family / Lugares` si sólo hay un catálogo?** | Product Truth dice que Lugares comparte espacio **únicamente con Avisos**. Sin Avisos, la tab queda a medias |
| **P1-04** | **Porcentaje de Plan: ¿se muestra?** | `U-21`. Depende de si el guion necesita la cifra |
| **P1-05** | **Nombre del asistente: Geni vs Homi** | Heredado de `00_SOURCE_MAP` C-03 / SI-01. Figma usa **Homi** en Quick Actions (`Preguntarle a Homi`). El guion (bloque 9) dice **Geni**. El patch del master (`MASTER:1662`) ya ordena `Geni → Homi`. Confirmado que Figma está del lado correcto |
| **P1-06** | **¿El mapa se muestra con pins en % literal?** | Los pines de Figma están en coordenadas hardcodeadas. Si la presentación "recompone" el mapa, deja de ser el target visual. Decidir si se acepta el mapa como ilustración |
| **P1-07** | **Cuotas de tarjeta: ¿el guion las necesita?** | `F-02` es Integration-only. Si el guion no las pide, no mostrarlas |

### P2 — IMPLEMENTATION DETAIL

| # | Incógnita | Nota |
|---|---|---|
| **P2-01** | Applied state de las 110 migraciones | Se leyó el **repo**, no una BD desplegada. Los estados de esquema asumidos pueden diferir del entorno real |
| **P2-02** | ¿117 vs 110 migraciones? | `00_SOURCE_MAP:358` dice 117; el recuento real es 110. Corregido en §3.2. No investigada la discrepancia |
| **P2-03** | Dos stacks de Plan (V1 sobre `planner_goals` vs Plan Graph sobre `planner_plans`) | Ambos existen y ambos escriben. No se verificó cuál es canónico en runtime ni si pueden entrar en conflicto |
| **P2-04** | Pantallas huérfanas de Integration | `PlannerGoalsScreen.tsx` (396 L), `PlannerPlansScreen.tsx` (90 L), `PlannerSchedulesScreen.tsx` (119 L), `screens/calendar/CalendarScreen.tsx` (867 L) — 0 imports. No hay documento que declare la decisión de retirada |
| **P2-05** | Bucket `paid` de Payments: ¿alcanzable en UI? | El backend devuelve PAID y `groupPaymentDuesByStatus` calcula el bucket, pero `PaymentsList.tsx:149` no lo destructura. Sólo alcanzable por deep link (`financeNavigation.ts:62-72`). No verificado |
| **P2-06** | Alcance real de `CARE_SECTION_LABEL` | Definido en `assets/types.ts:143` y **nunca usado**. Decisión de diseño pendiente, no de producto |
| **P2-07** | `HOMECLOUD_PRODUCT_EXPERIENCE_FREEZE_V1_3.md` y `HOMECLOUD_FILES_UX_UI_FREEZE_V1.md` | Citados como vigentes por `HOMECLOUD_FILES_HANDOFF:14-15`, existen en `Desktop\HomePlus-worktrees\homecloud-files\docs\homecloud\`, `mtime` **2026-10-04** (posterior al V2 del 2026-09-25). **No leídos** — fuera del alcance geográfico de esta sesión. Podrían mover citas de §18 |
| **P2-08** | Precedencia entre los dos presentation masters | `V2.0` (2026-09-22) vs `V1.0` (2026-09-23). Ninguno declara relación. No afecta capacidad (§2.3 A-06) |
| **P2-09** | Alcance de `member-permissions` en Figma | `MemberPermissionsScreen` es alcanzable, pero `home/viewer.ts:14-15` afirma que es decorativo y nadie consulta `tierOfRole` desde allí |
| **P2-10** | `HOMECLOUD_ORCHESTRATOR_HANDOFF.md` (2026-09-25) | Clasificado HISTORICAL por nombre/fecha, **no leído** |
| **P2-11** | `tests/`, `docs/implementation/homecloud/`, `backend/sql/`, `backend/prisma/` | No leídos. Podrían contener contratos adicionales |
| **P2-12** | `push('family-feed')` desde `tests/` | Búsqueda limitada a `src/**`. Un test podría forzar la ruta y renderizar el alias |

---

## 30. EXACT HANDOFF FOR SESSIONS 7/8

Lista compacta y accionable.

### 30.1 Reglas generales

1. **Usar Figma como target visual de B, C (salvo Shopping), D y E.** El sistema visual es UNIFIED salvo spacing (§4.4). No hace falta rediseñar nada.
2. **No mutar Figma-app.** El shell es 390×844 fijo, sin escalado y sin safe-area real (§5). Un dispositivo mayor + cámara/crop debe construirse aparte.
3. **Toda relación cross-module de la cadena narrativa es `EDITORIAL`, `SHARED_ELEMENT` o `DEVICE_TRANSITION`.** Sólo `Plan → Task` y `Payment → Movement` son `BOTH`, y la segunda es intra-módulo (§19).
4. **El único módulo que se puede presentar como producto real sin matiz es Finance.**
5. **Alcance de comments, `origin` de provenance y lectura de movimientos: NO mostrar** (implementación parcial o ausente).

### 30.2 Por módulo

| Módulo | Qué usar | Qué NO mostrar | Nota de seguridad |
|---|---|---|---|
| **B — Home** | Figma Home tal cual, con sus 5 secciones en orden `Attention → Today → Upcoming → Insights → Recent` | Un "Home de Juli" como módulo separado | La ficha de otro rol = `EDITORIAL` + nota de gap. `INV-HOME-003` prohíbe módulos duplicados |
| **B — Planner** | Figma `Tareas / Calendario / Planes` con **3** tabs | Responsabilidades como 4ª tab; Milestones; Horarios como tab propia | Responsabilidades va como fila dentro de Tareas (los 3 lados coinciden) |
| **B — Family** | Figma `Familia / Mapa / Lugares` con **3** tabs | El bloque `AHORA` permanente del mapa; cualquier control de Precisión/Pausa/Compartir; ETA | El mapa **sin** el bloque `AHORA` (`people_presence:1830`). `Lugares` = nota de gap |
| **B — Feed** | `Mensajes → Familia García`, con el copy de `FEED:232` | Una pantalla "Feed"; reactions; comentarios | **P0-02 sin resolver.** La transición al mensaje es editorial |
| **C — Plans** | Figma Plan detail con `TAREAS / EVENTOS / MEDICIONES` | Milestones; el porcentaje único sin desglose | El Plan de cumpleaños es **ejemplo canónico** del freeze |
| **C — Inventory** | Figma Inventario con los chips `Poco` / `Agotados`; el filtro por lugar | Shopping List; cantidad por espacio; producto↔lugar único; historial de consumo | La cadena **aprobada** es `Stock bajo → Restock Need → Planner Task → Finance`. Ésa es la que se muestra |
| **C — Shopping List** | **NADA** | **TODO** | **P0-01.** `DO NOT SHOW AS WORKING CAPABILITY`. `DO NOT REUSE` |
| **D — Finance** | Figma completo: Resumen, Movimientos, Pagos, Análisis, Cuentas/Tarjetas, Límites, Papelera, New Movement | Pools; cuotas (salvo que el guion las pida); el switch de scope **cambiando cifras**; la profundidad de refund/corrección | Único módulo SAFE TO SHOW sin matiz. Usar `"Monto por definir"` y `"Saldo sin establecer"` (copies reales) |
| **E — Assets** | Figma `Activos` + `Asset detail` **tal cual** | `Comprada: Mar 2024`; `$580.000` en la ficha; `Mantenimiento` como campo; el tap real a un archivo de HomeCloud | Aprobado FROZEN. Figma ya cumple el freeze, **incluidas 3 decisiones negativas**. Nota de gap. `Mar 2024 · $580.000` sólo como movimiento de Finance |
| **E — HomeCloud Files** | Figma `Archivos` con carpetas y nombres reales (`Factura del mes`, `Garantía lavarropas`) | Los mismos como **documentos clasificados**; la Papelera; el Scanner | Los nombres son válidos; la clasificación no existe |
| **E — HomeCloud Memories** | Figma `Recuerdos` completo: `Para volver a ver`, álbumes, timeline por año/mes, written memory, audio | Recuerdos etiquetados con persona o evento | Aprobado FROZEN. Figma de alta fidelidad. Nota de gap. Liked "candidata futura" |

### 30.3 Los cuatro P0 que Session 7 necesita resueltos antes de escribir una línea

1. **P0-01 Shopping List** — se ratifica la exclusión, o se abre un Product Pass. **Sin esto, el bloque 3 del guion no tiene superficie.**
2. **P0-02 Feed** — ¿Feed o Conversation? **Sin esto, el bloque 2 del guion no tiene superficie.**
3. **P0-04 Home de Juli** — ¿qué se muestra exactamente? **Sin esto, el momento de Juli del bloque 2 no tiene definición.**
4. **P0-03 Horarios** — sólo importa si el guion lo nombra. Es el menos urgente de los cuatro.

### 30.4 Confirmaciones positivas que Sessions 7/8 pueden apoyarse

- El nombre del asistente en Figma es **Homi**, que coincide con el patch del master (`MASTER:1662` `Geni → Homi`) y **no** con el guion (bloque 9). Confirmado que el lado correcto es Homi.
- La copia "El técnico viene entre las 4 y las 6" está **verbatim** en `FEED:232`. No es una invención de la presentación.
- La copia de Shopping ("puede sumarse automáticamente a la lista de compras") está en el guion pero **contradice** la autoridad. Es el mismo caso que P0-01.
- El master de presentación ya reconoce la deuda de Assets (`:722` *"todavía no tiene Product Freeze final"*) — cerrado por `ASSETS_V2.0`. Y ya prohíbe el audio como Recuerdo V1 (`:1608`) — **desactualizado**, `HC_V2` lo aprueba.
- El master ya reconoce que `Assets ↔ HomeCloud` debe ser transición editorial (`:237`). Figma **tiene** el tap; la autoridad lo prohíbe. Usar editorial.

---

## 31. FILES WRITTEN

Todo bajo `audit/`. Nada fuera.

| Ruta | Contenido |
|---|---|
| `audit/06_FIGMA_VS_INTEGRATION.md` | Este documento |
| `audit/runtime/session-06/figma/*.png` | **75 PNG**: 35 superficies × 2 (teléfono + contexto) + 5 de gate/arranque (`_recon-00-after-gate`, `_dbg-00-home`, `_dbg-01-planner-tasks`, `_dbg-02-planner-planes`, `_dbg-03-plan-detail`) |
| `audit/runtime/session-06/data/manifest.json` | Las 35 superficies con `module`, `surface`, `nav`, `source`, `notes` |
| `audit/runtime/session-06/data/cap-<NAME>.json` (35) | Registro por superficie: navegación, `clicks`, `text`, `consoleErrors` |
| `audit/runtime/session-06/data/census-<NAME>.json` (35) | Census de elementos interactuables |
| `audit/runtime/session-06/data/visual-system.json` | Medición de tokens por superficie (§4.3) |
| `audit/runtime/session-06/data/verify-probes.json` | Sondas: scope Finance, Horarios, Límites, Memories |
| `audit/runtime/session-06/data/console-errors.json` | `[]` — 0 errores |
| `audit/runtime/session-06/data/_discover.log` | Log de descubrimiento de navegación |
| `audit/runtime/session-06/data/_capture.log` | Log de la captura de 35 superficies |
| `audit/runtime/session-06/_tooling/*.mjs` | 9 scripts Playwright Node (`lib`, `capture`, `measure`, `verify`, `discover`, `walk-top`, `walk-deep`, `dbg1`, `dbg2`, `recon`) |

**No se escribieron** `02_*`, `03_*`, `04_*`, `05_*`.

---

## 32. PRODUCTION FILES MODIFIED

# NONE

| Repo | Verificación |
|---|---|
| **Presentación** `HomePlus_Presentacion_FINAL` | Sin escrituras. No es repo git; no se invocó ningún build ni dev-server propio |
| **Figma-app** | Sin escrituras **por esta sesión**. No se arrancó ningún servidor (se usó el proceso preexistente en 8443). No se parcheó routing. No se instaló nada. **Ver nota de concurrencia abajo** |
| **Integration** | Sin escrituras. Sólo lectura + `git` de lectura. **No** ejecuté `commit`, `stash`, `reset`, `clean`, `checkout`, `switch`, ni ningún otro comando git mutante |
| **Documentos de producto** | Sin escrituras. `Downloads/`, `Desktop/` sólo lectura |
| **Puertos** | 8443/8444/8445/4173 ya ocupados al empezar; **no se cerró ninguno** y no se levantó ningún servicio nuevo |
| **Paquetes** | **0 instalados.** Se usó el `playwright-core@1.63.0` global ya presente |

**Nota de concurrencia (declarada, no resuelta):** el control de escrituras (§33.2) detectó **un** archivo modificado en `Figma-app` **después** de mi primera escritura en `audit/`:

```
10/05/2026 01:52:24  C:\Users\thega\Desktop\Figma-app\PLANNER_FIGMA_TOTAL_FREEZE_V1.md   (633.150 bytes)
```

Mi primera escritura de runtime fue `01:08:20` (`recon.mjs`) y la última previa a ese archivo fue `01:44:43` (`verify-probes.json`). **Yo no escribí ese archivo**: todas las escrituras de esta sesión están bajo `audit/**`, enumeradas en §31, y ninguna llamada de herramienta Took una ruta fuera de `audit/`. El timestamp cae dentro de la ventana que el propio encargo advierte: *"Sessions 2, 3, 4 and 5 may be running simultaneously"*. Su contenido se clasificó en §2.2 y se usó en §20 SC-04 como evidencia corroborante. **No se investigó quién lo escribió** — investigation fuera del alcance read-only de esta sesión.

**Efecto sobre la validez de este informe:** el análisis del Planner (§9) se ejecutó **antes** de ese timestamp y leyó `src/planner/**`, no documentos. Sus conclusiones son independientes del archivo nuevo, y el archivo nuevo las **corrobora** en los tres puntos verificados: 3 tabs, `Responsabilidades` y `Horarios` como destinos un nivel más adentro vía `EntryRow`, y *"no hay tabs anidadas"*.

**Other repos:** `Downloads/`, `Desktop/`, `Documentos-de-planner-historicos/` → 0 escrituras. `Presentacion_HomePlus_Final` y `Figma-app-backups` → no visitados para escritura.

---

## 33. VERIFICATION

Verificado con `verifying-before-completion`. Cada afirmación lleva el comando o el artefacto que la sostiene.

### 33.1 Checklist del encargo (§46)

| Requisito | Estado | Evidencia de la verificación |
|---|---|---|
| Matriz de superficies B/C/D/E completa | **PASS** | §6 contiene **51 filas** verificadas por conteo: **B=19, C=9, D=12, E=11**. Cada fila tiene los 12 campos del contrato |
| Matriz de capacidades completa | **PASS** | §7 contiene **37 capacidades** verificadas por conteo, con los 8 campos pedidos. Incluye los 11 ejemplos del encargo: completar tarea, ver responsabilidad, cambiar evento de calendario, abrir Plan, compartir ubicación, postear en Feed, comentar/reaccionar, mover ítem a Shopping, registrar gasto, chequear pago, abrir documento de Asset, ver Memory |
| Screenshots existen para las superficies runtime reclamadas | **PASS** | 35 superficies × 2 PNG + 5 de gate = **77 PNG**, listados en §31. `Test-Path` ejecutado |
| Todo estado funcional tiene evidencia | **PASS con salvedad declarada** | Integration se apoyó 100 % en análisis estático y §0 lo declara. Donde no hubo evidencia: `FUNCTIONAL STATUS NOT VERIFIED` (§29 P2-01, P2-04, P2-05) |
| Product Truth usado donde falta implementación | **PASS** | §24 lista **20 capacidades** `product-supported but not implemented`, cada una con cita de freeze y con el estado de Integration |
| Diferencias cosméticas no etiquetadas como conflictos semánticos | **PASS** | §20 contiene **9 conflictos semánticos**, todos con criterio de autoridad y sin items de espaciado/tipografía. Las 18 diferencias visuales están aisladas en §21 con la columna "Por qué NO es conflicto" |
| Ningún fuente de producción modificada | **PASS** | §32. Verificado por ausencia de escrituras fuera de `audit/**` |
| Ningún paquete instalado | **PASS** | Sólo `playwright-core@1.63.0` global preexistente |
| Todas las escrituras confinadas a `audit/**` | **PASS** | §31 lista 5 rutas, todas bajo `audit/` |

### 33.2 Comandos de verificación ejecutados

```
# Integridad de rutas (inicio de sesión)
Test-Path → Figma-app, Integration, audit/, Guion, MASTER_FREEZE_V1.0, NO_UI_MASTER_FREEZE_V2.0  ⇒ 6/6 True

# Puertos antes de actuar
Get-NetTCPConnection -State Listen  ⇒  8443, 8444, 8445, 4173 ocupados; 56221 (Supabase) ocupado
  ⇒ decisión: NO arrancar servidor, NO cerrar procesos

# Identificación del servidor Figma-app existente
Invoke-WebRequest /src/context.tsx ⇒ 8443 len=27088 sig=AppProvider  ⇒ 8443 es Figma-app
  (8444 y 4173 devolvieron HTML fallback ⇒ no son Figma-app)

# Captura
node audit/runtime/session-06/_tooling/capture.mjs
  ⇒ "DONE shots=35 consoleErrors=0"
  ⇒ 0 linhas "!! TAP FAIL" / "!! NAV MISSING" / "!! STEP ERROR"

# Sistema visual
node audit/runtime/session-06/_tooling/measure.mjs
  ⇒ 8 superficies medidas, conteos de font-size / font-family / radius / shadow / color / bg / gap / padding / weight

# Sondas de comportamiento
node audit/runtime/session-06/_tooling/verify.mjs
  ⇒ financeScope: switchFound=true dataChanged=false
  ⇒ plannerHorarios: entryFound=true
  ⇒ financeAdmin captured
  ⇒ homecloudMemories captured

# Evidencia escrita
Get-ChildItem figma\*.png | Measure-Object  ⇒ 75   (35 superficies × 2 + 5 de gate)
Get-ChildItem data\cap-*.json | Measure-Object ⇒ 35
Get-Content data\manifest.json ⇒ 35 superficies
Get-Content data\console-errors.json          ⇒ []

# Integridad del informe
Secciones "## 0." a "## 33."   ⇒ 34/34, 0 faltantes
Caracteres CJK / U+FFFD residuales ⇒ 0
Sentinelas APPEND-* residuales    ⇒ 0
Líneas duplicadas (>60 chars)    ⇒ 0
Filas de §6                      ⇒ 51 (B=19, C=9, D=12, E=11)
Filas de §7                      ⇒ 37

# Control de escrituras fuera de audit/** (tras la 1ª escritura de esta sesión)
Figma-app         ⇒ 1 archivo, de sesión paralela, declarado en §32
Integration       ⇒ 0
Presentación      ⇒ 0
Downloads/Desktop ⇒ 0
```

### 33.3 Verificaciones negativas (lo que NO se hizo, por contrato)

| No hecho | Motivo |
|---|---|
| No se arrancó Integration (Expo/Metro/Supabase) | Contrato §11 *"Prefer static/source inspection first. Do NOT launch full native app unless required."* Falta `expo-dev-client` y `react-native-maps` con build nativo |
| No se parcheó el routing de Figma-app | Contrato §8 *"Do NOT patch routing just to make screenshots easier."* Todo se alcanzó por Context |
| No se deepening de Finance `Administrar` destino por destino | Fuera del alcance de B/C/D/E de superficie; verificado por fuente y marcado como tal (§15.3) |
| No se leyó `HOMECLOUD_PRODUCT_EXPERIENCE_FREEZE_V1_3.md` / `HOMECLOUD_FILES_UX_UI_FREEZE_V1.md` | Fuera del alcance geográfico del encargo (`Downloads` / `Desktop` top-level). Registrado como `P2-07` con su riesgo |
| No se decidió coreografía, timing ni escalado | Contrato §7 |

### 33.4 Honestidad sobre los límites

- **Session 6 no depende de Sessions 2-5.** No se leyó ni se citó `02_SCENES_A_B_AUDIT.md` como evidencia. La única entrada previa usada es `00_SOURCE_MAP.md` y `01_RUNTIME_BASELINE_ERRATA.md` (contrato §1 los declara fuentes).
- **La clasificación de "códigos añadidos/borrados" de Sessions 2-5 no se tocó.** `02_*` existe y no fue modificado.
- **Dos correcciones a Session 0** quedan registradas y son hallazgos propios: (a) **110** migraciones, no 117, y en `supabase/migrations/`; (b) Figma-app tiene **35 superficies de evidencia propia** capturadas en esta sesión, no 0.
- **Una autocorrección material:** el hallazgo SC-04 (porcentaje de Plan) fue **retirado como conflicto** al verificarlo contra el texto renderizado y contra `PLANNER_FIGMA_TOTAL_FREEZE_V1.md`, escrito por una sesión paralela. Queda documentado en §20 y §12.4 con la evidencia que lo refuta, para que no se reabra.
- **Una escritura ajena detectada:** `Figma-app\PLANNER_FIGMA_TOTAL_FREEZE_V1.md` a las `01:52:24`, posterior a mi primera escritura. No es mía y no se investigó el origen. Declarada en §32.
- **Ningún estado de Integration se afirma como verificado en runtime.** La distinción está en §0 y repetida donde aplica.

### 33.5 Verdict

**PASS** para el alcance B/C/D/E de Session 6, con las cuatro salvedades registradas: (1)Integration no se ejecutó, por lo que todo su estado es inferencia de fuente; (2) cuatro ambigüedades **P0** de Product Truth requieren decisión del usuario antes de Session 7 (Shopping, Feed, Home por rol, Horarios); (3) dos documentos HomeCloud potencialmente más recientes no se leyeron (`P2-07`); (4) los destinos de `Administrar` en Finance están verificados por fuente pero no capturados uno a uno.

**Ninguna production file fue modificada. Ningún paquete instalado. Ningún proceso ajeno terminado. Todas las escrituras bajo `audit/**`.**

---

*Fin de Session 6. Siguiente: Session 7 (consume §30). No implementado. No modificar presentación, Figma-app ni Integration.*

