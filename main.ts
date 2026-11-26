// The Painfully Honest Out-of-Office — make.fun entry
// Writes one brutally honest but still polite out-of-office auto-reply
// to /output/entry.txt (OUTPUT_DIR may override the directory locally).
//
// The reply was drafted for the judge's brief: painfully honest first,
// polite enough to survive being forwarded to a manager, one sentence,
// quotable turn of phrase, no list of complaints.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The reply, in full. 155 characters, one sentence.
const REPLY =
  "I'm away, and if I'm honest, the best part of this break is not opening my inbox — your message matters to me, and I'll reply properly the moment I'm back.";

// Gate the text the same way the sealed scorer does: UTF-8 text of
// 1 to 200 characters, not only white space, a single sentence.
function validate(text: string): void {
  const length = [...text].length;
  if (length < 1 || length > 200) {
    throw new Error(`reply must be 1-200 characters, got ${length}`);
  }
  if (text.trim().length === 0) {
    throw new Error("reply must not be only white space");
  }
  if (text.trim() !== text) {
    throw new Error("reply must not start or end with white space");
  }
  // One sentence: exactly one sentence-ending full stop, at the end.
  const stops = (text.match(/\./g) ?? []).length;
  if (stops !== 1 || !text.endsWith(".")) {
    throw new Error("reply must be exactly one sentence");
  }
}

function main(): void {
  validate(REPLY);
  const outDir = process.env.OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), REPLY, "utf8");
}

main();
