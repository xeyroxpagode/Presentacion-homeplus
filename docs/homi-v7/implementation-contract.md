# HOMIE V7 — Contrato de implementación

Rama: `s15/homi-bc-cinematic-v6` (misma rama V6, sin worktree nuevo, sin merge).
Baseline: `9be894d` · Tag de respaldo local: `backup/homi-v6-before-v7-9be894d`.
Alcance: S15, S16, S17 + `presentationConfig.ts` (solo stepCounts) + director,
escenas, CSS, tests y docs V7. Prohibido todo lo demás (§2).

## Arquitectura

```
src/presentation/slides/homi-cinema-v7/
  homiV7Data.ts    datos congelados + director determinista (27 beats)
  HomiV7Stage.tsx  director + morph Coca→Planner + composición unificada
  BenjaShots.tsx   superficies B01–B13 (Homi, propuesta, Planner, unificado)
  GabyShots.tsx    superficies G14–G27 (contexto, mañanas, Home)
  homi-v7.css      estilos aislados (scope exclusivo .v7-stage)
```

## REUSE / REPLACE / REMOVE / PRESERVE (§1.3)

- REUSE: `PlannerDemoScreen`, `FinanceDemoScreen`, `InventoryDemoScreen`,
  `HomeDemoScreen`, `HomiDemoScreen` CSS de anatomía, `FrictionEchoV4`
  (recuerdo de Fricción), fixtures `plannerData`/`financeData`/`inventoryData`,
  patrón director-determinista + morph medido de V6.
- REPLACE: `BenjaShots`, `GabyShots`, `HomiV6Stage`, 38 beats P01–P38,
  tres teléfonos, ecos de botones, pantallas desconectadas.
- REMOVE FROM RUNTIME: imports de `homi-cinema-v6` en S15/S16/S17.
  El directorio V6 queda como referencia fuera del bundle (ningún import activo).
- PRESERVE: S14, apertura, S01, Three.js, S18, cierre. Intactos.

## Siete composiciones (§4)

| # | Beats | Superficie |
|---|-------|-----------|
| C01 Homi | B01–B03 | Homi compacto → conversacional |
| C02 Propuesta | B04–B05 | Burbuja + interpretación + Cancelar/Confirmar |
| C03 Planner | B06 | Planner grande, Coca en fila nativa |
| C04 Sistema unificado | B07–B12 | Misma superficie, solo cambia el foco |
| Negro | B13 | `#000000`, hold hasta Space |
| C05 Contexto | G14–G18 | Homi izq + UN viewport der (Planner/Finance/Inventory) |
| C06 Tres mañanas | G19–G22 | Pregunta fija + 3 respuestas simultáneas |
| C07 Home | G23–G27 | Home canónico + 2 focos, pose final estable |

## Decisiones V7 vs V6 (fallos §0.1 corregidos)

1. Homi compacto (800×330 canvas) con composer disponible; nunca rectángulo vacío.
2. La burbuja Coca permanece visible mientras nace la propuesta debajo.
3. La propuesta vive dentro del hilo de Homi, no como componente suelto.
4. B05 confirma (micro-press 155ms + "Confirmado") y B06 demuestra el resultado.
5. Coca es fila nativa `data-task-id="coca-homi-v7"` con realce único.
6. Planner ocupa 1066×580 canvas; Homi es presencia contextual, no app flotante.
7. C04 es una sola superficie B07–B12; B07≡B08 para continuidad S15→S16.
8. C05 es un único viewport que sustituye solo su contenido (swap 400ms, marco inmóvil).
9. C06: tres tarjetas de 327px con contenido completo, pregunta única arriba.
10. Sin skeletons: G21 revela contenido preparado con stagger coordinado.
11. Sin estados Home repetidos: C07 es un Home con dos focos y pose final.
12. Holds estables; animaciones solo con función narrativa (§5.5).

## Continuidad S15→S16

`Presentation.tsx` remonta por slide. B07 (último S15) y B08 (primero S16)
renderizan la misma composición integrada idéntica → sin flash. El único negro
deliberado es B13.

## Datos (resumen; detalle en data-contract.md)

- D0 `2026-08-16` / D1 `2026-08-17`. Nada lee el reloj del navegador.
- `COCA_TASK` sin responsable; visible solo desde B06; registro único.
- Tomi: Entrenamiento + Coca como contexto compartido (no asignada).
- Juli: Educación Física + Autorización completada (canónico: `completed`).
- Papá: sin compromisos personales + compras pendientes (sin seguro/importe).
