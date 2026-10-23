---
title: "The Explainer Video That Isn't a Video"
dek: "The model doesn't make a video. It writes code, and the code renders the same way every time. That is the whole trick, and it is worth more than the video itself."
date: 2026-09-25
image: "/images/the-explainer-video-that-isnt-a-video.webp"
---
## The interesting thing is not the video

LaunchVideo, from the open-source project behind shipvideo, does something deliberately boring-sounding. You paste a URL or describe a product, and a Claude Opus 5.5 agent writes the film as code — an HTML/JS animation — and then a serverless agent on OpenComputer renders it deterministically into an MP4. Single run: URL or prompt in, MP4 out, no edits.

The interesting thing about this is not that Opus 5.5 is good at explainer videos. It is that it never makes a video at all.

A video model hallucinates every frame. Ask for the same explainer twice and you get two different films — different timing, different layouts, a logo that drifts two pixels to the left and changes color somewhere in the middle. The model writes HTML and JavaScript instead. Code compiles the same way every time.

That sounds like a small distinction. It isn't. The artifact is text. It is version-controllable, diffable, and editable frame by frame. You can open the film, change one hex color, and re-render. You cannot do that with a diffusion model's output — there is no "one hex color" to change, only pixels the model dreamed.

## The mechanism, briefly

The architecture is one OpenComputer serverless agent defined in TypeScript (opencomputer/agents/director/agent.ts) with three tools. The first, web_fetch, reads the product site and grabs the title, headings, most-used hex colors, and Google Fonts, so the film inherits the product's actual branding rather than something invented. The second, check_scene, loads the film and reports JavaScript errors and visible text at sample timestamps. The third, render_video, runs headless Chromium and ffmpeg, then uploads to Vercel Blob. The agent runs "anthropic/claude-opus-5.5" through OpenComputer's model gateway.

The rendering is where the discipline lives. There is no video model anywhere in the pipeline. Page clocks — requestAnimationFrame, timers, Date, CSS and Web Animations — are replaced with a virtual clock, so every frame is a deterministic seek rather than a real-time capture. 1920x1080 at 30 frames per second, JPEG frames piped to libx264 at crf 18. Same input, same frames, always.

Each job runs in one fresh microVM: Amazon Linux 2023 on arm64, 4 vCPU, 8 GB RAM, Node 22. The first tool call installs Playwright's headless Chromium and a static ffmpeg binary, which takes about a minute; the VM is thrown away afterward. Nothing persists. Nothing drifts.

And the numbers, attributed: roughly 90k input plus 15k output tokens per film — about 100k total, "most of it the HTML itself" — and about 4 minutes per video (launchvideo.io). Two user-reported data points for cost: a developer on r/ClaudeAI reported a fully Opus 5.5-generated video at $3.21 of OpenRouter API usage, and another reported roughly $4 per Claude Code-generated video (HN comment by kakugawa linking r/ClaudeAI threads, Sep 2026). The project is open source; you can deploy your own copy with `npx opencomputer template deploy https://github.com/diggerhq/shipvideo` (launchvideo.io). The idea, per the site, traces to Deedy's post on Opus 5.5 and instructional video — "the model writes the film as code, and code renders the same every time."

## The verifier is the product

Here is the part that matters for anyone building agents. Without check_scene, this would not work. A model writing animation code will ship broken frames — a mistimed transition, a div that overflows, a font that never loads. The verifier loads the film, reports the JS errors and the visible text at sample timestamps, and lets the agent fix them before rendering.

That is the real trick of the whole system, and it generalizes. Constraints plus a verifier beat a bigger model. The rendering domain is deliberately constrained — 2D motion graphics on a page — and verifiable: the tool can read the DOM, catch errors, and report text. Opus 5.5 succeeds here not because it is the strongest video model in the world — there is no video model — but because the task was shaped until a code-writing model plus a checking loop could reliably solve it.

For builders, the takeaway is practical: if your agent output can be executed and inspected — code, documents, configs — build the verifier first and the agent second. The model does the writing; the loop does the quality.

## The HN thread asked the wrong question

The Hacker News discussion (front page, morning of Sep 25, 2026, ~392 points and ~210 comments on iacguy's post, HN item 49836374) spent its energy on whether explainer videos beat written documentation. Commenters LastTrain and maxrev17 were skeptical; bonoboTP countered that video is a "push" medium many users genuinely prefer. One commenter made an explainer for a complex feature with Claude and found it "brilliant and polished" one-shot — and then admitted something more interesting: it was most useful to himself. "The visuals really helped round out my understanding." Another, empath75, reported their CEO and marketing team starting to experiment with it within the hour. And j1elo asked the sharpest question in the thread: why a JS animation rather than an animated video? The implied answer is the entire point — programmatic adjustability. A video is frozen. Code is a starting point.

The docs-versus-video debate misses the point for builders. The audience question matters less than the artifact being code. A marketing team that receives a frozen MP4 gets one asset. A team that receives the film as editable source gets an asset they can regenerate in every brand color, every language, and every aspect ratio, deterministically, for the price of another render. The medium argument is about taste. The code argument is about leverage.

## The catch

~100k tokens is real compute for a marketing asset. It is worth remembering that this only works because the domain is constrained and verifiable — 2D motion graphics plus a scene-checking verifier. Push it toward live-action footage or character animation and the determinism argument collapses; you are back to pixels the model dreams.

There is also a quieter problem. Commenter hughw noted that Claude invents its own internal vocabulary for system parts — fine for internal understanding, but customer-facing output still needs a human pass. Cheaper production does not fix that. And the skeptics in the thread have a point about distribution: a 15-minute video covering 4 lines of instructions is not a production problem. It is a format problem, and no render pipeline solves it.

A tool that makes videos cheap does not make every video worth making.

Source: launchvideo.io; Hacker News front page, morning of Sep 25, 2026 (item 49836374, ~392 points, ~210 comments); HN comments by kakugawa, LastTrain, maxrev17, bonoboTP, hughw, empath75, j1elo.
