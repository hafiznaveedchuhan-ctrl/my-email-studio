---
name: personalize
description: Create per-group personalized versions of the Steep Club launch emails. Use when the user wants to tailor the 4 base emails for the curious, regulars and gifters lead groups, producing 12 files under campaigns/steep-club-launch/personalized/.
argument-hint: "[group: all | curious | regulars | gifters]"
context: fork
allowed-tools: Read, Write, Glob, Bash(mkdir:*)
---

# Personalize Steep Club emails

You run as a fork: you do NOT have the conversation history. Everything you need is below. Follow it exactly.

## What you produce
For each lead group, write a personalized copy of **every** base email:
- 3 groups × 4 emails = **12 files**
- Output path: `campaigns/steep-club-launch/personalized/<group>/<NN-name>.md`
  (same file names as the base emails).

If the argument names one group (`curious`, `regulars`, or `gifters`), do only that group (4 files).
If the argument is empty or `all`, do all three groups (12 files).

## Steps
1. `Glob campaigns/steep-club-launch/emails/*.md` and `Read` all 4 base emails. These are the source of truth for structure.
2. `Read leads/leads.csv` only to confirm the three group slugs exist (`curious`, `regulars`, `gifters`). **Do not** copy any lead's name, email, city or surname into the copy. Personalization is by group, plus the `{{first_name}}` and `{{favorite_tea}}` tokens only.
3. For each group and each email, create `campaigns/steep-club-launch/personalized/<group>/` (via `mkdir -p`) and `Write` the file.

## How to personalize (keep 95% of the base copy)
Keep the base email's frontmatter and structure. Change only:
- `audience:` → set to the group slug (`curious` / `regulars` / `gifters`).
- `cta_url:` → change the `utm_content` value from `emailNN-all` to `emailNN-<group>`.
- Add **one** group-tailored sentence near the top of the body (after the `Hi {{first_name}},` line), using the angle below. Do not add a second CTA or a second `!`.

**Group angles (from the campaign plan):**
- `curious` — never bought before. Reassure: "Not sure where to start? That's the whole point — we'll pick for you." Warm, low-pressure, welcoming a first-timer.
- `regulars` — bought loose-leaf 2+ times. Acknowledge their taste and use `{{favorite_tea}}`: "Still loving your {{favorite_tea}}? Keep it, and let us introduce two new friends each month." Because `favorite_tea` can be `unknown`, write the sentence so it still reads well — if you reference the token, keep a version that works when it's unknown (e.g. "Keep your usual, and meet two new teas each month.").
- `gifters` — bought a gift set before. Frame it as an easy, thoughtful gift: "Looking for a gift that keeps whistling? The Steep Club arrives every month, no wrapping required."

## Rules you must keep (do not break these)
- Subject stays under 45 characters, max one emoji, never ALL CAPS, no `Re:`/`Fwd:`.
- Exactly **one** CTA line (`[...→]`) per email. At most **one** `!` in the whole email.
- No health claims (detox, cure, heal, boost, immunity, superfood, miracle).
- No fake urgency (hurry, don't miss out, last chance, ACT NOW). The only deadline is the real **14 Dec 2026**.
- Offer facts must match: $24/month normally, **$19/month for life** if joined by 14 Dec, 3 teas per box, cancel any time.
- Keep the sign-off `Warmly, Mina & the Kettlebird flock 🐦` and the footer `You're getting this because you said hi to Kettlebird. Unsubscribe any time.`
- Links use only `kettlebird.example.com`.

## When done
Report: how many files you wrote, their paths, and confirm each has exactly one CTA and the group-tailored sentence.
