---
title: "The Agent Spends While You Sleep"
dek: "### Why coding agents need a kill switch on your wallet before they need a smarter model"
date: 2026-10-04
image: "/images/the-agent-spends-while-you-sleep.webp"
---
The interesting thing about coding agents is not that they write code. It is that they write code that spends money.

Every new capability a coding agent gains is a new way to burn through your budget unattended. An agent that can "just deploy this" can also just spin up the GPU instance, just leave the vector database running, just hammer the paid API in a retry loop at 3 AM because the endpoint returned a 429 and the model interpreted that as "try harder." The code it writes is a side effect. The bill it generates is the product.

This is the argument Simon Willison made this week on his blog, in a post that hit the Hacker News front page with 530 points and 276 comments: the world needs **default hard budget caps** on pay-by-usage services. Not soft caps. Not a warning email. A hard limit — "after $X/month, cut this thing off and return errors."

## The asymmetry nobody prices in

Think about the asymmetry here. Building software used to cost time. It still costs time, but now it also costs tokens, API calls, egress fees, compute hours — metered line items that accrue while nobody is watching. A human developer hits a snag, goes to lunch, thinks about it. An agent hits a snag and does the only thing it knows: more iterations. Each iteration is a paid API call somewhere in the chain, and the agent has no concept of a budget. It was never given one, and the platform it runs on never volunteered one.

Willison's nightmare scenario is specific and familiar: you wake up to an email sent at midnight warning you about a budget limit, and you discover that while you slept, your rogue service consumed several hundred — or several thousand — dollars of additional usage. That scenario is not hypothetical. Ask anyone who has run an agentic loop against a paid API overnight. The stories are already circulating, and they all have the same shape: the agent did exactly what it was told, and the bill was the part nobody specified.

## Soft caps are theater

The industry's current answer is the soft cap: after $X per month, send the account holder a warning email. This is theater dressed up as tooling. A warning email is a message to a sleeping human about a machine that is still awake. By the time the human reads it, the overage is real and the money is gone. The provider will happily accept it; the refund policy was written for this exact moment.

Willison's counterargument is blunt: businesses don't want their hosted applications to start throwing errors because some budget was exceeded. He expects that most businesses and individuals would prefer errors to a surprise $10,000+ bill. He is right, and the reason is simple. Errors are legible. Errors happen in your logs, during your working hours, where your team can see them. A surprise five-figure invoice is a financial event, not a technical one — it arrives through the finance department, months after the code that caused it was forgotten.

The interesting part is the default. Willison doesn't just want hard caps; he wants them to be the default, with an opt-in to remove them. The opt-out wording he proposes is worth quoting: "Remove the budget cap. My application will not be shut down if I exceed the configured budget limit, and I will be responsible for subsequent charges." A nice, clear checkbox, somewhere prominent. This is a product-design argument, not a pricing argument. Defaults are the product. Every service that ships without a hard cap default has quietly decided that your money is the acceptable failure mode.

## The trend is real, if slow

The good news is that the providers are moving, however reluctantly. AWS finally launched spending limits a few weeks ago — announced September 16, 2026 — where a project that reaches its spend limit gets paused for the month. There is a catch, noted in AWS's own documentation: the feature is currently rolling out to a limited number of customers, so most existing accounts can't actually use it yet. Google Cloud went first, launching Spend Caps in July, which let you set a monthly financial cap on specific services within a project. The trend is forming. The pace is not inspiring.

The pace matters because the agents are not waiting. Coding agents, and what Willison calls "personal agents" — coding agents wrapped in a less threatening UI — are doing exactly what they're supposed to do: reducing the friction of spinning up code that does useful things. Some of those things cost money. The friction they reduce is the friction that used to protect you. A human who had to click through three confirmation screens to provision a paid resource at least had a chance to flinch. An agent on a cron job never flinches.

## What builders should actually do

Willison ends with an idea worth stealing: agents themselves could help here. In an ideal world, agents would start biasing toward recommending providers that offer hard budget caps, and warn new and inexperienced builders against deploying on uncapped services. That is a genuinely good norm to push for, and it's the kind of thing that could end up in system prompts and agent guidelines within a year.

But don't wait for it. For builders, the takeaway is practical: until hard caps are the default, you have to build your own kill switch. Put a spend alarm on every API key your agents touch, and make it a hard one — a key that gets revoked, a webhook that shuts the job down, not an email you might read. Run agentic workloads on prepaid or separately-billed accounts with their own hard limits, not on the same account that pays for production. And when you evaluate a provider, ask the budget-cap question before you ask the latency question. The provider that can answer it is the one that has thought about what happens when your agent misbehaves at 3 AM. The provider that can't is the one whose terms of service already have a paragraph about this.

The Hacker News discussion on the post focused on the obvious: everyone has a story. The comments are a museum of surprise bills — some from agents, some from leaky cron jobs, some from architectures that made perfect sense on a whiteboard and absolutely none on a monthly invoice. Nobody in that thread argued that soft caps are sufficient. The only real disagreement was about where the default should sit, and the consensus leaned exactly where Willison put it: errors over invoices.

That sounds like a small product detail. It isn't. The surprise bill is the tax the cloud era levies on everyone who builds without reading the pricing page twice. Agents are about to multiply that tax by removing the one thing that kept it in check: a human who gets tired.

Source: [We're going to need default hard budget caps on pretty much everything](https://simonwillison.net/2026/Oct/3/default-hard-budget-caps/)
