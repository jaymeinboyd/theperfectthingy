// Static-export audit: report what would be deployed under /jenniferdemo.
// This script is intentionally conservative; it never writes to the TPT production tree.
import fs from "node:fs";
import path from "node:path";
import { strict as assert } from "node:assert";

const root = path.resolve(process.env.DAEDALOS_OUT || "upstream-daedalos/out");
const target = "scripts/jenniferdemo/staging-report.txt";
const lines = [];
const say = (line) => { lines.push(line); console.log(line); };
const files = [];

function walk(directory) {
  for (const item of fs.readdirSync(directory, { withFileTypes: true })) {
    const full = path.join(directory, item.name);
    if (item.isDirectory()) walk(full);
    else if (item.isFile()) files.push({ name: path.relative(root, full), bytes: fs.statSync(full).size });
  }
}

assert(fs.existsSync(path.join(root, "index.html")), "Expected static export out/index.html missing");
walk(root);
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const total = files.reduce((sum, file) => sum + file.bytes, 0);
const largest = [...files].sort((a,b)=>b.bytes-a.bytes).slice(0, 12);
const hardcoded = [...new Set(
  [...html.matchAll(/(?:src|href)=["'](\/(?!jenniferdemo(?:\/|["']))[^"']+)/g)].map(x=>x[1])
)].slice(0, 25);
say("daedalOS staging audit (NOT deployed)");
say("Pinned upstream: DustinBrett/daedalOS @ f017b393d4175eb396a741a7562299423843f1b1");
say("Destination: /jenniferdemo/");
say("Files: " + files.length);
say("Total bytes: " + total + " (" + (total / 1024 / 1024).toFixed(1) + " MiB)");
say("HTML uses /jenniferdemo/_next/: " + html.includes("/jenniferdemo/_next/"));
say("Root-relative HTML resources outside the demo base path: " + JSON.stringify(hardcoded));
say("Files exceeding 25 MiB: " + JSON.stringify(files.filter(x=>x.bytes>25*1024*1024).slice(0,20)));
say("Largest files: " + JSON.stringify(largest));
say("CRITICAL: Next.js basePath does not automatically rewrite daedalOS file-system fetch paths like /System/; browser smoke is required.");
fs.writeFileSync(target, lines.join("\n") + "\n");
if (!html.includes("/jenniferdemo/_next/")) process.exitCode=1;
if (files.some(x=>x.bytes>25*1024*1024)) process.exitCode=1;
