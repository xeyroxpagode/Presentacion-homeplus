# Home demo — Stage 2

Visual source: the current repository embedded in
`referencias/Transformar archivo en aplicación.make`, commit
`55133774df711b5f59c4bc9be96c8690eb19ca59`.

Recovered components: `src/screens/Home.tsx`, `src/components/Shell.tsx`,
`src/components/ui.tsx` and `src/index.css`. Preserve DM Sans, terracotta
`#C96B45`, light surfaces, household selector and initial-based avatar,
uppercase section labels, white row groups, subtle separators, empty task
circles and the five-icon floating bottom navigation with central create action.

The source has a date line, not a personalized greeting. Juli is identified
through the account avatar/name. Her authorization and school task use `Hoy`;
the tomorrow event uses the existing `Próximamente` section and date-leading row
pattern, supported by the product's Home directive. `Necesita atención` is
conditional in the source (overdue payments); this scene adds no payment data.

The three school-related entries come from the script and Stage 2 brief.
`Tarea de Matemática` is the brief's permitted example, not recovered app data.
All entries remain mounted. The stage-visibility patch adds declarative, reversible
task completion: authorization completes at S04.3 and the school task at S04.4.
Both remain legible with terracotta marks, a completed label and subtle strike-through.
Education Física stays an upcoming event and never receives a checkbox.
The completed tasks retain that state when entering Planner.
Navigation is a visual replica, not an implementation of the other modules.

DM Sans is served locally with its SIL Open Font License. It is scoped to this
screen so the frozen opening's typography is unaffected.

For projection, content titles are enlarged and active rows use a readable surface
change plus restrained scale. Confirmation feedback is finite and respects reduced
motion. Following the user's scale decision, the 300×620 frame and 48 px stage safe
margins remain unchanged; the scale increase is applied to the interface content.
