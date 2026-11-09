# Steep Club Launch — Email Sequence

Made with `/marketing:email-sequence` (type: **product launch**, 4 emails over 13 days).
Copy lives in `emails/`. Voice: `brand/voice.md`. Rules: `.claude/rules/emails.md`.

## Overview
| # | Subject | Purpose | Send | CTA | Condition |
|---|---|---|---|---|---|
| 01 | The kettle's on for something new 🫖 | Announce the club and the founding price | Tue 1 Dec | Join The Steep Club → | All 3 groups |
| 02 | What's in December's box | Make it concrete: the 3 teas and the tasting card | Fri 4 Dec (+3d) | See the December box → | Not yet joined |
| 03 | My 10-minute rule for busy days | Emotional "why": the ritual, the founder story | Tue 8 Dec (+4d) | Start your ritual → | Not yet joined |
| 04 | Founding price ends tomorrow | Honest reminder of the real 14 Dec deadline | Sun 13 Dec (+5d) | Join at $19/month → | Not yet joined |

**Narrative arc:** invitation → show what's inside → why it matters → calm, real deadline.

## Subject line alternatives (for A/B)
| # | Option B | Option C |
|---|---|---|
| 01 | A new tea, every month, for you | Introducing The Steep Club 🍃 |
| 02 | Three teas we picked for December | A peek inside the box |
| 03 | Why I started Kettlebird | Ten minutes, one proper cup |
| 04 | $19/month closes Monday | Last day tomorrow for $19/month |

## Flow
```
[Lead in curious / regulars / gifters, consent=yes]
        |
   Email 01 (1 Dec) ── joined? ──Yes──> [EXIT: Converted]
        |
        No
        v
   Email 02 (4 Dec) ── joined? ──Yes──> [EXIT]
        |
        No
        v
   Email 03 (8 Dec) ── joined? ──Yes──> [EXIT]
        |
        No
        v
   Email 04 (13 Dec) ─────────────────> [EXIT: sequence complete, 14 Dec offer closes]
```

## Logic notes
- **Exit:** joined The Steep Club (any plan). They get no further launch emails.
- **Suppress:** anyone who has unsubscribed, any row without `consent=yes`, and anyone who contacted support in the last 48h.
- **No re-entry.** This is a one-time launch.
- **Per group:** the copy is personalized per group in Step 8 (`personalized/<group>/`). Timing is the same for all groups.
- **Lab:** practice sends go only to `delivered@resend.dev` (Step 11), never to lead emails.

## A/B tests
1. **Email 01 subject:** emoji vs. no emoji (option A vs. B). 50/50 split on 20% of the list, winner by open rate after 4h, then send the winner to the rest.
2. **Email 04 CTA:** "Join at $19/month →" vs. "Lock in $19/month →". Winner by click rate.
3. **Send time:** 7am vs. 7pm (the morning-cup vs. evening-ritual audience). Winner by click rate across emails 02–03.

## Benchmarks & metrics
| Metric | Target (product launch to a warm list) |
|---|---|
| Open rate | 40%+ |
| Click rate | 4%+ |
| Conversion (join) | 120 sign-ups by 14 Dec |
| Unsubscribes | < 0.5% per email |

Review after each send, with a full report on 15 Dec.
