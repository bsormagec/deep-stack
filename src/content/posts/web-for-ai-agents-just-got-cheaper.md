---
title: "Web for AI agents just got cheaper than free"
dek: "DonSeTch is a from-scratch Rust tool that fetches, searches, and crawls with no API keys, no accounts, no monthly bill. I read the whole README so you don't have to."
date: 2026-08-28
image: "/images/web-for-ai-agents-just-got-cheaper.webp"
---
Most of the web tools we hand to AI agents have a dirty secret buried in their pricing pages: keys, accounts, token quotas, and a monthly bill that grows the more the agent actually works.

DonSeTch goes the other way. It's a single Rust binary that gives an agent full web research from a local process. Three tools under the hood: [fetch, search, and crawl](https://github.com/dondai44423/donsetch). Zero Python, zero Playwright, zero Selenium, zero API keys, zero accounts. You install it, point your MCP client at it, and the agent just reads the web.

## The honest pitch

The thing I keep coming back to is how lean the whole thing is. It claims to send roughly 3.5k tokens total to the model context across all three tools. That's not a rounding error. Most comparable stacks carry that much in a single schema definition.

## Why Rust actually matters

Not because it's fast or because people love compilers. It's because the whole stack is built from scratch: its own HTTP/2, its own extraction engine, its own PDF parser, its own search aggregator. No reqwest, no hyper, no existing scraping libraries. That's a different kind of dependency hygiene than most tools in this space, and it shows up in how small and how fast the binary is.

The fun detail is the TLS story. Instead of faking a Chrome fingerprint with a rotating table, it drives Chrome's own BoringSSL natively. The ClientHello packet your agent sends is Chrome's ClientHello. Bot detectors that match against a static fingerprint table go stale fast, and the README leans on that: the fingerprint is emergent from the real engine, not a faked list that rots.

## No free lunch

The gotchas page is refreshingly honest. OCR and semantic reranking aren't in the default build because ONNX Runtime's C++ global constructors can deadlock on ARM. Interactive captchas like hCaptcha, reCAPTCHA, and Turnstile checkboxes are a deliberate dead end. robots.txt is respected by default for crawls. And it's not built for mass scraping; it's built for agentic research.

## The Firecrawl head to head

What pulled me in most is the live comparison against Firecrawl, the paid cloud API. Firecrawl explicitly refuses LinkedIn and Reddit with a we do not support this site message. DonSeTch fetches both and returns real content. On a Wikipedia page, token count drops 16x. On an arXiv PDF, a 32-second, 71KB operation becomes a 1.4-second, 16KB one, roughly 22x faster and over 4x smaller. That's not a small efficiency win; that's a different operating cost for an agent that reads all day.

The crawl numbers tell the same story. Both tools missed the dependency-injection pages in the benchmark, but they failed differently. Firecrawl dumped a pile of unrelated content after spending 2.5x longer. DonSeTch came back fast, small, and honest, with low quality scores admitting the pages weren't relevant. A tool that tells you it failed is more useful than one that hands you a pile of noise on a miss.

## The shape of things

I don't have a stack to deploy this onto right now, but the pattern feels like the direction of travel. The web tools we give agents have been creeping toward centralized paid APIs. The counter-move is a local, keyless, from-scratch binary that does the same job for the cost of a compile. Whether DonSeTch wins or not, that direction is worth watching.

[DonSeTch on GitHub](https://github.com/dondai44423/donsetch)
