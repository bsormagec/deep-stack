---
title: "Your Agent Doesn't Need a Brain Upgrade. It Needs Better Instructions."
dek: "Warp built a self-improving code review loop with two small files and a human in the middle. The pattern is boring. That's why it actually ships."
date: 2026-08-29
image: "/images/your-agent-doesnt-need-a-brain-upgrade.webp"
---
I have watched the same story play out four times in the last six months. A team builds a code review agent, the demo looks great, then they roll it out and engineers ask them to turn it off. The comments are not wrong exactly, they are just noisy. Confident, slightly off, and draining to read. An 80% good review bot is worse than no bot at all.

Warp hit that wall with their own review agent. They wrote about it this week in a piece on how they build self-improving agents on top of Claude. What struck me was not the scale — 800k developers, 40 million conversations — but how boring their fix is. No fine-tuning, no vector memory, no recursive self-reflection loop. Two small markdown files and a human in the middle.

## The 80% trap

Most agent advice tells you to get to 80% with a good prompt and then iterate. That is where the pain starts. An agent that gets eight out of ten comments right still creates two pieces of junk you have to triage. Multiply that across every pull request and you have not saved time. You have created a new inbox.

Warp learned this the hard way. They tried the obvious fix first: have a senior engineer rewrite the prompt whenever they saw a bad comment. That works for a week. Then the codebase shifts, a new pattern appears, and the prompt is stale again. Writing rules like "always use camelCase for globals" makes the prompt longer, more brittle, and harder to reason about. You are not teaching the agent. You are patching it.

Adding more context files did not fix it either. AGENTS.md helps, but it is static. It tells the agent how the repo works today. It does not learn from what humans actually complained about yesterday.

## The two-file loop

Warp's pattern is simple enough to copy in an afternoon. They split the skill into two plain files.

The inner skill is the worker. It holds the domain knowledge for one job — how to review code, or how to triage an issue. When a pull request opens, the agent runs with that file in context and produces its output. Nothing fancy.

Human feedback is the bridge. A thumbs up is okay, but a sentence like "you flagged the variable rename but our convention keeps this type of global as-is" is gold. The key detail: feedback is left where work already happens, as a comment on the PR or issue. Warp made that automatic so people do not have to go somewhere else to teach the agent. Low friction keeps the signal flowing.

The outer skill is the improver. It does not run on every task. It runs on a schedule. It pulls all the recent feedback, compares what the agent said with how humans responded, and proposes the smallest edit that captures the lesson. That edit is a pull request against the inner skill file. A human reviews it, merges it, and the next run inherits the fix.

Because skills are just files, the agent is surprisingly good at editing them. And because the edit goes through normal code review, you keep a person in control of what actually changes. That matters more than it sounds.

## Why files beat memory

Everyone is building agent memory right now. Most of it is automatic: the agent writes notes to itself after each turn, endlessly. Warp draws a sharp line and I think they are right.

Memory is what the agent writes by itself at runtime. It never stops changing and you cannot easily audit it. A skill is procedural and stable. It says how to do X, it changes deliberately, and you version it like code. That distinction saves you when feedback is wrong.

Feedback will be wrong sometimes. Someone will tell the agent to do something that contradicts the team's actual preference. If you let the agent accept that blindly, you get prompt rot from the other direction. Warp tells the improver to sanity-check feedback, filter whose input counts, and keep a human in the final review. It is not autonomous self-improvement. It is human judgment turned into a small, reviewable diff.

There is another reason files work. They force you to write principles, not rules. One of Warp's tips that stuck with me: instruct the agent like you would a smart junior, not like you are programming a linter. "Look for repeated code" generalizes. An exhaustive list of naming rules does not. The why matters more than the what because it lets the model reason when the situation is new.

## A concrete example

Their issue triage demo makes this tangible. The triage agent reads a new GitHub issue, assigns labels, and suggests how to fix it. On one issue it missed the "ready to spec" label. A maintainer left a comment explaining that the issue described a real problem even though the UI was not defined yet, so it was ready for a spec.

Later that day the improver ran inside Warp's orchestration platform Oz. It pulled recent issues with feedback via a small Python script bundled with the skill — another nice detail, the skill references code instead of rewriting it each time — summarized the signals, and opened a PR that added one line to the triage skill: apply "ready to spec" when the problem is clear even if the exact shape is not.

That is the whole loop. No drama. One human comment, one small edit, review, merge. Run it a few hundred times and the agent gets steadily less annoying. Warp now does this for their spec writer, their reviewer, and their triage bot, each with its own loop but sharing the same improver template.

## How to steal this on your team

You do not need Oz or Warp's platform to use this. I would start even smaller.

- Pick one agent that annoys people. Not your fanciest one, the one that produces mediocre output everyone tolerates. That is where this pays off fastest.
- Write the inner skill as a short markdown file. Keep it under a page. State principles and why they exist. Link out to detailed docs instead of pasting them.
- Make feedback effortless. Let people comment "this was not useful because..." right on the PR. Capture it automatically.
- Build a dumb improver first. A scheduled job that pulls the last week of feedback, clusters it, and proposes a single focused edit. Keep a human reviewer as the gate.
- Treat skill edits like code. Version them, review them, roll them back if needed. If you cannot diff it, you cannot trust it.

The temptation is to let the agent self-improve in the background while you sleep. Warp's insight is the opposite. The improvement is not autonomous, it is just compounded human preference. The agent does not get smarter on its own. It gets better instructions.

I keep thinking about that because it cuts against most of the agent hype. We talk about recursive self-improvement and emergent capabilities, but the teams actually shipping usable agents are doing something much less exciting. They are turning transient corrections into durable files, one small PR at a time. It is slow, it is manual at the edges, and it works. Maybe that is the real pattern to copy.

---

Source: [Warp's announcement on Claude's blog](https://claude.com/blog/how-warp-builds-self-improving-agents-on-claude) · Demo: [warp-agents-demo-github-issue-triage](https://github.com/warpdotdev/warp-agents-demo-github-issue-triage) · HN discussion: [news.ycombinator.com/item?id=49492432](https://news.ycombinator.com/item?id=49492432)
