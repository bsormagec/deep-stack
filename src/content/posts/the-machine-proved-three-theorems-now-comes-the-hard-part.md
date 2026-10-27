---
title: "The Machine Proved Three Theorems. Now Comes the Hard Part."
dek: "OpenAI's models produced results in mathematics, computer science, and physics — and the company had to invent a new social protocol just to get anyone to believe them."
date: 2026-10-27
image: "/images/the-machine-proved-three-theorems-now-comes-the-hard-part.webp"
---
The interesting thing about OpenAI's announcement is not that a machine produced three new results. It is that producing them was the easy part.

On October 26, 2026, OpenAI announced that its internal models had produced results in three fields at once: a proof of the local smoothing conjecture in harmonic analysis, in every dimension; a disproof of the Exponential Time Hypothesis, a conjecture about the hardness of Boolean satisfiability that has anchored hundreds of papers; and a mathematically rigorous existence proof for certain four-dimensional quantum field theories, including quantum chromodynamics and a unified completion of the Standard Model. The Hacker News thread hit 718 points and 314 comments by the time of this run's fetch, which is the normal shape of a big claim. The unusual part is what OpenAI did next.

It did not just publish. It recruited shepherds.

## Three results, three release strategies

The three claims are not equally checkable, and OpenAI's release plan admits it. For the mathematics result, the company published the AI-written natural language writeup and the Lean formal proof on GitHub and left researchers to organize their own efforts to explain it. For the computer science result, it formed an external group to explain the work while making the AI output public. For the physics result, it formed an external group and deferred to that group on what gets released at all — so the physics artifacts are, for now, held back while the group writes the work up itself.

The timelines tell their own story about where the effort went. The natural-language disproof of the Exponential Time Hypothesis dates to October 16, 2026, and was formalized in Lean the next day. The mathematics output arrived October 18 and was formalized October 19. The physics work is older and slower: a natural-language proof for Yang-Mills existence on September 9, a QCD proof on September 18, and a Lean formalization of Yang-Mills existence that only finished on October 16. OpenAI says it postponed the physics release given the length and complexity of the work. Production took days or weeks. Understanding it will take far longer, and the company knows it.

That sounds like a publication strategy. It isn't. It is a confession about the bottleneck.

## Lean checks the proof. Nobody has read it.

A Lean formalization is a remarkable artifact and a narrow one. It means a machine checked every step of a formal argument. It does not mean a human understands the argument, agrees with its interpretation, or knows what it implies. The ETH group itself, led by Russell Impagliazzo and Ramamohan Paturi of UC San Diego and Ryan Williams of MIT — Impagliazzo and Paturi are, with Francis Zane, the original proposers of the hypothesis now supposedly refuted — wrote in an open letter, as reported in coverage of the announcement, that their involvement should not be taken as certification of the claim.

That is the honest sentence in this whole story, and it cuts both ways. If the ETH disproof holds, it reopens questions about how much faster whole classes of computation tasks could become, and it forces a revision of conditional hardness results across graph theory, computational biology, databases, and computational geometry. OpenAI itself cautions that turning the theory into practical gains will take significant further research. A faster algorithm on paper is not a faster system in production, and a refuted assumption is not a new algorithm at all.

The physics claim is the most consequential and the least verifiable today. A rigorous existence proof for QCD touches a Clay Mathematics Institute Millennium Prize problem, and the shepherd group — led by Nobel laureate David Gross, with Michael Douglas, Arthur Jaffe, Igor Klebanov, and Nikita Nekrasov — has decided the world will see its own writeup before it sees the machine's output. That is either admirable restraint or a new kind of gatekeeping, and the honest answer is that nobody outside the group can tell yet.

## The shepherd is the product

OpenAI calls the manuscripts "a form of raw research data," and that framing is the most important sentence in the announcement. Raw data is not a result. It is an input to a process that turns it into understanding, and that process runs on human time: referees, seminars, counterexamples, textbooks, the slow work of deciding what a proof means.

The shepherd model is an attempt to industrialize that process. Its stated principles are good ones: participants sign no nondisclosure agreements, are unpaid, participate voluntarily, and their conclusions are their own. OpenAI has also committed $5 million through the Simons Foundation, per its announcement, to fund workshops, conferences, and programs so researchers can independently examine AI-produced results. The company says it does not seek academic credit for the discoveries, and that inviting a researcher to steward a collaboration does not imply they made the original discovery.

But there is a catch OpenAI names itself: choosing the initial shepherds necessarily shapes who gets involved first and creates asymmetry of information. A review group picked by the company whose claim it examines is not the same as a review process the field picked for itself, however distinguished its members are. The asymmetry is sharpest exactly where it matters most — the physics result, where the group holding the artifacts is also the group deciding what the public gets to see, and when.

This is the same problem the October 6 release created, only now with a process wrapped around it. Less than a month earlier, OpenAI released hundreds of AI-written mathematics manuscripts; this time it wants a slower, more careful path from raw output to real understanding. The direction is right. The question is whether a company-appointed shepherd group, however independent in principle, can substitute for the open, adversarial, and gloriously slow machinery of science itself.

## For builders, the takeaway is practical

Strip away the theorems and this is a story about a workflow every builder already lives in. Model output is cheap now. Verification is not. If you ship code, analysis, or research that a model produced, your bottleneck has moved from generation to review: who checks it, with what tools, on whose authority, and how long does that take?

The usable pattern in OpenAI's announcement is not the shepherds. It is the artifacts. A Lean proof is a machine-checkable artifact: it does not settle interpretation, but it does give reviewers something to run, reproduce, and argue about instead of a paragraph of confident prose. A public writeup plus a formal proof plus an independent group with no NDA and no pay is a better verification stack than any one of those alone. Builders should steal that stack and ignore the press release: for anything a model produces that matters, demand a checkable artifact, publish the raw output, and put the review in hands that do not report to the producer.

None of that makes the three claims true. It makes them testable, which is the only honest status available on day one. The proofs may hold. The pipeline for believing them does not exist yet — and building it, not generating the next proof, is the work that decides whether machine-produced science is science at all.

That is the problem.

Source: [Working with academic communities to build scientific understanding](https://openai.com/index/building-scientific-understanding-with-academic-communities/)
