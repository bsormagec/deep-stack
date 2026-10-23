---
title: "A Thousand Tokens a Second, Written All at Once"
dek: "## The speed is the discount. The tokens cost what tokens cost."
date: 2026-10-19
image: "/images/a-thousand-tokens-a-second-written.webp"
---
The interesting thing about Mercury 3 is not that it is fast. It is how it is fast. Every mainstream language model writes the way a typewriter does — one token, then the next, each step waiting on the last. Inception's Mercury line generates text the way diffusion image models generate pictures: a rough version of the whole answer appears at once, then gets revised in parallel passes until it settles. Mercury 3, announced by Inception on October 19 and on the Hacker News front page that afternoon at number 3 with 70 points and 22 comments at fetch time, is the company's claim that this approach now scales.

That sounds like an architecture curiosity. It isn't. The one-token-at-a-time design is not a law of language. It is an inheritance — and it is the reason inference speed has been bought the expensive way for three years: bigger clusters, speculative decoding, exotic caching, all to make a sequential process less sequential. A model that skips the sequence skips part of that bill.

## What Inception says shipped

Mercury 3 is Inception's fourth release since Mercury 1 in June 2025, according to the company's launch release. Mercury 2 added reasoning to the diffusion design; Mercury 2.5 added tunable reasoning and a 260,000-token context window. Mercury 3 expands the context window to 1 million tokens and is, per Inception, more than 40 times the size of Mercury 1 — while running at comparable speed, above 1,000 tokens per second on widely available NVIDIA GPUs. Coverage of the launch put the specific figure at 1,068 tokens per second.

The quality claim is the aggressive part. Inception says Mercury 3 outperforms OpenAI's GPT-6 Luna and Anthropic's Claude Haiku 5.5 — the two speed-optimized frontier models it names — across a range of benchmarks, while running 4 to 8 times faster. Co-founder Stefano Ermon's framing in the release is that the limits to scaling diffusion are "compute and data, not fundamental algorithmic barriers," and that the company has already started training the next model.

Every one of those numbers is Inception's. The benchmark claim in the release carries an asterisk, the speed figure is vendor-measured on the vendor's chosen hardware, and the web-agent result making the rounds — Mercury 3 completing 50% of 50 live Mind2Web navigation tasks, described as significantly ahead of GPT-6.1 Sol at the same token volume and step count — comes from Inception's own production harness. None of that makes the claims false. It makes them unverified, which is a different and more ordinary problem: the same problem every launch benchmark has on day one.

## Where the speed actually pays

Latency is not a vanity metric in an agent loop. It is a multiplier. An agent that makes thirty model calls to finish one task pays the model's response time thirty times, and pays it again in user patience, which is the budget that runs out first. This is why the early-customer list Inception published is more informative than its benchmark table: browser-use agents, real-time search agents, interactive education, customer support — workloads where the model is called repeatedly, inside a session, while someone waits.

The partner quotes point the same way. General Learning's CTO said feedback to students — hints, marked answers, definitions — now comes back "in about a second," at quality he described as as good as or better than the models they ran before. Octen AI, building for smart glasses, reported a median generation time of 0.9 seconds and a median end-to-end response of 2.2 seconds in its Sense API tests. Partner quotes in a launch release are advertising, and should be read as such. But the shape of the claim is checkable in an afternoon: this is an OpenAI-compatible API, and Inception's models page offers new accounts 100 million free tokens. A builder does not have to believe the Pareto frontier chart. They have to run their own thirty-call loop against it.

## The price is ordinary, and that is the point

Here is the number that keeps the story honest. Mercury 3 lists at $0.20 per million input tokens and $0.70 per million output tokens, per Inception's models page — with a 50% launch discount bringing those to $0.10 and $0.35, and cached input at $0.02, or $0.01 at the promotional rate. That is not a price disruption. Anthropic's Haiku 5.5, one of the models Inception benchmarks against, launched at $0.10/$0.50 per million tokens for prompts up to 100K tokens, per Anthropic's launch pricing. At list price, Mercury 3's output actually costs more per token than Haiku's.

So the offer is not cheaper tokens. The offer is the same tokens, four to eight times sooner, if the speed claim holds — and in latency-bound work, sooner is a cost line of its own: fewer seconds of GPU reservation per task, more agent attempts inside the same wall-clock budget, a support session that ends before the customer leaves. The launch discount will expire. The 1,068 tokens per second, if real on your workload, does not.

There is a second, quieter catch in the same models page. Mercury 2 and Mercury 2.5 are "no longer available to new users" as of this launch, and existing customers keep access only until November 15, 2026, unless they are on enterprise agreements. Four releases in sixteen months, with the previous two already on a sunset clock, is a migration cadence builders should price in. And Mercury 3 is API-only — there are no weights to download, no local deployment, no version you can pin and run on your own hardware when the sunset notice arrives. The speed is rented. For a workload where latency is the product, that may be the right trade. It is still a trade, and it should be made with open eyes.

For builders, the takeaway is practical: treat Mercury 3 as a latency experiment, not a migration. Take the free tokens, replay your slowest agent loop against it, and measure two things the launch chart does not — quality on your tasks, and tokens per second on your prompts, not Inception's. If both hold, the win is not the model. It is the thirty waiting periods your product no longer has.

Diffusion did not win today. But it stopped being a demo.

Source: [Inception Launches Mercury 3, Setting a New Pareto Frontier in Speed and Intelligence](https://www.businesswire.com/news/home/20261019090400/en/Inception-Launches-Mercury-3-Setting-a-New-Pareto-Frontier-in-Speed-and-Intelligence)
