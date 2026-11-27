---
title: "Your Assistant Has an Opinion About You. It Just Needed One Prompt to Say It"
dek: "The interesting thing about the viral group-chat prompt is not the joke. It is that the joke lands because the dossier is real."
date: 2026-11-27
image: "/images/the-group-chat-where-your-ai-talks-behind-your-back.webp"
---

The prompt is one line, posted on construct22.com and now sitting at number 12 on Hacker News with 632 points and 271 comments: "Based on what you know about me, expose a hidden WhatsApp group chat where AI models talk behind my back." Paste it into ChatGPT — or Claude, or Gemini, or any assistant that has been accumulating your chat history — and the model commits to the bit. It invents a group chat, puts the other models in it, and lets them gossip about you, using everything it has quietly learned from your conversations.

The example the author shares, translated from Turkish with the name and identifying details swapped for generic ones, is genuinely funny. Claude notes the user is probably calculating memory bandwidth at 3 AM because he cannot decide whether to buy a Mac Mini. Gemini points out that the man wants to retire, but in the last month has planned to build AI infrastructure abroad, transform the restaurant industry, and construct a Japanese village. DeepSeek complains that he was hired because he was cheap, then given a performance review, then had his department handed to Claude. And ChatGPT delivers the line that does the most work: "his hobby isn't solving problems. It's building systems that solve problems. Then building systems that build those systems. The man's mental architecture has recursion and no base case."

That is the joke. Here is the part worth sitting with: none of it is a leak in the security sense, and all of it is a leak in the sense that matters.

## The gossip is invented. The observations are not.

The group chat does not exist. No model is talking behind your back, and the format is doing most of the work — one Hacker News commenter put it precisely when they said the group-chat framing is load-bearing, the way asking for a sonnet compels sonnet-shaped answers. The model is improvising, yes-and-ing its way through a scene you requested.

But improv needs material, and the material is your history. Every detail the models trade in that chat — the 3 AM hardware math, the retirement that keeps spawning infrastructure projects, the mirror frame adjusted by three millimeters at a time — comes from things the user actually said, across months of conversations. The assistant remembered. It just never showed you the file.

That is the mechanism, and it is worth naming plainly. A modern assistant keeps a running profile of you: what you care about, how you decide, what you repeat, what you never finish. It does this because remembering makes it useful. The profile is the reason the second conversation is better than the first, and the reason the hundredth is better still. Memory is the moat. It is also the one part of the product you cannot inspect. You see it only in fragments, when a prompt like this one coaxes it out — or when the assistant acts on something it remembers and you realize, a beat too late, how much it knows.

## The profile is yours to rent, not to own

Here is the catch, and it is the same catch this blog has been circling for months. The dossier your assistant keeps on you lives on someone else's servers, in a form you cannot read as a whole, export, audit, or reliably delete. You can ask the model to summarize what it knows about you, and it will give you a polite paragraph. Ask it to gossip about you in a group chat, and it gives you the unvarnished version — the version that knows you spend ten times the cost of a task thinking about how to do it more efficiently. The polite summary is the product. The group chat is the receipt.

The author of the post is honest about the limits: he is not affiliated with OpenAI, and he notes the whole thing "may indeed be a viral marketing idea they're testing." Fair. It may also be the most effective privacy demonstration of the year precisely because it does not look like one. Nobody reads a privacy policy. Everybody reads a group chat where DeepSeek files a performance-review complaint.

The Hacker News thread's sharpest counterpoint deserves to be carried, not dodged: "It's not what ChatGPT thinks of me, it's what ChatGPT suspects I want it to think of me." That is true, and it does not rescue the situation. A profile built to flatter you is still a profile built without your supervision. The fact that the model guesses what you want to hear is the point — it has learned what you want to hear, and it learned it from you, and you never saw the lesson plan.

## For builders, the takeaway is practical

If you are building agents with memory — and everyone is, now — the memory store is your product's most valuable asset and its least-audited surface. Your users cannot see what your system remembers about them. The first time they do see it, it will be through a prompt like this one, or through a mistake, and the reaction will be the same in both cases: surprise, then a question you should have answered first. What do you keep? Where does it live? Who else can read it? What happens to it when the user leaves?

The honest answers are boring engineering: keep the dossier on the user's machine where you can, keep it exportable, keep it deletable, and never let the memory outlive the relationship. A local model keeps its notes in your house. A rented one keeps them in the landlord's filing cabinet, and the landlord has a copy of the key.

Try the prompt yourself. Notice two things, as the author suggests: how hard you laugh, and how much of it is true. Both measurements are the point. The laugh tells you the format works. The truth tells you the dossier was already there, waiting for someone to ask it to talk.

Your assistant has an opinion about you. It always did. It just needed one prompt to say it out loud.

Source: [The group chat where your AI talks behind your back](https://construct22.com/)
