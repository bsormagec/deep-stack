---
title: "The Engine Was the Moat. They Opened It Anyway."
dek: "## DeepSeek published the production inference stack behind its low prices — and left the hardest serving pieces out"
date: 2026-10-20
image: "/images/the-engine-was-the-moat-they-opened.webp"
---
The interesting thing about DeepSeek open-sourcing its inference engine is not that another model got released. It is that the part most labs treat as the business itself just became a GitHub repository.

Weights are cheap to admire. Serving is where the bill is decided.

On October 20, DeepSeek published DeepInfer on GitHub, describing it in its own README as "the high-performance inference framework that powers DeepSeek's large-scale production services." The repository, at the time it was fetched for this article, showed 10,145 stars and 892 forks on GitHub, and it is released under the Apache License 2.0, according to the GitHub repository page. Anyone can use it, change it, and sell work built on it.

That sounds like a full opening. It isn't.

### What actually shipped

DeepInfer, in this first release, does one thing narrowly and seriously: offline inference for one model.

The README lists DeepSeek-V4.1-Flash as the only supported model. The default checkpoint, deepseek-ai/DeepSeek-V4.1-Flash-1017, is downloaded into the Hugging Face cache on first run, according to the README. There is no long model list, no general serving story for arbitrary checkpoints, and no online API server presented as the headline.

The hardware list is equally narrow. The README lists two supported targets: NVIDIA SM100 GPUs and Huawei Ascend 950 NPUs. The prerequisites, also from the README, are Linux, GCC 13 or higher, Python 3.12, and either CUDA 13 for NVIDIA or CANN 9.2 for Ascend. Both are data-center parts. This is not a laptop story, and it is not a story about the graphics card already under a desk.

Inside that narrow scope, the engineering is real. The README lists optimized kernels including FlashMLA, DeepGEMM, and DeepEP, plus TileLang kernels, attention data parallelism and balanced context parallelism, and mixture-of-experts expert parallelism with expert load balancing. It lists DSpark speculative decoding with confidence-scheduled verification — the README says the maximum draft length defaults to 5 — asynchronous scheduling that overlaps CPU batch scheduling with device execution, structured outputs constrained by regex, JSON schema, or EBNF grammar, and, on NVIDIA only, batch-invariant inference and deterministic sampling.

The performance charts in the README were measured, according to the README itself, on 4 SM100 GPUs for prefill and 64 SM100 GPUs for decode, each within one scale-up domain. That detail matters more than the charts. The numbers were not produced on a workstation. They were produced on the kind of cluster most readers will never rent by the hour, let alone buy.

Secondary coverage of the release repeats production figures attributed to DeepSeek itself: 155 trillion tokens per day per cluster, a 96% input cache hit rate, an average time-to-first-token of around 400 milliseconds, and generation at 230 tokens per second, rising to 300 tokens per second for coding, as reported by Crypto Briefing from DeepSeek's own material. Those are DeepSeek's numbers. They have not been independently tested in the coverage, and they should be read that way — as a claim about a production system at production scale, not as a promise for a fresh clone on a smaller rack.

### The reversal

Eighteen months ago, DeepSeek said it would not do this.

In an April 2025 note, recounted in coverage of the DeepInfer release, DeepSeek said it had considered releasing its full inference engine and decided against it, because the code was a heavily customised early fork of vLLM, was tightly coupled with its internal cluster tools, and its small team lacked the bandwidth to maintain a large open-source project. It promised to contribute pieces to existing projects instead.

DeepInfer's README keeps that lineage visible. It says DeepInfer was "originally built primarily on vLLM," with additional inspiration from SGLang and TensorRT-LLM. So the engine that shipped is not a clean-room invention presented as magic. It is a production fork, cleaned up enough to publish, standing on work the wider inference community already knows.

That history makes the reversal more interesting, not less. A lab does not publish the serving stack that underwrites its low prices because it suddenly discovered generosity. It publishes when the strategic value of being the open reference — for a model family, for two hardware ecosystems at once, for the kernels and parallelism patterns other builders will now learn from its code — outweighs the value of keeping that stack private.

The Hacker News discussion reached the front page quickly: the story was ranked first on Hacker News at fetch time, with 356 points and 120 comments. That ranking is itself a data point. Builders did not react as if another checkpoint had dropped. They reacted as if someone had opened the kitchen.

### What was left out

Read the README's shortest section carefully. It is the most honest part of the release.

Under "Required for a complete inference service (not included in this release)," DeepInfer lists three missing pieces: a KV cache system, VE/prefill/decode disaggregation, and load balancing across data-parallel replicas for both prefill and decode.

In plain terms: the engine that runs the model is here. The systems that make a cluster of those engines behave like a reliable, economical public service over a full day of uneven traffic are not all here.

That is only half the decision if you stop at the code. A KV cache decides how much repeated context you recompute and how much you keep resident. Prefill/decode disaggregation decides whether long prompts starve short answers or the reverse. Load balancing decides whether expensive accelerators sit idle while another replica queues. Those are not decorative features around inference. At scale, they are inference economics.

So the release gives builders the core and withholds the choreography. You can study how DeepSeek runs a forward pass efficiently across experts and devices. You cannot clone its production service by cloning this repository, and the README, to its credit, does not pretend otherwise.

That gap is where the cost story lives. Open weights lowered the price of having a model. Open kernels lowered the price of running it well on a single job. What still separates a lab's $ per million tokens from a self-hoster's is the unglamorous layer that keeps utilisation high when real traffic arrives in bursts, with mixed prompt lengths, repeated prefixes, and no patience.

DeepInfer narrows that gap. It does not close it.

### Two chips, one message

The dual hardware support deserves its own paragraph because it is doing political and practical work at the same time.

Supporting NVIDIA SM100 and Huawei Ascend 950 in the first public release, as the README does, means the same production framework is presented as portable across the American accelerator stack and the Chinese one. For builders outside both vendors' home markets, that portability is practical: code written against DeepInfer is not tied to a single supply chain on day one. For DeepSeek, it is also a statement that its efficiency story is not an artifact of one vendor's libraries. The kernels and parallelism had to survive a second stack.

Whether independent builders reproduce the README's throughput on Ascend at the same efficiency as on SM100 is an open question the release alone cannot answer. No independent comparison was present in the coverage fetched for this article. The claim to test is not that both logos appear in the README. It is that both paths stay maintained when the next model lands — DeepSeek said in its announcement, as reported in coverage, that inference code for future models will land in the same repository. If that promise holds, DeepInfer becomes a cadence, not a one-off dump. If it slips, this becomes a snapshot of V4.1-Flash serving in October 2026.

For builders, the takeaway is practical: do not evaluate DeepInfer as a faster way to run a model you already serve well with vLLM or SGLang today on smaller hardware — its supported list will not meet you there. Evaluate it as a reference implementation. Read how it schedules verification for draft tokens, how it balances experts, how it keeps sampling deterministic when batch composition changes. Those patterns travel even when the exact stack does not fit your rack. The second practical step is accounting: before quoting a self-hosted cost per token based on DeepInfer's headline throughput, add back the missing service layer — cache, disaggregation, balancing — in engineering time and in idle capacity. That is the part of DeepSeek's bill this release does not pay for you.

The front door was the model. The side door was the kernels, published one by one over the past two years. This week DeepSeek opened the engine room — and kept the building's wiring diagram in a drawer.

That is still more of the building than anyone else at this scale has shown.

Source: [DeepSeek just open-sourced its inference engine](https://github.com/deepseek-ai/DeepInfer)
