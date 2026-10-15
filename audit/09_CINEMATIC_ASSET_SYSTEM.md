# 09_CINEMATIC_ASSET_SYSTEM

Sistema canónico de assets cinematográficos para la presentación HomePlus.
Autoridad derivada de Sessions 0–8 (blueprint, motion architecture, checklist, acceptance matrix, performance QA, hardening 8.1, registry, gate). Esta especificación NO modifica producción; solo gobierna la capa de assets.

---

## 0. MINI-CLOSURE — RESOLUCIÓN DE LAS 4 AMBIGÜEDADES PENDIENTES

### 0.1 HERO usage beyond the two authorised rows

- **Autorización semántica canónica**: `HERO` verdadero existe solo en **`A14`** (reveal HomePlus) y **`I01`** (nombre Homi), ambos con `hero 880` / `E-HERO`.
- **`J14`** (end card): entrada de marca de cierre, **420 ms**, no es un beat semántico HERO.
- **`A17` / `J03`**: `SVG EDITORIAL_DRAW`, **800 ms**, `E-DEFAULT`, mecanismo `stroke-dashoffset`. **No son HERO semántico** y no autorizan un noveno token.
- **Clasificación canónica por beat**:
  | Beat | Token | Clase semántica de objeto |
  |---|---|---|
  | A14 | hero (880/E-HERO) | VERDADERO HERO REVEAL de marca |
  | I01 | hero (880/E-HERO) | VERDADERO HERO REVEAL de nombre Homi |
  | J14 | closing-brand entrance (420) | Closing brand state entrance (manual), no semantic HERO |
  | A17, J03 | SVG draw (800/E-DEFAULT) | **EDITORIAL_DRAW** (trazo de contorno), no semantic HERO |
  | J06 | (mapa: shared) | **EDITORIAL_DRAW** (ghost links dashed) |
  | G04 | spatial | **EDITORIAL_DRAW/vuelo** (transaction trace) |
  | I06 | shared 1400 | SHARED_ELEMENT (no hero) |
  | A11 | enter 320 | hero LINE editorial, no reveal hero |

### 0.2 A17 / J03 — duration problem

- Estado: `SVG EDITORIAL_DRAW` + `E-DEFAULT` + 800 ms.
- La banda de duración real es **700–900 ms** (stroke draw), 800 ms como punto medio de implementación.
- Motion class: `EDITORIAL_DRAW` — familia de mecanismo `SVG+CSS`, `stroke-dashoffset`, stroke `4–6 px`, `fill:none`, sin perspectiva.
- Reduced motion: estado final dibujado a `0 ms` (blueprint línea 755).
- No son semánticamente HERO (no identidad de producto); son **editorial draws / graphic reveals**.

### 0.3 Shared-element ambiguity F05 / G09 / J03

Decisiones cerradas (detalle en `09_SHARED_OBJECT_DECISIONS.md`):

| Beat | Objeto | Decisión canónica |
|---|---|---|
| F05 → G01 | device | `ADD_TO_SHARED_REGISTRY` — `device.product` (mismo dispositivo real cruzando boundary) |
| G09 | "every stack element" | `EDITORIAL_ONLY` — colapso de composición; el device sí persiste |
| J03 | house outline | `PERSISTENT_SCENE_OBJECT` — `structure.house` nace en J03 y persiste hasta J11; no shared-layer, no flight, no clone |
| A17 house | trazo con Juli | `EDITORIAL_ONLY` (motif de trazo; no persistente) |

Nunca asumir "shared" por similitud visual. Lookalikes no califican.

### 0.4 J11 easing fuera del sistema

- `J11` es `spatial` 1400 ms, `E-DEFAULT` (`cubic-bezier(.22,.61,.36,1)`), budget 3 movers.
- Las menciones `ease-in-out` / `ease-in` de `07_MOTION_STAGECRAFT_AUDIT.md:1276` quedan **superseded**: se re-mapean a `E-DEFAULT` sin alterar duraciones (300/550/550, stagger 120 ms).
- No spring solver, no overshoot, no quinta curva. Ver reduced motion: familia byte-idéntica, nunca se mueve.

---

## 1. TAXONOMÍA Y DEFINICIÓN DE OBJETOS

Formato por asset: id · clase de objeto · persistencia semántica · shared · vector/raster · formato · capas · partes animables · partes fijas · escala · origen · profundidad · sombra/highlight · color · familias motion permitidas/prohibidas · rol de atención · riesgo de overdesign · notas.

### A. BRAND

**A.1 `brand.homeplus.master`** — clase: logo maestro · persistencia: estática de marca · shared: NO (transición de marca tratada como `EDITORIAL` + reveal hero) · existe: YES · source: `Figma-app/src/assets/brand/homeplus-logo-master.svg` · producir: nada · rework: migrar de PNG a SVG en producción · capas: bg tile, mark (house+family), plus, heads · animado: ninguna capa debe animarse independientemente salvo reveal · escala: 96–512 px (tokens.logo.size fuente) · pivot: centro del tile · profundidad: plano · sombra: ninguna · highlight: gradiente oficial únicamente · color: gradiente naranja oficial + trazo blanco · motion permitidos: `hero` reveal horizontal con máscara de borde duro; prohibido halo/3D/partículas/shimmer · atención: foco primario en A14 · riesgo: overdesign → doble trazo si se usan `house_outline` y `house_outline_parts` a la vez · notas: ver layer map del archivo.

**A.2 `brand.homeplus.animatable`** — clase: logo motion-ready · mismo que A.1 con roles de animación: `wall_left` → `person_big_body` → `person_small_body` → `person_*_head` → `roof_left/eave_left` → `roof_right/eave_right` → `plus_icon` · partes que NO deben separarse: pares `roof/eave` de cada lado deben moverse como un todo · scale band: 96–320 · pivot: centro de `mark` · color: idéntico al master · motion: exactamente el reveal hero A14 una vez · notas: ocultar una de las dos capas de house cuando se secuencien las partes.

**A.3 `brand.wordmark`** — NO EXISTE como archivo. Fallback tipográfico aprobado (misma familia/peso que tokens actuales) hasta producir wordmark vectorial. Banda: 78 px (token `openingTokens.type.wordmark`). Color: blanco sobre negro / naranja sobre blanco según estado. No shared.

**A.4 `brand.mono`** — NO EXISTE. Producir como variante `currentColor` del master. Uso: end card J14 y estados sobre superficies claras.

**A.5 `brand.opening_state`** — derivado de A.2, logo solo sobre negro (A13), campo `#060404`/palette tokens.

**A.6 `brand.closing_state`** — estado J14: lockup horizontal + wordmark + 4 miembros del equipo. Producir a partir de A.2 + A.3 + A.4.

**A.7 `brand.homi.mark`** — existe (`homi-mark.svg`): cuadrado `#C96B45` + estrella blanca. Reveal hero I01 (token hero 880ms). Partes fijas: ninguna separable; animate como unidad. Escala: 64–204 px. Color fijo. No shared.

**A.8 `brand.ai.mark`** — `ai.svg`: nodo naranja + radios. En G08 la regla es "IA como texto plano + caption, sin glifo/glow" — usar el glifo solo como fallback. No shared.

### B. FAMILY / CHARACTER ABSTRACTIONS

**B.1–B.4 `family.juli/.tomi/.mama/.papa`** — clase: avatar editorial · persistencia: sujetos SE-13 · shared: YES (SE-13) · existe: PARTIAL — `family-avatars.svg` con 4 avatares horneados en un solo lienzo de 284×100 · acción: **`must_split_layers`** en 4 SVG/componentes independientes; nunca usar el archivo compuesto como uno solo en A15/A16/B07/B12/J04 · partes animables: cuerpo/cabeza como unidad por persona (≤1 mover por persona, budget J11=3) · NO detach: cabeza no se separa de hombros · escala: 40–120 px, exposición 0.35–1.00 · pivot: centro del círculo de fondo · profundidad: plano con círculo de color de fondo · paleta: `#453329 #333B35 #B57956 #718374 #D3AA87 #BE9370` (del SVG existente) · motion: `enter` 320 / aparición en row · prohibidos morphs entre personas, pulse infinito · atención: secundario salvo J04–J11 (family byte-idéntico) · riesgo: inconsistencia de silueta si se redibuja en distinto estilo.

**B.5 `family.person_speaking`** — speaker motif editorial (A12), stroke-based, escala 80–160 px. No shared.

**B.6 `family.avatars_source`** — no asset de uso directo; fuente para split B.1–B.4.

### C. OPENING / CLOSING OBJECTS

Estilo canónico para todos: **flat-vector**, silhouette clara con una sola lectura a 64 px, máximo 2 niveles de detalle interno, paleta `#302922 #45362A #B57956 #718374` (+ neutros `#D3AA87 #BE9370 #DDD2C6`), sin texto legible salvo nodos canónicos, sin sombras horneadas, sin gradientes fotorealistas. Complejidad: nivel "product-grade minimal-elegant" — como `grocery-bag.svg`/`insurance-document.svg` existentes.

**C.1 `obj.grocery_bag`** (SE-03) — A03/B22/F02/F03/J02/J08. Existe. Reuse. Canónigo.

**C.2 `obj.insurance`** (SE-02) — A02/J02. Existe. Base de estilo para factura.

**C.3 `obj.heladera`** (SE-01) — **MISSING, P0, high-risk**. Producir como SVG: silueta de heladera de dos puertas con freezer superior (rectángulos redondeados `rx≈24`, línea separadora entre freezer/nevera, dos manijas verticales cortas, patas pequeñas), flat fill paleta canónica, stroke sutil `1.5`. No debe ser: rectángulo+línea básicos, ni ilustración realista, ni childish. Partes fijas: cuerpo+puertas como unidad; manijas pueden quedar en capa separada para micro-highlight pero **no** animarse independientemente. Escala: 180–420 px (A04 usa ~420px para bolsa; heladera similar). Pivot: base-center. Sombra: ninguna; halo ambiental permitido. Coherencia: debe matchear el estilo de `insurance-document.svg`.

**C.4 `obj.factura`** — representación de factura como documento (derivado de `insurance-document.svg`: página con borde redondeado, header, 3 líneas, sello/tabla simple). En H03 el nodo canónico es el PDF "Garantia PlayStation 5.pdf" — representaable como C.4 con label. P1.

**C.5 `obj.warranty_pdf`** (SE-11) — mismo tratamiento C.4 con label canónico. P1.

**C.6 `obj.calendar_fragment`** — fragmento de calendario extraído de `information-fragments.svg`. Split opcional. P2.

**C.7 `obj.message_fragment`** / **`obj.message_old_household`** (SE-04) / **`obj.message_technician`** (SE-05) — chips de mensaje con borde redondeado, 2–3 líneas tipográficas; ghosts J05 a 0.30. P1–P2.

**C.8 `obj.mochila`** — **NO PRODUCIR COMO IMAGEN**. Referencia textual canónica únicamente en J02 (SI-23: sin antecedente). Decisión registrada.

**C.9 `obj.birthday_event`** — representado por Plan card UI existente (PlannerDemoScreen). No asset editorial nuevo.

### D. STRUCTURAL EDITORIAL GRAPHICS

**D.1 `structure.house_outline`** — **MISSING, P0, high-risk**, el asset más crítico.
- Silueta: casas icónicas de dos aguas, alero limpio, **sin puerta/ventanas/caminos/chimenea** (no clipart). Trazo único continuo cerrado cuando es posible.
- Formato: SVG inline, capas: `roof`, `walls`, `base`, `plus? no` — separable por lado si se desea secuenciar (izq→der). Sin perspectiva, `fill:none`, stroke `4–6 px`, color blanco/naranja según estado.
- Animación: solo `stroke-dashoffset`/`stroke-dasharray`. Reduced: estado final a 0 ms.
- Escala: frame de escena (A17/J03 ocupan parte central); exposición 1.00 en J03–J11; no debe superar la legibilidad del tipo editorial.
- Debe servir como máscara/frame en J04–J11 sin redraw.
- Persistencia: en J03 aparece una única instancia SVG/DOM que se conserva hasta J11. No se clona, no se reparenta al `shared-layer`, no hace shared flight. En J11 se retira la tecnología; la casa no se mueve.
- Prohibido: convertirlo en otro ícono, perspectiva, sombra, path morph.

**D.2 `structure.continuity_links`** — dashed links verticales/horizontales para J06 ghosts (300/400/400 ms dash draw, opacity → 0). SVG stroke.

**D.3 `structure.flow_arrows`** — conectores RECIBE→VALIDA→RELACIONA→GUARDA→DEVUELVE (G03): chips de verbo + flechas simples 2 px. Editorial, no product UI.

**D.4 `structure.question_state`** — pregunta tipográfica sobre negro (H05–H07). No asset gráfico; glow ambiente.

**D.5 `structure.framing_helpers`** — ningún helper persistente; veil/veil-layer existente cubre framing.

### E. DOCUMENT / MEMORY ASSETS

- `doc.insurance` = C.2. `doc.ps5_manual`: P1, mismo tratamiento documento, label "Manual PS5".
- `doc.album`: P2 — representación plana: portada cuadrada con foto-frame y línea de título tipográfica. **Prohibida** foto real o gradient stand-in (E-05).
- `mem.memory_row` (SE-12): fila con frame + caption tipográfico ("Sábado 22 ago"). Sin raster.
- `mem.audio_row`: E05 aprueba "incluso un audio" → representación: fila con icono de onda simple **sin waveform dibujado prohibido**? — autoridad prohíbe waveform stand-in; usar chip "Audio" + ícono de nota. P2.
- `doc.file_fragment`/`doc.media_fragment`: chips menores reutilizando C.4 style. P3.

### F. TECH STACK LOGOS

- Todos existen en `assets/tech/`: figma (+color), react-native (+color), expo, nodejs (+color), supabase (+color), postgresql (+color), ai.
- `shared_status`: `STATIC_REPEATED_OBJECT` — aparecen en G05–G08; cada logo a 1.00 solo cuando se nombra; monochrome/ink para idle si existe par `-color`, color para el beat que lo nombra.
- Fallback si falta versión color: monocromo aceptado. No inventar marks nuevos.
- IA (G08): "IA" como texto plano + caption; el `ai.svg` es fallback.

### G. UI-ADJACENT NON-UI GRAPHICS

- `ui.map_pins` — pins editoriales (Colegio, Club) + badge "+1 h": SVG pequeño, escala 24–40 px, badge chip CSS. P2.
- `utils.transaction_pill` — pill "$48.720" que viaja tras el device (G04→I11). CSS pill, no SVG. P2.
- `utils.proposal_shell` / `utils.question_bubble` — SE-14 question bubble persistente I07→I09 con caja 777,187,238,81 byte-identity; proposal shells = componentes UI reutilizados (`Stateful...` en HomiDemoScreen), editorial-no-nuevo.
- `ui.focus_halo` — `AmbientGlow` existente; refuerzo de foco, no asset nuevo.
- `device.shell` — `PhoneFrame.tsx` existente; escala enum `1.00/1.08`, `@property --phone-scale` gate (PERF-07). No duplicar.
- `app-icons.*` — calendario/banco/drive/location/notes/whatsapp para `organization.symbols` (J08). Reuso directo.

---

## 2. SEMANTIC OBJECT CONTINUITY

| Objeto semántico | ¿Mismo objeto? | Clasificación | Registry | Motion eligibility |
|---|---|---|---|---|
| PlayStation purchase (D06→E01) | Sí: misma fila de movimiento | shared (`finance.ps5_movement`) | SE-09 (construir) | SHARED_ELEMENT flight permitido |
| Supermercado $48.720 (S09→G04→I11→J08) | Sí | shared | SE-08 | SHARED_ELEMENT / editorial trace |
| Garantía PS5 (A04 mención→E02 real) | La instancia real es E02; A04 es mención | SE-11 | flight solo E02→E06/H03 |
| Bolsa (A03→B22→F03→J02) | Sí | SE-03 | flight permitido |
| Heladera (A04→J02) | Sí | SE-01 | flight permitido |
| Cumpleaños (B11→C01→E05) | Sí | SE-06 | flight permitido |
| Café/Alacena "Sin stock" (C05→C06) | Sí | SE-07 | flight permitido |
| Mensaje técnico (B18→J05) | Sí | SE-05 | reparenting a ghost |
| Papel genérico → "garantía" | NO — no asumir | `EDITORIAL_ONLY` | — |
| "mañana" question bubble (I04 vs I15) | Shell sí, dato no | `STATIC_REPEATED_OBJECT` | — |
| House outline A17 vs J03 | Motif A17; instancia persistente J03 | `structure.house` = PERSISTENT_SCENE_OBJECT J03→J11 | A17 sin flight; J03 sin shared-layer |
| Device en F05/G09 | Sí, mismo device | OPEN-A `device.product` | flight F05→G09→H01 |
| Stack de logos G09 | NO objeto único | `EDITORIAL_ONLY` | — |
| Question barrier ↔ Homi name | NO | SE-15 rechazado | nunca shared |

---

## 3. WHAT EXISTS / WHAT IS MISSING / WHAT MUST BE PRODUCED

### EXISTS AND CAN BE REUSED
- `homeplus-logo-master.svg`, `homeplus-logo-animatable.svg` (Figma-app)
- `homi-mark.svg`, `ai.svg`
- `family-avatars.svg` (como fuente para split)
- `grocery-bag.svg`, `insurance-document.svg`, `information-fragments.svg`, `person-speaking.svg`
- `tech/*.svg` (7 marcas × variantes)
- `app-icons/*.svg`
- Componentes: `PhoneFrame`, `AmbientGlow`, `MessageBubble`, `SpokenFragment`

### EXISTS BUT MUST BE REWORKED
- Logo en producción: PNG raster → migrar a SVG animable (Path 2)
- `family-avatars.svg`: split en 4 capas por persona
- `insurance-document.svg`: reutilizar como base de estilo para factura/garantía/PDF node
- `information-fragments.svg`: split opcional por fragmento

### MISSING BUT EASY TO PRODUCE
- Wordmark independiente (tipografía controlada)
- Variantes mono del logo (currentColor)
- Factura / Garantía PS5.pdf / Manual PS5 (nodos documento)
- Map pins + badge +1h
- Transaction pill $48.720
- Documento"Factura" para E03/H03
- Album cover representation (frame + caption)
- Movimiento PS5 row (`finance.ps5_movement`) en S10
- Audio row representation

### MISSING AND HIGH-RISK
- `structure.house_outline` — crítico, bloquea A17/J03/J04–J11
- `obj.heladera` — bloquea A04 y J02 retorno
- Split de avatares (SE-13) en 4 capas — bloquea A15/A16/B07/B12/J04/J11
- Migración PNG→SVG del logo — riesgo visual en reveal hero
- `structure.continuity_links` para J06
- Ghost message bubbles J05 styling

---

## 4. DESIGN INTENT — lenguaje de silueta, complejidad, flat/soft/outlined

- **Nivel de complejidad**: máximo 2 niveles internos (silueta + un detalle). Ejemplo canónico: `grocery-bag.svg`.
- **Trato volumétrico**: flat con stroke sutil `1.5–2.5`, sin sombras horneadas, sin blur, sin backdrop-filter.
- **Paleta**: `#302922 #45362A #B57956 #718374`, neutros `#D3AA87 #BE9370 #DDD2C6`, acento `#E7643F` y `#C96B45` (Homi).
- **Tamaño mínimo legible**: silueta principal ≥96 px; chips/texto ≥28 px; avatares ≥40 px.
- **Pivot/origen**: centro de masa visual; house outline = centro del base; device = centro del frame.
- **Shadow/highlight policy**: sin sombras; highlight solo vía `AmbientGlow` o campo `#E7643F` expandido (A14).
- **Depth**: plano único por objeto; depth vía opacity de contexto (0.30/0.55/1.00), no blur.

---

## 5. REFERENCE CANON

- `audit/08_FINAL_RECONSTRUCTION_BLUEPRINT.md` (§11.5 tokens, §32.3 hero count, §10.1/§10.2 registry)
- `audit/08_MOTION_IMPLEMENTATION_ARCHITECTURE.md` (familias, reparenting, no morphs, no springs)
- `audit/08_CINEMATIC_ENHANCEMENT_MAP.csv` (filas A14/A17/I01/J03/J11/J14)
- `audit/07_SHARED_ELEMENT_REGISTRY.md` (SE-01…SE-15)
- `audit/00_CANONICAL_ISSUE_REGISTRY.md`, `00_CROSS_SESSION_CONFLICTS.md`, `00_SESSION7_GATE.md`
- `audit/runtime/session-08-hardening/README.md` (excepciones autorizadas, repair logs)

## 6. NO PRODUCE / NO CONTRADICTIONS

- No SVG morph; no clones en flight; no `will-change` en reposo; no `transition: all`; no `infinite`; no stand-ins de gradiente/foto; no waveform; no Factura TV; no screenshots como UI; no mochila como imagen.

## 7. HANDOFF

Otro agente puede comenzar producción de assets con: ID, categoría, estado de existencia (CSV), source_path si existe, capas requeridas, paleta, escala mínima, y reglas de motion. Todo lo que falta está listado en §3.
