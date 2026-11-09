#!/usr/bin/env node
// PreToolUse send-guard for the Kettlebird practice studio.
//
// Rules:
//  - Broadcast / bulk / audience-wide send tools are ALWAYS blocked.
//  - Email send tools may only deliver to:
//      * any address ending in @resend.dev  (Resend test addresses)
//      * the owner's MY_EMAIL (read from env; set only in .claude/settings.local.json)
//  - Any other recipient blocks the whole call.
//  - Block = exit code 2 with a reason on stderr. (exit 1 does NOT block.)
//  - Anything we don't recognise as a send is allowed through (exit 0).

import process from "node:process";

function read(stream) {
  return new Promise((resolve) => {
    let data = "";
    stream.setEncoding("utf8");
    stream.on("data", (c) => (data += c));
    stream.on("end", () => resolve(data));
    stream.on("error", () => resolve(data));
  });
}

function block(reason) {
  process.stderr.write(`[send-guard] BLOCKED: ${reason}\n`);
  process.exit(2);
}

function allow() {
  process.exit(0);
}

const raw = await read(process.stdin);
let payload = {};
try {
  payload = JSON.parse(raw || "{}");
} catch {
  // If we can't parse the event, fail safe: block anything that looks like a send.
  if (/send|email|broadcast/i.test(raw)) block("unparseable send event");
  allow();
}

const toolName = String(payload.tool_name || payload.toolName || "");
const input = payload.tool_input || payload.toolInput || payload.input || {};

// 1. Only guard send-style tools. Non-send tools pass straight through.
const isSend = /send|email|deliver|message|mail/i.test(toolName);
if (!isSend) allow();

// 2. Broadcasts are never allowed, no matter the recipient.
const isBroadcast = /broadcast|bulk|audience|campaign|segment|list|mass|everyone|subscribers/i.test(
  toolName
);
if (isBroadcast) block(`broadcast-style tool "${toolName}" is never allowed in this studio`);

// 3. Collect every email-looking string anywhere in the tool input.
const allowedExact = (process.env.MY_EMAIL || "").trim().toLowerCase();
const emailRe = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi;
const found = new Set();
(function walk(v) {
  if (v == null) return;
  if (typeof v === "string") {
    const m = v.match(emailRe);
    if (m) m.forEach((e) => found.add(e.toLowerCase()));
  } else if (Array.isArray(v)) {
    v.forEach(walk);
  } else if (typeof v === "object") {
    Object.values(v).forEach(walk);
  }
})(input);

// 4. A send with no detectable recipient is suspicious — block it.
if (found.size === 0) block(`send tool "${toolName}" with no recognisable recipient address`);

// 5. Every recipient must be allowed.
for (const addr of found) {
  const ok = addr.endsWith("@resend.dev") || (allowedExact && addr === allowedExact);
  if (!ok) {
    block(
      `recipient "${addr}" is not allowed. Only *@resend.dev and the owner's MY_EMAIL may receive practice mail.`
    );
  }
}

allow();
