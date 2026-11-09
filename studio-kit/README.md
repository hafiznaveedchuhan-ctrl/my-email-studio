# studio-kit

A small, brand-agnostic plugin for running a safe email marketing studio. Drop it into any
client's studio and you get the same guardrails and helpers.

## What's inside
| Piece | What it does |
|---|---|
| **send-guard hook** (`hooks/`) | PreToolUse hook. Blocks any send to an address that isn't `*@resend.dev` or the owner's `MY_EMAIL`, and always blocks broadcast-style tools. Block = exit 2. |
| **email-reviewer subagent** (`agents/`) | Reviews an email against the client's `brand/voice.md` and reports findings by severity with before/after fixes. Read-only. |
| **personalize skill** (`skills/personalize/`) | Runs as a `fork` to write one tailored copy of each base email per lead group. |
| **review script** (`scripts/review.mjs`) | Runs `claude -p` with `review/schema.json` for structured findings. Exits 1 on any HIGH severity. Supports a `--baseline` file so re-reviews don't re-flag resolved issues. |

## Requirements
- Node 20+ and the Claude Code CLI on PATH (the review script calls `claude -p`).
- Set `MY_EMAIL` in the client's `.claude/settings.local.json` (gitignored) so the send-guard knows the one real allowed recipient.

## Install from the marketplace
This repo doubles as a plugin marketplace (see `.claude-plugin/marketplace.json`):

```
/plugin marketplace add hafiznaveedchuhan-ctrl/my-email-studio
/plugin install studio-kit --marketplace hafiznaveedchuhan-ctrl/my-email-studio
```

## Or use it without installing
Point Claude Code at the plugin directly:

```
cd ~/the-client-studio
claude --plugin-dir ~/path/to/studio-kit
```

Then:
- The send-guard runs automatically on send-style tools.
- Ask the `email-reviewer` subagent to check a draft.
- Run `node ~/path/to/studio-kit/scripts/review.mjs campaigns/**/emails/01-*.md`.

## Validate
```
claude plugin validate studio-kit
```
