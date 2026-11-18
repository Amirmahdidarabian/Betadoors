'use client';

import React, { useEffect, useMemo, Suspense } from 'react';
import Link from 'next/link';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import {
  Phone,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  FileText,
  Eye,
  Clock,
  ChevronLeft,
} from 'lucide-react';
import { motion } from 'motion/react';
import { useBetaDoors } from '@/components/providers/BetaDoorsProvider';
import { SiteShell } from '@/components/layout/SiteShell';
import { EnquiryForm } from '@/components/forms/EnquiryForm';
import { ProductTechnicalArtwork } from '@/components/brand/ProductTechnicalArtwork';
import { formatAudCents } from '@/lib/domain-logic';
import { BETA_OFFICIAL_CATEGORIES } from '@/lib/beta-official-catalog';

function DynamicCmsPageContent() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const previewToken = searchParams.get('previewToken');
  const { brand, pages, redirects, products, manuals, isLoading } =
    useBetaDoors();

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
        <div className="mx-auto max-w-[1320px] px-4 py-20 sm:px-8">
          <div className="h-[360px] animate-pulse rounded-[32px] bg-white dark:bg-[#161617]" />
        </div>
      </SiteShell>
    );
  }

  if (!pageRecord) {
    return (
      <SiteShell>
        <div
          dir="rtl"
          className="mx-auto max-w-[840px] px-4 py-24 text-center sm:px-8"
        >
          <div className="text-sm font-bold text-[#EC008C]">خطای ۴۰۴</div>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-[#1D1D1F] dark:text-white sm:text-5xl">
            صفحه مورد نظر یافت نشد.
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-base text-[#6E6E73] dark:text-[#A1A1A6]">
            آدرس درخواستی در فهرست محصولات یا صفحات شرکت بتا موجود نیست.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/"
              className="apple-pill-btn keep-white-text inline-flex items-center gap-2 rounded-full bg-[#EC008C] px-7 py-3 text-sm font-bold text-white hover:bg-[#d4007d]"
            >
              بازگشت به صفحه اصلی
            </Link>
            <Link
              href="/products"
              className="apple-pill-btn inline-flex items-center gap-2 rounded-full bg-white dark:bg-[#161617] border border-black/[0.08] dark:border-white/[0.12] px-7 py-3 text-sm font-bold text-[#1D1D1F] dark:text-white"
            >
              مشاهده کاتالوگ محصولات
            </Link>
          </div>
        </div>
      </SiteShell>
    );
  }

  const isPreviewActive =
    Boolean(previewToken) &&
    Boolean(
      pageRecord.draftTitle ||
        pageRecord.draftLeadDescription ||
        pageRecord.draftSections
    );

  const cleanSlugKey = pageRecord.slug.replace(/\/$/, '') || '/';
  const savedHdr =
    brand.pageHeaders?.[cleanSlugKey] || brand.pageHeaders?.[pageRecord.slug];

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
    'شرکت بتا · بتا صنعت ایلیا';
  const activePrimaryCtaLabel =
    savedHdr?.primaryCtaLabel ||
    pageRecord.headerPrimaryCtaLabel ||
    'استعلام قیمت و مشاوره';
  const activePrimaryCtaHref =
    savedHdr?.primaryCtaHref ||
    pageRecord.headerPrimaryCtaHref ||
    '#page-enquiry-desk';
  const activeSecondaryCtaLabel =
    savedHdr?.secondaryCtaLabel ||
    pageRecord.headerSecondaryCtaLabel ||
    'فروشگاه آنلاین';
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
        <div
          dir="rtl"
          className="border-b border-amber-400/30 bg-amber-500/10 px-4 py-2.5 text-xs text-amber-800 dark:text-amber-200"
        >
          <div className="mx-auto flex max-w-[1320px] flex-wrap items-center justify-between gap-2">
            <span className="inline-flex items-center gap-2 font-medium">
              <Eye className="h-4 w-4 text-amber-500" />
              پیش‌نمایش نسخه پیش‌نویس فعال است ({pageRecord.slug}).
            </span>
            <Link
              href="/admin"
              className="rounded-full bg-amber-400/20 px-4 py-1 text-xs font-bold hover:bg-amber-400/30"
            >
              بازگشت به پنل مدیریت
            </Link>
          </div>
        </div>
      )}

      {/* Clean Apple.com Centered Page Header */}
      <section
        dir="rtl"
        data-cms-custom-header="true"
        data-cms-label={`Page Header (${pageRecord.slug})`}
        className="mx-auto max-w-[1320px] px-4 pt-12 pb-6 sm:px-6 lg:px-8"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mx-auto text-center space-y-4"
        >
          {/* Breadcrumb */}
          <nav
            aria-label="مسیر صفحه"
            className="inline-flex items-center gap-1.5 text-xs text-[#86868B]"
          >
            <Link
              href="/"
              className="hover:text-[#1D1D1F] dark:hover:text-white transition-colors"
            >
              صفحه اصلی
            </Link>
            <ChevronLeft className="h-3.5 w-3.5" />
            <Link
              href="/products"
              className="hover:text-[#1D1D1F] dark:hover:text-white transition-colors"
            >
              محصولات بتا
            </Link>
            <ChevronLeft className="h-3.5 w-3.5" />
            <span className="font-semibold text-[#EC008C]">{activeBadge}</span>
          </nav>

          <h1
            style={{ textWrap: 'balance' }}
            className="text-3xl sm:text-5xl font-bold tracking-tight text-[#1D1D1F] dark:text-[#F5F5F7] leading-[1.2]"
          >
            <span>{activeTitle}</span>
            {activeGradient ? (
              <span className="text-[#EC008C]"> {activeGradient}</span>
            ) : null}
          </h1>

          <p className="text-base sm:text-xl text-[#6E6E73] dark:text-[#A1A1A6] max-w-2xl mx-auto leading-relaxed">
            {activeLead}
          </p>

          <div className="pt-3 flex flex-wrap items-center justify-center gap-4">
            <a
              href={activePrimaryCtaHref}
              className="apple-pill-btn keep-white-text inline-flex items-center gap-2 rounded-full bg-[#EC008C] px-7 py-3 text-base font-bold text-white shadow-[0_8px_24px_rgba(236,0,140,0.28)] hover:bg-[#d4007d]"
            >
              <span>{activePrimaryCtaLabel}</span>
            </a>
            <Link
              href={activeSecondaryCtaHref}
              className="apple-pill-btn inline-flex items-center gap-1.5 rounded-full bg-white dark:bg-[#1D1D1F] border border-black/[0.08] dark:border-white/[0.14] px-7 py-3 text-base font-bold text-[#1D1D1F] dark:text-white"
            >
              <span>{activeSecondaryCtaLabel}</span>
              <ChevronLeft className="h-4 w-4 text-[#EC008C]" />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Clean Apple Content Grid */}
      <section
        dir="rtl"
        className="mx-auto max-w-[1320px] px-4 py-10 sm:px-6 lg:px-8"
      >
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="space-y-8 lg:col-span-8">
            {/* Official beta.ir Category Products Showcase with Real Photos */}
            {(() => {
              const matchedCats = BETA_OFFICIAL_CATEGORIES.filter((c) => {
                if (c.internalHref === cleanSlugKey) return true;
                if (
                  cleanSlugKey === '/insulated-sectional-garage-doors' ||
                  cleanSlugKey === '/single-skin-sectional-garage-doors'
                ) {
                  return c.id === 'gate-openers';
                }
                return false;
              });

              if (matchedCats.length === 0) return null;

              return matchedCats.map((cat) => (
                <article
                  key={cat.id}
                  className="apple-card rounded-[28px] bg-white dark:bg-[#161617] border border-black/[0.05] dark:border-white/[0.08] p-6 sm:p-8 shadow-[0_8px_28px_rgba(0,0,0,0.03)] space-y-6"
                >
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-black/[0.06] dark:border-white/[0.08] pb-4">
                    <div>
                      <div className="text-xs font-extrabold text-[#EC008C]">
                        کاتالوگ رسمی شرکت بتا (BETA.IR)
                      </div>
                      <h2 className="mt-1 text-xl sm:text-2xl font-black text-[#1D1D1F] dark:text-white">
                        تمامی محصولات گروه {cat.title}
                      </h2>
                    </div>
                    <Link
                      href={`/products?cat=${cat.id}`}
                      className="inline-flex items-center gap-1 text-xs font-extrabold text-[#EC008C] hover:underline"
                    >
                      <span>مشاهده در کاتالوگ جامع</span>
                      <ChevronLeft className="h-4 w-4" />
                    </Link>
                  </div>

                  {cat.subCategories.map((sub) => (
                    <div key={sub.id} className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm sm:text-base font-extrabold text-[#EC008C]">
                          {sub.title} ({sub.products.length} محصول)
                        </h3>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
                        {sub.products.map((prod) => (
                          <Link
                            key={prod.id}
                            href={`/products?cat=${cat.id}&sub=${sub.id}&q=${encodeURIComponent(prod.title)}`}
                            className="group rounded-2xl bg-[#F5F5F7] dark:bg-[#1E2029] border border-black/[0.04] dark:border-white/[0.06] hover:border-[#EC008C]/50 p-3 flex flex-col justify-between transition-all"
                          >
                            <div className="aspect-square w-full rounded-xl bg-[#ECECEE] overflow-hidden flex items-center justify-center p-3 mb-2.5">
                              <img
                                src={prod.image}
                                alt={prod.title}
                                referrerPolicy="no-referrer"
                                className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                            <div>
                              <div className="text-xs sm:text-[13px] font-black text-[#1D1D1F] dark:text-white group-hover:text-[#EC008C] line-clamp-2 leading-snug">
                                {prod.title}
                              </div>
                              <div
                                dir="ltr"
                                className="text-[10px] font-mono font-bold text-[#86868B] mt-1"
                              >
                                {prod.sku}
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </article>
              ));
            })()}

            {/* Key Highlights & Specs Card */}
            {pageRecord.highlights && pageRecord.highlights.length > 0 && (
              <article className="apple-card rounded-[28px] bg-white dark:bg-[#161617] border border-black/[0.05] dark:border-white/[0.08] p-7 sm:p-10 shadow-[0_8px_28px_rgba(0,0,0,0.03)]">
                <div className="text-xs font-bold text-[#EC008C]">
                  ویژگی‌های کلیدی
                </div>
                <h2 className="mt-1 text-2xl font-bold tracking-tight text-[#1D1D1F] dark:text-white sm:text-3xl">
                  مشخصات و مزایای فنی
                </h2>
                <ul className="mt-6 grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                  {pageRecord.highlights.map((bullet, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2.5 rounded-2xl bg-[#F5F5F7] dark:bg-[#1D1D1F] p-4 text-sm text-[#1D1D1F] dark:text-[#F5F5F7] leading-relaxed"
                    >
                      <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#EC008C]" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                {pageRecord.specs && pageRecord.specs.length > 0 && (
                  <div className="mt-8 overflow-hidden rounded-2xl bg-[#F5F5F7] dark:bg-[#1D1D1F] p-5">
                    <div className="pb-3 border-b border-black/[0.06] dark:border-white/[0.08] text-xs font-bold text-[#EC008C]">
                      جدول مشخصات فنی
                    </div>
                    <dl className="divide-y divide-black/[0.06] dark:divide-white/[0.08]">
                      {pageRecord.specs.map((spec, idx) => (
                        <div
                          key={idx}
                          className="grid grid-cols-1 gap-1 py-3 text-sm sm:grid-cols-3 sm:gap-4"
                        >
                          <dt className="text-[#6E6E73] dark:text-[#A1A1A6]">
                            {spec.label}
                          </dt>
                          <dd className="font-bold text-[#1D1D1F] dark:text-white sm:col-span-2 tabular-nums">
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
            {activeSections.map((section) => (
              <article
                key={section.id}
                className="apple-card rounded-[28px] bg-white dark:bg-[#161617] border border-black/[0.05] dark:border-white/[0.08] p-7 sm:p-10 shadow-[0_8px_28px_rgba(0,0,0,0.03)]"
              >
                <h2 className="text-2xl font-bold tracking-tight text-[#1D1D1F] dark:text-white sm:text-3xl">
                  {section.title}
                </h2>
                <p className="mt-2.5 text-base leading-relaxed text-[#6E6E73] dark:text-[#A1A1A6]">
                  {section.subtitle}
                </p>

                {section.items && section.items.length > 0 && (
                  <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {section.items.map((item) => (
                      <div
                        key={item.id}
                        className="rounded-2xl bg-[#F5F5F7] dark:bg-[#1D1D1F] p-5 space-y-1.5"
                      >
                        {item.tag && (
                          <span className="text-xs font-bold text-[#EC008C]">
                            {item.tag}
                          </span>
                        )}
                        <div className="flex items-baseline justify-between gap-2">
                          <h3 className="text-base font-bold text-[#1D1D1F] dark:text-white">
                            {item.title}
                          </h3>
                          {item.metric && (
                            <span className="text-xs font-bold text-[#EC008C] tabular-nums">
                              {item.metric}
                            </span>
                          )}
                        </div>
                        <p className="text-sm leading-relaxed text-[#6E6E73] dark:text-[#A1A1A6]">
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
              <div className="rounded-[28px] bg-white dark:bg-[#161617] border border-black/[0.05] dark:border-white/[0.08] p-7 sm:p-10 shadow-[0_8px_28px_rgba(0,0,0,0.03)]">
                <div className="mb-6">
                  <div className="text-xs font-bold text-[#EC008C]">
                    سایر محصولات مرتبط
                  </div>
                  <h2 className="mt-1 text-2xl font-bold text-[#1D1D1F] dark:text-white">
                    صفحات و زیرمجموعه‌های مرتبط
                  </h2>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {relatedCatalogPages.map((child) => (
                    <Link
                      key={child.slug}
                      href={child.slug}
                      className="apple-card group flex flex-col justify-between rounded-2xl bg-[#F5F5F7] dark:bg-[#1D1D1F] p-5"
                    >
                      <div>
                        <h3 className="text-base font-bold text-[#1D1D1F] dark:text-white group-hover:text-[#EC008C] transition-colors">
                          {child.title}
                        </h3>
                        <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-[#6E6E73] dark:text-[#A1A1A6]">
                          {child.leadDescription}
                        </p>
                      </div>
                      <div className="mt-4 flex items-center gap-1 text-xs font-bold text-[#EC008C]">
                        <span>مشاهده</span>
                        <ChevronLeft className="h-3.5 w-3.5" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Direct Online Shop Hardware Strip */}
            {pageRecord.category !== 'legal' && (
              <div className="rounded-[28px] bg-white dark:bg-[#161617] border border-black/[0.05] dark:border-white/[0.08] p-7 sm:p-10 shadow-[0_8px_28px_rgba(0,0,0,0.03)]">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                  <div>
                    <div className="text-xs font-bold text-[#EC008C]">
                      فروشگاه آنلاین بتا
                    </div>
                    <h2 className="mt-1 text-2xl font-bold text-[#1D1D1F] dark:text-white">
                      پکیج‌های آماده سفارش
                    </h2>
                  </div>
                  <Link
                    href="/shop"
                    className="inline-flex items-center gap-1 text-sm font-bold text-[#EC008C] hover:opacity-80"
                  >
                    <span>مشاهده فروشگاه</span>
                    <ChevronLeft className="h-4 w-4" />
                  </Link>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {products.slice(0, 4).map((product) => (
                    <Link
                      key={product.id}
                      href={product.path}
                      className="apple-card group flex flex-col justify-between rounded-2xl bg-[#F5F5F7] dark:bg-[#1D1D1F] p-4"
                    >
                      <div className="aspect-video w-full overflow-hidden rounded-xl border border-black/[0.04] bg-[#F5F5F7]">
                        <ProductTechnicalArtwork
                          type={product.imageSvgType}
                          customImageUrl={product.customImageUrl}
                          title={product.name}
                          className="h-full w-full"
                        />
                      </div>
                      <div className="mt-4 space-y-1">
                        <div className="text-xs font-bold text-[#EC008C] tabular-nums">
                          {formatAudCents(product.priceCents)}
                        </div>
                        <h3 className="text-base font-bold text-[#1D1D1F] dark:text-white group-hover:text-[#EC008C] transition-colors">
                          {product.name}
                        </h3>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Local Regional Hub Directory */}
            {(pageRecord.category === 'local_services' ||
              pageRecord.category === 'services') && (
              <div className="rounded-[28px] bg-white dark:bg-[#161617] border border-black/[0.05] dark:border-white/[0.08] p-7 sm:p-10 shadow-[0_8px_28px_rgba(0,0,0,0.03)]">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-[#EC008C]" />
                  <h2 className="text-xl font-bold text-[#1D1D1F] dark:text-white">
                    مراکز پخش و شعب خدمات شرکت بتا
                  </h2>
                </div>
                <div className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2 md:grid-cols-3">
                  {siblingLocalPages.map((suburbPage) => {
                    const isCurrent = suburbPage.slug === pageRecord.slug;
                    return (
                      <Link
                        key={suburbPage.slug}
                        href={suburbPage.slug}
                        className={`flex items-center justify-between rounded-2xl px-4 py-3 text-xs font-bold transition ${
                          isCurrent
                            ? 'keep-white-text bg-[#EC008C] text-white'
                            : 'bg-[#F5F5F7] dark:bg-[#1D1D1F] text-[#1D1D1F] dark:text-white hover:text-[#EC008C]'
                        }`}
                      >
                        <span className="truncate">
                          {suburbPage.location?.name || suburbPage.title}
                        </span>
                        <ChevronLeft className="h-3.5 w-3.5 shrink-0 opacity-70" />
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Contextual Enquiry Form + Manuals Quick Access */}
          <aside id="page-enquiry-desk" className="space-y-6 lg:col-span-4">
            <EnquiryForm
              sourcePagePath={pageRecord.slug}
              productContext={activeTitle}
              heading={
                suburbName
                  ? `درخواست خدمات (${suburbName})`
                  : 'استعلام قیمت و مشاوره'
              }
              subheading="ارتباط مستقیم با دفتر مرکزی شرکت بتا در تهران (۰۲۱-۸۸۴۰۴۴۰۷)."
            />

            {/* Downloadable Manuals Card */}
            <div className="rounded-[28px] bg-white dark:bg-[#161617] border border-black/[0.05] dark:border-white/[0.08] p-6 shadow-[0_8px_28px_rgba(0,0,0,0.03)]">
              <div className="flex items-center justify-between pb-2">
                <span className="text-xs font-bold text-[#EC008C]">
                  راهنمای نصب و اپ‌ها
                </span>
                <FileText className="h-4 w-4 text-[#EC008C]" />
              </div>
              <h3 className="text-lg font-bold text-[#1D1D1F] dark:text-white">
                کاتالوگ‌ها و نقشه‌های سیم‌کشی
              </h3>
              <ul className="mt-4 space-y-2">
                {manuals.map((manual) => (
                  <li key={manual.id}>
                    <a
                      href={manual.localDownloadPath}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between rounded-2xl bg-[#F5F5F7] dark:bg-[#1D1D1F] px-4 py-3 text-xs font-medium text-[#1D1D1F] dark:text-white hover:text-[#EC008C] transition-colors"
                    >
                      <span className="truncate pl-2">{manual.label}</span>
                      <span className="shrink-0 font-bold text-[#EC008C]">
                        PDF
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex flex-col gap-2 border-t border-black/[0.06] dark:border-white/[0.08] pt-4 text-xs font-bold">
                <Link
                  href="/warranty-registration"
                  className="inline-flex items-center justify-between text-[#1D1D1F] dark:text-white hover:text-[#EC008C]"
                >
                  <span>ثبت آنلاین گارانتی محصول</span>
                  <ChevronLeft className="h-3.5 w-3.5" />
                </Link>
                <Link
                  href="/register-to-service"
                  className="inline-flex items-center justify-between text-[#1D1D1F] dark:text-white hover:text-[#EC008C]"
                >
                  <span>پذیرش تعمیر و خدمات پس از فروش</span>
                  <ChevronLeft className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            {/* Safety & Warranty Callout */}
            <div className="rounded-[28px] bg-white dark:bg-[#161617] border border-black/[0.05] dark:border-white/[0.08] p-6 shadow-[0_8px_28px_rgba(0,0,0,0.03)] space-y-2">
              <div className="flex items-center gap-2 text-sm font-bold text-[#1D1D1F] dark:text-white">
                <ShieldCheck className="h-4 w-4 text-emerald-500" />
                <span>گارانتی رسمی شرکت بتا</span>
              </div>
              <p className="text-xs leading-relaxed text-[#6E6E73] dark:text-[#A1A1A6]">
                کلیه محصولات اصلی دارای هولوگرام و خدمات پس از فروش ۲ الی ۷ روز
                کاری در واحد مرکزی تهران می‌باشند.
              </p>
              <div className="pt-1 flex items-center gap-2 text-xs font-bold text-[#1D1D1F] dark:text-white">
                <Clock className="h-3.5 w-3.5 text-[#EC008C]" />
                <span>شنبه تا چهارشنبه ۸:۰۰ الی ۱۷:۳۰</span>
                <a
                  href="tel:02188404407"
                  dir="ltr"
                  className="text-[#EC008C] inline-flex items-center gap-1"
                >
                  <Phone className="h-3 w-3" />
                  021-88404407
                </a>
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
          <div className="mx-auto max-w-[1320px] px-4 py-20 sm:px-8">
            <div className="h-[360px] animate-pulse rounded-[32px] bg-white dark:bg-[#161617]" />
          </div>
        </SiteShell>
      }
    >
      <DynamicCmsPageContent />
    </Suspense>
  );
}
