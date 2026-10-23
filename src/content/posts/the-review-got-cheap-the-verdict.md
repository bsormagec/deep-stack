---
title: "The Review Got Cheap. The Verdict Didn't."
dek: "The interesting thing about the PostgreSQL 19 delay is not that AI found too many bugs. It is that finding a bug and clearing a bug are two different jobs, and only the first one got cheaper."
date: 2026-10-16
image: "/images/the-review-got-cheap-the-verdict.webp"
---
PostgreSQL 19 was slated for late September or early October, according to The Register's October 16 report. It is now expected around November 19. Between eight and ten significant features have been dropped from the release and pushed toward PostgreSQL 20, per the same report. That is an unusual number of reverts for a project that has made a habit of shipping on time.

The easy story writes itself: the machines reviewed the code, found defects the humans missed, and the release drowned in its own quality. That story is half true. The other half is more useful, and less flattering to everyone selling review automation.

## A higher bar, applied late

Peter Eisentraut, a leading PostgreSQL committer, offered the first explanation, in a blog post cited by The Register. Some of the reverted features, he wrote, had significant architectural defects that would have been hard to fix quickly during beta. Separate from those, LLM-assisted review uncovered a long tail of smaller edge-case issues — the kind that in earlier cycles would have surfaced slowly as bug fixes over the five years after launch.

His arithmetic is the part worth keeping. Stare at a list of forty defect reports, he argued, and even if the average fix is three lines, each report carries a fixed overhead: reproduce it, judge it, patch it, re-review it, commit it. Multiply that overhead by forty and you run out of calendar. The finding is cheap. The verdict is not.

Eisentraut also stressed what did not happen. The reverts were not the result of vibe coding, he said, because the technique was not available when most of the features were written. And he expects the situation to sort itself out: the quality bar rose after the code was written, and once the bar stops moving mid-cycle, future cycles should absorb it.

That sounds like a tooling success story. It isn't — or at least, it is not the whole story.

## The audit that broke the headline

Tomas Vondra, another PostgreSQL contributor, went through the reverts one by one and checked whether AI actually found the problems that caused them. His conclusion, published on his own blog, does not match the headline.

Of the twelve reverts he examined, only a handful came out as AI or possibly AI. The clearest case was an expansion of CREATE SCHEMA, where an Opus review caught a semantic change against earlier behaviour. Most of the rest traced back to ordinary human review: concurrency behaviour the authors already knew about, dependency and permissions questions, design objections raised on the mailing list by senior reviewers. In several cases an AI review existed somewhere in the thread and added little to what humans had already found.

Vondra counted something else as well, and it changes the mechanism entirely. The number of reverts in the PostgreSQL 19 cycle is not exceptional compared with earlier releases going back to PostgreSQL 14, by his count of the git history. What changed is the timing. In previous cycles, reverts clustered shortly after feature freeze, around day 300 of the cycle. In this cycle that bump is missing. The line stays flat, then spikes around day 430, in early September. Review did not increase. Review happened late.

Late review is a capacity problem, not a detection problem.

## The queue that ate the reviewers

Why was review late? Vondra points at the security queue, and the numbers there are not subtle. The project's security page lists 44 CVEs for 2026 so far, he notes, against roughly five in the previous year. The August 2026 patch release for PostgreSQL 18 alone carried 28 CVEs, a figure also cited in the Snowflake engineering post he was responding to.

Those reports do not triage themselves. The people who handle security reports in PostgreSQL are substantially the same small pool of senior contributors who do post-commit review during stabilization. Spend that pool on vulnerability reports through July and August — some of them AI-generated or AI-assisted, per Vondra — and the design problems in a feature like SQL/PGQ, one of the reverted features named by The Register, get found in September instead of April.

This is the pattern Vondra called the AI inversion in an earlier post, as summarized by The Build's analysis of the cycle: these tools make producing a patch, a review, or a vulnerability report dramatically cheaper, and do close to nothing for the person who has to evaluate it. A patch you can ignore. A review, under the customs of the hackers mailing list, demands an answer to every point. A generated review with six weak findings does not cost six times nothing. It conscripts a maintainer into writing six rebuttals.

PostgreSQL is not the first project to hit this wall. The Build notes that curl hit the same wall from the security side and stopped taking vulnerability reports for a month. QGIS, covered in this newsletter earlier this week, chose the blunter instrument and banned AI-assisted contributions outright after the submission stream exceeded human review capacity.

Three projects, three different doors, same room: the scarce resource was never generation. It was judgement.

## What PostgreSQL still does not have

One more detail from Vondra's audit deserves attention, because it decides whether the next cycle goes better. PostgreSQL currently has no official AI contribution policy, though one is expected. That absence is why his audit had to be done by thread archaeology — inferring tool use from mailing-list posts, with the caveat that undisclosed use would skew the count.

Compare the record where disclosure did happen. The senior contributors who used these tools in public — ranking the riskiest patches with an LLM, running a model review alongside a human one, then filtering the output before posting it — produced the evidence that let the project argue with itself honestly. The filtering was the review. Strip the filtering out and you have plausible text with nobody accountable for it.

That is the difference between a tool in a maintainer's hand and a flood at a maintainer's door. Same model. Opposite economics.

## The practical bill

For builders, the takeaway is practical: budget the verdict, not the finding. If your team adds AI review, AI security scanning, or AI anything that produces reports, the cost line is not the subscription. It is the senior hours required to reproduce, judge, and close what the tool surfaces. Forty three-line fixes is not a small bill when each one needs a verdict from the same two dozen people who also carry your security queue.

There is a second, quieter lesson in the timing data. PostgreSQL 19 will likely be a more robust release for the extra scrutiny, as Eisentraut himself argued. The delay is not a failure of the tools. It is a schedule that assumed review capacity was elastic when it is the least elastic thing in the building. The features were not lost — most are expected in PostgreSQL 20. They were repriced, in the only currency that matters here: maintainer attention, spent late.

The interesting thing about AI review is not that it finds more. It is that it reveals how little finding was ever the bottleneck.

That is the bill.

Source: [Postgres 19 delayed after AI reviewers find more bugs than humans can fix](https://www.theregister.com/databases/2026/10/16/postgres-19-delayed-after-ai-reviewers-find-more-bugs-than-humans-can-fix/5303471)
