---
title: "The Price Fell. The Score Fell Further."
dek: "OpenAI's GPT-6.2 family went backwards on the one benchmark where ordinary people still beat frontier models — and the cheap model fell the furthest. The price-performance curve is not one curve."
date: 2026-11-21
image: "/images/the-price-fell-the-score-fell-further.webp"
---
The interesting thing about GPT-6.2 is not that it flopped on a benchmark. It is that the flop landed exactly where the sales pitch was strongest.

Three days ago, OpenAI launched GPT-6.2 with a clean story: Astra, the flagship, got 20% cheaper at $8/$40 per million input/output tokens, and Sol, the cheap model, stayed at $2/$10 while coming within half a point of Astra on FrontierCode 2.0 — nearly the flagship, at about a fifth of the price. That was the story Deep Stack covered on November 18, and it was a good story. It was also, as of this week, only half the story.

SimpleBench updated its leaderboard on November 17, and every GPT-6.2 model scored worse than the model it replaced. GPT-6.2 Astra fell to 77.3%, down 6.3 points from GPT-6 Astra's 83.6%. GPT-6.2 Astra Pro fell to 79.2%, down 7.3 points from 86.5%. And GPT-6.2 Sol — the cheap model, the one the whole price story hangs on — fell to 69.9%, down 13.0 points from GPT-6.1 Sol's 82.9%. Sol now scores below GPT-6.1 Terra, the previous generation's smaller model, at 72.2%.

## The test where humans still win

SimpleBench is a small board, and its smallness is the point. It has just over 200 multiple-choice questions covering spatio-temporal reasoning, social intelligence, and what its authors call linguistic adversarial robustness — trick questions, in plain language. The questions are not publicly released, which keeps models from training on them, and the human baseline is 83.7%, measured from nine non-specialist participants, the best of whom reached 95.4%. Model scores are averaged across five runs at temperature 0.7 and top-p 0.95, so the numbers are better read as a band than a precise ranking.

That framing matters, because the board's whole claim is that it measures something other boards do not: whether a model can answer basic questions a person with a high-school education gets right. On most benchmarks, frontier models now beat the average human and increasingly beat experts. On SimpleBench, the average human still beat every model — until the board's November 9 update, when Claude Fable 5.2 reached 94.9%, ahead of Gemini 4 Neon at 94.4% and Gemini 4 Carbon at 92.6%.

GPT-6.2 Astra, at 77.3%, now sits 6.4 points below the average human. Not below the best human. Below the average one.

## One curve, two directions

That sounds like a bad week for OpenAI. It isn't — or rather, it is a bad week for a specific claim, and the claim is the one builders actually pay for.

The FrontierCode result and the SimpleBench result are both OpenAI-era numbers, and they point in opposite directions. On FrontierCode 2.0, Sol is nearly Astra at a fifth of the price. On SimpleBench, Sol is thirteen points worse than its own predecessor and nearly thirty points behind the board's leader. Artificial Analysis, which tracks the same models on its own index, tells a similar split story: Astra is roughly flat against GPT-6 Astra there, while Sol sheds three points. The generation is steady on one axis and down on another.

This is what a price-performance curve actually looks like when you stop drawing it as a single line. "Nearly as good at a fifth of the price" is a claim about a specific task, and the task matters more than the price. A model that is nearly as good at writing code can be dramatically worse at the kind of common-sense reasoning that shows up in an agent loop — reading a vague instruction, noticing the trick in a question, not confidently answering the wrong thing. SimpleBench is built out of exactly those traps, and Sol walked into more of them than the model it replaced.

For builders, the takeaway is practical: a launch-week price claim is a claim about the benchmark the vendor chose. Sol at $2/$10 is still cheap, and cheap still matters — but the discount is only a discount if the model still does the job, and the job is not one benchmark. If your workload is code, the FrontierCode number is the one that counts. If your workload is agents doing open-ended work with ambiguous instructions, the SimpleBench number is a warning, and it is a warning about the cheap model specifically. Swapping Sol in on the strength of the price, without measuring it on your own tasks, is how a 20% saving turns into a 13-point regression that nobody notices until the agent has already shipped the wrong answer.

## The catch

None of this is a verdict on GPT-6.2. SimpleBench is one small board — 200 questions, nine humans for the baseline, scores that move a point or two between snapshots and effort settings. The ranks shift depending on who is counting: Traictory puts GPT-6.2 Astra 17th, AGI Hunt puts it 14th or 15th, and BenchLeader shows Sol at 73.1% at a different effort setting than the 69.9% on the main board. Use the scores, not the ranks. OpenAI has offered no explanation for the drop, and there may be a boring one — a different effort setting, a sampling quirk, a board that punishes the exact kind of confident guessing the new training encouraged.

The Hacker News discussion, which surfaced the numbers in a thread posted November 21 that reached 150 points and more than a hundred comments, is split in exactly the way you would expect. Several heavy users say Astra 6.2 feels better than its predecessor in real work — more concise, less inclined to read between the lines — and one calls Sol 6.2 Ultrafast the star of the release. Another reports Sol 6.2 as "significantly worse," with more circuitous language and strange artifacts, and blames aggressive distillation. One commenter measured Sol getting faster on OpenRouter, from 43 to 58 tokens per second at the median, closing much of the speed gap with Opus 5.5. The thread's most upvoted skepticism is also the most honest: a benchmark is not the work, and the only test that matters is how well the model does your current job.

That is right, and it is also the reason the numbers are worth publishing. A model family that gets cheaper and worse on the same week is not a paradox. It is a reminder that "better" was never one number, and the number that fell is the one that measures whether the model notices when the question is trying to trick it.

A new generation that scores lower than the old one on the test ordinary people pass is not a disaster. It is a price tag with a footnote. Read the footnote before you switch.

Source: [SimpleBench](https://simple-bench.com/)
