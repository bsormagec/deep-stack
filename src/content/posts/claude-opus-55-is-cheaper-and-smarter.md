---
title: "Claude Opus 5.5 Is Cheaper and Smarter. The Fine Print Is the Effort Setting."
dek: "*Anthropic's newest flagship wins the benchmarks at max effort and wins on price at default effort. Those are two different models wearing one name.*"
date: 2026-09-23
image: "/images/claude-opus-55-is-cheaper-and-smarter.webp"
---
The interesting thing about the Opus 5.5 launch is not that it tops the benchmarks. It does, with effort turned all the way up. The interesting thing is that the benchmark wins and the price cut describe two different configurations, and both are being sold under one name.

Anthropic's announcement makes two claims at once: Opus 5.5 is the new leading model on agentic coding and knowledge work, and it costs 40% less to run than Opus 5. The launch shot to the top of Hacker News within hours, which is what happens when both claims land in the same headline. Both claims are true. They are just not true at the same time.

## Two effort settings, two different stories

Every headline number in the announcement — 66.4% on Terminal-Bench 4.0, 1846 Elo on GDPval-AA, 67.7% on Humanity's Last Exam with tools — was measured at max effort, with adaptive thinking cranked all the way up. Every pricing claim was measured at default effort. That is not a footnote. It is the entire pricing story.

Independent data shows what max effort actually costs in tokens. Artificial Analysis ran Opus 5.5 through its Intelligence Index in the max-effort configuration and found it generated 260M output tokens across the evaluation suite, against a median of 88M for other reasoning models in the same price tier. Nearly three times the verbosity. It scored 58 on the index against a tier median of 25, so the intelligence is real. But so is the token burn. At $20 per million output tokens, max-effort Opus 5.5 does its best thinking at a pace your invoice will feel.

None of this is hidden, exactly. The announcement contains the most honest sentence of the whole launch: at these levels of capability, Anthropic writes, benchmark margins have become a less reliable guide to real-world differences, and the gap between Opus 5.5 and its sibling Fable 5.1 is narrower than the scores suggest. When the vendor tells you not to over-read its own benchmark table, believe them.

## The price cut is real — read the right line

Strip away the benchmark theater and the pricing story is genuinely good. Input and output drop to $4 and $20 per million tokens, about 20% cheaper than Opus 5. But the line that matters is cache reads: $0.20 per million, down 60% from $0.50. Anthropic notes that cache reads make up the majority of agentic and coding work costs, and they are right. Every agentic loop re-reads conversation history. A 60% cut compounds on every single turn.

There is also a quieter claim inside the pricing: fewer tokens per task at default effort, not just cheaper tokens. Anthropic's internal tests show Opus 5.5 beating Opus 5 at max effort for about a fifth of the cost on Terminal-Bench, and matching GPT-6 Astra at roughly 40% of the cost. The early-tester anecdotes point the same way. A 200,000-line codebase audit finished in under three hours where Opus 5 took over twenty hours and two and a half times the tokens. Those are default-effort-shaped wins. The model doing the same work with less thinking, not more.

There is also a fast mode at $8/$40 per million tokens with up to 2.5x speed, which says something about where Anthropic thinks the demand curve bends. Some users will pay double per token to halve their wall-clock time. Pricing is becoming a three-dimensional choice — model, effort, speed — and most teams are still budgeting in one dimension.

## What this means if you're building

For builders, the practical version is straightforward. The effort setting is the real pricing tier. "Opus 5.5" is not one price; it is a family of cost curves, and the 40% savings live at default effort while the trophies live at max. Budget for the one you will actually run. If your harness is not using prompt caching, fix that before anything else, because the cache-read cut is the single biggest lever in this launch and you are leaving most of it on the table without it. And watch output tokens per task, not just per-token prices. Long chain-of-thought you never read is pure overhead, and 260M tokens to clear an eval suite is a data point about how the model spends, not just how it scores.

Opus 5.5 looks like a genuinely good release: smarter than Opus 5, meaningfully cheaper per unit of work, and shipped with its vendor warning you not to over-index on the benchmark table. The hype version of this story is "cheaper and smarter." The honest version is narrower and more useful. Cheaper at default effort, smarter at max effort. The distance between those two settings is where your budget lives.

---

*Sources: Anthropic's "Introducing Claude Opus 5.5" announcement (Sept 22, 2026); Artificial Analysis model page for Claude Opus 5.5, Intelligence Index v4.3.2 (accessed Sept 23, 2026); Hacker News front page (Sept 23, 2026). Benchmark figures are as reported by the sources; effort settings differ between sources as noted.*
