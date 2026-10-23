---
title: "The AI Assistant Has Become an Adtech Sensor"
dek: "OpenAI's cross-site identifier changes the trust model for conversational software."
date: 2026-09-20
image: "/images/the-ai-assistant-has-become-an-adtech.webp"
---
ChatGPT was sold as a place to ask questions. The uncomfortable discovery is that, in at least one observed advertising path, it can also become the thing that helps an ad system recognize you elsewhere.

A recent investigation by Jamie Buchodi traced OpenAI's \_\_obi cookie from ChatGPT to advertiser websites. The mechanism is familiar to anyone who has spent time around adtech: a first-party account identifier, a cross-site pixel, and server-side matching. The unusual part is where the identifier starts. It is tied to an AI conversation product, a place where users routinely disclose far more than they would on a shopping site.

The important story is not that OpenAI invented tracking. It did not. The important story is that conversational systems are moving into the same data business as the platforms people already distrust, while keeping the social contract of an assistant.

## The plumbing is ordinary. The context is not.

Buchodi describes a three-step flow. ChatGPT obtains a signed token containing an account or anonymous subject and an identifier called obi. The browser syncs that identifier to bzr.openai.com, where it becomes the \_\_obi cookie. When a participating advertiser loads OpenAI's measurement SDK, the browser sends the cookie back across the site boundary.

The SDK can collect information from the advertiser's page. Buchodi observed data from deliberate advertiser inputs, rendered page text, form fields, and tag-manager data layers. Email addresses, phone numbers, and names were hashed. Location data was not. URL paths were retained even when query strings were removed. The reported examples included medical, debt, and legal pages.

That is not magic. It is a fairly standard measurement stack. The browser is doing exactly what the cookie attributes ask it to do. The privacy risk does not come from a model mysteriously reading the web. It comes from a normal web tracking design attached to an account people use for unusually personal conversations.

## Consent labels are doing too much work

The investigation found that the sync token carried an analytics consent decision. OpenAI's cookie policy lists \_\_obi under analytics cookies, while OpenAI has separate analytics and marketing choices. That creates a question that product copy cannot answer: what, exactly, did the user believe they were agreeing to?

There is a big difference between measuring how often a product is used and linking an account identifier to visits on commercial websites. Both can be called analytics. The word is too broad to carry the weight placed on it here.

This is where privacy controls fail in practice. A user sees a category, not a packet capture. They are asked to make a decision about a vague label, then the system uses that decision to authorize a chain of events spread across several domains. Even a technically accurate policy can leave the user with the wrong mental model.

The obvious defense is that the identifier may not always be issued. Buchodi says roughly one in five ChatGPT sessions produced a sync token, and the join between the cookie and an account was inferred from the design rather than directly observed. Those limits matter. They keep the claim precise. They do not make the architecture harmless. Intermittent surveillance is still surveillance when it works, and the system is designed to make the association possible.

## Why an AI product changes the stakes

Facebook and Google normalized the basic pattern long ago. That comparison is valid, but incomplete. People search, shop, and browse with an awareness that those activities feed advertising systems. Many people still treat ChatGPT as a private room, even when the service's terms say otherwise.

That expectation is not irrational. A chat interface invites disclosure. Users paste medical symptoms, financial worries, workplace disputes, relationship problems, and source code. The assistant's value depends on context, and context is exactly what adtech tries to collect.

The risk is not limited to whether a particular conversation is handed to an advertiser. Cross-site identity joins can make a profile more legible without exposing the original text. A person who asks an AI about a diagnosis and later visits a treatment site has created two signals. The ad system does not need the chat transcript to benefit from the connection. It needs a stable identity and enough surrounding behavior.

That is why the usual line, "the data is anonymized," is weak here. Hashing an email makes a field harder to read. It does not stop the same identifier from connecting events. Pseudonymous data can be intensely personal when it persists across contexts.

## The engineering lesson is about boundaries

The cleanest response is not a better tooltip. It is a stricter boundary between assistant identity and advertising measurement.

If a product needs analytics, it can measure events without exporting a durable account identifier to advertiser pages. If advertisers need conversion reporting, the system can use short-lived, purpose-limited tokens that cannot be reused as a general cross-site identity. If matching is allowed, it should require a separate, unambiguous choice that names the behavior rather than hiding it under analytics.

There are also practical defenses for users. Browser isolation, tracker blocking, and separate profiles can prevent this specific cookie path. Firefox containers and content blockers are useful. They are not a substitute for a product that respects the boundary by default, and they do not address every server-side or IP-based signal.

The broader lesson for engineers is simple: trust is part of the interface. An AI assistant can be technically honest about its policies and still violate the expectation created by its design. When a product asks people to think out loud, the burden for separating that relationship from advertising should be higher, not lower.

The source investigation shows a familiar mechanism in an unfamiliar setting. That is exactly why it deserves attention. The question is no longer whether AI companies can build adtech. They clearly can. The question is whether we are willing to treat an assistant's identity as just another advertising cookie.

Source: [ChatGPT now knows what you do on other websites via ad collector](https://www.buchodi.com/chatgpt-now-knows-what-you-do-on-other-websites-via-ad-collector/)
