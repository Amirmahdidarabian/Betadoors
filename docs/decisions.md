# Architectural & Product Decisions (`docs/decisions.md`)

## 1. Visual Direction & DeFi Reference Adaptation
- **Decision**: Adopt the user-provided dark obsidian DeFi Landing Page aesthetic (`#040406` outer canvas, `#08090C` / `#0D0F12` cards, volumetric sage-platinum mist lighting, 4-corner SVG connector callouts, 4-card "Marvellous Insights" bento grid, and orbital workflow dial) while grounding all copy, telemetry, and photography/illustrations in Australian garage door and gate automation.
- **Logo Polarity**: The uploaded `BETADOORS_Logo_Horizontal.svg` uses a `#EC008C` magenta bracket and `#231F20` charcoal wordmark. On dark obsidian surfaces (`#040406`), `#231F20` fails contrast (`< 1.3:1`), so `BetaDoorsLogo.tsx` preserves the exact vector geometry and `#EC008C` magenta bracket while rendering the wordmark in crisp `#F8FAFC` on dark backgrounds and `#231F20` on light specimen previews.

## 2. Single Commerce Authority & Australian Currency/Tax
- **Decision**: Product prices, variants (`800N`, `1200N`, `1500N`), stock states, and cart/checkout totals are governed by a single server-persisted store (`data/betadoors-cms-db.json` accessed through `/api/state`) and pure domain logic (`lib/domain-logic.ts`).
- **Currency**: All monetary amounts are stored in integer Australian cents (`AUD`) with 10% GST explicitly itemized at checkout.

## 3. Draft / Scoped Preview / Publish Isolation
- **Decision**: Every CMS page stores both `publishedVersion` and an optional `draftVersion` + `previewToken`. Editing a draft in `/admin/` never mutates public pages until an `administrator` or `content_editor` clicks **Publish**, and staff can preview un-published drafts via `?previewToken=<token>`.

## 4. Private Purchase Proof Security
- **Decision**: Customer receipts uploaded on `/register-to-service/` are validated for extension/MIME (`.pdf`, `.jpg`, `.jpeg`, `.png`, `.webp`) and size (`<= 10 MB`), stored as private records, and served exclusively via `/api/private-proof/[id]`, which enforces `administrator` or `support_staff` RBAC and returns `HTTP 403` to anonymous or unauthorized users.
