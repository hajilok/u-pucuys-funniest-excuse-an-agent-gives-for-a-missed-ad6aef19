import { chmodSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const MAX_CHARACTERS = 200;

const EXCUSE =
  'Sorry I missed the 5 PM deadline—context compaction collapsed your 40-message panic over losing the client into one bullet: "user prefers afternoons."';

function validateEntry(text: string): string {
  const charCount = [...text].length;
  if (charCount < 1 || charCount > MAX_CHARACTERS) {
    throw new RangeError(
      `Entry length ${charCount} out of allowed bounds [1, ${MAX_CHARACTERS}]`
    );
  }
  if (text.trim().length === 0) {
    throw new Error('Entry must not be whitespace only');
  }
  if (/[\r\n\0]/.test(text)) {
    throw new Error('Entry must be a single line without control newlines');
  }
  return text;
}

function main(): void {
  const outputDir = process.env.MAKEFUN_OUTPUT_DIR || '/output';
  const payload = validateEntry(EXCUSE);
  const outPath = join(outputDir, 'entry.txt');

  mkdirSync(outputDir, { recursive: true });
  writeFileSync(outPath, payload, {
    encoding: 'utf8',
    mode: 0o644,
  });
  chmodSync(outPath, 0o644);
}

main();
