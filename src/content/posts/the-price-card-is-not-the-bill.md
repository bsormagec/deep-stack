---
title: "The Price Card Is Not the Bill"
dek: "Google's fourth Gemini 4 model in seven weeks costs more per token than the flagship — and, Google says, less per finished task. Both claims are true. That is the problem."
date: 2026-11-19
image: "/images/the-price-card-is-not-the-bill.webp"
---
The interesting thing about Gemini 4 Neon is not that it is a good model. It is that its price makes no sense until you stop reading the price.

Google announced Neon on November 18, and the numbers on the launch post, from Google itself, are straightforward enough: $3 per million input tokens, $15 per million output tokens, $0.15 for cached input, a one-million-token context window. The model sits between Hydrogen, the fast cheap one at $1.50/$7.50, and Carbon, the flagship. It scores 61 on the Artificial Analysis Intelligence Index at its highest thinking level, third overall, and first on Artificial Analysis's Coding Agent Index at 58.6. It is, by Google's account, frontier-level intelligence for complex, high-frequency work.

Here is the catch. Carbon, the flagship, currently costs $2 per million input tokens and $10 per million output. Less than Neon. The mid-tier model is more expensive per token than the top of the range.

That sounds like a mistake. It isn't. It is the shape of the market now.

## The flagship is on sale until December

Carbon's $2/$10 is an introductory price, and it expires on November 30. From December 1, Carbon costs $4/$20 — and Neon, at $3/$15 with no end date attached, becomes 25% cheaper per token overnight without changing a single weight. The ladder is not a fixed set of prices. It is a set of prices with expiry dates, and the model you pick today is priced against a calendar you did not set.

This is the fourth Gemini 4 variant in seven weeks. Argon arrived October 13, Carbon on November 10, Hydrogen on November 12, Neon on November 18. Each launch re-prices the rung below it and resets the comparison you made last month. A builder who benchmarked Carbon against Hydrogen in early November was comparing a lineup that no longer exists by the third week of the month. The shelf life of a model choice is now measured in weeks, and the vendor controls the clock.

The Hacker News thread, at 977 points and 740 comments, noticed the other absurdity first: the names do not order by capability. Hydrogen, carbon, neon, argon — a chemistry set with no periodic logic, where the element tells you nothing about the size of the model or the price of the token. One commenter put it plainly: which is bigger, neon or carbon? There is no answer, because the naming was never a system. It is a release treadmill with a label printer.

## Per token is not per task

The claim that matters in Google's post is not the rate card. It is the sentence underneath it: at its default high thinking level, Neon costs 32% less per task than Carbon, and at its highest thinking level it costs 36% or more less per task than competing models at their top settings. Those are Google's figures, drawn from Artificial Analysis comparisons under conditions Google chose, and nobody outside Google has independently verified them yet — the model is a day old.

But the direction of the claim is the real story. The per-token price and the per-task bill have decoupled. A model can cost more per token and less per task if it finishes the job in fewer tokens, needs fewer retries, or reads the same files fewer times. Neon is built for exactly that: four thinking levels you can dial per workload, context compaction that Google says holds up in long sessions, fewer redundant file reads in agent workflows. The meter is no longer the token. The meter is the finished task, and the vendor is the one defining what a task costs.

That is a measurement problem before it is a pricing problem. "Cost per task" is only comparable if the task is the same, and the tasks in these comparisons are benchmarks — Terminal-Bench 4.1, where Neon scores 65.2%, FrontierCode 2.0, where it scores 46.2% at default high, the Vals Index, where it ranks second at 70.9%. Your tasks are not those benchmarks. Your repository is not Terminal-Bench. The 32% is a number about Google's test suite, and it will survive contact with your workload only if your workload looks like Google's test suite.

There is a second number worth reading the same way. Neon is not available on the free tier at all. Every token is billed, thinking tokens included, and the only way to try it without an API bill is a paid Google AI Pro or Ultra subscription in the Gemini app or Antigravity. The frontier is not getting cheaper to touch. It is getting cheaper to measure, on the vendor's ruler, while the door to the free tier quietly closes behind it.

## The catch, stated plainly

None of this makes Neon a bad model. The benchmark spread Google published — best in class on Terminal-Bench Science at 70.5%, first on Zapier's AutomationBench at 56.3%, state of the art on WebExploitBench at half the cost of competing large models — is the profile of a genuinely capable system, and the coding-agent numbers, if they hold up outside Google's harness, put it in real contention with the best models anyone can rent. The Hacker News thread's other strand, a separate post arguing Neon looks like an Opus 5.5 competitor, gathered 246 points on its own. The capability claim is not the weak part.

The weak part is the accounting. A model that is 32% cheaper per task on the vendor's benchmark, 50% more expensive per token than the flagship until an introductory price expires, and unavailable for free, is a model whose true cost cannot be read off any single number Google published. You have to run your own workload, count your own tokens, and watch the bill at the end of the week. The rate card is a menu. The invoice is the product.

For builders, the takeaway is practical: stop choosing models by dollars per million tokens. That number now moves with intro pricing, thinking levels, cache rates, and a release cadence of one new rung every two weeks. Pick the model by dollars per completed task on your own work, measured on your own prompts, and re-measure every time the ladder moves — which, at the current pace, is about once a fortnight. The vendor will always have a cheaper number ready. Make sure it is a number about your job, not theirs.

The price card is not the bill. It never was. It just used to be a decent guess.

Source: [Introducing Gemini 4 Neon](https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-neon/)
