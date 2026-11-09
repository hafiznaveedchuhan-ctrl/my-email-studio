#!/usr/bin/env node
// Generate 120 fake Steep Club reviews for the lab. Fake data only.
// Writes notes/reviews.jsonl (one JSON review per line).

import { writeFileSync } from "node:fs";

const firsts = ["Ava","Omar","Priya","Leo","Hana","Felix","Zara","Mateo","Grace","Samir","Ingrid","Tomas","Mei","Rafael","Nadia","Jonah","Clara","Ethan","Yasmin","Arjun","Sofia","Kenji","Lucia","Daniel"];
const teas = ["Nilgiri Frost","Snowy Jasmine","Spiced Orange Rooibos","an oolong","a sencha","the chai"];
const groups = ["curious","regulars","gifters"];

// Themed review templates by star rating (lab-made, no health claims).
const byStars = {
  5: [
    "The {tea} was the highlight of my week. Tasting card made steeping foolproof.",
    "Exactly the little ritual I wanted. Box arrived on time and beautifully packed.",
    "Gifted this to my sister and she adored the {tea}. Will renew for sure.",
    "Three new teas, zero effort. The {tea} is now a staple in my cupboard.",
  ],
  4: [
    "Really enjoyed the {tea}. Only wish the box came with a few more grams.",
    "Lovely selection and clear steep times. Delivery was a day late but worth it.",
    "Great variety. The {tea} wasn't my favourite but the other two shone.",
  ],
  3: [
    "Fine, but nothing wowed me this month. The {tea} was a bit plain.",
    "Decent value. Packaging was nice; flavours were just okay.",
    "On the fence. The {tea} steeped bitter for me even at the listed time.",
  ],
  2: [
    "The {tea} tasted stale and the box arrived crushed.",
    "Not enough tea for the price. Felt thin for a monthly box.",
    "Steep times on the card didn't match my kettle; cups came out weak.",
  ],
  1: [
    "Box never arrived and support was slow to reply.",
    "Charged twice and had trouble cancelling. The {tea} was forgettable.",
    "Wrong teas sent two months running. Disappointed.",
  ],
};

// Distribution: skew positive but keep a real tail.
function pickStars(i) {
  const r = i % 20;
  if (r < 9) return 5;   // 45%
  if (r < 15) return 4;  // 30%
  if (r < 18) return 3;  // 15%
  if (r < 19) return 2;  // 5%
  return 1;              // 5%
}

const rows = [];
for (let i = 0; i < 120; i++) {
  const stars = pickStars(i);
  const tea = teas[i % teas.length];
  const tmpl = byStars[stars][i % byStars[stars].length];
  const date = new Date(2026, 10, 1 + (i % 28)); // Nov 2026
  rows.push({
    id: `R${String(i + 1).padStart(3, "0")}`,
    name: `${firsts[i % firsts.length]} ${String.fromCharCode(65 + (i % 26))}.`,
    group: groups[i % groups.length],
    stars,
    tea,
    text: tmpl.replace("{tea}", tea),
    date: date.toISOString().slice(0, 10),
  });
}

writeFileSync("notes/reviews.jsonl", rows.map((r) => JSON.stringify(r)).join("\n") + "\n");
const counts = [1, 2, 3, 4, 5].map((s) => `${s}★:${rows.filter((r) => r.stars === s).length}`);
console.log(`Wrote ${rows.length} reviews to notes/reviews.jsonl`);
console.log("Distribution:", counts.join("  "));
console.log("Average:", (rows.reduce((a, r) => a + r.stars, 0) / rows.length).toFixed(2));
