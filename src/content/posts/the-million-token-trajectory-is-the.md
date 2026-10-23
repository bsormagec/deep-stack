---
title: "The Million-Token Trajectory Is the Invoice"
dek: "*Gemini 4 Argon's headline feature is a 1M-token output limit per run. The interesting part is the price tag attached to it — and its expiry date.*"
date: 2026-10-01
image: "/images/the-million-token-trajectory-is-the.webp"
---
The interesting thing about Google's Gemini 4 Argon announcement is not the benchmarks. It is the receipt.

Argon is Google DeepMind's new frontier model, announced September 30 by DeepMind SVP Koray Kavukcuoglu. It is built, in Google's words, "to sustain deep reasoning across complex, long-horizon workflows" — real-world software engineering, enterprise knowledge work, cybersecurity defense. On the benchmarks Google chose to report, the numbers are strong: 77.9% on DeepSWE v1.1, a new state of the art (Google's own chart puts Claude Opus 5.5 at 74.2% and GPT-6 Astra at 74.1%, as reported by 9to5Google), first place on Zapier's AutomationBench at 51.3%, 91.7% on LVBench for long video understanding, and a tie for first on CWE-bench v1 at 68% for vulnerability remediation. None of these has been independently reproduced — every figure here is Google reporting its own model — but the direction is consistent. This is a model built to run long.

The run is the point. Argon's output limit is 1 million tokens per trajectory, up from 64K. Google's own framing: "When the model has the headroom to think deeply and generate hundreds of thousands of tokens in a single trajectory, it adds a new level of depth in reasoning to solve tough problems in one go."

Headroom is a funny word for it. A million output tokens at Argon's introductory price of $10 per million output tokens is a $10 ceiling on output alone per run, before a single input token is counted. After the introductory period, the price rises to $4 per million input and $20 per million output tokens — the trajectory ceiling doubles to $20. The intro row and the 95%-off cached input discount come straight from Google's announcement; the post-intro $4/$20 row comes from press coverage of that same announcement. And the "introductory" footnote is doing exactly what introductory prices always do: anchoring your architecture to a number you will not be paying in six months.

## The price has an expiry date

The introductory row — $2 per million input, $10 per million output, cached input at 95% off the input price — is identical to Anthropic's Sonnet 5.5 row, the model this publication covered two days ago under the headline "the price didn't change, the denominator did." Google is matching the current frontier price and then telling you, in the same announcement, that it won't last. The honest cost of running Argon is the post-intro row: $4/$20. Any budget built on $2/$10 is a budget with a timer on it.

The 95% cached-input discount is the tell about where the real savings live. At $2/M input with cache at $0.10/M, the model is practically begging you to architect around cache hits: stable system prompts, repeated prefixes, long trajectories that re-read the same context instead of re-paying for it. The discount is not generosity. It is a steer. Google knows the workloads Argon is built for — codebase migrations measured in hundreds of thousands of lines, agentic loops that burn through long contexts — and the only way those stay affordable is if you never pay full input price twice for the same context.

## The demos are denominated in compute

Google's internal case studies read like invoices wearing a lab coat. Argon agents analyzed fleet-wide profiling telemetry and applied memory optimizations across Google's data centers, freeing 300 TiB of memory with an estimated 500 TiB to 1 PiB in total savings. A quantum algorithms team had Argon beat a published baseline by 40% "in a matter of minutes." The C++-to-Rust migration program runs from tens of thousands of lines in core libraries like re2 and libgav1 up to 800K+ lines for the Fuchsia Zircon kernel; on libgav1, Argon replaced 32K lines of SIMD code through "many rounds of profile-guided experiments" and produced a memory-safe decoder running 2.7x faster than the existing Rust port, with identical output.

These are real results, and they are also the shape of the bill: "many rounds of profile-guided experiments," "hundreds of thousands of tokens in a single trajectory." The unit of work is no longer the prompt. It is the trajectory — a long, stateful, cache-friendly run that you price per attempt, not per token.

## Safety moved from the model to the mailing list

The other phased rollout deserves a paragraph, because it rhymes. Argon is first available to "trusted cyber defenders" through Google's Fairwind Program — and for those defenders and Google's own internal teams, the model ships "without cyber guardrails so they can leverage its full frontier-level cybersecurity defense capabilities." The general release keeps the refusals. Google names exactly one Fairwind participant (Wiz, whose Scan for Good initiative used Argon to find a critical healthcare-software vulnerability that, Google says, previous frontier models had missed) and publishes no membership criteria, no participant count, no application route.

Read that twice. Until now, the industry's story was that safety lived in the model — in the refusal training. Argon keeps that for the public and removes it for a list. The safety property has moved from the capability to the population: from what the model won't do to who is allowed to ask. There is a version of this I would use — defenders genuinely need unneutered tools, and the healthcare vulnerability is the kind of finding that justifies it — but "trusted" is doing a lot of unexamined work when the trust criteria are unpublished.

The Hacker News thread, at 1,443 points and 948 comments the morning after launch, is the biggest AI launch thread in weeks, and the split in it is instructive: one half argues about the benchmark charts, the other about who gets the unguarded model. Both halves are asking the same question, which is who the frontier is actually for.

## For builders, the takeaway is practical

Price the trajectory, not the token. If you are building on Argon-class models, your cost model needs three lines, not one: the intro price you launch on, the post-intro price you will actually pay, and the cached-input architecture that keeps the middle number from eating you. Budget per attempt — per migration run, per vuln-hunt loop — because the model's whole pitch is that attempts are now long. And read "introductory" the way you read "free tier": as a migration hook, not a price.

The frontier keeps getting cheaper per token and more expensive per task. Argon just made the task a million tokens long.

Source: [Introducing Gemini 4 Argon](https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-4-argon/)
