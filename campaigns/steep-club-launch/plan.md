# Campaign Plan — The Steep Club Launch

Made with `/marketing:campaign-plan`. Voice: `brand/voice.md`.
**Practice lab:** every send goes to the Resend practice server (`localhost:4000`), never to real people.

> Assumptions (the owner let me choose): the dates, price, goal numbers and lead groups below are made up for the lab.

---

## 1. Campaign overview
- **Name:** *Pop the Kettle On* — The Steep Club launch
- **Summary:** Invite Kettlebird's email list to join The Steep Club, a monthly box of 3 small-batch teas, with a founding-member price for the first 2 weeks.
- **Product (made up):** The Steep Club. $24/month, 3 small-batch teas (about 15 cups each), tasting cards, cancel any time.
- **Founding offer:** $19/month for life for anyone who joins by **Mon 14 Dec 2026**. This deadline is real and stated in every email (no fake urgency).
- **Primary objective (SMART):** 120 Steep Club sign-ups from the 3 lead groups between **1 Dec and 14 Dec 2026**.
- **Secondary objectives:**
  - Average click rate of 4% or more across the 4-email sequence
  - Unsubscribe rate under 0.5% per email (the voice stays welcome, not pushy)

## 2. Target audience
**Core profile:** tea lovers aged 25–45 who are bored of the same teabag every day and treat tea as a 10-minute "me time" ritual.

There are 3 lead groups (they match `leads/leads.csv` in Step 5):

| Group slug | Who | Pain / motivation | Buying stage |
|---|---|---|---|
| `curious` | Newsletter sign-ups who have never bought | Want to explore but don't know where to start | Awareness → consideration |
| `regulars` | Bought loose-leaf tea from us 2+ times | Run out, reorder the same thing, want variety without effort | Consideration → decision |
| `gifters` | Bought a gift set in the past | Need an easy, thoughtful gift for the tea person in their life | Decision (gift subscription) |

**Where they spend time:** their inbox (morning and evening), Instagram, slow-living and food blogs.

## 3. Key messages
**Core message:** *A new tea adventure arrives every month, so your 10-minute break never gets boring.*

| Supporting message | Proof point |
|---|---|
| Something new each month, picked for you | 3 small-batch teas plus a tasting card with origin and steep time |
| No effort, no waste | Delivered monthly; skip or cancel any time from your account |
| A small ritual, not another chore | About 15 cups per tea, so roughly one new cup every day |
| Founding members get the best price | $19/month for life if you join by 14 Dec (normally $24) |

**Variations by group:**
- `curious`: "Not sure where to start? We'll pick for you."
- `regulars`: "Love your usual? Keep it, and meet two new friends each month."
- `gifters`: "A gift that keeps whistling, month after month."

## 4. Channel strategy
| Channel | Why | Format | Effort | Budget |
|---|---|---|---|---|
| **Email (primary)** | Owned list, warm audience, cheapest per conversion | 4-email launch sequence, personalized per group (12 versions) | Low–Medium | $0 (practice server) |
| Website landing page | Every CTA needs a place to land | One page: what's in the box, price, FAQ, join button | Medium | out of scope for the lab |
| Instagram (organic) | Visual unboxing and community | 3 posts plus stories during launch | Medium | nice-to-have, not built in the lab |

There is no paid spend in this lab. If a budget is added later, start with retargeting ads to site visitors who didn't open the emails.

## 5. Content calendar
| Date (2026) | Content piece | Channel | Owner / notes | Status |
|---|---|---|---|---|
| Wk of 23 Nov | Brand voice, leads, email drafts | — | Studio (Steps 3–6) | ✅ voice done |
| Wk of 23 Nov | Brand review + personalization (12 files) | — | Steps 7–8 | ⏳ |
| Fri 27 Nov | Send-guard hook + practice server tested | — | Steps 9–10, **must pass before any send** | ⏳ |
| **Tue 1 Dec** | Email 01 — *The kettle's on* (announcement + founding offer) | Email | All 3 groups | ⏳ |
| Fri 4 Dec | Email 02 — *What's in the box* (December teas + tasting card) | Email | All 3 groups | ⏳ |
| Tue 8 Dec | Email 03 — *Mina's 10-minute ritual* (founder story, social proof) | Email | All 3 groups | ⏳ |
| Sun 13 Dec | Email 04 — *Founding price ends tomorrow* (real deadline, calm tone) | Email | Non-joiners only | ⏳ |
| Mon 14 Dec | Founding offer closes | — | — | — |
| Wk of 14 Dec | Results write-up | — | `notes/` | ⏳ |

**Dependencies:**
- The landing page must be live before Email 01.
- The send-guard hook must block a test send before any practice send.
- Email 04 goes only to people who haven't joined (exit condition: joined).

## 6. Content pieces needed
| Asset | Description | Priority | When |
|---|---|---|---|
| `emails/01-the-kettles-on.md` | Announce the club and the founding price. CTA: Join | Must | by 27 Nov |
| `emails/02-whats-in-the-box.md` | December's 3 teas, tasting card, how it works | Must | by 27 Nov |
| `emails/03-minas-ritual.md` | Founder's short story about the 10-minute break | Must | by 27 Nov |
| `emails/04-founding-price-ends.md` | Honest reminder of the 14 Dec deadline | Must | by 27 Nov |
| `personalized/<group>/NN-*.md` | 3 groups × 4 emails = 12 versions | Must | by 27 Nov |
| Landing page copy | Box, price, FAQ, join | Nice-to-have (lab) | — |
| Instagram posts × 3 | Unboxing, teas, ritual | Nice-to-have | — |

## 7. Success metrics
| KPI | Target | How tracked |
|---|---|---|
| **Sign-ups (primary)** | 120 by 14 Dec | Subscription system / UTM `utm_campaign=steep-club-launch` |
| Open rate | ≥ 40% | ESP report per email per group |
| Click rate | ≥ 4% | ESP report, CTA link UTMs (`utm_content=email01-curious`, …) |
| Unsubscribe rate | < 0.5% per email | ESP report |
| Gift subscriptions | ≥ 20 (from `gifters`) | Order type = gift |

**Reporting:** a quick check after each send, and a full report on 15 Dec (`/marketing:performance-report`).
**In the lab:** "delivered" status on the practice server stands in for real metrics (Step 11).

## 8. Budget
- Media: $0 (owned email only).
- Production: studio time only.
- Contingency: if a budget appears, keep 10–15% for a retargeting test.

## 9. Risks and mitigations
| Risk | Mitigation |
|---|---|
| Email goes to a real person by mistake | PreToolUse send-guard hook: only `@resend.dev` and the owner's `MY_EMAIL`, broadcasts always blocked; practice server only |
| Copy feels salesy or makes health claims | Fresh-eyes `/marketing:brand-review` in a new session (Step 7) plus the automated review script (Step 13) |
| One message doesn't fit all groups | Personalization skill makes a version per group (Step 8) |
| Too many emails in 2 weeks → unsubscribes | 4 emails only, spaced 3–5 days apart; Email 04 only to non-joiners |

## 10. Next steps
1. Step 5: build `leads/leads.csv` with 8 fake leads in each of the 3 groups above.
2. Step 6: add email writing rules, then draft the 4 emails with `/marketing:email-sequence`.
3. Step 7: owner opens a fresh session for the brand review.
4. **Approval needed from the owner:** the founding price ($19) and the 14 Dec deadline before any copy is final.
