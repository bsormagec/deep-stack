---
title: "The Regulator Can't Afford to Run the Model"
dek: "## The NSA is spending billions testing AI models. Independent oversight has a price tag that only the watched companies can pay — and that is the whole problem."
date: 2026-09-25
image: "/images/the-regulator-cant-afford-to-run.webp"
---
The interesting thing about the NSA spending billions of dollars testing AI models is not the money. It is what the number says about everyone else who wants to look under the hood.

The report, from the Washington Sun via two sources familiar with classified intelligence estimates, is simple: the NSA told lawmakers it is spending billions in taxpayer funds this year evaluating and testing advanced AI models. The work runs through the agency's Artificial Intelligence Security Center, which probes frontier models for national security vulnerabilities, and it is paid for out of classified portions of the national security budget. Lawmakers walked away from the briefing believing that a comprehensive federal AI regulatory system could cost tens of billions of dollars per year.

That sounds like a government procurement story. It isn't.

### The real line item

Testing is the first AI cost that does not scale down. Training a model gets cheaper per capability with every hardware generation; verifying one gets more expensive. A serious security evaluation is not one run of a model. It is thousands of adversarial probes, red-team agents hammering the system for weeks, repeated runs at the largest context windows, on the largest models — the exact configuration that is most expensive per token. Rigor is multiplicative: every capability the model gains multiplies the search space of things you must rule out.

One of the sources said the biggest expense is computing power: the chips required to run and test frontier models at meaningful scale. For context on that market, Anthropic has lined up computing deals that could cost as much as $517 billion, according to reporting from The Information cited in the piece. The tester must rent a shadow of that footprint just to inspect the thing. The second expense is people. The NSA is widely regarded as the deepest technical bench in government, and it still cannot bid against compensation packages in the hundreds of millions of dollars. Nathan Calvin, general counsel at the AI advocacy group Encode, said it plainly: "Having in-house AI evaluation capability I think is extremely important and necessary. But it is genuinely expensive." The reason, he added: "You're competing in bidding with some of the most price-insensitive customers."

Now put the legislature's numbers next to it. The Congressional Budget Office estimated the AI Security and Innovation Act — a bipartisan bill to establish a center on AI risks — at about $20 million per year. A separate House bill for an AI reporting and tracking system came to $36 million over five years. The gap between what Congress budgeted for oversight and what the NSA is actually spending is not a rounding error. It is on the order of a thousand to one.

### Who can afford to be the referee

For builders, the takeaway is practical: independent evaluation has become a luxury good, and that quietly decides who gets to be the referee. The same week this report surfaced, The Information reported that Google, OpenAI, and Anthropic are jointly planning their own AI safety "standards body" — a self-regulatory group that would define testing rules, incident reporting, and auditor qualifications, with no government in the room. Some safety experts propose the opposite arrangement: a tax on frontier developers to fund independent audits, on the theory that testing is a public good and the bill should not land on taxpayers. Anthropic and OpenAI have said they would accept greater federal oversight and might even pay for it.

Read both proposals as the same admission. The labs own the compute and the payroll to run serious tests at scale; the government would have to tax the labs to buy its way back to parity. Either way, the only institutions that can afford evaluation at frontier scale are the institutions being evaluated. That is not a conspiracy theory. It is an invoice.

The Hacker News discussion found the weak point in the headline immediately: "testing" is doing a lot of work. An intelligence agency with frontier models will use them for operations — penetration, analysis, monitoring — not just evaluation, and a classified budget line hides the difference. That skepticism is healthy. It does not fix the arithmetic. Shave the number in half, attribute the rest to operations, and the evaluation remainder still dwarfs every civilian oversight proposal by orders of magnitude. The CBO's $20 million never survives contact with the compute bill.

### The bill lands on you too

For builders, the honest version of this story is not about the NSA at all. It is about the line item that is about to appear — or already has — in every serious AI budget: evaluation. The model is the easy part. The proof that it behaves is the expensive part, and it gets more expensive as the model gets more capable. Customers in regulated industries are starting to ask for evidence, not demos: red-team reports, eval suites, regression numbers. If you ship a model you cannot afford to test, you are shipping a claim you cannot defend. The cost curve for training bends down. The cost curve for testing never flattens.

So budget your evals the way you budget your inference. Track what a full regression pass costs in dollars, not just minutes. Somewhere upstream, the NSA — backed by a defense budget near a trillion dollars a year — is discovering that even it struggles to afford the looking.

That is the problem.

Source: "Classified Estimates Show the NSA Is Paying Billions to Test AI Models," The Washington Sun (via Hacker News, ~67 points / 30 comments); CBO cost estimates, and The Information's reporting on frontier-lab compute deals and the proposed industry standards body, as cited in the piece.
