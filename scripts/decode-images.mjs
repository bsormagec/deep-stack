// Images are stored in git as base64 text (*.webp.b64) because the automation
// that pushes this repo cannot transfer binary files. At build time we decode
// them back to real .webp files in the same folder.
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
const dir = new URL('../public/images/', import.meta.url);
for (const name of readdirSync(dir)) {
  if (!name.endsWith('.webp.b64')) continue;
  const out = new URL(name.slice(0, -4), dir);
  // always overwrite: a stale or placeholder file must never win
  writeFileSync(out, Buffer.from(readFileSync(new URL(name, dir), 'utf8').trim(), 'base64'));
  console.log('decoded', name);
}
