---
title: "The 284B Model Fits in 64GB. The Quantization Is the Price."
dek: "A patched llama.cpp fork squeezes DeepSeek-V4-Flash onto a CPU with no GPU. The headline number is real. So is the 2-bit catch."
date: 2026-11-08
image: "/images/the-284b-model-fits-in-64gb.webp"
---

The interesting thing about llama-modchip is not that a 284-billion-parameter model fits in 64 gigabytes of RAM. It is what "fits" costs — and what the headline quietly leaves out.

The project, a fork of llama.cpp by a developer publishing as synchopate, hit the top of Hacker News this morning with a clean promise: run DeepSeek-V4-Flash, a 284-billion-parameter frontier mixture-of-experts model, on a plain 64GB CPU machine with zero GPUs. No rented H100, no cloud bill, no datacenter. The machine you already own, running the model class you were told needs a server rack.

That promise is real, in the narrow sense. The README's own table puts it at 56.56 GiB on disk and 57.61 GiB of peak memory at a full 256K context, on an AMD Ryzen 9 9955HX with no GPU at all: 44.4 tokens per second of prefill, 9.1 to 14.7 tokens per second of decode. A 30-billion-parameter Nemotron model in the same project runs at 25 to 60 tokens per second in 14.35 GiB, and up to 111 tokens per second on a Threadripper. The repository was created on October 29, 2026, and already carries a technical paper, a community leaderboard, and a one-command installer.

For builders who have spent the last two years being told that frontier inference is a service you rent by the token, that is a genuinely interesting number. The question is what it buys.

## How the squeeze works

The compression is not one trick. It is a stack of them, and each one trades something.

The headline mechanism is a second-order Hessian compression of the model's SwiGLU feed-forward layers, which the author says shaves 20.31 GiB off the checkpoint, plus a custom "Fractal-64" transcoding of the attention weights down to 3.75 bits per weight. On top of that sits register-level tiling for AVX-512, a speculative-decoding drafter borrowed from chess-engine thinking (named Stockfish-PVS, with a 96.4% acceptance rate claimed), and MoE pruning that runs fewer experts per token than the model was built to use.

That last item is the one worth pausing on. DeepSeek-V4-Flash activates 13.17 billion of its 284 billion parameters per token, routing each token to a handful of experts. The modchip build runs fewer experts per token than the model's native routing — the Hacker News thread's close reading puts it at four experts where the model expects six. The model still runs. It is no longer quite the model.

Then there is the format. The compressed weights use a custom tensor type, GGML_TYPE_Q2_0, that stock llama.cpp, Ollama, and LM Studio do not understand. The README says so plainly: open these files in an unpatched tool and you get an "unknown tensor type" error. The weights only run inside the project's own patched binary. That is not a detail. It means the 56 GiB file is not a portable model — it is a model plus a fork, and the fork is the price of admission.

## The thread asked the right question

The Hacker News discussion, at 194 points and 62 comments by Sunday afternoon, did not argue about the tokens per second. It asked the question the README buries: at which quantization?

The answer is roughly two bits per weight. And the thread's consensus, from people who actually run sub-4-bit models, is blunt: below four bits, output quality falls off a cliff in ways benchmarks often hide. One commenter put it as the field's version of "in mice" — the 2-bit quant is the "look how big a model I can fit on this hardware" of local inference. Another noted that the project's own quality gate is self-reported at 100 out of 100, with no independent benchmark in sight. A third found the README's own numbers inconsistent: the claimed stock size of 76.87 GiB does not match Unsloth's published sizes for the same model, where even the smallest 1-bit quant is 82.5 GB.

None of this makes the project fake. It makes the headline a different claim than it appears to be. A 284-billion-parameter model at 3.75 bits per weight, with pruned expert routing, is not a 284-billion-parameter model in the sense that the benchmark tables mean. It is a compressed shadow of one — and the shadow may still be useful. The thread's most practical voices said exactly that: a 2-bit DeepSeek-V4-Flash can still be the best thing that fits in 64 GB, because the alternative is not the full model, it is a smaller one. One user reports running a 2-bit V4 Flash at about 15 tokens per second as a secondary model alongside a hosted one. The honest comparison is never the original model. It is what else fits in the same box.

There are two more catches the headline does not carry. The decode speed — 9 to 15 tokens per second — is fine for a chat window and slow for an agent. The project's own answer to that is a "Zero-API Claude Code" mode that wires the Claude Code CLI to the local engine with a 13-millisecond KV-cache restore, which is genuinely clever and also an admission: the raw speed is not enough for agentic work without a cache trick. And the base model itself is already a generation old. DeepSeek-V4-Flash 0731 has been superseded by V4.1 Flash 1017 and by GLM 5.3 Flash, as the thread's skeptics were quick to point out. The frontier moved while the compression was being built.

## The part that actually matters

Strip away the 284-billion headline and the project has a second, quieter claim that deserves more attention than the first. The 30-billion-parameter Nemotron model runs at 25 to 60 tokens per second in 14.35 GiB — on a 16 to 32 GB laptop, the machine a developer actually carries. That is not a party trick. That is a usable coding model, at interactive speed, on hardware that costs nothing extra, with no API key and no per-token bill.

That is the pattern Deep Stack keeps finding. The PS5 running llama.cpp, the Switch 2 jailbreak, the team of small Qwen models beating a frontier model on a benchmark — the cheapest inference box keeps turning out to be hardware people already own. The 284B headline is the bait. The 30B model on a laptop is the catch.

For builders, the takeaway is practical: if you want to run a frontier-class model locally, the question is no longer whether it fits. It is what you gave up to make it fit, and whether the thing that fits is still the thing you wanted. Read the quantization before the token count. A model at 2 bits is a different model, and a fork-locked format is a different kind of rent — paid in maintenance instead of tokens.

The wall was never really the RAM. It was the assumption that the number on the tin survives the squeeze. It doesn't. But the box under your desk just got a lot more interesting anyway.

Source: [Llama-modchip: 284B DeepSeek on 64GB RAM, no GPU](https://github.com/synchopate/llama-modchip)
