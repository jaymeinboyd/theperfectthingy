# Architectural decision: customer-owned Portable Companion is primary

Status: chosen direction, implementation pending (2026-10-24)

## Principle
The customer's portable Companion installation is primary. TPT website is an optional provisioning, update, licensing issuance, support, and services gateway, not a runtime dependency or sole recovery authority.

## Continuity acceptance test
If theperfectthingy.com becomes unavailable, the customer can still start the Companion on a supported runtime, restore ReLife context, access authorized storage, export their own files and configuration, and validate a previously issued license offline within its published terms. This is a design requirement, NOT a currently demonstrated capability.

## Separation of concerns
- Identity: customer-controlled credentials/passkeys, optional Google or other sign-in. A password manager such as 1Password is optional, not a dependency.
- Entitlement: portable, signed, locally verifiable license; one business per Companion under current TPT policy. Publish offline validity, renewal, and revocation terms.
- Runtime: portable installation and versioned configuration; document dependencies on chosen AI substrate.
- Storage: Google Drive, Cloudflare R2, both, future self-hosted provider; independent adapter interfaces. Customer controls data export and recovery.
- Recovery kit: nonsecret setup manifest, Companion/ReLife instructions, public verification material, license record, encrypted customer-managed backup and restore guide. Keep secrets out of the manifest.
- TPT services: optional updates, activation, billing, support and hosted features, with no mandatory callback on each startup.

## Companion-guided setup
Ask human: deployment target; sign-in method; licensed business; preferred storage (Google/R2/both/self-hosted later); local/offline behavior; backup and recovery destination; update preferences; security roles; AI runtime. Preserve alternatives, decisions, reasons, exact versions, tests and rollback steps as a reusable installation recipe.

## Risks and open decisions
- Offline license validity versus revocation/renewal policy.
- Cloud storage still depends on its respective provider; a backup or local export is necessary for provider outage survival.
- AI runtime may require network/subscription; avoid claiming full offline operation without a local model.
- Google OAuth tokens require refresh/recovery flows; TPT outage must not prevent authorization refresh if Google is used.
- R2 accessed solely through a TPT-operated gateway would recreate a single point of failure; allow a customer-controlled or independently hosted access path.
- Cross-browser storage isolation and secure logout remain unimplemented.

## Implementation status
Design record only. No production identity, licensing, Google OAuth, R2 access or offline runtime has been deployed. Existing synthetic daedalOS demo remains isolated.
