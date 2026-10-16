# HOMI V6 — Reporte QA (§13 + §14)

Rama: `s15/homi-bc-cinematic-v6` · Baseline V4.2: `07ec9116afebf56bdd32f7d127c9dc50e8416cad`

## 1. QA estático — PASS

`scripts/verify-homi-v6.sh` → **ALL PASS (17/17)** el 2026-10-16:

- E01 38 beats (S15=P01–P10, S16=P11–P19, S17=P20–P38) · E02 stepCounts 10/9/19 ·
  E03 38 ramas + 38 aria-labels · E04 P19 `#000` · E05 determinismo · E06 alcance · E07 trío P31
- L02 mensaje íntegro · L04 propuesta derivada · L05 Cancelar+Confirmar · L08 una sola Coca ·
  L12 recuerdo no operativo · L14 consulta sin mutación · L15 pregunta única · L16 D1 único ·
  L17 orígenes documentados · L18 montos reales · L19 tres perfiles · L21 exit contract + ready
- C01 sin animaciones infinitas · C02 sin patrones prohibidos

Lógica §12 restante (L01, L03, L06, L07, L09, L10, L11, L13, L20, L22): verificada por
inspección del switch del director + `demoStateFor` (P08 confirma / Planner desde P09 /
P11–P14 sin mutaciones / P38 `data-homi-v6-ready`). L22 (S14/posterior intactos):
`git status` muestra cambios solo en S15–S17, `presentationConfig.ts` (3 stepCounts),
`homi-cinema-v6/`, `docs/homi-v6/`, `scripts/`. **PASS por inspección.**

## 2. Pruebas cinematográficas T01–T09 — NO VERIFICADO (visual)

| ID | Beats | Estado | Motivo |
|---|---|---|---|
| T01 formulario→Homi | P01 | NO VERIFICADO | sin navegador en este entorno |
| T02 mensaje→propuesta | P04–P06 | NO VERIFICADO | idem |
| T03 confirmación→Planner | P08–P09 | NO VERIFICADO | idem (morph con rects medidos: requiere layout real) |
| T04 planner amplio + control | P12–P14 | NO VERIFICADO | idem |
| T05 negro Benja→Gaby | P19–P20 | NO VERIFICADO | idem |
| T06 módulos→contexto | P25 | NO VERIFICADO | idem |
| T07 Tomi→Juli→papá | P28–P31 | NO VERIFICADO | idem |
| T08 perspectivas→Home | P32–P33 | NO VERIFICADO | idem |
| T09 Home final | P38 | NO VERIFICADO | idem |

Composiciones finales por beat: implementadas y revisadas estáticamente.
Fotogramas intermedios (25/50/75 %): **no capturados**.

## 3. Build / typecheck / tests — NO VERIFICADO (bloqueo de entorno)

- `vite build`: NO VERIFICADO — sin runtime Node (ni `node`, `npm`, `pnpm`, `mise`) en este entorno.
- `tsc --noEmit`: NO VERIFICADO — mismo bloqueo. Riesgos conocidos y mitigados por inspección:
  `as CSSProperties` con custom props (mismo patrón que V4.2, baseline aceptado),
  `financePayments[1]` (sin `noUncheckedIndexedAccess`), switch exhaustivo con retorno.
- Tests preexistentes: el repo no tiene runner (scripts: dev/build/preview/format); nada que regressar.
- Navegador + capturas 1920×1080 / 1280×720: NO VERIFICADO (`puppeteer-core` presente pero sin Chrome ni Node).

**Para declarar PASS visual hay que ejecutar en una máquina con Node 22:**
`pnpm install && pnpm build`, `npx tsc --noEmit`, `pnpm dev` + capturas P01–P38
(inicial/25/50/75/100/hold) en 1920×1080 y 1280×720, y correr T01–T09.

## 4. Defectos propios encontrados y corregidos (auto-revisión)

1. `FrictionEcho` sin estilos en V6 (las reglas `.fr-*` viven en `homi-v4.css`): copiado el
   bloque donante a `homi-v6.css` bajo `.v6-friction-scope` + clase en P01/P02.
2. Clon del morph con ancho/fuentes distintos del origen: igualado al bloque fuente (640px).
3. P17–P18 usaban Planner sin Coca: cambiado a `V6PlannerAfterConfirm` tenue (el resultado persiste).
4. P29 sin "viaje" de Tomi y P30 con escalas inconsistentes: keyframes `v6-tomi-travel` / `v6-trio-settle`.
5. Chequeo E06 incluía comentarios CSS: acotado a `.tsx`.

## 5. Veredicto parcial

- Implementación 38/38 + contratos + QA estático: **PASS**.
- QA visual / build / typecheck / navegador: **NO VERIFICADO** (bloqueo de entorno, no del código).
- **Veredicto global: PARTIAL** (pendiente F9 visual en entorno con Node).
