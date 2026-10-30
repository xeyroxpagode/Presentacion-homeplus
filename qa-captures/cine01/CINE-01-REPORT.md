# CINE-01 — Informe de implementación

## A. Resultado ejecutivo

**CINE-01 IMPLEMENTED / PASS, con dos decisiones ADAPTED y ninguna bloqueada.**

Se mantuvieron los seis beats, FOV 36°, navegación manual/reversa, guion, cocina única, director determinista, `frameloop="demand"`, portal físico, S02 y Final Kitchen. La mejora incorpora trayectorias dirigidas, perfiles de velocidad, orientación robusta, foco por sujeto, geometría de papeles, biseles, luz calibrada, AO, DOF, bloom, grading, grano determinista, motion blur limitado y tres perfiles de calidad.

Las adaptaciones declaradas son P01 (motion blur de cámara en screen space, sin velocity buffer por objeto) y L05 (GTAO + fog + polvo estático iluminado, sin scattering volumétrico real).

## B. Matriz de 36 decisiones

| ID | Estado | Archivos | Implementación y diferencia frente al baseline | Evidencia / límite |
|---|---|---|---|---|
| C01 | PASS | `s01CinematicConfig.ts`, `s01Director.ts` | Curvas cúbicas y recorridos dirigidos para seguro, pantry, heladera, documentos, wide y portal; se eliminaron tramos perceptiblemente lineales sin mover anchors finales. | Capturas de tiempos intermedios 720p/1080p y suite de holds/reversa. |
| C02 | PASS | `s01Director.ts` | Easing nominal `observational`, `discovery`, `consequence` y `commit`, manteniendo 900/2450/3350/1850/1450 ms. | 44 capturas deterministas y holds estáticos. |
| C03 | PASS | `s01Director.ts`, `S01CinematicProps.tsx` | Mayor paralaje real, capas físicas de papel, cavidades y marco de puerta; teléfono siempre inmóvil. | Secuencias pantry/travel/fridge/docs/portal. |
| C04 | PASS | `S01Camera.tsx`, configuración existente | FOV 36° invariable y composición preservada en 1280×720 y 1920×1080. | Test de resize/FOV y dos juegos completos de capturas. |
| C05 | PASS | `S01Camera.tsx` | Orientación reconstruida con matriz `lookAt` y quaternion; `up` normalizado, sin oscilación de hold. | Deep-links 0–5, reversa exacta y portal final estable. |
| C06 | PASS | `s01Focus.ts`, `S01PostProcessing.tsx` | Focus anchors reales para póliza, pantry, heladera, documentos, wide y display, con pulls asentados. | Capturas close-up/wide; DOF se desvanece antes del handoff. |
| A01 | PASS | `s01Director.ts` | Puertas conservan 42°/58°/46°/50° y 22°/8°/12°, con masa y asentamiento diferenciados. | Límites medidos: 12° y 50° en estado final; suite adversarial. |
| A02 | PASS | `s01CinematicConfig.ts`, `s01Director.ts` | Tres alacenas escalonadas; tercera puerta con respuesta más pesada y sin sobrepaso físico. | Capturas S01.2 pantry/travel y navegación interrumpida. |
| A03 | PASS | `s01Director.ts`, props existentes | Cajón mantiene 0.24 sobre límite 0.28, sin giro; curva de fricción/deslizamiento/frenada. | Límite medido 0.24 y holds estables. |
| A04 | PASS | `S01CinematicProps.tsx`, `s01Director.ts` | Hojas 6×8 con curvatura determinista, niveles separados y entrada desde oclusión en vez de materialización. | Close-ups de póliza/documentos y captura wide. |
| A05 | PASS | `S01CinematicProps.tsx`, iluminación | Llaves quietas con metal legible; teléfono conserva pose/dimensiones; props sin vibración perpetua. | Plano seguro y portal final píxel-continuo. |
| A06 | PASS | `s01Director.ts`, `S01CinematicProps.tsx` | Se preservaron tiempos/límites de avería y destinos de alimentos; humo reemplazado por seis sprites radiales suaves, sin negro de incendio. | Capturas 320–3350 ms y holds exactos. |
| A07 | PASS | `s01Director.ts` | Estado visible deriva de step + tiempo local; loops de humo suspendidos en hold; interrupciones convergen. | Avance, reversa, deep-links e interrupciones PASS. |
| M01 | PASS | `S01World.tsx` | Isla/counter con cuerpos suavizados y radios pequeños, conservando huella y arquitectura. | Wide 720p/1080p y Final Kitchen W02. |
| M02 | PASS | `S01CinematicProps.tsx` | Carcasa y puertas de heladera con bordes redondeados, espesor/rig preservado y detalle de imán. | Close-ups de heladera y límites físicos. |
| M03 | PASS | `S01CinematicProps.tsx` | Papel marfil, UV/texturas intactas, relieve y separación; sello VENCIDO sigue impreso. | Póliza legible en captura final; sin z-fighting visible. |
| M04 | PASS | `S01World.tsx`, `S01CinematicProps.tsx`, `S01Lighting.tsx` | Materialidad PBR existente recalibrada mediante roughness/metalness, luces y contactos; diferencias madera/papel/metal/plástico preservadas. | Revisión visual de primeros planos y wide. |
| M05 | PASS | `S01World.tsx`, `S01CinematicProps.tsx` | Biseles, espesores, capas y sombras de contacto mejoran dimensionalidad sin rediseñar modelos. | Capturas de póliza, pantry, docs y wide. |
| M06 | PASS | `S01CinematicProps.tsx` y escenografía existente | Se preservó la microescenografía doméstica; aro de llave/reflejos, papeles, vajilla, alimentos e imán refuerzan escala sin ruido nuevo. | Inventario visible en WIDE; 19 vajillas y 6 docs conservados. |
| L01 | PASS | `S01Lighting.tsx` | Key spots/lámparas recalibrados; altas luces reducidas y sombras 2048/1024/512 según perfil. | Papeles ya no quemados; capturas finales. |
| L02 | PASS | `S01Lighting.tsx` | Relleno frío de fondo/ventana preserva contraste con madera cálida. | Comparación close-up vs wide. |
| L03 | PASS | `S01Lighting.tsx`, director existente | Luz interior fría sigue ligada al beat/avería con caída suave y exposición estable. | S01.2 final y S01.3 secuencial. |
| L04 | PASS | `S01Lighting.tsx` | Rebote cálido de isla, fill de bacha, rim y contactos calibrados con pocas luces. | Wide y documentos con geometría oscura aún legible. |
| L05 | ADAPTED | `S01PostProcessing.tsx`, `S01Atmosphere.tsx` | GTAO cubre cavidades/contactos; fog existente y polvo determinista por perfil aportan profundidad. | Sin halos negros; desactivable en safe. No hay scattering volumétrico real. |
| L06 | PASS | `S01Lighting.tsx`, `s01Director.ts` | Factores lumínicos por beat son suaves y deterministas; negro limpio, seguro cálido, frío de heladera, wide balanceado y portal neutro. | Métricas de luminancia y holds sin variación. |
| P01 | ADAPTED | `S01PostProcessing.tsx` | Motion blur de 7 taps guiado por velocidad de cámara, topes 3–5 px normales/12 px portal, reset en saltos y cero en hold/handoff. | Sin ghosting en navegación. No se incorporó velocity buffer por objeto. |
| P02 | PASS | `s01Focus.ts`, `S01PostProcessing.tsx` | BokehPass usa distancia real a focus anchors, blur moderado y fade total de portal. | Close-ups y handoff S02 sin DOF heredado. |
| P03 | PASS | `S01PostProcessing.tsx` | Bloom muy bajo, sólo altas luces, desactivado progresivamente antes del portal. | Papeles/texto nítidos; no hay glow global. |
| P04 | PASS | `S01Canvas.tsx`, `S01PostProcessing.tsx` | ACES, sRGB, exposición por perfil, sombras frías/medios naturales/madera cálida; post en cero al final físico. | Último frame físico y S02.0 compatibles, sin cambio de gamma visible. |
| P05 | PASS | `S01Canvas.tsx`, `S01PostProcessing.tsx`, `s01Quality.ts` | MSAA del target por perfil, OutputPass, grano fijo 0.32% y viñeta leve; holds deterministas. | Capturas 720p/1080p y perfiles cinematic/balanced/safe. |
| N01 | PASS | director, foco, post | Seguro entra desde negro con dolly/foco integrado; llaves quietas y sello impreso. | S01.1 mid/final. |
| N02 | PASS | director/configuración | Aperturas escalonadas, lectura de cavidad y travelling continuo a heladera sin pausa artificial. | S01.2 pantry/travel/final. |
| N03 | PASS | director/props | Primero avería, luego búsqueda; documentos llegan desde zonas ocultas durante movimiento de cámara. | S01.3 en siete tiempos. |
| N04 | PASS | director/props | Retroceso coreografiado, 19 piezas y 6 documentos, asentamiento antes de 1850 ms. | S01.4 en cuatro tiempos y hold prolongado. |
| N05 | PASS | director/post/portal existentes | FOV, overscan, teléfono inmóvil, una sola aproximación y cobertura física preservados; efectos ópticos apagados antes de transferencia. | S01.5 cinco fases + S02.0 1920×1080. |
| N06 | PASS | integración existente + geometría compartida | S02 no fue rediseñada; Final Kitchen usa canvas independiente y montaje W02 correcto; resto de slides intacto. | Handoff, Final Kitchen y 36 endpoints sin errores. |

## C. Cambios de arquitectura

- `s01Quality.ts`: perfiles cinematic/balanced/safe y selección por `?s01Quality=`; reduced motion cae a safe.
- `s01Focus.ts`: política declarativa de focus anchors.
- `S01PostProcessing.tsx`: composer oficial de Three (Render, GTAO, Bokeh, Bloom, blur direccional, grading y Output), con disposición de recursos.
- `S01Atmosphere.tsx`: polvo estático determinista, sin invalidar holds.
- Director/configuración: curvas y easings nominales sin duplicar la autoridad de estado.
- No se agregaron dependencias de runtime al proyecto.

## D. Evidencia cinematográfica

- Baseline preservado: `qa-captures/cine01/baseline/`.
- Captura final: `qa-captures/cine01/final/` (44 PNG, 1280×720 y 1920×1080).
- Métricas: `qa-captures/cine01/final/metrics.json`.
- Handoff: `handoff-s02-0-1920x1080.png`.
- Final Kitchen: `final-kitchen-w02-1280x720.png`.

Perceptualmente: S01.1 recupera legibilidad de póliza; S01.2 gana profundidad y continuidad; S01.3 separa avería/búsqueda y elimina papeles instantáneos; S01.4 controla altas luces y profundiza la cocina; S01.5 mantiene el display neutro hasta S02.

## E. Pruebas técnicas

- `npx tsc --noEmit`: PASS.
- `npm run build`: PASS (advertencias preexistentes de Vite/chunk size, sin error).
- `node qa-captures/cine01/capture-cine01.mjs final`: PASS; 44 capturas; 0 errores.
- `python -u qa-captures/cine01/cine01_adversarial.py`: PASS; 29/29; 0 errores runtime.
- La suite cubre avance, reversa, interrupciones, deep-links, límites, perfiles, reduced motion, resize, S02, Final Kitchen y 36 endpoints de la presentación.

## F. Rendimiento

Entorno: Chrome headless, WebGL reportado como `WebKit WebGL`, perfil cinematic, 720p/1080p, lectura reproducible de framebuffer.

- Mediana de la última llamada de render en 44 muestras: **10.3 ms**.
- Promedio: **68.36 ms**.
- P95: **272.1 ms**.
- Máximo: **1415.5 ms** (compilación/calientamiento y captura síncrona/readback).

Estas cifras no certifican 60 fps sostenidos en el equipo de exposición: el harness headless introduce compilación, `readPixels` y PNG síncronos. La mediana queda dentro de 16.7 ms; cinematic debe verificarse en el hardware final. Balanced y safe preservan exactamente la geometría narrativa y reducen sombras/AO/DOF/blur/partículas.

## G. Regresiones

- Portal: PASS; no pantalla negra accidental, segundo dive, zoom FOV ni escalado del teléfono.
- S02: PASS; primera pantalla visible y sin herencia de post.
- Final Kitchen: PASS; W02, blackout 0, canvas independiente.
- Presentación: PASS; 36 endpoints montados, 0 errores runtime.
- Director: PASS; seis holds estables y reversa exacta.

## H. Pendientes

No quedan bloqueos funcionales ni regresiones críticas conocidas. Pendientes opcionales fuera de este cierre:

1. Certificar FPS en el hardware físico de exposición; seleccionar `balanced` o `safe` si cinematic no sostiene el objetivo.
2. Un velocity buffer por objeto y scattering volumétrico real podrían elevar P01/L05, con coste de complejidad y GPU; la implementación actual usa alternativas compatibles y declaradas.
