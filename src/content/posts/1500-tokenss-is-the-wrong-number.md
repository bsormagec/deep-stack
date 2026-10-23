---
title: "1500 tokens/s is the wrong number to benchmark"
dek: "Cerebras is serving Qwen 3.8 27B at roughly 1500 tokens per second. It's an engineering flex. It's also nearly irrelevant for the way most of us actually run models."
date: 2026-09-04
image: "/images/1500-tokenss-is-the-wrong-number.webp"
---
Cerebras put Qwen 3.8 27B behind a public API endpoint, and the number everyone grabbed was 1500 tokens per second. That is genuinely fast. Streaming output at that rate means the response starts rendering before your finger leaves the Enter key. It feels like the model is reading ahead of your patience.

Here is the thing though. For the way most of us actually run models, inside an agent loop with half a codebase sitting in context, that number is close to irrelevant. The interesting part of this announcement is not the throughput. It is the rate limits and the pricing.

## What actually shipped

Qwen 3.8 27B is a dense 27-billion-parameter model. Dense, not MoE, which matters: every token costs full compute. Cerebras serves it at roughly 1500 tokens per second on the public endpoint, with 64k context on the free tier and 128k when you pay. Input runs $0.99 per million tokens, output $1.49. Reasoning defaults to "high", and the model will happily burn thousands of tokens thinking before it answers a question that a frontier model would answer instantly.

The fine print is where the story lives. The developer tier allows 300 requests per minute, 150k uncached input tokens per minute, and 450k total. And cached input tokens are billed at the same rate as fresh ones. The docs confirm prompt caching is supported. It just does not change the price. Several HN commenters measured cache hit rates above 90 percent, re-sent the same context on every turn of a session, and paid full freight for every token of it.

## Agent work is input-bound

Nobody should be surprised that agentic coding is an input-token game. Every tool call re-sends the whole conversation. The model reads the file tree, reads the file, runs the test, reads the error. Documentation and half the repo end up in context long before the model is asked to write a line of code. Output tokens are the tip of the iceberg. Input tokens are the iceberg.

Cerebras pricing makes that iceberg expensive. One measured run from the discussion thread: a developer hit the 450k total token limit about 90 seconds into a coding task and burned $1.10. The same task on DeepSeek-V4-Flash took 172 seconds and cost $0.024. Different models, so it is not a fair head-to-head, but the shape of the story is right. At 1500 tokens a second you are paying for the privilege of reading faster, not writing faster. When output is a small fraction of total tokens, a huge output speedup buys you almost nothing on the bill.

Another thread participant ran a short code-review session on Cerebras and on OpenRouter. Cerebras: $1.60 and 5.1 minutes. OpenRouter averages: $0.29 and 14.4 minutes. That is 5.6x the money for 2.8x the speed, with a 91.4 percent cache hit rate earning no discount. Some people happily make that trade. Most people will not, and the longer the session, the worse the trade gets.

## Burst, not sustained

The best comment in the whole thread calls it a "race to sleep". 150k input tokens per minute is a small budget. Three or four concurrent agent sessions with 50k of context each chew through it in under a minute at Cerebras's own speeds, and then everyone sits in cooldown watching a timer. It is excellent for bursts of quick decisions. Classify this. Extract that. Give me a title. It is a poor workhorse for the agent that reads a lot and writes a little.

This is Amdahl's law wearing an LLM costume. The speedup you actually feel is bounded by the fraction of wall time spent generating output. If the model spends most of the session reading, calling tools, and growing its context, a 10x output speedup nets you maybe 2x end to end. That matches the practitioner reports: roughly the same waiting time as a normal provider, because the bottleneck moved somewhere else.

## What it is actually good for

I will be honest with you: I find the speed exhilarating and the fit narrow. One-shot structured work is the sweet spot. Title generation, classification, JSON extraction, a quick review pass over a small diff. Anything where the request is small, the answer comes back fast, and the session ends quickly. That is a real category, and at 1500 tokens a second it feels instant in a way that matters for product UX.

Local is the other answer, and the thread shows why the debate is more nuanced than the headline. The model runs at 150 to 200 tokens per second on a decent consumer card. Ten times slower in raw terms, ten times cheaper in every other term. Two people in the discussion run the same Qwen 3.8 27B locally. One calls it unbelievably good, credibly attempting everything thrown at it. The other says it spins in circles until it forgets the original question. Same weights, wildly different results. That gap is deployment: quantization level, KV cache precision, context settings, reasoning effort. Model quality is a distribution. Your serving stack decides where you land on it.

## The takeaway

We have finally reached the point where picking a model is like picking a database or an object store. You do not benchmark the tool. You benchmark the workload. Tokens-per-dollar for the actual task. End-to-end completion time for the actual session. Cache behavior. Rate limits. Those numbers, not the marketing throughput, decide whether an endpoint is good at your job.

Cerebras has done something real here. The public endpoint is a demo for enterprise hardware, and it is an extremely good demo. But if you are putting a model in a loop, the question is never how fast it writes. It is how much it costs to think, and how long until the whole task is done. At 1500 tokens a second, Qwen 3.8 27B answers those questions wrong. At 150 tokens a second on hardware you control, it answers them right.

Source: [Qwen 3.8 27B available on Cerebras at 1500 tokens/s](https://inference-docs.cerebras.ai/models/overview)
