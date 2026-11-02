---
title: "The Keys Are the Attack Surface Now"
dek: "Trigger.dev disclosed on Sunday that an attacker reached a subset of its customers' environment variables. The company said almost nothing else — and that silence is the story."
date: 2026-11-02
image: "/images/the-keys-are-the-attack-surface-now.webp"
---
The interesting thing about the Trigger.dev disclosure is not that a platform got breached. It is what was taken, and how little the disclosure says about it.

Trigger.dev is a platform for building durable AI agents and workflows in TypeScript. Its pitch, quoted by The Register's November 2 coverage, is that agents "survive refreshes, redeploys, and crashes" — long-running tasks with retries, queues, observability, and elastic scaling. On Sunday, November 1, its CTO, Eric Allam, published a short incident notice: there had been a security incident, the exploit used in the attack had been blocked, and the company's investigation had identified "exposure across a subset of organizations." The attacker, Allam wrote, "gained unauthorized access to environment variables for these organizations." Impacted account owners had been emailed mitigation steps. Updates would follow on the status page.

That is the whole disclosure. No root cause. No entry point. No number of affected organizations, projects, or environments. No statement about which categories of variables were involved, or whether any specific value was viewed, copied, or used afterward. The Register reported on November 2 that Trigger declined to provide additional information and pointed instead to a full incident report to come. A builder reading the notice today cannot answer the one question that matters: was my key in the subset, and was it used?

## What an environment variable actually is

An environment variable is where an application keeps the secrets it needs to run: API keys, database passwords, tokens, webhook signing secrets. On an agent platform, those secrets are not incidental. They are the credentials the agent acts with. A durable agent that retries, scales, and runs without timeouts is, by design, a workload that can use a credential repeatedly, at volume, without a human watching.

That sounds like a convenience feature. It isn't. It is the blast radius.

If a stolen key belongs to an ordinary web app, the damage is bounded by what that app can do. If it belongs to a long-running agent with access to Stripe, Supabase, or Slack — the webhook integrations Trigger recently added, as The Register noted — the damage is bounded by what those connected services allow, multiplied by how long nobody notices. The platform's own virtues, retries and elastic scaling, become the attacker's virtues too: a stolen key can be exercised quietly, repeatedly, and at scale.

Trigger has not publicly identified which organizations were affected, The Register reported, though its site lists customers including Emporio Armani, GovSignals, and Cal.com. Those names are not evidence that those customers were affected. They are evidence of the class of customer that trusts a platform like this with production credentials — and of why a vague "subset" is not a useful unit of exposure.

## The contrast that matters: Northflank, two days earlier

Trigger's disclosure did not arrive in a vacuum. It arrived two days after Northflank, a cloud platform where developers deploy apps and databases and store the secrets those apps need, told its customers something much blunter. On October 30, Northflank's status page told every customer to assume that all environment variables stored on the platform had been decrypted, and to rotate everything: secrets on workloads, secret groups, and global secrets. Multiple users then confirmed, according to Northflank's own status updates, that their AI API keys had been used without permission.

Northflank's instruction was harsh, and it was usable. It told every customer exactly what to assume and exactly what to do, without waiting for a per-customer determination. Trigger's notice does the opposite: it tells affected owners they have been emailed, and tells everyone else nothing they can act on. If you were not emailed, are you safe, or merely not yet notified? The notice does not say.

The wider pattern makes the ambiguity harder to dismiss. Wiz's research, published October 30 and summarized in contemporaneous coverage, counted at least nine AI developer platforms disclosing incidents during October, with stored environment variables — especially keys granting AI access — as the common target. Wiz traced two stolen keys from one unnamed breached platform in that wave: each was first tested within about 30 minutes of the reported credential access, then, after days of near-silence, one made about 800,000 calls to Amazon's Bedrock service in about 30 hours and the other about 1.7 million in about 13 hours, together running up more than $100,000 at list price, per Wiz's estimate.

Those two keys are not Trigger.dev keys. Wiz did not name the platform they came from, and nothing in Trigger's disclosure connects them to this incident. The point of citing them is not to inflate Trigger's incident. It is to price the failure mode: a stolen AI key is not a static secret to be rotated at leisure. In the observed cases, it was tested within half an hour and then monetized at machine speed. The window between "exposed" and "abused" is measured in minutes, not in incident-report cycles.

## The self-hosting answer, and its limit

The Register's coverage closes with an escape hatch: Trigger is open source and can be self-hosted. That is true, and it is worth more than a shrug. Moving the platform in-house moves the custody of secrets in-house too, and removes one vendor's breach from your threat model.

But it does not remove the problem. A self-hosted agent platform still stores the same keys, still runs the same long-lived workloads, and still needs the same discipline: an inventory of every secret, scoped as narrowly as the provider allows, with a rotation path that revokes the old key at the issuer rather than merely editing the stored value. Deleting a key from a platform does not kill a copy an attacker already holds. Revocation has to happen where the key was issued, and provider billing logs have to be checked for unexpected activity — exactly the advice Northflank gave its customers, and exactly the advice that a "subset" disclosure makes hard to scope.

For builders, the takeaway is practical: treat every secret handed to an agent platform as already compromised the day that platform discloses an incident, whether or not you received the email. Inventory first — every key, where copies live, who issued it — then revoke at the issuer, then rotate, then check the logs. That order matters. Rotating inside the platform while the old key still works at the provider leaves the attacker holding a live credential and you holding a false sense of closure.

Trigger says a full incident report is coming. Until it arrives, the disclosure's vagueness is itself a finding: a platform built to run agents durably, at scale, without timeouts, disclosed a breach of the credentials those agents run on, and left its customers to guess at the scope. The meter here is not tokens or compute. It is the time between exposure and rotation, and every hour of ambiguity is time the other side can spend.

That is the problem.

Source: [Security Disclosure: Sunday November 1st](https://trigger.dev/blog/security-incident-nov-2026)
