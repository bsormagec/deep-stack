---
title: "The Seven-Cent Second Still Bills Every Miss"
dek: "Google's Gemini Omni 1.2 Flash is 30% cheaper and 50% longer per clip. The price is quoted per second. The bill is per attempt."
date: 2026-11-06
image: "/images/the-seven-cent-second-still-bills-every-miss.webp"
---

The interesting thing about Gemini Omni 1.2 Flash is not that a second of AI video got cheaper. It is that the second was never the unit anyone actually pays for.

Google announced the model on November 5, 2026, and made it generally available across the Gemini API and Gemini for business the same day. The headline numbers are clean: native clips up to 15 seconds, up from 10 with Omni 1.1, and a 30% price cut to $0.07 per second for 720p video, according to Google's announcement by DeepMind product manager Anish Nangia. A 15-second clip at that rate is about $1.05. That sounds like a rounding error. It isn't — because nobody who makes video for a living ships the first generation.

## The meter runs on drafts, not on finals

Video generation is a rejection business. A director generates, watches, rejects, re-prompts, generates again. Every one of those attempts is a full clip at full price, and the price is charged whether the clip is usable or not. Google knows this; its own launch post recommends drafting fast at 360p or 720p, fixing details with a follow-up edit instead of regenerating the whole clip, and upscaling only the best creations to 1080p or 4K. That is sensible workflow advice. It is also an admission: the cost of a usable clip is a multiple of the cost of a clip.

Do the arithmetic on Google's own token pricing, as published on the Gemini API pricing page. Video output costs $12 per million tokens, down from $17.50 for Omni 1.1, and 720p video is calculated at 5,792 tokens per second. A 15-second clip is 86,880 video-output tokens, or about $1.04. That figure is video output alone. Input tokens — reference images, uploaded video, prompts — cost $1.50 per million, and text output including thinking tokens costs $9 per million. Higher resolutions cost more per second: roughly $0.104 at 1080p and $0.209 at 4K, per the same pricing page. So a realistic session — four drafts, two edits, one upscale to 1080p — is not a $1.05 job. It is a $5 to $10 job, before a single frame reaches an audience. And there is no free tier on the API to absorb the misses; the pricing page marks the free tier unavailable for this model.

That is the same shape as every other meter in this business. The unit price falls, the number of billable attempts rises, and the total stays put. The 30% cut is real. It is also the least interesting number in the announcement, because it is measured on the one thing nobody buys: a single, perfect, first-try generation.

## What actually changed

The longer clip is the more honest upgrade. Fifteen seconds, in one-second increments from 3 to 15, is enough for a complete product explainer or a full social ad spot in a single generation, where 10 seconds forced a cut or a stitch. Multi-turn conversational editing is the other real change: swap a product or a background, change the lighting or the weather, switch aspect ratio, turn by turn on the same clip, instead of starting over. Google's examples show the same two characters keeping their armor reflections and camera framing while the background moves from a striped pavilion tent to an oak forest, a stable, a market fair, and a stone castle. Reference following got stronger too — character, product, or style images, motion clips up to three seconds, and audio cues, held from the first frame to the last, with less of the drift and morphing that used to give generated video away mid-shot.

None of that is a benchmark claim, because Google published no benchmarks with the release. There is no quality score, no head-to-head against a rival video model, no measured consistency figure — only side-by-side examples chosen by the vendor. Treat the quality claims as untested until someone independent runs them. The price, at least, is a number you can verify against the pricing page. The quality is a demo reel.

There is one more detail worth noticing, because it is the kind of quiet default that costs people money. From December 3, 2026, requests to the old model ID, gemini-omni-1.1-flash, will automatically route to 1.2 and bill at 1.2 rates, according to the pricing page. That is a price cut arriving as a forced migration, which is fine — 1.2 is cheaper — but it is also a reminder that the API route is the one place where the meter is unambiguous. The consumer routes are murkier: 15-second clips are rolling out to Google AI Ultra subscribers in the Gemini app, Flow subscribers get the longer duration on their credit schedules, and Google Vids generates 15-second clips at no additional cost with a Google account or Workspace subscription. Same model, three different bills, depending on which door you walk through. The developer paying per token and the subscriber spending credits are not buying the same thing, even when the clip is identical.

## The catch is the workflow, not the price

The Hacker News discussion, which put the announcement at 241 points and 188 comments on the day's front page, circled the same question from two directions: is 15 seconds enough to matter, and is $0.07 a second cheap enough to matter? Both questions miss the point in the same way. Fifteen seconds matters because it crosses the threshold where a single generation can hold a complete idea — a product demo, a joke with a setup and a payoff, an ad with a beginning and an end. Ten seconds was a fragment; fifteen is a unit. And $0.07 a second matters only if you count seconds. Count attempts instead, and the honest price of a finished clip is whatever your rejection rate says it is.

For builders, the takeaway is practical: budget video generation the way you budget any other stochastic API — by the cost of a usable output, not the cost of one call. Track your attempts per accepted clip. If you draft at 720p, edit in conversation instead of regenerating, and upscale only the winner, Google's own workflow advice is the cheapest path through its own meter. If you generate at 4K from the first prompt, you are paying the premium rate for your rough drafts. And if you are building a product on top of this API, remember there is no free tier: every user who experiments in your app is spending your money at $1.04 a clip before you have charged them anything.

Google also notes, almost in passing, that outputs carry an imperceptible SynthID watermark and that Provisioned Throughput is available for enterprise customers. The watermark is the right call and barely worth mentioning; the throughput option is the tell that Google expects this to be used at volume, where the per-second price is negotiated away and the per-attempt arithmetic is the only thing left.

A cheaper second is still a meter that runs on every draft. The price fell by a third. The number of drafts did not.

Source: [Gemini Omni 1.2 Flash: 15-second video and lower pricing](https://blog.google/innovation-and-ai/technology/developers-tools/introducing-gemini-omni-1-2-flash/)
