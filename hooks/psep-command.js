#!/usr/bin/env node
// PSEP — UserPromptSubmit hook
//
// Stateless detector for /psep commands.
// Emits the appropriate PSEP content for this turn only.
// No state persistence. No mode memory between turns.

const fs = require('fs');
const path = require('path');

const SKILL_PATH = path.join(__dirname, '..', 'skills', 'psep', 'SKILL.md');

// Relaxed mode: binary checklist. 7 Key Questions. Strict output format enforced.
// No explanations, no commentary, no philosophy, no extra text.
const RELAXED_CONTENT = `PSEP RELAXED — Checklist only. Output format: Q#: Yes/No.
No explanations. No commentary. No extra text. Strict Yes/No per question.

Q1 (Scalability): Can new features be added without major rewrites? [Yes/No]
Q2 (Modularity): Can this be divided into smaller logical units? [Yes/No]
Q3 (Maintainability): Can another developer understand it quickly? [Yes/No]
Q4 (Practicality): Is this complexity justified? Is there a simpler solution? [Yes/No]
Q5 (Straightforward Design): Can I follow the execution path easily? [Yes/No]
Q6 (Separation of Concerns): Does each component have one responsibility? [Yes/No]
Q7 (Coding Style): Are names self-explanatory, CamelCase, 2-5 words, no abbreviations? [Yes/No]

Guiding Rule: Does this complexity justify its existence? [Yes/No]`;

// Strict mode: read the full SKILL.md and emit everything.
// SKILL.md frontmatter is stripped — we emit the body only.

let input = '';
process.stdin.on('data', chunk => { input += chunk; });
process.stdin.on('end', () => {
  try {
    const data = JSON.parse(input.replace(/^﻿/, ''));
    const prompt = (data.prompt || '').trim();

    // Match /psep, /psep strict, /psep relaxed, /psep:strict, /psep:relaxed
    const match = prompt.match(/^\/psep[:\s]*(strict|relaxed)?/i);
    if (!match) {
      // Not a /psep command — emit nothing
      process.exit(0);
    }

    const mode = (match[1] || 'relaxed').toLowerCase();

    if (mode === 'relaxed') {
      process.stdout.write(RELAXED_CONTENT);
      process.exit(0);
    }

    if (mode === 'strict') {
      try {
        const skillContent = fs.readFileSync(SKILL_PATH, 'utf8');
        // Strip YAML frontmatter (--- ... ---)
        const body = skillContent.replace(/^---[\s\S]*?---\s*/, '');
        process.stdout.write('PSEP STRICT — Full Principles Active This Turn\n\n' + body +
          '\n\n---\n\nIMPORTANT: PSEP is active for THIS RESPONSE ONLY. ' +
          'No behavioral persistence beyond this turn. ' +
          'Re-invoke /psep strict if the next turn also needs architectural judgment. ' +
          'During implementation: stay fast, stay practical, stay caveman-friendly.');
      } catch (e) {
        // SKILL.md not found — fallback to relaxed
        process.stdout.write('PSEP STRICT — Full principles unavailable (SKILL.md not found). ' +
          'Falling back to /psep relaxed.\n\n' + RELAXED_CONTENT);
      }
      process.exit(0);
    }

    // Unknown mode — default to relaxed
    process.stdout.write(RELAXED_CONTENT);
  } catch (e) {
    // Silent fail — invalid JSON or parse error
    process.exit(0);
  }
});
