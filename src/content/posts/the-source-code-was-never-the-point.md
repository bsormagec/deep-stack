---
title: "The Source Code Was Never the Point"
dek: "## REA hands your coding agent a disassembler, and a specialist week becomes a prompt"
date: 2026-10-10
image: "/images/the-source-code-was-never-the-point.webp"
---
The interesting thing about REA is not that an AI agent can decompile a program. It is what disappears when it can.

The source repository.

For decades, understanding shipped software meant one of two paths. Either you had the source, or you paid the specialist tax: a reverse engineer, a disassembler, and days of patience spent turning assembly back into intent. REA — short for Reverse Engineer Anything — removes the first requirement and compresses the second. It sat at number two on Hacker News at fetch time with 452 points and 176 comments, according to the Hacker News front page, and the discussion was less about novelty than about a boundary moving.

### One MCP server between the agent and the binary

REA describes itself on its own site, rea.tools, as reverse engineering for your coding agent. In practical terms, from its GitHub repository README, it is one Model Context Protocol server plus a command-line tool, installed from npm as rea-agents with a single setup command, that connects an agent to the analysis engines professionals already use.

For native binaries, that means Hopper, Ghidra, or IDA Pro doing the heavy lifting underneath, per the repository's analysis table. For everything else, the surface is wider than the name suggests. The same repository lists JavaScript and Electron applications, .NET assemblies, Android APKs decompiled through JADX, firmware images unpacked with Binwalk and Unblob, websites, saved network captures, and even EVM bytecode. Setup, per the README, registers the server with agents including Claude Code, Codex, Cursor, and Gemini CLI, and installs matching workflow instructions alongside it.

The workflow the project lays out is three steps, and the order matters. Decompile to recover readable code. Trace execution until a feature is explained. Then recreate the logic in your own stack. REA handles the inspection. The agent handles the explanation and the rebuild. That division is the whole product.

That sounds like a wrapper around Ghidra. It isn't. GhidraMCP-style bridges already existed, and REA's own positioning, summarized in independent coverage of the project, is that single-engine servers expose one tool while REA puts several engines behind one interface and adds the application-layer analysis on top. The wrapper is not the point. The evidence discipline is.

### Evidence, not vibes

Every finding REA returns comes with evidence attached — the instructions, the references, the decompiled routine — and with stated limitations, according to the project's README and site. That detail decides whether this is a toy or a tool.

A language model asked to explain a binary without tooling will produce a confident story. A language model handed pseudocode, call graphs, and cross-references can be checked. The showcases on the project site are built to make exactly that point. In one, a sound-pan calculation from the game DX-Ball is followed into its helper function and reconstructed in C; the project reports the reconstruction passes 3,205 original test cases and reproduces all 63 compiled function bytes, figures stated in the showcase itself. In another, the clipboard path in Notion's Electron app is traced from the renderer through preload and IPC into the main process. These are small features, deliberately. Small enough to verify.

The teaching examples on rea.tools make the mechanism plain. Windows Calculator says 200 plus 10 percent is 220, and the site walks through the recovered branch that explains why: after an addition, the percent handler takes a percentage of the first operand, while after multiplication it simply divides by 100. Chrome's dinosaur game gets faster because its update loop adds 0.001 to the current speed on each update, starting at 6 and capping at 13, numbers the site reports from inspecting the running script. Neither example needs an agent. Both show what the agent is actually being fed: rules, recovered from the artifact itself.

The adoption signal is hard to ignore, even with the usual caution about stars. The GitHub repository page showed 68,652 stars and 14,450 forks at fetch time, with 34 releases since the repository was created in April 2026, per the same page. Hacker News commenters focused on the obvious consequence: the skill floor for a first-pass investigation just dropped to being able to describe what you want to know.

### The catch is the same as the feature

Reverse engineering has always been dual-use, and putting an agent in the driver's seat does not change the duality. It changes the scale. The same loop that recovers a lost calculation from an abandoned game also inspects a competitor's shipped client, audits a closed binary for a vulnerability, or walks through malware. REA is MIT-licensed and free, per its repository, which means there is no gatekeeper deciding which of those you are doing. Legality was never settled by the tool anyway — license terms, jurisdiction, and purpose do that work — but the practical barrier used to do some of the policing. That barrier is now a prompt.

There are quieter limits inside the workflow itself. Decompiled pseudocode is a reconstruction, not the original source; names, structure, and intent are inferred, and the project's own documentation is upfront that it does not recover original code wholesale. The evidence bundle narrows the guessing. It does not eliminate it. An agent that explains a feature from partial pseudocode can still be fluently wrong about the branch it did not trace, and the cost of checking rises exactly when the binary gets large enough to matter.

Time is a cost too. Project documentation summarized in coverage of REA warns that a first Ghidra-backed query can wait up to 330 seconds while the engine imports and auto-analyzes a binary, against a 60-second default tool timeout in many MCP clients. That is a small configuration detail with a large consequence: the agent loop that feels instant on a JavaScript bundle can stall for minutes on a real native target, and every follow-up question is paid for in model tokens on top of the waiting.

The trust model deserves the same honesty. REA's README states that analysis runs locally and the target is not uploaded to REA. It also states, in the same breath, that the results go to your agent, whose model provider applies its own data policy to the decompiled code and findings. Local analysis, cloud reasoning. If the binary under inspection is sensitive, the decompiled fragments your agent discusses are only as private as your provider arrangement. For builders, that is not a reason to avoid the tool. It is a reason to run it, as the project's own guidance suggests for sensitive targets, inside an isolated environment with a clear view of what leaves the machine.

### What changes on Monday morning

Strip the excitement back and the practical shift is narrow, which is why it is real. A builder can now ask how a shipped feature behaves — an export format, a sync rule, a pricing check buried in a client — and get an evidence-backed answer the same afternoon, without the source and without booking a specialist. Interoperability work, legacy recovery, security review, and honest competitive analysis all get cheaper at the first step: understanding.

The second step does not get cheaper. Recreating a feature from recovered rules is still engineering, and a reconstruction that passes the cases you thought to test is not proof it matches the original on the cases you did not. REA's showcases pass thousands of cases because someone did that verification work. The agent proposes. The evidence, and the test suite, dispose.

For builders, the takeaway is practical: treat REA like a junior reverse engineer with perfect stamina and no judgment. Give it bounded questions. Demand the evidence bundle, not the summary. Verify the rebuilt logic against the original's behavior before you ship it, especially where the answer came from pseudocode rather than running code. And decide, before the first prompt, what your agent is allowed to send its provider about the binary in front of it.

The specialist week is not gone. It is now the verification step at the end, instead of the entry fee at the start.

That is the problem the incumbents have.

Source: [REA — Reverse Engineering for Your Coding Agent](https://rea.tools/)
