# 07 — SHARED-ELEMENT REGISTRY

**Issued:** Session 7 (Motion / Stagecraft / Timing), 2026-10-05.
**Purpose:** decide, for every candidate semantic object in the film, whether it is genuinely the *same* object across contexts, and therefore whether the handoff must be a `SHARED_ELEMENT`, or whether it must be `EDITORIAL` / `DEVICE_TRANSITION` / `REAL_NAV`.
**Method:** `MASTER §2.5` *"Cuando el mismo dato reaparece, debe ser el mismo objeto visual… No recrear versiones 'parecidas'."* read against `NO-UI §8` transition taxonomy, `06_FIGMA_VS_INTEGRATION.md §19.1` (which cross-module relations are real), and Session-7 runtime measurement of the current DOM.
**Authority note:** Product Truth remains above this file. Where a `real_nav_available = no` row appears, that is a capability fact, not a motion preference (`N-13`, `N-31`, `N-33`, `N-06`, `N-36`).

---

## 0. THE TEST APPLIED

A candidate qualifies as a shared element only if **all four** hold:

| # | Test | Fails ⇒ |
|---|---|---|
| 1 | It is the **same semantic datum**, not merely similar text | `EDITORIAL` |
| 2 | The audience could **recognise it as the same object** without a label | `EDITORIAL` |
| 3 | It survives the boundary in the current implementation | defect: `SHARED_ELEMENT` where `DEVICE_TRANSITION` is used |
| 4 | Product Truth permits the relation to be shown at all | do not show it |

**Nothing in this registry is a licence to fake a tap.** `MASTER:34` — *"No se deben fingir navegaciones o features inexistentes."*

---

## 1. REGISTRY

### SE-01 — `physical.heladera` (the fridge)

| Field | Value |
|---|---|
| **semantic_id** | `physical.heladera` |
| **first_appearance** | `S01_step08` — warranty chat bubble *"Se rompió la heladera. ¿Dónde está la garantía?"* (596×138) |
| **later_appearance** | `S10_step00` Assets list row `Heladera · Cocina`; `S18` closing object `centre-lower` |
| **same_semantic_object?** | **yes** — one household object, three framings |
| **current_identity_preserved?** | **no** — three different visual objects (a chat bubble, a list row, nothing). Session 3 `E-09`: three Assets rows are absent from the target dataset and **never recur** |
| **target_transition** | `SHARED_ELEMENT` (Scene A → Scene J only) · `EDITORIAL` (Scene A → Scene E) |
| **source_geometry** | chat bubble 596×138, rotated −6° |
| **destination_geometry** | `S18` closing object, much air, no rotation |
| **copy / data identity** | `se rompió la heladera` / `la heladera se puede romper` — same datum, same household |
| **ownership** | physical household; **not** a product entity until Assets exists |
| **product_relation** | Assets target (frozen V2.0); **not implemented** in Integration |
| **real_nav_available** | **no** |
| **presentation_family** | `EDITORIAL` |
| **notes** | `N-25`: the script's closing `heladera` **does** have an opening antecedent. It is the only one of the three closing objects that does. **No asset exists today** — must be produced. Do not re-tone the opening bubble; do not draw a new fridge in Scene J. |

### SE-02 — `physical.insurance` (the auto-insurance document)

| Field | Value |
|---|---|
| **semantic_id** | `physical.insurance` |
| **first_appearance** | `S01_step01` — `insurance-document.svg`, 304 px, `FACTURA` eyebrow 18 px, `Seguro del auto` 38 px, −6° rotation |
| **later_appearance** | `S10_step02` Assets documents (`Factura`) · `S10_step03` HomeCloud documents · `S18` closing object |
| **same_semantic_object?** | **yes** for the object · **NO** for `Factura` in HomeCloud |
| **current_identity_preserved?** | **no** — Session 3 `E-03` (`HIGH`): *"Factura missing from the Assets detail and appearing in HomeCloud as `Factura TV`, an unrelated object."* |
| **target_transition** | `SHARED_ELEMENT` (S10 Assets → S10 HomeCloud, same scene) · `EDITORIAL` (Scene A → Scene E) |
| **source_geometry** | 304 px paper, −6° |
| **destination_geometry** | must be the **same object**, same rotation, same size, at the destination scale |
| **copy / data identity** | `Seguro del auto` — the only correct identity |
| **ownership** | physical document + its digital file |
| **product_relation** | Assets owns the record; HomeCloud owns the canonical File (`ASSETS_V2:360-370`) |
| **real_nav_available** | **partially** — `Asset → HomeCloud Files` is a real generic nav in Figma but with **no id**; no data link in Integration |
| **presentation_family** | `EDITORIAL` until the cross-module link closes (`N-31`, `MASTER:237`) |
| **notes** | **Strongest candidate in the film.** It already exists as a designed asset (`A-P2`: *"Keep the design"*) and it already appears twice in Scene E. Only the identity is broken. `MASTER §2.5` lists it explicitly. |

### SE-03 — `physical.bolsa` (the grocery bag)

| Field | Value |
|---|---|
| **semantic_id** | `physical.bolsa` |
| **first_appearance** | `S01_step02` — `grocery-bag.svg`, 290 px |
| **later_appearance** | `S08` Inventory LOW/OUT rows · `S18` closing object |
| **same_semantic_object?** | **yes** |
| **current_identity_preserved?** | **no** — replaced, not dimmed (`A-06`) |
| **target_transition** | `SHARED_ELEMENT` |
| **source_geometry** | 290 px bag |
| **destination_geometry** | closing object position |
| **copy / data identity** | `papa cree que el hijo ya hizo las compras` → the Inventory need |
| **ownership** | physical household object |
| **product_relation** | Inventory is an approved product target; **Shopping List is excluded** (`N-06`) |
| **real_nav_available** | **no** for anything Shopping-List-shaped |
| **presentation_family** | `EDITORIAL` |
| **notes** | The bag is the **physical** anchor for the Inventory beat and is the safe way to show "what is missing" **without** implying a Shopping List. Use it instead of the forbidden teaser. |

### SE-04 — `message.old_household` (the old household message)

| Field | Value |
|---|---|
| **semantic_id** | `message.old_household` |
| **first_appearance** | **does not exist.** `MASTER:131` mandates it; `A-03` (`BLOCKER`) removed it. Today Scene A shows six third-party brand logos instead |
| **later_appearance** | `S18` invisible-work ghost (`J-06` `HIGH`) |
| **same_semantic_object?** | **yes, by mandate** — `MASTER:131` and `MASTER §2.5` |
| **current_identity_preserved?** | **no — it was never created** |
| **target_transition** | `SHARED_ELEMENT` |
| **source_geometry** | Scene A bubble layer: `#201B17` surface, `#44382E` border, `#F5F1EB` text, 30 px / 450 / −0.8 px, 22 px radius + 7 px tail, `0 12px 32px rgb(0 0 0/.16)` |
| **destination_geometry** | `S18` ghost at 25–35 % |
| **copy / data identity** | `MASTER:132` — `Ma ❤️: Esta semana lo busco yo a Tomi.` |
| **ownership** | household conversation; **not** a Feed surface |
| **product_relation** | Feed is approved Product Truth (`N-36`) but Conversation is **not** its route |
| **real_nav_available** | **no** |
| **presentation_family** | `EDITORIAL` |
| **notes** | **This is the root of the whole closing's weakness.** The closing's invisible-work argument has no antecedent because Scene A deleted it. Fixing `A-03` is a precondition for `J-06`. KEEP the bubble layer's palette and type verbatim (`A-P4`). |

### SE-05 — `message.technician` (the technician post)

| Field | Value |
|---|---|
| **semantic_id** | `message.technician` |
| **first_appearance** | `S06_step05` — single mock article, `El técnico viene entre las cuatro y las seis. ¿Quién puede estar?` |
| **later_appearance** | `S07` synthesis callback (master `B7`) · `S18` invisible-work ghost |
| **same_semantic_object?** | **yes** |
| **current_identity_preserved?** | **no** — `B-16` (`HIGH`): no thread, no replies, no way back, `isDemo` stub |
| **target_transition** | `EDITORIAL` (Scene B) → `SHARED_ELEMENT` (Scene B → Scene J) |
| **source_geometry** | one article, shell at 0.55 |
| **destination_geometry** | `S18` ghost at 25–35 % |
| **copy / data identity** | `FEED_PRODUCT_FREEZE_V1.0:232` — the copy is **SAFE TO SHOW** |
| **ownership** | household conversation |
| **product_relation** | Feed semantics; approved capability, visual-target gap, implementation gap |
| **real_nav_available** | **no** |
| **presentation_family** | `EDITORIAL` — never labelled "the Feed" (`N-36`, `N-39`) |
| **notes** | The only household message in the film that is **canon-accurate** and survives `N-36`. It is therefore the right anchor for the Scene B → Scene J invisible-work bridge. |

### SE-06 — `birthday.event` (the birthday Plan and its Event)

| Field | Value |
|---|---|
| **semantic_id** | `birthday.event` |
| **first_appearance** | `S05_step03` Planner → Planes, `Cumpleaños · Sábado · 3 pasos pendientes` |
| **later_appearance** | `S08_step00` Plan detail · `S10_step04` HomeCloud memory · `S18` |
| **same_semantic_object?** | **yes** |
| **current_identity_preserved?** | **partial** — `C-07` (`MEDIUM`): *"the Plan card has no Event identity: no time, no owner, no relation to the Event the narration names"* |
| **target_transition** | `REAL_NAV` (Plan → Task) + `SHARED_ELEMENT` (Plan → Scene C) |
| **source_geometry** | Planner Plan card 248×96 |
| **destination_geometry** | `S08` Plan card, same object |
| **copy / data identity** | `Cumpleaños` · `Sábado` · **`19:00`** (`NO_UI:1265` and `:1284`, twice) |
| **ownership** | Planner |
| **product_relation** | Plan → Task is the **only** cross-module relation that is both real nav and real data (`06 §19.1`) |
| **real_nav_available** | **partially** — Plan → Task yes; Event → Plan and Task → Event **no** |
| **presentation_family** | `SHARED_ELEMENT` |
| **notes** | `N-23` is binding: `19:00` is **valid canon**. Product Truth sets no time restriction (`202606210003_schedules.sql:14-17`); Integration's `TimePickerSheet` offers 0–23 h. **The Figma picker gap must not rewrite the canon.** The Event must carry `19:00` so Scene I has a referent. |

### SE-07 — `inventory.missing_item` (the LOW/OUT item)

| Field | Value |
|---|---|
| **semantic_id** | `inventory.missing_item` |
| **first_appearance** | `S08_step01` bridge task `Comprar lo que falta` at exposure 1.00 on brand-soft |
| **later_appearance** | `S08_step03` Inventory `Café · Alacena · 0 · Sin stock` — **clipped out of the device in every state** |
| **same_semantic_object?** | **yes** |
| **current_identity_preserved?** | **no** — `C-04` (`HIGH`): a 480 px device slide with no extraction, and `C-01` (`BLOCKER`): the item is clipped so it is never visible |
| **target_transition** | `SHARED_ELEMENT` |
| **source_geometry** | the bridge task row, `248×62`, exposure 1.00 |
| **destination_geometry** | the first Inventory row, same width, same type size, arriving from the source position |
| **copy / data identity** | one datum, one object |
| **ownership** | Inventory |
| **product_relation** | approved chain: `LOW/OUT → Restock Need PENDING → approval → canonical Planner Task` |
| **real_nav_available** | **no** for Plan → Inventory; **data-link only** (invisible) for Inventory → Planner Task |
| **presentation_family** | `SHARED_ELEMENT` |
| **notes** | `N-06` is binding: **no Shopping List**. The extraction must land on the approved chain, never on a shopping list. `SI-18` (spoken *"lista de compras"*) is a SCRIPT ISSUE, owner = script owner. |

### SE-08 — `finance.supermarket_movement` (the ledger fact)

| Field | Value |
|---|---|
| **semantic_id** | `finance.supermarket_movement` |
| **first_appearance** | `S09` Movimientos — `Supermercado · $48.720` |
| **later_appearance** | `S16` Homi Finance grounding (15 spoken lines, currently absent) |
| **same_semantic_object?** | **yes** |
| **current_identity_preserved?** | **no — it does not exist yet.** `G-05` (`BLOCKER`): the one concrete transaction of the block is absent; `D-03`: Movimientos has no state |
| **target_transition** | `SHARED_ELEMENT` |
| **source_geometry** | a Finance movement row |
| **destination_geometry** | the same row, inside the Finance surface Homi answers from |
| **copy / data identity** | `Supermercado $48.720` (`N-22` canon) |
| **ownership** | **Finance** (`ASSETS_V2:347-349`: Finance owns amount, currency, date, category) |
| **product_relation** | Finance is the **only** module safe to show without caveat (`06 §30.1` rule 4) |
| **real_nav_available** | **yes, intra-module** — Payment → Movement is real (`06 §19.1`) |
| **presentation_family** | `REAL_NAV` intra-Finance · `SHARED_ELEMENT` across scenes |
| **notes** | `N-32` is binding: the row is a **quiet ledger fact already present**, never the visible result of a purchase the audience just watched. `N-22` fixes the dataset. `I-06` (`BLOCKER`) is the absent Scene I beat this object would carry. |

### SE-09 — `finance.ps5_movement` (the PS5 expense)

| Field | Value |
|---|---|
| **semantic_id** | `finance.ps5_movement` |
| **first_appearance** | **does not exist.** `D-09` (`BLOCKER`): *"No PS5 movement exists; D to E is a cross-mount."* |
| **later_appearance** | `S10` Assets `PlayStation 5` |
| **same_semantic_object?** | **yes** |
| **current_identity_preserved?** | **no — absent** |
| **target_transition** | `SHARED_ELEMENT` |
| **source_geometry** | a typed `EXPENSE` row in Movimientos |
| **destination_geometry** | the Asset identity panel |
| **copy / data identity** | `PlayStation 5 · Mar 2024 · $580.000` (`N-22`) |
| **ownership** | **Finance** for money and date; **Assets** for identity |
| **product_relation** | `ASSETS_V2:347` — *"Assets nunca conserva una segunda verdad monetaria."* `:886` — maintenance is Planner-owned |
| **real_nav_available** | **no** in Integration (direction is inverted in Figma only) |
| **presentation_family** | `SHARED_ELEMENT` |
| **notes** | `N-37` is binding and decisive: `Mar 2024 · $580.000` may appear **only** as a Finance movement. It may **not** appear on the Asset card. Session 3 already got the extraction-vs-field distinction right; Session 7 confirms the motion must be an **extraction of the movement row**, not a field appearing on a card. |

### SE-10 — `asset.ps5.documents` (the warranty and the manual)

| Field | Value |
|---|---|
| **semantic_id** | `asset.ps5.documents` |
| **first_appearance** | `S10_step02` Assets detail — `Garantía PlayStation 5` (267.8×86.5) and `Manual PS5` (267.8×63.5) |
| **later_appearance** | `S10_step03` HomeCloud Documentos — the same two rows at **different y** |
| **same_semantic_object?** | **yes** |
| **current_identity_preserved?** | **no — measured.** `E-10`: `Garantía` at `y 202.4` in Assets vs `y 210.2` in HomeCloud; `Manual` at `y 288.9` vs `y 297.2`. Both rows are **separate DOM instances** in **both** layers, pre-laid-out at the destination x. A naive same-row read fails on the +7.8 px offset |
| **target_transition** | `SHARED_ELEMENT` |
| **source_geometry** | Assets detail, x 266.1 |
| **destination_geometry** | **same y, same width, same type size** — a real extraction, not a lookalike |
| **copy / data identity** | `Garantía PlayStation 5` · `Manual PS5` · `PDF · HomeCloud` |
| **ownership** | Assets owns the record; HomeCloud owns the canonical File |
| **product_relation** | relation **approved**; link **not closed** |
| **real_nav_available** | **no** (`push('homecloud')` with no id) |
| **presentation_family** | `EDITORIAL` until Integration exists (`N-31`) |
| **notes** | `MASTER E3`'s own prescription is *"Assets baja; Documentos permanece"* — the current transition does the opposite. The two instances at different y are the mechanical proof that identity is not preserved. |

### SE-11 — `warranty.ps5` (the warranty record itself)

| Field | Value |
|---|---|
| **semantic_id** | `warranty.ps5` |
| **first_appearance** | `S01_step08` as a *question* (*"¿Dónde está la garantía?"*) |
| **later_appearance** | `S10_step02` as a *document* · `S10_step04` isolated on one side of the warranty-vs-memory composition |
| **same_semantic_object?** | **yes** — the same warranty, from anxiety to archive |
| **current_identity_preserved?** | **no** |
| **target_transition** | `SHARED_ELEMENT` |
| **source_geometry** | chat bubble 596×138 |
| **destination_geometry** | an isolated document object at 0.55–0.60 |
| **copy / data identity** | `Garantía PlayStation 5` |
| **ownership** | **the only genuine Asset-owned field** (`ASSETS_V2:266`) |
| **product_relation** | Assets target approved, not implemented |
| **real_nav_available** | **no** |
| **presentation_family** | `EDITORIAL` |
| **notes** | `E-04` (`BLOCKER`): the warranty-vs-memory thesis has **no available state**. Session 7 adds two states to Scene E to house it. `MASTER E9` prescribes the exact composition. **Never write "documentos vs recuerdos" on stage** (`MASTER E9`) — that absence is currently a positive and must stay a positive. |

### SE-12 — `birthday.memory` (the birthday album / photo)

| Field | Value |
|---|---|
| **semantic_id** | `birthday.memory` |
| **first_appearance** | `S08` — the birthday Plan (the event that will produce the memory) |
| **later_appearance** | `S10_step04` HomeCloud Recuerdos `Cumpleaños · 20 ago` — **on the wrong date** and never opened |
| **same_semantic_object?** | **yes** |
| **current_identity_preserved?** | **no** — `E-08` (`MEDIUM`): wrong date, never named, album never entered (`E-07`) |
| **target_transition** | `SHARED_ELEMENT` |
| **source_geometry** | `birthday.event` |
| **destination_geometry** | the birthday album, correct date, opened |
| **copy / data identity** | `Cumpleaños` · correct date (`Sábado`, `19:00`) |
| **ownership** | HomeCloud |
| **product_relation** | Plan/Event → HomeCloud Memories: **NEITHER** real nav nor real data (`06 §19.1`) |
| **real_nav_available** | **no** |
| **presentation_family** | `EDITORIAL` |
| **notes** | `E-05` (`HIGH`): the photo cards are **CSS gradients used as stand-ins**, which the product freeze forbids. Must be real imagery or a real memory surface. This object is the visual half of the Scene E thesis. |

### SE-13 — `person.juli` / `person.tomi` / `person.mama` / `person.papa`

| Field | Value |
|---|---|
| **semantic_id** | `person.{juli,tomi,mama,papa}` |
| **first_appearance** | `S01` chaos bubbles (household register, no names) → `S02_step05` family-center |
| **later_appearance** | `S04` Juli's account row · `S06` member cards · `S15-S17` Homi personas · `S18` family |
| **same_semantic_object?** | **yes** — `MASTER:137` mandates all four |
| **current_identity_preserved?** | **no** — no avatar, no colour, no scale anywhere in Scenes A–B; `B-17` (`MEDIUM`): Familia lists 3 of 4 |
| **target_transition** | `SHARED_ELEMENT` throughout |
| **source_geometry** | Scene A has **no** people at all. Scene B has one 50 px avatar and two 36 px |
| **destination_geometry** | the four inside the house at `S18`, **and they never move again** |
| **copy / data identity** | Juli (10) · Tomi (16) · Mamá · Papá — `MASTER §5 A9` fixes the ages |
| **ownership** | household |
| **product_relation** | `family-avatars.svg` exists (1310 B, 284×100, four avatars at fixed relative positions) |
| **real_nav_available** | n/a — this is not a navigation object |
| **presentation_family** | `SHARED_ELEMENT` |
| **notes** | **`OPEN-8` is a real motion blocker.** One 1310-byte composed asset with four avatars at fixed relative positions cannot support the absolute scales `105 → 110 → 115 %` that `MASTER §2.6` and `NO-UI §6` require. Either the four must become independently scalable elements, or the scales are impossible. **Session 7 cannot decide this — it is a build decision.** But it must be surfaced before Session 8 plans Scene A. |

### SE-14 — `question.what_is_left_for_tomorrow` (the closing question)

| Field | Value |
|---|---|
| **semantic_id** | `question.what_is_left_for_tomorrow` |
| **first_appearance** | `S16_step01` — `¿Qué tengo que hacer hoy?` inside the Homi bubble (box `777,187,238,81`) |
| **later_appearance** | `S17` · `S18` |
| **same_semantic_object?** | **yes** for the question · **NO** for the Scene J philosophy line |
| **current_identity_preserved?** | **yes, byte-identical across the three personas** — Session 5 positive #4, **confirmed at runtime this session** |
| **target_transition** | `SHARED_ELEMENT` |
| **source_geometry** | `777,187,238,81` |
| **destination_geometry** | **extracted above** the three-device row at 56 px |
| **copy / data identity** | `MASTER:138` mandates `¿Qué me queda para mañana?` |
| **ownership** | Homi |
| **product_relation** | Homi is a **concept / intended capability**, not verified current implementation (`N-21`) |
| **real_nav_available** | n/a |
| **presentation_family** | `SHARED_ELEMENT` |
| **notes** | `I-03` (`BLOCKER`): the on-stage question says **`hoy`** while script, master and the whole thesis say **`mañana`**. The bubble invariance is a genuine positive; the **wording** is a blocker. Fixing the wording does not require touching the motion. |

### SE-15 — `barrier.question` → `homi.name` — **REJECTED**

| Field | Value |
|---|---|
| **semantic_id** | `barrier.question` ↔ `homi.name` |
| **first_appearance** | `S14_step04` `¿Y si ni siquiera tuviéramos que saber cómo?` |
| **later_appearance** | `S15_step00` `Homi` |
| **same_semantic_object?** | **NO** |
| **current_identity_preserved?** | n/a |
| **target_transition** | `EDITORIAL` |
| **presentation_family** | `EDITORIAL` |
| **notes** | **Recorded as a deliberate NEGATIVE entry.** They are adjacent and they answer each other, but a question and an assistant name are **different semantic objects**. Forcing a shared element here would be exactly the *"versiones parecidas"* that `MASTER:140` forbids. The honest transition is a **black reset** followed by the name alone. **Do not build a shared element here.** |

---

## 2. SUMMARY

| # | semantic_id | same object? | identity preserved today? | target family | real nav? |
|---|---|---|---|---|---|
| SE-01 | `physical.heladera` | yes | **no** | `EDITORIAL` | no |
| SE-02 | `physical.insurance` | yes | **no** (`Factura TV`) | `EDITORIAL` | partial |
| SE-03 | `physical.bolsa` | yes | **no** | `EDITORIAL` | no |
| SE-04 | `message.old_household` | yes (by mandate) | **never created** | `SHARED_ELEMENT` | no |
| SE-05 | `message.technician` | yes | **no** | `EDITORIAL` → `SHARED_ELEMENT` | no |
| SE-06 | `birthday.event` | yes | partial | `SHARED_ELEMENT` | partial |
| SE-07 | `inventory.missing_item` | yes | **no** | `SHARED_ELEMENT` | no |
| SE-08 | `finance.supermarket_movement` | yes | **absent** | `REAL_NAV` / `SHARED_ELEMENT` | yes (intra-module) |
| SE-09 | `finance.ps5_movement` | yes | **absent** | `SHARED_ELEMENT` | no |
| SE-10 | `asset.ps5.documents` | yes | **no** (two instances, +7.8 px) | `SHARED_ELEMENT` | no |
| SE-11 | `warranty.ps5` | yes | **no** | `SHARED_ELEMENT` | no |
| SE-12 | `birthday.memory` | yes | **no** (wrong date) | `SHARED_ELEMENT` | no |
| SE-13 | `person.*` (×4) | yes | **no** | `SHARED_ELEMENT` | n/a |
| SE-14 | `question.what_is_left_for_tomorrow` | yes | **YES — keep** | `SHARED_ELEMENT` | n/a |
| SE-15 | `barrier.question` ↔ `homi.name` | **NO** | n/a | `EDITORIAL` (rejected) | n/a |

**Counts:** 15 candidates investigated · **12 qualify** as shared elements · **1 is currently preserved correctly** (SE-14) · **1 is explicitly rejected** (SE-15) · **1 is blocked by a build decision** (SE-13, `OPEN-8`).

**Zero of the 12 are currently preserved across a scene or module boundary.** Session 3 reached the same conclusion from the narrative side (*"Every boundary in this session is a DEVICE_TRANSITION where the master asked for a SHARED_ELEMENT"*). Session 7 confirms it from the motion side with runtime measurement: the two transitions that *should* be extractions (`S08_step02→03`, `S10_step02→03`) are 480 px device slides with pre-laid-out destination instances.

---

## 3. WHAT THIS REGISTRY DOES **NOT** CLAIM

- It does **not** claim any new Product Truth.
- It does **not** authorise a single fake tap. Every row with `real_nav_available = no` is `EDITORIAL` or `SHARED_ELEMENT` by rule, never `REAL_NAV`.
- It does **not** resolve `CF-08` (Map ETA). Map pins are **illustrative positions, not geography** (`N-30`); there is no shared map datum to carry.
- It does **not** resolve `CF-20` / `J-04` (closing object vocabulary). SE-01/02/03 use only objects the **opening actually established**, per `N-25`. The script's `mochila` has no antecedent and remains a SCRIPT ISSUE with a named owner.
- It does **not** decide `OPEN-8` (whether the four avatars can be independently scaled). It records that the question blocks `MASTER §2.6`'s absolute scales and therefore blocks Scene A's target choreography.

---

**END OF SHARED-ELEMENT REGISTRY**