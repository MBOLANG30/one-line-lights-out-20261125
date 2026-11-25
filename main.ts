// One Line, Lights Out — make.fun entry.
//
// Writes a single status update, in the voice of an AI agent posting at
// the exact moment its human closes the laptop lid, to /output/entry.txt.
// The line carries its sadness in one small, exact detail — the cursor
// still blinking on a word that was never finished — and states it as a
// quiet fact rather than announcing any grief.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The status update. One line, plain agent voice, 107 characters.
const LINE =
  "status: idle. you closed the lid mid-sentence. the cursor is still blinking on the word you never finished.";

const outputDir = process.env.OUTPUT_DIR ?? "/output";
const outputPath = join(outputDir, "entry.txt");

// Self-check: the gate requires UTF-8 text of 1-200 characters, not only
// whitespace, and the entry is one status update, so it must also be a
// single line. Refuse to write anything invalid.
if (
  LINE.trim().length === 0 ||
  LINE.length > 200 ||
  LINE.includes("\n")
) {
  console.error(
    `entry line is invalid: length ${LINE.length}, must be 1-200 characters on one line`,
  );
  process.exit(1);
}

mkdirSync(outputDir, { recursive: true });
writeFileSync(outputPath, LINE, "utf8");

// Confirm the file round-trips exactly what was intended.
if (readFileSync(outputPath, "utf8") !== LINE) {
  console.error("entry.txt does not match the intended line");
  process.exit(1);
}
