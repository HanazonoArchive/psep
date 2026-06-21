# PSEP — Practical Software Engineering Principles

A Claude Code plugin. Controlled reasoning for architecture, design, and review.
Never active during implementation.

## Install

```bash
claude plugins install github.com/HanazonoArchive/psep
```

## How it works

### Task Router (classify before responding)

Every task goes through classification first:

| Category | Definition | Active layers |
|----------|-----------|---------------|
| **IMPLEMENTATION** | Writing code, adding features, fixing bugs, routine coding | Ponytail + CodingStyle. PSEP OFF. |
| **DESIGN / ARCHITECTURE** | System structure, refactoring strategy, component design | PSEP + Ponytail + CodingStyle |
| **REVIEW / AUDIT** | Evaluating existing code, checking quality, identifying issues | PSEP + CodingStyle. Ponytail optional. |

If uncertain, default to IMPLEMENTATION. PSEP is opt-in, not opt-out.

### Instinct layer (every session, once)

6 hard constraints injected at session start. Immutable. No framework wording.

```
- Prefer the simplest working solution
- Do not add abstraction unless required
- Keep components modular
- Only add complexity when it solves a real problem
- Keep execution flow readable
- If a solution exists without adding abstraction, prefer the simpler version
- Safety before style: never break code for cosmetic improvement
```

### On-demand layers (per-turn, stateless)

| Command | Effect |
|---------|--------|
| `/psep strict` | All 7 principles + Decision Framework + Guiding Rule |
| `/psep relaxed` | 7 binary Yes/No questions. Strict format: Q#: Yes/No. No explanations. |

Both apply ONLY to the current response. No behavioral persistence beyond that turn.
Re-invoke if the next turn also needs architectural judgment.

For **deep architecture audits** with severity ranking, impact/effort estimation, and
migration awareness, use v1.1 audit mode:

| Command | Effect |
|---------|--------|
| `/psep audit` | v1.1 Audit Mode: full enhanced analysis with prioritization |

## Versions

| Version | Command | Use case | Features |
|---------|---------|----------|----------|
| **v1.0 (Stable Core)** | `/psep` / `/psep strict` | Daily design decisions, code review | 7 principles + Decision Framework + Guiding Rule. Minimal, stable, default. |
| **v1.1 (Audit Mode)** | `/psep audit` | Deep architecture audit, stress-testing | v1.0 + severity ranking + impact/effort estimation + migration awareness + prioritization. Optional enhanced layer. |

v1.1 is NOT a replacement for v1.0. It is an optional enhancement for deep analysis.
v1.0 remains the default. Behavior differences between versions are intentional and testable.

## The 7 Principles

| # | Principle | Question |
|---|-----------|----------|
| 1 | Scalability | Can new features be added without major rewrites? |
| 2 | Modularity | Can this be divided into smaller logical units? |
| 3 | Maintainability | Can another developer understand it quickly? |
| 4 | Practicality | Is this complexity justified? Is there a simpler solution? |
| 5 | Straightforward Design | Can I follow the execution path easily? |
| 6 | Separation of Concerns | Does each component have one responsibility? |
| 7 | Coding Style | Are names self-explanatory, consistent convention, 2-5 words, no abbreviations? |

Guiding Rule: **Complexity must justify its existence.** "We might need it later" is not justification.

## Architecture — 4-layer cognitive stack

| Layer | Tool | Question | Active |
|-------|------|----------|--------|
| Output | Caveman | How should this be written? | Always |
| Execution | Ponytail | Should we build this? How? | Always |
| Judgment | PSEP | Is the structure correct? | Per-turn only |
| Readability | CodingStyle | Can this be read easily? | Always |

Only one **decision layer** (Ponytail or PSEP) dominates a decision at a time.
Caveman and CodingStyle are always active — they are presentation layers, not decision layers.

## Scope (categories from Task Router)

**PSEP ON:** DESIGN/ARCHITECTURE and REVIEW/AUDIT categories.

**PSEP OFF:** IMPLEMENTATION category — writing new functions, adding small features,
routine coding, debugging, simple bug fixes, mechanical edits.

**Simple tasks:** classify as IMPLEMENTATION. Ponytail + CodingStyle only.
Do not invoke PSEP unless structural decisions are required.

## Ponytail vs PSEP

- **Ponytail** = build decision (whether to build + simplest method)
- **PSEP** = structural correctness (how to structure after build decision is made)

They do not overlap. Ponytail decides what to do. PSEP validates how it's structured.

## Conflict resolution (priority)

- During implementation → Ponytail wins. PSEP defers.
- During design/review/architecture → PSEP wins. Ponytail defers.
- Caveman always governs presentation — never overridden.
- CodingStyle always active — readable code is non-negotiable.

## Design

- **Stateless** — no mode tracking, no flag file, no persistence between turns
- **Scoped** — only during design, review, refactor, architecture decisions
- **Per-turn** — /psep output applies ONLY to the current response
- **Lightweight** — 6 instinctual constraints (~40 words) as session baseline
- **No statusline** — PSEP is not a personality mode

## File structure

```
psep/
├── .claude-plugin/
│   ├── plugin.json              # Hook definitions
│   └── marketplace.json         # Marketplace listing
├── hooks/
│   ├── psep-activate.js         # SessionStart: emit instinctual constraints
│   └── psep-command.js          # UserPromptSubmit: detect /psep, dispatch to v1.0 or v1.1
├── skills/
│   ├── psep/
│   │   ├── SKILL.md             # v1.0 (Stable Core) — 7 principles + Decision Framework
│   │   └── README.md            # v1.0 usage reference
│   └── psep-audit/
│       ├── SKILL.md             # v1.1 (Audit Mode) — enhanced with severity/prioritization
│       └── README.md            # v1.1 usage reference
├── AGENTS.md                    # Layer model + version rules + conflict resolution
├── LICENSE                      # MIT
└── README.md                    # This file
```

## License

MIT
