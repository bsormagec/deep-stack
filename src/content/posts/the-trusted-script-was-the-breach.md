---
title: "178 Sites Served Malware. None of Them Was Hacked."
dek: "The Optimizely breach didn't break into a single website. It broke the one script they all trusted — and the bill landed on their visitors."
date: 2026-11-17
image: "/images/the-trusted-script-was-the-breach.webp"
---
The interesting thing about the Optimizely breach is not that 178 organisations served malware to their visitors. It is that none of them was hacked.

On 16 November 2026, visitors to some of the most visited sites — Zoom, the BBC, CNN, Salesforce, GitLab, IKEA, HSBC, Equifax, Air France-KLM, Ledger, Peacock — were served malicious JavaScript. The code did not come from those sites' servers. It came from the Optimizely Web experimentation snippet those sites load for A/B testing, served from `cdn.optimizely.com` with a valid certificate. Scott Helme of Report URI, who published the first detailed account, checked 1,611 Optimizely snippets and found 188 infected across 178 organisations. He expects the real number is higher: he could only check the snippets he found in time.

No site was breached. No site's code was touched. That is the whole story, and it is worse than a breach.

## The door was already open

Optimizely Web works by having each customer load a small JavaScript snippet from Optimizely's CDN. The snippet contains Optimizely's code, the customer's experiments, and an optional field called Project JavaScript: custom code the customer writes in their Optimizely dashboard, which runs on every page.

The attacker wrote their own code into the Project JavaScript of customer projects, and the rest of each snippet was untouched. The file was still served from `cdn.optimizely.com`, with Optimizely's certificate, from a host that every affected site already trusted. Optimizely's own sites carried it too — the snippets for `www.optimizely.com` and `login.optimizely.com` both had the code.

The loader came in three versions. A plain script tag pointing at `https://1688360.cc/track.js`. The same URL hidden in base64 with `atob()`, so a search for the domain would not find it — Smartsheet's snippet was cleaned at one point and then re-infected with this version, which means whoever wrote the code still had access. And a full inline copy of the payload, which runs through `eval` if the attacker's domain is blocked. The payload was rebuilt 26 times during the day.

The first injection was seen at 04:21 UTC on 16 November, in the BBC's snippet. Zoom's snippet was modified at 11:20. Most of the clean-up happened between roughly 20:40 and 21:10 UTC; by 21:52 only one of the 188 snippets was still infected, and Optimizely's own later account puts the last clean-up at 23:11 UTC. Some sites served malware to their visitors for almost nineteen hours.

How the attacker got write access was unknown when Report URI published. Optimizely has since said — on its status page at 01:02 UTC on 17 November, and to BleepingComputer — that an unauthorised party exploited a vulnerability in the Experimentation account signup flow, and used it to add malicious JavaScript to customer projects. The company says it fixed the vulnerability, removed the injected code, ended sessions, revoked tokens, reset access for affected accounts, and blocked the code at Cloudflare. It has published no postmortem, no count of affected projects, and no technical description of the flaw — or how a signup flow led to write access on existing customers' projects. The entry point is now named in outline. It is not explained.

## One script, four thefts

Every visitor received the same script, with every part active at once. What a visitor experienced depended on their device and what they did on the page.

First, crypto address swapping. The script finds any valid wallet address — Bitcoin, Ethereum and EVM chains, TRON, Solana, TON, Litecoin, Bitcoin Cash, Dogecoin — and replaces it with one of the attacker's. It validates checksums, so it only swaps real addresses. It swaps them in page text, form fields, links and images, in the clipboard, in outgoing `fetch` and XHR requests, in `window.open` and navigation, and in the iOS share sheet — re-scanning the page whenever it changes. Copy an address from an affected page, or from anywhere else while that tab is open, and you may paste the attacker's.

Second, card skimming, added at 13:43 UTC. The script watches form submissions and every `fetch` or XHR POST for a Luhn-checked card number plus expiry date and CVV, and sends all three to the attacker's server with `navigator.sendBeacon`. Cards entered in hosted payment iframes, Stripe or Adyen and similar, were out of its reach. Cards typed into a site's own form fields were not.

Third, cookie and screenshot theft: when the script swaps an address next to wallet or payment wording, it sends the page URL, the site's non-`HttpOnly` cookies, the original addresses, and an html2canvas screenshot of the page to the attacker's server.

Fourth, on iPhones and iPads, the Coruna and DarkSword iOS exploit kits in a hidden iframe — Coruna for iOS 13 to 17, DarkSword for 18.x. Pages on iOS 18.6 or earlier reloaded every 60 seconds to retry the exploit. The kit's own comments say iOS 18.7.3 and later, and 26.3 and later, are patched — the kit's claim, not an Apple confirmation.

As of 19:25 UTC on 16 November, about $7,040 had reached the attacker's wallets — 0.083 BTC, 17 LTC, 663 USDT plus 184 TRX, 0.055 ETH, 82 USDT — swept out to exchanges at 13:03 to 13:05 UTC. That figure is only what reached the four wallets Report URI tracked, not total harm. How many cards or cookies reached the attacker's server is unknown. The TRON wallet has been in use since March 2026, so this actor was active long before this campaign. Nor was the Optimizely wave the first: from 13 to 16 November the same actor injected `webshell.lol/get.js` through Kissmetrics, StorifyMe and Minute Media scripts on other sites.

## The defence that worked, and the one that didn't

Report URI crawled 256 of the affected organisations' own hosts and evaluated their Content Security Policy against what the payload needs — the most useful numbers in the whole incident.

Sixty-eight had no CSP at all. Fifty had one that allowed the payload and the theft. Seventeen had one where the payload ran but `connect-src` blocked the data theft — the address swapping still worked, because that happens inside the page. Twenty-four, fifteen percent, blocked the payload outright.

Allowing `cdn.optimizely.com` was never going to help — the malicious code arrived from the trusted host itself. What separated the 24 was a restrictive `script-src`: a site that lists only the hosts it needs blocks `1688360.cc`. Two common settings let the attack straight through. `'strict-dynamic'` means any script the trusted Optimizely snippet inserts is trusted too. And `'unsafe-eval'` — which Optimizely's own documentation tells customers to allow — let the inline fallback run even where `track.js` was blocked. That is what happened at HSBC: its CSP blocked `track.js` and the data theft, but the inline copy still ran through `eval`.

`connect-src` matters too: the seventeen partial sites blocked card, cookie and screenshot theft by restricting where the page can send data. That does not stop address swapping, which happens inside the page — but it stops the part of the attack that phones home.

## The trusted script is the attack surface

The Hacker News thread ran to 647 points and 256 comments within a day. Every affected site had done the thing security advice tells you to do: load a script from a reputable vendor over a valid certificate. The vendor was the breach.

For builders, the takeaway is practical: a third-party script is not a dependency you pinned. It is a live feed of someone else's code into your visitors' browsers, running with your site's full authority, and it can change without your deploy. Restrict `script-src` to the hosts you actually need, and do not hand a vendor loader `'strict-dynamic'` or `'unsafe-eval'` unless you have verified what it inserts. Restrict `connect-src` so a compromised script cannot phone home even if it runs. Watch your snippets the way you watch your own code: hash them, alert when the fingerprint changes, and check the custom-code fields — Project JavaScript, experiment code, any field that executes — for scripts you did not write. If your site uses Optimizely Web, open every project's Project JavaScript and look for `1688360.cc`, `atob(`, and anything you did not put there; review who has write access and rotate credentials; treat cards entered on 16 November as potentially exposed. If you visited an affected site that day, update your iPhone or iPad, check any crypto transfer, and watch your card statements.

Report URI sells CSP and integrity monitoring, so its counts have no independent verification yet, and the real number is likely higher than 178. But the mechanism does not depend on its counts. One field, in one vendor's dashboard, reached 178 organisations' visitors, and the only sites that stopped it were the ones that had already decided not to trust a script just because of where it came from.

The sites did nothing wrong, and their visitors paid anyway. That is the problem.

Source: [World's Largest Brands Infected With Malware Via Optimizely](https://blog.report-uri.com/worlds-largest-brands-infected-with-malware-via-optimizely/)
