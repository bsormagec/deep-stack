---
title: "Local AI Finally Feels Like a Computer, Not a Science Project"
dek: "What the M5 Ultra changes for agentic workflows, and what it does not"
date: 2026-09-21
image: "/images/local-ai-finally-feels-like-a-computer.webp"
---
The most important number in Federico Viticci’s M5 Ultra review is not the Mac’s peak tokens per second. It is the time spent staring at an empty screen.

That sounds like a small distinction. It is not. For local AI agents, the delay before the first token often matters more than the final generation rate. An agent has to absorb a system prompt, memories, tool descriptions, and an expanding conversation before it can do anything useful. If every turn begins with a long pause, the workflow feels broken even when the model eventually writes quickly.

Viticci’s tests suggest that the M5 Ultra changes this experience enough to make local agents practical for sustained use. The machine is not a replacement for an RTX 5090 in every benchmark, and it is not a cheap way to buy frontier intelligence. Its advantage is different: it combines enough memory, useful prompt processing, decent generation speed, and a quiet desktop form factor in one machine.

## The bottleneck is the loop

A chat completion is easy to benchmark. Send a prompt, measure tokens per second, publish the chart. An agent loop is messier. The model reads a large context, decides what to do, calls a tool, reads the result, and repeats. Every turn carries more state.

That makes prompt processing a first-class performance problem. In the review, the M5 Ultra processed prompts about 2.5 times faster than the author’s M3 Ultra, a roughly 150 percent improvement. Generation was about 70 percent faster on average. With Qwen3.8-Flash-Next, the M5 Ultra could exceed 100 tokens per second on short prompts and remain around 60 to 85 tokens per second with much larger contexts.

Those numbers matter because a fast agent does not merely answer faster. It can try more things. It can make a tool call, inspect the result, revise its plan, and continue without turning each step into a coffee break. That changes which workflows are tolerable.

## Memory capacity beats a clean leaderboard

The Hacker News discussion pushed back on the review’s GPU comparisons, and the criticism is fair. Several commenters pointed out that an RTX 5090 can produce much higher numbers with different quantization and inference software. On a small enough model, the 5090 wins decisively.

But this is where a single throughput number becomes misleading. The 5090 has 32 GB of VRAM. The tested M5 Ultra had 256 GB of unified memory. Once a model or its attention cache no longer fits comfortably on the GPU, the theoretical lead becomes less useful. PCIe offload can turn a fast token generator into a machine that spends its time moving data around.

That does not make the Mac universally better. It makes the tradeoff workload-dependent. If the job is serving a compact model as fast as possible, buy the GPU. If the job is running a larger model, keeping a long context, or hosting several sessions without building a loud workstation around it, memory capacity becomes part of the speed calculation.

A commenter described the 5090 as an unusually fast model that still needs constant supervision, while a larger-memory system can handle broader context and more complex refactoring. That is anecdotal, but it captures the practical difference better than a leaderboard does: the useful unit is not tokens per second. It is completed work per hour of human attention.

## Local changes the economics of experimentation

The review’s strongest example is Desk, an internal research app used for an iOS and iPadOS review. A group of local agents worked for 99 days across 310 documents. They transcribed sessions, extracted features from web pages and PDFs, cross-referenced evidence, inspected screenshots, and organized the results through Notion.

The author says the research stack cost zero in API usage. The hardware was obviously expensive, so “zero cost” does not mean free. It means the marginal cost of leaving agents running was effectively removed.

That distinction matters for builders. Cloud APIs are excellent when a task is occasional, bounded, or needs the strongest available model. They become harder to justify when an agent needs to process a large archive continuously, retry failed jobs, or run background maintenance for weeks. Local inference makes those experiments cheap enough to attempt.

It also keeps the data in a machine the operator can inspect and shut down. Privacy is one reason to run locally, but control is just as important. A local stack lets you decide which models run, when they run, what they can access, and how long their state survives.

## The machine is a workflow decision

The M5 Ultra is still a costly computer. The review does not prove that it beats a cloud subscription on price, or that it is the best choice for every developer. The RTX 5090 remains faster for many smaller-model workloads, and a cloud frontier model remains easier when you want capability without maintaining infrastructure.

The more interesting result is that local AI is moving from demo territory into normal desktop work. The threshold is not “can this model answer a question?” Small machines have done that for years. The threshold is “can I keep an agent running through a long task without the interface making me regret it?”

The answer is becoming yes, provided the workload values memory and sustained interaction more than peak decode speed.

That is the decision I would take from the review. Do not buy hardware because a benchmark chart looks impressive. Measure your own loop: time to first token, performance as context grows, concurrent sessions, thermal noise, and how often you need to intervene. If the agent spends less time waiting and more time doing useful work, the hardware is earning its place on the desk.

Source: [M5 Ultra Mac Studio Review](https://www.macstories.net/stories/m5-ultra-mac-studio-review-the-dream-mac-for-local-ai-agents/)
