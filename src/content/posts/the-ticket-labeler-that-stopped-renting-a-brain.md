---
title: "The Ticket Labeler That Stopped Renting a Brain"
dek: "Amazon swapped Claude Sonnet 4.6 for a decision model that answers in a single token. The bill fell 98 percent, and the interesting part is not the discount."
date: 2026-11-10
image: "/images/the-ticket-labeler-that-stopped-renting-a-brain.webp"
---

The interesting thing about Amazon's ticket-labeling swap is not that a cheaper model won. It is that the job never needed a model that could talk in the first place. For months, one of the world's largest internal ticketing systems sent every ticket — customer escalations, capacity requests, automated alarms, security findings — to Claude Sonnet 4.6 with a long system prompt, and got back JSON plus reasoning, so the ticket could be filed under one of twenty category labels. A frontier model, doing filing. Two Amazon engineers, Carr and Mehul, wrote up what happened when they replaced it with Strands Decider, a decision model Amazon's Strands team launched about a month ago. The replacement performed just as well, according to their own tests, at 98 percent less cost. They expect it to save millions of dollars of token costs a year.

That sounds like a price cut. It isn't. It is a job description finally being read correctly.

## A model that cannot generate text

A decision model is not a smaller LLM. It is a different kind of machine. Give it some state and a question with a set of options, and it returns a probability for each option plus a confidence score. It cannot generate text. That limitation is the whole point: ticket labeling is a closed choice from a known catalog, and the state is the ticket, the options are the label catalog. Nothing in that job requires a paragraph.

The engineers started with the original Strands Decider 2B build. On a test set of tickets, the E4B build — based on Gemma 4 — got clearly better results, so they switched to it, then tuned how confident the model needed to be before applying a label. On a separate set, they report, E4B beat production Sonnet. The model runs on SageMaker `ml.g5.xlarge` instances — one A10G GPU with 24 GB each — using about 19 GiB of memory, with one request taking about 640 milliseconds. The endpoint autoscales with traffic, and its network is isolated, so nothing can reach out from the container.

The numbers, all from the Strands post, are the kind that make a finance team sit up. Average time per call fell 78 percent, from 4,215 ms to 897. Input tokens per ticket fell from 6,554 to 2,009. Output tokens fell from 170 to one. Total tokens per ticket fell from 6,724 to 2,010, a 70 percent reduction. The token drop had two sources: the decision model produces one output — the choice — instead of a JSON answer, and its prompt is much shorter than Sonnet's. The production label descriptions alone were longer than the decision model's 4,096-token window, so the team rewrote each of the twenty labels as a one- or two-sentence criterion and sent them as the options of a single choice question, plus a "none" option.

## The bill, per ticket

At published us-east-1 on-demand prices, Sonnet 4.6 on Bedrock's global endpoint costs $3.00 per million input tokens and $15.00 per million output tokens. The SageMaker instance costs $1.408 per instance-hour. Per ticket, that works out to $0.0222 for Sonnet and about $0.0005 for the decision model. Per million tickets, about $22,200 against about $500. At full utilization one instance handles about 5,600 tickets an hour, which would be $250 per million tickets; the engineers keep headroom for bursts, so in practice it comes to about $500 per million. That is about 44 times cheaper than Sonnet — a 98 percent reduction. These are published list prices, and they leave out the Lambda function, which also runs for less time per ticket now: on the day they turned off Sonnet, average Lambda execution duration dropped 74 percent.

For builders, the takeaway is practical: the savings did not come from a cheaper frontier model. They came from refusing to pay for generation where only a decision was needed. Every token Sonnet spent reasoning about a label was a token the job never asked for. The decision model bills for the choice and nothing else.

## The switch that made it safe to try

The part worth copying has nothing to do with the model. The team did not flip a switch and hope. The labeling Lambda reads a three-way setting from AWS AppConfig on every message: BEDROCK, where Sonnet labels every ticket and the decision model is not called; DUAL, where both models are called in parallel, Sonnet's results are applied, and the decision model's results are compared; and DECIDER, where the decision model labels everything and Bedrock is not called. Running both on real traffic, then judging every disagreement, told them more than any offline evaluation would have. It also meant going back was a 45-second config change.

That is the discipline the rest of the industry keeps skipping. Most teams swap a model on a benchmark and discover the regression in production. Amazon ran the old and new models side by side on live tickets and let the disagreements arbitrate. The rollback was a config value, not a deploy.

## The catch, and the counterpoint

The engineers are honest about where this stops working. A decision model probably cannot replace the LLM's job if your labels need explanation text, if the catalog changes weekly, or if you cannot fit the useful context into a few thousand tokens. Long tickets already force a compromise: the decision model drops the oldest comments to fit its window. And one detail in the post should make anyone serving a decision model behind an API pause. JSON key order changed the answer. Sending the same content with keys in a different order moved the output probabilities by up to 0.19. The team now sends every request with sorted keys. A model that returns probabilities is a model whose output depends on serialization details your API probably does not pin down.

The Hacker News discussion, where the post reached number two with 387 points and 134 comments at the time of writing, supplied the obvious counterpoint. Several commenters asked why the team did not simply switch to Haiku 5.5, Anthropic's cheapest model, which would have been a one-line change with no GPU instances to run. It is a fair question, and it sharpens the real claim: the win here is not "cheaper than Sonnet" — any smaller model would be that. The win is that a task with a fixed set of answers does not need a generative model at all, and a purpose-built decision model undercuts even the cheap generalist by an order of magnitude on the per-ticket bill. But the counterpoint also sets the bar for the next claim like this one. If the comparison is against the frontier model rather than the cheapest adequate one, the 98 percent figure flatters the method.

There is a longer arc here too, and the oldest commenters on the thread spotted it. About six years ago, the same team built a ticket classification pipeline on SVMs — a couple of minutes to train, a few milliseconds to classify. The field moved to LLMs, and now, for this job, it has moved back to a classifier. The wheel turned, but it came back with better brakes.

That arc is the one Deep Stack has been tracking all autumn. Jev-style decision models keep showing up where the bill is biggest: a small model triaging first and escalating only the uncertain cases, a team of small open models beating a rented frontier model by orchestrating instead of scaling, a local decision model answering in ten milliseconds where the hosted API took ten times longer. Amazon's ticket system is the same pattern at a scale nobody else can match — one of the largest internal ticketing systems in the world, labeled by a model that fits on a single 24 GB GPU and answers in one token.

The caveats belong in the open. This is Amazon's own account of its own system, on published list prices, with no independent verification and no public test set. "Millions saved" is a projection, not a measured year. The decision model's per-ticket cost depends on how busy each instance is. And the quality claim — E4B beating production Sonnet — rests on the team's own ticket sets. None of that makes the story less interesting. It makes it a claim to watch, not a verdict to quote.

What it does settle is narrower, and more useful. The most expensive token in your system is very likely the one you never needed to generate. Find the jobs in your pipeline that are actually choices — a label, a route, a yes or no — and ask whether the model doing them needs to be able to write at all. The answer might be a model that cannot talk back.

Source: [Amazon saves millions by replacing Sonnet 4.6 with Strands Decider](https://strandsagents.com/blog/amazon-saves-millions-replacing-sonnet-with-strands-decider/)
