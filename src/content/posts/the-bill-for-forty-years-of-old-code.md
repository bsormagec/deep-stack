---
title: "The Bill for Forty Years of Old Code Just Arrived"
dek: "PHP2Shell turned a crash report from 2024 into a shell in two weeks of AI-assisted work — while the fix took four engineers two months. The debt was always there; AI just raised the interest rate."
date: 2026-11-04
image: "/images/the-bill-for-forty-years-of-old-code.webp"
---

The interesting thing about PHP2Shell is not that a critical vulnerability was found in one of the web's oldest workhorses. It is that the bug had been sitting there, reported and filed away, since 2024 — and it took an AI-assisted audit two weeks to turn it into a weapon. The debt was always there. What changed is the interest rate.

## A crash report that turned into a shell

PHP dates to 1994, and it still runs an enormous share of the web — WordPress and Drupal sites among them, which is why IEEE Spectrum's account of the vulnerability names NASA, Wikipedia, and the White House among the sites put at risk. The underlying flaw was a familiar, boring kind of defect: an out-of-memory error, where the memory allocated for a piece of data is too small to hold it. Normally that just crashes the program. Unpleasant, not dangerous. So the report sat.

Then, earlier this year, the cybersecurity firm Calif offered to independently audit PHP, sponsored by OpenAI. Within two weeks, a Calif researcher aided by AI tools found a way to use that out-of-memory bug to run arbitrary code on the host server — to install malware or read critical data. A crash became a shell. That is the whole story in one sentence, and it is why the vulnerability earned its name: PHP2Shell.

Columbia computer science professor Suman Jana, quoted by Spectrum, describes what exploiting the bug actually requires: carefully working out how to jump to a specific point in memory for a particular program running on the server, and which bits to overwrite in what order. "It's not really rocket science," he says. "It's just that it's a lot of very specific reasoning that is painful to do. And AI, I think, has done a very good job at that."

Note what Jana does not claim. He does not claim AI did it alone. The Calif researchers, he stresses, had deep knowledge of both security and PHP. His claim is narrower and more unsettling: AI lets the top 0.1 percent of experts get a lot more done, and it lets people just below that tier reach places they previously could not, "without understanding all the nitty-gritty details." The skill floor for turning a crash into an exploit just dropped. The backlog of crash reports nobody took seriously is now a menu.

## Finding is cheap. Fixing is not.

After the disclosure, a team of four engineers spent two months developing the patch. Two weeks to weaponize, two months to fix — and that ratio is the part builders should sit with. Jana names the asymmetry plainly: when you fix a bug, you have to close every part of the attack and break none of the existing functionality. Finding only needs one working path.

That asymmetry lands hardest on open-source software with no clear revenue stream despite being widely used. PHP is maintained by people whose funding has never matched its footprint, and the same is true of much of the stack underneath the modern web. The Hacker News discussion, which put the Spectrum piece at the top of the front page with 511 points and 346 comments at fetch time, kept returning to the same uncomfortable question: who pays for the maintenance of code everybody depends on and nobody owns?

The disclosure itself went about as well as these things can go. Researchers reported to the PHP Foundation, fixed versions shipped (8.2.35, 8.3.36, 8.4.27, and 8.5.12, per the Foundation's release notes), and the patch landed before any confirmed real-world exploitation. But the margin was thin. Amazon's threat-intelligence team later reported a single exploit attempt against a honeypot as early as October 17 — days before the public disclosure — and widespread attempts followed within hours of it. The window between "someone knows" and "everyone knows" is now measured in hours, and AI-assisted discovery is widening the front end of that window while the fix still takes two months of careful engineering.

## The debt was never free

Matt Suiche, AI security research lead at the startup Tolmo, put it bluntly to Spectrum: "One of the things we're witnessing now is that all the legacy software that was written by humans over the last 40 years is being exposed. Now it is time for the technical debt to be paid off."

That framing is worth taking literally. Technical debt is not a metaphor here; it is an unpaid bill with a due date that just moved up. Every crash report triaged as "just a crash," every legacy dependency pinned and forgotten, every upgrade deferred because the old version still works — each one was a bet that nobody would do the painful reasoning required to weaponize it. AI just repriced that bet. The reasoning is no longer painful enough to count on as a defense.

There are two honest responses, and Spectrum's reporting carries both. The optimistic one comes from Jana: give defenders the same tools. Frontier labs are already donating token budgets to hunt these bugs, and he argues that should grow into a concerted effort. He is also optimistic about formal verification catching up on the patching side — Anthropic's October 22 release, in his description, has one LLM generate the patch and another generate the proof that the patch is correct, with only the proof checker itself kept human, "because LLMs hallucinate. So, you want something that is formal." If finding becomes automatable, fixing has to become nearly as automatable, or the asymmetry only grows.

The pessimistic one comes from Johns Hopkins professor Matthew Green, and it is hard to argue with: "Nobody's going to fix this problem until something really bad happens. And PHP2Shell wasn't bad enough to be really bad." His prediction is that the bad event comes sometime in early 2027, and only then does the funding arrive. His advice in the meantime is unglamorous and correct: when a security update appears, install it. Do not wait until next week.

## For builders, the takeaway is practical

First, check what you are actually running. The PHP2Shell fix is version-specific, and for PHP 8.1 and below there is no upstream fix at all — only a vendor backport or a move to a supported branch counts. "We turned off the risky setting" is not a fix here; only the patched version is. If you cannot state your serving PHP version from the server itself rather than a dashboard, that is the first gap to close.

Second, re-triage your own backlog. The crash reports, the pinned dependencies, the "we'll upgrade when we have time" items — those are now the attack surface, and the cost of exploring them has collapsed for the other side. The question to ask of each deferred item is not "is it broken?" but "what happens if someone with an AI assistant and two weeks looks at it?"

Third, budget for the fix side, not just the find side. The two-weeks-to-two-months ratio is the real number in this story. Scanning is getting cheaper by the month; careful, regression-free patching is not. If your maintenance budget assumes the old ratio, it is already wrong.

PHP2Shell ended well: white hats found it first, the patch shipped, and as far as anyone knows, disaster was averted. Jana's closing line to Spectrum is the one to keep: "This won't be the last one for sure. It's just who finds it." The debt is being called in, in order, oldest first. The only decision left is whether you pay it on your schedule or someone else's.

Source: [PHP2Shell Is a Wakeup Call for AI in Cybersecurity](https://spectrum.ieee.org/ai-in-cybersecurity-php2shell-vulnerability?share_id=10159113)
