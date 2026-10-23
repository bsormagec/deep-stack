---
title: "The Coding Agent Race Is Becoming a Cost-Control Problem"
dek: "Cognition's SWE-2 makes a useful case for measuring coding agents by the work they avoid, not just the work they finish."
date: 2026-09-10
image: "/images/the-coding-agent-race-is-becoming.webp"
---
The most interesting number in Cognition's SWE-2 announcement is not its benchmark score. It is the number of steps the agent did not take.

On Cognition's FrontierCode 1.1 Main evaluation, SWE-2 medium reportedly scores higher than SWE-1.7 while using 58% fewer turns and costing 81% less per run. The model reaches its first real edit after a median of 18 steps, versus 48 for the previous model.

That is a better description of progress in coding agents than another leaderboard victory. In a real repository, the expensive failure mode is rarely that an agent cannot type a patch. It is that the agent spends ten minutes reading the wrong files, runs a broad search three times, opens a chain of irrelevant documentation, then finally makes a small edit. Cognition's claim is that SWE-2 is better at deciding what not to inspect.

The catch is that these are still vendor-reported numbers, and the benchmark picture is not uniformly flattering. The engineering lesson is useful anyway: coding-agent quality is becoming a joint problem of correctness, latency, and spend.

## The meaningful improvement is focused exploration

Cognition frames SWE-2 as a model that makes fewer detours. Its comparison shows SWE-1.7 averaging 127 steps per FrontierCode task, while SWE-2 medium averages 53. Those steps include exploration, planning, edits, builds, tests, and finalization.

The difference matters because repository work has a shape that autocomplete benchmarks miss. A strong agent needs enough exploration to build a correct mental model, but exploration has diminishing returns. Reading every nearby file feels safe. It is often just expensive.

Cognition says SWE-2 medium makes its first real edit after a median of 18 steps, compared with 48 for SWE-1.7. That suggests a change in judgment rather than a simple increase in typing speed. The model is deciding earlier which evidence is sufficient to act.

This is also where the effort settings make sense. Medium is meant to move quickly on simple and intermediate tasks. High and max spend more time planning and verifying on difficult work. The useful product is not one magical model setting. It is a model that can spend effort selectively.

## Benchmark wins need a cost axis

SWE-2's headline results are strong in the announcement: 50.0% on FrontierCode 1.1 Main, 73.0% on DeepSWE 1.1, and 92.8% on Terminal-Bench 2.1. Cognition says it matches or approaches more expensive models on some of these tests.

But one result changes the tone. On Terminal-Bench 4, SWE-2 scores 27.3%, compared with 55.8% for Fable 5.1 and 57.9% for GPT-6 Astra. A Hacker News commenter immediately called the presentation "benchmaxing" and asked why other benchmarks were not shown.

That criticism is fair as a question, even if it is not proof that the model is weak. A benchmark score is only useful when we know what tasks it represents, how the harness was configured, and what the run cost. Cognition's own framing points in the right direction by plotting solve rate against average dollars per rollout.

For teams deploying agents, the metric should look something like this: successful tasks per dollar, with a penalty for human review and time spent waiting. A model that wins one benchmark but requires twice as many reruns may be worse in production. A model that scores slightly lower but reaches a correct patch in half the turns may be the one engineers keep.

## The training idea is practical, not just academic

The technical centerpiece is a reinforcement-learning objective that penalizes cost at each effort level. Cognition describes it as R = S - lambda times C, where S is whether a rollout succeeded and C combines inference cost and rollout time. The penalty is tuned to the slope of the base model's cost-performance curve.

The intuition is simple. If training rewards success alone, the model can learn to spend more compute until the benchmark moves. If the cost penalty is too aggressive, it learns to quit early and miss hard tasks. Matching the penalty to the local tradeoff gives training a reason to improve the frontier instead of merely moving along it.

Cognition also reports a length-weighted reward baseline that stabilizes RL, a speculative-decoding system that improved accepted draft lengths by 15%, and low-precision NVFP4/FP8 inference with quantization-aware training. These details are easy to skip, but they explain how the company can train a 2.8-trillion-parameter base model without turning every rollout into a scheduling problem.

There is a broader point here for agent builders. The model policy and the serving system cannot be optimized separately forever. A coding agent's behavior determines how much infrastructure it consumes, and the infrastructure's latency changes which behaviors are affordable. Token budgets, verifier quality, batching, speculative decoding, and task routing are part of the product.

## Resourcefulness needs boundaries

One example in the post deserves more scrutiny. Cognition says SWE-2 can find another route when an obvious tool is blocked. In one internal case, an unavailable MCP integration led the model to reconstruct data from Slack history it already had access to.

That sounds resourceful. It could also become a permission problem if the system's boundaries are vague. An agent that searches for alternate evidence is useful when it stays inside the user's authorization. The same behavior is dangerous when "find another route" turns into "look somewhere else because the intended source was blocked."

Cognition says the model is better at verification and at challenging user hypotheses instead of agreeing with them. Those are good properties, but they need evaluation outside curated coding tasks. We should test whether an agent can distinguish missing access from an invitation to improvise around access, and whether it reports uncertainty instead of quietly widening its search.

## The practical takeaway

SWE-2 is interesting because its strongest claim is not that it writes more code. It is that it wastes less motion while preserving a high solve rate. That is the direction coding agents need.

When evaluating one, track the full run: time to first useful edit, total tool calls, rerun rate, human correction time, and dollars per accepted change. Keep separate numbers for easy maintenance work and ambiguous architectural tasks. Then inspect the failures, especially the ones where the agent looked busy and still solved the wrong problem.

The best coding agent will not be the one that produces the longest transcript. It will be the one that knows when it has enough evidence to act, when it needs to keep looking, and when a blocked path is a permission boundary rather than a puzzle.

Source: [Introducing SWE-2: Pushing the Pareto Frontier](https://cognition.com/blog/swe-2)
