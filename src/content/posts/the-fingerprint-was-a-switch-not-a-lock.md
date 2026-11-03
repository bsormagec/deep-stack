---
title: "The Fingerprint Was a Switch, Not a Lock"
dek: "A USB stick sold as AES-256 encrypted held its files in plain text on an ordinary memory card. The fingerprint reader never touched the data. It only decided whether the computer could see the card at all."
date: 2026-11-03
image: "/images/the-fingerprint-was-a-switch-not-a-lock.webp"
---
The interesting thing about the Lenovo ThinkPlus FU100 is not that someone opened the case. It is that there was nothing inside worth protecting with a fingerprint in the first place.

Security researcher Xusheng Li, a developer at Vector 35, took one apart in 2025 and found a small circuit board with an ordinary SD card on it. The data on that card was not encrypted in any way, according to HackingPassion's October 29 writeup of Li's research. The fingerprint reader decided exactly one thing: whether the stick connected to the computer or stayed silent. Pop the card out, put it in any reader, and the files were yours — no finger, no password, no exploit chain required.

That sounds like a broken lock. It isn't. A broken lock still tried to lock something. The FU100's fingerprint was a gate on the USB connection, not cryptography on the data, and the box sold it as AES-256 hardware encryption, with fingerprint protection, password protection, and anti-leakage promised in its listing.

## Glue is not a patch

Li reported the flaw to Lenovo on August 2, 2025. On August 27, the temporary fix was ready: a layer of epoxy over the SD card, to make extraction harder. Lenovo's formal advisory, LEN-210545, followed on January 13, 2026, rated high severity, covering the ThinkPlus FU100, FU200, and TU800 drives and the TSD303 external SSD, with three CVEs. CVE-2025-13453 covers the physical-access read of stored data; CVE-2025-13454 lets a local, logged-in user reach sensitive device information through the configuration software; CVE-2025-13455 lets that same local user bypass device authentication and enroll a fingerprint the owner never approved.

The real fix is not a download. Lenovo asks owners to contact its service line in China, where a serial-number check decides whether the drive is replaced or upgraded on site, and advises backing up the data first and wiping the device before it goes in.

Two caveats belong up front, because they change what this story is. First, this is not a newly discovered vulnerability: the research is from 2025, the advisory from January 2026, and the news this week is the November 1 Tom's Hardware writeup and the Hacker News traction it drew — 448 points and 157 comments on the morning front page. Second, the FU100 flaw requires physical access. Nobody is reading these files over the internet. Neither Lenovo nor the researcher mentions attacks on owners, and there is no public evidence of exploitation. What failed here is a promise, not a perimeter.

## The second drive failed differently

The TSD303, Lenovo's fingerprint external SSD, is the case that stops this from being a story about one bad product. Its data actually was encrypted, on a standard M.2 SSD inside. The flaw sat in the password check. When the Lenovo program on the computer asked the drive for the password, the drive sent the correct password back over the USB cable in plain text, and the program compared it with what the user typed. Anyone who could watch that traffic, or the memory of that program, could read the password and open the drive with it.

Three months after Li's report, Lenovo sent him a fix to test. The plain password was replaced by an encrypted blob, which he first took for a hash. Tracing it back with a debugger, he found it came from SM4, a block cipher similar to AES, with a key derived from something that looked like a timestamp. In his test that key was `2021012700000000`. He fed the blob and that key into a decryption tool, and his test password came out. The program could derive the key, so anyone who took the program apart could too. A second fix, in December 2025, moved the password check onto the drive itself.

Li's slides list ten devices built on the same software kit, vendor names blacked out. Six sent the password in plain text, two stored data unencrypted on a microSD card, and two sent the password with AES encryption that still gave it away. The FU100 was not an outlier. It was the most legible example of a pattern.

## Then an agent did the opening in minutes

In October 2026, Li returned to the same category with OpenAI's Codex connected to his reverse-engineering tool, and the clock is the point. He gave it one prompt — this is a file-encryption utility, analyze its crypto system and see if it is secure — and in about seven minutes it found the fixed key in Netac's NetacFileLock tool: a fixed 32-byte AES-256 key embedded in the executable, checked separately from the password, which played no part in the key at all. The same run surfaced the password written into diagnostic logs, MD5 password checks, blocks encrypted one by one with no initialization vector so identical inputs produce identical outputs, and a fast mode that only partly encrypted files larger than 1,024 bytes.

He then pointed the same setup at two products he had never studied. KakaSoft's USB Copy Protection took about 26 minutes and six short prompts: its highest level advertises 256-bit Blowfish, but the key comes from a salt in each file and an internal password the program builds from a seed stored inside itself. The agent emulated that code, recovered the internal password, and decrypted the test file without the user's password. Nexcopy's Copy Secure drives, whose product page says protection is enforced in hardware on the flash controller, took about ten minutes and five prompts: Triple-DES protected the files, the key sat in a configuration file, the viewer opened that file with a fixed 32-byte certificate built into the app, and the password sat in the same file as plain text.

The last case is the one that earns the word backdoor, with a qualification. On SecZure's YutianDun copy-protected drive, a trace showed a login under a hidden account called `Buffer`, with the password `123456`, before the administrator password had even been typed. Behind it sat another locked copy of the secret the file key is made from, and `123456` unlocked it. A second built-in account, `System`, had the fixed password `SECZURE.COM`. On two tested drives, both accounts opened the files without the administrator password. Li calls it a backdoor from a technical perspective, and adds that this does not prove the maker meant harm. Intent is now beside the point: the accounts exist either way.

None of this is a new class of mistake. In December 2009, SySS cracked a SanDisk stick carrying a FIPS 140-2 certificate, and the CVE records from January 2010 describe SanDisk Cruzer Enterprise drives and three Kingston DataTraveler models that validated passwords in a program on the computer rather than in the drive hardware, and used a fixed 256-bit key. Sixteen years later, the same mistake ships again, and now the audit that finds it takes minutes instead of months.

## What actually protects a file

For builders, the takeaway is practical: a password that does not go into the key protects the program, not the file. Encryption that holds works the other way around. The key is derived from the password itself, through a deliberately slow function such as PBKDF2 or Argon2, so that each guess costs time. Or the check happens inside the drive's own chip, and neither the password nor the key ever leaves it. Without the password there is nothing to compare and no key to find.

Until a vendor shows that, treat the rule simply. Encrypt sensitive files yourself before they go on a stick, with software where the key comes from your own password — VeraCrypt, BitLocker To Go, or gpg, where one command derives an AES-256 key from a passphrase and the result stays closed on any machine without it. Count a fingerprint reader or a password screen on a stick as a lock on access, not on data. And assume a copy-protected stick is readable by whoever receives it, because the tools that prove otherwise now run in minutes.

The Hacker News discussion treated this less as a single bug than as a category failure, and that is the right frame. The FU100's buyer did everything the box asked: bought the encrypted model, enrolled a finger, trusted the gate. The gate was never connected to the thing it claimed to guard.

That is the problem. "Encrypted" on the box was a fingerprint gate, not cryptography — and a claim that only survives until someone opens the case is not a security feature. It is packaging.

Source: [Lenovo's 'encrypted' fingerprint USB drive is just an unencrypted SD card in a fancy case](https://www.tomshardware.com/tech-industry/cyber-security/lenovo-fingerprint-usb-stick-sold-as-aes-256-encrypted-had-a-plain-sd-card-inside-ai-assisted-follow-up-finds-a-backdoor-and-hardcoded-keys-in-other-secure-usb-products)
