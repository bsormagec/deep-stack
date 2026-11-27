---
title: "Self-Hosting Got Cheap Again"
dek: "The interesting thing about AI and self-hosting is not the tools. It is that the price of running your own stack collapsed — and the rented cloud's convenience premium is shrinking with it."
date: 2026-11-27
image: "/images/self-hosting-got-cheap-again.webp"
---

Jan-Lukas Else has self-hosted for years. At some point the enthusiasm faded. Not because he stopped believing in it — maintaining what already ran was enough, and every new experiment cost an evening of reading changelogs, troubleshooting, and documentation. The hobby didn't die. It got expensive in the one currency that matters to a hobbyist: attention.

Over the last few months, that changed. AI is the reason, and the irony is not lost on him: a technology dominated by big tech is helping him depend less on big tech.

## The friction was the product

Else's infrastructure configuration lives in Git repositories — Docker Compose files, scripts, configuration files. That detail is the whole story. Once the infrastructure is a codebase, a coding agent can work on it like any other software project. Trying a new service, adjusting a configuration, automating a chore — all of it now costs a fraction of the effort it used to.

That sounds like a small productivity gain. It isn't. Self-hosting was never held back by the price of the hardware. A used thin client costs less than a month of a mid-tier VPS. What held it back was the evening. The evening spent reading a changelog before bumping a version. The evening spent debugging why a service won't start after an update. The evening spent learning a technology you were curious about but never had a reason to master. When the evening disappears, the hobby comes back.

## Half a day instead of a week

NixOS is the clearest example. Else had always liked the idea of declaratively configuring an entire system — he even ran it on his laptop during what he calls his Linux honeymoon phase. But getting everything configured the way he wanted was a hurdle he never quite cleared. With an AI agent, he now runs NixOS extensively on his home server.

The same pattern shows up on his VPS, where he built his own Debian-based bootc image — his entire operating system configuration defined in Git, automatically built into a bootable container image. Even with AI help, it took him half a day to set up a few months ago. Without AI, he estimates it would have taken at least a week. That estimate is his, not a benchmark, and it should be read as one. But the direction of it is the point: a week of friction is a project you never start. Half a day is a Saturday afternoon.

The Hacker News discussion, which pushed the post to 953 points and 457 comments, focused on exactly this mechanism — not whether self-hosting is virtuous, but whether the agent actually lowers the cost of entry or just hides the cost until something breaks.

## The update loop that runs itself

The other half of the story is automation, and Else is careful to say none of it requires AI. Renovate watches for new releases and opens pull requests. Merging one — which he can do from his phone on the sofa — triggers GitHub Actions or Forgejo Actions workflows that build and deploy everything. A single git push is enough, and sometimes not even that.

DevOps has been around for a long time, and he says so himself. What AI did was help him assemble the pieces he had never quite gotten around to assembling. The benefit compounds: every automated task is one less tedious job the next time he wants to change something or update a service. The maintenance burden of each additional service shrinks, which is what makes adding another service cheap enough to be fun again.

## The box in the corner got an upgrade

As he started hosting more things, Else moved services off his VPS and back onto his home server. The HP t640 thin client that had been his home server gave way to an ASRock DeskMini A300 that had been sitting unused. He upgraded its CPU from an AMD Ryzen 5 2400G to a Ryzen 5 PRO 4650G and swapped the stock cooler for a quieter Noctua — both bought cheap on classifieds. Noise was the reason he had switched to the thin client in the first place.

There is something satisfying about putting hardware you already own back to use, he writes, and the sentence lands because it inverts the usual story. The cloud narrative says your hardware is obsolete and the answer is to rent someone else's. The self-hosting narrative, refreshed by AI, says the box you already own got more useful because the labor around it got cheaper.

## Build it instead of hunting for it

The same logic now applies to software that doesn't exist yet. For smaller problems, Else builds his own tools instead of searching for an open-source project, comparing alternatives, and bending one to fit. He has built tools in Go — his preferred language — to automatically download invoices, fetch e-papers, and grab Linux ISOs. They don't need to support every use case, have an elaborate interface, or interest anyone but him. They just need to solve his problem.

That is a quiet shift in how software gets made. The build-versus-buy decision used to be settled by the cost of building. When building a small, single-purpose tool costs an evening of prompting instead of a weekend of coding, the answer flips for a whole class of problems that were never worth building before. The tool doesn't need to be a project. It needs to work.

## The catch: the debt is still yours

Else names the downsides himself, and they are worth carrying in full. Every additional service is another thing that needs to be maintained. AI-generated software isn't exempt from bugs, security issues, or technical debt. Having an agent make changes to your infrastructure doesn't absolve you of the responsibility of understanding those changes. And when implementing an idea becomes this easy, it's worth asking whether the idea is worth implementing at all.

That last point is the one builders should sit with. The friction that AI removed was also a filter. The evening you spent reading documentation was, among other things, a cost that made you think twice. Remove the cost and the temptation to deploy things simply because you can grows with it. The hobby doesn't police itself.

There is also a dependency question he doesn't dodge. The configs he builds with AI's help can exist independently of the AI services that helped create them, and he says he mostly uses open-weight models, which gives him a choice of providers. Which models, exactly, he doesn't say — so the claim stays his, unverified. The configs surviving is the durable part. The models are replaceable. That is the difference between renting a tool and owning the thing the tool made.

## The meter moved to the basement

For builders, the takeaway is practical: the cost that kept self-hosting a niche hobby was never the hardware or the software. It was the labor of keeping it all running, and that labor just got dramatically cheaper. The cloud still wins on convenience for anything that has to be up at 3 a.m. with someone else's pager going off. But for the growing list of things you run for yourself, the premium you pay for someone else to run them keeps shrinking — because the evening it used to cost you now costs a prompt.

That is the problem the cloud has to answer. Not that self-hosting is better, but that the price gap between renting and owning just narrowed, and it narrowed because of the very technology the cloud sells.

Source: [AI made self-hosting fun again](https://janlukas.blog/posts/ai-self-hosting)
