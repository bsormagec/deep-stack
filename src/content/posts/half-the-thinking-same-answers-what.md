---
title: "Half the Thinking, Same Answers: What Ember-1 Quietly Admits About Reasoning Models"
dek: "Fireworks Research trained Kimi K3 to stop thinking out loud. The result costs 40% less — and exposes where your agent budget is really going."
date: 2026-09-27
image: "/images/half-the-thinking-same-answers-what.webp"
---
The interesting thing about Ember-1 is not that it is cheaper. It is what the cheapness admits: the industry's flagship reasoning models are burning most of their output on thinking nobody asked for, and in agentic workloads you are being billed for it twice.

Fireworks Research's new model, announced this week, is built on Kimi K3 — the open model that has been having a moment in coding workloads — and trained specifically to reason more efficiently. Same answers, roughly half the tokens. Fireworks says it ran more than 50 training experiments and over 200 evaluations to get there, developing new training algorithms along the way to shorten reasoning without losing accuracy. That is the headline. The confession is in the section titled, with rare bluntness, "The problem: thinking models think too much."

## The tax you pay per turn

Reasoning models like K3 spend the majority of their generated tokens — sometimes more than 90%, according to Fireworks — on internal reasoning rather than the answer itself. On a single request, that is merely expensive. In multi-turn agentic workloads it compounds: every turn replays all prior reasoning back into the model, so context grows roughly quadratically with the number of turns. Long reasoning traces from early turns get re-read — and re-billed — on every subsequent call.

Think about what that means for the agent loops everyone is shipping this year. The model's rambling internal monologue is not a one-time cost. It is a recurring subscription, renewed every tool call, at output-token prices. Fireworks computed benchmark costs using K3's public API pricing — $3 per million uncached input tokens, $0.30 cached, $15 per million output — and output is where the reasoning tokens land. At $15 a million, the thinking is the product and the answer is the byproduct.

Fireworks' observation is simple and, for once, falsifiable: the reasoning K3 emits is far longer than the task requires, and the excess can be removed without touching the answer. Lowering K3's reasoning effort setting did not solve it — low-effort settings gave up too much quality. The model had to learn efficiency through training, including learning from task and environment feedback across math, coding, tool use, and software engineering tasks, in both standalone problems and extended interactions.

## The numbers, for once, are specific

This is where the announcement earns attention instead of a shrug. Across seven benchmarks and two customers' production traffic, Fireworks says K3's reasoning could be shortened by 35–50% without sacrificing accuracy. On Terminal-Bench 2.1, Ember-1 scored 82.0% against K3-max's 80.9% while using 51.9% fewer tokens — a per-run cost reduction of $23.10. On DeepSWE 1.1 it actually beat the base model outright, 75.2% to 66.4%, at 23.7% lower token cost ($126.90 less per run). On SWE-bench Verified it gave up one point (92.2% vs 93.2%) and saved 15.5% of tokens. The live A/B tests on two customers' production coding workloads showed approximately 35% fewer tokens per task at comparable quality, with one internal table showing a 71.3% reduction in reasoning tokens and 39% fewer tokens overall — output tokens falling from 49.3K to 29.9K per task. And in the evaluation Fireworks is clearly proudest of, the model was rolled out silently on the company's own internal coding traffic, and the developers did not notice. "No news is good news," the post says. For a model whose entire value proposition is invisibility, that is the strongest claim in the piece.

## The catch, from the people who would know

Vendor benchmarks are vendor benchmarks, and the Hacker News discussion — 156 points, 79 comments — read the announcement the way builders read vendor benchmarks: as a data point inside a pricing war, not a coronation.

The sharpest comment came from a user comparing K3 against OpenAI's GPT-6 Sol, the mid-tier model OpenAI launched this week at aggressive pricing: Sol at roughly $2 input / $10 output per million versus Kimi's $3 / $15, in their words, with better quality on their internal workloads. Another commenter added that GLM 5.3 offers roughly equivalent performance to K3 at less than half the cost. A third made the point that matters most: without K3, GLM, and DeepSeek in the mix, there would have been no reason for OpenAI to cut Sol's price in the first place.

That sounds like a dismissal of Ember-1. It isn't. It is the actual mechanism of the announcement. Ember-1 exists because K3's pricing made its own inefficiency visible, and Fireworks is selling the fix back at a discount. The open-weight price war is doing what price wars do: compressing margins until the only remaining edge is efficiency, and efficiency is now being productized as a model.

The other thread worth your attention was quieter. One commenter asked the obvious question: why not just use a cheap model with thinking disabled? Another noted that Claude Opus 5 has "started thinking like crazy" in recent days on ordinary workflows. These are the same observation from opposite ends. The industry has two answers to the reasoning-token problem — turn the thinking off, or teach the model to think less — and both are admissions that the default was wrong. The default was: think as much as you want, bill the customer for all of it.

## What this changes for builders

For builders, the takeaway is practical: if you run agents, your biggest lever is no longer which model you pick. It is how much thinking you pay for per turn, because the thinking compounds quadratically while your budget grows linearly.

Audit your agentic loops for reasoning-token bloat the way you would audit a cloud bill. Check what fraction of your output tokens are reasoning versus answers. If your traces show the model re-reading pages of its own deliberation every tool call — and they almost certainly do — you are paying the tax Fireworks just itemized. The cheapest fix is architectural: truncate or summarize reasoning history between turns, cache aggressively, and reach for lower-effort settings on the turns that do not need deliberation. The expensive fix is retraining the model, which is now a product you can buy instead of a research project you fund.

There is a second, stranger implication. Fireworks is kicking off "an ongoing series of specialized models," trained on its serverless training platform, with two-week research-preview access that becomes permanent based on community demand — and it is launching training support so enterprises can build their own token-efficient variants on their own data. The pitch is that the future of open models is not bigger models but narrower ones: small, task-shaped, cheap to run. The Hacker News thread had a perfect illustration sitting right at the top — a commenter who trained a 0.6-billion-parameter Qwen model on 140,000 synthetic samples for English-to-bash translation in a few days of tinkering, and called it the golden age of model training. The frontier labs are racing to make thinking cheaper. The builders are racing to need less of it.

That is the real story of Ember-1. Not a new model. A receipt.

Source: Fireworks AI, "Introducing Ember-1" (fireworks.ai/blog/ember-1); Hacker News discussion (156 points, 79 comments, Sep 27, 2026). Benchmark figures are Fireworks' own, computed at Kimi K3's public API pricing; commenter pricing claims are from the HN thread and unverified.
