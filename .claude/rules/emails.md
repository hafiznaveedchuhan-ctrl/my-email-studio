---
paths:
  - "campaigns/**/emails/**/*.md"
  - "campaigns/**/personalized/**/*.md"
---

# Email file rules

These rules load only when working on email files (see `paths:` above).

## Required structure
Every email file starts with this frontmatter:

```yaml
---
id: "01"                 # sequence number, 2 digits
name: the-kettles-on     # matches the file name
send_date: 2026-12-01
audience: all            # all | curious | regulars | gifters
subject: "..."           # sentence case, < 45 chars, max 1 emoji
preview: "..."           # 40–90 chars, adds to the subject
cta_text: "Join The Steep Club →"
cta_url: "https://kettlebird.example.com/steep-club?utm_source=email&utm_campaign=steep-club-launch&utm_content=email01-all"
---
```

Then the body in Markdown, ending with:
1. Sign-off: `Warmly, Mina & the Kettlebird flock 🐦`
2. Footer: `You're getting this because you said hi to Kettlebird. Unsubscribe any time.`

## Copy rules (from brand/voice.md)
- Body is about 150 words or less, in short paragraphs (1–3 lines).
- **Exactly one CTA.** Don't add extra links in the body.
- At most one `!` in the whole email.
- No health claims: detox, cure, heal, boost, immunity, superfood, miracle.
- No fake urgency: hurry, don't miss out, last chance, ACT NOW. The only deadline is the real one, **14 Dec 2026**.
- No `Re:` / `Fwd:` subjects, no ALL CAPS words in subjects.
- Offer facts must match the plan: $24/month normally, **$19/month for life** if joined by 14 Dec, 3 teas per box, cancel any time.

## Links
- Use only `kettlebird.example.com` URLs (a fake domain).
- Every CTA URL carries `utm_campaign=steep-club-launch` and `utm_content=emailNN-<audience>`.

## Personalization tokens
- Allowed: `{{first_name}}`, `{{favorite_tea}}`.
- `{{favorite_tea}}` can be `unknown`, so always write a sentence that still works without it.
- Never put a lead's email, city or surname in the copy.
