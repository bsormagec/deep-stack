---
title: "Good Enough Just Got a Price Tag"
dek: "Microsoft stopped selling the best model. It started selling the fraction."
date: 2026-11-18
image: "/images/good-enough-just-got-a-price-tag.webp"
---
The interesting thing about Microsoft's Ignite announcement is not that it released seven new models. It is that none of them is trying to be the best model. Every one of them is trying to be the cheapest model that is almost as good — and Microsoft printed the exchange rate on the slide.

MAI Code 2, the coding model at the center of the launch, reaches 98 percent of GPT-6.1 Sol's coding quality at about 40 percent of the price, and 96 percent of Claude Opus 5.5's at 5 percent of the price, according to Microsoft's own announcement from Ignite on November 17. Those percentages are averaged over four coding benchmarks — DeepSWE 1.1, Terminal-Bench 2.1, SWE-Atlas and FrontierCode v1.1 — and in a blind side-by-side test of frontend work, developers preferred Code 2's output over GPT-6.1 Sol's 64 percent of the time.

That sounds like a benchmark press release. It isn't. It is a pricing announcement wearing a benchmark's clothes.

## The week the frontier got undercut twice

The timing is what makes this hard to dismiss as one vendor's marketing. Less than a day earlier, OpenAI released GPT-6.2: Astra's API price cut 20 percent to $8 and $40 per million input and output tokens, with Sol coming within half a point of Astra on Cognition's FrontierCode 2.0 at about a fifth of the cost. Deep Stack covered that yesterday at midday. Now Microsoft arrives with the same argument from the other direction — not a cheaper flagship, but a purpose-built model that concedes the last few points of quality and keeps most of the money.

Two vendors in two days, both arguing that the frontier's price is negotiable. That is a pattern, not a coincidence. The frontier labs spent three years teaching buyers to pay for the best score. The second tier of labs is now teaching them to ask what the last two percent of the score is worth — and the answer Microsoft offers is twenty times the price.

For builders, the takeaway is practical: if your agent loop runs on everyday enterprise coding — the multi-file edits, the routine fixes, the dashboards — the model you rent by the token is no longer obviously the flagship. The gap between "best" and "good enough" is now a line item you can measure, and Microsoft just published the numbers.

## Read the footnote before you believe the ratio

The catch is in the fine print, and it is a large one. The 40-percent-of-Sol figure for Code 2 is calculated at a 50 percent promotional price, per the footnote in Microsoft's own Code 2 post. At full price, the same arithmetic puts Code 2 at roughly 80 percent of Sol's cost — still cheaper, but no longer the bargain the headline suggests. The promotional rate runs until May 17, 2027, after which the price doubles from $0.50 and $2.50 per million input and output tokens to $1.00 and $5.00.

The Cyber 2 Flash claim is built differently, and more honestly. Microsoft prices it at list — $0.10 and $0.50 per million input and output tokens — and says it beats GPT-6 Astra's quality on the CyberGym-E2E benchmark at less than 2 percent of the cost per task. The scores behind that claim are 92.3 against Astra's 91.5, and Cyber 2 Flash is priced 86 percent lower on output tokens than its predecessor, MAI Cyber 1.1 Flash. One report notes Microsoft excluded 92 of the benchmark's 905 tasks because they overlapped its training data — a reasonable exclusion, but the kind of detail that belongs in the open rather than in a footnote nobody reads.

The rest of the family follows the same script. MAI Image 2.7 takes the top spot on Artificial Analysis image editing at one-fifth the price of GPT Image 2.6 Sunburst, at roughly $35 per thousand images, with a Flash variant at about $10. MAI Realtime 1, Microsoft's first live speech-to-speech model, starts at $0.01 per audio minute. Decision 1.1, the routing model, claims to be 50 times faster and 79 times cheaper than GPT-6.1 Sol, and Microsoft says 4,000 customers already use it. Dragon Copilot Transcribe, built on MAI Transcribe 2, now powers 10 million patient encounters a month, with multilingual error rates halved and a third of US physicians using it.

Every number in that paragraph is Microsoft's own measurement. None of it has been independently verified. That does not make the numbers false — it makes them a promise, and a promise from the vendor grading its own homework is worth exactly what the verification costs.

## The part Microsoft is not selling

There are two limits Microsoft states plainly, and both matter more than the benchmarks. First, Code 2 is "explicitly not yet tuned for harder problems, like fundamental science research and very long horizon agentic work." This is a model for the everyday coding your team already does, not for the hardest problems in the field. Buyers who run long agent loops should read that sentence twice.

Second, MAI Licensed Weights is not open weights. Microsoft will let a customer take a frontier MAI model, customize it on proprietary data, and run it inside its own Azure environment — but access is by agreement, the terms are unpublished, and the weights do not leave Azure. That is a licensing program, not a release. The distinction matters because the week has already seen one vendor after another blur it.

And then there is the silicon underneath. Maia 200, Microsoft's second-generation AI accelerator, is now in production running the company's largest models at 1.7 times more tokens per watt. The price-performance story is not only a model story; it is a chip story, and the chip is the part Microsoft owns outright. When the model and the accelerator come from the same company, the margin the model gives away can be recovered on the hardware — which is precisely why the discount is affordable for Microsoft and would not be for a pure model lab.

## What the Hacker News thread is actually arguing about

The Hacker News discussion, at 317 points and 203 comments when this post was written, is not arguing about whether the models are good. It is arguing about whether the ratios survive contact with the price list — the promotional rate, the list-price comparison, the benchmark selection. That is the right argument. A launch like this lives or dies on the arithmetic, and the thread is doing the arithmetic in public faster than any analyst note will.

The skepticism is healthy, and it is also the point. A year ago, a launch like this would have been judged on the top score. Now it is judged on the ratio. The frontier labs set the score; the challengers set the price. The buyer who used to ask "which model is best" now has to ask "best at what price, for which job, until when" — and the promotional expiry date is part of the answer.

## The meter is the product now

Step back and the shape of the week is clear. OpenAI cut Astra's price and admitted Sol is nearly as good for a fifth of the cost. Microsoft launched seven models whose entire pitch is the fraction. The frontier is no longer a single number to beat; it is a menu of prices, and every vendor is now competing on the ratio between quality and cost rather than on quality alone.

That is good news for builders, with one condition: the ratio has to be real. A promotional price is not a price. A vendor benchmark is not a measurement. A licensed weight is not an open weight. The discount is real enough to change what you run — Code 2 at even 80 percent of Sol's cost, in GitHub Copilot, is a genuine option for everyday coding work — but it is not real enough to stop checking.

The interesting thing about this launch is not the seven models. It is that Microsoft stopped pretending the best model wins. The model that wins now is the one whose price you can afford to run all day, every day, on the work you actually do.

That is the problem the frontier labs have to answer next.

Source: [Seven new world-class models at scalable price-performance](https://microsoft.ai/news/microsoft-ignite-2026/)
