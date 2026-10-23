---
title: "Your Chip Is Not Generic. Your Inference Engine Is."
dek: "Magnitude's self-optimizing Rust engine tunes its kernels on your actual hardware and beats llama.cpp by up to 2x — but only where the tuning cost pays off."
date: 2026-10-01
image: "/images/your-chip-is-not-generic-your-inference.webp"
---
The interesting thing about Magnitude is not that it is up to 2x faster than llama.cpp. It is that the speedup comes from rejecting a premise every inference engine has quietly accepted: that you ship one set of kernels and eat the cost of generality.

Today's Launch HN comes from Anders and Tom (YC S25), two engineers who previously built an open-source browser agent to 4,000+ GitHub stars and 100,000+ downloads. They kept trying to run that agent on local models, found every engine made the wrong tradeoff, and built Magnitude: an Apache 2.0, Rust-based inference engine that compiles and tunes its kernels on your actual device before the model runs. It profiles your machine, recommends models for it, and connects one-click to the agent you already use — Pi, OpenCode, Hermes, OpenClaw, Codex, Claude Code, Oh My Pi, Cline, and anything else through an OpenAI-compatible API. No token costs, nothing leaves your machine, no internet needed once a model is downloaded.

The mechanism is the pitch. Existing engines sit on a spectrum: vLLM and SGLang are built for batched datacenter inference and sacrifice single-session speed; llama.cpp and Ollama generalize across hardware at the cost of peak performance; specialized engines like oMLX lack engine completeness. Magnitude writes kernels with flexible parameters and runs a custom GPU kernel runtime plus autotuner on your machine, fitting the kernel to your exact chip — the hardware-specific performance ceiling without the hardware-specific lock-in. Around that core: hybrid paged attention that lets concurrent agent sessions share prefix caches without punishing single-session speed, and dynamic memory that reserves only the weights up front, grows the heap as agent sessions lengthen, and frees it when they stop — so your machine stays usable while agents run in the background.

The numbers, from the founders' launch post (HN item 49911995, 169 points and 85 comments at the time of writing): benchmarked against llama.cpp on Qwen 3.6 35B A3B at 4-bit, 64k context, no speculative decoding. On Metal (Mac M4 Pro, 48 GB): decode jumps from 30 to 57 tokens/s — 92% faster — prefill from 466 to 507 tok/s (+9%), and 28% less memory per agent. On CUDA (DGX Spark): decode from 49 to 58 tok/s (+19%), prefill from 2,033 to 2,507 tok/s (+23%), 27% less memory. Decode is the number that matters for agents — agentic workloads are long, chatty loops, and the per-token rate is the loop rate. The memory number matters almost as much: several agents running at once is the normal case, and 28% less memory per agent is roughly one extra session on the same machine.

## The CPU footnote

Here is the part that tells you where the trick works. An independent test by Local Model Watch, published the same day as the launch, ran Magnitude 0.2.3 on a CPU-only server — a Neoverse-N1 with three cores — against llama.cpp b11223 with the same Qwen3.5-4B GGUF file. Magnitude: 0.24–0.41 tokens/s. llama.cpp: 4.92–6.19 tokens/s. Roughly 21x slower. The site's verdict is blunt: the official "up to 2x faster" figures are for Metal and CUDA only, and it does not recommend Magnitude for CPU-only machines.

That sounds like a debunk. It isn't. It is the cost map of the approach. Autotuning is a fixed cost you pay before the model runs; on a GPU with thousands of parallel lanes, tuned kernels pay it back immediately. On three ARM cores, there is nothing to harvest, and the generality tax you dodged gets replaced by a tuning tax you cannot amortize. The founders never hid this — their own benchmarks are Metal and CUDA only — but it is worth saying plainly: Magnitude is not "faster than llama.cpp." It is faster than llama.cpp on hardware with a GPU worth tuning for.

## Why agents, and why now

The design decision that deserves more attention than the benchmark is the shape of the workload. None of the existing engines are built for how agents actually run: sessions that last an hour, several of them at once, on a machine you still want to use for other things. vLLM optimizes for the datacenter. llama.cpp optimizes for everywhere. Nobody optimized for a laptop running three coding agents while you answer email.

This is becoming a theme in this publication's coverage of the local stack. Last week Ollaya attacked the same problem from the model side — small decision models at roughly 10 ms per request versus 236–276 ms for hosted APIs. Ember-1 attacked it from the token side — 35–50% fewer reasoning tokens at the same quality. Magnitude attacks it from the runtime side. The local agent cost equation was never just the model price; it is latency per loop iteration, memory contention, and background usability. Three different teams, three different layers, same equation.

The catch worth watching: "hand-optimized kernels for the most popular open-weight families" is a concentration bet. If your agent runs on a mainstream family, you get the full autotuned ceiling. If it runs on something exotic, you get the generic path — and the 2x story does not apply. And the roadmap — expert streaming for models bigger than your GPU, a full kernel compiler, multi-device layout solving — is ambitious in exactly the way that doubles the surface area for "works on my machine" problems. A self-tuning engine that tunes itself into a corner is a real failure mode, and it is too early to know how often it happens.

For builders, the takeaway is practical: if your agents already run locally and your hardware has a GPU, a self-tuning engine is worth the afternoon it takes to test — the per-agent memory savings alone may buy you an extra concurrent session. If your fleet is CPU-only, stay with llama.cpp and watch this one from the sidelines.

The generic kernel was a fine default when local models were a novelty. They are not a novelty anymore. That is the whole argument.

Source: [Launch HN: Magnitude (YC S25) – Self-optimizing inference engine for agents](https://news.ycombinator.com/item?id=49911995)
