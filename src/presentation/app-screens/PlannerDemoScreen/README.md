# Planner demo — Stage 3

## Actual visual reference

The current app repository embedded in `referencias/Transformar archivo en aplicación.make`
(commit `55133774df711b5f59c4bc9be96c8690eb19ca59`) implements `CalendarioScreen`
in `src/screens/Calendario.tsx` with **Tareas / Eventos / Horarios**. Its product
directive calls Calendario the visible name and Planner the internal owner.
There is no implemented Planes screen in that snapshot.

Recovered visual patterns: the soft-track/white-pill `SegmentedControl`, pending
task rows with an empty circle and assignee/due label, weekly calendar with a
terracotta selected day, event rows, white cards, rounded corners and dividers.
Reuse the already recovered Home header, DM Sans font, colors, icons and navbar.

## Narrative adaptation

The shared script and Stage 3 brief explicitly require **Tareas / Calendario /
Planes**. These are the demo's visible tabs. The Planes surface is reconstructed
using the existing card/row language and the script's birthday/preparation
example; it is not a recovered product screenshot. All steps remain pending.
No completion percentages, event hours or extra family scenarios are invented.

The stage-visibility patch preserves the two completed school tasks from S04 in
Tareas, as confirmed by the user. The task grouping is now Completadas; the birthday
plan's three preparation steps remain pending. S05 has four states (0–3), with Planes
as its final state. The previous visually redundant fourth step is removed.

The calendar uses Monday 17 August 2026, tomorrow relative to frozen Home's
Sunday 16 August. Education Física keeps Juli's school context. Calendar week
labels match those dates; no appointment hour is assigned.

## Reuse and continuity

`PlannerDemoScreen` takes a selected `view`, task emphasis, a settled tab treatment,
and optional tasks/event/plan data. `PlannerPlans` can be reused for S08 later.
`HomePlannerSequence` keeps one mounted PhoneFrame and the exact Home exterior;
only the interior layers/panels crossfade. The scene adapter adds no external copy.

At projection scale, the selected mode also appears as the large internal screen
heading. Tabs, task titles, the event card and plan steps have stronger scale and
contrast; small calendar details remain contextual. The shared frame keeps the
48 px safe margins chosen by the user, with no physical jump at Home → Planner.
