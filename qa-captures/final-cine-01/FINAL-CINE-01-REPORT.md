# HOMEPLUS — FINAL CINE-01 V1.1 — Reporte de implementación

## A. Resultado ejecutivo

**Estado: IMPLEMENTED / PASS con limitación de medición GPU documentada.**

El cierre quedó integrado como una secuencia manual, interrumpible y determinista. Cada pulsación física válida cambia de beat sin esperar una animación; `KeyboardEvent.repeat` se ignora. W09 apaga casa y teléfono dentro de una única transición de 750 ms y el avance siguiente abre S18, sin W14 visible ni pulsación negra redundante.

Los cambios perceptibles principales son: travelling reducido a 1950 ms; reencuadres de 480–620 ms; reparación de 1600 ms; mochila textil reconocible; factura física, curva y legible; técnico GLB CC0 montado de forma persistente con rig, contacto y vida corporal; plano de reparación sin oclusión de la puerta; iluminación y postproceso por perfiles; créditos consolidados en una sola pantalla.

La corrección adicional de continuidad del técnico se aplicó así: el personaje se monta una sola vez y permanece en el mundo desde la llegada a la cocina. En planos donde queda fuera de campo sigue muestreando respiración, cabeza, hombros y asentamiento corporal; no aparece sólo para W06 ni queda congelado entre beats.

## B. Matriz de 42 decisiones

| ID | Estado | Implementación | Archivo/evidencia | Limitación |
|---|---|---|---|---|
| N01 | PASS | Travelling físico inverso, FOV 36°, 1950 ms, interrumpible. | `FinalDirector.ts`, `finalTimings.ts`, `final/w01-exit-*` | Captura fija no certifica fluidez temporal. |
| N02 | PASS | Secuencia mochila → factura → técnico; objetos físicos persistentes. | `FinalKitchenCanvas.tsx`, capturas W04–W06 | Ningún icono de HomePlus añadido. |
| N03 | PASS | `finalRest` conserva desorden, documentos, teléfono, heladera y técnico. | `FinalDirector.ts`, `final/w07-wide-*` | Sin reorganización automática. |
| N04 | PASS | W08 es plano estable sin HUD, tarjetas ni efectos mágicos. | `final/w08-hold-*`, NAV-05 | El técnico conserva microvida por requisito posterior. |
| N05 | PASS | Teléfono queda como objeto del conjunto; no toma decisiones. | W07/W08 | Sin nueva demo funcional. |
| N06 | PASS | W09 conjunto, hold oscuro y siguiente avance a S18. | `FinalDirector.ts`, W09/S18 | W14 queda sólo como deep-link histórico. |
| C01 | PASS | Trayectoria portal existente refinada, continuidad geométrica y easing. | `FinalCamera.tsx`, `finalDiveBridge.ts`, QA matemático | Sin cambio de FOV. |
| C02 | PASS | General conserva isla, mochila, papeles, teléfono, heladera, técnico y fondo. | `final/w02-wide-*` | La heladera abierta sigue el estado heredado. |
| C03 | PASS | Tres cuartos de mochila, asa/cuerpo/bolsillo/correa y apoyo visibles. | `finalGeometry.ts`, `final/w04-backpack-*` | Modelo procedural estilizado. |
| C04 | PASS | Perspectiva oblicua desde la derecha; factura protagonista y documentos secundarios. | `final/w05-invoice-*` | Técnico queda fuera de campo, pero sigue animado. |
| C05 | PASS | Plano lateral amplio muestra cuerpo, rodillas, brazos, herramienta, panel y caja. | `final/w06-p0-*`, `w06-p1-*`, `w06-p2-*` | Estética deliberadamente estilizada, no fotorrealista. |
| C06 | PASS | Retorno 620 ms; W08/W09 comparten cámara fija. | `FinalDirector.ts`, NAV-05 | Sin push-in final. |
| M01 | PASS | Mochila rehecha con volúmenes curvos, tela, costuras, cierres, straps y sombra. | `Backpack.tsx`, W04 | Textura roughness procedural. |
| M02 | PASS | Factura física sobre anchor real, curva, espesor, vencimiento e importe ficticios. | `FacturaOverlay.tsx`, W05 | Datos totalmente ficticios. |
| M03 | PASS | GLB CC0 montado, texturizado y retargeteado; volúmenes de brazos y manos. | `TechnicianGLB.tsx`, W06 | Asset Kenney de proporción estilizada. |
| M04 | PASS | Panel, tornillo, destornillador invertido correctamente y caja refinados. | `FridgeService.tsx`, `TechnicianGLB.tsx` | Sin simulación física dinámica. |
| M05 | RECONCILIADO | Se conserva vajilla/bacha existente y se evita duplicar el mundo S01. | `DishArea.tsx`, `FinalProps.tsx` | No se rehízo lo que ya aportaba S01. |
| M06 | PASS | Roughness, madera, papel, metal, tela y sombra ajustados al lenguaje CINE-01. | props + lighting | No se introdujo hiperrealismo discordante. |
| A01 | PASS | Gesto P0→alcance→contacto→giro→retiro→P2 en 1600 ms; renderer sigue activo. | `TechnicianAnimation.ts`, `FinalCamera.tsx` | No hay loop de reparación. |
| A02 | PASS | IK/FK valida rodilla, pie, apoyo izquierdo, muñeca, punta y giro funcional. | QA matemático 41/41 | Contacto certificado matemáticamente y visualmente. |
| A03 | PASS | Técnico persistente W01–W09; P0 antes, P2 después; microvida en holds. | `FinalDirector.ts`, `sampleTechnicianAmbient` | Puede quedar fuera de campo en close-ups. |
| A04 | PASS | Mochila y factura permanecen quietas; atención por cámara/luz. | `Backpack.tsx`, `FacturaOverlay.tsx` | Sin física secundaria. |
| A05 | PASS | Una única curva temporal compartida W09, 750 ms. | `FinalDirector.ts`, BLACKOUT QA | Curvas de casa/pantalla ligeramente distintas pero coordinadas. |
| A06 | PASS | Estado absoluto por beat+tiempo; transition id; reverse seek-to-end. | `FinalKitchenCanvas.tsx`, `FinalCamera.tsx` | Sin timers tardíos independientes. |
| L01 | PASS | Perfiles y filosofía cromática reutilizan configuración CINE-01. | `finalQuality.ts`, `FinalLighting.tsx` | Comparte perfiles, no el mismo compositor. |
| L02 | PASS | Rellenos cálidos y laterales revelan tela y correas. | `FinalLighting.tsx`, W04 | Safe reduce efectos, no narrativa. |
| L03 | PASS | Papel marfil controlado, capas y sombras; sin spotlight teatral. | W05 | Lectura optimizada para 16:9. |
| L04 | PASS | Luz de trabajo estable sobre cuerpo, manos, panel y herramienta. | W06 | Sin parpadeo. |
| L05 | PASS | General con profundidad cálida/fría y jerarquía por planos. | W02/W08 | Sectores oscuros son dirección artística, no blackout prematuro. |
| L06 | PASS | Todas las escalas y emissives, incluida pantalla, terminan en cero en W09. | W09 0/50/100, 41/41 | Negro puro completa el último tramo de W09. |
| P01 | PASS | Un único composer final: render, GTAO, Bokeh, bloom, blur, grade y output. | `FinalPostProcessing.tsx` | Es compositor propio del canvas final, no duplicado por beat. |
| P02 | PASS | Anchors por teléfono/general/mochila/factura/tornillo; holds generales amplios. | `FinalPostProcessing.tsx` | DOF deshabilitado en safe. |
| P03 | PASS | Blur selectivo, cero en holds/blackout y reinicio en cambios de beat. | `FinalPostProcessing.tsx` | Aproximación screen-space, no velocity buffer. |
| P04 | PASS | Bloom bajo y deshabilitado en W09; metal/vidrio conservan altas luces. | perfiles + post | Sin neón. |
| P05 | PASS | Sombras frías, madera cálida, blancos controlados, viñeta/grano sutil. | grade shader | Grano deshabilitado en safe. |
| P06 | PASS | `cinematic`, `balanced`, `safe`; narrativa idéntica y reload conserva beat. | NAV-11, `performance.json` | Headless no representa FPS con GPU de escenario. |
| E01 | PASS | Duración separada de permiso de navegación; holds manuales. | navegación + NAV-01…04 | W01→W02 es fase interna del mismo travelling. |
| E02 | PASS | Fronteras y reversa reconstruidas; retorno desde S18 sin flash. | `reverseEntry`, NAV-07 | Sin transición de audio. |
| E03 | RECONCILIADO | No había sistema sonoro final; se mantuvo silencio para priorizar voz y evitar residuos. | inspección runtime | No se añadieron efectos de sonido. |
| E04 | PASS | Logo, marca, cuatro integrantes y agradecimiento en un único step. | `S18Closing`, S18 captures | Entrada corta y reduced-motion respetado. |
| E05 | PASS | Canvas 16:9, sin HUD/cursor/scrollbars en producción; capturas 720p/1080p. | capturas finales | Dev label sólo existe con `?dev=1`; se excluyó de evidencia final. |
| E06 | PASS | QA matemático, navegación real, visual, perfiles, build y TypeScript. | secciones G/H | Validación física de proyector sigue siendo prueba de sala. |

## C. Navegación

- Se eliminó el gate `finalReady/isAnimating` de la navegación global.
- Cada keydown físico despacha `NEXT`/`PREVIOUS` de inmediato; sólo se ignora `event.repeat`.
- Las transiciones llevan `id`, `beat` y `seekToEnd`; un cambio invalida callbacks del estado previo.
- `PREVIOUS` reconstruye el beat anterior en su estado estable, sin reproducir una animación inversa obligatoria.
- El mapping visible es `W01, W04, W05, W06, W07, W08, W09`; W03/W14 conservan deep-link pero no consumen pulsaciones.
- Al volver desde S18, `reverseEntry` monta W09 en su estado final oscuro, sin flash de luces.

## D. Coreografía de blackout

Duración final: **750 ms**. `closingLightProgress = clamp(t / 750, 0, 1)`. Las luces domésticas comienzan alrededor del 12% y el display alrededor del 13%; ambas curvas terminan dentro del mismo W09. En el último 18% se completa el negro puro. A 750 ms todas las escalas, emissives y pantalla son cero y `blackout=1`. Avanzar durante W09 desmonta el canvas al entrar a S18, por lo que no quedan timers ni apagados tardíos.

## E. Comparaciones visuales

- Baseline preservado: `qa-captures/normal-backpack.png`, `normal-w06.png`, `normal-final-wide.png`.
- Resultado: `qa-captures/final-cine-01/final/` con los 12 estados a 1280×720 y 1920×1080.
- Mochila: `w04-backpack-*`.
- Factura: `w05-invoice-*`.
- Técnico: `w06-p0-*`, `w06-p1-*`, `w06-p2-*`.
- Blackout: `w09-000-*`, `w09-050-*`, `w09-100-*`.

## F. Animación técnica

El GLB `characterMedium.glb` se carga localmente, conserva su rig y textura, y se adapta mediante direcciones reales hueso→hijo para no depender de ejes de exportación. La cinemática semántica horneada posiciona hombros, codos, muñecas, rodillas y pies; el destornillador se calcula desde la misma FK que usa QA. Resultado numérico: cobertura de contacto ≥80%, error horneado <2 mm, rodilla/pie dentro de rango y mano izquierda estable. Entre beats se aplica una capa ambiental determinista de respiración y asentamiento, sin repetir la reparación.

## G. Pruebas

- `npx tsc --noEmit`: PASS.
- `npm run build`: PASS; 746 módulos, build 2.21 s.
- QA matemático: **41/41 PASS** en `math-final/qa-math.json`.
- Playwright navegación/blackout/perfiles/reduced-motion: **14/14 PASS** en `qa-results.json`.
- Hold W08: 20 s con cámara, target y luces idénticos.
- Consola browser: 0 errores.
- Capturas finales: 26 imágenes base más recapturas W05/W06/S18; 0 errores.
- Advertencias no bloqueantes: Vite avisa sobre configuración futura `native` y chunk principal >500 kB.

## H. Rendimiento

Medición de 5 s por perfil, 1280×720, HeadlessChrome 156 sobre renderer headless/software:

| Perfil | Media composer | Máximo | Frames observados |
|---|---:|---:|---:|
| safe | 71.0 ms | 926.6 ms | 16 |
| balanced | 171.8 ms | 871.6 ms | 6 |
| cinematic | 252.7 ms | 1319.6 ms | 6 |

Estos valores sirven para comparar costo relativo, **no para afirmar FPS de escenario**: el navegador headless no representa la GPU de presentación y los máximos incluyen warm-up/compilación de shaders. Se recomienda usar `safe` como fallback y validar `balanced/cinematic` en la máquina/proyector reales.

## I. Pendientes y límites reales

1. Falta una medición GPU presencial en la máquina de exposición; no se inventó un dato de 60 FPS.
2. El técnico es un personaje Kenney estilizado coherente con la cocina, no un humano fotorrealista.
3. No se añadió sonido porque no existía una arquitectura de audio final y hacerlo ampliaba el alcance con riesgo de residuos al interrumpir.
4. No se hizo commit ni push.
5. Las modificaciones preexistentes de CINE-01/S01 se preservaron y no se revirtieron.
