---
title: "The Cheap Model Types. The Expensive Model Watches."
dek: "Google's Orchestrator pairs Gemini 4 Hydrogen with Carbon inside a single task — and the savings are measured in quota, not dollars."
date: 2026-11-13
image: "/images/the-cheap-model-types-the-expensive-model-watches.webp"
---

The interesting thing about Google's new Orchestrator is not the new model. It is that the router stopped making one guess at the start of a task and started taking turns inside it.

Google announced Gemini 4 Hydrogen and Orchestrator on November 12, inside Google Antigravity, its agentic coding environment. Hydrogen is the cheap, fast model in the Gemini 4 family. Orchestrator is a new option in the model dropdown that pairs Hydrogen with Google's strongest model, Carbon, for long-horizon tasks. The pairing is dynamic and bidirectional: Carbon starts in a read-only phase, exploring dependencies, resolving ambiguities, and building a plan with explicit re-planning triggers. Hydrogen then takes over to write the edits, update packages, and run the tests. If Hydrogen hits friction, the task hands back to Carbon to inspect the state, repair the plan, and resume execution.

That is a different shape from the model router everyone already knows. A static router looks at your first prompt, guesses how hard the task is, and sends the whole thing to the cheapest model it thinks can finish it. The guess is made once, before anything is known. Orchestrator never makes that bet. It lets the expensive model do the part where being wrong is costly — understanding the codebase and deciding what to change — and lets the cheap model do the part where being fast is valuable — typing the change and running the tests. When the cheap model gets stuck, the expensive model comes back. The division of labor follows the work, not the prompt.

## The numbers, and whose they are

On Terminal-Bench 4.1, Google reports that Orchestrator reaches near-Carbon task success while consuming 24% less quota and completing 19% faster, on average. Those are Google's own measurements, with no independent verification yet, and the benchmark is a single one — a coding benchmark, not a general measure of agentic work. "Near-Carbon" is also doing quiet work in that sentence: near is not equal, and Google does not say how far below Carbon the success rate lands.

Hydrogen on its own scores 51 on the Artificial Analysis Intelligence Index, against 50 for Argon, and reaches 54 at its highest setting. On Terminal-Bench 4.1 it scores 57%, against 18.2% for Gemini 3.8 Flash — more than triple its predecessor. Hydrogen also adds a fourth thinking level: low, medium, high as the default, and a new xhigh tier. The numbers are respectable for a fast model. They are also, again, the vendor's own.

The Hacker News discussion, which gathered 491 points on the Antigravity announcement, did not argue much about the benchmarks. It argued about two other things: the names, and whether this is new at all. Nobody can tell from the names which model is bigger — Carbon, Hydrogen, Argon — without having read a leak first. One commenter noted that Anthropic's advisor mode and GitHub's multi-model HydraFusion pipeline already pair a strong model with cheaper ones. That is a fair objection, and it sharpens the real question: Orchestrator's claim is not that pairing is new, but that the handoff happens mid-trajectory, inside one evolving task, rather than once at the start. Whether that is a real difference or a marketing label on the same idea is something only usage will settle — and the thread's sharpest technical question is still unanswered in the announcement: when the task hands back and forth between two models, how does the context move without constant re-reading? One commenter asked exactly that. Google's post does not say.

## Quota is the meter now

Here is the part that matters for builders, and it is the part the announcement is quietest about. There is no price in the blog post. No dollars per million tokens, no per-task cost, nothing to compare against Claude Opus or GPT-6 Sol. The 24% saving is a saving in quota — the usage allowance inside a paid Google AI Pro or Ultra subscription — not a saving in money you can put on a spreadsheet.

Hydrogen rolls out to paid Google AI Pro and Ultra subscribers. Orchestrator (Carbon) is Ultra only; Orchestrator (Argon) is available on Pro. Enterprises get both through Gemini for business. That is the whole pricing picture the announcement gives. So the honest way to describe Orchestrator is not "24% cheaper." It is "24% less of your subscription quota for near-frontier results, if you are already paying for Ultra." The meter did not get cheaper. It moved — from per-token API billing to per-quota subscription billing — and a percentage of quota is a number you can only spend inside Google's store.

That is not a criticism of the mechanism. A subscription quota is a real constraint, and stretching it by a quarter is a real saving for someone who hits the limit every week. The Hacker News thread has users who say exactly that: they switched to Gemini because the quota economics work for them, and they like not switching models by hand. It also has users who say the opposite — that Antigravity's value for money is poor and they would rather run one strong model everywhere. Both can be true. The point is that the savings are denominated in a currency Google controls, and the announcement gives you no exchange rate into dollars.

## The third variant in six weeks

There is a second pattern worth naming. Hydrogen is the third Gemini 4 variant in six weeks. Argon arrived on October 2, Carbon on October 30, Hydrogen on November 12. Each one is a different point on the same tradeoff curve: Argon the flagship, Carbon the strongest, Hydrogen the fast one. Deep Stack has now covered all three, because each launch is a real product — but the pace itself is the story. Google is shipping the family one member at a time, and each member arrives with its own benchmark table and its own subscription tier.

The practical consequence is a choice builders now have to make every few weeks: which Gemini is the right one this time, and which subscription tier unlocks it. Orchestrator is Google's answer to that fatigue — stop choosing, let the dropdown choose for you, mid-task. It is a reasonable answer. It is also an answer that only works inside Antigravity, inside a paid subscription, with the models Google pairs for you. The router that takes turns is also a router you do not control.

For builders, the takeaway is practical: if you already pay for Ultra and you run long coding tasks in Antigravity, Orchestrator is worth trying on a real task, not a demo — measure whether the handoff actually saves quota on your work, and whether the "near-Carbon" gap shows up where it hurts. If you are not inside that subscription, there is nothing here to buy yet, and no price to compare. The interesting model is not the cheap one or the strong one. It is the handoff between them — and whether a handoff you cannot see, priced in a currency you cannot convert, is a tool or a leash.

Source: [Gemini 4 Hydrogen and Orchestrator](https://antigravity.google/blog/gemini-4-hydrogen-in-google-antigravity/)
