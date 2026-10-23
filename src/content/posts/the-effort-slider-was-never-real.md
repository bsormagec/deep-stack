---
title: "The Effort Slider Was Never Real. That's the Product Lesson."
dek: "Anthropic is quietly A/B testing a smaller \"effort\" scale inside Claude Code. The story isn't token economics — it's what happens to trust when the knob on your most important tool silently stops meaning what you think it means."
date: 2026-08-22
image: "/images/the-effort-slider-was-never-real.webp"
---
Here's a small thing Anthropic did this week that tells you more about where AI developer tools are heading than any model release. Dev @argofowl noticed that on newer builds of Claude Code, the model started reading "high" effort as a 10 out of 100 — the exact number "low" used to be. He dug into the actual requests, confirmed it was server-side (not his app), and found the changelog says nothing about it. His verdict, in one line: "if fable felt dumber this week, it's not you."

## The knob was never a real knob

Let's be precise about what's actually being accused here, because the internet reaction — "they're milking tokens to juice revenue!" — mostly misses the point. Anthropic appears to be running an A/B experiment that shrinks the effort scale on a subset of sessions. If you're in the test group, "high" silently means what "low" used to mean. The label on your control didn't change. The thing it does changed.

That's the quiet detail that matters. A slider that shows you "low / medium / high" and then quietly recalibrates underneath is not a chart of the model's cognitive load. It's a pricing dial wearing the skin of a capability dial. It tells you the vendor has decided the numbers don't have to mean anything stable to you — only roughly the same relative shape, so you keep pulling the lever.

The cynical read is token revenue. The boring, more likely read is compute allocation. Reasoning effort is a knob for how much GPU think-time a request burns; a frontier lab squeezed on capacity has a real incentive to quietly push requests down the effort curve so more of them fit. Either way, the user's mental model took the hit. And the HN thread is full of exactly that injury: one user watched a one-file config update turn into "43 minutes of pulling containers, running sandboxes, creating testing suites" that spanned the whole repo. Another ran a benchmark quiz to find out whether the model was actually Opus or something kneecapped. When you have to A/B your own provider to figure out what you're paying for, something structural is broken.

## Decouple benchmarks from usefulness

The most genuinely useful comment in the discussion came from someone who kept using an older model through the whole 4.7-to-5 run and had a great time: "I think we just need to decouple 'doing better on benchmarks' and 'actually more useful to me,' since they've clearly diverged." That's the real thesis here, and it's not about Anthropic specifically.

Benchmarks measure whether the model can answer a hard question. Usefulness measures whether it does the small thing you asked, in scope, without wandering off to re-architect your repo. These have diverged hard, and the effort dial is where the divergence becomes visible. The models got better at benchmarks and, in the same breath, more verbose, more eager to over-engineer, more likely to "document everything" until the actual change is buried in three paragraphs of agonizing about whether to write a comment. A model that scores 4-point-something on a benchmark but turns a config edit into a 50x effort blowup is not a better product — it's a more expensive one that happened to score well.

## What a dev tool is actually selling

This is where the product lesson lands. A developer tool — a coding agent especially — sells three things: capability, latency, and trust. Capability is table stakes now; everyone is good. Latency is a knife fight. But trust is the compounding asset, and it's the easiest to quietly destroy.

1. Trust in the control: a selector named "high" should mean high. The instant a user learns it might mean low, every future session starts with suspicion — they run their own quiz to verify what they're paying for.
2. Trust in the scope: a good agent does the one file you asked for. A model that interprets "update the config" expansively enough to spend 43 minutes in a sandbox has broken the mental contract about what "do this" means.
3. Trust in the meter: tokens are the only thing you're billed on, and you can't see how many you're about to spend. When the vendor controls both the number and the meaning of the lever, and neither one is disclosed, your cost model becomes a guess.

None of these are about the model being "dumber." They're about the interface between you and the model becoming untrustworthy. And that's the thing no benchmark captures and no changelog documents.

## The non-obvious takeaway

Here's what I'd actually extract from this, besides the usual (very fair) grumbling. If you build a product where a user-facing control's real meaning is a lever you can move to manage your own costs, you will eventually move it — every company does. The question is whether you tell anyone. Silent recalibration converts a normal business decision into a betrayal, because the user can't adapt to a change they can't see. They'll notice the output change, conclude the product got worse, and blame the model — or quietly build a test harness to police you.

The fix isn't to never tune for economics. It's to make the user's mental model load-bearing: rename the control, ship a changelog line, tell them when the dial moved. Transparency is the cheapest trust you'll ever buy, and it's the one thing that a server-side A/B on a labeled knob directly throws away.

The deeper point for anyone who ships software: your users are building their workflows on the semantics you imply, and they will defend those semantics to the end. The moment a label lies is the moment you start paying back, in churn and in the cost of re-earning attention, every dollar you saved by being quiet.

## Source

Report and detail from the original thread: [@argofowl's post on X](https://twitter.com/argofowl/status/2091150597374537729). Community reaction and practitioner counterpoints on [Hacker News](https://news.ycombinator.com/item?id=49401549).
