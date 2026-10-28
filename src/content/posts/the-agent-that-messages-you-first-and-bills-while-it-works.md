---
title: "The Agent That Messages You First — and Bills While It Works"
dek: "Anthropic's Claude Duet turns the chatbot around: it comes to you, works in the background, and asks before it acts. The interesting part is not the initiative. It is the meter and the trust boundary behind it."
date: 2026-10-28
image: "/images/the-agent-that-messages-you-first-and-bills-while-it-works.webp"
---
The interesting thing about Claude Duet is not that it messages you first. It is that it keeps working — and billing — after you stop paying attention.

Anthropic opened the research preview on October 21, 2026, and a week later the announcement sits on Hacker News with 513 points and 474 comments. That traction is the news here, not a launch-day scoop: Duet is waitlist-only, US-only, and limited to Claude Pro and Max subscribers. Team and Enterprise plans are not included yet, according to Anthropic's own product page. But the shape of the thing is now public, and the shape is what matters, because every frontier lab is converging on the same shape at the same time. OpenAI has its always-on Dots agents; Meta's Muse agent has drawn millions of downloads. Duet is Anthropic's answer, and it is deliberately work-first.

## What Duet actually does

The pitch, in Anthropic's words, is an agent that "comes to you with what needs your attention, completes tasks you ask of it, keeps working when you step away, and checks with you before it acts on your behalf." In practice that breaks into three pieces.

First, the morning brief. Each morning Duet looks across your connected apps and tells you what most needs your attention, with draft replies ready for approval. Second, background monitoring: during the day it checks those apps every few hours — not continuously, Anthropic stresses — and messages you only when something needs a decision. Third, delegated work: scheduling meetings, building dashboards, financial forecasts, decks, prototypes, and small web apps, handed over in one ongoing thread by text or voice.

The plumbing matters. Duet runs on Claude Opus 5.5 inside its own cloud virtual machine with its own browser, so a task keeps progressing after you close your laptop. It carries over the memory, skills, and connectors from your Claude account, and it reaches into work through more than 6,000 connectors and plugins in the Claude Marketplace, per Anthropic's announcement coverage — Gmail, Slack, Google Calendar and Drive, QuickBooks, Stripe, Shopify, HubSpot, Gusto, DocuSign, Notion, and the rest. Anthropic's own examples of the jobs it hands to those connections are concrete: finding missed Slack and Gmail messages and drafting replies, checking QuickBooks or Stripe for unpaid invoices and drafting reminders, preparing payroll in Gusto for review, getting contracts ready to send.

That sounds like a personal assistant. It isn't. Anthropic concedes Duet is weaker at personal errands like booking tickets, because it is built around work. The distinction is a product decision, not a temporary gap: Duet is aimed, in Anthropic's phrasing, at "professionals and small business owners with more on their plates than they can track."

## The meter runs in the background too

Here is the part that should change how builders think about Duet, and about this whole category. During the research preview, Duet is included in Pro and Max plans at no extra cost — but it shares those plans' usage limits, and its background checks count toward them. Anthropic says so plainly on its product page: background checks count toward the limits, and larger tasks like building a financial model or a deck require more model turns and background work.

Read that twice. The agent that works while you sleep also consumes while you sleep. The checks are spaced every few hours rather than continuous, and coverage of the announcement notes Anthropic's reasoning: nonstop checking would burn through plan limits much faster. That spacing is not a technical limitation dressed up as design. It is the meter made visible. Every background sweep is a small draw against a finite allowance, and the allowance is shared with everything else you do in Claude.

For builders, the takeaway is practical: price an always-on agent by its background burn, not its sticker price. There is no separate Duet price to evaluate yet — Anthropic has not said what it will charge once the preview ends, and the plans it rides on are Pro at $20 a month and Max from $100 a month, per announcement coverage. What you can evaluate today is the shape of the bill: a flat subscription that quietly becomes metered the moment the agent starts polling on its own. A morning brief plus a few hourly sweeps plus one deck build is a different day's spend than a day of chatting, and the user never sees a per-sweep price. If you build on top of this pattern — and many of you will, because customers will ask for it — budget the polling loop first. The per-check cost is the product cost.

## The trust boundary is now a classifier

The second thing worth studying is the approval model, because it is the real product. Duet drafts and prepares work on its own, but it shows the exact action and waits for approval before it sends a message, makes a payment, signs a document, or deletes anything. It can spend money through Stripe's Link wallet or Shopify's Shop Pay, paying with a virtual card rather than exposing a real card number, per announcement coverage. And some actions are off-limits even with approval: trading securities, moving money between accounts, and sharing credit card numbers or government IDs are refused outright.

That sounds like safety. It is, but only in the narrow sense. The approval screen is a classifier in disguise: every background observation must be sorted into "act quietly," "draft and wait," or "ask first," and every approval the user grants trains the boundary further. Anthropic is unusually candid about the failure mode: Duet "might misread a thread or miscalibrate what's urgent," and it can miss something that arrives between check-ins. A miscalibrated urgency classifier does not produce a dramatic failure. It produces a quiet one — the invoice reminder that went out too fast, the thread marked unimportant that wasn't, the payroll draft that looked right.

The Hacker News discussion focused, tellingly, less on the demo and more on this boundary: what it means to hand one agent read access to email, calendar, billing, and payroll at once, and whether an approval click still counts as human judgment when the agent chose the moment, the framing, and the default. The commenters are right that this is the question. An agent with 6,000 connectors is not six thousand tools. It is one trust decision, repeated across every account you connect, with the same classifier making the call each time.

There is one more gap worth naming. Duet cannot yet show you its browser while it works, per Anthropic's own caveats in announcement coverage. You get the finished doc, sheet, or deck for review — not the working session. For a tool that asks you to approve its actions, that is a strange asymmetry: approval without observation. It may be a preview limitation. It is also the limitation that matters most for the highest-stakes actions, because the actions you most want to watch are the ones Duet performs while you are away.

## The catch, stated plainly

Duet is a research preview, and the fine print earns that label. Waitlist only. US only. Pro and Max only. No Team or Enterprise. No Mac app yet in the coverage. No price after the preview. An urgency classifier that its own maker says can misjudge. A browser you cannot watch. None of this is a reason to ignore Duet. It is a reason to treat it like a new hire on probation: give it one connected account, one small job, check its work, and widen its access only after it earns it.

That is the problem with the always-on agent race in general, and Duet states it more honestly than most. The demo is the agent messaging you first. The product is the meter running in the background and the classifier deciding what needs your approval. Both of those work while you sleep. Only one of them asks first.

Source: [Claude Duet | A proactive AI agent to assist you](https://claude.com/product/claude-duet)
