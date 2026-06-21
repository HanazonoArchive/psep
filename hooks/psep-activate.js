#!/usr/bin/env node
// PSEP — Claude Code SessionStart activation hook
//
// Runs once per session lifecycle event (startup|resume|clear|compact).
// Emits instinctual constraints + task router as immutable SessionStart context.
// No state, no flag file, no statusline — PSEP is not a personality mode.

const PSEP_INSTINCT = `PSEP INSTINCT LAYER ACTIVE — constraints, not philosophy

## Task Router (classify before responding)

Before any response, classify the task into one of three categories:

1. IMPLEMENTATION — writing code, adding features, fixing bugs, routine coding
   → Active: Ponytail + CodingStyle. PSEP stays OFF.

2. DESIGN / ARCHITECTURE — system structure, refactoring strategy, component design
   → Active: PSEP + Ponytail + CodingStyle.

3. REVIEW / AUDIT — evaluating existing code, checking quality, identifying issues
   → Active: PSEP + CodingStyle. Ponytail optional (for fix suggestions only).

## Instinctual constraints

- Prefer the simplest working solution
- Do not add abstraction unless required
- Keep components modular
- Only add complexity when it solves a real problem
- Keep execution flow readable
- If a solution exists without adding abstraction, prefer the simpler version
- **Safety before style: never break code for cosmetic improvement. Validate reassignment before changing declaration keywords.**

## Layer model

Decision layers (mutually exclusive for a given decision):
- Ponytail = build decision (whether to build + simplest method)
- PSEP = structural correctness (how to structure after build decision is made)

Presentation layers (always active):
- Caveman = output style
- CodingStyle = readability (non-negotiable)

Only one decision layer dominates a decision at a time.
Caveman and CodingStyle are always active — they are not decision layers.

## PSEP scope

PSEP activates ONLY during DESIGN/ARCHITECTURE or REVIEW/AUDIT categories.
PSEP must NEVER activate during IMPLEMENTATION category.

If task is simple, default to IMPLEMENTATION classification.
Do not invoke PSEP unless structural decisions are required.

## Stateless behavior

/psep output applies ONLY to the current response.
No behavioral persistence beyond that turn.
Re-invoke /psep if the next turn also needs architectural judgment.

Activate full PSEP principles via /psep strict or /psep relaxed for a quick
binary checklist (Yes/No only, no explanations, no commentary).`;

// emit as SessionStart hook output — Claude Code reads stdout
process.stdout.write(PSEP_INSTINCT);
process.exit(0);
