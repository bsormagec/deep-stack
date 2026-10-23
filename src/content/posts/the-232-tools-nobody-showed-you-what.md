---
title: "The 232 tools nobody showed you: what ChatGPT Work actually is under the hood"
dek: "Simon Willison reverse-engineered ChatGPT's new Work mode and published its full tool and skill inventory. The real story is what that inventory reveals about how AI agents are built, billed, and locked in."
date: 2026-08-31
image: "/images/the-232-tools-nobody-showed-you-what.webp"
---
Simon Willison did something simple and a little sneaky last week. He opened a fresh ChatGPT Work session, asked it to build a website listing every one of its own tools, then asked it to add a verbatim copy of every skill it uses. The result is a public reference catalog covering 232 tool interfaces and 44 complete skill files: a look inside the engine room of OpenAI's flagship consumer agent.

The inventory itself is not the point. What matters is what it quietly reveals about how these agent products are actually built, priced, and locked in. Look at it for a minute and a lot of the chatter about models getting sharper starts to aim at the wrong layer of the stack.

## Two products wearing one name

Work is not a new model. It is a bundle of infrastructure decisions wrapped around the same models that already live in Chat. There are effectively two products under the name.

**Work Local** runs in the desktop app (the thing that used to be Codex, re-skinned so it is less intimidating to people who do not code). It works on your files and runs programs directly on your machine.

**Work Cloud** runs on OpenAI servers, reachable from the web and mobile apps. This is the version that a lot of people think is the future of the product, and it is the one carrying nearly all the genuinely new capabilities.

## What is actually new

Strip away the marketing and Work Cloud is a small set of real additions, none of which needs a smarter model to work:

- A code execution sandbox with open internet access. Chat's equivalent is walled off; Work can clone repos, install dependencies, and call live APIs by default.
- A full headless Chrome instance. It loads pages, fills forms, screenshots, and runs JavaScript against the DOM. It signs into sites on your behalf, and the credentials do not round-trip through the model.
- A persistent filesystem shared across sessions, so work started in one session survives into the next — something ordinary Chat explicitly does not do.
- ChatGPT Sites: build and deploy a working site on Cloudflare Workers, with stateful features on top of D1 and R2, all from a single prompt.
- Sub-agent sessions and scheduled prompt automations for chunkier, recurring jobs.

The most interesting discovery in the catalog is that the browser is not a tool at all. It is a skill: a document that tells the agent how to launch Playwright through its Node.js REPL and run `await browser.documentation()` to pull the real instructions at runtime. Why define it that way instead of baking the whole thing into Markdown? One plausible answer: it saves context. The detailed how-to loads only when the browser is actually needed, and the guidance stays current without shipping a new model. It is lazy loading applied to agent capabilities, and it is a quietly clever pattern.

## The confusion is a feature, not a bug

Simon's honest complaint is that figuring all this out took far more effort than it should have. OpenAI explains Work in terms of what it is for — a brief, a deck, an analysis — rather than what it does, and still refuses to publish the system prompt or tool descriptions. He had to reverse-engineer a product to learn how it behaves. That is not an oversight. It is the same opacity Anthropic leans on with Cowork.

## The moat is the users, not the model

The HN thread mostly asked a deadpan question: why is this a separate product when Codex does all of it? The answers from Simon himself are the most honest ones. ChatGPT Work in the desktop app is effectively Codex with a different skin. Work Cloud is a cloud-hosted, consumer-colored version of the same thing. The marketing distinction between devs and knowledge workers is a pricing decision wearing a product jacket.

Which is the part that worries people, and I think they are right to be uneasy. Several commenters point out that the real moat is not model quality. It is investment and data gravity. Once your workflows run inside a persistent shared filesystem, with your credentials and your history and your deployed sites, switching costs stop being about which model answers better. The answer to "why not just Codex" is the same as the answer to "why not just run it yourself": because by then you are already living inside the thing. Lock-in eats capability for lunch.

## The safety lines overlap, and nobody is talking about it directly

Simon's lethal trifecta model flags any agent that combines private data access, exposure to untrusted content, and a channel to exfiltrate stolen info. Work Cloud, shipped as-is, lines up all three: it reads your credentials, browses the open internet where hostile pages live, and has a browser plus code execution to carry data out. OpenAI's implied answer is the same auto-review sandboxing Codex uses. Fine, but the catalog does not document any boundary between the agent that manages the container and the one that reads your secrets. That gap deserves more than a shrug.

## Takeaway

The 232 tools are the least surprising thing in this story. The surprising part is how much of the future of AI agents is being decided outside the model: in context-saving skills, in persistent state, in open sandboxes, and in product lines drawn to keep users in place. If you want to see where this is heading, do not watch the benchmarks. Watch the containers, the billing pages, and the skills.

Source: [Understanding ChatGPT Work](https://simonwillison.net/2026/Aug/30/understanding-chatgpt-work/)
