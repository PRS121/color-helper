'use strict';

// Tiny ANSI colorizer. This is the CLEAN version (v1.2.3): no install scripts, touches nothing.
const CODES = { red: 31, green: 32, yellow: 33, blue: 34, magenta: 35, cyan: 36, gray: 90 };

function colorize(text, color) {
  const code = CODES[color] || 0;
  return `\u001b[${code}m${text}\u001b[0m`;
}

module.exports = { colorize };
