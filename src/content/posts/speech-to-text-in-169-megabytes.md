---
title: "Speech to Text in 16.9 Megabytes"
dek: "## Whistle does not shrink the cloud bill. It deletes the cloud from the loop."
date: 2026-10-08
image: "/images/speech-to-text-in-169-megabytes.webp"
---
The interesting thing about Whistle is not that it is small. It is that it is small enough for the size to stop being a design constraint.

Cactus Compute released Whistle on October 2, and it reached the top of Hacker News today with 139 points and 36 comments. According to Cactus Compute's launch post, the whole speech-to-text model is one 16.9 MB file that runs on the CPU with no dependencies. For context, the same post puts Whisper base at 145.3 MB and Moonshine tiny v2 at 41.9 MB. Whistle is, by Cactus's own comparison, 8.6 times smaller than Whisper base.

That sounds like a compression story. It isn't. It is a placement story. A 145 MB model is a service you call. A 16.9 MB model is a file you ship inside something else — a phone app, a wearable, a smart-home hub, a car, a microcontroller-class device that was never going to get a reliable network connection in the first place. The question stops being what transcription costs per minute and becomes whether transcription exists in the product at all.

## What the 16.9 MB buys

Per Cactus Compute's launch post, Whistle transcribes 16 kHz mono audio in clips of up to 30 seconds in one pass, in seven languages: English, German, French, Spanish, Italian, Dutch and Polish. The language is detected automatically unless the caller forces it. Every call returns the transcript plus the detected language, the time to first token, and the decode speed. Word timestamps are available per word, each with a start, end and probability. Keyword biasing lets a developer lift the odds on names and product words the model may never have heard in training. Silence and steady noise return an empty transcript instead of an invented sentence — a small detail that matters more than most benchmark rows, because a hallucinated command in a smart home is not a word error, it is an action.

The speed numbers are the part worth translating. On an Apple M4 Pro CPU, for 10 seconds of audio, Cactus reports time to first token of 11.1 ms for Whistle against 73.2 ms for Whisper base and 22.8 ms for Moonshine tiny v2. Decode runs at 1,319 tokens per second for Whistle against 266 for Whisper base and 262 for Moonshine, in the same Cactus-run comparison, each model on its official runtime at its defaults. For builders, the takeaway is practical: at 11 ms to first token, transcription stops feeling like a request and starts feeling like a keystroke. Voice interfaces fail on latency long before they fail on accuracy, and this is the first number in the launch that is aimed at the right failure.

On accuracy, Cactus says Whistle is ahead on LibriSpeech test-clean and test-other, on SPGISpeech, on Earnings-22 and on the FLEURS average, while Whisper base is ahead on TED-LIUM, on AMI and on the MLS average. Those word-error-rate figures are measured by Cactus for Whistle — over 86,174 utterances, per the launch post — and taken from the other models' authors for the comparisons. That is the honest way to read them: credible, company-run, and not yet an independent verdict.

## One engine, two models, no round trip

The architectural move matters more than the file size. Whistle loads into the same C++ engine as Needle, Cactus's small on-device language model, from the same container format and the same quantisation scheme. Load both files together and, per the launch post, the engine can take an audio clip, transcribe it, run the transcript against a set of tools and return the function calls as one JSON object — without the caller ever handling the transcript in between.

That sounds like a convenience. It is a cost removal. The normal voice-agent stack pays for a network round trip, a hosted speech API, a second hosted model call, and the privacy exposure of sending a user's voice to a server to turn on a kitchen light. Whistle plus Needle collapses that into a local call measured in milliseconds and priced at zero marginal cost per request. There is no per-minute transcription fee, no usage meter, no cold start. The cost is fixed at build time: engineering effort to integrate a C++ engine, and the discipline of working inside a 30-second, seven-language envelope.

The engine design reflects that discipline. The decoder is laddered, in Cactus's terms: a flag at load time selects how many decoder layers run, and every depth from two layers up was trained as a model in its own right, while the encoder always runs in full. A weaker device does not get a broken model; it gets a shallower rung of the same weights. The engine ships prebuilt for seventeen targets, per the launch post, from macOS and Linux through Android, iOS, watchOS, Windows on ARM, RISC-V and the browser.

## The catch is the envelope

None of this makes Whistle a Whisper replacement for general transcription. The limits are printed plainly in the launch post: 30 seconds per pass, seven languages, mono audio at a fixed sample rate. Long-form transcription means chunking or the streaming path, which re-transcribes buffered audio and commits words two passes agree on. Whisper base still wins several of the reported benchmarks. And the headline speed and accuracy figures are Cactus's own measurements on one machine, an Apple M4 Pro — a laptop chip, not the microcontroller the marketing points at. What Whistle does on a genuinely weak CPU is the number that decides whether the placement story is real, and it is not in the launch post.

Hacker News commenters will rightly press on exactly that gap. The discussion so far is small, and the strongest reading of Whistle today is as a direction with a working artefact, not a settled result.

There is a version of this idea I would use. Not for meeting transcription, not for archives — for the command layer: short, private, latency-sensitive voice input on devices that already have a CPU and no business sending audio anywhere. That niche is large, underserved, and currently rented from cloud providers at per-minute prices for what is, mechanically, a local pattern-matching problem.

The broader pattern is the one Deep Stack keeps tracking. The frontier keeps selling intelligence by the token. Meanwhile the local stack keeps quietly absorbing the jobs that never needed a frontier model: first text tool calls at a few megabytes, now speech at 16.9 MB, on the same engine. Each absorption is unglamorous. Each one removes a meter.

Speech to text in 16.9 MB is not a smaller Whisper. It is one less reason to call the cloud.

Source: [Whistle: Speech to Text in 16.9 MB](https://cactuscompute.com/blog/whistle)
