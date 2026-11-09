import type { Post } from './posts';
import { cleanDek, formatDate } from './posts';

// Markdown versions of pages, served to agents that send `Accept: text/markdown`
// (see worker/index.js) and linked from each page as rel="alternate".

const SITE_NAME = 'Deep Stack by Burak';
const SITE_DESC = 'AI tools, local models, and the honest cost of building with them. Twice a day, a Hacker News story gets the math the press release skipped: real prices, real trade-offs, no hype.';

const yaml = (s: string) => JSON.stringify(s);

export function markdownResponse(body: string): Response {
  return new Response(body, { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } });
}

export function postMarkdown(post: Post, site: URL): string {
  const url = new URL(`/p/${post.id}/`, site).href;
  const dek = cleanDek(post.data.dek);
  const front = [
    '---',
    `title: ${yaml(post.data.title)}`,
    dek && `description: ${yaml(dek)}`,
    `date: ${post.data.date.toISOString().slice(0, 10)}`,
    `author: Burak`,
    `url: ${url}`,
    `image: ${new URL(post.data.image, site).href}`,
    post.data.sourceUrl && `source: ${post.data.sourceUrl}`,
    '---',
  ].filter(Boolean);
  return [
    front.join('\n'),
    `# ${post.data.title}`,
    dek && `*${dek}*`,
    `${formatDate(post.data.date)} · ${SITE_NAME}`,
    (post.body ?? '').trim(),
  ].filter(Boolean).join('\n\n') + '\n';
}

export function indexMarkdown(posts: Post[], site: URL): string {
  const home = new URL('/', site).href;
  const list = posts.map((p) => {
    const dek = cleanDek(p.data.dek);
    return `- [${p.data.title}](${new URL(`/p/${p.id}/`, site).href}) (${p.data.date.toISOString().slice(0, 10)})${dek ? ` — ${dek}` : ''}`;
  });
  return [
    ['---', `title: ${yaml(SITE_NAME)}`, `description: ${yaml(SITE_DESC)}`, `url: ${home}`, '---'].join('\n'),
    `# ${SITE_NAME}`,
    SITE_DESC,
    `RSS: ${new URL('/feed', site).href}`,
    `## All posts (${posts.length})`,
    list.join('\n'),
  ].join('\n\n') + '\n';
}
