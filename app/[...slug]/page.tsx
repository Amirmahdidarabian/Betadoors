'use client';

import React, { useEffect, useMemo, Suspense } from 'react';
import Link from 'next/link';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import {
  ArrowUpRight,
  Phone,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  Wrench,
  FileText,
  Sparkles,
  Eye,
  Clock,
  ChevronRight,
  Sliders,
} from 'lucide-react';
import { useBetaDoors } from '@/components/providers/BetaDoorsProvider';
import { SiteShell } from '@/components/layout/SiteShell';
import { EnquiryForm } from '@/components/forms/EnquiryForm';
import { ProductTechnicalArtwork } from '@/components/brand/ProductTechnicalArtwork';
import { formatAudCents } from '@/lib/domain-logic';

function DynamicCmsPageContent() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const previewToken = searchParams.get('previewToken');
  const { brand, pages, redirects, products, manuals, isLoading } = useBetaDoors();

  const decodedPath = useMemo(() => {
    const rawSlugSegments = Array.isArray(params?.slug)
      ? params.slug
      : typeof params?.slug === 'string'
        ? [params.slug]
        : [];
    const joined = rawSlugSegments
      .map((seg) => {
        try {
          return decodeURIComponent(seg);
        } catch {
          return seg;
        }
      })
      .join('/');
    return `/${joined}/`.replace(/\/+/g, '/');
  }, [params]);

  const matchedRedirect = useMemo(() => {
    const trimmed = decodedPath.trim();
    const withoutSlash = trimmed.replace(/\/$/, '');
    return redirects.find(
      (r) =>
        r.oldPath === decodedPath ||
        r.oldPath === trimmed ||
        r.oldPath.replace(/\/$/, '') === withoutSlash ||
        decodedPath.includes('sectional-and-ti')
    );
  }, [decodedPath, redirects]);

  useEffect(() => {
    if (matchedRedirect) {
      router.replace(matchedRedirect.destinationPath);
    }
  }, [matchedRedirect, router]);

  const pageRecord = useMemo(() => {
    const normalizedTarget = decodedPath.toLowerCase().replace(/\/+/g, '/');
    return pages.find((p) => {
      const candidate = p.slug.toLowerCase().replace(/\/+/g, '/');
      return (
        candidate === normalizedTarget ||
        candidate.replace(/\/$/, '') === normalizedTarget.replace(/\/$/, '')
      );
    });
  }, [decodedPath, pages]);

  const relatedCatalogPages = useMemo(() => {
    if (!pageRecord) return [];
    return pages
      .filter(
        (p) =>
          p.category === pageRecord.category &&
          p.slug !== pageRecord.slug &&
          p.status === 'published'
      )
      .slice(0, 6);
  }, [pageRecord, pages]);

  const siblingLocalPages = useMemo(() => {
    return pages.filter(
      (p) => p.category === 'local_services' && p.status === 'published'
    );
  }, [pages]);

  if (isLoading || matchedRedirect) {
    return (
      <SiteShell>
        <div className="mx-auto max-w-[1760px] px-4 py-20 sm:px-8">
          <div className="h-[460px] animate-pulse rounded-none border border-white/10 bg-[#0B0D11]" />
        </div>
      </SiteShell>
    );
  }

  if (!pageRecord) {
    return (
      <SiteShell>
        <div className="mx-auto max-w-[1000px] px-4 py-24 text-center sm:px-8">
          <div className="inline-flex items-center gap-2 rounded-none border border-white/10 bg-[#08090C] px-4 py-1.5 font-mono text-xs text-slate-300">
            404 • ROUTE NOT FOUND IN CMS REGISTRY
          </div>
          <h1 className="mt-6 font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Page Not Found
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-slate-400">
            The requested path <code className="font-mono text-slate-200">{decodedPath}</code> could not be matched to an active BETA DOORS catalogue page, product, or service region.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/"
              className="keep-white-text inline-flex items-center gap-2 rounded-none bg-[#EC008C] px-6 py-3 text-xs font-mono font-bold text-white transition hover:bg-[#d4007d]"
            >
              RETURN HOME
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 rounded-none border border-white/15 bg-[#08090C] px-6 py-3 text-xs font-mono font-semibold text-white transition hover:bg-white/[0.08]"
            >
              BROWSE CATALOGUE
            </Link>
            <Link
              href="/contact-us"
              className="inline-flex items-center gap-2 rounded-none border border-white/15 bg-[#08090C] px-6 py-3 text-xs font-mono font-semibold text-white transition hover:bg-white/[0.08]"
            >
              CONTACT 1300 238 243
            </Link>
          </div>
        </div>
      </SiteShell>
    );
  }

  const isPreviewActive =
    Boolean(previewToken) &&
    Boolean(pageRecord.draftTitle || pageRecord.draftLeadDescription || pageRecord.draftSections);

  const cleanSlugKey = pageRecord.slug.replace(/\/$/, '') || '/';
  const savedHdr =
    brand.pageHeaders?.[cleanSlugKey] ||
    brand.pageHeaders?.[pageRecord.slug];

  const activeTitle =
    isPreviewActive && pageRecord.draftTitle
      ? pageRecord.draftTitle
      : savedHdr?.headlinePrimary || pageRecord.title;
  const activeGradient =
    savedHdr?.headlineGradient ?? pageRecord.headlineGradient ?? '';
  const activeLead =
    isPreviewActive && pageRecord.draftLeadDescription
      ? pageRecord.draftLeadDescription
      : savedHdr?.subheadline || pageRecord.leadDescription;
  const activeBadge =
    savedHdr?.badgeText ||
    pageRecord.headerBadge ||
    pageRecord.serviceType ||
    `BETA DOORS • ${pageRecord.category.toUpperCase()}`;
  const activePrimaryCtaLabel =
    savedHdr?.primaryCtaLabel ||
    pageRecord.headerPrimaryCtaLabel ||
    'Request a Technical Quote';
  const activePrimaryCtaHref =
    savedHdr?.primaryCtaHref ||
    pageRecord.headerPrimaryCtaHref ||
    '#page-enquiry-desk';
  const activeSecondaryCtaLabel =
    savedHdr?.secondaryCtaLabel ||
    pageRecord.headerSecondaryCtaLabel ||
    'Online Shop';
  const activeSecondaryCtaHref =
    savedHdr?.secondaryCtaHref ||
    pageRecord.headerSecondaryCtaHref ||
    '/shop';

  const activeSections =
    isPreviewActive && pageRecord.draftSections
      ? pageRecord.draftSections
      : pageRecord.sections;
  const suburbName = pageRecord.location?.name;

  return (
    <SiteShell>
      {isPreviewActive && (
        <div className="border-b border-amber-400/30 bg-amber-500/10 px-4 py-2.5 text-xs text-amber-200">
          <div className="mx-auto flex max-w-[1760px] flex-wrap items-center justify-between gap-2">
            <span className="inline-flex items-center gap-2 font-medium">
              <Eye className="h-4 w-4 text-amber-300" />
              Scoped Draft Preview Active ({pageRecord.slug}) — Changes shown here are isolated from public visitors until published.
            </span>
            <Link
              href="/admin"
              className="rounded-none border border-amber-300/40 bg-amber-400/20 px-3 py-1 font-mono text-[11px] font-medium text-amber-100 hover:bg-amber-400/30"
            >
              Return to Admin Studio
            </Link>
          </div>
        </div>
      )}

      {/* Architectural HUD Stage Header (0px Sharp) */}
      <section
        data-cms-custom-header="true"
        data-cms-label={`Page Header (${pageRecord.slug})`}
        className="mx-auto max-w-[1760px] px-3 pt-2 sm:px-5 lg:px-7"
      >
        <div className="hud-corner-brackets brand-animated-border hud-technical-grid relative overflow-hidden rounded-none border border-white/[0.1] bg-[#0B0C10] px-6 py-10 sm:px-10 sm:py-14">
          {/* Top Breadcrumb & Status Bar */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-white/[0.08]">
            <nav
              aria-label="Breadcrumb"
              className="inline-flex items-center gap-2 rounded-none border border-white/[0.12] bg-[#08090C] px-3.5 py-1.5 text-xs text-slate-300"
            >
              <Link href="/" className="text-slate-400 transition hover:text-white">
                Home
              </Link>
              <ChevronRight className="h-3.5 w-3.5 text-slate-600" />
              <span className="font-mono text-[11px] uppercase text-slate-400">
                {pageRecord.category.replace(/_/g, ' ')}
              </span>
              <ChevronRight className="h-3.5 w-3.5 text-slate-600" />
              <span className="font-medium text-white">{activeTitle}</span>
            </nav>

            <div className="inline-flex items-center gap-2 rounded-none border border-[#EC008C]/40 bg-[#EC008C]/15 px-3.5 py-1 font-mono text-[11px] text-[#ff7ac6]">
              <Sparkles className="h-3.5 w-3.5 text-[#EC008C]" />
              {suburbName
                ? `MELBOURNE SERVICE • ${suburbName.toUpperCase()}`
                : `SPECIFICATION • ${pageRecord.template.toUpperCase().replace(/_/g, ' ')}`}
            </div>
          </div>

          {/* Headline & Subtitle */}
          <div className="relative z-10 mt-7 max-w-3xl">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#ff7ac6]">
              {activeBadge}
            </p>
            <h1 className="mt-2 font-display text-3xl font-semibold tracking-[-0.03em] text-white sm:text-5xl lg:text-[50px] lg:leading-[1.08]">
              <span>{activeTitle}</span>
              {activeGradient ? (
                <span className="text-[#EC008C]"> {activeGradient}</span>
              ) : null}
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">
              {activeLead}
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a
                href={activePrimaryCtaHref}
                className="keep-white-text inline-flex items-center gap-2 rounded-none bg-[#EC008C] px-6 py-3 text-xs font-mono font-bold text-white shadow-[0_0_24px_rgba(236,0,140,0.35)] transition hover:bg-[#d4007d]"
              >
                <span>{activePrimaryCtaLabel}</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
              <a
                href="tel:1300238243"
                className="inline-flex items-center gap-2 rounded-none border border-white/15 bg-[#08090C] px-5 py-3 text-xs font-mono font-semibold text-white transition hover:border-[#EC008C]/50"
              >
                <Phone className="h-3.5 w-3.5 text-[#EC008C]" />
                <span>CALL 1300 238 243</span>
              </a>
              <Link
                href={activeSecondaryCtaHref}
                className="inline-flex items-center gap-2 rounded-none border border-white/15 bg-[#08090C] px-5 py-3 text-xs font-mono font-semibold text-slate-200 transition hover:border-[#EC008C]/50 hover:text-white"
              >
                <span>{activeSecondaryCtaLabel}</span>
                <ArrowUpRight className="h-3.5 w-3.5 text-[#EC008C]" />
              </Link>
            </div>
          </div>

          {/* Bottom Telemetry Bar */}
          <div className="relative z-10 mt-10 grid grid-cols-2 gap-3 border-t border-white/[0.08] pt-6 sm:grid-cols-4">
            <div className="rounded-none border border-white/[0.08] bg-[#08090C] p-3.5">
              <div className="font-mono text-[10px] uppercase tracking-wider text-[#ff7ac6]">
                [01] AUSTRALIAN STANDARDS
              </div>
              <div className="mt-1 font-mono text-sm font-bold text-white">
                AS/NZS 60335-2-95
              </div>
            </div>
            <div className="rounded-none border border-white/[0.08] bg-[#08090C] p-3.5">
              <div className="font-mono text-[10px] uppercase tracking-wider text-[#ff7ac6]">
                [02] DIRECT SUPPORT LINE
              </div>
              <div className="mt-1 font-mono text-sm font-bold text-white tabular-nums">
                1300 238 243
              </div>
            </div>
            <div className="rounded-none border border-white/[0.08] bg-[#08090C] p-3.5">
              <div className="font-mono text-[10px] uppercase tracking-wider text-[#ff7ac6]">
                [03] MELBOURNE COVERAGE
              </div>
              <div className="mt-1 font-display text-sm font-semibold text-white">
                {suburbName ? `${suburbName} & Surrounds` : '11 Metropolitan Corridors'}
              </div>
            </div>
            <div className="rounded-none border border-white/[0.08] bg-[#08090C] p-3.5">
              <div className="font-mono text-[10px] uppercase tracking-wider text-[#ff7ac6]">
                [04] CMS REVISION
              </div>
              <div className="mt-1 font-mono text-xs text-slate-300 tabular-nums">
                Rev #{isPreviewActive ? pageRecord.draftRevision : pageRecord.publishedRevision} •{' '}
                {isPreviewActive ? 'DRAFT' : 'PUBLISHED'}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Structured CMS Content & Bento Insights */}
      <section className="mx-auto max-w-[1760px] px-3 py-12 sm:px-5 lg:px-7">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-8">
            {/* Key Highlights Card */}
            {pageRecord.highlights && pageRecord.highlights.length > 0 && (
              <article className="hud-corner-brackets brand-animated-border relative overflow-hidden rounded-none border border-white/[0.09] bg-[#0B0C10] p-6 sm:p-8">
                <div className="flex items-center justify-between gap-4 pb-3 border-b border-white/[0.07]">
                  <span className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[#EC008C]">
                    ENGINEERED HIGHLIGHTS
                  </span>
                  <span className="rounded-none border border-white/15 bg-[#08090C] px-3 py-0.5 font-mono text-[10px] text-slate-400">
                    {pageRecord.slug}
                  </span>
                </div>
                <h2 className="mt-4 font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                  Key Capabilities &amp; Operational Scope
                </h2>
                <ul className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {pageRecord.highlights.map((bullet, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2.5 rounded-none border border-white/[0.08] bg-[#08090C] p-3.5 text-xs text-slate-200"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                {pageRecord.specs && pageRecord.specs.length > 0 && (
                  <div className="mt-6 overflow-hidden rounded-none border border-white/[0.09] bg-[#08090C]">
                    <div className="border-b border-white/[0.08] bg-[#0B0C10] px-4 py-2.5 font-mono text-[11px] font-bold uppercase tracking-wider text-[#ff7ac6]">
                      Technical Specification Matrix
                    </div>
                    <dl className="divide-y divide-white/[0.06]">
                      {pageRecord.specs.map((spec, idx) => (
                        <div
                          key={idx}
                          className="grid grid-cols-1 gap-1 px-4 py-3 text-xs sm:grid-cols-3 sm:gap-4"
                        >
                          <dt className="font-mono text-slate-400">{spec.label}</dt>
                          <dd className="font-mono font-semibold text-white sm:col-span-2 tabular-nums">
                            {spec.value} {spec.unit || ''}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                )}
              </article>
            )}

            {/* Structured CMS Sections */}
            {activeSections.map((section, index) => (
              <article
                key={section.id}
                className="hud-corner-brackets brand-animated-border relative overflow-hidden rounded-none border border-white/[0.09] bg-[#0B0C10] p-6 sm:p-8"
              >
                <div className="flex items-center justify-between gap-4 pb-3 border-b border-white/[0.07]">
                  <span className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[#EC008C]">
                    SECTION 0{index + 1} • {section.type.toUpperCase().replace(/_/g, ' ')}
                  </span>
                  <span className="rounded-none border border-white/15 bg-[#08090C] px-3 py-0.5 font-mono text-[10px] text-slate-400">
                    {section.motionPreset}
                  </span>
                </div>

                <h2 className="mt-4 font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                  {section.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-300 sm:text-base">
                  {section.subtitle}
                </p>

                {section.items && section.items.length > 0 && (
                  <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {section.items.map((item) => (
                      <div
                        key={item.id}
                        className="rounded-none border border-white/[0.08] bg-[#08090C] p-4"
                      >
                        {item.tag && (
                          <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#EC008C]">
                            {item.tag}
                          </span>
                        )}
                        <div className="mt-1 flex items-baseline justify-between gap-2">
                          <h3 className="font-display text-base font-semibold text-white">
                            {item.title}
                          </h3>
                          {item.metric && (
                            <span className="font-mono text-xs font-bold text-[#ff7ac6] tabular-nums">
                              {item.metric}
                            </span>
                          )}
                        </div>
                        <p className="mt-1.5 text-xs leading-relaxed text-slate-400">
                          {item.description}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </article>
            ))}

            {/* Connected Category Ranges */}
            {relatedCatalogPages.length > 0 && (
              <div className="hud-corner-brackets rounded-none border border-white/[0.09] bg-[#0B0C10] p-6 sm:p-8">
                <div className="flex items-center justify-between pb-3 border-b border-white/[0.07]">
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#ff7ac6]">
                      Connected Ranges &amp; Sub-Categories
                    </p>
                    <h2 className="mt-1 font-display text-2xl font-semibold text-white">
                      Explore Related BETA DOORS Pages
                    </h2>
                  </div>
                  <Sliders className="h-5 w-5 text-[#EC008C]" />
                </div>

                <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {relatedCatalogPages.map((child) => (
                    <Link
                      key={child.slug}
                      href={child.slug}
                      className="group hud-corner-brackets flex flex-col justify-between rounded-none border border-white/[0.09] bg-[#08090C] p-5 transition hover:border-[#EC008C]/60"
                    >
                      <div>
                        <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#EC008C]">
                          {child.category.replace(/_/g, ' ')}
                        </span>
                        <h3 className="mt-1.5 font-display text-lg font-semibold text-white group-hover:text-[#EC008C]">
                          {child.title}
                        </h3>
                        <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-slate-400">
                          {child.leadDescription}
                        </p>
                      </div>
                      <div className="mt-4 flex items-center justify-between border-t border-white/[0.07] pt-3 font-mono text-[11px] text-slate-300">
                        <span>{child.slug}</span>
                        <ArrowUpRight className="h-4 w-4 text-[#EC008C] transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Direct Online Shop Hardware Strip */}
            {pageRecord.category !== 'legal' && (
              <div className="hud-corner-brackets rounded-none border border-white/[0.09] bg-[#0B0C10] p-6 sm:p-8">
                <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/[0.07]">
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#ff7ac6]">
                      Single Commerce Authority • AUD GST Included
                    </p>
                    <h2 className="mt-1 font-display text-2xl font-semibold text-white">
                      Compatible BETA Automation Hardware
                    </h2>
                  </div>
                  <Link
                    href="/shop"
                    className="inline-flex items-center gap-1.5 rounded-none border border-white/15 bg-[#08090C] px-4 py-2 text-xs font-mono font-semibold text-white transition hover:bg-white/[0.08]"
                  >
                    <span>VIEW ALL 5 SHOP PRODUCTS</span>
                    <ArrowUpRight className="h-3.5 w-3.5 text-[#EC008C]" />
                  </Link>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {products.slice(0, 4).map((product) => (
                    <Link
                      key={product.id}
                      href={product.path}
                      className="group hud-corner-brackets flex flex-col justify-between rounded-none border border-white/[0.09] bg-[#08090C] p-4 transition hover:border-[#EC008C]/60"
                    >
                      <div className="aspect-video w-full overflow-hidden rounded-none border border-white/[0.08] bg-[#12141A]">
                        <ProductTechnicalArtwork
                          type={product.imageSvgType}
                          customImageUrl={product.customImageUrl}
                          title={product.name}
                          className="h-full w-full"
                        />
                      </div>
                      <div className="mt-4">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-mono text-[10px] text-slate-400">
                            SKU: {product.sku}
                          </span>
                          <span className="font-mono text-xs font-bold text-[#ff7ac6] tabular-nums">
                            {product.maxPriceCents
                              ? `${formatAudCents(product.priceCents)} – ${formatAudCents(product.maxPriceCents)}`
                              : formatAudCents(product.priceCents)}
                          </span>
                        </div>
                        <h3 className="mt-1 font-display text-base font-semibold text-white group-hover:text-[#EC008C]">
                          {product.name}
                        </h3>
                        <p className="mt-1 line-clamp-2 text-xs text-slate-400">
                          {product.shortDescription}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Local Melbourne Suburb Directory */}
            {(pageRecord.category === 'local_services' ||
              pageRecord.category === 'services') && (
              <div className="hud-corner-brackets rounded-none border border-white/[0.09] bg-[#0B0C10] p-6 sm:p-8">
                <div className="flex items-center gap-2.5">
                  <MapPin className="h-5 w-5 text-[#EC008C]" />
                  <h2 className="font-display text-xl font-semibold text-white">
                    Greater Melbourne Local Repair &amp; Automation Corridors (11 Suburbs)
                  </h2>
                </div>
                <p className="mt-2 text-xs text-slate-400">
                  Every local service page retains its dedicated URL slug and direct technical booking workflow.
                </p>
                <div className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2 md:grid-cols-3">
                  {siblingLocalPages.map((suburbPage) => {
                    const isCurrent = suburbPage.slug === pageRecord.slug;
                    return (
                      <Link
                        key={suburbPage.slug}
                        href={suburbPage.slug}
                        className={`flex items-center justify-between rounded-none border px-3.5 py-2.5 text-xs transition ${
                          isCurrent
                            ? 'keep-white-text border-[#EC008C] bg-[#EC008C] font-semibold text-white'
                            : 'border-white/[0.08] bg-[#08090C] text-slate-300 hover:border-[#EC008C]/50 hover:text-white'
                        }`}
                      >
                        <span className="truncate">
                          {suburbPage.location?.name || suburbPage.title}
                        </span>
                        <ArrowUpRight className="h-3.5 w-3.5 shrink-0 opacity-70" />
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Contextual Enquiry / Booking Form + Manuals Quick Access */}
          <aside id="page-enquiry-desk" className="space-y-6 lg:col-span-4">
            <EnquiryForm
              sourcePagePath={pageRecord.slug}
              productContext={activeTitle}
              heading={
                suburbName
                  ? `Book ${suburbName} Door Repair or Quote`
                  : 'Request Measure, Quote or Repair'
              }
              subheading="Direct routing to Campbellfield operations (1300 238 243). All submissions persist to the Admin Triage Queue."
            />

            {/* Downloadable Manuals Card */}
            <div className="hud-corner-brackets rounded-none border border-white/[0.09] bg-[#0B0C10] p-6">
              <div className="flex items-center justify-between pb-2 border-b border-white/[0.07]">
                <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#EC008C]">
                  Technical PDF Library
                </span>
                <FileText className="h-4 w-4 text-[#EC008C]" />
              </div>
              <h3 className="mt-3 font-display text-lg font-semibold text-white">
                Installation &amp; Programming Manuals
              </h3>
              <ul className="mt-4 space-y-2.5">
                {manuals.map((manual) => (
                  <li key={manual.id}>
                    <a
                      href={manual.localDownloadPath}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between rounded-none border border-white/[0.08] bg-[#08090C] px-3.5 py-2.5 text-xs text-slate-200 transition hover:border-[#EC008C]/60 hover:text-white"
                    >
                      <span className="truncate pr-2">{manual.label}</span>
                      <span className="shrink-0 font-mono text-[10px] text-[#ff7ac6]">
                        {manual.version}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex flex-col gap-2 border-t border-white/[0.07] pt-4 text-xs font-mono">
                <Link
                  href="/warranty-registration"
                  className="inline-flex items-center justify-between text-slate-300 hover:text-[#EC008C]"
                >
                  <span>REGISTER PRODUCT WARRANTY</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
                <Link
                  href="/register-to-service"
                  className="inline-flex items-center justify-between text-slate-300 hover:text-[#EC008C]"
                >
                  <span>SCHEDULE ANNUAL SERVICE</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
                <Link
                  href="/garage-door-spring-estimator"
                  className="inline-flex items-center justify-between text-slate-300 hover:text-[#EC008C]"
                >
                  <span>TORSION SPRING ESTIMATOR</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            {/* Australian Consumer Law & Safety Callout */}
            <div className="hud-corner-brackets rounded-none border border-white/[0.09] bg-[#0B0C10] p-6">
              <div className="flex items-center gap-2 text-xs font-semibold text-white">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                <span>Safety &amp; Australian Consumer Law</span>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-slate-400">
                High-tension garage door springs and 240V mains wiring must only be serviced by qualified technicians. All products come with guarantees that cannot be excluded under the Australian Consumer Law.
              </p>
              <div className="mt-3 flex items-center gap-2 font-mono text-[11px] text-slate-300">
                <Clock className="h-3.5 w-3.5 text-[#EC008C]" />
                <span>Mon–Fri 8:00am–5:30pm AEST • 1300 238 243</span>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </SiteShell>
  );
}

export default function DynamicCmsPage() {
  return (
    <Suspense
      fallback={
        <SiteShell>
          <div className="mx-auto max-w-[1760px] px-4 py-20 sm:px-8">
            <div className="h-[460px] animate-pulse rounded-none border border-white/10 bg-[#0B0D11]" />
          </div>
        </SiteShell>
      }
    >
      <DynamicCmsPageContent />
    </Suspense>
  );
}
