---
title: "The Card You Own Was Never This Slow"
dek: "A free kernel module just doubled the tensor throughput of six-year-old GeForce cards. The silicon was always capable of it. The speed limit was a product decision."
date: 2026-10-24
image: "/images/the-card-you-own-was-never-this-slow.webp"
---
The interesting thing about gpu-unlock is not that it makes an old graphics card faster. It is that the card was never slow in the first place.

A small open-source project by GitHub user Zagitta, posted to Hacker News this week, removes an artificial limit on Nvidia's RTX 30-series cards. The project is a Linux kernel module that runs during early boot, before Nvidia's own driver binds the card, and rewrites two hardware speed selectors. The result, on the project's own benchmark table, is a near-doubling of half-precision tensor throughput: a 3090 Ti goes from 87.5 to 157.4 TFLOPS in BF16 matrix multiplication, from 87.46 to 118.39 TFLOPS in FP16, and from 42.58 to 82.61 TFLOPS in TF32. Those are the project's five-sample medians on a dense 8192³ GEMM at 450 W, with FP32 accumulation.

That sounds like an overclock. It isn't. Nothing is pushed past its rated clock, no voltage is raised, and no firmware is flashed. The module writes speed selector SS0 to `0x88888888`, which selects the full BF16 rate, and SS1 to `0x8`, then performs a function-level reset of the card and hands it back to the completely unmodified Nvidia driver. The card then runs at the same instruction issue rate that Nvidia's professional cards, built on the identical GA102 die, have always run at.

## The same die, two speed limits

This is the part that stings. The RTX 3090 and the RTX A5000 workstation card share the same 8nm Samsung GA102 silicon. The professional card was allowed to issue FP16 and BF16 fused multiply-add instructions into FP32 accumulators at full rate. The consumer card was set to half rate. The difference was never in the silicon. It was in a register, set at boot, invisible to every benchmark that treats the driver as ground truth.

Market segmentation by firmware is not new. What is new is how cleanly this one comes apart. The unlock combines two earlier techniques: the V67/PLM register method developed for Nvidia's CMP mining cards, and the pre-driver timing of a UEFI approach. Because the module runs in the initramfs before the Nvidia driver loads, there is no patched driver to maintain through every driver update — the complaint that killed most previous driver mods. The module also does nothing unless the user opts in on the kernel command line, card by card or all at once, and removing the package removes the module and its initramfs hooks.

The Hacker News discussion, predictably, split between delight and suspicion. The delight is easy to understand: the RTX 3090 is the local-inference workhorse, with 24 GB of VRAM that no current consumer card at a sane price matches. The suspicion is worth taking seriously too. This is a kernel module that rewrites GPU registers at boot, built on firmware derived from a pinned CMP reference, and it only runs on Linux. It is version 1.0.0 of a project created on October 18. Early adopters are, as always, the test suite.

## What actually gets faster

The honest numbers are narrower than the headline numbers, and the project's own compatibility table says so. Dense GEMM throughput gains across user reports range from about +25% on a power-capped 3090 (the lowest figure comes from a card capped at 225 W) to about +80% on a 3060 12 GB, with the 3080 at +70–73% and the 3070 at +73–81%. Matrix-heavy work speeds up: LLM prefill is up 14–36% across four reports, and diffusion and FlashAttention workloads benefit too.

But LLM decode — the token-by-token generation that dominates a chatbot session — stays about the same, because decode is limited by memory bandwidth, not tensor throughput. INT8 work stays about the same too. One community report running a local model on two cards found prefill up only about 10–12%, because only roughly 40% of that prefill path was GEMM-bound. The reports that compared outputs found them bit-identical before and after the unlock, which is reassuring and also exactly what you would expect: the arithmetic did not change, only how fast instructions are issued.

For builders, the takeaway is practical: if your workload is prefill-heavy, batch-heavy, or image-generation-heavy, a card you already own just got meaningfully faster for free. If your workload is interactive decode on a single user prompt, nothing changed, and no kernel module will change it — that bottleneck is the memory bus, and it always was.

## The bill you already paid

There is a second story here, and it is the one that will outlast this module. The RTX 30 series is six years old. Millions of these cards are in machines right now, and the local-model ecosystem — the engines, the quantization formats, the serving stacks — was built around their limits. Every cost model that priced a 3090 at half its tensor rate was pricing a fiction. The card was not a budget compromise. It was a professional card wearing a consumer speed limit.

That reframes the used-GPU market, too. A 3090's value was never just its 24 GB of VRAM; it was 24 GB attached to a die that could do nearly twice the tensor math it was allowed to do. The unlock does not change the VRAM, the power draw, or the age of the card. It changes what the card is. And it raises an awkward question for every vendor that segments by register rather than by silicon: how much of the upgrade cycle is a hardware cycle, and how much of it is a permission slip?

The module will not stay unanswered. Nvidia could close this path in a future driver or firmware, or it could simply not care — the 30 series is old, and the customers who run Linux kernel modules at boot were never the customers buying A5000s. Either way, the interesting precedent is set: the most effective inference upgrade of the year was not a new chip. It was deleting a speed limit from a chip that shipped in 2020.

The card you own was never this slow. It was just never allowed to show you.

Source: [GPU-unlock: FP/BF16 instruction issue rate on Nvidia 3000's cards](https://github.com/Zagitta/gpu-unlock)
