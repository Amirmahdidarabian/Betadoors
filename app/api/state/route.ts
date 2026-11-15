import { NextRequest, NextResponse } from 'next/server';
import {
  appendAuditLog,
  readCmsDb,
  writeCmsDb,
} from '@/lib/cms-store';
import {
  calculateCartTotals,
  canAccessOrderRecord,
  canPerformAdminAction,
  normalizeAustralianDate,
  resolveProductPurchase,
  validateEnquiryInput,
  validateHeroMediaDimensions,
  validatePurchaseProofUpload,
} from '@/lib/domain-logic';
import type {
  CartItem,
  PageSectionBlock,
  StaffRole,
} from '@/lib/types';

function resolveActor(req: NextRequest, bodyActor?: { role?: StaffRole; email?: string; userId?: string }) {
  const headerRole = (req.headers.get('x-beta-role') || bodyActor?.role || 'guest') as StaffRole;
  const headerEmail = req.headers.get('x-beta-email') || bodyActor?.email || 'guest@local';
  const headerUserId = req.headers.get('x-beta-user-id') || bodyActor?.userId || null;
  return {
    role: headerRole,
    email: headerEmail,
    userId: headerUserId,
  };
}

export async function GET(req: NextRequest) {
  const db = readCmsDb();
  const url = new URL(req.url);
  const previewToken = url.searchParams.get('previewToken');
  const orderToken = url.searchParams.get('orderToken');
  const actor = resolveActor(req);

  const canViewAdmin = canPerformAdminAction(actor.role, 'view_dashboard');

  // Filter orders by ownership or staff role
  const visibleOrders = db.orders.filter((ord) =>
    canAccessOrderRecord(
      { role: actor.role, userId: actor.userId },
      ord,
      orderToken
    )
  );

  return NextResponse.json({
    brand: db.brand,
    pages: db.pages,
    products: db.products,
    manuals: db.manuals,
    redirects: db.redirects,
    orders: visibleOrders,
    enquiries: canViewAdmin ? db.enquiries : [],
    warranties: canViewAdmin ? db.warranties : [],
    serviceRegistrations: canViewAdmin ? db.serviceRegistrations : [],
    auditLog: canViewAdmin ? db.auditLog : [],
    activePreview: previewToken && db.previewTokens[previewToken]
      ? db.previewTokens[previewToken]
      : null,
  });
}

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();
    const action = payload?.action as string;
    const actor = resolveActor(req, payload?.actor);
    const db = readCmsDb();

    // 1. Public Enquiry Submission
    if (action === 'submit_enquiry') {
      const validation = validateEnquiryInput(payload.data || {});
      if (!validation.ok) {
        return NextResponse.json(
          { ok: false, error: 'Validation failed', fieldErrors: validation.errors },
          { status: 400 }
        );
      }
      const refCode = `ENQ-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      const record = {
        id: `enq_${Date.now()}`,
        referenceCode: refCode,
        name: String(payload.data.name).trim(),
        suburb: String(payload.data.suburb).trim(),
        company: String(payload.data.company || '').trim(),
        email: String(payload.data.email).trim(),
        phone: String(payload.data.phone).trim(),
        serviceType: String(payload.data.serviceType).trim(),
        message: String(payload.data.message || '').trim(),
        sourcePagePath: String(payload.data.sourcePagePath || '/'),
        productContext: payload.data.productContext ? String(payload.data.productContext) : undefined,
        calculatorContext: payload.data.calculatorContext ? String(payload.data.calculatorContext) : undefined,
        status: 'new' as const,
        assignedTo: null,
        internalNotes: [],
        createdAt: new Date().toISOString(),
      };
      db.enquiries.unshift(record);
      appendAuditLog(db, {
        actorEmail: record.email,
        actorRole: 'guest',
        action: 'ENQUIRY_SUBMITTED',
        entityType: 'Enquiry',
        entityId: record.id,
        summary: `New enquiry ${refCode} (${record.serviceType}) from ${record.suburb}`,
      });
      writeCmsDb(db);
      return NextResponse.json({ ok: true, referenceCode: refCode, record }, { status: 201 });
    }

    // 2. Public Warranty Registration
    if (action === 'submit_warranty') {
      const d = payload.data || {};
      const normalizedDate = normalizeAustralianDate(String(d.installationDate || ''));
      if (
        !d.serialNumber?.trim() ||
        !d.dealerCode?.trim() ||
        !normalizedDate ||
        !d.firstName?.trim() ||
        !d.lastName?.trim() ||
        !d.email?.includes('@') ||
        !d.phone?.trim() ||
        !d.street?.trim() ||
        !d.suburb?.trim() ||
        !d.state?.trim() ||
        !d.postcode?.trim()
      ) {
        return NextResponse.json(
          {
            ok: false,
            error:
              'Please complete all required warranty fields including a valid installation date (dd/mm/yyyy).',
          },
          { status: 400 }
        );
      }
      const refCode = `WAR-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      const record = {
        id: `war_${Date.now()}`,
        referenceCode: refCode,
        serialNumber: String(d.serialNumber).trim(),
        dealerCode: String(d.dealerCode).trim(),
        installationDate: normalizedDate,
        firstName: String(d.firstName).trim(),
        lastName: String(d.lastName).trim(),
        email: String(d.email).trim(),
        phone: String(d.phone).trim(),
        street: String(d.street).trim(),
        addressLine2: String(d.addressLine2 || '').trim(),
        suburb: String(d.suburb).trim(),
        state: String(d.state).trim(),
        postcode: String(d.postcode).trim(),
        country: String(d.country || 'Australia').trim(),
        status: 'submitted' as const,
        assignedTo: null,
        internalNotes: ['Submitted via public warranty form; pending serial/dealer verification.'],
        createdAt: new Date().toISOString(),
      };
      db.warranties.unshift(record);
      appendAuditLog(db, {
        actorEmail: record.email,
        actorRole: 'guest',
        action: 'WARRANTY_SUBMITTED',
        entityType: 'WarrantyRegistration',
        entityId: record.id,
        summary: `Warranty registration ${refCode} for serial ${record.serialNumber}`,
      });
      writeCmsDb(db);
      return NextResponse.json({ ok: true, referenceCode: refCode, record }, { status: 201 });
    }

    // 3. Public Service Registration with Private Proof Upload Validation
    if (action === 'submit_service_registration') {
      const d = payload.data || {};
      const normalizedDate = normalizeAustralianDate(String(d.installationDate || ''));
      if (
        !d.serialNumber?.trim() ||
        !normalizedDate ||
        !d.firstName?.trim() ||
        !d.lastName?.trim() ||
        !d.email?.includes('@') ||
        !d.phone?.trim() ||
        !d.street?.trim() ||
        !d.suburb?.trim() ||
        !d.state?.trim() ||
        !d.postcode?.trim() ||
        !d.file
      ) {
        return NextResponse.json(
          {
            ok: false,
            error:
              'All required fields, valid date (dd/mm/yyyy), and a proof of purchase file are required.',
          },
          { status: 400 }
        );
      }

      const fileCheck = validatePurchaseProofUpload({
        fileName: String(d.file.fileName || ''),
        mimeType: String(d.file.mimeType || ''),
        sizeBytes: Number(d.file.sizeBytes || 0),
      });
      if (!fileCheck.ok) {
        return NextResponse.json({ ok: false, error: fileCheck.error }, { status: 400 });
      }

      const refCode = `SRV-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      const attId = `att_private_${Date.now()}`;
      const record = {
        id: `srv_${Date.now()}`,
        referenceCode: refCode,
        serialNumber: String(d.serialNumber).trim(),
        installationDate: normalizedDate,
        firstName: String(d.firstName).trim(),
        lastName: String(d.lastName).trim(),
        email: String(d.email).trim(),
        phone: String(d.phone).trim(),
        street: String(d.street).trim(),
        addressLine2: String(d.addressLine2 || '').trim(),
        suburb: String(d.suburb).trim(),
        state: String(d.state).trim(),
        postcode: String(d.postcode).trim(),
        country: String(d.country || 'Australia').trim(),
        proofAttachment: {
          id: attId,
          fileName: String(d.file.fileName).trim(),
          mimeType: String(d.file.mimeType),
          sizeBytes: Number(d.file.sizeBytes),
          privateStorageKey: `private/proofs/2026/${attId}_${String(d.file.fileName).replace(/[^a-zA-Z0-9._-]/g, '_')}`,
          uploadedAt: new Date().toISOString(),
        },
        status: 'submitted' as const,
        assignedTo: null,
        internalNotes: ['Private purchase proof quarantined & validated (< 10 MB policy).'],
        createdAt: new Date().toISOString(),
      };
      db.serviceRegistrations.unshift(record);
      appendAuditLog(db, {
        actorEmail: record.email,
        actorRole: 'guest',
        action: 'SERVICE_REGISTRATION_SUBMITTED',
        entityType: 'ServiceRequest',
        entityId: record.id,
        summary: `Service registration ${refCode} with private proof (${record.proofAttachment.fileName})`,
      });
      writeCmsDb(db);
      return NextResponse.json({ ok: true, referenceCode: refCode, record }, { status: 201 });
    }

    // 4. Authoritative Server-Side Order Creation
    if (action === 'submit_order') {
      const d = payload.data || {};
      const rawItems = Array.isArray(d.items) ? d.items : [];
      if (rawItems.length === 0) {
        return NextResponse.json({ ok: false, error: 'Cart is empty.' }, { status: 400 });
      }
      if (
        !d.customerName?.trim() ||
        !d.customerEmail?.includes('@') ||
        !d.customerPhone?.trim() ||
        !d.shippingAddress?.street?.trim() ||
        !d.shippingAddress?.suburb?.trim() ||
        !d.shippingAddress?.state?.trim() ||
        !d.shippingAddress?.postcode?.trim()
      ) {
        return NextResponse.json(
          { ok: false, error: 'Please complete all customer and Australian delivery address fields.' },
          { status: 400 }
        );
      }

      const idempotencyKey = String(d.idempotencyKey || `idem_${Date.now()}`);
      const existingOrder = db.orders.find((o) => o.idempotencyKey === idempotencyKey);
      if (existingOrder) {
        return NextResponse.json({ ok: true, order: existingOrder, deduplicated: true });
      }

      // Server-side price & stock validation
      const verifiedItems: CartItem[] = [];
      for (const reqItem of rawItems) {
        const product = db.products.find((p) => p.id === reqItem.productId || p.slug === reqItem.productSlug);
        if (!product) {
          return NextResponse.json(
            { ok: false, error: `Unknown product in cart.` },
            { status: 400 }
          );
        }
        const check = resolveProductPurchase(
          product,
          reqItem.variantLabel,
          Number(reqItem.quantity)
        );
        if (!check.ok) {
          return NextResponse.json({ ok: false, error: check.error }, { status: 400 });
        }
        // Decrement authoritative stock
        if (product.requiresVariant && check.resolvedVariantLabel) {
          const v = product.variants.find((va) => va.label === check.resolvedVariantLabel);
          if (v) v.stockCount -= Number(reqItem.quantity);
          product.stockCount = product.variants.reduce((acc, va) => acc + va.stockCount, 0);
        } else {
          product.stockCount -= Number(reqItem.quantity);
        }

        verifiedItems.push({
          productId: product.id,
          productSlug: product.slug,
          name: product.name,
          variantLabel: check.resolvedVariantLabel,
          sku: check.sku,
          unitPriceCents: check.unitPriceCents,
          quantity: Number(reqItem.quantity),
        });
      }

      const totals = calculateCartTotals(verifiedItems);
      const orderNumber = `BD-${1000 + db.orders.length + 1}`;
      const confirmationToken = `tok_${orderNumber.toLowerCase()}_${Math.random().toString(36).slice(2, 10)}`;

      const newOrder = {
        id: `ord_${Date.now()}`,
        orderNumber,
        confirmationToken,
        customerId: actor.userId,
        customerEmail: String(d.customerEmail).trim(),
        customerName: String(d.customerName).trim(),
        customerPhone: String(d.customerPhone).trim(),
        shippingAddress: {
          street: String(d.shippingAddress.street).trim(),
          suburb: String(d.shippingAddress.suburb).trim(),
          state: String(d.shippingAddress.state).trim(),
          postcode: String(d.shippingAddress.postcode).trim(),
        },
        items: verifiedItems,
        subtotalCents: totals.subtotalCents,
        shippingCents: totals.shippingCents,
        gstIncludedCents: totals.gstIncludedCents,
        totalCents: totals.totalCents,
        paymentStatus: 'paid_sandbox' as const,
        fulfilmentStatus: 'processing' as const,
        idempotencyKey,
        createdAt: new Date().toISOString(),
      };

      db.orders.unshift(newOrder);
      appendAuditLog(db, {
        actorEmail: newOrder.customerEmail,
        actorRole: actor.role,
        action: 'ORDER_CREATED_SANDBOX',
        entityType: 'Order',
        entityId: newOrder.id,
        summary: `Order ${orderNumber} placed ($${(totals.totalCents / 100).toFixed(2)} AUD incl. GST)`,
      });
      writeCmsDb(db);
      return NextResponse.json({ ok: true, order: newOrder }, { status: 201 });
    }

    // 5. Submit Product Review (Moderated)
    if (action === 'submit_product_review') {
      const { productSlug, authorName, rating, comment } = payload.data || {};
      const product = db.products.find((p) => p.slug === productSlug);
      if (!product || !authorName?.trim() || !comment?.trim()) {
        return NextResponse.json({ ok: false, error: 'Invalid review details.' }, { status: 400 });
      }
      product.reviews.unshift({
        id: `rev_${Date.now()}`,
        authorName: String(authorName).trim(),
        rating: Math.min(5, Math.max(1, Number(rating) || 5)),
        comment: String(comment).trim(),
        createdAt: new Date().toISOString().slice(0, 10),
        status: 'pending',
      });
      writeCmsDb(db);
      return NextResponse.json({ ok: true });
    }

    // --- ADMIN PROTECTED ACTIONS ---

    if (action === 'update_brand_hero') {
      if (!canPerformAdminAction(actor.role, 'edit_brand_hero')) {
        return NextResponse.json(
          { ok: false, error: `Role "${actor.role}" is not permitted to edit Brand & Hero settings.` },
          { status: 403 }
        );
      }
      const d = payload.data || {};
      const width = Number(d.heroWidth || db.brand.heroConfig.width);
      const height = Number(d.heroHeight || db.brand.heroConfig.height);
      const dimCheck = validateHeroMediaDimensions(width, height);
      if (!dimCheck.is16By9) {
        return NextResponse.json({ ok: false, error: dimCheck.warning }, { status: 400 });
      }

      if (d.siteName !== undefined) db.brand.siteName = String(d.siteName).trim();
      if (d.logoUrl !== undefined) db.brand.logoUrl = String(d.logoUrl).trim();
      if (typeof d.useCustomSvgLogo === 'boolean') db.brand.useCustomSvgLogo = d.useCustomSvgLogo;
      if (d.primaryAccentHex) db.brand.primaryAccentHex = String(d.primaryAccentHex).trim();
      if (d.displayFontFamily) db.brand.displayFontFamily = String(d.displayFontFamily).trim();
      if (d.customFontWoff2Url !== undefined) db.brand.customFontWoff2Url = d.customFontWoff2Url;
      if (typeof d.customFontLicenseVerified === 'boolean') {
        db.brand.customFontLicenseVerified = d.customFontLicenseVerified;
      }
      if (d.motionPreset) db.brand.motionPreset = d.motionPreset;
      if (d.announcementText !== undefined) db.brand.announcementText = String(d.announcementText);
      if (d.phone !== undefined) db.brand.phone = String(d.phone).trim();
      if (d.email !== undefined) db.brand.email = String(d.email).trim();
      if (d.headOffice !== undefined) db.brand.headOffice = String(d.headOffice).trim();
      if (d.footerTagline !== undefined) db.brand.footerTagline = String(d.footerTagline).trim();
      if (d.footerDescription !== undefined) db.brand.footerDescription = String(d.footerDescription).trim();
      if (d.navLabels && typeof d.navLabels === 'object') {
        db.brand.navLabels = { ...(db.brand.navLabels || {}), ...(d.navLabels as Record<string, string>) };
      }
      if (Array.isArray(d.categoryCards)) {
        db.brand.categoryCards = d.categoryCards;
      }

      const nextRev = db.brand.heroConfig.revisionNumber + 1;
      if (d.heroHeadline !== undefined) db.brand.heroConfig.headline = String(d.heroHeadline).trim();
      if (d.heroSubheadline !== undefined) db.brand.heroConfig.subheadline = String(d.heroSubheadline).trim();
      if (d.heroVideoUrl !== undefined) db.brand.heroConfig.videoUrl = String(d.heroVideoUrl).trim();
      if (d.heroPosterUrl !== undefined) db.brand.heroConfig.posterUrl = String(d.heroPosterUrl).trim();
      if (d.primaryCtaLabel !== undefined) db.brand.heroConfig.primaryCtaLabel = String(d.primaryCtaLabel).trim();
      if (d.primaryCtaHref !== undefined) db.brand.heroConfig.primaryCtaHref = String(d.primaryCtaHref).trim();
      if (d.secondaryCtaLabel !== undefined) db.brand.heroConfig.secondaryCtaLabel = String(d.secondaryCtaLabel).trim();
      if (d.secondaryCtaHref !== undefined) db.brand.heroConfig.secondaryCtaHref = String(d.secondaryCtaHref).trim();
      db.brand.heroConfig.width = width;
      db.brand.heroConfig.height = height;
      db.brand.heroConfig.revisionNumber = nextRev;
      db.brand.heroConfig.history.unshift({
        revisionNumber: nextRev,
        updatedAt: new Date().toISOString(),
        updatedBy: actor.email,
        headline: db.brand.heroConfig.headline,
        videoUrl: db.brand.heroConfig.videoUrl,
        posterUrl: db.brand.heroConfig.posterUrl,
      });

      appendAuditLog(db, {
        actorEmail: actor.email,
        actorRole: actor.role,
        action: 'BRAND_HERO_PUBLISHED',
        entityType: 'BrandSettings',
        entityId: 'global',
        summary: `Updated Brand/Hero settings to Revision #${nextRev} (${width}×${height} 16:9 verified)`,
      });
      writeCmsDb(db);
      return NextResponse.json({ ok: true, brand: db.brand, warning: dimCheck.warning });
    }

    if (action === 'update_site_copy_overrides') {
      if (!canPerformAdminAction(actor.role, 'edit_draft_content')) {
        return NextResponse.json({ ok: false, error: 'Forbidden' }, { status: 403 });
      }
      const d = payload.data || {};
      if (d.overrides && typeof d.overrides === 'object') {
        db.brand.siteCopyOverrides = {
          ...(db.brand.siteCopyOverrides || {}),
          ...(d.overrides as Record<string, string>),
        };
      }
      if (d.pagePath && d.pageHeader && typeof d.pageHeader === 'object') {
        const cleanPath = String(d.pagePath);
        db.brand.pageHeaders = {
          ...(db.brand.pageHeaders || {}),
          [cleanPath]: {
            ...(db.brand.pageHeaders?.[cleanPath] || {}),
            ...d.pageHeader,
          },
        };
      }
      if (Array.isArray(d.categoryCards)) {
        db.brand.categoryCards = d.categoryCards;
      }
      appendAuditLog(db, {
        actorEmail: actor.email,
        actorRole: actor.role,
        action: 'INLINE_SECTION_EDITED',
        entityType: 'SiteContent',
        entityId: String(d.sectionKey || d.pagePath || 'inline'),
        summary: `Inline edited content on ${d.pagePath || '/'} (${d.sectionKey || 'Header/Section'})`,
      });
      writeCmsDb(db);
      return NextResponse.json({ ok: true, brand: db.brand });
    }

    if (action === 'rollback_hero_revision') {
      if (!canPerformAdminAction(actor.role, 'edit_brand_hero')) {
        return NextResponse.json({ ok: false, error: 'Forbidden' }, { status: 403 });
      }
      const targetRev = Number(payload.revisionNumber);
      const found = db.brand.heroConfig.history.find((h) => h.revisionNumber === targetRev);
      if (!found) {
        return NextResponse.json({ ok: false, error: 'Revision not found' }, { status: 404 });
      }
      db.brand.heroConfig.headline = found.headline;
      db.brand.heroConfig.videoUrl = found.videoUrl;
      db.brand.heroConfig.posterUrl = found.posterUrl;
      db.brand.heroConfig.revisionNumber = found.revisionNumber;
      appendAuditLog(db, {
        actorEmail: actor.email,
        actorRole: actor.role,
        action: 'HERO_REVISION_RESTORED',
        entityType: 'BrandSettings',
        entityId: 'global',
        summary: `Restored Hero configuration to Revision #${targetRev}`,
      });
      writeCmsDb(db);
      return NextResponse.json({ ok: true, brand: db.brand });
    }

    if (action === 'save_page_draft') {
      if (!canPerformAdminAction(actor.role, 'edit_draft_content')) {
        return NextResponse.json({ ok: false, error: 'Forbidden' }, { status: 403 });
      }
      const {
        pageId,
        draftTitle,
        draftLeadDescription,
        draftSections,
        headerBadge,
        headerPrimaryCtaLabel,
        headerPrimaryCtaHref,
        headerSecondaryCtaLabel,
        headerSecondaryCtaHref,
        highlights,
        specs,
      } = payload.data || {};
      const page = db.pages.find(
        (p) =>
          p.id === pageId ||
          p.slug === pageId ||
          p.slug.replace(/\/$/, '') === String(pageId || '').replace(/\/$/, '')
      );
      if (!page) {
        return NextResponse.json({ ok: false, error: 'Page not found' }, { status: 404 });
      }
      page.draftTitle = String(draftTitle ?? page.title).trim();
      page.draftLeadDescription = String(draftLeadDescription ?? page.leadDescription).trim();
      if (headerBadge !== undefined) page.headerBadge = String(headerBadge).trim();
      if (headerPrimaryCtaLabel !== undefined) page.headerPrimaryCtaLabel = String(headerPrimaryCtaLabel).trim();
      if (headerPrimaryCtaHref !== undefined) page.headerPrimaryCtaHref = String(headerPrimaryCtaHref).trim();
      if (headerSecondaryCtaLabel !== undefined) page.headerSecondaryCtaLabel = String(headerSecondaryCtaLabel).trim();
      if (headerSecondaryCtaHref !== undefined) page.headerSecondaryCtaHref = String(headerSecondaryCtaHref).trim();
      if (Array.isArray(highlights)) page.highlights = highlights.map((h) => String(h).trim()).filter(Boolean);
      if (Array.isArray(specs)) page.specs = specs;
      if (Array.isArray(draftSections)) {
        page.draftSections = draftSections as PageSectionBlock[];
      }
      page.draftRevision = page.publishedRevision + 1;
      page.updatedAt = new Date().toISOString();

      const previewToken = `prv_${page.id}_${Date.now().toString(36)}`;
      db.previewTokens[previewToken] = {
        token: previewToken,
        pageSlug: page.slug,
        expiresAt: Date.now() + 1000 * 60 * 30, // 30 mins scoped preview
        createdBy: actor.email,
      };

      appendAuditLog(db, {
        actorEmail: actor.email,
        actorRole: actor.role,
        action: 'PAGE_DRAFT_SAVED',
        entityType: 'Page',
        entityId: page.id,
        summary: `Saved isolated draft v${page.draftRevision} for ${page.slug} (live v${page.publishedRevision} untouched)`,
      });
      writeCmsDb(db);
      return NextResponse.json({ ok: true, page, previewToken });
    }

    if (action === 'publish_page' || action === 'update_page_full') {
      if (!canPerformAdminAction(actor.role, 'edit_draft_content')) {
        return NextResponse.json({ ok: false, error: 'Forbidden' }, { status: 403 });
      }
      const d = payload.data || {};
      const pageId = d.pageId;
      const page = db.pages.find(
        (p) =>
          p.id === pageId ||
          p.slug === pageId ||
          p.slug.replace(/\/$/, '') === String(pageId || '').replace(/\/$/, '')
      );
      if (!page) {
        return NextResponse.json({ ok: false, error: 'Page not found' }, { status: 404 });
      }

      if (d.title !== undefined) page.title = String(d.title).trim();
      else if (page.draftTitle) page.title = page.draftTitle;

      if (d.leadDescription !== undefined) page.leadDescription = String(d.leadDescription).trim();
      else if (page.draftLeadDescription) page.leadDescription = page.draftLeadDescription;

      if (d.seoTitle !== undefined) page.seoTitle = String(d.seoTitle).trim();
      if (d.seoDescription !== undefined) page.seoDescription = String(d.seoDescription).trim();
      if (d.headerBadge !== undefined) page.headerBadge = String(d.headerBadge).trim();
      if (d.headerPrimaryCtaLabel !== undefined) page.headerPrimaryCtaLabel = String(d.headerPrimaryCtaLabel).trim();
      if (d.headerPrimaryCtaHref !== undefined) page.headerPrimaryCtaHref = String(d.headerPrimaryCtaHref).trim();
      if (d.headerSecondaryCtaLabel !== undefined) page.headerSecondaryCtaLabel = String(d.headerSecondaryCtaLabel).trim();
      if (d.headerSecondaryCtaHref !== undefined) page.headerSecondaryCtaHref = String(d.headerSecondaryCtaHref).trim();
      if (Array.isArray(d.highlights)) {
        page.highlights = d.highlights.map((h: unknown) => String(h).trim()).filter(Boolean);
      }
      if (Array.isArray(d.specs)) {
        page.specs = d.specs;
      }
      if (Array.isArray(d.sections)) {
        page.sections = d.sections as PageSectionBlock[];
      } else if (page.draftSections) {
        page.sections = page.draftSections;
      }

      page.draftTitle = page.title;
      page.draftLeadDescription = page.leadDescription;
      page.draftSections = structuredClone(page.sections);

      // Also sync to brand.pageHeaders for routes using DeFiPageHeroStage
      const cleanSlug = page.slug.length > 1 && page.slug.endsWith('/') ? page.slug.slice(0, -1) : page.slug;
      db.brand.pageHeaders = {
        ...(db.brand.pageHeaders || {}),
        [cleanSlug]: {
          ...(db.brand.pageHeaders?.[cleanSlug] || {}),
          badgeText: page.headerBadge || db.brand.pageHeaders?.[cleanSlug]?.badgeText,
          headlinePrimary: page.title,
          headlineGradient: d.headlineGradient !== undefined ? String(d.headlineGradient) : (db.brand.pageHeaders?.[cleanSlug]?.headlineGradient ?? ''),
          subheadline: page.leadDescription,
          primaryCtaLabel: page.headerPrimaryCtaLabel || db.brand.pageHeaders?.[cleanSlug]?.primaryCtaLabel,
          primaryCtaHref: page.headerPrimaryCtaHref || db.brand.pageHeaders?.[cleanSlug]?.primaryCtaHref,
          secondaryCtaLabel: page.headerSecondaryCtaLabel || db.brand.pageHeaders?.[cleanSlug]?.secondaryCtaLabel,
          secondaryCtaHref: page.headerSecondaryCtaHref || db.brand.pageHeaders?.[cleanSlug]?.secondaryCtaHref,
        },
      };

      page.publishedRevision += 1;
      page.draftRevision = page.publishedRevision;
      page.status = 'published';
      page.updatedAt = new Date().toISOString();
      page.revisions.unshift({
        revision: page.publishedRevision,
        savedAt: page.updatedAt,
        author: actor.email,
        note: `Published revision #${page.publishedRevision}`,
        title: page.title,
        leadDescription: page.leadDescription,
        sections: structuredClone(page.sections),
      });

      appendAuditLog(db, {
        actorEmail: actor.email,
        actorRole: actor.role,
        action: 'PAGE_PUBLISHED',
        entityType: 'Page',
        entityId: page.id,
        summary: `Published ${page.slug} Revision #${page.publishedRevision} (Header & Sections updated)`,
      });
      writeCmsDb(db);
      return NextResponse.json({ ok: true, page, brand: db.brand });
    }

    if (action === 'update_shop_product') {
      if (!canPerformAdminAction(actor.role, 'manage_shop') && !canPerformAdminAction(actor.role, 'edit_draft_content')) {
        return NextResponse.json(
          { ok: false, error: `Role "${actor.role}" is not permitted to modify Shop products.` },
          { status: 403 }
        );
      }
      const {
        productId,
        name,
        sku,
        priceCents,
        maxPriceCents,
        stockCount,
        shortDescription,
        description,
        customImageUrl,
        features,
        variantUpdates,
      } = payload.data || {};
      const prod = db.products.find((p) => p.id === productId || p.slug === productId);
      if (!prod) {
        return NextResponse.json({ ok: false, error: 'Product not found' }, { status: 404 });
      }
      if (typeof name === 'string' && name.trim()) {
        prod.name = name.trim();
      }
      if (typeof sku === 'string' && sku.trim()) {
        prod.sku = sku.trim();
      }
      if (typeof priceCents === 'number' && priceCents >= 100) {
        prod.priceCents = Math.round(priceCents);
      }
      if (typeof maxPriceCents === 'number' && maxPriceCents >= prod.priceCents) {
        prod.maxPriceCents = Math.round(maxPriceCents);
      }
      if (typeof stockCount === 'number' && stockCount >= 0) {
        prod.stockCount = Math.round(stockCount);
      }
      if (typeof shortDescription === 'string' && shortDescription.trim()) {
        prod.shortDescription = shortDescription.trim();
      }
      if (typeof description === 'string' && description.trim()) {
        prod.description = description.trim();
      }
      if (typeof customImageUrl === 'string') {
        prod.customImageUrl = customImageUrl.trim() || prod.customImageUrl;
      }
      if (Array.isArray(features)) {
        prod.features = features.map((f) => String(f).trim()).filter(Boolean);
      }
      if (Array.isArray(variantUpdates) && prod.requiresVariant) {
        for (const vu of variantUpdates) {
          const targetVar = prod.variants.find((v) => v.label === vu.label);
          if (targetVar) {
            if (typeof vu.priceCents === 'number') targetVar.priceCents = Math.round(vu.priceCents);
            if (typeof vu.stockCount === 'number') targetVar.stockCount = Math.round(vu.stockCount);
          }
        }
        prod.priceCents = Math.min(...prod.variants.map((v) => v.priceCents));
        prod.maxPriceCents = Math.max(...prod.variants.map((v) => v.priceCents));
        prod.stockCount = prod.variants.reduce((s, v) => s + v.stockCount, 0);
      }

      appendAuditLog(db, {
        actorEmail: actor.email,
        actorRole: actor.role,
        action: 'SHOP_PRODUCT_UPDATED',
        entityType: 'ShopProduct',
        entityId: prod.id,
        summary: `Updated commerce product ${prod.name} (base price $${(prod.priceCents / 100).toFixed(2)} AUD, stock ${prod.stockCount})`,
      });
      writeCmsDb(db);
      return NextResponse.json({ ok: true, product: prod });
    }

    if (action === 'update_workflow_record') {
      if (!canPerformAdminAction(actor.role, 'manage_enquiries')) {
        return NextResponse.json(
          { ok: false, error: `Role "${actor.role}" is not permitted to manage customer requests.` },
          { status: 403 }
        );
      }
      const { workflowType, recordId, status, assignedTo, note } = payload.data || {};
      if (workflowType === 'enquiry') {
        const item = db.enquiries.find((e) => e.id === recordId);
        if (!item) return NextResponse.json({ ok: false, error: 'Not found' }, { status: 404 });
        if (status) item.status = status;
        if (assignedTo !== undefined) item.assignedTo = assignedTo;
        if (note?.trim()) item.internalNotes.push(String(note).trim());
      } else if (workflowType === 'warranty') {
        const item = db.warranties.find((w) => w.id === recordId);
        if (!item) return NextResponse.json({ ok: false, error: 'Not found' }, { status: 404 });
        if (status) item.status = status;
        if (assignedTo !== undefined) item.assignedTo = assignedTo;
        if (note?.trim()) item.internalNotes.push(String(note).trim());
      } else if (workflowType === 'service') {
        const item = db.serviceRegistrations.find((s) => s.id === recordId);
        if (!item) return NextResponse.json({ ok: false, error: 'Not found' }, { status: 404 });
        if (status) item.status = status;
        if (assignedTo !== undefined) item.assignedTo = assignedTo;
        if (note?.trim()) item.internalNotes.push(String(note).trim());
      }

      appendAuditLog(db, {
        actorEmail: actor.email,
        actorRole: actor.role,
        action: 'WORKFLOW_RECORD_UPDATED',
        entityType: String(workflowType),
        entityId: String(recordId),
        summary: `Updated ${workflowType} ${recordId} -> status=${status}`,
      });
      writeCmsDb(db);
      return NextResponse.json({ ok: true });
    }

    if (action === 'manage_roles_check') {
      if (!canPerformAdminAction(actor.role, 'manage_roles')) {
        appendAuditLog(db, {
          actorEmail: actor.email,
          actorRole: actor.role,
          action: 'ROLE_ESCALATION_DENIED',
          entityType: 'UsersAndRoles',
          entityId: 'rbac',
          summary: `Blocked unauthorized role modification attempt by ${actor.role}`,
        });
        writeCmsDb(db);
        return NextResponse.json(
          { ok: false, error: `Access Denied: Role "${actor.role}" cannot modify staff roles or security policies.` },
          { status: 403 }
        );
      }
      return NextResponse.json({ ok: true, message: 'Role policy verified by Administrator.' });
    }

    return NextResponse.json({ ok: false, error: `Unknown action: ${action}` }, { status: 400 });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : 'Internal server error' },
      { status: 500 }
    );
  }
}
