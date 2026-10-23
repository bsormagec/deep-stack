---
title: "The Desktop Is Now Two Desks"
dek: "## Meta's 816-billion-parameter Muse Spark Open runs locally — if your desk can hold a terabyte of memory and well over $20,000 of Mac Studios"
date: 2026-10-16
image: "/images/the-desktop-is-now-two-desks.webp"
---
The interesting thing about Muse Spark Open is not that an 816-billion-parameter model can run on a desktop. It is what the word desktop now has to mean for that sentence to be true.

Meta released the weights on October 15, calling Muse Spark Open, in its own words via MacRumors' coverage of the launch, the most capable U.S. open-weight model to date. The model is a natively multimodal mixture of experts: 816 billion total parameters, 42 billion active per token, and a 1 million-token context window, according to Meta. It was built, Meta says, for coding and agentic work — long-horizon tasks, complex software engineering, and multi-step reasoning.

And it runs locally. That part is real. It just runs locally on two Mac Studios that do not quite exist yet, wired together like a small cluster, at a combined memory total of one terabyte.

That sounds like a datacenter. It isn't. It is a desk, technically.

## The arithmetic of fitting

Start with the honest number. Even compressed to 4-bit, Muse Spark Open occupies roughly 493 GB before any runtime overhead, according to Apple's technical breakdown as reported by iClarified. A single 512 GB Mac Studio therefore cannot hold it with room to actually run. The model does not fit on one machine. It fits across two.

Meta's own description of the setup, quoted by MacRumors, is precise about why the trick works: Apple's unified memory architecture lets the M5 Ultra's integrated GPU use up to 512 GB per Mac Studio, so two machines can hold the entire model, and the chip's 1.2 TB/s of memory bandwidth — Apple's figure, per machine — is fast enough to read the small slice each token needs. Two Mac Studios, in Meta's phrasing, behave like one supercomputer with a terabyte of unified memory.

The plumbing matters as much as the memory. Apple's latest MLX release splits the workload across Thunderbolt 5-connected Macs using RDMA — remote direct memory access — to move data between machines with low latency, according to Apple's technical breakdown reported by iClarified. Each pair of Macs in Apple's benchmark setup was connected with two Thunderbolt 5 cables. The front door here is a single desktop. The side door is a second desktop. The window is a pair of Thunderbolt cables doing RDMA so the seam between them disappears.

Notice what made this possible. Not a smaller model. A bigger desk.

## What 25 tokens per second buys you

Apple measured generation speeds for the 4-bit model at an 8,192-token context, generating 128 tokens per test, and published the results in its technical breakdown, as reported by iClarified. Two Macs with pipeline parallelism produced 15.74 tokens per second. Two Macs with tensor parallelism produced 24.99 tokens per second. Four Macs with tensor parallelism produced 36.73 tokens per second.

Read those numbers the way a builder would. Twenty-five tokens per second is a usable interactive speed for an agent doing long-horizon work — slow enough that you feel it, fast enough that a coding agent can iterate. But the scaling tells the real story: doubling the hardware from two machines to four bought roughly 47 percent more speed, from 24.99 to 36.73 tokens per second on Apple's own measurements. The second pair of Mac Studios is not twice the machine. It is a 1.47x machine at twice the price.

And these are Apple's numbers at an 8K context — not at the model's advertised 1 million-token window. Nobody in the launch material shows what generation speed looks like when the context that justifies a 1M window is actually filled. That gap is not a footnote. For agent workloads, context is the workload.

Meta did demonstrate the model working, not just generating. In Meta's own demonstrations, reported by MacRumors and iClarified, Muse Code powered by Muse Spark Open shipped real changes to Ice Cubes, an open-source Mastodon client — bug fixes, new features, a full build — and drove DaVinci Resolve end to end, reviewing footage frame by frame to select moments and crop clips vertically. Both ran entirely on-device. That is a genuine capability signal. It is also a vendor demonstration, on vendor hardware, at a context length the vendor chose.

## The price of local

Here is the cost line nobody itemizes in the launch post.

The 512 GB Mac Studio configuration used in the demo has not been released yet — MacRumors reports it is expected later this month, October 2026. The 256 GB Mac Studio, MacRumors notes, is already priced over $10,000. The demo configuration is therefore two machines, each in a memory tier above a $10,000-plus model, plus the cabling, plus the desk space, plus the power. A conservative reading of Apple's own pricing puts the two-machine setup well north of $20,000 before a single token is generated. The four-machine benchmark setup doubles that again.

Compare that honestly with the alternative the launch is implicitly arguing against. The same weights are available through API platforms including Baseten, Fireworks AI, Groq, Modal, Nebius, OpenRouter, and Together AI, according to MacRumors, and downloadable from Hugging Face, Amazon SageMaker AI, Google Cloud Model Garden, and Microsoft Foundry Models. Local inference at this scale is not a money-saving move on any normal workload. It is a control move: your data never leaves the building, your rate limits are your own hardware, and your marginal cost per token is electricity and patience.

That is a legitimate reason to buy the desks. It is just not the reason the headline sells.

There is also the license. The weights are free to download, MacRumors reports, under a license allowing limited commercial use — the Muse Model License, not an unrestricted open-source license, as iClarified notes. Open-weight is accurate. Open, without qualification, is marketing.

## What Hacker News noticed

The Hacker News discussion reached the front page's second spot with, at the time of fetching, a modest thread — the interesting tension there was not the model card. It was the recurring question underneath every local-inference launch this year: at what point does local stop meaning a machine you own and start meaning a cluster you happen to keep in your office?

That question has been building all autumn. A 125-billion-parameter model on a single gaming GPU was a clever hack. A 501-billion-parameter open model needed a datacenter conversation. Now an 816-billion-parameter model needs two desktops that cost more than a car, and the conversation calls it on-device. The category did not move. The hardware budget did.

Hacker News commenters are right to keep asking where the line is, because the line is the product. Every step up in local model size has been paid for in memory, and memory is the one component whose price has refused to cooperate this year.

## The practical read

None of this makes the release trivial. A frontier-scale open-weight model running at interactive speed on machines you can buy, unbox, and put under a desk is a real milestone, and the MLX work — tensor parallelism across Thunderbolt with RDMA — is the kind of plumbing that outlasts any single model. The next model that needs a terabyte will inherit this stack for free. Diligence with a interconnect, again.

But call it what it is. This is not the democratization of frontier inference. It is the miniaturization of the datacenter to the size of two desks, at datacenter-adjacent prices, for the small number of teams whose privacy, latency, or control requirements make $20,000-plus of Apple hardware cheaper than trusting a cloud.

For builders, the takeaway is practical: do the memory arithmetic before the capability arithmetic. Muse Spark Open's 42 billion active parameters are the cheap part — that is why it runs at 25 tokens per second at all. The 816 billion total parameters are the bill, and the bill is paid in unified memory, at Apple's prices, two machines at a time. If your workload fits the 8K-context, single-agent shape Apple benchmarked, the local route is now genuinely open to you. If it needs the full million-token window at speed, the launch material does not yet show that machine exists.

The model got open. The desk got expensive. That is the trade, and it is still a trade worth having — as long as you price both sides of it.

Source: [Meta and Apple Bring Muse Spark Open AI Model to Mac Studio](https://www.macrumors.com/2026/10/15/meta-muse-spark-open-mac-studio/)
