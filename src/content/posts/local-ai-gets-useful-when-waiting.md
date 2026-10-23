---
title: "Local AI Gets Useful When Waiting Stops"
dek: "The M5 Ultra Mac Studio is not a cheaper cloud subscription. It is a different kind of machine for long-running agent workflows."
date: 2026-09-21
image: "/images/local-ai-gets-useful-when-waiting.webp"
---
The interesting thing about the M5 Ultra Mac Studio is not that it beats an RTX 5090. It does not. The interesting thing is that it makes a local model feel usable inside an agent loop, where prompt processing, context growth, and repeated tool calls matter more than a single benchmark score.

A fast answer is nice. A fast loop is what changes the workflow.

## Why latency feels different in agents

The MacStories review compares an M5 Ultra with 256 GB of unified memory against an M3 Ultra and an RTX 5090. The M5 Ultra generated roughly 70% faster than the M3 Ultra in the author's tests, and prompt processing improved by about 150% on average. But the practical result matters more than either percentage. An agent sends system instructions, memory, tool descriptions, prior turns, and sometimes previous tool output on every turn. If prompt processing takes too long, the whole interaction feels broken even when generation speed is respectable. The review reports Qwen3.8-Flash-Next above 100 tokens per second on short prompts and around 60 to 85 tokens per second with 64K to 256K of context. That is enough to change the feel of tool-heavy work.

## Memory changes which models are practical

The RTX 5090 remains faster for many smaller workloads. It processed a 6,000-token prompt at roughly 3,000 tokens per second versus about 1,700 on the M5 Ultra, and generation favored the 5090 by roughly 25% in the tested setup. That is only half the decision. The 5090 has 32 GB of VRAM. The Mac Studio can put much larger models in a 256 GB unified memory pool, with less performance pain than pushing model layers over PCIe into system RAM. For agent builders, capacity is not a footnote. A model that fits cleanly in memory can sustain a long session, several concurrent requests, or a lead-and-helper setup. The review's three-session test is closer to orchestration work than a one-shot completion benchmark.

## The cost argument is weaker than the privacy argument

The review describes a 99-day research project powered by local agents, organizing hundreds of notes, PDFs, clipped pages, screenshots, and database records. The models ran continuously, and the inference bill was effectively zero after the hardware purchase. That does not make a $12,000-plus computer a cheap alternative to a cloud subscription. Hacker News commenters are right that low-utilization workloads are cheaper on rented GPUs or APIs. Local hardware wins the cost comparison only when the workload is large, persistent, or sensitive enough that cloud usage has a real price beyond the invoice. Privacy is a more durable reason: local inference keeps source code, internal documents, and personal notes on a machine you control, though it still needs updates, access controls, and backups.

## The better mental model is a small private inference server

The M5 Ultra turns a desktop into infrastructure. You can run an OpenAI-compatible endpoint, connect it to an agent harness, and leave it available for background work. A frontier model can plan the difficult part while a local model handles extraction, classification, indexing, document cleanup, or simpler coding tasks. These models do not need to win every task. They need to be fast enough and capable enough for jobs that do not justify a remote request. There is a catch: hardware does not solve model quality, tool design, evaluation, or operational reliability. A local agent that can run all night can also make the wrong change all night. Persistent inference increases the value of permissions, logs, checkpoints, and human review.

## What builders should take from this

Do not buy the M5 Ultra because a chart says it is fast. Buy this class of machine when your workload has long contexts, repeated agent turns, and models that exceed ordinary GPU memory. If your work is mostly short prompts against a capable hosted model, the cloud remains simpler and probably cheaper. The important benchmark is no longer just tokens per second. It is time per completed task, including prompt ingestion, tool calls, context growth, and concurrency. Large unified-memory machines make sense as private, always-on inference boxes for people who have enough work to keep them busy, not as replacements for every cloud model or magic cost-saving boxes.

Source: [M5 Ultra Mac Studio Review: The Dream Mac for Local AI Agents](https://www.macstories.net/stories/m5-ultra-mac-studio-review-the-dream-mac-for-local-ai-agents/)
