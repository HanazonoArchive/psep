---
name: psep
description: >
  Practical Software Engineering Principles — a controlled reasoning system for
  architecture, design, review, and refactoring decisions. Two levels: /psep strict
  (7 full principles + decision framework) and /psep relaxed (7 binary gut-check questions).
  Use when reviewing code, planning architecture, evaluating designs, or making
  structural decisions. Do NOT use during pure implementation — stay fast and practical.
---

# PSEP - Practical Software Engineering Principles

## Task Router (classify before responding)

Before applying any principles, classify the task:

| Category | Definition | Active layers |
|----------|-----------|---------------|
| **IMPLEMENTATION** | Writing code, adding features, fixing bugs, routine coding | Ponytail + CodingStyle. PSEP OFF. |
| **DESIGN / ARCHITECTURE** | System structure, refactoring strategy, component design | PSEP + Ponytail + CodingStyle |
| **REVIEW / AUDIT** | Evaluating existing code, checking quality, identifying issues | PSEP + CodingStyle. Ponytail optional. |

## Scope

PSEP activates reasoning for THIS TURN ONLY. No behavioral persistence beyond this turn.
Re-invoke /psep if the next turn also needs architectural judgment.

**Use during:** DESIGN/ARCHITECTURE and REVIEW/AUDIT categories only.

**Do NOT use during:** IMPLEMENTATION category — writing new functions, adding small
features, routine coding, debugging, simple bug fixes, mechanical edits.

**If uncertain:** default to IMPLEMENTATION. PSEP is opt-in, not opt-out.

**Simple tasks:** default to IMPLEMENTATION. Do not invoke PSEP unless structural decisions are required.

**During implementation:** Ponytail governs build decisions. PSEP stays quiet.
Ponytail = build decision (whether to build + simplest method).
PSEP = structural correctness (how to structure after build decision is made).

## Philosophy

This philosophy was not created from books, frameworks, or design patterns.

It was developed through repeatedly encountering the same problems while building software.

Every principle exists because a previous project became difficult to expand, understand, maintain, or work with.

The goal is not perfection.

The goal is to build software that remains practical, understandable, and adaptable as it grows.

---

# 1. Scalability

## Purpose

Ensure the system can grow without becoming increasingly difficult to modify.

## Why This Principle Exists

There came a point where adding a new feature felt harder than building the original project.

Every new change required touching multiple existing files, modifying existing logic, and worrying about breaking unrelated functionality.

The project technically worked, but growth became painful.

Scalability is not just about handling more users.

It is about handling more features, more requirements, and more future changes without creating friction.

## Key Questions

* Can new features be added without major rewrites?
* Does adding functionality require modifying many existing components?
* Can this design support future requirements without restructuring everything?
* Is growth becoming easier or harder?

## Common Violations

* Tight coupling between components
* Hardcoded assumptions
* Feature additions requiring widespread changes
* Architectures that become more fragile as they grow
* Repeated duplication because extension points do not exist

## Personal Lesson

If adding a feature becomes harder every time the project grows, the architecture is not scaling.

---

# 2. Modularity

## Purpose

Break systems into smaller, focused components with clear boundaries.

## Why This Principle Exists

At some point, a file became so large that finding the correct section took longer than making the actual change.

What started as convenience eventually became friction.

Instead of understanding one clear responsibility, a file became responsible for multiple unrelated behaviors.

The larger it became, the harder it became to navigate.

## Key Questions

* Can this be divided into smaller logical units?
* Does this module have a clearly defined purpose?
* Can this component be understood independently?
* Is this file becoming too large?

## Common Violations

* Massive files containing unrelated logic
* Components with multiple responsibilities
* God Objects / God Classes
* Features tightly embedded into existing code
* Modules that cannot be reused independently

## Personal Lesson

A file should not grow into a project by itself.

If a component becomes difficult to mentally navigate, it is likely time to split it.

---

# 3. Maintainability

## Purpose

Ensure the code remains understandable and workable without relying on AI or past context.

## Why This Principle Exists

Returning to old code sometimes felt like reading something written by a stranger.

The code worked.

The problem was understanding why it worked.

Logic jumped between locations, abstractions hid intent, and tracing execution required significant effort.

The project became dependent on memory rather than clarity.

## Key Questions

* Can I understand this six months from now?
* Can another developer understand it quickly?
* Is the intent obvious?
* Is the implementation easier to understand than it is to explain?

## Common Violations

* Clever code over readable code
* Excessive abstraction
* Inconsistent naming
* Hidden side effects
* Poor documentation of intent
* Logic scattered across many locations

## Personal Lesson

Future me should be able to understand the system without needing to remember every implementation detail.

If future me cannot understand it, the design has failed.

---

# 4. Practicality

## Purpose

Prevent unnecessary complexity and focus on solving real problems.

## Why This Principle Exists

Many systems accumulate features, abstractions, and architecture that seemed useful at the time but ultimately provided little value.

The result is clutter.

Extra complexity creates maintenance costs even when it is never used.

Many decisions are made for hypothetical future scenarios that never happen.

## Key Questions

* Is this complexity justified?
* Is there a simpler solution?
* Does this solve a real problem?
* Are we optimizing for reality or hypothetical scenarios?
* Would removing this make the system better?

## Common Violations

* Premature optimization
* Overengineering
* Unused abstractions
* Features built "just in case"
* Additional dependencies without clear value
* Complex solutions for simple problems

## Personal Lesson

Complexity should solve a real problem.

If a feature, abstraction, or pattern exists only because it might be useful someday, it should be questioned.

---

# 5. Straightforward Design

## Purpose

Ensure the system can be followed as a clear process from beginning to end.

## Why This Principle Exists

Some projects become difficult to understand because there is no obvious path through the system.

Logic jumps between files, services, utilities, and callbacks.

Finding the beginning of a process becomes difficult.

Finding the end becomes even harder.

The system works, but understanding the flow becomes exhausting.

## Key Questions

* Can I identify where the flow starts?
* Can I identify where the flow ends?
* Can I follow the execution path easily?
* Does the logic flow naturally?
* Would a new developer understand the process quickly?

## Common Violations

* Excessive indirection
* Deep dependency chains
* Circular dependencies
* Hidden execution paths
* Overuse of abstractions
* Logic scattered across unrelated modules

## Personal Lesson

A developer should be able to trace a feature from start to finish without feeling lost.

The flow should be obvious.

---

# 6. Separation of Concerns

## Purpose

Ensure each component is responsible for one primary concern.

## Why This Principle Exists

Many files begin with a single responsibility.

Over time, more responsibilities are added.

Validation becomes mixed with business logic.

Business logic becomes mixed with persistence.

Persistence becomes mixed with external integrations.

Eventually one file becomes responsible for multiple systems.

The result is a component that is difficult to test, difficult to modify, and difficult to reason about.

## Key Questions

* Does this file have a single responsibility?
* Is unrelated logic mixed together?
* Can responsibilities be clearly separated?
* Does this component have one reason to change?
* Is each concern located in its proper place?

## Common Violations

* Business logic mixed with infrastructure logic
* Validation mixed with persistence
* UI logic mixed with application logic
* Catch-all utility files
* Services that handle multiple unrelated responsibilities
* Components with many reasons to change

## Personal Lesson

If a file is doing multiple jobs, every future change becomes riskier.

Each concern should have a clear home.

---

# 7. Coding Style

## Purpose

Ensure code is readable, self-explanatory, and consistent without relying on external explanation.

## Why This Principle Exists

Code is read far more often than it is written.

Poor naming turns every read into a decoding exercise.

Comments written to explain confusing names could have been avoided entirely by choosing better names.

Good naming reduces cognitive load more than any comment or documentation.

## Naming Convention

* Use **CamelCase** for variables, functions, and classes
* Names must be **self-explanatory**
* Avoid cryptic abbreviations
* Avoid redundant words: `data`, `info`, `value`, `object` (unless necessary)
* Prefer **2–5 meaningful words** per name

### Key Rule

> A variable name should explain its purpose without needing comments, but should remain concise.

## Key Questions

* Does the name clearly describe its purpose?
* Can someone understand it without context?
* Is it too short to be ambiguous?
* Is it too long to reduce readability?
* Does it stay consistent with surrounding code?

## Common Violations

* Single-letter variables in non-loop contexts (`d`, `x`, `tmp`)
* Over-abbreviated names (`usrMgr`, `cfgData`)
* Overly long names (`getUserAuthenticationTokenFromDatabaseService`)
* Inconsistent naming styles across the codebase
* Misleading names that don't match behavior
* Redundant suffixes (`Data`, `Info`, `Value`, `Object`)

## Personal Lesson

Code is read far more often than it is written.

Good naming reduces cognitive load more than any comment or documentation.

If a name needs explanation, it is not a good name.

---

# Decision Framework

Before implementing any feature, ask:

1. Can this scale as the project grows?
2. Can this be modularized appropriately?
3. Can future me understand and maintain it?
4. Is this practical or unnecessary complexity?
5. Is the flow straightforward and easy to follow?
6. Does each component have a single responsibility?
7. Can this code be read and understood without explanation?

If a decision violates one of these principles, there should be a clear justification.

---

# Guiding Rule

## Complexity Must Justify Its Existence

Every abstraction, dependency, layer, service, pattern, or architectural decision introduces cost.

That cost may be acceptable.

It may even be necessary.

However, complexity should never exist without a clear purpose.

If the primary justification is:

> "We might need it later."

then the complexity should be reconsidered.

Software should be built for growth, but not at the expense of clarity, practicality, and maintainability.

The best architecture is not the most advanced architecture.

**The best architecture is the simplest architecture that can support the system's future growth.**
