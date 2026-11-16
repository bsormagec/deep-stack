---
title: "The Cheaper Model That Still Costs $3.27 a Task"
dek: "Qwen4-Max uses fewer tokens per task than its predecessor — and on the independent scoreboard it is still one of the most expensive models to run."
date: 2026-11-16
image: "/images/the-cheaper-model-that-still-costs-327-a-task.webp"
---
The interesting thing about Qwen4-Max is not the 2.4 trillion parameters. It is that Alibaba launched it with two different price tags, and both of them are true.

On Alibaba's own yardstick, the new flagship is a bargain. On the Work360 evaluation the company built to measure professional work, the average cost per task fell from $4.43 with Qwen3.8-Max to $1.67 with Qwen4-Max — a 62% reduction. Token usage dropped by roughly 24% at the highest effort setting and 35% at high effort on the same benchmark, and by 48% and 49% on Terminal-Bench 4.0. API prices came down too, with what the launch post calls "particularly large reductions in cached-input pricing." The model got bigger and the bill got smaller. That is the story Alibaba is telling, and it topped Hacker News on the strength of it: number one on the front page, 789 points and 409 comments by the late-afternoon check.

On the other yardstick, the story inverts. Artificial Analysis, which runs its own Intelligence Index, scores Qwen4-Max at 43 — above the 41 median for its price tier, but below Kimi K3.1, and well below the frontier. A Hacker News commenter reading the same page put the weighted average cost per Intelligence Index task at $3.27, against $0.36 for GPT-6.1 Sol at medium effort, which scores 46. The price fell 62%, and the model still costs nine times as much per task as its cheaper rival — on a benchmark neither company controls.

Both numbers can be right at once. That is the part worth sitting with.

## The mechanism is real

The efficiency claim is not marketing copy pasted over the same model. Qwen4-Max is built on a new architecture: a 2.4-trillion-parameter backbone with 71 billion parameters activated per token, plus 328 billion N-gram Embedding parameters that give the model cheap representations of local token patterns. Three Gated DeltaNet layers compress history into fixed-size states for every sparse-attention layer, so long sequences cost less attention. Four gated residual branches stabilize the training run — Alibaba reports no loss spikes at the 2.4T scale. On the company's in-house evaluations the base model improves on Qwen3.8-Max by roughly 5–13% in bits per byte while activating 25% fewer parameters.

The context window is one million tokens. The Work360 score rose from 47.74 to 52.69. And the long-horizon demos are genuinely the kind of work a flagship is supposed to do: a 48-hour autonomous run that designed, synthesized and validated a new coolant molecule from a candidate space of 2.7 million, iterating four times through a dry-lab and wet-lab loop; a drug-discovery workflow that made 454 tool calls and 3,239 computational evaluations to produce 24 candidate molecules against the NLRP3 target, with an estimated 3.6 times the binding affinity of the patent-derived starting molecule; a machining workflow that cut the manual effort to program a single workpiece from about 475 minutes to 24.

None of that is cheap to run. Which is exactly why the cost question matters more than the capability list.

## The verbosity is the bill

Here is the number that reconciles the two price tags. Across Artificial Analysis's Intelligence Index, Qwen4-Max generated 127 million output tokens — against a 78.6 million median for models in its price tier. It is, by that measure, a verbose model: it writes more to get the same work done. Alibaba's own figures say it uses fewer tokens than its predecessor on Work360 and Terminal-Bench. Both can be true, because they measure different workloads with different yardsticks — and because "fewer tokens than Qwen3.8-Max" is a low bar when the comparison set is the whole market.

The token price itself is not the problem. Artificial Analysis lists $1.50 per million input tokens and $4.50 per million output tokens on Alibaba's API, a blended $0.80 per million at a 7:2:1 cache-hit-to-input-to-output ratio — better than the tier median on both counts. The problem is the denominator. A model that is cheap per token and generous with tokens is not a cheap model. It is a model whose bill arrives in the output column.

That sounds like a small accounting distinction. It isn't. It is the whole difference between the launch post's 62% and the scoreboard's $3.27. The launch post measures cost per task on a benchmark Alibaba designed, where the model's token discipline shines. The independent index measures cost per task on nine evaluations Alibaba did not design, where the model's verbosity shows. A builder choosing between the two numbers is really choosing which workload resembles theirs — and most workloads resemble the independent one more than the vendor's.

## The teammate you rent

There is a second gap, and it is the one the Hacker News thread kept returning to. Qwen4-Max is proprietary. The weights are not public. It is available through QwenCloud on a Token Plan or API, and through QwenWork, Qoder and Qwen Studio. The launch post says smaller Qwen4 models are "coming to open source, built on the same lineage" — but the flagship itself is a rental, and the commenters waiting for the 27-billion-parameter open model know it. One called the performance "disappointing for a 2.4T model in the end of 2026." Another noted that Qwen 3.8 was slow to serve — about 30 tokens a second against roughly 80 for Opus — and hoped the new one would be faster.

That is the irony the launch post does not mention. Qwen became the open-weights champion of the last two years precisely because its models could be downloaded, run locally, and priced by the hardware you already own. Qwen4-Max inverts the arrangement: the biggest model in the family is the one you cannot own, and the models you can own are the ones still to come. The "24/7 AI teammate" framing — Live Delivery, continuous releases, the user staying in control — is a product pitch for a rented service, not a weights release. The open-sourced piece of the launch is the Live Delivery plugin, not the model.

The Hacker News discussion focused on exactly this, and the commenters are right that it matters. A flagship that lives only behind an API is a meter, not a machine. Its price is whatever the vendor's token counter says it is, and the counter runs on every output token, including the ones the model did not need to write.

## The catch

None of this makes Qwen4-Max a bad model. A 43 on the Artificial Analysis index is a solid score, the architecture work is substantive, and the long-horizon demos — the coolant molecule, the legal due diligence that produced an 86-page report from 198 inconsistently formatted working papers, the machining workflow — are the kind of end-to-end delivery that most flagships still only promise. The 62% cost reduction on Work360 is a real measurement on a real benchmark, even if it is the vendor's own.

But a price cut that only shows up on the vendor's yardstick is a price cut with an asterisk, and the asterisk is the part builders pay. The model got cheaper per token and cheaper per task on Alibaba's tasks. On the tasks nobody at Alibaba chose, it is verbose, mid-pack on intelligence, and nine times the cost of the model that beats it.

For builders, the takeaway is practical: do not rent the headline. The number that matters is cost per completed task on your own workload, measured with your own prompts, and it is the one number no launch post will ever give you. Run the same job through Qwen4-Max and through the cheaper rival, count the output tokens, and let the bill decide. If the smaller open Qwen4 models arrive as promised, that comparison gets a third contestant — one you can run on your own hardware, where the meter stops running entirely.

Until then, the flagship is cheaper. Just not on the scoreboard that counts.

Source: [Qwen4-Max: Your New Teammate Has Arrived](https://qwen.ai/blog?id=qwen4-max)
