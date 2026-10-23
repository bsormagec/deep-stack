---
title: "The Rent Bill Nobody Itemized: 12–30 GB of Your SSD for On-Device AI"
dek: "Subtitle: macOS 27 quietly removed the off switch for Apple Intelligence. One open-source command gets your disk space back — and proves that local AI has never been free."
date: 2026-10-05
image: "/images/the-rent-bill-nobody-itemized-12.webp"
---
The interesting thing about RemoveMacAI is not that it deletes Apple Intelligence. It is that Apple Intelligence is the most honest illustration of local AI's hidden cost: a block of your SSD, silently reserved by the platform, with the exit door removed. The tool exists because Apple took away the one button that mattered — and somebody on Hacker News noticed.

Last week, developer Omar Lahore released RemoveMacAI, an open-source tool that turns off Apple Intelligence on macOS 27 and reclaims the disk space its models occupy. One command, fully reversible. It hit the Hacker News front page at 668 points and 453 comments, which is a lot of attention for what is essentially a cleanup utility. The attention is the story. Nobody rallies around a disk-space tool unless the problem it solves is felt as a grievance.

Here is the grievance. macOS 27 removed the single setting that used to disable Apple Intelligence entirely. The features now scatter across System Settings, and even after you toggle individual features off, the foundation models — several gigabytes each — remain on disk. The models arrive as MobileAsset downloads under `/System/Library/AssetsV2`, which is firmlinked to the Data volume, meaning they count against the same free space as your own files. Apple can update them silently without a full system update. Convenience for the platform, a quiet lien on your storage.

How big is the lien? The developer describes the core Apple Intelligence models as taking about 12 GB. Measured figures run higher: Apple documentation, as reported by MacRumors, says up to 14 GB on M3-or-later Macs with 12 GB of memory and up to 8 GB on other supported Macs, while independent measurement on macOS 27 found figures from about 14 GB on an M1 MacBook Air up to 29–30 GB on some M3 and M4 Macs. MacRumors previously reported cases where Apple Intelligence was using more than 30 GB. In one reported case, turning off Siri AI freed about 12.4 GB — and left about 25 GB still in place. And the tax compounds: Howard Oakley found his Time Machine backup set grew by about 10 GB after the upgrade, so the first post-upgrade backups are larger than usual.

## How the removal works

The mechanism is worth a look, because it shows what is actually standing between you and your own disk. RemoveMacAI does not hack the system. It installs a configuration profile that applies Apple's own restriction keys for Apple Intelligence and forces the settings that have no restriction key. The models are then removed through Apple's asset service, with System Integrity Protection left enabled and nothing under `/System` modified. To stop macOS from re-downloading them, the profile redirects each removed model's download attempt to a closed local port. Remove the profile and the previous settings return; macOS downloads the models again only when a feature explicitly requests them.

The feature list the profile switches off is a catalogue of the on-device AI decade: Siri (including "Hey Siri" and the menu bar icon), Writing Tools, Genmoji, Image Playground, the ChatGPT extension, summaries in Mail, Messages, Safari, Notes and notifications, Mail smart replies, inline text predictions, Spatial Photos, Photos Clean Up, and Xcode predictive code completion.

It is also a sober piece of engineering. The tool includes a `status` command that shows each feature and the actual size of the models on disk — an audit trail the operating system itself does not provide — plus a `--dry-run` mode, a `--keep` flag for leaving selected features on, and a full `revert`. It builds on `pared`, a research utility by developer 4evy that first mapped the asset service endpoints, model sets, and settings keys. The binary is signed with build provenance attestations verifiable via `gh attestation verify`.

That sounds like due diligence. It is, and it is also the catch.

## The catch: who do you trust with the removal?

Installing RemoveMacAI starts, for most users, with `curl -fsSL https://raw.githubusercontent.com/omlahore/RemoveMacAI/main/install.sh | bash`. A remote script, run as the user, installing a configuration profile — which is a mechanism of privilege — in order to delete multi-gigabyte model assets and rewrite system preferences. Every layer of the stack has done its paperwork: MIT license, signed binary, verifiable attestations, SIP intact, no `/System` modification, no network requests, no data collection. But the pattern itself is the thing to notice. The only way to take Apple's AI off your machine is to hand the keys of your machine to someone else's script. The platform made removal a privilege operation, so removal requires a privilege grant, and the safest privilege grant you can find is still a trust decision made in a terminal.

The second catch is smaller and pettier: even after the models are gone, System Settings keeps counting them for a while, because Apple's asset service releases the models immediately but macOS deletes the files on its own schedule. The bill lingers on the statement after you have paid it.

The third catch is the real one for builders. Turning all of this off breaks things beyond Siri. Apps that use Apple's on-device models — the Foundation Models framework and the Use Model action in Shortcuts — stop working, along with Visual Intelligence and natural-language editing in Calendar. That is worth pausing on, because it is where this story stops being about one man's disk and starts being about a platform tax.

## The tax you ship to your users

If you build on the Foundation Models framework, your app runs on the same on-device models that RemoveMacAI deletes. That means your users are paying this cost whether or not they open your app: tens of gigabytes of SSD, an idle slice of CPU from AI daemons, bigger backups, and — now — no sanctioned off switch. This pipeline has been tracking local inference costs all year: the VRAM bill for running a 125B model on a gaming GPU, the token bills for agent loops, the memory tax of on-device kernels. This is the mainstream version of the same ledger. "Free on-device AI" is free the way a timeshare presentation is free. Somebody pays for the storage, and the somebody is the user, and the amount is not itemized.

That is why the Hacker News thread kept going for 453 comments. The commenters were not arguing about the tool. They were doing something more interesting: auditing the premise. The question under the whole thread is who owns the storage on a computer you bought — and what it means that the operating system treats a chunk of it as the platform's by default, with the exit engineered out and the re-entry left to whoever's shell script you trust most.

The interesting thing about RemoveMacAI is not the command. It is that the command had to exist at all.

For builders, the takeaway is practical: every on-device model you depend on is a storage and lifecycle cost your users cannot easily see, price, or remove. Ship the dependency, and you ship the lien. Budget it, disclose it, and at minimum, never make your app the reason someone discovers their SSD is 30 GB smaller than they thought.

Your disk was already paying for the AI boom. It just wasn't itemized.

Source: [RemoveMacAI](https://github.com/omlahore/RemoveMacAI)
