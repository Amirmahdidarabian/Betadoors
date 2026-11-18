export type EvidenceClassification =
  | 'observed'
  | 'owner_approved'
  | 'proposed'
  | 'pending_verification';

export type StaffRole =
  | 'administrator'
  | 'content_editor'
  | 'shop_manager'
  | 'support_staff'
  | 'customer'
  | 'guest';

export type MotionPreset =
  | 'editorial_reveal'
  | 'subtle_fade'
  | 'kinetic_bento'
  | 'minimal_static'
  | 'hero_reveal'
  | 'stagger_cards'
  | 'fade_up';

export interface PageHeaderConfig {
  badgeText?: string;
  headlinePrimary?: string;
  headlineGradient?: string;
  subheadline?: string;
  primaryCtaLabel?: string;
  primaryCtaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
}

export interface CategoryCardItem {
  id: string;
  index: string;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  href: string;
  artType:
    | 'sectional_door'
    | 'aria_121'
    | 'roller_opener'
    | 'gate_opener'
    | 'keypad'
    | 'hardware_kit';
  customImageUrl?: string;
}

export interface BrandSettings {
  siteName: string;
  companyName?: string;
  tagline?: string;
  headOfficeAddress?: string;
  logoUrl: string;
  customLogoUrl?: string;
  logoVariant?: string;
  useCustomSvgLogo: boolean;
  primaryAccentHex: string;
  secondaryAccentHex?: string;
  secondaryGlowHex: string;
  displayFontFamily: string;
  bodyFontFamily: string;
  customFontWoff2Url: string | null;
  customFontLicenseVerified: boolean;
  phone: string;
  email: string;
  headOffice: string;
  timezone: string;
  announcementText: string;
  footerTagline?: string;
  footerDescription?: string;
  navLabels?: Record<string, string>;
  pageHeaders?: Record<string, PageHeaderConfig>;
  siteCopyOverrides?: Record<string, string>;
  siteCopy?: Record<string, string>;
  categoryCards?: CategoryCardItem[];
  motionPreset: MotionPreset;
  heroConfig: {
    videoUrl: string;
    posterUrl: string;
    width: number;
    height: number;
    aspectRatio: '16:9';
    headline: string;
    subheadline: string;
    primaryCtaLabel: string;
    primaryCtaHref: string;
    secondaryCtaLabel: string;
    secondaryCtaHref: string;
    autoplayMuted: boolean;
    autoplayMutedLoop?: boolean;
    loop: boolean;
    captionTranscriptText: string;
    revisionNumber: number;
    history: Array<{
      revisionNumber: number;
      updatedAt: string;
      updatedBy: string;
      headline: string;
      videoUrl: string;
      posterUrl: string;
    }>;
  };
}

export type SectionType =
  | 'hero_video'
  | 'defi_bento_insights'
  | 'category_grid'
  | 'featured_aria_121'
  | 'orbital_workflow'
  | 'service_grid'
  | 'feature_highlights'
  | 'enquiry_section'
  | 'downloads_preview'
  | 'faq_accordion';

export interface PageSectionBlock {
  id: string;
  type: SectionType;
  title: string;
  subtitle: string;
  enabled: boolean;
  order: number;
  motionPreset: MotionPreset;
  ctaLabel?: string;
  ctaHref?: string;
  items?: Array<{
    id: string;
    title: string;
    subtitle?: string;
    description: string;
    metric?: string;
    href?: string;
    tag?: string;
  }>;
}

export interface CmsPageRecord {
  id: string;
  slug: string; // e.g., "/", "/about-us/", "/garage-door-range/"
  title: string;
  seoTitle: string;
  seoDescription: string;
  canonicalPath: string;
  noindex: boolean;
  category:
    | 'core'
    | 'company'
    | 'services'
    | 'catalog'
    | 'products_overview'
    | 'commerce'
    | 'account'
    | 'support'
    | 'tools'
    | 'legal'
    | 'local_services'
    | 'garage_doors'
    | 'garage_door_openers'
    | 'gate_openers'
    | 'gates'
    | 'accessories'
    | 'hardware';
  template: string;
  parentSlug?: string;
  status: 'published' | 'draft' | 'archived';
  publishedRevision: number;
  draftRevision: number;
  updatedAt: string;
  location?: {
    name: string;
    postcode: string | null;
  };
  serviceType?: string;
  leadDescription: string;
  headerBadge?: string;
  headlineGradient?: string;
  headerPrimaryCtaLabel?: string;
  headerPrimaryCtaHref?: string;
  headerSecondaryCtaLabel?: string;
  headerSecondaryCtaHref?: string;
  highlights: string[];
  specs?: Array<{
    label: string;
    value: string;
    unit?: string;
    classification?: EvidenceClassification;
    verified?: boolean;
  }>;
  sections: PageSectionBlock[];
  draftSections?: PageSectionBlock[];
  draftTitle?: string;
  draftLeadDescription?: string;
  revisions: Array<{
    revision: number;
    savedAt: string;
    author: string;
    note: string;
    title: string;
    leadDescription: string;
    sections: PageSectionBlock[];
  }>;
}

export interface ProductVariant {
  id: string;
  label: string; // e.g. "800N", "1200N", "1500N"
  sku: string;
  priceCents: number;
  stockCount: number;
}

export interface ShopProduct {
  id: string;
  slug: string; // e.g. "motor-pack"
  path: string; // e.g. "/product/motor-pack/"
  name: string;
  sku: string;
  shortDescription: string;
  description: string;
  categorySlug: string;
  priceCents: number; // base or min price in AUD cents
  maxPriceCents?: number;
  currency: 'AUD';
  stockCount: number;
  requiresVariant: boolean;
  variants: ProductVariant[];
  features: string[];
  packContents: string[];
  compatibilityNote?: string;
  specs: Array<{
    label: string;
    value: string;
    verified: boolean;
  }>;
  imageSvgType:
    | 'motor_pack'
    | 'receiver'
    | 'remote'
    | 'remote_pack'
    | 'roller_opener'
    | 'aria_121'
    | 'sectional_door'
    | 'gate_opener'
    | 'keypad'
    | 'hardware_kit';
  customImageUrl?: string;
  customVideoUrl?: string;
  relatedProductIds: string[];
  reviews: Array<{
    id: string;
    authorName: string;
    rating: number;
    comment: string;
    createdAt: string;
    status: 'approved' | 'pending';
  }>;
}

export interface CartItem {
  productId: string;
  productSlug: string;
  name: string;
  variantLabel: string | null;
  sku: string;
  unitPriceCents: number;
  quantity: number;
}

export interface OrderRecord {
  id: string;
  orderNumber: string;
  confirmationToken: string;
  customerId: string | null; // null if guest
  customerEmail: string;
  customerName: string;
  customerPhone: string;
  shippingAddress: {
    street: string;
    suburb: string;
    state: string;
    postcode: string;
  };
  items: CartItem[];
  subtotalCents: number;
  shippingCents: number;
  gstIncludedCents: number;
  totalCents: number;
  paymentStatus: 'paid_sandbox' | 'pending' | 'failed' | 'refunded';
  fulfilmentStatus: 'processing' | 'dispatched' | 'completed' | 'cancelled';
  idempotencyKey: string;
  createdAt: string;
}

export type EnquiryWorkflowState =
  | 'new'
  | 'triaged'
  | 'assigned'
  | 'awaiting_customer'
  | 'in_progress'
  | 'resolved'
  | 'closed'
  | 'spam';

export interface EnquirySubmission {
  id: string;
  referenceCode: string;
  name: string;
  suburb: string;
  company: string;
  email: string;
  phone: string;
  serviceType: string;
  message: string;
  sourcePagePath: string;
  productContext?: string;
  calculatorContext?: string;
  status: EnquiryWorkflowState;
  assignedTo: string | null;
  internalNotes: string[];
  createdAt: string;
}

export type WarrantyWorkflowState =
  | 'submitted'
  | 'under_review'
  | 'awaiting_information'
  | 'registered'
  | 'rejected'
  | 'closed';

export interface WarrantySubmission {
  id: string;
  referenceCode: string;
  serialNumber: string;
  dealerCode: string;
  installationDate: string; // dd/mm/yyyy
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  street: string;
  addressLine2: string;
  suburb: string;
  state: string;
  postcode: string;
  country: string;
  status: WarrantyWorkflowState;
  assignedTo: string | null;
  internalNotes: string[];
  createdAt: string;
}

export type ServiceWorkflowState =
  | 'submitted'
  | 'triaged'
  | 'scheduled'
  | 'in_progress'
  | 'awaiting_information'
  | 'completed'
  | 'cancelled'
  | 'closed';

export interface ServiceRegistrationSubmission {
  id: string;
  referenceCode: string;
  serialNumber: string;
  installationDate: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  street: string;
  addressLine2: string;
  suburb: string;
  state: string;
  postcode: string;
  country: string;
  proofAttachment: {
    id: string;
    fileName: string;
    mimeType: string;
    sizeBytes: number;
    privateStorageKey: string;
    uploadedAt: string;
  };
  status: ServiceWorkflowState;
  assignedTo: string | null;
  internalNotes: string[];
  createdAt: string;
}

export interface ManualDownloadItem {
  id: string;
  label: string;
  modelName: string;
  version: string;
  language?: string;
  legacySourceUrl?: string;
  wpOriginalUrl?: string;
  localDownloadPath: string;
  fileSizeKb: number;
  published: boolean;
  summary: string;
  updatedAt?: string;
}

export interface RedirectRule {
  id: string;
  oldPath: string;
  destinationPath: string;
  statusCode: 301 | 302;
  reason?: string;
  notes?: string;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  actorEmail: string;
  actorRole: StaffRole;
  action: string;
  entityType: string;
  entityId: string;
  summary: string;
}
