---
title: "The 501-Billion-Parameter Model With a 23-Billion Invoice"
dek: "### Reflection's Beam bets that the number on the billboard isn't the number that matters. The honest math is messier — and more interesting."
date: 2026-10-07
image: "/images/the-501-billion-parameter-model-with.webp"
---
The interesting thing about Reflection's Beam is not that it has 501 billion parameters. It is that only 23 billion of them show up to work on any given token.

That is the whole pitch, stated plainly. Beam, announced October 5 by the two-year-old Brooklyn startup founded by former Google DeepMind researchers Misha Laskin and Ioannis Antonoglou, is a text-only sparse mixture-of-experts model for coding, reasoning, and agentic workloads. The 501B figure is the billboard. The 23B active-parameters-per-token figure is the invoice. Reflection's claim is that Beam matches Z.ai's GLM-5.2 on advanced reasoning benchmarks while using three to four times less inference compute — and that this is the number builders should actually read.

## The spec sheet trained you to read the wrong number

For a decade, model releases were announced the way truck engines were: displacement. More parameters, more capability, more cost, in one tidy line. Beam is part of the shift that makes that line unreadable on purpose. In a sparse MoE, a router wakes only a slice of the network per token. The total parameter count describes the model's knowledge; the active count describes what each answer costs to serve. Reflection is just the first Western open-weight lab to make the second number the headline.

The company's own comparison table puts Beam against GLM-5.2 (about 744 billion total parameters, 40 billion active, per reporting on the announcement), Kimi K3, Qwen 3.8-Max, and Mira Murati's Thinking Machines Lab model Inkling. Beam's self-reported scores: 80.9 on SWE-Bench Verified, 80.1 on Terminal Bench v2.1, 77.2 on SWE Bench Pro v2-Hard, 44.4 on DeepSWE v1.1. Where rivals like Kimi K3 stay ahead on raw capability, Beam's pitch is efficiency at inference time — more intelligence per token.

There is a catch, and it is printed in the announcement itself: the "3–4× less inference compute" figure is an estimate, computed as roughly two times active parameters times generated tokens. By the company's own footnote, that formula excludes prompt prefill, context-dependent attention operations, and serving overhead. So the headline efficiency number is not a measured invoice. It is a model of an invoice. Treat it accordingly.

## The invoice has two pages

Here is the part the billboard leaves out. The serving bill follows the active count. But the loading bill follows the total count.

Five hundred one billion parameters have to live somewhere. At half precision that is roughly a terabyte of weights; at 8-bit, about half a terabyte; squeezed to 4-bit, around 250 gigabytes. To self-host Beam — which is the entire point of an open-weight release — you need that much memory holding the full weight table, even though only 23 billion parameters fire per token. A 24GB gaming GPU, the kind that just ran a 125B MoE in last week's story with expert caching tricks, is not in the conversation here. At 4-bit quantization, Beam's weights are on the order of ten RTX 4090s' worth of VRAM before the first token is generated.

That is only half the decision. The question is not whether Beam is "small." It is whether the cost structure it promises actually changes anyone's build-vs-buy math. And the honest answer is: not yet, and maybe not the way the announcement implies. The weights are not out. Reflection says they ship "later this month" under Apache 2.0, with the model still in final red-teaming and evaluations, and early access gated behind a waitlist. Every benchmark number in the announcement is the company's own. HN commenters have the right instinct here: an efficiency claim without independent replication is a marketing slide with a footnote.

## Who pays for "free"

Beam was pretrained on 23.8 trillion tokens, and its reinforcement-learning run used 10,500 NVIDIA GB300 GPUs for four weeks, generating over 100 million rollouts across roughly a million synthetic coding, agentic, and STEM environments, with up to 170,000 concurrent sandboxes. The company calls it one of the largest RL runs by any open lab to date. Capabilities kept improving with more RL compute, the announcement says, with no sign of a plateau — RL as a scaling axis, not a finishing step.

Somebody paid for that. Reflection has reportedly raised around $4.6 billion and been valued near $25 billion, with NVIDIA leading its $2 billion Series B. The open weights are free in the same sense that a freeway is free: a large institution spent billions so the marginal user pays nothing. That is not a criticism. It is the economics of open weights in 2026, and it is worth stating plainly, because "free model" keeps being read as "free lunch" by people budgeting GPU clusters.

There is a genuinely builder-friendly idea buried in the announcement: Beam was trained with a controllable length penalty, so it learned to solve tasks with fewer reasoning tokens early in training, and users get a reasoning-effort parameter to trade answer depth against tokens per request. That is a cost lever you can actually pull, not a claim you have to trust. Track cost per solved task, not cost per token — a model that finishes in fewer tokens wins even at a similar per-token price.

## What it would take

If the weights land as promised — Apache 2.0, permissive, from a US lab, at a moment when most top-tier open weights come from Chinese labs — Beam becomes the first credible Western answer to the DeepSeek/Qwen/GLM stack for teams that need self-hosting without depending on Beijing's model releases. That is a real strategic slot. The HN discussion (515 points, 163 comments at fetch) is already treating it that way: less excitement about the parameter count, more about whether the efficiency story survives contact with independent benchmarks.

For builders, the takeaway is practical: ignore the 501B. Budget against the 23B for serving, against ~250–500GB of weight storage for hosting, and against zero for the weights themselves — until the release actually happens. The number that will matter is the one nobody can print yet: what independent evaluators measure when the weights drop.

Beam is an announcement about a future release. The interesting question is whether the invoice, when it finally arrives, matches the estimate.

Source: [Introducing Beam: Reflection's 501B open-weight model](https://reflection.ai/blog/introducing-beam)
