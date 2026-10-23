---
title: "Claude Code Just Raised Limits 50% — and the HN Thread Shows Why That's Not the Win It Looks Like"
dek: "Inside the token-burn debate: what 233 upvotes and 187 comments actually tell us about the pricing war"
date: 2026-08-18
image: "/images/claude-code-just-raised-limits-50.webp"
---
Anthropic just told Claude Code users their weekly limits are going UP by 50% — through mid-August.

On paper, this looks like a win. More tokens, more experiments, more freedom to burn.

But if you've been reading the HN comments on this post (233 points, 187 comments), you'll notice something much more interesting underneath.

This isn't really about a promotion. It's about a philosophical battle that the developer community is already voting on with their wallets.

Here's what I'm seeing:

The "token burn" problem is real.

Multiple engineers on HN reported burning through their Claude Max $200/month limits in under 30 minutes with UltraCode. One person spun up 5 research agents with 26 subagents and lost their entire weekly quota in 20 minutes. Another posted that Claude Code "eats tokens like there's no tomorrow" and they can't even finish a small fix without it running full test suites in docker, downloading images, filling the context window with hundreds of useless lines.

The UltraCode system prompt literally says: "token cost is not a constraint."

That's not a feature anymore. It's a liability.

Meanwhile, OpenAI's Sol on Codex is winning on efficiency.

The most upvoted sentiment in that thread? People are actively migrating. Not because Claude is "bad" — because Claude is expensive in ways that matter when you're using it 8 hours a day, not 30 minutes a week.

One commenter put it bluntly: "I tried Codex for a few days. While it worked fine I didn't see any benefit to switching since it costs the same ($100) and I've spent a year getting up to speed on Claude usage."

Another: "Sol is smart enough for anything I've thrown at it, it's not one-shotting like Fable, but I'm more willing to actually go back and forth with it."

The waffle problem is making it worse.

Multiple users complained that Claude's output quality has degraded in a subtle way — verbose to the point of incomprehensibility. "Smoke tests on the foundation-gates that are left for the cutting seam checks" — that's actual Claude output according to one commenter. When the model starts speaking in corporate abstract, you've got a UX problem, not a model problem.

Here's my takeaway for builders:

1. Stop treating AI coding tools as single-vendor plays. The best workflow I saw in that thread? Using Claude AND Codex adversarially. Claude for creative exploration, Codex for nitty-gritty verification. Cross-review each other's changes.
2. The "medium effort" setting is undervalued. Every commenter who hit limits was running "high" or "ultra." Medium effort gives you 80% of the quality for 40% of the token cost on most tasks. Only go nuclear when you actually need it.
3. Watch the pricing war, not the marketing. OpenAI cut Sol pricing by 50%. Anthropic responded with a 50% more tokens promotion. Neither is sustainable. The companies that figure out efficient inference first will win the real race.
4. Local models are closer than you think. The HN thread was full of people already experimenting with Qwen, DeepSeek, Kimi on OpenRouter. $100/month on OpenRouter goes a LOT further than $200/month on Claude Max when you're burning through it.

The promotion ends August 19th. When it does, the real test begins — which model can deliver real productivity gains without turning your budget into Swiss cheese.

My money isn't on the model that burns the most tokens. It's on the one that respects your time AND your wallet.

[Source: Anthropic — Claude Code weekly limits promotion](https://support.claude.com/en/articles/15910845-claude-code-may-august-2026-weekly-limits-promotion)

[HN Discussion (233 points, 187 comments)](https://news.ycombinator.com/item?id=49348751)
