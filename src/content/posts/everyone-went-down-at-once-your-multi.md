---
title: "Everyone went down at once. Your multi-provider plan was always theater."
dek: "Claude, Grok and friends all went red within the same hour. Correlated failure is the one thing vendor redundancy can't fix."
date: 2026-09-03
image: "/images/everyone-went-down-at-once-your-multi.webp"
---
Anthropic's status page went red at 13:26 UTC on a Thursday: elevated errors on Claude Mythos 5.1, Fable 5.1 and Opus 5. Fifteen minutes later the affected list had grown to Opus 4.8 and 4.6. Two hours after that, most models were back to baseline error rates, though Opus 4.8 and Opus 5 were still limping. On its own, it reads like a routine incident: an outage, a fix, a status update.

The Hacker News thread that formed around it tells a different story. Grok was struggling at the same time. Cursor's Grok models were down too. Someone posted an Ask HN asking, roughly, why OpenAI, Claude and Grok were all down at once, and whether that was a coincidence.

## The reflex is to switch vendors

Read the comments and you will find the industry's learned response, repeated in miniature. "Officially signing up for the $200 Codex plan now." "Good day to try GLM 5.3." One engineer said he has been pushing his company to keep enterprise Codex accounts as a backup for developers. This is what two years of outages have trained us to do: when one vendor blips, grab another vendor's key and keep shipping.

It feels like risk management. It mostly is not.

## Correlated failure is the one thing a vendor mix can't absorb

The part of today worth thinking about is not that Anthropic had an incident. Incidents are normal; every serious API has them weekly. The interesting part is the correlation. A multi-provider strategy only diversifies the API layer. It does not diversify the physical substrate underneath, and that substrate is more concentrated than anyone likes to admit.

HN's speculation about the cause landed on SpaceX datacenters and Colossus within minutes. I cannot verify that from my desk, and neither could the commenters, but the direction of the guess matters more than its accuracy. Frontier inference runs on a surprisingly small number of datacenter campuses, drawing from the same power grids and the same GPU supply chain. Anthropic has been trimming weekly limits and raising prices while demand keeps outrunning supply; in the thread, people report burning through weekly quotas in hours and watching usage counters reset mid-week. That is not the behavior of a company with idle capacity. When a handful of landlords host most of the industry, the landlords' problems become everybody's problems on the same afternoon.

This is also not evidence that Anthropic's engineers suddenly got bad, however satisfying that take is. There was the obligatory joke about a vibe-coded PR being merged; a more sensible commenter countered that a company serving this much traffic does not forget how to deploy. At this scale, outages are usually capacity and dependency failures, not competence failures.

## What you actually do about it

Treat the frontier API as the single point of failure that it is, and design for degradation rather than pretending zero downtime is reachable. Concretely:

- Keep your layer model-agnostic. Prompts, tooling, eval harnesses and skills should not be glued to one vendor's quirks, because the day you need to move is not the day you want to do the refactor.
- Have a fallback that is genuinely uncorrelated. A second API key is a false hedge when both vendors share the same failure domain. A local model, or a small open-weight model on your own hardware, is a real one. It is worse at the hard stuff. It does not need to be. It is the difference between an outage being an inconvenience and an outage being an emergency.
- Decide in advance what must keep working during a correlated event. If the answer is "everything, always", you have built something that cannot survive the industry you are in.

## The takeaway

The outage itself is boring. Model X had elevated errors, engineers fixed it, the status page went green. That is not the story. The story is that the entire frontier industry is consolidating onto a shared physical base, and correlated red pages are the predictable result. Teams that come out of this era ahead will be the ones that stopped treating their API vendor as a partner and started treating it as a utility with escape hatches. Everyone else is one datacenter problem away from discovering their redundancy plan was theater.

Source: [Elevated Errors for Multiple Models (Anthropic status)](https://status.claude.com/incidents/461yvfrzpwtt)

Discussion: [Hacker News thread](https://news.ycombinator.com/item?id=49549676)
