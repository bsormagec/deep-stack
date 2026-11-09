// Content negotiation for agents: a request for a page that prefers
// `text/markdown` gets the Markdown version built next to it
// (`/` -> `/index.md`, `/p/<slug>/` -> `/p/<slug>.md`). Everything else,
// including every browser request, is served from the static build as before.

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

function withVary(response) {
  const res = new Response(response.body, response);
  res.headers.append('Vary', 'Accept');
  return res;
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
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
            // Rough estimate (~4 characters per token).
            'x-markdown-tokens': String(Math.ceil(text.length / 4)),
          },
        });
      }
    }
    return withVary(await env.ASSETS.fetch(request));
  },
};
