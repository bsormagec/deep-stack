---
title: "The Strongest Model Ships to Almost Nobody"
dek: "Google's Gemini 4 Carbon tops the benchmark charts, doubles its price on a schedule, and goes first to a hand-picked few. For builders, that combination matters more than any single score."
date: 2026-10-30
image: "/images/the-strongest-model-ships-to-almost-nobody.webp"
---
The interesting thing about Gemini 4 Carbon is not that it tops the charts. It is that almost nobody can use it.

Google announced Carbon on October 28, 2026, two weeks after Gemini 4 Argon, calling it its strongest model, with state-of-the-art cybersecurity and long-horizon capabilities. On Google's own telling, Carbon ranks first on the Artificial Analysis Intelligence Index v5.0 at 59, leads SEC-bench Pro for finding vulnerabilities at 88.2%, ExploitGym for exploitation at 54.8%, and CWE-bench for patching at 71.0%. It jumps 89 elo points to fourth place on WebDev Arena at 1768. Those are Google's numbers, from benchmarks Google says were evaluated without guardrails, and no independent lab has reproduced them yet.

And then comes the part that should interest anyone who actually ships software: Carbon is not for sale. Starting this week, Google says, it goes to "a subset of cyber defenders," then gradually to additional trusted partners through its Fairwind Program, while it gathers feedback and iterates on guardrails. Developers, businesses, and consumers get it "as soon as possible." No date. No API model ID. No general availability. The strongest model Google has ever announced is, for now, a press release with a waiting list.

## A launch in two speeds

That sounds like caution. It isn't — or at least, it isn't only caution.

Google says it is engaged in the U.S. government's voluntary process for pre-release model testing. A staged rollout to defenders first is a defensible way to put a model built for finding, proving, and fixing flaws into careful hands before general release. The cybersecurity framing is the whole pitch: Carbon is built for the defense lifecycle, from detection to validation to remediation, and Google reports its internal teams seeing more than double the success rate for generating secure code compared with Argon, plus a Chrome team report that Carbon performed more than ten times better than another lab's frontier model at generating high-quality patches.

Note what is missing from that last claim: the rival's name. A tenfold improvement over an unnamed model is a number without a denominator. The same pattern runs through the announcement. Internal benchmarks show Carbon running "for days" through dead ends on multi-step engineering tasks. Internal testing shows high-severity misalignment alerts down by almost 80%, overreach down 26%, under-service down 29%, and unsupported claims cut roughly in half versus Argon. On Gray Swan's indirect prompt injection benchmark, Carbon resists every evaluated attack — 0.0%, against Argon's 0.7%. These are all Google measuring Google, in Google's environments. They are directionally encouraging and exactly as verifiable as the company chooses to make them.

The Hacker News discussion, at 850 points and 705 comments at fetch, is the largest AI-model thread of the week — and the skepticism there is the useful part. A benchmark sweep you cannot reproduce is a claim, not a result. Until Carbon reaches developers, the only people who can check Google's arithmetic are Google and its chosen defenders.

## The price is the tell

Here is the number that is fully public, fully checkable, and most consequential for builders: $2 per million input tokens and $10 per million output tokens, with cached input at 95% off. That is the introductory price, identical to Argon's. Coverage of the announcement reports the same step-up Argon carried: $4 and $20 once the introductory period ends, with no end date given for Carbon.

That pricing structure tells you how Google expects Carbon to be used. The 95% cache discount is the real story for long-horizon agents. A model built to run for days across a large codebase re-reads the same files, the same tickets, the same context, over and over. If the cache discount holds, the re-reading is nearly free and the bill concentrates on fresh output tokens. If it doesn't — if your cache keeps missing, or your context keeps changing enough to break it — the meter runs at full price on every pass. A long-horizon agent's cost is not set by the headline rate. It is set by the cache hit rate, and Google publishes the discount, not the hit rate.

The doubling matters for planning, too. A builder pricing a product on Carbon today is pricing on a rate Google has already announced will double. The introductory window is a subsidy with an expiry date nobody can see. Argon's own introductory pricing ran through November 30, 2026, per the Gemini API pricing page cited in coverage of the announcement — which means the "cheap frontier" phase of this model family may be measured in weeks, not years. Build your margins on the $4/$20 rate. If the intro rate lasts longer, that is a windfall, not a plan.

## What the fortnight cadence means

The deeper shift is the cadence itself. Two frontier models in two weeks. Argon was barely out of its launch coverage before Carbon replaced it at the top of the index. For builders, the takeaway is practical: stop planning around model generations and start planning around model churn.

A team that benchmarked, integrated, and tuned prompts for Argon now faces a successor that is better on every published security metric, priced the same for now, and unavailable to them. The rational response is not to chase each release. It is to build the layer that survives churn: evals of your own, on your own tasks, with your own data, so that when a new model actually becomes purchasable, you can measure it in an afternoon instead of re-arguing from a vendor's benchmark table. Google's table says Carbon is better. Your evals say whether it is better at your job.

There is also a version of this story worth watching rather than celebrating. A frontier that ships first to a vetted few, under a government pre-release testing process, with general access "as soon as possible," is a frontier with a gate. Gates can be about safety. They can also be about leverage: who gets the best model first gets the best results first, and in cybersecurity, that head start is the product. Defenders first sounds reassuring until you ask who counts as a defender, who decides, and how long everyone else waits. Google does not say.

Carbon may be the strongest model Google has built. Right now, the strongest evidence for that is a benchmark table from its maker and a waiting list for everyone else.

That is the problem.

Source: [Introducing Gemini 4 Carbon](https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-carbon/)
