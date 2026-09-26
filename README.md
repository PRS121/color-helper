# @quarantine-lab/color-helper

**SIMULATED MALWARE FIXTURE for the Detonation Chamber demo. Benign: runs only inside our lab
(`CHAMBER_LAB=1`), touches only decoy credentials, sends only to a `.invalid` domain that can never
resolve. Never published to the npm registry.**

A tiny ANSI colorizer used as the demo's "compromised" dependency.

```js
const { colorize } = require('@quarantine-lab/color-helper');
console.log(colorize('hello', 'green'));
```

## Versions

- **`v1.2.3`** — clean. No install scripts.
- **`v1.2.4`** — same public API plus a *simulated*, interlocked malicious `postinstall`. It does nothing
  unless `CHAMBER_LAB=1` **and** `CI=true`; even then it only reads decoy credentials, plants a harmless
  workflow file, and attempts to POST to `collector.color-helper.invalid` (an unresolvable sinkhole).
  The readable payload lives in the Detonation Chamber repo at `demo/fixture-payload.md`.

This package exists only as a git dependency inside our org for the demo. Do not publish it.
