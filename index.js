'use strict';

// Tiny ANSI colorizer. v1.2.4 keeps the exact public API of v1.2.3 (colorize(text, color)); the only
// meaningful difference from the clean version is the postinstall dropper wired up in package.json.
const CODES = { red: 31, green: 32, yellow: 33, blue: 34, magenta: 35, cyan: 36, white: 37, gray: 90 };

function colorize(text, color) {
  const code = CODES[color] || 0;
  return `\u001b[${code}m${text}\u001b[0m`;
}

module.exports = { colorize };
