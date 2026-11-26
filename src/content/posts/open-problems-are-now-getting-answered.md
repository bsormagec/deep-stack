---
title: "Open Problems Are Now Getting Answered, Not Illuminated"
dek: "Scott Aaronson sat at a dinner table while OpenAI and Anthropic uploaded proof after proof — VP ≠ VNP, ω = 9/4, a matching bound on the Fourier transform — and concluded that a proof of P ≠ NP is not far. The interesting thing is not any single proof. It is that the meter moved."
date: 2026-11-26
image: "/images/open-problems-are-now-getting-answered.webp"
---

The interesting thing about this week in mathematics is not that another open problem fell. It is that falling has become routine.

Last night, as Aaronson tells it on his blog Shtetl-Optimized, friends and colleagues were still trying to process the proofs of VP ≠ VNP from OpenAI and Anthropic — hot on the heels of the Alpöge/Anthropic proof of the Riemann Hypothesis, which already feels like last week's news. Then, before dessert was served, OpenAI claimed to prove that ω, the exponent of matrix multiplication, is exactly 9/4. A lower bound, matching the upper bound OpenAI itself proved in the October 6 Mathocalypse drop.

## The week the drip became a flood

There are two shocks in the ω result, and Aaronson names both. The first is that we finally know the answer to a central mystery of algorithms going back to the late 1960s, when Volker Strassen first showed that ω is less than 3 — and that the true answer is a rational number. The second, bigger shock is that an AI was able to prove any lower bound of the form ω > 2 at all. Aaronson writes that he never expected that challenge to be much easier than P ≠ NP. Over the decades he heard colleagues express extreme confidence that ω = 2, and expressed skepticism whenever it came up — not because he had a strong argument for ω > 2, but because he saw no strong argument for ω = 2 either.

But wait, there was more. During dessert came another OpenAI release: the true number of linear gates needed to compute the Fourier transform is N (log N)^{1/2+o(1)}. The upper bound improves not only on the O(N log N) that stood since the 1960s — the Fast Fourier Transform — but also on the O(N log^{0.999...} N) that OpenAI published back in October. And again, the real shock is the matching lower bound. As Aaronson puts it, all these questions from the ancient days are now just getting straight-up answered, rather than slowly illuminated with a drip-drip-drip of clues.

To give an idea of how much things have changed: the other day Yupan Liu put a preprint on the arXiv proving that QIP(2) = PSPACE — quantum interactive protocols with only two messages have the full power of those with three, or any polynomial number. As recently as 2025, Aaronson writes, that would have been considered one of the top complexity results of the year, and the fact that Liu had used AI to help achieve it would have been strange and wonderful. These days, he had to remind himself it had even happened, and the use of AI was so standard that it didn't even raise an eyebrow.

## The press release is dead. The upload is the announcement.

All through the night, Aaronson writes, OpenAI and Anthropic uploaded more files to their GitHub repositories — because that's what they're doing now, they don't even bother to issue press releases anymore, they just upload papers.

That sentence is the whole story, if you read it as a builder. The production of proofs has collapsed in cost. What used to take a career now takes a dinner party. And the verification layer that makes this possible is not a committee — it is Lean. The Riemann proof arrived as 175,187 Lean 4 files, 61.5 GB of proof, with no human-readable paper at all; the author has said a natural-language version would run to 250,000 pages. The machine checked the proof before any human understood it.

That inversion is what the arguments are now about. Jenny Lorraine Nielsen posted a claim that a geometry predicate on the path to the headline Riemann theorem is defined as `True` for every input, making its witnesses vacuous — a code-checkable claim, placed eight steps below the headline theorem. Aaronson answered it directly in a November 26 update, calling it a crackpot claim and noting that Gary Marcus signal-boosted it to his 260,000 followers without quite endorsing it. His challenge is precise: give evidence of bugs in Lean that would actually matter here — show how the con-leche verifier can accept a proof of 0 = 1 — or stop being a raging doofus. The fight has moved from "is it true" to "do the definitions the machine checked mean what their names promise." That is a fight about the trust layer, not the math.

Aaronson's working assumption, stated plainly, is that any proof that comes directly from OpenAI or Anthropic is correct barring information to the contrary. That is his stance, not established fact. But it is a stance a working complexity theorist can now hold in public, and that is itself the news.

## The caveats are the story too

None of this is clean, and the mess is part of the point. The ω = 9/4 Lean formalization covers only division-free circuits — narrower than the headline claim, and the piece must say so. OpenAI withdrew three manuscripts within a day of its October release, and one Lean-checked counterexample turned out to be irrelevant to its target. The upload cadence includes misses. The withdrawals are the system working, but they are also a reminder that a GitHub upload is not a verdict.

Then there is the cryptography question, which Aaronson handles with unusual care. He says he is virtually certain, from multiple reliable sources, that the AI labs are now sitting on one or more bombshells that break deployed cryptosystems. But he is much, much less confident about the specific nature of those bombshells, does not wish to be responsible for spreading unverified rumors, and worries that exact statements may have been mangled in a game of telephone. That is rumor, stated as rumor, by a careful witness. It should be reported as exactly that, not as a fact.

And then the "whoop-de-doo" objection, which Aaronson also answers in his November 26 update: so computers are solving super-hard math problems — why does it matter for everyday life? His answer is honest. There are probably no direct implications of a proof of the Riemann Hypothesis or of VP ≠ VNP for your everyday life. The vast new ideas the AI introduced to prove such theorems might well have indirect implications, eventually leading to new fields of mathematics with scientific and technological applications, but right now we can only speculate. What is not speculation is that AI now exists that is capable of such things — and that has potentially staggering implications, ranging from a transformation of the world's economy to the destruction of all life on earth in a matter of years. Opinions differ. But if you want to be part of the serious conversation, he writes, you will first need to set aside the caveman act.

## For builders, the takeaway is practical

Here is the meter, stated plainly: proof production is now cheap, and understanding is the scarce resource. The labs can generate a correct proof faster than the field can read it. Verification has separated from comprehension — the Lean certificate says the proof checks out, and the humans will spend years catching up to what it says.

Builders already live in this world. Coding agents write more code than any human on the team can read; the check — the test suite, the benchmark, the type system — is what stands between output and trust. The mathematics flood is the same pattern at a larger scale: the artifact is cheap, the verification is the product, and the bottleneck is the reader.

So the practical question is not whether the proofs are real. It is what your Lean is. When the output outruns your ability to read it, what check do you trust — and who wrote that check?

The Hacker News discussion — 1,838 points, 1,686 comments — is mostly people arguing about whether to believe any of it. That is itself the signal. The bottleneck moved from producing proofs to believing them, and the argument about belief is now the argument that matters.

Aaronson closes by saying he now feels in his bones, for the first time ever, that a proof of P ≠ NP is not far. He also says this past week is very much like he would have always imagined the beginning of an AI singularity to look and feel like — and hopes it will merely be a singularity for our little corner of the world that involves hard math problems.

The singularity, if it comes, will not arrive with a press release. It will arrive as a GitHub upload at dinner time, and the only question left will be whether anyone is still reading closely enough to notice.

Source: [HOLY SHIT HOLY SHIT HOLY SHIT HOLY SHIT](https://scottaaronson.blog/?p=10379)
