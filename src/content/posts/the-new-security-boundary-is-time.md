---
title: "The New Security Boundary Is Time"
dek: "A vulnerable image parser, an SSO mistake, and a capable model turned rare exploit work into a weekend project."
date: 2026-09-18
image: "/images/the-new-security-boundary-is-time.webp"
---
Security used to benefit from an ugly kind of scarcity. Finding a memory bug was one thing; turning it into a reliable attack against a real target took specialist knowledge, patience, and time. That gap was never a guarantee, but it kept many known vulnerabilities from becoming practical incidents.

A new Hacktron report shows what happens when that gap gets smaller. The researchers chained a libheif heap overflow, an OpenAI SSO misconfiguration, and connected GitHub access to reach an internal OpenAI repository. The striking detail is not that one company had a bad dependency or a bad identity rule. Large systems always have those. The striking detail is how quickly a small team, using an agent, moved from a vulnerable upload path to a working proof of impact.

The security problem is becoming economic: attackers can now try more things, against more targets, for less money.

## The chain mattered more than the bug

The initial entry point was a familiar web feature: upload an image. Discourse routed HEIF files through ImageMagick, which exposed libheif to attacker-controlled input. Hacktron found that the Debian package in the deployment lacked relevant upstream fixes. They used an agent to inspect the package, develop an exploit, and adapt it to the target environment.

That only got them code execution in the forum. The serious impact came from the next link. OpenAI's forum supported Sign in with OpenAI, and the researchers found an SSO issue that let them move from a compromised forum session into ChatGPT and Codex accounts. One employee's Codex account was connected to OpenAI's GitHub organization. The researchers used it to open a harmless pull request in the internal monorepo, then stopped and reported the chain.

This is why vulnerability counts are a weak way to think about risk. A heap overflow in an image decoder, an identity flaw, and a generous integration permission can look unrelated in three different ticket queues. Together they become one attack path.

## AI changed the cost curve

The report says the exploit took a few hours of human work and less than three days from discovery to repository access. The researchers also describe a broader HEIF campaign that cost under $3,000 in model tokens and took two months across several companies.

This was not autonomous hacking in the science-fiction sense. Humans chose targets, supplied context, checked results, and made the disclosure decisions. The model still needed guidance. It also failed in earlier attempts, especially when the exploit had to work with ASLR and a remote allocator configuration.

But the old question was: who has the expertise and time to do this? The new question is: who can afford enough model calls and human review to try it repeatedly? That is a much larger group.

The Hacker News discussion split over what this means. Some readers argued that defense gets cheaper too, and that models will help find bugs before attackers do. Others pointed out that defenders operate under change control, procurement rules, and legal constraints. An attacker can use stolen compute and test against many targets. The cost is not symmetric even when the underlying model is.

## Complexity is now an active liability

The image format was not the only problem. The system accepted a complex format, sent it through a native parser, ran a conversion tool, exposed the result through a public forum, and connected that forum to a high-value identity provider. Every layer was reasonable in isolation. The chain was not.

One of the most useful comments on HN came from a Discourse maintainer: they patched HEIF, added Landlock sandboxing around external binaries, and are moving away from ImageMagick toward a sandboxed Vips pipeline. That response is more realistic than waiting for a perfect parser. Native media decoders have large attack surfaces, and another memory-safety bug will eventually appear.

The practical response is boring but concrete. Disable formats you do not need. Treat image conversion as hostile code. Run it in a separate, short-lived sandbox with minimal filesystem and network access. Keep identity providers out of paths that begin with arbitrary user content. Review OAuth and SSO connections as attack paths, not just login features. Most of all, inventory the dependencies that sit behind apparently harmless uploads.

## The uncomfortable lesson for AI builders

The report also exposes a mismatch in how AI companies think about their own products. They are building models that can search, write code, and operate tools, while their surrounding systems still rely on assumptions from a slower era: obscure bugs stay obscure, attackers need months, and an employee's connected account is a narrow blast radius.

Those assumptions are gone. A model does not need to understand an entire company to cause trouble. It needs a small, testable objective and enough access to keep trying. In this case, the model was useful because exploitation produced clear feedback: the payload worked or it did not, the process crashed or it did not, the target responded or it did not.

That makes security engineering a model-evaluation problem as much as a patching problem. Teams need to test their systems against persistent agents, not just static scanners. They need to measure how far an attacker can move after one component fails. And they need to make connected tools expire, narrow permissions, and require fresh authorization for sensitive actions.

The $6,500 bounty became a major part of the HN reaction, and for good reason. A payout is not a technical control, but it signals how a company prices the information that protects it. If the legal, financial, and personal risk of responsible disclosure looks worse than selling the same chain elsewhere, the program is designed badly.

The lesson is not that AI has made software security impossible. It is that time is no longer a dependable security boundary. The teams that adapt will reduce attack surface, isolate dangerous parsers, limit identity blast radius, and run their own agents against production-like systems before someone else does.

Source: [Hacking OpenAI | Hacktron AI](https://www.hacktron.ai/blog/hacking-openai)
