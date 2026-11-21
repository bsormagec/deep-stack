---
title: "The Model Built the Chip That Runs the Model"
dek: "Ankit Gupta had never written Verilog. He pointed coding agents at an AWS FPGA anyway, and days and $10,000 in tokens later it was serving a language model at 213 tokens a second, bit-for-bit exact. The speed is not the story. The meter moving is."
date: 2026-11-21
image: "/images/the-model-built-the-chip-that-runs-the-model.webp"
---
The interesting thing about a man vibe-coding an inference chip is not that it worked. It is that the bill for the work arrived in the same currency as the work itself.

Ankit Gupta, a partner at YC, had never written Verilog and had never seriously worked with FPGAs. He had overheard founders talking about them, knew the basic idea — a chip you reprogram into a circuit instead of a general-purpose processor — and knew the work involved a mountain of C++ and manually reading waveforms. Then his machine-learning brain asked the obvious question: could one of these run AI inference? He rented an AWS F2 instance with FPGA hardware, picked up DeepGrove's ternary-weight model architecture, and set a cloud coding agent loose in Conductor. The agent ran for days. It wrote roughly 3 million lines of code across the experiment history and parsed 30 million lines of output, per Gupta's account, published November 20. The token bill came to about $10,000 in Claude and OpenAI usage, spent from a budget he credits to YC.

That sounds like a lot of money for a curiosity project. It isn't, once you see what it bought. The first full-model image ran at 6.43 tokens a second. Fourteen optimization steps later it ran at 213.13 — a 33-fold improvement, every step of it bit-for-bit identical to a reference CPU run. The human's prompts during those days were, by his own account, mostly encouragement: "you're a superintelligent model, time to be more creative" and "let's go for 2x faster, you got this." He used Astra and Opus interchangeably; both passed his smart-enough threshold.

## Why an FPGA, and why this model

An FPGA is a chip whose logic and routing are determined by the configuration loaded onto it, rather than fixed at the factory like a CPU or GPU. That reconfigurability is the whole pitch for inference: instead of running a model on hardware built for everything, you build hardware shaped around one model. It is also the whole cost, and the Hacker News discussion was quick to point that out — FPGAs pay roughly 10 to 100 times the overhead of an ASIC in die area, power, and routing, because every logic block is a lookup table plus SRAM plus programmable interconnect instead of a direct gate. An FPGA is a prototyping surface, not a production answer, and Gupta says so himself.

The model made the project tractable. DeepGrove's architecture uses ternary weights — each weight is one of three values, stored in 2 bits — so the multiply step becomes a 3-to-1 multiplexer picking the activation, its negation, or zero. No multipliers at all. Weights pack at 2 bits, eight times more per transfer than 16-bit weights, which matters because at batch size one, fetching weights costs far more energy and time than the math. The whole thing fit in the F2 instance's 16 GB of FPGA high-bandwidth memory — the precondition for the entire stunt, since a frontier-scale model would not fit. Its parameter count is not stated in the post, so this is a demonstration of a method, not a benchmark of a model.

## Fourteen small multiplications

The optimization log is the most instructive part of the post, because it is boring in exactly the right way. There is no single breakthrough. There are fourteen steps, most of them worth about 1.5 times each, compounding from 6.43 to 213.13 tokens a second.

Host overhead fell first, from roughly 10 milliseconds per command to 0.9. Then a 128-lane attention engine that reads the key-value cache in bursts instead of a word at a time. Then a parallel router for the mixture-of-experts layers, a glue engine that parallelizes norms and quantization, a whole new pipeline with streaming ternary projection lanes, exact speculative decoding — first by prompt lookup, then with a real draft model running on the host CPUs while the FPGA verifies every token. Later steps doubled memory ports, hid attention fetches behind compute, packed weights losslessly into 5-trit groups, and fixed a relay that had been moving router weights between dies at one-sixth speed.

None of that reads like a genius insight. That is the point. Each step was a modest, checkable improvement found by a loop that could measure, break, and retry without a human in the middle. The loop's real fuel was iteration speed — hundreds of experiments, each verified against a reference that could say yes or no in bits.

## The comparison that survives contact with the numbers

Gupta ran the comparison on November 15, replaying the same benchmark — eight chats, three turns each — across machines, and published the table with the prices recorded alongside. The final FPGA image, on an f2.6xlarge at $1.98 an hour, served 213.13 tokens a second with all 24 turns matching the pinned CPU reference exactly. A 32-core Zen 5 CPU instance at $1.95 an hour managed 129.5 tokens a second, also exact — so the FPGA was 1.65 times faster at essentially the same hourly price. A community CUDA port onto a T4 GPU hit 166.3 tokens a second for $0.53 an hour, but matched zero of the 24 turns exactly. A faster result that is not the same result is a different product.

There is a catch, and Gupta publishes it rather than burying it. Speed falls as context grows. At 6,000 to 8,000 tokens of context the final image runs at about 76 tokens a second, and a full run filling the 8,192-token context took 77.8 seconds — roughly tied with the previous image, not better. The short-context headline is real, and the long-context reality is that the gains flatten. Anybody quoting 213 tokens a second without the context curve is selling, not reporting.

## What the human actually did

The most quoted part of the post will probably be the human's near-absence from the design. He pasted in a long prompt from the DeepGrove founders summarizing their lessons, and later asked the agent to audit which of those ideas it had actually used. The agent's answer is worth reading straight: its biggest design ideas were already in its own plan before the prompt arrived. The five numeric shortcuts in the founders' notes — lower-precision activations, a deferred norm, an 8-bit KV cache, online softmax, 16-bit probabilities — were all rejected, because each one changed the output bits. The bit-exact rule ruled them out.

What the human contributed was not the design idea. It was the accuracy rule and the iteration speed. The one piece of guidance that changed things immediately was process advice: don't run simulations that take hours. The agent stopped a simulation that had run about 24 hours and two long builds, and switched to a short loop of C tests, synthesis, and a logic-depth check. That got hardware results sooner — at the cost, the agent admitted, of two hangs that only full RTL simulation could have caught, which then ate 38 hours. The trade was real in both directions, and the post says so.

That is the version of this story a builder should take home. The agent is good at managing exploration. The human is still useful at defining what correctness looks like and how fast the loop should spin. The loop works because correctness is checkable: a token either matches the reference or it doesn't. Domains where the answer is checkable in bits are where agents will eat the most work first. Domains where correctness is a judgment call are where they will stall.

## The second chip in two days

This is the second day in a row the hardware story in this space has been "the model designed the hardware." Yesterday it was Frostbite, an AI-designed CPU claiming 4.59 times the performance-per-watt of a modern core — pre-silicon, unverified, the baseline undisclosed. Today it is a working FPGA image, measured on rented hardware, with the numbers published alongside their failure modes. One is a press release about a simulation. The other is a receipt.

That difference is the whole story. The FPGA project is interesting precisely because it is small, checkable, and honest about its limits: one person's project, one model, no independent verification, not a production recommendation. The $10,000 bought a working artifact and a public log of how it was built. The question now is not whether agents can design chips. It is how many domains have a correctness check as clean as bit-exact output — and what happens to the price of expertise in the ones that do.

If that sounds less exciting than a 33-fold speedup, good. The speedup is the demo. The meter is the product.

Source: [Vibecoding an inference chip](https://ankitg.me/blog/vibecoding-inference-chip/)