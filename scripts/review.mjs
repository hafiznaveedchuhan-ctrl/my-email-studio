#!/usr/bin/env node
// Automated brand review for a single email file.
//
//   node scripts/review.mjs <email.md> [--baseline review/baseline.json]
//
// Runs `claude -p --output-format json --json-schema review/schema.json` to get a
// structured list of findings, then:
//   - prints the findings
//   - EXITS 1 if any HIGH-severity finding remains (so CI can fail the build)
//   - a --baseline file lists finding ids that were already reviewed and accepted/fixed;
//     those are suppressed so a re-review never re-flags them.

import { readFileSync, existsSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { dirname, resolve } from "node:path";

const args = process.argv.slice(2);
const file = args.find((a) => !a.startsWith("--"));
const baselineIdx = args.indexOf("--baseline");
const baselineFile = baselineIdx !== -1 ? args[baselineIdx + 1] : null;

if (!file) {
  console.error("usage: node scripts/review.mjs <email.md> [--baseline <file>]");
  process.exit(2);
}

const root = resolve(dirname(new URL(import.meta.url).pathname), "..");
const schemaJson = readFileSync(resolve(root, "review/schema.json"), "utf8");
const voice = readFileSync(resolve(root, "brand/voice.md"), "utf8");
const emailText = readFileSync(resolve(file), "utf8");

let baselineIds = [];
if (baselineFile && existsSync(baselineFile)) {
  baselineIds = JSON.parse(readFileSync(baselineFile, "utf8")).resolved || [];
}

const prompt = `You are a strict brand-voice reviewer for Kettlebird Tea.
Review the EMAIL below against the BRAND VOICE rules. Report every violation.
Severity: high = health claim, fake urgency, misleading subject, ALL CAPS subject, or more than one CTA.
medium = banned/avoid word, more than one "!", subject over 45 chars. low = minor style.
Give each finding a stable kebab-case id describing the issue (e.g. health-claim-cure, subject-all-caps, multiple-cta).
Set overall to "fail" if any high finding exists, else "pass".
Do NOT report any finding whose id is in this already-resolved list: ${JSON.stringify(baselineIds)}.

=== BRAND VOICE ===
${voice}

=== EMAIL (${file}) ===
${emailText}`;

let out;
try {
  out = execFileSync(
    "claude",
    ["-p", prompt, "--output-format", "json", "--json-schema", schemaJson],
    { encoding: "utf8", maxBuffer: 10 * 1024 * 1024 }
  );
} catch (e) {
  console.error("claude CLI failed:", e.message);
  process.exit(2);
}

// `claude -p --output-format json` wraps the structured answer in {result: ...}.
function extract(raw) {
  let w;
  try {
    w = JSON.parse(raw);
  } catch {
    return JSON.parse(raw);
  }
  const r = w.result ?? w;
  return typeof r === "string" ? JSON.parse(r) : r;
}

const review = extract(out);
let findings = review.findings || [];
findings = findings.filter((f) => !baselineIds.includes(f.id)); // defensive suppression

console.log(`\nReview of ${file}`);
if (findings.length === 0) {
  console.log("  No new findings. ✅");
} else {
  for (const f of findings) {
    console.log(`  [${f.severity.toUpperCase()}] ${f.id} — ${f.rule}`);
    console.log(`     at: ${f.location}`);
    console.log(`     before: ${f.before}`);
    console.log(`     after:  ${f.after}`);
  }
}

const highs = findings.filter((f) => f.severity === "high");
console.log(`\n${findings.length} finding(s), ${highs.length} high.`);
if (highs.length > 0) {
  console.error("FAIL: high-severity issues present.");
  process.exit(1);
}
console.log("PASS.");
