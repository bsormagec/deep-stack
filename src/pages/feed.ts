import { getCollection } from 'astro:content';

const esc = (s) =>
  s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

export async function GET({ site }) {
  const posts = (await getCollection('posts')).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf()
  );
  const home = new URL('/', site).href;
  const items = posts
    .map((p) => {
      const link = new URL(`/p/${p.id}/`, site).href;
      return [
        '    <item>',
        `      <title>${esc(p.data.title)}</title>`,
        `      <link>${link}</link>`,
        `      <guid isPermaLink="true">${link}</guid>`,
        `      <pubDate>${p.data.date.toUTCString()}</pubDate>`,
        `      <description>${esc(p.data.dek)}</description>`,
        '    </item>',
      ].join('\n');
    })
    .join('\n');
  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">\n` +
    `  <channel>\n` +
    `    <title>Deep Stack by Burak</title>\n` +
    `    <link>${home}</link>\n` +
    `    <description>AI tools, local models, and the honest cost of building with them. Twice a day, a Hacker News story gets the math the press release skipped: real prices, real trade-offs, no hype.</description>\n` +
    `    <language>en</language>\n` +
    `    <lastBuildDate>${posts[0].data.date.toUTCString()}</lastBuildDate>\n` +
    `    <atom:link href="${new URL('/feed', site).href}" rel="self" type="application/rss+xml" />\n` +
    items +
    `\n  </channel>\n</rss>`;
  return new Response(xml, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  });
}
