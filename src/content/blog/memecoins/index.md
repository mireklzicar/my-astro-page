---
title: "Memecoins as a Vanity Fair: only 1 in 10 000 Solana tokens has a social footprint and clears a basic rug‑check"
summary: "Using on‑chain metadata for every token minted on Solana in February 2025, we show that fewer than 0.01 % of fresh meme‑coins meet even the loosest criteria for legitimacy."
date: "May 18 2025"
draft: false
category: tech
tags:
- Crypto
- Solana
- Memecoins
- Python
thumbnail: vanityfair.jpg
toc: true
---

This note tries to put numbers on a few simple questions:

* **How many tokens are minted in a single month?**
* **What share shows any sign of contact, social site or online community – a website, an email, Telagram, GitHub, X handle, Discord?**
* **How many survive a first‑pass “rug‑check” (liquidity, ownership dispersion, locked LP)?**

The exercise is deliberately narrow – Solana only, one calendar month only – and deliberately modest: I do **not** tell you which coin to ape into next.
Instead, I try to quantify just how *lottery‑like* the memecoin field has become.

![](vanityfair.jpg)

## Methodology

### Data collection

* **Token universe** – I pulled every mint event with [Dextools API](https://developer.dextools.io/) between **2025‑02‑01 00:00 UTC** and **2025‑02‑29 23:59 UTC** (≈ 756 648 unique mint addresses).
* **Social footprint** – For each address I queried `/socialInfo`. A token counts as *having socials* if **any** of the 16 supported fields (website, email, X/Twitter, Telegram, GitHub, …) is non‑empty.
* **Rug‑check** – I fed the mint address to [rugcheck.xyz](https://rugcheck.xyz/) and labelled the coin *“passes”* when **no alert of level `warn` or `danger`** was returned.

### Limitations & Reproducibility

* No attempt was made to evaluate *utility*, *road‑map*, or *fair launch* claims – the scope is purely **red‑flag hygiene**. I haven't evaluated more sophisticated schemes such as *bundling*.
* A single month of February‑2025 is analyzed to decrease API costs. It is not necessarily representative.
* The analysis ignores **copy‑minting on other chains** (Blast, Base).
* Rug‑check’s heuristics update over time; re‑running the script next year will shift numbers.
* The full python scripts and query notebooks (Python, Jupyter) and raw JSON and CSV files live in a GitHub repo I can share upon request.

## Results

### Aggregate counts

| Metric                         |  Tokens |   Share |
| ------------------------------ | ------: | ------: |
| **Total coins**       | 756 648 |   100 % |
| **With ≥ 1 social link**       |     742 |  0.10 % |
| **Pass *all* rug‑check tests** |      91 | 0.012 % |

Put differently, **only one in \~10 000 freshly minted Solana tokens both tells you who they are *and* shows no obvious technical red flags**.

### Which socials matter?

| Platform   |   Count | Percentage   |
|:-----------|--------:|:-------------|
| x/twitter    |     685 | 92.3%        |
| telegram   |     678 | 91.4%        |
| website    |     547 | 73.7%        |
| email      |     198 | 26.7%        |
| reddit     |      23 | 3.1%         |
| instagram  |      18 | 2.4%         |
| tiktok     |      17 | 2.3%         |
| github     |      15 | 2.0%         |
| discord    |      12 | 1.6%         |
| youtube    |       7 | 0.9%         |
| facebook   |       5 | 0.7%         |
| medium     |       3 | 0.4%         |

### Rug‑check alert stack

| Alert                            |   Count | Percentage   |
|:---------------------------------|--------:|:-------------|
| Low amount of LP Providers       |     572 | 29.5%        |
| Low Liquidity                    |     349 | 18.0%        |
| Single holder ownership          |     238 | 12.3%        |
| Top 10 holders high ownership    |     179 | 9.2%         |
| High ownership                   |     159 | 8.2%         |
| Mutable metadata                 |     145 | 7.5%         |
| Large Amount of LP Unlocked      |     121 | 6.2%         |
| Creator history of rugged tokens |      89 | 4.6%         |
| High holder concentration        |      24 | 1.2%         |
| Fee config enabled               |      16 | 0.8%         |
| High holder correlation          |      15 | 0.8%         |
| Copycat token                    |      13 | 0.7%         |
| Symbol Mismatch                  |       5 | 0.3%         |
| Name Mismatch                    |       4 | 0.2%         |
| Mint Authority still enabled     |       4 | 0.2%         |
| Low Amount of holders            |       3 | 0.2%         |
| Freeze Authority still enabled   |       1 | 0.1%         |


## Discussion

### 1. Socials ≠ legitimacy, but absence is a screaming red flag

A Telegram channel costs nothing; a GitHub repo can be copied in seconds.
Yet 99.9 % of tokens **don’t bother**.
That aligns with anecdotal trading heuristics – *“If it has no X handle, skip”* – shared by veteran Solana snipers.

### 2. Rug‑checks as hygiene, not due diligence

Tools such as Rugcheck, Sniperoo or DEXTools’ “honey‑pot” detector catch the *low‑hanging scams* – unlocked LP, mint authority, fee‑on‑transfer.

They do **not** protect against:

* **Bundlers / soft rugs** – devs sell liquidity gradually after building trust.
* **VC unlock cliffs** disguised as “community airdrops”.
* **Social engineering** via celebrity hacks (the \$PSYOP saga on X).

### 3. Why so many mints?

The *zero‑to‑token* cost on pump.fun fell from 6 SOL to **0.1 SOL** in January 2025, pushing the daily mint count above **280 k** at peak.
When the marginal cost of creation is \~\$10 and upside is a BONK‑like 1000×, *spam* is rational.

### 4. Half‑life and the greater‑fool problem

If a coin’s viable window is measured in *hours*, timing eclipses fundamentals.
Trading becomes a reflex game – hence the proliferation of sniper bots, bundle sniffers and real‑time Rugcheck APIs.

