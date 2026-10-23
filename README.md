# Deep Stack by Burak

Static site (Astro) for Deep Stack — AI tools, local models, and the honest cost
of building with them. Deployed to Vercel from this repo: every push to `main`
publishes automatically. No dashboards, no publish-time verification codes.

## How a post ships

1. Add a Markdown file to `src/content/posts/<slug>.md` with frontmatter
   (title, dek, date, image). The post goes live at `/p/<slug>/`.
2. Add its header image as base64 text at `public/images/<slug>.webp.b64`
   (images travel as text because the publishing automation cannot push binary
   files; `scripts/decode-images.mjs` restores the real `.webp` at build time).
3. Push. Vercel builds and the post is live.

Note: `package-lock.json` is intentionally not tracked yet (same transfer
limit); Vercel resolves dependencies on each build.
