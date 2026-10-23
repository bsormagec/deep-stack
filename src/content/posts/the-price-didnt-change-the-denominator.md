---
title: "The Price Didn't Change. The Denominator Did."
dek: "*Anthropic kept Sonnet's $2/$10 price row and changed what a task costs. The honest benchmark was never the leaderboard — it was the invoice.*"
date: 2026-09-29
image: "/images/the-price-didnt-change-the-denominator.webp"
---
The interesting thing about Sonnet 5.5 is not the 70.6%. It is the $2.

Anthropic's new mid-tier model, launched September 28 and sitting at number 10 on Hacker News with 637 points and 429 comments at last count, kept exactly the same price list as Sonnet 5: $2 per million input tokens, $10 per million output tokens, $0.20 per million cache reads. And yet Anthropic says it costs up to 30% less for most work. Both statements are true. The price row didn't move; the number of tokens required to finish a task did.

This is the third time in a month the industry has moved the same piece. OpenAI's GPT-6 Sol matched Sonnet's $2/$10 row when it launched last week, after the same price table carried GPT-6 Astra at $10/$50 and GPT-6 Luna at $0.10/$0.50. Nobody is cutting list prices anymore. Everyone is cutting the denominator.

## The denominator moved

A "30% cheaper model" used to mean a cheaper price row. Sonnet 5.5 is cheaper in a way that doesn't show up on any pricing page: it batches tool calls together, takes fewer steps, and finishes with fewer tokens. Anthropic's own numbers make the mechanism concrete. At Balyasny Asset Management, it used about 121K tokens per answer versus 497K on Sonnet 5 — roughly a quarter of the tokens for the same answer. Base44 reported 3.6 iterations per app build where the previous model took 7.7. Zendesk processed tickets 20% faster. Slack's principal engineer, Curtis Allen, said it did better on almost all of their offline Slackbot evals without any prompt changes, using about 14% fewer output tokens.

That sounds like efficiency. It isn't — or rather, it isn't only efficiency. It is the shape of the model's behavior. In head-to-head runs, Anthropic says, Sonnet 5.5 batched tool calls more than Sonnet 5. Fewer tool calls means fewer round trips, fewer retries, fewer chances for a half-finished agent loop to burn tokens on its own confusion. For anyone running agents at volume, the expensive part was never the price per token. It was the tokens the model spent being uncertain.

The scores that ride along are real but secondary. Terminal-Bench 4.0 — an agentic coding evaluation where the model works inside a command-line interface — went from 10.3% on Sonnet 5 to 70.6%, against 66.4% for Opus 5.5. GDPval-AA, Artificial Analysis's real-work evaluation across 44 occupations, landed at 1844, two points below Opus 5.5's 1846 and about 400 above Sonnet 5's 1449. FrontierCode 1.1 scored 52.1% at Xhigh effort, ahead of GPT-6 Sol's 49.3%. Humanity's Last Exam with tools rose from 54.9% to 64.5%. OSWorld computer use hit 80.1%, close to Opus 5.5's 81.8%. It is the first Sonnet to beat Pokémon Red working only from screenshots, and the first to launch with cyber safeguards comparable to Opus's, plus reasoning-extraction classifiers — because it is capable enough that people will try to distill it at industrial scale.

One footnote deserves honesty: Anthropic notes in its own launch post that on Terminal-Bench, GPT-6 Sol's numbers are actually GPT-5.6 Sol's, because Terminal-Bench and OpenAI didn't report the new model's performance publicly. Vendor comparisons are only as current as the vendor feels like being.

## What the benchmarks actually say

Here is the part Anthropic did right, and it matters more than any single score. The launch post plots every benchmark as accuracy against cost per task at each effort level, with the instruction that the closer a point sits to the top-left, the more capability it delivers per dollar. On several evaluations, Sonnet 5.5 at Low or Medium effort beats Sonnet 5's best score for about a tenth of the cost per task. On FrontierCode it scores 10 points higher than Sonnet 5 at High effort, at about one fifteenth of the cost per task.

The Hacker News discussion, as usual, skipped the adjectives and went for the comparison table. That is the correct instinct, because Anthropic itself buried the lede in the charts: a benchmark leaderboard is a ranking of scores, but nobody pays in scores. They pay per task. The honest chart has dollars on one axis. The interesting thing about the Sonnet 5.5 launch is that the vendor drew that chart itself, which tells you where the industry thinks the argument now happens. Not on the leaderboard. On the invoice.

That also explains the oddest detail in the release. The same model defaults to Medium effort in Claude Code and the apps, and High on the Claude Platform. Same weights, different behavior, different latency, different cost — and Anthropic is telling you plainly that the number you see on your bill depends on which surface you called. A price list with one row and three effective prices is not a price list. It is a configuration.

## The catch

Everything above is vendor-reported, and the vendor says so: "benchmark scores capture only one facet of a model's capabilities," and "Opus 5.5 remains clearly stronger at complex, open-ended work requiring sustained judgment." The customer numbers are select workloads, not averages. Balyasny's 121K-versus-497K is Balyasny's workload, not yours. Slack's 14% is Slack's bot, not your codebase.

And there is a quieter trap in "cost per task" as a headline. A model that is cheaper per task but needs human revision after every second answer is not cheaper. It is a discount on a new expense line: review labor, interruption rate, the slow erosion of trust in the agent loop. The kucoin writeup of this launch made the point well: a truly fair cost evaluation would factor in task success rate, human review time, and long-task interruption rate — not just the price list. The denominator that matters is not tokens per task. It is total cost per task that ships.

## For builders, the takeaway is practical

Stop comparing price rows; they haven't moved in months and they aren't going to. Start measuring cost per completed task on your own workload, at the effort level you actually run. If you use Claude Code, remember you are on Medium by default and the Platform benchmarks mostly aren't. Watch tool-call batching, not token prices — the biggest savings in the Sonnet 5.5 data came from fewer steps, not cheaper steps. And when a vendor shows you a "30% cheaper" chart, ask which customer's workload paid for that number, then run your own five tasks and count.

The frontier is no longer a model. It is a pricing tier, and the tier that wins is the one where the denominator shrinks fastest.

Anthropic will ship Haiku 5.5 in the coming weeks for the high-volume tier. The pattern suggests what it will look like: same game, smaller sticker, the real discount hiding in the denominator.

Source: [Introducing Claude Sonnet 5.5](https://www.anthropic.com/claude-sonnet-5-5)
