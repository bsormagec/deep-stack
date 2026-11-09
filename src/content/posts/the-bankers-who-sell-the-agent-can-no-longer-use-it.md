---
title: "The Bankers Who Sell the Agent Can No Longer Use It"
dek: "In July, Goldman's CIO praised traders for vibe-coding their own tools. In October, internal guidance restricted Claude Code and GitHub to engineers only — weeks before Goldman takes Anthropic public."
date: 2026-11-09
image: "/images/the-bankers-who-sell-the-agent-can-no-longer-use-it.webp"
---

The interesting thing about Goldman Sachs pulling Claude Code from its bankers and traders is not that a bank restricted a tool. Banks restrict tools the way winter restricts daylight: routinely, and without asking anyone's opinion. The interesting thing is the direction of the reversal. Four months ago, the bank's chief information officer was publicly praising the tools its non-technical employees had built with AI. Now those same employees are told the tools belong to engineering. The people who found the uses lost the access. The people who market the company that makes the tool kept their jobs selling it.

Goldman updated its internal guidance in October, according to Bloomberg reporting relayed by State of AI on November 2. Claude Code and GitHub are now restricted to the bank's engineers. The strats — the people who sit across trading, quantitative research, and software engineering — keep access. Everyone else in trading and banking does not. The bank has about 47,000 employees, and about 12,000 of them are engineers. That is the first wave, and the October guidance limits the coding agents to that group.

## What the traders were actually doing

The restriction stung because the traders were not playing with the tool. According to a person familiar with the matter, they had been using it to monitor client trading flows, model market moves and positions, and put together written and graphic material. That is real work, the kind that sits close to the money, and it is exactly the kind of work a coding agent is good at: glue code, data plumbing, a chart that did not exist yesterday.

In July, CIO Marco Argenti told Bloomberg that traders and bankers had built tools with AI and passed them to the firm's engineers to be improved. That arrangement had an obvious logic. The people closest to a problem build a first version without waiting for engineering time. It also had an obvious hazard, and the hazard is the whole story: thousands of employees without engineering training were running software that writes and executes code, on the same machines they use to handle client information. The first version never stayed a first version. It went into daily use.

A spokesperson, Nick Carcaterra, said the bank makes certain AI tools available to staff "to determine the best use cases" across the firm. That sentence reads differently now than it did in July. The best use cases were found. Then the access was withdrawn.

## The risk is real, and it is not the one in the headline

A coding agent reads files, writes programs, and runs them, typically with the same access as the person using it. Code an engineer writes with it usually goes through review, testing, and deployment controls before it reaches anything important. A script a trader builds to watch client flows can end up in daily use without going through any of those. That asymmetry is the honest case for the restriction, and the Hacker News discussion — 874 points and a thread still active on November 9 — mostly landed there. One commenter put it plainly: a trading floor is a bad place for unreviewed code written by people who can't read it.

Banks are also required to keep information barriers between groups — between bankers working on deals and traders who could profit from knowing about them. Goldman built its internal AI platform around controls like these. A tool a trader puts together with an agent was not designed with them in mind, and engineers can only check it if someone sends it their way. The combination one commenter called the "lethal trifecta" — private data, email, and internet access on one machine — is not a hypothetical. It is the default configuration of a trader's laptop running an agent.

There is also the question of whether anyone understands the code. Last month a Meta engineer said he now ships code he can't fully account for, and writing software is his job. A trader using an agent to model positions is less likely to know how that code handles unusual cases. On a trading desk, unusual cases are where the losses live.

None of this is a reason to ban the tool. It is a reason to decide, before handing it out, who owns the code an agent writes. Goldman did it backwards: distribute first, decide later. The restriction is the decision arriving late, and it arrives as a taking-away rather than a plan.

## The cost line, and the IPO line

Cost may also have played a part. Agent usage is billed by the token, and several companies that gave agents to everyone have seen spending climb. Amazon shut down an internal leaderboard after employees ran agents on pointless tasks to move up it. Accenture now funds $29 a month of Claude per employee. Bloomberg's sources said productivity was part of Goldman's review. When a tool bills by the token and nobody owns the output, the meter runs on curiosity as happily as on work.

Then there is the irony that writes itself. Goldman and Morgan Stanley are the lead underwriters on Anthropic's IPO, according to the S-1 filed on October 26. Anthropic is expected to list on Nasdaq under the ticker ANT before the end of November. Over the next few weeks, Goldman's bankers will be marketing shares in a company whose coding agent most of them are no longer allowed to use. Underwriters are not required to use the product. But it hands every skeptic a one-line summary of the whole affair.

The bank is still working closely with Anthropic. Earlier this year, Goldman said Anthropic engineers had spent six months at the bank helping build Claude-based agents for trade accounting and client onboarding. Those agents sit in the back office and are run by Goldman's engineering teams.

This is not a Goldman-only story. In April, Goldman removed Claude from its internal AI platform for bankers in Hong Kong, reading its contract with Anthropic strictly; ChatGPT and Gemini remained available there, and JPMorgan removed Claude from its Hong Kong approved list in June. That restriction was based on location and contract terms. The new one is based on role. JPMorgan and Schwab are blocking outside agents from customer accounts. Barclays, meanwhile, said in October that it expects half its developers to be using Claude Code by the end of the year — and three weeks later named developers among 5,000 job cuts. Like Goldman, it is giving coding agents to engineers. Unlike Goldman, it is also using them to reduce how many engineers it employs.

## The question every company should answer first

The Hacker News thread split, usefully, between two camps. One camp says the answer is to go all-in on agentic engineering: build the harness, the rails, the deterministic checks, and let anyone build safely inside it. The other says a trading floor is no place for unreviewed agent code at all. Both camps are arguing about the wrong thing. The question is not whether non-engineers should be allowed to use coding agents. It is who takes responsibility for what the agent produces, before it touches production data.

Goldman's own in-house AI assistant, which uses models from several companies, is still available across the firm. The restriction applies to third-party agents that can write and run code by themselves. That distinction is the tell. A chat window that answers questions is a tool. An agent that reads files, writes programs, and executes them is a colleague with no manager. Companies keep discovering this in the same order: first the enthusiasm, then the bill, then the guideline update.

For builders, the takeaway is practical: if you ship an agent into a company, the first feature is not the model. It is the ownership rule. A named engineer takes responsibility for agent-built code before it touches anything that matters. Information barriers, data entitlements, and software approval rules still apply when the code came from a prompt. And when a tool is taken away, it is worth recording what people were using it for. Goldman's traders were watching client flows and modeling positions, and they will still need to do both.

That is the problem.

Source: [Goldman Sachs Is Pulling Claude Code From Its Bankers and Traders](https://www.thestateofai.com/news/goldman-sachs-claude-code-traders-bankers)
