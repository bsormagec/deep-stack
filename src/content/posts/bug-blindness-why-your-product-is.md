---
title: "Bug Blindness: Why Your Product Is Broken and Your Team Thinks It's Great"
dek: "Dan Luu put a name on the most expensive blind spot in software — and why coding agents just made it harder to ignore."
date: 2026-08-30
image: "/images/bug-blindness-why-your-product-is.webp"
---
## I read Dan Luu's essay at midnight and caught myself testing my own reflexes mid-paragraph.

He calls it bug blindness. If you've owned any product for more than a year, you've felt it.

The idea is simple. People hit bugs all the time and stop noticing them. They build little workarounds without realizing it, then forget the workaround was ever needed. Later they tell you the product works fine. It doesn't. They just learned to step over the broken parts.

Dan has made a career of noticing what others filter out. He sees hundreds to thousands of bugs a week, by his count, while most colleagues report almost none. For a long time he wondered if he used computers differently. Now he thinks the difference is attention. Same bugs, different threshold for seeing them.

That framing stuck with me because it explains so many confusing meetings I've sat in. A team demos something that clearly does not work, and everyone nods. Not because they are lying. Because they really do not see it.

## What it looks like in practice

Dan avoids naming his consulting clients, so he uses outside examples. They are telling precisely because they are ordinary.

He wrote once about search engines. For several queries, Google, Bing and Kagi all returned pages full of SEO spam with no good answer. Almost nobody argued about Google or Bing. But Kagi users insisted Dan was wrong. When they sent their own screenshots, the results still had no good answer and were full of spam, except where they had pinned GitHub to the top, which helped for code queries and failed for everything else. They had looked at bad results and decided they were good.

Then there is Blackboard, the university course software. Ask students and professors in the 2000s how they felt about it and you'd get a flood of complaints. Wikipedia even quoted a source calling it "one of the most disliked, even detested, companies in education," with a survey that 93% of respondents "hate" it. Dan once asked someone who worked there what it was like to build such a disliked product. The person was confused. He thought users loved it.

And there is Discourse, the forum software. Dan kept hearing from the team that performance was great. He checked. It was slow, and had code that actually delayed page loads to game the Largest Contentful Paint metric. Not just optimizing for a benchmark, actively making things worse for users to look better on a chart. Somewhere in that implementation, someone had to know.

I have my own versions of this. A Google Docs title that eats your first keystrokes if you type too soon after creating a doc. A laptop login that fails unless you flip WiFi off first. A mac that wakes to a black screen unless you wait a second and wiggle the trackpad in just the right way. You learn these, you forget you learned them, and then you tell the new hire "it works fine for me."

## Why you stop seeing it

Dan's best story for the mechanism is from childhood. He had a mechanical mouse with a dirty ball. It tracked so erratically that a friend couldn't use it at all. Dan sat down and moved the pointer in a straight line without trouble. Then he watched his own hand. He was violently throwing his wrist around to compensate. He had adapted so gradually he had no idea he was compensating.

That is bug blindness in one image. You do not decide to ignore bugs. You get good at walking around them.

This is why dogfooding, the usual cure, often fails. Using your own product should help, but programmers are experts at adaptation. We have spent years building workarounds before coding agents existed. If you are not deliberately paying attention, dogfooding just rehearses the workarounds. You get faster at the dance and more convinced there is no dance.

A Hacker News comment put it well. Developers have a mental model so close to the system's model that they share the same blind spots. Non-technical users have the opposite problem. They often have no model at all. They click, something happens, and if it is not what they expected, they shrug and try something else. They cannot tell expected from buggy because they never formed an expectation. The result is two groups who can stare at the same broken flow and come away with different stories.

## Why whole teams go blind together

Individual blindness is one thing. Team-level blindness is what kills products.

It happens through ordinary social dynamics. You like your team and your work, so you discount negatives. You rely on internal impressions more than external data. Someone says "it works great" in a meeting, no one wants to be the person who says it doesn't, and the story hardens. Dan notes that when he later looks at internal threads about products he found barely usable, the thread is full of people saying it is great. No conspiracy. Just normal optimism plus adaptation.

Metrics can lock it in. Discourse gaming LCP is an extreme example, but mild versions are everywhere. If the chart says performance is good, the lived experience has to argue against the chart, and charts usually win. I have seen teams keep a metric green while users keep complaining, and the team sides with the metric because the metric is what gets reviewed.

The cost is not just annoyance. Dan is blunt about this. He has watched teams with real quality blindness ship things that had no chance, not because they chose to trade quality for speed, but because they thought they had already shipped high quality. A deliberate speed versus quality trade can be rational. An unconscious one rarely is.

## The AI twist: cheaper to ship slop, cheaper to fix it

This is where the essay gets urgent for anyone building with coding agents right now.

We are in a strange moment. It has never been easier to produce software, and never been easier to make it good. Agents can churn out features overnight, draft tests, smooth rough edges, and run performance passes that used to take weeks. Dan points out he can now ask an LLM to act like a naive user and replay flows across many personas, which surfaces bugs he already suspected but could not prove were not just his own quirks.

That is the opportunity. The risk is we use the same power to mass-produce blind products faster. If your loop is "agent writes code, you glance at the demo, it looks okay, you ship," you just automated bug blindness. You scaled the part where you do not notice.

I worry about this because demo culture already rewards the happy path. An agent can make a happy path look polished in minutes. The broken states, the error handling, the second login, the slow network, the user who pastes instead of typing, that is where quality lives, and it is exactly what a quick demo hides.

Dan's own note lands here. He usually sees teams underinvest in quality, not overinvest. His take is that you can improve quality a lot with relatively small effort if you actually notice it is possible. That last clause matters. You have to see that a 20 percent improvement is sitting there before you will take it.

## How to get your sight back

Dan says he has cured bug blindness in receptive people just by pointing things out for a few weeks. After that, they start seeing bugs on their own. I have seen this work too. It does not require a big process. It requires someone who is willing to be that annoying friend for a while.

A few things that have helped me and teams I've worked with:

- Give one person the explicit job of being naive. Not QA as gatekeeper, but a person who tries the product cold, with no internal lore, and writes down every friction without filtering for "is this a real bug." Rotate the role so no one builds the mouse-ball compensation.
- Use LLMs as naive users on purpose. Dan's trick of having models replay flows as different personas is cheap and underused. Prompt them to be impatient, to paste links, to go back mid-flow, to use an old laptop. You will find things your team learned to hop over.
- Keep a friction log, not just a bug tracker. Bugs get triaged into oblivion. A log of "I had to wait two seconds before typing the title or it vanished" keeps the workaround visible. Review it weekly and pick one to kill. One per week compounds.
- Make the metric argue with reality. Keep your dashboard, but require one session of real usage per week on a slow device or clean account. If the chart says fast and the session feels slow, trust the session.
- Reward reports that make you look bad. If reporting a bug feels like insulting someone's work, no one will report it. Thank people who show that the emperor has no title field.

None of this is heroic. It is mostly about remembering that adaptation is automatic and noticing takes effort. The teams I trust most are not the ones who claim quality is great. They are the ones who can list what is still broken without getting defensive.

## What I take away from this

Bug blindness reframes quality work. It is not nagging. It is not perfectionism. It is correcting for a perceptual bias that compounds over time, like that dirty mouse ball.

For engineering leaders, the uncomfortable question is not "are we shipping bugs." We are. It is "what are we no longer seeing because we've gotten good at compensating." If you cannot answer that with specifics, you are probably blind to something important.

Agents give us a choice. We can ship more while seeing less, or we can finally see more and fix faster than we could before. Dan's work suggests the second path is available, but only if you decide to look.

If you have a friction log, open it today and kill one item. If you don't, start one with the last workaround you taught a new hire. That one counts.

---

Source: [Dan Luu — Bug Blindness](https://danluu.com/bug-blind/) · Discussion: [Hacker News (238 comments)](https://news.ycombinator.com/item?id=49494520)
