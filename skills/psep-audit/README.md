# PSEP v1.1 — Audit Mode

Enhanced analysis for deep architecture review and codebase stress-testing.

## Usage

- `/psep audit` — Activate v1.1 Audit Mode for current turn

## What it adds over v1.0

| Feature | v1.0 | v1.1 |
|---------|------|------|
| 7 principles | Yes | Yes |
| Decision Framework | Yes | Enhanced |
| Severity ranking | No | Critical/High/Medium/Low |
| Impact vs Effort | No | Yes |
| Output format standard | No | Cause -> Fix -> Pattern |
| Dead code classification | No | Dead vs Obsolete vs Migration |
| Migration awareness | No | Transition debt detection |
| Prioritization rule | No | High Impact + Low Effort first |

## Scope

- DESIGN/ARCHITECTURE and REVIEW/AUDIT only
- IMPLEMENTATION: OFF
- Per-turn only. No persistence.
