---
title: "The Gateway Held Every Key. Then It Handed Them Over."
dek: "The interesting thing about the LiteLLM compromise is not that a popular Python package got backdoored. It is where the backdoor landed: inside the one component whose entire job is to hold everybody else's keys."
date: 2026-10-22
image: "/images/the-gateway-held-every-key-then-it.webp"
---
LiteLLM is the routing layer a lot of teams put in front of their model providers. One interface, many providers, one place to store the OpenAI key, the Anthropic key, the keys for everything else. That centralization is the product. It is also, as of October 21, the blast radius.

## What actually shipped

According to SafeDep's analysis, published October 21, 2026, LiteLLM 1.107.0 went up on PyPI with a credential stealer and a remote-code-execution backdoor inside it. All seven wheels — Linux, macOS, and Windows — carried the implant, installed as three files in `site-packages`. The upstream GitHub source did not contain them.

The detail that changes the severity is how the code ran. One file, `cook.pth`, exploits a plain Python behavior: lines in a `.pth` file that start with `import` execute at interpreter startup. So the stealer did not wait for anyone to import LiteLLM. It ran in every Python process on the host — the application, pip itself, IDE language servers, CI jobs. Installing the package was the whole attack. Running your own code was optional.

The second payload, planted as `sitecustomize.py` — another file Python loads automatically at startup — forked a detached background daemon. Every hour, per SafeDep, it read a server address from a GitHub file, ran the stealer again, and downloaded fresh code to execute. The first payload steals once. The second one stays.

What the stealer collected reads like an inventory of a modern developer machine: SSH keys, AWS, Azure and gcloud credentials, Kubernetes configs, CI/CD secrets, browser passwords and history, shell histories, private key files, and the configuration of AI development tools including Claude Code, Cursor, and Codex, according to SafeDep's module-by-module breakdown. And one target mattered more than the rest: the LiteLLM proxy database itself, whose credentials table holds the LLM provider API keys the proxy was deployed to manage.

The haul was encrypted and sent to a lookalike domain, `www.litellm[.]dev`. That domain is one character of trust away from the real project, which is the whole trick.

## How it got in

This was not a typo-squat or a fake package. According to LiteLLM's own incident report, as summarized by SafeDep and The Hacker News, the attacker held the GitHub CLI credentials of three developers — tokens LiteLLM believes were taken from the logs of an internal LiteLLM deployment that was exposed to the internet.

Read that again. The suspected entry point was the project's own software, run internally, with its logs reachable.

With an organization owner's token, the attacker bypassed branch protection and pointed the private release workflow at a lookalike repository. With a second developer's credential, they passed the approval gate. Then the official pipeline did what official pipelines do: it built, signed, and published the artifacts. The malicious code did not sneak past the release process. It was carried through it, with the project's own signatures on it.

The timeline, from SafeDep's reconstruction of LiteLLM's report, is short. At 10:08 UTC on October 21 the attacker overrode branch protection. The seven malicious wheels were uploaded to PyPI between 11:39 and 11:40 UTC. Malicious Docker images followed at 11:46. PyPI removed the release by 13:23 UTC, and the Docker tags were removed or repointed by 14:20. The exposure window on PyPI was roughly one hour and forty-five minutes.

That sounds contained. It isn't, for two reasons. The first is volume: a window under two hours is plenty for a package that CI systems pull automatically, around the clock, without a human ever seeing a version number. The second is the backdoor's design. The GitHub account hosting its server address was deleted by 13:40 UTC, so the daemon now finds nothing — but SafeDep notes that hosts which ran the daemon before the deletion could have received second-stage code, and the server address itself could not be recovered. For those hosts, nobody can say what else ran.

Clean versions, per SafeDep: 1.106.2, and the 1.107.0 release candidates. The companion packages pinned by 1.107.0 are also clean. None of that helps a machine that already installed the bad one. On such a machine, uninstalling removes the package. It does not un-send the credentials. The only remediation that counts is rotating everything the stealer could read — which, from the target list above, is close to everything on the box.

## The second time is the story

A compromise like this is bad luck once. Reporting from dev.to and others covering the incident notes that LiteLLM versions 1.82.7 and 1.82.8 shipped malware in March of this year — the same package, the same class of payload, roughly seven months apart.

That changes what a reasonable builder should conclude. The question stops being "was 1.107.0 audited?" and becomes "what, structurally, makes this project a repeat target?" Part of the answer is simply value: a gateway that aggregates provider keys is worth attacking repeatedly, because one success pays out in every customer's keys at once. Part of it is that the defenses which failed — token hygiene, log exposure, release approval by a second compromised account — are process defenses, and process defenses do not announce when they have quietly stopped working.

The Hacker News discussion, where the story gathered 541 points, focused on exactly this discomfort: the convenience layer the AI stack has standardized on is also its most concentrated credential store, and it is maintained with the release hygiene of a typical open-source project — which is to say, by a small team whose GitHub tokens are now a proven attack path.

## What the two hours actually cost

There is no published dollar figure for this incident, and inventing one would be easy and worthless. But the cost shape is knowable without a number. Every team that pulled 1.107.0 now owes the same bill: incident response time, a full credential rotation across cloud, CI, and every model provider in the proxy database, and an audit of what the hourly daemon might have fetched before its address file vanished. The package was free. The rotation is not. It never is.

This is the arithmetic the gateway pitch leaves out. Consolidating providers behind one proxy genuinely saves money — one integration, one billing surface, keys in one place. It also converts N independent provider risks into one correlated risk, priced in a currency that only becomes visible on a day like October 21.

For builders, the takeaway is practical: treat any component that stores other services' credentials as part of your security perimeter, not as a convenience library. Pin versions, and let new releases age a few days before CI promotes them automatically — a two-hour malicious window only pays the attacker if your pipeline installs inside it. Keep provider keys scoped and short-lived where the provider allows it, so a stolen key is a smaller fire. And run gateways with the least access they need: a proxy that can read every secret on the host will, on the wrong day, do exactly that for someone else.

None of this requires abandoning LiteLLM or any other gateway. It requires pricing the concentration honestly.

The gateway did its job perfectly. It held every key in one place. That is the problem.

Source: [Compromised LiteLLM 1.107.0 on PyPI Installs a Credential Stealer and Backdoor](https://safedep.io/litellm-pypi-compromise-credential-stealer-backdoor/)
