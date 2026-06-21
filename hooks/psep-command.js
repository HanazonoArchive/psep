#!/usr/bin/env node
// PSEP — UserPromptSubmit hook
//
// Stateless detector for /psep commands.
// Dispatches to v1.0 (Stable Core) or v1.1 (Audit Mode).
// No state persistence. No mode memory between turns.

const fs = require('fs');
const path = require('path');

const SKILL_PATH = path.join(__dirname, '..', 'skills', 'psep', 'SKILL.md');
const AUDIT_SKILL_PATH = path.join(__dirname, '..', 'skills', 'psep-audit', 'SKILL.md');

// v1.0 Relaxed mode: binary checklist. 7 Key Questions. Strict output format.
const RELAXED_CONTENT = `PSEP RELAXED - v1.0 Stable Core. Checklist only. Output format: Q#: Yes/No.
No explanations. No commentary. No extra text. Strict Yes/No per question.

Q1 (Scalability): Can new features be added without major rewrites? [Yes/No]
Q2 (Modularity): Can this be divided into smaller logical units? [Yes/No]
Q3 (Maintainability): Can another developer understand it quickly? [Yes/No]
Q4 (Practicality): Is this complexity justified? Is there a simpler solution? [Yes/No]
Q5 (Straightforward Design): Can I follow the execution path easily? [Yes/No]
Q6 (Separation of Concerns): Does each component have one responsibility? [Yes/No]
Q7 (Coding Style): Are names self-explanatory, consistent convention, 2-5 words, no abbreviations? [Yes/No]

Guiding Rule: Does this complexity justify its existence? [Yes/No]`;

let input = '';
process.stdin.on('data', chunk => { input += chunk; });
process.stdin.on('end', () => {
  try {
    const data = JSON.parse(input.replace(/^﻿/, ''));
    const prompt = (data.prompt || '').trim();

    // Match /psep, /psep strict, /psep relaxed, /psep:strict, /psep:relaxed, /psep audit, /psep:audit
    const match = prompt.match(/^\/psep[:\s]*(strict|relaxed|audit)?/i);
    if (!match) {
      process.exit(0);
    }

    const mode = match[1] ? match[1].toLowerCase() : 'relaxed';

    // v1.1 Audit Mode
    if (mode === 'audit') {
      try {
        const auditContent = fs.readFileSync(AUDIT_SKILL_PATH, 'utf8');
        const body = auditContent.replace(/^---[\s\S]*?---\s*/, '');
        process.stdout.write(
          'PSEP v1.1 AUDIT MODE - Enhanced Analysis Active This Turn\n\n' +
          body +
          '\n\n---\n\n' +
          'IMPORTANT: PSEP v1.1 Audit Mode is active for THIS RESPONSE ONLY. ' +
          'No behavioral persistence beyond this turn. ' +
          'Re-invoke /psep audit if the next turn also needs deep analysis.'
        );
      } catch (e) {
        process.stdout.write(
          'PSEP v1.1 AUDIT MODE - Skill file not found. Falling back to v1.0 strict.\n\n'
        );
        // Fall through to strict fallback below
        loadStrict();
      }
      process.exit(0);
    }

    // v1.0 Relaxed mode
    if (mode === 'relaxed') {
      process.stdout.write(RELAXED_CONTENT);
      process.exit(0);
    }

    // v1.0 Strict mode
    if (mode === 'strict') {
      loadStrict();
      process.exit(0);
    }

    // Unknown mode — default to relaxed
    process.stdout.write(RELAXED_CONTENT);

    function loadStrict() {
      try {
        const skillContent = fs.readFileSync(SKILL_PATH, 'utf8');
        const body = skillContent.replace(/^---[\s\S]*?---\s*/, '');
        process.stdout.write(
          'PSEP STRICT - v1.0 Stable Core. Full Principles Active This Turn\n\n' +
          body +
          '\n\n---\n\n' +
          'IMPORTANT: PSEP is active for THIS RESPONSE ONLY. ' +
          'No behavioral persistence beyond this turn. ' +
          'Re-invoke /psep strict if the next turn also needs architectural judgment. ' +
          'During implementation: stay fast, stay practical, stay caveman-friendly.'
        );
      } catch (e) {
        process.stdout.write(
          'PSEP STRICT - Full principles unavailable (SKILL.md not found). ' +
          'Falling back to /psep relaxed.\n\n' + RELAXED_CONTENT
        );
      }
    }
  } catch (e) {
    process.exit(0);
  }
});
