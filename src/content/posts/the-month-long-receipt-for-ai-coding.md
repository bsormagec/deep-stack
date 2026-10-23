---
title: "The Month-Long Receipt for AI Coding"
dek: "Wagtail tried to spend September doing all of its coding on one cheap model. The model held up. Everything around it leaked."
date: 2026-10-03
image: "/images/the-month-long-receipt-for-ai-coding.webp"
---
The interesting thing about Wagtail's one-month experiment with GLM 5.3 Flash is not that a cheap model turned out to be good enough. It is that the team kept a real receipt — in dollars, kilowatt-hours, and grams of CO₂ — and published it. Most teams running coding agents in September 2026 have a rough sense of their token bill. Almost none of them know where it went.

The setup was simple. The Wagtail team — the open-source CMS outfit — decided to route all of their September coding work through a single model: GLM 5.3 Flash, the Z.ai model that had spent twelve days in August anonymously topping OpenRouter's coding charts under the name "Ox Alpha" before Z.ai claimed it and released the 320-billion-parameter weights under an MIT license. One million token context window, vision support, available from a long list of competing providers. On paper, the ideal cheap workhorse: agentic coding's equivalent of the house red.

For the first half of September, it worked exactly as planned. The target model's share of the month came in at $68, about 4 kWh of energy, roughly 365 grams of CO₂ — the team notes, with admirable honesty, that this is what their flash-tier budget was supposed to look like.

The second half of the month is where the receipt gets interesting. A billion tokens — half of the month's total 2B — went to other models.

## The cost of vibe coding

The single most expensive line item was not a frontier model. It was a vibe-coded prototype. The team built an experimental Wagtail MCP server with an agent, and picked the wrong model for the job. Overnight, that one prototype burned 450 million tokens, $150, and 5 kWh of energy — more than double what the target model cost for its entire half-month of real production work.

That sounds like a cautionary tale about prototypes. It isn't. It's a cautionary tale about defaults. The team's own estimate is that the same result could have been achieved at roughly a fifth of the cost with not much more effort. Nobody chose to spend $150 overnight; the model choice happened once, early, and the agentic loop did the rest. When every step of a loop multiplies the previous one, the model selection you made at 11 PM is the bill you get at 7 AM.

For builders, the takeaway is practical: an agentic run without a model-selection decision is a run with an implicit one, and the implicit choice is usually the expensive one.

## The provider is the product

The second surprise was infrastructure. The cheap-model providers the team relies on — the ones with the sharp prices — do not have the same capacity as the big labs hoarding all the GPUs. As GLM 5.3 Flash climbed to the top of the Pareto frontier of relevant models for the team's work, performance degraded. Requests slowed. The team had to route around the damage, switching to DeepSeek V4.1 Flash and Qwen 3.8 Flash — a trivially easy change technically, and a completely unexpected one operationally.

That sounds like a story about one popular model. It isn't. It is a story about what the cheap-model tier actually sells you. The big labs sell you capacity; the discount providers sell you a price and hope the frontier doesn't move. When your model lands on the Pareto frontier, your provider's lack of a GPU moat becomes your availability problem. The team's Pareto plots were filtered to models they could confirm running in a European data center — sovereignty constraints that make the provider pool even thinner.

For builders, the takeaway is practical: the cost of a cheap model is not its price per token. It is its price per token plus the failover you build when the provider can't keep up.

## Measure in dollars, not tokens

The team's own verdict on the month is blunt: "technically this challenge was a failure." Fifty percent on the target model. A billion of two billion tokens elsewhere. About 35 kWh of energy instead of 10. But the failure was the point — they now have numbers instead of vibes.

The most useful number in the whole post is not about GLM at all. In the team's early benchmark table for Wagtail coding tasks, the top of the table is DeepSeek V4.1 Flash: 95% accuracy, 14.9 watt-hours of energy, $0.09 per task. That is what a cost ledger buys you — the ability to point at a row and say "this one," instead of arguing about which model "feels" better.

Their October plan keeps the challenge going, but only for day-to-day production work — not R&D, which will always scatter across models. The stated goal: the majority of inference work should run on flash-tier cheap models, measured in cost or energy use rather than what they call "meaningless tokens." Four concrete fixes follow: constant local measurement of spend and energy, budgeting for experimentation separately from production, better multi-agent patterns with bounded goals (orchestrator, scout, implementer, reviewer), and continuing to push efficient models.

The Hacker News discussion that carried the post to the front page — 210 points, 165 comments at the time of writing — focused less on the model and more on the failure modes: the overnight blowout, the provider capacity problem, the measurement discipline.

None of this is about GLM 5.3 Flash being special. Swap in any of the half-dozen flash-tier coding models released this year and the ledger would tell a version of the same story: the model is the cheapest part of the stack. The defaults, the provider capacity, and the unmeasured R&D are where the money actually goes. A month-long receipt is the only way to find out.

That is the problem with agentic coding bills: nobody reads them until someone publishes theirs.

Source: [One month coding with GLM 5.3 Flash](https://wagtail.org/blog/one-month-on-glm-53-flash/)
