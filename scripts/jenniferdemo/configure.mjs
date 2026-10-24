// Staging-only patch: preserve /jenniferdemo deployment while correcting
// legacy root-relative application resources in the browser.
// This is an experiment; acceptance requires a successful Paint launch.
import { readFileSync, writeFileSync, rmSync } from "node:fs";
import { strict as assert } from "node:assert";
const filename = "next.config.js";
const original = readFileSync(filename, "utf8");
const needle = /const\s+nextConfig\s*=\s*\{/;
assert(needle.test(original), "Pinned upstream next.config.js changed");
const revised = original.replace(needle, m => m + '\n  basePath: "/jenniferdemo",\n  trailingSlash: true,');
writeFileSync(filename, revised);
const functionPath = "utils/functions.ts";
const functionText = readFileSync(functionPath, "utf8");
const sourceMarker = /imageSrcMap\.set\(cacheKey, src\);\s*return src;/;
assert(sourceMarker.test(functionText), "Pinned upstream imageSrc implementation changed");
writeFileSync(functionPath, functionText.replace(sourceMarker,
  'const hostedSrc = src.startsWith("/") ? "/jenniferdemo" + src : src;\n  imageSrcMap.set(cacheKey, hostedSrc);\n  return hostedSrc;'));
console.log("Applied demo asset prefix.");
// TPT branding: retain upstream license and attribution, but change the
// browser tab title and application alias for the synthetic demo.
const constantsPath = "utils/constants.ts";
const constantsText = readFileSync(constantsPath, "utf8");
const aliasMarker = 'alias: "daedalOS",';
assert(constantsText.includes(aliasMarker), "Pinned upstream alias changed");
writeFileSync(constantsPath, constantsText.replace(aliasMarker, 'alias: "TPT Demo",'));
console.log("Set browser tab/application alias to TPT Demo.");
for (const largeOptionalAsset of [
  "public/Program Files/BoxedWine/fullWine1.7.55-v8.zip",
  "public/Program Files/Quake3/Quake3Game.pk3",
  "public/System/ffmpeg/ffmpeg-core.wasm",
]) rmSync(largeOptionalAsset, { force: true });
