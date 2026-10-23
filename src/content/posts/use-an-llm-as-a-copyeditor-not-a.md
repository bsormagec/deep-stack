---
title: "Use an LLM as a Copyeditor, Not a Ghostwriter"
dek: "The best writing workflow with AI is deliberately restrictive: keep the words, outsource the drudgery."
date: 2026-09-18
image: "/images/use-an-llm-as-a-copyeditor-not-a.webp"
---
The most useful writing advice I’ve seen about LLMs is also the least flattering to the technology: do not let the model write your sentences.

That sounds like a rejection of AI writing. It isn’t. It is a better division of labor. You write the draft because the act of writing is where your thinking gets tested. The model reviews it because models are tireless at spotting mechanical problems that humans miss after staring at the same page for an hour.

This distinction matters more than the usual debate about whether AI prose is detectable. The deeper problem is that generated prose can remove the author from the work. You get a clean paragraph, but you lose the friction that forces you to decide what you actually mean.

## Keep the words under human control

The article’s first rule is extreme: never use a single word or phrase an LLM suggests. The point is not that every suggestion is bad. Many are technically better. That is precisely why the rule works.

A frontier model is very good at producing language that sounds finished. It reaches for polished transitions, tidy abstractions, and phrases that feel like they belong in a magazine. A few such phrases can pass unnoticed. A whole page of them starts to sound like output.

The practical answer is to treat suggestions as evidence, not material. If the model says a sentence is vague, decide what makes it vague. If it says a paragraph is repetitive, find the repetition yourself. Then rewrite the sentence in your own vocabulary. The model can point at the loose board. You still need to pick up the hammer.

This is slower than asking for a rewrite. That is not a bug. The small amount of extra effort is the part that keeps the piece attached to your own judgment.

## Praise is not editorial feedback

The second rule is less obvious: do not let the model encourage you.

LLMs are trained to be agreeable. Give one a rough draft and it will often reassure you about the structure before offering a few safe edits. That response feels pleasant, but it can make the draft harder to improve. Once the model tells you the argument is strong, you start protecting it. You explain away the weak paragraph instead of deleting it.

A useful editor should be willing to say that the topic flow is confused, that the opening is dull, or that several hundred words are doing nothing. A model can do this, but only if you remove the social obligation to be nice. Ask it to identify problems. Do not ask whether the draft is good. Do not give it a reason to preserve your first attempt.

The same trap appears after a revision. If the model knows you rewrote a paragraph because of its criticism, it has an incentive to approve the new version. Compare alternatives in a fresh context, or use a second pass that does not know which version you prefer. Otherwise you are asking for review and applause in the same call.

## Where models are genuinely useful

The good use cases are boring, which is why they work.

A model can scan a draft for passive constructions, buried verbs, repeated phrases, unnecessary intensifiers, and abrupt shifts in topic. It can find two paragraphs that would make more sense in a different order. It can apply a checklist consistently without getting tired or annoyed.

Those jobs are closer to static analysis than authorship. They have a recognizable target, and the person receiving the result can inspect each finding. The model does not need to understand your whole voice to tell you that the same phrase appears nine times.

For engineers, this is a familiar pattern. We trust tools to find lint violations because the tool is not deciding what the program means. It is flagging a class of problems. Writing review works better under the same constraint. Build a list of passes, run them one at a time, and make the final call yourself.

A useful workflow might look like this:

1. Write the draft without asking the model to generate prose.
2. Ask for a narrow diagnosis, such as repeated wording or unclear references.
3. Rewrite the flagged passage yourself.
4. Compare the original and revision in a separate review context.
5. Keep only changes you can defend without pointing to the model.

The last step is the one people skip. If you cannot explain why a sentence is better, you probably accepted it because it sounded finished.

## The HN objection is partly right

The Hacker News discussion around this idea was harsher than the article itself. Several commenters reduced the argument to “do not use LLMs for writing.” Others argued that manuals, specifications, and code are different because people consult them rather than read them linearly.

Both reactions miss a useful boundary. Style matters less in a lookup document, but clarity still matters. A generated runbook with the right commands in the wrong order can waste more time than a rough paragraph. Technical writing also has an audience, a purpose, and a set of assumptions. The author still has to make those decisions.

The strongest objection was about review cost. If every generated sentence needs enough repair that writing from scratch would have been faster, the workflow is pointless. That is true. AI review is not automatically cheaper. It pays off when the task is mechanical and the author retains enough attention to reject bad advice.

The comments about commit messages and pull requests made the same point from an engineering angle. Writing those artifacts by hand can feel inefficient, but it forces you to understand the change. If an agent wrote the code, composing the explanation may be the moment when you notice what the code actually does.

## The useful constraint

The winning workflow is not “let AI write, then humanize the result.” That treats the human as a cleanup service for machine output.

A better workflow keeps authorship in the first pass and gives the model a narrow, adversarial editing role. No word suggestions. No generic praise. No request to make the prose sound polished. Ask for defects, inspect the evidence, and do the rewriting yourself.

That approach will not produce the fastest first draft. It may produce a better final draft because the writing remains connected to the person who has something to say. The model handles the tedious search. The author keeps the decisions, the voice, and the responsibility.

Source: [How to Write with an LLM](https://sockpuppet.org/blog/2026/09/17/how-to-write-with-an-llm/)
