---
title: "The Test Drive That Costs Nothing"
dek: "## The speed was never on the spec sheet"
date: 2026-10-18
image: "/images/the-test-drive-that-costs-nothing.webp"
---
The interesting thing about Llmspeed is not that it benchmarks local models. It is that it admits, on its own front page, which of its numbers are not benchmarks at all.

Llmspeed, a Show HN project that reached the Hacker News front page with 300 points and 83 comments at fetch time, lets a buyer pick a piece of hardware and a model and feel how fast that model would run — simulated tokens per second and time to first token — before any money changes hands. Its own description, on llmspeed.dev, is plain: "Pick hardware and a model, and feel the real speed of a local LLM before you buy. Simulates tokens/sec and time-to-first-token from verified benchmarks for GPUs, Macs, and more."

That sounds like a shopping tool. It isn't, not quite. It is a confession about how local inference has been bought until now: on spec sheets, on memory bandwidth arithmetic done in a forum post, and on hope.

## What the tool actually covers

The catalogue is the first tell that this is aimed at real buying decisions, not demos. Llmspeed lists roughly thirty hardware configurations on its homepage, from an NVIDIA RTX 3060 12GB and an RTX 3090 24GB through an RTX 4090 24GB and RTX 5090 32GB, to unified-memory machines that have become the other local-inference route: a MacBook Pro M5 Max with 128GB, a Mac Studio M5 Ultra with 256GB and a 512GB variant, an AMD Ryzen AI Max+ 395 system with 128GB (Strix Halo), and an NVIDIA DGX Spark with 128GB. A CPU-only option — a Ryzen 9 9950X with 96GB of DDR5, per the site's listing — sits in the same menu, and so do two cloud cards, an H100 80GB and an H200 141GB, which read less like buying options and more like a reality check.

The model list is equally current. The homepage lists fifteen models, including Qwen 3.6/3.8 27B, Qwen 3.8 Flash-Next, GLM-5.3 Flash and the full GLM-5.3, Gemma 4 in 12B, 26B A4B and 31B forms, GPT-OSS 20B and 120B, DeepSeek V4 Flash and V4.1 Flash, and Llama 3.1 8B. Those are not toy sizes. Several of them are exactly the models a builder would be sizing a machine for this autumn.

The estimates, the site says, are for a short prompt on a single device. That qualifier matters, and it belongs in the first paragraph of any honest discussion of the tool, not the last.

## Measured, derived, projected — three different kinds of number

Here is the sentence that makes the project worth writing about. Llmspeed states on its homepage: "Measured numbers come from community benchmarks (r/LocalLLaMA, localscore.ai and more); others are derived from similar setups or projected from specs."

Three categories, labelled as three categories. A measured number is a receipt: someone ran this model on this hardware and reported what happened. A derived number is an interpolation: this setup is close enough to a measured one that the speed can be inferred. A projected number is a guess with a pedigree: the specifications say this is what should happen.

Most buying advice in local inference quietly blends all three into one confident tokens-per-second figure. A card's memory bandwidth gets divided by a model's size, a theoretical ceiling gets quoted as an expected speed, and a buyer spends real money on the difference between a ceiling and a result. Anyone who has run a model locally knows the gap is not small. Quantization choice, context length, prompt length, the inference engine, whether part of the model is offloaded to system RAM or an SSD — each one moves the number, sometimes by multiples.

A tool that separates the receipts from the guesses does not solve that problem. It does something more useful: it shows the buyer which part of the decision is evidence and which part is still faith.

## Why the feeling matters more than the figure

Tokens per second is an abstract unit until it becomes a wait. Five tokens per second is a model you watch type and quietly abandon. Twenty is a conversation. Fifty is a loop an agent can run without the human drifting away between steps. The same hardware purchase can be right or wrong depending on which side of that lived threshold a model lands — and the threshold is about feel as much as throughput.

That is the practical insight inside a small Show HN project. Local inference is no longer bought by researchers who will benchmark whatever arrives. It is bought by builders deciding whether a used 24GB card, a high-memory Mac, or a Strix Halo box can carry a specific model through a specific working day. Their question was never "what is the bandwidth of this chip." It was "will this feel fast enough that I keep using it."

The Hacker News discussion landed in the same place, and it is a useful data point rather than a verdict. Commenters argued the familiar dense-versus-mixture-of-experts trade-off — one widely discussed view held that dense models in the class of Qwen 3.8 27B demand substantial VRAM and run comparatively slowly, while MoE models with few active parameters extract more speed from the same hardware; another commenter reported running a roughly 127B MoE coding model on a 10GB RTX 3080 with 32GB of system RAM at 40 to 50 tokens per second with a 65k context, in that commenter's own account. Those are anecdotes from the thread, not measurements by this article, but they show the shape of the real decision: the model architecture, the RAM ceiling, and the offload path matter as much as the GPU badge.

## The catch

That sounds like the hardware problem is solved. It isn't.

A simulation of a short prompt on a single device cannot tell a buyer what happens at a long context, under sustained load, with a large KV cache competing for the same memory the weights already fill, or after twenty minutes of thermal throttling in a small case. It cannot tell them whether the model that feels fast is the model that is good enough at their task — the Hacker News thread itself split on whether the faster MoE options match denser models on coding work. Speed you can feel is necessary. It was never sufficient.

There is also the standing problem with every community-benchmark pool: the measured rows are only as comparable as the setups behind them. Different engines, different quantizations, and different prompt shapes produce different numbers for the same named model on the same named card. Llmspeed is open source on GitHub, per its homepage, which at least makes its derivations inspectable — a buyer who cares can read how a projected number was produced instead of trusting a black box. That is diligence with a browser, applied to a purchase.

None of that makes the tool useless. It makes it a first filter, and first filters are where most of the money is saved. The expensive mistake in local inference is not buying a card that is ten percent slower than expected. It is buying a card whose memory ceiling excludes the model you actually wanted, or whose speed lands below the feel threshold on day one. A free simulation that rules out that purchase before checkout has already paid for itself.

## What a builder does with this

For builders, the takeaway is practical: before buying hardware for a local model, run the pairing through a tool like Llmspeed, note whether the number for your exact model and device is measured, derived, or projected, and treat only the first of those as evidence. Then test the shortlist on hardware you already own or can borrow, at your real context length, with your real prompts. The spec sheet was never going to answer the question you were actually asking.

The local model itself got cheap a long time ago. The weights are free. What stayed expensive was finding out you bought the wrong machine to run them on.

A test drive does not make the machine cheaper. It makes the mistake cheaper. That is the problem it solves.

Source: [llmspeed — feel local LLM speed before you buy](https://llmspeed.dev/)
