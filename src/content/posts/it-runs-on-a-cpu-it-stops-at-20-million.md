---
title: "It Runs on a CPU. It Stops at $20 Million."
dek: "## The model that does not need the machine everyone assumed"
date: 2026-10-19
image: "/images/it-runs-on-a-cpu-it-stops-at-20-million.webp"
---
The interesting thing about Timestral is not that Mistral built a forecasting model. It is that the largest version is 209 million parameters, runs on a CPU, and still claims the top of the field's benchmarks.

Timestral, Mistral's first family of time-series foundation models, reached the Hacker News front page on October 19 with 183 points and 32 comments at fetch time. It does not write text. It reads a column of numbers — sensor readings, request counts, sales volumes, observability metrics — and forecasts where that column is going, with a band of uncertainty around the guess.

That sounds like a niche release. It isn't. Time series is the data type most companies already have in bulk, and forecasting is the workload they have quietly been paying for in two expensive ways: per-series classical models that have to be fitted and maintained one by one, or a GPU habit imported from language models whether the job needed one or not.

## What actually shipped

Mistral released four models sharing one architecture and one training recipe, according to its announcement: 5M, 28M, 123M and 209M parameters. The weights are small enough to read as file sizes, not infrastructure. The GitHub and Hugging Face listings reported by DEV Community put the fp32 weights at 21 MB for the 5M model, 111 MB for the 28M, 490 MB for the 123M and 837 MB for the 209M.

The shape of the thing is plain. Per the 209M model card, it reads up to 32,768 past time steps, forecasts up to 1,024 steps in a single forward pass, and returns 21 quantiles per step, from 0.01 to 0.99. It accepts several series at once, plus covariates — some known only in the past, some known into the future, such as holidays, planned promotions or a scheduled shutdown. Missing values go in as NaN.

The speed numbers are the part that changes the buying decision. Mistral reports that Timestral does not need a GPU at inference: on a standard server CPU with 8 threads, forecasting one day ahead from three weeks of 15-minute history takes 10 milliseconds with the 5M model and 140 milliseconds with the 209M model. The 28M model, Mistral says, is five times faster than the 209M, and the 123M comes within 0.2% of the 209M score at three quarters of its latency.

For builders, translate that out of milliseconds. A forecast that takes 140 milliseconds on a CPU you already own is not a service. It is a function call inside a monitoring job. There is no GPU instance to keep warm, no inference bill per call, and no queue. The cost of asking "what happens next Tuesday" falls to roughly the cost of the cron job that asks it.

## The benchmark lead is real, and thin

Mistral says the 209M model ranks first among pretrained, zero-shot models on all three main public benchmarks — GIFT-Eval, TIME and fev-bench — from a single checkpoint, without ensembling, with results submitted to the GIFT-Eval and TIME leaderboards.

The margins deserve reading as carefully as the ranking. On the model card's comparison table, reported by DEV Community, Timestral-209M scores a GIFT-Eval MASE of 0.658, against 0.661 for t0-gamma, 0.667 for TimesFM-3 and 0.698 for Chronos-2, where lower is better. The lead over the runner-up is 0.003. On fev-bench's SQL skill score it posts 50.39, against 49.42 for t0-gamma and 47.28 for Chronos-2, where higher is better.

The smaller models may be the more useful result. Mistral says the 28M model beats Chronos-2, a model about four times larger, on GIFT-Eval and TIME. That is the Pareto claim in one line: all four sizes sit on the front of accuracy versus model size, so a team picks its point on the curve instead of buying the flagship by default.

Two cautions belong next to every one of those numbers. They are Mistral's numbers. The technical report, per the model card, is still to come, and until it lands the method behind the lead cannot be checked in full. And a lead of 0.003 is a lead, not a gap. On a team's own data, with its own seasonality and its own missing values, that margin can vanish in a single backtest — which is exactly the test Mistral's design makes cheap to run.

## Why zero-shot matters more than the score

Classical tools such as ARIMA are fitted to a single series and learn only from that series, as Mistral's announcement puts it. Deep models such as PatchTST learn across series but are typically trained from scratch on each dataset. A foundation model is pretrained once, on a large and diverse corpus, and forecasts on data it has never seen.

The training recipe explains part of the claim. Mistral says the majority of its training data was synthetic: univariate processes with trends, seasonality and noise first, then a multivariate synthesizer that introduced dependencies between them. The model was pretrained at a context of 8,192 steps on synthetic data, then post-trained on a mix of real and synthetic data at four times that context, with a pinball loss over the 21 quantiles.

That sounds like a research detail. It is a cost detail. Zero-shot means the expensive part — learning what time series look like in general — was paid once, by Mistral, before the model reached a builder's machine. What remains for the builder is evaluation: backtest the downloaded model on a month of their own history against whatever they use now. Mistral lists Timestral 1.0 as a public preview in its docs, per DEV Community, and names no API price, because for now there is no API to price. You download it and run it yourself.

## The catch is in the license, not the latency

The inference code is Apache 2.0, per the project's GitHub README. The weights are not. They ship under what Mistral calls a Modified MIT license, and the modification, quoted in the license file on Hugging Face, is a revenue cap: a company is not authorized to use the weights if its global consolidated monthly revenue exceeded $20 million in the preceding month. The restriction covers the model and any derivatives, modifications or combined works, so a fine-tuned copy does not escape it. The same cap sits on the 5M model's license, so a smaller checkpoint is not a way around it either.

Read that next to Mistral's own deployment pitch. The announcement offers on-prem, VPC and air-gapped deployment — exactly the setups large enterprises ask for, and exactly the companies most likely to be over $20 million a month. Those companies can ask Mistral for a commercial license, which it may grant at its sole discretion, or use its hosted services.

That is not a scandal. It is a price, stated in a license instead of on a pricing page. But it changes what "open weights" means in the evaluation. A team under the line gets a state-of-the-art forecaster for the cost of a download. A team near the line gets a model it may be inside the license for in one month and outside it the next, because the cap is measured monthly and counts the whole employer's revenue, however small the team's own budget is. The diligence question is not "does it beat TimesFM-3." It is "are we allowed to keep using it if we grow."

## What a builder does with this

For builders, the takeaway is practical: backtest Timestral on your own series before believing any leaderboard, starting with the 28M model rather than the 209M — it is five times faster than the flagship on Mistral's own CPU figures and still ahead of a model four times its size on two benchmarks. Size your capacity decisions on the upper quantiles, not the median; the 21-quantile output exists precisely so a p90 peak, not a p50 guess, sets the headroom. And check the revenue line before anyone builds on the weights, not after.

The forecast itself got cheap — 837 MB of weights and 140 milliseconds on a CPU. What did not get cheap is the permission to use it at scale.

That is the problem the license solves, for Mistral.

Source: [Timestral: Mistral's time-series foundation models](https://mistral.ai/news/timestral/)
