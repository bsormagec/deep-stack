---
title: "The Model Costs the Same. The Question Is Whether It's the Same Model."
dek: "*livenerf is a 30-day, pre-registered benchmark that started the clock on Claude Opus 5.5's launch day — because the \"nerf\" debate has never had a day-zero baseline.*"
date: 2026-09-30
image: "/images/the-model-costs-the-same-the-question.webp"
---
The interesting thing about the "nerf" debate is not whether Anthropic nerfed anything. It is that until last week, nobody could have answered the question either way.

Every few months, the same ritual plays out. A frontier model launches. A week later, users report it got dumber — lazier answers, more refusals, less of the sparkle from launch week. The lab says nothing changed. The users say they can feel it. The argument is vibes versus vibes, and it never resolves, because nobody kept a receipt from day zero.

livenerf is the receipt.

## A benchmark with a start date

Claude Opus 5.5 launched on 2026-09-22, and the benchmark's author — GitHub user ninjahawk — started the clock that same week. The premise is simple: if you want to know whether a model gets quietly worse after it ships, you have to measure it from the day it ships, with frozen prompts, a pinned harness, and a pre-registered rule for what counts as "worse." Nobody has ever done that, which is why every previous nerf argument collapsed into vibes versus vibes.

The design is deliberately boring. From 2,336 questions across GPQA Diamond, MMLU-Pro, competition math, and AIME 2025–26 — each sampled four times — the author kept only the 78 that Opus 5.5 gets right *sometimes*. (It got about 93% right on the first try; 97% of questions were always right or always wrong, and a question the model always answers correctly can never show a drop.) Those 78 form the panel. The same panel runs once a day for 30 days through headless Claude Code on a Claude Max subscription, no API key, exact-match grading, no LLM judge — because, as the author notes, the judge would drift too.

The statistics are not homebrew. The harness is built on Inspect, the UK AI Security Institute's open-source eval framework, and the error bars follow Anthropic's own "Adding Error Bars to Evals" methodology. Scores are paired per-item differences against the baseline with clustered standard errors, so question difficulty drops out. A control arm runs claude-opus-5 through the same harness every day — if both models move together, the harness or the platform changed, not Opus 5.5.

As of September 30, 7 of the 30 days are collected (baseline 7 of 10), none missed, 90 samples a day on the same pinned harness hash and CLI version. Days 1–10 are the baseline. Then come two 10-day windows, and the first possible call lands around October 24. The first results row appears after day 20.

## The nerf debate is a pricing debate

That sounds like a science project. It isn't.

A price row is a promise about capability. When you pick a model tier, you are buying a fixed amount of expected quality per dollar — and a quiet effort downgrade changes your cost per completed task without touching the price. You pay the same. You get fewer tokens of thought per dollar. That is a price increase wearing a quality costume, or a quality cut wearing a price tag that didn't move.

This is where the author's validation run earns its keep. Before trusting the rig, he measured a *known* degradation — effort "low" and "medium" against "high" — to prove the instrument can see what it claims to see. Effort low cut output tokens by 62% while accuracy moved only −8.3 ± 4.5 points. Effort medium cut tokens 26% with accuracy at −4.2 ± 3.9. His summary is worth quoting directly: "Lower effort shows up much more clearly in tokens than in accuracy." If a model quietly starts thinking less, the token count is where it shows up first — often before the answers change at all.

For builders, the takeaway is practical: watch the tokens, not just the answers. Your unit economics are denominated in a model identity you cannot verify, served through a pipeline — quantization, routing, effort defaults — that you cannot see. The benchmark's headline metric is accuracy, but the signal most builders should care about is the median output tokens per sample, because that is the one that moves first and maps most directly to what you are actually buying.

## The honest limit

To his credit, the author states plainly what the instrument *cannot* do. Swapping in Opus 5 was not distinguishable from Opus 5.5 at 99% confidence (−3.8 ± 6.3 points, −23% tokens): a same-family model swap of that size is below the detection floor. He also documents an ugly detail of the serving path — the safety classifier sometimes answers with Opus 5 or refuses biology and some math questions — and those samples are rejected, counted, and excluded rather than quietly absorbed.

That honesty is the whole reason the project is worth taking seriously. A benchmark that only reports improvements and regressions, loudly, both ways, and publishes its own blind spots is the opposite of the vibes it replaces.

## What the thread thinks

The Hacker News thread (850 points, 364 comments at fetch time) splits into the usual camps, with one useful addition: the author showed up. One side reports the vibe — "already getting poorer results today," wrote aloukissas, eight days in. The other side names the confound. Commenter refulgentis argued the perceived nerf always arrives "around a week" after launch — "a good approximation for hedonic adaptation" — and that in all the attempts at demonstrating nerfing via benchmarks, "none persist." bbg2401 was blunter: communities of smart professionals behaving "like spoiled children on the day after Christmas when new toy novelty has begun to wane." And judge2020 offered a third hypothesis worth keeping: peak-time compute strain, where the lab "sheds a tiny bit to handle the increased demand" — a nerf that is real, load-dependent, and invisible to anyone not measuring continuously.

ninjahawk answered methodology questions directly in the thread: the 10-day window is a tradeoff between sensitivity and detection speed, the window rolls forward daily, and a change has to clear the pre-registered 99% threshold in *two consecutive* windows before it gets flagged. Ten days isn't sacred, he said — once there is enough longitudinal data, the window itself goes under review.

That is the entire point. The thread has theories. The repo has a clock.

## The cost of watching

Here is the number that belongs in the cost column. One daily run of the whole panel detects an accuracy change of about 7.5 points per 10-day window, and it costs about 3.6% of a Claude Max weekly plan. One developer is spending 3.6% of a subscription to audit the capability promise behind the other 96.4%.

And there is a small irony buried in the README: Max plans don't publish their limits in tokens, so the benchmark's budget is denominated in the plan's own percentage meters — the same opacity the project exists to fight, measured in the units of the thing being measured. The instrument is honest about that too.

Until October 24, the nerf is a rumor. After October 24, it becomes a measurement — or it doesn't. That is the difference between a rumor and a measurement, and it is the whole point.

Source: [livenerf — Benchmark for tracking model capability after release](https://github.com/ninjahawk/livenerf)
