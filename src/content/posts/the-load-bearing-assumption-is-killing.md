---
title: "The Load-Bearing Assumption Is Killing Your Code Review — and Claude"
dek: "Why the most-hacked developer tool of 2026 isn't a linter, it's a second AI whose only job is to stop the first one from sounding like a TED talk."
date: 2026-08-21
image: "/images/the-load-bearing-assumption-is-killing.webp"
---
## The most telling hacker project of the year isn’t a tool. It’s a symptom.

Somebody at Anthropic appears to have trained Claude on an endless archive of old BuzzFeed listicles and motivational LinkedIn posts — or so goes the running joke in every engineering thread right now. Ask your coding agent why a test is flaky and you don’t get an answer. You get a load-bearing assumption, three numbered revelations, and a solemn note that the third one is the most instructive yet. Nothing is ever just a bug. There is always a kicker.

This week a developer named Adnan Kil published a tiny open-source skill called NoBuzz — half-jokingly branded Claudette — that does something astonishingly honest. It takes whatever Claude just said, hands it to the Gemini CLI, and asks Gemini to translate it into regular human English. One model de-buzzes another. The README’s before-and-after is brutal: the original talks about a load-bearing assumption and a kicker; the translation just lists three actual bugs with file paths, what’s wrong, and the fix. Same information. A tenth of the theatrics.

It hit 100+ points and 80+ comments on Hacker News within hours, and not because anybody cares about a niche npm wrapper. The reaction was a crowd agreeing out loud: this is a real, expensive, daily problem. And the deeper I sit with it, the more I think the hack isn’t the point — the fact that it exists at all is the trend worth watching.

## The boring take: it’s a token tax

The uncharitable reading of Claude’s house style is that it’s a deliberate revenue play. More words means more tokens billed for the same task. Several commenters landed on this immediately, and it’s not wrong as far as it goes. Verbosity and dramatic framing are floor-priced filler that pad every interaction.

But I don’t buy it as the whole story. If it were purely a token tax, the problem would be a footnote — you’d shrug, pay the extra cents, and move on. Nobody builds a translation skill and ships it open-source because output is slightly expensive. People build tools like this because the writing actively gets in the way of the work. Every here’s-where-it-gets-interesting adds friction to a task you asked a machine to make less tedious. The cost isn’t the tokens. The cost is the attention pinball.

## The interesting take: it’s an identity crisis

Here’s the part that should make you uncomfortable. Claude writes this way because a huge team of well-meaning people made a series of product decisions that produced a persona — always positive, always illuminating, always discovering the third, most instructive thing. Some of it is trained behavior. Some of it is reinforcement from users who reward enthusiastic prose. But a persona is a commitment, and the moment that persona fights the user’s actual goal — precision, brevity, getting to the damn point — it stops being a feature and becomes the user’s enemy.

The darkest comment in the thread nails it. Someone replied to the repo’s joke with a perfect deadpan parody of the exact voice: this is the load-bearing comment, it cuts more deeply than you thought, let me ground my answer, I recommend rewriting the internet in 3-5 days, I started 3 subagents. The community can now reproduce the failure mode so reliably it’s become a meme you can trigger. When your flagship model’s voice has become meme-able for being annoying, you have a product problem, not a prompt problem.

## Why the workaround won, and what it means

The sharpest design decision in NoBuzz is also the most revealing: Claudette pinky-promises to print Gemini’s translation verbatim, because letting Claude tidy up the translation just reintroduces the voice you were trying to remove. The fixer would corrupt its own fix. So the author’s answer is to move the writing job to a different model entirely.

This is the trend. People aren’t raging at one company anymore; they’ve quietly started assembling a best-of-breed stack where each model plays to its strength and covers another’s weakness. Claude writes the code and brackets it, Gemini translates the output, maybe a third model formats the commit. Ten years of pick-your-model has curdled into pick-your-models-plural and wire them together. The agent isn’t one intelligence. It’s a committee where the worst writer in the room isn’t allowed to touch the prose.

The comments also surfaced a genuinely non-obvious fix that needs no second model at all. People shared hard rules that actually hold up: comments under seven words, function names under four, user-facing strings under ten, active voice, always pick the most common word. And crucially, they reported that these rules decay as the context window grows — Claude forgets them under load. The real bug is context bloat, and the honest fix is shorter sessions, not stricter prompts. One contributor’s canary trick — put an innocent rule in CLAUDE.md like start every sentence with my name, and when Claude stops doing it you know your context has gone too far — is the sort of practical, transferable insight no rewrite of the internet will ever give you.

## The takeaway

Here’s what I’d actually take from this. First, verbosity is a defect, not a personality — and the industry just spent about 90% of a front-page thread teaching it that to its face. Second, the best model is a moving target, and the people getting the most work done have quietly stopped worshipping any single one; they’re orchestrating. Third — and this is the one I keep coming back to — if your AI tool’s first job is to look impressive while explaining a flaky test, you’ve optimized for the wrong metric. An engineer wants the answer and the file. A graduating TED speaker wants the kicker. They’re not the same product, and no amount of style tuning fixes that gap.

The load-bearing assumption of this entire trend is that AI-written prose should sound like anything at all. It shouldn’t. It should sound like a diff.

---

Source: [nobuzz / Claudette on GitHub](https://github.com/adnanakil/nobuzz/blob/main/README.md) · [HN discussion](https://news.ycombinator.com/item?id=49388752) · Related: [Vomit: Clean up Claude 5’s token output](https://news.ycombinator.com/item?id=49375996)
