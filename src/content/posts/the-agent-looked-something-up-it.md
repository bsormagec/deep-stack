---
title: "The agent looked something up. It cost you."
dek: "Cloudflare's Web Search API turns web search into a metered utility for AI agents. The forty-to-one spread between the cheapest and the priciest way to ask a question is the whole story. The interesting thing about Cloudflare's new Web Search API is not that AI agents can now search the web through a gateway. They could already do that — through a dozen search APIs, or by scraping, or by having the model guess a URL and hoping the fetch lands. What changed on October 2 is quieter and more important: Cloudflare put a price sheet under the search box, and the cheapest way for an agent to look something up costs forty times less than the priciest one."
date: 2026-10-05
image: "/images/the-agent-looked-something-up-it.webp"
---
The announcement itself is straightforward. Cloudflare added a Web Search API to its AI Gateway, currently in open beta. One endpoint — or a Workers binding — and three search providers at launch: Ceramic as the default, Exa, and Linkup. Every provider returns the same shape (title, URL, description), so switching between them is a single parameter. Requests flow through the same AI Gateway logs as your inference calls and draw down your AI Gateway credits, billed at each provider's list price with no markup from Cloudflare. If you already have a relationship with a provider, you can bring your own key and skip Cloudflare's billing entirely.

Cloudflare's own framing of the problem is refreshingly blunt. When an agent needs a current page, it usually guesses the address and fires off a fetch — which is why fetches sometimes come back 404. Search replaces guessing with querying. The model, frozen at its training cutoff, gets fresh structured snippets injected into the context it reads. The story is sitting at 338 points and 167 comments on Hacker News, which for an API launch in a crowded week says something: builders have bills to argue about here.

## The price sheet

Digital Applied's comparison, built from each vendor's own pricing pages and read on October 3, 2026, lays out fifteen routes on a single axis: US dollars per 1,000 searches. Through Cloudflare the menu reads Ceramic $0.25, Linkup $5, Exa $7. The model-native alternatives charge OpenAI's web_search tool $10, Anthropic's web search tool $10, Google's Gemini 3.x grounding $14 per 1,000 queries, Gemini 2.5 at $35 per 1,000 grounded prompts, and Microsoft's Grounding with Bing $14. Everyone else sits in between: Tavily $8 basic or $16 advanced, Brave $5, Perplexity $5 ($1 for Fast), Parallel $1 to $5 depending on mode.

Translate that into a running bill and the spread stops being academic. An agent making 10,000 searches a day — a busy research agent, a support bot with live documentation lookups — pays $2.50 a day on the cheapest route and $100 a day on a $10-per-thousand one, before any other charges. That is a $35,000-a-year difference between two rows of the same table. For a feature that is, functionally, "the agent reads the internet," the variance is startling.

## The catch

That sounds like Cloudflare opened the cheapest supermarket in town. It isn't — or rather, the headline price is not the bill. A price per thousand hides what one unit buys, and four differences move the real cost.

First, tokens on top. OpenAI and Anthropic bill the search call, then bill the retrieved content as model input tokens on top. OpenAI even bills a fixed block of 8,000 input tokens per search call on two of its smaller models, and caps the search context at 128K tokens. The $10-per-thousand is the entry fee; the tokens are the bar tab.

Second, what counts as one unit. Google's Gemini 3.x charges per search query the model executes, and one prompt can run several. Gemini 2.5 charges per grounded prompt, however many searches it takes. An agent that fans out ten queries per task pays ten units on one route and one on the other.

Third, results per unit. Cloudflare returns at most 10 results per request; Exa charges $1 per 1,000 for each result above 10. A research agent that pulls 30 results per question pays a very different bill on each route. Tavily does not bill searches at all — it bills credits, one for basic and two for advanced. Anthropic does not bill a search that fails, and counts one use per search however many results it returns.

Fourth, the terms on the exact route you take. Cloudflare lists Zero Data Retention for Ceramic and Linkup through the gateway — but not for Exa. Buy the same providers directly and the terms change: Linkup's zero retention lives only on its Enterprise plan, and Ceramic asks you to contact them. The same provider can carry different terms depending on who sells it to you. For a regulated team, the data terms can disqualify an option before the price ever matters.

There is a fifth catch hiding in the beta label. The native server tool — the version where the model calls web search on its own instead of your code defining a search function and calling the API from it — is marked "coming soon." For now you do the wiring yourself. Cloudflare also has not published rate limits for the API yet. Price is only half the choice for an agent in production; rate limits decide whether it survives a busy hour.

## The toll booth economy

The part of the announcement that deserves a second read is the crawler clause. All three providers committed to Cloudflare's verified-bot standards: crawlers identify themselves, respect robots.txt, and every search response links back to the source of the crawled content. Zero Data Retention is on the table for Ceramic and Linkup through the gateway.

This is the same Cloudflare that spent the year building the infrastructure to charge AI for content: Pay Per Crawl in beta, and the Monetization Gateway with Pay Per Use — reported usage of content, with Cloudflare handling enrollment, billing, and payment. In July, Cloudflare described Ceramic as a Pay Per Use partner that pays content sites whenever their content appears in its search results. Read that twice. The search provider selling you the cheapest queries on this price sheet is also the one paying publishers when their pages show up in the results. The toll booth and the compensation desk are being built by the same company, at the same time.

Meanwhile, the old world is closing. Microsoft retired its public Bing Search APIs on August 11, 2025; the replacement, Grounding with Bing, works only inside Azure AI Foundry and AI Search, and its outputs cannot be used directly in other applications. One door shut; several metered doors opened. Reddit's API squeeze on agents was already a preview of the pattern.

For builders, the takeaway is practical: price your own query log before you pick. Take a week of your agent's real searches — how many queries, how many results, how many tokens — and run them through two or three of these rows. The cheapest headline is rarely the cheapest bill. If you are already on Cloudflare and running high volume on any model, the gateway route with Ceramic is the cheapest raw-result pipe on the board, with Exa worth testing for quality. If you run one model vendor at low volume and want the least code, the vendor's built-in tool wins on simplicity. If results must be stored or reused, check the plan's storage rights first. And if regulated data is in scope, confirm zero retention on the exact route — not on the provider's marketing page, but on the route you will actually pay for.

The search box was never free. Now it sends you a bill.

Source: [Introducing Web Search API](https://developers.cloudflare.com/changelog/post/2026-10-02-introducing-web-search-api/)
