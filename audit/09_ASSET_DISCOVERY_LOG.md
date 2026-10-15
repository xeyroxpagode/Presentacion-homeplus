# 09_ASSET_DISCOVERY_LOG

Sesión 9 — descubrimiento real de assets reutilizables en disco (solo lectura sobre fuentes).

## Logo HomePlus

| Campo | Valor |
|---|---|
| Encontrado | SÍ |
| Path 1 (master) | `C:\Users\thega\Desktop\Figma-app\src\assets\brand\homeplus-logo-master.svg` |
| Path 2 (animatable) | `C:\Users\thega\Desktop\Figma-app\src\assets\brand\homeplus-logo-animatable.svg` |
| Tipo | SVG vectorial, monoline plano, 1254×1254, sin raster, sin filtros, sin sombras horneadas |
| Calidad | Reconstrucción monoline vectorial lista para producción; gradiente naranja `#f9782a → #ed5b17 → #e14f12`, trazo blanco `58.80`, caps/joins redondos |
| Motion-ready | Path 2 SÍ: capas nombradas (`bg`, `house_outline`, `house_outline_parts`, `eave_*`, `roof_*`, `wall_left`, `person_big_body`, `person_small_body`, `heads`, `plus_icon`) con secuencia sugerida de 9 pasos y `pathLength`/stroke-dasharray predecible |
| Uso actual en producción | La presentación NO lo usa: `src\presentation\components\HomePlusLogo.tsx` referencia el PNG raster `assets\07a9c99e-dd9f-4b8b-a7dc-2453e6935ca2.png` (riesgo raster-vs-vector) |
| Otros logo detectados | `src\presentation\assets\illustrations\homi-mark.svg` (marca Homi, cuadrado naranja `#C96B45` + estrella blanca); `assets\tech\ai.svg` para IA |

## Assets existentes en la presentación (`HomePlus_Presentacion_FINAL\src\presentation\assets`)

| Path | Tipo | Estado |
|---|---|---|
| `illustrations\family-avatars.svg` | SVG 284×100, avatares embebidos en un solo archivo | EXISTS PARTIAL — requiere split en 4 capas (SE-13) |
| `illustrations\grocery-bag.svg` | SVG 290×352, bolsa de compras | EXISTS, reutilizable |
| `illustrations\homi-mark.svg` | SVG 64×64 | EXISTS, reutilizable |
| `illustrations\information-fragments.svg` | SVG 1104×580, fragmentos (calendario, mensajes, papeles) | EXISTS, reutilizable (split opcional por fragmento) |
| `illustrations\insurance-document.svg` | SVG 304×370, documento | EXISTS, base para factura/garantía |
| `illustrations\person-speaking.svg` | SVG 80×80, persona editorial | EXISTS, reutilizable |
| `tech\figma.svg`, `figma-color.svg` | SVG | EXISTS |
| `tech\react-native.svg`, `react-native-color.svg` | SVG | EXISTS |
| `tech\expo.svg` | SVG | EXISTS |
| `tech\nodejs.svg`, `nodejs-color.svg` | SVG | EXISTS |
| `tech\supabase.svg`, `supabase-color.svg` | SVG | EXISTS |
| `tech\postgresql.svg`, `postgresql-color.svg` | SVG | EXISTS |
| `tech\ai.svg` | SVG 64×64 | EXISTS |
| `app-icons\*.svg` (bank, calendar, drive, location, notes, whatsapp) | SVG | EXISTS — usados por `organization.symbols` (J08) |

## Componentes existentes con valor de asset

| Path | Nota |
|---|---|
| `src\presentation\components\HomePlusLogo.tsx` | Wrapper sobre el PNG raster; debe migrar al SVG animatable (Path 2) |
| `src\presentation\components\PhoneFrame.tsx` | Device shell reutilizable (device shell asset) |
| `src\presentation\components\AmbientGlow.tsx` | Focus halo / glow policy existente |
| `src\presentation\components\HomePlannerSequence.tsx` | Secuencia editorial de device |
| `src\presentation\components\MessageBubble.tsx`, `SpokenFragment.tsx` | Bubble/fragment primitives |

## Otros repos inspeccionados

| Repo | Hallazgo |
|---|---|
| `C:\Users\thega\Desktop\Implement HomePlus Keynote\src\assets\presentation\brand\BrandHomePlusMaster.tsx` | Componente brand maestro (TSX), subcarpetas `context/family/geni/product/tech/video` vacías; referencias en `reference\` solo PNGs de atlas |
| `C:\Users\thega\Desktop\Presentacion_HomePlus_Final` | Sin assets propios; solo prompts en `src\imports` |
| `C:\Users\thega\Desktop\HomeplusPresentacion01\HomePlus_Presentacion_FINAL` | Único repo con assets productivos completos |
| `C:\Users\thega\Desktop\logos app` | Vacío |
| `C:\Users\thega\Desktop\HomePlus` | Solo proposals SVG de planner; logo no presente en profundidad inspeccionada |

## NOT FOUND IN INSPECTED ROOTS

- `house.outline` como SVG autónomo (solo existe el concepto path dentro del logo animado; hay que producirlo como asset propio)
- `physical.heladera` (nevera) — no existe SVG/PNG
- `mochila` como asset — **no debe producirse como imagen**: no tiene antecedente en el film (SI-23); su única referencia válida es textual en J02
- Wordmark tipográfico HomePlus independiente del lockup — no existe archivo; requiere fallback tipográfico
- Versiones monocromas/invertidas del logo — no existen como archivo
- `physical.bolsa` standalone — existe `grocery-bag.svg`
- Documento `Garantia PlayStation 5.pdf` como asset editorial — no existe; producir nodo de documento
- Album cover / memory photo — no existe asset real; definido por política (sin stand-ins de gradiente, E-05)
- Waveform de audio — prohibido por autoridad; no producir

## Conclusión

El logo HomePlus SÍ fue encontrado y es motion-ready en su variante `homeplus-logo-animatable.svg`. La brecha principal es que la presentación consume la versión raster PNG. Los objetos faltantes de mayor riesgo son `house.outline` y `physical.heladera`, ambos obligatorios para A17/J03/J04–J11 y A04/J02.
