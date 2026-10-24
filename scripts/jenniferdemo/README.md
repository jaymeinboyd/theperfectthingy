# Jennifer Demo — daedalOS staging

**Status:** staging experiment only. No live deployment. Only synthetic DemoFrank information may ever be bundled here.

Goal: adapt the real MIT-licensed [daedalOS](https://github.com/DustinBrett/daedalOS) browser desktop to run at `https://theperfectthingy.com/jenniferdemo/`, while preserving the existing production TPT website.

## Deployment architecture
- TPT site currently serves the committed `public/` tree as static content.
- The **upstream daedalOS source** is fetched at a pinned commit, built in CI, and audited under a `/jenniferdemo` Next.js basePath.
- Its generated static export belongs under `public/jenniferdemo/`, **not** `public/`.
- This branch contains the *test harness only*, not the generated application. The live site is unchanged.
- No Google Drive connection, Frank content, access tokens, Companion entitlements, or customer data in this test.
- Upstream daedalOS copyright and MIT license must accompany any deployed copy.

## Known risks to resolve before deployment
- Next.js basePath only changes framework-managed asset URLs. daedalOS also uses absolute application/file-system paths like `/System/...`, `/session.json`, and paths in third-party applications.
- The desktop browser storage is local to an origin. The full TPT domain is a shared origin, so daedalOS browser-local persistence and cached state must not interfere with existing site content.
- Static-only daedalOS has no Cora, Git checkout/check-in, managed credentials, or real shared-vault integration.
- Some upstream applications contact outside providers; the business product must eventually be a reduced and audited feature set.
- Review Cloudflare Pages deployment limits and security policy before publishing generated files.

## How this experiment works
The GitHub Action tests whether the pinned daedalOS source can be built and loads at the intended subdirectory. A successful GitHub Action **does not deploy** it. The browser smoke test records asset loading errors and unexpected root requests to guide the proper adaptation. Deployment needs a separate explicit code change after passing this gate.

## CI validation and future deployment

A staged GitHub Actions test completed successfully on 2026-10-21 (Pacific time):
https://github.com/jaymeinboyd/theperfectthingy/actions/runs/39701234681

The adapted daedalOS source built into 1,820 files, approximately 205.8 MiB. Initial Chromium smoke loaded /jenniferdemo/ with HTTP 200, no JavaScript errors, no failed resources, no off-prefix root requests, and no single file over 25 MiB. **This proves only the starting desktop loads. It does not prove every included application works.**

A deployable build recipe is at `scripts/jenniferdemo/build.sh`. It re-fetches pinned upstream code into a temporary checkout, adapts base paths, removes the identified oversized optional binaries, audits the build, copies the compiled assets to `public/jenniferdemo/`, and preserves the upstream MIT license notice.

This **has not been enabled on the live Cloudflare site**. The current TPT repo has no top-level build configuration. To activate after review, set the existing Cloudflare Pages project's build command to `bash scripts/jenniferdemo/build.sh` and output directory to `public`, using Node.js 22. Maintain the existing Functions/routes. Review Cloudflare's deployment limits and test a preview deployment before merging/publishing. We have not verified or changed the existing Cloudflare project settings.

**Production caution:** a URL path on the same domain is *not* a separate browser origin. The demo shares cookie/localStorage/IndexedDB origin security boundaries with the rest of the TPT website; for a production customer workspace consider a dedicated subdomain, separate application origin, hardened authentication, and scoped storage. Synthetic demo data only. Cora and Git collaboration are not wired to this desktop.

## Acceptance criteria for the first public synthetic demo
1. No change to the TPT home page or existing functions.
2. `/jenniferdemo/` loads daedalOS and essential static assets without requesting other TPT root paths.
3. Browser storage, navigation, and application windows stay isolated from site visitors' other TPT usage.
4. Only synthetic material and vendor MIT notices.
5. Works in at least Chrome and Firefox desktop; investigate mobile separately.
6. Easy to uninstall by removing one directory and deployment configuration.

Related exploration: Cora invisible coordination service, Tiny Little Office editor, owner-controlled Git and optional Raspberry Pi/Forgejo hosting. These are **not included** in this initial demo.
