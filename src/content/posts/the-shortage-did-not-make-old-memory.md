---
title: "The Shortage Did Not Make Old Memory Good"
dek: "## It made new memory unaffordable — and now Intel and AMD are building new CPUs for a memory standard from 2014"
date: 2026-10-13
image: "/images/the-shortage-did-not-make-old-memory.webp"
---
The interesting thing about DDR4 coming back is not nostalgia. It is the price tag that forced it back.

DDR4 started hitting the market in 2014, according to The Verge's reporting. It was replaced by DDR5, which is faster and more power-efficient, also according to The Verge. Under any normal hardware cycle, building a new machine around a memory standard that old would be a bad investment. That is roughly what The Verge itself says. And yet Intel and AMD are both now preparing new processors for it — not because the old memory got better, but because the new memory got too expensive to require.

That sounds like a comeback story. It isn't. It is a shortage repricing consumer hardware backwards.

### The $360 gap

The number that explains the whole move comes from The Verge author's own shopping, after a DDR4 kit died: a 32GB Corsair Vengeance DDR5 kit costs $620 right now, while the corresponding DDR4 kit costs $260 — figures The Verge reported on October 9, 2026. That is more than double the price for the newer standard, and a $360 difference on a single line item.

Two details in that comparison matter. First, even the $260 DDR4 figure is, in The Verge's words, more than 32GB of DDR4 typically cost back in mid-2025. DDR4 has not stayed cheap. It has just risen less violently. Second, memory is not an optional accessory in a build. When one mandatory component more than doubles, it does not trim the budget. It decides the rest of the machine — a cheaper GPU, a smaller SSD, or no upgrade at all.

The broader trackers point the same way. A DEV Community analysis published October 12, 2026, citing Tom's Hardware price tracking, puts a 64GB DDR5 kit at an average of $191 in August 2025 and $1,118 a year later. The same analysis cites J.P. Morgan Research estimating that DRAM prices will have risen more than 400% from the start of 2024 to the end of 2026. Those are secondary aggregations, not a single retailer's shelf price, and they should be read that way. But they agree with the shelf price The Verge found, and agreement across methods is usually the part worth trusting.

### New chips, old sockets

On Friday, Gigabyte announced that two of its motherboard lines will support upcoming processors built on Intel's LGA 1700 socket, according to The Verge. That socket debuted in 2021 with the 12th-generation Alder Lake CPUs, and it was unusual: it supported both DDR4 and the then-new DDR5, per The Verge. Intel dropped it for a DDR5-only approach in 2024. According to Gigabyte, as reported by The Verge, the dual-format support is now being revived, with the new LGA 1700 chips expected to launch in early 2027. Intel did not immediately respond to a request for comment, The Verge noted.

AMD is running the parallel play. In August, Gigabyte also announced a new series of motherboards for AMD's last-gen, DDR4-compatible AM4 platform, to go along with the 10th-anniversary relaunch of the Ryzen 7 5800X3D CPU, according to The Verge.

Read those two announcements together and the strategy is plain. Neither company is arguing that DDR4 is the future. Both are protecting the upgrade path: sell a customer a new processor without forcing a memory purchase that now costs as much as a mid-range graphics card. The socket is old. The reason is new.

There is a catch hiding in the Intel half of this, and it is worth naming. The revival only works because LGA 1700 happened to be built with dual-format support back in 2021. Its successor socket is DDR5-only. So this is not an industry rediscovering the virtues of older memory in general. It is one accidental design decision from five years ago suddenly becoming the most valuable feature on the platform. Flexibility that looked redundant at launch turned out to be insurance.

### Why this lands on local AI builders first

For a gaming build, expensive RAM is an annoyance. For a local-inference build, it is a direct tax on the thing the machine exists to do.

The pattern across this year's local-model work has been consistent: capacity is the constraint that decides what you can run. Models larger than VRAM get streamed, offloaded, and cached through system memory and storage. When system memory is the overflow layer, the amount of it you can afford is not a spec-sheet detail. It is the difference between a model that fits the workflow and a model that does not fit at all.

DDR5's advantages are real — higher speeds and better power efficiency, as The Verge notes. But bandwidth you cannot afford buys nothing. A builder choosing between 32GB of fast memory and 64GB of slower memory for a machine that holds model weights is not making a nostalgia choice. They are making a capacity choice, and at $620 versus $260 for the same 32GB, per The Verge's comparison, the arithmetic currently argues against the newer standard for exactly the workloads where total capacity matters most.

That is the part the comeback framing misses. The market is not rewarding DDR4. It is punishing a build cost that stopped making sense.

### The honest limits of the revival

None of this makes DDR4 a good long-term buy, and the revival should not be sold as one.

The Verge is explicit that it could be years before prices drop again, and that even DDR4 prices have climbed — the $260 kit already costs more than the same capacity did in mid-2025, by its own reporting. Buying into a revived old platform in early 2027 means buying into a dead end on purpose: no path to DDR5 on that board, and a memory kit whose resale and reuse value falls the moment prices normalize. If the shortage breaks sooner than expected, the DDR4 build is the one holding the stranded parts.

There is also a limit to what the announcements actually promise. Gigabyte announced motherboard support for upcoming processors, per The Verge. That is a platform commitment, not a price commitment. Nothing in the reporting guarantees that the new chips, the boards, or DDR4 itself stay cheap once demand rotates back into the old standard. A shortage that repriced DDR5 can reprice its substitute too — and the tracker data cited above, showing DDR4 kits also up sharply year over year, suggests that process has already started.

The Hacker News discussion, where the story sat near the top of the front page on October 12 with 203 points and 187 comments at the time it was checked for this piece, circled the same tension: relief that an affordable path exists, and unease that needing one at all is the actual news.

For builders, the takeaway is practical: if you already own DDR4, hold onto it — The Verge closes on the same point, and for once the boring advice is the correct one. Price any new local build both ways, DDR5 and DDR4, with the actual kit prices in front of you rather than the prices you remember from 2025. And treat a new CPU for an old socket as what it is: a bridge bought with shortage money, worth it only if the $360 you do not spend on memory goes somewhere that matters more in the same machine.

The shortage did not make old memory good. It made new memory unaffordable.

Source: [Decade-old RAM is making a comeback](https://noticiasenvivo.cl/decade-old-ram-is-making-a-comeback/)
