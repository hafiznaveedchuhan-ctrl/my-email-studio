# Handoff — Steep Club launch, email 01 subject line

Date: 2026-11-09. For whoever picks this up in a fresh session.

## Where things stand
- Parts 1 and 2 are built: plan, 4 base emails, 12 personalized emails, send-guard hook, `.mcp.json`, and a practice launch script.
- Practice launch tested: `node scripts/send-launch.mjs` delivered `[curious] / [regulars] / [gifters]` email 01 to `delivered@resend.dev` on the emulator (3/3 verified).
- **Open decision:** which subject line to run for email 01.

## The two angles to compare
| | A — curiosity / brand | B — benefit / clarity |
|---|---|---|
| Subject | `The kettle's on for something new 🫖` | `A new tea, every month, for you` |
| Length | 35 chars | 31 chars |
| Hook | Brand phrase, warm, a little playful | Says exactly what you get |
| Voice fit | Uses our signature "kettle's on" line + 1 emoji | Plain, benefit-first, no emoji |
| Risk | "something new" is slightly vague | Less personality, more generic |

### Recommendation: run **A** as the default, test **B** as the variant.
- A is the stronger brand voice ("pop the kettle on" is a named phrase in `brand/voice.md`) and carries the one allowed emoji well.
- B is the cleaner benefit line, so it's the right thing to A/B test against A for open rate (see `sequence.md` A/B test #1).
- Both pass the rules: under 45 chars, sentence case, no ALL CAPS, max one emoji.

## Next action for the fresh session
1. Confirm A vs B (or approve the A/B split).
2. If splitting, set `utm_content=email01-<group>-A` / `-B` so opens are attributable.
3. Then move to Step 13 (automated review script).

## CLI commands for working like a team
Run these from `~/my-email-studio`.

- **Named session** (easy to find and resume later):
  ```
  claude -n steep-launch
  ```
- **Resume that session** where you left off:
  ```
  claude --resume steep-launch
  ```
  (or `claude --resume` and pick it from the list)
- **Fork a session** — branch off without changing the original (great for trying a risky edit):
  ```
  claude --fork-session --resume steep-launch
  ```
- **Start a fresh session from this handoff:**
  ```
  claude -n subject-decision "Read notes/handoff.md and decide the email 01 subject line (A, B, or an A/B split), then continue with Step 13."
  ```
