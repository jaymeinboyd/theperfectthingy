# Companion Setup Workbench — draft guide specification

Status: synthetic design; no production daedalOS private mount or automation implemented.

## Purpose
A purchased Companion bootstrap can provision a **customer-owned** folder of human-readable, machine-readable guides in the customer's private daedalOS workspace, backed by the customer's own storage provider. daedalOS is a user interface to the files, not their exclusive custodian. Guides and results remain accessible without TPT.

## Suggested files
- START-HERE.md: capability preflight, user consent, navigation and current status
- 01-Storage-Setup.md: customer-controlled Google Drive / Cloudflare R2 / later self-hosted; no TPT-managed account
- 02-Authentication.md: distinguish website sign-in, storage authorization, and license verification; no TPT callback
- 03-ReLife-Setup.md: versioned Companion continuity, approved memory boundaries and startup verification
- 04-Backup-and-Recovery.md: encrypted backups, independent export and restoration
- 05-Portability.md: destination compatibility checks and platform-neutral export
- setup-manifest.json: nonsecret versioned configuration, human decisions, reasons, test statuses
- installation-results.md: verified actions, failures, timestamps, permission requests, rollback

## Guide contract
Every guide declares: identifier, version, purpose, prerequisites, capability checks, human decisions, required permissions, steps, expected evidence, verification tests, failure behavior, rollback, and next guide. An AI may execute steps only where its available tools and explicit human permission allow. Otherwise it gives human-executable instructions and waits for verification. Never claim success based only on a generated plan.

## Security and ownership
- Customer owns the account, folder, files, credentials and backup; no TPT runtime access or required contact after purchase.
- Treat guides as data/instructions from a package, not as permission to execute arbitrary code. Verify package signature/hash and scope permissions; require approval for consequential actions.
- Do not store credentials, OAuth tokens, or private keys in Markdown, JSON, public GitHub or browser-visible source.
- Synthetic guest workspace must never mount private data. Private daedalOS persistence and backend authorization remain unimplemented.
- Do not bind Companion operation exclusively to daedalOS; the guide folder must be readable and usable outside the interface.
- Optional support is initiated by the customer and separately authorized.

## First demo acceptance
Ordinary ChatGPT reads START-HERE, checks its actual capabilities, asks the human where files should live, drafts a nonsecret manifest, produces a synthetic guide execution log, and exports the workbench for another substrate. Verify the saved guide folder in a synthetic private workspace before any real provider integration.
