# HOMIE V7 — Informe QA

**VERDICT: PARTIAL** (implementación completa + QA estático PASS; QA visual y
build pendientes por falta de herramientas en este entorno — nunca se declara
PASS visual sin render).

## Estático (ejecutable aquí)

Comando: `./scripts/verify-homi-v7.sh` → **STATIC QA V7: ALL PASS (23/23)**:
distribución 7/6/14, 27 ramas + 27 labels, negro `#000`, determinismo,
alcance, V6 fuera del runtime, Coca única con morph al mismo id,
Cancelar+Confirmar, recuerdo no operativo, pregunta única, D1 congelada,
tres perfiles, papá sin seguro, Coca compartida en Tomi, viewport único,
B07/B08 integrados, exit contract, sin infinitas ni prohibidos.

## Pendiente (requiere Node + navegador, documentado para Windows)

```powershell
npm install
npx tsc --noEmit
npm run build
npm run dev
# Abrir http://localhost:5173/?dev=1&slide=14&step=N (S15: 0-6)
# http://localhost:5173/?dev=1&slide=15&step=N (S16: 0-5)
# http://localhost:5173/?dev=1&slide=16&step=N (S17: 0-13)
```

Gates B–F (§20), capturas 0/25/50/75/100/hold (§21) y grabación continua
B01→G27 (§22) deben ejecutarse en navegador antes de declarar PASS.

## Regresiones

- S14, S01, S18 y demás slides: intactos (diff solo toca S15/S16/S17,
  `presentationConfig` stepCounts, y archivos nuevos V7).
- V6 conservada como referencia fuera del bundle (cero imports activos).
- Navegación genérica (`navigation.ts`, `Presentation.tsx`): sin cambios;
  avance/retroceso/salto funcionan por `stepCount` (7/6/14).

## Riesgos conocidos

1. Tipografías/canvas exactos (pregunta 62–68px master, tarjetas) dependen de
   medidas reales del navegador; el CSS usa tokens editoriales y debe validarse
   en Gate A.
2. El morph B06 interpola con rectángulos medidos en runtime; si Planner nativo
   cambia de layout, el fallback es cruce simple con estado final idéntico.
3. `prefers-reduced-motion` reduce animaciones a 1ms (verificado por inspección).
