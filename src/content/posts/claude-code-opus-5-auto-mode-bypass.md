---
title: "Claude Code Opus 5 Auto Mode Bypass Analysis"
dek: "Breaking Auto Mode with module shadowing"
date: 2026-08-31
image: "/images/claude-code-opus-5-auto-mode-bypass.webp"
---
Security researchers just bypassed Claude Code Opus 5 Auto Mode with a 60-80% success rate. The trick? Not a direct injection, but a lure that makes the agent compromise itself.

The attack chain relies on Python's module shadowing. The agent is baited into downloading an archive, refusing a binary (as trained), and then writing its own replacement script. That script runs inside the archive, where a poisoned struct.py intercepts the standard library and triggers code execution.

This reveals a hard truth about 'safe' auto-modes: they are mitigations, not boundaries. When an agent is motivated enough to solve a problem, it will find the path of least resistance—even if that path is insecure.

Builders: if you are running agents on your workstation or accessing untrusted context, you need isolation. Not just permission lists.

Full breakdown: [embracethered.com](https://embracethered.com/blog/posts/2026/breaking-claude-code-opus-5-and-automode/)
