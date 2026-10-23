---
title: "The Cheapest Code Is the Code Nobody Has to Review"
dek: "## The door was already open"
date: 2026-10-12
image: "/images/the-cheapest-code-is-the-code-nobody.webp"
---
The interesting thing about the QGIS ban is not that an open-source project said no to AI. It is what the project tried before it said no.

QGIS, the open-source geographic information system used by governments and companies worldwide, already had an AI policy. QEP 408, adapted from LLVM's AI tool policy, was the reasonable middle position: use the tools if you want, review everything the model produces, disclose the assistance, and never let an agent speak for you unreviewed. That policy is now gone. In its place, QEP 428 states the opposite default: no LLM, AI, or agent-assisted code contributions are allowed in the main QGIS repository at all, and a contribution later found to have used one can be reverted, with the contributor's rights sanctioned.

The proposal, PR #387 opened by core contributor Nyall Dawson on September 24, 2026 (per the GitHub pull request), passed its discussion period on October 5 and was merged on October 7. A week later it sat at the top of Hacker News, with the submissions listing showing 303 points and 324 comments at the time of checking. Projects do not vote to reverse a considered policy, in public, over a minor annoyance. They do it when the first policy failed in practice.

Dawson said as much in the discussion. The earlier policy's process, in his account, clearly did not happen in reality: the review and disclosure steps the project had asked for were not reliably taking place. He also said the project had already lost at least one extremely high-value contributor as a result of the situation, and that the intent is to start with a closed door and selectively open it case by case later, for narrow uses such as autocomplete-style assistance or translations.

That sequence matters more than the ban itself. This is not a project that skipped the experiment. It ran the experiment, watched the costs land, and changed the rule.

## Generation got cheap. Review did not.

The maintainer case, stated plainly in the PR discussion by project member haubourg, is an arithmetic problem. The stream of AI-assisted contributions is higher than what human review can seriously take on. Review capacity did not scale with submission capacity, because review capacity is people — the same people, with the same hours, who were already busy before the models arrived.

That sounds like an argument about code quality. It isn't, mostly. It is an argument about where the cost of AI-written code actually sits.

Writing a patch used to be the expensive part, and its price acted as a filter. A contributor who spent three evenings on a change had usually read the surrounding code, run something, and thought about whether the project wanted it at all. A model removes that cost in minutes. What it does not remove is the cost of deciding whether the change is correct, consistent with the architecture, safe to maintain for a decade, and worth the project's attention in the first place. That cost stays exactly where it was, denominated in maintainer hours, and now it is charged on a much larger volume of submissions.

Every cheap generation technology eventually discovers its expensive complement. For AI code, the complement is comprehension. Someone trusted has to understand the change well enough to stake the project's name on it, and that someone is rarely the person who prompted it.

There is early evidence this is not just a QGIS mood. A summary published by explainx.ai of a Harvard study covering more than 700 firms reports AI coding agents producing roughly 30% more code with no gain in resolved issues, and pull-request merge time rising 49%. Treat that as a second-hand summary rather than a primary result, but the direction matches what maintainers keep describing from the inside: more code, arriving faster, taking longer to land.

## A ban is a pricing decision

Seen that way, QEP 428 is not really a statement about models. It is a pricing decision about reviewer attention.

A disclosure policy prices attention cheaply: anyone may submit, maintainers pay the evaluation cost, and the rules hope honesty keeps volume honest. QGIS found that this price was wrong for its reviewer pool. A ban reprices the transaction. The contributor must now do the work in the way the project can afford to evaluate — or not submit. The cost moves back to the side that generates the work, which is where it sat for the entire history of open source before 2023.

Other projects are making the same calculation and landing in different places, which is the useful part of this story. System76 published a similar ban for COSMIC pull requests on October 2, 2026, requiring contributors to certify that a pull request contains no LLM-generated content, with maintainer strain given as the reason (per XDA Developers reporting summarized by explainx.ai). The Linux kernel and Ubuntu, facing similar floods, have taken the opposite approach and accept AI-assisted content that meets their quality bar. The difference is not ideology. It is bench depth. A project with many experienced reviewers and strong automated gates can afford an open door. A project carried by a small group of maintainers cannot, and pretending otherwise does not create more reviewers.

The Hacker News discussion focused on enforceability, and commenters are right that there is no reliable detector for AI assistance. A ban like this cannot be proven line by line. But that misses what the rule is for. Norms in open source were never enforced by detection; they are enforced by trust and by consequences when trust breaks. The reversion-and-sanction clause is the tell: QGIS is not claiming it can catch everyone. It is stating what happens to the relationship when it finds out.

## The catch for everyone else

There is a version of this policy I would not defend, and it is worth naming. A total ban also excludes the careful contributor who uses a model the way QEP 408 imagined — drafts with it, reads every line, tests properly, discloses honestly. That contributor is real, and projects will lose some of their work. Dawson's case-by-case reopening is an acknowledgement of exactly that loss: the door is closed by default precisely so that exceptions can be granted where the review cost is known to be low, rather than the door standing open and every exception being paid for by maintainers by default.

The uncomfortable implication runs the other way, toward the rest of us who build with these tools inside companies. Internal code review has the same economics as open-source maintenance, with one difference: nobody gets to vote on a ban, so the cost accumulates quietly instead — longer review queues, thinner reviews, senior engineers spending their week reading code that a model wrote and a junior did not. QGIS could see its queue and act. Most teams just feel the queue getting slower and call it a busy quarter.

For builders, the takeaway is practical: measure your review capacity before you celebrate your generation capacity. If a tool doubles the code your team produces, it has not doubled anything you ship until the people who must understand that code have doubled too — and they will not. The projects that survive this transition will be the ones that price reviewer attention honestly, whether the price is a disclosure rule, a quality gate, or, as in QGIS's case, a closed door with a list of exceptions yet to be written.

The ban will be described as a project turning against the future. It is a project doing arithmetic in public.

Source: [QGIS bans AI assisted contributions](https://github.com/qgis/QGIS-Enhancement-Proposals/pull/387)
