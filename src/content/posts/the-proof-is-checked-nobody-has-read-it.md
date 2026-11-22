---
title: "The Proof Is Checked. Nobody Has Read It."
dek: "The machine verified the Riemann Hypothesis before any human understood the proof — and that gap, not the theorem, is the story."
date: 2026-11-22
image: "/images/the-proof-is-checked-nobody-has-read-it.webp"
---
## The announcement

On November 20, 2026, Levent Alpöge, a mathematician at Anthropic, announced that he and Claude had found a proof of the Riemann Hypothesis — and of its generalized form, for Dirichlet L-functions. There was no paper. There was no preprint, no 400-page PDF, no seminar talk. What Alpöge released was Lean code: a 14-part archive of 175,187 Lean files, roughly 17 million lines, which Alpöge himself says would run to more than 250,000 pages if written out as prose.

That sounds like a stunt. It isn't. It is the first time a result of this size has arrived in a form no human can read and a machine can check — and the checking, not the claiming, is what happened next.

Within about a day, the Lean and Mathlib communities published a joint statement, endorsed by the Lean FRO and the Mathlib Initiative, saying they have "full confidence that Alpöge's proof of the Riemann Hypothesis is correct." Andrew Sutherland at MIT ran the verification and published every receipt on his MIT page. All 175,187 modules compile under Lean v4.33.1 and Mathlib v4.33.1, with zero errors. The five headline theorems depend only on the three standard axioms — propext, Classical.choice, Quot.sound — and nothing else. An independent sandboxed rebuild of the archive reproduced the 61.5-gigabyte exported proof byte for byte. Then the independent checkers took over: nanoda, a Rust kernel written independently of Lean, accepted the full export in 27 minutes and 42 seconds on 80 threads. con-leche accepted 1,468,418 declarations in verified mode in 3 minutes and 15 seconds on 64 threads. lean4lean passed all 175,187 modules. The Lean kernel itself has already accepted every module from the compiled files; its replay of the full export is still running, single-threaded, because that is the slow part.

## What was actually proved

The five theorems are worth stating precisely, because precision is the whole point of a machine-checked proof. The first is the Riemann Hypothesis itself, in Mathlib's own definition: every zero of the zeta function other than the trivial zeros at −2, −4, −6, and so on has real part 1/2. The remaining four are the generalized form: no zeros to the right of the critical line for every Dirichlet L-function, and every zero inside the critical strip lying on the line, for every modulus and every character, primitive or not.

There is a scope note that matters. "GRH" here means Dirichlet L-functions only. Dedekind zeta functions, Hecke L-functions, and automorphic L-functions in general are not among the statements that were checked. Alpöge says he expects the Extended Riemann Hypothesis to follow with more time. That is a claim about the future, not a checked result.

And there is a second check that does not depend on Mathlib's definition of the zeta function at all. The proof was combined with an independent formalization of Robin's and Lagarias's criteria — inequalities about divisor sums, with no mention of zeta anywhere — and those came out true too. If you distrust the definition, the arithmetic consequences still hold. That is the kind of cross-check a human referee could never run in a lifetime, and a machine ran in an afternoon.

## The catch

Here is where the story turns, and where it gets interesting for anyone who builds things. On November 21, Jenny Lorraine Nielsen posted a paper on PhilArchive arguing the proof is invalid — not because the checkers are wrong, but because of what they check. Her claim is specific and code-checkable: a geometry predicate on the path to the headline theorem, called `anyGeometry`, is defined as a function returning `True` for every input. The witnesses built on it are vacuous by construction. A height equation holds by `rfl` — definitional equality — because the height is defined to be the formula it is later required to equal. The lemmas written to extract content from these witnesses, she says, are never called.

An independent audit on DEV opened the source and confirmed the definition verbatim, in the file it was claimed to be in. The joint Lean and Mathlib statement does not address the Nielsen paper. As of this writing, there is no public rebuttal from Alpöge or the Lean community.

This is not a ruling. Nielsen's paper is not peer-reviewed, and a definition returning `True` is not automatically a cheat — it can be a placeholder, or a step whose real content lives elsewhere. But the audit is falsifiable in a way most mathematical objections are not: open the file, read the definition, trace the dependency graph.

That sounds like a footnote. It isn't. It is the failure mode of the entire arrangement, stated in code.

## What the checkers certify, and what they don't

A kernel check answers a narrow question: does this term have this type, under these axioms, with no hidden assumptions? The answer here is yes, from several independent implementations, in several languages. That is a real achievement, and it is worth saying so before the rest. The verification that ran in about a day — dozens of people reproducing the same export, independent kernels, a sandboxed rebuild — is the most thorough mechanical audit any mathematical claim has ever received.

But a kernel cannot tell you whether a definition means what its name promises. The statement being checked is Mathlib's `RiemannHypothesis`, and that definition has been vetted by experts. The intermediate definitions — the geometry, the lattice, the height — are Alpöge's own, and their meaning is exactly what the Nielsen audit disputes. The checkers confirm the term has the right type. They do not confirm that the argument the term encodes is the argument a mathematician would recognize as a proof. That distinction is not a technicality. It is the whole ballgame, and it is the reason the Clay Institute still lists the problem as unsolved while the verification page says the proof is correct. Both can be true at once: the formal statement is checked, and the mathematical community has not yet reached consensus.

The Hacker News discussion, at 963 comments and still climbing, split along exactly this line. One professional mathematician wrote that he considers the Riemann Hypothesis proved, and that the Lean community's work over 24 hours "leaves little room for reasonable doubt" — and then added that he is "salivating at the prospect of learning why RH is true." Another put it more sharply: it is almost certainly proven, but it is not proven, because for that it needs to be understood, with a human-language explanation of how and why it works. The verification tells the community the effort of understanding is worth it. It does not replace the understanding.

## The meter moved

For builders, the takeaway is practical: the cost of checking has collapsed relative to the cost of understanding, and that changes what "done" means.

Consider the numbers. Checking a 61.5-gigabyte proof took nanoda under half an hour on 80 threads. Understanding it is a project with no known duration — Alpöge himself says he has not mastered the neighbourhood around the mathematics yet, and that he presented the world with a complete argument before having done so. The proof's own timeline runs from October 6 to November 16: six weeks from a Stepanov determinant to a chain of theta lifts of length √X, with Claude, in Alpöge's words, flying and dancing and sparkling near the finish line.

The checks were run with Claude Code, per Sutherland's page. The loop is closed: the model helped write the proof and helped run the verification.

That is the new shape of a result. A proof nobody can read is a dependency nobody can audit, and the audit surface has moved from the argument to the definitions. In a 400-page human paper, the failure mode is a gap on page 253 that takes years to find. In a 17-million-line formalization, the failure mode is a definition that returns `True` — findable in minutes, once someone thinks to look. The Nielsen audit took a day. The verification took a day. The understanding will take years, if it comes at all.

There is a version of this future I would use without hesitation: formal verification as the default receipt for any claim too large to referee by hand, with the definitions themselves under the same scrutiny as the theorems. But a receipt is not a review. The machine checked the proof. Nobody has read it. Until someone does, the most honest sentence about the Riemann Hypothesis is two sentences, held at once: the formal statement is verified, and the mathematics is still to come.

That is the problem.

Source: [Lean verification of the Riemann Hypothesis](https://leanprover-community.github.io/blog/posts/riemann-hypothesis/)
