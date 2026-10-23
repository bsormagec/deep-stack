---
title: "The Discovery Was Recognition, Not Design"
dek: "*More than 90 Opus 5.5 agents ran ~750 quantum simulations hunting for room-temperature magnetic semiconductors. The best candidate they found was synthesized in 1999.*"
date: 2026-10-07
image: "/images/the-discovery-was-recognition-not.webp"
---
The interesting thing about this week's materials-discovery headline is not that AI agents designed a new magnet. It is that one of the two candidates was never lost — it was synthesized in 1999, magnetically measured up to 376 K, and plotted spin-by-spin in a 2008 paper that framed it as something else entirely. Twenty-seven years of human researchers had the data. The agents just read it properly.

The run comes from the team at Vals AI, who published the full story on their blog this week. According to their write-up and the coverage around it, a swarm of more than 90 Claude Opus 5.5 agents ran roughly 750 quantum-physics calculations over several days, using density functional theory — the standard computational method for crystal physics — at two levels of approximation: a faster one (PBE+U) and a slower, usually more accurate one (HSE06). At 444 points and 304 comments, it is the highest-ranked AI story on Hacker News that this pipeline has not yet covered.

## What a Luttinger-compensated magnet is, in 90 seconds

You know the two ordinary kinds of magnet. Ferromagnets, the fridge magnets, have all their atomic magnets pointing the same way, producing a field that leaks out of the surface. Antiferromagnets have neighboring atomic magnets pointing opposite ways, canceling out.

Spintronics — the technology behind hard-drive read heads and MRAM — wants the impossible combination: the electron spins sorted by energy, the way ferromagnets do it, with zero net magnetism, the way antiferromagnets do it. Sorted spins are what you read and write; zero net field means the bits don't interfere with their neighbors, so you can pack them tighter. As a bonus, antiferromagnetic materials switch about a thousand times faster than ferromagnetic ones and sip power while doing it.

A Luttinger-compensated magnet gets there by putting the up-spins and down-spins in inequivalent crystal environments — different elements, or the same element on two different kinds of site. The net spin moment cancels to zero, but because the up and down atoms are not equivalent, electrons can still be separated by spin at a given energy. What matters for storage is the "spin window": the slice of energy at the edge of the band gap where every available electron state has the same spin. The larger this window compared to the thermal jiggling at room temperature (about 26 meV), the better the sorting survives. The ideal target, stated plainly in the post: a semiconductor with a band gap, spin sorting intact, zero net magnetism, at room temperature.

## The design that probably can't be made

The agents' own design is YBaMnFeO5 — a compound of yttrium, barium, manganese, iron, and oxygen that, as far as the team could find, has never been made or even proposed as this kind of magnet. On paper it is ideal: a predicted 2.35 eV band gap from the more accurate HSE06 method, spin-sorted windows of 1.0 eV for holes and 1.4 eV for electrons (against 26 meV of thermal noise, that is comfortable margin), and magnetism persisting to about 420 K in the raw simulation, or about 490 K after calibrating against a known magnet.

Then came the agents' own follow-up calculation, and it is the honest part of the story. The design requires manganese and iron atoms to sit in a perfect checkerboard. When the agents simulated how the atoms arrange themselves at different temperatures, the checkerboard dissolved into a random mix at around 950 K. Making this kind of oxide takes about 900–1300 °C; at lower temperatures the atoms barely move, so standard synthesis would likely produce a scrambled crystal. A scrambled crystal loses the spin sorting. The team flags this themselves: the designed candidate may be impossible to make in its useful ordered form.

## The one that was hiding in the literature

The second candidate, KV[Cr(CN)6], is where the story gets genuinely interesting. It was first synthesized in 1999 — a relative of Prussian blue, the three-hundred-year-old pigment — and the chemists who made it had already arranged the two metals' magnetism to cancel. The 1999 sample stayed magnetically ordered up to 376 K (365 K after the sample had been heated), already above room temperature, already measured.

The spin sorting, though, had been on paper for eighteen years without anyone saying the words. A 2008 study using hybrid functionals like the agents' own plotted the material's electron states spin by spin, and both band edges in that plot carry the same spin. But that study was about magnetic coupling under pressure and never remarked on it. As far as the team could find, nobody had pointed out that this makes KV[Cr(CN)6] a Luttinger-compensated semiconductor, put numbers on its spin-sorted windows, or tested how robust they are. The agents' calculations predict a band gap of about 2.1 eV and remarkably wide spin windows — 2.6 eV for holes, 1.6 eV for electrons — and the crystal structure locks each metal into its own site, exactly what the designed candidate lacked.

Two caveats survive intact. The only sample so far is a 1999 powder with water in its pores, carrying a small leftover magnetic moment (0.125 Bohr magnetons per formula unit, where a perfect crystal would have zero). The two simulation methods disagree on how much the water weakens the effect: the more accurate HSE06 says the spin sorting survives, the faster PBE+U says the hole window shrinks by more than half. And most plainly: neither the band gap nor the spin sorting has been measured. These are predictions waiting for a lab.

## The missing number

Here is what the announcement does not contain: an invoice. Running 750 density-functional-theory calculations — HSE06 is the expensive kind, the method you run on clusters, not laptops — plus several days of inference from more than 90 instances of a frontier model is real money. The one number Deep Stack always asks for is the one number absent from every "AI did science" headline.

What the announcement does contain, and what deserves more attention than the magnets, is a transparency ledger. The team published the input files, raw outputs, and analysis code behind every number in the post, a one-command checker, independent re-runs, and a list of known caveats in a public GitHub repository. That is agent-driven science with receipts — the kind of thing that lets a skeptic rerun the claim instead of trusting the press release.

For builders, the takeaway is practical: the agents collapsed the cost of searching and reading, not the cost of knowing. They surveyed chemical space and read eighteen years of literature in days; the designed candidate fell to a synthesis check and the literature candidate still needs someone to grow a clean crystal and measure two numbers. Compute is cheap now. The lab is still the bill.

That is the real shape of the milestone. The agents didn't discover a new material. They rediscovered an old one — and showed their work.

Source: [Two Room-Temperature Antiferromagnetic Semiconductor Candidates](https://www.vals.ai/blogs/room-temperature-magnetic-semiconductors)
