# BETA DOORS — Australian Garage Door & Automation Platform + Persistent Admin CMS

A complete Next.js 15 App Router + TypeScript rebuild of **BETA DOORS** (`https://www.betadoors.com.au/`), combining the dark atmospheric obsidian visual language of the provided DeFi Landing Page reference (`https://dribbble.com/shots/24287189-Defi-Landing-Page`) with all 44 legacy routes, e-commerce storefront flows, Australian service/warranty workflows, and a persistent server-backed Admin CMS (`/admin/`).

## Quick Start

```bash
npm install
npm run dev
```

- **Local Public Site**: `http://localhost:3000/`
- **Admin CMS Studio**: `http://localhost:3000/admin/`
- **Design System Specimen**: `http://localhost:3000/design-system/`
- **Unit & Domain Logic Tests**: `npx --yes tsx --test lib/domain-logic.test.ts`

## Key Capabilities

1. **Brand & 16:9 Hero Showcase**:
   - Uses the official uploaded `BETADOORS_Logo_Horizontal` vector geometry (`#EC008C` magenta bracket + crisp white `#F8FAFC` wordmark on dark surfaces).
   - 16:9 (`1920 × 1080`) atmospheric hero stage with interactive Play/Pause control, 4 orbital product callout nodes, `prefers-reduced-motion: reduce` support, and admin-managed revision history + one-click rollback.
2. **Full 44-Route Legacy Coverage & Broken Link Recovery**:
   - Retains all company, catalogue, product, support, account, legal, and 11 Melbourne suburb repair routes documented in `docs/route-coverage.json`.
   - Automatically normalizes and redirects known broken legacy paths (`/sectional-and-ti…oor-opener-range/` → `/sectional-and-tilt-door-opener-range/` and `/hardware/ ‎` → `/hardware/`).
3. **Single Commerce Authority Storefront**:
   - 5 shop products (`Motor Pack` with 800N / 1200N / 1500N variants at `$650` / `$690` / `$750 AUD`, `Roller Door Opener` at `$550 AUD`, `Remote Pack` at `$290 AUD`, `Receiver` at `$120 AUD`, and `Remote` at `$95 AUD`).
   - Enforces required variant selection, server-recalculated AUD GST totals, idempotent checkout submission, and capability-token order confirmation (`/order-confirmation/[token]`).
4. **Customer Support, Manuals, Estimator & Private Uploads**:
   - Downloadable PDF manuals (`/beta-doors-manuals/`), BETA Smart troubleshooting (`/beta-smart-support/`), interactive advisory Torsion Spring Estimator (`/garage-door-spring-estimator/`), Warranty Registration (`/warranty-registration/`), and Service Registration (`/register-to-service/`) with 10 MB private purchase-proof validation and RBAC-protected retrieval (`/api/private-proof/[id]`).
5. **Persistent Admin CMS (`/admin/`)**:
   - Backed by atomic server-side storage (`data/betadoors-cms-db.json` via `/api/state`) with role-based access control (`administrator`, `content_editor`, `shop_manager`, `support_staff`), Draft / Scoped Preview (`?previewToken=...`) / Publish lifecycle, and immutable audit logging.
