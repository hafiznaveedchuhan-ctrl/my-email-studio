---
name: personalize
description: Create per-group personalized versions of a set of base marketing emails. Use when a studio needs to tailor its base emails for each lead group (e.g. curious / regulars / gifters), producing one file per group per email under a personalized/ folder.
argument-hint: "[group or 'all']"
context: fork
allowed-tools: Read, Write, Glob, Bash(mkdir:*)
---

# Personalize emails per lead group

You run as a fork: you do NOT have the conversation history. Everything you need is below.

## What you produce
For each lead group, write a personalized copy of **every** base email, keeping the file names:
- Output: `<campaign>/personalized/<group>/<NN-name>.md`
- If the argument names one group, do only that group. If empty or `all`, do every group.

## Steps
1. Find the base emails: `Glob **/emails/*.md` under the current campaign. `Read` them all — they are the source of truth for structure and frontmatter.
2. Find the lead groups: `Read` the leads file (`**/leads.csv` or similar) only to learn the group slugs. **Never** copy a lead's name, email, city or surname into the copy. Personalize by group plus any `{{token}}` the base email already uses.
3. For each group and email: `mkdir -p` the output folder, then `Write` the file.

## How to personalize (keep ~95% of the base copy)
Keep the frontmatter and structure. Change only:
- `audience:` → the group slug.
- any tracking id (e.g. `utm_content`) → swap the `all` segment for the group.
- Add **one** group-tailored sentence near the top of the body. Match the group's motivation
  (a first-timer needs reassurance; a loyal buyer wants their taste acknowledged; a gift-giver
  wants an easy gift framing). If a token like `{{favorite_tea}}` can be empty, write the sentence
  so it still reads well when the value is missing.

## Rules you must keep
- Subject within the client's length limit, sentence case, no ALL CAPS, no misleading prefix.
- Exactly **one** CTA line per email. At most **one** "!".
- No health claims. No fake urgency — the only deadline allowed is a real, stated one.
- Keep the client's sign-off and unsubscribe line unchanged.
- Offer facts (price, dates, what's included) must match the base email exactly.

## When done
Report how many files you wrote, their paths, and confirm each has exactly one CTA and the group sentence.
