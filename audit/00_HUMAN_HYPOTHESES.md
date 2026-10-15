# 00 — HUMAN WALKTHROUGH HYPOTHESIS MAP

**Campaña:** HOMEPLUS FINAL PRESENTATION — AUDIT CAMPAIGN
**Sesión:** SESSION 0 — Source Map + Audit Contract
**Estado:** ✅ **CONSTRUIDO** — 89 hipótesis. **CERO VEREDICTOS.**

---

## 0. NOTA DE ESTADO INESPERADO

Al inicio de Session 0 (~18:20) este fichero **no existía**. Se ejecutó búsqueda de sustituto en `HomeplusPresentacion01`, `Desktop`, `Downloads` y `Documents` → **0 resultados relevantes**.

**Apareció a las 2026-10-04 18:31:45**, durante la sesión, en la ruta declarada, con 17.414 bytes. La escritura no la hizo esta sesión.

Ver `00_SOURCE_MAP.md` §0.1 y §1.2.

---

## 1. CARACTERIZACIÓN DEL INPUT

| Propiedad | Valor |
|---|---|
| Ruta | `C:\Users\thega\Desktop\HomeplusPresentacion01\HomePlus_Presentacion_FINAL\HomePlus_Presentacion_FINAL\audit-input\USER_WALKTHROUGH_RAW.txt` |
| Bytes | 17.414 |
| Líneas | **1** (texto continuo) |
| Formato | **Dictado en voz, español rioplatense, sin edición** |
| Estructura | Ninguna. Sin timestamps, sin分段, sin marcado de escena, sin IDs de estado |
| Cobertura | **Completa** — llega hasta el final del guion (L497, "muchas gracias") |
| Bloques cubiertos | Los 13 bloques de speaker del guion |

### 1.1 Errores de transcripción que hay que normalizar al indexar

| En el walkthrough | Significado real |
|---|---|
| "Colo" / "culo" / "lolo" / "leo" / "Colo🦁" | **Colo** (presentador 1) |
| "Homie" / "Home" / "Homing" / "homi" | **Homi** (el asistente) — ver `SI-01` |
| "genial" / "geni" | **Geni** — ver `SI-01` |
| "firma" / "signature" | **Figma** |
| "Baken" / "vaquen" | **Backend** |
| "Superase" | **Supabase** |
| "Postres SQL" | **PostgreSQL** |
| "FIFA" / "fido" | **Feed** |
| "Inside" | **Info** |
| "exposición" / "exposure" | **exposición** (exposición selectiva) |
| "apo" / "aparece" | **aparece** |
| "creen" | **Screen** |
| "Creed negra" | **screen negra** |
| "Green de responsabilidades" | **screen de responsabilidades** |

### 1.2 Referencias a pulsaciones

El walkthrough cuenta pulsaciones **en relativo, sin índice absoluto**: *"al primer tap"*, *"al próximo tap"*, *"skip x3 después de las compras"*, *"después soy una screen negra"*.

**Consecuencia:** cada hipótesis se ancla al **momento del guion** (estable), no al número de pulsación. El mapeo pulsación→estado requiere el inventario de Session 1 (`M-06`).

---

## 2. PLANTILLA DE HIPÓTESIS

Cada entrada contiene exactamente estos campos. **Sin veredicto, sin severidad.**

```
HW-<X>-<NNN>

SCENE:                <escena>
STATE / TAP:          <"al primer tap", "al próximo tap" — relativo, sin número>
SCRIPT MOMENT:        <cita del guion + número de línea>
OBSERVED CURRENT:     <lo que el walkthrough describe que ocurre hoy>
WHY USER THINKS WRONG:<por qué el observador lo considera un problema>
WHAT MUST BE VERIFIED:<las 6 fuentes de contraste>
CLASSIFICATION (hip): <clase más probable — NO es veredicto>
STATUS:               OPEN
```

**Convención de numeración:** `HW-X-000` se reserva para el veredicto global del observador (§4).

---

## 3. MAPA DE HIPÓTESIS

### 3.1 ESCENA A — OPENING (Colo, guion L13–62)

| ID | STATE | SCRIPT MOMENT | OBSERVED CURRENT | WHY USER THINKS WRONG | VERIFY | CLASS (hip) | STATUS |
|---|---|---|---|---|---|---|---|
| **HW-A-001** | tras 2º ejemplo | L21 *"y cuando se rompe la heladera nueva nadie sabe en dónde quedó la garantía"* | *"no hay ninguna referencia visual a eso"* — el beat de la heladera/la garantía no tiene soporte visual | El tercer ejemplo del caos es el más concreto y el más fuerte; si no se ve, el Saturación no se siente | SCRIPT L18-22 · MASTER gramática de "objetos reales" · RUNTIME estado S01 · Figma `insurance-document.svg` | `NARRATIVE` | OPEN |
| **HW-A-002** | tras "compras" | L20 *"papa cree que el hijo ya hizo las compras"* | *"Skip x3 después de las compras"* | 3 pulsaciones de más tras un ítem; la sala espera algo que no llega | RUNTIME: contar estados entre ítems · MASTER §1 "Timing" | `TIMING` | OPEN |
| **HW-A-003** | — | L24 *"Ninguna de estas cosas por separado es grave"* | *"se perdió el que 'ninguna de estas cosas por separado es grave'"* | Es la frase que **baja la tensión** antes del golpe de "el problema es que se acumulan". Sin ella, el "acumulan" no tiene contraste | SCRIPT L24-26 · RUNTIME · MASTER: ¿esta frase tiene estado propio? | `NARRATIVE` | OPEN |
| **HW-A-004** | ítems 3–5 | L18-21 | *"la animación, como que todas crecen, no se achican un mínimo y pierden un poco de atención cuando aparecen las notas, un documento y un mensaje, así como icono, algo raro"* | Todo crece y nada se encoge → los ítems **compiten** entre sí en vez de acumularse jerárquicamente. Los iconos (nota/documento/mensaje) se leen como "algo raro" | RUNTIME: medir escala/opacidad de los ítems en cada paso · `motionTokens` ACCUMULATE vs REPLACE · MASTER §"Persistencia" | `MOTION` | OPEN |
| **HW-A-005** | — | L26 *"El problema es que se acumulan."* | *"no hay nada que diga el problema es que se acumulan"* — **se pasa directo** | Es **el pivote del arco completo**. La pregunta que abre la presentación (L43) depende de que la audiencia sintiera la acumulación. Sin este beat, la pregunta no tiene dónde caer | SCRIPT L26 · RUNTIME: ¿existe estado entre L24 y L28? · MASTER: beat clave | `NARRATIVE` | OPEN |
| **HW-A-006** | L28–30 | L28 *"Una cosa estaba en un chat viejo"* / L29 *"otra en un calendario"* / L30 *"otra simplemente en la cabeza de alguien"* | *"no hay una cosa estaba en un viejo… otra en un calendario… o simplemente en la cabeza de alguien"* — ninguna de las tres ubicaciones tiene representación | Son tres **objetos reales** concretos, y la gramática del master reserva "objetos reales" exactamente para el caos del hogar. Sugerencia del observador: *"podría ser otra aparición dentro de las que aparecen en ese teléfono donde ya apareció el cargo el fuerte, y después irse el teléfono"* | SCRIPT L28-30 · MASTER §2 "objetos reales" · RUNTIME · `information-fragments.svg` (asset **sin uso** en `slides/`, sólo en `assets/`) | `VISUAL` | OPEN |
| **HW-A-007** | — | L39 *"sin darnos cuenta reconstruimos información que ya existía"* · L37 marca `[Diapositiva de la informacion ya existia]` | *"que ahí donde la información ya existe, o sea esa diapositiva que dice eso **es correcto**"* | ✅ **CONFIRMADO POSITIVO.** El observador valida esta slide explícitamente | — | `—` | CLOSED-POSITIVE |
| **HW-A-008** | 6 apps | L30-39 → L43 | *"Luego aparece seis apps, una familia, se coordinación. Me parece **ataca** el 'cero coordinación' porque la coordinación siempre está distribuida y hace que la carga mental sea más grande"* | Atacar "cero coordinación" como problema es un **argumento débil**: la coordinación distribuida no es un fallo, es la realidad del hogar. La audiencia docente puedeiticen esta slide | SCRIPT L32-39 · MASTER §1 "Narrativa global" (¿el arco está bien?) | `NARRATIVE` | OPEN |
| **HW-A-009** | screen negra | L41 marca `[aca deberia haber una screen negra]` · L43 *"¿Qué pasaría si esa parte del contexto del hogar pudiera estar organizada y disponible para el hogar?"* | *"la presentación de producto está bien pero la implementación es mala porque las screen negra: el momento de screen negra **existe**, pero es literalmente un rectángulo negro sobre el fondo que ya veníamos teniendo, que es un vacío, pero tiene como un **mínimo de [resplandor] naranja detrás** que hace que no se sienta tan vacío completamente negro"* | ⚠ **VIOLA UNA REGLA DEL MASTER.** La gramática congelada dice BLACK = reset del narrador, y "antes del reveal de HomePlus, **no usar naranja de HomePlus casualmente**". Este estado es el **negro ANTES** del reveal (S03). Hay un resplandor naranja detrás. Además el negro no es un blackout real sino un rectángulo sobre el fondo existente | MASTER §2.1 Color y significado · RUNTIME: captura del estado, muestrear color de fondo real · `opening-blackout` + `AmbientGlow` · `tokens.colors.accent = '#E65C1B'` | `VISUAL` | OPEN — **prioridad alta** |
| **HW-A-010** | tras pregunta | L48-51 *"que es una plataforma para coordinar la vida del hogar alrededor de las personas, los momentos, las responsabilidades, y la información que no queremos perder"* | *"no hay ninguna referencia visual a eso"* — los **cuatro pilares** no tienen ninguna representación | Es la **definición del producto** en una frase, dicha en 4 elementos enumerados. La gramática de "REAL-LIFE OBJECTS" y "listas acumulativas" 적용 aquí directamente. Hoy el expositor habla solo contra el logo | SCRIPT L48-51 · MASTER §2 · RUNTIME estado S03 · Figma `A17 PEOPLE / A18 MOMENTS / A19 RESPONSIBILITIES / A20 INFORMATION` (**¡existen en el registro del repo alterno!**) | `VISUAL` | OPEN |
| **HW-A-011** | tras pilares | L53-61 *"no nace para que una persona controle el resto de la familia… la idea es exactamente la contraria"* | *"no me parece mal tampoco, pero siento que podríamos dar cierto apoyo visual. Siento que **no podríamos** no dejar al Colo simplemente que hable y que la gente comprenda"* | El expositor habla **sin apoyo visual** durante ~8 líneas. La presentación no estáQUENCEando la Worst parte de L48-61, el mensaje de "no es control" | SCRIPT L53-61 · RUNTIME · MASTER §1 "spoken-word alignment" | `READABILITY` | OPEN |

### 3.2 ESCENA B — HOME / PLANNER / FAMILIA (Gaby, guion L63–139) — 20 hipótesis, la escena más densa

| ID | STATE | SCRIPT MOMENT | OBSERVED CURRENT | WHY USER THINKS WRONG | VERIFY | CLASS (hip) | STATUS |
|---|---|---|---|---|---|---|---|
| **HW-B-001** | S04 t0 | L65-67 *"Todo empieza en Home. Es el lugar donde cada integrante puede ver primero qué necesita su atención, sin tener que recorrer toda la aplicación para encontrarlo."* | *"eso está bien"* | ✅ **CONFIRMADO POSITIVO** | — | `—` | CLOSED-POSITIVE |
| **HW-B-002** | S04 t1→t4 | L69-73 *"Juli tiene 10 años. Cuando abre Home puede ver que mañana tiene Educación Física, que tiene que llevar una autorización y que todavía tiene una tarea del colegio. Así puede entender rápidamente **qué tiene pendiente** y qué le corresponde"* | *"primero se ilumina Educación Física, después **se tacha** llevar autorización, después **se tacha** la tarea de matemáticas. Pero **nunca dijimos que lo completamos**, dijimos que las tiene, para que así pueda entender rápidamente **qué tiene pendiente** y qué le corresponde"* | 🔴 **LA OBSERVACIÓN MÁS GRAVE DEL WALKTHROUGH.** La pantalla comunica **COMPLETADO** (tachado = hecho) mientras la narración comunica **PENDIENTE**. El观众 leerá "ya está hecho" y el expositor dirá "está pendiente". Contradicción directa | **CÓDIGO CONFIRMADO:** `HomePlannerSequence.tsx:32-34` → `authorizationCompleted={homeStep >= 3}` y `schoolTaskCompleted={homeStep >= 4}` · `S04Home/index.tsx:20-21` (idéntico) · `TaskCompletionMark.tsx` · SCRIPT L69-73 · MASTER §"no fingir" · Figma: `HomeSummaryTaskStatus = 'pending'\|'awaiting_verification'` — **el producto NUNCA muestra completed en Home** (`homeSummaryTypes.ts:34,131-134`) | `NARRATIVE` + `UX` | OPEN — **BLOCKER candidato** |
| **HW-B-003** | S04 t2 | L71 *"que mañana tiene Educación Física"* | *"no se ilumina más Educación Física, o sea **no sé si lo haría exactamente así**"* | El propio observador duda del tratamiento del ítdem que sí coincide con la narración. Iluminar = "destacarse", que es coherente; pero el mecanismo (iluminar unos y tachar otros) es incoherente | RUNTIME · `HomeRow.tsx` / `homeTokens.ts` · `reviewing-interface-quality` | `MOTION` | OPEN |
| **HW-B-004** | S05 t0 | L75-77 *"Y cuando necesita ver más, entra a Planner. Ahí se concentra todo lo que tiene que organizar."* | *"se ve 'llevar autorización', 'tarea matemática' y nada más. **No hay tareas sin completar** o demás cosas"* | Planner muestra **2 ítems y nada más**. No hay contexto: no hay "lo que tiene que organizar" en plural, no hay incompletas, no hay la responsabilidad del hogar | RUNTIME · Figma `PlannerTasksScreen` (3 vistas + 4 grupos + filtros) · Integration `PlannerTasksScreen.tsx` (grupos `NECESITA ATENCIÓN`/`HOY`/`PRÓXIMAS`/`SIN FECHA`) | `VISUAL` | OPEN |
| **HW-B-005** | S05 | L79 *"En Tareas puede ver lo que tiene que hacer **y las responsabilidades que le corresponden**."* | *"No se ve la parte donde aparece responsabilidades. Simplemente es un acceso a responsabilidades, pero **no se ve exactamente cómo sería el módulo**"* | "Responsabilidades" es el **segundo de los dos** elementos que la frase nombra. Un link no es una demostración | SCRIPT L79 · RUNTIME · Figma `ResponsibilitiesScreen.tsx:166` **EXISTE** · Integration `ResponsibilitiesScreen.tsx` + `services/plannerResponsibilities.ts` (entidad propia, `assignment_kind`, `schedule_kind`) | `NARRATIVE` | OPEN |
| **HW-B-006** | S05 header | L75 *"Y cuando necesita ver más, entra a **Planner**"* | *"Aparece 'tareas, calendario y planes' como **título del módulo**, cuando el título del módulo es **Planner** y el selector dice tareas, calendario, planes"* | El título del módulo es incorrecto: el subtítulo ocupa el lugar del título. Jerarquía invertida | SCRIPT L75 · RUNTIME · Figma: `ModuleHeader` vs `PlannerNav` · `reviewing-interface-quality` jerarquía | `VISUAL` | OPEN |
| **HW-B-007** | S05 | L79 | *"podríamos ingresar a la screen de responsabilidades y **mostrar las asignadas**, por ejemplo a Juli"* | Sugerencia de diseño, no observación. Se registra como hipótesis de **carencia**, no como solución | (derivada de HW-B-005) | `VISUAL` | OPEN |
| **HW-B-008** | S05 calendario | L81 *"En Calendario puede ver **sus eventos, sus horarios y cuándo ocurre cada cosa**."* | *"en calendario, poder ver sus eventos **y los de su familia**, sus horarios y cuándo ocurre cada cosa"* | El guion dice "**sus** eventos"; el observador pide los de la familia. **Si el guion dice "sus", mostrar los de la familia es widening no autorizado** — o el guion debería decir "los del hogar" | SCRIPT L81 (literal: "sus eventos") · RUNTIME · Figma `CalendarRoot` + `HorariosScreen` · Integration `PlannerCalendarScreen.tsx` | `NARRATIVE` | OPEN — **posible SI** |
| **HW-B-009** | S05 calendario | L81 | *"horarios justamente cumple con la misma recurrencia de responsabilidades. Los eventos son una entidad única y los horarios, la recurrente. Responsabilidades de la recurrente y tareas es la única. **Por ende debería ser similar**"* | El observador señala una **asimetría de tratamiento** entre eventos / horarios / responsabilidades, que comparten el mismo modelo de recurrencia | Integration: `listHouseholdSchedules`, `getSchedulePrivacy`, `services/plannerResponsibilities.ts` (`schedule_kind: daily\|weekdays\|interval\|monthly\|after_completion`) · Figma `Calendar.tsx:608` `HorariosScreen` | `PRODUCT` | OPEN |
| **HW-B-010** | S05 planes | L83 *"Y en Planes puede organizar cosas más grandes, que no se resuelven con una sola tarea sino que necesitan varios pasos."* | *"acá se muestra que en los planes entra. Sí, hay tareas ahí, capaz un evento vinculado o **milestones**, llamadas measurements, pero acá no entramos en detalle con eso, lo dejamos porque más adelante Bernardo lo explica"* | El observador **perdona** la falta de detalle de Planes. Se registra como observación de baja prioridad | RUNTIME · Integration `PlannerPlanDetailScreenV1.tsx` (677 L, milestones + linkedTasks) | `VISUAL` | OPEN — LOW |
| **HW-B-011** | S05→S06 | L85-91 *"Hasta acá estamos hablando principalmente de la organización de cada integrante. Pero en una casa, muchas veces lo que cambia en el día de una persona también afecta al resto. Ahí entra Familia."* | *"y mientras nosotros decimos eso **no puede simplemente cambiar la screen a familia porque no tiene sentido**, es muy simple el cambio"* | 🔴 **Transición sin puente conceptual.** El script acaba de decir "hasta acá hablamos de **cada integrante**" — un cambio de pantalla abrupto a Familia contradice el "hasta acá". Debe haber un momento de * widening | SCRIPT L85-91 · RUNTIME: captura del estado de transición · MASTER: `EDITORIAL` vs `REAL_NAV` · `motion-design` semántica de transición | `NARRATIVE` + `MOTION` | OPEN |
| **HW-B-012** | S06 | L89-91 | *"tampoco que el Figma sea literalmente lo que está actualmente, que tampoco es el Front del real. Eso es **culpa de mi compañero que no implementó Feed y Family en el Figma**"* | La pantalla Familia de la presentación **no** es la UI real de Figma-app. El observador identifica la causa (Feed/Family no implementados en Figma-app) y la descarta como error propio | Figma `Familia.tsx` (EXISTS, 3 tabs) vs presentación `FamilyDemoScreen` — comparar · Integration `FamilyScreen.tsx` | `VISUAL` | OPEN |
| **HW-B-013** | S06 | L91 *"Familia conecta la organización de cada integrante con la del resto del hogar, relacionando **personas, lugares, horarios y conversaciones**…"* | *"**Las conversaciones no son parte del módulo, son de Feed**, pero la familia sí. Bueno, no caigamos sin que los **errores del guion** interrumpan la presentación"* | 🔴 **SCRIPT ISSUE.** El guion mete "conversaciones" dentro de Familia; las conversaciones son de Feed. El observador pide explícitamente que no se deje pasar | SCRIPT L91 vs L117 *"Ahí entra Feed"* · **Registrado como `SI-05`** | `NARRATIVE` | OPEN — **SCRIPT ISSUE** |
| **HW-B-014** | S06 | L93-97 *"Tomi tiene 16 años. Sale del colegio y después va a entrenar. Pero hoy **el entrenamiento se alarga una hora** y mamá ya no llega."* | *"aparece Familia con Tomi y mamá y papá. Después se hace un mapa, onda para el colegio donde aparece el club. Y después aparece mamá, papá, y **de nada aparece 'entrenamiento +1 hora'**"* | El beat que **provoca** toda la pregunta "¿Quién puede pasar a buscarlo?" aparece como un añadido sin relación, después de un mapa de lugares | SCRIPT L93-107 · RUNTIME · MASTER: el beat es la **causa**, no un dato más | `NARRATIVE` | OPEN |
| **HW-B-015** | S06 mapa | L97 *"el entrenamiento se alarga una hora"* | *"no tiene por qué aparecer ahí, **tiene que aparecer después**, y tampoco tiene que aparecer después **en mapa, Tomi, club, entrenamiento +1 hora**, porque eso simplemente puede ser avisado en el **Feed**"* | 🔴 **"Entrenamiento +1h" está en el lugar semánticamente incorrecto.** Un cambio de horario es información conversacional, no geografía. El mapa debería mostrar **dónde está el club y quién está cerca** (L109), no un aviso | SCRIPT L95-111 · RUNTIME · Figma `MapaTab` (`MemberPin`) · Integration `PresenceScreen` | `NARRATIVE` | OPEN |
| **HW-B-016** | S06 feed | L117-119 *"Ahí entra Feed. Feed reúne avisos y conversaciones relacionadas con la familia…"* | *"que también aparece en Familia, cuando [Feed] **no es de familia, es de More**. O sea los tres puntitos"* | 🔴 **Ubicación de navegación incorrecta.** En Integration el Feed está en `MoreStack > FeedFamiliar` (`AppNavigator.tsx:240`), NO en Familia. En Figma-app la ruta `family-feed` es un **shim** a `ConversationScreen` (`types.ts:183-185`: *"La surface Feed ya no existe"*). **TRIPLE DELTA** | SCRIPT L117 · Integration `MoreScreen.tsx:12-53` (badge **"Demo"**) · Figma `App.tsx:408` + `types.ts:183-185` | `PRODUCT` + `UX` | OPEN — ver `C-09` |
| **HW-B-017** | S06 feed | L123 *"El técnico viene entre las cuatro y las seis. ¿Quién puede estar?"* | *"eso está bien, digamos, pero **no lo hacemos como mensaje en el grupo familiar**, como en el Feed. Está hecho de otra manera"* | El ejemplo no se muestra como un mensaje de Feed | SCRIPT L121-125 · RUNTIME · Figma `ConversationScreen` (`Messages.tsx:1038`) · Integration `FeedFamiliarScreen.tsx` (**mock, 0 llamadas HTTP**) | `UX` | OPEN |
| **HW-B-018** | S06→S07 | L131 marca `[Pausa]` · L135 *"Coordinar no significa vigilar."* | *"después soy una screen negra y después pasamos a coordinarnos, girar, que yo diría que **está bien**"* | ✅ **CONFIRMADO POSITIVO.** El negro antes de "Coordinar no es vigilar" funciona | — | `—` | CLOSED-POSITIVE |
| **HW-B-019** | S07 | L135-139 *"Coordinar no significa vigilar. Compartir ubicación no significa estar mirando dónde está alguien todo el tiempo."* | *"o sea no está bien toda la coordinación directamente de la parte, el módulo Familia con lo que digo con respecto a lo que se ve"* | La parte de "coordinación" del módulo Familia **contradice** el argumento de la escena: si Familia muestra vigilancia (ubicación permanente), la escena que dice "no es vigilar" queda desmentida por la anterior | SCRIPT L133-139 · RUNTIME · Integration: `MemberPermissionsScreen` muestra `ubicación: 'Acceso limitado'` · Figma `MemberPermissionsScreen.tsx:273` | `NARRATIVE` + `UX` | OPEN |
| **HW-B-020** | S07 | L133 *"Pero hay un límite que para nosotros es fundamental."* | *"pero cuando llegamos a la pausa donde decimos 'pero hay un límite que para nosotros es fundamental…'"* | La "pausa" del guion no tiene un estado propio: se combina con la slide de "Coordinar no es vigilar" | SCRIPT L131-139 · RUNTIME: `S07` tiene `stepCount: 2` | `TIMING` | OPEN |

### 3.3 ESCENA C — PLANES / INVENTARIO / COMPRAS (Infra, guion L141–176)

| ID | STATE | SCRIPT MOMENT | OBSERVED CURRENT | WHY USER THINKS WRONG | VERIFY | CLASS (hip) | STATUS |
|---|---|---|---|---|---|---|---|
| **HW-C-001** | S08 t0 | L146-150 *"Un cumpleaños el sábado es un evento, pero antes todavía faltan cosas por organizar: repartir tareas, preparar cosas y resolver qué comprar."* | *"aparece un teléfono en Planes con un plan llamado 'cumpleaños': repartir tareas, preparar cosas, comprar lo que falta"* | El plan se presenta como **4 líneas de texto**, no como un plan con estructura | SCRIPT L146-152 · RUNTIME · Figma `PlanDetailScreen.tsx:612` · Integration `PlannerPlanDetailScreenV1.tsx` | `VISUAL` | OPEN |
| **HW-C-002** | S08 | L147-150 | *"La idea no es que sea así, sino que **aparezcan tareas reales**, que aparezcan ahí **vinculados con lo mismo**, con el mismo frente de Planes"* | Un plan sin tareas reales no demuestra "varios pasos" | SCRIPT L152 *"para ordenar un objetivo que avanza en varias etapas"* · Figma `milestones` + `linkedTasks` · Integration `linkedTasks` | `NARRATIVE` | OPEN |
| **HW-C-003** | S08 t? | L155-161 *"Y cuando una de esas tareas es: 'comprar lo que falta' aparece otra pregunta: '¿Qué falta en casa?'"* | *"que 'comprar lo que falta' no sé, lo que falta sea comprar tal cosa. Y de esa tarea **nace un concepto donde se le baja la exposición a todo el resto**, pero 'comprar lo que falta', esa tarea en específico, **no se debería bajar el exposure**; ésa sola debería quedarse igual. Entonces '¿qué falta en la casa?' y eso **deberían estar con una exposición normal**"* | 🔴 **La exposición selectiva se aplica al elemento equivocado.** La tarea-puente ("comprar lo que falta") es la que **conecta** Plan con Inventario; si se atenúa, se pierde el hilo. Y "¿qué falta en la casa?" — la pregunta que abre Inventario — debería tener exposición **plena** | MASTER: `SELECTIVE CONTINUITY` y exposición selectiva · RUNTIME: medir opacidad de cada elemento en la transición · `motionTokens.ACCUMULATE` | `MOTION` | OPEN |
| **HW-C-004** | S08→S09 | L163-167 *"Ahí entra el Inventario. Este mantiene qué tenemos, qué se está terminando y qué necesitamos comprar."* | *"el teléfono se mueve hacia la derecha, aparece el inventario, pero **la interacción y animación del inventario no tiene ningún tipo de sentido con lo que dijo Infra**"* | La animación de entrada de Inventario no representa lo que se dice. El movimiento del teléfono es un `REFRAME`/device-motion, no un `SHARED_ELEMENT` conceptual | MASTER: `SHARED_ELEMENT` vs `DEVICE_TRANSITION` · `motion-design` semántica de transición · RUNTIME | `MOTION` | OPEN |
| **HW-C-005** | S09 t0 | L165-170 *"este mantiene qué tenemos, qué se está terminando y qué necesitamos comprar. Y cuando algo hace falta, **puede sumarse automáticamente a la lista de compras**."* | *(no hay desviación registrada para estos 4 puntos; el observador los engloba en HW-C-004)* | El "sumado automático a la lista de compras" **no existe en Integration** (ver `C-11`/`OBS-11`) | SCRIPT L169-170 · Integration: Shopping List **NO EXISTE** · Figma `ShoppingList.tsx` **EXISTS** | `PRODUCT` | OPEN — ver `C-11` |
| **HW-C-006** | S09 | L172-174 *"Así antes de ir al supermercado te ahorras dar vuelta toda la casa porque ya sabes qué comprar"* | *(englobado en HW-C-004)* | El beneficio concreto ("ahorrás dar vuelta la casa") no se muestra | SCRIPT · RUNTIME | `VISUAL` | OPEN |
| **HW-C-007** | S09→S10 | L176 marca `[aca arranca la del dinero es un hogar]` | *"y después entrar a la transición con Gaby en Finance, pero **no hay una buena transición de lo que quedó en inventario**"* | 🔴 **No hay puente de Inventario → Finanzas.** El speech dice "y cuando hacemos esa compra, entra… el dinero" (L180-184). La transición debe **materializar la compra**, no cortar | SCRIPT L176-184 · RUNTIME · MASTER `EDITORIAL` · Figma: existe `Inventory→Shopping→Finance` como camino real | `MOTION` + `NARRATIVE` | OPEN |

### 3.4 ESCENA D — FINANZAS (Gaby, guion L178–231)

| ID | STATE | SCRIPT MOMENT | OBSERVED CURRENT | WHY USER THINKS WRONG | VERIFY | CLASS (hip) | STATUS |
|---|---|---|---|---|---|---|---|
| **HW-D-001** | S09 (final) | L176 `[aca arranca la del dinero es un hogar]` vs L178 *"Y cuando hacemos esa compra, entra otra parte de la organización: el dinero."* | *"finanzas **ya apareció en pantalla** con el concepto del 'dinero del hogar' a su costado"* | 🔴 **LA CAPACIDAD SE EXPLICA ANTES DE QUE EL EXPOSITOR LA INTRODUZCA.** El concepto "dinero del hogar" es visible durante Inventario, antes de que Gaby lo diga. Viola directamente la barra: *"la presentación nunca explica algo antes de que el expositor lo introduzca intencionadamente"* | SCRIPT L176 vs L178-186 · RUNTIME: ¿en qué estado exacto aparece "el dinero del hogar"? · `S08PlansInventory/index.tsx` + `s08-scene.css` | `NARRATIVE` | OPEN — **BLOCKER candidato** |
| **HW-D-002** | S10 t0 | L180-186 | *"entonces **no tiene sentido presentarle el producto antes de que yo lo presente con palabras**. Tendría sentido que aparezca **cuando yo iba ahí**"* | El finances phone debería **entrar** con la frase, no estar esperando en escena | SCRIPT L180-186 · RUNTIME · MASTER §1 "spoken-word alignment" | `TIMING` | OPEN |
| **HW-D-003** | S10 | L188-190 *"Acá reunimos y organizamos los movimientos, tanto personales como del hogar."* | *"también con lo que mostramos en pantalla, pero **no le vemos bola**"* | El eje **personal / hogar** es la primera afirmación de Finanzas y no se ve. En Figma-app existe `FinanceScopeSwitch`; en Integration existe `FINANCE_SCOPE_OPTIONS = ['Personal','Hogar']` con default `'hogar'` | SCRIPT L188-190 · Figma `FinanceSegmented.tsx:81` · Integration `financeContext.ts:1-6,38-53` | `NARRATIVE` | OPEN |
| **HW-D-004** | S10 | L192-194 *"Dentro de Finanzas podemos registrar un movimiento y **relacionarlo con las cuentas o tarjetas** involucradas."* | *"dentro de Finanzas, bueno, registrar un movimiento y relacionarlo con las cuentas o tarjetas involucradas. Lo único que pasa en la presentación es: el teléfono, el dinero del hogar, el primer tab"* | **La creación de movimiento y el selector de cuentas no se muestran.** Es el beat que demuestra que Finanzas *escribe*, no sólo *lee* | SCRIPT L192-194 · Figma `NewMovementSheet.tsx:182` **EXISTS** + `FinanceSelectField` `FinanceDetail.tsx:775` **EXISTS** · Integration `NewMovementSheet.tsx` **IMPLEMENTED**, `AccountSelector` **IMPLEMENTED** (pero ruta `FinanceAccounts` registrada y **sin ninguna navegación entrante**) | `NARRATIVE` | OPEN |
| **HW-D-005** | S10 | L196-210 *"También podemos controlar los pagos del hogar. Porque a veces queremos saber cosas como: '¿Internet ya está pagado?' o '¿Qué pagos vienen?' También podemos establecer límites…"* | *"el primer tab muestra el ejemplo de que '¿internet ya está pagado?', '¿qué pagos vienen?'"* | ElPayments tab muestra los ejemplos. **Pero los "límites" (L206-210) no quedan cubiertos** — y son un producto completo en ambos repos | SCRIPT L206-210 · Figma `FinanceSpendingLimitsManagement` · Integration `FinanceSpendingLimitsManagement` + `GLOBAL_SURFACE_GATES_OFF` | `NARRATIVE` | OPEN |
| **HW-D-006** | S10 | L212 *"Y en Resumen podemos tener una visión general"* · L216 *"¿Cuánto gastamos este mes?"* · L222 *"¿En qué se nos está yendo más?"* | *"después la pregunta '¿cuánto gastamos este mes?'. Después '¿en qué se nos está yendo más?'. Y ya pasamos"* | Resumen y Análisis se mencionan pero **no se ve la transición ni el contenido** de Resumen ni de Análisis | SCRIPT L212-222 · Figma `FinanceResumen.tsx:48` + `FinanceAnalisis.tsx:200` **AMBOS EXISTEN** · Integration `FinanceScreen.tsx:1003` + `FinanceAnalysisDetailScreen.tsx` | `NARRATIVE` | OPEN |
| **HW-D-007** | S10 completo | L180-230 (todo el bloque) | *"o sea **nada de lo que decimos [en Finance] tiene algún tipo de interacción con lo que pasa en la presentación**. Pasamos"* | 🔴 **VEREDICTO DEL OBSERVADOR SOBRE LA ESCENA D COMPLETA: la pantalla de Finanzas es un adorno, no una demostración.** Los 8 beats del bloque de Finanzas no tienen correspondencia visual | SCRIPT L178-231 (8 beats) vs RUNTIME (5 pasos declarados: `S09 stepCount: 5`) · **5 estados para 8 beats narrativos** | `NARRATIVE` | OPEN — **BLOCKER candidato** |

### 3.5 ESCENA E — ASSETS / HOMECLOUD (Infra, guion L232–271)

| ID | STATE | SCRIPT MOMENT | OBSERVED CURRENT | WHY USER THINKS WRONG | VERIFY | CLASS (hip) | STATUS |
|---|---|---|---|---|---|---|---|
| **HW-E-001** | S10→S11 | L234-236 *"terminan quedándose años dentro de la casa. Pensemos en la Play."* | *"y hablamos de que algunas compras terminan quedándose 12 años dentro de la casa. Pensemos en la Play"* | Sin desviación. La transición a Play funciona | — | `—` | CLOSED-POSITIVE |
| **HW-E-002** | S11 t0 | L238-241 *"Hasta que empieza a andar mal, nadie piensa demasiado en **cuándo se compró**, **si le toca mantenimiento** o **dónde quedó la garantía**."* | *"se ilumina la Play. Hasta que empieza a andar mal, nadie piensa en cuándo se compró, si le toca mantenimiento, dónde quedó la garantía"* | La Play se ilumina, pero los **3 causales** (compra / mantenimiento / garantía) no se muestran como tale. "Iluminar la Play" es un beat genérico | SCRIPT L238-241 (3 causales) · RUNTIME: `S10AssetsHomeCloud` stepCount 5 · Figma `AssetDetailView` secciones: Identidad → Personas y ubicación → Próximo → Datos y documentos → Historial | `NARRATIVE` | OPEN |
| **HW-E-003** | S11 t1 | L243-247 *"Assets le da identidad a esas cosas importantes del hogar, y HomeCloud permite conservar alrededor de ellas información como la factura, la garantía o el manual."* | *"lo único que pasa es que entra al Detail de PlayStation 5 y se ven documentos: garantía PlayStation 5, manual PS5"* | Entra **directamente al detalle**. El "detalle" ES la lista de documentos. No hay beat de "identidad" separado de "documentos" | SCRIPT L243-247 · Figma `asset-detail` + `{assetId}` · `INITIAL_DOCS` `data.ts:330-341` | `NARRATIVE` | OPEN |
| **HW-E-004** | S11 | L243 | *"lo único que aparece: dice 'le da identidad a esas cosas importantes del hogar' y 'HomeCloud permite conservar alrededor de ellas información'"* | Los dos verbos ("le da identidad" / "permite conservar") no tienen，两 Half del script: la UI de Assets es un **detalle de documentos**, no una identidad + HomeCloud | SCRIPT L243-247 · Figma `assets/Root.tsx:46` (root) vs `Detail.tsx:105` | `NARRATIVE` | OPEN |
| **HW-E-005** | S11 | L245-246 *"información como **la factura**, la garantía o el manual"* | *"ahí aparece 'garantía de PlayStation 5', 'manual PS5', y lo que yo aparecía y **factura TV**"* | ⚠ Posible desajuste: el guion dice "la factura"; la pantalla muestra algo tipo "factura TV". A verificar en runtime — puede ser "factura TV" como artículo real, o transcripción | RUNTIME: captura del detail · SCRIPT L246 · Figma `INITIAL_DOCS` | `VISUAL` | OPEN —需 runtime |
| **HW-E-006** | S11 | L249-253 *"Pero una casa no guarda solamente documentos. También acumula historia. **Volvamos al cumpleaños.**"* | *(no desviación registrada; se encadena con HW-E-007)* | El "volvamos al cumpleaños" es un **callback** al Plan de la Escena C. ¿Se muestra el callback? | SCRIPT L249-253 · MASTER: callbacks permitidos en el gate temporal | `NARRATIVE` | OPEN |
| **HW-E-007** | S11 | L254-259 *"El evento termina y el Plan cumple su objetivo, pero pueden quedar fotos, una frase, **o incluso un audio** que queremos conservar."* | *"pueden quedar fotos, una frase, o incluso un audio que queremos conservar"* | Los **tres** tipos (foto / frase / audio) deben verse. Integration soporta audio (`homecloud_memory_audio_support_v1_1.sql`, MIME `audio/*`); Figma-app tiene `AudioBody:249` | SCRIPT L257-259 · Figma `homecloud/viewers.tsx:249` `AudioBody` · Integration `homecloudTypes.ts:37-45` | `VISUAL` | OPEN |
| **HW-E-008** | S11 | L261 *"HomeCloud también puede reunir esos recuerdos en álbumes."* | *(englobado)* | Álbumes deben verse como **agrupación** | SCRIPT L261 · Figma `AlbumList`/`AlbumCard` `HomeCloud.tsx:1810,1768` **EXISTS** · Integration: `GET /api/homecloud/albums` **EXISTS**, **sin UI de usuario** | `PRODUCT` | OPEN |
| **HW-E-009** | S11 | L263-269 *"Porque una garantía tiene valor porque algún día podemos necesitarla. **Pero un recuerdo puede tener valor justamente porque algún día ya no vamos a poder repetirlo.** Por eso pensamos HomeCloud no solamente como almacenamiento, sino como una memoria del hogar."* | 🔴 *"pero **en la presentación no pasa nada**"* | 🔴 **EL NÚCLEO EMOCIONAL DE LA ESCENA E NO TIENE SOPORTE VISUAL.** "Una garantía tiene valor… un recuerdo tiene valor porque no se puede repetir" es el pivote de la escena Y de la tesis del producto. La pantalla pasa por encima sin nada. | SCRIPT L263-269 · RUNTIME: `S10AssetsHomeCloud` `stepCount: 5` para 8 beats (L243, L245, L249, L253, L255, L261, L263, L265, L268) · MASTER §1 | `NARRATIVE` | OPEN — **BLOCKER candidato** |
| **HW-E-010** | S11 recuerdos | L261-269 | *"Simplemente al llegar a recuerdos aparece: 'un cumpleaños 20 de agosto', 'vacaciones en enero 2026', 'nota de voz mamá 42 segundos', y otra sección llamada 'lunes cumpleaños 24 fotos'"* | Hay una lista de recuerdos, pero es **un listado plano**. No hay ninguna composición que sostenga el argumento "garantía vs recuerdo" | RUNTIME: captura · Figma `MemoriesSurface:1107` + `TimelineGroups:1896` · Integration `homecloud_content.role='memory'` | `VISUAL` | OPEN |
| **HW-E-011** | S11 | L268-269 *"HomeCloud no solamente como almacenamiento, sino como **una memoria del hogar**"* | *"lo único que aparece en [Home]Cloud"* | La reformulación final de la escena no tiene ninguna declaración visual | SCRIPT L268-269 · MASTER §2 | `NARRATIVE` | OPEN |

### 3.6 ESCENA F — CONTINUIDAD (Colo, guion L273–299)

| ID | STATE | SCRIPT MOMENT | OBSERVED CURRENT | WHY USER THINKS WRONG | VERIFY | CLASS (hip) | STATUS |
|---|---|---|---|---|---|---|---|
| **HW-F-001** | S11 t0–t2 | L275-292 *"no inventamos ninguna situación rara. Hablamos del colegio, de un entrenamiento que cambia, de hacer las compras, pagar Internet, que ande mal la Play o preparar un cumpleaños. Para nosotros, por debajo, eso significa **personas, fechas, responsabilidades, ubicaciones, gastos y archivos**. Todos relacionados entre sí."* · L296 *"la vida no ocurre separada en módulos"* | *"mientras el Colo dice eso, lo único que aparece es: al primer tap, una pantalla negra; al segundo, 'La vida no pasa por módulos. HomePlus los conecta'; al tercero, dentro de la misma esquina, donde aparece 'la vida no pasa por módulos'"* | 🔴 **LOS 14 ELEMENTOS ENUMERADOS NO TIENEN NINGÚN SOPORTE VISUAL.** 7 situaciones concretas + 7 entidades conectadas = 14 objetos. La pantalla muestra 3 frases y un problema de layout ("dentro de la misma esquina"). Además el guion L271 marcaba ambigüedad: `[Aca va la de continuidad pero en realidad seria una screen negra]` — **el propio autor duda si esta escena es slide o negro**. | SCRIPT L271 (marca ambigua) + L275-292 · RUNTIME: `S11Continuity stepCount: 3` para 18 líneas de enumeración · `s11-bridge.css` (1,44 KB) · MASTER §2 gramática + `SELECTIVE CONTINUITY` | `NARRATIVE` + `VISUAL` | OPEN — **BLOCKER candidato** + **SCRIPT ISSUE `SI-07`** |

### 3.7 ESCENA G — STACK TÉCNICO (Benja, guion L302–326)

| ID | STATE | SCRIPT MOMENT | OBSERVED CURRENT | WHY USER THINKS WRONG | VERIFY | CLASS (hip) | STATUS |
|---|---|---|---|---|---|---|---|
| **HW-G-001** | S12 t0 | L304-310 *"hay dos conceptos que ayudan a entender cómo está construida una aplicación. Por un lado está el **frontend**… Y por otro está el **backend**…"* vs L314 *"Para construir el frontend de HomePlus usamos React Native y Expo"* | *"y luego ya aparece la parte de Benja donde arranca Front… en la app usas React, Expo. **No deberían aparecer los logos ya**, porque primero estamos explicando"* | 🔴 **LOS LOGOS DE TECNOLOGÍAS APARECEN ANTES DE LA EXPLICACIÓN CONCEPTUAL.** El guion explica primero *qué es* frontend y *qué es* backend (2 párrafos), y recién después nombra las tecnologías. La pantalla abre con los logos | SCRIPT L304-316 (orden) vs RUNTIME · `S12FrontendBackend` `stepCount: 3` vs `S13Stack` `stepCount: 4` — **¿en qué slide aparecen los logos?** | `NARRATIVE` + `TIMING` | OPEN |
| **HW-G-002** | S12 | L306 *"el frontend, que es todo lo que vemos y usamos: **las pantallas, botones, menús y la forma en que se muestra la información**"* | *"a cada tap podríamos mostrar primero el teléfono, después los botones, después los menús, y después la información"* | El guion **enumera 4 cosas concretas** del frontend. La pantalla no las separa | SCRIPT L306 · RUNTIME · MASTER: la descomposición es `EDITORIAL`, no `REAL_NAV` | `VISUAL` | OPEN |
| **HW-G-003** | S12 | L308 *"el backend, que trabaja detrás: recibe lo que hacemos, valida la información, la guarda o la busca y devuelve un resultado"* | *"no sé cómo hacer una representación del backend, pero lo único que pasa ahora es **lo mismo que en frontend**: aparece 'backend, datos y servicios'"* | El observador **reconoce el problema** (backend no es representable visualmente) pero señala que al menos frontend podría descomponerse. La asimetría es el punto | SCRIPT L308 · RUNTIME · `s12-layers.css` (2,86 KB) | `VISUAL` | OPEN |
| **HW-G-004** | S13 | L314 *"Para construir el frontend de HomePlus usamos React Native y Expo"* | *"luego al siguiente tap hay una línea con un círculo en el medio, entre esos dos sectores. Dentro de la pantalla, al próximo **parpadean los dos**; al próximo se iluminan los logos de Front y aparece debajo de React, interfaz móvil, y abajo de Expo, build y preview"* | 🔴 **MOTION DECORATIVO — "parpadean los dos".** Elementos que parpadean no llevan información. La barra de calidad prohíbe "no random activity" y "no decorative motion without purpose" | MASTER §1 · `motion-design` §"Simpliness threshold" · RUNTIME: grabar frames del parpadeo · `s13-stack.css` (4,7 KB) | `MOTION` | OPEN |
| **HW-G-005** | S13 | L316 *"y en el Backend, Node.js se encarga de parte de la lógica y los servicios, mientras que Supabase y PostgreSQL nos permiten manejar la identidad y guardar información"* | *"al siguiente tap se ilumina Node.js, con abajo 'API, lógica'. Y Supabase/PostgreSQL con 'base de datos'"* | ✅ Sin desviación funcional registrada. El mapa de tecnologías sigue el guion | — | `—` | CLOSED-NEUTRAL |
| **HW-G-006** | S13 | L318 *"Y antes de programar las pantallas usamos Figma, para diseñar y probar cómo queríamos que funcionara la experiencia."* | *"al próximo tap aparece Figma, y abajo 'IA'. **En el guion decimos Figma antes de presentar el resto de las tecnologías**, porque con Figma diseñamos la interfaz que luego se ve en React y que se lleva a Expo. O sea **no tendría sentido explicar Figma al final cuando es la primera**"* | ⚠ **El observador cuestiona el ORDEN, no la presencia.** El guion L314-320 nombra: React Native+Expo → Node.js → Supabase+PostgreSQL → Figma → IA. Figma es el primero en la cadena lógica (se usa para diseñar lo que luego se implementa), pero aparece **cuarto** | SCRIPT L314-320 (orden literal) · `assets/tech/*.svg` (10 iconos) · MASTER: orden de beats | `NARRATIVE` | OPEN — posible `SI` |
| **HW-G-007** | S13 | L320 *"también usamos modelos de inteligencia artificial en algunas partes del sistema."* | *"está bien que nos aparezca algún logo de algún modelo en específico, porque primero se usarán muchos, y después… todavía no está declarado"* | "modelos de IA" se muestra con un logo de un modelo específico cuando el guion dice "**algunas partes**" y no hay Tool declarado en ningún repo. ⚠ Posible `FUTURE CAPABILITY` | SCRIPT L320 *"modelos de inteligencia artificial"* (genérico) · Integration: **0** rutas `/api/ai`, 0 tablas AI · `assets/tech/ai.svg` | `PRODUCT` | OPEN |
| **HW-G-008** | S13→S14 | L322-326 *"Son piezas bastante distintas. Pero para alguien usando HomePlus ninguna debería sentirse separada. Tiene que sentirse como una sola experiencia."* | *"el próximo tap, otra vez, como que **parpadea todo**"* | Segundo caso de parpadeo. El "todo parpadea" es el patrón por defecto en vez de ser la excepción | MASTER · `motion-design` §"1/3 rule (elements)" | `MOTION` | OPEN |
| **HW-G-009** | S13 | L310 *"Por ejemplo, cuando registramos un gasto, el frontend es la pantalla donde ponemos el monto. El backend recibe ese dato, comprueba que sea válido, **lo relaciona con la persona y el hogar correspondiente** y lo guarda."* | *"al próximo aparece una línea, de sustained, donde aparece: Home, flecha, Planner, flecha, tareas, flecha, y un 'más' que indica que se quería algo. Después aparece otro camino igual con Home, flecha, PS5, y terminando en documentos"* | 🔴 **EL EJEMPLO DEL GUION NO SE VISUALIZA.** El guion da un ejemplo concreto y completo: **un gasto** → monto → validación → relación persona+hogar → guardado. La pantalla muestra dos **caminos de navegación genéricos** (`Home→Planner→Tareas→más` y `Home→PS5→documentos`) que **no corresponden al ejemplo** y que Moreover **contradicen** el punto ("Tiene que sentirse como una sola experiencia" → mostrar dos caminos separados lo contrario). | SCRIPT L310 vs RUNTIME · MASTER: el ejemplo es el beat más importante de la escena · `reviewing-interface-quality`: la pantalla contradice su propia aserción | `NARRATIVE` + `VISUAL` | OPEN |
| **HW-G-010** | S14 t0 | L330-339 | *"después aparece una línea en pantalla completamente recta en el medio, blanca"* | ✅ El elemento visual de la barrera se percibe. Sin objeción de forma | RUNTIME | `—` | CLOSED-POSITIVE |

### 3.8 ESCENA H — FRICCIÓN (Infra, guion L328–345)

| ID | STATE | SCRIPT MOMENT | OBSERVED CURRENT | WHY USER THINKS WRONG | VERIFY | CLASS (hip) | STATUS |
|---|---|---|---|---|---|---|---|
| **HW-H-001** | S14 | L330-339 *"Aunque incluso con todo esto conectado, sigue existiendo fricción. si quiero crear una tarea tengo q saber cómo hacerlo, o si quiero buscar una garantía tengo q saber donde está. **no porque la interfaz sea un problema**, simplemente porque todas las aplicaciones tienen su forma de uso."* | *"y después [a] esas que te dije que '¿y si ni siquiera tuviéramos que saber cómo?'. Pero **esta screen no debería ser así, tan simple**"* | 🔴 **LA PANTALLA CONTRADICE LA NARRACIÓN.** La pantalla es limpia y simple; el guion dice que **toda** aplicación tiene fricción y que el problema **no es la interfaz**. Una escena sin fricción visible no puede llevar a "¿y si ni siquiera tuvieras que saber cómo?" | SCRIPT L336-339 (la frase explícita) vs RUNTIME · `s14-barrier.css` (3,55 KB) · `presentation-design`: la pantalla no puede apoyar la idea exacta | `NARRATIVE` + `VISUAL` | OPEN |
| **HW-H-002** | S14 | L333-336 *"si quiero crear una tarea tengo q saber cómo hacerlo, o si quiero buscar una garantía tengo q saber donde está"* | *(el observador cita los mismos 3 elementos; el problema es HW-H-001)* | Los 2 ejemplos concretos existen en el guion. El tercero —"todas las aplicaciones tienen su forma de uso"— es **el punto real** y no tiene soporte | SCRIPT L336-339 · RUNTIME · Figma: fricción real de la UI existe (`GLOBAL_SURFACE_GATES_OFF`: trash/archive off; `planner.search_entry` off) | `NARRATIVE` | OPEN |
| **HW-H-003** | S14 | L341-343 *"entonces nos hicimos una última pregunta. ¿qué pasaría si ni siquiera tuviéramos que saber cómo?"* | *"entonces nos hicimos una última pregunta. La pregunta que aparece en la screen, pero **que aparece mientras Bernardo dice todo eso**"* | ⚠ **Desfase de sincronía:** la pregunta aparece en pantalla **mientras** se dice la exposición de fricción, no cuando se dice la pregunta. La pregunta llega antes de su beep verbal | SCRIPT L341-343 · RUNTIME: momento exacto de aparición vs momento de la frase | `TIMING` | OPEN |
| **HW-H-004** | S14 | L341-343 | *"aparece ese **fondo raro**, todo su presupuesto, no malísimo"* | El fondo de la escena de fricción es visualmente cargado/"raro" sin función semántica | RUNTIME · MASTER: legibilidad en proyección · `reviewing-interface-quality` §Step 2 | `VISUAL` | OPEN |

### 3.9 ESCENA I — HOMI / GENI (Benja + Gaby, guion L347–441) — 16 hipótesis

| ID | STATE | SCRIPT MOMENT | OBSERVED CURRENT | WHY USER THINKS WRONG | VERIFY | CLASS (hip) | STATUS |
|---|---|---|---|---|---|---|---|
| **HW-I-001** | S15 t0 | L349 *"Y ahí aparece Geni."* | *"luego Benja ahí aparece Homi, y **acá está bien**. Aparece Homi y un teléfono con el placeholder '¿en qué te ayudo?' y debajo la parte donde podemos escribir, con un placeholder de 'pedirle a los Homi'"* | ✅ **CONFIRMADO POSITIVO.** La entrada de Homi funciona | — | `—` | CLOSED-POSITIVE |
| **HW-I-002** | S15 t1 | L355 *"'Haceme acordar de ir mañana a compar una coca'."* | *"luego, **sin ningún tipo de animación**, donde escribimos algo, aparece un mensaje: '**hice agenda que mañana Tomi tiene entrenamiento una hora más tarde**'"* | 🔴 **LO QUE SE ESCRIBE NO ES LO QUE DICE EL GUION, Y LO QUE RESPONDE NO CORRESPONDE A NADA.** (a) El texto escrito ≠ el ejemplo del guion. (b) La respuesta es sobre un **gasto/recordatorio** que nunca se pidió. (c) **Sin animación**: el cambio de input a respuesta no tiene transición, contradiciendo la primitiva `REPLACE` del propio token file | SCRIPT L353-356 · RUNTIME · `HomiDemoScreen/index.tsx` · **Registrado como `SI-03`** (el guion también es inconsistente: bloque 9 usa "comprar una coca", bloque 10 usa agenda y Finanzas) | `NARRATIVE` + `MOTION` | OPEN — **BLOCKER candidato** |
| **HW-I-003** | S15 t2 | L356-361 *"Geni entiende esa intención, nos muestra una propuesta y nosotros decidimos si confirmarla o no. Recién después de esa confirmación, HomePlus realiza la acción."* | *"después me responde 'voy a actualizar el entrenamiento de Tomi para mañana y avisar a la familia'. Luego **un montón de 'confirmar', 'confirmado', 'actualizado', 'avisar a la familia'**"* | La cadena propuesta→confirmación→ejecución se presenta como una **acumulación de mensajes de estado**, no como una decisión | SCRIPT L356-362 · RUNTIME · `HomiDecisionDemoScreen` · `designing-user-experience`: una acción no debe comunicar completitud antes de la decisión | `UX` | OPEN |
| **HW-I-004** | S15 | L358-361 | *"cuando Benja dice 'la idea es simple… nos muestra una propuesta, y nosotros decidimos si confirmarla o no. Recién después de esa confirmación, HomePlus realiza la acción'"* | El observador señala que el texto spoken **no tiene** correspondencia con lo que se ve: la propuesta no se ve como propuesta | SCRIPT L356-362 vs RUNTIME | `NARRATIVE` | OPEN |
| **HW-I-005** | S15 fin | L365 *"**Geni no vive al costado de HomePlus. Trabaja sobre HomePlus.**"* | *"ese es el punto. Homi no vive al costado de Home Plus, trabaja sobre Home Plus. **Ya hasta acá dentro de todo está más o menos encaminada**"* | ✅ **CONFIRMADO POSITIVO.** La escena 15 (Homi Action) está en buen camino | — | `—` | CLOSED-POSITIVE |
| **HW-I-006** | S16 t0 | L373-375 *"entonces podemos preguntarle, por ejemplo: '¿Qué me queda para mañana?'"* | *"Gaby habla: 'pero hacer algo es solo una parte, porque Homi también puede trabajar con la información que HomePlus ya tiene'"* | Sin desviación en la entrada | — | `—` | CLOSED-NEUTRAL |
| **HW-I-007** | S16 t1 | L375-383 *"Y ahí la respuesta depende de quién esté preguntando. Homi puede tener en cuenta **sus horarios, sus tareas y lo que tiene pendiente**."* | *"y en la pantalla parece: después de ese tap de Benja aparece **la misma pregunta, distinto contexto, acompañado de un teléfono en el mismo estado en el que estaba antes, con el placeholder de Homi y el placeholder**"* | 🔴 **SE RE-MUESTRA EL ESTADO VACÍO DEL TELEFONO.** La UI del input de Homi con su placeholder "¿en qué te ayudo?" se repite sin cambiar. La "pregunta" no está escrita en el input; es un rótulo externo | SCRIPT L373-377 · RUNTIME · `HomiContextDemoScreen/context-screen.css` (2,18 KB) | `NARRATIVE` + `VISUAL` | OPEN |
| **HW-I-008** | S16 | L385-395 *"por eso Juli, Tomi o papá pueden hacer exactamente la misma pregunta **y recibir respuestas distintas**. Porque ese 'mañana' no es igual para todos. **Es el mañana de cada uno.**"* | *"después aparece '¿qué tengo que hacer hoy?', una tarjeta de Homi, o sea **no de nuestro lado, sino como si fuera una respuesta de Homi**: 'Juli, colegio: hoy tiene su Educación Física, a la mañana llevar la autorización y la tarea de matemáticas'. **Pero no aparece la aplicación**, o sea solamente es Homi asistente, lugar ni mensaje, y el mensaje de Homi"* | 🔴 **LA RESPUESTA EXISTE SÓLO COMO BURBUJA DE CHAT. LA SUPERFICIE DE LA APLICACIÓN QUE LA SUSTENTARÍA NO APARECE.** El argumento completo es "Homi usa el contexto que HomePlus **ya tiene**" — pero sin ver Home, la afirmación no se puede verificar. La pantalla muestra una respuesta sin la fuente de la respuesta | SCRIPT L371 *"puede trabajar con la información que HomePlus ya tiene"* + L377-383 · RUNTIME · Figma `UI_HOMI_RESPONSE` (**existe** en el repo alterno) · Integration `PresenceScreen` | `NARRATIVE` + `UX` | OPEN — **BLOCKER candidato** |
| **HW-I-009** | S16 t2 | L93-105 (callback) *"el entrenamiento se alarga una hora y mamá ya no llega… '¿Quién puede pasar a buscarlo?'"* | *"después ese mensaje, y Tomi cambia por Juli, y el mensaje de Tomi pasa: 'lo del entrenamiento'… y ya que '**mamá te paso a buscar a la salida**'"* | La resolución se muestra **antes** delSetting-up. El guion cuenta primero "mamá **no** llega" (L97) y sólo después "quién puede pasar a buscarlo" (L105). La pantalla muestra la solución mientras la narración dice el problema | SCRIPT L97 vs L103-105 · RUNTIME · MASTER: `ACCUMULATIVE` requiere orden causal | `NARRATIVE` + `TIMING` | OPEN |
| **HW-I-010** | S16 | L99-107 *"Entonces la pregunta deja de ser solamente: '¿A qué hora termina?' y pasa a ser: '¿Quién puede pasar a buscarlo?'"* | *"cuando justamente la mamá **no llega**"* | La pregunta "¿Quién puede pasar a buscarlo?" —el pivote de la sección Familia— **no tiene un beat visual propio** en su recurrencia en Homi | SCRIPT L99-107 · RUNTIME | `NARRATIVE` | OPEN |
| **HW-I-011** | S16 t3 | L200 *"¿Internet ya está pagado?"* + L123 *"El técnico viene entre las cuatro y las seis"* + L165-170 *"¿Qué falta en casa?"* | *"y papá: 'hoy internet ya está pagado, revisar la lista de compras y confirmar al técnico'"* | La respuesta de papá **agrega** dos superficies que **nunca se han establecido visualmente**: Pagos y **Shopping List** — y Shopping List **no existe en Integration** | SCRIPT L200 + L123 + L165-170 · Integration: Shopping List **NO EXISTE** (`OBS-11`, `C-11`) · Figma `UI_SHOPPING_LIST` **EXISTS** | `PRODUCT` + `NARRATIVE` | OPEN |
| **HW-I-012** | S16 t4 | L399-411 *"Y esta misma idea se puede llevar a otras partes de HomePlus. Por ejemplo, podemos preguntar: '¿Cuánto gastamos en supermercado este mes?' Y Homi puede buscar esa información **dentro de Finanzas** y responder usando los movimientos y datos que ya tenemos registrados."* | *"y papá, con el último tap aparece '**basado en tu contexto: calendario, tareas, pagos**'. **¿Por qué aparece así? Si no pasa así en el guion, no tiene nada que ver**"* | 🔴 **BEAT QUE NO EXISTE EN EL GUION.** El guion pasa de la agenda por persona a **Finanzas** ("¿Cuánto gastamos en supermercado?"). La pantalla muestra un resumen "basado en tu contexto: calendario, tareas, pagos" que no está en el guion. El observador lo marca explícitamente como **sin relación** | SCRIPT L399-411 vs RUNTIME · **Cotejo con `S16HomiContext/index.tsx` (0,99 KB)** | `NARRATIVE` | OPEN — **no guion** |
| **HW-I-013** | S17 t0 | L425 *"Y eso no significa reemplazar toda la aplicación por un chat."* | *"Después aparece otra diapositiva: 'Homi interpreta y propone', con un teléfono donde aparece solamente una card en el medio: 'puedo mover el entrenamiento de Tomi una hora más tarde y avisar a la familia'. Confirmar / Ahora no"* | ✅ La card de propuesta **coincide** con el contenido del guion (L438-441). Sin desviación | SCRIPT L438-441 · RUNTIME | `—` | CLOSED-POSITIVE |
| **HW-I-014** | S17 t1 | L440 *"**la decisión final sigue siendo nuestra**"* | *"y después otro concepto debajo: 'Homi interpreta y propone', con que 'la decisión es nuestra'"* | El concepto "la decisión es nuestra" aparece, pero como **texto bajo** un concepto repetido ("Homi interpreta y propone" dos veces). Jerarquía dudosa | SCRIPT L436-441 · RUNTIME · `reviewing-interface-quality` | `VISUAL` | OPEN |
| **HW-I-015** | S17 t2 | — | *"al próximo tap se confirma, y el próximo tap screen negra"* | El "confirmar → ejecuta → negro" funciona. Sin objeción de forma | RUNTIME | `—` | CLOSED-NEUTRAL |
| **HW-I-016** | S17→S18 | L442 marca `[Aca deberia haber una screen negra que aparece hasta que el colo termina de hablar]` | El negro aparece, pero el observador no explica su función y la marca del guion es contradictoria (ver `SI-08`) | ⚠ **La marca del guion dice "hasta que el **Colo** termina de hablar"**, pero en L442 el expositor es **Benja** (bloque 11) y el siguiente es **Gaby** (L444). La condición no se puede cumplir | SCRIPT L423 (Benja), L442 (marca), L444 (Gaby) · **Registrado como `SI-08`** | `NARRATIVE` | OPEN — **SCRIPT ISSUE** |

### 3.10 ESCENA J — CIERRE (Gaby + Colo, guion L444–497)

| ID | STATE | SCRIPT MOMENT | OBSERVED CURRENT | WHY USER THINKS WRONG | VERIFY | CLASS (hip) | STATUS |
|---|---|---|---|---|---|---|---|
| **HW-J-001** | S18 t0–t3 | **Guion J completo, L444–497, ≈54 líneas, 3 beats**: (a) L446-458 *"hasta Geni responde a la misma idea con la que armamos HomePlus. No queremos que una familia tenga más tecnología que administrar. Queremos que tenga menos cosas que reconstruir, buscar y mantener abiertas en la cabeza. **El objetivo nunca fue pasar más tiempo dentro de HomePlus.** Es exactamente al revés."* · (b) L462-488 *"la mochila sigue siendo una mochila, la factura sigue venciendo, y la heladera se puede romper. **La casa no cambió**… lo que puede cambiar es todo el trabajo invisible… Homeplus no pretende enseñarle a una familia como ser familia"* · (c) L491-497 *"Porque si homeplus funciona como queremos, **la tecnología deja de sentirse protagonista**. Y podemos pasar menos tiempo organizando cómo vivir juntos y un poco más de tiempo simplemente viviendo"* · más L490 marca `[Aca aparece esa ultima hipotetica q deberia existir]` | *"y ya el próximo tap, **cierre con el logo Home Plus y debajo los nombres de cada uno de los integrantes**, y el próximo tap 'muchas gracias'"* | 🔴 **EL CIERRE PLANIFICADO NO EXISTE.** 54 líneas de guion — incluyendo la tesis del producto ("el objetivo nunca fue pasar más tiempo dentro de HomePlus"), el callback a los 3 objetos del apertura (mochila / factura / heladera), el rechazo a "enseñar a ser familia", y la hipótesis final — se resuelven con **3 pasos**: logo → nombres → "muchas gracias". `S18Closing` tiene `stepCount: 4` y su JSX contiene exactamente: logo + wordmark, 4 avatares con nombres, "Muchas gracias." | SCRIPT L444-497 (3 beats) vs RUNTIME (`S18Closing/index.tsx`, 1,23 KB, 3 bloques condicionales) · MASTER §1 "Narrativa global: la弧 único… tecnología deja de ser protagonista" — **el arco está en el guion y no en la pantalla** | `NARRATIVE` | OPEN — **BLOCKER candidato** |
| **HW-J-002** | — | — | *"por ende siento que la presentación, al menos, **tiene una base acompañando [el] guion, pero no es lo que estamos buscando**"* | 🔴 **VEREDICTO GLOBAL DEL OBSERVADOR** (registrado como `HW-J-000` en §4). No es un veredicto de esta auditoría. Se registra verbatim | — | `—` | OPEN — **OBSERVACIÓN** |

---

## 4. VEREDICTO GLOBAL DEL OBSERVADOR

> ⚠ **NO ES UN VEREDICTO DE ESTA AUDITORÍA.** Se transcribe verbatim. La auditoría debe confirmarlo o refutarlo con evidencia independiente.

**`HW-J-000` — OBSERVACIÓN GLOBAL**

| Campo | Contenido |
|---|---|
| Cita | *"por ende siento que la presentación, al menos, tiene una base acompañando [el] guion, pero no es lo que estamos buscando"* |
| Lectura | El observador値 la presentación como **estructuralmente correcta pero sustractivamente incompleta**: la estructura acompaña al guion, el contenido no |
| Corolario | El patrón dominante de las 89 hipótesis **no es** "la pantalla contradice al guion" sino **"el guion dice algo y la pantalla no lo muestra"**. Se cuenta en §5. |
| Estatus | `OPEN`. Requiere verificación independienteSessions 2–7 |

---

## 5. TIPOLOGÍA DE LAS 89 HIPÓTESIS

### 5.1 Distribución por escena

| Escena | Guion | Total | Positivas | Neutras | A verificar | Con SCRIPT ISSUE |
|---|---|---|---|---|---|---|
| **A** Opening | L13–62 | **11** | 1 | 0 | 10 | 0 |
| **B** Home/Planner/Familia | L63–139 | **20** | 2 | 0 | 18 | 1 (`HW-B-013`→`SI-05`) |
| **C** Planes/Inventario | L141–176 | **7** | 0 | 0 | 7 | 0 |
| **D** Finanzas | L178–231 | **7** | 0 | 0 | 7 | 0 |
| **E** Assets/HomeCloud | L232–271 | **11** | 1 | 0 | 10 | 0 |
| **F** Continuidad | L273–299 | **1** | 0 | 0 | 1 | 1 (`HW-F-001`→`SI-07`) |
| **G** Stack | L302–326 | **10** | 1 | 1 | 8 | 1 (`HW-G-006`) |
| **H** Fricción | L328–345 | **4** | 0 | 0 | 4 | 0 |
| **I** Homi | L347–441 | **16** | 2 | 2 | 12 | 2 (`HW-I-002`→`SI-03`, `HW-I-016`→`SI-08`) |
| **J** Cierre | L444–497 | **2** | 0 | 0 | 1 | 1 (`HW-J-001`→`SI-09`) |
| **TOTAL** | | **89** | **7** | **3** | **79** | **6** |

### 5.2 Distribución por clase (hipótesis, no veredictos)

| Clase | # | IDs |
|---|---|---|
| `NARRATIVE` (primaria) | **44** | la mayoría de A, B, C, D, E, F, G, H, I, J |
| `VISUAL` | **19** | HW-A-004/006/010, HW-B-006/007/012, HW-C-001/006, HW-E-005/010, HW-F-001, HW-G-002/003/009, HW-H-001/004, HW-I-014 |
| `MOTION` | **8** | HW-A-004, HW-B-003/011, HW-C-003/004/007, HW-G-004/008, HW-I-002 |
| `UX` | **3** | HW-B-002/019, HW-I-003 |
| `PRODUCT` | **4** | HW-B-009/016, HW-C-005, HW-E-008, HW-G-007, HW-I-011 |
| `TIMING` | **6** | HW-A-002, HW-B-020, HW-D-002, HW-G-001, HW-H-003, HW-I-009 |
| `READABILITY` | **1** | HW-A-011 |

### 5.3 Patrón dominante — **el hallazgo estructural del walkthrough**

De las 79 hipótesis a verificar, la **mayoría absoluta** no son "la pantalla contradice al guion" sino:

> **EL GUION DICE ALGO Y LA PANTALLA NO LO MUESTRA.**

Contraste explícito del observador: *"nada de lo que decimos tiene ningún tipo de interacción con lo que pasa en la presentación"* (`HW-D-007`, sobre Finanzas).

**Corolario técnico verificable en Session 1:** el registro declara **85 pasos** para **497 líneas de guion** con **13 bloques**. Las escenas con mayor déficit son las que tienen **más ratios de beat-por-paso** contra el guion:

| Escena | Pasos declarados | Beats de guion | Ratio |
|---|---|---|---|
| **D** Finanzas | 5 | 8 | **0,63** |
| **F** Continuidad | 3 | 18 líneas / 14 elementos | **0,17** |
| **E** Assets/HomeCloud | 5 | 9 | **0,56** |
| **J** Cierre | 4 | 3 bloques / 54 líneas | **0,07** |
| **I** Homi | 14 | 6 bloques | 2,33 |
| **B** Home/Planner/Familia | 18 | 6 bloques | 3,00 |
| **A** Opening | 19 | 5 bloques | 3,80 |

**Esto NO es una incidencia.** Es una hipótesis de trabajo para Session 1: medir los beats de guion por escena y compararlos con los pasos reales. Es exactamente el trabajo de `01_RUNTIME_BASELINE.md`.

### 5.4 Candidatos a BLOCKER (NO CONFIRMADOS — requieren runtime)

| ID | Razón | Evidencia de código ya disponible |
|---|---|---|
| `HW-B-002` | Pantalla dice COMPLETADO, narración dice PENDIENTE | **Código confirmado**: `HomePlannerSequence.tsx:32-34`, `S04Home/index.tsx:20-21`. Producto confirma que Home nunca muestra completed. |
| `HW-D-001` |Finanzas visible antes de que el expositor lo presente | Pendiente: identificar el estado exacto |
| `HW-D-007` | Escena D entera sin correspondencia | Pendiente: 8 beats vs 5 pasos |
| `HW-E-009` | Núcleo emocional de Assets/HomeCloud sin soporte | Pendiente: 9 beats vs 5 pasos |
| `HW-F-001` | 14 elementos enumerados sin soporte | Pendiente: 18 líneas vs 3 pasos |
| `HW-I-002` | Texto escrito ≠ guion; respuesta sin relación | Pendiente: cotejo con `HomiDemoScreen` |
| `HW-I-008` | Respuesta sin la superficie que la sustenta | Pendiente |
| `HW-J-001` | 54 líneas de cierre en 3 pasos | Pendiente: cotejo con `S18Closing/index.tsx` |
| `HW-A-009` | Violación de la regla negro/naranja del master | Pendiente: muestreo de color del estado |

**9 candidatos.** Confirmar o refutar en Sessions 2–5. **Ninguno se declara BLOCKER aquí.**

---

## 6. SCRIPT ISSUES DESCUBIERTOS POR EL WALKTHROUGH

Se registran aparte. **No se corrigen** (AGENTS.md: no inventar, no compensar con comportamiento deshonesto).

| ID | Guion | Observación | Confirmado por |
|---|---|---|---|
| `SI-05` | L91 | **"conversaciones" no pertenece a Familia.** El guion: *"relacionando personas, lugares, horarios **y conversaciones**"*. Las conversaciones son de Feed (L117). El observador: *"Las conversaciones no son parte del módulo, son de feed, pero la familia sí. Bueno, **no caigamos sin que los errores del guion interrumpan la presentación**"* | `HW-B-013` — texto explícito |
| `SI-07` | L271 | **Ambigüedad de authoring sobre la escena Continuidad.** La marca dice `[Aca va la de continuidad **pero en realidad sería una screen negra**]`. El autor duda entre slide y negro. El walkthrough muestra un negro primero, luego la frase, luego la frase sola | `HW-F-001` |
| `SI-08` | L442 | **Condición imposible.** La marca dice `[…una screen negra que aparece **hasta que el Colo termina de hablar**]`, pero en L442 el expositor es **Benja** (bloque 11, L423–441) y el siguiente es **Gaby** (L444). Colo ya habló en L462 | `HW-I-016` |
| `SI-09` | L490 | **Contenido fantasma.** La marca dice `[Aca aparece **esa última hipótesis q debería existir**]`. **No existe ninguna "hipótesis" en el guion.** L491 dice "Porque si HomePlus funciona como queremos…" — condicional, no hipótesis. El autor marcó que falta contenido | `HW-J-001` |
| `SI-06` | L353–356 | **Ejemplo de Geni incompatible con el bloque siguiente.** Bloque 9 usa "comprar una coca" (compra/recordatorio). Bloque 10 pregunta por agenda (L375) y por Finanzas (L403). El mismo asistente no puede continuar con el mismo ejemplo | `HW-I-002` — se solapa con `SI-03` |

`SI-01` a `SI-04` ya estaban registrados en `00_SOURCE_MAP.md` §2.4 desde el análisis del guion.

**Total: 9 SCRIPT ISSUES.**

---

## 7. LO QUE ESTA AUDITORÍA NO HACE EN SESSION 0

| No hecho | Razón |
|---|---|
| Verificar cualquier `HW-*` contra runtime | Requiere Session 1 (`D-01`, `D-02`) |
| Verificar cualquier `HW-*` contra Figma-app §14 | Requiere la comparación de Session 6 |
| Verificar cualquier `HW-*` contra Integration §15 | Requiere inspección de Session 6 |
| Asignar `CLASSIFICATION` definitiva | §5.2 es **hipotética**, no veredicto |
| Asignar `SEVERITY` | §5.4 son **candidatos**, no veredictos |
| Emitir `TARGET BEHAVIOR` o `RATIONALE` | Requiere el contradictorio completo de la plantilla §7.1 |
| Aceptar o refutar `HW-J-000` | Es la observación del observador, no un dato |
| Corregir los 9 SCRIPT ISSUES | Contrato §2.3 + AGENTS.md |

**Las 89 hipótesis quedan en `STATUS: OPEN`.**
