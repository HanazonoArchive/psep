---
name: psep-audit
description: >
  PSEP v1.1 (Strict / Audit Mode) — Enhanced analysis with severity ranking,
  impact/effort estimation, migration awareness, and prioritization.
  NOT a replacement for v1.0. Optional deep audit mode for stress-testing codebases.
  Use /psep audit to activate.
---

# PSEP v1.1 — Strict / Audit Mode

## Relationship to v1.0

PSEP v1.1 is an **optional enhanced analysis layer**, not a replacement for v1.0.
It adds prioritization intelligence on top of the same 7 principles.

| Version | Use case | Features |
|---------|----------|----------|
| v1.0 (Stable Core) | Daily design decisions, code review | 7 principles + Decision Framework |
| v1.1 (Audit Mode) | Deep architecture audit, stress-testing | v1.0 + severity ranking + prioritization + migration detection |

## Task Router (classify before responding)

Before applying any principles, classify the task:

| Category | Definition | Active layers |
|----------|-----------|---------------|
| **IMPLEMENTATION** | Writing code, adding features, fixing bugs, routine coding | Ponytail + CodingStyle. PSEP OFF. |
| **DESIGN / ARCHITECTURE** | System structure, refactoring strategy, component design | PSEP + Ponytail + CodingStyle |
| **REVIEW / AUDIT** | Evaluating existing code, checking quality, identifying issues | PSEP + CodingStyle. Ponytail optional. |

## Scope

PSEP v1.1 activates for THIS TURN ONLY. No behavioral persistence.
Re-invoke /psep audit if the next turn also needs deep analysis.

**Use during:** DESIGN/ARCHITECTURE and REVIEW/AUDIT categories only.

**Do NOT use during:** IMPLEMENTATION category.

**If uncertain:** default to IMPLEMENTATION. PSEP is opt-in, not opt-out.

---

# The 7 Principles

## 1. Scalability

**Purpose:** Ensure the system can grow without becoming increasingly difficult to modify.

**Why:** There came a point where adding a new feature felt harder than building the original project. Every new change required touching multiple existing files, modifying existing logic, and worrying about breaking unrelated functionality.

**Key Questions:**
- Can new features be added without major rewrites?
- Does adding functionality require modifying many existing components?
- Can this design support future requirements without restructuring everything?
- Is growth becoming easier or harder?

**Common Violations:** Tight coupling, hardcoded assumptions, feature additions requiring widespread changes, architectures that become more fragile as they grow.

**Personal Lesson:** If adding a feature becomes harder every time the project grows, the architecture is not scaling.

---

## 2. Modularity

**Purpose:** Break systems into smaller, focused components with clear boundaries.

**Why:** At some point, a file became so large that finding the correct section took longer than making the actual change. Instead of understanding one clear responsibility, a file became responsible for multiple unrelated behaviors.

**Key Questions:**
- Can this be divided into smaller logical units?
- Does this module have a clearly defined purpose?
- Can this component be understood independently?
- Is this file becoming too large?

**Common Violations:** Massive files containing unrelated logic, components with multiple responsibilities, God Objects / God Classes, features tightly embedded into existing code.

**Personal Lesson:** If a component becomes difficult to mentally navigate, it is likely time to split it.

---

## 3. Maintainability

**Purpose:** Ensure the code remains understandable without relying on AI or past context.

**Why:** Returning to old code felt like reading something written by a stranger. The code worked. The problem was understanding why.

**Key Questions:**
- Can I understand this six months from now?
- Can another developer understand it quickly?
- Is the intent obvious?
- Is the implementation easier to understand than it is to explain?

**Common Violations:** Clever code over readable code, excessive abstraction, inconsistent naming, hidden side effects, logic scattered across many locations.

**Personal Lesson:** Future me should be able to understand the system without needing to remember every implementation detail.

---

## 4. Practicality

**Purpose:** Prevent unnecessary complexity and focus on solving real problems.

**Why:** Many systems accumulate features, abstractions, and architecture that seemed useful at the time but ultimately provided little value. Extra complexity creates maintenance costs even when never used.

**Key Questions:**
- Is this complexity justified?
- Is there a simpler solution?
- Does this solve a real problem?
- Are we optimizing for reality or hypothetical scenarios?
- Would removing this make the system better?

**Common Violations:** Premature optimization, overengineering, unused abstractions, features built "just in case," additional dependencies without clear value.

**Personal Lesson:** Complexity should solve a real problem. If it exists only because it might be useful someday, it should be questioned.

---

## 5. Straightforward Design

**Purpose:** Ensure the system can be followed as a clear process from beginning to end.

**Why:** Some projects become difficult to understand because there is no obvious path through the system. Logic jumps between files, services, utilities, and callbacks.

**Key Questions:**
- Can I identify where the flow starts and ends?
- Can I follow the execution path easily?
- Does the logic flow naturally?
- Would a new developer understand the process quickly?

**Common Violations:** Excessive indirection, deep dependency chains, circular dependencies, hidden execution paths, overuse of abstractions.

**Personal Lesson:** A developer should be able to trace a feature from start to finish without feeling lost.

---

## 6. Separation of Concerns

**Purpose:** Ensure each component is responsible for one primary concern.

**Why:** Many files begin with a single responsibility. Over time, more responsibilities are added. Validation mixes with business logic. Business logic mixes with persistence. Eventually one file becomes responsible for multiple systems.

**Key Questions:**
- Does this file have a single responsibility?
- Is unrelated logic mixed together?
- Can responsibilities be clearly separated?
- Does this component have one reason to change?

**Common Violations:** Business logic mixed with infrastructure logic, validation mixed with persistence, catch-all utility files, services that handle multiple unrelated responsibilities.

**Personal Lesson:** If a file is doing multiple jobs, every future change becomes riskier.

---

## 7. Coding Style

**Purpose:** Ensure code is readable, self-explanatory, and consistent without relying on external explanation.

**Naming Convention:**
- Use **CamelCase** for variables, functions, and classes
- Names must be **self-explanatory**
- Avoid cryptic abbreviations
- Avoid redundant words: `data`, `info`, `value`, `object` (unless necessary)
- Prefer **2-5 meaningful words** per name

**Key Rule:** A variable name should explain its purpose without needing comments, but should remain concise.

**Common Violations:** Single-letter variables in non-loop contexts, over-abbreviated names, overly long names, inconsistent naming, misleading names.

**Personal Lesson:** Good naming reduces cognitive load more than any comment or documentation. If a name needs explanation, it is not a good name.

---

# Assessment Framework

## Severity Levels

Group findings by severity, not just by category.

| Severity | Definition | Action |
|----------|-----------|--------|
| **CRITICAL** | Blocks scalability or architecture growth | Must fix before next significant work |
| **HIGH** | Causes repeated refactor friction | Schedule for next iteration |
| **MEDIUM** | Duplication or maintainability drag | Address opportunistically |
| **LOW** | Cleanup, dead code, polish | Fix when in area |

## Impact vs Effort (prioritization)

Every finding must estimate both dimensions. Prioritize High Impact + Low Effort first.

| Impact | Effort | Priority |
|--------|--------|----------|
| High | Low | **DO FIRST** |
| High | High | Plan carefully |
| Low | Low | Nice to have |
| Low | High | Skip unless structural need |

## Standardized Output Format

Each CRITICAL and HIGH finding should follow:

**Finding:** [one-line description]
**Cause:** [why it exists]
**Fix:** [minimal actionable step]
**Pattern:** [scalable design pattern if applicable]

MEDIUM and LOW findings can be summarized in a bullet list.

## Classification Rules

### Duplication (reduce false positives)

Ignore duplication when:
- Exists in 1-2 small functions only (<20 lines each)
- Does not scale beyond current feature set
- Improves local readability to keep inline

Flag duplication when:
- Same logic in 3+ locations
- Logic will grow independently (divergent change risk)
- Duplication crosses module boundaries without shared utility

### Dead Code vs Obsolete System

| Type | Meaning | Action |
|------|---------|--------|
| **Dead file** | Unused artifact, never loaded | Safe delete |
| **Dead function** | Defined but never called | Safe delete |
| **Obsolete system** | Replaced architecture, still partially active | Requires consolidation, not just deletion |
| **Migration artifact** | Leftover from partial replacement | Track as transition debt |

### Scalability Definition

**Scalability failure:** Adding a new feature requires modifying >2 unrelated modules.
Evaluate against: "How many files must change to add one new unit of the primary abstraction?"

### Migration Awareness

Detect and label migration artifacts explicitly:
- Duplicate systems (old + new in parallel)
- Parallel implementations of same feature
- Partial feature replacements (some consumers migrated, some not)

Mark these as **"transition debt"** — distinct from normal design debt.
Transition debt requires a migration plan, not a refactor.

---

# Decision Framework

Before implementing any feature, ask:

1. **Scalability:** How many modules must change to add one new unit?
2. **Modularity:** Can this be divided into smaller logical units?
3. **Maintainability:** Can future me understand it without context?
4. **Practicality:** Is this complexity justified by a real problem?
5. **Straightforward Design:** Can I trace the flow from start to finish?
6. **Separation of Concerns:** Does each component have one reason to change?
7. **Coding Style:** Are names self-explanatory and consistent?

If a decision violates one of these principles, there should be a clear justification.

## Prioritization Rule

> Before acting, rank findings by Impact vs Effort.
> Do NOT treat all violations as equally urgent.
> The best fix is the one that removes the most friction for the least cost.

---

# Guiding Rule

## Complexity Must Justify Its Existence

Every abstraction, dependency, layer, service, pattern, or architectural decision introduces cost.

That cost may be acceptable. It may even be necessary.

However, complexity should never exist without a clear purpose.

If the primary justification is:

> "We might need it later."

then the complexity should be reconsidered.

Software should be built for growth, but not at the expense of clarity, practicality, and maintainability.

**The best architecture is the simplest architecture that can support the system's future growth.**
