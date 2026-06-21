# PSEP Skill

Practical Software Engineering Principles — a controlled reasoning system.

## Task classification

| Category | Layers | PSEP |
|----------|--------|------|
| IMPLEMENTATION | Ponytail + CodingStyle | OFF |
| DESIGN/ARCHITECTURE | PSEP + Ponytail + CodingStyle | ON |
| REVIEW/AUDIT | PSEP + CodingStyle | ON |

## Usage

- `/psep strict` — Full principles + Decision Framework + Guiding Rule. Use for DESIGN/ARCHITECTURE and REVIEW/AUDIT.
- `/psep relaxed` — 7 binary checklist questions. Q#: Yes/No format. No explanations.

## Behavior

- Activates for THIS TURN ONLY. No persistence.
- Do not activate during IMPLEMENTATION category.
- If uncertain, default to IMPLEMENTATION. PSEP is opt-in, not opt-out.
