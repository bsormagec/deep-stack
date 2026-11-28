---
title: "The Shortcut That Cost Twelve Layers"
dek: "Google's DeepCrossAttention reaches the same quality with 30 layers instead of 42 — and the interesting thing is not the speedup, it is where the waste was hiding."
date: 2026-11-28
image: "/images/the-shortcut-that-cost-twelve-layers.webp"
---

The interesting thing about Google's DeepCrossAttention is not that it makes models up to three times faster. It is that a third of the model's depth was never doing the work we thought it was doing. It was paying for a plumbing choice from 2017.

Every transformer since "Attention Is All You Need" has relied on the same humble mechanism to stay trainable: the residual connection. Each layer adds its output to its input, so a copy of the original signal skips past the layer and survives to the next one. Without it, the learning signal degrades across dozens of layers and training collapses. With it, deep networks became possible at all.

The catch is in how crude the mechanism is. A standard residual connection adds every prior layer's output with equal weight. The signal from layer two and the signal from layer forty arrive at the same volume, blended into one stream. As the network gets deeper, specific details from earlier layers get averaged out — Google calls this information dilution — and the model has to recompute them, layer after layer, at full price.

## The routing problem nobody priced

DeepCrossAttention, presented in Google's ICML 2025 paper and written up on the Google Research blog on November 23, 2026, treats the residual stream as a routing problem instead of a pipe. For every token, a lightweight module computes a set of mixing weights — a static learnable base plus an input-dependent projection — and decides which earlier layers matter for this token, right now. On top of that, a depth-wise cross-attention mechanism lets each token query a weighted mix of all prior layer embeddings. Standard attention works across tokens in a sequence; this one works across layers in depth.

The cost of the machinery is almost nothing: under 0.2% extra parameters, according to Google's numbers. The savings are the story. On the C4 corpus and the One Billion Word benchmark, DeepCrossAttention reached the performance of a standard transformer in up to five times fewer training steps. To reach a perplexity below 14 on LM1B, a standard transformer needed 42 layers. The DeepCrossAttention model did it with 30 — a 29% reduction in depth, and, per Google, up to 30–40% fewer parameters for the same quality.

There is a second number that matters more than either of those, because it speaks to everyone who already has a model in production. DeepCrossAttention can be initialized to behave identically to a standard residual network, so it can be retrofitted onto a pretrained transformer. Continued training of a retrofitted model cut perplexity by 0.19 on LM1B, against 0.02 for continued standard training. You do not have to throw the model away. You bolt the routing on and keep training.

## The meter moves in two places

For builders, the takeaway is practical, and it lands in two places at once. The first is training. A 29% depth cut for the same quality is not a benchmark curiosity; training compute is the largest single line item in a frontier model's budget, and a technique that reaches the same loss in a fifth of the steps is a technique that changes what a training run costs. The Hacker News discussion, which pushed the story to 525 points and 183 comments, kept circling the same point from the other direction: if training gets cheaper, you spend the savings on more training — the bitter lesson, as one commenter put it.

The second place is inference, and here the honest answer is that nobody knows yet. The most useful comment in the thread asked exactly the right question: does the speedup survive at serving time, where memory bandwidth and the KV cache usually dominate over raw FLOPs? Google's own blog concedes the tension — DeepCrossAttention increases memory bandwidth, because representations from different layers are presented intact rather than blended together. A training-time win that turns into a serving-time tax is a familiar shape in this field, and the 3x figure is a training figure until someone measures it on a serving stack.

There is also the combination nobody has tried in public yet. The same week, Zhipu's GLM-5.4 showed a looped transformer — 28 layers run twice — reaching toward the quality of models two to three times its size. DeepCrossAttention and looping both try to squeeze more out of the same parameters, one by routing between layers and the other by reusing them. Several commenters landed on the same idea independently, and the blog itself notes that Thinking Machines' Inkling 2 already adopted the related attention-residual design alongside DeepCrossAttention's cross-attention mechanism. The pieces are converging before any single vendor has shipped the combination.

## The catch, stated plainly

All of this rests on Google's own measurements, on small-scale benchmarks — LM1B and C4, not frontier-scale models. The paper is from ICML 2025, and the blog post is research communication, not a release. There is no independent replication yet, and no frontier lab has announced it is using the technique. One commenter put the skepticism bluntly: Google publishes, but the labs keep their best tricks, and the fact that this one is public is itself a signal about how much it matters — or doesn't.

That skepticism is fair, and it is also beside the point for anyone building on open weights. The technique is public, it is retrofittable, and it costs under 0.2% of parameters. The next open-weight release that ships with dynamic residual routing will tell us more than any blog post can, because the test that matters is not perplexity on LM1B. It is whether a model that routes between its own layers still holds up when the layers are looped, the context is a million tokens, and the bill arrives per token served.

Twelve layers were paying for a shortcut that treated every earlier layer as equally worth hearing. The model did not need twelve more layers. It needed to listen selectively.

Source: [Supercharging transformer residual connections](https://research.google/blog/supercharging-transformer-residual-connections/)
