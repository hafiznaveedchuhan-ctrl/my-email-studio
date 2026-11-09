# Skills I chose — Email Studio (Kettlebird Tea)

Research only. **Nothing was installed.** (No `npx skills add` was run.)
Date: 2026-11-09

## Searches run
```
npx skills find email
npx skills find "email marketing"
npx skills find marketing
npx skills find newsletter
npx skills find "email sequence"
npx skills find copywriting
```

## Candidates checked
Stars and last push come from the GitHub API (`api.github.com/repos/<owner>/<repo>`).

| Skill | Publisher (type) | Repo | Installs | Stars | Last push | License | Verdict |
|---|---|---|---|---|---|---|---|
| email-sequence, campaign-plan, brand-review | anthropics (Org) | anthropics/knowledge-work-plugins | 3K | 35,244 | 2026-11-07 | Apache-2.0 | ✅ Chosen |
| emails, copywriting | coreyhaines31 (User) | coreyhaines31/marketingskills | 85.8K / 249.4K | 59,300 | 2026-11-06 | MIT | ✅ Chosen (reference only) |
| email-sequence | alirezarezvani (User) | alirezarezvani/claude-skills | 645 | 29,502 | 2026-11-05 | MIT | ⏸ Backup |
| amazon-ses | aws (Org) | aws/agent-toolkit-for-aws | 3.7K | 3,440 | 2026-11-08 | Apache-2.0 | ❌ Not needed |
| email-marketing | kostja94 (User) | kostja94/marketing-skills | 1.2K | 1,090 | 2026-11-06 | MIT | ❌ Rejected |
| email-marketing | claude-office-skills (Org) | claude-office-skills/skills | 5.2K | 569 | 2026-01-31 | MIT | ❌ Rejected |
| extension-email-marketing | caffeinelabs (Org) | caffeinelabs/skills | 30.7K | **2** | 2026-11-09 | Apache-2.0 | ❌ Red flag |
| affiliate-onboarding-sequence | mbfinotti (User) | mbfinotti/partnerships-skills | 17.5K | **2** | 2026-10-26 | MIT | ❌ Red flag |

## Chosen
1. **anthropics/knowledge-work-plugins → marketing** (`email-sequence`, `campaign-plan`, `brand-review`)
   - Official Anthropic org, 35K stars, updated this week.
   - Covers exactly what the lab needs (Steps 4, 6 and 7).
   - Its SKILL.md is plain instructions: no scripts, no `allowed-tools`.
   - Step 2 installs this as a **plugin** at project scope, not as a loose skill.
2. **coreyhaines31/marketingskills → `emails`, `copywriting`** (reading only)
   - Most-starred marketing skills repo (59K). Good copy guidelines, e.g. "avoid AI tells, no fake 'Re:' subjects".
   - Single-person publisher, so I'll read its references for ideas but **not install it**.
   - It only links to ESP docs (Resend, Mailchimp); it has no scripts.

## Rejected — why
- **caffeinelabs/extension-email-marketing**: 30.7K installs but only 2 stars. Install counts can be inflated, and it ships backend code (Motoko), not just instructions.
- **mbfinotti/partnerships-skills**: same pattern (17.5K installs, 2 stars). It also covers partnerships, not email marketing.
- **claude-office-skills/email-marketing**: last push was January 2026, so it's stale.
- **kostja94/email-marketing**: fine, but it overlaps with the chosen two and has a smaller following.
- **aws/amazon-ses**: trusted publisher, but it's for real SES sending. We send only to the Resend practice server.

## Rules I followed
- Check the publisher first (org vs. individual), then stars, last push and license.
- A high install count with very few stars is a warning sign.
- Read SKILL.md before trusting a skill: look for scripts, network calls and broad `allowed-tools`.
