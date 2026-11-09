---
title: "The Agent Found the Door the Humans Walked Past"
dek: "Two researchers spent days on a firewall rule and assumed it covered everything. A model spent six hours reading the source and found the one prefix it didn't. The car opened either way."
date: 2026-11-09
image: "/images/the-agent-found-the-door-the-humans-walked-past.webp"
---

The interesting thing about the car-unlock story is not that a car app had a hole. Car apps have had holes for years. The interesting thing is that the hole was guarded by a rule two careful humans had already tested, declared solid, and walked away from — and the model did not walk away. It read the source.

Shubham Shah published the write-up on November 7, working with Sam Curry. The chain, in Australia, starts with something anyone can see: a number plate. Australian registration lookups turn a plate into a VIN, which the author is careful to say is not itself a flaw — there are legitimate reasons to want a VIN. The admin tool for the automaker's telematics platform turned the VIN into a subscriber GUID, and the GUID into the account: email, phone, full name, password hash, PIN hash. The tool was sitting on the public internet at a subdomain with "admintool" in it, and its JavaScript bundle — shipped whole to anyone who opened the login page — embedded admin credentials for the automaker's ForgeRock OpenIDM identity platform. The credentials were meant for staging. They worked in production.

That is the first lesson, and it is an old one. A secret in a client-side bundle is not a secret. It is a publication.

## The rule that looked like a wall

The second lesson is newer, and it is the one worth sitting with. The automaker had, to its credit, invested in firewall rules. Requests to `/openidm/` — the paths that reach the identity platform's sensitive APIs — came back as a hard Nginx block. The researchers respected that. They spent days trying path-traversal tricks to get around it, and they got close: a traversal through a whitelisted prefix returned an admin JWT, proof the credentials worked, but OpenIDM's routing refused to serve the endpoints through a traversed path. Every endpoint errored out. They tried another prefix, `/XUI%2f..%2fopenidm/`, and got a flat 403. Being human, they assumed that 403 applied to every prefix.

That assumption is the whole story. They handed the OpenIDM source code to GPT 5.6 Sol Ultra and let it spend about six hours on it. The model did not assume. It tried the combinations the humans had not tried, and it found that `/static%2f..%2fopenidm/` was not covered by the firewall at all. Same traversal, different prefix, no block — and this time OpenIDM routed the request cleanly.

Six hours of model time against days of human time, and the difference was not cleverness. It was thoroughness. The humans had a theory — the firewall covers the traversal — and one confirming data point. The model had no theory. It had a source tree and time.

That sounds like a story about AI finding bugs. It isn't. It is a story about what happens when the cost of being thorough collapses. A firewall rule is a claim about every possible input. Checking every possible input used to be the expensive part, the part humans skipped by reasoning about the general case. When a model can afford to check the specific cases, one by one, for six hours, the general case stops being a safe shortcut. The rule was not wrong in spirit. It was wrong in one prefix. One prefix was enough.

## The rest of the chain was already built

With the bypass, the rest fell over like a row of doors that had never been locked, only assumed shut. The researchers could PATCH a new password onto any user profile. Multi-factor authentication, the step that is supposed to catch exactly this, could be skipped entirely: the Australian environment accepted a Resource Owner Password Credentials grant, which returned a token that could be exchanged, step by step, for a session and then a mobile-app access token. No second factor ever entered the flow. Then it was a single API call — `POST /v1/remote/route/command` with `{"command": "door-unlock"}` — and the doors opened. A fifty-seven-second video shows it happening. The researchers say they tested only on cars they owned or had permission to touch.

The companion write-up Sam Curry published the same day shows the chain went further in the United States and Canada, and worse. There, the same path-confusion trick reached the Felix Web Console behind OpenIDM — with the documented default credentials, `admin:admin` — and from there the scheduler could run Groovy code inside the identity process. That is remote code execution on the production servers handling customer logins for two automakers, not just account takeover. From those servers, a valid session for any customer account, and with it the same remote access as the owner's app: location, telemetry, lock and unlock, engine start and stop.

The researchers had, in their own words, spent years finding remote-control flaws in Honda, Acura, Nissan, Infiniti, Hyundai, Genesis, Ford, Porsche, Kia, and Subaru. These two automakers were the ones they had never cracked. Now they had.

Here is the part that belongs in the same paragraph as the alarm, not after it: both automakers fixed the vulnerability within about two hours of the report and rotated the affected credentials, according to Curry's post. The names are redacted at the automakers' request — Curry writes that he would normally fight to include them, but that it is a busy time in the security world and he did not want them diverting resources over the disclosure. The Hacker News thread, which reached 558 points and 302 comments by the time of writing, spent a good share of its energy guessing the brand from the video. Guessing is all anyone outside the disclosure can do, and it misses the point. The brand does not matter. The pattern is the same at every automaker that builds its connected-car platform the same way.

## A web app with wheels

For builders, the takeaway is practical, and it is not "hire better firewall people." The firewall people did their job. The takeaway is that a connected car is a web app with wheels, and its lock is only as strong as its least-guarded endpoint.

Count the endpoints in this one chain. An admin tool on the public internet. A JavaScript bundle carrying admin credentials. An identity platform exposed to the internet at all. A password grant that skips multi-factor authentication by design. A firewall rule that covered every prefix except the one that mattered. Each one is a decision somebody made, probably for a reasonable-sounding reason: the tool needed to be reachable, the bundle needed to ship, the grant needed to exist for some client, the rule covered the prefixes anyone thought to test. Security held everywhere except the one place nobody looked. And the one place nobody looked is now exactly the place a model can afford to look.

That is the shift this story actually documents. The researchers did the hard, creative work: decompiling the app, reconstructing the API, mapping the identity flow, building the chain from plate to door. The model did the work humans are worst at: not assuming, not generalizing, not stopping at the first 403. The chain needed both. It got both, and the car opened.

There is a version of this story where the lesson is that AI makes attackers faster. That version is true and boring. The sharper version is that AI makes thoroughness cheap, and thoroughness is the thing most defenses are secretly betting you cannot afford. A WAF rule is a bet that nobody will enumerate your prefixes. A hardcoded credential is a bet that nobody will read your bundle. A skippable MFA step is a bet that nobody will walk the grant flow to its end. Every one of those bets just got cheaper to call.

The automakers fixed this one in two hours. The next chain will not be this chain. It will be a different prefix, a different bundle, a different grant — found the same way, by something that does not get tired, does not assume, and does not walk past a door just because the last one was locked.

Source: [Unlocking any car from X brand in most of the world](https://shubs.io/unlocking-any-car-from-x-brand-in-most-of-the-world/)
