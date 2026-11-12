---
title: "The TV Box Runs a 16B Model. The Meter Never Shows Up."
dek: "A thirty-dollar streaming box and a thirteen-year-old iPad now run models that were supposed to need a datacenter. The trick is not a bigger chip. It is refusing to pay for one."
date: 2026-11-12
image: "/images/the-tv-box-runs-a-16b-model.webp"
---

The interesting thing about smolmaxxing is not that a TV box can run a language model. It is that the box was already sitting under the television, doing nothing, and nobody had to ask permission to use it.

A developer who goes by hyperionaidev has spent the last week proving that the hardware in your living room is a better inference server than the industry's pricing pages suggest. The project, smolmaxxing, runs the biggest model each device can really run — then pushes further with custom kernels, smarter memory use, and weight streaming. Every claim is measured on the hardware itself, experiment by experiment, in a log that now runs to 160 entries. It went up on Hacker News today and climbed from 47 points in the morning to 181 by the afternoon, which is the kind of climb that says the thread found a nerve.

## What the box actually runs

Device number one is a Xiaomi TV Box S, third generation: an Amlogic S7D chip, four Cortex-A55 cores at 2.5 GHz, 1.9 GB of RAM of which about 1 GB is usable, eMMC flash, Android 14, no root. On that box, per the project's README, a 16-billion-parameter mixture-of-experts model — Ling-mini-2.0 — generates 5.1 tokens a second in real chat and stays coherent over 600-word answers. An 8-billion-parameter MoE, Moon-Beam-8B-A1B, runs at 7.2 tokens a second. A dense 2-billion-parameter Qwen3.5 runs at 7.7. The smallest model, Qwen3.5-0.8B, reaches 16.8 tokens a second, 2.2 times the stock build.

That sounds like a party trick until you look at the progression. The 2B model started at 0.1 tokens a second — streamed from flash because it did not fit in RAM — and now runs at 7.7. That is a 77-fold gain on the same hardware, bought with engineering instead of silicon. The repo is eight days old. It has 188 stars and 34 commits.

## The physics, not the magic

There is no secret here, and that is the point. The box's flash reads top out at 278 MB/s, and a single 1 MB random read costs about 6 ms. A model that has to stream X megabytes of weights per token can never beat 278 divided by X tokens a second. That ceiling, not the CPU, is what limits everything above 2 billion parameters — and it is why mixture-of-experts models are the way past it. An MoE model touches roughly 1 billion of its 8 billion weights per token, so most of the model never has to cross the flash bus at all.

The rest is a list of bottlenecks attacked one at a time. The experts live on flash and are paged in with parallel direct reads, prefetched one layer ahead, with a small routing bias toward experts already in RAM — a trick borrowed from a 2024 paper — cutting cache misses from 13 percent to about 2 percent. A 1-bit lookup-table kernel, in the style of T-MAC, replaces multiplication with table lookups for weights that are only plus or minus one. A ternary packing scheme squeezes weights to 1.875 bits each without losing information. The vocabulary head is pruned to the most useful rows, saving up to half a gigabyte. None of this is a new chip. All of it is refusing to accept the stock software's answer about what the chip can do.

## The thirteen-year-old iPad

Then there is device number two, which is the one that should make the industry uncomfortable: a first-generation iPad Air from 2013. Apple A7, two cores, no dot-product instructions, 1 GB of RAM, iOS 12.5.7, jailbroken, CPU only. A 1.7-billion-parameter 1-bit model, Bonsai-1.7B, runs at 24 to 26 tokens a second on it — up from 2.75 with stock llama.cpp, an 8.6-fold gain on the same file. A 4B model runs at about 10. The 8B MoE runs at 3.5. The 16B MoE runs at 2.6 to 4.5 tokens a second, in under 580 MB of memory, its 5.5 GB file assembled over HTTP range requests and streamed straight to the tablet because the author's Mac had no room for it.

The iPad's limits are honest ones. iOS 12 caps a process at about 1.7 GB of mapped address space, and about 700 MB is the practical ceiling before the system starts killing processes. The jailbreak does not survive a reboot. And the 1-bit models still get facts wrong — in one test, Bonsai called Mercury the closest planet to Earth. These are not footnotes; they are the price of the trick, and the author prints them in the same README as the speed numbers.

## The catch

There is a second catch, and it matters more than the first. The 16B model is not the best model on either device. On the TV box, the author says plainly that the 2B is the best speed-quality balance, and that Ling-mini-2.0, twice Moon-Beam's size, scores worse per byte and runs slower. On the iPad, the 16B is twice the 8B's size at the same speed and not a better model. Bigger only helps when the model is also better, and the quality metric here — English perplexity on a fixed 22 KB text, converted to bits per byte — is the author's own harness, with no independent verification yet.

That is only half the decision, though. The point was never that a TV box beats a datacenter. The point is that the floor keeps moving down. A year ago, running an 8B model at usable speed on a phone was a demo. Now a streaming box runs a 16B MoE at five tokens a second, and a tablet from the Obama administration runs a 1.7B model at twenty-five. The hardware did not change. The software around it did — and it is open source, MIT-licensed, and eight days old.

The Hacker News discussion focused, correctly, on what this does to the argument for renting. Every token a rented model generates is a token billed; every token a TV box generates is a token nobody billed. The box costs nothing per token because it was already bought, for another purpose, years ago. That is the whole economics of local inference in one sentence, and it is why the frontier labs' pricing pages keep looking like a tax on impatience.

## For builders, the takeaway is practical

If you are building with models, the question is no longer whether small hardware can run them. It is which of your workloads actually need the rented frontier, and which ones fit in a gigabyte of RAM you already own. The smolmaxxing repo is not a product — it is a set of patches on llama.cpp, a bench harness, and a 160-experiment log. But it is also a working answer to the question every local-inference skeptic asks: show me the numbers. The numbers are 5.1 tokens a second for 16 billion parameters on a TV box, and 24 on a tablet old enough to vote in some countries.

The cheapest inference server keeps turning out to be the hardware people already own. This week it is a TV box and a 2013 iPad. Next week it will be something else in the drawer.

That is the problem — for the meter, anyway.

Source: [I'm making LLMs work on small and old devices](https://github.com/hyperionaidev/smolmaxxing)
