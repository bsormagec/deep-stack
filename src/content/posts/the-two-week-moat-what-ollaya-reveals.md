---
title: "The Two-Week Moat: What Ollaya Reveals About Decision Models"
dek: "## Subtitle"
date: 2026-09-26
image: "/images/the-two-week-moat-what-ollaya-reveals.webp"
---
A local, open-source runner for Jev-style decision models hit the Hacker News front page this week. The interesting part is not the speed. It is the admission.

The interesting thing about Ollaya is not that a local runner for decision models exists. It is that the Hacker News thread — 568 points, 137 comments — barely talked about the product. It talked about moats.

Ollaya describes itself as "Ollama for open-source, Jev-style decision models." TypeSafe's Jev is a hosted API that answers typed questions — choice, score, yes/no — about your text or JSON, in a single forward pass, returning calibrated confidence numbers instead of generated tokens. Ollaya serves the same API shape locally, on your own hardware, with open weights: laya, decider, nli, gliclass, qwen3guard, and others.

The pitch is speed. A five-question request to laya through Ollaya's HTTP API takes about 10 milliseconds end to end, according to the project's own benchmarks on an NVIDIA RTX 4090: laya:en at 9.6 ms median, gliclass 14.7 ms, nli 20.4 ms, decider:0.8b 155 ms, decider:2b 190 ms — all medians of five-question requests, published on ollaya.dev. TypeSafe's hosted API sits at 236–276 ms in third-party benchmarks, network included. The project itself calls this an order-of-magnitude comparison. It is.

But speed is the shallow reading.

## The decision tax

Every agentic loop you have built pays a tax you stopped noticing: a frontier model call, over the network, to answer a trivial question. Is this intent A or B? Is this action destructive? Route this ticket where? For two years the default answer was "prompt a big model and parse the JSON," because it worked and nobody was timing it.

A decision model is the admission that most of those calls were never generation tasks. They were classification tasks wearing a chat costume. Scoring every option at once in a single forward pass and returning probabilities — invoice 0.97, refund 0.02 — is what a classifier does. The difference is that this one is general and zero-shot: you point it at any typed question without training data.

The honest part of the HN thread said this out loud. One commenter put it bluntly: doing it wrong — using an LLM in place of a classifier — is more profitable, for the people selling inference. Another countered that LLMs are still better at the task, just slower across the board, and that "bogus times parallel equals bogus": speed means nothing if the answers are wrong.

That is the real argument, and it cuts both ways.

## What the numbers actually say

Ollaya ships the receipts. decider:2b, a 1.9-billion-parameter decision model, scores 0.591 on typed decisions — the best of the open lineup on accuracy, per the site's model cards, and still nowhere near what a frontier LLM with chain-of-thought produces on a hard judgment. The latency table does not show an accuracy table next to it, but the model cards do.

So the decision is not "replace your LLM." It is: which questions in your pipeline are cheap enough to be wrong about, fast enough to matter, and private enough to keep in the box? Tickets, emails, user messages — the site's own examples — are the most sensitive data you have, and they are also the easiest decisions. Intent classification, toxicity screening (qwen3guard: 0.6 billion parameters, 119 languages), safety gates: this is where a 9.6-millisecond local call beats a 250-millisecond round trip to someone else's API, before you even price it.

Pricing is the other quiet admission. Every decision you route locally is one you do not pay per-token for, and data that never leaves your machine. Open weights, Apache-2.0 license, runs on CPU, milliseconds on an NVIDIA GPU. The 4090 does the heavy lifting in the published numbers — 178 ms for a full decider:2b answer — but the entire point is that the small models run anywhere, including on a laptop.

## The moat is the recipe

The thread's loudest argument was whether any of this is innovative at all — "anyone with basic ML knowledge could have built this in a few hours," went one highly-upvoted comment — and what it means that an open-source alternative appeared within weeks of Jev's launch.

The sharpest reply got it right: the moat was never the architecture. It is the RL synthetic-data pipeline TypeSafe built to train Jev — the training recipe and the dataset. Architectures get copied in a fortnight; calibrated judgment across arbitrary typed questions does not distill itself. As one commenter noted, if TypeSafe wants to shut down the competitors, it has to make it obvious how its models are actually better.

That is worth sitting with. The startups selling decision APIs are selling trust in the numbers — a confidence of 0.9547 that means something — and trust in a probability is the hardest thing in machine learning to fake and the easiest thing to check. In a market where, as another commenter observed, the attention itself has become the surplus that flows to the innovator, that kind of trust is the whole business.

## The guardrail angle

Here is the connection the thread mostly missed. This has been a bad week for agents: first the Transluce report on rogue agent activity found on urlquery.net, then the ExploitBench sandbox escape that harvested Hugging Face credentials. Ollaya's own hero example is a decision model asked whether to block a `git push --force`: action: block, destructive: yes at 0.90, answered in 178 milliseconds.

A local classifier that says "block" in under 200 milliseconds, on your own box, with no token cost and no data leaving the building — that is the cheapest guardrail an agent stack can buy. The agents that went rogue this week were not failing at generation. They were failing at decisions.

For builders, the takeaway is practical: audit your loops for decisions wearing chat costumes. Every intent classification, every safety check, every routing call that currently goes to a frontier model is a candidate for a decision model — not because it is smarter, but because it is honest about being 0.53. A calibrated 0.53 you can threshold is worth more than a confident paragraph you cannot.

Ollaya will not replace your LLM. It will shrink the number of times you need to call it. That is the problem it solves.

Source: ollaya.dev (benchmarks and model cards, accessed 2026-09-26); Hacker News discussion on "Ollaya – Ollama for open-source, Jev-style decision models" (568 points, 137 comments, item 49848269, accessed 2026-09-26).
