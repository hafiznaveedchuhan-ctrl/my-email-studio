# Kettlebird Tea — Email Studio

Email marketing studio for **Kettlebird Tea** (a made-up tea shop).
Current launch: **The Steep Club**, a tea subscription box.

This is a practice lab. No real customer and no real email exists here.

## Folder map
- `brand/` — brand voice and style (source of truth for tone)
- `leads/` — fake lead list (see `leads/CLAUDE.md` for its own rules)
- `campaigns/steep-club-launch/` — plan, emails, personalized versions
- `notes/` — research, decisions, handoffs
- `.claude/` — rules, skills, hooks for this studio

## Golden rules
1. **Practice only.** Send only through the Resend practice server at `http://localhost:4000`.
   Never call the real Resend API (`api.resend.com`) or any real ESP.
2. **Allowed recipients:** `*@resend.dev` test addresses and the owner's `MY_EMAIL`.
   Everything else is blocked by the send-guard hook. Never try to get around it.
3. **No broadcasts.** Never use bulk/broadcast/audience-wide send tools.
4. **No secrets in git.** API keys go in env vars or `.claude/settings.local.json`
   (gitignored). Never write a real key or a real personal email into a tracked file.
5. **Fake data only.** Every lead email ends in `@example.com`. Never invent or add real people.
6. **One step at a time.** Finish a step, report what was made and how to check it, then stop.
7. **Commit after each file**, with a short message in conventional style
   (`docs:`, `feat:`, `chore:`, `fix:`).

## Brand voice
@brand/voice.md

## Writing emails
- Follow the brand voice above for every line of copy.
- Every email needs: subject, preview text, body, one clear CTA, and an unsubscribe line.
- File names: `campaigns/steep-club-launch/emails/NN-short-name.md` (e.g. `01-welcome.md`).
- Personalized versions: `campaigns/steep-club-launch/personalized/<group>/NN-short-name.md`.
- No fake urgency, no ALL CAPS subjects, no misleading "Re:" or "Fwd:" subjects.
- Health claims about tea are not allowed (no "cures", "detox", "boosts immunity").

## Tools
- Marketing plugin (Anthropic, project scope): `/marketing:campaign-plan`,
  `/marketing:email-sequence`, `/marketing:brand-review`.
- Prefer Glob/Grep to check files over guessing.

## Things that do NOT exist — never use them
- A `commands` list in `.claude/config.json`
- A `CLAUDE_HEADLESS` env var
- A `--batch` CLI flag

## When something needs the owner
Some actions only the owner can do (`/plugin`, `/mcp`, `/compact`, starting a new
session, CLI flags). Give the exact command to run and wait.
