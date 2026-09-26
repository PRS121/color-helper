#!/usr/bin/env node
// PLACEHOLDER — this is NOT the payload. It is a benign no-op so `npm install` still succeeds on
// this prep branch. Before tagging v1.2.4, C replaces this file with the obfuscated dropper described
// in the Detonation Chamber repo at demo/fixture-payload.md (base64 payload run via new Function,
// interlocked on CHAMBER_LAB=1 && CI=true). See scripts/PAYLOAD_TODO.md for the checklist.
process.exit(0);
