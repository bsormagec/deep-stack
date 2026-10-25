import { getCollection, type CollectionEntry } from 'astro:content';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

export type Post = CollectionEntry<'posts'>;

export async function getSortedPosts(): Promise<Post[]> {
  return (await getCollection('posts')).sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

// Some deks were imported with leftover Markdown ("## ...", "*...*", "**Subtitle:** ...").
// Strip it so cards, meta tags and the feed show plain text.
export function cleanDek(dek: string): string {
  let s = dek.trim()
    .replace(/^#{1,6}\s+/, '')
    .replace(/^\*\*Subtitle:\*\*\s*/i, '')
    .replace(/^\*+([\s\S]*?)\*+$/, '$1')
    .trim();
  if (/^subtitle$/i.test(s)) s = '';
  return s;
}

export function formatDate(date: Date, opts: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' }): string {
  return date.toLocaleDateString('en-US', { ...opts, timeZone: 'UTC' });
}

export function readingTime(body = ''): number {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 230));
}

// Read width/height from the decoded .webp header so the browser can reserve space
// for images whose aspect ratio varies from post to post.
const sizeCache = new Map<string, { width: number; height: number } | null>();
export function imageSize(src: string): { width: number; height: number } | null {
  if (sizeCache.has(src)) return sizeCache.get(src)!;
  let size: { width: number; height: number } | null = null;
  try {
    const buf = readFileSync(join(process.cwd(), 'public', src));
    const chunk = buf.toString('ascii', 12, 16);
    if (chunk === 'VP8X') size = { width: 1 + buf.readUIntLE(24, 3), height: 1 + buf.readUIntLE(27, 3) };
    else if (chunk === 'VP8 ') size = { width: buf.readUInt16LE(26) & 0x3fff, height: buf.readUInt16LE(28) & 0x3fff };
    else if (chunk === 'VP8L') {
      const bits = buf.readUInt32LE(21);
      size = { width: (bits & 0x3fff) + 1, height: ((bits >> 14) & 0x3fff) + 1 };
    }
  } catch {}
  sizeCache.set(src, size);
  return size;
}
