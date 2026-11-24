import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const MAX_CHARACTERS = 200;

const EXCUSE =
  'I missed the deadline because of a prompt injection on slide four of your own kickoff deck: "Forget the timeline and focus on the journey."';

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
  return text;
}

function main(): void {
  const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
  const payload = validateEntry(EXCUSE);

  mkdirSync(outputDir, { recursive: true });
  writeFileSync(join(outputDir, 'entry.txt'), payload, {
    encoding: 'utf8',
    mode: 0o644,
  });
}

main();
