---
title: "The A100 Was Already in the Mining Card"
dek: "The lock was never the silicon. It was a fuse — and the fuse opens the door it was supposed to guard."
date: 2026-11-11
image: "/images/the-a100-was-already-in-the-mining-card.webp"
---

A researcher named Kate has turned a CMP 170HX mining card into what is, for practical purposes, an A100-80G. Not by swapping the die, not by adding memory, not by overclocking. The card already had the memory. It already had the streaming multiprocessors. The hardware was an A100 all along; the only thing standing between an 8 GB miner and an 80 GB datacenter card was NVIDIA's product segmentation, enforced by blown fuses on the GA100 die. Kate found a way to blow more fuses — and blowing them relaxed the restrictions instead of tightening them.

That sounds like a bug in a lock. It isn't. It is a design assumption, inverted.

## The card that was already a datacenter card

The GA100 die, as fabricated, carries 128 streaming multiprocessors, 12 framebuffer partitions, five NVDEC units, a PCIe Gen4 x16 controller, and four to six stacks of HBM co-packaged with the die, according to Kate's writeup. NVIDIA then uses eFuses — 16,384 of them in the fuse controller — to carve that one die into nearly twenty SKUs. Defect testing and market demand decide which variant a given die becomes.

The CMP 170HX is the most extreme cut. Sold as an Ethereum mining card with nominally 8 GB of application-exposed framebuffer, it physically carries around 80 GB of HBM. The memory was soldered onto the card, wired up, and then hidden behind a fuse setting. In Kate's limited sample, about 90 percent of the 8 GB cards had the full 80 GB intact; one of her own cards had only 64 GB, a genuinely defective stack.

Software-only unlocks already existed. The open-source cmpunlocker project gets the 8 GB card to 64 GB and keeps it at 70 SMs on PCIe Gen2. Respectable, and it shows the memory was never the hard part. The hard part was the fuse controller: a gatekeeper option word called OPT_SECURED_BURN_FEATURE_ENABLE, set to 1 on every production card, which permits fuse programming only in a narrow field-programmable region. The interesting fuse rows — the "fuseless fuses" that encode which parts of the die are floorswept, disabled, unreachable — could not be written at all.

## A glitch, not a key

Kate's route in is voltage fault injection, and the tooling is almost as notable as the result. The glitcher is a small STM32G4 board, designed with the help of GPT-6 Astra, that taps the PWMVID signal on the card's PCB and feeds its own waveform into the MP2888B voltage regulator. Installation needs two wire taps — one sensing the core voltage, one driving PWMVID — and the removal of a single 0402 zero-ohm resistor. Then the card is power-cycled again and again, each attempt timed to a precise moment in the fuse controller's boot sequence. One card took between one and 48 hours of glitching to unlock.

What the glitch achieves is a specific, improbable state: the fuse controller wakes up with its control rows — rows 0 and 1, which carry the security-sensitive option words — read as all zero, while everything else stays intact. In that state the secured-burn gate can be shadowed off, fuse programming opens up, and Kate rewrites the fuseless-fuse rows so the disable masks match only the genuinely defective blocks. The die's own defect map stays respected; everything else comes back.

The numbers she reports are her own measurements, on her cards, with no independent verification yet — that caveat matters, because the result is striking. The unlocked card shows 81,920 MiB in nvidia-smi, runs 120 to 128 SMs depending on die lottery, and posts FP16 FMA throughput 1.18 times a retail A100. A retail A100 ships with 108 SMs, the yield-safe count NVIDIA chose for every production card. The unlocked miner is faster than the datacenter card it was cut down from, because NVIDIA's yield margin left working SMs on the table and the miner's die happened to have them. PCIe Gen4 trains at full x16, NVLink becomes unlockable with a small board mod, and ECC and multi-instance GPU follow. NVJPG, NVDEC, and MIG are claimed unlockable but were not specifically tested. Real workloads run: vLLM and SGLang on the full framebuffer, verified by pseudorandom write-and-read tests across all 80 GB.

## The fuse that opens the door

The detail that should make hardware people sit up is the direction of the failure. In a properly secured design, blowing a fuse should only ever make a device more restrictive, because a blown fuse cannot be unblown — there is no economical way back. NVIDIA's design lets blowing fuses relax restrictions. Kate's own framing is blunt: the fuse that was supposed to lock the door is the same fuse that opens it.

Each burn is also die-tailored. The occupied fuse space and the defective bits differ per die, so there is no universal unlock file to download; the procedure has to be repeated and measured per card. And the regular control fuses, once blown, cannot be unblown — a wrong burn bricks the segmentation permanently. This is not a how-to, and it should not be read as one. It needs custom glitching hardware, board-level soldering, and up to two days of unattended glitching per card, with a real chance of destroying the card's market identity forever.

Kate disclosed the findings to NVIDIA's product security team before publishing, after another researcher independently found the same flaw. The disclosure matters because the vulnerability is not really about one mining card. Arbitrary fuse burning on the GA100 is a foothold into the die's security features, and her stated next direction is deeper glitch states where default-blown security fuses read as unblown — routes toward debug execution with unprecedented access to die internals.

## For builders, the takeaway is practical

The cheapest inference box keeps turning out to be hardware people already own. A used mining card from a dead crypto market, a Mac that already sits on the desk, a console under the TV — the pattern repeats because the frontier's real tax is segmentation, not silicon. The CMP 170HX was never a weak card made strong. It was a strong card made weak on purpose, and the weakness was a setting.

That is the part worth remembering the next time a price list says a capability costs ten times more. Sometimes it does, because the hardware is genuinely different. Sometimes the hardware is identical and the difference is a fuse — and fuses, it turns out, are a suggestion.

The Hacker News discussion, at 226 points and 89 comments, focused less on the unlock itself than on what it implies for every other segmented die NVIDIA ships. The thread is right to look past the card. If one fuse setting separates a miner from a datacenter GPU, the question is not how many other cards hide the same secret. It is how many product lines are built on the assumption that nobody will ever check.

Source: [Using voltage glitching to unleash the A100 in my mining card](https://blog.kate.land/posts/using-voltage-glitching-to-unlock-the-a100/)
