// Test-only adaptation of upstream daedalOS for subfolder deployment.
// Run in the checked-out daedalOS source root after checkout.
import { readFileSync, writeFileSync, rmSync } from "node:fs";
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


// Keep daedalOS virtual filesystem paths (e.g. /System/...) intact,
// but prefix the browser-facing icon asset URL at its shared generator.
const functionPath = "utils/functions.ts";
const functionText = readFileSync(functionPath, "utf8");
const sourceMarker = /imageSrcMap\.set\(cacheKey, src\);\s*return src;/;
assert(sourceMarker.test(functionText), "Pinned upstream imageSrc implementation changed");
const newCode =
  'const hostedSrc = src.startsWith("/") ? "/jenniferdemo" + src : src;\n' +
  '  imageSrcMap.set(cacheKey, hostedSrc);\n\n  return hostedSrc;';
writeFileSync(functionPath, functionText.replace(sourceMarker, newCode));
console.log("daedalOS: icon asset requests now scoped to /jenniferdemo");

// Exclude optional oversized entertainment/media dependencies from this
// browser-desktop *demo* rather than uploading files exceeding 25 MiB.
for (const largeOptionalAsset of [
  "public/Program Files/BoxedWine/fullWine1.7.55-v8.zip",
  "public/Program Files/Quake3/Quake3Game.pk3",
  "public/System/ffmpeg/ffmpeg-core.wasm",
]) {
  rmSync(largeOptionalAsset, { force: true });
  console.log("Excluded oversized optional demo asset: " + largeOptionalAsset);
}
