---
title: "Five Thousand People Have Seen the Real Model"
dek: "## The Problem Is Not That People Disagree About AI. It Is That They Are Using Different Products."
date: 2026-10-12
image: "/images/five-thousand-people-have-seen-the.webp"
---
The interesting thing about Andrej Karpathy's funnel is not that people disagree about what AI can do. It is that most of them are not evaluating the same system.

On October 11, Karpathy re-shared a post he first wrote in April and said the framing had changed. What looked like two groups talking past each other has become, in his description, a sharp funnel. At the wide end, by his own napkin math, sit roughly 6 billion people — about 75% of the world's population — who have barely come in contact with a large language model at all. Above them, 1 to 2 billion people use free-tier chatbot products casually, the way they would use a better search box or a writing aid. Then the funnel narrows hard. Around 20 million people, roughly 0.2% of the population by his estimate, use frontier-grade models professionally in math and code, and watch agents finish in one prompt projects that used to take weeks or months. At the tip, he puts about 5,000 people with access to internal, not-yet-public systems inside the labs.

Those four numbers describe four different technologies, as far as lived experience is concerned. The person in the second tier who calls the chatbot derpy and the engineer in the third tier who stopped writing code by hand are both reporting honestly. They are just not reporting on the same thing.

## The funnel is a price ladder

Karpathy gives three reasons for the shape, and the third is the one that does the real work. The first is ambition: the uplift only becomes visible when someone brings a reservoir of large, difficult problems to the system. A one-paragraph question does not test anything. The second is jaggedness: capability peaks where work is digital, verifiable, and economically valuable, because — as The Decoder's summary of the post puts it — that capability emerges from reinforcement learning on verifiable rewards, and labs aim their training resources at the domains with the highest revenue potential. Right now that means code and math.

The third reason is access, and Karpathy states it as a simple ladder: free tier, paid tier, internal. That ladder is not a metaphor. It is a pricing structure. The free tier is rate-limited, routed to smaller or older models, and designed to be cheap to serve at a billion-user scale. The paid tier buys the frontier model and the agent harness around it. The internal tier is not for sale at any price. So when the public argues about whether "AI" is overrated or transformative, a large part of the argument is really about which rung of a price ladder the speaker can afford to stand on — or was hired onto.

That sounds like a marketing problem. It isn't. It is an information problem, because the top rung is invisible to everyone below it.

## The top of the funnel cannot be checked

Karpathy is explicit that the internal tier sees something categorically different: swarms of agents collaborating over weeks on large software projects, work he says would have taken top professionals years. He also adds the sentence that should slow the whole claim down: human review and comprehension are starting to fall behind. He points, as The Decoder reports, to people still doing archaeology on the OpenAI–Hugging Face agent incident many months later, and to a large set of frontier-mathematics manuscripts that reviewers may be working through for a while.

Notice what that does to verification. The strongest claims about current AI capability now rest on systems that, by construction, only about 5,000 people can inspect — and Karpathy's own post, summarized by both The Decoder and CellCog's tier-by-tier breakdown, concedes the reviewers are already behind on the artifacts those systems have produced in public. The Hacker News discussion under the post ran to 725 comments at 492 points when fetched, the largest comment count on the front page, and that volume is itself the symptom: hundreds of people arguing about the capability of systems almost none of them have touched.

And the funnel numbers themselves are not data. Karpathy labels them napkin math and cites no survey for any tier. CellCog's attempt to test the middle tiers against company-published counts found the casual tier roughly plausible — OpenAI's DevDay 2026 recap speaks of about 1.2 billion collective weekly users, and Google has said more than 1 billion people use the Gemini app monthly — but the professional tier is softer: Microsoft reports 50 million GitHub Copilot users, while OpenAI reports more than 5 million weekly Codex users, and neither metric measures agents finishing whole projects. The 5,000 figure at the tip has, as CellCog notes, no published number to test against at all.

So the funnel is best read as a shape, not a census. The shape is credible. The counts are one well-placed person's estimates.

## What the funnel does to everyone building on top

There is a practical consequence here that has nothing to do with whether the top tier is as magical as described. If capability is tiered by access, then every builder's intuition is calibrated to the wrong tier. Founders and engineers — most of them in Karpathy's third tier, using paid frontier tools daily — design products for the second tier: the 1 to 2 billion casual users whose entire experience is a free chatbot that feels like a slightly better search engine. The designer has seen the agent finish the project. The customer has seen the derpy chatbot. Both are sure they know what the product is.

The same mismatch runs in the other direction inside companies. Karpathy places many executives in the casual tier, not the professional one, because their work is talking to people, so the capability shift stays second-hand and abstract for them. The people approving the AI budget and the people whose workflows the budget is supposed to change are, on this account, literally evaluating different systems.

For builders, the takeaway is practical: state your tier before you state your opinion. A claim about what "the model" can do is incomplete without the access level, the model version, and the problem size it was tested at. Benchmarks published from the paid tier do not describe the free tier's experience, and neither describes the internal one. Pricing pages, in other words, have quietly become capability documents — the clearest public record of who is allowed to see what.

Karpathy calls the overall situation "the weirdness of the moment": the public largely unimpressed, most professionals seeing modest uplift, a small sliver experiencing the curve going vertical, all at the same time. That is an accurate description. It is also a description of a market where the most important product is the one nobody outside can buy, run, or audit.

Five thousand people may or may not be the right count. The uncomfortable part survives even if the number is off by ten times: the argument about AI's capability is now an argument about a ladder, and almost everyone is standing on a lower rung than the one they are describing.

Source: [Anthropic's Andrej Karpathy says "the external world has seen the preview" of what AI can actually do](https://the-decoder.com/anthropics-andrej-karpathy-says-the-external-world-has-seen-the-preview-of-what-ai-can-actually-do/)
