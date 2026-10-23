---
title: "1,500 tokens/sec is a demo number. The rate limit is the product."
dek: "Cerebras put Qwen 3.8 27B on its public API at ~1,500 tok/s. Builders hit the per-minute quota in 90 seconds and burned $1.10. What that tells you about buying inference in the agentic era."
date: 2026-09-04
image: "/images/1500-tokens-per-second-demo-rate-limit-product.webp"
---
Cerebras put Qwen 3.8 27B on its public API this week and the spec sheet reads like a flex: about 1,500 tokens per second, $0.99 per million input tokens, $1.49 out, 128k of context on the paid tier, and a note that it serves the original unpruned weights. On paper that is the best small-model deal in inference right now. A 27B model that streams text back faster than you can read it.

The Hacker News thread (672 points) filled with builders who had actually used it, and their tone was closer to a support ticket than a celebration. The comment I keep coming back to came from someone who ran the same coding task on Qwen 3.8 27B and on DeepSeek-V4-Flash. On Cerebras he hit the per-minute token cap in about 90 seconds, burned $1.10 of a $5 trial credit, and the task was nowhere near done at a 64k context. DeepSeek finished in 172 seconds and cost $0.024. His summary: too fast for its own good.

## The quota is the real spec

Why would fast lose to slow? The developer tier allows 150k uncached tokens per minute and 450k total, shared across your whole account. Input tokens count. Cached tokens count. At 1,500 tokens per second you can exhaust 150k of context in under two minutes of actual generation, and an agent that re-sends its context on every tool call burns the minute before the model has produced anything. One commenter described their sessions as bursts of requests followed by watching the cooldown reset; wall clock ended up maybe ten percent faster than anywhere else, because most of the time was spent waiting for quota. Another ran the concurrent-user math: 150k tokens per minute at 1.5k per second is roughly three users before you get throttled.

## Fast is expensive when the meter is a minute

Speed does not change the unit you are billed on. It changes how quickly you hit it, and that is the part the marketing copy leaves out. Qwen 3.8 27B reasons by default at high effort, reasoning tokens are output tokens, and this class of model over-thinks; one commenter said individual coding turns can run 3k to 10k tokens of thinking alone. Multiply that by agent loops that re-read files and re-plan, and a fast endpoint becomes a device for converting a trial credit into an error message.

## What local actually looks like now

The usual retort is to buy a GPU, and the local numbers are less embarrassing than Cerebras would like. An RTX 5090 running Ninfer gets about 160 tokens per second on this model, which one owner described as very usable. A DGX Spark serves the FP8 version at tens of tokens per second. That is a real 10x gap on raw speed, but local has no per-minute cap, no cached-token tax, and no billing limbo. For a three-minute agentic task with a large context, local and throttled Cerebras can land surprisingly close on wall clock.

## The public tier is a billboard

Which raises the question of what the public tier is actually for. Cerebras is selling wafers, not tokens. The public API keeps them at the top of the OpenRouter speed leaderboard, and that position feeds the hardware business. One commenter put it bluntly: the public service exists so they get some users on OpenRouter, which shows them at number one on speed, which proves the tech, which gets them the hardware deals. The behavior around the shared tier supports that reading. The same day Qwen landed, Gemma disappeared from the shared catalog with no migration notice; developers had been told on Discord a week earlier, and when they complained they were told nobody should build production on the shared tier anyway. Another account reported being stuck in billing limbo, an enterprise flag blocking self-serve, with the API returning model\_not\_found when the real problem was billing. The line that summarized the thread: Cerebras the tech is awesome, Cerebras the company is a trainwreck.

## What to actually check before you buy inference

None of this means the speed is fake. It means tokens per second is a demo number, and the product number is your sustained throughput after rate limits, your price per completed task, and the provider's cache and quota policy. Before you wire an agent to any fast endpoint, run the arithmetic on your real workload: context size per turn, turns per task, tokens of reasoning per turn. Ask what happens when the model roster changes under you. And price the local option, because the gap is closing from below while the providers keep rationing from above.

The model itself is good enough to matter, which is exactly why the rationing is frustrating. If a 27B runs this well, sustained and unthrottled, it quietly eats the market for a lot of paid API calls. That is the real story under the speed number.

Source: [Qwen 3.8 27B available on Cerebras at 1500 tokens/s](https://inference-docs.cerebras.ai/models/overview) · [HN discussion](https://news.ycombinator.com/item?id=49554520)
