import fs from 'node:fs';
import path from 'node:path';
import type {
  AuditLogEntry,
  BrandSettings,
  CmsPageRecord,
  EnquirySubmission,
  ManualDownloadItem,
  OrderRecord,
  RedirectRule,
  ServiceRegistrationSubmission,
  ShopProduct,
  StaffRole,
  WarrantySubmission,
} from './types';
import {
  INITIAL_AUDIT_LOG,
  INITIAL_BRAND_SETTINGS,
  INITIAL_ENQUIRIES,
  INITIAL_MANUALS,
  INITIAL_ORDERS,
  INITIAL_PAGES,
  INITIAL_REDIRECTS,
  INITIAL_SERVICE_REGISTRATIONS,
  INITIAL_SHOP_PRODUCTS,
  INITIAL_WARRANTIES,
} from './seed-data';

export interface PersistentDatabaseSchema {
  version: string;
  brand: BrandSettings;
  pages: CmsPageRecord[];
  products: ShopProduct[];
  manuals: ManualDownloadItem[];
  redirects: RedirectRule[];
  enquiries: EnquirySubmission[];
  warranties: WarrantySubmission[];
  serviceRegistrations: ServiceRegistrationSubmission[];
  orders: OrderRecord[];
  auditLog: AuditLogEntry[];
  previewTokens: Record<
    string,
    {
      token: string;
      pageSlug: string;
      expiresAt: number;
      createdBy: string;
    }
  >;
}

const DATA_DIR = path.join(process.cwd(), 'data');
const DB_FILE_PATH = path.join(DATA_DIR, 'betadoors-cms-db.json');

function createInitialDb(): PersistentDatabaseSchema {
  return {
    version: '2.3.0-flatlay-cards',
    brand: structuredClone(INITIAL_BRAND_SETTINGS),
    pages: structuredClone(INITIAL_PAGES),
    products: structuredClone(INITIAL_SHOP_PRODUCTS),
    manuals: structuredClone(INITIAL_MANUALS),
    redirects: structuredClone(INITIAL_REDIRECTS),
    enquiries: structuredClone(INITIAL_ENQUIRIES),
    warranties: structuredClone(INITIAL_WARRANTIES),
    serviceRegistrations: structuredClone(INITIAL_SERVICE_REGISTRATIONS),
    orders: structuredClone(INITIAL_ORDERS),
    auditLog: structuredClone(INITIAL_AUDIT_LOG),
    previewTokens: {},
  };
}

export function readCmsDb(): PersistentDatabaseSchema {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(DB_FILE_PATH)) {
      const initial = createInitialDb();
      fs.writeFileSync(DB_FILE_PATH, JSON.stringify(initial, null, 2), 'utf-8');
      return initial;
    }
    const raw = fs.readFileSync(DB_FILE_PATH, 'utf-8');
    const parsed = JSON.parse(raw) as PersistentDatabaseSchema;
    if (!parsed || !parsed.brand || !Array.isArray(parsed.pages)) {
      const fallback = createInitialDb();
      fs.writeFileSync(DB_FILE_PATH, JSON.stringify(fallback, null, 2), 'utf-8');
      return fallback;
    }
    if (parsed.version !== '2.3.0-flatlay-cards') {
      const freshIranDb = createInitialDb();
      fs.writeFileSync(DB_FILE_PATH, JSON.stringify(freshIranDb, null, 2), 'utf-8');
      return freshIranDb;
    }
    return parsed;
  } catch {
    return createInitialDb();
  }
}

export function writeCmsDb(db: PersistentDatabaseSchema): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  const tempPath = `${DB_FILE_PATH}.tmp`;
  fs.writeFileSync(tempPath, JSON.stringify(db, null, 2), 'utf-8');
  fs.renameSync(tempPath, DB_FILE_PATH);
}

export function appendAuditLog(
  db: PersistentDatabaseSchema,
  entry: {
    actorEmail: string;
    actorRole: StaffRole;
    action: string;
    entityType: string;
    entityId: string;
    summary: string;
  }
): void {
  db.auditLog.unshift({
    id: `aud_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
    timestamp: new Date().toISOString(),
    ...entry,
  });
  if (db.auditLog.length > 250) {
    db.auditLog.length = 250;
  }
}

export function normalizeSlugPath(rawPath: string): string {
  const clean = (rawPath || '/').split('?')[0].trim();
  if (!clean || clean === '/') return '/';
  const withLeading = clean.startsWith('/') ? clean : `/${clean}`;
  return withLeading.endsWith('/') ? withLeading : `${withLeading}/`;
}

export function findPageBySlug(
  slugPath: string,
  options?: { previewToken?: string | null }
): {
  page: CmsPageRecord | null;
  isDraftPreview: boolean;
  redirect?: RedirectRule;
} {
  const db = readCmsDb();
  const normalized = normalizeSlugPath(slugPath);

  const matchedRedirect = db.redirects.find(
    (r) =>
      r.oldPath === slugPath ||
      normalizeSlugPath(r.oldPath) === normalized
  );
  if (matchedRedirect) {
    return { page: null, isDraftPreview: false, redirect: matchedRedirect };
  }

  const page =
    db.pages.find((p) => normalizeSlugPath(p.slug) === normalized) ?? null;

  if (!page) {
    return { page: null, isDraftPreview: false };
  }

  const tokenStr = options?.previewToken;
  if (tokenStr && db.previewTokens[tokenStr]) {
    const tokenRecord = db.previewTokens[tokenStr];
    if (
      tokenRecord.expiresAt > Date.now() &&
      normalizeSlugPath(tokenRecord.pageSlug) === normalized
    ) {
      return {
        page: {
          ...page,
          title: page.draftTitle ?? page.title,
          leadDescription: page.draftLeadDescription ?? page.leadDescription,
          sections: page.draftSections ?? page.sections,
        },
        isDraftPreview: true,
      };
    }
  }

  return { page, isDraftPreview: false };
}
