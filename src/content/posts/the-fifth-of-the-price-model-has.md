---
title: "The Fifth-of-the-Price Model Has a Quarter-Million-Token Cliff"
dek: "GPT-6.1 Sol is OpenAI's best value ever. Until your prompt crosses 272K tokens — then the whole request gets re-billed."
date: 2026-09-30
image: "/images/the-fifth-of-the-price-model-has.webp"
---
The interesting thing about GPT-6.1 Sol is not that it nearly matches Astra for a fifth of the price. It is that "a fifth of the price" is a rate you might never actually pay.

OpenAI's new mid-tier flagship, released September 29, 2026 at its DevDay event, keeps the $2/$10 price row of the GPT-6 Sol it replaces. Cached input dropped to $0.10 per million tokens — 95% off the standard rate, half of what GPT-6 Sol charged. On paper, it is the best value OpenAI has ever shipped: near-Astra scores on agentic coding, computer use, and professional work at a fraction of the flagship's cost.

The paper is not the bill. Buried in the pricing documentation is a second price list. Cross 272,000 input tokens in a single request and the entire request — not the overflow, the whole thing, including the first 272K — gets re-billed at $4 in, $15 out. Two times the input and cache rates, one and a half times the output rate, applied to the full request. Multiple independent breakdowns of OpenAI's own documentation confirm the mechanics: a 500K-token prompt costs $4 per million input tokens, which is exactly what GPT-5.6 Sol charged before any of this discounting began.

So the honest question for a builder is not whether the sticker says $2 or $10. It is where your prompts land relative to a line drawn at 272K — a line that sits at about a quarter of the model's advertised 1.05-million-token context window. The workloads that most need long context — the deep codebase investigations and long-running agents OpenAI is explicitly selling this model for — are the ones most likely to trip the cliff. A pricing tier that punishes exactly the use case it advertises is not a price. It is a configuration you have to design around.

## The numbers OpenAI chose to show

OpenAI's announcement reports, on its own selected evaluations: on DeepSWE v1.1, which tests software engineering in real codebases, GPT-6.1 Sol matches Astra at roughly a fifth of the cost and beats GPT-6 Sol's best score by 6.4 percentage points. On AutomationBench, Zapier's end-to-end workflow test, it scores 2.2 points above Claude Opus 5.5 at roughly a third of the cost. On GDP.pdf, a professional-documents test, it scores above Opus 5.5 with fallbacks at less than half the cost per task. On OSWorld 2.0's computer-use tasks, it lands within 2.1 points of Astra at roughly one-seventh of the cost per task. On Terminal-Bench Science it more than doubles GPT-6 Sol's score and averages $5.47 per task, against $23.21 for Opus 5.5 and $23.80 for Astra — though Astra still leads the test at 68.1%. And on factuality, the share of answers containing a factual error on deliberately hard prompts fell from 11.4% to 7.7% at low reasoning effort.

These are OpenAI's tests, picked by OpenAI, with competitor scores taken from public reports. OpenAI says so itself in the announcement's fine print.

The Hacker News discussion — 1,025 points, 892 comments at last count — did what HN always does with a launch: ignored the headline and went for the comparison table. One commenter's summary, that OpenAI "had to release something in response to Opus 5.5," is gossip. The benchmark skepticism underneath it is substantive. Several engineers reported the same gap between scores and experience: GPT-6 Sol benchmarks well, but in real code-review work it trails Opus 5.5 badly, needs more fix rounds, and produces more convoluted code. Quantity of generated code is not code quality, and nothing on OpenAI's slide deck measures maintainability. The most practical advice in the thread came from a builder who has stopped trusting vendor charts entirely: keep your own eval set for each class of task and run every candidate against your own work. At scale, that is the only benchmark that exists.

## The catch

There are three, and they stack.

First, the cliff described above. Anthropic charges Sonnet 5.5 a flat $2/$10 across its full 1M-token window — the same headline rate, no threshold. OpenAI's version of that rate quietly becomes $4/$15 the moment your agent's working memory gets ambitious. Note the perverse detail: the threshold applies per request, and analysts note the safe reading is total prompt size, cached tokens included. Every long-running agent resends its growing conversation each turn; once that resend crosses 272K, every later call is priced at the long-context rate. The model OpenAI pitches for "long-running agents across apps" bills its most context-hungry users at double. For builders, the takeaway is practical: stay under 272K or the savings you budgeted evaporate inside a single request. Trim context deliberately instead of letting it drift over the line.

Second, the shelf life. GPT-6.1 Sol replaces GPT-6 Sol seven days after GPT-6 Sol launched. Seven days. The model we were told was the new sensible default on September 22 is deprecated inventory on September 29. Artificial Analysis scores the new one a point below Astra on its Intelligence Index at less than a quarter of the cost per task, which reads as a triumph until you realize the old one got exactly one week of being the recommendation. The pricing ladder itself has become the product, and the rungs are being swapped under your feet. Anyone who built cost models around GPT-6 Sol last week gets to rebuild them this week. That churn is the real tax, and no rate card lists it.

Third, the fine print is where the margin went. Cache reads at $0.10 are genuinely the dominant cost line in agentic coding — Anthropic itself says cache reads are the majority of its own customers' coding costs, and OpenAI now undercuts that by half. But OpenAI offers no option to pay for a longer-lived cache the way Anthropic does, with its 1.25x-for-five-minutes and 2x-for-an-hour tiers. And as one comparison of the two launches put it: Sonnet 5.5 and GPT-6.1 Sol share the same input and output rates, yet the measured cost per task differs more than tenfold on some workloads. Rate cards assume both models spend the same tokens. They never do. Token consumption is a behavioral property of the model, not a published specification.

None of this means 6.1 Sol is a bad model. It means the invoice is the spec sheet that matters, and that spec sheet is written in three places: the rate card, the threshold table, and your own evals.

## For builders, the takeaway is practical

Stop budgeting from the headline rate. Budget from measured cost per completed task on your own workload, and re-run that measurement every time the vendor swaps the rung — which, at the current pace, is weekly. If you run long-context agents on OpenAI, treat 272K as a hard design constraint, not a trivia fact: it decides whether your request costs $2 or $4 per million input tokens, on the whole request, retroactively. Keep a personal eval set per task class and run every candidate against it before switching, because switching models is expensive — you rerun everything, and the savings in the announcement are measured on the vendor's workloads, not yours. And remember what the cache numbers are telling you: in agentic work, most of your spend is re-reading your own context. The cheapest model is the one that remembers well and writes little.

The frontier is no longer a model. It is a pricing tier with a trapdoor in the floor, and the trapdoor is set at 272,000 tokens.

Source: [Introducing GPT-6.1 Sol](https://openai.com/index/introducing-gpt-6-1-sol/)
