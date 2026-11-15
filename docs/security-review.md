# Application Security Review & Threat Model (`docs/security-review.md`)

## 1. Role-Based Access Control (RBAC) Matrix
Implemented in `lib/domain-logic.ts` (`canPerformAdminAction`) and enforced in `/api/state` and `/api/private-proof/[id]`:

| Action | `administrator` | `content_editor` | `shop_manager` | `support_staff` | `customer_*` / `guest` |
| :--- | :---: | :---: | :---: | :---: | :---: |
| `manage_users_roles` | ALLOW | DENY (403) | DENY (403) | DENY (403) | DENY (403) |
| `edit_brand_hero` | ALLOW | ALLOW | DENY (403) | DENY (403) | DENY (403) |
| `edit_publish_pages` | ALLOW | ALLOW | DENY (403) | DENY (403) | DENY (403) |
| `manage_shop_products` | ALLOW | DENY (403) | ALLOW | DENY (403) | DENY (403) |
| `view_orders` | ALLOW | DENY (403) | ALLOW | ALLOW | Own orders only |
| `triage_enquiries_warranties` | ALLOW | DENY (403) | DENY (403) | ALLOW | DENY (403) |
| `view_private_proof` | ALLOW | DENY (403) | DENY (403) | ALLOW | DENY (403) |

## 2. Broken Object Level Authorization (BOLA / IDOR) Prevention
- Order records are protected by `canAccessOrderRecord(actorRole, actorCustomerId, order, providedToken)`:
  - Customer A (`customer_alice`) cannot view Customer B's (`customer_bob`) order without the cryptographic capability token or staff privileges.
- Private purchase proof files (`/api/private-proof/[id]`) require `view_private_proof` permission and set `Cache-Control: private, no-store`.

## 3. Input Validation, Upload Hardening & CSV Formula Injection Prevention
- **Enquiry / Warranty / Service Forms**: Server-side validation rejects empty required fields, malformed emails, and invalid Australian phone numbers (`1300`, `1800`, `04xx`, `02/03/07/08`).
- **Australian Date Normalization**: `normalizeAustralianDate()` converts `DD/MM/YYYY` and `YYYY-MM-DD` to canonical ISO dates and rejects impossible calendar dates (e.g., `31/02/2025`).
- **Upload Allowlist**: `validatePurchaseProofUpload()` enforces a 10 MB ceiling, blocks double-extension payloads (`.pdf.exe`, `.jpg.php`), and verifies MIME/extension alignment.
- **CSV Export Sanitization**: `sanitizeCsvCell()` prefixes leading `=`, `+`, `-`, `@`, `\t`, or `\r` with a single quote (`'`) to neutralize spreadsheet formula injection.
