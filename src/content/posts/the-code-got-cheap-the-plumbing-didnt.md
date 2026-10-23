---
title: "The Code Got Cheap. The Plumbing Didn't."
dek: "## Anthropic replaced git because 30,000 merges a day broke infrastructure built for human scale"
date: 2026-10-14
image: "/images/the-code-got-cheap-the-plumbing-didnt.webp"
---
The interesting thing about Anthropic rebuilding source control is not that git failed. It is where the failure showed up. Coding stopped being the bottleneck, and everything underneath coding — source control, builds, review, CI — turned out to be the expensive part.

Anthropic says it averaged around 2,500 code changes merged per day in May 2026, and more than 30,000 per day by September, according to its engineering post published October 13, 2026. That is a twelvefold increase in four months, driven by Claude writing and iterating on code autonomously. The company's response was not a bigger git server. It built Scion, an in-house version control system, and migrated its entire monorepo off git in five months, alongside a code review surface called Antique, code search, and a source control permissions system — all in the same period, per Anthropic.

That sounds like an infrastructure flex. It isn't. It is a cost story, and the bill arrived at the layer nobody was watching.

### The numbers that broke git

Start with the shape of the repository, as Anthropic reports it. The history of the main branch alone is almost 100 GB. A compressed working copy is over 25 GB. The company performs on the order of 25 million code checkouts per day for CI, before counting developer environments, agent sandboxes, and research jobs. Fetched naively, Anthropic calculates, that would be over 600 petabytes of git traffic per day.

Git has answers for pieces of this — shallow clones, sparse checkouts, promisor remotes, internal mirrors, repository snapshots in blob storage. Anthropic says it used all of them, and at its peak operated several hundred internal git mirrors. The mirrors bought time and then stopped scaling: snapshots fell further behind the tip of main between refreshes, and the operations that depend on history, like diff and blame, got harder to keep working on partial clones.

Read that sequence carefully, because it is the part that generalizes. None of these workarounds failed technically. They failed economically. Each one is staff time, fleet capacity, and operational care spent moving copies of the same repository around. When the merge rate rises twelvefold, the copying tax rises with it, and eventually the tax is the budget.

### What Scion actually changes

Scion's design starts from one observation Anthropic states plainly: at their scale, nearly all clients are agents and jobs that are online by definition, so git's founding assumption — every clone is a complete, offline-capable repository — is not a feature. It is the cost.

So Scion inverts it. Clients are always online and hold only a bounded local cache. The server creates commits, performs merges and rebases, and answers history and blame questions. The unit of work is a "changeset," an entry in a write-ahead log that records which files changed relative to its first parent, with content-addressed pointers to the file contents in blob storage. There are no packfiles and no repository maintenance. Checkouts are sparse by design, virtualized where possible, and many jobs skip the checkout entirely and work through the API — a CI job that needs a diff can simply ask the server for it.

The reported results, from Anthropic: each tier of the system maintains a cache hit rate above 99%; the infrastructure footprint is 200 times smaller in CPU and memory than the previous git mirroring setup; checkouts run roughly two orders of magnitude faster, in seconds rather than minutes; and CI alone realized a 25% CPU capacity win.

Those are Anthropic's own numbers, published by the team that built the replacement, and they should be read with that discount applied. But even halved, the direction is not subtle. The savings did not come from a faster implementation of git's model. They came from deleting the copies.

### The catch Anthropic admits — and the one it doesn't

To its credit, the post is honest about scope. Scion is not a git replacement for general use, Anthropic says; the design only makes sense for enormous monorepos run by tens of thousands of engineers or swarms of agents. The company also concedes a point most vendors would bury: its ability to spend tokens on internal work far exceeds what other businesses would realistically spend, and that spend is part of how a team of seven built Scion and Antique and migrated in five months while merge volume grew tenfold. One internal model pass reportedly rewrote the git-to-Scion ingestion pipeline to use 20 times less memory and run 4 times faster than the handwritten prototype — again, Anthropic's own account.

The catch it underplays is different. Scion is not available. There is no product, no open-source release, and Anthropic argues a public version would not be broadly useful because the surrounding pieces — review, search, CI — are bespoke. What it offers the rest of the industry is advice: git servers do not have to mirror the client's model, forges could expose server-side operations as standard APIs, and git's sparse and shallow features could compose better. That is reasonable advice. It is also advice that leaves every other company to fund its own version of the wall.

And the wall is not only source control. Anthropic notes, almost in passing, that a proper merge queue does not make much sense at agent scale — hundreds or thousands of changes can merge while tests are still running — so it has shifted weight to post-merge and pre-deploy testing instead. Translate that out of Anthropic's scale and it reads plainly: review, CI, and merge discipline were all priced for a world where code arrived at human speed. Every one of those line items is now being repriced.

### What this means at normal scale

No normal team needs to build a version control system, and Anthropic is right that almost nobody should. The transferable lesson is narrower and more useful. When agents write the code, the scarce resource stops being code production and becomes everything that validates, moves, reviews, and lands code. Those costs are mostly infrastructure and mostly invisible in a per-token price comparison.

The Hacker News discussion, where the post drew 788 points and 815 comments at fetch time, circled the obvious question of whether this is a problem anyone else actually has yet. That is the wrong frame. The question is which of your own systems quietly assumes a human merge rate. CI minutes, review queues, flaky-test budgets, sandbox provisioning — each one has a multiple at which it stops being overhead and becomes the constraint.

For builders, the takeaway is practical: before you scale the number of agents writing code, price the path that code travels after it is written. Anthropic could afford to rebuild that path in five months with seven people and an effectively uncapped token budget. Most teams will meet the same wall with neither.

The model bill was the visible one. It was never the whole bill.

Source: [Redesigning source control at Anthropic](https://www.anthropic.com/engineering/redesigning-source-control)
