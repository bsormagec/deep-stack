---
title: "Your AI Chat Is Not a Private Conversation. It's a Webpage."
dek: "*An IMDEA Networks study traced what conversational AI agents actually send to third-party trackers. The chat window is wired into the same machinery as everything else.*"
date: 2026-09-29
image: "/images/your-ai-chat-is-not-a-private-conversation.webp"
---
The interesting thing about the privacy of AI chatbots is not that your prompts might end up in a training set. It is that the chat window behaves exactly like a webpage — because under the interface, it is one.

A new study from the Internet Analytics Group at IMDEA Networks, titled "Prompt like a Butterfly, Sting like a Tracker: A Privacy Analysis of Web and Mobile Conversational AI Agents," did something refreshingly unglamorous: it watched the network traffic. What the researchers found reads less like an AI safety report and more like a 2012-era exposé of third-party cookies — except this time the data being harvested is your conversations.

## The plumbing is the product

The web agents and mobile conversational agents the team analyzed run on technical infrastructure that will look familiar to anyone who has ever inspected a news website: analytics services, advertising pixels, tracking scripts. The interface resembles a conversation; underneath, it operates on the same data-collection machinery as the traditional web ecosystem.

The study's headline findings are blunt. Chat titles, conversation URLs — the permalinks you get when you hit "share" — and associated metadata are transmitted to third-party trackers such as Meta and Google, along with cookies and other identifiers. Grok and Perplexity send conversation URLs with weak access control to third-party trackers such as the Meta Pixel. Grok goes further: it exposes verbatim message text through Open Graph metadata collected by TikTok. That is not a prompt leaking into a training set. That is your words, shipped to an ad network, by design of the page template.

## The link that is a publication

The second finding is the one that should bother builders. In some cases, the researchers found, weak or nonexistent access controls mean that simply having a link to a conversation grants access to its content — "making chats publicly accessible to anyone, including trackers who have the URL," as co-author Narseo Vallina-Rodríguez put it.

That sounds like a bug. It isn't, quite. A shareable permalink with no authentication is a feature working as designed — for growth. The cost is that every shared conversation is, for practical purposes, a public document the moment a tracker sees the URL. And trackers see the URLs, because the chat page fires the same pixels as everything else.

## The identity part

The third finding closes the loop. The researchers identified mechanisms that let operators link AI-chat activity to real user identities: cookies from tracking services, hashed email addresses, and server-side tracking techniques, combined into persistent profiles that enable re-identification across sessions and services.

And then there is the gap between the controls and the flows. The study found privacy controls and policies that do not accurately reflect actual data flows — toggles in the interface that promise one thing while the network traffic does another. A privacy control that misleads is worse than no control at all: it manufactures confidence. Users already walk into the chat window expecting confidentiality — the interface is a text box, and text boxes feel like confession booths. The study's authors describe this as the continuation of data-driven business models inside the generative AI ecosystem: the interface is new, the business model is the old one.

The Hacker News discussion, which pushed the paper to the front page with roughly 357 points and 115 comments within hours of posting, treated it as confirmation of a suspicion rather than a revelation. That is the telling part. Nobody is surprised that the trackers are in the chat window. The surprise would have been finding them absent.

## For builders, the takeaway is practical

If you build conversational agents, your privacy surface is not the model. It is the page. Audit the plumbing: what fires when a chat page loads, what your Open Graph tags contain, whether your share links are authenticated, which third-party SDKs ride along in the mobile app. The model can be perfectly aligned and it will not matter, because the leak is not in the weights — it is in the template.

Treat every agent output as publishable by default. If a conversation can be reached by URL, assume a tracker has the URL. If a pixel fires on the page, assume the tracker can read the page. These are not paranoid assumptions; they are the documented behavior of the infrastructure your agent ships on.

There is a version of this problem I would happily pay to solve: a conversational agent whose privacy guarantees are stated at the network layer, not the marketing layer. Until that exists, the honest posture is the study's: the chat window is a webpage, the webpage is tracked, and the tracker does not care that you were only talking to a robot.

The butterfly promised a private conversation. The tracker kept the receipts.

Source: [Prompt like a Butterfly, Sting like a Tracker: A Privacy Analysis of Web and Mobile Conversational AI Agents](https://networks.imdea.org/team/research-groups/internet-analytics-group/?subsection=publications)
