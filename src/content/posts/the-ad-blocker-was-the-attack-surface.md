---
title: "The Ad Blocker Was the Attack Surface"
dek: "Your ad blocker exists to stop websites running code on you. For a while, a website could use it to run code on every site you visit — and the hole was found by an agent."
date: 2026-11-16
image: "/images/the-ad-blocker-was-the-attack-surface.webp"
---
The interesting thing about the uBlock Origin vulnerability disclosed this week is not that a browser extension had a bug. Extensions have bugs the way every piece of software has bugs. The interesting thing is the inversion: the tool people install precisely because they do not trust websites to run arbitrary code on their machine became the mechanism by which a website could run arbitrary code on every site they visit. The guard was the door.

## A trusted filter is a loaded word

To understand why this mattered, you have to understand what "trusted" means inside uBlock Origin. The extension lets advanced users write their own filters, and some of those filters are scriptlets — small pieces of JavaScript that run in the context of a page. A filter marked trusted can inject a script into any site. That is by design. It is also, obviously, the most dangerous capability in the extension: a trusted filter is not a blocklist entry, it is code execution with the user's blessing.

The element picker is the friendly face of that capability. Right-click a page, pick an element, and the picker writes a filter for you without making you leave the page. It is a privileged little UI: it talks to the extension's background script and tells it to add filters. The picker is supposed to be the only thing that can do that, and it is supposed to only write the narrow kind of filter a user just asked for — never a scriptlet.

The vulnerability, disclosed on November 15 by the researcher behind iter.ca, broke both of those assumptions at once. A malicious website could drive the element picker itself, from inside an invisible iframe, and make it write whatever filter the attacker wanted — including a trusted scriptlet filter for any domain. One click from the user on the attacker's page, and the site had code running everywhere.

## Four steps, one click

The chain is elegant in the way good exploits are elegant: each step is small, and the whole thing only works because nobody checked the seams between them.

First, the attacker needs the address of the element picker. On Firefox, the picker lives at a `moz-extension://` URL containing a random UUID that is different on every installation. That UUID is supposed to be unguessable. But uBlock Origin ships with a default filter from its uAssets list that hooks `fetch` calls for an ad script and replaces them with a dummy, and the replacement works by making an XHR request to a `moz-extension://` URL — which contains the UUID in plain sight. The attacker's page hooks `XMLHttpRequest.prototype.open`, triggers the filter with a single `fetch`, and reads the UUID off the request. The researcher notes there are several ways the UUID could leak; this one just happened to be lying in the default configuration.

Second, the attacker embeds the picker in an invisible iframe — opacity zero — pointed at that URL.

Third, the attacker drives it. The picker accepts `postMessage` calls, and nothing in the picker checks who is sending them. `epickerStart`, then `showDialog` with a filter and the details that enable the Create button. Normally the picker refuses scriptlet filters. But the `opt` field — normally a request type like `image`, appended to the filter after a `$` — accepts a newline. Smuggle `"image\ngoogle.com##+js(trusted-rpnt, script, ...)"` into that field and the picker writes an arbitrary trusted filter. The newline is the whole vulnerability, in a sense: a field that was supposed to hold one word held two lines, and the second line was code.

Fourth, the click. The researcher did not bother implementing this part, and that is worth saying plainly: the clickjack is the assumed path, not a demonstrated one. The invisible iframe's Create button sits under whatever the page shows the user, and one ordinary click on the page presses it. Filters added this way stay trusted until the user's custom filters are recompiled — which, in practice, means the attacker just opens the victim site immediately, before anything gets a chance to clear.

## The agent found the hole

Here is the part that makes this a Deep Stack story rather than just a security story. The researcher says so directly: GPT-5.6 Sol did most of the hard work of finding the issue. He suspected there might be some kind of cross-site scripting from filter injection, asked the model to take a look, and it found it. He checked and verified what it proposed. He wrote the prose himself. Claude wrote most of the proof-of-concept code.

That division of labor is the honest version of how agents find vulnerabilities now. The model did the searching — the part that is mostly patience and pattern-matching across a large codebase. The human did the verifying — the part that is judgment. And the proof of concept, the part that turns a suspicion into a demonstration, was mostly agent-written too. The pipeline from "I wonder if" to "here is the exploit" is getting shorter, and the human's job in it is increasingly the one thing that cannot be delegated: deciding whether the thing the model found is real.

There is a second, quieter irony here. The agent that found the hole is the same class of tool the hole was found in the defense against: software that runs code on your behalf, deciding what to trust. The trust boundary in both cases is a label — "trusted filter" in one, "verified finding" in the other — and in both cases the label only holds if something checks it.

## Fixed, and why it still matters

The issue is fixed now, per the author and the GitHub advisory. One of the fixes is a secret password that the real picker receives from the content script and must include in its first message — so a random page driving the picker with `postMessage` no longer gets an answer. This is not a live danger, and the article would be dishonest if it presented it as one. If you use uBlock Origin, update it; the danger here is already past tense.

But the shape of the bug is worth keeping, because it will recur. The pattern is always the same: a privileged UI that accepts messages from anyone, a field that holds more than its name promises, and a trust label that does the work of a security boundary. Browser extensions are software, and software that mediates between untrusted pages and trusted capabilities has the same trust-boundary problems as everything else. The picker was a small, friendly window into the most powerful thing the extension can do, and the window was open to the street.

The Hacker News discussion, which ran to 589 points and more than 160 comments within a day of the post going up, focused mostly on the mechanism — which is the right instinct. The mechanism is the part that generalizes. The next extension, the next picker, the next `postMessage` handler that trusts its sender will have the same shape, and the next agent asked to take a look will find it faster.

For builders, the takeaway is practical: if your product has a privileged action — anything that writes a rule, installs a filter, changes a setting on the user's behalf — the question is not whether the UI for it is friendly. The question is who else can drive that UI, and what happens when a field that should hold one word holds two lines. Audit the seams, not the surfaces. And when an agent hands you a finding, verify it the way this researcher did, because the finding is only as good as the check.

The ad blocker was never the attack surface. The trust label was.

Source: [Universal XSS in uBlock Origin from website-driven element picker](https://iter.ca/post/ubo-uxss/)
