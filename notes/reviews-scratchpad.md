# Steep Club — Reviews Scratchpad

Analysis of `notes/reviews.jsonl` (120 fake reviews). Scratchpad only — practice data.

## Overall

| Metric | Value |
|---|---|
| Total reviews | 120 |
| Average stars | 4.05 |

### Star distribution

| Stars | Count |
|---|---|
| 5★ | 54 |
| 4★ | 36 |
| 3★ | 18 |
| 2★ | 6 |
| 1★ | 6 |

Positive (4–5★): 90 · Neutral (3★): 18 · Negative (1–2★): 12

## Average stars by group

The data is perfectly balanced — 40 reviews per group, identical averages.

| Group | Count | Avg stars |
|---|---|---|
| curious | 40 | 4.05 |
| regulars | 40 | 4.05 |
| gifters | 40 | 4.05 |

## Top themes in positive reviews (4–5★, n=90)

| # | Theme | Mentions | Example (id) |
|---|---|---|---|
| 1 | Tasting card makes steeping foolproof / "highlight of my week" | 18 | "The Nilgiri Frost was the highlight of my week. Tasting card made steeping foolproof." (R001) |
| 2 | On-time, beautifully packed box + the ritual it creates | 12 | "Exactly the little ritual I wanted. Box arrived on time and beautifully packed." (R002) |
| 3 | Easy variety / low effort — "three new teas, zero effort", now a staple | 12 | "Three new teas, zero effort. The an oolong is now a staple in my cupboard." (R004) |

Other recurring praise (12 each): great as a gift / "will renew" (R003), "really enjoyed… only wish a few more grams" (R010), "lovely selection and clear steep times" (R011).

## Top complaints in negative reviews (1–2★, n=12)

The 12 negative reviews are 6 distinct complaints, each appearing twice.

| # | Complaint | Mentions | Example (id) |
|---|---|---|---|
| 1 | Fulfillment / shipping failures (crushed, never arrived, wrong teas) | 6 | "Wrong teas sent two months running. Disappointed." (R060) |
| 2 | Billing & support (double-charged, hard to cancel, slow replies) | 4 | "Charged twice and had trouble cancelling. The Snowy Jasmine was forgettable." (R020) |
| 3 | Steeping guidance / value (card steep times off, cups weak, too little tea) | 4 | "Steep times on the card didn't match my kettle; cups came out weak." (R039) |

Complaint breakdown by exact text (2 reviews each):
- "The Nilgiri Frost tasted stale and the box arrived crushed." (R019, R079) — fulfillment
- "Box never arrived and support was slow to reply." (R040, R100) — fulfillment + support
- "Wrong teas sent two months running." (R060, R120) — fulfillment
- "Charged twice and had trouble cancelling." (R020, R080) — billing/support
- "Steep times on the card didn't match my kettle; cups came out weak." (R039, R099) — steeping
- "Not enough tea for the price. Felt thin for a monthly box." (R059, R119) — value/quantity

## Teas: most praised vs most criticised

Praise and criticism are evenly spread across the six teas, so differences are small.

| Tea | Praised (4–5★) | Criticised (1–2★) |
|---|---|---|
| Nilgiri Frost | 16 | 2 |
| Spiced Orange Rooibos | 16 | 2 |
| a sencha | 16 | 2 |
| Snowy Jasmine | 14 | 2 |
| an oolong | 14 | 2 |
| the chai | 14 | 2 |

- **Most praised (tie):** Nilgiri Frost, Spiced Orange Rooibos, a sencha — 16 positive mentions each.
- **Most criticised:** all teas tie at 2 negative mentions; no single tea stands out as the problem. Complaints are about operations, not a specific blend.

## Action items for the studio

1. **Fix fulfillment reliability (biggest pain, 6 mentions).** Audit the pick-and-pack and carrier process for crushed, missing, and wrong-tea shipments (R019, R040, R060). Add protective packaging and a per-box contents check before dispatch.
2. **Smooth out billing & cancellation (4 mentions).** Investigate the double-charge bug and make self-serve cancellation one click; set a support reply-time target so no one waits (R020, R040).
3. **Make steep guidance foolproof and confirm fill weight (4 mentions).** Give the tasting card a range plus a "stronger/weaker" tip so it works across kettles, and verify each pouch's gram weight matches the stated amount so the box doesn't feel thin (R039, R059).
