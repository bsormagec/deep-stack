---
title: "The Laptop That Runs Fast Only on Windows"
dek: "On Nvidia's RTX Spark laptops, the same model runs at full speed on Windows and crawls on native Linux — because the power firmware is encrypted, and Linux cannot read it."
date: 2026-11-04
image: "/images/the-laptop-that-runs-fast-only-on-windows.webp"
---

The interesting thing about Nvidia's RTX Spark laptops is not that they are slow on Linux. It is that the speed you bought depends on the operating system you boot.

RTX Spark is Nvidia's laptop platform for local AI: a Grace CPU and a Blackwell GPU sharing up to 128 GB of unified memory, pitched, in Nvidia's own platform claims, at running models of up to 120 billion parameters on the machine itself. The MSI Prestige N16 Flip AI Plus, one of the first RTX Spark laptops, is listed at $3,299 in early coverage. The pitch is independence from the cloud. The catch, reported this week, is that independence has an operating-system condition attached.

## What the tests actually show

The story reached Hacker News on November 4 as "Nvidia RTX Spark encrypted firmware slows inference speed to 35% on Linux" (382 points, 186 comments at the time of this run's front-page fetch), pointing to a MindStudio piece that could not be opened directly for this article — that source is blocked to the text reader used here, so what follows rests on the secondary coverage and the test it reports, and the numbers must be read with that caveat.

The secondary reports do not agree on a single figure, and that disagreement is itself the story. A HackerByte summary of the MindStudio piece says the MSI laptop's GPU clock sits at around 780 MHz on Linux when plugged in, against over 2 GHz on Windows. A Medium piece published November 4 puts the same comparison in tokens: 65 tokens per second on Windows against 13.9 on native Linux, roughly a fifth of the speed, not the 35 percent of the headline. A separate, earlier test by Alex Ziskind, published October 31 and covered by NeoTeo, found something stranger still: on the same MSI laptop, LM Studio generated 61 tokens per second on native Linux while unplugged, and 15 tokens per second when plugged in.

Those are three different measurements, on one laptop model, and they should not be averaged into a clean number. The plugged-in detail matters most. A laptop that gets slower when you plug it in has inverted the usual logic of performance. Ziskind attributed the drop to missing support in Linux for Nvidia's Platform Controllers and Framework — the power-management layer that tells the chip how fast it is allowed to run. The HackerByte summary gives the mechanism a sharper name: encrypted power-management firmware that Linux cannot use.

That sounds like a deliberate throttle. It isn't, or at least it hasn't been shown to be one. No Nvidia response appears in the sources read for this article, and the encrypted-firmware explanation is a reported interpretation, not a confirmed cause. What is confirmed, across the tests, is narrower: on this laptop, under these workloads, native Linux does not unlock the chip's full clock, while Windows — and, tellingly, Windows Subsystem for Linux running inside Windows — does. Ziskind reported 65.1 tokens per second on WSL against 65.4 on native Windows in a separate GPTQ Qwen/OSS 120B test. The hardware did not change. The software stack around it did.

## The fine print was already there

Here is the part that should annoy buyers most: this was, in a sense, disclosed. RTX Spark laptops ship with Windows 11 on Arm, and Linux is not officially supported on them — the nearest option, in the words of one platform guide, is WSL2, and even that is not yet reliable for every workload. The sibling machine, the DGX Spark desktop, runs Linux natively. The laptop does not, officially, at all.

So a buyer who installs Linux on an RTX Spark laptop is already off the supported path. That does not make the slowdown fair, but it does change what it is. It is not a hidden defect discovered in a supported product. It is the predictable result of buying a machine whose full performance lives inside a closed firmware and driver stack that only one operating system has been given the keys to.

And the counterpoint deserves equal weight, because it stops this from becoming a platform-wide claim. A separate Linux port on an ASUS ProArt P16 with the same class of chip, documented in October, did not show the same collapse: its author measured a code-review task at 30.9 tokens per second on Linux, in line with Windows measurements on a different machine with a different quant. One laptop, one workload, one port — but enough to say the MSI result is not yet proof about every RTX Spark laptop. It is proof about what can happen when the power layer is closed and the port is unofficial.

## Why this is a Deep Stack story

For builders, the takeaway is practical: benchmark the stack you will actually run, not the chip on the box. A spec sheet that says 128 GB of unified memory and up to a petaflop of FP4 compute says nothing about whether your operating system can drive the chip to its rated clock. The meter that matters here is not tokens per second in a review. It is tokens per second on your machine, under your OS, with your model and quant — and whether that number survives being plugged in.

There is a larger pattern here, and Hacker News commenters saw it immediately. The discussion ran to market segmentation: the same silicon, gated by firmware, sold at different effective speeds to different buyers. That framing is older than AI — IBM shipped mainframes with processors you had paid for but could not use until you paid a licence fee — but AI gives it a new edge. When the workload is a model running locally precisely so that it does not depend on a vendor's cloud, a firmware gate that only one OS can open reintroduces the dependency through the side door. The model is yours. The weights are open. The clock is not.

That is the problem. Local AI was supposed to move the meter from the vendor's bill to your own hardware. On this laptop, on Linux, the hardware is present and the speed is withheld — not by a missing feature, but by a power-management layer that the open operating system cannot read. Until Nvidia publishes the firmware interface, or the Linux support that the DGX Spark already enjoys, the honest buying advice is blunt: if you plan to run Linux natively, do not buy an RTX Spark laptop on the strength of its Windows numbers. Buy it on a Linux benchmark, on that exact machine, or buy the machine that already runs your OS at full speed.

Source: [Nvidia RTX Spark encrypted firmware slows inference speed to 35% on Linux](https://www.mindstudio.ai/blog/linux-nvidia-rtx-spark-laptop)
