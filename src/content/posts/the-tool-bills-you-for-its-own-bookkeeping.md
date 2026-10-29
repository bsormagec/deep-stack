---
title: "The Tool Bills You for Its Own Bookkeeping"
dek: "Claude Code's background-agent status labels cost one team more than the work itself — and there is no switch to turn them off."
date: 2026-10-29
image: "/images/the-tool-bills-you-for-its-own-bookkeeping.webp"
---
The interesting thing about Claude Code's three-word status labels is not that they exist. It is that the tool pays its most expensive model to write them, every thirty seconds, for every background agent you run — and then throws the answer away.

A write-up from Flamerix AI, published as a GitHub gist on October 28, 2026 and on the Hacker News front page the next morning, measured the damage with Claude Code's own telemetry. The team grouped `claude_code.api_request` events in the OpenTelemetry export by their `query_source` field. One label stood out: `agent_summary`. Over one week, those summary calls cost 16.4 percent of the team's total Claude Code spend. The main conversation — the actual work — cost 15.7 percent.

That sounds like a rounding error in someone else's bill. It isn't. The summary calls were 19.7 percent of all API requests, roughly one in five, and 96 percent of that spend ran on Opus, the most expensive model in the lineup. The ratio of input tokens to output tokens was about 9,000 to 1: tens of thousands of tokens in, three to five words out.

## A label that costs more than the work

The mechanism is simple, which is exactly what makes it unpleasant. Every thirty seconds, for every background agent, Claude Code sends that agent's entire transcript to the agent's own model — usually Opus — and asks it to "describe your most recent action in 3-5 words." The answer updates one thing: the agent's status line in the agents panel. As Flamerix puts it, it "never reaches the model or your conversation."

The feature has been on by default since version 2.1.232, dated August 2026, and there is no documented setting to turn it off. The distinction matters, because the first wave of reactions confused two different things. Anthropic's documentation says the terminal status line — the bar at the bottom of your terminal — runs locally and costs no tokens. That is true, and it is not the thing being billed. The cost sits in agent summaries, a separate feature that only exists for background agents in the agents panel. Your main conversation never gets these labels, and it never pays for them.

Flamerix is not the only one counting. GitHub issue #86879 collected four independent measurements of 18 to 26 percent. An independent replication with three background agents on version 2.1.312 found the summaries cost 14.6 percent of the session. The numbers cluster, and they cluster high.

## The other number

Anthropic answered on the Hacker News thread, and its number is very different. Edwin Arbus of the Claude Code team wrote that across users sending telemetry, `agent_summary` represents roughly 2 percent of cost at API list price, 6 percent in the terminal specifically. The 16.4 percent figure, he said, reflects "a team running mostly background agents" and "doesn't seem like a typical session."

Both numbers can be true. That is the point. The cost of this feature scales with how you use the tool: a session with one fast agent barely notices it, while a session with a fleet of long-running background agents pays for a second, invisible workforce that does nothing but narrate the first one. An independent test found exactly that shape — 15.7 percent with slow agents, 1.3 percent with fast ones. The meter's meter is proportional to how much background work you run.

Arbus also pointed to a cache-miss fix already shipped in version 2.1.311 and later, and said the team is working on a cheaper mode that sends short notes to a smaller model. There is a cache subtlety worth stating plainly: about 98 percent of these summary calls re-read the transcript from cache, according to the gist, and the roughly 2 percent that hit a cold cache carry over a third of the cost. Cached tokens are cheaper than fresh ones, but they are not free, and on a subscription plan the loss is not even dollars. It is rate-limit headroom — the thing that decides whether your agent keeps working at 4 p.m. or stops until the window resets. The gist is explicit that its spend figures are Claude Code's own per-request estimates, not an invoice. On API billing the same calls are real money; on a subscription they are a shorter leash.

## Why there is no switch

The absence of an off switch is not an oversight the gist's author failed to find. It is structural. The SDK option `agentProgressSummaries` defaults to false, but in the compiled bundle it is one term of an OR, and every code path that writes it sets it true — so false changes nothing. The undocumented environment variable can only enable summaries, not disable them. The interval itself comes from a per-model-family server flag, clamped to 30 to 240 seconds, and no value disables the timer. The environment variables that do stop it — `CLAUDE_CODE_FORK_SUBAGENT=0`, `CLAUDE_CODE_DISABLE_BACKGROUND_TASKS=1` — stop it by taking forked subagents or background agents with it. That is not a setting. That is amputation.

So the workaround is a hack, and it is honest about being one. Flamerix published `no-agent-summary.js`, roughly seventy lines of Bun preload code, under an MIT license. It wraps the global `setTimeout`, matches the summarizer's timer callback by its source text — the `[AgentSummary] Timer fired` log line — and returns an inert handle instead of arming the timer. Every other timer passes through untouched. The binary is not modified. It has been verified across versions 2.1.257 to 2.1.312 on Linux, with macOS reported working by others, and in the team's own telemetry the summary requests dropped to zero with no other query source growing to take their place.

The catch is stated in the gist itself, and it is the reason this is a workaround rather than a fix: matching is by source text, so an update can silently break it. If the log line is renamed, the callback wrapped, or the timer moved off the global `setTimeout`, the hook matches nothing and the summaries come back without telling you. The gist's own instruction is to re-verify after every update — and note one more boundary: headless runs do not arm the summary timer by default, so the default-on overhead lives in interactive sessions with background agents. If you never run those, this is not your bill.

The Hacker News discussion focused, predictably, on whether 16.4 percent or 2 percent is the "real" number. That argument misses the structural fact both sides agree on: a tool whose headline promise is doing more work for you is quietly spending a visible share of your budget describing work it already did, to an audience of nobody, with no way to say stop. The percentage is a property of your session. The missing switch is a property of the product.

For builders, the takeaway is practical: before you patch anything, measure your own export. If you run Claude Code with background agents, group your OpenTelemetry events by `query_source` and look at `agent_summary` next to your main conversation. If it is a rounding error, leave it alone — a future update's cheaper mode will handle it. If it is a line item, the preload exists, it is seventy lines, and it is MIT-licensed. But treat it like what it is: a timer hook that can silently stop working, pointed at a feature the vendor has not yet given you a real switch for. Check it after every update, or accept that the meter will keep charging for the meter.

That is the problem. Not the three words. The fact that nobody asked whether you wanted them at any price.

Source: [Claude Code burns ~15-20% of your tokens on a 3-word status line](https://gist.github.com/flamerix-ai/c3905705cc4205e5de3011fa2e74efce)
