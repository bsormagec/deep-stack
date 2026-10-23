---
title: "The Cheapest Inference Server Is Already Under Your TV"
dek: "## The hardware was never the problem"
date: 2026-10-17
image: "/images/the-cheapest-inference-server-is.webp"
---
The interesting thing about a PlayStation 5 running a 27-billion-parameter language model is not that it can. It is that the hardware was never the bottleneck. The lock was.

PS5LM, an open-source project by developer Mert Cobanov, ports llama.cpp — the engine most local inference actually runs on — to a jailbroken PS5. According to the project's own README on GitHub, the current version runs on the console's GPU through llama.cpp's Vulkan backend on its RDNA 2 graphics hardware, with 11.4 GB of the console's shared memory available for the model and its context. It serves OpenAI's `/v1/chat/completions` endpoint and Anthropic's `/v1/messages` endpoint to anything on the home network, and the README notes Claude Code works against it. No PC while it runs, no cloud, no account.

That sounds like a homebrew stunt. It isn't. It is a memory-bandwidth argument that happened to ship as a console hack.

## Bandwidth was sitting in the living room

Token generation is bound less by raw compute than by how fast weights can be streamed through memory. That is why the spec sheet that matters for a local model is rarely the one on the box art. The PS5 carries 16 GB of GDDR6 — a figure repeated in the coverage of this project, including Startup Fortune's write-up — and that memory system was built to move game worlds, not tokens. It turns out the two workloads want the same thing.

The project's own measured table, for a PS5 Slim, is the honest version of the claim. Qwen 3.5 0.8B at Q4_K_M quantization runs at 207 tokens a second, according to the PS5LM README. Qwen 3.5 9B, a 5.3 GB file at the same quantization, runs at 55 tokens a second. The headline model, Qwen 3.8 27B, reaches about 20 tokens a second at a 64k context — but only in a UD-Q2_K_XL build, a 9.2 GB file quantized down to roughly two bits per weight.

Hold on to that last detail. It is the whole story in miniature.

Secondary coverage of the earlier CPU-only version, reported by PBX Science, shows what the GPU step actually bought: the first payload was confined to about 6 GB, ran a 2B model at around 9 tokens a second, and managed roughly one token a minute when the 27B model was streamed from disk on the CPU alone. The GPU fork — PS5LM Plus, built by abhi245y and now folded into the main project, per the README's credits — is the difference between a proof of concept and a server. Twenty tokens a second is not fast. One token a minute is not a product at all.

## The price is zero, and that is the point

For builders, the takeaway is practical: the cheapest inference hardware is the hardware whose cost is already sunk. A console bought to play games, sitting idle most of the day, becomes a private model server for a laptop, a phone, and a coding agent on the same network. Coverage of the reported tests, via AlexTech, puts the console's draw at about 86 watts and around 54 degrees while serving. There is no per-token bill, no rate limit, and no data leaving the house. The marginal cost of the next token is electricity.

That is a different economic shape from everything else in local inference right now. The usual question is which GPU, which mini-PC, which board to buy next. This project asks why you are buying anything. The installed base of consoles is enormous, and almost none of that memory bandwidth is doing work at 2 p.m. on a weekday.

There is a second, quieter feature worth noting. The README says PS5LM also runs small decision models — the Jev-style, single-pass models served through a `/v1/systemone` endpoint, powered by Ollaya — answering typed choice and yes-or-no questions in a fraction of a second. A games console doing calibrated decision calls for the price of standby power is a strange sentence. It is also a correct one.

## The catch is the lock, again

None of this is a Sony feature, and the conditions are not gentle. The README requires a PS5 on firmware 7.00 to 13.60, jailbroken, with three payloads loaded — kstuff-lite, etaHEN, and ShadowMountPlus — before the app even appears on the home screen. Coverage by Back2Gaming adds the parts the README leaves implicit: firmware 14.00, released September 16, 2026, closes the exploit the jailbreak depends on, the jailbreak does not survive a reboot, and jailbreaking voids the warranty. Their test console reportedly hung during the exploit's kernel stage. That is not a setup guide. That is a warning label.

The quantization is the other honest cost. A 27B model at two bits is not the 27B model from the benchmark table; it is a compressed relative of it, squeezed to fit an 11.4 GB window that was never designed for it. The small models keep respectable quantizations and fly — 124 tokens a second for Llama 3.2 3B in one reported run, per the PS5LM Plus README figures summarized by PBX Science — precisely because they do not need the squeeze. The big number in the headline is bought with precision.

The Hacker News discussion, where the project reached 298 points and 74 comments at fetch time, focused on exactly this tension: admiration for the port, and skepticism about how much model is left after two-bit quantization. Both reactions are right. That is what a real tradeoff looks like.

## A server, not a stunt

Strip the novelty away and what remains is a pattern this column keeps meeting. Local inference does not advance only when a new chip launches. It advances when existing memory, already paid for, gets unlocked — by an inference engine that compiles for a FreeBSD-based console with, as the coverage notes, only minor changes, and by a community driver port that opens compute on a GPU its maker locked down.

The front door was the cloud API. Then the side door was a gaming GPU. Then a mini-PC. Now it is the console under the TV, still behind a jailbreak, still one firmware update away from closing. The pattern keeps trying after every lock.

That is the problem — for anyone selling tokens by the million.

Source: [Llama.cpp on a jailbroken PS5: run any GGUF model natively on the console](https://github.com/cobanov/PS5LM)
