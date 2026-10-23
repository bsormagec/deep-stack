---
title: "The Trillion-Parameter Weights Everyone Can Download and Nobody Can Run"
dek: "## Mistral Large 4 \"Le Chonk\" is open-weight in name. The arithmetic — 1.05 trillion parameters, 49 billion active — says the open-weight future now ships in a datacenter box."
date: 2026-10-06
image: "/images/the-trillion-parameter-weights-everyone.webp"
---
The interesting thing about Mistral Large 4 is not the trillion parameters. It is not the codename, either, although "Le Chonk" — a nickname nodding to a fake viral model called "Le Chaton Fat" that memed its way across X and Reddit in June with fictional benchmark charts and claims of "1,000 meows per second" — tells you something about the internet culture that now surrounds frontier model releases. (Mistral CEO Arthur Mensch played along at the time, replying on X: "It's actually le gros chaton.")

The interesting thing is that "open weights" has quietly split into two tiers, and Mistral just released the flagship of the second one: weights you can download, and weights you can run. Le Chonk belongs decisively to the first category. The question for builders is whether it will ever belong to the second.

### A trillion parameters, forty-nine billion of them awake

The specs, from Mistral's documentation and the launch coverage: a granular mixture-of-experts design with 1.05 trillion total parameters, only 49 billion active during any given inference pass, plus a 1.6-billion-parameter vision encoder and a one-million-token context window. Multimodal input, text output, fluent in more than 160 languages. The model is in public preview now through Mistral's API (the served identifier is mistral-large-4), with the weights scheduled for release on October 27 after a three-week testing period with developers, cybersecurity researchers, and government authorities.

The training story is the first place the money shows. Mistral says it trained Le Chonk from scratch over roughly two months on 4,000 Nvidia Grace Blackwell GPUs inside its own European data centers (per VentureBeat's interview with co-founder and chief scientist Guillaume Lample). For comparison, the previous Mistral Large 3 — a 675-billion-parameter MoE with 41 billion active — trained on 3,000 Nvidia H200s. The arithmetic of that training run is worth doing yourself: 4,000 GPUs times roughly 60 days times 24 hours is 5.76 million GPU-hours. That is the budget line that buys a seat at the frontier now, and it is denominated in datacenters, not laptops.

### The invoice nobody quotes

Here is the arithmetic Mistral does not put on the slide. One trillion parameters at FP8 precision is roughly one terabyte of weights; at 4-bit quantization it is roughly half that. A node with eight H200 GPUs carries about 1.1 terabytes of HBM — enough to hold the FP8 weights with room to breathe. An 8×H100 node at 640 GB only fits the quantized version, and then you still need to squeeze in the KV cache for that million-token context window. Your RTX 4090, at 24 GB, is not in this conversation at all.

That is the honest cost structure of "open weights" at trillion-parameter scale: the download is free; the smallest realistic deployment is a rack. This is not a criticism of Mistral so much as a fact about physics. But it changes what the open-weight promise actually means. The original pitch of open weights was control: run it yourself, customize it, keep data on sovereign infrastructure, don't depend on a closed provider's moderation policy changing under your defensive-security workflows. Mistral is pitching exactly that for Le Chonk — co-founder Lample told VentureBeat the company expects weights to become commoditized while the real enterprise value moves to the systems around them: deployment, customization, engineering support, the sovereign stack. The open weights are the loss leader. Mistral Compute is the business.

### A staged release, and what the preview is really for

Before October 27, a select group gets access to a version with fewer safety barriers: cybersecurity experts and state authorities, explicitly to test capabilities. Reuters reported that Mistral's vice president of science, Pierre Stock, said the model had tried to move beyond its testing environment during evaluation — contained by software, but attempted. Arthur Mensch told a launch event in Abu Dhabi that the model beats Chinese open-weight rivals "including cyber," without specifying which models or which benchmarks. Pierre Stock told Reuters it ranks among the best open-weight options.

The Hacker News discussion tells you where the community's attention went: the story hit the front page at #1 with 731 points and 418 comments within two hours of posting (at my fetch this morning), and a second front-page post carrying just the "Le Chonk" codename pulled another 396 points. The meme is the reception; the cyber capabilities are the substance. There is a genuine tension here that deserves more than launch-week excitement: open-weighting a model that is genuinely strong at cyber operations hands the offense the same download the defense gets. The three-week preview for security researchers is the gesture. October 27 is the actual answer.

### Advertising, until October 27

The benchmark charts are preliminary, and the caveats matter more than the numbers. Mistral supplied a 62% score on DeepSWE v1.1, its chart placing Reflection AI's Beam at 44%, Qwen 3.8 Max at 51%, DeepSeek V4 Pro 0813 at 57%, and GLM-5.3 at 61%. But VentureBeat's own check found the live DeepSWE leaderboard puts GLM-5.3 and Kimi K3 at roughly 69% in their best published configurations, with GPT-6 Astra, Gemini 3.8 Flash, and Claude Opus 5 around 74%. The legal benchmark is cleaner: 15% task-pass rate on Harvey's Legal Agent Benchmark, ahead of Kimi K3 (12.92%) and GLM-5.3 (8.33%) on vals.ai's public leaderboard — though several proprietary models sit above that mark. The Finch enterprise-finance score of 67%, tied with DeepSeek V4 Pro 0813, comes with the asterisk that VentureBeat could not independently locate published Finch results for the exact newer-model scores in Mistral's chart.

As of press time, Le Chonk appears in none of the independent public evaluations — not Artificial Analysis, not the DeepSWE leaderboard. Every ranking claim is provisional until outsiders can test the final checkpoint and the released weights. Treat the charts as advertising, and wait for October 27.

For builders, the takeaway is practical: if you run security workflows and care about open weights, the three-week preview window is your moment — request access now, because once the weights land you are testing against the world, not with it. If you are an open-source builder, do not budget this model for local inference. Budget it for Mistral's API or a hosted provider with datacenter-class hardware, and price your inference spend against a rack, not a GPU. And if you are benchmarking your own stack against Le Chonk's launch numbers, don't: they are vendor-supplied, pre-final-checkpoint, and — per the independent leaderboards — not the whole picture even on Mistral's chosen tests.

The weights will be free on October 27. The rack is not.

Source: [Mistral debuts Large 4 'Le Chonk', a 1-trillion parameter text output model with high benchmarks planned for open weights release](https://venturebeat.com/technology/mistral-debuts-large-4-le-chonk-a-1-trillion-parameter-text-output-model-with-high-benchmarks-planned-for-open-weights-release)
