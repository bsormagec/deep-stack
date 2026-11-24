---
title: "Your Local Model Learns While You Sleep"
dek: "Songe watches your coding agent work, then trains your own model on your own corrections — in the hours your GPU would otherwise sit idle. The training is free. The only honest question is whether the improvement is real."
date: 2026-11-24
image: "/images/your-local-model-learns-while-you-sleep.webp"
---

The interesting thing about Songe is not that it trains a model locally. Local fine-tuning has been possible for years, and it has mostly stayed a hobby for people who enjoy babysitting training runs. The interesting thing is what it trains on: the corrections you already make.

Every session with a coding agent is a small pile of lessons. You rephrase a prompt after the model misunderstands it. You fix a tool call it got wrong. You tell it, again, that this project does not use that pattern. Today that pile evaporates when the session ends. Songe's bet is that the pile is the training set — that the cheapest way to make a small local model better is to feed it the exact moments it disappointed you, while you are away from the keyboard.

## How it works

Songe sits between your agent and your model server. Your agent — opencode, pi, or any OpenAI-compatible tool — talks to Songe on localhost, and Songe forwards the traffic to LM Studio, vLLM, Ollama, llama.cpp, or mlx-lm. While you work, it records what happens after each of the model's actions: the tool result, the error, your next message. Nothing leaves your machine. There is no account and no telemetry, and the project says so plainly.

When your agent goes quiet, Songe dreams. There are two kinds. A Quick Dream takes a few minutes and folds the preferences you stated or demonstrated into the model's instructions, showing you each new preference with a before-and-after where the answer changes. A Deep Dream takes an hour or more and trains the model itself: it writes short practice scenes from your lessons — in your agent's own tools — and trains a small adapter on them. Your real conversations are never trained on; the model writes the practice material itself.

The training method is on-policy distillation, and the setup is elegant. The model as it was, shown the lesson, is the teacher. The same model with a small adapter, shown only the scene, is the student. Earlier skills are rehearsed so they stay learned. Then comes the part that matters most: at the moments you reacted to, the version in use and the new one each answer, and a judge compares what they do. The new version is adopted only if it does clearly better, does not change what already worked, and its answers stay healthy. One click goes back to any earlier version.

It runs only when your agent is quiet, memory is free, and the battery is fine, and it stops the moment you are back. Before the first training run it measures how much your computer can learn at once and trains on what fits. Training runs on Apple Silicon through MLX and on NVIDIA and AMD through PyTorch. A machine without a GPU still serves and records, but does not train.

## The meter, finally, is yours

This is the part that fits the local-AI story. A rented frontier model charges you for every correction — every retry, every rephrased prompt, every tool call that comes back wrong is billed at the same rate as the work that succeeded. A local model costs you the hardware once, and then the corrections are free. Songe turns that into a loop: the corrections you were going to make anyway become the thing that makes the next session need fewer of them. The idle hours are the training run, and the GPU was going to sit there regardless.

The project is four days old — the repository was created on November 20, 2026 — and it has already gathered 568 stars and 57 forks on GitHub, with 119 commits and an Apache 2.0 license. The Hacker News discussion, at 117 points and 34 comments when this post was written, is mostly people asking the right questions. The top one is the one that matters: what are the rough numbers on improvement per dream? How much better should you expect the model to be after a weekend of training?

There is no answer in the README. That is the catch, and it is a real one.

## The part nobody has measured yet

Songe publishes no benchmark, no before-and-after, and no worked example of a single dream. A commenter asked for exactly that — a transcript of the improvement process, show-don't-tell — and the documentation does not have one. The judge that decides whether a new version is better is described, but its decisions are not demonstrated. You are asked to trust a mechanism whose output you cannot yet see.

The parallel work makes the gap visible. Hugging Face published its own harness adapters the same week, tuning small models to specific agent harnesses with impressive gains — and rented two B200 GPUs to do the tuning. That is not a personal budget. Songe's whole pitch is that your idle machine is enough, but the evidence for that pitch is, for now, the mechanism itself. The mechanism is sound. The measurement is missing.

There is a second, quieter risk, and it is the one the design has to carry. A model that learns from your corrections can also learn your bad habits. If you work around a quirk instead of fixing it, the dream teaches the workaround. If your corrections are sloppy, the adapter inherits the sloppiness. The judge and the rollback are not garnish here; they are the entire safety case. A training loop with no gate is just a machine that gets worse while you sleep.

That sounds like a reason not to use it. It isn't. It is a reason to use it the way the project asks to be used: with auto-dream on, small adapters, and the version history kept. The gate is the product. A local model that can be trained, checked, and rolled back in one click is a different object from a local model that can only be retrained from scratch by someone who enjoys babysitting training runs. The first one compounds. The second one stalls.

## For builders, the takeaway is practical

If you run a local model through pi or opencode, the cost of trying Songe is one install — `uv tool install songe`, then `songe init` — and the cost of running it is electricity you were already spending. The default example in the setup output is a 3-billion-parameter Granite model on MLX, which tells you the intended scale: small models, personal habits, the rough edges that only you ever see.

But do not install it expecting a number. Install it expecting a loop, and watch the loop. The first dream that fixes a repeated mistake without being told is the moment the idea stops being a README and starts being a tool. Until then, Songe is a well-designed promise with an unmeasured payoff — and the honest thing to say about it is exactly that.

The model that learns while you sleep is worth having. The proof that it learned is worth demanding.

Source: [A training engine for your local model, using your idle compute](https://github.com/sous-labs/songe)
