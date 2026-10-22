// Test-only adaptation of upstream daedalOS for subfolder deployment.
// Run in the checked-out daedalOS source root after checkout.
import { readFileSync, writeFileSync } from "node:fs";
import { strict as assert } from "node:assert";

const filename = "next.config.js";
const original = readFileSync(filename, "utf8");
const needle = "const nextConfig = {\n";
assert(original.includes(needle), "Pinned upstream next.config.js changed; re-audit before patching");
assert(!original.includes('basePath: "/jenniferdemo"'), "Configuration already modified");
const revised = original.replace(
  needle,
  needle + '  basePath: "/jenniferdemo",\n  trailingSlash: true,\n'
);
writeFileSync(filename, revised);
console.log("daedalOS: added build-time basePath /jenniferdemo and trailingSlash");
