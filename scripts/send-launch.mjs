#!/usr/bin/env node
// Practice launch: send email 01 for each lead group to a Resend test address.
//
// Safety: this script only ever sends to TEST_TO (default delivered@resend.dev).
// It talks to the Resend PRACTICE server (RESEND_BASE_URL, default localhost:4000),
// never the real Resend API. The send-guard hook is the second line of defence.
//
// Usage: node scripts/send-launch.mjs

import { readFileSync } from "node:fs";

const BASE = process.env.RESEND_BASE_URL || "http://localhost:4000";
const KEY = process.env.RESEND_API_KEY || "re_practice_local_only";
const TEST_TO = "delivered@resend.dev"; // a Resend test inbox, allowed by the send-guard
const FROM = "Mina at Kettlebird <mina@kettlebird.example.com>";
const GROUPS = ["curious", "regulars", "gifters"];

function frontmatter(md) {
  const m = md.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!m) throw new Error("no frontmatter");
  const fm = {};
  for (const line of m[1].split("\n")) {
    const kv = line.match(/^(\w+):\s*"?(.*?)"?$/);
    if (kv) fm[kv[1]] = kv[2];
  }
  return { fm, body: m[2] };
}

async function send(group) {
  const path = `campaigns/steep-club-launch/personalized/${group}/01-the-kettles-on.md`;
  const { fm, body } = frontmatter(readFileSync(path, "utf8"));
  const subject = `[${group}] ${fm.subject}`;
  const res = await fetch(`${BASE}/emails`, {
    method: "POST",
    headers: { Authorization: `Bearer ${KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from: FROM, to: TEST_TO, subject, text: body }),
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(`send failed for ${group}: ${res.status} ${JSON.stringify(json)}`);
  console.log(`  ${group.padEnd(9)} -> id ${json.id}  subject: ${subject}`);
  return json.id;
}

console.log(`Sending launch email 01 to ${TEST_TO} via ${BASE} ...`);
const ids = [];
for (const g of GROUPS) ids.push(await send(g));

// Verify delivery: the sent ids should appear in the practice server's list.
const list = await (await fetch(`${BASE}/emails`)).json();
const seen = new Set((list.data || []).map((e) => e.id));
const delivered = ids.filter((id) => seen.has(id));
console.log(`\nVerified ${delivered.length}/${ids.length} delivered on the practice server.`);
if (delivered.length !== ids.length) {
  console.error("Some sends did not show up.");
  process.exit(1);
}
