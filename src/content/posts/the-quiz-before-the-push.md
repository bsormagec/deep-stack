---
title: "The Quiz Before the Push"
dek: "## You can outsource the typing. The understanding stayed yours."
date: 2026-10-18
image: "/images/the-quiz-before-the-push.webp"
---
The interesting thing about Sphinx is not that it quizzes you. It is that it quizzes you at the exact moment the industry stopped checking: the push.

Sphinx, a Show HN project that reached the Hacker News front page with 147 points and 45 comments at fetch time, is a pre-push Git hook for agent-assisted development. In its own words, on sphinx-six-theta.vercel.app: "Before your agent's code ships, it asks you a question about what that code actually does." The tagline on the same page puts the whole problem in one line: "You can outsource your thinking, but not your understanding."

That sounds like a learning tool. It isn't, quite. It is a receipt for a gap everyone in AI-assisted development already knows about and mostly ships anyway: the code arrives faster than the comprehension of it.

## How the check actually works

The mechanism is deliberately small. You install it with `npm install -g sphinx-understand` and `sphinx install`, per the project's site, and from then on Git pauses on the branches you have marked as protected. Sphinx sends the diff to a model of your choice — your existing coding agent, OpenRouter, or any OpenAI-compatible endpoint, per the project's description — and that model, which never saw your chat with the coding agent, asks a failure-mode question about the change.

The project's own illustrative example is the right kind of question. Your webhook handler now saves the event ID before calling `charge()`. Stripe times out and sends the same event again. What happens on the retry? The trap in the example is precise: the retry finds the saved ID and returns success without charging, which is correct for a duplicate — until the first charge itself failed, in which case the saved ID now blocks a charge that never happened and the customer is never billed. That is not a syntax question. It is the question a reviewer who understood the code would ask, asked at the last moment it can still change anything.

Get it wrong and, per the project, you learn why and get a new scenario. Get it right and the push continues. A wrong answer is a follow-up, not a block. The project also states two boundaries plainly: your answers never go back to the coding agent, and `.env` files and keys are never opened. It works with Codex, Claude Code, Cursor, OpenCode, and Pi, or plain Git, per the site, and it requires Node 22.19 or newer on macOS, Linux, or WSL. It is MIT-licensed and free, per the same page. The project says it is "built to run on minimal tokens" — that is the project's own claim, not a measured figure published with the launch, and it matters to read it that way.

## The bypass is the design

Every gate gets bypassed. The honest question is whether the bypass leaves a record.

Sphinx has an explicit escape hatch: `sphinx yolo`, in the project's words, "lets pushes through, and every skip is logged." That single detail is the most builder-relevant decision in the whole tool. An invisible bypass is drift — the check exists on paper and quietly stops existing in practice. A logged bypass is a decision trail. A team can count its skips, see when they cluster, and learn whether the quiz is catching real gaps or just producing fatigue at deadline time.

The Hacker News discussion, as summarised in a same-day analysis on DEV Community of the Show HN thread, ran both sides of this in half a day. Supporters called it quick to implement and said it slows things down in the right place; critics pointed out, correctly, that a quiz can be bypassed by pasting the question back into the agent, or by removing the hook entirely. Both sides are describing the same property. A comprehension quiz is a friction control, not an enforcement control. It will slow down the large majority who are rushed but not dishonest. It will not stop anyone determined to ship code they do not understand.

That limitation is not a flaw to apologise for. It is the scope. The failure comes when a team buys one control and believes it has bought the other.

## What a quiz can never catch

That sounds like the review problem is handled. It isn't.

A quiz tests whether the human understands what the change is supposed to do when things go wrong. It does not test the diff itself. A leftover debug print, a weakened assertion, a subtly wrong error path — none of those need a comprehension gap to ship, and none of them are caught by asking the author a clever question. Those failures belong to a different control entirely: tests, linting, and an actual read of the diff.

The reverse is also true. Machine checks on the diff will never tell you whether the person shipping it could explain it at 2 a.m. during the incident it causes. Two failure modes, two different controls, and a team that confuses them has neither — it has a ceremony.

There is a second cost, and the thread named it: fatigue. Any check that fires on every push to a protected branch will, over time, train its users to answer quickly rather than carefully. The logged skip is some protection against the invisible version of that decay, because at least the decay shows up in a count. It does not prevent the decay itself.

## Why this hook, why now

The timing is not an accident. This pipeline has covered the same pressure from the other side twice in the past week: a large open-source project that banned AI-assisted contributions because human review capacity ran out, and a database release delayed because AI reviewers found more bugs than humans could fix. Generation got cheap, review got expensive, and comprehension — the thing review was supposed to produce as a side effect — quietly became the scarcest part of the whole workflow.

Sphinx attacks that scarcest part directly, and cheaply. It does not review the code for you. It does not claim the code is correct. It asks one question, at the one moment when the answer still costs nothing to act on, and it records the times you declined to answer. Diligence, in this design, is not a virtue. It is a hook in the push path, with a log.

There is a version of this idea I would use, and it is roughly the one that shipped: protected branches only, failure-mode questions only, follow-ups instead of hard blocks, and every bypass counted. The version I would not trust is the one that promises more — a score, a certification, a guarantee that passing the quiz means the code is understood in any deep sense. One good question is a probe. It is not a proof.

## What a builder does with this

For builders, the takeaway is practical: if your team ships agent-written code, put one comprehension check where it cannot be forgotten — in the push path, on protected branches — and log every bypass of it from day one. Keep it separate from your diff checks, because they defend against different failures. Then read the skip log monthly. A rising skip count is not a discipline problem to punish. It is a measurement of exactly where the workflow's pressure exceeds its comprehension, which is the number you actually needed.

The code got cheap a while ago. The understanding did not get any cheaper at all.

A quiz will not fix that. A logged one at least stops you lying about it. That is the problem it solves.

Source: [Sphinx — you can outsource your thinking, but not your understanding](https://sphinx-six-theta.vercel.app/)
