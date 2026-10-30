---
title: "The Console Is a Weight File Now"
dek: "A working Nintendo Entertainment System now runs inside a stock Qwen3.5 checkpoint. Nobody trained it. A compiler computed every weight — and the whole console zips down to 3.3 megabytes."
date: 2026-10-30
image: "/images/the-console-is-a-weight-file-now.webp"
---
The interesting thing about Nesformer is not that it plays Super Mario Bros. It is that there is no emulator anymore. The project, published on GitHub on October 30 by Drew Breunig as dbreunig/nesformer, compiles the NES's 6502 CPU, its 2 KB of work RAM, and a cartridge's program ROM into the weights of a standard Qwen3.5 model checkpoint. When you play, the model predicts the CPU's execution log one token at a time. A small host program draws the picture, reads the controller, and fires the vblank interrupt — but the machine itself lives in the weights.

This is the second time in a week that a deterministic machine has been compiled into model weights rather than learned into them. The first was Qwenputer, Divyansh Agrawal's RISC-V core inside Qwen3.5-4B, covered here yesterday. Nesformer reuses Qwenputer's compiler and its central trick, and pushes the idea one step further: not a CPU on its own, but a whole console, cartridge included, running a real game.

## The machine in the matrix

The trick is the same one Qwenputer demonstrated, applied to a harder machine. Each Gated DeltaNet head keeps a 128 by 128 state matrix that the delta rule updates at every token. Hold the gate open, write with a one-hot key, and an update overwrites exactly one row; read it back with a one-hot query. Every row becomes a memory cell, and the cartridge, the RAM, and the registers all live in rows. The project's own summary of the idea is one sentence: the model's Gated DeltaNet state is the machine's memory.

The checkpoint stacks seven Gated DeltaNet layers — the circuit — plus one all-zero attention layer that Hugging Face's cache requires. The layer plan reads like a processor datasheet: layer 1 holds the program-counter anchor, the A, X, Y, and stack-pointer registers, and the flags; layer 3 fetches the opcode and operand bytes at the program counter; layer 5 does the RAM and ROM reads; layer 7 produces the next token. All 151 official 6502 opcodes are in there, every addressing mode, plus the stack, the flags, and the interrupt entries. The 32 KB of program ROM is stored twice, once for instruction fetch and once for data reads.

And it loads like any other model. The weights folder is an ordinary Hugging Face checkpoint that loads with Qwen3_5ForCausalLM.from_pretrained and needs no custom code. The same weights run any NROM game without a rebuild, because the ROM is loaded into the model's state at startup, not baked into the weights. Super Mario Bros., Donkey Kong, and Excitebike all work; anything that bank-switches does not, because the project supports only iNES mapper 0 cartridges.

The verification is unusually thorough for a one-day-old project, and it is the part worth taking seriously. The reference CPU matches the nestest golden log for 3,348 instructions and the py65 emulator across 5.7 million instructions of game code. Free-running, the weights generate traces identical to the reference CPU: a 600-frame run of the test ROM Thwaite emitted 1,916,527 tokens over 10 seconds of NES time, and all 300 saved frames matched a conventional 6502 emulator exactly. A 420-frame run of Doug Fraker's Full Game produced 2,645,885 tokens with the same identical-frame result. The nestest conformance run ended in the expected HALT after 4,586 tokens. These are the author's measurements, not independent benchmarks — but they are exact-match claims against a reference implementation, which is a much stronger claim than a score on a leaderboard.

## Why the zip file matters

Here is the number that reframes the whole thing. The checkpoint totals 466.6 million parameters in bf16, which is 933 megabytes — the "about a gigabyte of Qwen weights" in the Hacker News headline, where the story reached fourth place with 101 points and 82 comments at fetch time. But only 9.3 million of those parameters are nonzero. The rest is padding. So the weights zip down to 3.3 megabytes.

That sounds like a curiosity. It isn't. It is a shipping format.

A conventional emulator is code you install and a ROM you supply. Nesformer is a weight file you load with the same call you use for a language model, and the machine inside it compresses to almost nothing because a compiler, not training, placed every nonzero value deliberately. Sparsity here is not a compression trick applied after the fact. It is the nature of compiled weights: most of the matrix is empty because most of the matrix was never assigned a job. If compilers can target weights the way they target instruction sets, then a weight file stops being only a record of what a model learned. It becomes a deployment artifact for deterministic logic, distributed through the same channels — Hugging Face folders, from_pretrained calls, safetensors files — that already move models around.

For builders, the takeaway is practical: the boundary between "model" and "runtime" just got thinner. Yesterday the tool call never left the model because the CPU was inside the weights. Today the emulator never leaves the model either, because the console is inside the weights. The host program still exists — it renders the picture and handles input — but the part that used to be the emulator, the part you would audit, patch, and version, is now a matrix of numbers that loads like a model. That changes what it means to inspect a checkpoint. A weight file can now contain a machine that does exactly what its author compiled it to do, deterministically, with no prompt involved. The question "what does this model do?" gains a second, literal answer: it runs this circuit.

## The honest catch

None of this is fast, and the project does not pretend otherwise. The fastest engine, a numba-compiled forward pass that skips the all-zero blocks, ran at about 1,650 tokens per second on one CPU core of the machine it was built on. The plain numpy engine manages about 210, and the stock transformers path about 10. A real NES would need about 700,000 tokens per second. Nesformer runs 150 to 290 times slower than the console it emulates, and 600 frames — ten seconds of NES time — take around 25 minutes. Games spend most of each frame in a loop waiting for vblank, and an idle-loop skip that advances the clock past repeated loop bodies cuts the token count by 2.6 to 4.2 times. Even with that, nobody is replacing an emulator with this.

That slowness is the point, in a way. A tool that is 200 times slower than the thing it replaces is not a product. It is a proof about the substrate. The weights format can now host a general-purpose machine, exactly, with frames that match a reference emulator bit for bit — and the only thing standing between this demonstration and something useful is speed, which is an engineering problem, not a conceptual one. The conceptual problem — can deterministic logic live inside a model checkpoint at all — was answered twice this week, first with a CPU and now with a console.

There is a version of this idea I would use, and it is not the console. It is the compiler. A team that can compile a small, auditable, deterministic circuit into weights gets a runtime that ships through model infrastructure, runs anywhere a model runs, and behaves identically every time — no interpreter version drift, no platform quirks, no tool-call round trip. The console is the demo. The compiler is the tool. And the 3.3-megabyte zip is the hint that compiled machines might turn out to be very cheap to ship, even when the checkpoint they ride in looks a gigabyte large.

A Nintendo that runs 200 times too slow is not a threat to any emulator. A compiler that turns machines into weight files might be the start of something else entirely.

Source: [Nesformer: An NES CPU compiled into the weights of a stock Qwen3.5 model](https://github.com/dbreunig/nesformer)
