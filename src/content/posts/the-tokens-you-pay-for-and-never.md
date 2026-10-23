---
title: "The Tokens You Pay For and Never Read"
dek: "Fireworks' Ember-1 cuts reasoning tokens 35–50% — and shows where the quadratic tax in agentic loops was hiding all along."
date: 2026-09-28
image: "/images/the-tokens-you-pay-for-and-never.webp"
---
The interesting thing about Ember-1 is not that a model got cheaper. It is what the cheaper model reveals about how much you were overpaying all along.

Fireworks Research launched Ember-1 this week: a version of Kimi K3 that, according to Fireworks' own testing, produces the same answers while emitting 35–50% fewer reasoning tokens. Terminal Bench 2.1: 82.0% pass rate versus 80.9% for full Kimi K3, at 51.9% fewer tokens. SWE-bench Verified: 92.2% versus 93.2%, at 15.5% fewer tokens. In live A/B tests on two customers' production coding workloads, roughly 35% fewer tokens per task at comparable quality — and one of those customers is now moving Ember-1 into live production to replace the base model entirely. (All figures from Fireworks' launch post; HN story reached ~508 points with ~225 comments the morning of September 28.)

The mechanism behind the waste is worth understanding, because it is a tax most agentic builders pay without ever seeing the invoice. Reasoning models like K3 spend the majority of their generated tokens — sometimes more than 90%, per Fireworks — on internal reasoning rather than on the answer itself. That is expensive on a single request. In a multi-turn agentic workload it gets much worse: every turn replays all prior reasoning back into the model, so context grows roughly quadratically with the number of turns. Long reasoning traces from early turns get re-read, and re-billed, on every subsequent call. You are not paying for thinking. You are paying to re-read the thinking.

The obvious lever — turning down K3's reasoning effort — did not work. Fireworks says lower effort settings gave up too much quality, so the team trained the efficiency in instead: more than 50 training experiments and over 200 evaluations, run on their own serverless training infrastructure, on a curriculum of math, coding, tool use, and software engineering with environment feedback. The model learned to keep the reasoning that matters — the self-reflection that recovers from mistakes — while escaping unproductive loops. On failed attempts, the internalized behavior shows "restrained token use," Fireworks writes, which is a polite way of saying the model learned to stop rambling before it failed.

That sounds like the industry finally fixing the cost disease. It is, and it isn't.

The catch comes in three parts. First, Ember-1 is a study in efficiency, not a step forward in capability. It knows what Kimi K3 knows. If you were waiting for a model that could do something new, this is not it; this is a model that does the same things for roughly half the tokens.

Second, treat the benchmark theater with care. Fireworks leans on its own newly introduced "Specialized Intelligence Index" and reports a Pareto frontier on Bedside Bench, a physician-validated clinical benchmark, against GPT-5.6 Sol, GPT-6 Astra, and Claude Opus 5. Vendor-run benchmarks on vendor-defined indexes are marketing until someone else reproduces them. The more honest signal in the post is the quiet one: Fireworks dogfooded Ember-1 on its own developers' internal coding traffic before any customer saw it, and nobody noticed the switch. For a product whose whole pitch is "same answers, fewer tokens," an invisible rollout is the strongest evidence available.

Third, Ember-1 is a Research Preview: two weeks of serverless access, permanent only "based on community demand," with the pricing not yet announced — and it arrives alongside a pitch for training support so enterprises can build their own token-efficient Ember variants on Fireworks' platform. The efficient model is also a funnel into the training platform. There is nothing wrong with that, but notice the structure: the company that taught you thinking was expensive is now the company you rent the cure from.

The Hacker News discussion drifted, as it tends to, into a do-it-yourself tangent — one commenter trained a tiny model for English-to-bash translation from 140,000 synthetic examples and got a good result for a few hours of active time. The skeptics in the thread asked the right question: would it take 140,000 queries to amortize the cost of generating the training data? Fireworks' answer is the same math at industrial scale. Fifty-plus training experiments is a real cost; it amortizes across millions of inference calls, and it amortizes only if your workloads actually generate enough volume. For a personal coding agent running a few hundred tasks a week, the old model was probably fine. For fleet-scale agentic workloads replaying reasoning traces thousands of times a day, the quadratic tax was the largest line item on the bill.

For builders, the takeaway is practical: if your agent bills reasoning on every turn, the first optimization is not the effort knob — that lever gives up quality faster than it saves money. It is a model whose training internalized the discipline of not thinking in circles. Check whether your provider offers one; this is the first of a series, and every lab is about to ship the same idea. Then measure your own replay ratio before and after, because vendor percentages are averages and your traces are yours.

Ember-1 is not a breakthrough. It is the bill, itemized, with one line crossed out.

Source: Fireworks, "Introducing Ember-1" (fireworks.ai/blog/ember-1); HN discussion (~508 pts, ~225 comments, Sep 28, 2026).
