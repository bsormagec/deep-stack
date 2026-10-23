---
title: "The Chip Was Never the Moat"
dek: "## Google just open-sourced the bridge to its TPUs. Amazon built the same bridge a day earlier."
date: 2026-10-21
image: "/images/the-chip-was-never-the-moat.webp"
---
The interesting thing about TorchTPU is not that PyTorch can now run on a TPU. It is that Google finally admitted where the lock-in lived.

For a decade, the pitch for alternative accelerators was arithmetic. More FLOPS per dollar, more memory per watt, a better number on a slide. Builders nodded and stayed on Nvidia anyway, because the expensive part of leaving was never the chip. It was the rewrite — the training code that assumed CUDA, the serving stack tuned for one vendor, the debugging habits built over years. The silicon was replaceable. The software underneath it was not.

On October 20, at PyTorch Conference 2026, Google open-sourced TorchTPU, its native PyTorch stack for TPUs, according to the announcement by Mark Lohmeyer and Bill Jia on the Google Cloud blog. TPUs, in Google's own phrasing, now "join GPUs and CPUs as a native option for PyTorch." That sentence sounds like marketing. It isn't. It is a concession that the framework is the territory, and Google spent years outside it.

## What native actually means here

The old road onto a TPU ran through PyTorch/XLA — a translation layer with its own execution model, its own compile behaviour, and its own distance between the code on screen and the work on the chip. TorchTPU replaces that detour with the normal PyTorch shape of work. Per Google's announcement, it was co-developed with the PyTorch team at Meta, runs existing workloads with minimal code changes, lets you debug in eager mode, and then hands the same model to torch.compile for production performance. Hugging Face support follows the same pattern: in Transformers v5, deploying a model to a TPU is, in Google's account, as simple as passing `device_map="tpu"`.

Meta's endorsement is the tell. Jana van Greunen, Meta's Director of PyTorch Engineering, is quoted in the announcement saying Meta "cannot be constrained by a single hardware architecture," and that TorchTPU already supports major LLM, ads, and recommendation workloads in production use cases. Meta is not a charity case for Google Cloud. It is the largest PyTorch user on earth saying, in public, that hardware optionality is now a requirement — and that it will help build the bridge itself to get it.

That sounds like an ecosystem story. It is a cost story. Every workload that can move is a workload that can be priced against another vendor. Optionality is leverage, and leverage is what turns a hardware catalogue into a negotiation.

## The numbers Google chose to print

Google's training claim is specific enough to check later, which is more than most launch posts offer. Through TorchTitan, TorchTPU's training paths reached up to 52% Model FLOPs Utilization on Qwen 3 8B, with near-linear scaling across up to 8,192 Ironwood TPUs, per the announcement. TorchTitan's recipes were validated on up to 8,000 Ironwood TPUs. Coverage of the launch in TechTimes put the compatibility testing at 98% of nearly 5,000 open-source models. Those are vendor and launch-day numbers, and they will be re-measured by people who do not work for Google. But the shape matters: Google is no longer arguing TPU performance in the abstract. It is arguing it inside the framework everyone already runs.

The inference side is where the stack gets crowded, deliberately. vLLM gets a native backend built with Inferact, with continuous batching, quantization, and custom Pallas kernels. SGLang gets a backend built with RadixArk for structured and agentic workloads. And llm-d — the Kubernetes layer for distributed inference, released at 1.0 with Red Hat, IBM, and what Google describes as more than 500 contributors across 25 organizations — routes each request to the replica that already holds its context and splits prefill from decode. Google quotes one production result from Zenteiq: over 4x higher aggregate inference throughput on GKE, from 1.47 billion to 5.97 billion tokens per day per 1,000 TPU v6e accelerators. One customer quote in a vendor post is an anecdote, not a benchmark. It is still the right unit. Nobody buys FLOPS. They buy tokens per day, per dollar, per rack they already pay for.

## Two bridges in two days

The detail that turns this from a Google story into an industry one arrived a day earlier. Coverage of the launch week (Pondero and TechTimes both note the timing) reports that Amazon shipped TorchNeuron — its own native PyTorch bridge, for its Trainium chips — the day before Google's announcement. Two hyperscalers, two in-house accelerators, the same move in the same week: open-source the software layer that makes PyTorch treat your silicon as a native citizen.

That is not a coincidence, and it is not really about PyTorch. It is about where each company decided the moat sits. Nvidia's advantage was never only that its chips were fast. It was that an entire generation of tooling, tutorials, kernels, and muscle memory assumed its chips by default. You do not beat that with a faster chip. You beat it, slowly, by making the default framework stop noticing which chip is underneath. Google and Amazon have both now paid that admission price — in public, under Apache-style openness, with the serving engines builders actually use wired in from day one.

The Hacker News discussion, where the announcement sat on the front page with 351 points at fetch time, treated it less as a product launch than as a lock-in story — which is the correct instinct. The framework is becoming portable. The question is what that does to the price of the hardware beneath it.

## The catch, stated plainly

None of this makes a TPU appear in your rack. TPUs remain, overwhelmingly, a Google Cloud rental. TorchTPU lowers the cost of trying them; it does not change who owns them, how capacity is allocated, or what happens to your unit economics when a rental price moves. A builder who rewrites nothing to land on a TPU has still moved from hardware they could buy to hardware they can only lease, from one company. Portability at the framework layer and dependence at the capacity layer can coexist. Right now, they do.

There is also the ordinary launch-day discount to apply. Eager-mode debugging and one-line device changes are the demo. Production is the long tail: the custom kernel that has no Pallas equivalent yet, the operator that falls back silently, the performance cliff that only appears at your sequence lengths, on your model, under your traffic. The 52% MFU figure comes from Google's own training path on Google's own example model. Your mileage is a measurement you have not taken yet.

That is the problem with every bridge announcement. The bridge is real. The toll is posted later.

## What it changes anyway

Strip the caveats down and a structural shift remains. When Meta co-develops the TPU backend, when Hugging Face ships the device flag, when vLLM and SGLang treat TPUs as a serving target rather than an experiment, the cost of evaluating an alternative accelerator falls from a quarter of engineering to a line in a config file. Most teams will still land on GPUs for most work. That is not the point. The point is that the evaluation is now cheap enough to run — and a vendor who knows you can leave prices differently from a vendor who knows you cannot.

For builders, the takeaway is practical: keep your PyTorch clean and your hardware assumptions in one place, because the framework layer just became genuinely portable — and then measure TPU or Trainium pricing against your actual serving bill before believing any of the launch arithmetic, theirs or Nvidia's. The chip was never the moat. The default was. Defaults, once they move, do not move back.

Source: [TorchTPU is now open source: Run native PyTorch on TPUs](https://cloud.google.com/blog/topics/ai-infrastructure/torchtpu-is-now-open-source-run-native-pytorch-on-tpus)
