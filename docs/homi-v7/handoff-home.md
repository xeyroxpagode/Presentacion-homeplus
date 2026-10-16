# HOMIE V7 — Handoff a Home (pose final G27)

El último fotograma de V7 es **Home digital estable y completo**.
El movimiento físico posterior (teléfono físico, cocina 3D) pertenece a otra
implementación y NO se anticipa.

## Fuente

`V7HomeFinal` → `HomeDemoScreen` nativo (`showJuli`), sin adaptaciones de
anatomía, sin overlays operativos, sin animaciones activas.

## Estado visible

- `HomeHeader` (Juli) · `Hoy: Llevar autorización, Tarea de Matemática` ·
  `Próximamente: Educación Física` · `HomeNavigation`.
- Fecha: `Domingo, 16 de agosto`.
- Sin popovers, sin propuestas, sin focos (G27 retira los de G25/G26,
  contraste original restaurado).

## Geometría

- Componente en geometría nativa (pantalla de app ~402px), centrado en el
  stage 1280×720. El hilo 3D decide la proyección al teléfono.
- Atributo listo: `data-homi-v7-ready="true"` cuando el hold G27 está montado.

## Condición de entrega

Home quieto, completo, sin movimiento residual, sin elementos
`pointer-events` invisibles, listo para la retirada hacia el teléfono físico.
