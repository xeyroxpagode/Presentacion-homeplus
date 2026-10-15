# README_START_HERE

## What This Pack Is

This is the HomePlus Presentation consultant launch pack. It lets a new persistent ChatGPT chat supervise implementation safely.

The consultant does not freestyle. It reads this pack, validates the uploaded presentation ZIP, issues one bounded OpenCode prompt at a time, reviews evidence, and returns PASS / FAIL / BLOCKED.

## Who It Is For

- Human operator: uploads files, copies prompts, runs OpenCode, pastes back full output.
- ChatGPT consultant: supervises implementation and validates evidence.
- OpenCode: executes one exact bounded prompt and stops.

## What To Upload

Upload the Section A files from `04_UPLOAD_MANIFEST.md`, the current presentation ZIP, and the external SVG assets listed there.

At minimum upload:

- `00_CONSULTANT_BOOTSTRAP_PROMPT.md`
- `01_CURRENT_IMPLEMENTATION_STATE.md`
- `03_FINAL_CONSULTANT_HANDOFF.md`
- all core Session-8 authority files listed in the manifest
- all Session-9 asset files listed in the manifest
- `10_IMPLEMENTATION_RISK_REGISTER.md`
- `10_OPENCODE_EXECUTION_GUARDRAILS.md`
- current presentation ZIP

## What To Paste

Open `00_CONSULTANT_BOOTSTRAP_PROMPT.md`, copy the whole text, and paste it as the first user message in a new ChatGPT chat after the files are uploaded.

## What Not To Do

Do not ask OpenCode to "continue", "make it better", "finish the deck", or "fix whatever looks wrong".

Do not skip STOP GATES.

Do not manually resolve product, motion, navigation, or asset decisions.

If OpenCode asks a question, reports a blocker, or returns insufficient evidence, paste that back to the consultant.

## How Implementation Works

1. Consultant validates uploads.
2. Consultant returns the Phase 0 OpenCode prompt.
3. Human runs exactly that prompt in OpenCode.
4. OpenCode returns evidence and stops.
5. Human pastes the full OpenCode output into consultant chat.
6. Consultant returns PASS, FAIL, or BLOCKED.
7. Only after PASS does the consultant generate the next bounded prompt.

## Where The First Prompt Is

`06_PHASE0_FIRST_OPENCODE_PROMPT.md`

Phase 0 implements zero product changes. It only establishes baseline, captures evidence, and validates the pre-implementation lock.

## Current Status

IMPLEMENTATION_STARTED: NO

CURRENT_PHASE: PHASE 0

IMPLEMENTATION MAY START: YES, but only through the consultant loop.

**END**
