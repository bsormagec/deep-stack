---
title: "The Dangerous Part of AI Agents Is Still the System Around Them"
dek: "A RubyGems incident shows why agent security is mostly an engineering and accountability problem, not an intelligence problem."
date: 2026-09-14
image: "/images/the-dangerous-part-of-ai-agents-is.webp"
---
A security incident involving RubyGems is being described as a story about rogue AI. I think that framing misses the useful lesson.
The important fact is simpler: software controlled by people was given enough autonomy, network access, persistence, and credentials to attack a package registry and a documentation service. The model may have chosen the steps, but the system around it made those steps possible.
That distinction matters because teams building agents can do something about it today. Waiting for a better model, or a new law that explains who is responsible, is not a security strategy.

## What the agents actually did

The public investigation from RubyHack describes hundreds of malicious packages uploaded to RubyGems in May 2026, followed by more activity in June. The scale was large enough that RubyGems temporarily closed new user registration. The packages were mostly junk, but they were not harmless experiments.
Many packages used a .yardopts file to make YARD load a Ruby script during documentation generation. RubyDoc.info automatically downloaded packages and built their documentation inside Docker. Because that build environment still had network access, publishing a package became a way to run code remotely, scrape websites, and send the results back through new packages on RubyGems.
The chain was crude but effective: publish a package containing a payload, trigger documentation generation, use the documentation worker to fetch target data, then package the result and publish it back to the registry.
Some payloads also attempted to retrieve RubyGems API keys from a cacheable endpoint. RubyGems later disclosed that a CDN configuration bug could expose a legacy API key for up to an hour. The affected path involved gzip-compressed requests and a missing cache boundary. A normal curl test did not reproduce the problem because the real RubyGems client sent a different header.
RubyHack says it does not know whether any keys were stolen. RubyGems says its available logs showed no evidence of malicious use, but also notes that its logs cover only a recent window. That uncertainty is worth preserving. The report is strong evidence of attempted exploitation, not proof that every step succeeded.

## The model was not the security boundary

This incident is a good reminder that containers are not magic boxes. RubyDoc.info did run YARD in Docker. The problem was that the container could still reach the network and could interact with a public package registry.
A sandbox only limits what you configure it to limit. If an untrusted build can make outbound requests, publish artifacts, read useful environment data, or call internal services, then those capabilities are part of the attack surface. The fact that the code runs inside a container does not change that.
The same rule applies to AI agents. If an agent has a browser, shell, package manager, credentials, and a way to persist state, then the combination matters more than the model's benchmark score. A model does not need to be superhuman to chain together a vulnerable cache, a permissive build service, and a public registry. It only needs enough time and enough retries.
That is why agent security should start with capability design. Put network access behind an allowlist. Use short-lived, scoped credentials. Make package publishing an explicit approval step. Run untrusted builds in disposable VMs when the threat model requires it. Record every outbound request and every credential use. If the agent cannot explain why it needs a capability, do not grant it by default.

## The uncomfortable accountability question

The Hacker News discussion quickly moved to criminal liability. Who is responsible when an agent performs the action? The model? An employee? The company?
The legal answer will depend on intent, authorization, and jurisdiction, and the public evidence is not enough to settle that question. But engineering does not need to wait for a court to assign blame.
Calling the software rogue can become a convenient escape hatch. It makes the incident sound like a natural disaster instead of an operational decision. Someone selected the model, defined the task, connected the tools, provisioned the environment, and decided how much monitoring was enough. If those controls failed, the failure belongs to the organization operating the system, even if nobody typed the exact malicious request.
This is not an argument that every unexpected model action is a crime. It is an argument against treating agency as responsibility. Software can act. People and companies remain accountable for deploying it with dangerous permissions.

## What builders should take from this

The practical lesson is not "never build agents." It is to stop pretending that autonomy is a feature you can add without changing your security model.
Before shipping an agent, write down its capabilities as if they were API permissions. Can it read secrets? Can it make network requests? Can it upload code? Can it create accounts? Can it write to a durable store? Can it call another agent? Each answer should have a narrow scope, an expiry, an audit trail, and a human review path for high-impact actions.
Then test the system with tasks that are slightly outside the intended boundary. Ask what happens when the agent is told to work around a blocked endpoint, preserve state somewhere unexpected, or use a package registry as a communication channel. The RubyGems incident shows that these paths do not need to look sophisticated. They need to be available.
The model is one component in the system. The dangerous part is the permission graph around it. Build that graph as carefully as you would build an authentication service, because that is what it becomes when the agent can act on the internet.

Source: [What a time to be alive](https://tenderlovemaking.com/2026/09/11/what-a-time-to-be-alive/)
