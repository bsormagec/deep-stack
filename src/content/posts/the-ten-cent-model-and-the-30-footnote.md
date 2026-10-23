---
title: "The Ten-Cent Model and the 30% Footnote"
dek: "## What Claude Haiku 5.5's pricing actually sells"
date: 2026-10-08
image: "/images/the-ten-cent-model-and-the-30-footnote.webp"
---
The interesting thing about Claude Haiku 5.5 is not that it is 90% cheaper than Haiku 4.5. It is that the headline number — $0.10 per million input tokens — is no longer the number that determines your bill.

Anthropic's new small model, released October 7 and now sitting at the top of Hacker News with 986 points and 466 comments, is a genuine step forward. The Artificial Analysis Intelligence Index puts it at 43, up from 17 for the last Haiku-class release a year ago, and ahead of GPT-6 Luna's 38, Gemini 3.8 Flash's 41, and GLM-5.3 Flash's 42. It scores 72.4% on the offline subset of OSWorld 2.1 against 15.7% for its predecessor, per Anthropic's reported figures. On paper, this is the best small model you can rent. The paper is where the story gets complicated.

## The cliff at 100,000 tokens

Haiku 5.5 introduces two-tier pricing, a first for the Claude API. Prompts up to 100,000 tokens cost $0.10 per million input tokens and $0.50 per million output tokens. Above that line, the price quintuples: $0.50 input, $2.50 output.

That sounds like a discount with an asterisk. It is. The discount is calibrated against Anthropic's own fleet: the company says roughly 90% of Haiku 4.5 requests fell under 100K tokens, so most workloads land in the cheap tier. But the tier boundary changes the shape of cost planning. If your workload is long-context summarization or document work — exactly the kind of high-volume work Haiku is pitched for — crossing 100K tokens means the same request costs five times what the pricing page's first line implies. And Haiku 5.5 ships with a 1-million-token context window, up from 200,000 a year ago, which is an invitation to cross the cliff.

Then there is the tokenizer. Anthropic's migration guide notes that the new tokenizer counts the same text as roughly 30% more tokens than Haiku 4.5 did. So even inside the cheap tier, your "million tokens" buys less work than the number on the invoice suggests. Token accounting changed under the price cut, and the 30% figure is doing real work in Anthropic's "75% cheaper on average" claim — the company is explicit that the estimate factors in both the tiers and the tokenizer update.

## The benchmark win that loses the invoice

Here is where it gets genuinely interesting. Artificial Analysis ran Haiku 5.5 at its max effort setting and found it burns through roughly 162,000 output tokens per Intelligence Index task — about three times what GPT-6 Luna uses on the same tasks. That is the cost of the intelligence: at max effort the model thinks harder, writes longer, and uses more tokens to get its score of 43.

The consequence is a price-per-token headline and a cost-per-task reality that point in different directions. Artificial Analysis estimates cost per task at about $0.21 for Haiku 5.5 against $0.07 for Luna, which matches Haiku 5.5's $0.10/$0.50 short-context list price exactly. The per-token prices are identical. The invoices are not. This is the same lesson Anthropic taught with Sonnet 5.5 a week earlier — the price row didn't move, the denominator did — except this time the denominator is the model's own verbosity.

None of this is hidden. The effort setting, also new to Haiku, is precisely the dial that moves you between cost and intelligence: at lower effort settings Haiku 5.5's token usage falls toward Luna's range, and at equal intelligence it needs more tokens than Luna does. The knob is honest. The marketing quote for intelligence (max effort) and the marketing quote for price (the $0.10 tier) just describe two different positions of the same dial.

## The rest of the announcement

Two smaller changes shipped alongside, and they matter for builders already on the platform. Sonnet 5.5's cache reads drop from $0.20 to $0.10 per million tokens, which Anthropic says makes the model about 20% cheaper on most agentic work — the cache-read line is where multi-turn agent costs quietly live. And paid-plan users get monthly API credits: $100 for Max 5x, $200 for Max 20x, up to $500 pooled for Team subscribers. That is a different lever entirely — subsidizing experimentation rather than cutting prices — and it suggests Anthropic would rather fund usage than race list prices to zero.

The Hacker News discussion, 466 comments deep, focused on the familiar tension: small models getting good enough to be the default, and whether the tiered price is a trap or just a reflection of how small-model workloads actually look. Both readings are true. Anthropic's own data says 90% of requests stay under the cliff. The cliff is priced for the fleet, not for you.

## For builders, the takeaway is practical: price the workload, not the token

Per-token pricing is a spec sheet. What you pay is cost per task, and that is a function of three numbers: the tier your prompts actually land in, the tokenizer's new accounting, and how many tokens the model spends to reach the answer. Haiku 5.5 is faster, smarter, and cheaper per token than anything in its class — all true, all verifiable. But the honest cost of running it is set by the effort dial and the prompt length, not by the headline.

Run the arithmetic on your own traces before switching tiers. That is the whole lesson.

The price went down 90%. Read the footnote anyway.

Source: [Anthropic has released Claude Haiku 5.5](https://artificialanalysis.ai/articles/claude-haiku-5-5)
