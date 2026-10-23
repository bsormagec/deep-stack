---
title: "AI agents need a bouncer, not a security camera"
dek: "The shift from logging what an agent did to deciding what it can do is the quiet moment the whole AI governance conversation has been circling. An open-source project shows how."
date: 2026-08-28
image: "/images/ai-agents-need-a-bouncer-not-a-security-camera.webp"
---
Every store I have ever worked in has the same obsession. Not the storefront, the back office. Someone wires up logging, dashboards, and alerts so that when something bad happens, we can scroll back and find the exact minute it went sideways. We get really good at explaining what an agent did after it did it.

That is observability, and it is the default posture of the AI agent world right now. Runtime firewalls like Straiker and Lakera tell you what a model did last Tuesday. You get a log stream and, if you are lucky, a neat timeline. But nothing is stopped. Nobody makes a decision before the thing happens. We treat AI agents the way we treat a teenager with a car, camera in the passenger seat, wondering why we only ever hear about the damage afterwards.

A Show HN post caught my eye this week for the opposite reason. It is an open-source project called Conduct that reframes the whole problem. Not another dashboard. A policy engine that decides, before an agent's tool call executes, whether that call gets blocked, warned about, audited, or allowed. Control before the action, not a post-mortem of it. I think this is the shift the AI governance conversation has been circling for a year and finally putting a name to.

## Logging is not governance

The distinction matters more than it sounds. Runtime firewalls are fundamentally reactive. An agent calls a tool, the tool runs, you find out about it from a log line. You might not even get that in time. The damage is done, the token spent, the record written somewhere you cannot delete. Governance, as Conduct frames it, sits at an earlier point in the pipeline. It checks the request against a signed policy, makes a structured decision, and only then releases the call. You go from reporting to enforcement.

That single ordering change is the whole ballgame. It is the difference between a security camera and a bouncer. The camera catches people on the way out with stuff they should not have. The bouncer checks who is allowed in before any of it happens. For AI agents, which now have shell access, file writes, and increasingly MCP tools that touch every system a company runs, the bouncer is the only posture that actually contains the risk.

## Three design calls most teams will duck

Reading through the repo, three decisions stand out because they are the ones most teams quietly avoid.

1. Signed configuration. Every workspace signs its active policy set, and every Guard check verifies the signature before enforcing. A tampered policy, pushed by anyone at any layer, is rejected before it decides anything. Hashing straight into git, reviewing policy before promote, refusing to trust a config that drifted. If you have shipped policy-as-code at any real company, you know how rare this discipline is.
2. Hash-chained audit. Every decision appends to a SHA-256 chain rooted at workspace genesis. Missing or altered entry breaks the chain and one click catches it. This is tamper-evident evidence you can hand an auditor, not a log sink you hope nobody noticed you never back up.
3. Fail-closed by default. When the guard cannot check, it blocks rather than silently passing the request through. Most tooling in this space fails open because failing open is the easy, frictionless, nobody-complains choice. Failing closed is the choice that costs you a support ticket now and saves you an incident later.

## Why fail-closed is the hard part

Fail-open is secretly a product decision disguised as a technical one. If your tool blocks a legitimate agent call, the developer in the loop gets angry, files a ticket, and your tool looks broken. Fail-open means nobody ever gets angry at you. It also means the one time an agent is about to delete the production database, your tool waves it through because hey, the policy engine was briefly unavailable, and it seemed rude to assume the worst.

Conduct defaults to failing closed and makes you consciously turn that off. That is the right default for anything touching shell and MCP surfaces, and honestly it is the choice I would make for any agent that can write files outside a sandbox. The cost of a false block is a human clicking approve. The cost of a false allow is a checkout you cannot unscrew. They are not symmetric, and products that treat them as symmetric are the ones I do not want writing to my production fleet.

## The builder takeaway nobody talks about

The most interesting product move is buried in the FAQ. Conduct ships Discovery mode separately, a read-only pass over every AI action a team takes for fourteen days, no policy to author, nothing to install upstream, no cost. Only after you have seen what actually happens do you promote a rule from what Discovery already watched.

That is the wedge every OSS governance tool should copy. Enforcement is the scary sell. Nobody wants to be the one who broke the agent pipeline two hours before a demo. But visibility costs nothing, violates nothing, and sells almost itself. You watch for a fortnight, you see the one agent quietly calling a tool it should not be calling, and suddenly the ask is no longer abstract. The promotion from observe to enforce happens naturally because the evidence is already sitting in front of that person's own dashboard.

That move deserves more credit than it gets. Most governance products start by asking you to write policy before you understand your own agent behavior, which is asking a team to solve a problem it has not seen yet. Conduct inverts it. See first, then govern. It is the difference between selling a seatbelt and selling a driving course, and I think we all know which one people actually buy.

## The part I am still not sure about

I want to say the honest caveat. None of this is magic. A policy engine is only as good as the policy you write, and the hardest governance failures are the ones nobody writes a rule for. A guardrail that blocks the obvious bad calls gives you a false sense that the subtle ones are covered. The hash chain proves your auditor that nothing was tampered with; it does not prove the policy was right in the first place. Those are two different claims, and it is easy to let the engineering confidence bleed into the policy confidence.

I also note this is a very new, small open-source project. Two stars, one maintainer, a lot of commits that read like a small team shipping fast. Judge it as a proof of the posture, not as infrastructure you should bet your company on next week. The posture is the lesson worth taking, and it is free.

The conclusion I keep landing on is simple. For the past year we have been building security cameras for agents and calling it governance. Conduct points at the thing we skipped. Enforcement has to happen before the call, not after the log. Fail closed. Give teams a free way to see before you ask them to govern. None of it is easy, but it is the direction, and it is a lot more honest about what software engineers actually need.

## Source

Based on the [Show HN announcement](https://github.com/sseshachala/conductai) and the [Hacker News discussion](https://news.ycombinator.com/item?id=49483173)
