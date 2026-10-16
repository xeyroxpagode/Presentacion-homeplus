# HOMI V6 — Contrato de beats P01–P38 (§6 + §14)

Frases = guion canónico (oral Benja/Gaby). Duraciones = objetivos §2.3 implementados en `homi-v6.css` (canvas 1280×720 = master × 2/3).
Evidencia estática: `scripts/verify-homi-v6.sh`. Evidencia visual: pendiente de runtime Node (ver `qa-report.md`).

## S15 — Presentación y ejecución (Benja)

| Beat | Frase exacta | Objetivo | Presente / protagonista | Origen → animación (dur.) → destino / hold | Invariantes |
|---|---|---|---|---|---|
| P01 | Y ahí aparece HOMIE. | Homi sustituye al formulario | Formulario Fricción + Homi neutro / Homi | Form centrado → sale izq+escala .94 (120–750ms); Homi entra der (220–620) → hold Homi completo sin mensaje | No guarda mochila; sin splash |
| P02 | La idea es simple: en vez de tener que pensar dónde entrar o qué botón tocar, | Lo difícil era entrar | Homi centro + 3 ecos (Planner-tabs, crear +, formulario) / Homi | Ecos aparecen tenues y derivan a bordes (600ms); Homi quieto | Sin navegación simulada |
| P03 | a veces podemos simplemente decir qué queremos hacer. Por ejemplo: | Preparar el decir | Homi + composer con foco y cursor / composer | Foco entra (400ms); cursor parpadea 3× y queda fijo | Sin mensajes; hold en espera |
| P04 | 'Haceme acordar de ir mañana a comprar una Coca'. | El pedido | Composer typing + burbuja / burbuja | 3 grupos (150/500/850ms) → envío: burbuja sube al hilo (1180–1630) → hold burbuja íntegra, composer vacío | Sin duplicados; texto íntegro |
| P05 | Geni entiende esa intención, | Interpretación | Mensaje + propuesta emergente / propuesta | Contenedor 0–150, kicker 120–300, título 220–480, fecha 330–570, settle 570–700 | Sin spinner; solo datos derivados |
| P06 | nos muestra una propuesta | Propuesta final | Mensaje + propuesta / propuesta | Foco viaja: mensaje a 62% (650ms); tarjeta quieta y legible | No confirma |
| P07 | y nosotros decidimos si confirmarla o no. | Decisión humana | + Cancelar y Confirmar juntos / botones | Entrada conjunta (400ms); tarjeta quieta | Sin pulso en Confirmar; hold indefinido |
| P08 | Recién después de esa confirmación, | Confirmar una vez | Tarjeta + feedback aceptado / Confirmar | Presión 1→.975 (0–65) →1 (65–155); tarjeta Confirmado (200–550) | Una sola vez; sin Planner aún |
| P09 | HomePlus realiza la acción. | MORPH a Planner | Propuesta (sin botones) + Planner detrás + clon / clon→fila | Planner 150–650; vuelo medido 250–1050; handoff 1150; destello único fila | Una Coca; sin doble título; sin deformación X; capa temporal eliminada |
| P10 | Ese es el punto: no vive al costado. Trabaja sobre HomePlus. | Sistema, no costado | Planner módulo + acceso Homi / Planner | Reencuadre 700–1000 → hold integrado, fila visible | Sin dos apps lado a lado |

## S16 — Interfaz y autoridad humana (Benja)

| Beat | Frase exacta | Objetivo | Presente / protagonista | Origen → animación → destino / hold | Invariantes |
|---|---|---|---|---|---|
| P11 | Y eso no significa reemplazar toda la aplicación por un chat. | Planner al frente | Planner foco + Homi mini tenue / Planner | Reencuadre 600–800 | Homi no se destruye |
| P12 | La interfaz sigue siendo mejor cuando queremos mirar, | Mirar | Planner estable, varias filas / lista | Hold de lectura, sin scroll | Sin navegación |
| P13 | comparar | Comparar | Planner 1.035× / relación entre tareas | Zoom 400–650 | Sin gráficos inventados |
| P14 | o tener control visual. | Control real | Planner + foco en tabs nativas / tabs | Anillo 450ms, queda fijo | Sin mutar tareas |
| P15 | Geni aparece cuando: decir lo que necesitamos es más rápido que encontrar cómo hacerlo. | Acceso Homi | Planner contexto + acceso Homi activo / acceso | Foco Planner→ambos→Homi | Sin segundo mensaje |
| P16 | Son dos formas de interactuar con el mismo sistema. | Un sistema | Planner + Homi en un marco / integración | Foco corto a integración | Sin segunda instancia |
| P17 | Y si una intención implica cambiar algo importante, | Recuerdo | Planner tenue + propuesta Coca congelada / recuerdo | Memoria sube 650ms; no operativa | Congelado; NO cumple de Juli |
| P18 | Geni puede interpretar y proponer, pero: la decisión final sigue siendo nuestra. | Autoridad humana | Recuerdo + foco Cancelar/Confirmar / botones | Anillo en fila de decisión; quieto | Nada se presiona; sin cursor |
| P19 | (NEGRO ABSOLUTO — cambio de orador) | Entregar a Gaby | Negro #000000 / nada | Recuerdo 0–180, app 120–420, negro 350–600 → hold | Estable; sin autoavance |

## S17 — Contexto y propósito (Gaby)

| Beat | Frase exacta | Objetivo | Presente / protagonista | Origen → animación → destino / hold | Invariantes |
|---|---|---|---|---|---|
| P20 | pero cuando le decimos algo a homi no siempre buscamos algo en particular | Identidad | Marca Homi (640,243c) + composer vacío (640,363c) / marca | Desde negro, entrada 400–550 | Sin Coca, sin historial |
| P21 | necesitamos que homi relacione las cosas | Tres superficies | Planner (293,307c) + Finance (640,200c) + Inventory (987,307c) + Homi abajo / conjunto | Cámara se retira; cascada 60/160/260ms | Módulos reales; sin teléfonos |
| P22 | lo que tenemos pendiente, | Pendiente | Planner 1.08 plena / Planner | Foco 600ms; resto secundario | Dato real del fixture |
| P23 | nuestros gastos | Gastos | Finance foco / Finance | Desplaza foco; Planner a secundario | Sin montos inventados |
| P24 | o lo que nos falta comprar en casa | Faltantes | Inventory foco / Inventory | Desplaza foco | Sin marcar adquiridos |
| P25 | homi agarra lo que necesita y lo usa para respondernos | CONVERGENCIA | 3 módulos + 3 recortes + Homi / recortes | Destaque 0–250; recortes 200–550; vuelos 450–850/950; alinean 800–1050; integran 950–1250 → Homi centrado | Sin esfera/ partículas; recortes sin estado; sin anticipar respuesta |
| P26 | pensemos en algo tan simple como | Reencuadre pregunta | Homi + composer principal / composer | Fuentes se retiran; composer a tamaño principal | Sin texto aún |
| P27 | ¿que me queda para mañana? | La consulta | Pregunta fija (640,~157c, ≤800) + composer mini / pregunta | Fija 450ms; queda montada P28–P32 | Idéntica; sin Confirmar/Cancelar |
| P28 | la puede hacer tomi | Tomi | Pregunta + Tomi centro / Tomi | Identidad→contenedor→datos 600–800 | Sin segunda consulta |
| P29 | juli | Juli | Tomi izq .88 + Juli centro / Juli | Tomi viaja izq; Juli entra | Sin fusionar; datos Tomi intactos |
| P30 | o papá | Tríada | Tomi izq + Juli centro + Papá der / Papá | Cámara se amplía; Papá entra der | Sin cruces de tarjetas |
| P31 | la pregunta es la misma pero la respuesta no / ese mañana no es igual para todos | COMPARACIÓN | 3 paneles iguales (X247/640/1033c, 320 an., Y247–~570c) / conjunto | Hold real, sin moción secundaria | Misma estructura, distinto contenido; sin dominante |
| P32 | es el mañana de cada uno | Retirada | Trío ↓ + Home detrás / Home | Escala coordinada 950–1150; Home sube | Sin fusionar datos |
| P33 | y al final hasta homi responde a la misma idea con la q pensamos homeplus | Home centro | Home nativo + Homi en dock (escénico) / Home | Reintegra 950–1150 | Home 1650×900 ed.; sin chat gigante |
| P34 | no queremos que una familia tenga mas tecnologia que administrar | Calma | Home + chrome atenuado / info principal | Foco, no mutación | Sin ocultar módulos |
| P35 | que tenga que recordar menos cosas, | Recordar | Home + foco Educación Física / pendiente | Aproximación 600ms | Sin notificar ni completar |
| P36 | menos tiempo buscando cosas | Encontrar | Foco → Llevar autorización / otra info | Directo y corto | Sin navegación simulada |
| P37 | y menos preocupaciones en la cabeza | Todo en su lugar | Home completo estable / Home | Retira focos | Nada desaparece |
| P38 | el objetivo no es pasar mas tiempo dentro en homeplus es al reves | ENTREGA | Home puro + `data-homi-v6-ready` / Home | Sin moción; hold final | Sin popovers/Homi/propuestas; sin salida 3D (la hace el otro hilo) |

c = píxeles de canvas (master × 2/3). Evidencia por beat: `HomiV6Stage` (`case`), `BEAT_LABELS`, selectores `data-beat` en `homi-v6.css`.
