### S08_step03
- `.inventory-workspace` client 282×410 scroll 294×410
- `.inventory-card` client 248×229 scroll 248×270  → overflow **+41px**
- `.inventory-shopping` client 248×66 @y=506.06 (card bottom edge y=492.38)

| # | product | meta | chip | row y-range | row h | title fs | meta fs | chip fs | visible? |
|---|---|---|---|---|---|---|---|---|---|
| 0 | **?** | Baño · 4 u | Bajo | 264–348 | 83.69 | — | 12px | 11px | yes |
| 1 | **?** | Heladera · 2 L | Bajo | 348–410 | 62.00 | — | 12px | 11px | yes |
| 2 | **?** | Cocina · 3 u | ⛔ NONE | 410–472 | 62.00 | — | 12px | — | yes |
| 3 | **?** | Alacena · 0 | Sin stock | 472–534 | 62.00 | — | 12px | 11px | ⛔ **CLIPPED — below the card box** |

Spotlighted rows (data-highlight="true"): 0 → 

### S08_step04
- `.inventory-workspace` client 282×410 scroll 294×410
- `.inventory-card` client 248×224 scroll 248×284  → overflow **+60px**
- `.inventory-shopping` client 248×70 @y=501.53 (card bottom edge y=487.38)

| # | product | meta | chip | row y-range | row h | title fs | meta fs | chip fs | visible? |
|---|---|---|---|---|---|---|---|---|---|
| 0 | **?** | Baño · 4 u | Bajo | 264–355 | 90.72 | — | 13.5px | 12px | yes |
| 1 | **?** | Heladera · 2 L | Bajo | 355–420 | 64.47 | — | 13.5px | 12px | yes |
| 2 | **?** | Cocina · 3 u | ⛔ NONE | 420–484 | 64.47 | — | 13.5px | — | yes |
| 3 | **?** | Alacena · 0 | Sin stock | 484–549 | 64.47 | — | 13.5px | 12px | ⛔ **CLIPPED — below the card box** |

Spotlighted rows (data-highlight="true"): 0 → 

## Narration coverage test for Scene C

- **S08_step03**
  - "qué tenemos" → fully-stocked rows visible: **1/1**
  - "qué se está terminando" (LOW) → visible: **2/2**
  - "qué necesitamos comprar" (OUT) → visible: **0/1**  ⛔ THE OUT-OF-STOCK ITEM IS BELOW THE CLIP

- **S08_step04**
  - "qué tenemos" → fully-stocked rows visible: **1/1**
  - "qué se está terminando" (LOW) → visible: **2/2**
  - "qué necesitamos comprar" (OUT) → visible: **0/1**  ⛔ THE OUT-OF-STOCK ITEM IS BELOW THE CLIP
