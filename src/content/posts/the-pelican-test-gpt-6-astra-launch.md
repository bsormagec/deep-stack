---
title: "The pelican test: what GPT-6 Astra's launch really tells us"
dek: "49.2B prompt tokens vs 259M completions. A 92% cache hit rate. And a pelican on a bicycle that embarrasses every other model at the same price. The numbers around OpenAI's new flagship matter more than the benchmarks."
date: 2026-09-05
image: "/images/the-pelican-test-gpt-6-astra-launch.webp"
---
The most useful benchmark released this week is a pelican riding a bicycle.

GPT-6 Astra landed on OpenRouter on September 4. OpenAI's flagship for "demanding end-to-end work": deep research, software engineering, long-horizon agentic tasks involving computer and browser use. One million tokens of context, $10 per million input tokens, $50 per million output. The specs are fine. The benchmark scores are strong. But the interesting stuff is in the traffic data and in a comparison grid Simon Willison published of models drawing the same silly SVG prompt.

## The token ratio tells you what the model is for

First day of traffic on OpenRouter: 49.2 billion prompt tokens, 259 million completion tokens. Let that ratio sink in. For every token these models write, they read roughly 190.

That is not a chatbot pattern. Chat is maybe 5:1 prompt-to-completion. This is an agent pattern: long context in, small decisions out. Codex and Hermes Agent are the top two apps driving traffic to the model, and it shows. Agents stuff the context with repo contents, docs, browser state, then emit short actions.

The pricing is built for exactly this. Cache reads at $1/M, and OpenRouter's weighted average shows customers actually paying $2.34/M input against a $10 sticker, with cache hit rates around 92% on the primary provider. The listed price is a fiction for most workloads. The cache is the real unit of cost. When your agent loop re-reads the same context on every step, you pay a dollar, not ten, and the output price is where the margin lives.

This is the first flagship launch I can remember where the economics quietly say: we expect machines to be the primary customer.

## The pelican grid beats GPQA

Simon Willison ran his now-traditional benchmark, "generate an SVG of a pelican riding a bicycle", across Astra and the 5.6 family (Sol, Terra, Luna) at different reasoning levels. The results are genuinely striking. Astra at low reasoning, on a budget of a tenth of a cent, produces something closer to professional illustration than anything its competitors manage at the same price. One commenter said it looked like a professional artist made it, while the others looked like kindergartners drew them. The front fork curve is right. The occlusion of crank and leg is right at medium and max reasoning. And the bikes always come out turquoise with the sun in the top right corner, which tells you something about Astra's style consistency: it does things a certain way until you prompt it otherwise.

The obligatory debate kicked off immediately. Is this emergent capability, or "benchmaxxing", i.e. the model trained on a benchmark that became famous? Some commenters point out that Luna without reasoning beats the state of the art from eighteen months ago on the same prompt, which smells like training data. Others counter that general SVG training improves everything. Both can be true, and it barely matters for the practical takeaway.

What the pelican grid does that GPQA cannot: it shows end-to-end output quality at a fixed budget. Benchmarks measure capability in a vacuum. The pelican measures what you actually get for ten cents. For builders, that is the number that matters. "Better than 96% of models" on an intelligence index is a press release. A professional-looking SVG for a tenth of a cent is a purchasing decision.

## Routing is now a real cost lever

The OpenRouter provider table is where the practical money sits. OpenAI Flex serves the model at $5/$25 with 57 tokens/sec. OpenAI Fast cuts latency to 2.5 seconds at $20/$100. Azure trails at 25 tps. And tool-call error rates differ by an order of magnitude: 0.22% on Azure US, 5.23% on OpenAI proper. For agent workloads, where one bad tool call can cascade, that spread matters more than throughput.

When you run agents around the clock, you are not picking a model. You are picking a provider, a routing mode, and a caching strategy. The model is a commodity layer at this point. The infrastructure decisions around it are the actual engineering.

## What I am taking from this launch

Three things.

First, judge models by usage economics, not leaderboards. Prompt-to-completion ratios, cache hit rates, effective per-token price: these tell you what a model is actually for. Astra's 190:1 read:write ratio is the clearest signal yet that the agent era runs on reading.

Second, silly benchmarks are underrated. The pelican grid is reproducible, cost-fixed, and shows artifacts instead of scores. It survived model generations precisely because it cannot be gamed into meaninglessness, and when a model makes a pelican look like art, that transfers to real output quality in ways that HLE scores do not.

Third, the agent loop is where the cost lives. 49.2B tokens read in one day means the bottleneck is not generation, it is context. If you are building on these models, your infrastructure work is caching, prompt compression, and provider routing. Prompt engineering is the minor part.

The launch noise around Astra is about benchmarks and capability claims. The actual story is in the token counters and the pelicans. OpenAI built a model priced for machines that read a lot and write a little, and the traffic data says the machines showed up.

Source: [GPT-6 Astra on OpenRouter](https://openrouter.ai/openai/gpt-6-astra)
