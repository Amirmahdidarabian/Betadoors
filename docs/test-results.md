# Verification & Test Evidence (`docs/test-results.md`)

## 1. Automated Domain & Security Unit Tests (`lib/domain-logic.test.ts`)
Covers:
- Variable (`motor-pack` 800N / 1200N / 1500N) and simple product purchase validation + out-of-stock rejection.
- Server-side AUD cents cart calculation and 10% GST extraction.
- Enquiry form validation & Australian phone number format verification.
- Australian `DD/MM/YYYY` calendar validation and leap-year edge cases.
- 10 MB private purchase-proof file upload validation and executable double-extension rejection.
- `1920 × 1080` (`16:9`) hero media dimension verification.
- RBAC authorization matrix (`administrator`, `content_editor`, `shop_manager`, `support_staff`, `guest`) and BOLA/IDOR order access protection.
- CSV export formula-injection sanitization.

## 2. Browser & Route Acceptance Matrix
- **Homepage (`/`)**: Verified 16:9 hero stage, Play/Pause control, 4 corner node callouts, "Engineered Insights" 4-card bento grid, "BETA Smart Ecosystem" orbital dial, and 11 Melbourne local service hubs.
- **Storefront (`/shop/`, `/product/motor-pack/`, `/cart/`, `/checkout/`)**: Verified variant requirement enforcement, cart total calculation, conditional sandbox checkout, and capability-token order confirmation.
- **Support & Manuals (`/beta-doors-manuals/`, `/warranty-registration/`, `/register-to-service/`, `/garage-door-spring-estimator/`)**: Verified downloadable `application/pdf` manuals, DD/MM/YYYY date validation, 10 MB private proof upload, and spring estimator safety guidance.
- **Admin CMS (`/admin/`)**: Verified brand/hero settings, 16:9 hero revision rollback, Draft / Scoped Preview (`?previewToken=...`) / Publish lifecycle, product price/stock authority, and RBAC permission boundaries.
