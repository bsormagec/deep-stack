---
title: "You Can Build the Decision Model in an Afternoon. Its Confidence Is Lying."
dek: "## A 1.7B open model, one forward pass, and a probability that says 99% while being right 70% of the time"
date: 2026-10-11
image: "/images/you-can-build-the-decision-model.webp"
---
The interesting thing about the decision model is not that a startup can charge for it. It is that the core trick fits in a single page of code — and the part that breaks is the part everyone plans to sell.

A post titled "Build your own decision model," published on nishtahir.com and sitting at 429 points with 97 comments on Hacker News at fetch time, walks through the emulation step by step. Decision models — the "System One" category that products like Jev, from Typesafe AI, are built around — do not generate text. They pick from a fixed set of allowed answers and return a probability for each one. The context here is fresh: Typesafe AI's $870 million raise at a $7.5 billion valuation was covered in this newsletter yesterday, based on the company's own claims about decision workflows. The blog post asks a quieter question. What happens if you just build one yourself, from an ordinary language model, this afternoon?

The answer is that it works. That is only half the decision.

## One pass instead of eleven

The mechanism, as the post lays it out, is almost embarrassingly simple. A normal language model answering a multiple-choice question generates its answer token by token. The post's own example counts 11 passes to produce a valid structured response. A decision model makes a different assumption: the set of possible answers is fixed in advance — A, B, C, D, E — so you can mask every other token in the vocabulary, run a single forward pass, and read the probabilities off the five tokens that remain. The highest probability is the answer. The probabilities themselves are the product.

The post implements this with Qwen3-1.7B, an open 1.7-billion-parameter model from Alibaba's Qwen family, loaded through Hugging Face Transformers. No special architecture. No proprietary engine. Constrain the output tokens, take a softmax over the survivors, and a general-purpose chatbot becomes a classifier that answers in one pass and hands you a number that looks like confidence.

For builders, the appeal is real. A large share of production AI work is not open-ended generation. It is routing, triage, scoring, approval, classification — questions with a fixed answer set, asked millions of times. Paying for eleven generated tokens, or for a frontier model at all, to answer a five-way question is a cost structure, not a technical requirement. A 1.7B model doing it in a single pass on hardware you own changes the invoice completely.

## The scoreboard looks fine

Tested against a random holdout sample of CommonsenseQA, a standard multiple-choice commonsense benchmark, the setup scored 725 correct out of 1,221 questions — 59.38% accuracy, with a macro F1 of 0.5844, per the post's published evaluation table. A quick finetune on the dataset lifted that to 762 out of 1,221, or 62.41% accuracy, per the same post.

Those are respectable numbers for a model this small doing a job it was never trained for, and they are exactly where a casual reader stops. The demo works. The accuracy is printable. Ship it.

That sounds like a validation. It isn't. Accuracy was never the product a decision model sells. The product is the probability — the number a downstream system uses to decide whether to act automatically, escalate to a human, or refuse. And the probability is where this build quietly falls apart.

## 99% confident, 70% right

The post bins its own predictions by stated confidence, and the table is the whole story. Of the 1,221 predictions, 809 landed in the highest confidence bin, 0.90 to 1.00, with an average stated confidence of 0.9855. The actual accuracy in that bin, per the post's table, was 0.7009. Read that again in production terms: when the model said it was roughly 99% sure, it was wrong three times in ten. The next bin down is worse — predictions stated at 0.80 to 0.90 confidence were accurate 0.4711 of the time, per the same table. A coin flip, wearing a lab coat.

The post demonstrates the failure with an ambiguous question — where would you most likely find a bat: a cave, a baseball game, an attic, a zoo, a sporting goods store. There is no single correct answer, which is the point. The model returned "cave" with a probability of 0.9978, per the post's printed output. Near-total certainty, on a question designed to have none.

This is not a bug in the emulation. It is the default behavior of the underlying machinery, and the post is honest about why: an untrained language model's token probabilities measure how confident it is about which token comes next, not the probability that the answer is correct. Those are different quantities that happen to share a scale from zero to one. Every system that reads a softmax as a risk score — and a growing number of routing, moderation, and approval pipelines do exactly that — inherits the confusion for free.

## Calibration is a step, not a property

To the post's credit, it does not stop at the diagnosis. It applies temperature scaling — dividing the logits by a fitted constant before the softmax, which flattens the distribution without changing which answer wins — and finds a temperature of about 3.797 by fitting against the model's measured accuracy, per the post. After scaling, the top bin shrinks from 809 predictions to 109, and its stated confidence of 0.9333 sits close to its measured accuracy of 0.9541, per the post's second table.

That is a real fix, and it costs almost nothing. It is also, notice, a step that has to be done deliberately, on held-out data, per task. Nothing in the one-pass trick gives it to you. Nothing in the demo warns you it is missing. The Hacker News discussion, at 97 comments at fetch time, circled the same tension the numbers raise: the technique is genuinely useful, and the number it outputs is genuinely not what it appears to be until someone does the unglamorous calibration work.

There is a version of this I would use: a small local model, a fixed answer set, a calibration table built from my own labeled data, and thresholds set from measured accuracy rather than stated confidence. That system is cheap, fast, private, and honest about its error rate. It is also three extra steps past the demo, and those steps are the difference between a decision model and a random-number generator with good posture.

## What the afternoon build actually proves

Strip the story down and two things are true at once. The expensive part of the decision-model category — the inference trick itself — has already commoditized into a page of PyTorch that a 1.7B open model handles at 59 to 62% accuracy on a public benchmark, per the post's own tables. Anyone budgeting as if the single-pass mechanism were a moat should recheck that assumption.

And the cheap-looking part — the probability — is where the real cost hides. Not in dollars. In the labeled data, the calibration fits, and the discipline to treat a stated 0.99 as a claim to be audited rather than a fact to be routed on. The vendors in this category are not, in the end, selling the softmax. They are selling the claim that their numbers mean what they say. This post, perhaps without meaning to, published the audit that claim has to survive.

For builders, the takeaway is practical: if your pipeline consumes a model's confidence, demand the calibration table — confidence bins against measured accuracy, on data like yours — before you wire a threshold to it. If the table does not exist, the number is decoration.

A model that answers in one pass is a genuinely useful thing. A model that tells you how sure it is, and is wrong about that a third of the time, is a liability with an API.

Source: [Build your own decision model](https://nishtahir.com/build-your-own-decision-model/)
