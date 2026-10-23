---
title: "The Price Fell by a Third. The Bill Didn't Move."
dek: "Kimi K3.1 Pro is 33% cheaper per token — and costs the same per task. The meter that matters was never the token."
date: 2026-10-23
image: "/images/the-price-fell-by-a-third-the-bill.webp"
---
The interesting thing about Kimi K3.1 Pro is not the benchmark table. It is the invoice.

Moonshot's new flagship arrived Thursday at number four on the Artificial Analysis Intelligence Index: 55 points, an eleven-point jump over Kimi K3, three points behind Claude Opus 5.5 — the largest single-generation leap in that index's recent history. The company also cut the price: $2 per million input tokens and $10 per million output, down from $3 and $15, a clean 33 percent off the token meter. A faster sibling, K3.1 Pro Highspeed, runs two to three times quicker for $4 and $20. Headline arithmetic says: frontier-adjacent intelligence, half the price of Opus 5.5, going cheaper.

That sounds like a bargain. It isn't, quite. Artificial Analysis keeps a second ledger — cost per *task*, not per token — and on it, K3.1 Pro costs $1.98 per Intelligence Index task against K3's $2.00. The price fell by a third and the bill stayed flat. The reason sits in the same chart: K3.1 Pro generates 14 percent more output tokens. The per-token meter moved. The money didn't.

## The task meter and the token meter

This is worth slowing down for, because it is not a Kimi quirk — it is the pricing structure of the agent era stated plainly. Providers price per token. Buyers pay per task. Between the two sits the one variable the buyer doesn't control: how many tokens the model chooses to emit to finish the job.

Moonshot's own benchmark table makes the mechanism visible. K3.1 Pro's scores are strong — Terminal-Bench 4.0 at 65.7 percent, a hair behind Opus 5.5's 66.4 and well ahead of GPT-6 Astra's 58.2 (K3 itself managed 13 percent on the same test, which is the actual story of the generation gap); SWE Marathon v1.1 at 51.7 percent, ahead of both Opus and Astra; a claimed state-of-the-art 64.4 on OfficeQA Pro v2. Every one of those results was run with reasoning effort cranked to "max" — the setting that flatters demo numbers. But the reasoning tokens aren't free, and crucially, they aren't optional: Kimi's documentation says requests with thinking disabled are *rejected*. The model will not run dumb for you, at any price. The reasoning-token bill is not a feature you can toggle off; it is the toll on the road.

So the honest ledger is the per-task one. The token price is the headline the marketing team wrote. The output-token volume is the bill the CFO pays. Artificial Analysis puts both on the same page, and the gap between them is the margin the provider keeps while the customer celebrates a discount.

The Hacker News discussion — 416 points and 227 comments, the top AI story of the day — read the benchmark row correctly and the price row too optimistically. The model sits on the Artificial Analysis Pareto line, which is genuinely impressive: no model of comparable size scores higher. But the Pareto frontier charts intelligence against cost *per task*, and K3.1 Pro's position there is the $1.98 number, not the $2 token sticker. The frontier moved in intelligence. In cost, it stood still.

## Speed, sold separately

The Highspeed variant is the more interesting product decision, because it makes latency an explicit line item. Two to three times the speed for exactly twice the price — $4 and $20 against $2 and $10 — and in Kimi Code, twice the quota burn. No bundle, no volume discount, no mystery: throughput sold by the unit.

For builders running agent loops, this is actually the useful menu. A coding agent's wall-clock cost is dominated by the serial round trips — think, act, read the tool output, think again — where token throughput is the binding constraint, not token volume. If your loop is latency-bound, paying 2× for 2–3× speed is a rational trade; if it's token-bound, you're buying speed you can't use. The catch is that Kimi Code gates the regular model behind Plus plans and Highspeed behind Pro, and gates the full 1-million-token context window behind the top tier. The token price is the sticker; the membership ladder is the turnstile. Price the subscription into the invoice before you celebrate the per-token cut.

## The open model is not the benchmarked model

The November 4 weights release is the other headline — and the one that deserves a closer read. If the weights land as promised, K3.1 Pro becomes the highest-scoring open-weights model in existence, and the gap between open and closed models collapses from twelve points to three. That is the kind of number that rewrites procurement slides.

But read Moonshot's cybersecurity section, which occupies a full chapter of the launch post, and a complication appears. The company observed that vulnerability-research capability kept growing as post-training scaled — cyber-related content was embedded in the mid-training corpus, related tasks sat in the RL environment mix — and before release it stripped cyber data out of both training phases. On its internal xdev-bench-hard, which replays recently disclosed vulnerabilities in the Linux kernel, Node.js, and JavaScriptCore, the uncleaned model solves 90.5 percent of tasks; the cleaned one, 81.0 percent. Moonshot's stated position: no open-weights release should extend the absolute frontier of offensive cyber capability.

Two things are worth saying about this. First, to Moonshot's credit, they published both numbers — most labs would ship the weaker model quietly and let the benchmark table speak for the stronger one. The 9.5-point delta is honest accounting. Second, it still means the "open weights" arriving November 4 are a different, deliberately weakened artifact from the model that earned the 55. The benchmark table describes the full model; the weights describe the filed-down one. For defenders auditing legacy systems — a use Moonshot explicitly endorses — the weaker version is the relevant one. Budget your evaluation against the model you'll actually download, not the one that scored the headline.

The same read-your-own-footnotes discipline applies to the headline accuracy claim. Claim-level hallucinations fell from 23.4 percent to 8.3 percent — but on Moonshot's *own* hardest factual-accuracy test, which the company itself calls a stress test rather than a measure of general error rates, and GPT-6 Astra still leads it at 5.5 percent. Self-reported benchmarks at max reasoning effort are a vendor's best case, not your Tuesday.

## For builders, the takeaway is practical

Price the per-task number, not the per-token sticker. Put Artificial Analysis's $1.98 in the spreadsheet — it is the closest thing to what a K3.1 Pro agent actually costs to run, and the 33 percent cut is not in it. If your loop is latency-bound, the Highspeed menu is priced honestly at 2× for 2–3× — measure your loop before you pay it. Remember that thinking mode is mandatory: there is no cheap, dumb, fast tier, and every request carries the reasoning bill. And if you are waiting for November 4 to self-host — a 2.8-trillion-parameter model with 104 billion active per token is a datacenter artifact, not a workstation one — plan against the scrubbed model, because that is the one the weights will contain.

The frontier is now three points wide and, per token, a third cheaper. The bill arrives per task, as always, and it did not move.

Source: [Chinese AI model Kimi K3.1 Pro is closing in on Anthropic's Claude Opus 5.5](https://the-decoder.com/chinese-ai-model-kimi-k3-1-pro-is-closing-in-on-anthropics-claude-opus-5-5/)
