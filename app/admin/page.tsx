'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ShieldAlert,
  LayoutDashboard,
  Palette,
  FileEdit,
  ShoppingBag,
  Inbox,
  Lock,
  History,
  ExternalLink,
  RotateCcw,
  ArrowUp,
  ArrowDown,
  Plus,
  Trash2,
  Sparkles,
  Grid,
} from 'lucide-react';
import { SiteShell } from '@/components/layout/SiteShell';
import {
  DEMO_ACTORS,
  useBetaDoors,
} from '@/components/providers/BetaDoorsProvider';
import { canPerformAdminAction } from '@/lib/domain-logic';
import type {
  CategoryCardItem,
  MotionPreset,
  PageSectionBlock,
} from '@/lib/types';

const DEFAULT_NAV_PATHS = [
  { href: '/', defaultLabel: 'Home' },
  { href: '/about-us', defaultLabel: 'About us' },
  { href: '/products', defaultLabel: 'Products' },
  { href: '/shop', defaultLabel: 'Shop' },
  { href: '/services', defaultLabel: 'Services' },
  { href: '/beta-doors-manuals', defaultLabel: 'Manuals' },
  { href: '/warranty-registration', defaultLabel: 'Warranty Registration' },
];

const DEFAULT_CATEGORY_CARDS: CategoryCardItem[] = [
  {
    id: 'cat_01',
    index: '01',
    badge: 'Custom Australian Bays',
    title: '01. Garage Door Range',
    subtitle: 'Insulated Sectional · Single Skin · Roller Doors',
    description:
      'Architectural overhead sectional doors and durable continuous steel roller doors custom-sized for residential & commercial bays.',
    href: '/garage-door-range/',
    artType: 'sectional_door',
  },
  {
    id: 'cat_02',
    index: '02',
    badge: 'Aria 121 Series',
    title: '02. Sectional & Tilt Openers',
    subtitle: 'Featuring the Aria 121 Drive Presentation',
    description:
      'Quiet overhead belt/chain automation with soft-start travel profiling and infrared safety beam integration.',
    href: '/sectional-and-tilt-door-opener-range/',
    artType: 'aria_121',
  },
  {
    id: 'cat_03',
    index: '03',
    badge: '1000N · 1500N · 1800N',
    title: '03. Roller Door Openers',
    subtitle: 'Residential & Heavy-Duty Side Drum Drives',
    description:
      'High-torque side drum drives with dual P2011 handsets, courtesy LED lighting, and wireless wall button.',
    href: '/roller-door-opener-range/',
    artType: 'roller_opener',
  },
  {
    id: 'cat_04',
    index: '04',
    badge: 'BETA & LIFE Italy',
    title: '04. Gate Opener Brands (BETA & LIFE)',
    subtitle: 'BETA B600/B550 · LIFE HP4, OP2, OP3-OP5, HP6',
    description:
      'Sliding and swing gate automation engineered for residential driveways and commercial security perimeters.',
    href: '/gate-opener-brands',
    artType: 'gate_opener',
  },
  {
    id: 'cat_05',
    index: '05',
    badge: 'P2011 & Smart WiFi',
    title: '05. Smart Accessories & Remotes',
    subtitle: 'Remotes · Wireless Keypad · WiFi Camera · Safety Beams',
    description:
      'Genuine P2011 handsets, Mini2-Relay-03 2-channel receivers, optical safety beams, and smart camera modules.',
    href: '/accessories',
    artType: 'keypad',
  },
  {
    id: 'cat_06',
    index: '06',
    badge: 'Springs, Hinges & Cables',
    title: '06. Structural Hardware & Springs',
    subtitle: 'Steel Line, B&D, Gliderol & Centurion Hinges',
    description:
      'Trade replacement hinges, side/middle bearing plates, calibrated torsion springs, and aircraft-grade lifting cables.',
    href: '/hardware',
    artType: 'hardware_kit',
  },
];

export default function AdminWorkspacePage() {
  const {
    brand,
    pages,
    products,
    redirects,
    orders,
    enquiries,
    warranties,
    serviceRegistrations,
    auditLog,
    actor,
    actorKey,
    setActorKey,
    mutateServer,
  } = useBetaDoors();

  const [activeTab, setActiveTab] = useState<
    | 'dashboard'
    | 'brand_hero'
    | 'pages_sections'
    | 'catalogue_shop'
    | 'requests_proofs'
    | 'seo_redirects'
    | 'roles_audit'
  >('dashboard');

  const [statusMessage, setStatusMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  // =========================================================================
  // TAB 2 STATE: Brand, Global Nav, Contact, Footer & 16:9 Hero
  // =========================================================================
  const [siteName, setSiteName] = useState(brand.siteName);
  const [logoUrl, setLogoUrl] = useState(brand.logoUrl);
  const [useCustomSvgLogo, setUseCustomSvgLogo] = useState(brand.useCustomSvgLogo);
  const [primaryAccentHex, setPrimaryAccentHex] = useState(brand.primaryAccentHex);
  const [customFontWoff2Url, setCustomFontWoff2Url] = useState(
    brand.customFontWoff2Url || ''
  );
  const [customFontLicenseVerified, setCustomFontLicenseVerified] = useState(
    brand.customFontLicenseVerified
  );
  const [motionPreset, setMotionPreset] = useState<MotionPreset>(brand.motionPreset);
  const [phone, setPhone] = useState(brand.phone);
  const [email, setEmail] = useState(brand.email);
  const [headOffice, setHeadOffice] = useState(brand.headOffice);
  const [announcementText, setAnnouncementText] = useState(
    brand.announcementText
  );
  const [footerTagline, setFooterTagline] = useState(
    brand.footerTagline ||
      "We're available Australia wide! Speed in service, Quality in product, Innovation in design."
  );
  const [footerDescription, setFooterDescription] = useState(
    brand.footerDescription ||
      'At Beta, we are pioneers in the door automation industry. We offer a comprehensive range of solutions for Commercial and Residential Garage Door and Gates.'
  );
  const [navLabels, setNavLabels] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    DEFAULT_NAV_PATHS.forEach((item) => {
      initial[item.href] = brand.navLabels?.[item.href] || item.defaultLabel;
    });
    return initial;
  });

  const [heroHeadline, setHeroHeadline] = useState(brand.heroConfig.headline);
  const [heroSubheadline, setHeroSubheadline] = useState(
    brand.heroConfig.subheadline
  );
  const [heroPrimaryCtaLabel, setHeroPrimaryCtaLabel] = useState(
    brand.heroConfig.primaryCtaLabel
  );
  const [heroPrimaryCtaHref, setHeroPrimaryCtaHref] = useState(
    brand.heroConfig.primaryCtaHref
  );
  const [heroSecondaryCtaLabel, setHeroSecondaryCtaLabel] = useState(
    brand.heroConfig.secondaryCtaLabel
  );
  const [heroSecondaryCtaHref, setHeroSecondaryCtaHref] = useState(
    brand.heroConfig.secondaryCtaHref
  );
  const [heroVideoUrl, setHeroVideoUrl] = useState(brand.heroConfig.videoUrl);
  const [heroPosterUrl, setHeroPosterUrl] = useState(brand.heroConfig.posterUrl);
  const [heroWidth, setHeroWidth] = useState(brand.heroConfig.width);
  const [heroHeight, setHeroHeight] = useState(brand.heroConfig.height);

  // =========================================================================
  // TAB 3 STATE: All 44 Pages — Header Texts + Sections + Highlights + SEO
  // =========================================================================
  const [selectedPageId, setSelectedPageId] = useState<string>('home');
  const selectedPage =
    pages.find((p) => p.id === selectedPageId) || pages[0];

  const getInitialPageFields = (p: typeof selectedPage) => {
    const cleanSlug = p?.slug.replace(/\/$/, '') || '/';
    const savedHdr =
      brand.pageHeaders?.[cleanSlug] || brand.pageHeaders?.[p?.slug || ''];
    return {
      title: p?.draftTitle ?? savedHdr?.headlinePrimary ?? p?.title ?? '',
      gradient: savedHdr?.headlineGradient ?? p?.headlineGradient ?? '',
      lead:
        p?.draftLeadDescription ??
        savedHdr?.subheadline ??
        p?.leadDescription ??
        '',
      badge:
        savedHdr?.badgeText ??
        p?.headerBadge ??
        p?.serviceType ??
        'BETA DOORS AUSTRALIA',
      primaryCtaLabel:
        savedHdr?.primaryCtaLabel ??
        p?.headerPrimaryCtaLabel ??
        'Request a Technical Quote',
      primaryCtaHref:
        savedHdr?.primaryCtaHref ??
        p?.headerPrimaryCtaHref ??
        '#page-enquiry-desk',
      secondaryCtaLabel:
        savedHdr?.secondaryCtaLabel ??
        p?.headerSecondaryCtaLabel ??
        'Explore Online Shop',
      secondaryCtaHref:
        savedHdr?.secondaryCtaHref ?? p?.headerSecondaryCtaHref ?? '/shop/',
      seoTitle: p?.seoTitle ?? '',
      seoDescription: p?.seoDescription ?? '',
      highlights: [...(p?.highlights || [])],
      sections: structuredClone(p?.draftSections ?? p?.sections ?? []),
    };
  };

  const initialPageState = getInitialPageFields(selectedPage);
  const [draftTitle, setDraftTitle] = useState<string>(initialPageState.title);
  const [draftGradient, setDraftGradient] = useState<string>(
    initialPageState.gradient
  );
  const [draftLead, setDraftLead] = useState<string>(initialPageState.lead);
  const [draftBadge, setDraftBadge] = useState<string>(initialPageState.badge);
  const [draftPrimaryCtaLabel, setDraftPrimaryCtaLabel] = useState<string>(
    initialPageState.primaryCtaLabel
  );
  const [draftPrimaryCtaHref, setDraftPrimaryCtaHref] = useState<string>(
    initialPageState.primaryCtaHref
  );
  const [draftSecondaryCtaLabel, setDraftSecondaryCtaLabel] = useState<string>(
    initialPageState.secondaryCtaLabel
  );
  const [draftSecondaryCtaHref, setDraftSecondaryCtaHref] = useState<string>(
    initialPageState.secondaryCtaHref
  );
  const [draftSeoTitle, setDraftSeoTitle] = useState<string>(
    initialPageState.seoTitle
  );
  const [draftSeoDesc, setDraftSeoDesc] = useState<string>(
    initialPageState.seoDescription
  );
  const [draftHighlights, setDraftHighlights] = useState<string[]>(
    initialPageState.highlights
  );
  const [draftSections, setDraftSections] = useState<PageSectionBlock[]>(
    initialPageState.sections
  );
  const [generatedPreviewToken, setGeneratedPreviewToken] = useState<string | null>(
    null
  );

  // =========================================================================
  // TAB 4 STATE: 5 Shop Products + 6 Homepage Category Cards
  // =========================================================================
  const [selectedProdId, setSelectedProdId] = useState<string>('shop_motor_pack');
  const selectedProd =
    products.find((p) => p.id === selectedProdId) || products[0];
  const [prodName, setProdName] = useState<string>(selectedProd?.name || '');
  const [prodSku, setProdSku] = useState<string>(selectedProd?.sku || '');
  const [prodPriceDollars, setProdPriceDollars] = useState<number>(
    Math.round((selectedProd?.priceCents || 65000) / 100)
  );
  const [prodMaxPriceDollars, setProdMaxPriceDollars] = useState<string>(
    selectedProd?.maxPriceCents
      ? String(Math.round(selectedProd.maxPriceCents / 100))
      : ''
  );
  const [prodStock, setProdStock] = useState<number>(
    selectedProd?.stockCount || 15
  );
  const [prodShortDesc, setProdShortDesc] = useState<string>(
    selectedProd?.shortDescription || ''
  );
  const [prodFullDesc, setProdFullDesc] = useState<string>(
    selectedProd?.description || ''
  );
  const [prodCustomImage, setProdCustomImage] = useState<string>(
    selectedProd?.customImageUrl || ''
  );

  const [categoryCards, setCategoryCards] = useState<CategoryCardItem[]>(
    brand.categoryCards && brand.categoryCards.length === 6
      ? structuredClone(brand.categoryCards)
      : structuredClone(DEFAULT_CATEGORY_CARDS)
  );

  // Private Proof Inspection Result
  const [proofResult, setProofResult] = useState<string | null>(null);

  const handleSelectPage = (id: string) => {
    setSelectedPageId(id);
    setGeneratedPreviewToken(null);
    const p = pages.find((x) => x.id === id);
    if (p) {
      const fields = getInitialPageFields(p);
      setDraftTitle(fields.title);
      setDraftGradient(fields.gradient);
      setDraftLead(fields.lead);
      setDraftBadge(fields.badge);
      setDraftPrimaryCtaLabel(fields.primaryCtaLabel);
      setDraftPrimaryCtaHref(fields.primaryCtaHref);
      setDraftSecondaryCtaLabel(fields.secondaryCtaLabel);
      setDraftSecondaryCtaHref(fields.secondaryCtaHref);
      setDraftSeoTitle(fields.seoTitle);
      setDraftSeoDesc(fields.seoDescription);
      setDraftHighlights(fields.highlights);
      setDraftSections(fields.sections);
    }
  };

  const handleSelectProduct = (id: string) => {
    setSelectedProdId(id);
    const p = products.find((x) => x.id === id);
    if (p) {
      setProdName(p.name);
      setProdSku(p.sku);
      setProdPriceDollars(Math.round(p.priceCents / 100));
      setProdMaxPriceDollars(
        p.maxPriceCents ? String(Math.round(p.maxPriceCents / 100)) : ''
      );
      setProdStock(p.stockCount);
      setProdShortDesc(p.shortDescription);
      setProdFullDesc(p.description);
      setProdCustomImage(p.customImageUrl || '');
    }
  };

  const handleSaveBrandHero = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage(null);
    const res = await mutateServer('update_brand_hero', {
      siteName,
      logoUrl,
      useCustomSvgLogo,
      primaryAccentHex,
      customFontWoff2Url: customFontWoff2Url.trim() || null,
      customFontLicenseVerified,
      motionPreset,
      phone,
      email,
      headOffice,
      announcementText,
      footerTagline,
      footerDescription,
      navLabels,
      heroHeadline,
      heroSubheadline,
      primaryCtaLabel: heroPrimaryCtaLabel,
      primaryCtaHref: heroPrimaryCtaHref,
      secondaryCtaLabel: heroSecondaryCtaLabel,
      secondaryCtaHref: heroSecondaryCtaHref,
      heroVideoUrl,
      heroPosterUrl,
      heroWidth,
      heroHeight,
    });
    if (!res.ok) {
      setStatusMessage({ type: 'error', text: String(res.error) });
    } else {
      setStatusMessage({
        type: 'success',
        text: `Brand, Top Navigation, Footer Contact & 16:9 Hero settings persisted to CMS (Revision #${(res.brand as { heroConfig: { revisionNumber: number } })?.heroConfig?.revisionNumber}).`,
      });
    }
  };

  const handleRollbackHero = async (revisionNumber: number) => {
    setStatusMessage(null);
    const res = await mutateServer('rollback_hero_revision', undefined, {
      revisionNumber,
    });
    if (!res.ok) {
      setStatusMessage({ type: 'error', text: String(res.error) });
    } else {
      const updated = res.brand as typeof brand;
      setHeroHeadline(updated.heroConfig.headline);
      setHeroVideoUrl(updated.heroConfig.videoUrl);
      setHeroPosterUrl(updated.heroConfig.posterUrl);
      setStatusMessage({
        type: 'success',
        text: `Rolled back Hero configuration to Revision #${revisionNumber}.`,
      });
    }
  };

  const handleMoveSection = (index: number, direction: -1 | 1) => {
    const next = [...draftSections];
    const targetIdx = index + direction;
    if (targetIdx < 0 || targetIdx >= next.length) return;
    const temp = next[index];
    next[index] = next[targetIdx];
    next[targetIdx] = temp;
    const reordered = next.map((sec, idx) => ({ ...sec, order: idx + 1 }));
    setDraftSections(reordered);
  };

  const handleAddSection = () => {
    const nextIdx = draftSections.length + 1;
    const newSec: PageSectionBlock = {
      id: `sec_custom_${Date.now()}`,
      type: 'defi_bento_insights',
      title: `New Section 0${nextIdx}`,
      subtitle:
        'Custom architectural section added via the BETA DOORS Admin CMS.',
      order: nextIdx,
      enabled: true,
      motionPreset: 'kinetic_bento',
      items: [
        {
          id: `item_${Date.now()}_1`,
          title: 'Key Engineering Capability',
          description:
            'Edit this card title, metric, and description directly in the Admin CMS.',
          metric: '100%',
          tag: 'BETA SPEC',
        },
      ],
    };
    setDraftSections([...draftSections, newSec]);
  };

  const handleDeleteSection = (index: number) => {
    const next = draftSections
      .filter((_, idx) => idx !== index)
      .map((sec, idx) => ({ ...sec, order: idx + 1 }));
    setDraftSections(next);
  };

  const handleSaveDraft = async () => {
    if (!selectedPage) return;
    setStatusMessage(null);
    const res = await mutateServer('save_page_draft', {
      pageId: selectedPage.id,
      draftTitle,
      draftLeadDescription: draftLead,
      draftSections,
      headerBadge: draftBadge,
      headlineGradient: draftGradient,
      headerPrimaryCtaLabel: draftPrimaryCtaLabel,
      headerPrimaryCtaHref: draftPrimaryCtaHref,
      headerSecondaryCtaLabel: draftSecondaryCtaLabel,
      headerSecondaryCtaHref: draftSecondaryCtaHref,
      seoTitle: draftSeoTitle,
      seoDescription: draftSeoDesc,
      highlights: draftHighlights,
    });
    if (!res.ok) {
      setStatusMessage({ type: 'error', text: String(res.error) });
    } else {
      setGeneratedPreviewToken(String(res.previewToken));
      setStatusMessage({
        type: 'success',
        text: `Saved isolated Draft v${selectedPage.publishedRevision + 1} for ${selectedPage.slug}. Live public page remains on v${selectedPage.publishedRevision} until published.`,
      });
    }
  };

  const handlePublishPage = async () => {
    if (!selectedPage) return;
    setStatusMessage(null);
    const cleanSlug = selectedPage.slug.replace(/\/$/, '') || '/';

    await mutateServer('update_site_copy_overrides', {
      pagePath: cleanSlug,
      pageHeader: {
        badgeText: draftBadge,
        headlinePrimary: draftTitle,
        headlineGradient: draftGradient,
        subheadline: draftLead,
        primaryCtaLabel: draftPrimaryCtaLabel,
        primaryCtaHref: draftPrimaryCtaHref,
        secondaryCtaLabel: draftSecondaryCtaLabel,
        secondaryCtaHref: draftSecondaryCtaHref,
      },
    });

    await mutateServer('save_page_draft', {
      pageId: selectedPage.id,
      draftTitle,
      draftLeadDescription: draftLead,
      draftSections,
      headerBadge: draftBadge,
      headlineGradient: draftGradient,
      headerPrimaryCtaLabel: draftPrimaryCtaLabel,
      headerPrimaryCtaHref: draftPrimaryCtaHref,
      headerSecondaryCtaLabel: draftSecondaryCtaLabel,
      headerSecondaryCtaHref: draftSecondaryCtaHref,
      seoTitle: draftSeoTitle,
      seoDescription: draftSeoDesc,
      highlights: draftHighlights,
    });

    const res = await mutateServer('publish_page', {
      pageId: selectedPage.id,
    });
    if (!res.ok) {
      setStatusMessage({ type: 'error', text: String(res.error) });
    } else {
      setStatusMessage({
        type: 'success',
        text: `Published ${selectedPage.slug} header, sections, highlights & SEO live and invalidated affected route cache!`,
      });
    }
  };

  const handleSaveShopProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProd) return;
    setStatusMessage(null);
    const res = await mutateServer('update_shop_product', {
      productId: selectedProd.id,
      name: prodName,
      sku: prodSku,
      priceCents: Math.round(prodPriceDollars * 100),
      maxPriceCents: prodMaxPriceDollars.trim()
        ? Math.round(Number(prodMaxPriceDollars) * 100)
        : null,
      stockCount: prodStock,
      shortDescription: prodShortDesc,
      description: prodFullDesc,
      customImageUrl: prodCustomImage,
    });
    if (!res.ok) {
      setStatusMessage({ type: 'error', text: String(res.error) });
    } else {
      setStatusMessage({
        type: 'success',
        text: `Updated ${prodName} (${prodSku}) in single commerce authority ($${prodPriceDollars}.00 AUD, stock: ${prodStock}).`,
      });
    }
  };

  const handleSaveCategoryCards = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage(null);
    const res = await mutateServer('update_site_copy_overrides', {
      categoryCards,
    });
    if (!res.ok) {
      setStatusMessage({ type: 'error', text: String(res.error) });
    } else {
      setStatusMessage({
        type: 'success',
        text: 'Saved and published all 6 Product Family Category Cards!',
      });
    }
  };

  const handleRetrievePrivateProof = async (attachmentId: string) => {
    setProofResult(null);
    const res = await fetch(
      `/api/private-proof/${encodeURIComponent(attachmentId)}?role=${encodeURIComponent(actor.role)}`,
      {
        headers: {
          'x-beta-role': actor.role,
          'x-beta-email': actor.email,
        },
      }
    );
    const json = await res.json();
    if (!res.ok) {
      setProofResult(`DENIED (${res.status}): ${json.error}`);
    } else {
      setProofResult(
        `AUTHORISED (200 OK): Retrieved private proof "${json.attachment.fileName}" (${json.attachment.mimeType}, ${Math.round(json.attachment.sizeBytes / 1024)} KB) for ${json.customerName} (${json.serviceReference}).`
      );
    }
  };

  const handleTestRoleEscalation = async () => {
    setStatusMessage(null);
    const res = await mutateServer('manage_roles_check');
    if (!res.ok) {
      setStatusMessage({ type: 'error', text: String(res.error) });
    } else {
      setStatusMessage({ type: 'success', text: String(res.message) });
    }
  };

  const canAccessWorkspace = canPerformAdminAction(actor.role, 'view_dashboard');

  return (
    <SiteShell>
      <div className="px-4 sm:px-8 lg:px-12 py-10 max-w-7xl mx-auto space-y-8">
        {/* Top Admin Workspace Header & Role Switcher */}
        <div className="bg-[#0F1117] border border-white/10 rounded-2xl p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <div className="text-xs font-mono text-[#EC008C] flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>
                BETA SITE TOOLS · FULL SITE, PAGE HEADER &amp; INLINE HOVER CMS WORKSPACE
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Staff Administration &amp; Content Operations
            </h1>
            <p className="text-xs text-slate-400">
              Edit every page header, section, category card, navigation item, and shop product here — or hover over any section on any page while logged in as Admin to click <strong className="text-white">✎ Edit Section</strong> inline.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/admin/page-editor"
              className="keep-white-text inline-flex items-center gap-2 px-4 py-2 bg-[#EC008C] hover:bg-[#d4007d] text-white text-xs font-mono font-bold shadow-[0_0_20px_rgba(236,0,140,0.4)] transition-colors"
            >
              <FileEdit className="w-3.5 h-3.5" />
              <span>OPEN DEDICATED PAGE EDITOR</span>
            </Link>
            <label
              htmlFor="admin-role-switcher"
              className="text-xs font-medium text-slate-300"
            >
              Test Staff / Customer Role:
            </label>
            <select
              id="admin-role-switcher"
              value={actorKey}
              onChange={(e) => {
                setActorKey(e.target.value);
                setStatusMessage(null);
                setProofResult(null);
              }}
              className="bg-[#08090C] border border-white/15 rounded-xl px-3.5 py-2 text-xs text-white focus:border-[#EC008C]"
            >
              {Object.entries(DEMO_ACTORS).map(([key, item]) => (
                <option key={key} value={key}>
                  {item.displayName}
                </option>
              ))}
            </select>
          </div>
        </div>

        {statusMessage && (
          <div
            role="alert"
            className={`p-4 rounded-xl border text-xs sm:text-sm flex items-center justify-between gap-4 ${
              statusMessage.type === 'success'
                ? 'bg-emerald-950/70 border-emerald-500/40 text-emerald-100'
                : 'bg-rose-950/70 border-rose-500/40 text-rose-100'
            }`}
          >
            <span>{statusMessage.text}</span>
            <button
              type="button"
              onClick={() => setStatusMessage(null)}
              className="text-xs underline opacity-80 hover:opacity-100"
            >
              Dismiss
            </button>
          </div>
        )}

        {!canAccessWorkspace ? (
          <div
            role="alert"
            className="bg-rose-950/40 border border-rose-500/40 rounded-2xl p-8 text-center space-y-4"
          >
            <ShieldAlert className="w-10 h-10 text-rose-400 mx-auto" />
            <h2 className="text-xl font-bold text-white">
              403 Forbidden — Staff Authentication &amp; Capability Required
            </h2>
            <p className="text-xs sm:text-sm text-rose-200/90 max-w-xl mx-auto">
              Your active session (<code className="font-mono">{actor.displayName}</code>) is a customer or guest account and is blocked from reading or mutating staff CMS APIs. Select <strong className="text-white">Site Administrator</strong>, <strong className="text-white">Content Editor</strong>, <strong className="text-white">Shop Manager</strong>, or <strong className="text-white">Support Staff</strong> above to enter the workspace.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Sidebar Navigation */}
            <aside className="lg:col-span-3 bg-[#0F1117] border border-white/10 rounded-2xl p-4 space-y-1.5">
              {(
                [
                  { id: 'dashboard', label: '01. Onboarding & Blockers', icon: LayoutDashboard },
                  { id: 'brand_hero', label: '02. Brand, Nav, Footer & Hero', icon: Palette },
                  { id: 'pages_sections', label: '03. All Pages, Headers & Sections', icon: FileEdit },
                  { id: 'catalogue_shop', label: '04. Shop & 06 Category Cards', icon: ShoppingBag },
                  { id: 'requests_proofs', label: '05. Enquiries & Private Proofs', icon: Inbox },
                  { id: 'seo_redirects', label: '06. 44 Routes & Redirects', icon: ExternalLink },
                  { id: 'roles_audit', label: '07. RBAC & Security Audit', icon: Lock },
                ] as const
              ).map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-colors text-left cursor-pointer ${
                      activeTab === tab.id
                        ? 'bg-[#EC008C] text-white font-semibold keep-white-text'
                        : 'text-slate-300 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </aside>

            {/* Main Workspace Viewport */}
            <div className="lg:col-span-9 space-y-6">
              {/* TAB 1: DASHBOARD & ONBOARDING */}
              {activeTab === 'dashboard' && (
                <div className="bg-[#0F1117] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-8">
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
                    <div>
                      <h2 className="text-xl font-bold text-white">
                        Onboarding Dashboard, Counts &amp; Visual Editor Guide
                      </h2>
                      <p className="text-xs text-slate-400 mt-1">
                        Real persisted counts from the local database and inline visual editing instructions.
                      </p>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-mono">
                      INLINE HOVER EDITOR ACTIVE
                    </span>
                  </div>

                  {/* Metric Strip */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="p-4 rounded-xl bg-[#08090C] border border-white/10">
                      <div className="text-xs text-slate-400">Known Legacy Routes</div>
                      <div className="text-2xl font-bold text-white font-mono tabular-nums mt-1">
                        44 / 44
                      </div>
                      <div className="text-[11px] text-emerald-400 mt-1">All routes active</div>
                    </div>
                    <div className="p-4 rounded-xl bg-[#08090C] border border-white/10">
                      <div className="text-xs text-slate-400">Shop Products</div>
                      <div className="text-2xl font-bold text-white font-mono tabular-nums mt-1">
                        {products.length}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-1">Single commerce store</div>
                    </div>
                    <div className="p-4 rounded-xl bg-[#08090C] border border-white/10">
                      <div className="text-xs text-slate-400">Enquiries &amp; Requests</div>
                      <div className="text-2xl font-bold text-white font-mono tabular-nums mt-1">
                        {enquiries.length + warranties.length + serviceRegistrations.length}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-1">
                        {enquiries.length} Enq · {warranties.length} War · {serviceRegistrations.length} Srv
                      </div>
                    </div>
                    <div className="p-4 rounded-xl bg-[#08090C] border border-white/10">
                      <div className="text-xs text-slate-400">Sandbox Orders</div>
                      <div className="text-2xl font-bold text-white font-mono tabular-nums mt-1">
                        {orders.length}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-1">
                        4 PDF Manuals Verified
                      </div>
                    </div>
                  </div>

                  {/* Quick Jump Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <button
                      type="button"
                      onClick={() => setActiveTab('pages_sections')}
                      className="p-4 rounded-xl bg-[#08090C] hover:bg-white/[0.04] border border-white/10 text-left space-y-1.5 cursor-pointer transition-colors"
                    >
                      <div className="text-xs font-mono text-[#EC008C]">
                        PAGE HEADERS &amp; SECTIONS
                      </div>
                      <div className="text-sm font-bold text-white">
                        Edit Any Page Header or Section
                      </div>
                      <p className="text-xs text-slate-400">
                        Customize H1 headlines, gradient accents, badges, CTAs, and section blocks for all 44 pages.
                      </p>
                    </button>

                    <button
                      type="button"
                      onClick={() => setActiveTab('brand_hero')}
                      className="p-4 rounded-xl bg-[#08090C] hover:bg-white/[0.04] border border-white/10 text-left space-y-1.5 cursor-pointer transition-colors"
                    >
                      <div className="text-xs font-mono text-[#EC008C]">
                        GLOBAL HEADER, NAV &amp; HERO
                      </div>
                      <div className="text-sm font-bold text-white">
                        Edit Top Nav, Footer &amp; 16:9 Hero
                      </div>
                      <p className="text-xs text-slate-400">
                        Update navigation bar labels, phone, email, Campbellfield address, and 16:9 hero video/copy.
                      </p>
                    </button>

                    <button
                      type="button"
                      onClick={() => setActiveTab('catalogue_shop')}
                      className="p-4 rounded-xl bg-[#08090C] hover:bg-white/[0.04] border border-white/10 text-left space-y-1.5 cursor-pointer transition-colors"
                    >
                      <div className="text-xs font-mono text-[#EC008C]">
                        SHOP &amp; 06 CATEGORY CARDS
                      </div>
                      <div className="text-sm font-bold text-white">
                        Edit Products &amp; Category Cards
                      </div>
                      <p className="text-xs text-slate-400">
                        Update all 5 shop products (prices, stock, descriptions) and all 6 product family cards.
                      </p>
                    </button>
                  </div>

                  {/* Missing Assets & Production Release Blockers Checklist */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-semibold text-white">
                      Required Input &amp; Production Cutover Checklist
                    </h3>
                    <div className="divide-y divide-white/10 border border-white/10 rounded-xl bg-[#08090C] text-xs">
                      <div className="p-3.5 flex items-center justify-between gap-4">
                        <div>
                          <span className="font-semibold text-white">BETA DOORS Horizontal SVG Logo</span>
                          <p className="text-slate-400">
                            Supplied in <code className="font-mono">/assets/aistudio/BETADOORS_Logo_Horizontal_6f942e32.svg</code>
                          </p>
                        </div>
                        <span className="text-emerald-400 font-mono">OWNER_SUPPLIED</span>
                      </div>
                      <div className="p-3.5 flex items-center justify-between gap-4">
                        <div>
                          <span className="font-semibold text-white">1920×1080 (16:9) Hero Animation &amp; Poster</span>
                          <p className="text-slate-400">
                            Interactive 16:9 architectural render active; replaceable anytime in Tab 02.
                          </p>
                        </div>
                        <span className="text-emerald-400 font-mono">OWNER_SUPPLIED</span>
                      </div>
                      <div className="p-3.5 flex items-center justify-between gap-4">
                        <div>
                          <span className="font-semibold text-white">Model Nomenclature &amp; Force Discrepancies</span>
                          <p className="text-slate-400">
                            Confirm B600/B550 vs F600/F550 and 1000N/1500N/1800N vs 100N before print sign-off.
                          </p>
                        </div>
                        <span className="text-amber-300 font-mono">PENDING_VERIFICATION</span>
                      </div>
                      <div className="p-3.5 flex items-center justify-between gap-4">
                        <div>
                          <span className="font-semibold text-white">Live Payment Gateway &amp; Tax/Shipping Rules</span>
                          <p className="text-slate-400">
                            Sandbox adapter active; live merchant keys required before accepting real payments.
                          </p>
                        </div>
                        <span className="text-amber-300 font-mono">BLOCKED_FOR_PROD</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: BRAND, GLOBAL NAV, CONTACT, FOOTER & 16:9 HERO */}
              {activeTab === 'brand_hero' && (
                <div className="bg-[#0F1117] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
                  <h2 className="text-xl font-bold text-white">
                    Brand Identity, Top Navigation, Global Footer &amp; 1920×1080 Hero
                  </h2>

                  <form onSubmit={handleSaveBrandHero} className="space-y-6 text-xs">
                    {/* Part 1: Brand & Contact Info */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="adm-sitename" className="block text-slate-300 mb-1">
                          Site Name
                        </label>
                        <input
                          id="adm-sitename"
                          type="text"
                          value={siteName}
                          onChange={(e) => setSiteName(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-lg bg-[#08090C] border border-white/15 text-white"
                        />
                      </div>

                      <div>
                        <label htmlFor="adm-accent" className="block text-slate-300 mb-1">
                          Approved Brand Accent Hex
                        </label>
                        <input
                          id="adm-accent"
                          type="text"
                          value={primaryAccentHex}
                          onChange={(e) => setPrimaryAccentHex(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-lg bg-[#08090C] border border-white/15 text-white font-mono"
                        />
                      </div>

                      <div>
                        <label htmlFor="adm-phone" className="block text-slate-300 mb-1">
                          Global Phone Number
                        </label>
                        <input
                          id="adm-phone"
                          type="text"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-lg bg-[#08090C] border border-white/15 text-white font-mono"
                        />
                      </div>

                      <div>
                        <label htmlFor="adm-email" className="block text-slate-300 mb-1">
                          Global Support Email
                        </label>
                        <input
                          id="adm-email"
                          type="text"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-lg bg-[#08090C] border border-white/15 text-white font-mono"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label htmlFor="adm-office" className="block text-slate-300 mb-1">
                          Head Office Address
                        </label>
                        <input
                          id="adm-office"
                          type="text"
                          value={headOffice}
                          onChange={(e) => setHeadOffice(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-lg bg-[#08090C] border border-white/15 text-white"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label htmlFor="adm-footer-tagline" className="block text-slate-300 mb-1">
                          Footer Tagline
                        </label>
                        <input
                          id="adm-footer-tagline"
                          type="text"
                          value={footerTagline}
                          onChange={(e) => setFooterTagline(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-lg bg-[#08090C] border border-white/15 text-white"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label htmlFor="adm-footer-desc" className="block text-slate-300 mb-1">
                          Footer About Description
                        </label>
                        <textarea
                          id="adm-footer-desc"
                          rows={2}
                          value={footerDescription}
                          onChange={(e) => setFooterDescription(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-lg bg-[#08090C] border border-white/15 text-white"
                        />
                      </div>

                      <div>
                        <label htmlFor="adm-logo-url" className="block text-slate-300 mb-1">
                          Logo Asset URL (SVG/PNG)
                        </label>
                        <input
                          id="adm-logo-url"
                          type="text"
                          value={logoUrl}
                          onChange={(e) => setLogoUrl(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-lg bg-[#08090C] border border-white/15 text-white font-mono"
                        />
                      </div>

                      <div>
                        <label htmlFor="adm-woff2" className="block text-slate-300 mb-1">
                          Licensed Webfont URL (.woff2, max 2 MB)
                        </label>
                        <input
                          id="adm-woff2"
                          type="text"
                          value={customFontWoff2Url}
                          onChange={(e) => setCustomFontWoff2Url(e.target.value)}
                          placeholder="/fonts/beta-custom-display.woff2"
                          className="w-full px-3.5 py-2.5 rounded-lg bg-[#08090C] border border-white/15 text-white font-mono"
                        />
                      </div>

                      <div>
                        <label htmlFor="adm-motion" className="block text-slate-300 mb-1">
                          Approved Motion Preset (Reduced-Motion Always Enforced)
                        </label>
                        <select
                          id="adm-motion"
                          value={motionPreset}
                          onChange={(e) => setMotionPreset(e.target.value as MotionPreset)}
                          className="w-full px-3.5 py-2.5 rounded-lg bg-[#08090C] border border-white/15 text-white"
                        >
                          <option value="kinetic_bento">Kinetic Bento (350ms reveal / 150ms controls)</option>
                          <option value="editorial_reveal">Editorial Reveal (450ms smooth settle)</option>
                          <option value="subtle_fade">Subtle Opacity Fade (200ms)</option>
                          <option value="minimal_static">Minimal Static (Zero decorative travel)</option>
                        </select>
                      </div>

                      <div className="flex items-center pt-5">
                        <label className="inline-flex items-center gap-2 text-slate-200 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={customFontLicenseVerified}
                            onChange={(e) => setCustomFontLicenseVerified(e.target.checked)}
                            className="rounded border-white/20 bg-[#08090C]"
                          />
                          <span>Webfont commercial licence verified for publication</span>
                        </label>
                      </div>
                    </div>

                    {/* Part 2: Top Navigation Bar Labels */}
                    <div className="pt-4 border-t border-white/10 space-y-3">
                      <h3 className="text-sm font-semibold text-white">
                        Top Navigation Bar Link Labels
                      </h3>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {DEFAULT_NAV_PATHS.map((nav) => (
                          <div key={nav.href}>
                            <label className="block text-slate-400 text-[11px] font-mono mb-1">
                              {nav.href}
                            </label>
                            <input
                              type="text"
                              value={navLabels[nav.href] || ''}
                              onChange={(e) =>
                                setNavLabels({
                                  ...navLabels,
                                  [nav.href]: e.target.value,
                                })
                              }
                              className="w-full px-3 py-2 rounded-lg bg-[#08090C] border border-white/15 text-white"
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Part 3: 1920 x 1080 Homepage Hero */}
                    <div className="pt-4 border-t border-white/10 space-y-4">
                      <h3 className="text-sm font-semibold text-white">
                        1920 × 1080 (16:9) Homepage Hero Header, CTAs &amp; Video
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="sm:col-span-2">
                          <label htmlFor="adm-hero-headline" className="block text-slate-300 mb-1">
                            Hero Introductory Headline (Displayed in 16:9 Crystal HUD)
                          </label>
                          <input
                            id="adm-hero-headline"
                            type="text"
                            value={heroHeadline}
                            onChange={(e) => setHeroHeadline(e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-lg bg-[#08090C] border border-white/15 text-white"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label htmlFor="adm-hero-sub" className="block text-slate-300 mb-1">
                            Hero Subheadline
                          </label>
                          <input
                            id="adm-hero-sub"
                            type="text"
                            value={heroSubheadline}
                            onChange={(e) => setHeroSubheadline(e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-lg bg-[#08090C] border border-white/15 text-white"
                          />
                        </div>

                        <div>
                          <label htmlFor="adm-hero-cta1-lbl" className="block text-slate-300 mb-1">
                            Primary CTA Label
                          </label>
                          <input
                            id="adm-hero-cta1-lbl"
                            type="text"
                            value={heroPrimaryCtaLabel}
                            onChange={(e) => setHeroPrimaryCtaLabel(e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-lg bg-[#08090C] border border-white/15 text-white"
                          />
                        </div>

                        <div>
                          <label htmlFor="adm-hero-cta1-url" className="block text-slate-300 mb-1">
                            Primary CTA URL
                          </label>
                          <input
                            id="adm-hero-cta1-url"
                            type="text"
                            value={heroPrimaryCtaHref}
                            onChange={(e) => setHeroPrimaryCtaHref(e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-lg bg-[#08090C] border border-white/15 text-white font-mono"
                          />
                        </div>

                        <div>
                          <label htmlFor="adm-hero-cta2-lbl" className="block text-slate-300 mb-1">
                            Secondary CTA Label
                          </label>
                          <input
                            id="adm-hero-cta2-lbl"
                            type="text"
                            value={heroSecondaryCtaLabel}
                            onChange={(e) => setHeroSecondaryCtaLabel(e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-lg bg-[#08090C] border border-white/15 text-white"
                          />
                        </div>

                        <div>
                          <label htmlFor="adm-hero-cta2-url" className="block text-slate-300 mb-1">
                            Secondary CTA URL
                          </label>
                          <input
                            id="adm-hero-cta2-url"
                            type="text"
                            value={heroSecondaryCtaHref}
                            onChange={(e) => setHeroSecondaryCtaHref(e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-lg bg-[#08090C] border border-white/15 text-white font-mono"
                          />
                        </div>

                        <div>
                          <label htmlFor="adm-hero-video" className="block text-slate-300 mb-1">
                            16:9 Hero Video Rendition URL (MP4/WebM)
                          </label>
                          <input
                            id="adm-hero-video"
                            type="text"
                            value={heroVideoUrl}
                            onChange={(e) => setHeroVideoUrl(e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-lg bg-[#08090C] border border-white/15 text-white font-mono"
                          />
                        </div>

                        <div>
                          <label htmlFor="adm-hero-poster" className="block text-slate-300 mb-1">
                            16:9 Hero Static Poster URL
                          </label>
                          <input
                            id="adm-hero-poster"
                            type="text"
                            value={heroPosterUrl}
                            onChange={(e) => setHeroPosterUrl(e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-lg bg-[#08090C] border border-white/15 text-white font-mono"
                          />
                        </div>

                        <div>
                          <label htmlFor="adm-hero-w" className="block text-slate-300 mb-1">
                            Source Width (px — 1920 target)
                          </label>
                          <input
                            id="adm-hero-w"
                            type="number"
                            value={heroWidth}
                            onChange={(e) => setHeroWidth(Number(e.target.value))}
                            className="w-full px-3.5 py-2.5 rounded-lg bg-[#08090C] border border-white/15 text-white font-mono"
                          />
                        </div>

                        <div>
                          <label htmlFor="adm-hero-h" className="block text-slate-300 mb-1">
                            Source Height (px — 1080 target)
                          </label>
                          <input
                            id="adm-hero-h"
                            type="number"
                            value={heroHeight}
                            onChange={(e) => setHeroHeight(Number(e.target.value))}
                            className="w-full px-3.5 py-2.5 rounded-lg bg-[#08090C] border border-white/15 text-white font-mono"
                          />
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="keep-white-text px-6 py-2.5 rounded-full bg-[#EC008C] hover:bg-[#d4007d] text-white font-semibold cursor-pointer"
                    >
                      Validate 16:9 &amp; Publish Brand / Hero Revision
                    </button>
                  </form>

                  {/* Hero Revision History & Rollback */}
                  <div className="pt-6 border-t border-white/10 space-y-3">
                    <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                      <History className="w-4 h-4 text-[#EC008C]" />
                      <span>Hero Revision History &amp; One-Click Rollback</span>
                    </h3>
                    <div className="space-y-2">
                      {brand.heroConfig.history.map((h) => (
                        <div
                          key={h.revisionNumber}
                          className="p-3 rounded-xl bg-[#08090C] border border-white/10 flex items-center justify-between gap-4 text-xs"
                        >
                          <div>
                            <span className="font-mono font-semibold text-white">
                              Rev #{h.revisionNumber}
                            </span>{' '}
                            · <span className="text-slate-300">{h.headline}</span>
                            <div className="text-slate-500 font-mono text-[11px]">
                              Saved by {h.updatedBy} at {h.updatedAt}
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRollbackHero(h.revisionNumber)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 whitespace-nowrap cursor-pointer"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                            <span>Restore Rev #{h.revisionNumber}</span>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: ALL PAGES — HEADER TEXTS, HIGHLIGHTS, SECTIONS & ITEMS */}
              {activeTab === 'pages_sections' && selectedPage && (
                <div className="bg-[#0F1117] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
                    <div>
                      <h2 className="text-xl font-bold text-white">
                        Complete Page Header &amp; Section Editor (All {pages.length} Pages)
                      </h2>
                      <p className="text-xs text-slate-400 mt-1">
                        Edit the page header badge, H1 headline, gradient accent, subtitle, CTAs, SEO metadata, highlights, and every section block.
                      </p>
                    </div>
                    <select
                      aria-label="Select page to edit"
                      value={selectedPageId}
                      onChange={(e) => handleSelectPage(e.target.value)}
                      className="bg-[#08090C] border border-white/15 rounded-xl px-3.5 py-2 text-xs text-white"
                    >
                      {pages.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.slug} — {p.title} (Live v{p.publishedRevision})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Page Header Texts & CTAs */}
                  <div className="p-5 rounded-2xl bg-[#08090C] border border-white/10 space-y-4 text-xs">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-semibold text-white">
                        1. Page Header Texts &amp; Action Buttons ({selectedPage.slug})
                      </h3>
                      <Link
                        href={selectedPage.slug}
                        className="inline-flex items-center gap-1 text-xs text-[#EC008C] hover:underline font-mono"
                      >
                        <span>View Live Page</span>
                        <ExternalLink className="w-3 h-3" />
                      </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="adm-page-badge" className="block text-slate-300 mb-1">
                          Header Top Pill Badge Text
                        </label>
                        <input
                          id="adm-page-badge"
                          type="text"
                          value={draftBadge}
                          onChange={(e) => setDraftBadge(e.target.value)}
                          className="w-full px-3.5 py-2 rounded-lg bg-[#111318] border border-white/15 text-white"
                        />
                      </div>

                      <div>
                        <label htmlFor="adm-page-gradient" className="block text-slate-300 mb-1">
                          Header Title Gradient Accent Words
                        </label>
                        <input
                          id="adm-page-gradient"
                          type="text"
                          value={draftGradient}
                          onChange={(e) => setDraftGradient(e.target.value)}
                          placeholder="e.g. Every Australian Bay"
                          className="w-full px-3.5 py-2 rounded-lg bg-[#111318] border border-white/15 text-white"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label htmlFor="adm-page-title" className="block text-slate-300 mb-1">
                          Page Title / Main Header Headline (H1)
                        </label>
                        <input
                          id="adm-page-title"
                          type="text"
                          value={draftTitle}
                          onChange={(e) => setDraftTitle(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-lg bg-[#111318] border border-white/15 text-white"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label htmlFor="adm-page-lead" className="block text-slate-300 mb-1">
                          Lead Description / Header Subheadline
                        </label>
                        <textarea
                          id="adm-page-lead"
                          rows={3}
                          value={draftLead}
                          onChange={(e) => setDraftLead(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-lg bg-[#111318] border border-white/15 text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-300 mb-1">
                          Header Primary CTA Label
                        </label>
                        <input
                          type="text"
                          value={draftPrimaryCtaLabel}
                          onChange={(e) => setDraftPrimaryCtaLabel(e.target.value)}
                          className="w-full px-3.5 py-2 rounded-lg bg-[#111318] border border-white/15 text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-300 mb-1">
                          Header Primary CTA Link
                        </label>
                        <input
                          type="text"
                          value={draftPrimaryCtaHref}
                          onChange={(e) => setDraftPrimaryCtaHref(e.target.value)}
                          className="w-full px-3.5 py-2 rounded-lg bg-[#111318] border border-white/15 text-white font-mono"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-300 mb-1">
                          Header Secondary CTA Label
                        </label>
                        <input
                          type="text"
                          value={draftSecondaryCtaLabel}
                          onChange={(e) => setDraftSecondaryCtaLabel(e.target.value)}
                          className="w-full px-3.5 py-2 rounded-lg bg-[#111318] border border-white/15 text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-300 mb-1">
                          Header Secondary CTA Link
                        </label>
                        <input
                          type="text"
                          value={draftSecondaryCtaHref}
                          onChange={(e) => setDraftSecondaryCtaHref(e.target.value)}
                          className="w-full px-3.5 py-2 rounded-lg bg-[#111318] border border-white/15 text-white font-mono"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-300 mb-1">
                          SEO Title Tag
                        </label>
                        <input
                          type="text"
                          value={draftSeoTitle}
                          onChange={(e) => setDraftSeoTitle(e.target.value)}
                          className="w-full px-3.5 py-2 rounded-lg bg-[#111318] border border-white/15 text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-300 mb-1">
                          SEO Meta Description
                        </label>
                        <input
                          type="text"
                          value={draftSeoDesc}
                          onChange={(e) => setDraftSeoDesc(e.target.value)}
                          className="w-full px-3.5 py-2 rounded-lg bg-[#111318] border border-white/15 text-white"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Page Key Highlights Editor */}
                  <div className="p-5 rounded-2xl bg-[#08090C] border border-white/10 space-y-3 text-xs">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-semibold text-white">
                        2. Engineered Highlights ({draftHighlights.length} Bullets)
                      </h3>
                      <button
                        type="button"
                        onClick={() =>
                          setDraftHighlights([
                            ...draftHighlights,
                            'New engineered capability highlight',
                          ])
                        }
                        className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/10 hover:bg-white/15 text-white cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                        <span>Add Highlight</span>
                      </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {draftHighlights.map((hl, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <input
                            type="text"
                            value={hl}
                            onChange={(e) => {
                              const next = [...draftHighlights];
                              next[idx] = e.target.value;
                              setDraftHighlights(next);
                            }}
                            className="flex-1 px-3 py-2 rounded-lg bg-[#111318] border border-white/15 text-white"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              setDraftHighlights(
                                draftHighlights.filter((_, i) => i !== idx)
                              )
                            }
                            aria-label="Remove highlight"
                            className="p-2 rounded-lg bg-rose-950/50 hover:bg-rose-900/60 text-rose-300 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Structured Section Blocks & Items Editor */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-semibold text-white">
                        3. Page Sections &amp; Content Cards ({draftSections.length} Blocks)
                      </h3>
                      <button
                        type="button"
                        onClick={handleAddSection}
                        className="keep-white-text inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#EC008C] hover:bg-[#d4007d] text-xs font-semibold text-white cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Section Block</span>
                      </button>
                    </div>

                    <div className="space-y-4">
                      {draftSections.map((sec, idx) => (
                        <div
                          key={sec.id}
                          className="p-5 rounded-2xl bg-[#08090C] border border-white/10 space-y-4 text-xs"
                        >
                          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3">
                            <div className="font-mono text-[#EC008C] font-semibold">
                              SECTION #{idx + 1} · {sec.type.toUpperCase()}
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                              <button
                                type="button"
                                onClick={() => handleMoveSection(idx, -1)}
                                disabled={idx === 0}
                                aria-label={`Move ${sec.title} up`}
                                className="p-1.5 rounded bg-white/5 hover:bg-white/10 disabled:opacity-30 cursor-pointer"
                              >
                                <ArrowUp className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleMoveSection(idx, 1)}
                                disabled={idx === draftSections.length - 1}
                                aria-label={`Move ${sec.title} down`}
                                className="p-1.5 rounded bg-white/5 hover:bg-white/10 disabled:opacity-30 cursor-pointer"
                              >
                                <ArrowDown className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteSection(idx)}
                                aria-label={`Delete ${sec.title}`}
                                className="p-1.5 rounded bg-rose-950/60 hover:bg-rose-900/70 text-rose-300 cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-slate-400 mb-1">
                                Section Heading (H2)
                              </label>
                              <input
                                type="text"
                                value={sec.title}
                                onChange={(e) => {
                                  const next = [...draftSections];
                                  next[idx] = { ...sec, title: e.target.value };
                                  setDraftSections(next);
                                }}
                                className="w-full px-3 py-2 rounded-lg bg-[#111318] border border-white/15 text-white"
                              />
                            </div>
                            <div>
                              <label className="block text-slate-400 mb-1">
                                Section Subtitle / Description
                              </label>
                              <input
                                type="text"
                                value={sec.subtitle}
                                onChange={(e) => {
                                  const next = [...draftSections];
                                  next[idx] = {
                                    ...sec,
                                    subtitle: e.target.value,
                                  };
                                  setDraftSections(next);
                                }}
                                className="w-full px-3 py-2 rounded-lg bg-[#111318] border border-white/15 text-white"
                              />
                            </div>
                          </div>

                          {/* Section Items */}
                          <div className="space-y-2.5 pt-2">
                            <div className="flex items-center justify-between">
                              <span className="text-[11px] font-mono text-slate-400">
                                Section Cards / Items ({(sec.items || []).length})
                              </span>
                              <button
                                type="button"
                                onClick={() => {
                                  const next = [...draftSections];
                                  next[idx] = {
                                    ...sec,
                                    items: [
                                      ...(sec.items || []),
                                      {
                                        id: `item_${Date.now()}`,
                                        title: 'New Card Title',
                                        description: 'Card description text.',
                                        metric: 'NEW',
                                        tag: 'SPEC',
                                      },
                                    ],
                                  };
                                  setDraftSections(next);
                                }}
                                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white/5 hover:bg-white/10 text-slate-200 text-[11px] cursor-pointer"
                              >
                                <Plus className="w-3 h-3" />
                                <span>Add Item</span>
                              </button>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              {(sec.items || []).map((item, itemIdx) => (
                                <div
                                  key={item.id}
                                  className="p-3 rounded-xl bg-[#111318] border border-white/10 space-y-2"
                                >
                                  <div className="flex items-center justify-between gap-2">
                                    <input
                                      type="text"
                                      value={item.title}
                                      onChange={(e) => {
                                        const next = [...draftSections];
                                        const nextItems = [...(sec.items || [])];
                                        nextItems[itemIdx] = {
                                          ...item,
                                          title: e.target.value,
                                        };
                                        next[idx] = { ...sec, items: nextItems };
                                        setDraftSections(next);
                                      }}
                                      placeholder="Card Title"
                                      className="flex-1 px-2.5 py-1.5 rounded bg-[#08090C] border border-white/10 text-white font-medium"
                                    />
                                    <input
                                      type="text"
                                      value={item.metric || ''}
                                      onChange={(e) => {
                                        const next = [...draftSections];
                                        const nextItems = [...(sec.items || [])];
                                        nextItems[itemIdx] = {
                                          ...item,
                                          metric: e.target.value,
                                        };
                                        next[idx] = { ...sec, items: nextItems };
                                        setDraftSections(next);
                                      }}
                                      placeholder="Metric"
                                      className="w-24 px-2 py-1.5 rounded bg-[#08090C] border border-white/10 text-emerald-300 font-mono text-[11px]"
                                    />
                                  </div>
                                  <textarea
                                    rows={2}
                                    value={item.description}
                                    onChange={(e) => {
                                      const next = [...draftSections];
                                      const nextItems = [...(sec.items || [])];
                                      nextItems[itemIdx] = {
                                        ...item,
                                        description: e.target.value,
                                      };
                                      next[idx] = { ...sec, items: nextItems };
                                      setDraftSections(next);
                                    }}
                                    className="w-full px-2.5 py-1.5 rounded bg-[#08090C] border border-white/10 text-slate-300"
                                  />
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/10">
                    <button
                      type="button"
                      onClick={handleSaveDraft}
                      className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/15 text-xs font-semibold text-white cursor-pointer"
                    >
                      Save Isolated Draft &amp; Generate Preview Token
                    </button>
                    <button
                      type="button"
                      onClick={handlePublishPage}
                      className="keep-white-text px-6 py-2.5 rounded-full bg-[#EC008C] hover:bg-[#d4007d] text-xs font-semibold text-white cursor-pointer"
                    >
                      Publish Header &amp; Sections Live
                    </button>

                    {generatedPreviewToken && (
                      <Link
                        href={`${selectedPage.slug}?previewToken=${encodeURIComponent(generatedPreviewToken)}`}
                        className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-200 text-xs font-mono"
                      >
                        <span>Open Scoped Draft Preview</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 4: SHOP PRODUCTS & 06 CATEGORY CARDS */}
              {activeTab === 'catalogue_shop' && selectedProd && (
                <div className="space-y-8">
                  {/* Part A: 5 Shop Products */}
                  <div className="bg-[#0F1117] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
                    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
                      <div>
                        <h2 className="text-xl font-bold text-white">
                          Single Commerce Authority — Shop Product Editor (All 5 Products)
                        </h2>
                        <p className="text-xs text-slate-400 mt-1">
                          Updating name, SKU, price, stock, description, or 16:9 studio image here updates Homepage cards, Shop listing, PDP, Cart, and Checkout immediately.
                        </p>
                      </div>
                      <select
                        aria-label="Select shop product"
                        value={selectedProdId}
                        onChange={(e) => handleSelectProduct(e.target.value)}
                        className="bg-[#08090C] border border-white/15 rounded-xl px-3.5 py-2 text-xs text-white"
                      >
                        {products.map((p) => (
                          <option key={p.id} value={p.id}>
                            {p.name} ({p.sku})
                          </option>
                        ))}
                      </select>
                    </div>

                    <form onSubmit={handleSaveShopProduct} className="space-y-4 text-xs">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="sm:col-span-2">
                          <label htmlFor="adm-prod-name" className="block text-slate-300 mb-1">
                            Product Title
                          </label>
                          <input
                            id="adm-prod-name"
                            type="text"
                            value={prodName}
                            onChange={(e) => setProdName(e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-lg bg-[#08090C] border border-white/15 text-white"
                          />
                        </div>

                        <div>
                          <label htmlFor="adm-prod-sku" className="block text-slate-300 mb-1">
                            SKU Code
                          </label>
                          <input
                            id="adm-prod-sku"
                            type="text"
                            value={prodSku}
                            onChange={(e) => setProdSku(e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-lg bg-[#08090C] border border-white/15 text-white font-mono"
                          />
                        </div>

                        <div>
                          <label htmlFor="adm-prod-price" className="block text-slate-300 mb-1">
                            Base Price ($ AUD)
                          </label>
                          <input
                            id="adm-prod-price"
                            type="number"
                            min={1}
                            value={prodPriceDollars}
                            onChange={(e) => setProdPriceDollars(Number(e.target.value))}
                            className="w-full px-3.5 py-2.5 rounded-lg bg-[#08090C] border border-white/15 text-white font-mono tabular-nums"
                          />
                        </div>

                        <div>
                          <label htmlFor="adm-prod-maxprice" className="block text-slate-300 mb-1">
                            Max Variant Price ($ AUD, Optional)
                          </label>
                          <input
                            id="adm-prod-maxprice"
                            type="number"
                            value={prodMaxPriceDollars}
                            onChange={(e) => setProdMaxPriceDollars(e.target.value)}
                            placeholder="e.g. 730"
                            className="w-full px-3.5 py-2.5 rounded-lg bg-[#08090C] border border-white/15 text-white font-mono tabular-nums"
                          />
                        </div>

                        <div>
                          <label htmlFor="adm-prod-stock" className="block text-slate-300 mb-1">
                            Available Stock Count
                          </label>
                          <input
                            id="adm-prod-stock"
                            type="number"
                            min={0}
                            value={prodStock}
                            onChange={(e) => setProdStock(Number(e.target.value))}
                            className="w-full px-3.5 py-2.5 rounded-lg bg-[#08090C] border border-white/15 text-white font-mono tabular-nums"
                          />
                        </div>

                        <div className="sm:col-span-3">
                          <label htmlFor="adm-prod-short" className="block text-slate-300 mb-1">
                            Short Card Description
                          </label>
                          <input
                            id="adm-prod-short"
                            type="text"
                            value={prodShortDesc}
                            onChange={(e) => setProdShortDesc(e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-lg bg-[#08090C] border border-white/15 text-white"
                          />
                        </div>

                        <div className="sm:col-span-3">
                          <label htmlFor="adm-prod-full" className="block text-slate-300 mb-1">
                            Full Technical Description
                          </label>
                          <textarea
                            id="adm-prod-full"
                            rows={3}
                            value={prodFullDesc}
                            onChange={(e) => setProdFullDesc(e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-lg bg-[#08090C] border border-white/15 text-white"
                          />
                        </div>

                        <div className="sm:col-span-3">
                          <label htmlFor="adm-prod-img" className="block text-slate-300 mb-1">
                            Custom 16:9 Studio Image URL
                          </label>
                          <input
                            id="adm-prod-img"
                            type="text"
                            value={prodCustomImage}
                            onChange={(e) => setProdCustomImage(e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-lg bg-[#08090C] border border-white/15 text-white font-mono"
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="keep-white-text px-6 py-2.5 rounded-full bg-[#EC008C] hover:bg-[#d4007d] text-white font-semibold cursor-pointer"
                      >
                        Save Product Details, Price &amp; Stock
                      </button>
                    </form>
                  </div>

                  {/* Part B: 6 Product Family Category Cards */}
                  <div className="bg-[#0F1117] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
                    <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
                      <div>
                        <h2 className="text-xl font-bold text-white flex items-center gap-2">
                          <Grid className="w-5 h-5 text-[#EC008C]" />
                          <span>06 Product &amp; Automation Family Cards Editor</span>
                        </h2>
                        <p className="text-xs text-slate-400 mt-1">
                          Edit the 6 category cards displayed on the Homepage and Products catalogue.
                        </p>
                      </div>
                    </div>

                    <form onSubmit={handleSaveCategoryCards} className="space-y-4 text-xs">
                      <div className="grid grid-cols-1 gap-4">
                        {categoryCards.map((card, idx) => (
                          <div
                            key={card.id}
                            className="p-4 rounded-xl bg-[#08090C] border border-white/10 space-y-3"
                          >
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                              <div>
                                <label className="block text-slate-400 mb-1">
                                  Card #{idx + 1} Title
                                </label>
                                <input
                                  type="text"
                                  value={card.title}
                                  onChange={(e) => {
                                    const next = [...categoryCards];
                                    next[idx] = { ...card, title: e.target.value };
                                    setCategoryCards(next);
                                  }}
                                  className="w-full px-3 py-2 rounded-lg bg-[#111318] border border-white/15 text-white"
                                />
                              </div>

                              <div>
                                <label className="block text-slate-400 mb-1">
                                  Top-Right Floating Badge
                                </label>
                                <input
                                  type="text"
                                  value={card.badge}
                                  onChange={(e) => {
                                    const next = [...categoryCards];
                                    next[idx] = { ...card, badge: e.target.value };
                                    setCategoryCards(next);
                                  }}
                                  className="w-full px-3 py-2 rounded-lg bg-[#111318] border border-white/15 text-white font-mono"
                                />
                              </div>

                              <div>
                                <label className="block text-slate-400 mb-1">
                                  Subtitle (Magenta Mono)
                                </label>
                                <input
                                  type="text"
                                  value={card.subtitle}
                                  onChange={(e) => {
                                    const next = [...categoryCards];
                                    next[idx] = {
                                      ...card,
                                      subtitle: e.target.value,
                                    };
                                    setCategoryCards(next);
                                  }}
                                  className="w-full px-3 py-2 rounded-lg bg-[#111318] border border-white/15 text-white font-mono"
                                />
                              </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                              <div className="sm:col-span-2">
                                <label className="block text-slate-400 mb-1">
                                  Card Description
                                </label>
                                <input
                                  type="text"
                                  value={card.description}
                                  onChange={(e) => {
                                    const next = [...categoryCards];
                                    next[idx] = {
                                      ...card,
                                      description: e.target.value,
                                    };
                                    setCategoryCards(next);
                                  }}
                                  className="w-full px-3 py-2 rounded-lg bg-[#111318] border border-white/15 text-white"
                                />
                              </div>

                              <div>
                                <label className="block text-slate-400 mb-1">
                                  Destination URL
                                </label>
                                <input
                                  type="text"
                                  value={card.href}
                                  onChange={(e) => {
                                    const next = [...categoryCards];
                                    next[idx] = { ...card, href: e.target.value };
                                    setCategoryCards(next);
                                  }}
                                  className="w-full px-3 py-2 rounded-lg bg-[#111318] border border-white/15 text-white font-mono"
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <button
                        type="submit"
                        className="keep-white-text px-6 py-2.5 rounded-full bg-[#EC008C] hover:bg-[#d4007d] text-white font-semibold cursor-pointer"
                      >
                        Save &amp; Publish All 6 Category Cards
                      </button>
                    </form>
                  </div>
                </div>
              )}

              {/* TAB 5: ENQUIRIES, WARRANTIES & PRIVATE PURCHASE PROOFS */}
              {activeTab === 'requests_proofs' && (
                <div className="bg-[#0F1117] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-8">
                  <div className="space-y-1">
                    <h2 className="text-xl font-bold text-white">
                      Enquiries, Warranty Registrations &amp; Private Service Proofs
                    </h2>
                    <p className="text-xs text-slate-400">
                      Test Role-Based Access Control on private customer purchase proof attachments below.
                    </p>
                  </div>

                  {proofResult && (
                    <div
                      role="status"
                      className="p-4 rounded-xl bg-[#08090C] border border-white/20 text-xs font-mono text-slate-100"
                    >
                      {proofResult}
                    </div>
                  )}

                  {/* Service Registrations with Private Proof Retrieval Test */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-semibold text-white">
                      Service Registrations &amp; Private Purchase Evidence ({serviceRegistrations.length})
                    </h3>
                    <div className="space-y-3">
                      {serviceRegistrations.map((srv) => (
                        <div
                          key={srv.id}
                          className="p-4 rounded-xl bg-[#08090C] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs"
                        >
                          <div className="space-y-1">
                            <div className="font-semibold text-white">
                              {srv.referenceCode} · {srv.firstName} {srv.lastName} ({srv.suburb}{' '}
                              {srv.postcode})
                            </div>
                            <div className="text-slate-400 font-mono">
                              Serial: {srv.serialNumber} · Installed: {srv.installationDate} · Status:{' '}
                              {srv.status}
                            </div>
                            <div className="text-slate-400 font-mono">
                              Private Proof: {srv.proofAttachment.fileName} (
                              {Math.round(srv.proofAttachment.sizeBytes / 1024)} KB)
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() =>
                              handleRetrievePrivateProof(srv.proofAttachment.id)
                            }
                            className="keep-white-text px-4 py-2 rounded-lg bg-[#EC008C] hover:bg-[#d4007d] text-white font-semibold whitespace-nowrap self-start cursor-pointer"
                          >
                            Retrieve Private Proof ({actor.role})
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Enquiries List */}
                  <div className="space-y-3 pt-4 border-t border-white/10">
                    <h3 className="text-sm font-semibold text-white">
                      Customer Enquiries ({enquiries.length})
                    </h3>
                    <div className="space-y-2.5">
                      {enquiries.map((enq) => (
                        <div
                          key={enq.id}
                          className="p-4 rounded-xl bg-[#08090C] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs"
                        >
                          <div className="space-y-1">
                            <div className="font-semibold text-white">
                              {enq.referenceCode} · {enq.name} ({enq.suburb}) — {enq.serviceType}
                            </div>
                            <div className="text-slate-400">{enq.message}</div>
                            <div className="text-slate-500 font-mono">
                              Source: {enq.sourcePagePath} · Status: {enq.status}
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() =>
                              mutateServer('update_workflow_record', {
                                workflowType: 'enquiry',
                                recordId: enq.id,
                                status: 'in_progress',
                                assignedTo: actor.email,
                              })
                            }
                            className="px-3.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-white whitespace-nowrap self-start cursor-pointer"
                          >
                            Assign &amp; Mark In Progress
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 6: 44 ROUTES & REDIRECTS */}
              {activeTab === 'seo_redirects' && (
                <div className="bg-[#0F1117] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
                  <h2 className="text-xl font-bold text-white">
                    Route Coverage Register ({pages.length} CMS Pages + Commerce &amp; System Routes) &amp; Safe Redirects
                  </h2>
                  <div className="space-y-2">
                    <h3 className="text-sm font-semibold text-white">
                      Configured Legacy Malformed Link Redirects
                    </h3>
                    {redirects.map((r) => (
                      <div
                        key={r.id}
                        className="p-3 rounded-xl bg-[#08090C] border border-white/10 text-xs font-mono flex flex-wrap items-center justify-between gap-2"
                      >
                        <span className="text-slate-300">
                          {r.oldPath} → <strong className="text-white">{r.destinationPath}</strong> ({r.statusCode})
                        </span>
                        <span className="text-slate-500 font-sans">{r.reason}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 7: RBAC & SECURITY AUDIT LOG */}
              {activeTab === 'roles_audit' && (
                <div className="bg-[#0F1117] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
                    <div>
                      <h2 className="text-xl font-bold text-white">
                        Role-Based Access Control &amp; Immutable Security Audit Log
                      </h2>
                      <p className="text-xs text-slate-400 mt-1">
                        Verify Admin Acceptance Scenario #10: non-administrators are blocked from changing roles.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleTestRoleEscalation}
                      className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-xs font-semibold text-white cursor-pointer"
                    >
                      Test Role Policy Modification as {actor.role}
                    </button>
                  </div>

                  <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
                    {auditLog.map((entry) => (
                      <div
                        key={entry.id}
                        className="p-3 rounded-xl bg-[#08090C] border border-white/10 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                      >
                        <div>
                          <span className="font-mono font-semibold text-[#EC008C]">
                            {entry.action}
                          </span>{' '}
                          · <span className="text-white">{entry.summary}</span>
                        </div>
                        <div className="text-[11px] font-mono text-slate-500 shrink-0">
                          {entry.actorEmail} ({entry.actorRole}) · {entry.timestamp.slice(0, 19)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </SiteShell>
  );
}
