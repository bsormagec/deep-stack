---
title: "The Most Useful AI Models May Not Be Chatbots"
dek: "Why fast, calibrated decision models deserve a place beside the LLM stack"
date: 2026-09-19
image: "/images/the-most-useful-ai-models-may-not.webp"
---
A lot of AI infrastructure is still built around asking a generative model to make tiny decisions. Route this ticket. Pick a label. Decide whether a request is risky. Return a tool call in exactly the right shape.
That works, until it doesn't. The model spends time generating words nobody needs, the API bill grows with every token, and a field called confidence often means little more than "this sentence sounded plausible."
A Hacker News post about Laya, an open source decision model from ConvAI Innovations, makes a useful case for a less fashionable approach: use a small non-autoregressive model when the job is classification, scoring, or routing. The interesting part is not that this replaces frontier models. It is that many teams have been using a much larger tool for a much smaller problem.
The expensive habit of asking for prose
Generative models are general because they generate. That is also the source of a lot of operational overhead. A support system may need one of four queues. A moderation service may need a boolean risk score. An agent may need to choose one action from a known set.
With an LLM, the usual pattern is to describe the task in a prompt, ask for structured output, parse the response, and handle the cases where the model is valid JSON but still wrong. Even when constrained decoding prevents malformed output, the underlying decision can remain poorly calibrated. A model saying 0.95 is not the same thing as a model whose 0.95 predictions are correct roughly 95 percent of the time.
Laya takes a different route. Its primitives are choice, score, and noul, a boolean probability. The model produces values from a fixed schema rather than a stream of tokens. That makes the output easier to validate and cheaper to run. It also changes what hallucination means. The system cannot invent a paragraph, but it can still choose the wrong class with high confidence. Narrow output is not the same as truth.
Speed is only half the argument
The Laya article reports a 32.8 millisecond median latency for one question on a GPU, and 7.2 milliseconds per question when ten questions are batched. Its comparison table puts TypeSafe Jev at roughly 236 to 276 milliseconds for a single question and about 1,500 milliseconds for ten serial questions.
Those numbers matter in high volume systems. A classifier that runs millions of times a day has a different cost profile from an assistant that answers a few thousand conversations. The open source model also removes the network hop and gives a team the option to run inside an air-gapped environment.
But latency is not the decisive question. The decisive question is whether the model is good enough for the decision being made. The author is clear about the limits. On a 77-label Banking77 task, Laya scores 0.425, while Jev scores 0.870. The model works better when the choice set stays under about twenty options, or when the problem is split into a hierarchy.
That caveat is more useful than another single benchmark win. Real systems have long tails, ambiguous labels, shifting distributions, and classes that nobody remembered to include in the first schema.
Confidence can fail before the model starts
The strongest technical point in the article is about language routing. In a 51-language sweep, the English checkpoint reportedly achieved zero accuracy on Khmer while keeping mean confidence at 0.952. Hebrew, Bengali, Hindi, and Armenian showed the same basic failure pattern: the model was confidently wrong because its tokenizer and representation were not suited to the script.
A confidence threshold cannot catch a model that does not know it is looking at the wrong language. Laya therefore routes text by Unicode script and Latin-language signals before the forward pass, selecting a multilingual checkpoint when needed.
The lesson reaches beyond this model. Confidence is not a universal safety layer. It is a property of a model on a distribution. If the input moves outside that distribution, a high score may tell you more about the model's habits than about the input.
The HN argument is really about packaging
The Hacker News discussion is split in a productive way. Some commenters point out that BERT-style classifiers, fine-tuned encoders, and zero-shot models have existed for years. Others argue that Jev's practical advantage is not the primitive itself, but a broadly capable model that works across domains without a custom training project.
Both views can be right. A technique can be old while a product built around it is useful. Engineers rarely buy an algorithm in isolation. They buy the defaults, the API, the documentation, the latency, and the amount of work required before the first reliable result.
That is why the original author is frustrated by the attention around Jev. Publishing a paper and model weights is not the same as explaining the product in a way that lands. Several HN comments make the point bluntly: the technology and the story are separate assets, and the better story often gets the first meeting.
A team that wants adoption should not assume technical priority will be discovered automatically. The model needs a clear boundary, a concrete comparison, and an honest account of where it fails. Laya's best argument is not "we invented System 1." It is "here is a narrow decision workload, here is the latency, here is the calibration, and here is where the model falls over."
Put the small model in the right place
I would not replace an LLM stack with Laya. I would put a decision model in front of it.
Use the cheap model for routing, filtering, guardrails, and repeated schema decisions. Escalate uncertain or novel cases to a generative model. Log the decision distribution, calibrate it on your own data, and test language and domain shifts instead of trusting one aggregate accuracy number.
Not every AI feature needs to generate language. Sometimes the right interface is a probability vector and a branch in application code. The hard part is deciding whether your team can define the choices clearly enough, and whether specialization costs less than calling a frontier model forever.

Source: [I built non-autoregressive decision models with RL a year ago. Then a frontier lab called it a breakthrough.](https://laya.convaiinnovations.com/)
