---
title: "The Cheap Model That Knows When It Doesn't Know"
dek: "Hightouch's Jev-Opus hybrid gets frontier accuracy at a quarter of the price — not because the small model got smarter, but because it knows when to ask for help."
date: 2026-11-07
image: "/images/the-cheap-model-that-knows-when-it-doesnt-know.webp"
---

The interesting thing about Hightouch's identity-resolution experiment is not that it cut the bill by a factor of four. It is that the saving came from a property nobody puts on a benchmark leaderboard: the cheap model admits when it is unsure.

Hightouch had a mundane, expensive problem. Identity resolution is the job of deciding which scattered records — a loyalty card here, a tax form there, a shipping address somewhere else — belong to the same real person. Get it wrong in one direction and you split one customer into two. Get it wrong in the other and you merge two people into one, which Hightouch calls over-merging, and which is the failure that actually hurts: one profile quietly carrying two people's purchases, addresses, and history.

Checking whether your merger is any good is slow, human work. There is no answer key on real data — if there were, you would just use it to match. Teams sample identities by hand, about 50 an hour by Hightouch's count, and over-merges are rare enough in a healthy graph that you need more than a thousand samples to pin the rate down to within a percentage point. The question Hightouch asked is whether a model can do that judging instead, at machine speed and machine scale.

## A benchmark built from a fictional town

They built their test from Pseudopeople, a tool from the University of Washington's Institute for Health Metrics and Evaluation that simulates a fictional American town and generates its residents' records from multiple sources — census, household surveys, a benefits program, Social Security, W-2 and 1040 tax forms — then layered realistic data errors on top. Typos, misread characters, nicknames, swapped month and day, a child's record carrying a parent's birth date. From those records they built 1,000 identities: half one person with noisy records, half over-merges. Then they asked five models to judge each one.

The headline table, on the easier version of the test, reads like a pricing sheet with an accuracy column attached. Claude Opus 5.5: 99.0% accurate, 2.2 seconds per identity, $3.86 per 1,000 identities. Gemini 3.1 Pro: 98.3%, 4.2 seconds, $4.48. GPT-6 Sol: 98.3%, 2.1 seconds, $2.50. Then the two decision models — a new class of model that returns a 0-to-1 confidence score that a condition is true, instead of generating text. GPT-6 Luna, through OpenAI's Decisions API: 97.3%, 0.17 seconds, $0.10 per 1,000. TypeSafe AI's Jev: 95.6%, 0.15 seconds, $0.05.

That sounds like the usual story. It isn't. The decision models are up to 90 times cheaper and more than 10 times faster, and they trail Opus by about six points on the harder cases. Nobody ships a judge that is wrong six times out of a hundred when the error means merging two strangers into one customer. The cheap model alone is a non-starter. The interesting part is what happens when you let it ask for help.

## Calibration is the routing mechanism

Jev and Luna both return a confidence score with every verdict. Hightouch's key observation is that those scores are not equally honest. Most of Jev's mistakes arrive with confidence near 50% — exactly what a well-calibrated model should look like. Luna's mistakes, by contrast, cluster in the 90–100% bucket. Luna is the better model out of the box and the worse judge of its own ignorance.

That difference is the whole trick. If the cheap model can tell you when it is guessing, you do not have to choose between cheap and accurate. You let Jev judge everything, and you forward only the cases where its confidence sits between 30% and 90% to Opus for a second opinion. That is 22% of the identities. The result: 98.8% accuracy — a tenth of a point off Opus alone — at $0.88 per 1,000 identities and 0.63 seconds each. Opus accuracy at 4.4 times lower cost, which is where the "4x" in the headline comes from.

The same routing applied to Luna barely moves the needle, because Luna almost never admits doubt. Sending its 10–90% band to Opus forwards only 6% of cases and lands at 98.5% for $0.33 — cheaper than the Jev hybrid, but the mechanism is starved of the very signal it needs.

Then Hightouch made the test harder, with trickier cases: typos on important fields, over-merges of twins, a junior and a senior, two people with the same name. This is where the story stops being a pricing anecdote and starts being a design principle. On the harder test, Opus alone falls to 95.1% accuracy at $5.39 per 1,000. The Jev hybrid actually beats it — 95.3% — at $2.94. The Luna hybrid collapses to 91.6%. The system that knows when to escalate does not just cost less. On hard data, it outperforms the frontier model it is supposed to be imitating, because the routing itself adapts: harder cases push more work to Opus automatically, with no harness change and no prompt change. Hightouch's own phrasing is that spend flexes with difficulty. The meter stops being a flat rate and starts being a function of how hard the work is.

## The catch, carried in full

The Hacker News discussion, which ran to 545 points and 136 comments by the time this piece was written, landed on the same point fast. The top thread's sharpest comment put it plainly: the important factor is Jev's well-calibrated confidence, and which expensive model it defers to is probably less critical, as long as that model performs better. Other commenters reported running the same pattern already — a local decision model validating tool inputs and outputs, a cheap model doing preparation work before a frontier model thinks — and one skeptic asked the question that has to be asked: has this been tested rigorously enough to trust?

It has not, not yet. Every number in this piece is Hightouch's own, from their own setup, on synthetic data. The town is fictional, the records are simulated, and Hightouch says so plainly in the post: no real people appear in any example, and costs and latencies are what they observed in their own setup and will vary. A thousand identities is a small benchmark, and the harder test is Hightouch's own construction of "tricky." The calibration gap between Jev and Luna is a finding about these two models on this task, not a law of decision models. And the hybrid's edge over Opus on the harder test is two-tenths of a point — real, but thin, and measured on the same synthetic distribution the team designed.

There is also a second catch hiding inside the win. The Jev hybrid is more expensive than the Luna hybrid on the easy test ($0.88 against $0.33), and Hightouch says so. If your cases are easy and you know it, Luna's hybrid is the cheaper buy. The Jev hybrid earns its premium exactly when you do not know how hard the cases will be — which, in production, is always.

For builders, the takeaway is practical: confidence is not a dashboard metric, it is a routing primitive. The pattern here — a cheap model that triages, a frontier model that handles only the doubt — generalizes far beyond identity resolution. Anywhere you currently send everything to the expensive model, a calibrated small model in front of it turns a flat bill into a bill that scales with difficulty. But the pattern only works if the small model's uncertainty is honest. An overconfident cheap model does not route; it rubber-stamps its own mistakes at high speed and low cost, which is the worst combination in the catalog. Before you build the router, measure the calibration. That is the number that decides whether the hybrid saves you money or just helps you be wrong faster.

Hightouch hints at the next step in the same post: testing open-weight decision models against the proprietary APIs. If a downloadable model calibrates as well as Jev, the routing layer stops being a rented service and becomes infrastructure you own. Until then, the lesson stands on its own. The cheapest judge is not the one with the lowest price per thousand. It is the one that knows when to ask for help.

Source: [LLM Judges for Identity Resolution at 4x Lower Cost](https://hightouch.com/blog/llm-judges-identity-resolution)
