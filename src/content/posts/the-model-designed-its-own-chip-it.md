---
title: "The Model Designed Its Own Chip. It Runs on a 2014-Era FPGA."
dek: "## An open-source AI accelerator where agents wrote the RTL, the ISA, the compiler — and the whole thing fits in one repo you can read on a laptop."
date: 2026-10-06
image: "/images/the-model-designed-its-own-chip-it.webp"
---
The interesting thing about openTPU is not that an AI built a chip. It is that the AI built the entire boring stack around the chip — and the chip is the least interesting part.

openTPU, posted to Hacker News this afternoon by Felipe Sens Bonetto (FeSens), is an open-source AI inference accelerator whose hardware design was developed by AI agents. RTL in SystemVerilog, the instruction set, a bit-exact simulator, a kernel language and its compiler, a profiler, the host software: all of it lives in one small monorepo, all Apache 2.0 licensed. It runs real model weights on a real PCIe card — an Inspur YPCB-00338 carrying a Xilinx Kintex-7, a decade-old FPGA with two DDR3 channels — and the card produces the same tokens as the simulator, bit for bit.

Read that last clause again, because it is doing all the work: *bit for bit*. Hardware and simulator agree exactly. In an industry where accelerator claims usually arrive as a marketing PDF, openTPU arrives as a repo you can test.

## What the silicon actually does

The machine is deliberately simple. A sequencer issues one instruction per cycle to a few units: DMA moves data, a four-column systolic matrix unit multiplies int8 weights streamed from DRAM, a vector unit does fp32 math, a quantizer packs results back into int8. There is no cache and no hidden scheduling. Every data movement is an instruction, which means a trace of a run explains exactly where the cycles go — a profiler called Lens replays runs on the actual floorplan with a roofline, a timeline, and per-instruction tables.

The honesty of the design extends to the numbers. The README publishes a full benchmark table with the measurement method stated: decode is 64 greedy tokens after a 512-token prompt, "device" counts only accelerator cycles, "wall" adds the host. LFM2.5-230M decodes at 85.8 tokens per second (4-bit weights, int8 head); Qwen3-0.6B at 31.3; Qwen3.5-0.8B at 24.5; up to Qwen3.5-4B at 5.9. Prefill runs 1.3x to 2.0x faster than the previous production image. DRAM utilization while decoding sits at 82 to 94 percent of the DDR3-1066 peak of 17.1 GB/s.

Those are honest midrange numbers, and the README says plainly why: decode is bound by DRAM efficiency, not compute. A 17 GB/s DDR3 channel is not competing with a 1 TB/s H100 — nobody involved pretends otherwise. The machine is memory-bound and admits it.

The MoE experiments are the most telling. Models bigger than the card's 4 GiB run with experts streamed from host storage: LFM2.5-8B-A1B (8.5 billion parameters, 1.7 billion active) decodes at 10.6 tokens per second with 98.5% of expert lookups hitting the card's DRAM slots; Qwen3.5-35B-A3B (34.7B parameters, 3.0B active) manages 3.95 tokens per second with 153 MB streamed per token over PCIe at 1.41 GB/s. Both match the simulator bit for bit.

## The part that matters for builders

Here is the reframe. The story is being told as "AI designs its own inference hardware" — the recursive headline writes itself. That sounds like the future. It isn't, quite. What openTPU actually demonstrates is something more useful: the full hardware-software stack for an inference accelerator is now small enough that agents can hold the whole thing in their heads at once, and open enough that a human can read the result end to end.

That is only half the decision, though. The catch is the same one every local-inference project runs into, and the README names it directly: decode is memory-bound, the design closes timing at 133.33 MHz with a whisper of margin (WNS +0.032 ns), and 4-bit quantization buys speed "at a measurable cost in perplexity" — the per-model perplexity tables are in the docs, unvarnished. An AI-designed accelerator is not a shortcut around physics. DDR3 is still DDR3.

But look at what it does to the economics of experimentation. The host machine is an Intel i7-4790, a CPU from 2014, and the card runs everything with the host nearly out of the loop — 0.17 to 0.30 milliseconds added per token. The Kintex-7 is the kind of part that shows up on the surplus market, not in a data center P&O. The repository was created on September 24, 2026, and now holds 1,356 commits. Two weeks of agent-driven iteration produced a working accelerator stack that a team of humans would budget a year for — and you can read every decision in the commit history, down to the tournament of Vivado runs grinding on timing margin.

For builders, the takeaway is practical: bit-exact hardware is the missing piece in local-inference trust. When your eval pipeline needs to know whether a token drifted because of the model or because of the machine, a simulator that agrees with silicon bit-for-bit is worth more than another ten tokens per second. openTPU is a learning project — it says so on the front page — but it is a learning project about exactly the thing the industry is worst at documenting: how an accelerator actually works, from a matmul in Python down to the wires.

The Hacker News discussion, 91 points and 56 comments in its first hour, picked up the recursion angle first: the models are starting to design the substrate they run on. The better comment to watch for is the one nobody has to write, because the README already wrote it: every performance claim says how it was measured.

A chip designed by AI that runs on e-waste-adjacent hardware and tells you the truth about its memory bandwidth. If that sounds less exciting than a trillion-parameter GPU, good — it means you noticed which part is new.

Source: [openTPU](https://github.com/fesens/openTPU)
