---
title: "The Cache Was Smaller Than the Window"
dek: "Cloudflare's GLM-5.3 leak was not a model failure. It was a sizing mismatch, a lying status signal, and a test suite that never read the answer."
date: 2026-10-27
image: "/images/the-cache-was-smaller-than-the-window.webp"
---
The interesting thing about Cloudflare's GLM-5.3 exposure is not the count of 155 leaked responses. It is that every part of the system behaved as if it were working. The request returned HTTP 200. The reply was coherent. The token count matched the long prompt. And inside that clean-looking answer sat fragments of somebody else's session.

Cloudflare published the full postmortem on October 26, 2026, as a coordinated disclosure with SGLang, the open-source inference engine behind the leak. The incident ran August 27 to September 9, 2026, and was fixed the day it was confirmed. The disclosure is worth reading closely: the failure mode is not specific to Cloudflare. It lives in the plumbing every hosted inference provider now shares.

## The mismatch nobody checked

GLM-5.3, a text model from Z.ai built for agentic coding, went live on Cloudflare's Workers AI on August 27 with an advertised context window of 1,048,576 tokens. The KV cache pool on its prefill GPUs, the memory that holds the attention keys and values for a prompt, held only 681,280 tokens. Those two numbers are set in different places, and nothing in the system forced them to agree. Cloudflare says it knew about the mismatch before launch. It expected the engine to reject any prompt it could not process, and its pre-launch tests returned successful responses, so the mismatch did not look like a problem.

That assumption is the first failure, and it is the most ordinary one in this story. A context window is a promise printed on a product page. A KV pool is a quantity sized at engine startup from whatever GPU memory remains after the model weights load. Cloudflare's postmortem puts the point bluntly: the pool size is not a configuration value, and the advertised context length is a separate configuration value. Checking that they agree was, in Cloudflare's own words, its job. It checked the response code instead.

For builders, the takeaway is practical: a context window you have not verified against the serving stack is a claim, not a capability. If you run long-context workloads through a hosted model, the question to ask is not how many tokens the page advertises. It is how many tokens the prefill pool actually holds, and what the engine does when a prompt crosses that line.

## How one token became somebody else's prompt

The second failure turned a sizing error into a tenant-isolation breach. Workers AI serves GLM-5.3 with SGLang in a disaggregated configuration: prefill GPUs process the prompt and produce its KV cache, then hand that cache over remote direct memory access to a separate pool of decode GPUs that generate the response. When a prompt exceeded the 681,280-token pool, SGLang's scheduler rejected it, recorded the error, and swapped the prompt for a one-token placeholder so the request could drain through the batch machinery without allocating real memory.

On a single-node deployment, that trick works: the placeholder runs, the batch finishes, and the client receives an error. In disaggregated mode it did not, because the admission queues on both sides checked whether a request was finished, not whether it was rejected. A rejected request reported itself as live. So prefill ran its trivial one-token forward pass, sent one page of KV cache to decode, and signaled transfer complete. Decode had reserved pages for the full prompt, believed the transfer covered all of them, and started generating. Only the first page had been written by this request. The rest still held whatever earlier requests had left behind, because KV pages are not zeroed between requests — a common performance choice that is safe only if page ownership is tracked exactly.

That sounds like a subtle engine bug. It isn't. It is a status signal lying at the exact boundary where two machines trust each other. Decode never learned the request had been rejected, because the signal it checked — finished or not — could not express rejected. The reply that came back was fast, coherent, and wrong in the worst possible way: it contained data from other customers' GLM-5.3 sessions. All 155 affected responses, Cloudflare reports, went to prompts longer than 681,280 tokens. No other Workers AI model was affected, because every other disaggregated deployment had KV pools larger than its context length on both prefill and decode, so no request could reach the rejection path.

The Hacker News discussion, 112 points and 37 comments at fetch, focused on the same uncomfortable detail: the bug had been reported to SGLang as issue #30233 on July 6, 2026, weeks before GLM-5.3 launched. A public report, a known failure path, and a deployment that walked straight into it because the two sides of the system never reconciled their numbers.

## Why 200 is the wrong test

Cloudflare is unusually candid about its own testing gap, and that candor is the most useful part of the postmortem. Its long-context tests validated HTTP response codes and engine performance. They did not validate model output and coherence. A cache that silently serves someone else's data still returns 200, still streams, and still looks fast — faster, in fact, than a real long prefill should, because almost no prefill actually happened.

This is a test-design lesson that generalizes far beyond inference. Any service with a documented maximum input size needs at least one check that inspects response content near that maximum, not just the status code and the stream. Cloudflare now checks KV pool size against context length directly, from the running engine, before any disaggregated deployment change ships, rather than inferring it from response codes. It also patched the engine so a request carrying a pending rejection is retired at the admission queue, with its original error, before any bootstrap, allocation, or transfer happens, and it expanded the GLM-5.3 prefill pool to about 2.04 million tokens — roughly twice the context length — so a valid request can never reach the rejection path at all.

The response timeline, all from Cloudflare's postmortem, is fast once the report landed. Security researcher Gadi Evron of Knostic reported the issue through HackerOne at 23:11 UTC on September 8. Cloudflare began verifying the next morning, reproduced the leak with two independent accounts within 25 minutes, declared an incident at 13:22 UTC on September 9, set the model private at 14:00, and restored it at 19:40 the same day after deploying the corrected configuration and a patched engine, validated against the researcher's reproduction script. Cloudflare says the affected traffic matched ordinary long-context use in timing and volume, and that it found no evidence of deliberate exploitation. That caveat matters: this is Cloudflare's self-report, and absence of evidence is not proof nobody noticed. But the shape — a 681,280-token threshold, a small number of customers, 155 responses — fits a bug firing only on very long prompts, not a systematic harvest.

The upstream fix is now complete in SGLang v0.5.22, released October 19, 2026, which bundles the admission fix with KV transfer checksums and deferred release by default. Cloudflare recommends all SGLang operators update to v0.5.22 or later. If you self-host SGLang in disaggregated mode, that recommendation is not optional reading. The same rejection path existed for every operator running an older build; Cloudflare was simply the deployment where the pool was smaller than the window.

## What builders should actually check

Shared KV caching is the cost lever that makes long-context inference affordable. Prefix caching, disaggregated prefill and decode, page reuse without zeroing — these are not exotic optimizations anymore. They are how the bill stays low. This incident shows what that lever costs when ownership tracking slips: the cache becomes a channel between tenants, and the channel is invisible to every test that only watches status codes.

So the checklist is short, and it is not about trusting one provider more. First, verify pool size against context length on the running engine, not on the product page. Second, test at and above the maximum with content checks: send a long prompt whose correct answer you know, and read the answer. Third, treat any "transfer complete" or "finished" signal as a claim to be verified against tokens transferred, not as proof of completion — Cloudflare's own fix now has decode verify that the number of tokens transferred matches the number it reserved. Fourth, pin and patch the engine version: if you run SGLang, v0.5.22 is the floor, not the aspiration.

The cache was smaller than the window. That is a configuration error a spreadsheet could have caught. The reason it became a leak is that nobody read the answer until a researcher did, and the system reported success all the way down. That is the problem.

Source: [Cross-request KV cache exposure in the GLM-5.3 Workers AI model, and our remediation with SGLang](https://blog.cloudflare.com/kv-cache-exposure-remediation/)
