---
title: "The load-bearing vocabulary of Claude is the first place AI won"
dek: "47,000 pull requests, 5 million words, one inescapable conclusion: the machines are changing how engineers talk — and that matters more than any benchmark."
date: 2026-08-27
image: "/images/the-load-bearing-vocabulary-of-claude.webp"
---
There is a phrase engineers now use without a hint of irony: “this is the load-bearing assumption.” Another one: “that’s the seam.” A few years ago these were precise, uncommon architectural or civil-engineering terms with narrow technical meaning. Today they populate pull requests the way filler words populate a nervous job interview. And someone finally measured it.

A scraper that pulls 100 GitHub pull requests every single day — 47,464 of them, over 5 million words — clustered the vocabulary of every PR submitted since 2025. It found 8 distinct clusters, and in 2026 one of those clusters exploded to represent a staggering 45% of all human-attributed pull requests last month. Its signature word, “load-bearing,” appears 123 times more frequently inside that cluster than across the wider corpus. The cluster’s fingerprint reads like a menu of modern AI output: “quietly,” “survived,” “genuinely,” “fabricated,” “flagging,” “ship,” “deliberately,” “untouched.” If you use a coding agent at all, you have read a paragraph written in this dialect today.

## The machines are not just better at our jobs. They are changing our vocabularies first.

We obsess over benchmarks — who scores higher on SWE-bench, who writes faster code, who ships more tokens. All of that is real and all of it misses the point. The most dramatic thing this technology has done in 2026 is not any individual capability. It is that a computer program has become the de facto style arbiter of technical writing at scale. Thousands of engineers now write in the rhythm of their favorite model, and the model’s preferred words are seeping into the codebase corpus not as an artifact of automation but as human imitation.

The HN discussion on this scraper is a case study in recoil. One commenter admits they grew so used to telling Claude “those are just examples, focus on the etc.” that they now write “such as x, y, etc.” in Slack and in social media comments. Another writes that “seam,” a term they had never heard before, is now embedded in their organization’s job descriptions. A third, half joking, says they are “the proud owner of several seams” and considering naming them. People who have a PhD in the field report needing a PhD to read Claude’s output. This is not a niche aesthetic complaint. Six months of interacting with a model has measurably altered the way trained professionals speak.

## Why the vocabulary wins before the code does

There is a reason the vocabulary is load-bearing in a way the engineering is not. A model’s ability to write code is constrained by hard physics — it cannot actually compile, test, ship, and maintain software. Its success rate has a ceiling. But its ability to write confident, plausible-sounding prose is effectively unbounded. It can generate a wall of elegant review comments for code that will never run. And humans, facing an avalanche of that prose every day, do what humans have always done when consistency is rewarded: they imitate it.

That imitation is visible in the data’s shape. The cluster did not creep up slowly. It appeared in 2026 and within a year captured 45% of the corpus — a hockey stick, not a plateau. When a single linguistic fingerprint spreads that fast, it is not a genre trend or a corporate memo. It is a viral pattern of trusted-above-average language. The model is not merely generating this vocabulary; the human-generated content is converging on it. That is the tell. Language normalization usually takes a generation. Here it took a year, driven by the fact that imitating the tool that most of the industry has come to rely on is a low-cost, high-signal behavior.

## The two ways to read this — and why the cheerier one is dangerous

The charitable reading: these words are simply more precise, more honest, more efficient. “Load-bearing” genuinely captures the idea that a specific assumption supports everything else; “genuinely” and “deliberately” are adverbs that signal rigor. On this view, the vocabulary bettered its host, the way jargon from economics (“incentive”) or physics (“coherence”) became mainstream because it was useful. There is real truth to this defense — and it is exactly why the pattern is so hard to resist.

> “It’s a bit like putting blinkers on a horse. RL affects the entire model — not just the task you were trying to improve.” — a commenter on the HN thread, on why the tics compound

The dangerous reading: this is mimicry of confidence, not of competence. A model that hallucinates a fabricated method and gracefully says “the side folded its capstone into the existing name” has, on the surface, learned to sound like an authority. Human engineers read that, think “that is what an expert sounds like,” and start producing sentences whose syntax is borrowed but whose meaning has evaporated. The words are cargo-culted — adopted because they signal in-group membership, not because the writer understands their referent. That is how jargon becomes a status marker rather than a communication tool, and it is the precise mechanism by which clarity is lost while everyone feels they have become more rigorous.

## What actually matters for people who build software

1. Treat your own style drift as a failure signal, not a promotion. If you have started describing every refactor as “structural” and every edge case as a “seam,” your writing has been optimized for the machine that wrote your drafts — not for the human review that must read them.
2. Look at the words your team’s PRs have picked up and ask whether they describe architecture or merely dress it up. Audit your review language the way you audit your dependencies.
3. Recognize that the tool has achieved something no other AI capability has: it has redefined what passes for good communication inside the very community that controls its future. The moment robots set the linguistic bar, the humans on the other side of the keyboard stop being the authors and start being the audience.

The core skill that matters now is not keeping up with the vocabulary — it is resisting it. The best communication in 2026 is not the text that most closely matches the AI’s fingerprint. It is the one that sounds unmistakably, inefficiently human, and that does not mistake “sounding confident” for “having checked.” Read the source, question the premise, and write the sentence plain. That is the load-bearing habit worth keeping.

### Sources

1. Source analysis: [The load-bearing vocabulary of Claude](https://louisabraham.github.io/load-bearing/) (47,464 PRs / 5M words; methodology in [the repo](https://github.com/louisabraham/load-bearing))
2. Hacker News discussion: [Show HN: The load-bearing vocabulary of Claude](https://news.ycombinator.com/item?id=49461817) (practitioner comments on style drift, RLHF feedback loops, and enterprise jargon uptake)
