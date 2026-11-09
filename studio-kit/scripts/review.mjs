#!/usr/bin/env node
// studio-kit: automated brand review for a single email file.
//
//   node review.mjs <email.md> [--baseline <file>] [--voice <path>]
//
// Brand-agnostic: reads the client's voice guide from the current project
// (brand/voice.md by default) and the schema from the plugin. Exits 1 on any
// HIGH-severity finding. A --baseline file lists resolved finding ids to suppress.

import { readFileSync, existsSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { resolve } from "node:path";

const args = process.argv.slice(2);
const file = args.find((a) => !a.startsWith("--"));
const opt = (name) => {
  const i = args.indexOf(name);
  return i !== -1 ? args[i + 1] : null;
};

if (!file) {
  console.error("usage: node review.mjs <email.md> [--baseline <file>] [--voice <path>]");
  process.exit(2);
}

// Schema ships with the plugin; voice guide belongs to the client project.
const pluginRoot = process.env.CLAUDE_PLUGIN_ROOT || resolve(import.meta.dirname, "..");
const schemaJson = readFileSync(resolve(pluginRoot, "review/schema.json"), "utf8");
const voicePath = opt("--voice") || "brand/voice.md";
const voice = existsSync(voicePath)
  ? readFileSync(voicePath, "utf8")
  : "(no brand voice guide found — use general email best practices)";
const emailText = readFileSync(resolve(file), "utf8");

const baselineFile = opt("--baseline");
const baselineIds =
  baselineFile && existsSync(baselineFile)
    ? JSON.parse(readFileSync(baselineFile, "utf8")).resolved || []
    : [];

const prompt = `You are a strict brand-voice reviewer for a small email studio.
Review the EMAIL below against the BRAND VOICE rules. Report every violation.
Severity: high = health claim, fake urgency, misleading subject, ALL CAPS subject, or more than one CTA.
medium = banned/avoid word, more than one "!", subject too long, missing unsubscribe line. low = minor style.
Give each finding a stable kebab-case id (e.g. health-claim-cure, subject-all-caps, multiple-cta).
Set overall to "fail" if any high finding exists, else "pass".
Do NOT report any finding whose id is in this already-resolved list: ${JSON.stringify(baselineIds)}.

=== BRAND VOICE ===
${voice}

=== EMAIL (${file}) ===
${emailText}`;

let out;
try {
  out = execFileSync("claude", ["-p", prompt, "--output-format", "json", "--json-schema", schemaJson], {
    encoding: "utf8",
    maxBuffer: 10 * 1024 * 1024,
  });
} catch (e) {
  console.error("claude CLI failed:", e.message);
  process.exit(2);
}

function extract(raw) {
  const w = JSON.parse(raw);
  const r = w.result ?? w;
  return typeof r === "string" ? JSON.parse(r) : r;
}

const review = extract(out);
let findings = (review.findings || []).filter((f) => !baselineIds.includes(f.id));

console.log(`\nReview of ${file}`);
if (findings.length === 0) console.log("  No new findings. ✅");
for (const f of findings) {
  console.log(`  [${f.severity.toUpperCase()}] ${f.id} — ${f.rule}`);
  console.log(`     at: ${f.location}`);
  console.log(`     before: ${f.before}`);
  console.log(`     after:  ${f.after}`);
}

const highs = findings.filter((f) => f.severity === "high");
console.log(`\n${findings.length} finding(s), ${highs.length} high.`);
if (highs.length > 0) {
  console.error("FAIL: high-severity issues present.");
  process.exit(1);
}
console.log("PASS.");
