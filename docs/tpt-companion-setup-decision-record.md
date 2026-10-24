# TPT Companion Setup Decision Record — draft, not implemented

## Core principle
Separate human identity, business entitlement, Companion runtime, and storage provider. Do not make Google, Cloudflare, or any AI substrate the sole source of customer ownership or continuity.

## Human-guided installation questions
1. Guest or private workspace? Guest must not inherit private data; reset behavior disclosed.
2. Identity method: Google sign-in, passkey/email, or future self-hosted identity. Identity is not a license.
3. Business to activate: one authorized business per Companion license. Explain additional-license requirement for another business.
4. Storage: Google Drive, private Cloudflare R2, both, or future self-hosted provider. Explicitly ask which is primary and whether any copy/sync is wanted; default no automatic sync.
5. Data control: storage location, export format, backups, recovery, and deletion policy.
6. Companion runtime: approved AI substrate and ReLife procedure; record version and permission boundaries.
7. Offline access: what is cached, what requires connectivity, and how changes reconcile.
8. Security: consent scope, user/admin roles, account recovery, logout isolation, audit logging.

## Licensing model (recommended, subject to review)
- Signed, portable entitlement record identifying license ID, business ID, Companion entitlement, issue/expiry dates as applicable, and permitted features. No passwords, OAuth tokens, or customer documents in the license.
- Public verification key bundled with clients; signing key retained in a protected issuer service. Offline verification allowed for a defined policy window; renewal/revocation mechanisms documented.
- Human-readable export and machine-readable setup manifest. Never claim a license is irrevocable if issuer retains revocation authority.
- Customer data remains exportable independently of license status. Loss of license must not trap data.
- One business per Companion license, but allow multiple storage providers and devices for the same authorized business, subject to explicit terms.
- Separate commercial license for TPT proprietary components from upstream MIT/open-source attribution and license obligations.

## Installation manifest (non-secret)
Record versioned answers: workspace mode, identity provider, business ID, Companion ID, storage adapters and primary provider, data portability and backup settings, permissions, ReLife startup path, deployment target, setup/test outcomes, rollback instructions. Store secrets only in provider-approved secret stores, never in manifest.

## Acceptance gates
- Guest cannot access private workspace or browser-local remnants after logout.
- A private user can access authorized files across browsers and cannot access another business's files.
- Google Drive and R2 are individually functional, with explicit copying and conflict handling.
- Export works without active Companion license; self-hosted portability and offline license verification tested.
- License transfer, renewal, recovery, revocation, and data deletion policies are disclosed and tested.

Status: design only; no authentication, licensing enforcement, OAuth, or R2 API is implemented by this record.
