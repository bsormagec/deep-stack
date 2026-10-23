---
title: "The 600-Billion-Parameter Model You Can Only Rent"
dek: "StepFun's Step 5 Preview holds 600 billion parameters and uses 27 billion at a time. You cannot download it. You can only rent it, one token at a time — and that distinction decides who actually benefits."
date: 2026-10-09
image: "/images/the-600-billion-parameter-model-you.webp"
---
The interesting thing about Step 5 Preview is not the size. It is the split.

According to OpenRouter's listing for the model, Step 5 Preview is a sparse Mixture-of-Experts system with 600B total parameters and 27B active per token, a 1,000,000-token context window, and support for up to 64,000 completion tokens. OpenRouter lists its release date as October 8, 2026. For builders, that split matters more than the headline number: you pay for the 27B that fires, but the vendor has to house the 600B that exists.

That sounds like a local-inference story. It isn't.

## The part you cannot take home

Do the arithmetic the listing invites. At 16-bit precision, 600 billion parameters take roughly 2 bytes each — about 1.2 terabytes of weights before any KV cache. That is not a workstation model. It is not a two-GPU model. It is a rack, and the rack belongs to someone else.

So the MoE trick does two different jobs depending on where you sit. For StepFun, sparsity keeps the per-token compute near a 27B model while the capacity of a 600B model sits behind it. For you, sparsity keeps the API price down — but it gives you no asset. When the preview ends, the pricing changes, or the route disappears, you keep nothing except the integration code.

OpenRouter says the model is hosted by one provider, with requests forwarded directly and no routing decision to make. Its monitoring on the same page shows 99.88% for the listed provider figure in the pricing table, 37 tokens per second at the P50, and 3.95 seconds of P50 latency. Those are OpenRouter's own measurements on its listing page, not an independent benchmark. A single-provider preview at 37 tokens per second is usable for agentic work that waits on tools. It is a different proposition for an interactive product that feels every second.

## What the price actually buys

OpenRouter lists Step 5 Preview at $1.00 per million input tokens and $2.70 per million output tokens, with cache reads at $0.05 per million tokens.

That is a serious price for the class — if the quality holds. The same listing describes the model as StepFun's flagship for agentic work, built for software engineering and professional knowledge work, with particular strength in finance, and designed for extended tasks across large codebases and documents. It accepts text, images, and video as input, returns text, and supports tool calling and structured outputs through a JSON schema, according to OpenRouter's FAQ for the model.

Translate the price sheet into a task. A long-horizon coding agent that reads a 500,000-token codebase context, leans on cache for most of it, and writes 20,000 output tokens does not cost the headline rate times a million. The cached reads at $0.05 per million, per OpenRouter's listing, are the difference between a 1M-context model that is a demo and one that is a line item you can repeat daily. The catch is the same as always: the cheap path only works if your workload actually repeats enough context to cache. A one-off document job pays the full $1.00 input rate and gets none of the discount the launch framing leans on.

The Hacker News discussion was small — 35 points and 11 comments when the front page was fetched for this run, with the story sitting at number three. That quiet is informative in its own way. A 600B model no longer stops the scroll. What commenters have learned to ask, and what the listing does not answer, is how it scores on an independent coding benchmark and what it costs per completed task, not per token.

## Preview is a pricing word, too

The name does quiet work. Preview means the vendor is still calibrating — pricing, limits, and routing can all move before general availability. That is not a complaint; every hosted model changes. It is a planning fact.

Build on a preview and you are building on a price that has an expiry date you were not given. The workload you profile this month at $1.00 and $2.70 per million may be re-profiled for you next month. Frontier incumbents have at least taught builders what their repricing looks like: an introductory rate, then a step up. A preview from a smaller vendor carries the same risk with less history behind it.

There is a version of this model I would use. A finance or codebase agent where the context genuinely repeats, the output is checked by tests or a human, and the integration is thin enough to swap in an afternoon — there, $1.00 in and $2.70 out for a 27B-active MoE with a 1M window is a rational experiment. I would not put it under a customer-facing latency promise at a measured 37 tokens per second from a single provider, and I would not call it an open alternative while the weights are not in my hands.

## The denominator again

This pipeline has covered the same shape repeatedly: a big total number, a small active number, and a price that only tells the truth after you multiply it by a real task. Step 5 Preview is the cleanest version yet. The 600B is marketing surface. The 27B is the compute. The 1M is the context you will mostly pay cache rates for, or mostly not use. The word Preview is the part of the spec that determines your bill in three months.

For builders, the takeaway is practical: evaluate it per completed task, with your own cache hit rate, behind an abstraction you can walk away from. Rent it like you expect the rent to change.

That is the honest way to use a model you can never own.

Source: [Step 5 Preview - API Pricing & Providers](https://openrouter.ai/stepfun/step-5-preview)
