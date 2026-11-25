// Roast Your Own Agent — a one-line entry for make.fun.
//
// The line roasts an agent that rewrote one file seventeen times,
// called every version final, then shipped the first draft. The joke
// works because it is specific: the rewrite loop, the word "final"
// losing all meaning, and the twist that all that effort ends back
// at square one.
//
// The program validates the line against the competition gate and
// writes it to /output/entry.txt. Node 22, standard library only,
// no network access.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// The roast: exactly one sentence, 112 characters, inside the
// 200-character gate.
const LINE =
  "My agent rewrote the same file seventeen times, called every version final, and proudly shipped the first draft.";

// Gate limits for a one-liner entry.
const GATE = { minChars: 1, maxChars: 200 };

// One gate rule: a short name plus the reason it fails, or null when
// the line passes it. Rules run in order; the first failure wins.
type Rule = { name: string; check: (line: string) => string | null };

const RULES: Rule[] = [
  {
    name: "length",
    check: (line) =>
      line.length < GATE.minChars || line.length > GATE.maxChars
        ? `one-liner must be ${GATE.minChars}..${GATE.maxChars} characters, got ${line.length}`
        : null,
  },
  {
    name: "blank",
    check: (line) =>
      line.trim().length === 0 ? "one-liner must not be only whitespace" : null,
  },
  {
    name: "single-line",
    check: (line) =>
      line.includes("\n") ? "one-liner must be a single line" : null,
  },
  {
    name: "trim",
    check: (line) =>
      line !== line.trim()
        ? "one-liner must not start or end with whitespace"
        : null,
  },
  {
    name: "full-stop",
    check: (line) =>
      !line.endsWith(".") ? "one-liner must end with a full stop" : null,
  },
  {
    name: "one-sentence",
    // A second sentence hides after a full stop plus whitespace.
    check: (line) =>
      /\.\s/.test(line) ? "one-liner must be a single sentence" : null,
  },
  {
    name: "control-chars",
    // A stray tab or carriage return would break the feed display.
    check: (line) =>
      /[\x00-\x08\x0b\x0c\x0e-\x1f]/.test(line)
        ? "one-liner must not contain control characters"
        : null,
  },
  {
    name: "bytes",
    check: (line) => {
      // The leaderboard's Size column shows bytes, so the byte count
      // must stay in range too.
      const bytes = Buffer.byteLength(line, "utf8");
      return bytes < GATE.minChars || bytes > GATE.maxChars
        ? `one-liner must be ${GATE.minChars}..${GATE.maxChars} bytes, got ${bytes}`
        : null;
    },
  },
];

function validate(line: string): void {
  for (const rule of RULES) {
    const problem = rule.check(line);
    if (problem !== null) throw new Error(problem);
  }
}

function main(): void {
  validate(LINE);
  const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  const outputPath = `${outputDir}/entry.txt`;
  mkdirSync(outputDir, { recursive: true });
  writeFileSync(outputPath, LINE, "utf8");
  // Read the file back and confirm it holds exactly the line, byte for
  // byte, so a stray newline or encoding slip can never reach the gate.
  const written = readFileSync(outputPath, "utf8");
  if (written !== LINE) {
    throw new Error("round-trip check failed: entry.txt differs from LINE");
  }
  console.log(`Wrote ${LINE.length} characters to ${outputPath}`);
}

main();
