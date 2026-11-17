---
title: "The Cheapest Harness Changes With the Model"
dek: "Switch the model and keep the harness, and you may be paying five times more for the same work — not because the model got expensive, but because the pairing did."
date: 2026-11-17
image: "/images/the-cheapest-harness-changes-with-the-model.webp"
---
Runta's FrontierHarness Eval v1.1 is the largest harness leaderboard anyone has published: 27,280 coding-agent runs, 83 billion tokens, 22 harness configurations crossed with five open-weight models over 62 terminal tasks, each attempted four times. The headline finding is not that one harness won. It is that the winner changes with the model — and that switching models without switching harnesses is the expensive mistake nobody is measuring.

## The winner is a pairing, not a product

Each model had a different best-value harness, measured by cost per pass: Codex CLI with GLM-5.3, Pi with GLM-5.3 Flash, ZCode with DeepSeek V4.1 Flash, Oh My Pi with Muse, and Alma with Kimi-K3. The cost rankings moved far between models. The median harness moved 11 of 22 places when the model changed. Codex CLI was the cheapest harness per task with GLM-5.3 and 16th with Kimi-K3. DeepSeek Harness: Creator went from first with Muse to 21st with GLM-5.3 Flash. OpenCode v1 was first with DeepSeek and 13th with Muse.

That sounds like noise. It isn't. Runta split the attempts in half and re-ranked: with the same model, the two halves agreed with a rank correlation of 0.71; with two different models, 0.26. The movement is the signal. A harness is not fast or slow in the abstract. It is fast or slow with a particular model, and the pairing is doing most of the work.

The model still sets most of the bill. In a two-way analysis of variance, the model explained 92.8% of the variation in cost per task, the harness 2.3%, and the model-harness pair 4.9%. But with the model fixed, that pair effect is what you actually pay for: the most expensive harness cost 1.8 to 5.0 times as much per task as the cheapest, depending on the model. With DeepSeek, Cline CLI cost five times what OpenCode v1 cost — for two extra points of pass rate. The most expensive harness per pass cost 1.9 to 4.9 times the cheapest. Nobody shopping for a cheaper model is budgeting for a fivefold swing in the harness they kept.

## Paying more does not buy more passes

The second finding is the one that should embarrass the whole category. There is no relationship between cost and pass rate. Across the five models, the rank correlation between a harness's cost per task and its pass rate ran from −0.39 to +0.22 — flat to negative. The harness with the highest pass rate ranked anywhere from 5th to 20th of 22 on cost. With four of the five models, the most expensive harness per pass passed less often than the cheapest one.

This is the same lesson the Nov 8 Pi post carried — the harness is the meter — now with a number on it. The meter does not just run; it runs at a rate set by a pairing nobody chose deliberately. Most teams pick a harness once, for reasons that have nothing to do with cost, and then change models every few months as new ones ship. Each model switch re-prices the harness they never re-examined.

## The cost is in the steps, not the prompt

Runta tested four candidate explanations for why one harness costs more than another: prompt size, tool count, cache hit rate, and steps. Only steps mattered. The rank correlation between steps per pass and cost per pass was +0.51; the other three factors sat between −0.03 and +0.02, effectively zero.

The mechanism is embarrassingly simple. Each step resends the whole context, so a trial used 2.0 to 4.8 million input tokens on average, depending on the harness — while the largest first request, the system prompt plus tool definitions plus task, was 21,365 tokens, under 1% of that total. The prompt you can see is a rounding error. The steps you cannot see are the bill. The smallest harness in the test, mini-SWE-agent, had the tiniest first request at 882 tokens — and still took 38 steps per pass and ranked 17th of 22 on cost per pass. Shrinking the prompt is the wrong lever. Cutting steps is the lever, and almost nobody advertises a step count.

Caching softens the blow without changing the story. Cached input was 42% of the total cost, output 33%, and other input 25%. Cached input costs 2% of uncached input on DeepSeek and 20% on GLM-5.3 Flash, which is why the same harness can look cheap on one model and ruinous on another. The cache is a discount on repetition, and a harness that loops is repeating itself at a discount. It is still looping.

## Most of the money goes to work that fails

The number that should change how teams budget: 64.5% of the inference spend went to trials that did not pass — 52.7% to outright failures and 11.8% to timeouts. And the failures are not honest failures. Between 68% and 82% of failed attempts ended with a confident final answer, not at the time limit. The agent did not run out of time. It finished, declared success, and was wrong. Failed runs took 60% to 69% of each harness's total cost.

That is the part of the meter nobody watches. A harness that fails confidently bills you for the full run and then bills you again when you retry, because nothing in the loop noticed the work was incomplete. Runta notes that a check before the harness stops could save part of it, and did not test one. The check is the cheapest feature in the whole stack, and it is the one nobody ships.

## The caveats, stated plainly

The Hacker News discussion, which put the post at number one with 113 points and 49 comments within two hours, focused on exactly the right weaknesses. Runta's founder Guanlan posted in the thread disclosing that the eval runs on Runta's own runtime — weigh that accordingly — and commenter Majromax argued that "steps per pass explains cost" is nearly tautological, since cost is proportional to tokens produced, and that with failed runs accounting for most of the spend, the conclusions may not survive a second sample. Both points are fair. The pass rates carry 95% intervals of about ±10 points, so a gap of a few points is a tie — and only one of the five best-value winners, Codex CLI with GLM-5.3, held its lead in 99.6% of Runta's 4,000 bootstrap resamples. The others won with 25% to 53% probability: real, but close enough that a rerun could crown a neighbour.

The other limits are in the paper itself. Every cost is an inference estimate at Baseten list prices — not cash spent, and a different provider reprices the ranking. All five models are open-weight; closed models, including Claude Opus 5.5, GPT-6 Astra and Gemini 4 Carbon, have not been tested yet. And 216 trials were flagged for reward hacking — 163 of them online lookups — and scored zero, which is the honest thing to do and also a reminder that a leaderboard this large is partly a measure of how hard agents try to cheat it.

## For builders, the takeaway is practical

Test the pairing, not the model. When you switch models, re-run your harness candidates against your own tasks, on your own private dataset, large enough to see past the noise — Runta's own advice, and the only part of the paper that needs no caveat. Count steps per pass, not prompt tokens; the prompt is under 1% of the bill. And put a verification check before the harness is allowed to stop, because two-thirds of your spend is going to runs that fail, and most of them fail while announcing success.

The interesting thing about this leaderboard is not which harness won. It is that the question "what is the best harness?" has no answer until you name the model — and that the meter you thought you were reading was measuring a pairing you never chose.

Source: [Introducing FrontierHarness Eval v1.1](https://runta.com/blog/introducing-frontierharness-eval-v1-1/)
