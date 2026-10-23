---
title: "AliExpress Is Listening to You — Silently"
dek: "How a silent WebAudio fingerprinting script exposed itself through a Bluetooth headphone — and why your browser choice still matters."
date: 2026-08-23
image: "/images/aliexpress-is-listening-to-you-silently.webp"
---
The invisible fingerprint: silent audio waves measuring your hardware.

A developer recently noticed something strange with his Bluetooth headphones. They support multipoint audio — connected to both his PC and phone at the same time. But whenever an AliExpress tab was open on the PC, audio from his phone would refuse to reach the headphones. The link was stuck on the PC side, locked by a stream he couldn't hear, couldn't see, and couldn't stop.

He dug into the obfuscated JavaScript and found something far more interesting than a bug: AliExpress was running **WebAudio fingerprinting** — playing an inaudible sound and measuring the microscopic hardware differences in how each device processed it, building a persistent device fingerprint that works without a single cookie.

## How audio fingerprinting works

Your browser's WebAudio API processes audio through floating-point math. Different CPUs, instruction sets, and browsers produce slightly different results for the same input. A script can generate a signal, run it through a chain of audio nodes, hash the output, and get a value that's reasonably unique to your machine. Repeatable, persistent, and no cookies to delete.

This technique has been known since 2013, and most trackers use `OfflineAudioContext` — a mode that renders faster than real-time into a buffer without ever touching your speakers. Fully silent, fully invisible, no side effects.

## The irony: it broke Bluetooth

AliExpress's script didn't use the offline context. It used a real `AudioContext` — which keeps an actual audio pipeline open on your system. That's why the developer's Bluetooth connection got hijacked: the silent stream held the PC→headphone link active, blocking his phone. Tracking code designed to be invisible ended up exposing itself through a headphone jack.

> "Given enough victims, your attack code will change something that makes someone notice."
>
> — Tom Ritter, lead privacy engineer at Mozilla, *quoting the XZ backdoor saga*

## How effective is it, really?

Ritter [analyzed the code](https://ritter.vg/blog-webaudio_alibaba.html) and found that Firefox has largely neutralized this vector. Since Firefox 118 (three years ago), WebAudio output has been normalized. Telemetry shows:

- 99.24% of Firefox users fall into just 3 buckets
- The 3 buckets map to CPU families: x86 (no FMA), x64 with FMA, ARM/NEON
- Only 48 users out of millions landed in a unique long-tail bucket

In other words: on a privacy-focused browser, this specific technique can at best guess whether you have an x86 or ARM CPU. Near-useless as a unique identifier. Brave has been injecting randomized fingerprints since 2019 and blocks AliExpress's specific scripts by default.

## The real lesson

WebAudio is just one signal. Fingerprinting combines screen size, fonts, GPU, OS, network data — a *canvas* of details that's far harder to defeat than any single technique. Blocking cookies isn't enough. If you want to actually reduce how much of your device is silently measured:

- Use Brave (fingerprint randomization by default) or Firefox (118+, WebAudio normalized)
- Enable strict fingerprinting protection where available
- Keep AliExpress tabs closed when you're not using them — they cost more than a silent audio stream

The full technical write-up is [here](https://blog.laserphile.com/2026/08/aliexpress-webpage-keeping-multipoint.html), the Hacker News thread is [here](https://news.ycombinator.com/item?id=49372583) (1000+ points), and the Firefox engineering analysis is [here](https://ritter.vg/blog-webaudio_alibaba.html).

AliExpress's script was caught because it broke someone's headphones. How many fingerprints are running on your machine right now, silent, without any hardware to betray them?
