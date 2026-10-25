# Phase 9 — TPT Product Catalog, Checkout & Delivery (staging specification)

Status: DESIGN ONLY. Do not publish products or accept payments until explicitly approved. No changes to main or live demo.

## Customer journey
Companion checks local expansion catalog -> human reads a verified live product page -> human chooses to buy -> hosted checkout -> payment provider verifies transaction server-side -> customer downloads the exact purchased package -> customer hands it to their Companion -> Companion checks publisher signature, contents, permissions and compatibility -> human approves -> Companion installs in customer-owned vault and demonstrates results.

## Product records
Fields: product_id, title, summary, detailed_page_url, page_verified_live, version, price_currency, price_amount, tax_handling, third_party_costs, supported_substrates, required_permissions, capability_manifest, package_sha256, signature_algorithm, publisher_key_id, download_artifact, purchase_status, release_status, license_terms, refund_policy, support_policy, portability_notes, independent_alternative.
Do not invent prices, compatibility, or published URLs.

## Initial candidate catalog
- File Sharing & Collaboration — candidate first paid expansion; implementation and price TBD.
- Personal Knowledge Vault — TBD.
- Business Companion — TBD.
- Creative & Research — TBD.
- Tools & Automation — TBD.
- Technology & Autonomy — TBD.
All product pages currently proposed, not verified live.

## Payment boundary
Use a vetted hosted payment provider. No card data on TPT servers. Server verifies webhook signatures and order/payment status, ensures idempotent fulfillment, and issues a one-time or re-downloadable entitlement. Avoid secret-bearing checkout URLs in logs. Provide receipts, refund handling, chargeback process, tax and compliance review. A browser redirect alone never proves payment.

## Delivery and autonomy
Deliver a signed, versioned expansion package and an offline-verifiable entitlement scoped to the authorized business. The human retains a copy and may re-download according to stated terms. Do not phone home for normal use or require TPT storage. Never claim SHA-256 alone proves publisher authenticity. Provide trusted public-key distribution and key-rotation/recovery policy before launch.

## Acceptance gates
1. Product details and price approved by founder.
2. Hosted checkout configured in TEST mode; no real charges.
3. Verified server-side payment event triggers exactly one fulfillment.
4. Failed/canceled/refunded transactions do not grant new entitlements.
5. Download package verified against publisher signature and compatibility manifest.
6. Companion installs sample capability only after human approval; records rollback and test evidence.
7. Offline usage continues without TPT.
8. Privacy, consumer terms, taxes, refunds, and support policies reviewed before live launch.

## Open founder decisions
Which checkout provider and existing website platform? What are the initial products and prices? What are refund/support terms? Which products are genuinely ready for sale?
