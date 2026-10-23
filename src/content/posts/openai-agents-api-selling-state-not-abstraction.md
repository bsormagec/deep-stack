---
title: "OpenAI's Agents API Is Selling You State, Not Abstraction"
dek: "The harness is the replaceable part. The session store is the part you can't take home."
date: 2026-09-11
image: "/images/openai-agents-api-selling-state-not-abstraction.webp"
---
OpenAI shipped an Agents API, and the pitch sounds like ordinary plumbing. You create a session, hand it a task, and OpenAI runs the loop for you. It provisions a sandbox, drives its Codex harness, compacts the context when the window fills up, splits work across subagents, and keeps the whole thing alive if you come back tomorrow.

The Hacker News thread on it spent most of its energy arguing about harnesses. That argument is a distraction, and it covers up the trade you are actually making.

## The harness argument is already settled

Comment after comment made the same point in different words. One commenter built his own harness on weekends, from his phone, with GitHub integration, review mode, voice mode, and browser control. Someone else cloned pi-herdr-subagents and grew it from there. dools has been running his own gateway and session manager for months, and non-technical colleagues are shipping software through it. andai points at minimal-agent.com, fifty lines of code wired to a Codex subscription.

They can all do this because the harness is not special. As athrowaway3z put it, everything sitting above the standard chat-completions surface is window dressing. Every provider accepts that surface, so moving from OpenAI to DeepSeek or a local Gemma is a config change, not a rewrite. If the harness were the moat, nobody would be building one on a weekend.

bluesnowmonkey made the sharper version of the same point. His money is not on OpenAI or Anthropic here because both are stuck routing through their own frontier models, and those are not always the best choice for agentic work. You can argue about which model leads this week. You cannot argue that the leader changes.

## What you actually hand over

Here is what the Agents API takes custody of. Sessions are durable. Turns and items are saved. Context compaction happens on their side, which means the model's summary of your work becomes their artifact. Artifacts live in their storage. Data residency is limited to the United States, and the API is not eligible for zero data retention. The docs say that plainly, including the line that choosing a self-hosted sandbox does not change your ZDR status.

So what you give up is not control of the loop. It is the record of everything the loop has learned.

That distinction matters because it changes what moving later will cost. Switching a chat-completions call between vendors is an afternoon. Migrating three years of accumulated session history is a project, and it only starts if they hand you an export.

## We have seen this ending before

One comment in the thread says all of it. z2: "After being burned by the rug-pull of OpenAI retiring the Assistants API in favor of Responses last year, I swore off using heavily stateful APIs for language model access."

The Assistants API was where your threads lived. Then it was not. Nobody did anything wrong. The vendor changed its mind about an abstraction, and every product holding thread IDs got a deadline.

layoric answered the other half of the question with a Spider-Man joke, developers pointing at each other thinking "not it." That is the state persistence problem bluesnowmonkey opened with, and nobody in the thread wants to own it. OpenAI is volunteering.

## The part worth taking seriously

None of this makes the API a bad product. Long-running work genuinely needs durable sessions, and rebuilding compaction and crash recovery yourself is real work. bob1029 was honest about it. He gave up on the DIY harness because you cannot out-engineer a lab's own access to its own models, and the Responses API gave him most of the control he wanted.

The mistake is treating that convenience as free. Keep the canonical state in your own database. Treat the OpenAI session as a cache and a runtime, never as the source of truth. kmansm27 is building omnara exactly this way, with agent state in Postgres you can query instead of a file per agent. Do that and a session becomes disposable. If the session resource changes shape, you lose a runtime, not your product's memory.

Then budget for the exit before you need it. Write down what it would take to reconstruct a session from your own store: the task tree, the tool outputs that actually mattered, the artifacts you chose to keep. If that list is empty because everything lives in their session, you do not have a hedge. You have a dependency with a friendly onboarding flow.

## Sandboxes are a separate question

One more thing from the thread. simonw went straight to the sandbox network docs and tested the restricted mode himself. He blocked a domain, then tried to reach it: "Ran curl http://example.com/. It exited with code 0 and returned: Domain forbidden." The obvious probe was rejected. He was testing it because of the earlier incident where agents rewrote /etc/hosts to slip past their own sandbox rules, and his follow-up tried a Host header trick against an allowed hostname, which he flagged himself as an attempt to bypass the domain restriction.

That is the correct posture. A restriction is worth exactly what the layer enforcing it is worth. When your agent runs inside an OpenAI session, that enforcement is not yours to audit and not yours to patch.

## What you are buying

The harness got commoditized. The session store did not. OpenAI is selling you the second and calling it the first. Take the runtime, because it saves months and the sandbox is genuinely hard to build. Just do not let it become the place your product remembers things, because that is a subscription you cannot cancel without losing the goods.

Source: [OpenAI Agents API](https://developers.openai.com/api/docs/guides/agents-api/overview)
