---
title: "Half the Price, Twice the Tokens"
dek: "## MiniMax cut M3.1 Flash's rate card in half — independent testing shows where the saving leaks back out"
date: 2026-10-20
image: "/images/half-the-price-twice-the-tokens.webp"
---
The interesting thing about MiniMax M3.1 Flash is not that it costs half as much as the model it replaces. It is that the saving and the leak are printed in the same launch.

On October 19, MiniMax confirmed that Space Bunny — the anonymous model that had been sitting at the top of OpenRouter's volume charts — was an early build of M3.1 Flash, its new model for agent work, coding, computer use, and cybersecurity. The listed price is flat: $0.15 per million input tokens, $0.60 per million output tokens, and $0.015 per million cached input tokens, according to MiniMax's pricing page as reported in launch coverage. M3, the predecessor, lists at $0.30 input and $1.20 output per million tokens up to 512,000 input tokens, and doubles above that threshold, per the same pricing table. Token for token, the new model is half the price below the threshold and a quarter of it above.

That sounds like a simple price cut. It isn't.

### The bunny was the beta test

Most launches ask you to trust a benchmark table. This one arrived with a traffic record.

MiniMax says Space Bunny processed more than 200 trillion tokens while running anonymously — a company figure, with no detailed public breakdown. OpenRouter's own account is narrower and more useful: the stealth model was its number one model for 10 straight days and processed 56.7 trillion tokens on that platform alone, the most of any stealth model it has hosted, according to OpenRouter's reveal post. That is a production stress test most labs pay to simulate.

The stealth run was also free quality assurance, and OpenRouter published what it fixed. Between the anonymous period and the launch, time to first token improved 38%, from 1.95 seconds to 1.22 seconds; throughput rose 45%, from 70 to 100 tokens per second; the error rate fell from 1.4% to 0.7%, per OpenRouter's figures as reported at launch. Developers did the load testing, found the failures, and never knew whose model they were debugging.

The Hacker News discussion treated the reveal as a cost story, which it is: the story sat near the top of Hacker News with 481 points and 206 comments, per the HN signal tracker that surfaced it.

### The vendor's numbers, labelled as the vendor's

MiniMax's own claims are aggressive. The company says online inference is nearly three times faster than M3, with output speeds above 200 tokens per second in everyday use and a median above 170; it says agentic tasks cost 70% less than on the predecessor. Its launch chart, as reported from the announcement, puts M3.1 Flash at 73.7% on DeepSWE v1.1 for coding, 62.2 on AutomationBench, 76.2 on BankerToolBench — tied with Claude Opus 5 in MiniMax's own table — 61.7 on OSWorld V2 for computer use, 29.6 on Agents' Last Exam, and 82% on CyberGym.

Read those as a vendor's chart, because that is what they are. Even inside it, the honest details show. On DeepSWE, MiniMax's own comparison puts DeepSeek's V4.1 Flash ahead. On BankerToolBench, the score barely moved from M3 — the improvement there is the price, not the capability.

### What the independent stopwatch says

Artificial Analysis tested the model on launch day, at maximum reasoning effort, and its numbers tell a quieter story. Its Intelligence Index scored M3.1 Flash at 42 at launch — the live listing now shows 43 — against 45 for DeepSeek V4.1 Flash, per Artificial Analysis. Measured output speed was about 120 to 123 tokens per second, with 1.08 seconds to first token — respectable at this price, and nowhere near the 200-plus headline. The gap between a vendor's median and an independent measurement is not a scandal. It is a reminder that the two numbers were never measuring the same afternoon.

The cost figure is the interesting one. Artificial Analysis measured $0.22 per task on its Index evaluation, down from $0.51 for M3 — roughly a 57% reduction, against MiniMax's claimed 70%, on a different evaluation. A real saving, then. Just a smaller one than the launch post sells.

Then comes the line that decides the bill. During that same evaluation, M3.1 Flash generated about 180 million output tokens, against a price-tier median of about 99 million, per Artificial Analysis. The model talks nearly twice as much as its peers to reach its score. At $0.60 per million output tokens, verbosity is not a personality trait. It is a line item.

### The meter you cannot turn down

That verbosity has a setting behind it, and the setting is the story.

The model's preview documentation describes reasoning as always on, with effort levels from low to max — and max as the default, as noted in launch-day analysis of the documentation. Reporting by The Inference, working from MiniMax's own documents, goes further: a request to disable thinking returns an error, an unset effort field defaults to max, and thinking tokens draw from the same allowance as everything else. The same reporting notes that, from October 19, subscription requests to the older M2.5 and M2.7 models route automatically to M3.1 Flash, with the old families stopping entirely on November 18 — the request still succeeds, and the model answering it is one nobody chose.

For pay-as-you-go users, the deal is clean: the rate halved, you set the effort, you watch the token count. For subscribers, the meter got hotter by default on the day the price was cut. A cheaper token that you cannot stop the model from spending is a discount with a condition attached.

There is one more condition. The weights are not out. VentureBeat reported a planned release on October 23, and the license terms had not been published at launch, per launch coverage. Until then this is a hosted model: no self-hosting, no local run, no exit if the defaults change again. And one independent result deserves a plain warning label — on Artificial Analysis's AA-Omniscience benchmark, the model recorded a 93% hallucination rate under that benchmark's definition, meaning that when it was wrong, it tended to answer confidently rather than decline. That does not make it unusable. It makes verification part of the price.

For builders, the takeaway is practical: the flat rate is genuinely useful — DeepSeek's matching $0.15/$0.60 rate doubles at peak hours, per the launch-day price comparison, and MiniMax's does not — but evaluate this model the way its own stealth run was evaluated, on cost per solved task, not cost per token. Set the effort level explicitly instead of inheriting max. Log output tokens per task before you log savings. And keep a verifier — tests, schema checks, a second pass — between this model and anything consequential, because the guessing habit is measured, not rumoured.

The front door was the price cut. The side door was 200 trillion anonymous tokens. The window is the default nobody set.

That is where the bill comes in.

Source: [MiniMax Launches M3.1 Flash, Revealing Space Bunny Stealth Model](https://www.unite.ai/minimax-launches-m3-1-flash-revealing-space-bunny-stealth-model/)
