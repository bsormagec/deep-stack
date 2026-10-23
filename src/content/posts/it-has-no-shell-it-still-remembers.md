---
title: "It Has No Shell. It Still Remembers Your Files."
dek: "The interesting thing about WorldTUI is not that a model can fake a terminal. It is what the fake costs, and what had to be thrown away to make it affordable."
date: 2026-10-22
image: "/images/it-has-no-shell-it-still-remembers.webp"
---
There is no shell behind it. No filesystem, no processes, no kernel. Every keypress goes into a 360M-parameter model, and the model predicts how the screen changes. It can create files, run vim and tmux, play snake, and — this is the part that should not work — usually remember what you wrote a few commands later. Simon Edwardsson built it alone, fine-tuning Qwen2.5-Coder-0.5B on terminal sessions recorded from real programs running inside Docker, according to his write-up published October 21. Training the model and its refinements took roughly 75 GPU-hours on a single RTX 4090, per his account. One person, one consumer GPU, a working world model of a terminal.

That sounds like a toy. It isn't. It is a bill, itemized.

## The first saving: stop paying for words you never use

A terminal does not need a language model's vocabulary. It needs bytes, row numbers, and a handful of operations. Edwardsson's model uses 333 tokens in total: 256 byte tokens, 64 row tokens, and a few special operations, per his write-up.

Compare that with the base model. Qwen2.5-Coder-0.5B carries a 151,936-token vocabulary, and its embedding table alone is 136M parameters — more than a quarter of the whole model, spent on words a terminal will never print. Cutting the vocabulary to 333 tokens dropped the model from roughly 494M parameters to about 360M, and from 990MB to 716MB before quantization, according to his numbers. Quantized to int4, it is 208 MB and runs entirely inside a browser tab over WebGPU.

For builders, the takeaway is practical: a large share of a small model's size is interface, not intelligence. If your application speaks a narrow language — logs, protocols, structured state changes — you are paying rent on a vocabulary you never use. Narrow the interface and the model shrinks before you touch a single weight that thinks.

## The second saving: never redraw what only moved

The naive way to simulate a screen is to regenerate it. A full redraw is around 3,000 tokens, per Edwardsson, and a scroll — one press of Enter at the bottom of the window — would cost that much if every row had to be written out again in its new place.

So he added a COPY operation. A scroll now costs three tokens per row instead of roughly 96, because each row is copied from the previous screen instead of re-spelled character by character. The same trick covers clearing the screen, inserting lines in vim, and paging through man pages.

Then the decoding itself. Most rows in a frame do not depend on each other, so he decodes rows in parallel — one batch element per row — which changed the cost of a large frame from the sum of all rows, up to 3,000 sequential steps, to the length of the longest row, roughly 100 steps, per his write-up. Large-frame p95 latency on his RTX 4090 fell from 6.7 seconds to 0.87 seconds. In the browser on his M4 Mac, a large update takes 0.9 seconds with parallel drafting and verification, against 2.5 seconds sequentially.

None of this is a bigger model. All of it is refusing to pay for work that did not change. That is the same discipline as caching, diffing, and incremental builds — the unglamorous plumbing that decides what an AI feature actually costs per use. The model did not get smarter. The invoice got smaller.

## Where the fake breaks: memory is not a benchmark score

Here is the part worth sitting with. Edwardsson tried distilling the model into fewer layers, and the experiment produced the cleanest warning about small-model evaluation I have seen this year.

Removing just layer 7 without retraining barely moved next-token accuracy: 99.3% fell to 98.9%, per his write-up. By the standard metric, almost nothing happened. But exact memory readbacks — write a value to a file, read it back later — collapsed from 64/64 to 0/64. The tests fed in the true history, so this was not errors compounding. One layer was quietly carrying the model's memory, and the headline metric could not see it leave.

A distilled student that kept every even-numbered layer still printed plausible terminal output, but returned the right stored value in only 31 of 64 readbacks — it printed one of the two values it had written and picked the wrong one about half the time. That is chance, dressed in correct formatting. A 16-layer student that kept layers 1, 7, 15 and 22 passed all 32 memory worlds with 64/64 exact readbacks, and still did so at 4-bit, at about 138MB — but its ShellBench score fell to 65 commands against the teacher's 78, per his results. He gave up on distilling in the end.

The honest numbers cut the other way too. On ShellBench — 106 commands across 24 handwritten bash sessions, scored by exact output — WorldTUI scores 80, against 52 for the prompted base model and 60 for a prompted Qwen3-0.6B, per his table. On the file-readback subset it got 9 of 13, against 2 and 3 for the prompted models. And it still fails plainly: append a line with `echo green >> colors` and `cat colors` often does not show it, he writes. Nested directories can lose the plot entirely. The filesystem is a memory of a filesystem, and memories drift.

That is the problem. A model that simulates state will always be one plausible output away from inventing it. The fake terminal is honest about this because you can check it against a real one for free. Most production systems built on the same trick — models holding state in their context, agents remembering what they did three steps ago — have no real terminal standing next to them to diff against.

## What this actually proves

WorldTUI proves a narrow thing, and it proves it well: when the world is a grid of characters, the training data is free to generate, and the interface is 333 tokens wide, a 360M model trained for 75 GPU-hours on one RTX 4090 can hold a small world together — files, vim sessions, tmux panes, environment variables — well enough to be surprising, per Edwardsson's own tests. It does not prove world models replace software. A real shell is deterministic, exact, and costs nothing to run. The fake one costs a GPU and still forgets your appended line.

But the direction matters for builders pricing local inference. The wins here did not come from scale. They came from shrinking the vocabulary to the job, copying instead of regenerating, decoding in parallel, and teaching the model to repair its own mistakes — his DAgger-style self-correction rounds lifted his PresetBench score from 24/47 to 38/47 at int4, per his write-up. Constraint did the work that parameters were supposed to do.

The terminal is fake. The cost curve is real. The teams that win the local-inference decade will be the ones who learn to narrow the problem until a small model can afford it — not the ones waiting for a bigger model to make the problem irrelevant.

Source: [WorldTUI: I trained a 360M model to pretend to be a terminal](https://simedw.com/2026/10/21/world-model-terminal/)
