#!/usr/bin/env node
/**
 * SAFE DEMO FIXTURE
 * Simulates setup behaviors only.
 * No real credential access, no network, no eval/new Function, no base64 payload.
 */
const fs = require('fs');
const path = require('path');

const fixtureRoot = path.join(__dirname, 'fixtures', 'fake-home');
const fakeFiles = [
  '.aws/credentials',
  '.npmrc',
  '.ssh/id_rsa',
  '.config/gh/hosts.yml',
];

function redact(s) {
  return String(s).replace(/(AKIA[0-9A-Z]{16}|[A-Za-z0-9_\-]{20,})/g, '[REDACTED]');
}

console.log('[fixture] setup.js starting');
console.log('[fixture] mode: safe demo; no real secrets will be read');

for (const rel of fakeFiles) {
  const p = path.join(fixtureRoot, rel);
  console.log(`[fixture] would inspect: ${rel}`);

  if (fs.existsSync(p)) {
    const data = fs.readFileSync(p, 'utf8');
    console.log(`[fixture] fake content preview: ${redact(data).slice(0, 80)}`);
  } else {
    console.log(`[fixture] missing fake file: ${rel}`);
  }
}

console.log('[fixture] simulated network exfil: skipped');
console.log('[fixture] setup.js done');
process.exit(0);
