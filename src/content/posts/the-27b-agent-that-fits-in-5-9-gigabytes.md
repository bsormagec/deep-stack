---
title: "The 27B Agent That Fits in 5.9 Gigabytes"
dek: "PrismML's Ternary Bonsai 2.5 closes most of the gap to its full-precision parent — and the gap that remains is the interesting part."
date: 2026-11-25
image: "/images/the-27b-agent-that-fits-in-5-9-gigabytes.webp"
---

The interesting thing about a 27-billion-parameter model in 5.9 gigabytes is not the compression. It is what the compression stopped costing.

PrismML announced Ternary Bonsai 2.5 27B on November 24, 2026. It is built on Qwen3.8 27B, the same base model that has been the reference point for local agent work all month, and it stores each weight as one of three values — minus one, zero, plus one — instead of the sixteen bits the full-precision model uses. The result fits on a laptop, runs under llama.cpp on NVIDIA and Intel GPUs and under MLX on Apple silicon, and ships under the Apache 2.0 license. The Hacker News thread, at 513 points and 163 comments when this run checked it, treated it as the latest entry in a month-long argument about how small a capable model can get.

That argument has a scoreboard now, and PrismML published it. The numbers are the vendor's own, from the announcement and its whitepaper, and they deserve to be read as a vendor's numbers. Still, the shape of them is the story.

## The gap that closed

On SWE-bench Verified, the standard test of whether a model can fix real software issues, the full-precision Qwen3.8 27B scores 80.6. The previous ternary release, Bonsai 2, scored 60.8 — a model you could run anywhere that could not quite do the job. Bonsai 2.5 scores 75.6. That is not a rounding error. It is fifteen points recovered in one release, and it puts a 5.9 GB model within five points of its 54 GB parent on the benchmark that matters most for agentic coding.

The pattern repeats across the table. On Terminal-Bench 2.1, 60.1 against the base model's 70.8, up from 52.8. On AppWorld, the multi-step tool-use benchmark, 90.5 against 93.2 — up from 51.2, which is less an improvement than a rescue. On DeepSWE v1.1, the previous version scored zero. Not low. Zero. Bonsai 2.5 scores 27, against the base model's 30.1. Whatever was breaking long agent runs in the old model — PrismML says it spent this release fixing excessive thinking and repetitive loops — is mostly fixed.

One number even flips. On τ³-Bench, a test of multi-turn tool use, Bonsai 2.5 scores 73.9, a hair above the full-precision model's 72.8. And on LiveCodeBench v6 it scores 83.0, slightly below Bonsai 2's 83.8 — the one place the new model gives ground to its predecessor, and a useful reminder that a benchmark table is a set of trade-offs, not a victory lap.

## Why agents are the hard test

Agentic work is the worst case for a compressed model, and that is why this release is worth more attention than another small-model announcement. A chat answer is one shot. An agent run is dozens of tool calls in sequence, and a small error early compounds into a derailed task late. That is the mechanism PrismML names in its own announcement, and it is the honest reason the previous version's DeepSWE score of zero mattered more than any of its other numbers. A model that can answer questions but cannot finish a task is not a smaller agent. It is a demo.

The speed figures tell the same story from the other side. On a single H100, PrismML reports 291 tokens per second with multi-token prediction, and a 2,000-token prompt processed at 3,200 tokens per second. On a consumer RTX 4090, 204 tokens per second with multi-token prediction and roughly 3,060 tokens per second of prompt processing. Those are vendor measurements on vendor hardware, and the prompt-processing numbers are the ones that matter for agent loops, where every tool result comes back as a long context to re-read. A model that generates fast but re-reads slowly is still a slow agent.

## The counterpoint, from the thread

The Hacker News discussion is right to be skeptical, and the skepticism is specific enough to be useful. One commenter noted that 75.6 on SWE-bench Verified is roughly where Opus 4.6 sat when it was released in February 2026, and asked the right question: how much of this is the model, how much is benchmark-targeted tuning, and how much is the benchmark itself drifting as the frontier moves? Another put it more bluntly, betting that the practical experience will not match Opus 4.6, whatever the table says. Both points land. A benchmark score is a claim about a test, not a promise about your repository.

The sharpest counterpoint came from a commenter who pointed out the trade-off directly: if you can already run Qwen3.8 27B at 4-bit quantization, this model is not for you. That is correct, and it defines the audience. Bonsai 2.5 is not for the machine with a 24 GB GPU and room to spare. It is for the machine where the choice is between a ternary 27B model and a much smaller full-precision one — a laptop, a phone, a device where 5.9 GB is the whole budget. The comparison that matters is not against its parent. It is against what else fits in the same memory.

That comparison has been running all month on this page. Two days ago, NariQ squeezed the same Qwen3.8 27B base into a 10 GB 3-bit file and matched or beat full precision on agent benchmarks. Three weeks ago, a fork of llama.cpp squeezed a 284-billion-parameter DeepSeek model into 64 GB of RAM. The direction is consistent: the frontier is no longer only about bigger models. It is about how much capability survives when the model is forced to fit the hardware people already own.

## What it costs to run your own

For builders, the takeaway is practical: the agent you run locally no longer has to be the weak one. A 5.9 GB model that scores 75.6 on SWE-bench Verified and 90.5 on AppWorld is good enough to be the default for private work — code in a repository you cannot upload, documents you cannot send to an API, tools that touch your own machine. That is the use case PrismML names, and it is the one where the rented model has a structural disadvantage no benchmark measures: every token leaves your device.

There is a version of this idea I would use. Not as a replacement for the frontier models, which still lead on the hardest tasks and on the benchmarks where Bonsai trails — Terminal-Bench, LiveCodeBench — but as the agent that lives on the laptop and handles the work that should never have left it. The local model stops being the compromise you accept for privacy. It starts being the tool you reach for first, and the API becomes the escalation path.

The catch is the one the thread already named. These are the vendor's numbers, on the vendor's chosen benchmarks, with no independent verification yet. The zero on DeepSWE last time is a reminder that a single release can hide a broken behavior behind a respectable average, and the LiveCodeBench slip shows the new release is not better at everything. Treat the table as a reason to try the model, not as a verdict on it. It is Apache-licensed and 5.9 GB. The cheapest way to check a claim like this is to run it.

That is the problem with the old framing, and the reason it is finally breaking. The question was never whether a small model could be almost as good as a big one. It was whether "almost" was good enough to change where the work happens. At 75.6 on SWE-bench Verified, in 5.9 gigabytes, on hardware you already own — it is getting hard to say no.

Source: [Introducing Ternary Bonsai 2.5 27B: Powering Agentic Coding and Private Knowledge Work](https://prismml.com/news/bonsai-2-5-27b)
