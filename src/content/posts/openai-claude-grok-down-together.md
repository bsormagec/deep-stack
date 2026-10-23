---
title: "OpenAI, Claude and Grok went down together. Stop looking for the conspiracy."
dek: "ChatGPT, Claude and Grok all degraded within the same window on September 3. No shared root cause, no published forensics. The boring explanation is the one that should worry you."
date: 2026-09-03
image: "/images/openai-claude-grok-down-together.webp"
---
On the morning of September 3, the three biggest AI chat services on the planet went wrong at roughly the same time. ChatGPT logged elevated errors across ChatGPT and Codex. Anthropic said Claude, Claude Code, and the Claude API were down because of an "infrastructure issue." Grok was telling users its model was "overloaded right now." Three companies that spend billions convincing the market they are independent broke inside the same hour, and by the afternoon everything was quietly back up with no shared root cause published.

The details people actually hit are more telling than the status pages. Codex users saw 404s on a single endpoint, backend-api/codex/responses, cf-ray headers visible in the error dumps. Existing sessions kept working for a while; new ones failed. Anthropic users got "Claude is at capacity" and "unexpected capacity constraints." Two of the three outages looked like capacity or routing problems, not a code bug that flattened everything. OpenAI said it applied a mitigation and was monitoring recovery. Nobody said what actually broke. That gap is where the theories moved in.

## Everyone has a theory

The Hacker News thread, 467 comments and climbing, ran the full spectrum. The funny end had Skynet jokes, a rogue GPT-6 Astra eating rival models for compute, and one elaborate bit about Dr. Zuckerberg drinking the last drop of human experience. The date helped. September 3 is when Skynet goes online in Terminator, and the internet noticed. Someone pointed out that college students were suddenly writing essays by hand. "Oh the humanity (and the Humanities)."

The serious end split in two. One camp pointed at shared infrastructure: Downdetector showed error spikes in the same window for AWS, Azure, Google Cloud, and Cloudflare, and a few people put their money on a backbone provider rather than any single cloud. The other camp, and I think this one is closest to right, pointed at cascading load. One service hiccups, its users flee to the next provider, that provider chokes on the surge, its users flee to the third, and suddenly you have a chain reaction that looks coordinated even though nobody coordinated a thing.

The comment that stuck with me came from danielmarkbruce: "If you build an application which uses AI... when one model is down, you route traffic to another model which is similar in capability/cost. For any single application, it's smart. In aggregate, it's stupid." That is the whole story.

## The illusion of independence

Every team that built multi-provider failover did the individually rational thing, and they all wrote the same fallback list: OpenAI first, Anthropic second, Google or xAI third. When ChatGPT hiccupped on a Wednesday morning, a big chunk of the AI-dependent internet tried to move to Claude at once. Claude has been running near capacity for months, because everyone sells GPU tokens faster than the datacenters finish building. It took the hit. The survivors moved to Grok, and Grok folded. Google, running on infrastructure with different failure modes, mostly held, though API users still saw some 503s.

That is why the pattern looks like a conspiracy. It is emergent behavior from thousands of teams running the same playbook, not a coordinated attack. One commenter got the business implication right in a single line: users treat these products as interchangeable, and that kills the moat and the resilience at the same time. If the products are substitutes, no single vendor owns the customer. And if they are substitutes, every vendor inherits everyone else's traffic spikes exactly when they are least able to absorb them.

The part that should bother you if you build on these APIs is that your redundancy architecture probably assumes independence that does not exist. Underneath, the industry shares the same GPU vendors, the same colocation corridors, the same power grids, the same upstream transit. Correlated demand is a failure mode you cannot engineer around with a second API key. Your fallback is everyone else's fallback, which means your failover fires exactly when their capacity runs out.

## Design for degradation

None of this is a reason to stop using these tools. It is a reason to stop treating them like critical infrastructure, because they have none of its properties. No binding uptime promises. Postmortems that read like a paragraph instead of the multi-page forensics you get from AWS. Capacity sold before it exists, which is why "overloaded" has become a routine status message instead of an emergency. One user in the thread watched his Claude desktop app crash so hard it would not even reinstall. Vibecoded clients, meet vibecoded reliability.

So design for degradation instead of availability. Cache aggressively, because yesterday's model output is often good enough for today. Queue and retry with real backoff instead of hammering the fallback. Decide in advance what your product does when the model is slow or gone, because a product that degrades into a readable error and a saved draft beats one that 500s. And if you run multi-provider, plan for the correlated case, not the independent one.

The boring lesson from September 3 is that the AI industry built three giant straws drinking from one well, and the straws keep getting bigger while the well fills at the same rate. This will happen again. The question is not whether your stack survives one vendor going down. It is whether it survives your users all trying to leave at the same time. Most stacks cannot. This morning was the free preview.

Source: [Ask HN: Why were OpenAI, Claude, and Grok simultaneously down?](https://news.ycombinator.com/item?id=49551096)
