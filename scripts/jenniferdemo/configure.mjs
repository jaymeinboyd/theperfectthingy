// Test-only adaptation of upstream daedalOS for subfolder deployment.
// Run in the checked-out daedalOS source root after checkout.
import { readFileSync, writeFileSync } from "node:fs";
import { strict as assert } from "node:assert";

const filename = "next.config.js";
const original = readFileSync(filename, "utf8");
const needle = /const\s+nextConfig\s*=\s*\{/;
assert(needle.test(original), "Pinned upstream next.config.js changed; first 350 chars: " + original.slice(0, 350));
assert(!original.includes('basePath: "/jenniferdemo"'), "Configuration already modified");
const revised = original.replace(
  needle,
  (matched) => matched + '\n  basePath: "/jenniferdemo",\n  trailingSlash: true,'
);
writeFileSync(filename, revised);
console.log("daedalOS: added build-time basePath /jenniferdemo and trailingSlash");
