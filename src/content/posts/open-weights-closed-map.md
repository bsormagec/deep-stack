---
title: "Open Weights, Closed Map"
dek: "Baidu's ERNIE 5.5 Flash Base is downloadable, cheap per token, and 280 gigabytes of fine print."
date: 2026-11-05
image: "/images/open-weights-closed-map.webp"
---

The interesting thing about ERNIE 5.5 Flash Base is not the 280 billion parameters. It is that the weights are downloadable and the per-token bill is small — while the hosting bill is not, and the license draws borders the download page does not advertise.

Baidu published the checkpoint on November 5, 2026: a sparse mixture-of-experts model, 280 billion parameters in total, 14 billion activated per token, pretrained from scratch on 33.5 trillion tokens. The weights are on Hugging Face in FP8 and BF16, with serving support in vLLM and SGLang from day one. Training context ran to 128K tokens; fine-tuning and inference support up to 1 million. The Hacker News thread that carried the release stood at 141 points and 79 comments by the afternoon, and the argument in it was exactly the argument that matters.

## A small engine inside a large warehouse

Fourteen billion active parameters per token is the number that decides what this model costs to run. Everything else in the architecture exists to keep that number small while the model itself gets large: 43 layers, 512 routed experts with the top 10 selected per token plus one shared expert, and a hybrid attention design in which 37 of the 43 layers use Heavily Compressed Attention — a single cached entry per 128 tokens — while six layers keep full-context access. The model card describes the design goal plainly: activated compute, KV cache, and long-context cost treated as one problem.

That is a real engineering position, and it is the one Deep Stack readers should recognize. The frontier labs have spent two years making the per-token meter smaller while the model behind it gets bigger. Baidu is doing the same thing, except it is handing you the warehouse instead of renting you the meter.

The warehouse is the catch. Fourteen billion active parameters sounds like a laptop model. It is not. A conventional deployment has to hold the full 280-billion-parameter pool: roughly 280 GB of weights in FP8, roughly 560 GB in BF16, before the KV cache, activations, and runtime overhead. That is a server's model, not a laptop's. The per-token bill is small; the hosting bill is a rack, or a very serious workstation, and the 1-million-token context that looks generous on the release page is a KV-cache bill that grows with every token you keep around.

## It is a base model, not an assistant

The second catch is what the checkpoint actually is. ERNIE-5.5-Flash-Base is the model at the end of pre-training, before any mid-training or post-training. There is no instruction tuning, no chat version, no RLHF. Baidu says a post-trained ERNIE 5.5 Flash will follow. Until it does, this is a starting point for fine-tuning, not a runnable assistant.

The Hacker News thread understood this faster than the headlines did. The first question was "anyone tried this? is it good?" and the first answer was the honest one: it is not instruction-fine-tuned, so it is not good for anything like coding agents. Another commenter put the useful version of the same point: base models are excellent for businesses that run models locally, because they can be trained in house rules and house styles. That is the correct frame. A base model is raw material. Its value is exactly proportional to your willingness to finish the training yourself.

## The benchmark table picks its own opponents

Baidu's evaluation table, run through its own unified pipeline, puts ERNIE first in 24 of 30 benchmarks against DeepSeek-V4-Flash-Base, Tencent's Hy3-preview-Base, and Xiaomi's MiMo-V2.5-Base. The individual numbers are striking on paper: MMLU 93.3 against DeepSeek's 89.4, MMLU-Pro 78.4 against 69.2, HumanEval+ 82.3 against 69.5, LiveCodeBench 40.1 against 31.9 — all from Baidu's own table on the Hugging Face model card.

The thread fought over the opponents, and the thread was right to. The DeepSeek model in Baidu's table is V4-Flash-Base, the April checkpoint — not V4.1-Flash, and not the October 1017 update that commenters kept citing. One commenter called the comparison two versions behind; another answered that base-to-base is the fair comparison and that 4.1 was built from the base model anyway. Both points survive contact with the facts. The comparison is fair in kind and stale in version, and Baidu's figures have no independent verification yet. A benchmark lead measured on your own harness against a rival's older checkpoint is a claim, not a result. Treat it as a reason to test the weights, not as a reason to believe the table.

## The license is the real release note

The third catch is the one that decides whether most teams can use this model at all. ERNIE 4.5, released in June 2025, was Apache 2.0. ERNIE 5.0 and 5.1 were never open-sourced. ERNIE 5.5 Flash Base ships under a custom license, the ERNIE 5.5 Flash Base Model License Agreement v1.0, and its terms are the opposite of the Apache 2.0 era.

Use in the European Union, the United Kingdom, and South Korea is not authorized. Products or services that generated more than $50 million in related revenue over the past 12 consecutive months need Baidu's separate written authorization before commercial use; below that line, commercial use requires a one-time notice and a prominent "Powered by ERNIE" attribution. And the agreement bars using the licensed materials, derivative models, or their outputs to improve an unrelated AI or machine-learning system.

That is not a footnote. It is a map with whole regions crossed out and a revenue line drawn across the middle of it. A team in London or Seoul does not get to run this model, whatever the download button says. A team above the $50 million line does not get to run it commercially without Baidu's written permission. A team that planned to distill it into something else has to read the improvement clause before writing a line of code.

The contrast with the last generation is the story. Sixteen months ago Baidu shipped ERNIE 4.5 under the most permissive license in the industry. Today the weights are larger, the per-token cost is smaller, and the permission to use them is narrower. Open weights, closed map.

## For builders, the takeaway is practical

If you fine-tune models for a living, this is a serious starting point: 33.5 trillion tokens of pretraining you did not have to pay for, a 1-million-token context window, and day-one vLLM and SGLang support. Download the FP8 weights, budget the 280 GB before you budget anything else, and test it on your own evals before believing Baidu's table — especially against the newer DeepSeek checkpoints Baidu did not include.

If you want a runnable assistant, wait for the post-trained version. A base model will not follow instructions, and no amount of prompt engineering turns a pretraining checkpoint into a coding agent.

And before either of those, read the license. The interesting question about an open-weights release was never whether you can download it. It is whether you are allowed to run it, where, and for how much revenue before you need to ask. Baidu answered the first question generously and the other three with conditions. That is the release.

Source: [ERNIE 5.5 Flash Base](https://ernie.baidu.com/release/ernie-5-5-flash-base/)
