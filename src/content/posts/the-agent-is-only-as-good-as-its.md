---
title: "The Agent Is Only as Good as Its Instruments"
dek: "What GLM's inference stack teaches us about turning AI coding agents into reliable systems engineers"
date: 2026-09-17
image: "/images/the-agent-is-only-as-good-as-its.webp"
---
A model can write CUDA. That does not mean it can optimize an inference system.

Z.ai's account of GLM-5.3-Flash makes the distinction unusually clear. The company says an Infra Agent helped take a model from its first run on unfamiliar Chinese accelerators to a production service serving more than 62 trillion tokens in six days. The headline number is impressive: roughly three times the end-to-end serving performance of the initial stack, on a cluster of more than 100,000 devices.

The interesting part is not that an AI agent edited kernels. The interesting part is the feedback system around it. The agent became useful when the environment stopped saying "the service got slower" and started showing which computation, thread, memory path, or synchronization boundary was responsible.

That is the product lesson: agents do not become reliable engineers by seeing more code. They become reliable when their tools turn vague outcomes into small, testable questions.

## Code context is not system understanding

An inference service is a pile of interactions. A kernel can be faster in isolation and still hurt throughput because it consumes resources needed by another kernel. A transfer can be asynchronous in its implementation and effectively synchronous at the Python layer. A numerical error can stay hidden on short inputs and accumulate across a million-token context.

A repository gives an agent static context. It does not, by itself, explain why a request missed its latency target.

Z.ai describes an optimization loop built from correctness tests, runtime logs, execution traces, microbenchmarks, and end-to-end measurements. Each tool answers a different question. Kernel comparisons ask whether the computation is still correct. Traces show where time is spent and whether supposedly parallel work actually overlaps. Microbenchmarks test a narrow hypothesis cheaply. Full load tests decide whether a local improvement survives contact with production traffic.

This sounds obvious to an experienced infrastructure engineer because that engineer has built the same mental map over years. The agent needs the map made explicit.

## Dense feedback beats more telemetry

The phrase "dense feedback" can sound like a request for more dashboards. That would miss the point. Z.ai uses dense to mean feedback that is local, cheap enough to collect during iteration, and tied to an objective check.

Locality reduces the search space. "Throughput dropped 20 percent" is a symptom. "This kernel regressed for these input shapes after this tiling change" gives the agent somewhere to start.

Cost changes the iteration loop. If every hypothesis requires a full deployment and a long load test, the agent will spend most of its time waiting. A kernel test or a controlled microbenchmark can reject a bad idea before it becomes a production experiment.

Objective checks prevent a plausible story from becoming a false conclusion. A timeline can suggest that two components are blocking each other. It cannot prove that changing one call caused the improvement. That still needs a controlled comparison.

The distinction matters outside inference. The same design applies to an agent operating on a database, a CI system, or a distributed service. Give it observations that narrow the cause, experiments that run quickly, and acceptance criteria that do not depend on its own confidence.

## The bugs were ordinary. The loop was not.

One of Z.ai's examples is a precision bug in the context-parallel path of a KDA kernel. A matrix operation defaulted to TF32 behavior even though its inputs were FP32. On long contexts, the error accumulated during state merging. The fix was small: explicitly select a higher-precision mode for the two operations.

Another issue sat at the Python/C++ boundary. In the version of DeepEP they used, intra-node dispatch and combine did not explicitly release Python's GIL. A CPU wait for GPU-produced token information held up the Python thread responsible for KV transfer. The transfer mechanism could support asynchronous work, but the scheduler could not submit that work promptly. After releasing the GIL in the relevant interval, the gap between a prefill-plus-transfer scenario and the prefill baseline fell from more than 20 percent to below 1 percent.

Neither bug required mystical reasoning. Both required the right observability. The first needed a comparison between partitioned and unpartitioned computation. The second needed a timeline, a call-chain inspection, and a performance constraint. Without those instruments, an agent can inspect the whole codebase and still wander.

The optimization work followed the same pattern. The agent learned ideas from existing kernels, turned them into reusable "optimization skeletons," then tested them against the target hardware and workload. In one decode kernel, it found that tiling along the V dimension repeated normalization and gating work four times. Merging the tiles reduced redundant computation and produced a reported 1.71x speedup over the prior version.

The useful unit here is not a clever prompt. It is a repeatable experiment with a reason to exist.

## What teams should build next

Most agent projects start with the model and add tools around it. For systems work, the order should be reversed. Start by listing the decisions the agent must make, then build the cheapest trustworthy observation for each decision.

For a latency regression, expose per-stage timing and overlap. For a numerical change, expose layer-level comparisons against a reference implementation. For a resource tradeoff, expose the effect on the whole pipeline rather than only the modified kernel. For every signal, record what it can establish and what still needs an experiment.

Humans still set the objective, define the safety boundary, and review changes that touch numerical semantics, concurrency, or production risk. That is not a temporary inconvenience. Those are the parts of the system where a locally correct change can produce a globally wrong result.

The broader claim about recursive self-improvement is still ahead of the evidence. But the engineering pattern is already practical. A model can help improve the system that serves it when the system gives the model enough evidence to be wrong in a useful, diagnosable way.

That is a much more concrete path than asking an agent to "optimize the stack" and hoping its confidence tracks reality.

Source: [Toward Recursive Self-Improvement: How GLM Built Its Own Inference Infrastructure](https://z.ai/blog/glm-built-its-inference-infrastructure)
