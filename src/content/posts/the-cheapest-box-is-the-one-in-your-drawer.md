---
title: "The Cheapest Box Is the One in Your Drawer"
dek: "A builder priced out a Raspberry Pi camera rig part by part, then looked at the used phone on his desk. The phone already had everything on the list."
date: 2026-11-14
image: "/images/the-cheapest-box-is-the-one-in-your-drawer.webp"
---
The interesting thing about the parts list is not the total. It is the shape of it.

A builder needed a high-resolution camera, GPS, storage, and a microcontroller to drive some lights. The obvious move was a Raspberry Pi 4 with an Arducam 64MP camera and a GPS module. Then every addition grew the bill: a Pi 4 with 4GB of RAM at ¥880, the camera at roughly ¥400, a GPS HAT at ¥153, a 64GB microSD card at ¥50. The core total came to about ¥1,483 — around $222 at the author's November 10 conversion rates. Add a real-time clock, a battery backup, a touchscreen, and a 4G modem, and the fully equipped total reached roughly ¥2,317, about $347, before batteries.

The alternative sitting on his desk was a used Redmi 13C 5G or a Huawei Mate 30 5G, second-hand on Taobao for ¥300–500 — $45 to $75. The Redmi shoots 50MP JPEGs. The Mate 30 has a 40MP main camera and a telephoto lens. Both already contain GPS, storage, a clock, a battery, mobile data, and a touchscreen. Their USB-C ports give him a route to the PCB that will handle the lights.

That is the whole comparison. The phone is not cheaper by a little. The core build costs three to five times as much, and the fully equipped build costs five to seven times as much — and the phone still wins on parts the Pi list does not even price, like the 5G modem. The Pi's cellular HAT is 4G; the phones are 5G.

## The bill grows one HAT at a time

This is the part worth sitting with, because it is not really about phones or Raspberry Pis. It is about what a parts list does to a project.

Every component on the Pi side is individually reasonable. ¥880 for a computer is fine. ¥400 for a camera is fine. ¥153 for GPS is fine. Nothing on the list is a rip-off. But a general-purpose board is a platform for buying peripherals, and each peripheral is a separate purchase, a separate shipment, a separate point of failure, and a separate line in the budget. The camera needs a cable. The GPS needs a HAT. The battery needs a HAT and cells. The screen needs a HAT. The modem needs a HAT.

A phone is the opposite shape. It was manufactured in the hundreds of millions, which means its bill of materials was negotiated at a scale no hobbyist build will ever see, and its parts were integrated by a company whose entire business was making the integration disappear. You do not buy a phone's camera, GPS, battery, screen, and modem. You buy a phone, and they are already inside it, already wired together, already tested against each other.

That is why the comparison is so lopsided. It is not that the Pi is overpriced. It is that the phone's price was set by a different market — the second-hand market for a mass-manufactured device — while the Pi's price is the sum of retail parts bought one at a time. A used phone is the cheapest way to buy a bundle of sensors that were never sold separately.

## The phone is already a computer. Treat it like one.

The author is not just theorizing. He has unlocked and rooted the Redmi, tested its camera, and got it sleeping and waking for scheduled work. He plugs it into his computer and has Codex configure and test the pieces he needs. The Huawei is harder to root, but it still runs a kiosk app. He has built a stand to photograph the same target with the Redmi and the Arducam side by side, because a 50MP JPEG file does not, by itself, settle which camera captures more detail. That test is the honest move: megapixels are a spec, and specs are not measurements.

The project itself is a camera, GPS, and light-controller rig — not a local AI inference box, and it would be dishonest to present it as one. No model runs here, no tokens are billed. But the pattern is the same one this column keeps finding in the inference world: the cheapest hardware is the hardware somebody already manufactured at scale and somebody else already owns. The A100 was already inside the mining card. The 145B model already fit on the laptop. Now the camera rig is already inside the phone in the drawer.

The author is also trying an ESP32-P4 board, which gets its own post. That is the right instinct — the phone is not the only second life worth checking. But the phone has one advantage the ESP32 does not: it arrives as a finished system. Screen, battery, modem, storage, and clock are not a shopping list. They are the device.

## The catch is supply, not specs

The open question is the one the author names himself. Finding two good used phones is easy. Finding a few hundred matching ones, with healthy batteries and predictable camera behavior, would take more work. He says he feels increasingly confident it is possible, and that is a fair read — but it is also the difference between a project and a product. A one-off rig can tolerate a phone with a tired battery. A fleet of installations cannot.

That matters because the use case he sketches beyond this project is a fleet: digital artworks and installations, where the team has often used a Pi or a Mac mini. Imagine instead posting a client a configured phone. Plug it into the display and it runs. With mobile data and remote access, he can fix something without asking a gallery for Wi-Fi privileges or an open port. That is a genuinely better deployment shape than a Pi in a case — no gallery network negotiation, no separate modem, no UPS HAT.

But it only works if the phones are consistent. A gallery installation that behaves differently because one unit's camera module or battery differs from another's is a support problem, not a saving. The supply question is the whole ballgame for anything beyond the first few units, and the author is right not to wave it away.

The Hacker News discussion, which pushed the post to the top of the front page with 448 points and 262 comments by Saturday evening, mostly circled the same point: the comparison is striking, and the supply caveat is real. Both can be true. A parts list that grows by ¥150 at a time is a tax on building, and a used phone dodges the tax — for as many units as you can source reliably.

For builders, the takeaway is practical: before pricing a build from parts, price it from the second-hand market for finished devices. The computer you need may already exist, already assembled, already tested, at a fifth of the price, in a drawer. The question is not whether the phone can do the job. It is whether you can find enough of the same phone to do it twice.

Source: [Why get an expensive Pi when I have an old phone?](https://so.long.thanks.fish/why-pi-when-i-have-an-old-phone/)
