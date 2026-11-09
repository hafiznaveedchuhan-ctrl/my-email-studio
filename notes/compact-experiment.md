# Step 15 — The `/compact` experiment (memory vs scratchpad)

**Question:** When a long session gets compacted, what survives — facts held
only in the conversation, or facts written to a file?

## What we actually observed
This studio lived through a **real `/compact`** on 2026-11-09. After it:

| Thing | Survived compact? | Why |
|---|---|---|
| Git commits (30) | ✅ Yes | On disk in `.git`, untouched by compact |
| Working files (emails, leads, plan, studio-kit) | ✅ Yes | On disk |
| `notes/reviews-scratchpad.md` (subagent summary) | ✅ Yes | A file on disk |
| File-based memory (`memory/*.md` + `MEMORY.md`) | ✅ Yes | Files on disk; re-loaded each session |
| The raw back-and-forth of the chat | ⚠️ Summarized | Compact replaces the transcript with a shorter summary — exact wording is lossy |

## Conclusion
**Write durable facts to a file (or the memory system), not just into the chat.**
- A **scratchpad file** (e.g. `notes/reviews-scratchpad.md`) is the reliable place
  for anything you want to recall later — it persists verbatim on disk and is
  unaffected by compaction.
- In-context conversation detail is **summarized** on compact: good enough for
  continuity, but not a safe store for exact numbers, ids, or decisions.
- This is exactly why the lab keeps the review distribution, the campaign plan,
  and handoff notes as **files**, and uses `memory/` for cross-session facts.

**Rule of thumb:** if you'd be upset to lose it, it belongs in a committed file,
not in the conversation.
