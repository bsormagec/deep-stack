---
title: "The Email Was Never Supposed to Reach a Human"
dek: "Google's 2023 promise said your Gmail and Drive content would never be seen by human reviewers. An October edit to the same blog post says it can be. The interesting thing is not the edit. It is what the edit quietly redefined."
date: 2026-11-10
image: "/images/the-email-was-never-supposed-to-reach-a-human.webp"
---

The interesting thing about this story is not that Google changed a privacy policy. Companies do that constantly, and they usually announce it. The interesting thing is that the promise and its reversal now live in the same paragraph of the same blog post — and the reversal arrived as a parenthetical, dated October 16, 2026, with no announcement, no email to users, and no press release.

On September 19, 2023, Google launched Bard Extensions, the feature that let its chatbot read your Gmail, Docs, and Drive. The launch post, written by product director Yury Pinsky, made the deal explicit: "your content from Gmail, Docs and Drive is not seen by human reviewers, used by Bard to show you ads or used to train the Bard model." That sentence was the whole pitch. Connect your inbox and your files, and the model reads them — no human does.

Three years later, the same sentence carries an update. The parenthetical added on October 16, 2026, says that for newer features, "data from Workspace Apps will be processed to personalize other Google experiences, and depending on a user's settings, that same subset of data can be used to train generative AI models. It can also be subject to human review in limited circumstances."

The promise was not deleted. It was re-scoped. That is the whole story, and it is worse than a deletion, because a deletion is honest.

## The mechanism is a feature, not a bug

The feature doing the re-scoping is Personal Intelligence, the system that lets Gemini pull from Gmail, Drive, Docs, Calendar, Photos, Wallet, and more on a personal Google account. Google's own help page for Connected Apps — answer 16836988, which I read directly — states it plainly: "Data from Connected Apps is used and human reviewed per the Gemini Apps Privacy Notice." The same page says the data is used "to improve Google services, including training generative AI models," and lists what counts as data: "emails, files, events, photos, videos, info about your contacts... info from Google Wallet... and location info," adding that it "may relate to topics you find sensitive, like race, religion, and health, or confidential info."

The help page's FAQ, quoted in the Hacker News discussion, spells out what review means in practice: "a subset of Connected Apps data processed by Gemini is reviewed by human reviewers (including trained service providers), to debug our services, help keep them safe, and improve them." And then the warning that should have been the headline: reviewers may see "just an email or file," so "don't connect your apps to Gemini Apps if they contain confidential information that you wouldn't want a reviewer to see."

Read that warning twice. The company that built the feature is telling you, in its own documentation, that the feature's correct use is to not connect it to anything confidential. The privacy control is you, opting out of the thing you were sold.

## The retrieval nobody asked for

The Hacker News thread that surfaced all of this — 706 points by the afternoon of November 10, with comments still arriving that day — points to a GitHub repository published on November 9 by a pseudonymous author, titled "Documentation of Gemini File Leaking Behavior." The repository's claim goes further than the policy text. It says the ingestion happens on its own, in ordinary conversation, without the user ever typing @Drive or @Gmail.

The author's tests describe four possible outcomes when a personal topic comes up in chat: nothing is retrieved; a generic summary appears; a two-to-four-sentence exact quotation surfaces, frequently including names, account numbers, and confirmation numbers; or the complete unredacted text of the email or file lands in the session context. The retrieval is probabilistic — the same question, asked twice, can produce different outcomes — which means a single clean test proves nothing. The author's own example is an internet provider's bill: across trials, Gemini variously gave a generic answer, quoted the payment block with full name and account number, and once dumped the entire email including its headers.

That claim needs its caveat carried in full. These are one author's anecdotal trials, with a single provider email, no stated sample size, and no independent verification yet. Nobody has published a reproduction at scale, and Google has not responded to the write-up. What is independently verified is the policy layer: the help page, the October 16 blog edit, and the warning. The retrieval behavior is a claim; the review pipeline is a fact. The article should not blur the two, and neither should you.

## The scope line that protects the office, not you

There is one more line in the repository that matters, and it is the one the headlines mostly skip. A clarification added on November 10 states that the documentation applies strictly to consumer Google accounts — personal @gmail.com accounts. Google Workspace business, enterprise, and education accounts operate under separate data processing agreements that, by default, exclude human review and external generative training.

So the boundary is not technical. It is contractual, and it runs along the line between the account your employer pays for and the account where your actual life lives. Your work email is protected by a data processing addendum. Your personal email — the one with the bills, the medical appointments, the flight confirmations — is governed by a help page that says a subset of it is human reviewed.

The Hacker News discussion understood this immediately. The top thread is not about the policy text; it is about migration — people moving Drive to Nextcloud, Photos to Immich, email to self-hosted setups. One commenter noted that Gemini can be triggered by an accidental tap, no @ tag required. That is the shape of the problem: a feature that pulls your files into a chat you did not ask it to read, governed by a setting you probably never opened, reviewed by people you will never meet.

## The honest version of the reversal

There is a counterpoint, and the article would be dishonest without it. The human-review language was not invented on October 16. Coverage of the change notes that the same language has sat on the Connected Apps help page since Personal Intelligence launched in January 2026. The October edit mostly brings a three-year-old blog post into line with a help page that already said the quiet part out loud.

That does not make the story smaller. It makes it more precise. The 2023 promise was written for one feature — Workspace extensions — and the new features run under different rules. Google did not secretly rewrite history; it quietly redefined which promise applies to which feature, in a parenthetical, months after the new rules took effect. The user who connected Gmail in 2023 on the strength of "not seen by human reviewers" was never told the sentence stopped applying to the thing they were using.

For builders, the takeaway is practical: the boundary between your data and a human reviewer is now a settings toggle on a consumer account, plus a retrieval system whose behavior varies run to run. If you build on Gemini's Connected Apps, audit what is connected before you audit what the model can do — and assume anything connected can surface in a review queue, because Google's own page says a subset of it does. If you want the convenience without the reviewer, the answer is the one the Hacker News thread already reached: run the model where your files are, not where someone else's reviewers are.

Google's warning, read literally, is the whole review in one sentence: don't connect anything confidential. That is the problem.

Source: [Google Gemini routes personal Drive files and emails to human annotators](https://github.com/thisisme6598/gemini_files/)
