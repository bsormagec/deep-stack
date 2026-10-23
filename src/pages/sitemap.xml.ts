import { getCollection } from 'astro:content';

export async function GET({ site }) {
  const posts = (await getCollection('posts')).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf()
  );
  const urls = [
    { loc: new URL('/', site).href, lastmod: posts[0].data.date },
    ...posts.map((p) => ({
      loc: new URL(`/p/${p.id}/`, site).href,
      lastmod: p.data.date,
    })),
  ];
  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls
      .map(
        (u) =>
          `  <url><loc>${u.loc}</loc><lastmod>${u.lastmod
            .toISOString()
            .slice(0, 10)}</lastmod></url>`
      )
      .join('\n') +
    `\n</urlset>`;
  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
}
