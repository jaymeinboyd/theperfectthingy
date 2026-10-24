# Demo decision 01 — file placement and website authentication

Status: design + synthetic interactive prototype; no real identity or storage access.

## Human-facing first question
**Where would you like your Companion's files to live?**
- My Google Drive (my account, my OAuth consent; not a TPT-owned vault)
- My private Cloudflare R2 workspace (identify whether customer or TPT controls the account and independent access)
- Both, with a named primary and *no automatic sync*
- On my own equipment (future adapter; not yet implemented)
- Just try the public demo (temporary browser workspace; no customer records)

Follow-up: **How would you like to identify yourself when using TPT's website?**
- Passkey or other customer-controlled identity (future)
- Sign in with Google (future, separate from Drive authorization)
- Guest demo (no authentication, no private files)

A website session is *not* a Companion license or a storage credential. Human identity, business authorization, licensing, and storage consent are separate steps. Website identity is optional for independently installed Companion use. If TPT's website disappears, the human must still be able to use their Companion and export their data using independent provider access or a recovery kit.

## Demonstration acceptance
1. Guest sees only synthetic temporary data.
2. Selecting a synthetic private identity does not imply real login or access.
3. File placement and identity choices are captured in a **nonsecret** versioned manifest, not an access token.
4. Switching back to guest clears displayed private synthetic information.
5. Manifest export remains possible independently of a TPT website session.
6. Never claim backend authorization, real Google OAuth, R2 access, cross-browser persistence, or offline AI is implemented until tested.

## Next implementation sequence
Build a *separate* static guided-setup prototype on the staging branch. Inspect and reuse daedalOS mounting points only after confirming no effect on the live demo. Add authenticated backend with per-business authorization in a later milestone. Keep real Frank and private customer files disconnected.

## Proposed manifest fields
schema_version, generated_at, installation_id (synthetic), business_id, companion_id, workspace_mode, identity_method, website_session_required (false for portable runtime), storage.providers, storage.primary, storage.sync_policy (none), storage.account_control, recovery.export_format, recovery.backup_destination, relife.instructions_ref, decisions[{question,answer,alternatives,rationale}], verification_status.
