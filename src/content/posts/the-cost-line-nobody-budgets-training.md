---
title: "The Cost Line Nobody Budgets: Training Data"
dek: "*What the unsealed OpenAI briefs actually put a price on — and what builders should learn from them.*"
date: 2026-09-27
image: "/images/the-cost-line-nobody-budgets-training.webp"
---
The interesting thing about the unsealed briefs in the Authors Guild case against OpenAI and Microsoft is not that the companies trained on pirated books. That allegation has been public since the lawsuit was filed in 2023. The interesting thing is that the newly unredacted filings — plaintiffs' motions for partial summary judgment, unsealed September 17 and September 21, 2026 — show executives and researchers describing the practice in their own words, with a candor nobody shows in a press release. The people who built the models told each other exactly what they were doing. They just assumed the invoice would never arrive.

It has arrived, in several forms at once.

## What the filings actually show

The authors' brief, drawn from the plaintiffs' memorandum and statement of facts in *Alter v. OpenAI and Microsoft* (pending in the Southern District of New York as part of the multidistrict AI-copyright litigation, per the Authors Guild), assembles a timeline that reads less like a legal theory and more like a chat log with a discovery request attached.

Microsoft knew about OpenAI's use of LibGen — the Russian ebook piracy site — as early as April 2019, when Sam Altman and then-vice president Dario Amodei presented an early version of GPT-3 to Bill Gates and disclosed the use of LibGen to Gates and Microsoft CTO Kevin Scott, according to the brief. Internally, OpenAI's then-research director Amodei called the LibGen training set "a bit sketchier." Researcher Sam McCandlish's stated concern, in the brief's account, was not legality but optics: he worried that "'openai uses copyrighted data from sketchy russian website' showing up on Hacker News would be unfortunate."

When the lawsuit pressure grew, OpenAI tried to remove the traces. In an effort the brief calls "Project Clear," the company deleted its LibGen files in the summer of 2022 — with a June 15, 2022 Slack exchange in which an OpenAI corporate designee asked how concerned they should be about mentions of LibGen across docs, Slack, and GitHub, and VP of Research Bob McGrew replied that "now is the right time to excise Libgen from our systems and storage."

Then there is the part the brief uses to establish intent about market harm. OpenAI hired researcher Tarun Gogineni in 2022 to improve the writing quality of its models; his stated "research mission," quoted in the brief, was to have GPT models write the last two books of George R.R. Martin's *A Song of Ice and Fire* — he mused he would "rest easy knowing that even if GRRM dies early, GPT-5 will autocomplete his series." He was aware authors complained that the datasets were stolen and that authors were losing work to AI competition; he found those complaints not "all that sympathetic" and described them as "acceptable economic disruption," predicting a "death of the reader" as "machines creat[ed] slop for more machines."

That sounds like a caricature of a lab's internal culture. It isn't. It is evidence, filed in a summary judgment motion, and a hearing is expected in early 2027.

## The receipt, itemized

Two numbers have now attached themselves to this story, and both matter more than any quote.

The first is $1.5 billion — the settlement Anthropic reached with authors over pirated training material, reported in the summer of 2026 (per Authors Guild coverage and the case archive). It is the closest thing the industry has to a market price for skipping the licensing desk. Anthropic paid it; the OpenAI and Microsoft cases are still being litigated. Whether you read that number as justice or as the cost of doing business depends on your margins — but it is now a number, not a hypothetical.

The second is 87% to 93% — the fall in click-through rates to the New York Times's domains that Microsoft's own data reportedly showed when comparing Copilot answers against conventional Bing search, as cited in the news publishers' unsealed September 17 motion for summary judgment (via the dig.watch case summary). OpenAI senior executive Nick Turley wrote, in the brief's account, that "[o]ur products are largely substitutive, period," and Microsoft CEO Satya Nadella testified that chatbot conversations have "substituted" for publisher sites (per Bloomberg Law's coverage of the filings). Substitution is no longer a theory the plaintiffs invented; it is the defendants' own description of what they built.

None of this is a ruling. The cases are undecided, OpenAI and Microsoft maintain that training is transformative fair use, and — this is worth noting — the Trump administration's Justice Department filed a statement of interest this month urging the court to rule that training on copyrighted works is fair use (per Reuters coverage of the litigation). The DOJ split the question the way the publishers' brief does: defending training while declining to defend outputs.

## For builders, the takeaway is practical

Here is the part that applies whether you train foundation models or just fine-tune something smaller on scraped data: the legal exposure is being structured in stages, and you should structure your provenance the same way. The news publishers' brief divides the pipeline into five stages — acquisition, training, grounding, output, and transfer between the companies — and argues each fails the fair-use defense on its own terms (via dig.watch's analysis). That division mirrors the one courts already drew in the 2025 Anthropic authors' case between lawful acquisition and pirated copies.

Translated into a checklist, that means: provenance is a feature of your data pipeline, not a policy in your handbook. If you cannot show where a dataset came from, you have the OpenAI problem. If you deleted it after the lawyers asked — the "Project Clear" problem — you have a bigger one. The HN thread on these filings (543 points, 488 comments as of this writing) focused on the moral theater, and that is fine as color, but the builder's question is duller and more expensive: what does your training data's paperwork look like, and could you show it to a judge?

The honest cost of building AI models was always going to include the data. For years the industry treated that cost as zero because nobody sent a bill. The unsealed briefs are the sound of the billing department catching up — and the numbers on the invoice, $1.5 billion here, an 87–93% traffic collapse there, are the first reliable measurements anyone has of what "free" data actually cost.

That is the problem.

Source: Authors Guild, "Unsealed Briefs in Authors' Case v. Microsoft/OpenAI" (Sept 21, 2026); news publishers' unsealed summary-judgment motion (Sept 17, 2026), via dig.watch, Bloomberg Law, and Reuters litigation coverage.
