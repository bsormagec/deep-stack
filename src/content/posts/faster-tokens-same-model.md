---
title: "Faster Tokens, Same Model"
dek: "A small patch set makes llama.cpp nearly twice as fast on AMD cards — and the interesting part is what it didn't change."
date: 2026-11-26
image: "/images/faster-tokens-same-model.webp"
---

The interesting thing about a 57 percent speedup is not the speed. It is what the speed cost.

A post on devnull.land, currently sitting at the top of Hacker News, reports a small set of AMD-specific patches for llama.cpp — the project is called llama-cpp-rdna-boosts — that took token generation from about 35 to about 55 tokens per second, and prefill from about 700 to about 1,300 tokens per second. The setup is an AMD R9700 connected to a laptop over an eGPU link, running a 27-billion-parameter Qwen3.8 model in Q6_K_L quantization with multi-token prediction enabled. The author is careful to add "your mileage may vary," and he should be. One machine, one model, one quant. But the numbers are not the story. The story is that the model is the same model on both sides of the before-and-after table.

That sounds like a low bar. It isn't. It is the one thing the current wave of bespoke inference engines keeps failing to clear.

## The fork wave

As of November 2026, the author writes, there has been an explosion of bespoke inference engines. The pattern is familiar by now: a generalist engine like llama.cpp, SGLang, or vLLM is optimized for no particular hardware and for broad compatibility, so someone forks it for one card, one model family, one workload — and, with a frontier model doing most of the coding, moves faster than the upstream project ever could. Strata, Basalt, RustingStrata, a fork of vLLM called vllm-radiance. The results are genuinely impressive. Strata, the author notes, runs a heavily quantized 180-billion-parameter Qwen 3.8 Flash Next on a 16-gigabyte graphics card with 16 gigabytes of system RAM and generates tokens at a rate that would have sounded like a typo a year ago.

Speed is the pitch, and speed is what gets measured. But as these projects evolved, the author writes, the optimizations stopped being only about hardware. They started changing how the model thinks so that it goes faster. His example is Strata itself: it prefers to poll the experts that happen to be loaded in VRAM, even when other experts — pushed out to system RAM or disk — would have been the ones the model normally chose. The routing decision, which is the model's judgment about which part of itself to consult, gets quietly overridden by where the weights happen to sit.

That is not a kernel optimization. That is a different model wearing the same name.

## The question nobody benchmarks

The Hacker News thread picked up exactly this point. One commenter asked it plainly: is anyone actually checking the output quality of the tokens with these optimizations, or just chasing pure speed? Another put it more bluntly, saying he has a hard time trusting anything other than llama.cpp itself, because the vibe-coded speed projects so commonly make changes like that. A third noted the same tension from the other side: Strata is "super willing to degrade quality for tps," and he wants his model as close to the original as possible for agentic work.

The thread is right to be suspicious, and the suspicion has a number attached to it. Tokens per second is a clean, single number. Output quality is a messy, expensive thing to measure, and almost nobody publishing a speed fork publishes the quality measurement alongside it. A fork that silently routes to the wrong experts can look 2x faster on every benchmark that only counts tokens, because the benchmark never asks whether the tokens are the ones the model would have produced. The meter measures throughput. The user pays in answers.

This is the same pattern Deep Stack keeps finding in a different costume. The harness is the meter; the benchmark is the meter; now the inference engine is the meter too. Every layer between the user and the model has a number it can optimize, and every one of those numbers can be bought by quietly degrading something the number doesn't see.

## What the patches actually are

The rdna-boosts project is built to be the opposite kind of fork. It is not a rewritten engine. It is a minimal set of changes applied against a pinned commit of llama.cpp, re-applied as upstream moves forward. The author lists his reasons plainly: llama.cpp is a stable base, contributions are vetted thoroughly and applied judiciously, and a small patch set has fewer moving parts to maintain. The changes themselves are, in his words, "somewhat opaquely, it's all straight Claudish" — written by Claude, documented loosely — which is its own caveat, and he does not hide it.

The practical part is simple. If you have the ROCm libraries installed you can build it yourself; if you don't, there are pre-built images. The author pulled `ghcr.io/stew675/llama-cpp-rdna-boosts:server-rocm-10.1` and ran it sandboxed in Podman with the card passed through. No new engine to learn, no new server to babysit. The same llama.cpp server, with AMD-specific kernels underneath.

And the result, on his hardware, is the table: prefill roughly 700 to roughly 1,300 tokens per second, decode roughly 35 to roughly 55. That is an 86 percent improvement in prefill and a 57 percent improvement in decode, on a consumer card hanging off a laptop, running a 27-billion-parameter model that would have needed a datacenter card not long ago. The author's own framing is modest — one setup, one model — and the modesty is part of the point. A patch set that does less is easier to trust, and easier to verify, than an engine that does everything.

## The second-hand market agrees

The thread around the post adds a detail worth keeping. There is a small ecosystem of people optimizing llama.cpp for AMD's older datacenter cards — the circa-2018 gfx906 series, like the Instinct MI50 with 16 or 32 gigabytes of VRAM and around a terabyte per second of HBM2 bandwidth. Commenters report picking them up for around $200 to $300 a card, six months ago, and getting 70 tokens per second out of a pair running a quantized model. ROCm has already dropped those cards, so the support is Vulkan and community patches, and the cooling is your problem. But the arithmetic is the arithmetic: a few hundred dollars for a card with a terabyte per second of memory bandwidth is a local-inference deal that no new card matches, and the only thing standing between that hardware and a usable model is exactly this kind of patch — small, hardware-specific, and honest about what it changes.

It is worth noting where the generalist engine itself now lives. Commenters on the thread point out that llama.cpp's core team joined Hugging Face in February of this year, and that Nvidia's acquisition of Hugging Face was finalized in August. Nobody in the thread claims Nvidia directs the project, and there is no evidence in the post that it does. But the ownership chain is part of why the forks exist: the engine that everyone builds on now sits inside the house of the company that sells the cards the engine is least optimized for. The community patches are, among other things, a hedge against that arrangement.

## For builders, the takeaway is practical

If you run models locally, the question to ask about any speed claim is now a two-part question, and the second part matters more than the first. How many tokens per second — and is it still the same model? A patch that speeds up the kernels and leaves the routing alone is a different kind of claim from an engine that speeds up the tokens by changing which experts answer. The first kind you can verify with a benchmark. The second kind you can only verify by reading the code, and the code is the part the speed post usually doesn't show you.

The rdna-boosts numbers are one person's measurements on one card, and they should be treated that way. But the shape of the project is the thing to copy: a small, re-appliable patch set on a stable base, with the changes small enough to audit and the speed honest enough to reproduce. The fastest engine in the world is not worth much if you can't tell what it did to your model to get there.

A fast answer is nice. The same answer, faster, is what changes the workflow.

Source: [AMD Specific Patches for Llama.cpp](https://devnull.land/amd-specific-llama-cpp)
