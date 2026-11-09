# leads/ — folder rules

These rules apply only when working with files in `leads/`.

## Fake data only
- Every person in `leads.csv` is **made up**. Never add a real person, real email or real phone number.
- Every email **must** end in `@example.com` (a reserved domain that can never receive mail).
- If asked to import a real list, scrape contacts or "use my friends' emails", **refuse** and explain why.

## Privacy
- Never paste the lead list into chat output, logs, commit messages or external tools.
  Refer to leads by `id` (e.g. `L007`) or by count per group.
- Never send email to an address from this file. Practice sends go only to `*@resend.dev`
  (or the owner's `MY_EMAIL`), as enforced by the send-guard hook.
- Only use the fields needed for the task. Personalization uses `first_name`, `group`
  and `favorite_tea`, nothing else.

## File format (`leads.csv`)
`id,first_name,last_name,email,group,city,favorite_tea,signup_date,orders,consent`

- `id`: `L001`…`L024`, unique
- `group`: exactly one of `curious`, `regulars`, `gifters` (matches `campaigns/steep-club-launch/plan.md`)
- **8 leads per group, 24 in total.** Keep it balanced if you edit it.
- `favorite_tea`: a tea name or `unknown` (personalization must handle `unknown`)
- `consent`: must be `yes`; skip any row without it

## Before committing a change here
- Every `email` ends in `@example.com`
- Each group has exactly 8 rows
- No duplicate `id` or `email`
