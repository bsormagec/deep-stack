---
title: "The Frontier Model You Can Read About but Can't Buy"
dek: "**Subtitle:** Gemini 4 Argon's launch has a benchmark table, a price footnote, and a velvet rope. Only the footnote tells you what you will actually pay."
date: 2026-10-02
image: "/images/the-frontier-model-you-can-read-about.webp"
---
The interesting thing about Google's Gemini 4 Argon launch is not the benchmark table. It is the footnote under the price table.

Google announced Argon on September 30 — in a post by Koray Kavukcuoglu, SVP of Google DeepMind and Chief AI Architect, titled "our next era of frontier intelligence" — with a 19-row benchmark comparison against GPT-6 Astra, Claude Opus 5.5, and Claude Fable 5.1. By Google's count, Argon leads on 13 of the 19 rows. DeepSWE v1.1, which measures real-world long-horizon software engineering: 77.9%, a new state of the art. AutomationBench, Zapier's end-to-end business-task benchmark: 51.3%, ranked number one. CWE-bench v1 for vulnerability remediation: 68%, tied for first. LVBench for long video understanding: 91.7%. And the output ceiling jumps from 64K tokens to a million.

That sounds like a launch. It isn't.

## The price doubles, on a date nobody will tell you

Argon launches at $2 per million input tokens and $10 per million output tokens, with cached input at 95% off the input price. That is exactly the $2/$10 tier where the industry's near-frontier tier now lives — OpenAI's GPT-6.1 Sol and Anthropic's Claude Sonnet 5.5 both arrived there within days of Argon. But Google says the rate is introductory, and that it will double to $4/$20, the Claude Opus 5.5 tier, at some point. No end date for the introductory window has been published.

This is the industry's default playbook now: launch at the promotional tier, let the benchmarks make the rounds at the promo price, and graduate to the premium tier later. For builders, the takeaway is practical: price your cost projections at $4/$20, not $2/$10. The introductory number is marketing inventory with an expiry date; your per-task costs at steady state will be set by the post-intro rate. There is a cliff in your budget that you cannot see, and Google drew it.

## A million output tokens is the real story

Lost in the benchmark noise is the thing that changes architecture: Argon can generate up to a million tokens in a single response. Rivals cap output around 128K. For agentic workloads — multi-step coding tasks, long document reasoning, the jobs where agents currently stall halfway — output headroom is the binding constraint, not raw intelligence. Google's claim is that when the model has room to think across hundreds of thousands of tokens in a single trajectory, it finishes tasks in one go that otherwise fragment.

The internal evidence is striking, with the usual caveat that it comes from Google about Google. Argon agents analyzing fleet-wide profiling telemetry identified memory optimizations across Google's data centers, freeing over 300 TiB of memory, with an estimated 500 TiB to 1 PiB in total savings. Argon agents are migrating C/C++ codebases to Rust across Google — tens of thousands of lines in core libraries like re2 and libgav1, up to 800K+ lines of the Fuchsia Zircon kernel. For libgav1, they took an existing Rust port, replaced 32K lines of SIMD code through profile-guided experiments, and produced a memory-safe video decoder that runs 2.7x faster with identical output.

Treat those numbers as the vendor's best case, not as measurements. But the mechanism is real: long trajectories change what an agent can finish. And the cost math changes with it — a million-token output at $10 per million (later $20) accumulates in a single response. The cost-per-task metric that matters now is output-heavy, and nobody's calculator is calibrated for it yet.

## The velvet rope

Almost nobody can verify any of this, because almost nobody can use the model. Argon is rolling out first to "trusted cyber defenders" through Google's Fairwind Program, and to Google's own internal teams. For those users, Google is releasing Argon *without cyber guardrails*, so they can leverage its full frontier-level offensive-defensive capability. Paid API customers and Google AI Ultra subscribers come later; then developers, enterprises, consumers. There is no public date and no public API model ID.

That ordering is new. The strongest version of a frontier model goes first to people whose job is breaking software, with the guardrails removed, while developers wait behind a phased rollout that Google says is coordinated with the U.S. government's voluntary pre-release model access process. There is a version of this logic I respect — the people defending infrastructure should hold the best tools first. There is also a version where "launch" has quietly become a word for "press release plus waitlist," and the benchmark lead is theoretical until anyone outside Google can reproduce it.

## The skeptics inside the building

Bloomberg reported the same day as the announcement that some Google employees with direct access say Argon performs less well on real coding tasks than the benchmarks suggest. Google told Bloomberg the characterization is inaccurate; one employee said there is "large consensus" inside the company that the model is at the frontier. Meanwhile the one independent leaderboard that has tested it, Artificial Analysis's Intelligence Index, scores Argon (high) at 53 — tied with GPT-6 Astra and Claude Fable 5.1, with Claude Opus 5.5 leading at 58 — and notes Argon costs about a third as much per task. And in Google's own 19-row table, Argon comes last of the four on FrontierSWE v2 and Terminal-bench 4.0.

The Hacker News discussion — 1,675 points and nearly 1,160 comments the day after the announcement — focused less on the benchmark rows than on the access question: what a benchmark lead is worth when the model sits behind a velvet rope, and what introductory pricing means when it doubles on a mystery date.

For builders, the takeaway is practical: there are two prices for this model and you don't know when the second one arrives; there is one benchmark table and you can't reproduce it; and there is a million-token ceiling that is genuinely new engineering headroom for long-horizon agents, priced by output at rates that will show up in your bill all at once. The model that matters to your architecture is the one you can call, at the price you will actually pay, on your workload. That model is not this one. Not yet.

If that sounds less exciting than a 19-row benchmark table, good.

Source: [Introducing Gemini 4 Argon](https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-4-argon/)
