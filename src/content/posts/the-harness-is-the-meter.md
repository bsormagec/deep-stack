---
title: "The Harness Is the Meter"
dek: "A longtime Claude Code user just quit the harness, not the model. The interesting part is what he was actually paying for."
date: 2026-11-08
image: "/images/the-harness-is-the-meter.webp"
---

The interesting thing about a user leaving Claude Code is not that he stopped liking the model. It is that he never complained about the model at all. His complaint is the harness wrapped around it — the tool descriptions, the release churn, the features he never asked for — and the harness, it turns out, is a meter of its own.

The post is by Caleb, a developer who has used Claude Code since it arrived in the Claude Pro plan more than a year ago. On September 21 he wrote that he was retiring it as his main coding harness and moving his setup to Pi, the open-source agent harness at pi.dev. The post itself is seven weeks old. The news is that Hacker News picked it up today and pushed it to 627 points and 403 comments, because the frustrations in it have only gotten more familiar since he wrote it.

Start with the number that matters. The default Bash tool in Claude Code carries a description of almost 3,000 tokens. Most of it is instructions about using git and opening pull requests on GitHub — things the models already know how to do. That description is attached to every single call that touches the tool. It is not a one-time cost. It is a tax levied before any work happens, on every Bash invocation, in every session, for every user. Anthropic has cut 80% of the system prompt, by the author's own account, and the overhead is still there. The harness bills you for describing the hammer before you are allowed to swing it.

Then there is the churn. There have been 244 releases of Claude Code this year, and over three quarters of them changed the system prompt or the tool descriptions. Every one of those changes can alter how the model performs, sometimes in ways that contradict a user's own prompts or a repository's conventions. A coding harness is supposed to be the stable floor under the model. When the floor moves three times a week, the model you evaluated last month is not quite the model you are running today — and the difference is not a capability upgrade you chose. It is a prompt edit you never saw.

## The features are the bill

The new features tell the same story from the other side. Dynamic workflows, agent teams, ultrareviews — the author reads them plainly, as ways for enterprise customers to burn ever more tokens each day. That sounds uncharitable. It isn't. A feature that spins up more agents, more reviews, and more parallel work is a feature that multiplies the token count of every task it touches, and the vendor charging per token is the one deciding which features ship. The user who wants a stable, minimal harness gets the enterprise roadmap instead, because the enterprise roadmap is where the tokens are.

The small frustrations pile up in the same direction. The official VSCode GUI extension breaks half its built-in slash commands and has no custom status-line support — the same status line whose token cost this blog covered in October, when background agents were found billing users for their own three-word summaries. Subagent output gets layered into the main chat thread in chronological order, unreadable once more than one agent is running. And the plain VSCode integration only lets one session connect to the IDE at a time: open a second tab to start another task while the first one works, and it cannot receive text selection events at all. That bug has been reported since at least December 2025, and was closed as a duplicate of a totally unrelated bug.

None of this is a story about a bad model. The author is explicit that Claude Code is a genuinely impressive piece of software and that building the first harness in a new space is hard. His point is narrower and more damaging: the product has no one whose job is to say no. Features accumulate, prompts drift, and the user absorbs the cost in tokens, in broken setups, and in re-learning a tool that changed underneath him.

## The escape hatch is open source

That is why Pi is the interesting half of the post, not the quitting half. Pi is an open-source harness, and the author praises exactly the qualities Claude Code has been shedding: stability, minimalism, and extreme customizability. He has already written extensions for it. The model underneath can stay the same — the escape hatch is not a different brain, it is a thinner wrapper around the brain you already rent. The same model, minus the rented overhead.

This is the third Claude Code story in a week to land on the same nerve. On Thursday the email leak showed the agent handing your address to every site it visited. The week before, the status-line summaries showed it billing you for its own bookkeeping. Now the harness itself turns out to be a line item: a 3,000-token description on every tool call, a prompt that changes with most releases, and a feature roadmap pointed at burning more tokens per task. Three different symptoms, one diagnosis. The thing between you and the model has its own costs, and nobody itemizes them.

The Hacker News discussion, at 403 comments and counting, mostly agrees with the diagnosis while arguing about the cure. Some commenters defend the churn as the price of a fast-moving tool; others report the same VSCode frustrations and the same surprise at how much of their bill is harness overhead rather than work. A few note that Pi's minimalism is a choice with its own price — fewer guardrails, more setup, and the maintenance burden moves from Anthropic's release train to your own config files. That last point is fair, and it is the real trade. A rented harness charges you in tokens and surprises. An open one charges you in time and attention. The difference is that the second bill is one you can read.

For builders, the takeaway is practical: measure the harness, not just the model. If you are comparing coding agents, the benchmark that matters is not only which model writes better code. It is how many tokens the harness spends before the model writes anything, how often its prompts change without your consent, and whether its roadmap is pointed at your workflow or at your wallet. A 3,000-token tool description is a small number on a pricing page. Multiplied across every Bash call in every session, it is a second subscription hiding inside the first.

Caleb's move will not be everyone's move. But the question he is asking is the right one, and it generalizes past any single tool: when the wrapper around the model starts costing more than the model, who is the product for?

Source: [Goodbye Claude, Hello Pi](https://caleb.software/posts/claude-to-pi.html)
