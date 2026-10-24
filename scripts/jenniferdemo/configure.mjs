// Clean root deployment for dedicated demo.theperfectthingy.com Pages project.
// No basePath or asset-prefix rewriting: upstream apps retain native URLs.
import {readFileSync,writeFileSync,rmSync} from "node:fs";
import {strict as assert} from "node:assert";
const path="utils/constants.ts";
const original=readFileSync(path,"utf8");
assert(original.includes('alias: "daedalOS",'),"Upstream alias changed");
writeFileSync(path,original.replace('alias: "daedalOS",','alias: "TPT Demo",'));
for(const asset of ["public/Program Files/BoxedWine/fullWine1.7.55-v8.zip","public/Program Files/Quake3/Quake3Game.pk3","public/System/ffmpeg/ffmpeg-core.wasm"]) rmSync(asset,{force:true});
console.log("Clean root install with TPT Demo tab branding; upstream MIT attribution retained.");
