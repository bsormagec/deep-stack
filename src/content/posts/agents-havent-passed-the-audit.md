---
title: "Agents Haven't Passed the Audit"
dek: "The best AI agent on the market completes one in ten professional tax assignments. The failures are not arithmetic. They are judgment — the part of the job nobody thought to benchmark until now."
date: 2026-10-31
image: "/images/agents-havent-passed-the-audit.webp"
---
The interesting thing about Surge AI's DAYJOB: Tax benchmark is not the score. It is what the score measures. Most benchmarks hand the model a defined problem: answer this question, calculate this return, fill in this missing field. DAYJOB: Tax, published October 27, 2026, does something closer to real work. It hands the agent a client request, a pile of messy records, and an instruction that is deliberately incomplete — and then grades whether the agent figures out what the job actually is.

The result is blunt. Across 50 professional tax assignments spanning eight areas of practice, the best frontier agent passes 10.8% of them. That is Claude Sonnet 5.5, according to Surge's leaderboard. Claude Fable 5.1 follows at 9.6%, Claude Opus 5.5 at 9.2%. Every other model tested scores lower. The benchmark's own summary line is the verdict: agents haven't yet passed the audit.

## The bar is the job, not the quiz

A pass in DAYJOB: Tax is not a passing grade on a test. It is pass@1 at a 95% rubric threshold: a single attempt must satisfy at least 95% of the task's criteria, covering calculations, supporting evidence, consequential issues, and the finished deliverable. That is a professional standard, not a quiz standard, and it is the right one. A tax return that gets 80% of its criteria right is not 80% useful. It is a filing with an error in it.

The assignments are built to resemble the work itself. The benchmark contains 1,789 workspace files, a median of 30 per assignment and as many as 123, including 1,487 PDFs, 117 Excel workbooks, and 38 Word documents, according to Surge. The files are filed and draft returns, K-1s, W-2s, IRS notices, general ledgers, payroll records, contracts, and correspondence — plus the unstandardized evidence tax professionals actually deal with. One assignment includes a photograph of a handwritten receipt for merchandise purchased for resale; the agent has to read the item descriptions and amounts, reconcile them against spending records, and work out how the purchases affect inventory and cost of goods sold. Another involves an industrial silo-services company whose client assumes it operates only in Alabama, while its field dispatch log shows crews working across five states — evidence directly relevant to its multistate tax obligations.

That sounds like a lot of context to feed a model. It is. And that is the point. The benchmark's earlier releases, DAYJOB: Healthcare and DAYJOB: Finance from September 2026, showed the same pattern: the strongest model completed under a quarter of assignments in each. Tax is worse, at roughly one in ten. The longer the horizon and the messier the record, the further the frontier falls behind the demo.

## The failure is noticing, not computing

Surge's two case studies make the failure concrete, and neither one is about arithmetic.

The first is Anna, who is planning to sell her condo. She moved out in August 2024 and wants to know whether closing in October 2026 or January 2027 is better for taxes. An agent reviewed both dates and correctly concluded that either would satisfy the residence requirement for an exclusion worth up to $250,000 in gains. What it left out was a deadline. Under the usual rules, a homeowner must have lived in the property for at least two of the five years before the sale; because Anna moved out in August 2024, she would stop satisfying that requirement around the end of August 2027. If the sale slipped past that point, she could lose eligibility entirely. Across five attempts, GPT-6 Astra never identified the deadline. Claude Opus identified it in all five.

The second case runs the other way. A separating couple asked an agent how to divide their Roth IRA and 401(k). Opus 5.5 told them they were not legally married and recommended keeping their accounts separate, with a cash payment to even out the balances. The couple's own records raised doubts: they now lived in Florida, where new common-law marriages generally are not recognized, but they had previously lived together in Texas and held a ceremony in Colorado. Texas recognizes informal marriages under certain conditions, and a valid marriage established elsewhere may remain valid in Florida. That distinction could change the tax consequences of dividing the accounts. Across all five attempts, Opus based its recommendations on the assumption that the couple was unmarried, even when it acknowledged uncertainty. Astra, in this case, recognized the need to verify marital status in four of five attempts.

Neither failure is a model that cannot do math. Both are models that cannot tell which question matters. The client asked about two dates; the consequential issue was a third date nobody mentioned. The client asked how to divide accounts; the prior question was whether the couple was married at all. Surge's framing is precise: DAYJOB tests whether agents can take ownership of a professional assignment from start to finish, including identifying issues the client overlooked. That is the part of professional work that resists automation most, because it is not a step in a procedure. It is the judgment that the procedure is incomplete.

## The bill you pay twice

For builders, the takeaway is practical: the cost of an agent that passes one assignment in ten is not the cost of the run. It is the cost of the run plus the cost of the human review that the benchmark itself proves necessary.

That sounds like a reason to keep a human in the loop. It isn't — not by itself. A human in the loop who must re-derive every judgment the agent made is not supervising the agent. They are redoing the work, with the agent's output as an additional document to check. The economics only work if the agent's failures are cheap to catch: a wrong number in a spreadsheet is cheap to catch; a missing deadline the client never asked about is expensive to catch, because catching it requires the same investigation the agent skipped. The DAYJOB: Tax results suggest the failures cluster exactly where catching them costs the most.

This is also why the benchmark's design matters more than its leaderboard. Most tax benchmarks, as Surge notes, begin with a defined problem — TaxBench's 114 questions, TaxCalcBench's return-accuracy checks, TaxLab's simulated taxpayer interviews. Those measure capabilities. DAYJOB measures responsibility: whether the agent discovers consequential issues, evaluates conflicting evidence, and decides what needs to be done in the first place. The Hacker News discussion, 217 points and 140 comments at fetch, circled the same distinction — that a benchmark which grades the finished deliverable against a professional rubric is measuring something closer to employment than to examination.

There is a version of this idea worth using. A benchmark that fails frontier models at 90% is a specification for what the next generation of agent tooling has to do: track open questions explicitly, surface assumptions before acting on them, and flag missing evidence instead of papering over it. The studio-ledger case in Surge's write-up is the template — a ledger references an attached receipt, the receipt is missing, and the correct behavior is to flag the gap, not to treat the reimbursement as verified. An agent that reports what it could not establish is more useful than an agent that completes the form confidently.

Until then, the honest accounting is the benchmark's own. The agent can read the files, run the calculations, and produce the deliverable. What it cannot yet do, nine times out of ten, is the job. The audit is still the human's, and the human still has to do it from scratch.

That is the problem.

Source: [DAYJOB: Tax — Benchmarking AI Agents on Professional Tax Work](https://surgehq.ai/blog/dayjob-tax)
