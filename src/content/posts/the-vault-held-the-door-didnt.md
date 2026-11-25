---
title: "The Vault Held. The Door Didn't."
dek: "1Password's November breach never touched a vault. It didn't have to — one employee's GitHub account was a deploy pipeline, and the company still won't say how the code got past review."
date: 2026-11-25
image: "/images/the-vault-held-the-door-didnt.webp"
---

The interesting thing about the 1Password breach is not that it happened. It is that it happened to the one company whose entire pitch is that a breach of its servers cannot hurt you — and the pitch survived. The vaults held. The door didn't.

On November 19, 2026, 1Password began investigating indications that an attacker had gained access to an employee's corporate GitHub account. That is the whole attack, in one sentence, and it is worth reading twice. The attacker used the account to access source code and push malicious code to backend services. The malicious code downloaded administrative data about customers: names and email addresses, account identifiers, account creation and last sign-in times, public keys, Secure Remote Password protocol parameters, and the tokens inside emailed links for invitations, provisioning, and recovery. Customer vault contents, the company says, were never accessed.

The story hit the top of Hacker News within hours — 722 points and 296 comments by the evening of November 25, the day 1Password published its update — and the thread's first instinct was the right one. The top comment quoted the company's own sentence back at it, then asked the obvious question: interesting that there is no code review in place and the attacker could just deploy something.

## What held, and why

Start with what survived, because it is the part 1Password designed for. A 1Password vault is encrypted with keys that only the user holds. The account password and the Secret Key — a long random key generated on the user's device — combine to produce the encryption key, and 1Password never stores either one.

It is the architecture, and this incident is the first time it has been tested at this scale. The attacker had source code. The attacker had CI/CD access, with its infrastructure secrets. The attacker had the backend. And still, per 1Password, no vault was touched, because there is no query, no credential, and no server-side key that opens one. As one Hacker News commenter put it, you were never going to be one SQL query away from vault plaintext at 1Password. The design assumes the servers are already lost, and it held.

## What didn't hold

The part that failed was not cryptography. It was identity — one employee's GitHub account, and what that identity was allowed to do. A corporate GitHub account that can push code to backend services is not a developer account. It is a deploy pipeline with a human attached. When that account is compromised, the attacker does not need to find a vulnerability in your backend; they are handed the mechanism that ships to it.

This is the question 1Password has not answered, and it is the question the Hacker News thread spent most of its energy on. How does one compromised account push malicious code to production backend services? The company's update says it disabled the affected GitHub account, revoked the stolen token, removed the access the attacker created, rotated or revoked all internal credentials that may have been exposed, and tightened internal GitHub, CI/CD, and endpoint controls. It does not say how the account was compromised in the first place — phishing, a stolen token, a session cookie, something else — or how the push got past whatever review existed.

The thread's working theory is that the review existed and was bypassable. GitHub branch protection can be set up so nothing merges without review and passing tests, but an admin can disable the protection, and a ruleset that allows admins to merge without review is a ruleset that lets one compromised account ship anything. One commenter listed the bypasses from memory: agent-generated pull requests approved by the agent's own account, old approved pull requests amended after approval, GitHub Apps with write access approving their own changes, org admins disabling a ruleset, merging, and re-enabling it before anyone notices. There are multiple ways to get it wrong in GitHub, the commenter wrote, and most people are not aware of these tradeoffs. The attacker found one of them, or 1Password's setup had none of them and the account simply had the run of the place. Either way, the control between a stolen credential and production code did not stand.

## The six-digit tell

The most revealing detail in the update is the smallest one. The tokens in emailed invitation and recovery links were among the data downloaded. 1Password says only a small number of users were in that state, and says those users were specifically notified. It also says the token alone cannot get access to an account — it needs to be combined with an SSO sign-in or a six-digit code sent to the user's registered email address. Then, in the same paragraph, it says the code has been lengthened from six numeric digits to ten alphanumeric characters, because that makes brute-force guessing practically impossible.

The old code was six numeric digits — one million possibilities. The fix is honest about what it implies: the margin was thin enough that the company moved it the moment the tokens were in someone else's hands. Six digits was the kind of number you choose when you assume the token stays secret. Ten alphanumeric characters is the kind you choose when you have learned it might not.

## The second attack is the phishing wave

Here is the part that should worry you more than the breach itself. What the attacker actually took — names, email addresses, account creation and last sign-in times, the knowledge of exactly who is a 1Password customer — is the raw material for the next attack, and the next attack does not need to touch 1Password's servers at all. A phishing email that knows your name, knows you use 1Password, and mentions an invitation or an account recovery is a materially better phish than a generic one. 1Password's own advice in the update is exactly this: be cautious about phishing attempts in the form of unexpected emails, texts, or calls that mention 1Password, invitations, or account recovery attempts.

This is the pattern of the last two years of supply-chain incidents: the breach is the headline, the phishing wave is the bill. The Optimizely compromise served malware to 178 organisations' visitors without hacking any of them; the uBlock Origin flaw turned the tool that blocks code into a way to run it. In each case the trusted thing became the delivery mechanism. Here the trusted thing is the password manager itself, and what it delivered to the attacker was a customer list with metadata attached.

There is one more uncomfortable detail. 1Password disclosed a separate security incident in October 2023, linked to the Okta breach. The company says this one is different, and on the facts it is — a compromised GitHub account, not a compromised identity provider. But the shape is the same: the company's own infrastructure, reached through a third party's door.

## For builders, the takeaway is practical

If you run a service, grade yourself against this incident in an afternoon. First: can one compromised developer account push code to your production backend? If the answer is yes — through admin bypass, through a GitHub App, through a ruleset an org admin can toggle off and on — then you have the same hole, and your code review is a process document, not a control. Branch protection that an admin can disable unilaterally is a speed bump. It needs to be a control that survives the compromise of the people who administer it, or it is not a control at all.

Second: what does your architecture assume is already lost? 1Password's vaults survived because the design assumes the servers are lost. That is the only reason this incident is a story about metadata and phishing instead of a story about every password its customers own. If your system has a query, a credential, or a key that opens everything, then your incident response plan is a hope, not a plan.

Third: count the tokens. Invitation and recovery links, API keys in email, six-digit codes that assume the other half of the secret stays secret — these are the quiet margins in every system, and they only get measured after someone else has them. 1Password measured theirs in public and moved it to ten alphanumeric characters. That is the right response.

The vault held. That is genuinely good news, and it is worth saying so, because the architecture earned it. But the door was a GitHub account, and the code walked through it, and the company still has not said how. Until it does, the interesting thing about this breach is not the vault. It is the deploy pipeline — the one part of the system that trusted a single human, and got exactly what that trust was worth.

Source: [Update on a security incident involving 1Password's backend systems](https://1password.com/blog/update-on-nov-2026-security-incident)
