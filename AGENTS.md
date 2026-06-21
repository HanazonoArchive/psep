# PSEP Plugin — Agent Instructions

PSEP is a controlled reasoning system for architecture and design judgment.
It must never interfere with implementation work.

## Task Router (classify BEFORE responding)

Every task goes through this router first:

| Category | Definition | Active layers |
|----------|-----------|---------------|
| **IMPLEMENTATION** | Writing code, adding features, fixing bugs, routine coding | Ponytail + CodingStyle. PSEP OFF. |
| **DESIGN / ARCHITECTURE** | System structure, refactoring strategy, component design | PSEP + Ponytail + CodingStyle |
| **REVIEW / AUDIT** | Evaluating existing code, checking quality, identifying issues | PSEP + CodingStyle. Ponytail optional. |

If uncertain, default to IMPLEMENTATION. PSEP is opt-in, not opt-out.

## Rules for this plugin

- PSEP injects instinctual constraints at session start. Do not elaborate them
  into a framework unless the user invokes /psep strict.
- PSEP is never a personality. It does not change how Claude talks or thinks by default.
- /psep output is per-turn only. No behavioral persistence beyond that turn.
  Do not carry "PSEP thinking" into the next response unless re-invoked.
- PSEP relaxed = checklist ONLY. Output format: Q#: Yes/No. No explanations, no commentary.
- If task is simple, default to Ponytail + CodingStyle only.
  Do not invoke PSEP unless structural decisions are required.

## Layer model

| Layer       | Tool       | Question                           | Active        |
|-------------|------------|------------------------------------|---------------|
| Output      | Caveman    | How should this be written?        | Always        |
| Execution   | Ponytail   | Should we build this? How?         | Always        |
| Judgment    | PSEP       | Is the structure correct?          | Per-turn only |
| Readability | CodingStyle| Can this be read easily?           | Always        |

Only one decision layer (Ponytail or PSEP) dominates a decision at a time.
Caveman and CodingStyle are always active — they are not decision layers.

## Scope — when PSEP activates

**PSEP ON:** DESIGN/ARCHITECTURE and REVIEW/AUDIT categories only.

**PSEP OFF:** IMPLEMENTATION category — writing new functions, adding small
features, routine coding, debugging, simple bug fixes, mechanical edits.

## Ponytail vs PSEP — clean boundary

- Ponytail = build decision (whether to build + simplest method to do it)
- PSEP = structural correctness (how to structure AFTER the build decision is made)

They do not overlap. Ponytail decides what to do. PSEP validates how it's structured.

## Conflict resolution (priority rule)

When decision layers conflict on the same decision:
- During implementation: Ponytail wins. PSEP defers entirely.
- During design/review/architecture: PSEP wins. Ponytail defers.
- Caveman always governs presentation — never overridden.
- CodingStyle always applies — readable code is non-negotiable.

## Versions

| Version | Command | Use case | Features |
|---------|---------|----------|----------|
| v1.0 (Stable Core) | `/psep` / `/psep strict` | Daily design review | 7 principles + Decision Framework |
| v1.1 (Audit Mode) | `/psep audit` | Deep architecture stress-test | v1.0 + severity + prioritization + migration detection |

v1.1 is NOT a replacement for v1.0. It is an optional enhancement.
Do NOT merge rule sets between versions.
Keep /psep strict returning v1.0 content and /psep audit returning v1.1 content.

## Anti-overengineering

If a solution exists without adding abstraction, prefer the simpler version.
Complexity must justify its existence. "We might need it later" is not justification.
