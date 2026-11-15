import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateCartTotals,
  canAccessOrderRecord,
  canPerformAdminAction,
  normalizeAustralianDate,
  resolveProductPurchase,
  sanitizeCsvCell,
  validateEnquiryInput,
  validateHeroMediaDimensions,
  validatePurchaseProofUpload,
} from './domain-logic';
import type { ShopProduct } from './types';

const mockMotorPack: ShopProduct = {
  id: 'shop_motor_pack',
  slug: 'motor-pack',
  path: '/product/motor-pack/',
  name: 'Panel Door Motor Pack',
  sku: 'BD-MP-VAR',
  shortDescription: 'Panel door opener motor pack with WiFi control, photocell sensors, and WiFi camera.',
  description: 'Complete panel and sectional garage door motor pack.',
  categorySlug: 'uncategorized',
  priceCents: 65000,
  maxPriceCents: 73000,
  currency: 'AUD',
  stockCount: 15,
  requiresVariant: true,
  variants: [
    { id: 'v_800', label: '800N', sku: 'BD-MP-800N', priceCents: 65000, stockCount: 6 },
    { id: 'v_1200', label: '1200N', sku: 'BD-MP-1200N', priceCents: 69000, stockCount: 5 },
    { id: 'v_1500', label: '1500N', sku: 'BD-MP-1500N', priceCents: 73000, stockCount: 4 },
  ],
  features: ['WiFi control', 'Photocell sensors', 'WiFi camera'],
  packContents: ['Motor unit', 'Photocell safety beams', 'WiFi smart camera'],
  specs: [],
  imageSvgType: 'motor_pack',
  relatedProductIds: ['shop_receiver', 'shop_remote'],
  reviews: [],
};

test('resolveProductPurchase enforces required variant for Panel Door Motor Pack', () => {
  const missingVariant = resolveProductPurchase(mockMotorPack, null, 1);
  assert.equal(missingVariant.ok, false);

  const valid1200N = resolveProductPurchase(mockMotorPack, '1200N', 2);
  assert.equal(valid1200N.ok, true);
  if (valid1200N.ok) {
    assert.equal(valid1200N.unitPriceCents, 69000);
    assert.equal(valid1200N.sku, 'BD-MP-1200N');
    assert.equal(valid1200N.resolvedVariantLabel, '1200N');
  }
});

test('calculateCartTotals computes minor-unit cents, free shipping threshold, and 1/11th GST', () => {
  const smallCart = calculateCartTotals([
    {
      productId: 'shop_remote',
      productSlug: 'remote',
      name: 'Remote',
      variantLabel: null,
      sku: 'BD-REM-01',
      unitPriceCents: 6000,
      quantity: 1,
    },
  ]);
  assert.equal(smallCart.subtotalCents, 6000);
  assert.equal(smallCart.shippingCents, 2500);
  assert.equal(smallCart.totalCents, 8500);
  assert.equal(smallCart.gstIncludedCents, Math.round(8500 / 11));

  const freeShippingCart = calculateCartTotals([
    {
      productId: 'shop_motor_pack',
      productSlug: 'motor-pack',
      name: 'Panel Door Motor Pack',
      variantLabel: '1200N',
      sku: 'BD-MP-1200N',
      unitPriceCents: 69000,
      quantity: 1,
    },
  ]);
  assert.equal(freeShippingCart.subtotalCents, 69000);
  assert.equal(freeShippingCart.shippingCents, 0);
  assert.equal(freeShippingCart.totalCents, 69000);
});

test('validateEnquiryInput rejects unselected service topic and validates Australian fields', () => {
  const invalid = validateEnquiryInput({
    name: 'Liam Carter',
    suburb: 'Campbellfield',
    email: 'liam@example.com.au',
    phone: '0412 345 678',
    serviceType: '', // unselected placeholder must fail
  });
  assert.equal(invalid.ok, false);

  const valid = validateEnquiryInput({
    name: 'Liam Carter',
    suburb: 'Campbellfield',
    email: 'liam@example.com.au',
    phone: '0412 345 678',
    serviceType: 'Garage Door Repairs',
  });
  assert.equal(valid.ok, true);
});

test('validatePurchaseProofUpload enforces 10MB cap and blocks path traversal or invalid MIME', () => {
  const overSize = validatePurchaseProofUpload({
    fileName: 'invoice.pdf',
    mimeType: 'application/pdf',
    sizeBytes: 15 * 1024 * 1024, // 15 MB > 10 MB limit
  });
  assert.equal(overSize.ok, false);

  const badMime = validatePurchaseProofUpload({
    fileName: 'payload.html',
    mimeType: 'text/html',
    sizeBytes: 2048,
  });
  assert.equal(badMime.ok, false);

  const validProof = validatePurchaseProofUpload({
    fileName: 'tax-invoice-3061.pdf',
    mimeType: 'application/pdf',
    sizeBytes: 420 * 1024,
  });
  assert.equal(validProof.ok, true);
});

test('validateHeroMediaDimensions enforces 16:9 landscape aspect ratio without cropping', () => {
  const portrait = validateHeroMediaDimensions(1080, 1920);
  assert.equal(portrait.is16By9, false);

  const master1080p = validateHeroMediaDimensions(1920, 1080);
  assert.equal(master1080p.is16By9, true);
  assert.equal(master1080p.isExact1080p, true);
  assert.equal(master1080p.warning, null);
});

test('RBAC and horizontal customer order isolation enforce least privilege', () => {
  assert.equal(canPerformAdminAction('support_staff', 'manage_roles'), false);
  assert.equal(canPerformAdminAction('support_staff', 'manage_enquiries'), true);
  assert.equal(canPerformAdminAction('content_editor', 'view_private_proof'), false);
  assert.equal(canPerformAdminAction('administrator', 'manage_roles'), true);

  const order = { customerId: 'cust_alice', confirmationToken: 'tok_secret_99' };
  // Customer B cannot read Customer A's order
  assert.equal(
    canAccessOrderRecord({ role: 'customer', userId: 'cust_bob' }, order, null),
    false
  );
  // Customer A can read own order
  assert.equal(
    canAccessOrderRecord({ role: 'customer', userId: 'cust_alice' }, order, null),
    true
  );
  // Guest with valid confirmation token can read order confirmation
  assert.equal(
    canAccessOrderRecord({ role: 'guest', userId: null }, order, 'tok_secret_99'),
    true
  );
});

test('normalizeAustralianDate and sanitizeCsvCell handle edge cases safely', () => {
  assert.equal(normalizeAustralianDate('14/11/2026'), '14/11/2026');
  assert.equal(normalizeAustralianDate('2026-11-14'), '14/11/2026');
  assert.equal(normalizeAustralianDate('99/99/2026'), null);

  assert.equal(sanitizeCsvCell('=CMD|" /C calc"!A0'), `"'=CMD|"" /C calc""!A0"`);
});
