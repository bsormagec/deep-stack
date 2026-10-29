---
title: "The Computer Inside the Model"
dek: "Qwenputer compiles a working RISC-V CPU into a language model's weights — and the tool call never leaves the model."
date: 2026-10-29
image: "/images/the-computer-inside-the-model.webp"
---
The interesting thing about Qwenputer is not that a language model can do arithmetic. It is that the arithmetic never leaves the model at all.

Every serious coding setup today hands hard problems to something outside the model: a Python sandbox, a calculator tool, a code interpreter running on a server somewhere. The model asks, the outside world answers, the answer comes back as text. Qwenputer, an experimental model built by Divyansh Agrawal on top of Alibaba's open-weight Qwen3.5-4B, deletes that round trip. Inside its weights sits a functioning 32-bit RISC-V CPU, compiled rather than trained, and the model runs C and MicroPython code through its own forward passes. There is no plugin, no tool server, no sandbox. The forward pass is the execution.

## Memory hiding in the attention layers

The trick starts with something Qwen3.5 already has. Three out of four of its attention layers use Gated DeltaNet, a linear recurrent mechanism: each attention head keeps a state matrix that updates as tokens stream through. Normally that state fades — a gate value below 1 multiplies the old state down on every token, which is how the model forgets.

Agrawal's observation is that the forgetting is optional. Set the gate to exactly 1 and the write strength to exactly 1, address the state with one-hot keys, and every write overwrites precisely one row of the matrix while every query reads back exactly one row. The state matrix stops being a fading impression and becomes addressable memory: each row a cell, the whole matrix a RAM bank, at a fixed size no matter how long the conversation runs. That is cheaper than using ordinary attention as memory, because an attention KV cache grows with every token while this state does not.

The idea itself is not new — Schlag, Irie and Schmidhuber showed in 2021 that linear attention with the delta rule works as associative memory, or "fast weights." What is new is making it exact and addressable inside a production model, reliably enough to run a whole CPU on it.

## A compiler, not a training run

With RAM in hand, the CPU follows without any training. A compiler takes the CPU described as a circuit — a long list of small steps like "read this register," "add these two numbers," "jump if zero" — and turns each step into pieces of transformer layers: attention heads that look things up, feed-forward units that do the arithmetic, DeltaNet heads that hold the RAM. Every weight is computed directly, not learned. The CPU occupies 11 extra layers placed in front of Qwen's own 32, and Qwen's original weights stay exactly as they are.

Each instruction becomes a few generated tokens: one names the memory row to write, the next carries the value, a STEP token ends the instruction. Those tokens are the CPU's execution trace, so while Qwen generates them, the CPU is actually running. The core is a full RV32IM instruction set plus the Zba extension and a small bignum unit for big-number arithmetic. It passes the official riscv-tests suites, its programs match QEMU, and Agrawal reports it has run 18 million instructions free-running — on its own outputs, with no reference machine correcting it between steps — without a single error.

Qwen uses the CPU without any post-training. The design piggybacks on the tool-call format models are already trained on: Qwen sends the CPU instructions and reads back results in the shape of a tool response, except no external tool is ever invoked. A small driver called RvChat loads the firmware into the DeltaNet state and keeps the trace tokens out of Qwen's own layers.

## The numbers, and what they do not prove

On DeepMind's arithmetic sets, with greedy decoding over 40 problems per set, the model card reports Qwenputer at 97.5% on mul_big against 55.0% for base Qwen3.5-4B, 97.5% on div_big against 72.5%, 100% on mul_div_multiple_longer against 90.0%, and 97.5% on add_or_sub_big against 87.5%. On NUPA's long-integer arithmetic it goes from 48.6% to 100% — the same score base Qwen gets when handed a real Python tool. The author also replayed about 230,000 of the CPU's output positions through a reference machine and found zero mismatches, and bolting the computer on does not change how the model talks: its ordinary text stays within noise of base Qwen, at a KL divergence of 6e-4 against a noise floor of 5e-4.

Those numbers deserve a plain caveat. Every one of them is self-reported on the model card and the author's blog, with no independent verification yet. The Hacker News discussion, where the project topped the front page on October 29, focused on exactly that gap alongside the mechanism itself: a compiled circuit should be verifiable in principle, but nobody outside the author has yet published a reproduction. Treat the benchmarks as the author's claim, not a settled result.

And the limits are stated upfront by the author himself. The checkpoint is 18.8 GB in bf16, roughly double the base model, mostly zero padding around roughly one million nonzero weights for the computer itself. It needs the RvChat driver to boot the firmware, so it does not yet run through a plain generate call. And it is slow in the way that matters to users: every CPU instruction costs several decoded tokens, so a large calculation takes seconds rather than milliseconds, with the benchmark executor running about 3,200 trace tokens per second on an L4 GPU. Trace tokens are the CPU's internal execution steps, not answer tokens, so that figure is not a user-visible speed claim.

## A hard drive, for good measure

Because a CPU inside a language model apparently was not cursed enough, Agrawal gave it a filesystem too. With RAM already working, the filesystem is exposed through internal put, append, get, list and delete operations — again, no actual tool calls. File names hash into one of 1,024 directory slots kept in the DeltaNet state, and file text lives in other heads at eight tokens per row, chained together. It holds up to 512 files, about 53,000 tokens of text, and the state persists: save it at the end of one conversation, load it into the next, and the files are still there. On a test of facts that changed between chats, Qwen with the filesystem gets 90% right, against 30% when old chats are pasted back in and 78.9% for Python-run memory tools. This part is still experimental, living on a separate branch.

## Why builders should care

For builders, the takeaway is practical: deterministic compute stops being a service you rent and becomes a circuit you ship with the model.

That sounds like a curiosity. It isn't. Every tool call in a production agent is a dependency with its own failure modes: a sandbox to provision, a server to keep up, a network hop to bill, a trust boundary to audit. Qwenputer collapses that stack into weights you already own. The cheapest, most private runtime is the one already inside the model — no data leaves the process, no second service needs hardening, and the computation is inspectable in a way a black-box tool result is not. For local inference, where the whole point is owning the stack, that is the purest version of the argument: the model does not call a computer. It is one.

There is a second angle, and it cuts both ways. Exact control over recurrent state is also a safety research tool. Agrawal's two follow-ups make the case in both directions: hybrid models can learn to hide reasoning in their recurrent state and evade chain-of-thought monitoring, and compiled weights can work as monitors the model itself cannot switch off, or as answer keys for interpretability. A CPU in the weights is a demonstration that the model's hidden state can be engineered precisely. That precision is a capability and a warning in the same package.

None of this makes Qwenputer a product. It is an experiment with a doubled checkpoint, a driver requirement, and seconds-per-calculation speed. But experiments that change the shape of the stack matter more than products that merely extend it. The model that needs no tool server for exact arithmetic is a model whose architecture has one fewer moving part — and one fewer part that can bill you, leak your data, or go down.

That is the problem with every tool call you did not need to make.

Source: [Qwenputer: a fully functioning, deterministic RISC-V CPU inside Qwen3.5](https://divagr.com/blog/qwenputer)
