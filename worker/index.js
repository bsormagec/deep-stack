// Content negotiation for agents: a request for a page that prefers
// `text/markdown` gets the Markdown version built next to it
// (`/` -> `/index.md`, `/p/<slug>/` -> `/p/<slug>.md`). Everything else,
// including every browser request, is served from the static build as before.
// Also serves the RFC 9727 API catalog and adds discovery Link headers
// (RFC 8288) to the homepage.

const SIGNALS = 'search=yes, ai-input=yes, ai-train=no'; // same as public/robots.txt

// Machine-readable resources advertised from the homepage.
const HOME_LINKS = [
  '</.well-known/api-catalog>; rel="api-catalog"',
  '</openapi.json>; rel="service-desc"; type="application/openapi+json"',
  '</api/>; rel="service-doc"; type="text/html"',
  '</index.md>; rel="alternate"; type="text/markdown"',
  '</feed>; rel="alternate"; type="application/rss+xml"',
].join(', ');

function apiCatalog(origin) {
  return JSON.stringify({
    linkset: [
      {
        anchor: `${origin}/`,
        'service-desc': [{ href: `${origin}/openapi.json`, type: 'application/openapi+json' }],
        'service-doc': [{ href: `${origin}/api/`, type: 'text/html' }],
      },
    ],
  }, null, 2);
}

function quality(accept, type) {
  let best = -1;
  for (const part of accept.split(',')) {
    const [media, ...params] = part.trim().toLowerCase().split(';');
    if (media.trim() !== type) continue;
    const q = params.map((p) => p.trim()).find((p) => p.startsWith('q='));
    best = Math.max(best, q ? Number(q.slice(2)) || 0 : 1);
  }
  return best;
}

function wantsMarkdown(request) {
  const accept = request.headers.get('Accept') || '';
  const md = quality(accept, 'text/markdown');
  return md > 0 && md >= quality(accept, 'text/html');
}

function markdownPath(pathname) {
  if (pathname === '/' || pathname === '/index.html') return '/index.md';
  const m = pathname.match(/^\/p\/([^/.]+)\/?(?:index\.html)?$/);
  return m ? `/p/${m[1]}.md` : null;
}

function withVary(response, links) {
  const res = new Response(response.body, response);
  res.headers.append('Vary', 'Accept');
  if (links) res.headers.append('Link', links);
  return res;
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === '/.well-known/api-catalog') {
      return new Response(request.method === 'HEAD' ? null : apiCatalog(url.origin), {
        headers: {
          'Content-Type': 'application/linkset+json; profile="https://www.rfc-editor.org/info/rfc9727"',
          'Link': '</.well-known/api-catalog>; rel="api-catalog"',
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 'public, max-age=3600',
        },
      });
    }
    const mdPath = markdownPath(url.pathname);
    if (!mdPath) return env.ASSETS.fetch(request);

    if (wantsMarkdown(request) && (request.method === 'GET' || request.method === 'HEAD')) {
      const asset = await env.ASSETS.fetch(new URL(mdPath, url));
      if (asset.ok) {
        const text = await asset.text();
        return new Response(request.method === 'HEAD' ? null : text, {
          headers: {
            'Content-Type': 'text/markdown; charset=utf-8',
            'Vary': 'Accept',
            'Cache-Control': 'public, max-age=0, must-revalidate',
            'Content-Signal': SIGNALS,
            // Rough estimate (~4 characters per token).
            'x-markdown-tokens': String(Math.ceil(text.length / 4)),
            ...(mdPath === '/index.md' && { 'Link': HOME_LINKS }),
          },
        });
      }
    }
    return withVary(await env.ASSETS.fetch(request), mdPath === '/index.md' ? HOME_LINKS : null);
  },
};
