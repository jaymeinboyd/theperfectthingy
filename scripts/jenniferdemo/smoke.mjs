// Runs from the daedalOS checkout root after a static server starts on 127.0.0.1:4179.
// Only tests an isolated synthetic demo. No production credentials or business data.
import fs from "node:fs";
import { chromium } from "@playwright/test";

const base = "http://127.0.0.1:4179";
const home = base + "/jenniferdemo/";
const statusErrors = [], failedRequests = [], foreignRootRequests = [], jsErrors = [];
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1365, height: 768 } });
page.on("pageerror", error => jsErrors.push(error.message.slice(0,500)));
page.on("response", response => {
  if (response.url().startsWith(base) && response.status() >= 400) {
    statusErrors.push({ url: response.url(), status: response.status() });
  }
});
page.on("requestfailed", request => {
  if(request.url().startsWith(base)) failedRequests.push({url:request.url(),why:request.failure()?.errorText});
});
page.on("request", request => {
  try {
    const u = new URL(request.url());
    if(u.origin === base && !u.pathname.startsWith("/jenniferdemo/")) {
      foreignRootRequests.push(u.pathname);
    }
  } catch {}
});
await page.route("**/*", route => {
  const url = new URL(route.request().url());
  if(url.origin !== base) return route.abort("blockedbyclient");
  return route.continue();
});
let navigation = "navigation not attempted";
try {
  const response = await page.goto(home, { waitUntil: "domcontentloaded", timeout: 45000 });
  navigation = String(response?.status() ?? "none");
  await page.waitForTimeout(10000);
} catch(err) {
  navigation = "ERROR: " + err.message.slice(0,500);
}
const title = await page.title().catch(()=>"(none)");
await page.screenshot({ path: "../scripts/jenniferdemo/smoke-screenshot.png" }).catch(()=>{});
const result = {
  home, navigation, title,
  statusErrors:statusErrors.slice(0,50),
  failedRequests:failedRequests.slice(0,50),
  foreignRootRequests:[...new Set(foreignRootRequests)].slice(0,100),
  jsErrors:jsErrors.slice(0,30)
};
fs.writeFileSync("../scripts/jenniferdemo/smoke-report.json", JSON.stringify(result,null,2)+"\n");
console.log("STAGING BROWSER SMOKE",JSON.stringify(result,null,2));
await browser.close();
if(navigation !== "200" || statusErrors.length || foreignRootRequests.length || jsErrors.length) {
  console.error("Smoke needs fixes before any deployment; nothing has been published.");
  process.exitCode = 1;
}
