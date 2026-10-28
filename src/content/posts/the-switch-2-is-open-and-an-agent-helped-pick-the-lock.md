---
title: "The Switch 2 Is Open, and an Agent Helped Pick the Lock"
dek: "A tethered jailbreak, a $25 BASIC app, and a robot finger on the power button: the interesting part is not the console. It is the feedback loop."
date: 2026-10-28
image: "/images/the-switch-2-is-open-and-an-agent-helped-pick-the-lock.webp"
---
The interesting thing about the Switch 2 jailbreak is not that a locked console got opened. Consoles get opened. The interesting thing is how it got opened: a researcher built a rig so an AI agent could watch the console, press its buttons, crash it, reboot it, and try again — and then the agent found the bugs.

That is the pattern to watch. Eleven days ago this pipeline covered a jailbroken PlayStation 5 running llama.cpp, a console under the TV turned into an inference box. Now a second locked console under the TV is open, and this time an agent helped pick the lock. The cheapest inference hardware keeps turning out to be hardware people already own.

Before going further, the caveats, stated plainly because they change what this story means. The jailbreak, called ns2jb, is tethered: it vanishes on reboot and has to be reapplied, with a computer on the same network, every time the console restarts. It is not a full kernel-level jailbreak, in the sense XDA's coverage stresses, and it installs no persistent custom firmware. Nintendo has reportedly pulled SmileBASIC 4, the entry-point app, from the eShop, so the door may already be closing for anyone who does not already own it. And unlike the PlayStation 5 story, no local model has actually been demonstrated running on a Switch 2 yet. The inference angle here is prospective, not proven, and this article will not pretend otherwise.

## A BASIC app from the old console

The entry point is almost insultingly ordinary. SmileBASIC 4 is a programming app for the original Switch, sold on the eShop, that also runs on the Switch 2 through backward compatibility. Researcher Sammy Hajhamid, known as pepsipu, published the exploit on October 22, 2026, for firmware 23.0.1, the current version at the time, and described it in his own write-up, dated October 18, as a software-only, tethered jailbreak — no modchip, no soldering, no hardware modification. On Hacker News, where the write-up reached the front page at number 8 with 492 points and 179 comments at the time of this run's fetch, the demo did most of the talking: a modded Mario Kart World, a Switch 2 exclusive, racing with Cinnamoroll, Peter Griffin, Hatsune Miku, and Red from Angry Birds as playable characters.

The chain itself, at the level that matters to builders, has two links. First, Codex — OpenAI's coding agent, working under Hajhamid's direction — found a 32-bit integer overflow in SmileBASIC's interpreter: when removing items from an array, a position-plus-count sum could wrap around and turn negative, letting a copy operation pull memory it should never have touched. That gave out-of-bounds reads and writes. Second, a buffer overflow in the console's filesystem service, triggered by path normalization, gave arbitrary read and write inside that privileged service. From there, Hajhamid's write-up describes swapping the filesystem object behind the program loader so that a valid program's metadata passes its checks while the executable itself is replaced — native code running with an ordinary system module's permissions.

That sounds like a lot of machinery for a cartoon racer. It is. The characters are the demo, not the point. The point is what the access enables, in the author's own list: running homebrew, reverse-engineering and modifying Switch 2 games, backing up save files, and reaching most of the console's peripherals. It is a foothold, not a takeover — and footholds are where homebrew, emulation, and further security research start.

## The rig is the story

The part of the write-up that should interest anyone building with agents is not the overflow. It is the harness.

Hajhamid's first move, in his own words, was to set up a rig around a Switch 1 and a Switch 2 "so Codex could, ideally, jailbreak the Switch 2 without me." Two JetKVM devices let the agent send controller inputs over USB and watch the screens over HDMI. A crashed console needs a human finger on the power button, so he bought a Bluetooth light-switch flicker from Amazon and aimed its lever at the console's power button. When the lever comes down, it presses the button. That is the whole trick, and it is not a joke: an agent that cannot recover from a crash cannot do security research, because security research is mostly crashing things.

It did not work as a fully autonomous run, and Hajhamid says so himself. The "make no mistakes" prompt caption in his post was, in his later edit, "just a silly caption." He set a goal for userland code execution through the console's browser, and that attempt failed — the browser's mitigations, including execute-only memory and pointer authentication, held. The jailbreak itself, he writes, "took substantial effort for ~2 weeks." The Mario Kart World mods, by contrast, were entirely vibe-coded in a day, and were just for fun.

That distinction is the honest version of the headline. This was not an AI hacking a console by itself while a human watched. It was AI-assisted exploit development with a human building the environment: the human chose the targets, built the observation loop, steered away from the dead end in the browser toward an old BASIC interpreter with a history of being pwned on the 3DS, and kept the machine running through its crashes. Codex did real bug-hunting work inside that loop. The loop is what made the work possible.

## Why builders should care, and where to stop

For builders, the takeaway is practical: agents get useful at hard, stateful tasks when they can observe results and recover from failure without waiting for a person. A prompt is not a feedback loop. A screen, an input channel, and a reboot mechanism are. That is a design lesson that transfers far beyond consoles — to any agent work where the environment crashes, hangs, or answers slowly, which is to say, most of it.

The console angle transfers too, with a limit attached. The PlayStation 5 story showed a jailbroken console actually running a local model. The Switch 2 story shows only that a second console can be opened, by a method that is already harder to reproduce now that its entry-point app is reportedly off the store. Nobody should buy a Switch 2 as an inference box on the strength of this post. The honest claim is narrower: locked consumer hardware keeps proving to be more open, and more useful, than its spec sheet suggests — and the tools that open it are increasingly agents working inside loops humans build for them.

There is also a defensive lesson, and it is the same one the filesystem bug teaches. The chain did not break one wall. It walked through a side door nobody was guarding — a backward-compatible app from a previous generation — and then through a service that trusted its own inputs. Backward compatibility is an attack surface. Every old app a new platform agrees to run is a door it agrees to guard, forever, and the guard on this one was a counting bug in a BASIC interpreter.

Nintendo will patch this, or the entry point's removal will do the patching for it. That is the usual ending, and it does not change the interesting part. The interesting part is that the lock was picked by an agent with eyes, hands, and a finger on the power button — and that the finger was a light switch from Amazon.

Source: [Jailbreaking the Switch 2](https://pepsipu.com/blog/2026-10-switch2-jailbreak-ns2jb)
