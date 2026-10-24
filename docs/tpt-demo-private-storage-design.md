# TPT Demo: Public and Private Workspace (design, not implemented)

## Modes
- Guest: in-memory writable filesystem, no cloud credentials, no access to private mounts. Guest work is temporary and not automatically transferred on sign-in.
- Private: authenticated identity and server-authorized business workspace. A server validates entitlement for each request; the UI is not an authorization boundary.
- On logout: unmount private providers, clear sensitive in-memory state, revoke/expire sessions as appropriate, and rebuild a fresh guest filesystem. Test same-browser and multi-tab isolation.

## Storage adapters
A storage adapter provides list/read/write/move/delete with stable file IDs, error handling, and conflict/version metadata. The desktop file manager consumes adapters via a separate mount integration; adapters must not expose provider credentials to other applications.

1. Google Drive: user-authorized OAuth with least-privilege scopes, ideally drive.file and app-created/app-opened files; use Google's supported picker/consent flow for additional files. Do not request unrestricted Drive access by default. Server-side token handling, revocation, and scope review are required before production.
2. Cloudflare R2: private bucket with per-business namespace or stronger isolation, accessed only through authenticated backend authorization. Never publish bucket objects directly as public Pages assets. Use short-lived scoped access when appropriate, enforce size/type limits and audit operations.

Both providers can be mounted independently. Do not automatically sync or replicate between them. An explicit Copy/Move action may be added with provenance and conflict controls.

## Milestones
1. Guest filesystem isolation and session reset (synthetic data).
2. Login shell with fake identity only; no implied security until backend enforcement exists.
3. R2 synthetic workspace and cross-browser persistence with authorization tests.
4. Google Drive OAuth integration with test account, minimum permissions, token handling, revocation.
5. Mount both concurrently and test cross-provider copy, collisions, offline failures, logout, account switching, unauthorized access, and browser restarts.
6. Only then connect license entitlements, Companion, and real customer vaults.

## Non-goals and safeguards
- No real Frank, private Google Drive vault, or customer records in the demo.
- No passwords, Google tokens, or R2 secrets stored in GitHub, Pages public assets, or browser-local source.
- Cloudflare Pages static hosting alone does not provide private file authorization; a backend is required.
- A visible login button alone does not make data private.
- Existing demo.theperfectthingy.com root installation remains unchanged until an isolated implementation passes tests.
