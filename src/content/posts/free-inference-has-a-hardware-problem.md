---
title: "Free Inference Has a Hardware Problem"
dek: "## ds4 runs a 284-billion-parameter model on a workstation. The real question is what the workstation costs."
date: 2026-10-03
image: "/images/free-inference-has-a-hardware-problem.webp"
---
The interesting thing about ds4 is not that Salvatore Sanfilippo wrote a local LLM inference engine. It is that his engine's headline benchmark arrives with a footnote most summaries skip: the machine it runs on.

ds4 — "DwarfStar 4" — is a narrow, MIT-licensed C inference engine for a handful of open-weight models: DeepSeek V4 and V4.1 Flash, GLM 5.x, and Qwen3.8 Flash Next. The DeepSeek V4 Flash at its center is a 284-billion-parameter mixture-of-experts model, the kind of artifact that normally lives behind an API key. ds4's trick is asymmetric 2-bit quantization aimed only at the routed experts — the parts of the model that can survive compression — while the attention layers, shared experts, and output head stay at 8-bit precision and the compressor path stays at full 16-bit float. Compressed, in the project's own words, "not lobotomized."

That is the engineering. The economics are more interesting.

### Narrow is the feature

Every general-purpose LLM runner — llama.cpp, Ollama, and their many forks — wants to run every model on every machine. Sanfilippo took the opposite bet: support fewer models, then tune the whole stack for them. On the Hacker News discussion, Simon Willison put it in one sentence: DwarfStar "only supports a small set of carefully chosen models, but it supports them *really well*." Pressed on what that actually buys, his follow-up was shorter: "It has better defaults."

That sounds like a shrug. It isn't. Tool calling is where generic runners most often stumble — misconfigured endpoints, broken function schemas, cache-incoherent retries. ds4 ships a local API server that speaks both OpenAI and Anthropic protocols, a CLI, and a native coding agent that share one model state and one cache. A ds4 user in the HN thread pointed to the small detail that matters most: the agent's history is append-only, never rewritten, so the KV cache prefix stays reusable across turns. The KV cache itself is treated as "a disk citizen" — long prefixes are saved to SSD under a prompt hash and resumed without a full re-prefill. For agent workflows, where the same long context gets resent on every turn, that is the difference between a local stack that feels instant and one that feels like a patience exercise.

The benchmarks, from ds4's own published table: on an M5 Max with 128 GB of unified memory, the 2-bit build does 790 tokens per second of prefill and 39 tokens per second of generation at a 2,048-token context. Stretch the context to 65,536 tokens and prefill drops to 398 per second, generation to 27.6. Prefill is the number nobody quotes in marketing and everybody pays in practice — it is the thinking-before-the-first-token phase, and for agents carrying long histories it is most of the wait. One HN commenter noted that hosted GPT 6.1 has lately been serving at around 20 tokens per second; on paper, the local machine keeps up on generation and laps the field on prefill. Both numbers are self-reported and should be read that way — the site's own table on one side, a commenter's anecdote on the other.

### The bill moved to your desk

Here is the part the benchmark table doesn't show. In the same HN thread, a commenter priced the reference machine: "7800€ for a MacBook Pro M5 Max with 128GB RAM, right now. Insane."

That is the honest cost of "free" inference. API pricing put the bill on a per-token meter; local inference amortizes it into hardware. A developer running agents all day — resending long contexts, looping tool calls — can easily spend more per month on API tokens than the depreciation on a workstation. A developer who queries a model a few times a day cannot. The interesting number isn't the price of the machine. It's your own usage volume, and most people have never computed it.

The minimums are also a moving target. One commenter noticed that ds4's site calls a 64 GB Mac a "good minimum" while the GitHub repo says Metal targets 96 GB and up, with SSD streaming for smaller machines. That is not dishonesty; it is what happens when the hardware requirement is the product. Generous defaults, pessimistic minimums — every local stack reads that way until you try it on your own desk.

And the counterpoints are real. One commenter dismissed the whole project as "a vibe coded knock off of llama.CPP," which is unfair as criticism but useful as a question: if the advantage is mostly better defaults per model, why not a repository of curated configurations for the generic runner — "lsp-config for neovim," as another commenter put it? The answer may be that Sanfilippo simply found the narrow path more productive, and the MIT license means anyone can widen it later. The HN thread is already full of people doing exactly that: forks adding Go bindings, Intel iGPU patches, 1M-context experiments on 128 GB machines.

### For builders

For builders, the takeaway is practical: local inference crossed from hobby to option the moment agents made context long and token volume compounding. The ds4 stack — quantized weights, disk-persisted KV cache, append-only agent history — is shaped around exactly what agentic work looks like: the same prefix, resent, turn after turn. If your workload looks like that, the question is no longer whether local models are good enough. It is whether your token bill has crossed the depreciation line.

Nobody has run that calculation for you. Start there.

Source: [DwarfStar 4 (ds4): Local DeepSeek V4.1, Qwen and GLM](https://dwarfstar.sh/)
