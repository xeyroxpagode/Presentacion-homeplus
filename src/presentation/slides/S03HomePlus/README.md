# S03 V6 — Explicación cinemática del producto

Segmento 3 de la presentación (slides S01→S18). Recorre, mediante diez avances
manuales, una única película editorial animada: **la vida del hogar** abierta
en sus dimensiones (persona, momento, contexto, responsabilidad, información),
ampliada a un hogar con varias situaciones y, finalmente, a la propuesta de
HomePlus.

Estado: **baseline funcional v1**. El pulido cinematográfico posterior actúa
sobre este módulo sin cambiar su contrato.

---

## 1. Estructura

```
src/presentation/slides/S03HomePlus/
├── index.tsx              raíz: stepIndex + progreso → escena
├── s03-cinematic.css      stage 1920×1080 (steps 1–10)
├── s03Timeline.ts         duraciones de los steps (heredado del branding)
├── s03Geometry.ts         métricas del isotipo original (1280×720, step 0)
├── S03Isotipo.tsx         isotipo por capas (step 0, sin cambios)
├── S03Words.tsx           conceptos del diseño anterior (sin cambios)
└── s03v6/                 ── motor de la película V6 ──
    ├── easing.ts          E(u) canónica, Bézier, longitud de arco
    ├── geometry.ts        geometría maestra 1920×1080 (cajas, curvas, color)
    ├── measure.ts         métricas tipográficas reales (canvas 2D)
    ├── timeline.ts        computeScene(step, p) → SceneState  (puro)
    ├── Scene.tsx          renderer SVG
    └── advances.ts        cola de avances (§13.4 del contrato)
```

`computeScene` es **determinista y puro**: todo el estado visual de un step se
deriva de `(step, p)`. No hay estado de animación en React; el renderer sólo
pinta. Eso hace el QA reproducible (ver §6).

## 2. Sistemas de referencia

- **Lienzo maestro** 1920×1080, origen arriba-izquierda, centro (960,540).
  El SVG se escala uniformemente al viewport (`preserveAspectRatio`).
- **Coordinadas del step 0** (branding heredado) en 1280×720. Conversión
  ×1.5: el step 1 parte del último cuadro real del branding, no de una pose
  reconstruida.
- **Interpolación canónica** `E(u) = 6u⁵ − 15u⁴ + 10u³` sobre
  `u = clamp((t−a)/(b−a))`. Toda propiedad (posición, escala, opacidad,
  máscara, luminosidad, trazado) la usa.
- **Trayectorias**: Bézier cúbica evaluada con tabla de longitud de arco, para
  que la velocidad espacial sea regular. El revelado de un conector muestra la
  fracción **real** de longitud (`pathLength` + `strokeDasharray`).
- **Tipografía**: las cajas del contrato son *origen superior*; la línea base
  se deriva de las métricas reales (ascent/descent medidos con la misma fuente
  Manrope que el resto de la presentación).

## 3. Steps

| Step | Duración | Contenido | Estado final |
|---|---:|---|---|
| 0 | 3000 ms | branding heredado (autoplay, epoch con el portal) | lockup grande |
| 1 | 900 ms | el espacio se prepara: título + 5 referencias | título 84 px centrado |
| 2 | 760 ms | Juli: el círculo crece a avatar, nombre | avatar 112 px + 45 % de conexión |
| 3 | 900 ms | el momento: Mañana + contexto Educación Física | tres unidades conectadas |
| 4 | 870 ms | la responsabilidad: Llevar autorización | conector + indicador |
| 5 | 1230 ms | la información: Aviso del colegio | 5 unidades + 4 conexiones |
| 6 | 1030 ms | la cámara descubre más hogar (alejamiento) | contexto compacto + 2 contextos |
| 7 | 1250 ms | distintas personas, distintas perspectivas | 3 contextos + 3 avatares |
| 8 | 2200 ms | autonomía como consecuencia | «Más autonomía» + señal |
| 9 | 1600 ms | la complejidad se vuelve idea clara | «Organización compartida» → isotipo |
| 10 | 1100 ms | travelling final de una sola pieza | blanco → relevo a S04 |

Las duraciones viven en `s03Timeline.ts` (`S03_DURATIONS`) y las coreografías
en `s03v6/timeline.ts` (una función por step).

## 4. Identidades persistentes

- **Juli** es un único objeto. En el step 6 vive dentro del grupo escalado; en
  el step 7 se **extrae** a una capa de mundo conservando su matriz global
  (origen real `(242.88, 412.18)`, diámetro 42.56 px — derivado de la matriz,
  no copiado). Nunca hay dos avatares.
- **Educación Física** conserva su identidad semántica: en el step 6 se reduce
  a la anotación compacta «Juli · Educación Física»; en el step 7 «Juli ·» se
  retira y queda «Educación Física». No hay dos títulos visibles a la vez.
- **El isotipo** es siempre el asset original
  (`assets/07a9c99e-….png`), sin redibujarlo.
- **El lockup** superior es isotipo + wordmark del componente original; su pose
  inicial es el último cuadro real del branding.

## 5. Navegación y handoff

- Un click durante una animación **se encola** (`s03v6/advances.ts`) y se
  ejecuta cuando el step activo llega a su estado final. Varios clicks rápidos
  avanzan de uno en uno; nunca se saltan objetos.
- El **step 10** corre el travelling y, al completarse, navega automáticamente a
  S04.0. Un segundo click durante el step 10 se ignora.
- El zoom usa una única curva: `S(t)=exp(log(S_final)·E(u))` con
  `pScreen(t)=q0 + S(t)·(p−q0) + e·(C−q0)`. El foco `q0` es el centro real del
  disco blanco del asset; `S_final` se calcula desde la geometría (radio blanco
  medido 74 px en PNG) contra las cuatro esquinas, con margen 1.08.
- El **velo puente** usa el fondo real de S04 (`#FDFCFC`), de modo que el
  relevo blanco → Home no tiene salto ni flash.

## 6. QA reproducible

Parámetros de URL:

| Parámetro | Efecto |
|---|---|
| `?dev=1&slide=2&step=N` | deep link a un step |
| `?s03p=0..1` | congela el progreso del step actual (frame exacto) |
| `?s03t=0..3000` | congela el autoplay del branding (ms) |
| `?s03noauto=1` | congela el relevo del step 10 (captura del frame final) |

Scripts en `qa-captures/s03v6-tools/` (requieren `npx vite --port 5199`):

| Script | Qué hace |
|---|---|
| `capture-s03v6.mjs` | 77 capturas: inicial, 10/25/50/75/90 % y final de los 11 steps |
| `capture-s03v6-video.mjs` | video de la coreografía completa (webm) |
| `final-continuity.mjs` | par (step N final, step N+1 inicial) para el diff de continuidad |
| `probe-s03-queue.mjs` | verifica la cola de avances con clicks rápidos |
| `probe-s03-handoff.mjs` | secuencia del travelling y relevo a S04 |
| `probe-s03-verify.mjs` | cobertura blanca del zoom + estabilidad del reposo |
| `probe-s03-smoke.mjs` | recorre todos los slides buscando errores de consola |
| `probe-prod.mjs` | navegación real contra el build de producción |
| `verify-asset.mjs` | comprueba que el isotipo original se resuelve y renderiza |

**Criterio de continuidad**: el frame final de cada step debe ser idéntico al
frame inicial del siguiente. Estado de la v1:

```
1→2   60 px (0.003 %)   2→3   60 px (0.003 %)   3→4   0 px
4→5    0 px             5→6    0 px             6→7    0 px
7→8    0 px             8→9    0 px             9→10   0 px
```

Los 60 px residuales son antialiasing sub-píxel del punto de contexto.

## 7. Dónde continuar el pulido

- **Timings**: `s03v6/timeline.ts`, una función por step; cada propiedad con su
  intervalo `[a, b]` en ms.
- **Geometría**: `s03v6/geometry.ts` (cajas, curvas, colores, duraciones).
- **Apariencia**: `s03v6/Scene.tsx` (orden de pintado = capas).
- **Curvas de conexión**: se revelan por longitud real; para cambiar su forma,
  editar el path y su tabla de arco en el mismo sitio (`timeline.ts`).
- **El travelling**: `zoomAt()` y `S_FINAL` en `timeline.ts`; `Q0` y el radio
  blanco se derivan del asset, no están escritos a mano.
- **Evidencia QA**: se regenera con los scripts anteriores; no está versionada
  por peso (ver §8).

## 8. Notas de repositorio

- La evidencia QA (capturas PNG y webm, ~13 MB) se mantiene **fuera** del
  historial Git; los scripts que la generan sí están versionados.
- `playwright` es devDependency para el QA headless. El proyecto ya usaba
  `puppeteer-core` y Playwright de Python en sus scripts; si se prefiere no
  mantener la dependencia, los scripts pueden migrarse a `puppeteer-core`
  apuntando al Chromium ya descargado.
- El step 0 (branding) y el destino S04 no se han rediseñado.
