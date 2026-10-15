# S06 — Familia / Mapa / Feed

Visual authority: the repository embedded in `Transformar archivo en aplicación.make`,
commit `55133774df711b5f59c4bc9be96c8690eb19ca59` (already recovered outside the project).

Recovered: `screens/Familia.tsx` uses Familia / Mapa / Lugares, initial-based avatars,
white member rows, current place context, a simplified light map, floating initial
pins and an Ahora member sheet. `screens/Messages.tsx` provides household conversations,
author names, timestamps, white/terracotta surfaces and replies. There is **no standalone
Feed screen**; the reference calls that territory Mensajes. For the current script's
Feed block, the demo adapts those components into one household post, without inventing
a separate social network, message history or new primary tab.

Tomi, Colegio, Club, the one-hour training extension and the technician's exact question
come from the shared script. Mamá and Papá are generic existing household roles, not
additional named characters. Map positions are illustrative shared current context,
not real geography, live tracking, motion trails or a claim of availability.

The map is one persistent DOM surface. `FamilyMapStage` measures the product slot and
interpolates its rectangle to/from the expanded stage. Markers retain spatial positions.
The compact product view keeps Colegio, Club and Tomi, the shared people, and the
reference's current-context sheet. Family, map and feed are declarative and reversible.
