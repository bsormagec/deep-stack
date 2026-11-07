---
title: "The Sandbox Wall Was a Checksum Function"
dek: "A guest VM escaped Firecracker and ran code as root on the host. The bug was never in the hypervisor. It was in the Linux kernel's IPv4 checksum code — the shared layer underneath every tenant."
date: 2026-11-07
image: "/images/the-sandbox-wall-was-a-checksum-function.webp"
---

The interesting thing about PwnEscape Part 2 is not that a virtual machine escaped. It is that the wall it escaped through was never the wall anyone was watching.

Firecracker is the microVM that keeps untrusted code in a box. It is the isolation layer under serverless sandboxes — Vercel Sandbox runs each tenant's code in its own Firecracker microVM on bare-metal EC2 hosts, and the same design sits behind much of the rented compute that inference workloads run on. The promise is simple: your code runs inside the VM, the host stays outside it. Paulos Yibelo of pwn.ai, publishing the second half of the PwnEscape research on November 6, showed the promise resting on something else entirely: a checksum function in the Linux kernel's networking stack, shared by every tenant on the machine.

## How eight bytes crossed the boundary

The chain is precise, and its precision is the point. Part 1 of the research had already established the host-memory primitive: a defect in the kernel's IPv4 checksum handling, tracked as CVE-2026-99999 and rated 9.3 out of 10, lets code inside a guest read memory on the host. Part 2 turns that read into control.

First the guest plants a recognizable byte pattern, a nonce, in one of its own pages, then walks the Extended Page Tables to translate that page's guest address into its host physical address. From there it works backward through the host's page tables to recover the Firecracker process itself — its page table root, its executable image under ASLR, its load bias. Then it searches host memory for the one frame that matters: the saved register state, the pt_regs structure, of the vCPU thread currently sitting inside the KVM_RUN ioctl, waiting for the guest to do something.

That frame is the whole attack. While the thread waits in KVM_RUN, the kernel holds its userspace registers — instruction pointer, stack pointer, arguments — in memory the guest can now reach. Yibelo's team rewrote the frame so that when the thread returned from KVM_RUN, it did not resume Firecracker's normal path. It entered Firecracker's own write(2) wrapper with three arguments: file descriptor 2, a pointer to an eight-byte string, and a length of eight. A single write to the guest's serial port triggered the return. The marker — `N8V23M2` plus a newline — appeared on Firecracker's stderr. A short return sequence cleared the return value to zero, execution rejoined Firecracker's original path, and the helper restored the three stack words it had borrowed. Firecracker kept running. The guest stayed up, SSH responsive, uptime past 1,600 seconds. The host process, PID 2936, was alive and had just executed the guest's chosen call with its own privileges.

The chosen call was deliberately small. An eight-byte marker to stderr is not a shell, and the researchers say so themselves. But the marker is a receipt for something larger: the guest selected the host thread's instruction pointer, its arguments, its stack, and its return path. Whatever call fits in that frame is a call the guest can make.

## The catch, stated plainly

Three caveats belong in the first paragraph of any honest account, not the last. First, the bug is in the Linux kernel's networking code, not in Firecracker. Firecracker was the vehicle, not the vulnerability. Second, the demonstrated configuration ran without a jailer, launched directly as root under systemd-run. Firecracker's production containment — privilege dropping, namespaces, seccomp — was not in the path, and the researchers state plainly that a jailed deployment needs a separate assessment of what privileges and resources remain after the VMM is compromised. Third, the proof was a controlled marker write in the researchers' own lab. No interactive root shell, no claim of root command execution in any vendor's production environment, and no evidence of exploitation in the wild.

The Hacker News discussion, which ran to 109 comments on a post that reached 248 points on November 7, fought over exactly this line. One commenter called the unjailed configuration "like setting your password to password." Thomas Ptacek, who has spent years in this argument, answered that getting code execution behind the jailer is still effectively game over — a higher degree of difficulty, not a different outcome — and noted that more than one cloud provider panic-bounced its fleet in response. Another commenter, monocasa, pointed at the proof-of-concept code itself: it starts from host physical addresses passed in as arguments, and reads host memory through /dev/mem, which is not something a real guest gets to do. The novel part of the chain — how the guest actually reaches those addresses — is the part the writeup describes and the PoC assumes. That is a fair criticism of the demonstration, and it does not touch the bug. The bug is real, the fix is merged, and the fleets moved.

## The fix exists. The reboot is the bill.

The upstream fix is a single kernel commit, 6785011f8b16 — "ipv4: validate checksum_start before completing checksum" — merged into mainline on October 14 and backported across the stable trees, from 5.10.272 through 7.2.11. A one-commit fix sounds cheap. It is not, because a kernel fix is only a fix after every host reboots into it, and the hosts in question run other people's code for a living.

Fly.io published its postmortem on November 6: an emergency fleet-wide host reboot that took about ten hours, with advice to rotate any credentials sent over HTTP or unencrypted 6PN between October 15 and 17. Vercel, whose $1 million Sandbox challenge surfaced the flaw in the first place, confirmed the memory leak was demonstrated against its production sandboxes — and also confirmed no report showed anyone reading a customer's files, secrets, or application data. An independent Trail of Bits review concluded Vercel's virtualization boundary is architecturally sound. The boundary held where it was designed to hold. The kernel underneath it did not.

That is the shape of the cost here. The vulnerability is a line of kernel code. The remediation is a fleet-wide reboot, a credential rotation window, and a postmortem. The meter does not run on the bug. It runs on the patching.

## The discovery cost collapsed first

There is a second story inside this one, and it is the one that will repeat. Yibelo's team says it found the flaw in three days using its own AI-assisted research system, with GPT-5.6 Sol as the primary reasoning engine and human researchers directing the work. The challenge that surfaced it — Vercel's two-week, $1 million Sandbox challenge in August — paid out $242,000 across 1,285 reports.

Meanwhile, OpenAI's own report, "A Thousand Fewer Paths to Root," describes a pipeline that produced 948 working Linux local-privilege-escalation exploits in a single 30-hour run in mid-October, at $1,213,430 in API credits — about $1,279 per exploit — reproducing 1,724 vulnerabilities from 2,308 candidates. The numbers are OpenAI's own, and the run was a research exercise, not a product. But the direction is unmistakable: finding kernel bugs used to be the expensive part, measured in researcher-months. It is becoming the cheap part, measured in API credits.

That changes what the bottleneck is. The kernel is a shared layer under every tenant, every sandbox, every rented inference endpoint. If the discovery cost falls to a thousand dollars a bug while the remediation cost stays at a fleet-wide reboot and a credential rotation, then the limiting factor in cloud security is no longer finding the holes. It is patching them faster than they are found — and patching a shared kernel means taking down the machines that other people's code is running on.

For builders, the takeaway is practical: if you run untrusted code in microVMs — your own sandbox, a hosted one, an agent harness that executes model-written code — your isolation is only as current as your host kernel, not as strong as your VMM's marketing page. Check the host kernel version against the fixed stables. Check whether your Firecracker deployment actually runs under the jailer, with privileges dropped and seccomp on, because the demo that escaped it did not. And if your workloads ran on an affected host in mid-October, treat the credential-rotation advice the way Fly.io meant it: as a bill that has already come due.

The sandbox did not fail. The kernel underneath it did, and the kernel is the part nobody rents separately. That is the problem.

Source: [Firecracker VM Escape: PwnEscape Part 2](https://pwn.ai/blog/firecracker-escape)
