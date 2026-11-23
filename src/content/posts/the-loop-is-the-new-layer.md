---
title: "The Loop Is the New Layer"
dek: "GLM-5.4 runs the same 28 layers twice and claims the intelligence of a model three times its size — the parameter count stopped growing, and the bill moved somewhere else."
date: 2026-11-23
image: "/images/the-loop-is-the-new-layer.webp"
---
The interesting thing about GLM-5.4 is not that it is bigger. It is that it refused to get bigger.

Zhipu's new flagship, announced today, is built on a 750-billion-parameter base. Z.ai says it reaches intelligence levels comparable to models with 2 to 3 trillion parameters. The trick is not more weights. It is a loop: 28 of the model's layers run twice per forward pass, refining the hidden state from the first pass instead of handing the work to a fresh set of layers. Same weights, second look.

That sounds like a small architectural tweak. It isn't. For three years the frontier's answer to every capability gap has been the same: add parameters, add GPUs, add power. A loop is the first flagship-scale bet that the answer might be to reuse what is already there.

## Depth without the weight

A standard transformer runs each layer once. A loop transformer runs a shared block of layers for multiple iterations, feeding the output back in. The idea is not new — the 2018 Universal Transformer proposed weight-shared depth, and the Hacker News discussion spent much of the day relitigating it, with one commenter noting the original transformer is "a bit like an unrolled for loop" that unnaturally pairs different weights with different layers. What is new is someone shipping it at 750 billion parameters and claiming it works.

Z.ai is candid about why nobody did this sooner. Looped models trained from scratch still lag behind unshared models under the same pre-training compute budget. So Z.ai did not train from scratch. It took an already pre-trained GLM-5 base and converted it into a loop transformer through continued training — raising the intelligence ceiling, in its words, "with a relatively small compute overhead." The loop is a retrofit, not a foundation.

Making the retrofit work at scale took three changes, and each one is about cost rather than capability. First, gated progressive updates: independent per-token gates for each iteration, so the second pass writes its refinements back into the residual stream without blowing up activation norms. The gates learn a division of labor — the first pass builds global context conservatively, the second pass writes full updates — and they adjust step size by token difficulty, writing more aggressively on harder tokens. Second, a hybrid KV cache: the second loop reuses the sparse KV selected in the first pass and keeps only its own newly generated KV inside a sliding window, so an extra loop costs one sliding window of cache rather than a full context cache. At 1 million tokens of context, Z.ai says, this keeps the deployment cost increase over GLM-5.3 "well under control." Third, sparse attention index reuse: the second loop reuses the first loop's attention indices, adding zero indexing overhead.

Deep Stack readers will remember GLM-5.3 for a different KV-cache story in October — a serving bug on Cloudflare's Workers AI that exposed prompts across requests. That was the serving stack, not the model. But it is a useful reminder of what the cache is: the part of the system where a shortcut becomes a leak, and where the savings now live.

## The bill shrinks in two places

The efficiency claim comes in two parts, and they are not the same kind of claim.

The controlled one is an iso-parameter ablation on a 30-billion-parameter model with the same architecture as the 750B base. With identical parameter counts and only about 10 percent more total training compute, the looped version showed clear gains, largest on long reasoning chains — math, scientific reasoning, long-context tasks. And across benchmarks like GPQA-Diamond and MMLU-Pro, average output length dropped by 10 to 14 percent, mostly from shorter chains of thought. Part of the reasoning, in other words, moves from explicit output tokens into the implicit depth of the loop. Fewer tokens out means a smaller bill per task, and it means the model spends less of your context window narrating its own thinking.

The looser claim is the headline: intelligence comparable to 2T–3T parameter models. That is Z.ai's own comparison, and the blog post offers no benchmark table behind it. Treat it as a direction, not a measurement. What is measurable is the serving figure: up to 200 tokens per second during off-peak hours, 70 to 80 at peak load, achieved with fused kernels that cut the intermediate memory traffic looping amplifies. A 750B model serving at those speeds is the point. The loop only matters if the second pass does not cost as much as the layers it replaced, and Z.ai's whole post is an argument that it doesn't.

There is a catch Z.ai states plainly, and it is the same catch as the benefit. The model "tends to get caught in overly long 'marathon thinking' loops" — prolonged reflection that does consistently improve accuracy beyond its parameter count, but burns compute doing it. A loop that can always run again is a loop that sometimes doesn't know when to stop. The fix Z.ai is exploring is adaptive compute, where harder tokens dynamically get more iterations. Today it is fixed at two.

## What the loop hides

The Hacker News thread found the other catch, and it is the one builders should sit with. Looping moves reasoning inside the model, off the token stream. A commenter put it plainly: looping internally rather than emitting a token every N layers reduces visibility and monitorability. OpenAI has talked about severely limiting it for that reason, and Z.ai is doing the same here — a fixed two loops.

That concern landed on the same front page as OpenAI's own post today, "Perplexity and Intelligence," which warns that alignment auditing degrades as capabilities move deeper into pretraining and out of the chain-of-thought monitors can read. The two posts are about the same shift from opposite ends. One lab is publishing the metric that would let the industry pace itself. Another is shipping the architecture that makes the metric harder to watch. The loop is efficient precisely because the thinking happens where no one can read it.

That is only half the decision, though. The loop also makes the architecture legible in a way the last three years of scaling never were. Z.ai published the mechanism — the gates, the cache design, the ablation, the failure mode — instead of a benchmark chart and a price list. Commenters noticed, praising the transparency against "the locked-down approach of the western companies," and pointed out that Thinking Machines shipped an open-weights looped model last week with Inkling 2 Mini, which Deep Stack covered on November 20. The loop is becoming a shared research direction, not one lab's secret.

## The practical part

For builders, the takeaway is practical: watch the loop, not the parameter count. If looped architectures hold up at flagship scale, the next round of model releases will be sold on depth-per-parameter instead of size, and the numbers that matter will be tokens per second, KV cache per million tokens of context, and output tokens per task — the serving bill, not the training bill.

But do not plan around running GLM-5.4 yourself yet. The weights are not open — Z.ai says it plans to open-source them "responsibly after completing necessary safety hardening" — and the API is listed as coming soon. Today the model is available through the GLM Coding Plan, ZCode, and Z.ai's chat. The efficiency gains accrue to Z.ai's serving bill first. Yours comes later, if the weights arrive.

The demos point at where Z.ai thinks the loop pays off: code as a general tool. The post shows GLM-5.4 writing code to produce a self-narrated music video, building a 6-axis robotic arm through engineering-grade CAD in FreeCAD, creating a complete game, and generating an interactive 3D bird-watching scene from pure geometry and custom GLSL shaders. That is the "Generalized Coding" pitch: code as the foundation for solving a much wider range of tasks. It is a demo reel, not a benchmark, and the demos are the vendor's own. But the pattern is consistent with the architecture — the tasks that gain most from looping are the long-chain ones, and code that builds things is the longest chain there is.

Z.ai says its next model will be significantly larger and will carry forward everything learned from the loop. The interesting question is whether it will also carry the loop forward — whether depth stops being a property of size and becomes a property of time spent. The parameter race gave us models too big to run. The loop race might give us models that think twice before they speak.

That is the problem with a loop, and the promise of one: it costs nothing to add, and everything to stop.

Source: [GLM-5.4: Toward Generalized Coding with Our First Loop Transformer](https://z.ai/blog/glm-5.4)
