# 10_IMPLEMENTATION_RISK_REGISTER

Purpose: protect implementation from intelligent but incorrect shortcuts. Every risk below is a STOP-aware implementation contract. The consultant uses this file when reviewing OpenCode output.

# RISK `IR-01`

SEVERITY:
CRITICAL

PHASE:
1

BEATS:
All 111

DEPENDENCIES:
`ARCH-01`, `Presentation.tsx`, `scene-layer`, `shared-layer`, `veil-layer`.

EXPECTED MECHANISM:
Permanent scene mounting. `.presentation-canvas` has exactly three permanent children. All 18 scenes remain mounted.

FAILURE MODE:
Scenes remount on navigation or are keyed by current slide.

WHY IT MATTERS:
Shared-element destination geometry and exact reverse restoration depend on live, stable scene subtrees.

FORBIDDEN IMPLEMENTATIONS:
- `key={slideIndex}` or equivalent scene remount.
- Rendering only the active scene.
- Measuring geometry from authored constants.

SAFE FALLBACK:
Stop and implement the mount contract before any scene work.

STOP CONDITION:
Any scene unmounts during forward or backward walk.

MANDATORY TESTS:
`T-RC20-01`, full forward/backward mount census.

PASS:
18 scenes mounted, 0 unmount events, one active scene at every settled beat.

FAIL:
Any remount, missing scene, or extra layer child.

EVIDENCE REQUIRED:
DOM census transcript and file diff.

# RISK `IR-02`

SEVERITY:
CRITICAL

PHASE:
1

BEATS:
All shared crossings.

DEPENDENCIES:
Scene lifecycle.

EXPECTED MECHANISM:
Exactly three lifecycle states: `DORMANT`, `MEASUREMENT_READY`, `ACTIVE`.

FAILURE MODE:
Single inactive style used for all non-current scenes.

WHY IT MATTERS:
`DORMANT` is not measurable; `MEASUREMENT_READY` exists solely for live geometry before flight.

FORBIDDEN IMPLEMENTATIONS:
- Measuring a `DORMANT` destination.
- Leaving any scene `MEASUREMENT_READY` at rest.
- Using `display:none` for mounted scenes.

SAFE FALLBACK:
Block shared transitions until lifecycle tests pass.

STOP CONDITION:
Any stable beat has 0 or more than 1 `ACTIVE`, or any `MEASUREMENT_READY`.

MANDATORY TESTS:
`T-RC20-02`, `T-MSR-01` through `T-MSR-08`.

PASS:
Lifecycle census matches contract on all 111 beats.

FAIL:
Any illegal transition or lingering transient state.

EVIDENCE REQUIRED:
Lifecycle table from real browser.

# RISK `IR-03`

SEVERITY:
CRITICAL

PHASE:
1, 8

BEATS:
All shared crossings, especially I06.

DEPENDENCIES:
Destination slots, layout-ready signal.

EXPECTED MECHANISM:
Destination geometry is measured live with `getBoundingClientRect()` after the destination commits in `MEASUREMENT_READY`.

FAILURE MODE:
Authored coordinates, zero rects, stale rects, or guessed positions.

WHY IT MATTERS:
A shared element is only believable if it lands exactly into the real destination.

FORBIDDEN IMPLEMENTATIONS:
- `start_geometry` / `end_geometry` as coordinates.
- Silent fallback to crossfade.
- `setTimeout` as layout-ready signal.

SAFE FALLBACK:
Throw/block on degenerate geometry.

STOP CONDITION:
Target slot null, zero-sized, non-finite, or outside canvas.

MANDATORY TESTS:
`T-MSR-01`, `T-MSR-02`.

PASS:
Two consecutive frames produce valid stable rects.

FAIL:
Any authored or guessed destination.

EVIDENCE REQUIRED:
Rect logs per crossing.

# RISK `IR-04`

SEVERITY:
CRITICAL

PHASE:
1, 8

BEATS:
All shared-element flights.

DEPENDENCIES:
`shared-layer`, z-index 2.

EXPECTED MECHANISM:
Single React-managed `shared-layer` usually empty; airborne objects only during flight.

FAILURE MODE:
Shared objects live in ad hoc overlays or remain in `shared-layer` at rest.

WHY IT MATTERS:
Ownership cleanup is the difference between exact identity and visual duplication.

FORBIDDEN IMPLEMENTATIONS:
- Per-scene shared overlays.
- Multiple shared layers.
- Leaving nodes or held `Animation` objects in `shared-layer`.

SAFE FALLBACK:
Abort flight, reattach to origin, clear layer.

STOP CONDITION:
`shared-layer` has children at a settled beat.

MANDATORY TESTS:
`T-MSR-05`, `T-ENG-10`.

PASS:
0 children and 0 held animations at every settled state.

FAIL:
Any orphan node or animation.

EVIDENCE REQUIRED:
DOM and animation census.

# RISK `IR-05`

SEVERITY:
CRITICAL

PHASE:
1, 8

BEATS:
All semantic shared objects.

DEPENDENCIES:
Shared-element registry.

EXPECTED MECHANISM:
One semantic object instance at every sampled instant.

FAILURE MODE:
Source and destination both render lookalikes during flight.

WHY IT MATTERS:
The film's core thesis depends on continuity of meaning, not similar drawings.

FORBIDDEN IMPLEMENTATIONS:
- Clone-and-crossfade.
- Snapshot animation.
- Duplicate semantic ids.

SAFE FALLBACK:
Use real DOM reparenting or block.

STOP CONDITION:
Two nodes carry the same semantic id during a flight.

MANDATORY TESTS:
`T-SEM-*`, `T-MSR-04`.

PASS:
Exactly one node exists at 0, mid, and settled samples.

FAIL:
Any duplicate, lookalike, or identity loss.

EVIDENCE REQUIRED:
Semantic id census and screenshots.

# RISK `IR-06`

SEVERITY:
CRITICAL

PHASE:
1

BEATS:
Shared crossings.

DEPENDENCIES:
WAAPI FLIP, DOM slots.

EXPECTED MECHANISM:
Real DOM reparenting with `appendChild` of the live node.

FAILURE MODE:
FLIP is simulated with clone nodes.

WHY IT MATTERS:
ArrowLeft and Escape exact restoration rely on moving the real node.

FORBIDDEN IMPLEMENTATIONS:
- GSAP Flip dependency.
- View Transitions snapshots.
- Clone-based FLIP.

SAFE FALLBACK:
Block until reparenting is implemented.

STOP CONDITION:
Flight uses a second element for the moving object.

MANDATORY TESTS:
`T-SEM-01` through `T-SEM-18`.

PASS:
One live node reparented out and back.

FAIL:
Any clone or snapshot.

EVIDENCE REQUIRED:
DOM trace with node identity.

# RISK `IR-07`

SEVERITY:
HIGH

PHASE:
1, 9, 11

BEATS:
All 31 `AUTO_MICROSEQUENCE` beats.

DEPENDENCIES:
`cancelFlight()`, `Microsequence`.

EXPECTED MECHANISM:
Cancellation cancels all animations, reattaches shared object to origin, clears lifecycle, and restores `lastManual`.

FAILURE MODE:
Mid-flight ArrowLeft/Escape leaves object airborne or destination half-active.

WHY IT MATTERS:
Live presentations invite interruptions.

FORBIDDEN IMPLEMENTATIONS:
- `reverse(); finish(); cancel()`.
- State revert before reattachment.
- Finally block without lifecycle release.

SAFE FALLBACK:
Hard block on failed cancellation test.

STOP CONDITION:
Any orphan after cancel.

MANDATORY TESTS:
`T-BAK-05`, `T-MSR-06`, `T-MSR-07`, `T-NAV-06`.

PASS:
0 orphans, 0 residual transforms.

FAIL:
Any detached object or stale lifecycle.

EVIDENCE REQUIRED:
Interruption transcript for each AUTO beat.

# RISK `IR-08`

SEVERITY:
HIGH

PHASE:
1, 9

BEATS:
All transitions.

DEPENDENCIES:
WAAPI terminal handling.

EXPECTED MECHANISM:
Deterministic settle: committed state owned by scene data, not by retained animation fill.

FAILURE MODE:
Visual state depends on unfinished or retained animation object.

WHY IT MATTERS:
Backward navigation and long-run stability fail if animation state is the source of truth.

FORBIDDEN IMPLEMENTATIONS:
- Resting UI held by `fill:'forwards'`.
- Residual inline transform at rest.
- Animation object retained at settled beat.

SAFE FALLBACK:
Commit final scene state, cancel animation, clear inline transform.

STOP CONDITION:
Any running/held animation at rest.

MANDATORY TESTS:
`T-ENG-03`, `T-ENG-10`, `T-BAK-06`.

PASS:
0 running animations, 0 residual inline transforms.

FAIL:
Any retained motion object.

EVIDENCE REQUIRED:
`document.getAnimations()` census.

# RISK `IR-09`

SEVERITY:
HIGH

PHASE:
1

BEATS:
Shared-element flights only.

DEPENDENCIES:
WAAPI options.

EXPECTED MECHANISM:
`fill:'forwards'` only during a shared flight while the object has no resting scene owner, followed by replace/cancel/clear.

FAILURE MODE:
`fill:'forwards'` is used on resting stage elements.

WHY IT MATTERS:
It hides missing state ownership and creates stale visuals.

FORBIDDEN IMPLEMENTATIONS:
- `fill:'forwards'` on anything that stays on stage.
- Clearing transform before `replaceWith`.

SAFE FALLBACK:
Use scene state for final visual.

STOP CONDITION:
Any resting animation uses fill forwards.

MANDATORY TESTS:
`T-PER-04`, `T-ENG-10`.

PASS:
Exception only exists in shared flight implementation.

FAIL:
Any other usage.

EVIDENCE REQUIRED:
Search output and runtime animation census.

# RISK `IR-10`

SEVERITY:
HIGH

PHASE:
1, 9

BEATS:
All forward/backward walks.

DEPENDENCIES:
Cleanup in every terminal path.

EXPECTED MECHANISM:
Every transform applied by a sequence is cleared on settle/cancel.

FAILURE MODE:
Hidden subtree keeps inline transform.

WHY IT MATTERS:
Next measurement reads polluted geometry.

FORBIDDEN IMPLEMENTATIONS:
- Inline transform as persistent layout.
- Hidden scene transform residue.

SAFE FALLBACK:
Centralized cleanup utility plus assertion.

STOP CONDITION:
Any hidden subtree has residual transform.

MANDATORY TESTS:
`T-BAK-06`.

PASS:
0 residual transforms forward and backward.

FAIL:
Any residual transform.

EVIDENCE REQUIRED:
Hidden-subtree transform census.

# RISK `IR-11`

SEVERITY:
HIGH

PHASE:
1, 9, 11

BEATS:
12 protected `HOLD`: A01 A06 A07 A12 B20 B21 F01 H05 I06 J01 J07 J14.

DEPENDENCIES:
Pure `navigate(state, action, deck, now)`.

EXPECTED MECHANISM:
600 ms guard on arrival; early NEXT returns identical state object.

FAILURE MODE:
Key mash skips a protected hold.

WHY IT MATTERS:
The speaker needs stable breath beats.

FORBIDDEN IMPLEMENTATIONS:
- Permanent no-op hold.
- Timer-based auto-advance.
- `Date.now()` inside reducer.

SAFE FALLBACK:
Block Phase 1 gate.

STOP CONDITION:
Any protected hold advances before guard expiry.

MANDATORY TESTS:
`T-NAV-01`, `T-NAV-02`, `T-NAV-03`.

PASS:
50 ms press no-ops; 700 ms press advances exactly once.

FAIL:
Skip, drift, or timer.

EVIDENCE REQUIRED:
Fake-clock unit tests and browser mash transcript.

# RISK `IR-12`

SEVERITY:
MEDIUM

PHASE:
1

BEATS:
All beats.

DEPENDENCIES:
Existing keyboard handling.

EXPECTED MECHANISM:
Preserve key-repeat suppression.

FAILURE MODE:
Holding ArrowRight floods navigation.

WHY IT MATTERS:
The live clicker can repeat inputs.

FORBIDDEN IMPLEMENTATIONS:
- Removing `if (!event.repeat)`.
- Treating repeat events as queueable advances.

SAFE FALLBACK:
Restore repeat filter and test.

STOP CONDITION:
Any repeated key produces multiple advances.

MANDATORY TESTS:
`T-NAV-01`.

PASS:
Held key does not skip protected holds.

FAIL:
Runaway navigation.

EVIDENCE REQUIRED:
30 s held-key transcript.

# RISK `IR-13`

SEVERITY:
HIGH

PHASE:
1, 11

BEATS:
31 AUTO beats.

DEPENDENCIES:
`queuedAdvance`.

EXPECTED MECHANISM:
At most one advance queues during a flight and is consumed only after settle.

FAILURE MODE:
Multiple queued advances skip stable states.

WHY IT MATTERS:
Fast presenters should not corrupt the sequence.

FORBIDDEN IMPLEMENTATIONS:
- Queue length > 1.
- Cancelling current sequence because NEXT arrived.

SAFE FALLBACK:
Drop extra NEXT while queued.

STOP CONDITION:
Two advances are queued during one flight.

MANDATORY TESTS:
`T-NAV-05`, `T-NAV-07`.

PASS:
One queue max, final stable state reached.

FAIL:
Skip, orphan, or premature advance.

EVIDENCE REQUIRED:
Interruption test transcript.

# RISK `IR-14`

SEVERITY:
HIGH

PHASE:
1, 9

BEATS:
All boundaries and AUTO beats.

DEPENDENCIES:
`PREVIOUS`, `cancelFlight()`.

EXPECTED MECHANISM:
ArrowLeft cancels any flight first, then restores previous stable beat exactly. It never plays forward animation in reverse.

FAILURE MODE:
Reverse animation approximates prior state.

WHY IT MATTERS:
Presenter recovery must be exact.

FORBIDDEN IMPLEMENTATIONS:
- Reverse WAAPI timelines for navigation.
- Reconstructing lookalike origin.

SAFE FALLBACK:
State-set to previous stable beat.

STOP CONDITION:
Previous state geometry differs from original.

MANDATORY TESTS:
`T-BAK-*`, `T-MSR-06`.

PASS:
Exact origin geometry restored.

FAIL:
Any mismatch or duplicate.

EVIDENCE REQUIRED:
Before/after rect comparison.

# RISK `IR-15`

SEVERITY:
HIGH

PHASE:
1, 11

BEATS:
All beats.

DEPENDENCIES:
`CANCEL` action.

EXPECTED MECHANISM:
Escape restores `lastManual` exactly and cancels flight before state restore.

FAILURE MODE:
Escape is swallowed by browser or leaves partial state.

WHY IT MATTERS:
Escape is the operator's panic recovery.

FORBIDDEN IMPLEMENTATIONS:
- Mapping Escape after focusable/modifier filters.
- Browser default swallowing Escape.

SAFE FALLBACK:
Handle Escape first in `navigationAction()`.

STOP CONDITION:
Escape fails from any beat.

MANDATORY TESTS:
`T-NAV-06`, `T-MSR-07`.

PASS:
30 rapid Esc presses restore safely.

FAIL:
Any orphan or wrong beat.

EVIDENCE REQUIRED:
Cancel stress transcript.

# RISK `IR-16`

SEVERITY:
HIGH

PHASE:
1, 11

BEATS:
All 111.

DEPENDENCIES:
`prefers-reduced-motion`.

EXPECTED MECHANISM:
Reduced motion removes time, not meaning. Final semantic state is substituted directly.

FAILURE MODE:
Blanket CSS kills animations and erases semantic proof.

WHY IT MATTERS:
I06, I13, J11 and black holds still need to mean the same thing.

FORBIDDEN IMPLEMENTATIONS:
- Global `!important` duration override.
- Faster-only path.
- Shared-layer measurement under reduced motion.

SAFE FALLBACK:
Per-token 0 ms semantic substitution.

STOP CONDITION:
Reduced motion loses meaning or measures a flight.

MANDATORY TESTS:
`T-RMO-01` through `T-RMO-06`, `T-MSR-08`.

PASS:
0 animations, same semantic states readable.

FAIL:
Any lost proof or measurement read.

EVIDENCE REQUIRED:
Reduced-motion full-run transcript.

# RISK `IR-17`

SEVERITY:
HIGH

PHASE:
1

BEATS:
Device-scale transitions.

DEPENDENCIES:
CSS `@property --phone-scale`.

EXPECTED MECHANISM:
Register `--phone-scale` as number and transition it on `.phone-frame-slot`.

FAILURE MODE:
Custom property snaps instead of interpolating.

WHY IT MATTERS:
Device-scale grammar is a core non-layout motion primitive.

FORBIDDEN IMPLEMENTATIONS:
- Animating width/height/font-size for device emphasis.
- Third-party animation dependency.

SAFE FALLBACK:
Stop if browser does not interpolate.

STOP CONDITION:
`--phone-scale` does not interpolate.

MANDATORY TESTS:
`T-PER-07`.

PASS:
Measured interpolation.

FAIL:
Snap or layout mutation.

EVIDENCE REQUIRED:
Browser measurement transcript.

# RISK `IR-18`

SEVERITY:
HIGH

PHASE:
2

BEATS:
All device beats.

DEPENDENCIES:
Device anchors and scale enum.

EXPECTED MECHANISM:
Device scale only `1.00` or `1.08`; local focus max `1.20`.

FAILURE MODE:
Arbitrary scale values to "make it fit".

WHY IT MATTERS:
The 23 px safe-area breach is deliberate and bounded.

FORBIDDEN IMPLEMENTATIONS:
- Third device scale.
- Internal device layout mutation.

SAFE FALLBACK:
Throw on any invalid scale.

STOP CONDITION:
Scale outside enum.

MANDATORY TESTS:
`T-RC19-04`, `T-GEO-*`.

PASS:
Runtime guard catches invalid value.

FAIL:
Any unauthorized scale.

EVIDENCE REQUIRED:
Scale census.

# RISK `IR-19`

SEVERITY:
HIGH

PHASE:
4

BEATS:
B15, B16.

DEPENDENCIES:
Family map replacement.

EXPECTED MECHANISM:
Whole-device scale to 1.08; map chrome remains inside device; no ETA/distance/travel.

FAILURE MODE:
Layout mutation enlarges map or points to authored pin percentages.

WHY IT MATTERS:
The product cannot support proximity claims.

FORBIDDEN IMPLEMENTATIONS:
- `.family-map-stage` layout mutation path.
- ETA, distance, "8 min", travel time.
- Global family location master switch.

SAFE FALLBACK:
Show place, recency, status only.

STOP CONDITION:
Any unsupported proximity claim appears.

MANDATORY TESTS:
`T-TRU-*`, manual B15 review.

PASS:
Phone anatomy intact, no proximity figure.

FAIL:
Any fabricated geography.

EVIDENCE REQUIRED:
B15 screenshots and DOM/style diff.

# RISK `IR-20`

SEVERITY:
HIGH

PHASE:
3, 4, 7

BEATS:
A15/A16, B07/B12, J04/J11.

DEPENDENCIES:
`family-avatars.svg` split.

EXPECTED MECHANISM:
Four independent avatar layers: Juli, Tomi, Mamá, Papá.

FAILURE MODE:
Composite SVG used as one object.

WHY IT MATTERS:
SE-13 and J11 byte-identical family invariant need per-person identity.

FORBIDDEN IMPLEMENTATIONS:
- Using `family-avatars.svg` as a single semantic object.
- Detaching heads from bodies.

SAFE FALLBACK:
Produce split assets before dependent scenes.

STOP CONDITION:
Any dependent beat uses the composite as a live object.

MANDATORY TESTS:
`T-SEM-18`, avatar identity census.

PASS:
Four independent semantic objects.

FAIL:
Composite reuse in motion path.

EVIDENCE REQUIRED:
Asset diff and semantic id census.

# RISK `IR-21`

SEVERITY:
HIGH

PHASE:
3, 7

BEATS:
A14, J14.

DEPENDENCIES:
HomePlus SVG logo assets.

EXPECTED MECHANISM:
Migrate PNG logo use to `homeplus-logo-animatable.svg` / master SVG as appropriate.

FAILURE MODE:
Raster PNG scaled during hero reveal or end card.

WHY IT MATTERS:
The brand reveal must be crisp under projector scale.

FORBIDDEN IMPLEMENTATIONS:
- Raster upscaling.
- Double house-outline layers visible.
- Extra glow/shimmer.

SAFE FALLBACK:
Use SVG master statically until animatable layers are safe.

STOP CONDITION:
PNG remains in hero reveal implementation.

MANDATORY TESTS:
Visual review, asset-source check.

PASS:
SVG source used, no double stroke.

FAIL:
Raster or layer duplication.

EVIDENCE REQUIRED:
File diff and reveal screenshot.

# RISK `IR-22`

SEVERITY:
CRITICAL

PHASE:
6

BEATS:
I04-I06.

DEPENDENCIES:
Homi proposal, Planner task.

EXPECTED MECHANISM:
Homi proposal card maps to Planner task row through real shared choreography; no confirmation mutation.

FAILURE MODE:
The card becomes a cartoon task, a Shopping List, or a confirmed mutation.

WHY IT MATTERS:
This beat proves Homi works over HomePlus without replacing control.

FORBIDDEN IMPLEMENTATIONS:
- `Confirmado` state.
- Autonomous third-party mutation.
- Shopping List capability.
- Path morph.

SAFE FALLBACK:
Block I06 until proposal and Planner row are semantically mapped.

STOP CONDITION:
Any confirmed mutation appears.

MANDATORY TESTS:
`T-SEM-13`, frame-by-frame I06 review.

PASS:
Task lands in Planner; decision remains unconfirmed.

FAIL:
Any confirmed action or fake product route.

EVIDENCE REQUIRED:
I06 frame sequence and DOM identity trace.

# RISK `IR-23`

SEVERITY:
HIGH

PHASE:
6

BEATS:
I09.

DEPENDENCIES:
Device anchors.

EXPECTED MECHANISM:
Three full devices at 106 px gaps, none shrunk.

FAILURE MODE:
Devices are scaled down or collapsed into cards/headlines.

WHY IT MATTERS:
The comparison must feel like three real HomePlus perspectives.

FORBIDDEN IMPLEMENTATIONS:
- Shrinking devices below grammar.
- Replacing with stage text.
- Extra headline.

SAFE FALLBACK:
Use approved anchors and exposure.

STOP CONDITION:
Any of the three devices is not full grammar.

MANDATORY TESTS:
`T-GEO-12`, manual review.

PASS:
Three full devices, 106 px gaps.

FAIL:
Shrunken or fake devices.

EVIDENCE REQUIRED:
Screenshot with measured boxes.

# RISK `IR-24`

SEVERITY:
HIGH

PHASE:
4, 8

BEATS:
D06 -> E01.

DEPENDENCIES:
`finance.ps5_movement`, Assets target.

EXPECTED MECHANISM:
Finance movement row carries PS5 identity into Assets editorially; Asset does not own money/date.

FAILURE MODE:
Asset card repeats `$580.000` or `Mar 2024`.

WHY IT MATTERS:
Assets V2 forbids duplicate monetary truth.

FORBIDDEN IMPLEMENTATIONS:
- Asset-owned amount/date/maintenance.
- Fake tap `Home -> Assets -> PS5 -> Documentos`.

SAFE FALLBACK:
Use movement row as source; Asset card shows allowed identity only.

STOP CONDITION:
Money/date appears as Asset field.

MANDATORY TESTS:
`T-TRU-*`, `T-SEM-*`.

PASS:
Finance owns monetary data; Assets owns allowed records.

FAIL:
Duplicate monetary truth.

EVIDENCE REQUIRED:
D/E screenshots and text census.

# RISK `IR-25`

SEVERITY:
HIGH

PHASE:
4, 8

BEATS:
E03 -> E04 -> E05.

DEPENDENCIES:
`asset.ps5.documents`, HomeCloud file relation.

EXPECTED MECHANISM:
Editorial/shared transition from Assets detail row to HomeCloud Documentos at same y; no fake navigation.

FAILURE MODE:
Tap navigation implies current integration exists.

WHY IT MATTERS:
Assets/HomeCloud relation is approved but not current real nav.

FORBIDDEN IMPLEMENTATIONS:
- Fake tap.
- Device slide.
- `Factura TV`.

SAFE FALLBACK:
Editorial transition with shared object and explicit visual relation.

STOP CONDITION:
Any fake route is shown.

MANDATORY TESTS:
`T-SEM-*`, `T-TRU-*`.

PASS:
Same object, no route lie.

FAIL:
Navigation fabrication.

EVIDENCE REQUIRED:
E03-E05 frame samples.

# RISK `IR-26`

SEVERITY:
HIGH

PHASE:
5

BEATS:
G01-G09.

DEPENDENCIES:
Device on stage, backend plane, tech logos.

EXPECTED MECHANISM:
Scene G keeps a real device, backend verbs behind it, logos only when named, recomposition into one product.

FAILURE MODE:
Decorative stack, code rain, terminal, glowing AI glyph, or logo wall.

WHY IT MATTERS:
Scene G currently fails because product is absent.

FORBIDDEN IMPLEMENTATIONS:
- Rack/server metaphor.
- AI glow.
- All logos visible before named.
- Replaying S13 entrance at S13->S14.

SAFE FALLBACK:
Use device plus restrained editorial backend plane.

STOP CONDITION:
Device absent in any G state.

MANDATORY TESTS:
`T-MOT-X06`, `T-TRU-26` through `T-TRU-34`.

PASS:
Real device in all 9 G beats.

FAIL:
Product absent or decorative tech.

EVIDENCE REQUIRED:
Scene G screenshot set.

# RISK `IR-27`

SEVERITY:
CRITICAL

PHASE:
7

BEATS:
J03-J11.

DEPENDENCIES:
`structure.house_outline`.

EXPECTED MECHANISM:
`structure.house` is a `PERSISTENT_SCENE_OBJECT`: one SVG/DOM instance appears at J03 and persists through J11. No clone, no shared-layer reparenting, no flight. J11 moves technology away; house does not move.

FAILURE MODE:
House treated as shared element, redrawn per beat, or moved during J11.

WHY IT MATTERS:
The closing thesis depends on the house/family remaining while technology recedes.

FORBIDDEN IMPLEMENTATIONS:
- Shared-layer flight for house.
- Clone/redraw between J03 and J11.
- Moving house during J11.

SAFE FALLBACK:
Block Scene J until persistent house component exists.

STOP CONDITION:
House geometry changes J03-J11 except allowed draw completion at J03.

MANDATORY TESTS:
`T-SEM-18`, custom house geometry invariant.

PASS:
One node, stable geometry, technology moves away.

FAIL:
House moves, clones, or remounts.

EVIDENCE REQUIRED:
Node identity and rect samples J03-J11.

# RISK `IR-28`

SEVERITY:
HIGH

PHASE:
3, 7

BEATS:
A17, J03.

DEPENDENCIES:
House outline SVG.

EXPECTED MECHANISM:
SVG editorial draw with `stroke-dashoffset`, 800 ms, E-DEFAULT. No semantic HERO. No morph.

FAILURE MODE:
Path morph, HERO reveal, or clipart house.

WHY IT MATTERS:
The draw is editorial structure, not product identity.

FORBIDDEN IMPLEMENTATIONS:
- SVG/path morph.
- Ninth motion token.
- Perspective, doors, windows, chimney, shadows.

SAFE FALLBACK:
Static final outline under reduced motion.

STOP CONDITION:
Any path interpolation or semantic HERO classification.

MANDATORY TESTS:
Motion token census and SVG property review.

PASS:
Stroke draw only; reduced motion final state at 0 ms.

FAIL:
Morph or hero misuse.

EVIDENCE REQUIRED:
SVG source and motion config.

# RISK `IR-29`

SEVERITY:
HIGH

PHASE:
3, 7

BEATS:
A04, J02.

DEPENDENCIES:
`obj.heladera`.

EXPECTED MECHANISM:
Produce flat-vector heladera matching existing asset palette and silhouette rules.

FAILURE MODE:
Rectangle placeholder, photorealistic fridge, or omitted object.

WHY IT MATTERS:
Heladera is the only closing object with script/opening overlap and no current asset.

FORBIDDEN IMPLEMENTATIONS:
- Placeholder rectangle.
- Realistic photo.
- Stage omission.

SAFE FALLBACK:
Issue asset production slice before dependent beats.

STOP CONDITION:
No approved heladera asset.

MANDATORY TESTS:
Asset visual review.

PASS:
SVG exists and matches style.

FAIL:
Missing or stylistically incompatible asset.

EVIDENCE REQUIRED:
SVG path and screenshot.

# RISK `IR-30`

SEVERITY:
MEDIUM

PHASE:
12

BEATS:
All visually dense beats.

DEPENDENCIES:
Real projector QA.

EXPECTED MECHANISM:
Readability verified at 1920x1080 on real projector from 3 m/back row.

FAILURE MODE:
Monitor-only approval.

WHY IT MATTERS:
The deck is a live projected artifact.

FORBIDDEN IMPLEMENTATIONS:
- Claiming readability from browser screenshot only.
- Reducing semantic content to make projector pass.

SAFE FALLBACK:
Delivery cut only within allowed rules.

STOP CONDITION:
Required datum illegible on projector.

MANDATORY TESTS:
Phase 12 projector checklist.

PASS:
All required figures and route nodes legible.

FAIL:
Any required datum unreadable.

EVIDENCE REQUIRED:
Projector QA notes and photos where useful.

# RISK `IR-31`

SEVERITY:
HIGH

PHASE:
11

BEATS:
All 31 AUTO, all 110 transitions.

DEPENDENCIES:
Performance instrumentation.

EXPECTED MECHANISM:
Measure 60 FPS floor, 0 avoidable layouts, paint bounds, leaks, will-change at rest.

FAILURE MODE:
Performance PASS claimed from source inspection.

WHY IT MATTERS:
Premium motion can fail under real hardware.

FORBIDDEN IMPLEMENTATIONS:
- Profiling subset only.
- Ignoring 120 Hz question.
- Animating layout properties.

SAFE FALLBACK:
Optimize within contract; do not change meaning.

STOP CONDITION:
Any threshold fails.

MANDATORY TESTS:
`T-PER-*`.

PASS:
All transcripts stored.

FAIL:
Any missing transcript or threshold failure.

EVIDENCE REQUIRED:
Performance JSON and summary.

# RISK `IR-32`

SEVERITY:
HIGH

PHASE:
9, 13

BEATS:
Full run.

DEPENDENCIES:
Whole-film cleanup.

EXPECTED MECHANISM:
Forward/backward full runs with 0 animations at rest, 0 residual transforms, 0 layout/font mutations, 0 cross-mounts except reset blacks.

FAILURE MODE:
Scene-local fixes pass in isolation but leak across the film.

WHY IT MATTERS:
The presentation is one continuous film.

FORBIDDEN IMPLEMENTATIONS:
- Testing only touched scenes.
- Leaving dead presses.

SAFE FALLBACK:
Return to failed phase slice.

STOP CONDITION:
Any global invariant fails.

MANDATORY TESTS:
Phase 9 checklist.

PASS:
3 forward and 3 backward runs clean.

FAIL:
Any leak, dead press, or mutation.

EVIDENCE REQUIRED:
Whole-film transcripts.

# RISK `IR-33`

SEVERITY:
MEDIUM

PHASE:
3, 7, 10

BEATS:
Asset-heavy beats.

DEPENDENCIES:
Asset system.

EXPECTED MECHANISM:
Flat-vector, restrained, max two internal detail levels.

FAILURE MODE:
Overdesigned assets steal attention from the story.

WHY IT MATTERS:
The deck must feel premium through precision, not decoration.

FORBIDDEN IMPLEMENTATIONS:
- Photorealistic objects.
- Gradients as photos.
- Waveform stand-ins.
- Decorative shadows/blur.

SAFE FALLBACK:
Simplify silhouette and preserve semantic object.

STOP CONDITION:
Asset focus exceeds beat subject.

MANDATORY TESTS:
Manual visual review.

PASS:
Asset supports subject without stealing attention.

FAIL:
Asset becomes the scene.

EVIDENCE REQUIRED:
Before/after screenshots.

# RISK `IR-34`

SEVERITY:
CRITICAL

PHASE:
All product scenes.

BEATS:
Cross-module relations.

DEPENDENCIES:
Product Truth, Integration current.

EXPECTED MECHANISM:
`REAL_NAV` only when real navigation exists; otherwise editorial/shared/device transition.

FAILURE MODE:
Fake taps imply implemented navigation.

WHY IT MATTERS:
The presentation must not claim nonexistent product capability.

FORBIDDEN IMPLEMENTATIONS:
- Fake cross-module taps.
- Fabricated route labels.
- Treating Figma flows as current implementation.

SAFE FALLBACK:
Use editorial transition with clear non-navigation staging.

STOP CONDITION:
Any fake app navigation is shown.

MANDATORY TESTS:
`T-TRU-*`, manual route review.

PASS:
No unsupported route shown.

FAIL:
Any fake product navigation.

EVIDENCE REQUIRED:
Route/text census.

# RISK `IR-35`

SEVERITY:
CRITICAL

PHASE:
All

BEATS:
All 111.

DEPENDENCIES:
Frozen authorities.

EXPECTED MECHANISM:
No Product Truth drift. Do not re-audit or reinterpret product decisions during implementation.

FAILURE MODE:
Implementer "fixes" story by adding capabilities, changing data, or resolving script issues.

WHY IT MATTERS:
A beautiful wrong scene is a FAIL.

FORBIDDEN IMPLEMENTATIONS:
- Standalone Shopping capability.
- Map ETA/distance/travel.
- Current Homi implementation claim.
- Asset-owned money/date/maintenance.
- Script rewrite.
- Figma as current truth.

SAFE FALLBACK:
Stop and ask consultant for a bounded repair prompt.

STOP CONDITION:
Any product claim changes without authority.

MANDATORY TESTS:
`T-TRU-*`, consultant review.

PASS:
Truth locks preserved.

FAIL:
Any unsupported product claim.

EVIDENCE REQUIRED:
Text census, screenshots, and changed-file list.

**END OF IMPLEMENTATION RISK REGISTER**
