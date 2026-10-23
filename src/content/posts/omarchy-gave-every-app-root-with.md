---
title: "Omarchy gave every app root with one docker group"
dek: "A convenience tweak that gave every desktop app root — what happened and how to fix it."
date: 2026-08-30
image: "/images/omarchy-gave-every-app-root-with.webp"
---
Eight stories in today's Daily Bulletin. This one stood out because it's not abstract. It's your machine.

## What happened

Omarchy is DHH's Arch-based distro for developers. To make Docker nicer, the default user was added to the `docker` group. No `sudo` needed for `docker run`.

Sounds harmless. It isn't. Docker's own docs warn that the docker group is root-equivalent. The daemon runs as root and listens on `/var/run/docker.sock`. If you're in the group, you can ask the daemon to do anything as root.

> A security issue in Omarchy's default Docker configuration meant that essentially every program running in the user's desktop session could escalate to root without a password, sudo, or a privilege prompt.

Quote: [0xcc — Omarchy: Any User Process Can Escalate to Root](https://0xcc.io/posts/omarchy-root-creds/) (Aug 28, 2026). Reported privately, fixed in 4.0.1.

## One command to prove it

On a fresh install:

```
$ cat /etc/shadow
cat: /etc/shadow: Permission denied

$ id
uid=1000(tester) gid=1000(tester) groups=1000(tester),967(docker),992(input),998(wheel)

$ docker run --rm -v /:/hostroot alpine cat /hostroot/etc/shadow
root:$6$...  # it prints, as root
```

The first command fails as a normal user. The second works because the Docker daemon does the read as root after mounting the host filesystem. Group membership spreads to the whole session.

## Why this is serious

Supplementary groups are inherited. Not just your shell, everything in the session gets it:

- browser, VS Code, terminal, npm scripts, AI coding agents, background services
- compromise any of those, and you own the machine
- you didn't need to use Docker at all, it was on by default, no opt-in

The docs made it worse. They said "run Docker as the normal user and not as root". People read that as rootless. It was the opposite.

## What to do

- If you run Omarchy, update to 4.0.1. Commit b5ded31 removes the docker group from the default config.
- Check yourself: run `id` and see if `docker` is in groups.
- If you want rootless containers, try Podman. No daemon, runs in your user namespace. The author recommends it and I've had the same experience.
- Rule of thumb: don't trade a security default for convenience without asking. Make it opt-in.

One line added the group on June 1, 2025. It was removed August 24, 2026. Small comfort change, large attack surface.

Full write-up here: [0xcc.io — Omarchy: Any User Process Can Escalate to Root](https://0xcc.io/posts/omarchy-root-creds/).

---

*Note: This post summarizes and quotes the original finding. See the source for full timeline and details.*
