import type {
  CartItem,
  ShopProduct,
  StaffRole,
} from './types';

export const ALLOWED_ENQUIRY_SERVICES = [
  'Commercial Door Service/Repairs',
  'Motor Replacement',
  'Spring Replacement',
  'Gate Repairs',
  'Garage Door Repairs',
  'New Door Installation',
  'Become a Dealer',
  'Questions about a product',
] as const;

export const MAX_PROOF_UPLOAD_BYTES = 10 * 1024 * 1024; // 10 MB per brief section 8.3 (replaces legacy 1 GB bug)
export const ALLOWED_PROOF_MIME_TYPES = [
  'application/pdf',
  'image/jpeg',
  'image/png',
];

/**
 * Validates product purchase selection and resolves authoritative server price and SKU.
 */
export function resolveProductPurchase(
  product: ShopProduct,
  variantLabel: string | null | undefined,
  quantity: number
):
  | {
      ok: true;
      unitPriceCents: number;
      sku: string;
      resolvedVariantLabel: string | null;
    }
  | { ok: false; error: string } {
  if (!Number.isInteger(quantity) || quantity < 1 || quantity > 20) {
    return {
      ok: false,
      error: 'Quantity must be a whole number between 1 and 20.',
    };
  }

  if (product.requiresVariant) {
    if (!variantLabel || !variantLabel.trim()) {
      return {
        ok: false,
        error: `Please select a valid ${product.name} force option (e.g. 800N, 1200N, or 1500N) before adding to cart.`,
      };
    }
    const matched = product.variants.find(
      (v) => v.label.toUpperCase() === variantLabel.trim().toUpperCase()
    );
    if (!matched) {
      return {
        ok: false,
        error: `Selected option "${variantLabel}" is not valid for ${product.name}.`,
      };
    }
    if (matched.stockCount < quantity) {
      return {
        ok: false,
        error: `Insufficient stock for ${product.name} (${matched.label}). Only ${matched.stockCount} available.`,
      };
    }
    return {
      ok: true,
      unitPriceCents: matched.priceCents,
      sku: matched.sku,
      resolvedVariantLabel: matched.label,
    };
  }

  if (product.stockCount < quantity) {
    return {
      ok: false,
      error: `Insufficient stock for ${product.name}. Only ${product.stockCount} available.`,
    };
  }

  return {
    ok: true,
    unitPriceCents: product.priceCents,
    sku: product.sku,
    resolvedVariantLabel: null,
  };
}

/**
 * Calculates authoritative server-side cart totals in AUD minor units (cents).
 * Australian GST is 1/11th of GST-inclusive price.
 */
export function calculateCartTotals(items: CartItem[]): {
  subtotalCents: number;
  shippingCents: number;
  gstIncludedCents: number;
  totalCents: number;
  itemCount: number;
} {
  const subtotalCents = items.reduce(
    (sum, item) => sum + item.unitPriceCents * item.quantity,
    0
  );
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  if (subtotalCents === 0) {
    return {
      subtotalCents: 0,
      shippingCents: 0,
      gstIncludedCents: 0,
      totalCents: 0,
      itemCount: 0,
    };
  }

  // Standard Melbourne/Australia flat freight $25 AUD, free over $500 AUD (provisional sandbox rule)
  const shippingCents = subtotalCents >= 50000 ? 0 : 2500;
  const totalCents = subtotalCents + shippingCents;
  const gstIncludedCents = Math.round(totalCents / 11);

  return {
    subtotalCents,
    shippingCents,
    gstIncludedCents,
    totalCents,
    itemCount,
  };
}

export function formatAudCents(cents: number): string {
  const toman = Math.round(cents * 200);
  return `${toman.toLocaleString('fa-IR')} تومان`;
}

/**
 * Validates public enquiry payload. Enforces explicit selection of serviceType
 * (preventing the legacy silent default to Commercial Door Service/Repairs).
 */
export function validateEnquiryInput(input: {
  name?: string;
  suburb?: string;
  email?: string;
  phone?: string;
  serviceType?: string;
  message?: string;
}): { ok: true } | { ok: false; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  if (!input.name || input.name.trim().length < 2) {
    errors.name = 'لطفاً نام و نام خانوادگی خود را وارد کنید.';
  }
  if (!input.suburb || input.suburb.trim().length < 2) {
    errors.suburb = 'لطفاً نام شهر یا محله خود را وارد کنید.';
  }
  if (!input.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email.trim())) {
    errors.email = 'لطفاً یک آدرس ایمیل معتبر وارد کنید.';
  }
  if (!input.phone || !/^[0-9+\-\s()۰-۹]{8,18}$/.test(input.phone.trim())) {
    errors.phone = 'لطفاً یک شماره تماس معتبر وارد کنید.';
  }
  if (
    !input.serviceType ||
    !ALLOWED_ENQUIRY_SERVICES.includes(
      input.serviceType as (typeof ALLOWED_ENQUIRY_SERVICES)[number]
    )
  ) {
    errors.serviceType = 'لطفاً موضوع درخواست یا نوع خدمات را از لیست انتخاب کنید.';
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }
  return { ok: true };
}

/**
 * Validates Australian date format dd/mm/yyyy or ISO yyyy-mm-dd and normalises to dd/mm/yyyy.
 */
export function normalizeAustralianDate(dateStr: string): string | null {
  const trimmed = (dateStr || '').trim();
  const dmyMatch = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(trimmed);
  if (dmyMatch) {
    const day = Number(dmyMatch[1]);
    const month = Number(dmyMatch[2]);
    const year = Number(dmyMatch[3]);
    if (day >= 1 && day <= 31 && month >= 1 && month <= 12 && year >= 1990 && year <= 2035) {
      return `${dmyMatch[1]}/${dmyMatch[2]}/${dmyMatch[3]}`;
    }
    return null;
  }
  const isoMatch = /^(\d{4})-(\d{2})-(\d{2})$/.exec(trimmed);
  if (isoMatch) {
    const year = Number(isoMatch[1]);
    const month = Number(isoMatch[2]);
    const day = Number(isoMatch[3]);
    if (day >= 1 && day <= 31 && month >= 1 && month <= 12 && year >= 1990 && year <= 2035) {
      return `${isoMatch[3]}/${isoMatch[2]}/${isoMatch[1]}`;
    }
  }
  return null;
}

/**
 * Validates customer purchase proof file metadata (max 10 MB, PDF/JPEG/PNG).
 */
export function validatePurchaseProofUpload(file: {
  fileName: string;
  mimeType: string;
  sizeBytes: number;
}): { ok: true } | { ok: false; error: string } {
  if (!file.fileName || file.fileName.includes('..') || file.fileName.includes('/')) {
    return { ok: false, error: 'Invalid file name.' };
  }
  if (!ALLOWED_PROOF_MIME_TYPES.includes(file.mimeType)) {
    return {
      ok: false,
      error: 'Unsupported file format. Only PDF, JPEG, and PNG files are permitted.',
    };
  }
  if (file.sizeBytes <= 0 || file.sizeBytes > MAX_PROOF_UPLOAD_BYTES) {
    return {
      ok: false,
      error: 'File exceeds the 10 MB maximum upload limit (legacy 1 GB limit is prohibited).',
    };
  }
  return { ok: true };
}

/**
 * Validates 1920x1080 / 16:9 hero media dimensions per Section 7 & 8.3.
 */
export function validateHeroMediaDimensions(
  width: number,
  height: number
): {
  is16By9: boolean;
  isExact1080p: boolean;
  warning: string | null;
} {
  if (width <= 0 || height <= 0) {
    return {
      is16By9: false,
      isExact1080p: false,
      warning: 'Invalid video dimensions.',
    };
  }
  const ratio = width / height;
  const targetRatio = 16 / 9;
  const is16By9 = Math.abs(ratio - targetRatio) <= 0.02;
  const isExact1080p = width === 1920 && height === 1080;

  if (!is16By9) {
    return {
      is16By9: false,
      isExact1080p: false,
      warning: `Rejected: Aspect ratio (${width}×${height}) is not 16:9. Hero media must preserve a 16:9 landscape frame without cropping.`,
    };
  }
  if (!isExact1080p) {
    return {
      is16By9: true,
      isExact1080p: false,
      warning: `Notice: Dimensions (${width}×${height}) are 16:9 compatible, though 1920×1080 is the master target resolution.`,
    };
  }
  return {
    is16By9: true,
    isExact1080p: true,
    warning: null,
  };
}

/**
 * RBAC and Object Ownership checks (Section 8.4 & 14.1).
 */
export function canPerformAdminAction(
  role: StaffRole,
  action:
    | 'view_dashboard'
    | 'edit_brand_hero'
    | 'publish_content'
    | 'edit_draft_content'
    | 'manage_shop'
    | 'manage_enquiries'
    | 'view_private_proof'
    | 'manage_roles'
): boolean {
  switch (role) {
    case 'administrator':
      return true;
    case 'content_editor':
      return (
        action === 'view_dashboard' ||
        action === 'edit_brand_hero' ||
        action === 'edit_draft_content' ||
        action === 'publish_content'
      );
    case 'shop_manager':
      return action === 'view_dashboard' || action === 'manage_shop';
    case 'support_staff':
      return (
        action === 'view_dashboard' ||
        action === 'manage_enquiries' ||
        action === 'view_private_proof'
      );
    case 'customer':
    case 'guest':
    default:
      return false;
  }
}

export function canAccessOrderRecord(
  actor: { role: StaffRole; userId: string | null },
  order: { customerId: string | null; confirmationToken: string },
  providedToken?: string | null
): boolean {
  if (actor.role === 'administrator' || actor.role === 'shop_manager') {
    return true;
  }
  if (providedToken && providedToken === order.confirmationToken) {
    return true;
  }
  if (
    actor.role === 'customer' &&
    actor.userId &&
    order.customerId &&
    actor.userId === order.customerId
  ) {
    return true;
  }
  return false;
}

/**
 * Escapes CSV cells against spreadsheet formula injection (=, +, -, @).
 */
export function sanitizeCsvCell(value: string): string {
  const clean = String(value ?? '').replace(/"/g, '""');
  if (/^[=+\-@]/.test(clean.trim())) {
    return `"'${clean}"`;
  }
  return `"${clean}"`;
}
