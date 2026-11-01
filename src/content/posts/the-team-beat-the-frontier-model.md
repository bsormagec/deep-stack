---
title: "The Team Beat the Frontier Model. The Models Were the Small Part."
dek: "Five downloadable Qwen instances, talking only through files on disk, outscored Claude Fable 5 on hard coding problems. Orchestration did what scale was supposed to do."
date: 2026-11-01
image: "/images/the-team-beat-the-frontier-model.webp"
---
The interesting thing about Memdoor is not that five small models beat a frontier model. It is that nothing about the models changed.

Memdoor, posted by Greg Devo (guregodevo) and sitting at number 9 on Hacker News at the time of this run's scan, with 254 points and 117 comments, is a reproduction of the GVS5H harness. Five fresh instances of Qwen3.8-27B take on LiveCodeBench Hard problems in distinct roles: a planner, two parallel ideators, a solver, a manager, and a repair worker that patches failed solutions. The agents never share a chat context. They communicate only through files on disk — a plan file, notes, and the current solution. Each worker starts fresh, reads the ledger, does its job, and writes back.

Over five passes on the first ten LiveCodeBench Hard problems, the Memdoor team scored a mean 9.8 out of 10, according to the project's own report. Claude Fable 5, called once on the same ten, scored 8.0. The original GVS5H harness scored 9.6. So this is not a new model winning. It is a workflow winning, twice over: once against the frontier model, and once against the harness it copied, by a hair.

That sounds like a benchmark upset. It isn't. It is a pricing story wearing a benchmark's clothes.

## The meter is the story

Fifty Memdoor runs cost $35.79 in total and consumed 15.3 million output tokens, per the project's report. A median run took 40 minutes and cost $0.39, on Qwen3.8-27B with a 128K reply cap. Counting 16 incomplete attempts, the full cost reached $38.77. Those are the project's own figures, not an independent audit, and they describe a small, specific test — ten problems, five passes each — not a production workload.

Still, the shape of the number matters more than its size. Forty minutes and thirty-nine cents is not a price you negotiate with a vendor. It is a price you stop thinking about. The interesting comparison is not Memdoor's $0.39 against some frontier invoice. It is Memdoor's $0.39 against the question every builder actually asks: is this task worth renting the best model for, or is it worth running a team of good-enough models I already own?

The original GVS5H result, on the full 100 latest LiveCodeBench Hard problems, sharpens that question and complicates it at the same time. There, orchestrated Qwen3.8-27B rose from 66.8% single-call to 92.4% with the manager harness, against Fable 5's single-call 90.4%, per the GVS5H authors. That is a 25.6-point lift from orchestration alone, on a model that fits on a single 24–32 GB GPU. But the cost arithmetic needs care, because the headline figure that travels with this result belongs to a different model. The "9% of the cost" claim in the GVS5H abstract is for Qwen3.8 Flash Next, which scored 93.0% at $5.76 per pass over the 100 problems against Fable 5's $61.11. The 27B model with the manager cost $47.82 per pass by the same list-price table — roughly 78% of Fable 5, not 9%. An independent reading of the paper's cost tables, published by Authon, makes exactly this correction, and it matters: the 27B team does not beat the frontier model on price per pass. It beats it on the scoreboard while costing nearly four-fifths as much at list rates.

That correction does not kill the story. It relocates it. If you run the weights yourself, list price is not your bill. The Memdoor median — $0.39 a run, on hardware you can already buy — is the version of the number that belongs to a builder's budget, and it is the version the frontier pricing table cannot express. The Hacker News discussion focused on exactly this fault line: commenters argued about whether local models are already good enough for most coding work with an experienced developer guiding them, and about whether quantization and faster inference engines keep shrinking the hardware bar week by week. They are right that the weights are out and do not go away. They are also right to ask what happens when those weights go stale, targeting the frameworks of 2026 while the ecosystem moves on.

## Two result sets, kept apart

This is where the piece has to be honest about its own evidence, because two different result sets are circulating under one headline, and merging them is how a good story becomes a misleading one.

The Memdoor result is ten problems, five passes, a mean of 9.8 against 8.0. The GVS5H result is one hundred problems, a pass rate of 92.4% against 90.4%. The first is a reproduction on a slice; the second is the original run on the full set. Memdoor reuses the GVS5H authors' exact prompts, so the comparison reads as an implementation test, not a prompt-engineering win — but ten problems is a slice, and a slice is not a verdict.

Then there is contamination, flagged by the authors themselves. The ten LiveCodeBench Hard problems in the Memdoor run come from contests dated March 29 to April 6, 2025, and Qwen3.8-27B may have seen them in training. Contamination cannot be ruled out, in the authors' own words. Hacker News commenters raised the same objection from the other side: the benchmark is old and possibly saturated, and ten problems is too few to conclude anything durable. Both objections stand. No independent verification of either result set has appeared yet.

For builders, the takeaway is practical: do not cancel a frontier subscription on this evidence, and do not dismiss the harness either. The reproducible idea is the ledger. Fresh instances, one job each, no shared context to pollute, a plan and a solution file that any worker can read and any human can audit. That pattern ports to your own codebase this week, on your own tasks, where you can measure it against your own bar instead of a contest benchmark. Copy the file-based coordination. Test it on work you actually ship. The scoreboard is a suggestion; your own measurement is the decision.

There is a version of this idea I would use, and it is not the five-agent team as a product. It is the discipline underneath it: small models, fresh contexts, durable state on disk, and a repair step that treats failure as an input rather than an ending. The frontier model sells you one brilliant call. The ledger sells you a team that leaves a paper trail.

The weights did not get smarter this week. The way we organize them did. That is the problem with every "bigger model" announcement that follows: it has to beat not just a model, but a method.

Source: [Memdoor: A team of 5 Qwen3.8-27B models beats Fable 5 on LiveCodeBench Hard](https://github.com/guregodevo)
