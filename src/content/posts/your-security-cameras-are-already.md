---
title: "Your Security Cameras Are Already Listening"
dek: "When cheap AI models meet the surveillance infrastructure in your driveway"
date: 2026-09-01
image: "/images/your-security-cameras-are-already.webp"
---
Jason Tucker had three security cameras and a wife who liked identifying birds with an app on her phone. So he pointed the cameras' microphones at BirdNet-Go, a self-hosted Docker container that runs local AI models against audio streams 24/7. Over 12 months, the system logged 418,726 detections across 271 unique species. His most common bird: the House Finch, with 118,667 hits. Average confidence: 60.9%.

None of this required cloud services, API keys, or a monthly subscription. The models run on his hardware. The audio never leaves his network. A Raspberry Pi is enough.

This is the kind of project that gets 575 Hacker News upvotes and 153 comments, and I get why. It’s technically neat, it’s wholesome, and it does something unexpected with infrastructure people already own. But the interesting part isn’t the birds.

## The perception tax is dead

For years, doing anything useful with ambient sensor data meant paying rent to someone. Audio classification meant AWS Transcribe or Google Cloud Speech. Computer vision meant sending frames to an API endpoint. Every inference call cost money, added latency, and pushed your data through someone else’s servers.

BirdNet-Go skips all of it. It runs a TensorFlow Lite model locally — BirdNET 2.4 identifies 6,000 species, and the newer Google Perch V2 model covers 14,795. On a Raspberry Pi. 24/7. Zero cost per inference.

This matters because it changes the economics of always-on sensing. When the marginal cost of processing audio or video drops to zero, you stop asking “should I analyze this?” and start asking “what else can I point at it?”

The Hacker News comments lit up with exactly this pattern. One person built a sprinkler system that identifies birds and sprays them away from the pool. Another built a portable BirdNET rig with an e-ink display for hikes. Someone in Singapore feeds RTSP streams from two security cameras plus a Jabra speakerphone mic into a Pi 3, tracking both birds and aircraft. The pattern is the same every time: existing hardware plus local AI model plus Docker equals new capability.

## The sensors were already there

Here’s what I find slightly unsettling. Jason bought those security cameras for security. The microphones were an afterthought, bundled into hardware designed for surveillance. And now those always-on microphones — pointed at his yard, recording 24/7 — are doing acoustic classification with a local ML model.

A Hacker News commenter put it bluntly: “DIY NSA.” Another said: “Eerie how easy it is to leverage these always-on network connected sensors we keep putting everywhere to get precise data profiles.”

They’re not wrong. The pipeline that makes BirdNet-Go work — always-on microphone, audio capture via RTSP, real-time ML classification, push notifications — is architecturally identical to a surveillance system. The only difference is what the model is trained to detect. Swap “House Finch” for “specific person” and you’ve got a targeted audio monitoring system running on consumer hardware.

Jason’s system even detected a fart. His neighbor walked past the driveway and BirdNet-Go flagged it as a “non-bird vocalization.” The system heard it, classified it, and sent a Home Assistant notification. The same pipeline that logs bird songs logged a bodily function and sent it to a phone. That’s how good these models are getting.

## Ring and Flock missed the assignment

The HN discussion surfaced something that should bother Ring and Flock and every other security camera company. Their customers already have the hardware. They already have RTSP streams. They already have always-on microphones. And the software to do something interesting with that audio — something that isn’t surveillance — is free, open source, and runs on a Pi.

A commenter asked the obvious question: “Why wouldn’t Ring integrate this into their cameras? Seems like a marketing no brainer!” Another pointed out that Flock could rebrand their surveillance cameras as bird monitoring devices: “Stop cutting down our bird monitoring devices! We’re doing science!”

This is the real business insight buried in the project. When your surveillance hardware gets repurposed for something people actually enjoy, the narrative around it shifts. It’s hard to campaign against “bird monitoring equipment” even if the audio pipeline is identical to what you were campaigning against before.

Security companies could solve their optics problem by adding ambient classification to their feature set. Not because birdwatching is profitable, but because it changes how people feel about the always-on microphone in their driveway. “It listens for birds” is a much easier sell than “it listens.”

## The real product is the model

One thing buried in the comments: Merlin Bird ID, the Cornell app that 80 million people use for bird identification, and BirdNet-Go use the same underlying model. The same ML research powers both the phone app and the self-hosted Docker container. Cornell made the model open, BirdNet-Go made the deployment open, and now anyone with a camera and a Pi gets the same classification quality that a university spent years developing.

This is how AI models become infrastructure. Not through a killer app, but through the slow diffusion of open models into every possible deployment context. One day someone points a security camera mic at it. The next day someone builds a portable version for hiking. The day after that, someone integrates it with FlightRadar data and tracks both biological and mechanical birds from the same Raspberry Pi.

The species detection will keep improving. Perch v2 already covers nearly 15,000 species. Someone will fine-tune it for insects, or frogs, or sirens. The architecture is the same: always-on sensor, local inference, no cloud.

## What to actually do with this

If you have security cameras with microphones and a passing interest in wildlife, BirdNet-Go is a Docker container away from a working system. The project is at github.com/tphakala/birdnet-go. It connects to RTSP streams, runs detection 24/7, sends alerts for specific species, integrates with Home Assistant via MQTT, and pushes data to BirdWeather for community science.

But the real takeaway isn’t about birds. It’s that the hardware in your home already has more sensing capability than you think, and the software to unlock it is getting cheaper and more capable every quarter. The security cameras you installed to catch porch pirates can also catalog your backyard ecosystem. The same pipeline works for any always-on audio classification task.

The sensors are neutral. The model is the product decision. And right now, someone with a Pi and a Docker compose file is building things that big companies should have built two years ago.

Source: [I turned my security cameras into an automatic bird identification system](https://jasontucker.blog/how-i-turned-my-security-cameras-into-an-automatic-bird-identification-system-with-birdnet-go/)
