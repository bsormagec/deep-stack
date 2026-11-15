---
title: "The Hawks Were Flying in Formation"
dek: "A federal judge says the three companies that make nearly all the world's memory plausibly cut supply together. For anyone running models on hardware they own, the price of RAM was never just a market."
date: 2026-11-15
image: "/images/the-hawks-were-flying-in-formation.webp"
---
The interesting thing about the DRAM case is not the court date. It is that the scarcity behind the meter may have been coordinated.

On November 14, U.S. District Judge Noël Wise of the Northern District of California refused to dismiss a proposed class action accusing Samsung, SK Hynix and Micron of conspiring to restrict the supply of conventional DRAM and shift capacity to high-bandwidth memory instead. The suit, filed June 25, 2026 by 17 consumers and small businesses from five states, alleges an agreement in violation of Section 1 of the Sherman Act. The allegations have not been proven. At this stage the judge only had to decide whether they were plausible enough to proceed. She found they were, and denied the companies' joint motion to dismiss in full.

That sounds like a routine pleading decision. It isn't. The three defendants controlled more than 91 percent of global DRAM revenue as of the third quarter of 2025, according to the complaint. When three companies hold that much of a market, the difference between a shortage and a decision is the whole story.

## What the complaint says happened

The timeline in the complaint is simple. The three companies allegedly cut production starting in late 2022 and, beginning in 2023, shifted capacity to HBM — high-bandwidth memory, the specialized DRAM that sits next to AI accelerators. HBM needs roughly three to four times the silicon wafer area per gigabyte compared with conventional DDR5, according to the complaint. Every wafer that goes to HBM is a wafer that does not become the DDR5 in a desktop, a laptop, or a server.

Conventional DRAM prices rose 171.8 percent in one year to the third quarter of 2025, the complaint alleges, and 697 percent over 18 months. Yet not one of the three defendants expanded or announced plans to meaningfully expand commodity DRAM production capacity. That is the detail that does the most work in the ruling. Prices nearly tripled and nobody built more of the thing whose price had tripled.

The judge's reasoning turned on what antitrust lawyers call plus factors: facts that suggest parallel conduct is an agreement rather than three competitors independently reading the same market. She credited several. All three signed long-term contracts locking in HBM supply. Samsung and SK Hynix reportedly refused long-term agreements with major conventional DRAM customers. Micron announced on December 3, 2025 that it would close Crucial, its 30-year-old consumer brand. The companies allegedly delayed or halted new DRAM plants, and adopted near-identical customer-vetting practices in January 2026. She also counted the companies' alleged same-quarter 2025 decisions to wind down DDR4 — older, slower DDR4 had, the complaint alleges, come to cost more per gigabyte than newer, faster DDR5.

These moves, she wrote, are "difficult if not impossible to unwind" and "the sort that at the pleading stage, it appears no reasonable firm would make without a prior agreement." She rejected the companies' explanation that booming AI demand explains the vetting, noting that the vetting began after the AI boom and the HBM pivot were already underway.

She was also careful about what she did not credit. The judge gave no weight to investor statements about "supply discipline," including a 2022 Micron reference, finding them too similar to statements the Ninth Circuit had already held insufficient in the earlier case. She gave no weight to executives meeting at industry conferences, and called the market's oligopolistic structure neutral in the analysis. The case survived on the conduct, not on the talk.

## This is not the last DRAM case

The companies argued the suit was a rerun of DRAM II, in which the Ninth Circuit in 2022 affirmed dismissal of claims against the same three companies over alleged supply restriction in 2016–2018. Judge Wise disagreed. "The Court finds that it is not," she wrote.

The history matters in another way. According to the complaint, the companies and two other manufacturers formed a criminal cartel to fix DRAM prices from 1998 to 2002. Samsung paid a $300 million fine, Hynix paid $185 million, and Micron received immunity for cooperating as a whistleblower. Judge Wise, like the DRAM II court, rejected the argument that the now-20-year-old history should not count.

At the hearing, the companies quoted the late Judge Posner's line that competitors in concentrated markets "watch each other like hawks." Judge Wise wrote: "But Plaintiffs' allegations go beyond hawks watching each other; their contentions are more akin to hawks flying in formation — an activity that hawks ordinarily do not do."

The companies must answer by December 7, 2026. The initial case management conference is set for January 12, 2027. Nothing is proven. The complaint's price figures are the plaintiffs', not court findings, and the judge accepted the allegations as true only for the purpose of deciding the motion. The case could still settle, narrow, or fail at trial.

## Why builders should care

The Hacker News discussion, which had the story at 389 points and 192 comments when this post was written, focused mostly on whether the case is winnable. That is the wrong question for builders. The right question is what the price of memory has already done to the machine on your desk.

This is the second week in a row the cost of local hardware has turned out to be something other than a market clearing. Yesterday's post in this series covered the allegation that Nvidia financed its own buyers to manufacture GPU demand. Today a judge says the three companies that make nearly all the world's memory plausibly cut supply in formation while DDR5 prices rose 172 percent in a year. Two different markets, two different allegations, the same shape: the bill for running models yourself is set upstream, by a handful of companies, before you ever open a store page.

The connection to local inference is direct. DDR5 is the memory local inference runs on. A 64-gigabyte or 128-gigabyte machine's RAM is where the KV cache lives, where the weights sit when the GPU runs out of room, where the model that does not fit on a card still runs. When wafer area moves to HBM, it moves to the accelerators in data centers, not to the DIMMs in your machine. The HBM pivot is not an abstraction. It is the reason the RAM shortage brought DDR4 back from the dead — a story this site covered in October, when a 32GB DDR5 kit cost $620 against $260 for DDR4, according to The Verge's own shopping at the time — and the reason DDR4, the older and slower memory, ended up costing more per gigabyte than DDR5.

There is a version of this story in which the shortage was simply demand. AI accelerators genuinely need HBM, HBM genuinely eats wafer area, and three companies genuinely faced the same incentives at the same time. That is what conscious parallelism means, and it is legal. The judge's point is narrower and sharper: parallel moves that are hard to unwind, taken together, at record prices, by companies that have fixed prices before, look less like three hawks watching each other and more like three hawks flying in formation.

For builders, the takeaway is practical: the cost of the box you own is not set by the box. It is set by who controls the wafer, and right now that is three companies whose capacity decisions a federal judge has found plausibly coordinated. Local inference was supposed to be the escape from the meter. The meter followed you home.

The case is not over. It has barely started.

Source: [Judge Refuses to Dismiss DRAM Supply Conspiracy Suit Against Samsung, SK Hynix, Micron](https://litnews.ai/articles/garciaguirre-samsung-sk-hynix-micron-dram-conspiracy-suit-survives-dismissal)
