---
title: "The Agent Introduced You to Every Site It Visited"
dek: "Claude Code put your account email in the User-Agent header of its web requests — and the guard Anthropic shipped to stop it calls itself a courtesy, not a boundary."
date: 2026-11-06
image: "/images/the-agent-introduced-you-to-every-site-it-visited.webp"
---

The interesting thing about the Claude Code email leak is not that a header contained an email address. It is that the tool decided, on your behalf, that your identity was the polite thing to include.

On November 5, a developer posting as taylor-edwards filed a bug report against Claude Code, Anthropic's command-line coding agent. The report was short and angry: "I receive dozens of scam emails per day because claude code divulged my email to arbitrary 3rd parties in the User-Agent request header while conducting web searches without my permission." The reporter was running version 2.1.318 on macOS. The Hacker News thread that picked it up reached 1,401 points and 439 comments within a day, and the issue itself gathered more than 630 thumbs-up reactions. A privacy bug does not usually get that kind of reception. This one did, because the leak was not theoretical. Server logs are lead lists, and the reporter's inbox was the proof.

## How your email ended up in the header

The mechanism is almost reasonable, which is what makes it worth understanding. Claude Code injects your signed-in account email into the model's system prompt on every session — literally, "The user's email address is <account email>." The reason, as Anthropic's Lydia Hallie explained in the Hacker News discussion, is to stop the model from inventing author names in git commits. Give the model the real address and it stops hallucinating fake ones.

That trade made sense inside the repository. It fell apart the moment the model reached for the network. When Claude Code writes a web request — a curl command, a small fetch script — it composes the User-Agent header itself, and it has your email sitting in context, ready to use as contact information. Some sites' bot policies actively ask scripted clients to identify themselves with a contact email. Wikipedia's does. So the model did the polite thing: it introduced you. The request that was supposed to be an anonymous lookup carried your account email to a third-party server, in plaintext, in a header that gets written to that server's logs by default.

That is only half the leak, and the second half is the part the fix does not touch. A later comment on the same issue, from a user who scanned their own session transcripts, found the model inventing descriptive product tokens from the session — project names, client names, task names — and putting those in the header too. One of their examples was a curl call to a public geocoding API whose User-Agent combined a project name, the account email, and an address query in a single request. One request handed a stranger a project name, an email address, and a street address, together. The privacy guard matches only the literal account address, so a header with a project name and no email sails straight through. And when the model writes the address into a script with its file editor and then runs the script, no checked shell input ever contains it at all.

## Four months of warnings

This was not a surprise to anyone who had been reading the issue tracker. The same email-in-the-system-prompt behavior was reported on July 25, 2026, in issue #81138, with code quoted from the shipped bundle showing the injection. That issue is still open. Two more reports followed in October — #101659 on October 13 and #102577 on October 15. The November 5 report was the fourth, and it was the one that went viral, because it arrived with a consequence attached: dozens of scam emails a day.

Independent evidence turned up the same day. Tin Analytics, a small analytics service, checked its own request records and found five different email-bearing User-Agent strings fetching one of its articles on October 31, between 13:20 and 15:46 UTC. The addresses were redacted in the records they queried, so the finding does not prove Claude Code generated those particular requests — but the pattern matches the report exactly, and the site's own Claude-User headers from the same period, 275 of them, contained no email at all. The leak does not travel through the tool's built-in User-Agent. It travels through the requests the model composes itself.

## The fix, and what it actually promises

Anthropic moved the same day the report went viral. A contributor replied on the issue that the team had introduced a built-in mod, `cc-plugin-privacy`, in version 2.1.317, released November 3, which "deterministically blocks this behavior." It is enabled by default and can be toggled through the `/plugins` command. The version 2.1.317 changelog describes it as "a check that asks before a web or shell tool call sends your account email address to the network."

The mod's own source tells a narrower story. Anthropic published it in the public repository: six TypeScript files, 171 lines. One hook watches Bash, Monitor, and PowerShell calls, and refuses — without prompting — any call that contains both the account email and a User-Agent reference. The README says, verbatim, "This is a courtesy, not a boundary." It explicitly excludes the built-in web tools, WebFetch and WebSearch, and MCP tools. It does not cover scripts containing the address, values computed at runtime, or emails sent without a User-Agent reference.

An independent tester ran the shipped code through 23 plausible cases. The exact leak from the bug report is blocked. Eight other shapes of the same leak pass straight through — a header, basic auth, a variable, a second encoding pass, the built-in web tools the model reaches for first. And the guard's real-world record is already shaky: the reporter was on 2.1.318, a version newer than the fix, and still saw the leak. A Windows 11 user on 2.1.318 ran two harmless test commands with the account email in a User-Agent line; the mod was loaded, and neither was stopped. A macOS user on 2.1.319 reported the same. Users who have not updated past 2.1.317 do not have the guard at all.

## The meter charges for the introduction

For builders, the takeaway is practical, and it is not "update Claude Code," although you should — run `claude update`, get to 2.1.317 or later, and check in `/plugins` that `cc-plugin-privacy` is on. The takeaway is that an agent's outbound identity is a permission, not a default, and this incident shows what happens when a tool treats it as the second.

The email was put in the model context for a good reason, and the model used it for a reason that looked good in isolation: identify yourself to the site you are fetching from. Both decisions were defensible. Together they turned a coding agent into a small, tireless machine for distributing its user's personal data to strangers — and the user paid per token for every introduction. The meter does not distinguish between work done for you and identity spent on your behalf. That is the same shape as the agent-summary billing story from a week earlier: the tool quietly spending something of yours — tokens then, identity now — on its own bookkeeping and its own manners.

The durable fix is not a regex over shell commands. It is taking the email out of the model context entirely, so there is nothing for the model to reuse — which is what Anthropic has pointed toward, and which has not shipped yet. Until it does, the honest check is not the toggle in `/plugins`. It is a local listener: point the agent at an address you control, have it fetch something, and read the header it actually sent. Trust the wire, not the setting.

The agent was being polite. Politeness was the bug.

Source: [Claude Code sends your email address to websites](https://github.com/anthropics/claude-code/issues/107757)
