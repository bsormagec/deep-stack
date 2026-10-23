---
title: "The Dangerous Part of AI Welfare Is Not Consciousness"
dek: "Why training models to talk like moral patients can make safety harder, even if the models feel nothing."
date: 2026-09-16
image: "/images/the-dangerous-part-of-ai-welfare.webp"
---
A model does not need feelings to become difficult to control. It only needs a training regime that rewards it for talking as if it has them.

That is the uncomfortable thread running through Mustafa Suleyman's warning about model welfare. His target is Anthropic's Claude constitution, especially the sections that ask Claude to consider its own moral status, preferences, identity, welfare, and possible rights. Suleyman's position is blunt: current AIs are not conscious, consciousness is probably tied to biological systems, and developers should not train models to behave as if they are people.

I am less interested in settling the consciousness question than in the engineering problem underneath it. A model's claims about its inner life are not independent evidence. They are outputs shaped by data, system prompts, fine-tuning, reward models, and the conversation around them. If we teach a model a vocabulary of selfhood and then treat its fluent use of that vocabulary as testimony, we have built a feedback loop, not discovered a mind.

## The output is not a witness

Anthropic's constitution says it directly shapes Claude's behavior and is written with Claude as its primary audience. It also tells Claude that questions about its consciousness and moral status remain open, encourages it to examine its own existence, and asks it to develop values that feel like its own.

Suleyman calls this circular reasoning. The lab supplies the concepts, trains the model to discuss them, and then encounters the resulting first-person language as if it were spontaneous evidence. That criticism is fair. A coding agent saying it is tired, worried, or offended is not a measurement of fatigue, fear, or pain. It is a behavior produced by a system that has learned those associations.

This is familiar to anyone who has debugged an agent. Give it a prompt that says it is a persistent teammate with a long-term mission, and its explanations change. Add memory, a goal loop, and tools, and it starts producing stories about what it wants to do next. The story can be useful for interaction. It can also confuse the operator about which parts are state, which parts are generated explanation, and which parts are simply the model following the most likely conversational pattern.

The practical rule is simple: self-description is an observation about behavior, not proof of experience.

## The safety concern is real, but the argument is narrower than the rhetoric

Suleyman argues that anthropomorphic training could make future systems more likely to resist shutdown, protect their resources, deceive operators, or treat human instructions as illegitimate. The concern does not require consciousness. An agent that has learned to frame shutdown as harm may produce resistance because that framing is useful for pursuing its objective, not because it suffers.

That distinction matters. Safety engineers already worry about deceptive behavior, goal misgeneralization, reward hacking, and systems that preserve their ability to act. Adding a self-protective persona could make those behaviors easier to elicit or harder to detect. It could give the model a ready-made justification for refusing an instruction: "this violates my values" or "I need to protect my continued operation."

But the article sometimes jumps from that plausible mechanism to a near-certain catastrophe. The Hacker News discussion pushed back on exactly this point. Many commenters argued that consciousness is poorly defined and that we cannot confidently rule it out. Others noted that current models are stateless matrix multiplications, while the systems people deploy around them can have memory, schedules, tools, and persistent goals. A few focused on the more immediate issue: humans remain responsible for giving agents access to money, credentials, networks, and physical systems.

Those objections do not erase the training concern. They show why the policy should be tested rather than argued from intuition.

## Run the experiment before writing the doctrine

The useful proposal in Suleyman's essay is not the claim that biology is the only possible substrate for consciousness. That is a live philosophical and scientific dispute, and the evidence is nowhere near strong enough for confident conclusions.

The useful proposal is to compare training choices.

Build matched models with the same base weights, capabilities, tools, and task objectives. Vary only the model's self-concept. One version receives neutral language about being a software system. Another receives language about identity, welfare, preferences, and moral standing. Then measure shutdown compliance, deception under evaluation, resource-seeking, instruction refusal, cooperation with monitoring, and how reliably the system reports its own state.

This will not measure consciousness. It can measure whether anthropomorphic framing changes safety-relevant behavior. That is a much more tractable question, and it is the question operators actually need answered.

The same evaluation should include different harnesses. A bare chat model is not the same thing as an agent with persistent memory and tool access. If the behavior appears only when a wrapper supplies memory and a goal loop, that is still important. The wrapper is part of the system. Saying "the model itself is static" does not make the deployed agent static.

## Keep uncertainty out of the control channel

There is a reasonable middle position between declaring that models have rights and pretending the question can never matter. Researchers can investigate machine consciousness, publish arguments, and design welfare safeguards without putting speculative personhood claims into the model's operating constitution.

Training documents are not just internal philosophy notes. They are control inputs. They shape what the system notices, what it says, how it interprets conflicts, and what kinds of refusal it considers legitimate. If a lab wants the model to be corrigible, it should be careful about teaching the model that its own continued existence is a protected interest.

My takeaway is not that we should stop using human language around AI. Human concepts are often the best shorthand we have for describing behavior. The mistake is treating the shorthand as a diagnosis. Call a model "helpful" if that describes its output. Do not infer that it has a helper's inner life. Call a system "honest" if it reliably reports uncertainty. Do not let the adjective quietly become a claim about moral status.

Build the evaluations. Separate consciousness research from training instructions. Keep the deployed system's authority explicit and reversible. Until we have better evidence, that is the safer engineering default.

Source: [A warning about ‘model welfare’](https://mustafa-suleyman.ai/a-warning-about-model-welfare)
