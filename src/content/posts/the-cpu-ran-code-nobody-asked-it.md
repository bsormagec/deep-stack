---
title: "The CPU Ran Code Nobody Asked It To Run"
dek: "A six-month ARM hypervisor bug taught one engineer that the NX bit is not a security feature. It is an attribute bit with a second, stranger job."
date: 2026-09-07
image: "/images/the-cpu-ran-code-nobody-asked-it.webp"
---
Somewhere inside a MediaTek phone, a CPU core fetched instructions from the bootrom. Nothing had branched there. The branch predictor guessed wrong, and the fetch happened anyway, speculatively, like a reflex that fires before the brain catches up. That one fetch, from a page of memory the hypervisor had mapped for its own use, froze the phone. Every single time, at a random-looking point during boot. It took six months to find.

Sonya was building a bare-metal hypervisor on ARM64 for postmarketOS. The whole point of the project was intercepting access to CTR\_EL0, a cache-type register. With the intercept enabled, the phone locked up a few seconds into boot and the watchdog reset it. Disabling the watchdog did not help, it just made the reset manual. The handler was short, simple, and verified instruction by instruction in QEMU. On real hardware, debug prints showed it ran and modified nothing, not even the register it was supposed to write.

### The wrong guesses

First suspect: the handler was corrupting registers. It was not. Then: the CPU was out of spec. On ARM that is always worth considering, vendors roll their own implementations and some deviations are famous enough to get Linux workarounds, but the evidence pointed nowhere. She patched the kernel binary by hand, replacing every CTR\_EL0 access with a hardcoded value. The phone got further. Still no Android.

The break came from an ugly, mechanical technique: binary bisecting. Two C snippets that should have been semantically identical, one calling a function through a function pointer and one calling it directly, behaved differently. That is not supposed to be possible. Compilers assume it, architects assume it, everyone assumes it. When two identical programs behave differently, either something interrupts the code at exactly that moment, or the hardware has a bug.

The two instructions were blr x0 and bl get\_ctr\_el0. One is a dynamic branch through a register. The other is a static branch the CPU knows about ahead of time. Static branches cannot mispredict. Dynamic branches can, and when a branch predictor guesses wrong, the CPU fetches instructions from the guessed target before it knows better. The guessed target here was address zero. In the hypervisor's 1:1 mapping, address zero was the bootrom.

### Device memory has a loophole

Here is the part that makes this story worth telling. The hypervisor mapped all of physical memory 1:1, including MMIO. ARM guarantees no speculative data accesses to Device memory. But speculative instruction fetches treat executable memory as Normal memory, period. The only way to stop a CPU from speculatively fetching instructions from a region is to mark it non-executable. The ARM manual puts it plainly: marking a region as Device prevents speculative data accesses only. Marking a region as non-executable prevents speculative instruction accesses.

So the fix was one attribute bit. Mark everything non-executable except the payload. The phone booted to Android for the first time in half a year, with zero kernel patches. There is a nice irony in the write-up: the hypervisor never had NX because it was never meant to run in production, so defense-in-depth felt like overengineering. The defense they skipped was not needed against attackers. It was needed against the CPU itself.

### The NX bit has a second job

Most of us file NX under security stuff, next to ASLR and stack canaries. The x86 history supports that: NX was introduced so a buffer overflow could not redirect execution into attacker-controlled memory. But on ARM the same bit is doing another, older job. It is an attribute bit that tells the front-end of the CPU whether a page is eligible to be speculatively fetched. Read-sensitive MMIO pages that are executable can be fetched speculatively, and the fetch itself can hang the bus, crash the SoC, or trip a watchdog.

The Hacker News thread around the article is worth reading for the details. One commenter hit the same class of bug on a Cortex-M4 without an MPU, where the only fix was rearranging compiled code so the speculative fetch never landed on the bad address. Another points out the absurdity: executing from Device memory is architecturally UNPREDICTABLE, yet speculatively fetching instructions from it is apparently allowed. There is a real design critique buried in there. If speculative fetch is going to happen anyway, the front-end should probably know about the Device bit. ARM's answer is that the NX bit is your tool.

### The lesson is not about ARM

The product lesson: shortcuts you justify with this will never run in production are bets you do not know you are making. The author skipped NX because it seemed like overengineering for a hobby hypervisor. Six months later, the missing bit was the difference between a phone that boots and a phone that does not. Security controls are not just policy. They are often load-bearing parts of the machine, with second jobs nobody documented for you.

The deeper point: memory attributes are correctness, not decoration. When a CPU can fetch instructions you never asked it to run, correct code is no longer a property of the code. It is a property of the mapping. That is true on ARM, and it is increasingly true everywhere as speculation gets more aggressive. Spectre taught us the CPU runs code we did not intend. This story is the same lesson from the other side, sometimes it just crashes you instead of leaking your secrets.

Read the original post. It is one of the best debugging write-ups of the year: honest about the wrong turns, precise about the mechanics, and it ends with the author shipping the defense-in-depth they had skipped, just in case. The NX bit was never about security. It was about telling the CPU what it is allowed to touch before it touches it. Everything else is a bonus.

Source: [The NX bit is not just about security](https://purplesyringa.moe/blog/guest/the-nx-bit-is-not-just-about-security/)
