# 09_IMPLEMENTATION_RISK_PREVIEW

Riesgos de implementación causados por los propios assets (no el registro completo de riesgos).

## Top riesgos

1. **Multi-part SVG animation risk** — `homeplus-logo-animatable.svg` define ~10 capas animables (wall_left, person_big_body, person_small_body, heads, roofs, eaves, plus_icon). Secuenciarlo mal produce doble trazo (ambas `house_outline` y `house_outline_parts` visibles) — el propio layer map exige ocultar una variante. Presupuesto de movers: logo reveal solo en A14/I01 (token `hero`).

2. **Morph risk** — SVG/path morph está RECHAZADO en todo el film (cero beats). `A17` debe implementarse con el mecanismo real autorizado para el beat: shared-element/scene choreography y `SVG EDITORIAL_DRAW` cuando corresponda; nunca con interpolación de paths, nunca con "Juli se convierte en..." como morph visual. Cualquier intento de morph de path viola el canon.

3. **Reparenting risk** — F05/G09 `device.product`, person.*, inventory/finance movement. Riesgo: clonar nodos, medir geometría authored, degradar a crossfade. Regla: una instancia viva, `getBoundingClientRect` del slot real, THROW/BLOCK ante geometría inválida.

4. **Missing vector source risk** — `house.outline` y `physical.heladera` NO EXISTEN hoy. Son obligatorios (A17/J03/J04–J11 y A04/J02). Producirlos tarde bloquea escenas J y el openinig A04.

5. **Inconsistent silhouette risk** — `family-avatars.svg` está horneado en un solo archivo; si A15/A16/B07/B12/J04 reutilizan ese lienzo completo en vez de 4 capas separadas por persona, se rompe SE-13 y el byte-identity invariant de J11 (T-SEM-18).

6. **Raster-vs-vector risk** — `HomePlusLogo.tsx` usa PNG raster (`assets\07a9...png`). A escalas de reveal (hero 880ms, J14 end card) y en el blackout de S02→S03 el pixelado o la falta de alpha dura puede romper la máscara de borde duro del reveal. Migrar al SVG animatable.

7. **Attention theft risk** — objetos de opening/closing MUY detallados (heladera realista, factura fotográfica) robarían foco del gate de hero. Regla: flat-vector, silhouette clara, máximo 2 niveles de detalle interno, sin texto legible salvo nodos editoriales canónicos ("Garantia PlayStation 5.pdf").

8. **Scale breakdown risk** — objetos pensados a 420px (bolsa A03) pueden degradarse a 0.30–0.40 exposure o a tamaños ≤64px en ghosts J05. Definir tamaño mínimo legible (≥96px para silueta principal, ≥28px para chips) y fallback de simplificación (menos detalle interno cuando scale < 0.5).

9. **Stand-in contamination risk** — prohibido: gradientes como foto (E05 los borra), waveform de audio, Factura TV, screenshots como UI, backdrop-filter blur, blur(filter) por defecto. Cualquier "placeholder bonito" de raster entra en contradicción con la autoridad.

## Riesgo por categoría (breve)

| Categoría | Riesgo dominante | Mitigación |
|---|---|---|
| BRAND | raster PNG en uso; doble capa de house en logo | migrar a SVG animatable; una sola variante visible |
| FAMILY | 4 avatares en 1 archivo | split en 4 capas; budget ≤3 movers |
| OPENING/CLOSING | heladera/casa inexistentes | producir SVG flat con paleta canónica `#302922 #45362A #B57956 #718374` |
| STRUCTURAL | house.outline es el asset más crítico | producir primero, con layer split stroke/head/roof |
| DOCUMENT/MEMORY | temptación de gradient/photo stand-ins | policy: frame + caption tipográfico, sin raster |
| TECH LOGOS | versiones color/monocromo mezcladas | usar `-color` solo cuando el beat nombra el logo; monochrome para idle |
| UI-ADJACENT | pins/pills como UI inventada | tratar como editorial, no product screens |
