#!/usr/bin/env node
/* Structural QA for the SNT question bank and its JSON export. Read-only. */
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const source = path.join(root, 'question-bank.js');
const exportPath = path.join(root, 'resources/questions-snt.json');
const context = { window: {} };
vm.runInNewContext(fs.readFileSync(source, 'utf8'), context, { filename: source });
const bank = context.window.QUESTION_BANK;
const exported = JSON.parse(fs.readFileSync(exportPath, 'utf8')).levels;
const errors = [];
const warnings = [];
const counts = {};
const ids = new Set();
const normalize = s => s.toLocaleLowerCase('fr').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, ' ').trim();

if (!bank || typeof bank !== 'object') throw new Error('window.QUESTION_BANK missing or invalid');
for (const [level, items] of Object.entries(bank)) {
  counts[level] = items.length;
  const seen = new Map();
  for (const [i, q] of items.entries()) {
    const id = `${level}[${i}]`;
    if (!q || typeof q !== 'object') { errors.push(`${id}: not an object`); continue; }
    if (typeof q.q !== 'string' || !q.q.trim()) errors.push(`${id}: empty/non-string question`);
    if (!Array.isArray(q.a) || q.a.length !== 4 || q.a.some(a => typeof a !== 'string' || !a.trim())) errors.push(`${id}: expected four non-empty string choices`);
    if (!Number.isInteger(q.ok) || q.ok < 0 || q.ok > 3) errors.push(`${id}: invalid correct-answer index`);
    if (typeof q.why !== 'string' || !q.why.trim()) errors.push(`${id}: empty/non-string explanation`);
    if (q.id !== undefined) {
      if (typeof q.id !== 'string' || !q.id.trim()) errors.push(`${id}: invalid stable id`);
      else if (ids.has(q.id)) errors.push(`${id}: duplicate stable id ${q.id}`);
      else ids.add(q.id);
      if (typeof q.theme !== 'string' || !q.theme.trim()) errors.push(`${id}: missing theme metadata`);
      if (typeof q.status !== 'string' || !q.status.trim()) errors.push(`${id}: missing review/status metadata`);
      if (!Array.isArray(q.sources) || !q.sources.length || q.sources.some(u => typeof u !== 'string' || !(u.startsWith('http://') || u.startsWith('https://')))) errors.push(`${id}: missing/invalid source URLs`);
    }
    if (typeof q.q === 'string') {
      const key = normalize(q.q);
      if (seen.has(key)) errors.push(`${id}: normalized question duplicate of index ${seen.get(key)}`);
      else seen.set(key, i);
    }
  }
  if (!exported[level] || exported[level].length !== items.length) errors.push(`${level}: export count mismatch`);
  else for (const [i, q] of items.entries()) {
    const e = exported[level][i];
    if (e.question !== q.q || JSON.stringify(e.answers) !== JSON.stringify(q.a) || e.correctIndex !== q.ok || e.explanation !== q.why)
      errors.push(`${level}[${i}]: export content mismatch`);
    for (const key of ['id', 'theme', 'status', 'sources', 'prerequisites'])
      if (JSON.stringify(e[key]) !== JSON.stringify(q[key])) errors.push(`${level}[${i}]: export ${key} metadata mismatch`);
  }
  const distribution = items.reduce((a, q) => { a[q.ok] = (a[q.ok] || 0) + 1; return a; }, {});
  if (Object.keys(distribution).length === 1) warnings.push(`${level}: all correct indices are ${Object.keys(distribution)[0]} (${items.length}/${items.length})`);
}
for (const level of Object.keys(exported)) if (!(level in bank)) errors.push(`${level}: unexpected level in export`);
console.log(JSON.stringify({ counts, total: Object.values(counts).reduce((a,b)=>a+b,0), errors, warnings }, null, 2));
process.exitCode = errors.length ? 1 : 0;
